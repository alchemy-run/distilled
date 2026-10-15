import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "SecurityAgent",
  serviceShapeName: "SecurityAgent",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "securityagent" });
const ver = /*@__PURE__*/ T.ServiceVersion("2025-09-06");
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
              `https://securityagent-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://securityagent.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://securityagent.{R}.api.aws","properties":{},"headers":{}}',
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
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()("ValidationException", {
    message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
    fieldList: /*@__PURE__*/ S.optional(
      /*@__PURE__*/ S.suspend(() => __S(1281, __c80, 1)).annotate({
        identifier: "ValidationExceptionFieldList",
      }),
    ),
  }) {}
export type AgentSpaceId = string;
export type ArtifactType =
  | "TXT"
  | "PNG"
  | "JPEG"
  | "MD"
  | "PDF"
  | "DOCX"
  | "DOC"
  | "JSON"
  | "YAML"
  | (string & {});
export interface AddArtifactInput {
  agentSpaceId: string;
  artifactContent: Uint8Array;
  artifactType: ArtifactType;
  fileName: string;
}
export type ArtifactId = string;
export interface AddArtifactOutput {
  artifactId: string;
}
export type SecurityRequirementPackId = string;
export type SecurityRequirementName = string;
export interface CreateSecurityRequirementEntry {
  name: string;
  description: string;
  domain: string;
  evaluation: string;
  remediation?: string;
}
export type CreateSecurityRequirementEntryList = CreateSecurityRequirementEntry[];
export interface BatchCreateSecurityRequirementsInput {
  packId: string;
  securityRequirements: CreateSecurityRequirementEntry[];
}
export interface BatchCreateSecurityRequirementResult {
  packId: string;
  name: string;
  description: string;
  domain: string;
  evaluation: string;
  remediation?: string;
  createdAt: Date;
  updatedAt: Date;
}
export type BatchCreateSecurityRequirementResultList = BatchCreateSecurityRequirementResult[];
export interface BatchSecurityRequirementError {
  securityRequirementName: string;
  code: string;
  message: string;
}
export type BatchSecurityRequirementErrors = BatchSecurityRequirementError[];
export interface BatchCreateSecurityRequirementsOutput {
  securityRequirements: BatchCreateSecurityRequirementResult[];
  errors: BatchSecurityRequirementError[];
}
export type CodeReviewIdList = string[];
export interface BatchDeleteCodeReviewsInput {
  codeReviewIds: string[];
  agentSpaceId: string;
}
export interface DeleteCodeReviewFailure {
  codeReviewId?: string;
  reason?: string;
}
export type DeleteCodeReviewFailureList = DeleteCodeReviewFailure[];
export interface BatchDeleteCodeReviewsOutput {
  deleted?: string[];
  failed?: DeleteCodeReviewFailure[];
}
export type PentestIdList = string[];
export interface BatchDeletePentestsInput {
  pentestIds: string[];
  agentSpaceId: string;
}
export interface Endpoint {
  uri?: string;
}
const Endpoint = /*@__PURE__*/ __L.at(__c93, 0) as any as S.Schema<Endpoint>;
export type EndpointList = Endpoint[];
export type UriList = string[];
export type AuthenticationProviderType =
  | "SECRETS_MANAGER"
  | "AWS_LAMBDA"
  | "AWS_IAM_ROLE"
  | "AWS_INTERNAL"
  | (string & {});
export interface Authentication {
  providerType?: AuthenticationProviderType;
  value?: string;
}
export type SensitiveEmailAddress = string | redacted.Redacted<string>;
export interface Actor {
  identifier?: string;
  uris?: string[];
  authentication?: Authentication;
  description?: string;
  enableEmailMfa?: boolean;
  mfaForwardingAddress?: string | redacted.Redacted<string>;
}
export type ActorList = Actor[];
export interface IntegratedDocument {
  integrationId: string;
  resourceId: string;
}
export interface DocumentInfo {
  s3Location?: string;
  artifactId?: string;
  integratedDocument?: IntegratedDocument;
}
export type DocumentList = DocumentInfo[];
export interface SourceCodeRepository {
  s3Location?: string;
}
export type SourceCodeRepositoryList = SourceCodeRepository[];
export interface IntegratedRepository {
  integrationId: string;
  providerResourceId: string;
  branch?: string;
}
export type IntegratedRepositoryList = IntegratedRepository[];
export type CaCertificatePem = string | redacted.Redacted<string>;
export type CaCertificateSource =
  | { inlinePem: string | redacted.Redacted<string>; artifactId?: never; s3Location?: never }
  | { inlinePem?: never; artifactId: string; s3Location?: never }
  | { inlinePem?: never; artifactId?: never; s3Location: string };
export interface TrustedCaCertificate {
  source: CaCertificateSource;
}
export type TrustedCaCertificateList = TrustedCaCertificate[];
export interface Assets {
  endpoints?: Endpoint[];
  actors?: Actor[];
  documents?: DocumentInfo[];
  sourceCode?: SourceCodeRepository[];
  integratedRepositories?: IntegratedRepository[];
  trustedCaCertificates?: TrustedCaCertificate[];
}
export type RiskType =
  | "CROSS_SITE_SCRIPTING"
  | "DEFAULT_CREDENTIALS"
  | "INSECURE_DIRECT_OBJECT_REFERENCE"
  | "PRIVILEGE_ESCALATION"
  | "SERVER_SIDE_TEMPLATE_INJECTION"
  | "COMMAND_INJECTION"
  | "CODE_INJECTION"
  | "SQL_INJECTION"
  | "ARBITRARY_FILE_UPLOAD"
  | "INSECURE_DESERIALIZATION"
  | "LOCAL_FILE_INCLUSION"
  | "INFORMATION_DISCLOSURE"
  | "PATH_TRAVERSAL"
  | "SERVER_SIDE_REQUEST_FORGERY"
  | "JSON_WEB_TOKEN_VULNERABILITIES"
  | "XML_EXTERNAL_ENTITY"
  | "FILE_DELETION"
  | "OTHER"
  | "GRAPHQL_VULNERABILITIES"
  | "BUSINESS_LOGIC_VULNERABILITIES"
  | "CRYPTOGRAPHIC_VULNERABILITIES"
  | "DENIAL_OF_SERVICE"
  | "FILE_ACCESS"
  | "FILE_CREATION"
  | "DATABASE_MODIFICATION"
  | "DATABASE_ACCESS"
  | "OUTBOUND_SERVICE_REQUEST"
  | "UNKNOWN"
  | (string & {});
export type RiskTypeList = RiskType[];
export type ServiceRole = string;
export interface CloudWatchLog {
  logGroup?: string;
  logStream?: string;
}
export type VpcArn = string;
export type SecurityGroupArn = string;
export type SecurityGroupArns = string[];
export type SubnetArn = string;
export type SubnetArns = string[];
export interface VpcConfig {
  vpcArn?: string;
  securityGroupArns?: string[];
  subnetArns?: string[];
}
export type NetworkTrafficRuleEffect = "ALLOW" | "DENY" | (string & {});
export type NetworkTrafficRuleType = "URL" | (string & {});
export interface NetworkTrafficRule {
  effect?: NetworkTrafficRuleEffect;
  pattern?: string;
  networkTrafficRuleType?: NetworkTrafficRuleType;
}
export type NetworkTrafficRuleList = NetworkTrafficRule[];
export interface CustomHeader {
  name?: string;
  value?: string;
}
export type CustomHeaderList = CustomHeader[];
export interface NetworkTrafficConfig {
  rules?: NetworkTrafficRule[];
  customHeaders?: CustomHeader[];
}
export type CodeRemediationStrategy = "AUTOMATIC" | "DISABLED" | (string & {});
export type CleanUpStrategy = "BEST_EFFORT_DELETE" | "RETAIN_ALL" | (string & {});
export type SkillType = "FINDING_PERSONALIZATION" | "LOGIN_OPTIMIZATION" | (string & {});
export type SkillTypeList = SkillType[];
export interface ReportDestination {
  integrationId: string;
  containerId: string;
  parentId?: string;
  documentId?: string;
}
export type RiskLevel =
  | "UNKNOWN"
  | "INFORMATIONAL"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL"
  | (string & {});
export type RiskLevelFilterList = RiskLevel[];
export type ConfidenceLevel =
  | "FALSE_POSITIVE"
  | "UNCONFIRMED"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | (string & {});
export type ConfidenceLevelFilterList = ConfidenceLevel[];
export type FindingStatus = "ACTIVE" | "RESOLVED" | "ACCEPTED" | "FALSE_POSITIVE" | (string & {});
export type FindingStatusFilterList = FindingStatus[];
export type RiskTypeFilterList = RiskType[];
export type ReportFilterValue = string;
export type ReportFilterList = string[];
export type TaskExecutionStatus =
  | "IN_PROGRESS"
  | "ABORTED"
  | "COMPLETED"
  | "INTERNAL_ERROR"
  | "FAILED"
  | (string & {});
export type TaskExecutionStatusFilterList = TaskExecutionStatus[];
export interface ReportFilters {
  riskLevels?: RiskLevel[];
  confidenceLevels?: ConfidenceLevel[];
  statuses?: FindingStatus[];
  riskTypes?: RiskType[];
  findingTypes?: string[];
  taskStatuses?: TaskExecutionStatus[];
  annotationNotes?: boolean;
  complianceReport?: boolean;
}
export interface CiCdConfiguration {
  enabled?: boolean;
}
export interface Pentest {
  pentestId: string;
  agentSpaceId: string;
  title: string;
  assets: Assets;
  excludeRiskTypes?: RiskType[];
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  vpcConfig?: VpcConfig;
  networkTrafficConfig?: NetworkTrafficConfig;
  codeRemediationStrategy?: CodeRemediationStrategy;
  cleanUpStrategy?: CleanUpStrategy;
  disableManagedSkills?: SkillType[];
  maxTaskHours?: number;
  reportDestination?: ReportDestination;
  reportFilters?: ReportFilters;
  cicdConfiguration?: CiCdConfiguration;
  createdAt?: Date;
  updatedAt?: Date;
}
export type PentestList = Pentest[];
export interface DeletePentestFailure {
  pentestId?: string;
  reason?: string;
}
export type DeletePentestFailureList = DeletePentestFailure[];
export interface BatchDeletePentestsOutput {
  deleted?: Pentest[];
  failed?: DeletePentestFailure[];
}
export type SecurityRequirementNameList = string[];
export interface BatchDeleteSecurityRequirementsInput {
  packId: string;
  securityRequirementNames: string[];
}
export interface BatchDeleteSecurityRequirementsOutput {
  deletedSecurityRequirementNames: string[];
  errors: BatchSecurityRequirementError[];
}
export type ThreatModelIdList = string[];
export interface BatchDeleteThreatModelsInput {
  threatModelIds: string[];
  agentSpaceId: string;
}
export interface DeleteThreatModelFailure {
  threatModelId?: string;
  reason?: string;
}
export type DeleteThreatModelFailureList = DeleteThreatModelFailure[];
export interface BatchDeleteThreatModelsOutput {
  deleted?: string[];
  failed?: DeleteThreatModelFailure[];
}
export type AgentSpaceIdList = string[];
export interface BatchGetAgentSpacesInput {
  agentSpaceIds: string[];
}
export type VpcConfigs = VpcConfig[];
export type LogGroupArn = string;
export type LogGroupArns = string[];
export type S3BucketArn = string;
export type S3BucketArns = string[];
export type SecretArn = string;
export type SecretArns = string[];
export type LambdaFunctionArn = string;
export type LambdaFunctionArns = string[];
export type IamRoles = string[];
export interface AWSResources {
  vpcs?: VpcConfig[];
  logGroups?: string[];
  s3Buckets?: string[];
  secretArns?: string[];
  lambdaFunctionArns?: string[];
  iamRoles?: string[];
}
export type TargetDomainIdList = string[];
export interface CodeReviewSettings {
  controlsScanning: boolean;
  generalPurposeScanning: boolean;
}
export type KmsKeyId = string;
export interface AgentSpace {
  agentSpaceId: string;
  name: string;
  description?: string;
  awsResources?: AWSResources;
  targetDomainIds?: string[];
  codeReviewSettings?: CodeReviewSettings;
  kmsKeyId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export type AgentSpaceList = AgentSpace[];
export interface BatchGetAgentSpacesOutput {
  agentSpaces?: AgentSpace[];
  notFound?: string[];
}
export type ArtifactIds = string[];
export interface BatchGetArtifactMetadataInput {
  agentSpaceId: string;
  artifactIds: string[];
}
export interface ArtifactMetadataItem {
  agentSpaceId: string;
  artifactId: string;
  fileName: string;
  updatedAt: Date;
}
export type ArtifactMetadataList = ArtifactMetadataItem[];
export interface BatchGetArtifactMetadataOutput {
  artifactMetadataList: ArtifactMetadataItem[];
}
export type CodeReviewJobIdList = string[];
export interface BatchGetCodeReviewJobsInput {
  codeReviewJobIds: string[];
  agentSpaceId: string;
}
export type JobStatus =
  | "IN_PROGRESS"
  | "STOPPING"
  | "STOPPED"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export type StepName =
  | "PREFLIGHT"
  | "STATIC_ANALYSIS"
  | "PENTEST"
  | "FINALIZING"
  | "VALIDATION"
  | (string & {});
export type StepStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "STOPPED"
  | (string & {});
export interface Step {
  name?: StepName;
  status?: StepStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
export type StepList = Step[];
export type ContextType = "ERROR" | "CLIENT_ERROR" | "WARNING" | "INFO" | (string & {});
export interface ExecutionContext {
  contextType?: ContextType;
  context?: string;
  timestamp?: Date;
}
export type ExecutionContextList = ExecutionContext[];
export type ErrorCode = "CLIENT_ERROR" | "INTERNAL_ERROR" | "STOPPED_BY_USER" | (string & {});
export interface ErrorInformation {
  code?: ErrorCode;
  message?: string;
}
export interface CodeReviewJob {
  codeReviewJobId?: string;
  codeReviewId?: string;
  title?: string;
  overview?: string;
  status?: JobStatus;
  documents?: DocumentInfo[];
  sourceCode?: SourceCodeRepository[];
  steps?: Step[];
  executionContext?: ExecutionContext[];
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  errorInformation?: ErrorInformation;
  integratedRepositories?: IntegratedRepository[];
  codeRemediationStrategy?: CodeRemediationStrategy;
  maxTaskHours?: number;
  reportDestination?: ReportDestination;
  createdAt?: Date;
  updatedAt?: Date;
}
export type CodeReviewJobList = CodeReviewJob[];
export interface BatchGetCodeReviewJobsOutput {
  codeReviewJobs?: CodeReviewJob[];
  notFound?: string[];
}
export type TaskIdList = string[];
export interface BatchGetCodeReviewJobTasksInput {
  agentSpaceId: string;
  codeReviewJobTaskIds: string[];
}
export interface Category {
  name?: string;
  isPrimary?: boolean;
}
export type CategoryList = Category[];
export type LogType = "CLOUDWATCH" | (string & {});
export interface LogLocation {
  logType?: LogType;
  cloudWatchLog?: CloudWatchLog;
}
export interface CodeReviewJobTask {
  taskId: string;
  codeReviewId?: string;
  codeReviewJobId?: string;
  agentSpaceId?: string;
  title?: string;
  description?: string;
  categories?: Category[];
  riskType?: RiskType;
  executionStatus?: TaskExecutionStatus;
  logsLocation?: LogLocation;
  createdAt?: Date;
  updatedAt?: Date;
}
export type CodeReviewJobTaskList = CodeReviewJobTask[];
export interface BatchGetCodeReviewJobTasksOutput {
  codeReviewJobTasks?: CodeReviewJobTask[];
  notFound?: string[];
}
export interface BatchGetCodeReviewsInput {
  codeReviewIds: string[];
  agentSpaceId: string;
}
export type ValidationMode = "DISABLED" | "SIMULATED" | (string & {});
export interface CodeReview {
  codeReviewId: string;
  agentSpaceId: string;
  title: string;
  assets: Assets;
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  codeRemediationStrategy?: CodeRemediationStrategy;
  validationMode?: ValidationMode;
  maxTaskHours?: number;
  reportDestination?: ReportDestination;
  reportFilters?: ReportFilters;
  createdAt?: Date;
  updatedAt?: Date;
}
export type CodeReviewList = CodeReview[];
export interface BatchGetCodeReviewsOutput {
  codeReviews?: CodeReview[];
  notFound?: string[];
}
export type FindingIdList = string[];
export interface BatchGetFindingsInput {
  findingIds: string[];
  agentSpaceId: string;
}
export type ValidationStatus =
  | "CONFIRMED"
  | "NOT_REPRODUCED"
  | "VALIDATION_FAILED"
  | "VALIDATING"
  | "NOT_VALIDATED"
  | (string & {});
export type CodeRemediationTaskStatus = "IN_PROGRESS" | "COMPLETED" | "FAILED" | (string & {});
export interface CodeRemediationTaskDetails {
  repoName?: string;
  codeDiffLink?: string;
  pullRequestLink?: string;
}
export type CodeRemediationTaskDetailsList = CodeRemediationTaskDetails[];
export interface CodeRemediationTask {
  status: CodeRemediationTaskStatus;
  statusReason?: string;
  taskDetails?: CodeRemediationTaskDetails[];
}
export interface CodeLocation {
  filePath: string;
  lineStart?: number;
  lineEnd?: number;
  label?: string;
}
export type CodeLocationList = CodeLocation[];
export interface VerificationScriptEnvVar {
  name?: string;
  value?: string;
}
export type VerificationScriptEnvVarList = VerificationScriptEnvVar[];
export interface VerificationScript {
  scriptType?: string;
  scriptUrl?: string;
  instructions?: string;
  envVars?: VerificationScriptEnvVar[];
}
export type StringList = string[];
export interface Finding {
  findingId: string;
  agentSpaceId: string;
  pentestId?: string;
  pentestJobId?: string;
  codeReviewId?: string;
  codeReviewJobId?: string;
  taskId?: string;
  name?: string;
  description?: string;
  status?: FindingStatus;
  riskType?: string;
  riskLevel?: RiskLevel;
  riskScore?: string;
  reasoning?: string;
  confidence?: ConfidenceLevel;
  validationStatus?: ValidationStatus;
  attackScript?: string;
  codeRemediationTask?: CodeRemediationTask;
  lastUpdatedBy?: string;
  customerNote?: string;
  codeLocations?: CodeLocation[];
  verificationScript?: VerificationScript;
  alignmentRationale?: string;
  revalidationJobIds?: string[];
  originalFindingId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export type FindingList = Finding[];
export interface BatchGetFindingsOutput {
  findings?: Finding[];
  notFound?: string[];
}
export type PentestJobIdList = string[];
export interface BatchGetPentestJobsInput {
  pentestJobIds: string[];
  agentSpaceId: string;
}
export type JobType = "FULL" | "REVALIDATION" | "CICD" | (string & {});
export type ScopeDecision = "IN_SCOPE" | "SCOPED_OUT" | "SCOPE_CONFLICT" | (string & {});
export interface ScopeResult {
  decision: ScopeDecision;
  reason: string;
}
export interface ScopeChange {
  integrationId: string;
  providerResourceId: string;
  baseCommitSha?: string;
  headCommitSha: string;
  triggerRunId?: string;
}
export type ScopeChangeList = ScopeChange[];
export interface PentestJob {
  pentestJobId?: string;
  pentestId?: string;
  title?: string;
  overview?: string;
  status?: JobStatus;
  endpoints?: Endpoint[];
  actors?: Actor[];
  documents?: DocumentInfo[];
  sourceCode?: SourceCodeRepository[];
  excludePaths?: Endpoint[];
  allowedDomains?: Endpoint[];
  excludeRiskTypes?: RiskType[];
  steps?: Step[];
  executionContext?: ExecutionContext[];
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  vpcConfig?: VpcConfig;
  networkTrafficConfig?: NetworkTrafficConfig;
  errorInformation?: ErrorInformation;
  integratedRepositories?: IntegratedRepository[];
  trustedCaCertificates?: TrustedCaCertificate[];
  codeRemediationStrategy?: CodeRemediationStrategy;
  cleanUpStrategy?: CleanUpStrategy;
  disableManagedSkills?: SkillType[];
  maxTaskHours?: number;
  jobType?: JobType;
  selectedFindingIds?: string[];
  reportDestination?: ReportDestination;
  reportUrl?: string;
  scopeResult?: ScopeResult;
  scopeChanges?: ScopeChange[];
  cicdConfiguration?: CiCdConfiguration;
  createdAt?: Date;
  updatedAt?: Date;
}
export type PentestJobList = PentestJob[];
export interface BatchGetPentestJobsOutput {
  pentestJobs?: PentestJob[];
  notFound?: string[];
}
export interface BatchGetPentestJobTasksInput {
  agentSpaceId: string;
  taskIds: string[];
}
export interface Task {
  taskId: string;
  pentestId?: string;
  pentestJobId?: string;
  agentSpaceId?: string;
  title?: string;
  description?: string;
  categories?: Category[];
  riskType?: RiskType;
  targetEndpoint?: Endpoint;
  executionStatus?: TaskExecutionStatus;
  logsLocation?: LogLocation;
  taskHours?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export type TaskList = Task[];
export interface BatchGetPentestJobTasksOutput {
  tasks?: Task[];
  notFound?: string[];
}
export interface BatchGetPentestsInput {
  pentestIds: string[];
  agentSpaceId: string;
}
export interface BatchGetPentestsOutput {
  pentests?: Pentest[];
  notFound?: string[];
}
export interface BatchGetSecurityRequirementsInput {
  packId: string;
  securityRequirementNames: string[];
}
export interface BatchGetSecurityRequirementResult {
  packId: string;
  name: string;
  description: string;
  domain: string;
  evaluation: string;
  remediation?: string;
  createdAt: Date;
  updatedAt: Date;
}
export type BatchGetSecurityRequirementResultList = BatchGetSecurityRequirementResult[];
export interface BatchGetSecurityRequirementsOutput {
  securityRequirements: BatchGetSecurityRequirementResult[];
  errors: BatchSecurityRequirementError[];
}
export interface BatchGetTargetDomainsInput {
  targetDomainIds: string[];
}
export type TargetDomainId = string;
export type TargetDomainStatus = "PENDING" | "VERIFIED" | "FAILED" | "UNREACHABLE" | (string & {});
export type DomainVerificationMethod = "DNS_TXT" | "HTTP_ROUTE" | "PRIVATE_VPC" | (string & {});
export type DNSRecordType = "TXT" | (string & {});
export interface DnsVerification {
  token?: string;
  dnsRecordName?: string;
  dnsRecordType?: DNSRecordType;
}
export interface HttpVerification {
  token?: string;
  routePath?: string;
}
export interface VerificationDetails {
  method?: DomainVerificationMethod;
  dnsTxt?: DnsVerification;
  httpRoute?: HttpVerification;
}
export interface TargetDomain {
  targetDomainId: string;
  domainName: string;
  verificationStatus?: TargetDomainStatus;
  verificationStatusReason?: string;
  verificationDetails?: VerificationDetails;
  createdAt?: Date;
  verifiedAt?: Date;
}
export type TargetDomainList = TargetDomain[];
export interface BatchGetTargetDomainsOutput {
  targetDomains?: TargetDomain[];
  notFound?: string[];
}
export type ThreatModelJobIdList = string[];
export interface BatchGetThreatModelJobsInput {
  threatModelJobIds: string[];
  agentSpaceId: string;
}
export interface ThreatModelJob {
  threatModelJobId?: string;
  threatModelId?: string;
  agentSpaceId?: string;
  title?: string;
  status?: JobStatus;
  createdAt?: Date;
  updatedAt?: Date;
  executionStartTime?: Date;
  executionEndTime?: Date;
  sourceCode?: SourceCodeRepository[];
  integratedRepositories?: IntegratedRepository[];
  documents?: DocumentInfo[];
  scopeDocs?: DocumentInfo[];
  errorInformation?: ErrorInformation;
  systemOverview?: string;
  reportDestination?: ReportDestination;
}
export type ThreatModelJobList = ThreatModelJob[];
export interface BatchGetThreatModelJobsOutput {
  threatModelJobs?: ThreatModelJob[];
  notFound?: string[];
}
export interface BatchGetThreatModelJobTasksInput {
  agentSpaceId: string;
  threatModelJobTaskIds: string[];
}
export interface ThreatModelJobTask {
  taskId: string;
  threatModelId?: string;
  threatModelJobId?: string;
  agentSpaceId?: string;
  title?: string;
  description?: string;
  executionStatus?: TaskExecutionStatus;
  logsLocation?: LogLocation;
  createdAt?: Date;
  updatedAt?: Date;
}
export type ThreatModelJobTaskList = ThreatModelJobTask[];
export interface BatchGetThreatModelJobTasksOutput {
  threatModelJobTasks?: ThreatModelJobTask[];
  notFound?: string[];
}
export interface BatchGetThreatModelsInput {
  threatModelIds: string[];
  agentSpaceId: string;
}
export interface ThreatModel {
  threatModelId: string;
  agentSpaceId: string;
  title: string;
  description?: string;
  assets: Assets;
  scopeDocs?: DocumentInfo[];
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  reportDestination?: ReportDestination;
  createdAt?: Date;
  updatedAt?: Date;
}
export type ThreatModelList = ThreatModel[];
export interface BatchGetThreatModelsOutput {
  threatModels?: ThreatModel[];
  notFound?: string[];
}
export type ThreatIdList = string[];
export interface BatchGetThreatsInput {
  threatIds: string[];
  agentSpaceId: string;
}
export type ThreatSeverity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFO" | (string & {});
export type ThreatStatus = "OPEN" | "RESOLVED" | "DISMISSED" | (string & {});
export interface ThreatAnchorShape {
  kind?: string;
  id?: string;
  packageId?: string;
}
export interface ThreatEvidenceShape {
  packageId?: string;
  path?: string;
}
export type ThreatEvidenceList = ThreatEvidenceShape[];
export type StrideCategory =
  | "SPOOFING"
  | "TAMPERING"
  | "REPUDIATION"
  | "INFORMATION_DISCLOSURE"
  | "DENIAL_OF_SERVICE"
  | "ELEVATION_OF_PRIVILEGE"
  | (string & {});
export type StrideCategoryList = StrideCategory[];
export type ThreatActor = "CUSTOMER" | "AGENT" | (string & {});
export interface Threat {
  threatId?: string;
  threatJobId?: string;
  title?: string;
  statement?: string;
  severity?: ThreatSeverity;
  status?: ThreatStatus;
  comments?: string;
  threatSource?: string;
  prerequisites?: string;
  threatAction?: string;
  threatImpact?: string;
  impactedGoal?: string[];
  impactedAssets?: string[];
  anchor?: ThreatAnchorShape;
  evidence?: ThreatEvidenceShape[];
  stride?: StrideCategory[];
  recommendation?: string;
  createdBy?: ThreatActor;
  updatedBy?: ThreatActor;
  createdAt?: Date;
  updatedAt?: Date;
}
export type ThreatList = Threat[];
export interface BatchGetThreatsOutput {
  threats?: Threat[];
  notFound?: string[];
}
export interface UpdateSecurityRequirementEntry {
  name: string;
  description?: string;
  domain?: string;
  evaluation?: string;
  remediation?: string;
}
export type UpdateSecurityRequirementEntryList = UpdateSecurityRequirementEntry[];
export interface BatchUpdateSecurityRequirementsInput {
  packId: string;
  securityRequirements: UpdateSecurityRequirementEntry[];
}
export interface BatchUpdateSecurityRequirementsOutput {
  updatedSecurityRequirementNames: string[];
  errors: BatchSecurityRequirementError[];
}
export type AgentName = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateAgentSpaceInput {
  name: string;
  description?: string;
  awsResources?: AWSResources;
  targetDomainIds?: string[];
  codeReviewSettings?: CodeReviewSettings;
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateAgentSpaceOutput {
  agentSpaceId: string;
  name: string;
  description?: string;
  awsResources?: AWSResources;
  targetDomainIds?: string[];
  codeReviewSettings?: CodeReviewSettings;
  kmsKeyId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export type IdCInstanceArn = string;
export type RoleArn = string;
export type DefaultKmsKeyId = string;
export interface CreateApplicationRequest {
  idcInstanceArn?: string;
  roleArn?: string;
  defaultKmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
}
export type ApplicationId = string;
export interface CreateApplicationResponse {
  applicationId: string;
}
export interface CreateCodeReviewInput {
  title: string;
  agentSpaceId: string;
  assets: Assets;
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  codeRemediationStrategy?: CodeRemediationStrategy;
  validationMode?: ValidationMode;
  maxTaskHours?: number;
  reportDestination?: ReportDestination;
  reportFilters?: ReportFilters;
}
export interface CreateCodeReviewOutput {
  codeReviewId: string;
  title?: string;
  createdAt?: Date;
  updatedAt?: Date;
  assets?: Assets;
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  agentSpaceId?: string;
  codeRemediationStrategy?: CodeRemediationStrategy;
  validationMode?: ValidationMode;
  maxTaskHours?: number;
  reportDestination?: ReportDestination;
  reportFilters?: ReportFilters;
}
export type Provider =
  | "GITHUB"
  | "GITLAB"
  | "BITBUCKET"
  | "CONFLUENCE"
  | "AZURE_DEVOPS"
  | (string & {});
export type AuthCode = string;
export type CsrfState = string;
export type TargetUrl = string;
export interface GitHubIntegrationInput {
  code: string;
  state: string;
  organizationName?: string;
  targetUrl?: string;
  installationId?: string;
}
export type AccessToken = string | redacted.Redacted<string>;
export type GitLabTokenType = "PERSONAL" | "GROUP" | (string & {});
export interface GitLabIntegrationInput {
  accessToken: string | redacted.Redacted<string>;
  targetUrl?: string;
  tokenType: GitLabTokenType;
  groupId?: string;
}
export type BitbucketInstallationId = string;
export type BitbucketWorkspace = string;
export interface BitbucketIntegrationInput {
  installationId: string;
  workspace: string;
  code: string;
  state: string;
}
export type ConfluenceInstallationId = string;
export type ConfluenceSiteUrl = string;
export interface ConfluenceIntegrationInput {
  installationId: string;
  code: string;
  state: string;
  siteUrl: string;
}
export interface AzureDevOpsIntegrationInput {
  code: string;
  state: string;
  organizationName: string;
}
export interface BitbucketDataCenterIntegrationInput {
  targetUrl: string;
  code: string;
  state: string;
}
export type ProviderInput =
  | {
      github: GitHubIntegrationInput;
      gitlab?: never;
      bitbucket?: never;
      confluence?: never;
      azureDevOps?: never;
      bitbucketDataCenter?: never;
    }
  | {
      github?: never;
      gitlab: GitLabIntegrationInput;
      bitbucket?: never;
      confluence?: never;
      azureDevOps?: never;
      bitbucketDataCenter?: never;
    }
  | {
      github?: never;
      gitlab?: never;
      bitbucket: BitbucketIntegrationInput;
      confluence?: never;
      azureDevOps?: never;
      bitbucketDataCenter?: never;
    }
  | {
      github?: never;
      gitlab?: never;
      bitbucket?: never;
      confluence: ConfluenceIntegrationInput;
      azureDevOps?: never;
      bitbucketDataCenter?: never;
    }
  | {
      github?: never;
      gitlab?: never;
      bitbucket?: never;
      confluence?: never;
      azureDevOps: AzureDevOpsIntegrationInput;
      bitbucketDataCenter?: never;
    }
  | {
      github?: never;
      gitlab?: never;
      bitbucket?: never;
      confluence?: never;
      azureDevOps?: never;
      bitbucketDataCenter: BitbucketDataCenterIntegrationInput;
    };
export type PrivateConnectionName = string;
export interface CreateIntegrationInput {
  provider: Provider;
  input: ProviderInput;
  integrationDisplayName: string;
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
  privateConnectionName?: string;
}
export type IntegrationId = string;
export interface CreateIntegrationOutput {
  integrationId: string;
}
export type MembershipId = string;
export type MembershipType = "USER" | (string & {});
export type UserRole = "MEMBER" | (string & {});
export interface UserConfig {
  role?: UserRole;
}
export type MembershipConfig = { user: UserConfig };
export interface CreateMembershipRequest {
  applicationId: string;
  agentSpaceId: string;
  membershipId: string;
  memberType: MembershipType;
  config?: MembershipConfig;
}
export interface CreateMembershipResponse {}
export interface CreatePentestInput {
  title: string;
  agentSpaceId: string;
  assets?: Assets;
  excludeRiskTypes?: RiskType[];
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  vpcConfig?: VpcConfig;
  networkTrafficConfig?: NetworkTrafficConfig;
  codeRemediationStrategy?: CodeRemediationStrategy;
  disableManagedSkills?: SkillType[];
  maxTaskHours?: number;
  reportDestination?: ReportDestination;
  reportFilters?: ReportFilters;
  cicdConfiguration?: CiCdConfiguration;
}
export interface CreatePentestOutput {
  pentestId?: string;
  title?: string;
  createdAt?: Date;
  updatedAt?: Date;
  assets?: Assets;
  excludeRiskTypes?: RiskType[];
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  agentSpaceId?: string;
  reportDestination?: ReportDestination;
  reportFilters?: ReportFilters;
  cicdConfiguration?: CiCdConfiguration;
}
export type HostAddress = string;
export type PrivateConnectionVpcId = string;
export type PrivateConnectionSubnetId = string;
export type PrivateConnectionSubnetIds = string[];
export type PrivateConnectionSecurityGroupId = string;
export type PrivateConnectionSecurityGroupIds = string[];
export type IpAddressType = "IPV4" | "IPV6" | "DUAL_STACK" | (string & {});
export type MaxIpv4AddressesPerEni = number;
export type PortRange = string;
export type PortRanges = string[];
export type CertificateChain = string | redacted.Redacted<string>;
export type ResourceConfigDnsResolution = "PUBLIC" | "IN_VPC" | (string & {});
export interface ServiceManagedInput {
  hostAddress: string;
  vpcId: string;
  subnetIds: string[];
  securityGroupIds?: string[];
  ipAddressType?: IpAddressType;
  ipv4AddressesPerEni?: number;
  portRanges?: string[];
  certificate?: string | redacted.Redacted<string>;
  dnsResolution?: ResourceConfigDnsResolution;
}
export type ResourceConfigurationId = string;
export interface SelfManagedInput {
  resourceConfigurationId: string;
  certificate?: string | redacted.Redacted<string>;
}
export type PrivateConnectionMode =
  | { serviceManaged: ServiceManagedInput; selfManaged?: never }
  | { serviceManaged?: never; selfManaged: SelfManagedInput };
export interface CreatePrivateConnectionInput {
  privateConnectionName: string;
  mode: PrivateConnectionMode;
  tags?: { [key: string]: string | undefined };
}
export type PrivateConnectionType = "SERVICE_MANAGED" | "SELF_MANAGED" | (string & {});
export type PrivateConnectionStatus =
  | "ACTIVE"
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "DELETE_IN_PROGRESS"
  | "DELETE_FAILED"
  | (string & {});
export type ResourceGatewayId = string;
export interface CreatePrivateConnectionOutput {
  name: string;
  type: PrivateConnectionType;
  status: PrivateConnectionStatus;
  resourceGatewayId?: string;
  hostAddress?: string;
  vpcId?: string;
  resourceConfigurationId?: string;
  certificateExpiryTime?: Date;
  dnsResolution?: ResourceConfigDnsResolution;
  failureMessage?: string;
  tags?: { [key: string]: string | undefined };
}
export type SecurityRequirementPackName = string;
export type SecurityRequirementPackStatus = "ENABLED" | "DISABLED" | (string & {});
export interface CreateSecurityRequirementPackInput {
  name: string;
  description?: string;
  status?: SecurityRequirementPackStatus;
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateSecurityRequirementPackOutput {
  packId: string;
  status: SecurityRequirementPackStatus;
  kmsKeyId?: string;
}
export interface CreateTargetDomainInput {
  targetDomainName: string;
  verificationMethod: DomainVerificationMethod;
  tags?: { [key: string]: string | undefined };
}
export interface CreateTargetDomainOutput {
  targetDomainId: string;
  domainName: string;
  verificationStatus: TargetDomainStatus;
  verificationStatusReason?: string;
  verificationDetails?: VerificationDetails;
  createdAt?: Date;
  verifiedAt?: Date;
}
export interface CreateThreatInput {
  agentSpaceId: string;
  threatJobId: string;
  title?: string;
  statement?: string;
  severity?: ThreatSeverity;
  comments?: string;
  stride?: StrideCategory[];
  threatSource?: string;
  prerequisites?: string;
  threatAction?: string;
  threatImpact?: string;
  impactedGoal?: string[];
  impactedAssets?: string[];
  anchor?: ThreatAnchorShape;
  evidence?: ThreatEvidenceShape[];
  recommendation?: string;
}
export interface CreateThreatOutput {
  threatId: string;
  threatJobId: string;
  title?: string;
  statement?: string;
  severity?: ThreatSeverity;
  status?: ThreatStatus;
  comments?: string;
  stride?: StrideCategory[];
  threatSource?: string;
  prerequisites?: string;
  threatAction?: string;
  threatImpact?: string;
  impactedGoal?: string[];
  impactedAssets?: string[];
  anchor?: ThreatAnchorShape;
  evidence?: ThreatEvidenceShape[];
  recommendation?: string;
  createdBy?: ThreatActor;
  updatedBy?: ThreatActor;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface CreateThreatModelInput {
  title: string;
  agentSpaceId: string;
  description?: string;
  assets?: Assets;
  scopeDocs?: DocumentInfo[];
  serviceRole: string;
  logConfig?: CloudWatchLog;
  reportDestination?: ReportDestination;
}
export interface CreateThreatModelOutput {
  threatModelId: string;
  title?: string;
  agentSpaceId?: string;
  description?: string;
  assets?: Assets;
  scopeDocs?: DocumentInfo[];
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  createdAt?: Date;
  updatedAt?: Date;
  reportDestination?: ReportDestination;
}
export interface DeleteAgentSpaceInput {
  agentSpaceId: string;
}
export interface DeleteAgentSpaceOutput {
  agentSpaceId?: string;
}
export interface DeleteApplicationRequest {
  applicationId: string;
}
export interface DeleteApplicationResponse {}
export interface DeleteArtifactInput {
  agentSpaceId: string;
  artifactId: string;
}
export interface DeleteArtifactOutput {}
export interface DeleteIntegrationInput {
  integrationId: string;
}
export interface DeleteIntegrationOutput {}
export interface DeleteMembershipRequest {
  applicationId: string;
  agentSpaceId: string;
  membershipId: string;
  memberType?: MembershipType;
}
export interface DeleteMembershipResponse {}
export interface DeletePrivateConnectionInput {
  privateConnectionName: string;
}
export interface DeletePrivateConnectionOutput {
  name: string;
  type: PrivateConnectionType;
  status: PrivateConnectionStatus;
  resourceGatewayId?: string;
  hostAddress?: string;
  vpcId?: string;
  resourceConfigurationId?: string;
  certificateExpiryTime?: Date;
  dnsResolution?: ResourceConfigDnsResolution;
  failureMessage?: string;
  tags?: { [key: string]: string | undefined };
}
export interface DeleteSecurityRequirementPackInput {
  packId: string;
}
export interface DeleteSecurityRequirementPackOutput {}
export interface DeleteTargetDomainInput {
  targetDomainId: string;
}
export interface DeleteTargetDomainOutput {
  targetDomainId?: string;
}
export interface DescribePrivateConnectionInput {
  privateConnectionName: string;
}
export interface DescribePrivateConnectionOutput {
  name: string;
  type: PrivateConnectionType;
  status: PrivateConnectionStatus;
  resourceGatewayId?: string;
  hostAddress?: string;
  vpcId?: string;
  resourceConfigurationId?: string;
  certificateExpiryTime?: Date;
  dnsResolution?: ResourceConfigDnsResolution;
  failureMessage?: string;
  tags?: { [key: string]: string | undefined };
}
export interface GetApplicationRequest {
  applicationId: string;
}
export type ApplicationDomain = string;
export type IdCApplicationArn = string;
export interface IdCConfiguration {
  idcApplicationArn?: string;
  idcInstanceArn?: string;
}
export interface GetApplicationResponse {
  applicationId: string;
  domain: string;
  applicationName?: string;
  idcConfiguration?: IdCConfiguration;
  roleArn?: string;
  defaultKmsKeyId?: string;
}
export interface GetArtifactInput {
  agentSpaceId: string;
  artifactId: string;
}
export interface Artifact {
  contents: string;
  type: ArtifactType;
}
export interface GetArtifactOutput {
  agentSpaceId: string;
  artifactId: string;
  artifact: Artifact;
  fileName: string;
  updatedAt: Date;
}
export interface GetIntegrationInput {
  integrationId: string;
}
export type ProviderType = "SOURCE_CODE" | "DOCUMENTATION" | (string & {});
export interface GetIntegrationOutput {
  integrationId: string;
  installationId: string;
  provider: Provider;
  providerType: ProviderType;
  displayName?: string;
  kmsKeyId?: string;
  targetUrl?: string;
  webhookUrl?: string;
  privateConnectionName?: string;
}
export interface GetSecurityRequirementPackInput {
  packId: string;
}
export type ManagementType = "AWS_MANAGED" | "CUSTOMER_MANAGED" | (string & {});
export type SecurityRequirementPackImportStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export interface GetSecurityRequirementPackOutput {
  packId: string;
  name: string;
  description?: string;
  vendorName?: string;
  managementType: ManagementType;
  status: SecurityRequirementPackStatus;
  importStatus?: SecurityRequirementPackImportStatus;
  createdAt: Date;
  updatedAt: Date;
  kmsKeyId?: string;
}
export type SecurityRequirementArtifactName = string;
export type SecurityRequirementArtifactFormat =
  | "MD"
  | "PDF"
  | "TXT"
  | "DOCX"
  | "DOC"
  | (string & {});
export type SecurityRequirementDocumentContent = Uint8Array | redacted.Redacted<Uint8Array>;
export interface SecurityRequirementArtifact {
  name: string;
  format: SecurityRequirementArtifactFormat;
  content: Uint8Array | redacted.Redacted<Uint8Array>;
}
export type SecurityRequirementArtifactList = SecurityRequirementArtifact[];
export type ImportSource = { documents: SecurityRequirementArtifact[] };
export interface ImportSecurityRequirementsInput {
  packId: string;
  input: ImportSource;
}
export interface ImportSecurityRequirementsOutput {
  packId: string;
  importStatus: SecurityRequirementPackImportStatus;
}
export type ClientId = string;
export type ClientSecret = string | redacted.Redacted<string>;
export interface InitiateProviderRegistrationInput {
  provider: Provider;
  targetUrl?: string;
  organizationName?: string;
  clientId?: string;
  clientSecret?: string | redacted.Redacted<string>;
}
export type Location = string;
export interface InitiateProviderRegistrationOutput {
  redirectTo: string;
  csrfState: string;
}
export type MaxResults = number;
export type NextToken = string;
export interface ListActorMessagesInput {
  maxResults?: number;
  nextToken?: string;
  agentSpaceId: string;
  pentestId: string;
  actorIdentifier: string;
}
export type SensitiveMessageSender = string | redacted.Redacted<string>;
export type SensitiveMessageSubject = string | redacted.Redacted<string>;
export type SensitiveMessageBody = string | redacted.Redacted<string>;
export interface ActorMessage {
  sender?: string | redacted.Redacted<string>;
  subject?: string | redacted.Redacted<string>;
  body?: string | redacted.Redacted<string>;
  receivedAt?: Date;
}
export type ActorMessageList = ActorMessage[];
export interface ListActorMessagesOutput {
  messages?: ActorMessage[];
  nextToken?: string;
}
export interface ListAgentSpacesInput {
  nextToken?: string;
  maxResults?: number;
}
export interface AgentSpaceSummary {
  agentSpaceId: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export type AgentSpaceSummaryList = AgentSpaceSummary[];
export interface ListAgentSpacesOutput {
  agentSpaceSummaries?: AgentSpaceSummary[];
  nextToken?: string;
}
export interface ListApplicationsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface ApplicationSummary {
  applicationId: string;
  applicationName: string;
  domain: string;
  defaultKmsKeyId?: string;
}
export type ApplicationSummaryList = ApplicationSummary[];
export interface ListApplicationsResponse {
  applicationSummaries: ApplicationSummary[];
  nextToken?: string;
}
export interface ListArtifactsInput {
  agentSpaceId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ArtifactSummary {
  artifactId: string;
  fileName: string;
  artifactType: ArtifactType;
}
export type ArtifactSummaryList = ArtifactSummary[];
export interface ListArtifactsOutput {
  artifactSummaries: ArtifactSummary[];
  nextToken?: string;
}
export interface ListCodeReviewJobsForCodeReviewInput {
  maxResults?: number;
  codeReviewId: string;
  agentSpaceId: string;
  nextToken?: string;
}
export interface CodeReviewJobSummary {
  codeReviewJobId: string;
  codeReviewId: string;
  title?: string;
  status?: JobStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
export type CodeReviewJobSummaryList = CodeReviewJobSummary[];
export interface ListCodeReviewJobsForCodeReviewOutput {
  codeReviewJobSummaries?: CodeReviewJobSummary[];
  nextToken?: string;
}
export interface ListCodeReviewJobTasksInput {
  agentSpaceId: string;
  maxResults?: number;
  codeReviewJobId?: string;
  stepName?: StepName;
  categoryName?: string;
  nextToken?: string;
}
export interface CodeReviewJobTaskSummary {
  taskId: string;
  codeReviewId?: string;
  codeReviewJobId?: string;
  agentSpaceId?: string;
  title?: string;
  riskType?: RiskType;
  executionStatus?: TaskExecutionStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
export type CodeReviewJobTaskSummaryList = CodeReviewJobTaskSummary[];
export interface ListCodeReviewJobTasksOutput {
  codeReviewJobTaskSummaries?: CodeReviewJobTaskSummary[];
  nextToken?: string;
}
export interface ListCodeReviewsInput {
  maxResults?: number;
  nextToken?: string;
  agentSpaceId: string;
}
export interface CodeReviewSummary {
  codeReviewId: string;
  agentSpaceId: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export type CodeReviewSummaryList = CodeReviewSummary[];
export interface ListCodeReviewsOutput {
  codeReviewSummaries?: CodeReviewSummary[];
  nextToken?: string;
}
export interface ListDiscoveredEndpointsInput {
  maxResults?: number;
  pentestJobId: string;
  agentSpaceId: string;
  prefix?: string;
  nextToken?: string;
}
export interface DiscoveredEndpoint {
  uri: string;
  pentestJobId: string;
  taskId: string;
  agentSpaceId: string;
  evidence?: string;
  operation?: string;
  description?: string;
}
export type DiscoveredEndpointList = DiscoveredEndpoint[];
export interface ListDiscoveredEndpointsOutput {
  discoveredEndpoints?: DiscoveredEndpoint[];
  nextToken?: string;
}
export interface ListFindingsInput {
  maxResults?: number;
  pentestJobId?: string;
  codeReviewJobId?: string;
  agentSpaceId: string;
  nextToken?: string;
  riskType?: string;
  riskLevel?: RiskLevel;
  status?: FindingStatus;
  confidence?: ConfidenceLevel;
  name?: string;
}
export interface FindingSummary {
  findingId: string;
  agentSpaceId: string;
  pentestId?: string;
  pentestJobId?: string;
  codeReviewId?: string;
  codeReviewJobId?: string;
  name?: string;
  status?: FindingStatus;
  riskType?: string;
  riskLevel?: RiskLevel;
  confidence?: ConfidenceLevel;
  validationStatus?: ValidationStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
export type FindingSummaryList = FindingSummary[];
export interface ListFindingsOutput {
  findingsSummaries?: FindingSummary[];
  nextToken?: string;
}
export type ResourceType = "CODE_REPOSITORY" | "DOCUMENT" | (string & {});
export interface ListIntegratedResourcesInput {
  agentSpaceId: string;
  integrationId?: string;
  resourceType?: ResourceType;
  nextToken?: string;
  maxResults?: number;
}
export type ProviderResourceName = string;
export type ProviderResourceId = string;
export type GitHubOwner = string;
export type AccessType = "PRIVATE" | "PUBLIC" | (string & {});
export interface GitHubRepositoryMetadata {
  name: string;
  providerResourceId: string;
  owner: string;
  accessType?: AccessType;
}
export type GitLabNamespace = string;
export interface GitLabRepositoryMetadata {
  name: string;
  providerResourceId: string;
  namespace: string;
  accessType?: AccessType;
}
export interface BitbucketRepositoryMetadata {
  name: string;
  providerResourceId: string;
  workspace: string;
  accessType?: AccessType;
}
export interface ConfluenceDocumentMetadata {
  name: string;
  providerResourceId: string;
  spaceKey: string;
  pageId: string;
  title?: string;
  spaceTitle?: string;
}
export type AzureDevOpsOrganization = string;
export interface AzureDevOpsRepositoryMetadata {
  name: string;
  providerResourceId: string;
  organization: string;
  project?: string;
  projectId?: string;
  accessType?: AccessType;
}
export type IntegratedResourceMetadata =
  | {
      githubRepository: GitHubRepositoryMetadata;
      gitlabRepository?: never;
      bitbucketRepository?: never;
      confluenceDocument?: never;
      azureDevOpsRepository?: never;
    }
  | {
      githubRepository?: never;
      gitlabRepository: GitLabRepositoryMetadata;
      bitbucketRepository?: never;
      confluenceDocument?: never;
      azureDevOpsRepository?: never;
    }
  | {
      githubRepository?: never;
      gitlabRepository?: never;
      bitbucketRepository: BitbucketRepositoryMetadata;
      confluenceDocument?: never;
      azureDevOpsRepository?: never;
    }
  | {
      githubRepository?: never;
      gitlabRepository?: never;
      bitbucketRepository?: never;
      confluenceDocument: ConfluenceDocumentMetadata;
      azureDevOpsRepository?: never;
    }
  | {
      githubRepository?: never;
      gitlabRepository?: never;
      bitbucketRepository?: never;
      confluenceDocument?: never;
      azureDevOpsRepository: AzureDevOpsRepositoryMetadata;
    };
export type TriggerEvent =
  | "PULL_REQUEST_READY_FOR_REVIEW"
  | "PULL_REQUEST_DRAFT"
  | "PULL_REQUEST_LABEL_ADDED"
  | (string & {});
export type TriggerEventList = TriggerEvent[];
export type TriggerFilterType = "TARGET_BRANCH" | "LABEL" | (string & {});
export type TriggerRegexPattern = string;
export type TriggerRegexPatternList = string[];
export type TriggerFilterMatchMode = "INCLUDE" | "EXCLUDE" | (string & {});
export interface TriggerFilter {
  type: TriggerFilterType;
  patterns: string[];
  matchMode?: TriggerFilterMatchMode;
}
export type TriggerFilterList = TriggerFilter[];
export interface TriggerFilterGroup {
  events?: TriggerEvent[];
  filters?: TriggerFilter[];
}
export type TriggerFilterGroups = TriggerFilterGroup[];
export interface GitHubResourceCapabilities {
  triggerFilterGroups?: TriggerFilterGroup[];
  leaveComments?: boolean;
  remediateCode?: boolean;
}
export interface GitLabResourceCapabilities {
  triggerFilterGroups?: TriggerFilterGroup[];
  leaveComments?: boolean;
  remediateCode?: boolean;
}
export interface BitbucketResourceCapabilities {
  triggerFilterGroups?: TriggerFilterGroup[];
  leaveComments?: boolean;
  remediateCode?: boolean;
}
export interface ConfluenceResourceCapabilities {
  fetchDocument?: boolean;
  createDocument?: boolean;
  updateDocument?: boolean;
}
export interface AzureDevOpsResourceCapabilities {
  triggerFilterGroups?: TriggerFilterGroup[];
  leaveComments?: boolean;
  remediateCode?: boolean;
}
export type ProviderResourceCapabilities =
  | {
      github: GitHubResourceCapabilities;
      gitlab?: never;
      bitbucket?: never;
      confluence?: never;
      azureDevOps?: never;
    }
  | {
      github?: never;
      gitlab: GitLabResourceCapabilities;
      bitbucket?: never;
      confluence?: never;
      azureDevOps?: never;
    }
  | {
      github?: never;
      gitlab?: never;
      bitbucket: BitbucketResourceCapabilities;
      confluence?: never;
      azureDevOps?: never;
    }
  | {
      github?: never;
      gitlab?: never;
      bitbucket?: never;
      confluence: ConfluenceResourceCapabilities;
      azureDevOps?: never;
    }
  | {
      github?: never;
      gitlab?: never;
      bitbucket?: never;
      confluence?: never;
      azureDevOps: AzureDevOpsResourceCapabilities;
    };
export interface IntegratedResourceSummary {
  integrationId: string;
  resource: IntegratedResourceMetadata;
  capabilities?: ProviderResourceCapabilities;
}
export type IntegratedResourceSummaryList = IntegratedResourceSummary[];
export interface ListIntegratedResourcesOutput {
  integratedResourceSummaries: IntegratedResourceSummary[];
  nextToken?: string;
}
export type IntegrationFilter =
  | { provider: Provider; providerType?: never }
  | { provider?: never; providerType: ProviderType };
export interface ListIntegrationsInput {
  filter?: IntegrationFilter;
  nextToken?: string;
  maxResults?: number;
}
export interface IntegrationSummary {
  integrationId: string;
  installationId: string;
  provider: Provider;
  providerType: ProviderType;
  displayName: string;
  targetUrl?: string;
  webhookUrl?: string;
  privateConnectionName?: string;
}
export type IntegrationSummaryList = IntegrationSummary[];
export interface ListIntegrationsOutput {
  integrationSummaries: IntegrationSummary[];
  nextToken?: string;
}
export type MembershipTypeFilter = "USER" | "ALL" | (string & {});
export interface ListMembershipsRequest {
  applicationId: string;
  agentSpaceId: string;
  memberType?: MembershipTypeFilter;
  maxResults?: number;
  nextToken?: string;
}
export type SensitiveEmail = string;
export interface UserMetadata {
  username: string;
  email: string;
}
export type MemberMetadata = { user: UserMetadata };
export interface MembershipSummary {
  membershipId: string;
  applicationId: string;
  agentSpaceId: string;
  memberType: MembershipType;
  config?: MembershipConfig;
  metadata?: MemberMetadata;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
export type MembershipSummaryList = MembershipSummary[];
export interface ListMembershipsResponse {
  membershipSummaries: MembershipSummary[];
  nextToken?: string;
}
export interface ListPentestJobsForPentestInput {
  maxResults?: number;
  pentestId: string;
  agentSpaceId: string;
  nextToken?: string;
  jobType?: JobType;
}
export interface PentestJobSummary {
  pentestJobId: string;
  pentestId: string;
  title?: string;
  status?: JobStatus;
  createdAt?: Date;
  updatedAt?: Date;
  jobType?: JobType;
  reportUrl?: string;
}
export type PentestJobSummaryList = PentestJobSummary[];
export interface ListPentestJobsForPentestOutput {
  pentestJobSummaries?: PentestJobSummary[];
  nextToken?: string;
}
export interface ListPentestJobTasksInput {
  agentSpaceId: string;
  maxResults?: number;
  pentestJobId?: string;
  stepName?: StepName;
  categoryName?: string;
  nextToken?: string;
}
export interface TaskSummary {
  taskId: string;
  pentestId?: string;
  pentestJobId?: string;
  agentSpaceId?: string;
  title?: string;
  riskType?: RiskType;
  executionStatus?: TaskExecutionStatus;
  taskHours?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export type TaskSummaryList = TaskSummary[];
export interface ListPentestJobTasksOutput {
  taskSummaries?: TaskSummary[];
  nextToken?: string;
}
export interface ListPentestsInput {
  maxResults?: number;
  nextToken?: string;
  agentSpaceId: string;
}
export interface PentestSummary {
  pentestId: string;
  agentSpaceId: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export type PentestSummaryList = PentestSummary[];
export interface ListPentestsOutput {
  pentestSummaries?: PentestSummary[];
  nextToken?: string;
}
export interface ListPrivateConnectionsInput {
  maxResults?: number;
  nextToken?: string;
}
export interface PrivateConnectionSummary {
  name: string;
  type: PrivateConnectionType;
  status: PrivateConnectionStatus;
  resourceGatewayId?: string;
  hostAddress?: string;
  vpcId?: string;
  resourceConfigurationId?: string;
  certificateExpiryTime?: Date;
  dnsResolution?: ResourceConfigDnsResolution;
  failureMessage?: string;
  tags?: { [key: string]: string | undefined };
}
export type PrivateConnectionList = PrivateConnectionSummary[];
export interface ListPrivateConnectionsOutput {
  privateConnections: PrivateConnectionSummary[];
  nextToken?: string;
}
export interface ListSecurityRequirementPackFilter {
  managementType?: ManagementType;
  status?: SecurityRequirementPackStatus;
}
export interface ListSecurityRequirementPacksInput {
  filter?: ListSecurityRequirementPackFilter;
  nextToken?: string;
  maxResults?: number;
}
export interface SecurityRequirementPackSummary {
  packId: string;
  name: string;
  description?: string;
  vendorName?: string;
  managementType: ManagementType;
  status: SecurityRequirementPackStatus;
  createdAt: Date;
  updatedAt: Date;
}
export type SecurityRequirementPackSummaryList = SecurityRequirementPackSummary[];
export interface ListSecurityRequirementPacksOutput {
  securityRequirementPackSummaries: SecurityRequirementPackSummary[];
  nextToken?: string;
}
export interface ListSecurityRequirementsInput {
  packId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface SecurityRequirementSummary {
  packId: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
export type SecurityRequirementSummaryList = SecurityRequirementSummary[];
export interface ListSecurityRequirementsOutput {
  securityRequirementSummaries: SecurityRequirementSummary[];
  nextToken?: string;
}
export type ResourceArn = string;
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export interface ListTagsForResourceOutput {
  tags?: { [key: string]: string | undefined };
}
export interface ListTargetDomainsInput {
  nextToken?: string;
  maxResults?: number;
}
export interface TargetDomainSummary {
  targetDomainId: string;
  domainName: string;
  verificationStatus?: TargetDomainStatus;
}
export type TargetDomainSummaryList = TargetDomainSummary[];
export interface ListTargetDomainsOutput {
  targetDomainSummaries?: TargetDomainSummary[];
  nextToken?: string;
}
export interface ListThreatModelJobsInput {
  maxResults?: number;
  threatModelId: string;
  agentSpaceId: string;
  nextToken?: string;
}
export interface ThreatModelJobSummary {
  threatModelJobId: string;
  threatModelId: string;
  agentSpaceId?: string;
  title?: string;
  status?: JobStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
export type ThreatModelJobSummaryList = ThreatModelJobSummary[];
export interface ListThreatModelJobsOutput {
  threatModelJobSummaries?: ThreatModelJobSummary[];
  nextToken?: string;
}
export interface ListThreatModelJobTasksInput {
  agentSpaceId: string;
  maxResults?: number;
  threatModelJobId: string;
  nextToken?: string;
}
export interface ThreatModelJobTaskSummary {
  taskId: string;
  threatModelId?: string;
  threatModelJobId?: string;
  agentSpaceId?: string;
  title?: string;
  executionStatus?: TaskExecutionStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
export type ThreatModelJobTaskSummaryList = ThreatModelJobTaskSummary[];
export interface ListThreatModelJobTasksOutput {
  threatModelJobTaskSummaries?: ThreatModelJobTaskSummary[];
  nextToken?: string;
}
export interface ListThreatModelsInput {
  maxResults?: number;
  nextToken?: string;
  agentSpaceId: string;
}
export interface ThreatModelSummary {
  threatModelId: string;
  agentSpaceId: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export type ThreatModelSummaryList = ThreatModelSummary[];
export interface ListThreatModelsOutput {
  threatModelSummaries?: ThreatModelSummary[];
  nextToken?: string;
}
export interface ListThreatsInput {
  threatJobId: string;
  agentSpaceId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ThreatSummary {
  threatId?: string;
  threatJobId?: string;
  title?: string;
  statement?: string;
  severity?: ThreatSeverity;
  status?: ThreatStatus;
  stride?: StrideCategory[];
  createdBy?: ThreatActor;
  updatedBy?: ThreatActor;
  createdAt?: Date;
  updatedAt?: Date;
}
export type ThreatSummaryList = ThreatSummary[];
export interface ListThreatsOutput {
  threats?: ThreatSummary[];
  nextToken?: string;
}
export interface StartCodeRemediationInput {
  agentSpaceId: string;
  pentestJobId?: string;
  codeReviewJobId?: string;
  findingIds: string[];
}
export interface StartCodeRemediationOutput {}
export type DiffSource = { s3Uri: string };
export interface StartCodeReviewJobInput {
  agentSpaceId: string;
  codeReviewId: string;
  diffSource?: DiffSource;
}
export interface StartCodeReviewJobOutput {
  title?: string;
  status?: JobStatus;
  createdAt?: Date;
  updatedAt?: Date;
  codeReviewId: string;
  codeReviewJobId: string;
  agentSpaceId?: string;
}
export interface StartPentestJobInput {
  agentSpaceId: string;
  pentestId: string;
  jobType?: JobType;
  selectedFindingIds?: string[];
  scopeChanges?: ScopeChange[];
}
export interface StartPentestJobOutput {
  title?: string;
  status?: JobStatus;
  createdAt?: Date;
  updatedAt?: Date;
  pentestId?: string;
  pentestJobId?: string;
  agentSpaceId?: string;
}
export interface StartThreatModelJobInput {
  agentSpaceId: string;
  threatModelId: string;
}
export interface StartThreatModelJobOutput {
  title?: string;
  status?: JobStatus;
  createdAt?: Date;
  updatedAt?: Date;
  threatModelId?: string;
  threatModelJobId: string;
  agentSpaceId?: string;
}
export interface StopCodeReviewJobInput {
  agentSpaceId: string;
  codeReviewJobId: string;
}
export interface StopCodeReviewJobOutput {}
export interface StopPentestJobInput {
  agentSpaceId: string;
  pentestJobId: string;
}
export interface StopPentestJobOutput {}
export interface StopThreatModelJobInput {
  agentSpaceId: string;
  threatModelJobId: string;
}
export interface StopThreatModelJobOutput {}
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceOutput {}
export type TagKeyList = string[];
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceOutput {}
export interface UpdateAgentSpaceInput {
  agentSpaceId: string;
  name?: string;
  description?: string;
  awsResources?: AWSResources;
  targetDomainIds?: string[];
  codeReviewSettings?: CodeReviewSettings;
}
export interface UpdateAgentSpaceOutput {
  agentSpaceId: string;
  name: string;
  description?: string;
  awsResources?: AWSResources;
  targetDomainIds?: string[];
  codeReviewSettings?: CodeReviewSettings;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface UpdateApplicationRequest {
  applicationId: string;
  roleArn?: string;
  defaultKmsKeyId?: string;
}
export interface UpdateApplicationResponse {
  applicationId: string;
}
export interface UpdateCodeReviewInput {
  codeReviewId: string;
  agentSpaceId: string;
  title?: string;
  assets?: Assets;
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  codeRemediationStrategy?: CodeRemediationStrategy;
  validationMode?: ValidationMode;
  maxTaskHours?: number;
  reportDestination?: ReportDestination;
  reportFilters?: ReportFilters;
}
export interface UpdateCodeReviewOutput {
  codeReviewId: string;
  title?: string;
  createdAt?: Date;
  updatedAt?: Date;
  assets?: Assets;
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  agentSpaceId?: string;
  codeRemediationStrategy?: CodeRemediationStrategy;
  validationMode?: ValidationMode;
  maxTaskHours?: number;
  reportDestination?: ReportDestination;
  reportFilters?: ReportFilters;
}
export interface UpdateFindingInput {
  findingId: string;
  agentSpaceId: string;
  name?: string;
  description?: string;
  riskType?: string;
  riskLevel?: RiskLevel;
  riskScore?: string;
  attackScript?: string;
  reasoning?: string;
  status?: FindingStatus;
  customerNote?: string;
}
export interface UpdateFindingOutput {}
export interface GitHubRepositoryResource {
  name: string;
  owner: string;
}
export interface GitLabRepositoryResource {
  name: string;
  namespace: string;
}
export interface BitbucketRepositoryResource {
  name: string;
  workspace: string;
}
export interface ConfluenceDocumentResource {
  name: string;
  spaceKey: string;
  pageId: string;
  title?: string;
  spaceTitle?: string;
}
export interface AzureDevOpsRepositoryResource {
  name: string;
  organization: string;
  project?: string;
}
export type IntegratedResource =
  | {
      githubRepository: GitHubRepositoryResource;
      gitlabRepository?: never;
      bitbucketRepository?: never;
      confluenceDocument?: never;
      azureDevOpsRepository?: never;
    }
  | {
      githubRepository?: never;
      gitlabRepository: GitLabRepositoryResource;
      bitbucketRepository?: never;
      confluenceDocument?: never;
      azureDevOpsRepository?: never;
    }
  | {
      githubRepository?: never;
      gitlabRepository?: never;
      bitbucketRepository: BitbucketRepositoryResource;
      confluenceDocument?: never;
      azureDevOpsRepository?: never;
    }
  | {
      githubRepository?: never;
      gitlabRepository?: never;
      bitbucketRepository?: never;
      confluenceDocument: ConfluenceDocumentResource;
      azureDevOpsRepository?: never;
    }
  | {
      githubRepository?: never;
      gitlabRepository?: never;
      bitbucketRepository?: never;
      confluenceDocument?: never;
      azureDevOpsRepository: AzureDevOpsRepositoryResource;
    };
export interface IntegratedResourceInputItem {
  resource: IntegratedResource;
  capabilities?: ProviderResourceCapabilities;
}
export type IntegratedResourceInputItemList = IntegratedResourceInputItem[];
export interface UpdateIntegratedResourcesInput {
  agentSpaceId: string;
  integrationId: string;
  items: IntegratedResourceInputItem[];
}
export interface UpdateIntegratedResourcesOutput {}
export type WebhookAction = "CREATE_IF_ABSENT" | "ROTATE" | (string & {});
export interface UpdateIntegrationInput {
  integrationId: string;
  webhookAction: WebhookAction;
}
export type WebhookSecret = string | redacted.Redacted<string>;
export interface UpdateIntegrationOutput {
  integrationId: string;
  webhookUrl?: string;
  secret?: string | redacted.Redacted<string>;
}
export interface UpdatePentestInput {
  pentestId: string;
  agentSpaceId: string;
  title?: string;
  assets?: Assets;
  excludeRiskTypes?: RiskType[];
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  vpcConfig?: VpcConfig;
  networkTrafficConfig?: NetworkTrafficConfig;
  codeRemediationStrategy?: CodeRemediationStrategy;
  disableManagedSkills?: SkillType[];
  maxTaskHours?: number;
  reportDestination?: ReportDestination;
  reportFilters?: ReportFilters;
  cicdConfiguration?: CiCdConfiguration;
}
export interface UpdatePentestOutput {
  pentestId?: string;
  title?: string;
  createdAt?: Date;
  updatedAt?: Date;
  assets?: Assets;
  excludeRiskTypes?: RiskType[];
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  agentSpaceId?: string;
  reportDestination?: ReportDestination;
  reportFilters?: ReportFilters;
  cicdConfiguration?: CiCdConfiguration;
}
export interface UpdatePrivateConnectionCertificateInput {
  privateConnectionName: string;
  certificate: string | redacted.Redacted<string>;
}
export interface UpdatePrivateConnectionCertificateOutput {
  name: string;
  type: PrivateConnectionType;
  status: PrivateConnectionStatus;
  resourceGatewayId?: string;
  hostAddress?: string;
  vpcId?: string;
  resourceConfigurationId?: string;
  certificateExpiryTime?: Date;
  dnsResolution?: ResourceConfigDnsResolution;
  failureMessage?: string;
  tags?: { [key: string]: string | undefined };
}
export interface UpdateSecurityRequirementPackInput {
  packId: string;
  name?: string;
  description?: string;
  status?: SecurityRequirementPackStatus;
}
export interface UpdateSecurityRequirementPackOutput {
  packId: string;
  name?: string;
  description?: string;
  status?: SecurityRequirementPackStatus;
}
export interface UpdateTargetDomainInput {
  targetDomainId: string;
  verificationMethod: DomainVerificationMethod;
}
export interface UpdateTargetDomainOutput {
  targetDomainId: string;
  domainName: string;
  verificationStatus: TargetDomainStatus;
  verificationStatusReason?: string;
  verificationDetails?: VerificationDetails;
  createdAt?: Date;
  verifiedAt?: Date;
}
export interface UpdateThreatInput {
  threatId: string;
  agentSpaceId: string;
  title?: string;
  status?: ThreatStatus;
  comments?: string;
  statement?: string;
  severity?: ThreatSeverity;
  threatSource?: string;
  prerequisites?: string;
  threatAction?: string;
  threatImpact?: string;
  impactedGoal?: string[];
  impactedAssets?: string[];
  anchor?: ThreatAnchorShape;
  evidence?: ThreatEvidenceShape[];
  recommendation?: string;
}
export interface UpdateThreatOutput {
  threatId: string;
  threatJobId: string;
  title?: string;
  statement?: string;
  severity?: ThreatSeverity;
  status?: ThreatStatus;
  comments?: string;
  stride?: StrideCategory[];
  threatSource?: string;
  prerequisites?: string;
  threatAction?: string;
  threatImpact?: string;
  impactedGoal?: string[];
  impactedAssets?: string[];
  anchor?: ThreatAnchorShape;
  evidence?: ThreatEvidenceShape[];
  recommendation?: string;
  createdBy?: ThreatActor;
  updatedBy?: ThreatActor;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface UpdateThreatModelInput {
  threatModelId: string;
  agentSpaceId: string;
  title?: string;
  description?: string;
  assets?: Assets;
  scopeDocs?: DocumentInfo[];
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  reportDestination?: ReportDestination;
}
export interface UpdateThreatModelOutput {
  threatModelId: string;
  title?: string;
  agentSpaceId?: string;
  description?: string;
  assets?: Assets;
  scopeDocs?: DocumentInfo[];
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  createdAt?: Date;
  updatedAt?: Date;
  reportDestination?: ReportDestination;
}
export interface VerifyTargetDomainInput {
  targetDomainId: string;
}
export interface VerifyTargetDomainOutput {
  targetDomainId?: string;
  domainName?: string;
  createdAt?: Date;
  updatedAt?: Date;
  verifiedAt?: Date;
  status?: TargetDomainStatus;
  verificationStatusReason?: string;
}
export interface ValidationExceptionField {
  path: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type AddArtifactError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Uploads an artifact to an agent space. Artifacts provide additional context for security testing, such as architecture diagrams, API specifications, or configuration files.
 */
export const addArtifact: API.OperationMethod<
  AddArtifactInput,
  AddArtifactOutput,
  AddArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1472, __c92, 0) as any as S.Schema<AddArtifactInput>,
  output: __S(1473, __c92, 1) as any as S.Schema<AddArtifactOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddArtifact",
}));

export type BatchCreateSecurityRequirementsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Batch creates security requirements in a customer managed pack.
 */
export const batchCreateSecurityRequirements: API.OperationMethod<
  BatchCreateSecurityRequirementsInput,
  BatchCreateSecurityRequirementsOutput,
  BatchCreateSecurityRequirementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1666, __c104, 2) as any as S.Schema<BatchCreateSecurityRequirementsInput>,
  output: __S(1698, __c106, 2) as any as S.Schema<BatchCreateSecurityRequirementsOutput>,
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
  operationName: "BatchCreateSecurityRequirements",
}));

export type BatchDeleteCodeReviewsError = CommonErrors;
/**
 * Deletes one or more code reviews from an agent space.
 */
export const batchDeleteCodeReviews: API.OperationMethod<
  BatchDeleteCodeReviewsInput,
  BatchDeleteCodeReviewsOutput,
  BatchDeleteCodeReviewsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1872, __c117, 0) as any as S.Schema<BatchDeleteCodeReviewsInput>,
  output: __S(1875, __c117, 3) as any as S.Schema<BatchDeleteCodeReviewsOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteCodeReviews",
}));

export type BatchDeletePentestsError = CommonErrors;
/**
 * Deletes one or more pentests from an agent space.
 */
export const batchDeletePentests: API.OperationMethod<
  BatchDeletePentestsInput,
  BatchDeletePentestsOutput,
  BatchDeletePentestsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<BatchDeletePentestsInput>,
  output: __S(3, __c0, 3) as any as S.Schema<BatchDeletePentestsOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeletePentests",
}));

export type BatchDeleteSecurityRequirementsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Batch deletes security requirements from a customer managed pack.
 */
export const batchDeleteSecurityRequirements: API.OperationMethod<
  BatchDeleteSecurityRequirementsInput,
  BatchDeleteSecurityRequirementsOutput,
  BatchDeleteSecurityRequirementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<BatchDeleteSecurityRequirementsInput>,
  output: __S(193, __c12, 1) as any as S.Schema<BatchDeleteSecurityRequirementsOutput>,
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
  operationName: "BatchDeleteSecurityRequirements",
}));

export type BatchDeleteThreatModelsError = CommonErrors;
/**
 * Deletes one or more threat models from an agent space.
 */
export const batchDeleteThreatModels: API.OperationMethod<
  BatchDeleteThreatModelsInput,
  BatchDeleteThreatModelsOutput,
  BatchDeleteThreatModelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<BatchDeleteThreatModelsInput>,
  output: __S(211, __c13, 3) as any as S.Schema<BatchDeleteThreatModelsOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteThreatModels",
}));

export type BatchGetAgentSpacesError = CommonErrors;
/**
 * Retrieves information about one or more agent spaces.
 */
export const batchGetAgentSpaces: API.OperationMethod<
  BatchGetAgentSpacesInput,
  BatchGetAgentSpacesOutput,
  BatchGetAgentSpacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<BatchGetAgentSpacesInput>,
  output: __S(226, __c14, 2) as any as S.Schema<BatchGetAgentSpacesOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetAgentSpaces",
}));

export type BatchGetArtifactMetadataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves metadata for one or more artifacts in an agent space.
 */
export const batchGetArtifactMetadata: API.OperationMethod<
  BatchGetArtifactMetadataInput,
  BatchGetArtifactMetadataOutput,
  BatchGetArtifactMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<BatchGetArtifactMetadataInput>,
  output: __S(275, __c17, 3) as any as S.Schema<BatchGetArtifactMetadataOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetArtifactMetadata",
}));

export type BatchGetCodeReviewJobsError = CommonErrors;
/**
 * Retrieves information about one or more code review jobs in an agent space.
 */
export const batchGetCodeReviewJobs: API.OperationMethod<
  BatchGetCodeReviewJobsInput,
  BatchGetCodeReviewJobsOutput,
  BatchGetCodeReviewJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<BatchGetCodeReviewJobsInput>,
  output: __S(291, __c18, 3) as any as S.Schema<BatchGetCodeReviewJobsOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetCodeReviewJobs",
}));

export type BatchGetCodeReviewJobTasksError = CommonErrors;
/**
 * Retrieves information about one or more tasks within a code review job.
 */
export const batchGetCodeReviewJobTasks: API.OperationMethod<
  BatchGetCodeReviewJobTasksInput,
  BatchGetCodeReviewJobTasksOutput,
  BatchGetCodeReviewJobTasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<BatchGetCodeReviewJobTasksInput>,
  output: __S(339, __c21, 3) as any as S.Schema<BatchGetCodeReviewJobTasksOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetCodeReviewJobTasks",
}));

export type BatchGetCodeReviewsError = CommonErrors;
/**
 * Retrieves information about one or more code reviews in an agent space.
 */
export const batchGetCodeReviews: API.OperationMethod<
  BatchGetCodeReviewsInput,
  BatchGetCodeReviewsOutput,
  BatchGetCodeReviewsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<BatchGetCodeReviewsInput>,
  output: __S(387, __c24, 3) as any as S.Schema<BatchGetCodeReviewsOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetCodeReviews",
}));

export type BatchGetFindingsError = CommonErrors;
/**
 * Retrieves information about one or more security findings in an agent space.
 */
export const batchGetFindings: API.OperationMethod<
  BatchGetFindingsInput,
  BatchGetFindingsOutput,
  BatchGetFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<BatchGetFindingsInput>,
  output: __S(409, __c25, 9) as any as S.Schema<BatchGetFindingsOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetFindings",
}));

export type BatchGetPentestJobsError = CommonErrors;
/**
 * Retrieves information about one or more pentest jobs in an agent space.
 */
export const batchGetPentestJobs: API.OperationMethod<
  BatchGetPentestJobsInput,
  BatchGetPentestJobsOutput,
  BatchGetPentestJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<BatchGetPentestJobsInput>,
  output: __S(420, __c26, 4) as any as S.Schema<BatchGetPentestJobsOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetPentestJobs",
}));

export type BatchGetPentestJobTasksError = CommonErrors;
/**
 * Retrieves information about one or more tasks within a pentest job.
 */
export const batchGetPentestJobTasks: API.OperationMethod<
  BatchGetPentestJobTasksInput,
  BatchGetPentestJobTasksOutput,
  BatchGetPentestJobTasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<BatchGetPentestJobTasksInput>,
  output: __S(451, __c28, 3) as any as S.Schema<BatchGetPentestJobTasksOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetPentestJobTasks",
}));

export type BatchGetPentestsError = CommonErrors;
/**
 * Retrieves information about one or more pentests in an agent space.
 */
export const batchGetPentests: API.OperationMethod<
  BatchGetPentestsInput,
  BatchGetPentestsOutput,
  BatchGetPentestsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<BatchGetPentestsInput>,
  output: __S(465, __c29, 1) as any as S.Schema<BatchGetPentestsOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetPentests",
}));

export type BatchGetSecurityRequirementsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Batch retrieves security requirements from a pack.
 */
export const batchGetSecurityRequirements: API.OperationMethod<
  BatchGetSecurityRequirementsInput,
  BatchGetSecurityRequirementsOutput,
  BatchGetSecurityRequirementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<BatchGetSecurityRequirementsInput>,
  output: __S(1698, __c106, 2) as any as S.Schema<BatchGetSecurityRequirementsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetSecurityRequirements",
}));

export type BatchGetTargetDomainsError = CommonErrors;
/**
 * Retrieves information about one or more target domains.
 */
export const batchGetTargetDomains: API.OperationMethod<
  BatchGetTargetDomainsInput,
  BatchGetTargetDomainsOutput,
  BatchGetTargetDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<BatchGetTargetDomainsInput>,
  output: __S(499, __c31, 3) as any as S.Schema<BatchGetTargetDomainsOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetTargetDomains",
}));

export type BatchGetThreatModelJobsError = CommonErrors;
/**
 * Retrieves information about one or more threat model jobs in an agent space.
 */
export const batchGetThreatModelJobs: API.OperationMethod<
  BatchGetThreatModelJobsInput,
  BatchGetThreatModelJobsOutput,
  BatchGetThreatModelJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<BatchGetThreatModelJobsInput>,
  output: __S(531, __c33, 3) as any as S.Schema<BatchGetThreatModelJobsOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetThreatModelJobs",
}));

export type BatchGetThreatModelJobTasksError = CommonErrors;
/**
 * Retrieves information about one or more tasks within a threat model job.
 */
export const batchGetThreatModelJobTasks: API.OperationMethod<
  BatchGetThreatModelJobTasksInput,
  BatchGetThreatModelJobTasksOutput,
  BatchGetThreatModelJobTasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<BatchGetThreatModelJobTasksInput>,
  output: __S(547, __c34, 3) as any as S.Schema<BatchGetThreatModelJobTasksOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetThreatModelJobTasks",
}));

export type BatchGetThreatModelsError = CommonErrors;
/**
 * Retrieves information about one or more threat models in an agent space.
 */
export const batchGetThreatModels: API.OperationMethod<
  BatchGetThreatModelsInput,
  BatchGetThreatModelsOutput,
  BatchGetThreatModelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<BatchGetThreatModelsInput>,
  output: __S(563, __c35, 3) as any as S.Schema<BatchGetThreatModelsOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetThreatModels",
}));

export type BatchGetThreatsError = CommonErrors;
/**
 * Retrieves information about one or more threats.
 */
export const batchGetThreats: API.OperationMethod<
  BatchGetThreatsInput,
  BatchGetThreatsOutput,
  BatchGetThreatsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<BatchGetThreatsInput>,
  output: __S(579, __c36, 3) as any as S.Schema<BatchGetThreatsOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetThreats",
}));

export type BatchUpdateSecurityRequirementsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Batch updates security requirements within a customer managed pack.
 */
export const batchUpdateSecurityRequirements: API.OperationMethod<
  BatchUpdateSecurityRequirementsInput,
  BatchUpdateSecurityRequirementsOutput,
  BatchUpdateSecurityRequirementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(610, __c38, 2) as any as S.Schema<BatchUpdateSecurityRequirementsInput>,
  output: __S(611, __c38, 3) as any as S.Schema<BatchUpdateSecurityRequirementsOutput>,
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
  operationName: "BatchUpdateSecurityRequirements",
}));

export type CreateAgentSpaceError = CommonErrors;
/**
 * Creates a new agent space. An agent space is a dedicated workspace for securing a specific application.
 */
export const createAgentSpace: API.OperationMethod<
  CreateAgentSpaceInput,
  CreateAgentSpaceOutput,
  CreateAgentSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<CreateAgentSpaceInput>,
  output: __S(240, __c15, 0) as any as S.Schema<CreateAgentSpaceOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAgentSpace",
}));

export type CreateApplicationError = CommonErrors;
/**
 * Creates a new application. An application is the top-level organizational unit that supports IAM Identity Center integration.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  CreateApplicationResponse,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<CreateApplicationRequest>,
  output: __S(672, __c42, 0) as any as S.Schema<CreateApplicationResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
}));

export type CreateCodeReviewError = CommonErrors;
/**
 * Creates a new code review configuration in an agent space. A code review defines the parameters for automated security-focused code analysis.
 */
export const createCodeReview: API.OperationMethod<
  CreateCodeReviewInput,
  CreateCodeReviewOutput,
  CreateCodeReviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<CreateCodeReviewInput>,
  output: __S(704, __c44, 0) as any as S.Schema<CreateCodeReviewOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCodeReview",
}));

export type CreateIntegrationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new integration with a third-party provider, such as GitHub, for code review and remediation.
 */
export const createIntegration: API.OperationMethod<
  CreateIntegrationInput,
  CreateIntegrationOutput,
  CreateIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(727, __c45, 7) as any as S.Schema<CreateIntegrationInput>,
  output: __S(728, __c45, 8) as any as S.Schema<CreateIntegrationOutput>,
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
  operationName: "CreateIntegration",
}));

export type CreateMembershipError = CommonErrors;
/**
 * Creates a new membership, granting a user access to an agent space within an application.
 */
export const createMembership: API.OperationMethod<
  CreateMembershipRequest,
  CreateMembershipResponse,
  CreateMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<CreateMembershipRequest>,
  output: __S(752, __c47, 0) as any as S.Schema<CreateMembershipResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMembership",
}));

export type CreatePentestError = CommonErrors;
/**
 * Creates a new pentest configuration in an agent space. A pentest defines the security test parameters, including target assets, risk type exclusions, and logging configuration.
 */
export const createPentest: API.OperationMethod<
  CreatePentestInput,
  CreatePentestOutput,
  CreatePentestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(784, __c49, 0) as any as S.Schema<CreatePentestInput>,
  output: __S(800, __c50, 0) as any as S.Schema<CreatePentestOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePentest",
}));

export type CreatePrivateConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a private connection for reaching a self-hosted provider instance over private networking using Amazon VPC Lattice.
 */
export const createPrivateConnection: API.OperationMethod<
  CreatePrivateConnectionInput,
  CreatePrivateConnectionOutput,
  CreatePrivateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(819, __c51, 3) as any as S.Schema<CreatePrivateConnectionInput>,
  output: __S(832, __c52, 0) as any as S.Schema<CreatePrivateConnectionOutput>,
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
  operationName: "CreatePrivateConnection",
}));

export type CreateSecurityRequirementPackError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a customer managed security requirement pack.
 */
export const createSecurityRequirementPack: API.OperationMethod<
  CreateSecurityRequirementPackInput,
  CreateSecurityRequirementPackOutput,
  CreateSecurityRequirementPackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(848, __c53, 0) as any as S.Schema<CreateSecurityRequirementPackInput>,
  output: __S(849, __c53, 1) as any as S.Schema<CreateSecurityRequirementPackOutput>,
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
  operationName: "CreateSecurityRequirementPack",
}));

export type CreateTargetDomainError = CommonErrors;
/**
 * Creates a new target domain for penetration testing. A target domain is a web domain that must be registered and verified before it can be tested.
 */
export const createTargetDomain: API.OperationMethod<
  CreateTargetDomainInput,
  CreateTargetDomainOutput,
  CreateTargetDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c54, 0) as any as S.Schema<CreateTargetDomainInput>,
  output: __S(880, __c55, 0) as any as S.Schema<CreateTargetDomainOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTargetDomain",
}));

export type CreateThreatError = CommonErrors;
/**
 * Creates a new threat under a threat model job.
 */
export const createThreat: API.OperationMethod<
  CreateThreatInput,
  CreateThreatOutput,
  CreateThreatError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c56, 0) as any as S.Schema<CreateThreatInput>,
  output: __S(912, __c57, 0) as any as S.Schema<CreateThreatOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateThreat",
}));

export type CreateThreatModelError = CommonErrors;
/**
 * Creates a new threat model configuration in an agent space. A threat model defines the parameters for automated threat analysis.
 */
export const createThreatModel: API.OperationMethod<
  CreateThreatModelInput,
  CreateThreatModelOutput,
  CreateThreatModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c58, 0) as any as S.Schema<CreateThreatModelInput>,
  output: __S(944, __c59, 0) as any as S.Schema<CreateThreatModelOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateThreatModel",
}));

export type DeleteAgentSpaceError = CommonErrors;
/**
 * Deletes an agent space and all of its associated resources, including pentests, findings, and artifacts.
 */
export const deleteAgentSpace: API.OperationMethod<
  DeleteAgentSpaceInput,
  DeleteAgentSpaceOutput,
  DeleteAgentSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c60, 0) as any as S.Schema<DeleteAgentSpaceInput>,
  output: __S(961, __c60, 1) as any as S.Schema<DeleteAgentSpaceOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAgentSpace",
}));

export type DeleteApplicationError = CommonErrors;
/**
 * Deletes an application and its associated configuration, including IAM Identity Center settings.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(976, __c61, 0) as any as S.Schema<DeleteApplicationRequest>,
  output: __S(752, __c47, 0) as any as S.Schema<DeleteApplicationResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
}));

export type DeleteArtifactError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an artifact from an agent space.
 */
export const deleteArtifact: API.OperationMethod<
  DeleteArtifactInput,
  DeleteArtifactOutput,
  DeleteArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c62, 0) as any as S.Schema<DeleteArtifactInput>,
  output: __S(752, __c47, 0) as any as S.Schema<DeleteArtifactOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteArtifact",
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
 * Deletes an integration with a third-party provider.
 */
export const deleteIntegration: API.OperationMethod<
  DeleteIntegrationInput,
  DeleteIntegrationOutput,
  DeleteIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1008, __c63, 0) as any as S.Schema<DeleteIntegrationInput>,
  output: __S(752, __c47, 0) as any as S.Schema<DeleteIntegrationOutput>,
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
}));

export type DeleteMembershipError = CommonErrors;
/**
 * Deletes a membership, revoking a user's access to an agent space.
 */
export const deleteMembership: API.OperationMethod<
  DeleteMembershipRequest,
  DeleteMembershipResponse,
  DeleteMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c64, 0) as any as S.Schema<DeleteMembershipRequest>,
  output: __S(752, __c47, 0) as any as S.Schema<DeleteMembershipResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMembership",
}));

export type DeletePrivateConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a private connection.
 */
export const deletePrivateConnection: API.OperationMethod<
  DeletePrivateConnectionInput,
  DeletePrivateConnectionOutput,
  DeletePrivateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1040, __c65, 0) as any as S.Schema<DeletePrivateConnectionInput>,
  output: __S(832, __c52, 0) as any as S.Schema<DeletePrivateConnectionOutput>,
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
  operationName: "DeletePrivateConnection",
}));

export type DeleteSecurityRequirementPackError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a customer managed security requirement pack and all its associated security requirements.
 */
export const deleteSecurityRequirementPack: API.OperationMethod<
  DeleteSecurityRequirementPackInput,
  DeleteSecurityRequirementPackOutput,
  DeleteSecurityRequirementPackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c66, 0) as any as S.Schema<DeleteSecurityRequirementPackInput>,
  output: __S(752, __c47, 0) as any as S.Schema<DeleteSecurityRequirementPackOutput>,
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
  operationName: "DeleteSecurityRequirementPack",
}));

export type DeleteTargetDomainError = CommonErrors;
/**
 * Deletes a target domain registration. After deletion, the domain can no longer be used for penetration testing.
 */
export const deleteTargetDomain: API.OperationMethod<
  DeleteTargetDomainInput,
  DeleteTargetDomainOutput,
  DeleteTargetDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1072, __c67, 0) as any as S.Schema<DeleteTargetDomainInput>,
  output: __S(1073, __c67, 1) as any as S.Schema<DeleteTargetDomainOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTargetDomain",
}));

export type DescribePrivateConnectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a private connection.
 */
export const describePrivateConnection: API.OperationMethod<
  DescribePrivateConnectionInput,
  DescribePrivateConnectionOutput,
  DescribePrivateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c68, 0) as any as S.Schema<DescribePrivateConnectionInput>,
  output: __S(832, __c52, 0) as any as S.Schema<DescribePrivateConnectionOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePrivateConnection",
}));

export type GetApplicationError = CommonErrors;
/**
 * Retrieves information about an application.
 */
export const getApplication: API.OperationMethod<
  GetApplicationRequest,
  GetApplicationResponse,
  GetApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1104, __c69, 0) as any as S.Schema<GetApplicationRequest>,
  output: __S(1106, __c69, 2) as any as S.Schema<GetApplicationResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplication",
}));

export type GetArtifactError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves an artifact from an agent space.
 */
export const getArtifact: API.OperationMethod<
  GetArtifactInput,
  GetArtifactOutput,
  GetArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c70, 0) as any as S.Schema<GetArtifactInput>,
  output: __S(1122, __c70, 2) as any as S.Schema<GetArtifactOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetArtifact",
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
  GetIntegrationInput,
  GetIntegrationOutput,
  GetIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1136, __c71, 0) as any as S.Schema<GetIntegrationInput>,
  output: __S(1137, __c71, 1) as any as S.Schema<GetIntegrationOutput>,
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
}));

export type GetSecurityRequirementPackError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a security requirement pack.
 */
export const getSecurityRequirementPack: API.OperationMethod<
  GetSecurityRequirementPackInput,
  GetSecurityRequirementPackOutput,
  GetSecurityRequirementPackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c72, 0) as any as S.Schema<GetSecurityRequirementPackInput>,
  output: __S(1153, __c72, 1) as any as S.Schema<GetSecurityRequirementPackOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSecurityRequirementPack",
}));

export type ImportSecurityRequirementsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Imports security requirements from uploaded documents into a customer managed security requirement pack. The import process asynchronously extracts and generates structured security requirements from the provided source files.
 */
export const importSecurityRequirements: API.OperationMethod<
  ImportSecurityRequirementsInput,
  ImportSecurityRequirementsOutput,
  ImportSecurityRequirementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1171, __c73, 3) as any as S.Schema<ImportSecurityRequirementsInput>,
  output: __S(1172, __c73, 4) as any as S.Schema<ImportSecurityRequirementsOutput>,
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
  operationName: "ImportSecurityRequirements",
}));

export type InitiateProviderRegistrationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates the OAuth registration flow with a third-party provider. Returns a redirect URL and CSRF state token for completing the authorization.
 */
export const initiateProviderRegistration: API.OperationMethod<
  InitiateProviderRegistrationInput,
  InitiateProviderRegistrationOutput,
  InitiateProviderRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c74, 0) as any as S.Schema<InitiateProviderRegistrationInput>,
  output: __S(1185, __c74, 1) as any as S.Schema<InitiateProviderRegistrationOutput>,
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
  operationName: "InitiateProviderRegistration",
}));

export type ListActorMessagesError = CommonErrors;
/**
 * Returns a paginated list of the email MFA messages received for an actor at its server-generated email address, most recent first.
 */
export const listActorMessages: API.PaginatedOperationMethod<
  ListActorMessagesInput,
  ListActorMessagesOutput,
  ListActorMessagesError,
  Credentials | HttpClient.HttpClient,
  ActorMessage
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1200, __c75, 0) as any as S.Schema<ListActorMessagesInput>,
  output: __S(1203, __c75, 3) as any as S.Schema<ListActorMessagesOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListActorMessages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "messages",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAgentSpacesError = CommonErrors;
/**
 * Returns a paginated list of agent space summaries in your account.
 */
export const listAgentSpaces: API.PaginatedOperationMethod<
  ListAgentSpacesInput,
  ListAgentSpacesOutput,
  ListAgentSpacesError,
  Credentials | HttpClient.HttpClient,
  AgentSpaceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1216, __c76, 0) as any as S.Schema<ListAgentSpacesInput>,
  output: __S(1219, __c76, 3) as any as S.Schema<ListAgentSpacesOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgentSpaces",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "agentSpaceSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListApplicationsError = CommonErrors;
/**
 * Returns a paginated list of application summaries in your account.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsRequest,
  ListApplicationsResponse,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  ApplicationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1232, __c77, 0) as any as S.Schema<ListApplicationsRequest>,
  output: __S(1235, __c77, 3) as any as S.Schema<ListApplicationsResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "applicationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListArtifactsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of artifact summaries for the specified agent space.
 */
export const listArtifacts: API.PaginatedOperationMethod<
  ListArtifactsInput,
  ListArtifactsOutput,
  ListArtifactsError,
  Credentials | HttpClient.HttpClient,
  ArtifactSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1248, __c78, 0) as any as S.Schema<ListArtifactsInput>,
  output: __S(1251, __c78, 3) as any as S.Schema<ListArtifactsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListArtifacts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "artifactSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCodeReviewJobsForCodeReviewError = CommonErrors;
/**
 * Returns a paginated list of code review job summaries for the specified code review configuration.
 */
export const listCodeReviewJobsForCodeReview: API.PaginatedOperationMethod<
  ListCodeReviewJobsForCodeReviewInput,
  ListCodeReviewJobsForCodeReviewOutput,
  ListCodeReviewJobsForCodeReviewError,
  Credentials | HttpClient.HttpClient,
  CodeReviewJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1264, __c79, 0) as any as S.Schema<ListCodeReviewJobsForCodeReviewInput>,
  output: __S(1267, __c79, 3) as any as S.Schema<ListCodeReviewJobsForCodeReviewOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCodeReviewJobsForCodeReview",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "codeReviewJobSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCodeReviewJobTasksError = CommonErrors;
/**
 * Returns a paginated list of task summaries for the specified code review job, optionally filtered by step name or category.
 */
export const listCodeReviewJobTasks: API.PaginatedOperationMethod<
  ListCodeReviewJobTasksInput,
  ListCodeReviewJobTasksOutput,
  ListCodeReviewJobTasksError,
  Credentials | HttpClient.HttpClient,
  CodeReviewJobTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1296, __c81, 0) as any as S.Schema<ListCodeReviewJobTasksInput>,
  output: __S(1299, __c81, 3) as any as S.Schema<ListCodeReviewJobTasksOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCodeReviewJobTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "codeReviewJobTaskSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCodeReviewsError = CommonErrors;
/**
 * Returns a paginated list of code review summaries for the specified agent space.
 */
export const listCodeReviews: API.PaginatedOperationMethod<
  ListCodeReviewsInput,
  ListCodeReviewsOutput,
  ListCodeReviewsError,
  Credentials | HttpClient.HttpClient,
  CodeReviewSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1312, __c82, 0) as any as S.Schema<ListCodeReviewsInput>,
  output: __S(1315, __c82, 3) as any as S.Schema<ListCodeReviewsOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCodeReviews",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "codeReviewSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDiscoveredEndpointsError = CommonErrors;
/**
 * Returns a paginated list of endpoints discovered during a pentest job execution.
 */
export const listDiscoveredEndpoints: API.PaginatedOperationMethod<
  ListDiscoveredEndpointsInput,
  ListDiscoveredEndpointsOutput,
  ListDiscoveredEndpointsError,
  Credentials | HttpClient.HttpClient,
  DiscoveredEndpoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1328, __c83, 0) as any as S.Schema<ListDiscoveredEndpointsInput>,
  output: __S(1331, __c83, 3) as any as S.Schema<ListDiscoveredEndpointsOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDiscoveredEndpoints",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "discoveredEndpoints",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFindingsError = CommonErrors;
/**
 * Lists the security findings for a pentest job.
 */
export const listFindings: API.PaginatedOperationMethod<
  ListFindingsInput,
  ListFindingsOutput,
  ListFindingsError,
  Credentials | HttpClient.HttpClient,
  FindingSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1344, __c84, 0) as any as S.Schema<ListFindingsInput>,
  output: __S(1347, __c84, 3) as any as S.Schema<ListFindingsOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFindings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "findingsSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIntegratedResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the integrated resources for an agent space, optionally filtered by integration or resource type.
 */
export const listIntegratedResources: API.PaginatedOperationMethod<
  ListIntegratedResourcesInput,
  ListIntegratedResourcesOutput,
  ListIntegratedResourcesError,
  Credentials | HttpClient.HttpClient,
  IntegratedResourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1360, __c85, 0) as any as S.Schema<ListIntegratedResourcesInput>,
  output: __S(1369, __c85, 9) as any as S.Schema<ListIntegratedResourcesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIntegratedResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "integratedResourceSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIntegrationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the integrations in your account, optionally filtered by provider or provider type.
 */
export const listIntegrations: API.PaginatedOperationMethod<
  ListIntegrationsInput,
  ListIntegrationsOutput,
  ListIntegrationsError,
  Credentials | HttpClient.HttpClient,
  IntegrationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1393, __c87, 1) as any as S.Schema<ListIntegrationsInput>,
  output: __S(1396, __c87, 4) as any as S.Schema<ListIntegrationsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIntegrations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "integrationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMembershipsError = CommonErrors;
/**
 * Returns a paginated list of membership summaries for the specified agent space within an application.
 */
export const listMemberships: API.PaginatedOperationMethod<
  ListMembershipsRequest,
  ListMembershipsResponse,
  ListMembershipsError,
  Credentials | HttpClient.HttpClient,
  MembershipSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1408, __c88, 0) as any as S.Schema<ListMembershipsRequest>,
  output: __S(1413, __c88, 5) as any as S.Schema<ListMembershipsResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMemberships",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "membershipSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPentestJobsForPentestError = CommonErrors;
/**
 * Returns a paginated list of pentest job summaries for the specified pentest configuration.
 */
export const listPentestJobsForPentest: API.PaginatedOperationMethod<
  ListPentestJobsForPentestInput,
  ListPentestJobsForPentestOutput,
  ListPentestJobsForPentestError,
  Credentials | HttpClient.HttpClient,
  PentestJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1424, __c89, 0) as any as S.Schema<ListPentestJobsForPentestInput>,
  output: __S(1427, __c89, 3) as any as S.Schema<ListPentestJobsForPentestOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPentestJobsForPentest",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "pentestJobSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPentestJobTasksError = CommonErrors;
/**
 * Returns a paginated list of task summaries for the specified pentest job, optionally filtered by step name or category.
 */
export const listPentestJobTasks: API.PaginatedOperationMethod<
  ListPentestJobTasksInput,
  ListPentestJobTasksOutput,
  ListPentestJobTasksError,
  Credentials | HttpClient.HttpClient,
  TaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1440, __c90, 0) as any as S.Schema<ListPentestJobTasksInput>,
  output: __S(1443, __c90, 3) as any as S.Schema<ListPentestJobTasksOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPentestJobTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "taskSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPentestsError = CommonErrors;
/**
 * Returns a paginated list of pentest summaries for the specified agent space.
 */
export const listPentests: API.PaginatedOperationMethod<
  ListPentestsInput,
  ListPentestsOutput,
  ListPentestsError,
  Credentials | HttpClient.HttpClient,
  PentestSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1456, __c91, 0) as any as S.Schema<ListPentestsInput>,
  output: __S(1459, __c91, 3) as any as S.Schema<ListPentestsOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPentests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "pentestSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPrivateConnectionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the private connections in your account.
 */
export const listPrivateConnections: API.PaginatedOperationMethod<
  ListPrivateConnectionsInput,
  ListPrivateConnectionsOutput,
  ListPrivateConnectionsError,
  Credentials | HttpClient.HttpClient,
  PrivateConnectionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1504, __c94, 0) as any as S.Schema<ListPrivateConnectionsInput>,
  output: __S(1506, __c94, 2) as any as S.Schema<ListPrivateConnectionsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPrivateConnections",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "privateConnections",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSecurityRequirementPacksError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all security requirement packs in the caller's account.
 */
export const listSecurityRequirementPacks: API.PaginatedOperationMethod<
  ListSecurityRequirementPacksInput,
  ListSecurityRequirementPacksOutput,
  ListSecurityRequirementPacksError,
  Credentials | HttpClient.HttpClient,
  SecurityRequirementPackSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1521, __c95, 1) as any as S.Schema<ListSecurityRequirementPacksInput>,
  output: __S(1524, __c95, 4) as any as S.Schema<ListSecurityRequirementPacksOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSecurityRequirementPacks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "securityRequirementPackSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSecurityRequirementsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists security requirements within a pack.
 */
export const listSecurityRequirements: API.PaginatedOperationMethod<
  ListSecurityRequirementsInput,
  ListSecurityRequirementsOutput,
  ListSecurityRequirementsError,
  Credentials | HttpClient.HttpClient,
  SecurityRequirementSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1536, __c96, 0) as any as S.Schema<ListSecurityRequirementsInput>,
  output: __S(1539, __c96, 3) as any as S.Schema<ListSecurityRequirementsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSecurityRequirements",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "securityRequirementSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = CommonErrors;
/**
 * Returns the tags associated with the specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1552, __c97, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(1553, __c97, 1) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListTargetDomainsError = CommonErrors;
/**
 * Returns a paginated list of target domain summaries in your account.
 */
export const listTargetDomains: API.PaginatedOperationMethod<
  ListTargetDomainsInput,
  ListTargetDomainsOutput,
  ListTargetDomainsError,
  Credentials | HttpClient.HttpClient,
  TargetDomainSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1568, __c98, 0) as any as S.Schema<ListTargetDomainsInput>,
  output: __S(1571, __c98, 3) as any as S.Schema<ListTargetDomainsOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTargetDomains",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "targetDomainSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListThreatModelJobsError = CommonErrors;
/**
 * Returns a paginated list of threat model job summaries for the specified threat model.
 */
export const listThreatModelJobs: API.PaginatedOperationMethod<
  ListThreatModelJobsInput,
  ListThreatModelJobsOutput,
  ListThreatModelJobsError,
  Credentials | HttpClient.HttpClient,
  ThreatModelJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1584, __c99, 0) as any as S.Schema<ListThreatModelJobsInput>,
  output: __S(1587, __c99, 3) as any as S.Schema<ListThreatModelJobsOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThreatModelJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "threatModelJobSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListThreatModelJobTasksError = CommonErrors;
/**
 * Returns a paginated list of task summaries for the specified threat model job.
 */
export const listThreatModelJobTasks: API.PaginatedOperationMethod<
  ListThreatModelJobTasksInput,
  ListThreatModelJobTasksOutput,
  ListThreatModelJobTasksError,
  Credentials | HttpClient.HttpClient,
  ThreatModelJobTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1600, __c100, 0) as any as S.Schema<ListThreatModelJobTasksInput>,
  output: __S(1603, __c100, 3) as any as S.Schema<ListThreatModelJobTasksOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThreatModelJobTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "threatModelJobTaskSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListThreatModelsError = CommonErrors;
/**
 * Returns a paginated list of threat model summaries for the specified agent space.
 */
export const listThreatModels: API.PaginatedOperationMethod<
  ListThreatModelsInput,
  ListThreatModelsOutput,
  ListThreatModelsError,
  Credentials | HttpClient.HttpClient,
  ThreatModelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1616, __c101, 0) as any as S.Schema<ListThreatModelsInput>,
  output: __S(1619, __c101, 3) as any as S.Schema<ListThreatModelsOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThreatModels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "threatModelSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListThreatsError = CommonErrors;
/**
 * Returns a paginated list of threats for a threat model job.
 */
export const listThreats: API.PaginatedOperationMethod<
  ListThreatsInput,
  ListThreatsOutput,
  ListThreatsError,
  Credentials | HttpClient.HttpClient,
  ThreatSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1632, __c102, 0) as any as S.Schema<ListThreatsInput>,
  output: __S(1635, __c102, 3) as any as S.Schema<ListThreatsOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThreats",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "threats",
    pageSize: "maxResults",
  } as const,
})) as any;

export type StartCodeRemediationError = CommonErrors;
/**
 * Initiates code remediation for one or more security findings. This creates pull requests in integrated repositories to fix the identified vulnerabilities.
 */
export const startCodeRemediation: API.OperationMethod<
  StartCodeRemediationInput,
  StartCodeRemediationOutput,
  StartCodeRemediationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1648, __c103, 0) as any as S.Schema<StartCodeRemediationInput>,
  output: __S(752, __c47, 0) as any as S.Schema<StartCodeRemediationOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCodeRemediation",
}));

export type StartCodeReviewJobError = CommonErrors;
/**
 * Starts a new code review job for a code review configuration. The job executes the security-focused code analysis defined in the code review.
 */
export const startCodeReviewJob: API.OperationMethod<
  StartCodeReviewJobInput,
  StartCodeReviewJobOutput,
  StartCodeReviewJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1713, __c107, 1) as any as S.Schema<StartCodeReviewJobInput>,
  output: __S(1714, __c107, 2) as any as S.Schema<StartCodeReviewJobOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCodeReviewJob",
}));

export type StartPentestJobError = CommonErrors;
/**
 * Starts a new pentest job for a pentest configuration. The job executes the security tests defined in the pentest.
 */
export const startPentestJob: API.OperationMethod<
  StartPentestJobInput,
  StartPentestJobOutput,
  StartPentestJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1728, __c108, 0) as any as S.Schema<StartPentestJobInput>,
  output: __S(1729, __c108, 1) as any as S.Schema<StartPentestJobOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartPentestJob",
}));

export type StartThreatModelJobError = CommonErrors;
/**
 * Starts a new threat model job for a threat model configuration.
 */
export const startThreatModelJob: API.OperationMethod<
  StartThreatModelJobInput,
  StartThreatModelJobOutput,
  StartThreatModelJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1744, __c109, 0) as any as S.Schema<StartThreatModelJobInput>,
  output: __S(1745, __c109, 1) as any as S.Schema<StartThreatModelJobOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartThreatModelJob",
}));

export type StopCodeReviewJobError = CommonErrors;
/**
 * Stops a running code review job. The job transitions to a stopping state and then to stopped after cleanup completes.
 */
export const stopCodeReviewJob: API.OperationMethod<
  StopCodeReviewJobInput,
  StopCodeReviewJobOutput,
  StopCodeReviewJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1760, __c110, 0) as any as S.Schema<StopCodeReviewJobInput>,
  output: __S(752, __c47, 0) as any as S.Schema<StopCodeReviewJobOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopCodeReviewJob",
}));

export type StopPentestJobError = CommonErrors;
/**
 * Stops a running pentest job. The job transitions to a stopping state and then to stopped after cleanup completes.
 */
export const stopPentestJob: API.OperationMethod<
  StopPentestJobInput,
  StopPentestJobOutput,
  StopPentestJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1776, __c111, 0) as any as S.Schema<StopPentestJobInput>,
  output: __S(752, __c47, 0) as any as S.Schema<StopPentestJobOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopPentestJob",
}));

export type StopThreatModelJobError = CommonErrors;
/**
 * Stops a running threat model job.
 */
export const stopThreatModelJob: API.OperationMethod<
  StopThreatModelJobInput,
  StopThreatModelJobOutput,
  StopThreatModelJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1792, __c112, 0) as any as S.Schema<StopThreatModelJobInput>,
  output: __S(752, __c47, 0) as any as S.Schema<StopThreatModelJobOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopThreatModelJob",
}));

export type TagResourceError = CommonErrors;
/**
 * Adds tags to a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1808, __c113, 0) as any as S.Schema<TagResourceInput>,
  output: __S(752, __c47, 0) as any as S.Schema<TagResourceOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = CommonErrors;
/**
 * Removes tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1824, __c114, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(752, __c47, 0) as any as S.Schema<UntagResourceOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAgentSpaceError = CommonErrors;
/**
 * Updates the configuration of an existing agent space, including its name, description, AWS resources, target domains, and code review settings.
 */
export const updateAgentSpace: API.OperationMethod<
  UpdateAgentSpaceInput,
  UpdateAgentSpaceOutput,
  UpdateAgentSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1840, __c115, 0) as any as S.Schema<UpdateAgentSpaceInput>,
  output: __S(1841, __c115, 1) as any as S.Schema<UpdateAgentSpaceOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAgentSpace",
}));

export type UpdateApplicationError = CommonErrors;
/**
 * Updates the configuration of an existing application, including the IAM role and default KMS key.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1856, __c116, 0) as any as S.Schema<UpdateApplicationRequest>,
  output: __S(672, __c42, 0) as any as S.Schema<UpdateApplicationResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
}));

export type UpdateCodeReviewError = CommonErrors;
/**
 * Updates an existing code review configuration.
 */
export const updateCodeReview: API.OperationMethod<
  UpdateCodeReviewInput,
  UpdateCodeReviewOutput,
  UpdateCodeReviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1904, __c119, 0) as any as S.Schema<UpdateCodeReviewInput>,
  output: __S(704, __c44, 0) as any as S.Schema<UpdateCodeReviewOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCodeReview",
}));

export type UpdateFindingError = CommonErrors;
/**
 * Updates the status or risk level of a security finding.
 */
export const updateFinding: API.OperationMethod<
  UpdateFindingInput,
  UpdateFindingOutput,
  UpdateFindingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1920, __c120, 0) as any as S.Schema<UpdateFindingInput>,
  output: __S(752, __c47, 0) as any as S.Schema<UpdateFindingOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFinding",
}));

export type UpdateIntegratedResourcesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the integrated resources for an agent space, including their capabilities.
 */
export const updateIntegratedResources: API.OperationMethod<
  UpdateIntegratedResourcesInput,
  UpdateIntegratedResourcesOutput,
  UpdateIntegratedResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1944, __c121, 8) as any as S.Schema<UpdateIntegratedResourcesInput>,
  output: __S(752, __c47, 0) as any as S.Schema<UpdateIntegratedResourcesOutput>,
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
  operationName: "UpdateIntegratedResources",
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
 * Creates an integration's webhook, or rotates the HMAC signing secret of an existing one. The secret is returned only once, in this response, and cannot be retrieved again.
 */
export const updateIntegration: API.OperationMethod<
  UpdateIntegrationInput,
  UpdateIntegrationOutput,
  UpdateIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1952, __c122, 0) as any as S.Schema<UpdateIntegrationInput>,
  output: __S(1953, __c122, 1) as any as S.Schema<UpdateIntegrationOutput>,
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
}));

export type UpdatePentestError = CommonErrors;
/**
 * Updates an existing pentest configuration.
 */
export const updatePentest: API.OperationMethod<
  UpdatePentestInput,
  UpdatePentestOutput,
  UpdatePentestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1968, __c123, 0) as any as S.Schema<UpdatePentestInput>,
  output: __S(800, __c50, 0) as any as S.Schema<UpdatePentestOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePentest",
}));

export type UpdatePrivateConnectionCertificateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the certificate associated with a private connection. Certificates can be added or replaced but not removed.
 */
export const updatePrivateConnectionCertificate: API.OperationMethod<
  UpdatePrivateConnectionCertificateInput,
  UpdatePrivateConnectionCertificateOutput,
  UpdatePrivateConnectionCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1984, __c124, 0) as any as S.Schema<UpdatePrivateConnectionCertificateInput>,
  output: __S(832, __c52, 0) as any as S.Schema<UpdatePrivateConnectionCertificateOutput>,
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
  operationName: "UpdatePrivateConnectionCertificate",
}));

export type UpdateSecurityRequirementPackError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a security requirement pack. For customer managed packs, both metadata and status can be updated. For AWS managed packs, only status can be updated.
 */
export const updateSecurityRequirementPack: API.OperationMethod<
  UpdateSecurityRequirementPackInput,
  UpdateSecurityRequirementPackOutput,
  UpdateSecurityRequirementPackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2000, __c125, 0) as any as S.Schema<UpdateSecurityRequirementPackInput>,
  output: __S(2001, __c125, 1) as any as S.Schema<UpdateSecurityRequirementPackOutput>,
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
  operationName: "UpdateSecurityRequirementPack",
}));

export type UpdateTargetDomainError = CommonErrors;
/**
 * Updates the verification method for a target domain.
 */
export const updateTargetDomain: API.OperationMethod<
  UpdateTargetDomainInput,
  UpdateTargetDomainOutput,
  UpdateTargetDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2016, __c126, 0) as any as S.Schema<UpdateTargetDomainInput>,
  output: __S(880, __c55, 0) as any as S.Schema<UpdateTargetDomainOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTargetDomain",
}));

export type UpdateThreatError = CommonErrors;
/**
 * Updates a threat.
 */
export const updateThreat: API.OperationMethod<
  UpdateThreatInput,
  UpdateThreatOutput,
  UpdateThreatError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2032, __c127, 0) as any as S.Schema<UpdateThreatInput>,
  output: __S(912, __c57, 0) as any as S.Schema<UpdateThreatOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThreat",
}));

export type UpdateThreatModelError = CommonErrors;
/**
 * Updates an existing threat model configuration.
 */
export const updateThreatModel: API.OperationMethod<
  UpdateThreatModelInput,
  UpdateThreatModelOutput,
  UpdateThreatModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2048, __c128, 0) as any as S.Schema<UpdateThreatModelInput>,
  output: __S(944, __c59, 0) as any as S.Schema<UpdateThreatModelOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThreatModel",
}));

export type VerifyTargetDomainError = CommonErrors;
/**
 * Initiates verification of a target domain. This checks whether the domain ownership verification token has been properly configured.
 */
export const verifyTargetDomain: API.OperationMethod<
  VerifyTargetDomainInput,
  VerifyTargetDomainOutput,
  VerifyTargetDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<VerifyTargetDomainInput>,
  output: __S(177, __c11, 1) as any as S.Schema<VerifyTargetDomainOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifyTargetDomain",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pentestIds: __S(1888, __c118, 0), agentSpaceId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/BatchDeletePentests" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchDeletePentestsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ pentestId: S.optional(S.String), reason: S.optional(S.String) }),
      ).annotate({ identifier: "DeletePentestFailure" });
    case 2:
      return S.Array(__S(1, __c0, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ deleted: S.optional(__S(161, __c10, 1)), failed: S.optional(__S(2, __c0, 2)) }),
      ).annotate({ identifier: "BatchDeletePentestsOutput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vpcArn: S.optional(S.String),
          securityGroupArns: S.optional(__S(1888, __c118, 0)),
          subnetArns: S.optional(__S(1888, __c118, 0)),
        }),
      ).annotate({ identifier: "VpcConfig" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logGroup: S.optional(S.String), logStream: S.optional(S.String) }),
      ).annotate({ identifier: "CloudWatchLog" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ integrationId: S.String, resourceId: S.String })).annotate({
        identifier: "IntegratedDocument",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          s3Location: S.optional(S.String),
          artifactId: S.optional(S.String),
          integratedDocument: S.optional(__S(48, __c3, 0)),
        }),
      ).annotate({ identifier: "DocumentInfo" });
    case 2:
      return S.Array(__S(49, __c3, 1));
    case 3:
      return S.suspend(() => S.Struct({ s3Location: S.optional(S.String) })).annotate({
        identifier: "SourceCodeRepository",
      });
    case 4:
      return S.Array(__S(51, __c3, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          integrationId: S.String,
          providerResourceId: S.String,
          branch: S.optional(S.String),
        }),
      ).annotate({ identifier: "IntegratedRepository" });
    case 6:
      return S.Array(__S(53, __c3, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          integrationId: S.String,
          containerId: S.String,
          parentId: S.optional(S.String),
          documentId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReportDestination" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Array(Endpoint);
    case 1:
      return S.suspend(() =>
        S.Struct({ providerType: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "Authentication" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          identifier: S.optional(S.String),
          uris: S.optional(__S(1888, __c118, 0)),
          authentication: S.optional(__S(65, __c4, 1)),
          description: S.optional(S.String),
          enableEmailMfa: S.optional(S.Boolean),
          mfaForwardingAddress: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "Actor" });
    case 3:
      return S.Array(__S(66, __c4, 2));
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ inlinePem: SensitiveString }),
        /*@__PURE__*/ S.Struct({ artifactId: S.String }),
        /*@__PURE__*/ S.Struct({ s3Location: S.String }),
      ]);
    case 5:
      return S.suspend(() => S.Struct({ source: __S(68, __c4, 4) })).annotate({
        identifier: "TrustedCaCertificate",
      });
    case 6:
      return S.Array(__S(69, __c4, 5));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          endpoints: S.optional(__S(64, __c4, 0)),
          actors: S.optional(__S(67, __c4, 3)),
          documents: S.optional(__S(50, __c3, 2)),
          sourceCode: S.optional(__S(52, __c3, 4)),
          integratedRepositories: S.optional(__S(54, __c3, 6)),
          trustedCaCertificates: S.optional(__S(70, __c4, 6)),
        }),
      ).annotate({ identifier: "Assets" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          riskLevels: S.optional(__S(80, __c5, 0)),
          confidenceLevels: S.optional(__S(80, __c5, 0)),
          statuses: S.optional(__S(80, __c5, 0)),
          riskTypes: S.optional(__S(80, __c5, 0)),
          findingTypes: S.optional(__S(1888, __c118, 0)),
          taskStatuses: S.optional(__S(80, __c5, 0)),
          annotationNotes: S.optional(S.Boolean),
          complianceReport: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ReportFilters" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "CustomHeader" });
    case 1:
      return S.Array(__S(128, __c8, 0));
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          effect: S.optional(S.String),
          pattern: S.optional(S.String),
          networkTrafficRuleType: S.optional(S.String),
        }),
      ).annotate({ identifier: "NetworkTrafficRule" });
    case 1:
      return S.Array(__S(144, __c9, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          rules: S.optional(__S(145, __c9, 1)),
          customHeaders: S.optional(__S(129, __c8, 1)),
        }),
      ).annotate({ identifier: "NetworkTrafficConfig" });
    case 3:
      return S.suspend(() => S.Struct({ enabled: S.optional(S.Boolean) })).annotate({
        identifier: "CiCdConfiguration",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          pentestId: S.String,
          agentSpaceId: S.String,
          title: S.String,
          assets: __S(96, __c6, 0),
          excludeRiskTypes: S.optional(__S(80, __c5, 0)),
          serviceRole: S.optional(S.String),
          logConfig: S.optional(__S(32, __c2, 0)),
          vpcConfig: S.optional(__S(16, __c1, 0)),
          networkTrafficConfig: S.optional(__S(146, __c9, 2)),
          codeRemediationStrategy: S.optional(S.String),
          cleanUpStrategy: S.optional(S.String),
          disableManagedSkills: S.optional(__S(80, __c5, 0)),
          maxTaskHours: S.optional(S.Number),
          reportDestination: S.optional(__S(55, __c3, 7)),
          reportFilters: S.optional(__S(112, __c7, 0)),
          cicdConfiguration: S.optional(__S(147, __c9, 3)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "Pentest" });
    case 1:
      return S.Array(__S(160, __c10, 0));
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ targetDomainId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/VerifyTargetDomain" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "VerifyTargetDomainInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          targetDomainId: S.optional(S.String),
          domainName: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          verifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          status: S.optional(S.String),
          verificationStatusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "VerifyTargetDomainOutput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ packId: S.String, securityRequirementNames: __S(1888, __c118, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/BatchDeleteSecurityRequirements" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchDeleteSecurityRequirementsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          deletedSecurityRequirementNames: __S(1888, __c118, 0),
          errors: __S(1681, __c105, 1),
        }),
      ).annotate({ identifier: "BatchDeleteSecurityRequirementsOutput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ threatModelIds: __S(1888, __c118, 0), agentSpaceId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/BatchDeleteThreatModels" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchDeleteThreatModelsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ threatModelId: S.optional(S.String), reason: S.optional(S.String) }),
      ).annotate({ identifier: "DeleteThreatModelFailure" });
    case 2:
      return S.Array(__S(209, __c13, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          deleted: S.optional(__S(1888, __c118, 0)),
          failed: S.optional(__S(210, __c13, 2)),
        }),
      ).annotate({ identifier: "BatchDeleteThreatModelsOutput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agentSpaceIds: __S(1888, __c118, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/BatchGetAgentSpaces" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetAgentSpacesInput" });
    case 1:
      return S.Array(__S(240, __c15, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          agentSpaces: S.optional(__S(225, __c14, 1)),
          notFound: S.optional(__S(1888, __c118, 0)),
        }),
      ).annotate({ identifier: "BatchGetAgentSpacesOutput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String,
          name: S.String,
          description: S.optional(S.String),
          awsResources: S.optional(__S(257, __c16, 1)),
          targetDomainIds: S.optional(__S(1888, __c118, 0)),
          codeReviewSettings: S.optional(__S(258, __c16, 2)),
          kmsKeyId: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "AgentSpace" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(16, __c1, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          vpcs: S.optional(__S(256, __c16, 0)),
          logGroups: S.optional(__S(1888, __c118, 0)),
          s3Buckets: S.optional(__S(1888, __c118, 0)),
          secretArns: S.optional(__S(1888, __c118, 0)),
          lambdaFunctionArns: S.optional(__S(1888, __c118, 0)),
          iamRoles: S.optional(__S(1888, __c118, 0)),
        }),
      ).annotate({ identifier: "AWSResources" });
    case 2:
      return S.suspend(() =>
        S.Struct({ controlsScanning: S.Boolean, generalPurposeScanning: S.Boolean }),
      ).annotate({ identifier: "CodeReviewSettings" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agentSpaceId: S.String, artifactIds: __S(1888, __c118, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/BatchGetArtifactMetadata" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetArtifactMetadataInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String,
          artifactId: S.String,
          fileName: S.String,
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "ArtifactMetadataItem" });
    case 2:
      return S.Array(__S(273, __c17, 1));
    case 3:
      return S.suspend(() => S.Struct({ artifactMetadataList: __S(274, __c17, 2) })).annotate({
        identifier: "BatchGetArtifactMetadataOutput",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ codeReviewJobIds: __S(1888, __c118, 0), agentSpaceId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/BatchGetCodeReviewJobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetCodeReviewJobsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          codeReviewJobId: S.optional(S.String),
          codeReviewId: S.optional(S.String),
          title: S.optional(S.String),
          overview: S.optional(S.String),
          status: S.optional(S.String),
          documents: S.optional(__S(50, __c3, 2)),
          sourceCode: S.optional(__S(52, __c3, 4)),
          steps: S.optional(__S(305, __c19, 1)),
          executionContext: S.optional(__S(307, __c19, 3)),
          serviceRole: S.optional(S.String),
          logConfig: S.optional(__S(32, __c2, 0)),
          errorInformation: S.optional(__S(320, __c20, 0)),
          integratedRepositories: S.optional(__S(54, __c3, 6)),
          codeRemediationStrategy: S.optional(S.String),
          maxTaskHours: S.optional(S.Number),
          reportDestination: S.optional(__S(55, __c3, 7)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CodeReviewJob" });
    case 2:
      return S.Array(__S(289, __c18, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          codeReviewJobs: S.optional(__S(290, __c18, 2)),
          notFound: S.optional(__S(1888, __c118, 0)),
        }),
      ).annotate({ identifier: "BatchGetCodeReviewJobsOutput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          status: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "Step" });
    case 1:
      return S.Array(__S(304, __c19, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          contextType: S.optional(S.String),
          context: S.optional(S.String),
          timestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ExecutionContext" });
    case 3:
      return S.Array(__S(306, __c19, 2));
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ code: S.optional(S.String), message: S.optional(S.String) }),
      ).annotate({ identifier: "ErrorInformation" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agentSpaceId: S.String, codeReviewJobTaskIds: __S(1888, __c118, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/BatchGetCodeReviewJobTasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetCodeReviewJobTasksInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          taskId: S.String,
          codeReviewId: S.optional(S.String),
          codeReviewJobId: S.optional(S.String),
          agentSpaceId: S.optional(S.String),
          title: S.optional(S.String),
          description: S.optional(S.String),
          categories: S.optional(__S(353, __c22, 1)),
          riskType: S.optional(S.String),
          executionStatus: S.optional(S.String),
          logsLocation: S.optional(__S(368, __c23, 0)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CodeReviewJobTask" });
    case 2:
      return S.Array(__S(337, __c21, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          codeReviewJobTasks: S.optional(__S(338, __c21, 2)),
          notFound: S.optional(__S(1888, __c118, 0)),
        }),
      ).annotate({ identifier: "BatchGetCodeReviewJobTasksOutput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), isPrimary: S.optional(S.Boolean) }),
      ).annotate({ identifier: "Category" });
    case 1:
      return S.Array(__S(352, __c22, 0));
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logType: S.optional(S.String), cloudWatchLog: S.optional(__S(32, __c2, 0)) }),
      ).annotate({ identifier: "LogLocation" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ codeReviewIds: __S(1888, __c118, 0), agentSpaceId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/BatchGetCodeReviews" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetCodeReviewsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          codeReviewId: S.String,
          agentSpaceId: S.String,
          title: S.String,
          assets: __S(96, __c6, 0),
          serviceRole: S.optional(S.String),
          logConfig: S.optional(__S(32, __c2, 0)),
          codeRemediationStrategy: S.optional(S.String),
          validationMode: S.optional(S.String),
          maxTaskHours: S.optional(S.Number),
          reportDestination: S.optional(__S(55, __c3, 7)),
          reportFilters: S.optional(__S(112, __c7, 0)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CodeReview" });
    case 2:
      return S.Array(__S(385, __c24, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          codeReviews: S.optional(__S(386, __c24, 2)),
          notFound: S.optional(__S(1888, __c118, 0)),
        }),
      ).annotate({ identifier: "BatchGetCodeReviewsOutput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ findingIds: __S(1888, __c118, 0), agentSpaceId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/BatchGetFindings" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetFindingsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          repoName: S.optional(S.String),
          codeDiffLink: S.optional(S.String),
          pullRequestLink: S.optional(S.String),
        }),
      ).annotate({ identifier: "CodeRemediationTaskDetails" });
    case 2:
      return S.Array(__S(401, __c25, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          status: S.String,
          statusReason: S.optional(S.String),
          taskDetails: S.optional(__S(402, __c25, 2)),
        }),
      ).annotate({ identifier: "CodeRemediationTask" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          filePath: S.String,
          lineStart: S.optional(S.Number),
          lineEnd: S.optional(S.Number),
          label: S.optional(S.String),
        }),
      ).annotate({ identifier: "CodeLocation" });
    case 5:
      return S.Array(__S(404, __c25, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          scriptType: S.optional(S.String),
          scriptUrl: S.optional(S.String),
          instructions: S.optional(S.String),
          envVars: S.optional(__S(129, __c8, 1)),
        }),
      ).annotate({ identifier: "VerificationScript" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          findingId: S.String,
          agentSpaceId: S.String,
          pentestId: S.optional(S.String),
          pentestJobId: S.optional(S.String),
          codeReviewId: S.optional(S.String),
          codeReviewJobId: S.optional(S.String),
          taskId: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          status: S.optional(S.String),
          riskType: S.optional(S.String),
          riskLevel: S.optional(S.String),
          riskScore: S.optional(S.String),
          reasoning: S.optional(S.String),
          confidence: S.optional(S.String),
          validationStatus: S.optional(S.String),
          attackScript: S.optional(S.String),
          codeRemediationTask: S.optional(__S(403, __c25, 3)),
          lastUpdatedBy: S.optional(S.String),
          customerNote: S.optional(S.String),
          codeLocations: S.optional(__S(405, __c25, 5)),
          verificationScript: S.optional(__S(406, __c25, 6)),
          alignmentRationale: S.optional(S.String),
          revalidationJobIds: S.optional(__S(1888, __c118, 0)),
          originalFindingId: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "Finding" });
    case 8:
      return S.Array(__S(407, __c25, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          findings: S.optional(__S(408, __c25, 8)),
          notFound: S.optional(__S(1888, __c118, 0)),
        }),
      ).annotate({ identifier: "BatchGetFindingsOutput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pentestJobIds: __S(1888, __c118, 0), agentSpaceId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/BatchGetPentestJobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetPentestJobsInput" });
    case 1:
      return S.suspend(() => S.Struct({ decision: S.String, reason: S.String })).annotate({
        identifier: "ScopeResult",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          pentestJobId: S.optional(S.String),
          pentestId: S.optional(S.String),
          title: S.optional(S.String),
          overview: S.optional(S.String),
          status: S.optional(S.String),
          endpoints: S.optional(__S(64, __c4, 0)),
          actors: S.optional(__S(67, __c4, 3)),
          documents: S.optional(__S(50, __c3, 2)),
          sourceCode: S.optional(__S(52, __c3, 4)),
          excludePaths: S.optional(__S(64, __c4, 0)),
          allowedDomains: S.optional(__S(64, __c4, 0)),
          excludeRiskTypes: S.optional(__S(80, __c5, 0)),
          steps: S.optional(__S(305, __c19, 1)),
          executionContext: S.optional(__S(307, __c19, 3)),
          serviceRole: S.optional(S.String),
          logConfig: S.optional(__S(32, __c2, 0)),
          vpcConfig: S.optional(__S(16, __c1, 0)),
          networkTrafficConfig: S.optional(__S(146, __c9, 2)),
          errorInformation: S.optional(__S(320, __c20, 0)),
          integratedRepositories: S.optional(__S(54, __c3, 6)),
          trustedCaCertificates: S.optional(__S(70, __c4, 6)),
          codeRemediationStrategy: S.optional(S.String),
          cleanUpStrategy: S.optional(S.String),
          disableManagedSkills: S.optional(__S(80, __c5, 0)),
          maxTaskHours: S.optional(S.Number),
          jobType: S.optional(S.String),
          selectedFindingIds: S.optional(__S(1888, __c118, 0)),
          reportDestination: S.optional(__S(55, __c3, 7)),
          reportUrl: S.optional(S.String),
          scopeResult: S.optional(__S(417, __c26, 1)),
          scopeChanges: S.optional(__S(433, __c27, 1)),
          cicdConfiguration: S.optional(__S(147, __c9, 3)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "PentestJob" });
    case 3:
      return S.Array(__S(418, __c26, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          pentestJobs: S.optional(__S(419, __c26, 3)),
          notFound: S.optional(__S(1888, __c118, 0)),
        }),
      ).annotate({ identifier: "BatchGetPentestJobsOutput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          integrationId: S.String,
          providerResourceId: S.String,
          baseCommitSha: S.optional(S.String),
          headCommitSha: S.String,
          triggerRunId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ScopeChange" });
    case 1:
      return S.Array(__S(432, __c27, 0));
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agentSpaceId: S.String, taskIds: __S(1888, __c118, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/BatchGetPentestJobTasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetPentestJobTasksInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          taskId: S.String,
          pentestId: S.optional(S.String),
          pentestJobId: S.optional(S.String),
          agentSpaceId: S.optional(S.String),
          title: S.optional(S.String),
          description: S.optional(S.String),
          categories: S.optional(__S(353, __c22, 1)),
          riskType: S.optional(S.String),
          targetEndpoint: S.optional(Endpoint),
          executionStatus: S.optional(S.String),
          logsLocation: S.optional(__S(368, __c23, 0)),
          taskHours: S.optional(S.Number),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "Task" });
    case 2:
      return S.Array(__S(449, __c28, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          tasks: S.optional(__S(450, __c28, 2)),
          notFound: S.optional(__S(1888, __c118, 0)),
        }),
      ).annotate({ identifier: "BatchGetPentestJobTasksOutput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pentestIds: __S(1888, __c118, 0), agentSpaceId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/BatchGetPentests" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetPentestsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          pentests: S.optional(__S(161, __c10, 1)),
          notFound: S.optional(__S(1888, __c118, 0)),
        }),
      ).annotate({ identifier: "BatchGetPentestsOutput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ packId: S.String, securityRequirementNames: __S(1888, __c118, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/BatchGetSecurityRequirements" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetSecurityRequirementsInput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ targetDomainIds: __S(1888, __c118, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/BatchGetTargetDomains" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetTargetDomainsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          targetDomainId: S.String,
          domainName: S.String,
          verificationStatus: S.optional(S.String),
          verificationStatusReason: S.optional(S.String),
          verificationDetails: S.optional(__S(514, __c32, 2)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          verifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "TargetDomain" });
    case 2:
      return S.Array(__S(497, __c31, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          targetDomains: S.optional(__S(498, __c31, 2)),
          notFound: S.optional(__S(1888, __c118, 0)),
        }),
      ).annotate({ identifier: "BatchGetTargetDomainsOutput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          token: S.optional(S.String),
          dnsRecordName: S.optional(S.String),
          dnsRecordType: S.optional(S.String),
        }),
      ).annotate({ identifier: "DnsVerification" });
    case 1:
      return S.suspend(() =>
        S.Struct({ token: S.optional(S.String), routePath: S.optional(S.String) }),
      ).annotate({ identifier: "HttpVerification" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          method: S.optional(S.String),
          dnsTxt: S.optional(__S(512, __c32, 0)),
          httpRoute: S.optional(__S(513, __c32, 1)),
        }),
      ).annotate({ identifier: "VerificationDetails" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ threatModelJobIds: __S(1888, __c118, 0), agentSpaceId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/BatchGetThreatModelJobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetThreatModelJobsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          threatModelJobId: S.optional(S.String),
          threatModelId: S.optional(S.String),
          agentSpaceId: S.optional(S.String),
          title: S.optional(S.String),
          status: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          executionStartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          executionEndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          sourceCode: S.optional(__S(52, __c3, 4)),
          integratedRepositories: S.optional(__S(54, __c3, 6)),
          documents: S.optional(__S(50, __c3, 2)),
          scopeDocs: S.optional(__S(50, __c3, 2)),
          errorInformation: S.optional(__S(320, __c20, 0)),
          systemOverview: S.optional(S.String),
          reportDestination: S.optional(__S(55, __c3, 7)),
        }),
      ).annotate({ identifier: "ThreatModelJob" });
    case 2:
      return S.Array(__S(529, __c33, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          threatModelJobs: S.optional(__S(530, __c33, 2)),
          notFound: S.optional(__S(1888, __c118, 0)),
        }),
      ).annotate({ identifier: "BatchGetThreatModelJobsOutput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agentSpaceId: S.String, threatModelJobTaskIds: __S(1888, __c118, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/BatchGetThreatModelJobTasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetThreatModelJobTasksInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          taskId: S.String,
          threatModelId: S.optional(S.String),
          threatModelJobId: S.optional(S.String),
          agentSpaceId: S.optional(S.String),
          title: S.optional(S.String),
          description: S.optional(S.String),
          executionStatus: S.optional(S.String),
          logsLocation: S.optional(__S(368, __c23, 0)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ThreatModelJobTask" });
    case 2:
      return S.Array(__S(545, __c34, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          threatModelJobTasks: S.optional(__S(546, __c34, 2)),
          notFound: S.optional(__S(1888, __c118, 0)),
        }),
      ).annotate({ identifier: "BatchGetThreatModelJobTasksOutput" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ threatModelIds: __S(1888, __c118, 0), agentSpaceId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/BatchGetThreatModels" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchGetThreatModelsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          threatModelId: S.String,
          agentSpaceId: S.String,
          title: S.String,
          description: S.optional(S.String),
          assets: __S(96, __c6, 0),
          scopeDocs: S.optional(__S(50, __c3, 2)),
          serviceRole: S.optional(S.String),
          logConfig: S.optional(__S(32, __c2, 0)),
          reportDestination: S.optional(__S(55, __c3, 7)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ThreatModel" });
    case 2:
      return S.Array(__S(561, __c35, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          threatModels: S.optional(__S(562, __c35, 2)),
          notFound: S.optional(__S(1888, __c118, 0)),
        }),
      ).annotate({ identifier: "BatchGetThreatModelsOutput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ threatIds: __S(1888, __c118, 0), agentSpaceId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/BatchGetThreats" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetThreatsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          threatId: S.optional(S.String),
          threatJobId: S.optional(S.String),
          title: S.optional(S.String),
          statement: S.optional(S.String),
          severity: S.optional(S.String),
          status: S.optional(S.String),
          comments: S.optional(S.String),
          threatSource: S.optional(S.String),
          prerequisites: S.optional(S.String),
          threatAction: S.optional(S.String),
          threatImpact: S.optional(S.String),
          impactedGoal: S.optional(__S(1888, __c118, 0)),
          impactedAssets: S.optional(__S(1888, __c118, 0)),
          anchor: S.optional(__S(592, __c37, 0)),
          evidence: S.optional(__S(594, __c37, 2)),
          stride: S.optional(__S(80, __c5, 0)),
          recommendation: S.optional(S.String),
          createdBy: S.optional(S.String),
          updatedBy: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "Threat" });
    case 2:
      return S.Array(__S(577, __c36, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          threats: S.optional(__S(578, __c36, 2)),
          notFound: S.optional(__S(1888, __c118, 0)),
        }),
      ).annotate({ identifier: "BatchGetThreatsOutput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          kind: S.optional(S.String),
          id: S.optional(S.String),
          packageId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ThreatAnchorShape" });
    case 1:
      return S.suspend(() =>
        S.Struct({ packageId: S.optional(S.String), path: S.optional(S.String) }),
      ).annotate({ identifier: "ThreatEvidenceShape" });
    case 2:
      return S.Array(__S(593, __c37, 1));
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          domain: S.optional(S.String),
          evaluation: S.optional(S.String),
          remediation: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateSecurityRequirementEntry" });
    case 1:
      return S.Array(__S(608, __c38, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ packId: S.String, securityRequirements: __S(609, __c38, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/BatchUpdateSecurityRequirements" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchUpdateSecurityRequirementsInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          updatedSecurityRequirementNames: __S(1888, __c118, 0),
          errors: __S(1681, __c105, 1),
        }),
      ).annotate({ identifier: "BatchUpdateSecurityRequirementsOutput" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          awsResources: S.optional(__S(257, __c16, 1)),
          targetDomainIds: S.optional(__S(1888, __c118, 0)),
          codeReviewSettings: S.optional(__S(258, __c16, 2)),
          kmsKeyId: S.optional(S.String),
          tags: S.optional(__S(640, __c40, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/CreateAgentSpace" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateAgentSpaceInput" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          idcInstanceArn: S.optional(S.String),
          roleArn: S.optional(S.String),
          defaultKmsKeyId: S.optional(S.String),
          tags: S.optional(__S(640, __c40, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreateApplication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateApplicationRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ applicationId: S.String })).annotate({
        identifier: "CreateApplicationResponse",
      });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          title: S.String,
          agentSpaceId: S.String,
          assets: __S(96, __c6, 0),
          serviceRole: S.optional(S.String),
          logConfig: S.optional(__S(32, __c2, 0)),
          codeRemediationStrategy: S.optional(S.String),
          validationMode: S.optional(S.String),
          maxTaskHours: S.optional(S.Number),
          reportDestination: S.optional(__S(55, __c3, 7)),
          reportFilters: S.optional(__S(112, __c7, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/CreateCodeReview" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateCodeReviewInput" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          codeReviewId: S.String,
          title: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          assets: S.optional(__S(96, __c6, 0)),
          serviceRole: S.optional(S.String),
          logConfig: S.optional(__S(32, __c2, 0)),
          agentSpaceId: S.optional(S.String),
          codeRemediationStrategy: S.optional(S.String),
          validationMode: S.optional(S.String),
          maxTaskHours: S.optional(S.Number),
          reportDestination: S.optional(__S(55, __c3, 7)),
          reportFilters: S.optional(__S(112, __c7, 0)),
        }),
      ).annotate({ identifier: "CreateCodeReviewOutput" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          code: S.String,
          state: S.String,
          organizationName: S.optional(S.String),
          targetUrl: S.optional(S.String),
          installationId: S.optional(S.String),
        }),
      ).annotate({ identifier: "GitHubIntegrationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          accessToken: SensitiveString,
          targetUrl: S.optional(S.String),
          tokenType: S.String,
          groupId: S.optional(S.String),
        }),
      ).annotate({ identifier: "GitLabIntegrationInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          installationId: S.String,
          workspace: S.String,
          code: S.String,
          state: S.String,
        }),
      ).annotate({ identifier: "BitbucketIntegrationInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({ installationId: S.String, code: S.String, state: S.String, siteUrl: S.String }),
      ).annotate({ identifier: "ConfluenceIntegrationInput" });
    case 4:
      return S.suspend(() =>
        S.Struct({ code: S.String, state: S.String, organizationName: S.String }),
      ).annotate({ identifier: "AzureDevOpsIntegrationInput" });
    case 5:
      return S.suspend(() =>
        S.Struct({ targetUrl: S.String, code: S.String, state: S.String }),
      ).annotate({ identifier: "BitbucketDataCenterIntegrationInput" });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ github: __S(720, __c45, 0) }),
        /*@__PURE__*/ S.Struct({ gitlab: __S(721, __c45, 1) }),
        /*@__PURE__*/ S.Struct({ bitbucket: __S(722, __c45, 2) }),
        /*@__PURE__*/ S.Struct({ confluence: __S(723, __c45, 3) }),
        /*@__PURE__*/ S.Struct({ azureDevOps: __S(724, __c45, 4) }),
        /*@__PURE__*/ S.Struct({ bitbucketDataCenter: __S(725, __c45, 5) }),
      ]);
    case 7:
      return S.suspend(() =>
        S.Struct({
          provider: S.String,
          input: __S(726, __c45, 6),
          integrationDisplayName: S.String,
          kmsKeyId: S.optional(S.String),
          tags: S.optional(__S(640, __c40, 0)),
          privateConnectionName: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreateIntegration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateIntegrationInput" });
    case 8:
      return S.suspend(() => S.Struct({ integrationId: S.String })).annotate({
        identifier: "CreateIntegrationOutput",
      });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String,
          agentSpaceId: S.String,
          membershipId: S.String,
          memberType: S.String,
          config: S.optional(__S(769, __c48, 1)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/CreateMembership" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateMembershipRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "CreateMembershipResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ role: S.optional(S.String) })).annotate({
        identifier: "UserConfig",
      });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ user: __S(768, __c48, 0) })]);
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          title: S.String,
          agentSpaceId: S.String,
          assets: S.optional(__S(96, __c6, 0)),
          excludeRiskTypes: S.optional(__S(80, __c5, 0)),
          serviceRole: S.optional(S.String),
          logConfig: S.optional(__S(32, __c2, 0)),
          vpcConfig: S.optional(__S(16, __c1, 0)),
          networkTrafficConfig: S.optional(__S(146, __c9, 2)),
          codeRemediationStrategy: S.optional(S.String),
          disableManagedSkills: S.optional(__S(80, __c5, 0)),
          maxTaskHours: S.optional(S.Number),
          reportDestination: S.optional(__S(55, __c3, 7)),
          reportFilters: S.optional(__S(112, __c7, 0)),
          cicdConfiguration: S.optional(__S(147, __c9, 3)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/CreatePentest" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreatePentestInput" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          pentestId: S.optional(S.String),
          title: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          assets: S.optional(__S(96, __c6, 0)),
          excludeRiskTypes: S.optional(__S(80, __c5, 0)),
          serviceRole: S.optional(S.String),
          logConfig: S.optional(__S(32, __c2, 0)),
          agentSpaceId: S.optional(S.String),
          reportDestination: S.optional(__S(55, __c3, 7)),
          reportFilters: S.optional(__S(112, __c7, 0)),
          cicdConfiguration: S.optional(__S(147, __c9, 3)),
        }),
      ).annotate({ identifier: "CreatePentestOutput" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          hostAddress: S.String,
          vpcId: S.String,
          subnetIds: __S(1888, __c118, 0),
          securityGroupIds: S.optional(__S(1888, __c118, 0)),
          ipAddressType: S.optional(S.String),
          ipv4AddressesPerEni: S.optional(S.Number),
          portRanges: S.optional(__S(1888, __c118, 0)),
          certificate: S.optional(SensitiveString),
          dnsResolution: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceManagedInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ resourceConfigurationId: S.String, certificate: S.optional(SensitiveString) }),
      ).annotate({ identifier: "SelfManagedInput" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ serviceManaged: __S(816, __c51, 0) }),
        /*@__PURE__*/ S.Struct({ selfManaged: __S(817, __c51, 1) }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          privateConnectionName: S.String,
          mode: __S(818, __c51, 2),
          tags: S.optional(__S(640, __c40, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreatePrivateConnection" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreatePrivateConnectionInput" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          type: S.String,
          status: S.String,
          resourceGatewayId: S.optional(S.String),
          hostAddress: S.optional(S.String),
          vpcId: S.optional(S.String),
          resourceConfigurationId: S.optional(S.String),
          certificateExpiryTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          dnsResolution: S.optional(S.String),
          failureMessage: S.optional(S.String),
          tags: S.optional(__S(640, __c40, 0)),
        }),
      ).annotate({ identifier: "CreatePrivateConnectionOutput" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          status: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          tags: S.optional(__S(640, __c40, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreateSecurityRequirementPack" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSecurityRequirementPackInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ packId: S.String, status: S.String, kmsKeyId: S.optional(S.String) }),
      ).annotate({ identifier: "CreateSecurityRequirementPackOutput" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          targetDomainName: S.String,
          verificationMethod: S.String,
          tags: S.optional(__S(640, __c40, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreateTargetDomain" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateTargetDomainInput" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          targetDomainId: S.String,
          domainName: S.String,
          verificationStatus: S.String,
          verificationStatusReason: S.optional(S.String),
          verificationDetails: S.optional(__S(514, __c32, 2)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          verifiedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CreateTargetDomainOutput" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String,
          threatJobId: S.String,
          title: S.optional(S.String),
          statement: S.optional(S.String),
          severity: S.optional(S.String),
          comments: S.optional(S.String),
          stride: S.optional(__S(80, __c5, 0)),
          threatSource: S.optional(S.String),
          prerequisites: S.optional(S.String),
          threatAction: S.optional(S.String),
          threatImpact: S.optional(S.String),
          impactedGoal: S.optional(__S(1888, __c118, 0)),
          impactedAssets: S.optional(__S(1888, __c118, 0)),
          anchor: S.optional(__S(592, __c37, 0)),
          evidence: S.optional(__S(594, __c37, 2)),
          recommendation: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/CreateThreat" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateThreatInput" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          threatId: S.String,
          threatJobId: S.String,
          title: S.optional(S.String),
          statement: S.optional(S.String),
          severity: S.optional(S.String),
          status: S.optional(S.String),
          comments: S.optional(S.String),
          stride: S.optional(__S(80, __c5, 0)),
          threatSource: S.optional(S.String),
          prerequisites: S.optional(S.String),
          threatAction: S.optional(S.String),
          threatImpact: S.optional(S.String),
          impactedGoal: S.optional(__S(1888, __c118, 0)),
          impactedAssets: S.optional(__S(1888, __c118, 0)),
          anchor: S.optional(__S(592, __c37, 0)),
          evidence: S.optional(__S(594, __c37, 2)),
          recommendation: S.optional(S.String),
          createdBy: S.optional(S.String),
          updatedBy: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CreateThreatOutput" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          title: S.String,
          agentSpaceId: S.String,
          description: S.optional(S.String),
          assets: S.optional(__S(96, __c6, 0)),
          scopeDocs: S.optional(__S(50, __c3, 2)),
          serviceRole: S.String,
          logConfig: S.optional(__S(32, __c2, 0)),
          reportDestination: S.optional(__S(55, __c3, 7)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreateThreatModel" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateThreatModelInput" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          threatModelId: S.String,
          title: S.optional(S.String),
          agentSpaceId: S.optional(S.String),
          description: S.optional(S.String),
          assets: S.optional(__S(96, __c6, 0)),
          scopeDocs: S.optional(__S(50, __c3, 2)),
          serviceRole: S.optional(S.String),
          logConfig: S.optional(__S(32, __c2, 0)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          reportDestination: S.optional(__S(55, __c3, 7)),
        }),
      ).annotate({ identifier: "CreateThreatModelOutput" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agentSpaceId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/DeleteAgentSpace" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAgentSpaceInput" });
    case 1:
      return S.suspend(() => S.Struct({ agentSpaceId: S.optional(S.String) })).annotate({
        identifier: "DeleteAgentSpaceOutput",
      });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ applicationId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DeleteApplication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteApplicationRequest" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agentSpaceId: S.String, artifactId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/DeleteArtifact" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteArtifactInput" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ integrationId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DeleteIntegration" }),
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
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String,
          agentSpaceId: S.String,
          membershipId: S.String,
          memberType: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/DeleteMembership" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteMembershipRequest" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ privateConnectionName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DeletePrivateConnection" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePrivateConnectionInput" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ packId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DeleteSecurityRequirementPack" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSecurityRequirementPackInput" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ targetDomainId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DeleteTargetDomain" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTargetDomainInput" });
    case 1:
      return S.suspend(() => S.Struct({ targetDomainId: S.optional(S.String) })).annotate({
        identifier: "DeleteTargetDomainOutput",
      });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ privateConnectionName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DescribePrivateConnection" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribePrivateConnectionInput" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ applicationId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/GetApplication" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetApplicationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ idcApplicationArn: S.optional(S.String), idcInstanceArn: S.optional(S.String) }),
      ).annotate({ identifier: "IdCConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String,
          domain: S.String,
          applicationName: S.optional(S.String),
          idcConfiguration: S.optional(__S(1105, __c69, 1)),
          roleArn: S.optional(S.String),
          defaultKmsKeyId: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetApplicationResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agentSpaceId: S.String, artifactId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/GetArtifact" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetArtifactInput" });
    case 1:
      return S.suspend(() => S.Struct({ contents: S.String, type: S.String })).annotate({
        identifier: "Artifact",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String,
          artifactId: S.String,
          artifact: __S(1121, __c70, 1),
          fileName: S.String,
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "GetArtifactOutput" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ integrationId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/GetIntegration" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetIntegrationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          integrationId: S.String,
          installationId: S.String,
          provider: S.String,
          providerType: S.String,
          displayName: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          targetUrl: S.optional(S.String),
          webhookUrl: S.optional(S.String),
          privateConnectionName: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetIntegrationOutput" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ packId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetSecurityRequirementPack" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSecurityRequirementPackInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          packId: S.String,
          name: S.String,
          description: S.optional(S.String),
          vendorName: S.optional(S.String),
          managementType: S.String,
          status: S.String,
          importStatus: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          kmsKeyId: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetSecurityRequirementPackOutput" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String, format: S.String, content: SensitiveBlob }),
      ).annotate({ identifier: "SecurityRequirementArtifact" });
    case 1:
      return S.Array(__S(1168, __c73, 0));
    case 2:
      return S.Union([/*@__PURE__*/ S.Struct({ documents: __S(1169, __c73, 1) })]);
    case 3:
      return S.suspend(() =>
        S.Struct({ packId: S.String, input: __S(1170, __c73, 2) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ImportSecurityRequirements" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ImportSecurityRequirementsInput" });
    case 4:
      return S.suspend(() => S.Struct({ packId: S.String, importStatus: S.String })).annotate({
        identifier: "ImportSecurityRequirementsOutput",
      });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          provider: S.String,
          targetUrl: S.optional(S.String),
          organizationName: S.optional(S.String),
          clientId: S.optional(S.String),
          clientSecret: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/oauth2/provider/register" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "InitiateProviderRegistrationInput" });
    case 1:
      return S.suspend(() => S.Struct({ redirectTo: S.String, csrfState: S.String })).annotate({
        identifier: "InitiateProviderRegistrationOutput",
      });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          agentSpaceId: S.String,
          pentestId: S.String,
          actorIdentifier: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListActorMessages" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListActorMessagesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          sender: S.optional(SensitiveString),
          subject: S.optional(SensitiveString),
          body: S.optional(SensitiveString),
          receivedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ActorMessage" });
    case 2:
      return S.Array(__S(1201, __c75, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ messages: S.optional(__S(1202, __c75, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListActorMessagesOutput" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), maxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ListAgentSpaces" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAgentSpacesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String,
          name: S.String,
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "AgentSpaceSummary" });
    case 2:
      return S.Array(__S(1217, __c76, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          agentSpaceSummaries: S.optional(__S(1218, __c76, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAgentSpacesOutput" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), maxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ListApplications" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListApplicationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String,
          applicationName: S.String,
          domain: S.String,
          defaultKmsKeyId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ApplicationSummary" });
    case 2:
      return S.Array(__S(1233, __c77, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ applicationSummaries: __S(1234, __c77, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListApplicationsResponse" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ListArtifacts" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListArtifactsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ artifactId: S.String, fileName: S.String, artifactType: S.String }),
      ).annotate({ identifier: "ArtifactSummary" });
    case 2:
      return S.Array(__S(1249, __c78, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ artifactSummaries: __S(1250, __c78, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListArtifactsOutput" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number),
          codeReviewId: S.String,
          agentSpaceId: S.String,
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListCodeReviewJobsForCodeReview" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCodeReviewJobsForCodeReviewInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          codeReviewJobId: S.String,
          codeReviewId: S.String,
          title: S.optional(S.String),
          status: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CodeReviewJobSummary" });
    case 2:
      return S.Array(__S(1265, __c79, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          codeReviewJobSummaries: S.optional(__S(1266, __c79, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCodeReviewJobsForCodeReviewOutput" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ path: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(1280, __c80, 0));
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String,
          maxResults: S.optional(S.Number),
          codeReviewJobId: S.optional(S.String),
          stepName: S.optional(S.String),
          categoryName: S.optional(S.String),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListCodeReviewJobTasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCodeReviewJobTasksInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          taskId: S.String,
          codeReviewId: S.optional(S.String),
          codeReviewJobId: S.optional(S.String),
          agentSpaceId: S.optional(S.String),
          title: S.optional(S.String),
          riskType: S.optional(S.String),
          executionStatus: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CodeReviewJobTaskSummary" });
    case 2:
      return S.Array(__S(1297, __c81, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          codeReviewJobTaskSummaries: S.optional(__S(1298, __c81, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCodeReviewJobTasksOutput" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          agentSpaceId: S.String,
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ListCodeReviews" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListCodeReviewsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          codeReviewId: S.String,
          agentSpaceId: S.String,
          title: S.String,
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CodeReviewSummary" });
    case 2:
      return S.Array(__S(1313, __c82, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          codeReviewSummaries: S.optional(__S(1314, __c82, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCodeReviewsOutput" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number),
          pentestJobId: S.String,
          agentSpaceId: S.String,
          prefix: S.optional(S.String),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListDiscoveredEndpoints" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDiscoveredEndpointsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          uri: S.String,
          pentestJobId: S.String,
          taskId: S.String,
          agentSpaceId: S.String,
          evidence: S.optional(S.String),
          operation: S.optional(S.String),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "DiscoveredEndpoint" });
    case 2:
      return S.Array(__S(1329, __c83, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          discoveredEndpoints: S.optional(__S(1330, __c83, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDiscoveredEndpointsOutput" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number),
          pentestJobId: S.optional(S.String),
          codeReviewJobId: S.optional(S.String),
          agentSpaceId: S.String,
          nextToken: S.optional(S.String),
          riskType: S.optional(S.String),
          riskLevel: S.optional(S.String),
          status: S.optional(S.String),
          confidence: S.optional(S.String),
          name: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ListFindings" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListFindingsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          findingId: S.String,
          agentSpaceId: S.String,
          pentestId: S.optional(S.String),
          pentestJobId: S.optional(S.String),
          codeReviewId: S.optional(S.String),
          codeReviewJobId: S.optional(S.String),
          name: S.optional(S.String),
          status: S.optional(S.String),
          riskType: S.optional(S.String),
          riskLevel: S.optional(S.String),
          confidence: S.optional(S.String),
          validationStatus: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "FindingSummary" });
    case 2:
      return S.Array(__S(1345, __c84, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          findingsSummaries: S.optional(__S(1346, __c84, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListFindingsOutput" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String,
          integrationId: S.optional(S.String),
          resourceType: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListIntegratedResources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListIntegratedResourcesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          providerResourceId: S.String,
          owner: S.String,
          accessType: S.optional(S.String),
        }),
      ).annotate({ identifier: "GitHubRepositoryMetadata" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          providerResourceId: S.String,
          namespace: S.String,
          accessType: S.optional(S.String),
        }),
      ).annotate({ identifier: "GitLabRepositoryMetadata" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          providerResourceId: S.String,
          workspace: S.String,
          accessType: S.optional(S.String),
        }),
      ).annotate({ identifier: "BitbucketRepositoryMetadata" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          providerResourceId: S.String,
          spaceKey: S.String,
          pageId: S.String,
          title: S.optional(S.String),
          spaceTitle: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConfluenceDocumentMetadata" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          providerResourceId: S.String,
          organization: S.String,
          project: S.optional(S.String),
          projectId: S.optional(S.String),
          accessType: S.optional(S.String),
        }),
      ).annotate({ identifier: "AzureDevOpsRepositoryMetadata" });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ githubRepository: __S(1361, __c85, 1) }),
        /*@__PURE__*/ S.Struct({ gitlabRepository: __S(1362, __c85, 2) }),
        /*@__PURE__*/ S.Struct({ bitbucketRepository: __S(1363, __c85, 3) }),
        /*@__PURE__*/ S.Struct({ confluenceDocument: __S(1364, __c85, 4) }),
        /*@__PURE__*/ S.Struct({ azureDevOpsRepository: __S(1365, __c85, 5) }),
      ]);
    case 7:
      return S.suspend(() =>
        S.Struct({
          integrationId: S.String,
          resource: __S(1366, __c85, 6),
          capabilities: S.optional(__S(1382, __c86, 6)),
        }),
      ).annotate({ identifier: "IntegratedResourceSummary" });
    case 8:
      return S.Array(__S(1367, __c85, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          integratedResourceSummaries: __S(1368, __c85, 8),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListIntegratedResourcesOutput" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          patterns: __S(1888, __c118, 0),
          matchMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "TriggerFilter" });
    case 1:
      return S.Array(__S(1376, __c86, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          events: S.optional(__S(80, __c5, 0)),
          filters: S.optional(__S(1377, __c86, 1)),
        }),
      ).annotate({ identifier: "TriggerFilterGroup" });
    case 3:
      return S.Array(__S(1378, __c86, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          triggerFilterGroups: S.optional(__S(1379, __c86, 3)),
          leaveComments: S.optional(S.Boolean),
          remediateCode: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GitHubResourceCapabilities" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          fetchDocument: S.optional(S.Boolean),
          createDocument: S.optional(S.Boolean),
          updateDocument: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ConfluenceResourceCapabilities" });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ github: __S(1380, __c86, 4) }),
        /*@__PURE__*/ S.Struct({ gitlab: __S(1380, __c86, 4) }),
        /*@__PURE__*/ S.Struct({ bitbucket: __S(1380, __c86, 4) }),
        /*@__PURE__*/ S.Struct({ confluence: __S(1381, __c86, 5) }),
        /*@__PURE__*/ S.Struct({ azureDevOps: __S(1380, __c86, 4) }),
      ]);
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ provider: S.String }),
        /*@__PURE__*/ S.Struct({ providerType: S.String }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          filter: S.optional(__S(1392, __c87, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ListIntegrations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListIntegrationsInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          integrationId: S.String,
          installationId: S.String,
          provider: S.String,
          providerType: S.String,
          displayName: S.String,
          targetUrl: S.optional(S.String),
          webhookUrl: S.optional(S.String),
          privateConnectionName: S.optional(S.String),
        }),
      ).annotate({ identifier: "IntegrationSummary" });
    case 3:
      return S.Array(__S(1394, __c87, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ integrationSummaries: __S(1395, __c87, 3), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListIntegrationsOutput" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String,
          agentSpaceId: S.String,
          memberType: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ListMemberships" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListMembershipsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ username: S.String, email: S.String })).annotate({
        identifier: "UserMetadata",
      });
    case 2:
      return S.Union([/*@__PURE__*/ S.Struct({ user: __S(1409, __c88, 1) })]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          membershipId: S.String,
          applicationId: S.String,
          agentSpaceId: S.String,
          memberType: S.String,
          config: S.optional(__S(769, __c48, 1)),
          metadata: S.optional(__S(1410, __c88, 2)),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          createdBy: S.String,
          updatedBy: S.String,
        }),
      ).annotate({ identifier: "MembershipSummary" });
    case 4:
      return S.Array(__S(1411, __c88, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ membershipSummaries: __S(1412, __c88, 4), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListMembershipsResponse" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number),
          pentestId: S.String,
          agentSpaceId: S.String,
          nextToken: S.optional(S.String),
          jobType: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListPentestJobsForPentest" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPentestJobsForPentestInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          pentestJobId: S.String,
          pentestId: S.String,
          title: S.optional(S.String),
          status: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          jobType: S.optional(S.String),
          reportUrl: S.optional(S.String),
        }),
      ).annotate({ identifier: "PentestJobSummary" });
    case 2:
      return S.Array(__S(1425, __c89, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          pentestJobSummaries: S.optional(__S(1426, __c89, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPentestJobsForPentestOutput" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String,
          maxResults: S.optional(S.Number),
          pentestJobId: S.optional(S.String),
          stepName: S.optional(S.String),
          categoryName: S.optional(S.String),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListPentestJobTasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPentestJobTasksInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          taskId: S.String,
          pentestId: S.optional(S.String),
          pentestJobId: S.optional(S.String),
          agentSpaceId: S.optional(S.String),
          title: S.optional(S.String),
          riskType: S.optional(S.String),
          executionStatus: S.optional(S.String),
          taskHours: S.optional(S.Number),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "TaskSummary" });
    case 2:
      return S.Array(__S(1441, __c90, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          taskSummaries: S.optional(__S(1442, __c90, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPentestJobTasksOutput" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          agentSpaceId: S.String,
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ListPentests" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListPentestsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          pentestId: S.String,
          agentSpaceId: S.String,
          title: S.String,
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "PentestSummary" });
    case 2:
      return S.Array(__S(1457, __c91, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          pentestSummaries: S.optional(__S(1458, __c91, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPentestsOutput" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String,
          artifactContent: T.Blob,
          artifactType: S.String,
          fileName: S.String,
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/AddArtifact" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AddArtifactInput" });
    case 1:
      return S.suspend(() => S.Struct({ artifactId: S.String })).annotate({
        identifier: "AddArtifactOutput",
      });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ uri: S.optional(S.String) })).annotate({
        identifier: "Endpoint",
      });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ maxResults: S.optional(S.Number), nextToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListPrivateConnections" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPrivateConnectionsInput" });
    case 1:
      return S.Array(__S(832, __c52, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ privateConnections: __S(1505, __c94, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPrivateConnectionsOutput" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ managementType: S.optional(S.String), status: S.optional(S.String) }),
      ).annotate({ identifier: "ListSecurityRequirementPackFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          filter: S.optional(__S(1520, __c95, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListSecurityRequirementPacks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSecurityRequirementPacksInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          packId: S.String,
          name: S.String,
          description: S.optional(S.String),
          vendorName: S.optional(S.String),
          managementType: S.String,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "SecurityRequirementPackSummary" });
    case 3:
      return S.Array(__S(1522, __c95, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          securityRequirementPackSummaries: __S(1523, __c95, 3),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListSecurityRequirementPacksOutput" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          packId: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListSecurityRequirements" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSecurityRequirementsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          packId: S.String,
          name: S.String,
          description: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "SecurityRequirementSummary" });
    case 2:
      return S.Array(__S(1537, __c96, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          securityRequirementSummaries: __S(1538, __c96, 2),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListSecurityRequirementsOutput" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(640, __c40, 0)) })).annotate({
        identifier: "ListTagsForResourceOutput",
      });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), maxResults: S.optional(S.Number) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListTargetDomains" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTargetDomainsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          targetDomainId: S.String,
          domainName: S.String,
          verificationStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "TargetDomainSummary" });
    case 2:
      return S.Array(__S(1569, __c98, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          targetDomainSummaries: S.optional(__S(1570, __c98, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListTargetDomainsOutput" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number),
          threatModelId: S.String,
          agentSpaceId: S.String,
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListThreatModelJobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListThreatModelJobsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          threatModelJobId: S.String,
          threatModelId: S.String,
          agentSpaceId: S.optional(S.String),
          title: S.optional(S.String),
          status: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ThreatModelJobSummary" });
    case 2:
      return S.Array(__S(1585, __c99, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          threatModelJobSummaries: S.optional(__S(1586, __c99, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListThreatModelJobsOutput" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String,
          maxResults: S.optional(S.Number),
          threatModelJobId: S.String,
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListThreatModelJobTasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListThreatModelJobTasksInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          taskId: S.String,
          threatModelId: S.optional(S.String),
          threatModelJobId: S.optional(S.String),
          agentSpaceId: S.optional(S.String),
          title: S.optional(S.String),
          executionStatus: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ThreatModelJobTaskSummary" });
    case 2:
      return S.Array(__S(1601, __c100, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          threatModelJobTaskSummaries: S.optional(__S(1602, __c100, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListThreatModelJobTasksOutput" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          agentSpaceId: S.String,
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ListThreatModels" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListThreatModelsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          threatModelId: S.String,
          agentSpaceId: S.String,
          title: S.String,
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ThreatModelSummary" });
    case 2:
      return S.Array(__S(1617, __c101, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          threatModelSummaries: S.optional(__S(1618, __c101, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListThreatModelsOutput" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          threatJobId: S.String,
          agentSpaceId: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ListThreats" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListThreatsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          threatId: S.optional(S.String),
          threatJobId: S.optional(S.String),
          title: S.optional(S.String),
          statement: S.optional(S.String),
          severity: S.optional(S.String),
          status: S.optional(S.String),
          stride: S.optional(__S(80, __c5, 0)),
          createdBy: S.optional(S.String),
          updatedBy: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ThreatSummary" });
    case 2:
      return S.Array(__S(1633, __c102, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ threats: S.optional(__S(1634, __c102, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListThreatsOutput" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String,
          pentestJobId: S.optional(S.String),
          codeReviewJobId: S.optional(S.String),
          findingIds: __S(1888, __c118, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/StartCodeRemediation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartCodeRemediationInput" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.String,
          domain: S.String,
          evaluation: S.String,
          remediation: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateSecurityRequirementEntry" });
    case 1:
      return S.Array(__S(1664, __c104, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ packId: S.String, securityRequirements: __S(1665, __c104, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/BatchCreateSecurityRequirements" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchCreateSecurityRequirementsInput" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ securityRequirementName: S.String, code: S.String, message: S.String }),
      ).annotate({ identifier: "BatchSecurityRequirementError" });
    case 1:
      return S.Array(__S(1680, __c105, 0));
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          packId: S.String,
          name: S.String,
          description: S.String,
          domain: S.String,
          evaluation: S.String,
          remediation: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "BatchCreateSecurityRequirementResult" });
    case 1:
      return S.Array(__S(1696, __c106, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ securityRequirements: __S(1697, __c106, 1), errors: __S(1681, __c105, 1) }),
      ).annotate({ identifier: "BatchCreateSecurityRequirementsOutput" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ s3Uri: S.String })]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String,
          codeReviewId: S.String,
          diffSource: S.optional(__S(1712, __c107, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/StartCodeReviewJob" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartCodeReviewJobInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          title: S.optional(S.String),
          status: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          codeReviewId: S.String,
          codeReviewJobId: S.String,
          agentSpaceId: S.optional(S.String),
        }),
      ).annotate({ identifier: "StartCodeReviewJobOutput" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String,
          pentestId: S.String,
          jobType: S.optional(S.String),
          selectedFindingIds: S.optional(__S(1888, __c118, 0)),
          scopeChanges: S.optional(__S(433, __c27, 1)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/StartPentestJob" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartPentestJobInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          title: S.optional(S.String),
          status: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          pentestId: S.optional(S.String),
          pentestJobId: S.optional(S.String),
          agentSpaceId: S.optional(S.String),
        }),
      ).annotate({ identifier: "StartPentestJobOutput" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agentSpaceId: S.String, threatModelId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/StartThreatModelJob" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartThreatModelJobInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          title: S.optional(S.String),
          status: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          threatModelId: S.optional(S.String),
          threatModelJobId: S.String,
          agentSpaceId: S.optional(S.String),
        }),
      ).annotate({ identifier: "StartThreatModelJobOutput" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agentSpaceId: S.String, codeReviewJobId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/StopCodeReviewJob" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopCodeReviewJobInput" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agentSpaceId: S.String, pentestJobId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/StopPentestJob" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopPentestJobInput" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agentSpaceId: S.String, threatModelJobId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/StopThreatModelJob" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopThreatModelJobInput" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(640, __c40, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(1888, __c118, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String,
          name: S.optional(S.String),
          description: S.optional(S.String),
          awsResources: S.optional(__S(257, __c16, 1)),
          targetDomainIds: S.optional(__S(1888, __c118, 0)),
          codeReviewSettings: S.optional(__S(258, __c16, 2)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/UpdateAgentSpace" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateAgentSpaceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String,
          name: S.String,
          description: S.optional(S.String),
          awsResources: S.optional(__S(257, __c16, 1)),
          targetDomainIds: S.optional(__S(1888, __c118, 0)),
          codeReviewSettings: S.optional(__S(258, __c16, 2)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "UpdateAgentSpaceOutput" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationId: S.String,
          roleArn: S.optional(S.String),
          defaultKmsKeyId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateApplication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateApplicationRequest" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ codeReviewIds: __S(1888, __c118, 0), agentSpaceId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/BatchDeleteCodeReviews" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchDeleteCodeReviewsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ codeReviewId: S.optional(S.String), reason: S.optional(S.String) }),
      ).annotate({ identifier: "DeleteCodeReviewFailure" });
    case 2:
      return S.Array(__S(1873, __c117, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          deleted: S.optional(__S(1888, __c118, 0)),
          failed: S.optional(__S(1874, __c117, 2)),
        }),
      ).annotate({ identifier: "BatchDeleteCodeReviewsOutput" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          codeReviewId: S.String,
          agentSpaceId: S.String,
          title: S.optional(S.String),
          assets: S.optional(__S(96, __c6, 0)),
          serviceRole: S.optional(S.String),
          logConfig: S.optional(__S(32, __c2, 0)),
          codeRemediationStrategy: S.optional(S.String),
          validationMode: S.optional(S.String),
          maxTaskHours: S.optional(S.Number),
          reportDestination: S.optional(__S(55, __c3, 7)),
          reportFilters: S.optional(__S(112, __c7, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/UpdateCodeReview" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateCodeReviewInput" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          findingId: S.String,
          agentSpaceId: S.String,
          name: S.optional(S.String),
          description: S.optional(S.String),
          riskType: S.optional(S.String),
          riskLevel: S.optional(S.String),
          riskScore: S.optional(S.String),
          attackScript: S.optional(S.String),
          reasoning: S.optional(S.String),
          status: S.optional(S.String),
          customerNote: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/UpdateFinding" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateFindingInput" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, owner: S.String })).annotate({
        identifier: "GitHubRepositoryResource",
      });
    case 1:
      return S.suspend(() => S.Struct({ name: S.String, namespace: S.String })).annotate({
        identifier: "GitLabRepositoryResource",
      });
    case 2:
      return S.suspend(() => S.Struct({ name: S.String, workspace: S.String })).annotate({
        identifier: "BitbucketRepositoryResource",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          spaceKey: S.String,
          pageId: S.String,
          title: S.optional(S.String),
          spaceTitle: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConfluenceDocumentResource" });
    case 4:
      return S.suspend(() =>
        S.Struct({ name: S.String, organization: S.String, project: S.optional(S.String) }),
      ).annotate({ identifier: "AzureDevOpsRepositoryResource" });
    case 5:
      return S.Union([
        /*@__PURE__*/ S.Struct({ githubRepository: __S(1936, __c121, 0) }),
        /*@__PURE__*/ S.Struct({ gitlabRepository: __S(1937, __c121, 1) }),
        /*@__PURE__*/ S.Struct({ bitbucketRepository: __S(1938, __c121, 2) }),
        /*@__PURE__*/ S.Struct({ confluenceDocument: __S(1939, __c121, 3) }),
        /*@__PURE__*/ S.Struct({ azureDevOpsRepository: __S(1940, __c121, 4) }),
      ]);
    case 6:
      return S.suspend(() =>
        S.Struct({ resource: __S(1941, __c121, 5), capabilities: S.optional(__S(1382, __c86, 6)) }),
      ).annotate({ identifier: "IntegratedResourceInputItem" });
    case 7:
      return S.Array(__S(1942, __c121, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          agentSpaceId: S.String,
          integrationId: S.String,
          items: __S(1943, __c121, 7),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateIntegratedResources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateIntegratedResourcesInput" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ integrationId: S.String, webhookAction: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateIntegration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateIntegrationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          integrationId: S.String,
          webhookUrl: S.optional(S.String),
          secret: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "UpdateIntegrationOutput" });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          pentestId: S.String,
          agentSpaceId: S.String,
          title: S.optional(S.String),
          assets: S.optional(__S(96, __c6, 0)),
          excludeRiskTypes: S.optional(__S(80, __c5, 0)),
          serviceRole: S.optional(S.String),
          logConfig: S.optional(__S(32, __c2, 0)),
          vpcConfig: S.optional(__S(16, __c1, 0)),
          networkTrafficConfig: S.optional(__S(146, __c9, 2)),
          codeRemediationStrategy: S.optional(S.String),
          disableManagedSkills: S.optional(__S(80, __c5, 0)),
          maxTaskHours: S.optional(S.Number),
          reportDestination: S.optional(__S(55, __c3, 7)),
          reportFilters: S.optional(__S(112, __c7, 0)),
          cicdConfiguration: S.optional(__S(147, __c9, 3)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/UpdatePentest" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdatePentestInput" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ privateConnectionName: S.String, certificate: SensitiveString }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdatePrivateConnectionCertificate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePrivateConnectionCertificateInput" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          packId: S.String,
          name: S.optional(S.String),
          description: S.optional(S.String),
          status: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateSecurityRequirementPack" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSecurityRequirementPackInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          packId: S.String,
          name: S.optional(S.String),
          description: S.optional(S.String),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateSecurityRequirementPackOutput" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ targetDomainId: S.String, verificationMethod: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateTargetDomain" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateTargetDomainInput" });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          threatId: S.String,
          agentSpaceId: S.String,
          title: S.optional(S.String),
          status: S.optional(S.String),
          comments: S.optional(S.String),
          statement: S.optional(S.String),
          severity: S.optional(S.String),
          threatSource: S.optional(S.String),
          prerequisites: S.optional(S.String),
          threatAction: S.optional(S.String),
          threatImpact: S.optional(S.String),
          impactedGoal: S.optional(__S(1888, __c118, 0)),
          impactedAssets: S.optional(__S(1888, __c118, 0)),
          anchor: S.optional(__S(592, __c37, 0)),
          evidence: S.optional(__S(594, __c37, 2)),
          recommendation: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/UpdateThreat" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateThreatInput" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          threatModelId: S.String,
          agentSpaceId: S.String,
          title: S.optional(S.String),
          description: S.optional(S.String),
          assets: S.optional(__S(96, __c6, 0)),
          scopeDocs: S.optional(__S(50, __c3, 2)),
          serviceRole: S.optional(S.String),
          logConfig: S.optional(__S(32, __c2, 0)),
          reportDestination: S.optional(__S(55, __c3, 7)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateThreatModel" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateThreatModelInput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
