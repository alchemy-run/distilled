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
  sdkId: "QConnect",
  target: "WisdomService",
  version: "2020-10-19",
  sigv4: "wisdom",
  protocol: restJson1Protocol,
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
                `https://wisdom-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://wisdom-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://wisdom.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://wisdom.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class DependencyFailedException
  extends /*@__PURE__*/ TE.TaggedError("DependencyFailedException", [], {
    status: 424,
  })<{ readonly message?: string }> {}
export class PreconditionFailedException
  extends /*@__PURE__*/ TE.TaggedError("PreconditionFailedException", [], {
    status: 412,
  })<{ readonly message?: string }> {}
export class RequestTimeoutException
  extends /*@__PURE__*/ TE.TaggedError(
    "RequestTimeoutException",
    ["TimeoutError", "RetryableError"],
    { status: 408 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string; readonly resourceName?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["BadRequestError", "RetryableError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly resourceName?: string }> {}
export class UnauthorizedException
  extends /*@__PURE__*/ TE.TaggedError("UnauthorizedException", ["AuthError"], {
    status: 401,
  })<{ readonly message?: string }> {}
export class UnprocessableContentException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnprocessableContentException",
    ["BadRequestError"],
    { status: 422 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type UuidOrArn = string;
export type UuidOrArnOrEitherWithQualifier = string;
export type Version = number;
export interface ActivateMessageTemplateRequest {
  knowledgeBaseId: string;
  messageTemplateId: string;
  versionNumber: number;
}
export type ArnWithQualifier = string;
export type Uuid = string;
export interface ActivateMessageTemplateResponse {
  messageTemplateArn: string;
  messageTemplateId: string;
  versionNumber: number;
}
export type ClientToken = string;
export type Name = string;
export type AIAgentType = string;
export type UuidWithQualifier = string;
export type AIAgentAssociationConfigurationType = string;
export type TagKey = string;
export type TagValue = string;
export interface TagCondition {
  key: string;
  value?: string;
}
export type AndConditions = TagCondition[];
export type OrCondition =
  | { andConditions: TagCondition[]; tagCondition?: never }
  | { andConditions?: never; tagCondition: TagCondition };
export type OrConditions = OrCondition[];
export type TagFilter =
  | { tagCondition: TagCondition; andConditions?: never; orConditions?: never }
  | {
      tagCondition?: never;
      andConditions: TagCondition[];
      orConditions?: never;
    }
  | {
      tagCondition?: never;
      andConditions?: never;
      orConditions: OrCondition[];
    };
export type MaxResults = number;
export type KnowledgeBaseSearchType = string;
export interface KnowledgeBaseAssociationConfigurationData {
  contentTagFilter?: TagFilter;
  maxResults?: number;
  overrideKnowledgeBaseSearchType?: string;
}
export type AssociationConfigurationData = {
  knowledgeBaseAssociationConfigurationData: KnowledgeBaseAssociationConfigurationData;
};
export interface AssociationConfiguration {
  associationId?: string;
  associationType?: string;
  associationConfigurationData?: AssociationConfigurationData;
}
export type AssociationConfigurationList = AssociationConfiguration[];
export type NonEmptyString = string;
export interface ManualSearchAIAgentConfiguration {
  answerGenerationAIPromptId?: string;
  answerGenerationAIGuardrailId?: string;
  associationConfigurations?: AssociationConfiguration[];
  locale?: string;
}
export type NonEmptySensitiveString = string | redacted.Redacted<string>;
export type SuggestedMessagesList = (string | redacted.Redacted<string>)[];
export interface AnswerRecommendationAIAgentConfiguration {
  intentLabelingGenerationAIPromptId?: string;
  queryReformulationAIPromptId?: string;
  answerGenerationAIPromptId?: string;
  answerGenerationAIGuardrailId?: string;
  associationConfigurations?: AssociationConfiguration[];
  locale?: string;
  suggestedMessages?: (string | redacted.Redacted<string>)[];
}
export interface SelfServiceAIAgentConfiguration {
  selfServicePreProcessingAIPromptId?: string;
  selfServiceAnswerGenerationAIPromptId?: string;
  selfServiceAIGuardrailId?: string;
  associationConfigurations?: AssociationConfiguration[];
}
export interface EmailResponseAIAgentConfiguration {
  emailResponseAIPromptId?: string;
  emailQueryReformulationAIPromptId?: string;
  locale?: string;
  associationConfigurations?: AssociationConfiguration[];
}
export interface EmailOverviewAIAgentConfiguration {
  emailOverviewAIPromptId?: string;
  locale?: string;
}
export interface EmailGenerativeAnswerAIAgentConfiguration {
  emailGenerativeAnswerAIPromptId?: string;
  emailQueryReformulationAIPromptId?: string;
  locale?: string;
  associationConfigurations?: AssociationConfiguration[];
}
export type ToolType = string;
export type ToolExampleList = string[];
export interface ToolInstruction {
  instruction?: string;
  examples?: string[];
}
export type ToolOverrideInputValueType = string;
export interface ToolOverrideConstantInputValue {
  type: string;
  value: string | redacted.Redacted<string>;
}
export type ToolOverrideInputValueConfiguration = {
  constant: ToolOverrideConstantInputValue;
};
export interface ToolOverrideInputValue {
  jsonPath: string;
  value: ToolOverrideInputValueConfiguration;
}
export type ToolOverrideInputValueList = ToolOverrideInputValue[];
export interface ToolOutputConfiguration {
  outputVariableNameOverride?: string;
  sessionDataNamespace?: string;
}
export interface ToolOutputFilter {
  jsonPath: string;
  outputConfiguration?: ToolOutputConfiguration;
}
export type ToolOutputFilterList = ToolOutputFilter[];
export type JSONDocument = unknown;
export interface Annotation {
  title?: string;
  destructiveHint?: boolean;
}
export interface UserInteractionConfiguration {
  isUserConfirmationRequired?: boolean;
}
export interface ToolConfiguration {
  toolName: string;
  toolType: string;
  title?: string | redacted.Redacted<string>;
  toolId?: string;
  description?: string | redacted.Redacted<string>;
  instruction?: ToolInstruction;
  overrideInputValues?: ToolOverrideInputValue[];
  outputFilters?: ToolOutputFilter[];
  inputSchema?: any;
  outputSchema?: any;
  annotations?: Annotation;
  userInteractionConfiguration?: UserInteractionConfiguration;
}
export type ToolConfigurationList = ToolConfiguration[];
export type GenericArn = string;
export interface OrchestrationAIAgentConfiguration {
  orchestrationAIPromptId: string;
  orchestrationAIGuardrailId?: string;
  toolConfigurations?: ToolConfiguration[];
  connectInstanceArn?: string;
  locale?: string;
}
export interface NoteTakingAIAgentConfiguration {
  noteTakingAIPromptId?: string;
  noteTakingAIGuardrailId?: string;
  locale?: string;
}
export interface CaseSummarizationAIAgentConfiguration {
  caseSummarizationAIPromptId?: string;
  caseSummarizationAIGuardrailId?: string;
  locale?: string;
}
export type AIAgentConfiguration =
  | {
      manualSearchAIAgentConfiguration: ManualSearchAIAgentConfiguration;
      answerRecommendationAIAgentConfiguration?: never;
      selfServiceAIAgentConfiguration?: never;
      emailResponseAIAgentConfiguration?: never;
      emailOverviewAIAgentConfiguration?: never;
      emailGenerativeAnswerAIAgentConfiguration?: never;
      orchestrationAIAgentConfiguration?: never;
      noteTakingAIAgentConfiguration?: never;
      caseSummarizationAIAgentConfiguration?: never;
    }
  | {
      manualSearchAIAgentConfiguration?: never;
      answerRecommendationAIAgentConfiguration: AnswerRecommendationAIAgentConfiguration;
      selfServiceAIAgentConfiguration?: never;
      emailResponseAIAgentConfiguration?: never;
      emailOverviewAIAgentConfiguration?: never;
      emailGenerativeAnswerAIAgentConfiguration?: never;
      orchestrationAIAgentConfiguration?: never;
      noteTakingAIAgentConfiguration?: never;
      caseSummarizationAIAgentConfiguration?: never;
    }
  | {
      manualSearchAIAgentConfiguration?: never;
      answerRecommendationAIAgentConfiguration?: never;
      selfServiceAIAgentConfiguration: SelfServiceAIAgentConfiguration;
      emailResponseAIAgentConfiguration?: never;
      emailOverviewAIAgentConfiguration?: never;
      emailGenerativeAnswerAIAgentConfiguration?: never;
      orchestrationAIAgentConfiguration?: never;
      noteTakingAIAgentConfiguration?: never;
      caseSummarizationAIAgentConfiguration?: never;
    }
  | {
      manualSearchAIAgentConfiguration?: never;
      answerRecommendationAIAgentConfiguration?: never;
      selfServiceAIAgentConfiguration?: never;
      emailResponseAIAgentConfiguration: EmailResponseAIAgentConfiguration;
      emailOverviewAIAgentConfiguration?: never;
      emailGenerativeAnswerAIAgentConfiguration?: never;
      orchestrationAIAgentConfiguration?: never;
      noteTakingAIAgentConfiguration?: never;
      caseSummarizationAIAgentConfiguration?: never;
    }
  | {
      manualSearchAIAgentConfiguration?: never;
      answerRecommendationAIAgentConfiguration?: never;
      selfServiceAIAgentConfiguration?: never;
      emailResponseAIAgentConfiguration?: never;
      emailOverviewAIAgentConfiguration: EmailOverviewAIAgentConfiguration;
      emailGenerativeAnswerAIAgentConfiguration?: never;
      orchestrationAIAgentConfiguration?: never;
      noteTakingAIAgentConfiguration?: never;
      caseSummarizationAIAgentConfiguration?: never;
    }
  | {
      manualSearchAIAgentConfiguration?: never;
      answerRecommendationAIAgentConfiguration?: never;
      selfServiceAIAgentConfiguration?: never;
      emailResponseAIAgentConfiguration?: never;
      emailOverviewAIAgentConfiguration?: never;
      emailGenerativeAnswerAIAgentConfiguration: EmailGenerativeAnswerAIAgentConfiguration;
      orchestrationAIAgentConfiguration?: never;
      noteTakingAIAgentConfiguration?: never;
      caseSummarizationAIAgentConfiguration?: never;
    }
  | {
      manualSearchAIAgentConfiguration?: never;
      answerRecommendationAIAgentConfiguration?: never;
      selfServiceAIAgentConfiguration?: never;
      emailResponseAIAgentConfiguration?: never;
      emailOverviewAIAgentConfiguration?: never;
      emailGenerativeAnswerAIAgentConfiguration?: never;
      orchestrationAIAgentConfiguration: OrchestrationAIAgentConfiguration;
      noteTakingAIAgentConfiguration?: never;
      caseSummarizationAIAgentConfiguration?: never;
    }
  | {
      manualSearchAIAgentConfiguration?: never;
      answerRecommendationAIAgentConfiguration?: never;
      selfServiceAIAgentConfiguration?: never;
      emailResponseAIAgentConfiguration?: never;
      emailOverviewAIAgentConfiguration?: never;
      emailGenerativeAnswerAIAgentConfiguration?: never;
      orchestrationAIAgentConfiguration?: never;
      noteTakingAIAgentConfiguration: NoteTakingAIAgentConfiguration;
      caseSummarizationAIAgentConfiguration?: never;
    }
  | {
      manualSearchAIAgentConfiguration?: never;
      answerRecommendationAIAgentConfiguration?: never;
      selfServiceAIAgentConfiguration?: never;
      emailResponseAIAgentConfiguration?: never;
      emailOverviewAIAgentConfiguration?: never;
      emailGenerativeAnswerAIAgentConfiguration?: never;
      orchestrationAIAgentConfiguration?: never;
      noteTakingAIAgentConfiguration?: never;
      caseSummarizationAIAgentConfiguration: CaseSummarizationAIAgentConfiguration;
    };
export type VisibilityStatus = string;
export type Tags = { [key: string]: string | undefined };
export type Description = string;
export interface CreateAIAgentRequest {
  clientToken?: string;
  assistantId: string;
  name: string;
  type: string;
  configuration: AIAgentConfiguration;
  visibilityStatus: string;
  tags?: { [key: string]: string | undefined };
  description?: string;
}
export type Arn = string;
export type Origin = string;
export type Status = string;
export interface AIAgentData {
  assistantId: string;
  assistantArn: string;
  aiAgentId: string;
  aiAgentArn: string;
  name: string;
  type: string;
  configuration: AIAgentConfiguration;
  modifiedTime?: Date;
  description?: string;
  visibilityStatus: string;
  tags?: { [key: string]: string | undefined };
  origin?: string;
  status?: string;
}
export interface CreateAIAgentResponse {
  aiAgent?: AIAgentData;
}
export interface CreateAIAgentVersionRequest {
  assistantId: string;
  aiAgentId: string;
  modifiedTime?: Date;
  clientToken?: string;
}
export interface CreateAIAgentVersionResponse {
  aiAgent?: AIAgentData;
  versionNumber?: number;
}
export type AIGuardrailBlockedMessaging = string | redacted.Redacted<string>;
export type AIGuardrailDescription = string | redacted.Redacted<string>;
export type GuardrailTopicName = string | redacted.Redacted<string>;
export type GuardrailTopicDefinition = string | redacted.Redacted<string>;
export type GuardrailTopicExample = string | redacted.Redacted<string>;
export type GuardrailTopicExamples = (string | redacted.Redacted<string>)[];
export type GuardrailTopicType = string | redacted.Redacted<string>;
export interface GuardrailTopicConfig {
  name: string | redacted.Redacted<string>;
  definition: string | redacted.Redacted<string>;
  examples?: (string | redacted.Redacted<string>)[];
  type: string | redacted.Redacted<string>;
}
export type GuardrailTopicsConfig = GuardrailTopicConfig[];
export interface AIGuardrailTopicPolicyConfig {
  topicsConfig: GuardrailTopicConfig[];
}
export type GuardrailContentFilterType = string | redacted.Redacted<string>;
export type GuardrailFilterStrength = string | redacted.Redacted<string>;
export interface GuardrailContentFilterConfig {
  type: string | redacted.Redacted<string>;
  inputStrength: string | redacted.Redacted<string>;
  outputStrength: string | redacted.Redacted<string>;
}
export type GuardrailContentFiltersConfig = GuardrailContentFilterConfig[];
export interface AIGuardrailContentPolicyConfig {
  filtersConfig: GuardrailContentFilterConfig[];
}
export type GuardrailWordText = string | redacted.Redacted<string>;
export interface GuardrailWordConfig {
  text: string | redacted.Redacted<string>;
}
export type GuardrailWordsConfig = GuardrailWordConfig[];
export type GuardrailManagedWordsType = string | redacted.Redacted<string>;
export interface GuardrailManagedWordsConfig {
  type: string | redacted.Redacted<string>;
}
export type GuardrailManagedWordListsConfig = GuardrailManagedWordsConfig[];
export interface AIGuardrailWordPolicyConfig {
  wordsConfig?: GuardrailWordConfig[];
  managedWordListsConfig?: GuardrailManagedWordsConfig[];
}
export type GuardrailPiiEntityType = string | redacted.Redacted<string>;
export type GuardrailSensitiveInformationAction =
  | string
  | redacted.Redacted<string>;
export interface GuardrailPiiEntityConfig {
  type: string | redacted.Redacted<string>;
  action: string | redacted.Redacted<string>;
}
export type GuardrailPiiEntitiesConfig = GuardrailPiiEntityConfig[];
export type GuardrailRegexName = string | redacted.Redacted<string>;
export type GuardrailRegexDescription = string | redacted.Redacted<string>;
export type GuardrailRegexPattern = string | redacted.Redacted<string>;
export interface GuardrailRegexConfig {
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  pattern: string | redacted.Redacted<string>;
  action: string | redacted.Redacted<string>;
}
export type GuardrailRegexesConfig = GuardrailRegexConfig[];
export interface AIGuardrailSensitiveInformationPolicyConfig {
  piiEntitiesConfig?: GuardrailPiiEntityConfig[];
  regexesConfig?: GuardrailRegexConfig[];
}
export type GuardrailContextualGroundingFilterType =
  | string
  | redacted.Redacted<string>;
export type GuardrailContextualGroundingFilterThreshold = number;
export interface GuardrailContextualGroundingFilterConfig {
  type: string | redacted.Redacted<string>;
  threshold: number;
}
export type GuardrailContextualGroundingFiltersConfig =
  GuardrailContextualGroundingFilterConfig[];
export interface AIGuardrailContextualGroundingPolicyConfig {
  filtersConfig: GuardrailContextualGroundingFilterConfig[];
}
export interface CreateAIGuardrailRequest {
  clientToken?: string;
  assistantId: string;
  name: string;
  blockedInputMessaging: string | redacted.Redacted<string>;
  blockedOutputsMessaging: string | redacted.Redacted<string>;
  visibilityStatus: string;
  description?: string | redacted.Redacted<string>;
  topicPolicyConfig?: AIGuardrailTopicPolicyConfig;
  contentPolicyConfig?: AIGuardrailContentPolicyConfig;
  wordPolicyConfig?: AIGuardrailWordPolicyConfig;
  sensitiveInformationPolicyConfig?: AIGuardrailSensitiveInformationPolicyConfig;
  contextualGroundingPolicyConfig?: AIGuardrailContextualGroundingPolicyConfig;
  tags?: { [key: string]: string | undefined };
}
export interface AIGuardrailData {
  assistantId: string;
  assistantArn: string;
  aiGuardrailArn: string;
  aiGuardrailId: string;
  name: string;
  visibilityStatus: string;
  blockedInputMessaging: string | redacted.Redacted<string>;
  blockedOutputsMessaging: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  topicPolicyConfig?: AIGuardrailTopicPolicyConfig;
  contentPolicyConfig?: AIGuardrailContentPolicyConfig;
  wordPolicyConfig?: AIGuardrailWordPolicyConfig;
  sensitiveInformationPolicyConfig?: AIGuardrailSensitiveInformationPolicyConfig;
  contextualGroundingPolicyConfig?: AIGuardrailContextualGroundingPolicyConfig;
  tags?: { [key: string]: string | undefined };
  status?: string;
  modifiedTime?: Date;
}
export interface CreateAIGuardrailResponse {
  aiGuardrail?: AIGuardrailData;
}
export interface CreateAIGuardrailVersionRequest {
  assistantId: string;
  aiGuardrailId: string;
  modifiedTime?: Date;
  clientToken?: string;
}
export interface CreateAIGuardrailVersionResponse {
  aiGuardrail?: AIGuardrailData;
  versionNumber?: number;
}
export type AIPromptType = string;
export type TextAIPrompt = string | redacted.Redacted<string>;
export interface TextFullAIPromptEditTemplateConfiguration {
  text: string | redacted.Redacted<string>;
}
export type AIPromptTemplateConfiguration = {
  textFullAIPromptEditTemplateConfiguration: TextFullAIPromptEditTemplateConfiguration;
};
export type AIPromptTemplateType = string;
export type AIPromptModelIdentifier = string;
export type AIPromptAPIFormat = string;
export type Probability = number;
export type TopK = number;
export type MaxTokensToSample = number;
export interface AIPromptInferenceConfiguration {
  temperature?: number;
  topP?: number;
  topK?: number;
  maxTokensToSample?: number;
}
export interface CreateAIPromptRequest {
  clientToken?: string;
  assistantId: string;
  name: string;
  type: string;
  templateConfiguration: AIPromptTemplateConfiguration;
  visibilityStatus: string;
  templateType: string;
  modelId: string;
  apiFormat: string;
  tags?: { [key: string]: string | undefined };
  description?: string;
  inferenceConfiguration?: AIPromptInferenceConfiguration;
}
export interface AIPromptData {
  assistantId: string;
  assistantArn: string;
  aiPromptId: string;
  aiPromptArn: string;
  name: string;
  type: string;
  templateType: string;
  modelId: string;
  apiFormat: string;
  templateConfiguration: AIPromptTemplateConfiguration;
  inferenceConfiguration?: AIPromptInferenceConfiguration;
  modifiedTime?: Date;
  description?: string;
  visibilityStatus: string;
  tags?: { [key: string]: string | undefined };
  origin?: string;
  status?: string;
}
export interface CreateAIPromptResponse {
  aiPrompt?: AIPromptData;
}
export interface CreateAIPromptVersionRequest {
  assistantId: string;
  aiPromptId: string;
  modifiedTime?: Date;
  clientToken?: string;
}
export interface CreateAIPromptVersionResponse {
  aiPrompt?: AIPromptData;
  versionNumber?: number;
}
export type AssistantType = string;
export interface ServerSideEncryptionConfiguration {
  kmsKeyId?: string;
}
export interface CreateAssistantRequest {
  clientToken?: string;
  name: string;
  type: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  serverSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
}
export type AssistantStatus = string;
export interface AssistantIntegrationConfiguration {
  topicIntegrationArn?: string;
}
export type AssistantCapabilityType = string;
export interface AssistantCapabilityConfiguration {
  type?: string;
}
export interface AIAgentConfigurationData {
  aiAgentId: string;
}
export type AIAgentConfigurationMap = {
  [key: string]: AIAgentConfigurationData | undefined;
};
export interface OrchestratorConfigurationEntry {
  aiAgentId?: string;
  orchestratorUseCase: string;
}
export type OrchestratorConfigurationList = OrchestratorConfigurationEntry[];
export interface AssistantData {
  assistantId: string;
  assistantArn: string;
  name: string;
  type: string;
  status: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  serverSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
  integrationConfiguration?: AssistantIntegrationConfiguration;
  capabilityConfiguration?: AssistantCapabilityConfiguration;
  aiAgentConfiguration?: {
    [key: string]: AIAgentConfigurationData | undefined;
  };
  orchestratorConfigurationList?: OrchestratorConfigurationEntry[];
}
export interface CreateAssistantResponse {
  assistant?: AssistantData;
}
export type AssociationType = string;
export type BedrockKnowledgeBaseArn = string;
export type AccessRoleArn = string;
export interface ExternalBedrockKnowledgeBaseConfig {
  bedrockKnowledgeBaseArn: string;
  accessRoleArn: string;
}
export type AssistantAssociationInputData =
  | { knowledgeBaseId: string; externalBedrockKnowledgeBaseConfig?: never }
  | {
      knowledgeBaseId?: never;
      externalBedrockKnowledgeBaseConfig: ExternalBedrockKnowledgeBaseConfig;
    };
export interface CreateAssistantAssociationRequest {
  assistantId: string;
  associationType: string;
  association: AssistantAssociationInputData;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export interface KnowledgeBaseAssociationData {
  knowledgeBaseId?: string;
  knowledgeBaseArn?: string;
}
export type AssistantAssociationOutputData =
  | {
      knowledgeBaseAssociation: KnowledgeBaseAssociationData;
      externalBedrockKnowledgeBaseConfig?: never;
    }
  | {
      knowledgeBaseAssociation?: never;
      externalBedrockKnowledgeBaseConfig: ExternalBedrockKnowledgeBaseConfig;
    };
export interface AssistantAssociationData {
  assistantAssociationId: string;
  assistantAssociationArn: string;
  assistantId: string;
  assistantArn: string;
  associationType: string;
  associationData: AssistantAssociationOutputData;
  tags?: { [key: string]: string | undefined };
}
export interface CreateAssistantAssociationResponse {
  assistantAssociation?: AssistantAssociationData;
}
export type ContentTitle = string;
export type Uri = string;
export type ContentMetadata = { [key: string]: string | undefined };
export type UploadId = string;
export interface CreateContentRequest {
  knowledgeBaseId: string;
  name: string;
  title?: string;
  overrideLinkOutUri?: string;
  metadata?: { [key: string]: string | undefined };
  uploadId: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type ContentType = string;
export type ContentStatus = string;
export type Url = string | redacted.Redacted<string>;
export interface ContentData {
  contentArn: string;
  contentId: string;
  knowledgeBaseArn: string;
  knowledgeBaseId: string;
  name: string;
  revisionId: string;
  title: string;
  contentType: string;
  status: string;
  metadata: { [key: string]: string | undefined };
  tags?: { [key: string]: string | undefined };
  linkOutUri?: string;
  url: string | redacted.Redacted<string>;
  urlExpiry: Date;
}
export interface CreateContentResponse {
  content?: ContentData;
}
export type ContentAssociationType = string;
export interface AmazonConnectGuideAssociationData {
  flowId?: string;
}
export type ContentAssociationContents = {
  amazonConnectGuideAssociation: AmazonConnectGuideAssociationData;
};
export interface CreateContentAssociationRequest {
  clientToken?: string;
  knowledgeBaseId: string;
  contentId: string;
  associationType: string;
  association: ContentAssociationContents;
  tags?: { [key: string]: string | undefined };
}
export interface ContentAssociationData {
  knowledgeBaseId: string;
  knowledgeBaseArn: string;
  contentId: string;
  contentArn: string;
  contentAssociationId: string;
  contentAssociationArn: string;
  associationType: string;
  associationData: ContentAssociationContents;
  tags?: { [key: string]: string | undefined };
}
export interface CreateContentAssociationResponse {
  contentAssociation?: ContentAssociationData;
}
export type KnowledgeBaseType = string;
export type ObjectFieldsList = string[];
export interface AppIntegrationsConfiguration {
  appIntegrationArn: string;
  objectFields?: string[];
}
export type WebUrl = string;
export interface SeedUrl {
  url?: string;
}
export type SeedUrls = SeedUrl[];
export interface UrlConfiguration {
  seedUrls?: SeedUrl[];
}
export interface WebCrawlerLimits {
  rateLimit?: number;
}
export type UrlFilterPattern = string | redacted.Redacted<string>;
export type UrlFilterList = (string | redacted.Redacted<string>)[];
export type WebScopeType = string;
export interface WebCrawlerConfiguration {
  urlConfiguration: UrlConfiguration;
  crawlerLimits?: WebCrawlerLimits;
  inclusionFilters?: (string | redacted.Redacted<string>)[];
  exclusionFilters?: (string | redacted.Redacted<string>)[];
  scope?: string;
}
export type ManagedSourceConfiguration = {
  webCrawlerConfiguration: WebCrawlerConfiguration;
};
export type SourceConfiguration =
  | {
      appIntegrations: AppIntegrationsConfiguration;
      managedSourceConfiguration?: never;
    }
  | {
      appIntegrations?: never;
      managedSourceConfiguration: ManagedSourceConfiguration;
    };
export interface RenderingConfiguration {
  templateUri?: string;
}
export type ChunkingStrategy = string;
export interface FixedSizeChunkingConfiguration {
  maxTokens: number;
  overlapPercentage: number;
}
export interface HierarchicalChunkingLevelConfiguration {
  maxTokens: number;
}
export type HierarchicalChunkingLevelConfigurations =
  HierarchicalChunkingLevelConfiguration[];
export interface HierarchicalChunkingConfiguration {
  levelConfigurations: HierarchicalChunkingLevelConfiguration[];
  overlapTokens: number;
}
export interface SemanticChunkingConfiguration {
  maxTokens: number;
  bufferSize: number;
  breakpointPercentileThreshold: number;
}
export interface ChunkingConfiguration {
  chunkingStrategy: string;
  fixedSizeChunkingConfiguration?: FixedSizeChunkingConfiguration;
  hierarchicalChunkingConfiguration?: HierarchicalChunkingConfiguration;
  semanticChunkingConfiguration?: SemanticChunkingConfiguration;
}
export type ParsingStrategy = string;
export type BedrockModelArnForParsing = string;
export type ParsingPromptText = string;
export interface ParsingPrompt {
  parsingPromptText: string;
}
export interface BedrockFoundationModelConfigurationForParsing {
  modelArn: string;
  parsingPrompt?: ParsingPrompt;
}
export interface ParsingConfiguration {
  parsingStrategy: string;
  bedrockFoundationModelConfiguration?: BedrockFoundationModelConfigurationForParsing;
}
export interface VectorIngestionConfiguration {
  chunkingConfiguration?: ChunkingConfiguration;
  parsingConfiguration?: ParsingConfiguration;
}
export interface CreateKnowledgeBaseRequest {
  clientToken?: string;
  name: string;
  knowledgeBaseType: string;
  sourceConfiguration?: SourceConfiguration;
  renderingConfiguration?: RenderingConfiguration;
  vectorIngestionConfiguration?: VectorIngestionConfiguration;
  serverSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export type KnowledgeBaseStatus = string;
export type SyncStatus = string;
export type FailureReason = string[];
export interface KnowledgeBaseData {
  knowledgeBaseId: string;
  knowledgeBaseArn: string;
  name: string;
  knowledgeBaseType: string;
  status: string;
  lastContentModificationTime?: Date;
  vectorIngestionConfiguration?: VectorIngestionConfiguration;
  sourceConfiguration?: SourceConfiguration;
  renderingConfiguration?: RenderingConfiguration;
  serverSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
  description?: string;
  tags?: { [key: string]: string | undefined };
  ingestionStatus?: string;
  ingestionFailureReasons?: string[];
}
export interface CreateKnowledgeBaseResponse {
  knowledgeBase?: KnowledgeBaseData;
}
export type NonEmptyUnlimitedString = string | redacted.Redacted<string>;
export type MessageTemplateBodyContentProvider = {
  content: string | redacted.Redacted<string>;
};
export interface EmailMessageTemplateContentBody {
  plainText?: MessageTemplateBodyContentProvider;
  html?: MessageTemplateBodyContentProvider;
}
export type EmailHeaderKey = string;
export type EmailHeaderValue = string | redacted.Redacted<string>;
export interface EmailHeader {
  name?: string;
  value?: string | redacted.Redacted<string>;
}
export type EmailHeaders = EmailHeader[];
export interface EmailMessageTemplateContent {
  subject?: string | redacted.Redacted<string>;
  body?: EmailMessageTemplateContentBody;
  headers?: EmailHeader[];
}
export interface SMSMessageTemplateContentBody {
  plainText?: MessageTemplateBodyContentProvider;
}
export interface SMSMessageTemplateContent {
  body?: SMSMessageTemplateContentBody;
}
export type WhatsAppMessageTemplateContentData = string;
export interface WhatsAppMessageTemplateContent {
  data?: string;
}
export type PushMessageAction = string;
export interface PushADMMessageTemplateContent {
  title?: string | redacted.Redacted<string>;
  body?: MessageTemplateBodyContentProvider;
  action?: string;
  sound?: string | redacted.Redacted<string>;
  url?: string | redacted.Redacted<string>;
  imageUrl?: string | redacted.Redacted<string>;
  imageIconUrl?: string | redacted.Redacted<string>;
  smallImageIconUrl?: string | redacted.Redacted<string>;
  rawContent?: MessageTemplateBodyContentProvider;
}
export interface PushAPNSMessageTemplateContent {
  title?: string | redacted.Redacted<string>;
  body?: MessageTemplateBodyContentProvider;
  action?: string;
  sound?: string | redacted.Redacted<string>;
  url?: string | redacted.Redacted<string>;
  mediaUrl?: string | redacted.Redacted<string>;
  rawContent?: MessageTemplateBodyContentProvider;
}
export interface PushFCMMessageTemplateContent {
  title?: string | redacted.Redacted<string>;
  body?: MessageTemplateBodyContentProvider;
  action?: string;
  sound?: string | redacted.Redacted<string>;
  url?: string | redacted.Redacted<string>;
  imageUrl?: string | redacted.Redacted<string>;
  imageIconUrl?: string | redacted.Redacted<string>;
  smallImageIconUrl?: string | redacted.Redacted<string>;
  rawContent?: MessageTemplateBodyContentProvider;
}
export interface PushBaiduMessageTemplateContent {
  title?: string | redacted.Redacted<string>;
  body?: MessageTemplateBodyContentProvider;
  action?: string;
  sound?: string | redacted.Redacted<string>;
  url?: string | redacted.Redacted<string>;
  imageUrl?: string | redacted.Redacted<string>;
  imageIconUrl?: string | redacted.Redacted<string>;
  smallImageIconUrl?: string | redacted.Redacted<string>;
  rawContent?: MessageTemplateBodyContentProvider;
}
export interface PushMessageTemplateContent {
  adm?: PushADMMessageTemplateContent;
  apns?: PushAPNSMessageTemplateContent;
  fcm?: PushFCMMessageTemplateContent;
  baidu?: PushBaiduMessageTemplateContent;
}
export type MessageTemplateContentProvider =
  | {
      email: EmailMessageTemplateContent;
      sms?: never;
      whatsApp?: never;
      push?: never;
    }
  | {
      email?: never;
      sms: SMSMessageTemplateContent;
      whatsApp?: never;
      push?: never;
    }
  | {
      email?: never;
      sms?: never;
      whatsApp: WhatsAppMessageTemplateContent;
      push?: never;
    }
  | {
      email?: never;
      sms?: never;
      whatsApp?: never;
      push: PushMessageTemplateContent;
    };
export type ChannelSubtype = string;
export type LanguageCode = string;
export type WhatsAppBusinessAccountId = string;
export type WhatsAppMessageTemplateId = string;
export type WhatsAppMessageTemplateComponent = string;
export type WhatsAppMessageTemplateComponents = string[];
export interface WhatsAppMessageTemplateSourceConfiguration {
  businessAccountId: string;
  templateId: string;
  components?: string[];
}
export type MessageTemplateSourceConfiguration = {
  whatsApp: WhatsAppMessageTemplateSourceConfiguration;
};
export type MessageTemplateAttributeValue = string | redacted.Redacted<string>;
export interface SystemEndpointAttributes {
  address?: string | redacted.Redacted<string>;
}
export interface SystemAttributes {
  name?: string | redacted.Redacted<string>;
  customerEndpoint?: SystemEndpointAttributes;
  systemEndpoint?: SystemEndpointAttributes;
}
export interface AgentAttributes {
  firstName?: string | redacted.Redacted<string>;
  lastName?: string | redacted.Redacted<string>;
}
export type MessageTemplateAttributeKey = string;
export type CustomAttributes = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export interface CustomerProfileAttributes {
  profileId?: string | redacted.Redacted<string>;
  profileARN?: string | redacted.Redacted<string>;
  firstName?: string | redacted.Redacted<string>;
  middleName?: string | redacted.Redacted<string>;
  lastName?: string | redacted.Redacted<string>;
  accountNumber?: string | redacted.Redacted<string>;
  emailAddress?: string | redacted.Redacted<string>;
  phoneNumber?: string | redacted.Redacted<string>;
  additionalInformation?: string | redacted.Redacted<string>;
  partyType?: string | redacted.Redacted<string>;
  businessName?: string | redacted.Redacted<string>;
  birthDate?: string | redacted.Redacted<string>;
  gender?: string | redacted.Redacted<string>;
  mobilePhoneNumber?: string | redacted.Redacted<string>;
  homePhoneNumber?: string | redacted.Redacted<string>;
  businessPhoneNumber?: string | redacted.Redacted<string>;
  businessEmailAddress?: string | redacted.Redacted<string>;
  address1?: string | redacted.Redacted<string>;
  address2?: string | redacted.Redacted<string>;
  address3?: string | redacted.Redacted<string>;
  address4?: string | redacted.Redacted<string>;
  city?: string | redacted.Redacted<string>;
  county?: string | redacted.Redacted<string>;
  country?: string | redacted.Redacted<string>;
  postalCode?: string | redacted.Redacted<string>;
  province?: string | redacted.Redacted<string>;
  state?: string | redacted.Redacted<string>;
  shippingAddress1?: string | redacted.Redacted<string>;
  shippingAddress2?: string | redacted.Redacted<string>;
  shippingAddress3?: string | redacted.Redacted<string>;
  shippingAddress4?: string | redacted.Redacted<string>;
  shippingCity?: string | redacted.Redacted<string>;
  shippingCounty?: string | redacted.Redacted<string>;
  shippingCountry?: string | redacted.Redacted<string>;
  shippingPostalCode?: string | redacted.Redacted<string>;
  shippingProvince?: string | redacted.Redacted<string>;
  shippingState?: string | redacted.Redacted<string>;
  mailingAddress1?: string | redacted.Redacted<string>;
  mailingAddress2?: string | redacted.Redacted<string>;
  mailingAddress3?: string | redacted.Redacted<string>;
  mailingAddress4?: string | redacted.Redacted<string>;
  mailingCity?: string | redacted.Redacted<string>;
  mailingCounty?: string | redacted.Redacted<string>;
  mailingCountry?: string | redacted.Redacted<string>;
  mailingPostalCode?: string | redacted.Redacted<string>;
  mailingProvince?: string | redacted.Redacted<string>;
  mailingState?: string | redacted.Redacted<string>;
  billingAddress1?: string | redacted.Redacted<string>;
  billingAddress2?: string | redacted.Redacted<string>;
  billingAddress3?: string | redacted.Redacted<string>;
  billingAddress4?: string | redacted.Redacted<string>;
  billingCity?: string | redacted.Redacted<string>;
  billingCounty?: string | redacted.Redacted<string>;
  billingCountry?: string | redacted.Redacted<string>;
  billingPostalCode?: string | redacted.Redacted<string>;
  billingProvince?: string | redacted.Redacted<string>;
  billingState?: string | redacted.Redacted<string>;
  custom?: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export interface MessageTemplateAttributes {
  systemAttributes?: SystemAttributes;
  agentAttributes?: AgentAttributes;
  customerProfileAttributes?: CustomerProfileAttributes;
  customAttributes?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
}
export type GroupingCriteria = string | redacted.Redacted<string>;
export type GroupingValue = string | redacted.Redacted<string>;
export type GroupingValues = (string | redacted.Redacted<string>)[];
export interface GroupingConfiguration {
  criteria?: string | redacted.Redacted<string>;
  values?: (string | redacted.Redacted<string>)[];
}
export interface CreateMessageTemplateRequest {
  knowledgeBaseId: string;
  name?: string;
  content?: MessageTemplateContentProvider;
  description?: string;
  channelSubtype: string;
  language?: string;
  sourceConfiguration?: MessageTemplateSourceConfiguration;
  defaultAttributes?: MessageTemplateAttributes;
  groupingConfiguration?: GroupingConfiguration;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type Channel = string | redacted.Redacted<string>;
export type WhatsAppMessageTemplateName = string;
export type WhatsAppMessageTemplateLanguage = string;
export type WhatsAppSourceConfigurationStatus = string;
export interface WhatsAppMessageTemplateSourceConfigurationSummary {
  businessAccountId: string;
  templateId: string;
  name?: string;
  language?: string;
  components?: string[];
  status?: string;
  statusReason?: string | redacted.Redacted<string>;
}
export type MessageTemplateSourceConfigurationSummary = {
  whatsApp: WhatsAppMessageTemplateSourceConfigurationSummary;
};
export type MessageTemplateAttributeType = string;
export type MessageTemplateAttributeTypeList = string[];
export type MessageTemplateContentSha256 = string;
export interface MessageTemplateData {
  messageTemplateArn: string;
  messageTemplateId: string;
  knowledgeBaseArn: string;
  knowledgeBaseId: string;
  name: string;
  channel?: string | redacted.Redacted<string>;
  channelSubtype: string;
  createdTime: Date;
  lastModifiedTime: Date;
  lastModifiedBy: string;
  content?: MessageTemplateContentProvider;
  description?: string;
  language?: string;
  sourceConfigurationSummary?: MessageTemplateSourceConfigurationSummary;
  groupingConfiguration?: GroupingConfiguration;
  defaultAttributes?: MessageTemplateAttributes;
  attributeTypes?: string[];
  messageTemplateContentSha256: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateMessageTemplateResponse {
  messageTemplate?: MessageTemplateData;
}
export type ContentDisposition = string;
export type AttachmentFileName = string | redacted.Redacted<string>;
export interface CreateMessageTemplateAttachmentRequest {
  knowledgeBaseId: string;
  messageTemplateId: string;
  contentDisposition: string;
  name: string | redacted.Redacted<string>;
  body: string | redacted.Redacted<string>;
  clientToken?: string;
}
export interface MessageTemplateAttachment {
  contentDisposition: string;
  name: string | redacted.Redacted<string>;
  uploadedTime: Date;
  url: string | redacted.Redacted<string>;
  urlExpiry: Date;
  attachmentId: string;
}
export interface CreateMessageTemplateAttachmentResponse {
  attachment?: MessageTemplateAttachment;
}
export interface CreateMessageTemplateVersionRequest {
  knowledgeBaseId: string;
  messageTemplateId: string;
  messageTemplateContentSha256?: string;
}
export type MessageTemplateAttachmentList = MessageTemplateAttachment[];
export interface ExtendedMessageTemplateData {
  messageTemplateArn: string;
  messageTemplateId: string;
  knowledgeBaseArn: string;
  knowledgeBaseId: string;
  name: string;
  channel?: string | redacted.Redacted<string>;
  channelSubtype: string;
  createdTime: Date;
  lastModifiedTime: Date;
  lastModifiedBy: string;
  content?: MessageTemplateContentProvider;
  description?: string;
  language?: string;
  sourceConfigurationSummary?: MessageTemplateSourceConfigurationSummary;
  groupingConfiguration?: GroupingConfiguration;
  defaultAttributes?: MessageTemplateAttributes;
  attributeTypes?: string[];
  attachments?: MessageTemplateAttachment[];
  isActive?: boolean;
  versionNumber?: number;
  messageTemplateContentSha256: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateMessageTemplateVersionResponse {
  messageTemplate?: ExtendedMessageTemplateData;
}
export type QuickResponseName = string;
export type QuickResponseContent = string | redacted.Redacted<string>;
export type QuickResponseDataProvider = {
  content: string | redacted.Redacted<string>;
};
export type QuickResponseType = string;
export type QuickResponseDescription = string;
export type ShortCutKey = string;
export type Channels = (string | redacted.Redacted<string>)[];
export interface CreateQuickResponseRequest {
  knowledgeBaseId: string;
  name: string;
  content: QuickResponseDataProvider;
  contentType?: string;
  groupingConfiguration?: GroupingConfiguration;
  description?: string;
  shortcutKey?: string;
  isActive?: boolean;
  channels?: (string | redacted.Redacted<string>)[];
  language?: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type QuickResponseStatus = string;
export type QuickResponseContentProvider = {
  content: string | redacted.Redacted<string>;
};
export interface QuickResponseContents {
  plainText?: QuickResponseContentProvider;
  markdown?: QuickResponseContentProvider;
}
export interface QuickResponseData {
  quickResponseArn: string;
  quickResponseId: string;
  knowledgeBaseArn: string;
  knowledgeBaseId: string;
  name: string;
  contentType: string;
  status: string;
  createdTime: Date;
  lastModifiedTime: Date;
  contents?: QuickResponseContents;
  description?: string;
  groupingConfiguration?: GroupingConfiguration;
  shortcutKey?: string;
  lastModifiedBy?: string;
  isActive?: boolean;
  channels?: (string | redacted.Redacted<string>)[];
  language?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateQuickResponseResponse {
  quickResponse?: QuickResponseData;
}
export interface CreateSessionRequest {
  clientToken?: string;
  assistantId: string;
  name: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  tagFilter?: TagFilter;
  aiAgentConfiguration?: {
    [key: string]: AIAgentConfigurationData | undefined;
  };
  contactArn?: string;
  orchestratorConfigurationList?: OrchestratorConfigurationEntry[];
  removeOrchestratorConfigurationList?: boolean;
}
export interface SessionIntegrationConfiguration {
  topicIntegrationArn?: string;
}
export interface SessionData {
  sessionArn: string;
  sessionId: string;
  name: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  integrationConfiguration?: SessionIntegrationConfiguration;
  tagFilter?: TagFilter;
  aiAgentConfiguration?: {
    [key: string]: AIAgentConfigurationData | undefined;
  };
  origin?: string;
  orchestratorConfigurationList?: OrchestratorConfigurationEntry[];
}
export interface CreateSessionResponse {
  session?: SessionData;
}
export interface DeactivateMessageTemplateRequest {
  knowledgeBaseId: string;
  messageTemplateId: string;
  versionNumber: number;
}
export interface DeactivateMessageTemplateResponse {
  messageTemplateArn: string;
  messageTemplateId: string;
  versionNumber: number;
}
export interface DeleteAIAgentRequest {
  assistantId: string;
  aiAgentId: string;
}
export interface DeleteAIAgentResponse {}
export interface DeleteAIAgentVersionRequest {
  assistantId: string;
  aiAgentId: string;
  versionNumber: number;
}
export interface DeleteAIAgentVersionResponse {}
export interface DeleteAIGuardrailRequest {
  assistantId: string;
  aiGuardrailId: string;
}
export interface DeleteAIGuardrailResponse {}
export interface DeleteAIGuardrailVersionRequest {
  assistantId: string;
  aiGuardrailId: string;
  versionNumber: number;
}
export interface DeleteAIGuardrailVersionResponse {}
export interface DeleteAIPromptRequest {
  assistantId: string;
  aiPromptId: string;
}
export interface DeleteAIPromptResponse {}
export interface DeleteAIPromptVersionRequest {
  assistantId: string;
  aiPromptId: string;
  versionNumber: number;
}
export interface DeleteAIPromptVersionResponse {}
export interface DeleteAssistantRequest {
  assistantId: string;
}
export interface DeleteAssistantResponse {}
export interface DeleteAssistantAssociationRequest {
  assistantAssociationId: string;
  assistantId: string;
}
export interface DeleteAssistantAssociationResponse {}
export interface DeleteContentRequest {
  knowledgeBaseId: string;
  contentId: string;
}
export interface DeleteContentResponse {}
export interface DeleteContentAssociationRequest {
  knowledgeBaseId: string;
  contentId: string;
  contentAssociationId: string;
}
export interface DeleteContentAssociationResponse {}
export interface DeleteImportJobRequest {
  knowledgeBaseId: string;
  importJobId: string;
}
export interface DeleteImportJobResponse {}
export interface DeleteKnowledgeBaseRequest {
  knowledgeBaseId: string;
}
export interface DeleteKnowledgeBaseResponse {}
export interface DeleteMessageTemplateRequest {
  knowledgeBaseId: string;
  messageTemplateId: string;
}
export interface DeleteMessageTemplateResponse {}
export interface DeleteMessageTemplateAttachmentRequest {
  knowledgeBaseId: string;
  messageTemplateId: string;
  attachmentId: string;
}
export interface DeleteMessageTemplateAttachmentResponse {}
export interface DeleteQuickResponseRequest {
  knowledgeBaseId: string;
  quickResponseId: string;
}
export interface DeleteQuickResponseResponse {}
export interface GetAIAgentRequest {
  assistantId: string;
  aiAgentId: string;
}
export interface GetAIAgentResponse {
  aiAgent?: AIAgentData;
  versionNumber?: number;
}
export interface GetAIGuardrailRequest {
  assistantId: string;
  aiGuardrailId: string;
}
export interface GetAIGuardrailResponse {
  aiGuardrail?: AIGuardrailData;
  versionNumber?: number;
}
export interface GetAIPromptRequest {
  assistantId: string;
  aiPromptId: string;
}
export interface GetAIPromptResponse {
  aiPrompt?: AIPromptData;
  versionNumber?: number;
}
export interface GetAssistantRequest {
  assistantId: string;
}
export interface GetAssistantResponse {
  assistant?: AssistantData;
}
export interface GetAssistantAssociationRequest {
  assistantAssociationId: string;
  assistantId: string;
}
export interface GetAssistantAssociationResponse {
  assistantAssociation?: AssistantAssociationData;
}
export interface GetContentRequest {
  contentId: string;
  knowledgeBaseId: string;
}
export interface GetContentResponse {
  content?: ContentData;
}
export interface GetContentAssociationRequest {
  knowledgeBaseId: string;
  contentId: string;
  contentAssociationId: string;
}
export interface GetContentAssociationResponse {
  contentAssociation?: ContentAssociationData;
}
export interface GetContentSummaryRequest {
  contentId: string;
  knowledgeBaseId: string;
}
export interface ContentSummary {
  contentArn: string;
  contentId: string;
  knowledgeBaseArn: string;
  knowledgeBaseId: string;
  name: string;
  revisionId: string;
  title: string;
  contentType: string;
  status: string;
  metadata: { [key: string]: string | undefined };
  tags?: { [key: string]: string | undefined };
}
export interface GetContentSummaryResponse {
  contentSummary?: ContentSummary;
}
export interface GetImportJobRequest {
  importJobId: string;
  knowledgeBaseId: string;
}
export type ImportJobType = string;
export type ImportJobStatus = string;
export type ExternalSource = string;
export interface ConnectConfiguration {
  instanceId?: string;
}
export type Configuration = { connectConfiguration: ConnectConfiguration };
export interface ExternalSourceConfiguration {
  source: string;
  configuration: Configuration;
}
export interface ImportJobData {
  importJobId: string;
  knowledgeBaseId: string;
  uploadId: string;
  knowledgeBaseArn: string;
  importJobType: string;
  status: string;
  url: string | redacted.Redacted<string>;
  failedRecordReport?: string | redacted.Redacted<string>;
  urlExpiry: Date;
  createdTime: Date;
  lastModifiedTime: Date;
  metadata?: { [key: string]: string | undefined };
  externalSourceConfiguration?: ExternalSourceConfiguration;
}
export interface GetImportJobResponse {
  importJob?: ImportJobData;
}
export interface GetKnowledgeBaseRequest {
  knowledgeBaseId: string;
}
export interface GetKnowledgeBaseResponse {
  knowledgeBase?: KnowledgeBaseData;
}
export interface GetMessageTemplateRequest {
  messageTemplateId: string;
  knowledgeBaseId: string;
}
export interface GetMessageTemplateResponse {
  messageTemplate?: ExtendedMessageTemplateData;
}
export type NextToken = string;
export interface GetNextMessageRequest {
  assistantId: string;
  sessionId: string;
  nextMessageToken: string;
}
export type MessageType = string;
export type SensitiveString = string | redacted.Redacted<string>;
export type CitationSpanOffset = number;
export interface CitationSpan {
  beginOffsetInclusive?: number;
  endOffsetExclusive?: number;
}
export type ReferenceType = string;
export interface Citation {
  contentId?: string;
  title?: string | redacted.Redacted<string>;
  knowledgeBaseId?: string;
  citationSpan: CitationSpan;
  sourceURL?: string | redacted.Redacted<string>;
  referenceType: string;
}
export type Citations = Citation[];
export interface AIGuardrailAssessment {
  blocked: boolean;
}
export interface TextMessage {
  value?: string | redacted.Redacted<string>;
  citations?: Citation[];
  aiGuardrailAssessment?: AIGuardrailAssessment;
}
export interface ToolUseResultData {
  toolUseId: string;
  toolName: string;
  toolResult: any;
  inputSchema?: any;
}
export type MessageData =
  | { text: TextMessage; toolUseResult?: never }
  | { text?: never; toolUseResult: ToolUseResultData };
export type Participant = string;
export interface MessageOutput {
  value: MessageData;
  messageId: string;
  participant: string;
  timestamp: Date;
}
export type ConversationStatus = string;
export type ConversationStatusReason = string;
export interface ConversationState {
  status: string;
  reason?: string;
}
export type RuntimeSessionDataValue = {
  stringValue: string | redacted.Redacted<string>;
};
export interface RuntimeSessionData {
  key: string | redacted.Redacted<string>;
  value: RuntimeSessionDataValue;
}
export type RuntimeSessionDataList = RuntimeSessionData[];
export interface GetNextMessageResponse {
  type: string;
  response: MessageOutput;
  requestMessageId: string;
  conversationState: ConversationState;
  nextMessageToken?: string;
  conversationSessionData?: RuntimeSessionData[];
  chunkedResponseTerminated?: boolean;
}
export interface GetQuickResponseRequest {
  quickResponseId: string;
  knowledgeBaseId: string;
}
export interface GetQuickResponseResponse {
  quickResponse?: QuickResponseData;
}
export type WaitTimeSeconds = number;
export type RecommendationType = string;
export interface GetRecommendationsRequest {
  assistantId: string;
  sessionId: string;
  maxResults?: number;
  waitTimeSeconds?: number;
  nextChunkToken?: string;
  recommendationType?: string;
}
export type RecommendationId = string;
export interface ContentReference {
  knowledgeBaseArn?: string;
  knowledgeBaseId?: string;
  contentArn?: string;
  contentId?: string;
  sourceURL?: string;
  referenceType?: string;
}
export type HighlightOffset = number;
export interface Highlight {
  beginOffsetInclusive?: number;
  endOffsetExclusive?: number;
}
export type Highlights = Highlight[];
export interface DocumentText {
  text?: string | redacted.Redacted<string>;
  highlights?: Highlight[];
}
export interface Document {
  contentReference: ContentReference;
  title?: DocumentText;
  excerpt?: DocumentText;
}
export type RelevanceScore = number;
export type RelevanceLevel = string;
export type LlmModelId = string;
export interface GenerativeReference {
  modelId?: string;
  generationId?: string;
}
export interface SuggestedMessageReference {
  aiAgentId: string;
  aiAgentArn: string;
}
export type DataReference =
  | {
      contentReference: ContentReference;
      generativeReference?: never;
      suggestedMessageReference?: never;
    }
  | {
      contentReference?: never;
      generativeReference: GenerativeReference;
      suggestedMessageReference?: never;
    }
  | {
      contentReference?: never;
      generativeReference?: never;
      suggestedMessageReference: SuggestedMessageReference;
    };
export interface TextData {
  title?: DocumentText;
  excerpt?: DocumentText;
}
export interface RankingData {
  relevanceScore?: number;
  relevanceLevel?: string;
}
export interface ContentDataDetails {
  textData: TextData;
  rankingData: RankingData;
}
export type DataSummaryList = DataSummary[];
export interface GenerativeDataDetails {
  completion: string | redacted.Redacted<string>;
  references: DataSummary[];
  rankingData: RankingData;
}
export interface IntentDetectedDataDetails {
  intent: string | redacted.Redacted<string>;
  intentId: string;
  relevanceLevel?: string;
}
export type SourceContentType = string;
export interface SourceContentDataDetails {
  id: string;
  type: string;
  textData: TextData;
  rankingData: RankingData;
  citationSpan?: CitationSpan;
}
export interface GenerativeChunkDataDetails {
  completion?: string | redacted.Redacted<string>;
  references?: DataSummary[];
  nextChunkToken?: string;
}
export interface EmailResponseChunkDataDetails {
  completion?: string | redacted.Redacted<string>;
  nextChunkToken?: string;
}
export interface EmailOverviewChunkDataDetails {
  completion?: string | redacted.Redacted<string>;
  nextChunkToken?: string;
}
export interface EmailGenerativeAnswerChunkDataDetails {
  completion?: string | redacted.Redacted<string>;
  references?: DataSummary[];
  nextChunkToken?: string;
}
export interface CaseSummarizationChunkDataDetails {
  completion?: string | redacted.Redacted<string>;
  nextChunkToken?: string;
}
export interface SuggestedMessageDataDetails {
  messageText: string | redacted.Redacted<string>;
}
export interface NotesDataDetails {
  completion?: string | redacted.Redacted<string>;
}
export interface NotesChunkDataDetails {
  completion?: string | redacted.Redacted<string>;
  nextChunkToken?: string;
}
export type DataDetails =
  | {
      contentData: ContentDataDetails;
      generativeData?: never;
      intentDetectedData?: never;
      sourceContentData?: never;
      generativeChunkData?: never;
      emailResponseChunkData?: never;
      emailOverviewChunkData?: never;
      emailGenerativeAnswerChunkData?: never;
      caseSummarizationChunkData?: never;
      suggestedMessageData?: never;
      notesData?: never;
      notesChunkData?: never;
    }
  | {
      contentData?: never;
      generativeData: GenerativeDataDetails;
      intentDetectedData?: never;
      sourceContentData?: never;
      generativeChunkData?: never;
      emailResponseChunkData?: never;
      emailOverviewChunkData?: never;
      emailGenerativeAnswerChunkData?: never;
      caseSummarizationChunkData?: never;
      suggestedMessageData?: never;
      notesData?: never;
      notesChunkData?: never;
    }
  | {
      contentData?: never;
      generativeData?: never;
      intentDetectedData: IntentDetectedDataDetails;
      sourceContentData?: never;
      generativeChunkData?: never;
      emailResponseChunkData?: never;
      emailOverviewChunkData?: never;
      emailGenerativeAnswerChunkData?: never;
      caseSummarizationChunkData?: never;
      suggestedMessageData?: never;
      notesData?: never;
      notesChunkData?: never;
    }
  | {
      contentData?: never;
      generativeData?: never;
      intentDetectedData?: never;
      sourceContentData: SourceContentDataDetails;
      generativeChunkData?: never;
      emailResponseChunkData?: never;
      emailOverviewChunkData?: never;
      emailGenerativeAnswerChunkData?: never;
      caseSummarizationChunkData?: never;
      suggestedMessageData?: never;
      notesData?: never;
      notesChunkData?: never;
    }
  | {
      contentData?: never;
      generativeData?: never;
      intentDetectedData?: never;
      sourceContentData?: never;
      generativeChunkData: GenerativeChunkDataDetails;
      emailResponseChunkData?: never;
      emailOverviewChunkData?: never;
      emailGenerativeAnswerChunkData?: never;
      caseSummarizationChunkData?: never;
      suggestedMessageData?: never;
      notesData?: never;
      notesChunkData?: never;
    }
  | {
      contentData?: never;
      generativeData?: never;
      intentDetectedData?: never;
      sourceContentData?: never;
      generativeChunkData?: never;
      emailResponseChunkData: EmailResponseChunkDataDetails;
      emailOverviewChunkData?: never;
      emailGenerativeAnswerChunkData?: never;
      caseSummarizationChunkData?: never;
      suggestedMessageData?: never;
      notesData?: never;
      notesChunkData?: never;
    }
  | {
      contentData?: never;
      generativeData?: never;
      intentDetectedData?: never;
      sourceContentData?: never;
      generativeChunkData?: never;
      emailResponseChunkData?: never;
      emailOverviewChunkData: EmailOverviewChunkDataDetails;
      emailGenerativeAnswerChunkData?: never;
      caseSummarizationChunkData?: never;
      suggestedMessageData?: never;
      notesData?: never;
      notesChunkData?: never;
    }
  | {
      contentData?: never;
      generativeData?: never;
      intentDetectedData?: never;
      sourceContentData?: never;
      generativeChunkData?: never;
      emailResponseChunkData?: never;
      emailOverviewChunkData?: never;
      emailGenerativeAnswerChunkData: EmailGenerativeAnswerChunkDataDetails;
      caseSummarizationChunkData?: never;
      suggestedMessageData?: never;
      notesData?: never;
      notesChunkData?: never;
    }
  | {
      contentData?: never;
      generativeData?: never;
      intentDetectedData?: never;
      sourceContentData?: never;
      generativeChunkData?: never;
      emailResponseChunkData?: never;
      emailOverviewChunkData?: never;
      emailGenerativeAnswerChunkData?: never;
      caseSummarizationChunkData: CaseSummarizationChunkDataDetails;
      suggestedMessageData?: never;
      notesData?: never;
      notesChunkData?: never;
    }
  | {
      contentData?: never;
      generativeData?: never;
      intentDetectedData?: never;
      sourceContentData?: never;
      generativeChunkData?: never;
      emailResponseChunkData?: never;
      emailOverviewChunkData?: never;
      emailGenerativeAnswerChunkData?: never;
      caseSummarizationChunkData?: never;
      suggestedMessageData: SuggestedMessageDataDetails;
      notesData?: never;
      notesChunkData?: never;
    }
  | {
      contentData?: never;
      generativeData?: never;
      intentDetectedData?: never;
      sourceContentData?: never;
      generativeChunkData?: never;
      emailResponseChunkData?: never;
      emailOverviewChunkData?: never;
      emailGenerativeAnswerChunkData?: never;
      caseSummarizationChunkData?: never;
      suggestedMessageData?: never;
      notesData: NotesDataDetails;
      notesChunkData?: never;
    }
  | {
      contentData?: never;
      generativeData?: never;
      intentDetectedData?: never;
      sourceContentData?: never;
      generativeChunkData?: never;
      emailResponseChunkData?: never;
      emailOverviewChunkData?: never;
      emailGenerativeAnswerChunkData?: never;
      caseSummarizationChunkData?: never;
      suggestedMessageData?: never;
      notesData?: never;
      notesChunkData: NotesChunkDataDetails;
    };
export interface DataSummary {
  reference: DataReference;
  details: DataDetails;
}
export interface RecommendationData {
  recommendationId: string;
  document?: Document;
  relevanceScore?: number;
  relevanceLevel?: string;
  type?: string;
  data?: DataSummary;
}
export type RecommendationList = RecommendationData[];
export type RecommendationTriggerType = string;
export type RecommendationSourceType = string;
export type QueryText = string | redacted.Redacted<string>;
export interface QueryRecommendationTriggerData {
  text?: string | redacted.Redacted<string>;
}
export type RecommendationTriggerData = {
  query: QueryRecommendationTriggerData;
};
export type RecommendationIdList = string[];
export interface RecommendationTrigger {
  id: string;
  type: string;
  source: string;
  data: RecommendationTriggerData;
  recommendationIds: string[];
}
export type RecommendationTriggerList = RecommendationTrigger[];
export interface GetRecommendationsResponse {
  recommendations: RecommendationData[];
  triggers?: RecommendationTrigger[];
}
export interface GetSessionRequest {
  assistantId: string;
  sessionId: string;
}
export interface GetSessionResponse {
  session?: SessionData;
}
export interface ListAIAgentsRequest {
  assistantId: string;
  nextToken?: string;
  maxResults?: number;
  origin?: string;
}
export interface AIAgentSummary {
  name: string;
  assistantId: string;
  assistantArn: string;
  aiAgentId: string;
  type: string;
  aiAgentArn: string;
  modifiedTime?: Date;
  visibilityStatus: string;
  configuration?: AIAgentConfiguration;
  origin?: string;
  description?: string;
  status?: string;
  tags?: { [key: string]: string | undefined };
}
export type AIAgentSummaryList = AIAgentSummary[];
export interface ListAIAgentsResponse {
  aiAgentSummaries: AIAgentSummary[];
  nextToken?: string;
}
export interface ListAIAgentVersionsRequest {
  assistantId: string;
  aiAgentId: string;
  nextToken?: string;
  maxResults?: number;
  origin?: string;
}
export interface AIAgentVersionSummary {
  aiAgentSummary?: AIAgentSummary;
  versionNumber?: number;
}
export type AIAgentVersionSummariesList = AIAgentVersionSummary[];
export interface ListAIAgentVersionsResponse {
  aiAgentVersionSummaries: AIAgentVersionSummary[];
  nextToken?: string;
}
export interface ListAIGuardrailsRequest {
  assistantId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface AIGuardrailSummary {
  name: string;
  assistantId: string;
  assistantArn: string;
  aiGuardrailId: string;
  aiGuardrailArn: string;
  modifiedTime?: Date;
  visibilityStatus: string;
  description?: string | redacted.Redacted<string>;
  status?: string;
  tags?: { [key: string]: string | undefined };
}
export type AIGuardrailSummariesList = AIGuardrailSummary[];
export interface ListAIGuardrailsResponse {
  aiGuardrailSummaries: AIGuardrailSummary[];
  nextToken?: string;
}
export interface ListAIGuardrailVersionsRequest {
  assistantId: string;
  aiGuardrailId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface AIGuardrailVersionSummary {
  aiGuardrailSummary?: AIGuardrailSummary;
  versionNumber?: number;
}
export type AIGuardrailVersionSummariesList = AIGuardrailVersionSummary[];
export interface ListAIGuardrailVersionsResponse {
  aiGuardrailVersionSummaries: AIGuardrailVersionSummary[];
  nextToken?: string;
}
export interface ListAIPromptsRequest {
  assistantId: string;
  nextToken?: string;
  maxResults?: number;
  origin?: string;
}
export interface AIPromptSummary {
  name: string;
  assistantId: string;
  assistantArn: string;
  aiPromptId: string;
  type: string;
  aiPromptArn: string;
  modifiedTime?: Date;
  templateType: string;
  modelId: string;
  apiFormat: string;
  visibilityStatus: string;
  origin?: string;
  description?: string;
  status?: string;
  tags?: { [key: string]: string | undefined };
}
export type AIPromptSummaryList = AIPromptSummary[];
export interface ListAIPromptsResponse {
  aiPromptSummaries: AIPromptSummary[];
  nextToken?: string;
}
export interface ListAIPromptVersionsRequest {
  assistantId: string;
  aiPromptId: string;
  nextToken?: string;
  maxResults?: number;
  origin?: string;
}
export interface AIPromptVersionSummary {
  aiPromptSummary?: AIPromptSummary;
  versionNumber?: number;
}
export type AIPromptVersionSummariesList = AIPromptVersionSummary[];
export interface ListAIPromptVersionsResponse {
  aiPromptVersionSummaries: AIPromptVersionSummary[];
  nextToken?: string;
}
export interface ListAssistantAssociationsRequest {
  nextToken?: string;
  maxResults?: number;
  assistantId: string;
}
export interface AssistantAssociationSummary {
  assistantAssociationId: string;
  assistantAssociationArn: string;
  assistantId: string;
  assistantArn: string;
  associationType: string;
  associationData: AssistantAssociationOutputData;
  tags?: { [key: string]: string | undefined };
}
export type AssistantAssociationSummaryList = AssistantAssociationSummary[];
export interface ListAssistantAssociationsResponse {
  assistantAssociationSummaries: AssistantAssociationSummary[];
  nextToken?: string;
}
export interface ListAssistantsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface AssistantSummary {
  assistantId: string;
  assistantArn: string;
  name: string;
  type: string;
  status: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  serverSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
  integrationConfiguration?: AssistantIntegrationConfiguration;
  capabilityConfiguration?: AssistantCapabilityConfiguration;
  aiAgentConfiguration?: {
    [key: string]: AIAgentConfigurationData | undefined;
  };
  orchestratorConfigurationList?: OrchestratorConfigurationEntry[];
}
export type AssistantList = AssistantSummary[];
export interface ListAssistantsResponse {
  assistantSummaries: AssistantSummary[];
  nextToken?: string;
}
export interface ListContentAssociationsRequest {
  nextToken?: string;
  maxResults?: number;
  knowledgeBaseId: string;
  contentId: string;
}
export interface ContentAssociationSummary {
  knowledgeBaseId: string;
  knowledgeBaseArn: string;
  contentId: string;
  contentArn: string;
  contentAssociationId: string;
  contentAssociationArn: string;
  associationType: string;
  associationData: ContentAssociationContents;
  tags?: { [key: string]: string | undefined };
}
export type ContentAssociationSummaryList = ContentAssociationSummary[];
export interface ListContentAssociationsResponse {
  contentAssociationSummaries: ContentAssociationSummary[];
  nextToken?: string;
}
export interface ListContentsRequest {
  nextToken?: string;
  maxResults?: number;
  knowledgeBaseId: string;
}
export type ContentSummaryList = ContentSummary[];
export interface ListContentsResponse {
  contentSummaries: ContentSummary[];
  nextToken?: string;
}
export interface ListImportJobsRequest {
  nextToken?: string;
  maxResults?: number;
  knowledgeBaseId: string;
}
export interface ImportJobSummary {
  importJobId: string;
  knowledgeBaseId: string;
  uploadId: string;
  knowledgeBaseArn: string;
  importJobType: string;
  status: string;
  createdTime: Date;
  lastModifiedTime: Date;
  metadata?: { [key: string]: string | undefined };
  externalSourceConfiguration?: ExternalSourceConfiguration;
}
export type ImportJobList = ImportJobSummary[];
export interface ListImportJobsResponse {
  importJobSummaries: ImportJobSummary[];
  nextToken?: string;
}
export interface ListKnowledgeBasesRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface KnowledgeBaseSummary {
  knowledgeBaseId: string;
  knowledgeBaseArn: string;
  name: string;
  knowledgeBaseType: string;
  status: string;
  sourceConfiguration?: SourceConfiguration;
  vectorIngestionConfiguration?: VectorIngestionConfiguration;
  renderingConfiguration?: RenderingConfiguration;
  serverSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export type KnowledgeBaseList = KnowledgeBaseSummary[];
export interface ListKnowledgeBasesResponse {
  knowledgeBaseSummaries: KnowledgeBaseSummary[];
  nextToken?: string;
}
export type MessageFilterType = string;
export interface ListMessagesRequest {
  assistantId: string;
  sessionId: string;
  nextToken?: string;
  maxResults?: number;
  filter?: string;
}
export type MessageList = MessageOutput[];
export interface ListMessagesResponse {
  messages: MessageOutput[];
  nextToken?: string;
}
export interface ListMessageTemplatesRequest {
  nextToken?: string;
  maxResults?: number;
  knowledgeBaseId: string;
}
export interface MessageTemplateSummary {
  messageTemplateArn: string;
  messageTemplateId: string;
  knowledgeBaseArn: string;
  knowledgeBaseId: string;
  name: string;
  channel?: string | redacted.Redacted<string>;
  channelSubtype: string;
  createdTime: Date;
  lastModifiedTime: Date;
  lastModifiedBy: string;
  sourceConfiguration?: MessageTemplateSourceConfiguration;
  activeVersionNumber?: number;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export type MessageTemplateSummaryList = MessageTemplateSummary[];
export interface ListMessageTemplatesResponse {
  messageTemplateSummaries: MessageTemplateSummary[];
  nextToken?: string;
}
export interface ListMessageTemplateVersionsRequest {
  knowledgeBaseId: string;
  messageTemplateId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface MessageTemplateVersionSummary {
  messageTemplateArn: string;
  messageTemplateId: string;
  knowledgeBaseArn: string;
  knowledgeBaseId: string;
  name: string;
  channel?: string | redacted.Redacted<string>;
  channelSubtype: string;
  isActive: boolean;
  versionNumber: number;
}
export type MessageTemplateVersionSummaryList = MessageTemplateVersionSummary[];
export interface ListMessageTemplateVersionsResponse {
  messageTemplateVersionSummaries: MessageTemplateVersionSummary[];
  nextToken?: string;
}
export type ModelLifecycle = string;
export interface ListModelsRequest {
  assistantId: string;
  aiPromptType?: string;
  modelLifecycle?: string;
  nextToken?: string;
  maxResults?: number;
}
export type ModelId = string;
export type ModelDisplayName = string;
export type CrossRegionStatus = string;
export type AIPromptTypeList = string[];
export interface ModelSummary {
  modelId: string;
  displayName: string;
  crossRegionStatus?: string;
  supportsPromptCaching?: boolean;
  supportedAIPromptTypes?: string[];
  modelLifecycle?: string;
  legacyTimestamp?: Date;
  endOfLifeTimestamp?: Date;
}
export type ModelSummaryList = ModelSummary[];
export interface ListModelsResponse {
  modelSummaries: ModelSummary[];
  nextToken?: string;
}
export interface ListQuickResponsesRequest {
  nextToken?: string;
  maxResults?: number;
  knowledgeBaseId: string;
}
export interface QuickResponseSummary {
  quickResponseArn: string;
  quickResponseId: string;
  knowledgeBaseArn: string;
  knowledgeBaseId: string;
  name: string;
  contentType: string;
  status: string;
  createdTime: Date;
  lastModifiedTime: Date;
  description?: string;
  lastModifiedBy?: string;
  isActive?: boolean;
  channels?: (string | redacted.Redacted<string>)[];
  tags?: { [key: string]: string | undefined };
}
export type QuickResponseSummaryList = QuickResponseSummary[];
export interface ListQuickResponsesResponse {
  quickResponseSummaries: QuickResponseSummary[];
  nextToken?: string;
}
export interface ListSpansRequest {
  assistantId: string;
  sessionId: string;
  nextToken?: string;
  maxResults?: number;
}
export type SpanType = string;
export type SpanStatus = string;
export type SpanFinishReasonList = string[];
export interface SpanCitation {
  contentId?: string;
  title?: string | redacted.Redacted<string>;
  knowledgeBaseId?: string;
  knowledgeBaseArn?: string;
}
export type SpanCitationList = SpanCitation[];
export interface SpanTextValue {
  value: string | redacted.Redacted<string>;
  citations?: SpanCitation[];
  aiGuardrailAssessment?: AIGuardrailAssessment;
}
export interface SpanToolUseValue {
  toolUseId: string;
  name: string;
  arguments: any;
}
export interface SpanToolResultValue {
  toolUseId: string;
  values: SpanMessageValue[];
  error?: string;
}
export interface SpanReasoningValue {
  value: string | redacted.Redacted<string>;
}
export type SpanMessageValue =
  | {
      text: SpanTextValue;
      toolUse?: never;
      toolResult?: never;
      reasoning?: never;
    }
  | {
      text?: never;
      toolUse: SpanToolUseValue;
      toolResult?: never;
      reasoning?: never;
    }
  | {
      text?: never;
      toolUse?: never;
      toolResult: SpanToolResultValue;
      reasoning?: never;
    }
  | {
      text?: never;
      toolUse?: never;
      toolResult?: never;
      reasoning: SpanReasoningValue;
    };
export type SpanMessageValueList = SpanMessageValue[];
export interface SpanMessage {
  messageId: string;
  participant: string;
  timestamp: Date;
  values: SpanMessageValue[];
}
export type SpanMessageList = SpanMessage[];
export type GuardrailSource = string;
export type GuardrailAction = string;
export type GuardrailPolicyType = string;
export interface GuardrailPolicyResult {
  policyType: string;
  action: string;
  details?: string;
}
export type GuardrailPolicyResultList = GuardrailPolicyResult[];
export interface SpanGuardrailAssessment {
  guardrailId: string;
  guardrailName: string;
  source: string;
  action: string;
  policies?: GuardrailPolicyResult[];
}
export type SpanGuardrailAssessmentList = SpanGuardrailAssessment[];
export interface SpanAttributes {
  operationName?: string;
  providerName?: string;
  errorType?: string;
  agentId?: string;
  instanceArn?: string;
  contactId?: string;
  initialContactId?: string;
  sessionName?: string;
  aiAgentArn?: string;
  aiAgentType?: string;
  aiAgentName?: string;
  aiAgentId?: string;
  aiAgentVersion?: number;
  aiAgentInvoker?: string;
  aiAgentOrchestratorUseCase?: string;
  requestModel?: string;
  requestMaxTokens?: number;
  temperature?: number;
  topP?: number;
  responseModel?: string;
  responseFinishReasons?: string[];
  usageInputTokens?: number;
  usageOutputTokens?: number;
  usageTotalTokens?: number;
  cacheReadInputTokens?: number;
  cacheWriteInputTokens?: number;
  inputMessages?: SpanMessage[];
  outputMessages?: SpanMessage[];
  systemInstructions?: SpanMessageValue[];
  promptArn?: string;
  promptId?: string;
  promptType?: string;
  promptName?: string;
  promptVersion?: number;
  timeToFirstTokenMs?: number;
  guardrailAssessments?: SpanGuardrailAssessment[];
}
export interface Span {
  spanId: string;
  assistantId: string;
  sessionId: string;
  parentSpanId?: string;
  spanName: string;
  spanType: string;
  startTimestamp: Date;
  endTimestamp: Date;
  status: string;
  statusDescription?: string;
  requestId: string;
  originRequestId?: string;
  attributes: SpanAttributes;
}
export type SpanList = Span[];
export interface ListSpansResponse {
  spans: Span[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface NotifyRecommendationsReceivedRequest {
  assistantId: string;
  sessionId: string;
  recommendationIds: string[];
}
export type NotifyRecommendationsReceivedErrorMessage = string;
export interface NotifyRecommendationsReceivedError_ {
  recommendationId?: string;
  message?: string;
}
export type NotifyRecommendationsReceivedErrorList =
  NotifyRecommendationsReceivedError_[];
export interface NotifyRecommendationsReceivedResponse {
  recommendationIds?: string[];
  errors?: NotifyRecommendationsReceivedError_[];
}
export type TargetType = string;
export type Relevance = string;
export interface GenerativeContentFeedbackData {
  relevance: string;
}
export type ContentFeedbackData = {
  generativeContentFeedbackData: GenerativeContentFeedbackData;
};
export interface PutFeedbackRequest {
  assistantId: string;
  targetId: string;
  targetType: string;
  contentFeedback: ContentFeedbackData;
}
export interface PutFeedbackResponse {
  assistantId: string;
  assistantArn: string;
  targetId: string;
  targetType: string;
  contentFeedback: ContentFeedbackData;
}
export type QueryConditionFieldName = string;
export type QueryConditionComparisonOperator = string;
export interface QueryConditionItem {
  field: string;
  comparator: string;
  value: string;
}
export type QueryCondition = { single: QueryConditionItem };
export type QueryConditionExpression = QueryCondition[];
export interface QueryTextInputData {
  text: string | redacted.Redacted<string>;
}
export interface IntentInputData {
  intentId: string;
}
export type CaseArn = string;
export interface CaseSummarizationInputData {
  caseArn: string;
}
export type QueryInputData =
  | {
      queryTextInputData: QueryTextInputData;
      intentInputData?: never;
      caseSummarizationInputData?: never;
    }
  | {
      queryTextInputData?: never;
      intentInputData: IntentInputData;
      caseSummarizationInputData?: never;
    }
  | {
      queryTextInputData?: never;
      intentInputData?: never;
      caseSummarizationInputData: CaseSummarizationInputData;
    };
export interface QueryAssistantRequest {
  assistantId: string;
  queryText?: string | redacted.Redacted<string>;
  nextToken?: string;
  maxResults?: number;
  sessionId?: string;
  queryCondition?: QueryCondition[];
  queryInputData?: QueryInputData;
  overrideKnowledgeBaseSearchType?: string;
}
export type QueryResultType = string;
export interface ResultData {
  resultId: string;
  document?: Document;
  relevanceScore?: number;
  data?: DataSummary;
  type?: string;
}
export type QueryResultsList = ResultData[];
export interface QueryAssistantResponse {
  results: ResultData[];
  nextToken?: string;
}
export interface RemoveAssistantAIAgentRequest {
  assistantId: string;
  aiAgentType: string;
  orchestratorUseCase?: string;
}
export interface RemoveAssistantAIAgentResponse {}
export interface RemoveKnowledgeBaseTemplateUriRequest {
  knowledgeBaseId: string;
}
export interface RemoveKnowledgeBaseTemplateUriResponse {}
export interface RenderMessageTemplateRequest {
  knowledgeBaseId: string;
  messageTemplateId: string;
  attributes: MessageTemplateAttributes;
}
export type MessageTemplateAttributeKeyList = string[];
export interface RenderMessageTemplateResponse {
  content?: MessageTemplateContentProvider;
  sourceConfigurationSummary?: MessageTemplateSourceConfigurationSummary;
  attributesNotInterpolated?: string[];
  attachments?: MessageTemplateAttachment[];
}
export type AssistantAssociationIdList = string[];
export type KnowledgeSource = { assistantAssociationIds: string[] };
export type RetrievalFilterList = RetrievalFilterConfiguration[];
export type FilterAttributeKey = string;
export interface FilterAttribute {
  key: string;
  value: any;
}
export type RetrievalFilterConfiguration =
  | {
      andAll: RetrievalFilterConfiguration[];
      equals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      in?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      listContains?: never;
      notEquals?: never;
      notIn?: never;
      orAll?: never;
      startsWith?: never;
      stringContains?: never;
    }
  | {
      andAll?: never;
      equals: FilterAttribute;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      in?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      listContains?: never;
      notEquals?: never;
      notIn?: never;
      orAll?: never;
      startsWith?: never;
      stringContains?: never;
    }
  | {
      andAll?: never;
      equals?: never;
      greaterThan: FilterAttribute;
      greaterThanOrEquals?: never;
      in?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      listContains?: never;
      notEquals?: never;
      notIn?: never;
      orAll?: never;
      startsWith?: never;
      stringContains?: never;
    }
  | {
      andAll?: never;
      equals?: never;
      greaterThan?: never;
      greaterThanOrEquals: FilterAttribute;
      in?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      listContains?: never;
      notEquals?: never;
      notIn?: never;
      orAll?: never;
      startsWith?: never;
      stringContains?: never;
    }
  | {
      andAll?: never;
      equals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      in: FilterAttribute;
      lessThan?: never;
      lessThanOrEquals?: never;
      listContains?: never;
      notEquals?: never;
      notIn?: never;
      orAll?: never;
      startsWith?: never;
      stringContains?: never;
    }
  | {
      andAll?: never;
      equals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      in?: never;
      lessThan: FilterAttribute;
      lessThanOrEquals?: never;
      listContains?: never;
      notEquals?: never;
      notIn?: never;
      orAll?: never;
      startsWith?: never;
      stringContains?: never;
    }
  | {
      andAll?: never;
      equals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      in?: never;
      lessThan?: never;
      lessThanOrEquals: FilterAttribute;
      listContains?: never;
      notEquals?: never;
      notIn?: never;
      orAll?: never;
      startsWith?: never;
      stringContains?: never;
    }
  | {
      andAll?: never;
      equals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      in?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      listContains: FilterAttribute;
      notEquals?: never;
      notIn?: never;
      orAll?: never;
      startsWith?: never;
      stringContains?: never;
    }
  | {
      andAll?: never;
      equals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      in?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      listContains?: never;
      notEquals: FilterAttribute;
      notIn?: never;
      orAll?: never;
      startsWith?: never;
      stringContains?: never;
    }
  | {
      andAll?: never;
      equals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      in?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      listContains?: never;
      notEquals?: never;
      notIn: FilterAttribute;
      orAll?: never;
      startsWith?: never;
      stringContains?: never;
    }
  | {
      andAll?: never;
      equals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      in?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      listContains?: never;
      notEquals?: never;
      notIn?: never;
      orAll: RetrievalFilterConfiguration[];
      startsWith?: never;
      stringContains?: never;
    }
  | {
      andAll?: never;
      equals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      in?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      listContains?: never;
      notEquals?: never;
      notIn?: never;
      orAll?: never;
      startsWith: FilterAttribute;
      stringContains?: never;
    }
  | {
      andAll?: never;
      equals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      in?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      listContains?: never;
      notEquals?: never;
      notIn?: never;
      orAll?: never;
      startsWith?: never;
      stringContains: FilterAttribute;
    };
export interface RetrievalConfiguration {
  knowledgeSource: KnowledgeSource;
  filter?: RetrievalFilterConfiguration;
  numberOfResults?: number;
  overrideKnowledgeBaseSearchType?: string;
}
export interface RetrieveRequest {
  assistantId: string;
  retrievalConfiguration: RetrievalConfiguration;
  retrievalQuery: string | redacted.Redacted<string>;
}
export interface RetrieveResult {
  associationId: string;
  sourceId: string | redacted.Redacted<string>;
  referenceType: string;
  contentText: string | redacted.Redacted<string>;
}
export type RetrieveResultList = RetrieveResult[];
export interface RetrieveResponse {
  results: RetrieveResult[];
}
export type FilterField = string;
export type FilterOperator = string;
export interface Filter {
  field: string;
  operator: string;
  value: string;
}
export type FilterList = Filter[];
export interface SearchExpression {
  filters: Filter[];
}
export interface SearchContentRequest {
  nextToken?: string;
  maxResults?: number;
  knowledgeBaseId: string;
  searchExpression: SearchExpression;
}
export interface SearchContentResponse {
  contentSummaries: ContentSummary[];
  nextToken?: string;
}
export type MessageTemplateQueryValue = string;
export type MessageTemplateQueryValueList = string[];
export type MessageTemplateQueryOperator = string;
export type Priority = string;
export interface MessageTemplateQueryField {
  name: string;
  values: string[];
  operator: string;
  allowFuzziness?: boolean;
  priority?: string;
}
export type MessageTemplateQueryFieldList = MessageTemplateQueryField[];
export type MessageTemplateFilterValue = string;
export type MessageTemplateFilterValueList = string[];
export type MessageTemplateFilterOperator = string;
export interface MessageTemplateFilterField {
  name: string;
  values?: string[];
  operator: string;
  includeNoExistence?: boolean;
}
export type MessageTemplateFilterFieldList = MessageTemplateFilterField[];
export type Order = string;
export interface MessageTemplateOrderField {
  name: string;
  order?: string;
}
export interface MessageTemplateSearchExpression {
  queries?: MessageTemplateQueryField[];
  filters?: MessageTemplateFilterField[];
  orderOnField?: MessageTemplateOrderField;
}
export interface SearchMessageTemplatesRequest {
  knowledgeBaseId: string;
  searchExpression: MessageTemplateSearchExpression;
  nextToken?: string;
  maxResults?: number;
}
export interface MessageTemplateSearchResultData {
  messageTemplateArn: string;
  messageTemplateId: string;
  knowledgeBaseArn: string;
  knowledgeBaseId: string;
  name: string;
  channel?: string | redacted.Redacted<string>;
  channelSubtype: string;
  createdTime: Date;
  lastModifiedTime: Date;
  lastModifiedBy: string;
  isActive?: boolean;
  versionNumber?: number;
  description?: string;
  sourceConfigurationSummary?: MessageTemplateSourceConfigurationSummary;
  groupingConfiguration?: GroupingConfiguration;
  language?: string;
  tags?: { [key: string]: string | undefined };
}
export type MessageTemplateSearchResultsList =
  MessageTemplateSearchResultData[];
export interface SearchMessageTemplatesResponse {
  results: MessageTemplateSearchResultData[];
  nextToken?: string;
}
export type QuickResponseQueryValue = string;
export type QuickResponseQueryValueList = string[];
export type QuickResponseQueryOperator = string;
export interface QuickResponseQueryField {
  name: string;
  values: string[];
  operator: string;
  allowFuzziness?: boolean;
  priority?: string;
}
export type QuickResponseQueryFieldList = QuickResponseQueryField[];
export type QuickResponseFilterValue = string;
export type QuickResponseFilterValueList = string[];
export type QuickResponseFilterOperator = string;
export interface QuickResponseFilterField {
  name: string;
  values?: string[];
  operator: string;
  includeNoExistence?: boolean;
}
export type QuickResponseFilterFieldList = QuickResponseFilterField[];
export interface QuickResponseOrderField {
  name: string;
  order?: string;
}
export interface QuickResponseSearchExpression {
  queries?: QuickResponseQueryField[];
  filters?: QuickResponseFilterField[];
  orderOnField?: QuickResponseOrderField;
}
export type ContactAttributeKey = string;
export type ContactAttributeValue = string;
export type ContactAttributes = { [key: string]: string | undefined };
export interface SearchQuickResponsesRequest {
  knowledgeBaseId: string;
  searchExpression: QuickResponseSearchExpression;
  nextToken?: string;
  maxResults?: number;
  attributes?: { [key: string]: string | undefined };
}
export type ContactAttributeKeys = string[];
export interface QuickResponseSearchResultData {
  quickResponseArn: string;
  quickResponseId: string;
  knowledgeBaseArn: string;
  knowledgeBaseId: string;
  name: string;
  contentType: string;
  status: string;
  contents: QuickResponseContents;
  createdTime: Date;
  lastModifiedTime: Date;
  isActive: boolean;
  description?: string;
  groupingConfiguration?: GroupingConfiguration;
  shortcutKey?: string;
  lastModifiedBy?: string;
  channels?: (string | redacted.Redacted<string>)[];
  language?: string;
  attributesNotInterpolated?: string[];
  attributesInterpolated?: string[];
  tags?: { [key: string]: string | undefined };
}
export type QuickResponseSearchResultsList = QuickResponseSearchResultData[];
export interface SearchQuickResponsesResponse {
  results: QuickResponseSearchResultData[];
  nextToken?: string;
}
export interface SearchSessionsRequest {
  nextToken?: string;
  maxResults?: number;
  assistantId: string;
  searchExpression: SearchExpression;
}
export interface SessionSummary {
  sessionId: string;
  sessionArn: string;
  assistantId: string;
  assistantArn: string;
}
export type SessionSummaries = SessionSummary[];
export interface SearchSessionsResponse {
  sessionSummaries: SessionSummary[];
  nextToken?: string;
}
export interface MessageInput {
  value: MessageData;
}
export interface SelfServiceConversationHistory {
  turnNumber?: number;
  inputTranscript?: string | redacted.Redacted<string>;
  botResponse?: string | redacted.Redacted<string>;
  timestamp?: Date;
}
export type SelfServiceConversationHistoryList =
  SelfServiceConversationHistory[];
export interface ConversationContext {
  selfServiceConversationHistory: SelfServiceConversationHistory[];
}
export interface MessageConfiguration {
  generateFillerMessage?: boolean;
  generateChunkedMessage?: boolean;
}
export type MessageMetadata = { [key: string]: string | undefined };
export interface SendMessageRequest {
  assistantId: string;
  sessionId: string;
  type: string;
  message: MessageInput;
  aiAgentId?: string;
  conversationContext?: ConversationContext;
  configuration?: MessageConfiguration;
  clientToken?: string;
  orchestratorUseCase?: string;
  metadata?: { [key: string]: string | undefined };
  originRequestId?: string;
}
export interface SendMessageResponse {
  requestMessageId: string;
  configuration?: MessageConfiguration;
  nextMessageToken: string;
}
export type TimeToLive = number;
export interface StartContentUploadRequest {
  knowledgeBaseId: string;
  contentType: string;
  presignedUrlTimeToLive?: number;
}
export type Headers = { [key: string]: string | undefined };
export interface StartContentUploadResponse {
  uploadId: string;
  url: string | redacted.Redacted<string>;
  urlExpiry: Date;
  headersToInclude: { [key: string]: string | undefined };
}
export interface StartImportJobRequest {
  knowledgeBaseId: string;
  importJobType: string;
  uploadId: string;
  clientToken?: string;
  metadata?: { [key: string]: string | undefined };
  externalSourceConfiguration?: ExternalSourceConfiguration;
}
export interface StartImportJobResponse {
  importJob?: ImportJobData;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAIAgentRequest {
  clientToken?: string;
  assistantId: string;
  aiAgentId: string;
  visibilityStatus: string;
  configuration?: AIAgentConfiguration;
  description?: string;
}
export interface UpdateAIAgentResponse {
  aiAgent?: AIAgentData;
}
export interface UpdateAIGuardrailRequest {
  clientToken?: string;
  assistantId: string;
  aiGuardrailId: string;
  visibilityStatus: string;
  blockedInputMessaging: string | redacted.Redacted<string>;
  blockedOutputsMessaging: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  topicPolicyConfig?: AIGuardrailTopicPolicyConfig;
  contentPolicyConfig?: AIGuardrailContentPolicyConfig;
  wordPolicyConfig?: AIGuardrailWordPolicyConfig;
  sensitiveInformationPolicyConfig?: AIGuardrailSensitiveInformationPolicyConfig;
  contextualGroundingPolicyConfig?: AIGuardrailContextualGroundingPolicyConfig;
}
export interface UpdateAIGuardrailResponse {
  aiGuardrail?: AIGuardrailData;
}
export interface UpdateAIPromptRequest {
  clientToken?: string;
  assistantId: string;
  aiPromptId: string;
  visibilityStatus: string;
  templateConfiguration?: AIPromptTemplateConfiguration;
  description?: string;
  modelId?: string;
  inferenceConfiguration?: AIPromptInferenceConfiguration;
}
export interface UpdateAIPromptResponse {
  aiPrompt?: AIPromptData;
}
export interface UpdateAssistantAIAgentRequest {
  assistantId: string;
  aiAgentType: string;
  configuration: AIAgentConfigurationData;
  orchestratorUseCase?: string;
}
export interface UpdateAssistantAIAgentResponse {
  assistant?: AssistantData;
}
export interface UpdateContentRequest {
  knowledgeBaseId: string;
  contentId: string;
  revisionId?: string;
  title?: string;
  overrideLinkOutUri?: string;
  removeOverrideLinkOutUri?: boolean;
  metadata?: { [key: string]: string | undefined };
  uploadId?: string;
}
export interface UpdateContentResponse {
  content?: ContentData;
}
export interface UpdateKnowledgeBaseTemplateUriRequest {
  knowledgeBaseId: string;
  templateUri: string;
}
export interface UpdateKnowledgeBaseTemplateUriResponse {
  knowledgeBase?: KnowledgeBaseData;
}
export interface UpdateMessageTemplateRequest {
  knowledgeBaseId: string;
  messageTemplateId: string;
  content?: MessageTemplateContentProvider;
  language?: string;
  sourceConfiguration?: MessageTemplateSourceConfiguration;
  defaultAttributes?: MessageTemplateAttributes;
}
export interface UpdateMessageTemplateResponse {
  messageTemplate?: MessageTemplateData;
}
export interface UpdateMessageTemplateMetadataRequest {
  knowledgeBaseId: string;
  messageTemplateId: string;
  name?: string;
  description?: string;
  groupingConfiguration?: GroupingConfiguration;
}
export interface UpdateMessageTemplateMetadataResponse {
  messageTemplate?: MessageTemplateData;
}
export interface UpdateQuickResponseRequest {
  knowledgeBaseId: string;
  quickResponseId: string;
  name?: string;
  content?: QuickResponseDataProvider;
  contentType?: string;
  groupingConfiguration?: GroupingConfiguration;
  removeGroupingConfiguration?: boolean;
  description?: string;
  removeDescription?: boolean;
  shortcutKey?: string;
  removeShortcutKey?: boolean;
  isActive?: boolean;
  channels?: (string | redacted.Redacted<string>)[];
  language?: string;
}
export interface UpdateQuickResponseResponse {
  quickResponse?: QuickResponseData;
}
export interface UpdateSessionRequest {
  assistantId: string;
  sessionId: string;
  description?: string;
  tagFilter?: TagFilter;
  aiAgentConfiguration?: {
    [key: string]: AIAgentConfigurationData | undefined;
  };
  orchestratorConfigurationList?: OrchestratorConfigurationEntry[];
  removeOrchestratorConfigurationList?: boolean;
}
export interface UpdateSessionResponse {
  session?: SessionData;
}
export type SessionDataNamespace = string;
export interface UpdateSessionDataRequest {
  assistantId: string;
  sessionId: string;
  namespace?: string;
  data: RuntimeSessionData[];
}
export interface UpdateSessionDataResponse {
  sessionArn: string;
  sessionId: string;
  namespace: string;
  data: RuntimeSessionData[];
}
export type ActivateMessageTemplateError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Activates a specific version of the Amazon Q in Connect message template. After the version is activated, the previous active version will be deactivated automatically. You can use the `$ACTIVE_VERSION` qualifier later to reference the version that is in active status.
 */
export const activateMessageTemplate: API.OperationMethod<
  ActivateMessageTemplateRequest,
  ActivateMessageTemplateResponse,
  ActivateMessageTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases/{knowledgeBaseId}/messageTemplates/{messageTemplateId}/activate",
    input: { knowledgeBaseId: 0, messageTemplateId: 0, versionNumber: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ActivateMessageTemplate",
})) as any;

export type CreateAIAgentError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Q in Connect AI Agent.
 */
export const createAIAgent: API.OperationMethod<
  CreateAIAgentRequest,
  CreateAIAgentResponse,
  CreateAIAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /assistants/{assistantId}/aiagents",
    input: {
      clientToken: D.m({ idempotency: true }),
      assistantId: 0,
      name: 0,
      type: 0,
      configuration: i_AIAgentConfiguration,
      visibilityStatus: 0,
      tags: 0,
      description: 0,
    },
    output: { aiAgent: o_AIAgentData },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAIAgent",
})) as any;

export type CreateAIAgentVersionError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates and Amazon Q in Connect AI Agent version.
 */
export const createAIAgentVersion: API.OperationMethod<
  CreateAIAgentVersionRequest,
  CreateAIAgentVersionResponse,
  CreateAIAgentVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /assistants/{assistantId}/aiagents/{aiAgentId}/versions",
    input: {
      assistantId: 0,
      aiAgentId: 0,
      modifiedTime: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { aiAgent: o_AIAgentData },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAIAgentVersion",
})) as any;

export type CreateAIGuardrailError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Q in Connect AI Guardrail.
 */
export const createAIGuardrail: API.OperationMethod<
  CreateAIGuardrailRequest,
  CreateAIGuardrailResponse,
  CreateAIGuardrailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /assistants/{assistantId}/aiguardrails",
    input: {
      clientToken: D.m({ idempotency: true }),
      assistantId: 0,
      name: 0,
      blockedInputMessaging: 0,
      blockedOutputsMessaging: 0,
      visibilityStatus: 0,
      description: 0,
      topicPolicyConfig: i_AIGuardrailTopicPolicyConfig,
      contentPolicyConfig: i_AIGuardrailContentPolicyConfig,
      wordPolicyConfig: i_AIGuardrailWordPolicyConfig,
      sensitiveInformationPolicyConfig:
        i_AIGuardrailSensitiveInformationPolicyConfig,
      contextualGroundingPolicyConfig:
        i_AIGuardrailContextualGroundingPolicyConfig,
      tags: 0,
    },
    output: { aiGuardrail: o_AIGuardrailData },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAIGuardrail",
})) as any;

export type CreateAIGuardrailVersionError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Q in Connect AI Guardrail version.
 */
export const createAIGuardrailVersion: API.OperationMethod<
  CreateAIGuardrailVersionRequest,
  CreateAIGuardrailVersionResponse,
  CreateAIGuardrailVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /assistants/{assistantId}/aiguardrails/{aiGuardrailId}/versions",
    input: {
      assistantId: 0,
      aiGuardrailId: 0,
      modifiedTime: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { aiGuardrail: o_AIGuardrailData },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAIGuardrailVersion",
})) as any;

export type CreateAIPromptError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Q in Connect AI Prompt.
 */
export const createAIPrompt: API.OperationMethod<
  CreateAIPromptRequest,
  CreateAIPromptResponse,
  CreateAIPromptError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /assistants/{assistantId}/aiprompts",
    input: {
      clientToken: D.m({ idempotency: true }),
      assistantId: 0,
      name: 0,
      type: 0,
      templateConfiguration: i_AIPromptTemplateConfiguration,
      visibilityStatus: 0,
      templateType: 0,
      modelId: 0,
      apiFormat: 0,
      tags: 0,
      description: 0,
      inferenceConfiguration: i_AIPromptInferenceConfiguration,
    },
    output: { aiPrompt: o_AIPromptData },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAIPrompt",
})) as any;

export type CreateAIPromptVersionError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Q in Connect AI Prompt version.
 */
export const createAIPromptVersion: API.OperationMethod<
  CreateAIPromptVersionRequest,
  CreateAIPromptVersionResponse,
  CreateAIPromptVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /assistants/{assistantId}/aiprompts/{aiPromptId}/versions",
    input: {
      assistantId: 0,
      aiPromptId: 0,
      modifiedTime: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { aiPrompt: o_AIPromptData },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAIPromptVersion",
})) as any;

export type CreateAssistantError =
  | AccessDeniedException
  | ConflictException
  | ServiceQuotaExceededException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Q in Connect assistant.
 */
export const createAssistant: API.OperationMethod<
  CreateAssistantRequest,
  CreateAssistantResponse,
  CreateAssistantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /assistants",
    input: {
      clientToken: D.m({ idempotency: true }),
      name: 0,
      type: 0,
      description: 0,
      tags: 0,
      serverSideEncryptionConfiguration: i_ServerSideEncryptionConfiguration,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ServiceQuotaExceededException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAssistant",
})) as any;

export type CreateAssistantAssociationError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an association between an Amazon Q in Connect assistant and another resource. Currently, the only supported association is with a knowledge base. An assistant can have only a single association.
 */
export const createAssistantAssociation: API.OperationMethod<
  CreateAssistantAssociationRequest,
  CreateAssistantAssociationResponse,
  CreateAssistantAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /assistants/{assistantId}/associations",
    input: {
      assistantId: 0,
      associationType: 0,
      association: {
        knowledgeBaseId: 0,
        externalBedrockKnowledgeBaseConfig: {
          bedrockKnowledgeBaseArn: 0,
          accessRoleArn: 0,
        },
      },
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAssistantAssociation",
})) as any;

export type CreateContentError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates Amazon Q in Connect content. Before to calling this API, use StartContentUpload to upload an asset.
 */
export const createContent: API.OperationMethod<
  CreateContentRequest,
  CreateContentResponse,
  CreateContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases/{knowledgeBaseId}/contents",
    input: {
      knowledgeBaseId: 0,
      name: 0,
      title: 0,
      overrideLinkOutUri: 0,
      metadata: 0,
      uploadId: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    output: { content: o_ContentData },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContent",
})) as any;

export type CreateContentAssociationError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates an association between a content resource in a knowledge base and step-by-step guides. Step-by-step guides offer instructions to agents for resolving common customer issues. You create a content association to integrate Amazon Q in Connect and step-by-step guides.
 *
 * After you integrate Amazon Q and step-by-step guides, when Amazon Q provides a recommendation to an agent based on the intent that it's detected, it also provides them with the option to start the step-by-step guide that you have associated with the content.
 *
 * Note the following limitations:
 *
 * - You can create only one content association for each content resource in a knowledge base.
 *
 * - You can associate a step-by-step guide with multiple content resources.
 *
 * For more information, see Integrate Amazon Q in Connect with step-by-step guides in the *Amazon Connect Administrator Guide*.
 */
export const createContentAssociation: API.OperationMethod<
  CreateContentAssociationRequest,
  CreateContentAssociationResponse,
  CreateContentAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases/{knowledgeBaseId}/contents/{contentId}/associations",
    input: {
      clientToken: D.m({ idempotency: true }),
      knowledgeBaseId: 0,
      contentId: 0,
      associationType: 0,
      association: { amazonConnectGuideAssociation: { flowId: 0 } },
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContentAssociation",
})) as any;

export type CreateKnowledgeBaseError =
  | AccessDeniedException
  | ConflictException
  | ServiceQuotaExceededException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a knowledge base.
 *
 * When using this API, you cannot reuse Amazon AppIntegrations DataIntegrations with external knowledge bases such as Salesforce and ServiceNow. If you do, you'll get an `InvalidRequestException` error.
 *
 * For example, you're programmatically managing your external knowledge base, and you want to add or remove one of the fields that is being ingested from Salesforce. Do the following:
 *
 * - Call DeleteKnowledgeBase.
 *
 * - Call DeleteDataIntegration.
 *
 * - Call CreateDataIntegration to recreate the DataIntegration or a create different one.
 *
 * - Call CreateKnowledgeBase.
 */
export const createKnowledgeBase: API.OperationMethod<
  CreateKnowledgeBaseRequest,
  CreateKnowledgeBaseResponse,
  CreateKnowledgeBaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases",
    input: {
      clientToken: D.m({ idempotency: true }),
      name: 0,
      knowledgeBaseType: 0,
      sourceConfiguration: {
        appIntegrations: { appIntegrationArn: 0, objectFields: 0 },
        managedSourceConfiguration: {
          webCrawlerConfiguration: {
            urlConfiguration: { seedUrls: D.list({ url: 0 }) },
            crawlerLimits: { rateLimit: 0 },
            inclusionFilters: 0,
            exclusionFilters: 0,
            scope: 0,
          },
        },
      },
      renderingConfiguration: { templateUri: 0 },
      vectorIngestionConfiguration: {
        chunkingConfiguration: {
          chunkingStrategy: 0,
          fixedSizeChunkingConfiguration: {
            maxTokens: 0,
            overlapPercentage: 0,
          },
          hierarchicalChunkingConfiguration: {
            levelConfigurations: D.list({ maxTokens: 0 }),
            overlapTokens: 0,
          },
          semanticChunkingConfiguration: {
            maxTokens: 0,
            bufferSize: 0,
            breakpointPercentileThreshold: 0,
          },
        },
        parsingConfiguration: {
          parsingStrategy: 0,
          bedrockFoundationModelConfiguration: {
            modelArn: 0,
            parsingPrompt: { parsingPromptText: 0 },
          },
        },
      },
      serverSideEncryptionConfiguration: i_ServerSideEncryptionConfiguration,
      description: 0,
      tags: 0,
    },
    output: { knowledgeBase: o_KnowledgeBaseData },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ServiceQuotaExceededException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateKnowledgeBase",
})) as any;

export type CreateMessageTemplateError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Q in Connect message template. The name of the message template has to be unique for each knowledge base. The channel subtype of the message template is immutable and cannot be modified after creation. After the message template is created, you can use the `$LATEST` qualifier to reference the created message template.
 */
export const createMessageTemplate: API.OperationMethod<
  CreateMessageTemplateRequest,
  CreateMessageTemplateResponse,
  CreateMessageTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases/{knowledgeBaseId}/messageTemplates",
    input: {
      knowledgeBaseId: 0,
      name: 0,
      content: i_MessageTemplateContentProvider,
      description: 0,
      channelSubtype: 0,
      language: 0,
      sourceConfiguration: i_MessageTemplateSourceConfiguration,
      defaultAttributes: i_MessageTemplateAttributes,
      groupingConfiguration: i_GroupingConfiguration,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    output: { messageTemplate: o_MessageTemplateData },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMessageTemplate",
})) as any;

export type CreateMessageTemplateAttachmentError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Uploads an attachment file to the specified Amazon Q in Connect message template. The name of the message template attachment has to be unique for each message template referenced by the `$LATEST` qualifier. The body of the attachment file should be encoded using base64 encoding. After the file is uploaded, you can use the pre-signed Amazon S3 URL returned in response to download the uploaded file.
 */
export const createMessageTemplateAttachment: API.OperationMethod<
  CreateMessageTemplateAttachmentRequest,
  CreateMessageTemplateAttachmentResponse,
  CreateMessageTemplateAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases/{knowledgeBaseId}/messageTemplates/{messageTemplateId}/attachments",
    input: {
      knowledgeBaseId: 0,
      messageTemplateId: 0,
      contentDisposition: 0,
      name: 0,
      body: 0,
      clientToken: 0,
    },
    output: { attachment: o_MessageTemplateAttachment },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMessageTemplateAttachment",
})) as any;

export type CreateMessageTemplateVersionError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Amazon Q in Connect message template version from the current content and configuration of a message template. Versions are immutable and monotonically increasing. Once a version is created, you can reference a specific version of the message template by passing in `<message-template-id>:<versionNumber>` as the message template identifier. An error is displayed if the supplied `messageTemplateContentSha256` is different from the `messageTemplateContentSha256` of the message template with `$LATEST` qualifier. If multiple `CreateMessageTemplateVersion` requests are made while the message template remains the same, only the first invocation creates a new version and the succeeding requests will return the same response as the first invocation.
 */
export const createMessageTemplateVersion: API.OperationMethod<
  CreateMessageTemplateVersionRequest,
  CreateMessageTemplateVersionResponse,
  CreateMessageTemplateVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases/{knowledgeBaseId}/messageTemplates/{messageTemplateId}/versions",
    input: {
      knowledgeBaseId: 0,
      messageTemplateId: 0,
      messageTemplateContentSha256: 0,
    },
    output: { messageTemplate: o_ExtendedMessageTemplateData },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMessageTemplateVersion",
})) as any;

export type CreateQuickResponseError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Q in Connect quick response.
 */
export const createQuickResponse: API.OperationMethod<
  CreateQuickResponseRequest,
  CreateQuickResponseResponse,
  CreateQuickResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases/{knowledgeBaseId}/quickResponses",
    input: {
      knowledgeBaseId: 0,
      name: 0,
      content: i_QuickResponseDataProvider,
      contentType: 0,
      groupingConfiguration: i_GroupingConfiguration,
      description: 0,
      shortcutKey: 0,
      isActive: 0,
      channels: 0,
      language: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    output: { quickResponse: o_QuickResponseData },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQuickResponse",
})) as any;

export type CreateSessionError =
  | AccessDeniedException
  | ConflictException
  | DependencyFailedException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a session. A session is a contextual container used for generating recommendations. Amazon Connect creates a new Amazon Q in Connect session for each contact on which Amazon Q in Connect is enabled.
 */
export const createSession: API.OperationMethod<
  CreateSessionRequest,
  CreateSessionResponse,
  CreateSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /assistants/{assistantId}/sessions",
    input: {
      clientToken: D.m({ idempotency: true }),
      assistantId: 0,
      name: 0,
      description: 0,
      tags: 0,
      tagFilter: i_TagFilter,
      aiAgentConfiguration: D.map(i_AIAgentConfigurationData),
      contactArn: 0,
      orchestratorConfigurationList: D.list(i_OrchestratorConfigurationEntry),
      removeOrchestratorConfigurationList: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DependencyFailedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSession",
})) as any;

export type DeactivateMessageTemplateError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deactivates a specific version of the Amazon Q in Connect message template . After the version is deactivated, you can no longer use the `$ACTIVE_VERSION` qualifier to reference the version in active status.
 */
export const deactivateMessageTemplate: API.OperationMethod<
  DeactivateMessageTemplateRequest,
  DeactivateMessageTemplateResponse,
  DeactivateMessageTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases/{knowledgeBaseId}/messageTemplates/{messageTemplateId}/deactivate",
    input: { knowledgeBaseId: 0, messageTemplateId: 0, versionNumber: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeactivateMessageTemplate",
})) as any;

export type DeleteAIAgentError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Q in Connect AI Agent.
 */
export const deleteAIAgent: API.OperationMethod<
  DeleteAIAgentRequest,
  DeleteAIAgentResponse,
  DeleteAIAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /assistants/{assistantId}/aiagents/{aiAgentId}",
    input: { assistantId: 0, aiAgentId: 0 },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAIAgent",
})) as any;

export type DeleteAIAgentVersionError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Q in Connect AI Agent Version.
 */
export const deleteAIAgentVersion: API.OperationMethod<
  DeleteAIAgentVersionRequest,
  DeleteAIAgentVersionResponse,
  DeleteAIAgentVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /assistants/{assistantId}/aiagents/{aiAgentId}/versions/{versionNumber}",
    input: { assistantId: 0, aiAgentId: 0, versionNumber: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAIAgentVersion",
})) as any;

export type DeleteAIGuardrailError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Q in Connect AI Guardrail.
 */
export const deleteAIGuardrail: API.OperationMethod<
  DeleteAIGuardrailRequest,
  DeleteAIGuardrailResponse,
  DeleteAIGuardrailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /assistants/{assistantId}/aiguardrails/{aiGuardrailId}",
    input: { assistantId: 0, aiGuardrailId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAIGuardrail",
})) as any;

export type DeleteAIGuardrailVersionError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Delete and Amazon Q in Connect AI Guardrail version.
 */
export const deleteAIGuardrailVersion: API.OperationMethod<
  DeleteAIGuardrailVersionRequest,
  DeleteAIGuardrailVersionResponse,
  DeleteAIGuardrailVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /assistants/{assistantId}/aiguardrails/{aiGuardrailId}/versions/{versionNumber}",
    input: { assistantId: 0, aiGuardrailId: 0, versionNumber: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAIGuardrailVersion",
})) as any;

export type DeleteAIPromptError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Q in Connect AI Prompt.
 */
export const deleteAIPrompt: API.OperationMethod<
  DeleteAIPromptRequest,
  DeleteAIPromptResponse,
  DeleteAIPromptError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /assistants/{assistantId}/aiprompts/{aiPromptId}",
    input: { assistantId: 0, aiPromptId: 0 },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAIPrompt",
})) as any;

export type DeleteAIPromptVersionError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Delete and Amazon Q in Connect AI Prompt version.
 */
export const deleteAIPromptVersion: API.OperationMethod<
  DeleteAIPromptVersionRequest,
  DeleteAIPromptVersionResponse,
  DeleteAIPromptVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /assistants/{assistantId}/aiprompts/{aiPromptId}/versions/{versionNumber}",
    input: { assistantId: 0, aiPromptId: 0, versionNumber: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAIPromptVersion",
})) as any;

export type DeleteAssistantError =
  | AccessDeniedException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an assistant.
 */
export const deleteAssistant: API.OperationMethod<
  DeleteAssistantRequest,
  DeleteAssistantResponse,
  DeleteAssistantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /assistants/{assistantId}",
    input: { assistantId: 0 },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssistant",
})) as any;

export type DeleteAssistantAssociationError =
  | AccessDeniedException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an assistant association.
 */
export const deleteAssistantAssociation: API.OperationMethod<
  DeleteAssistantAssociationRequest,
  DeleteAssistantAssociationResponse,
  DeleteAssistantAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /assistants/{assistantId}/associations/{assistantAssociationId}",
    input: { assistantAssociationId: 0, assistantId: 0 },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssistantAssociation",
})) as any;

export type DeleteContentError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the content.
 */
export const deleteContent: API.OperationMethod<
  DeleteContentRequest,
  DeleteContentResponse,
  DeleteContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /knowledgeBases/{knowledgeBaseId}/contents/{contentId}",
    input: { knowledgeBaseId: 0, contentId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContent",
})) as any;

export type DeleteContentAssociationError =
  | AccessDeniedException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the content association.
 *
 * For more information about content associations--what they are and when they are used--see Integrate Amazon Q in Connect with step-by-step guides in the *Amazon Connect Administrator Guide*.
 */
export const deleteContentAssociation: API.OperationMethod<
  DeleteContentAssociationRequest,
  DeleteContentAssociationResponse,
  DeleteContentAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /knowledgeBases/{knowledgeBaseId}/contents/{contentId}/associations/{contentAssociationId}",
    input: { knowledgeBaseId: 0, contentId: 0, contentAssociationId: 0 },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContentAssociation",
})) as any;

export type DeleteImportJobError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the quick response import job.
 */
export const deleteImportJob: API.OperationMethod<
  DeleteImportJobRequest,
  DeleteImportJobResponse,
  DeleteImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /knowledgeBases/{knowledgeBaseId}/importJobs/{importJobId}",
    input: { knowledgeBaseId: 0, importJobId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteImportJob",
})) as any;

export type DeleteKnowledgeBaseError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the knowledge base.
 *
 * When you use this API to delete an external knowledge base such as Salesforce or ServiceNow, you must also delete the Amazon AppIntegrations DataIntegration. This is because you can't reuse the DataIntegration after it's been associated with an external knowledge base. However, you can delete and recreate it. See DeleteDataIntegration and CreateDataIntegration in the *Amazon AppIntegrations API Reference*.
 */
export const deleteKnowledgeBase: API.OperationMethod<
  DeleteKnowledgeBaseRequest,
  DeleteKnowledgeBaseResponse,
  DeleteKnowledgeBaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /knowledgeBases/{knowledgeBaseId}",
    input: { knowledgeBaseId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteKnowledgeBase",
})) as any;

export type DeleteMessageTemplateError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Q in Connect message template entirely or a specific version of the message template if version is supplied in the request. You can provide the message template identifier as `<message-template-id>:<versionNumber>` to delete a specific version of the message template. If it is not supplied, the message template and all available versions will be deleted.
 */
export const deleteMessageTemplate: API.OperationMethod<
  DeleteMessageTemplateRequest,
  DeleteMessageTemplateResponse,
  DeleteMessageTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /knowledgeBases/{knowledgeBaseId}/messageTemplates/{messageTemplateId}",
    input: { knowledgeBaseId: 0, messageTemplateId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMessageTemplate",
})) as any;

export type DeleteMessageTemplateAttachmentError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the attachment file from the Amazon Q in Connect message template that is referenced by `$LATEST` qualifier. Attachments on available message template versions will remain unchanged.
 */
export const deleteMessageTemplateAttachment: API.OperationMethod<
  DeleteMessageTemplateAttachmentRequest,
  DeleteMessageTemplateAttachmentResponse,
  DeleteMessageTemplateAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /knowledgeBases/{knowledgeBaseId}/messageTemplates/{messageTemplateId}/attachments/{attachmentId}",
    input: { knowledgeBaseId: 0, messageTemplateId: 0, attachmentId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMessageTemplateAttachment",
})) as any;

export type DeleteQuickResponseError =
  | AccessDeniedException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a quick response.
 */
export const deleteQuickResponse: API.OperationMethod<
  DeleteQuickResponseRequest,
  DeleteQuickResponseResponse,
  DeleteQuickResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /knowledgeBases/{knowledgeBaseId}/quickResponses/{quickResponseId}",
    input: { knowledgeBaseId: 0, quickResponseId: 0 },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQuickResponse",
})) as any;

export type GetAIAgentError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Gets an Amazon Q in Connect AI Agent.
 */
export const getAIAgent: API.OperationMethod<
  GetAIAgentRequest,
  GetAIAgentResponse,
  GetAIAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /assistants/{assistantId}/aiagents/{aiAgentId}",
    input: { assistantId: 0, aiAgentId: 0 },
    output: { aiAgent: o_AIAgentData },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAIAgent",
})) as any;

export type GetAIGuardrailError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Gets the Amazon Q in Connect AI Guardrail.
 */
export const getAIGuardrail: API.OperationMethod<
  GetAIGuardrailRequest,
  GetAIGuardrailResponse,
  GetAIGuardrailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /assistants/{assistantId}/aiguardrails/{aiGuardrailId}",
    input: { assistantId: 0, aiGuardrailId: 0 },
    output: { aiGuardrail: o_AIGuardrailData },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAIGuardrail",
})) as any;

export type GetAIPromptError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Gets and Amazon Q in Connect AI Prompt.
 */
export const getAIPrompt: API.OperationMethod<
  GetAIPromptRequest,
  GetAIPromptResponse,
  GetAIPromptError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /assistants/{assistantId}/aiprompts/{aiPromptId}",
    input: { assistantId: 0, aiPromptId: 0 },
    output: { aiPrompt: o_AIPromptData },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAIPrompt",
})) as any;

export type GetAssistantError =
  | AccessDeniedException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an assistant.
 */
export const getAssistant: API.OperationMethod<
  GetAssistantRequest,
  GetAssistantResponse,
  GetAssistantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /assistants/{assistantId}",
    input: { assistantId: 0 },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssistant",
})) as any;

export type GetAssistantAssociationError =
  | AccessDeniedException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an assistant association.
 */
export const getAssistantAssociation: API.OperationMethod<
  GetAssistantAssociationRequest,
  GetAssistantAssociationResponse,
  GetAssistantAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /assistants/{assistantId}/associations/{assistantAssociationId}",
    input: { assistantAssociationId: 0, assistantId: 0 },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssistantAssociation",
})) as any;

export type GetContentError =
  | AccessDeniedException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves content, including a pre-signed URL to download the content.
 */
export const getContent: API.OperationMethod<
  GetContentRequest,
  GetContentResponse,
  GetContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /knowledgeBases/{knowledgeBaseId}/contents/{contentId}",
    input: { contentId: 0, knowledgeBaseId: 0 },
    output: { content: o_ContentData },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContent",
})) as any;

export type GetContentAssociationError =
  | AccessDeniedException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Returns the content association.
 *
 * For more information about content associations--what they are and when they are used--see Integrate Amazon Q in Connect with step-by-step guides in the *Amazon Connect Administrator Guide*.
 */
export const getContentAssociation: API.OperationMethod<
  GetContentAssociationRequest,
  GetContentAssociationResponse,
  GetContentAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /knowledgeBases/{knowledgeBaseId}/contents/{contentId}/associations/{contentAssociationId}",
    input: { knowledgeBaseId: 0, contentId: 0, contentAssociationId: 0 },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContentAssociation",
})) as any;

export type GetContentSummaryError =
  | AccessDeniedException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves summary information about the content.
 */
export const getContentSummary: API.OperationMethod<
  GetContentSummaryRequest,
  GetContentSummaryResponse,
  GetContentSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /knowledgeBases/{knowledgeBaseId}/contents/{contentId}/summary",
    input: { contentId: 0, knowledgeBaseId: 0 },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContentSummary",
})) as any;

export type GetImportJobError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the started import job.
 */
export const getImportJob: API.OperationMethod<
  GetImportJobRequest,
  GetImportJobResponse,
  GetImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /knowledgeBases/{knowledgeBaseId}/importJobs/{importJobId}",
    input: { importJobId: 0, knowledgeBaseId: 0 },
    output: { importJob: o_ImportJobData },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImportJob",
})) as any;

export type GetKnowledgeBaseError =
  | AccessDeniedException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the knowledge base.
 */
export const getKnowledgeBase: API.OperationMethod<
  GetKnowledgeBaseRequest,
  GetKnowledgeBaseResponse,
  GetKnowledgeBaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /knowledgeBases/{knowledgeBaseId}",
    input: { knowledgeBaseId: 0 },
    output: { knowledgeBase: o_KnowledgeBaseData },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKnowledgeBase",
})) as any;

export type GetMessageTemplateError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the Amazon Q in Connect message template. The message template identifier can contain an optional qualifier, for example, `<message-template-id>:<qualifier>`, which is either an actual version number or an Amazon Q Connect managed qualifier `$ACTIVE_VERSION` | `$LATEST`. If it is not supplied, then `$LATEST` is assumed implicitly.
 */
export const getMessageTemplate: API.OperationMethod<
  GetMessageTemplateRequest,
  GetMessageTemplateResponse,
  GetMessageTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /knowledgeBases/{knowledgeBaseId}/messageTemplates/{messageTemplateId}",
    input: { messageTemplateId: 0, knowledgeBaseId: 0 },
    output: { messageTemplate: o_ExtendedMessageTemplateData },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMessageTemplate",
})) as any;

export type GetNextMessageError =
  | AccessDeniedException
  | ResourceNotFoundException
  | UnprocessableContentException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves next message on an Amazon Q in Connect session.
 */
export const getNextMessage: API.OperationMethod<
  GetNextMessageRequest,
  GetNextMessageResponse,
  GetNextMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /assistants/{assistantId}/sessions/{sessionId}/messages/next",
    input: {
      assistantId: 0,
      sessionId: 0,
      nextMessageToken: D.m({ query: "nextMessageToken" }),
    },
    output: {
      response: o_MessageOutput,
      conversationSessionData: D.list(o_RuntimeSessionData),
    },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnprocessableContentException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNextMessage",
})) as any;

export type GetQuickResponseError =
  | AccessDeniedException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the quick response.
 */
export const getQuickResponse: API.OperationMethod<
  GetQuickResponseRequest,
  GetQuickResponseResponse,
  GetQuickResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /knowledgeBases/{knowledgeBaseId}/quickResponses/{quickResponseId}",
    input: { quickResponseId: 0, knowledgeBaseId: 0 },
    output: { quickResponse: o_QuickResponseData },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQuickResponse",
})) as any;

export type GetRecommendationsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * This API will be discontinued starting June 1, 2024. To receive generative responses after March 1, 2024, you will need to create a new Assistant in the Amazon Connect console and integrate the Amazon Q in Connect JavaScript library (amazon-q-connectjs) into your applications.
 *
 * Retrieves recommendations for the specified session. To avoid retrieving the same recommendations in subsequent calls, use NotifyRecommendationsReceived. This API supports long-polling behavior with the `waitTimeSeconds` parameter. Short poll is the default behavior and only returns recommendations already available. To perform a manual query against an assistant, use QueryAssistant.
 */
export const getRecommendations: API.OperationMethod<
  GetRecommendationsRequest,
  GetRecommendationsResponse,
  GetRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /assistants/{assistantId}/sessions/{sessionId}/recommendations",
    input: {
      assistantId: 0,
      sessionId: 0,
      maxResults: D.m({ query: "maxResults" }),
      waitTimeSeconds: D.m({ query: "waitTimeSeconds" }),
      nextChunkToken: D.m({ query: "nextChunkToken" }),
      recommendationType: D.m({ query: "recommendationType" }),
    },
    output: {
      recommendations: D.list({ document: o_Document, data: o_DataSummary }),
      triggers: D.list({ data: { query: { text: D.secret } } }),
    },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecommendations",
})) as any;

export type GetSessionError =
  | AccessDeniedException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information for a specified session.
 */
export const getSession: API.OperationMethod<
  GetSessionRequest,
  GetSessionResponse,
  GetSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /assistants/{assistantId}/sessions/{sessionId}",
    input: { assistantId: 0, sessionId: 0 },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSession",
})) as any;

export type ListAIAgentsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists AI Agents.
 */
export const listAIAgents: API.PaginatedOperationMethod<
  ListAIAgentsRequest,
  ListAIAgentsResponse,
  ListAIAgentsError,
  Credentials | HttpClient.HttpClient,
  AIAgentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /assistants/{assistantId}/aiagents",
    input: {
      assistantId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      origin: D.m({ query: "origin" }),
    },
    output: { aiAgentSummaries: D.list(o_AIAgentSummary) },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAIAgents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "aiAgentSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAIAgentVersionsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * List AI Agent versions.
 */
export const listAIAgentVersions: API.PaginatedOperationMethod<
  ListAIAgentVersionsRequest,
  ListAIAgentVersionsResponse,
  ListAIAgentVersionsError,
  Credentials | HttpClient.HttpClient,
  AIAgentVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /assistants/{assistantId}/aiagents/{aiAgentId}/versions",
    input: {
      assistantId: 0,
      aiAgentId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      origin: D.m({ query: "origin" }),
    },
    output: {
      aiAgentVersionSummaries: D.list({ aiAgentSummary: o_AIAgentSummary }),
    },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAIAgentVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "aiAgentVersionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAIGuardrailsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists the AI Guardrails available on the Amazon Q in Connect assistant.
 */
export const listAIGuardrails: API.PaginatedOperationMethod<
  ListAIGuardrailsRequest,
  ListAIGuardrailsResponse,
  ListAIGuardrailsError,
  Credentials | HttpClient.HttpClient,
  AIGuardrailSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /assistants/{assistantId}/aiguardrails",
    input: {
      assistantId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { aiGuardrailSummaries: D.list(o_AIGuardrailSummary) },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAIGuardrails",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "aiGuardrailSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAIGuardrailVersionsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists AI Guardrail versions.
 */
export const listAIGuardrailVersions: API.PaginatedOperationMethod<
  ListAIGuardrailVersionsRequest,
  ListAIGuardrailVersionsResponse,
  ListAIGuardrailVersionsError,
  Credentials | HttpClient.HttpClient,
  AIGuardrailVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /assistants/{assistantId}/aiguardrails/{aiGuardrailId}/versions",
    input: {
      assistantId: 0,
      aiGuardrailId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      aiGuardrailVersionSummaries: D.list({
        aiGuardrailSummary: o_AIGuardrailSummary,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAIGuardrailVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "aiGuardrailVersionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAIPromptsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists the AI Prompts available on the Amazon Q in Connect assistant.
 */
export const listAIPrompts: API.PaginatedOperationMethod<
  ListAIPromptsRequest,
  ListAIPromptsResponse,
  ListAIPromptsError,
  Credentials | HttpClient.HttpClient,
  AIPromptSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /assistants/{assistantId}/aiprompts",
    input: {
      assistantId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      origin: D.m({ query: "origin" }),
    },
    output: { aiPromptSummaries: D.list(o_AIPromptSummary) },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAIPrompts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "aiPromptSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAIPromptVersionsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists AI Prompt versions.
 */
export const listAIPromptVersions: API.PaginatedOperationMethod<
  ListAIPromptVersionsRequest,
  ListAIPromptVersionsResponse,
  ListAIPromptVersionsError,
  Credentials | HttpClient.HttpClient,
  AIPromptVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /assistants/{assistantId}/aiprompts/{aiPromptId}/versions",
    input: {
      assistantId: 0,
      aiPromptId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      origin: D.m({ query: "origin" }),
    },
    output: {
      aiPromptVersionSummaries: D.list({ aiPromptSummary: o_AIPromptSummary }),
    },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAIPromptVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "aiPromptVersionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssistantAssociationsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists information about assistant associations.
 */
export const listAssistantAssociations: API.PaginatedOperationMethod<
  ListAssistantAssociationsRequest,
  ListAssistantAssociationsResponse,
  ListAssistantAssociationsError,
  Credentials | HttpClient.HttpClient,
  AssistantAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /assistants/{assistantId}/associations",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      assistantId: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssistantAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assistantAssociationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssistantsError =
  | AccessDeniedException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists information about assistants.
 */
export const listAssistants: API.PaginatedOperationMethod<
  ListAssistantsRequest,
  ListAssistantsResponse,
  ListAssistantsError,
  Credentials | HttpClient.HttpClient,
  AssistantSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /assistants",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [AccessDeniedException, UnauthorizedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssistants",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assistantSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListContentAssociationsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists the content associations.
 *
 * For more information about content associations--what they are and when they are used--see Integrate Amazon Q in Connect with step-by-step guides in the *Amazon Connect Administrator Guide*.
 */
export const listContentAssociations: API.PaginatedOperationMethod<
  ListContentAssociationsRequest,
  ListContentAssociationsResponse,
  ListContentAssociationsError,
  Credentials | HttpClient.HttpClient,
  ContentAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /knowledgeBases/{knowledgeBaseId}/contents/{contentId}/associations",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      knowledgeBaseId: 0,
      contentId: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContentAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "contentAssociationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListContentsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the content.
 */
export const listContents: API.PaginatedOperationMethod<
  ListContentsRequest,
  ListContentsResponse,
  ListContentsError,
  Credentials | HttpClient.HttpClient,
  ContentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /knowledgeBases/{knowledgeBaseId}/contents",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      knowledgeBaseId: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "contentSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListImportJobsError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Lists information about import jobs.
 */
export const listImportJobs: API.PaginatedOperationMethod<
  ListImportJobsRequest,
  ListImportJobsResponse,
  ListImportJobsError,
  Credentials | HttpClient.HttpClient,
  ImportJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /knowledgeBases/{knowledgeBaseId}/importJobs",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      knowledgeBaseId: 0,
    },
    output: {
      importJobSummaries: D.list({ createdTime: D.ts, lastModifiedTime: D.ts }),
    },
  },
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImportJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "importJobSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListKnowledgeBasesError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Lists the knowledge bases.
 */
export const listKnowledgeBases: API.PaginatedOperationMethod<
  ListKnowledgeBasesRequest,
  ListKnowledgeBasesResponse,
  ListKnowledgeBasesError,
  Credentials | HttpClient.HttpClient,
  KnowledgeBaseSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /knowledgeBases",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      knowledgeBaseSummaries: D.list({
        sourceConfiguration: o_SourceConfiguration,
      }),
    },
  },
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListKnowledgeBases",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "knowledgeBaseSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMessagesError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists messages on an Amazon Q in Connect session.
 */
export const listMessages: API.PaginatedOperationMethod<
  ListMessagesRequest,
  ListMessagesResponse,
  ListMessagesError,
  Credentials | HttpClient.HttpClient,
  MessageOutput
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /assistants/{assistantId}/sessions/{sessionId}/messages",
    input: {
      assistantId: 0,
      sessionId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      filter: D.m({ query: "filter" }),
    },
    output: { messages: D.list(o_MessageOutput) },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMessages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "messages",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMessageTemplatesError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the available Amazon Q in Connect message templates for the specified knowledge base.
 */
export const listMessageTemplates: API.PaginatedOperationMethod<
  ListMessageTemplatesRequest,
  ListMessageTemplatesResponse,
  ListMessageTemplatesError,
  Credentials | HttpClient.HttpClient,
  MessageTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /knowledgeBases/{knowledgeBaseId}/messageTemplates",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      knowledgeBaseId: 0,
    },
    output: {
      messageTemplateSummaries: D.list({
        channel: D.secret,
        createdTime: D.ts,
        lastModifiedTime: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMessageTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "messageTemplateSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMessageTemplateVersionsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the available versions for the specified Amazon Q in Connect message template.
 */
export const listMessageTemplateVersions: API.PaginatedOperationMethod<
  ListMessageTemplateVersionsRequest,
  ListMessageTemplateVersionsResponse,
  ListMessageTemplateVersionsError,
  Credentials | HttpClient.HttpClient,
  MessageTemplateVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /knowledgeBases/{knowledgeBaseId}/messageTemplates/{messageTemplateId}/versions",
    input: {
      knowledgeBaseId: 0,
      messageTemplateId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { messageTemplateVersionSummaries: D.list({ channel: D.secret }) },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMessageTemplateVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "messageTemplateVersionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListModelsError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists the models available to an Amazon Q in Connect assistant in the assistant's Amazon Web Services Region. The available models are determined by the region of the specified assistant.
 */
export const listModels: API.PaginatedOperationMethod<
  ListModelsRequest,
  ListModelsResponse,
  ListModelsError,
  Credentials | HttpClient.HttpClient,
  ModelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /assistants/{assistantId}/models",
    input: {
      assistantId: 0,
      aiPromptType: D.m({ query: "aiPromptType" }),
      modelLifecycle: D.m({ query: "modelLifecycle" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      modelSummaries: D.list({
        legacyTimestamp: D.ts,
        endOfLifeTimestamp: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListModels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "modelSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListQuickResponsesError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists information about quick response.
 */
export const listQuickResponses: API.PaginatedOperationMethod<
  ListQuickResponsesRequest,
  ListQuickResponsesResponse,
  ListQuickResponsesError,
  Credentials | HttpClient.HttpClient,
  QuickResponseSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /knowledgeBases/{knowledgeBaseId}/quickResponses",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      knowledgeBaseId: 0,
    },
    output: {
      quickResponseSummaries: D.list({
        createdTime: D.ts,
        lastModifiedTime: D.ts,
        channels: D.list(D.secret),
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQuickResponses",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "quickResponseSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSpansError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves AI agent execution traces for a session, providing granular visibility into agent orchestration flows, LLM interactions, and tool invocations.
 */
export const listSpans: API.PaginatedOperationMethod<
  ListSpansRequest,
  ListSpansResponse,
  ListSpansError,
  Credentials | HttpClient.HttpClient,
  Span
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /assistants/{assistantId}/sessions/{sessionId}/spans",
    input: {
      assistantId: 0,
      sessionId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      spans: D.list({
        startTimestamp: D.ts,
        endTimestamp: D.ts,
        attributes: {
          inputMessages: D.list(o_SpanMessage),
          outputMessages: D.list(o_SpanMessage),
          systemInstructions: D.list(o_SpanMessageValue),
        },
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSpans",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "spans",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Lists the tags for the specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type NotifyRecommendationsReceivedError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified recommendations from the specified assistant's queue of newly available recommendations. You can use this API in conjunction with GetRecommendations and a `waitTimeSeconds` input for long-polling behavior and avoiding duplicate recommendations.
 */
export const notifyRecommendationsReceived: API.OperationMethod<
  NotifyRecommendationsReceivedRequest,
  NotifyRecommendationsReceivedResponse,
  NotifyRecommendationsReceivedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /assistants/{assistantId}/sessions/{sessionId}/recommendations/notify",
    input: { assistantId: 0, sessionId: 0, recommendationIds: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "NotifyRecommendationsReceived",
})) as any;

export type PutFeedbackError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Provides feedback against the specified assistant for the specified target. This API only supports generative targets.
 */
export const putFeedback: API.OperationMethod<
  PutFeedbackRequest,
  PutFeedbackResponse,
  PutFeedbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /assistants/{assistantId}/feedback",
    input: {
      assistantId: 0,
      targetId: 0,
      targetType: 0,
      contentFeedback: { generativeContentFeedbackData: { relevance: 0 } },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFeedback",
})) as any;

export type QueryAssistantError =
  | AccessDeniedException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * This API will be discontinued starting June 1, 2024. To receive generative responses after March 1, 2024, you will need to create a new Assistant in the Amazon Connect console and integrate the Amazon Q in Connect JavaScript library (amazon-q-connectjs) into your applications.
 *
 * Performs a manual search against the specified assistant. To retrieve recommendations for an assistant, use GetRecommendations.
 */
export const queryAssistant: API.PaginatedOperationMethod<
  QueryAssistantRequest,
  QueryAssistantResponse,
  QueryAssistantError,
  Credentials | HttpClient.HttpClient,
  ResultData
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /assistants/{assistantId}/query",
    input: {
      assistantId: 0,
      queryText: 0,
      nextToken: 0,
      maxResults: 0,
      sessionId: 0,
      queryCondition: D.list({ single: { field: 0, comparator: 0, value: 0 } }),
      queryInputData: {
        queryTextInputData: { text: 0 },
        intentInputData: { intentId: 0 },
        caseSummarizationInputData: { caseArn: 0 },
      },
      overrideKnowledgeBaseSearchType: 0,
    },
    output: { results: D.list({ document: o_Document, data: o_DataSummary }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "QueryAssistant",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "results",
    pageSize: "maxResults",
  } as const,
})) as any;

export type RemoveAssistantAIAgentError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the AI Agent that is set for use by default on an Amazon Q in Connect Assistant.
 */
export const removeAssistantAIAgent: API.OperationMethod<
  RemoveAssistantAIAgentRequest,
  RemoveAssistantAIAgentResponse,
  RemoveAssistantAIAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /assistants/{assistantId}/aiagentConfiguration",
    input: {
      assistantId: 0,
      aiAgentType: D.m({ query: "aiAgentType" }),
      orchestratorUseCase: D.m({ query: "orchestratorUseCase" }),
    },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveAssistantAIAgent",
})) as any;

export type RemoveKnowledgeBaseTemplateUriError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes a URI template from a knowledge base.
 */
export const removeKnowledgeBaseTemplateUri: API.OperationMethod<
  RemoveKnowledgeBaseTemplateUriRequest,
  RemoveKnowledgeBaseTemplateUriResponse,
  RemoveKnowledgeBaseTemplateUriError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /knowledgeBases/{knowledgeBaseId}/templateUri",
    input: { knowledgeBaseId: 0 },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveKnowledgeBaseTemplateUri",
})) as any;

export type RenderMessageTemplateError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Renders the Amazon Q in Connect message template based on the attribute values provided and generates the message content. For any variable present in the message template, if the attribute value is neither provided in the attribute request parameter nor the default attribute of the message template, the rendered message content will keep the variable placeholder as it is and return the attribute keys that are missing.
 */
export const renderMessageTemplate: API.OperationMethod<
  RenderMessageTemplateRequest,
  RenderMessageTemplateResponse,
  RenderMessageTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases/{knowledgeBaseId}/messageTemplates/{messageTemplateId}/render",
    input: {
      knowledgeBaseId: 0,
      messageTemplateId: 0,
      attributes: i_MessageTemplateAttributes,
    },
    output: {
      content: o_MessageTemplateContentProvider,
      sourceConfigurationSummary: o_MessageTemplateSourceConfigurationSummary,
      attachments: D.list(o_MessageTemplateAttachment),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RenderMessageTemplate",
})) as any;

export type RetrieveError =
  | AccessDeniedException
  | ConflictException
  | DependencyFailedException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves content from knowledge sources based on a query.
 */
export const retrieve: API.OperationMethod<
  RetrieveRequest,
  RetrieveResponse,
  RetrieveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /assistants/{assistantId}/retrieve",
    input: {
      assistantId: 0,
      retrievalConfiguration: {
        knowledgeSource: { assistantAssociationIds: 0 },
        filter: i_RetrievalFilterConfiguration,
        numberOfResults: 0,
        overrideKnowledgeBaseSearchType: 0,
      },
      retrievalQuery: 0,
    },
    output: { results: D.list({ sourceId: D.secret, contentText: D.secret }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DependencyFailedException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Retrieve",
})) as any;

export type SearchContentError =
  | AccessDeniedException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Searches for content in a specified knowledge base. Can be used to get a specific content resource by its name.
 */
export const searchContent: API.PaginatedOperationMethod<
  SearchContentRequest,
  SearchContentResponse,
  SearchContentError,
  Credentials | HttpClient.HttpClient,
  ContentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases/{knowledgeBaseId}/search",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      knowledgeBaseId: 0,
      searchExpression: i_SearchExpression,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchContent",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "contentSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchMessageTemplatesError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Searches for Amazon Q in Connect message templates in the specified knowledge base.
 */
export const searchMessageTemplates: API.PaginatedOperationMethod<
  SearchMessageTemplatesRequest,
  SearchMessageTemplatesResponse,
  SearchMessageTemplatesError,
  Credentials | HttpClient.HttpClient,
  MessageTemplateSearchResultData
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases/{knowledgeBaseId}/search/messageTemplates",
    input: {
      knowledgeBaseId: 0,
      searchExpression: {
        queries: D.list({
          name: 0,
          values: 0,
          operator: 0,
          allowFuzziness: 0,
          priority: 0,
        }),
        filters: D.list({
          name: 0,
          values: 0,
          operator: 0,
          includeNoExistence: 0,
        }),
        orderOnField: { name: 0, order: 0 },
      },
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      results: D.list({
        channel: D.secret,
        createdTime: D.ts,
        lastModifiedTime: D.ts,
        sourceConfigurationSummary: o_MessageTemplateSourceConfigurationSummary,
        groupingConfiguration: o_GroupingConfiguration,
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchMessageTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "results",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchQuickResponsesError =
  | AccessDeniedException
  | RequestTimeoutException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Searches existing Amazon Q in Connect quick responses in an Amazon Q in Connect knowledge base.
 */
export const searchQuickResponses: API.PaginatedOperationMethod<
  SearchQuickResponsesRequest,
  SearchQuickResponsesResponse,
  SearchQuickResponsesError,
  Credentials | HttpClient.HttpClient,
  QuickResponseSearchResultData
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases/{knowledgeBaseId}/search/quickResponses",
    input: {
      knowledgeBaseId: 0,
      searchExpression: {
        queries: D.list({
          name: 0,
          values: 0,
          operator: 0,
          allowFuzziness: 0,
          priority: 0,
        }),
        filters: D.list({
          name: 0,
          values: 0,
          operator: 0,
          includeNoExistence: 0,
        }),
        orderOnField: { name: 0, order: 0 },
      },
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      attributes: 0,
    },
    output: {
      results: D.list({
        contents: o_QuickResponseContents,
        createdTime: D.ts,
        lastModifiedTime: D.ts,
        groupingConfiguration: o_GroupingConfiguration,
        channels: D.list(D.secret),
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    RequestTimeoutException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchQuickResponses",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "results",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchSessionsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Searches for sessions.
 */
export const searchSessions: API.PaginatedOperationMethod<
  SearchSessionsRequest,
  SearchSessionsResponse,
  SearchSessionsError,
  Credentials | HttpClient.HttpClient,
  SessionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /assistants/{assistantId}/searchSessions",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      assistantId: 0,
      searchExpression: i_SearchExpression,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchSessions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sessionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SendMessageError =
  | AccessDeniedException
  | ConflictException
  | DependencyFailedException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Submits a message to the Amazon Q in Connect session.
 */
export const sendMessage: API.OperationMethod<
  SendMessageRequest,
  SendMessageResponse,
  SendMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /assistants/{assistantId}/sessions/{sessionId}/message",
    input: {
      assistantId: 0,
      sessionId: 0,
      type: 0,
      message: {
        value: {
          text: {
            value: 0,
            citations: D.list({
              contentId: 0,
              title: 0,
              knowledgeBaseId: 0,
              citationSpan: { beginOffsetInclusive: 0, endOffsetExclusive: 0 },
              sourceURL: 0,
              referenceType: 0,
            }),
            aiGuardrailAssessment: { blocked: 0 },
          },
          toolUseResult: {
            toolUseId: 0,
            toolName: 0,
            toolResult: 0,
            inputSchema: 0,
          },
        },
      },
      aiAgentId: 0,
      conversationContext: {
        selfServiceConversationHistory: D.list({
          turnNumber: 0,
          inputTranscript: 0,
          botResponse: 0,
          timestamp: 0,
        }),
      },
      configuration: { generateFillerMessage: 0, generateChunkedMessage: 0 },
      clientToken: D.m({ idempotency: true }),
      orchestratorUseCase: 0,
      metadata: 0,
      originRequestId: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DependencyFailedException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendMessage",
})) as any;

export type StartContentUploadError =
  | AccessDeniedException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Get a URL to upload content to a knowledge base. To upload content, first make a PUT request to the returned URL with your file, making sure to include the required headers. Then use CreateContent to finalize the content creation process or UpdateContent to modify an existing resource. You can only upload content to a knowledge base of type CUSTOM.
 */
export const startContentUpload: API.OperationMethod<
  StartContentUploadRequest,
  StartContentUploadResponse,
  StartContentUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases/{knowledgeBaseId}/upload",
    input: { knowledgeBaseId: 0, contentType: 0, presignedUrlTimeToLive: 0 },
    output: { url: D.secret, urlExpiry: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartContentUpload",
})) as any;

export type StartImportJobError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Start an asynchronous job to import Amazon Q in Connect resources from an uploaded source file. Before calling this API, use StartContentUpload to upload an asset that contains the resource data.
 *
 * - For importing Amazon Q in Connect quick responses, you need to upload a csv file including the quick responses. For information about how to format the csv file for importing quick responses, see Import quick responses.
 */
export const startImportJob: API.OperationMethod<
  StartImportJobRequest,
  StartImportJobResponse,
  StartImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases/{knowledgeBaseId}/importJobs",
    input: {
      knowledgeBaseId: 0,
      importJobType: 0,
      uploadId: 0,
      clientToken: D.m({ idempotency: true }),
      metadata: 0,
      externalSourceConfiguration: {
        source: 0,
        configuration: { connectConfiguration: { instanceId: 0 } },
      },
    },
    output: { importJob: o_ImportJobData },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartImportJob",
})) as any;

export type TagResourceError =
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Adds the specified tags to the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [ResourceNotFoundException, TooManyTagsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Removes the specified tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAIAgentError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates an AI Agent.
 */
export const updateAIAgent: API.OperationMethod<
  UpdateAIAgentRequest,
  UpdateAIAgentResponse,
  UpdateAIAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /assistants/{assistantId}/aiagents/{aiAgentId}",
    input: {
      clientToken: D.m({ idempotency: true }),
      assistantId: 0,
      aiAgentId: 0,
      visibilityStatus: 0,
      configuration: i_AIAgentConfiguration,
      description: 0,
    },
    output: { aiAgent: o_AIAgentData },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAIAgent",
})) as any;

export type UpdateAIGuardrailError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates an AI Guardrail.
 */
export const updateAIGuardrail: API.OperationMethod<
  UpdateAIGuardrailRequest,
  UpdateAIGuardrailResponse,
  UpdateAIGuardrailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /assistants/{assistantId}/aiguardrails/{aiGuardrailId}",
    input: {
      clientToken: D.m({ idempotency: true }),
      assistantId: 0,
      aiGuardrailId: 0,
      visibilityStatus: 0,
      blockedInputMessaging: 0,
      blockedOutputsMessaging: 0,
      description: 0,
      topicPolicyConfig: i_AIGuardrailTopicPolicyConfig,
      contentPolicyConfig: i_AIGuardrailContentPolicyConfig,
      wordPolicyConfig: i_AIGuardrailWordPolicyConfig,
      sensitiveInformationPolicyConfig:
        i_AIGuardrailSensitiveInformationPolicyConfig,
      contextualGroundingPolicyConfig:
        i_AIGuardrailContextualGroundingPolicyConfig,
    },
    output: { aiGuardrail: o_AIGuardrailData },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAIGuardrail",
})) as any;

export type UpdateAIPromptError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates an AI Prompt.
 */
export const updateAIPrompt: API.OperationMethod<
  UpdateAIPromptRequest,
  UpdateAIPromptResponse,
  UpdateAIPromptError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /assistants/{assistantId}/aiprompts/{aiPromptId}",
    input: {
      clientToken: D.m({ idempotency: true }),
      assistantId: 0,
      aiPromptId: 0,
      visibilityStatus: 0,
      templateConfiguration: i_AIPromptTemplateConfiguration,
      description: 0,
      modelId: 0,
      inferenceConfiguration: i_AIPromptInferenceConfiguration,
    },
    output: { aiPrompt: o_AIPromptData },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAIPrompt",
})) as any;

export type UpdateAssistantAIAgentError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the AI Agent that is set for use by default on an Amazon Q in Connect Assistant.
 */
export const updateAssistantAIAgent: API.OperationMethod<
  UpdateAssistantAIAgentRequest,
  UpdateAssistantAIAgentResponse,
  UpdateAssistantAIAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /assistants/{assistantId}/aiagentConfiguration",
    input: {
      assistantId: 0,
      aiAgentType: 0,
      configuration: i_AIAgentConfigurationData,
      orchestratorUseCase: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAssistantAIAgent",
})) as any;

export type UpdateContentError =
  | AccessDeniedException
  | PreconditionFailedException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates information about the content.
 */
export const updateContent: API.OperationMethod<
  UpdateContentRequest,
  UpdateContentResponse,
  UpdateContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases/{knowledgeBaseId}/contents/{contentId}",
    input: {
      knowledgeBaseId: 0,
      contentId: 0,
      revisionId: 0,
      title: 0,
      overrideLinkOutUri: 0,
      removeOverrideLinkOutUri: 0,
      metadata: 0,
      uploadId: 0,
    },
    output: { content: o_ContentData },
    body: true,
  },
  errors: [
    AccessDeniedException,
    PreconditionFailedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContent",
})) as any;

export type UpdateKnowledgeBaseTemplateUriError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the template URI of a knowledge base. This is only supported for knowledge bases of type EXTERNAL. Include a single variable in `${variable}` format; this interpolated by Amazon Q in Connect using ingested content. For example, if you ingest a Salesforce article, it has an `Id` value, and you can set the template URI to `https://myInstanceName.lightning.force.com/lightning/r/Knowledge__kav/*${Id}*\/view`.
 */
