// ==========================================================================
// Container Analysis API (containeranalysis v1)
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
  name: "containeranalysis",
  version: "v1",
  rootUrl: "https://containeranalysis.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GrafeasV1SlsaProvenanceZeroTwoSlsaConfigSource {
  digest?: Record<string, string>;
  uri?: string;
  entryPoint?: string;
}

export const GrafeasV1SlsaProvenanceZeroTwoSlsaConfigSource: Schema.Schema<GrafeasV1SlsaProvenanceZeroTwoSlsaConfigSource> = Schema.suspend(() => Schema.Struct({
  digest: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  uri: Schema.optional(Schema.String),
  entryPoint: Schema.optional(Schema.String),
})).annotate({ identifier: "GrafeasV1SlsaProvenanceZeroTwoSlsaConfigSource" }) as any as Schema.Schema<GrafeasV1SlsaProvenanceZeroTwoSlsaConfigSource>;

export interface TimeSpan {
  /** Start of time span. */
  startTime?: string;
  /** End of time span. */
  endTime?: string;
}

export const TimeSpan: Schema.Schema<TimeSpan> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "TimeSpan" }) as any as Schema.Schema<TimeSpan>;

export interface Command {
  /** Required. Name of the command, as presented on the command line, or if the command is packaged as a Docker container, as presented to `docker pull`. */
  name?: string;
  /** Working directory (relative to project source root) used when running this command. */
  dir?: string;
  /** Environment variables set before running this command. */
  env?: Array<string>;
  /** Optional unique identifier for this command, used in wait_for to reference this command as a dependency. */
  id?: string;
  /** The ID(s) of the command(s) that this command depends on. */
  waitFor?: Array<string>;
  /** Command-line arguments used when executing this command. */
  args?: Array<string>;
}

export const Command: Schema.Schema<Command> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  dir: Schema.optional(Schema.String),
  env: Schema.optional(Schema.Array(Schema.String)),
  id: Schema.optional(Schema.String),
  waitFor: Schema.optional(Schema.Array(Schema.String)),
  args: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Command" }) as any as Schema.Schema<Command>;

export interface Artifact {
  /** Related artifact names. This may be the path to a binary or jar file, or in the case of a container build, the name used to push the container image to Google Container Registry, as presented to `docker push`. Note that a single Artifact ID can have multiple names, for example if two tags are applied to one image. */
  names?: Array<string>;
  /** Artifact ID, if any; for container images, this will be a URL by digest like `gcr.io/projectID/imagename@sha256:123456`. */
  id?: string;
  /** Hash or checksum value of a binary, or Docker Registry 2.0 digest of a container. */
  checksum?: string;
}

export const Artifact: Schema.Schema<Artifact> = Schema.suspend(() => Schema.Struct({
  names: Schema.optional(Schema.Array(Schema.String)),
  id: Schema.optional(Schema.String),
  checksum: Schema.optional(Schema.String),
})).annotate({ identifier: "Artifact" }) as any as Schema.Schema<Artifact>;

export interface Recipe {
  /** URI indicating what type of recipe was performed. It determines the meaning of recipe.entryPoint, recipe.arguments, recipe.environment, and materials. */
  type?: string;
  /** Index in materials containing the recipe steps that are not implied by recipe.type. For example, if the recipe type were "make", then this would point to the source containing the Makefile, not the make program itself. Set to -1 if the recipe doesn't come from a material, as zero is default unset value for int64. */
  definedInMaterial?: string;
  /** Collection of all external inputs that influenced the build on top of recipe.definedInMaterial and recipe.entryPoint. For example, if the recipe type were "make", then this might be the flags passed to make aside from the target, which is captured in recipe.entryPoint. Since the arguments field can greatly vary in structure, depending on the builder and recipe type, this is of form "Any". */
  arguments?: Array<Record<string, unknown>>;
  /** String identifying the entry point into the build. This is often a path to a configuration file and/or a target label within that file. The syntax and meaning are defined by recipe.type. For example, if the recipe type were "make", then this would reference the directory in which to run make as well as which target to use. */
  entryPoint?: string;
  /** Any other builder-controlled inputs necessary for correctly evaluating the recipe. Usually only needed for reproducing the build but not evaluated as part of policy. Since the environment field can greatly vary in structure, depending on the builder and recipe type, this is of form "Any". */
  environment?: Array<Record<string, unknown>>;
}

export const Recipe: Schema.Schema<Recipe> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  definedInMaterial: Schema.optional(Schema.String),
  arguments: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  entryPoint: Schema.optional(Schema.String),
  environment: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "Recipe" }) as any as Schema.Schema<Recipe>;

export interface Completeness {
  /** If true, the builder claims that recipe.environment is claimed to be complete. */
  environment?: boolean;
  /** If true, the builder claims that recipe.arguments is complete, meaning that all external inputs are properly captured in the recipe. */
  arguments?: boolean;
  /** If true, the builder claims that materials are complete, usually through some controls to prevent network access. Sometimes called "hermetic". */
  materials?: boolean;
}

export const Completeness: Schema.Schema<Completeness> = Schema.suspend(() => Schema.Struct({
  environment: Schema.optional(Schema.Boolean),
  arguments: Schema.optional(Schema.Boolean),
  materials: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Completeness" }) as any as Schema.Schema<Completeness>;

export interface Metadata {
  /** The timestamp of when the build completed. */
  buildFinishedOn?: string;
  /** Identifies the particular build invocation, which can be useful for finding associated logs or other ad-hoc analysis. The value SHOULD be globally unique, per in-toto Provenance spec. */
  buildInvocationId?: string;
  /** If true, the builder claims that running the recipe on materials will produce bit-for-bit identical output. */
  reproducible?: boolean;
  /** Indicates that the builder claims certain fields in this message to be complete. */
  completeness?: Completeness;
  /** The timestamp of when the build started. */
  buildStartedOn?: string;
}

export const Metadata: Schema.Schema<Metadata> = Schema.suspend(() => Schema.Struct({
  buildFinishedOn: Schema.optional(Schema.String),
  buildInvocationId: Schema.optional(Schema.String),
  reproducible: Schema.optional(Schema.Boolean),
  completeness: Schema.optional(Completeness),
  buildStartedOn: Schema.optional(Schema.String),
})).annotate({ identifier: "Metadata" }) as any as Schema.Schema<Metadata>;

export interface BuilderConfig {
  id?: string;
}

export const BuilderConfig: Schema.Schema<BuilderConfig> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "BuilderConfig" }) as any as Schema.Schema<BuilderConfig>;

export interface InTotoProvenance {
  /** Identifies the configuration used for the build. When combined with materials, this SHOULD fully describe the build, such that re-running this recipe results in bit-for-bit identical output (if the build is reproducible). required */
  recipe?: Recipe;
  /** The collection of artifacts that influenced the build including sources, dependencies, build tools, base images, and so on. This is considered to be incomplete unless metadata.completeness.materials is true. Unset or null is equivalent to empty. */
  materials?: Array<string>;
  metadata?: Metadata;
  /** required */
  builderConfig?: BuilderConfig;
}

export const InTotoProvenance: Schema.Schema<InTotoProvenance> = Schema.suspend(() => Schema.Struct({
  recipe: Schema.optional(Recipe),
  materials: Schema.optional(Schema.Array(Schema.String)),
  metadata: Schema.optional(Metadata),
  builderConfig: Schema.optional(BuilderConfig),
})).annotate({ identifier: "InTotoProvenance" }) as any as Schema.Schema<InTotoProvenance>;

export interface DeploymentNote {
  /** Required. Resource URI for the artifact being deployed. */
  resourceUri?: Array<string>;
}

export const DeploymentNote: Schema.Schema<DeploymentNote> = Schema.suspend(() => Schema.Struct({
  resourceUri: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DeploymentNote" }) as any as Schema.Schema<DeploymentNote>;

export interface AliasContext {
  /** The alias name. */
  name?: string;
  /** The alias kind. */
  kind?: "KIND_UNSPECIFIED" | "FIXED" | "MOVABLE" | "OTHER" | (string & {});
}

export const AliasContext: Schema.Schema<AliasContext> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "AliasContext" }) as any as Schema.Schema<AliasContext>;

export interface GerritSourceContext {
  /** The URI of a running Gerrit instance. */
  hostUri?: string;
  /** The full project name within the host. Projects may be nested, so "project/subproject" is a valid project name. The "repo name" is the hostURI/project. */
  gerritProject?: string;
  /** An alias, which may be a branch or tag. */
  aliasContext?: AliasContext;
  /** A revision (commit) ID. */
  revisionId?: string;
}

export const GerritSourceContext: Schema.Schema<GerritSourceContext> = Schema.suspend(() => Schema.Struct({
  hostUri: Schema.optional(Schema.String),
  gerritProject: Schema.optional(Schema.String),
  aliasContext: Schema.optional(AliasContext),
  revisionId: Schema.optional(Schema.String),
})).annotate({ identifier: "GerritSourceContext" }) as any as Schema.Schema<GerritSourceContext>;

export interface GitSourceContext {
  /** Git repository URL. */
  url?: string;
  /** Git commit hash. */
  revisionId?: string;
}

export const GitSourceContext: Schema.Schema<GitSourceContext> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  revisionId: Schema.optional(Schema.String),
})).annotate({ identifier: "GitSourceContext" }) as any as Schema.Schema<GitSourceContext>;

export interface ProjectRepoId {
  /** The ID of the project. */
  projectId?: string;
  /** The name of the repo. Leave empty for the default repo. */
  repoName?: string;
}

export const ProjectRepoId: Schema.Schema<ProjectRepoId> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
  repoName: Schema.optional(Schema.String),
})).annotate({ identifier: "ProjectRepoId" }) as any as Schema.Schema<ProjectRepoId>;

export interface RepoId {
  /** A server-assigned, globally unique identifier. */
  uid?: string;
  /** A combination of a project ID and a repo name. */
  projectRepoId?: ProjectRepoId;
}

export const RepoId: Schema.Schema<RepoId> = Schema.suspend(() => Schema.Struct({
  uid: Schema.optional(Schema.String),
  projectRepoId: Schema.optional(ProjectRepoId),
})).annotate({ identifier: "RepoId" }) as any as Schema.Schema<RepoId>;

export interface CloudRepoSourceContext {
  /** An alias, which may be a branch or tag. */
  aliasContext?: AliasContext;
  /** A revision ID. */
  revisionId?: string;
  /** The ID of the repo. */
  repoId?: RepoId;
}

export const CloudRepoSourceContext: Schema.Schema<CloudRepoSourceContext> = Schema.suspend(() => Schema.Struct({
  aliasContext: Schema.optional(AliasContext),
  revisionId: Schema.optional(Schema.String),
  repoId: Schema.optional(RepoId),
})).annotate({ identifier: "CloudRepoSourceContext" }) as any as Schema.Schema<CloudRepoSourceContext>;

export interface SourceContext {
  /** A SourceContext referring to a Gerrit project. */
  gerrit?: GerritSourceContext;
  /** A SourceContext referring to any third party Git repo (e.g., GitHub). */
  git?: GitSourceContext;
  /** A SourceContext referring to a revision in a Google Cloud Source Repo. */
  cloudRepo?: CloudRepoSourceContext;
  /** Labels with user defined metadata. */
  labels?: Record<string, string>;
}

export const SourceContext: Schema.Schema<SourceContext> = Schema.suspend(() => Schema.Struct({
  gerrit: Schema.optional(GerritSourceContext),
  git: Schema.optional(GitSourceContext),
  cloudRepo: Schema.optional(CloudRepoSourceContext),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "SourceContext" }) as any as Schema.Schema<SourceContext>;

export interface Hash {
  /** Required. The type of hash that was performed, e.g. "SHA-256". */
  type?: string;
  /** Required. The hash value. */
  value?: string;
}

export const Hash: Schema.Schema<Hash> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "Hash" }) as any as Schema.Schema<Hash>;

export interface FileHashes {
  /** Required. Collection of file hashes. */
  fileHash?: Array<Hash>;
}

export const FileHashes: Schema.Schema<FileHashes> = Schema.suspend(() => Schema.Struct({
  fileHash: Schema.optional(Schema.Array(Hash)),
})).annotate({ identifier: "FileHashes" }) as any as Schema.Schema<FileHashes>;

export interface Source {
  /** If provided, some of the source code used for the build may be found in these locations, in the case where the source repository had multiple remotes or submodules. This list will not include the context specified in the context field. */
  additionalContexts?: Array<SourceContext>;
  /** If provided, the source code used for the build came from this location. */
  context?: SourceContext;
  /** Hash(es) of the build source, which can be used to verify that the original source integrity was maintained in the build. The keys to this map are file paths used as build source and the values contain the hash values for those files. If the build source came in a single package such as a gzipped tarfile (.tar.gz), the FileHash will be for the single path to that file. */
  fileHashes?: Record<string, FileHashes>;
  /** If provided, the input binary artifacts for the build came from this location. */
  artifactStorageSourceUri?: string;
}

export const Source: Schema.Schema<Source> = Schema.suspend(() => Schema.Struct({
  additionalContexts: Schema.optional(Schema.Array(SourceContext)),
  context: Schema.optional(SourceContext),
  fileHashes: Schema.optional(Schema.Record(Schema.String, FileHashes)),
  artifactStorageSourceUri: Schema.optional(Schema.String),
})).annotate({ identifier: "Source" }) as any as Schema.Schema<Source>;

export interface BuildProvenance {
  /** Version string of the builder at the time this build was executed. */
  builderVersion?: string;
  /** E-mail address of the user who initiated this build. Note that this was the user's e-mail address at the time the build was initiated; this address may not represent the same end-user for all time. */
  creator?: string;
  /** Details of the Source input to the build. */
  sourceProvenance?: Source;
  /** Commands requested by the build. */
  commands?: Array<Command>;
  /** Trigger identifier if the build was triggered automatically; empty if not. */
  triggerId?: string;
  /** URI where any logs for this provenance were written. */
  logsUri?: string;
  /** ID of the project. */
  projectId?: string;
  /** Special options applied to this build. This is a catch-all field where build providers can enter any desired additional details. */
  buildOptions?: Record<string, string>;
  /** Output of the build. */
  builtArtifacts?: Array<Artifact>;
  /** Time at which the build was created. */
  createTime?: string;
  /** Time at which execution of the build was started. */
  startTime?: string;
  /** Required. Unique identifier of the build. */
  id?: string;
  /** Time at which execution of the build was finished. */
  endTime?: string;
}

