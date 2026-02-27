import * as HttpClient from "effect/unstable/http/HttpClient";
import * as effect from "effect/Effect";
import * as redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as stream from "effect/Stream";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import type { Region } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const ns = T.XmlNamespace("http://codepipeline.amazonaws.com/doc/2015-07-09/");
const svc = T.AwsApiService({
  sdkId: "CodePipeline",
  serviceShapeName: "CodePipeline_20150709",
});
const auth = T.AwsAuthSigv4({ name: "codepipeline" });
const ver = T.ServiceVersion("2015-07-09");
const proto = T.AwsProtocolsAwsJson1_1();
const rules = T.EndpointResolver((p, _) => {
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
});

//# Newtypes
export type JobId = string;
export type Nonce = string;
export type Message = string;
export type ThirdPartyJobId = string;
export type ClientToken = string;
export type ActionProvider = string;
export type Version = string;
export type Url = string;
export type UrlTemplate = string;
export type ActionConfigurationKey = string;
export type Description = string;
export type MinimumArtifactCount = number;
export type MaximumArtifactCount = number;
export type TagKey = string;
export type TagValue = string;
export type PipelineName = string;
export type RoleArn = string;
export type ArtifactStoreLocation = string;
export type EncryptionKeyId = string;
export type AWSRegionName = string;
export type StageName = string;
export type BlockerName = string;
export type ActionName = string;
export type ActionRunOrder = number;
export type ActionConfigurationValue = string;
export type Command = string;
export type ArtifactName = string;
export type FilePath = string;
export type OutputVariable = string;
export type ActionNamespace = string;
export type ActionTimeout = number;
export type EnvironmentVariableName = string;
export type EnvironmentVariableValue = string;
export type RuleName = string;
export type RuleProvider = string;
export type RuleConfigurationKey = string;
export type RuleConfigurationValue = string;
export type RuleTimeout = number;
export type PipelineVersion = number;
export type PipelineVariableName = string;
export type PipelineVariableValue = string;
export type PipelineVariableDescription = string;
export type GitTagNamePattern = string;
export type GitBranchNamePattern = string;
export type GitFilePathPattern = string;
export type WebhookName = string;
export type DisabledReason = string;
export type ActionTypeOwner = string;
export type ActionTypeDescription = string;
export type LambdaFunctionArn = string;
export type AccountId = string;
export type ServicePrincipal = string;
export type PolicyStatementsTemplate = string;
export type JobTimeout = number;
export type MinimumActionTypeArtifactCount = number;
export type MaximumActionTypeArtifactCount = number;
export type AllowedAccount = string;
export type PropertyDescription = string;
export type ActionExecutionId = string;
export type PipelineArn = string;
export type PipelineExecutionId = string;
export type Revision = string;
export type S3BucketName = string;
export type S3ObjectKey = string;
export type AccessKeyId = string | redacted.Redacted<string>;
export type SecretAccessKey = string | redacted.Redacted<string>;
export type SessionToken = string | redacted.Redacted<string>;
export type ContinuationToken = string;
export type PipelineExecutionStatusSummary = string;
export type RevisionChangeIdentifier = string;
export type RevisionSummary = string;
export type TriggerDetail = string;
export type Enabled = boolean;
export type LastChangedBy = string;
export type LastChangedAt = Date;
export type ExecutionSummary = string;
export type ActionExecutionToken = string;
export type LastUpdatedBy = string;
export type ExecutionId = string;
export type Percentage = number;
export type Code = string;
export type LogStreamARN = string;
export type RuleExecutionId = string;
export type RuleExecutionToken = string;
export type RetryAttempt = number;
export type MaxResults = number;
export type NextToken = string;
export type S3Bucket = string;
export type S3Key = string;
export type ExternalExecutionId = string;
export type ExternalExecutionSummary = string;
export type OutputVariablesKey = string;
export type OutputVariablesValue = string;
export type TargetFilterValue = string;
export type StopPipelineExecutionReason = string;
export type MaxPipelines = number;
export type ResourceArn = string;
export type JsonPath = string;
export type MatchEquals = string;
export type WebhookAuthConfigurationAllowedIPRange = string;
export type WebhookAuthConfigurationSecretToken = string;
export type WebhookUrl = string;
export type WebhookErrorMessage = string;
export type WebhookErrorCode = string;
export type WebhookLastTriggered = Date;
export type WebhookArn = string;
export type MaxBatchSize = number;
export type ActionConfigurationQueryableValue = string;
export type ClientId = string;
export type ApprovalSummary = string;
export type ApprovalToken = string;
export type ClientRequestToken = string;

