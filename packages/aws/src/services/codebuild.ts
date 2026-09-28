import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "CodeBuild",
  target: "CodeBuild_20161006",
  version: "2016-10-06",
  sigv4: "codebuild",
  protocol: awsJson1_1Protocol,
  rules: (p, _) => {
    const { Region, UseDualStack = false, UseFIPS = false, Endpoint } = p;
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
      if (UseDualStack === true) {
        return err(
          "Invalid Configuration: Dualstack and custom endpoint are not supported",
        );
      }
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://codebuild-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://codebuild-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://codebuild.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://codebuild.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccountLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("AccountLimitExceededException")<{
    readonly message?: string;
  }> {}
export class AccountSuspendedException
  extends /*@__PURE__*/ TE.TaggedError("AccountSuspendedException")<{
    readonly message?: string;
  }> {}
export class InvalidInputException
  extends /*@__PURE__*/ TE.TaggedError("InvalidInputException")<{
    readonly message?: string;
  }> {}
export class OAuthProviderException
  extends /*@__PURE__*/ TE.TaggedError("OAuthProviderException")<{
    readonly message?: string;
  }> {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError("ResourceAlreadyExistsException", [
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException")<{
    readonly message?: string;
  }> {}
export type NonEmptyString = string;
export type BuildIds = string[];
export interface BatchDeleteBuildsInput {
  ids: string[];
}
export interface BuildNotDeleted {
  id?: string;
  statusCode?: string;
}
export type BuildsNotDeleted = BuildNotDeleted[];
export interface BatchDeleteBuildsOutput {
  buildsDeleted?: string[];
  buildsNotDeleted?: BuildNotDeleted[];
}
export type BuildBatchIds = string[];
export interface BatchGetBuildBatchesInput {
  ids: string[];
}
export type StatusType =
  | "SUCCEEDED"
  | "FAILED"
  | "FAULT"
  | "TIMED_OUT"
  | "IN_PROGRESS"
  | "STOPPED"
  | (string & {});
export type BuildBatchPhaseType =
  | "SUBMITTED"
  | "DOWNLOAD_BATCHSPEC"
  | "IN_PROGRESS"
  | "COMBINE_ARTIFACTS"
  | "SUCCEEDED"
  | "FAILED"
  | "STOPPED"
  | (string & {});
export interface PhaseContext {
  statusCode?: string;
  message?: string;
}
export type PhaseContexts = PhaseContext[];
export interface BuildBatchPhase {
  phaseType?: BuildBatchPhaseType;
  phaseStatus?: StatusType;
  startTime?: Date;
  endTime?: Date;
  durationInSeconds?: number;
  contexts?: PhaseContext[];
}
export type BuildBatchPhases = BuildBatchPhase[];
export type SourceType =
  | "CODECOMMIT"
  | "CODEPIPELINE"
  | "GITHUB"
  | "GITLAB"
  | "GITLAB_SELF_MANAGED"
  | "S3"
  | "BITBUCKET"
  | "GITHUB_ENTERPRISE"
  | "NO_SOURCE"
  | (string & {});
export type GitCloneDepth = number;
export interface GitSubmodulesConfig {
  fetchSubmodules: boolean;
}
export type SourceAuthType =
  | "OAUTH"
  | "CODECONNECTIONS"
  | "SECRETS_MANAGER"
  | (string & {});
export interface SourceAuth {
  type: SourceAuthType;
  resource?: string;
}
export interface BuildStatusConfig {
  context?: string;
  targetUrl?: string;
}
export interface ProjectSource {
  type: SourceType;
  location?: string;
  gitCloneDepth?: number;
  gitSubmodulesConfig?: GitSubmodulesConfig;
  buildspec?: string;
  auth?: SourceAuth;
  reportBuildStatus?: boolean;
  buildStatusConfig?: BuildStatusConfig;
  insecureSsl?: boolean;
  sourceIdentifier?: string;
}
export type ProjectSources = ProjectSource[];
export interface ProjectSourceVersion {
  sourceIdentifier: string;
  sourceVersion: string;
}
export type ProjectSecondarySourceVersions = ProjectSourceVersion[];
export type BucketOwnerAccess = "NONE" | "READ_ONLY" | "FULL" | (string & {});
export interface BuildArtifacts {
  location?: string;
  sha256sum?: string;
  md5sum?: string;
  overrideArtifactName?: boolean;
  encryptionDisabled?: boolean;
  artifactIdentifier?: string;
  bucketOwnerAccess?: BucketOwnerAccess;
}
export type BuildArtifactsList = BuildArtifacts[];
export type CacheType = "NO_CACHE" | "S3" | "LOCAL" | (string & {});
export type CacheMode =
  | "LOCAL_DOCKER_LAYER_CACHE"
  | "LOCAL_SOURCE_CACHE"
  | "LOCAL_CUSTOM_CACHE"
  | (string & {});
export type ProjectCacheModes = CacheMode[];
export interface ProjectCache {
  type: CacheType;
  location?: string;
  modes?: CacheMode[];
  cacheNamespace?: string;
}
export type EnvironmentType =
  | "WINDOWS_CONTAINER"
  | "LINUX_CONTAINER"
  | "LINUX_GPU_CONTAINER"
  | "ARM_CONTAINER"
  | "WINDOWS_SERVER_2019_CONTAINER"
  | "WINDOWS_SERVER_2022_CONTAINER"
  | "LINUX_LAMBDA_CONTAINER"
  | "ARM_LAMBDA_CONTAINER"
  | "LINUX_EC2"
  | "ARM_EC2"
  | "WINDOWS_EC2"
  | "MAC_ARM"
  | (string & {});
export type ComputeType =
  | "BUILD_GENERAL1_SMALL"
  | "BUILD_GENERAL1_MEDIUM"
  | "BUILD_GENERAL1_LARGE"
  | "BUILD_GENERAL1_XLARGE"
  | "BUILD_GENERAL1_2XLARGE"
  | "BUILD_LAMBDA_1GB"
  | "BUILD_LAMBDA_2GB"
  | "BUILD_LAMBDA_4GB"
  | "BUILD_LAMBDA_8GB"
  | "BUILD_LAMBDA_10GB"
  | "ATTRIBUTE_BASED_COMPUTE"
  | "CUSTOM_INSTANCE_TYPE"
  | (string & {});
export type MachineType = "GENERAL" | "NVME" | (string & {});
export interface ComputeConfiguration {
  vCpu?: number;
  memory?: number;
  disk?: number;
  machineType?: MachineType;
  instanceType?: string;
}
export interface ProjectFleet {
  fleetArn?: string;
}
export type EnvironmentVariableType =
  | "PLAINTEXT"
  | "PARAMETER_STORE"
  | "SECRETS_MANAGER"
  | (string & {});
export interface EnvironmentVariable {
  name: string;
  value: string;
  type?: EnvironmentVariableType;
}
export type EnvironmentVariables = EnvironmentVariable[];
export type CredentialProviderType = "SECRETS_MANAGER" | (string & {});
export interface RegistryCredential {
  credential: string;
  credentialProvider: CredentialProviderType;
}
export type ImagePullCredentialsType =
  | "CODEBUILD"
  | "SERVICE_ROLE"
  | (string & {});
export type SecurityGroupIds = string[];
export interface DockerServerStatus {
  status?: string;
  message?: string;
}
export interface DockerServer {
  computeType: ComputeType;
  securityGroupIds?: string[];
  status?: DockerServerStatus;
}
export type HostKernel =
  | "LINUX_KERNEL_4"
  | "LINUX_KERNEL_6"
  | "LINUX_KERNEL_LATEST"
  | (string & {});
export interface ProjectEnvironment {
  type: EnvironmentType;
  image: string;
  computeType: ComputeType;
  computeConfiguration?: ComputeConfiguration;
  fleet?: ProjectFleet;
  environmentVariables?: EnvironmentVariable[];
  privilegedMode?: boolean;
  certificate?: string;
  registryCredential?: RegistryCredential;
  imagePullCredentialsType?: ImagePullCredentialsType;
  dockerServer?: DockerServer;
  hostKernel?: HostKernel;
}
export type LogsConfigStatusType = "ENABLED" | "DISABLED" | (string & {});
export interface CloudWatchLogsConfig {
  status: LogsConfigStatusType;
  groupName?: string;
  streamName?: string;
}
export interface S3LogsConfig {
  status: LogsConfigStatusType;
  location?: string;
  encryptionDisabled?: boolean;
  bucketOwnerAccess?: BucketOwnerAccess;
}
export interface LogsConfig {
  cloudWatchLogs?: CloudWatchLogsConfig;
  s3Logs?: S3LogsConfig;
}
export type Subnets = string[];
export interface VpcConfig {
  vpcId?: string;
  subnets?: string[];
  securityGroupIds?: string[];
}
export type FileSystemType = "EFS" | (string & {});
export interface ProjectFileSystemLocation {
  type?: FileSystemType;
  location?: string;
  mountPoint?: string;
  identifier?: string;
  mountOptions?: string;
}
export type ProjectFileSystemLocations = ProjectFileSystemLocation[];
export type ComputeTypesAllowed = string[];
export type FleetsAllowed = string[];
export interface BatchRestrictions {
  maximumBuildsAllowed?: number;
  computeTypesAllowed?: string[];
  fleetsAllowed?: string[];
}
export type BatchReportModeType =
  | "REPORT_INDIVIDUAL_BUILDS"
  | "REPORT_AGGREGATED_BATCH"
  | (string & {});
export interface ProjectBuildBatchConfig {
  serviceRole?: string;
  combineArtifacts?: boolean;
  restrictions?: BatchRestrictions;
  timeoutInMins?: number;
  batchReportMode?: BatchReportModeType;
}
export type Identifiers = string[];
export type ArtifactsType =
  | "CODEPIPELINE"
  | "S3"
  | "NO_ARTIFACTS"
  | (string & {});
export interface ResolvedArtifact {
  type?: ArtifactsType;
  location?: string;
  identifier?: string;
}
export type ResolvedSecondaryArtifacts = ResolvedArtifact[];
export interface BuildSummary {
  arn?: string;
  requestedOn?: Date;
  buildStatus?: StatusType;
  primaryArtifact?: ResolvedArtifact;
  secondaryArtifacts?: ResolvedArtifact[];
}
export type BuildSummaries = BuildSummary[];
export interface BuildGroup {
  identifier?: string;
  dependsOn?: string[];
  ignoreFailure?: boolean;
  currentBuildSummary?: BuildSummary;
  priorBuildSummaryList?: BuildSummary[];
}
export type BuildGroups = BuildGroup[];
export type BuildReportArns = string[];
export interface BuildBatch {
  id?: string;
  arn?: string;
  startTime?: Date;
  endTime?: Date;
  currentPhase?: string;
  buildBatchStatus?: StatusType;
  sourceVersion?: string;
  resolvedSourceVersion?: string;
  projectName?: string;
  phases?: BuildBatchPhase[];
  source?: ProjectSource;
  secondarySources?: ProjectSource[];
  secondarySourceVersions?: ProjectSourceVersion[];
  artifacts?: BuildArtifacts;
  secondaryArtifacts?: BuildArtifacts[];
  cache?: ProjectCache;
  environment?: ProjectEnvironment;
  serviceRole?: string;
  logConfig?: LogsConfig;
  buildTimeoutInMinutes?: number;
  queuedTimeoutInMinutes?: number;
  complete?: boolean;
  initiator?: string;
  vpcConfig?: VpcConfig;
  encryptionKey?: string;
  buildBatchNumber?: number;
  fileSystemLocations?: ProjectFileSystemLocation[];
  buildBatchConfig?: ProjectBuildBatchConfig;
  buildGroups?: BuildGroup[];
  debugSessionEnabled?: boolean;
  reportArns?: string[];
}
export type BuildBatches = BuildBatch[];
export interface BatchGetBuildBatchesOutput {
  buildBatches?: BuildBatch[];
  buildBatchesNotFound?: string[];
}
export interface BatchGetBuildsInput {
  ids: string[];
}
export type BuildPhaseType =
  | "SUBMITTED"
  | "QUEUED"
  | "PROVISIONING"
  | "DOWNLOAD_SOURCE"
  | "INSTALL"
  | "PRE_BUILD"
  | "BUILD"
  | "POST_BUILD"
  | "UPLOAD_ARTIFACTS"
  | "FINALIZING"
  | "COMPLETED"
  | (string & {});
export interface BuildPhase {
  phaseType?: BuildPhaseType;
  phaseStatus?: StatusType;
  startTime?: Date;
  endTime?: Date;
  durationInSeconds?: number;
  contexts?: PhaseContext[];
}
export type BuildPhases = BuildPhase[];
export interface LogsLocation {
  groupName?: string;
  streamName?: string;
  deepLink?: string;
  s3DeepLink?: string;
  cloudWatchLogsArn?: string;
  s3LogsArn?: string;
  cloudWatchLogs?: CloudWatchLogsConfig;
  s3Logs?: S3LogsConfig;
}
export interface NetworkInterface {
  subnetId?: string;
  networkInterfaceId?: string;
}
export interface ExportedEnvironmentVariable {
  name?: string;
  value?: string;
}
export type ExportedEnvironmentVariables = ExportedEnvironmentVariable[];
export interface DebugSession {
  sessionEnabled?: boolean;
  sessionTarget?: string;
}
export interface AutoRetryConfig {
  autoRetryLimit?: number;
  autoRetryNumber?: number;
  nextAutoRetry?: string;
  previousAutoRetry?: string;
}
export interface Build {
  id?: string;
  arn?: string;
  buildNumber?: number;
  startTime?: Date;
  endTime?: Date;
  currentPhase?: string;
  buildStatus?: StatusType;
  sourceVersion?: string;
  resolvedSourceVersion?: string;
  projectName?: string;
  phases?: BuildPhase[];
  source?: ProjectSource;
  secondarySources?: ProjectSource[];
  secondarySourceVersions?: ProjectSourceVersion[];
  artifacts?: BuildArtifacts;
  secondaryArtifacts?: BuildArtifacts[];
  cache?: ProjectCache;
  environment?: ProjectEnvironment;
  serviceRole?: string;
  logs?: LogsLocation;
  timeoutInMinutes?: number;
  queuedTimeoutInMinutes?: number;
  buildComplete?: boolean;
  initiator?: string;
  vpcConfig?: VpcConfig;
  networkInterface?: NetworkInterface;
  encryptionKey?: string;
  exportedEnvironmentVariables?: ExportedEnvironmentVariable[];
  reportArns?: string[];
  fileSystemLocations?: ProjectFileSystemLocation[];
  debugSession?: DebugSession;
  buildBatchArn?: string;
  autoRetryConfig?: AutoRetryConfig;
}
export type Builds = Build[];
export interface BatchGetBuildsOutput {
  builds?: Build[];
  buildsNotFound?: string[];
}
export type CommandExecutionIds = string[];
export interface BatchGetCommandExecutionsInput {
  sandboxId: string;
  commandExecutionIds: string[];
}
export type SensitiveNonEmptyString = string | redacted.Redacted<string>;
export type CommandType = "SHELL" | (string & {});
export interface CommandExecution {
  id?: string;
  sandboxId?: string;
  submitTime?: Date;
  startTime?: Date;
  endTime?: Date;
  status?: string;
  command?: string | redacted.Redacted<string>;
  type?: CommandType;
  exitCode?: string;
  standardOutputContent?: string | redacted.Redacted<string>;
  standardErrContent?: string | redacted.Redacted<string>;
  logs?: LogsLocation;
  sandboxArn?: string;
}
export type CommandExecutions = CommandExecution[];
export interface BatchGetCommandExecutionsOutput {
  commandExecutions?: CommandExecution[];
  commandExecutionsNotFound?: string[];
}
export type FleetNames = string[];
export interface BatchGetFleetsInput {
  names: string[];
}
export type FleetName = string;
export type FleetStatusCode =
  | "CREATING"
  | "UPDATING"
  | "ROTATING"
  | "PENDING_DELETION"
  | "DELETING"
  | "CREATE_FAILED"
  | "UPDATE_ROLLBACK_FAILED"
  | "ACTIVE"
  | (string & {});
export type FleetContextCode =
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | "ACTION_REQUIRED"
  | "PENDING_DELETION"
  | "INSUFFICIENT_CAPACITY"
  | (string & {});
export interface FleetStatus {
  statusCode?: FleetStatusCode;
  context?: FleetContextCode;
  message?: string;
}
export type FleetCapacity = number;
export type FleetScalingType = "TARGET_TRACKING_SCALING" | (string & {});
export type FleetScalingMetricType = "FLEET_UTILIZATION_RATE" | (string & {});
export interface TargetTrackingScalingConfiguration {
  metricType?: FleetScalingMetricType;
  targetValue?: number;
}
export type TargetTrackingScalingConfigurations =
  TargetTrackingScalingConfiguration[];
export interface ScalingConfigurationOutput {
  scalingType?: FleetScalingType;
  targetTrackingScalingConfigs?: TargetTrackingScalingConfiguration[];
  maxCapacity?: number;
  desiredCapacity?: number;
}
export type FleetOverflowBehavior = "QUEUE" | "ON_DEMAND" | (string & {});
export type FleetProxyRuleBehavior = "ALLOW_ALL" | "DENY_ALL" | (string & {});
export type FleetProxyRuleType = "DOMAIN" | "IP" | (string & {});
export type FleetProxyRuleEffectType = "ALLOW" | "DENY" | (string & {});
export type FleetProxyRuleEntities = string[];
export interface FleetProxyRule {
  type: FleetProxyRuleType;
  effect: FleetProxyRuleEffectType;
  entities: string[];
}
export type FleetProxyRules = FleetProxyRule[];
export interface ProxyConfiguration {
  defaultBehavior?: FleetProxyRuleBehavior;
  orderedProxyRules?: FleetProxyRule[];
}
export type KeyInput = string;
export type ValueInput = string;
export interface Tag {
  key?: string;
  value?: string;
}
export type TagList = Tag[];
export interface Fleet {
  arn?: string;
  name?: string;
  id?: string;
  created?: Date;
  lastModified?: Date;
  status?: FleetStatus;
  baseCapacity?: number;
  environmentType?: EnvironmentType;
  computeType?: ComputeType;
  computeConfiguration?: ComputeConfiguration;
  scalingConfiguration?: ScalingConfigurationOutput;
  overflowBehavior?: FleetOverflowBehavior;
  vpcConfig?: VpcConfig;
  proxyConfiguration?: ProxyConfiguration;
  imageId?: string;
  fleetServiceRole?: string;
  tags?: Tag[];
}
export type Fleets = Fleet[];
export interface BatchGetFleetsOutput {
  fleets?: Fleet[];
  fleetsNotFound?: string[];
}
export type ProjectNames = string[];
export interface BatchGetProjectsInput {
  names: string[];
}
export type ProjectName = string;
export type ProjectDescription = string;
export type ArtifactNamespace = "NONE" | "BUILD_ID" | (string & {});
export type ArtifactPackaging = "NONE" | "ZIP" | (string & {});
export interface ProjectArtifacts {
  type: ArtifactsType;
  location?: string;
  path?: string;
  namespaceType?: ArtifactNamespace;
  name?: string;
  packaging?: ArtifactPackaging;
  overrideArtifactName?: boolean;
  encryptionDisabled?: boolean;
  artifactIdentifier?: string;
  bucketOwnerAccess?: BucketOwnerAccess;
}
export type ProjectArtifactsList = ProjectArtifacts[];
export type BuildTimeOut = number;
export type TimeOut = number;
export type WebhookFilterType =
  | "EVENT"
  | "BASE_REF"
  | "HEAD_REF"
  | "ACTOR_ACCOUNT_ID"
  | "FILE_PATH"
  | "COMMIT_MESSAGE"
  | "WORKFLOW_NAME"
  | "TAG_NAME"
  | "RELEASE_NAME"
  | "REPOSITORY_NAME"
  | "ORGANIZATION_NAME"
  | (string & {});
export interface WebhookFilter {
  type: WebhookFilterType;
  pattern: string;
  excludeMatchedPattern?: boolean;
}
export type FilterGroup = WebhookFilter[];
export type FilterGroups = WebhookFilter[][];
export type WebhookBuildType =
  | "BUILD"
  | "BUILD_BATCH"
  | "RUNNER_BUILDKITE_BUILD"
  | (string & {});
export type WebhookScopeType =
  | "GITHUB_ORGANIZATION"
  | "GITHUB_GLOBAL"
  | "GITLAB_GROUP"
  | (string & {});
export interface ScopeConfiguration {
  name: string;
  domain?: string;
  scope: WebhookScopeType;
}
export type WebhookStatus =
  | "CREATING"
  | "CREATE_FAILED"
  | "ACTIVE"
  | "DELETING"
  | (string & {});
export type PullRequestBuildCommentApproval =
  | "DISABLED"
  | "ALL_PULL_REQUESTS"
  | "FORK_PULL_REQUESTS"
  | (string & {});
export type PullRequestBuildApproverRole =
  | "GITHUB_READ"
  | "GITHUB_TRIAGE"
  | "GITHUB_WRITE"
  | "GITHUB_MAINTAIN"
  | "GITHUB_ADMIN"
  | "GITLAB_GUEST"
  | "GITLAB_PLANNER"
  | "GITLAB_REPORTER"
  | "GITLAB_DEVELOPER"
  | "GITLAB_MAINTAINER"
  | "GITLAB_OWNER"
  | "BITBUCKET_READ"
  | "BITBUCKET_WRITE"
  | "BITBUCKET_ADMIN"
  | (string & {});
export type PullRequestBuildApproverRoles = PullRequestBuildApproverRole[];
export interface PullRequestBuildPolicy {
  requiresCommentApproval: PullRequestBuildCommentApproval;
  approverRoles?: PullRequestBuildApproverRole[];
}
export interface Webhook {
  url?: string;
  payloadUrl?: string;
  secret?: string;
  branchFilter?: string;
  filterGroups?: WebhookFilter[][];
  buildType?: WebhookBuildType;
  manualCreation?: boolean;
  lastModifiedSecret?: Date;
  scopeConfiguration?: ScopeConfiguration;
  status?: WebhookStatus;
  statusMessage?: string;
  pullRequestBuildPolicy?: PullRequestBuildPolicy;
}
export interface ProjectBadge {
  badgeEnabled?: boolean;
  badgeRequestUrl?: string;
}
export type ProjectVisibilityType = "PUBLIC_READ" | "PRIVATE" | (string & {});
export interface Project {
  name?: string;
  arn?: string;
  description?: string;
  source?: ProjectSource;
  secondarySources?: ProjectSource[];
  sourceVersion?: string;
  secondarySourceVersions?: ProjectSourceVersion[];
  artifacts?: ProjectArtifacts;
  secondaryArtifacts?: ProjectArtifacts[];
  cache?: ProjectCache;
  environment?: ProjectEnvironment;
  serviceRole?: string;
  timeoutInMinutes?: number;
  queuedTimeoutInMinutes?: number;
  encryptionKey?: string;
  tags?: Tag[];
  created?: Date;
  lastModified?: Date;
  webhook?: Webhook;
  vpcConfig?: VpcConfig;
  badge?: ProjectBadge;
  logsConfig?: LogsConfig;
  fileSystemLocations?: ProjectFileSystemLocation[];
  buildBatchConfig?: ProjectBuildBatchConfig;
  concurrentBuildLimit?: number;
  projectVisibility?: ProjectVisibilityType;
  publicProjectAlias?: string;
  resourceAccessRole?: string;
  autoRetryLimit?: number;
}
export type Projects = Project[];
export interface BatchGetProjectsOutput {
  projects?: Project[];
  projectsNotFound?: string[];
}
export type ReportGroupArns = string[];
export interface BatchGetReportGroupsInput {
  reportGroupArns: string[];
}
export type ReportGroupName = string;
export type ReportType = "TEST" | "CODE_COVERAGE" | (string & {});
export type ReportExportConfigType = "S3" | "NO_EXPORT" | (string & {});
export type ReportPackagingType = "ZIP" | "NONE" | (string & {});
export interface S3ReportExportConfig {
  bucket?: string;
  bucketOwner?: string;
  path?: string;
  packaging?: ReportPackagingType;
  encryptionKey?: string;
  encryptionDisabled?: boolean;
}
export interface ReportExportConfig {
  exportConfigType?: ReportExportConfigType;
  s3Destination?: S3ReportExportConfig;
}
export type ReportGroupStatusType = "ACTIVE" | "DELETING" | (string & {});
export interface ReportGroup {
  arn?: string;
  name?: string;
  type?: ReportType;
  exportConfig?: ReportExportConfig;
  created?: Date;
  lastModified?: Date;
  tags?: Tag[];
  status?: ReportGroupStatusType;
}
export type ReportGroups = ReportGroup[];
export interface BatchGetReportGroupsOutput {
  reportGroups?: ReportGroup[];
  reportGroupsNotFound?: string[];
}
export type ReportArns = string[];
export interface BatchGetReportsInput {
  reportArns: string[];
}
export type ReportStatusType =
  | "GENERATING"
  | "SUCCEEDED"
  | "FAILED"
  | "INCOMPLETE"
  | "DELETING"
  | (string & {});
export type ReportStatusCounts = { [key: string]: number | undefined };
export interface TestReportSummary {
  total: number;
  statusCounts: { [key: string]: number | undefined };
  durationInNanoSeconds: number;
}
export type Percentage = number;
export type NonNegativeInt = number;
export interface CodeCoverageReportSummary {
  lineCoveragePercentage?: number;
  linesCovered?: number;
  linesMissed?: number;
  branchCoveragePercentage?: number;
  branchesCovered?: number;
  branchesMissed?: number;
}
export interface Report {
  arn?: string;
  type?: ReportType;
  name?: string;
  reportGroupArn?: string;
  executionId?: string;
  status?: ReportStatusType;
  created?: Date;
  expired?: Date;
  exportConfig?: ReportExportConfig;
  truncated?: boolean;
  testSummary?: TestReportSummary;
  codeCoverageSummary?: CodeCoverageReportSummary;
}
export type Reports = Report[];
export interface BatchGetReportsOutput {
  reports?: Report[];
  reportsNotFound?: string[];
}
export type SandboxIds = string[];
export interface BatchGetSandboxesInput {
  ids: string[];
}
export interface SandboxSessionPhase {
  phaseType?: string;
  phaseStatus?: StatusType;
  startTime?: Date;
  endTime?: Date;
  durationInSeconds?: number;
  contexts?: PhaseContext[];
}
export type SandboxSessionPhases = SandboxSessionPhase[];
export interface SandboxSession {
  id?: string;
  status?: string;
  startTime?: Date;
  endTime?: Date;
  currentPhase?: string;
  phases?: SandboxSessionPhase[];
  resolvedSourceVersion?: string;
  logs?: LogsLocation;
  networkInterface?: NetworkInterface;
}
export interface Sandbox {
  id?: string;
  arn?: string;
  projectName?: string;
  requestTime?: Date;
  startTime?: Date;
  endTime?: Date;
  status?: string;
  source?: ProjectSource;
  sourceVersion?: string;
  secondarySources?: ProjectSource[];
  secondarySourceVersions?: ProjectSourceVersion[];
  environment?: ProjectEnvironment;
  fileSystemLocations?: ProjectFileSystemLocation[];
  timeoutInMinutes?: number;
  queuedTimeoutInMinutes?: number;
  vpcConfig?: VpcConfig;
  logConfig?: LogsConfig;
  encryptionKey?: string;
  serviceRole?: string;
  currentSession?: SandboxSession;
}
export type Sandboxes = Sandbox[];
export interface BatchGetSandboxesOutput {
  sandboxes?: Sandbox[];
  sandboxesNotFound?: string[];
}
export interface ScalingConfigurationInput {
  scalingType?: FleetScalingType;
  targetTrackingScalingConfigs?: TargetTrackingScalingConfiguration[];
  maxCapacity?: number;
}
export interface CreateFleetInput {
  name: string;
  baseCapacity: number;
  environmentType: EnvironmentType;
  computeType: ComputeType;
  computeConfiguration?: ComputeConfiguration;
  scalingConfiguration?: ScalingConfigurationInput;
  overflowBehavior?: FleetOverflowBehavior;
  vpcConfig?: VpcConfig;
  proxyConfiguration?: ProxyConfiguration;
  imageId?: string;
  fleetServiceRole?: string;
  tags?: Tag[];
}
export interface CreateFleetOutput {
  fleet?: Fleet;
}
export interface CreateProjectInput {
  name: string;
  description?: string;
  source: ProjectSource;
  secondarySources?: ProjectSource[];
  sourceVersion?: string;
  secondarySourceVersions?: ProjectSourceVersion[];
  artifacts: ProjectArtifacts;
  secondaryArtifacts?: ProjectArtifacts[];
  cache?: ProjectCache;
  environment: ProjectEnvironment;
  serviceRole: string;
  timeoutInMinutes?: number;
  queuedTimeoutInMinutes?: number;
  encryptionKey?: string;
  tags?: Tag[];
  vpcConfig?: VpcConfig;
  badgeEnabled?: boolean;
  logsConfig?: LogsConfig;
  fileSystemLocations?: ProjectFileSystemLocation[];
  buildBatchConfig?: ProjectBuildBatchConfig;
  concurrentBuildLimit?: number;
  autoRetryLimit?: number;
}
export interface CreateProjectOutput {
  project?: Project;
}
export interface CreateReportGroupInput {
  name: string;
  type: ReportType;
  exportConfig: ReportExportConfig;
  tags?: Tag[];
}
export interface CreateReportGroupOutput {
  reportGroup?: ReportGroup;
}
export interface CreateWebhookInput {
  projectName: string;
  branchFilter?: string;
  filterGroups?: WebhookFilter[][];
  buildType?: WebhookBuildType;
  manualCreation?: boolean;
  scopeConfiguration?: ScopeConfiguration;
  pullRequestBuildPolicy?: PullRequestBuildPolicy;
}
export interface CreateWebhookOutput {
  webhook?: Webhook;
}
export interface DeleteBuildBatchInput {
  id: string;
}
export interface DeleteBuildBatchOutput {
  statusCode?: string;
  buildsDeleted?: string[];
  buildsNotDeleted?: BuildNotDeleted[];
}
export interface DeleteFleetInput {
  arn: string;
}
export interface DeleteFleetOutput {}
export interface DeleteProjectInput {
  name: string;
}
export interface DeleteProjectOutput {}
export interface DeleteReportInput {
  arn: string;
}
export interface DeleteReportOutput {}
export interface DeleteReportGroupInput {
  arn: string;
  deleteReports?: boolean;
}
export interface DeleteReportGroupOutput {}
export interface DeleteResourcePolicyInput {
  resourceArn: string;
}
export interface DeleteResourcePolicyOutput {}
export interface DeleteSourceCredentialsInput {
  arn: string;
}
export interface DeleteSourceCredentialsOutput {
  arn?: string;
}
export interface DeleteWebhookInput {
  projectName: string;
}
export interface DeleteWebhookOutput {}
export type PageSize = number;
export type SortOrderType = "ASCENDING" | "DESCENDING" | (string & {});
export type ReportCodeCoverageSortByType =
  | "LINE_COVERAGE_PERCENTAGE"
  | "FILE_PATH"
  | (string & {});
export interface DescribeCodeCoveragesInput {
  reportArn: string;
  nextToken?: string;
  maxResults?: number;
  sortOrder?: SortOrderType;
  sortBy?: ReportCodeCoverageSortByType;
  minLineCoveragePercentage?: number;
  maxLineCoveragePercentage?: number;
}
export interface CodeCoverage {
  id?: string;
  reportARN?: string;
  filePath?: string;
  lineCoveragePercentage?: number;
  linesCovered?: number;
  linesMissed?: number;
  branchCoveragePercentage?: number;
  branchesCovered?: number;
  branchesMissed?: number;
  expired?: Date;
}
export type CodeCoverages = CodeCoverage[];
export interface DescribeCodeCoveragesOutput {
  nextToken?: string;
  codeCoverages?: CodeCoverage[];
}
export interface TestCaseFilter {
  status?: string;
  keyword?: string;
}
export interface DescribeTestCasesInput {
  reportArn: string;
  nextToken?: string;
  maxResults?: number;
  filter?: TestCaseFilter;
}
export interface TestCase {
  reportArn?: string;
  testRawDataPath?: string;
  prefix?: string;
  name?: string;
  status?: string;
  durationInNanoSeconds?: number;
  message?: string;
  expired?: Date;
  testSuiteName?: string;
}
export type TestCases = TestCase[];
export interface DescribeTestCasesOutput {
  nextToken?: string;
  testCases?: TestCase[];
}
export type ReportGroupTrendFieldType =
  | "PASS_RATE"
  | "DURATION"
  | "TOTAL"
  | "LINE_COVERAGE"
  | "LINES_COVERED"
  | "LINES_MISSED"
  | "BRANCH_COVERAGE"
  | "BRANCHES_COVERED"
  | "BRANCHES_MISSED"
  | (string & {});
export interface GetReportGroupTrendInput {
  reportGroupArn: string;
  numOfReports?: number;
  trendField: ReportGroupTrendFieldType;
}
export interface ReportGroupTrendStats {
  average?: string;
  max?: string;
  min?: string;
}
export interface ReportWithRawData {
  reportArn?: string;
  data?: string;
}
export type ReportGroupTrendRawDataList = ReportWithRawData[];
export interface GetReportGroupTrendOutput {
  stats?: ReportGroupTrendStats;
  rawData?: ReportWithRawData[];
}
export interface GetResourcePolicyInput {
  resourceArn: string;
}
export interface GetResourcePolicyOutput {
  policy?: string;
}
export type ServerType =
  | "GITHUB"
  | "BITBUCKET"
  | "GITHUB_ENTERPRISE"
  | "GITLAB"
  | "GITLAB_SELF_MANAGED"
  | (string & {});
export type AuthType =
  | "OAUTH"
  | "BASIC_AUTH"
  | "PERSONAL_ACCESS_TOKEN"
  | "CODECONNECTIONS"
  | "SECRETS_MANAGER"
  | (string & {});
export interface ImportSourceCredentialsInput {
  username?: string;
  token: string | redacted.Redacted<string>;
  serverType: ServerType;
  authType: AuthType;
  shouldOverwrite?: boolean;
}
export interface ImportSourceCredentialsOutput {
  arn?: string;
}
export interface InvalidateProjectCacheInput {
  projectName: string;
}
export interface InvalidateProjectCacheOutput {}
export interface BuildBatchFilter {
  status?: StatusType;
}
export interface ListBuildBatchesInput {
  filter?: BuildBatchFilter;
  maxResults?: number;
  sortOrder?: SortOrderType;
  nextToken?: string;
}
export interface ListBuildBatchesOutput {
  ids?: string[];
  nextToken?: string;
}
export interface ListBuildBatchesForProjectInput {
  projectName?: string;
  filter?: BuildBatchFilter;
  maxResults?: number;
  sortOrder?: SortOrderType;
  nextToken?: string;
}
export interface ListBuildBatchesForProjectOutput {
  ids?: string[];
  nextToken?: string;
}
export interface ListBuildsInput {
  sortOrder?: SortOrderType;
  nextToken?: string;
}
export interface ListBuildsOutput {
  ids?: string[];
  nextToken?: string;
}
export interface ListBuildsForProjectInput {
  projectName: string;
  sortOrder?: SortOrderType;
  nextToken?: string;
}
export interface ListBuildsForProjectOutput {
  ids?: string[];
  nextToken?: string;
}
export type SensitiveString = string | redacted.Redacted<string>;
export interface ListCommandExecutionsForSandboxInput {
  sandboxId: string;
  maxResults?: number;
  sortOrder?: SortOrderType;
  nextToken?: string | redacted.Redacted<string>;
}
export interface ListCommandExecutionsForSandboxOutput {
  commandExecutions?: CommandExecution[];
  nextToken?: string;
}
export interface ListCuratedEnvironmentImagesInput {}
export type PlatformType =
  | "DEBIAN"
  | "AMAZON_LINUX"
  | "UBUNTU"
  | "WINDOWS_SERVER"
  | (string & {});
export type LanguageType =
  | "JAVA"
  | "PYTHON"
  | "NODE_JS"
  | "RUBY"
  | "GOLANG"
  | "DOCKER"
  | "ANDROID"
  | "DOTNET"
  | "BASE"
  | "PHP"
  | (string & {});
export type ImageVersions = string[];
export interface EnvironmentImage {
  name?: string;
  description?: string;
  versions?: string[];
}
export type EnvironmentImages = EnvironmentImage[];
export interface EnvironmentLanguage {
  language?: LanguageType;
  images?: EnvironmentImage[];
}
export type EnvironmentLanguages = EnvironmentLanguage[];
export interface EnvironmentPlatform {
  platform?: PlatformType;
  languages?: EnvironmentLanguage[];
}
export type EnvironmentPlatforms = EnvironmentPlatform[];
export interface ListCuratedEnvironmentImagesOutput {
  platforms?: EnvironmentPlatform[];
}
export type FleetSortByType =
  | "NAME"
  | "CREATED_TIME"
  | "LAST_MODIFIED_TIME"
  | (string & {});
export interface ListFleetsInput {
  nextToken?: string | redacted.Redacted<string>;
  maxResults?: number;
  sortOrder?: SortOrderType;
  sortBy?: FleetSortByType;
}
export type FleetArns = string[];
export interface ListFleetsOutput {
  nextToken?: string;
  fleets?: string[];
}
export type ProjectSortByType =
  | "NAME"
  | "CREATED_TIME"
  | "LAST_MODIFIED_TIME"
  | (string & {});
export interface ListProjectsInput {
  sortBy?: ProjectSortByType;
  sortOrder?: SortOrderType;
  nextToken?: string;
}
export interface ListProjectsOutput {
  nextToken?: string;
  projects?: string[];
}
export type ReportGroupSortByType =
  | "NAME"
  | "CREATED_TIME"
  | "LAST_MODIFIED_TIME"
  | (string & {});
export interface ListReportGroupsInput {
  sortOrder?: SortOrderType;
  sortBy?: ReportGroupSortByType;
  nextToken?: string;
  maxResults?: number;
}
export interface ListReportGroupsOutput {
  nextToken?: string;
  reportGroups?: string[];
}
export interface ReportFilter {
  status?: ReportStatusType;
}
export interface ListReportsInput {
  sortOrder?: SortOrderType;
  nextToken?: string;
  maxResults?: number;
  filter?: ReportFilter;
}
export interface ListReportsOutput {
  nextToken?: string;
  reports?: string[];
}
export interface ListReportsForReportGroupInput {
  reportGroupArn: string;
  nextToken?: string;
  sortOrder?: SortOrderType;
  maxResults?: number;
  filter?: ReportFilter;
}
export interface ListReportsForReportGroupOutput {
  nextToken?: string;
  reports?: string[];
}
export interface ListSandboxesInput {
  maxResults?: number;
  sortOrder?: SortOrderType;
  nextToken?: string;
}
export interface ListSandboxesOutput {
  ids?: string[];
  nextToken?: string;
}
export interface ListSandboxesForProjectInput {
  projectName: string;
  maxResults?: number;
  sortOrder?: SortOrderType;
  nextToken?: string | redacted.Redacted<string>;
}
export interface ListSandboxesForProjectOutput {
  ids?: string[];
  nextToken?: string;
}
export type SharedResourceSortByType = "ARN" | "MODIFIED_TIME" | (string & {});
export interface ListSharedProjectsInput {
  sortBy?: SharedResourceSortByType;
  sortOrder?: SortOrderType;
  maxResults?: number;
  nextToken?: string;
}
export type ProjectArns = string[];
export interface ListSharedProjectsOutput {
  nextToken?: string;
  projects?: string[];
}
export interface ListSharedReportGroupsInput {
  sortOrder?: SortOrderType;
  sortBy?: SharedResourceSortByType;
  nextToken?: string;
  maxResults?: number;
}
export interface ListSharedReportGroupsOutput {
  nextToken?: string;
  reportGroups?: string[];
}
export interface ListSourceCredentialsInput {}
export interface SourceCredentialsInfo {
  arn?: string;
  serverType?: ServerType;
  authType?: AuthType;
  resource?: string;
}
export type SourceCredentialsInfos = SourceCredentialsInfo[];
export interface ListSourceCredentialsOutput {
  sourceCredentialsInfos?: SourceCredentialsInfo[];
}
export interface PutResourcePolicyInput {
  policy: string;
  resourceArn: string;
}
export interface PutResourcePolicyOutput {
  resourceArn?: string;
}
export interface RetryBuildInput {
  id?: string;
  idempotencyToken?: string;
}
export interface RetryBuildOutput {
  build?: Build;
}
export type RetryBuildBatchType =
  | "RETRY_ALL_BUILDS"
  | "RETRY_FAILED_BUILDS"
  | (string & {});
export interface RetryBuildBatchInput {
  id?: string;
  idempotencyToken?: string;
  retryType?: RetryBuildBatchType;
}
export interface RetryBuildBatchOutput {
  buildBatch?: BuildBatch;
}
export interface StartBuildInput {
  projectName: string;
  secondarySourcesOverride?: ProjectSource[];
  secondarySourcesVersionOverride?: ProjectSourceVersion[];
  sourceVersion?: string;
  artifactsOverride?: ProjectArtifacts;
  secondaryArtifactsOverride?: ProjectArtifacts[];
  environmentVariablesOverride?: EnvironmentVariable[];
  sourceTypeOverride?: SourceType;
  sourceLocationOverride?: string;
  sourceAuthOverride?: SourceAuth;
  gitCloneDepthOverride?: number;
  gitSubmodulesConfigOverride?: GitSubmodulesConfig;
  buildspecOverride?: string;
  insecureSslOverride?: boolean;
  reportBuildStatusOverride?: boolean;
  buildStatusConfigOverride?: BuildStatusConfig;
  environmentTypeOverride?: EnvironmentType;
  imageOverride?: string;
  computeTypeOverride?: ComputeType;
  certificateOverride?: string;
  cacheOverride?: ProjectCache;
  serviceRoleOverride?: string;
  privilegedModeOverride?: boolean;
  timeoutInMinutesOverride?: number;
  queuedTimeoutInMinutesOverride?: number;
  encryptionKeyOverride?: string;
  idempotencyToken?: string;
  logsConfigOverride?: LogsConfig;
  registryCredentialOverride?: RegistryCredential;
  imagePullCredentialsTypeOverride?: ImagePullCredentialsType;
  debugSessionEnabled?: boolean;
  fleetOverride?: ProjectFleet;
  autoRetryLimitOverride?: number;
  hostKernelOverride?: HostKernel;
}
export interface StartBuildOutput {
  build?: Build;
}
export interface StartBuildBatchInput {
  projectName: string;
  secondarySourcesOverride?: ProjectSource[];
  secondarySourcesVersionOverride?: ProjectSourceVersion[];
  sourceVersion?: string;
  artifactsOverride?: ProjectArtifacts;
  secondaryArtifactsOverride?: ProjectArtifacts[];
  environmentVariablesOverride?: EnvironmentVariable[];
  sourceTypeOverride?: SourceType;
  sourceLocationOverride?: string;
  sourceAuthOverride?: SourceAuth;
  gitCloneDepthOverride?: number;
  gitSubmodulesConfigOverride?: GitSubmodulesConfig;
  buildspecOverride?: string;
  insecureSslOverride?: boolean;
  reportBuildBatchStatusOverride?: boolean;
  environmentTypeOverride?: EnvironmentType;
  imageOverride?: string;
  computeTypeOverride?: ComputeType;
  certificateOverride?: string;
  cacheOverride?: ProjectCache;
  serviceRoleOverride?: string;
  privilegedModeOverride?: boolean;
  buildTimeoutInMinutesOverride?: number;
  queuedTimeoutInMinutesOverride?: number;
  encryptionKeyOverride?: string;
  idempotencyToken?: string;
  logsConfigOverride?: LogsConfig;
  registryCredentialOverride?: RegistryCredential;
  imagePullCredentialsTypeOverride?: ImagePullCredentialsType;
  buildBatchConfigOverride?: ProjectBuildBatchConfig;
  debugSessionEnabled?: boolean;
}
export interface StartBuildBatchOutput {
  buildBatch?: BuildBatch;
}
export interface StartCommandExecutionInput {
  sandboxId: string;
  command: string | redacted.Redacted<string>;
  type?: CommandType;
}
export interface StartCommandExecutionOutput {
  commandExecution?: CommandExecution;
}
export interface StartSandboxInput {
  projectName?: string;
  idempotencyToken?: string | redacted.Redacted<string>;
}
export interface StartSandboxOutput {
  sandbox?: Sandbox;
}
export interface StartSandboxConnectionInput {
  sandboxId: string;
}
export interface SSMSession {
  sessionId?: string;
  tokenValue?: string;
  streamUrl?: string;
}
export interface StartSandboxConnectionOutput {
  ssmSession?: SSMSession;
}
export interface StopBuildInput {
  id: string;
}
export interface StopBuildOutput {
  build?: Build;
}
export interface StopBuildBatchInput {
  id: string;
}
export interface StopBuildBatchOutput {
  buildBatch?: BuildBatch;
}
export interface StopSandboxInput {
  id: string;
}
export interface StopSandboxOutput {
  sandbox?: Sandbox;
}
export interface UpdateFleetInput {
  arn: string;
  baseCapacity?: number;
  environmentType?: EnvironmentType;
  computeType?: ComputeType;
  computeConfiguration?: ComputeConfiguration;
  scalingConfiguration?: ScalingConfigurationInput;
  overflowBehavior?: FleetOverflowBehavior;
  vpcConfig?: VpcConfig;
  proxyConfiguration?: ProxyConfiguration;
  imageId?: string;
  fleetServiceRole?: string;
  tags?: Tag[];
}
export interface UpdateFleetOutput {
  fleet?: Fleet;
}
export interface UpdateProjectInput {
  name: string;
  description?: string;
  source?: ProjectSource;
  secondarySources?: ProjectSource[];
  sourceVersion?: string;
  secondarySourceVersions?: ProjectSourceVersion[];
  artifacts?: ProjectArtifacts;
  secondaryArtifacts?: ProjectArtifacts[];
  cache?: ProjectCache;
  environment?: ProjectEnvironment;
  serviceRole?: string;
  timeoutInMinutes?: number;
  queuedTimeoutInMinutes?: number;
  encryptionKey?: string;
  tags?: Tag[];
  vpcConfig?: VpcConfig;
  badgeEnabled?: boolean;
  logsConfig?: LogsConfig;
  fileSystemLocations?: ProjectFileSystemLocation[];
  buildBatchConfig?: ProjectBuildBatchConfig;
  concurrentBuildLimit?: number;
  autoRetryLimit?: number;
}
export interface UpdateProjectOutput {
  project?: Project;
}
export interface UpdateProjectVisibilityInput {
  projectArn: string;
  projectVisibility: ProjectVisibilityType;
  resourceAccessRole?: string;
}
export interface UpdateProjectVisibilityOutput {
  projectArn?: string;
  publicProjectAlias?: string;
  projectVisibility?: ProjectVisibilityType;
}
export interface UpdateReportGroupInput {
  arn: string;
  exportConfig?: ReportExportConfig;
  tags?: Tag[];
}
export interface UpdateReportGroupOutput {
  reportGroup?: ReportGroup;
}
export interface UpdateWebhookInput {
  projectName: string;
  branchFilter?: string;
  rotateSecret?: boolean;
  filterGroups?: WebhookFilter[][];
  buildType?: WebhookBuildType;
  pullRequestBuildPolicy?: PullRequestBuildPolicy;
}
export interface UpdateWebhookOutput {
  webhook?: Webhook;
}
export type BatchDeleteBuildsError = InvalidInputException | CommonErrors;
/**
 * Deletes one or more builds.
 */
export const batchDeleteBuilds: API.OperationMethod<
  BatchDeleteBuildsInput,
  BatchDeleteBuildsOutput,
  BatchDeleteBuildsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ids: 0 } },
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteBuilds",
})) as any;