export const BuildProvenance: Schema.Schema<BuildProvenance> = Schema.suspend(() => Schema.Struct({
  builderVersion: Schema.optional(Schema.String),
  creator: Schema.optional(Schema.String),
  sourceProvenance: Schema.optional(Source),
  commands: Schema.optional(Schema.Array(Command)),
  triggerId: Schema.optional(Schema.String),
  logsUri: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  buildOptions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  builtArtifacts: Schema.optional(Schema.Array(Artifact)),
  createTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "BuildProvenance" }) as any as Schema.Schema<BuildProvenance>;

export interface SBOMStatus {
  /** The progress of the SBOM generation. */
  sbomState?: "SBOM_STATE_UNSPECIFIED" | "PENDING" | "COMPLETE" | (string & {});
  /** If there was an error generating an SBOM, this will indicate what that error was. */
  error?: string;
}

export const SBOMStatus: Schema.Schema<SBOMStatus> = Schema.suspend(() => Schema.Struct({
  sbomState: Schema.optional(Schema.String),
  error: Schema.optional(Schema.String),
})).annotate({ identifier: "SBOMStatus" }) as any as Schema.Schema<SBOMStatus>;

export interface Layer {
  /** The recovered arguments to the Dockerfile directive. */
  arguments?: string;
  /** Required. The recovered Dockerfile directive used to construct this layer. See https://docs.docker.com/engine/reference/builder/ for more information. */
  directive?: string;
}

export const Layer: Schema.Schema<Layer> = Schema.suspend(() => Schema.Struct({
  arguments: Schema.optional(Schema.String),
  directive: Schema.optional(Schema.String),
})).annotate({ identifier: "Layer" }) as any as Schema.Schema<Layer>;

export interface Version {
  /** Required. Distinguishes between sentinel MIN/MAX versions and normal versions. */
  kind?: "VERSION_KIND_UNSPECIFIED" | "NORMAL" | "MINIMUM" | "MAXIMUM" | (string & {});
  /** Used to correct mistakes in the version numbering scheme. */
  epoch?: number;
  /** Human readable version string. This string is of the form :- and is only set when kind is NORMAL. */
  fullName?: string;
  /** The iteration of the package build from the above version. */
  revision?: string;
  /** Whether this version is specifying part of an inclusive range. Grafeas does not have the capability to specify version ranges; instead we have fields that specify start version and end versions. At times this is insufficient - we also need to specify whether the version is included in the range or is excluded from the range. This boolean is expected to be set to true when the version is included in a range. */
  inclusive?: boolean;
  /** Required only when version kind is NORMAL. The main part of the version name. */
  name?: string;
}

export const Version: Schema.Schema<Version> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  epoch: Schema.optional(Schema.Number),
  fullName: Schema.optional(Schema.String),
  revision: Schema.optional(Schema.String),
  inclusive: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Version" }) as any as Schema.Schema<Version>;

export interface Detail {
  /** Whether this detail is obsolete. Occurrences are expected not to point to obsolete details. */
  isObsolete?: boolean;
  /** Required. The [CPE URI](https://cpe.mitre.org/specification/) this vulnerability affects. */
  affectedCpeUri?: string;
  /** The distro recommended package to update to that contains a fix for this vulnerability. It is possible for this to be different from the affected_package. */
  fixedPackage?: string;
  /** The source from which the information in this Detail was obtained. */
  source?: string;
  /** The version number at the start of an interval in which this vulnerability exists. A vulnerability can affect a package between version numbers that are disjoint sets of intervals (example: [1.0.0-1.1.0], [2.4.6-2.4.8] and [4.5.6-4.6.8]) each of which will be represented in its own Detail. If a specific affected version is provided by a vulnerability database, affected_version_start and affected_version_end will be the same in that Detail. */
  affectedVersionStart?: Version;
  /** The type of package; whether native or non native (e.g., ruby gems, node.js packages, etc.). */
  packageType?: string;
  /** The name of the vendor of the product. */
  vendor?: string;
  /** The distro assigned severity of this vulnerability. */
  severityName?: string;
  /** A vendor-specific description of this vulnerability. */
  description?: string;
  /** The version number at the end of an interval in which this vulnerability exists. A vulnerability can affect a package between version numbers that are disjoint sets of intervals (example: [1.0.0-1.1.0], [2.4.6-2.4.8] and [4.5.6-4.6.8]) each of which will be represented in its own Detail. If a specific affected version is provided by a vulnerability database, affected_version_start and affected_version_end will be the same in that Detail. */
  affectedVersionEnd?: Version;
  /** The distro recommended [CPE URI](https://cpe.mitre.org/specification/) to update to that contains a fix for this vulnerability. It is possible for this to be different from the affected_cpe_uri. */
  fixedCpeUri?: string;
  /** The distro recommended version to update to that contains a fix for this vulnerability. Setting this to VersionKind.MAXIMUM means no such version is yet available. */
  fixedVersion?: Version;
  /** The time this information was last changed at the source. This is an upstream timestamp from the underlying information source - e.g. Ubuntu security tracker. */
  sourceUpdateTime?: string;
  /** Required. The package this vulnerability affects. */
  affectedPackage?: string;
}

export const Detail: Schema.Schema<Detail> = Schema.suspend(() => Schema.Struct({
  isObsolete: Schema.optional(Schema.Boolean),
  affectedCpeUri: Schema.optional(Schema.String),
  fixedPackage: Schema.optional(Schema.String),
  source: Schema.optional(Schema.String),
  affectedVersionStart: Schema.optional(Version),
  packageType: Schema.optional(Schema.String),
  vendor: Schema.optional(Schema.String),
  severityName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  affectedVersionEnd: Schema.optional(Version),
  fixedCpeUri: Schema.optional(Schema.String),
  fixedVersion: Schema.optional(Version),
  sourceUpdateTime: Schema.optional(Schema.String),
  affectedPackage: Schema.optional(Schema.String),
})).annotate({ identifier: "Detail" }) as any as Schema.Schema<Detail>;

export interface SbomReferenceIntotoPredicate {
  /** The mime type of the SBOM. */
  mimeType?: string;
  /** A map of algorithm to digest of the contents of the SBOM. */
  digest?: Record<string, string>;
  /** The location of the SBOM. */
  location?: string;
  /** The person or system referring this predicate to the consumer. */
  referrerId?: string;
}

export const SbomReferenceIntotoPredicate: Schema.Schema<SbomReferenceIntotoPredicate> = Schema.suspend(() => Schema.Struct({
  mimeType: Schema.optional(Schema.String),
  digest: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.optional(Schema.String),
  referrerId: Schema.optional(Schema.String),
})).annotate({ identifier: "SbomReferenceIntotoPredicate" }) as any as Schema.Schema<SbomReferenceIntotoPredicate>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsPythonPackage {
  /** Path globs used to match files in the build's workspace. For Python/ Twine, this is usually `dist/*`, and sometimes additionally an `.asc` file. */
  paths?: Array<string>;
  /** Artifact Registry repository, in the form "https://$REGION-python.pkg.dev/$PROJECT/$REPOSITORY" Files in the workspace matching any path pattern will be uploaded to Artifact Registry with this location as a prefix. */
  repository?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsPythonPackage: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsPythonPackage> = Schema.suspend(() => Schema.Struct({
  paths: Schema.optional(Schema.Array(Schema.String)),
  repository: Schema.optional(Schema.String),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsPythonPackage" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsPythonPackage>;

export interface Expr {
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() => Schema.Struct({
  members: Schema.optional(Schema.Array(Schema.String)),
  role: Schema.optional(Schema.String),
  condition: Schema.optional(Expr),
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

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan {
  /** End of time span. */
  endTime?: string;
  /** Start of time span. */
  startTime?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan> = Schema.suspend(() => Schema.Struct({
  endTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Hash {
  /** The hash value. */
  value?: string;
  /** The type of hash that was performed. */
  type?: "NONE" | "SHA256" | "MD5" | "GO_MODULE_H1" | "SHA512" | (string & {});
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1Hash: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Hash> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1Hash" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Hash>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes {
  /** Collection of file hashes. */
  fileHash?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1Hash>;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes> = Schema.suspend(() => Schema.Struct({
  fileHash: Schema.optional(Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1Hash)),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage {
  /** URI of the uploaded artifact. */
  uri?: string;
  /** Output only. Stores timing information for pushing the specified artifact. */
  pushTiming?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
  /** Hash types and values of the Python Artifact. */
  fileHashes?: ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes;
  /** Output only. Path to the artifact in Artifact Registry. */
  artifactRegistryPackage?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  pushTiming: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan),
  fileHashes: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes),
  artifactRegistryPackage: Schema.optional(Schema.String),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage>;

export interface Subject {
  name?: string;
  /** `"": ""` Algorithms can be e.g. sha256, sha512 See https://github.com/in-toto/attestation/blob/main/spec/field_types.md#DigestSet */
  digest?: Record<string, string>;
}

export const Subject: Schema.Schema<Subject> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  digest: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "Subject" }) as any as Schema.Schema<Subject>;

export interface ResourceDescriptor {
  uri?: string;
  name?: string;
  digest?: Record<string, string>;
  annotations?: Record<string, unknown>;
  mediaType?: string;
  downloadLocation?: string;
  content?: string;
}

export const ResourceDescriptor: Schema.Schema<ResourceDescriptor> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  digest: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  mediaType: Schema.optional(Schema.String),
  downloadLocation: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
})).annotate({ identifier: "ResourceDescriptor" }) as any as Schema.Schema<ResourceDescriptor>;

export interface BuildDefinition {
  resolvedDependencies?: Array<ResourceDescriptor>;
  internalParameters?: Record<string, unknown>;
  externalParameters?: Record<string, unknown>;
  buildType?: string;
}

export const BuildDefinition: Schema.Schema<BuildDefinition> = Schema.suspend(() => Schema.Struct({
  resolvedDependencies: Schema.optional(Schema.Array(ResourceDescriptor)),
  internalParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  externalParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  buildType: Schema.optional(Schema.String),
})).annotate({ identifier: "BuildDefinition" }) as any as Schema.Schema<BuildDefinition>;

export interface ProvenanceBuilder {
  builderDependencies?: Array<ResourceDescriptor>;
  version?: Record<string, string>;
  id?: string;
}

export const ProvenanceBuilder: Schema.Schema<ProvenanceBuilder> = Schema.suspend(() => Schema.Struct({
  builderDependencies: Schema.optional(Schema.Array(ResourceDescriptor)),
  version: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "ProvenanceBuilder" }) as any as Schema.Schema<ProvenanceBuilder>;

export interface BuildMetadata {
  finishedOn?: string;
  invocationId?: string;
  startedOn?: string;
}

export const BuildMetadata: Schema.Schema<BuildMetadata> = Schema.suspend(() => Schema.Struct({
  finishedOn: Schema.optional(Schema.String),
  invocationId: Schema.optional(Schema.String),
  startedOn: Schema.optional(Schema.String),
})).annotate({ identifier: "BuildMetadata" }) as any as Schema.Schema<BuildMetadata>;

export interface RunDetails {
  byproducts?: Array<ResourceDescriptor>;
  builder?: ProvenanceBuilder;
  metadata?: BuildMetadata;
}

export const RunDetails: Schema.Schema<RunDetails> = Schema.suspend(() => Schema.Struct({
  byproducts: Schema.optional(Schema.Array(ResourceDescriptor)),
  builder: Schema.optional(ProvenanceBuilder),
  metadata: Schema.optional(BuildMetadata),
})).annotate({ identifier: "RunDetails" }) as any as Schema.Schema<RunDetails>;

export interface SlsaProvenanceV1 {
  buildDefinition?: BuildDefinition;
  runDetails?: RunDetails;
}

export const SlsaProvenanceV1: Schema.Schema<SlsaProvenanceV1> = Schema.suspend(() => Schema.Struct({
  buildDefinition: Schema.optional(BuildDefinition),
  runDetails: Schema.optional(RunDetails),
})).annotate({ identifier: "SlsaProvenanceV1" }) as any as Schema.Schema<SlsaProvenanceV1>;

export interface InTotoSlsaProvenanceV1 {
  /** InToto spec defined at https://github.com/in-toto/attestation/tree/main/spec#statement */
  _type?: string;
  subject?: Array<Subject>;
  predicateType?: string;
  predicate?: SlsaProvenanceV1;
}

export const InTotoSlsaProvenanceV1: Schema.Schema<InTotoSlsaProvenanceV1> = Schema.suspend(() => Schema.Struct({
  _type: Schema.optional(Schema.String),
  subject: Schema.optional(Schema.Array(Subject)),
  predicateType: Schema.optional(Schema.String),
  predicate: Schema.optional(SlsaProvenanceV1),
})).annotate({ identifier: "InTotoSlsaProvenanceV1" }) as any as Schema.Schema<InTotoSlsaProvenanceV1>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsArtifactObjects {
  /** Path globs used to match files in the build's workspace. */
  paths?: Array<string>;
  /** Output only. Stores timing information for pushing all artifact objects. */
  timing?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
  /** Cloud Storage bucket and optional object path, in the form "gs://bucket/path/to/somewhere/". (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)). Files in the workspace matching any path pattern will be uploaded to Cloud Storage with this location as a prefix. */
  location?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsArtifactObjects: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsArtifactObjects> = Schema.suspend(() => Schema.Struct({
  paths: Schema.optional(Schema.Array(Schema.String)),
  timing: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsArtifactObjects" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsArtifactObjects>;

export interface Category {
  /** The identifier of the category. */
  categoryId?: string;
  /** The localized name of the category. */
  name?: string;
}

export const Category: Schema.Schema<Category> = Schema.suspend(() => Schema.Struct({
  categoryId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Category" }) as any as Schema.Schema<Category>;

export interface ExploitPredictionScoringSystem {
  /** The EPSS score representing the probability [0-1] of exploitation in the wild in the next 30 days */
  score?: number;
  /** The percentile of the current score, the proportion of all scored vulnerabilities with the same or a lower EPSS score */
  percentile?: number;
}

export const ExploitPredictionScoringSystem: Schema.Schema<ExploitPredictionScoringSystem> = Schema.suspend(() => Schema.Struct({
  score: Schema.optional(Schema.Number),
  percentile: Schema.optional(Schema.Number),
})).annotate({ identifier: "ExploitPredictionScoringSystem" }) as any as Schema.Schema<ExploitPredictionScoringSystem>;

export interface EnvelopeSignature {
  keyid?: string;
  sig?: string;
}

export const EnvelopeSignature: Schema.Schema<EnvelopeSignature> = Schema.suspend(() => Schema.Struct({
  keyid: Schema.optional(Schema.String),
  sig: Schema.optional(Schema.String),
})).annotate({ identifier: "EnvelopeSignature" }) as any as Schema.Schema<EnvelopeSignature>;

export interface BaseImage {
  /** The name of the base image. */
  name?: string;
  /** The registry in which the base image is from. */
  registry?: string;
  /** The number of layers that the base image is composed of. */
  layerCount?: number;
  /** The repository name in which the base image is from. */
  repository?: string;
}

export const BaseImage: Schema.Schema<BaseImage> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  registry: Schema.optional(Schema.String),
  layerCount: Schema.optional(Schema.Number),
  repository: Schema.optional(Schema.String),
})).annotate({ identifier: "BaseImage" }) as any as Schema.Schema<BaseImage>;

export interface LayerDetails {
  /** The diff ID (typically a sha256 hash) of the layer in the container image. */
  diffId?: string;
  /** The base images the layer is found within. */
  baseImages?: Array<BaseImage>;
  /** The index of the layer in the container image. */
  index?: number;
  /** The layer build command that was used to build the layer. This may not be found in all layers depending on how the container image is built. */
  command?: string;
  /** The layer chain ID (sha256 hash) of the layer in the container image. https://github.com/opencontainers/image-spec/blob/main/config.md#layer-chainid */
  chainId?: string;
}

export const LayerDetails: Schema.Schema<LayerDetails> = Schema.suspend(() => Schema.Struct({
  diffId: Schema.optional(Schema.String),
  baseImages: Schema.optional(Schema.Array(BaseImage)),
  index: Schema.optional(Schema.Number),
  command: Schema.optional(Schema.String),
  chainId: Schema.optional(Schema.String),
})).annotate({ identifier: "LayerDetails" }) as any as Schema.Schema<LayerDetails>;

export interface GrafeasV1FileLocation {
  /** For jars that are contained inside .war files, this filepath can indicate the path to war file combined with the path to jar file. */
  filePath?: string;
  /** Each package found in a file should have its own layer metadata (that is, information from the origin layer of the package). */
  layerDetails?: LayerDetails;
}

export const GrafeasV1FileLocation: Schema.Schema<GrafeasV1FileLocation> = Schema.suspend(() => Schema.Struct({
  filePath: Schema.optional(Schema.String),
  layerDetails: Schema.optional(LayerDetails),
})).annotate({ identifier: "GrafeasV1FileLocation" }) as any as Schema.Schema<GrafeasV1FileLocation>;

export interface SecretLocation {
  /** The secret is found from a file. */
  fileLocation?: GrafeasV1FileLocation;
}

export const SecretLocation: Schema.Schema<SecretLocation> = Schema.suspend(() => Schema.Struct({
  fileLocation: Schema.optional(GrafeasV1FileLocation),
})).annotate({ identifier: "SecretLocation" }) as any as Schema.Schema<SecretLocation>;

export interface SecretStatus {
  /** Optional. The time the secret status was last updated. */
  updateTime?: string;
  /** Optional. Optional message about the status code. */
  message?: string;
  /** Optional. The status of the secret. */
  status?: "STATUS_UNSPECIFIED" | "UNKNOWN" | "VALID" | "INVALID" | (string & {});
}

export const SecretStatus: Schema.Schema<SecretStatus> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
})).annotate({ identifier: "SecretStatus" }) as any as Schema.Schema<SecretStatus>;

export interface SecretOccurrence {
  /** Required. Type of secret. */
  kind?: "SECRET_KIND_UNSPECIFIED" | "SECRET_KIND_UNKNOWN" | "SECRET_KIND_GCP_SERVICE_ACCOUNT_KEY" | "SECRET_KIND_GCP_API_KEY" | "SECRET_KIND_GCP_OAUTH2_CLIENT_CREDENTIALS" | "SECRET_KIND_GCP_OAUTH2_ACCESS_TOKEN" | "SECRET_KIND_ANTHROPIC_ADMIN_API_KEY" | "SECRET_KIND_ANTHROPIC_API_KEY" | "SECRET_KIND_AZURE_ACCESS_TOKEN" | "SECRET_KIND_AZURE_IDENTITY_TOKEN" | "SECRET_KIND_DOCKER_HUB_PERSONAL_ACCESS_TOKEN" | "SECRET_KIND_GITHUB_APP_REFRESH_TOKEN" | "SECRET_KIND_GITHUB_APP_SERVER_TO_SERVER_TOKEN" | "SECRET_KIND_GITHUB_APP_USER_TO_SERVER_TOKEN" | "SECRET_KIND_GITHUB_CLASSIC_PERSONAL_ACCESS_TOKEN" | "SECRET_KIND_GITHUB_FINE_GRAINED_PERSONAL_ACCESS_TOKEN" | "SECRET_KIND_GITHUB_OAUTH_TOKEN" | "SECRET_KIND_HUGGINGFACE_API_KEY" | "SECRET_KIND_OPENAI_API_KEY" | "SECRET_KIND_PERPLEXITY_API_KEY" | "SECRET_KIND_STRIPE_SECRET_KEY" | "SECRET_KIND_STRIPE_RESTRICTED_KEY" | "SECRET_KIND_STRIPE_WEBHOOK_SECRET" | (string & {});
  /** Optional. Locations where the secret is detected. */
  locations?: Array<SecretLocation>;
  /** Optional. Status of the secret. */
  statuses?: Array<SecretStatus>;
}

export const SecretOccurrence: Schema.Schema<SecretOccurrence> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  locations: Schema.optional(Schema.Array(SecretLocation)),
  statuses: Schema.optional(Schema.Array(SecretStatus)),
})).annotate({ identifier: "SecretOccurrence" }) as any as Schema.Schema<SecretOccurrence>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret {
  /** Resource name of Cloud KMS crypto key to decrypt the encrypted value. In format: projects/* /locations/* /keyRings/* /cryptoKeys/* */
  kmsKeyName?: string;
  /** Map of environment variable name to its encrypted value. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step. Values can be at most 64 KB in size. There can be at most 100 secret values across all of a build's secrets. */
  envMap?: Record<string, string>;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret> = Schema.suspend(() => Schema.Struct({
  kmsKeyName: Schema.optional(Schema.String),
  envMap: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1SecretManagerSecret {
  /** Environment variable name to associate with the secret. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step. */
  env?: string;
  /** Resource name of the SecretVersion. In format: projects/* /secrets/* /versions/* */
  versionName?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1SecretManagerSecret: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1SecretManagerSecret> = Schema.suspend(() => Schema.Struct({
  env: Schema.optional(Schema.String),
  versionName: Schema.optional(Schema.String),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1SecretManagerSecret" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1SecretManagerSecret>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Secrets {
  /** Secrets encrypted with KMS key and the associated secret environment variable. */
  inline?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret>;
  /** Secrets in Secret Manager and associated secret environment variable. */
  secretManager?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1SecretManagerSecret>;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1Secrets: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Secrets> = Schema.suspend(() => Schema.Struct({
  inline: Schema.optional(Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret)),
  secretManager: Schema.optional(Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1SecretManagerSecret)),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1Secrets" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Secrets>;

export interface CVSSv3 {
  confidentialityImpact?: "IMPACT_UNSPECIFIED" | "IMPACT_HIGH" | "IMPACT_LOW" | "IMPACT_NONE" | (string & {});
  attackComplexity?: "ATTACK_COMPLEXITY_UNSPECIFIED" | "ATTACK_COMPLEXITY_LOW" | "ATTACK_COMPLEXITY_HIGH" | (string & {});
  /** The base score is a function of the base metric scores. */
  baseScore?: number;
  userInteraction?: "USER_INTERACTION_UNSPECIFIED" | "USER_INTERACTION_NONE" | "USER_INTERACTION_REQUIRED" | (string & {});
  scope?: "SCOPE_UNSPECIFIED" | "SCOPE_UNCHANGED" | "SCOPE_CHANGED" | (string & {});
  impactScore?: number;
  privilegesRequired?: "PRIVILEGES_REQUIRED_UNSPECIFIED" | "PRIVILEGES_REQUIRED_NONE" | "PRIVILEGES_REQUIRED_LOW" | "PRIVILEGES_REQUIRED_HIGH" | (string & {});
  /** Base Metrics Represents the intrinsic characteristics of a vulnerability that are constant over time and across user environments. */
  attackVector?: "ATTACK_VECTOR_UNSPECIFIED" | "ATTACK_VECTOR_NETWORK" | "ATTACK_VECTOR_ADJACENT" | "ATTACK_VECTOR_LOCAL" | "ATTACK_VECTOR_PHYSICAL" | (string & {});
  availabilityImpact?: "IMPACT_UNSPECIFIED" | "IMPACT_HIGH" | "IMPACT_LOW" | "IMPACT_NONE" | (string & {});
  integrityImpact?: "IMPACT_UNSPECIFIED" | "IMPACT_HIGH" | "IMPACT_LOW" | "IMPACT_NONE" | (string & {});
  exploitabilityScore?: number;
}

export const CVSSv3: Schema.Schema<CVSSv3> = Schema.suspend(() => Schema.Struct({
  confidentialityImpact: Schema.optional(Schema.String),
  attackComplexity: Schema.optional(Schema.String),
  baseScore: Schema.optional(Schema.Number),
  userInteraction: Schema.optional(Schema.String),
  scope: Schema.optional(Schema.String),
  impactScore: Schema.optional(Schema.Number),
  privilegesRequired: Schema.optional(Schema.String),
  attackVector: Schema.optional(Schema.String),
  availabilityImpact: Schema.optional(Schema.String),
  integrityImpact: Schema.optional(Schema.String),
  exploitabilityScore: Schema.optional(Schema.Number),
})).annotate({ identifier: "CVSSv3" }) as any as Schema.Schema<CVSSv3>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedNpmPackage {
  /** Hash types and values of the npm package. */
  fileHashes?: ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes;
  /** Output only. Stores timing information for pushing the specified artifact. */
  pushTiming?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
  /** Output only. Path to the artifact in Artifact Registry. */
  artifactRegistryPackage?: string;
  /** URI of the uploaded npm package. */
  uri?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedNpmPackage: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedNpmPackage> = Schema.suspend(() => Schema.Struct({
  fileHashes: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes),
  pushTiming: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan),
  artifactRegistryPackage: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedNpmPackage" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedNpmPackage>;

export interface FixableTotalByDigest {
  /** The severity for this count. SEVERITY_UNSPECIFIED indicates total across all severities. */
  severity?: "SEVERITY_UNSPECIFIED" | "MINIMAL" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | (string & {});
  /** The number of fixable vulnerabilities associated with this resource. */
  fixableCount?: string;
  /** The affected resource. */
  resourceUri?: string;
  /** The total number of vulnerabilities associated with this resource. */
  totalCount?: string;
}

export const FixableTotalByDigest: Schema.Schema<FixableTotalByDigest> = Schema.suspend(() => Schema.Struct({
  severity: Schema.optional(Schema.String),
  fixableCount: Schema.optional(Schema.String),
  resourceUri: Schema.optional(Schema.String),
  totalCount: Schema.optional(Schema.String),
})).annotate({ identifier: "FixableTotalByDigest" }) as any as Schema.Schema<FixableTotalByDigest>;

export interface VulnerabilityOccurrencesSummary {
  /** A listing by resource of the number of fixable and total vulnerabilities. */
  counts?: Array<FixableTotalByDigest>;
  /** Unordered list. Unreachable regions. Populated for requests from the global region when `return_partial_success` is set. Format: `projects/[PROJECT_ID]/locations/[LOCATION]` */
  unreachable?: Array<string>;
}

export const VulnerabilityOccurrencesSummary: Schema.Schema<VulnerabilityOccurrencesSummary> = Schema.suspend(() => Schema.Struct({
  counts: Schema.optional(Schema.Array(FixableTotalByDigest)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "VulnerabilityOccurrencesSummary" }) as any as Schema.Schema<VulnerabilityOccurrencesSummary>;

export interface SBOMReferenceNote {
  /** The format that SBOM takes. E.g. may be spdx, cyclonedx, etc... */
  format?: string;
  /** The version of the format that the SBOM takes. E.g. if the format is spdx, the version may be 2.3. */
  version?: string;
}

export const SBOMReferenceNote: Schema.Schema<SBOMReferenceNote> = Schema.suspend(() => Schema.Struct({
  format: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "SBOMReferenceNote" }) as any as Schema.Schema<SBOMReferenceNote>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface GrafeasV1SlsaProvenanceZeroTwoSlsaCompleteness {
  parameters?: boolean;
  environment?: boolean;
  materials?: boolean;
}

export const GrafeasV1SlsaProvenanceZeroTwoSlsaCompleteness: Schema.Schema<GrafeasV1SlsaProvenanceZeroTwoSlsaCompleteness> = Schema.suspend(() => Schema.Struct({
  parameters: Schema.optional(Schema.Boolean),
  environment: Schema.optional(Schema.Boolean),
  materials: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GrafeasV1SlsaProvenanceZeroTwoSlsaCompleteness" }) as any as Schema.Schema<GrafeasV1SlsaProvenanceZeroTwoSlsaCompleteness>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest {
  /** Required. Cloud Storage object containing the source manifest. This object must be a JSON file. */
  object?: string;
  /** Required. Cloud Storage bucket containing the source manifest (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)). */
  bucket?: string;
  /** Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used. */
  generation?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest> = Schema.suspend(() => Schema.Struct({
  object: Schema.optional(Schema.String),
  bucket: Schema.optional(Schema.String),
  generation: Schema.optional(Schema.String),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest>;

export interface GrafeasV1SlsaProvenanceZeroTwoSlsaBuilder {
  id?: string;
}

export const GrafeasV1SlsaProvenanceZeroTwoSlsaBuilder: Schema.Schema<GrafeasV1SlsaProvenanceZeroTwoSlsaBuilder> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "GrafeasV1SlsaProvenanceZeroTwoSlsaBuilder" }) as any as Schema.Schema<GrafeasV1SlsaProvenanceZeroTwoSlsaBuilder>;

export interface GrafeasV1SlsaProvenanceZeroTwoSlsaInvocation {
  environment?: Record<string, unknown>;
  configSource?: GrafeasV1SlsaProvenanceZeroTwoSlsaConfigSource;
  parameters?: Record<string, unknown>;
}

export const GrafeasV1SlsaProvenanceZeroTwoSlsaInvocation: Schema.Schema<GrafeasV1SlsaProvenanceZeroTwoSlsaInvocation> = Schema.suspend(() => Schema.Struct({
  environment: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  configSource: Schema.optional(GrafeasV1SlsaProvenanceZeroTwoSlsaConfigSource),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GrafeasV1SlsaProvenanceZeroTwoSlsaInvocation" }) as any as Schema.Schema<GrafeasV1SlsaProvenanceZeroTwoSlsaInvocation>;

export interface GrafeasV1SlsaProvenanceZeroTwoSlsaMetadata {
  buildStartedOn?: string;
  completeness?: GrafeasV1SlsaProvenanceZeroTwoSlsaCompleteness;
  buildInvocationId?: string;
  reproducible?: boolean;
  buildFinishedOn?: string;
}

export const GrafeasV1SlsaProvenanceZeroTwoSlsaMetadata: Schema.Schema<GrafeasV1SlsaProvenanceZeroTwoSlsaMetadata> = Schema.suspend(() => Schema.Struct({
  buildStartedOn: Schema.optional(Schema.String),
  completeness: Schema.optional(GrafeasV1SlsaProvenanceZeroTwoSlsaCompleteness),
  buildInvocationId: Schema.optional(Schema.String),
  reproducible: Schema.optional(Schema.Boolean),
  buildFinishedOn: Schema.optional(Schema.String),
})).annotate({ identifier: "GrafeasV1SlsaProvenanceZeroTwoSlsaMetadata" }) as any as Schema.Schema<GrafeasV1SlsaProvenanceZeroTwoSlsaMetadata>;

export interface GrafeasV1SlsaProvenanceZeroTwoSlsaMaterial {
  digest?: Record<string, string>;
  uri?: string;
}

export const GrafeasV1SlsaProvenanceZeroTwoSlsaMaterial: Schema.Schema<GrafeasV1SlsaProvenanceZeroTwoSlsaMaterial> = Schema.suspend(() => Schema.Struct({
  digest: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GrafeasV1SlsaProvenanceZeroTwoSlsaMaterial" }) as any as Schema.Schema<GrafeasV1SlsaProvenanceZeroTwoSlsaMaterial>;

export interface SlsaProvenanceZeroTwo {
  buildConfig?: Record<string, unknown>;
  builder?: GrafeasV1SlsaProvenanceZeroTwoSlsaBuilder;
  invocation?: GrafeasV1SlsaProvenanceZeroTwoSlsaInvocation;
  buildType?: string;
  metadata?: GrafeasV1SlsaProvenanceZeroTwoSlsaMetadata;
  materials?: Array<GrafeasV1SlsaProvenanceZeroTwoSlsaMaterial>;
}

export const SlsaProvenanceZeroTwo: Schema.Schema<SlsaProvenanceZeroTwo> = Schema.suspend(() => Schema.Struct({
  buildConfig: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  builder: Schema.optional(GrafeasV1SlsaProvenanceZeroTwoSlsaBuilder),
  invocation: Schema.optional(GrafeasV1SlsaProvenanceZeroTwoSlsaInvocation),
  buildType: Schema.optional(Schema.String),
  metadata: Schema.optional(GrafeasV1SlsaProvenanceZeroTwoSlsaMetadata),
  materials: Schema.optional(Schema.Array(GrafeasV1SlsaProvenanceZeroTwoSlsaMaterial)),
})).annotate({ identifier: "SlsaProvenanceZeroTwo" }) as any as Schema.Schema<SlsaProvenanceZeroTwo>;

export interface Identity {
  /** The revision independent identifier of the update. */
  updateId?: string;
  /** The revision number of the update. */
  revision?: number;
}

export const Identity: Schema.Schema<Identity> = Schema.suspend(() => Schema.Struct({
  updateId: Schema.optional(Schema.String),
  revision: Schema.optional(Schema.Number),
})).annotate({ identifier: "Identity" }) as any as Schema.Schema<Identity>;

export interface WindowsUpdate {
  /** The Microsoft Knowledge Base article IDs that are associated with the update. */
  kbArticleIds?: Array<string>;
  /** Required - The unique identifier for the update. */
  identity?: Identity;
  /** The list of categories to which the update belongs. */
  categories?: Array<Category>;
  /** The last published timestamp of the update. */
  lastPublishedTimestamp?: string;
  /** The localized title of the update. */
  title?: string;
  /** The hyperlink to the support information for the update. */
  supportUrl?: string;
  /** The localized description of the update. */
  description?: string;
}

export const WindowsUpdate: Schema.Schema<WindowsUpdate> = Schema.suspend(() => Schema.Struct({
  kbArticleIds: Schema.optional(Schema.Array(Schema.String)),
  identity: Schema.optional(Identity),
  categories: Schema.optional(Schema.Array(Category)),
  lastPublishedTimestamp: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  supportUrl: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "WindowsUpdate" }) as any as Schema.Schema<WindowsUpdate>;

export interface AnalysisCompleted {
  analysisType?: Array<string>;
}

export const AnalysisCompleted: Schema.Schema<AnalysisCompleted> = Schema.suspend(() => Schema.Struct({
  analysisType: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AnalysisCompleted" }) as any as Schema.Schema<AnalysisCompleted>;

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

export interface File {
  name?: string;
  digest?: Record<string, string>;
}

export const File: Schema.Schema<File> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  digest: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "File" }) as any as Schema.Schema<File>;

export interface DiscoveryOccurrence {
  /** The CPE of the resource being scanned. */
  cpe?: string;
  /** When an error is encountered this will contain a LocalizedMessage under details to show to the user. The LocalizedMessage is output only and populated by the API. */
  analysisStatusError?: Status;
  analysisCompleted?: AnalysisCompleted;
  /** Whether the resource is continuously analyzed. */
  continuousAnalysis?: "CONTINUOUS_ANALYSIS_UNSPECIFIED" | "ACTIVE" | "INACTIVE" | (string & {});
  /** The last time vulnerability scan results changed. */
  lastVulnerabilityUpdateTime?: string;
  /** The status of an SBOM generation. */
  sbomStatus?: SBOMStatus;
  /** Indicates any errors encountered during analysis of a resource. There could be 0 or more of these errors. */
  analysisError?: Array<Status>;
  /** Output only. The time occurrences related to this discovery occurrence were archived. */
  archiveTime?: string;
  /** The last time this resource was scanned. */
  lastScanTime?: string;
  /** Files that make up the resource described by the occurrence. */
  files?: Array<File>;
  /** The status of discovery for the resource. */
  analysisStatus?: "ANALYSIS_STATUS_UNSPECIFIED" | "PENDING" | "SCANNING" | "FINISHED_SUCCESS" | "COMPLETE" | "FINISHED_FAILED" | "FINISHED_UNSUPPORTED" | (string & {});
}

export const DiscoveryOccurrence: Schema.Schema<DiscoveryOccurrence> = Schema.suspend(() => Schema.Struct({
  cpe: Schema.optional(Schema.String),
  analysisStatusError: Schema.optional(Status),
  analysisCompleted: Schema.optional(AnalysisCompleted),
  continuousAnalysis: Schema.optional(Schema.String),
  lastVulnerabilityUpdateTime: Schema.optional(Schema.String),
  sbomStatus: Schema.optional(SBOMStatus),
  analysisError: Schema.optional(Schema.Array(Status)),
  archiveTime: Schema.optional(Schema.String),
  lastScanTime: Schema.optional(Schema.String),
  files: Schema.optional(Schema.Array(File)),
  analysisStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "DiscoveryOccurrence" }) as any as Schema.Schema<DiscoveryOccurrence>;

export interface KnowledgeBase {
  /** The KB name (generally of the form KB[0-9]+ (e.g., KB123456)). */
  name?: string;
  /** A link to the KB in the [Windows update catalog] (https://www.catalog.update.microsoft.com/). */
  url?: string;
}

export const KnowledgeBase: Schema.Schema<KnowledgeBase> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "KnowledgeBase" }) as any as Schema.Schema<KnowledgeBase>;

export interface WindowsDetail {
  /** Required. The names of the KBs which have hotfixes to mitigate this vulnerability. Note that there may be multiple hotfixes (and thus multiple KBs) that mitigate a given vulnerability. Currently any listed KBs presence is considered a fix. */
  fixingKbs?: Array<KnowledgeBase>;
  /** The description of this vulnerability. */
  description?: string;
  /** Required. The name of this vulnerability. */
  name?: string;
  /** Required. The [CPE URI](https://cpe.mitre.org/specification/) this vulnerability affects. */
  cpeUri?: string;
}

export const WindowsDetail: Schema.Schema<WindowsDetail> = Schema.suspend(() => Schema.Struct({
  fixingKbs: Schema.optional(Schema.Array(KnowledgeBase)),
  description: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  cpeUri: Schema.optional(Schema.String),
})).annotate({ identifier: "WindowsDetail" }) as any as Schema.Schema<WindowsDetail>;

export interface Material {
  uri?: string;
  digest?: Record<string, string>;
}

export const Material: Schema.Schema<Material> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  digest: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "Material" }) as any as Schema.Schema<Material>;

export interface SlsaRecipe {
  /** URI indicating what type of recipe was performed. It determines the meaning of recipe.entryPoint, recipe.arguments, recipe.environment, and materials. */
  type?: string;
  /** Index in materials containing the recipe steps that are not implied by recipe.type. For example, if the recipe type were "make", then this would point to the source containing the Makefile, not the make program itself. Set to -1 if the recipe doesn't come from a material, as zero is default unset value for int64. */
  definedInMaterial?: string;
  /** Collection of all external inputs that influenced the build on top of recipe.definedInMaterial and recipe.entryPoint. For example, if the recipe type were "make", then this might be the flags passed to make aside from the target, which is captured in recipe.entryPoint. Depending on the recipe Type, the structure may be different. */
  arguments?: Record<string, unknown>;
  /** String identifying the entry point into the build. This is often a path to a configuration file and/or a target label within that file. The syntax and meaning are defined by recipe.type. For example, if the recipe type were "make", then this would reference the directory in which to run make as well as which target to use. */
  entryPoint?: string;
  /** Any other builder-controlled inputs necessary for correctly evaluating the recipe. Usually only needed for reproducing the build but not evaluated as part of policy. Depending on the recipe Type, the structure may be different. */
  environment?: Record<string, unknown>;
}

export const SlsaRecipe: Schema.Schema<SlsaRecipe> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  definedInMaterial: Schema.optional(Schema.String),
  arguments: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  entryPoint: Schema.optional(Schema.String),
  environment: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "SlsaRecipe" }) as any as Schema.Schema<SlsaRecipe>;

export interface SlsaCompleteness {
  /** If true, the builder claims that recipe.environment is claimed to be complete. */
  environment?: boolean;
  /** If true, the builder claims that recipe.arguments is complete, meaning that all external inputs are properly captured in the recipe. */
  arguments?: boolean;
  /** If true, the builder claims that materials are complete, usually through some controls to prevent network access. Sometimes called "hermetic". */
  materials?: boolean;
}

export const SlsaCompleteness: Schema.Schema<SlsaCompleteness> = Schema.suspend(() => Schema.Struct({
  environment: Schema.optional(Schema.Boolean),
  arguments: Schema.optional(Schema.Boolean),
  materials: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "SlsaCompleteness" }) as any as Schema.Schema<SlsaCompleteness>;

export interface SlsaMetadata {
  /** If true, the builder claims that running the recipe on materials will produce bit-for-bit identical output. */
  reproducible?: boolean;
  /** Identifies the particular build invocation, which can be useful for finding associated logs or other ad-hoc analysis. The value SHOULD be globally unique, per in-toto Provenance spec. */
  buildInvocationId?: string;
  /** Indicates that the builder claims certain fields in this message to be complete. */
  completeness?: SlsaCompleteness;
  /** The timestamp of when the build started. */
  buildStartedOn?: string;
  /** The timestamp of when the build completed. */
  buildFinishedOn?: string;
}

export const SlsaMetadata: Schema.Schema<SlsaMetadata> = Schema.suspend(() => Schema.Struct({
  reproducible: Schema.optional(Schema.Boolean),
  buildInvocationId: Schema.optional(Schema.String),
  completeness: Schema.optional(SlsaCompleteness),
  buildStartedOn: Schema.optional(Schema.String),
  buildFinishedOn: Schema.optional(Schema.String),
})).annotate({ identifier: "SlsaMetadata" }) as any as Schema.Schema<SlsaMetadata>;

export interface SlsaBuilder {
  id?: string;
}

export const SlsaBuilder: Schema.Schema<SlsaBuilder> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "SlsaBuilder" }) as any as Schema.Schema<SlsaBuilder>;

export interface SlsaProvenance {
  /** The collection of artifacts that influenced the build including sources, dependencies, build tools, base images, and so on. This is considered to be incomplete unless metadata.completeness.materials is true. Unset or null is equivalent to empty. */
  materials?: Array<Material>;
  /** Identifies the configuration used for the build. When combined with materials, this SHOULD fully describe the build, such that re-running this recipe results in bit-for-bit identical output (if the build is reproducible). required */
  recipe?: SlsaRecipe;
  metadata?: SlsaMetadata;
  /** required */
  builder?: SlsaBuilder;
}

export const SlsaProvenance: Schema.Schema<SlsaProvenance> = Schema.suspend(() => Schema.Struct({
  materials: Schema.optional(Schema.Array(Material)),
  recipe: Schema.optional(SlsaRecipe),
  metadata: Schema.optional(SlsaMetadata),
  builder: Schema.optional(SlsaBuilder),
})).annotate({ identifier: "SlsaProvenance" }) as any as Schema.Schema<SlsaProvenance>;

export interface InTotoStatement {
  provenance?: InTotoProvenance;
  /** `https://slsa.dev/provenance/v0.1` for SlsaProvenance. */
  predicateType?: string;
  slsaProvenanceZeroTwo?: SlsaProvenanceZeroTwo;
  slsaProvenance?: SlsaProvenance;
  subject?: Array<Subject>;
  /** Always `https://in-toto.io/Statement/v0.1`. */
  _type?: string;
}

export const InTotoStatement: Schema.Schema<InTotoStatement> = Schema.suspend(() => Schema.Struct({
  provenance: Schema.optional(InTotoProvenance),
  predicateType: Schema.optional(Schema.String),
  slsaProvenanceZeroTwo: Schema.optional(SlsaProvenanceZeroTwo),
  slsaProvenance: Schema.optional(SlsaProvenance),
  subject: Schema.optional(Schema.Array(Subject)),
  _type: Schema.optional(Schema.String),
})).annotate({ identifier: "InTotoStatement" }) as any as Schema.Schema<InTotoStatement>;

export interface Location {
  /** Deprecated. The CPE URI in [CPE format](https://cpe.mitre.org/specification/) */
  cpeUri?: string;
  /** The path from which we gathered that this package/version is installed. */
  path?: string;
  /** Deprecated. The version installed at this location. */
  version?: Version;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  cpeUri: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  version: Schema.optional(Version),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface License {
  /** Comments */
  comments?: string;
  /** Often a single license can be used to represent the licensing terms. Sometimes it is necessary to include a choice of one or more licenses or some combination of license identifiers. Examples: "LGPL-2.1-only OR MIT", "LGPL-2.1-only AND MIT", "GPL-2.0-or-later WITH Bison-exception-2.2". */
  expression?: string;
}

export const License: Schema.Schema<License> = Schema.suspend(() => Schema.Struct({
  comments: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
})).annotate({ identifier: "License" }) as any as Schema.Schema<License>;

export interface PackageOccurrence {
  /** All of the places within the filesystem versions of this package have been found. */
  location?: Array<Location>;
  /** Output only. The version of the package. */
  version?: Version;
  /** Licenses that have been declared by the authors of the package. */
  license?: License;
  /** Output only. The CPU architecture for which packages in this distribution channel were built. Architecture will be blank for language packages. */
  architecture?: "ARCHITECTURE_UNSPECIFIED" | "X86" | "X64" | (string & {});
  /** Output only. The cpe_uri in [CPE format](https://cpe.mitre.org/specification/) denoting the package manager version distributing a package. The cpe_uri will be blank for language packages. */
  cpeUri?: string;
  /** Output only. The type of package; whether native or non native (e.g., ruby gems, node.js packages, etc.). */
  packageType?: string;
  /** Required. Output only. The name of the installed package. */
  name?: string;
}

export const PackageOccurrence: Schema.Schema<PackageOccurrence> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Schema.Array(Location)),
  version: Schema.optional(Version),
  license: Schema.optional(License),
  architecture: Schema.optional(Schema.String),
  cpeUri: Schema.optional(Schema.String),
  packageType: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "PackageOccurrence" }) as any as Schema.Schema<PackageOccurrence>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Secret {
  /** Map of environment variable name to its encrypted value. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step. Values can be at most 64 KB in size. There can be at most 100 secret values across all of a build's secrets. */
  secretEnv?: Record<string, string>;
  /** Cloud KMS key name to use to decrypt these envs. */
  kmsKeyName?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1Secret: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Secret> = Schema.suspend(() => Schema.Struct({
  secretEnv: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  kmsKeyName: Schema.optional(Schema.String),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1Secret" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Secret>;

export interface CISAKnownExploitedVulnerabilities {
  /** Whether the vulnerability is known to have been leveraged as part of a ransomware campaign. */
  knownRansomwareCampaignUse?: string;
}

export const CISAKnownExploitedVulnerabilities: Schema.Schema<CISAKnownExploitedVulnerabilities> = Schema.suspend(() => Schema.Struct({
  knownRansomwareCampaignUse: Schema.optional(Schema.String),
})).annotate({ identifier: "CISAKnownExploitedVulnerabilities" }) as any as Schema.Schema<CISAKnownExploitedVulnerabilities>;

export interface Hint {
  /** Required. The human readable name of this attestation authority, for example "qa". */
  humanReadableName?: string;
}

export const Hint: Schema.Schema<Hint> = Schema.suspend(() => Schema.Struct({
  humanReadableName: Schema.optional(Schema.String),
})).annotate({ identifier: "Hint" }) as any as Schema.Schema<Hint>;

export interface AttestationNote {
  /** Hint hints at the purpose of the attestation authority. */
  hint?: Hint;
}

export const AttestationNote: Schema.Schema<AttestationNote> = Schema.suspend(() => Schema.Struct({
  hint: Schema.optional(Hint),
})).annotate({ identifier: "AttestationNote" }) as any as Schema.Schema<AttestationNote>;

export interface Fingerprint {
  /** Required. The layer ID of the final layer in the Docker image's v1 representation. */
  v1Name?: string;
  /** Output only. The name of the image's v2 blobs computed via: [bottom] := v2_blobbottom := sha256(v2_blob[N] + " " + v2_name[N+1]) Only the name of the final blob is kept. */
  v2Name?: string;
  /** Required. The ordered list of v2 blobs that represent a given image. */
  v2Blob?: Array<string>;
}

export const Fingerprint: Schema.Schema<Fingerprint> = Schema.suspend(() => Schema.Struct({
  v1Name: Schema.optional(Schema.String),
  v2Name: Schema.optional(Schema.String),
  v2Blob: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Fingerprint" }) as any as Schema.Schema<Fingerprint>;

export interface ImageNote {
  /** Required. Immutable. The fingerprint of the base image. */
  fingerprint?: Fingerprint;
  /** Required. Immutable. The resource_url for the resource representing the basis of associated occurrence images. */
  resourceUrl?: string;
}

export const ImageNote: Schema.Schema<ImageNote> = Schema.suspend(() => Schema.Struct({
  fingerprint: Schema.optional(Fingerprint),
  resourceUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "ImageNote" }) as any as Schema.Schema<ImageNote>;

export interface DiscoveryNote {
  /** Required. Immutable. The kind of analysis that is handled by this discovery. */
  analysisKind?: "NOTE_KIND_UNSPECIFIED" | "VULNERABILITY" | "BUILD" | "IMAGE" | "PACKAGE" | "DEPLOYMENT" | "DISCOVERY" | "ATTESTATION" | "UPGRADE" | "COMPLIANCE" | "DSSE_ATTESTATION" | "VULNERABILITY_ASSESSMENT" | "SBOM_REFERENCE" | "SECRET" | (string & {});
}

export const DiscoveryNote: Schema.Schema<DiscoveryNote> = Schema.suspend(() => Schema.Struct({
  analysisKind: Schema.optional(Schema.String),
})).annotate({ identifier: "DiscoveryNote" }) as any as Schema.Schema<DiscoveryNote>;

export interface DSSEHint {
  /** Required. The human readable name of this attestation authority, for example "cloudbuild-prod". */
  humanReadableName?: string;
}

export const DSSEHint: Schema.Schema<DSSEHint> = Schema.suspend(() => Schema.Struct({
  humanReadableName: Schema.optional(Schema.String),
})).annotate({ identifier: "DSSEHint" }) as any as Schema.Schema<DSSEHint>;

export interface DSSEAttestationNote {
  /** DSSEHint hints at the purpose of the attestation authority. */
  hint?: DSSEHint;
}

export const DSSEAttestationNote: Schema.Schema<DSSEAttestationNote> = Schema.suspend(() => Schema.Struct({
  hint: Schema.optional(DSSEHint),
})).annotate({ identifier: "DSSEAttestationNote" }) as any as Schema.Schema<DSSEAttestationNote>;

export interface CVSS {
  availabilityImpact?: "IMPACT_UNSPECIFIED" | "IMPACT_HIGH" | "IMPACT_LOW" | "IMPACT_NONE" | "IMPACT_PARTIAL" | "IMPACT_COMPLETE" | (string & {});
  confidentialityImpact?: "IMPACT_UNSPECIFIED" | "IMPACT_HIGH" | "IMPACT_LOW" | "IMPACT_NONE" | "IMPACT_PARTIAL" | "IMPACT_COMPLETE" | (string & {});
  userInteraction?: "USER_INTERACTION_UNSPECIFIED" | "USER_INTERACTION_NONE" | "USER_INTERACTION_REQUIRED" | (string & {});
  /** The base score is a function of the base metric scores. */
  baseScore?: number;
  /** Base Metrics Represents the intrinsic characteristics of a vulnerability that are constant over time and across user environments. */
  attackVector?: "ATTACK_VECTOR_UNSPECIFIED" | "ATTACK_VECTOR_NETWORK" | "ATTACK_VECTOR_ADJACENT" | "ATTACK_VECTOR_LOCAL" | "ATTACK_VECTOR_PHYSICAL" | (string & {});
  integrityImpact?: "IMPACT_UNSPECIFIED" | "IMPACT_HIGH" | "IMPACT_LOW" | "IMPACT_NONE" | "IMPACT_PARTIAL" | "IMPACT_COMPLETE" | (string & {});
  impactScore?: number;
  scope?: "SCOPE_UNSPECIFIED" | "SCOPE_UNCHANGED" | "SCOPE_CHANGED" | (string & {});
  privilegesRequired?: "PRIVILEGES_REQUIRED_UNSPECIFIED" | "PRIVILEGES_REQUIRED_NONE" | "PRIVILEGES_REQUIRED_LOW" | "PRIVILEGES_REQUIRED_HIGH" | (string & {});
  attackComplexity?: "ATTACK_COMPLEXITY_UNSPECIFIED" | "ATTACK_COMPLEXITY_LOW" | "ATTACK_COMPLEXITY_HIGH" | "ATTACK_COMPLEXITY_MEDIUM" | (string & {});
  authentication?: "AUTHENTICATION_UNSPECIFIED" | "AUTHENTICATION_MULTIPLE" | "AUTHENTICATION_SINGLE" | "AUTHENTICATION_NONE" | (string & {});
  exploitabilityScore?: number;
}

export const CVSS: Schema.Schema<CVSS> = Schema.suspend(() => Schema.Struct({
  availabilityImpact: Schema.optional(Schema.String),
  confidentialityImpact: Schema.optional(Schema.String),
  userInteraction: Schema.optional(Schema.String),
  baseScore: Schema.optional(Schema.Number),
  attackVector: Schema.optional(Schema.String),
  integrityImpact: Schema.optional(Schema.String),
  impactScore: Schema.optional(Schema.Number),
  scope: Schema.optional(Schema.String),
  privilegesRequired: Schema.optional(Schema.String),
  attackComplexity: Schema.optional(Schema.String),
  authentication: Schema.optional(Schema.String),
  exploitabilityScore: Schema.optional(Schema.Number),
})).annotate({ identifier: "CVSS" }) as any as Schema.Schema<CVSS>;

export interface VulnerabilityNote {
  /** The note provider assigned severity of this vulnerability. */
  severity?: "SEVERITY_UNSPECIFIED" | "MINIMAL" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | (string & {});
  /** The CVSS score of this vulnerability. CVSS score is on a scale of 0 - 10 where 0 indicates low severity and 10 indicates high severity. */
  cvssScore?: number;
  /** Details of all known distros and packages affected by this vulnerability. */
  details?: Array<Detail>;
  /** The full description of the v2 CVSS for this vulnerability. */
  cvssV2?: CVSS;
  /** Windows details get their own format because the information format and model don't match a normal detail. Specifically Windows updates are done as patches, thus Windows vulnerabilities really are a missing package, rather than a package being at an incorrect version. */
  windowsDetails?: Array<WindowsDetail>;
  /** CVSS version used to populate cvss_score and severity. */
  cvssVersion?: "CVSS_VERSION_UNSPECIFIED" | "CVSS_VERSION_2" | "CVSS_VERSION_3" | (string & {});
  /** The time this information was last changed at the source. This is an upstream timestamp from the underlying information source - e.g. Ubuntu security tracker. */
  sourceUpdateTime?: string;
  /** The full description of the CVSSv3 for this vulnerability. */
  cvssV3?: CVSSv3;
}

export const VulnerabilityNote: Schema.Schema<VulnerabilityNote> = Schema.suspend(() => Schema.Struct({
  severity: Schema.optional(Schema.String),
  cvssScore: Schema.optional(Schema.Number),
  details: Schema.optional(Schema.Array(Detail)),
  cvssV2: Schema.optional(CVSS),
  windowsDetails: Schema.optional(Schema.Array(WindowsDetail)),
  cvssVersion: Schema.optional(Schema.String),
  sourceUpdateTime: Schema.optional(Schema.String),
  cvssV3: Schema.optional(CVSSv3),
})).annotate({ identifier: "VulnerabilityNote" }) as any as Schema.Schema<VulnerabilityNote>;

export interface BuildNote {
  /** Required. Immutable. Version of the builder which produced this build. */
  builderVersion?: string;
}

export const BuildNote: Schema.Schema<BuildNote> = Schema.suspend(() => Schema.Struct({
  builderVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "BuildNote" }) as any as Schema.Schema<BuildNote>;

export interface ComplianceVersion {
  /** The version of the benchmark. This is set to the version of the OS-specific CIS document the benchmark is defined in. */
  version?: string;
  /** The CPE URI (https://cpe.mitre.org/specification/) this benchmark is applicable to. */
  cpeUri?: string;
  /** The name of the document that defines this benchmark, e.g. "CIS Container-Optimized OS". */
  benchmarkDocument?: string;
}

export const ComplianceVersion: Schema.Schema<ComplianceVersion> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  cpeUri: Schema.optional(Schema.String),
  benchmarkDocument: Schema.optional(Schema.String),
})).annotate({ identifier: "ComplianceVersion" }) as any as Schema.Schema<ComplianceVersion>;

export interface CisBenchmark {
  profileLevel?: number;
  severity?: "SEVERITY_UNSPECIFIED" | "MINIMAL" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | (string & {});
}

export const CisBenchmark: Schema.Schema<CisBenchmark> = Schema.suspend(() => Schema.Struct({
  profileLevel: Schema.optional(Schema.Number),
  severity: Schema.optional(Schema.String),
})).annotate({ identifier: "CisBenchmark" }) as any as Schema.Schema<CisBenchmark>;

export interface ComplianceNote {
  /** Serialized scan instructions with a predefined format. */
  scanInstructions?: string;
  /** The title that identifies this compliance check. */
  title?: string;
  /** A description of remediation steps if the compliance check fails. */
  remediation?: string;
  /** A rationale for the existence of this compliance check. */
  rationale?: string;
  impact?: string;
  /** A description about this compliance check. */
  description?: string;
  /** The OS and config versions the benchmark applies to. */
  version?: Array<ComplianceVersion>;
  cisBenchmark?: CisBenchmark;
}

export const ComplianceNote: Schema.Schema<ComplianceNote> = Schema.suspend(() => Schema.Struct({
  scanInstructions: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  remediation: Schema.optional(Schema.String),
  rationale: Schema.optional(Schema.String),
  impact: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  version: Schema.optional(Schema.Array(ComplianceVersion)),
  cisBenchmark: Schema.optional(CisBenchmark),
})).annotate({ identifier: "ComplianceNote" }) as any as Schema.Schema<ComplianceNote>;

export interface Publisher {
  /** Provides information about the authority of the issuing party to release the document, in particular, the party's constituency and responsibilities or other obligations. */
  issuingAuthority?: string;
  /** Name of the publisher. Examples: 'Google', 'Google Cloud Platform'. */
  name?: string;
  /** The context or namespace. Contains a URL which is under control of the issuing party and can be used as a globally unique identifier for that issuing party. Example: https://csaf.io */
  publisherNamespace?: string;
}

export const Publisher: Schema.Schema<Publisher> = Schema.suspend(() => Schema.Struct({
  issuingAuthority: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  publisherNamespace: Schema.optional(Schema.String),
})).annotate({ identifier: "Publisher" }) as any as Schema.Schema<Publisher>;

export interface RelatedUrl {
  /** Label to describe usage of the URL. */
  label?: string;
  /** Specific URL associated with the resource. */
  url?: string;
}

export const RelatedUrl: Schema.Schema<RelatedUrl> = Schema.suspend(() => Schema.Struct({
  label: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "RelatedUrl" }) as any as Schema.Schema<RelatedUrl>;

export interface Remediation {
  /** Contains the URL where to obtain the remediation. */
  remediationUri?: RelatedUrl;
  /** Contains a comprehensive human-readable discussion of the remediation. */
  details?: string;
  /** The type of remediation that can be applied. */
  remediationType?: "REMEDIATION_TYPE_UNSPECIFIED" | "MITIGATION" | "NO_FIX_PLANNED" | "NONE_AVAILABLE" | "VENDOR_FIX" | "WORKAROUND" | (string & {});
}

export const Remediation: Schema.Schema<Remediation> = Schema.suspend(() => Schema.Struct({
  remediationUri: Schema.optional(RelatedUrl),
  details: Schema.optional(Schema.String),
  remediationType: Schema.optional(Schema.String),
})).annotate({ identifier: "Remediation" }) as any as Schema.Schema<Remediation>;

export interface Justification {
  /** The justification type for this vulnerability. */
  justificationType?: "JUSTIFICATION_TYPE_UNSPECIFIED" | "COMPONENT_NOT_PRESENT" | "VULNERABLE_CODE_NOT_PRESENT" | "VULNERABLE_CODE_NOT_IN_EXECUTE_PATH" | "VULNERABLE_CODE_CANNOT_BE_CONTROLLED_BY_ADVERSARY" | "INLINE_MITIGATIONS_ALREADY_EXIST" | (string & {});
  /** Additional details on why this justification was chosen. */
  details?: string;
}

export const Justification: Schema.Schema<Justification> = Schema.suspend(() => Schema.Struct({
  justificationType: Schema.optional(Schema.String),
  details: Schema.optional(Schema.String),
})).annotate({ identifier: "Justification" }) as any as Schema.Schema<Justification>;

export interface Assessment {
  /** Specifies details on how to handle (and presumably, fix) a vulnerability. */
  remediations?: Array<Remediation>;
  /** Contains information about the impact of this vulnerability, this will change with time. */
  impacts?: Array<string>;
  /** Holds the MITRE standard Common Vulnerabilities and Exposures (CVE) tracking number for the vulnerability. Deprecated: Use vulnerability_id instead to denote CVEs. */
  cve?: string;
  /** Holds a list of references associated with this vulnerability item and assessment. These uris have additional information about the vulnerability and the assessment itself. E.g. Link to a document which details how this assessment concluded the state of this vulnerability. */
  relatedUris?: Array<RelatedUrl>;
  /** Provides the state of this Vulnerability assessment. */
  state?: "STATE_UNSPECIFIED" | "AFFECTED" | "NOT_AFFECTED" | "FIXED" | "UNDER_INVESTIGATION" | (string & {});
  /** Justification provides the justification when the state of the assessment if NOT_AFFECTED. */
  justification?: Justification;
  /** A detailed description of this Vex. */
  longDescription?: string;
  /** The vulnerability identifier for this Assessment. Will hold one of common identifiers e.g. CVE, GHSA etc. */
  vulnerabilityId?: string;
  /** A one sentence description of this Vex. */
  shortDescription?: string;
}

export const Assessment: Schema.Schema<Assessment> = Schema.suspend(() => Schema.Struct({
  remediations: Schema.optional(Schema.Array(Remediation)),
  impacts: Schema.optional(Schema.Array(Schema.String)),
  cve: Schema.optional(Schema.String),
  relatedUris: Schema.optional(Schema.Array(RelatedUrl)),
  state: Schema.optional(Schema.String),
  justification: Schema.optional(Justification),
  longDescription: Schema.optional(Schema.String),
  vulnerabilityId: Schema.optional(Schema.String),
  shortDescription: Schema.optional(Schema.String),
})).annotate({ identifier: "Assessment" }) as any as Schema.Schema<Assessment>;

export interface Product {
  /** Name of the product. */
  name?: string;
  /** Token that identifies a product so that it can be referred to from other parts in the document. There is no predefined format as long as it uniquely identifies a group in the context of the current document. */
  id?: string;
  /** Contains a URI which is vendor-specific. Example: The artifact repository URL of an image. */
  genericUri?: string;
}

export const Product: Schema.Schema<Product> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  genericUri: Schema.optional(Schema.String),
})).annotate({ identifier: "Product" }) as any as Schema.Schema<Product>;

export interface VulnerabilityAssessmentNote {
  /** Publisher details of this Note. */
  publisher?: Publisher;
  /** Identifies the language used by this document, corresponding to IETF BCP 47 / RFC 5646. */
  languageCode?: string;
  /** The title of the note. E.g. `Vex-Debian-11.4` */
  title?: string;
  /** A detailed description of this Vex. */
  longDescription?: string;
  /** Represents a vulnerability assessment for the product. */
  assessment?: Assessment;
  /** The product affected by this vex. */
  product?: Product;
  /** A one sentence description of this Vex. */
  shortDescription?: string;
}

export const VulnerabilityAssessmentNote: Schema.Schema<VulnerabilityAssessmentNote> = Schema.suspend(() => Schema.Struct({
  publisher: Schema.optional(Publisher),
  languageCode: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  longDescription: Schema.optional(Schema.String),
  assessment: Schema.optional(Assessment),
  product: Schema.optional(Product),
  shortDescription: Schema.optional(Schema.String),
})).annotate({ identifier: "VulnerabilityAssessmentNote" }) as any as Schema.Schema<VulnerabilityAssessmentNote>;

export interface UpgradeDistribution {
  /** The operating system classification of this Upgrade, as specified by the upstream operating system upgrade feed. For Windows the classification is one of the category_ids listed at https://docs.microsoft.com/en-us/previous-versions/windows/desktop/ff357803(v=vs.85) */
  classification?: string;
  /** The severity as specified by the upstream operating system. */
  severity?: string;
  /** The cve tied to this Upgrade. */
  cve?: Array<string>;
  /** Required - The specific operating system this metadata applies to. See https://cpe.mitre.org/specification/. */
  cpeUri?: string;
}

export const UpgradeDistribution: Schema.Schema<UpgradeDistribution> = Schema.suspend(() => Schema.Struct({
  classification: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
  cve: Schema.optional(Schema.Array(Schema.String)),
  cpeUri: Schema.optional(Schema.String),
})).annotate({ identifier: "UpgradeDistribution" }) as any as Schema.Schema<UpgradeDistribution>;

export interface UpgradeNote {
  /** Required for Windows OS. Represents the metadata about the Windows update. */
  windowsUpdate?: WindowsUpdate;
  /** Metadata about the upgrade for each specific operating system. */
  distributions?: Array<UpgradeDistribution>;
  /** Required for non-Windows OS. The package this Upgrade is for. */
  package?: string;
  /** Required for non-Windows OS. The version of the package in machine + human readable form. */
  version?: Version;
}

export const UpgradeNote: Schema.Schema<UpgradeNote> = Schema.suspend(() => Schema.Struct({
  windowsUpdate: Schema.optional(WindowsUpdate),
  distributions: Schema.optional(Schema.Array(UpgradeDistribution)),
  package: Schema.optional(Schema.String),
  version: Schema.optional(Version),
})).annotate({ identifier: "UpgradeNote" }) as any as Schema.Schema<UpgradeNote>;

export interface Digest {
  /** `SHA1`, `SHA512` etc. */
  algo?: string;
  /** Value of the digest. */
  digestBytes?: string;
}

export const Digest: Schema.Schema<Digest> = Schema.suspend(() => Schema.Struct({
  algo: Schema.optional(Schema.String),
  digestBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "Digest" }) as any as Schema.Schema<Digest>;

export interface Distribution {
  /** The distribution channel-specific homepage for this package. */
  url?: string;
  /** A freeform string denoting the maintainer of this package. */
  maintainer?: string;
  /** Required. The cpe_uri in [CPE format](https://cpe.mitre.org/specification/) denoting the package manager version distributing a package. */
  cpeUri?: string;
  /** The distribution channel-specific description of this package. */
  description?: string;
  /** The latest available version of this package in this distribution channel. */
  latestVersion?: Version;
  /** The CPU architecture for which packages in this distribution channel were built. */
  architecture?: "ARCHITECTURE_UNSPECIFIED" | "X86" | "X64" | (string & {});
}

export const Distribution: Schema.Schema<Distribution> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  maintainer: Schema.optional(Schema.String),
  cpeUri: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  latestVersion: Schema.optional(Version),
  architecture: Schema.optional(Schema.String),
})).annotate({ identifier: "Distribution" }) as any as Schema.Schema<Distribution>;

export interface PackageNote {
  /** Hash value, typically a file digest, that allows unique identification a specific package. */
  digest?: Array<Digest>;
  /** A freeform text denoting the maintainer of this package. */
  maintainer?: string;
  /** The description of this package. */
  description?: string;
  /** The cpe_uri in [CPE format](https://cpe.mitre.org/specification/) denoting the package manager version distributing a package. The cpe_uri will be blank for language packages. */
  cpeUri?: string;
  /** The CPU architecture for which packages in this distribution channel were built. Architecture will be blank for language packages. */
  architecture?: "ARCHITECTURE_UNSPECIFIED" | "X86" | "X64" | (string & {});
  /** The type of package; whether native or non native (e.g., ruby gems, node.js packages, etc.). */
  packageType?: string;
  /** The version of the package. */
  version?: Version;
  /** Deprecated. The various channels by which a package is distributed. */
  distribution?: Array<Distribution>;
  /** The homepage for this package. */
  url?: string;
  /** Licenses that have been declared by the authors of the package. */
  license?: License;
  /** Required. Immutable. The name of the package. */
  name?: string;
}

export const PackageNote: Schema.Schema<PackageNote> = Schema.suspend(() => Schema.Struct({
  digest: Schema.optional(Schema.Array(Digest)),
  maintainer: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  cpeUri: Schema.optional(Schema.String),
  architecture: Schema.optional(Schema.String),
  packageType: Schema.optional(Schema.String),
  version: Schema.optional(Version),
  distribution: Schema.optional(Schema.Array(Distribution)),
  url: Schema.optional(Schema.String),
  license: Schema.optional(License),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "PackageNote" }) as any as Schema.Schema<PackageNote>;

export interface SecretNote {
}

export const SecretNote: Schema.Schema<SecretNote> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SecretNote" }) as any as Schema.Schema<SecretNote>;

export interface Note {
  /** A note describing an attestation role. */
  attestation?: AttestationNote;
  /** A note describing a base image. */
  image?: ImageNote;
  /** A note describing the initial analysis of a resource. */
  discovery?: DiscoveryNote;
  /** A note describing something that can be deployed. */
  deployment?: DeploymentNote;
  /** A note describing a dsse attestation note. */
  dsseAttestation?: DSSEAttestationNote;
  /** Other notes related to this note. */
  relatedNoteNames?: Array<string>;
  /** A detailed description of this note. */
  longDescription?: string;
  /** A note describing a package vulnerability. */
  vulnerability?: VulnerabilityNote;
  /** A note describing build provenance for a verifiable build. */
  build?: BuildNote;
  /** A note describing a compliance check. */
  compliance?: ComplianceNote;
  /** A one sentence description of this note. */
  shortDescription?: string;
  /** Output only. The name of the note in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. */
  name?: string;
  /** Output only. The time this note was created. This field can be used as a filter in list requests. */
  createTime?: string;
  /** Output only. The time this note was last updated. This field can be used as a filter in list requests. */
  updateTime?: string;
  /** Time of expiration for this note. Empty if note does not expire. */
  expirationTime?: string;
  /** A note describing a vulnerability assessment. */
  vulnerabilityAssessment?: VulnerabilityAssessmentNote;
  /** The timestamp when the advisory was first published by the source feed. */
  advisoryPublishTime?: string;
  /** A note describing an SBOM reference. */
  sbomReference?: SBOMReferenceNote;
  /** A note describing available package upgrades. */
  upgrade?: UpgradeNote;
  /** A note describing a package hosted by various package managers. */
  package?: PackageNote;
  /** Output only. The type of analysis. This field can be used as a filter in list requests. */
  kind?: "NOTE_KIND_UNSPECIFIED" | "VULNERABILITY" | "BUILD" | "IMAGE" | "PACKAGE" | "DEPLOYMENT" | "DISCOVERY" | "ATTESTATION" | "UPGRADE" | "COMPLIANCE" | "DSSE_ATTESTATION" | "VULNERABILITY_ASSESSMENT" | "SBOM_REFERENCE" | "SECRET" | (string & {});
  /** URLs associated with this note. */
  relatedUrl?: Array<RelatedUrl>;
  /** A note describing a secret. */
  secret?: SecretNote;
}

export const Note: Schema.Schema<Note> = Schema.suspend(() => Schema.Struct({
  attestation: Schema.optional(AttestationNote),
  image: Schema.optional(ImageNote),
  discovery: Schema.optional(DiscoveryNote),
  deployment: Schema.optional(DeploymentNote),
  dsseAttestation: Schema.optional(DSSEAttestationNote),
  relatedNoteNames: Schema.optional(Schema.Array(Schema.String)),
  longDescription: Schema.optional(Schema.String),
  vulnerability: Schema.optional(VulnerabilityNote),
  build: Schema.optional(BuildNote),
  compliance: Schema.optional(ComplianceNote),
  shortDescription: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  expirationTime: Schema.optional(Schema.String),
  vulnerabilityAssessment: Schema.optional(VulnerabilityAssessmentNote),
  advisoryPublishTime: Schema.optional(Schema.String),
  sbomReference: Schema.optional(SBOMReferenceNote),
  upgrade: Schema.optional(UpgradeNote),
  package: Schema.optional(PackageNote),
  kind: Schema.optional(Schema.String),
  relatedUrl: Schema.optional(Schema.Array(RelatedUrl)),
  secret: Schema.optional(SecretNote),
})).annotate({ identifier: "Note" }) as any as Schema.Schema<Note>;

export interface BatchCreateNotesRequest {
  /** Required. The notes to create. Max allowed length is 1000. */
  notes?: Record<string, Note>;
}

export const BatchCreateNotesRequest: Schema.Schema<BatchCreateNotesRequest> = Schema.suspend(() => Schema.Struct({
  notes: Schema.optional(Schema.Record(Schema.String, Note)),
})).annotate({ identifier: "BatchCreateNotesRequest" }) as any as Schema.Schema<BatchCreateNotesRequest>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1BuildWarning {
  /** Explanation of the warning generated. */
  text?: string;
  /** The priority for this warning. */
  priority?: "PRIORITY_UNSPECIFIED" | "INFO" | "WARNING" | "ALERT" | (string & {});
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1BuildWarning: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildWarning> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.String),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1BuildWarning" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildWarning>;

export interface Risk {
  /** CISA maintains the authoritative source of vulnerabilities that have been exploited in the wild. */
  cisaKev?: CISAKnownExploitedVulnerabilities;
  /** The Exploit Prediction Scoring System (EPSS) estimates the likelihood (probability) that a software vulnerability will be exploited in the wild. */
  epss?: ExploitPredictionScoringSystem;
}

export const Risk: Schema.Schema<Risk> = Schema.suspend(() => Schema.Struct({
  cisaKev: Schema.optional(CISAKnownExploitedVulnerabilities),
  epss: Schema.optional(ExploitPredictionScoringSystem),
})).annotate({ identifier: "Risk" }) as any as Schema.Schema<Risk>;

export interface CloudStorageLocation {
}

export const CloudStorageLocation: Schema.Schema<CloudStorageLocation> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CloudStorageLocation" }) as any as Schema.Schema<CloudStorageLocation>;

export interface VexAssessment {
  /** Specifies details on how to handle (and presumably, fix) a vulnerability. */
  remediations?: Array<Remediation>;
  /** Justification provides the justification when the state of the assessment if NOT_AFFECTED. */
  justification?: Justification;
  /** The vulnerability identifier for this Assessment. Will hold one of common identifiers e.g. CVE, GHSA etc. */
  vulnerabilityId?: string;
  /** Provides the state of this Vulnerability assessment. */
  state?: "STATE_UNSPECIFIED" | "AFFECTED" | "NOT_AFFECTED" | "FIXED" | "UNDER_INVESTIGATION" | (string & {});
  /** The VulnerabilityAssessment note from which this VexAssessment was generated. This will be of the form: `projects/[PROJECT_ID]/notes/[NOTE_ID]`. */
  noteName?: string;
  /** Holds a list of references associated with this vulnerability item and assessment. */
  relatedUris?: Array<RelatedUrl>;
  /** Contains information about the impact of this vulnerability, this will change with time. */
  impacts?: Array<string>;
  /** Holds the MITRE standard Common Vulnerabilities and Exposures (CVE) tracking number for the vulnerability. Deprecated: Use vulnerability_id instead to denote CVEs. */
  cve?: string;
}

export const VexAssessment: Schema.Schema<VexAssessment> = Schema.suspend(() => Schema.Struct({
  remediations: Schema.optional(Schema.Array(Remediation)),
  justification: Schema.optional(Justification),
  vulnerabilityId: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  noteName: Schema.optional(Schema.String),
  relatedUris: Schema.optional(Schema.Array(RelatedUrl)),
  impacts: Schema.optional(Schema.Array(Schema.String)),
  cve: Schema.optional(Schema.String),
})).annotate({ identifier: "VexAssessment" }) as any as Schema.Schema<VexAssessment>;

export interface SbomReferenceIntotoPayload {
  /** Set of software artifacts that the attestation applies to. Each element represents a single software artifact. */
  subject?: Array<Subject>;
  /** Additional parameters of the Predicate. Includes the actual data about the SBOM. */
  predicate?: SbomReferenceIntotoPredicate;
  /** Identifier for the schema of the Statement. */
  _type?: string;
  /** URI identifying the type of the Predicate. */
  predicateType?: string;
}

export const SbomReferenceIntotoPayload: Schema.Schema<SbomReferenceIntotoPayload> = Schema.suspend(() => Schema.Struct({
  subject: Schema.optional(Schema.Array(Subject)),
  predicate: Schema.optional(SbomReferenceIntotoPredicate),
  _type: Schema.optional(Schema.String),
  predicateType: Schema.optional(Schema.String),
})).annotate({ identifier: "SbomReferenceIntotoPayload" }) as any as Schema.Schema<SbomReferenceIntotoPayload>;

export interface SBOMReferenceOccurrence {
  /** The kind of payload that SbomReferenceIntotoPayload takes. Since it's in the intoto format, this value is expected to be 'application/vnd.in-toto+json'. */
  payloadType?: string;
  /** The actual payload that contains the SBOM reference data. */
  payload?: SbomReferenceIntotoPayload;
  /** The signatures over the payload. */
  signatures?: Array<EnvelopeSignature>;
}

export const SBOMReferenceOccurrence: Schema.Schema<SBOMReferenceOccurrence> = Schema.suspend(() => Schema.Struct({
  payloadType: Schema.optional(Schema.String),
  payload: Schema.optional(SbomReferenceIntotoPayload),
  signatures: Schema.optional(Schema.Array(EnvelopeSignature)),
})).annotate({ identifier: "SBOMReferenceOccurrence" }) as any as Schema.Schema<SBOMReferenceOccurrence>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedGoModule {
  /** Hash types and values of the Go Module Artifact. */
  fileHashes?: ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes;
  /** Output only. Path to the artifact in Artifact Registry. */
  artifactRegistryPackage?: string;
  /** URI of the uploaded artifact. */
  uri?: string;
  /** Output only. Stores timing information for pushing the specified artifact. */
  pushTiming?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedGoModule: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedGoModule> = Schema.suspend(() => Schema.Struct({
  fileHashes: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes),
  artifactRegistryPackage: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  pushTiming: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedGoModule" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedGoModule>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1BuiltImage {
  /** Output only. Stores timing information for pushing the specified image. */
  pushTiming?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
  /** Docker Registry 2.0 digest. */
  digest?: string;
  /** Name used to push the container image to Google Container Registry, as presented to `docker push`. */
  name?: string;
  /** Output only. Path to the artifact in Artifact Registry. */
  artifactRegistryPackage?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1BuiltImage: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuiltImage> = Schema.suspend(() => Schema.Struct({
  pushTiming: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan),
  digest: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  artifactRegistryPackage: Schema.optional(Schema.String),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1BuiltImage" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuiltImage>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact {
  /** Output only. Stores timing information for pushing the specified artifact. */
  pushTiming?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
  /** Output only. Path to the artifact in Artifact Registry. */
  artifactRegistryPackage?: string;
  /** Hash types and values of the Maven Artifact. */
  fileHashes?: ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes;
  /** URI of the uploaded artifact. */
  uri?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact> = Schema.suspend(() => Schema.Struct({
  pushTiming: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan),
  artifactRegistryPackage: Schema.optional(Schema.String),
  fileHashes: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes),
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Results {
  /** List of build step digests, in the order corresponding to build step indices. */
  buildStepImages?: Array<string>;
  /** Path to the artifact manifest for non-container artifacts uploaded to Cloud Storage. Only populated when artifacts are uploaded to Cloud Storage. */
  artifactManifest?: string;
  /** Optional. Go module artifacts uploaded to Artifact Registry at the end of the build. */
  goModules?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedGoModule>;
  /** List of build step outputs, produced by builder images, in the order corresponding to build step indices. [Cloud Builders](https://cloud.google.com/cloud-build/docs/cloud-builders) can produce this output by writing to `$BUILDER_OUTPUT/output`. Only the first 50KB of data is stored. Note that the `$BUILDER_OUTPUT` variable is read-only and can't be substituted. */
  buildStepOutputs?: Array<string>;
  /** Npm packages uploaded to Artifact Registry at the end of the build. */
  npmPackages?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedNpmPackage>;
  /** Time to push all non-container artifacts to Cloud Storage. */
  artifactTiming?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
  /** Container images that were built as a part of the build. */
  images?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1BuiltImage>;
  /** Python artifacts uploaded to Artifact Registry at the end of the build. */
  pythonPackages?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage>;
  /** Number of non-container artifacts uploaded to Cloud Storage. Only populated when artifacts are uploaded to Cloud Storage. */
  numArtifacts?: string;
  /** Maven artifacts uploaded to Artifact Registry at the end of the build. */
  mavenArtifacts?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact>;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1Results: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Results> = Schema.suspend(() => Schema.Struct({
  buildStepImages: Schema.optional(Schema.Array(Schema.String)),
  artifactManifest: Schema.optional(Schema.String),
  goModules: Schema.optional(Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedGoModule)),
  buildStepOutputs: Schema.optional(Schema.Array(Schema.String)),
  npmPackages: Schema.optional(Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedNpmPackage)),
  artifactTiming: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan),
  images: Schema.optional(Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1BuiltImage)),
  pythonPackages: Schema.optional(Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage)),
  numArtifacts: Schema.optional(Schema.String),
  mavenArtifacts: Schema.optional(Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact)),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1Results" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Results>;

export interface NonCompliantFile {
  /** Command to display the non-compliant files. */
  displayCommand?: string;
  /** Explains why a file is non compliant for a CIS check. */
  reason?: string;
  /** Empty if `display_command` is set. */
  path?: string;
}

export const NonCompliantFile: Schema.Schema<NonCompliantFile> = Schema.suspend(() => Schema.Struct({
  displayCommand: Schema.optional(Schema.String),
  reason: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
})).annotate({ identifier: "NonCompliantFile" }) as any as Schema.Schema<NonCompliantFile>;

export interface ComplianceOccurrence {
  nonComplianceReason?: string;
  /** The OS and config version the benchmark was run on. */
  version?: ComplianceVersion;
  nonCompliantFiles?: Array<NonCompliantFile>;
}

export const ComplianceOccurrence: Schema.Schema<ComplianceOccurrence> = Schema.suspend(() => Schema.Struct({
  nonComplianceReason: Schema.optional(Schema.String),
  version: Schema.optional(ComplianceVersion),
  nonCompliantFiles: Schema.optional(Schema.Array(NonCompliantFile)),
})).annotate({ identifier: "ComplianceOccurrence" }) as any as Schema.Schema<ComplianceOccurrence>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceRepository {
  /** Location of the Git repository. */
  url?: string;
  /** The Developer Connect Git repository link formatted as `projects/* /locations/* /connections/* /gitRepositoryLink/*` */
  developerConnect?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceRepository: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceRepository> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  developerConnect: Schema.optional(Schema.String),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceRepository" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceRepository>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceDependency {
  /** Required. The kind of repo (url or dev connect). */
  repository?: ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceRepository;
  /** Required. Where should the files be placed on the worker. */
  destPath?: string;
  /** Required. The revision that we will fetch the repo at. */
  revision?: string;
  /** Optional. How much history should be fetched for the build (default 1, -1 for all history). */
  depth?: string;
  /** Optional. True if submodules should be fetched too (default false). */
  recurseSubmodules?: boolean;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceDependency: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceDependency> = Schema.suspend(() => Schema.Struct({
  repository: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceRepository),
  destPath: Schema.optional(Schema.String),
  revision: Schema.optional(Schema.String),
  depth: Schema.optional(Schema.String),
  recurseSubmodules: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceDependency" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceDependency>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Dependency {
  /** Represents a git repository as a build dependency. */
  gitSource?: ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceDependency;
  /** If set to true disable all dependency fetching (ignoring the default source as well). */
  empty?: boolean;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1Dependency: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Dependency> = Schema.suspend(() => Schema.Struct({
  gitSource: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceDependency),
  empty: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1Dependency" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Dependency>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1BuildFailureInfo {
  /** Explains the failure issue in more detail using hard-coded text. */
  detail?: string;
  /** The name of the failure. */
  type?: "FAILURE_TYPE_UNSPECIFIED" | "PUSH_FAILED" | "PUSH_IMAGE_NOT_FOUND" | "PUSH_NOT_AUTHORIZED" | "LOGGING_FAILURE" | "USER_BUILD_STEP" | "FETCH_SOURCE_FAILED" | (string & {});
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1BuildFailureInfo: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildFailureInfo> = Schema.suspend(() => Schema.Struct({
  detail: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1BuildFailureInfo" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildFailureInfo>;

export interface Volume {
  /** Name of the volume to mount. Volume names must be unique per build step and must be valid names for Docker volumes. Each named volume must be used by at least two build steps. */
  name?: string;
  /** Path at which to mount the volume. Paths must be absolute and cannot conflict with other volume paths on the same build step or with certain reserved volume paths. */
  path?: string;
}

export const Volume: Schema.Schema<Volume> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
})).annotate({ identifier: "Volume" }) as any as Schema.Schema<Volume>;

export interface Envelope {
  signatures?: Array<EnvelopeSignature>;
  payload?: string;
  payloadType?: string;
}

export const Envelope: Schema.Schema<Envelope> = Schema.suspend(() => Schema.Struct({
  signatures: Schema.optional(Schema.Array(EnvelopeSignature)),
  payload: Schema.optional(Schema.String),
  payloadType: Schema.optional(Schema.String),
})).annotate({ identifier: "Envelope" }) as any as Schema.Schema<Envelope>;

export interface DSSEAttestationOccurrence {
  /** If doing something security critical, make sure to verify the signatures in this metadata. */
  envelope?: Envelope;
  statement?: InTotoStatement;
}

export const DSSEAttestationOccurrence: Schema.Schema<DSSEAttestationOccurrence> = Schema.suspend(() => Schema.Struct({
  envelope: Schema.optional(Envelope),
  statement: Schema.optional(InTotoStatement),
})).annotate({ identifier: "DSSEAttestationOccurrence" }) as any as Schema.Schema<DSSEAttestationOccurrence>;

export interface DeploymentOccurrence {
  /** End of the lifetime of this deployment. */
  undeployTime?: string;
  /** Configuration used to create this deployment. */
  config?: string;
  /** Output only. Resource URI for the artifact being deployed taken from the deployable field with the same name. */
  resourceUri?: Array<string>;
  /** Required. Beginning of the lifetime of this deployment. */
  deployTime?: string;
  /** Platform hosting this deployment. */
  platform?: "PLATFORM_UNSPECIFIED" | "GKE" | "FLEX" | "CUSTOM" | (string & {});
  /** Identity of the user that triggered this deployment. */
  userEmail?: string;
  /** Address of the runtime element hosting this deployment. */
  address?: string;
}

export const DeploymentOccurrence: Schema.Schema<DeploymentOccurrence> = Schema.suspend(() => Schema.Struct({
  undeployTime: Schema.optional(Schema.String),
  config: Schema.optional(Schema.String),
  resourceUri: Schema.optional(Schema.Array(Schema.String)),
  deployTime: Schema.optional(Schema.String),
  platform: Schema.optional(Schema.String),
  userEmail: Schema.optional(Schema.String),
  address: Schema.optional(Schema.String),
})).annotate({ identifier: "DeploymentOccurrence" }) as any as Schema.Schema<DeploymentOccurrence>;

export interface Signature {
  /** The identifier for the public key that verifies this signature. * The `public_key_id` is required. * The `public_key_id` SHOULD be an RFC3986 conformant URI. * When possible, the `public_key_id` SHOULD be an immutable reference, such as a cryptographic digest. Examples of valid `public_key_id`s: OpenPGP V4 public key fingerprint: * "openpgp4fpr:74FAF3B861BDA0870C7B6DEF607E48D2A663AEEA" See https://www.iana.org/assignments/uri-schemes/prov/openpgp4fpr for more details on this scheme. RFC6920 digest-named SubjectPublicKeyInfo (digest of the DER serialization): * "ni:///sha-256;cD9o9Cq6LG3jD0iKXqEi_vdjJGecm_iXkbqVoScViaU" * "nih:///sha-256;703f68f42aba2c6de30f488a5ea122fef76324679c9bf89791ba95a1271589a5" */
  publicKeyId?: string;
  /** The content of the signature, an opaque bytestring. The payload that this signature verifies MUST be unambiguously provided with the Signature during verification. A wrapper message might provide the payload explicitly. Alternatively, a message might have a canonical serialization that can always be unambiguously computed to derive the payload. */
  signature?: string;
}

export const Signature: Schema.Schema<Signature> = Schema.suspend(() => Schema.Struct({
  publicKeyId: Schema.optional(Schema.String),
  signature: Schema.optional(Schema.String),
})).annotate({ identifier: "Signature" }) as any as Schema.Schema<Signature>;

export interface Jwt {
  /** The compact encoding of a JWS, which is always three base64 encoded strings joined by periods. For details, see: https://tools.ietf.org/html/rfc7515.html#section-3.1 */
  compactJwt?: string;
}

export const Jwt: Schema.Schema<Jwt> = Schema.suspend(() => Schema.Struct({
  compactJwt: Schema.optional(Schema.String),
})).annotate({ identifier: "Jwt" }) as any as Schema.Schema<Jwt>;

export interface AttestationOccurrence {
  /** Required. The serialized payload that is verified by one or more `signatures`. */
  serializedPayload?: string;
  /** One or more signatures over `serialized_payload`. Verifier implementations should consider this attestation message verified if at least one `signature` verifies `serialized_payload`. See `Signature` in common.proto for more details on signature structure and verification. */
  signatures?: Array<Signature>;
  /** One or more JWTs encoding a self-contained attestation. Each JWT encodes the payload that it verifies within the JWT itself. Verifier implementation SHOULD ignore the `serialized_payload` field when verifying these JWTs. If only JWTs are present on this AttestationOccurrence, then the `serialized_payload` SHOULD be left empty. Each JWT SHOULD encode a claim specific to the `resource_uri` of this Occurrence, but this is not validated by Grafeas metadata API implementations. The JWT itself is opaque to Grafeas. */
  jwts?: Array<Jwt>;
}

export const AttestationOccurrence: Schema.Schema<AttestationOccurrence> = Schema.suspend(() => Schema.Struct({
  serializedPayload: Schema.optional(Schema.String),
  signatures: Schema.optional(Schema.Array(Signature)),
  jwts: Schema.optional(Schema.Array(Jwt)),
})).annotate({ identifier: "AttestationOccurrence" }) as any as Schema.Schema<AttestationOccurrence>;

export interface ImageOccurrence {
  /** This contains layer-specific metadata, if populated it has length "distance" and is ordered with [distance] being the layer immediately following the base image and [1] being the final layer. */
  layerInfo?: Array<Layer>;
  /** Output only. The number of layers by which this image differs from the associated image basis. */
  distance?: number;
  /** Output only. This contains the base image URL for the derived image occurrence. */
  baseResourceUrl?: string;
  /** Required. The fingerprint of the derived image. */
  fingerprint?: Fingerprint;
}

export const ImageOccurrence: Schema.Schema<ImageOccurrence> = Schema.suspend(() => Schema.Struct({
  layerInfo: Schema.optional(Schema.Array(Layer)),
  distance: Schema.optional(Schema.Number),
  baseResourceUrl: Schema.optional(Schema.String),
  fingerprint: Schema.optional(Fingerprint),
})).annotate({ identifier: "ImageOccurrence" }) as any as Schema.Schema<ImageOccurrence>;

export interface BuildOccurrence {
  /** In-Toto Slsa Provenance V1 represents a slsa provenance meeting the slsa spec, wrapped in an in-toto statement. This allows for direct jsonification of a to-spec in-toto slsa statement with a to-spec slsa provenance. */
  inTotoSlsaProvenanceV1?: InTotoSlsaProvenanceV1;
  /** Serialized JSON representation of the provenance, used in generating the build signature in the corresponding build note. After verifying the signature, `provenance_bytes` can be unmarshalled and compared to the provenance to confirm that it is unchanged. A base64-encoded string representation of the provenance bytes is used for the signature in order to interoperate with openssl which expects this format for signature verification. The serialized form is captured both to avoid ambiguity in how the provenance is marshalled to json as well to prevent incompatibilities with future changes. */
  provenanceBytes?: string;
  /** The actual provenance for the build. */
  provenance?: BuildProvenance;
  /** In-toto Statement representation as defined in spec. The intoto_statement can contain any type of provenance. The serialized payload of the statement can be stored and signed in the Occurrence's envelope. */
  intotoStatement?: InTotoStatement;
  /** Deprecated. See InTotoStatement for the replacement. In-toto Provenance representation as defined in spec. */
  intotoProvenance?: InTotoProvenance;
}

export const BuildOccurrence: Schema.Schema<BuildOccurrence> = Schema.suspend(() => Schema.Struct({
  inTotoSlsaProvenanceV1: Schema.optional(InTotoSlsaProvenanceV1),
  provenanceBytes: Schema.optional(Schema.String),
  provenance: Schema.optional(BuildProvenance),
  intotoStatement: Schema.optional(InTotoStatement),
  intotoProvenance: Schema.optional(InTotoProvenance),
})).annotate({ identifier: "BuildOccurrence" }) as any as Schema.Schema<BuildOccurrence>;

export interface UpgradeOccurrence {
  /** Required for non-Windows OS. The version of the package in a machine + human readable form. */
  parsedVersion?: Version;
  /** Required for non-Windows OS. The package this Upgrade is for. */
  package?: string;
  /** Required for Windows OS. Represents the metadata about the Windows update. */
  windowsUpdate?: WindowsUpdate;
  /** Metadata about the upgrade for available for the specific operating system for the resource_url. This allows efficient filtering, as well as making it easier to use the occurrence. */
  distribution?: UpgradeDistribution;
}

export const UpgradeOccurrence: Schema.Schema<UpgradeOccurrence> = Schema.suspend(() => Schema.Struct({
  parsedVersion: Schema.optional(Version),
  package: Schema.optional(Schema.String),
  windowsUpdate: Schema.optional(WindowsUpdate),
  distribution: Schema.optional(UpgradeDistribution),
})).annotate({ identifier: "UpgradeOccurrence" }) as any as Schema.Schema<UpgradeOccurrence>;

export interface PackageIssue {
  /** Required. The [CPE URI](https://cpe.mitre.org/specification/) this vulnerability was found in. */
  affectedCpeUri?: string;
  /** The package this vulnerability was fixed in. It is possible for this to be different from the affected_package. */
  fixedPackage?: string;
  /** Required. The package this vulnerability was found in. */
  affectedPackage?: string;
  /** Required. The version of the package that is installed on the resource affected by this vulnerability. */
  affectedVersion?: Version;
  /** Output only. Whether a fix is available for this package. */
  fixAvailable?: boolean;
  /** Required. The version of the package this vulnerability was fixed in. Setting this to VersionKind.MAXIMUM means no fix is yet available. */
  fixedVersion?: Version;
  /** The [CPE URI](https://cpe.mitre.org/specification/) this vulnerability was fixed in. It is possible for this to be different from the affected_cpe_uri. */
  fixedCpeUri?: string;
  /** Output only. The distro or language system assigned severity for this vulnerability when that is available and note provider assigned severity when it is not available. */
  effectiveSeverity?: "SEVERITY_UNSPECIFIED" | "MINIMAL" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | (string & {});
  /** The type of package (e.g. OS, MAVEN, GO). */
  packageType?: string;
  /** The location at which this package was found. */
  fileLocation?: Array<GrafeasV1FileLocation>;
}

export const PackageIssue: Schema.Schema<PackageIssue> = Schema.suspend(() => Schema.Struct({
  affectedCpeUri: Schema.optional(Schema.String),
  fixedPackage: Schema.optional(Schema.String),
  affectedPackage: Schema.optional(Schema.String),
  affectedVersion: Schema.optional(Version),
  fixAvailable: Schema.optional(Schema.Boolean),
  fixedVersion: Schema.optional(Version),
  fixedCpeUri: Schema.optional(Schema.String),
  effectiveSeverity: Schema.optional(Schema.String),
  packageType: Schema.optional(Schema.String),
  fileLocation: Schema.optional(Schema.Array(GrafeasV1FileLocation)),
})).annotate({ identifier: "PackageIssue" }) as any as Schema.Schema<PackageIssue>;

export interface VulnerabilityOccurrence {
  /** The cvss v3 score for the vulnerability. */
  cvssv3?: CVSS;
  /** Risk information about the vulnerability, such as CISA, EPSS, etc. */
  risk?: Risk;
  /** The distro assigned severity for this vulnerability when it is available, otherwise this is the note provider assigned severity. When there are multiple PackageIssues for this vulnerability, they can have different effective severities because some might be provided by the distro while others are provided by the language ecosystem for a language pack. For this reason, it is advised to use the effective severity on the PackageIssue level. In the case where multiple PackageIssues have differing effective severities, this field should be the highest severity for any of the PackageIssues. */
  effectiveSeverity?: "SEVERITY_UNSPECIFIED" | "MINIMAL" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | (string & {});
  /** Output only. URLs related to this vulnerability. */
  relatedUrls?: Array<RelatedUrl>;
  /** Output only. Whether at least one of the affected packages has a fix available. */
  fixAvailable?: boolean;
  /** The type of package; whether native or non native (e.g., ruby gems, node.js packages, etc.). */
  type?: string;
  /** Occurrence-specific extra details about the vulnerability. */
  extraDetails?: string;
  /** Output only. The CVSS score of this vulnerability. CVSS score is on a scale of 0 - 10 where 0 indicates low severity and 10 indicates high severity. */
  cvssScore?: number;
  vexAssessment?: VexAssessment;
  /** Output only. The note provider assigned severity of this vulnerability. */
  severity?: "SEVERITY_UNSPECIFIED" | "MINIMAL" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | (string & {});
  /** Output only. A detailed description of this vulnerability. */
  longDescription?: string;
  /** The cvss v2 score for the vulnerability. */
  cvssV2?: CVSS;
  /** Output only. A one sentence description of this vulnerability. */
  shortDescription?: string;
  /** Required. The set of affected locations and their fixes (if available) within the associated resource. */
  packageIssue?: Array<PackageIssue>;
  /** Output only. CVSS version used to populate cvss_score and severity. */
  cvssVersion?: "CVSS_VERSION_UNSPECIFIED" | "CVSS_VERSION_2" | "CVSS_VERSION_3" | (string & {});
}

export const VulnerabilityOccurrence: Schema.Schema<VulnerabilityOccurrence> = Schema.suspend(() => Schema.Struct({
  cvssv3: Schema.optional(CVSS),
  risk: Schema.optional(Risk),
  effectiveSeverity: Schema.optional(Schema.String),
  relatedUrls: Schema.optional(Schema.Array(RelatedUrl)),
  fixAvailable: Schema.optional(Schema.Boolean),
  type: Schema.optional(Schema.String),
  extraDetails: Schema.optional(Schema.String),
  cvssScore: Schema.optional(Schema.Number),
  vexAssessment: Schema.optional(VexAssessment),
  severity: Schema.optional(Schema.String),
  longDescription: Schema.optional(Schema.String),
  cvssV2: Schema.optional(CVSS),
  shortDescription: Schema.optional(Schema.String),
  packageIssue: Schema.optional(Schema.Array(PackageIssue)),
  cvssVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "VulnerabilityOccurrence" }) as any as Schema.Schema<VulnerabilityOccurrence>;

export interface Occurrence {
  /** Describes an attestation of an artifact using dsse. */
  dsseAttestation?: DSSEAttestationOccurrence;
  /** Required. Immutable. The analysis note associated with this occurrence, in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. This field can be used as a filter in list requests. */
  noteName?: string;
  /** Output only. This explicitly denotes which of the occurrence details are specified. This field can be used as a filter in list requests. */
  kind?: "NOTE_KIND_UNSPECIFIED" | "VULNERABILITY" | "BUILD" | "IMAGE" | "PACKAGE" | "DEPLOYMENT" | "DISCOVERY" | "ATTESTATION" | "UPGRADE" | "COMPLIANCE" | "DSSE_ATTESTATION" | "VULNERABILITY_ASSESSMENT" | "SBOM_REFERENCE" | "SECRET" | (string & {});
  /** Output only. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`. */
  name?: string;
  /** Describes a specific SBOM reference occurrences. */
  sbomReference?: SBOMReferenceOccurrence;
  /** Output only. The time this occurrence was last updated. */
  updateTime?: string;
  /** A description of actions that can be taken to remedy the note. */
  remediation?: string;
  /** Required. Immutable. A URI that represents the resource for which the occurrence applies. For example, `https://gcr.io/project/image@sha256:123abc` for a Docker image. */
  resourceUri?: string;
  /** Describes the deployment of an artifact on a runtime. */
  deployment?: DeploymentOccurrence;
  /** Describes a compliance violation on a linked resource. */
  compliance?: ComplianceOccurrence;
  /** Output only. The time this occurrence was created. */
  createTime?: string;
  /** Describes an attestation of an artifact. */
  attestation?: AttestationOccurrence;
  /** Describes when a resource was discovered. */
  discovery?: DiscoveryOccurrence;
  /** Describes how this resource derives from the basis in the associated note. */
  image?: ImageOccurrence;
  /** Describes a verifiable build. */
  build?: BuildOccurrence;
  /** Describes the installation of a package on the linked resource. */
  package?: PackageOccurrence;
  /** Describes an available package upgrade on the linked resource. */
  upgrade?: UpgradeOccurrence;
  /** https://github.com/secure-systems-lab/dsse */
  envelope?: Envelope;
  /** Describes a secret. */
  secret?: SecretOccurrence;
  /** Describes a security vulnerability. */
  vulnerability?: VulnerabilityOccurrence;
}

export const Occurrence: Schema.Schema<Occurrence> = Schema.suspend(() => Schema.Struct({
  dsseAttestation: Schema.optional(DSSEAttestationOccurrence),
  noteName: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  sbomReference: Schema.optional(SBOMReferenceOccurrence),
  updateTime: Schema.optional(Schema.String),
  remediation: Schema.optional(Schema.String),
  resourceUri: Schema.optional(Schema.String),
  deployment: Schema.optional(DeploymentOccurrence),
  compliance: Schema.optional(ComplianceOccurrence),
  createTime: Schema.optional(Schema.String),
  attestation: Schema.optional(AttestationOccurrence),
  discovery: Schema.optional(DiscoveryOccurrence),
  image: Schema.optional(ImageOccurrence),
  build: Schema.optional(BuildOccurrence),
  package: Schema.optional(PackageOccurrence),
  upgrade: Schema.optional(UpgradeOccurrence),
  envelope: Schema.optional(Envelope),
  secret: Schema.optional(SecretOccurrence),
  vulnerability: Schema.optional(VulnerabilityOccurrence),
})).annotate({ identifier: "Occurrence" }) as any as Schema.Schema<Occurrence>;

export interface ListNoteOccurrencesResponse {
  /** The occurrences attached to the specified note. */
  occurrences?: Array<Occurrence>;
  /** Token to provide to skip to a particular spot in the list. */
  nextPageToken?: string;
}

export const ListNoteOccurrencesResponse: Schema.Schema<ListNoteOccurrencesResponse> = Schema.suspend(() => Schema.Struct({
  occurrences: Schema.optional(Schema.Array(Occurrence)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListNoteOccurrencesResponse" }) as any as Schema.Schema<ListNoteOccurrencesResponse>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource {
  /** Required. Location of the Git repo to build. This will be used as a `git remote`, see https://git-scm.com/docs/git-remote. */
  url?: string;
  /** Optional. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref. Cloud Build uses `git fetch` to fetch the revision from the Git repository; therefore make sure that the string you provide for `revision` is parsable by the command. For information on string values accepted by `git fetch`, see https://git-scm.com/docs/gitrevisions#_specifying_revisions. For information on `git fetch`, see https://git-scm.com/docs/git-fetch. */
  revision?: string;
  /** Optional. Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution. */
  dir?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  revision: Schema.optional(Schema.String),
  dir: Schema.optional(Schema.String),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1DeveloperConnectConfig {
  /** Required. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref. */
  revision?: string;
  /** Required. The Developer Connect Git repository link, formatted as `projects/* /locations/* /connections/* /gitRepositoryLink/*`. */
  gitRepositoryLink?: string;
  /** Required. Directory, relative to the source root, in which to run the build. */
  dir?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1DeveloperConnectConfig: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1DeveloperConnectConfig> = Schema.suspend(() => Schema.Struct({
  revision: Schema.optional(Schema.String),
  gitRepositoryLink: Schema.optional(Schema.String),
  dir: Schema.optional(Schema.String),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1DeveloperConnectConfig" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1DeveloperConnectConfig>;

export interface BatchCreateOccurrencesRequest {
  /** Required. The occurrences to create. Max allowed length is 1000. */
  occurrences?: Array<Occurrence>;
}

export const BatchCreateOccurrencesRequest: Schema.Schema<BatchCreateOccurrencesRequest> = Schema.suspend(() => Schema.Struct({
  occurrences: Schema.optional(Schema.Array(Occurrence)),
})).annotate({ identifier: "BatchCreateOccurrencesRequest" }) as any as Schema.Schema<BatchCreateOccurrencesRequest>;

export interface GetPolicyOptions {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  requestedPolicyVersion?: number;
}

export const GetPolicyOptions: Schema.Schema<GetPolicyOptions> = Schema.suspend(() => Schema.Struct({
  requestedPolicyVersion: Schema.optional(Schema.Number),
})).annotate({ identifier: "GetPolicyOptions" }) as any as Schema.Schema<GetPolicyOptions>;

export interface GetIamPolicyRequest {
  /** OPTIONAL: A `GetPolicyOptions` object for specifying options to `GetIamPolicy`. */
  options?: GetPolicyOptions;
}

export const GetIamPolicyRequest: Schema.Schema<GetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  options: Schema.optional(GetPolicyOptions),
})).annotate({ identifier: "GetIamPolicyRequest" }) as any as Schema.Schema<GetIamPolicyRequest>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository {
  /** Required. Name of the Google Cloud Build repository, formatted as `projects/* /locations/* /connections/* /repositories/*`. */
  repository?: string;
  /** Optional. Directory, relative to the source root, in which to run the build. */
  dir?: string;
  /** Required. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref. */
  revision?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository> = Schema.suspend(() => Schema.Struct({
  repository: Schema.optional(Schema.String),
  dir: Schema.optional(Schema.String),
  revision: Schema.optional(Schema.String),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource {
  /** Required. Cloud Storage object containing the source. This object must be a zipped (`.zip`) or gzipped archive file (`.tar.gz`) containing source to build. */
  object?: string;
  /** Optional. Option to specify the tool to fetch the source file for the build. */
  sourceFetcher?: "SOURCE_FETCHER_UNSPECIFIED" | "GSUTIL" | "GCS_FETCHER" | (string & {});
  /** Optional. Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used. */
  generation?: string;
  /** Cloud Storage bucket containing the source (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)). */
  bucket?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource> = Schema.suspend(() => Schema.Struct({
  object: Schema.optional(Schema.String),
  sourceFetcher: Schema.optional(Schema.String),
  generation: Schema.optional(Schema.String),
  bucket: Schema.optional(Schema.String),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource {
  /** Regex matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax */
  tagName?: string;
  /** Optional. ID of the project that owns the Cloud Source Repository. If omitted, the project ID requesting the build is assumed. */
  projectId?: string;
  /** Optional. Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution. */
  dir?: string;
  /** Regex matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax */
  branchName?: string;
  /** Explicit commit SHA to build. */
  commitSha?: string;
  /** Optional. Only trigger a build if the revision regex does NOT match the revision regex. */
  invertRegex?: boolean;
  /** Optional. Substitutions to use in a triggered build. Should only be used with RunBuildTrigger */
  substitutions?: Record<string, string>;
  /** Required. Name of the Cloud Source Repository. */
  repoName?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource> = Schema.suspend(() => Schema.Struct({
  tagName: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  dir: Schema.optional(Schema.String),
  branchName: Schema.optional(Schema.String),
  commitSha: Schema.optional(Schema.String),
  invertRegex: Schema.optional(Schema.Boolean),
  substitutions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  repoName: Schema.optional(Schema.String),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Source {
  /** If provided, get the source from this Developer Connect config. */
  developerConnectConfig?: ContaineranalysisGoogleDevtoolsCloudbuildV1DeveloperConnectConfig;
  /** Optional. If provided, get the source from this 2nd-gen Google Cloud Build repository resource. */
  connectedRepository?: ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository;
  /** If provided, get the source from this location in Cloud Storage. */
  storageSource?: ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource;
  /** If provided, get the source from this location in a Cloud Source Repository. */
  repoSource?: ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource;
  /** If provided, get the source from this Git repository. */
  gitSource?: ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource;
  /** If provided, get the source from this manifest in Cloud Storage. This feature is in Preview; see description [here](https://github.com/GoogleCloudPlatform/cloud-builders/tree/master/gcs-fetcher). */
  storageSourceManifest?: ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1Source: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Source> = Schema.suspend(() => Schema.Struct({
  developerConnectConfig: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1DeveloperConnectConfig),
  connectedRepository: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository),
  storageSource: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource),
  repoSource: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource),
  gitSource: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource),
  storageSourceManifest: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1Source" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Source>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalResult {
  /** Optional. An optional URL tied to this manual approval result. This field is essentially the same as comment, except that it will be rendered by the UI differently. An example use case is a link to an external job that approved this Build. */
  url?: string;
  /** Output only. The time when the approval decision was made. */
  approvalTime?: string;
  /** Output only. Email of the user that called the ApproveBuild API to approve or reject a build at the time that the API was called. */
  approverAccount?: string;
  /** Required. The decision of this manual approval. */
  decision?: "DECISION_UNSPECIFIED" | "APPROVED" | "REJECTED" | (string & {});
  /** Optional. An optional comment for this manual approval result. */
  comment?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalResult: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalResult> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  approvalTime: Schema.optional(Schema.String),
  approverAccount: Schema.optional(Schema.String),
  decision: Schema.optional(Schema.String),
  comment: Schema.optional(Schema.String),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalResult" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalResult>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalConfig {
  /** Whether or not approval is needed. If this is set on a build, it will become pending when created, and will need to be explicitly approved to start. */
  approvalRequired?: boolean;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalConfig: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalConfig> = Schema.suspend(() => Schema.Struct({
  approvalRequired: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalConfig" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalConfig>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1BuildApproval {
  /** Output only. The state of this build's approval. */
  state?: "STATE_UNSPECIFIED" | "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED" | (string & {});
  /** Output only. Result of manual approval for this Build. */
  result?: ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalResult;
  /** Output only. Configuration for manual approval of this build. */
  config?: ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalConfig;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1BuildApproval: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildApproval> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  result: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalResult),
  config: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalConfig),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1BuildApproval" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildApproval>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfigHttpConfig {
  /** SecretVersion resource of the HTTP proxy URL. The Service Account used in the build (either the default Service Account or user-specified Service Account) should have `secretmanager.versions.access` permissions on this secret. The proxy URL should be in format `protocol://@]proxyhost[:port]`. */
  proxySecretVersionName?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfigHttpConfig: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfigHttpConfig> = Schema.suspend(() => Schema.Struct({
  proxySecretVersionName: Schema.optional(Schema.String),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfigHttpConfig" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfigHttpConfig>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfig {
  /** Configuration for HTTP related git operations. */
  http?: ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfigHttpConfig;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfig: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfig> = Schema.suspend(() => Schema.Struct({
  http: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfigHttpConfig),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfig" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfig>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance {
  /** Output only. A copy of the build's `source.git_source`, if exists, with any revisions resolved. */
  resolvedGitSource?: ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource;
  /** Output only. Hash(es) of the build source, which can be used to verify that the original source integrity was maintained in the build. Note that `FileHashes` will only be populated if `BuildOptions` has requested a `SourceProvenanceHash`. The keys to this map are file paths used as build source and the values contain the hash values for those files. If the build source came in a single package such as a gzipped tarfile (`.tar.gz`), the `FileHash` will be for the single path to that file. */
  fileHashes?: Record<string, ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes>;
  /** A copy of the build's `source.storage_source_manifest`, if exists, with any revisions resolved. This feature is in Preview. */
  resolvedStorageSourceManifest?: ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest;
  /** Output only. A copy of the build's `source.connected_repository`, if exists, with any revisions resolved. */
  resolvedConnectedRepository?: ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository;
  /** A copy of the build's `source.storage_source`, if exists, with any generations resolved. */
  resolvedStorageSource?: ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource;
  /** A copy of the build's `source.repo_source`, if exists, with any revisions resolved. */
  resolvedRepoSource?: ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance> = Schema.suspend(() => Schema.Struct({
  resolvedGitSource: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource),
  fileHashes: Schema.optional(Schema.Record(Schema.String, ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes)),
  resolvedStorageSourceManifest: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest),
  resolvedConnectedRepository: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository),
  resolvedStorageSource: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource),
  resolvedRepoSource: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsMavenArtifact {
  /** Optional. Path to an artifact in the build's workspace to be uploaded to Artifact Registry. This can be either an absolute path, e.g. /workspace/my-app/target/my-app-1.0.SNAPSHOT.jar or a relative path from /workspace, e.g. my-app/target/my-app-1.0.SNAPSHOT.jar. */
  path?: string;
  /** Maven `artifactId` value used when uploading the artifact to Artifact Registry. */
  artifactId?: string;
  /** Optional. Path to a folder containing the files to upload to Artifact Registry. This can be either an absolute path, e.g. `/workspace/my-app/target/`, or a relative path from /workspace, e.g. `my-app/target/`. This field is mutually exclusive with the `path` field. */
  deployFolder?: string;
  /** Artifact Registry repository, in the form "https://$REGION-maven.pkg.dev/$PROJECT/$REPOSITORY" Artifact in the workspace specified by path will be uploaded to Artifact Registry with this location as a prefix. */
  repository?: string;
  /** Maven `groupId` value used when uploading the artifact to Artifact Registry. */
  groupId?: string;
  /** Maven `version` value used when uploading the artifact to Artifact Registry. */
  version?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsMavenArtifact: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsMavenArtifact> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  artifactId: Schema.optional(Schema.String),
  deployFolder: Schema.optional(Schema.String),
  repository: Schema.optional(Schema.String),
  groupId: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsMavenArtifact" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsMavenArtifact>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsNpmPackage {
  /** Artifact Registry repository, in the form "https://$REGION-npm.pkg.dev/$PROJECT/$REPOSITORY" Npm package in the workspace specified by path will be zipped and uploaded to Artifact Registry with this location as a prefix. */
  repository?: string;
  /** Optional. Path to the package.json. e.g. workspace/path/to/package Only one of `archive` or `package_path` can be specified. */
  packagePath?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsNpmPackage: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsNpmPackage> = Schema.suspend(() => Schema.Struct({
  repository: Schema.optional(Schema.String),
  packagePath: Schema.optional(Schema.String),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsNpmPackage" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsNpmPackage>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsGoModule {
  /** Optional. Artifact Registry repository name. Specified Go modules will be zipped and uploaded to Artifact Registry with this location as a prefix. e.g. my-go-repo */
  repositoryName?: string;
  /** Optional. Project ID of the Artifact Registry repository. Defaults to the build project. */
  repositoryProjectId?: string;
  /** Optional. The Go module's "module path". e.g. example.com/foo/v2 */
  modulePath?: string;
  /** Optional. Location of the Artifact Registry repository. i.e. us-east1 Defaults to the build’s location. */
  repositoryLocation?: string;
  /** Optional. Source path of the go.mod file in the build's workspace. If not specified, this will default to the current directory. e.g. ~/code/go/mypackage */
  sourcePath?: string;
  /** Optional. The Go module's semantic version in the form vX.Y.Z. e.g. v0.1.1 Pre-release identifiers can also be added by appending a dash and dot separated ASCII alphanumeric characters and hyphens. e.g. v0.2.3-alpha.x.12m.5 */
  moduleVersion?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsGoModule: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsGoModule> = Schema.suspend(() => Schema.Struct({
  repositoryName: Schema.optional(Schema.String),
  repositoryProjectId: Schema.optional(Schema.String),
  modulePath: Schema.optional(Schema.String),
  repositoryLocation: Schema.optional(Schema.String),
  sourcePath: Schema.optional(Schema.String),
  moduleVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsGoModule" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsGoModule>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Artifacts {
  /** A list of Python packages to be uploaded to Artifact Registry upon successful completion of all build steps. The build service account credentials will be used to perform the upload. If any objects fail to be pushed, the build is marked FAILURE. */
  pythonPackages?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsPythonPackage>;
  /** A list of Maven artifacts to be uploaded to Artifact Registry upon successful completion of all build steps. Artifacts in the workspace matching specified paths globs will be uploaded to the specified Artifact Registry repository using the builder service account's credentials. If any artifacts fail to be pushed, the build is marked FAILURE. */
  mavenArtifacts?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsMavenArtifact>;
  /** A list of objects to be uploaded to Cloud Storage upon successful completion of all build steps. Files in the workspace matching specified paths globs will be uploaded to the specified Cloud Storage location using the builder service account's credentials. The location and generation of the uploaded objects will be stored in the Build resource's results field. If any objects fail to be pushed, the build is marked FAILURE. */
  objects?: ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsArtifactObjects;
  /** A list of images to be pushed upon the successful completion of all build steps. The images will be pushed using the builder service account's credentials. The digests of the pushed images will be stored in the Build resource's results field. If any of the images fail to be pushed, the build is marked FAILURE. */
  images?: Array<string>;
  /** A list of npm packages to be uploaded to Artifact Registry upon successful completion of all build steps. Npm packages in the specified paths will be uploaded to the specified Artifact Registry repository using the builder service account's credentials. If any packages fail to be pushed, the build is marked FAILURE. */
  npmPackages?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsNpmPackage>;
  /** Optional. A list of Go modules to be uploaded to Artifact Registry upon successful completion of all build steps. If any objects fail to be pushed, the build is marked FAILURE. */
  goModules?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsGoModule>;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1Artifacts: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Artifacts> = Schema.suspend(() => Schema.Struct({
  pythonPackages: Schema.optional(Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsPythonPackage)),
  mavenArtifacts: Schema.optional(Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsMavenArtifact)),
  objects: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsArtifactObjects),
  images: Schema.optional(Schema.Array(Schema.String)),
  npmPackages: Schema.optional(Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsNpmPackage)),
  goModules: Schema.optional(Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsGoModule)),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1Artifacts" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Artifacts>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Volume {
  /** Name of the volume to mount. Volume names must be unique per build step and must be valid names for Docker volumes. Each named volume must be used by at least two build steps. */
  name?: string;
  /** Path at which to mount the volume. Paths must be absolute and cannot conflict with other volume paths on the same build step or with certain reserved volume paths. */
  path?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1Volume: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Volume> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1Volume" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Volume>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptionsPoolOption {
  /** The `WorkerPool` resource to execute the build on. You must have `cloudbuild.workerpools.use` on the project hosting the WorkerPool. Format projects/{project}/locations/{location}/workerPools/{workerPoolId} */
  name?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptionsPoolOption: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptionsPoolOption> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptionsPoolOption" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptionsPoolOption>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions {
  /** Option to specify whether or not to apply bash style string operations to the substitutions. NOTE: this is always enabled for triggered builds and cannot be overridden in the build configuration file. */
  dynamicSubstitutions?: boolean;
  /** Option to include built-in and custom substitutions as env variables for all build steps. */
  automapSubstitutions?: boolean;
  /** Requested disk size for the VM that runs the build. Note that this is *NOT* "disk free"; some of the space will be used by the operating system and build utilities. Also note that this is the minimum disk size that will be allocated for the build -- the build may run with a larger disk than requested. At present, the maximum disk size is 4000GB; builds that request more than the maximum are rejected with an error. */
  diskSizeGb?: string;
  /** Optional. Option to specify whether structured logging is enabled. If true, JSON-formatted logs are parsed as structured logs. */
  enableStructuredLogging?: boolean;
  /** Compute Engine machine type on which to run the build. */
  machineType?: "UNSPECIFIED" | "N1_HIGHCPU_8" | "N1_HIGHCPU_32" | "E2_HIGHCPU_8" | "E2_HIGHCPU_32" | "E2_MEDIUM" | (string & {});
  /** Option to specify behavior when there is an error in the substitution checks. NOTE: this is always set to ALLOW_LOOSE for triggered builds and cannot be overridden in the build configuration file. */
  substitutionOption?: "MUST_MATCH" | "ALLOW_LOOSE" | (string & {});
  /** Optional. Option to specify how default logs buckets are setup. */
  defaultLogsBucketBehavior?: "DEFAULT_LOGS_BUCKET_BEHAVIOR_UNSPECIFIED" | "REGIONAL_USER_OWNED_BUCKET" | "LEGACY_BUCKET" | (string & {});
  /** A list of global environment variables, which are encrypted using a Cloud Key Management Service crypto key. These values must be specified in the build's `Secret`. These variables will be available to all build steps in this build. */
  secretEnv?: Array<string>;
  /** Option to define build log streaming behavior to Cloud Storage. */
  logStreamingOption?: "STREAM_DEFAULT" | "STREAM_ON" | "STREAM_OFF" | (string & {});
  /** Requested hash for SourceProvenance. */
  sourceProvenanceHash?: Array<"NONE" | "SHA256" | "MD5" | "GO_MODULE_H1" | "SHA512" | (string & {})>;
  /** Requested verifiability options. */
  requestedVerifyOption?: "NOT_VERIFIED" | "VERIFIED" | (string & {});
  /** Option to specify the logging mode, which determines if and where build logs are stored. */
  logging?: "LOGGING_UNSPECIFIED" | "LEGACY" | "GCS_ONLY" | "STACKDRIVER_ONLY" | "CLOUD_LOGGING_ONLY" | "NONE" | (string & {});
  /** Global list of volumes to mount for ALL build steps Each volume is created as an empty volume prior to starting the build process. Upon completion of the build, volumes and their contents are discarded. Global volume names and paths cannot conflict with the volumes defined a build step. Using a global volume in a build with only one step is not valid as it is indicative of a build request with an incorrect configuration. */
  volumes?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1Volume>;
  /** This field deprecated; please use `pool.name` instead. */
  workerPool?: string;
  /** Optional. Option to specify the Pub/Sub topic to receive build status updates. */
  pubsubTopic?: string;
  /** A list of global environment variable definitions that will exist for all build steps in this build. If a variable is defined in both globally and in a build step, the variable will use the build step value. The elements are of the form "KEY=VALUE" for the environment variable "KEY" being given the value "VALUE". */
  env?: Array<string>;
  /** Optional. Specification for execution on a `WorkerPool`. See [running builds in a private pool](https://cloud.google.com/build/docs/private-pools/run-builds-in-private-pool) for more information. */
  pool?: ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptionsPoolOption;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions> = Schema.suspend(() => Schema.Struct({
  dynamicSubstitutions: Schema.optional(Schema.Boolean),
  automapSubstitutions: Schema.optional(Schema.Boolean),
  diskSizeGb: Schema.optional(Schema.String),
  enableStructuredLogging: Schema.optional(Schema.Boolean),
  machineType: Schema.optional(Schema.String),
  substitutionOption: Schema.optional(Schema.String),
  defaultLogsBucketBehavior: Schema.optional(Schema.String),
  secretEnv: Schema.optional(Schema.Array(Schema.String)),
  logStreamingOption: Schema.optional(Schema.String),
  sourceProvenanceHash: Schema.optional(Schema.Array(Schema.String)),
  requestedVerifyOption: Schema.optional(Schema.String),
  logging: Schema.optional(Schema.String),
  volumes: Schema.optional(Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1Volume)),
  workerPool: Schema.optional(Schema.String),
  pubsubTopic: Schema.optional(Schema.String),
  env: Schema.optional(Schema.Array(Schema.String)),
  pool: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptionsPoolOption),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep {
  /** Unique identifier for this build step, used in `wait_for` to reference this build step as a dependency. */
  id?: string;
  /** A list of environment variable definitions to be used when running a step. The elements are of the form "KEY=VALUE" for the environment variable "KEY" being given the value "VALUE". */
  env?: Array<string>;
  /** Allow this build step to fail without failing the entire build if and only if the exit code is one of the specified codes. If allow_failure is also specified, this field will take precedence. */
  allowExitCodes?: Array<number>;
  /** Time limit for executing this build step. If not defined, the step has no time limit and will be allowed to continue to run until either it completes or the build itself times out. */
  timeout?: string;
  /** Entrypoint to be used instead of the build step image's default entrypoint. If unset, the image's default entrypoint is used. */
  entrypoint?: string;
  /** Working directory to use when running this step's container. If this value is a relative path, it is relative to the build's working directory. If this value is absolute, it may be outside the build's working directory, in which case the contents of the path may not be persisted across build step executions, unless a `volume` for that path is specified. If the build specifies a `RepoSource` with `dir` and a step with a `dir`, which specifies an absolute path, the `RepoSource` `dir` is ignored for the step's execution. */
  dir?: string;
  /** Allow this build step to fail without failing the entire build. If false, the entire build will fail if this step fails. Otherwise, the build will succeed, but this step will still have a failure status. Error information will be reported in the failure_detail field. */
  allowFailure?: boolean;
  /** Option to include built-in and custom substitutions as env variables for this build step. This option will override the global option in BuildOption. */
  automapSubstitutions?: boolean;
  /** Output only. Stores timing information for executing this build step. */
  timing?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
  /** A shell script to be executed in the step. When script is provided, the user cannot specify the entrypoint or args. */
  script?: string;
  /** A list of environment variables which are encrypted using a Cloud Key Management Service crypto key. These values must be specified in the build's `Secret`. */
  secretEnv?: Array<string>;
  /** Output only. Stores timing information for pulling this build step's builder image only. */
  pullTiming?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
  /** A list of arguments that will be presented to the step when it is started. If the image used to run the step's container has an entrypoint, the `args` are used as arguments to that entrypoint. If the image does not define an entrypoint, the first element in args is used as the entrypoint, and the remainder will be used as arguments. */
  args?: Array<string>;
  /** Output only. Status of the build step. At this time, build step status is only updated on build completion; step status is not updated in real-time as the build progresses. */
  status?: "STATUS_UNKNOWN" | "PENDING" | "QUEUED" | "WORKING" | "SUCCESS" | "FAILURE" | "INTERNAL_ERROR" | "TIMEOUT" | "CANCELLED" | "EXPIRED" | (string & {});
  /** List of volumes to mount into the build step. Each volume is created as an empty volume prior to execution of the build step. Upon completion of the build, volumes and their contents are discarded. Using a named volume in only one step is not valid as it is indicative of a build request with an incorrect configuration. */
  volumes?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1Volume>;
  /** The ID(s) of the step(s) that this build step depends on. This build step will not start until all the build steps in `wait_for` have completed successfully. If `wait_for` is empty, this build step will start when all previous build steps in the `Build.Steps` list have completed successfully. */
  waitFor?: Array<string>;
  /** Output only. Return code from running the step. */
  exitCode?: number;
  /** Required. The name of the container image that will run this particular build step. If the image is available in the host's Docker daemon's cache, it will be run directly. If not, the host will attempt to pull the image first, using the builder service account's credentials if necessary. The Docker daemon's cache will already have the latest versions of all of the officially supported build steps ([https://github.com/GoogleCloudPlatform/cloud-builders](https://github.com/GoogleCloudPlatform/cloud-builders)). The Docker daemon will also have cached many of the layers for some popular images, like "ubuntu", "debian", but they will be refreshed at the time you attempt to use them. If you built an image in a previous build step, it will be stored in the host's Docker daemon's cache and is available to use as the name for a later build step. */
  name?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  env: Schema.optional(Schema.Array(Schema.String)),
  allowExitCodes: Schema.optional(Schema.Array(Schema.Number)),
  timeout: Schema.optional(Schema.String),
  entrypoint: Schema.optional(Schema.String),
  dir: Schema.optional(Schema.String),
  allowFailure: Schema.optional(Schema.Boolean),
  automapSubstitutions: Schema.optional(Schema.Boolean),
  timing: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan),
  script: Schema.optional(Schema.String),
  secretEnv: Schema.optional(Schema.Array(Schema.String)),
  pullTiming: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan),
  args: Schema.optional(Schema.Array(Schema.String)),
  status: Schema.optional(Schema.String),
  volumes: Schema.optional(Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1Volume)),
  waitFor: Schema.optional(Schema.Array(Schema.String)),
  exitCode: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Build {
  /** Output only. Customer-readable message about the current status. */
  statusDetail?: string;
  /** Output only. Describes this build's approval configuration, status, and result. */
  approval?: ContaineranalysisGoogleDevtoolsCloudbuildV1BuildApproval;
  /** Output only. ID of the project. */
  projectId?: string;
  /** Output only. Results of the build. */
  results?: ContaineranalysisGoogleDevtoolsCloudbuildV1Results;
  /** Optional. The location of the source files to build. */
  source?: ContaineranalysisGoogleDevtoolsCloudbuildV1Source;
  /** A list of images to be pushed upon the successful completion of all build steps. The images are pushed using the builder service account's credentials. The digests of the pushed images will be stored in the `Build` resource's results field. If any of the images fail to be pushed, the build status is marked `FAILURE`. */
  images?: Array<string>;
  /** IAM service account whose credentials will be used at build runtime. Must be of the format `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`. ACCOUNT can be email address or uniqueId of the service account. */
  serviceAccount?: string;
  /** Optional. Dependencies that the Cloud Build worker will fetch before executing user steps. */
  dependencies?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1Dependency>;
  /** TTL in queue for this build. If provided and the build is enqueued longer than this value, the build will expire and the build status will be `EXPIRED`. The TTL starts ticking from create_time. */
  queueTtl?: string;
  /** Output only. A permanent fixed identifier for source. */
  sourceProvenance?: ContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance;
  /** Output only. The ID of the `BuildTrigger` that triggered this build, if it was triggered automatically. */
  buildTriggerId?: string;
  /** Output only. Status of the build. */
  status?: "STATUS_UNKNOWN" | "PENDING" | "QUEUED" | "WORKING" | "SUCCESS" | "FAILURE" | "INTERNAL_ERROR" | "TIMEOUT" | "CANCELLED" | "EXPIRED" | (string & {});
  /** Cloud Storage bucket where logs should be written (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)). Logs file names will be of the format `${logs_bucket}/log-${build_id}.txt`. */
  logsBucket?: string;
  /** Output only. Time at which execution of the build was started. */
  startTime?: string;
  /** Secrets and secret environment variables. */
  availableSecrets?: ContaineranalysisGoogleDevtoolsCloudbuildV1Secrets;
  /** Artifacts produced by the build that should be uploaded upon successful completion of all build steps. */
  artifacts?: ContaineranalysisGoogleDevtoolsCloudbuildV1Artifacts;
  /** Output only. Non-fatal problems encountered during the execution of the build. */
  warnings?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildWarning>;
  /** Tags for annotation of a `Build`. These are not docker tags. */
  tags?: Array<string>;
  /** Output only. Time at which the request to create the build was received. */
  createTime?: string;
  /** Output only. The 'Build' name with format: `projects/{project}/locations/{location}/builds/{build}`, where {build} is a unique identifier generated by the service. */
  name?: string;
  /** Output only. Stores timing information for phases of the build. Valid keys are: * BUILD: time to execute all build steps. * PUSH: time to push all artifacts including docker images and non docker artifacts. * FETCHSOURCE: time to fetch source. * SETUPBUILD: time to set up build. If the build does not specify source or images, these keys will not be included. */
  timing?: Record<string, ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan>;
  /** Secrets to decrypt using Cloud Key Management Service. Note: Secret Manager is the recommended technique for managing sensitive data with Cloud Build. Use `available_secrets` to configure builds to access secrets from Secret Manager. For instructions, see: https://cloud.google.com/cloud-build/docs/securing-builds/use-secrets */
  secrets?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1Secret>;
  /** Output only. Unique identifier of the build. */
  id?: string;
  /** Output only. Time at which execution of the build was finished. The difference between finish_time and start_time is the duration of the build's execution. */
  finishTime?: string;
  /** Optional. Configuration for git operations. */
  gitConfig?: ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfig;
  /** Output only. Contains information about the build when status=FAILURE. */
  failureInfo?: ContaineranalysisGoogleDevtoolsCloudbuildV1BuildFailureInfo;
  /** Substitutions data for `Build` resource. */
  substitutions?: Record<string, string>;
  /** Output only. URL to logs for this build in Google Cloud Console. */
  logUrl?: string;
  /** Amount of time that this build should be allowed to run, to second granularity. If this amount of time elapses, work on the build will cease and the build status will be `TIMEOUT`. `timeout` starts ticking from `startTime`. Default time is 60 minutes. */
  timeout?: string;
  /** Special options for this build. */
  options?: ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions;
  /** Required. The operations to be performed on the workspace. */
  steps?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep>;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1Build: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Build> = Schema.suspend(() => Schema.Struct({
  statusDetail: Schema.optional(Schema.String),
  approval: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1BuildApproval),
  projectId: Schema.optional(Schema.String),
  results: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1Results),
  source: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1Source),
  images: Schema.optional(Schema.Array(Schema.String)),
  serviceAccount: Schema.optional(Schema.String),
  dependencies: Schema.optional(Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1Dependency)),
  queueTtl: Schema.optional(Schema.String),
  sourceProvenance: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance),
  buildTriggerId: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  logsBucket: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  availableSecrets: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1Secrets),
  artifacts: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1Artifacts),
  warnings: Schema.optional(Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1BuildWarning)),
  tags: Schema.optional(Schema.Array(Schema.String)),
  createTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  timing: Schema.optional(Schema.Record(Schema.String, ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan)),
  secrets: Schema.optional(Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1Secret)),
  id: Schema.optional(Schema.String),
  finishTime: Schema.optional(Schema.String),
  gitConfig: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfig),
  failureInfo: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1BuildFailureInfo),
  substitutions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  logUrl: Schema.optional(Schema.String),
  timeout: Schema.optional(Schema.String),
  options: Schema.optional(ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions),
  steps: Schema.optional(Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep)),
})).annotate({ identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1Build" }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Build>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface BatchCreateNotesResponse {
  /** The notes that were created. */
  notes?: Array<Note>;
}

export const BatchCreateNotesResponse: Schema.Schema<BatchCreateNotesResponse> = Schema.suspend(() => Schema.Struct({
  notes: Schema.optional(Schema.Array(Note)),
})).annotate({ identifier: "BatchCreateNotesResponse" }) as any as Schema.Schema<BatchCreateNotesResponse>;

export interface ListOccurrencesResponse {
  /** The occurrences requested. */
  occurrences?: Array<Occurrence>;
  /** Unordered list. Unreachable regions. Populated for requests from the global region when `return_partial_success` is set. Format: `projects/[PROJECT_ID]/locations/[LOCATION]` */
  unreachable?: Array<string>;
  /** The next pagination token in the list response. It should be used as `page_token` for the following request. An empty value means no more results. */
  nextPageToken?: string;
}

export const ListOccurrencesResponse: Schema.Schema<ListOccurrencesResponse> = Schema.suspend(() => Schema.Struct({
  occurrences: Schema.optional(Schema.Array(Occurrence)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListOccurrencesResponse" }) as any as Schema.Schema<ListOccurrencesResponse>;

export interface ListNotesResponse {
  /** The next pagination token in the list response. It should be used as `page_token` for the following request. An empty value means no more results. */
  nextPageToken?: string;
  /** The notes requested. */
  notes?: Array<Note>;
  /** Unordered list. Unreachable regions. Populated for requests from the global region when `return_partial_success` is set. Format: `projects/[PROJECT_ID]/locations/[LOCATION]` */
  unreachable?: Array<string>;
}

export const ListNotesResponse: Schema.Schema<ListNotesResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  notes: Schema.optional(Schema.Array(Note)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListNotesResponse" }) as any as Schema.Schema<ListNotesResponse>;

export interface ExportSBOMResponse {
  /** The name of the discovery occurrence in the form "projects/{project_id}/occurrences/{OCCURRENCE_ID} It can be used to track the progress of the SBOM export. */
  discoveryOccurrence?: string;
}

export const ExportSBOMResponse: Schema.Schema<ExportSBOMResponse> = Schema.suspend(() => Schema.Struct({
  discoveryOccurrence: Schema.optional(Schema.String),
})).annotate({ identifier: "ExportSBOMResponse" }) as any as Schema.Schema<ExportSBOMResponse>;

export interface BatchCreateOccurrencesResponse {
  /** The occurrences that were created. */
  occurrences?: Array<Occurrence>;
}

export const BatchCreateOccurrencesResponse: Schema.Schema<BatchCreateOccurrencesResponse> = Schema.suspend(() => Schema.Struct({
  occurrences: Schema.optional(Schema.Array(Occurrence)),
})).annotate({ identifier: "BatchCreateOccurrencesResponse" }) as any as Schema.Schema<BatchCreateOccurrencesResponse>;

export interface ExportSBOMRequest {
  /** Optional. Empty placeholder to denote that this is a Google Cloud Storage export request. */
  cloudStorageLocation?: CloudStorageLocation;
}

export const ExportSBOMRequest: Schema.Schema<ExportSBOMRequest> = Schema.suspend(() => Schema.Struct({
  cloudStorageLocation: Schema.optional(CloudStorageLocation),
})).annotate({ identifier: "ExportSBOMRequest" }) as any as Schema.Schema<ExportSBOMRequest>;

export interface StepResult {
  name?: string;
  attestationType?: string;
  attestationContentName?: string;
}

export const StepResult: Schema.Schema<StepResult> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  attestationType: Schema.optional(Schema.String),
  attestationContentName: Schema.optional(Schema.String),
})).annotate({ identifier: "StepResult" }) as any as Schema.Schema<StepResult>;

export interface BuildStep {
  /** Required. The name of the container image that will run this particular build step. If the image is available in the host's Docker daemon's cache, it will be run directly. If not, the host will attempt to pull the image first, using the builder service account's credentials if necessary. The Docker daemon's cache will already have the latest versions of all of the officially supported build steps ([https://github.com/GoogleCloudPlatform/cloud-builders](https://github.com/GoogleCloudPlatform/cloud-builders)). The Docker daemon will also have cached many of the layers for some popular images, like "ubuntu", "debian", but they will be refreshed at the time you attempt to use them. If you built an image in a previous build step, it will be stored in the host's Docker daemon's cache and is available to use as the name for a later build step. */
  name?: string;
  /** Unique identifier for this build step, used in `wait_for` to reference this build step as a dependency. */
  id?: string;
  /** Working directory to use when running this step's container. If this value is a relative path, it is relative to the build's working directory. If this value is absolute, it may be outside the build's working directory, in which case the contents of the path may not be persisted across build step executions, unless a `volume` for that path is specified. If the build specifies a `RepoSource` with `dir` and a step with a `dir`, which specifies an absolute path, the `RepoSource` `dir` is ignored for the step's execution. */
  dir?: string;
  /** Output only. Status of the build step. At this time, build step status is only updated on build completion; step status is not updated in real-time as the build progresses. */
  status?: "STATUS_UNKNOWN" | "PENDING" | "QUEUING" | "QUEUED" | "WORKING" | "SUCCESS" | "FAILURE" | "INTERNAL_ERROR" | "TIMEOUT" | "CANCELLED" | "EXPIRED" | (string & {});
  /** Output only. Stores timing information for pulling this build step's builder image only. */
  pullTiming?: TimeSpan;
  /** Output only. Stores timing information for executing this build step. */
  timing?: TimeSpan;
  /** A list of environment variables which are encrypted using a Cloud Key Management Service crypto key. These values must be specified in the build's `Secret`. */
  secretEnv?: Array<string>;
  /** A list of arguments that will be presented to the step when it is started. If the image used to run the step's container has an entrypoint, the `args` are used as arguments to that entrypoint. If the image does not define an entrypoint, the first element in args is used as the entrypoint, and the remainder will be used as arguments. */
  args?: Array<string>;
  /** Output only. Return code from running the step. */
  exitCode?: number;
  results?: Array<StepResult>;
  /** Allow this build step to fail without failing the entire build. If false, the entire build will fail if this step fails. Otherwise, the build will succeed, but this step will still have a failure status. Error information will be reported in the failure_detail field. */
  allowFailure?: boolean;
  /** Allow this build step to fail without failing the entire build if and only if the exit code is one of the specified codes. If allow_failure is also specified, this field will take precedence. */
  allowExitCodes?: Array<number>;
  /** A list of environment variable definitions to be used when running a step. The elements are of the form "KEY=VALUE" for the environment variable "KEY" being given the value "VALUE". */
  env?: Array<string>;
  /** Option to include built-in and custom substitutions as env variables for this build step. This option will override the global option in BuildOption. */
  automapSubstitutions?: boolean;
  /** Time limit for executing this build step. If not defined, the step has no time limit and will be allowed to continue to run until either it completes or the build itself times out. */
  timeout?: string;
  /** Remote configuration for the build step. */
  remoteConfig?: string;
  /** A shell script to be executed in the step. When script is provided, the user cannot specify the entrypoint or args. */
  script?: string;
  /** The ID(s) of the step(s) that this build step depends on. This build step will not start until all the build steps in `wait_for` have completed successfully. If `wait_for` is empty, this build step will start when all previous build steps in the `Build.Steps` list have completed successfully. */
  waitFor?: Array<string>;
  /** Entrypoint to be used instead of the build step image's default entrypoint. If unset, the image's default entrypoint is used. */
  entrypoint?: string;
  /** List of volumes to mount into the build step. Each volume is created as an empty volume prior to execution of the build step. Upon completion of the build, volumes and their contents are discarded. Using a named volume in only one step is not valid as it is indicative of a build request with an incorrect configuration. */
  volumes?: Array<Volume>;
}

export const BuildStep: Schema.Schema<BuildStep> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  dir: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  pullTiming: Schema.optional(TimeSpan),
  timing: Schema.optional(TimeSpan),
  secretEnv: Schema.optional(Schema.Array(Schema.String)),
  args: Schema.optional(Schema.Array(Schema.String)),
  exitCode: Schema.optional(Schema.Number),
  results: Schema.optional(Schema.Array(StepResult)),
  allowFailure: Schema.optional(Schema.Boolean),
  allowExitCodes: Schema.optional(Schema.Array(Schema.Number)),
  env: Schema.optional(Schema.Array(Schema.String)),
  automapSubstitutions: Schema.optional(Schema.Boolean),
  timeout: Schema.optional(Schema.String),
  remoteConfig: Schema.optional(Schema.String),
  script: Schema.optional(Schema.String),
  waitFor: Schema.optional(Schema.Array(Schema.String)),
  entrypoint: Schema.optional(Schema.String),
  volumes: Schema.optional(Schema.Array(Volume)),
})).annotate({ identifier: "BuildStep" }) as any as Schema.Schema<BuildStep>;

export interface GoogleDevtoolsContaineranalysisV1alpha1OperationMetadata {
  /** Output only. The time that this operation was marked completed or failed. */
  endTime?: string;
  /** Output only. The time this operation was created. */
  createTime?: string;
}

export const GoogleDevtoolsContaineranalysisV1alpha1OperationMetadata: Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1OperationMetadata> = Schema.suspend(() => Schema.Struct({
  endTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleDevtoolsContaineranalysisV1alpha1OperationMetadata" }) as any as Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1OperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

/** Creates new notes in batch. */
export interface BatchCreateProjectsNotesRequest {
  /** Required. The name of the project in the form of `projects/[PROJECT_ID]`, under which the notes are to be created. */
  parent: string;
  /** Request body */
  body?: BatchCreateNotesRequest;
}

export const BatchCreateProjectsNotesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchCreateNotesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/notes:batchCreate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchCreateProjectsNotesRequest>;

export type BatchCreateProjectsNotesResponse = BatchCreateNotesResponse;
export const BatchCreateProjectsNotesResponse = BatchCreateNotesResponse;

export type BatchCreateProjectsNotesError = CommonErrors;

export const batchCreateProjectsNotes: API.OperationMethod<BatchCreateProjectsNotesRequest, BatchCreateProjectsNotesResponse, BatchCreateProjectsNotesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchCreateProjectsNotesRequest,
  output: BatchCreateProjectsNotesResponse,
  errors: [],
}));

/** Deletes the specified note. */
export interface DeleteProjectsNotesRequest {
  /** Required. The name of the note in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. */
  name: string;
}

export const DeleteProjectsNotesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/notes/{notesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsNotesRequest>;

export type DeleteProjectsNotesResponse = Empty;
export const DeleteProjectsNotesResponse = Empty;

export type DeleteProjectsNotesError = CommonErrors;

export const deleteProjectsNotes: API.OperationMethod<DeleteProjectsNotesRequest, DeleteProjectsNotesResponse, DeleteProjectsNotesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsNotesRequest,
  output: DeleteProjectsNotesResponse,
  errors: [],
}));

/** Lists notes for the specified project. */
export interface ListProjectsNotesRequest {
  /** Required. The name of the project to list notes for in the form of `projects/[PROJECT_ID]`. */
  parent: string;
  /** Token to provide to skip to a particular spot in the list. */
  pageToken?: string;
  /** Number of notes to return in the list. Must be positive. Max allowed page size is 1000. If not specified, page size defaults to 20. */
  pageSize?: number;
  /** The filter expression. */
  filter?: string;
  /** If set, the request will return all reachable Notes and report all unreachable regions in the `unreachable` field in the response. Only applicable for requests in the global region. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsNotesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/notes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsNotesRequest>;

export type ListProjectsNotesResponse = ListNotesResponse;
export const ListProjectsNotesResponse = ListNotesResponse;

export type ListProjectsNotesError = CommonErrors;

export const listProjectsNotes = API.makePaginated(() => ({
  input: ListProjectsNotesRequest,
  output: ListProjectsNotesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Sets the access control policy on the specified note or occurrence. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a note or an occurrence, respectively. The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences. */
export interface SetIamPolicyProjectsNotesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsNotesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/notes/{notesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsNotesRequest>;

export type SetIamPolicyProjectsNotesResponse = Policy;
export const SetIamPolicyProjectsNotesResponse = Policy;

export type SetIamPolicyProjectsNotesError = CommonErrors;

export const setIamPolicyProjectsNotes: API.OperationMethod<SetIamPolicyProjectsNotesRequest, SetIamPolicyProjectsNotesResponse, SetIamPolicyProjectsNotesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsNotesRequest,
  output: SetIamPolicyProjectsNotesResponse,
  errors: [],
}));

/** Gets the access control policy for a note or an occurrence resource. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a note or occurrence, respectively. The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences. */
export interface GetIamPolicyProjectsNotesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsNotesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/notes/{notesId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsNotesRequest>;

export type GetIamPolicyProjectsNotesResponse = Policy;
export const GetIamPolicyProjectsNotesResponse = Policy;

export type GetIamPolicyProjectsNotesError = CommonErrors;

export const getIamPolicyProjectsNotes: API.OperationMethod<GetIamPolicyProjectsNotesRequest, GetIamPolicyProjectsNotesResponse, GetIamPolicyProjectsNotesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsNotesRequest,
  output: GetIamPolicyProjectsNotesResponse,
  errors: [],
}));

/** Creates a new note. */
export interface CreateProjectsNotesRequest {
  /** Required. The name of the project in the form of `projects/[PROJECT_ID]`, under which the note is to be created. */
  parent: string;
  /** Required. The ID to use for this note. */
  noteId?: string;
  /** Request body */
  body?: Note;
}

export const CreateProjectsNotesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  noteId: Schema.optional(Schema.String).pipe(T.HttpQuery("noteId")),
  body: Schema.optional(Note).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/notes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsNotesRequest>;

export type CreateProjectsNotesResponse = Note;
export const CreateProjectsNotesResponse = Note;

export type CreateProjectsNotesError = CommonErrors;

export const createProjectsNotes: API.OperationMethod<CreateProjectsNotesRequest, CreateProjectsNotesResponse, CreateProjectsNotesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsNotesRequest,
  output: CreateProjectsNotesResponse,
  errors: [],
}));

/** Updates the specified note. */
export interface PatchProjectsNotesRequest {
  /** Required. The name of the note in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. */
  name: string;
  /** The fields to update. */
  updateMask?: string;
  /** Request body */
  body?: Note;
}

export const PatchProjectsNotesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Note).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/notes/{notesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsNotesRequest>;

export type PatchProjectsNotesResponse = Note;
export const PatchProjectsNotesResponse = Note;

export type PatchProjectsNotesError = CommonErrors;

export const patchProjectsNotes: API.OperationMethod<PatchProjectsNotesRequest, PatchProjectsNotesResponse, PatchProjectsNotesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsNotesRequest,
  output: PatchProjectsNotesResponse,
  errors: [],
}));

/** Returns the permissions that a caller has on the specified note or occurrence. Requires list permission on the project (for example, `containeranalysis.notes.list`). The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences. */
export interface TestIamPermissionsProjectsNotesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsNotesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/notes/{notesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsNotesRequest>;

export type TestIamPermissionsProjectsNotesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsNotesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsNotesError = CommonErrors;

export const testIamPermissionsProjectsNotes: API.OperationMethod<TestIamPermissionsProjectsNotesRequest, TestIamPermissionsProjectsNotesResponse, TestIamPermissionsProjectsNotesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsNotesRequest,
  output: TestIamPermissionsProjectsNotesResponse,
  errors: [],
}));

/** Gets the specified note. */
export interface GetProjectsNotesRequest {
  /** Required. The name of the note in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. */
  name: string;
}

export const GetProjectsNotesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/notes/{notesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsNotesRequest>;

export type GetProjectsNotesResponse = Note;
export const GetProjectsNotesResponse = Note;

export type GetProjectsNotesError = CommonErrors;

export const getProjectsNotes: API.OperationMethod<GetProjectsNotesRequest, GetProjectsNotesResponse, GetProjectsNotesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsNotesRequest,
  output: GetProjectsNotesResponse,
  errors: [],
}));

/** Lists occurrences referencing the specified note. Provider projects can use this method to get all occurrences across consumer projects referencing the specified note. */
export interface ListProjectsNotesOccurrencesRequest {
  /** Token to provide to skip to a particular spot in the list. */
  pageToken?: string;
  /** Number of occurrences to return in the list. */
  pageSize?: number;
  /** The filter expression. */
  filter?: string;
  /** Required. The name of the note to list occurrences for in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. */
  name: string;
}

export const ListProjectsNotesOccurrencesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/notes/{notesId}/occurrences" }),
  svc,
) as unknown as Schema.Schema<ListProjectsNotesOccurrencesRequest>;

export type ListProjectsNotesOccurrencesResponse = ListNoteOccurrencesResponse;
export const ListProjectsNotesOccurrencesResponse = ListNoteOccurrencesResponse;

export type ListProjectsNotesOccurrencesError = CommonErrors;

export const listProjectsNotesOccurrences = API.makePaginated(() => ({
  input: ListProjectsNotesOccurrencesRequest,
  output: ListProjectsNotesOccurrencesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists notes for the specified project. */
export interface ListProjectsLocationsNotesRequest {
  /** Token to provide to skip to a particular spot in the list. */
  pageToken?: string;
  /** Required. The name of the project to list notes for in the form of `projects/[PROJECT_ID]`. */
  parent: string;
  /** Number of notes to return in the list. Must be positive. Max allowed page size is 1000. If not specified, page size defaults to 20. */
  pageSize?: number;
  /** The filter expression. */
  filter?: string;
  /** If set, the request will return all reachable Notes and report all unreachable regions in the `unreachable` field in the response. Only applicable for requests in the global region. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsNotesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/notes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsNotesRequest>;

export type ListProjectsLocationsNotesResponse = ListNotesResponse;
export const ListProjectsLocationsNotesResponse = ListNotesResponse;

export type ListProjectsLocationsNotesError = CommonErrors;

export const listProjectsLocationsNotes = API.makePaginated(() => ({
  input: ListProjectsLocationsNotesRequest,
  output: ListProjectsLocationsNotesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns the permissions that a caller has on the specified note or occurrence. Requires list permission on the project (for example, `containeranalysis.notes.list`). The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences. */
export interface TestIamPermissionsProjectsLocationsNotesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsNotesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/notes/{notesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsNotesRequest>;

export type TestIamPermissionsProjectsLocationsNotesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsNotesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsNotesError = CommonErrors;

export const testIamPermissionsProjectsLocationsNotes: API.OperationMethod<TestIamPermissionsProjectsLocationsNotesRequest, TestIamPermissionsProjectsLocationsNotesResponse, TestIamPermissionsProjectsLocationsNotesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsNotesRequest,
  output: TestIamPermissionsProjectsLocationsNotesResponse,
  errors: [],
}));

/** Creates a new note. */
export interface CreateProjectsLocationsNotesRequest {
  /** Required. The name of the project in the form of `projects/[PROJECT_ID]`, under which the note is to be created. */
  parent: string;
  /** Required. The ID to use for this note. */
  noteId?: string;
  /** Request body */
  body?: Note;
}

export const CreateProjectsLocationsNotesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  noteId: Schema.optional(Schema.String).pipe(T.HttpQuery("noteId")),
  body: Schema.optional(Note).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/notes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsNotesRequest>;

export type CreateProjectsLocationsNotesResponse = Note;
export const CreateProjectsLocationsNotesResponse = Note;

export type CreateProjectsLocationsNotesError = CommonErrors;

export const createProjectsLocationsNotes: API.OperationMethod<CreateProjectsLocationsNotesRequest, CreateProjectsLocationsNotesResponse, CreateProjectsLocationsNotesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsNotesRequest,
  output: CreateProjectsLocationsNotesResponse,
  errors: [],
}));

/** Gets the access control policy for a note or an occurrence resource. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a note or occurrence, respectively. The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences. */
export interface GetIamPolicyProjectsLocationsNotesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsLocationsNotesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/notes/{notesId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsNotesRequest>;

export type GetIamPolicyProjectsLocationsNotesResponse = Policy;
export const GetIamPolicyProjectsLocationsNotesResponse = Policy;

export type GetIamPolicyProjectsLocationsNotesError = CommonErrors;

export const getIamPolicyProjectsLocationsNotes: API.OperationMethod<GetIamPolicyProjectsLocationsNotesRequest, GetIamPolicyProjectsLocationsNotesResponse, GetIamPolicyProjectsLocationsNotesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsNotesRequest,
  output: GetIamPolicyProjectsLocationsNotesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified note or occurrence. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a note or an occurrence, respectively. The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences. */
export interface SetIamPolicyProjectsLocationsNotesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsNotesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/notes/{notesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsNotesRequest>;

export type SetIamPolicyProjectsLocationsNotesResponse = Policy;
export const SetIamPolicyProjectsLocationsNotesResponse = Policy;

export type SetIamPolicyProjectsLocationsNotesError = CommonErrors;

export const setIamPolicyProjectsLocationsNotes: API.OperationMethod<SetIamPolicyProjectsLocationsNotesRequest, SetIamPolicyProjectsLocationsNotesResponse, SetIamPolicyProjectsLocationsNotesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsNotesRequest,
  output: SetIamPolicyProjectsLocationsNotesResponse,
  errors: [],
}));

/** Updates the specified note. */
export interface PatchProjectsLocationsNotesRequest {
  /** Required. The name of the note in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. */
  name: string;
  /** The fields to update. */
  updateMask?: string;
  /** Request body */
  body?: Note;
}

export const PatchProjectsLocationsNotesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Note).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/notes/{notesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsNotesRequest>;

export type PatchProjectsLocationsNotesResponse = Note;
export const PatchProjectsLocationsNotesResponse = Note;

export type PatchProjectsLocationsNotesError = CommonErrors;

export const patchProjectsLocationsNotes: API.OperationMethod<PatchProjectsLocationsNotesRequest, PatchProjectsLocationsNotesResponse, PatchProjectsLocationsNotesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsNotesRequest,
  output: PatchProjectsLocationsNotesResponse,
  errors: [],
}));

/** Gets the specified note. */
export interface GetProjectsLocationsNotesRequest {
  /** Required. The name of the note in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. */
  name: string;
}

export const GetProjectsLocationsNotesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/notes/{notesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsNotesRequest>;

export type GetProjectsLocationsNotesResponse = Note;
export const GetProjectsLocationsNotesResponse = Note;

export type GetProjectsLocationsNotesError = CommonErrors;

export const getProjectsLocationsNotes: API.OperationMethod<GetProjectsLocationsNotesRequest, GetProjectsLocationsNotesResponse, GetProjectsLocationsNotesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsNotesRequest,
  output: GetProjectsLocationsNotesResponse,
  errors: [],
}));

/** Creates new notes in batch. */
export interface BatchCreateProjectsLocationsNotesRequest {
  /** Required. The name of the project in the form of `projects/[PROJECT_ID]`, under which the notes are to be created. */
  parent: string;
  /** Request body */
  body?: BatchCreateNotesRequest;
}

export const BatchCreateProjectsLocationsNotesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchCreateNotesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/notes:batchCreate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchCreateProjectsLocationsNotesRequest>;

export type BatchCreateProjectsLocationsNotesResponse = BatchCreateNotesResponse;
export const BatchCreateProjectsLocationsNotesResponse = BatchCreateNotesResponse;

export type BatchCreateProjectsLocationsNotesError = CommonErrors;

export const batchCreateProjectsLocationsNotes: API.OperationMethod<BatchCreateProjectsLocationsNotesRequest, BatchCreateProjectsLocationsNotesResponse, BatchCreateProjectsLocationsNotesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchCreateProjectsLocationsNotesRequest,
  output: BatchCreateProjectsLocationsNotesResponse,
  errors: [],
}));

/** Deletes the specified note. */
export interface DeleteProjectsLocationsNotesRequest {
  /** Required. The name of the note in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. */
  name: string;
}

export const DeleteProjectsLocationsNotesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/notes/{notesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsNotesRequest>;

export type DeleteProjectsLocationsNotesResponse = Empty;
export const DeleteProjectsLocationsNotesResponse = Empty;

export type DeleteProjectsLocationsNotesError = CommonErrors;

export const deleteProjectsLocationsNotes: API.OperationMethod<DeleteProjectsLocationsNotesRequest, DeleteProjectsLocationsNotesResponse, DeleteProjectsLocationsNotesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsNotesRequest,
  output: DeleteProjectsLocationsNotesResponse,
  errors: [],
}));

/** Lists occurrences referencing the specified note. Provider projects can use this method to get all occurrences across consumer projects referencing the specified note. */
export interface ListProjectsLocationsNotesOccurrencesRequest {
  /** Token to provide to skip to a particular spot in the list. */
  pageToken?: string;
  /** The filter expression. */
  filter?: string;
  /** Required. The name of the note to list occurrences for in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. */
  name: string;
  /** Number of occurrences to return in the list. */
  pageSize?: number;
}

export const ListProjectsLocationsNotesOccurrencesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/notes/{notesId}/occurrences" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsNotesOccurrencesRequest>;

export type ListProjectsLocationsNotesOccurrencesResponse = ListNoteOccurrencesResponse;
export const ListProjectsLocationsNotesOccurrencesResponse = ListNoteOccurrencesResponse;

export type ListProjectsLocationsNotesOccurrencesError = CommonErrors;

export const listProjectsLocationsNotesOccurrences = API.makePaginated(() => ({
  input: ListProjectsLocationsNotesOccurrencesRequest,
  output: ListProjectsLocationsNotesOccurrencesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Generates an SBOM for the given resource. */
export interface ExportSBOMProjectsLocationsResourcesRequest {
  /** Required. The name of the resource in the form of `projects/[PROJECT_ID]/resources/[RESOURCE_URL]`. */
  name: string;
  /** Request body */
  body?: ExportSBOMRequest;
}

export const ExportSBOMProjectsLocationsResourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ExportSBOMRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/resources/{resourcesId}:exportSBOM", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExportSBOMProjectsLocationsResourcesRequest>;

export type ExportSBOMProjectsLocationsResourcesResponse = ExportSBOMResponse;
export const ExportSBOMProjectsLocationsResourcesResponse = ExportSBOMResponse;

export type ExportSBOMProjectsLocationsResourcesError = CommonErrors;

export const exportSBOMProjectsLocationsResources: API.OperationMethod<ExportSBOMProjectsLocationsResourcesRequest, ExportSBOMProjectsLocationsResourcesResponse, ExportSBOMProjectsLocationsResourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExportSBOMProjectsLocationsResourcesRequest,
  output: ExportSBOMProjectsLocationsResourcesResponse,
  errors: [],
}));

/** Creates a new occurrence. */
export interface CreateProjectsLocationsOccurrencesRequest {
  /** Required. The name of the project in the form of `projects/[PROJECT_ID]`, under which the occurrence is to be created. */
  parent: string;
  /** Request body */
  body?: Occurrence;
}

export const CreateProjectsLocationsOccurrencesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Occurrence).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/occurrences", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsOccurrencesRequest>;

export type CreateProjectsLocationsOccurrencesResponse = Occurrence;
export const CreateProjectsLocationsOccurrencesResponse = Occurrence;

export type CreateProjectsLocationsOccurrencesError = CommonErrors;

export const createProjectsLocationsOccurrences: API.OperationMethod<CreateProjectsLocationsOccurrencesRequest, CreateProjectsLocationsOccurrencesResponse, CreateProjectsLocationsOccurrencesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsOccurrencesRequest,
  output: CreateProjectsLocationsOccurrencesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified note or occurrence. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a note or an occurrence, respectively. The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences. */
export interface SetIamPolicyProjectsLocationsOccurrencesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsOccurrencesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/occurrences/{occurrencesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsOccurrencesRequest>;

export type SetIamPolicyProjectsLocationsOccurrencesResponse = Policy;
export const SetIamPolicyProjectsLocationsOccurrencesResponse = Policy;

export type SetIamPolicyProjectsLocationsOccurrencesError = CommonErrors;

export const setIamPolicyProjectsLocationsOccurrences: API.OperationMethod<SetIamPolicyProjectsLocationsOccurrencesRequest, SetIamPolicyProjectsLocationsOccurrencesResponse, SetIamPolicyProjectsLocationsOccurrencesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsOccurrencesRequest,
  output: SetIamPolicyProjectsLocationsOccurrencesResponse,
  errors: [],
}));

/** Gets the specified occurrence. */
export interface GetProjectsLocationsOccurrencesRequest {
  /** Required. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`. */
  name: string;
}

export const GetProjectsLocationsOccurrencesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/occurrences/{occurrencesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOccurrencesRequest>;

export type GetProjectsLocationsOccurrencesResponse = Occurrence;
export const GetProjectsLocationsOccurrencesResponse = Occurrence;

export type GetProjectsLocationsOccurrencesError = CommonErrors;

export const getProjectsLocationsOccurrences: API.OperationMethod<GetProjectsLocationsOccurrencesRequest, GetProjectsLocationsOccurrencesResponse, GetProjectsLocationsOccurrencesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOccurrencesRequest,
  output: GetProjectsLocationsOccurrencesResponse,
  errors: [],
}));

/** Lists occurrences for the specified project. */
export interface ListProjectsLocationsOccurrencesRequest {
  /** The filter expression. */
  filter?: string;
  /** Token to provide to skip to a particular spot in the list. */
  pageToken?: string;
  /** If set, the request will return all reachable Occurrences and report all unreachable regions in the `unreachable` field in the response. Only applicable for requests in the global region. */
  returnPartialSuccess?: boolean;
  /** Number of occurrences to return in the list. Must be positive. Max allowed page size is 1000. If not specified, page size defaults to 20. */
  pageSize?: number;
  /** Required. The name of the project to list occurrences for in the form of `projects/[PROJECT_ID]`. */
  parent: string;
}

export const ListProjectsLocationsOccurrencesRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/occurrences" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOccurrencesRequest>;

export type ListProjectsLocationsOccurrencesResponse = ListOccurrencesResponse;
export const ListProjectsLocationsOccurrencesResponse = ListOccurrencesResponse;

export type ListProjectsLocationsOccurrencesError = CommonErrors;

export const listProjectsLocationsOccurrences = API.makePaginated(() => ({
  input: ListProjectsLocationsOccurrencesRequest,
  output: ListProjectsLocationsOccurrencesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates the specified occurrence. */
export interface PatchProjectsLocationsOccurrencesRequest {
  /** The fields to update. */
  updateMask?: string;
  /** Required. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`. */
  name: string;
  /** Request body */
  body?: Occurrence;
}

export const PatchProjectsLocationsOccurrencesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Occurrence).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/occurrences/{occurrencesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsOccurrencesRequest>;

export type PatchProjectsLocationsOccurrencesResponse = Occurrence;
export const PatchProjectsLocationsOccurrencesResponse = Occurrence;

export type PatchProjectsLocationsOccurrencesError = CommonErrors;

export const patchProjectsLocationsOccurrences: API.OperationMethod<PatchProjectsLocationsOccurrencesRequest, PatchProjectsLocationsOccurrencesResponse, PatchProjectsLocationsOccurrencesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsOccurrencesRequest,
  output: PatchProjectsLocationsOccurrencesResponse,
  errors: [],
}));

/** Creates new occurrences in batch. */
export interface BatchCreateProjectsLocationsOccurrencesRequest {
  /** Required. The name of the project in the form of `projects/[PROJECT_ID]`, under which the occurrences are to be created. */
  parent: string;
  /** Request body */
  body?: BatchCreateOccurrencesRequest;
}

export const BatchCreateProjectsLocationsOccurrencesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchCreateOccurrencesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/occurrences:batchCreate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchCreateProjectsLocationsOccurrencesRequest>;

export type BatchCreateProjectsLocationsOccurrencesResponse = BatchCreateOccurrencesResponse;
export const BatchCreateProjectsLocationsOccurrencesResponse = BatchCreateOccurrencesResponse;

export type BatchCreateProjectsLocationsOccurrencesError = CommonErrors;

export const batchCreateProjectsLocationsOccurrences: API.OperationMethod<BatchCreateProjectsLocationsOccurrencesRequest, BatchCreateProjectsLocationsOccurrencesResponse, BatchCreateProjectsLocationsOccurrencesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchCreateProjectsLocationsOccurrencesRequest,
  output: BatchCreateProjectsLocationsOccurrencesResponse,
  errors: [],
}));

/** Deletes the specified occurrence. For example, use this method to delete an occurrence when the occurrence is no longer applicable for the given resource. */
export interface DeleteProjectsLocationsOccurrencesRequest {
  /** Required. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`. */
  name: string;
}

export const DeleteProjectsLocationsOccurrencesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/occurrences/{occurrencesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsOccurrencesRequest>;

export type DeleteProjectsLocationsOccurrencesResponse = Empty;
export const DeleteProjectsLocationsOccurrencesResponse = Empty;

export type DeleteProjectsLocationsOccurrencesError = CommonErrors;

export const deleteProjectsLocationsOccurrences: API.OperationMethod<DeleteProjectsLocationsOccurrencesRequest, DeleteProjectsLocationsOccurrencesResponse, DeleteProjectsLocationsOccurrencesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsOccurrencesRequest,
  output: DeleteProjectsLocationsOccurrencesResponse,
  errors: [],
}));

/** Gets a summary of the number and severity of occurrences. */
export interface GetVulnerabilitySummaryProjectsLocationsOccurrencesRequest {
  /** If set, the request will return all reachable occurrence summaries and report all unreachable regions in the `unreachable` field in the response. Only applicable for requests in the global region. */
  returnPartialSuccess?: boolean;
  /** The filter expression. */
  filter?: string;
  /** Required. The name of the project to get a vulnerability summary for in the form of `projects/[PROJECT_ID]`. */
  parent: string;
}

export const GetVulnerabilitySummaryProjectsLocationsOccurrencesRequest = Schema.Struct({
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/occurrences:vulnerabilitySummary" }),
  svc,
) as unknown as Schema.Schema<GetVulnerabilitySummaryProjectsLocationsOccurrencesRequest>;

export type GetVulnerabilitySummaryProjectsLocationsOccurrencesResponse = VulnerabilityOccurrencesSummary;
export const GetVulnerabilitySummaryProjectsLocationsOccurrencesResponse = VulnerabilityOccurrencesSummary;

export type GetVulnerabilitySummaryProjectsLocationsOccurrencesError = CommonErrors;

export const getVulnerabilitySummaryProjectsLocationsOccurrences: API.OperationMethod<GetVulnerabilitySummaryProjectsLocationsOccurrencesRequest, GetVulnerabilitySummaryProjectsLocationsOccurrencesResponse, GetVulnerabilitySummaryProjectsLocationsOccurrencesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetVulnerabilitySummaryProjectsLocationsOccurrencesRequest,
  output: GetVulnerabilitySummaryProjectsLocationsOccurrencesResponse,
  errors: [],
}));

/** Gets the access control policy for a note or an occurrence resource. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a note or occurrence, respectively. The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences. */
export interface GetIamPolicyProjectsLocationsOccurrencesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsLocationsOccurrencesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/occurrences/{occurrencesId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsOccurrencesRequest>;

export type GetIamPolicyProjectsLocationsOccurrencesResponse = Policy;
export const GetIamPolicyProjectsLocationsOccurrencesResponse = Policy;

export type GetIamPolicyProjectsLocationsOccurrencesError = CommonErrors;

export const getIamPolicyProjectsLocationsOccurrences: API.OperationMethod<GetIamPolicyProjectsLocationsOccurrencesRequest, GetIamPolicyProjectsLocationsOccurrencesResponse, GetIamPolicyProjectsLocationsOccurrencesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsOccurrencesRequest,
  output: GetIamPolicyProjectsLocationsOccurrencesResponse,
  errors: [],
}));

/** Returns the permissions that a caller has on the specified note or occurrence. Requires list permission on the project (for example, `containeranalysis.notes.list`). The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences. */
export interface TestIamPermissionsProjectsLocationsOccurrencesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsOccurrencesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/occurrences/{occurrencesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsOccurrencesRequest>;

export type TestIamPermissionsProjectsLocationsOccurrencesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsOccurrencesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsOccurrencesError = CommonErrors;

export const testIamPermissionsProjectsLocationsOccurrences: API.OperationMethod<TestIamPermissionsProjectsLocationsOccurrencesRequest, TestIamPermissionsProjectsLocationsOccurrencesResponse, TestIamPermissionsProjectsLocationsOccurrencesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsOccurrencesRequest,
  output: TestIamPermissionsProjectsLocationsOccurrencesResponse,
  errors: [],
}));

/** Gets the note attached to the specified occurrence. Consumer projects can use this method to get a note that belongs to a provider project. */
export interface GetNotesProjectsLocationsOccurrencesRequest {
  /** Required. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`. */
  name: string;
}

export const GetNotesProjectsLocationsOccurrencesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/occurrences/{occurrencesId}/notes" }),
  svc,
) as unknown as Schema.Schema<GetNotesProjectsLocationsOccurrencesRequest>;

export type GetNotesProjectsLocationsOccurrencesResponse = Note;
export const GetNotesProjectsLocationsOccurrencesResponse = Note;

export type GetNotesProjectsLocationsOccurrencesError = CommonErrors;

export const getNotesProjectsLocationsOccurrences: API.OperationMethod<GetNotesProjectsLocationsOccurrencesRequest, GetNotesProjectsLocationsOccurrencesResponse, GetNotesProjectsLocationsOccurrencesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetNotesProjectsLocationsOccurrencesRequest,
  output: GetNotesProjectsLocationsOccurrencesResponse,
  errors: [],
}));

/** Gets the access control policy for a note or an occurrence resource. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a note or occurrence, respectively. The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences. */
export interface GetIamPolicyProjectsOccurrencesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsOccurrencesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/occurrences/{occurrencesId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsOccurrencesRequest>;

export type GetIamPolicyProjectsOccurrencesResponse = Policy;
export const GetIamPolicyProjectsOccurrencesResponse = Policy;

export type GetIamPolicyProjectsOccurrencesError = CommonErrors;

export const getIamPolicyProjectsOccurrences: API.OperationMethod<GetIamPolicyProjectsOccurrencesRequest, GetIamPolicyProjectsOccurrencesResponse, GetIamPolicyProjectsOccurrencesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsOccurrencesRequest,
  output: GetIamPolicyProjectsOccurrencesResponse,
  errors: [],
}));

/** Deletes the specified occurrence. For example, use this method to delete an occurrence when the occurrence is no longer applicable for the given resource. */
export interface DeleteProjectsOccurrencesRequest {
  /** Required. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`. */
  name: string;
}

export const DeleteProjectsOccurrencesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/occurrences/{occurrencesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsOccurrencesRequest>;

export type DeleteProjectsOccurrencesResponse = Empty;
export const DeleteProjectsOccurrencesResponse = Empty;

export type DeleteProjectsOccurrencesError = CommonErrors;

export const deleteProjectsOccurrences: API.OperationMethod<DeleteProjectsOccurrencesRequest, DeleteProjectsOccurrencesResponse, DeleteProjectsOccurrencesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsOccurrencesRequest,
  output: DeleteProjectsOccurrencesResponse,
  errors: [],
}));

/** Gets the note attached to the specified occurrence. Consumer projects can use this method to get a note that belongs to a provider project. */
export interface GetNotesProjectsOccurrencesRequest {
  /** Required. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`. */
  name: string;
}

export const GetNotesProjectsOccurrencesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/occurrences/{occurrencesId}/notes" }),
  svc,
) as unknown as Schema.Schema<GetNotesProjectsOccurrencesRequest>;