//# Schemas
export interface AcknowledgeJobInput {
  jobId: string;
  nonce: string;
}
export const AcknowledgeJobInput = S.suspend(() =>
  S.Struct({ jobId: S.String, nonce: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AcknowledgeJobInput",
}) as any as S.Schema<AcknowledgeJobInput>;
export type JobStatus =
  | "Created"
  | "Queued"
  | "Dispatched"
  | "InProgress"
  | "TimedOut"
  | "Succeeded"
  | "Failed"
  | (string & {});
export const JobStatus = S.String;
export interface AcknowledgeJobOutput {
  status?: JobStatus;
}
export const AcknowledgeJobOutput = S.suspend(() =>
  S.Struct({ status: S.optional(JobStatus) }).pipe(ns),
).annotate({
  identifier: "AcknowledgeJobOutput",
}) as any as S.Schema<AcknowledgeJobOutput>;
export interface AcknowledgeThirdPartyJobInput {
  jobId: string;
  nonce: string;
  clientToken: string;
}
export const AcknowledgeThirdPartyJobInput = S.suspend(() =>
  S.Struct({ jobId: S.String, nonce: S.String, clientToken: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AcknowledgeThirdPartyJobInput",
}) as any as S.Schema<AcknowledgeThirdPartyJobInput>;
export interface AcknowledgeThirdPartyJobOutput {
  status?: JobStatus;
}
export const AcknowledgeThirdPartyJobOutput = S.suspend(() =>
  S.Struct({ status: S.optional(JobStatus) }).pipe(ns),
).annotate({
  identifier: "AcknowledgeThirdPartyJobOutput",
}) as any as S.Schema<AcknowledgeThirdPartyJobOutput>;
export type ActionCategory =
  | "Source"
  | "Build"
  | "Deploy"
  | "Test"
  | "Invoke"
  | "Approval"
  | "Compute"
  | (string & {});
export const ActionCategory = S.String;
export interface ActionTypeSettings {
  thirdPartyConfigurationUrl?: string;
  entityUrlTemplate?: string;
  executionUrlTemplate?: string;
  revisionUrlTemplate?: string;
}
export const ActionTypeSettings = S.suspend(() =>
  S.Struct({
    thirdPartyConfigurationUrl: S.optional(S.String),
    entityUrlTemplate: S.optional(S.String),
    executionUrlTemplate: S.optional(S.String),
    revisionUrlTemplate: S.optional(S.String),
  }),
).annotate({
  identifier: "ActionTypeSettings",
}) as any as S.Schema<ActionTypeSettings>;
export type ActionConfigurationPropertyType =
  | "String"
  | "Number"
  | "Boolean"
  | (string & {});
export const ActionConfigurationPropertyType = S.String;
export interface ActionConfigurationProperty {
  name: string;
  required: boolean;
  key: boolean;
  secret: boolean;
  queryable?: boolean;
  description?: string;
  type?: ActionConfigurationPropertyType;
}
export const ActionConfigurationProperty = S.suspend(() =>
  S.Struct({
    name: S.String,
    required: S.Boolean,
    key: S.Boolean,
    secret: S.Boolean,
    queryable: S.optional(S.Boolean),
    description: S.optional(S.String),
    type: S.optional(ActionConfigurationPropertyType),
  }),
).annotate({
  identifier: "ActionConfigurationProperty",
}) as any as S.Schema<ActionConfigurationProperty>;
export type ActionConfigurationPropertyList = ActionConfigurationProperty[];
export const ActionConfigurationPropertyList = S.Array(
  ActionConfigurationProperty,
);
export interface ArtifactDetails {
  minimumCount: number;
  maximumCount: number;
}
export const ArtifactDetails = S.suspend(() =>
  S.Struct({ minimumCount: S.Number, maximumCount: S.Number }),
).annotate({
  identifier: "ArtifactDetails",
}) as any as S.Schema<ArtifactDetails>;
export interface Tag {
  key: string;
  value: string;
}
export const Tag = S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = S.Array(Tag);
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
export const CreateCustomActionTypeInput = S.suspend(() =>
  S.Struct({
    category: ActionCategory,
    provider: S.String,
    version: S.String,
    settings: S.optional(ActionTypeSettings),
    configurationProperties: S.optional(ActionConfigurationPropertyList),
    inputArtifactDetails: ArtifactDetails,
    outputArtifactDetails: ArtifactDetails,
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCustomActionTypeInput",
}) as any as S.Schema<CreateCustomActionTypeInput>;
export type ActionOwner = "AWS" | "ThirdParty" | "Custom" | (string & {});
export const ActionOwner = S.String;
export interface ActionTypeId {
  category: ActionCategory;
  owner: ActionOwner;
  provider: string;
  version: string;
}
export const ActionTypeId = S.suspend(() =>
  S.Struct({
    category: ActionCategory,
    owner: ActionOwner,
    provider: S.String,
    version: S.String,
  }),
).annotate({ identifier: "ActionTypeId" }) as any as S.Schema<ActionTypeId>;
export interface ActionType {
  id: ActionTypeId;
  settings?: ActionTypeSettings;
  actionConfigurationProperties?: ActionConfigurationProperty[];
  inputArtifactDetails: ArtifactDetails;
  outputArtifactDetails: ArtifactDetails;
}
export const ActionType = S.suspend(() =>
  S.Struct({
    id: ActionTypeId,
    settings: S.optional(ActionTypeSettings),
    actionConfigurationProperties: S.optional(ActionConfigurationPropertyList),
    inputArtifactDetails: ArtifactDetails,
    outputArtifactDetails: ArtifactDetails,
  }),
).annotate({ identifier: "ActionType" }) as any as S.Schema<ActionType>;
export interface CreateCustomActionTypeOutput {
  actionType: ActionType;
  tags?: Tag[];
}
export const CreateCustomActionTypeOutput = S.suspend(() =>
  S.Struct({ actionType: ActionType, tags: S.optional(TagList) }).pipe(ns),
).annotate({
  identifier: "CreateCustomActionTypeOutput",
}) as any as S.Schema<CreateCustomActionTypeOutput>;
export type ArtifactStoreType = "S3" | (string & {});
export const ArtifactStoreType = S.String;
export type EncryptionKeyType = "KMS" | (string & {});
export const EncryptionKeyType = S.String;
export interface EncryptionKey {
  id: string;
  type: EncryptionKeyType;
}
export const EncryptionKey = S.suspend(() =>
  S.Struct({ id: S.String, type: EncryptionKeyType }),
).annotate({ identifier: "EncryptionKey" }) as any as S.Schema<EncryptionKey>;
export interface ArtifactStore {
  type: ArtifactStoreType;
  location: string;
  encryptionKey?: EncryptionKey;
}
export const ArtifactStore = S.suspend(() =>
  S.Struct({
    type: ArtifactStoreType,
    location: S.String,
    encryptionKey: S.optional(EncryptionKey),
  }),
).annotate({ identifier: "ArtifactStore" }) as any as S.Schema<ArtifactStore>;
export type ArtifactStoreMap = { [key: string]: ArtifactStore | undefined };
export const ArtifactStoreMap = S.Record(
  S.String,
  ArtifactStore.pipe(S.optional),
);
export type BlockerType = "Schedule" | (string & {});
export const BlockerType = S.String;
export interface BlockerDeclaration {
  name: string;
  type: BlockerType;
}
export const BlockerDeclaration = S.suspend(() =>
  S.Struct({ name: S.String, type: BlockerType }),
).annotate({
  identifier: "BlockerDeclaration",
}) as any as S.Schema<BlockerDeclaration>;
export type StageBlockerDeclarationList = BlockerDeclaration[];
export const StageBlockerDeclarationList = S.Array(BlockerDeclaration);
export type ActionConfigurationMap = { [key: string]: string | undefined };
export const ActionConfigurationMap = S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type CommandList = string[];
export const CommandList = S.Array(S.String);
export type FilePathList = string[];
export const FilePathList = S.Array(S.String);
export interface OutputArtifact {
  name: string;
  files?: string[];
}
export const OutputArtifact = S.suspend(() =>
  S.Struct({ name: S.String, files: S.optional(FilePathList) }),
).annotate({ identifier: "OutputArtifact" }) as any as S.Schema<OutputArtifact>;
export type OutputArtifactList = OutputArtifact[];
export const OutputArtifactList = S.Array(OutputArtifact);
export interface InputArtifact {
  name: string;
}
export const InputArtifact = S.suspend(() =>
  S.Struct({ name: S.String }),
).annotate({ identifier: "InputArtifact" }) as any as S.Schema<InputArtifact>;
export type InputArtifactList = InputArtifact[];
export const InputArtifactList = S.Array(InputArtifact);
export type OutputVariableList = string[];
export const OutputVariableList = S.Array(S.String);
export type EnvironmentVariableType =
  | "PLAINTEXT"
  | "SECRETS_MANAGER"
  | (string & {});
export const EnvironmentVariableType = S.String;
export interface EnvironmentVariable {
  name: string;
  value: string;
  type?: EnvironmentVariableType;
}
export const EnvironmentVariable = S.suspend(() =>
  S.Struct({
    name: S.String,
    value: S.String,
    type: S.optional(EnvironmentVariableType),
  }),
).annotate({
  identifier: "EnvironmentVariable",
}) as any as S.Schema<EnvironmentVariable>;
export type EnvironmentVariableList = EnvironmentVariable[];
export const EnvironmentVariableList = S.Array(EnvironmentVariable);
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
export const ActionDeclaration = S.suspend(() =>
  S.Struct({
    name: S.String,
    actionTypeId: ActionTypeId,
    runOrder: S.optional(S.Number),
    configuration: S.optional(ActionConfigurationMap),
    commands: S.optional(CommandList),
    outputArtifacts: S.optional(OutputArtifactList),
    inputArtifacts: S.optional(InputArtifactList),
    outputVariables: S.optional(OutputVariableList),
    roleArn: S.optional(S.String),
    region: S.optional(S.String),
    namespace: S.optional(S.String),
    timeoutInMinutes: S.optional(S.Number),
    environmentVariables: S.optional(EnvironmentVariableList),
  }),
).annotate({
  identifier: "ActionDeclaration",
}) as any as S.Schema<ActionDeclaration>;
export type StageActionDeclarationList = ActionDeclaration[];
export const StageActionDeclarationList = S.Array(ActionDeclaration);
export type Result = "ROLLBACK" | "FAIL" | "RETRY" | "SKIP" | (string & {});
export const Result = S.String;
export type StageRetryMode = "FAILED_ACTIONS" | "ALL_ACTIONS" | (string & {});
export const StageRetryMode = S.String;
export interface RetryConfiguration {
  retryMode?: StageRetryMode;
}
export const RetryConfiguration = S.suspend(() =>
  S.Struct({ retryMode: S.optional(StageRetryMode) }),
).annotate({
  identifier: "RetryConfiguration",
}) as any as S.Schema<RetryConfiguration>;
export type RuleCategory = "Rule" | (string & {});
export const RuleCategory = S.String;
export type RuleOwner = "AWS" | (string & {});
export const RuleOwner = S.String;
export interface RuleTypeId {
  category: RuleCategory;
  owner?: RuleOwner;
  provider: string;
  version?: string;
}
export const RuleTypeId = S.suspend(() =>
  S.Struct({
    category: RuleCategory,
    owner: S.optional(RuleOwner),
    provider: S.String,
    version: S.optional(S.String),
  }),
).annotate({ identifier: "RuleTypeId" }) as any as S.Schema<RuleTypeId>;
export type RuleConfigurationMap = { [key: string]: string | undefined };
export const RuleConfigurationMap = S.Record(
  S.String,
  S.String.pipe(S.optional),
);
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
export const RuleDeclaration = S.suspend(() =>
  S.Struct({
    name: S.String,
    ruleTypeId: RuleTypeId,
    configuration: S.optional(RuleConfigurationMap),
    commands: S.optional(CommandList),
    inputArtifacts: S.optional(InputArtifactList),
    roleArn: S.optional(S.String),
    region: S.optional(S.String),
    timeoutInMinutes: S.optional(S.Number),
  }),
).annotate({
  identifier: "RuleDeclaration",
}) as any as S.Schema<RuleDeclaration>;
export type RuleDeclarationList = RuleDeclaration[];
export const RuleDeclarationList = S.Array(RuleDeclaration);
export interface Condition {
  result?: Result;
  rules?: RuleDeclaration[];
}
export const Condition = S.suspend(() =>
  S.Struct({
    result: S.optional(Result),
    rules: S.optional(RuleDeclarationList),
  }),
).annotate({ identifier: "Condition" }) as any as S.Schema<Condition>;
export type ConditionList = Condition[];
export const ConditionList = S.Array(Condition);
export interface FailureConditions {
  result?: Result;
  retryConfiguration?: RetryConfiguration;
  conditions?: Condition[];
}
export const FailureConditions = S.suspend(() =>
  S.Struct({
    result: S.optional(Result),
    retryConfiguration: S.optional(RetryConfiguration),
    conditions: S.optional(ConditionList),
  }),
).annotate({
  identifier: "FailureConditions",
}) as any as S.Schema<FailureConditions>;
export interface SuccessConditions {
  conditions: Condition[];
}
export const SuccessConditions = S.suspend(() =>
  S.Struct({ conditions: ConditionList }),
).annotate({
  identifier: "SuccessConditions",
}) as any as S.Schema<SuccessConditions>;
export interface BeforeEntryConditions {
  conditions: Condition[];
}
export const BeforeEntryConditions = S.suspend(() =>
  S.Struct({ conditions: ConditionList }),
).annotate({
  identifier: "BeforeEntryConditions",
}) as any as S.Schema<BeforeEntryConditions>;
export interface StageDeclaration {
  name: string;
  blockers?: BlockerDeclaration[];
  actions: ActionDeclaration[];
  onFailure?: FailureConditions;
  onSuccess?: SuccessConditions;
  beforeEntry?: BeforeEntryConditions;
}
export const StageDeclaration = S.suspend(() =>
  S.Struct({
    name: S.String,
    blockers: S.optional(StageBlockerDeclarationList),
    actions: StageActionDeclarationList,
    onFailure: S.optional(FailureConditions),
    onSuccess: S.optional(SuccessConditions),
    beforeEntry: S.optional(BeforeEntryConditions),
  }),
).annotate({
  identifier: "StageDeclaration",
}) as any as S.Schema<StageDeclaration>;
export type PipelineStageDeclarationList = StageDeclaration[];
export const PipelineStageDeclarationList = S.Array(StageDeclaration);
export type ExecutionMode =
  | "QUEUED"
  | "SUPERSEDED"
  | "PARALLEL"
  | (string & {});
export const ExecutionMode = S.String;
export type PipelineType = "V1" | "V2" | (string & {});
export const PipelineType = S.String;
export interface PipelineVariableDeclaration {
  name: string;
  defaultValue?: string;
  description?: string;
}
export const PipelineVariableDeclaration = S.suspend(() =>
  S.Struct({
    name: S.String,
    defaultValue: S.optional(S.String),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "PipelineVariableDeclaration",
}) as any as S.Schema<PipelineVariableDeclaration>;
export type PipelineVariableDeclarationList = PipelineVariableDeclaration[];
export const PipelineVariableDeclarationList = S.Array(
  PipelineVariableDeclaration,
);
export type PipelineTriggerProviderType =
  | "CodeStarSourceConnection"
  | (string & {});
export const PipelineTriggerProviderType = S.String;
export type GitTagPatternList = string[];
export const GitTagPatternList = S.Array(S.String);
export interface GitTagFilterCriteria {
  includes?: string[];
  excludes?: string[];
}
export const GitTagFilterCriteria = S.suspend(() =>
  S.Struct({
    includes: S.optional(GitTagPatternList),
    excludes: S.optional(GitTagPatternList),
  }),
).annotate({
  identifier: "GitTagFilterCriteria",
}) as any as S.Schema<GitTagFilterCriteria>;
export type GitBranchPatternList = string[];
export const GitBranchPatternList = S.Array(S.String);
export interface GitBranchFilterCriteria {
  includes?: string[];
  excludes?: string[];
}
export const GitBranchFilterCriteria = S.suspend(() =>
  S.Struct({
    includes: S.optional(GitBranchPatternList),
    excludes: S.optional(GitBranchPatternList),
  }),
).annotate({
  identifier: "GitBranchFilterCriteria",
}) as any as S.Schema<GitBranchFilterCriteria>;
export type GitFilePathPatternList = string[];
export const GitFilePathPatternList = S.Array(S.String);
export interface GitFilePathFilterCriteria {
  includes?: string[];
  excludes?: string[];
}
export const GitFilePathFilterCriteria = S.suspend(() =>
  S.Struct({
    includes: S.optional(GitFilePathPatternList),
    excludes: S.optional(GitFilePathPatternList),
  }),
).annotate({
  identifier: "GitFilePathFilterCriteria",
}) as any as S.Schema<GitFilePathFilterCriteria>;
export interface GitPushFilter {
  tags?: GitTagFilterCriteria;
  branches?: GitBranchFilterCriteria;
  filePaths?: GitFilePathFilterCriteria;
}
export const GitPushFilter = S.suspend(() =>
  S.Struct({
    tags: S.optional(GitTagFilterCriteria),
    branches: S.optional(GitBranchFilterCriteria),
    filePaths: S.optional(GitFilePathFilterCriteria),
  }),
).annotate({ identifier: "GitPushFilter" }) as any as S.Schema<GitPushFilter>;
export type GitPushFilterList = GitPushFilter[];
export const GitPushFilterList = S.Array(GitPushFilter);
export type GitPullRequestEventType =
  | "OPEN"
  | "UPDATED"
  | "CLOSED"
  | (string & {});
export const GitPullRequestEventType = S.String;
export type GitPullRequestEventTypeList = GitPullRequestEventType[];
export const GitPullRequestEventTypeList = S.Array(GitPullRequestEventType);
export interface GitPullRequestFilter {
  events?: GitPullRequestEventType[];
  branches?: GitBranchFilterCriteria;
  filePaths?: GitFilePathFilterCriteria;
}
export const GitPullRequestFilter = S.suspend(() =>
  S.Struct({
    events: S.optional(GitPullRequestEventTypeList),
    branches: S.optional(GitBranchFilterCriteria),
    filePaths: S.optional(GitFilePathFilterCriteria),
  }),
).annotate({
  identifier: "GitPullRequestFilter",
}) as any as S.Schema<GitPullRequestFilter>;
export type GitPullRequestFilterList = GitPullRequestFilter[];
export const GitPullRequestFilterList = S.Array(GitPullRequestFilter);
export interface GitConfiguration {
  sourceActionName: string;
  push?: GitPushFilter[];
  pullRequest?: GitPullRequestFilter[];
}
export const GitConfiguration = S.suspend(() =>
  S.Struct({
    sourceActionName: S.String,
    push: S.optional(GitPushFilterList),
    pullRequest: S.optional(GitPullRequestFilterList),
  }),
).annotate({
  identifier: "GitConfiguration",
}) as any as S.Schema<GitConfiguration>;
export interface PipelineTriggerDeclaration {
  providerType: PipelineTriggerProviderType;
  gitConfiguration: GitConfiguration;
}
export const PipelineTriggerDeclaration = S.suspend(() =>
  S.Struct({
    providerType: PipelineTriggerProviderType,
    gitConfiguration: GitConfiguration,
  }),
).annotate({
  identifier: "PipelineTriggerDeclaration",
}) as any as S.Schema<PipelineTriggerDeclaration>;
export type PipelineTriggerDeclarationList = PipelineTriggerDeclaration[];
export const PipelineTriggerDeclarationList = S.Array(
  PipelineTriggerDeclaration,
);
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
export const PipelineDeclaration = S.suspend(() =>
  S.Struct({
    name: S.String,
    roleArn: S.String,
    artifactStore: S.optional(ArtifactStore),
    artifactStores: S.optional(ArtifactStoreMap),
    stages: PipelineStageDeclarationList,
    version: S.optional(S.Number),
    executionMode: S.optional(ExecutionMode),
    pipelineType: S.optional(PipelineType),
    variables: S.optional(PipelineVariableDeclarationList),
    triggers: S.optional(PipelineTriggerDeclarationList),
  }),
).annotate({
  identifier: "PipelineDeclaration",
}) as any as S.Schema<PipelineDeclaration>;
export interface CreatePipelineInput {
  pipeline: PipelineDeclaration;
  tags?: Tag[];
}
export const CreatePipelineInput = S.suspend(() =>
  S.Struct({ pipeline: PipelineDeclaration, tags: S.optional(TagList) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePipelineInput",
}) as any as S.Schema<CreatePipelineInput>;
export interface CreatePipelineOutput {
  pipeline?: PipelineDeclaration;
  tags?: Tag[];
}
export const CreatePipelineOutput = S.suspend(() =>
  S.Struct({
    pipeline: S.optional(PipelineDeclaration),
    tags: S.optional(TagList),
  }).pipe(ns),
).annotate({
  identifier: "CreatePipelineOutput",
}) as any as S.Schema<CreatePipelineOutput>;
export interface DeleteCustomActionTypeInput {
  category: ActionCategory;
  provider: string;
  version: string;
}
export const DeleteCustomActionTypeInput = S.suspend(() =>
  S.Struct({
    category: ActionCategory,
    provider: S.String,
    version: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCustomActionTypeInput",
}) as any as S.Schema<DeleteCustomActionTypeInput>;
export interface DeleteCustomActionTypeResponse {}
export const DeleteCustomActionTypeResponse = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteCustomActionTypeResponse",
}) as any as S.Schema<DeleteCustomActionTypeResponse>;
export interface DeletePipelineInput {
  name: string;
}
export const DeletePipelineInput = S.suspend(() =>
  S.Struct({ name: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePipelineInput",
}) as any as S.Schema<DeletePipelineInput>;
export interface DeletePipelineResponse {}
export const DeletePipelineResponse = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeletePipelineResponse",
}) as any as S.Schema<DeletePipelineResponse>;
export interface DeleteWebhookInput {
  name: string;
}
export const DeleteWebhookInput = S.suspend(() =>
  S.Struct({ name: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteWebhookInput",
}) as any as S.Schema<DeleteWebhookInput>;
export interface DeleteWebhookOutput {}
export const DeleteWebhookOutput = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteWebhookOutput",
}) as any as S.Schema<DeleteWebhookOutput>;
export interface DeregisterWebhookWithThirdPartyInput {
  webhookName?: string;
}
export const DeregisterWebhookWithThirdPartyInput = S.suspend(() =>
  S.Struct({ webhookName: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeregisterWebhookWithThirdPartyInput",
}) as any as S.Schema<DeregisterWebhookWithThirdPartyInput>;
export interface DeregisterWebhookWithThirdPartyOutput {}
export const DeregisterWebhookWithThirdPartyOutput = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeregisterWebhookWithThirdPartyOutput",
}) as any as S.Schema<DeregisterWebhookWithThirdPartyOutput>;
export type StageTransitionType = "Inbound" | "Outbound" | (string & {});
export const StageTransitionType = S.String;
export interface DisableStageTransitionInput {
  pipelineName: string;
  stageName: string;
  transitionType: StageTransitionType;
  reason: string;
}
export const DisableStageTransitionInput = S.suspend(() =>
  S.Struct({
    pipelineName: S.String,
    stageName: S.String,
    transitionType: StageTransitionType,
    reason: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisableStageTransitionInput",
}) as any as S.Schema<DisableStageTransitionInput>;
export interface DisableStageTransitionResponse {}
export const DisableStageTransitionResponse = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DisableStageTransitionResponse",
}) as any as S.Schema<DisableStageTransitionResponse>;
export interface EnableStageTransitionInput {
  pipelineName: string;
  stageName: string;
  transitionType: StageTransitionType;
}
export const EnableStageTransitionInput = S.suspend(() =>
  S.Struct({
    pipelineName: S.String,
    stageName: S.String,
    transitionType: StageTransitionType,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "EnableStageTransitionInput",
}) as any as S.Schema<EnableStageTransitionInput>;
export interface EnableStageTransitionResponse {}
export const EnableStageTransitionResponse = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "EnableStageTransitionResponse",
}) as any as S.Schema<EnableStageTransitionResponse>;
export interface GetActionTypeInput {
  category: ActionCategory;
  owner: string;
  provider: string;
  version: string;
}
export const GetActionTypeInput = S.suspend(() =>
  S.Struct({
    category: ActionCategory,
    owner: S.String,
    provider: S.String,
    version: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetActionTypeInput",
}) as any as S.Schema<GetActionTypeInput>;
export interface LambdaExecutorConfiguration {
  lambdaFunctionArn: string;
}
export const LambdaExecutorConfiguration = S.suspend(() =>
  S.Struct({ lambdaFunctionArn: S.String }),
).annotate({
  identifier: "LambdaExecutorConfiguration",
}) as any as S.Schema<LambdaExecutorConfiguration>;
export type PollingAccountList = string[];
export const PollingAccountList = S.Array(S.String);
export type PollingServicePrincipalList = string[];
export const PollingServicePrincipalList = S.Array(S.String);
export interface JobWorkerExecutorConfiguration {
  pollingAccounts?: string[];
  pollingServicePrincipals?: string[];
}
export const JobWorkerExecutorConfiguration = S.suspend(() =>
  S.Struct({
    pollingAccounts: S.optional(PollingAccountList),
    pollingServicePrincipals: S.optional(PollingServicePrincipalList),
  }),
).annotate({
  identifier: "JobWorkerExecutorConfiguration",
}) as any as S.Schema<JobWorkerExecutorConfiguration>;
export interface ExecutorConfiguration {
  lambdaExecutorConfiguration?: LambdaExecutorConfiguration;
  jobWorkerExecutorConfiguration?: JobWorkerExecutorConfiguration;
}
export const ExecutorConfiguration = S.suspend(() =>
  S.Struct({
    lambdaExecutorConfiguration: S.optional(LambdaExecutorConfiguration),
    jobWorkerExecutorConfiguration: S.optional(JobWorkerExecutorConfiguration),
  }),
).annotate({
  identifier: "ExecutorConfiguration",
}) as any as S.Schema<ExecutorConfiguration>;
export type ExecutorType = "JobWorker" | "Lambda" | (string & {});
export const ExecutorType = S.String;
export interface ActionTypeExecutor {
  configuration: ExecutorConfiguration;
  type: ExecutorType;
  policyStatementsTemplate?: string;
  jobTimeout?: number;
}
export const ActionTypeExecutor = S.suspend(() =>
  S.Struct({
    configuration: ExecutorConfiguration,
    type: ExecutorType,
    policyStatementsTemplate: S.optional(S.String),
    jobTimeout: S.optional(S.Number),
  }),
).annotate({
  identifier: "ActionTypeExecutor",
}) as any as S.Schema<ActionTypeExecutor>;
export interface ActionTypeIdentifier {
  category: ActionCategory;
  owner: string;
  provider: string;
  version: string;
}
export const ActionTypeIdentifier = S.suspend(() =>
  S.Struct({
    category: ActionCategory,
    owner: S.String,
    provider: S.String,
    version: S.String,
  }),
).annotate({
  identifier: "ActionTypeIdentifier",
}) as any as S.Schema<ActionTypeIdentifier>;
export interface ActionTypeArtifactDetails {
  minimumCount: number;
  maximumCount: number;
}
export const ActionTypeArtifactDetails = S.suspend(() =>
  S.Struct({ minimumCount: S.Number, maximumCount: S.Number }),
).annotate({
  identifier: "ActionTypeArtifactDetails",
}) as any as S.Schema<ActionTypeArtifactDetails>;
export type AllowedAccounts = string[];
export const AllowedAccounts = S.Array(S.String);
export interface ActionTypePermissions {
  allowedAccounts: string[];
}
export const ActionTypePermissions = S.suspend(() =>
  S.Struct({ allowedAccounts: AllowedAccounts }),
).annotate({
  identifier: "ActionTypePermissions",
}) as any as S.Schema<ActionTypePermissions>;
export interface ActionTypeProperty {
  name: string;
  optional: boolean;
  key: boolean;
  noEcho: boolean;
  queryable?: boolean;
  description?: string;
}
export const ActionTypeProperty = S.suspend(() =>
  S.Struct({
    name: S.String,
    optional: S.Boolean,
    key: S.Boolean,
    noEcho: S.Boolean,
    queryable: S.optional(S.Boolean),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "ActionTypeProperty",
}) as any as S.Schema<ActionTypeProperty>;
export type ActionTypeProperties = ActionTypeProperty[];
export const ActionTypeProperties = S.Array(ActionTypeProperty);
export interface ActionTypeUrls {
  configurationUrl?: string;
  entityUrlTemplate?: string;
  executionUrlTemplate?: string;
  revisionUrlTemplate?: string;
}
export const ActionTypeUrls = S.suspend(() =>
  S.Struct({
    configurationUrl: S.optional(S.String),
    entityUrlTemplate: S.optional(S.String),
    executionUrlTemplate: S.optional(S.String),
    revisionUrlTemplate: S.optional(S.String),
  }),
).annotate({ identifier: "ActionTypeUrls" }) as any as S.Schema<ActionTypeUrls>;
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
export const ActionTypeDeclaration = S.suspend(() =>
  S.Struct({
    description: S.optional(S.String),
    executor: ActionTypeExecutor,
    id: ActionTypeIdentifier,
    inputArtifactDetails: ActionTypeArtifactDetails,
    outputArtifactDetails: ActionTypeArtifactDetails,
    permissions: S.optional(ActionTypePermissions),
    properties: S.optional(ActionTypeProperties),
    urls: S.optional(ActionTypeUrls),
  }),
).annotate({
  identifier: "ActionTypeDeclaration",
}) as any as S.Schema<ActionTypeDeclaration>;
export interface GetActionTypeOutput {
  actionType?: ActionTypeDeclaration;
}
export const GetActionTypeOutput = S.suspend(() =>
  S.Struct({ actionType: S.optional(ActionTypeDeclaration) }).pipe(ns),
).annotate({
  identifier: "GetActionTypeOutput",
}) as any as S.Schema<GetActionTypeOutput>;
export interface GetJobDetailsInput {
  jobId: string;
}
export const GetJobDetailsInput = S.suspend(() =>
  S.Struct({ jobId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetJobDetailsInput",
}) as any as S.Schema<GetJobDetailsInput>;
export interface ActionConfiguration {
  configuration?: { [key: string]: string | undefined };
}
export const ActionConfiguration = S.suspend(() =>
  S.Struct({ configuration: S.optional(ActionConfigurationMap) }),
).annotate({
  identifier: "ActionConfiguration",
}) as any as S.Schema<ActionConfiguration>;
export interface StageContext {
  name?: string;
}
export const StageContext = S.suspend(() =>
  S.Struct({ name: S.optional(S.String) }),
).annotate({ identifier: "StageContext" }) as any as S.Schema<StageContext>;
export interface ActionContext {
  name?: string;
  actionExecutionId?: string;
}
export const ActionContext = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    actionExecutionId: S.optional(S.String),
  }),
).annotate({ identifier: "ActionContext" }) as any as S.Schema<ActionContext>;
export interface PipelineContext {
  pipelineName?: string;
  stage?: StageContext;
  action?: ActionContext;
  pipelineArn?: string;
  pipelineExecutionId?: string;
}
export const PipelineContext = S.suspend(() =>
  S.Struct({
    pipelineName: S.optional(S.String),
    stage: S.optional(StageContext),
    action: S.optional(ActionContext),
    pipelineArn: S.optional(S.String),
    pipelineExecutionId: S.optional(S.String),
  }),
).annotate({
  identifier: "PipelineContext",
}) as any as S.Schema<PipelineContext>;
export type ArtifactLocationType = "S3" | (string & {});
export const ArtifactLocationType = S.String;
export interface S3ArtifactLocation {
  bucketName: string;
  objectKey: string;
}
export const S3ArtifactLocation = S.suspend(() =>
  S.Struct({ bucketName: S.String, objectKey: S.String }),
).annotate({
  identifier: "S3ArtifactLocation",
}) as any as S.Schema<S3ArtifactLocation>;
export interface ArtifactLocation {
  type?: ArtifactLocationType;
  s3Location?: S3ArtifactLocation;
}
export const ArtifactLocation = S.suspend(() =>
  S.Struct({
    type: S.optional(ArtifactLocationType),
    s3Location: S.optional(S3ArtifactLocation),
  }),
).annotate({
  identifier: "ArtifactLocation",
}) as any as S.Schema<ArtifactLocation>;
export interface Artifact {
  name?: string;
  revision?: string;
  location?: ArtifactLocation;
}
export const Artifact = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    revision: S.optional(S.String),
    location: S.optional(ArtifactLocation),
  }),
).annotate({ identifier: "Artifact" }) as any as S.Schema<Artifact>;
export type ArtifactList = Artifact[];
export const ArtifactList = S.Array(Artifact);
export interface AWSSessionCredentials {
  accessKeyId: string | redacted.Redacted<string>;
  secretAccessKey: string | redacted.Redacted<string>;
  sessionToken: string | redacted.Redacted<string>;
}
export const AWSSessionCredentials = S.suspend(() =>
  S.Struct({
    accessKeyId: SensitiveString,
    secretAccessKey: SensitiveString,
    sessionToken: SensitiveString,
  }),
).annotate({
  identifier: "AWSSessionCredentials",
}) as any as S.Schema<AWSSessionCredentials>;
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
export const JobData = S.suspend(() =>
  S.Struct({
    actionTypeId: S.optional(ActionTypeId),
    actionConfiguration: S.optional(ActionConfiguration),
    pipelineContext: S.optional(PipelineContext),
    inputArtifacts: S.optional(ArtifactList),
    outputArtifacts: S.optional(ArtifactList),
    artifactCredentials: S.optional(AWSSessionCredentials),
    continuationToken: S.optional(S.String),
    encryptionKey: S.optional(EncryptionKey),
  }),
).annotate({ identifier: "JobData" }) as any as S.Schema<JobData>;
export interface JobDetails {
  id?: string;
  data?: JobData;
  accountId?: string;
}
export const JobDetails = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    data: S.optional(JobData),
    accountId: S.optional(S.String),
  }),
).annotate({ identifier: "JobDetails" }) as any as S.Schema<JobDetails>;
export interface GetJobDetailsOutput {
  jobDetails?: JobDetails;
}
export const GetJobDetailsOutput = S.suspend(() =>
  S.Struct({ jobDetails: S.optional(JobDetails) }).pipe(ns),
).annotate({
  identifier: "GetJobDetailsOutput",
}) as any as S.Schema<GetJobDetailsOutput>;
export interface GetPipelineInput {
  name: string;
  version?: number;
}
export const GetPipelineInput = S.suspend(() =>
  S.Struct({ name: S.String, version: S.optional(S.Number) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPipelineInput",
}) as any as S.Schema<GetPipelineInput>;
export interface PipelineMetadata {
  pipelineArn?: string;
  created?: Date;
  updated?: Date;
  pollingDisabledAt?: Date;
}
export const PipelineMetadata = S.suspend(() =>
  S.Struct({
    pipelineArn: S.optional(S.String),
    created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    pollingDisabledAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "PipelineMetadata",
}) as any as S.Schema<PipelineMetadata>;
export interface GetPipelineOutput {
  pipeline?: PipelineDeclaration;
  metadata?: PipelineMetadata;
}
export const GetPipelineOutput = S.suspend(() =>
  S.Struct({
    pipeline: S.optional(PipelineDeclaration),
    metadata: S.optional(PipelineMetadata),
  }).pipe(ns),
).annotate({
  identifier: "GetPipelineOutput",
}) as any as S.Schema<GetPipelineOutput>;
export interface GetPipelineExecutionInput {
  pipelineName: string;
  pipelineExecutionId: string;
}
export const GetPipelineExecutionInput = S.suspend(() =>
  S.Struct({ pipelineName: S.String, pipelineExecutionId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPipelineExecutionInput",
}) as any as S.Schema<GetPipelineExecutionInput>;
export type PipelineExecutionStatus =
  | "Cancelled"
  | "InProgress"
  | "Stopped"
  | "Stopping"
  | "Succeeded"
  | "Superseded"
  | "Failed"
  | (string & {});
export const PipelineExecutionStatus = S.String;
export interface ArtifactRevision {
  name?: string;
  revisionId?: string;
  revisionChangeIdentifier?: string;
  revisionSummary?: string;
  created?: Date;
  revisionUrl?: string;
}
export const ArtifactRevision = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    revisionId: S.optional(S.String),
    revisionChangeIdentifier: S.optional(S.String),
    revisionSummary: S.optional(S.String),
    created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    revisionUrl: S.optional(S.String),
  }),
).annotate({
  identifier: "ArtifactRevision",
}) as any as S.Schema<ArtifactRevision>;
export type ArtifactRevisionList = ArtifactRevision[];
export const ArtifactRevisionList = S.Array(ArtifactRevision);
export interface ResolvedPipelineVariable {
  name?: string;
  resolvedValue?: string;
}
export const ResolvedPipelineVariable = S.suspend(() =>
  S.Struct({ name: S.optional(S.String), resolvedValue: S.optional(S.String) }),
).annotate({
  identifier: "ResolvedPipelineVariable",
}) as any as S.Schema<ResolvedPipelineVariable>;
export type ResolvedPipelineVariableList = ResolvedPipelineVariable[];
export const ResolvedPipelineVariableList = S.Array(ResolvedPipelineVariable);
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
export const TriggerType = S.String;
export interface ExecutionTrigger {
  triggerType?: TriggerType;
  triggerDetail?: string;
}
export const ExecutionTrigger = S.suspend(() =>
  S.Struct({
    triggerType: S.optional(TriggerType),
    triggerDetail: S.optional(S.String),
  }),
).annotate({
  identifier: "ExecutionTrigger",
}) as any as S.Schema<ExecutionTrigger>;
export type ExecutionType = "STANDARD" | "ROLLBACK" | (string & {});
export const ExecutionType = S.String;
export interface PipelineRollbackMetadata {
  rollbackTargetPipelineExecutionId?: string;
}
export const PipelineRollbackMetadata = S.suspend(() =>
  S.Struct({ rollbackTargetPipelineExecutionId: S.optional(S.String) }),
).annotate({
  identifier: "PipelineRollbackMetadata",
}) as any as S.Schema<PipelineRollbackMetadata>;
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
export const PipelineExecution = S.suspend(() =>
  S.Struct({
    pipelineName: S.optional(S.String),
    pipelineVersion: S.optional(S.Number),
    pipelineExecutionId: S.optional(S.String),
    status: S.optional(PipelineExecutionStatus),
    statusSummary: S.optional(S.String),
    artifactRevisions: S.optional(ArtifactRevisionList),
    variables: S.optional(ResolvedPipelineVariableList),
    trigger: S.optional(ExecutionTrigger),
    executionMode: S.optional(ExecutionMode),
    executionType: S.optional(ExecutionType),
    rollbackMetadata: S.optional(PipelineRollbackMetadata),
  }),
).annotate({
  identifier: "PipelineExecution",
}) as any as S.Schema<PipelineExecution>;
export interface GetPipelineExecutionOutput {
  pipelineExecution?: PipelineExecution;
}
export const GetPipelineExecutionOutput = S.suspend(() =>
  S.Struct({ pipelineExecution: S.optional(PipelineExecution) }).pipe(ns),
).annotate({
  identifier: "GetPipelineExecutionOutput",
}) as any as S.Schema<GetPipelineExecutionOutput>;
export interface GetPipelineStateInput {
  name: string;
}
export const GetPipelineStateInput = S.suspend(() =>
  S.Struct({ name: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPipelineStateInput",
}) as any as S.Schema<GetPipelineStateInput>;
export type StageExecutionStatus =
  | "Cancelled"
  | "InProgress"
  | "Failed"
  | "Stopped"
  | "Stopping"
  | "Succeeded"
  | "Skipped"
  | (string & {});
export const StageExecutionStatus = S.String;
export interface StageExecution {
  pipelineExecutionId: string;
  status: StageExecutionStatus;
  type?: ExecutionType;
}
export const StageExecution = S.suspend(() =>
  S.Struct({
    pipelineExecutionId: S.String,
    status: StageExecutionStatus,
    type: S.optional(ExecutionType),
  }),
).annotate({ identifier: "StageExecution" }) as any as S.Schema<StageExecution>;
export type StageExecutionList = StageExecution[];
export const StageExecutionList = S.Array(StageExecution);
export interface TransitionState {
  enabled?: boolean;
  lastChangedBy?: string;
  lastChangedAt?: Date;
  disabledReason?: string;
}
export const TransitionState = S.suspend(() =>
  S.Struct({
    enabled: S.optional(S.Boolean),
    lastChangedBy: S.optional(S.String),
    lastChangedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    disabledReason: S.optional(S.String),
  }),
).annotate({
  identifier: "TransitionState",
}) as any as S.Schema<TransitionState>;
export interface ActionRevision {
  revisionId: string;
  revisionChangeId: string;
  created: Date;
}
export const ActionRevision = S.suspend(() =>
  S.Struct({
    revisionId: S.String,
    revisionChangeId: S.String,
    created: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "ActionRevision" }) as any as S.Schema<ActionRevision>;
export type ActionExecutionStatus =
  | "InProgress"
  | "Abandoned"
  | "Succeeded"
  | "Failed"
  | (string & {});
export const ActionExecutionStatus = S.String;
export interface ErrorDetails {
  code?: string;
  message?: string;
}
export const ErrorDetails = S.suspend(() =>
  S.Struct({ code: S.optional(S.String), message: S.optional(S.String) }),
).annotate({ identifier: "ErrorDetails" }) as any as S.Schema<ErrorDetails>;
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
export const ActionExecution = S.suspend(() =>
  S.Struct({
    actionExecutionId: S.optional(S.String),
    status: S.optional(ActionExecutionStatus),
    summary: S.optional(S.String),
    lastStatusChange: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    token: S.optional(S.String),
    lastUpdatedBy: S.optional(S.String),
    externalExecutionId: S.optional(S.String),
    externalExecutionUrl: S.optional(S.String),
    percentComplete: S.optional(S.Number),
    errorDetails: S.optional(ErrorDetails),
    logStreamARN: S.optional(S.String),
  }),
).annotate({
  identifier: "ActionExecution",
}) as any as S.Schema<ActionExecution>;
export interface ActionState {
  actionName?: string;
  currentRevision?: ActionRevision;
  latestExecution?: ActionExecution;
  entityUrl?: string;
  revisionUrl?: string;
}
export const ActionState = S.suspend(() =>
  S.Struct({
    actionName: S.optional(S.String),
    currentRevision: S.optional(ActionRevision),
    latestExecution: S.optional(ActionExecution),
    entityUrl: S.optional(S.String),
    revisionUrl: S.optional(S.String),
  }),
).annotate({ identifier: "ActionState" }) as any as S.Schema<ActionState>;
export type ActionStateList = ActionState[];
export const ActionStateList = S.Array(ActionState);
export type ConditionExecutionStatus =
  | "InProgress"
  | "Failed"
  | "Errored"
  | "Succeeded"
  | "Cancelled"
  | "Abandoned"
  | "Overridden"
  | (string & {});
export const ConditionExecutionStatus = S.String;
export interface StageConditionsExecution {
  status?: ConditionExecutionStatus;
  summary?: string;
}
export const StageConditionsExecution = S.suspend(() =>
  S.Struct({
    status: S.optional(ConditionExecutionStatus),
    summary: S.optional(S.String),
  }),
).annotate({
  identifier: "StageConditionsExecution",
}) as any as S.Schema<StageConditionsExecution>;
export interface ConditionExecution {
  status?: ConditionExecutionStatus;
  summary?: string;
  lastStatusChange?: Date;
}
export const ConditionExecution = S.suspend(() =>
  S.Struct({
    status: S.optional(ConditionExecutionStatus),
    summary: S.optional(S.String),
    lastStatusChange: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "ConditionExecution",
}) as any as S.Schema<ConditionExecution>;
export interface RuleRevision {
  revisionId: string;
  revisionChangeId: string;
  created: Date;
}
export const RuleRevision = S.suspend(() =>
  S.Struct({
    revisionId: S.String,
    revisionChangeId: S.String,
    created: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "RuleRevision" }) as any as S.Schema<RuleRevision>;
export type RuleExecutionStatus =
  | "InProgress"
  | "Abandoned"
  | "Succeeded"
  | "Failed"
  | (string & {});
export const RuleExecutionStatus = S.String;
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
export const RuleExecution = S.suspend(() =>
  S.Struct({
    ruleExecutionId: S.optional(S.String),
    status: S.optional(RuleExecutionStatus),
    summary: S.optional(S.String),
    lastStatusChange: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    token: S.optional(S.String),
    lastUpdatedBy: S.optional(S.String),
    externalExecutionId: S.optional(S.String),
    externalExecutionUrl: S.optional(S.String),
    errorDetails: S.optional(ErrorDetails),
  }),
).annotate({ identifier: "RuleExecution" }) as any as S.Schema<RuleExecution>;
export interface RuleState {
  ruleName?: string;
  currentRevision?: RuleRevision;
  latestExecution?: RuleExecution;
  entityUrl?: string;
  revisionUrl?: string;
}
export const RuleState = S.suspend(() =>
  S.Struct({
    ruleName: S.optional(S.String),
    currentRevision: S.optional(RuleRevision),
    latestExecution: S.optional(RuleExecution),
    entityUrl: S.optional(S.String),
    revisionUrl: S.optional(S.String),
  }),
).annotate({ identifier: "RuleState" }) as any as S.Schema<RuleState>;
export type RuleStateList = RuleState[];
export const RuleStateList = S.Array(RuleState);
export interface ConditionState {
  latestExecution?: ConditionExecution;
  ruleStates?: RuleState[];
}
export const ConditionState = S.suspend(() =>
  S.Struct({
    latestExecution: S.optional(ConditionExecution),
    ruleStates: S.optional(RuleStateList),
  }),
).annotate({ identifier: "ConditionState" }) as any as S.Schema<ConditionState>;
export type ConditionStateList = ConditionState[];
export const ConditionStateList = S.Array(ConditionState);
export interface StageConditionState {
  latestExecution?: StageConditionsExecution;
  conditionStates?: ConditionState[];
}
export const StageConditionState = S.suspend(() =>
  S.Struct({
    latestExecution: S.optional(StageConditionsExecution),
    conditionStates: S.optional(ConditionStateList),
  }),
).annotate({
  identifier: "StageConditionState",
}) as any as S.Schema<StageConditionState>;
export type RetryTrigger =
  | "AutomatedStageRetry"
  | "ManualStageRetry"
  | (string & {});
export const RetryTrigger = S.String;
export interface RetryStageMetadata {
  autoStageRetryAttempt?: number;
  manualStageRetryAttempt?: number;
  latestRetryTrigger?: RetryTrigger;
}
export const RetryStageMetadata = S.suspend(() =>
  S.Struct({
    autoStageRetryAttempt: S.optional(S.Number),
    manualStageRetryAttempt: S.optional(S.Number),
    latestRetryTrigger: S.optional(RetryTrigger),
  }),
).annotate({
  identifier: "RetryStageMetadata",
}) as any as S.Schema<RetryStageMetadata>;
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
export const StageState = S.suspend(() =>
  S.Struct({
    stageName: S.optional(S.String),
    inboundExecution: S.optional(StageExecution),
    inboundExecutions: S.optional(StageExecutionList),
    inboundTransitionState: S.optional(TransitionState),
    actionStates: S.optional(ActionStateList),
    latestExecution: S.optional(StageExecution),
    beforeEntryConditionState: S.optional(StageConditionState),
    onSuccessConditionState: S.optional(StageConditionState),
    onFailureConditionState: S.optional(StageConditionState),
    retryStageMetadata: S.optional(RetryStageMetadata),
  }),
).annotate({ identifier: "StageState" }) as any as S.Schema<StageState>;
export type StageStateList = StageState[];
export const StageStateList = S.Array(StageState);
export interface GetPipelineStateOutput {
  pipelineName?: string;
  pipelineVersion?: number;
  stageStates?: StageState[];
  created?: Date;
  updated?: Date;
}
export const GetPipelineStateOutput = S.suspend(() =>
  S.Struct({
    pipelineName: S.optional(S.String),
    pipelineVersion: S.optional(S.Number),
    stageStates: S.optional(StageStateList),
    created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(ns),
).annotate({
  identifier: "GetPipelineStateOutput",
}) as any as S.Schema<GetPipelineStateOutput>;
export interface GetThirdPartyJobDetailsInput {
  jobId: string;
  clientToken: string;
}
export const GetThirdPartyJobDetailsInput = S.suspend(() =>
  S.Struct({ jobId: S.String, clientToken: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetThirdPartyJobDetailsInput",
}) as any as S.Schema<GetThirdPartyJobDetailsInput>;
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
export const ThirdPartyJobData = S.suspend(() =>
  S.Struct({
    actionTypeId: S.optional(ActionTypeId),
    actionConfiguration: S.optional(ActionConfiguration),
    pipelineContext: S.optional(PipelineContext),
    inputArtifacts: S.optional(ArtifactList),
    outputArtifacts: S.optional(ArtifactList),
    artifactCredentials: S.optional(AWSSessionCredentials),
    continuationToken: S.optional(S.String),
    encryptionKey: S.optional(EncryptionKey),
  }),
).annotate({
  identifier: "ThirdPartyJobData",
}) as any as S.Schema<ThirdPartyJobData>;
export interface ThirdPartyJobDetails {
  id?: string;
  data?: ThirdPartyJobData;
  nonce?: string;
}
export const ThirdPartyJobDetails = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    data: S.optional(ThirdPartyJobData),
    nonce: S.optional(S.String),
  }),
).annotate({
  identifier: "ThirdPartyJobDetails",
}) as any as S.Schema<ThirdPartyJobDetails>;
export interface GetThirdPartyJobDetailsOutput {
  jobDetails?: ThirdPartyJobDetails;
}
export const GetThirdPartyJobDetailsOutput = S.suspend(() =>
  S.Struct({ jobDetails: S.optional(ThirdPartyJobDetails) }).pipe(ns),
).annotate({
  identifier: "GetThirdPartyJobDetailsOutput",
}) as any as S.Schema<GetThirdPartyJobDetailsOutput>;
export type StartTimeRange = "Latest" | "All" | (string & {});
export const StartTimeRange = S.String;
export interface LatestInPipelineExecutionFilter {
  pipelineExecutionId: string;
  startTimeRange: StartTimeRange;
}
export const LatestInPipelineExecutionFilter = S.suspend(() =>
  S.Struct({ pipelineExecutionId: S.String, startTimeRange: StartTimeRange }),
).annotate({
  identifier: "LatestInPipelineExecutionFilter",
}) as any as S.Schema<LatestInPipelineExecutionFilter>;
export interface ActionExecutionFilter {
  pipelineExecutionId?: string;
  latestInPipelineExecution?: LatestInPipelineExecutionFilter;
}
export const ActionExecutionFilter = S.suspend(() =>
  S.Struct({
    pipelineExecutionId: S.optional(S.String),
    latestInPipelineExecution: S.optional(LatestInPipelineExecutionFilter),
  }),
).annotate({
  identifier: "ActionExecutionFilter",
}) as any as S.Schema<ActionExecutionFilter>;
export interface ListActionExecutionsInput {
  pipelineName: string;
  filter?: ActionExecutionFilter;
  maxResults?: number;
  nextToken?: string;
}
export const ListActionExecutionsInput = S.suspend(() =>
  S.Struct({
    pipelineName: S.String,
    filter: S.optional(ActionExecutionFilter),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListActionExecutionsInput",
}) as any as S.Schema<ListActionExecutionsInput>;
export type ResolvedActionConfigurationMap = {
  [key: string]: string | undefined;
};
export const ResolvedActionConfigurationMap = S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface S3Location {
  bucket?: string;
  key?: string;
}
export const S3Location = S.suspend(() =>
  S.Struct({ bucket: S.optional(S.String), key: S.optional(S.String) }),
).annotate({ identifier: "S3Location" }) as any as S.Schema<S3Location>;
export interface ArtifactDetail {
  name?: string;
  s3location?: S3Location;
}
export const ArtifactDetail = S.suspend(() =>
  S.Struct({ name: S.optional(S.String), s3location: S.optional(S3Location) }),
).annotate({ identifier: "ArtifactDetail" }) as any as S.Schema<ArtifactDetail>;
export type ArtifactDetailList = ArtifactDetail[];
export const ArtifactDetailList = S.Array(ArtifactDetail);
export interface ActionExecutionInput {
  actionTypeId?: ActionTypeId;
  configuration?: { [key: string]: string | undefined };
  resolvedConfiguration?: { [key: string]: string | undefined };
  roleArn?: string;
  region?: string;
  inputArtifacts?: ArtifactDetail[];
  namespace?: string;
}
export const ActionExecutionInput = S.suspend(() =>
  S.Struct({
    actionTypeId: S.optional(ActionTypeId),
    configuration: S.optional(ActionConfigurationMap),
    resolvedConfiguration: S.optional(ResolvedActionConfigurationMap),
    roleArn: S.optional(S.String),
    region: S.optional(S.String),
    inputArtifacts: S.optional(ArtifactDetailList),
    namespace: S.optional(S.String),
  }),
).annotate({
  identifier: "ActionExecutionInput",
}) as any as S.Schema<ActionExecutionInput>;
export interface ActionExecutionResult {
  externalExecutionId?: string;
  externalExecutionSummary?: string;
  externalExecutionUrl?: string;
  errorDetails?: ErrorDetails;
  logStreamARN?: string;
}
export const ActionExecutionResult = S.suspend(() =>
  S.Struct({
    externalExecutionId: S.optional(S.String),
    externalExecutionSummary: S.optional(S.String),
    externalExecutionUrl: S.optional(S.String),
    errorDetails: S.optional(ErrorDetails),
    logStreamARN: S.optional(S.String),
  }),
).annotate({
  identifier: "ActionExecutionResult",
}) as any as S.Schema<ActionExecutionResult>;
export type OutputVariablesMap = { [key: string]: string | undefined };
export const OutputVariablesMap = S.Record(S.String, S.String.pipe(S.optional));
export interface ActionExecutionOutput {
  outputArtifacts?: ArtifactDetail[];
  executionResult?: ActionExecutionResult;
  outputVariables?: { [key: string]: string | undefined };
}
export const ActionExecutionOutput = S.suspend(() =>
  S.Struct({
    outputArtifacts: S.optional(ArtifactDetailList),
    executionResult: S.optional(ActionExecutionResult),
    outputVariables: S.optional(OutputVariablesMap),
  }),
).annotate({
  identifier: "ActionExecutionOutput",
}) as any as S.Schema<ActionExecutionOutput>;
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
export const ActionExecutionDetail = S.suspend(() =>
  S.Struct({
    pipelineExecutionId: S.optional(S.String),
    actionExecutionId: S.optional(S.String),
    pipelineVersion: S.optional(S.Number),
    stageName: S.optional(S.String),
    actionName: S.optional(S.String),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedBy: S.optional(S.String),
    status: S.optional(ActionExecutionStatus),
    input: S.optional(ActionExecutionInput),
    output: S.optional(ActionExecutionOutput),
  }),
).annotate({
  identifier: "ActionExecutionDetail",
}) as any as S.Schema<ActionExecutionDetail>;
export type ActionExecutionDetailList = ActionExecutionDetail[];
export const ActionExecutionDetailList = S.Array(ActionExecutionDetail);
export interface ListActionExecutionsOutput {
  actionExecutionDetails?: ActionExecutionDetail[];
  nextToken?: string;
}
export const ListActionExecutionsOutput = S.suspend(() =>
  S.Struct({
    actionExecutionDetails: S.optional(ActionExecutionDetailList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListActionExecutionsOutput",
}) as any as S.Schema<ListActionExecutionsOutput>;
export interface ListActionTypesInput {
  actionOwnerFilter?: ActionOwner;
  nextToken?: string;
  regionFilter?: string;
}
export const ListActionTypesInput = S.suspend(() =>
  S.Struct({
    actionOwnerFilter: S.optional(ActionOwner),
    nextToken: S.optional(S.String),
    regionFilter: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListActionTypesInput",
}) as any as S.Schema<ListActionTypesInput>;
export type ActionTypeList = ActionType[];
export const ActionTypeList = S.Array(ActionType);
export interface ListActionTypesOutput {
  actionTypes: ActionType[];
  nextToken?: string;
}
export const ListActionTypesOutput = S.suspend(() =>
  S.Struct({
    actionTypes: ActionTypeList,
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListActionTypesOutput",
}) as any as S.Schema<ListActionTypesOutput>;
export type TargetFilterName = "TARGET_STATUS" | (string & {});
export const TargetFilterName = S.String;
export type TargetFilterValueList = string[];
export const TargetFilterValueList = S.Array(S.String);
export interface TargetFilter {
  name?: TargetFilterName;
  values?: string[];
}
export const TargetFilter = S.suspend(() =>
  S.Struct({
    name: S.optional(TargetFilterName),
    values: S.optional(TargetFilterValueList),
  }),
).annotate({ identifier: "TargetFilter" }) as any as S.Schema<TargetFilter>;
export type TargetFilterList = TargetFilter[];
export const TargetFilterList = S.Array(TargetFilter);
export interface ListDeployActionExecutionTargetsInput {
  pipelineName?: string;
  actionExecutionId: string;
  filters?: TargetFilter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListDeployActionExecutionTargetsInput = S.suspend(() =>
  S.Struct({
    pipelineName: S.optional(S.String),
    actionExecutionId: S.String,
    filters: S.optional(TargetFilterList),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDeployActionExecutionTargetsInput",
}) as any as S.Schema<ListDeployActionExecutionTargetsInput>;
export interface DeployTargetEventContext {
  ssmCommandId?: string;
  message?: string;
}
export const DeployTargetEventContext = S.suspend(() =>
  S.Struct({
    ssmCommandId: S.optional(S.String),
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "DeployTargetEventContext",
}) as any as S.Schema<DeployTargetEventContext>;
export interface DeployTargetEvent {
  name?: string;
  status?: string;
  startTime?: Date;
  endTime?: Date;
  context?: DeployTargetEventContext;
}
export const DeployTargetEvent = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    status: S.optional(S.String),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    context: S.optional(DeployTargetEventContext),
  }),
).annotate({
  identifier: "DeployTargetEvent",
}) as any as S.Schema<DeployTargetEvent>;
export type DeployTargetEventList = DeployTargetEvent[];
export const DeployTargetEventList = S.Array(DeployTargetEvent);
export interface DeployActionExecutionTarget {
  targetId?: string;
  targetType?: string;
  status?: string;
  startTime?: Date;
  endTime?: Date;
  events?: DeployTargetEvent[];
}
export const DeployActionExecutionTarget = S.suspend(() =>
  S.Struct({
    targetId: S.optional(S.String),
    targetType: S.optional(S.String),
    status: S.optional(S.String),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    events: S.optional(DeployTargetEventList),
  }),
).annotate({
  identifier: "DeployActionExecutionTarget",
}) as any as S.Schema<DeployActionExecutionTarget>;
export type DeployActionExecutionTargetList = DeployActionExecutionTarget[];
export const DeployActionExecutionTargetList = S.Array(
  DeployActionExecutionTarget,
);
export interface ListDeployActionExecutionTargetsOutput {
  targets?: DeployActionExecutionTarget[];
  nextToken?: string;
}
export const ListDeployActionExecutionTargetsOutput = S.suspend(() =>
  S.Struct({
    targets: S.optional(DeployActionExecutionTargetList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListDeployActionExecutionTargetsOutput",
}) as any as S.Schema<ListDeployActionExecutionTargetsOutput>;
export interface SucceededInStageFilter {
  stageName?: string;
}
export const SucceededInStageFilter = S.suspend(() =>
  S.Struct({ stageName: S.optional(S.String) }),
).annotate({
  identifier: "SucceededInStageFilter",
}) as any as S.Schema<SucceededInStageFilter>;
export interface PipelineExecutionFilter {
  succeededInStage?: SucceededInStageFilter;
}
export const PipelineExecutionFilter = S.suspend(() =>
  S.Struct({ succeededInStage: S.optional(SucceededInStageFilter) }),
).annotate({
  identifier: "PipelineExecutionFilter",
}) as any as S.Schema<PipelineExecutionFilter>;
export interface ListPipelineExecutionsInput {
  pipelineName: string;
  maxResults?: number;
  filter?: PipelineExecutionFilter;
  nextToken?: string;
}
export const ListPipelineExecutionsInput = S.suspend(() =>
  S.Struct({
    pipelineName: S.String,
    maxResults: S.optional(S.Number),
    filter: S.optional(PipelineExecutionFilter),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPipelineExecutionsInput",
}) as any as S.Schema<ListPipelineExecutionsInput>;
export interface SourceRevision {
  actionName: string;
  revisionId?: string;
  revisionSummary?: string;
  revisionUrl?: string;
}
export const SourceRevision = S.suspend(() =>
  S.Struct({
    actionName: S.String,
    revisionId: S.optional(S.String),
    revisionSummary: S.optional(S.String),
    revisionUrl: S.optional(S.String),
  }),
).annotate({ identifier: "SourceRevision" }) as any as S.Schema<SourceRevision>;
export type SourceRevisionList = SourceRevision[];
export const SourceRevisionList = S.Array(SourceRevision);
export interface StopExecutionTrigger {
  reason?: string;
}
export const StopExecutionTrigger = S.suspend(() =>
  S.Struct({ reason: S.optional(S.String) }),
).annotate({
  identifier: "StopExecutionTrigger",
}) as any as S.Schema<StopExecutionTrigger>;
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
export const PipelineExecutionSummary = S.suspend(() =>
  S.Struct({
    pipelineExecutionId: S.optional(S.String),
    status: S.optional(PipelineExecutionStatus),
    statusSummary: S.optional(S.String),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    sourceRevisions: S.optional(SourceRevisionList),
    trigger: S.optional(ExecutionTrigger),
    stopTrigger: S.optional(StopExecutionTrigger),
    executionMode: S.optional(ExecutionMode),
    executionType: S.optional(ExecutionType),
    rollbackMetadata: S.optional(PipelineRollbackMetadata),
  }),
).annotate({
  identifier: "PipelineExecutionSummary",
}) as any as S.Schema<PipelineExecutionSummary>;
export type PipelineExecutionSummaryList = PipelineExecutionSummary[];
export const PipelineExecutionSummaryList = S.Array(PipelineExecutionSummary);
export interface ListPipelineExecutionsOutput {
  pipelineExecutionSummaries?: PipelineExecutionSummary[];
  nextToken?: string;
}
export const ListPipelineExecutionsOutput = S.suspend(() =>
  S.Struct({
    pipelineExecutionSummaries: S.optional(PipelineExecutionSummaryList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListPipelineExecutionsOutput",
}) as any as S.Schema<ListPipelineExecutionsOutput>;
export interface ListPipelinesInput {
  nextToken?: string;
  maxResults?: number;
}
export const ListPipelinesInput = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPipelinesInput",
}) as any as S.Schema<ListPipelinesInput>;
export interface PipelineSummary {
  name?: string;
  version?: number;
  pipelineType?: PipelineType;
  executionMode?: ExecutionMode;
  created?: Date;
  updated?: Date;
}
export const PipelineSummary = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    version: S.optional(S.Number),
    pipelineType: S.optional(PipelineType),
    executionMode: S.optional(ExecutionMode),
    created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "PipelineSummary",
}) as any as S.Schema<PipelineSummary>;
export type PipelineList = PipelineSummary[];
export const PipelineList = S.Array(PipelineSummary);
export interface ListPipelinesOutput {
  pipelines?: PipelineSummary[];
  nextToken?: string;
}
export const ListPipelinesOutput = S.suspend(() =>
  S.Struct({
    pipelines: S.optional(PipelineList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListPipelinesOutput",
}) as any as S.Schema<ListPipelinesOutput>;
export interface RuleExecutionFilter {
  pipelineExecutionId?: string;
  latestInPipelineExecution?: LatestInPipelineExecutionFilter;
}
export const RuleExecutionFilter = S.suspend(() =>
  S.Struct({
    pipelineExecutionId: S.optional(S.String),
    latestInPipelineExecution: S.optional(LatestInPipelineExecutionFilter),
  }),
).annotate({
  identifier: "RuleExecutionFilter",
}) as any as S.Schema<RuleExecutionFilter>;
export interface ListRuleExecutionsInput {
  pipelineName: string;
  filter?: RuleExecutionFilter;
  maxResults?: number;
  nextToken?: string;
}
export const ListRuleExecutionsInput = S.suspend(() =>
  S.Struct({
    pipelineName: S.String,
    filter: S.optional(RuleExecutionFilter),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRuleExecutionsInput",
}) as any as S.Schema<ListRuleExecutionsInput>;
export type ResolvedRuleConfigurationMap = {
  [key: string]: string | undefined;
};
export const ResolvedRuleConfigurationMap = S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface RuleExecutionInput {
  ruleTypeId?: RuleTypeId;
  configuration?: { [key: string]: string | undefined };
  resolvedConfiguration?: { [key: string]: string | undefined };
  roleArn?: string;
  region?: string;
  inputArtifacts?: ArtifactDetail[];
}
export const RuleExecutionInput = S.suspend(() =>
  S.Struct({
    ruleTypeId: S.optional(RuleTypeId),
    configuration: S.optional(RuleConfigurationMap),
    resolvedConfiguration: S.optional(ResolvedRuleConfigurationMap),
    roleArn: S.optional(S.String),
    region: S.optional(S.String),
    inputArtifacts: S.optional(ArtifactDetailList),
  }),
).annotate({
  identifier: "RuleExecutionInput",
}) as any as S.Schema<RuleExecutionInput>;
export interface RuleExecutionResult {
  externalExecutionId?: string;
  externalExecutionSummary?: string;
  externalExecutionUrl?: string;
  errorDetails?: ErrorDetails;
}
export const RuleExecutionResult = S.suspend(() =>
  S.Struct({
    externalExecutionId: S.optional(S.String),
    externalExecutionSummary: S.optional(S.String),
    externalExecutionUrl: S.optional(S.String),
    errorDetails: S.optional(ErrorDetails),
  }),
).annotate({
  identifier: "RuleExecutionResult",
}) as any as S.Schema<RuleExecutionResult>;
export interface RuleExecutionOutput {
  executionResult?: RuleExecutionResult;
}
export const RuleExecutionOutput = S.suspend(() =>
  S.Struct({ executionResult: S.optional(RuleExecutionResult) }),
).annotate({
  identifier: "RuleExecutionOutput",
}) as any as S.Schema<RuleExecutionOutput>;
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
export const RuleExecutionDetail = S.suspend(() =>
  S.Struct({
    pipelineExecutionId: S.optional(S.String),
    ruleExecutionId: S.optional(S.String),
    pipelineVersion: S.optional(S.Number),
    stageName: S.optional(S.String),
    ruleName: S.optional(S.String),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedBy: S.optional(S.String),
    status: S.optional(RuleExecutionStatus),
    input: S.optional(RuleExecutionInput),
    output: S.optional(RuleExecutionOutput),
  }),
).annotate({
  identifier: "RuleExecutionDetail",
}) as any as S.Schema<RuleExecutionDetail>;
export type RuleExecutionDetailList = RuleExecutionDetail[];
export const RuleExecutionDetailList = S.Array(RuleExecutionDetail);
export interface ListRuleExecutionsOutput {
  ruleExecutionDetails?: RuleExecutionDetail[];
  nextToken?: string;
}
export const ListRuleExecutionsOutput = S.suspend(() =>
  S.Struct({
    ruleExecutionDetails: S.optional(RuleExecutionDetailList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListRuleExecutionsOutput",
}) as any as S.Schema<ListRuleExecutionsOutput>;
export interface ListRuleTypesInput {
  ruleOwnerFilter?: RuleOwner;
  regionFilter?: string;
}
export const ListRuleTypesInput = S.suspend(() =>
  S.Struct({
    ruleOwnerFilter: S.optional(RuleOwner),
    regionFilter: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRuleTypesInput",
}) as any as S.Schema<ListRuleTypesInput>;
export interface RuleTypeSettings {
  thirdPartyConfigurationUrl?: string;
  entityUrlTemplate?: string;
  executionUrlTemplate?: string;
  revisionUrlTemplate?: string;
}
export const RuleTypeSettings = S.suspend(() =>
  S.Struct({
    thirdPartyConfigurationUrl: S.optional(S.String),
    entityUrlTemplate: S.optional(S.String),
    executionUrlTemplate: S.optional(S.String),
    revisionUrlTemplate: S.optional(S.String),
  }),
).annotate({
  identifier: "RuleTypeSettings",
}) as any as S.Schema<RuleTypeSettings>;
export type RuleConfigurationPropertyType =
  | "String"
  | "Number"
  | "Boolean"
  | (string & {});
export const RuleConfigurationPropertyType = S.String;
export interface RuleConfigurationProperty {
  name: string;
  required: boolean;
  key: boolean;
  secret: boolean;
  queryable?: boolean;
  description?: string;
  type?: RuleConfigurationPropertyType;
}
export const RuleConfigurationProperty = S.suspend(() =>
  S.Struct({
    name: S.String,
    required: S.Boolean,
    key: S.Boolean,
    secret: S.Boolean,
    queryable: S.optional(S.Boolean),
    description: S.optional(S.String),
    type: S.optional(RuleConfigurationPropertyType),
  }),
).annotate({
  identifier: "RuleConfigurationProperty",
}) as any as S.Schema<RuleConfigurationProperty>;
export type RuleConfigurationPropertyList = RuleConfigurationProperty[];
export const RuleConfigurationPropertyList = S.Array(RuleConfigurationProperty);
export interface RuleType {
  id: RuleTypeId;
  settings?: RuleTypeSettings;
  ruleConfigurationProperties?: RuleConfigurationProperty[];
  inputArtifactDetails: ArtifactDetails;
}
export const RuleType = S.suspend(() =>
  S.Struct({
    id: RuleTypeId,
    settings: S.optional(RuleTypeSettings),
    ruleConfigurationProperties: S.optional(RuleConfigurationPropertyList),
    inputArtifactDetails: ArtifactDetails,
  }),
).annotate({ identifier: "RuleType" }) as any as S.Schema<RuleType>;
export type RuleTypeList = RuleType[];
export const RuleTypeList = S.Array(RuleType);
export interface ListRuleTypesOutput {
  ruleTypes: RuleType[];
}
export const ListRuleTypesOutput = S.suspend(() =>
  S.Struct({ ruleTypes: RuleTypeList }).pipe(ns),
).annotate({
  identifier: "ListRuleTypesOutput",
}) as any as S.Schema<ListRuleTypesOutput>;
export interface ListTagsForResourceInput {
  resourceArn: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListTagsForResourceInput = S.suspend(() =>
  S.Struct({
    resourceArn: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export interface ListTagsForResourceOutput {
  tags?: Tag[];
  nextToken?: string;
}
export const ListTagsForResourceOutput = S.suspend(() =>
  S.Struct({ tags: S.optional(TagList), nextToken: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export interface ListWebhooksInput {
  NextToken?: string;
  MaxResults?: number;
}
export const ListWebhooksInput = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWebhooksInput",
}) as any as S.Schema<ListWebhooksInput>;
export interface WebhookFilterRule {
  jsonPath: string;
  matchEquals?: string;
}
export const WebhookFilterRule = S.suspend(() =>
  S.Struct({ jsonPath: S.String, matchEquals: S.optional(S.String) }),
).annotate({
  identifier: "WebhookFilterRule",
}) as any as S.Schema<WebhookFilterRule>;
export type WebhookFilters = WebhookFilterRule[];
export const WebhookFilters = S.Array(WebhookFilterRule);
export type WebhookAuthenticationType =
  | "GITHUB_HMAC"
  | "IP"
  | "UNAUTHENTICATED"
  | (string & {});
export const WebhookAuthenticationType = S.String;
export interface WebhookAuthConfiguration {
  AllowedIPRange?: string;
  SecretToken?: string;
}
export const WebhookAuthConfiguration = S.suspend(() =>
  S.Struct({
    AllowedIPRange: S.optional(S.String),
    SecretToken: S.optional(S.String),
  }),
).annotate({
  identifier: "WebhookAuthConfiguration",
}) as any as S.Schema<WebhookAuthConfiguration>;
export interface WebhookDefinition {
  name: string;
  targetPipeline: string;
  targetAction: string;
  filters: WebhookFilterRule[];
  authentication: WebhookAuthenticationType;
  authenticationConfiguration: WebhookAuthConfiguration;
}
export const WebhookDefinition = S.suspend(() =>
  S.Struct({
    name: S.String,
    targetPipeline: S.String,
    targetAction: S.String,
    filters: WebhookFilters,
    authentication: WebhookAuthenticationType,
    authenticationConfiguration: WebhookAuthConfiguration,
  }),
).annotate({
  identifier: "WebhookDefinition",
}) as any as S.Schema<WebhookDefinition>;
export interface ListWebhookItem {
  definition: WebhookDefinition;
  url: string;
  errorMessage?: string;
  errorCode?: string;
  lastTriggered?: Date;
  arn?: string;
  tags?: Tag[];
}
export const ListWebhookItem = S.suspend(() =>
  S.Struct({
    definition: WebhookDefinition,
    url: S.String,
    errorMessage: S.optional(S.String),
    errorCode: S.optional(S.String),
    lastTriggered: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    arn: S.optional(S.String),
    tags: S.optional(TagList),
  }),
).annotate({
  identifier: "ListWebhookItem",
}) as any as S.Schema<ListWebhookItem>;
export type WebhookList = ListWebhookItem[];
export const WebhookList = S.Array(ListWebhookItem);
export interface ListWebhooksOutput {
  webhooks?: ListWebhookItem[];
  NextToken?: string;
}
export const ListWebhooksOutput = S.suspend(() =>
  S.Struct({
    webhooks: S.optional(WebhookList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListWebhooksOutput",
}) as any as S.Schema<ListWebhooksOutput>;
export type ConditionType = "BEFORE_ENTRY" | "ON_SUCCESS" | (string & {});
export const ConditionType = S.String;
export interface OverrideStageConditionInput {
  pipelineName: string;
  stageName: string;
  pipelineExecutionId: string;
  conditionType: ConditionType;
}
export const OverrideStageConditionInput = S.suspend(() =>
  S.Struct({
    pipelineName: S.String,
    stageName: S.String,
    pipelineExecutionId: S.String,
    conditionType: ConditionType,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "OverrideStageConditionInput",
}) as any as S.Schema<OverrideStageConditionInput>;
export interface OverrideStageConditionResponse {}
export const OverrideStageConditionResponse = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "OverrideStageConditionResponse",
}) as any as S.Schema<OverrideStageConditionResponse>;
export type QueryParamMap = { [key: string]: string | undefined };
export const QueryParamMap = S.Record(S.String, S.String.pipe(S.optional));
export interface PollForJobsInput {
  actionTypeId: ActionTypeId;
  maxBatchSize?: number;
  queryParam?: { [key: string]: string | undefined };
}
export const PollForJobsInput = S.suspend(() =>
  S.Struct({
    actionTypeId: ActionTypeId,
    maxBatchSize: S.optional(S.Number),
    queryParam: S.optional(QueryParamMap),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PollForJobsInput",
}) as any as S.Schema<PollForJobsInput>;
export interface Job {
  id?: string;
  data?: JobData;
  nonce?: string;
  accountId?: string;
}
export const Job = S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    data: S.optional(JobData),
    nonce: S.optional(S.String),
    accountId: S.optional(S.String),
  }),
).annotate({ identifier: "Job" }) as any as S.Schema<Job>;
export type JobList = Job[];
export const JobList = S.Array(Job);
export interface PollForJobsOutput {
  jobs?: Job[];
}
export const PollForJobsOutput = S.suspend(() =>
  S.Struct({ jobs: S.optional(JobList) }).pipe(ns),
).annotate({
  identifier: "PollForJobsOutput",
}) as any as S.Schema<PollForJobsOutput>;
export interface PollForThirdPartyJobsInput {
  actionTypeId: ActionTypeId;
  maxBatchSize?: number;
}
export const PollForThirdPartyJobsInput = S.suspend(() =>
  S.Struct({
    actionTypeId: ActionTypeId,
    maxBatchSize: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PollForThirdPartyJobsInput",
}) as any as S.Schema<PollForThirdPartyJobsInput>;
export interface ThirdPartyJob {
  clientId?: string;
  jobId?: string;
}
export const ThirdPartyJob = S.suspend(() =>
  S.Struct({ clientId: S.optional(S.String), jobId: S.optional(S.String) }),
).annotate({ identifier: "ThirdPartyJob" }) as any as S.Schema<ThirdPartyJob>;
export type ThirdPartyJobList = ThirdPartyJob[];
export const ThirdPartyJobList = S.Array(ThirdPartyJob);
export interface PollForThirdPartyJobsOutput {
  jobs?: ThirdPartyJob[];
}
export const PollForThirdPartyJobsOutput = S.suspend(() =>
  S.Struct({ jobs: S.optional(ThirdPartyJobList) }).pipe(ns),
).annotate({
  identifier: "PollForThirdPartyJobsOutput",
}) as any as S.Schema<PollForThirdPartyJobsOutput>;
export interface PutActionRevisionInput {
  pipelineName: string;
  stageName: string;
  actionName: string;
  actionRevision: ActionRevision;
}
export const PutActionRevisionInput = S.suspend(() =>
  S.Struct({
    pipelineName: S.String,
    stageName: S.String,
    actionName: S.String,
    actionRevision: ActionRevision,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutActionRevisionInput",
}) as any as S.Schema<PutActionRevisionInput>;
export interface PutActionRevisionOutput {
  newRevision?: boolean;
  pipelineExecutionId?: string;
}
export const PutActionRevisionOutput = S.suspend(() =>
  S.Struct({
    newRevision: S.optional(S.Boolean),
    pipelineExecutionId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "PutActionRevisionOutput",
}) as any as S.Schema<PutActionRevisionOutput>;
export type ApprovalStatus = "Approved" | "Rejected" | (string & {});
export const ApprovalStatus = S.String;
export interface ApprovalResult {
  summary: string;
  status: ApprovalStatus;
}
export const ApprovalResult = S.suspend(() =>
  S.Struct({ summary: S.String, status: ApprovalStatus }),
).annotate({ identifier: "ApprovalResult" }) as any as S.Schema<ApprovalResult>;
export interface PutApprovalResultInput {
  pipelineName: string;
  stageName: string;
  actionName: string;
  result: ApprovalResult;
  token: string;
}
export const PutApprovalResultInput = S.suspend(() =>
  S.Struct({
    pipelineName: S.String,
    stageName: S.String,
    actionName: S.String,
    result: ApprovalResult,
    token: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutApprovalResultInput",
}) as any as S.Schema<PutApprovalResultInput>;
export interface PutApprovalResultOutput {
  approvedAt?: Date;
}
export const PutApprovalResultOutput = S.suspend(() =>
  S.Struct({
    approvedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(ns),
).annotate({
  identifier: "PutApprovalResultOutput",
}) as any as S.Schema<PutApprovalResultOutput>;
export type FailureType =
  | "JobFailed"
  | "ConfigurationError"
  | "PermissionError"
  | "RevisionOutOfSync"
  | "RevisionUnavailable"
  | "SystemUnavailable"
  | (string & {});
export const FailureType = S.String;
export interface FailureDetails {
  type: FailureType;
  message: string;
  externalExecutionId?: string;
}
export const FailureDetails = S.suspend(() =>
  S.Struct({
    type: FailureType,
    message: S.String,
    externalExecutionId: S.optional(S.String),
  }),
).annotate({ identifier: "FailureDetails" }) as any as S.Schema<FailureDetails>;
export interface PutJobFailureResultInput {
  jobId: string;
  failureDetails: FailureDetails;
}
export const PutJobFailureResultInput = S.suspend(() =>
  S.Struct({ jobId: S.String, failureDetails: FailureDetails }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutJobFailureResultInput",
}) as any as S.Schema<PutJobFailureResultInput>;
export interface PutJobFailureResultResponse {}
export const PutJobFailureResultResponse = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutJobFailureResultResponse",
}) as any as S.Schema<PutJobFailureResultResponse>;
export interface CurrentRevision {
  revision: string;
  changeIdentifier: string;
  created?: Date;
  revisionSummary?: string;
}
export const CurrentRevision = S.suspend(() =>
  S.Struct({
    revision: S.String,
    changeIdentifier: S.String,
    created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    revisionSummary: S.optional(S.String),
  }),
).annotate({
  identifier: "CurrentRevision",
}) as any as S.Schema<CurrentRevision>;
export interface ExecutionDetails {
  summary?: string;
  externalExecutionId?: string;
  percentComplete?: number;
}
export const ExecutionDetails = S.suspend(() =>
  S.Struct({
    summary: S.optional(S.String),
    externalExecutionId: S.optional(S.String),
    percentComplete: S.optional(S.Number),
  }),
).annotate({
  identifier: "ExecutionDetails",
}) as any as S.Schema<ExecutionDetails>;
export interface PutJobSuccessResultInput {
  jobId: string;
  currentRevision?: CurrentRevision;
  continuationToken?: string;
  executionDetails?: ExecutionDetails;
  outputVariables?: { [key: string]: string | undefined };
}
export const PutJobSuccessResultInput = S.suspend(() =>
  S.Struct({
    jobId: S.String,
    currentRevision: S.optional(CurrentRevision),
    continuationToken: S.optional(S.String),
    executionDetails: S.optional(ExecutionDetails),
    outputVariables: S.optional(OutputVariablesMap),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutJobSuccessResultInput",
}) as any as S.Schema<PutJobSuccessResultInput>;
export interface PutJobSuccessResultResponse {}
export const PutJobSuccessResultResponse = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutJobSuccessResultResponse",
}) as any as S.Schema<PutJobSuccessResultResponse>;
export interface PutThirdPartyJobFailureResultInput {
  jobId: string;
  clientToken: string;
  failureDetails: FailureDetails;
}
export const PutThirdPartyJobFailureResultInput = S.suspend(() =>
  S.Struct({
    jobId: S.String,
    clientToken: S.String,
    failureDetails: FailureDetails,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutThirdPartyJobFailureResultInput",
}) as any as S.Schema<PutThirdPartyJobFailureResultInput>;
export interface PutThirdPartyJobFailureResultResponse {}
export const PutThirdPartyJobFailureResultResponse = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutThirdPartyJobFailureResultResponse",
}) as any as S.Schema<PutThirdPartyJobFailureResultResponse>;
export interface PutThirdPartyJobSuccessResultInput {
  jobId: string;
  clientToken: string;
  currentRevision?: CurrentRevision;
  continuationToken?: string;
  executionDetails?: ExecutionDetails;
}
export const PutThirdPartyJobSuccessResultInput = S.suspend(() =>
  S.Struct({
    jobId: S.String,
    clientToken: S.String,
    currentRevision: S.optional(CurrentRevision),
    continuationToken: S.optional(S.String),
    executionDetails: S.optional(ExecutionDetails),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutThirdPartyJobSuccessResultInput",
}) as any as S.Schema<PutThirdPartyJobSuccessResultInput>;
export interface PutThirdPartyJobSuccessResultResponse {}
export const PutThirdPartyJobSuccessResultResponse = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutThirdPartyJobSuccessResultResponse",
}) as any as S.Schema<PutThirdPartyJobSuccessResultResponse>;
export interface PutWebhookInput {
  webhook: WebhookDefinition;
  tags?: Tag[];
}
export const PutWebhookInput = S.suspend(() =>
  S.Struct({ webhook: WebhookDefinition, tags: S.optional(TagList) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutWebhookInput",
}) as any as S.Schema<PutWebhookInput>;
export interface PutWebhookOutput {
  webhook?: ListWebhookItem;
}
export const PutWebhookOutput = S.suspend(() =>
  S.Struct({ webhook: S.optional(ListWebhookItem) }).pipe(ns),
).annotate({
  identifier: "PutWebhookOutput",
}) as any as S.Schema<PutWebhookOutput>;
export interface RegisterWebhookWithThirdPartyInput {
  webhookName?: string;
}
export const RegisterWebhookWithThirdPartyInput = S.suspend(() =>
  S.Struct({ webhookName: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterWebhookWithThirdPartyInput",
}) as any as S.Schema<RegisterWebhookWithThirdPartyInput>;
export interface RegisterWebhookWithThirdPartyOutput {}
export const RegisterWebhookWithThirdPartyOutput = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RegisterWebhookWithThirdPartyOutput",
}) as any as S.Schema<RegisterWebhookWithThirdPartyOutput>;
export interface RetryStageExecutionInput {
  pipelineName: string;
  stageName: string;
  pipelineExecutionId: string;
  retryMode: StageRetryMode;
}
export const RetryStageExecutionInput = S.suspend(() =>
  S.Struct({
    pipelineName: S.String,
    stageName: S.String,
    pipelineExecutionId: S.String,
    retryMode: StageRetryMode,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RetryStageExecutionInput",
}) as any as S.Schema<RetryStageExecutionInput>;
export interface RetryStageExecutionOutput {
  pipelineExecutionId?: string;
}
export const RetryStageExecutionOutput = S.suspend(() =>
  S.Struct({ pipelineExecutionId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "RetryStageExecutionOutput",
}) as any as S.Schema<RetryStageExecutionOutput>;
export interface RollbackStageInput {
  pipelineName: string;
  stageName: string;
  targetPipelineExecutionId: string;
}
export const RollbackStageInput = S.suspend(() =>
  S.Struct({
    pipelineName: S.String,
    stageName: S.String,
    targetPipelineExecutionId: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RollbackStageInput",
}) as any as S.Schema<RollbackStageInput>;
export interface RollbackStageOutput {
  pipelineExecutionId: string;
}
export const RollbackStageOutput = S.suspend(() =>
  S.Struct({ pipelineExecutionId: S.String }).pipe(ns),
).annotate({
  identifier: "RollbackStageOutput",
}) as any as S.Schema<RollbackStageOutput>;
export interface PipelineVariable {
  name: string;
  value: string;
}
export const PipelineVariable = S.suspend(() =>
  S.Struct({ name: S.String, value: S.String }),
).annotate({
  identifier: "PipelineVariable",
}) as any as S.Schema<PipelineVariable>;
export type PipelineVariableList = PipelineVariable[];
export const PipelineVariableList = S.Array(PipelineVariable);
export type SourceRevisionType =
  | "COMMIT_ID"
  | "IMAGE_DIGEST"
  | "S3_OBJECT_VERSION_ID"
  | "S3_OBJECT_KEY"
  | (string & {});
export const SourceRevisionType = S.String;
export interface SourceRevisionOverride {
  actionName: string;
  revisionType: SourceRevisionType;
  revisionValue: string;
}
export const SourceRevisionOverride = S.suspend(() =>
  S.Struct({
    actionName: S.String,
    revisionType: SourceRevisionType,
    revisionValue: S.String,
  }),
).annotate({
  identifier: "SourceRevisionOverride",
}) as any as S.Schema<SourceRevisionOverride>;
export type SourceRevisionOverrideList = SourceRevisionOverride[];
export const SourceRevisionOverrideList = S.Array(SourceRevisionOverride);
export interface StartPipelineExecutionInput {
  name: string;
  variables?: PipelineVariable[];
  clientRequestToken?: string;
  sourceRevisions?: SourceRevisionOverride[];
}
export const StartPipelineExecutionInput = S.suspend(() =>
  S.Struct({
    name: S.String,
    variables: S.optional(PipelineVariableList),
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    sourceRevisions: S.optional(SourceRevisionOverrideList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartPipelineExecutionInput",
}) as any as S.Schema<StartPipelineExecutionInput>;
export interface StartPipelineExecutionOutput {
  pipelineExecutionId?: string;
}
export const StartPipelineExecutionOutput = S.suspend(() =>
  S.Struct({ pipelineExecutionId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "StartPipelineExecutionOutput",
}) as any as S.Schema<StartPipelineExecutionOutput>;
export interface StopPipelineExecutionInput {
  pipelineName: string;
  pipelineExecutionId: string;
  abandon?: boolean;
  reason?: string;
}
export const StopPipelineExecutionInput = S.suspend(() =>
  S.Struct({
    pipelineName: S.String,
    pipelineExecutionId: S.String,
    abandon: S.optional(S.Boolean),
    reason: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopPipelineExecutionInput",
}) as any as S.Schema<StopPipelineExecutionInput>;
export interface StopPipelineExecutionOutput {
  pipelineExecutionId?: string;
}
export const StopPipelineExecutionOutput = S.suspend(() =>
  S.Struct({ pipelineExecutionId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "StopPipelineExecutionOutput",
}) as any as S.Schema<StopPipelineExecutionOutput>;
export interface TagResourceInput {
  resourceArn: string;
  tags: Tag[];
}
export const TagResourceInput = S.suspend(() =>
  S.Struct({ resourceArn: S.String, tags: TagList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TagResourceInput",
}) as any as S.Schema<TagResourceInput>;
export interface TagResourceOutput {}
export const TagResourceOutput = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "TagResourceOutput",
}) as any as S.Schema<TagResourceOutput>;
export type TagKeyList = string[];
export const TagKeyList = S.Array(S.String);
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceInput = S.suspend(() =>
  S.Struct({ resourceArn: S.String, tagKeys: TagKeyList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceOutput {}
export const UntagResourceOutput = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UntagResourceOutput",
}) as any as S.Schema<UntagResourceOutput>;
export interface UpdateActionTypeInput {
  actionType: ActionTypeDeclaration;
}
export const UpdateActionTypeInput = S.suspend(() =>
  S.Struct({ actionType: ActionTypeDeclaration }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateActionTypeInput",
}) as any as S.Schema<UpdateActionTypeInput>;
export interface UpdateActionTypeResponse {}
export const UpdateActionTypeResponse = S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateActionTypeResponse",
}) as any as S.Schema<UpdateActionTypeResponse>;
export interface UpdatePipelineInput {
  pipeline: PipelineDeclaration;
}
export const UpdatePipelineInput = S.suspend(() =>
  S.Struct({ pipeline: PipelineDeclaration }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePipelineInput",
}) as any as S.Schema<UpdatePipelineInput>;
export interface UpdatePipelineOutput {
  pipeline?: PipelineDeclaration;
}
export const UpdatePipelineOutput = S.suspend(() =>
  S.Struct({ pipeline: S.optional(PipelineDeclaration) }).pipe(ns),
).annotate({
  identifier: "UpdatePipelineOutput",
}) as any as S.Schema<UpdatePipelineOutput>;

//# Errors
export class InvalidNonceException extends S.TaggedErrorClass<InvalidNonceException>()(
  "InvalidNonceException",
  { message: S.optional(S.String) },
) {}
export class JobNotFoundException extends S.TaggedErrorClass<JobNotFoundException>()(
  "JobNotFoundException",
  { message: S.optional(S.String) },
) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  { message: S.optional(S.String) },
) {}
export class InvalidClientTokenException extends S.TaggedErrorClass<InvalidClientTokenException>()(
  "InvalidClientTokenException",
  { message: S.optional(S.String) },
) {}
export class ConcurrentModificationException extends S.TaggedErrorClass<ConcurrentModificationException>()(
  "ConcurrentModificationException",
  { message: S.optional(S.String) },
) {}
export class InvalidTagsException extends S.TaggedErrorClass<InvalidTagsException>()(
  "InvalidTagsException",
  { message: S.optional(S.String) },
) {}
export class LimitExceededException extends S.TaggedErrorClass<LimitExceededException>()(
  "LimitExceededException",
  { message: S.optional(S.String) },
) {}
export class TooManyTagsException extends S.TaggedErrorClass<TooManyTagsException>()(
  "TooManyTagsException",
  { message: S.optional(S.String) },
) {}
export class InvalidActionDeclarationException extends S.TaggedErrorClass<InvalidActionDeclarationException>()(
  "InvalidActionDeclarationException",
  { message: S.optional(S.String) },
) {}
export class InvalidBlockerDeclarationException extends S.TaggedErrorClass<InvalidBlockerDeclarationException>()(
  "InvalidBlockerDeclarationException",
  { message: S.optional(S.String) },
) {}
export class InvalidStageDeclarationException extends S.TaggedErrorClass<InvalidStageDeclarationException>()(
  "InvalidStageDeclarationException",
  { message: S.optional(S.String) },
) {}
export class InvalidStructureException extends S.TaggedErrorClass<InvalidStructureException>()(
  "InvalidStructureException",
  { message: S.optional(S.String) },
) {}
export class PipelineNameInUseException extends S.TaggedErrorClass<PipelineNameInUseException>()(
  "PipelineNameInUseException",
  { message: S.optional(S.String) },
) {}
export class WebhookNotFoundException extends S.TaggedErrorClass<WebhookNotFoundException>()(
  "WebhookNotFoundException",
  {},
) {}
export class PipelineNotFoundException extends S.TaggedErrorClass<PipelineNotFoundException>()(
  "PipelineNotFoundException",
  { message: S.optional(S.String) },
) {}
export class StageNotFoundException extends S.TaggedErrorClass<StageNotFoundException>()(
  "StageNotFoundException",
  { message: S.optional(S.String) },
) {}
export class ActionTypeNotFoundException extends S.TaggedErrorClass<ActionTypeNotFoundException>()(
  "ActionTypeNotFoundException",
  { message: S.optional(S.String) },
) {}
export class PipelineVersionNotFoundException extends S.TaggedErrorClass<PipelineVersionNotFoundException>()(
  "PipelineVersionNotFoundException",
  { message: S.optional(S.String) },
) {}
export class PipelineExecutionNotFoundException extends S.TaggedErrorClass<PipelineExecutionNotFoundException>()(
  "PipelineExecutionNotFoundException",
  { message: S.optional(S.String) },
) {}
export class InvalidJobException extends S.TaggedErrorClass<InvalidJobException>()(
  "InvalidJobException",
  { message: S.optional(S.String) },
) {}
export class InvalidNextTokenException extends S.TaggedErrorClass<InvalidNextTokenException>()(
  "InvalidNextTokenException",
  { message: S.optional(S.String) },
) {}
export class ActionExecutionNotFoundException extends S.TaggedErrorClass<ActionExecutionNotFoundException>()(
  "ActionExecutionNotFoundException",
  { message: S.optional(S.String) },
) {}
export class InvalidArnException extends S.TaggedErrorClass<InvalidArnException>()(
  "InvalidArnException",
  { message: S.optional(S.String) },
) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { message: S.optional(S.String) },
) {}
export class ConcurrentPipelineExecutionsLimitExceededException extends S.TaggedErrorClass<ConcurrentPipelineExecutionsLimitExceededException>()(
  "ConcurrentPipelineExecutionsLimitExceededException",
  { message: S.optional(S.String) },
) {}
export class ConditionNotOverridableException extends S.TaggedErrorClass<ConditionNotOverridableException>()(
  "ConditionNotOverridableException",
  { message: S.optional(S.String) },
) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { message: S.optional(S.String) },
).pipe(C.withConflictError) {}
export class NotLatestPipelineExecutionException extends S.TaggedErrorClass<NotLatestPipelineExecutionException>()(
  "NotLatestPipelineExecutionException",
  { message: S.optional(S.String) },
) {}
export class ActionNotFoundException extends S.TaggedErrorClass<ActionNotFoundException>()(
  "ActionNotFoundException",
  { message: S.optional(S.String) },
) {}
export class ApprovalAlreadyCompletedException extends S.TaggedErrorClass<ApprovalAlreadyCompletedException>()(
  "ApprovalAlreadyCompletedException",
  { message: S.optional(S.String) },
) {}
export class InvalidApprovalTokenException extends S.TaggedErrorClass<InvalidApprovalTokenException>()(
  "InvalidApprovalTokenException",
  { message: S.optional(S.String) },
) {}
export class InvalidJobStateException extends S.TaggedErrorClass<InvalidJobStateException>()(
  "InvalidJobStateException",
  { message: S.optional(S.String) },
) {}
export class OutputVariablesSizeExceededException extends S.TaggedErrorClass<OutputVariablesSizeExceededException>()(
  "OutputVariablesSizeExceededException",
  { message: S.optional(S.String) },
) {}
export class InvalidWebhookAuthenticationParametersException extends S.TaggedErrorClass<InvalidWebhookAuthenticationParametersException>()(
  "InvalidWebhookAuthenticationParametersException",
  { message: S.optional(S.String) },
) {}
export class InvalidWebhookFilterPatternException extends S.TaggedErrorClass<InvalidWebhookFilterPatternException>()(
  "InvalidWebhookFilterPatternException",
  { message: S.optional(S.String) },
) {}
export class StageNotRetryableException extends S.TaggedErrorClass<StageNotRetryableException>()(
  "StageNotRetryableException",
  { message: S.optional(S.String) },
) {}
export class PipelineExecutionOutdatedException extends S.TaggedErrorClass<PipelineExecutionOutdatedException>()(
  "PipelineExecutionOutdatedException",
  { message: S.optional(S.String) },
) {}
export class UnableToRollbackStageException extends S.TaggedErrorClass<UnableToRollbackStageException>()(
  "UnableToRollbackStageException",
  { message: S.optional(S.String) },
) {}
export class DuplicatedStopRequestException extends S.TaggedErrorClass<DuplicatedStopRequestException>()(
  "DuplicatedStopRequestException",
  { message: S.optional(S.String) },
) {}
export class PipelineExecutionNotStoppableException extends S.TaggedErrorClass<PipelineExecutionNotStoppableException>()(
  "PipelineExecutionNotStoppableException",
  { message: S.optional(S.String) },
) {}
export class RequestFailedException extends S.TaggedErrorClass<RequestFailedException>()(
  "RequestFailedException",
  { message: S.optional(S.String) },
) {}

//# Operations
/**
 * Returns information about a specified job and whether that job has been received by
 * the job worker. Used for custom actions only.
 */
export const acknowledgeJob: API.OperationMethod<
  AcknowledgeJobInput,
  AcknowledgeJobOutput,
  | InvalidNonceException
  | JobNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AcknowledgeJobInput,
  output: AcknowledgeJobOutput,
  errors: [InvalidNonceException, JobNotFoundException, ValidationException],
}));
/**
 * Confirms a job worker has received the specified job. Used for partner actions
 * only.
 */
export const acknowledgeThirdPartyJob: API.OperationMethod<
  AcknowledgeThirdPartyJobInput,
  AcknowledgeThirdPartyJobOutput,
  | InvalidClientTokenException
  | InvalidNonceException
  | JobNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AcknowledgeThirdPartyJobInput,
  output: AcknowledgeThirdPartyJobOutput,
  errors: [
    InvalidClientTokenException,
    InvalidNonceException,
    JobNotFoundException,
    ValidationException,
  ],
}));
/**
 * Creates a new custom action that can be used in all pipelines associated with the
 * Amazon Web Services account. Only used for custom actions.
 */
export const createCustomActionType: API.OperationMethod<
  CreateCustomActionTypeInput,
  CreateCustomActionTypeOutput,
  | ConcurrentModificationException
  | InvalidTagsException
  | LimitExceededException
  | TooManyTagsException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateCustomActionTypeInput,
  output: CreateCustomActionTypeOutput,
  errors: [
    ConcurrentModificationException,
    InvalidTagsException,
    LimitExceededException,
    TooManyTagsException,
    ValidationException,
  ],
}));
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
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreatePipelineInput,
  output: CreatePipelineOutput,
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
}));
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
  ConcurrentModificationException | ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteCustomActionTypeInput,
  output: DeleteCustomActionTypeResponse,
  errors: [ConcurrentModificationException, ValidationException],
}));
/**
 * Deletes the specified pipeline.
 */
export const deletePipeline: API.OperationMethod<
  DeletePipelineInput,
  DeletePipelineResponse,
  ConcurrentModificationException | ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeletePipelineInput,
  output: DeletePipelineResponse,
  errors: [ConcurrentModificationException, ValidationException],
}));
/**
 * Deletes a previously created webhook by name. Deleting the webhook stops CodePipeline from starting a pipeline every time an external event occurs. The API
 * returns successfully when trying to delete a webhook that is already deleted. If a
 * deleted webhook is re-created by calling PutWebhook with the same name, it will have a
 * different URL.
 */
export const deleteWebhook: API.OperationMethod<
  DeleteWebhookInput,
  DeleteWebhookOutput,
  ConcurrentModificationException | ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteWebhookInput,
  output: DeleteWebhookOutput,
  errors: [ConcurrentModificationException, ValidationException],
}));
/**
 * Removes the connection between the webhook that was created by CodePipeline
 * and the external tool with events to be detected. Currently supported only for webhooks
 * that target an action type of GitHub.
 */
export const deregisterWebhookWithThirdParty: API.OperationMethod<
  DeregisterWebhookWithThirdPartyInput,
  DeregisterWebhookWithThirdPartyOutput,
  ValidationException | WebhookNotFoundException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeregisterWebhookWithThirdPartyInput,
  output: DeregisterWebhookWithThirdPartyOutput,
  errors: [ValidationException, WebhookNotFoundException],
}));
/**
 * Prevents artifacts in a pipeline from transitioning to the next stage in the
 * pipeline.
 */
