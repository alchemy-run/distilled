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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "QConnect", serviceShapeName: "WisdomService" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "wisdom" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-10-19");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
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
              `https://wisdom-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://wisdom-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://wisdom.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://wisdom.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://wisdom.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DependencyFailedException
  extends /*@__PURE__*/ S.TaggedError<DependencyFailedException>()(
    "DependencyFailedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(424),
  ) {}
export class PreconditionFailedException
  extends /*@__PURE__*/ S.TaggedError<PreconditionFailedException>()(
    "PreconditionFailedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(412),
  ) {}
export class RequestTimeoutException
  extends /*@__PURE__*/ S.TaggedError<RequestTimeoutException>()(
    "RequestTimeoutException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(408), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withTimeoutError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(400), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withBadRequestError, C.withRetryableError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class UnprocessableContentException
  extends /*@__PURE__*/ S.TaggedError<UnprocessableContentException>()(
    "UnprocessableContentException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(422),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
  | { tagCondition?: never; andConditions: TagCondition[]; orConditions?: never }
  | { tagCondition?: never; andConditions?: never; orConditions: OrCondition[] };
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
export type ToolOverrideInputValueConfiguration = { constant: ToolOverrideConstantInputValue };
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
export type AgentTarget =
  | { aiAgentId: string; applicationId?: never }
  | { aiAgentId?: never; applicationId: string };
export type MultiAgentExampleList = string[];
export interface MultiAgentInstruction {
  instruction?: string;
  examples?: string[];
}
export interface DelegateAgentConfiguration {
  agentTarget: AgentTarget;
  instruction?: MultiAgentInstruction;
}
export interface HandoffAgentConfiguration {
  agentTarget: AgentTarget;
  instruction?: MultiAgentInstruction;
  audioStreamingEnabled?: boolean;
  immediateHandoff?: boolean;
}
export type MultiAgentConfiguration =
  | { delegateAgentConfiguration: DelegateAgentConfiguration; handoffAgentConfiguration?: never }
  | { delegateAgentConfiguration?: never; handoffAgentConfiguration: HandoffAgentConfiguration };
export type MultiAgentConfigurationList = MultiAgentConfiguration[];
export type GenericArn = string;
export type JSONDocumentList = any[];
export interface OrchestrationAIAgentConfiguration {
  orchestrationAIPromptId?: string;
  orchestrationAIGuardrailId?: string;
  toolConfigurations?: ToolConfiguration[];
  multiAgentConfigurations?: MultiAgentConfiguration[];
  connectInstanceArn?: string;
  locale?: string;
  inputSchemas?: any[];
  outputSchemas?: any[];
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
export type GuardrailSensitiveInformationAction = string | redacted.Redacted<string>;
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
export type GuardrailContextualGroundingFilterType = string | redacted.Redacted<string>;
export type GuardrailContextualGroundingFilterThreshold = number;
export interface GuardrailContextualGroundingFilterConfig {
  type: string | redacted.Redacted<string>;
  threshold: number;
}
export type GuardrailContextualGroundingFiltersConfig = GuardrailContextualGroundingFilterConfig[];
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
  enabled?: boolean;
}
export type AIAgentConfigurationMap = { [key: string]: AIAgentConfigurationData | undefined };
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
  aiAgentConfiguration?: { [key: string]: AIAgentConfigurationData | undefined };
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
export type ManagedSourceConfiguration = { webCrawlerConfiguration: WebCrawlerConfiguration };
export type SourceConfiguration =
  | { appIntegrations: AppIntegrationsConfiguration; managedSourceConfiguration?: never }
  | { appIntegrations?: never; managedSourceConfiguration: ManagedSourceConfiguration };
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
export type HierarchicalChunkingLevelConfigurations = HierarchicalChunkingLevelConfiguration[];
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
export type MessageTemplateBodyContentProvider = { content: string | redacted.Redacted<string> };
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
  | { email: EmailMessageTemplateContent; sms?: never; whatsApp?: never; push?: never }
  | { email?: never; sms: SMSMessageTemplateContent; whatsApp?: never; push?: never }
  | { email?: never; sms?: never; whatsApp: WhatsAppMessageTemplateContent; push?: never }
  | { email?: never; sms?: never; whatsApp?: never; push: PushMessageTemplateContent };
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
export type CustomAttributes = { [key: string]: string | redacted.Redacted<string> | undefined };
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
  customAttributes?: { [key: string]: string | redacted.Redacted<string> | undefined };
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
export type QuickResponseDataProvider = { content: string | redacted.Redacted<string> };
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
export type QuickResponseContentProvider = { content: string | redacted.Redacted<string> };
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
  aiAgentConfiguration?: { [key: string]: AIAgentConfigurationData | undefined };
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
  aiAgentConfiguration?: { [key: string]: AIAgentConfigurationData | undefined };
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
  | { text: TextMessage; toolUseResult?: never; data?: never }
  | { text?: never; toolUseResult: ToolUseResultData; data?: never }
  | { text?: never; toolUseResult?: never; data: any };
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
export type RuntimeSessionDataValue = { stringValue: string | redacted.Redacted<string> };
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
export interface ProactiveRecommendationDataDetails {
  nextMessageToken: string;
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
      proactiveRecommendationData?: never;
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
      proactiveRecommendationData?: never;
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
      proactiveRecommendationData?: never;
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
      proactiveRecommendationData?: never;
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
      proactiveRecommendationData?: never;
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
      proactiveRecommendationData?: never;
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
      proactiveRecommendationData?: never;
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
      proactiveRecommendationData?: never;
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
      proactiveRecommendationData?: never;
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
      proactiveRecommendationData?: never;
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
      proactiveRecommendationData?: never;
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
      proactiveRecommendationData?: never;
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
      notesChunkData?: never;
      proactiveRecommendationData: ProactiveRecommendationDataDetails;
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
export type RecommendationTriggerData = { query: QueryRecommendationTriggerData };
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
  aiAgentConfiguration?: { [key: string]: AIAgentConfigurationData | undefined };
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
export type InteractionMode = string;
export type ReturnReason = string;
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
  | { text: SpanTextValue; toolUse?: never; toolResult?: never; reasoning?: never }
  | { text?: never; toolUse: SpanToolUseValue; toolResult?: never; reasoning?: never }
  | { text?: never; toolUse?: never; toolResult: SpanToolResultValue; reasoning?: never }
  | { text?: never; toolUse?: never; toolResult?: never; reasoning: SpanReasoningValue };
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
  interactionMode?: string;
  targetAgentId?: string;
  returnReason?: string;
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
export type NotifyRecommendationsReceivedErrorList = NotifyRecommendationsReceivedError_[];
export interface NotifyRecommendationsReceivedResponse {
  recommendationIds?: string[];
  errors?: NotifyRecommendationsReceivedError_[];
}
export type TargetType = string;
export type Relevance = string;
export interface GenerativeContentFeedbackData {
  relevance: string;
}
export type ContentFeedbackData = { generativeContentFeedbackData: GenerativeContentFeedbackData };
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
export type RetrieveErrorCode = string;
export interface RetrieveError_ {
  associationId: string;
  code: string;
  message: string;
}
export type RetrieveErrorList = RetrieveError_[];
export interface RetrieveResponse {
  results: RetrieveResult[];
  errors?: RetrieveError_[];
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
export type MessageTemplateSearchResultsList = MessageTemplateSearchResultData[];
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
export type SelfServiceConversationHistoryList = SelfServiceConversationHistory[];
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
  aiAgentConfiguration?: { [key: string]: AIAgentConfigurationData | undefined };
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
  input: __S(192, __c6, 0) as any as S.Schema<ActivateMessageTemplateRequest>,
  output: __S(224, __c7, 0) as any as S.Schema<ActivateMessageTemplateResponse>,
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
}));

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
  input: __S(256, __c8, 0) as any as S.Schema<CreateAIAgentRequest>,
  output: __S(480, __c15, 0) as any as S.Schema<CreateAIAgentResponse>,
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
}));

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
  input: __S(512, __c16, 0) as any as S.Schema<CreateAIAgentVersionRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<CreateAIAgentVersionResponse>,
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
}));

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
  input: __S(576, __c18, 0) as any as S.Schema<CreateAIGuardrailRequest>,
  output: __S(672, __c21, 0) as any as S.Schema<CreateAIGuardrailResponse>,
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
}));

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
  input: __S(704, __c22, 0) as any as S.Schema<CreateAIGuardrailVersionRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<CreateAIGuardrailVersionResponse>,
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
}));

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
  input: __S(768, __c24, 0) as any as S.Schema<CreateAIPromptRequest>,
  output: __S(832, __c26, 0) as any as S.Schema<CreateAIPromptResponse>,
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
}));

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
  input: __S(864, __c27, 0) as any as S.Schema<CreateAIPromptVersionRequest>,
  output: __S(896, __c28, 0) as any as S.Schema<CreateAIPromptVersionResponse>,
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
}));

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
  input: __S(928, __c29, 0) as any as S.Schema<CreateAssistantRequest>,
  output: __S(1056, __c33, 0) as any as S.Schema<CreateAssistantResponse>,
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
}));

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
  input: __S(1089, __c34, 1) as any as S.Schema<CreateAssistantAssociationRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<CreateAssistantAssociationResponse>,
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
}));

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
  input: __S(1184, __c37, 0) as any as S.Schema<CreateContentRequest>,
  output: __S(1217, __c38, 1) as any as S.Schema<CreateContentResponse>,
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
}));

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
 * For more information, see Integrate Amazon Q in Connect with step-by-step guides in the *Connect Customer Administrator Guide*.
 */
export const createContentAssociation: API.OperationMethod<
  CreateContentAssociationRequest,
  CreateContentAssociationResponse,
  CreateContentAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c39, 0) as any as S.Schema<CreateContentAssociationRequest>,
  output: __S(1280, __c40, 0) as any as S.Schema<CreateContentAssociationResponse>,
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
}));

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
  input: __S(1344, __c42, 0) as any as S.Schema<CreateKnowledgeBaseRequest>,
  output: __S(1377, __c43, 1) as any as S.Schema<CreateKnowledgeBaseResponse>,
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
}));

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
  input: __S(1440, __c45, 0) as any as S.Schema<CreateMessageTemplateRequest>,
  output: __S(1473, __c46, 1) as any as S.Schema<CreateMessageTemplateResponse>,
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
}));

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
  input: __S(1664, __c52, 0) as any as S.Schema<CreateMessageTemplateAttachmentRequest>,
  output: __S(1665, __c52, 1) as any as S.Schema<CreateMessageTemplateAttachmentResponse>,
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
}));

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
  input: __S(1728, __c54, 0) as any as S.Schema<CreateMessageTemplateVersionRequest>,
  output: __S(1761, __c55, 1) as any as S.Schema<CreateMessageTemplateVersionResponse>,
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
}));

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
  input: __S(1824, __c57, 0) as any as S.Schema<CreateQuickResponseRequest>,
  output: __S(1857, __c58, 1) as any as S.Schema<CreateQuickResponseResponse>,
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
}));

export type CreateSessionError =
  | AccessDeniedException
  | ConflictException
  | DependencyFailedException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a session. A session is a contextual container used for generating recommendations. Connect Customer creates a new Amazon Q in Connect session for each contact on which Amazon Q in Connect is enabled.
 */
export const createSession: API.OperationMethod<
  CreateSessionRequest,
  CreateSessionResponse,
  CreateSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1920, __c60, 0) as any as S.Schema<CreateSessionRequest>,
  output: __S(1953, __c61, 1) as any as S.Schema<CreateSessionResponse>,
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
}));

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
  input: __S(1984, __c62, 0) as any as S.Schema<DeactivateMessageTemplateRequest>,
  output: __S(224, __c7, 0) as any as S.Schema<DeactivateMessageTemplateResponse>,
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
}));

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
  input: __S(2016, __c63, 0) as any as S.Schema<DeleteAIAgentRequest>,
  output: __S(2048, __c64, 0) as any as S.Schema<DeleteAIAgentResponse>,
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
}));

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
  input: __S(2080, __c65, 0) as any as S.Schema<DeleteAIAgentVersionRequest>,
  output: __S(2048, __c64, 0) as any as S.Schema<DeleteAIAgentVersionResponse>,
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
}));

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
  input: __S(2112, __c66, 0) as any as S.Schema<DeleteAIGuardrailRequest>,
  output: __S(2048, __c64, 0) as any as S.Schema<DeleteAIGuardrailResponse>,
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
}));

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
  input: __S(2144, __c67, 0) as any as S.Schema<DeleteAIGuardrailVersionRequest>,
  output: __S(2048, __c64, 0) as any as S.Schema<DeleteAIGuardrailVersionResponse>,
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
}));

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
  input: __S(2176, __c68, 0) as any as S.Schema<DeleteAIPromptRequest>,
  output: __S(2048, __c64, 0) as any as S.Schema<DeleteAIPromptResponse>,
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
}));

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
  input: __S(2208, __c69, 0) as any as S.Schema<DeleteAIPromptVersionRequest>,
  output: __S(2048, __c64, 0) as any as S.Schema<DeleteAIPromptVersionResponse>,
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
}));

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
  input: __S(2240, __c70, 0) as any as S.Schema<DeleteAssistantRequest>,
  output: __S(2048, __c64, 0) as any as S.Schema<DeleteAssistantResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssistant",
}));

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
  input: __S(2272, __c71, 0) as any as S.Schema<DeleteAssistantAssociationRequest>,
  output: __S(2048, __c64, 0) as any as S.Schema<DeleteAssistantAssociationResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssistantAssociation",
}));

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
  input: __S(2304, __c72, 0) as any as S.Schema<DeleteContentRequest>,
  output: __S(2048, __c64, 0) as any as S.Schema<DeleteContentResponse>,
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
}));

export type DeleteContentAssociationError =
  | AccessDeniedException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the content association.
 *
 * For more information about content associations--what they are and when they are used--see Integrate Amazon Q in Connect with step-by-step guides in the *Connect Customer Administrator Guide*.
 */
export const deleteContentAssociation: API.OperationMethod<
  DeleteContentAssociationRequest,
  DeleteContentAssociationResponse,
  DeleteContentAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2336, __c73, 0) as any as S.Schema<DeleteContentAssociationRequest>,
  output: __S(2048, __c64, 0) as any as S.Schema<DeleteContentAssociationResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContentAssociation",
}));

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
  input: __S(2368, __c74, 0) as any as S.Schema<DeleteImportJobRequest>,
  output: __S(2048, __c64, 0) as any as S.Schema<DeleteImportJobResponse>,
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
}));

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
  input: __S(2400, __c75, 0) as any as S.Schema<DeleteKnowledgeBaseRequest>,
  output: __S(2048, __c64, 0) as any as S.Schema<DeleteKnowledgeBaseResponse>,
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
}));

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
  input: __S(2432, __c76, 0) as any as S.Schema<DeleteMessageTemplateRequest>,
  output: __S(2048, __c64, 0) as any as S.Schema<DeleteMessageTemplateResponse>,
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
}));

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
  input: __S(2464, __c77, 0) as any as S.Schema<DeleteMessageTemplateAttachmentRequest>,
  output: __S(2048, __c64, 0) as any as S.Schema<DeleteMessageTemplateAttachmentResponse>,
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
}));

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
  input: __S(2496, __c78, 0) as any as S.Schema<DeleteQuickResponseRequest>,
  output: __S(2048, __c64, 0) as any as S.Schema<DeleteQuickResponseResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQuickResponse",
}));

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
  input: __S(2528, __c79, 0) as any as S.Schema<GetAIAgentRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<GetAIAgentResponse>,
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
}));

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
  input: __S(2560, __c80, 0) as any as S.Schema<GetAIGuardrailRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<GetAIGuardrailResponse>,
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
}));

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
  input: __S(2592, __c81, 0) as any as S.Schema<GetAIPromptRequest>,
  output: __S(896, __c28, 0) as any as S.Schema<GetAIPromptResponse>,
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
}));

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
  input: __S(2624, __c82, 0) as any as S.Schema<GetAssistantRequest>,
  output: __S(1056, __c33, 0) as any as S.Schema<GetAssistantResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssistant",
}));

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
  input: __S(2656, __c83, 0) as any as S.Schema<GetAssistantAssociationRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<GetAssistantAssociationResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssistantAssociation",
}));

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
  input: __S(2688, __c84, 0) as any as S.Schema<GetContentRequest>,
  output: __S(1217, __c38, 1) as any as S.Schema<GetContentResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContent",
}));

export type GetContentAssociationError =
  | AccessDeniedException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Returns the content association.
 *
 * For more information about content associations--what they are and when they are used--see Integrate Amazon Q in Connect with step-by-step guides in the *Connect Customer Administrator Guide*.
 */
export const getContentAssociation: API.OperationMethod<
  GetContentAssociationRequest,
  GetContentAssociationResponse,
  GetContentAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2720, __c85, 0) as any as S.Schema<GetContentAssociationRequest>,
  output: __S(1280, __c40, 0) as any as S.Schema<GetContentAssociationResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContentAssociation",
}));

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
  input: __S(2752, __c86, 0) as any as S.Schema<GetContentSummaryRequest>,
  output: __S(2753, __c86, 1) as any as S.Schema<GetContentSummaryResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContentSummary",
}));

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
  input: __S(2816, __c88, 0) as any as S.Schema<GetImportJobRequest>,
  output: __S(2881, __c90, 1) as any as S.Schema<GetImportJobResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImportJob",
}));

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
  input: __S(2912, __c91, 0) as any as S.Schema<GetKnowledgeBaseRequest>,
  output: __S(1377, __c43, 1) as any as S.Schema<GetKnowledgeBaseResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKnowledgeBase",
}));

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
  input: __S(2944, __c92, 0) as any as S.Schema<GetMessageTemplateRequest>,
  output: __S(1761, __c55, 1) as any as S.Schema<GetMessageTemplateResponse>,
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
}));

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
  input: __S(2976, __c93, 0) as any as S.Schema<GetNextMessageRequest>,
  output: __S(2978, __c93, 2) as any as S.Schema<GetNextMessageResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnprocessableContentException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNextMessage",
}));

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
  input: __S(3168, __c99, 0) as any as S.Schema<GetQuickResponseRequest>,
  output: __S(1857, __c58, 1) as any as S.Schema<GetQuickResponseResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQuickResponse",
}));

export type GetRecommendationsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * This API will be discontinued starting June 1, 2024. To receive generative responses after March 1, 2024, you will need to create a new Assistant in the Connect Customer console and integrate the Amazon Q in Connect JavaScript library (amazon-q-connectjs) into your applications.
 *
 * Retrieves recommendations for the specified session. To avoid retrieving the same recommendations in subsequent calls, use NotifyRecommendationsReceived. This API supports long-polling behavior with the `waitTimeSeconds` parameter. Short poll is the default behavior and only returns recommendations already available. To perform a manual query against an assistant, use QueryAssistant.
 */
export const getRecommendations: API.OperationMethod<
  GetRecommendationsRequest,
  GetRecommendationsResponse,
  GetRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3200, __c100, 0) as any as S.Schema<GetRecommendationsRequest>,
  output: __S(3207, __c100, 7) as any as S.Schema<GetRecommendationsResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecommendations",
}));

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
  input: __S(3264, __c102, 0) as any as S.Schema<GetSessionRequest>,
  output: __S(1953, __c61, 1) as any as S.Schema<GetSessionResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSession",
}));

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
  input: __S(3296, __c103, 0) as any as S.Schema<ListAIAgentsRequest>,
  output: __S(3298, __c103, 2) as any as S.Schema<ListAIAgentsResponse>,
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
  input: __S(3360, __c105, 0) as any as S.Schema<ListAIAgentVersionsRequest>,
  output: __S(3363, __c105, 3) as any as S.Schema<ListAIAgentVersionsResponse>,
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
  input: __S(3392, __c106, 0) as any as S.Schema<ListAIGuardrailsRequest>,
  output: __S(3394, __c106, 2) as any as S.Schema<ListAIGuardrailsResponse>,
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
  input: __S(3456, __c108, 0) as any as S.Schema<ListAIGuardrailVersionsRequest>,
  output: __S(3459, __c108, 3) as any as S.Schema<ListAIGuardrailVersionsResponse>,
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
  input: __S(3488, __c109, 0) as any as S.Schema<ListAIPromptsRequest>,
  output: __S(3490, __c109, 2) as any as S.Schema<ListAIPromptsResponse>,
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
  input: __S(3552, __c111, 0) as any as S.Schema<ListAIPromptVersionsRequest>,
  output: __S(3555, __c111, 3) as any as S.Schema<ListAIPromptVersionsResponse>,
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
  input: __S(3584, __c112, 0) as any as S.Schema<ListAssistantAssociationsRequest>,
  output: __S(3586, __c112, 2) as any as S.Schema<ListAssistantAssociationsResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
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
  input: __S(3616, __c113, 0) as any as S.Schema<ListAssistantsRequest>,
  output: __S(3618, __c113, 2) as any as S.Schema<ListAssistantsResponse>,
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
 * For more information about content associations--what they are and when they are used--see Integrate Amazon Q in Connect with step-by-step guides in the *Connect Customer Administrator Guide*.
 */
export const listContentAssociations: API.PaginatedOperationMethod<
  ListContentAssociationsRequest,
  ListContentAssociationsResponse,
  ListContentAssociationsError,
  Credentials | HttpClient.HttpClient,
  ContentAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3648, __c114, 0) as any as S.Schema<ListContentAssociationsRequest>,
  output: __S(3650, __c114, 2) as any as S.Schema<ListContentAssociationsResponse>,
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
  input: __S(3680, __c115, 0) as any as S.Schema<ListContentsRequest>,
  output: __S(3713, __c116, 1) as any as S.Schema<ListContentsResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
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

export type ListImportJobsError = AccessDeniedException | ValidationException | CommonErrors;
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
  input: __S(3744, __c117, 0) as any as S.Schema<ListImportJobsRequest>,
  output: __S(3747, __c117, 3) as any as S.Schema<ListImportJobsResponse>,
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

export type ListKnowledgeBasesError = AccessDeniedException | ValidationException | CommonErrors;
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
  input: __S(3776, __c118, 0) as any as S.Schema<ListKnowledgeBasesRequest>,
  output: __S(3779, __c118, 3) as any as S.Schema<ListKnowledgeBasesResponse>,
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
  input: __S(3808, __c119, 0) as any as S.Schema<ListMessagesRequest>,
  output: __S(3810, __c119, 2) as any as S.Schema<ListMessagesResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
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
  input: __S(3840, __c120, 0) as any as S.Schema<ListMessageTemplatesRequest>,
  output: __S(3843, __c120, 3) as any as S.Schema<ListMessageTemplatesResponse>,
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
  input: __S(3872, __c121, 0) as any as S.Schema<ListMessageTemplateVersionsRequest>,
  output: __S(3875, __c121, 3) as any as S.Schema<ListMessageTemplateVersionsResponse>,
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
  input: __S(3904, __c122, 0) as any as S.Schema<ListModelsRequest>,
  output: __S(3907, __c122, 3) as any as S.Schema<ListModelsResponse>,
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
  input: __S(3936, __c123, 0) as any as S.Schema<ListQuickResponsesRequest>,
  output: __S(3939, __c123, 3) as any as S.Schema<ListQuickResponsesResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
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
  input: __S(3968, __c124, 0) as any as S.Schema<ListSpansRequest>,
  output: __S(3986, __c124, 18) as any as S.Schema<ListSpansResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
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
  input: __S(4000, __c125, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(4001, __c125, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(4032, __c126, 0) as any as S.Schema<NotifyRecommendationsReceivedRequest>,
  output: __S(4035, __c126, 3) as any as S.Schema<NotifyRecommendationsReceivedResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "NotifyRecommendationsReceived",
}));

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
  input: __S(4066, __c127, 2) as any as S.Schema<PutFeedbackRequest>,
  output: __S(4067, __c127, 3) as any as S.Schema<PutFeedbackResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFeedback",
}));

export type QueryAssistantError =
  | AccessDeniedException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * This API will be discontinued starting June 1, 2024. To receive generative responses after March 1, 2024, you will need to create a new Assistant in the Connect Customer console and integrate the Amazon Q in Connect JavaScript library (amazon-q-connectjs) into your applications.
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
  input: __S(4102, __c128, 6) as any as S.Schema<QueryAssistantRequest>,
  output: __S(4105, __c128, 9) as any as S.Schema<QueryAssistantResponse>,
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
  input: __S(4128, __c129, 0) as any as S.Schema<RemoveAssistantAIAgentRequest>,
  output: __S(2048, __c64, 0) as any as S.Schema<RemoveAssistantAIAgentResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveAssistantAIAgent",
}));

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
  input: __S(4160, __c130, 0) as any as S.Schema<RemoveKnowledgeBaseTemplateUriRequest>,
  output: __S(2048, __c64, 0) as any as S.Schema<RemoveKnowledgeBaseTemplateUriResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveKnowledgeBaseTemplateUri",
}));

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
  input: __S(4192, __c131, 0) as any as S.Schema<RenderMessageTemplateRequest>,
  output: __S(4193, __c131, 1) as any as S.Schema<RenderMessageTemplateResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RenderMessageTemplate",
}));

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
  input: __S(4229, __c132, 5) as any as S.Schema<RetrieveRequest>,
  output: __S(4234, __c132, 10) as any as S.Schema<RetrieveResponse>,
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
}));

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
  input: __S(4256, __c133, 0) as any as S.Schema<SearchContentRequest>,
  output: __S(3713, __c116, 1) as any as S.Schema<SearchContentResponse>,
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
  input: __S(4320, __c135, 0) as any as S.Schema<SearchMessageTemplatesRequest>,
  output: __S(4323, __c135, 3) as any as S.Schema<SearchMessageTemplatesResponse>,
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
  input: __S(4384, __c137, 0) as any as S.Schema<SearchQuickResponsesRequest>,
  output: __S(4387, __c137, 3) as any as S.Schema<SearchQuickResponsesResponse>,
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
  input: __S(4416, __c138, 0) as any as S.Schema<SearchSessionsRequest>,
  output: __S(4419, __c138, 3) as any as S.Schema<SearchSessionsResponse>,
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
  input: __S(4453, __c139, 5) as any as S.Schema<SendMessageRequest>,
  output: __S(4454, __c139, 6) as any as S.Schema<SendMessageResponse>,
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
}));

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
  input: __S(4480, __c140, 0) as any as S.Schema<StartContentUploadRequest>,
  output: __S(4481, __c140, 1) as any as S.Schema<StartContentUploadResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartContentUpload",
}));

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
  input: __S(4512, __c141, 0) as any as S.Schema<StartImportJobRequest>,
  output: __S(2881, __c90, 1) as any as S.Schema<StartImportJobResponse>,
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
}));

export type TagResourceError = ResourceNotFoundException | TooManyTagsException | CommonErrors;
/**
 * Adds the specified tags to the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4544, __c142, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(2048, __c64, 0) as any as S.Schema<TagResourceResponse>,
  errors: [ResourceNotFoundException, TooManyTagsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(4576, __c143, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(2048, __c64, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(4608, __c144, 0) as any as S.Schema<UpdateAIAgentRequest>,
  output: __S(480, __c15, 0) as any as S.Schema<UpdateAIAgentResponse>,
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
}));

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
  input: __S(4640, __c145, 0) as any as S.Schema<UpdateAIGuardrailRequest>,
  output: __S(672, __c21, 0) as any as S.Schema<UpdateAIGuardrailResponse>,
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
}));

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
  input: __S(4672, __c146, 0) as any as S.Schema<UpdateAIPromptRequest>,
  output: __S(832, __c26, 0) as any as S.Schema<UpdateAIPromptResponse>,
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
}));

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
  input: __S(4704, __c147, 0) as any as S.Schema<UpdateAssistantAIAgentRequest>,
  output: __S(1056, __c33, 0) as any as S.Schema<UpdateAssistantAIAgentResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAssistantAIAgent",
}));

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
  input: __S(4736, __c148, 0) as any as S.Schema<UpdateContentRequest>,
  output: __S(1217, __c38, 1) as any as S.Schema<UpdateContentResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<UpdateKnowledgeBaseTemplateUriRequest>,
  output: __S(1377, __c43, 1) as any as S.Schema<UpdateKnowledgeBaseTemplateUriResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateKnowledgeBaseTemplateUri",
}));

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
  input: __S(32, __c1, 0) as any as S.Schema<UpdateMessageTemplateRequest>,
  output: __S(1473, __c46, 1) as any as S.Schema<UpdateMessageTemplateResponse>,
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
}));

export type UpdateMessageTemplateMetadataError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the Amazon Q in Connect message template metadata. Note that any modification to the message template's name, description and grouping configuration will applied to the message template pointed by the `$LATEST` qualifier and all available versions. Partial update is supported. If any field is not supplied, it will remain unchanged for the message template.
 */
export const updateMessageTemplateMetadata: API.OperationMethod<
  UpdateMessageTemplateMetadataRequest,
  UpdateMessageTemplateMetadataResponse,
  UpdateMessageTemplateMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c2, 0) as any as S.Schema<UpdateMessageTemplateMetadataRequest>,
  output: __S(1473, __c46, 1) as any as S.Schema<UpdateMessageTemplateMetadataResponse>,
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
}));

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
  input: __S(96, __c3, 0) as any as S.Schema<UpdateQuickResponseRequest>,
  output: __S(1857, __c58, 1) as any as S.Schema<UpdateQuickResponseResponse>,
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
}));

export type UpdateSessionError =
  | AccessDeniedException
  | ResourceNotFoundException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates a session. A session is a contextual container used for generating recommendations. Connect Customer updates the existing Amazon Q in Connect session for each contact on which Amazon Q in Connect is enabled.
 */
export const updateSession: API.OperationMethod<
  UpdateSessionRequest,
  UpdateSessionResponse,
  UpdateSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c4, 0) as any as S.Schema<UpdateSessionRequest>,
  output: __S(1953, __c61, 1) as any as S.Schema<UpdateSessionResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSession",
}));

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
  input: __S(160, __c5, 0) as any as S.Schema<UpdateSessionDataRequest>,
  output: __S(161, __c5, 1) as any as S.Schema<UpdateSessionDataResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSessionData",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          templateUri: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/knowledgeBases/{knowledgeBaseId}/templateUri" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateKnowledgeBaseTemplateUriRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          messageTemplateId: S.String.pipe(T.HttpLabel("messageTemplateId")),
          content: S.optional(__S(1578, __c49, 10)),
          language: S.optional(S.String),
          sourceConfiguration: S.optional(__S(1633, __c51, 1)),
          defaultAttributes: S.optional(__S(1584, __c49, 16)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/knowledgeBases/{knowledgeBaseId}/messageTemplates/{messageTemplateId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateMessageTemplateRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          messageTemplateId: S.String.pipe(T.HttpLabel("messageTemplateId")),
          name: S.optional(S.String),
          description: S.optional(S.String),
          groupingConfiguration: S.optional(__S(1536, __c48, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/knowledgeBases/{knowledgeBaseId}/messageTemplates/{messageTemplateId}/metadata",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateMessageTemplateMetadataRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          quickResponseId: S.String.pipe(T.HttpLabel("quickResponseId")),
          name: S.optional(S.String),
          content: S.optional(__S(1504, __c47, 0)),
          contentType: S.optional(S.String),
          groupingConfiguration: S.optional(__S(1536, __c48, 0)),
          removeGroupingConfiguration: S.optional(S.Boolean),
          description: S.optional(S.String),
          removeDescription: S.optional(S.Boolean),
          shortcutKey: S.optional(S.String),
          removeShortcutKey: S.optional(S.Boolean),
          isActive: S.optional(S.Boolean),
          channels: S.optional(__S(320, __c10, 0)),
          language: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/knowledgeBases/{knowledgeBaseId}/quickResponses/{quickResponseId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateQuickResponseRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
          description: S.optional(S.String),
          tagFilter: S.optional(__S(388, __c12, 4)),
          aiAgentConfiguration: S.optional(__S(994, __c31, 2)),
          orchestratorConfigurationList: S.optional(__S(996, __c31, 4)),
          removeOrchestratorConfigurationList: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/assistants/{assistantId}/sessions/{sessionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSessionRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
          namespace: S.optional(S.String),
          data: __S(3010, __c94, 2),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/assistants/{assistantId}/sessions/{sessionId}/data" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSessionDataRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          sessionArn: S.String,
          sessionId: S.String,
          namespace: S.String,
          data: __S(3010, __c94, 2),
        }),
      ).annotate({ identifier: "UpdateSessionDataResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          messageTemplateId: S.String.pipe(T.HttpLabel("messageTemplateId")),
          versionNumber: S.Number,
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/knowledgeBases/{knowledgeBaseId}/messageTemplates/{messageTemplateId}/activate",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ActivateMessageTemplateRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          messageTemplateArn: S.String,
          messageTemplateId: S.String,
          versionNumber: S.Number,
        }),
      ).annotate({ identifier: "ActivateMessageTemplateResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          name: S.String,
          type: S.String,
          configuration: __S(447, __c13, 31),
          visibilityStatus: S.String,
          tags: S.optional(__S(288, __c9, 0)),
          description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/assistants/{assistantId}/aiagents" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAIAgentRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.optional(S.String) })).annotate({
        identifier: "TagCondition",
      });
    case 1:
      return S.Array(__S(384, __c12, 0));
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ andConditions: __S(385, __c12, 1) }),
        /*@__PURE__*/ S.Struct({ tagCondition: __S(384, __c12, 0) }),
      ]);
    case 3:
      return S.Array(__S(386, __c12, 2));
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ tagCondition: __S(384, __c12, 0) }),
        /*@__PURE__*/ S.Struct({ andConditions: __S(385, __c12, 1) }),
        /*@__PURE__*/ S.Struct({ orConditions: __S(387, __c12, 3) }),
      ]);
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          contentTagFilter: S.optional(__S(388, __c12, 4)),
          maxResults: S.optional(S.Number),
          overrideKnowledgeBaseSearchType: S.optional(S.String),
        }),
      ).annotate({ identifier: "KnowledgeBaseAssociationConfigurationData" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ knowledgeBaseAssociationConfigurationData: __S(416, __c13, 0) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          associationId: S.optional(S.String),
          associationType: S.optional(S.String),
          associationConfigurationData: S.optional(__S(417, __c13, 1)),
        }),
      ).annotate({ identifier: "AssociationConfiguration" });
    case 3:
      return S.Array(__S(418, __c13, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          answerGenerationAIPromptId: S.optional(S.String),
          answerGenerationAIGuardrailId: S.optional(S.String),
          associationConfigurations: S.optional(__S(419, __c13, 3)),
          locale: S.optional(S.String),
        }),
      ).annotate({ identifier: "ManualSearchAIAgentConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          intentLabelingGenerationAIPromptId: S.optional(S.String),
          queryReformulationAIPromptId: S.optional(S.String),
          answerGenerationAIPromptId: S.optional(S.String),
          answerGenerationAIGuardrailId: S.optional(S.String),
          associationConfigurations: S.optional(__S(419, __c13, 3)),
          locale: S.optional(S.String),
          suggestedMessages: S.optional(__S(320, __c10, 0)),
        }),
      ).annotate({ identifier: "AnswerRecommendationAIAgentConfiguration" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          selfServicePreProcessingAIPromptId: S.optional(S.String),
          selfServiceAnswerGenerationAIPromptId: S.optional(S.String),
          selfServiceAIGuardrailId: S.optional(S.String),
          associationConfigurations: S.optional(__S(419, __c13, 3)),
        }),
      ).annotate({ identifier: "SelfServiceAIAgentConfiguration" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          emailResponseAIPromptId: S.optional(S.String),
          emailQueryReformulationAIPromptId: S.optional(S.String),
          locale: S.optional(S.String),
          associationConfigurations: S.optional(__S(419, __c13, 3)),
        }),
      ).annotate({ identifier: "EmailResponseAIAgentConfiguration" });
    case 8:
      return S.suspend(() =>
        S.Struct({ emailOverviewAIPromptId: S.optional(S.String), locale: S.optional(S.String) }),
      ).annotate({ identifier: "EmailOverviewAIAgentConfiguration" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          emailGenerativeAnswerAIPromptId: S.optional(S.String),
          emailQueryReformulationAIPromptId: S.optional(S.String),
          locale: S.optional(S.String),
          associationConfigurations: S.optional(__S(419, __c13, 3)),
        }),
      ).annotate({ identifier: "EmailGenerativeAnswerAIAgentConfiguration" });
    case 10:
      return S.suspend(() =>
        S.Struct({ instruction: S.optional(S.String), examples: S.optional(__S(352, __c11, 0)) }),
      ).annotate({ identifier: "ToolInstruction" });
    case 11:
      return S.suspend(() => S.Struct({ type: S.String, value: SensitiveString })).annotate({
        identifier: "ToolOverrideConstantInputValue",
      });
    case 12:
      return S.Union([/*@__PURE__*/ S.Struct({ constant: __S(427, __c13, 11) })]);
    case 13:
      return S.suspend(() => S.Struct({ jsonPath: S.String, value: __S(428, __c13, 12) })).annotate(
        { identifier: "ToolOverrideInputValue" },
      );
    case 14:
      return S.Array(__S(429, __c13, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          outputVariableNameOverride: S.optional(S.String),
          sessionDataNamespace: S.optional(S.String),
        }),
      ).annotate({ identifier: "ToolOutputConfiguration" });
    case 16:
      return S.suspend(() =>
        S.Struct({ jsonPath: S.String, outputConfiguration: S.optional(__S(431, __c13, 15)) }),
      ).annotate({ identifier: "ToolOutputFilter" });
    case 17:
      return S.Array(__S(432, __c13, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({ title: S.optional(S.String), destructiveHint: S.optional(S.Boolean) }),
      ).annotate({ identifier: "Annotation" });
    case 19:
      return S.suspend(() =>
        S.Struct({ isUserConfirmationRequired: S.optional(S.Boolean) }),
      ).annotate({ identifier: "UserInteractionConfiguration" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          toolName: S.String,
          toolType: S.String,
          title: S.optional(SensitiveString),
          toolId: S.optional(S.String),
          description: S.optional(SensitiveString),
          instruction: S.optional(__S(426, __c13, 10)),
          overrideInputValues: S.optional(__S(430, __c13, 14)),
          outputFilters: S.optional(__S(433, __c13, 17)),
          inputSchema: S.optional(S.Any),
          outputSchema: S.optional(S.Any),
          annotations: S.optional(__S(434, __c13, 18)),
          userInteractionConfiguration: S.optional(__S(435, __c13, 19)),
        }),
      ).annotate({ identifier: "ToolConfiguration" });
    case 21:
      return S.Array(__S(436, __c13, 20));
    case 22:
      return S.Union([
        /*@__PURE__*/ S.Struct({ aiAgentId: S.String }),
        /*@__PURE__*/ S.Struct({ applicationId: S.String }),
      ]);
    case 23:
      return S.suspend(() =>
        S.Struct({
          agentTarget: __S(438, __c13, 22),
          instruction: S.optional(__S(426, __c13, 10)),
        }),
      ).annotate({ identifier: "DelegateAgentConfiguration" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          agentTarget: __S(438, __c13, 22),
          instruction: S.optional(__S(426, __c13, 10)),
          audioStreamingEnabled: S.optional(S.Boolean),
          immediateHandoff: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "HandoffAgentConfiguration" });
    case 25:
      return S.Union([
        /*@__PURE__*/ S.Struct({ delegateAgentConfiguration: __S(439, __c13, 23) }),
        /*@__PURE__*/ S.Struct({ handoffAgentConfiguration: __S(440, __c13, 24) }),
      ]);
    case 26:
      return S.Array(__S(441, __c13, 25));
    case 27:
      return S.Array(S.Any);
    case 28:
      return S.suspend(() =>
        S.Struct({
          orchestrationAIPromptId: S.optional(S.String),
          orchestrationAIGuardrailId: S.optional(S.String),
          toolConfigurations: S.optional(__S(437, __c13, 21)),
          multiAgentConfigurations: S.optional(__S(442, __c13, 26)),
          connectInstanceArn: S.optional(S.String),
          locale: S.optional(S.String),
          inputSchemas: S.optional(__S(443, __c13, 27)),
          outputSchemas: S.optional(__S(443, __c13, 27)),
        }),
      ).annotate({ identifier: "OrchestrationAIAgentConfiguration" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          noteTakingAIPromptId: S.optional(S.String),
          noteTakingAIGuardrailId: S.optional(S.String),
          locale: S.optional(S.String),
        }),
      ).annotate({ identifier: "NoteTakingAIAgentConfiguration" });
    case 30:
      return S.suspend(() =>
        S.Struct({
          caseSummarizationAIPromptId: S.optional(S.String),
          caseSummarizationAIGuardrailId: S.optional(S.String),
          locale: S.optional(S.String),
        }),
      ).annotate({ identifier: "CaseSummarizationAIAgentConfiguration" });
    case 31:
      return S.Union([
        /*@__PURE__*/ S.Struct({ manualSearchAIAgentConfiguration: __S(420, __c13, 4) }),
        /*@__PURE__*/ S.Struct({ answerRecommendationAIAgentConfiguration: __S(421, __c13, 5) }),
        /*@__PURE__*/ S.Struct({ selfServiceAIAgentConfiguration: __S(422, __c13, 6) }),
        /*@__PURE__*/ S.Struct({ emailResponseAIAgentConfiguration: __S(423, __c13, 7) }),
        /*@__PURE__*/ S.Struct({ emailOverviewAIAgentConfiguration: __S(424, __c13, 8) }),
        /*@__PURE__*/ S.Struct({ emailGenerativeAnswerAIAgentConfiguration: __S(425, __c13, 9) }),
        /*@__PURE__*/ S.Struct({ orchestrationAIAgentConfiguration: __S(444, __c13, 28) }),
        /*@__PURE__*/ S.Struct({ noteTakingAIAgentConfiguration: __S(445, __c13, 29) }),
        /*@__PURE__*/ S.Struct({ caseSummarizationAIAgentConfiguration: __S(446, __c13, 30) }),
      ]);
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String,
          assistantArn: S.String,
          aiAgentId: S.String,
          aiAgentArn: S.String,
          name: S.String,
          type: S.String,
          configuration: __S(447, __c13, 31),
          modifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          description: S.optional(S.String),
          visibilityStatus: S.String,
          tags: S.optional(__S(288, __c9, 0)),
          origin: S.optional(S.String),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "AIAgentData" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ aiAgent: S.optional(__S(448, __c14, 0)) })).annotate({
        identifier: "CreateAIAgentResponse",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          aiAgentId: S.String.pipe(T.HttpLabel("aiAgentId")),
          modifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/assistants/{assistantId}/aiagents/{aiAgentId}/versions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAIAgentVersionRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ aiAgent: S.optional(__S(448, __c14, 0)), versionNumber: S.optional(S.Number) }),
      ).annotate({ identifier: "CreateAIAgentVersionResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          name: S.String,
          blockedInputMessaging: SensitiveString,
          blockedOutputsMessaging: SensitiveString,
          visibilityStatus: S.String,
          description: S.optional(SensitiveString),
          topicPolicyConfig: S.optional(__S(642, __c20, 2)),
          contentPolicyConfig: S.optional(__S(645, __c20, 5)),
          wordPolicyConfig: S.optional(__S(649, __c20, 9)),
          sensitiveInformationPolicyConfig: S.optional(__S(654, __c20, 14)),
          contextualGroundingPolicyConfig: S.optional(__S(657, __c20, 17)),
          tags: S.optional(__S(288, __c9, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/assistants/{assistantId}/aiguardrails" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAIGuardrailRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ text: SensitiveString })).annotate({
        identifier: "GuardrailWordConfig",
      });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: SensitiveString,
          definition: SensitiveString,
          examples: S.optional(__S(320, __c10, 0)),
          type: SensitiveString,
        }),
      ).annotate({ identifier: "GuardrailTopicConfig" });
    case 1:
      return S.Array(__S(640, __c20, 0));
    case 2:
      return S.suspend(() => S.Struct({ topicsConfig: __S(641, __c20, 1) })).annotate({
        identifier: "AIGuardrailTopicPolicyConfig",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          type: SensitiveString,
          inputStrength: SensitiveString,
          outputStrength: SensitiveString,
        }),
      ).annotate({ identifier: "GuardrailContentFilterConfig" });
    case 4:
      return S.Array(__S(643, __c20, 3));
    case 5:
      return S.suspend(() => S.Struct({ filtersConfig: __S(644, __c20, 4) })).annotate({
        identifier: "AIGuardrailContentPolicyConfig",
      });
    case 6:
      return S.Array(__S(608, __c19, 0));
    case 7:
      return S.suspend(() => S.Struct({ type: SensitiveString })).annotate({
        identifier: "GuardrailManagedWordsConfig",
      });
    case 8:
      return S.Array(__S(647, __c20, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          wordsConfig: S.optional(__S(646, __c20, 6)),
          managedWordListsConfig: S.optional(__S(648, __c20, 8)),
        }),
      ).annotate({ identifier: "AIGuardrailWordPolicyConfig" });
    case 10:
      return S.suspend(() => S.Struct({ type: SensitiveString, action: SensitiveString })).annotate(
        { identifier: "GuardrailPiiEntityConfig" },
      );
    case 11:
      return S.Array(__S(650, __c20, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          name: SensitiveString,
          description: S.optional(SensitiveString),
          pattern: SensitiveString,
          action: SensitiveString,
        }),
      ).annotate({ identifier: "GuardrailRegexConfig" });
    case 13:
      return S.Array(__S(652, __c20, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          piiEntitiesConfig: S.optional(__S(651, __c20, 11)),
          regexesConfig: S.optional(__S(653, __c20, 13)),
        }),
      ).annotate({ identifier: "AIGuardrailSensitiveInformationPolicyConfig" });
    case 15:
      return S.suspend(() => S.Struct({ type: SensitiveString, threshold: S.Number })).annotate({
        identifier: "GuardrailContextualGroundingFilterConfig",
      });
    case 16:
      return S.Array(__S(655, __c20, 15));
    case 17:
      return S.suspend(() => S.Struct({ filtersConfig: __S(656, __c20, 16) })).annotate({
        identifier: "AIGuardrailContextualGroundingPolicyConfig",
      });
    case 18:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String,
          assistantArn: S.String,
          aiGuardrailArn: S.String,
          aiGuardrailId: S.String,
          name: S.String,
          visibilityStatus: S.String,
          blockedInputMessaging: SensitiveString,
          blockedOutputsMessaging: SensitiveString,
          description: S.optional(SensitiveString),
          topicPolicyConfig: S.optional(__S(642, __c20, 2)),
          contentPolicyConfig: S.optional(__S(645, __c20, 5)),
          wordPolicyConfig: S.optional(__S(649, __c20, 9)),
          sensitiveInformationPolicyConfig: S.optional(__S(654, __c20, 14)),
          contextualGroundingPolicyConfig: S.optional(__S(657, __c20, 17)),
          tags: S.optional(__S(288, __c9, 0)),
          status: S.optional(S.String),
          modifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "AIGuardrailData" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ aiGuardrail: S.optional(__S(658, __c20, 18)) })).annotate({
        identifier: "CreateAIGuardrailResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          aiGuardrailId: S.String.pipe(T.HttpLabel("aiGuardrailId")),
          modifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/assistants/{assistantId}/aiguardrails/{aiGuardrailId}/versions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAIGuardrailVersionRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          aiGuardrail: S.optional(__S(658, __c20, 18)),
          versionNumber: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CreateAIGuardrailVersionResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          name: S.String,
          type: S.String,
          templateConfiguration: __S(800, __c25, 0),
          visibilityStatus: S.String,
          templateType: S.String,
          modelId: S.String,
          apiFormat: S.String,
          tags: S.optional(__S(288, __c9, 0)),
          description: S.optional(S.String),
          inferenceConfiguration: S.optional(__S(801, __c25, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/assistants/{assistantId}/aiprompts" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAIPromptRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ textFullAIPromptEditTemplateConfiguration: __S(608, __c19, 0) }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          temperature: S.optional(S.Number),
          topP: S.optional(S.Number),
          topK: S.optional(S.Number),
          maxTokensToSample: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AIPromptInferenceConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String,
          assistantArn: S.String,
          aiPromptId: S.String,
          aiPromptArn: S.String,
          name: S.String,
          type: S.String,
          templateType: S.String,
          modelId: S.String,
          apiFormat: S.String,
          templateConfiguration: __S(800, __c25, 0),
          inferenceConfiguration: S.optional(__S(801, __c25, 1)),
          modifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          description: S.optional(S.String),
          visibilityStatus: S.String,
          tags: S.optional(__S(288, __c9, 0)),
          origin: S.optional(S.String),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "AIPromptData" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ aiPrompt: S.optional(__S(802, __c25, 2)) })).annotate({
        identifier: "CreateAIPromptResponse",
      });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          aiPromptId: S.String.pipe(T.HttpLabel("aiPromptId")),
          modifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/assistants/{assistantId}/aiprompts/{aiPromptId}/versions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAIPromptVersionRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ aiPrompt: S.optional(__S(802, __c25, 2)), versionNumber: S.optional(S.Number) }),
      ).annotate({ identifier: "CreateAIPromptVersionResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          name: S.String,
          type: S.String,
          description: S.optional(S.String),
          tags: S.optional(__S(288, __c9, 0)),
          serverSideEncryptionConfiguration: S.optional(__S(960, __c30, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/assistants" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateAssistantRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ kmsKeyId: S.optional(S.String) })).annotate({
        identifier: "ServerSideEncryptionConfiguration",
      });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ topicIntegrationArn: S.optional(S.String) })).annotate({
        identifier: "AssistantIntegrationConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ aiAgentId: S.String, enabled: S.optional(S.Boolean) }),
      ).annotate({ identifier: "AIAgentConfigurationData" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(993, __c31, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({ aiAgentId: S.optional(S.String), orchestratorUseCase: S.String }),
      ).annotate({ identifier: "OrchestratorConfigurationEntry" });
    case 4:
      return S.Array(__S(995, __c31, 3));
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ type: S.optional(S.String) })).annotate({
        identifier: "AssistantCapabilityConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String,
          assistantArn: S.String,
          name: S.String,
          type: S.String,
          status: S.String,
          description: S.optional(S.String),
          tags: S.optional(__S(288, __c9, 0)),
          serverSideEncryptionConfiguration: S.optional(__S(960, __c30, 0)),
          integrationConfiguration: S.optional(__S(992, __c31, 0)),
          capabilityConfiguration: S.optional(__S(1024, __c32, 0)),
          aiAgentConfiguration: S.optional(__S(994, __c31, 2)),
          orchestratorConfigurationList: S.optional(__S(996, __c31, 4)),
        }),
      ).annotate({ identifier: "AssistantData" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ assistant: S.optional(__S(1025, __c32, 1)) })).annotate({
        identifier: "CreateAssistantResponse",
      });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ knowledgeBaseId: S.String }),
        /*@__PURE__*/ S.Struct({ externalBedrockKnowledgeBaseConfig: __S(1152, __c36, 0) }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          associationType: S.String,
          association: __S(1088, __c34, 0),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(288, __c9, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/assistants/{assistantId}/associations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAssistantAssociationRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ assistantAssociation: S.optional(__S(1155, __c36, 3)) }),
      ).annotate({ identifier: "CreateAssistantAssociationResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ bedrockKnowledgeBaseArn: S.String, accessRoleArn: S.String }),
      ).annotate({ identifier: "ExternalBedrockKnowledgeBaseConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({ knowledgeBaseId: S.optional(S.String), knowledgeBaseArn: S.optional(S.String) }),
      ).annotate({ identifier: "KnowledgeBaseAssociationData" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ knowledgeBaseAssociation: __S(1153, __c36, 1) }),
        /*@__PURE__*/ S.Struct({ externalBedrockKnowledgeBaseConfig: __S(1152, __c36, 0) }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          assistantAssociationId: S.String,
          assistantAssociationArn: S.String,
          assistantId: S.String,
          assistantArn: S.String,
          associationType: S.String,
          associationData: __S(1154, __c36, 2),
          tags: S.optional(__S(288, __c9, 0)),
        }),
      ).annotate({ identifier: "AssistantAssociationData" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          name: S.String,
          title: S.optional(S.String),
          overrideLinkOutUri: S.optional(S.String),
          metadata: S.optional(__S(288, __c9, 0)),
          uploadId: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(288, __c9, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/knowledgeBases/{knowledgeBaseId}/contents" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateContentRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          contentArn: S.String,
          contentId: S.String,
          knowledgeBaseArn: S.String,
          knowledgeBaseId: S.String,
          name: S.String,
          revisionId: S.String,
          title: S.String,
          contentType: S.String,
          status: S.String,
          metadata: __S(288, __c9, 0),
          tags: S.optional(__S(288, __c9, 0)),
          linkOutUri: S.optional(S.String),
          url: SensitiveString,
          urlExpiry: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "ContentData" });
    case 1:
      return S.suspend(() => S.Struct({ content: S.optional(__S(1216, __c38, 0)) })).annotate({
        identifier: "CreateContentResponse",
      });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          contentId: S.String.pipe(T.HttpLabel("contentId")),
          associationType: S.String,
          association: __S(1313, __c41, 1),
          tags: S.optional(__S(288, __c9, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/knowledgeBases/{knowledgeBaseId}/contents/{contentId}/associations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateContentAssociationRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ contentAssociation: S.optional(__S(1314, __c41, 2)) }),
      ).annotate({ identifier: "CreateContentAssociationResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ flowId: S.optional(S.String) })).annotate({
        identifier: "AmazonConnectGuideAssociationData",
      });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ amazonConnectGuideAssociation: __S(1312, __c41, 0) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String,
          knowledgeBaseArn: S.String,
          contentId: S.String,
          contentArn: S.String,
          contentAssociationId: S.String,
          contentAssociationArn: S.String,
          associationType: S.String,
          associationData: __S(1313, __c41, 1),
          tags: S.optional(__S(288, __c9, 0)),
        }),
      ).annotate({ identifier: "ContentAssociationData" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          name: S.String,
          knowledgeBaseType: S.String,
          sourceConfiguration: S.optional(__S(1415, __c44, 7)),
          renderingConfiguration: S.optional(__S(1416, __c44, 8)),
          vectorIngestionConfiguration: S.optional(__S(1426, __c44, 18)),
          serverSideEncryptionConfiguration: S.optional(__S(960, __c30, 0)),
          description: S.optional(S.String),
          tags: S.optional(__S(288, __c9, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/knowledgeBases" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateKnowledgeBaseRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String,
          knowledgeBaseArn: S.String,
          name: S.String,
          knowledgeBaseType: S.String,
          status: S.String,
          lastContentModificationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          vectorIngestionConfiguration: S.optional(__S(1426, __c44, 18)),
          sourceConfiguration: S.optional(__S(1415, __c44, 7)),
          renderingConfiguration: S.optional(__S(1416, __c44, 8)),
          serverSideEncryptionConfiguration: S.optional(__S(960, __c30, 0)),
          description: S.optional(S.String),
          tags: S.optional(__S(288, __c9, 0)),
          ingestionStatus: S.optional(S.String),
          ingestionFailureReasons: S.optional(__S(352, __c11, 0)),
        }),
      ).annotate({ identifier: "KnowledgeBaseData" });
    case 1:
      return S.suspend(() => S.Struct({ knowledgeBase: S.optional(__S(1376, __c43, 0)) })).annotate(
        { identifier: "CreateKnowledgeBaseResponse" },
      );
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ appIntegrationArn: S.String, objectFields: S.optional(__S(352, __c11, 0)) }),
      ).annotate({ identifier: "AppIntegrationsConfiguration" });
    case 1:
      return S.suspend(() => S.Struct({ url: S.optional(S.String) })).annotate({
        identifier: "SeedUrl",
      });
    case 2:
      return S.Array(__S(1409, __c44, 1));
    case 3:
      return S.suspend(() => S.Struct({ seedUrls: S.optional(__S(1410, __c44, 2)) })).annotate({
        identifier: "UrlConfiguration",
      });
    case 4:
      return S.suspend(() => S.Struct({ rateLimit: S.optional(S.Number) })).annotate({
        identifier: "WebCrawlerLimits",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          urlConfiguration: __S(1411, __c44, 3),
          crawlerLimits: S.optional(__S(1412, __c44, 4)),
          inclusionFilters: S.optional(__S(320, __c10, 0)),
          exclusionFilters: S.optional(__S(320, __c10, 0)),
          scope: S.optional(S.String),
        }),
      ).annotate({ identifier: "WebCrawlerConfiguration" });
    case 6:
      return S.Union([/*@__PURE__*/ S.Struct({ webCrawlerConfiguration: __S(1413, __c44, 5) })]);
    case 7:
      return S.Union([
        /*@__PURE__*/ S.Struct({ appIntegrations: __S(1408, __c44, 0) }),
        /*@__PURE__*/ S.Struct({ managedSourceConfiguration: __S(1414, __c44, 6) }),
      ]);
    case 8:
      return S.suspend(() => S.Struct({ templateUri: S.optional(S.String) })).annotate({
        identifier: "RenderingConfiguration",
      });
    case 9:
      return S.suspend(() =>
        S.Struct({ maxTokens: S.Number, overlapPercentage: S.Number }),
      ).annotate({ identifier: "FixedSizeChunkingConfiguration" });
    case 10:
      return S.suspend(() => S.Struct({ maxTokens: S.Number })).annotate({
        identifier: "HierarchicalChunkingLevelConfiguration",
      });
    case 11:
      return S.Array(__S(1418, __c44, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({ levelConfigurations: __S(1419, __c44, 11), overlapTokens: S.Number }),
      ).annotate({ identifier: "HierarchicalChunkingConfiguration" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          maxTokens: S.Number,
          bufferSize: S.Number,
          breakpointPercentileThreshold: S.Number,
        }),
      ).annotate({ identifier: "SemanticChunkingConfiguration" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          chunkingStrategy: S.String,
          fixedSizeChunkingConfiguration: S.optional(__S(1417, __c44, 9)),
          hierarchicalChunkingConfiguration: S.optional(__S(1420, __c44, 12)),
          semanticChunkingConfiguration: S.optional(__S(1421, __c44, 13)),
        }),
      ).annotate({ identifier: "ChunkingConfiguration" });
    case 15:
      return S.suspend(() => S.Struct({ parsingPromptText: S.String })).annotate({
        identifier: "ParsingPrompt",
      });
    case 16:
      return S.suspend(() =>
        S.Struct({ modelArn: S.String, parsingPrompt: S.optional(__S(1423, __c44, 15)) }),
      ).annotate({ identifier: "BedrockFoundationModelConfigurationForParsing" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          parsingStrategy: S.String,
          bedrockFoundationModelConfiguration: S.optional(__S(1424, __c44, 16)),
        }),
      ).annotate({ identifier: "ParsingConfiguration" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          chunkingConfiguration: S.optional(__S(1422, __c44, 14)),
          parsingConfiguration: S.optional(__S(1425, __c44, 17)),
        }),
      ).annotate({ identifier: "VectorIngestionConfiguration" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          name: S.optional(S.String),
          content: S.optional(__S(1578, __c49, 10)),
          description: S.optional(S.String),
          channelSubtype: S.String,
          language: S.optional(S.String),
          sourceConfiguration: S.optional(__S(1633, __c51, 1)),
          defaultAttributes: S.optional(__S(1584, __c49, 16)),
          groupingConfiguration: S.optional(__S(1536, __c48, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(288, __c9, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/knowledgeBases/{knowledgeBaseId}/messageTemplates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateMessageTemplateRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          messageTemplateArn: S.String,
          messageTemplateId: S.String,
          knowledgeBaseArn: S.String,
          knowledgeBaseId: S.String,
          name: S.String,
          channel: S.optional(SensitiveString),
          channelSubtype: S.String,
          createdTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastModifiedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastModifiedBy: S.String,
          content: S.optional(__S(1578, __c49, 10)),
          description: S.optional(S.String),
          language: S.optional(S.String),
          sourceConfigurationSummary: S.optional(__S(1601, __c50, 1)),
          groupingConfiguration: S.optional(__S(1536, __c48, 0)),
          defaultAttributes: S.optional(__S(1584, __c49, 16)),
          attributeTypes: S.optional(__S(352, __c11, 0)),
          messageTemplateContentSha256: S.String,
          tags: S.optional(__S(288, __c9, 0)),
        }),
      ).annotate({ identifier: "MessageTemplateData" });
    case 1:
      return S.suspend(() =>
        S.Struct({ messageTemplate: S.optional(__S(1472, __c46, 0)) }),
      ).annotate({ identifier: "CreateMessageTemplateResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ content: SensitiveString })]);
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ criteria: S.optional(SensitiveString), values: S.optional(__S(320, __c10, 0)) }),
      ).annotate({ identifier: "GroupingConfiguration" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          plainText: S.optional(__S(1504, __c47, 0)),
          html: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "EmailMessageTemplateContentBody" });
    case 1:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), value: S.optional(SensitiveString) }),
      ).annotate({ identifier: "EmailHeader" });
    case 2:
      return S.Array(__S(1569, __c49, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          subject: S.optional(SensitiveString),
          body: S.optional(__S(1568, __c49, 0)),
          headers: S.optional(__S(1570, __c49, 2)),
        }),
      ).annotate({ identifier: "EmailMessageTemplateContent" });
    case 4:
      return S.suspend(() => S.Struct({ plainText: S.optional(__S(1504, __c47, 0)) })).annotate({
        identifier: "SMSMessageTemplateContentBody",
      });
    case 5:
      return S.suspend(() => S.Struct({ body: S.optional(__S(1572, __c49, 4)) })).annotate({
        identifier: "SMSMessageTemplateContent",
      });
    case 6:
      return S.suspend(() => S.Struct({ data: S.optional(S.String) })).annotate({
        identifier: "WhatsAppMessageTemplateContent",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({
          title: S.optional(SensitiveString),
          body: S.optional(__S(1504, __c47, 0)),
          action: S.optional(S.String),
          sound: S.optional(SensitiveString),
          url: S.optional(SensitiveString),
          imageUrl: S.optional(SensitiveString),
          imageIconUrl: S.optional(SensitiveString),
          smallImageIconUrl: S.optional(SensitiveString),
          rawContent: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "PushADMMessageTemplateContent" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          title: S.optional(SensitiveString),
          body: S.optional(__S(1504, __c47, 0)),
          action: S.optional(S.String),
          sound: S.optional(SensitiveString),
          url: S.optional(SensitiveString),
          mediaUrl: S.optional(SensitiveString),
          rawContent: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "PushAPNSMessageTemplateContent" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          adm: S.optional(__S(1575, __c49, 7)),
          apns: S.optional(__S(1576, __c49, 8)),
          fcm: S.optional(__S(1575, __c49, 7)),
          baidu: S.optional(__S(1575, __c49, 7)),
        }),
      ).annotate({ identifier: "PushMessageTemplateContent" });
    case 10:
      return S.Union([
        /*@__PURE__*/ S.Struct({ email: __S(1571, __c49, 3) }),
        /*@__PURE__*/ S.Struct({ sms: __S(1573, __c49, 5) }),
        /*@__PURE__*/ S.Struct({ whatsApp: __S(1574, __c49, 6) }),
        /*@__PURE__*/ S.Struct({ push: __S(1577, __c49, 9) }),
      ]);
    case 11:
      return S.suspend(() => S.Struct({ address: S.optional(SensitiveString) })).annotate({
        identifier: "SystemEndpointAttributes",
      });
    case 12:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(SensitiveString),
          customerEndpoint: S.optional(__S(1579, __c49, 11)),
          systemEndpoint: S.optional(__S(1579, __c49, 11)),
        }),
      ).annotate({ identifier: "SystemAttributes" });
    case 13:
      return S.suspend(() =>
        S.Struct({ firstName: S.optional(SensitiveString), lastName: S.optional(SensitiveString) }),
      ).annotate({ identifier: "AgentAttributes" });
    case 14:
      return S.Record(S.String, /*@__PURE__*/ SensitiveString.pipe(S.optional));
    case 15:
      return S.suspend(() =>
        S.Struct({
          profileId: S.optional(SensitiveString),
          profileARN: S.optional(SensitiveString),
          firstName: S.optional(SensitiveString),
          middleName: S.optional(SensitiveString),
          lastName: S.optional(SensitiveString),
          accountNumber: S.optional(SensitiveString),
          emailAddress: S.optional(SensitiveString),
          phoneNumber: S.optional(SensitiveString),
          additionalInformation: S.optional(SensitiveString),
          partyType: S.optional(SensitiveString),
          businessName: S.optional(SensitiveString),
          birthDate: S.optional(SensitiveString),
          gender: S.optional(SensitiveString),
          mobilePhoneNumber: S.optional(SensitiveString),
          homePhoneNumber: S.optional(SensitiveString),
          businessPhoneNumber: S.optional(SensitiveString),
          businessEmailAddress: S.optional(SensitiveString),
          address1: S.optional(SensitiveString),
          address2: S.optional(SensitiveString),
          address3: S.optional(SensitiveString),
          address4: S.optional(SensitiveString),
          city: S.optional(SensitiveString),
          county: S.optional(SensitiveString),
          country: S.optional(SensitiveString),
          postalCode: S.optional(SensitiveString),
          province: S.optional(SensitiveString),
          state: S.optional(SensitiveString),
          shippingAddress1: S.optional(SensitiveString),
          shippingAddress2: S.optional(SensitiveString),
          shippingAddress3: S.optional(SensitiveString),
          shippingAddress4: S.optional(SensitiveString),
          shippingCity: S.optional(SensitiveString),
          shippingCounty: S.optional(SensitiveString),
          shippingCountry: S.optional(SensitiveString),
          shippingPostalCode: S.optional(SensitiveString),
          shippingProvince: S.optional(SensitiveString),
          shippingState: S.optional(SensitiveString),
          mailingAddress1: S.optional(SensitiveString),
          mailingAddress2: S.optional(SensitiveString),
          mailingAddress3: S.optional(SensitiveString),
          mailingAddress4: S.optional(SensitiveString),
          mailingCity: S.optional(SensitiveString),
          mailingCounty: S.optional(SensitiveString),
          mailingCountry: S.optional(SensitiveString),
          mailingPostalCode: S.optional(SensitiveString),
          mailingProvince: S.optional(SensitiveString),
          mailingState: S.optional(SensitiveString),
          billingAddress1: S.optional(SensitiveString),
          billingAddress2: S.optional(SensitiveString),
          billingAddress3: S.optional(SensitiveString),
          billingAddress4: S.optional(SensitiveString),
          billingCity: S.optional(SensitiveString),
          billingCounty: S.optional(SensitiveString),
          billingCountry: S.optional(SensitiveString),
          billingPostalCode: S.optional(SensitiveString),
          billingProvince: S.optional(SensitiveString),
          billingState: S.optional(SensitiveString),
          custom: S.optional(__S(1582, __c49, 14)),
        }),
      ).annotate({ identifier: "CustomerProfileAttributes" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          systemAttributes: S.optional(__S(1580, __c49, 12)),
          agentAttributes: S.optional(__S(1581, __c49, 13)),
          customerProfileAttributes: S.optional(__S(1583, __c49, 15)),
          customAttributes: S.optional(__S(1582, __c49, 14)),
        }),
      ).annotate({ identifier: "MessageTemplateAttributes" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          businessAccountId: S.String,
          templateId: S.String,
          name: S.optional(S.String),
          language: S.optional(S.String),
          components: S.optional(__S(352, __c11, 0)),
          status: S.optional(S.String),
          statusReason: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "WhatsAppMessageTemplateSourceConfigurationSummary" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ whatsApp: __S(1600, __c50, 0) })]);
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          businessAccountId: S.String,
          templateId: S.String,
          components: S.optional(__S(352, __c11, 0)),
        }),
      ).annotate({ identifier: "WhatsAppMessageTemplateSourceConfiguration" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ whatsApp: __S(1632, __c51, 0) })]);
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          messageTemplateId: S.String.pipe(T.HttpLabel("messageTemplateId")),
          contentDisposition: S.String,
          name: SensitiveString,
          body: SensitiveString,
          clientToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/knowledgeBases/{knowledgeBaseId}/messageTemplates/{messageTemplateId}/attachments",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateMessageTemplateAttachmentRequest" });
    case 1:
      return S.suspend(() => S.Struct({ attachment: S.optional(__S(1696, __c53, 0)) })).annotate({
        identifier: "CreateMessageTemplateAttachmentResponse",
      });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          contentDisposition: S.String,
          name: SensitiveString,
          uploadedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          url: SensitiveString,
          urlExpiry: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          attachmentId: S.String,
        }),
      ).annotate({ identifier: "MessageTemplateAttachment" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          messageTemplateId: S.String.pipe(T.HttpLabel("messageTemplateId")),
          messageTemplateContentSha256: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/knowledgeBases/{knowledgeBaseId}/messageTemplates/{messageTemplateId}/versions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateMessageTemplateVersionRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          messageTemplateArn: S.String,
          messageTemplateId: S.String,
          knowledgeBaseArn: S.String,
          knowledgeBaseId: S.String,
          name: S.String,
          channel: S.optional(SensitiveString),
          channelSubtype: S.String,
          createdTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastModifiedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastModifiedBy: S.String,
          content: S.optional(__S(1578, __c49, 10)),
          description: S.optional(S.String),
          language: S.optional(S.String),
          sourceConfigurationSummary: S.optional(__S(1601, __c50, 1)),
          groupingConfiguration: S.optional(__S(1536, __c48, 0)),
          defaultAttributes: S.optional(__S(1584, __c49, 16)),
          attributeTypes: S.optional(__S(352, __c11, 0)),
          attachments: S.optional(__S(1792, __c56, 0)),
          isActive: S.optional(S.Boolean),
          versionNumber: S.optional(S.Number),
          messageTemplateContentSha256: S.String,
          tags: S.optional(__S(288, __c9, 0)),
        }),
      ).annotate({ identifier: "ExtendedMessageTemplateData" });
    case 1:
      return S.suspend(() =>
        S.Struct({ messageTemplate: S.optional(__S(1760, __c55, 0)) }),
      ).annotate({ identifier: "CreateMessageTemplateVersionResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1696, __c53, 0));
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          name: S.String,
          content: __S(1504, __c47, 0),
          contentType: S.optional(S.String),
          groupingConfiguration: S.optional(__S(1536, __c48, 0)),
          description: S.optional(S.String),
          shortcutKey: S.optional(S.String),
          isActive: S.optional(S.Boolean),
          channels: S.optional(__S(320, __c10, 0)),
          language: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(288, __c9, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/knowledgeBases/{knowledgeBaseId}/quickResponses" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateQuickResponseRequest" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          quickResponseArn: S.String,
          quickResponseId: S.String,
          knowledgeBaseArn: S.String,
          knowledgeBaseId: S.String,
          name: S.String,
          contentType: S.String,
          status: S.String,
          createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          contents: S.optional(__S(1888, __c59, 0)),
          description: S.optional(S.String),
          groupingConfiguration: S.optional(__S(1536, __c48, 0)),
          shortcutKey: S.optional(S.String),
          lastModifiedBy: S.optional(S.String),
          isActive: S.optional(S.Boolean),
          channels: S.optional(__S(320, __c10, 0)),
          language: S.optional(S.String),
          tags: S.optional(__S(288, __c9, 0)),
        }),
      ).annotate({ identifier: "QuickResponseData" });
    case 1:
      return S.suspend(() => S.Struct({ quickResponse: S.optional(__S(1856, __c58, 0)) })).annotate(
        { identifier: "CreateQuickResponseResponse" },
      );
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          plainText: S.optional(__S(1504, __c47, 0)),
          markdown: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "QuickResponseContents" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          name: S.String,
          description: S.optional(S.String),
          tags: S.optional(__S(288, __c9, 0)),
          tagFilter: S.optional(__S(388, __c12, 4)),
          aiAgentConfiguration: S.optional(__S(994, __c31, 2)),
          contactArn: S.optional(S.String),
          orchestratorConfigurationList: S.optional(__S(996, __c31, 4)),
          removeOrchestratorConfigurationList: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/assistants/{assistantId}/sessions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSessionRequest" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sessionArn: S.String,
          sessionId: S.String,
          name: S.String,
          description: S.optional(S.String),
          tags: S.optional(__S(288, __c9, 0)),
          integrationConfiguration: S.optional(__S(992, __c31, 0)),
          tagFilter: S.optional(__S(388, __c12, 4)),
          aiAgentConfiguration: S.optional(__S(994, __c31, 2)),
          origin: S.optional(S.String),
          orchestratorConfigurationList: S.optional(__S(996, __c31, 4)),
        }),
      ).annotate({ identifier: "SessionData" });
    case 1:
      return S.suspend(() => S.Struct({ session: S.optional(__S(1952, __c61, 0)) })).annotate({
        identifier: "CreateSessionResponse",
      });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          messageTemplateId: S.String.pipe(T.HttpLabel("messageTemplateId")),
          versionNumber: S.Number,
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/knowledgeBases/{knowledgeBaseId}/messageTemplates/{messageTemplateId}/deactivate",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeactivateMessageTemplateRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          aiAgentId: S.String.pipe(T.HttpLabel("aiAgentId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/assistants/{assistantId}/aiagents/{aiAgentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAIAgentRequest" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteAIAgentResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          aiAgentId: S.String.pipe(T.HttpLabel("aiAgentId")),
          versionNumber: S.Number.pipe(T.HttpLabel("versionNumber")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/assistants/{assistantId}/aiagents/{aiAgentId}/versions/{versionNumber}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAIAgentVersionRequest" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          aiGuardrailId: S.String.pipe(T.HttpLabel("aiGuardrailId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/assistants/{assistantId}/aiguardrails/{aiGuardrailId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAIGuardrailRequest" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          aiGuardrailId: S.String.pipe(T.HttpLabel("aiGuardrailId")),
          versionNumber: S.Number.pipe(T.HttpLabel("versionNumber")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/assistants/{assistantId}/aiguardrails/{aiGuardrailId}/versions/{versionNumber}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAIGuardrailVersionRequest" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          aiPromptId: S.String.pipe(T.HttpLabel("aiPromptId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/assistants/{assistantId}/aiprompts/{aiPromptId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAIPromptRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          aiPromptId: S.String.pipe(T.HttpLabel("aiPromptId")),
          versionNumber: S.Number.pipe(T.HttpLabel("versionNumber")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/assistants/{assistantId}/aiprompts/{aiPromptId}/versions/{versionNumber}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAIPromptVersionRequest" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ assistantId: S.String.pipe(T.HttpLabel("assistantId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/assistants/{assistantId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAssistantRequest" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantAssociationId: S.String.pipe(T.HttpLabel("assistantAssociationId")),
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/assistants/{assistantId}/associations/{assistantAssociationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAssistantAssociationRequest" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          contentId: S.String.pipe(T.HttpLabel("contentId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/knowledgeBases/{knowledgeBaseId}/contents/{contentId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteContentRequest" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          contentId: S.String.pipe(T.HttpLabel("contentId")),
          contentAssociationId: S.String.pipe(T.HttpLabel("contentAssociationId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/knowledgeBases/{knowledgeBaseId}/contents/{contentId}/associations/{contentAssociationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteContentAssociationRequest" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          importJobId: S.String.pipe(T.HttpLabel("importJobId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/knowledgeBases/{knowledgeBaseId}/importJobs/{importJobId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteImportJobRequest" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/knowledgeBases/{knowledgeBaseId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteKnowledgeBaseRequest" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          messageTemplateId: S.String.pipe(T.HttpLabel("messageTemplateId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/knowledgeBases/{knowledgeBaseId}/messageTemplates/{messageTemplateId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMessageTemplateRequest" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          messageTemplateId: S.String.pipe(T.HttpLabel("messageTemplateId")),
          attachmentId: S.String.pipe(T.HttpLabel("attachmentId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/knowledgeBases/{knowledgeBaseId}/messageTemplates/{messageTemplateId}/attachments/{attachmentId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMessageTemplateAttachmentRequest" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          quickResponseId: S.String.pipe(T.HttpLabel("quickResponseId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/knowledgeBases/{knowledgeBaseId}/quickResponses/{quickResponseId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteQuickResponseRequest" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          aiAgentId: S.String.pipe(T.HttpLabel("aiAgentId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/assistants/{assistantId}/aiagents/{aiAgentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAIAgentRequest" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          aiGuardrailId: S.String.pipe(T.HttpLabel("aiGuardrailId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/assistants/{assistantId}/aiguardrails/{aiGuardrailId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAIGuardrailRequest" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          aiPromptId: S.String.pipe(T.HttpLabel("aiPromptId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/assistants/{assistantId}/aiprompts/{aiPromptId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAIPromptRequest" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ assistantId: S.String.pipe(T.HttpLabel("assistantId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/assistants/{assistantId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAssistantRequest" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantAssociationId: S.String.pipe(T.HttpLabel("assistantAssociationId")),
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/assistants/{assistantId}/associations/{assistantAssociationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAssistantAssociationRequest" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          contentId: S.String.pipe(T.HttpLabel("contentId")),
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/knowledgeBases/{knowledgeBaseId}/contents/{contentId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetContentRequest" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          contentId: S.String.pipe(T.HttpLabel("contentId")),
          contentAssociationId: S.String.pipe(T.HttpLabel("contentAssociationId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/knowledgeBases/{knowledgeBaseId}/contents/{contentId}/associations/{contentAssociationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetContentAssociationRequest" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          contentId: S.String.pipe(T.HttpLabel("contentId")),
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/knowledgeBases/{knowledgeBaseId}/contents/{contentId}/summary",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetContentSummaryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ contentSummary: S.optional(__S(2784, __c87, 0)) }),
      ).annotate({ identifier: "GetContentSummaryResponse" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          contentArn: S.String,
          contentId: S.String,
          knowledgeBaseArn: S.String,
          knowledgeBaseId: S.String,
          name: S.String,
          revisionId: S.String,
          title: S.String,
          contentType: S.String,
          status: S.String,
          metadata: __S(288, __c9, 0),
          tags: S.optional(__S(288, __c9, 0)),
        }),
      ).annotate({ identifier: "ContentSummary" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          importJobId: S.String.pipe(T.HttpLabel("importJobId")),
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/knowledgeBases/{knowledgeBaseId}/importJobs/{importJobId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetImportJobRequest" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ instanceId: S.optional(S.String) })).annotate({
        identifier: "ConnectConfiguration",
      });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ connectConfiguration: __S(2848, __c89, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({ source: S.String, configuration: __S(2849, __c89, 1) }),
      ).annotate({ identifier: "ExternalSourceConfiguration" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          importJobId: S.String,
          knowledgeBaseId: S.String,
          uploadId: S.String,
          knowledgeBaseArn: S.String,
          importJobType: S.String,
          status: S.String,
          url: SensitiveString,
          failedRecordReport: S.optional(SensitiveString),
          urlExpiry: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          metadata: S.optional(__S(288, __c9, 0)),
          externalSourceConfiguration: S.optional(__S(2850, __c89, 2)),
        }),
      ).annotate({ identifier: "ImportJobData" });
    case 1:
      return S.suspend(() => S.Struct({ importJob: S.optional(__S(2880, __c90, 0)) })).annotate({
        identifier: "GetImportJobResponse",
      });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/knowledgeBases/{knowledgeBaseId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetKnowledgeBaseRequest" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          messageTemplateId: S.String.pipe(T.HttpLabel("messageTemplateId")),
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/knowledgeBases/{knowledgeBaseId}/messageTemplates/{messageTemplateId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMessageTemplateRequest" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
          nextMessageToken: S.String.pipe(T.HttpQuery("nextMessageToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/assistants/{assistantId}/sessions/{sessionId}/messages/next",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetNextMessageRequest" });
    case 1:
      return S.suspend(() => S.Struct({ status: S.String, reason: S.optional(S.String) })).annotate(
        { identifier: "ConversationState" },
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          response: __S(3072, __c96, 0),
          requestMessageId: S.String,
          conversationState: __S(2977, __c93, 1),
          nextMessageToken: S.optional(S.String),
          conversationSessionData: S.optional(__S(3010, __c94, 2)),
          chunkedResponseTerminated: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GetNextMessageResponse" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ stringValue: SensitiveString })]);
    case 1:
      return S.suspend(() =>
        S.Struct({ key: SensitiveString, value: __S(3008, __c94, 0) }),
      ).annotate({ identifier: "RuntimeSessionData" });
    case 2:
      return S.Array(__S(3009, __c94, 1));
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          beginOffsetInclusive: S.optional(S.Number),
          endOffsetExclusive: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CitationSpan" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          value: __S(3140, __c98, 4),
          messageId: S.String,
          participant: S.String,
          timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "MessageOutput" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ blocked: S.Boolean })).annotate({
        identifier: "AIGuardrailAssessment",
      });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          contentId: S.optional(S.String),
          title: S.optional(SensitiveString),
          knowledgeBaseId: S.optional(S.String),
          citationSpan: __S(3040, __c95, 0),
          sourceURL: S.optional(SensitiveString),
          referenceType: S.String,
        }),
      ).annotate({ identifier: "Citation" });
    case 1:
      return S.Array(__S(3136, __c98, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          value: S.optional(SensitiveString),
          citations: S.optional(__S(3137, __c98, 1)),
          aiGuardrailAssessment: S.optional(__S(3104, __c97, 0)),
        }),
      ).annotate({ identifier: "TextMessage" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          toolUseId: S.String,
          toolName: S.String,
          toolResult: S.Any,
          inputSchema: S.optional(S.Any),
        }),
      ).annotate({ identifier: "ToolUseResultData" });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ text: __S(3138, __c98, 2) }),
        /*@__PURE__*/ S.Struct({ toolUseResult: __S(3139, __c98, 3) }),
        /*@__PURE__*/ S.Struct({ data: S.Any }),
      ]);
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          quickResponseId: S.String.pipe(T.HttpLabel("quickResponseId")),
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/knowledgeBases/{knowledgeBaseId}/quickResponses/{quickResponseId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetQuickResponseRequest" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          waitTimeSeconds: S.optional(S.Number).pipe(T.HttpQuery("waitTimeSeconds")),
          nextChunkToken: S.optional(S.String).pipe(T.HttpQuery("nextChunkToken")),
          recommendationType: S.optional(S.String).pipe(T.HttpQuery("recommendationType")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/assistants/{assistantId}/sessions/{sessionId}/recommendations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRecommendationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          recommendationId: S.String,
          document: S.optional(__S(3235, __c101, 3)),
          relevanceScore: S.optional(S.Number),
          relevanceLevel: S.optional(S.String),
          type: S.optional(S.String),
          data: S.optional(__S(3252, __c101, 20)),
        }),
      ).annotate({ identifier: "RecommendationData" });
    case 2:
      return S.Array(__S(3201, __c100, 1));
    case 3:
      return S.suspend(() => S.Struct({ text: S.optional(SensitiveString) })).annotate({
        identifier: "QueryRecommendationTriggerData",
      });
    case 4:
      return S.Union([/*@__PURE__*/ S.Struct({ query: __S(3203, __c100, 3) })]);
    case 5:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          type: S.String,
          source: S.String,
          data: __S(3204, __c100, 4),
          recommendationIds: __S(352, __c11, 0),
        }),
      ).annotate({ identifier: "RecommendationTrigger" });
    case 6:
      return S.Array(__S(3205, __c100, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          recommendations: __S(3202, __c100, 2),
          triggers: S.optional(__S(3206, __c100, 6)),
        }),
      ).annotate({ identifier: "GetRecommendationsResponse" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseArn: S.optional(S.String),
          knowledgeBaseId: S.optional(S.String),
          contentArn: S.optional(S.String),
          contentId: S.optional(S.String),
          sourceURL: S.optional(S.String),
          referenceType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ContentReference" });
    case 1:
      return S.Array(__S(3040, __c95, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          text: S.optional(SensitiveString),
          highlights: S.optional(__S(3233, __c101, 1)),
        }),
      ).annotate({ identifier: "DocumentText" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          contentReference: __S(3232, __c101, 0),
          title: S.optional(__S(3234, __c101, 2)),
          excerpt: S.optional(__S(3234, __c101, 2)),
        }),
      ).annotate({ identifier: "Document" });
    case 4:
      return S.suspend(() =>
        S.Struct({ modelId: S.optional(S.String), generationId: S.optional(S.String) }),
      ).annotate({ identifier: "GenerativeReference" });
    case 5:
      return S.suspend(() => S.Struct({ aiAgentId: S.String, aiAgentArn: S.String })).annotate({
        identifier: "SuggestedMessageReference",
      });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ contentReference: __S(3232, __c101, 0) }),
        /*@__PURE__*/ S.Struct({ generativeReference: __S(3236, __c101, 4) }),
        /*@__PURE__*/ S.Struct({ suggestedMessageReference: __S(3237, __c101, 5) }),
      ]);
    case 7:
      return S.suspend(() =>
        S.Struct({
          title: S.optional(__S(3234, __c101, 2)),
          excerpt: S.optional(__S(3234, __c101, 2)),
        }),
      ).annotate({ identifier: "TextData" });
    case 8:
      return S.suspend(() =>
        S.Struct({ relevanceScore: S.optional(S.Number), relevanceLevel: S.optional(S.String) }),
      ).annotate({ identifier: "RankingData" });
    case 9:
      return S.suspend(() =>
        S.Struct({ textData: __S(3239, __c101, 7), rankingData: __S(3240, __c101, 8) }),
      ).annotate({ identifier: "ContentDataDetails" });
    case 10:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<DataSummary> => __S(3252, __c101, 20)).annotate({
          identifier: "DataSummary",
        }),
      );
    case 11:
      return S.suspend(() =>
        S.Struct({
          completion: SensitiveString,
          references: S.suspend(() => __S(3242, __c101, 10)).annotate({
            identifier: "DataSummaryList",
          }),
          rankingData: __S(3240, __c101, 8),
        }),
      ).annotate({ identifier: "GenerativeDataDetails" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          intent: SensitiveString,
          intentId: S.String,
          relevanceLevel: S.optional(S.String),
        }),
      ).annotate({ identifier: "IntentDetectedDataDetails" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          type: S.String,
          textData: __S(3239, __c101, 7),
          rankingData: __S(3240, __c101, 8),
          citationSpan: S.optional(__S(3040, __c95, 0)),
        }),
      ).annotate({ identifier: "SourceContentDataDetails" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          completion: S.optional(SensitiveString),
          references: S.optional(
            S.suspend(() => __S(3242, __c101, 10)).annotate({ identifier: "DataSummaryList" }),
          ),
          nextChunkToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GenerativeChunkDataDetails" });
    case 15:
      return S.suspend(() =>
        S.Struct({ completion: S.optional(SensitiveString), nextChunkToken: S.optional(S.String) }),
      ).annotate({ identifier: "EmailResponseChunkDataDetails" });
    case 16:
      return S.suspend(() => S.Struct({ messageText: SensitiveString })).annotate({
        identifier: "SuggestedMessageDataDetails",
      });
    case 17:
      return S.suspend(() => S.Struct({ completion: S.optional(SensitiveString) })).annotate({
        identifier: "NotesDataDetails",
      });
    case 18:
      return S.suspend(() => S.Struct({ nextMessageToken: S.String })).annotate({
        identifier: "ProactiveRecommendationDataDetails",
      });
    case 19:
      return S.Union([
        /*@__PURE__*/ S.Struct({ contentData: __S(3241, __c101, 9) }),
        /*@__PURE__*/ S.Struct({
          generativeData: /*@__PURE__*/ S.suspend((): S.Schema<GenerativeDataDetails> =>
            __S(3243, __c101, 11),
          ).annotate({ identifier: "GenerativeDataDetails" }),
        }),
        /*@__PURE__*/ S.Struct({ intentDetectedData: __S(3244, __c101, 12) }),
        /*@__PURE__*/ S.Struct({ sourceContentData: __S(3245, __c101, 13) }),
        /*@__PURE__*/ S.Struct({
          generativeChunkData: /*@__PURE__*/ S.suspend((): S.Schema<GenerativeChunkDataDetails> =>
            __S(3246, __c101, 14),
          ).annotate({ identifier: "GenerativeChunkDataDetails" }),
        }),
        /*@__PURE__*/ S.Struct({ emailResponseChunkData: __S(3247, __c101, 15) }),
        /*@__PURE__*/ S.Struct({ emailOverviewChunkData: __S(3247, __c101, 15) }),
        /*@__PURE__*/ S.Struct({
          emailGenerativeAnswerChunkData: /*@__PURE__*/ S.suspend(
            (): S.Schema<EmailGenerativeAnswerChunkDataDetails> => __S(3246, __c101, 14),
          ).annotate({ identifier: "EmailGenerativeAnswerChunkDataDetails" }),
        }),
        /*@__PURE__*/ S.Struct({ caseSummarizationChunkData: __S(3247, __c101, 15) }),
        /*@__PURE__*/ S.Struct({ suggestedMessageData: __S(3248, __c101, 16) }),
        /*@__PURE__*/ S.Struct({ notesData: __S(3249, __c101, 17) }),
        /*@__PURE__*/ S.Struct({ notesChunkData: __S(3247, __c101, 15) }),
        /*@__PURE__*/ S.Struct({ proactiveRecommendationData: __S(3250, __c101, 18) }),
      ]);
    case 20:
      return S.suspend(() =>
        S.Struct({
          reference: __S(3238, __c101, 6),
          details: S.suspend(() => __S(3251, __c101, 19)).annotate({ identifier: "DataDetails" }),
        }),
      ).annotate({ identifier: "DataSummary" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/assistants/{assistantId}/sessions/{sessionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSessionRequest" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          origin: S.optional(S.String).pipe(T.HttpQuery("origin")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/assistants/{assistantId}/aiagents" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAIAgentsRequest" });
    case 1:
      return S.Array(__S(3328, __c104, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ aiAgentSummaries: __S(3297, __c103, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAIAgentsResponse" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          assistantId: S.String,
          assistantArn: S.String,
          aiAgentId: S.String,
          type: S.String,
          aiAgentArn: S.String,
          modifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          visibilityStatus: S.String,
          configuration: S.optional(__S(447, __c13, 31)),
          origin: S.optional(S.String),
          description: S.optional(S.String),
          status: S.optional(S.String),
          tags: S.optional(__S(288, __c9, 0)),
        }),
      ).annotate({ identifier: "AIAgentSummary" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          aiAgentId: S.String.pipe(T.HttpLabel("aiAgentId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          origin: S.optional(S.String).pipe(T.HttpQuery("origin")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/assistants/{assistantId}/aiagents/{aiAgentId}/versions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAIAgentVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          aiAgentSummary: S.optional(__S(3328, __c104, 0)),
          versionNumber: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AIAgentVersionSummary" });
    case 2:
      return S.Array(__S(3361, __c105, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          aiAgentVersionSummaries: __S(3362, __c105, 2),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAIAgentVersionsResponse" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/assistants/{assistantId}/aiguardrails" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAIGuardrailsRequest" });
    case 1:
      return S.Array(__S(3424, __c107, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ aiGuardrailSummaries: __S(3393, __c106, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAIGuardrailsResponse" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          assistantId: S.String,
          assistantArn: S.String,
          aiGuardrailId: S.String,
          aiGuardrailArn: S.String,
          modifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          visibilityStatus: S.String,
          description: S.optional(SensitiveString),
          status: S.optional(S.String),
          tags: S.optional(__S(288, __c9, 0)),
        }),
      ).annotate({ identifier: "AIGuardrailSummary" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          aiGuardrailId: S.String.pipe(T.HttpLabel("aiGuardrailId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/assistants/{assistantId}/aiguardrails/{aiGuardrailId}/versions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAIGuardrailVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          aiGuardrailSummary: S.optional(__S(3424, __c107, 0)),
          versionNumber: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AIGuardrailVersionSummary" });
    case 2:
      return S.Array(__S(3457, __c108, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          aiGuardrailVersionSummaries: __S(3458, __c108, 2),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAIGuardrailVersionsResponse" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          origin: S.optional(S.String).pipe(T.HttpQuery("origin")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/assistants/{assistantId}/aiprompts" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAIPromptsRequest" });
    case 1:
      return S.Array(__S(3520, __c110, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ aiPromptSummaries: __S(3489, __c109, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAIPromptsResponse" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          assistantId: S.String,
          assistantArn: S.String,
          aiPromptId: S.String,
          type: S.String,
          aiPromptArn: S.String,
          modifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          templateType: S.String,
          modelId: S.String,
          apiFormat: S.String,
          visibilityStatus: S.String,
          origin: S.optional(S.String),
          description: S.optional(S.String),
          status: S.optional(S.String),
          tags: S.optional(__S(288, __c9, 0)),
        }),
      ).annotate({ identifier: "AIPromptSummary" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          aiPromptId: S.String.pipe(T.HttpLabel("aiPromptId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          origin: S.optional(S.String).pipe(T.HttpQuery("origin")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/assistants/{assistantId}/aiprompts/{aiPromptId}/versions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAIPromptVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          aiPromptSummary: S.optional(__S(3520, __c110, 0)),
          versionNumber: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AIPromptVersionSummary" });
    case 2:
      return S.Array(__S(3553, __c111, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          aiPromptVersionSummaries: __S(3554, __c111, 2),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAIPromptVersionsResponse" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/assistants/{assistantId}/associations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAssistantAssociationsRequest" });
    case 1:
      return S.Array(__S(1155, __c36, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({
          assistantAssociationSummaries: __S(3585, __c112, 1),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAssistantAssociationsResponse" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/assistants" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAssistantsRequest" });
    case 1:
      return S.Array(__S(1025, __c32, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ assistantSummaries: __S(3617, __c113, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAssistantsResponse" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          contentId: S.String.pipe(T.HttpLabel("contentId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/knowledgeBases/{knowledgeBaseId}/contents/{contentId}/associations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListContentAssociationsRequest" });
    case 1:
      return S.Array(__S(1314, __c41, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          contentAssociationSummaries: __S(3649, __c114, 1),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListContentAssociationsResponse" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/knowledgeBases/{knowledgeBaseId}/contents" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListContentsRequest" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(2784, __c87, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({ contentSummaries: __S(3712, __c116, 0), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListContentsResponse" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/knowledgeBases/{knowledgeBaseId}/importJobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListImportJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          importJobId: S.String,
          knowledgeBaseId: S.String,
          uploadId: S.String,
          knowledgeBaseArn: S.String,
          importJobType: S.String,
          status: S.String,
          createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          metadata: S.optional(__S(288, __c9, 0)),
          externalSourceConfiguration: S.optional(__S(2850, __c89, 2)),
        }),
      ).annotate({ identifier: "ImportJobSummary" });
    case 2:
      return S.Array(__S(3745, __c117, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ importJobSummaries: __S(3746, __c117, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListImportJobsResponse" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/knowledgeBases" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListKnowledgeBasesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String,
          knowledgeBaseArn: S.String,
          name: S.String,
          knowledgeBaseType: S.String,
          status: S.String,
          sourceConfiguration: S.optional(__S(1415, __c44, 7)),
          vectorIngestionConfiguration: S.optional(__S(1426, __c44, 18)),
          renderingConfiguration: S.optional(__S(1416, __c44, 8)),
          serverSideEncryptionConfiguration: S.optional(__S(960, __c30, 0)),
          description: S.optional(S.String),
          tags: S.optional(__S(288, __c9, 0)),
        }),
      ).annotate({ identifier: "KnowledgeBaseSummary" });
    case 2:
      return S.Array(__S(3777, __c118, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ knowledgeBaseSummaries: __S(3778, __c118, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListKnowledgeBasesResponse" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          filter: S.optional(S.String).pipe(T.HttpQuery("filter")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/assistants/{assistantId}/sessions/{sessionId}/messages",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMessagesRequest" });
    case 1:
      return S.Array(__S(3072, __c96, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ messages: __S(3809, __c119, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListMessagesResponse" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/knowledgeBases/{knowledgeBaseId}/messageTemplates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMessageTemplatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          messageTemplateArn: S.String,
          messageTemplateId: S.String,
          knowledgeBaseArn: S.String,
          knowledgeBaseId: S.String,
          name: S.String,
          channel: S.optional(SensitiveString),
          channelSubtype: S.String,
          createdTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastModifiedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastModifiedBy: S.String,
          sourceConfiguration: S.optional(__S(1633, __c51, 1)),
          activeVersionNumber: S.optional(S.Number),
          description: S.optional(S.String),
          tags: S.optional(__S(288, __c9, 0)),
        }),
      ).annotate({ identifier: "MessageTemplateSummary" });
    case 2:
      return S.Array(__S(3841, __c120, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          messageTemplateSummaries: __S(3842, __c120, 2),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListMessageTemplatesResponse" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          messageTemplateId: S.String.pipe(T.HttpLabel("messageTemplateId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/knowledgeBases/{knowledgeBaseId}/messageTemplates/{messageTemplateId}/versions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMessageTemplateVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          messageTemplateArn: S.String,
          messageTemplateId: S.String,
          knowledgeBaseArn: S.String,
          knowledgeBaseId: S.String,
          name: S.String,
          channel: S.optional(SensitiveString),
          channelSubtype: S.String,
          isActive: S.Boolean,
          versionNumber: S.Number,
        }),
      ).annotate({ identifier: "MessageTemplateVersionSummary" });
    case 2:
      return S.Array(__S(3873, __c121, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          messageTemplateVersionSummaries: __S(3874, __c121, 2),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListMessageTemplateVersionsResponse" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          aiPromptType: S.optional(S.String).pipe(T.HttpQuery("aiPromptType")),
          modelLifecycle: S.optional(S.String).pipe(T.HttpQuery("modelLifecycle")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/assistants/{assistantId}/models" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListModelsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          modelId: S.String,
          displayName: S.String,
          crossRegionStatus: S.optional(S.String),
          supportsPromptCaching: S.optional(S.Boolean),
          supportedAIPromptTypes: S.optional(__S(352, __c11, 0)),
          modelLifecycle: S.optional(S.String),
          legacyTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endOfLifeTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ModelSummary" });
    case 2:
      return S.Array(__S(3905, __c122, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ modelSummaries: __S(3906, __c122, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListModelsResponse" });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/knowledgeBases/{knowledgeBaseId}/quickResponses" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListQuickResponsesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          quickResponseArn: S.String,
          quickResponseId: S.String,
          knowledgeBaseArn: S.String,
          knowledgeBaseId: S.String,
          name: S.String,
          contentType: S.String,
          status: S.String,
          createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          description: S.optional(S.String),
          lastModifiedBy: S.optional(S.String),
          isActive: S.optional(S.Boolean),
          channels: S.optional(__S(320, __c10, 0)),
          tags: S.optional(__S(288, __c9, 0)),
        }),
      ).annotate({ identifier: "QuickResponseSummary" });
    case 2:
      return S.Array(__S(3937, __c123, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ quickResponseSummaries: __S(3938, __c123, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListQuickResponsesResponse" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/assistants/{assistantId}/sessions/{sessionId}/spans" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSpansRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          contentId: S.optional(S.String),
          title: S.optional(SensitiveString),
          knowledgeBaseId: S.optional(S.String),
          knowledgeBaseArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "SpanCitation" });
    case 2:
      return S.Array(__S(3969, __c124, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          value: SensitiveString,
          citations: S.optional(__S(3970, __c124, 2)),
          aiGuardrailAssessment: S.optional(__S(3104, __c97, 0)),
        }),
      ).annotate({ identifier: "SpanTextValue" });
    case 4:
      return S.suspend(() =>
        S.Struct({ toolUseId: S.String, name: S.String, arguments: S.Any }),
      ).annotate({ identifier: "SpanToolUseValue" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          toolUseId: S.String,
          values: S.suspend(() => __S(3976, __c124, 8)).annotate({
            identifier: "SpanMessageValueList",
          }),
          error: S.optional(S.String),
        }),
      ).annotate({ identifier: "SpanToolResultValue" });
    case 6:
      return S.suspend(() => S.Struct({ value: SensitiveString })).annotate({
        identifier: "SpanReasoningValue",
      });
    case 7:
      return S.Union([
        /*@__PURE__*/ S.Struct({ text: __S(3971, __c124, 3) }),
        /*@__PURE__*/ S.Struct({ toolUse: __S(3972, __c124, 4) }),
        /*@__PURE__*/ S.Struct({
          toolResult: /*@__PURE__*/ S.suspend((): S.Schema<SpanToolResultValue> =>
            __S(3973, __c124, 5),
          ).annotate({ identifier: "SpanToolResultValue" }),
        }),
        /*@__PURE__*/ S.Struct({ reasoning: __S(3974, __c124, 6) }),
      ]);
    case 8:
      return S.Array(
        /*@__PURE__*/ S.suspend(() => __S(3975, __c124, 7)).annotate({
          identifier: "SpanMessageValue",
        }),
      );
    case 9:
      return S.suspend(() =>
        S.Struct({
          messageId: S.String,
          participant: S.String,
          timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          values: __S(3976, __c124, 8),
        }),
      ).annotate({ identifier: "SpanMessage" });
    case 10:
      return S.Array(__S(3977, __c124, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({ policyType: S.String, action: S.String, details: S.optional(S.String) }),
      ).annotate({ identifier: "GuardrailPolicyResult" });
    case 12:
      return S.Array(__S(3979, __c124, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          guardrailId: S.String,
          guardrailName: S.String,
          source: S.String,
          action: S.String,
          policies: S.optional(__S(3980, __c124, 12)),
        }),
      ).annotate({ identifier: "SpanGuardrailAssessment" });
    case 14:
      return S.Array(__S(3981, __c124, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          operationName: S.optional(S.String),
          providerName: S.optional(S.String),
          errorType: S.optional(S.String),
          agentId: S.optional(S.String),
          instanceArn: S.optional(S.String),
          contactId: S.optional(S.String),
          initialContactId: S.optional(S.String),
          sessionName: S.optional(S.String),
          aiAgentArn: S.optional(S.String),
          aiAgentType: S.optional(S.String),
          aiAgentName: S.optional(S.String),
          aiAgentId: S.optional(S.String),
          aiAgentVersion: S.optional(S.Number),
          aiAgentInvoker: S.optional(S.String),
          aiAgentOrchestratorUseCase: S.optional(S.String),
          interactionMode: S.optional(S.String),
          targetAgentId: S.optional(S.String),
          returnReason: S.optional(S.String),
          requestModel: S.optional(S.String),
          requestMaxTokens: S.optional(S.Number),
          temperature: S.optional(S.Number),
          topP: S.optional(S.Number),
          responseModel: S.optional(S.String),
          responseFinishReasons: S.optional(__S(352, __c11, 0)),
          usageInputTokens: S.optional(S.Number),
          usageOutputTokens: S.optional(S.Number),
          usageTotalTokens: S.optional(S.Number),
          cacheReadInputTokens: S.optional(S.Number),
          cacheWriteInputTokens: S.optional(S.Number),
          inputMessages: S.optional(__S(3978, __c124, 10)),
          outputMessages: S.optional(__S(3978, __c124, 10)),
          systemInstructions: S.optional(__S(3976, __c124, 8)),
          promptArn: S.optional(S.String),
          promptId: S.optional(S.String),
          promptType: S.optional(S.String),
          promptName: S.optional(S.String),
          promptVersion: S.optional(S.Number),
          timeToFirstTokenMs: S.optional(S.Number),
          guardrailAssessments: S.optional(__S(3982, __c124, 14)),
        }),
      ).annotate({ identifier: "SpanAttributes" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          spanId: S.String,
          assistantId: S.String,
          sessionId: S.String,
          parentSpanId: S.optional(S.String),
          spanName: S.String,
          spanType: S.String,
          startTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          status: S.String,
          statusDescription: S.optional(S.String),
          requestId: S.String,
          originRequestId: S.optional(S.String),
          attributes: __S(3983, __c124, 15),
        }),
      ).annotate({ identifier: "Span" });
    case 17:
      return S.Array(__S(3984, __c124, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({ spans: __S(3985, __c124, 17), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSpansResponse" });
  }
}
function __c125(j: number): any {
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
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(288, __c9, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
          recommendationIds: __S(352, __c11, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/assistants/{assistantId}/sessions/{sessionId}/recommendations/notify",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "NotifyRecommendationsReceivedRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ recommendationId: S.optional(S.String), message: S.optional(S.String) }),
      ).annotate({ identifier: "NotifyRecommendationsReceivedError" });
    case 2:
      return S.Array(__S(4033, __c126, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          recommendationIds: S.optional(__S(352, __c11, 0)),
          errors: S.optional(__S(4034, __c126, 2)),
        }),
      ).annotate({ identifier: "NotifyRecommendationsReceivedResponse" });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ relevance: S.String })).annotate({
        identifier: "GenerativeContentFeedbackData",
      });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ generativeContentFeedbackData: __S(4064, __c127, 0) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          targetId: S.String,
          targetType: S.String,
          contentFeedback: __S(4065, __c127, 1),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/assistants/{assistantId}/feedback" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutFeedbackRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String,
          assistantArn: S.String,
          targetId: S.String,
          targetType: S.String,
          contentFeedback: __S(4065, __c127, 1),
        }),
      ).annotate({ identifier: "PutFeedbackResponse" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ field: S.String, comparator: S.String, value: S.String }),
      ).annotate({ identifier: "QueryConditionItem" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ single: __S(4096, __c128, 0) })]);
    case 2:
      return S.Array(__S(4097, __c128, 1));
    case 3:
      return S.suspend(() => S.Struct({ intentId: S.String })).annotate({
        identifier: "IntentInputData",
      });
    case 4:
      return S.suspend(() => S.Struct({ caseArn: S.String })).annotate({
        identifier: "CaseSummarizationInputData",
      });
    case 5:
      return S.Union([
        /*@__PURE__*/ S.Struct({ queryTextInputData: __S(608, __c19, 0) }),
        /*@__PURE__*/ S.Struct({ intentInputData: __S(4099, __c128, 3) }),
        /*@__PURE__*/ S.Struct({ caseSummarizationInputData: __S(4100, __c128, 4) }),
      ]);
    case 6:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          queryText: S.optional(SensitiveString),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          sessionId: S.optional(S.String),
          queryCondition: S.optional(__S(4098, __c128, 2)),
          queryInputData: S.optional(__S(4101, __c128, 5)),
          overrideKnowledgeBaseSearchType: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/assistants/{assistantId}/query" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "QueryAssistantRequest" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          resultId: S.String,
          document: S.optional(__S(3235, __c101, 3)),
          relevanceScore: S.optional(S.Number),
          data: S.optional(__S(3252, __c101, 20)),
          type: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResultData" });
    case 8:
      return S.Array(__S(4103, __c128, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({ results: __S(4104, __c128, 8), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "QueryAssistantResponse" });
  }
}
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          aiAgentType: S.String.pipe(T.HttpQuery("aiAgentType")),
          orchestratorUseCase: S.optional(S.String).pipe(T.HttpQuery("orchestratorUseCase")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/assistants/{assistantId}/aiagentConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RemoveAssistantAIAgentRequest" });
  }
}
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/knowledgeBases/{knowledgeBaseId}/templateUri" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RemoveKnowledgeBaseTemplateUriRequest" });
  }
}
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          messageTemplateId: S.String.pipe(T.HttpLabel("messageTemplateId")),
          attributes: __S(1584, __c49, 16),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/knowledgeBases/{knowledgeBaseId}/messageTemplates/{messageTemplateId}/render",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RenderMessageTemplateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          content: S.optional(__S(1578, __c49, 10)),
          sourceConfigurationSummary: S.optional(__S(1601, __c50, 1)),
          attributesNotInterpolated: S.optional(__S(352, __c11, 0)),
          attachments: S.optional(__S(1792, __c56, 0)),
        }),
      ).annotate({ identifier: "RenderMessageTemplateResponse" });
  }
}
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ assistantAssociationIds: __S(352, __c11, 0) })]);
    case 1:
      return S.Array(
        /*@__PURE__*/ S.suspend(() => __S(4227, __c132, 3)).annotate({
          identifier: "RetrievalFilterConfiguration",
        }),
      );
    case 2:
      return S.suspend(() => S.Struct({ key: S.String, value: S.Any })).annotate({
        identifier: "FilterAttribute",
      });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({
          andAll: /*@__PURE__*/ S.suspend(() => __S(4225, __c132, 1)).annotate({
            identifier: "RetrievalFilterList",
          }),
        }),
        /*@__PURE__*/ S.Struct({ equals: __S(4226, __c132, 2) }),
        /*@__PURE__*/ S.Struct({ greaterThan: __S(4226, __c132, 2) }),
        /*@__PURE__*/ S.Struct({ greaterThanOrEquals: __S(4226, __c132, 2) }),
        /*@__PURE__*/ S.Struct({ in: __S(4226, __c132, 2) }),
        /*@__PURE__*/ S.Struct({ lessThan: __S(4226, __c132, 2) }),
        /*@__PURE__*/ S.Struct({ lessThanOrEquals: __S(4226, __c132, 2) }),
        /*@__PURE__*/ S.Struct({ listContains: __S(4226, __c132, 2) }),
        /*@__PURE__*/ S.Struct({ notEquals: __S(4226, __c132, 2) }),
        /*@__PURE__*/ S.Struct({ notIn: __S(4226, __c132, 2) }),
        /*@__PURE__*/ S.Struct({
          orAll: /*@__PURE__*/ S.suspend(() => __S(4225, __c132, 1)).annotate({
            identifier: "RetrievalFilterList",
          }),
        }),
        /*@__PURE__*/ S.Struct({ startsWith: __S(4226, __c132, 2) }),
        /*@__PURE__*/ S.Struct({ stringContains: __S(4226, __c132, 2) }),
      ]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          knowledgeSource: __S(4224, __c132, 0),
          filter: S.optional(__S(4227, __c132, 3)),
          numberOfResults: S.optional(S.Number),
          overrideKnowledgeBaseSearchType: S.optional(S.String),
        }),
      ).annotate({ identifier: "RetrievalConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          retrievalConfiguration: __S(4228, __c132, 4),
          retrievalQuery: SensitiveString,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/assistants/{assistantId}/retrieve" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RetrieveRequest" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          associationId: S.String,
          sourceId: SensitiveString,
          referenceType: S.String,
          contentText: SensitiveString,
        }),
      ).annotate({ identifier: "RetrieveResult" });
    case 7:
      return S.Array(__S(4230, __c132, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ associationId: S.String, code: S.String, message: S.String }),
      ).annotate({ identifier: "RetrieveError" });
    case 9:
      return S.Array(__S(4232, __c132, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({ results: __S(4231, __c132, 7), errors: S.optional(__S(4233, __c132, 9)) }),
      ).annotate({ identifier: "RetrieveResponse" });
  }
}
function __c133(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          searchExpression: __S(4290, __c134, 2),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/knowledgeBases/{knowledgeBaseId}/search" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchContentRequest" });
  }
}
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ field: S.String, operator: S.String, value: S.String }),
      ).annotate({ identifier: "Filter" });
    case 1:
      return S.Array(__S(4288, __c134, 0));
    case 2:
      return S.suspend(() => S.Struct({ filters: __S(4289, __c134, 1) })).annotate({
        identifier: "SearchExpression",
      });
  }
}
function __c135(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          searchExpression: __S(4357, __c136, 5),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/knowledgeBases/{knowledgeBaseId}/search/messageTemplates",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchMessageTemplatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          messageTemplateArn: S.String,
          messageTemplateId: S.String,
          knowledgeBaseArn: S.String,
          knowledgeBaseId: S.String,
          name: S.String,
          channel: S.optional(SensitiveString),
          channelSubtype: S.String,
          createdTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastModifiedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastModifiedBy: S.String,
          isActive: S.optional(S.Boolean),
          versionNumber: S.optional(S.Number),
          description: S.optional(S.String),
          sourceConfigurationSummary: S.optional(__S(1601, __c50, 1)),
          groupingConfiguration: S.optional(__S(1536, __c48, 0)),
          language: S.optional(S.String),
          tags: S.optional(__S(288, __c9, 0)),
        }),
      ).annotate({ identifier: "MessageTemplateSearchResultData" });
    case 2:
      return S.Array(__S(4321, __c135, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ results: __S(4322, __c135, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "SearchMessageTemplatesResponse" });
  }
}
function __c136(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          values: __S(352, __c11, 0),
          operator: S.String,
          allowFuzziness: S.optional(S.Boolean),
          priority: S.optional(S.String),
        }),
      ).annotate({ identifier: "MessageTemplateQueryField" });
    case 1:
      return S.Array(__S(4352, __c136, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          values: S.optional(__S(352, __c11, 0)),
          operator: S.String,
          includeNoExistence: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "MessageTemplateFilterField" });
    case 3:
      return S.Array(__S(4354, __c136, 2));
    case 4:
      return S.suspend(() => S.Struct({ name: S.String, order: S.optional(S.String) })).annotate({
        identifier: "MessageTemplateOrderField",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          queries: S.optional(__S(4353, __c136, 1)),
          filters: S.optional(__S(4355, __c136, 3)),
          orderOnField: S.optional(__S(4356, __c136, 4)),
        }),
      ).annotate({ identifier: "MessageTemplateSearchExpression" });
  }
}
function __c137(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          searchExpression: __S(4357, __c136, 5),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          attributes: S.optional(__S(288, __c9, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/knowledgeBases/{knowledgeBaseId}/search/quickResponses",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchQuickResponsesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          quickResponseArn: S.String,
          quickResponseId: S.String,
          knowledgeBaseArn: S.String,
          knowledgeBaseId: S.String,
          name: S.String,
          contentType: S.String,
          status: S.String,
          contents: __S(1888, __c59, 0),
          createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          isActive: S.Boolean,
          description: S.optional(S.String),
          groupingConfiguration: S.optional(__S(1536, __c48, 0)),
          shortcutKey: S.optional(S.String),
          lastModifiedBy: S.optional(S.String),
          channels: S.optional(__S(320, __c10, 0)),
          language: S.optional(S.String),
          attributesNotInterpolated: S.optional(__S(352, __c11, 0)),
          attributesInterpolated: S.optional(__S(352, __c11, 0)),
          tags: S.optional(__S(288, __c9, 0)),
        }),
      ).annotate({ identifier: "QuickResponseSearchResultData" });
    case 2:
      return S.Array(__S(4385, __c137, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ results: __S(4386, __c137, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "SearchQuickResponsesResponse" });
  }
}
function __c138(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          searchExpression: __S(4290, __c134, 2),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/assistants/{assistantId}/searchSessions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchSessionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          sessionId: S.String,
          sessionArn: S.String,
          assistantId: S.String,
          assistantArn: S.String,
        }),
      ).annotate({ identifier: "SessionSummary" });
    case 2:
      return S.Array(__S(4417, __c138, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ sessionSummaries: __S(4418, __c138, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "SearchSessionsResponse" });
  }
}
function __c139(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ value: __S(3140, __c98, 4) })).annotate({
        identifier: "MessageInput",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          turnNumber: S.optional(S.Number),
          inputTranscript: S.optional(SensitiveString),
          botResponse: S.optional(SensitiveString),
          timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "SelfServiceConversationHistory" });
    case 2:
      return S.Array(__S(4449, __c139, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ selfServiceConversationHistory: __S(4450, __c139, 2) }),
      ).annotate({ identifier: "ConversationContext" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          generateFillerMessage: S.optional(S.Boolean),
          generateChunkedMessage: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "MessageConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
          type: S.String,
          message: __S(4448, __c139, 0),
          aiAgentId: S.optional(S.String),
          conversationContext: S.optional(__S(4451, __c139, 3)),
          configuration: S.optional(__S(4452, __c139, 4)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          orchestratorUseCase: S.optional(S.String),
          metadata: S.optional(__S(288, __c9, 0)),
          originRequestId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/assistants/{assistantId}/sessions/{sessionId}/message",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendMessageRequest" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          requestMessageId: S.String,
          configuration: S.optional(__S(4452, __c139, 4)),
          nextMessageToken: S.String,
        }),
      ).annotate({ identifier: "SendMessageResponse" });
  }
}
function __c140(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          contentType: S.String,
          presignedUrlTimeToLive: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/knowledgeBases/{knowledgeBaseId}/upload" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartContentUploadRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          uploadId: S.String,
          url: SensitiveString,
          urlExpiry: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          headersToInclude: __S(288, __c9, 0),
        }),
      ).annotate({ identifier: "StartContentUploadResponse" });
  }
}
function __c141(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          importJobType: S.String,
          uploadId: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          metadata: S.optional(__S(288, __c9, 0)),
          externalSourceConfiguration: S.optional(__S(2850, __c89, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/knowledgeBases/{knowledgeBaseId}/importJobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartImportJobRequest" });
  }
}
function __c142(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(288, __c9, 0),
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
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c143(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(352, __c11, 0).pipe(T.HttpQuery("tagKeys")),
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
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c144(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          aiAgentId: S.String.pipe(T.HttpLabel("aiAgentId")),
          visibilityStatus: S.String,
          configuration: S.optional(__S(447, __c13, 31)),
          description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/assistants/{assistantId}/aiagents/{aiAgentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAIAgentRequest" });
  }
}
function __c145(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          aiGuardrailId: S.String.pipe(T.HttpLabel("aiGuardrailId")),
          visibilityStatus: S.String,
          blockedInputMessaging: SensitiveString,
          blockedOutputsMessaging: SensitiveString,
          description: S.optional(SensitiveString),
          topicPolicyConfig: S.optional(__S(642, __c20, 2)),
          contentPolicyConfig: S.optional(__S(645, __c20, 5)),
          wordPolicyConfig: S.optional(__S(649, __c20, 9)),
          sensitiveInformationPolicyConfig: S.optional(__S(654, __c20, 14)),
          contextualGroundingPolicyConfig: S.optional(__S(657, __c20, 17)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/assistants/{assistantId}/aiguardrails/{aiGuardrailId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAIGuardrailRequest" });
  }
}
function __c146(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          aiPromptId: S.String.pipe(T.HttpLabel("aiPromptId")),
          visibilityStatus: S.String,
          templateConfiguration: S.optional(__S(800, __c25, 0)),
          description: S.optional(S.String),
          modelId: S.optional(S.String),
          inferenceConfiguration: S.optional(__S(801, __c25, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/assistants/{assistantId}/aiprompts/{aiPromptId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAIPromptRequest" });
  }
}
function __c147(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          aiAgentType: S.String,
          configuration: __S(993, __c31, 1),
          orchestratorUseCase: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/assistants/{assistantId}/aiagentConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAssistantAIAgentRequest" });
  }
}
function __c148(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          contentId: S.String.pipe(T.HttpLabel("contentId")),
          revisionId: S.optional(S.String),
          title: S.optional(S.String),
          overrideLinkOutUri: S.optional(S.String),
          removeOverrideLinkOutUri: S.optional(S.Boolean),
          metadata: S.optional(__S(288, __c9, 0)),
          uploadId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/knowledgeBases/{knowledgeBaseId}/contents/{contentId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateContentRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