export type GetNotesProjectsOccurrencesResponse = Note;
export const GetNotesProjectsOccurrencesResponse = Note;

export type GetNotesProjectsOccurrencesError = CommonErrors;

export const getNotesProjectsOccurrences: API.OperationMethod<GetNotesProjectsOccurrencesRequest, GetNotesProjectsOccurrencesResponse, GetNotesProjectsOccurrencesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetNotesProjectsOccurrencesRequest,
  output: GetNotesProjectsOccurrencesResponse,
  errors: [],
}));

/** Updates the specified occurrence. */
export interface PatchProjectsOccurrencesRequest {
  /** The fields to update. */
  updateMask?: string;
  /** Required. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`. */
  name: string;
  /** Request body */
  body?: Occurrence;
}

export const PatchProjectsOccurrencesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Occurrence).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/occurrences/{occurrencesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsOccurrencesRequest>;

export type PatchProjectsOccurrencesResponse = Occurrence;
export const PatchProjectsOccurrencesResponse = Occurrence;

export type PatchProjectsOccurrencesError = CommonErrors;

export const patchProjectsOccurrences: API.OperationMethod<PatchProjectsOccurrencesRequest, PatchProjectsOccurrencesResponse, PatchProjectsOccurrencesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsOccurrencesRequest,
  output: PatchProjectsOccurrencesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified note or occurrence. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a note or an occurrence, respectively. The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences. */
export interface SetIamPolicyProjectsOccurrencesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsOccurrencesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/occurrences/{occurrencesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsOccurrencesRequest>;

export type SetIamPolicyProjectsOccurrencesResponse = Policy;
export const SetIamPolicyProjectsOccurrencesResponse = Policy;

export type SetIamPolicyProjectsOccurrencesError = CommonErrors;

export const setIamPolicyProjectsOccurrences: API.OperationMethod<SetIamPolicyProjectsOccurrencesRequest, SetIamPolicyProjectsOccurrencesResponse, SetIamPolicyProjectsOccurrencesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsOccurrencesRequest,
  output: SetIamPolicyProjectsOccurrencesResponse,
  errors: [],
}));