export const disableStageTransition: API.OperationMethod<
  DisableStageTransitionInput,
  DisableStageTransitionResponse,
  | PipelineNotFoundException
  | StageNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisableStageTransitionInput,
  output: DisableStageTransitionResponse,
  errors: [
    PipelineNotFoundException,
    StageNotFoundException,
    ValidationException,
  ],
}));
/**
 * Enables artifacts in a pipeline to transition to a stage in a pipeline.
 */
export const enableStageTransition: API.OperationMethod<
  EnableStageTransitionInput,
  EnableStageTransitionResponse,
  | PipelineNotFoundException
  | StageNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: EnableStageTransitionInput,
  output: EnableStageTransitionResponse,
  errors: [
    PipelineNotFoundException,
    StageNotFoundException,
    ValidationException,
  ],
}));
/**
 * Returns information about an action type created for an external provider, where the
 * action is to be used by customers of the external provider. The action can be created
 * with any supported integration model.
 */
export const getActionType: API.OperationMethod<
  GetActionTypeInput,
  GetActionTypeOutput,
  ActionTypeNotFoundException | ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetActionTypeInput,
  output: GetActionTypeOutput,
  errors: [ActionTypeNotFoundException, ValidationException],
}));
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
  JobNotFoundException | ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetJobDetailsInput,
  output: GetJobDetailsOutput,
  errors: [JobNotFoundException, ValidationException],
}));
/**
 * Returns the metadata, structure, stages, and actions of a pipeline. Can be used to
 * return the entire structure of a pipeline in JSON format, which can then be modified and
 * used to update the pipeline structure with UpdatePipeline.
 */