export type BatchGetBuildBatchesError = InvalidInputException | CommonErrors;
/**
 * Retrieves information about one or more batch builds.
 */
export const batchGetBuildBatches: API.OperationMethod<
  BatchGetBuildBatchesInput,
  BatchGetBuildBatchesOutput,
  BatchGetBuildBatchesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ids: 0 },
    output: { buildBatches: D.list(o_BuildBatch) },
  },
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetBuildBatches",
})) as any;

export type BatchGetBuildsError = InvalidInputException | CommonErrors;
/**
 * Gets information about one or more builds.
 */
export const batchGetBuilds: API.OperationMethod<
  BatchGetBuildsInput,
  BatchGetBuildsOutput,
  BatchGetBuildsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ids: 0 },
    output: { builds: D.list(o_Build) },
  },
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetBuilds",
})) as any;

export type BatchGetCommandExecutionsError =
  | InvalidInputException
  | CommonErrors;
/**
 * Gets information about the command executions.
 */
export const batchGetCommandExecutions: API.OperationMethod<
  BatchGetCommandExecutionsInput,
  BatchGetCommandExecutionsOutput,
  BatchGetCommandExecutionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { sandboxId: 0, commandExecutionIds: 0 },
    output: { commandExecutions: D.list(o_CommandExecution) },
  },
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetCommandExecutions",
})) as any;