/** Creates new occurrences in batch. */
export interface BatchCreateProjectsOccurrencesRequest {
  /** Required. The name of the project in the form of `projects/[PROJECT_ID]`, under which the occurrences are to be created. */
  parent: string;
  /** Request body */
  body?: BatchCreateOccurrencesRequest;
}

export const BatchCreateProjectsOccurrencesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchCreateOccurrencesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/occurrences:batchCreate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchCreateProjectsOccurrencesRequest>;

export type BatchCreateProjectsOccurrencesResponse = BatchCreateOccurrencesResponse;
export const BatchCreateProjectsOccurrencesResponse = BatchCreateOccurrencesResponse;

export type BatchCreateProjectsOccurrencesError = CommonErrors;

export const batchCreateProjectsOccurrences: API.OperationMethod<BatchCreateProjectsOccurrencesRequest, BatchCreateProjectsOccurrencesResponse, BatchCreateProjectsOccurrencesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchCreateProjectsOccurrencesRequest,
  output: BatchCreateProjectsOccurrencesResponse,
  errors: [],
}));

/** Returns the permissions that a caller has on the specified note or occurrence. Requires list permission on the project (for example, `containeranalysis.notes.list`). The resource takes the format `projects/[PROJECT_ID]/notes/[NOTE_ID]` for notes and `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]` for occurrences. */
export interface TestIamPermissionsProjectsOccurrencesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsOccurrencesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/occurrences/{occurrencesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsOccurrencesRequest>;

export type TestIamPermissionsProjectsOccurrencesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsOccurrencesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsOccurrencesError = CommonErrors;

export const testIamPermissionsProjectsOccurrences: API.OperationMethod<TestIamPermissionsProjectsOccurrencesRequest, TestIamPermissionsProjectsOccurrencesResponse, TestIamPermissionsProjectsOccurrencesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsOccurrencesRequest,
  output: TestIamPermissionsProjectsOccurrencesResponse,
  errors: [],
}));