export const getPipeline: API.OperationMethod<
  GetPipelineInput,
  GetPipelineOutput,
  | PipelineNotFoundException
  | PipelineVersionNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPipelineInput,
  output: GetPipelineOutput,
  errors: [
    PipelineNotFoundException,
    PipelineVersionNotFoundException,
    ValidationException,
  ],
}));
/**
 * Returns information about an execution of a pipeline, including details about
 * artifacts, the pipeline execution ID, and the name, version, and status of the
 * pipeline.
 */
export const getPipelineExecution: API.OperationMethod<
  GetPipelineExecutionInput,
  GetPipelineExecutionOutput,
  | PipelineExecutionNotFoundException
  | PipelineNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPipelineExecutionInput,
  output: GetPipelineExecutionOutput,
  errors: [
    PipelineExecutionNotFoundException,
    PipelineNotFoundException,
    ValidationException,
  ],
}));
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
  PipelineNotFoundException | ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPipelineStateInput,
  output: GetPipelineStateOutput,
  errors: [PipelineNotFoundException, ValidationException],
}));
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
  | InvalidClientTokenException
  | InvalidJobException
  | JobNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetThirdPartyJobDetailsInput,
  output: GetThirdPartyJobDetailsOutput,
  errors: [
    InvalidClientTokenException,
    InvalidJobException,
    JobNotFoundException,
    ValidationException,
  ],
}));
/**
 * Lists the action executions that have occurred in a pipeline.
 */
