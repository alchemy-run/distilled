// ==========================================================================
// On-Demand Scanning API (ondemandscanning v1)
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
  name: "ondemandscanning",
  version: "v1",
  rootUrl: "https://ondemandscanning.googleapis.com/",
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

export interface BaseImage {
  /** The name of the base image. */
  name?: string;
  /** The repository name in which the base image is from. */
  repository?: string;
  /** The number of layers that the base image is composed of. */
  layerCount?: number;
  /** The registry in which the base image is from. */
  registry?: string;
}

export const BaseImage: Schema.Schema<BaseImage> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  repository: Schema.optional(Schema.String),
  layerCount: Schema.optional(Schema.Number),
  registry: Schema.optional(Schema.String),
})).annotate({ identifier: "BaseImage" }) as any as Schema.Schema<BaseImage>;

export interface LayerDetails {
  /** The index of the layer in the container image. */
  index?: number;
  /** The diff ID (sha256 hash) of the layer in the container image. */
  diffId?: string;
  /** The layer chain ID (sha256 hash) of the layer in the container image. https://github.com/opencontainers/image-spec/blob/main/config.md#layer-chainid */
  chainId?: string;
  /** The layer build command that was used to build the layer. This may not be found in all layers depending on how the container image is built. */
  command?: string;
  /** The base images the layer is found within. */
  baseImages?: Array<BaseImage>;
}

export const LayerDetails: Schema.Schema<LayerDetails> = Schema.suspend(() => Schema.Struct({
  index: Schema.optional(Schema.Number),
  diffId: Schema.optional(Schema.String),
  chainId: Schema.optional(Schema.String),
  command: Schema.optional(Schema.String),
  baseImages: Schema.optional(Schema.Array(BaseImage)),
})).annotate({ identifier: "LayerDetails" }) as any as Schema.Schema<LayerDetails>;

export interface FileLocation {
  /** For jars that are contained inside .war files, this filepath can indicate the path to war file combined with the path to jar file. */
  filePath?: string;
  layerDetails?: LayerDetails;
}

export const FileLocation: Schema.Schema<FileLocation> = Schema.suspend(() => Schema.Struct({
  filePath: Schema.optional(Schema.String),
  layerDetails: Schema.optional(LayerDetails),
})).annotate({ identifier: "FileLocation" }) as any as Schema.Schema<FileLocation>;

export interface LanguagePackageDependency {
  package?: string;
  version?: string;
}

export const LanguagePackageDependency: Schema.Schema<LanguagePackageDependency> = Schema.suspend(() => Schema.Struct({
  package: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "LanguagePackageDependency" }) as any as Schema.Schema<LanguagePackageDependency>;

export interface Maintainer {
  name?: string;
  kind?: string;
  email?: string;
  url?: string;
}

export const Maintainer: Schema.Schema<Maintainer> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "Maintainer" }) as any as Schema.Schema<Maintainer>;

export interface PackageVersion {
  name?: string;
  version?: string;
  /** The licenses associated with this package. Note that this has to go on the PackageVersion level, because we can have cases with images with the same source having different licences. E.g. in Alpine, musl and musl-utils both have the same origin musl, but have different sets of licenses. */
  licenses?: Array<string>;
}

export const PackageVersion: Schema.Schema<PackageVersion> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  licenses: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PackageVersion" }) as any as Schema.Schema<PackageVersion>;

export interface BinarySourceInfo {
  /** The binary package. This is significant when the source is different than the binary itself. Historically if they've differed, we've stored the name of the source and its version in the package/version fields, but we should also store the binary package info, as that's what's actually installed. */
  binaryVersion?: PackageVersion;
  /** The source package. Similar to the above, this is significant when the source is different than the binary itself. Since the top-level package/version fields are based on an if/else, we need a separate field for both binary and source if we want to know definitively where the data is coming from. */
  sourceVersion?: PackageVersion;
}

export const BinarySourceInfo: Schema.Schema<BinarySourceInfo> = Schema.suspend(() => Schema.Struct({
  binaryVersion: Schema.optional(PackageVersion),
  sourceVersion: Schema.optional(PackageVersion),
})).annotate({ identifier: "BinarySourceInfo" }) as any as Schema.Schema<BinarySourceInfo>;

export interface PackageData {
  /** The package being analysed for vulnerabilities */
  package?: string;
  /** The version of the package being analysed */
  version?: string;
  /** The OS affected by a vulnerability Used to generate the cpe_uri for OS packages */
  os?: string;
  /** The version of the OS Used to generate the cpe_uri for OS packages */
  osVersion?: string;
  /** The cpe_uri in [cpe format] (https://cpe.mitre.org/specification/) in which the vulnerability may manifest. Examples include distro or storage location for vulnerable jar. */
  cpeUri?: string;
  unused?: string;
  /** The type of package: os, maven, go, etc. */
  packageType?: "PACKAGE_TYPE_UNSPECIFIED" | "OS" | "MAVEN" | "GO" | "GO_STDLIB" | "PYPI" | "NPM" | "NUGET" | "RUBYGEMS" | "RUST" | "COMPOSER" | "SWIFT" | (string & {});
  /** HashDigest stores the SHA512 hash digest of the jar file if the package is of type Maven. This field will be unset for non Maven packages. */
  hashDigest?: string;
  /** The path to the jar file / go binary file. */
  fileLocation?: Array<FileLocation>;
  /** CVEs that this package is no longer vulnerable to */
  patchedCve?: Array<string>;
  /** The dependency chain between this package and the user's artifact. List in order from the customer's package under review first, to the current package last. Inclusive of the original package and the current package. */
  dependencyChain?: Array<LanguagePackageDependency>;
  /** The maintainer of the package. */
  maintainer?: Maintainer;
  /** The architecture of the package. */
  architecture?: string;
  /** DEPRECATED */
  binaryVersion?: PackageVersion;
  /** DEPRECATED */
  sourceVersion?: PackageVersion;
  /** A bundle containing the binary and source information. */
  binarySourceInfo?: Array<BinarySourceInfo>;
  /** The list of licenses found that are related to a given package. Note that licenses may also be stored on the BinarySourceInfo. If there is no BinarySourceInfo (because there's no concept of source vs binary), then it will be stored here, while if there are BinarySourceInfos, it will be stored there, as one source can have multiple binaries with different licenses. */
  licenses?: Array<string>;
  layerDetails?: LayerDetails;
}

export const PackageData: Schema.Schema<PackageData> = Schema.suspend(() => Schema.Struct({
  package: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  os: Schema.optional(Schema.String),
  osVersion: Schema.optional(Schema.String),
  cpeUri: Schema.optional(Schema.String),
  unused: Schema.optional(Schema.String),
  packageType: Schema.optional(Schema.String),
  hashDigest: Schema.optional(Schema.String),
  fileLocation: Schema.optional(Schema.Array(FileLocation)),
  patchedCve: Schema.optional(Schema.Array(Schema.String)),
  dependencyChain: Schema.optional(Schema.Array(LanguagePackageDependency)),
  maintainer: Schema.optional(Maintainer),
  architecture: Schema.optional(Schema.String),
  binaryVersion: Schema.optional(PackageVersion),
  sourceVersion: Schema.optional(PackageVersion),
  binarySourceInfo: Schema.optional(Schema.Array(BinarySourceInfo)),
  licenses: Schema.optional(Schema.Array(Schema.String)),
  layerDetails: Schema.optional(LayerDetails),
})).annotate({ identifier: "PackageData" }) as any as Schema.Schema<PackageData>;

export interface AnalyzePackagesRequestV1 {
  /** Required. The resource URI of the container image being scanned. */
  resourceUri?: string;
  /** The packages to analyze. */
  packages?: Array<PackageData>;
  /** [DEPRECATED] Whether to include OSV data in the scan. For backwards compatibility reasons, this field can be neither removed nor renamed. */
  includeOsvData?: boolean;
}

