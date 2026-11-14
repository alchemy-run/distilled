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
  sdkId: "CodeBuild",
  serviceShapeName: "CodeBuild_20161006",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "codebuild" });
const ver = /*@__PURE__*/ T.ServiceVersion("2016-10-06");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
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
      return err("Invalid Configuration: FIPS and custom endpoint are not supported");
    }
    if (UseDualStack === true) {
      return err("Invalid Configuration: Dualstack and custom endpoint are not supported");
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
            return e(`https://codebuild-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://codebuild.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://codebuild.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://codebuild.{R}.{D}","properties":{},"headers":{}}');

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "CodeBuild",
  service: "CodeBuild",
  templates: false,
  propagate: TxXray.propagate,
} as const;

export class AccountLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<AccountLimitExceededException>()(
    "AccountLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class AccountSuspendedException
  extends /*@__PURE__*/ S.TaggedError<AccountSuspendedException>()("AccountSuspendedException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()("InvalidInputException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class OAuthProviderException
  extends /*@__PURE__*/ S.TaggedError<OAuthProviderException>()("OAuthProviderException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyExistsException>()(
    "ResourceAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()("ResourceNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export type NonEmptyString = string;
export type BuildIds = string[];
export interface BatchDeleteBuildsInput {
  ids: string[];
}
export interface BuildNotDeleted {
  id?: string | undefined;
  statusCode?: string | undefined;
}
export type BuildsNotDeleted = BuildNotDeleted[];
export interface BatchDeleteBuildsOutput {
  buildsDeleted?: string[] | undefined;
  buildsNotDeleted?: BuildNotDeleted[] | undefined;
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
  statusCode?: string | undefined;
  message?: string | undefined;
}
export type PhaseContexts = PhaseContext[];
export interface BuildBatchPhase {
  phaseType?: BuildBatchPhaseType | undefined;
  phaseStatus?: StatusType | undefined;
  startTime?: Date | undefined;
  endTime?: Date | undefined;
  durationInSeconds?: number | undefined;
  contexts?: PhaseContext[] | undefined;
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
export type SourceAuthType = "OAUTH" | "CODECONNECTIONS" | "SECRETS_MANAGER" | (string & {});
export interface SourceAuth {
  type: SourceAuthType;
  resource?: string | undefined;
}
export interface BuildStatusConfig {
  context?: string | undefined;
  targetUrl?: string | undefined;
}
export interface ProjectSource {
  type: SourceType;
  location?: string | undefined;
  gitCloneDepth?: number | undefined;
  gitSubmodulesConfig?: GitSubmodulesConfig | undefined;
  buildspec?: string | undefined;
  auth?: SourceAuth | undefined;
  reportBuildStatus?: boolean | undefined;
  buildStatusConfig?: BuildStatusConfig | undefined;
  insecureSsl?: boolean | undefined;
  sourceIdentifier?: string | undefined;
}
export type ProjectSources = ProjectSource[];
export interface ProjectSourceVersion {
  sourceIdentifier: string;
  sourceVersion: string;
}
export type ProjectSecondarySourceVersions = ProjectSourceVersion[];
export type BucketOwnerAccess = "NONE" | "READ_ONLY" | "FULL" | (string & {});
export interface BuildArtifacts {
  location?: string | undefined;
  sha256sum?: string | undefined;
  md5sum?: string | undefined;
  overrideArtifactName?: boolean | undefined;
  encryptionDisabled?: boolean | undefined;
  artifactIdentifier?: string | undefined;
  bucketOwnerAccess?: BucketOwnerAccess | undefined;
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
  location?: string | undefined;
  modes?: CacheMode[] | undefined;
  cacheNamespace?: string | undefined;
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
  vCpu?: number | undefined;
  memory?: number | undefined;
  disk?: number | undefined;
  machineType?: MachineType | undefined;
  instanceType?: string | undefined;
}
export interface ProjectFleet {
  fleetArn?: string | undefined;
}
export type EnvironmentVariableType =
  | "PLAINTEXT"
  | "PARAMETER_STORE"
  | "SECRETS_MANAGER"
  | (string & {});
export interface EnvironmentVariable {
  name: string;
  value: string;
  type?: EnvironmentVariableType | undefined;
}
export type EnvironmentVariables = EnvironmentVariable[];
export type CredentialProviderType = "SECRETS_MANAGER" | (string & {});
export interface RegistryCredential {
  credential: string;
  credentialProvider: CredentialProviderType;
}
export type ImagePullCredentialsType = "CODEBUILD" | "SERVICE_ROLE" | (string & {});
export type SecurityGroupIds = string[];
export interface DockerServerStatus {
  status?: string | undefined;
  message?: string | undefined;
}
export interface DockerServer {
  computeType: ComputeType;
  securityGroupIds?: string[] | undefined;
  status?: DockerServerStatus | undefined;
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
  computeConfiguration?: ComputeConfiguration | undefined;
  fleet?: ProjectFleet | undefined;
  environmentVariables?: EnvironmentVariable[] | undefined;
  privilegedMode?: boolean | undefined;
  certificate?: string | undefined;
  registryCredential?: RegistryCredential | undefined;
  imagePullCredentialsType?: ImagePullCredentialsType | undefined;
  dockerServer?: DockerServer | undefined;
  hostKernel?: HostKernel | undefined;
}
export type LogsConfigStatusType = "ENABLED" | "DISABLED" | (string & {});
export interface CloudWatchLogsConfig {
  status: LogsConfigStatusType;
  groupName?: string | undefined;
  streamName?: string | undefined;
}
export interface S3LogsConfig {
  status: LogsConfigStatusType;
  location?: string | undefined;
  encryptionDisabled?: boolean | undefined;
  bucketOwnerAccess?: BucketOwnerAccess | undefined;
}
export interface LogsConfig {
  cloudWatchLogs?: CloudWatchLogsConfig | undefined;
  s3Logs?: S3LogsConfig | undefined;
}
export type Subnets = string[];
export interface VpcConfig {
  vpcId?: string | undefined;
  subnets?: string[] | undefined;
  securityGroupIds?: string[] | undefined;
}
export type FileSystemType = "EFS" | (string & {});
export interface ProjectFileSystemLocation {
  type?: FileSystemType | undefined;
  location?: string | undefined;
  mountPoint?: string | undefined;
  identifier?: string | undefined;
  mountOptions?: string | undefined;
}
export type ProjectFileSystemLocations = ProjectFileSystemLocation[];
export type ComputeTypesAllowed = string[];
export type FleetsAllowed = string[];
export interface BatchRestrictions {
  maximumBuildsAllowed?: number | undefined;
  computeTypesAllowed?: string[] | undefined;
  fleetsAllowed?: string[] | undefined;
}
export type BatchReportModeType =
  | "REPORT_INDIVIDUAL_BUILDS"
  | "REPORT_AGGREGATED_BATCH"
  | (string & {});
export interface ProjectBuildBatchConfig {
  serviceRole?: string | undefined;
  combineArtifacts?: boolean | undefined;
  restrictions?: BatchRestrictions | undefined;
  timeoutInMins?: number | undefined;
  batchReportMode?: BatchReportModeType | undefined;
}
export type Identifiers = string[];
export type ArtifactsType = "CODEPIPELINE" | "S3" | "NO_ARTIFACTS" | (string & {});
export interface ResolvedArtifact {
  type?: ArtifactsType | undefined;
  location?: string | undefined;
  identifier?: string | undefined;
}
export type ResolvedSecondaryArtifacts = ResolvedArtifact[];
export interface BuildSummary {
  arn?: string | undefined;
  requestedOn?: Date | undefined;
  buildStatus?: StatusType | undefined;
  primaryArtifact?: ResolvedArtifact | undefined;
  secondaryArtifacts?: ResolvedArtifact[] | undefined;
}
export type BuildSummaries = BuildSummary[];
export interface BuildGroup {
  identifier?: string | undefined;
  dependsOn?: string[] | undefined;
  ignoreFailure?: boolean | undefined;
  currentBuildSummary?: BuildSummary | undefined;
  priorBuildSummaryList?: BuildSummary[] | undefined;
}
export type BuildGroups = BuildGroup[];
export type BuildReportArns = string[];
export interface BuildBatch {
  id?: string | undefined;
  arn?: string | undefined;
  startTime?: Date | undefined;
  endTime?: Date | undefined;
  currentPhase?: string | undefined;
  buildBatchStatus?: StatusType | undefined;
  sourceVersion?: string | undefined;
  resolvedSourceVersion?: string | undefined;
  projectName?: string | undefined;
  phases?: BuildBatchPhase[] | undefined;
  source?: ProjectSource | undefined;
  secondarySources?: ProjectSource[] | undefined;
  secondarySourceVersions?: ProjectSourceVersion[] | undefined;
  artifacts?: BuildArtifacts | undefined;
  secondaryArtifacts?: BuildArtifacts[] | undefined;
  cache?: ProjectCache | undefined;
  environment?: ProjectEnvironment | undefined;
  serviceRole?: string | undefined;
  logConfig?: LogsConfig | undefined;
  buildTimeoutInMinutes?: number | undefined;
  queuedTimeoutInMinutes?: number | undefined;
  complete?: boolean | undefined;
  initiator?: string | undefined;
  vpcConfig?: VpcConfig | undefined;
  encryptionKey?: string | undefined;
  buildBatchNumber?: number | undefined;
  fileSystemLocations?: ProjectFileSystemLocation[] | undefined;
  buildBatchConfig?: ProjectBuildBatchConfig | undefined;
  buildGroups?: BuildGroup[] | undefined;
  debugSessionEnabled?: boolean | undefined;
  reportArns?: string[] | undefined;
}
export type BuildBatches = BuildBatch[];
export interface BatchGetBuildBatchesOutput {
  buildBatches?: BuildBatch[] | undefined;
  buildBatchesNotFound?: string[] | undefined;
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
  phaseType?: BuildPhaseType | undefined;
  phaseStatus?: StatusType | undefined;
  startTime?: Date | undefined;
  endTime?: Date | undefined;
  durationInSeconds?: number | undefined;
  contexts?: PhaseContext[] | undefined;
}
export type BuildPhases = BuildPhase[];
export interface LogsLocation {
  groupName?: string | undefined;
  streamName?: string | undefined;
  deepLink?: string | undefined;
  s3DeepLink?: string | undefined;
  cloudWatchLogsArn?: string | undefined;
  s3LogsArn?: string | undefined;
  cloudWatchLogs?: CloudWatchLogsConfig | undefined;
  s3Logs?: S3LogsConfig | undefined;
}
export interface NetworkInterface {
  subnetId?: string | undefined;
  networkInterfaceId?: string | undefined;
}
export interface ExportedEnvironmentVariable {
  name?: string | undefined;
  value?: string | undefined;
}
export type ExportedEnvironmentVariables = ExportedEnvironmentVariable[];
export interface DebugSession {
  sessionEnabled?: boolean | undefined;
  sessionTarget?: string | undefined;
}
export interface AutoRetryConfig {
  autoRetryLimit?: number | undefined;
  autoRetryNumber?: number | undefined;
  nextAutoRetry?: string | undefined;
  previousAutoRetry?: string | undefined;
}
export interface Build {
  id?: string | undefined;
  arn?: string | undefined;
  buildNumber?: number | undefined;
  startTime?: Date | undefined;
  endTime?: Date | undefined;
  currentPhase?: string | undefined;
  buildStatus?: StatusType | undefined;
  sourceVersion?: string | undefined;
  resolvedSourceVersion?: string | undefined;
  projectName?: string | undefined;
  phases?: BuildPhase[] | undefined;
  source?: ProjectSource | undefined;
  secondarySources?: ProjectSource[] | undefined;
  secondarySourceVersions?: ProjectSourceVersion[] | undefined;
  artifacts?: BuildArtifacts | undefined;
  secondaryArtifacts?: BuildArtifacts[] | undefined;
  cache?: ProjectCache | undefined;
  environment?: ProjectEnvironment | undefined;
  serviceRole?: string | undefined;
  logs?: LogsLocation | undefined;
  timeoutInMinutes?: number | undefined;
  queuedTimeoutInMinutes?: number | undefined;
  buildComplete?: boolean | undefined;
  initiator?: string | undefined;
  vpcConfig?: VpcConfig | undefined;
  networkInterface?: NetworkInterface | undefined;
  encryptionKey?: string | undefined;
  exportedEnvironmentVariables?: ExportedEnvironmentVariable[] | undefined;
  reportArns?: string[] | undefined;
  fileSystemLocations?: ProjectFileSystemLocation[] | undefined;
  debugSession?: DebugSession | undefined;
  buildBatchArn?: string | undefined;
  autoRetryConfig?: AutoRetryConfig | undefined;
}
export type Builds = Build[];
export interface BatchGetBuildsOutput {
  builds?: Build[] | undefined;
  buildsNotFound?: string[] | undefined;
}
export type CommandExecutionIds = string[];
export interface BatchGetCommandExecutionsInput {
  sandboxId: string;
  commandExecutionIds: string[];
}
export type SensitiveNonEmptyString = string | redacted.Redacted<string>;
export type CommandType = "SHELL" | (string & {});
export interface CommandExecution {
  id?: string | undefined;
  sandboxId?: string | undefined;
  submitTime?: Date | undefined;
  startTime?: Date | undefined;
  endTime?: Date | undefined;
  status?: string | undefined;
  command?: string | redacted.Redacted<string> | undefined;
  type?: CommandType | undefined;
  exitCode?: string | undefined;
  standardOutputContent?: string | redacted.Redacted<string> | undefined;
  standardErrContent?: string | redacted.Redacted<string> | undefined;
  logs?: LogsLocation | undefined;
  sandboxArn?: string | undefined;
}
export type CommandExecutions = CommandExecution[];
export interface BatchGetCommandExecutionsOutput {
  commandExecutions?: CommandExecution[] | undefined;
  commandExecutionsNotFound?: string[] | undefined;
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
  statusCode?: FleetStatusCode | undefined;
  context?: FleetContextCode | undefined;
  message?: string | undefined;
}
export type FleetCapacity = number;
export type FleetScalingType = "TARGET_TRACKING_SCALING" | (string & {});
export type FleetScalingMetricType = "FLEET_UTILIZATION_RATE" | (string & {});
export interface TargetTrackingScalingConfiguration {
  metricType?: FleetScalingMetricType | undefined;
  targetValue?: number | undefined;
}
export type TargetTrackingScalingConfigurations = TargetTrackingScalingConfiguration[];
export interface ScalingConfigurationOutput {
  scalingType?: FleetScalingType | undefined;
  targetTrackingScalingConfigs?: TargetTrackingScalingConfiguration[] | undefined;
  maxCapacity?: number | undefined;
  desiredCapacity?: number | undefined;
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
  defaultBehavior?: FleetProxyRuleBehavior | undefined;
  orderedProxyRules?: FleetProxyRule[] | undefined;
}
export type KeyInput = string;
export type ValueInput = string;
export interface Tag {
  key?: string | undefined;
  value?: string | undefined;
}
export type TagList = Tag[];
export interface Fleet {
  arn?: string | undefined;
  name?: string | undefined;
  id?: string | undefined;
  created?: Date | undefined;
  lastModified?: Date | undefined;
  status?: FleetStatus | undefined;
  baseCapacity?: number | undefined;
  environmentType?: EnvironmentType | undefined;
  computeType?: ComputeType | undefined;
  computeConfiguration?: ComputeConfiguration | undefined;
  scalingConfiguration?: ScalingConfigurationOutput | undefined;
  overflowBehavior?: FleetOverflowBehavior | undefined;
  vpcConfig?: VpcConfig | undefined;
  proxyConfiguration?: ProxyConfiguration | undefined;
  imageId?: string | undefined;
  fleetServiceRole?: string | undefined;
  tags?: Tag[] | undefined;
}
export type Fleets = Fleet[];
export interface BatchGetFleetsOutput {
  fleets?: Fleet[] | undefined;
  fleetsNotFound?: string[] | undefined;
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
  location?: string | undefined;
  path?: string | undefined;
  namespaceType?: ArtifactNamespace | undefined;
  name?: string | undefined;
  packaging?: ArtifactPackaging | undefined;
  overrideArtifactName?: boolean | undefined;
  encryptionDisabled?: boolean | undefined;
  artifactIdentifier?: string | undefined;
  bucketOwnerAccess?: BucketOwnerAccess | undefined;
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
  excludeMatchedPattern?: boolean | undefined;
}
export type FilterGroup = WebhookFilter[];
export type FilterGroups = WebhookFilter[][];
export type WebhookBuildType = "BUILD" | "BUILD_BATCH" | "RUNNER_BUILDKITE_BUILD" | (string & {});
export type WebhookScopeType =
  | "GITHUB_ORGANIZATION"
  | "GITHUB_GLOBAL"
  | "GITLAB_GROUP"
  | (string & {});
export interface ScopeConfiguration {
  name: string;
  domain?: string | undefined;
  scope: WebhookScopeType;
}
export type WebhookStatus = "CREATING" | "CREATE_FAILED" | "ACTIVE" | "DELETING" | (string & {});
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
  approverRoles?: PullRequestBuildApproverRole[] | undefined;
}
export interface Webhook {
  url?: string | undefined;
  payloadUrl?: string | undefined;
  secret?: string | undefined;
  branchFilter?: string | undefined;
  filterGroups?: WebhookFilter[][] | undefined;
  buildType?: WebhookBuildType | undefined;
  manualCreation?: boolean | undefined;
  lastModifiedSecret?: Date | undefined;
  scopeConfiguration?: ScopeConfiguration | undefined;
  status?: WebhookStatus | undefined;
  statusMessage?: string | undefined;
  pullRequestBuildPolicy?: PullRequestBuildPolicy | undefined;
}
export interface ProjectBadge {
  badgeEnabled?: boolean | undefined;
  badgeRequestUrl?: string | undefined;
}
export type ProjectVisibilityType = "PUBLIC_READ" | "PRIVATE" | (string & {});
export interface Project {
  name?: string | undefined;
  arn?: string | undefined;
  description?: string | undefined;
  source?: ProjectSource | undefined;
  secondarySources?: ProjectSource[] | undefined;
  sourceVersion?: string | undefined;
  secondarySourceVersions?: ProjectSourceVersion[] | undefined;
  artifacts?: ProjectArtifacts | undefined;
  secondaryArtifacts?: ProjectArtifacts[] | undefined;
  cache?: ProjectCache | undefined;
  environment?: ProjectEnvironment | undefined;
  serviceRole?: string | undefined;
  timeoutInMinutes?: number | undefined;
  queuedTimeoutInMinutes?: number | undefined;
  encryptionKey?: string | undefined;
  tags?: Tag[] | undefined;
  created?: Date | undefined;
  lastModified?: Date | undefined;
  webhook?: Webhook | undefined;
  vpcConfig?: VpcConfig | undefined;
  badge?: ProjectBadge | undefined;
  logsConfig?: LogsConfig | undefined;
  fileSystemLocations?: ProjectFileSystemLocation[] | undefined;
  buildBatchConfig?: ProjectBuildBatchConfig | undefined;
  concurrentBuildLimit?: number | undefined;
  projectVisibility?: ProjectVisibilityType | undefined;
  publicProjectAlias?: string | undefined;
  resourceAccessRole?: string | undefined;
  autoRetryLimit?: number | undefined;
}
export type Projects = Project[];
export interface BatchGetProjectsOutput {
  projects?: Project[] | undefined;
  projectsNotFound?: string[] | undefined;
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
  bucket?: string | undefined;
  bucketOwner?: string | undefined;
  path?: string | undefined;
  packaging?: ReportPackagingType | undefined;
  encryptionKey?: string | undefined;
  encryptionDisabled?: boolean | undefined;
}
export interface ReportExportConfig {
  exportConfigType?: ReportExportConfigType | undefined;
  s3Destination?: S3ReportExportConfig | undefined;
}
export type ReportGroupStatusType = "ACTIVE" | "DELETING" | (string & {});
export interface ReportGroup {
  arn?: string | undefined;
  name?: string | undefined;
  type?: ReportType | undefined;
  exportConfig?: ReportExportConfig | undefined;
  created?: Date | undefined;
  lastModified?: Date | undefined;
  tags?: Tag[] | undefined;
  status?: ReportGroupStatusType | undefined;
}
export type ReportGroups = ReportGroup[];
export interface BatchGetReportGroupsOutput {
  reportGroups?: ReportGroup[] | undefined;
  reportGroupsNotFound?: string[] | undefined;
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
  lineCoveragePercentage?: number | undefined;
  linesCovered?: number | undefined;
  linesMissed?: number | undefined;
  branchCoveragePercentage?: number | undefined;
  branchesCovered?: number | undefined;
  branchesMissed?: number | undefined;
}
export interface Report {
  arn?: string | undefined;
  type?: ReportType | undefined;
  name?: string | undefined;
  reportGroupArn?: string | undefined;
  executionId?: string | undefined;
  status?: ReportStatusType | undefined;
  created?: Date | undefined;
  expired?: Date | undefined;
  exportConfig?: ReportExportConfig | undefined;
  truncated?: boolean | undefined;
  testSummary?: TestReportSummary | undefined;
  codeCoverageSummary?: CodeCoverageReportSummary | undefined;
}
export type Reports = Report[];
export interface BatchGetReportsOutput {
  reports?: Report[] | undefined;
  reportsNotFound?: string[] | undefined;
}
export type SandboxIds = string[];
export interface BatchGetSandboxesInput {
  ids: string[];
}
export interface SandboxSessionPhase {
  phaseType?: string | undefined;
  phaseStatus?: StatusType | undefined;
  startTime?: Date | undefined;
  endTime?: Date | undefined;
  durationInSeconds?: number | undefined;
  contexts?: PhaseContext[] | undefined;
}
export type SandboxSessionPhases = SandboxSessionPhase[];
export interface SandboxSession {
  id?: string | undefined;
  status?: string | undefined;
  startTime?: Date | undefined;
  endTime?: Date | undefined;
  currentPhase?: string | undefined;
  phases?: SandboxSessionPhase[] | undefined;
  resolvedSourceVersion?: string | undefined;
  logs?: LogsLocation | undefined;
  networkInterface?: NetworkInterface | undefined;
}
export interface Sandbox {
  id?: string | undefined;
  arn?: string | undefined;
  projectName?: string | undefined;
  requestTime?: Date | undefined;
  startTime?: Date | undefined;
  endTime?: Date | undefined;
  status?: string | undefined;
  source?: ProjectSource | undefined;
  sourceVersion?: string | undefined;
  secondarySources?: ProjectSource[] | undefined;
  secondarySourceVersions?: ProjectSourceVersion[] | undefined;
  environment?: ProjectEnvironment | undefined;
  fileSystemLocations?: ProjectFileSystemLocation[] | undefined;
  timeoutInMinutes?: number | undefined;
  queuedTimeoutInMinutes?: number | undefined;
  vpcConfig?: VpcConfig | undefined;
  logConfig?: LogsConfig | undefined;
  encryptionKey?: string | undefined;
  serviceRole?: string | undefined;
  currentSession?: SandboxSession | undefined;
}
export type Sandboxes = Sandbox[];
export interface BatchGetSandboxesOutput {
  sandboxes?: Sandbox[] | undefined;
  sandboxesNotFound?: string[] | undefined;
}
export interface ScalingConfigurationInput {
  scalingType?: FleetScalingType | undefined;
  targetTrackingScalingConfigs?: TargetTrackingScalingConfiguration[] | undefined;
  maxCapacity?: number | undefined;
}
export interface CreateFleetInput {
  name: string;
  baseCapacity: number;
  environmentType: EnvironmentType;
  computeType: ComputeType;
  computeConfiguration?: ComputeConfiguration | undefined;
  scalingConfiguration?: ScalingConfigurationInput | undefined;
  overflowBehavior?: FleetOverflowBehavior | undefined;
  vpcConfig?: VpcConfig | undefined;
  proxyConfiguration?: ProxyConfiguration | undefined;
  imageId?: string | undefined;
  fleetServiceRole?: string | undefined;
  tags?: Tag[] | undefined;
}
export interface CreateFleetOutput {
  fleet?: Fleet | undefined;
}
export interface CreateProjectInput {
  name: string;
  description?: string | undefined;
  source: ProjectSource;
  secondarySources?: ProjectSource[] | undefined;
  sourceVersion?: string | undefined;
  secondarySourceVersions?: ProjectSourceVersion[] | undefined;
  artifacts: ProjectArtifacts;
  secondaryArtifacts?: ProjectArtifacts[] | undefined;
  cache?: ProjectCache | undefined;
  environment: ProjectEnvironment;
  serviceRole: string;
  timeoutInMinutes?: number | undefined;
  queuedTimeoutInMinutes?: number | undefined;
  encryptionKey?: string | undefined;
  tags?: Tag[] | undefined;
  vpcConfig?: VpcConfig | undefined;
  badgeEnabled?: boolean | undefined;
  logsConfig?: LogsConfig | undefined;
  fileSystemLocations?: ProjectFileSystemLocation[] | undefined;
  buildBatchConfig?: ProjectBuildBatchConfig | undefined;
  concurrentBuildLimit?: number | undefined;
  autoRetryLimit?: number | undefined;
}
export interface CreateProjectOutput {
  project?: Project | undefined;
}
export interface CreateReportGroupInput {
  name: string;
  type: ReportType;
  exportConfig: ReportExportConfig;
  tags?: Tag[] | undefined;
}
export interface CreateReportGroupOutput {
  reportGroup?: ReportGroup | undefined;
}
export interface CreateWebhookInput {
  projectName: string;
  branchFilter?: string | undefined;
  filterGroups?: WebhookFilter[][] | undefined;
  buildType?: WebhookBuildType | undefined;
  manualCreation?: boolean | undefined;
  scopeConfiguration?: ScopeConfiguration | undefined;
  pullRequestBuildPolicy?: PullRequestBuildPolicy | undefined;
}
export interface CreateWebhookOutput {
  webhook?: Webhook | undefined;
}
export interface DeleteBuildBatchInput {
  id: string;
}
export interface DeleteBuildBatchOutput {
  statusCode?: string | undefined;
  buildsDeleted?: string[] | undefined;
  buildsNotDeleted?: BuildNotDeleted[] | undefined;
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
  deleteReports?: boolean | undefined;
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
  arn?: string | undefined;
}
export interface DeleteWebhookInput {
  projectName: string;
}
export interface DeleteWebhookOutput {}
export type PageSize = number;
export type SortOrderType = "ASCENDING" | "DESCENDING" | (string & {});
export type ReportCodeCoverageSortByType = "LINE_COVERAGE_PERCENTAGE" | "FILE_PATH" | (string & {});
export interface DescribeCodeCoveragesInput {
  reportArn: string;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
  sortOrder?: SortOrderType | undefined;
  sortBy?: ReportCodeCoverageSortByType | undefined;
  minLineCoveragePercentage?: number | undefined;
  maxLineCoveragePercentage?: number | undefined;
}
export interface CodeCoverage {
  id?: string | undefined;
  reportARN?: string | undefined;
  filePath?: string | undefined;
  lineCoveragePercentage?: number | undefined;
  linesCovered?: number | undefined;
  linesMissed?: number | undefined;
  branchCoveragePercentage?: number | undefined;
  branchesCovered?: number | undefined;
  branchesMissed?: number | undefined;
  expired?: Date | undefined;
}
export type CodeCoverages = CodeCoverage[];
export interface DescribeCodeCoveragesOutput {
  nextToken?: string | undefined;
  codeCoverages?: CodeCoverage[] | undefined;
}
export interface TestCaseFilter {
  status?: string | undefined;
  keyword?: string | undefined;
}
export interface DescribeTestCasesInput {
  reportArn: string;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
  filter?: TestCaseFilter | undefined;
}
export interface TestCase {
  reportArn?: string | undefined;
  testRawDataPath?: string | undefined;
  prefix?: string | undefined;
  name?: string | undefined;
  status?: string | undefined;
  durationInNanoSeconds?: number | undefined;
  message?: string | undefined;
  expired?: Date | undefined;
  testSuiteName?: string | undefined;
}
export type TestCases = TestCase[];
export interface DescribeTestCasesOutput {
  nextToken?: string | undefined;
  testCases?: TestCase[] | undefined;
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
  numOfReports?: number | undefined;
  trendField: ReportGroupTrendFieldType;
}
export interface ReportGroupTrendStats {
  average?: string | undefined;
  max?: string | undefined;
  min?: string | undefined;
}
export interface ReportWithRawData {
  reportArn?: string | undefined;
  data?: string | undefined;
}
export type ReportGroupTrendRawDataList = ReportWithRawData[];
export interface GetReportGroupTrendOutput {
  stats?: ReportGroupTrendStats | undefined;
  rawData?: ReportWithRawData[] | undefined;
}
export interface GetResourcePolicyInput {
  resourceArn: string;
}
export interface GetResourcePolicyOutput {
  policy?: string | undefined;
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
  username?: string | undefined;
  token: string | redacted.Redacted<string>;
  serverType: ServerType;
  authType: AuthType;
  shouldOverwrite?: boolean | undefined;
}
export interface ImportSourceCredentialsOutput {
  arn?: string | undefined;
}
export interface InvalidateProjectCacheInput {
  projectName: string;
}
export interface InvalidateProjectCacheOutput {}
export interface BuildBatchFilter {
  status?: StatusType | undefined;
}
export interface ListBuildBatchesInput {
  filter?: BuildBatchFilter | undefined;
  maxResults?: number | undefined;
  sortOrder?: SortOrderType | undefined;
  nextToken?: string | undefined;
}
export interface ListBuildBatchesOutput {
  ids?: string[] | undefined;
  nextToken?: string | undefined;
}
export interface ListBuildBatchesForProjectInput {
  projectName?: string | undefined;
  filter?: BuildBatchFilter | undefined;
  maxResults?: number | undefined;
  sortOrder?: SortOrderType | undefined;
  nextToken?: string | undefined;
}
export interface ListBuildBatchesForProjectOutput {
  ids?: string[] | undefined;
  nextToken?: string | undefined;
}
export interface ListBuildsInput {
  sortOrder?: SortOrderType | undefined;
  nextToken?: string | undefined;
}
export interface ListBuildsOutput {
  ids?: string[] | undefined;
  nextToken?: string | undefined;
}
export interface ListBuildsForProjectInput {
  projectName: string;
  sortOrder?: SortOrderType | undefined;
  nextToken?: string | undefined;
}
export interface ListBuildsForProjectOutput {
  ids?: string[] | undefined;
  nextToken?: string | undefined;
}
export type SensitiveString = string | redacted.Redacted<string>;
export interface ListCommandExecutionsForSandboxInput {
  sandboxId: string;
  maxResults?: number | undefined;
  sortOrder?: SortOrderType | undefined;
  nextToken?: string | redacted.Redacted<string> | undefined;
}
export interface ListCommandExecutionsForSandboxOutput {
  commandExecutions?: CommandExecution[] | undefined;
  nextToken?: string | undefined;
}
export interface ListCuratedEnvironmentImagesInput {}
export type PlatformType = "DEBIAN" | "AMAZON_LINUX" | "UBUNTU" | "WINDOWS_SERVER" | (string & {});
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
  name?: string | undefined;
  description?: string | undefined;
  versions?: string[] | undefined;
}
export type EnvironmentImages = EnvironmentImage[];
export interface EnvironmentLanguage {
  language?: LanguageType | undefined;
  images?: EnvironmentImage[] | undefined;
}
export type EnvironmentLanguages = EnvironmentLanguage[];
export interface EnvironmentPlatform {
  platform?: PlatformType | undefined;
  languages?: EnvironmentLanguage[] | undefined;
}
export type EnvironmentPlatforms = EnvironmentPlatform[];
export interface ListCuratedEnvironmentImagesOutput {
  platforms?: EnvironmentPlatform[] | undefined;
}
export type FleetSortByType = "NAME" | "CREATED_TIME" | "LAST_MODIFIED_TIME" | (string & {});
export interface ListFleetsInput {
  nextToken?: string | redacted.Redacted<string> | undefined;
  maxResults?: number | undefined;
  sortOrder?: SortOrderType | undefined;
  sortBy?: FleetSortByType | undefined;
}
export type FleetArns = string[];
export interface ListFleetsOutput {
  nextToken?: string | undefined;
  fleets?: string[] | undefined;
}
export type ProjectSortByType = "NAME" | "CREATED_TIME" | "LAST_MODIFIED_TIME" | (string & {});
export interface ListProjectsInput {
  sortBy?: ProjectSortByType | undefined;
  sortOrder?: SortOrderType | undefined;
  nextToken?: string | undefined;
}
export interface ListProjectsOutput {
  nextToken?: string | undefined;
  projects?: string[] | undefined;
}
export type ReportGroupSortByType = "NAME" | "CREATED_TIME" | "LAST_MODIFIED_TIME" | (string & {});
export interface ListReportGroupsInput {
  sortOrder?: SortOrderType | undefined;
  sortBy?: ReportGroupSortByType | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface ListReportGroupsOutput {
  nextToken?: string | undefined;
  reportGroups?: string[] | undefined;
}
export interface ReportFilter {
  status?: ReportStatusType | undefined;
}
export interface ListReportsInput {
  sortOrder?: SortOrderType | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
  filter?: ReportFilter | undefined;
}
export interface ListReportsOutput {
  nextToken?: string | undefined;
  reports?: string[] | undefined;
}
export interface ListReportsForReportGroupInput {
  reportGroupArn: string;
  nextToken?: string | undefined;
  sortOrder?: SortOrderType | undefined;
  maxResults?: number | undefined;
  filter?: ReportFilter | undefined;
}
export interface ListReportsForReportGroupOutput {
  nextToken?: string | undefined;
  reports?: string[] | undefined;
}
export interface ListSandboxesInput {
  maxResults?: number | undefined;
  sortOrder?: SortOrderType | undefined;
  nextToken?: string | undefined;
}
export interface ListSandboxesOutput {
  ids?: string[] | undefined;
  nextToken?: string | undefined;
}
export interface ListSandboxesForProjectInput {
  projectName: string;
  maxResults?: number | undefined;
  sortOrder?: SortOrderType | undefined;
  nextToken?: string | redacted.Redacted<string> | undefined;
}
export interface ListSandboxesForProjectOutput {
  ids?: string[] | undefined;
  nextToken?: string | undefined;
}
export type SharedResourceSortByType = "ARN" | "MODIFIED_TIME" | (string & {});
export interface ListSharedProjectsInput {
  sortBy?: SharedResourceSortByType | undefined;
  sortOrder?: SortOrderType | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export type ProjectArns = string[];
export interface ListSharedProjectsOutput {
  nextToken?: string | undefined;
  projects?: string[] | undefined;
}
export interface ListSharedReportGroupsInput {
  sortOrder?: SortOrderType | undefined;
  sortBy?: SharedResourceSortByType | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface ListSharedReportGroupsOutput {
  nextToken?: string | undefined;
  reportGroups?: string[] | undefined;
}
export interface ListSourceCredentialsInput {}
export interface SourceCredentialsInfo {
  arn?: string | undefined;
  serverType?: ServerType | undefined;
  authType?: AuthType | undefined;
  resource?: string | undefined;
}
export type SourceCredentialsInfos = SourceCredentialsInfo[];
export interface ListSourceCredentialsOutput {
  sourceCredentialsInfos?: SourceCredentialsInfo[] | undefined;
}
export interface PutResourcePolicyInput {
  policy: string;
  resourceArn: string;
}
export interface PutResourcePolicyOutput {
  resourceArn?: string | undefined;
}
export interface RetryBuildInput {
  id?: string | undefined;
  idempotencyToken?: string | undefined;
}
export interface RetryBuildOutput {
  build?: Build | undefined;
}
export type RetryBuildBatchType = "RETRY_ALL_BUILDS" | "RETRY_FAILED_BUILDS" | (string & {});
export interface RetryBuildBatchInput {
  id?: string | undefined;
  idempotencyToken?: string | undefined;
  retryType?: RetryBuildBatchType | undefined;
}
export interface RetryBuildBatchOutput {
  buildBatch?: BuildBatch | undefined;
}
export interface StartBuildInput {
  projectName: string;
  secondarySourcesOverride?: ProjectSource[] | undefined;
  secondarySourcesVersionOverride?: ProjectSourceVersion[] | undefined;
  sourceVersion?: string | undefined;
  artifactsOverride?: ProjectArtifacts | undefined;
  secondaryArtifactsOverride?: ProjectArtifacts[] | undefined;
  environmentVariablesOverride?: EnvironmentVariable[] | undefined;
  sourceTypeOverride?: SourceType | undefined;
  sourceLocationOverride?: string | undefined;
  sourceAuthOverride?: SourceAuth | undefined;
  gitCloneDepthOverride?: number | undefined;
  gitSubmodulesConfigOverride?: GitSubmodulesConfig | undefined;
  buildspecOverride?: string | undefined;
  insecureSslOverride?: boolean | undefined;
  reportBuildStatusOverride?: boolean | undefined;
  buildStatusConfigOverride?: BuildStatusConfig | undefined;
  environmentTypeOverride?: EnvironmentType | undefined;
  imageOverride?: string | undefined;
  computeTypeOverride?: ComputeType | undefined;
  certificateOverride?: string | undefined;
  cacheOverride?: ProjectCache | undefined;
  serviceRoleOverride?: string | undefined;
  privilegedModeOverride?: boolean | undefined;
  timeoutInMinutesOverride?: number | undefined;
  queuedTimeoutInMinutesOverride?: number | undefined;
  encryptionKeyOverride?: string | undefined;
  idempotencyToken?: string | undefined;
  logsConfigOverride?: LogsConfig | undefined;
  registryCredentialOverride?: RegistryCredential | undefined;
  imagePullCredentialsTypeOverride?: ImagePullCredentialsType | undefined;
  debugSessionEnabled?: boolean | undefined;
  fleetOverride?: ProjectFleet | undefined;
  autoRetryLimitOverride?: number | undefined;
  hostKernelOverride?: HostKernel | undefined;
}
export interface StartBuildOutput {
  build?: Build | undefined;
}
export interface StartBuildBatchInput {
  projectName: string;
  secondarySourcesOverride?: ProjectSource[] | undefined;
  secondarySourcesVersionOverride?: ProjectSourceVersion[] | undefined;
  sourceVersion?: string | undefined;
  artifactsOverride?: ProjectArtifacts | undefined;
  secondaryArtifactsOverride?: ProjectArtifacts[] | undefined;
  environmentVariablesOverride?: EnvironmentVariable[] | undefined;
  sourceTypeOverride?: SourceType | undefined;
  sourceLocationOverride?: string | undefined;
  sourceAuthOverride?: SourceAuth | undefined;
  gitCloneDepthOverride?: number | undefined;
  gitSubmodulesConfigOverride?: GitSubmodulesConfig | undefined;
  buildspecOverride?: string | undefined;
  insecureSslOverride?: boolean | undefined;
  reportBuildBatchStatusOverride?: boolean | undefined;
  environmentTypeOverride?: EnvironmentType | undefined;
  imageOverride?: string | undefined;
  computeTypeOverride?: ComputeType | undefined;
  certificateOverride?: string | undefined;
  cacheOverride?: ProjectCache | undefined;
  serviceRoleOverride?: string | undefined;
  privilegedModeOverride?: boolean | undefined;
  buildTimeoutInMinutesOverride?: number | undefined;
  queuedTimeoutInMinutesOverride?: number | undefined;
  encryptionKeyOverride?: string | undefined;
  idempotencyToken?: string | undefined;
  logsConfigOverride?: LogsConfig | undefined;
  registryCredentialOverride?: RegistryCredential | undefined;
  imagePullCredentialsTypeOverride?: ImagePullCredentialsType | undefined;
  buildBatchConfigOverride?: ProjectBuildBatchConfig | undefined;
  debugSessionEnabled?: boolean | undefined;
}
export interface StartBuildBatchOutput {
  buildBatch?: BuildBatch | undefined;
}
export interface StartCommandExecutionInput {
  sandboxId: string;
  command: string | redacted.Redacted<string>;
  type?: CommandType | undefined;
}
export interface StartCommandExecutionOutput {
  commandExecution?: CommandExecution | undefined;
}
export interface StartSandboxInput {
  projectName?: string | undefined;
  idempotencyToken?: string | redacted.Redacted<string> | undefined;
}
export interface StartSandboxOutput {
  sandbox?: Sandbox | undefined;
}
export interface StartSandboxConnectionInput {
  sandboxId: string;
}
export interface SSMSession {
  sessionId?: string | undefined;
  tokenValue?: string | undefined;
  streamUrl?: string | undefined;
}
export interface StartSandboxConnectionOutput {
  ssmSession?: SSMSession | undefined;
}
export interface StopBuildInput {
  id: string;
}
export interface StopBuildOutput {
  build?: Build | undefined;
}
export interface StopBuildBatchInput {
  id: string;
}
export interface StopBuildBatchOutput {
  buildBatch?: BuildBatch | undefined;
}
export interface StopSandboxInput {
  id: string;
}
export interface StopSandboxOutput {
  sandbox?: Sandbox | undefined;
}
export interface UpdateFleetInput {
  arn: string;
  baseCapacity?: number | undefined;
  environmentType?: EnvironmentType | undefined;
  computeType?: ComputeType | undefined;
  computeConfiguration?: ComputeConfiguration | undefined;
  scalingConfiguration?: ScalingConfigurationInput | undefined;
  overflowBehavior?: FleetOverflowBehavior | undefined;
  vpcConfig?: VpcConfig | undefined;
  proxyConfiguration?: ProxyConfiguration | undefined;
  imageId?: string | undefined;
  fleetServiceRole?: string | undefined;
  tags?: Tag[] | undefined;
}
export interface UpdateFleetOutput {
  fleet?: Fleet | undefined;
}
export interface UpdateProjectInput {
  name: string;
  description?: string | undefined;
  source?: ProjectSource | undefined;
  secondarySources?: ProjectSource[] | undefined;
  sourceVersion?: string | undefined;
  secondarySourceVersions?: ProjectSourceVersion[] | undefined;
  artifacts?: ProjectArtifacts | undefined;
  secondaryArtifacts?: ProjectArtifacts[] | undefined;
  cache?: ProjectCache | undefined;
  environment?: ProjectEnvironment | undefined;
  serviceRole?: string | undefined;
  timeoutInMinutes?: number | undefined;
  queuedTimeoutInMinutes?: number | undefined;
  encryptionKey?: string | undefined;
  tags?: Tag[] | undefined;
  vpcConfig?: VpcConfig | undefined;
  badgeEnabled?: boolean | undefined;
  logsConfig?: LogsConfig | undefined;
  fileSystemLocations?: ProjectFileSystemLocation[] | undefined;
  buildBatchConfig?: ProjectBuildBatchConfig | undefined;
  concurrentBuildLimit?: number | undefined;
  autoRetryLimit?: number | undefined;
}
export interface UpdateProjectOutput {
  project?: Project | undefined;
}
export interface UpdateProjectVisibilityInput {
  projectArn: string;
  projectVisibility: ProjectVisibilityType;
  resourceAccessRole?: string | undefined;
}
export interface UpdateProjectVisibilityOutput {
  projectArn?: string | undefined;
  publicProjectAlias?: string | undefined;
  projectVisibility?: ProjectVisibilityType | undefined;
}
export interface UpdateReportGroupInput {
  arn: string;
  exportConfig?: ReportExportConfig | undefined;
  tags?: Tag[] | undefined;
}
export interface UpdateReportGroupOutput {
  reportGroup?: ReportGroup | undefined;
}
export interface UpdateWebhookInput {
  projectName: string;
  branchFilter?: string | undefined;
  rotateSecret?: boolean | undefined;
  filterGroups?: WebhookFilter[][] | undefined;
  buildType?: WebhookBuildType | undefined;
  pullRequestBuildPolicy?: PullRequestBuildPolicy | undefined;
}
export interface UpdateWebhookOutput {
  webhook?: Webhook | undefined;
}
export type BatchDeleteBuildsError = InvalidInputException | CommonErrors;
/**
 * Deletes one or more builds.
 */
export const batchDeleteBuilds: API.OperationMethod<
  BatchDeleteBuildsInput & RegionInput,
  BatchDeleteBuildsOutput,
  BatchDeleteBuildsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c72, 0) as any as S.Schema<BatchDeleteBuildsInput>,
  output: __S(1153, __c72, 1) as any as S.Schema<BatchDeleteBuildsOutput>,
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteBuilds",
  telemetry: TELEMETRY,
  span: "BatchDeleteBuilds",
}));

export type BatchGetBuildBatchesError = InvalidInputException | CommonErrors;
/**
 * Retrieves information about one or more batch builds.
 */
export const batchGetBuildBatches: API.OperationMethod<
  BatchGetBuildBatchesInput & RegionInput,
  BatchGetBuildBatchesOutput,
  BatchGetBuildBatchesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1280, __c80, 0) as any as S.Schema<BatchGetBuildBatchesInput>,
  output: __S(1282, __c80, 2) as any as S.Schema<BatchGetBuildBatchesOutput>,
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetBuildBatches",
  telemetry: TELEMETRY,
  span: "BatchGetBuildBatches",
}));

export type BatchGetBuildsError = InvalidInputException | CommonErrors;
/**
 * Gets information about one or more builds.
 */
export const batchGetBuilds: API.OperationMethod<
  BatchGetBuildsInput & RegionInput,
  BatchGetBuildsOutput,
  BatchGetBuildsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1456, __c91, 0) as any as S.Schema<BatchGetBuildsInput>,
  output: __S(1458, __c91, 2) as any as S.Schema<BatchGetBuildsOutput>,
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetBuilds",
  telemetry: TELEMETRY,
  span: "BatchGetBuilds",
}));

export type BatchGetCommandExecutionsError = InvalidInputException | CommonErrors;
/**
 * Gets information about the command executions.
 */
export const batchGetCommandExecutions: API.OperationMethod<
  BatchGetCommandExecutionsInput & RegionInput,
  BatchGetCommandExecutionsOutput,
  BatchGetCommandExecutionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1520, __c95, 0) as any as S.Schema<BatchGetCommandExecutionsInput>,
  output: __S(1521, __c95, 1) as any as S.Schema<BatchGetCommandExecutionsOutput>,
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetCommandExecutions",
  telemetry: TELEMETRY,
  span: "BatchGetCommandExecutions",
}));

export type BatchGetFleetsError = InvalidInputException | CommonErrors;
/**
 * Gets information about one or more compute fleets.
 */
export const batchGetFleets: API.OperationMethod<
  BatchGetFleetsInput & RegionInput,
  BatchGetFleetsOutput,
  BatchGetFleetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<BatchGetFleetsInput>,
  output: __S(2, __c0, 2) as any as S.Schema<BatchGetFleetsOutput>,
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetFleets",
  telemetry: TELEMETRY,
  span: "BatchGetFleets",
}));

export type BatchGetProjectsError = InvalidInputException | CommonErrors;
/**
 * Gets information about one or more build projects.
 */
export const batchGetProjects: API.OperationMethod<
  BatchGetProjectsInput & RegionInput,
  BatchGetProjectsOutput,
  BatchGetProjectsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<BatchGetProjectsInput>,
  output: __S(50, __c3, 2) as any as S.Schema<BatchGetProjectsOutput>,
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetProjects",
  telemetry: TELEMETRY,
  span: "BatchGetProjects",
}));

export type BatchGetReportGroupsError = InvalidInputException | CommonErrors;
/**
 * Returns an array of report groups.
 */
export const batchGetReportGroups: API.OperationMethod<
  BatchGetReportGroupsInput & RegionInput,
  BatchGetReportGroupsOutput,
  BatchGetReportGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<BatchGetReportGroupsInput>,
  output: __S(114, __c7, 2) as any as S.Schema<BatchGetReportGroupsOutput>,
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetReportGroups",
  telemetry: TELEMETRY,
  span: "BatchGetReportGroups",
}));

export type BatchGetReportsError = InvalidInputException | CommonErrors;
/**
 * Returns an array of reports.
 */
export const batchGetReports: API.OperationMethod<
  BatchGetReportsInput & RegionInput,
  BatchGetReportsOutput,
  BatchGetReportsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<BatchGetReportsInput>,
  output: __S(166, __c10, 6) as any as S.Schema<BatchGetReportsOutput>,
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetReports",
  telemetry: TELEMETRY,
  span: "BatchGetReports",
}));

export type BatchGetSandboxesError = InvalidInputException | CommonErrors;
/**
 * Gets information about the sandbox status.
 */
export const batchGetSandboxes: API.OperationMethod<
  BatchGetSandboxesInput & RegionInput,
  BatchGetSandboxesOutput,
  BatchGetSandboxesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<BatchGetSandboxesInput>,
  output: __S(178, __c11, 2) as any as S.Schema<BatchGetSandboxesOutput>,
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetSandboxes",
  telemetry: TELEMETRY,
  span: "BatchGetSandboxes",
}));

export type CreateFleetError =
  | AccountLimitExceededException
  | InvalidInputException
  | ResourceAlreadyExistsException
  | CommonErrors;
/**
 * Creates a compute fleet.
 */
export const createFleet: API.OperationMethod<
  CreateFleetInput & RegionInput,
  CreateFleetOutput,
  CreateFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<CreateFleetInput>,
  output: __S(225, __c14, 1) as any as S.Schema<CreateFleetOutput>,
  errors: [AccountLimitExceededException, InvalidInputException, ResourceAlreadyExistsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFleet",
  telemetry: TELEMETRY,
  span: "CreateFleet",
}));

export type CreateProjectError =
  | AccountLimitExceededException
  | InvalidInputException
  | ResourceAlreadyExistsException
  | CommonErrors;
/**
 * Creates a build project.
 */
export const createProject: API.OperationMethod<
  CreateProjectInput & RegionInput,
  CreateProjectOutput,
  CreateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<CreateProjectInput>,
  output: __S(256, __c16, 0) as any as S.Schema<CreateProjectOutput>,
  errors: [AccountLimitExceededException, InvalidInputException, ResourceAlreadyExistsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProject",
  telemetry: TELEMETRY,
  span: "CreateProject",
}));

export type CreateReportGroupError =
  | AccountLimitExceededException
  | InvalidInputException
  | ResourceAlreadyExistsException
  | CommonErrors;
/**
 * Creates a report group. A report group contains a collection of reports.
 */
export const createReportGroup: API.OperationMethod<
  CreateReportGroupInput & RegionInput,
  CreateReportGroupOutput,
  CreateReportGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<CreateReportGroupInput>,
  output: __S(288, __c18, 0) as any as S.Schema<CreateReportGroupOutput>,
  errors: [AccountLimitExceededException, InvalidInputException, ResourceAlreadyExistsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReportGroup",
  telemetry: TELEMETRY,
  span: "CreateReportGroup",
}));

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
  CreateWebhookInput & RegionInput,
  CreateWebhookOutput,
  CreateWebhookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<CreateWebhookInput>,
  output: __S(320, __c20, 0) as any as S.Schema<CreateWebhookOutput>,
  errors: [
    InvalidInputException,
    OAuthProviderException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWebhook",
  telemetry: TELEMETRY,
  span: "CreateWebhook",
}));

export type DeleteBuildBatchError = InvalidInputException | CommonErrors;
/**
 * Deletes a batch build.
 */
export const deleteBuildBatch: API.OperationMethod<
  DeleteBuildBatchInput & RegionInput,
  DeleteBuildBatchOutput,
  DeleteBuildBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<DeleteBuildBatchInput>,
  output: __S(337, __c21, 1) as any as S.Schema<DeleteBuildBatchOutput>,
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBuildBatch",
  telemetry: TELEMETRY,
  span: "DeleteBuildBatch",
}));

export type DeleteFleetError = InvalidInputException | CommonErrors;
/**
 * Deletes a compute fleet. When you delete a compute fleet, its builds are not deleted.
 */
export const deleteFleet: API.OperationMethod<
  DeleteFleetInput & RegionInput,
  DeleteFleetOutput,
  DeleteFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<DeleteFleetInput>,
  output: __S(368, __c23, 0) as any as S.Schema<DeleteFleetOutput>,
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFleet",
  telemetry: TELEMETRY,
  span: "DeleteFleet",
}));

export type DeleteProjectError = InvalidInputException | CommonErrors;
/**
 * Deletes a build project. When you delete a project, its builds are not deleted.
 */
export const deleteProject: API.OperationMethod<
  DeleteProjectInput & RegionInput,
  DeleteProjectOutput,
  DeleteProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<DeleteProjectInput>,
  output: __S(368, __c23, 0) as any as S.Schema<DeleteProjectOutput>,
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProject",
  telemetry: TELEMETRY,
  span: "DeleteProject",
}));

export type DeleteReportError = InvalidInputException | CommonErrors;
/**
 * Deletes a report.
 */
export const deleteReport: API.OperationMethod<
  DeleteReportInput & RegionInput,
  DeleteReportOutput,
  DeleteReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<DeleteReportInput>,
  output: __S(368, __c23, 0) as any as S.Schema<DeleteReportOutput>,
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReport",
  telemetry: TELEMETRY,
  span: "DeleteReport",
}));

export type DeleteReportGroupError = InvalidInputException | CommonErrors;
/**
 * Deletes a report group. Before you delete a report group, you must delete its reports.
 */
export const deleteReportGroup: API.OperationMethod<
  DeleteReportGroupInput & RegionInput,
  DeleteReportGroupOutput,
  DeleteReportGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<DeleteReportGroupInput>,
  output: __S(368, __c23, 0) as any as S.Schema<DeleteReportGroupOutput>,
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReportGroup",
  telemetry: TELEMETRY,
  span: "DeleteReportGroup",
}));

export type DeleteResourcePolicyError = InvalidInputException | CommonErrors;
/**
 * Deletes a resource policy that is identified by its resource ARN.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyInput & RegionInput,
  DeleteResourcePolicyOutput,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<DeleteResourcePolicyInput>,
  output: __S(368, __c23, 0) as any as S.Schema<DeleteResourcePolicyOutput>,
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
  telemetry: TELEMETRY,
  span: "DeleteResourcePolicy",
}));

export type DeleteSourceCredentialsError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a set of GitHub, GitHub Enterprise, or Bitbucket source credentials.
 */
export const deleteSourceCredentials: API.OperationMethod<
  DeleteSourceCredentialsInput & RegionInput,
  DeleteSourceCredentialsOutput,
  DeleteSourceCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<DeleteSourceCredentialsInput>,
  output: __S(464, __c29, 0) as any as S.Schema<DeleteSourceCredentialsOutput>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSourceCredentials",
  telemetry: TELEMETRY,
  span: "DeleteSourceCredentials",
}));

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
  DeleteWebhookInput & RegionInput,
  DeleteWebhookOutput,
  DeleteWebhookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<DeleteWebhookInput>,
  output: __S(368, __c23, 0) as any as S.Schema<DeleteWebhookOutput>,
  errors: [InvalidInputException, OAuthProviderException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWebhook",
  telemetry: TELEMETRY,
  span: "DeleteWebhook",
}));

export type DescribeCodeCoveragesError = InvalidInputException | CommonErrors;
/**
 * Retrieves one or more code coverage reports.
 */
export const describeCodeCoverages: API.PaginatedOperationMethod<
  DescribeCodeCoveragesInput & RegionInput,
  DescribeCodeCoveragesOutput,
  DescribeCodeCoveragesError,
  Credentials | HttpClient.HttpClient,
  CodeCoverage
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<DescribeCodeCoveragesInput>,
  output: __S(499, __c31, 3) as any as S.Schema<DescribeCodeCoveragesOutput>,
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
  telemetry: TELEMETRY,
  span: "DescribeCodeCoverages",
})) as any;

export type DescribeTestCasesError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of details about test cases for a report.
 */
export const describeTestCases: API.PaginatedOperationMethod<
  DescribeTestCasesInput & RegionInput,
  DescribeTestCasesOutput,
  DescribeTestCasesError,
  Credentials | HttpClient.HttpClient,
  TestCase
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(513, __c32, 1) as any as S.Schema<DescribeTestCasesInput>,
  output: __S(516, __c32, 4) as any as S.Schema<DescribeTestCasesOutput>,
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
  telemetry: TELEMETRY,
  span: "DescribeTestCases",
})) as any;

export type GetReportGroupTrendError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Analyzes and accumulates test report values for the specified test reports.
 */
export const getReportGroupTrend: API.OperationMethod<
  GetReportGroupTrendInput & RegionInput,
  GetReportGroupTrendOutput,
  GetReportGroupTrendError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<GetReportGroupTrendInput>,
  output: __S(532, __c33, 4) as any as S.Schema<GetReportGroupTrendOutput>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReportGroupTrend",
  telemetry: TELEMETRY,
  span: "GetReportGroupTrend",
}));

export type GetResourcePolicyError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets a resource policy that is identified by its resource ARN.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyInput & RegionInput,
  GetResourcePolicyOutput,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<GetResourcePolicyInput>,
  output: __S(545, __c34, 1) as any as S.Schema<GetResourcePolicyOutput>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
  telemetry: TELEMETRY,
  span: "GetResourcePolicy",
}));

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
  ImportSourceCredentialsInput & RegionInput,
  ImportSourceCredentialsOutput,
  ImportSourceCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<ImportSourceCredentialsInput>,
  output: __S(464, __c29, 0) as any as S.Schema<ImportSourceCredentialsOutput>,
  errors: [AccountLimitExceededException, InvalidInputException, ResourceAlreadyExistsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportSourceCredentials",
  telemetry: TELEMETRY,
  span: "ImportSourceCredentials",
}));

export type InvalidateProjectCacheError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Resets the cache for a project.
 */
export const invalidateProjectCache: API.OperationMethod<
  InvalidateProjectCacheInput & RegionInput,
  InvalidateProjectCacheOutput,
  InvalidateProjectCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<InvalidateProjectCacheInput>,
  output: __S(368, __c23, 0) as any as S.Schema<InvalidateProjectCacheOutput>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvalidateProjectCache",
  telemetry: TELEMETRY,
  span: "InvalidateProjectCache",
}));

export type ListBuildBatchesError = InvalidInputException | CommonErrors;
/**
 * Retrieves the identifiers of your build batches in the current region.
 */
export const listBuildBatches: API.PaginatedOperationMethod<
  ListBuildBatchesInput & RegionInput,
  ListBuildBatchesOutput,
  ListBuildBatchesError,
  Credentials | HttpClient.HttpClient,
  NonEmptyString
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<ListBuildBatchesInput>,
  output: __S(608, __c38, 0) as any as S.Schema<ListBuildBatchesOutput>,
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
  telemetry: TELEMETRY,
  span: "ListBuildBatches",
})) as any;

export type ListBuildBatchesForProjectError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the identifiers of the build batches for a specific project.
 */
export const listBuildBatchesForProject: API.PaginatedOperationMethod<
  ListBuildBatchesForProjectInput & RegionInput,
  ListBuildBatchesForProjectOutput,
  ListBuildBatchesForProjectError,
  Credentials | HttpClient.HttpClient,
  NonEmptyString
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(640, __c40, 0) as any as S.Schema<ListBuildBatchesForProjectInput>,
  output: __S(608, __c38, 0) as any as S.Schema<ListBuildBatchesForProjectOutput>,
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
  telemetry: TELEMETRY,
  span: "ListBuildBatchesForProject",
})) as any;

export type ListBuildsError = InvalidInputException | CommonErrors;
/**
 * Gets a list of build IDs, with each build ID representing a single build.
 */
export const listBuilds: API.PaginatedOperationMethod<
  ListBuildsInput & RegionInput,
  ListBuildsOutput,
  ListBuildsError,
  Credentials | HttpClient.HttpClient,
  NonEmptyString
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<ListBuildsInput>,
  output: __S(608, __c38, 0) as any as S.Schema<ListBuildsOutput>,
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBuilds",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "ids" } as const,
  telemetry: TELEMETRY,
  span: "ListBuilds",
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
  ListBuildsForProjectInput & RegionInput,
  ListBuildsForProjectOutput,
  ListBuildsForProjectError,
  Credentials | HttpClient.HttpClient,
  NonEmptyString
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(672, __c42, 0) as any as S.Schema<ListBuildsForProjectInput>,
  output: __S(608, __c38, 0) as any as S.Schema<ListBuildsForProjectOutput>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBuildsForProject",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "ids" } as const,
  telemetry: TELEMETRY,
  span: "ListBuildsForProject",
})) as any;

export type ListCommandExecutionsForSandboxError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets a list of command executions for a sandbox.
 */
export const listCommandExecutionsForSandbox: API.PaginatedOperationMethod<
  ListCommandExecutionsForSandboxInput & RegionInput,
  ListCommandExecutionsForSandboxOutput,
  ListCommandExecutionsForSandboxError,
  Credentials | HttpClient.HttpClient,
  CommandExecution
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<ListCommandExecutionsForSandboxInput>,
  output: __S(689, __c43, 1) as any as S.Schema<ListCommandExecutionsForSandboxOutput>,
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
  telemetry: TELEMETRY,
  span: "ListCommandExecutionsForSandbox",
})) as any;

export type ListCuratedEnvironmentImagesError = CommonErrors;
/**
 * Gets information about Docker images that are managed by CodeBuild.
 */
export const listCuratedEnvironmentImages: API.OperationMethod<
  ListCuratedEnvironmentImagesInput & RegionInput,
  ListCuratedEnvironmentImagesOutput,
  ListCuratedEnvironmentImagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c44, 0) as any as S.Schema<ListCuratedEnvironmentImagesInput>,
  output: __S(711, __c44, 7) as any as S.Schema<ListCuratedEnvironmentImagesOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCuratedEnvironmentImages",
  telemetry: TELEMETRY,
  span: "ListCuratedEnvironmentImages",
}));

export type ListFleetsError = InvalidInputException | CommonErrors;
/**
 * Gets a list of compute fleet names with each compute fleet name representing a single compute fleet.
 */
export const listFleets: API.PaginatedOperationMethod<
  ListFleetsInput & RegionInput,
  ListFleetsOutput,
  ListFleetsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(720, __c45, 0) as any as S.Schema<ListFleetsInput>,
  output: __S(721, __c45, 1) as any as S.Schema<ListFleetsOutput>,
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFleets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListFleets",
})) as any;

export type ListProjectsError = InvalidInputException | CommonErrors;
/**
 * Gets a list of build project names, with each build project name representing a single
 * build project.
 */
export const listProjects: API.PaginatedOperationMethod<
  ListProjectsInput & RegionInput,
  ListProjectsOutput,
  ListProjectsError,
  Credentials | HttpClient.HttpClient,
  NonEmptyString
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<ListProjectsInput>,
  output: __S(752, __c47, 0) as any as S.Schema<ListProjectsOutput>,
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProjects",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "projects" } as const,
  telemetry: TELEMETRY,
  span: "ListProjects",
})) as any;

export type ListReportGroupsError = InvalidInputException | CommonErrors;
/**
 * Gets a list ARNs for the report groups in the current Amazon Web Services account.
 */
export const listReportGroups: API.PaginatedOperationMethod<
  ListReportGroupsInput & RegionInput,
  ListReportGroupsOutput,
  ListReportGroupsError,
  Credentials | HttpClient.HttpClient,
  NonEmptyString
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(768, __c48, 0) as any as S.Schema<ListReportGroupsInput>,
  output: __S(784, __c49, 0) as any as S.Schema<ListReportGroupsOutput>,
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
  telemetry: TELEMETRY,
  span: "ListReportGroups",
})) as any;

export type ListReportsError = InvalidInputException | CommonErrors;
/**
 * Returns a list of ARNs for the reports in the current Amazon Web Services account.
 */
export const listReports: API.PaginatedOperationMethod<
  ListReportsInput & RegionInput,
  ListReportsOutput,
  ListReportsError,
  Credentials | HttpClient.HttpClient,
  NonEmptyString
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(800, __c50, 0) as any as S.Schema<ListReportsInput>,
  output: __S(816, __c51, 0) as any as S.Schema<ListReportsOutput>,
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
  telemetry: TELEMETRY,
  span: "ListReports",
})) as any;

export type ListReportsForReportGroupError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of ARNs for the reports that belong to a `ReportGroup`.
 */
export const listReportsForReportGroup: API.PaginatedOperationMethod<
  ListReportsForReportGroupInput & RegionInput,
  ListReportsForReportGroupOutput,
  ListReportsForReportGroupError,
  Credentials | HttpClient.HttpClient,
  NonEmptyString
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(832, __c52, 0) as any as S.Schema<ListReportsForReportGroupInput>,
  output: __S(816, __c51, 0) as any as S.Schema<ListReportsForReportGroupOutput>,
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
  telemetry: TELEMETRY,
  span: "ListReportsForReportGroup",
})) as any;

export type ListSandboxesError = InvalidInputException | CommonErrors;
/**
 * Gets a list of sandboxes.
 */
export const listSandboxes: API.PaginatedOperationMethod<
  ListSandboxesInput & RegionInput,
  ListSandboxesOutput,
  ListSandboxesError,
  Credentials | HttpClient.HttpClient,
  NonEmptyString
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(848, __c53, 0) as any as S.Schema<ListSandboxesInput>,
  output: __S(608, __c38, 0) as any as S.Schema<ListSandboxesOutput>,
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
  telemetry: TELEMETRY,
  span: "ListSandboxes",
})) as any;

export type ListSandboxesForProjectError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets a list of sandboxes for a given project.
 */
export const listSandboxesForProject: API.PaginatedOperationMethod<
  ListSandboxesForProjectInput & RegionInput,
  ListSandboxesForProjectOutput,
  ListSandboxesForProjectError,
  Credentials | HttpClient.HttpClient,
  NonEmptyString
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(864, __c54, 0) as any as S.Schema<ListSandboxesForProjectInput>,
  output: __S(608, __c38, 0) as any as S.Schema<ListSandboxesForProjectOutput>,
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
  telemetry: TELEMETRY,
  span: "ListSandboxesForProject",
})) as any;

export type ListSharedProjectsError = InvalidInputException | CommonErrors;
/**
 * Gets a list of projects that are shared with other Amazon Web Services accounts or users.
 */
export const listSharedProjects: API.PaginatedOperationMethod<
  ListSharedProjectsInput & RegionInput,
  ListSharedProjectsOutput,
  ListSharedProjectsError,
  Credentials | HttpClient.HttpClient,
  NonEmptyString
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(880, __c55, 0) as any as S.Schema<ListSharedProjectsInput>,
  output: __S(752, __c47, 0) as any as S.Schema<ListSharedProjectsOutput>,
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
  telemetry: TELEMETRY,
  span: "ListSharedProjects",
})) as any;

export type ListSharedReportGroupsError = InvalidInputException | CommonErrors;
/**
 * Gets a list of report groups that are shared with other Amazon Web Services accounts or users.
 */
export const listSharedReportGroups: API.PaginatedOperationMethod<
  ListSharedReportGroupsInput & RegionInput,
  ListSharedReportGroupsOutput,
  ListSharedReportGroupsError,
  Credentials | HttpClient.HttpClient,
  NonEmptyString
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(896, __c56, 0) as any as S.Schema<ListSharedReportGroupsInput>,
  output: __S(784, __c49, 0) as any as S.Schema<ListSharedReportGroupsOutput>,
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
  telemetry: TELEMETRY,
  span: "ListSharedReportGroups",
})) as any;

export type ListSourceCredentialsError = InvalidInputException | CommonErrors;
/**
 * Returns a list of `SourceCredentialsInfo` objects.
 */
export const listSourceCredentials: API.OperationMethod<
  ListSourceCredentialsInput & RegionInput,
  ListSourceCredentialsOutput,
  ListSourceCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(912, __c57, 0) as any as S.Schema<ListSourceCredentialsInput>,
  output: __S(915, __c57, 3) as any as S.Schema<ListSourceCredentialsOutput>,
  errors: [InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSourceCredentials",
  telemetry: TELEMETRY,
  span: "ListSourceCredentials",
}));

export type PutResourcePolicyError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stores a resource policy for the ARN of a `Project` or
 * `ReportGroup` object.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyInput & RegionInput,
  PutResourcePolicyOutput,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c58, 0) as any as S.Schema<PutResourcePolicyInput>,
  output: __S(929, __c58, 1) as any as S.Schema<PutResourcePolicyOutput>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
  telemetry: TELEMETRY,
  span: "PutResourcePolicy",
}));

export type RetryBuildError =
  | AccountLimitExceededException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Restarts a build.
 */
export const retryBuild: API.OperationMethod<
  RetryBuildInput & RegionInput,
  RetryBuildOutput,
  RetryBuildError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(944, __c59, 0) as any as S.Schema<RetryBuildInput>,
  output: __S(960, __c60, 0) as any as S.Schema<RetryBuildOutput>,
  errors: [AccountLimitExceededException, InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RetryBuild",
  telemetry: TELEMETRY,
  span: "RetryBuild",
}));

export type RetryBuildBatchError = InvalidInputException | ResourceNotFoundException | CommonErrors;
/**
 * Restarts a failed batch build. Only batch builds that have failed can be retried.
 */
export const retryBuildBatch: API.OperationMethod<
  RetryBuildBatchInput & RegionInput,
  RetryBuildBatchOutput,
  RetryBuildBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(976, __c61, 0) as any as S.Schema<RetryBuildBatchInput>,
  output: __S(992, __c62, 0) as any as S.Schema<RetryBuildBatchOutput>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RetryBuildBatch",
  telemetry: TELEMETRY,
  span: "RetryBuildBatch",
}));

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
  StartBuildInput & RegionInput,
  StartBuildOutput,
  StartBuildError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1008, __c63, 0) as any as S.Schema<StartBuildInput>,
  output: __S(960, __c60, 0) as any as S.Schema<StartBuildOutput>,
  errors: [AccountLimitExceededException, InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartBuild",
  telemetry: TELEMETRY,
  span: "StartBuild",
}));

export type StartBuildBatchError = InvalidInputException | ResourceNotFoundException | CommonErrors;
/**
 * Starts a batch build for a project.
 */
export const startBuildBatch: API.OperationMethod<
  StartBuildBatchInput & RegionInput,
  StartBuildBatchOutput,
  StartBuildBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c64, 0) as any as S.Schema<StartBuildBatchInput>,
  output: __S(992, __c62, 0) as any as S.Schema<StartBuildBatchOutput>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartBuildBatch",
  telemetry: TELEMETRY,
  span: "StartBuildBatch",
}));

export type StartCommandExecutionError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts a command execution.
 */
export const startCommandExecution: API.OperationMethod<
  StartCommandExecutionInput & RegionInput,
  StartCommandExecutionOutput,
  StartCommandExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1040, __c65, 0) as any as S.Schema<StartCommandExecutionInput>,
  output: __S(1041, __c65, 1) as any as S.Schema<StartCommandExecutionOutput>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCommandExecution",
  telemetry: TELEMETRY,
  span: "StartCommandExecution",
}));

export type StartSandboxError =
  | AccountSuspendedException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts a sandbox.
 */
export const startSandbox: API.OperationMethod<
  StartSandboxInput & RegionInput,
  StartSandboxOutput,
  StartSandboxError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c66, 0) as any as S.Schema<StartSandboxInput>,
  output: __S(1072, __c67, 0) as any as S.Schema<StartSandboxOutput>,
  errors: [AccountSuspendedException, InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSandbox",
  telemetry: TELEMETRY,
  span: "StartSandbox",
}));

export type StartSandboxConnectionError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts a sandbox connection.
 */
export const startSandboxConnection: API.OperationMethod<
  StartSandboxConnectionInput & RegionInput,
  StartSandboxConnectionOutput,
  StartSandboxConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c68, 0) as any as S.Schema<StartSandboxConnectionInput>,
  output: __S(1090, __c68, 2) as any as S.Schema<StartSandboxConnectionOutput>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSandboxConnection",
  telemetry: TELEMETRY,
  span: "StartSandboxConnection",
}));

export type StopBuildError = InvalidInputException | ResourceNotFoundException | CommonErrors;
/**
 * Attempts to stop running a build.
 */
export const stopBuild: API.OperationMethod<
  StopBuildInput & RegionInput,
  StopBuildOutput,
  StopBuildError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1104, __c69, 0) as any as S.Schema<StopBuildInput>,
  output: __S(960, __c60, 0) as any as S.Schema<StopBuildOutput>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopBuild",
  telemetry: TELEMETRY,
  span: "StopBuild",
}));

export type StopBuildBatchError = InvalidInputException | ResourceNotFoundException | CommonErrors;
/**
 * Stops a running batch build.
 */
export const stopBuildBatch: API.OperationMethod<
  StopBuildBatchInput & RegionInput,
  StopBuildBatchOutput,
  StopBuildBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c70, 0) as any as S.Schema<StopBuildBatchInput>,
  output: __S(992, __c62, 0) as any as S.Schema<StopBuildBatchOutput>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopBuildBatch",
  telemetry: TELEMETRY,
  span: "StopBuildBatch",
}));

export type StopSandboxError = InvalidInputException | ResourceNotFoundException | CommonErrors;
/**
 * Stops a sandbox.
 */
export const stopSandbox: API.OperationMethod<
  StopSandboxInput & RegionInput,
  StopSandboxOutput,
  StopSandboxError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1136, __c71, 0) as any as S.Schema<StopSandboxInput>,
  output: __S(1072, __c67, 0) as any as S.Schema<StopSandboxOutput>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopSandbox",
  telemetry: TELEMETRY,
  span: "StopSandbox",
}));

export type UpdateFleetError =
  | AccountLimitExceededException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a compute fleet.
 */
export const updateFleet: API.OperationMethod<
  UpdateFleetInput & RegionInput,
  UpdateFleetOutput,
  UpdateFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1200, __c75, 0) as any as S.Schema<UpdateFleetInput>,
  output: __S(225, __c14, 1) as any as S.Schema<UpdateFleetOutput>,
  errors: [AccountLimitExceededException, InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFleet",
  telemetry: TELEMETRY,
  span: "UpdateFleet",
}));

export type UpdateProjectError = InvalidInputException | ResourceNotFoundException | CommonErrors;
/**
 * Changes the settings of a build project.
 */
export const updateProject: API.OperationMethod<
  UpdateProjectInput & RegionInput,
  UpdateProjectOutput,
  UpdateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1216, __c76, 0) as any as S.Schema<UpdateProjectInput>,
  output: __S(256, __c16, 0) as any as S.Schema<UpdateProjectOutput>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProject",
  telemetry: TELEMETRY,
  span: "UpdateProject",
}));

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
  UpdateProjectVisibilityInput & RegionInput,
  UpdateProjectVisibilityOutput,
  UpdateProjectVisibilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1232, __c77, 0) as any as S.Schema<UpdateProjectVisibilityInput>,
  output: __S(1233, __c77, 1) as any as S.Schema<UpdateProjectVisibilityOutput>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProjectVisibility",
  telemetry: TELEMETRY,
  span: "UpdateProjectVisibility",
}));

export type UpdateReportGroupError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a report group.
 */
export const updateReportGroup: API.OperationMethod<
  UpdateReportGroupInput & RegionInput,
  UpdateReportGroupOutput,
  UpdateReportGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c78, 0) as any as S.Schema<UpdateReportGroupInput>,
  output: __S(288, __c18, 0) as any as S.Schema<UpdateReportGroupOutput>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReportGroup",
  telemetry: TELEMETRY,
  span: "UpdateReportGroup",
}));

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
  UpdateWebhookInput & RegionInput,
  UpdateWebhookOutput,
  UpdateWebhookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1264, __c79, 0) as any as S.Schema<UpdateWebhookInput>,
  output: __S(320, __c20, 0) as any as S.Schema<UpdateWebhookOutput>,
  errors: [InvalidInputException, OAuthProviderException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWebhook",
  telemetry: TELEMETRY,
  span: "UpdateWebhook",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ names: __S(1184, __c74, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetFleetsInput" });
    case 1:
      return S.Array(__S(39, __c2, 7));
    case 2:
      return S.suspend(() =>
        S.Struct({
          fleets: S.optional(__S(1, __c0, 1)),
          fleetsNotFound: S.optional(__S(1184, __c74, 0)),
        }),
      ).annotate({ identifier: "BatchGetFleetsOutput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(__S(16, __c1, 0));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          statusCode: S.optional(S.String),
          context: S.optional(S.String),
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "FleetStatus" });
    case 1:
      return S.suspend(() =>
        S.Struct({ metricType: S.optional(S.String), targetValue: S.optional(S.Number) }),
      ).annotate({ identifier: "TargetTrackingScalingConfiguration" });
    case 2:
      return S.Array(__S(33, __c2, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          scalingType: S.optional(S.String),
          targetTrackingScalingConfigs: S.optional(__S(34, __c2, 2)),
          maxCapacity: S.optional(S.Number),
          desiredCapacity: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ScalingConfigurationOutput" });
    case 4:
      return S.suspend(() =>
        S.Struct({ type: S.String, effect: S.String, entities: __S(1184, __c74, 0) }),
      ).annotate({ identifier: "FleetProxyRule" });
    case 5:
      return S.Array(__S(36, __c2, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          defaultBehavior: S.optional(S.String),
          orderedProxyRules: S.optional(__S(37, __c2, 5)),
        }),
      ).annotate({ identifier: "ProxyConfiguration" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          id: S.optional(S.String),
          created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(__S(32, __c2, 0)),
          baseCapacity: S.optional(S.Number),
          environmentType: S.optional(S.String),
          computeType: S.optional(S.String),
          computeConfiguration: S.optional(__S(1344, __c84, 0)),
          scalingConfiguration: S.optional(__S(35, __c2, 3)),
          overflowBehavior: S.optional(S.String),
          vpcConfig: S.optional(__S(1345, __c84, 1)),
          proxyConfiguration: S.optional(__S(38, __c2, 6)),
          imageId: S.optional(S.String),
          fleetServiceRole: S.optional(S.String),
          tags: S.optional(__S(17, __c1, 1)),
        }),
      ).annotate({ identifier: "Fleet" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ names: __S(1184, __c74, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetProjectsInput" });
    case 1:
      return S.Array(__S(97, __c6, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          projects: S.optional(__S(49, __c3, 1)),
          projectsNotFound: S.optional(__S(1184, __c74, 0)),
        }),
      ).annotate({ identifier: "BatchGetProjectsOutput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          pattern: S.String,
          excludeMatchedPattern: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "WebhookFilter" });
    case 1:
      return S.Array(__S(64, __c4, 0));
    case 2:
      return S.Array(__S(65, __c4, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ name: S.String, domain: S.optional(S.String), scope: S.String }),
      ).annotate({ identifier: "ScopeConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          requiresCommentApproval: S.String,
          approverRoles: S.optional(__S(1376, __c86, 0)),
        }),
      ).annotate({ identifier: "PullRequestBuildPolicy" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          url: S.optional(S.String),
          payloadUrl: S.optional(S.String),
          secret: S.optional(S.String),
          branchFilter: S.optional(S.String),
          filterGroups: S.optional(__S(66, __c4, 2)),
          buildType: S.optional(S.String),
          manualCreation: S.optional(S.Boolean),
          lastModifiedSecret: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          scopeConfiguration: S.optional(__S(67, __c4, 3)),
          status: S.optional(S.String),
          statusMessage: S.optional(S.String),
          pullRequestBuildPolicy: S.optional(__S(68, __c4, 4)),
        }),
      ).annotate({ identifier: "Webhook" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          location: S.optional(S.String),
          path: S.optional(S.String),
          namespaceType: S.optional(S.String),
          name: S.optional(S.String),
          packaging: S.optional(S.String),
          overrideArtifactName: S.optional(S.Boolean),
          encryptionDisabled: S.optional(S.Boolean),
          artifactIdentifier: S.optional(S.String),
          bucketOwnerAccess: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProjectArtifacts" });
    case 1:
      return S.Array(__S(80, __c5, 0));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ badgeEnabled: S.optional(S.Boolean), badgeRequestUrl: S.optional(S.String) }),
      ).annotate({ identifier: "ProjectBadge" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          description: S.optional(S.String),
          source: S.optional(__S(1363, __c85, 3)),
          secondarySources: S.optional(__S(1364, __c85, 4)),
          sourceVersion: S.optional(S.String),
          secondarySourceVersions: S.optional(__S(1366, __c85, 6)),
          artifacts: S.optional(__S(80, __c5, 0)),
          secondaryArtifacts: S.optional(__S(81, __c5, 1)),
          cache: S.optional(__S(1392, __c87, 0)),
          environment: S.optional(__S(1373, __c85, 13)),
          serviceRole: S.optional(S.String),
          timeoutInMinutes: S.optional(S.Number),
          queuedTimeoutInMinutes: S.optional(S.Number),
          encryptionKey: S.optional(S.String),
          tags: S.optional(__S(17, __c1, 1)),
          created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          webhook: S.optional(__S(69, __c4, 5)),
          vpcConfig: S.optional(__S(1345, __c84, 1)),
          badge: S.optional(__S(96, __c6, 0)),
          logsConfig: S.optional(__S(1296, __c81, 0)),
          fileSystemLocations: S.optional(__S(1375, __c85, 15)),
          buildBatchConfig: S.optional(__S(1313, __c82, 1)),
          concurrentBuildLimit: S.optional(S.Number),
          projectVisibility: S.optional(S.String),
          publicProjectAlias: S.optional(S.String),
          resourceAccessRole: S.optional(S.String),
          autoRetryLimit: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Project" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ reportGroupArns: __S(1184, __c74, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetReportGroupsInput" });
    case 1:
      return S.Array(__S(144, __c9, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          reportGroups: S.optional(__S(113, __c7, 1)),
          reportGroupsNotFound: S.optional(__S(1184, __c74, 0)),
        }),
      ).annotate({ identifier: "BatchGetReportGroupsOutput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          bucket: S.optional(S.String),
          bucketOwner: S.optional(S.String),
          path: S.optional(S.String),
          packaging: S.optional(S.String),
          encryptionKey: S.optional(S.String),
          encryptionDisabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "S3ReportExportConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          exportConfigType: S.optional(S.String),
          s3Destination: S.optional(__S(128, __c8, 0)),
        }),
      ).annotate({ identifier: "ReportExportConfig" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(S.String),
          type: S.optional(S.String),
          exportConfig: S.optional(__S(129, __c8, 1)),
          created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tags: S.optional(__S(17, __c1, 1)),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReportGroup" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ reportArns: __S(1184, __c74, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetReportsInput" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          total: S.Number,
          statusCounts: __S(161, __c10, 1),
          durationInNanoSeconds: S.Number,
        }),
      ).annotate({ identifier: "TestReportSummary" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          lineCoveragePercentage: S.optional(S.Number),
          linesCovered: S.optional(S.Number),
          linesMissed: S.optional(S.Number),
          branchCoveragePercentage: S.optional(S.Number),
          branchesCovered: S.optional(S.Number),
          branchesMissed: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CodeCoverageReportSummary" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          type: S.optional(S.String),
          name: S.optional(S.String),
          reportGroupArn: S.optional(S.String),
          executionId: S.optional(S.String),
          status: S.optional(S.String),
          created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          expired: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          exportConfig: S.optional(__S(129, __c8, 1)),
          truncated: S.optional(S.Boolean),
          testSummary: S.optional(__S(162, __c10, 2)),
          codeCoverageSummary: S.optional(__S(163, __c10, 3)),
        }),
      ).annotate({ identifier: "Report" });
    case 5:
      return S.Array(__S(164, __c10, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          reports: S.optional(__S(165, __c10, 5)),
          reportsNotFound: S.optional(__S(1184, __c74, 0)),
        }),
      ).annotate({ identifier: "BatchGetReportsOutput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ids: __S(1184, __c74, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetSandboxesInput" });
    case 1:
      return S.Array(__S(195, __c12, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({
          sandboxes: S.optional(__S(177, __c11, 1)),
          sandboxesNotFound: S.optional(__S(1184, __c74, 0)),
        }),
      ).annotate({ identifier: "BatchGetSandboxesOutput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          phaseType: S.optional(S.String),
          phaseStatus: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          durationInSeconds: S.optional(S.Number),
          contexts: S.optional(__S(1409, __c88, 1)),
        }),
      ).annotate({ identifier: "SandboxSessionPhase" });
    case 1:
      return S.Array(__S(192, __c12, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          status: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          currentPhase: S.optional(S.String),
          phases: S.optional(__S(193, __c12, 1)),
          resolvedSourceVersion: S.optional(S.String),
          logs: S.optional(__S(1504, __c94, 0)),
          networkInterface: S.optional(__S(1472, __c92, 0)),
        }),
      ).annotate({ identifier: "SandboxSession" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          projectName: S.optional(S.String),
          requestTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          source: S.optional(__S(1363, __c85, 3)),
          sourceVersion: S.optional(S.String),
          secondarySources: S.optional(__S(1364, __c85, 4)),
          secondarySourceVersions: S.optional(__S(1366, __c85, 6)),
          environment: S.optional(__S(1373, __c85, 13)),
          fileSystemLocations: S.optional(__S(1375, __c85, 15)),
          timeoutInMinutes: S.optional(S.Number),
          queuedTimeoutInMinutes: S.optional(S.Number),
          vpcConfig: S.optional(__S(1345, __c84, 1)),
          logConfig: S.optional(__S(1296, __c81, 0)),
          encryptionKey: S.optional(S.String),
          serviceRole: S.optional(S.String),
          currentSession: S.optional(__S(194, __c12, 2)),
        }),
      ).annotate({ identifier: "Sandbox" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          baseCapacity: S.Number,
          environmentType: S.String,
          computeType: S.String,
          computeConfiguration: S.optional(__S(1344, __c84, 0)),
          scalingConfiguration: S.optional(__S(224, __c14, 0)),
          overflowBehavior: S.optional(S.String),
          vpcConfig: S.optional(__S(1345, __c84, 1)),
          proxyConfiguration: S.optional(__S(38, __c2, 6)),
          imageId: S.optional(S.String),
          fleetServiceRole: S.optional(S.String),
          tags: S.optional(__S(17, __c1, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateFleetInput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scalingType: S.optional(S.String),
          targetTrackingScalingConfigs: S.optional(__S(34, __c2, 2)),
          maxCapacity: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ScalingConfigurationInput" });
    case 1:
      return S.suspend(() => S.Struct({ fleet: S.optional(__S(39, __c2, 7)) })).annotate({
        identifier: "CreateFleetOutput",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          source: __S(1363, __c85, 3),
          secondarySources: S.optional(__S(1364, __c85, 4)),
          sourceVersion: S.optional(S.String),
          secondarySourceVersions: S.optional(__S(1366, __c85, 6)),
          artifacts: __S(80, __c5, 0),
          secondaryArtifacts: S.optional(__S(81, __c5, 1)),
          cache: S.optional(__S(1392, __c87, 0)),
          environment: __S(1373, __c85, 13),
          serviceRole: S.String,
          timeoutInMinutes: S.optional(S.Number),
          queuedTimeoutInMinutes: S.optional(S.Number),
          encryptionKey: S.optional(S.String),
          tags: S.optional(__S(17, __c1, 1)),
          vpcConfig: S.optional(__S(1345, __c84, 1)),
          badgeEnabled: S.optional(S.Boolean),
          logsConfig: S.optional(__S(1296, __c81, 0)),
          fileSystemLocations: S.optional(__S(1375, __c85, 15)),
          buildBatchConfig: S.optional(__S(1313, __c82, 1)),
          concurrentBuildLimit: S.optional(S.Number),
          autoRetryLimit: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateProjectInput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ project: S.optional(__S(97, __c6, 1)) })).annotate({
        identifier: "CreateProjectOutput",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          type: S.String,
          exportConfig: __S(129, __c8, 1),
          tags: S.optional(__S(17, __c1, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateReportGroupInput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ reportGroup: S.optional(__S(144, __c9, 0)) })).annotate({
        identifier: "CreateReportGroupOutput",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          projectName: S.String,
          branchFilter: S.optional(S.String),
          filterGroups: S.optional(__S(66, __c4, 2)),
          buildType: S.optional(S.String),
          manualCreation: S.optional(S.Boolean),
          scopeConfiguration: S.optional(__S(67, __c4, 3)),
          pullRequestBuildPolicy: S.optional(__S(68, __c4, 4)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateWebhookInput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ webhook: S.optional(__S(69, __c4, 5)) })).annotate({
        identifier: "CreateWebhookOutput",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteBuildBatchInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          statusCode: S.optional(S.String),
          buildsDeleted: S.optional(__S(1184, __c74, 0)),
          buildsNotDeleted: S.optional(__S(1169, __c73, 1)),
        }),
      ).annotate({ identifier: "DeleteBuildBatchOutput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteFleetInput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteFleetOutput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteProjectInput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteReportInput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String, deleteReports: S.optional(S.Boolean) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteReportGroupInput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteResourcePolicyInput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteSourceCredentialsInput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ arn: S.optional(S.String) })).annotate({
        identifier: "DeleteSourceCredentialsOutput",
      });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ projectName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteWebhookInput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          reportArn: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          sortOrder: S.optional(S.String),
          sortBy: S.optional(S.String),
          minLineCoveragePercentage: S.optional(S.Number),
          maxLineCoveragePercentage: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeCodeCoveragesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          reportARN: S.optional(S.String),
          filePath: S.optional(S.String),
          lineCoveragePercentage: S.optional(S.Number),
          linesCovered: S.optional(S.Number),
          linesMissed: S.optional(S.Number),
          branchCoveragePercentage: S.optional(S.Number),
          branchesCovered: S.optional(S.Number),
          branchesMissed: S.optional(S.Number),
          expired: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CodeCoverage" });
    case 2:
      return S.Array(__S(497, __c31, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          codeCoverages: S.optional(__S(498, __c31, 2)),
        }),
      ).annotate({ identifier: "DescribeCodeCoveragesOutput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ status: S.optional(S.String), keyword: S.optional(S.String) }),
      ).annotate({ identifier: "TestCaseFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          reportArn: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          filter: S.optional(__S(512, __c32, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeTestCasesInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          reportArn: S.optional(S.String),
          testRawDataPath: S.optional(S.String),
          prefix: S.optional(S.String),
          name: S.optional(S.String),
          status: S.optional(S.String),
          durationInNanoSeconds: S.optional(S.Number),
          message: S.optional(S.String),
          expired: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          testSuiteName: S.optional(S.String),
        }),
      ).annotate({ identifier: "TestCase" });
    case 3:
      return S.Array(__S(514, __c32, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), testCases: S.optional(__S(515, __c32, 3)) }),
      ).annotate({ identifier: "DescribeTestCasesOutput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          reportGroupArn: S.String,
          numOfReports: S.optional(S.Number),
          trendField: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetReportGroupTrendInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          average: S.optional(S.String),
          max: S.optional(S.String),
          min: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReportGroupTrendStats" });
    case 2:
      return S.suspend(() =>
        S.Struct({ reportArn: S.optional(S.String), data: S.optional(S.String) }),
      ).annotate({ identifier: "ReportWithRawData" });
    case 3:
      return S.Array(__S(530, __c33, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          stats: S.optional(__S(529, __c33, 1)),
          rawData: S.optional(__S(531, __c33, 3)),
        }),
      ).annotate({ identifier: "GetReportGroupTrendOutput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResourcePolicyInput" });
    case 1:
      return S.suspend(() => S.Struct({ policy: S.optional(S.String) })).annotate({
        identifier: "GetResourcePolicyOutput",
      });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          username: S.optional(S.String),
          token: SensitiveString,
          serverType: S.String,
          authType: S.String,
          shouldOverwrite: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ImportSourceCredentialsInput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ projectName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "InvalidateProjectCacheInput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          filter: S.optional(__S(624, __c39, 0)),
          maxResults: S.optional(S.Number),
          sortOrder: S.optional(S.String),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListBuildBatchesInput" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ids: S.optional(__S(1184, __c74, 0)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListBuildBatchesOutput" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ status: S.optional(S.String) })).annotate({
        identifier: "BuildBatchFilter",
      });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          projectName: S.optional(S.String),
          filter: S.optional(__S(624, __c39, 0)),
          maxResults: S.optional(S.Number),
          sortOrder: S.optional(S.String),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListBuildBatchesForProjectInput" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ sortOrder: S.optional(S.String), nextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListBuildsInput" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          projectName: S.String,
          sortOrder: S.optional(S.String),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListBuildsForProjectInput" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sandboxId: S.String,
          maxResults: S.optional(S.Number),
          sortOrder: S.optional(S.String),
          nextToken: S.optional(SensitiveString),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListCommandExecutionsForSandboxInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          commandExecutions: S.optional(__S(1536, __c96, 0)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCommandExecutionsForSandboxOutput" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListCuratedEnvironmentImagesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          description: S.optional(S.String),
          versions: S.optional(__S(1184, __c74, 0)),
        }),
      ).annotate({ identifier: "EnvironmentImage" });
    case 2:
      return S.Array(__S(705, __c44, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ language: S.optional(S.String), images: S.optional(__S(706, __c44, 2)) }),
      ).annotate({ identifier: "EnvironmentLanguage" });
    case 4:
      return S.Array(__S(707, __c44, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ platform: S.optional(S.String), languages: S.optional(__S(708, __c44, 4)) }),
      ).annotate({ identifier: "EnvironmentPlatform" });
    case 6:
      return S.Array(__S(709, __c44, 5));
    case 7:
      return S.suspend(() => S.Struct({ platforms: S.optional(__S(710, __c44, 6)) })).annotate({
        identifier: "ListCuratedEnvironmentImagesOutput",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(SensitiveString),
          maxResults: S.optional(S.Number),
          sortOrder: S.optional(S.String),
          sortBy: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFleetsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), fleets: S.optional(__S(1184, __c74, 0)) }),
      ).annotate({ identifier: "ListFleetsOutput" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sortBy: S.optional(S.String),
          sortOrder: S.optional(S.String),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListProjectsInput" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), projects: S.optional(__S(1184, __c74, 0)) }),
      ).annotate({ identifier: "ListProjectsOutput" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sortOrder: S.optional(S.String),
          sortBy: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListReportGroupsInput" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          reportGroups: S.optional(__S(1184, __c74, 0)),
        }),
      ).annotate({ identifier: "ListReportGroupsOutput" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sortOrder: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          filter: S.optional(__S(624, __c39, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListReportsInput" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), reports: S.optional(__S(1184, __c74, 0)) }),
      ).annotate({ identifier: "ListReportsOutput" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          reportGroupArn: S.String,
          nextToken: S.optional(S.String),
          sortOrder: S.optional(S.String),
          maxResults: S.optional(S.Number),
          filter: S.optional(__S(624, __c39, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListReportsForReportGroupInput" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number),
          sortOrder: S.optional(S.String),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSandboxesInput" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          projectName: S.String,
          maxResults: S.optional(S.Number),
          sortOrder: S.optional(S.String),
          nextToken: S.optional(SensitiveString),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSandboxesForProjectInput" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sortBy: S.optional(S.String),
          sortOrder: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSharedProjectsInput" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sortOrder: S.optional(S.String),
          sortBy: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSharedReportGroupsInput" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSourceCredentialsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          serverType: S.optional(S.String),
          authType: S.optional(S.String),
          resource: S.optional(S.String),
        }),
      ).annotate({ identifier: "SourceCredentialsInfo" });
    case 2:
      return S.Array(__S(913, __c57, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ sourceCredentialsInfos: S.optional(__S(914, __c57, 2)) }),
      ).annotate({ identifier: "ListSourceCredentialsOutput" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ policy: S.String, resourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutResourcePolicyInput" });
    case 1:
      return S.suspend(() => S.Struct({ resourceArn: S.optional(S.String) })).annotate({
        identifier: "PutResourcePolicyOutput",
      });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.optional(S.String), idempotencyToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RetryBuildInput" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ build: S.optional(__S(1492, __c93, 4)) })).annotate({
        identifier: "RetryBuildOutput",
      });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          idempotencyToken: S.optional(S.String),
          retryType: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RetryBuildBatchInput" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ buildBatch: S.optional(__S(1334, __c83, 6)) })).annotate({
        identifier: "RetryBuildBatchOutput",
      });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          projectName: S.String,
          secondarySourcesOverride: S.optional(__S(1364, __c85, 4)),
          secondarySourcesVersionOverride: S.optional(__S(1366, __c85, 6)),
          sourceVersion: S.optional(S.String),
          artifactsOverride: S.optional(__S(80, __c5, 0)),
          secondaryArtifactsOverride: S.optional(__S(81, __c5, 1)),
          environmentVariablesOverride: S.optional(__S(1369, __c85, 9)),
          sourceTypeOverride: S.optional(S.String),
          sourceLocationOverride: S.optional(S.String),
          sourceAuthOverride: S.optional(__S(1361, __c85, 1)),
          gitCloneDepthOverride: S.optional(S.Number),
          gitSubmodulesConfigOverride: S.optional(__S(1360, __c85, 0)),
          buildspecOverride: S.optional(S.String),
          insecureSslOverride: S.optional(S.Boolean),
          reportBuildStatusOverride: S.optional(S.Boolean),
          buildStatusConfigOverride: S.optional(__S(1362, __c85, 2)),
          environmentTypeOverride: S.optional(S.String),
          imageOverride: S.optional(S.String),
          computeTypeOverride: S.optional(S.String),
          certificateOverride: S.optional(S.String),
          cacheOverride: S.optional(__S(1392, __c87, 0)),
          serviceRoleOverride: S.optional(S.String),
          privilegedModeOverride: S.optional(S.Boolean),
          timeoutInMinutesOverride: S.optional(S.Number),
          queuedTimeoutInMinutesOverride: S.optional(S.Number),
          encryptionKeyOverride: S.optional(S.String),
          idempotencyToken: S.optional(S.String),
          logsConfigOverride: S.optional(__S(1296, __c81, 0)),
          registryCredentialOverride: S.optional(__S(1370, __c85, 10)),
          imagePullCredentialsTypeOverride: S.optional(S.String),
          debugSessionEnabled: S.optional(S.Boolean),
          fleetOverride: S.optional(__S(1367, __c85, 7)),
          autoRetryLimitOverride: S.optional(S.Number),
          hostKernelOverride: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartBuildInput" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          projectName: S.String,
          secondarySourcesOverride: S.optional(__S(1364, __c85, 4)),
          secondarySourcesVersionOverride: S.optional(__S(1366, __c85, 6)),
          sourceVersion: S.optional(S.String),
          artifactsOverride: S.optional(__S(80, __c5, 0)),
          secondaryArtifactsOverride: S.optional(__S(81, __c5, 1)),
          environmentVariablesOverride: S.optional(__S(1369, __c85, 9)),
          sourceTypeOverride: S.optional(S.String),
          sourceLocationOverride: S.optional(S.String),
          sourceAuthOverride: S.optional(__S(1361, __c85, 1)),
          gitCloneDepthOverride: S.optional(S.Number),
          gitSubmodulesConfigOverride: S.optional(__S(1360, __c85, 0)),
          buildspecOverride: S.optional(S.String),
          insecureSslOverride: S.optional(S.Boolean),
          reportBuildBatchStatusOverride: S.optional(S.Boolean),
          environmentTypeOverride: S.optional(S.String),
          imageOverride: S.optional(S.String),
          computeTypeOverride: S.optional(S.String),
          certificateOverride: S.optional(S.String),
          cacheOverride: S.optional(__S(1392, __c87, 0)),
          serviceRoleOverride: S.optional(S.String),
          privilegedModeOverride: S.optional(S.Boolean),
          buildTimeoutInMinutesOverride: S.optional(S.Number),
          queuedTimeoutInMinutesOverride: S.optional(S.Number),
          encryptionKeyOverride: S.optional(S.String),
          idempotencyToken: S.optional(S.String),
          logsConfigOverride: S.optional(__S(1296, __c81, 0)),
          registryCredentialOverride: S.optional(__S(1370, __c85, 10)),
          imagePullCredentialsTypeOverride: S.optional(S.String),
          buildBatchConfigOverride: S.optional(__S(1313, __c82, 1)),
          debugSessionEnabled: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartBuildBatchInput" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sandboxId: S.String,
          command: SensitiveString,
          type: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartCommandExecutionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ commandExecution: S.optional(__S(1552, __c97, 0)) }),
      ).annotate({ identifier: "StartCommandExecutionOutput" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          projectName: S.optional(S.String),
          idempotencyToken: S.optional(SensitiveString),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartSandboxInput" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ sandbox: S.optional(__S(195, __c12, 3)) })).annotate({
        identifier: "StartSandboxOutput",
      });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ sandboxId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartSandboxConnectionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          sessionId: S.optional(S.String),
          tokenValue: S.optional(S.String),
          streamUrl: S.optional(S.String),
        }),
      ).annotate({ identifier: "SSMSession" });
    case 2:
      return S.suspend(() => S.Struct({ ssmSession: S.optional(__S(1089, __c68, 1)) })).annotate({
        identifier: "StartSandboxConnectionOutput",
      });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopBuildInput" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopBuildBatchInput" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopSandboxInput" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ids: __S(1184, __c74, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchDeleteBuildsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          buildsDeleted: S.optional(__S(1184, __c74, 0)),
          buildsNotDeleted: S.optional(__S(1169, __c73, 1)),
        }),
      ).annotate({ identifier: "BatchDeleteBuildsOutput" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.optional(S.String), statusCode: S.optional(S.String) }),
      ).annotate({ identifier: "BuildNotDeleted" });
    case 1:
      return S.Array(__S(1168, __c73, 0));
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          baseCapacity: S.optional(S.Number),
          environmentType: S.optional(S.String),
          computeType: S.optional(S.String),
          computeConfiguration: S.optional(__S(1344, __c84, 0)),
          scalingConfiguration: S.optional(__S(224, __c14, 0)),
          overflowBehavior: S.optional(S.String),
          vpcConfig: S.optional(__S(1345, __c84, 1)),
          proxyConfiguration: S.optional(__S(38, __c2, 6)),
          imageId: S.optional(S.String),
          fleetServiceRole: S.optional(S.String),
          tags: S.optional(__S(17, __c1, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateFleetInput" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          source: S.optional(__S(1363, __c85, 3)),
          secondarySources: S.optional(__S(1364, __c85, 4)),
          sourceVersion: S.optional(S.String),
          secondarySourceVersions: S.optional(__S(1366, __c85, 6)),
          artifacts: S.optional(__S(80, __c5, 0)),
          secondaryArtifacts: S.optional(__S(81, __c5, 1)),
          cache: S.optional(__S(1392, __c87, 0)),
          environment: S.optional(__S(1373, __c85, 13)),
          serviceRole: S.optional(S.String),
          timeoutInMinutes: S.optional(S.Number),
          queuedTimeoutInMinutes: S.optional(S.Number),
          encryptionKey: S.optional(S.String),
          tags: S.optional(__S(17, __c1, 1)),
          vpcConfig: S.optional(__S(1345, __c84, 1)),
          badgeEnabled: S.optional(S.Boolean),
          logsConfig: S.optional(__S(1296, __c81, 0)),
          fileSystemLocations: S.optional(__S(1375, __c85, 15)),
          buildBatchConfig: S.optional(__S(1313, __c82, 1)),
          concurrentBuildLimit: S.optional(S.Number),
          autoRetryLimit: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateProjectInput" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          projectArn: S.String,
          projectVisibility: S.String,
          resourceAccessRole: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateProjectVisibilityInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          projectArn: S.optional(S.String),
          publicProjectAlias: S.optional(S.String),
          projectVisibility: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateProjectVisibilityOutput" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          exportConfig: S.optional(__S(129, __c8, 1)),
          tags: S.optional(__S(17, __c1, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateReportGroupInput" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          projectName: S.String,
          branchFilter: S.optional(S.String),
          rotateSecret: S.optional(S.Boolean),
          filterGroups: S.optional(__S(66, __c4, 2)),
          buildType: S.optional(S.String),
          pullRequestBuildPolicy: S.optional(__S(68, __c4, 4)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateWebhookInput" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ids: __S(1184, __c74, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetBuildBatchesInput" });
    case 1:
      return S.Array(__S(1334, __c83, 6));
    case 2:
      return S.suspend(() =>
        S.Struct({
          buildBatches: S.optional(__S(1281, __c80, 1)),
          buildBatchesNotFound: S.optional(__S(1184, __c74, 0)),
        }),
      ).annotate({ identifier: "BatchGetBuildBatchesOutput" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cloudWatchLogs: S.optional(__S(1440, __c90, 0)),
          s3Logs: S.optional(__S(1441, __c90, 1)),
        }),
      ).annotate({ identifier: "LogsConfig" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maximumBuildsAllowed: S.optional(S.Number),
          computeTypesAllowed: S.optional(__S(1184, __c74, 0)),
          fleetsAllowed: S.optional(__S(1184, __c74, 0)),
        }),
      ).annotate({ identifier: "BatchRestrictions" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          serviceRole: S.optional(S.String),
          combineArtifacts: S.optional(S.Boolean),
          restrictions: S.optional(__S(1312, __c82, 0)),
          timeoutInMins: S.optional(S.Number),
          batchReportMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProjectBuildBatchConfig" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          location: S.optional(S.String),
          identifier: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResolvedArtifact" });
    case 1:
      return S.Array(__S(1328, __c83, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          requestedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          buildStatus: S.optional(S.String),
          primaryArtifact: S.optional(__S(1328, __c83, 0)),
          secondaryArtifacts: S.optional(__S(1329, __c83, 1)),
        }),
      ).annotate({ identifier: "BuildSummary" });
    case 3:
      return S.Array(__S(1330, __c83, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          identifier: S.optional(S.String),
          dependsOn: S.optional(__S(1184, __c74, 0)),
          ignoreFailure: S.optional(S.Boolean),
          currentBuildSummary: S.optional(__S(1330, __c83, 2)),
          priorBuildSummaryList: S.optional(__S(1331, __c83, 3)),
        }),
      ).annotate({ identifier: "BuildGroup" });
    case 5:
      return S.Array(__S(1332, __c83, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          currentPhase: S.optional(S.String),
          buildBatchStatus: S.optional(S.String),
          sourceVersion: S.optional(S.String),
          resolvedSourceVersion: S.optional(S.String),
          projectName: S.optional(S.String),
          phases: S.optional(__S(1425, __c89, 1)),
          source: S.optional(__S(1363, __c85, 3)),
          secondarySources: S.optional(__S(1364, __c85, 4)),
          secondarySourceVersions: S.optional(__S(1366, __c85, 6)),
          artifacts: S.optional(__S(1426, __c89, 2)),
          secondaryArtifacts: S.optional(__S(1427, __c89, 3)),
          cache: S.optional(__S(1392, __c87, 0)),
          environment: S.optional(__S(1373, __c85, 13)),
          serviceRole: S.optional(S.String),
          logConfig: S.optional(__S(1296, __c81, 0)),
          buildTimeoutInMinutes: S.optional(S.Number),
          queuedTimeoutInMinutes: S.optional(S.Number),
          complete: S.optional(S.Boolean),
          initiator: S.optional(S.String),
          vpcConfig: S.optional(__S(1345, __c84, 1)),
          encryptionKey: S.optional(S.String),
          buildBatchNumber: S.optional(S.Number),
          fileSystemLocations: S.optional(__S(1375, __c85, 15)),
          buildBatchConfig: S.optional(__S(1313, __c82, 1)),
          buildGroups: S.optional(__S(1333, __c83, 5)),
          debugSessionEnabled: S.optional(S.Boolean),
          reportArns: S.optional(__S(1184, __c74, 0)),
        }),
      ).annotate({ identifier: "BuildBatch" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vCpu: S.optional(S.Number),
          memory: S.optional(S.Number),
          disk: S.optional(S.Number),
          machineType: S.optional(S.String),
          instanceType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ComputeConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          vpcId: S.optional(S.String),
          subnets: S.optional(__S(1184, __c74, 0)),
          securityGroupIds: S.optional(__S(1184, __c74, 0)),
        }),
      ).annotate({ identifier: "VpcConfig" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ fetchSubmodules: S.Boolean })).annotate({
        identifier: "GitSubmodulesConfig",
      });
    case 1:
      return S.suspend(() => S.Struct({ type: S.String, resource: S.optional(S.String) })).annotate(
        { identifier: "SourceAuth" },
      );
    case 2:
      return S.suspend(() =>
        S.Struct({ context: S.optional(S.String), targetUrl: S.optional(S.String) }),
      ).annotate({ identifier: "BuildStatusConfig" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          location: S.optional(S.String),
          gitCloneDepth: S.optional(S.Number),
          gitSubmodulesConfig: S.optional(__S(1360, __c85, 0)),
          buildspec: S.optional(S.String),
          auth: S.optional(__S(1361, __c85, 1)),
          reportBuildStatus: S.optional(S.Boolean),
          buildStatusConfig: S.optional(__S(1362, __c85, 2)),
          insecureSsl: S.optional(S.Boolean),
          sourceIdentifier: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProjectSource" });
    case 4:
      return S.Array(__S(1363, __c85, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ sourceIdentifier: S.String, sourceVersion: S.String }),
      ).annotate({ identifier: "ProjectSourceVersion" });
    case 6:
      return S.Array(__S(1365, __c85, 5));
    case 7:
      return S.suspend(() => S.Struct({ fleetArn: S.optional(S.String) })).annotate({
        identifier: "ProjectFleet",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({ name: S.String, value: S.String, type: S.optional(S.String) }),
      ).annotate({ identifier: "EnvironmentVariable" });
    case 9:
      return S.Array(__S(1368, __c85, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({ credential: S.String, credentialProvider: S.String }),
      ).annotate({ identifier: "RegistryCredential" });
    case 11:
      return S.suspend(() =>
        S.Struct({ status: S.optional(S.String), message: S.optional(S.String) }),
      ).annotate({ identifier: "DockerServerStatus" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          computeType: S.String,
          securityGroupIds: S.optional(__S(1184, __c74, 0)),
          status: S.optional(__S(1371, __c85, 11)),
        }),
      ).annotate({ identifier: "DockerServer" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          image: S.String,
          computeType: S.String,
          computeConfiguration: S.optional(__S(1344, __c84, 0)),
          fleet: S.optional(__S(1367, __c85, 7)),
          environmentVariables: S.optional(__S(1369, __c85, 9)),
          privilegedMode: S.optional(S.Boolean),
          certificate: S.optional(S.String),
          registryCredential: S.optional(__S(1370, __c85, 10)),
          imagePullCredentialsType: S.optional(S.String),
          dockerServer: S.optional(__S(1372, __c85, 12)),
          hostKernel: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProjectEnvironment" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          location: S.optional(S.String),
          mountPoint: S.optional(S.String),
          identifier: S.optional(S.String),
          mountOptions: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProjectFileSystemLocation" });
    case 15:
      return S.Array(__S(1374, __c85, 14));
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          location: S.optional(S.String),
          modes: S.optional(__S(1376, __c86, 0)),
          cacheNamespace: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProjectCache" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ statusCode: S.optional(S.String), message: S.optional(S.String) }),
      ).annotate({ identifier: "PhaseContext" });
    case 1:
      return S.Array(__S(1408, __c88, 0));
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          phaseType: S.optional(S.String),
          phaseStatus: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          durationInSeconds: S.optional(S.Number),
          contexts: S.optional(__S(1409, __c88, 1)),
        }),
      ).annotate({ identifier: "BuildBatchPhase" });
    case 1:
      return S.Array(__S(1424, __c89, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          location: S.optional(S.String),
          sha256sum: S.optional(S.String),
          md5sum: S.optional(S.String),
          overrideArtifactName: S.optional(S.Boolean),
          encryptionDisabled: S.optional(S.Boolean),
          artifactIdentifier: S.optional(S.String),
          bucketOwnerAccess: S.optional(S.String),
        }),
      ).annotate({ identifier: "BuildArtifacts" });
    case 3:
      return S.Array(__S(1426, __c89, 2));
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          status: S.String,
          groupName: S.optional(S.String),
          streamName: S.optional(S.String),
        }),
      ).annotate({ identifier: "CloudWatchLogsConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: S.String,
          location: S.optional(S.String),
          encryptionDisabled: S.optional(S.Boolean),
          bucketOwnerAccess: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3LogsConfig" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ids: __S(1184, __c74, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetBuildsInput" });
    case 1:
      return S.Array(__S(1492, __c93, 4));
    case 2:
      return S.suspend(() =>
        S.Struct({
          builds: S.optional(__S(1457, __c91, 1)),
          buildsNotFound: S.optional(__S(1184, __c74, 0)),
        }),
      ).annotate({ identifier: "BatchGetBuildsOutput" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ subnetId: S.optional(S.String), networkInterfaceId: S.optional(S.String) }),
      ).annotate({ identifier: "NetworkInterface" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "ExportedEnvironmentVariable" });
    case 1:
      return S.Array(__S(1488, __c93, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ sessionEnabled: S.optional(S.Boolean), sessionTarget: S.optional(S.String) }),
      ).annotate({ identifier: "DebugSession" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          autoRetryLimit: S.optional(S.Number),
          autoRetryNumber: S.optional(S.Number),
          nextAutoRetry: S.optional(S.String),
          previousAutoRetry: S.optional(S.String),
        }),
      ).annotate({ identifier: "AutoRetryConfig" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          buildNumber: S.optional(S.Number),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          currentPhase: S.optional(S.String),
          buildStatus: S.optional(S.String),
          sourceVersion: S.optional(S.String),
          resolvedSourceVersion: S.optional(S.String),
          projectName: S.optional(S.String),
          phases: S.optional(__S(1425, __c89, 1)),
          source: S.optional(__S(1363, __c85, 3)),
          secondarySources: S.optional(__S(1364, __c85, 4)),
          secondarySourceVersions: S.optional(__S(1366, __c85, 6)),
          artifacts: S.optional(__S(1426, __c89, 2)),
          secondaryArtifacts: S.optional(__S(1427, __c89, 3)),
          cache: S.optional(__S(1392, __c87, 0)),
          environment: S.optional(__S(1373, __c85, 13)),
          serviceRole: S.optional(S.String),
          logs: S.optional(__S(1504, __c94, 0)),
          timeoutInMinutes: S.optional(S.Number),
          queuedTimeoutInMinutes: S.optional(S.Number),
          buildComplete: S.optional(S.Boolean),
          initiator: S.optional(S.String),
          vpcConfig: S.optional(__S(1345, __c84, 1)),
          networkInterface: S.optional(__S(1472, __c92, 0)),
          encryptionKey: S.optional(S.String),
          exportedEnvironmentVariables: S.optional(__S(1489, __c93, 1)),
          reportArns: S.optional(__S(1184, __c74, 0)),
          fileSystemLocations: S.optional(__S(1375, __c85, 15)),
          debugSession: S.optional(__S(1490, __c93, 2)),
          buildBatchArn: S.optional(S.String),
          autoRetryConfig: S.optional(__S(1491, __c93, 3)),
        }),
      ).annotate({ identifier: "Build" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          groupName: S.optional(S.String),
          streamName: S.optional(S.String),
          deepLink: S.optional(S.String),
          s3DeepLink: S.optional(S.String),
          cloudWatchLogsArn: S.optional(S.String),
          s3LogsArn: S.optional(S.String),
          cloudWatchLogs: S.optional(__S(1440, __c90, 0)),
          s3Logs: S.optional(__S(1441, __c90, 1)),
        }),
      ).annotate({ identifier: "LogsLocation" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ sandboxId: S.String, commandExecutionIds: __S(1184, __c74, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetCommandExecutionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          commandExecutions: S.optional(__S(1536, __c96, 0)),
          commandExecutionsNotFound: S.optional(__S(1184, __c74, 0)),
        }),
      ).annotate({ identifier: "BatchGetCommandExecutionsOutput" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1552, __c97, 0));
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          sandboxId: S.optional(S.String),
          submitTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          command: S.optional(SensitiveString),
          type: S.optional(S.String),
          exitCode: S.optional(S.String),
          standardOutputContent: S.optional(SensitiveString),
          standardErrContent: S.optional(SensitiveString),
          logs: S.optional(__S(1504, __c94, 0)),
          sandboxArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CommandExecution" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