export const updateKnowledgeBaseTemplateUri: API.OperationMethod<
  UpdateKnowledgeBaseTemplateUriRequest,
  UpdateKnowledgeBaseTemplateUriResponse,
  UpdateKnowledgeBaseTemplateUriError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases/{knowledgeBaseId}/templateUri",
    input: { knowledgeBaseId: 0, templateUri: 0 },
    output: { knowledgeBase: o_KnowledgeBaseData },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateKnowledgeBaseTemplateUri",
})) as any;

export type UpdateMessageTemplateError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the Amazon Q in Connect message template. Partial update is supported. If any field is not supplied, it will remain unchanged for the message template that is referenced by the `$LATEST` qualifier. Any modification will only apply to the message template that is referenced by the `$LATEST` qualifier. The fields for all available versions will remain unchanged.
 */
export const updateMessageTemplate: API.OperationMethod<
  UpdateMessageTemplateRequest,
  UpdateMessageTemplateResponse,
  UpdateMessageTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases/{knowledgeBaseId}/messageTemplates/{messageTemplateId}",
    input: {
      knowledgeBaseId: 0,
      messageTemplateId: 0,
      content: i_MessageTemplateContentProvider,
      language: 0,
      sourceConfiguration: i_MessageTemplateSourceConfiguration,
      defaultAttributes: i_MessageTemplateAttributes,
    },
    output: { messageTemplate: o_MessageTemplateData },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMessageTemplate",
})) as any;