/** Gets the specified occurrence. */
export interface GetProjectsOccurrencesRequest {
  /** Required. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`. */
  name: string;
}

export const GetProjectsOccurrencesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/occurrences/{occurrencesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsOccurrencesRequest>;

export type GetProjectsOccurrencesResponse = Occurrence;
export const GetProjectsOccurrencesResponse = Occurrence;

export type GetProjectsOccurrencesError = CommonErrors;

export const getProjectsOccurrences: API.OperationMethod<GetProjectsOccurrencesRequest, GetProjectsOccurrencesResponse, GetProjectsOccurrencesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsOccurrencesRequest,
  output: GetProjectsOccurrencesResponse,
  errors: [],
}));

/** Gets a summary of the number and severity of occurrences. */
export interface GetVulnerabilitySummaryProjectsOccurrencesRequest {
  /** The filter expression. */
  filter?: string;
  /** Required. The name of the project to get a vulnerability summary for in the form of `projects/[PROJECT_ID]`. */
  parent: string;
  /** If set, the request will return all reachable occurrence summaries and report all unreachable regions in the `unreachable` field in the response. Only applicable for requests in the global region. */
  returnPartialSuccess?: boolean;
}

export const GetVulnerabilitySummaryProjectsOccurrencesRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/occurrences:vulnerabilitySummary" }),
  svc,
) as unknown as Schema.Schema<GetVulnerabilitySummaryProjectsOccurrencesRequest>;