export const AnalyzePackagesRequestV1: Schema.Schema<AnalyzePackagesRequestV1> = Schema.suspend(() => Schema.Struct({
  resourceUri: Schema.optional(Schema.String),
  packages: Schema.optional(Schema.Array(PackageData)),
  includeOsvData: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AnalyzePackagesRequestV1" }) as any as Schema.Schema<AnalyzePackagesRequestV1>;

export interface CVSS {
  /** The base score is a function of the base metric scores. */
  baseScore?: number;
  exploitabilityScore?: number;
  impactScore?: number;
  /** Base Metrics Represents the intrinsic characteristics of a vulnerability that are constant over time and across user environments. */
  attackVector?: "ATTACK_VECTOR_UNSPECIFIED" | "ATTACK_VECTOR_NETWORK" | "ATTACK_VECTOR_ADJACENT" | "ATTACK_VECTOR_LOCAL" | "ATTACK_VECTOR_PHYSICAL" | (string & {});
  attackComplexity?: "ATTACK_COMPLEXITY_UNSPECIFIED" | "ATTACK_COMPLEXITY_LOW" | "ATTACK_COMPLEXITY_HIGH" | "ATTACK_COMPLEXITY_MEDIUM" | (string & {});
  authentication?: "AUTHENTICATION_UNSPECIFIED" | "AUTHENTICATION_MULTIPLE" | "AUTHENTICATION_SINGLE" | "AUTHENTICATION_NONE" | (string & {});
  privilegesRequired?: "PRIVILEGES_REQUIRED_UNSPECIFIED" | "PRIVILEGES_REQUIRED_NONE" | "PRIVILEGES_REQUIRED_LOW" | "PRIVILEGES_REQUIRED_HIGH" | (string & {});
  userInteraction?: "USER_INTERACTION_UNSPECIFIED" | "USER_INTERACTION_NONE" | "USER_INTERACTION_REQUIRED" | (string & {});
  scope?: "SCOPE_UNSPECIFIED" | "SCOPE_UNCHANGED" | "SCOPE_CHANGED" | (string & {});
  confidentialityImpact?: "IMPACT_UNSPECIFIED" | "IMPACT_HIGH" | "IMPACT_LOW" | "IMPACT_NONE" | "IMPACT_PARTIAL" | "IMPACT_COMPLETE" | (string & {});
  integrityImpact?: "IMPACT_UNSPECIFIED" | "IMPACT_HIGH" | "IMPACT_LOW" | "IMPACT_NONE" | "IMPACT_PARTIAL" | "IMPACT_COMPLETE" | (string & {});
  availabilityImpact?: "IMPACT_UNSPECIFIED" | "IMPACT_HIGH" | "IMPACT_LOW" | "IMPACT_NONE" | "IMPACT_PARTIAL" | "IMPACT_COMPLETE" | (string & {});
}

export const CVSS: Schema.Schema<CVSS> = Schema.suspend(() => Schema.Struct({
  baseScore: Schema.optional(Schema.Number),
  exploitabilityScore: Schema.optional(Schema.Number),
  impactScore: Schema.optional(Schema.Number),
  attackVector: Schema.optional(Schema.String),
  attackComplexity: Schema.optional(Schema.String),
  authentication: Schema.optional(Schema.String),
  privilegesRequired: Schema.optional(Schema.String),
  userInteraction: Schema.optional(Schema.String),
  scope: Schema.optional(Schema.String),
  confidentialityImpact: Schema.optional(Schema.String),
  integrityImpact: Schema.optional(Schema.String),
  availabilityImpact: Schema.optional(Schema.String),
})).annotate({ identifier: "CVSS" }) as any as Schema.Schema<CVSS>;

export interface Version {
  /** Used to correct mistakes in the version numbering scheme. */
  epoch?: number;
  /** Required only when version kind is NORMAL. The main part of the version name. */
  name?: string;
  /** The iteration of the package build from the above version. */
  revision?: string;
  /** Whether this version is specifying part of an inclusive range. Grafeas does not have the capability to specify version ranges; instead we have fields that specify start version and end versions. At times this is insufficient - we also need to specify whether the version is included in the range or is excluded from the range. This boolean is expected to be set to true when the version is included in a range. */
  inclusive?: boolean;
  /** Required. Distinguishes between sentinel MIN/MAX versions and normal versions. */
  kind?: "VERSION_KIND_UNSPECIFIED" | "NORMAL" | "MINIMUM" | "MAXIMUM" | (string & {});
  /** Human readable version string. This string is of the form :- and is only set when kind is NORMAL. */
  fullName?: string;
}

export const Version: Schema.Schema<Version> = Schema.suspend(() => Schema.Struct({
  epoch: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
  revision: Schema.optional(Schema.String),
  inclusive: Schema.optional(Schema.Boolean),
  kind: Schema.optional(Schema.String),
  fullName: Schema.optional(Schema.String),
})).annotate({ identifier: "Version" }) as any as Schema.Schema<Version>;

export interface GrafeasV1BaseImage {
  /** The name of the base image. */
  name?: string;
  /** The repository name in which the base image is from. */
  repository?: string;
  /** The number of layers that the base image is composed of. */
  layerCount?: number;
  /** The registry in which the base image is from. */
  registry?: string;
}

export const GrafeasV1BaseImage: Schema.Schema<GrafeasV1BaseImage> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  repository: Schema.optional(Schema.String),
  layerCount: Schema.optional(Schema.Number),
  registry: Schema.optional(Schema.String),
})).annotate({ identifier: "GrafeasV1BaseImage" }) as any as Schema.Schema<GrafeasV1BaseImage>;

export interface GrafeasV1LayerDetails {
  /** The index of the layer in the container image. */
  index?: number;
  /** The diff ID (typically a sha256 hash) of the layer in the container image. */
  diffId?: string;
  /** The layer chain ID (sha256 hash) of the layer in the container image. https://github.com/opencontainers/image-spec/blob/main/config.md#layer-chainid */
  chainId?: string;
  /** The layer build command that was used to build the layer. This may not be found in all layers depending on how the container image is built. */
  command?: string;
  /** The base images the layer is found within. */
  baseImages?: Array<GrafeasV1BaseImage>;
}

export const GrafeasV1LayerDetails: Schema.Schema<GrafeasV1LayerDetails> = Schema.suspend(() => Schema.Struct({
  index: Schema.optional(Schema.Number),
  diffId: Schema.optional(Schema.String),
  chainId: Schema.optional(Schema.String),
  command: Schema.optional(Schema.String),
  baseImages: Schema.optional(Schema.Array(GrafeasV1BaseImage)),
})).annotate({ identifier: "GrafeasV1LayerDetails" }) as any as Schema.Schema<GrafeasV1LayerDetails>;

export interface GrafeasV1FileLocation {
  /** For jars that are contained inside .war files, this filepath can indicate the path to war file combined with the path to jar file. */
  filePath?: string;
  /** Each package found in a file should have its own layer metadata (that is, information from the origin layer of the package). */
  layerDetails?: GrafeasV1LayerDetails;
}

export const GrafeasV1FileLocation: Schema.Schema<GrafeasV1FileLocation> = Schema.suspend(() => Schema.Struct({
  filePath: Schema.optional(Schema.String),
  layerDetails: Schema.optional(GrafeasV1LayerDetails),
})).annotate({ identifier: "GrafeasV1FileLocation" }) as any as Schema.Schema<GrafeasV1FileLocation>;

export interface PackageIssue {
  /** Required. The [CPE URI](https://cpe.mitre.org/specification/) this vulnerability was found in. */
  affectedCpeUri?: string;
  /** Required. The package this vulnerability was found in. */
  affectedPackage?: string;
  /** Required. The version of the package that is installed on the resource affected by this vulnerability. */
  affectedVersion?: Version;
  /** The [CPE URI](https://cpe.mitre.org/specification/) this vulnerability was fixed in. It is possible for this to be different from the affected_cpe_uri. */
  fixedCpeUri?: string;
  /** The package this vulnerability was fixed in. It is possible for this to be different from the affected_package. */
  fixedPackage?: string;
  /** Required. The version of the package this vulnerability was fixed in. Setting this to VersionKind.MAXIMUM means no fix is yet available. */
  fixedVersion?: Version;
  /** Output only. Whether a fix is available for this package. */
  fixAvailable?: boolean;
  /** The type of package (e.g. OS, MAVEN, GO). */
  packageType?: string;
  /** Output only. The distro or language system assigned severity for this vulnerability when that is available and note provider assigned severity when it is not available. */
  effectiveSeverity?: "SEVERITY_UNSPECIFIED" | "MINIMAL" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | (string & {});
  /** The location at which this package was found. */
  fileLocation?: Array<GrafeasV1FileLocation>;
}

export const PackageIssue: Schema.Schema<PackageIssue> = Schema.suspend(() => Schema.Struct({
  affectedCpeUri: Schema.optional(Schema.String),
  affectedPackage: Schema.optional(Schema.String),
  affectedVersion: Schema.optional(Version),
  fixedCpeUri: Schema.optional(Schema.String),
  fixedPackage: Schema.optional(Schema.String),
  fixedVersion: Schema.optional(Version),
  fixAvailable: Schema.optional(Schema.Boolean),
  packageType: Schema.optional(Schema.String),
  effectiveSeverity: Schema.optional(Schema.String),
  fileLocation: Schema.optional(Schema.Array(GrafeasV1FileLocation)),
})).annotate({ identifier: "PackageIssue" }) as any as Schema.Schema<PackageIssue>;

export interface RelatedUrl {
  /** Specific URL associated with the resource. */
  url?: string;
  /** Label to describe usage of the URL. */
  label?: string;
}

export const RelatedUrl: Schema.Schema<RelatedUrl> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  label: Schema.optional(Schema.String),
})).annotate({ identifier: "RelatedUrl" }) as any as Schema.Schema<RelatedUrl>;

export interface Remediation {
  /** The type of remediation that can be applied. */
  remediationType?: "REMEDIATION_TYPE_UNSPECIFIED" | "MITIGATION" | "NO_FIX_PLANNED" | "NONE_AVAILABLE" | "VENDOR_FIX" | "WORKAROUND" | (string & {});
  /** Contains a comprehensive human-readable discussion of the remediation. */
  details?: string;
  /** Contains the URL where to obtain the remediation. */
  remediationUri?: RelatedUrl;
}