export const listActionExecutions: API.OperationMethod<
  ListActionExecutionsInput,
  ListActionExecutionsOutput,
  | InvalidNextTokenException
  | PipelineExecutionNotFoundException
  | PipelineNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListActionExecutionsInput,
  ) => stream.Stream<
    ListActionExecutionsOutput,
    | InvalidNextTokenException
    | PipelineExecutionNotFoundException
    | PipelineNotFoundException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListActionExecutionsInput,
  ) => stream.Stream<
    ActionExecutionDetail,
    | InvalidNextTokenException
    | PipelineExecutionNotFoundException
    | PipelineNotFoundException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListActionExecutionsInput,
  output: ListActionExecutionsOutput,
  errors: [
    InvalidNextTokenException,
    PipelineExecutionNotFoundException,
    PipelineNotFoundException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "actionExecutionDetails",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Gets a summary of all CodePipeline action types associated with your
 * account.
 */
export const listActionTypes: API.OperationMethod<
  ListActionTypesInput,
  ListActionTypesOutput,
  InvalidNextTokenException | ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListActionTypesInput,
  ) => stream.Stream<
    ListActionTypesOutput,
    InvalidNextTokenException | ValidationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListActionTypesInput,
  ) => stream.Stream<
    ActionType,
    InvalidNextTokenException | ValidationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListActionTypesInput,
  output: ListActionTypesOutput,
  errors: [InvalidNextTokenException, ValidationException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "actionTypes",
  } as const,
}));
/**
 * Lists the targets for the deploy action.
 */
