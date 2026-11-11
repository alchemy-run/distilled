import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Continuum",
  serviceShapeName: "ContinuumControlPlane",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "continuum" });
const ver = /*@__PURE__*/ T.ServiceVersion("2022-07-26");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
    const { UseFIPS = false, Endpoint, Region } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    if (Endpoint != null) {
      if (UseFIPS === true) {
        return err("Invalid Configuration: FIPS and custom endpoint are not supported");
      }
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (UseFIPS === true) {
            return e(
              `https://continuum-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://continuum.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://continuum.{R}.api.aws","properties":{},"headers":{}}',
  [
    "cn-north-1",
    "cn-northwest-1",
    "aws-cn-global",
    "us-iso-east-1",
    "us-iso-west-1",
    "aws-iso-global",
    "us-isob-east-1",
    "aws-iso-b-global",
    "aws-iso-f-global",
    "us-isof-east-1",
    "us-isof-south-1",
    "eusc-de-east-1",
  ],
);

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "Continuum",
  service: "Continuum",
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()("ValidationException", {
    message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
    fieldList: /*@__PURE__*/ S.optional(
      /*@__PURE__*/ S.suspend(() => __S(1377, __c43, 1)).annotate({
        identifier: "ValidationExceptionFieldList",
      }),
    ),
  }) {}
export type EnvironmentId = string;
export type AssociationClientToken = string;
export type CollectorArn = string;
export type EnvironmentSourceRoleArn = string;
export interface AssociateCollectorInput {
  environmentId: string;
  clientToken?: string | undefined;
  collectorArn: string;
  collectorDataAccessRoleArn: string;
}
export type EnvironmentArn = string;
export type CollectorId = string;
export interface AssociatedCollector {
  collectorId: string;
  collectorArn: string;
}
export interface AssociateCollectorOutput {
  environmentId: string;
  environmentArn: string;
  associatedCollector: AssociatedCollector;
}
export type FindingClientToken = string;
export interface CreateCodeFindingInput {
  environmentId: string;
  ocsfDocument: any;
  clientToken?: string | undefined;
}
export type FindingId = string;
export type FindingArn = string;
export type FindingTitle = string;
export type FindingStatus = "SUBMITTED" | "VALIDATING" | "CONFIRMED" | "DISCARDED" | (string & {});
export interface CreateCodeFindingOutput {
  findingId: string;
  findingArn: string;
  title: string;
  status: FindingStatus;
  createdAt: Date;
}
export type ScanClientToken = string;
export interface CreateCodeScanInput {
  environmentId: string;
  clientToken?: string | undefined;
}
export type ScanRunId = string;
export type ScanStatus =
  | "SUBMITTED"
  | "WAITING_FOR_BUILD"
  | "BUILDING"
  | "WAITING_FOR_SCAN"
  | "SCANNING"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export type ScanOrigin = "MANUAL" | "SCHEDULED" | (string & {});
export type ScanRunFailureMessage = string;
export type ScanFailureStage =
  | "SUBMITTED"
  | "WAITING_FOR_BUILD"
  | "BUILDING"
  | "WAITING_FOR_SCAN"
  | "SCANNING"
  | (string & {});
export interface CodeScanSummary {
  scanRunId: string;
  status: ScanStatus;
  origin: ScanOrigin;
  createdAt: Date;
  completedAt?: Date | undefined;
  failureMessage?: string | undefined;
  failureStage?: ScanFailureStage | undefined;
}
export interface CreateCodeScanOutput {
  scan: CodeScanSummary;
}
export type CollectorType = "AWS_COLLECTOR" | (string & {});
export type KubernetesClusterRoleArn = string;
export type KubernetesClusterExternalId = string | redacted.Redacted<string>;
export interface KubernetesClusterRoleConfiguration {
  roleArn: string;
  externalId?: string | redacted.Redacted<string> | undefined;
}
export type CollectorClientToken = string;
export interface CreateCollectorInput {
  type?: CollectorType | undefined;
  kubernetesClusterRole?: KubernetesClusterRoleConfiguration | undefined;
  clientToken?: string | undefined;
}
export type CollectorStatus = "ACTIVE" | "PENDING_DELETION" | (string & {});
export interface CreateCollectorOutput {
  collectorId: string;
  collectorArn: string;
  type: CollectorType;
  status: CollectorStatus;
  createdAt: Date;
}
export type EnvironmentName = string;
export type IntegrationId = string;
export type EnvironmentSourcePrefix = string;
export interface EnvironmentS3IntegrationSource {
  integrationId: string;
  codePrefix?: string | undefined;
  contextPrefix?: string | undefined;
}
export type EnvironmentS3Sources = EnvironmentS3IntegrationSource[];
export type RepositoryName = string;
export type RepositoryBranch = string;
export interface EnvironmentRepositorySource {
  integrationId: string;
  repository: string;
  defaultBranch?: string | undefined;
}
export type EnvironmentRepositorySources = EnvironmentRepositorySource[];
export interface EnvironmentSourceConfiguration {
  s3Sources?: EnvironmentS3IntegrationSource[] | undefined;
  repositorySources?: EnvironmentRepositorySource[] | undefined;
}
export type DomainName = string;
export type DomainNames = string[];
export interface EnvironmentNetworkConfiguration {
  allowedDomains?: string[] | undefined;
}
export type ScanFrequency = string;
export type PatchCreationPolicy = "ENABLED" | "DISABLED" | (string & {});
export interface EnvironmentConfiguration {
  network?: EnvironmentNetworkConfiguration | undefined;
  scanFrequency?: string | undefined;
  patchCreationPolicy?: PatchCreationPolicy | undefined;
}
export interface CreateCodeConfiguration {
  sourceConfiguration?: EnvironmentSourceConfiguration | undefined;
  environmentConfiguration?: EnvironmentConfiguration | undefined;
}
export interface CreateEnvironmentConfiguration {
  codeConfiguration?: CreateCodeConfiguration | undefined;
}
export interface CreateEnvironmentInput {
  name: string;
  configuration?: CreateEnvironmentConfiguration | undefined;
}
export type EnvironmentStatus = "ACTIVE" | (string & {});
export interface CreateEnvironmentOutput {
  environmentId: string;
  environmentArn: string;
  status: EnvironmentStatus;
  createdAt: Date;
}
export type IntegrationClientToken = string;
export type IntegrationName = string;
export type AuthorizationCode = string | redacted.Redacted<string>;
export type OAuthState = string | redacted.Redacted<string>;
export type RedirectUrl = string;
export interface GitHubAuthorizationConfiguration {
  authorizationCode: string | redacted.Redacted<string>;
  state: string | redacted.Redacted<string>;
  redirectUrl?: string | undefined;
}
export type GitHubOrganizationName = string;
export interface GitHubConfiguration {
  authorization: GitHubAuthorizationConfiguration;
  organizationName?: string | undefined;
}
export type GitLabInstanceUrl = string;
export type GitLabTargetType = "GROUP" | "PROJECT" | (string & {});
export type GitLabTargetPath = string;
export type GitLabAccessToken = string | redacted.Redacted<string>;
export interface GitLabConfiguration {
  instanceUrl: string;
  targetType: GitLabTargetType;
  targetPath: string;
  accessToken: string | redacted.Redacted<string>;
}
export type IntegrationS3BucketName = string;
export type IntegrationS3RoleArn = string;
export type IntegrationS3ExternalId = string | redacted.Redacted<string>;
export interface S3Configuration {
  bucket: string;
  roleArn: string;
  externalId: string | redacted.Redacted<string>;
}
export type ProviderConfiguration =
  | { github: GitHubConfiguration; gitlab?: undefined; s3?: undefined }
  | { github?: undefined; gitlab: GitLabConfiguration; s3?: undefined }
  | { github?: undefined; gitlab?: undefined; s3: S3Configuration };
export interface CreateIntegrationInput {
  clientToken?: string | undefined;
  name: string;
  providerConfiguration: ProviderConfiguration;
}
export type IntegrationArn = string;
export interface CreateIntegrationOutput {
  integrationId: string;
  integrationArn: string;
  createdAt: Date;
}
export interface DeleteCollectorInput {
  collectorId: string;
}
export interface DeleteCollectorResponse {}
export interface DeleteEnvironmentInput {
  environmentId: string;
}
export interface DeleteEnvironmentResponse {}
export interface DeleteIntegrationInput {
  integrationId: string;
}
export interface DeleteIntegrationResponse {}
export interface DisassociateCollectorInput {
  environmentId: string;
  collectorArn: string;
}
export interface DisassociateCollectorResponse {}
export interface GetCodeFindingInput {
  environmentId: string;
  findingId: string;
}
export type FindingType = "CONTINUUM_CODE_VULN" | "CUSTOMER_CODE_VULN" | (string & {});
export type FindingSeverityId =
  | "UNKNOWN"
  | "INFORMATIONAL"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL"
  | "FATAL"
  | "OTHER"
  | (string & {});
export type FindingDescription = string;
export type FindingCategory = string;
export type CweId = string;
export type CweIdList = string[];
export type FindingFilePath = string;
export type CveId = string;
export type PackageName = string;
export type PackageVersion = string;
export type PackageManager = string;
export interface AffectedPackage {
  name: string;
  version?: string | undefined;
  fixedInVersion?: string | undefined;
  packageManager?: string | undefined;
}
export type AffectedPackageList = AffectedPackage[];
export type FindingCodeSnippet = string;
export type FindingListEntry = string;
export type FindingStringList = string[];
export type FindingVerdict =
  | "TRUE_POSITIVE"
  | "FALSE_POSITIVE"
  | "BENIGN_TRUE_POSITIVE"
  | "NEEDS_REVIEW"
  | (string & {});
export type FindingBlockingReason =
  | "UNREACHABLE"
  | "PROTECTED"
  | "MISCLASSIFIED"
  | "EXCLUDED"
  | "NOT_FEASIBLE"
  | "RISK_MITIGATED"
  | "NONE"
  | (string & {});
export type FindingSeverityAdjustment =
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | "INFORMATIONAL"
  | "UNCHANGED"
  | (string & {});
export interface FindingEvidence {
  file?: string | undefined;
  line?: number | undefined;
  snippet?: string | undefined;
}
export type FindingEvidenceList = FindingEvidence[];
export interface FindingValidation {
  verdict: FindingVerdict;
  blockingReason?: FindingBlockingReason | undefined;
  confidence?: number | undefined;
  rationale?: string | undefined;
  severityAdjustment?: FindingSeverityAdjustment | undefined;
  mitigatingControls?: string[] | undefined;
  preconditions?: string[] | undefined;
  evidence?: FindingEvidence[] | undefined;
}
export type FindingOcsfClass =
  | "VULNERABILITY_FINDING"
  | "APPLICATION_SECURITY_POSTURE_FINDING"
  | (string & {});
export interface FindingLocation {
  filePath?: string | undefined;
  startLine?: number | undefined;
  endLine?: number | undefined;
}
export type FindingLocationList = FindingLocation[];
export interface FindingVulnerability {
  title?: string | undefined;
  description?: string | undefined;
  cweId?: string | undefined;
  cweCaption?: string | undefined;
  additionalCweIds?: string[] | undefined;
  cveId?: string | undefined;
  cvssBaseScore?: number | undefined;
  fixCoverage?: string | undefined;
  fixCoverageId?: number | undefined;
  locations?: FindingLocation[] | undefined;
  remediation?: string | undefined;
  remediationReferences?: string[] | undefined;
  code?: string | undefined;
  details?: string | undefined;
  affectedPackages?: AffectedPackage[] | undefined;
}
export type FindingVulnerabilityList = FindingVulnerability[];
export type FindingResourceUid = string;
export interface FindingResource {
  uid?: string | undefined;
  name?: string | undefined;
  type?: string | undefined;
  region?: string | undefined;
}
export type FindingResourceList = FindingResource[];
export interface FindingComplianceCheck {
  uid?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
}
export type FindingComplianceCheckList = FindingComplianceCheck[];
export interface FindingPosture {
  application?: string | undefined;
  applicationUid?: string | undefined;
  applicationVersion?: string | undefined;
  control?: string | undefined;
  description?: string | undefined;
  standards?: string[] | undefined;
  requirements?: string[] | undefined;
  checks?: FindingComplianceCheck[] | undefined;
  status?: string | undefined;
  statusId?: number | undefined;
  remediation?: string | undefined;
  remediationReferences?: string[] | undefined;
}
export type FindingSource = string;
export type SourceFindingId = string;
export type FindingStatusMessage = string;
export type FindingDiscardReason =
  | "SCANNER_VALIDATED_FALSE_POSITIVE"
  | "SCANNER_NEEDS_REVIEW"
  | "FALSE_POSITIVE_VALIDATED_AGAINST_CONTEXT"
  | "DUPLICATE_OF_OPEN_ISSUE"
  | "DUPLICATE_OF_CLOSED_ISSUE"
  | "COMPENSATING_CONTROL_PRESENT"
  | "OUT_OF_SCOPE"
  | "INSUFFICIENT_EVIDENCE"
  | "PROCESSING_FAILED"
  | "SOURCE_REPO_NOT_FOUND"
  | (string & {});
export type IssueId = string;
export interface GetCodeFindingOutput {
  type: FindingType;
  title: string;
  severity: FindingSeverityId;
  summary?: string | undefined;
  detailedDescription?: string | undefined;
  category?: string | undefined;
  subCategory?: string | undefined;
  cweIds?: string[] | undefined;
  owaspCategory?: string | undefined;
  mitigation?: string | undefined;
  filePath?: string | undefined;
  lineNumber?: number | undefined;
  cveId?: string | undefined;
  cvssBaseScore?: number | undefined;
  affectedPackages?: AffectedPackage[] | undefined;
  vulnerableCode?: string | undefined;
  relevantInputs?: string[] | undefined;
  stepsToReproduce?: string[] | undefined;
  validation?: FindingValidation | undefined;
  endLine?: number | undefined;
  mitreTechniques?: string[] | undefined;
  remediationReferences?: string[] | undefined;
  ocsfClass?: FindingOcsfClass | undefined;
  ocsfSchemaVersion?: string | undefined;
  productName?: string | undefined;
  productVendorName?: string | undefined;
  productVersion?: string | undefined;
  sourceStatus?: string | undefined;
  sourceStatusId?: number | undefined;
  firstSeenAt?: Date | undefined;
  findingTypes?: string[] | undefined;
  vulnerabilities?: FindingVulnerability[] | undefined;
  resources?: FindingResource[] | undefined;
  posture?: FindingPosture | undefined;
  findingId: string;
  findingArn: string;
  environmentId: string;
  source: string;
  sourceFindingId: string;
  reportedAt: Date;
  status: FindingStatus;
  statusUpdatedAt: Date;
  createdAt: Date;
  scanRunId?: string | undefined;
  statusMessage?: string | undefined;
  discardReason?: FindingDiscardReason | undefined;
  discardReasoning?: string | undefined;
  duplicateOfIssueId?: string | undefined;
  createdIssueId?: string | undefined;
  completedAt?: Date | undefined;
}
export interface GetCodeIssueInput {
  environmentId: string;
  issueId: string;
}
export type IssueArn = string;
export type IssueName = string;
export type IssueSynopsis = string;
export type IssueSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | (string & {});
export type IssueConfidence = number;
export type IssueSeverityReasoning = string;
export type IssueRemediationSummary = string;
export type IssueFindingIds = string[];
export type IssueStatus = "CREATED" | "IN_PROGRESS" | "COMPLETED" | "FAILED" | (string & {});
export type IssuePhase = "VALIDATION" | "PRIORITIZATION" | "REMEDIATION" | (string & {});
export type IssueStatusReason = "INTERNAL_ERROR" | "REMEDIATION_FAILED" | (string & {});
export type IssueStatusMessage = string;
export type IssueEvidenceAvailability = "NONE" | "AVAILABLE" | (string & {});
export type IssuePatchDeliveryStatus =
  | "PENDING"
  | "SUCCEEDED"
  | "FAILED"
  | "SKIPPED"
  | (string & {});
export type IssuePatchDeliveryCount = number;
export type DeliveryReason =
  | "ARTIFACT_READ_FAILED"
  | "ARTIFACT_SOURCE_MISMATCH"
  | "ARTIFACT_SOURCE_MISSING"
  | "BUILD_NOT_FOUND"
  | "BUILD_READ_FAILED"
  | "BUILD_RESULT_SCOPE_MISMATCH"
  | "DELIVERY_NOT_CONFIGURED"
  | "DELIVERY_SOURCE_KIND_CHANGED"
  | "DUPLICATE_LOGICAL_REPOSITORY"
  | "DUPLICATE_OR_INVALID_REPOSITORY"
  | "ENVIRONMENT_DELETED"
  | "ENVIRONMENT_NOT_ACTIVE"
  | "ENVIRONMENT_NOT_FOUND"
  | "ENVIRONMENT_READ_FAILED"
  | "S3_ACCESS_DENIED"
  | "S3_SOURCE_PREFIX_OVERLAP"
  | "SOURCE_INTEGRATION_UNRESOLVED"
  | "SOURCE_INTEGRATION_READ_FAILED"
  | "SOURCE_INTEGRATION_INVALID"
  | "SOURCE_INTEGRATION_CHANGED"
  | "EXPORT_CREDENTIALS_MISSING"
  | "EXPORT_CREDENTIAL_EXPIRY_INVALID"
  | "EXPORT_DESTINATION_INVALID"
  | "EXPORT_EXISTING_OBJECT_MISMATCH"
  | "EXPORT_PUT_FAILED"
  | "EXPORT_RECONCILIATION_READ_FAILED"
  | "EXPORT_ROLE_ASSUMPTION_FAILED"
  | "GITHUB_ACCESS_DENIED"
  | "GITHUB_BASE_NOT_FOUND"
  | "GITHUB_BRANCH_CONFLICT"
  | "GITHUB_NOT_FOUND"
  | "GITHUB_RATE_LIMITED"
  | "GITHUB_REPOSITORY_CHANGED"
  | "GITHUB_REPOSITORY_NOT_FOUND"
  | "GITHUB_REQUEST_FAILED"
  | "GITHUB_REQUEST_REJECTED"
  | "GITHUB_RESPONSE_INVALID"
  | "GREEN_ATTEMPT_NOT_SUCCESSFUL"
  | "GREEN_COMPLETION_NOT_OBSERVED"
  | "PATCH_NOT_SELECTED"
  | "INCOMPLETE_SOURCE_REFERENCE"
  | "INVALID_ARCHIVE_DIGEST"
  | "INVALID_ARTIFACT_SOURCE"
  | "INVALID_COMPLETED_MANIFEST"
  | "INVALID_EXPORT_RECEIPT"
  | "INVALID_GITHUB_PROVENANCE"
  | "INVALID_S3_DESTINATION"
  | "INVALID_SERVICE_RECEIPT"
  | "INVALID_SOURCE_INVENTORY"
  | "INVALID_SOURCE_MANIFEST"
  | "INVALID_SOURCE_REFERENCE"
  | "ISSUE_INTEGRITY_FAILURE"
  | "ISSUE_NOT_FOUND"
  | "MANIFEST_INVENTORY_MISMATCH"
  | "MANIFEST_PROVENANCE_CHANGED"
  | "MANIFEST_REPOSITORY_SET_MISMATCH"
  | "MANIFEST_SCOPE_OR_VERSION_MISMATCH"
  | "MISSING_BUILD_RESULT"
  | "MISSING_COMPLETED_MANIFEST"
  | "MISSING_RESULT_DIGEST"
  | "MISSING_SOURCE_MANIFEST"
  | "MISSING_SOURCE_TARGET"
  | "PATCH_NOT_APPLICABLE"
  | "PATCH_STORAGE_IDENTITY_MISSING"
  | "PATCH_UNSUPPORTED"
  | "PUBLICATION_OUTCOME_UNKNOWN_AFTER_RETRY_LIMIT"
  | "PUBLISHER_DEADLINE_EXCEEDED"
  | "RESULT_COMPLETED_MANIFEST_MISMATCH"
  | "RESULT_SOURCE_BINDING_MISMATCH"
  | "SERVICE_COPY_DIGEST_MISMATCH"
  | "SERVICE_OBJECT_READ_FAILED"
  | "SERVICE_OBJECT_TOO_LARGE"
  | "SERVICE_RECEIPT_OUTSIDE_ISSUE"
  | "SOURCE_OBJECT_DIGEST_MISMATCH"
  | "SOURCE_REFERENCE_OUTSIDE_BUILD"
  | "SOURCE_TARGET_BUILD_MISMATCH"
  | "UNKNOWN_REPOSITORY"
  | "UNKNOWN_SOURCE_PROVIDER"
  | "UNSUPPORTED_ENVIRONMENT_SCHEMA"
  | "github_destination_not_enabled"
  | "patch_creation_policy_disabled"
  | (string & {});
export type IssuePatchDeliveryFailureReasons = DeliveryReason[];
export interface IssuePatchDelivery {
  status: IssuePatchDeliveryStatus;
  patchCount: number;
  succeededCount: number;
  failedCount: number;
  failureReasons?: DeliveryReason[] | undefined;
}
export interface GetCodeIssueOutput {
  issueId: string;
  issueArn: string;
  name: string;
  synopsis: string;
  severity?: IssueSeverity | undefined;
  confidence?: number | undefined;
  severityReasoning?: string | undefined;
  summary?: string | undefined;
  findingIds: string[];
  status: IssueStatus;
  phase?: IssuePhase | undefined;
  statusReason?: IssueStatusReason | undefined;
  statusMessage?: string | undefined;
  statusUpdatedAt: Date;
  createdAt: Date;
  updatedAt?: Date | undefined;
  evidenceAvailability?: IssueEvidenceAvailability | undefined;
  patchDelivery?: IssuePatchDelivery | undefined;
}
export type IssueArtifactId = string;
export interface GetCodeIssueArtifactInput {
  environmentId: string;
  issueId: string;
  artifactId: string;
}
export type IssueArtifactType =
  | "EVIDENCE"
  | "AGENT_COMMUNICATION"
  | "VALIDATION_EVIDENCE"
  | "REMEDIATION_PROPOSAL"
  | "DECISION"
  | "PATCH"
  | (string & {});
export type IssueArtifactMediaType = string;
export type ExploitabilityVerdict = "EXPLOITABLE" | "NOT_EXPLOITABLE" | "UNCERTAIN" | (string & {});
export type ValidationTerminalStatus =
  | "COMPLETED"
  | "FAILED"
  | "NO_SOURCE_AVAILABLE"
  | "PARTIAL"
  | (string & {});
export type AttackFlowId = string;
export type FlowVerdictValue = "CONFIRMED" | "DENIED" | "INCONCLUSIVE" | (string & {});
export type ValidationConfidence = number;
export type ArtifactCitation = string;
export type ArtifactCitations = string[];
export interface FlowVerdict {
  flowId: string;
  verdict: FlowVerdictValue;
  confidence?: number | undefined;
  evidence?: string[] | undefined;
}
export type FlowVerdicts = FlowVerdict[];
export type AttackFlowIds = string[];
export type ArtifactText = string;
export type ArtifactHttpMethod =
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "OPTIONS"
  | (string & {});
export type ArtifactHeaders = { [key: string]: string | undefined };
export type ArtifactProofBody = string;
export type ExploitEffect =
  | "DATA_LEAKED"
  | "ERROR_REVEALED"
  | "BEHAVIOR_CHANGED"
  | "NO_EFFECT"
  | (string & {});
export interface ValidationExploitArtifact {
  payload: string;
  targetUrl: string;
  httpMethod: ArtifactHttpMethod;
  headers?: { [key: string]: string | undefined } | undefined;
  responseStatus?: number | undefined;
  responseSnippet?: string | undefined;
  effect: ExploitEffect;
}
export type ValidationProofMaterialText = string;
export interface ValidationProofMaterial {
  content: string;
}
export type ValidationProofMaterials = ValidationProofMaterial[];
export interface ValidationProofCode {
  proofCode: ValidationProofMaterial[];
}
export type ValidationProofConsoleOutput = string;
export interface ValidationProofOutput {
  consoleOutput: string;
}
export interface ValidationExecutedProof {
  code: ValidationProofCode;
  output?: ValidationProofOutput | undefined;
  observedEffect?: ExploitEffect | undefined;
}
export type ValidationProofSummary = string;
export interface ValidationSourceAnalysis {
  summary: string;
  inferredEffect?: ExploitEffect | undefined;
}
export interface ReasoningStep {
  step: number;
  claim: string;
  source: string;
  confidence?: number | undefined;
}
export type ReasoningSteps = ReasoningStep[];
export interface PerFindingResult {
  findingId: string;
  exploitable: ExploitabilityVerdict;
  confidence?: number | undefined;
  flowVerdicts?: FlowVerdict[] | undefined;
  reasoningChain?: ReasoningStep[] | undefined;
  exploitArtifact?: ValidationExploitArtifact | undefined;
}
export type PerFindingResults = PerFindingResult[];
export interface ValidationEvidenceBody {
  exploitable: ExploitabilityVerdict;
  terminalStatus?: ValidationTerminalStatus | undefined;
  flowVerdicts?: FlowVerdict[] | undefined;
  attackFlowsConfirmed?: string[] | undefined;
  exploitArtifact?: ValidationExploitArtifact | undefined;
  executedProof?: ValidationExecutedProof | undefined;
  sourceAnalysis?: ValidationSourceAnalysis | undefined;
  perFindingResults?: PerFindingResult[] | undefined;
}
export type IssueArtifactProducerName = string;
export type SignalDimension =
  | "EXPLOITABILITY"
  | "BLAST_RADIUS"
  | "NETWORK_EXPOSURE"
  | "PRECONDITION"
  | "CODE_CONTEXT"
  | "LIKELIHOOD_ASSESSMENT"
  | "IMPACT_ASSESSMENT"
  | (string & {});
export type SignalStrength = "NONE" | "WEAK" | "MODERATE" | "STRONG" | (string & {});
export interface SignalConfidenceReasoning {
  summary: string;
  factors?: string[] | undefined;
}
export type SignalBand = "VERY_LOW" | "LOW" | "MODERATE" | "HIGH" | (string & {});
export interface SignalComputation {
  likelihoodBand?: SignalBand | undefined;
  impactBand?: SignalBand | undefined;
  barriers?: number | undefined;
}
export type SignalBasis =
  | "CODE"
  | "GRAPH"
  | "FINDING"
  | "INFERRED"
  | "NO_EVIDENCE_DEFAULT"
  | (string & {});
export interface SignalPrecondition {
  value?: boolean | undefined;
  basis?: SignalBasis | undefined;
  reason?: string | undefined;
  missingInfo?: string | undefined;
}
export type SignalAccessLevel = "NONE" | "ANY_AUTHENTICATED" | "PRIVILEGED" | (string & {});
export interface SignalAccessPrecondition {
  value?: SignalAccessLevel | undefined;
  basis?: SignalBasis | undefined;
  reason?: string | undefined;
  missingInfo?: string | undefined;
}
export interface SignalPreconditions {
  reachableFromAttacker?: SignalPrecondition | undefined;
  configurationNeeded?: SignalPrecondition | undefined;
  accessLevel?: SignalAccessPrecondition | undefined;
  userInteractionRequired?: SignalPrecondition | undefined;
}
export type SignalAttackerGains =
  | "EXECUTE"
  | "MODIFY_PRIVILEGED"
  | "MODIFY_DATA"
  | "MODIFY_COSMETIC"
  | "READ"
  | "NEITHER"
  | (string & {});
export interface SignalAttackerGainsDimension {
  value?: SignalAttackerGains | undefined;
  basis?: SignalBasis | undefined;
  reason?: string | undefined;
  missingInfo?: string | undefined;
}
export type SignalBlastRadius =
  | "CROSS_TENANT"
  | "OTHER_USERS_IN_TENANT"
  | "OWN_SCOPE"
  | (string & {});
export interface SignalBlastRadiusDimension {
  value?: SignalBlastRadius | undefined;
  basis?: SignalBasis | undefined;
  reason?: string | undefined;
  missingInfo?: string | undefined;
}
export type SignalTargetValue = "HIGH" | "MEDIUM" | "LOW" | (string & {});
export interface SignalTargetValueDimension {
  value?: SignalTargetValue | undefined;
  basis?: SignalBasis | undefined;
  reason?: string | undefined;
  missingInfo?: string | undefined;
}
export interface SignalImpactDimensions {
  attackerGains?: SignalAttackerGainsDimension | undefined;
  blastRadius?: SignalBlastRadiusDimension | undefined;
  targetValue?: SignalTargetValueDimension | undefined;
}
export type ValidationConfidenceTier =
  | "SOURCE_READ"
  | "STATIC_PROVEN"
  | "BUILD_PROVEN"
  | "RUNTIME_PROVEN"
  | (string & {});
export interface SignalExploitability {
  verdict?: ExploitabilityVerdict | undefined;
  reachedCrownJewels?: boolean | undefined;
  highestLayerReached?: number | undefined;
  confidenceTier?: ValidationConfidenceTier | undefined;
  scriptable?: boolean | undefined;
  sourceValidationArtifactId?: string | undefined;
}
export interface PrevalidationSignal {
  subjectRef?: string | undefined;
  dimension?: SignalDimension | undefined;
  signalStrength?: SignalStrength | undefined;
  conclusion?: string | undefined;
  producerId?: string | undefined;
  producerVersion?: string | undefined;
  confidence?: number | undefined;
  confidenceReasoning?: SignalConfidenceReasoning | undefined;
  computed?: SignalComputation | undefined;
  preconditions?: SignalPreconditions | undefined;
  impactDimensions?: SignalImpactDimensions | undefined;
  exploitability?: SignalExploitability | undefined;
}
export type PrevalidationSignals = PrevalidationSignal[];
export interface PrevalidationSignalsBody {
  producedBy?: string | undefined;
  signals?: PrevalidationSignal[] | undefined;
}
export type IssueArtifactContent = string;
export type PatchFormat = "GIT_MAILBOX_PATCH" | "GIT_BINARY_DIFF" | "GIT_DIFF" | (string & {});
export type ArtifactSha256 = string;
export interface RemediationProposalBody {
  patch: string;
  format?: PatchFormat | undefined;
  filename?: string | undefined;
  patchSha256?: string | undefined;
}
export type BuildRepositoryName = string;
export type DeliveryStatus =
  | "PENDING"
  | "SUCCEEDED"
  | "FAILED"
  | "SKIPPED"
  | "ABANDONED"
  | (string & {});
export type EnvironmentSourceBucketName = string;
export type DeliveryObjectKey = string;
export type DeliveryVersionId = string;
export interface S3Target {
  bucket: string;
  key: string;
  version?: string | undefined;
}
export type DeliveryGitHubName = string;
export type DeliveryPullRequestNumber = number;
export type DeliveryGitCommitSha = string;
export interface GitHubTarget {
  owner: string;
  repository: string;
  pullRequestNumber?: number | undefined;
  headSha?: string | undefined;
}
export type DestinationTarget =
  | { s3: S3Target; github?: undefined }
  | { s3?: undefined; github: GitHubTarget };
export interface PatchDelivery {
  status: DeliveryStatus;
  target?: DestinationTarget | undefined;
  updatedAt: Date;
}
export interface PatchBody {
  patch: string;
  format?: PatchFormat | undefined;
  repositoryName?: string | undefined;
  patchSha256: string;
  sizeBytes: number;
  delivery?: PatchDelivery | undefined;
}
export type IssueArtifactBody =
  | {
      validationEvidence: ValidationEvidenceBody;
      prevalidationSignals?: undefined;
      remediationProposal?: undefined;
      patch?: undefined;
      raw?: undefined;
    }
  | {
      validationEvidence?: undefined;
      prevalidationSignals: PrevalidationSignalsBody;
      remediationProposal?: undefined;
      patch?: undefined;
      raw?: undefined;
    }
  | {
      validationEvidence?: undefined;
      prevalidationSignals?: undefined;
      remediationProposal: RemediationProposalBody;
      patch?: undefined;
      raw?: undefined;
    }
  | {
      validationEvidence?: undefined;
      prevalidationSignals?: undefined;
      remediationProposal?: undefined;
      patch: PatchBody;
      raw?: undefined;
    }
  | {
      validationEvidence?: undefined;
      prevalidationSignals?: undefined;
      remediationProposal?: undefined;
      patch?: undefined;
      raw: string;
    };
export interface IssueArtifactProducerSummary {
  agent: string;
}
export interface GetCodeIssueArtifactOutput {
  artifactId: string;
  artifactType: IssueArtifactType;
  mediaType: string;
  body: IssueArtifactBody;
  metadata?: any | undefined;
  producer: IssueArtifactProducerSummary;
  createdAt: Date;
}
export interface GetCodeScanInput {
  environmentId: string;
  scanRunId: string;
}
export interface CodeScanData {
  scanRunId: string;
  status: ScanStatus;
  origin: ScanOrigin;
  createdAt: Date;
  completedAt?: Date | undefined;
  failureMessage?: string | undefined;
  failureStage?: ScanFailureStage | undefined;
}
export interface GetCodeScanOutput {
  scan: CodeScanData;
}
export interface GetCollectorInput {
  collectorId: string;
}
export type ConfigRecorderArn = string;
export interface GetCollectorOutput {
  collectorId: string;
  collectorArn: string;
  type: CollectorType;
  status: CollectorStatus;
  configRecorderArn?: string | undefined;
  kubernetesClusterRoleArn?: string | undefined;
  createdAt: Date;
  updatedAt: Date;
}
export type AwsAccountId = string;
export interface GetCollectorDataAccessAuthorizationInput {
  accountId: string;
  collectorId: string;
  environmentArn?: string | undefined;
}
export interface GetCollectorDataAccessAuthorizationOutput {}
export interface GetEnvironmentInput {
  environmentId: string;
}
export type EnvironmentStatusMessage = string;
export interface CollectorDetails {
  collectorDataAccessRoleArn?: string | undefined;
}
export interface CodeConfigurationDetails {
  collectorDetails?: CollectorDetails | undefined;
  sourceConfiguration?: EnvironmentSourceConfiguration | undefined;
  environmentConfiguration?: EnvironmentConfiguration | undefined;
  latestScan?: CodeScanSummary | undefined;
}
export interface EnvironmentConfigurationDetails {
  codeConfiguration?: CodeConfigurationDetails | undefined;
}
export interface GetEnvironmentOutput {
  environmentId: string;
  environmentArn: string;
  name: string;
  status: EnvironmentStatus;
  statusMessage?: string | undefined;
  statusUpdatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  configuration: EnvironmentConfigurationDetails;
}
export interface GetIntegrationInput {
  integrationId: string;
}
export type IntegrationType = "GITHUB" | "GITLAB" | "S3" | (string & {});
export interface GitHubDetails {
  organizationName?: string | undefined;
}
export type GitLabTokenRotation = "AUTOMATIC" | "NONE" | (string & {});
export interface GitLabDetails {
  instanceUrl: string;
  targetType: GitLabTargetType;
  targetPath: string;
  tokenRotation: GitLabTokenRotation;
  expiresAt?: Date | undefined;
}
export interface S3Details {
  bucket: string;
  roleArn: string;
}
export type ProviderDetails =
  | { github: GitHubDetails; gitlab?: undefined; s3?: undefined }
  | { github?: undefined; gitlab: GitLabDetails; s3?: undefined }
  | { github?: undefined; gitlab?: undefined; s3: S3Details };
export interface GetIntegrationOutput {
  integrationId: string;
  integrationArn: string;
  name: string;
  integrationType: IntegrationType;
  providerDetails: ProviderDetails;
  createdAt: Date;
  updatedAt: Date;
}
export type ResourcePolicyTargetArn = string;
export interface GetResourcePolicyInput {
  arn: string;
}
export type ResourcePolicyDocument = string | redacted.Redacted<string>;
export type ResourcePolicyRevisionId = string;
export interface GetResourcePolicyOutput {
  arn: string;
  policy: string | redacted.Redacted<string>;
  revisionId: string;
}
export type MaxResults = number;
export type NextToken = string;
export interface ListAssociatedCollectorsInput {
  environmentId: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export type AssociatedCollectors = AssociatedCollector[];
export interface ListAssociatedCollectorsOutput {
  associatedCollectors: AssociatedCollector[];
  nextToken?: string | undefined;
}
export interface ListAssociatedEnvironmentsInput {
  collectorId: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface AssociatedEnvironment {
  environmentId: string;
  environmentArn: string;
  name: string;
  status: EnvironmentStatus;
  createdAt: Date;
}
export type AssociatedEnvironments = AssociatedEnvironment[];
export interface ListAssociatedEnvironmentsOutput {
  associatedEnvironments: AssociatedEnvironment[];
  nextToken?: string | undefined;
}
export interface ListCodeFindingsInput {
  environmentId: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface FindingSummary {
  findingId: string;
  findingArn: string;
  environmentId: string;
  source: string;
  sourceFindingId: string;
  reportedAt: Date;
  status: FindingStatus;
  statusUpdatedAt: Date;
  createdAt: Date;
  scanRunId?: string | undefined;
  statusMessage?: string | undefined;
  discardReason?: FindingDiscardReason | undefined;
  discardReasoning?: string | undefined;
  duplicateOfIssueId?: string | undefined;
  createdIssueId?: string | undefined;
  completedAt?: Date | undefined;
  type: FindingType;
  title: string;
  severity: FindingSeverityId;
  category?: string | undefined;
  filePath?: string | undefined;
}
export type CodeFindingSummaries = FindingSummary[];
export interface ListCodeFindingsOutput {
  items: FindingSummary[];
  nextToken?: string | undefined;
}
export interface ListCodeIssueArtifactsInput {
  environmentId: string;
  issueId: string;
  artifactType?: IssueArtifactType | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface IssueArtifactItem {
  artifactId: string;
  artifactType: IssueArtifactType;
  mediaType: string;
  producer: IssueArtifactProducerSummary;
  contentSizeBytes: number;
  createdAt: Date;
}
export type CodeIssueArtifactItems = IssueArtifactItem[];
export interface ListCodeIssueArtifactsOutput {
  items: IssueArtifactItem[];
  nextToken?: string | undefined;
}
export interface ListCodeIssuesInput {
  environmentId: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface IssueSummary {
  issueId: string;
  issueArn: string;
  name: string;
  severity?: IssueSeverity | undefined;
  confidence?: number | undefined;
  status: IssueStatus;
  phase?: IssuePhase | undefined;
  statusReason?: IssueStatusReason | undefined;
  statusMessage?: string | undefined;
  statusUpdatedAt: Date;
  createdAt: Date;
  updatedAt?: Date | undefined;
}
export type CodeIssueSummaries = IssueSummary[];
export interface ListCodeIssuesOutput {
  items: IssueSummary[];
  nextToken?: string | undefined;
}
export interface ListCodeScansInput {
  environmentId: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export type CodeScanSummaries = CodeScanSummary[];
export interface ListCodeScansOutput {
  scans: CodeScanSummary[];
  nextToken?: string | undefined;
}
export interface ListCollectorsInput {}
export interface CollectorSummary {
  collectorId: string;
  collectorArn: string;
  type: CollectorType;
  status: CollectorStatus;
  createdAt: Date;
}
export type CollectorSummaries = CollectorSummary[];
export interface ListCollectorsOutput {
  items: CollectorSummary[];
}
export interface ListEnvironmentsInput {
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface EnvironmentListEntry {
  environmentId: string;
  environmentArn: string;
  name: string;
  status: EnvironmentStatus;
  createdAt: Date;
}
export type EnvironmentListEntries = EnvironmentListEntry[];
export interface ListEnvironmentsOutput {
  items: EnvironmentListEntry[];
  nextToken?: string | undefined;
}
export interface ListIntegrationsInput {
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface IntegrationSummary {
  integrationId: string;
  integrationArn: string;
  name: string;
  integrationType: IntegrationType;
  providerDetails: ProviderDetails;
  createdAt: Date;
  updatedAt: Date;
}
export type IntegrationSummaries = IntegrationSummary[];
export interface ListIntegrationsOutput {
  items: IntegrationSummary[];
  nextToken?: string | undefined;
}
export type ResourcePolicyInputDocument = string | redacted.Redacted<string>;
export interface PutResourcePolicyInput {
  arn: string;
  policy?: string | redacted.Redacted<string> | undefined;
  expectedRevisionId?: string | undefined;
}
export interface PutResourcePolicyOutput {
  arn: string;
  policy: string | redacted.Redacted<string>;
  revisionId: string;
}
export type IntegrationAuthorizationProviderType = "GITHUB" | (string & {});
export interface StartIntegrationAuthorizationInput {
  providerType: IntegrationAuthorizationProviderType;
  name?: string | undefined;
}
export type OAuthCodeChallenge = string;
export type OAuthCodeChallengeMethod = "S256" | (string & {});
export interface StartIntegrationAuthorizationOutput {
  state: string | redacted.Redacted<string>;
  codeChallenge: string;
  codeChallengeMethod: OAuthCodeChallengeMethod;
  expiresAt: Date;
}
export type CollectorName = string;
export interface RemoveKubernetesClusterRole {}
export type KubernetesClusterRoleUpdate =
  | { set: KubernetesClusterRoleConfiguration; remove?: undefined }
  | { set?: undefined; remove: RemoveKubernetesClusterRole };
export interface UpdateCollectorInput {
  collectorId: string;
  name?: string | undefined;
  kubernetesClusterRole?: KubernetesClusterRoleUpdate | undefined;
}
export interface UpdateCollectorOutput {
  collectorId: string;
  collectorArn: string;
  type: CollectorType;
  status: CollectorStatus;
  configRecorderArn?: string | undefined;
  kubernetesClusterRoleArn?: string | undefined;
  createdAt: Date;
  updatedAt: Date;
}
export interface UpdateCodeConfiguration {
  sourceConfiguration?: EnvironmentSourceConfiguration | undefined;
  environmentConfiguration?: EnvironmentConfiguration | undefined;
}
export interface UpdateEnvironmentConfiguration {
  codeConfiguration?: UpdateCodeConfiguration | undefined;
}
export interface UpdateEnvironmentInput {
  environmentId: string;
  name?: string | undefined;
  configuration?: UpdateEnvironmentConfiguration | undefined;
}
export interface UpdateEnvironmentOutput {
  environmentId: string;
  environmentArn: string;
  name: string;
  status: EnvironmentStatus;
  statusMessage?: string | undefined;
  statusUpdatedAt: Date;
  createdAt: Date;
  configuration: EnvironmentConfigurationDetails;
}
export interface UpdateS3Configuration {
  roleArn: string;
  externalId?: string | redacted.Redacted<string> | undefined;
}
export type UpdateProviderConfiguration = { s3: UpdateS3Configuration };
export interface UpdateIntegrationInput {
  integrationId: string;
  providerConfiguration: UpdateProviderConfiguration;
}
export interface UpdateIntegrationOutput {
  integrationId: string;
  integrationArn: string;
  name: string;
  integrationType: IntegrationType;
  providerDetails: ProviderDetails;
  createdAt: Date;
  updatedAt: Date;
}
export interface ValidationExceptionField {
  path: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type AssociateCollectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates one Collector with this Environment and configures the customer role Continuum uses to authorize access to associated Collector data. The caller must have permission on the Environment and permission to pass the role. Continuum assumes the supplied role and calls GetCollectorDataAccessAuthorization on the requested Collector; only a successful authorization response permits the association. The caller does not need Collector data-access permission. The Environment retains its other Collector associations. Calling again with an existing association is safe and does not create a duplicate.
 */
export const associateCollector: API.OperationMethod<
  AssociateCollectorInput & RegionInput,
  AssociateCollectorOutput,
  AssociateCollectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1408, __c44, 0) as any as S.Schema<AssociateCollectorInput>,
  output: __S(1409, __c44, 1) as any as S.Schema<AssociateCollectorOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateCollector",
  telemetry: TELEMETRY,
  span: "AssociateCollector",
}));

export type CreateCodeFindingError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Ingests a customer-supplied security finding into an environment. Continuum validates the document synchronously against the required overlay fields for the declared format; invalid documents are rejected with a ValidationException. The maximum accepted document size is 256 KB. The environment must have a source configured, and the finding must identify a code location so Continuum can tie it to a repository in the environment's build. Continuum assigns a findingId and stores the verbatim document. When no successful build yet contains the finding's repository, the finding stays SUBMITTED until the next successful build; if that build does not contain it either, the finding is DISCARDED with discardReason SOURCE_REPO_NOT_FOUND.
 */
export const createCodeFinding: API.OperationMethod<
  CreateCodeFindingInput & RegionInput,
  CreateCodeFindingOutput,
  CreateCodeFindingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1472, __c46, 0) as any as S.Schema<CreateCodeFindingInput>,
  output: __S(1473, __c46, 1) as any as S.Schema<CreateCodeFindingOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCodeFinding",
  telemetry: TELEMETRY,
  span: "CreateCodeFinding",
}));

export type CreateCodeScanError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an explicit scan request for one environment. CP creates durable work before
 * any queue delivery occurs.
 *
 * Retrying a request that succeeded, with the same clientToken on the same environment,
 * returns the original scan instead of starting another one. Token handling is not yet
 * atomic: requests with the same token that run at the same time, or a retry after a
 * request that failed partway through, can leave an additional scan, which may end in
 * the FAILED state with a message that it was superseded. Deleting the environment
 * makes its tokens unusable; a later request with one of them returns
 * ResourceNotFoundException.
 *
 * Each environment can have a limited number of scans in progress at the same time.
 * Once that limit is enforced, a request that would exceed it returns
 * ServiceQuotaExceededException; wait for a scan to finish (ListCodeScans shows each
 * scan's status), then retry.
 */
export const createCodeScan: API.OperationMethod<
  CreateCodeScanInput & RegionInput,
  CreateCodeScanOutput,
  CreateCodeScanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1504, __c47, 0) as any as S.Schema<CreateCodeScanInput>,
  output: __S(1536, __c48, 0) as any as S.Schema<CreateCodeScanOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCodeScan",
  telemetry: TELEMETRY,
  span: "CreateCodeScan",
}));

export type CreateCollectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates the Collector for the caller's account. Provisions an AWS Config service-linked recorder using the caller's federated access session and begins recording infrastructure changes.
 */
export const createCollector: API.OperationMethod<
  CreateCollectorInput & RegionInput,
  CreateCollectorOutput,
  CreateCollectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateCollectorInput>,
  output: __S(32, __c1, 0) as any as S.Schema<CreateCollectorOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCollector",
  telemetry: TELEMETRY,
  span: "CreateCollector",
}));

export type CreateEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an environment and starts its validation and any requested provisioning. Storage provisioning and dependency checks may continue after the initial 201 response; use GetEnvironment to observe completion.
 */
export const createEnvironment: API.OperationMethod<
  CreateEnvironmentInput & RegionInput,
  CreateEnvironmentOutput,
  CreateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c3, 0) as any as S.Schema<CreateEnvironmentInput>,
  output: __S(97, __c3, 1) as any as S.Schema<CreateEnvironmentOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironment",
  telemetry: TELEMETRY,
  span: "CreateEnvironment",
}));

export type CreateIntegrationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new integration with an external source provider. Repeating an identical
 * request with the same clientToken returns the original integrationId, integrationArn,
 * and createdAt. Token records are retained for eight hours after success or terminal failure,
 * including after the integration is deleted; replaying a deleted integration's token
 * does not recreate it. An identical request with a retained terminal failure returns
 * the recorded error.
 *
 * Reusing a token with different parameters returns ValidationException. A fresh token
 * starts a new create attempt; if the name is already owned by another integration,
 * ConflictException includes that integration's identifier. An attempt still in progress
 * may return ThrottlingException with retryAfterSeconds set to 1; retry with the same token
 * and identical parameters.
 *
 * GitHub authorization codes are single use. Retry an unresolved attempt with its
 * original token and unchanged parameters first. If the service reports a terminal
 * failure, an expired attempt, or a successful token exchange whose integration could
 * not be saved, restart GitHub authorization with a fresh token and authorization code.
 * The service does not checkpoint provider results for recovery by another request.
 */
export const createIntegration: API.OperationMethod<
  CreateIntegrationInput & RegionInput,
  CreateIntegrationOutput,
  CreateIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(229, __c7, 5) as any as S.Schema<CreateIntegrationInput>,
  output: __S(230, __c7, 6) as any as S.Schema<CreateIntegrationOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIntegration",
  telemetry: TELEMETRY,
  span: "CreateIntegration",
}));

export type DeleteCollectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the Collector for the caller's account. The Collector first enters PENDING_DELETION, then the service removes its schedule, AWS Config service-linked recorder, versioned S3 bucket, KMS key, and persisted record.
 */
export const deleteCollector: API.OperationMethod<
  DeleteCollectorInput & RegionInput,
  DeleteCollectorResponse,
  DeleteCollectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c8, 0) as any as S.Schema<DeleteCollectorInput>,
  output: __S(288, __c9, 0) as any as S.Schema<DeleteCollectorResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCollector",
  telemetry: TELEMETRY,
  span: "DeleteCollector",
}));

export type DeleteEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an environment and its associated resources.
 */
export const deleteEnvironment: API.OperationMethod<
  DeleteEnvironmentInput & RegionInput,
  DeleteEnvironmentResponse,
  DeleteEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c10, 0) as any as S.Schema<DeleteEnvironmentInput>,
  output: __S(288, __c9, 0) as any as S.Schema<DeleteEnvironmentResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironment",
  telemetry: TELEMETRY,
  span: "DeleteEnvironment",
}));

export type DeleteIntegrationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an integration and releases its name and account quota. Its retained
 * CreateIntegration token receipt can still replay the original result without
 * recreating the integration. Shared provider registrations are retained: deleting
 * one integration does not remove provider access used by another integration.
 * A fresh GitHub CreateIntegration attempt requires a fresh OAuth authorization
 * code and a new clientToken.
 */
export const deleteIntegration: API.OperationMethod<
  DeleteIntegrationInput & RegionInput,
  DeleteIntegrationResponse,
  DeleteIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c11, 0) as any as S.Schema<DeleteIntegrationInput>,
  output: __S(288, __c9, 0) as any as S.Schema<DeleteIntegrationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntegration",
  telemetry: TELEMETRY,
  span: "DeleteIntegration",
}));

export type DisassociateCollectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes one Collector association from this Environment, preserving its other associations. The stored Collector data-access role is cleared when no Collector associations remain. The Environment owner must have permission to disassociate. A current Collector access grant is not required, and the Collector does not need to remain active or present, so stale or revoked associations can be cleaned up.
 */
export const disassociateCollector: API.OperationMethod<
  DisassociateCollectorInput & RegionInput,
  DisassociateCollectorResponse,
  DisassociateCollectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c12, 0) as any as S.Schema<DisassociateCollectorInput>,
  output: __S(288, __c9, 0) as any as S.Schema<DisassociateCollectorResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateCollector",
  telemetry: TELEMETRY,
  span: "DisassociateCollector",
}));

export type GetCodeFindingError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the current state and details of a finding.
 */
export const getCodeFinding: API.OperationMethod<
  GetCodeFindingInput & RegionInput,
  GetCodeFindingOutput,
  GetCodeFindingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c13, 0) as any as S.Schema<GetCodeFindingInput>,
  output: __S(431, __c13, 15) as any as S.Schema<GetCodeFindingOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCodeFinding",
  telemetry: TELEMETRY,
  span: "GetCodeFinding",
}));

export type GetCodeIssueError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the current state and details of an issue.
 */
export const getCodeIssue: API.OperationMethod<
  GetCodeIssueInput & RegionInput,
  GetCodeIssueOutput,
  GetCodeIssueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c14, 0) as any as S.Schema<GetCodeIssueInput>,
  output: __S(451, __c14, 3) as any as S.Schema<GetCodeIssueOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCodeIssue",
  telemetry: TELEMETRY,
  span: "GetCodeIssue",
}));

export type GetCodeIssueArtifactError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves one immutable artifact attached to an issue, including its content.
 */
export const getCodeIssueArtifact: API.OperationMethod<
  GetCodeIssueArtifactInput & RegionInput,
  GetCodeIssueArtifactOutput,
  GetCodeIssueArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c15, 0) as any as S.Schema<GetCodeIssueArtifactInput>,
  output: __S(513, __c16, 1) as any as S.Schema<GetCodeIssueArtifactOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCodeIssueArtifact",
  telemetry: TELEMETRY,
  span: "GetCodeIssueArtifact",
}));

export type GetCodeScanError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves one customer-visible environment scan.
 */
export const getCodeScan: API.OperationMethod<
  GetCodeScanInput & RegionInput,
  GetCodeScanOutput,
  GetCodeScanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c18, 0) as any as S.Schema<GetCodeScanInput>,
  output: __S(1536, __c48, 0) as any as S.Schema<GetCodeScanOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCodeScan",
  telemetry: TELEMETRY,
  span: "GetCodeScan",
}));

export type GetCollectorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the current state of the Collector for the caller's account.
 */
export const getCollector: API.OperationMethod<
  GetCollectorInput & RegionInput,
  GetCollectorOutput,
  GetCollectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c19, 0) as any as S.Schema<GetCollectorInput>,
  output: __S(640, __c20, 0) as any as S.Schema<GetCollectorOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCollector",
  telemetry: TELEMETRY,
  span: "GetCollector",
}));

export type GetCollectorDataAccessAuthorizationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Authorizes an Environment's access to a Collector's data. Continuum calls this
 * operation with the Environment's Collector data-access role before it reads the
 * Collector's inventory, so grant continuum:GetCollectorDataAccessAuthorization to
 * that role and, for a Collector in another account, in the Collector's resource
 * policy. The operation evaluates the action against the exact Collector ARN and
 * the Collector's current resource policy using IAM and the caller's authenticated
 * request context, with environmentArn as the continuum:EnvironmentArn condition
 * key. A successful request returns HTTP 200 with no response members. If access
 * is not granted, the operation returns AccessDeniedException without disclosing
 * Collector existence, ownership, or the policy layer that denied access. The
 * service does not reinterpret the policy using only an account ID.
 */
export const getCollectorDataAccessAuthorization: API.OperationMethod<
  GetCollectorDataAccessAuthorizationInput & RegionInput,
  GetCollectorDataAccessAuthorizationOutput,
  GetCollectorDataAccessAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c21, 0) as any as S.Schema<GetCollectorDataAccessAuthorizationInput>,
  output: __S(288, __c9, 0) as any as S.Schema<GetCollectorDataAccessAuthorizationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCollectorDataAccessAuthorization",
  telemetry: TELEMETRY,
  span: "GetCollectorDataAccessAuthorization",
}));

export type GetEnvironmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the current state and configuration of an environment.
 */
export const getEnvironment: API.OperationMethod<
  GetEnvironmentInput & RegionInput,
  GetEnvironmentOutput,
  GetEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c22, 0) as any as S.Schema<GetEnvironmentInput>,
  output: __S(705, __c22, 1) as any as S.Schema<GetEnvironmentOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironment",
  telemetry: TELEMETRY,
  span: "GetEnvironment",
}));

export type GetIntegrationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an integration.
 */
export const getIntegration: API.OperationMethod<
  GetIntegrationInput & RegionInput,
  GetIntegrationOutput,
  GetIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c24, 0) as any as S.Schema<GetIntegrationInput>,
  output: __S(804, __c25, 4) as any as S.Schema<GetIntegrationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntegration",
  telemetry: TELEMETRY,
  span: "GetIntegration",
}));

export type GetResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the resource policy attached to a Continuum resource.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyInput & RegionInput,
  GetResourcePolicyOutput,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c26, 0) as any as S.Schema<GetResourcePolicyInput>,
  output: __S(864, __c27, 0) as any as S.Schema<GetResourcePolicyOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
  telemetry: TELEMETRY,
  span: "GetResourcePolicy",
}));

export type ListAssociatedCollectorsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Collectors currently associated with one Environment in ascending collectorId order. Each entry carries the Collector ARN, so a listed association can be passed straight to DisassociateCollector, including when the Collector belongs to another account. An association recorded before Continuum persisted the ARN is omitted from the response, because without the ARN it cannot be acted on.
 */
export const listAssociatedCollectors: API.PaginatedOperationMethod<
  ListAssociatedCollectorsInput & RegionInput,
  ListAssociatedCollectorsOutput,
  ListAssociatedCollectorsError,
  Credentials | HttpClient.HttpClient,
  AssociatedCollector
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(896, __c28, 0) as any as S.Schema<ListAssociatedCollectorsInput>,
  output: __S(898, __c28, 2) as any as S.Schema<ListAssociatedCollectorsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociatedCollectors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "associatedCollectors",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListAssociatedCollectors",
})) as any;

export type ListAssociatedEnvironmentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Environments currently associated with one Collector in lexicographically ascending environmentArn order. The ARN identifies each Environment across accounts within the Collector's Region.
 */
export const listAssociatedEnvironments: API.PaginatedOperationMethod<
  ListAssociatedEnvironmentsInput & RegionInput,
  ListAssociatedEnvironmentsOutput,
  ListAssociatedEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  AssociatedEnvironment
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(928, __c29, 0) as any as S.Schema<ListAssociatedEnvironmentsInput>,
  output: __S(929, __c29, 1) as any as S.Schema<ListAssociatedEnvironmentsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociatedEnvironments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "associatedEnvironments",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListAssociatedEnvironments",
})) as any;

export type ListCodeFindingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the findings in an environment in descending findingId order.
 */
export const listCodeFindings: API.PaginatedOperationMethod<
  ListCodeFindingsInput & RegionInput,
  ListCodeFindingsOutput,
  ListCodeFindingsError,
  Credentials | HttpClient.HttpClient,
  FindingSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(992, __c31, 0) as any as S.Schema<ListCodeFindingsInput>,
  output: __S(995, __c31, 3) as any as S.Schema<ListCodeFindingsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCodeFindings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListCodeFindings",
})) as any;

export type ListCodeIssueArtifactsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the artifacts attached to an issue in descending artifactId order. Content is returned by GetCodeIssueArtifact.
 */
export const listCodeIssueArtifacts: API.PaginatedOperationMethod<
  ListCodeIssueArtifactsInput & RegionInput,
  ListCodeIssueArtifactsOutput,
  ListCodeIssueArtifactsError,
  Credentials | HttpClient.HttpClient,
  IssueArtifactItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1024, __c32, 0) as any as S.Schema<ListCodeIssueArtifactsInput>,
  output: __S(1027, __c32, 3) as any as S.Schema<ListCodeIssueArtifactsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCodeIssueArtifacts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListCodeIssueArtifacts",
})) as any;

export type ListCodeIssuesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the issues in an environment in descending issueId order.
 */
export const listCodeIssues: API.PaginatedOperationMethod<
  ListCodeIssuesInput & RegionInput,
  ListCodeIssuesOutput,
  ListCodeIssuesError,
  Credentials | HttpClient.HttpClient,
  IssueSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1056, __c33, 0) as any as S.Schema<ListCodeIssuesInput>,
  output: __S(1059, __c33, 3) as any as S.Schema<ListCodeIssuesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCodeIssues",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListCodeIssues",
})) as any;

export type ListCodeScansError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists customer-visible scans for one environment in descending scanRunId order.
 */
export const listCodeScans: API.PaginatedOperationMethod<
  ListCodeScansInput & RegionInput,
  ListCodeScansOutput,
  ListCodeScansError,
  Credentials | HttpClient.HttpClient,
  CodeScanSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1088, __c34, 0) as any as S.Schema<ListCodeScansInput>,
  output: __S(1090, __c34, 2) as any as S.Schema<ListCodeScansOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCodeScans",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "scans",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListCodeScans",
})) as any;

export type ListCollectorsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Collectors owned by the authenticated caller's account, including a Collector whose deletion is in progress. A Collector that is still being created is omitted. The account-scoped Collector quota currently permits at most one result, so no result ordering applies.
 */
export const listCollectors: API.OperationMethod<
  ListCollectorsInput & RegionInput,
  ListCollectorsOutput,
  ListCollectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c35, 0) as any as S.Schema<ListCollectorsInput>,
  output: __S(1122, __c35, 2) as any as S.Schema<ListCollectorsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCollectors",
  telemetry: TELEMETRY,
  span: "ListCollectors",
}));

export type ListEnvironmentsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all environments in your account in descending environmentId order. This complete-inventory operation intentionally has no response filters; see the input documentation for the API standards justification.
 */
export const listEnvironments: API.PaginatedOperationMethod<
  ListEnvironmentsInput & RegionInput,
  ListEnvironmentsOutput,
  ListEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  EnvironmentListEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1152, __c36, 0) as any as S.Schema<ListEnvironmentsInput>,
  output: __S(1153, __c36, 1) as any as S.Schema<ListEnvironmentsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListEnvironments",
})) as any;

export type ListIntegrationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the integrations in your account in descending integrationId order.
 */
export const listIntegrations: API.PaginatedOperationMethod<
  ListIntegrationsInput & RegionInput,
  ListIntegrationsOutput,
  ListIntegrationsError,
  Credentials | HttpClient.HttpClient,
  IntegrationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1184, __c37, 0) as any as S.Schema<ListIntegrationsInput>,
  output: __S(1186, __c37, 2) as any as S.Schema<ListIntegrationsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIntegrations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListIntegrations",
})) as any;

export type PutResourcePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or replaces the resource policy attached to a Continuum resource.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyInput & RegionInput,
  PutResourcePolicyOutput,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1216, __c38, 0) as any as S.Schema<PutResourcePolicyInput>,
  output: __S(864, __c27, 0) as any as S.Schema<PutResourcePolicyOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
  telemetry: TELEMETRY,
  span: "PutResourcePolicy",
}));

export type StartIntegrationAuthorizationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts an OAuth authorization for a new integration and returns the values the caller sends to the provider's authorization endpoint. The authorization belongs to the calling AWS account, can be redeemed once by CreateIntegration from that same account, and expires after ten minutes.
 */
export const startIntegrationAuthorization: API.OperationMethod<
  StartIntegrationAuthorizationInput & RegionInput,
  StartIntegrationAuthorizationOutput,
  StartIntegrationAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c39, 0) as any as S.Schema<StartIntegrationAuthorizationInput>,
  output: __S(1249, __c39, 1) as any as S.Schema<StartIntegrationAuthorizationOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartIntegrationAuthorization",
  telemetry: TELEMETRY,
  span: "StartIntegrationAuthorization",
}));

export type UpdateCollectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the customer-controlled mutable properties of a Collector. Only the name and Kubernetes cluster IAM role can be changed.
 */
export const updateCollector: API.OperationMethod<
  UpdateCollectorInput & RegionInput,
  UpdateCollectorOutput,
  UpdateCollectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1281, __c40, 1) as any as S.Schema<UpdateCollectorInput>,
  output: __S(640, __c20, 0) as any as S.Schema<UpdateCollectorOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCollector",
  telemetry: TELEMETRY,
  span: "UpdateCollector",
}));

export type UpdateEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the customer-controlled mutable properties of an environment. Only the name, the environment's S3 integration source and repository selections, its scan frequency, its network policy, and its patch creation policy can be changed.
 */
export const updateEnvironment: API.OperationMethod<
  UpdateEnvironmentInput & RegionInput,
  UpdateEnvironmentOutput,
  UpdateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1312, __c41, 0) as any as S.Schema<UpdateEnvironmentInput>,
  output: __S(1313, __c41, 1) as any as S.Schema<UpdateEnvironmentOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnvironment",
  telemetry: TELEMETRY,
  span: "UpdateEnvironment",
}));

export type UpdateIntegrationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Rotates the credentials used by an Amazon S3 integration. Only S3 integrations can
 * be updated; GitHub integrations cannot be modified. The integration's name,
 * provider type, and bucket remain fixed.
 *
 * The caller must have iam:PassRole permission for the supplied role, including
 * when only the external ID changes. Continuum verifies that the role can be
 * assumed with the requested external ID and can access the existing bucket before
 * saving both credentials atomically. Omitting externalId preserves its current
 * value. Repeating both current credentials leaves updatedAt unchanged, but still
 * requires authorization and access validation.
 */
export const updateIntegration: API.OperationMethod<
  UpdateIntegrationInput & RegionInput,
  UpdateIntegrationOutput,
  UpdateIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1345, __c42, 1) as any as S.Schema<UpdateIntegrationInput>,
  output: __S(804, __c25, 4) as any as S.Schema<UpdateIntegrationOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIntegration",
  telemetry: TELEMETRY,
  span: "UpdateIntegration",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          kubernetesClusterRole: S.optional(__S(64, __c2, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        })
          .pipe(S.encodeKeys({ kubernetesClusterRole: "k8ClusterRole" }))
          .pipe(
            T.all(T.Http({ method: "POST", uri: "/collectors" }), svc, auth, proto, ver, rules),
          ),
      ).annotate({ identifier: "CreateCollectorInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          collectorId: S.String,
          collectorArn: S.String,
          type: S.String,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreateCollectorOutput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ roleArn: S.String, externalId: S.optional(SensitiveString) }),
      ).annotate({ identifier: "KubernetesClusterRoleConfiguration" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String, configuration: S.optional(__S(193, __c6, 1)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/environments" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateEnvironmentInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String,
          environmentArn: S.String,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreateEnvironmentOutput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          integrationId: S.String,
          codePrefix: S.optional(S.String),
          contextPrefix: S.optional(S.String),
        }),
      ).annotate({ identifier: "EnvironmentS3IntegrationSource" });
    case 1:
      return S.Array(__S(160, __c5, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          integrationId: S.String,
          repository: S.String,
          defaultBranch: S.optional(S.String),
        }),
      ).annotate({ identifier: "EnvironmentRepositorySource" });
    case 3:
      return S.Array(__S(162, __c5, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          s3Sources: S.optional(__S(161, __c5, 1)),
          repositorySources: S.optional(__S(163, __c5, 3)),
        }),
      ).annotate({ identifier: "EnvironmentSourceConfiguration" });
    case 5:
      return S.suspend(() => S.Struct({ allowedDomains: S.optional(__S(128, __c4, 0)) })).annotate({
        identifier: "EnvironmentNetworkConfiguration",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          network: S.optional(__S(165, __c5, 5)),
          scanFrequency: S.optional(S.String),
          patchCreationPolicy: S.optional(S.String),
        }),
      ).annotate({ identifier: "EnvironmentConfiguration" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sourceConfiguration: S.optional(__S(164, __c5, 4)),
          environmentConfiguration: S.optional(__S(166, __c5, 6)),
        }),
      ).annotate({ identifier: "CreateCodeConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ codeConfiguration: S.optional(__S(192, __c6, 0)) }),
      ).annotate({ identifier: "CreateEnvironmentConfiguration" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          authorizationCode: SensitiveString,
          state: SensitiveString,
          redirectUrl: S.optional(S.String),
        }),
      ).annotate({ identifier: "GitHubAuthorizationConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ authorization: __S(224, __c7, 0), organizationName: S.optional(S.String) }),
      ).annotate({ identifier: "GitHubConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          instanceUrl: S.String,
          targetType: S.String,
          targetPath: S.String,
          accessToken: SensitiveString,
        }),
      ).annotate({ identifier: "GitLabConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({ bucket: S.String, roleArn: S.String, externalId: SensitiveString }),
      ).annotate({ identifier: "S3Configuration" });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ github: __S(225, __c7, 1) }),
        /*@__PURE__*/ S.Struct({ gitlab: __S(226, __c7, 2) }),
        /*@__PURE__*/ S.Struct({ s3: __S(227, __c7, 3) }),
      ]);
    case 5:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          name: S.String,
          providerConfiguration: __S(228, __c7, 4),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/integrations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateIntegrationInput" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          integrationId: S.String,
          integrationArn: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreateIntegrationOutput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ collectorId: S.String.pipe(T.HttpLabel("collectorId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/collectors/{collectorId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCollectorInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteCollectorResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ environmentId: S.String.pipe(T.HttpLabel("environmentId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/environments/{environmentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEnvironmentInput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ integrationId: S.String.pipe(T.HttpLabel("integrationId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/integrations/{integrationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteIntegrationInput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          collectorArn: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/environments/{environmentId}/collectors/disassociate",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateCollectorInput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          findingId: S.String.pipe(T.HttpLabel("findingId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/environments/{environmentId}/code-findings/{findingId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCodeFindingInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          version: S.optional(S.String),
          fixedInVersion: S.optional(S.String),
          packageManager: S.optional(S.String),
        }),
      ).annotate({ identifier: "AffectedPackage" });
    case 2:
      return S.Array(__S(417, __c13, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          file: S.optional(S.String),
          line: S.optional(S.Number),
          snippet: S.optional(S.String),
        }),
      ).annotate({ identifier: "FindingEvidence" });
    case 4:
      return S.Array(__S(419, __c13, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          verdict: S.String,
          blockingReason: S.optional(S.String),
          confidence: S.optional(S.Number),
          rationale: S.optional(S.String),
          severityAdjustment: S.optional(S.String),
          mitigatingControls: S.optional(__S(128, __c4, 0)),
          preconditions: S.optional(__S(128, __c4, 0)),
          evidence: S.optional(__S(420, __c13, 4)),
        }),
      ).annotate({ identifier: "FindingValidation" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          filePath: S.optional(S.String),
          startLine: S.optional(S.Number),
          endLine: S.optional(S.Number),
        }),
      ).annotate({ identifier: "FindingLocation" });
    case 7:
      return S.Array(__S(422, __c13, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          title: S.optional(S.String),
          description: S.optional(S.String),
          cweId: S.optional(S.String),
          cweCaption: S.optional(S.String),
          additionalCweIds: S.optional(__S(128, __c4, 0)),
          cveId: S.optional(S.String),
          cvssBaseScore: S.optional(S.Number),
          fixCoverage: S.optional(S.String),
          fixCoverageId: S.optional(S.Number),
          locations: S.optional(__S(423, __c13, 7)),
          remediation: S.optional(S.String),
          remediationReferences: S.optional(__S(128, __c4, 0)),
          code: S.optional(S.String),
          details: S.optional(S.String),
          affectedPackages: S.optional(__S(418, __c13, 2)),
        }),
      ).annotate({ identifier: "FindingVulnerability" });
    case 9:
      return S.Array(__S(424, __c13, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          uid: S.optional(S.String),
          name: S.optional(S.String),
          type: S.optional(S.String),
          region: S.optional(S.String),
        }),
      ).annotate({ identifier: "FindingResource" });
    case 11:
      return S.Array(__S(426, __c13, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          uid: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "FindingComplianceCheck" });
    case 13:
      return S.Array(__S(428, __c13, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          application: S.optional(S.String),
          applicationUid: S.optional(S.String),
          applicationVersion: S.optional(S.String),
          control: S.optional(S.String),
          description: S.optional(S.String),
          standards: S.optional(__S(128, __c4, 0)),
          requirements: S.optional(__S(128, __c4, 0)),
          checks: S.optional(__S(429, __c13, 13)),
          status: S.optional(S.String),
          statusId: S.optional(S.Number),
          remediation: S.optional(S.String),
          remediationReferences: S.optional(__S(128, __c4, 0)),
        }),
      ).annotate({ identifier: "FindingPosture" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          title: S.String,
          severity: S.String,
          summary: S.optional(S.String),
          detailedDescription: S.optional(S.String),
          category: S.optional(S.String),
          subCategory: S.optional(S.String),
          cweIds: S.optional(__S(128, __c4, 0)),
          owaspCategory: S.optional(S.String),
          mitigation: S.optional(S.String),
          filePath: S.optional(S.String),
          lineNumber: S.optional(S.Number),
          cveId: S.optional(S.String),
          cvssBaseScore: S.optional(S.Number),
          affectedPackages: S.optional(__S(418, __c13, 2)),
          vulnerableCode: S.optional(S.String),
          relevantInputs: S.optional(__S(128, __c4, 0)),
          stepsToReproduce: S.optional(__S(128, __c4, 0)),
          validation: S.optional(__S(421, __c13, 5)),
          endLine: S.optional(S.Number),
          mitreTechniques: S.optional(__S(128, __c4, 0)),
          remediationReferences: S.optional(__S(128, __c4, 0)),
          ocsfClass: S.optional(S.String),
          ocsfSchemaVersion: S.optional(S.String),
          productName: S.optional(S.String),
          productVendorName: S.optional(S.String),
          productVersion: S.optional(S.String),
          sourceStatus: S.optional(S.String),
          sourceStatusId: S.optional(S.Number),
          firstSeenAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          findingTypes: S.optional(__S(128, __c4, 0)),
          vulnerabilities: S.optional(__S(425, __c13, 9)),
          resources: S.optional(__S(427, __c13, 11)),
          posture: S.optional(__S(430, __c13, 14)),
          findingId: S.String,
          findingArn: S.String,
          environmentId: S.String,
          source: S.String,
          sourceFindingId: S.String,
          reportedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          status: S.String,
          statusUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          scanRunId: S.optional(S.String),
          statusMessage: S.optional(S.String),
          discardReason: S.optional(S.String),
          discardReasoning: S.optional(S.String),
          duplicateOfIssueId: S.optional(S.String),
          createdIssueId: S.optional(S.String),
          completedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetCodeFindingOutput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          issueId: S.String.pipe(T.HttpLabel("issueId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/environments/{environmentId}/code-issues/{issueId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCodeIssueInput" });
    case 1:
      return S.Array(S.String);
    case 2:
      return S.suspend(() =>
        S.Struct({
          status: S.String,
          patchCount: S.Number,
          succeededCount: S.Number,
          failedCount: S.Number,
          failureReasons: S.optional(__S(449, __c14, 1)),
        }),
      ).annotate({ identifier: "IssuePatchDelivery" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          issueId: S.String,
          issueArn: S.String,
          name: S.String,
          synopsis: S.String,
          severity: S.optional(S.String),
          confidence: S.optional(S.Number),
          severityReasoning: S.optional(S.String),
          summary: S.optional(S.String),
          findingIds: __S(128, __c4, 0),
          status: S.String,
          phase: S.optional(S.String),
          statusReason: S.optional(S.String),
          statusMessage: S.optional(S.String),
          statusUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          evidenceAvailability: S.optional(S.String),
          patchDelivery: S.optional(__S(450, __c14, 2)),
        }),
      ).annotate({ identifier: "GetCodeIssueOutput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          issueId: S.String.pipe(T.HttpLabel("issueId")),
          artifactId: S.String.pipe(T.HttpLabel("artifactId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/environments/{environmentId}/code-issues/{issueId}/artifacts/{artifactId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCodeIssueArtifactInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          flowId: S.String,
          verdict: S.String,
          confidence: S.optional(S.Number),
          evidence: S.optional(__S(128, __c4, 0)),
        }),
      ).annotate({ identifier: "FlowVerdict" });
    case 2:
      return S.Array(__S(481, __c15, 1));
    case 3:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 4:
      return S.suspend(() =>
        S.Struct({
          payload: S.String,
          targetUrl: S.String,
          httpMethod: S.String,
          headers: S.optional(__S(483, __c15, 3)),
          responseStatus: S.optional(S.Number),
          responseSnippet: S.optional(S.String),
          effect: S.String,
        }),
      ).annotate({ identifier: "ValidationExploitArtifact" });
    case 5:
      return S.suspend(() => S.Struct({ content: S.String })).annotate({
        identifier: "ValidationProofMaterial",
      });
    case 6:
      return S.Array(__S(485, __c15, 5));
    case 7:
      return S.suspend(() => S.Struct({ proofCode: __S(486, __c15, 6) })).annotate({
        identifier: "ValidationProofCode",
      });
    case 8:
      return S.suspend(() => S.Struct({ consoleOutput: S.String })).annotate({
        identifier: "ValidationProofOutput",
      });
    case 9:
      return S.suspend(() =>
        S.Struct({
          code: __S(487, __c15, 7),
          output: S.optional(__S(488, __c15, 8)),
          observedEffect: S.optional(S.String),
        }),
      ).annotate({ identifier: "ValidationExecutedProof" });
    case 10:
      return S.suspend(() =>
        S.Struct({ summary: S.String, inferredEffect: S.optional(S.String) }),
      ).annotate({ identifier: "ValidationSourceAnalysis" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          step: S.Number,
          claim: S.String,
          source: S.String,
          confidence: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ReasoningStep" });
    case 12:
      return S.Array(__S(491, __c15, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          findingId: S.String,
          exploitable: S.String,
          confidence: S.optional(S.Number),
          flowVerdicts: S.optional(__S(482, __c15, 2)),
          reasoningChain: S.optional(__S(492, __c15, 12)),
          exploitArtifact: S.optional(__S(484, __c15, 4)),
        }),
      ).annotate({ identifier: "PerFindingResult" });
    case 14:
      return S.Array(__S(493, __c15, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          exploitable: S.String,
          terminalStatus: S.optional(S.String),
          flowVerdicts: S.optional(__S(482, __c15, 2)),
          attackFlowsConfirmed: S.optional(__S(128, __c4, 0)),
          exploitArtifact: S.optional(__S(484, __c15, 4)),
          executedProof: S.optional(__S(489, __c15, 9)),
          sourceAnalysis: S.optional(__S(490, __c15, 10)),
          perFindingResults: S.optional(__S(494, __c15, 14)),
        }),
      ).annotate({ identifier: "ValidationEvidenceBody" });
    case 16:
      return S.suspend(() =>
        S.Struct({ summary: S.String, factors: S.optional(__S(128, __c4, 0)) }),
      ).annotate({ identifier: "SignalConfidenceReasoning" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          likelihoodBand: S.optional(S.String),
          impactBand: S.optional(S.String),
          barriers: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SignalComputation" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          value: S.optional(S.Boolean),
          basis: S.optional(S.String),
          reason: S.optional(S.String),
          missingInfo: S.optional(S.String),
        }),
      ).annotate({ identifier: "SignalPrecondition" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          value: S.optional(S.String),
          basis: S.optional(S.String),
          reason: S.optional(S.String),
          missingInfo: S.optional(S.String),
        }),
      ).annotate({ identifier: "SignalAccessPrecondition" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          reachableFromAttacker: S.optional(__S(498, __c15, 18)),
          configurationNeeded: S.optional(__S(498, __c15, 18)),
          accessLevel: S.optional(__S(499, __c15, 19)),
          userInteractionRequired: S.optional(__S(498, __c15, 18)),
        }),
      ).annotate({ identifier: "SignalPreconditions" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          attackerGains: S.optional(__S(499, __c15, 19)),
          blastRadius: S.optional(__S(499, __c15, 19)),
          targetValue: S.optional(__S(499, __c15, 19)),
        }),
      ).annotate({ identifier: "SignalImpactDimensions" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          verdict: S.optional(S.String),
          reachedCrownJewels: S.optional(S.Boolean),
          highestLayerReached: S.optional(S.Number),
          confidenceTier: S.optional(S.String),
          scriptable: S.optional(S.Boolean),
          sourceValidationArtifactId: S.optional(S.String),
        }),
      ).annotate({ identifier: "SignalExploitability" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          subjectRef: S.optional(S.String),
          dimension: S.optional(S.String),
          signalStrength: S.optional(S.String),
          conclusion: S.optional(S.String),
          producerId: S.optional(S.String),
          producerVersion: S.optional(S.String),
          confidence: S.optional(S.Number),
          confidenceReasoning: S.optional(__S(496, __c15, 16)),
          computed: S.optional(__S(497, __c15, 17)),
          preconditions: S.optional(__S(500, __c15, 20)),
          impactDimensions: S.optional(__S(501, __c15, 21)),
          exploitability: S.optional(__S(502, __c15, 22)),
        }),
      ).annotate({ identifier: "PrevalidationSignal" });
    case 24:
      return S.Array(__S(503, __c15, 23));
    case 25:
      return S.suspend(() =>
        S.Struct({ producedBy: S.optional(S.String), signals: S.optional(__S(504, __c15, 24)) }),
      ).annotate({ identifier: "PrevalidationSignalsBody" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          patch: S.String,
          format: S.optional(S.String),
          filename: S.optional(S.String),
          patchSha256: S.optional(S.String),
        }),
      ).annotate({ identifier: "RemediationProposalBody" });
    case 27:
      return S.suspend(() =>
        S.Struct({ bucket: S.String, key: S.String, version: S.optional(S.String) }),
      ).annotate({ identifier: "S3Target" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          owner: S.String,
          repository: S.String,
          pullRequestNumber: S.optional(S.Number),
          headSha: S.optional(S.String),
        }),
      ).annotate({ identifier: "GitHubTarget" });
    case 29:
      return S.Union([
        /*@__PURE__*/ S.Struct({ s3: __S(507, __c15, 27) }),
        /*@__PURE__*/ S.Struct({ github: __S(508, __c15, 28) }),
      ]);
    case 30:
      return S.suspend(() =>
        S.Struct({
          status: S.String,
          target: S.optional(__S(509, __c15, 29)),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "PatchDelivery" });
    case 31:
      return S.suspend(() =>
        S.Struct({
          patch: S.String,
          format: S.optional(S.String),
          repositoryName: S.optional(S.String),
          patchSha256: S.String,
          sizeBytes: S.Number,
          delivery: S.optional(__S(510, __c15, 30)),
        }),
      ).annotate({ identifier: "PatchBody" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ validationEvidence: __S(495, __c15, 15) }),
        /*@__PURE__*/ S.Struct({ prevalidationSignals: __S(505, __c15, 25) }),
        /*@__PURE__*/ S.Struct({ remediationProposal: __S(506, __c15, 26) }),
        /*@__PURE__*/ S.Struct({ patch: __S(511, __c15, 31) }),
        /*@__PURE__*/ S.Struct({ raw: S.String }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          artifactId: S.String,
          artifactType: S.String,
          mediaType: S.String,
          body: __S(512, __c16, 0),
          metadata: S.optional(S.Any),
          producer: __S(544, __c17, 0),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "GetCodeIssueArtifactOutput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ agent: S.String })).annotate({
        identifier: "IssueArtifactProducerSummary",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          scanRunId: S.String.pipe(T.HttpLabel("scanRunId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/environments/{environmentId}/code-scans/{scanRunId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCodeScanInput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ collectorId: S.String.pipe(T.HttpLabel("collectorId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/collectors/{collectorId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCollectorInput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          collectorId: S.String,
          collectorArn: S.String,
          type: S.String,
          status: S.String,
          configRecorderArn: S.optional(S.String),
          kubernetesClusterRoleArn: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }).pipe(S.encodeKeys({ kubernetesClusterRoleArn: "k8ClusterRole" })),
      ).annotate({ identifier: "GetCollectorOutput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountId: S.String.pipe(T.HttpQuery("accountId")),
          collectorId: S.String.pipe(T.HttpLabel("collectorId")),
          environmentArn: S.optional(S.String).pipe(T.HttpQuery("environmentArn")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/collectors/{collectorId}/data-access-authorization" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCollectorDataAccessAuthorizationInput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ environmentId: S.String.pipe(T.HttpLabel("environmentId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/environments/{environmentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEnvironmentInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String,
          environmentArn: S.String,
          name: S.String,
          status: S.String,
          statusMessage: S.optional(S.String),
          statusUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          configuration: __S(738, __c23, 2),
        }),
      ).annotate({ identifier: "GetEnvironmentOutput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ collectorDataAccessRoleArn: S.optional(S.String) }),
      ).annotate({ identifier: "CollectorDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          collectorDetails: S.optional(__S(736, __c23, 0)),
          sourceConfiguration: S.optional(__S(164, __c5, 4)),
          environmentConfiguration: S.optional(__S(166, __c5, 6)),
          latestScan: S.optional(__S(1568, __c49, 0)),
        }),
      ).annotate({ identifier: "CodeConfigurationDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({ codeConfiguration: S.optional(__S(737, __c23, 1)) }),
      ).annotate({ identifier: "EnvironmentConfigurationDetails" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ integrationId: S.String.pipe(T.HttpLabel("integrationId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/integrations/{integrationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetIntegrationInput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ organizationName: S.optional(S.String) })).annotate({
        identifier: "GitHubDetails",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          instanceUrl: S.String,
          targetType: S.String,
          targetPath: S.String,
          tokenRotation: S.String,
          expiresAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GitLabDetails" });
    case 2:
      return S.suspend(() => S.Struct({ bucket: S.String, roleArn: S.String })).annotate({
        identifier: "S3Details",
      });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ github: __S(800, __c25, 0) }),
        /*@__PURE__*/ S.Struct({ gitlab: __S(801, __c25, 1) }),
        /*@__PURE__*/ S.Struct({ s3: __S(802, __c25, 2) }),
      ]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          integrationId: S.String,
          integrationArn: S.String,
          name: S.String,
          integrationType: S.String,
          providerDetails: __S(803, __c25, 3),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "GetIntegrationOutput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String.pipe(T.HttpQuery("arn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/resourcepolicy" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResourcePolicyInput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String, policy: SensitiveString, revisionId: S.String }),
      ).annotate({ identifier: "GetResourcePolicyOutput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/environments/{environmentId}/collectors" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAssociatedCollectorsInput" });
    case 1:
      return S.Array(__S(1440, __c45, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ associatedCollectors: __S(897, __c28, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAssociatedCollectorsOutput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          collectorId: S.String.pipe(T.HttpLabel("collectorId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/collectors/{collectorId}/environments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAssociatedEnvironmentsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ associatedEnvironments: __S(961, __c30, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAssociatedEnvironmentsOutput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String,
          environmentArn: S.String,
          name: S.String,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "AssociatedEnvironment" });
    case 1:
      return S.Array(__S(960, __c30, 0));
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/environments/{environmentId}/code-findings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCodeFindingsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          findingId: S.String,
          findingArn: S.String,
          environmentId: S.String,
          source: S.String,
          sourceFindingId: S.String,
          reportedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          status: S.String,
          statusUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          scanRunId: S.optional(S.String),
          statusMessage: S.optional(S.String),
          discardReason: S.optional(S.String),
          discardReasoning: S.optional(S.String),
          duplicateOfIssueId: S.optional(S.String),
          createdIssueId: S.optional(S.String),
          completedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          type: S.String,
          title: S.String,
          severity: S.String,
          category: S.optional(S.String),
          filePath: S.optional(S.String),
        }),
      ).annotate({ identifier: "FindingSummary" });
    case 2:
      return S.Array(__S(993, __c31, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(994, __c31, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListCodeFindingsOutput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          issueId: S.String.pipe(T.HttpLabel("issueId")),
          artifactType: S.optional(S.String).pipe(T.HttpQuery("artifactType")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/environments/{environmentId}/code-issues/{issueId}/artifacts",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCodeIssueArtifactsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          artifactId: S.String,
          artifactType: S.String,
          mediaType: S.String,
          producer: __S(544, __c17, 0),
          contentSizeBytes: S.Number,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "IssueArtifactItem" });
    case 2:
      return S.Array(__S(1025, __c32, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(1026, __c32, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListCodeIssueArtifactsOutput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/environments/{environmentId}/code-issues" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCodeIssuesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          issueId: S.String,
          issueArn: S.String,
          name: S.String,
          severity: S.optional(S.String),
          confidence: S.optional(S.Number),
          status: S.String,
          phase: S.optional(S.String),
          statusReason: S.optional(S.String),
          statusMessage: S.optional(S.String),
          statusUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "IssueSummary" });
    case 2:
      return S.Array(__S(1057, __c33, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(1058, __c33, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListCodeIssuesOutput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/environments/{environmentId}/code-scans" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCodeScansInput" });
    case 1:
      return S.Array(__S(1568, __c49, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ scans: __S(1089, __c34, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListCodeScansOutput" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/collectors" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListCollectorsInput" });
    case 1:
      return S.Array(__S(32, __c1, 0));
    case 2:
      return S.suspend(() => S.Struct({ items: __S(1121, __c35, 1) })).annotate({
        identifier: "ListCollectorsOutput",
      });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/environments" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListEnvironmentsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ items: __S(961, __c30, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEnvironmentsOutput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/integrations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListIntegrationsInput" });
    case 1:
      return S.Array(__S(804, __c25, 4));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: __S(1185, __c37, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListIntegrationsOutput" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          policy: S.optional(SensitiveString),
          expectedRevisionId: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/resourcepolicy" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutResourcePolicyInput" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ providerType: S.String, name: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/integration-authorizations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartIntegrationAuthorizationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          state: SensitiveString,
          codeChallenge: S.String,
          codeChallengeMethod: S.String,
          expiresAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "StartIntegrationAuthorizationOutput" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ set: __S(64, __c2, 0) }),
        /*@__PURE__*/ S.Struct({ remove: __S(288, __c9, 0) }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          collectorId: S.String.pipe(T.HttpLabel("collectorId")),
          name: S.optional(S.String),
          kubernetesClusterRole: S.optional(__S(1280, __c40, 0)),
        })
          .pipe(S.encodeKeys({ kubernetesClusterRole: "k8ClusterRole" }))
          .pipe(
            T.all(
              T.Http({ method: "PATCH", uri: "/collectors/{collectorId}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateCollectorInput" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          name: S.optional(S.String),
          configuration: S.optional(__S(193, __c6, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/environments/{environmentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateEnvironmentInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String,
          environmentArn: S.String,
          name: S.String,
          status: S.String,
          statusMessage: S.optional(S.String),
          statusUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          configuration: __S(738, __c23, 2),
        }),
      ).annotate({ identifier: "UpdateEnvironmentOutput" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ s3: __S(64, __c2, 0) })]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          integrationId: S.String.pipe(T.HttpLabel("integrationId")),
          providerConfiguration: __S(1344, __c42, 0),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/integrations/{integrationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateIntegrationInput" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ path: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(1376, __c43, 0));
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          collectorArn: S.String,
          collectorDataAccessRoleArn: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/environments/{environmentId}/collectors" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateCollectorInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String,
          environmentArn: S.String,
          associatedCollector: __S(1440, __c45, 0),
        }),
      ).annotate({ identifier: "AssociateCollectorOutput" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ collectorId: S.String, collectorArn: S.String })).annotate({
        identifier: "AssociatedCollector",
      });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          ocsfDocument: S.Any,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/environments/{environmentId}/code-findings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCodeFindingInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          findingId: S.String,
          findingArn: S.String,
          title: S.String,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreateCodeFindingOutput" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/environments/{environmentId}/code-scans" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCodeScanInput" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ scan: __S(1568, __c49, 0) })).annotate({
        identifier: "CreateCodeScanOutput",
      });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scanRunId: S.String,
          status: S.String,
          origin: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          completedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          failureMessage: S.optional(S.String),
          failureStage: S.optional(S.String),
        }),
      ).annotate({ identifier: "CodeScanSummary" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