export type BatchGetFleetsError = InvalidInputException | CommonErrors;
/**
 * Gets information about one or more compute fleets.
 */
export const batchGetFleets: API.OperationMethod<
  BatchGetFleetsInput,
  BatchGetFleetsOutput,
  BatchGetFleetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { names: 0 },
    output: { fleets: D.list(o_Fleet) },
  },
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetFleets",
})) as any;

export type BatchGetProjectsError = InvalidInputException | CommonErrors;
/**
 * Gets information about one or more build projects.
 */
export const batchGetProjects: API.OperationMethod<
  BatchGetProjectsInput,
  BatchGetProjectsOutput,
  BatchGetProjectsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { names: 0 },
    output: { projects: D.list(o_Project) },
  },
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetProjects",
})) as any;

export type BatchGetReportGroupsError = InvalidInputException | CommonErrors;
/**
 * Returns an array of report groups.
 */
export const batchGetReportGroups: API.OperationMethod<
  BatchGetReportGroupsInput,
  BatchGetReportGroupsOutput,
  BatchGetReportGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { reportGroupArns: 0 },
    output: { reportGroups: D.list(o_ReportGroup) },
  },
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetReportGroups",
})) as any;

export type BatchGetReportsError = InvalidInputException | CommonErrors;
/**
 * Returns an array of reports.
 */