export const Remediation: Schema.Schema<Remediation> = Schema.suspend(() => Schema.Struct({
  remediationType: Schema.optional(Schema.String),
  details: Schema.optional(Schema.String),
  remediationUri: Schema.optional(RelatedUrl),
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

export interface VexAssessment {
  /** Holds the MITRE standard Common Vulnerabilities and Exposures (CVE) tracking number for the vulnerability. Deprecated: Use vulnerability_id instead to denote CVEs. */
  cve?: string;
  /** The vulnerability identifier for this Assessment. Will hold one of common identifiers e.g. CVE, GHSA etc. */
  vulnerabilityId?: string;
  /** Holds a list of references associated with this vulnerability item and assessment. */
  relatedUris?: Array<RelatedUrl>;
  /** The VulnerabilityAssessment note from which this VexAssessment was generated. This will be of the form: `projects/[PROJECT_ID]/notes/[NOTE_ID]`. */
  noteName?: string;
  /** Provides the state of this Vulnerability assessment. */
  state?: "STATE_UNSPECIFIED" | "AFFECTED" | "NOT_AFFECTED" | "FIXED" | "UNDER_INVESTIGATION" | (string & {});
  /** Contains information about the impact of this vulnerability, this will change with time. */
  impacts?: Array<string>;
  /** Specifies details on how to handle (and presumably, fix) a vulnerability. */
  remediations?: Array<Remediation>;
  /** Justification provides the justification when the state of the assessment if NOT_AFFECTED. */
  justification?: Justification;
}

export const VexAssessment: Schema.Schema<VexAssessment> = Schema.suspend(() => Schema.Struct({
  cve: Schema.optional(Schema.String),
  vulnerabilityId: Schema.optional(Schema.String),
  relatedUris: Schema.optional(Schema.Array(RelatedUrl)),
  noteName: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  impacts: Schema.optional(Schema.Array(Schema.String)),
  remediations: Schema.optional(Schema.Array(Remediation)),
  justification: Schema.optional(Justification),
})).annotate({ identifier: "VexAssessment" }) as any as Schema.Schema<VexAssessment>;

export interface CISAKnownExploitedVulnerabilities {
  /** Whether the vulnerability is known to have been leveraged as part of a ransomware campaign. */
  knownRansomwareCampaignUse?: string;
}

export const CISAKnownExploitedVulnerabilities: Schema.Schema<CISAKnownExploitedVulnerabilities> = Schema.suspend(() => Schema.Struct({
  knownRansomwareCampaignUse: Schema.optional(Schema.String),
})).annotate({ identifier: "CISAKnownExploitedVulnerabilities" }) as any as Schema.Schema<CISAKnownExploitedVulnerabilities>;

export interface ExploitPredictionScoringSystem {
  /** The percentile of the current score, the proportion of all scored vulnerabilities with the same or a lower EPSS score */
  percentile?: number;
  /** The EPSS score representing the probability [0-1] of exploitation in the wild in the next 30 days */
  score?: number;
}

export const ExploitPredictionScoringSystem: Schema.Schema<ExploitPredictionScoringSystem> = Schema.suspend(() => Schema.Struct({
  percentile: Schema.optional(Schema.Number),
  score: Schema.optional(Schema.Number),
})).annotate({ identifier: "ExploitPredictionScoringSystem" }) as any as Schema.Schema<ExploitPredictionScoringSystem>;

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

export interface VulnerabilityOccurrence {
  /** The type of package; whether native or non native (e.g., ruby gems, node.js packages, etc.). */
  type?: string;
  /** Output only. The note provider assigned severity of this vulnerability. */
  severity?: "SEVERITY_UNSPECIFIED" | "MINIMAL" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | (string & {});
  /** Output only. The CVSS score of this vulnerability. CVSS score is on a scale of 0 - 10 where 0 indicates low severity and 10 indicates high severity. */
  cvssScore?: number;
  /** The cvss v3 score for the vulnerability. */
  cvssv3?: CVSS;
  /** Required. The set of affected locations and their fixes (if available) within the associated resource. */
  packageIssue?: Array<PackageIssue>;
  /** Output only. A one sentence description of this vulnerability. */
  shortDescription?: string;
  /** Output only. A detailed description of this vulnerability. */
  longDescription?: string;
  /** Output only. URLs related to this vulnerability. */
  relatedUrls?: Array<RelatedUrl>;
  /** The distro assigned severity for this vulnerability when it is available, otherwise this is the note provider assigned severity. When there are multiple PackageIssues for this vulnerability, they can have different effective severities because some might be provided by the distro while others are provided by the language ecosystem for a language pack. For this reason, it is advised to use the effective severity on the PackageIssue level. In the case where multiple PackageIssues have differing effective severities, this field should be the highest severity for any of the PackageIssues. */
  effectiveSeverity?: "SEVERITY_UNSPECIFIED" | "MINIMAL" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | (string & {});
  /** Output only. Whether at least one of the affected packages has a fix available. */
  fixAvailable?: boolean;
  /** Output only. CVSS version used to populate cvss_score and severity. */
  cvssVersion?: "CVSS_VERSION_UNSPECIFIED" | "CVSS_VERSION_2" | "CVSS_VERSION_3" | (string & {});
  /** The cvss v2 score for the vulnerability. */
  cvssV2?: CVSS;
  vexAssessment?: VexAssessment;
  /** Occurrence-specific extra details about the vulnerability. */
  extraDetails?: string;
  /** Risk information about the vulnerability, such as CISA, EPSS, etc. */
  risk?: Risk;
}

export const VulnerabilityOccurrence: Schema.Schema<VulnerabilityOccurrence> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
  cvssScore: Schema.optional(Schema.Number),
  cvssv3: Schema.optional(CVSS),
  packageIssue: Schema.optional(Schema.Array(PackageIssue)),
  shortDescription: Schema.optional(Schema.String),
  longDescription: Schema.optional(Schema.String),
  relatedUrls: Schema.optional(Schema.Array(RelatedUrl)),
  effectiveSeverity: Schema.optional(Schema.String),
  fixAvailable: Schema.optional(Schema.Boolean),
  cvssVersion: Schema.optional(Schema.String),
  cvssV2: Schema.optional(CVSS),
  vexAssessment: Schema.optional(VexAssessment),
  extraDetails: Schema.optional(Schema.String),
  risk: Schema.optional(Risk),
})).annotate({ identifier: "VulnerabilityOccurrence" }) as any as Schema.Schema<VulnerabilityOccurrence>;

export interface Command {
  /** Required. Name of the command, as presented on the command line, or if the command is packaged as a Docker container, as presented to `docker pull`. */
  name?: string;
  /** Environment variables set before running this command. */
  env?: Array<string>;
  /** Command-line arguments used when executing this command. */
  args?: Array<string>;
  /** Working directory (relative to project source root) used when running this command. */
  dir?: string;
  /** Optional unique identifier for this command, used in wait_for to reference this command as a dependency. */
  id?: string;
  /** The ID(s) of the command(s) that this command depends on. */
  waitFor?: Array<string>;
}

export const Command: Schema.Schema<Command> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  env: Schema.optional(Schema.Array(Schema.String)),
  args: Schema.optional(Schema.Array(Schema.String)),
  dir: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  waitFor: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Command" }) as any as Schema.Schema<Command>;

export interface Artifact {
  /** Hash or checksum value of a binary, or Docker Registry 2.0 digest of a container. */
  checksum?: string;
  /** Artifact ID, if any; for container images, this will be a URL by digest like `gcr.io/projectID/imagename@sha256:123456`. */
  id?: string;
  /** Related artifact names. This may be the path to a binary or jar file, or in the case of a container build, the name used to push the container image to Google Container Registry, as presented to `docker push`. Note that a single Artifact ID can have multiple names, for example if two tags are applied to one image. */
  names?: Array<string>;
}

export const Artifact: Schema.Schema<Artifact> = Schema.suspend(() => Schema.Struct({
  checksum: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  names: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Artifact" }) as any as Schema.Schema<Artifact>;

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
  /** A combination of a project ID and a repo name. */
  projectRepoId?: ProjectRepoId;
  /** A server-assigned, globally unique identifier. */
  uid?: string;
}

export const RepoId: Schema.Schema<RepoId> = Schema.suspend(() => Schema.Struct({
  projectRepoId: Schema.optional(ProjectRepoId),
  uid: Schema.optional(Schema.String),
})).annotate({ identifier: "RepoId" }) as any as Schema.Schema<RepoId>;

export interface AliasContext {
  /** The alias kind. */
  kind?: "KIND_UNSPECIFIED" | "FIXED" | "MOVABLE" | "OTHER" | (string & {});
  /** The alias name. */
  name?: string;
}

export const AliasContext: Schema.Schema<AliasContext> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "AliasContext" }) as any as Schema.Schema<AliasContext>;

export interface CloudRepoSourceContext {
  /** The ID of the repo. */
  repoId?: RepoId;
  /** A revision ID. */
  revisionId?: string;
  /** An alias, which may be a branch or tag. */
  aliasContext?: AliasContext;
}

export const CloudRepoSourceContext: Schema.Schema<CloudRepoSourceContext> = Schema.suspend(() => Schema.Struct({
  repoId: Schema.optional(RepoId),
  revisionId: Schema.optional(Schema.String),
  aliasContext: Schema.optional(AliasContext),
})).annotate({ identifier: "CloudRepoSourceContext" }) as any as Schema.Schema<CloudRepoSourceContext>;

export interface GerritSourceContext {
  /** The URI of a running Gerrit instance. */
  hostUri?: string;
  /** The full project name within the host. Projects may be nested, so "project/subproject" is a valid project name. The "repo name" is the hostURI/project. */
  gerritProject?: string;
  /** A revision (commit) ID. */
  revisionId?: string;
  /** An alias, which may be a branch or tag. */
  aliasContext?: AliasContext;
}

export const GerritSourceContext: Schema.Schema<GerritSourceContext> = Schema.suspend(() => Schema.Struct({
  hostUri: Schema.optional(Schema.String),
  gerritProject: Schema.optional(Schema.String),
  revisionId: Schema.optional(Schema.String),
  aliasContext: Schema.optional(AliasContext),
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

export interface SourceContext {
  /** A SourceContext referring to a revision in a Google Cloud Source Repo. */
  cloudRepo?: CloudRepoSourceContext;
  /** A SourceContext referring to a Gerrit project. */
  gerrit?: GerritSourceContext;
  /** A SourceContext referring to any third party Git repo (e.g., GitHub). */
  git?: GitSourceContext;
  /** Labels with user defined metadata. */
  labels?: Record<string, string>;
}

export const SourceContext: Schema.Schema<SourceContext> = Schema.suspend(() => Schema.Struct({
  cloudRepo: Schema.optional(CloudRepoSourceContext),
  gerrit: Schema.optional(GerritSourceContext),
  git: Schema.optional(GitSourceContext),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "SourceContext" }) as any as Schema.Schema<SourceContext>;

export interface Source {
  /** If provided, the input binary artifacts for the build came from this location. */
  artifactStorageSourceUri?: string;
  /** Hash(es) of the build source, which can be used to verify that the original source integrity was maintained in the build. The keys to this map are file paths used as build source and the values contain the hash values for those files. If the build source came in a single package such as a gzipped tarfile (.tar.gz), the FileHash will be for the single path to that file. */
  fileHashes?: Record<string, FileHashes>;
  /** If provided, the source code used for the build came from this location. */
  context?: SourceContext;
  /** If provided, some of the source code used for the build may be found in these locations, in the case where the source repository had multiple remotes or submodules. This list will not include the context specified in the context field. */
  additionalContexts?: Array<SourceContext>;
}

export const Source: Schema.Schema<Source> = Schema.suspend(() => Schema.Struct({
  artifactStorageSourceUri: Schema.optional(Schema.String),
  fileHashes: Schema.optional(Schema.Record(Schema.String, FileHashes)),
  context: Schema.optional(SourceContext),
  additionalContexts: Schema.optional(Schema.Array(SourceContext)),
})).annotate({ identifier: "Source" }) as any as Schema.Schema<Source>;

export interface BuildProvenance {
  /** Required. Unique identifier of the build. */
  id?: string;
  /** ID of the project. */
  projectId?: string;
  /** Commands requested by the build. */
  commands?: Array<Command>;
  /** Output of the build. */
  builtArtifacts?: Array<Artifact>;
  /** Time at which the build was created. */
  createTime?: string;
  /** Time at which execution of the build was started. */
  startTime?: string;
  /** Time at which execution of the build was finished. */
  endTime?: string;
  /** E-mail address of the user who initiated this build. Note that this was the user's e-mail address at the time the build was initiated; this address may not represent the same end-user for all time. */
  creator?: string;
  /** URI where any logs for this provenance were written. */
  logsUri?: string;
  /** Details of the Source input to the build. */
  sourceProvenance?: Source;
  /** Trigger identifier if the build was triggered automatically; empty if not. */
  triggerId?: string;
  /** Special options applied to this build. This is a catch-all field where build providers can enter any desired additional details. */
  buildOptions?: Record<string, string>;
  /** Version string of the builder at the time this build was executed. */
  builderVersion?: string;
}

export const BuildProvenance: Schema.Schema<BuildProvenance> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  commands: Schema.optional(Schema.Array(Command)),
  builtArtifacts: Schema.optional(Schema.Array(Artifact)),
  createTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  creator: Schema.optional(Schema.String),
  logsUri: Schema.optional(Schema.String),
  sourceProvenance: Schema.optional(Source),
  triggerId: Schema.optional(Schema.String),
  buildOptions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  builderVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "BuildProvenance" }) as any as Schema.Schema<BuildProvenance>;

export interface BuilderConfig {
  id?: string;
}

export const BuilderConfig: Schema.Schema<BuilderConfig> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "BuilderConfig" }) as any as Schema.Schema<BuilderConfig>;

