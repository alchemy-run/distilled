import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "SecurityAgent",
  target: "SecurityAgent",
  version: "2025-09-06",
  sigv4: "securityagent",
  protocol: restJson1Protocol,
  rules: (p, _) => {
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
        return err(
          "Invalid Configuration: FIPS and custom endpoint are not supported",
        );
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
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{
    readonly message: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError("ValidationException")<{
    readonly message: string;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
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
export type CreateSecurityRequirementEntryList =
  CreateSecurityRequirementEntry[];
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
export type BatchCreateSecurityRequirementResultList =
  BatchCreateSecurityRequirementResult[];
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
  | {
      inlinePem: string | redacted.Redacted<string>;
      artifactId?: never;
      s3Location?: never;
    }
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
export type CleanUpStrategy =
  | "BEST_EFFORT_DELETE"
  | "RETAIN_ALL"
  | (string & {});
export type SkillType =
  | "FINDING_PERSONALIZATION"
  | "LOGIN_OPTIMIZATION"
  | (string & {});
export type SkillTypeList = SkillType[];
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
export type ContextType =
  | "ERROR"
  | "CLIENT_ERROR"
  | "WARNING"
  | "INFO"
  | (string & {});
export interface ExecutionContext {
  contextType?: ContextType;
  context?: string;
  timestamp?: Date;
}
export type ExecutionContextList = ExecutionContext[];
export type ErrorCode =
  | "CLIENT_ERROR"
  | "INTERNAL_ERROR"
  | "STOPPED_BY_USER"
  | (string & {});
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
export type TaskExecutionStatus =
  | "IN_PROGRESS"
  | "ABORTED"
  | "COMPLETED"
  | "INTERNAL_ERROR"
  | "FAILED"
  | (string & {});
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
export type FindingStatus =
  | "ACTIVE"
  | "RESOLVED"
  | "ACCEPTED"
  | "FALSE_POSITIVE"
  | (string & {});
export type RiskLevel =
  | "UNKNOWN"
  | "INFORMATIONAL"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL"
  | (string & {});
export type ConfidenceLevel =
  | "FALSE_POSITIVE"
  | "UNCONFIRMED"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | (string & {});
export type ValidationStatus =
  | "CONFIRMED"
  | "NOT_REPRODUCED"
  | "VALIDATION_FAILED"
  | "VALIDATING"
  | "NOT_VALIDATED"
  | (string & {});
export type CodeRemediationTaskStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
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
export type JobType = "FULL" | "REVALIDATION" | (string & {});
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
export type BatchGetSecurityRequirementResultList =
  BatchGetSecurityRequirementResult[];
export interface BatchGetSecurityRequirementsOutput {
  securityRequirements: BatchGetSecurityRequirementResult[];
  errors: BatchSecurityRequirementError[];
}
export interface BatchGetTargetDomainsInput {
  targetDomainIds: string[];
}
export type TargetDomainId = string;
export type TargetDomainStatus =
  | "PENDING"
  | "VERIFIED"
  | "FAILED"
  | "UNREACHABLE"
  | (string & {});
export type DomainVerificationMethod =
  | "DNS_TXT"
  | "HTTP_ROUTE"
  | "PRIVATE_VPC"
  | (string & {});
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
export type ThreatSeverity =
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | "INFO"
  | (string & {});
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
export type UpdateSecurityRequirementEntryList =
  UpdateSecurityRequirementEntry[];
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
}
export type Provider =
  | "GITHUB"
  | "GITLAB"
  | "BITBUCKET"
  | "CONFLUENCE"
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
export type ProviderInput =
  | {
      github: GitHubIntegrationInput;
      gitlab?: never;
      bitbucket?: never;
      confluence?: never;
    }
  | {
      github?: never;
      gitlab: GitLabIntegrationInput;
      bitbucket?: never;
      confluence?: never;
    }
  | {
      github?: never;
      gitlab?: never;
      bitbucket: BitbucketIntegrationInput;
      confluence?: never;
    }
  | {
      github?: never;
      gitlab?: never;
      bitbucket?: never;
      confluence: ConfluenceIntegrationInput;
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
export type PrivateConnectionType =
  | "SERVICE_MANAGED"
  | "SELF_MANAGED"
  | (string & {});
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
export type SecurityRequirementPackStatus =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
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
export interface ReportDestination {
  integrationId: string;
  containerId: string;
  parentId?: string;
  documentId?: string;
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
export type SecurityRequirementDocumentContent =
  | Uint8Array
  | redacted.Redacted<Uint8Array>;
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
export interface InitiateProviderRegistrationInput {
  provider: Provider;
}
export type Location = string;
export interface InitiateProviderRegistrationOutput {
  redirectTo: string;
  csrfState: string;
}
export type NextToken = string;
export type MaxResults = number;
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
export type IntegratedResourceMetadata =
  | {
      githubRepository: GitHubRepositoryMetadata;
      gitlabRepository?: never;
      bitbucketRepository?: never;
      confluenceDocument?: never;
    }
  | {
      githubRepository?: never;
      gitlabRepository: GitLabRepositoryMetadata;
      bitbucketRepository?: never;
      confluenceDocument?: never;
    }
  | {
      githubRepository?: never;
      gitlabRepository?: never;
      bitbucketRepository: BitbucketRepositoryMetadata;
      confluenceDocument?: never;
    }
  | {
      githubRepository?: never;
      gitlabRepository?: never;
      bitbucketRepository?: never;
      confluenceDocument: ConfluenceDocumentMetadata;
    };
export interface GitHubResourceCapabilities {
  leaveComments?: boolean;
  remediateCode?: boolean;
}
export interface GitLabResourceCapabilities {
  leaveComments?: boolean;
  remediateCode?: boolean;
}
export interface BitbucketResourceCapabilities {
  leaveComments?: boolean;
  remediateCode?: boolean;
}
export interface ConfluenceResourceCapabilities {
  fetchDocument?: boolean;
  createDocument?: boolean;
  updateDocument?: boolean;
}
export type ProviderResourceCapabilities =
  | {
      github: GitHubResourceCapabilities;
      gitlab?: never;
      bitbucket?: never;
      confluence?: never;
    }
  | {
      github?: never;
      gitlab: GitLabResourceCapabilities;
      bitbucket?: never;
      confluence?: never;
    }
  | {
      github?: never;
      gitlab?: never;
      bitbucket: BitbucketResourceCapabilities;
      confluence?: never;
    }
  | {
      github?: never;
      gitlab?: never;
      bitbucket?: never;
      confluence: ConfluenceResourceCapabilities;
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
}
export interface PentestJobSummary {
  pentestJobId: string;
  pentestId: string;
  title?: string;
  status?: JobStatus;
  createdAt?: Date;
  updatedAt?: Date;
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
export type SecurityRequirementPackSummaryList =
  SecurityRequirementPackSummary[];
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
export type IntegratedResource =
  | {
      githubRepository: GitHubRepositoryResource;
      gitlabRepository?: never;
      bitbucketRepository?: never;
      confluenceDocument?: never;
    }
  | {
      githubRepository?: never;
      gitlabRepository: GitLabRepositoryResource;
      bitbucketRepository?: never;
      confluenceDocument?: never;
    }
  | {
      githubRepository?: never;
      gitlabRepository?: never;
      bitbucketRepository: BitbucketRepositoryResource;
      confluenceDocument?: never;
    }
  | {
      githubRepository?: never;
      gitlabRepository?: never;
      bitbucketRepository?: never;
      confluenceDocument: ConfluenceDocumentResource;
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
  descriptor: {
    service: svc,
    http: "POST /AddArtifact",
    input: {
      agentSpaceId: 0,
      artifactContent: 0,
      artifactType: 0,
      fileName: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /BatchCreateSecurityRequirements",
    input: {
      packId: 0,
      securityRequirements: D.list({
        name: 0,
        description: 0,
        domain: 0,
        evaluation: 0,
        remediation: 0,
      }),
    },
    output: {
      securityRequirements: D.list({ createdAt: D.ts, updatedAt: D.ts }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /BatchDeleteCodeReviews",
    input: { codeReviewIds: 0, agentSpaceId: 0 },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteCodeReviews",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /BatchDeletePentests",
    input: { pentestIds: 0, agentSpaceId: 0 },
    output: { deleted: D.list(o_Pentest) },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeletePentests",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /BatchDeleteSecurityRequirements",
    input: { packId: 0, securityRequirementNames: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /BatchDeleteThreatModels",
    input: { threatModelIds: 0, agentSpaceId: 0 },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteThreatModels",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /BatchGetAgentSpaces",
    input: { agentSpaceIds: 0 },
    output: { agentSpaces: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetAgentSpaces",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /BatchGetArtifactMetadata",
    input: { agentSpaceId: 0, artifactIds: 0 },
    output: { artifactMetadataList: D.list({ updatedAt: D.ts }) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /BatchGetCodeReviewJobs",
    input: { codeReviewJobIds: 0, agentSpaceId: 0 },
    output: {
      codeReviewJobs: D.list({
        steps: D.list(o_Step),
        executionContext: D.list(o_ExecutionContext),
        createdAt: D.ts,
        updatedAt: D.ts,
      }),
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetCodeReviewJobs",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /BatchGetCodeReviewJobTasks",
    input: { agentSpaceId: 0, codeReviewJobTaskIds: 0 },
    output: {
      codeReviewJobTasks: D.list({ createdAt: D.ts, updatedAt: D.ts }),
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetCodeReviewJobTasks",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /BatchGetCodeReviews",
    input: { codeReviewIds: 0, agentSpaceId: 0 },
    output: {
      codeReviews: D.list({
        assets: o_Assets,
        createdAt: D.ts,
        updatedAt: D.ts,
      }),
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetCodeReviews",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /BatchGetFindings",
    input: { findingIds: 0, agentSpaceId: 0 },
    output: { findings: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetFindings",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /BatchGetPentestJobs",
    input: { pentestJobIds: 0, agentSpaceId: 0 },
    output: {
      pentestJobs: D.list({
        actors: D.list(o_Actor),
        steps: D.list(o_Step),
        executionContext: D.list(o_ExecutionContext),
        trustedCaCertificates: D.list(o_TrustedCaCertificate),
        createdAt: D.ts,
        updatedAt: D.ts,
      }),
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetPentestJobs",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /BatchGetPentestJobTasks",
    input: { agentSpaceId: 0, taskIds: 0 },
    output: { tasks: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetPentestJobTasks",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /BatchGetPentests",
    input: { pentestIds: 0, agentSpaceId: 0 },
    output: { pentests: D.list(o_Pentest) },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetPentests",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /BatchGetSecurityRequirements",
    input: { packId: 0, securityRequirementNames: 0 },
    output: {
      securityRequirements: D.list({ createdAt: D.ts, updatedAt: D.ts }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /BatchGetTargetDomains",
    input: { targetDomainIds: 0 },
    output: { targetDomains: D.list({ createdAt: D.ts, verifiedAt: D.ts }) },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetTargetDomains",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /BatchGetThreatModelJobs",
    input: { threatModelJobIds: 0, agentSpaceId: 0 },
    output: {
      threatModelJobs: D.list({
        createdAt: D.ts,
        updatedAt: D.ts,
        executionStartTime: D.ts,
        executionEndTime: D.ts,
      }),
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetThreatModelJobs",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /BatchGetThreatModelJobTasks",
    input: { agentSpaceId: 0, threatModelJobTaskIds: 0 },
    output: {
      threatModelJobTasks: D.list({ createdAt: D.ts, updatedAt: D.ts }),
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetThreatModelJobTasks",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /BatchGetThreatModels",
    input: { threatModelIds: 0, agentSpaceId: 0 },
    output: {
      threatModels: D.list({
        assets: o_Assets,
        createdAt: D.ts,
        updatedAt: D.ts,
      }),
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetThreatModels",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /BatchGetThreats",
    input: { threatIds: 0, agentSpaceId: 0 },
    output: { threats: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetThreats",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /BatchUpdateSecurityRequirements",
    input: {
      packId: 0,
      securityRequirements: D.list({
        name: 0,
        description: 0,
        domain: 0,
        evaluation: 0,
        remediation: 0,
      }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /CreateAgentSpace",
    input: {
      name: 0,
      description: 0,
      awsResources: i_AWSResources,
      targetDomainIds: 0,
      codeReviewSettings: i_CodeReviewSettings,
      kmsKeyId: 0,
      tags: 0,
    },
    output: { createdAt: D.ts, updatedAt: D.ts },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAgentSpace",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /CreateApplication",
    input: { idcInstanceArn: 0, roleArn: 0, defaultKmsKeyId: 0, tags: 0 },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /CreateCodeReview",
    input: {
      title: 0,
      agentSpaceId: 0,
      assets: i_Assets,
      serviceRole: 0,
      logConfig: i_CloudWatchLog,
      codeRemediationStrategy: 0,
      validationMode: 0,
      maxTaskHours: 0,
    },
    output: { createdAt: D.ts, updatedAt: D.ts, assets: o_Assets },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCodeReview",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /CreateIntegration",
    input: {
      provider: 0,
      input: {
        github: {
          code: 0,
          state: 0,
          organizationName: 0,
          targetUrl: 0,
          installationId: 0,
        },
        gitlab: { accessToken: 0, targetUrl: 0, tokenType: 0, groupId: 0 },
        bitbucket: { installationId: 0, workspace: 0, code: 0, state: 0 },
        confluence: { installationId: 0, code: 0, state: 0, siteUrl: 0 },
      },
      integrationDisplayName: 0,
      kmsKeyId: 0,
      tags: 0,
      privateConnectionName: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /CreateMembership",
    input: {
      applicationId: 0,
      agentSpaceId: 0,
      membershipId: 0,
      memberType: 0,
      config: { user: { role: 0 } },
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMembership",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /CreatePentest",
    input: {
      title: 0,
      agentSpaceId: 0,
      assets: i_Assets,
      excludeRiskTypes: 0,
      serviceRole: 0,
      logConfig: i_CloudWatchLog,
      vpcConfig: i_VpcConfig,
      networkTrafficConfig: i_NetworkTrafficConfig,
      codeRemediationStrategy: 0,
      disableManagedSkills: 0,
      maxTaskHours: 0,
    },
    output: { createdAt: D.ts, updatedAt: D.ts, assets: o_Assets },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePentest",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /CreatePrivateConnection",
    input: {
      privateConnectionName: 0,
      mode: {
        serviceManaged: {
          hostAddress: 0,
          vpcId: 0,
          subnetIds: 0,
          securityGroupIds: 0,
          ipAddressType: 0,
          ipv4AddressesPerEni: 0,
          portRanges: 0,
          certificate: 0,
          dnsResolution: 0,
        },
        selfManaged: { resourceConfigurationId: 0, certificate: 0 },
      },
      tags: 0,
    },
    output: { certificateExpiryTime: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /CreateSecurityRequirementPack",
    input: { name: 0, description: 0, status: 0, kmsKeyId: 0, tags: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /CreateTargetDomain",
    input: { targetDomainName: 0, verificationMethod: 0, tags: 0 },
    output: { createdAt: D.ts, verifiedAt: D.ts },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTargetDomain",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /CreateThreat",
    input: {
      agentSpaceId: 0,
      threatJobId: 0,
      title: 0,
      statement: 0,
      severity: 0,
      comments: 0,
      stride: 0,
      threatSource: 0,
      prerequisites: 0,
      threatAction: 0,
      threatImpact: 0,
      impactedGoal: 0,
      impactedAssets: 0,
      anchor: i_ThreatAnchorShape,
      evidence: D.list(i_ThreatEvidenceShape),
      recommendation: 0,
    },
    output: { createdAt: D.ts, updatedAt: D.ts },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateThreat",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /CreateThreatModel",
    input: {
      title: 0,
      agentSpaceId: 0,
      description: 0,
      assets: i_Assets,
      scopeDocs: D.list(i_DocumentInfo),
      serviceRole: 0,
      logConfig: i_CloudWatchLog,
      reportDestination: {
        integrationId: 0,
        containerId: 0,
        parentId: 0,
        documentId: 0,
      },
    },
    output: { assets: o_Assets, createdAt: D.ts, updatedAt: D.ts },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateThreatModel",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /DeleteAgentSpace",
    input: { agentSpaceId: 0 },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAgentSpace",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /DeleteApplication",
    input: { applicationId: 0 },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /DeleteArtifact",
    input: { agentSpaceId: 0, artifactId: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /DeleteIntegration",
    input: { integrationId: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /DeleteMembership",
    input: {
      applicationId: 0,
      agentSpaceId: 0,
      membershipId: 0,
      memberType: 0,
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMembership",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /DeletePrivateConnection",
    input: { privateConnectionName: 0 },
    output: { certificateExpiryTime: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /DeleteSecurityRequirementPack",
    input: { packId: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /DeleteTargetDomain",
    input: { targetDomainId: 0 },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTargetDomain",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /DescribePrivateConnection",
    input: { privateConnectionName: 0 },
    output: { certificateExpiryTime: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /GetApplication",
    input: { applicationId: 0 },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplication",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /GetArtifact",
    input: { agentSpaceId: 0, artifactId: 0 },
    output: { updatedAt: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /GetIntegration",
    input: { integrationId: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /GetSecurityRequirementPack",
    input: { packId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /ImportSecurityRequirements",
    input: {
      packId: 0,
      input: { documents: D.list({ name: 0, format: 0, content: 0 }) },
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /oauth2/provider/register",
    input: { provider: 0 },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListAgentSpaces",
    input: { nextToken: 0, maxResults: 0 },
    output: {
      agentSpaceSummaries: D.list({ createdAt: D.ts, updatedAt: D.ts }),
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListApplications",
    input: { nextToken: 0, maxResults: 0 },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListArtifacts",
    input: { agentSpaceId: 0, nextToken: 0, maxResults: 0 },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListCodeReviewJobsForCodeReview",
    input: { maxResults: 0, codeReviewId: 0, agentSpaceId: 0, nextToken: 0 },
    output: {
      codeReviewJobSummaries: D.list({ createdAt: D.ts, updatedAt: D.ts }),
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListCodeReviewJobTasks",
    input: {
      agentSpaceId: 0,
      maxResults: 0,
      codeReviewJobId: 0,
      stepName: 0,
      categoryName: 0,
      nextToken: 0,
    },
    output: {
      codeReviewJobTaskSummaries: D.list({ createdAt: D.ts, updatedAt: D.ts }),
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListCodeReviews",
    input: { maxResults: 0, nextToken: 0, agentSpaceId: 0 },
    output: {
      codeReviewSummaries: D.list({ createdAt: D.ts, updatedAt: D.ts }),
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListDiscoveredEndpoints",
    input: {
      maxResults: 0,
      pentestJobId: 0,
      agentSpaceId: 0,
      prefix: 0,
      nextToken: 0,
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListFindings",
    input: {
      maxResults: 0,
      pentestJobId: 0,
      codeReviewJobId: 0,
      agentSpaceId: 0,
      nextToken: 0,
      riskType: 0,
      riskLevel: 0,
      status: 0,
      confidence: 0,
      name: 0,
    },
    output: { findingsSummaries: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListIntegratedResources",
    input: {
      agentSpaceId: 0,
      integrationId: 0,
      resourceType: 0,
      nextToken: 0,
      maxResults: 0,
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListIntegrations",
    input: {
      filter: { provider: 0, providerType: 0 },
      nextToken: 0,
      maxResults: 0,
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListMemberships",
    input: {
      applicationId: 0,
      agentSpaceId: 0,
      memberType: 0,
      maxResults: 0,
      nextToken: 0,
    },
    output: {
      membershipSummaries: D.list({ createdAt: D.ts, updatedAt: D.ts }),
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListPentestJobsForPentest",
    input: { maxResults: 0, pentestId: 0, agentSpaceId: 0, nextToken: 0 },
    output: {
      pentestJobSummaries: D.list({ createdAt: D.ts, updatedAt: D.ts }),
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListPentestJobTasks",
    input: {
      agentSpaceId: 0,
      maxResults: 0,
      pentestJobId: 0,
      stepName: 0,
      categoryName: 0,
      nextToken: 0,
    },
    output: { taskSummaries: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListPentests",
    input: { maxResults: 0, nextToken: 0, agentSpaceId: 0 },
    output: { pentestSummaries: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListPrivateConnections",
    input: { maxResults: 0, nextToken: 0 },
    output: { privateConnections: D.list({ certificateExpiryTime: D.ts }) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListSecurityRequirementPacks",
    input: {
      filter: { managementType: 0, status: 0 },
      nextToken: 0,
      maxResults: 0,
    },
    output: {
      securityRequirementPackSummaries: D.list({
        createdAt: D.ts,
        updatedAt: D.ts,
      }),
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListSecurityRequirements",
    input: { packId: 0, nextToken: 0, maxResults: 0 },
    output: {
      securityRequirementSummaries: D.list({
        createdAt: D.ts,
        updatedAt: D.ts,
      }),
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /ListTargetDomains",
    input: { nextToken: 0, maxResults: 0 },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListThreatModelJobs",
    input: { maxResults: 0, threatModelId: 0, agentSpaceId: 0, nextToken: 0 },
    output: {
      threatModelJobSummaries: D.list({ createdAt: D.ts, updatedAt: D.ts }),
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListThreatModelJobTasks",
    input: {
      agentSpaceId: 0,
      maxResults: 0,
      threatModelJobId: 0,
      nextToken: 0,
    },
    output: {
      threatModelJobTaskSummaries: D.list({ createdAt: D.ts, updatedAt: D.ts }),
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListThreatModels",
    input: { maxResults: 0, nextToken: 0, agentSpaceId: 0 },
    output: {
      threatModelSummaries: D.list({ createdAt: D.ts, updatedAt: D.ts }),
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /ListThreats",
    input: { threatJobId: 0, agentSpaceId: 0, nextToken: 0, maxResults: 0 },
    output: { threats: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /StartCodeRemediation",
    input: {
      agentSpaceId: 0,
      pentestJobId: 0,
      codeReviewJobId: 0,
      findingIds: 0,
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCodeRemediation",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /StartCodeReviewJob",
    input: { agentSpaceId: 0, codeReviewId: 0, diffSource: { s3Uri: 0 } },
    output: { createdAt: D.ts, updatedAt: D.ts },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCodeReviewJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /StartPentestJob",
    input: { agentSpaceId: 0, pentestId: 0, jobType: 0, selectedFindingIds: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartPentestJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /StartThreatModelJob",
    input: { agentSpaceId: 0, threatModelId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartThreatModelJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /StopCodeReviewJob",
    input: { agentSpaceId: 0, codeReviewJobId: 0 },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopCodeReviewJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /StopPentestJob",
    input: { agentSpaceId: 0, pentestJobId: 0 },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopPentestJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /StopThreatModelJob",
    input: { agentSpaceId: 0, threatModelJobId: 0 },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopThreatModelJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /UpdateAgentSpace",
    input: {
      agentSpaceId: 0,
      name: 0,
      description: 0,
      awsResources: i_AWSResources,
      targetDomainIds: 0,
      codeReviewSettings: i_CodeReviewSettings,
    },
    output: { createdAt: D.ts, updatedAt: D.ts },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAgentSpace",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /UpdateApplication",
    input: { applicationId: 0, roleArn: 0, defaultKmsKeyId: 0 },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /UpdateCodeReview",
    input: {
      codeReviewId: 0,
      agentSpaceId: 0,
      title: 0,
      assets: i_Assets,
      serviceRole: 0,
      logConfig: i_CloudWatchLog,
      codeRemediationStrategy: 0,
      validationMode: 0,
      maxTaskHours: 0,
    },
    output: { createdAt: D.ts, updatedAt: D.ts, assets: o_Assets },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCodeReview",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /UpdateFinding",
    input: {
      findingId: 0,
      agentSpaceId: 0,
      name: 0,
      description: 0,
      riskType: 0,
      riskLevel: 0,
      riskScore: 0,
      attackScript: 0,
      reasoning: 0,
      status: 0,
      customerNote: 0,
    },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFinding",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /UpdateIntegratedResources",
    input: {
      agentSpaceId: 0,
      integrationId: 0,
      items: D.list({
        resource: {
          githubRepository: { name: 0, owner: 0 },
          gitlabRepository: { name: 0, namespace: 0 },
          bitbucketRepository: { name: 0, workspace: 0 },
          confluenceDocument: {
            name: 0,
            spaceKey: 0,
            pageId: 0,
            title: 0,
            spaceTitle: 0,
          },
        },
        capabilities: {
          github: { leaveComments: 0, remediateCode: 0 },
          gitlab: { leaveComments: 0, remediateCode: 0 },
          bitbucket: { leaveComments: 0, remediateCode: 0 },
          confluence: {
            fetchDocument: 0,
            createDocument: 0,
            updateDocument: 0,
          },
        },
      }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /UpdatePentest",
    input: {
      pentestId: 0,
      agentSpaceId: 0,
      title: 0,
      assets: i_Assets,
      excludeRiskTypes: 0,
      serviceRole: 0,
      logConfig: i_CloudWatchLog,
      vpcConfig: i_VpcConfig,
      networkTrafficConfig: i_NetworkTrafficConfig,
      codeRemediationStrategy: 0,
      disableManagedSkills: 0,
      maxTaskHours: 0,
    },
    output: { createdAt: D.ts, updatedAt: D.ts, assets: o_Assets },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePentest",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /UpdatePrivateConnectionCertificate",
    input: { privateConnectionName: 0, certificate: 0 },
    output: { certificateExpiryTime: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /UpdateSecurityRequirementPack",
    input: { packId: 0, name: 0, description: 0, status: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /UpdateTargetDomain",
    input: { targetDomainId: 0, verificationMethod: 0 },
    output: { createdAt: D.ts, verifiedAt: D.ts },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTargetDomain",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /UpdateThreat",
    input: {
      threatId: 0,
      agentSpaceId: 0,
      title: 0,
      status: 0,
      comments: 0,
      statement: 0,
      severity: 0,
      threatSource: 0,
      prerequisites: 0,
      threatAction: 0,
      threatImpact: 0,
      impactedGoal: 0,
      impactedAssets: 0,
      anchor: i_ThreatAnchorShape,
      evidence: D.list(i_ThreatEvidenceShape),
      recommendation: 0,
    },
    output: { createdAt: D.ts, updatedAt: D.ts },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThreat",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /UpdateThreatModel",
    input: {
      threatModelId: 0,
      agentSpaceId: 0,
      title: 0,
      description: 0,
      assets: i_Assets,
      scopeDocs: D.list(i_DocumentInfo),
      serviceRole: 0,
      logConfig: i_CloudWatchLog,
    },
    output: { assets: o_Assets, createdAt: D.ts, updatedAt: D.ts },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThreatModel",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /VerifyTargetDomain",
    input: { targetDomainId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts, verifiedAt: D.ts },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifyTargetDomain",
})) as any;

const i_AWSResources: D.LazyStruct = () => ({
  vpcs: D.list(i_VpcConfig),
  logGroups: 0,
  s3Buckets: 0,
  secretArns: 0,
  lambdaFunctionArns: 0,
  iamRoles: 0,
});
const i_Assets: D.LazyStruct = () => ({
  endpoints: D.list({ uri: 0 }),
  actors: D.list({
    identifier: 0,
    uris: 0,
    authentication: { providerType: 0, value: 0 },
    description: 0,
    enableEmailMfa: 0,
    mfaForwardingAddress: 0,
  }),
  documents: D.list(i_DocumentInfo),
  sourceCode: D.list({ s3Location: 0 }),
  integratedRepositories: D.list({
    integrationId: 0,
    providerResourceId: 0,
    branch: 0,
  }),
  trustedCaCertificates: D.list({
    source: { inlinePem: 0, artifactId: 0, s3Location: 0 },
  }),
});
const i_CloudWatchLog: D.LazyStruct = () => ({ logGroup: 0, logStream: 0 });
const i_CodeReviewSettings: D.LazyStruct = () => ({
  controlsScanning: 0,
  generalPurposeScanning: 0,
});
const i_DocumentInfo: D.LazyStruct = () => ({
  s3Location: 0,
  artifactId: 0,
  integratedDocument: { integrationId: 0, resourceId: 0 },
});
const i_NetworkTrafficConfig: D.LazyStruct = () => ({
  rules: D.list({ effect: 0, pattern: 0, networkTrafficRuleType: 0 }),
  customHeaders: D.list({ name: 0, value: 0 }),
});
const i_ThreatAnchorShape: D.LazyStruct = () => ({
  kind: 0,
  id: 0,
  packageId: 0,
});
const i_ThreatEvidenceShape: D.LazyStruct = () => ({ packageId: 0, path: 0 });
const i_VpcConfig: D.LazyStruct = () => ({
  vpcArn: 0,
  securityGroupArns: 0,
  subnetArns: 0,
});
const o_Actor: D.LazyStruct = () => ({ mfaForwardingAddress: D.secret });
const o_Assets: D.LazyStruct = () => ({
  actors: D.list(o_Actor),
  trustedCaCertificates: D.list(o_TrustedCaCertificate),
});
const o_ExecutionContext: D.LazyStruct = () => ({ timestamp: D.ts });
const o_Pentest: D.LazyStruct = () => ({
  assets: o_Assets,
  createdAt: D.ts,
  updatedAt: D.ts,
});
const o_Step: D.LazyStruct = () => ({ createdAt: D.ts, updatedAt: D.ts });
const o_TrustedCaCertificate: D.LazyStruct = () => ({
  source: { inlinePem: D.secret },
});
