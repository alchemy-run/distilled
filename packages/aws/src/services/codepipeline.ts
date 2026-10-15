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
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const ns = /*@__PURE__*/ T.XmlNamespace("http://codepipeline.amazonaws.com/doc/2015-07-09/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "CodePipeline",
  serviceShapeName: "CodePipeline_20150709",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "codepipeline" });
const ver = /*@__PURE__*/ T.ServiceVersion("2015-07-09");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://codepipeline.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://codepipeline.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://codepipeline.{R}.{D}","properties":{},"headers":{}}');

export class ActionExecutionNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ActionExecutionNotFoundException>()(
    "ActionExecutionNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ActionNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ActionNotFoundException>()("ActionNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ActionTypeNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ActionTypeNotFoundException>()(
    "ActionTypeNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ApprovalAlreadyCompletedException
  extends /*@__PURE__*/ S.TaggedError<ApprovalAlreadyCompletedException>()(
    "ApprovalAlreadyCompletedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ConcurrentPipelineExecutionsLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentPipelineExecutionsLimitExceededException>()(
    "ConcurrentPipelineExecutionsLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ConditionNotOverridableException
  extends /*@__PURE__*/ S.TaggedError<ConditionNotOverridableException>()(
    "ConditionNotOverridableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DuplicatedStopRequestException
  extends /*@__PURE__*/ S.TaggedError<DuplicatedStopRequestException>()(
    "DuplicatedStopRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidActionDeclarationException
  extends /*@__PURE__*/ S.TaggedError<InvalidActionDeclarationException>()(
    "InvalidActionDeclarationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidApprovalTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidApprovalTokenException>()(
    "InvalidApprovalTokenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidArnException
  extends /*@__PURE__*/ S.TaggedError<InvalidArnException>()("InvalidArnException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidBlockerDeclarationException
  extends /*@__PURE__*/ S.TaggedError<InvalidBlockerDeclarationException>()(
    "InvalidBlockerDeclarationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidClientTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidClientTokenException>()(
    "InvalidClientTokenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidJobException
  extends /*@__PURE__*/ S.TaggedError<InvalidJobException>()("InvalidJobException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidJobStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidJobStateException>()("InvalidJobStateException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()("InvalidNextTokenException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidNonceException
  extends /*@__PURE__*/ S.TaggedError<InvalidNonceException>()("InvalidNonceException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidStageDeclarationException
  extends /*@__PURE__*/ S.TaggedError<InvalidStageDeclarationException>()(
    "InvalidStageDeclarationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidStructureException
  extends /*@__PURE__*/ S.TaggedError<InvalidStructureException>()("InvalidStructureException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidTagsException
  extends /*@__PURE__*/ S.TaggedError<InvalidTagsException>()("InvalidTagsException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidWebhookAuthenticationParametersException
  extends /*@__PURE__*/ S.TaggedError<InvalidWebhookAuthenticationParametersException>()(
    "InvalidWebhookAuthenticationParametersException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidWebhookFilterPatternException
  extends /*@__PURE__*/ S.TaggedError<InvalidWebhookFilterPatternException>()(
    "InvalidWebhookFilterPatternException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class JobNotFoundException
  extends /*@__PURE__*/ S.TaggedError<JobNotFoundException>()("JobNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()("LimitExceededException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class NotLatestPipelineExecutionException
  extends /*@__PURE__*/ S.TaggedError<NotLatestPipelineExecutionException>()(
    "NotLatestPipelineExecutionException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class OutputVariablesSizeExceededException
  extends /*@__PURE__*/ S.TaggedError<OutputVariablesSizeExceededException>()(
    "OutputVariablesSizeExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class PipelineExecutionNotFoundException
  extends /*@__PURE__*/ S.TaggedError<PipelineExecutionNotFoundException>()(
    "PipelineExecutionNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class PipelineExecutionNotStoppableException
  extends /*@__PURE__*/ S.TaggedError<PipelineExecutionNotStoppableException>()(
    "PipelineExecutionNotStoppableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class PipelineExecutionOutdatedException
  extends /*@__PURE__*/ S.TaggedError<PipelineExecutionOutdatedException>()(
    "PipelineExecutionOutdatedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class PipelineNameInUseException
  extends /*@__PURE__*/ S.TaggedError<PipelineNameInUseException>()("PipelineNameInUseException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class PipelineNotFoundException
  extends /*@__PURE__*/ S.TaggedError<PipelineNotFoundException>()("PipelineNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class PipelineVersionNotFoundException
  extends /*@__PURE__*/ S.TaggedError<PipelineVersionNotFoundException>()(
    "PipelineVersionNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class RequestFailedException
  extends /*@__PURE__*/ S.TaggedError<RequestFailedException>()("RequestFailedException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()("ResourceNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class StageNotFoundException
  extends /*@__PURE__*/ S.TaggedError<StageNotFoundException>()("StageNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class StageNotRetryableException
  extends /*@__PURE__*/ S.TaggedError<StageNotRetryableException>()("StageNotRetryableException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()("TooManyTagsException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class UnableToRollbackStageException
  extends /*@__PURE__*/ S.TaggedError<UnableToRollbackStageException>()(
    "UnableToRollbackStageException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()("ValidationException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class WebhookNotFoundException
  extends /*@__PURE__*/ S.TaggedError<WebhookNotFoundException>()("WebhookNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
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
export type ActionConfigurationPropertyType = "String" | "Number" | "Boolean" | (string & {});
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
export type EnvironmentVariableType = "PLAINTEXT" | "SECRETS_MANAGER" | (string & {});
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
export type ExecutionMode = "QUEUED" | "SUPERSEDED" | "PARALLEL" | (string & {});
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
export type PipelineTriggerProviderType = "CodeStarSourceConnection" | (string & {});
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
export type GitPullRequestEventType = "OPEN" | "UPDATED" | "CLOSED" | (string & {});
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
export type RetryTrigger = "AutomatedStageRetry" | "ManualStageRetry" | (string & {});
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
export type ResolvedActionConfigurationMap = { [key: string]: string | undefined };
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
export type ResolvedRuleConfigurationMap = { [key: string]: string | undefined };
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
export type RuleConfigurationPropertyType = "String" | "Number" | "Boolean" | (string & {});
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
export type WebhookAuthenticationType = "GITHUB_HMAC" | "IP" | "UNAUTHENTICATED" | (string & {});
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
  input: __S(0, __c0, 0) as any as S.Schema<AcknowledgeJobInput>,
  output: __S(32, __c1, 0) as any as S.Schema<AcknowledgeJobOutput>,
  errors: [InvalidNonceException, JobNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcknowledgeJob",
}));

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
  input: __S(64, __c2, 0) as any as S.Schema<AcknowledgeThirdPartyJobInput>,
  output: __S(32, __c1, 0) as any as S.Schema<AcknowledgeThirdPartyJobOutput>,
  errors: [
    InvalidClientTokenException,
    InvalidNonceException,
    JobNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcknowledgeThirdPartyJob",
}));

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
  input: __S(96, __c3, 0) as any as S.Schema<CreateCustomActionTypeInput>,
  output: __S(97, __c3, 1) as any as S.Schema<CreateCustomActionTypeOutput>,
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
}));

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
  input: __S(288, __c9, 0) as any as S.Schema<CreatePipelineInput>,
  output: __S(289, __c9, 1) as any as S.Schema<CreatePipelineOutput>,
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
}));

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
  input: __S(512, __c16, 0) as any as S.Schema<DeleteCustomActionTypeInput>,
  output: __S(544, __c17, 0) as any as S.Schema<DeleteCustomActionTypeResponse>,
  errors: [ConcurrentModificationException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomActionType",
}));

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
  input: __S(576, __c18, 0) as any as S.Schema<DeletePipelineInput>,
  output: __S(544, __c17, 0) as any as S.Schema<DeletePipelineResponse>,
  errors: [ConcurrentModificationException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePipeline",
}));

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
  input: __S(608, __c19, 0) as any as S.Schema<DeleteWebhookInput>,
  output: __S(544, __c17, 0) as any as S.Schema<DeleteWebhookOutput>,
  errors: [ConcurrentModificationException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWebhook",
}));

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
  input: __S(640, __c20, 0) as any as S.Schema<DeregisterWebhookWithThirdPartyInput>,
  output: __S(544, __c17, 0) as any as S.Schema<DeregisterWebhookWithThirdPartyOutput>,
  errors: [ValidationException, WebhookNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterWebhookWithThirdParty",
}));

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
  input: __S(672, __c21, 0) as any as S.Schema<DisableStageTransitionInput>,
  output: __S(544, __c17, 0) as any as S.Schema<DisableStageTransitionResponse>,
  errors: [PipelineNotFoundException, StageNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableStageTransition",
}));

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
  input: __S(704, __c22, 0) as any as S.Schema<EnableStageTransitionInput>,
  output: __S(544, __c17, 0) as any as S.Schema<EnableStageTransitionResponse>,
  errors: [PipelineNotFoundException, StageNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableStageTransition",
}));

export type GetActionTypeError = ActionTypeNotFoundException | ValidationException | CommonErrors;
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
  input: __S(736, __c23, 0) as any as S.Schema<GetActionTypeInput>,
  output: __S(737, __c23, 1) as any as S.Schema<GetActionTypeOutput>,
  errors: [ActionTypeNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetActionType",
}));

export type GetJobDetailsError = JobNotFoundException | ValidationException | CommonErrors;
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
  input: __S(800, __c25, 0) as any as S.Schema<GetJobDetailsInput>,
  output: __S(802, __c25, 2) as any as S.Schema<GetJobDetailsOutput>,
  errors: [JobNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobDetails",
}));

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
  input: __S(864, __c27, 0) as any as S.Schema<GetPipelineInput>,
  output: __S(866, __c27, 2) as any as S.Schema<GetPipelineOutput>,
  errors: [PipelineNotFoundException, PipelineVersionNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPipeline",
}));

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
  input: __S(896, __c28, 0) as any as S.Schema<GetPipelineExecutionInput>,
  output: __S(902, __c28, 6) as any as S.Schema<GetPipelineExecutionOutput>,
  errors: [PipelineExecutionNotFoundException, PipelineNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPipelineExecution",
}));