export const batchGetReports: API.OperationMethod<
  BatchGetReportsInput,
  BatchGetReportsOutput,
  BatchGetReportsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { reportArns: 0 },
    output: { reports: D.list({ created: D.ts, expired: D.ts }) },
  },
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetReports",
})) as any;

export type BatchGetSandboxesError = InvalidInputException | CommonErrors;
/**
 * Gets information about the sandbox status.
 */
export const batchGetSandboxes: API.OperationMethod<
  BatchGetSandboxesInput,
  BatchGetSandboxesOutput,
  BatchGetSandboxesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ids: 0 },
    output: { sandboxes: D.list(o_Sandbox) },
  },
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetSandboxes",
})) as any;

export type CreateFleetError =
  | AccountLimitExceededException
  | InvalidInputException
  | ResourceAlreadyExistsException
  | CommonErrors;
/**
 * Creates a compute fleet.
 */
export const createFleet: API.OperationMethod<
  CreateFleetInput,
  CreateFleetOutput,
  CreateFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      baseCapacity: 0,
      environmentType: 0,
      computeType: 0,
      computeConfiguration: i_ComputeConfiguration,
      scalingConfiguration: i_ScalingConfigurationInput,
      overflowBehavior: 0,
      vpcConfig: i_VpcConfig,
      proxyConfiguration: i_ProxyConfiguration,
      imageId: 0,
      fleetServiceRole: 0,
      tags: D.list(i_Tag),
    },
    output: { fleet: o_Fleet },
  },
  errors: [
    AccountLimitExceededException,
    InvalidInputException,
    ResourceAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFleet",
})) as any;