export const listDeployActionExecutionTargets: API.OperationMethod<
  ListDeployActionExecutionTargetsInput,
  ListDeployActionExecutionTargetsOutput,
  | ActionExecutionNotFoundException
  | InvalidNextTokenException
  | PipelineNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListDeployActionExecutionTargetsInput,
  ) => stream.Stream<
    ListDeployActionExecutionTargetsOutput,
    | ActionExecutionNotFoundException
    | InvalidNextTokenException
    | PipelineNotFoundException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListDeployActionExecutionTargetsInput,
  ) => stream.Stream<
    DeployActionExecutionTarget,
    | ActionExecutionNotFoundException
    | InvalidNextTokenException
    | PipelineNotFoundException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDeployActionExecutionTargetsInput,
  output: ListDeployActionExecutionTargetsOutput,
  errors: [
    ActionExecutionNotFoundException,
    InvalidNextTokenException,
    PipelineNotFoundException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "targets",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Gets a summary of the most recent executions for a pipeline.
 *
 * When applying the filter for pipeline executions that have succeeded in the stage,
 * the operation returns all executions in the current pipeline version beginning on
 * February 1, 2024.
 */
export const listPipelineExecutions: API.OperationMethod<
  ListPipelineExecutionsInput,
  ListPipelineExecutionsOutput,
  | InvalidNextTokenException
  | PipelineNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListPipelineExecutionsInput,
  ) => stream.Stream<
    ListPipelineExecutionsOutput,
    | InvalidNextTokenException
    | PipelineNotFoundException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListPipelineExecutionsInput,
  ) => stream.Stream<
    PipelineExecutionSummary,
    | InvalidNextTokenException
    | PipelineNotFoundException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPipelineExecutionsInput,
  output: ListPipelineExecutionsOutput,
  errors: [
    InvalidNextTokenException,
    PipelineNotFoundException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "pipelineExecutionSummaries",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Gets a summary of all of the pipelines associated with your account.
 */
export const listPipelines: API.OperationMethod<
  ListPipelinesInput,
  ListPipelinesOutput,
  InvalidNextTokenException | ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListPipelinesInput,
  ) => stream.Stream<
    ListPipelinesOutput,
    InvalidNextTokenException | ValidationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListPipelinesInput,
  ) => stream.Stream<
    PipelineSummary,
    InvalidNextTokenException | ValidationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPipelinesInput,
  output: ListPipelinesOutput,
  errors: [InvalidNextTokenException, ValidationException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "pipelines",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Lists the rule executions that have occurred in a pipeline configured for conditions
 * with rules.
 */
export const listRuleExecutions: API.OperationMethod<
  ListRuleExecutionsInput,
  ListRuleExecutionsOutput,
  | InvalidNextTokenException
  | PipelineExecutionNotFoundException
  | PipelineNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListRuleExecutionsInput,
  ) => stream.Stream<
    ListRuleExecutionsOutput,
    | InvalidNextTokenException
    | PipelineExecutionNotFoundException
    | PipelineNotFoundException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListRuleExecutionsInput,
  ) => stream.Stream<
    RuleExecutionDetail,
    | InvalidNextTokenException
    | PipelineExecutionNotFoundException
    | PipelineNotFoundException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRuleExecutionsInput,
  output: ListRuleExecutionsOutput,
  errors: [
    InvalidNextTokenException,
    PipelineExecutionNotFoundException,
    PipelineNotFoundException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "ruleExecutionDetails",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Lists the rules for the condition. For more information about conditions, see Stage
 * conditions and How do
 * stage conditions work?.For more information about rules, see the CodePipeline rule reference.
 */
export const listRuleTypes: API.OperationMethod<
  ListRuleTypesInput,
  ListRuleTypesOutput,
  InvalidNextTokenException | ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListRuleTypesInput,
  output: ListRuleTypesOutput,
  errors: [InvalidNextTokenException, ValidationException],
}));
/**
 * Gets the set of key-value pairs (metadata) that are used to manage the
 * resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  | InvalidArnException
  | InvalidNextTokenException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListTagsForResourceInput,
  ) => stream.Stream<
    ListTagsForResourceOutput,
    | InvalidArnException
    | InvalidNextTokenException
    | ResourceNotFoundException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListTagsForResourceInput,
  ) => stream.Stream<
    Tag,
    | InvalidArnException
    | InvalidNextTokenException
    | ResourceNotFoundException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [
    InvalidArnException,
    InvalidNextTokenException,
    ResourceNotFoundException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tags",
    pageSize: "maxResults",
  } as const,
}));
/**
 * Gets a listing of all the webhooks in this Amazon Web Services Region for this
 * account. The output lists all webhooks and includes the webhook URL and ARN and the
 * configuration for each webhook.
 *
 * If a secret token was provided, it will be redacted in the response.
 */