export type GetPipelineStateError = PipelineNotFoundException | ValidationException | CommonErrors;
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
  input: __S(960, __c30, 0) as any as S.Schema<GetPipelineStateInput>,
  output: __S(978, __c30, 18) as any as S.Schema<GetPipelineStateOutput>,
  errors: [PipelineNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPipelineState",
}));

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
  input: __S(1056, __c33, 0) as any as S.Schema<GetThirdPartyJobDetailsInput>,
  output: __S(1058, __c33, 2) as any as S.Schema<GetThirdPartyJobDetailsOutput>,
  errors: [
    InvalidClientTokenException,
    InvalidJobException,
    JobNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetThirdPartyJobDetails",
}));

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
  input: __S(1088, __c34, 0) as any as S.Schema<ListActionExecutionsInput>,
  output: __S(1094, __c34, 6) as any as S.Schema<ListActionExecutionsOutput>,
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

export type ListActionTypesError = InvalidNextTokenException | ValidationException | CommonErrors;
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
  input: __S(1152, __c36, 0) as any as S.Schema<ListActionTypesInput>,
  output: __S(1154, __c36, 2) as any as S.Schema<ListActionTypesOutput>,
  errors: [InvalidNextTokenException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListActionTypes",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "actionTypes" } as const,
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
  input: __S(1186, __c37, 2) as any as S.Schema<ListDeployActionExecutionTargetsInput>,
  output: __S(1192, __c37, 8) as any as S.Schema<ListDeployActionExecutionTargetsOutput>,
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
  input: __S(1218, __c38, 2) as any as S.Schema<ListPipelineExecutionsInput>,
  output: __S(1224, __c38, 8) as any as S.Schema<ListPipelineExecutionsOutput>,
  errors: [InvalidNextTokenException, PipelineNotFoundException, ValidationException],
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

export type ListPipelinesError = InvalidNextTokenException | ValidationException | CommonErrors;
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
  input: __S(1248, __c39, 0) as any as S.Schema<ListPipelinesInput>,
  output: __S(1251, __c39, 3) as any as S.Schema<ListPipelinesOutput>,
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
  input: __S(1280, __c40, 0) as any as S.Schema<ListRuleExecutionsInput>,
  output: __S(1286, __c40, 6) as any as S.Schema<ListRuleExecutionsOutput>,
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

export type ListRuleTypesError = InvalidNextTokenException | ValidationException | CommonErrors;
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
  input: __S(1312, __c41, 0) as any as S.Schema<ListRuleTypesInput>,
  output: __S(1315, __c41, 3) as any as S.Schema<ListRuleTypesOutput>,
  errors: [InvalidNextTokenException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRuleTypes",
}));

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
  input: __S(1344, __c42, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(1345, __c42, 1) as any as S.Schema<ListTagsForResourceOutput>,
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

export type ListWebhooksError = InvalidNextTokenException | ValidationException | CommonErrors;
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
  input: __S(1376, __c43, 0) as any as S.Schema<ListWebhooksInput>,
  output: __S(1378, __c43, 2) as any as S.Schema<ListWebhooksOutput>,
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
  input: __S(1440, __c45, 0) as any as S.Schema<OverrideStageConditionInput>,
  output: __S(544, __c17, 0) as any as S.Schema<OverrideStageConditionResponse>,
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
}));