export type CreateProjectError =
  | AccountLimitExceededException
  | InvalidInputException
  | ResourceAlreadyExistsException
  | CommonErrors;
/**
 * Creates a build project.
 */
export const createProject: API.OperationMethod<
  CreateProjectInput,
  CreateProjectOutput,
  CreateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      description: 0,
      source: i_ProjectSource,
      secondarySources: D.list(i_ProjectSource),
      sourceVersion: 0,
      secondarySourceVersions: D.list(i_ProjectSourceVersion),
      artifacts: i_ProjectArtifacts,
      secondaryArtifacts: D.list(i_ProjectArtifacts),
      cache: i_ProjectCache,
      environment: i_ProjectEnvironment,
      serviceRole: 0,
      timeoutInMinutes: 0,
      queuedTimeoutInMinutes: 0,
      encryptionKey: 0,
      tags: D.list(i_Tag),
      vpcConfig: i_VpcConfig,
      badgeEnabled: 0,
      logsConfig: i_LogsConfig,
      fileSystemLocations: D.list(i_ProjectFileSystemLocation),
      buildBatchConfig: i_ProjectBuildBatchConfig,
      concurrentBuildLimit: 0,
      autoRetryLimit: 0,
    },
    output: { project: o_Project },
  },
  errors: [
    AccountLimitExceededException,
    InvalidInputException,
    ResourceAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProject",
})) as any;

export type CreateReportGroupError =
  | AccountLimitExceededException
  | InvalidInputException
  | ResourceAlreadyExistsException
  | CommonErrors;