export const listWebhooks: API.OperationMethod<
  ListWebhooksInput,
  ListWebhooksOutput,
  InvalidNextTokenException | ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListWebhooksInput,
  ) => stream.Stream<
    ListWebhooksOutput,
    InvalidNextTokenException | ValidationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListWebhooksInput,
  ) => stream.Stream<
    ListWebhookItem,
    InvalidNextTokenException | ValidationException | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListWebhooksInput,
  output: ListWebhooksOutput,
  errors: [InvalidNextTokenException, ValidationException],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "webhooks",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Used to override a stage condition. For more information about conditions, see Stage
 * conditions and How do
 * stage conditions work?.
 */
export const overrideStageCondition: API.OperationMethod<
  OverrideStageConditionInput,
  OverrideStageConditionResponse,
  | ConcurrentPipelineExecutionsLimitExceededException
  | ConditionNotOverridableException
  | ConflictException
  | NotLatestPipelineExecutionException
  | PipelineNotFoundException
  | StageNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: OverrideStageConditionInput,
  output: OverrideStageConditionResponse,
  errors: [
    ConcurrentPipelineExecutionsLimitExceededException,
    ConditionNotOverridableException,
    ConflictException,
    NotLatestPipelineExecutionException,
    PipelineNotFoundException,
    StageNotFoundException,
    ValidationException,
  ],
}));
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
  ActionTypeNotFoundException | ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PollForJobsInput,
  output: PollForJobsOutput,
  errors: [ActionTypeNotFoundException, ValidationException],
}));
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
  ActionTypeNotFoundException | ValidationException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PollForThirdPartyJobsInput,
  output: PollForThirdPartyJobsOutput,
  errors: [ActionTypeNotFoundException, ValidationException],
}));
/**
 * Provides information to CodePipeline about new revisions to a
 * source.
 */