export interface Recipe {
  /** URI indicating what type of recipe was performed. It determines the meaning of recipe.entryPoint, recipe.arguments, recipe.environment, and materials. */
  type?: string;
  /** Index in materials containing the recipe steps that are not implied by recipe.type. For example, if the recipe type were "make", then this would point to the source containing the Makefile, not the make program itself. Set to -1 if the recipe doesn't come from a material, as zero is default unset value for int64. */
  definedInMaterial?: string;
  /** String identifying the entry point into the build. This is often a path to a configuration file and/or a target label within that file. The syntax and meaning are defined by recipe.type. For example, if the recipe type were "make", then this would reference the directory in which to run make as well as which target to use. */
  entryPoint?: string;
  /** Collection of all external inputs that influenced the build on top of recipe.definedInMaterial and recipe.entryPoint. For example, if the recipe type were "make", then this might be the flags passed to make aside from the target, which is captured in recipe.entryPoint. Since the arguments field can greatly vary in structure, depending on the builder and recipe type, this is of form "Any". */
  arguments?: Array<Record<string, unknown>>;
  /** Any other builder-controlled inputs necessary for correctly evaluating the recipe. Usually only needed for reproducing the build but not evaluated as part of policy. Since the environment field can greatly vary in structure, depending on the builder and recipe type, this is of form "Any". */
  environment?: Array<Record<string, unknown>>;
}

export const Recipe: Schema.Schema<Recipe> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  definedInMaterial: Schema.optional(Schema.String),
  entryPoint: Schema.optional(Schema.String),
  arguments: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  environment: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "Recipe" }) as any as Schema.Schema<Recipe>;

export interface Completeness {
  /** If true, the builder claims that recipe.arguments is complete, meaning that all external inputs are properly captured in the recipe. */
  arguments?: boolean;
  /** If true, the builder claims that recipe.environment is claimed to be complete. */
  environment?: boolean;
  /** If true, the builder claims that materials are complete, usually through some controls to prevent network access. Sometimes called "hermetic". */
  materials?: boolean;
}

export const Completeness: Schema.Schema<Completeness> = Schema.suspend(() => Schema.Struct({
  arguments: Schema.optional(Schema.Boolean),
  environment: Schema.optional(Schema.Boolean),
  materials: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Completeness" }) as any as Schema.Schema<Completeness>;

export interface Metadata {
  /** Identifies the particular build invocation, which can be useful for finding associated logs or other ad-hoc analysis. The value SHOULD be globally unique, per in-toto Provenance spec. */
  buildInvocationId?: string;
  /** The timestamp of when the build started. */
  buildStartedOn?: string;
  /** The timestamp of when the build completed. */
  buildFinishedOn?: string;
  /** Indicates that the builder claims certain fields in this message to be complete. */
  completeness?: Completeness;
  /** If true, the builder claims that running the recipe on materials will produce bit-for-bit identical output. */
  reproducible?: boolean;
}

export const Metadata: Schema.Schema<Metadata> = Schema.suspend(() => Schema.Struct({
  buildInvocationId: Schema.optional(Schema.String),
  buildStartedOn: Schema.optional(Schema.String),
  buildFinishedOn: Schema.optional(Schema.String),
  completeness: Schema.optional(Completeness),
  reproducible: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Metadata" }) as any as Schema.Schema<Metadata>;

export interface InTotoProvenance {
  /** required */
  builderConfig?: BuilderConfig;
  /** Identifies the configuration used for the build. When combined with materials, this SHOULD fully describe the build, such that re-running this recipe results in bit-for-bit identical output (if the build is reproducible). required */
  recipe?: Recipe;
  metadata?: Metadata;
  /** The collection of artifacts that influenced the build including sources, dependencies, build tools, base images, and so on. This is considered to be incomplete unless metadata.completeness.materials is true. Unset or null is equivalent to empty. */
  materials?: Array<string>;
}

export const InTotoProvenance: Schema.Schema<InTotoProvenance> = Schema.suspend(() => Schema.Struct({
  builderConfig: Schema.optional(BuilderConfig),
  recipe: Schema.optional(Recipe),
  metadata: Schema.optional(Metadata),
  materials: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "InTotoProvenance" }) as any as Schema.Schema<InTotoProvenance>;

export interface Subject {
  name?: string;
  /** `"": ""` Algorithms can be e.g. sha256, sha512 See https://github.com/in-toto/attestation/blob/main/spec/field_types.md#DigestSet */
  digest?: Record<string, string>;
}

export const Subject: Schema.Schema<Subject> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  digest: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "Subject" }) as any as Schema.Schema<Subject>;

export interface SlsaBuilder {
  id?: string;
}

export const SlsaBuilder: Schema.Schema<SlsaBuilder> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "SlsaBuilder" }) as any as Schema.Schema<SlsaBuilder>;

export interface SlsaRecipe {
  /** URI indicating what type of recipe was performed. It determines the meaning of recipe.entryPoint, recipe.arguments, recipe.environment, and materials. */
  type?: string;
  /** Index in materials containing the recipe steps that are not implied by recipe.type. For example, if the recipe type were "make", then this would point to the source containing the Makefile, not the make program itself. Set to -1 if the recipe doesn't come from a material, as zero is default unset value for int64. */
  definedInMaterial?: string;
  /** String identifying the entry point into the build. This is often a path to a configuration file and/or a target label within that file. The syntax and meaning are defined by recipe.type. For example, if the recipe type were "make", then this would reference the directory in which to run make as well as which target to use. */
  entryPoint?: string;
  /** Collection of all external inputs that influenced the build on top of recipe.definedInMaterial and recipe.entryPoint. For example, if the recipe type were "make", then this might be the flags passed to make aside from the target, which is captured in recipe.entryPoint. Depending on the recipe Type, the structure may be different. */
  arguments?: Record<string, unknown>;
  /** Any other builder-controlled inputs necessary for correctly evaluating the recipe. Usually only needed for reproducing the build but not evaluated as part of policy. Depending on the recipe Type, the structure may be different. */
  environment?: Record<string, unknown>;
}

export const SlsaRecipe: Schema.Schema<SlsaRecipe> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  definedInMaterial: Schema.optional(Schema.String),
  entryPoint: Schema.optional(Schema.String),
  arguments: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  environment: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "SlsaRecipe" }) as any as Schema.Schema<SlsaRecipe>;

export interface SlsaCompleteness {
  /** If true, the builder claims that recipe.arguments is complete, meaning that all external inputs are properly captured in the recipe. */
  arguments?: boolean;
  /** If true, the builder claims that recipe.environment is claimed to be complete. */
  environment?: boolean;
  /** If true, the builder claims that materials are complete, usually through some controls to prevent network access. Sometimes called "hermetic". */
  materials?: boolean;
}

export const SlsaCompleteness: Schema.Schema<SlsaCompleteness> = Schema.suspend(() => Schema.Struct({
  arguments: Schema.optional(Schema.Boolean),
  environment: Schema.optional(Schema.Boolean),
  materials: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "SlsaCompleteness" }) as any as Schema.Schema<SlsaCompleteness>;

export interface SlsaMetadata {
  /** Identifies the particular build invocation, which can be useful for finding associated logs or other ad-hoc analysis. The value SHOULD be globally unique, per in-toto Provenance spec. */
  buildInvocationId?: string;
  /** The timestamp of when the build started. */
  buildStartedOn?: string;
  /** The timestamp of when the build completed. */
  buildFinishedOn?: string;
  /** Indicates that the builder claims certain fields in this message to be complete. */
  completeness?: SlsaCompleteness;
  /** If true, the builder claims that running the recipe on materials will produce bit-for-bit identical output. */
  reproducible?: boolean;
}

export const SlsaMetadata: Schema.Schema<SlsaMetadata> = Schema.suspend(() => Schema.Struct({
  buildInvocationId: Schema.optional(Schema.String),
  buildStartedOn: Schema.optional(Schema.String),
  buildFinishedOn: Schema.optional(Schema.String),
  completeness: Schema.optional(SlsaCompleteness),
  reproducible: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "SlsaMetadata" }) as any as Schema.Schema<SlsaMetadata>;

export interface Material {
  uri?: string;
  digest?: Record<string, string>;
}

export const Material: Schema.Schema<Material> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  digest: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "Material" }) as any as Schema.Schema<Material>;

export interface SlsaProvenance {
  /** required */
  builder?: SlsaBuilder;
  /** Identifies the configuration used for the build. When combined with materials, this SHOULD fully describe the build, such that re-running this recipe results in bit-for-bit identical output (if the build is reproducible). required */
  recipe?: SlsaRecipe;
  metadata?: SlsaMetadata;
  /** The collection of artifacts that influenced the build including sources, dependencies, build tools, base images, and so on. This is considered to be incomplete unless metadata.completeness.materials is true. Unset or null is equivalent to empty. */
  materials?: Array<Material>;
}

export const SlsaProvenance: Schema.Schema<SlsaProvenance> = Schema.suspend(() => Schema.Struct({
  builder: Schema.optional(SlsaBuilder),
  recipe: Schema.optional(SlsaRecipe),
  metadata: Schema.optional(SlsaMetadata),
  materials: Schema.optional(Schema.Array(Material)),
})).annotate({ identifier: "SlsaProvenance" }) as any as Schema.Schema<SlsaProvenance>;

export interface GrafeasV1SlsaProvenanceZeroTwoSlsaBuilder {
  id?: string;
}

export const GrafeasV1SlsaProvenanceZeroTwoSlsaBuilder: Schema.Schema<GrafeasV1SlsaProvenanceZeroTwoSlsaBuilder> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "GrafeasV1SlsaProvenanceZeroTwoSlsaBuilder" }) as any as Schema.Schema<GrafeasV1SlsaProvenanceZeroTwoSlsaBuilder>;