/**
 * Creates a report group. A report group contains a collection of reports.
 */
export const createReportGroup: API.OperationMethod<
  CreateReportGroupInput,
  CreateReportGroupOutput,
  CreateReportGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      type: 0,
      exportConfig: i_ReportExportConfig,
      tags: D.list(i_Tag),
    },
    output: { reportGroup: o_ReportGroup },
  },
  errors: [
    AccountLimitExceededException,
    InvalidInputException,
    ResourceAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReportGroup",
})) as any;

export type CreateWebhookError =
  | InvalidInputException
  | OAuthProviderException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * For an existing CodeBuild build project that has its source code stored in a GitHub or
 * Bitbucket repository, enables CodeBuild to start rebuilding the source code every time a
 * code change is pushed to the repository.
 *
 * If you enable webhooks for an CodeBuild project, and the project is used as a build
 * step in CodePipeline, then two identical builds are created for each commit. One build is
 * triggered through webhooks, and one through CodePipeline. Because billing is on a per-build
 * basis, you are billed for both builds. Therefore, if you are using CodePipeline, we
 * recommend that you disable webhooks in CodeBuild. In the CodeBuild console, clear the
 * Webhook box. For more information, see step 5 in Change a Build Project's Settings.
 */
export const createWebhook: API.OperationMethod<
  CreateWebhookInput,
  CreateWebhookOutput,
  CreateWebhookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      projectName: 0,
      branchFilter: 0,
      filterGroups: D.list(D.list(i_WebhookFilter)),
      buildType: 0,
      manualCreation: 0,
      scopeConfiguration: { name: 0, domain: 0, scope: 0 },
      pullRequestBuildPolicy: i_PullRequestBuildPolicy,
    },
    output: { webhook: o_Webhook },
  },
  errors: [
    InvalidInputException,
    OAuthProviderException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWebhook",
})) as any;

export type DeleteBuildBatchError = InvalidInputException | CommonErrors;
/**
 * Deletes a batch build.
 */
export const deleteBuildBatch: API.OperationMethod<
  DeleteBuildBatchInput,
  DeleteBuildBatchOutput,
  DeleteBuildBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { id: 0 } },
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBuildBatch",
})) as any;

export type DeleteFleetError = InvalidInputException | CommonErrors;
/**
 * Deletes a compute fleet. When you delete a compute fleet, its builds are not deleted.
 */
export const deleteFleet: API.OperationMethod<
  DeleteFleetInput,
  DeleteFleetOutput,
  DeleteFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0 } },
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFleet",
})) as any;

export type DeleteProjectError = InvalidInputException | CommonErrors;
/**
 * Deletes a build project. When you delete a project, its builds are not deleted.
 */
export const deleteProject: API.OperationMethod<
  DeleteProjectInput,
  DeleteProjectOutput,
  DeleteProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { name: 0 } },
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProject",
})) as any;

export type DeleteReportError = InvalidInputException | CommonErrors;
/**
 * Deletes a report.
 */
export const deleteReport: API.OperationMethod<
  DeleteReportInput,
  DeleteReportOutput,
  DeleteReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0 } },
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReport",
})) as any;

export type DeleteReportGroupError = InvalidInputException | CommonErrors;
/**
 * Deletes a report group. Before you delete a report group, you must delete its reports.
 */
export const deleteReportGroup: API.OperationMethod<
  DeleteReportGroupInput,
  DeleteReportGroupOutput,
  DeleteReportGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0, deleteReports: 0 } },
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReportGroup",
})) as any;

export type DeleteResourcePolicyError = InvalidInputException | CommonErrors;
/**
 * Deletes a resource policy that is identified by its resource ARN.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyInput,
  DeleteResourcePolicyOutput,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0 } },
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
})) as any;

export type DeleteSourceCredentialsError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a set of GitHub, GitHub Enterprise, or Bitbucket source credentials.
 */
export const deleteSourceCredentials: API.OperationMethod<
  DeleteSourceCredentialsInput,
  DeleteSourceCredentialsOutput,
  DeleteSourceCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { arn: 0 } },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSourceCredentials",
})) as any;

export type DeleteWebhookError =
  | InvalidInputException
  | OAuthProviderException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * For an existing CodeBuild build project that has its source code stored in a GitHub or
 * Bitbucket repository, stops CodeBuild from rebuilding the source code every time a code
 * change is pushed to the repository.
 */
export const deleteWebhook: API.OperationMethod<
  DeleteWebhookInput,
  DeleteWebhookOutput,
  DeleteWebhookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { projectName: 0 } },
  errors: [
    InvalidInputException,
    OAuthProviderException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWebhook",
})) as any;

export type DescribeCodeCoveragesError = InvalidInputException | CommonErrors;
/**
 * Retrieves one or more code coverage reports.
 */
export const describeCodeCoverages: API.PaginatedOperationMethod<
  DescribeCodeCoveragesInput,
  DescribeCodeCoveragesOutput,
  DescribeCodeCoveragesError,
  Credentials | HttpClient.HttpClient,
  CodeCoverage
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      reportArn: 0,
      nextToken: 0,
      maxResults: 0,
      sortOrder: 0,
      sortBy: 0,
      minLineCoveragePercentage: 0,
      maxLineCoveragePercentage: 0,
    },
    output: { codeCoverages: D.list({ expired: D.ts }) },
  },
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCodeCoverages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "codeCoverages",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeTestCasesError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of details about test cases for a report.
 */
export const describeTestCases: API.PaginatedOperationMethod<
  DescribeTestCasesInput,
  DescribeTestCasesOutput,
  DescribeTestCasesError,
  Credentials | HttpClient.HttpClient,
  TestCase
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      reportArn: 0,
      nextToken: 0,
      maxResults: 0,
      filter: { status: 0, keyword: 0 },
    },
    output: { testCases: D.list({ expired: D.ts }) },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTestCases",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "testCases",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetReportGroupTrendError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Analyzes and accumulates test report values for the specified test reports.
 */
export const getReportGroupTrend: API.OperationMethod<
  GetReportGroupTrendInput,
  GetReportGroupTrendOutput,
  GetReportGroupTrendError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { reportGroupArn: 0, numOfReports: 0, trendField: 0 },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReportGroupTrend",
})) as any;

export type GetResourcePolicyError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets a resource policy that is identified by its resource ARN.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyInput,
  GetResourcePolicyOutput,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0 } },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
})) as any;

export type ImportSourceCredentialsError =
  | AccountLimitExceededException
  | InvalidInputException
  | ResourceAlreadyExistsException
  | CommonErrors;
/**
 * Imports the source repository credentials for an CodeBuild project that has its
 * source code stored in a GitHub, GitHub Enterprise, GitLab, GitLab Self Managed, or Bitbucket repository.
 */
export const importSourceCredentials: API.OperationMethod<
  ImportSourceCredentialsInput,
  ImportSourceCredentialsOutput,
  ImportSourceCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      username: 0,
      token: 0,
      serverType: 0,
      authType: 0,
      shouldOverwrite: 0,
    },
  },
  errors: [
    AccountLimitExceededException,
    InvalidInputException,
    ResourceAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportSourceCredentials",
})) as any;

export type InvalidateProjectCacheError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Resets the cache for a project.
 */
export const invalidateProjectCache: API.OperationMethod<
  InvalidateProjectCacheInput,
  InvalidateProjectCacheOutput,
  InvalidateProjectCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { projectName: 0 } },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvalidateProjectCache",
})) as any;

export type ListBuildBatchesError = InvalidInputException | CommonErrors;
/**
 * Retrieves the identifiers of your build batches in the current region.
 */
export const listBuildBatches: API.PaginatedOperationMethod<
  ListBuildBatchesInput,
  ListBuildBatchesOutput,
  ListBuildBatchesError,
  Credentials | HttpClient.HttpClient,
  NonEmptyString
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      filter: i_BuildBatchFilter,
      maxResults: 0,
      sortOrder: 0,
      nextToken: 0,
    },
  },
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBuildBatches",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "ids",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBuildBatchesForProjectError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the identifiers of the build batches for a specific project.
 */
export const listBuildBatchesForProject: API.PaginatedOperationMethod<
  ListBuildBatchesForProjectInput,
  ListBuildBatchesForProjectOutput,
  ListBuildBatchesForProjectError,
  Credentials | HttpClient.HttpClient,
  NonEmptyString
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      projectName: 0,
      filter: i_BuildBatchFilter,
      maxResults: 0,
      sortOrder: 0,
      nextToken: 0,
    },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBuildBatchesForProject",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "ids",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBuildsError = InvalidInputException | CommonErrors;
/**
 * Gets a list of build IDs, with each build ID representing a single build.
 */
export const listBuilds: API.PaginatedOperationMethod<
  ListBuildsInput,
  ListBuildsOutput,
  ListBuildsError,
  Credentials | HttpClient.HttpClient,
  NonEmptyString
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { sortOrder: 0, nextToken: 0 } },
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBuilds",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "ids",
  } as const,
})) as any;

export type ListBuildsForProjectError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets a list of build identifiers for the specified build project, with each build
 * identifier representing a single build.
 */
export const listBuildsForProject: API.PaginatedOperationMethod<
  ListBuildsForProjectInput,
  ListBuildsForProjectOutput,
  ListBuildsForProjectError,
  Credentials | HttpClient.HttpClient,
  NonEmptyString
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { projectName: 0, sortOrder: 0, nextToken: 0 },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBuildsForProject",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "ids",
  } as const,
})) as any;

export type ListCommandExecutionsForSandboxError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets a list of command executions for a sandbox.
 */
export const listCommandExecutionsForSandbox: API.PaginatedOperationMethod<
  ListCommandExecutionsForSandboxInput,
  ListCommandExecutionsForSandboxOutput,
  ListCommandExecutionsForSandboxError,
  Credentials | HttpClient.HttpClient,
  CommandExecution
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { sandboxId: 0, maxResults: 0, sortOrder: 0, nextToken: 0 },
    output: { commandExecutions: D.list(o_CommandExecution) },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCommandExecutionsForSandbox",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "commandExecutions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCuratedEnvironmentImagesError = CommonErrors;
/**
 * Gets information about Docker images that are managed by CodeBuild.
 */
export const listCuratedEnvironmentImages: API.OperationMethod<
  ListCuratedEnvironmentImagesInput,
  ListCuratedEnvironmentImagesOutput,
  ListCuratedEnvironmentImagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCuratedEnvironmentImages",
})) as any;

export type ListFleetsError = InvalidInputException | CommonErrors;
/**
 * Gets a list of compute fleet names with each compute fleet name representing a single compute fleet.
 */
export const listFleets: API.PaginatedOperationMethod<
  ListFleetsInput,
  ListFleetsOutput,
  ListFleetsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0, sortOrder: 0, sortBy: 0 },
  },
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFleets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProjectsError = InvalidInputException | CommonErrors;
/**
 * Gets a list of build project names, with each build project name representing a single
 * build project.
 */
