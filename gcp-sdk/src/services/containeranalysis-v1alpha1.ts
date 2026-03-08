// ==========================================================================
// Container Analysis API (containeranalysis v1alpha1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "containeranalysis",
  version: "v1alpha1",
  rootUrl: "https://containeranalysis.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface ScanConfig {
  /** Output only. The time this scan config was last updated. */
  updateTime?: string;
  /** Indicates whether the Scan is enabled. */
  enabled?: boolean;
  /** Output only. The name of the ScanConfig in the form “projects/{project_id}/scanConfigs/{scan_config_id}". */
  name?: string;
  /** Output only. A human-readable description of what the `ScanConfig` does. */
  description?: string;
  /** Output only. The time this scan config was created. */
  createTime?: string;
}

export const ScanConfig: Schema.Schema<ScanConfig> = Schema.suspend(() =>
  Schema.Struct({
    updateTime: Schema.optional(Schema.String),
    enabled: Schema.optional(Schema.Boolean),
    name: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "ScanConfig" }) as any as Schema.Schema<ScanConfig>;

export interface Recipe {
  /** Any other builder-controlled inputs necessary for correctly evaluating the recipe. Usually only needed for reproducing the build but not evaluated as part of policy. */
  environment?: Array<Record<string, unknown>>;
  /** String identifying the entry point into the build. This is often a path to a configuration file and/or a target label within that file. The syntax and meaning are defined by recipe.type. For example, if the recipe type were "make", then this would reference the directory in which to run make as well as which target to use. */
  entryPoint?: string;
  /** URI indicating what type of recipe was performed. It determines the meaning of recipe.entryPoint, recipe.arguments, recipe.environment, and materials. */
  type?: string;
  /** Index in materials containing the recipe steps that are not implied by recipe.type. For example, if the recipe type were "make", then this would point to the source containing the Makefile, not the make program itself. Set to -1 if the recipe doesn't come from a material, as zero is default unset value for int64. */
  definedInMaterial?: string;
  /** Collection of all external inputs that influenced the build on top of recipe.definedInMaterial and recipe.entryPoint. For example, if the recipe type were "make", then this might be the flags passed to make aside from the target, which is captured in recipe.entryPoint. */
  arguments?: Array<Record<string, unknown>>;
}

export const Recipe: Schema.Schema<Recipe> = Schema.suspend(() =>
  Schema.Struct({
    environment: Schema.optional(
      Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
    ),
    entryPoint: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    definedInMaterial: Schema.optional(Schema.String),
    arguments: Schema.optional(
      Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
    ),
  }),
).annotate({ identifier: "Recipe" }) as any as Schema.Schema<Recipe>;

export interface Completeness {
  /** If true, the builder claims that materials are complete, usually through some controls to prevent network access. Sometimes called "hermetic". */
  materials?: boolean;
  /** If true, the builder claims that recipe.arguments is complete, meaning that all external inputs are properly captured in the recipe. */
  arguments?: boolean;
  /** If true, the builder claims that recipe.environment is claimed to be complete. */
  environment?: boolean;
}

export const Completeness: Schema.Schema<Completeness> = Schema.suspend(() =>
  Schema.Struct({
    materials: Schema.optional(Schema.Boolean),
    arguments: Schema.optional(Schema.Boolean),
    environment: Schema.optional(Schema.Boolean),
  }),
).annotate({
  identifier: "Completeness",
}) as any as Schema.Schema<Completeness>;

export interface Metadata {
  /** The timestamp of when the build started. */
  buildStartedOn?: string;
  /** The timestamp of when the build completed. */
  buildFinishedOn?: string;
  /** If true, the builder claims that running the recipe on materials will produce bit-for-bit identical output. */
  reproducible?: boolean;
  /** Indicates that the builder claims certain fields in this message to be complete. */
  completeness?: Completeness;
  /** Identifies the particular build invocation, which can be useful for finding associated logs or other ad-hoc analysis. The value SHOULD be globally unique, per in-toto Provenance spec. */
  buildInvocationId?: string;
}

export const Metadata: Schema.Schema<Metadata> = Schema.suspend(() =>
  Schema.Struct({
    buildStartedOn: Schema.optional(Schema.String),
    buildFinishedOn: Schema.optional(Schema.String),
    reproducible: Schema.optional(Schema.Boolean),
    completeness: Schema.optional(Completeness),
    buildInvocationId: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Metadata" }) as any as Schema.Schema<Metadata>;

export interface BuilderConfig {
  id?: string;
}

export const BuilderConfig: Schema.Schema<BuilderConfig> = Schema.suspend(() =>
  Schema.Struct({
    id: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "BuilderConfig",
}) as any as Schema.Schema<BuilderConfig>;

export interface InTotoProvenance {
  /** Identifies the configuration used for the build. When combined with materials, this SHOULD fully describe the build, such that re-running this recipe results in bit-for-bit identical output (if the build is reproducible). required */
  recipe?: Recipe;
  metadata?: Metadata;
  /** required */
  builderConfig?: BuilderConfig;
  /** The collection of artifacts that influenced the build including sources, dependencies, build tools, base images, and so on. This is considered to be incomplete unless metadata.completeness.materials is true. Unset or null is equivalent to empty. */
  materials?: Array<string>;
}

export const InTotoProvenance: Schema.Schema<InTotoProvenance> = Schema.suspend(
  () =>
    Schema.Struct({
      recipe: Schema.optional(Recipe),
      metadata: Schema.optional(Metadata),
      builderConfig: Schema.optional(BuilderConfig),
      materials: Schema.optional(Schema.Array(Schema.String)),
    }),
).annotate({
  identifier: "InTotoProvenance",
}) as any as Schema.Schema<InTotoProvenance>;

export interface License {
  /** Comments */
  comments?: string;
  /** Often a single license can be used to represent the licensing terms. Sometimes it is necessary to include a choice of one or more licenses or some combination of license identifiers. Examples: "LGPL-2.1-only OR MIT", "LGPL-2.1-only AND MIT", "GPL-2.0-or-later WITH Bison-exception-2.2". */
  expression?: string;
}

export const License: Schema.Schema<License> = Schema.suspend(() =>
  Schema.Struct({
    comments: Schema.optional(Schema.String),
    expression: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "License" }) as any as Schema.Schema<License>;

export interface ExternalRef {
  /** An External Reference allows a Package to reference an external source of additional information, metadata, enumerations, asset identifiers, or downloadable content believed to be relevant to the Package */
  category?:
    | "CATEGORY_UNSPECIFIED"
    | "SECURITY"
    | "PACKAGE_MANAGER"
    | "PERSISTENT_ID"
    | "OTHER"
    | (string & {});
  /** Human-readable information about the purpose and target of the reference */
  comment?: string;
  /** Type of category (e.g. 'npm' for the PACKAGE_MANAGER category) */
  type?: string;
  /** The unique string with no spaces necessary to access the package-specific information, metadata, or content within the target location */
  locator?: string;
}

export const ExternalRef: Schema.Schema<ExternalRef> = Schema.suspend(() =>
  Schema.Struct({
    category: Schema.optional(Schema.String),
    comment: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    locator: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "ExternalRef" }) as any as Schema.Schema<ExternalRef>;

export interface PackageInfoNote {
  /** Identify the version of the package */
  version?: string;
  /** List the licenses that have been declared by the authors of the package */
  licenseDeclared?: License;
  /** Identify the actual distribution source for the package/directory identified in the SPDX file */
  supplier?: string;
  /** If the package identified in the SPDX file originated from a different person or organization than identified as Package Supplier, this field identifies from where or whom the package originally came */
  originator?: string;
  /** Provide an independently reproducible mechanism that permits unique identification of a specific package that correlates to the data in this SPDX file */
  checksum?: string;
  /** Identify the copyright holders of the package, as well as any dates present */
  copyright?: string;
  /** ExternalRef */
  externalRefs?: Array<ExternalRef>;
  /** A short description of the package */
  summaryDescription?: string;
  /** This field provides an independently reproducible mechanism identifying specific contents of a package based on the actual files (except the SPDX file itself, if it is included in the package) that make up each package and that correlates to the data in this SPDX file */
  verificationCode?: string;
  /** Provide a place for the SPDX file creator to record a web site that serves as the package's home page */
  homePage?: string;
  /** Contain the license the SPDX file creator has concluded as governing the This field is to contain a list of all licenses found in the package. The relationship between licenses (i.e., conjunctive, disjunctive) is not specified in this field – it is simply a listing of all licenses found */
  filesLicenseInfo?: Array<string>;
  /** A more detailed description of the package */
  detailedDescription?: string;
  /** Indicates whether the file content of this package has been available for or subjected to analysis when creating the SPDX document */
  analyzed?: boolean;
  /** Identify the full name of the package as given by the Package Originator */
  title?: string;
  /** The type of package: OS, MAVEN, GO, GO_STDLIB, etc. */
  packageType?: string;
  /** This section identifies the download Universal Resource Locator (URL), or a specific location within a version control system (VCS) for the package at the time that the SPDX file was created */
  downloadLocation?: string;
  /** A place for the SPDX data creator to record, at the package level, acknowledgements that may be needed to be communicated in some contexts */
  attribution?: string;
}

export const PackageInfoNote: Schema.Schema<PackageInfoNote> = Schema.suspend(
  () =>
    Schema.Struct({
      version: Schema.optional(Schema.String),
      licenseDeclared: Schema.optional(License),
      supplier: Schema.optional(Schema.String),
      originator: Schema.optional(Schema.String),
      checksum: Schema.optional(Schema.String),
      copyright: Schema.optional(Schema.String),
      externalRefs: Schema.optional(Schema.Array(ExternalRef)),
      summaryDescription: Schema.optional(Schema.String),
      verificationCode: Schema.optional(Schema.String),
      homePage: Schema.optional(Schema.String),
      filesLicenseInfo: Schema.optional(Schema.Array(Schema.String)),
      detailedDescription: Schema.optional(Schema.String),
      analyzed: Schema.optional(Schema.Boolean),
      title: Schema.optional(Schema.String),
      packageType: Schema.optional(Schema.String),
      downloadLocation: Schema.optional(Schema.String),
      attribution: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "PackageInfoNote",
}) as any as Schema.Schema<PackageInfoNote>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan {
  /** Start of time span. */
  startTime?: string;
  /** End of time span. */
  endTime?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan> =
  Schema.suspend(() =>
    Schema.Struct({
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsArtifactObjects {
  /** Path globs used to match files in the build's workspace. */
  paths?: Array<string>;
  /** Output only. Stores timing information for pushing all artifact objects. */
  timing?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
  /** Cloud Storage bucket and optional object path, in the form "gs://bucket/path/to/somewhere/". (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)). Files in the workspace matching any path pattern will be uploaded to Cloud Storage with this location as a prefix. */
  location?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsArtifactObjects: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsArtifactObjects> =
  Schema.suspend(() =>
    Schema.Struct({
      paths: Schema.optional(Schema.Array(Schema.String)),
      timing: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan,
      ),
      location: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsArtifactObjects",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsArtifactObjects>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret {
  /** Map of environment variable name to its encrypted value. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step. Values can be at most 64 KB in size. There can be at most 100 secret values across all of a build's secrets. */
  envMap?: Record<string, string>;
  /** Resource name of Cloud KMS crypto key to decrypt the encrypted value. In format: projects/* /locations/* /keyRings/* /cryptoKeys/* */
  kmsKeyName?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret> =
  Schema.suspend(() =>
    Schema.Struct({
      envMap: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      kmsKeyName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret>;

export interface ComplianceVersion {
  /** The name of the document that defines this benchmark, e.g. "CIS Container-Optimized OS". */
  benchmarkDocument?: string;
  /** The version of the benchmark. This is set to the version of the OS-specific CIS document the benchmark is defined in. */
  version?: string;
  /** The CPE URI (https://cpe.mitre.org/specification/) this benchmark is applicable to. */
  cpeUri?: string;
}

export const ComplianceVersion: Schema.Schema<ComplianceVersion> =
  Schema.suspend(() =>
    Schema.Struct({
      benchmarkDocument: Schema.optional(Schema.String),
      version: Schema.optional(Schema.String),
      cpeUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ComplianceVersion",
  }) as any as Schema.Schema<ComplianceVersion>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsMavenArtifact {
  /** Optional. Path to an artifact in the build's workspace to be uploaded to Artifact Registry. This can be either an absolute path, e.g. /workspace/my-app/target/my-app-1.0.SNAPSHOT.jar or a relative path from /workspace, e.g. my-app/target/my-app-1.0.SNAPSHOT.jar. */
  path?: string;
  /** Maven `artifactId` value used when uploading the artifact to Artifact Registry. */
  artifactId?: string;
  /** Artifact Registry repository, in the form "https://$REGION-maven.pkg.dev/$PROJECT/$REPOSITORY" Artifact in the workspace specified by path will be uploaded to Artifact Registry with this location as a prefix. */
  repository?: string;
  /** Maven `version` value used when uploading the artifact to Artifact Registry. */
  version?: string;
  /** Optional. Path to a folder containing the files to upload to Artifact Registry. This can be either an absolute path, e.g. `/workspace/my-app/target/`, or a relative path from /workspace, e.g. `my-app/target/`. This field is mutually exclusive with the `path` field. */
  deployFolder?: string;
  /** Maven `groupId` value used when uploading the artifact to Artifact Registry. */
  groupId?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsMavenArtifact: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsMavenArtifact> =
  Schema.suspend(() =>
    Schema.Struct({
      path: Schema.optional(Schema.String),
      artifactId: Schema.optional(Schema.String),
      repository: Schema.optional(Schema.String),
      version: Schema.optional(Schema.String),
      deployFolder: Schema.optional(Schema.String),
      groupId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsMavenArtifact",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsMavenArtifact>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsPythonPackage {
  /** Artifact Registry repository, in the form "https://$REGION-python.pkg.dev/$PROJECT/$REPOSITORY" Files in the workspace matching any path pattern will be uploaded to Artifact Registry with this location as a prefix. */
  repository?: string;
  /** Path globs used to match files in the build's workspace. For Python/ Twine, this is usually `dist/*`, and sometimes additionally an `.asc` file. */
  paths?: Array<string>;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsPythonPackage: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsPythonPackage> =
  Schema.suspend(() =>
    Schema.Struct({
      repository: Schema.optional(Schema.String),
      paths: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier:
      "ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsPythonPackage",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsPythonPackage>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsGoModule {
  /** Optional. Project ID of the Artifact Registry repository. Defaults to the build project. */
  repositoryProjectId?: string;
  /** Optional. The Go module's "module path". e.g. example.com/foo/v2 */
  modulePath?: string;
  /** Optional. Source path of the go.mod file in the build's workspace. If not specified, this will default to the current directory. e.g. ~/code/go/mypackage */
  sourcePath?: string;
  /** Optional. Location of the Artifact Registry repository. i.e. us-east1 Defaults to the build’s location. */
  repositoryLocation?: string;
  /** Optional. Artifact Registry repository name. Specified Go modules will be zipped and uploaded to Artifact Registry with this location as a prefix. e.g. my-go-repo */
  repositoryName?: string;
  /** Optional. The Go module's semantic version in the form vX.Y.Z. e.g. v0.1.1 Pre-release identifiers can also be added by appending a dash and dot separated ASCII alphanumeric characters and hyphens. e.g. v0.2.3-alpha.x.12m.5 */
  moduleVersion?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsGoModule: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsGoModule> =
  Schema.suspend(() =>
    Schema.Struct({
      repositoryProjectId: Schema.optional(Schema.String),
      modulePath: Schema.optional(Schema.String),
      sourcePath: Schema.optional(Schema.String),
      repositoryLocation: Schema.optional(Schema.String),
      repositoryName: Schema.optional(Schema.String),
      moduleVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsGoModule",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsGoModule>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsNpmPackage {
  /** Optional. Path to the package.json. e.g. workspace/path/to/package Only one of `archive` or `package_path` can be specified. */
  packagePath?: string;
  /** Artifact Registry repository, in the form "https://$REGION-npm.pkg.dev/$PROJECT/$REPOSITORY" Npm package in the workspace specified by path will be zipped and uploaded to Artifact Registry with this location as a prefix. */
  repository?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsNpmPackage: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsNpmPackage> =
  Schema.suspend(() =>
    Schema.Struct({
      packagePath: Schema.optional(Schema.String),
      repository: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsNpmPackage",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsNpmPackage>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Artifacts {
  /** A list of images to be pushed upon the successful completion of all build steps. The images will be pushed using the builder service account's credentials. The digests of the pushed images will be stored in the Build resource's results field. If any of the images fail to be pushed, the build is marked FAILURE. */
  images?: Array<string>;
  /** A list of objects to be uploaded to Cloud Storage upon successful completion of all build steps. Files in the workspace matching specified paths globs will be uploaded to the specified Cloud Storage location using the builder service account's credentials. The location and generation of the uploaded objects will be stored in the Build resource's results field. If any objects fail to be pushed, the build is marked FAILURE. */
  objects?: ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsArtifactObjects;
  /** A list of Maven artifacts to be uploaded to Artifact Registry upon successful completion of all build steps. Artifacts in the workspace matching specified paths globs will be uploaded to the specified Artifact Registry repository using the builder service account's credentials. If any artifacts fail to be pushed, the build is marked FAILURE. */
  mavenArtifacts?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsMavenArtifact>;
  /** A list of Python packages to be uploaded to Artifact Registry upon successful completion of all build steps. The build service account credentials will be used to perform the upload. If any objects fail to be pushed, the build is marked FAILURE. */
  pythonPackages?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsPythonPackage>;
  /** Optional. A list of Go modules to be uploaded to Artifact Registry upon successful completion of all build steps. If any objects fail to be pushed, the build is marked FAILURE. */
  goModules?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsGoModule>;
  /** A list of npm packages to be uploaded to Artifact Registry upon successful completion of all build steps. Npm packages in the specified paths will be uploaded to the specified Artifact Registry repository using the builder service account's credentials. If any packages fail to be pushed, the build is marked FAILURE. */
  npmPackages?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsNpmPackage>;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1Artifacts: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Artifacts> =
  Schema.suspend(() =>
    Schema.Struct({
      images: Schema.optional(Schema.Array(Schema.String)),
      objects: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsArtifactObjects,
      ),
      mavenArtifacts: Schema.optional(
        Schema.Array(
          ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsMavenArtifact,
        ),
      ),
      pythonPackages: Schema.optional(
        Schema.Array(
          ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsPythonPackage,
        ),
      ),
      goModules: Schema.optional(
        Schema.Array(
          ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsGoModule,
        ),
      ),
      npmPackages: Schema.optional(
        Schema.Array(
          ContaineranalysisGoogleDevtoolsCloudbuildV1ArtifactsNpmPackage,
        ),
      ),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1Artifacts",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Artifacts>;

export interface GoogleDevtoolsContaineranalysisV1alpha1ProjectRepoId {
  /** The ID of the project. */
  projectId?: string;
  /** The name of the repo. Leave empty for the default repo. */
  repoName?: string;
}

export const GoogleDevtoolsContaineranalysisV1alpha1ProjectRepoId: Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1ProjectRepoId> =
  Schema.suspend(() =>
    Schema.Struct({
      projectId: Schema.optional(Schema.String),
      repoName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleDevtoolsContaineranalysisV1alpha1ProjectRepoId",
  }) as any as Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1ProjectRepoId>;

export interface File {
  /** Optional. The digest(s) of the file. */
  digest?: Record<string, string>;
  /** Optional. The name of the file. */
  name?: string;
}

export const File: Schema.Schema<File> = Schema.suspend(() =>
  Schema.Struct({
    digest: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    name: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "File" }) as any as Schema.Schema<File>;

export interface SBOMReferenceNote {
  /** The version of the format that the SBOM takes. E.g. if the format is spdx, the version may be 2.3. */
  version?: string;
  /** The format that SBOM takes. E.g. may be spdx, cyclonedx, etc... */
  format?: string;
}

export const SBOMReferenceNote: Schema.Schema<SBOMReferenceNote> =
  Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.String),
      format: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SBOMReferenceNote",
  }) as any as Schema.Schema<SBOMReferenceNote>;

export interface EnvelopeSignature {
  /** A reference id to the key being used for signing */
  keyid?: string;
  /** The signature itself */
  sig?: string;
}

export const EnvelopeSignature: Schema.Schema<EnvelopeSignature> =
  Schema.suspend(() =>
    Schema.Struct({
      keyid: Schema.optional(Schema.String),
      sig: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EnvelopeSignature",
  }) as any as Schema.Schema<EnvelopeSignature>;

export interface SlsaRecipe {
  /** Collection of all external inputs that influenced the build on top of recipe.definedInMaterial and recipe.entryPoint. For example, if the recipe type were "make", then this might be the flags passed to make aside from the target, which is captured in recipe.entryPoint. Depending on the recipe Type, the structure may be different. */
  arguments?: Record<string, unknown>;
  /** Any other builder-controlled inputs necessary for correctly evaluating the recipe. Usually only needed for reproducing the build but not evaluated as part of policy. Depending on the recipe Type, the structure may be different. */
  environment?: Record<string, unknown>;
  /** URI indicating what type of recipe was performed. It determines the meaning of recipe.entryPoint, recipe.arguments, recipe.environment, and materials. */
  type?: string;
  /** Index in materials containing the recipe steps that are not implied by recipe.type. For example, if the recipe type were "make", then this would point to the source containing the Makefile, not the make program itself. Set to -1 if the recipe doesn't come from a material, as zero is default unset value for int64. */
  definedInMaterial?: string;
  /** String identifying the entry point into the build. This is often a path to a configuration file and/or a target label within that file. The syntax and meaning are defined by recipe.type. For example, if the recipe type were "make", then this would reference the directory in which to run make as well as which target to use. */
  entryPoint?: string;
}

export const SlsaRecipe: Schema.Schema<SlsaRecipe> = Schema.suspend(() =>
  Schema.Struct({
    arguments: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    environment: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    type: Schema.optional(Schema.String),
    definedInMaterial: Schema.optional(Schema.String),
    entryPoint: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "SlsaRecipe" }) as any as Schema.Schema<SlsaRecipe>;

export interface Material {
  /** uri is the uri of the material */
  uri?: string;
  /** digest is a map from a hash algorithm (e.g. sha256) to the value in the material */
  digest?: Record<string, string>;
}

export const Material: Schema.Schema<Material> = Schema.suspend(() =>
  Schema.Struct({
    uri: Schema.optional(Schema.String),
    digest: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  }),
).annotate({ identifier: "Material" }) as any as Schema.Schema<Material>;

export interface SlsaBuilder {
  /** id is the id of the slsa provenance builder */
  id?: string;
}

export const SlsaBuilder: Schema.Schema<SlsaBuilder> = Schema.suspend(() =>
  Schema.Struct({
    id: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "SlsaBuilder" }) as any as Schema.Schema<SlsaBuilder>;

export interface SlsaCompleteness {
  /** If true, the builder claims that recipe.arguments is complete, meaning that all external inputs are properly captured in the recipe. */
  arguments?: boolean;
  /** If true, the builder claims that materials are complete, usually through some controls to prevent network access. Sometimes called "hermetic". */
  materials?: boolean;
  /** If true, the builder claims that recipe.environment is claimed to be complete. */
  environment?: boolean;
}

export const SlsaCompleteness: Schema.Schema<SlsaCompleteness> = Schema.suspend(
  () =>
    Schema.Struct({
      arguments: Schema.optional(Schema.Boolean),
      materials: Schema.optional(Schema.Boolean),
      environment: Schema.optional(Schema.Boolean),
    }),
).annotate({
  identifier: "SlsaCompleteness",
}) as any as Schema.Schema<SlsaCompleteness>;

export interface SlsaMetadata {
  /** Identifies the particular build invocation, which can be useful for finding associated logs or other ad-hoc analysis. The value SHOULD be globally unique, per in-toto Provenance spec. */
  buildInvocationId?: string;
  /** If true, the builder claims that running the recipe on materials will produce bit-for-bit identical output. */
  reproducible?: boolean;
  /** The timestamp of when the build completed. */
  buildFinishedOn?: string;
  /** The timestamp of when the build started. */
  buildStartedOn?: string;
  /** Indicates that the builder claims certain fields in this message to be complete. */
  completeness?: SlsaCompleteness;
}

export const SlsaMetadata: Schema.Schema<SlsaMetadata> = Schema.suspend(() =>
  Schema.Struct({
    buildInvocationId: Schema.optional(Schema.String),
    reproducible: Schema.optional(Schema.Boolean),
    buildFinishedOn: Schema.optional(Schema.String),
    buildStartedOn: Schema.optional(Schema.String),
    completeness: Schema.optional(SlsaCompleteness),
  }),
).annotate({
  identifier: "SlsaMetadata",
}) as any as Schema.Schema<SlsaMetadata>;

export interface SlsaProvenance {
  /** Identifies the configuration used for the build. When combined with materials, this SHOULD fully describe the build, such that re-running this recipe results in bit-for-bit identical output (if the build is reproducible). */
  recipe?: SlsaRecipe;
  /** The collection of artifacts that influenced the build including sources, dependencies, build tools, base images, and so on. This is considered to be incomplete unless metadata.completeness.materials is true. Unset or null is equivalent to empty. */
  materials?: Array<Material>;
  /** builder is the builder of this provenance */
  builder?: SlsaBuilder;
  /** metadata is the metadata of the provenance */
  metadata?: SlsaMetadata;
}

export const SlsaProvenance: Schema.Schema<SlsaProvenance> = Schema.suspend(
  () =>
    Schema.Struct({
      recipe: Schema.optional(SlsaRecipe),
      materials: Schema.optional(Schema.Array(Material)),
      builder: Schema.optional(SlsaBuilder),
      metadata: Schema.optional(SlsaMetadata),
    }),
).annotate({
  identifier: "SlsaProvenance",
}) as any as Schema.Schema<SlsaProvenance>;

export interface URI {
  /** A label for the URI. */
  label?: string;
  /** The unique resource identifier. */
  uri?: string;
}

export const URI: Schema.Schema<URI> = Schema.suspend(() =>
  Schema.Struct({
    label: Schema.optional(Schema.String),
    uri: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "URI" }) as any as Schema.Schema<URI>;

export interface Remediation {
  /** Contains the URL where to obtain the remediation. */
  remediationUri?: URI;
  /** Contains a comprehensive human-readable discussion of the remediation. */
  details?: string;
  /** The type of remediation that can be applied. */
  remediationType?:
    | "REMEDIATION_TYPE_UNSPECIFIED"
    | "MITIGATION"
    | "NO_FIX_PLANNED"
    | "NONE_AVAILABLE"
    | "VENDOR_FIX"
    | "WORKAROUND"
    | (string & {});
}

export const Remediation: Schema.Schema<Remediation> = Schema.suspend(() =>
  Schema.Struct({
    remediationUri: Schema.optional(URI),
    details: Schema.optional(Schema.String),
    remediationType: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Remediation" }) as any as Schema.Schema<Remediation>;

export interface StorageSource {
  /** Google Cloud Storage object containing source. */
  object?: string;
  /** Google Cloud Storage generation for the object. */
  generation?: string;
  /** Google Cloud Storage bucket containing source (see [Bucket Name Requirements] (https://cloud.google.com/storage/docs/bucket-naming#requirements)). */
  bucket?: string;
}

export const StorageSource: Schema.Schema<StorageSource> = Schema.suspend(() =>
  Schema.Struct({
    object: Schema.optional(Schema.String),
    generation: Schema.optional(Schema.String),
    bucket: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "StorageSource",
}) as any as Schema.Schema<StorageSource>;

export interface Hash {
  /** The type of hash that was performed. */
  type?: "NONE" | "SHA256" | "GO_MODULE_H1" | "DIRSUM_SHA256" | (string & {});
  /** The hash value. */
  value?: string;
}

export const Hash: Schema.Schema<Hash> = Schema.suspend(() =>
  Schema.Struct({
    type: Schema.optional(Schema.String),
    value: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Hash" }) as any as Schema.Schema<Hash>;

export interface FileHashes {
  /** Collection of file hashes. */
  fileHash?: Array<Hash>;
}

export const FileHashes: Schema.Schema<FileHashes> = Schema.suspend(() =>
  Schema.Struct({
    fileHash: Schema.optional(Schema.Array(Hash)),
  }),
).annotate({ identifier: "FileHashes" }) as any as Schema.Schema<FileHashes>;

export interface RepoSource {
  /** ID of the project that owns the repo. */
  projectId?: string;
  /** Name of the repo. */
  repoName?: string;
  /** Name of the tag to build. */
  tagName?: string;
  /** Name of the branch to build. */
  branchName?: string;
  /** Explicit commit SHA to build. */
  commitSha?: string;
}

export const RepoSource: Schema.Schema<RepoSource> = Schema.suspend(() =>
  Schema.Struct({
    projectId: Schema.optional(Schema.String),
    repoName: Schema.optional(Schema.String),
    tagName: Schema.optional(Schema.String),
    branchName: Schema.optional(Schema.String),
    commitSha: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "RepoSource" }) as any as Schema.Schema<RepoSource>;

export interface GoogleDevtoolsContaineranalysisV1alpha1AliasContext {
  /** The alias name. */
  name?: string;
  /** The alias kind. */
  kind?: "KIND_UNSPECIFIED" | "FIXED" | "MOVABLE" | "OTHER" | (string & {});
}

export const GoogleDevtoolsContaineranalysisV1alpha1AliasContext: Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1AliasContext> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleDevtoolsContaineranalysisV1alpha1AliasContext",
  }) as any as Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1AliasContext>;

export interface GoogleDevtoolsContaineranalysisV1alpha1RepoId {
  /** A combination of a project ID and a repo name. */
  projectRepoId?: GoogleDevtoolsContaineranalysisV1alpha1ProjectRepoId;
  /** A server-assigned, globally unique identifier. */
  uid?: string;
}

export const GoogleDevtoolsContaineranalysisV1alpha1RepoId: Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1RepoId> =
  Schema.suspend(() =>
    Schema.Struct({
      projectRepoId: Schema.optional(
        GoogleDevtoolsContaineranalysisV1alpha1ProjectRepoId,
      ),
      uid: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleDevtoolsContaineranalysisV1alpha1RepoId",
  }) as any as Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1RepoId>;

export interface GoogleDevtoolsContaineranalysisV1alpha1CloudRepoSourceContext {
  /** A revision ID. */
  revisionId?: string;
  /** An alias, which may be a branch or tag. */
  aliasContext?: GoogleDevtoolsContaineranalysisV1alpha1AliasContext;
  /** The ID of the repo. */
  repoId?: GoogleDevtoolsContaineranalysisV1alpha1RepoId;
}

export const GoogleDevtoolsContaineranalysisV1alpha1CloudRepoSourceContext: Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1CloudRepoSourceContext> =
  Schema.suspend(() =>
    Schema.Struct({
      revisionId: Schema.optional(Schema.String),
      aliasContext: Schema.optional(
        GoogleDevtoolsContaineranalysisV1alpha1AliasContext,
      ),
      repoId: Schema.optional(GoogleDevtoolsContaineranalysisV1alpha1RepoId),
    }),
  ).annotate({
    identifier: "GoogleDevtoolsContaineranalysisV1alpha1CloudRepoSourceContext",
  }) as any as Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1CloudRepoSourceContext>;

export interface GoogleDevtoolsContaineranalysisV1alpha1GerritSourceContext {
  /** The URI of a running Gerrit instance. */
  hostUri?: string;
  /** A revision (commit) ID. */
  revisionId?: string;
  /** The full project name within the host. Projects may be nested, so "project/subproject" is a valid project name. The "repo name" is the hostURI/project. */
  gerritProject?: string;
  /** An alias, which may be a branch or tag. */
  aliasContext?: GoogleDevtoolsContaineranalysisV1alpha1AliasContext;
}

export const GoogleDevtoolsContaineranalysisV1alpha1GerritSourceContext: Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1GerritSourceContext> =
  Schema.suspend(() =>
    Schema.Struct({
      hostUri: Schema.optional(Schema.String),
      revisionId: Schema.optional(Schema.String),
      gerritProject: Schema.optional(Schema.String),
      aliasContext: Schema.optional(
        GoogleDevtoolsContaineranalysisV1alpha1AliasContext,
      ),
    }),
  ).annotate({
    identifier: "GoogleDevtoolsContaineranalysisV1alpha1GerritSourceContext",
  }) as any as Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1GerritSourceContext>;

export interface GoogleDevtoolsContaineranalysisV1alpha1GitSourceContext {
  /** Required. Git commit hash. */
  revisionId?: string;
  /** Git repository URL. */
  url?: string;
}

export const GoogleDevtoolsContaineranalysisV1alpha1GitSourceContext: Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1GitSourceContext> =
  Schema.suspend(() =>
    Schema.Struct({
      revisionId: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleDevtoolsContaineranalysisV1alpha1GitSourceContext",
  }) as any as Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1GitSourceContext>;

export interface GoogleDevtoolsContaineranalysisV1alpha1SourceContext {
  /** A SourceContext referring to a revision in a Google Cloud Source Repo. */
  cloudRepo?: GoogleDevtoolsContaineranalysisV1alpha1CloudRepoSourceContext;
  /** Labels with user defined metadata. */
  labels?: Record<string, string>;
  /** A SourceContext referring to a Gerrit project. */
  gerrit?: GoogleDevtoolsContaineranalysisV1alpha1GerritSourceContext;
  /** A SourceContext referring to any third party Git repo (e.g., GitHub). */
  git?: GoogleDevtoolsContaineranalysisV1alpha1GitSourceContext;
}

export const GoogleDevtoolsContaineranalysisV1alpha1SourceContext: Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1SourceContext> =
  Schema.suspend(() =>
    Schema.Struct({
      cloudRepo: Schema.optional(
        GoogleDevtoolsContaineranalysisV1alpha1CloudRepoSourceContext,
      ),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      gerrit: Schema.optional(
        GoogleDevtoolsContaineranalysisV1alpha1GerritSourceContext,
      ),
      git: Schema.optional(
        GoogleDevtoolsContaineranalysisV1alpha1GitSourceContext,
      ),
    }),
  ).annotate({
    identifier: "GoogleDevtoolsContaineranalysisV1alpha1SourceContext",
  }) as any as Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1SourceContext>;

export interface Source {
  /** If provided, get the source from this location in Google Cloud Storage. */
  storageSource?: StorageSource;
  /** Hash(es) of the build source, which can be used to verify that the original source integrity was maintained in the build. The keys to this map are file paths used as build source and the values contain the hash values for those files. If the build source came in a single package such as a gzipped tarfile (.tar.gz), the FileHash will be for the single path to that file. */
  fileHashes?: Record<string, FileHashes>;
  /** If provided, get source from this location in a Cloud Repo. */
  repoSource?: RepoSource;
  /** If provided, the input binary artifacts for the build came from this location. */
  artifactStorageSource?: StorageSource;
  /** If provided, the source code used for the build came from this location. */
  context?: GoogleDevtoolsContaineranalysisV1alpha1SourceContext;
  /** If provided, some of the source code used for the build may be found in these locations, in the case where the source repository had multiple remotes or submodules. This list will not include the context specified in the context field. */
  additionalContexts?: Array<GoogleDevtoolsContaineranalysisV1alpha1SourceContext>;
}

export const Source: Schema.Schema<Source> = Schema.suspend(() =>
  Schema.Struct({
    storageSource: Schema.optional(StorageSource),
    fileHashes: Schema.optional(Schema.Record(Schema.String, FileHashes)),
    repoSource: Schema.optional(RepoSource),
    artifactStorageSource: Schema.optional(StorageSource),
    context: Schema.optional(
      GoogleDevtoolsContaineranalysisV1alpha1SourceContext,
    ),
    additionalContexts: Schema.optional(
      Schema.Array(GoogleDevtoolsContaineranalysisV1alpha1SourceContext),
    ),
  }),
).annotate({ identifier: "Source" }) as any as Schema.Schema<Source>;

export interface CISAKnownExploitedVulnerabilities {
  /** Optional. Whether the vulnerability is known to have been leveraged as part of a ransomware campaign. */
  knownRansomwareCampaignUse?: string;
}

export const CISAKnownExploitedVulnerabilities: Schema.Schema<CISAKnownExploitedVulnerabilities> =
  Schema.suspend(() =>
    Schema.Struct({
      knownRansomwareCampaignUse: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CISAKnownExploitedVulnerabilities",
  }) as any as Schema.Schema<CISAKnownExploitedVulnerabilities>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource {
  /** Required. Name of the Cloud Source Repository. */
  repoName?: string;
  /** Regex matching tags to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax */
  tagName?: string;
  /** Explicit commit SHA to build. */
  commitSha?: string;
  /** Optional. Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution. */
  dir?: string;
  /** Optional. Substitutions to use in a triggered build. Should only be used with RunBuildTrigger */
  substitutions?: Record<string, string>;
  /** Regex matching branches to build. The syntax of the regular expressions accepted is the syntax accepted by RE2 and described at https://github.com/google/re2/wiki/Syntax */
  branchName?: string;
  /** Optional. Only trigger a build if the revision regex does NOT match the revision regex. */
  invertRegex?: boolean;
  /** Optional. ID of the project that owns the Cloud Source Repository. If omitted, the project ID requesting the build is assumed. */
  projectId?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource> =
  Schema.suspend(() =>
    Schema.Struct({
      repoName: Schema.optional(Schema.String),
      tagName: Schema.optional(Schema.String),
      commitSha: Schema.optional(Schema.String),
      dir: Schema.optional(Schema.String),
      substitutions: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      branchName: Schema.optional(Schema.String),
      invertRegex: Schema.optional(Schema.Boolean),
      projectId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1DeveloperConnectConfig {
  /** Required. Directory, relative to the source root, in which to run the build. */
  dir?: string;
  /** Required. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref. */
  revision?: string;
  /** Required. The Developer Connect Git repository link, formatted as `projects/* /locations/* /connections/* /gitRepositoryLink/*`. */
  gitRepositoryLink?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1DeveloperConnectConfig: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1DeveloperConnectConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      dir: Schema.optional(Schema.String),
      revision: Schema.optional(Schema.String),
      gitRepositoryLink: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "ContaineranalysisGoogleDevtoolsCloudbuildV1DeveloperConnectConfig",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1DeveloperConnectConfig>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource {
  /** Required. Location of the Git repo to build. This will be used as a `git remote`, see https://git-scm.com/docs/git-remote. */
  url?: string;
  /** Optional. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref. Cloud Build uses `git fetch` to fetch the revision from the Git repository; therefore make sure that the string you provide for `revision` is parsable by the command. For information on string values accepted by `git fetch`, see https://git-scm.com/docs/gitrevisions#_specifying_revisions. For information on `git fetch`, see https://git-scm.com/docs/git-fetch. */
  revision?: string;
  /** Optional. Directory, relative to the source root, in which to run the build. This must be a relative path. If a step's `dir` is specified and is an absolute path, this value is ignored for that step's execution. */
  dir?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource> =
  Schema.suspend(() =>
    Schema.Struct({
      url: Schema.optional(Schema.String),
      revision: Schema.optional(Schema.String),
      dir: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest {
  /** Required. Cloud Storage object containing the source manifest. This object must be a JSON file. */
  object?: string;
  /** Required. Cloud Storage bucket containing the source manifest (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)). */
  bucket?: string;
  /** Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used. */
  generation?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest> =
  Schema.suspend(() =>
    Schema.Struct({
      object: Schema.optional(Schema.String),
      bucket: Schema.optional(Schema.String),
      generation: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource {
  /** Optional. Cloud Storage generation for the object. If the generation is omitted, the latest generation will be used. */
  generation?: string;
  /** Cloud Storage bucket containing the source (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)). */
  bucket?: string;
  /** Required. Cloud Storage object containing the source. This object must be a zipped (`.zip`) or gzipped archive file (`.tar.gz`) containing source to build. */
  object?: string;
  /** Optional. Option to specify the tool to fetch the source file for the build. */
  sourceFetcher?:
    | "SOURCE_FETCHER_UNSPECIFIED"
    | "GSUTIL"
    | "GCS_FETCHER"
    | (string & {});
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource> =
  Schema.suspend(() =>
    Schema.Struct({
      generation: Schema.optional(Schema.String),
      bucket: Schema.optional(Schema.String),
      object: Schema.optional(Schema.String),
      sourceFetcher: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository {
  /** Required. Name of the Google Cloud Build repository, formatted as `projects/* /locations/* /connections/* /repositories/*`. */
  repository?: string;
  /** Required. The revision to fetch from the Git repository such as a branch, a tag, a commit SHA, or any Git ref. */
  revision?: string;
  /** Optional. Directory, relative to the source root, in which to run the build. */
  dir?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository> =
  Schema.suspend(() =>
    Schema.Struct({
      repository: Schema.optional(Schema.String),
      revision: Schema.optional(Schema.String),
      dir: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Source {
  /** If provided, get the source from this location in a Cloud Source Repository. */
  repoSource?: ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource;
  /** If provided, get the source from this Developer Connect config. */
  developerConnectConfig?: ContaineranalysisGoogleDevtoolsCloudbuildV1DeveloperConnectConfig;
  /** If provided, get the source from this Git repository. */
  gitSource?: ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource;
  /** If provided, get the source from this manifest in Cloud Storage. This feature is in Preview; see description [here](https://github.com/GoogleCloudPlatform/cloud-builders/tree/master/gcs-fetcher). */
  storageSourceManifest?: ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest;
  /** If provided, get the source from this location in Cloud Storage. */
  storageSource?: ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource;
  /** Optional. If provided, get the source from this 2nd-gen Google Cloud Build repository resource. */
  connectedRepository?: ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1Source: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Source> =
  Schema.suspend(() =>
    Schema.Struct({
      repoSource: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource,
      ),
      developerConnectConfig: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1DeveloperConnectConfig,
      ),
      gitSource: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource,
      ),
      storageSourceManifest: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest,
      ),
      storageSource: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource,
      ),
      connectedRepository: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository,
      ),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1Source",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Source>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1BuiltImage {
  /** Name used to push the container image to Google Container Registry, as presented to `docker push`. */
  name?: string;
  /** Output only. Stores timing information for pushing the specified image. */
  pushTiming?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
  /** Output only. Path to the artifact in Artifact Registry. */
  artifactRegistryPackage?: string;
  /** Docker Registry 2.0 digest. */
  digest?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1BuiltImage: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuiltImage> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      pushTiming: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan,
      ),
      artifactRegistryPackage: Schema.optional(Schema.String),
      digest: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1BuiltImage",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuiltImage>;

export interface GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaCompleteness {
  /** If true, the builder claims that invocation.environment is complete. */
  environment?: boolean;
  /** If true, the builder claims that invocation.parameters is complete. */
  parameters?: boolean;
  /** If true, the builder claims that materials is complete. */
  materials?: boolean;
}

export const GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaCompleteness: Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaCompleteness> =
  Schema.suspend(() =>
    Schema.Struct({
      environment: Schema.optional(Schema.Boolean),
      parameters: Schema.optional(Schema.Boolean),
      materials: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier:
      "GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaCompleteness",
  }) as any as Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaCompleteness>;

export interface GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaMetadata {
  /** If true, the builder claims that running invocation on materials will produce bit-for-bit identical output. */
  reproducible?: boolean;
  /** The timestamp of when the build started. */
  buildStartedOn?: string;
  /** The timestamp of when the build completed. */
  buildFinishedOn?: string;
  /** Indicates that the builder claims certain fields in this message to be complete. */
  completeness?: GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaCompleteness;
  /** Identifies this particular build invocation, which can be useful for finding associated logs or other ad-hoc analysis. */
  buildInvocationId?: string;
}

export const GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaMetadata: Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      reproducible: Schema.optional(Schema.Boolean),
      buildStartedOn: Schema.optional(Schema.String),
      buildFinishedOn: Schema.optional(Schema.String),
      completeness: Schema.optional(
        GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaCompleteness,
      ),
      buildInvocationId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaMetadata",
  }) as any as Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaMetadata>;

export interface Justification {
  /** Additional details on why this justification was chosen. */
  details?: string;
  /** The justification type for this vulnerability. */
  justificationType?:
    | "JUSTIFICATION_TYPE_UNSPECIFIED"
    | "COMPONENT_NOT_PRESENT"
    | "VULNERABLE_CODE_NOT_PRESENT"
    | "VULNERABLE_CODE_NOT_IN_EXECUTE_PATH"
    | "VULNERABLE_CODE_CANNOT_BE_CONTROLLED_BY_ADVERSARY"
    | "INLINE_MITIGATIONS_ALREADY_EXIST"
    | (string & {});
}

export const Justification: Schema.Schema<Justification> = Schema.suspend(() =>
  Schema.Struct({
    details: Schema.optional(Schema.String),
    justificationType: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "Justification",
}) as any as Schema.Schema<Justification>;

export interface UpgradeDistribution {
  /** The severity as specified by the upstream operating system. */
  severity?: string;
  /** Required - The specific operating system this metadata applies to. See https://cpe.mitre.org/specification/. */
  cpeUri?: string;
  /** The operating system classification of this Upgrade, as specified by the upstream operating system upgrade feed. */
  classification?: string;
  /** The cve that would be resolved by this upgrade. */
  cve?: Array<string>;
}

export const UpgradeDistribution: Schema.Schema<UpgradeDistribution> =
  Schema.suspend(() =>
    Schema.Struct({
      severity: Schema.optional(Schema.String),
      cpeUri: Schema.optional(Schema.String),
      classification: Schema.optional(Schema.String),
      cve: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "UpgradeDistribution",
  }) as any as Schema.Schema<UpgradeDistribution>;

export interface Version {
  /** The iteration of the package build from the above version. */
  revision?: string;
  /** Whether this version is vulnerable, when defining the version bounds. For example, if the minimum version is 2.0, inclusive=true would say 2.0 is vulnerable, while inclusive=false would say it's not */
  inclusive?: boolean;
  /** Used to correct mistakes in the version numbering scheme. */
  epoch?: number;
  /** The main part of the version name. */
  name?: string;
  /** Distinguish between sentinel MIN/MAX versions and normal versions. If kind is not NORMAL, then the other fields are ignored. */
  kind?: "NORMAL" | "MINIMUM" | "MAXIMUM" | (string & {});
}

export const Version: Schema.Schema<Version> = Schema.suspend(() =>
  Schema.Struct({
    revision: Schema.optional(Schema.String),
    inclusive: Schema.optional(Schema.Boolean),
    epoch: Schema.optional(Schema.Number),
    name: Schema.optional(Schema.String),
    kind: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Version" }) as any as Schema.Schema<Version>;

export interface UpgradeOccurrence {
  /** Metadata about the upgrade for available for the specific operating system for the resource_url. This allows efficient filtering, as well as making it easier to use the occurrence. */
  distribution?: UpgradeDistribution;
  /** Required - The package this Upgrade is for. */
  package?: string;
  /** Required - The version of the package in a machine + human readable form. */
  parsedVersion?: Version;
}

export const UpgradeOccurrence: Schema.Schema<UpgradeOccurrence> =
  Schema.suspend(() =>
    Schema.Struct({
      distribution: Schema.optional(UpgradeDistribution),
      package: Schema.optional(Schema.String),
      parsedVersion: Schema.optional(Version),
    }),
  ).annotate({
    identifier: "UpgradeOccurrence",
  }) as any as Schema.Schema<UpgradeOccurrence>;

export interface Layer {
  /** The recovered Dockerfile directive used to construct this layer. */
  directive?:
    | "DIRECTIVE_UNSPECIFIED"
    | "MAINTAINER"
    | "RUN"
    | "CMD"
    | "LABEL"
    | "EXPOSE"
    | "ENV"
    | "ADD"
    | "COPY"
    | "ENTRYPOINT"
    | "VOLUME"
    | "USER"
    | "WORKDIR"
    | "ARG"
    | "ONBUILD"
    | "STOPSIGNAL"
    | "HEALTHCHECK"
    | "SHELL"
    | (string & {});
  /** The recovered arguments to the Dockerfile directive. */
  arguments?: string;
}

export const Layer: Schema.Schema<Layer> = Schema.suspend(() =>
  Schema.Struct({
    directive: Schema.optional(Schema.String),
    arguments: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Layer" }) as any as Schema.Schema<Layer>;

export interface Fingerprint {
  /** Output only. The name of the image's v2 blobs computed via: [bottom] := v2_blobbottom := sha256(v2_blob[N] + " " + v2_name[N+1]) Only the name of the final blob is kept. This field can be used as a filter in list requests. */
  v2Name?: string;
  /** The ordered list of v2 blobs that represent a given image. */
  v2Blob?: Array<string>;
  /** The layer-id of the final layer in the Docker image's v1 representation. This field can be used as a filter in list requests. */
  v1Name?: string;
}

export const Fingerprint: Schema.Schema<Fingerprint> = Schema.suspend(() =>
  Schema.Struct({
    v2Name: Schema.optional(Schema.String),
    v2Blob: Schema.optional(Schema.Array(Schema.String)),
    v1Name: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Fingerprint" }) as any as Schema.Schema<Fingerprint>;

export interface Derived {
  /** Output only. This contains the base image URL for the derived image occurrence. */
  baseResourceUrl?: string;
  /** This contains layer-specific metadata, if populated it has length "distance" and is ordered with [distance] being the layer immediately following the base image and [1] being the final layer. */
  layerInfo?: Array<Layer>;
  /** The fingerprint of the derived image. */
  fingerprint?: Fingerprint;
  /** Output only. The number of layers by which this image differs from the associated image basis. */
  distance?: number;
}

export const Derived: Schema.Schema<Derived> = Schema.suspend(() =>
  Schema.Struct({
    baseResourceUrl: Schema.optional(Schema.String),
    layerInfo: Schema.optional(Schema.Array(Layer)),
    fingerprint: Schema.optional(Fingerprint),
    distance: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "Derived" }) as any as Schema.Schema<Derived>;

export interface Volume {
  /** Path at which to mount the volume. Paths must be absolute and cannot conflict with other volume paths on the same build step or with certain reserved volume paths. */
  path?: string;
  /** Name of the volume to mount. Volume names must be unique per build step and must be valid names for Docker volumes. Each named volume must be used by at least two build steps. */
  name?: string;
}

export const Volume: Schema.Schema<Volume> = Schema.suspend(() =>
  Schema.Struct({
    path: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Volume" }) as any as Schema.Schema<Volume>;

export interface TimeSpan {
  /** End of time span. */
  endTime?: string;
  /** Start of time span. */
  startTime?: string;
}

export const TimeSpan: Schema.Schema<TimeSpan> = Schema.suspend(() =>
  Schema.Struct({
    endTime: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "TimeSpan" }) as any as Schema.Schema<TimeSpan>;

export interface StepResult {
  name?: string;
  attestationContentName?: string;
  attestationType?: string;
}

export const StepResult: Schema.Schema<StepResult> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    attestationContentName: Schema.optional(Schema.String),
    attestationType: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "StepResult" }) as any as Schema.Schema<StepResult>;

export interface BuildStep {
  /** Working directory to use when running this step's container. If this value is a relative path, it is relative to the build's working directory. If this value is absolute, it may be outside the build's working directory, in which case the contents of the path may not be persisted across build step executions, unless a `volume` for that path is specified. If the build specifies a `RepoSource` with `dir` and a step with a `dir`, which specifies an absolute path, the `RepoSource` `dir` is ignored for the step's execution. */
  dir?: string;
  /** List of volumes to mount into the build step. Each volume is created as an empty volume prior to execution of the build step. Upon completion of the build, volumes and their contents are discarded. Using a named volume in only one step is not valid as it is indicative of a build request with an incorrect configuration. */
  volumes?: Array<Volume>;
  /** Option to include built-in and custom substitutions as env variables for this build step. This option will override the global option in BuildOption. */
  automapSubstitutions?: boolean;
  /** A list of arguments that will be presented to the step when it is started. If the image used to run the step's container has an entrypoint, the `args` are used as arguments to that entrypoint. If the image does not define an entrypoint, the first element in args is used as the entrypoint, and the remainder will be used as arguments. */
  args?: Array<string>;
  /** Output only. Stores timing information for pulling this build step's builder image only. */
  pullTiming?: TimeSpan;
  results?: Array<StepResult>;
  /** The ID(s) of the step(s) that this build step depends on. This build step will not start until all the build steps in `wait_for` have completed successfully. If `wait_for` is empty, this build step will start when all previous build steps in the `Build.Steps` list have completed successfully. */
  waitFor?: Array<string>;
  /** Output only. Stores timing information for executing this build step. */
  timing?: TimeSpan;
  /** Time limit for executing this build step. If not defined, the step has no time limit and will be allowed to continue to run until either it completes or the build itself times out. */
  timeout?: string;
  /** A list of environment variables which are encrypted using a Cloud Key Management Service crypto key. These values must be specified in the build's `Secret`. */
  secretEnv?: Array<string>;
  /** Entrypoint to be used instead of the build step image's default entrypoint. If unset, the image's default entrypoint is used. */
  entrypoint?: string;
  /** Output only. Return code from running the step. */
  exitCode?: number;
  /** A shell script to be executed in the step. When script is provided, the user cannot specify the entrypoint or args. */
  script?: string;
  /** Allow this build step to fail without failing the entire build if and only if the exit code is one of the specified codes. If allow_failure is also specified, this field will take precedence. */
  allowExitCodes?: Array<number>;
  /** Required. The name of the container image that will run this particular build step. If the image is available in the host's Docker daemon's cache, it will be run directly. If not, the host will attempt to pull the image first, using the builder service account's credentials if necessary. The Docker daemon's cache will already have the latest versions of all of the officially supported build steps ([https://github.com/GoogleCloudPlatform/cloud-builders](https://github.com/GoogleCloudPlatform/cloud-builders)). The Docker daemon will also have cached many of the layers for some popular images, like "ubuntu", "debian", but they will be refreshed at the time you attempt to use them. If you built an image in a previous build step, it will be stored in the host's Docker daemon's cache and is available to use as the name for a later build step. */
  name?: string;
  /** A list of environment variable definitions to be used when running a step. The elements are of the form "KEY=VALUE" for the environment variable "KEY" being given the value "VALUE". */
  env?: Array<string>;
  /** Output only. Status of the build step. At this time, build step status is only updated on build completion; step status is not updated in real-time as the build progresses. */
  status?:
    | "STATUS_UNKNOWN"
    | "PENDING"
    | "QUEUING"
    | "QUEUED"
    | "WORKING"
    | "SUCCESS"
    | "FAILURE"
    | "INTERNAL_ERROR"
    | "TIMEOUT"
    | "CANCELLED"
    | "EXPIRED"
    | (string & {});
  /** Unique identifier for this build step, used in `wait_for` to reference this build step as a dependency. */
  id?: string;
  /** Remote configuration for the build step. */
  remoteConfig?: string;
  /** Allow this build step to fail without failing the entire build. If false, the entire build will fail if this step fails. Otherwise, the build will succeed, but this step will still have a failure status. Error information will be reported in the failure_detail field. */
  allowFailure?: boolean;
}

export const BuildStep: Schema.Schema<BuildStep> = Schema.suspend(() =>
  Schema.Struct({
    dir: Schema.optional(Schema.String),
    volumes: Schema.optional(Schema.Array(Volume)),
    automapSubstitutions: Schema.optional(Schema.Boolean),
    args: Schema.optional(Schema.Array(Schema.String)),
    pullTiming: Schema.optional(TimeSpan),
    results: Schema.optional(Schema.Array(StepResult)),
    waitFor: Schema.optional(Schema.Array(Schema.String)),
    timing: Schema.optional(TimeSpan),
    timeout: Schema.optional(Schema.String),
    secretEnv: Schema.optional(Schema.Array(Schema.String)),
    entrypoint: Schema.optional(Schema.String),
    exitCode: Schema.optional(Schema.Number),
    script: Schema.optional(Schema.String),
    allowExitCodes: Schema.optional(Schema.Array(Schema.Number)),
    name: Schema.optional(Schema.String),
    env: Schema.optional(Schema.Array(Schema.String)),
    status: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    remoteConfig: Schema.optional(Schema.String),
    allowFailure: Schema.optional(Schema.Boolean),
  }),
).annotate({ identifier: "BuildStep" }) as any as Schema.Schema<BuildStep>;

export interface RelationshipNote {
  /** The type of relationship between the source and target SPDX elements */
  type?:
    | "RELATIONSHIP_TYPE_UNSPECIFIED"
    | "DESCRIBES"
    | "DESCRIBED_BY"
    | "CONTAINS"
    | "CONTAINED_BY"
    | "DEPENDS_ON"
    | "DEPENDENCY_OF"
    | "DEPENDENCY_MANIFEST_OF"
    | "BUILD_DEPENDENCY_OF"
    | "DEV_DEPENDENCY_OF"
    | "OPTIONAL_DEPENDENCY_OF"
    | "PROVIDED_DEPENDENCY_OF"
    | "TEST_DEPENDENCY_OF"
    | "RUNTIME_DEPENDENCY_OF"
    | "EXAMPLE_OF"
    | "GENERATES"
    | "GENERATED_FROM"
    | "ANCESTOR_OF"
    | "DESCENDANT_OF"
    | "VARIANT_OF"
    | "DISTRIBUTION_ARTIFACT"
    | "PATCH_FOR"
    | "PATCH_APPLIED"
    | "COPY_OF"
    | "FILE_ADDED"
    | "FILE_DELETED"
    | "FILE_MODIFIED"
    | "EXPANDED_FROM_ARCHIVE"
    | "DYNAMIC_LINK"
    | "STATIC_LINK"
    | "DATA_FILE_OF"
    | "TEST_CASE_OF"
    | "BUILD_TOOL_OF"
    | "DEV_TOOL_OF"
    | "TEST_OF"
    | "TEST_TOOL_OF"
    | "DOCUMENTATION_OF"
    | "OPTIONAL_COMPONENT_OF"
    | "METAFILE_OF"
    | "PACKAGE_OF"
    | "AMENDS"
    | "PREREQUISITE_FOR"
    | "HAS_PREREQUISITE"
    | "OTHER"
    | (string & {});
}

export const RelationshipNote: Schema.Schema<RelationshipNote> = Schema.suspend(
  () =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "RelationshipNote",
}) as any as Schema.Schema<RelationshipNote>;

export interface GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaMaterial {
  /** Collection of cryptographic digests for the contents of this artifact. */
  digest?: Record<string, string>;
  /** The method by which this artifact was referenced during the build. */
  uri?: string;
}

export const GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaMaterial: Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaMaterial> =
  Schema.suspend(() =>
    Schema.Struct({
      digest: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      uri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaMaterial",
  }) as any as Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaMaterial>;

export interface PgpSignedAttestation {
  /** Type (for example schema) of the attestation payload that was signed. The verifier must ensure that the provided type is one that the verifier supports, and that the attestation payload is a valid instantiation of that type (for example by validating a JSON schema). */
  contentType?:
    | "CONTENT_TYPE_UNSPECIFIED"
    | "SIMPLE_SIGNING_JSON"
    | (string & {});
  /** The cryptographic fingerprint of the key used to generate the signature, as output by, e.g. `gpg --list-keys`. This should be the version 4, full 160-bit fingerprint, expressed as a 40 character hexadecimal string. See https://tools.ietf.org/html/rfc4880#section-12.2 for details. Implementations may choose to acknowledge "LONG", "SHORT", or other abbreviated key IDs, but only the full fingerprint is guaranteed to work. In gpg, the full fingerprint can be retrieved from the `fpr` field returned when calling --list-keys with --with-colons. For example: ``` gpg --with-colons --with-fingerprint --force-v4-certs \ --list-keys attester@example.com tru::1:1513631572:0:3:1:5 pub:...... fpr:::::::::24FF6481B76AC91E66A00AC657A93A81EF3AE6FB: ``` Above, the fingerprint is `24FF6481B76AC91E66A00AC657A93A81EF3AE6FB`. */
  pgpKeyId?: string;
  /** The raw content of the signature, as output by GNU Privacy Guard (GPG) or equivalent. Since this message only supports attached signatures, the payload that was signed must be attached. While the signature format supported is dependent on the verification implementation, currently only ASCII-armored (`--armor` to gpg), non-clearsigned (`--sign` rather than `--clearsign` to gpg) are supported. Concretely, `gpg --sign --armor --output=signature.gpg payload.json` will create the signature content expected in this field in `signature.gpg` for the `payload.json` attestation payload. */
  signature?: string;
}

export const PgpSignedAttestation: Schema.Schema<PgpSignedAttestation> =
  Schema.suspend(() =>
    Schema.Struct({
      contentType: Schema.optional(Schema.String),
      pgpKeyId: Schema.optional(Schema.String),
      signature: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PgpSignedAttestation",
  }) as any as Schema.Schema<PgpSignedAttestation>;

export interface Location {
  /** Deprecated. The version installed at this location. */
  version?: Version;
  /** Deprecated. The cpe_uri in [cpe format](https://cpe.mitre.org/specification/) denoting the package manager version distributing a package. */
  cpeUri?: string;
  /** The path from which we gathered that this package/version is installed. */
  path?: string;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() =>
  Schema.Struct({
    version: Schema.optional(Version),
    cpeUri: Schema.optional(Schema.String),
    path: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface Publisher {
  /** Name of the publisher. Examples: 'Google', 'Google Cloud Platform'. */
  name?: string;
  /** The context or namespace. Contains a URL which is under control of the issuing party and can be used as a globally unique identifier for that issuing party. Example: https://csaf.io */
  publisherNamespace?: string;
  /** Provides information about the authority of the issuing party to release the document, in particular, the party's constituency and responsibilities or other obligations. */
  issuingAuthority?: string;
}

export const Publisher: Schema.Schema<Publisher> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    publisherNamespace: Schema.optional(Schema.String),
    issuingAuthority: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Publisher" }) as any as Schema.Schema<Publisher>;

export interface GetPolicyOptions {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  requestedPolicyVersion?: number;
}

export const GetPolicyOptions: Schema.Schema<GetPolicyOptions> = Schema.suspend(
  () =>
    Schema.Struct({
      requestedPolicyVersion: Schema.optional(Schema.Number),
    }),
).annotate({
  identifier: "GetPolicyOptions",
}) as any as Schema.Schema<GetPolicyOptions>;

export interface GetIamPolicyRequest {
  /** OPTIONAL: A `GetPolicyOptions` object for specifying options to `GetIamPolicy`. */
  options?: GetPolicyOptions;
}

export const GetIamPolicyRequest: Schema.Schema<GetIamPolicyRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      options: Schema.optional(GetPolicyOptions),
    }),
  ).annotate({
    identifier: "GetIamPolicyRequest",
  }) as any as Schema.Schema<GetIamPolicyRequest>;

export interface PackageInfoOccurrence {
  /** Output only. A short description of the package */
  summaryDescription?: string;
  /** A place for the SPDX file creator to record any general comments about the package being described */
  comment?: string;
  /** Output only. Identify the full name of the package as given by the Package Originator */
  title?: string;
  /** Uniquely identify any element in an SPDX document which may be referenced by other elements */
  id?: string;
  /** Output only. Provide a place for the SPDX file creator to record a web site that serves as the package's home page */
  homePage?: string;
  /** package or alternative values, if the governing license cannot be determined */
  licenseConcluded?: License;
  /** Output only. Identify the version of the package */
  version?: string;
  /** Provide a place for the SPDX file creator to record any relevant background information or additional comments about the origin of the package */
  sourceInfo?: string;
  /** Output only. The type of package: OS, MAVEN, GO, GO_STDLIB, etc. */
  packageType?: string;
  /** Provide the actual file name of the package, or path of the directory being treated as a package */
  filename?: string;
}

export const PackageInfoOccurrence: Schema.Schema<PackageInfoOccurrence> =
  Schema.suspend(() =>
    Schema.Struct({
      summaryDescription: Schema.optional(Schema.String),
      comment: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      homePage: Schema.optional(Schema.String),
      licenseConcluded: Schema.optional(License),
      version: Schema.optional(Schema.String),
      sourceInfo: Schema.optional(Schema.String),
      packageType: Schema.optional(Schema.String),
      filename: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PackageInfoOccurrence",
  }) as any as Schema.Schema<PackageInfoOccurrence>;

export interface NonCompliantFile {
  /** Explains why a file is non compliant for a CIS check. */
  reason?: string;
  /** display_command is a single command that can be used to display a list of non compliant files. When there is no such command, we can also iterate a list of non compliant file using 'path'. Empty if `display_command` is set. */
  path?: string;
  /** Command to display the non-compliant files. */
  displayCommand?: string;
}

export const NonCompliantFile: Schema.Schema<NonCompliantFile> = Schema.suspend(
  () =>
    Schema.Struct({
      reason: Schema.optional(Schema.String),
      path: Schema.optional(Schema.String),
      displayCommand: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "NonCompliantFile",
}) as any as Schema.Schema<NonCompliantFile>;

export interface ResourceDescriptor {
  annotations?: Record<string, unknown>;
  digest?: Record<string, string>;
  name?: string;
  content?: string;
  downloadLocation?: string;
  mediaType?: string;
  uri?: string;
}

export const ResourceDescriptor: Schema.Schema<ResourceDescriptor> =
  Schema.suspend(() =>
    Schema.Struct({
      annotations: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      digest: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      name: Schema.optional(Schema.String),
      content: Schema.optional(Schema.String),
      downloadLocation: Schema.optional(Schema.String),
      mediaType: Schema.optional(Schema.String),
      uri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ResourceDescriptor",
  }) as any as Schema.Schema<ResourceDescriptor>;

export interface CisBenchmark {
  /** The severity level of this CIS benchmark check. */
  severity?:
    | "SEVERITY_UNSPECIFIED"
    | "MINIMAL"
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "CRITICAL"
    | (string & {});
  /** The profile level of this CIS benchmark check. */
  profileLevel?: number;
}

export const CisBenchmark: Schema.Schema<CisBenchmark> = Schema.suspend(() =>
  Schema.Struct({
    severity: Schema.optional(Schema.String),
    profileLevel: Schema.optional(Schema.Number),
  }),
).annotate({
  identifier: "CisBenchmark",
}) as any as Schema.Schema<CisBenchmark>;

export interface BaseImage {
  /** The repository name in which the base image is from. */
  repository?: string;
  /** The name of the base image. */
  name?: string;
  /** The registry of the base image. */
  registry?: string;
  /** The number of layers that the base image is composed of. */
  layerCount?: number;
}

export const BaseImage: Schema.Schema<BaseImage> = Schema.suspend(() =>
  Schema.Struct({
    repository: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    registry: Schema.optional(Schema.String),
    layerCount: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "BaseImage" }) as any as Schema.Schema<BaseImage>;

export interface LayerDetails {
  /** The index of the layer in the container image. */
  index?: number;
  /** The base images the layer is found within. */
  baseImages?: Array<BaseImage>;
  /** The diff ID (sha256 hash) of the layer in the container image. */
  diffId?: string;
  /** The layer build command that was used to build the layer. This may not be found in all layers depending on how the container image is built. */
  command?: string;
  /** The chain ID of the layer in the container image. */
  chainId?: string;
}

export const LayerDetails: Schema.Schema<LayerDetails> = Schema.suspend(() =>
  Schema.Struct({
    index: Schema.optional(Schema.Number),
    baseImages: Schema.optional(Schema.Array(BaseImage)),
    diffId: Schema.optional(Schema.String),
    command: Schema.optional(Schema.String),
    chainId: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "LayerDetails",
}) as any as Schema.Schema<LayerDetails>;

export interface FileLocation {
  /** Each package found in a file should have its own layer metadata (that is, information from the origin layer of the package). */
  layerDetails?: LayerDetails;
  /** For jars that are contained inside .war files, this filepath can indicate the path to war file combined with the path to jar file. */
  filePath?: string;
}

export const FileLocation: Schema.Schema<FileLocation> = Schema.suspend(() =>
  Schema.Struct({
    layerDetails: Schema.optional(LayerDetails),
    filePath: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "FileLocation",
}) as any as Schema.Schema<FileLocation>;

export interface SecretLocation {
  /** The secret is found from a file. */
  fileLocation?: FileLocation;
}

export const SecretLocation: Schema.Schema<SecretLocation> = Schema.suspend(
  () =>
    Schema.Struct({
      fileLocation: Schema.optional(FileLocation),
    }),
).annotate({
  identifier: "SecretLocation",
}) as any as Schema.Schema<SecretLocation>;

export interface Command {
  /** Working directory (relative to project source root) used when running this Command. */
  dir?: string;
  /** Optional unique identifier for this Command, used in wait_for to reference this Command as a dependency. */
  id?: string;
  /** Name of the command, as presented on the command line, or if the command is packaged as a Docker container, as presented to `docker pull`. */
  name?: string;
  /** Command-line arguments used when executing this Command. */
  args?: Array<string>;
  /** Environment variables set before running this Command. */
  env?: Array<string>;
  /** The ID(s) of the Command(s) that this Command depends on. */
  waitFor?: Array<string>;
}

export const Command: Schema.Schema<Command> = Schema.suspend(() =>
  Schema.Struct({
    dir: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    args: Schema.optional(Schema.Array(Schema.String)),
    env: Schema.optional(Schema.Array(Schema.String)),
    waitFor: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({ identifier: "Command" }) as any as Schema.Schema<Command>;

export interface GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaConfigSource {
  /** String identifying the entry point into the build. */
  entryPoint?: string;
  /** URI indicating the identity of the source of the config. */
  uri?: string;
  /** Collection of cryptographic digests for the contents of the artifact specified by invocation.configSource.uri. */
  digest?: Record<string, string>;
}

export const GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaConfigSource: Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaConfigSource> =
  Schema.suspend(() =>
    Schema.Struct({
      entryPoint: Schema.optional(Schema.String),
      uri: Schema.optional(Schema.String),
      digest: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier:
      "GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaConfigSource",
  }) as any as Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaConfigSource>;

export interface Subject {
  /** name is the name of the Subject used here */
  name?: string;
  /** "": "" Algorithms can be e.g. sha256, sha512 See https://github.com/in-toto/attestation/blob/main/spec/v1/digest_set.md. */
  digest?: Record<string, string>;
}

export const Subject: Schema.Schema<Subject> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    digest: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  }),
).annotate({ identifier: "Subject" }) as any as Schema.Schema<Subject>;

export interface BuildDefinition {
  internalParameters?: Record<string, unknown>;
  externalParameters?: Record<string, unknown>;
  buildType?: string;
  resolvedDependencies?: Array<ResourceDescriptor>;
}

export const BuildDefinition: Schema.Schema<BuildDefinition> = Schema.suspend(
  () =>
    Schema.Struct({
      internalParameters: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      externalParameters: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      buildType: Schema.optional(Schema.String),
      resolvedDependencies: Schema.optional(Schema.Array(ResourceDescriptor)),
    }),
).annotate({
  identifier: "BuildDefinition",
}) as any as Schema.Schema<BuildDefinition>;

export interface ProvenanceBuilder {
  id?: string;
  builderDependencies?: Array<ResourceDescriptor>;
  version?: Record<string, string>;
}

export const ProvenanceBuilder: Schema.Schema<ProvenanceBuilder> =
  Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      builderDependencies: Schema.optional(Schema.Array(ResourceDescriptor)),
      version: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "ProvenanceBuilder",
  }) as any as Schema.Schema<ProvenanceBuilder>;

export interface BuildMetadata {
  startedOn?: string;
  invocationId?: string;
  finishedOn?: string;
}

export const BuildMetadata: Schema.Schema<BuildMetadata> = Schema.suspend(() =>
  Schema.Struct({
    startedOn: Schema.optional(Schema.String),
    invocationId: Schema.optional(Schema.String),
    finishedOn: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "BuildMetadata",
}) as any as Schema.Schema<BuildMetadata>;

export interface RunDetails {
  builder?: ProvenanceBuilder;
  metadata?: BuildMetadata;
  byproducts?: Array<ResourceDescriptor>;
}

export const RunDetails: Schema.Schema<RunDetails> = Schema.suspend(() =>
  Schema.Struct({
    builder: Schema.optional(ProvenanceBuilder),
    metadata: Schema.optional(BuildMetadata),
    byproducts: Schema.optional(Schema.Array(ResourceDescriptor)),
  }),
).annotate({ identifier: "RunDetails" }) as any as Schema.Schema<RunDetails>;

export interface SlsaProvenanceV1 {
  buildDefinition?: BuildDefinition;
  runDetails?: RunDetails;
}

export const SlsaProvenanceV1: Schema.Schema<SlsaProvenanceV1> = Schema.suspend(
  () =>
    Schema.Struct({
      buildDefinition: Schema.optional(BuildDefinition),
      runDetails: Schema.optional(RunDetails),
    }),
).annotate({
  identifier: "SlsaProvenanceV1",
}) as any as Schema.Schema<SlsaProvenanceV1>;

export interface InTotoSlsaProvenanceV1 {
  subject?: Array<Subject>;
  /** InToto spec defined at https://github.com/in-toto/attestation/tree/main/spec#statement */
  _type?: string;
  predicate?: SlsaProvenanceV1;
  predicateType?: string;
}

export const InTotoSlsaProvenanceV1: Schema.Schema<InTotoSlsaProvenanceV1> =
  Schema.suspend(() =>
    Schema.Struct({
      subject: Schema.optional(Schema.Array(Subject)),
      _type: Schema.optional(Schema.String),
      predicate: Schema.optional(SlsaProvenanceV1),
      predicateType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "InTotoSlsaProvenanceV1",
  }) as any as Schema.Schema<InTotoSlsaProvenanceV1>;

export interface Expr {
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() =>
  Schema.Struct({
    location: Schema.optional(Schema.String),
    title: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    expression: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() =>
  Schema.Struct({
    condition: Schema.optional(Expr),
    role: Schema.optional(Schema.String),
    members: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface Policy {
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() =>
  Schema.Struct({
    bindings: Schema.optional(Schema.Array(Binding)),
    etag: Schema.optional(Schema.String),
    version: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      policy: Schema.optional(Policy),
    }),
  ).annotate({
    identifier: "SetIamPolicyRequest",
  }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface ExploitPredictionScoringSystem {
  /** Optional. The percentile of the current score, the proportion of all scored vulnerabilities with the same or a lower EPSS score */
  percentile?: number;
  /** Optional. The EPSS score representing the probability [0-1] of exploitation in the wild in the next 30 days */
  score?: number;
}

export const ExploitPredictionScoringSystem: Schema.Schema<ExploitPredictionScoringSystem> =
  Schema.suspend(() =>
    Schema.Struct({
      percentile: Schema.optional(Schema.Number),
      score: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "ExploitPredictionScoringSystem",
  }) as any as Schema.Schema<ExploitPredictionScoringSystem>;

export interface Risk {
  /** Optional. The Exploit Prediction Scoring System (EPSS) estimates the likelihood (probability) that a software vulnerability will be exploited in the wild. */
  epss?: ExploitPredictionScoringSystem;
  /** Optional. CISA maintains the authoritative source of vulnerabilities that have been exploited in the wild. */
  cisaKev?: CISAKnownExploitedVulnerabilities;
}

export const Risk: Schema.Schema<Risk> = Schema.suspend(() =>
  Schema.Struct({
    epss: Schema.optional(ExploitPredictionScoringSystem),
    cisaKev: Schema.optional(CISAKnownExploitedVulnerabilities),
  }),
).annotate({ identifier: "Risk" }) as any as Schema.Schema<Risk>;

export interface RelatedUrl {
  /** Label to describe usage of the URL */
  label?: string;
  /** Specific URL to associate with the note */
  url?: string;
}

export const RelatedUrl: Schema.Schema<RelatedUrl> = Schema.suspend(() =>
  Schema.Struct({
    label: Schema.optional(Schema.String),
    url: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "RelatedUrl" }) as any as Schema.Schema<RelatedUrl>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Hash {
  /** The type of hash that was performed. */
  type?: "NONE" | "SHA256" | "MD5" | "GO_MODULE_H1" | "SHA512" | (string & {});
  /** The hash value. */
  value?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1Hash: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Hash> =
  Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1Hash",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Hash>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes {
  /** Collection of file hashes. */
  fileHash?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1Hash>;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes> =
  Schema.suspend(() =>
    Schema.Struct({
      fileHash: Schema.optional(
        Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1Hash),
      ),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance {
  /** Output only. Hash(es) of the build source, which can be used to verify that the original source integrity was maintained in the build. Note that `FileHashes` will only be populated if `BuildOptions` has requested a `SourceProvenanceHash`. The keys to this map are file paths used as build source and the values contain the hash values for those files. If the build source came in a single package such as a gzipped tarfile (`.tar.gz`), the `FileHash` will be for the single path to that file. */
  fileHashes?: Record<
    string,
    ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes
  >;
  /** A copy of the build's `source.repo_source`, if exists, with any revisions resolved. */
  resolvedRepoSource?: ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource;
  /** Output only. A copy of the build's `source.connected_repository`, if exists, with any revisions resolved. */
  resolvedConnectedRepository?: ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository;
  /** A copy of the build's `source.storage_source`, if exists, with any generations resolved. */
  resolvedStorageSource?: ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource;
  /** Output only. A copy of the build's `source.git_source`, if exists, with any revisions resolved. */
  resolvedGitSource?: ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource;
  /** A copy of the build's `source.storage_source_manifest`, if exists, with any revisions resolved. This feature is in Preview. */
  resolvedStorageSourceManifest?: ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance> =
  Schema.suspend(() =>
    Schema.Struct({
      fileHashes: Schema.optional(
        Schema.Record(
          Schema.String,
          ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes,
        ),
      ),
      resolvedRepoSource: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1RepoSource,
      ),
      resolvedConnectedRepository: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1ConnectedRepository,
      ),
      resolvedStorageSource: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSource,
      ),
      resolvedGitSource: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1GitSource,
      ),
      resolvedStorageSourceManifest: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1StorageSourceManifest,
      ),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance>;

export interface DocumentOccurrence {
  /** Provide an SPDX document specific namespace as a unique absolute Uniform Resource Identifier (URI) as specified in RFC-3986, with the exception of the ‘#’ delimiter */
  namespace?: string;
  /** A field for creators of the SPDX file to provide the version of the SPDX License List used when the SPDX file was created */
  licenseListVersion?: string;
  /** A field for creators of the SPDX file to provide general comments about the creation of the SPDX file or any other relevant comment not included in the other fields */
  creatorComment?: string;
  /** Identify name of this document as designated by creator */
  title?: string;
  /** A field for creators of the SPDX file content to provide comments to the consumers of the SPDX document */
  documentComment?: string;
  /** Identify who (or what, in the case of a tool) created the SPDX file. If the SPDX file was created by an individual, indicate the person's name */
  creators?: Array<string>;
  /** Identify when the SPDX file was originally created. The date is to be specified according to combined date and time in UTC format as specified in ISO 8601 standard */
  createTime?: string;
  /** Identify the current SPDX document which may be referenced in relationships by other files, packages internally and documents externally */
  id?: string;
  /** Identify any external SPDX documents referenced within this SPDX document */
  externalDocumentRefs?: Array<string>;
}

export const DocumentOccurrence: Schema.Schema<DocumentOccurrence> =
  Schema.suspend(() =>
    Schema.Struct({
      namespace: Schema.optional(Schema.String),
      licenseListVersion: Schema.optional(Schema.String),
      creatorComment: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      documentComment: Schema.optional(Schema.String),
      creators: Schema.optional(Schema.Array(Schema.String)),
      createTime: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      externalDocumentRefs: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "DocumentOccurrence",
  }) as any as Schema.Schema<DocumentOccurrence>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestIamPermissionsResponse",
  }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage {
  /** Output only. Path to the artifact in Artifact Registry. */
  artifactRegistryPackage?: string;
  /** Output only. Stores timing information for pushing the specified artifact. */
  pushTiming?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
  /** URI of the uploaded artifact. */
  uri?: string;
  /** Hash types and values of the Python Artifact. */
  fileHashes?: ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage> =
  Schema.suspend(() =>
    Schema.Struct({
      artifactRegistryPackage: Schema.optional(Schema.String),
      pushTiming: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan,
      ),
      uri: Schema.optional(Schema.String),
      fileHashes: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes,
      ),
    }),
  ).annotate({
    identifier:
      "ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage>;

export interface Digest {
  /** `SHA1`, `SHA512` etc. */
  algo?: string;
  /** Value of the digest. */
  digestBytes?: string;
}

export const Digest: Schema.Schema<Digest> = Schema.suspend(() =>
  Schema.Struct({
    algo: Schema.optional(Schema.String),
    digestBytes: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Digest" }) as any as Schema.Schema<Digest>;

export interface Distribution {
  /** The distribution channel-specific description of this package. */
  description?: string;
  /** The latest available version of this package in this distribution channel. */
  latestVersion?: Version;
  /** A freeform string denoting the maintainer of this package. */
  maintainer?: string;
  /** The cpe_uri in [cpe format](https://cpe.mitre.org/specification/) denoting the package manager version distributing a package. */
  cpeUri?: string;
  /** The distribution channel-specific homepage for this package. */
  url?: string;
  /** The CPU architecture for which packages in this distribution channel were built */
  architecture?: "ARCHITECTURE_UNSPECIFIED" | "X86" | "X64" | (string & {});
}

export const Distribution: Schema.Schema<Distribution> = Schema.suspend(() =>
  Schema.Struct({
    description: Schema.optional(Schema.String),
    latestVersion: Schema.optional(Version),
    maintainer: Schema.optional(Schema.String),
    cpeUri: Schema.optional(Schema.String),
    url: Schema.optional(Schema.String),
    architecture: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "Distribution",
}) as any as Schema.Schema<Distribution>;

export interface Package {
  /** The description of this package. */
  description?: string;
  /** A freeform text denoting the maintainer of this package. */
  maintainer?: string;
  /** The CPU architecture for which packages in this distribution channel were built. Architecture will be blank for language packages. */
  architecture?: "ARCHITECTURE_UNSPECIFIED" | "X86" | "X64" | (string & {});
  /** The cpe_uri in [CPE format](https://cpe.mitre.org/specification/) denoting the package manager version distributing a package. The cpe_uri will be blank for language packages. */
  cpeUri?: string;
  /** The type of package; whether native or non native (e.g., ruby gems, node.js packages, etc.). */
  packageType?: string;
  /** The name of the package. */
  name?: string;
  /** Hash value, typically a file digest, that allows unique identification a specific package. */
  digest?: Array<Digest>;
  /** The version of the package. */
  version?: Version;
  /** Licenses that have been declared by the authors of the package. */
  license?: License;
  /** The homepage for this package. */
  url?: string;
  /** The various channels by which a package is distributed. */
  distribution?: Array<Distribution>;
}

export const Package: Schema.Schema<Package> = Schema.suspend(() =>
  Schema.Struct({
    description: Schema.optional(Schema.String),
    maintainer: Schema.optional(Schema.String),
    architecture: Schema.optional(Schema.String),
    cpeUri: Schema.optional(Schema.String),
    packageType: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    digest: Schema.optional(Schema.Array(Digest)),
    version: Schema.optional(Version),
    license: Schema.optional(License),
    url: Schema.optional(Schema.String),
    distribution: Schema.optional(Schema.Array(Distribution)),
  }),
).annotate({ identifier: "Package" }) as any as Schema.Schema<Package>;

export interface DocumentNote {
  /** Compliance with the SPDX specification includes populating the SPDX fields therein with data related to such fields ("SPDX-Metadata") */
  dataLicence?: string;
  /** Provide a reference number that can be used to understand how to parse and interpret the rest of the file */
  spdxVersion?: string;
}

export const DocumentNote: Schema.Schema<DocumentNote> = Schema.suspend(() =>
  Schema.Struct({
    dataLicence: Schema.optional(Schema.String),
    spdxVersion: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "DocumentNote",
}) as any as Schema.Schema<DocumentNote>;

export interface DSSEHint {
  /** Required. The human readable name of this attestation authority, for example "cloudbuild-prod". */
  humanReadableName?: string;
}

export const DSSEHint: Schema.Schema<DSSEHint> = Schema.suspend(() =>
  Schema.Struct({
    humanReadableName: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "DSSEHint" }) as any as Schema.Schema<DSSEHint>;

export interface DSSEAttestationNote {
  /** DSSEHint hints at the purpose of the attestation authority. */
  hint?: DSSEHint;
}

export const DSSEAttestationNote: Schema.Schema<DSSEAttestationNote> =
  Schema.suspend(() =>
    Schema.Struct({
      hint: Schema.optional(DSSEHint),
    }),
  ).annotate({
    identifier: "DSSEAttestationNote",
  }) as any as Schema.Schema<DSSEAttestationNote>;

export interface VulnerabilityLocation {
  /** The file location at which this package was found. */
  fileLocation?: Array<FileLocation>;
  /** The version of the package being described. This field can be used as a filter in list requests. */
  version?: Version;
  /** The cpe_uri in [cpe format] (https://cpe.mitre.org/specification/) format. Examples include distro or storage location for vulnerable jar. This field can be used as a filter in list requests. */
  cpeUri?: string;
  /** The package being described. */
  package?: string;
}

export const VulnerabilityLocation: Schema.Schema<VulnerabilityLocation> =
  Schema.suspend(() =>
    Schema.Struct({
      fileLocation: Schema.optional(Schema.Array(FileLocation)),
      version: Schema.optional(Version),
      cpeUri: Schema.optional(Schema.String),
      package: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VulnerabilityLocation",
  }) as any as Schema.Schema<VulnerabilityLocation>;

export interface Detail {
  /** The cpe_uri in [cpe format] (https://cpe.mitre.org/specification/) in which the vulnerability manifests. Examples include distro or storage location for vulnerable jar. This field can be used as a filter in list requests. */
  cpeUri?: string;
  /** Whether this Detail is obsolete. Occurrences are expected not to point to obsolete details. */
  isObsolete?: boolean;
  /** The name of the package where the vulnerability was found. This field can be used as a filter in list requests. */
  package?: string;
  /** The max version of the package in which the vulnerability exists. */
  maxAffectedVersion?: Version;
  /** The source from which the information in this Detail was obtained. */
  source?: string;
  /** The min version of the package in which the vulnerability exists. */
  minAffectedVersion?: Version;
  /** The severity (eg: distro assigned severity) for this vulnerability. */
  severityName?: string;
  /** The vendor of the product. e.g. "google" */
  vendor?: string;
  /** The fix for this specific package version. */
  fixedLocation?: VulnerabilityLocation;
  /** The type of package; whether native or non native(ruby gems, node.js packages etc) */
  packageType?: string;
  /** A vendor-specific description of this note. */
  description?: string;
}

export const Detail: Schema.Schema<Detail> = Schema.suspend(() =>
  Schema.Struct({
    cpeUri: Schema.optional(Schema.String),
    isObsolete: Schema.optional(Schema.Boolean),
    package: Schema.optional(Schema.String),
    maxAffectedVersion: Schema.optional(Version),
    source: Schema.optional(Schema.String),
    minAffectedVersion: Schema.optional(Version),
    severityName: Schema.optional(Schema.String),
    vendor: Schema.optional(Schema.String),
    fixedLocation: Schema.optional(VulnerabilityLocation),
    packageType: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Detail" }) as any as Schema.Schema<Detail>;

export interface CVSS {
  /** The base score is a function of the base metric scores. */
  baseScore?: number;
  impactScore?: number;
  /** Defined in CVSS v3, CVSS v2 */
  integrityImpact?:
    | "IMPACT_UNSPECIFIED"
    | "IMPACT_HIGH"
    | "IMPACT_LOW"
    | "IMPACT_NONE"
    | "IMPACT_PARTIAL"
    | "IMPACT_COMPLETE"
    | (string & {});
  exploitabilityScore?: number;
  /** Defined in CVSS v3, CVSS v2 */
  attackComplexity?:
    | "ATTACK_COMPLEXITY_UNSPECIFIED"
    | "ATTACK_COMPLEXITY_LOW"
    | "ATTACK_COMPLEXITY_HIGH"
    | "ATTACK_COMPLEXITY_MEDIUM"
    | (string & {});
  /** Defined in CVSS v3, CVSS v2 */
  confidentialityImpact?:
    | "IMPACT_UNSPECIFIED"
    | "IMPACT_HIGH"
    | "IMPACT_LOW"
    | "IMPACT_NONE"
    | "IMPACT_PARTIAL"
    | "IMPACT_COMPLETE"
    | (string & {});
  /** Defined in CVSS v3, CVSS v2 */
  availabilityImpact?:
    | "IMPACT_UNSPECIFIED"
    | "IMPACT_HIGH"
    | "IMPACT_LOW"
    | "IMPACT_NONE"
    | "IMPACT_PARTIAL"
    | "IMPACT_COMPLETE"
    | (string & {});
  /** Defined in CVSS v2 */
  authentication?:
    | "AUTHENTICATION_UNSPECIFIED"
    | "AUTHENTICATION_MULTIPLE"
    | "AUTHENTICATION_SINGLE"
    | "AUTHENTICATION_NONE"
    | (string & {});
  /** Defined in CVSS v3 */
  scope?:
    | "SCOPE_UNSPECIFIED"
    | "SCOPE_UNCHANGED"
    | "SCOPE_CHANGED"
    | (string & {});
  /** Base Metrics Represents the intrinsic characteristics of a vulnerability that are constant over time and across user environments. Defined in CVSS v3, CVSS v2 */
  attackVector?:
    | "ATTACK_VECTOR_UNSPECIFIED"
    | "ATTACK_VECTOR_NETWORK"
    | "ATTACK_VECTOR_ADJACENT"
    | "ATTACK_VECTOR_LOCAL"
    | "ATTACK_VECTOR_PHYSICAL"
    | (string & {});
  /** Defined in CVSS v3 */
  userInteraction?:
    | "USER_INTERACTION_UNSPECIFIED"
    | "USER_INTERACTION_NONE"
    | "USER_INTERACTION_REQUIRED"
    | (string & {});
  /** Defined in CVSS v3 */
  privilegesRequired?:
    | "PRIVILEGES_REQUIRED_UNSPECIFIED"
    | "PRIVILEGES_REQUIRED_NONE"
    | "PRIVILEGES_REQUIRED_LOW"
    | "PRIVILEGES_REQUIRED_HIGH"
    | (string & {});
}

export const CVSS: Schema.Schema<CVSS> = Schema.suspend(() =>
  Schema.Struct({
    baseScore: Schema.optional(Schema.Number),
    impactScore: Schema.optional(Schema.Number),
    integrityImpact: Schema.optional(Schema.String),
    exploitabilityScore: Schema.optional(Schema.Number),
    attackComplexity: Schema.optional(Schema.String),
    confidentialityImpact: Schema.optional(Schema.String),
    availabilityImpact: Schema.optional(Schema.String),
    authentication: Schema.optional(Schema.String),
    scope: Schema.optional(Schema.String),
    attackVector: Schema.optional(Schema.String),
    userInteraction: Schema.optional(Schema.String),
    privilegesRequired: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "CVSS" }) as any as Schema.Schema<CVSS>;

export interface VulnerabilityType {
  /** CVSS version used to populate cvss_score and severity. */
  cvssVersion?:
    | "CVSS_VERSION_UNSPECIFIED"
    | "CVSS_VERSION_2"
    | "CVSS_VERSION_3"
    | (string & {});
  /** A list of CWE for this vulnerability. For details, see: https://cwe.mitre.org/index.html */
  cwe?: Array<string>;
  /** All information about the package to specifically identify this vulnerability. One entry per (version range and cpe_uri) the package vulnerability has manifested in. */
  details?: Array<Detail>;
  /** Note provider assigned impact of the vulnerability */
  severity?:
    | "SEVERITY_UNSPECIFIED"
    | "MINIMAL"
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "CRITICAL"
    | (string & {});
  /** The CVSS score for this Vulnerability. */
  cvssScore?: number;
  /** The full description of the CVSS for version 2. */
  cvssV2?: CVSS;
}

export const VulnerabilityType: Schema.Schema<VulnerabilityType> =
  Schema.suspend(() =>
    Schema.Struct({
      cvssVersion: Schema.optional(Schema.String),
      cwe: Schema.optional(Schema.Array(Schema.String)),
      details: Schema.optional(Schema.Array(Detail)),
      severity: Schema.optional(Schema.String),
      cvssScore: Schema.optional(Schema.Number),
      cvssV2: Schema.optional(CVSS),
    }),
  ).annotate({
    identifier: "VulnerabilityType",
  }) as any as Schema.Schema<VulnerabilityType>;

export interface AttestationAuthorityHint {
  /** The human readable name of this Attestation Authority, for example "qa". */
  humanReadableName?: string;
}

export const AttestationAuthorityHint: Schema.Schema<AttestationAuthorityHint> =
  Schema.suspend(() =>
    Schema.Struct({
      humanReadableName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AttestationAuthorityHint",
  }) as any as Schema.Schema<AttestationAuthorityHint>;

export interface AttestationAuthority {
  hint?: AttestationAuthorityHint;
}

export const AttestationAuthority: Schema.Schema<AttestationAuthority> =
  Schema.suspend(() =>
    Schema.Struct({
      hint: Schema.optional(AttestationAuthorityHint),
    }),
  ).annotate({
    identifier: "AttestationAuthority",
  }) as any as Schema.Schema<AttestationAuthority>;

export interface GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaInvocation {
  /** Collection of all external inputs that influenced the build on top of invocation.configSource. */
  parameters?: Record<string, unknown>;
  /** Describes where the config file that kicked off the build came from. */
  configSource?: GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaConfigSource;
  /** Any other builder-controlled inputs necessary for correctly evaluating the build. */
  environment?: Record<string, unknown>;
}

export const GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaInvocation: Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaInvocation> =
  Schema.suspend(() =>
    Schema.Struct({
      parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      configSource: Schema.optional(
        GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaConfigSource,
      ),
      environment: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
    }),
  ).annotate({
    identifier:
      "GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaInvocation",
  }) as any as Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaInvocation>;

export interface PackageIssue {
  /** The type of package (e.g. OS, MAVEN, GO). */
  packageType?: string;
  /** Output only. The distro or language system assigned severity for this vulnerability when that is available and note provider assigned severity when distro or language system has not yet assigned a severity for this vulnerability. */
  effectiveSeverity?:
    | "SEVERITY_UNSPECIFIED"
    | "MINIMAL"
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "CRITICAL"
    | (string & {});
  severityName?: string;
  /** The location of the vulnerability. */
  affectedLocation?: VulnerabilityLocation;
  /** The location of the available fix for vulnerability. */
  fixedLocation?: VulnerabilityLocation;
}

export const PackageIssue: Schema.Schema<PackageIssue> = Schema.suspend(() =>
  Schema.Struct({
    packageType: Schema.optional(Schema.String),
    effectiveSeverity: Schema.optional(Schema.String),
    severityName: Schema.optional(Schema.String),
    affectedLocation: Schema.optional(VulnerabilityLocation),
    fixedLocation: Schema.optional(VulnerabilityLocation),
  }),
).annotate({
  identifier: "PackageIssue",
}) as any as Schema.Schema<PackageIssue>;

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

export const SbomReferenceIntotoPredicate: Schema.Schema<SbomReferenceIntotoPredicate> =
  Schema.suspend(() =>
    Schema.Struct({
      mimeType: Schema.optional(Schema.String),
      digest: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      location: Schema.optional(Schema.String),
      referrerId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SbomReferenceIntotoPredicate",
  }) as any as Schema.Schema<SbomReferenceIntotoPredicate>;

export interface BuildSignature {
  /** An Id for the key used to sign. This could be either an Id for the key stored in `public_key` (such as the Id or fingerprint for a PGP key, or the CN for a cert), or a reference to an external key (such as a reference to a key in Cloud Key Management Service). */
  keyId?: string;
  /** The type of the key, either stored in `public_key` or referenced in `key_id` */
  keyType?:
    | "KEY_TYPE_UNSPECIFIED"
    | "PGP_ASCII_ARMORED"
    | "PKIX_PEM"
    | (string & {});
  /** Public key of the builder which can be used to verify that the related findings are valid and unchanged. If `key_type` is empty, this defaults to PEM encoded public keys. This field may be empty if `key_id` references an external key. For Cloud Build based signatures, this is a PEM encoded public key. To verify the Cloud Build signature, place the contents of this field into a file (public.pem). The signature field is base64-decoded into its binary representation in signature.bin, and the provenance bytes from `BuildDetails` are base64-decoded into a binary representation in signed.bin. OpenSSL can then verify the signature: `openssl sha256 -verify public.pem -signature signature.bin signed.bin` */
  publicKey?: string;
  /** Signature of the related `BuildProvenance`, encoded in a base64 string. */
  signature?: string;
}

export const BuildSignature: Schema.Schema<BuildSignature> = Schema.suspend(
  () =>
    Schema.Struct({
      keyId: Schema.optional(Schema.String),
      keyType: Schema.optional(Schema.String),
      publicKey: Schema.optional(Schema.String),
      signature: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "BuildSignature",
}) as any as Schema.Schema<BuildSignature>;

export interface ComplianceNote {
  /** The OS and config versions the benchmark applies to. */
  version?: Array<ComplianceVersion>;
  /** Right now we only have one compliance type, but we may add additional types in the future. */
  cisBenchmark?: CisBenchmark;
  /** Serialized scan instructions with a predefined format. */
  scanInstructions?: string;
  /** Potential impact of the suggested remediation */
  impact?: string;
  /** The title that identifies this compliance check. */
  title?: string;
  /** A description about this compliance check. */
  description?: string;
  /** A description of remediation steps if the compliance check fails. */
  remediation?: string;
  /** A rationale for the existence of this compliance check. */
  rationale?: string;
}

export const ComplianceNote: Schema.Schema<ComplianceNote> = Schema.suspend(
  () =>
    Schema.Struct({
      version: Schema.optional(Schema.Array(ComplianceVersion)),
      cisBenchmark: Schema.optional(CisBenchmark),
      scanInstructions: Schema.optional(Schema.String),
      impact: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      remediation: Schema.optional(Schema.String),
      rationale: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ComplianceNote",
}) as any as Schema.Schema<ComplianceNote>;

export interface IdentifierHelper {
  /** The field that is set in the API proto. */
  field?: "IDENTIFIER_HELPER_FIELD_UNSPECIFIED" | "GENERIC_URI" | (string & {});
  /** Contains a URI which is vendor-specific. Example: The artifact repository URL of an image. */
  genericUri?: string;
}

export const IdentifierHelper: Schema.Schema<IdentifierHelper> = Schema.suspend(
  () =>
    Schema.Struct({
      field: Schema.optional(Schema.String),
      genericUri: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "IdentifierHelper",
}) as any as Schema.Schema<IdentifierHelper>;

export interface Product {
  /** Name of the product. */
  name?: string;
  /** Helps in identifying the underlying product. */
  identifierHelper?: IdentifierHelper;
  /** Token that identifies a product so that it can be referred to from other parts in the document. There is no predefined format as long as it uniquely identifies a group in the context of the current document. */
  id?: string;
}

export const Product: Schema.Schema<Product> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    identifierHelper: Schema.optional(IdentifierHelper),
    id: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Product" }) as any as Schema.Schema<Product>;

export interface SBOMStatus {
  /** Output only. If there was an error generating an SBOM, this will indicate what that error was. */
  error?: string;
  /** Output only. The progress of the SBOM generation. */
  sbomState?: "SBOM_STATE_UNSPECIFIED" | "PENDING" | "COMPLETE" | (string & {});
}

export const SBOMStatus: Schema.Schema<SBOMStatus> = Schema.suspend(() =>
  Schema.Struct({
    error: Schema.optional(Schema.String),
    sbomState: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "SBOMStatus" }) as any as Schema.Schema<SBOMStatus>;

export interface SecretStatus {
  /** Optional. Optional message about the status code. */
  message?: string;
  /** Optional. The status of the secret. */
  status?:
    | "STATUS_UNSPECIFIED"
    | "UNKNOWN"
    | "VALID"
    | "INVALID"
    | (string & {});
  /** Optional. The time the secret status was last updated. */
  updateTime?: string;
}

export const SecretStatus: Schema.Schema<SecretStatus> = Schema.suspend(() =>
  Schema.Struct({
    message: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    updateTime: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "SecretStatus",
}) as any as Schema.Schema<SecretStatus>;

export interface SecretOccurrence {
  /** Optional. Locations where the secret is detected. */
  locations?: Array<SecretLocation>;
  /** Required. Type of secret. */
  kind?:
    | "SECRET_KIND_UNSPECIFIED"
    | "SECRET_KIND_UNKNOWN"
    | "SECRET_KIND_GCP_SERVICE_ACCOUNT_KEY"
    | "SECRET_KIND_GCP_API_KEY"
    | "SECRET_KIND_GCP_OAUTH2_CLIENT_CREDENTIALS"
    | "SECRET_KIND_GCP_OAUTH2_ACCESS_TOKEN"
    | "SECRET_KIND_ANTHROPIC_ADMIN_API_KEY"
    | "SECRET_KIND_ANTHROPIC_API_KEY"
    | "SECRET_KIND_AZURE_ACCESS_TOKEN"
    | "SECRET_KIND_AZURE_IDENTITY_TOKEN"
    | "SECRET_KIND_DOCKER_HUB_PERSONAL_ACCESS_TOKEN"
    | "SECRET_KIND_GITHUB_APP_REFRESH_TOKEN"
    | "SECRET_KIND_GITHUB_APP_SERVER_TO_SERVER_TOKEN"
    | "SECRET_KIND_GITHUB_APP_USER_TO_SERVER_TOKEN"
    | "SECRET_KIND_GITHUB_CLASSIC_PERSONAL_ACCESS_TOKEN"
    | "SECRET_KIND_GITHUB_FINE_GRAINED_PERSONAL_ACCESS_TOKEN"
    | "SECRET_KIND_GITHUB_OAUTH_TOKEN"
    | "SECRET_KIND_HUGGINGFACE_API_KEY"
    | "SECRET_KIND_OPENAI_API_KEY"
    | "SECRET_KIND_PERPLEXITY_API_KEY"
    | "SECRET_KIND_STRIPE_SECRET_KEY"
    | "SECRET_KIND_STRIPE_RESTRICTED_KEY"
    | "SECRET_KIND_STRIPE_WEBHOOK_SECRET"
    | (string & {});
  /** Optional. Status of the secret. */
  statuses?: Array<SecretStatus>;
}

export const SecretOccurrence: Schema.Schema<SecretOccurrence> = Schema.suspend(
  () =>
    Schema.Struct({
      locations: Schema.optional(Schema.Array(SecretLocation)),
      kind: Schema.optional(Schema.String),
      statuses: Schema.optional(Schema.Array(SecretStatus)),
    }),
).annotate({
  identifier: "SecretOccurrence",
}) as any as Schema.Schema<SecretOccurrence>;

export interface Deployment {
  /** Beginning of the lifetime of this deployment. */
  deployTime?: string;
  /** Address of the runtime element hosting this deployment. */
  address?: string;
  /** End of the lifetime of this deployment. */
  undeployTime?: string;
  /** Configuration used to create this deployment. */
  config?: string;
  /** Platform hosting this deployment. */
  platform?: "PLATFORM_UNSPECIFIED" | "GKE" | "FLEX" | "CUSTOM" | (string & {});
  /** Resource URI for the artifact being deployed taken from the deployable field with the same name. */
  resourceUri?: Array<string>;
  /** Identity of the user that triggered this deployment. */
  userEmail?: string;
}

export const Deployment: Schema.Schema<Deployment> = Schema.suspend(() =>
  Schema.Struct({
    deployTime: Schema.optional(Schema.String),
    address: Schema.optional(Schema.String),
    undeployTime: Schema.optional(Schema.String),
    config: Schema.optional(Schema.String),
    platform: Schema.optional(Schema.String),
    resourceUri: Schema.optional(Schema.Array(Schema.String)),
    userEmail: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Deployment" }) as any as Schema.Schema<Deployment>;

export interface VexAssessment {
  /** The vulnerability identifier for this Assessment. Will hold one of common identifiers e.g. CVE, GHSA etc. */
  vulnerabilityId?: string;
  /** Provides the state of this Vulnerability assessment. */
  state?:
    | "STATE_UNSPECIFIED"
    | "AFFECTED"
    | "NOT_AFFECTED"
    | "FIXED"
    | "UNDER_INVESTIGATION"
    | (string & {});
  /** Holds a list of references associated with this vulnerability item and assessment. These uris have additional information about the vulnerability and the assessment itself. E.g. Link to a document which details how this assessment concluded the state of this vulnerability. */
  relatedUris?: Array<URI>;
  /** The VulnerabilityAssessment note from which this VexAssessment was generated. This will be of the form: `projects/[PROJECT_ID]/notes/[NOTE_ID]`. */
  noteName?: string;
  /** Holds the MITRE standard Common Vulnerabilities and Exposures (CVE) tracking number for the vulnerability. */
  cve?: string;
  /** Contains information about the impact of this vulnerability, this will change with time. */
  impacts?: Array<string>;
  /** Justification provides the justification when the state of the assessment if NOT_AFFECTED. */
  justification?: Justification;
  /** Specifies details on how to handle (and presumably, fix) a vulnerability. */
  remediations?: Array<Remediation>;
}

export const VexAssessment: Schema.Schema<VexAssessment> = Schema.suspend(() =>
  Schema.Struct({
    vulnerabilityId: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
    relatedUris: Schema.optional(Schema.Array(URI)),
    noteName: Schema.optional(Schema.String),
    cve: Schema.optional(Schema.String),
    impacts: Schema.optional(Schema.Array(Schema.String)),
    justification: Schema.optional(Justification),
    remediations: Schema.optional(Schema.Array(Remediation)),
  }),
).annotate({
  identifier: "VexAssessment",
}) as any as Schema.Schema<VexAssessment>;

export interface VulnerabilityDetails {
  /** Output only. CVSS version used to populate cvss_score and severity. */
  cvssVersion?:
    | "CVSS_VERSION_UNSPECIFIED"
    | "CVSS_VERSION_2"
    | "CVSS_VERSION_3"
    | (string & {});
  /** Output only. The CVSS score of this vulnerability. CVSS score is on a scale of 0-10 where 0 indicates low severity and 10 indicates high severity. */
  cvssScore?: number;
  /** Output only. The note provider assigned Severity of the vulnerability. */
  severity?:
    | "SEVERITY_UNSPECIFIED"
    | "MINIMAL"
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "CRITICAL"
    | (string & {});
  /** The distro assigned severity for this vulnerability when that is available and note provider assigned severity when distro has not yet assigned a severity for this vulnerability. When there are multiple package issues for this vulnerability, they can have different effective severities because some might come from the distro and some might come from installed language packs (e.g. Maven JARs or Go binaries). For this reason, it is advised to use the effective severity on the PackageIssue level, as this field may eventually be deprecated. In the case where multiple PackageIssues have different effective severities, the one set here will be the highest severity of any of the PackageIssues. */
  effectiveSeverity?:
    | "SEVERITY_UNSPECIFIED"
    | "MINIMAL"
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "CRITICAL"
    | (string & {});
  /** The set of affected locations and their fixes (if available) within the associated resource. */
  packageIssue?: Array<PackageIssue>;
  /** VexAssessment provides all publisher provided Vex information that is related to this vulnerability for this resource. */
  vexAssessment?: VexAssessment;
  /** Risk information about the vulnerability, such as CISA, EPSS, etc. */
  risk?: Risk;
  /** The CVSS v2 score of this vulnerability. */
  cvssV2?: CVSS;
  /** The CVSS v3 score of this vulnerability. */
  cvssV3?: CVSS;
  /** The type of package; whether native or non native(ruby gems, node.js packages etc). This may be deprecated in the future because we can have multiple PackageIssues with different package types. */
  type?: string;
  /** Occurrence-specific extra details about the vulnerability. */
  extraDetails?: string;
}

export const VulnerabilityDetails: Schema.Schema<VulnerabilityDetails> =
  Schema.suspend(() =>
    Schema.Struct({
      cvssVersion: Schema.optional(Schema.String),
      cvssScore: Schema.optional(Schema.Number),
      severity: Schema.optional(Schema.String),
      effectiveSeverity: Schema.optional(Schema.String),
      packageIssue: Schema.optional(Schema.Array(PackageIssue)),
      vexAssessment: Schema.optional(VexAssessment),
      risk: Schema.optional(Risk),
      cvssV2: Schema.optional(CVSS),
      cvssV3: Schema.optional(CVSS),
      type: Schema.optional(Schema.String),
      extraDetails: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VulnerabilityDetails",
  }) as any as Schema.Schema<VulnerabilityDetails>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedGoModule {
  /** URI of the uploaded artifact. */
  uri?: string;
  /** Output only. Stores timing information for pushing the specified artifact. */
  pushTiming?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
  /** Hash types and values of the Go Module Artifact. */
  fileHashes?: ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes;
  /** Output only. Path to the artifact in Artifact Registry. */
  artifactRegistryPackage?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedGoModule: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedGoModule> =
  Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
      pushTiming: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan,
      ),
      fileHashes: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes,
      ),
      artifactRegistryPackage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedGoModule",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedGoModule>;

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() =>
  Schema.Struct({
    code: Schema.optional(Schema.Number),
    message: Schema.optional(Schema.String),
    details: Schema.optional(
      Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
    ),
  }),
).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface AnalysisCompleted {
  /** type of analysis that were completed on a resource. */
  analysisType?: Array<string>;
}

export const AnalysisCompleted: Schema.Schema<AnalysisCompleted> =
  Schema.suspend(() =>
    Schema.Struct({
      analysisType: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "AnalysisCompleted",
  }) as any as Schema.Schema<AnalysisCompleted>;

export interface VulnerabilityAttestation {
  /** Output only. The last time we attempted to generate an attestation. */
  lastAttemptTime?: string;
  /** Output only. The success/failure state of the latest attestation attempt. */
  state?:
    | "VULNERABILITY_ATTESTATION_STATE_UNSPECIFIED"
    | "SUCCESS"
    | "FAILURE"
    | (string & {});
  /** Output only. If failure, the error reason for why the attestation generation failed. */
  error?: string;
}

export const VulnerabilityAttestation: Schema.Schema<VulnerabilityAttestation> =
  Schema.suspend(() =>
    Schema.Struct({
      lastAttemptTime: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      error: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VulnerabilityAttestation",
  }) as any as Schema.Schema<VulnerabilityAttestation>;

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    error: Schema.optional(Status),
    done: Schema.optional(Schema.Boolean),
  }),
).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface Discovered {
  /** Optional. Files that make up the resource described by the occurrence. */
  files?: Array<File>;
  /** Indicates any errors encountered during analysis of a resource. There could be 0 or more of these errors. */
  analysisError?: Array<Status>;
  /** When an error is encountered this will contain a LocalizedMessage under details to show to the user. The LocalizedMessage output only and populated by the API. */
  analysisStatusError?: Status;
  /** The time occurrences related to this discovery occurrence were archived. */
  archiveTime?: string;
  /** The CPE of the resource being scanned. */
  cpe?: string;
  /** The list of analysis that were completed for a resource. */
  analysisCompleted?: AnalysisCompleted;
  /** Output only. The status of a vulnerability attestation generation. */
  vulnerabilityAttestation?: VulnerabilityAttestation;
  /** Optional. The last time vulnerability scan results changed. */
  lastVulnerabilityUpdateTime?: string;
  /** Output only. The status of an SBOM generation. */
  sbomStatus?: SBOMStatus;
  /** Whether the resource is continuously analyzed. */
  continuousAnalysis?:
    | "CONTINUOUS_ANALYSIS_UNSPECIFIED"
    | "ACTIVE"
    | "INACTIVE"
    | (string & {});
  /** Output only. An operation that indicates the status of the current scan. This field is deprecated, do not use. */
  operation?: Operation;
  /** The status of discovery for the resource. */
  analysisStatus?:
    | "ANALYSIS_STATUS_UNSPECIFIED"
    | "PENDING"
    | "SCANNING"
    | "COMPLETE"
    | "FINISHED_SUCCESS"
    | "FINISHED_FAILED"
    | "FINISHED_UNSUPPORTED"
    | (string & {});
  /** The last time this resource was scanned. */
  lastScanTime?: string;
}

export const Discovered: Schema.Schema<Discovered> = Schema.suspend(() =>
  Schema.Struct({
    files: Schema.optional(Schema.Array(File)),
    analysisError: Schema.optional(Schema.Array(Status)),
    analysisStatusError: Schema.optional(Status),
    archiveTime: Schema.optional(Schema.String),
    cpe: Schema.optional(Schema.String),
    analysisCompleted: Schema.optional(AnalysisCompleted),
    vulnerabilityAttestation: Schema.optional(VulnerabilityAttestation),
    lastVulnerabilityUpdateTime: Schema.optional(Schema.String),
    sbomStatus: Schema.optional(SBOMStatus),
    continuousAnalysis: Schema.optional(Schema.String),
    operation: Schema.optional(Operation),
    analysisStatus: Schema.optional(Schema.String),
    lastScanTime: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Discovered" }) as any as Schema.Schema<Discovered>;

export interface ComplianceOccurrence {
  /** The OS and config version the benchmark was run on. */
  version?: ComplianceVersion;
  /** A list of files which are violating compliance checks. */
  nonCompliantFiles?: Array<NonCompliantFile>;
  /** The reason for non compliance of these files. */
  nonComplianceReason?: string;
}

export const ComplianceOccurrence: Schema.Schema<ComplianceOccurrence> =
  Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(ComplianceVersion),
      nonCompliantFiles: Schema.optional(Schema.Array(NonCompliantFile)),
      nonComplianceReason: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ComplianceOccurrence",
  }) as any as Schema.Schema<ComplianceOccurrence>;

export interface GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaBuilder {
  /** URI indicating the builder’s identity. */
  id?: string;
}

export const GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaBuilder: Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaBuilder> =
  Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaBuilder",
  }) as any as Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaBuilder>;

export interface SlsaProvenanceZeroTwo {
  /** Other properties of the build. */
  metadata?: GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaMetadata;
  /** URI indicating what type of build was performed. */
  buildType?: string;
  /** Identifies the entity that executed the recipe, which is trusted to have correctly performed the operation and populated this provenance. */
  builder?: GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaBuilder;
  /** The collection of artifacts that influenced the build including sources, dependencies, build tools, base images, and so on. */
  materials?: Array<GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaMaterial>;
  /** Lists the steps in the build. */
  buildConfig?: Record<string, unknown>;
  /** Identifies the event that kicked off the build. */
  invocation?: GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaInvocation;
}

export const SlsaProvenanceZeroTwo: Schema.Schema<SlsaProvenanceZeroTwo> =
  Schema.suspend(() =>
    Schema.Struct({
      metadata: Schema.optional(
        GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaMetadata,
      ),
      buildType: Schema.optional(Schema.String),
      builder: Schema.optional(
        GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaBuilder,
      ),
      materials: Schema.optional(
        Schema.Array(
          GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaMaterial,
        ),
      ),
      buildConfig: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      invocation: Schema.optional(
        GoogleDevtoolsContaineranalysisV1alpha1SlsaProvenanceZeroTwoSlsaInvocation,
      ),
    }),
  ).annotate({
    identifier: "SlsaProvenanceZeroTwo",
  }) as any as Schema.Schema<SlsaProvenanceZeroTwo>;

export interface InTotoStatement {
  /** Generic Grafeas provenance. */
  provenance?: InTotoProvenance;
  /** "https://slsa.dev/provenance/v0.1" for SlsaProvenance. */
  predicateType?: string;
  /** Always "https://in-toto.io/Statement/v0.1". */
  _type?: string;
  /** subject is the subjects of the intoto statement */
  subject?: Array<Subject>;
  /** SLSA 0.1 provenance. */
  slsaProvenance?: SlsaProvenance;
  /** SLSA 0.2 provenance. */
  slsaProvenanceZeroTwo?: SlsaProvenanceZeroTwo;
}

export const InTotoStatement: Schema.Schema<InTotoStatement> = Schema.suspend(
  () =>
    Schema.Struct({
      provenance: Schema.optional(InTotoProvenance),
      predicateType: Schema.optional(Schema.String),
      _type: Schema.optional(Schema.String),
      subject: Schema.optional(Schema.Array(Subject)),
      slsaProvenance: Schema.optional(SlsaProvenance),
      slsaProvenanceZeroTwo: Schema.optional(SlsaProvenanceZeroTwo),
    }),
).annotate({
  identifier: "InTotoStatement",
}) as any as Schema.Schema<InTotoStatement>;

export interface Artifact {
  /** Related artifact names. This may be the path to a binary or jar file, or in the case of a container build, the name used to push the container image to Google Container Registry, as presented to `docker push`. Note that a single Artifact ID can have multiple names, for example if two tags are applied to one image. */
  names?: Array<string>;
  /** Name of the artifact. This may be the path to a binary or jar file, or in the case of a container build, the name used to push the container image to Google Container Registry, as presented to `docker push`. This field is deprecated in favor of the plural `names` field; it continues to exist here to allow existing BuildProvenance serialized to json in google.devtools.containeranalysis.v1alpha1.BuildDetails.provenance_bytes to deserialize back into proto. */
  name?: string;
  /** Artifact ID, if any; for container images, this will be a URL by digest like gcr.io/projectID/imagename@sha256:123456 */
  id?: string;
  /** Hash or checksum value of a binary, or Docker Registry 2.0 digest of a container. */
  checksum?: string;
}

export const Artifact: Schema.Schema<Artifact> = Schema.suspend(() =>
  Schema.Struct({
    names: Schema.optional(Schema.Array(Schema.String)),
    name: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    checksum: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Artifact" }) as any as Schema.Schema<Artifact>;

export interface BuildProvenance {
  /** E-mail address of the user who initiated this build. Note that this was the user's e-mail address at the time the build was initiated; this address may not represent the same end-user for all time. */
  creator?: string;
  /** Details of the Source input to the build. */
  sourceProvenance?: Source;
  /** ID of the project. */
  projectId?: string;
  /** Google Cloud Storage bucket where logs were written. */
  logsBucket?: string;
  /** Time at which execution of the build was finished. */
  finishTime?: string;
  /** Time at which execution of the build was started. */
  startTime?: string;
  /** Time at which the build was created. */
  createTime?: string;
  /** Trigger identifier if the build was triggered automatically; empty if not. */
  triggerId?: string;
  /** Special options applied to this build. This is a catch-all field where build providers can enter any desired additional details. */
  buildOptions?: Record<string, string>;
  /** Unique identifier of the build. */
  id?: string;
  /** Commands requested by the build. */
  commands?: Array<Command>;
  /** Output of the build. */
  builtArtifacts?: Array<Artifact>;
  /** Version string of the builder at the time this build was executed. */
  builderVersion?: string;
}

export const BuildProvenance: Schema.Schema<BuildProvenance> = Schema.suspend(
  () =>
    Schema.Struct({
      creator: Schema.optional(Schema.String),
      sourceProvenance: Schema.optional(Source),
      projectId: Schema.optional(Schema.String),
      logsBucket: Schema.optional(Schema.String),
      finishTime: Schema.optional(Schema.String),
      startTime: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      triggerId: Schema.optional(Schema.String),
      buildOptions: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      id: Schema.optional(Schema.String),
      commands: Schema.optional(Schema.Array(Command)),
      builtArtifacts: Schema.optional(Schema.Array(Artifact)),
      builderVersion: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "BuildProvenance",
}) as any as Schema.Schema<BuildProvenance>;

export interface BuildDetails {
  /** In-Toto Slsa Provenance V1 represents a slsa provenance meeting the slsa spec, wrapped in an in-toto statement. This allows for direct jsonification of a to-spec in-toto slsa statement with a to-spec slsa provenance. */
  inTotoSlsaProvenanceV1?: InTotoSlsaProvenanceV1;
  /** In-toto Statement representation as defined in spec. The intoto_statement can contain any type of provenance. The serialized payload of the statement can be stored and signed in the Occurrence's envelope. */
  intotoStatement?: InTotoStatement;
  /** The actual provenance */
  provenance?: BuildProvenance;
  /** Deprecated. See InTotoStatement for the replacement. In-toto Provenance representation as defined in spec. */
  intotoProvenance?: InTotoProvenance;
  /** Serialized JSON representation of the provenance, used in generating the `BuildSignature` in the corresponding Result. After verifying the signature, `provenance_bytes` can be unmarshalled and compared to the provenance to confirm that it is unchanged. A base64-encoded string representation of the provenance bytes is used for the signature in order to interoperate with openssl which expects this format for signature verification. The serialized form is captured both to avoid ambiguity in how the provenance is marshalled to json as well to prevent incompatibilities with future changes. */
  provenanceBytes?: string;
}

export const BuildDetails: Schema.Schema<BuildDetails> = Schema.suspend(() =>
  Schema.Struct({
    inTotoSlsaProvenanceV1: Schema.optional(InTotoSlsaProvenanceV1),
    intotoStatement: Schema.optional(InTotoStatement),
    provenance: Schema.optional(BuildProvenance),
    intotoProvenance: Schema.optional(InTotoProvenance),
    provenanceBytes: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "BuildDetails",
}) as any as Schema.Schema<BuildDetails>;

export interface Envelope {
  /** The signatures over the payload */
  signatures?: Array<EnvelopeSignature>;
  /** The bytes being signed */
  payload?: string;
  /** The type of payload being signed */
  payloadType?: string;
}

export const Envelope: Schema.Schema<Envelope> = Schema.suspend(() =>
  Schema.Struct({
    signatures: Schema.optional(Schema.Array(EnvelopeSignature)),
    payload: Schema.optional(Schema.String),
    payloadType: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Envelope" }) as any as Schema.Schema<Envelope>;

export interface DSSEAttestationOccurrence {
  statement?: InTotoStatement;
  /** If doing something security critical, make sure to verify the signatures in this metadata. */
  envelope?: Envelope;
}

export const DSSEAttestationOccurrence: Schema.Schema<DSSEAttestationOccurrence> =
  Schema.suspend(() =>
    Schema.Struct({
      statement: Schema.optional(InTotoStatement),
      envelope: Schema.optional(Envelope),
    }),
  ).annotate({
    identifier: "DSSEAttestationOccurrence",
  }) as any as Schema.Schema<DSSEAttestationOccurrence>;

export interface Resource {
  /** The hash of the resource content. E.g., the Docker digest. */
  contentHash?: Hash;
  /** The unique URI of the resource. E.g., "https://gcr.io/project/image@sha256:foo" for a Docker image. */
  uri?: string;
  /** The name of the resource. E.g., the name of a Docker image - "Debian". */
  name?: string;
}

export const Resource: Schema.Schema<Resource> = Schema.suspend(() =>
  Schema.Struct({
    contentHash: Schema.optional(Hash),
    uri: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Resource" }) as any as Schema.Schema<Resource>;

export interface Attestation {
  pgpSignedAttestation?: PgpSignedAttestation;
}

export const Attestation: Schema.Schema<Attestation> = Schema.suspend(() =>
  Schema.Struct({
    pgpSignedAttestation: Schema.optional(PgpSignedAttestation),
  }),
).annotate({ identifier: "Attestation" }) as any as Schema.Schema<Attestation>;

export interface RelationshipOccurrence {
  /** Output only. The type of relationship between the source and target SPDX elements */
  type?:
    | "RELATIONSHIP_TYPE_UNSPECIFIED"
    | "DESCRIBES"
    | "DESCRIBED_BY"
    | "CONTAINS"
    | "CONTAINED_BY"
    | "DEPENDS_ON"
    | "DEPENDENCY_OF"
    | "DEPENDENCY_MANIFEST_OF"
    | "BUILD_DEPENDENCY_OF"
    | "DEV_DEPENDENCY_OF"
    | "OPTIONAL_DEPENDENCY_OF"
    | "PROVIDED_DEPENDENCY_OF"
    | "TEST_DEPENDENCY_OF"
    | "RUNTIME_DEPENDENCY_OF"
    | "EXAMPLE_OF"
    | "GENERATES"
    | "GENERATED_FROM"
    | "ANCESTOR_OF"
    | "DESCENDANT_OF"
    | "VARIANT_OF"
    | "DISTRIBUTION_ARTIFACT"
    | "PATCH_FOR"
    | "PATCH_APPLIED"
    | "COPY_OF"
    | "FILE_ADDED"
    | "FILE_DELETED"
    | "FILE_MODIFIED"
    | "EXPANDED_FROM_ARCHIVE"
    | "DYNAMIC_LINK"
    | "STATIC_LINK"
    | "DATA_FILE_OF"
    | "TEST_CASE_OF"
    | "BUILD_TOOL_OF"
    | "DEV_TOOL_OF"
    | "TEST_OF"
    | "TEST_TOOL_OF"
    | "DOCUMENTATION_OF"
    | "OPTIONAL_COMPONENT_OF"
    | "METAFILE_OF"
    | "PACKAGE_OF"
    | "AMENDS"
    | "PREREQUISITE_FOR"
    | "HAS_PREREQUISITE"
    | "OTHER"
    | (string & {});
  /** Also referred to as SPDXRef-A The source SPDX element (file, package, etc) */
  source?: string;
  /** A place for the SPDX file creator to record any general comments about the relationship */
  comment?: string;
  /** Also referred to as SPDXRef-B The target SPDC element (file, package, etc) In cases where there are "known unknowns", the use of the keyword NOASSERTION can be used The keywords NONE can be used to indicate that an SPDX element (package/file/snippet) has no other elements connected by some relationship to it */
  target?: string;
}

export const RelationshipOccurrence: Schema.Schema<RelationshipOccurrence> =
  Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      source: Schema.optional(Schema.String),
      comment: Schema.optional(Schema.String),
      target: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RelationshipOccurrence",
  }) as any as Schema.Schema<RelationshipOccurrence>;

export interface FileOccurrence {
  /** This field provides a place for the SPDX file creator to record any general comments about the file */
  comment?: string;
  /** This field provides a place for the SPDX file creator to record file contributors */
  contributors?: Array<string>;
  /** This field provides a place for the SPDX data creator to record, at the file level, acknowledgements that may be needed to be communicated in some contexts */
  attributions?: Array<string>;
  /** This field contains the license information actually found in the file, if any */
  filesLicenseInfo?: Array<string>;
  /** This field contains the license the SPDX file creator has concluded as governing the file or alternative values if the governing license cannot be determined */
  licenseConcluded?: License;
  /** This field provides a place for the SPDX file creator to record license notices or other such related notices found in the file */
  notice?: string;
  /** Identify the copyright holder of the file, as well as any dates present */
  copyright?: string;
  /** Uniquely identify any element in an SPDX document which may be referenced by other elements */
  id?: string;
}

export const FileOccurrence: Schema.Schema<FileOccurrence> = Schema.suspend(
  () =>
    Schema.Struct({
      comment: Schema.optional(Schema.String),
      contributors: Schema.optional(Schema.Array(Schema.String)),
      attributions: Schema.optional(Schema.Array(Schema.String)),
      filesLicenseInfo: Schema.optional(Schema.Array(Schema.String)),
      licenseConcluded: Schema.optional(License),
      notice: Schema.optional(Schema.String),
      copyright: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "FileOccurrence",
}) as any as Schema.Schema<FileOccurrence>;

export interface SbomReferenceIntotoPayload {
  /** Additional parameters of the Predicate. Includes the actual data about the SBOM. */
  predicate?: SbomReferenceIntotoPredicate;
  /** Set of software artifacts that the attestation applies to. Each element represents a single software artifact. */
  subject?: Array<Subject>;
  /** URI identifying the type of the Predicate. */
  predicateType?: string;
  /** Identifier for the schema of the Statement. */
  _type?: string;
}

export const SbomReferenceIntotoPayload: Schema.Schema<SbomReferenceIntotoPayload> =
  Schema.suspend(() =>
    Schema.Struct({
      predicate: Schema.optional(SbomReferenceIntotoPredicate),
      subject: Schema.optional(Schema.Array(Subject)),
      predicateType: Schema.optional(Schema.String),
      _type: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SbomReferenceIntotoPayload",
  }) as any as Schema.Schema<SbomReferenceIntotoPayload>;

export interface SBOMReferenceOccurrence {
  /** The kind of payload that SbomReferenceIntotoPayload takes. Since it's in the intoto format, this value is expected to be 'application/vnd.in-toto+json'. */
  payloadType?: string;
  /** The signatures over the payload. */
  signatures?: Array<EnvelopeSignature>;
  /** The actual payload that contains the SBOM reference data. */
  payload?: SbomReferenceIntotoPayload;
}

export const SBOMReferenceOccurrence: Schema.Schema<SBOMReferenceOccurrence> =
  Schema.suspend(() =>
    Schema.Struct({
      payloadType: Schema.optional(Schema.String),
      signatures: Schema.optional(Schema.Array(EnvelopeSignature)),
      payload: Schema.optional(SbomReferenceIntotoPayload),
    }),
  ).annotate({
    identifier: "SBOMReferenceOccurrence",
  }) as any as Schema.Schema<SBOMReferenceOccurrence>;

export interface Installation {
  /** Output only. The cpe_uri in [CPE format](https://cpe.mitre.org/specification/) denoting the package manager version distributing a package. The cpe_uri will be blank for language packages. */
  cpeUri?: string;
  /** Output only. The name of the installed package. */
  name?: string;
  /** Output only. The type of package; whether native or non native (e.g., ruby gems, node.js packages, etc.). */
  packageType?: string;
  /** Output only. The CPU architecture for which packages in this distribution channel were built. Architecture will be blank for language packages. */
  architecture?: "ARCHITECTURE_UNSPECIFIED" | "X86" | "X64" | (string & {});
  /** Output only. The version of the package. */
  version?: Version;
  /** All of the places within the filesystem versions of this package have been found. */
  location?: Array<Location>;
  /** Licenses that have been declared by the authors of the package. */
  license?: License;
}

export const Installation: Schema.Schema<Installation> = Schema.suspend(() =>
  Schema.Struct({
    cpeUri: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    packageType: Schema.optional(Schema.String),
    architecture: Schema.optional(Schema.String),
    version: Schema.optional(Version),
    location: Schema.optional(Schema.Array(Location)),
    license: Schema.optional(License),
  }),
).annotate({
  identifier: "Installation",
}) as any as Schema.Schema<Installation>;

export interface Occurrence {
  /** Describes a specific software bill of materials document. */
  sbom?: DocumentOccurrence;
  /** Describes how this resource derives from the basis in the associated note. */
  derivedImage?: Derived;
  /** Describes the initial scan status for this resource. */
  discovered?: Discovered;
  /** Output only. The time this `Occurrence` was last updated. */
  updateTime?: string;
  /** Describes the deployment of an artifact on a runtime. */
  deployment?: Deployment;
  /** Describes whether or not a resource passes compliance checks. */
  compliance?: ComplianceOccurrence;
  /** An analysis note associated with this image, in the form "providers/{provider_id}/notes/{NOTE_ID}" This field can be used as a filter in list requests. */
  noteName?: string;
  /** Build details for a verifiable build. */
  buildDetails?: BuildDetails;
  /** This represents a DSSE attestation occurrence */
  dsseAttestation?: DSSEAttestationOccurrence;
  /** The resource for which the `Occurrence` applies. */
  resource?: Resource;
  /** Describes an attestation of an artifact. */
  attestation?: Attestation;
  /** Output only. The time this `Occurrence` was created. */
  createTime?: string;
  /** Describes a specific relationship between SPDX elements. */
  spdxRelationship?: RelationshipOccurrence;
  /** A description of actions that can be taken to remedy the `Note` */
  remediation?: string;
  /** Describes a specific SPDX File. */
  spdxFile?: FileOccurrence;
  /** Describes an upgrade. */
  upgrade?: UpgradeOccurrence;
  /** This represents an SBOM reference occurrence */
  sbomReference?: SBOMReferenceOccurrence;
  /** https://github.com/secure-systems-lab/dsse */
  envelope?: Envelope;
  /** Describes the installation of a package on the linked resource. */
  installation?: Installation;
  /** Output only. This explicitly denotes which of the `Occurrence` details are specified. This field can be used as a filter in list requests. */
  kind?:
    | "KIND_UNSPECIFIED"
    | "PACKAGE_VULNERABILITY"
    | "BUILD_DETAILS"
    | "IMAGE_BASIS"
    | "PACKAGE_MANAGER"
    | "DEPLOYABLE"
    | "DISCOVERY"
    | "ATTESTATION_AUTHORITY"
    | "UPGRADE"
    | "COMPLIANCE"
    | "SBOM"
    | "SPDX_PACKAGE"
    | "SPDX_FILE"
    | "SPDX_RELATIONSHIP"
    | "DSSE_ATTESTATION"
    | "VULNERABILITY_ASSESSMENT"
    | "SBOM_REFERENCE"
    | "SECRET"
    | (string & {});
  /** Describes a specific SPDX Package. */
  spdxPackage?: PackageInfoOccurrence;
  /** The unique URL of the image or the container for which the `Occurrence` applies. For example, https://gcr.io/project/image@sha256:foo This field can be used as a filter in list requests. */
  resourceUrl?: string;
  /** Output only. The name of the `Occurrence` in the form "projects/{project_id}/occurrences/{OCCURRENCE_ID}" */
  name?: string;
  /** This represents a secret occurrence */
  secret?: SecretOccurrence;
  /** Details of a security vulnerability note. */
  vulnerabilityDetails?: VulnerabilityDetails;
}

export const Occurrence: Schema.Schema<Occurrence> = Schema.suspend(() =>
  Schema.Struct({
    sbom: Schema.optional(DocumentOccurrence),
    derivedImage: Schema.optional(Derived),
    discovered: Schema.optional(Discovered),
    updateTime: Schema.optional(Schema.String),
    deployment: Schema.optional(Deployment),
    compliance: Schema.optional(ComplianceOccurrence),
    noteName: Schema.optional(Schema.String),
    buildDetails: Schema.optional(BuildDetails),
    dsseAttestation: Schema.optional(DSSEAttestationOccurrence),
    resource: Schema.optional(Resource),
    attestation: Schema.optional(Attestation),
    createTime: Schema.optional(Schema.String),
    spdxRelationship: Schema.optional(RelationshipOccurrence),
    remediation: Schema.optional(Schema.String),
    spdxFile: Schema.optional(FileOccurrence),
    upgrade: Schema.optional(UpgradeOccurrence),
    sbomReference: Schema.optional(SBOMReferenceOccurrence),
    envelope: Schema.optional(Envelope),
    installation: Schema.optional(Installation),
    kind: Schema.optional(Schema.String),
    spdxPackage: Schema.optional(PackageInfoOccurrence),
    resourceUrl: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    secret: Schema.optional(SecretOccurrence),
    vulnerabilityDetails: Schema.optional(VulnerabilityDetails),
  }),
).annotate({ identifier: "Occurrence" }) as any as Schema.Schema<Occurrence>;

export interface ListOccurrencesResponse {
  /** The next pagination token in the list response. It should be used as `page_token` for the following request. An empty value means no more results. */
  nextPageToken?: string;
  /** The occurrences requested. */
  occurrences?: Array<Occurrence>;
}

export const ListOccurrencesResponse: Schema.Schema<ListOccurrencesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      occurrences: Schema.optional(Schema.Array(Occurrence)),
    }),
  ).annotate({
    identifier: "ListOccurrencesResponse",
  }) as any as Schema.Schema<ListOccurrencesResponse>;

export interface CreateOperationRequest {
  /** The operation to create. */
  operation?: Operation;
  /** The ID to use for this operation. */
  operationId?: string;
}

export const CreateOperationRequest: Schema.Schema<CreateOperationRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      operation: Schema.optional(Operation),
      operationId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CreateOperationRequest",
  }) as any as Schema.Schema<CreateOperationRequest>;

export interface SeverityCount {
  /** The severity of the occurrences. */
  severity?:
    | "SEVERITY_UNSPECIFIED"
    | "MINIMAL"
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "CRITICAL"
    | (string & {});
  /** The number of occurrences with the severity. */
  count?: string;
}

export const SeverityCount: Schema.Schema<SeverityCount> = Schema.suspend(() =>
  Schema.Struct({
    severity: Schema.optional(Schema.String),
    count: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "SeverityCount",
}) as any as Schema.Schema<SeverityCount>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalConfig {
  /** Whether or not approval is needed. If this is set on a build, it will become pending when created, and will need to be explicitly approved to start. */
  approvalRequired?: boolean;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalConfig: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      approvalRequired: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalConfig",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalConfig>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptionsPoolOption {
  /** The `WorkerPool` resource to execute the build on. You must have `cloudbuild.workerpools.use` on the project hosting the WorkerPool. Format projects/{project}/locations/{location}/workerPools/{workerPoolId} */
  name?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptionsPoolOption: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptionsPoolOption> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptionsPoolOption",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptionsPoolOption>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Volume {
  /** Name of the volume to mount. Volume names must be unique per build step and must be valid names for Docker volumes. Each named volume must be used by at least two build steps. */
  name?: string;
  /** Path at which to mount the volume. Paths must be absolute and cannot conflict with other volume paths on the same build step or with certain reserved volume paths. */
  path?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1Volume: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Volume> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      path: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1Volume",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Volume>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions {
  /** Compute Engine machine type on which to run the build. */
  machineType?:
    | "UNSPECIFIED"
    | "N1_HIGHCPU_8"
    | "N1_HIGHCPU_32"
    | "E2_HIGHCPU_8"
    | "E2_HIGHCPU_32"
    | "E2_MEDIUM"
    | (string & {});
  /** Optional. Option to specify whether structured logging is enabled. If true, JSON-formatted logs are parsed as structured logs. */
  enableStructuredLogging?: boolean;
  /** This field deprecated; please use `pool.name` instead. */
  workerPool?: string;
  /** A list of global environment variable definitions that will exist for all build steps in this build. If a variable is defined in both globally and in a build step, the variable will use the build step value. The elements are of the form "KEY=VALUE" for the environment variable "KEY" being given the value "VALUE". */
  env?: Array<string>;
  /** Optional. Specification for execution on a `WorkerPool`. See [running builds in a private pool](https://cloud.google.com/build/docs/private-pools/run-builds-in-private-pool) for more information. */
  pool?: ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptionsPoolOption;
  /** Requested verifiability options. */
  requestedVerifyOption?: "NOT_VERIFIED" | "VERIFIED" | (string & {});
  /** Requested hash for SourceProvenance. */
  sourceProvenanceHash?: Array<
    "NONE" | "SHA256" | "MD5" | "GO_MODULE_H1" | "SHA512" | (string & {})
  >;
  /** Option to specify whether or not to apply bash style string operations to the substitutions. NOTE: this is always enabled for triggered builds and cannot be overridden in the build configuration file. */
  dynamicSubstitutions?: boolean;
  /** Optional. Option to specify the Pub/Sub topic to receive build status updates. */
  pubsubTopic?: string;
  /** Option to define build log streaming behavior to Cloud Storage. */
  logStreamingOption?:
    | "STREAM_DEFAULT"
    | "STREAM_ON"
    | "STREAM_OFF"
    | (string & {});
  /** Option to specify behavior when there is an error in the substitution checks. NOTE: this is always set to ALLOW_LOOSE for triggered builds and cannot be overridden in the build configuration file. */
  substitutionOption?: "MUST_MATCH" | "ALLOW_LOOSE" | (string & {});
  /** Global list of volumes to mount for ALL build steps Each volume is created as an empty volume prior to starting the build process. Upon completion of the build, volumes and their contents are discarded. Global volume names and paths cannot conflict with the volumes defined a build step. Using a global volume in a build with only one step is not valid as it is indicative of a build request with an incorrect configuration. */
  volumes?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1Volume>;
  /** Option to specify the logging mode, which determines if and where build logs are stored. */
  logging?:
    | "LOGGING_UNSPECIFIED"
    | "LEGACY"
    | "GCS_ONLY"
    | "STACKDRIVER_ONLY"
    | "CLOUD_LOGGING_ONLY"
    | "NONE"
    | (string & {});
  /** Optional. Option to specify how default logs buckets are setup. */
  defaultLogsBucketBehavior?:
    | "DEFAULT_LOGS_BUCKET_BEHAVIOR_UNSPECIFIED"
    | "REGIONAL_USER_OWNED_BUCKET"
    | "LEGACY_BUCKET"
    | (string & {});
  /** Requested disk size for the VM that runs the build. Note that this is *NOT* "disk free"; some of the space will be used by the operating system and build utilities. Also note that this is the minimum disk size that will be allocated for the build -- the build may run with a larger disk than requested. At present, the maximum disk size is 4000GB; builds that request more than the maximum are rejected with an error. */
  diskSizeGb?: string;
  /** Option to include built-in and custom substitutions as env variables for all build steps. */
  automapSubstitutions?: boolean;
  /** A list of global environment variables, which are encrypted using a Cloud Key Management Service crypto key. These values must be specified in the build's `Secret`. These variables will be available to all build steps in this build. */
  secretEnv?: Array<string>;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions> =
  Schema.suspend(() =>
    Schema.Struct({
      machineType: Schema.optional(Schema.String),
      enableStructuredLogging: Schema.optional(Schema.Boolean),
      workerPool: Schema.optional(Schema.String),
      env: Schema.optional(Schema.Array(Schema.String)),
      pool: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptionsPoolOption,
      ),
      requestedVerifyOption: Schema.optional(Schema.String),
      sourceProvenanceHash: Schema.optional(Schema.Array(Schema.String)),
      dynamicSubstitutions: Schema.optional(Schema.Boolean),
      pubsubTopic: Schema.optional(Schema.String),
      logStreamingOption: Schema.optional(Schema.String),
      substitutionOption: Schema.optional(Schema.String),
      volumes: Schema.optional(
        Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1Volume),
      ),
      logging: Schema.optional(Schema.String),
      defaultLogsBucketBehavior: Schema.optional(Schema.String),
      diskSizeGb: Schema.optional(Schema.String),
      automapSubstitutions: Schema.optional(Schema.Boolean),
      secretEnv: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1SecretManagerSecret {
  /** Environment variable name to associate with the secret. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step. */
  env?: string;
  /** Resource name of the SecretVersion. In format: projects/* /secrets/* /versions/* */
  versionName?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1SecretManagerSecret: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1SecretManagerSecret> =
  Schema.suspend(() =>
    Schema.Struct({
      env: Schema.optional(Schema.String),
      versionName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "ContaineranalysisGoogleDevtoolsCloudbuildV1SecretManagerSecret",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1SecretManagerSecret>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Secrets {
  /** Secrets encrypted with KMS key and the associated secret environment variable. */
  inline?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret>;
  /** Secrets in Secret Manager and associated secret environment variable. */
  secretManager?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1SecretManagerSecret>;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1Secrets: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Secrets> =
  Schema.suspend(() =>
    Schema.Struct({
      inline: Schema.optional(
        Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1InlineSecret),
      ),
      secretManager: Schema.optional(
        Schema.Array(
          ContaineranalysisGoogleDevtoolsCloudbuildV1SecretManagerSecret,
        ),
      ),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1Secrets",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Secrets>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedNpmPackage {
  /** Output only. Stores timing information for pushing the specified artifact. */
  pushTiming?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
  /** Hash types and values of the npm package. */
  fileHashes?: ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes;
  /** URI of the uploaded npm package. */
  uri?: string;
  /** Output only. Path to the artifact in Artifact Registry. */
  artifactRegistryPackage?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedNpmPackage: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedNpmPackage> =
  Schema.suspend(() =>
    Schema.Struct({
      pushTiming: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan,
      ),
      fileHashes: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes,
      ),
      uri: Schema.optional(Schema.String),
      artifactRegistryPackage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedNpmPackage",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedNpmPackage>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1BuildFailureInfo {
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

export const ContaineranalysisGoogleDevtoolsCloudbuildV1BuildFailureInfo: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildFailureInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      detail: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1BuildFailureInfo",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildFailureInfo>;

export interface Deployable {
  /** Resource URI for the artifact being deployed. */
  resourceUri?: Array<string>;
}

export const Deployable: Schema.Schema<Deployable> = Schema.suspend(() =>
  Schema.Struct({
    resourceUri: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({ identifier: "Deployable" }) as any as Schema.Schema<Deployable>;

export interface UpgradeNote {
  /** Required - The version of the package in machine + human readable form. */
  version?: Version;
  /** Required - The package this Upgrade is for. */
  package?: string;
  /** Metadata about the upgrade for each specific operating system. */
  distributions?: Array<UpgradeDistribution>;
}

export const UpgradeNote: Schema.Schema<UpgradeNote> = Schema.suspend(() =>
  Schema.Struct({
    version: Schema.optional(Version),
    package: Schema.optional(Schema.String),
    distributions: Schema.optional(Schema.Array(UpgradeDistribution)),
  }),
).annotate({ identifier: "UpgradeNote" }) as any as Schema.Schema<UpgradeNote>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact {
  /** Output only. Path to the artifact in Artifact Registry. */
  artifactRegistryPackage?: string;
  /** URI of the uploaded artifact. */
  uri?: string;
  /** Output only. Stores timing information for pushing the specified artifact. */
  pushTiming?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
  /** Hash types and values of the Maven Artifact. */
  fileHashes?: ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact> =
  Schema.suspend(() =>
    Schema.Struct({
      artifactRegistryPackage: Schema.optional(Schema.String),
      uri: Schema.optional(Schema.String),
      pushTiming: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan,
      ),
      fileHashes: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1FileHashes,
      ),
    }),
  ).annotate({
    identifier:
      "ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Results {
  /** Path to the artifact manifest for non-container artifacts uploaded to Cloud Storage. Only populated when artifacts are uploaded to Cloud Storage. */
  artifactManifest?: string;
  /** Python artifacts uploaded to Artifact Registry at the end of the build. */
  pythonPackages?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage>;
  /** List of build step outputs, produced by builder images, in the order corresponding to build step indices. [Cloud Builders](https://cloud.google.com/cloud-build/docs/cloud-builders) can produce this output by writing to `$BUILDER_OUTPUT/output`. Only the first 50KB of data is stored. Note that the `$BUILDER_OUTPUT` variable is read-only and can't be substituted. */
  buildStepOutputs?: Array<string>;
  /** Maven artifacts uploaded to Artifact Registry at the end of the build. */
  mavenArtifacts?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact>;
  /** Optional. Go module artifacts uploaded to Artifact Registry at the end of the build. */
  goModules?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedGoModule>;
  /** Time to push all non-container artifacts to Cloud Storage. */
  artifactTiming?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
  /** Number of non-container artifacts uploaded to Cloud Storage. Only populated when artifacts are uploaded to Cloud Storage. */
  numArtifacts?: string;
  /** List of build step digests, in the order corresponding to build step indices. */
  buildStepImages?: Array<string>;
  /** Container images that were built as a part of the build. */
  images?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1BuiltImage>;
  /** Npm packages uploaded to Artifact Registry at the end of the build. */
  npmPackages?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedNpmPackage>;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1Results: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Results> =
  Schema.suspend(() =>
    Schema.Struct({
      artifactManifest: Schema.optional(Schema.String),
      pythonPackages: Schema.optional(
        Schema.Array(
          ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedPythonPackage,
        ),
      ),
      buildStepOutputs: Schema.optional(Schema.Array(Schema.String)),
      mavenArtifacts: Schema.optional(
        Schema.Array(
          ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedMavenArtifact,
        ),
      ),
      goModules: Schema.optional(
        Schema.Array(
          ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedGoModule,
        ),
      ),
      artifactTiming: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan,
      ),
      numArtifacts: Schema.optional(Schema.String),
      buildStepImages: Schema.optional(Schema.Array(Schema.String)),
      images: Schema.optional(
        Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1BuiltImage),
      ),
      npmPackages: Schema.optional(
        Schema.Array(
          ContaineranalysisGoogleDevtoolsCloudbuildV1UploadedNpmPackage,
        ),
      ),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1Results",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Results>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep {
  /** Unique identifier for this build step, used in `wait_for` to reference this build step as a dependency. */
  id?: string;
  /** A list of environment variable definitions to be used when running a step. The elements are of the form "KEY=VALUE" for the environment variable "KEY" being given the value "VALUE". */
  env?: Array<string>;
  /** A list of arguments that will be presented to the step when it is started. If the image used to run the step's container has an entrypoint, the `args` are used as arguments to that entrypoint. If the image does not define an entrypoint, the first element in args is used as the entrypoint, and the remainder will be used as arguments. */
  args?: Array<string>;
  /** Option to include built-in and custom substitutions as env variables for this build step. This option will override the global option in BuildOption. */
  automapSubstitutions?: boolean;
  /** Required. The name of the container image that will run this particular build step. If the image is available in the host's Docker daemon's cache, it will be run directly. If not, the host will attempt to pull the image first, using the builder service account's credentials if necessary. The Docker daemon's cache will already have the latest versions of all of the officially supported build steps ([https://github.com/GoogleCloudPlatform/cloud-builders](https://github.com/GoogleCloudPlatform/cloud-builders)). The Docker daemon will also have cached many of the layers for some popular images, like "ubuntu", "debian", but they will be refreshed at the time you attempt to use them. If you built an image in a previous build step, it will be stored in the host's Docker daemon's cache and is available to use as the name for a later build step. */
  name?: string;
  /** Output only. Return code from running the step. */
  exitCode?: number;
  /** A list of environment variables which are encrypted using a Cloud Key Management Service crypto key. These values must be specified in the build's `Secret`. */
  secretEnv?: Array<string>;
  /** Output only. Stores timing information for executing this build step. */
  timing?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
  /** Working directory to use when running this step's container. If this value is a relative path, it is relative to the build's working directory. If this value is absolute, it may be outside the build's working directory, in which case the contents of the path may not be persisted across build step executions, unless a `volume` for that path is specified. If the build specifies a `RepoSource` with `dir` and a step with a `dir`, which specifies an absolute path, the `RepoSource` `dir` is ignored for the step's execution. */
  dir?: string;
  /** Allow this build step to fail without failing the entire build if and only if the exit code is one of the specified codes. If allow_failure is also specified, this field will take precedence. */
  allowExitCodes?: Array<number>;
  /** Time limit for executing this build step. If not defined, the step has no time limit and will be allowed to continue to run until either it completes or the build itself times out. */
  timeout?: string;
  /** Allow this build step to fail without failing the entire build. If false, the entire build will fail if this step fails. Otherwise, the build will succeed, but this step will still have a failure status. Error information will be reported in the failure_detail field. */
  allowFailure?: boolean;
  /** List of volumes to mount into the build step. Each volume is created as an empty volume prior to execution of the build step. Upon completion of the build, volumes and their contents are discarded. Using a named volume in only one step is not valid as it is indicative of a build request with an incorrect configuration. */
  volumes?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1Volume>;
  /** Entrypoint to be used instead of the build step image's default entrypoint. If unset, the image's default entrypoint is used. */
  entrypoint?: string;
  /** Output only. Stores timing information for pulling this build step's builder image only. */
  pullTiming?: ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan;
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
  /** The ID(s) of the step(s) that this build step depends on. This build step will not start until all the build steps in `wait_for` have completed successfully. If `wait_for` is empty, this build step will start when all previous build steps in the `Build.Steps` list have completed successfully. */
  waitFor?: Array<string>;
  /** A shell script to be executed in the step. When script is provided, the user cannot specify the entrypoint or args. */
  script?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep> =
  Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      env: Schema.optional(Schema.Array(Schema.String)),
      args: Schema.optional(Schema.Array(Schema.String)),
      automapSubstitutions: Schema.optional(Schema.Boolean),
      name: Schema.optional(Schema.String),
      exitCode: Schema.optional(Schema.Number),
      secretEnv: Schema.optional(Schema.Array(Schema.String)),
      timing: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan,
      ),
      dir: Schema.optional(Schema.String),
      allowExitCodes: Schema.optional(Schema.Array(Schema.Number)),
      timeout: Schema.optional(Schema.String),
      allowFailure: Schema.optional(Schema.Boolean),
      volumes: Schema.optional(
        Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1Volume),
      ),
      entrypoint: Schema.optional(Schema.String),
      pullTiming: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan,
      ),
      status: Schema.optional(Schema.String),
      waitFor: Schema.optional(Schema.Array(Schema.String)),
      script: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep>;

export interface SecretNote {}

export const SecretNote: Schema.Schema<SecretNote> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "SecretNote" }) as any as Schema.Schema<SecretNote>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceRepository {
  /** Location of the Git repository. */
  url?: string;
  /** The Developer Connect Git repository link formatted as `projects/* /locations/* /connections/* /gitRepositoryLink/*` */
  developerConnect?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceRepository: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceRepository> =
  Schema.suspend(() =>
    Schema.Struct({
      url: Schema.optional(Schema.String),
      developerConnect: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceRepository",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceRepository>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceDependency {
  /** Required. The revision that we will fetch the repo at. */
  revision?: string;
  /** Required. Where should the files be placed on the worker. */
  destPath?: string;
  /** Optional. How much history should be fetched for the build (default 1, -1 for all history). */
  depth?: string;
  /** Optional. True if submodules should be fetched too (default false). */
  recurseSubmodules?: boolean;
  /** Required. The kind of repo (url or dev connect). */
  repository?: ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceRepository;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceDependency: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceDependency> =
  Schema.suspend(() =>
    Schema.Struct({
      revision: Schema.optional(Schema.String),
      destPath: Schema.optional(Schema.String),
      depth: Schema.optional(Schema.String),
      recurseSubmodules: Schema.optional(Schema.Boolean),
      repository: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceRepository,
      ),
    }),
  ).annotate({
    identifier:
      "ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceDependency",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceDependency>;

export interface BuildType {
  /** Signature of the build in Occurrences pointing to the Note containing this `BuilderDetails`. */
  signature?: BuildSignature;
  /** Version of the builder which produced this Note. */
  builderVersion?: string;
}

export const BuildType: Schema.Schema<BuildType> = Schema.suspend(() =>
  Schema.Struct({
    signature: Schema.optional(BuildSignature),
    builderVersion: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "BuildType" }) as any as Schema.Schema<BuildType>;

export interface Basis {
  /** The fingerprint of the base image. */
  fingerprint?: Fingerprint;
  /** The resource_url for the resource representing the basis of associated occurrence images. */
  resourceUrl?: string;
}

export const Basis: Schema.Schema<Basis> = Schema.suspend(() =>
  Schema.Struct({
    fingerprint: Schema.optional(Fingerprint),
    resourceUrl: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Basis" }) as any as Schema.Schema<Basis>;

export interface Assessment {
  /** Specifies details on how to handle (and presumably, fix) a vulnerability. */
  remediations?: Array<Remediation>;
  /** Justification provides the justification when the state of the assessment if NOT_AFFECTED. */
  justification?: Justification;
  /** Provides the state of this Vulnerability assessment. */
  state?:
    | "STATE_UNSPECIFIED"
    | "AFFECTED"
    | "NOT_AFFECTED"
    | "FIXED"
    | "UNDER_INVESTIGATION"
    | (string & {});
  /** Holds a list of references associated with this vulnerability item and assessment. These uris have additional information about the vulnerability and the assessment itself. E.g. Link to a document which details how this assessment concluded the state of this vulnerability. */
  relatedUris?: Array<URI>;
  /** Contains information about the impact of this vulnerability, this will change with time. */
  impacts?: Array<string>;
  /** The vulnerability identifier for this Assessment. Will hold one of common identifiers e.g. CVE, GHSA etc. */
  vulnerabilityId?: string;
  /** A detailed description of this Vex. */
  longDescription?: string;
  /** Holds the MITRE standard Common Vulnerabilities and Exposures (CVE) tracking number for the vulnerability. */
  cve?: string;
  /** A one sentence description of this Vex. */
  shortDescription?: string;
}

export const Assessment: Schema.Schema<Assessment> = Schema.suspend(() =>
  Schema.Struct({
    remediations: Schema.optional(Schema.Array(Remediation)),
    justification: Schema.optional(Justification),
    state: Schema.optional(Schema.String),
    relatedUris: Schema.optional(Schema.Array(URI)),
    impacts: Schema.optional(Schema.Array(Schema.String)),
    vulnerabilityId: Schema.optional(Schema.String),
    longDescription: Schema.optional(Schema.String),
    cve: Schema.optional(Schema.String),
    shortDescription: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Assessment" }) as any as Schema.Schema<Assessment>;

export interface VulnerabilityAssessmentNote {
  /** The title of the note. E.g. `Vex-Debian-11.4` */
  title?: string;
  /** A one sentence description of this Vex. */
  shortDescription?: string;
  /** Publisher details of this Note. */
  publisher?: Publisher;
  /** Represents a vulnerability assessment for the product. */
  assessment?: Assessment;
  /** A detailed description of this Vex. */
  longDescription?: string;
  /** The product affected by this vex. */
  product?: Product;
  /** Identifies the language used by this document, corresponding to IETF BCP 47 / RFC 5646. */
  languageCode?: string;
}

export const VulnerabilityAssessmentNote: Schema.Schema<VulnerabilityAssessmentNote> =
  Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      shortDescription: Schema.optional(Schema.String),
      publisher: Schema.optional(Publisher),
      assessment: Schema.optional(Assessment),
      longDescription: Schema.optional(Schema.String),
      product: Schema.optional(Product),
      languageCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "VulnerabilityAssessmentNote",
  }) as any as Schema.Schema<VulnerabilityAssessmentNote>;

export interface FileNote {
  /** Identify the full path and filename that corresponds to the file information in this section */
  title?: string;
  /** This field provides information about the type of file identified */
  fileType?:
    | "FILE_TYPE_UNSPECIFIED"
    | "SOURCE"
    | "BINARY"
    | "ARCHIVE"
    | "APPLICATION"
    | "AUDIO"
    | "IMAGE"
    | "TEXT"
    | "VIDEO"
    | "DOCUMENTATION"
    | "SPDX"
    | "OTHER"
    | (string & {});
  /** Provide a unique identifier to match analysis information on each specific file in a package */
  checksum?: Array<string>;
}

export const FileNote: Schema.Schema<FileNote> = Schema.suspend(() =>
  Schema.Struct({
    title: Schema.optional(Schema.String),
    fileType: Schema.optional(Schema.String),
    checksum: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({ identifier: "FileNote" }) as any as Schema.Schema<FileNote>;

export interface Discovery {
  /** The kind of analysis that is handled by this discovery. */
  analysisKind?:
    | "KIND_UNSPECIFIED"
    | "PACKAGE_VULNERABILITY"
    | "BUILD_DETAILS"
    | "IMAGE_BASIS"
    | "PACKAGE_MANAGER"
    | "DEPLOYABLE"
    | "DISCOVERY"
    | "ATTESTATION_AUTHORITY"
    | "UPGRADE"
    | "COMPLIANCE"
    | "SBOM"
    | "SPDX_PACKAGE"
    | "SPDX_FILE"
    | "SPDX_RELATIONSHIP"
    | "DSSE_ATTESTATION"
    | "VULNERABILITY_ASSESSMENT"
    | "SBOM_REFERENCE"
    | "SECRET"
    | (string & {});
}

export const Discovery: Schema.Schema<Discovery> = Schema.suspend(() =>
  Schema.Struct({
    analysisKind: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Discovery" }) as any as Schema.Schema<Discovery>;

export interface Note {
  /** A note describing a secret. */
  secret?: SecretNote;
  /** A note describing an attestation role. */
  attestationAuthority?: AttestationAuthority;
  /** A note describing a relationship between SPDX elements. */
  spdxRelationship?: RelationshipNote;
  /** Output only. This explicitly denotes which kind of note is specified. This field can be used as a filter in list requests. */
  kind?:
    | "KIND_UNSPECIFIED"
    | "PACKAGE_VULNERABILITY"
    | "BUILD_DETAILS"
    | "IMAGE_BASIS"
    | "PACKAGE_MANAGER"
    | "DEPLOYABLE"
    | "DISCOVERY"
    | "ATTESTATION_AUTHORITY"
    | "UPGRADE"
    | "COMPLIANCE"
    | "SBOM"
    | "SPDX_PACKAGE"
    | "SPDX_FILE"
    | "SPDX_RELATIONSHIP"
    | "DSSE_ATTESTATION"
    | "VULNERABILITY_ASSESSMENT"
    | "SBOM_REFERENCE"
    | "SECRET"
    | (string & {});
  /** Build provenance type for a verifiable build. */
  buildType?: BuildType;
  /** A one sentence description of this `Note`. */
  shortDescription?: string;
  /** A note describing an upgrade. */
  upgrade?: UpgradeNote;
  /** A note describing a base image. */
  baseImage?: Basis;
  /** A note describing something that can be deployed. */
  deployable?: Deployable;
  /** A note describing a compliance check. */
  compliance?: ComplianceNote;
  /** A note describing a vulnerability assessment. */
  vulnerabilityAssessment?: VulnerabilityAssessmentNote;
  /** A detailed description of this `Note`. */
  longDescription?: string;
  /** The name of the note in the form "projects/{provider_project_id}/notes/{NOTE_ID}" */
  name?: string;
  /** A note describing a package hosted by various package managers. */
  package?: Package;
  /** A note describing an SPDX Package. */
  spdxPackage?: PackageInfoNote;
  /** A note describing a software bill of materials. */
  sbom?: DocumentNote;
  /** Time of expiration for this note, null if note does not expire. */
  expirationTime?: string;
  /** Output only. The time this note was created. This field can be used as a filter in list requests. */
  createTime?: string;
  /** Output only. The time this note was last updated. This field can be used as a filter in list requests. */
  updateTime?: string;
  /** A note describing a reference to an SBOM. */
  sbomReference?: SBOMReferenceNote;
  /** A note describing an SPDX File. */
  spdxFile?: FileNote;
  /** A note describing a provider/analysis type. */
  discovery?: Discovery;
  /** A note describing a dsse attestation note. */
  dsseAttestation?: DSSEAttestationNote;
  /** A package vulnerability type of note. */
  vulnerabilityType?: VulnerabilityType;
  /** URLs associated with this note */
  relatedUrl?: Array<RelatedUrl>;
}

export const Note: Schema.Schema<Note> = Schema.suspend(() =>
  Schema.Struct({
    secret: Schema.optional(SecretNote),
    attestationAuthority: Schema.optional(AttestationAuthority),
    spdxRelationship: Schema.optional(RelationshipNote),
    kind: Schema.optional(Schema.String),
    buildType: Schema.optional(BuildType),
    shortDescription: Schema.optional(Schema.String),
    upgrade: Schema.optional(UpgradeNote),
    baseImage: Schema.optional(Basis),
    deployable: Schema.optional(Deployable),
    compliance: Schema.optional(ComplianceNote),
    vulnerabilityAssessment: Schema.optional(VulnerabilityAssessmentNote),
    longDescription: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    package: Schema.optional(Package),
    spdxPackage: Schema.optional(PackageInfoNote),
    sbom: Schema.optional(DocumentNote),
    expirationTime: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
    updateTime: Schema.optional(Schema.String),
    sbomReference: Schema.optional(SBOMReferenceNote),
    spdxFile: Schema.optional(FileNote),
    discovery: Schema.optional(Discovery),
    dsseAttestation: Schema.optional(DSSEAttestationNote),
    vulnerabilityType: Schema.optional(VulnerabilityType),
    relatedUrl: Schema.optional(Schema.Array(RelatedUrl)),
  }),
).annotate({ identifier: "Note" }) as any as Schema.Schema<Note>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalResult {
  /** Output only. Email of the user that called the ApproveBuild API to approve or reject a build at the time that the API was called. */
  approverAccount?: string;
  /** Output only. The time when the approval decision was made. */
  approvalTime?: string;
  /** Required. The decision of this manual approval. */
  decision?: "DECISION_UNSPECIFIED" | "APPROVED" | "REJECTED" | (string & {});
  /** Optional. An optional URL tied to this manual approval result. This field is essentially the same as comment, except that it will be rendered by the UI differently. An example use case is a link to an external job that approved this Build. */
  url?: string;
  /** Optional. An optional comment for this manual approval result. */
  comment?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalResult: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalResult> =
  Schema.suspend(() =>
    Schema.Struct({
      approverAccount: Schema.optional(Schema.String),
      approvalTime: Schema.optional(Schema.String),
      decision: Schema.optional(Schema.String),
      url: Schema.optional(Schema.String),
      comment: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalResult",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalResult>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestIamPermissionsRequest",
  }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface GoogleDevtoolsContaineranalysisV1alpha1OperationMetadata {
  /** Output only. The time that this operation was marked completed or failed. */
  endTime?: string;
  /** Output only. The time this operation was created. */
  createTime?: string;
}

export const GoogleDevtoolsContaineranalysisV1alpha1OperationMetadata: Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1OperationMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      endTime: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleDevtoolsContaineranalysisV1alpha1OperationMetadata",
  }) as any as Schema.Schema<GoogleDevtoolsContaineranalysisV1alpha1OperationMetadata>;

export interface ListScanConfigsResponse {
  /** A page token to pass in order to get more scan configs. */
  nextPageToken?: string;
  /** The set of scan configs. */
  scanConfigs?: Array<ScanConfig>;
}

export const ListScanConfigsResponse: Schema.Schema<ListScanConfigsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      scanConfigs: Schema.optional(Schema.Array(ScanConfig)),
    }),
  ).annotate({
    identifier: "ListScanConfigsResponse",
  }) as any as Schema.Schema<ListScanConfigsResponse>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfigHttpConfig {
  /** SecretVersion resource of the HTTP proxy URL. The Service Account used in the build (either the default Service Account or user-specified Service Account) should have `secretmanager.versions.access` permissions on this secret. The proxy URL should be in format `protocol://@]proxyhost[:port]`. */
  proxySecretVersionName?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfigHttpConfig: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfigHttpConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      proxySecretVersionName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfigHttpConfig",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfigHttpConfig>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfig {
  /** Configuration for HTTP related git operations. */
  http?: ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfigHttpConfig;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfig: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      http: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfigHttpConfig,
      ),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfig",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfig>;

export interface ListNoteOccurrencesResponse {
  /** Token to receive the next page of notes. */
  nextPageToken?: string;
  /** The occurrences attached to the specified note. */
  occurrences?: Array<Occurrence>;
}

export const ListNoteOccurrencesResponse: Schema.Schema<ListNoteOccurrencesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      occurrences: Schema.optional(Schema.Array(Occurrence)),
    }),
  ).annotate({
    identifier: "ListNoteOccurrencesResponse",
  }) as any as Schema.Schema<ListNoteOccurrencesResponse>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface ListNotesResponse {
  /** The occurrences requested */
  notes?: Array<Note>;
  /** The next pagination token in the list response. It should be used as page_token for the following request. An empty value means no more result. */
  nextPageToken?: string;
}

export const ListNotesResponse: Schema.Schema<ListNotesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      notes: Schema.optional(Schema.Array(Note)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListNotesResponse",
  }) as any as Schema.Schema<ListNotesResponse>;

export interface UpdateOperationRequest {
  /** The fields to update. */
  updateMask?: string;
  /** The operation to create. */
  operation?: Operation;
}

export const UpdateOperationRequest: Schema.Schema<UpdateOperationRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      updateMask: Schema.optional(Schema.String),
      operation: Schema.optional(Operation),
    }),
  ).annotate({
    identifier: "UpdateOperationRequest",
  }) as any as Schema.Schema<UpdateOperationRequest>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1BuildWarning {
  /** The priority for this warning. */
  priority?:
    | "PRIORITY_UNSPECIFIED"
    | "INFO"
    | "WARNING"
    | "ALERT"
    | (string & {});
  /** Explanation of the warning generated. */
  text?: string;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1BuildWarning: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildWarning> =
  Schema.suspend(() =>
    Schema.Struct({
      priority: Schema.optional(Schema.String),
      text: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1BuildWarning",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildWarning>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Secret {
  /** Cloud KMS key name to use to decrypt these envs. */
  kmsKeyName?: string;
  /** Map of environment variable name to its encrypted value. Secret environment variables must be unique across all of a build's secrets, and must be used by at least one build step. Values can be at most 64 KB in size. There can be at most 100 secret values across all of a build's secrets. */
  secretEnv?: Record<string, string>;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1Secret: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Secret> =
  Schema.suspend(() =>
    Schema.Struct({
      kmsKeyName: Schema.optional(Schema.String),
      secretEnv: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1Secret",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Secret>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Dependency {
  /** If set to true disable all dependency fetching (ignoring the default source as well). */
  empty?: boolean;
  /** Represents a git repository as a build dependency. */
  gitSource?: ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceDependency;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1Dependency: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Dependency> =
  Schema.suspend(() =>
    Schema.Struct({
      empty: Schema.optional(Schema.Boolean),
      gitSource: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1DependencyGitSourceDependency,
      ),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1Dependency",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Dependency>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1BuildApproval {
  /** Output only. Configuration for manual approval of this build. */
  config?: ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalConfig;
  /** Output only. The state of this build's approval. */
  state?:
    | "STATE_UNSPECIFIED"
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "CANCELLED"
    | (string & {});
  /** Output only. Result of manual approval for this Build. */
  result?: ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalResult;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1BuildApproval: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildApproval> =
  Schema.suspend(() =>
    Schema.Struct({
      config: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalConfig,
      ),
      state: Schema.optional(Schema.String),
      result: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1ApprovalResult,
      ),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1BuildApproval",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildApproval>;

export interface GetVulnzOccurrencesSummaryResponse {
  /** A map of how many occurrences were found for each severity. */
  counts?: Array<SeverityCount>;
}

export const GetVulnzOccurrencesSummaryResponse: Schema.Schema<GetVulnzOccurrencesSummaryResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      counts: Schema.optional(Schema.Array(SeverityCount)),
    }),
  ).annotate({
    identifier: "GetVulnzOccurrencesSummaryResponse",
  }) as any as Schema.Schema<GetVulnzOccurrencesSummaryResponse>;

export interface ContaineranalysisGoogleDevtoolsCloudbuildV1Build {
  /** Output only. A permanent fixed identifier for source. */
  sourceProvenance?: ContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance;
  /** Output only. URL to logs for this build in Google Cloud Console. */
  logUrl?: string;
  /** Amount of time that this build should be allowed to run, to second granularity. If this amount of time elapses, work on the build will cease and the build status will be `TIMEOUT`. `timeout` starts ticking from `startTime`. Default time is 60 minutes. */
  timeout?: string;
  /** Output only. ID of the project. */
  projectId?: string;
  /** Output only. Unique identifier of the build. */
  id?: string;
  /** Optional. The location of the source files to build. */
  source?: ContaineranalysisGoogleDevtoolsCloudbuildV1Source;
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
  /** Secrets and secret environment variables. */
  availableSecrets?: ContaineranalysisGoogleDevtoolsCloudbuildV1Secrets;
  /** Output only. The ID of the `BuildTrigger` that triggered this build, if it was triggered automatically. */
  buildTriggerId?: string;
  /** Output only. Describes this build's approval configuration, status, and result. */
  approval?: ContaineranalysisGoogleDevtoolsCloudbuildV1BuildApproval;
  /** Output only. Time at which execution of the build was finished. The difference between finish_time and start_time is the duration of the build's execution. */
  finishTime?: string;
  /** Output only. Contains information about the build when status=FAILURE. */
  failureInfo?: ContaineranalysisGoogleDevtoolsCloudbuildV1BuildFailureInfo;
  /** Output only. Results of the build. */
  results?: ContaineranalysisGoogleDevtoolsCloudbuildV1Results;
  /** Cloud Storage bucket where logs should be written (see [Bucket Name Requirements](https://cloud.google.com/storage/docs/bucket-naming#requirements)). Logs file names will be of the format `${logs_bucket}/log-${build_id}.txt`. */
  logsBucket?: string;
  /** Optional. Configuration for git operations. */
  gitConfig?: ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfig;
  /** Output only. Time at which the request to create the build was received. */
  createTime?: string;
  /** Optional. Dependencies that the Cloud Build worker will fetch before executing user steps. */
  dependencies?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1Dependency>;
  /** Tags for annotation of a `Build`. These are not docker tags. */
  tags?: Array<string>;
  /** Output only. Non-fatal problems encountered during the execution of the build. */
  warnings?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildWarning>;
  /** Artifacts produced by the build that should be uploaded upon successful completion of all build steps. */
  artifacts?: ContaineranalysisGoogleDevtoolsCloudbuildV1Artifacts;
  /** TTL in queue for this build. If provided and the build is enqueued longer than this value, the build will expire and the build status will be `EXPIRED`. The TTL starts ticking from create_time. */
  queueTtl?: string;
  /** Output only. Stores timing information for phases of the build. Valid keys are: * BUILD: time to execute all build steps. * PUSH: time to push all artifacts including docker images and non docker artifacts. * FETCHSOURCE: time to fetch source. * SETUPBUILD: time to set up build. If the build does not specify source or images, these keys will not be included. */
  timing?: Record<string, ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan>;
  /** Secrets to decrypt using Cloud Key Management Service. Note: Secret Manager is the recommended technique for managing sensitive data with Cloud Build. Use `available_secrets` to configure builds to access secrets from Secret Manager. For instructions, see: https://cloud.google.com/cloud-build/docs/securing-builds/use-secrets */
  secrets?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1Secret>;
  /** Output only. The 'Build' name with format: `projects/{project}/locations/{location}/builds/{build}`, where {build} is a unique identifier generated by the service. */
  name?: string;
  /** IAM service account whose credentials will be used at build runtime. Must be of the format `projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}`. ACCOUNT can be email address or uniqueId of the service account. */
  serviceAccount?: string;
  /** A list of images to be pushed upon the successful completion of all build steps. The images are pushed using the builder service account's credentials. The digests of the pushed images will be stored in the `Build` resource's results field. If any of the images fail to be pushed, the build status is marked `FAILURE`. */
  images?: Array<string>;
  /** Substitutions data for `Build` resource. */
  substitutions?: Record<string, string>;
  /** Special options for this build. */
  options?: ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions;
  /** Output only. Time at which execution of the build was started. */
  startTime?: string;
  /** Output only. Customer-readable message about the current status. */
  statusDetail?: string;
  /** Required. The operations to be performed on the workspace. */
  steps?: Array<ContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep>;
}

export const ContaineranalysisGoogleDevtoolsCloudbuildV1Build: Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Build> =
  Schema.suspend(() =>
    Schema.Struct({
      sourceProvenance: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1SourceProvenance,
      ),
      logUrl: Schema.optional(Schema.String),
      timeout: Schema.optional(Schema.String),
      projectId: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      source: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1Source,
      ),
      status: Schema.optional(Schema.String),
      availableSecrets: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1Secrets,
      ),
      buildTriggerId: Schema.optional(Schema.String),
      approval: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1BuildApproval,
      ),
      finishTime: Schema.optional(Schema.String),
      failureInfo: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1BuildFailureInfo,
      ),
      results: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1Results,
      ),
      logsBucket: Schema.optional(Schema.String),
      gitConfig: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1GitConfig,
      ),
      createTime: Schema.optional(Schema.String),
      dependencies: Schema.optional(
        Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1Dependency),
      ),
      tags: Schema.optional(Schema.Array(Schema.String)),
      warnings: Schema.optional(
        Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1BuildWarning),
      ),
      artifacts: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1Artifacts,
      ),
      queueTtl: Schema.optional(Schema.String),
      timing: Schema.optional(
        Schema.Record(
          Schema.String,
          ContaineranalysisGoogleDevtoolsCloudbuildV1TimeSpan,
        ),
      ),
      secrets: Schema.optional(
        Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1Secret),
      ),
      name: Schema.optional(Schema.String),
      serviceAccount: Schema.optional(Schema.String),
      images: Schema.optional(Schema.Array(Schema.String)),
      substitutions: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      options: Schema.optional(
        ContaineranalysisGoogleDevtoolsCloudbuildV1BuildOptions,
      ),
      startTime: Schema.optional(Schema.String),
      statusDetail: Schema.optional(Schema.String),
      steps: Schema.optional(
        Schema.Array(ContaineranalysisGoogleDevtoolsCloudbuildV1BuildStep),
      ),
    }),
  ).annotate({
    identifier: "ContaineranalysisGoogleDevtoolsCloudbuildV1Build",
  }) as any as Schema.Schema<ContaineranalysisGoogleDevtoolsCloudbuildV1Build>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetVulnerabilitySummaryProjectsOccurrencesRequest {
  /** The filter expression. */
  filter?: string;
  /** This contains the project Id for example: projects/{project_id} */
  parent: string;
}

export const GetVulnerabilitySummaryProjectsOccurrencesRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/projects/{projectsId}/occurrences:vulnerabilitySummary",
  }),
  svc,
) as unknown as Schema.Schema<GetVulnerabilitySummaryProjectsOccurrencesRequest>;

export type GetVulnerabilitySummaryProjectsOccurrencesResponse =
  GetVulnzOccurrencesSummaryResponse;
export const GetVulnerabilitySummaryProjectsOccurrencesResponse =
  GetVulnzOccurrencesSummaryResponse;

export type GetVulnerabilitySummaryProjectsOccurrencesError = DefaultErrors;

/** Gets a summary of the number and severity of occurrences. */
export const getVulnerabilitySummaryProjectsOccurrences: API.OperationMethod<
  GetVulnerabilitySummaryProjectsOccurrencesRequest,
  GetVulnerabilitySummaryProjectsOccurrencesResponse,
  GetVulnerabilitySummaryProjectsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetVulnerabilitySummaryProjectsOccurrencesRequest,
  output: GetVulnerabilitySummaryProjectsOccurrencesResponse,
  errors: [],
}));

export interface GetNotesProjectsOccurrencesRequest {
  /** The name of the occurrence in the form "projects/{project_id}/occurrences/{OCCURRENCE_ID}" */
  name: string;
}

export const GetNotesProjectsOccurrencesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/projects/{projectsId}/occurrences/{occurrencesId}/notes",
  }),
  svc,
) as unknown as Schema.Schema<GetNotesProjectsOccurrencesRequest>;

export type GetNotesProjectsOccurrencesResponse = Note;
export const GetNotesProjectsOccurrencesResponse = Note;

export type GetNotesProjectsOccurrencesError = DefaultErrors;

/** Gets the `Note` attached to the given `Occurrence`. */
export const getNotesProjectsOccurrences: API.OperationMethod<
  GetNotesProjectsOccurrencesRequest,
  GetNotesProjectsOccurrencesResponse,
  GetNotesProjectsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetNotesProjectsOccurrencesRequest,
  output: GetNotesProjectsOccurrencesResponse,
  errors: [],
}));

export interface ListProjectsOccurrencesRequest {
  /** Token to provide to skip to a particular spot in the list. */
  pageToken?: string;
  /** This contains the project Id for example: projects/{project_id}. */
  parent: string;
  /** The filter expression. */
  filter?: string;
  /** The name field contains the project Id. For example: "projects/{project_id} @Deprecated */
  name?: string;
  /** The kind of occurrences to filter on. */
  kind?:
    | "KIND_UNSPECIFIED"
    | "PACKAGE_VULNERABILITY"
    | "BUILD_DETAILS"
    | "IMAGE_BASIS"
    | "PACKAGE_MANAGER"
    | "DEPLOYABLE"
    | "DISCOVERY"
    | "ATTESTATION_AUTHORITY"
    | "UPGRADE"
    | "COMPLIANCE"
    | "SBOM"
    | "SPDX_PACKAGE"
    | "SPDX_FILE"
    | "SPDX_RELATIONSHIP"
    | "DSSE_ATTESTATION"
    | "VULNERABILITY_ASSESSMENT"
    | "SBOM_REFERENCE"
    | "SECRET"
    | (string & {});
  /** Number of occurrences to return in the list. */
  pageSize?: number;
}

export const ListProjectsOccurrencesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  kind: Schema.optional(Schema.String).pipe(T.HttpQuery("kind")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/occurrences" }),
  svc,
) as unknown as Schema.Schema<ListProjectsOccurrencesRequest>;

export type ListProjectsOccurrencesResponse = ListOccurrencesResponse;
export const ListProjectsOccurrencesResponse = ListOccurrencesResponse;

export type ListProjectsOccurrencesError = DefaultErrors;

/** Lists active `Occurrences` for a given project matching the filters. */
export const listProjectsOccurrences: API.PaginatedOperationMethod<
  ListProjectsOccurrencesRequest,
  ListProjectsOccurrencesResponse,
  ListProjectsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsOccurrencesRequest,
  output: ListProjectsOccurrencesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsOccurrencesRequest {
  /** The name of the project. Should be of the form "projects/{project_id}". @Deprecated */
  name?: string;
  /** This field contains the project Id for example: "projects/{project_id}" */
  parent: string;
  /** Request body */
  body?: Occurrence;
}

export const CreateProjectsOccurrencesRequest = Schema.Struct({
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Occurrence).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/projects/{projectsId}/occurrences",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsOccurrencesRequest>;

export type CreateProjectsOccurrencesResponse = Occurrence;
export const CreateProjectsOccurrencesResponse = Occurrence;

export type CreateProjectsOccurrencesError = DefaultErrors;

/** Creates a new `Occurrence`. Use this method to create `Occurrences` for a resource. */
export const createProjectsOccurrences: API.OperationMethod<
  CreateProjectsOccurrencesRequest,
  CreateProjectsOccurrencesResponse,
  CreateProjectsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsOccurrencesRequest,
  output: CreateProjectsOccurrencesResponse,
  errors: [],
}));

export interface DeleteProjectsOccurrencesRequest {
  /** The name of the occurrence in the form of "projects/{project_id}/occurrences/{OCCURRENCE_ID}" */
  name: string;
}

export const DeleteProjectsOccurrencesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha1/projects/{projectsId}/occurrences/{occurrencesId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsOccurrencesRequest>;

export type DeleteProjectsOccurrencesResponse = Empty;
export const DeleteProjectsOccurrencesResponse = Empty;

export type DeleteProjectsOccurrencesError = DefaultErrors;

/** Deletes the given `Occurrence` from the system. Use this when an `Occurrence` is no longer applicable for the given resource. */
export const deleteProjectsOccurrences: API.OperationMethod<
  DeleteProjectsOccurrencesRequest,
  DeleteProjectsOccurrencesResponse,
  DeleteProjectsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsOccurrencesRequest,
  output: DeleteProjectsOccurrencesResponse,
  errors: [],
}));

export interface PatchProjectsOccurrencesRequest {
  /** The fields to update. */
  updateMask?: string;
  /** The name of the occurrence. Should be of the form "projects/{project_id}/occurrences/{OCCURRENCE_ID}". */
  name: string;
  /** Request body */
  body?: Occurrence;
}

export const PatchProjectsOccurrencesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Occurrence).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha1/projects/{projectsId}/occurrences/{occurrencesId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsOccurrencesRequest>;

export type PatchProjectsOccurrencesResponse = Occurrence;
export const PatchProjectsOccurrencesResponse = Occurrence;

export type PatchProjectsOccurrencesError = DefaultErrors;

/** Updates an existing occurrence. */
export const patchProjectsOccurrences: API.OperationMethod<
  PatchProjectsOccurrencesRequest,
  PatchProjectsOccurrencesResponse,
  PatchProjectsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsOccurrencesRequest,
  output: PatchProjectsOccurrencesResponse,
  errors: [],
}));

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
  T.Http({
    method: "POST",
    path: "v1alpha1/projects/{projectsId}/occurrences/{occurrencesId}:getIamPolicy",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsOccurrencesRequest>;

export type GetIamPolicyProjectsOccurrencesResponse = Policy;
export const GetIamPolicyProjectsOccurrencesResponse = Policy;

export type GetIamPolicyProjectsOccurrencesError = DefaultErrors;

/** Gets the access control policy for a note or an `Occurrence` resource. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a note or occurrence, respectively. Attempting to call this method on a resource without the required permission will result in a `PERMISSION_DENIED` error. Attempting to call this method on a non-existent resource will result in a `NOT_FOUND` error if the user has list permission on the project, or a `PERMISSION_DENIED` error otherwise. The resource takes the following formats: `projects/{PROJECT_ID}/occurrences/{OCCURRENCE_ID}` for occurrences and projects/{PROJECT_ID}/notes/{NOTE_ID} for notes */
export const getIamPolicyProjectsOccurrences: API.OperationMethod<
  GetIamPolicyProjectsOccurrencesRequest,
  GetIamPolicyProjectsOccurrencesResponse,
  GetIamPolicyProjectsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetIamPolicyProjectsOccurrencesRequest,
  output: GetIamPolicyProjectsOccurrencesResponse,
  errors: [],
}));

export interface GetProjectsOccurrencesRequest {
  /** The name of the occurrence of the form "projects/{project_id}/occurrences/{OCCURRENCE_ID}" */
  name: string;
}

export const GetProjectsOccurrencesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/projects/{projectsId}/occurrences/{occurrencesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsOccurrencesRequest>;

export type GetProjectsOccurrencesResponse = Occurrence;
export const GetProjectsOccurrencesResponse = Occurrence;

export type GetProjectsOccurrencesError = DefaultErrors;

/** Returns the requested `Occurrence`. */
export const getProjectsOccurrences: API.OperationMethod<
  GetProjectsOccurrencesRequest,
  GetProjectsOccurrencesResponse,
  GetProjectsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsOccurrencesRequest,
  output: GetProjectsOccurrencesResponse,
  errors: [],
}));

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
  T.Http({
    method: "POST",
    path: "v1alpha1/projects/{projectsId}/occurrences/{occurrencesId}:setIamPolicy",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsOccurrencesRequest>;

export type SetIamPolicyProjectsOccurrencesResponse = Policy;
export const SetIamPolicyProjectsOccurrencesResponse = Policy;

export type SetIamPolicyProjectsOccurrencesError = DefaultErrors;

/** Sets the access control policy on the specified `Note` or `Occurrence`. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a `Note` or an `Occurrence`, respectively. Attempting to call this method without these permissions will result in a ` `PERMISSION_DENIED` error. Attempting to call this method on a non-existent resource will result in a `NOT_FOUND` error if the user has `containeranalysis.notes.list` permission on a `Note` or `containeranalysis.occurrences.list` on an `Occurrence`, or a `PERMISSION_DENIED` error otherwise. The resource takes the following formats: `projects/{projectid}/occurrences/{occurrenceid}` for occurrences and projects/{projectid}/notes/{noteid} for notes */
export const setIamPolicyProjectsOccurrences: API.OperationMethod<
  SetIamPolicyProjectsOccurrencesRequest,
  SetIamPolicyProjectsOccurrencesResponse,
  SetIamPolicyProjectsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SetIamPolicyProjectsOccurrencesRequest,
  output: SetIamPolicyProjectsOccurrencesResponse,
  errors: [],
}));

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
  T.Http({
    method: "POST",
    path: "v1alpha1/projects/{projectsId}/occurrences/{occurrencesId}:testIamPermissions",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsOccurrencesRequest>;

export type TestIamPermissionsProjectsOccurrencesResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsOccurrencesResponse =
  TestIamPermissionsResponse;

export type TestIamPermissionsProjectsOccurrencesError = DefaultErrors;

/** Returns the permissions that a caller has on the specified note or occurrence resource. Requires list permission on the project (for example, "storage.objects.list" on the containing bucket for testing permission of an object). Attempting to call this method on a non-existent resource will result in a `NOT_FOUND` error if the user has list permission on the project, or a `PERMISSION_DENIED` error otherwise. The resource takes the following formats: `projects/{PROJECT_ID}/occurrences/{OCCURRENCE_ID}` for `Occurrences` and `projects/{PROJECT_ID}/notes/{NOTE_ID}` for `Notes` */
export const testIamPermissionsProjectsOccurrences: API.OperationMethod<
  TestIamPermissionsProjectsOccurrencesRequest,
  TestIamPermissionsProjectsOccurrencesResponse,
  TestIamPermissionsProjectsOccurrencesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: TestIamPermissionsProjectsOccurrencesRequest,
  output: TestIamPermissionsProjectsOccurrencesResponse,
  errors: [],
}));

export interface GetProjectsScanConfigsRequest {
  /** The name of the ScanConfig in the form projects/{project_id}/scanConfigs/{scan_config_id} */
  name: string;
}

export const GetProjectsScanConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/projects/{projectsId}/scanConfigs/{scanConfigsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsScanConfigsRequest>;

export type GetProjectsScanConfigsResponse = ScanConfig;
export const GetProjectsScanConfigsResponse = ScanConfig;

export type GetProjectsScanConfigsError = DefaultErrors;

/** Gets a specific scan configuration for a project. */
export const getProjectsScanConfigs: API.OperationMethod<
  GetProjectsScanConfigsRequest,
  GetProjectsScanConfigsResponse,
  GetProjectsScanConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsScanConfigsRequest,
  output: GetProjectsScanConfigsResponse,
  errors: [],
}));

export interface PatchProjectsScanConfigsRequest {
  /** The scan config to update of the form projects/{project_id}/scanConfigs/{scan_config_id}. */
  name: string;
  /** The fields to update. */
  updateMask?: string;
  /** Request body */
  body?: ScanConfig;
}

export const PatchProjectsScanConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(ScanConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha1/projects/{projectsId}/scanConfigs/{scanConfigsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsScanConfigsRequest>;

export type PatchProjectsScanConfigsResponse = ScanConfig;
export const PatchProjectsScanConfigsResponse = ScanConfig;

export type PatchProjectsScanConfigsError = DefaultErrors;

/** Updates the scan configuration to a new value. */
export const patchProjectsScanConfigs: API.OperationMethod<
  PatchProjectsScanConfigsRequest,
  PatchProjectsScanConfigsResponse,
  PatchProjectsScanConfigsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsScanConfigsRequest,
  output: PatchProjectsScanConfigsResponse,
  errors: [],
}));

export interface ListProjectsScanConfigsRequest {
  /** This containers the project Id i.e.: projects/{project_id} */
  parent: string;
  /** The filter expression. */
  filter?: string;
  /** The number of items to return. */
  pageSize?: number;
  /** The page token to use for the next request. */
  pageToken?: string;
}

export const ListProjectsScanConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/scanConfigs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsScanConfigsRequest>;

export type ListProjectsScanConfigsResponse = ListScanConfigsResponse;
export const ListProjectsScanConfigsResponse = ListScanConfigsResponse;

export type ListProjectsScanConfigsError = DefaultErrors;

/** Lists scan configurations for a project. */
export const listProjectsScanConfigs: API.PaginatedOperationMethod<
  ListProjectsScanConfigsRequest,
  ListProjectsScanConfigsResponse,
  ListProjectsScanConfigsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsScanConfigsRequest,
  output: ListProjectsScanConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsOperationsRequest {
  /** The project Id that this operation should be created under. */
  parent: string;
  /** Request body */
  body?: CreateOperationRequest;
}

export const CreateProjectsOperationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CreateOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/projects/{projectsId}/operations",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsOperationsRequest>;

export type CreateProjectsOperationsResponse = Operation;
export const CreateProjectsOperationsResponse = Operation;

export type CreateProjectsOperationsError = DefaultErrors;

/** Creates a new `Operation`. */
export const createProjectsOperations: API.OperationMethod<
  CreateProjectsOperationsRequest,
  CreateProjectsOperationsResponse,
  CreateProjectsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsOperationsRequest,
  output: CreateProjectsOperationsResponse,
  errors: [],
}));

export interface PatchProjectsOperationsRequest {
  /** The name of the Operation. Should be of the form "projects/{provider_id}/operations/{operation_id}". */
  name: string;
  /** Request body */
  body?: UpdateOperationRequest;
}

export const PatchProjectsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UpdateOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha1/projects/{projectsId}/operations/{operationsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsOperationsRequest>;

export type PatchProjectsOperationsResponse = Operation;
export const PatchProjectsOperationsResponse = Operation;

export type PatchProjectsOperationsError = DefaultErrors;

/** Updates an existing operation returns an error if operation does not exist. The only valid operations are to update mark the done bit change the result. */
export const patchProjectsOperations: API.OperationMethod<
  PatchProjectsOperationsRequest,
  PatchProjectsOperationsResponse,
  PatchProjectsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsOperationsRequest,
  output: PatchProjectsOperationsResponse,
  errors: [],
}));

export interface DeleteProjectsNotesRequest {
  /** The name of the note in the form of "providers/{provider_id}/notes/{NOTE_ID}" */
  name: string;
}

export const DeleteProjectsNotesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha1/projects/{projectsId}/notes/{notesId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsNotesRequest>;

export type DeleteProjectsNotesResponse = Empty;
export const DeleteProjectsNotesResponse = Empty;

export type DeleteProjectsNotesError = DefaultErrors;

/** Deletes the given `Note` from the system. */
export const deleteProjectsNotes: API.OperationMethod<
  DeleteProjectsNotesRequest,
  DeleteProjectsNotesResponse,
  DeleteProjectsNotesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsNotesRequest,
  output: DeleteProjectsNotesResponse,
  errors: [],
}));

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
  T.Http({
    method: "POST",
    path: "v1alpha1/projects/{projectsId}/notes/{notesId}:setIamPolicy",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsNotesRequest>;

export type SetIamPolicyProjectsNotesResponse = Policy;
export const SetIamPolicyProjectsNotesResponse = Policy;

export type SetIamPolicyProjectsNotesError = DefaultErrors;

/** Sets the access control policy on the specified `Note` or `Occurrence`. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a `Note` or an `Occurrence`, respectively. Attempting to call this method without these permissions will result in a ` `PERMISSION_DENIED` error. Attempting to call this method on a non-existent resource will result in a `NOT_FOUND` error if the user has `containeranalysis.notes.list` permission on a `Note` or `containeranalysis.occurrences.list` on an `Occurrence`, or a `PERMISSION_DENIED` error otherwise. The resource takes the following formats: `projects/{projectid}/occurrences/{occurrenceid}` for occurrences and projects/{projectid}/notes/{noteid} for notes */
export const setIamPolicyProjectsNotes: API.OperationMethod<
  SetIamPolicyProjectsNotesRequest,
  SetIamPolicyProjectsNotesResponse,
  SetIamPolicyProjectsNotesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SetIamPolicyProjectsNotesRequest,
  output: SetIamPolicyProjectsNotesResponse,
  errors: [],
}));

export interface GetProjectsNotesRequest {
  /** The name of the note in the form of "providers/{provider_id}/notes/{NOTE_ID}" */
  name: string;
}

export const GetProjectsNotesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/projects/{projectsId}/notes/{notesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsNotesRequest>;

export type GetProjectsNotesResponse = Note;
export const GetProjectsNotesResponse = Note;

export type GetProjectsNotesError = DefaultErrors;

/** Returns the requested `Note`. */
export const getProjectsNotes: API.OperationMethod<
  GetProjectsNotesRequest,
  GetProjectsNotesResponse,
  GetProjectsNotesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsNotesRequest,
  output: GetProjectsNotesResponse,
  errors: [],
}));

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
  T.Http({
    method: "POST",
    path: "v1alpha1/projects/{projectsId}/notes/{notesId}:testIamPermissions",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsNotesRequest>;

export type TestIamPermissionsProjectsNotesResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsNotesResponse =
  TestIamPermissionsResponse;

export type TestIamPermissionsProjectsNotesError = DefaultErrors;

/** Returns the permissions that a caller has on the specified note or occurrence resource. Requires list permission on the project (for example, "storage.objects.list" on the containing bucket for testing permission of an object). Attempting to call this method on a non-existent resource will result in a `NOT_FOUND` error if the user has list permission on the project, or a `PERMISSION_DENIED` error otherwise. The resource takes the following formats: `projects/{PROJECT_ID}/occurrences/{OCCURRENCE_ID}` for `Occurrences` and `projects/{PROJECT_ID}/notes/{NOTE_ID}` for `Notes` */
export const testIamPermissionsProjectsNotes: API.OperationMethod<
  TestIamPermissionsProjectsNotesRequest,
  TestIamPermissionsProjectsNotesResponse,
  TestIamPermissionsProjectsNotesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: TestIamPermissionsProjectsNotesRequest,
  output: TestIamPermissionsProjectsNotesResponse,
  errors: [],
}));

export interface ListProjectsNotesRequest {
  /** The filter expression. */
  filter?: string;
  /** The name field will contain the project Id for example: "providers/{provider_id} @Deprecated */
  name?: string;
  /** This field contains the project Id for example: "projects/{PROJECT_ID}". */
  parent: string;
  /** Number of notes to return in the list. */
  pageSize?: number;
  /** Token to provide to skip to a particular spot in the list. */
  pageToken?: string;
}

export const ListProjectsNotesRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/projects/{projectsId}/notes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsNotesRequest>;

export type ListProjectsNotesResponse = ListNotesResponse;
export const ListProjectsNotesResponse = ListNotesResponse;

export type ListProjectsNotesError = DefaultErrors;

/** Lists all `Notes` for a given project. */
export const listProjectsNotes: API.PaginatedOperationMethod<
  ListProjectsNotesRequest,
  ListProjectsNotesResponse,
  ListProjectsNotesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsNotesRequest,
  output: ListProjectsNotesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsNotesRequest {
  /** The fields to update. */
  updateMask?: string;
  /** The name of the note. Should be of the form "projects/{provider_id}/notes/{note_id}". */
  name: string;
  /** Request body */
  body?: Note;
}

export const PatchProjectsNotesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Note).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha1/projects/{projectsId}/notes/{notesId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsNotesRequest>;

export type PatchProjectsNotesResponse = Note;
export const PatchProjectsNotesResponse = Note;

export type PatchProjectsNotesError = DefaultErrors;

/** Updates an existing `Note`. */
export const patchProjectsNotes: API.OperationMethod<
  PatchProjectsNotesRequest,
  PatchProjectsNotesResponse,
  PatchProjectsNotesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsNotesRequest,
  output: PatchProjectsNotesResponse,
  errors: [],
}));

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
  T.Http({
    method: "POST",
    path: "v1alpha1/projects/{projectsId}/notes/{notesId}:getIamPolicy",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsNotesRequest>;

export type GetIamPolicyProjectsNotesResponse = Policy;
export const GetIamPolicyProjectsNotesResponse = Policy;

export type GetIamPolicyProjectsNotesError = DefaultErrors;

/** Gets the access control policy for a note or an `Occurrence` resource. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a note or occurrence, respectively. Attempting to call this method on a resource without the required permission will result in a `PERMISSION_DENIED` error. Attempting to call this method on a non-existent resource will result in a `NOT_FOUND` error if the user has list permission on the project, or a `PERMISSION_DENIED` error otherwise. The resource takes the following formats: `projects/{PROJECT_ID}/occurrences/{OCCURRENCE_ID}` for occurrences and projects/{PROJECT_ID}/notes/{NOTE_ID} for notes */
export const getIamPolicyProjectsNotes: API.OperationMethod<
  GetIamPolicyProjectsNotesRequest,
  GetIamPolicyProjectsNotesResponse,
  GetIamPolicyProjectsNotesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetIamPolicyProjectsNotesRequest,
  output: GetIamPolicyProjectsNotesResponse,
  errors: [],
}));

export interface CreateProjectsNotesRequest {
  /** The ID to use for this note. */
  noteId?: string;
  /** The name of the project. Should be of the form "providers/{provider_id}". @Deprecated */
  name?: string;
  /** This field contains the project Id for example: "projects/{project_id} */
  parent: string;
  /** Request body */
  body?: Note;
}

export const CreateProjectsNotesRequest = Schema.Struct({
  noteId: Schema.optional(Schema.String).pipe(T.HttpQuery("noteId")),
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Note).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/projects/{projectsId}/notes",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsNotesRequest>;

export type CreateProjectsNotesResponse = Note;
export const CreateProjectsNotesResponse = Note;

export type CreateProjectsNotesError = DefaultErrors;

/** Creates a new `Note`. */
export const createProjectsNotes: API.OperationMethod<
  CreateProjectsNotesRequest,
  CreateProjectsNotesResponse,
  CreateProjectsNotesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsNotesRequest,
  output: CreateProjectsNotesResponse,
  errors: [],
}));

export interface ListProjectsNotesOccurrencesRequest {
  /** Token to provide to skip to a particular spot in the list. */
  pageToken?: string;
  /** Number of notes to return in the list. */
  pageSize?: number;
  /** The filter expression. */
  filter?: string;
  /** The name field will contain the note name for example: "provider/{provider_id}/notes/{note_id}" */
  name: string;
}

export const ListProjectsNotesOccurrencesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/projects/{projectsId}/notes/{notesId}/occurrences",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsNotesOccurrencesRequest>;

export type ListProjectsNotesOccurrencesResponse = ListNoteOccurrencesResponse;
export const ListProjectsNotesOccurrencesResponse = ListNoteOccurrencesResponse;

export type ListProjectsNotesOccurrencesError = DefaultErrors;

/** Lists `Occurrences` referencing the specified `Note`. Use this method to get all occurrences referencing your `Note` across all your customer projects. */
export const listProjectsNotesOccurrences: API.PaginatedOperationMethod<
  ListProjectsNotesOccurrencesRequest,
  ListProjectsNotesOccurrencesResponse,
  ListProjectsNotesOccurrencesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsNotesOccurrencesRequest,
  output: ListProjectsNotesOccurrencesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListProvidersNotesRequest {
  /** This field contains the project Id for example: "projects/{PROJECT_ID}". */
  parent?: string;
  /** Number of notes to return in the list. */
  pageSize?: number;
  /** Token to provide to skip to a particular spot in the list. */
  pageToken?: string;
  /** The filter expression. */
  filter?: string;
  /** The name field will contain the project Id for example: "providers/{provider_id} @Deprecated */
  name: string;
}

export const ListProvidersNotesRequest = Schema.Struct({
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1alpha1/providers/{providersId}/notes" }),
  svc,
) as unknown as Schema.Schema<ListProvidersNotesRequest>;

export type ListProvidersNotesResponse = ListNotesResponse;
export const ListProvidersNotesResponse = ListNotesResponse;

export type ListProvidersNotesError = DefaultErrors;

/** Lists all `Notes` for a given project. */
export const listProvidersNotes: API.PaginatedOperationMethod<
  ListProvidersNotesRequest,
  ListProvidersNotesResponse,
  ListProvidersNotesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProvidersNotesRequest,
  output: ListProvidersNotesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface SetIamPolicyProvidersNotesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProvidersNotesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/providers/{providersId}/notes/{notesId}:setIamPolicy",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProvidersNotesRequest>;

export type SetIamPolicyProvidersNotesResponse = Policy;
export const SetIamPolicyProvidersNotesResponse = Policy;

export type SetIamPolicyProvidersNotesError = DefaultErrors;

/** Sets the access control policy on the specified `Note` or `Occurrence`. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a `Note` or an `Occurrence`, respectively. Attempting to call this method without these permissions will result in a ` `PERMISSION_DENIED` error. Attempting to call this method on a non-existent resource will result in a `NOT_FOUND` error if the user has `containeranalysis.notes.list` permission on a `Note` or `containeranalysis.occurrences.list` on an `Occurrence`, or a `PERMISSION_DENIED` error otherwise. The resource takes the following formats: `projects/{projectid}/occurrences/{occurrenceid}` for occurrences and projects/{projectid}/notes/{noteid} for notes */
export const setIamPolicyProvidersNotes: API.OperationMethod<
  SetIamPolicyProvidersNotesRequest,
  SetIamPolicyProvidersNotesResponse,
  SetIamPolicyProvidersNotesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SetIamPolicyProvidersNotesRequest,
  output: SetIamPolicyProvidersNotesResponse,
  errors: [],
}));

export interface TestIamPermissionsProvidersNotesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProvidersNotesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/providers/{providersId}/notes/{notesId}:testIamPermissions",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProvidersNotesRequest>;

export type TestIamPermissionsProvidersNotesResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProvidersNotesResponse =
  TestIamPermissionsResponse;

export type TestIamPermissionsProvidersNotesError = DefaultErrors;

/** Returns the permissions that a caller has on the specified note or occurrence resource. Requires list permission on the project (for example, "storage.objects.list" on the containing bucket for testing permission of an object). Attempting to call this method on a non-existent resource will result in a `NOT_FOUND` error if the user has list permission on the project, or a `PERMISSION_DENIED` error otherwise. The resource takes the following formats: `projects/{PROJECT_ID}/occurrences/{OCCURRENCE_ID}` for `Occurrences` and `projects/{PROJECT_ID}/notes/{NOTE_ID}` for `Notes` */
export const testIamPermissionsProvidersNotes: API.OperationMethod<
  TestIamPermissionsProvidersNotesRequest,
  TestIamPermissionsProvidersNotesResponse,
  TestIamPermissionsProvidersNotesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: TestIamPermissionsProvidersNotesRequest,
  output: TestIamPermissionsProvidersNotesResponse,
  errors: [],
}));

export interface GetProvidersNotesRequest {
  /** The name of the note in the form of "providers/{provider_id}/notes/{NOTE_ID}" */
  name: string;
}

export const GetProvidersNotesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/providers/{providersId}/notes/{notesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProvidersNotesRequest>;

export type GetProvidersNotesResponse = Note;
export const GetProvidersNotesResponse = Note;

export type GetProvidersNotesError = DefaultErrors;

/** Returns the requested `Note`. */
export const getProvidersNotes: API.OperationMethod<
  GetProvidersNotesRequest,
  GetProvidersNotesResponse,
  GetProvidersNotesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProvidersNotesRequest,
  output: GetProvidersNotesResponse,
  errors: [],
}));

export interface GetIamPolicyProvidersNotesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProvidersNotesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/providers/{providersId}/notes/{notesId}:getIamPolicy",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProvidersNotesRequest>;

export type GetIamPolicyProvidersNotesResponse = Policy;
export const GetIamPolicyProvidersNotesResponse = Policy;

export type GetIamPolicyProvidersNotesError = DefaultErrors;

/** Gets the access control policy for a note or an `Occurrence` resource. Requires `containeranalysis.notes.setIamPolicy` or `containeranalysis.occurrences.setIamPolicy` permission if the resource is a note or occurrence, respectively. Attempting to call this method on a resource without the required permission will result in a `PERMISSION_DENIED` error. Attempting to call this method on a non-existent resource will result in a `NOT_FOUND` error if the user has list permission on the project, or a `PERMISSION_DENIED` error otherwise. The resource takes the following formats: `projects/{PROJECT_ID}/occurrences/{OCCURRENCE_ID}` for occurrences and projects/{PROJECT_ID}/notes/{NOTE_ID} for notes */
export const getIamPolicyProvidersNotes: API.OperationMethod<
  GetIamPolicyProvidersNotesRequest,
  GetIamPolicyProvidersNotesResponse,
  GetIamPolicyProvidersNotesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetIamPolicyProvidersNotesRequest,
  output: GetIamPolicyProvidersNotesResponse,
  errors: [],
}));

export interface PatchProvidersNotesRequest {
  /** The name of the note. Should be of the form "projects/{provider_id}/notes/{note_id}". */
  name: string;
  /** The fields to update. */
  updateMask?: string;
  /** Request body */
  body?: Note;
}

export const PatchProvidersNotesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Note).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1alpha1/providers/{providersId}/notes/{notesId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProvidersNotesRequest>;

export type PatchProvidersNotesResponse = Note;
export const PatchProvidersNotesResponse = Note;

export type PatchProvidersNotesError = DefaultErrors;

/** Updates an existing `Note`. */
export const patchProvidersNotes: API.OperationMethod<
  PatchProvidersNotesRequest,
  PatchProvidersNotesResponse,
  PatchProvidersNotesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProvidersNotesRequest,
  output: PatchProvidersNotesResponse,
  errors: [],
}));

export interface CreateProvidersNotesRequest {
  /** The name of the project. Should be of the form "providers/{provider_id}". @Deprecated */
  name: string;
  /** The ID to use for this note. */
  noteId?: string;
  /** This field contains the project Id for example: "projects/{project_id} */
  parent?: string;
  /** Request body */
  body?: Note;
}

export const CreateProvidersNotesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  noteId: Schema.optional(Schema.String).pipe(T.HttpQuery("noteId")),
  parent: Schema.optional(Schema.String).pipe(T.HttpQuery("parent")),
  body: Schema.optional(Note).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1alpha1/providers/{providersId}/notes",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProvidersNotesRequest>;

export type CreateProvidersNotesResponse = Note;
export const CreateProvidersNotesResponse = Note;

export type CreateProvidersNotesError = DefaultErrors;

/** Creates a new `Note`. */
export const createProvidersNotes: API.OperationMethod<
  CreateProvidersNotesRequest,
  CreateProvidersNotesResponse,
  CreateProvidersNotesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProvidersNotesRequest,
  output: CreateProvidersNotesResponse,
  errors: [],
}));

export interface DeleteProvidersNotesRequest {
  /** The name of the note in the form of "providers/{provider_id}/notes/{NOTE_ID}" */
  name: string;
}

export const DeleteProvidersNotesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1alpha1/providers/{providersId}/notes/{notesId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProvidersNotesRequest>;

export type DeleteProvidersNotesResponse = Empty;
export const DeleteProvidersNotesResponse = Empty;

export type DeleteProvidersNotesError = DefaultErrors;

/** Deletes the given `Note` from the system. */
export const deleteProvidersNotes: API.OperationMethod<
  DeleteProvidersNotesRequest,
  DeleteProvidersNotesResponse,
  DeleteProvidersNotesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProvidersNotesRequest,
  output: DeleteProvidersNotesResponse,
  errors: [],
}));

export interface ListProvidersNotesOccurrencesRequest {
  /** Number of notes to return in the list. */
  pageSize?: number;
  /** Token to provide to skip to a particular spot in the list. */
  pageToken?: string;
  /** The filter expression. */
  filter?: string;
  /** The name field will contain the note name for example: "provider/{provider_id}/notes/{note_id}" */
  name: string;
}

export const ListProvidersNotesOccurrencesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1alpha1/providers/{providersId}/notes/{notesId}/occurrences",
  }),
  svc,
) as unknown as Schema.Schema<ListProvidersNotesOccurrencesRequest>;

export type ListProvidersNotesOccurrencesResponse = ListNoteOccurrencesResponse;
export const ListProvidersNotesOccurrencesResponse =
  ListNoteOccurrencesResponse;

export type ListProvidersNotesOccurrencesError = DefaultErrors;

/** Lists `Occurrences` referencing the specified `Note`. Use this method to get all occurrences referencing your `Note` across all your customer projects. */
export const listProvidersNotesOccurrences: API.PaginatedOperationMethod<
  ListProvidersNotesOccurrencesRequest,
  ListProvidersNotesOccurrencesResponse,
  ListProvidersNotesOccurrencesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProvidersNotesOccurrencesRequest,
  output: ListProvidersNotesOccurrencesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));