export type UpdateMessageTemplateMetadataError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the Amazon Q in Connect message template metadata. Note that any modification to the message template’s name, description and grouping configuration will applied to the message template pointed by the `$LATEST` qualifier and all available versions. Partial update is supported. If any field is not supplied, it will remain unchanged for the message template.
 */
export const updateMessageTemplateMetadata: API.OperationMethod<
  UpdateMessageTemplateMetadataRequest,
  UpdateMessageTemplateMetadataResponse,
  UpdateMessageTemplateMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases/{knowledgeBaseId}/messageTemplates/{messageTemplateId}/metadata",
    input: {
      knowledgeBaseId: 0,
      messageTemplateId: 0,
      name: 0,
      description: 0,
      groupingConfiguration: i_GroupingConfiguration,
    },
    output: { messageTemplate: o_MessageTemplateData },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMessageTemplateMetadata",
})) as any;

export type UpdateQuickResponseError =
  | AccessDeniedException
  | ConflictException
  | PreconditionFailedException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing Amazon Q in Connect quick response.
 */
export const updateQuickResponse: API.OperationMethod<
  UpdateQuickResponseRequest,
  UpdateQuickResponseResponse,
  UpdateQuickResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases/{knowledgeBaseId}/quickResponses/{quickResponseId}",
    input: {
      knowledgeBaseId: 0,
      quickResponseId: 0,
      name: 0,
      content: i_QuickResponseDataProvider,
      contentType: 0,
      groupingConfiguration: i_GroupingConfiguration,
      removeGroupingConfiguration: 0,
      description: 0,
      removeDescription: 0,
      shortcutKey: 0,
      removeShortcutKey: 0,
      isActive: 0,
      channels: 0,
      language: 0,
    },
    output: { quickResponse: o_QuickResponseData },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    PreconditionFailedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQuickResponse",
})) as any;