export const putActionRevision: API.OperationMethod<
  PutActionRevisionInput,
  PutActionRevisionOutput,
  | ActionNotFoundException
  | ConcurrentPipelineExecutionsLimitExceededException
  | PipelineNotFoundException
  | StageNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutActionRevisionInput,
  output: PutActionRevisionOutput,
  errors: [
    ActionNotFoundException,
    ConcurrentPipelineExecutionsLimitExceededException,
    PipelineNotFoundException,
    StageNotFoundException,
    ValidationException,
  ],
}));
/**
 * Provides the response to a manual approval request to CodePipeline. Valid
 * responses include Approved and Rejected.
 */
export const putApprovalResult: API.OperationMethod<
  PutApprovalResultInput,
  PutApprovalResultOutput,
  | ActionNotFoundException
  | ApprovalAlreadyCompletedException
  | InvalidApprovalTokenException
  | PipelineNotFoundException
  | StageNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutApprovalResultInput,
  output: PutApprovalResultOutput,
  errors: [
    ActionNotFoundException,
    ApprovalAlreadyCompletedException,
    InvalidApprovalTokenException,
    PipelineNotFoundException,
    StageNotFoundException,
    ValidationException,
  ],
}));
/**
 * Represents the failure of a job as returned to the pipeline by a job worker. Used
 * for custom actions only.
 */
export const putJobFailureResult: API.OperationMethod<
  PutJobFailureResultInput,
  PutJobFailureResultResponse,
  | InvalidJobStateException
  | JobNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutJobFailureResultInput,
  output: PutJobFailureResultResponse,
  errors: [InvalidJobStateException, JobNotFoundException, ValidationException],
}));
/**
 * Represents the success of a job as returned to the pipeline by a job worker. Used
 * for custom actions only.
 */
export const putJobSuccessResult: API.OperationMethod<
  PutJobSuccessResultInput,
  PutJobSuccessResultResponse,
  | InvalidJobStateException
  | JobNotFoundException
  | OutputVariablesSizeExceededException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutJobSuccessResultInput,
  output: PutJobSuccessResultResponse,
  errors: [
    InvalidJobStateException,
    JobNotFoundException,
    OutputVariablesSizeExceededException,
    ValidationException,
  ],
}));
/**
 * Represents the failure of a third party job as returned to the pipeline by a job
 * worker. Used for partner actions only.
 */
export const putThirdPartyJobFailureResult: API.OperationMethod<
  PutThirdPartyJobFailureResultInput,
  PutThirdPartyJobFailureResultResponse,
  | InvalidClientTokenException
  | InvalidJobStateException
  | JobNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutThirdPartyJobFailureResultInput,
  output: PutThirdPartyJobFailureResultResponse,
  errors: [
    InvalidClientTokenException,
    InvalidJobStateException,
    JobNotFoundException,
    ValidationException,
  ],
}));
/**
 * Represents the success of a third party job as returned to the pipeline by a job
 * worker. Used for partner actions only.
 */
export const putThirdPartyJobSuccessResult: API.OperationMethod<
  PutThirdPartyJobSuccessResultInput,
  PutThirdPartyJobSuccessResultResponse,
  | InvalidClientTokenException
  | InvalidJobStateException
  | JobNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutThirdPartyJobSuccessResultInput,
  output: PutThirdPartyJobSuccessResultResponse,
  errors: [
    InvalidClientTokenException,
    InvalidJobStateException,
    JobNotFoundException,
    ValidationException,
  ],
}));
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
  | ConcurrentModificationException
  | InvalidTagsException
  | InvalidWebhookAuthenticationParametersException
  | InvalidWebhookFilterPatternException
  | LimitExceededException
  | PipelineNotFoundException
  | TooManyTagsException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutWebhookInput,
  output: PutWebhookOutput,
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
}));
/**
 * Configures a connection between the webhook that was created and the external tool
 * with events to be detected.
 */
export const registerWebhookWithThirdParty: API.OperationMethod<
  RegisterWebhookWithThirdPartyInput,
  RegisterWebhookWithThirdPartyOutput,
  ValidationException | WebhookNotFoundException | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RegisterWebhookWithThirdPartyInput,
  output: RegisterWebhookWithThirdPartyOutput,
  errors: [ValidationException, WebhookNotFoundException],
}));
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
  | ConcurrentPipelineExecutionsLimitExceededException
  | ConflictException
  | NotLatestPipelineExecutionException
  | PipelineNotFoundException
  | StageNotFoundException
  | StageNotRetryableException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RetryStageExecutionInput,
  output: RetryStageExecutionOutput,
  errors: [
    ConcurrentPipelineExecutionsLimitExceededException,
    ConflictException,
    NotLatestPipelineExecutionException,
    PipelineNotFoundException,
    StageNotFoundException,
    StageNotRetryableException,
    ValidationException,
  ],
}));
/**
 * Rolls back a stage execution.
 */
export const rollbackStage: API.OperationMethod<
  RollbackStageInput,
  RollbackStageOutput,
  | ConflictException
  | PipelineExecutionNotFoundException
  | PipelineExecutionOutdatedException
  | PipelineNotFoundException
  | StageNotFoundException
  | UnableToRollbackStageException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RollbackStageInput,
  output: RollbackStageOutput,
  errors: [
    ConflictException,
    PipelineExecutionNotFoundException,
    PipelineExecutionOutdatedException,
    PipelineNotFoundException,
    StageNotFoundException,
    UnableToRollbackStageException,
    ValidationException,
  ],
}));
/**
 * Starts the specified pipeline. Specifically, it begins processing the latest commit
 * to the source location specified as part of the pipeline.
 */
export const startPipelineExecution: API.OperationMethod<
  StartPipelineExecutionInput,
  StartPipelineExecutionOutput,
  | ConcurrentPipelineExecutionsLimitExceededException
  | ConflictException
  | PipelineNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartPipelineExecutionInput,
  output: StartPipelineExecutionOutput,
  errors: [
    ConcurrentPipelineExecutionsLimitExceededException,
    ConflictException,
    PipelineNotFoundException,
    ValidationException,
  ],
}));
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
  | ConflictException
  | DuplicatedStopRequestException
  | PipelineExecutionNotStoppableException
  | PipelineNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopPipelineExecutionInput,
  output: StopPipelineExecutionOutput,
  errors: [
    ConflictException,
    DuplicatedStopRequestException,
    PipelineExecutionNotStoppableException,
    PipelineNotFoundException,
    ValidationException,
  ],
}));
/**
 * Adds to or modifies the tags of the given resource. Tags are metadata that can be used
 * to manage a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  | ConcurrentModificationException
  | InvalidArnException
  | InvalidTagsException
  | ResourceNotFoundException
  | TooManyTagsException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceOutput,
  errors: [
    ConcurrentModificationException,
    InvalidArnException,
    InvalidTagsException,
    ResourceNotFoundException,
    TooManyTagsException,
    ValidationException,
  ],
}));
/**
 * Removes tags from an Amazon Web Services resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  | ConcurrentModificationException
  | InvalidArnException
  | InvalidTagsException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceOutput,
  errors: [
    ConcurrentModificationException,
    InvalidArnException,
    InvalidTagsException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
/**
 * Updates an action type that was created with any supported integration model, where
 * the action type is to be used by customers of the action type provider. Use a JSON file
 * with the action definition and `UpdateActionType` to provide the full
 * structure.
 */
export const updateActionType: API.OperationMethod<
  UpdateActionTypeInput,
  UpdateActionTypeResponse,
  | ActionTypeNotFoundException
  | RequestFailedException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateActionTypeInput,
  output: UpdateActionTypeResponse,
  errors: [
    ActionTypeNotFoundException,
    RequestFailedException,
    ValidationException,
  ],
}));
/**
 * Updates a specified pipeline with edits or changes to its structure. Use a JSON
 * file with the pipeline structure and `UpdatePipeline` to provide the full
 * structure of the pipeline. Updating the pipeline increases the version number of the
 * pipeline by 1.
 */
export const updatePipeline: API.OperationMethod<
  UpdatePipelineInput,
  UpdatePipelineOutput,
  | InvalidActionDeclarationException
  | InvalidBlockerDeclarationException
  | InvalidStageDeclarationException
  | InvalidStructureException
  | LimitExceededException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePipelineInput,
  output: UpdatePipelineOutput,
  errors: [
    InvalidActionDeclarationException,
    InvalidBlockerDeclarationException,
    InvalidStageDeclarationException,
    InvalidStructureException,
    LimitExceededException,
    ValidationException,
  ],
}));