export type GetVulnerabilitySummaryProjectsOccurrencesResponse = VulnerabilityOccurrencesSummary;
export const GetVulnerabilitySummaryProjectsOccurrencesResponse = VulnerabilityOccurrencesSummary;

export type GetVulnerabilitySummaryProjectsOccurrencesError = CommonErrors;

export const getVulnerabilitySummaryProjectsOccurrences: API.OperationMethod<GetVulnerabilitySummaryProjectsOccurrencesRequest, GetVulnerabilitySummaryProjectsOccurrencesResponse, GetVulnerabilitySummaryProjectsOccurrencesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetVulnerabilitySummaryProjectsOccurrencesRequest,
  output: GetVulnerabilitySummaryProjectsOccurrencesResponse,
  errors: [],
}));

/** Lists occurrences for the specified project. */
export interface ListProjectsOccurrencesRequest {
  /** Token to provide to skip to a particular spot in the list. */
  pageToken?: string;
  /** Required. The name of the project to list occurrences for in the form of `projects/[PROJECT_ID]`. */
  parent: string;
  /** The filter expression. */
  filter?: string;
  /** Number of occurrences to return in the list. Must be positive. Max allowed page size is 1000. If not specified, page size defaults to 20. */
  pageSize?: number;
  /** If set, the request will return all reachable Occurrences and report all unreachable regions in the `unreachable` field in the response. Only applicable for requests in the global region. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsOccurrencesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/occurrences" }),
  svc,
) as unknown as Schema.Schema<ListProjectsOccurrencesRequest>;

export type ListProjectsOccurrencesResponse = ListOccurrencesResponse;
export const ListProjectsOccurrencesResponse = ListOccurrencesResponse;

export type ListProjectsOccurrencesError = CommonErrors;

export const listProjectsOccurrences = API.makePaginated(() => ({
  input: ListProjectsOccurrencesRequest,
  output: ListProjectsOccurrencesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new occurrence. */
export interface CreateProjectsOccurrencesRequest {
  /** Required. The name of the project in the form of `projects/[PROJECT_ID]`, under which the occurrence is to be created. */
  parent: string;
  /** Request body */
  body?: Occurrence;
}

export const CreateProjectsOccurrencesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Occurrence).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/occurrences", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsOccurrencesRequest>;