export type UpdateSessionError =
  | AccessDeniedException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates a session. A session is a contextual container used for generating recommendations. Amazon Connect updates the existing Amazon Q in Connect session for each contact on which Amazon Q in Connect is enabled.
 */
export const updateSession: API.OperationMethod<
  UpdateSessionRequest,
  UpdateSessionResponse,
  UpdateSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /assistants/{assistantId}/sessions/{sessionId}",
    input: {
      assistantId: 0,
      sessionId: 0,
      description: 0,
      tagFilter: i_TagFilter,
      aiAgentConfiguration: D.map(i_AIAgentConfigurationData),
      orchestratorConfigurationList: D.list(i_OrchestratorConfigurationEntry),
      removeOrchestratorConfigurationList: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSession",
})) as any;

export type UpdateSessionDataError =
  | AccessDeniedException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates the data stored on an Amazon Q in Connect Session.
 */
export const updateSessionData: API.OperationMethod<
  UpdateSessionDataRequest,
  UpdateSessionDataResponse,
  UpdateSessionDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /assistants/{assistantId}/sessions/{sessionId}/data",
    input: {
      assistantId: 0,
      sessionId: 0,
      namespace: 0,
      data: D.list({ key: 0, value: { stringValue: 0 } }),
    },
    output: { data: D.list(o_RuntimeSessionData) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSessionData",
})) as any;