export const listProjects: API.PaginatedOperationMethod<
  ListProjectsInput,
  ListProjectsOutput,
  ListProjectsError,
  Credentials | HttpClient.HttpClient,
  NonEmptyString
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { sortBy: 0, sortOrder: 0, nextToken: 0 },
  },
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProjects",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "projects",
  } as const,
})) as any;

export type ListReportGroupsError = InvalidInputException | CommonErrors;
/**
 * Gets a list ARNs for the report groups in the current Amazon Web Services account.
 */
export const listReportGroups: API.PaginatedOperationMethod<
  ListReportGroupsInput,
  ListReportGroupsOutput,
  ListReportGroupsError,
  Credentials | HttpClient.HttpClient,
  NonEmptyString
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { sortOrder: 0, sortBy: 0, nextToken: 0, maxResults: 0 },
  },
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReportGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "reportGroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReportsError = InvalidInputException | CommonErrors;
/**
 * Returns a list of ARNs for the reports in the current Amazon Web Services account.
 */
export const listReports: API.PaginatedOperationMethod<
  ListReportsInput,
  ListReportsOutput,
  ListReportsError,
  Credentials | HttpClient.HttpClient,
  NonEmptyString
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      sortOrder: 0,
      nextToken: 0,
      maxResults: 0,
      filter: i_ReportFilter,
    },
  },
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReports",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "reports",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReportsForReportGroupError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of ARNs for the reports that belong to a `ReportGroup`.
 */
export const listReportsForReportGroup: API.PaginatedOperationMethod<
  ListReportsForReportGroupInput,
  ListReportsForReportGroupOutput,
  ListReportsForReportGroupError,
  Credentials | HttpClient.HttpClient,
  NonEmptyString
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      reportGroupArn: 0,
      nextToken: 0,
      sortOrder: 0,
      maxResults: 0,
      filter: i_ReportFilter,
    },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReportsForReportGroup",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "reports",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSandboxesError = InvalidInputException | CommonErrors;
/**
 * Gets a list of sandboxes.
 */
export const listSandboxes: API.PaginatedOperationMethod<
  ListSandboxesInput,
  ListSandboxesOutput,
  ListSandboxesError,
  Credentials | HttpClient.HttpClient,
  NonEmptyString
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { maxResults: 0, sortOrder: 0, nextToken: 0 },
  },
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSandboxes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "ids",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSandboxesForProjectError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets a list of sandboxes for a given project.
 */
export const listSandboxesForProject: API.PaginatedOperationMethod<
  ListSandboxesForProjectInput,
  ListSandboxesForProjectOutput,
  ListSandboxesForProjectError,
  Credentials | HttpClient.HttpClient,
  NonEmptyString
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { projectName: 0, maxResults: 0, sortOrder: 0, nextToken: 0 },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSandboxesForProject",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "ids",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSharedProjectsError = InvalidInputException | CommonErrors;
/**
 * Gets a list of projects that are shared with other Amazon Web Services accounts or users.
 */
export const listSharedProjects: API.PaginatedOperationMethod<
  ListSharedProjectsInput,
  ListSharedProjectsOutput,
  ListSharedProjectsError,
  Credentials | HttpClient.HttpClient,
  NonEmptyString
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { sortBy: 0, sortOrder: 0, maxResults: 0, nextToken: 0 },
  },
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSharedProjects",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "projects",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSharedReportGroupsError = InvalidInputException | CommonErrors;
/**
 * Gets a list of report groups that are shared with other Amazon Web Services accounts or users.
 */
export const listSharedReportGroups: API.PaginatedOperationMethod<
  ListSharedReportGroupsInput,
  ListSharedReportGroupsOutput,
  ListSharedReportGroupsError,
  Credentials | HttpClient.HttpClient,
  NonEmptyString
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { sortOrder: 0, sortBy: 0, nextToken: 0, maxResults: 0 },
  },
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSharedReportGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "reportGroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSourceCredentialsError = InvalidInputException | CommonErrors;
/**
 * Returns a list of `SourceCredentialsInfo` objects.
 */
export const listSourceCredentials: API.OperationMethod<
  ListSourceCredentialsInput,
  ListSourceCredentialsOutput,
  ListSourceCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSourceCredentials",
})) as any;

export type PutResourcePolicyError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stores a resource policy for the ARN of a `Project` or
 * `ReportGroup` object.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyInput,
  PutResourcePolicyOutput,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { policy: 0, resourceArn: 0 } },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
})) as any;

export type RetryBuildError =
  | AccountLimitExceededException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Restarts a build.
 */
export const retryBuild: API.OperationMethod<
  RetryBuildInput,
  RetryBuildOutput,
  RetryBuildError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { id: 0, idempotencyToken: 0 },
    output: { build: o_Build },
  },
  errors: [
    AccountLimitExceededException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RetryBuild",
})) as any;

export type RetryBuildBatchError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Restarts a failed batch build. Only batch builds that have failed can be retried.
 */
export const retryBuildBatch: API.OperationMethod<
  RetryBuildBatchInput,
  RetryBuildBatchOutput,
  RetryBuildBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { id: 0, idempotencyToken: 0, retryType: 0 },
    output: { buildBatch: o_BuildBatch },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RetryBuildBatch",
})) as any;

export type StartBuildError =
  | AccountLimitExceededException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts running a build with the settings defined in the project. These setting include: how to run a build,
 * where to get the source code, which build environment to use, which build commands to run, and where to store the build output.
 *
 * You can also start a build run by overriding some of the build settings in the project. The overrides only apply for that
 * specific start build request. The settings in the project are unaltered.
 */
export const startBuild: API.OperationMethod<
  StartBuildInput,
  StartBuildOutput,
  StartBuildError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      projectName: 0,
      secondarySourcesOverride: D.list(i_ProjectSource),
      secondarySourcesVersionOverride: D.list(i_ProjectSourceVersion),
      sourceVersion: 0,
      artifactsOverride: i_ProjectArtifacts,
      secondaryArtifactsOverride: D.list(i_ProjectArtifacts),
      environmentVariablesOverride: D.list(i_EnvironmentVariable),
      sourceTypeOverride: 0,
      sourceLocationOverride: 0,
      sourceAuthOverride: i_SourceAuth,
      gitCloneDepthOverride: 0,
      gitSubmodulesConfigOverride: i_GitSubmodulesConfig,
      buildspecOverride: 0,
      insecureSslOverride: 0,
      reportBuildStatusOverride: 0,
      buildStatusConfigOverride: i_BuildStatusConfig,
      environmentTypeOverride: 0,
      imageOverride: 0,
      computeTypeOverride: 0,
      certificateOverride: 0,
      cacheOverride: i_ProjectCache,
      serviceRoleOverride: 0,
      privilegedModeOverride: 0,
      timeoutInMinutesOverride: 0,
      queuedTimeoutInMinutesOverride: 0,
      encryptionKeyOverride: 0,
      idempotencyToken: 0,
      logsConfigOverride: i_LogsConfig,
      registryCredentialOverride: i_RegistryCredential,
      imagePullCredentialsTypeOverride: 0,
      debugSessionEnabled: 0,
      fleetOverride: i_ProjectFleet,
      autoRetryLimitOverride: 0,
      hostKernelOverride: 0,
    },
    output: { build: o_Build },
  },
  errors: [
    AccountLimitExceededException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartBuild",
})) as any;

export type StartBuildBatchError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts a batch build for a project.
 */
export const startBuildBatch: API.OperationMethod<
  StartBuildBatchInput,
  StartBuildBatchOutput,
  StartBuildBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      projectName: 0,
      secondarySourcesOverride: D.list(i_ProjectSource),
      secondarySourcesVersionOverride: D.list(i_ProjectSourceVersion),
      sourceVersion: 0,
      artifactsOverride: i_ProjectArtifacts,
      secondaryArtifactsOverride: D.list(i_ProjectArtifacts),
      environmentVariablesOverride: D.list(i_EnvironmentVariable),
      sourceTypeOverride: 0,
      sourceLocationOverride: 0,
      sourceAuthOverride: i_SourceAuth,
      gitCloneDepthOverride: 0,
      gitSubmodulesConfigOverride: i_GitSubmodulesConfig,
      buildspecOverride: 0,
      insecureSslOverride: 0,
      reportBuildBatchStatusOverride: 0,
      environmentTypeOverride: 0,
      imageOverride: 0,
      computeTypeOverride: 0,
      certificateOverride: 0,
      cacheOverride: i_ProjectCache,
      serviceRoleOverride: 0,
      privilegedModeOverride: 0,
      buildTimeoutInMinutesOverride: 0,
      queuedTimeoutInMinutesOverride: 0,
      encryptionKeyOverride: 0,
      idempotencyToken: 0,
      logsConfigOverride: i_LogsConfig,
      registryCredentialOverride: i_RegistryCredential,
      imagePullCredentialsTypeOverride: 0,
      buildBatchConfigOverride: i_ProjectBuildBatchConfig,
      debugSessionEnabled: 0,
    },
    output: { buildBatch: o_BuildBatch },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartBuildBatch",
})) as any;

export type StartCommandExecutionError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts a command execution.
 */
export const startCommandExecution: API.OperationMethod<
  StartCommandExecutionInput,
  StartCommandExecutionOutput,
  StartCommandExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { sandboxId: 0, command: 0, type: 0 },
    output: { commandExecution: o_CommandExecution },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCommandExecution",
})) as any;

export type StartSandboxError =
  | AccountSuspendedException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts a sandbox.
 */
export const startSandbox: API.OperationMethod<
  StartSandboxInput,
  StartSandboxOutput,
  StartSandboxError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { projectName: 0, idempotencyToken: 0 },
    output: { sandbox: o_Sandbox },
  },
  errors: [
    AccountSuspendedException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSandbox",
})) as any;

export type StartSandboxConnectionError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts a sandbox connection.
 */
export const startSandboxConnection: API.OperationMethod<
  StartSandboxConnectionInput,
  StartSandboxConnectionOutput,
  StartSandboxConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { sandboxId: 0 } },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSandboxConnection",
})) as any;

export type StopBuildError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Attempts to stop running a build.
 */
export const stopBuild: API.OperationMethod<
  StopBuildInput,
  StopBuildOutput,
  StopBuildError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { id: 0 }, output: { build: o_Build } },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopBuild",
})) as any;

export type StopBuildBatchError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops a running batch build.
 */
export const stopBuildBatch: API.OperationMethod<
  StopBuildBatchInput,
  StopBuildBatchOutput,
  StopBuildBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { id: 0 },
    output: { buildBatch: o_BuildBatch },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopBuildBatch",
})) as any;

export type StopSandboxError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops a sandbox.
 */
export const stopSandbox: API.OperationMethod<
  StopSandboxInput,
  StopSandboxOutput,
  StopSandboxError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { id: 0 },
    output: { sandbox: o_Sandbox },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopSandbox",
})) as any;