export type CreateProjectsOccurrencesResponse = Occurrence;
export const CreateProjectsOccurrencesResponse = Occurrence;

export type CreateProjectsOccurrencesError = CommonErrors;

export const createProjectsOccurrences: API.OperationMethod<CreateProjectsOccurrencesRequest, CreateProjectsOccurrencesResponse, CreateProjectsOccurrencesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsOccurrencesRequest,
  output: CreateProjectsOccurrencesResponse,
  errors: [],
}));

/** Generates an SBOM for the given resource. */
export interface ExportSBOMProjectsResourcesRequest {
  /** Required. The name of the resource in the form of `projects/[PROJECT_ID]/resources/[RESOURCE_URL]`. */
  name: string;
  /** Request body */
  body?: ExportSBOMRequest;
}

export const ExportSBOMProjectsResourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ExportSBOMRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/resources/{resourcesId}:exportSBOM", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExportSBOMProjectsResourcesRequest>;

export type ExportSBOMProjectsResourcesResponse = ExportSBOMResponse;
export const ExportSBOMProjectsResourcesResponse = ExportSBOMResponse;

export type ExportSBOMProjectsResourcesError = CommonErrors;

export const exportSBOMProjectsResources: API.OperationMethod<ExportSBOMProjectsResourcesRequest, ExportSBOMProjectsResourcesResponse, ExportSBOMProjectsResourcesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExportSBOMProjectsResourcesRequest,
  output: ExportSBOMProjectsResourcesResponse,
  errors: [],
}));