const i_AIAgentConfiguration: D.LazyStruct = () => ({
  manualSearchAIAgentConfiguration: {
    answerGenerationAIPromptId: 0,
    answerGenerationAIGuardrailId: 0,
    associationConfigurations: D.list(i_AssociationConfiguration),
    locale: 0,
  },
  answerRecommendationAIAgentConfiguration: {
    intentLabelingGenerationAIPromptId: 0,
    queryReformulationAIPromptId: 0,
    answerGenerationAIPromptId: 0,
    answerGenerationAIGuardrailId: 0,
    associationConfigurations: D.list(i_AssociationConfiguration),
    locale: 0,
    suggestedMessages: 0,
  },
  selfServiceAIAgentConfiguration: {
    selfServicePreProcessingAIPromptId: 0,
    selfServiceAnswerGenerationAIPromptId: 0,
    selfServiceAIGuardrailId: 0,
    associationConfigurations: D.list(i_AssociationConfiguration),
  },
  emailResponseAIAgentConfiguration: {
    emailResponseAIPromptId: 0,
    emailQueryReformulationAIPromptId: 0,
    locale: 0,
    associationConfigurations: D.list(i_AssociationConfiguration),
  },
  emailOverviewAIAgentConfiguration: { emailOverviewAIPromptId: 0, locale: 0 },
  emailGenerativeAnswerAIAgentConfiguration: {
    emailGenerativeAnswerAIPromptId: 0,
    emailQueryReformulationAIPromptId: 0,
    locale: 0,
    associationConfigurations: D.list(i_AssociationConfiguration),
  },
  orchestrationAIAgentConfiguration: {
    orchestrationAIPromptId: 0,
    orchestrationAIGuardrailId: 0,
    toolConfigurations: D.list({
      toolName: 0,
      toolType: 0,
      title: 0,
      toolId: 0,
      description: 0,
      instruction: { instruction: 0, examples: 0 },
      overrideInputValues: D.list({
        jsonPath: 0,
        value: { constant: { type: 0, value: 0 } },
      }),
      outputFilters: D.list({
        jsonPath: 0,
        outputConfiguration: {
          outputVariableNameOverride: 0,
          sessionDataNamespace: 0,
        },
      }),
      inputSchema: 0,
      outputSchema: 0,
      annotations: { title: 0, destructiveHint: 0 },
      userInteractionConfiguration: { isUserConfirmationRequired: 0 },
    }),
    connectInstanceArn: 0,
    locale: 0,
  },
  noteTakingAIAgentConfiguration: {
    noteTakingAIPromptId: 0,
    noteTakingAIGuardrailId: 0,
    locale: 0,
  },
  caseSummarizationAIAgentConfiguration: {
    caseSummarizationAIPromptId: 0,
    caseSummarizationAIGuardrailId: 0,
    locale: 0,
  },
});
const i_AIAgentConfigurationData: D.LazyStruct = () => ({ aiAgentId: 0 });
const i_AIGuardrailContentPolicyConfig: D.LazyStruct = () => ({
  filtersConfig: D.list({ type: 0, inputStrength: 0, outputStrength: 0 }),
});
const i_AIGuardrailContextualGroundingPolicyConfig: D.LazyStruct = () => ({
  filtersConfig: D.list({ type: 0, threshold: 0 }),
});
const i_AIGuardrailSensitiveInformationPolicyConfig: D.LazyStruct = () => ({
  piiEntitiesConfig: D.list({ type: 0, action: 0 }),
  regexesConfig: D.list({ name: 0, description: 0, pattern: 0, action: 0 }),
});
const i_AIGuardrailTopicPolicyConfig: D.LazyStruct = () => ({
  topicsConfig: D.list({ name: 0, definition: 0, examples: 0, type: 0 }),
});
const i_AIGuardrailWordPolicyConfig: D.LazyStruct = () => ({
  wordsConfig: D.list({ text: 0 }),
  managedWordListsConfig: D.list({ type: 0 }),
});
const i_AIPromptInferenceConfiguration: D.LazyStruct = () => ({
  temperature: 0,
  topP: 0,
  topK: 0,
  maxTokensToSample: 0,
});
const i_AIPromptTemplateConfiguration: D.LazyStruct = () => ({
  textFullAIPromptEditTemplateConfiguration: { text: 0 },
});
const i_GroupingConfiguration: D.LazyStruct = () => ({
  criteria: 0,
  values: 0,
});
const i_MessageTemplateAttributes: D.LazyStruct = () => ({
  systemAttributes: {
    name: 0,
    customerEndpoint: i_SystemEndpointAttributes,
    systemEndpoint: i_SystemEndpointAttributes,
  },
  agentAttributes: { firstName: 0, lastName: 0 },
  customerProfileAttributes: {
    profileId: 0,
    profileARN: 0,
    firstName: 0,
    middleName: 0,
    lastName: 0,
    accountNumber: 0,
    emailAddress: 0,
    phoneNumber: 0,
    additionalInformation: 0,
    partyType: 0,
    businessName: 0,
    birthDate: 0,
    gender: 0,
    mobilePhoneNumber: 0,
    homePhoneNumber: 0,
    businessPhoneNumber: 0,
    businessEmailAddress: 0,
    address1: 0,
    address2: 0,
    address3: 0,
    address4: 0,
    city: 0,
    county: 0,
    country: 0,
    postalCode: 0,
    province: 0,
    state: 0,
    shippingAddress1: 0,
    shippingAddress2: 0,
    shippingAddress3: 0,
    shippingAddress4: 0,
    shippingCity: 0,
    shippingCounty: 0,
    shippingCountry: 0,
    shippingPostalCode: 0,
    shippingProvince: 0,
    shippingState: 0,
    mailingAddress1: 0,
    mailingAddress2: 0,
    mailingAddress3: 0,
    mailingAddress4: 0,
    mailingCity: 0,
    mailingCounty: 0,
    mailingCountry: 0,
    mailingPostalCode: 0,
    mailingProvince: 0,
    mailingState: 0,
    billingAddress1: 0,
    billingAddress2: 0,
    billingAddress3: 0,
    billingAddress4: 0,
    billingCity: 0,
    billingCounty: 0,
    billingCountry: 0,
    billingPostalCode: 0,
    billingProvince: 0,
    billingState: 0,
    custom: 0,
  },
  customAttributes: 0,
});
const i_MessageTemplateContentProvider: D.LazyStruct = () => ({
  email: {
    subject: 0,
    body: {
      plainText: i_MessageTemplateBodyContentProvider,
      html: i_MessageTemplateBodyContentProvider,
    },
    headers: D.list({ name: 0, value: 0 }),
  },
  sms: { body: { plainText: i_MessageTemplateBodyContentProvider } },
  whatsApp: { data: 0 },
  push: {
    adm: {
      title: 0,
      body: i_MessageTemplateBodyContentProvider,
      action: 0,
      sound: 0,
      url: 0,
      imageUrl: 0,
      imageIconUrl: 0,
      smallImageIconUrl: 0,
      rawContent: i_MessageTemplateBodyContentProvider,
    },
    apns: {
      title: 0,
      body: i_MessageTemplateBodyContentProvider,
      action: 0,
      sound: 0,
      url: 0,
      mediaUrl: 0,
      rawContent: i_MessageTemplateBodyContentProvider,
    },
    fcm: {
      title: 0,
      body: i_MessageTemplateBodyContentProvider,
      action: 0,
      sound: 0,
      url: 0,
      imageUrl: 0,
      imageIconUrl: 0,
      smallImageIconUrl: 0,
      rawContent: i_MessageTemplateBodyContentProvider,
    },
    baidu: {
      title: 0,
      body: i_MessageTemplateBodyContentProvider,
      action: 0,
      sound: 0,
      url: 0,
      imageUrl: 0,
      imageIconUrl: 0,
      smallImageIconUrl: 0,
      rawContent: i_MessageTemplateBodyContentProvider,
    },
  },
});
const i_MessageTemplateSourceConfiguration: D.LazyStruct = () => ({
  whatsApp: { businessAccountId: 0, templateId: 0, components: 0 },
});
const i_OrchestratorConfigurationEntry: D.LazyStruct = () => ({
  aiAgentId: 0,
  orchestratorUseCase: 0,
});
const i_QuickResponseDataProvider: D.LazyStruct = () => ({ content: 0 });
const i_RetrievalFilterConfiguration: D.LazyStruct = () => ({
  andAll: D.list(i_RetrievalFilterConfiguration),
  equals: i_FilterAttribute,
  greaterThan: i_FilterAttribute,
  greaterThanOrEquals: i_FilterAttribute,
  in: i_FilterAttribute,
  lessThan: i_FilterAttribute,
  lessThanOrEquals: i_FilterAttribute,
  listContains: i_FilterAttribute,
  notEquals: i_FilterAttribute,
  notIn: i_FilterAttribute,
  orAll: D.list(i_RetrievalFilterConfiguration),
  startsWith: i_FilterAttribute,
  stringContains: i_FilterAttribute,
});
const i_SearchExpression: D.LazyStruct = () => ({
  filters: D.list({ field: 0, operator: 0, value: 0 }),
});
const i_ServerSideEncryptionConfiguration: D.LazyStruct = () => ({
  kmsKeyId: 0,
});
const i_TagFilter: D.LazyStruct = () => ({
  tagCondition: i_TagCondition,
  andConditions: D.list(i_TagCondition),
  orConditions: D.list({
    andConditions: D.list(i_TagCondition),
    tagCondition: i_TagCondition,
  }),
});
const o_AIAgentData: D.LazyStruct = () => ({
  configuration: o_AIAgentConfiguration,
  modifiedTime: D.ts,
});
const o_AIAgentSummary: D.LazyStruct = () => ({
  modifiedTime: D.ts,
  configuration: o_AIAgentConfiguration,
});
const o_AIGuardrailData: D.LazyStruct = () => ({
  blockedInputMessaging: D.secret,
  blockedOutputsMessaging: D.secret,
  description: D.secret,
  topicPolicyConfig: {
    topicsConfig: D.list({
      name: D.secret,
      definition: D.secret,
      examples: D.list(D.secret),
      type: D.secret,
    }),
  },
  contentPolicyConfig: {
    filtersConfig: D.list({
      type: D.secret,
      inputStrength: D.secret,
      outputStrength: D.secret,
    }),
  },
  wordPolicyConfig: {
    wordsConfig: D.list({ text: D.secret }),
    managedWordListsConfig: D.list({ type: D.secret }),
  },
  sensitiveInformationPolicyConfig: {
    piiEntitiesConfig: D.list({ type: D.secret, action: D.secret }),
    regexesConfig: D.list({
      name: D.secret,
      description: D.secret,
      pattern: D.secret,
      action: D.secret,
    }),
  },
  contextualGroundingPolicyConfig: {
    filtersConfig: D.list({ type: D.secret }),
  },
  modifiedTime: D.ts,
});
const o_AIGuardrailSummary: D.LazyStruct = () => ({
  modifiedTime: D.ts,
  description: D.secret,
});
const o_AIPromptData: D.LazyStruct = () => ({
  templateConfiguration: {
    textFullAIPromptEditTemplateConfiguration: { text: D.secret },
  },
  modifiedTime: D.ts,
});
const o_AIPromptSummary: D.LazyStruct = () => ({ modifiedTime: D.ts });
const o_ContentData: D.LazyStruct = () => ({ url: D.secret, urlExpiry: D.ts });
const o_DataSummary: D.LazyStruct = () => ({
  details: {
    contentData: { textData: o_TextData },
    generativeData: { completion: D.secret, references: D.list(o_DataSummary) },
    intentDetectedData: { intent: D.secret },
    sourceContentData: { textData: o_TextData },
    generativeChunkData: {
      completion: D.secret,
      references: D.list(o_DataSummary),
    },
    emailResponseChunkData: { completion: D.secret },
    emailOverviewChunkData: { completion: D.secret },
    emailGenerativeAnswerChunkData: {
      completion: D.secret,
      references: D.list(o_DataSummary),
    },
    caseSummarizationChunkData: { completion: D.secret },
    suggestedMessageData: { messageText: D.secret },
    notesData: { completion: D.secret },
    notesChunkData: { completion: D.secret },
  },
});
const o_Document: D.LazyStruct = () => ({
  title: o_DocumentText,
  excerpt: o_DocumentText,
});
const o_ExtendedMessageTemplateData: D.LazyStruct = () => ({
  channel: D.secret,
  createdTime: D.ts,
  lastModifiedTime: D.ts,
  content: o_MessageTemplateContentProvider,
  sourceConfigurationSummary: o_MessageTemplateSourceConfigurationSummary,
  groupingConfiguration: o_GroupingConfiguration,
  defaultAttributes: o_MessageTemplateAttributes,
  attachments: D.list(o_MessageTemplateAttachment),
});
const o_GroupingConfiguration: D.LazyStruct = () => ({
  criteria: D.secret,
  values: D.list(D.secret),
});
const o_ImportJobData: D.LazyStruct = () => ({
  url: D.secret,
  failedRecordReport: D.secret,
  urlExpiry: D.ts,
  createdTime: D.ts,
  lastModifiedTime: D.ts,
});
const o_KnowledgeBaseData: D.LazyStruct = () => ({
  lastContentModificationTime: D.ts,
  sourceConfiguration: o_SourceConfiguration,
});
const o_MessageOutput: D.LazyStruct = () => ({
  value: {
    text: {
      value: D.secret,
      citations: D.list({ title: D.secret, sourceURL: D.secret }),
    },
  },
  timestamp: D.ts,
});
const o_MessageTemplateAttachment: D.LazyStruct = () => ({
  name: D.secret,
  uploadedTime: D.ts,
  url: D.secret,
  urlExpiry: D.ts,
});
const o_MessageTemplateContentProvider: D.LazyStruct = () => ({
  email: {
    subject: D.secret,
    body: {
      plainText: o_MessageTemplateBodyContentProvider,
      html: o_MessageTemplateBodyContentProvider,
    },
    headers: D.list({ value: D.secret }),
  },
  sms: { body: { plainText: o_MessageTemplateBodyContentProvider } },
  push: {
    adm: {
      title: D.secret,
      body: o_MessageTemplateBodyContentProvider,
      sound: D.secret,
      url: D.secret,
      imageUrl: D.secret,
      imageIconUrl: D.secret,
      smallImageIconUrl: D.secret,
      rawContent: o_MessageTemplateBodyContentProvider,
    },
    apns: {
      title: D.secret,
      body: o_MessageTemplateBodyContentProvider,
      sound: D.secret,
      url: D.secret,
      mediaUrl: D.secret,
      rawContent: o_MessageTemplateBodyContentProvider,
    },
    fcm: {
      title: D.secret,
      body: o_MessageTemplateBodyContentProvider,
      sound: D.secret,
      url: D.secret,
      imageUrl: D.secret,
      imageIconUrl: D.secret,
      smallImageIconUrl: D.secret,
      rawContent: o_MessageTemplateBodyContentProvider,
    },
    baidu: {
      title: D.secret,
      body: o_MessageTemplateBodyContentProvider,
      sound: D.secret,
      url: D.secret,
      imageUrl: D.secret,
      imageIconUrl: D.secret,
      smallImageIconUrl: D.secret,
      rawContent: o_MessageTemplateBodyContentProvider,
    },
  },
});
const o_MessageTemplateData: D.LazyStruct = () => ({
  channel: D.secret,
  createdTime: D.ts,
  lastModifiedTime: D.ts,
  content: o_MessageTemplateContentProvider,
  sourceConfigurationSummary: o_MessageTemplateSourceConfigurationSummary,
  groupingConfiguration: o_GroupingConfiguration,
  defaultAttributes: o_MessageTemplateAttributes,
});
const o_MessageTemplateSourceConfigurationSummary: D.LazyStruct = () => ({
  whatsApp: { statusReason: D.secret },
});
const o_QuickResponseContents: D.LazyStruct = () => ({
  plainText: o_QuickResponseContentProvider,
  markdown: o_QuickResponseContentProvider,
});
const o_QuickResponseData: D.LazyStruct = () => ({
  createdTime: D.ts,
  lastModifiedTime: D.ts,
  contents: o_QuickResponseContents,
  groupingConfiguration: o_GroupingConfiguration,
  channels: D.list(D.secret),
});
const o_RuntimeSessionData: D.LazyStruct = () => ({
  key: D.secret,
  value: { stringValue: D.secret },
});
const o_SourceConfiguration: D.LazyStruct = () => ({
  managedSourceConfiguration: {
    webCrawlerConfiguration: {
      inclusionFilters: D.list(D.secret),
      exclusionFilters: D.list(D.secret),
    },
  },
});
const o_SpanMessage: D.LazyStruct = () => ({
  timestamp: D.ts,
  values: D.list(o_SpanMessageValue),
});
const o_SpanMessageValue: D.LazyStruct = () => ({
  text: { value: D.secret, citations: D.list({ title: D.secret }) },
  toolResult: { values: D.list(o_SpanMessageValue) },
  reasoning: { value: D.secret },
});
const i_AssociationConfiguration: D.LazyStruct = () => ({
  associationId: 0,
  associationType: 0,
  associationConfigurationData: {
    knowledgeBaseAssociationConfigurationData: {
      contentTagFilter: i_TagFilter,
      maxResults: 0,
      overrideKnowledgeBaseSearchType: 0,
    },
  },
});
const i_FilterAttribute: D.LazyStruct = () => ({ key: 0, value: 0 });
const i_MessageTemplateBodyContentProvider: D.LazyStruct = () => ({
  content: 0,
});
const i_SystemEndpointAttributes: D.LazyStruct = () => ({ address: 0 });
const i_TagCondition: D.LazyStruct = () => ({ key: 0, value: 0 });
const o_AIAgentConfiguration: D.LazyStruct = () => ({
  answerRecommendationAIAgentConfiguration: {
    suggestedMessages: D.list(D.secret),
  },
  orchestrationAIAgentConfiguration: {
    toolConfigurations: D.list({
      title: D.secret,
      description: D.secret,
      overrideInputValues: D.list({ value: { constant: { value: D.secret } } }),
    }),
  },
});
const o_DocumentText: D.LazyStruct = () => ({ text: D.secret });
const o_MessageTemplateAttributes: D.LazyStruct = () => ({
  systemAttributes: {
    name: D.secret,
    customerEndpoint: o_SystemEndpointAttributes,
    systemEndpoint: o_SystemEndpointAttributes,
  },
  agentAttributes: { firstName: D.secret, lastName: D.secret },
  customerProfileAttributes: {
    profileId: D.secret,
    profileARN: D.secret,
    firstName: D.secret,
    middleName: D.secret,
    lastName: D.secret,
    accountNumber: D.secret,
    emailAddress: D.secret,
    phoneNumber: D.secret,
    additionalInformation: D.secret,
    partyType: D.secret,
    businessName: D.secret,
    birthDate: D.secret,
    gender: D.secret,
    mobilePhoneNumber: D.secret,
    homePhoneNumber: D.secret,
    businessPhoneNumber: D.secret,
    businessEmailAddress: D.secret,
    address1: D.secret,
    address2: D.secret,
    address3: D.secret,
    address4: D.secret,
    city: D.secret,
    county: D.secret,
    country: D.secret,
    postalCode: D.secret,
    province: D.secret,
    state: D.secret,
    shippingAddress1: D.secret,
    shippingAddress2: D.secret,
    shippingAddress3: D.secret,
    shippingAddress4: D.secret,
    shippingCity: D.secret,
    shippingCounty: D.secret,
    shippingCountry: D.secret,
    shippingPostalCode: D.secret,
    shippingProvince: D.secret,
    shippingState: D.secret,
    mailingAddress1: D.secret,
    mailingAddress2: D.secret,
    mailingAddress3: D.secret,
    mailingAddress4: D.secret,
    mailingCity: D.secret,
    mailingCounty: D.secret,
    mailingCountry: D.secret,
    mailingPostalCode: D.secret,
    mailingProvince: D.secret,
    mailingState: D.secret,
    billingAddress1: D.secret,
    billingAddress2: D.secret,
    billingAddress3: D.secret,
    billingAddress4: D.secret,
    billingCity: D.secret,
    billingCounty: D.secret,
    billingCountry: D.secret,
    billingPostalCode: D.secret,
    billingProvince: D.secret,
    billingState: D.secret,
    custom: D.map(D.secret),
  },
  customAttributes: D.map(D.secret),
});
const o_MessageTemplateBodyContentProvider: D.LazyStruct = () => ({
  content: D.secret,
});
const o_QuickResponseContentProvider: D.LazyStruct = () => ({
  content: D.secret,
});
const o_TextData: D.LazyStruct = () => ({
  title: o_DocumentText,
  excerpt: o_DocumentText,
});
const o_SystemEndpointAttributes: D.LazyStruct = () => ({ address: D.secret });