export interface GrafeasV1SlsaProvenanceZeroTwoSlsaConfigSource {
  uri?: string;
  digest?: Record<string, string>;
  entryPoint?: string;
}

export const GrafeasV1SlsaProvenanceZeroTwoSlsaConfigSource: Schema.Schema<GrafeasV1SlsaProvenanceZeroTwoSlsaConfigSource> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  digest: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  entryPoint: Schema.optional(Schema.String),
})).annotate({ identifier: "GrafeasV1SlsaProvenanceZeroTwoSlsaConfigSource" }) as any as Schema.Schema<GrafeasV1SlsaProvenanceZeroTwoSlsaConfigSource>;

export interface GrafeasV1SlsaProvenanceZeroTwoSlsaInvocation {
  configSource?: GrafeasV1SlsaProvenanceZeroTwoSlsaConfigSource;
  parameters?: Record<string, unknown>;
  environment?: Record<string, unknown>;
}

export const GrafeasV1SlsaProvenanceZeroTwoSlsaInvocation: Schema.Schema<GrafeasV1SlsaProvenanceZeroTwoSlsaInvocation> = Schema.suspend(() => Schema.Struct({
  configSource: Schema.optional(GrafeasV1SlsaProvenanceZeroTwoSlsaConfigSource),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  environment: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GrafeasV1SlsaProvenanceZeroTwoSlsaInvocation" }) as any as Schema.Schema<GrafeasV1SlsaProvenanceZeroTwoSlsaInvocation>;

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

export interface GrafeasV1SlsaProvenanceZeroTwoSlsaMetadata {
  buildInvocationId?: string;
  buildStartedOn?: string;
  buildFinishedOn?: string;
  completeness?: GrafeasV1SlsaProvenanceZeroTwoSlsaCompleteness;
  reproducible?: boolean;
}

export const GrafeasV1SlsaProvenanceZeroTwoSlsaMetadata: Schema.Schema<GrafeasV1SlsaProvenanceZeroTwoSlsaMetadata> = Schema.suspend(() => Schema.Struct({
  buildInvocationId: Schema.optional(Schema.String),
  buildStartedOn: Schema.optional(Schema.String),
  buildFinishedOn: Schema.optional(Schema.String),
  completeness: Schema.optional(GrafeasV1SlsaProvenanceZeroTwoSlsaCompleteness),
  reproducible: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GrafeasV1SlsaProvenanceZeroTwoSlsaMetadata" }) as any as Schema.Schema<GrafeasV1SlsaProvenanceZeroTwoSlsaMetadata>;

export interface GrafeasV1SlsaProvenanceZeroTwoSlsaMaterial {
  uri?: string;
  digest?: Record<string, string>;
}

export const GrafeasV1SlsaProvenanceZeroTwoSlsaMaterial: Schema.Schema<GrafeasV1SlsaProvenanceZeroTwoSlsaMaterial> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  digest: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GrafeasV1SlsaProvenanceZeroTwoSlsaMaterial" }) as any as Schema.Schema<GrafeasV1SlsaProvenanceZeroTwoSlsaMaterial>;

export interface SlsaProvenanceZeroTwo {
  builder?: GrafeasV1SlsaProvenanceZeroTwoSlsaBuilder;
  buildType?: string;
  invocation?: GrafeasV1SlsaProvenanceZeroTwoSlsaInvocation;
  buildConfig?: Record<string, unknown>;
  metadata?: GrafeasV1SlsaProvenanceZeroTwoSlsaMetadata;
  materials?: Array<GrafeasV1SlsaProvenanceZeroTwoSlsaMaterial>;
}

export const SlsaProvenanceZeroTwo: Schema.Schema<SlsaProvenanceZeroTwo> = Schema.suspend(() => Schema.Struct({
  builder: Schema.optional(GrafeasV1SlsaProvenanceZeroTwoSlsaBuilder),
  buildType: Schema.optional(Schema.String),
  invocation: Schema.optional(GrafeasV1SlsaProvenanceZeroTwoSlsaInvocation),
  buildConfig: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  metadata: Schema.optional(GrafeasV1SlsaProvenanceZeroTwoSlsaMetadata),
  materials: Schema.optional(Schema.Array(GrafeasV1SlsaProvenanceZeroTwoSlsaMaterial)),
})).annotate({ identifier: "SlsaProvenanceZeroTwo" }) as any as Schema.Schema<SlsaProvenanceZeroTwo>;

export interface InTotoStatement {
  /** Always `https://in-toto.io/Statement/v0.1`. */
  _type?: string;
  subject?: Array<Subject>;
  /** `https://slsa.dev/provenance/v0.1` for SlsaProvenance. */
  predicateType?: string;
  provenance?: InTotoProvenance;
  slsaProvenance?: SlsaProvenance;
  slsaProvenanceZeroTwo?: SlsaProvenanceZeroTwo;
}

export const InTotoStatement: Schema.Schema<InTotoStatement> = Schema.suspend(() => Schema.Struct({
  _type: Schema.optional(Schema.String),
  subject: Schema.optional(Schema.Array(Subject)),
  predicateType: Schema.optional(Schema.String),
  provenance: Schema.optional(InTotoProvenance),
  slsaProvenance: Schema.optional(SlsaProvenance),
  slsaProvenanceZeroTwo: Schema.optional(SlsaProvenanceZeroTwo),
})).annotate({ identifier: "InTotoStatement" }) as any as Schema.Schema<InTotoStatement>;

export interface ResourceDescriptor {
  name?: string;
  uri?: string;
  digest?: Record<string, string>;
  content?: string;
  downloadLocation?: string;
  mediaType?: string;
  annotations?: Record<string, unknown>;
}

export const ResourceDescriptor: Schema.Schema<ResourceDescriptor> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  digest: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  content: Schema.optional(Schema.String),
  downloadLocation: Schema.optional(Schema.String),
  mediaType: Schema.optional(Schema.String),
  annotations: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "ResourceDescriptor" }) as any as Schema.Schema<ResourceDescriptor>;

export interface BuildDefinition {
  buildType?: string;
  externalParameters?: Record<string, unknown>;
  internalParameters?: Record<string, unknown>;
  resolvedDependencies?: Array<ResourceDescriptor>;
}

export const BuildDefinition: Schema.Schema<BuildDefinition> = Schema.suspend(() => Schema.Struct({
  buildType: Schema.optional(Schema.String),
  externalParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  internalParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  resolvedDependencies: Schema.optional(Schema.Array(ResourceDescriptor)),
})).annotate({ identifier: "BuildDefinition" }) as any as Schema.Schema<BuildDefinition>;

export interface ProvenanceBuilder {
  id?: string;
  version?: Record<string, string>;
  builderDependencies?: Array<ResourceDescriptor>;
}

export const ProvenanceBuilder: Schema.Schema<ProvenanceBuilder> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  version: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  builderDependencies: Schema.optional(Schema.Array(ResourceDescriptor)),
})).annotate({ identifier: "ProvenanceBuilder" }) as any as Schema.Schema<ProvenanceBuilder>;

export interface BuildMetadata {
  invocationId?: string;
  startedOn?: string;
  finishedOn?: string;
}

export const BuildMetadata: Schema.Schema<BuildMetadata> = Schema.suspend(() => Schema.Struct({
  invocationId: Schema.optional(Schema.String),
  startedOn: Schema.optional(Schema.String),
  finishedOn: Schema.optional(Schema.String),
})).annotate({ identifier: "BuildMetadata" }) as any as Schema.Schema<BuildMetadata>;

export interface RunDetails {
  builder?: ProvenanceBuilder;
  metadata?: BuildMetadata;
  byproducts?: Array<ResourceDescriptor>;
}

export const RunDetails: Schema.Schema<RunDetails> = Schema.suspend(() => Schema.Struct({
  builder: Schema.optional(ProvenanceBuilder),
  metadata: Schema.optional(BuildMetadata),
  byproducts: Schema.optional(Schema.Array(ResourceDescriptor)),
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

export interface BuildOccurrence {
  /** The actual provenance for the build. */
  provenance?: BuildProvenance;
  /** Serialized JSON representation of the provenance, used in generating the build signature in the corresponding build note. After verifying the signature, `provenance_bytes` can be unmarshalled and compared to the provenance to confirm that it is unchanged. A base64-encoded string representation of the provenance bytes is used for the signature in order to interoperate with openssl which expects this format for signature verification. The serialized form is captured both to avoid ambiguity in how the provenance is marshalled to json as well to prevent incompatibilities with future changes. */
  provenanceBytes?: string;
  /** Deprecated. See InTotoStatement for the replacement. In-toto Provenance representation as defined in spec. */
  intotoProvenance?: InTotoProvenance;
  /** In-toto Statement representation as defined in spec. The intoto_statement can contain any type of provenance. The serialized payload of the statement can be stored and signed in the Occurrence's envelope. */
  intotoStatement?: InTotoStatement;
  /** In-Toto Slsa Provenance V1 represents a slsa provenance meeting the slsa spec, wrapped in an in-toto statement. This allows for direct jsonification of a to-spec in-toto slsa statement with a to-spec slsa provenance. */
  inTotoSlsaProvenanceV1?: InTotoSlsaProvenanceV1;
}

export const BuildOccurrence: Schema.Schema<BuildOccurrence> = Schema.suspend(() => Schema.Struct({
  provenance: Schema.optional(BuildProvenance),
  provenanceBytes: Schema.optional(Schema.String),
  intotoProvenance: Schema.optional(InTotoProvenance),
  intotoStatement: Schema.optional(InTotoStatement),
  inTotoSlsaProvenanceV1: Schema.optional(InTotoSlsaProvenanceV1),
})).annotate({ identifier: "BuildOccurrence" }) as any as Schema.Schema<BuildOccurrence>;

export interface Fingerprint {
  /** Required. The layer ID of the final layer in the Docker image's v1 representation. */
  v1Name?: string;
  /** Required. The ordered list of v2 blobs that represent a given image. */
  v2Blob?: Array<string>;
  /** Output only. The name of the image's v2 blobs computed via: [bottom] := v2_blobbottom := sha256(v2_blob[N] + " " + v2_name[N+1]) Only the name of the final blob is kept. */
  v2Name?: string;
}

export const Fingerprint: Schema.Schema<Fingerprint> = Schema.suspend(() => Schema.Struct({
  v1Name: Schema.optional(Schema.String),
  v2Blob: Schema.optional(Schema.Array(Schema.String)),
  v2Name: Schema.optional(Schema.String),
})).annotate({ identifier: "Fingerprint" }) as any as Schema.Schema<Fingerprint>;

export interface Layer {
  /** Required. The recovered Dockerfile directive used to construct this layer. See https://docs.docker.com/engine/reference/builder/ for more information. */
  directive?: string;
  /** The recovered arguments to the Dockerfile directive. */
  arguments?: string;
}

export const Layer: Schema.Schema<Layer> = Schema.suspend(() => Schema.Struct({
  directive: Schema.optional(Schema.String),
  arguments: Schema.optional(Schema.String),
})).annotate({ identifier: "Layer" }) as any as Schema.Schema<Layer>;

export interface ImageOccurrence {
  /** Required. The fingerprint of the derived image. */
  fingerprint?: Fingerprint;
  /** Output only. The number of layers by which this image differs from the associated image basis. */
  distance?: number;
  /** This contains layer-specific metadata, if populated it has length "distance" and is ordered with [distance] being the layer immediately following the base image and [1] being the final layer. */
  layerInfo?: Array<Layer>;
  /** Output only. This contains the base image URL for the derived image occurrence. */
  baseResourceUrl?: string;
}

export const ImageOccurrence: Schema.Schema<ImageOccurrence> = Schema.suspend(() => Schema.Struct({
  fingerprint: Schema.optional(Fingerprint),
  distance: Schema.optional(Schema.Number),
  layerInfo: Schema.optional(Schema.Array(Layer)),
  baseResourceUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "ImageOccurrence" }) as any as Schema.Schema<ImageOccurrence>;

export interface Location {
  /** Deprecated. The CPE URI in [CPE format](https://cpe.mitre.org/specification/) */
  cpeUri?: string;
  /** Deprecated. The version installed at this location. */
  version?: Version;
  /** The path from which we gathered that this package/version is installed. */
  path?: string;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  cpeUri: Schema.optional(Schema.String),
  version: Schema.optional(Version),
  path: Schema.optional(Schema.String),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface License {
  /** Often a single license can be used to represent the licensing terms. Sometimes it is necessary to include a choice of one or more licenses or some combination of license identifiers. Examples: "LGPL-2.1-only OR MIT", "LGPL-2.1-only AND MIT", "GPL-2.0-or-later WITH Bison-exception-2.2". */
  expression?: string;
  /** Comments */
  comments?: string;
}

export const License: Schema.Schema<License> = Schema.suspend(() => Schema.Struct({
  expression: Schema.optional(Schema.String),
  comments: Schema.optional(Schema.String),
})).annotate({ identifier: "License" }) as any as Schema.Schema<License>;

export interface PackageOccurrence {
  /** Required. Output only. The name of the installed package. */
  name?: string;
  /** All of the places within the filesystem versions of this package have been found. */
  location?: Array<Location>;
  /** Output only. The type of package; whether native or non native (e.g., ruby gems, node.js packages, etc.). */
  packageType?: string;
  /** Output only. The cpe_uri in [CPE format](https://cpe.mitre.org/specification/) denoting the package manager version distributing a package. The cpe_uri will be blank for language packages. */
  cpeUri?: string;
  /** Output only. The CPU architecture for which packages in this distribution channel were built. Architecture will be blank for language packages. */
  architecture?: "ARCHITECTURE_UNSPECIFIED" | "X86" | "X64" | (string & {});
  /** Licenses that have been declared by the authors of the package. */
  license?: License;
  /** Output only. The version of the package. */
  version?: Version;
}

export const PackageOccurrence: Schema.Schema<PackageOccurrence> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  location: Schema.optional(Schema.Array(Location)),
  packageType: Schema.optional(Schema.String),
  cpeUri: Schema.optional(Schema.String),
  architecture: Schema.optional(Schema.String),
  license: Schema.optional(License),
  version: Schema.optional(Version),
})).annotate({ identifier: "PackageOccurrence" }) as any as Schema.Schema<PackageOccurrence>;

export interface DeploymentOccurrence {
  /** Identity of the user that triggered this deployment. */
  userEmail?: string;
  /** Required. Beginning of the lifetime of this deployment. */
  deployTime?: string;
  /** End of the lifetime of this deployment. */
  undeployTime?: string;
  /** Configuration used to create this deployment. */
  config?: string;
  /** Address of the runtime element hosting this deployment. */
  address?: string;
  /** Output only. Resource URI for the artifact being deployed taken from the deployable field with the same name. */
  resourceUri?: Array<string>;
  /** Platform hosting this deployment. */
  platform?: "PLATFORM_UNSPECIFIED" | "GKE" | "FLEX" | "CUSTOM" | (string & {});
}

export const DeploymentOccurrence: Schema.Schema<DeploymentOccurrence> = Schema.suspend(() => Schema.Struct({
  userEmail: Schema.optional(Schema.String),
  deployTime: Schema.optional(Schema.String),
  undeployTime: Schema.optional(Schema.String),
  config: Schema.optional(Schema.String),
  address: Schema.optional(Schema.String),
  resourceUri: Schema.optional(Schema.Array(Schema.String)),
  platform: Schema.optional(Schema.String),
})).annotate({ identifier: "DeploymentOccurrence" }) as any as Schema.Schema<DeploymentOccurrence>;

export interface AnalysisCompleted {
  analysisType?: Array<string>;
}

export const AnalysisCompleted: Schema.Schema<AnalysisCompleted> = Schema.suspend(() => Schema.Struct({
  analysisType: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AnalysisCompleted" }) as any as Schema.Schema<AnalysisCompleted>;

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

export interface File {
  name?: string;
  digest?: Record<string, string>;
}

export const File: Schema.Schema<File> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  digest: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "File" }) as any as Schema.Schema<File>;

export interface DiscoveryOccurrence {
  /** Whether the resource is continuously analyzed. */
  continuousAnalysis?: "CONTINUOUS_ANALYSIS_UNSPECIFIED" | "ACTIVE" | "INACTIVE" | (string & {});
  /** The status of discovery for the resource. */
  analysisStatus?: "ANALYSIS_STATUS_UNSPECIFIED" | "PENDING" | "SCANNING" | "FINISHED_SUCCESS" | "COMPLETE" | "FINISHED_FAILED" | "FINISHED_UNSUPPORTED" | (string & {});
  analysisCompleted?: AnalysisCompleted;
  /** Indicates any errors encountered during analysis of a resource. There could be 0 or more of these errors. */
  analysisError?: Array<Status>;
  /** When an error is encountered this will contain a LocalizedMessage under details to show to the user. The LocalizedMessage is output only and populated by the API. */
  analysisStatusError?: Status;
  /** The CPE of the resource being scanned. */
  cpe?: string;
  /** The last time this resource was scanned. */
  lastScanTime?: string;
  /** Output only. The time occurrences related to this discovery occurrence were archived. */
  archiveTime?: string;
  /** The status of an SBOM generation. */
  sbomStatus?: SBOMStatus;
  /** Files that make up the resource described by the occurrence. */
  files?: Array<File>;
  /** The last time vulnerability scan results changed. */
  lastVulnerabilityUpdateTime?: string;
}

export const DiscoveryOccurrence: Schema.Schema<DiscoveryOccurrence> = Schema.suspend(() => Schema.Struct({
  continuousAnalysis: Schema.optional(Schema.String),
  analysisStatus: Schema.optional(Schema.String),
  analysisCompleted: Schema.optional(AnalysisCompleted),
  analysisError: Schema.optional(Schema.Array(Status)),
  analysisStatusError: Schema.optional(Status),
  cpe: Schema.optional(Schema.String),
  lastScanTime: Schema.optional(Schema.String),
  archiveTime: Schema.optional(Schema.String),
  sbomStatus: Schema.optional(SBOMStatus),
  files: Schema.optional(Schema.Array(File)),
  lastVulnerabilityUpdateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "DiscoveryOccurrence" }) as any as Schema.Schema<DiscoveryOccurrence>;

export interface Signature {
  /** The content of the signature, an opaque bytestring. The payload that this signature verifies MUST be unambiguously provided with the Signature during verification. A wrapper message might provide the payload explicitly. Alternatively, a message might have a canonical serialization that can always be unambiguously computed to derive the payload. */
  signature?: string;
  /** The identifier for the public key that verifies this signature. * The `public_key_id` is required. * The `public_key_id` SHOULD be an RFC3986 conformant URI. * When possible, the `public_key_id` SHOULD be an immutable reference, such as a cryptographic digest. Examples of valid `public_key_id`s: OpenPGP V4 public key fingerprint: * "openpgp4fpr:74FAF3B861BDA0870C7B6DEF607E48D2A663AEEA" See https://www.iana.org/assignments/uri-schemes/prov/openpgp4fpr for more details on this scheme. RFC6920 digest-named SubjectPublicKeyInfo (digest of the DER serialization): * "ni:///sha-256;cD9o9Cq6LG3jD0iKXqEi_vdjJGecm_iXkbqVoScViaU" * "nih:///sha-256;703f68f42aba2c6de30f488a5ea122fef76324679c9bf89791ba95a1271589a5" */
  publicKeyId?: string;
}

export const Signature: Schema.Schema<Signature> = Schema.suspend(() => Schema.Struct({
  signature: Schema.optional(Schema.String),
  publicKeyId: Schema.optional(Schema.String),
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

export interface UpgradeDistribution {
  /** Required - The specific operating system this metadata applies to. See https://cpe.mitre.org/specification/. */
  cpeUri?: string;
  /** The operating system classification of this Upgrade, as specified by the upstream operating system upgrade feed. For Windows the classification is one of the category_ids listed at https://docs.microsoft.com/en-us/previous-versions/windows/desktop/ff357803(v=vs.85) */
  classification?: string;
  /** The severity as specified by the upstream operating system. */
  severity?: string;
  /** The cve tied to this Upgrade. */
  cve?: Array<string>;
}

export const UpgradeDistribution: Schema.Schema<UpgradeDistribution> = Schema.suspend(() => Schema.Struct({
  cpeUri: Schema.optional(Schema.String),
  classification: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
  cve: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "UpgradeDistribution" }) as any as Schema.Schema<UpgradeDistribution>;

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

export interface WindowsUpdate {
  /** Required - The unique identifier for the update. */
  identity?: Identity;
  /** The localized title of the update. */
  title?: string;
  /** The localized description of the update. */
  description?: string;
  /** The list of categories to which the update belongs. */
  categories?: Array<Category>;
  /** The Microsoft Knowledge Base article IDs that are associated with the update. */
  kbArticleIds?: Array<string>;
  /** The hyperlink to the support information for the update. */
  supportUrl?: string;
  /** The last published timestamp of the update. */
  lastPublishedTimestamp?: string;
}

export const WindowsUpdate: Schema.Schema<WindowsUpdate> = Schema.suspend(() => Schema.Struct({
  identity: Schema.optional(Identity),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  categories: Schema.optional(Schema.Array(Category)),
  kbArticleIds: Schema.optional(Schema.Array(Schema.String)),
  supportUrl: Schema.optional(Schema.String),
  lastPublishedTimestamp: Schema.optional(Schema.String),
})).annotate({ identifier: "WindowsUpdate" }) as any as Schema.Schema<WindowsUpdate>;

export interface UpgradeOccurrence {
  /** Required for non-Windows OS. The package this Upgrade is for. */
  package?: string;
  /** Required for non-Windows OS. The version of the package in a machine + human readable form. */
  parsedVersion?: Version;
  /** Metadata about the upgrade for available for the specific operating system for the resource_url. This allows efficient filtering, as well as making it easier to use the occurrence. */
  distribution?: UpgradeDistribution;
  /** Required for Windows OS. Represents the metadata about the Windows update. */
  windowsUpdate?: WindowsUpdate;
}

export const UpgradeOccurrence: Schema.Schema<UpgradeOccurrence> = Schema.suspend(() => Schema.Struct({
  package: Schema.optional(Schema.String),
  parsedVersion: Schema.optional(Version),
  distribution: Schema.optional(UpgradeDistribution),
  windowsUpdate: Schema.optional(WindowsUpdate),
})).annotate({ identifier: "UpgradeOccurrence" }) as any as Schema.Schema<UpgradeOccurrence>;

export interface NonCompliantFile {
  /** Empty if `display_command` is set. */
  path?: string;
  /** Command to display the non-compliant files. */
  displayCommand?: string;
  /** Explains why a file is non compliant for a CIS check. */
  reason?: string;
}

export const NonCompliantFile: Schema.Schema<NonCompliantFile> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
  displayCommand: Schema.optional(Schema.String),
  reason: Schema.optional(Schema.String),
})).annotate({ identifier: "NonCompliantFile" }) as any as Schema.Schema<NonCompliantFile>;

export interface ComplianceVersion {
  /** The CPE URI (https://cpe.mitre.org/specification/) this benchmark is applicable to. */
  cpeUri?: string;
  /** The name of the document that defines this benchmark, e.g. "CIS Container-Optimized OS". */
  benchmarkDocument?: string;
  /** The version of the benchmark. This is set to the version of the OS-specific CIS document the benchmark is defined in. */
  version?: string;
}

export const ComplianceVersion: Schema.Schema<ComplianceVersion> = Schema.suspend(() => Schema.Struct({
  cpeUri: Schema.optional(Schema.String),
  benchmarkDocument: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "ComplianceVersion" }) as any as Schema.Schema<ComplianceVersion>;

export interface ComplianceOccurrence {
  nonCompliantFiles?: Array<NonCompliantFile>;
  nonComplianceReason?: string;
  /** The OS and config version the benchmark was run on. */
  version?: ComplianceVersion;
}

export const ComplianceOccurrence: Schema.Schema<ComplianceOccurrence> = Schema.suspend(() => Schema.Struct({
  nonCompliantFiles: Schema.optional(Schema.Array(NonCompliantFile)),
  nonComplianceReason: Schema.optional(Schema.String),
  version: Schema.optional(ComplianceVersion),
})).annotate({ identifier: "ComplianceOccurrence" }) as any as Schema.Schema<ComplianceOccurrence>;

export interface EnvelopeSignature {
  sig?: string;
  keyid?: string;
}

export const EnvelopeSignature: Schema.Schema<EnvelopeSignature> = Schema.suspend(() => Schema.Struct({
  sig: Schema.optional(Schema.String),
  keyid: Schema.optional(Schema.String),
})).annotate({ identifier: "EnvelopeSignature" }) as any as Schema.Schema<EnvelopeSignature>;

export interface Envelope {
  payload?: string;
  payloadType?: string;
  signatures?: Array<EnvelopeSignature>;
}

export const Envelope: Schema.Schema<Envelope> = Schema.suspend(() => Schema.Struct({
  payload: Schema.optional(Schema.String),
  payloadType: Schema.optional(Schema.String),
  signatures: Schema.optional(Schema.Array(EnvelopeSignature)),
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

export interface SbomReferenceIntotoPredicate {
  /** The person or system referring this predicate to the consumer. */
  referrerId?: string;
  /** The location of the SBOM. */
  location?: string;
  /** The mime type of the SBOM. */
  mimeType?: string;
  /** A map of algorithm to digest of the contents of the SBOM. */
  digest?: Record<string, string>;
}

export const SbomReferenceIntotoPredicate: Schema.Schema<SbomReferenceIntotoPredicate> = Schema.suspend(() => Schema.Struct({
  referrerId: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  mimeType: Schema.optional(Schema.String),
  digest: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "SbomReferenceIntotoPredicate" }) as any as Schema.Schema<SbomReferenceIntotoPredicate>;

export interface SbomReferenceIntotoPayload {
  /** Identifier for the schema of the Statement. */
  _type?: string;
  /** URI identifying the type of the Predicate. */
  predicateType?: string;
  /** Set of software artifacts that the attestation applies to. Each element represents a single software artifact. */
  subject?: Array<Subject>;
  /** Additional parameters of the Predicate. Includes the actual data about the SBOM. */
  predicate?: SbomReferenceIntotoPredicate;
}

export const SbomReferenceIntotoPayload: Schema.Schema<SbomReferenceIntotoPayload> = Schema.suspend(() => Schema.Struct({
  _type: Schema.optional(Schema.String),
  predicateType: Schema.optional(Schema.String),
  subject: Schema.optional(Schema.Array(Subject)),
  predicate: Schema.optional(SbomReferenceIntotoPredicate),
})).annotate({ identifier: "SbomReferenceIntotoPayload" }) as any as Schema.Schema<SbomReferenceIntotoPayload>;

export interface SBOMReferenceOccurrence {
  /** The actual payload that contains the SBOM reference data. */
  payload?: SbomReferenceIntotoPayload;
  /** The kind of payload that SbomReferenceIntotoPayload takes. Since it's in the intoto format, this value is expected to be 'application/vnd.in-toto+json'. */
  payloadType?: string;
  /** The signatures over the payload. */
  signatures?: Array<EnvelopeSignature>;
}

export const SBOMReferenceOccurrence: Schema.Schema<SBOMReferenceOccurrence> = Schema.suspend(() => Schema.Struct({
  payload: Schema.optional(SbomReferenceIntotoPayload),
  payloadType: Schema.optional(Schema.String),
  signatures: Schema.optional(Schema.Array(EnvelopeSignature)),
})).annotate({ identifier: "SBOMReferenceOccurrence" }) as any as Schema.Schema<SBOMReferenceOccurrence>;

export interface SecretLocation {
  /** The secret is found from a file. */
  fileLocation?: GrafeasV1FileLocation;
}

export const SecretLocation: Schema.Schema<SecretLocation> = Schema.suspend(() => Schema.Struct({
  fileLocation: Schema.optional(GrafeasV1FileLocation),
})).annotate({ identifier: "SecretLocation" }) as any as Schema.Schema<SecretLocation>;

export interface SecretStatus {
  /** Optional. The status of the secret. */
  status?: "STATUS_UNSPECIFIED" | "UNKNOWN" | "VALID" | "INVALID" | (string & {});
  /** Optional. The time the secret status was last updated. */
  updateTime?: string;
  /** Optional. Optional message about the status code. */
  message?: string;
}

export const SecretStatus: Schema.Schema<SecretStatus> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
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

export interface Occurrence {
  /** Output only. The name of the occurrence in the form of `projects/[PROJECT_ID]/occurrences/[OCCURRENCE_ID]`. */
  name?: string;
  /** Required. Immutable. A URI that represents the resource for which the occurrence applies. For example, `https://gcr.io/project/image@sha256:123abc` for a Docker image. */
  resourceUri?: string;
  /** Required. Immutable. The analysis note associated with this occurrence, in the form of `projects/[PROVIDER_ID]/notes/[NOTE_ID]`. This field can be used as a filter in list requests. */
  noteName?: string;
  /** Output only. This explicitly denotes which of the occurrence details are specified. This field can be used as a filter in list requests. */
  kind?: "NOTE_KIND_UNSPECIFIED" | "VULNERABILITY" | "BUILD" | "IMAGE" | "PACKAGE" | "DEPLOYMENT" | "DISCOVERY" | "ATTESTATION" | "UPGRADE" | "COMPLIANCE" | "DSSE_ATTESTATION" | "VULNERABILITY_ASSESSMENT" | "SBOM_REFERENCE" | "SECRET" | (string & {});
  /** A description of actions that can be taken to remedy the note. */
  remediation?: string;
  /** Output only. The time this occurrence was created. */
  createTime?: string;
  /** Output only. The time this occurrence was last updated. */
  updateTime?: string;
  /** Describes a security vulnerability. */
  vulnerability?: VulnerabilityOccurrence;
  /** Describes a verifiable build. */
  build?: BuildOccurrence;
  /** Describes how this resource derives from the basis in the associated note. */
  image?: ImageOccurrence;
  /** Describes the installation of a package on the linked resource. */
  package?: PackageOccurrence;
  /** Describes the deployment of an artifact on a runtime. */
  deployment?: DeploymentOccurrence;
  /** Describes when a resource was discovered. */
  discovery?: DiscoveryOccurrence;
  /** Describes an attestation of an artifact. */
  attestation?: AttestationOccurrence;
  /** Describes an available package upgrade on the linked resource. */
  upgrade?: UpgradeOccurrence;
  /** Describes a compliance violation on a linked resource. */
  compliance?: ComplianceOccurrence;
  /** Describes an attestation of an artifact using dsse. */
  dsseAttestation?: DSSEAttestationOccurrence;
  /** Describes a specific SBOM reference occurrences. */
  sbomReference?: SBOMReferenceOccurrence;
  /** Describes a secret. */
  secret?: SecretOccurrence;
  /** https://github.com/secure-systems-lab/dsse */
  envelope?: Envelope;
}

export const Occurrence: Schema.Schema<Occurrence> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  resourceUri: Schema.optional(Schema.String),
  noteName: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  remediation: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  vulnerability: Schema.optional(VulnerabilityOccurrence),
  build: Schema.optional(BuildOccurrence),
  image: Schema.optional(ImageOccurrence),
  package: Schema.optional(PackageOccurrence),
  deployment: Schema.optional(DeploymentOccurrence),
  discovery: Schema.optional(DiscoveryOccurrence),
  attestation: Schema.optional(AttestationOccurrence),
  upgrade: Schema.optional(UpgradeOccurrence),
  compliance: Schema.optional(ComplianceOccurrence),
  dsseAttestation: Schema.optional(DSSEAttestationOccurrence),
  sbomReference: Schema.optional(SBOMReferenceOccurrence),
  secret: Schema.optional(SecretOccurrence),
  envelope: Schema.optional(Envelope),
})).annotate({ identifier: "Occurrence" }) as any as Schema.Schema<Occurrence>;

export interface ListVulnerabilitiesResponseV1 {
  /** The list of Vulnerability Occurrences resulting from a scan. */
  occurrences?: Array<Occurrence>;
  /** A page token that can be used in a subsequent call to ListVulnerabilities to continue retrieving results. */
  nextPageToken?: string;
}

export const ListVulnerabilitiesResponseV1: Schema.Schema<ListVulnerabilitiesResponseV1> = Schema.suspend(() => Schema.Struct({
  occurrences: Schema.optional(Schema.Array(Occurrence)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListVulnerabilitiesResponseV1" }) as any as Schema.Schema<ListVulnerabilitiesResponseV1>;

export interface AnalyzePackagesMetadataV1 {
  /** The resource URI of the container image being scanned. */
  resourceUri?: string;
  /** When the scan was created. */
  createTime?: string;
}

export const AnalyzePackagesMetadataV1: Schema.Schema<AnalyzePackagesMetadataV1> = Schema.suspend(() => Schema.Struct({
  resourceUri: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "AnalyzePackagesMetadataV1" }) as any as Schema.Schema<AnalyzePackagesMetadataV1>;

export interface AnalyzePackagesResponseV1 {
  /** The name of the scan resource created by this successful scan. */
  scan?: string;
}

export const AnalyzePackagesResponseV1: Schema.Schema<AnalyzePackagesResponseV1> = Schema.suspend(() => Schema.Struct({
  scan: Schema.optional(Schema.String),
})).annotate({ identifier: "AnalyzePackagesResponseV1" }) as any as Schema.Schema<AnalyzePackagesResponseV1>;

export interface AnalyzePackagesMetadata {
  /** The resource URI of the container image being scanned. */
  resourceUri?: string;
  /** When the scan was created. */
  createTime?: string;
}

export const AnalyzePackagesMetadata: Schema.Schema<AnalyzePackagesMetadata> = Schema.suspend(() => Schema.Struct({
  resourceUri: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "AnalyzePackagesMetadata" }) as any as Schema.Schema<AnalyzePackagesMetadata>;

export interface AnalyzePackagesResponse {
  /** The name of the scan resource created by this successful scan. */
  scan?: string;
}

export const AnalyzePackagesResponse: Schema.Schema<AnalyzePackagesResponse> = Schema.suspend(() => Schema.Struct({
  scan: Schema.optional(Schema.String),
})).annotate({ identifier: "AnalyzePackagesResponse" }) as any as Schema.Schema<AnalyzePackagesResponse>;

// ==========================================================================
// Operations
// ==========================================================================

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
}

export const CancelProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
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

/** Waits until the specified long-running operation is done or reaches at most a specified timeout, returning the latest state. If the operation is already done, the latest state is immediately returned. If the timeout specified is greater than the default HTTP/RPC timeout, the HTTP/RPC timeout is used. If the server does not support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Note that this method is on a best-effort basis. It may return the latest state before the specified timeout (including immediately), meaning even an immediate response is no guarantee that the operation is done. */
export interface WaitProjectsLocationsOperationsRequest {
  /** The name of the operation resource to wait on. */
  name: string;
  /** The maximum duration to wait before timing out. If left blank, the wait will be at most the time permitted by the underlying HTTP/RPC protocol. If RPC context deadline is also specified, the shorter one will be used. */
  timeout?: string;
}

export const WaitProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  timeout: Schema.optional(Schema.String).pipe(T.HttpQuery("timeout")),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:wait", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WaitProjectsLocationsOperationsRequest>;

export type WaitProjectsLocationsOperationsResponse = Operation;
export const WaitProjectsLocationsOperationsResponse = Operation;

export type WaitProjectsLocationsOperationsError = CommonErrors;

export const waitProjectsLocationsOperations: API.OperationMethod<WaitProjectsLocationsOperationsRequest, WaitProjectsLocationsOperationsResponse, WaitProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: WaitProjectsLocationsOperationsRequest,
  output: WaitProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Initiates an analysis of the provided packages. */
export interface AnalyzePackagesProjectsLocationsScansRequest {
  /** Required. The parent of the resource for which analysis is requested. Format: projects/[project_name]/locations/[location] */
  parent: string;
  /** Request body */
  body?: AnalyzePackagesRequestV1;
}

export const AnalyzePackagesProjectsLocationsScansRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(AnalyzePackagesRequestV1).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/scans:analyzePackages", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AnalyzePackagesProjectsLocationsScansRequest>;

export type AnalyzePackagesProjectsLocationsScansResponse = Operation;
export const AnalyzePackagesProjectsLocationsScansResponse = Operation;

export type AnalyzePackagesProjectsLocationsScansError = CommonErrors;

export const analyzePackagesProjectsLocationsScans: API.OperationMethod<AnalyzePackagesProjectsLocationsScansRequest, AnalyzePackagesProjectsLocationsScansResponse, AnalyzePackagesProjectsLocationsScansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AnalyzePackagesProjectsLocationsScansRequest,
  output: AnalyzePackagesProjectsLocationsScansResponse,
  errors: [],
}));

/** Lists vulnerabilities resulting from a successfully completed scan. */
export interface ListProjectsLocationsScansVulnerabilitiesRequest {
  /** Required. The parent of the collection of Vulnerabilities being requested. Format: projects/[project_name]/locations/[location]/scans/[scan_id] */
  parent: string;
  /** The number of vulnerabilities to retrieve. */
  pageSize?: number;
  /** The page token, resulting from a previous call to ListVulnerabilities. */
  pageToken?: string;
}

export const ListProjectsLocationsScansVulnerabilitiesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/scans/{scansId}/vulnerabilities" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsScansVulnerabilitiesRequest>;

export type ListProjectsLocationsScansVulnerabilitiesResponse = ListVulnerabilitiesResponseV1;
export const ListProjectsLocationsScansVulnerabilitiesResponse = ListVulnerabilitiesResponseV1;

export type ListProjectsLocationsScansVulnerabilitiesError = CommonErrors;

export const listProjectsLocationsScansVulnerabilities = API.makePaginated(() => ({
  input: ListProjectsLocationsScansVulnerabilitiesRequest,
  output: ListProjectsLocationsScansVulnerabilitiesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