export type PollForJobsError = ActionTypeNotFoundException | ValidationException | CommonErrors;
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
  input: __S(1472, __c46, 0) as any as S.Schema<PollForJobsInput>,
  output: __S(1475, __c46, 3) as any as S.Schema<PollForJobsOutput>,
  errors: [ActionTypeNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PollForJobs",
}));

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
  input: __S(1504, __c47, 0) as any as S.Schema<PollForThirdPartyJobsInput>,
  output: __S(1507, __c47, 3) as any as S.Schema<PollForThirdPartyJobsOutput>,
  errors: [ActionTypeNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PollForThirdPartyJobs",
}));

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
  input: __S(1536, __c48, 0) as any as S.Schema<PutActionRevisionInput>,
  output: __S(1537, __c48, 1) as any as S.Schema<PutActionRevisionOutput>,
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
}));

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
  input: __S(1569, __c49, 1) as any as S.Schema<PutApprovalResultInput>,
  output: __S(1570, __c49, 2) as any as S.Schema<PutApprovalResultOutput>,
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
}));

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
  input: __S(1600, __c50, 0) as any as S.Schema<PutJobFailureResultInput>,
  output: __S(544, __c17, 0) as any as S.Schema<PutJobFailureResultResponse>,
  errors: [InvalidJobStateException, JobNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutJobFailureResult",
}));

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
  input: __S(1664, __c52, 0) as any as S.Schema<PutJobSuccessResultInput>,
  output: __S(544, __c17, 0) as any as S.Schema<PutJobSuccessResultResponse>,
  errors: [
    InvalidJobStateException,
    JobNotFoundException,
    OutputVariablesSizeExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutJobSuccessResult",
}));

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
  input: __S(1728, __c54, 0) as any as S.Schema<PutThirdPartyJobFailureResultInput>,
  output: __S(544, __c17, 0) as any as S.Schema<PutThirdPartyJobFailureResultResponse>,
  errors: [
    InvalidClientTokenException,
    InvalidJobStateException,
    JobNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutThirdPartyJobFailureResult",
}));

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
  input: __S(1760, __c55, 0) as any as S.Schema<PutThirdPartyJobSuccessResultInput>,
  output: __S(544, __c17, 0) as any as S.Schema<PutThirdPartyJobSuccessResultResponse>,
  errors: [
    InvalidClientTokenException,
    InvalidJobStateException,
    JobNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutThirdPartyJobSuccessResult",
}));

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
  input: __S(1792, __c56, 0) as any as S.Schema<PutWebhookInput>,
  output: __S(1793, __c56, 1) as any as S.Schema<PutWebhookOutput>,
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
}));

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
  input: __S(1824, __c57, 0) as any as S.Schema<RegisterWebhookWithThirdPartyInput>,
  output: __S(544, __c17, 0) as any as S.Schema<RegisterWebhookWithThirdPartyOutput>,
  errors: [ValidationException, WebhookNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterWebhookWithThirdParty",
}));

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
  input: __S(1856, __c58, 0) as any as S.Schema<RetryStageExecutionInput>,
  output: __S(1888, __c59, 0) as any as S.Schema<RetryStageExecutionOutput>,
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
}));

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
  input: __S(1920, __c60, 0) as any as S.Schema<RollbackStageInput>,
  output: __S(1921, __c60, 1) as any as S.Schema<RollbackStageOutput>,
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
}));

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
  input: __S(1956, __c61, 4) as any as S.Schema<StartPipelineExecutionInput>,
  output: __S(1888, __c59, 0) as any as S.Schema<StartPipelineExecutionOutput>,
  errors: [
    ConcurrentPipelineExecutionsLimitExceededException,
    ConflictException,
    PipelineNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartPipelineExecution",
}));

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
  input: __S(1984, __c62, 0) as any as S.Schema<StopPipelineExecutionInput>,
  output: __S(1888, __c59, 0) as any as S.Schema<StopPipelineExecutionOutput>,
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
}));

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
  input: __S(2016, __c63, 0) as any as S.Schema<TagResourceInput>,
  output: __S(544, __c17, 0) as any as S.Schema<TagResourceOutput>,
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
}));

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
  input: __S(2048, __c64, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(544, __c17, 0) as any as S.Schema<UntagResourceOutput>,
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
}));

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
  input: __S(2080, __c65, 0) as any as S.Schema<UpdateActionTypeInput>,
  output: __S(544, __c17, 0) as any as S.Schema<UpdateActionTypeResponse>,
  errors: [ActionTypeNotFoundException, RequestFailedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateActionType",
}));

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
  input: __S(2112, __c66, 0) as any as S.Schema<UpdatePipelineInput>,
  output: __S(2113, __c66, 1) as any as S.Schema<UpdatePipelineOutput>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobId: S.String, nonce: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AcknowledgeJobInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ status: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "AcknowledgeJobOutput",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobId: S.String, nonce: S.String, clientToken: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AcknowledgeThirdPartyJobInput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          category: S.String,
          provider: S.String,
          version: S.String,
          settings: S.optional(__S(256, __c8, 0)),
          configurationProperties: S.optional(__S(258, __c8, 2)),
          inputArtifactDetails: __S(192, __c6, 0),
          outputArtifactDetails: __S(192, __c6, 0),
          tags: S.optional(__S(161, __c5, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateCustomActionTypeInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ actionType: __S(224, __c7, 0), tags: S.optional(__S(161, __c5, 1)) }).pipe(ns),
      ).annotate({ identifier: "CreateCustomActionTypeOutput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ category: S.String, owner: S.String, provider: S.String, version: S.String }),
      ).annotate({ identifier: "ActionTypeId" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(160, __c5, 0));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ minimumCount: S.Number, maximumCount: S.Number })).annotate(
        { identifier: "ArtifactDetails" },
      );
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: __S(128, __c4, 0),
          settings: S.optional(__S(256, __c8, 0)),
          actionConfigurationProperties: S.optional(__S(258, __c8, 2)),
          inputArtifactDetails: __S(192, __c6, 0),
          outputArtifactDetails: __S(192, __c6, 0),
        }),
      ).annotate({ identifier: "ActionType" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          thirdPartyConfigurationUrl: S.optional(S.String),
          entityUrlTemplate: S.optional(S.String),
          executionUrlTemplate: S.optional(S.String),
          revisionUrlTemplate: S.optional(S.String),
        }),
      ).annotate({ identifier: "ActionTypeSettings" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          required: S.Boolean,
          key: S.Boolean,
          secret: S.Boolean,
          queryable: S.optional(S.Boolean),
          description: S.optional(S.String),
          type: S.optional(S.String),
        }),
      ).annotate({ identifier: "ActionConfigurationProperty" });
    case 2:
      return S.Array(__S(257, __c8, 1));
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pipeline: __S(480, __c15, 0), tags: S.optional(__S(161, __c5, 1)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreatePipelineInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          pipeline: S.optional(__S(480, __c15, 0)),
          tags: S.optional(__S(161, __c5, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "CreatePipelineOutput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ id: S.String, type: S.String })).annotate({
        identifier: "EncryptionKey",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          category: S.String,
          owner: S.optional(S.String),
          provider: S.String,
          version: S.optional(S.String),
        }),
      ).annotate({ identifier: "RuleTypeId" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          location: S.String,
          encryptionKey: S.optional(__S(384, __c12, 0)),
        }),
      ).annotate({ identifier: "ArtifactStore" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(448, __c14, 0).pipe(S.optional));
    case 2:
      return S.suspend(() => S.Struct({ name: S.String, type: S.String })).annotate({
        identifier: "BlockerDeclaration",
      });
    case 3:
      return S.Array(__S(450, __c14, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ name: S.String, files: S.optional(__S(320, __c10, 0)) }),
      ).annotate({ identifier: "OutputArtifact" });
    case 5:
      return S.Array(__S(452, __c14, 4));
    case 6:
      return S.suspend(() => S.Struct({ name: S.String })).annotate({
        identifier: "InputArtifact",
      });
    case 7:
      return S.Array(__S(454, __c14, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ name: S.String, value: S.String, type: S.optional(S.String) }),
      ).annotate({ identifier: "EnvironmentVariable" });
    case 9:
      return S.Array(__S(456, __c14, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          actionTypeId: __S(128, __c4, 0),
          runOrder: S.optional(S.Number),
          configuration: S.optional(__S(352, __c11, 0)),
          commands: S.optional(__S(320, __c10, 0)),
          outputArtifacts: S.optional(__S(453, __c14, 5)),
          inputArtifacts: S.optional(__S(455, __c14, 7)),
          outputVariables: S.optional(__S(320, __c10, 0)),
          roleArn: S.optional(S.String),
          region: S.optional(S.String),
          namespace: S.optional(S.String),
          timeoutInMinutes: S.optional(S.Number),
          environmentVariables: S.optional(__S(457, __c14, 9)),
        }),
      ).annotate({ identifier: "ActionDeclaration" });
    case 11:
      return S.Array(__S(458, __c14, 10));
    case 12:
      return S.suspend(() => S.Struct({ retryMode: S.optional(S.String) })).annotate({
        identifier: "RetryConfiguration",
      });
    case 13:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          ruleTypeId: __S(416, __c13, 0),
          configuration: S.optional(__S(352, __c11, 0)),
          commands: S.optional(__S(320, __c10, 0)),
          inputArtifacts: S.optional(__S(455, __c14, 7)),
          roleArn: S.optional(S.String),
          region: S.optional(S.String),
          timeoutInMinutes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RuleDeclaration" });
    case 14:
      return S.Array(__S(461, __c14, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({ result: S.optional(S.String), rules: S.optional(__S(462, __c14, 14)) }),
      ).annotate({ identifier: "Condition" });
    case 16:
      return S.Array(__S(463, __c14, 15));
    case 17:
      return S.suspend(() =>
        S.Struct({
          result: S.optional(S.String),
          retryConfiguration: S.optional(__S(460, __c14, 12)),
          conditions: S.optional(__S(464, __c14, 16)),
        }),
      ).annotate({ identifier: "FailureConditions" });
    case 18:
      return S.suspend(() => S.Struct({ conditions: __S(464, __c14, 16) })).annotate({
        identifier: "SuccessConditions",
      });
    case 19:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          blockers: S.optional(__S(451, __c14, 3)),
          actions: __S(459, __c14, 11),
          onFailure: S.optional(__S(465, __c14, 17)),
          onSuccess: S.optional(__S(466, __c14, 18)),
          beforeEntry: S.optional(__S(466, __c14, 18)),
        }),
      ).annotate({ identifier: "StageDeclaration" });
    case 20:
      return S.Array(__S(467, __c14, 19));
    case 21:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          defaultValue: S.optional(S.String),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "PipelineVariableDeclaration" });
    case 22:
      return S.Array(__S(469, __c14, 21));
    case 23:
      return S.suspend(() =>
        S.Struct({
          includes: S.optional(__S(320, __c10, 0)),
          excludes: S.optional(__S(320, __c10, 0)),
        }),
      ).annotate({ identifier: "GitTagFilterCriteria" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          tags: S.optional(__S(471, __c14, 23)),
          branches: S.optional(__S(471, __c14, 23)),
          filePaths: S.optional(__S(471, __c14, 23)),
        }),
      ).annotate({ identifier: "GitPushFilter" });
    case 25:
      return S.Array(__S(472, __c14, 24));
    case 26:
      return S.Array(S.String);
    case 27:
      return S.suspend(() =>
        S.Struct({
          events: S.optional(__S(474, __c14, 26)),
          branches: S.optional(__S(471, __c14, 23)),
          filePaths: S.optional(__S(471, __c14, 23)),
        }),
      ).annotate({ identifier: "GitPullRequestFilter" });
    case 28:
      return S.Array(__S(475, __c14, 27));
    case 29:
      return S.suspend(() =>
        S.Struct({
          sourceActionName: S.String,
          push: S.optional(__S(473, __c14, 25)),
          pullRequest: S.optional(__S(476, __c14, 28)),
        }),
      ).annotate({ identifier: "GitConfiguration" });
    case 30:
      return S.suspend(() =>
        S.Struct({ providerType: S.String, gitConfiguration: __S(477, __c14, 29) }),
      ).annotate({ identifier: "PipelineTriggerDeclaration" });
    case 31:
      return S.Array(__S(478, __c14, 30));
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          roleArn: S.String,
          artifactStore: S.optional(__S(448, __c14, 0)),
          artifactStores: S.optional(__S(449, __c14, 1)),
          stages: __S(468, __c14, 20),
          version: S.optional(S.Number),
          executionMode: S.optional(S.String),
          pipelineType: S.optional(S.String),
          variables: S.optional(__S(470, __c14, 22)),
          triggers: S.optional(__S(479, __c14, 31)),
        }),
      ).annotate({ identifier: "PipelineDeclaration" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ category: S.String, provider: S.String, version: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteCustomActionTypeInput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteCustomActionTypeResponse",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeletePipelineInput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteWebhookInput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ webhookName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeregisterWebhookWithThirdPartyInput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          pipelineName: S.String,
          stageName: S.String,
          transitionType: S.String,
          reason: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisableStageTransitionInput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pipelineName: S.String, stageName: S.String, transitionType: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "EnableStageTransitionInput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          category: S.String,
          owner: S.String,
          provider: S.String,
          version: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetActionTypeInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ actionType: S.optional(__S(777, __c24, 9)) }).pipe(ns),
      ).annotate({ identifier: "GetActionTypeOutput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ lambdaFunctionArn: S.String })).annotate({
        identifier: "LambdaExecutorConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          pollingAccounts: S.optional(__S(320, __c10, 0)),
          pollingServicePrincipals: S.optional(__S(320, __c10, 0)),
        }),
      ).annotate({ identifier: "JobWorkerExecutorConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          lambdaExecutorConfiguration: S.optional(__S(768, __c24, 0)),
          jobWorkerExecutorConfiguration: S.optional(__S(769, __c24, 1)),
        }),
      ).annotate({ identifier: "ExecutorConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          configuration: __S(770, __c24, 2),
          type: S.String,
          policyStatementsTemplate: S.optional(S.String),
          jobTimeout: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ActionTypeExecutor" });
    case 4:
      return S.suspend(() =>
        S.Struct({ category: S.String, owner: S.String, provider: S.String, version: S.String }),
      ).annotate({ identifier: "ActionTypeIdentifier" });
    case 5:
      return S.suspend(() => S.Struct({ allowedAccounts: __S(320, __c10, 0) })).annotate({
        identifier: "ActionTypePermissions",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          optional: S.Boolean,
          key: S.Boolean,
          noEcho: S.Boolean,
          queryable: S.optional(S.Boolean),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "ActionTypeProperty" });
    case 7:
      return S.Array(__S(774, __c24, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          configurationUrl: S.optional(S.String),
          entityUrlTemplate: S.optional(S.String),
          executionUrlTemplate: S.optional(S.String),
          revisionUrlTemplate: S.optional(S.String),
        }),
      ).annotate({ identifier: "ActionTypeUrls" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          description: S.optional(S.String),
          executor: __S(771, __c24, 3),
          id: __S(772, __c24, 4),
          inputArtifactDetails: __S(192, __c6, 0),
          outputArtifactDetails: __S(192, __c6, 0),
          permissions: S.optional(__S(773, __c24, 5)),
          properties: S.optional(__S(775, __c24, 7)),
          urls: S.optional(__S(776, __c24, 8)),
        }),
      ).annotate({ identifier: "ActionTypeDeclaration" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetJobDetailsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          data: S.optional(__S(841, __c26, 9)),
          accountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "JobDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({ jobDetails: S.optional(__S(801, __c25, 1)) }).pipe(ns),
      ).annotate({ identifier: "GetJobDetailsOutput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ configuration: S.optional(__S(352, __c11, 0)) })).annotate({
        identifier: "ActionConfiguration",
      });
    case 1:
      return S.suspend(() => S.Struct({ name: S.optional(S.String) })).annotate({
        identifier: "StageContext",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), actionExecutionId: S.optional(S.String) }),
      ).annotate({ identifier: "ActionContext" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          pipelineName: S.optional(S.String),
          stage: S.optional(__S(833, __c26, 1)),
          action: S.optional(__S(834, __c26, 2)),
          pipelineArn: S.optional(S.String),
          pipelineExecutionId: S.optional(S.String),
        }),
      ).annotate({ identifier: "PipelineContext" });
    case 4:
      return S.suspend(() => S.Struct({ bucketName: S.String, objectKey: S.String })).annotate({
        identifier: "S3ArtifactLocation",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({ type: S.optional(S.String), s3Location: S.optional(__S(836, __c26, 4)) }),
      ).annotate({ identifier: "ArtifactLocation" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          revision: S.optional(S.String),
          location: S.optional(__S(837, __c26, 5)),
        }),
      ).annotate({ identifier: "Artifact" });
    case 7:
      return S.Array(__S(838, __c26, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          accessKeyId: SensitiveString,
          secretAccessKey: SensitiveString,
          sessionToken: SensitiveString,
        }),
      ).annotate({ identifier: "AWSSessionCredentials" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          actionTypeId: S.optional(__S(128, __c4, 0)),
          actionConfiguration: S.optional(__S(832, __c26, 0)),
          pipelineContext: S.optional(__S(835, __c26, 3)),
          inputArtifacts: S.optional(__S(839, __c26, 7)),
          outputArtifacts: S.optional(__S(839, __c26, 7)),
          artifactCredentials: S.optional(__S(840, __c26, 8)),
          continuationToken: S.optional(S.String),
          encryptionKey: S.optional(__S(384, __c12, 0)),
        }),
      ).annotate({ identifier: "JobData" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String, version: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetPipelineInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          pipelineArn: S.optional(S.String),
          created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          pollingDisabledAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "PipelineMetadata" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          pipeline: S.optional(__S(480, __c15, 0)),
          metadata: S.optional(__S(865, __c27, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "GetPipelineOutput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pipelineName: S.String, pipelineExecutionId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetPipelineExecutionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          revisionId: S.optional(S.String),
          revisionChangeIdentifier: S.optional(S.String),
          revisionSummary: S.optional(S.String),
          created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          revisionUrl: S.optional(S.String),
        }),
      ).annotate({ identifier: "ArtifactRevision" });
    case 2:
      return S.Array(__S(897, __c28, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), resolvedValue: S.optional(S.String) }),
      ).annotate({ identifier: "ResolvedPipelineVariable" });
    case 4:
      return S.Array(__S(899, __c28, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          pipelineName: S.optional(S.String),
          pipelineVersion: S.optional(S.Number),
          pipelineExecutionId: S.optional(S.String),
          status: S.optional(S.String),
          statusSummary: S.optional(S.String),
          artifactRevisions: S.optional(__S(898, __c28, 2)),
          variables: S.optional(__S(900, __c28, 4)),
          trigger: S.optional(__S(928, __c29, 0)),
          executionMode: S.optional(S.String),
          executionType: S.optional(S.String),
          rollbackMetadata: S.optional(__S(929, __c29, 1)),
        }),
      ).annotate({ identifier: "PipelineExecution" });
    case 6:
      return S.suspend(() =>
        S.Struct({ pipelineExecution: S.optional(__S(901, __c28, 5)) }).pipe(ns),
      ).annotate({ identifier: "GetPipelineExecutionOutput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ triggerType: S.optional(S.String), triggerDetail: S.optional(S.String) }),
      ).annotate({ identifier: "ExecutionTrigger" });
    case 1:
      return S.suspend(() =>
        S.Struct({ rollbackTargetPipelineExecutionId: S.optional(S.String) }),
      ).annotate({ identifier: "PipelineRollbackMetadata" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetPipelineStateInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ pipelineExecutionId: S.String, status: S.String, type: S.optional(S.String) }),
      ).annotate({ identifier: "StageExecution" });
    case 2:
      return S.Array(__S(961, __c30, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          enabled: S.optional(S.Boolean),
          lastChangedBy: S.optional(S.String),
          lastChangedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          disabledReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "TransitionState" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          actionExecutionId: S.optional(S.String),
          status: S.optional(S.String),
          summary: S.optional(S.String),
          lastStatusChange: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          token: S.optional(S.String),
          lastUpdatedBy: S.optional(S.String),
          externalExecutionId: S.optional(S.String),
          externalExecutionUrl: S.optional(S.String),
          percentComplete: S.optional(S.Number),
          errorDetails: S.optional(__S(992, __c31, 0)),
          logStreamARN: S.optional(S.String),
        }),
      ).annotate({ identifier: "ActionExecution" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          actionName: S.optional(S.String),
          currentRevision: S.optional(__S(1024, __c32, 0)),
          latestExecution: S.optional(__S(964, __c30, 4)),
          entityUrl: S.optional(S.String),
          revisionUrl: S.optional(S.String),
        }),
      ).annotate({ identifier: "ActionState" });
    case 6:
      return S.Array(__S(965, __c30, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ status: S.optional(S.String), summary: S.optional(S.String) }),
      ).annotate({ identifier: "StageConditionsExecution" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          summary: S.optional(S.String),
          lastStatusChange: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ConditionExecution" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          ruleExecutionId: S.optional(S.String),
          status: S.optional(S.String),
          summary: S.optional(S.String),
          lastStatusChange: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          token: S.optional(S.String),
          lastUpdatedBy: S.optional(S.String),
          externalExecutionId: S.optional(S.String),
          externalExecutionUrl: S.optional(S.String),
          errorDetails: S.optional(__S(992, __c31, 0)),
        }),
      ).annotate({ identifier: "RuleExecution" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          ruleName: S.optional(S.String),
          currentRevision: S.optional(__S(1024, __c32, 0)),
          latestExecution: S.optional(__S(969, __c30, 9)),
          entityUrl: S.optional(S.String),
          revisionUrl: S.optional(S.String),
        }),
      ).annotate({ identifier: "RuleState" });
    case 11:
      return S.Array(__S(970, __c30, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          latestExecution: S.optional(__S(968, __c30, 8)),
          ruleStates: S.optional(__S(971, __c30, 11)),
        }),
      ).annotate({ identifier: "ConditionState" });
    case 13:
      return S.Array(__S(972, __c30, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          latestExecution: S.optional(__S(967, __c30, 7)),
          conditionStates: S.optional(__S(973, __c30, 13)),
        }),
      ).annotate({ identifier: "StageConditionState" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          autoStageRetryAttempt: S.optional(S.Number),
          manualStageRetryAttempt: S.optional(S.Number),
          latestRetryTrigger: S.optional(S.String),
        }),
      ).annotate({ identifier: "RetryStageMetadata" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          stageName: S.optional(S.String),
          inboundExecution: S.optional(__S(961, __c30, 1)),
          inboundExecutions: S.optional(__S(962, __c30, 2)),
          inboundTransitionState: S.optional(__S(963, __c30, 3)),
          actionStates: S.optional(__S(966, __c30, 6)),
          latestExecution: S.optional(__S(961, __c30, 1)),
          beforeEntryConditionState: S.optional(__S(974, __c30, 14)),
          onSuccessConditionState: S.optional(__S(974, __c30, 14)),
          onFailureConditionState: S.optional(__S(974, __c30, 14)),
          retryStageMetadata: S.optional(__S(975, __c30, 15)),
        }),
      ).annotate({ identifier: "StageState" });
    case 17:
      return S.Array(__S(976, __c30, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({
          pipelineName: S.optional(S.String),
          pipelineVersion: S.optional(S.Number),
          stageStates: S.optional(__S(977, __c30, 17)),
          created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "GetPipelineStateOutput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ code: S.optional(S.String), message: S.optional(S.String) }),
      ).annotate({ identifier: "ErrorDetails" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          revisionId: S.String,
          revisionChangeId: S.optional(S.String),
          created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ActionRevision" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobId: S.String, clientToken: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetThirdPartyJobDetailsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          data: S.optional(__S(841, __c26, 9)),
          nonce: S.optional(S.String),
        }),
      ).annotate({ identifier: "ThirdPartyJobDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({ jobDetails: S.optional(__S(1057, __c33, 1)) }).pipe(ns),
      ).annotate({ identifier: "GetThirdPartyJobDetailsOutput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          pipelineName: S.String,
          filter: S.optional(__S(1121, __c35, 1)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListActionExecutionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          actionTypeId: S.optional(__S(128, __c4, 0)),
          configuration: S.optional(__S(352, __c11, 0)),
          resolvedConfiguration: S.optional(__S(352, __c11, 0)),
          roleArn: S.optional(S.String),
          region: S.optional(S.String),
          inputArtifacts: S.optional(__S(1124, __c35, 4)),
          namespace: S.optional(S.String),
        }),
      ).annotate({ identifier: "ActionExecutionInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          externalExecutionId: S.optional(S.String),
          externalExecutionSummary: S.optional(S.String),
          externalExecutionUrl: S.optional(S.String),
          errorDetails: S.optional(__S(992, __c31, 0)),
          logStreamARN: S.optional(S.String),
        }),
      ).annotate({ identifier: "ActionExecutionResult" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          outputArtifacts: S.optional(__S(1124, __c35, 4)),
          executionResult: S.optional(__S(1090, __c34, 2)),
          outputVariables: S.optional(__S(352, __c11, 0)),
        }),
      ).annotate({ identifier: "ActionExecutionOutput" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          pipelineExecutionId: S.optional(S.String),
          actionExecutionId: S.optional(S.String),
          pipelineVersion: S.optional(S.Number),
          stageName: S.optional(S.String),
          actionName: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedBy: S.optional(S.String),
          status: S.optional(S.String),
          input: S.optional(__S(1089, __c34, 1)),
          output: S.optional(__S(1091, __c34, 3)),
        }),
      ).annotate({ identifier: "ActionExecutionDetail" });
    case 5:
      return S.Array(__S(1092, __c34, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          actionExecutionDetails: S.optional(__S(1093, __c34, 5)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListActionExecutionsOutput" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pipelineExecutionId: S.String, startTimeRange: S.String }),
      ).annotate({ identifier: "LatestInPipelineExecutionFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          pipelineExecutionId: S.optional(S.String),
          latestInPipelineExecution: S.optional(__S(1120, __c35, 0)),
        }),
      ).annotate({ identifier: "ActionExecutionFilter" });
    case 2:
      return S.suspend(() =>
        S.Struct({ bucket: S.optional(S.String), key: S.optional(S.String) }),
      ).annotate({ identifier: "S3Location" });
    case 3:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), s3location: S.optional(__S(1122, __c35, 2)) }),
      ).annotate({ identifier: "ArtifactDetail" });
    case 4:
      return S.Array(__S(1123, __c35, 3));
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          actionOwnerFilter: S.optional(S.String),
          nextToken: S.optional(S.String),
          regionFilter: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListActionTypesInput" });
    case 1:
      return S.Array(__S(224, __c7, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ actionTypes: __S(1153, __c36, 1), nextToken: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "ListActionTypesOutput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), values: S.optional(__S(320, __c10, 0)) }),
      ).annotate({ identifier: "TargetFilter" });
    case 1:
      return S.Array(__S(1184, __c37, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          pipelineName: S.optional(S.String),
          actionExecutionId: S.String,
          filters: S.optional(__S(1185, __c37, 1)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDeployActionExecutionTargetsInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({ ssmCommandId: S.optional(S.String), message: S.optional(S.String) }),
      ).annotate({ identifier: "DeployTargetEventContext" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          status: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          context: S.optional(__S(1187, __c37, 3)),
        }),
      ).annotate({ identifier: "DeployTargetEvent" });
    case 5:
      return S.Array(__S(1188, __c37, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          targetId: S.optional(S.String),
          targetType: S.optional(S.String),
          status: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          events: S.optional(__S(1189, __c37, 5)),
        }),
      ).annotate({ identifier: "DeployActionExecutionTarget" });
    case 7:
      return S.Array(__S(1190, __c37, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          targets: S.optional(__S(1191, __c37, 7)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListDeployActionExecutionTargetsOutput" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ stageName: S.optional(S.String) })).annotate({
        identifier: "SucceededInStageFilter",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ succeededInStage: S.optional(__S(1216, __c38, 0)) }),
      ).annotate({ identifier: "PipelineExecutionFilter" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          pipelineName: S.String,
          maxResults: S.optional(S.Number),
          filter: S.optional(__S(1217, __c38, 1)),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPipelineExecutionsInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          actionName: S.String,
          revisionId: S.optional(S.String),
          revisionSummary: S.optional(S.String),
          revisionUrl: S.optional(S.String),
        }),
      ).annotate({ identifier: "SourceRevision" });
    case 4:
      return S.Array(__S(1219, __c38, 3));
    case 5:
      return S.suspend(() => S.Struct({ reason: S.optional(S.String) })).annotate({
        identifier: "StopExecutionTrigger",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          pipelineExecutionId: S.optional(S.String),
          status: S.optional(S.String),
          statusSummary: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          sourceRevisions: S.optional(__S(1220, __c38, 4)),
          trigger: S.optional(__S(928, __c29, 0)),
          stopTrigger: S.optional(__S(1221, __c38, 5)),
          executionMode: S.optional(S.String),
          executionType: S.optional(S.String),
          rollbackMetadata: S.optional(__S(929, __c29, 1)),
        }),
      ).annotate({ identifier: "PipelineExecutionSummary" });
    case 7:
      return S.Array(__S(1222, __c38, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          pipelineExecutionSummaries: S.optional(__S(1223, __c38, 7)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListPipelineExecutionsOutput" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), maxResults: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListPipelinesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          version: S.optional(S.Number),
          pipelineType: S.optional(S.String),
          executionMode: S.optional(S.String),
          created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "PipelineSummary" });
    case 2:
      return S.Array(__S(1249, __c39, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          pipelines: S.optional(__S(1250, __c39, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListPipelinesOutput" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          pipelineName: S.String,
          filter: S.optional(__S(1121, __c35, 1)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRuleExecutionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ruleTypeId: S.optional(__S(416, __c13, 0)),
          configuration: S.optional(__S(352, __c11, 0)),
          resolvedConfiguration: S.optional(__S(352, __c11, 0)),
          roleArn: S.optional(S.String),
          region: S.optional(S.String),
          inputArtifacts: S.optional(__S(1124, __c35, 4)),
        }),
      ).annotate({ identifier: "RuleExecutionInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          externalExecutionId: S.optional(S.String),
          externalExecutionSummary: S.optional(S.String),
          externalExecutionUrl: S.optional(S.String),
          errorDetails: S.optional(__S(992, __c31, 0)),
        }),
      ).annotate({ identifier: "RuleExecutionResult" });
    case 3:
      return S.suspend(() =>
        S.Struct({ executionResult: S.optional(__S(1282, __c40, 2)) }),
      ).annotate({ identifier: "RuleExecutionOutput" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          pipelineExecutionId: S.optional(S.String),
          ruleExecutionId: S.optional(S.String),
          pipelineVersion: S.optional(S.Number),
          stageName: S.optional(S.String),
          ruleName: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedBy: S.optional(S.String),
          status: S.optional(S.String),
          input: S.optional(__S(1281, __c40, 1)),
          output: S.optional(__S(1283, __c40, 3)),
        }),
      ).annotate({ identifier: "RuleExecutionDetail" });
    case 5:
      return S.Array(__S(1284, __c40, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          ruleExecutionDetails: S.optional(__S(1285, __c40, 5)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListRuleExecutionsOutput" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ruleOwnerFilter: S.optional(S.String),
          regionFilter: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRuleTypesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: __S(416, __c13, 0),
          settings: S.optional(__S(256, __c8, 0)),
          ruleConfigurationProperties: S.optional(__S(258, __c8, 2)),
          inputArtifactDetails: __S(192, __c6, 0),
        }),
      ).annotate({ identifier: "RuleType" });
    case 2:
      return S.Array(__S(1313, __c41, 1));
    case 3:
      return S.suspend(() => S.Struct({ ruleTypes: __S(1314, __c41, 2) }).pipe(ns)).annotate({
        identifier: "ListRuleTypesOutput",
      });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ tags: S.optional(__S(161, __c5, 1)), nextToken: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "ListTagsForResourceOutput" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListWebhooksInput" });
    case 1:
      return S.Array(__S(1412, __c44, 4));
    case 2:
      return S.suspend(() =>
        S.Struct({
          webhooks: S.optional(__S(1377, __c43, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListWebhooksOutput" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jsonPath: S.String, matchEquals: S.optional(S.String) }),
      ).annotate({ identifier: "WebhookFilterRule" });
    case 1:
      return S.Array(__S(1408, __c44, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          AllowedIPRange: S.optional(S.String),
          SecretToken: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "WebhookAuthConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          targetPipeline: S.String,
          targetAction: S.String,
          filters: __S(1409, __c44, 1),
          authentication: S.String,
          authenticationConfiguration: __S(1410, __c44, 2),
        }),
      ).annotate({ identifier: "WebhookDefinition" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          definition: __S(1411, __c44, 3),
          url: S.String,
          errorMessage: S.optional(S.String),
          errorCode: S.optional(S.String),
          lastTriggered: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          arn: S.optional(S.String),
          tags: S.optional(__S(161, __c5, 1)),
        }),
      ).annotate({ identifier: "ListWebhookItem" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          pipelineName: S.String,
          stageName: S.String,
          pipelineExecutionId: S.String,
          conditionType: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "OverrideStageConditionInput" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          actionTypeId: __S(128, __c4, 0),
          maxBatchSize: S.optional(S.Number),
          queryParam: S.optional(__S(352, __c11, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PollForJobsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          data: S.optional(__S(841, __c26, 9)),
          nonce: S.optional(S.String),
          accountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "Job" });
    case 2:
      return S.Array(__S(1473, __c46, 1));
    case 3:
      return S.suspend(() => S.Struct({ jobs: S.optional(__S(1474, __c46, 2)) }).pipe(ns)).annotate(
        { identifier: "PollForJobsOutput" },
      );
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ actionTypeId: __S(128, __c4, 0), maxBatchSize: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PollForThirdPartyJobsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ clientId: S.optional(S.String), jobId: S.optional(S.String) }),
      ).annotate({ identifier: "ThirdPartyJob" });
    case 2:
      return S.Array(__S(1505, __c47, 1));
    case 3:
      return S.suspend(() => S.Struct({ jobs: S.optional(__S(1506, __c47, 2)) }).pipe(ns)).annotate(
        { identifier: "PollForThirdPartyJobsOutput" },
      );
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          pipelineName: S.String,
          stageName: S.String,
          actionName: S.String,
          actionRevision: __S(1024, __c32, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutActionRevisionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          newRevision: S.optional(S.Boolean),
          pipelineExecutionId: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "PutActionRevisionOutput" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ summary: S.String, status: S.String })).annotate({
        identifier: "ApprovalResult",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          pipelineName: S.String,
          stageName: S.String,
          actionName: S.String,
          result: __S(1568, __c49, 0),
          token: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutApprovalResultInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({ approvedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "PutApprovalResultOutput" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobId: S.String, failureDetails: __S(1632, __c51, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutJobFailureResultInput" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ type: S.String, message: S.String, externalExecutionId: S.optional(S.String) }),
      ).annotate({ identifier: "FailureDetails" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String,
          currentRevision: S.optional(__S(1696, __c53, 0)),
          continuationToken: S.optional(S.String),
          executionDetails: S.optional(__S(1697, __c53, 1)),
          outputVariables: S.optional(__S(352, __c11, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutJobSuccessResultInput" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          revision: S.String,
          changeIdentifier: S.String,
          created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          revisionSummary: S.optional(S.String),
        }),
      ).annotate({ identifier: "CurrentRevision" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          summary: S.optional(S.String),
          externalExecutionId: S.optional(S.String),
          percentComplete: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ExecutionDetails" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String,
          clientToken: S.String,
          failureDetails: __S(1632, __c51, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutThirdPartyJobFailureResultInput" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String,
          clientToken: S.String,
          currentRevision: S.optional(__S(1696, __c53, 0)),
          continuationToken: S.optional(S.String),
          executionDetails: S.optional(__S(1697, __c53, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutThirdPartyJobSuccessResultInput" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ webhook: __S(1411, __c44, 3), tags: S.optional(__S(161, __c5, 1)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutWebhookInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ webhook: S.optional(__S(1412, __c44, 4)) }).pipe(ns),
      ).annotate({ identifier: "PutWebhookOutput" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ webhookName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RegisterWebhookWithThirdPartyInput" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          pipelineName: S.String,
          stageName: S.String,
          pipelineExecutionId: S.String,
          retryMode: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RetryStageExecutionInput" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pipelineExecutionId: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "RetryStageExecutionOutput" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          pipelineName: S.String,
          stageName: S.String,
          targetPipelineExecutionId: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RollbackStageInput" });
    case 1:
      return S.suspend(() => S.Struct({ pipelineExecutionId: S.String }).pipe(ns)).annotate({
        identifier: "RollbackStageOutput",
      });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, value: S.String })).annotate({
        identifier: "PipelineVariable",
      });
    case 1:
      return S.Array(__S(1952, __c61, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ actionName: S.String, revisionType: S.String, revisionValue: S.String }),
      ).annotate({ identifier: "SourceRevisionOverride" });
    case 3:
      return S.Array(__S(1954, __c61, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          variables: S.optional(__S(1953, __c61, 1)),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          sourceRevisions: S.optional(__S(1955, __c61, 3)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartPipelineExecutionInput" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          pipelineName: S.String,
          pipelineExecutionId: S.String,
          abandon: S.optional(S.Boolean),
          reason: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StopPipelineExecutionInput" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tags: __S(161, __c5, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tagKeys: __S(320, __c10, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ actionType: __S(777, __c24, 9) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateActionTypeInput" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ pipeline: __S(480, __c15, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdatePipelineInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ pipeline: S.optional(__S(480, __c15, 0)) }).pipe(ns),
      ).annotate({ identifier: "UpdatePipelineOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
