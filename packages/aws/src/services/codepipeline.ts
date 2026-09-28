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
  sdkId: "CodePipeline",
  target: "CodePipeline_20150709",
  version: "2015-07-09",
  sigv4: "codepipeline",
  protocol: awsJson1_1Protocol,
  xmlns: "http://codepipeline.amazonaws.com/doc/2015-07-09/",
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
                `https://codepipeline-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://codepipeline-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://codepipeline.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://codepipeline.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ActionExecutionNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ActionExecutionNotFoundException")<{
    readonly message?: string;
  }> {}
export class ActionNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ActionNotFoundException")<{
    readonly message?: string;
  }> {}
export class ActionTypeNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ActionTypeNotFoundException")<{
    readonly message?: string;
  }> {}
export class ApprovalAlreadyCompletedException
  extends /*@__PURE__*/ TE.TaggedError("ApprovalAlreadyCompletedException")<{
    readonly message?: string;
  }> {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ TE.TaggedError("ConcurrentModificationException")<{
    readonly message?: string;
  }> {}
export class ConcurrentPipelineExecutionsLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConcurrentPipelineExecutionsLimitExceededException",
  )<{ readonly message?: string }> {}
export class ConditionNotOverridableException
  extends /*@__PURE__*/ TE.TaggedError("ConditionNotOverridableException")<{
    readonly message?: string;
  }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class DuplicatedStopRequestException
  extends /*@__PURE__*/ TE.TaggedError("DuplicatedStopRequestException")<{
    readonly message?: string;
  }> {}
export class InvalidActionDeclarationException
  extends /*@__PURE__*/ TE.TaggedError("InvalidActionDeclarationException")<{
    readonly message?: string;
  }> {}
export class InvalidApprovalTokenException
  extends /*@__PURE__*/ TE.TaggedError("InvalidApprovalTokenException")<{
    readonly message?: string;
  }> {}
export class InvalidArnException
  extends /*@__PURE__*/ TE.TaggedError("InvalidArnException")<{
    readonly message?: string;
  }> {}
export class InvalidBlockerDeclarationException
  extends /*@__PURE__*/ TE.TaggedError("InvalidBlockerDeclarationException")<{
    readonly message?: string;
  }> {}
export class InvalidClientTokenException
  extends /*@__PURE__*/ TE.TaggedError("InvalidClientTokenException")<{
    readonly message?: string;
  }> {}
export class InvalidJobException
  extends /*@__PURE__*/ TE.TaggedError("InvalidJobException")<{
    readonly message?: string;
  }> {}
export class InvalidJobStateException
  extends /*@__PURE__*/ TE.TaggedError("InvalidJobStateException")<{
    readonly message?: string;
  }> {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ TE.TaggedError("InvalidNextTokenException")<{
    readonly message?: string;
  }> {}
export class InvalidNonceException
  extends /*@__PURE__*/ TE.TaggedError("InvalidNonceException")<{
    readonly message?: string;
  }> {}
export class InvalidStageDeclarationException
  extends /*@__PURE__*/ TE.TaggedError("InvalidStageDeclarationException")<{
    readonly message?: string;
  }> {}
export class InvalidStructureException
  extends /*@__PURE__*/ TE.TaggedError("InvalidStructureException")<{
    readonly message?: string;
  }> {}
export class InvalidTagsException
  extends /*@__PURE__*/ TE.TaggedError("InvalidTagsException")<{
    readonly message?: string;
  }> {}
export class InvalidWebhookAuthenticationParametersException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidWebhookAuthenticationParametersException",
  )<{ readonly message?: string }> {}
export class InvalidWebhookFilterPatternException
  extends /*@__PURE__*/ TE.TaggedError("InvalidWebhookFilterPatternException")<{
    readonly message?: string;
  }> {}
export class JobNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("JobNotFoundException")<{
    readonly message?: string;
  }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException")<{
    readonly message?: string;
  }> {}
export class NotLatestPipelineExecutionException
  extends /*@__PURE__*/ TE.TaggedError("NotLatestPipelineExecutionException")<{
    readonly message?: string;
  }> {}
export class OutputVariablesSizeExceededException
  extends /*@__PURE__*/ TE.TaggedError("OutputVariablesSizeExceededException")<{
    readonly message?: string;
  }> {}
export class PipelineExecutionNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("PipelineExecutionNotFoundException")<{
    readonly message?: string;
  }> {}
export class PipelineExecutionNotStoppableException
  extends /*@__PURE__*/ TE.TaggedError(
    "PipelineExecutionNotStoppableException",
  )<{ readonly message?: string }> {}
export class PipelineExecutionOutdatedException
  extends /*@__PURE__*/ TE.TaggedError("PipelineExecutionOutdatedException")<{
    readonly message?: string;
  }> {}
export class PipelineNameInUseException
  extends /*@__PURE__*/ TE.TaggedError("PipelineNameInUseException")<{
    readonly message?: string;
  }> {}
export class PipelineNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("PipelineNotFoundException")<{
    readonly message?: string;
  }> {}
export class PipelineVersionNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("PipelineVersionNotFoundException")<{
    readonly message?: string;
  }> {}
export class RequestFailedException
  extends /*@__PURE__*/ TE.TaggedError("RequestFailedException")<{
    readonly message?: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException")<{
    readonly message?: string;
  }> {}
export class StageNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("StageNotFoundException")<{
    readonly message?: string;
  }> {}
export class StageNotRetryableException
  extends /*@__PURE__*/ TE.TaggedError("StageNotRetryableException")<{
    readonly message?: string;
  }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError("TooManyTagsException")<{
    readonly message?: string;
  }> {}
export class UnableToRollbackStageException
  extends /*@__PURE__*/ TE.TaggedError("UnableToRollbackStageException")<{
    readonly message?: string;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError("ValidationException")<{
    readonly message?: string;
  }> {}
export class WebhookNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("WebhookNotFoundException")<{
    readonly message?: string;
  }> {}
export type JobId = string;
export type Nonce = string;
export interface AcknowledgeJobInput {
  jobId: string;
  nonce: string;
}
export type JobStatus =
  | "Created"
  | "Queued"
  | "Dispatched"
  | "InProgress"
  | "TimedOut"
  | "Succeeded"
  | "Failed"
  | (string & {});
export interface AcknowledgeJobOutput {
  status?: JobStatus;
}
export type ThirdPartyJobId = string;
export type ClientToken = string;
export interface AcknowledgeThirdPartyJobInput {
  jobId: string;
  nonce: string;
  clientToken: string;
}
export interface AcknowledgeThirdPartyJobOutput {
  status?: JobStatus;
}
export type ActionCategory =
  | "Source"
  | "Build"
  | "Deploy"
  | "Test"
  | "Invoke"
  | "Approval"
  | "Compute"
  | (string & {});
export type ActionProvider = string;
export type Version = string;
export type Url = string;
export type UrlTemplate = string;
export interface ActionTypeSettings {
  thirdPartyConfigurationUrl?: string;
  entityUrlTemplate?: string;
  executionUrlTemplate?: string;
  revisionUrlTemplate?: string;
}
export type ActionConfigurationKey = string;
export type Description = string;
export type ActionConfigurationPropertyType =
  | "String"
  | "Number"
  | "Boolean"
  | (string & {});
export interface ActionConfigurationProperty {
  name: string;
  required: boolean;
  key: boolean;
  secret: boolean;
  queryable?: boolean;
  description?: string;
  type?: ActionConfigurationPropertyType;
}
export type ActionConfigurationPropertyList = ActionConfigurationProperty[];
export type MinimumArtifactCount = number;
export type MaximumArtifactCount = number;
export interface ArtifactDetails {
  minimumCount: number;
  maximumCount: number;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export type TagList = Tag[];
export interface CreateCustomActionTypeInput {
  category: ActionCategory;
  provider: string;
  version: string;
  settings?: ActionTypeSettings;
  configurationProperties?: ActionConfigurationProperty[];
  inputArtifactDetails: ArtifactDetails;
  outputArtifactDetails: ArtifactDetails;
  tags?: Tag[];
}
export type ActionOwner = "AWS" | "ThirdParty" | "Custom" | (string & {});
export interface ActionTypeId {
  category: ActionCategory;
  owner: ActionOwner;
  provider: string;
  version: string;
}
export interface ActionType {
  id: ActionTypeId;
  settings?: ActionTypeSettings;
  actionConfigurationProperties?: ActionConfigurationProperty[];
  inputArtifactDetails: ArtifactDetails;
  outputArtifactDetails: ArtifactDetails;
}
export interface CreateCustomActionTypeOutput {
  actionType: ActionType;
  tags?: Tag[];
}
export type PipelineName = string;
export type RoleArn = string;
export type ArtifactStoreType = "S3" | (string & {});
export type ArtifactStoreLocation = string;
export type EncryptionKeyId = string;
export type EncryptionKeyType = "KMS" | (string & {});
export interface EncryptionKey {
  id: string;
  type: EncryptionKeyType;
}
export interface ArtifactStore {
  type: ArtifactStoreType;
  location: string;
  encryptionKey?: EncryptionKey;
}
export type AWSRegionName = string;
export type ArtifactStoreMap = { [key: string]: ArtifactStore | undefined };
export type StageName = string;
export type BlockerName = string;
export type BlockerType = "Schedule" | (string & {});
export interface BlockerDeclaration {
  name: string;
  type: BlockerType;
}
export type StageBlockerDeclarationList = BlockerDeclaration[];
export type ActionName = string;
export type ActionRunOrder = number;
export type ActionConfigurationValue = string;
export type ActionConfigurationMap = { [key: string]: string | undefined };
export type Command = string;
export type CommandList = string[];
export type ArtifactName = string;
export type FilePath = string;
export type FilePathList = string[];
export interface OutputArtifact {
  name: string;
  files?: string[];
}
export type OutputArtifactList = OutputArtifact[];
export interface InputArtifact {
  name: string;
}
export type InputArtifactList = InputArtifact[];
export type OutputVariable = string;
export type OutputVariableList = string[];
export type ActionNamespace = string;
export type ActionTimeout = number;
export type EnvironmentVariableName = string;
export type EnvironmentVariableValue = string;
export type EnvironmentVariableType =
  | "PLAINTEXT"
  | "SECRETS_MANAGER"
  | (string & {});
export interface EnvironmentVariable {
  name: string;
  value: string;
  type?: EnvironmentVariableType;
}
export type EnvironmentVariableList = EnvironmentVariable[];
export interface ActionDeclaration {
  name: string;
  actionTypeId: ActionTypeId;
  runOrder?: number;
  configuration?: { [key: string]: string | undefined };
  commands?: string[];
  outputArtifacts?: OutputArtifact[];
  inputArtifacts?: InputArtifact[];
  outputVariables?: string[];
  roleArn?: string;
  region?: string;
  namespace?: string;
  timeoutInMinutes?: number;
  environmentVariables?: EnvironmentVariable[];
}
export type StageActionDeclarationList = ActionDeclaration[];
export type Result = "ROLLBACK" | "FAIL" | "RETRY" | "SKIP" | (string & {});
export type StageRetryMode = "FAILED_ACTIONS" | "ALL_ACTIONS" | (string & {});
export interface RetryConfiguration {
  retryMode?: StageRetryMode;
}
export type RuleName = string;
export type RuleCategory = "Rule" | (string & {});
export type RuleOwner = "AWS" | (string & {});
export type RuleProvider = string;
export interface RuleTypeId {
  category: RuleCategory;
  owner?: RuleOwner;
  provider: string;
  version?: string;
}
export type RuleConfigurationKey = string;
export type RuleConfigurationValue = string;
export type RuleConfigurationMap = { [key: string]: string | undefined };
export type RuleTimeout = number;
export interface RuleDeclaration {
  name: string;
  ruleTypeId: RuleTypeId;
  configuration?: { [key: string]: string | undefined };
  commands?: string[];
  inputArtifacts?: InputArtifact[];
  roleArn?: string;
  region?: string;
  timeoutInMinutes?: number;
}
export type RuleDeclarationList = RuleDeclaration[];
export interface Condition {
  result?: Result;
  rules?: RuleDeclaration[];
}
export type ConditionList = Condition[];
export interface FailureConditions {
  result?: Result;
  retryConfiguration?: RetryConfiguration;
  conditions?: Condition[];
}
export interface SuccessConditions {
  conditions: Condition[];
}
export interface BeforeEntryConditions {
  conditions: Condition[];
}
export interface StageDeclaration {
  name: string;
  blockers?: BlockerDeclaration[];
  actions: ActionDeclaration[];
  onFailure?: FailureConditions;
  onSuccess?: SuccessConditions;
  beforeEntry?: BeforeEntryConditions;
}
export type PipelineStageDeclarationList = StageDeclaration[];
export type PipelineVersion = number;
export type ExecutionMode =
  | "QUEUED"
  | "SUPERSEDED"
  | "PARALLEL"
  | (string & {});
export type PipelineType = "V1" | "V2" | (string & {});
export type PipelineVariableName = string;
export type PipelineVariableValue = string;
export type PipelineVariableDescription = string;
export interface PipelineVariableDeclaration {
  name: string;
  defaultValue?: string;
  description?: string;
}
export type PipelineVariableDeclarationList = PipelineVariableDeclaration[];
export type PipelineTriggerProviderType =
  | "CodeStarSourceConnection"
  | (string & {});
export type GitTagNamePattern = string;
export type GitTagPatternList = string[];
export interface GitTagFilterCriteria {
  includes?: string[];
  excludes?: string[];
}
export type GitBranchNamePattern = string;
export type GitBranchPatternList = string[];
export interface GitBranchFilterCriteria {
  includes?: string[];
  excludes?: string[];
}
export type GitFilePathPattern = string;
export type GitFilePathPatternList = string[];
export interface GitFilePathFilterCriteria {
  includes?: string[];
  excludes?: string[];
}
export interface GitPushFilter {
  tags?: GitTagFilterCriteria;
  branches?: GitBranchFilterCriteria;
  filePaths?: GitFilePathFilterCriteria;
}
export type GitPushFilterList = GitPushFilter[];
export type GitPullRequestEventType =
  | "OPEN"
  | "UPDATED"
  | "CLOSED"
  | (string & {});
export type GitPullRequestEventTypeList = GitPullRequestEventType[];
export interface GitPullRequestFilter {
  events?: GitPullRequestEventType[];
  branches?: GitBranchFilterCriteria;
  filePaths?: GitFilePathFilterCriteria;
}
export type GitPullRequestFilterList = GitPullRequestFilter[];
export interface GitConfiguration {
  sourceActionName: string;
  push?: GitPushFilter[];
  pullRequest?: GitPullRequestFilter[];
}
export interface PipelineTriggerDeclaration {
  providerType: PipelineTriggerProviderType;
  gitConfiguration: GitConfiguration;
}
export type PipelineTriggerDeclarationList = PipelineTriggerDeclaration[];
export interface PipelineDeclaration {
  name: string;
  roleArn: string;
  artifactStore?: ArtifactStore;
  artifactStores?: { [key: string]: ArtifactStore | undefined };
  stages: StageDeclaration[];
  version?: number;
  executionMode?: ExecutionMode;
  pipelineType?: PipelineType;
  variables?: PipelineVariableDeclaration[];
  triggers?: PipelineTriggerDeclaration[];
}
export interface CreatePipelineInput {
  pipeline: PipelineDeclaration;
  tags?: Tag[];
}
export interface CreatePipelineOutput {
  pipeline?: PipelineDeclaration;
  tags?: Tag[];
}
export interface DeleteCustomActionTypeInput {
  category: ActionCategory;
  provider: string;
  version: string;
}
export interface DeleteCustomActionTypeResponse {}
export interface DeletePipelineInput {
  name: string;
}
export interface DeletePipelineResponse {}
export type WebhookName = string;
export interface DeleteWebhookInput {
  name: string;
}
export interface DeleteWebhookOutput {}
export interface DeregisterWebhookWithThirdPartyInput {
  webhookName?: string;
}
export interface DeregisterWebhookWithThirdPartyOutput {}
export type StageTransitionType = "Inbound" | "Outbound" | (string & {});
export type DisabledReason = string;
export interface DisableStageTransitionInput {
  pipelineName: string;
  stageName: string;
  transitionType: StageTransitionType;
  reason: string;
}
export interface DisableStageTransitionResponse {}
export interface EnableStageTransitionInput {
  pipelineName: string;
  stageName: string;
  transitionType: StageTransitionType;
}
export interface EnableStageTransitionResponse {}
export type ActionTypeOwner = string;
export interface GetActionTypeInput {
  category: ActionCategory;
  owner: string;
  provider: string;
  version: string;
}
export type ActionTypeDescription = string;
export type LambdaFunctionArn = string;
export interface LambdaExecutorConfiguration {
  lambdaFunctionArn: string;
}
export type AccountId = string;
export type PollingAccountList = string[];
export type ServicePrincipal = string;
export type PollingServicePrincipalList = string[];
export interface JobWorkerExecutorConfiguration {
  pollingAccounts?: string[];
  pollingServicePrincipals?: string[];
}
export interface ExecutorConfiguration {
  lambdaExecutorConfiguration?: LambdaExecutorConfiguration;
  jobWorkerExecutorConfiguration?: JobWorkerExecutorConfiguration;
}
export type ExecutorType = "JobWorker" | "Lambda" | (string & {});
export type PolicyStatementsTemplate = string;
export type JobTimeout = number;
export interface ActionTypeExecutor {
  configuration: ExecutorConfiguration;
  type: ExecutorType;
  policyStatementsTemplate?: string;
  jobTimeout?: number;
}
export interface ActionTypeIdentifier {
  category: ActionCategory;
  owner: string;
  provider: string;
  version: string;
}
export type MinimumActionTypeArtifactCount = number;
export type MaximumActionTypeArtifactCount = number;
export interface ActionTypeArtifactDetails {
  minimumCount: number;
  maximumCount: number;
}
export type AllowedAccount = string;
export type AllowedAccounts = string[];
export interface ActionTypePermissions {
  allowedAccounts: string[];
}
export type PropertyDescription = string;
export interface ActionTypeProperty {
  name: string;
  optional: boolean;
  key: boolean;
  noEcho: boolean;
  queryable?: boolean;
  description?: string;
}
export type ActionTypeProperties = ActionTypeProperty[];
export interface ActionTypeUrls {
  configurationUrl?: string;
  entityUrlTemplate?: string;
  executionUrlTemplate?: string;
  revisionUrlTemplate?: string;
}
export interface ActionTypeDeclaration {
  description?: string;
  executor: ActionTypeExecutor;
  id: ActionTypeIdentifier;
  inputArtifactDetails: ActionTypeArtifactDetails;
  outputArtifactDetails: ActionTypeArtifactDetails;
  permissions?: ActionTypePermissions;
  properties?: ActionTypeProperty[];
  urls?: ActionTypeUrls;
}
export interface GetActionTypeOutput {
  actionType?: ActionTypeDeclaration;
}
export interface GetJobDetailsInput {
  jobId: string;
}
export interface ActionConfiguration {
  configuration?: { [key: string]: string | undefined };
}
export interface StageContext {
  name?: string;
}
export type ActionExecutionId = string;
export interface ActionContext {
  name?: string;
  actionExecutionId?: string;
}
export type PipelineArn = string;
export type PipelineExecutionId = string;
export interface PipelineContext {
  pipelineName?: string;
  stage?: StageContext;
  action?: ActionContext;
  pipelineArn?: string;
  pipelineExecutionId?: string;
}
export type Revision = string;
export type ArtifactLocationType = "S3" | (string & {});
export type S3BucketName = string;
export type S3ObjectKey = string;
export interface S3ArtifactLocation {
  bucketName: string;
  objectKey: string;
}
export interface ArtifactLocation {
  type?: ArtifactLocationType;
  s3Location?: S3ArtifactLocation;
}
export interface Artifact {
  name?: string;
  revision?: string;
  location?: ArtifactLocation;
}
export type ArtifactList = Artifact[];
export type AccessKeyId = string | redacted.Redacted<string>;
export type SecretAccessKey = string | redacted.Redacted<string>;
export type SessionToken = string | redacted.Redacted<string>;
export interface AWSSessionCredentials {
  accessKeyId: string | redacted.Redacted<string>;
  secretAccessKey: string | redacted.Redacted<string>;
  sessionToken: string | redacted.Redacted<string>;
}
export type ContinuationToken = string;
export interface JobData {
  actionTypeId?: ActionTypeId;
  actionConfiguration?: ActionConfiguration;
  pipelineContext?: PipelineContext;
  inputArtifacts?: Artifact[];
  outputArtifacts?: Artifact[];
  artifactCredentials?: AWSSessionCredentials;
  continuationToken?: string;
  encryptionKey?: EncryptionKey;
}
export interface JobDetails {
  id?: string;
  data?: JobData;
  accountId?: string;
}
export interface GetJobDetailsOutput {
  jobDetails?: JobDetails;
}
export interface GetPipelineInput {
  name: string;
  version?: number;
}
export interface PipelineMetadata {
  pipelineArn?: string;
  created?: Date;
  updated?: Date;
  pollingDisabledAt?: Date;
}
export interface GetPipelineOutput {
  pipeline?: PipelineDeclaration;
  metadata?: PipelineMetadata;
}
export interface GetPipelineExecutionInput {
  pipelineName: string;
  pipelineExecutionId: string;
}
export type PipelineExecutionStatus =
  | "Cancelled"
  | "InProgress"
  | "Stopped"
  | "Stopping"
  | "Succeeded"
  | "Superseded"
  | "Failed"
  | (string & {});
export type PipelineExecutionStatusSummary = string;
export type RevisionChangeIdentifier = string;
export type RevisionSummary = string;
export interface ArtifactRevision {
  name?: string;
  revisionId?: string;
  revisionChangeIdentifier?: string;
  revisionSummary?: string;
  created?: Date;
  revisionUrl?: string;
}
export type ArtifactRevisionList = ArtifactRevision[];
export interface ResolvedPipelineVariable {
  name?: string;
  resolvedValue?: string;
}
export type ResolvedPipelineVariableList = ResolvedPipelineVariable[];
export type TriggerType =
  | "CreatePipeline"
  | "StartPipelineExecution"
  | "PollForSourceChanges"
  | "Webhook"
  | "CloudWatchEvent"
  | "PutActionRevision"
  | "WebhookV2"
  | "ManualRollback"
  | "AutomatedRollback"
  | (string & {});
export type TriggerDetail = string;
export interface ExecutionTrigger {
  triggerType?: TriggerType;
  triggerDetail?: string;
}
export type ExecutionType = "STANDARD" | "ROLLBACK" | (string & {});
export interface PipelineRollbackMetadata {
  rollbackTargetPipelineExecutionId?: string;
}
export interface PipelineExecution {
  pipelineName?: string;
  pipelineVersion?: number;
  pipelineExecutionId?: string;
  status?: PipelineExecutionStatus;
  statusSummary?: string;
  artifactRevisions?: ArtifactRevision[];
  variables?: ResolvedPipelineVariable[];
  trigger?: ExecutionTrigger;
  executionMode?: ExecutionMode;
  executionType?: ExecutionType;
  rollbackMetadata?: PipelineRollbackMetadata;
}
export interface GetPipelineExecutionOutput {
  pipelineExecution?: PipelineExecution;
}
export interface GetPipelineStateInput {
  name: string;
}
export type StageExecutionStatus =
  | "Cancelled"
  | "InProgress"
  | "Failed"
  | "Stopped"
  | "Stopping"
  | "Succeeded"
  | "Skipped"
  | (string & {});
export interface StageExecution {
  pipelineExecutionId: string;
  status: StageExecutionStatus;
  type?: ExecutionType;
}
export type StageExecutionList = StageExecution[];
export type Enabled = boolean;
export type LastChangedBy = string;
export type LastChangedAt = Date;
export interface TransitionState {
  enabled?: boolean;
  lastChangedBy?: string;
  lastChangedAt?: Date;
  disabledReason?: string;
}
export interface ActionRevision {
  revisionId: string;
  revisionChangeId?: string;
  created?: Date;
}
export type ActionExecutionStatus =
  | "InProgress"
  | "Abandoned"
  | "Succeeded"
  | "Failed"
  | (string & {});
export type ExecutionSummary = string;
export type ActionExecutionToken = string;
export type LastUpdatedBy = string;
export type ExecutionId = string;
export type Percentage = number;
export type Code = string;
export type Message = string;
export interface ErrorDetails {
  code?: string;
  message?: string;
}
export type LogStreamARN = string;
export interface ActionExecution {
  actionExecutionId?: string;
  status?: ActionExecutionStatus;
  summary?: string;
  lastStatusChange?: Date;
  token?: string;
  lastUpdatedBy?: string;
  externalExecutionId?: string;
  externalExecutionUrl?: string;
  percentComplete?: number;
  errorDetails?: ErrorDetails;
  logStreamARN?: string;
}
export interface ActionState {
  actionName?: string;
  currentRevision?: ActionRevision;
  latestExecution?: ActionExecution;
  entityUrl?: string;
  revisionUrl?: string;
}
export type ActionStateList = ActionState[];
export type ConditionExecutionStatus =
  | "InProgress"
  | "Failed"
  | "Errored"
  | "Succeeded"
  | "Cancelled"
  | "Abandoned"
  | "Overridden"
  | (string & {});
export interface StageConditionsExecution {
  status?: ConditionExecutionStatus;
  summary?: string;
}
export interface ConditionExecution {
  status?: ConditionExecutionStatus;
  summary?: string;
  lastStatusChange?: Date;
}
export interface RuleRevision {
  revisionId: string;
  revisionChangeId?: string;
  created?: Date;
}
export type RuleExecutionId = string;
export type RuleExecutionStatus =
  | "InProgress"
  | "Abandoned"
  | "Succeeded"
  | "Failed"
  | (string & {});
export type RuleExecutionToken = string;
export interface RuleExecution {
  ruleExecutionId?: string;
  status?: RuleExecutionStatus;
  summary?: string;
  lastStatusChange?: Date;
  token?: string;
  lastUpdatedBy?: string;
  externalExecutionId?: string;
  externalExecutionUrl?: string;
  errorDetails?: ErrorDetails;
}
export interface RuleState {
  ruleName?: string;
  currentRevision?: RuleRevision;
  latestExecution?: RuleExecution;
  entityUrl?: string;
  revisionUrl?: string;
}
export type RuleStateList = RuleState[];
export interface ConditionState {
  latestExecution?: ConditionExecution;
  ruleStates?: RuleState[];
}
export type ConditionStateList = ConditionState[];
export interface StageConditionState {
  latestExecution?: StageConditionsExecution;
  conditionStates?: ConditionState[];
}
export type RetryAttempt = number;
export type RetryTrigger =
  | "AutomatedStageRetry"
  | "ManualStageRetry"
  | (string & {});
export interface RetryStageMetadata {
  autoStageRetryAttempt?: number;
  manualStageRetryAttempt?: number;
  latestRetryTrigger?: RetryTrigger;
}
export interface StageState {
  stageName?: string;
  inboundExecution?: StageExecution;
  inboundExecutions?: StageExecution[];
  inboundTransitionState?: TransitionState;
  actionStates?: ActionState[];
  latestExecution?: StageExecution;
  beforeEntryConditionState?: StageConditionState;
  onSuccessConditionState?: StageConditionState;
  onFailureConditionState?: StageConditionState;
  retryStageMetadata?: RetryStageMetadata;
}
export type StageStateList = StageState[];
export interface GetPipelineStateOutput {
  pipelineName?: string;
  pipelineVersion?: number;
  stageStates?: StageState[];
  created?: Date;
  updated?: Date;
}
export interface GetThirdPartyJobDetailsInput {
  jobId: string;
  clientToken: string;
}
export interface ThirdPartyJobData {
  actionTypeId?: ActionTypeId;
  actionConfiguration?: ActionConfiguration;
  pipelineContext?: PipelineContext;
  inputArtifacts?: Artifact[];
  outputArtifacts?: Artifact[];
  artifactCredentials?: AWSSessionCredentials;
  continuationToken?: string;
  encryptionKey?: EncryptionKey;
}
export interface ThirdPartyJobDetails {
  id?: string;
  data?: ThirdPartyJobData;
  nonce?: string;
}
export interface GetThirdPartyJobDetailsOutput {
  jobDetails?: ThirdPartyJobDetails;
}
export type StartTimeRange = "Latest" | "All" | (string & {});
export interface LatestInPipelineExecutionFilter {
  pipelineExecutionId: string;
  startTimeRange: StartTimeRange;
}
export interface ActionExecutionFilter {
  pipelineExecutionId?: string;
  latestInPipelineExecution?: LatestInPipelineExecutionFilter;
}
export type MaxResults = number;
export type NextToken = string;
export interface ListActionExecutionsInput {
  pipelineName: string;
  filter?: ActionExecutionFilter;
  maxResults?: number;
  nextToken?: string;
}
export type ResolvedActionConfigurationMap = {
  [key: string]: string | undefined;
};
export type S3Bucket = string;
export type S3Key = string;
export interface S3Location {
  bucket?: string;
  key?: string;
}
export interface ArtifactDetail {
  name?: string;
  s3location?: S3Location;
}
export type ArtifactDetailList = ArtifactDetail[];
export interface ActionExecutionInput {
  actionTypeId?: ActionTypeId;
  configuration?: { [key: string]: string | undefined };
  resolvedConfiguration?: { [key: string]: string | undefined };
  roleArn?: string;
  region?: string;
  inputArtifacts?: ArtifactDetail[];
  namespace?: string;
}
export type ExternalExecutionId = string;
export type ExternalExecutionSummary = string;
export interface ActionExecutionResult {
  externalExecutionId?: string;
  externalExecutionSummary?: string;
  externalExecutionUrl?: string;
  errorDetails?: ErrorDetails;
  logStreamARN?: string;
}
export type OutputVariablesKey = string;
export type OutputVariablesValue = string;
export type OutputVariablesMap = { [key: string]: string | undefined };
export interface ActionExecutionOutput {
  outputArtifacts?: ArtifactDetail[];
  executionResult?: ActionExecutionResult;
  outputVariables?: { [key: string]: string | undefined };
}
export interface ActionExecutionDetail {
  pipelineExecutionId?: string;
  actionExecutionId?: string;
  pipelineVersion?: number;
  stageName?: string;
  actionName?: string;
  startTime?: Date;
  lastUpdateTime?: Date;
  updatedBy?: string;
  status?: ActionExecutionStatus;
  input?: ActionExecutionInput;
  output?: ActionExecutionOutput;
}
export type ActionExecutionDetailList = ActionExecutionDetail[];
export interface ListActionExecutionsOutput {
  actionExecutionDetails?: ActionExecutionDetail[];
  nextToken?: string;
}
export interface ListActionTypesInput {
  actionOwnerFilter?: ActionOwner;
  nextToken?: string;
  regionFilter?: string;
}
export type ActionTypeList = ActionType[];
export interface ListActionTypesOutput {
  actionTypes: ActionType[];
  nextToken?: string;
}
export type TargetFilterName = "TARGET_STATUS" | (string & {});
export type TargetFilterValue = string;
export type TargetFilterValueList = string[];
export interface TargetFilter {
  name?: TargetFilterName;
  values?: string[];
}
export type TargetFilterList = TargetFilter[];
export interface ListDeployActionExecutionTargetsInput {
  pipelineName?: string;
  actionExecutionId: string;
  filters?: TargetFilter[];
  maxResults?: number;
  nextToken?: string;
}
export interface DeployTargetEventContext {
  ssmCommandId?: string;
  message?: string;
}
export interface DeployTargetEvent {
  name?: string;
  status?: string;
  startTime?: Date;
  endTime?: Date;
  context?: DeployTargetEventContext;
}
export type DeployTargetEventList = DeployTargetEvent[];
export interface DeployActionExecutionTarget {
  targetId?: string;
  targetType?: string;
  status?: string;
  startTime?: Date;
  endTime?: Date;
  events?: DeployTargetEvent[];
}
export type DeployActionExecutionTargetList = DeployActionExecutionTarget[];
export interface ListDeployActionExecutionTargetsOutput {
  targets?: DeployActionExecutionTarget[];
  nextToken?: string;
}
export interface SucceededInStageFilter {
  stageName?: string;
}
export interface PipelineExecutionFilter {
  succeededInStage?: SucceededInStageFilter;
}
export interface ListPipelineExecutionsInput {
  pipelineName: string;
  maxResults?: number;
  filter?: PipelineExecutionFilter;
  nextToken?: string;
}
export interface SourceRevision {
  actionName: string;
  revisionId?: string;
  revisionSummary?: string;
  revisionUrl?: string;
}
export type SourceRevisionList = SourceRevision[];
export type StopPipelineExecutionReason = string;
export interface StopExecutionTrigger {
  reason?: string;
}
export interface PipelineExecutionSummary {
  pipelineExecutionId?: string;
  status?: PipelineExecutionStatus;
  statusSummary?: string;
  startTime?: Date;
  lastUpdateTime?: Date;
  sourceRevisions?: SourceRevision[];
  trigger?: ExecutionTrigger;
  stopTrigger?: StopExecutionTrigger;
  executionMode?: ExecutionMode;
  executionType?: ExecutionType;
  rollbackMetadata?: PipelineRollbackMetadata;
}
export type PipelineExecutionSummaryList = PipelineExecutionSummary[];
export interface ListPipelineExecutionsOutput {
  pipelineExecutionSummaries?: PipelineExecutionSummary[];
  nextToken?: string;
}
export type MaxPipelines = number;
export interface ListPipelinesInput {
  nextToken?: string;
  maxResults?: number;
}
export interface PipelineSummary {
  name?: string;
  version?: number;
  pipelineType?: PipelineType;
  executionMode?: ExecutionMode;
  created?: Date;
  updated?: Date;
}
export type PipelineList = PipelineSummary[];
export interface ListPipelinesOutput {
  pipelines?: PipelineSummary[];
  nextToken?: string;
}
export interface RuleExecutionFilter {
  pipelineExecutionId?: string;
  latestInPipelineExecution?: LatestInPipelineExecutionFilter;
}
export interface ListRuleExecutionsInput {
  pipelineName: string;
  filter?: RuleExecutionFilter;
  maxResults?: number;
  nextToken?: string;
}
export type ResolvedRuleConfigurationMap = {
  [key: string]: string | undefined;
};
export interface RuleExecutionInput {
  ruleTypeId?: RuleTypeId;
  configuration?: { [key: string]: string | undefined };
  resolvedConfiguration?: { [key: string]: string | undefined };
  roleArn?: string;
  region?: string;
  inputArtifacts?: ArtifactDetail[];
}
export interface RuleExecutionResult {
  externalExecutionId?: string;
  externalExecutionSummary?: string;
  externalExecutionUrl?: string;
  errorDetails?: ErrorDetails;
}
export interface RuleExecutionOutput {
  executionResult?: RuleExecutionResult;
}
export interface RuleExecutionDetail {
  pipelineExecutionId?: string;
  ruleExecutionId?: string;
  pipelineVersion?: number;
  stageName?: string;
  ruleName?: string;
  startTime?: Date;
  lastUpdateTime?: Date;
  updatedBy?: string;
  status?: RuleExecutionStatus;
  input?: RuleExecutionInput;
  output?: RuleExecutionOutput;
}
export type RuleExecutionDetailList = RuleExecutionDetail[];
export interface ListRuleExecutionsOutput {
  ruleExecutionDetails?: RuleExecutionDetail[];
  nextToken?: string;
}
export interface ListRuleTypesInput {
  ruleOwnerFilter?: RuleOwner;
  regionFilter?: string;
}
export interface RuleTypeSettings {
  thirdPartyConfigurationUrl?: string;
  entityUrlTemplate?: string;
  executionUrlTemplate?: string;
  revisionUrlTemplate?: string;
}
export type RuleConfigurationPropertyType =
  | "String"
  | "Number"
  | "Boolean"
  | (string & {});
export interface RuleConfigurationProperty {
  name: string;
  required: boolean;
  key: boolean;
  secret: boolean;
  queryable?: boolean;
  description?: string;
  type?: RuleConfigurationPropertyType;
}
export type RuleConfigurationPropertyList = RuleConfigurationProperty[];
export interface RuleType {
  id: RuleTypeId;
  settings?: RuleTypeSettings;
  ruleConfigurationProperties?: RuleConfigurationProperty[];
  inputArtifactDetails: ArtifactDetails;
}
export type RuleTypeList = RuleType[];
export interface ListRuleTypesOutput {
  ruleTypes: RuleType[];
}
export type ResourceArn = string;
export interface ListTagsForResourceInput {
  resourceArn: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListTagsForResourceOutput {
  tags?: Tag[];
  nextToken?: string;
}
export interface ListWebhooksInput {
  NextToken?: string;
  MaxResults?: number;
}
export type JsonPath = string;
export type MatchEquals = string;
export interface WebhookFilterRule {
  jsonPath: string;
  matchEquals?: string;
}
export type WebhookFilters = WebhookFilterRule[];
export type WebhookAuthenticationType =
  | "GITHUB_HMAC"
  | "IP"
  | "UNAUTHENTICATED"
  | (string & {});
export type WebhookAuthConfigurationAllowedIPRange = string;
export type WebhookAuthConfigurationSecretToken = string;
export interface WebhookAuthConfiguration {
  AllowedIPRange?: string;
  SecretToken?: string | redacted.Redacted<string>;
}
export interface WebhookDefinition {
  name: string;
  targetPipeline: string;
  targetAction: string;
  filters: WebhookFilterRule[];
  authentication: WebhookAuthenticationType;
  authenticationConfiguration: WebhookAuthConfiguration;
}
export type WebhookUrl = string;
export type WebhookErrorMessage = string;
export type WebhookErrorCode = string;
export type WebhookLastTriggered = Date;
export type WebhookArn = string;
export interface ListWebhookItem {
  definition: WebhookDefinition;
  url: string;
  errorMessage?: string;
  errorCode?: string;
  lastTriggered?: Date;
  arn?: string;
  tags?: Tag[];
}
export type WebhookList = ListWebhookItem[];
export interface ListWebhooksOutput {
  webhooks?: ListWebhookItem[];
  NextToken?: string;
}
export type ConditionType = "BEFORE_ENTRY" | "ON_SUCCESS" | (string & {});
export interface OverrideStageConditionInput {
  pipelineName: string;
  stageName: string;
  pipelineExecutionId: string;
  conditionType: ConditionType;
}
export interface OverrideStageConditionResponse {}
export type MaxBatchSize = number;
export type ActionConfigurationQueryableValue = string;
export type QueryParamMap = { [key: string]: string | undefined };
export interface PollForJobsInput {
  actionTypeId: ActionTypeId;
  maxBatchSize?: number;
  queryParam?: { [key: string]: string | undefined };
}
export interface Job {
  id?: string;
  data?: JobData;
  nonce?: string;
  accountId?: string;
}
export type JobList = Job[];
export interface PollForJobsOutput {
  jobs?: Job[];
}
export interface PollForThirdPartyJobsInput {
  actionTypeId: ActionTypeId;
  maxBatchSize?: number;
}
export type ClientId = string;
export interface ThirdPartyJob {
  clientId?: string;
  jobId?: string;
}
export type ThirdPartyJobList = ThirdPartyJob[];
export interface PollForThirdPartyJobsOutput {
  jobs?: ThirdPartyJob[];
}
export interface PutActionRevisionInput {
  pipelineName: string;
  stageName: string;
  actionName: string;
  actionRevision: ActionRevision;
}
export interface PutActionRevisionOutput {
  newRevision?: boolean;
  pipelineExecutionId?: string;
}
export type ApprovalSummary = string;
export type ApprovalStatus = "Approved" | "Rejected" | (string & {});
export interface ApprovalResult {
  summary: string;
  status: ApprovalStatus;
}
export type ApprovalToken = string;
export interface PutApprovalResultInput {
  pipelineName: string;
  stageName: string;
  actionName: string;
  result: ApprovalResult;
  token: string;
}
export interface PutApprovalResultOutput {
  approvedAt?: Date;
}
export type FailureType =
  | "JobFailed"
  | "ConfigurationError"
  | "PermissionError"
  | "RevisionOutOfSync"
  | "RevisionUnavailable"
  | "SystemUnavailable"
  | (string & {});
export interface FailureDetails {
  type: FailureType;
  message: string;
  externalExecutionId?: string;
}
export interface PutJobFailureResultInput {
  jobId: string;
  failureDetails: FailureDetails;
}
export interface PutJobFailureResultResponse {}
export interface CurrentRevision {
  revision: string;
  changeIdentifier: string;
  created?: Date;
  revisionSummary?: string;
}
export interface ExecutionDetails {
  summary?: string;
  externalExecutionId?: string;
  percentComplete?: number;
}
export interface PutJobSuccessResultInput {
  jobId: string;
  currentRevision?: CurrentRevision;
  continuationToken?: string;
  executionDetails?: ExecutionDetails;
  outputVariables?: { [key: string]: string | undefined };
}
export interface PutJobSuccessResultResponse {}
export interface PutThirdPartyJobFailureResultInput {
  jobId: string;
  clientToken: string;
  failureDetails: FailureDetails;
}
export interface PutThirdPartyJobFailureResultResponse {}
export interface PutThirdPartyJobSuccessResultInput {
  jobId: string;
  clientToken: string;
  currentRevision?: CurrentRevision;
  continuationToken?: string;
  executionDetails?: ExecutionDetails;
}
export interface PutThirdPartyJobSuccessResultResponse {}
export interface PutWebhookInput {
  webhook: WebhookDefinition;
  tags?: Tag[];
}
export interface PutWebhookOutput {
  webhook?: ListWebhookItem;
}
export interface RegisterWebhookWithThirdPartyInput {
  webhookName?: string;
}
export interface RegisterWebhookWithThirdPartyOutput {}
export interface RetryStageExecutionInput {
  pipelineName: string;
  stageName: string;
  pipelineExecutionId: string;
  retryMode: StageRetryMode;
}
export interface RetryStageExecutionOutput {
  pipelineExecutionId?: string;
}
export interface RollbackStageInput {
  pipelineName: string;
  stageName: string;
  targetPipelineExecutionId: string;
}
export interface RollbackStageOutput {
  pipelineExecutionId: string;
}
export interface PipelineVariable {
  name: string;
  value: string;
}
export type PipelineVariableList = PipelineVariable[];
export type ClientRequestToken = string;
export type SourceRevisionType =
  | "COMMIT_ID"
  | "IMAGE_DIGEST"
  | "S3_OBJECT_VERSION_ID"
  | "S3_OBJECT_KEY"
  | (string & {});
export interface SourceRevisionOverride {
  actionName: string;
  revisionType: SourceRevisionType;
  revisionValue: string;
}
export type SourceRevisionOverrideList = SourceRevisionOverride[];
export interface StartPipelineExecutionInput {
  name: string;
  variables?: PipelineVariable[];
  clientRequestToken?: string;
  sourceRevisions?: SourceRevisionOverride[];
}
export interface StartPipelineExecutionOutput {
  pipelineExecutionId?: string;
}
export interface StopPipelineExecutionInput {
  pipelineName: string;
  pipelineExecutionId: string;
  abandon?: boolean;
  reason?: string;
}
export interface StopPipelineExecutionOutput {
  pipelineExecutionId?: string;
}
export interface TagResourceInput {
  resourceArn: string;
  tags: Tag[];
}
export interface TagResourceOutput {}
export type TagKeyList = string[];
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceOutput {}
export interface UpdateActionTypeInput {
  actionType: ActionTypeDeclaration;
}
export interface UpdateActionTypeResponse {}
export interface UpdatePipelineInput {
  pipeline: PipelineDeclaration;
}
export interface UpdatePipelineOutput {
  pipeline?: PipelineDeclaration;
}
export type AcknowledgeJobError =
  | InvalidNonceException
  | JobNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specified job and whether that job has been received by
 * the job worker. Used for custom actions only.
 */
export const acknowledgeJob: API.OperationMethod<
  AcknowledgeJobInput,
  AcknowledgeJobOutput,
  AcknowledgeJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { jobId: 0, nonce: 0 } },
  errors: [InvalidNonceException, JobNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcknowledgeJob",
})) as any;

export type AcknowledgeThirdPartyJobError =
  | InvalidClientTokenException
  | InvalidNonceException
  | JobNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Confirms a job worker has received the specified job. Used for partner actions
 * only.
 */
export const acknowledgeThirdPartyJob: API.OperationMethod<
  AcknowledgeThirdPartyJobInput,
  AcknowledgeThirdPartyJobOutput,
  AcknowledgeThirdPartyJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { jobId: 0, nonce: 0, clientToken: 0 } },
  errors: [
    InvalidClientTokenException,
    InvalidNonceException,
    JobNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcknowledgeThirdPartyJob",
})) as any;

export type CreateCustomActionTypeError =
  | ConcurrentModificationException
  | InvalidTagsException
  | LimitExceededException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new custom action that can be used in all pipelines associated with the
 * Amazon Web Services account. Only used for custom actions.
 */
export const createCustomActionType: API.OperationMethod<
  CreateCustomActionTypeInput,
  CreateCustomActionTypeOutput,
  CreateCustomActionTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      category: 0,
      provider: 0,
      version: 0,
      settings: {
        thirdPartyConfigurationUrl: 0,
        entityUrlTemplate: 0,
        executionUrlTemplate: 0,
        revisionUrlTemplate: 0,
      },
      configurationProperties: D.list({
        name: 0,
        required: 0,
        key: 0,
        secret: 0,
        queryable: 0,
        description: 0,
        type: 0,
      }),
      inputArtifactDetails: i_ArtifactDetails,
      outputArtifactDetails: i_ArtifactDetails,
      tags: D.list(i_Tag),
    },
  },
  errors: [
    ConcurrentModificationException,
    InvalidTagsException,
    LimitExceededException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomActionType",
})) as any;

export type CreatePipelineError =
  | ConcurrentModificationException
  | InvalidActionDeclarationException
  | InvalidBlockerDeclarationException
  | InvalidStageDeclarationException
  | InvalidStructureException
  | InvalidTagsException
  | LimitExceededException
  | PipelineNameInUseException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a pipeline.
 *
 * In the pipeline structure, you must include either `artifactStore`
 * or `artifactStores` in your pipeline, but you cannot use both. If you
 * create a cross-region action in your pipeline, you must use
 * `artifactStores`.
 */
export const createPipeline: API.OperationMethod<
  CreatePipelineInput,
  CreatePipelineOutput,
  CreatePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { pipeline: i_PipelineDeclaration, tags: D.list(i_Tag) },
  },
  errors: [
    ConcurrentModificationException,
    InvalidActionDeclarationException,
    InvalidBlockerDeclarationException,
    InvalidStageDeclarationException,
    InvalidStructureException,
    InvalidTagsException,
    LimitExceededException,
    PipelineNameInUseException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePipeline",
})) as any;

export type DeleteCustomActionTypeError =
  | ConcurrentModificationException
  | ValidationException
  | CommonErrors;
/**
 * Marks a custom action as deleted. `PollForJobs` for the custom action
 * fails after the action is marked for deletion. Used for custom actions only.
 *
 * To re-create a custom action after it has been deleted you must use a string in
 * the version field that has never been used before. This string can be an incremented
 * version number, for example. To restore a deleted custom action, use a JSON file
 * that is identical to the deleted action, including the original string in the
 * version field.
 */
export const deleteCustomActionType: API.OperationMethod<
  DeleteCustomActionTypeInput,
  DeleteCustomActionTypeResponse,
  DeleteCustomActionTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { category: 0, provider: 0, version: 0 } },
  errors: [ConcurrentModificationException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomActionType",
})) as any;

export type DeletePipelineError =
  | ConcurrentModificationException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified pipeline.
 */
export const deletePipeline: API.OperationMethod<
  DeletePipelineInput,
  DeletePipelineResponse,
  DeletePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { name: 0 } },
  errors: [ConcurrentModificationException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePipeline",
})) as any;

export type DeleteWebhookError =
  | ConcurrentModificationException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a previously created webhook by name. Deleting the webhook stops CodePipeline from starting a pipeline every time an external event occurs. The API
 * returns successfully when trying to delete a webhook that is already deleted. If a
 * deleted webhook is re-created by calling PutWebhook with the same name, it will have a
 * different URL.
 */
export const deleteWebhook: API.OperationMethod<
  DeleteWebhookInput,
  DeleteWebhookOutput,
  DeleteWebhookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { name: 0 } },
  errors: [ConcurrentModificationException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWebhook",
})) as any;

export type DeregisterWebhookWithThirdPartyError =
  | ValidationException
  | WebhookNotFoundException
  | CommonErrors;
/**
 * Removes the connection between the webhook that was created by CodePipeline
 * and the external tool with events to be detected. Currently supported only for webhooks
 * that target an action type of GitHub.
 */
export const deregisterWebhookWithThirdParty: API.OperationMethod<
  DeregisterWebhookWithThirdPartyInput,
  DeregisterWebhookWithThirdPartyOutput,
  DeregisterWebhookWithThirdPartyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { webhookName: 0 } },
  errors: [ValidationException, WebhookNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterWebhookWithThirdParty",
})) as any;

export type DisableStageTransitionError =
  | PipelineNotFoundException
  | StageNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Prevents artifacts in a pipeline from transitioning to the next stage in the
 * pipeline.
 */
export const disableStageTransition: API.OperationMethod<
  DisableStageTransitionInput,
  DisableStageTransitionResponse,
  DisableStageTransitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { pipelineName: 0, stageName: 0, transitionType: 0, reason: 0 },
  },
  errors: [
    PipelineNotFoundException,
    StageNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableStageTransition",
})) as any;

export type EnableStageTransitionError =
  | PipelineNotFoundException
  | StageNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Enables artifacts in a pipeline to transition to a stage in a pipeline.
 */
export const enableStageTransition: API.OperationMethod<
  EnableStageTransitionInput,
  EnableStageTransitionResponse,
  EnableStageTransitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { pipelineName: 0, stageName: 0, transitionType: 0 },
  },
  errors: [
    PipelineNotFoundException,
    StageNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableStageTransition",
})) as any;

export type GetActionTypeError =
  | ActionTypeNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about an action type created for an external provider, where the
 * action is to be used by customers of the external provider. The action can be created
 * with any supported integration model.
 */
export const getActionType: API.OperationMethod<
  GetActionTypeInput,
  GetActionTypeOutput,
  GetActionTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { category: 0, owner: 0, provider: 0, version: 0 },
  },
  errors: [ActionTypeNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetActionType",
})) as any;

export type GetJobDetailsError =
  | JobNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a job. Used for custom actions only.
 *
 * When this API is called, CodePipeline returns temporary credentials for
 * the S3 bucket used to store artifacts for the pipeline, if the action requires
 * access to that S3 bucket for input or output artifacts. This API also returns any
 * secret values defined for the action.
 */
export const getJobDetails: API.OperationMethod<
  GetJobDetailsInput,
  GetJobDetailsOutput,
  GetJobDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { jobId: 0 },
    output: { jobDetails: { data: o_JobData } },
  },
  errors: [JobNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobDetails",
})) as any;

export type GetPipelineError =
  | PipelineNotFoundException
  | PipelineVersionNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the metadata, structure, stages, and actions of a pipeline. Can be used to
 * return the entire structure of a pipeline in JSON format, which can then be modified and
 * used to update the pipeline structure with UpdatePipeline.
 */
export const getPipeline: API.OperationMethod<
  GetPipelineInput,
  GetPipelineOutput,
  GetPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { name: 0, version: 0 },
    output: {
      metadata: { created: D.ts, updated: D.ts, pollingDisabledAt: D.ts },
    },
  },
  errors: [
    PipelineNotFoundException,
    PipelineVersionNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPipeline",
})) as any;

export type GetPipelineExecutionError =
  | PipelineExecutionNotFoundException
  | PipelineNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about an execution of a pipeline, including details about
 * artifacts, the pipeline execution ID, and the name, version, and status of the
 * pipeline.
 */
export const getPipelineExecution: API.OperationMethod<
  GetPipelineExecutionInput,
  GetPipelineExecutionOutput,
  GetPipelineExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { pipelineName: 0, pipelineExecutionId: 0 },
    output: {
      pipelineExecution: { artifactRevisions: D.list({ created: D.ts }) },
    },
  },
  errors: [
    PipelineExecutionNotFoundException,
    PipelineNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPipelineExecution",
})) as any;

export type GetPipelineStateError =
  | PipelineNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the state of a pipeline, including the stages and
 * actions.
 *
 * Values returned in the `revisionId` and `revisionUrl`
 * fields indicate the source revision information, such as the commit ID, for the
 * current state.
 */
export const getPipelineState: API.OperationMethod<
  GetPipelineStateInput,
  GetPipelineStateOutput,
  GetPipelineStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { name: 0 },
    output: {
      stageStates: D.list({
        inboundTransitionState: { lastChangedAt: D.ts },
        actionStates: D.list({
          currentRevision: { created: D.ts },
          latestExecution: { lastStatusChange: D.ts },
        }),
        beforeEntryConditionState: o_StageConditionState,
        onSuccessConditionState: o_StageConditionState,
        onFailureConditionState: o_StageConditionState,
      }),
      created: D.ts,
      updated: D.ts,
    },
  },
  errors: [PipelineNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPipelineState",
})) as any;

export type GetThirdPartyJobDetailsError =
  | InvalidClientTokenException
  | InvalidJobException
  | JobNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Requests the details of a job for a third party action. Used for partner actions
 * only.
 *
 * When this API is called, CodePipeline returns temporary credentials for
 * the S3 bucket used to store artifacts for the pipeline, if the action requires
 * access to that S3 bucket for input or output artifacts. This API also returns any
 * secret values defined for the action.
 */
export const getThirdPartyJobDetails: API.OperationMethod<
  GetThirdPartyJobDetailsInput,
  GetThirdPartyJobDetailsOutput,
  GetThirdPartyJobDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { jobId: 0, clientToken: 0 },
    output: {
      jobDetails: { data: { artifactCredentials: o_AWSSessionCredentials } },
    },
  },
  errors: [
    InvalidClientTokenException,
    InvalidJobException,
    JobNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetThirdPartyJobDetails",
})) as any;

export type ListActionExecutionsError =
  | InvalidNextTokenException
  | PipelineExecutionNotFoundException
  | PipelineNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the action executions that have occurred in a pipeline.
 */
export const listActionExecutions: API.PaginatedOperationMethod<
  ListActionExecutionsInput,
  ListActionExecutionsOutput,
  ListActionExecutionsError,
  Credentials | HttpClient.HttpClient,
  ActionExecutionDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      pipelineName: 0,
      filter: {
        pipelineExecutionId: 0,
        latestInPipelineExecution: i_LatestInPipelineExecutionFilter,
      },
      maxResults: 0,
      nextToken: 0,
    },
    output: {
      actionExecutionDetails: D.list({ startTime: D.ts, lastUpdateTime: D.ts }),
    },
  },
  errors: [
    InvalidNextTokenException,
    PipelineExecutionNotFoundException,
    PipelineNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListActionExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "actionExecutionDetails",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListActionTypesError =
  | InvalidNextTokenException
  | ValidationException
  | CommonErrors;
/**
 * Gets a summary of all CodePipeline action types associated with your
 * account.
 */
export const listActionTypes: API.PaginatedOperationMethod<
  ListActionTypesInput,
  ListActionTypesOutput,
  ListActionTypesError,
  Credentials | HttpClient.HttpClient,
  ActionType
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { actionOwnerFilter: 0, nextToken: 0, regionFilter: 0 },
  },
  errors: [InvalidNextTokenException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListActionTypes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "actionTypes",
  } as const,
})) as any;

export type ListDeployActionExecutionTargetsError =
  | ActionExecutionNotFoundException
  | InvalidNextTokenException
  | PipelineNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the targets for the deploy action.
 */
export const listDeployActionExecutionTargets: API.PaginatedOperationMethod<
  ListDeployActionExecutionTargetsInput,
  ListDeployActionExecutionTargetsOutput,
  ListDeployActionExecutionTargetsError,
  Credentials | HttpClient.HttpClient,
  DeployActionExecutionTarget
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      pipelineName: 0,
      actionExecutionId: 0,
      filters: D.list({ name: 0, values: 0 }),
      maxResults: 0,
      nextToken: 0,
    },
    output: {
      targets: D.list({
        startTime: D.ts,
        endTime: D.ts,
        events: D.list({ startTime: D.ts, endTime: D.ts }),
      }),
    },
  },
  errors: [
    ActionExecutionNotFoundException,
    InvalidNextTokenException,
    PipelineNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeployActionExecutionTargets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "targets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPipelineExecutionsError =
  | InvalidNextTokenException
  | PipelineNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets a summary of the most recent executions for a pipeline.
 *
 * When applying the filter for pipeline executions that have succeeded in the stage,
 * the operation returns all executions in the current pipeline version beginning on
 * February 1, 2024.
 */
export const listPipelineExecutions: API.PaginatedOperationMethod<
  ListPipelineExecutionsInput,
  ListPipelineExecutionsOutput,
  ListPipelineExecutionsError,
  Credentials | HttpClient.HttpClient,
  PipelineExecutionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      pipelineName: 0,
      maxResults: 0,
      filter: { succeededInStage: { stageName: 0 } },
      nextToken: 0,
    },
    output: {
      pipelineExecutionSummaries: D.list({
        startTime: D.ts,
        lastUpdateTime: D.ts,
      }),
    },
  },
  errors: [
    InvalidNextTokenException,
    PipelineNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPipelineExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "pipelineExecutionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPipelinesError =
  | InvalidNextTokenException
  | ValidationException
  | CommonErrors;
/**
 * Gets a summary of all of the pipelines associated with your account.
 */
export const listPipelines: API.PaginatedOperationMethod<
  ListPipelinesInput,
  ListPipelinesOutput,
  ListPipelinesError,
  Credentials | HttpClient.HttpClient,
  PipelineSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0 },
    output: { pipelines: D.list({ created: D.ts, updated: D.ts }) },
  },
  errors: [InvalidNextTokenException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPipelines",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "pipelines",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRuleExecutionsError =
  | InvalidNextTokenException
  | PipelineExecutionNotFoundException
  | PipelineNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the rule executions that have occurred in a pipeline configured for conditions
 * with rules.
 */
export const listRuleExecutions: API.PaginatedOperationMethod<
  ListRuleExecutionsInput,
  ListRuleExecutionsOutput,
  ListRuleExecutionsError,
  Credentials | HttpClient.HttpClient,
  RuleExecutionDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      pipelineName: 0,
      filter: {
        pipelineExecutionId: 0,
        latestInPipelineExecution: i_LatestInPipelineExecutionFilter,
      },
      maxResults: 0,
      nextToken: 0,
    },
    output: {
      ruleExecutionDetails: D.list({ startTime: D.ts, lastUpdateTime: D.ts }),
    },
  },
  errors: [
    InvalidNextTokenException,
    PipelineExecutionNotFoundException,
    PipelineNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRuleExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "ruleExecutionDetails",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRuleTypesError =
  | InvalidNextTokenException
  | ValidationException
  | CommonErrors;
/**
 * Lists the rules for the condition. For more information about conditions, see Stage
 * conditions and How do
 * stage conditions work?.For more information about rules, see the CodePipeline rule reference.
 */
export const listRuleTypes: API.OperationMethod<
  ListRuleTypesInput,
  ListRuleTypesOutput,
  ListRuleTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ruleOwnerFilter: 0, regionFilter: 0 } },
  errors: [InvalidNextTokenException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRuleTypes",
})) as any;

export type ListTagsForResourceError =
  | InvalidArnException
  | InvalidNextTokenException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets the set of key-value pairs (metadata) that are used to manage the
 * resource.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { resourceArn: 0, nextToken: 0, maxResults: 0 },
  },
  errors: [
    InvalidArnException,
    InvalidNextTokenException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tags",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWebhooksError =
  | InvalidNextTokenException
  | ValidationException
  | CommonErrors;
/**
 * Gets a listing of all the webhooks in this Amazon Web Services Region for this
 * account. The output lists all webhooks and includes the webhook URL and ARN and the
 * configuration for each webhook.
 *
 * If a secret token was provided, it will be redacted in the response.
 */
export const listWebhooks: API.PaginatedOperationMethod<
  ListWebhooksInput,
  ListWebhooksOutput,
  ListWebhooksError,
  Credentials | HttpClient.HttpClient,
  ListWebhookItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: { webhooks: D.list(o_ListWebhookItem) },
  },
  errors: [InvalidNextTokenException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWebhooks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "webhooks",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type OverrideStageConditionError =
  | ConcurrentPipelineExecutionsLimitExceededException
  | ConditionNotOverridableException
  | ConflictException
  | NotLatestPipelineExecutionException
  | PipelineNotFoundException
  | StageNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Used to override a stage condition. For more information about conditions, see Stage
 * conditions and How do
 * stage conditions work?.
 */
export const overrideStageCondition: API.OperationMethod<
  OverrideStageConditionInput,
  OverrideStageConditionResponse,
  OverrideStageConditionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      pipelineName: 0,
      stageName: 0,
      pipelineExecutionId: 0,
      conditionType: 0,
    },
  },
  errors: [
    ConcurrentPipelineExecutionsLimitExceededException,
    ConditionNotOverridableException,
    ConflictException,
    NotLatestPipelineExecutionException,
    PipelineNotFoundException,
    StageNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "OverrideStageCondition",
})) as any;

export type PollForJobsError =
  | ActionTypeNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about any jobs for CodePipeline to act on.
 * `PollForJobs` is valid only for action types with "Custom" in the owner
 * field. If the action type contains `AWS` or `ThirdParty` in the
 * owner field, the `PollForJobs` action returns an error.
 *
 * When this API is called, CodePipeline returns temporary credentials for
 * the S3 bucket used to store artifacts for the pipeline, if the action requires
 * access to that S3 bucket for input or output artifacts. This API also returns any
 * secret values defined for the action.
 */
export const pollForJobs: API.OperationMethod<
  PollForJobsInput,
  PollForJobsOutput,
  PollForJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { actionTypeId: i_ActionTypeId, maxBatchSize: 0, queryParam: 0 },
    output: { jobs: D.list({ data: o_JobData }) },
  },
  errors: [ActionTypeNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PollForJobs",
})) as any;

export type PollForThirdPartyJobsError =
  | ActionTypeNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Determines whether there are any third party jobs for a job worker to act on. Used
 * for partner actions only.
 *
 * When this API is called, CodePipeline returns temporary credentials for
 * the S3 bucket used to store artifacts for the pipeline, if the action requires
 * access to that S3 bucket for input or output artifacts.
 */
export const pollForThirdPartyJobs: API.OperationMethod<
  PollForThirdPartyJobsInput,
  PollForThirdPartyJobsOutput,
  PollForThirdPartyJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { actionTypeId: i_ActionTypeId, maxBatchSize: 0 },
  },
  errors: [ActionTypeNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PollForThirdPartyJobs",
})) as any;

export type PutActionRevisionError =
  | ActionNotFoundException
  | ConcurrentPipelineExecutionsLimitExceededException
  | PipelineNotFoundException
  | StageNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Provides information to CodePipeline about new revisions to a
 * source.
 */
export const putActionRevision: API.OperationMethod<
  PutActionRevisionInput,
  PutActionRevisionOutput,
  PutActionRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      pipelineName: 0,
      stageName: 0,
      actionName: 0,
      actionRevision: { revisionId: 0, revisionChangeId: 0, created: 0 },
    },
  },
  errors: [
    ActionNotFoundException,
    ConcurrentPipelineExecutionsLimitExceededException,
    PipelineNotFoundException,
    StageNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutActionRevision",
})) as any;

export type PutApprovalResultError =
  | ActionNotFoundException
  | ApprovalAlreadyCompletedException
  | InvalidApprovalTokenException
  | PipelineNotFoundException
  | StageNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Provides the response to a manual approval request to CodePipeline. Valid
 * responses include Approved and Rejected.
 */
export const putApprovalResult: API.OperationMethod<
  PutApprovalResultInput,
  PutApprovalResultOutput,
  PutApprovalResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      pipelineName: 0,
      stageName: 0,
      actionName: 0,
      result: { summary: 0, status: 0 },
      token: 0,
    },
    output: { approvedAt: D.ts },
  },
  errors: [
    ActionNotFoundException,
    ApprovalAlreadyCompletedException,
    InvalidApprovalTokenException,
    PipelineNotFoundException,
    StageNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutApprovalResult",
})) as any;

export type PutJobFailureResultError =
  | InvalidJobStateException
  | JobNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Represents the failure of a job as returned to the pipeline by a job worker. Used
 * for custom actions only.
 */
export const putJobFailureResult: API.OperationMethod<
  PutJobFailureResultInput,
  PutJobFailureResultResponse,
  PutJobFailureResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { jobId: 0, failureDetails: i_FailureDetails },
  },
  errors: [InvalidJobStateException, JobNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutJobFailureResult",
})) as any;

export type PutJobSuccessResultError =
  | InvalidJobStateException
  | JobNotFoundException
  | OutputVariablesSizeExceededException
  | ValidationException
  | CommonErrors;
/**
 * Represents the success of a job as returned to the pipeline by a job worker. Used
 * for custom actions only.
 */
export const putJobSuccessResult: API.OperationMethod<
  PutJobSuccessResultInput,
  PutJobSuccessResultResponse,
  PutJobSuccessResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      jobId: 0,
      currentRevision: i_CurrentRevision,
      continuationToken: 0,
      executionDetails: i_ExecutionDetails,
      outputVariables: 0,
    },
  },
  errors: [
    InvalidJobStateException,
    JobNotFoundException,
    OutputVariablesSizeExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutJobSuccessResult",
})) as any;

export type PutThirdPartyJobFailureResultError =
  | InvalidClientTokenException
  | InvalidJobStateException
  | JobNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Represents the failure of a third party job as returned to the pipeline by a job
 * worker. Used for partner actions only.
 */
export const putThirdPartyJobFailureResult: API.OperationMethod<
  PutThirdPartyJobFailureResultInput,
  PutThirdPartyJobFailureResultResponse,
  PutThirdPartyJobFailureResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { jobId: 0, clientToken: 0, failureDetails: i_FailureDetails },
  },
  errors: [
    InvalidClientTokenException,
    InvalidJobStateException,
    JobNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutThirdPartyJobFailureResult",
})) as any;

export type PutThirdPartyJobSuccessResultError =
  | InvalidClientTokenException
  | InvalidJobStateException
  | JobNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Represents the success of a third party job as returned to the pipeline by a job
 * worker. Used for partner actions only.
 */
export const putThirdPartyJobSuccessResult: API.OperationMethod<
  PutThirdPartyJobSuccessResultInput,
  PutThirdPartyJobSuccessResultResponse,
  PutThirdPartyJobSuccessResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      jobId: 0,
      clientToken: 0,
      currentRevision: i_CurrentRevision,
      continuationToken: 0,
      executionDetails: i_ExecutionDetails,
    },
  },
  errors: [
    InvalidClientTokenException,
    InvalidJobStateException,
    JobNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutThirdPartyJobSuccessResult",
})) as any;

export type PutWebhookError =
  | ConcurrentModificationException
  | InvalidTagsException
  | InvalidWebhookAuthenticationParametersException
  | InvalidWebhookFilterPatternException
  | LimitExceededException
  | PipelineNotFoundException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Defines a webhook and returns a unique webhook URL generated by CodePipeline.
 * This URL can be supplied to third party source hosting providers to call every time
 * there's a code change. When CodePipeline receives a POST request on this URL, the
 * pipeline defined in the webhook is started as long as the POST request satisfied the
 * authentication and filtering requirements supplied when defining the webhook.
 * RegisterWebhookWithThirdParty and DeregisterWebhookWithThirdParty APIs can be used to
 * automatically configure supported third parties to call the generated webhook
 * URL.
 *
 * When creating CodePipeline webhooks, do not use your own credentials or
 * reuse the same secret token across multiple webhooks. For optimal security, generate
 * a unique secret token for each webhook you create. The secret token is an arbitrary
 * string that you provide, which GitHub uses to compute and sign the webhook payloads
 * sent to CodePipeline, for protecting the integrity and authenticity of the
 * webhook payloads. Using your own credentials or reusing the same token across
 * multiple webhooks can lead to security vulnerabilities.
 *
 * If a secret token was provided, it will be redacted in the response.
 */
export const putWebhook: API.OperationMethod<
  PutWebhookInput,
  PutWebhookOutput,
  PutWebhookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      webhook: {
        name: 0,
        targetPipeline: 0,
        targetAction: 0,
        filters: D.list({ jsonPath: 0, matchEquals: 0 }),
        authentication: 0,
        authenticationConfiguration: { AllowedIPRange: 0, SecretToken: 0 },
      },
      tags: D.list(i_Tag),
    },
    output: { webhook: o_ListWebhookItem },
  },
  errors: [
    ConcurrentModificationException,
    InvalidTagsException,
    InvalidWebhookAuthenticationParametersException,
    InvalidWebhookFilterPatternException,
    LimitExceededException,
    PipelineNotFoundException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutWebhook",
})) as any;

export type RegisterWebhookWithThirdPartyError =
  | ValidationException
  | WebhookNotFoundException
  | CommonErrors;
/**
 * Configures a connection between the webhook that was created and the external tool
 * with events to be detected.
 */
export const registerWebhookWithThirdParty: API.OperationMethod<
  RegisterWebhookWithThirdPartyInput,
  RegisterWebhookWithThirdPartyOutput,
  RegisterWebhookWithThirdPartyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { webhookName: 0 } },
  errors: [ValidationException, WebhookNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterWebhookWithThirdParty",
})) as any;

export type RetryStageExecutionError =
  | ConcurrentPipelineExecutionsLimitExceededException
  | ConflictException
  | NotLatestPipelineExecutionException
  | PipelineNotFoundException
  | StageNotFoundException
  | StageNotRetryableException
  | ValidationException
  | CommonErrors;
/**
 * You can retry a stage that has failed without having to run a pipeline again from
 * the beginning. You do this by either retrying the failed actions in a stage or by
 * retrying all actions in the stage starting from the first action in the stage. When you
 * retry the failed actions in a stage, all actions that are still in progress continue
 * working, and failed actions are triggered again. When you retry a failed stage from the
 * first action in the stage, the stage cannot have any actions in progress. Before a stage
 * can be retried, it must either have all actions failed or some actions failed and some
 * succeeded.
 */
export const retryStageExecution: API.OperationMethod<
  RetryStageExecutionInput,
  RetryStageExecutionOutput,
  RetryStageExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      pipelineName: 0,
      stageName: 0,
      pipelineExecutionId: 0,
      retryMode: 0,
    },
  },
  errors: [
    ConcurrentPipelineExecutionsLimitExceededException,
    ConflictException,
    NotLatestPipelineExecutionException,
    PipelineNotFoundException,
    StageNotFoundException,
    StageNotRetryableException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RetryStageExecution",
})) as any;

export type RollbackStageError =
  | ConflictException
  | PipelineExecutionNotFoundException
  | PipelineExecutionOutdatedException
  | PipelineNotFoundException
  | StageNotFoundException
  | UnableToRollbackStageException
  | ValidationException
  | CommonErrors;
/**
 * Rolls back a stage execution.
 */
export const rollbackStage: API.OperationMethod<
  RollbackStageInput,
  RollbackStageOutput,
  RollbackStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { pipelineName: 0, stageName: 0, targetPipelineExecutionId: 0 },
  },
  errors: [
    ConflictException,
    PipelineExecutionNotFoundException,
    PipelineExecutionOutdatedException,
    PipelineNotFoundException,
    StageNotFoundException,
    UnableToRollbackStageException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RollbackStage",
})) as any;

export type StartPipelineExecutionError =
  | ConcurrentPipelineExecutionsLimitExceededException
  | ConflictException
  | PipelineNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Starts the specified pipeline. Specifically, it begins processing the latest commit
 * to the source location specified as part of the pipeline.
 */
export const startPipelineExecution: API.OperationMethod<
  StartPipelineExecutionInput,
  StartPipelineExecutionOutput,
  StartPipelineExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      variables: D.list({ name: 0, value: 0 }),
      clientRequestToken: D.m({ idempotency: true }),
      sourceRevisions: D.list({
        actionName: 0,
        revisionType: 0,
        revisionValue: 0,
      }),
    },
  },
  errors: [
    ConcurrentPipelineExecutionsLimitExceededException,
    ConflictException,
    PipelineNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartPipelineExecution",
})) as any;

export type StopPipelineExecutionError =
  | ConflictException
  | DuplicatedStopRequestException
  | PipelineExecutionNotStoppableException
  | PipelineNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Stops the specified pipeline execution. You choose to either stop the pipeline
 * execution by completing in-progress actions without starting subsequent actions, or by
 * abandoning in-progress actions. While completing or abandoning in-progress actions, the
 * pipeline execution is in a `Stopping` state. After all in-progress actions
 * are completed or abandoned, the pipeline execution is in a `Stopped`
 * state.
 */
export const stopPipelineExecution: API.OperationMethod<
  StopPipelineExecutionInput,
  StopPipelineExecutionOutput,
  StopPipelineExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { pipelineName: 0, pipelineExecutionId: 0, abandon: 0, reason: 0 },
  },
  errors: [
    ConflictException,
    DuplicatedStopRequestException,
    PipelineExecutionNotStoppableException,
    PipelineNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopPipelineExecution",
})) as any;

export type TagResourceError =
  | ConcurrentModificationException
  | InvalidArnException
  | InvalidTagsException
  | ResourceNotFoundException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Adds to or modifies the tags of the given resource. Tags are metadata that can be used
 * to manage a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0, tags: D.list(i_Tag) } },
  errors: [
    ConcurrentModificationException,
    InvalidArnException,
    InvalidTagsException,
    ResourceNotFoundException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | ConcurrentModificationException
  | InvalidArnException
  | InvalidTagsException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from an Amazon Web Services resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0, tagKeys: 0 } },
  errors: [
    ConcurrentModificationException,
    InvalidArnException,
    InvalidTagsException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateActionTypeError =
  | ActionTypeNotFoundException
  | RequestFailedException
  | ValidationException
  | CommonErrors;
/**
 * Updates an action type that was created with any supported integration model, where
 * the action type is to be used by customers of the action type provider. Use a JSON file
 * with the action definition and `UpdateActionType` to provide the full
 * structure.
 */
export const updateActionType: API.OperationMethod<
  UpdateActionTypeInput,
  UpdateActionTypeResponse,
  UpdateActionTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      actionType: {
        description: 0,
        executor: {
          configuration: {
            lambdaExecutorConfiguration: { lambdaFunctionArn: 0 },
            jobWorkerExecutorConfiguration: {
              pollingAccounts: 0,
              pollingServicePrincipals: 0,
            },
          },
          type: 0,
          policyStatementsTemplate: 0,
          jobTimeout: 0,
        },
        id: { category: 0, owner: 0, provider: 0, version: 0 },
        inputArtifactDetails: i_ActionTypeArtifactDetails,
        outputArtifactDetails: i_ActionTypeArtifactDetails,
        permissions: { allowedAccounts: 0 },
        properties: D.list({
          name: 0,
          optional: 0,
          key: 0,
          noEcho: 0,
          queryable: 0,
          description: 0,
        }),
        urls: {
          configurationUrl: 0,
          entityUrlTemplate: 0,
          executionUrlTemplate: 0,
          revisionUrlTemplate: 0,
        },
      },
    },
  },
  errors: [
    ActionTypeNotFoundException,
    RequestFailedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateActionType",
})) as any;

export type UpdatePipelineError =
  | InvalidActionDeclarationException
  | InvalidBlockerDeclarationException
  | InvalidStageDeclarationException
  | InvalidStructureException
  | LimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Updates a specified pipeline with edits or changes to its structure. Use a JSON
 * file with the pipeline structure and `UpdatePipeline` to provide the full
 * structure of the pipeline. Updating the pipeline increases the version number of the
 * pipeline by 1.
 */
export const updatePipeline: API.OperationMethod<
  UpdatePipelineInput,
  UpdatePipelineOutput,
  UpdatePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { pipeline: i_PipelineDeclaration } },
  errors: [
    InvalidActionDeclarationException,
    InvalidBlockerDeclarationException,
    InvalidStageDeclarationException,
    InvalidStructureException,
    LimitExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePipeline",
})) as any;

const i_ActionTypeArtifactDetails: D.LazyStruct = () => ({
  minimumCount: 0,
  maximumCount: 0,
});
const i_ActionTypeId: D.LazyStruct = () => ({
  category: 0,
  owner: 0,
  provider: 0,
  version: 0,
});
const i_ArtifactDetails: D.LazyStruct = () => ({
  minimumCount: 0,
  maximumCount: 0,
});
const i_CurrentRevision: D.LazyStruct = () => ({
  revision: 0,
  changeIdentifier: 0,
  created: 0,
  revisionSummary: 0,
});
const i_ExecutionDetails: D.LazyStruct = () => ({
  summary: 0,
  externalExecutionId: 0,
  percentComplete: 0,
});
const i_FailureDetails: D.LazyStruct = () => ({
  type: 0,
  message: 0,
  externalExecutionId: 0,
});
const i_LatestInPipelineExecutionFilter: D.LazyStruct = () => ({
  pipelineExecutionId: 0,
  startTimeRange: 0,
});
const i_PipelineDeclaration: D.LazyStruct = () => ({
  name: 0,
  roleArn: 0,
  artifactStore: i_ArtifactStore,
  artifactStores: D.map(i_ArtifactStore),
  stages: D.list({
    name: 0,
    blockers: D.list({ name: 0, type: 0 }),
    actions: D.list({
      name: 0,
      actionTypeId: i_ActionTypeId,
      runOrder: 0,
      configuration: 0,
      commands: 0,
      outputArtifacts: D.list({ name: 0, files: 0 }),
      inputArtifacts: D.list(i_InputArtifact),
      outputVariables: 0,
      roleArn: 0,
      region: 0,
      namespace: 0,
      timeoutInMinutes: 0,
      environmentVariables: D.list({ name: 0, value: 0, type: 0 }),
    }),
    onFailure: {
      result: 0,
      retryConfiguration: { retryMode: 0 },
      conditions: D.list(i_Condition),
    },
    onSuccess: { conditions: D.list(i_Condition) },
    beforeEntry: { conditions: D.list(i_Condition) },
  }),
  version: 0,
  executionMode: 0,
  pipelineType: 0,
  variables: D.list({ name: 0, defaultValue: 0, description: 0 }),
  triggers: D.list({
    providerType: 0,
    gitConfiguration: {
      sourceActionName: 0,
      push: D.list({
        tags: { includes: 0, excludes: 0 },
        branches: i_GitBranchFilterCriteria,
        filePaths: i_GitFilePathFilterCriteria,
      }),
      pullRequest: D.list({
        events: 0,
        branches: i_GitBranchFilterCriteria,
        filePaths: i_GitFilePathFilterCriteria,
      }),
    },
  }),
});
const i_Tag: D.LazyStruct = () => ({ key: 0, value: 0 });
const o_AWSSessionCredentials: D.LazyStruct = () => ({
  accessKeyId: D.secret,
  secretAccessKey: D.secret,
  sessionToken: D.secret,
});
const o_JobData: D.LazyStruct = () => ({
  artifactCredentials: o_AWSSessionCredentials,
});
const o_ListWebhookItem: D.LazyStruct = () => ({
  definition: { authenticationConfiguration: { SecretToken: D.secret } },
  lastTriggered: D.ts,
});
const o_StageConditionState: D.LazyStruct = () => ({
  conditionStates: D.list({
    latestExecution: { lastStatusChange: D.ts },
    ruleStates: D.list({
      currentRevision: { created: D.ts },
      latestExecution: { lastStatusChange: D.ts },
    }),
  }),
});
const i_ArtifactStore: D.LazyStruct = () => ({
  type: 0,
  location: 0,
  encryptionKey: { id: 0, type: 0 },
});
const i_Condition: D.LazyStruct = () => ({
  result: 0,
  rules: D.list({
    name: 0,
    ruleTypeId: { category: 0, owner: 0, provider: 0, version: 0 },
    configuration: 0,
    commands: 0,
    inputArtifacts: D.list(i_InputArtifact),
    roleArn: 0,
    region: 0,
    timeoutInMinutes: 0,
  }),
});
const i_GitBranchFilterCriteria: D.LazyStruct = () => ({
  includes: 0,
  excludes: 0,
});
const i_GitFilePathFilterCriteria: D.LazyStruct = () => ({
  includes: 0,
  excludes: 0,
});
const i_InputArtifact: D.LazyStruct = () => ({ name: 0 });