export type UpdateFleetError =
  | AccountLimitExceededException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a compute fleet.
 */
export const updateFleet: API.OperationMethod<
  UpdateFleetInput,
  UpdateFleetOutput,
  UpdateFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      arn: 0,
      baseCapacity: 0,
      environmentType: 0,
      computeType: 0,
      computeConfiguration: i_ComputeConfiguration,
      scalingConfiguration: i_ScalingConfigurationInput,
      overflowBehavior: 0,
      vpcConfig: i_VpcConfig,
      proxyConfiguration: i_ProxyConfiguration,
      imageId: 0,
      fleetServiceRole: 0,
      tags: D.list(i_Tag),
    },
    output: { fleet: o_Fleet },
  },
  errors: [
    AccountLimitExceededException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFleet",
})) as any;

export type UpdateProjectError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Changes the settings of a build project.
 */
export const updateProject: API.OperationMethod<
  UpdateProjectInput,
  UpdateProjectOutput,
  UpdateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      description: 0,
      source: i_ProjectSource,
      secondarySources: D.list(i_ProjectSource),
      sourceVersion: 0,
      secondarySourceVersions: D.list(i_ProjectSourceVersion),
      artifacts: i_ProjectArtifacts,
      secondaryArtifacts: D.list(i_ProjectArtifacts),
      cache: i_ProjectCache,
      environment: i_ProjectEnvironment,
      serviceRole: 0,
      timeoutInMinutes: 0,
      queuedTimeoutInMinutes: 0,
      encryptionKey: 0,
      tags: D.list(i_Tag),
      vpcConfig: i_VpcConfig,
      badgeEnabled: 0,
      logsConfig: i_LogsConfig,
      fileSystemLocations: D.list(i_ProjectFileSystemLocation),
      buildBatchConfig: i_ProjectBuildBatchConfig,
      concurrentBuildLimit: 0,
      autoRetryLimit: 0,
    },
    output: { project: o_Project },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProject",
})) as any;

export type UpdateProjectVisibilityError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Changes the public visibility for a project. The project's build results, logs, and
 * artifacts are available to the general public. For more information, see Public build
 * projects in the *CodeBuild User Guide*.
 *
 * The following should be kept in mind when making your projects public:
 *
 * - All of a project's build results, logs, and artifacts, including builds that were run
 * when the project was private, are available to the general public.
 *
 * - All build logs and artifacts are available to the public. Environment variables, source
 * code, and other sensitive information may have been output to the build logs and artifacts.
 * You must be careful about what information is output to the build logs. Some best practice
 * are:
 *
 * - Do not store sensitive values in environment variables. We recommend that you use an Amazon EC2 Systems Manager Parameter Store
 * or Secrets Manager to store sensitive values.
 *
 * - Follow Best
 * practices for using webhooks in the CodeBuild User
 * Guide to limit which entities can trigger a build, and do
 * not store the buildspec in the project itself, to ensure that your webhooks are as
 * secure as possible.
 *
 * - A malicious user can use public builds to distribute malicious artifacts. We recommend
 * that you review all pull requests to verify that the pull request is a legitimate change. We
 * also recommend that you validate any artifacts with their checksums to make sure that the
 * correct artifacts are being downloaded.
 */
export const updateProjectVisibility: API.OperationMethod<
  UpdateProjectVisibilityInput,
  UpdateProjectVisibilityOutput,
  UpdateProjectVisibilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { projectArn: 0, projectVisibility: 0, resourceAccessRole: 0 },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProjectVisibility",
})) as any;

export type UpdateReportGroupError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a report group.
 */
export const updateReportGroup: API.OperationMethod<
  UpdateReportGroupInput,
  UpdateReportGroupOutput,
  UpdateReportGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { arn: 0, exportConfig: i_ReportExportConfig, tags: D.list(i_Tag) },
    output: { reportGroup: o_ReportGroup },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReportGroup",
})) as any;

export type UpdateWebhookError =
  | InvalidInputException
  | OAuthProviderException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the webhook associated with an CodeBuild build project.
 *
 * If you use Bitbucket for your repository, `rotateSecret` is ignored.
 */
export const updateWebhook: API.OperationMethod<
  UpdateWebhookInput,
  UpdateWebhookOutput,
  UpdateWebhookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      projectName: 0,
      branchFilter: 0,
      rotateSecret: 0,
      filterGroups: D.list(D.list(i_WebhookFilter)),
      buildType: 0,
      pullRequestBuildPolicy: i_PullRequestBuildPolicy,
    },
    output: { webhook: o_Webhook },
  },
  errors: [
    InvalidInputException,
    OAuthProviderException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWebhook",
})) as any;

const i_BuildBatchFilter: D.LazyStruct = () => ({ status: 0 });
const i_BuildStatusConfig: D.LazyStruct = () => ({ context: 0, targetUrl: 0 });
const i_ComputeConfiguration: D.LazyStruct = () => ({
  vCpu: 0,
  memory: 0,
  disk: 0,
  machineType: 0,
  instanceType: 0,
});
const i_EnvironmentVariable: D.LazyStruct = () => ({
  name: 0,
  value: 0,
  type: 0,
});
const i_GitSubmodulesConfig: D.LazyStruct = () => ({ fetchSubmodules: 0 });
const i_LogsConfig: D.LazyStruct = () => ({
  cloudWatchLogs: { status: 0, groupName: 0, streamName: 0 },
  s3Logs: {
    status: 0,
    location: 0,
    encryptionDisabled: 0,
    bucketOwnerAccess: 0,
  },
});
const i_ProjectArtifacts: D.LazyStruct = () => ({
  type: 0,
  location: 0,
  path: 0,
  namespaceType: 0,
  name: 0,
  packaging: 0,
  overrideArtifactName: 0,
  encryptionDisabled: 0,
  artifactIdentifier: 0,
  bucketOwnerAccess: 0,
});
const i_ProjectBuildBatchConfig: D.LazyStruct = () => ({
  serviceRole: 0,
  combineArtifacts: 0,
  restrictions: {
    maximumBuildsAllowed: 0,
    computeTypesAllowed: 0,
    fleetsAllowed: 0,
  },
  timeoutInMins: 0,
  batchReportMode: 0,
});
const i_ProjectCache: D.LazyStruct = () => ({
  type: 0,
  location: 0,
  modes: 0,
  cacheNamespace: 0,
});
const i_ProjectEnvironment: D.LazyStruct = () => ({
  type: 0,
  image: 0,
  computeType: 0,
  computeConfiguration: i_ComputeConfiguration,
  fleet: i_ProjectFleet,
  environmentVariables: D.list(i_EnvironmentVariable),
  privilegedMode: 0,
  certificate: 0,
  registryCredential: i_RegistryCredential,
  imagePullCredentialsType: 0,
  dockerServer: {
    computeType: 0,
    securityGroupIds: 0,
    status: { status: 0, message: 0 },
  },
  hostKernel: 0,
});
const i_ProjectFileSystemLocation: D.LazyStruct = () => ({
  type: 0,
  location: 0,
  mountPoint: 0,
  identifier: 0,
  mountOptions: 0,
});
const i_ProjectFleet: D.LazyStruct = () => ({ fleetArn: 0 });
const i_ProjectSource: D.LazyStruct = () => ({
  type: 0,
  location: 0,
  gitCloneDepth: 0,
  gitSubmodulesConfig: i_GitSubmodulesConfig,
  buildspec: 0,
  auth: i_SourceAuth,
  reportBuildStatus: 0,
  buildStatusConfig: i_BuildStatusConfig,
  insecureSsl: 0,
  sourceIdentifier: 0,
});
const i_ProjectSourceVersion: D.LazyStruct = () => ({
  sourceIdentifier: 0,
  sourceVersion: 0,
});
const i_ProxyConfiguration: D.LazyStruct = () => ({
  defaultBehavior: 0,
  orderedProxyRules: D.list({ type: 0, effect: 0, entities: 0 }),
});
const i_PullRequestBuildPolicy: D.LazyStruct = () => ({
  requiresCommentApproval: 0,
  approverRoles: 0,
});
const i_RegistryCredential: D.LazyStruct = () => ({
  credential: 0,
  credentialProvider: 0,
});
const i_ReportExportConfig: D.LazyStruct = () => ({
  exportConfigType: 0,
  s3Destination: {
    bucket: 0,
    bucketOwner: 0,
    path: 0,
    packaging: 0,
    encryptionKey: 0,
    encryptionDisabled: 0,
  },
});
const i_ReportFilter: D.LazyStruct = () => ({ status: 0 });
const i_ScalingConfigurationInput: D.LazyStruct = () => ({
  scalingType: 0,
  targetTrackingScalingConfigs: D.list({ metricType: 0, targetValue: 0 }),
  maxCapacity: 0,
});
const i_SourceAuth: D.LazyStruct = () => ({ type: 0, resource: 0 });
const i_Tag: D.LazyStruct = () => ({ key: 0, value: 0 });
const i_VpcConfig: D.LazyStruct = () => ({
  vpcId: 0,
  subnets: 0,
  securityGroupIds: 0,
});
const i_WebhookFilter: D.LazyStruct = () => ({
  type: 0,
  pattern: 0,
  excludeMatchedPattern: 0,
});
const o_Build: D.LazyStruct = () => ({
  startTime: D.ts,
  endTime: D.ts,
  phases: D.list({ startTime: D.ts, endTime: D.ts }),
});
const o_BuildBatch: D.LazyStruct = () => ({
  startTime: D.ts,
  endTime: D.ts,
  phases: D.list({ startTime: D.ts, endTime: D.ts }),
  buildGroups: D.list({
    currentBuildSummary: o_BuildSummary,
    priorBuildSummaryList: D.list(o_BuildSummary),
  }),
});
const o_CommandExecution: D.LazyStruct = () => ({
  submitTime: D.ts,
  startTime: D.ts,
  endTime: D.ts,
  command: D.secret,
  standardOutputContent: D.secret,
  standardErrContent: D.secret,
});
const o_Fleet: D.LazyStruct = () => ({ created: D.ts, lastModified: D.ts });
const o_Project: D.LazyStruct = () => ({
  created: D.ts,
  lastModified: D.ts,
  webhook: o_Webhook,
});
const o_ReportGroup: D.LazyStruct = () => ({
  created: D.ts,
  lastModified: D.ts,
});
const o_Sandbox: D.LazyStruct = () => ({
  requestTime: D.ts,
  startTime: D.ts,
  endTime: D.ts,
  currentSession: {
    startTime: D.ts,
    endTime: D.ts,
    phases: D.list({ startTime: D.ts, endTime: D.ts }),
  },
});
const o_Webhook: D.LazyStruct = () => ({ lastModifiedSecret: D.ts });
const o_BuildSummary: D.LazyStruct = () => ({ requestedOn: D.ts });
