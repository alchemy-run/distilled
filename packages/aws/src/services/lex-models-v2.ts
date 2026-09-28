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
  sdkId: "Lex Models V2",
  target: "LexModelBuildingServiceV2",
  version: "2020-08-07",
  sigv4: "lex",
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
                `https://models-v2-lex-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://models-v2-lex-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://models-v2-lex.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://models-v2-lex.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class PreconditionFailedException
  extends /*@__PURE__*/ TE.TaggedError("PreconditionFailedException", [], {
    status: 412,
  })<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly retryAfterSeconds?: number; readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type Id = string;
export type BotVersion = string;
export type LocaleId = string;
export type Phrase = string;
export type Weight = number;
export interface NewCustomVocabularyItem {
  phrase: string;
  weight?: number;
  displayAs?: string;
}
export type CreateCustomVocabularyItemsList = NewCustomVocabularyItem[];
export interface BatchCreateCustomVocabularyItemRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  customVocabularyItemList: NewCustomVocabularyItem[];
}
export type ItemId = string;
export type ErrorMessage = string;
export type ErrorCode =
  | "DUPLICATE_INPUT"
  | "RESOURCE_DOES_NOT_EXIST"
  | "RESOURCE_ALREADY_EXISTS"
  | "INTERNAL_SERVER_FAILURE"
  | (string & {});
export interface FailedCustomVocabularyItem {
  itemId?: string;
  errorMessage?: string;
  errorCode?: ErrorCode;
}
export type FailedCustomVocabularyItems = FailedCustomVocabularyItem[];
export interface CustomVocabularyItem {
  itemId: string;
  phrase: string;
  weight?: number;
  displayAs?: string;
}
export type CustomVocabularyItems = CustomVocabularyItem[];
export interface BatchCreateCustomVocabularyItemResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  errors?: FailedCustomVocabularyItem[];
  resources?: CustomVocabularyItem[];
}
export interface CustomVocabularyEntryId {
  itemId: string;
}
export type DeleteCustomVocabularyItemsList = CustomVocabularyEntryId[];
export interface BatchDeleteCustomVocabularyItemRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  customVocabularyItemList: CustomVocabularyEntryId[];
}
export interface BatchDeleteCustomVocabularyItemResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  errors?: FailedCustomVocabularyItem[];
  resources?: CustomVocabularyItem[];
}
export type UpdateCustomVocabularyItemsList = CustomVocabularyItem[];
export interface BatchUpdateCustomVocabularyItemRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  customVocabularyItemList: CustomVocabularyItem[];
}
export interface BatchUpdateCustomVocabularyItemResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  errors?: FailedCustomVocabularyItem[];
  resources?: CustomVocabularyItem[];
}
export type DraftBotVersion = string;
export interface BuildBotLocaleRequest {
  botId: string;
  botVersion: string;
  localeId: string;
}
export type BotLocaleStatus =
  | "Creating"
  | "Building"
  | "Built"
  | "ReadyExpressTesting"
  | "Failed"
  | "Deleting"
  | "NotBuilt"
  | "Importing"
  | "Processing"
  | (string & {});
export interface BuildBotLocaleResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  botLocaleStatus?: BotLocaleStatus;
  lastBuildSubmittedDateTime?: Date;
}
export type Name = string;
export type Description = string;
export type RoleArn = string;
export type ChildDirected = boolean;
export interface DataPrivacy {
  childDirected: boolean;
}
export type SessionTTL = number;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type BotType = "Bot" | "BotNetwork" | (string & {});
export type BotAliasId = string;
export type BotAliasName = string;
export interface BotMember {
  botMemberId: string;
  botMemberName: string;
  botMemberAliasId: string;
  botMemberAliasName: string;
  botMemberVersion: string;
}
export type BotMembers = BotMember[];
export type BoxedBoolean = boolean;
export interface ErrorLogSettings {
  enabled: boolean;
}
export interface CreateBotRequest {
  botName: string;
  description?: string;
  roleArn: string;
  dataPrivacy: DataPrivacy;
  idleSessionTTLInSeconds: number;
  botTags?: { [key: string]: string | undefined };
  testBotAliasTags?: { [key: string]: string | undefined };
  botType?: BotType;
  botMembers?: BotMember[];
  errorLogSettings?: ErrorLogSettings;
}
export type BotStatus =
  | "Creating"
  | "Available"
  | "Inactive"
  | "Deleting"
  | "Failed"
  | "Versioning"
  | "Importing"
  | "Updating"
  | (string & {});
export interface CreateBotResponse {
  botId?: string;
  botName?: string;
  description?: string;
  roleArn?: string;
  dataPrivacy?: DataPrivacy;
  idleSessionTTLInSeconds?: number;
  botStatus?: BotStatus;
  creationDateTime?: Date;
  botTags?: { [key: string]: string | undefined };
  testBotAliasTags?: { [key: string]: string | undefined };
  botType?: BotType;
  botMembers?: BotMember[];
  errorLogSettings?: ErrorLogSettings;
}
export type NumericalBotVersion = string;
export type LambdaARN = string;
export type CodeHookInterfaceVersion = string;
export interface LambdaCodeHook {
  lambdaARN: string;
  codeHookInterfaceVersion: string;
}
export interface CodeHookSpecification {
  lambdaCodeHook: LambdaCodeHook;
}
export interface BotAliasLocaleSettings {
  enabled: boolean;
  codeHookSpecification?: CodeHookSpecification;
}
export type BotAliasLocaleSettingsMap = {
  [key: string]: BotAliasLocaleSettings | undefined;
};
export type CloudWatchLogGroupArn = string;
export type LogPrefix = string;
export interface CloudWatchLogGroupLogDestination {
  cloudWatchLogGroupArn: string;
  logPrefix: string;
}
export interface TextLogDestination {
  cloudWatch: CloudWatchLogGroupLogDestination;
}
export interface TextLogSetting {
  enabled: boolean;
  destination: TextLogDestination;
  selectiveLoggingEnabled?: boolean;
}
export type TextLogSettingsList = TextLogSetting[];
export type KmsKeyArn = string;
export type S3BucketArn = string;
export interface S3BucketLogDestination {
  kmsKeyArn?: string;
  s3BucketArn: string;
  logPrefix: string;
}
export interface AudioLogDestination {
  s3Bucket: S3BucketLogDestination;
}
export interface AudioLogSetting {
  enabled: boolean;
  destination: AudioLogDestination;
  selectiveLoggingEnabled?: boolean;
}
export type AudioLogSettingsList = AudioLogSetting[];
export interface ConversationLogSettings {
  textLogSettings?: TextLogSetting[];
  audioLogSettings?: AudioLogSetting[];
}
export interface SentimentAnalysisSettings {
  detectSentiment: boolean;
}
export interface CreateBotAliasRequest {
  botAliasName: string;
  description?: string;
  botVersion?: string;
  botAliasLocaleSettings?: {
    [key: string]: BotAliasLocaleSettings | undefined;
  };
  conversationLogSettings?: ConversationLogSettings;
  sentimentAnalysisSettings?: SentimentAnalysisSettings;
  botId: string;
  tags?: { [key: string]: string | undefined };
}
export type BotAliasStatus =
  | "Creating"
  | "Available"
  | "Deleting"
  | "Failed"
  | (string & {});
export interface CreateBotAliasResponse {
  botAliasId?: string;
  botAliasName?: string;
  description?: string;
  botVersion?: string;
  botAliasLocaleSettings?: {
    [key: string]: BotAliasLocaleSettings | undefined;
  };
  conversationLogSettings?: ConversationLogSettings;
  sentimentAnalysisSettings?: SentimentAnalysisSettings;
  botAliasStatus?: BotAliasStatus;
  botId?: string;
  creationDateTime?: Date;
  tags?: { [key: string]: string | undefined };
}
export type ConfidenceThreshold = number;
export type VoiceEngine =
  | "standard"
  | "neural"
  | "long-form"
  | "generative"
  | (string & {});
export type VoiceId = string;
export interface VoiceSettings {
  engine?: VoiceEngine;
  voiceId: string;
}
export type BedrockModelArn = string;
export interface SpeechFoundationModel {
  modelArn: string;
  voiceId?: string;
}
export interface UnifiedSpeechSettings {
  speechFoundationModel: SpeechFoundationModel;
}
export type AudioFillerType =
  | "MELODY_CHIPPER_CHIME"
  | "MELODY_CURIOUS_CRAWL"
  | "MELODY_RISING_RIPPLE"
  | "MELODY_PATIENT_PING"
  | "MELODY_PONDERING_PONG"
  | "TYPING_KINETIC_KEYS"
  | "TYPING_QUIET_QWERTY"
  | (string & {});
export type AudioFillerDelayInMilliseconds = number;
export type AudioFillerDurationInMilliseconds = number;
export type AudioFillerDeliveryDelayInMilliseconds = number;
export interface AudioFillerSettings {
  enabled?: boolean;
  audioType?: AudioFillerType;
  startDelayInMilliseconds?: number;
  minimumPlayDurationInMilliseconds?: number;
  responseDeliveryDelayInMilliseconds?: number;
}
export type SpeechModelPreference =
  | "Standard"
  | "Neural"
  | "Deepgram"
  | (string & {});
export type SecretsManagerSecretArn = string;
export type DeepgramModelId = string;
export interface DeepgramSpeechModelConfig {
  apiTokenSecretArn: string;
  modelId?: string;
}
export interface SpeechModelConfig {
  deepgramConfig?: DeepgramSpeechModelConfig;
}
export interface SpeechRecognitionSettings {
  speechModelPreference?: SpeechModelPreference;
  speechModelConfig?: SpeechModelConfig;
}
export type Enabled = boolean;
export type BedrockGuardrailIdentifier = string;
export type BedrockGuardrailVersion = string;
export interface BedrockGuardrailConfiguration {
  identifier: string;
  version: string;
}
export type BedrockTraceStatus = "ENABLED" | "DISABLED" | (string & {});
export type BedrockModelCustomPrompt = string;
export interface BedrockModelSpecification {
  modelArn: string;
  guardrail?: BedrockGuardrailConfiguration;
  traceStatus?: BedrockTraceStatus;
  customPrompt?: string;
}
export interface SlotResolutionImprovementSpecification {
  enabled: boolean;
  bedrockModelSpecification?: BedrockModelSpecification;
}
export type AssistedNluMode = "Primary" | "Fallback" | (string & {});
export type MaxDisambiguationIntents = number;
export type CustomDisambiguationMessage = string;
export interface IntentDisambiguationSettings {
  enabled: boolean;
  maxDisambiguationIntents?: number;
  customDisambiguationMessage?: string;
}
export interface NluImprovementSpecification {
  enabled: boolean;
  assistedNluMode?: AssistedNluMode;
  intentDisambiguationSettings?: IntentDisambiguationSettings;
}
export interface RuntimeSettings {
  slotResolutionImprovement?: SlotResolutionImprovementSpecification;
  nluImprovement?: NluImprovementSpecification;
}
export interface DescriptiveBotBuilderSpecification {
  enabled: boolean;
  bedrockModelSpecification?: BedrockModelSpecification;
}
export interface SampleUtteranceGenerationSpecification {
  enabled: boolean;
  bedrockModelSpecification?: BedrockModelSpecification;
}
export interface BuildtimeSettings {
  descriptiveBotBuilder?: DescriptiveBotBuilderSpecification;
  sampleUtteranceGeneration?: SampleUtteranceGenerationSpecification;
}
export interface GenerativeAISettings {
  runtimeSettings?: RuntimeSettings;
  buildtimeSettings?: BuildtimeSettings;
}
export type SpeechDetectionSensitivity =
  | "Default"
  | "HighNoiseTolerance"
  | "MaximumNoiseTolerance"
  | (string & {});
export interface CreateBotLocaleRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  description?: string;
  nluIntentConfidenceThreshold: number;
  voiceSettings?: VoiceSettings;
  unifiedSpeechSettings?: UnifiedSpeechSettings;
  audioFillerSettings?: AudioFillerSettings;
  speechRecognitionSettings?: SpeechRecognitionSettings;
  generativeAISettings?: GenerativeAISettings;
  speechDetectionSensitivity?: SpeechDetectionSensitivity;
}
export type LocaleName = string;
export interface CreateBotLocaleResponse {
  botId?: string;
  botVersion?: string;
  localeName?: string;
  localeId?: string;
  description?: string;
  nluIntentConfidenceThreshold?: number;
  voiceSettings?: VoiceSettings;
  unifiedSpeechSettings?: UnifiedSpeechSettings;
  audioFillerSettings?: AudioFillerSettings;
  speechRecognitionSettings?: SpeechRecognitionSettings;
  botLocaleStatus?: BotLocaleStatus;
  creationDateTime?: Date;
  generativeAISettings?: GenerativeAISettings;
  speechDetectionSensitivity?: SpeechDetectionSensitivity;
}
export type ReplicaRegion = string;
export interface CreateBotReplicaRequest {
  botId: string;
  replicaRegion: string;
}
export type BotReplicaStatus =
  | "Enabling"
  | "Enabled"
  | "Deleting"
  | "Failed"
  | (string & {});
export interface CreateBotReplicaResponse {
  botId?: string;
  replicaRegion?: string;
  sourceRegion?: string;
  creationDateTime?: Date;
  botReplicaStatus?: BotReplicaStatus;
}
export interface BotVersionLocaleDetails {
  sourceBotVersion: string;
}
export type BotVersionLocaleSpecification = {
  [key: string]: BotVersionLocaleDetails | undefined;
};
export interface CreateBotVersionRequest {
  botId: string;
  description?: string;
  botVersionLocaleSpecification: {
    [key: string]: BotVersionLocaleDetails | undefined;
  };
}
export interface CreateBotVersionResponse {
  botId?: string;
  description?: string;
  botVersion?: string;
  botVersionLocaleSpecification?: {
    [key: string]: BotVersionLocaleDetails | undefined;
  };
  botStatus?: BotStatus;
  creationDateTime?: Date;
}
export interface BotExportSpecification {
  botId: string;
  botVersion: string;
}
export interface BotLocaleExportSpecification {
  botId: string;
  botVersion: string;
  localeId: string;
}
export interface CustomVocabularyExportSpecification {
  botId: string;
  botVersion: string;
  localeId: string;
}
export interface TestSetExportSpecification {
  testSetId: string;
}
export interface ExportResourceSpecification {
  botExportSpecification?: BotExportSpecification;
  botLocaleExportSpecification?: BotLocaleExportSpecification;
  customVocabularyExportSpecification?: CustomVocabularyExportSpecification;
  testSetExportSpecification?: TestSetExportSpecification;
}
export type ImportExportFileFormat = "LexJson" | "TSV" | "CSV" | (string & {});
export type ImportExportFilePassword = string | redacted.Redacted<string>;
export interface CreateExportRequest {
  resourceSpecification: ExportResourceSpecification;
  fileFormat: ImportExportFileFormat;
  filePassword?: string | redacted.Redacted<string>;
}
export type ExportStatus =
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Deleting"
  | (string & {});
export interface CreateExportResponse {
  exportId?: string;
  resourceSpecification?: ExportResourceSpecification;
  fileFormat?: ImportExportFileFormat;
  exportStatus?: ExportStatus;
  creationDateTime?: Date;
}
export type DisplayName = string;
export type IntentSignature = string;
export type Utterance = string;
export interface SampleUtterance {
  utterance: string;
}
export type SampleUtterancesList = SampleUtterance[];
export interface DialogCodeHookSettings {
  enabled: boolean;
}
export type PlainTextMessageValue = string;
export interface PlainTextMessage {
  value: string;
}
export type CustomPayloadValue = string;
export interface CustomPayload {
  value: string;
}
export type SSMLMessageValue = string;
export interface SSMLMessage {
  value: string;
}
export type AttachmentTitle = string;
export type AttachmentUrl = string;
export type ButtonText = string;
export type ButtonValue = string;
export interface Button {
  text: string;
  value: string;
}
export type ButtonsList = Button[];
export interface ImageResponseCard {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  buttons?: Button[];
}
export interface Message {
  plainTextMessage?: PlainTextMessage;
  customPayload?: CustomPayload;
  ssmlMessage?: SSMLMessage;
  imageResponseCard?: ImageResponseCard;
}
export type MessageVariationsList = Message[];
export interface MessageGroup {
  message: Message;
  variations?: Message[];
}
export type MessageGroupsList = MessageGroup[];
export interface ResponseSpecification {
  messageGroups: MessageGroup[];
  allowInterrupt?: boolean;
}
export type DialogActionType =
  | "ElicitIntent"
  | "StartIntent"
  | "ElicitSlot"
  | "EvaluateConditional"
  | "InvokeDialogCodeHook"
  | "ConfirmIntent"
  | "FulfillIntent"
  | "CloseIntent"
  | "EndConversation"
  | (string & {});
export interface DialogAction {
  type: DialogActionType;
  slotToElicit?: string;
  suppressNextMessage?: boolean;
}
export type SlotShape = "Scalar" | "List" | (string & {});
export type NonEmptyString = string;
export interface SlotValue {
  interpretedValue?: string;
}
export type SlotValues = SlotValueOverride[];
export interface SlotValueOverride {
  shape?: SlotShape;
  value?: SlotValue;
  values?: SlotValueOverride[];
}
export type SlotValueOverrideMap = {
  [key: string]: SlotValueOverride | undefined;
};
export interface IntentOverride {
  name?: string;
  slots?: { [key: string]: SlotValueOverride | undefined };
}
export type StringMap = { [key: string]: string | undefined };
export interface DialogState {
  dialogAction?: DialogAction;
  intent?: IntentOverride;
  sessionAttributes?: { [key: string]: string | undefined };
}
export type ConditionExpression = string;
export interface Condition {
  expressionString: string;
}
export interface ConditionalBranch {
  name: string;
  condition: Condition;
  nextStep: DialogState;
  response?: ResponseSpecification;
}
export type ConditionalBranches = ConditionalBranch[];
export interface DefaultConditionalBranch {
  nextStep?: DialogState;
  response?: ResponseSpecification;
}
export interface ConditionalSpecification {
  active: boolean;
  conditionalBranches: ConditionalBranch[];
  defaultBranch: DefaultConditionalBranch;
}
export interface PostFulfillmentStatusSpecification {
  successResponse?: ResponseSpecification;
  failureResponse?: ResponseSpecification;
  timeoutResponse?: ResponseSpecification;
  successNextStep?: DialogState;
  successConditional?: ConditionalSpecification;
  failureNextStep?: DialogState;
  failureConditional?: ConditionalSpecification;
  timeoutNextStep?: DialogState;
  timeoutConditional?: ConditionalSpecification;
}
export type FulfillmentStartResponseDelay = number;
export interface FulfillmentStartResponseSpecification {
  delayInSeconds: number;
  messageGroups: MessageGroup[];
  allowInterrupt?: boolean;
}
export type FulfillmentUpdateResponseFrequency = number;
export interface FulfillmentUpdateResponseSpecification {
  frequencyInSeconds: number;
  messageGroups: MessageGroup[];
  allowInterrupt?: boolean;
}
export type FulfillmentTimeout = number;
export interface FulfillmentUpdatesSpecification {
  active: boolean;
  startResponse?: FulfillmentStartResponseSpecification;
  updateResponse?: FulfillmentUpdateResponseSpecification;
  timeoutInSeconds?: number;
}
export interface FulfillmentCodeHookSettings {
  enabled: boolean;
  postFulfillmentStatusSpecification?: PostFulfillmentStatusSpecification;
  fulfillmentUpdatesSpecification?: FulfillmentUpdatesSpecification;
  active?: boolean;
}
export type PromptMaxRetries = number;
export type MessageSelectionStrategy = "Random" | "Ordered" | (string & {});
export type PromptAttempt =
  | "Initial"
  | "Retry1"
  | "Retry2"
  | "Retry3"
  | "Retry4"
  | "Retry5"
  | (string & {});
export interface AllowedInputTypes {
  allowAudioInput: boolean;
  allowDTMFInput: boolean;
}
export type TimeInMilliSeconds = number;
export interface AudioSpecification {
  maxLengthMs: number;
  endTimeoutMs: number;
}
export type MaxUtteranceDigits = number;
export type DTMFCharacter = string;
export interface DTMFSpecification {
  maxLength: number;
  endTimeoutMs: number;
  deletionCharacter: string;
  endCharacter: string;
}
export interface AudioAndDTMFInputSpecification {
  startTimeoutMs: number;
  audioSpecification?: AudioSpecification;
  dtmfSpecification?: DTMFSpecification;
}
export interface TextInputSpecification {
  startTimeoutMs: number;
}
export interface PromptAttemptSpecification {
  allowInterrupt?: boolean;
  allowedInputTypes: AllowedInputTypes;
  audioAndDTMFInputSpecification?: AudioAndDTMFInputSpecification;
  textInputSpecification?: TextInputSpecification;
}
export type PromptAttemptsSpecificationMap = {
  [key in PromptAttempt]?: PromptAttemptSpecification;
};
export interface PromptSpecification {
  messageGroups: MessageGroup[];
  maxRetries: number;
  allowInterrupt?: boolean;
  messageSelectionStrategy?: MessageSelectionStrategy;
  promptAttemptsSpecification?: {
    [key: string]: PromptAttemptSpecification | undefined;
  };
}
export interface PostDialogCodeHookInvocationSpecification {
  successResponse?: ResponseSpecification;
  successNextStep?: DialogState;
  successConditional?: ConditionalSpecification;
  failureResponse?: ResponseSpecification;
  failureNextStep?: DialogState;
  failureConditional?: ConditionalSpecification;
  timeoutResponse?: ResponseSpecification;
  timeoutNextStep?: DialogState;
  timeoutConditional?: ConditionalSpecification;
}
export interface DialogCodeHookInvocationSetting {
  enableCodeHookInvocation: boolean;
  active: boolean;
  invocationLabel?: string;
  postCodeHookSpecification: PostDialogCodeHookInvocationSpecification;
}
export interface ElicitationCodeHookInvocationSetting {
  enableCodeHookInvocation: boolean;
  invocationLabel?: string;
}
export interface IntentConfirmationSetting {
  promptSpecification: PromptSpecification;
  declinationResponse?: ResponseSpecification;
  active?: boolean;
  confirmationResponse?: ResponseSpecification;
  confirmationNextStep?: DialogState;
  confirmationConditional?: ConditionalSpecification;
  declinationNextStep?: DialogState;
  declinationConditional?: ConditionalSpecification;
  failureResponse?: ResponseSpecification;
  failureNextStep?: DialogState;
  failureConditional?: ConditionalSpecification;
  codeHook?: DialogCodeHookInvocationSetting;
  elicitationCodeHook?: ElicitationCodeHookInvocationSetting;
}
export interface IntentClosingSetting {
  closingResponse?: ResponseSpecification;
  active?: boolean;
  nextStep?: DialogState;
  conditional?: ConditionalSpecification;
}
export interface InputContext {
  name: string;
}
export type InputContextsList = InputContext[];
export type ContextTimeToLiveInSeconds = number;
export type ContextTurnsToLive = number;
export interface OutputContext {
  name: string;
  timeToLiveInSeconds: number;
  turnsToLive: number;
}
export type OutputContextsList = OutputContext[];
export type KendraIndexArn = string;
export type QueryFilterString = string;
export interface KendraConfiguration {
  kendraIndex: string;
  queryFilterStringEnabled?: boolean;
  queryFilterString?: string;
}
export interface InitialResponseSetting {
  initialResponse?: ResponseSpecification;
  nextStep?: DialogState;
  conditional?: ConditionalSpecification;
  codeHook?: DialogCodeHookInvocationSetting;
}
export type DomainEndpoint = string;
export type OSIndexName = string;
export type QuestionField = string;
export type AnswerField = string;
export interface ExactResponseFields {
  questionField: string;
  answerField: string;
}
export type IncludeField = string;
export type OSIncludeFields = string[];
export interface OpensearchConfiguration {
  domainEndpoint: string;
  indexName: string;
  exactResponse?: boolean;
  exactResponseFields?: ExactResponseFields;
  includeFields?: string[];
}
export interface QnAKendraConfiguration {
  kendraIndex: string;
  queryFilterStringEnabled?: boolean;
  queryFilterString?: string;
  exactResponse?: boolean;
}
export type BedrockKnowledgeBaseArn = string;
export interface BedrockKnowledgeStoreExactResponseFields {
  answerField?: string;
}
export interface BedrockKnowledgeStoreConfiguration {
  bedrockKnowledgeBaseArn: string;
  exactResponse?: boolean;
  exactResponseFields?: BedrockKnowledgeStoreExactResponseFields;
}
export interface DataSourceConfiguration {
  opensearchConfiguration?: OpensearchConfiguration;
  kendraConfiguration?: QnAKendraConfiguration;
  bedrockKnowledgeStoreConfiguration?: BedrockKnowledgeStoreConfiguration;
}
export interface QnAIntentConfiguration {
  dataSourceConfiguration?: DataSourceConfiguration;
  bedrockModelConfiguration?: BedrockModelSpecification;
}
export type QInConnectAssistantARN = string;
export interface QInConnectAssistantConfiguration {
  assistantArn: string;
}
export interface QInConnectIntentConfiguration {
  qInConnectAssistantConfiguration?: QInConnectAssistantConfiguration;
}
export interface CreateIntentRequest {
  intentName: string;
  intentDisplayName?: string;
  description?: string;
  parentIntentSignature?: string;
  sampleUtterances?: SampleUtterance[];
  dialogCodeHook?: DialogCodeHookSettings;
  fulfillmentCodeHook?: FulfillmentCodeHookSettings;
  intentConfirmationSetting?: IntentConfirmationSetting;
  intentClosingSetting?: IntentClosingSetting;
  inputContexts?: InputContext[];
  outputContexts?: OutputContext[];
  kendraConfiguration?: KendraConfiguration;
  botId: string;
  botVersion: string;
  localeId: string;
  initialResponseSetting?: InitialResponseSetting;
  qnAIntentConfiguration?: QnAIntentConfiguration;
  qInConnectIntentConfiguration?: QInConnectIntentConfiguration;
}
export interface CreateIntentResponse {
  intentId?: string;
  intentName?: string;
  intentDisplayName?: string;
  description?: string;
  parentIntentSignature?: string;
  sampleUtterances?: SampleUtterance[];
  dialogCodeHook?: DialogCodeHookSettings;
  fulfillmentCodeHook?: FulfillmentCodeHookSettings;
  intentConfirmationSetting?: IntentConfirmationSetting;
  intentClosingSetting?: IntentClosingSetting;
  inputContexts?: InputContext[];
  outputContexts?: OutputContext[];
  kendraConfiguration?: KendraConfiguration;
  botId?: string;
  botVersion?: string;
  localeId?: string;
  creationDateTime?: Date;
  initialResponseSetting?: InitialResponseSetting;
  qnAIntentConfiguration?: QnAIntentConfiguration;
  qInConnectIntentConfiguration?: QInConnectIntentConfiguration;
}
export type AmazonResourceName = string;
export type Policy = string;
export interface CreateResourcePolicyRequest {
  resourceArn: string;
  policy: string;
}
export type RevisionId = string;
export interface CreateResourcePolicyResponse {
  resourceArn?: string;
  revisionId?: string;
}
export type Effect = "Allow" | "Deny" | (string & {});
export type ServicePrincipal = string;
export type PrincipalArn = string;
export interface Principal {
  service?: string;
  arn?: string;
}
export type PrincipalList = Principal[];
export type Operation = string;
export type OperationList = string[];
export type ConditionOperator = string;
export type ConditionKey = string;
export type ConditionValue = string;
export type ConditionKeyValueMap = { [key: string]: string | undefined };
export type ConditionMap = {
  [key: string]: { [key: string]: string | undefined } | undefined;
};
export interface CreateResourcePolicyStatementRequest {
  resourceArn: string;
  statementId: string;
  effect: Effect;
  principal: Principal[];
  action: string[];
  condition?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  expectedRevisionId?: string;
}
export interface CreateResourcePolicyStatementResponse {
  resourceArn?: string;
  revisionId?: string;
}
export type BuiltInOrCustomSlotTypeId = string;
export type SlotDefaultValueString = string;
export interface SlotDefaultValue {
  defaultValue: string;
}
export type SlotDefaultValueList = SlotDefaultValue[];
export interface SlotDefaultValueSpecification {
  defaultValueList: SlotDefaultValue[];
}
export type SlotConstraint = "Required" | "Optional" | (string & {});
export type StillWaitingResponseFrequency = number;
export type StillWaitingResponseTimeout = number;
export interface StillWaitingResponseSpecification {
  messageGroups: MessageGroup[];
  frequencyInSeconds: number;
  timeoutInSeconds: number;
  allowInterrupt?: boolean;
}
export interface WaitAndContinueSpecification {
  waitingResponse: ResponseSpecification;
  continueResponse: ResponseSpecification;
  stillWaitingResponse?: StillWaitingResponseSpecification;
  active?: boolean;
}
export interface SlotCaptureSetting {
  captureResponse?: ResponseSpecification;
  captureNextStep?: DialogState;
  captureConditional?: ConditionalSpecification;
  failureResponse?: ResponseSpecification;
  failureNextStep?: DialogState;
  failureConditional?: ConditionalSpecification;
  codeHook?: DialogCodeHookInvocationSetting;
  elicitationCodeHook?: ElicitationCodeHookInvocationSetting;
}
export type SlotResolutionStrategy =
  | "EnhancedFallback"
  | "Default"
  | (string & {});
export interface SlotResolutionSetting {
  slotResolutionStrategy: SlotResolutionStrategy;
}
export interface SlotValueElicitationSetting {
  defaultValueSpecification?: SlotDefaultValueSpecification;
  slotConstraint: SlotConstraint;
  promptSpecification?: PromptSpecification;
  sampleUtterances?: SampleUtterance[];
  waitAndContinueSpecification?: WaitAndContinueSpecification;
  slotCaptureSetting?: SlotCaptureSetting;
  slotResolutionSetting?: SlotResolutionSetting;
}
export type ObfuscationSettingType =
  | "None"
  | "DefaultObfuscation"
  | (string & {});
export interface ObfuscationSetting {
  obfuscationSettingType: ObfuscationSettingType;
}
export interface MultipleValuesSetting {
  allowMultipleValues?: boolean;
}
export type SubSlotExpression = string;
export interface SubSlotValueElicitationSetting {
  defaultValueSpecification?: SlotDefaultValueSpecification;
  promptSpecification: PromptSpecification;
  sampleUtterances?: SampleUtterance[];
  waitAndContinueSpecification?: WaitAndContinueSpecification;
}
export interface Specifications {
  slotTypeId: string;
  valueElicitationSetting: SubSlotValueElicitationSetting;
}
export type SubSlotSpecificationMap = {
  [key: string]: Specifications | undefined;
};
export interface SubSlotSetting {
  expression?: string;
  slotSpecifications?: { [key: string]: Specifications | undefined };
}
export interface CreateSlotRequest {
  slotName: string;
  description?: string;
  slotTypeId?: string;
  valueElicitationSetting: SlotValueElicitationSetting;
  obfuscationSetting?: ObfuscationSetting;
  botId: string;
  botVersion: string;
  localeId: string;
  intentId: string;
  multipleValuesSetting?: MultipleValuesSetting;
  subSlotSetting?: SubSlotSetting;
}
export interface CreateSlotResponse {
  slotId?: string;
  slotName?: string;
  description?: string;
  slotTypeId?: string;
  valueElicitationSetting?: SlotValueElicitationSetting;
  obfuscationSetting?: ObfuscationSetting;
  botId?: string;
  botVersion?: string;
  localeId?: string;
  intentId?: string;
  creationDateTime?: Date;
  multipleValuesSetting?: MultipleValuesSetting;
  subSlotSetting?: SubSlotSetting;
}
export type Value = string;
export interface SampleValue {
  value: string;
}
export type SynonymList = SampleValue[];
export interface SlotTypeValue {
  sampleValue?: SampleValue;
  synonyms?: SampleValue[];
}
export type SlotTypeValues = SlotTypeValue[];
export type SlotValueResolutionStrategy =
  | "OriginalValue"
  | "TopResolution"
  | "Concatenation"
  | (string & {});
export type RegexPattern = string;
export interface SlotValueRegexFilter {
  pattern: string;
}
export type AudioRecognitionStrategy =
  | "UseSlotValuesAsCustomVocabulary"
  | (string & {});
export interface AdvancedRecognitionSetting {
  audioRecognitionStrategy?: AudioRecognitionStrategy;
}
export interface SlotValueSelectionSetting {
  resolutionStrategy: SlotValueResolutionStrategy;
  regexFilter?: SlotValueRegexFilter;
  advancedRecognitionSetting?: AdvancedRecognitionSetting;
}
export type SlotTypeSignature = string;
export type S3BucketName = string;
export type S3ObjectPath = string;
export interface GrammarSlotTypeSource {
  s3BucketName: string;
  s3ObjectKey: string;
  kmsKeyArn?: string;
}
export interface GrammarSlotTypeSetting {
  source?: GrammarSlotTypeSource;
}
export interface ExternalSourceSetting {
  grammarSlotTypeSetting?: GrammarSlotTypeSetting;
}
export interface SubSlotTypeComposition {
  name: string;
  slotTypeId: string;
}
export type SubSlotTypeList = SubSlotTypeComposition[];
export interface CompositeSlotTypeSetting {
  subSlots?: SubSlotTypeComposition[];
}
export interface CreateSlotTypeRequest {
  slotTypeName: string;
  description?: string;
  slotTypeValues?: SlotTypeValue[];
  valueSelectionSetting?: SlotValueSelectionSetting;
  parentSlotTypeSignature?: string;
  botId: string;
  botVersion: string;
  localeId: string;
  externalSourceSetting?: ExternalSourceSetting;
  compositeSlotTypeSetting?: CompositeSlotTypeSetting;
}
export interface CreateSlotTypeResponse {
  slotTypeId?: string;
  slotTypeName?: string;
  description?: string;
  slotTypeValues?: SlotTypeValue[];
  valueSelectionSetting?: SlotValueSelectionSetting;
  parentSlotTypeSignature?: string;
  botId?: string;
  botVersion?: string;
  localeId?: string;
  creationDateTime?: Date;
  externalSourceSetting?: ExternalSourceSetting;
  compositeSlotTypeSetting?: CompositeSlotTypeSetting;
}
export interface TestSetDiscrepancyReportBotAliasTarget {
  botId: string;
  botAliasId: string;
  localeId: string;
}
export interface TestSetDiscrepancyReportResourceTarget {
  botAliasTarget?: TestSetDiscrepancyReportBotAliasTarget;
}
export interface CreateTestSetDiscrepancyReportRequest {
  testSetId: string;
  target: TestSetDiscrepancyReportResourceTarget;
}
export interface CreateTestSetDiscrepancyReportResponse {
  testSetDiscrepancyReportId?: string;
  creationDateTime?: Date;
  testSetId?: string;
  target?: TestSetDiscrepancyReportResourceTarget;
}
export interface CreateUploadUrlRequest {}
export type PresignedS3Url = string;
export interface CreateUploadUrlResponse {
  importId?: string;
  uploadUrl?: string;
}
export type SkipResourceInUseCheck = boolean;
export interface DeleteBotRequest {
  botId: string;
  skipResourceInUseCheck?: boolean;
}
export interface DeleteBotResponse {
  botId?: string;
  botStatus?: BotStatus;
}
export interface DeleteBotAliasRequest {
  botAliasId: string;
  botId: string;
  skipResourceInUseCheck?: boolean;
}
export interface DeleteBotAliasResponse {
  botAliasId?: string;
  botId?: string;
  botAliasStatus?: BotAliasStatus;
}
export type UUID = string;
export interface DeleteBotAnalyzerRecommendationRequest {
  botId: string;
  botAnalyzerRequestId: string;
}
export interface DeleteBotAnalyzerRecommendationResponse {}
export interface DeleteBotLocaleRequest {
  botId: string;
  botVersion: string;
  localeId: string;
}
export interface DeleteBotLocaleResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  botLocaleStatus?: BotLocaleStatus;
}
export interface DeleteBotReplicaRequest {
  botId: string;
  replicaRegion: string;
}
export interface DeleteBotReplicaResponse {
  botId?: string;
  replicaRegion?: string;
  botReplicaStatus?: BotReplicaStatus;
}
export interface DeleteBotVersionRequest {
  botId: string;
  botVersion: string;
  skipResourceInUseCheck?: boolean;
}
export interface DeleteBotVersionResponse {
  botId?: string;
  botVersion?: string;
  botStatus?: BotStatus;
}
export interface DeleteCustomVocabularyRequest {
  botId: string;
  botVersion: string;
  localeId: string;
}
export type CustomVocabularyStatus =
  | "Ready"
  | "Deleting"
  | "Exporting"
  | "Importing"
  | "Creating"
  | (string & {});
export interface DeleteCustomVocabularyResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  customVocabularyStatus?: CustomVocabularyStatus;
}
export interface DeleteExportRequest {
  exportId: string;
}
export interface DeleteExportResponse {
  exportId?: string;
  exportStatus?: ExportStatus;
}
export interface DeleteImportRequest {
  importId: string;
}
export type ImportStatus =
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Deleting"
  | (string & {});
export interface DeleteImportResponse {
  importId?: string;
  importStatus?: ImportStatus;
}
export interface DeleteIntentRequest {
  intentId: string;
  botId: string;
  botVersion: string;
  localeId: string;
}
export interface DeleteIntentResponse {}
export interface DeleteResourcePolicyRequest {
  resourceArn: string;
  expectedRevisionId?: string;
}
export interface DeleteResourcePolicyResponse {
  resourceArn?: string;
  revisionId?: string;
}
export interface DeleteResourcePolicyStatementRequest {
  resourceArn: string;
  statementId: string;
  expectedRevisionId?: string;
}
export interface DeleteResourcePolicyStatementResponse {
  resourceArn?: string;
  revisionId?: string;
}
export interface DeleteSlotRequest {
  slotId: string;
  botId: string;
  botVersion: string;
  localeId: string;
  intentId: string;
}
export interface DeleteSlotResponse {}
export interface DeleteSlotTypeRequest {
  slotTypeId: string;
  botId: string;
  botVersion: string;
  localeId: string;
  skipResourceInUseCheck?: boolean;
}
export interface DeleteSlotTypeResponse {}
export interface DeleteTestSetRequest {
  testSetId: string;
}
export interface DeleteTestSetResponse {}
export type SessionId = string;
export interface DeleteUtterancesRequest {
  botId: string;
  localeId?: string;
  sessionId?: string;
}
export interface DeleteUtterancesResponse {}
export interface DescribeBotRequest {
  botId: string;
}
export type FailureReason = string;
export type FailureReasons = string[];
export interface DescribeBotResponse {
  botId?: string;
  botName?: string;
  description?: string;
  roleArn?: string;
  dataPrivacy?: DataPrivacy;
  idleSessionTTLInSeconds?: number;
  botStatus?: BotStatus;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  botType?: BotType;
  botMembers?: BotMember[];
  failureReasons?: string[];
  errorLogSettings?: ErrorLogSettings;
}
export interface DescribeBotAliasRequest {
  botAliasId: string;
  botId: string;
}
export interface BotAliasHistoryEvent {
  botVersion?: string;
  startDate?: Date;
  endDate?: Date;
}
export type BotAliasHistoryEventsList = BotAliasHistoryEvent[];
export interface ParentBotNetwork {
  botId: string;
  botVersion: string;
}
export type ParentBotNetworks = ParentBotNetwork[];
export interface DescribeBotAliasResponse {
  botAliasId?: string;
  botAliasName?: string;
  description?: string;
  botVersion?: string;
  botAliasLocaleSettings?: {
    [key: string]: BotAliasLocaleSettings | undefined;
  };
  conversationLogSettings?: ConversationLogSettings;
  sentimentAnalysisSettings?: SentimentAnalysisSettings;
  botAliasHistoryEvents?: BotAliasHistoryEvent[];
  botAliasStatus?: BotAliasStatus;
  botId?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  parentBotNetworks?: ParentBotNetwork[];
}
export type NextToken = string;
export type MaxResults = number;
export interface DescribeBotAnalyzerRecommendationRequest {
  botId: string;
  botAnalyzerRequestId: string;
  nextToken?: string;
  maxResults?: number;
}
export type BotAnalyzerStatus =
  | "Processing"
  | "Available"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | (string & {});
export interface IssueLocation {
  botLocale?: string;
  intentId?: string;
  slotId?: string;
}
export type Priority = "High" | "Medium" | "Low" | (string & {});
export interface BotAnalyzerRecommendation {
  issueLocation: IssueLocation;
  priority: Priority;
  issueDescription: string;
  proposedFix: string;
}
export type BotAnalyzerRecommendationList = BotAnalyzerRecommendation[];
export interface DescribeBotAnalyzerRecommendationResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  botAnalyzerStatus?: BotAnalyzerStatus;
  creationDateTime?: Date;
  botAnalyzerRecommendationList?: BotAnalyzerRecommendation[];
  nextToken?: string;
}
export interface DescribeBotLocaleRequest {
  botId: string;
  botVersion: string;
  localeId: string;
}
export type ResourceCount = number;
export type BotLocaleHistoryEventDescription = string;
export interface BotLocaleHistoryEvent {
  event: string;
  eventDate: Date;
}
export type BotLocaleHistoryEventsList = BotLocaleHistoryEvent[];
export type RecommendedAction = string;
export type RecommendedActions = string[];
export interface DescribeBotLocaleResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  localeName?: string;
  description?: string;
  nluIntentConfidenceThreshold?: number;
  voiceSettings?: VoiceSettings;
  unifiedSpeechSettings?: UnifiedSpeechSettings;
  audioFillerSettings?: AudioFillerSettings;
  speechRecognitionSettings?: SpeechRecognitionSettings;
  intentsCount?: number;
  slotTypesCount?: number;
  botLocaleStatus?: BotLocaleStatus;
  failureReasons?: string[];
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  lastBuildSubmittedDateTime?: Date;
  botLocaleHistoryEvents?: BotLocaleHistoryEvent[];
  recommendedActions?: string[];
  generativeAISettings?: GenerativeAISettings;
  speechDetectionSensitivity?: SpeechDetectionSensitivity;
}
export interface DescribeBotRecommendationRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  botRecommendationId: string;
}
export type BotRecommendationStatus =
  | "Processing"
  | "Deleting"
  | "Deleted"
  | "Downloading"
  | "Updating"
  | "Available"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | (string & {});
export type ObjectPrefix = string;
export type ObjectPrefixes = string[];
export interface PathFormat {
  objectPrefixes?: string[];
}
export type TranscriptFormat = "Lex" | (string & {});
export interface DateRangeFilter {
  startDateTime: Date;
  endDateTime: Date;
}
export interface LexTranscriptFilter {
  dateRangeFilter?: DateRangeFilter;
}
export interface TranscriptFilter {
  lexTranscriptFilter?: LexTranscriptFilter;
}
export interface S3BucketTranscriptSource {
  s3BucketName: string;
  pathFormat?: PathFormat;
  transcriptFormat: TranscriptFormat;
  transcriptFilter?: TranscriptFilter;
  kmsKeyArn?: string;
}
export interface TranscriptSourceSetting {
  s3BucketTranscriptSource?: S3BucketTranscriptSource;
}
export type FilePassword = string | redacted.Redacted<string>;
export interface EncryptionSetting {
  kmsKeyArn?: string;
  botLocaleExportPassword?: string | redacted.Redacted<string>;
  associatedTranscriptsPassword?: string | redacted.Redacted<string>;
}
export type Count = number;
export interface IntentStatistics {
  discoveredIntentCount?: number;
}
export interface SlotTypeStatistics {
  discoveredSlotTypeCount?: number;
}
export interface BotRecommendationResultStatistics {
  intents?: IntentStatistics;
  slotTypes?: SlotTypeStatistics;
}
export interface BotRecommendationResults {
  botLocaleExportUrl?: string;
  associatedTranscriptsUrl?: string;
  statistics?: BotRecommendationResultStatistics;
}
export interface DescribeBotRecommendationResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  botRecommendationStatus?: BotRecommendationStatus;
  botRecommendationId?: string;
  failureReasons?: string[];
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  transcriptSourceSetting?: TranscriptSourceSetting;
  encryptionSetting?: EncryptionSetting;
  botRecommendationResults?: BotRecommendationResults;
}
export interface DescribeBotReplicaRequest {
  botId: string;
  replicaRegion: string;
}
export interface DescribeBotReplicaResponse {
  botId?: string;
  replicaRegion?: string;
  sourceRegion?: string;
  creationDateTime?: Date;
  botReplicaStatus?: BotReplicaStatus;
  failureReasons?: string[];
}
export interface DescribeBotResourceGenerationRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  generationId: string;
}
export type GenerationStatus =
  | "Failed"
  | "Complete"
  | "InProgress"
  | (string & {});
export type GenerationInput = string;
export interface DescribeBotResourceGenerationResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  generationId?: string;
  failureReasons?: string[];
  generationStatus?: GenerationStatus;
  generationInputPrompt?: string;
  generatedBotLocaleUrl?: string;
  creationDateTime?: Date;
  modelArn?: string;
  lastUpdatedDateTime?: Date;
}
export interface DescribeBotVersionRequest {
  botId: string;
  botVersion: string;
}
export interface DescribeBotVersionResponse {
  botId?: string;
  botName?: string;
  botVersion?: string;
  description?: string;
  roleArn?: string;
  dataPrivacy?: DataPrivacy;
  idleSessionTTLInSeconds?: number;
  botStatus?: BotStatus;
  failureReasons?: string[];
  creationDateTime?: Date;
  parentBotNetworks?: ParentBotNetwork[];
  botType?: BotType;
  botMembers?: BotMember[];
}
export interface DescribeCustomVocabularyMetadataRequest {
  botId: string;
  botVersion: string;
  localeId: string;
}
export interface DescribeCustomVocabularyMetadataResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  customVocabularyStatus?: CustomVocabularyStatus;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export interface DescribeExportRequest {
  exportId: string;
}
export interface DescribeExportResponse {
  exportId?: string;
  resourceSpecification?: ExportResourceSpecification;
  fileFormat?: ImportExportFileFormat;
  exportStatus?: ExportStatus;
  failureReasons?: string[];
  downloadUrl?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export interface DescribeImportRequest {
  importId: string;
}
export interface BotImportSpecification {
  botName: string;
  roleArn: string;
  dataPrivacy: DataPrivacy;
  errorLogSettings?: ErrorLogSettings;
  idleSessionTTLInSeconds?: number;
  botTags?: { [key: string]: string | undefined };
  testBotAliasTags?: { [key: string]: string | undefined };
}
export interface BotLocaleImportSpecification {
  botId: string;
  botVersion: string;
  localeId: string;
  nluIntentConfidenceThreshold?: number;
  voiceSettings?: VoiceSettings;
  speechRecognitionSettings?: SpeechRecognitionSettings;
  speechDetectionSensitivity?: SpeechDetectionSensitivity;
  unifiedSpeechSettings?: UnifiedSpeechSettings;
  audioFillerSettings?: AudioFillerSettings;
}
export interface CustomVocabularyImportSpecification {
  botId: string;
  botVersion: string;
  localeId: string;
}
export interface TestSetStorageLocation {
  s3BucketName: string;
  s3Path: string;
  kmsKeyArn?: string;
}
export interface TestSetImportInputLocation {
  s3BucketName: string;
  s3Path: string;
}
export type TestSetModality = "Text" | "Audio" | (string & {});
export interface TestSetImportResourceSpecification {
  testSetName: string;
  description?: string;
  roleArn: string;
  storageLocation: TestSetStorageLocation;
  importInputLocation: TestSetImportInputLocation;
  modality: TestSetModality;
  testSetTags?: { [key: string]: string | undefined };
}
export interface ImportResourceSpecification {
  botImportSpecification?: BotImportSpecification;
  botLocaleImportSpecification?: BotLocaleImportSpecification;
  customVocabularyImportSpecification?: CustomVocabularyImportSpecification;
  testSetImportResourceSpecification?: TestSetImportResourceSpecification;
}
export type ImportedResourceId = string;
export type MergeStrategy =
  | "Overwrite"
  | "FailOnConflict"
  | "Append"
  | (string & {});
export interface DescribeImportResponse {
  importId?: string;
  resourceSpecification?: ImportResourceSpecification;
  importedResourceId?: string;
  importedResourceName?: string;
  mergeStrategy?: MergeStrategy;
  importStatus?: ImportStatus;
  failureReasons?: string[];
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export interface DescribeIntentRequest {
  intentId: string;
  botId: string;
  botVersion: string;
  localeId: string;
}
export type PriorityValue = number;
export interface SlotPriority {
  priority: number;
  slotId: string;
}
export type SlotPrioritiesList = SlotPriority[];
export interface DescribeIntentResponse {
  intentId?: string;
  intentName?: string;
  intentDisplayName?: string;
  description?: string;
  parentIntentSignature?: string;
  sampleUtterances?: SampleUtterance[];
  dialogCodeHook?: DialogCodeHookSettings;
  fulfillmentCodeHook?: FulfillmentCodeHookSettings;
  slotPriorities?: SlotPriority[];
  intentConfirmationSetting?: IntentConfirmationSetting;
  intentClosingSetting?: IntentClosingSetting;
  inputContexts?: InputContext[];
  outputContexts?: OutputContext[];
  kendraConfiguration?: KendraConfiguration;
  botId?: string;
  botVersion?: string;
  localeId?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  initialResponseSetting?: InitialResponseSetting;
  qnAIntentConfiguration?: QnAIntentConfiguration;
  qInConnectIntentConfiguration?: QInConnectIntentConfiguration;
}
export interface DescribeResourcePolicyRequest {
  resourceArn: string;
}
export interface DescribeResourcePolicyResponse {
  resourceArn?: string;
  policy?: string;
  revisionId?: string;
}
export interface DescribeSlotRequest {
  slotId: string;
  botId: string;
  botVersion: string;
  localeId: string;
  intentId: string;
}
export interface DescribeSlotResponse {
  slotId?: string;
  slotName?: string;
  description?: string;
  slotTypeId?: string;
  valueElicitationSetting?: SlotValueElicitationSetting;
  obfuscationSetting?: ObfuscationSetting;
  botId?: string;
  botVersion?: string;
  localeId?: string;
  intentId?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  multipleValuesSetting?: MultipleValuesSetting;
  subSlotSetting?: SubSlotSetting;
}
export interface DescribeSlotTypeRequest {
  slotTypeId: string;
  botId: string;
  botVersion: string;
  localeId: string;
}
export interface DescribeSlotTypeResponse {
  slotTypeId?: string;
  slotTypeName?: string;
  description?: string;
  slotTypeValues?: SlotTypeValue[];
  valueSelectionSetting?: SlotValueSelectionSetting;
  parentSlotTypeSignature?: string;
  botId?: string;
  botVersion?: string;
  localeId?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  externalSourceSetting?: ExternalSourceSetting;
  compositeSlotTypeSetting?: CompositeSlotTypeSetting;
}
export interface DescribeTestExecutionRequest {
  testExecutionId: string;
}
export type TestExecutionStatus =
  | "Pending"
  | "Waiting"
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | (string & {});
export interface BotAliasTestExecutionTarget {
  botId: string;
  botAliasId: string;
  localeId: string;
}
export interface TestExecutionTarget {
  botAliasTarget?: BotAliasTestExecutionTarget;
}
export type TestExecutionApiMode = "Streaming" | "NonStreaming" | (string & {});
export type TestExecutionModality = "Text" | "Audio" | (string & {});
export interface DescribeTestExecutionResponse {
  testExecutionId?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  testExecutionStatus?: TestExecutionStatus;
  testSetId?: string;
  testSetName?: string;
  target?: TestExecutionTarget;
  apiMode?: TestExecutionApiMode;
  testExecutionModality?: TestExecutionModality;
  failureReasons?: string[];
}
export interface DescribeTestSetRequest {
  testSetId: string;
}
export type TestSetStatus =
  | "Importing"
  | "PendingAnnotation"
  | "Deleting"
  | "ValidationError"
  | "Ready"
  | (string & {});
export interface DescribeTestSetResponse {
  testSetId?: string;
  testSetName?: string;
  description?: string;
  modality?: TestSetModality;
  status?: TestSetStatus;
  roleArn?: string;
  numTurns?: number;
  storageLocation?: TestSetStorageLocation;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export interface DescribeTestSetDiscrepancyReportRequest {
  testSetDiscrepancyReportId: string;
}
export type TestSetDiscrepancyReportStatus =
  | "InProgress"
  | "Completed"
  | "Failed"
  | (string & {});
export interface TestSetIntentDiscrepancyItem {
  intentName: string;
  errorMessage: string;
}
export type TestSetIntentDiscrepancyList = TestSetIntentDiscrepancyItem[];
export interface TestSetSlotDiscrepancyItem {
  intentName: string;
  slotName: string;
  errorMessage: string;
}
export type TestSetSlotDiscrepancyList = TestSetSlotDiscrepancyItem[];
export interface TestSetDiscrepancyErrors {
  intentDiscrepancies: TestSetIntentDiscrepancyItem[];
  slotDiscrepancies: TestSetSlotDiscrepancyItem[];
}
export interface DescribeTestSetDiscrepancyReportResponse {
  testSetDiscrepancyReportId?: string;
  testSetId?: string;
  creationDateTime?: Date;
  target?: TestSetDiscrepancyReportResourceTarget;
  testSetDiscrepancyReportStatus?: TestSetDiscrepancyReportStatus;
  lastUpdatedDataTime?: Date;
  testSetDiscrepancyTopErrors?: TestSetDiscrepancyErrors;
  testSetDiscrepancyRawOutputUrl?: string;
  failureReasons?: string[];
}
export interface DescribeTestSetGenerationRequest {
  testSetGenerationId: string;
}
export type TestSetGenerationStatus =
  | "Generating"
  | "Ready"
  | "Failed"
  | "Pending"
  | (string & {});
export type ConversationLogsInputModeFilter = "Speech" | "Text" | (string & {});
export interface ConversationLogsDataSourceFilterBy {
  startTime: Date;
  endTime: Date;
  inputMode: ConversationLogsInputModeFilter;
}
export interface ConversationLogsDataSource {
  botId: string;
  botAliasId: string;
  localeId: string;
  filter: ConversationLogsDataSourceFilterBy;
}
export interface TestSetGenerationDataSource {
  conversationLogsDataSource?: ConversationLogsDataSource;
}
export interface DescribeTestSetGenerationResponse {
  testSetGenerationId?: string;
  testSetGenerationStatus?: TestSetGenerationStatus;
  failureReasons?: string[];
  testSetId?: string;
  testSetName?: string;
  description?: string;
  storageLocation?: TestSetStorageLocation;
  generationDataSource?: TestSetGenerationDataSource;
  roleArn?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export interface GenerateBotElementRequest {
  intentId: string;
  botId: string;
  botVersion: string;
  localeId: string;
}
export interface GenerateBotElementResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  intentId?: string;
  sampleUtterances?: SampleUtterance[];
}
export interface GetTestExecutionArtifactsUrlRequest {
  testExecutionId: string;
}
export interface GetTestExecutionArtifactsUrlResponse {
  testExecutionId?: string;
  downloadArtifactsUrl?: string;
}
export type TimeDimension = "Hours" | "Days" | "Weeks" | (string & {});
export type TimeValue = number;
export interface RelativeAggregationDuration {
  timeDimension: TimeDimension;
  timeValue: number;
}
export interface UtteranceAggregationDuration {
  relativeAggregationDuration: RelativeAggregationDuration;
}
export type AggregatedUtterancesSortAttribute =
  | "HitCount"
  | "MissedCount"
  | (string & {});
export type SortOrder = "Ascending" | "Descending" | (string & {});
export interface AggregatedUtterancesSortBy {
  attribute: AggregatedUtterancesSortAttribute;
  order: SortOrder;
}
export type AggregatedUtterancesFilterName = "Utterance" | (string & {});
export type FilterValue = string;
export type FilterValues = string[];
export type AggregatedUtterancesFilterOperator = "CO" | "EQ" | (string & {});
export interface AggregatedUtterancesFilter {
  name: AggregatedUtterancesFilterName;
  values: string[];
  operator: AggregatedUtterancesFilterOperator;
}
export type AggregatedUtterancesFilters = AggregatedUtterancesFilter[];
export interface ListAggregatedUtterancesRequest {
  botId: string;
  botAliasId?: string;
  botVersion?: string;
  localeId: string;
  aggregationDuration: UtteranceAggregationDuration;
  sortBy?: AggregatedUtterancesSortBy;
  filters?: AggregatedUtterancesFilter[];
  maxResults?: number;
  nextToken?: string;
}
export type HitCount = number;
export type MissedCount = number;
export interface AggregatedUtterancesSummary {
  utterance?: string;
  hitCount?: number;
  missedCount?: number;
  utteranceFirstRecordedInAggregationDuration?: Date;
  utteranceLastRecordedInAggregationDuration?: Date;
  containsDataFromDeletedResources?: boolean;
}
export type AggregatedUtterancesSummaryList = AggregatedUtterancesSummary[];
export interface ListAggregatedUtterancesResponse {
  botId?: string;
  botAliasId?: string;
  botVersion?: string;
  localeId?: string;
  aggregationDuration?: UtteranceAggregationDuration;
  aggregationWindowStartTime?: Date;
  aggregationWindowEndTime?: Date;
  aggregationLastRefreshedDateTime?: Date;
  aggregatedUtterancesSummaries?: AggregatedUtterancesSummary[];
  nextToken?: string;
}
export interface ListBotAliasesRequest {
  botId: string;
  maxResults?: number;
  nextToken?: string;
}
export interface BotAliasSummary {
  botAliasId?: string;
  botAliasName?: string;
  description?: string;
  botVersion?: string;
  botAliasStatus?: BotAliasStatus;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export type BotAliasSummaryList = BotAliasSummary[];
export interface ListBotAliasesResponse {
  botAliasSummaries?: BotAliasSummary[];
  nextToken?: string;
  botId?: string;
}
export interface ListBotAliasReplicasRequest {
  botId: string;
  replicaRegion: string;
  maxResults?: number;
  nextToken?: string;
}
export type BotAliasReplicationStatus =
  | "Creating"
  | "Updating"
  | "Available"
  | "Deleting"
  | "Failed"
  | (string & {});
export interface BotAliasReplicaSummary {
  botAliasId?: string;
  botAliasReplicationStatus?: BotAliasReplicationStatus;
  botVersion?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReasons?: string[];
}
export type BotAliasReplicaSummaryList = BotAliasReplicaSummary[];
export interface ListBotAliasReplicasResponse {
  botId?: string;
  sourceRegion?: string;
  replicaRegion?: string;
  botAliasReplicaSummaries?: BotAliasReplicaSummary[];
  nextToken?: string;
}
export interface ListBotAnalyzerHistoryRequest {
  botId: string;
  localeId?: string;
  botVersion?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface BotAnalyzerHistorySummary {
  botAnalyzerStatus: BotAnalyzerStatus;
  creationDateTime?: Date;
  botAnalyzerRequestId: string;
}
export type BotAnalyzerHistoryList = BotAnalyzerHistorySummary[];
export interface ListBotAnalyzerHistoryResponse {
  botId?: string;
  localeId?: string;
  botVersion?: string;
  botAnalyzerHistoryList?: BotAnalyzerHistorySummary[];
  nextToken?: string;
}
export type BotLocaleSortAttribute = "BotLocaleName" | (string & {});
export interface BotLocaleSortBy {
  attribute: BotLocaleSortAttribute;
  order: SortOrder;
}
export type BotLocaleFilterName = "BotLocaleName" | (string & {});
export type BotLocaleFilterOperator = "CO" | "EQ" | (string & {});
export interface BotLocaleFilter {
  name: BotLocaleFilterName;
  values: string[];
  operator: BotLocaleFilterOperator;
}
export type BotLocaleFilters = BotLocaleFilter[];
export interface ListBotLocalesRequest {
  botId: string;
  botVersion: string;
  sortBy?: BotLocaleSortBy;
  filters?: BotLocaleFilter[];
  maxResults?: number;
  nextToken?: string;
}
export interface BotLocaleSummary {
  localeId?: string;
  localeName?: string;
  description?: string;
  botLocaleStatus?: BotLocaleStatus;
  lastUpdatedDateTime?: Date;
  lastBuildSubmittedDateTime?: Date;
}
export type BotLocaleSummaryList = BotLocaleSummary[];
export interface ListBotLocalesResponse {
  botId?: string;
  botVersion?: string;
  nextToken?: string;
  botLocaleSummaries?: BotLocaleSummary[];
}
export interface ListBotRecommendationsRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  maxResults?: number;
  nextToken?: string;
}
export interface BotRecommendationSummary {
  botRecommendationStatus: BotRecommendationStatus;
  botRecommendationId: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export type BotRecommendationSummaryList = BotRecommendationSummary[];
export interface ListBotRecommendationsResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  botRecommendationSummaries?: BotRecommendationSummary[];
  nextToken?: string;
}
export interface ListBotReplicasRequest {
  botId: string;
}
export interface BotReplicaSummary {
  replicaRegion?: string;
  creationDateTime?: Date;
  botReplicaStatus?: BotReplicaStatus;
  failureReasons?: string[];
}
export type BotReplicaSummaryList = BotReplicaSummary[];
export interface ListBotReplicasResponse {
  botId?: string;
  sourceRegion?: string;
  botReplicaSummaries?: BotReplicaSummary[];
}
export type GenerationSortByAttribute =
  | "creationStartTime"
  | "lastUpdatedTime"
  | (string & {});
export interface GenerationSortBy {
  attribute: GenerationSortByAttribute;
  order: SortOrder;
}
export interface ListBotResourceGenerationsRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  sortBy?: GenerationSortBy;
  maxResults?: number;
  nextToken?: string;
}
export interface GenerationSummary {
  generationId?: string;
  generationStatus?: GenerationStatus;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export type GenerationSummaryList = GenerationSummary[];
export interface ListBotResourceGenerationsResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  generationSummaries?: GenerationSummary[];
  nextToken?: string;
}
export type BotSortAttribute = "BotName" | (string & {});
export interface BotSortBy {
  attribute: BotSortAttribute;
  order: SortOrder;
}
export type BotFilterName = "BotName" | "BotType" | (string & {});
export type BotFilterOperator = "CO" | "EQ" | "NE" | (string & {});
export interface BotFilter {
  name: BotFilterName;
  values: string[];
  operator: BotFilterOperator;
}
export type BotFilters = BotFilter[];
export interface ListBotsRequest {
  sortBy?: BotSortBy;
  filters?: BotFilter[];
  maxResults?: number;
  nextToken?: string;
}
export interface BotSummary {
  botId?: string;
  botName?: string;
  description?: string;
  botStatus?: BotStatus;
  latestBotVersion?: string;
  lastUpdatedDateTime?: Date;
  botType?: BotType;
}
export type BotSummaryList = BotSummary[];
export interface ListBotsResponse {
  botSummaries?: BotSummary[];
  nextToken?: string;
}
export type BotVersionReplicaSortAttribute = "BotVersion" | (string & {});
export interface BotVersionReplicaSortBy {
  attribute: BotVersionReplicaSortAttribute;
  order: SortOrder;
}
export interface ListBotVersionReplicasRequest {
  botId: string;
  replicaRegion: string;
  maxResults?: number;
  nextToken?: string;
  sortBy?: BotVersionReplicaSortBy;
}
export type BotVersionReplicationStatus =
  | "Creating"
  | "Available"
  | "Deleting"
  | "Failed"
  | (string & {});
export interface BotVersionReplicaSummary {
  botVersion?: string;
  botVersionReplicationStatus?: BotVersionReplicationStatus;
  creationDateTime?: Date;
  failureReasons?: string[];
}
export type BotVersionReplicaSummaryList = BotVersionReplicaSummary[];
export interface ListBotVersionReplicasResponse {
  botId?: string;
  sourceRegion?: string;
  replicaRegion?: string;
  botVersionReplicaSummaries?: BotVersionReplicaSummary[];
  nextToken?: string;
}
export type BotVersionSortAttribute = "BotVersion" | (string & {});
export interface BotVersionSortBy {
  attribute: BotVersionSortAttribute;
  order: SortOrder;
}
export interface ListBotVersionsRequest {
  botId: string;
  sortBy?: BotVersionSortBy;
  maxResults?: number;
  nextToken?: string;
}
export interface BotVersionSummary {
  botName?: string;
  botVersion?: string;
  description?: string;
  botStatus?: BotStatus;
  creationDateTime?: Date;
}
export type BotVersionSummaryList = BotVersionSummary[];
export interface ListBotVersionsResponse {
  botId?: string;
  botVersionSummaries?: BotVersionSummary[];
  nextToken?: string;
}
export type BuiltInIntentSortAttribute = "IntentSignature" | (string & {});
export interface BuiltInIntentSortBy {
  attribute: BuiltInIntentSortAttribute;
  order: SortOrder;
}
export type BuiltInsMaxResults = number;
export interface ListBuiltInIntentsRequest {
  localeId: string;
  sortBy?: BuiltInIntentSortBy;
  maxResults?: number;
  nextToken?: string;
}
export interface BuiltInIntentSummary {
  intentSignature?: string;
  description?: string;
}
export type BuiltInIntentSummaryList = BuiltInIntentSummary[];
export interface ListBuiltInIntentsResponse {
  builtInIntentSummaries?: BuiltInIntentSummary[];
  nextToken?: string;
  localeId?: string;
}
export type BuiltInSlotTypeSortAttribute = "SlotTypeSignature" | (string & {});
export interface BuiltInSlotTypeSortBy {
  attribute: BuiltInSlotTypeSortAttribute;
  order: SortOrder;
}
export interface ListBuiltInSlotTypesRequest {
  localeId: string;
  sortBy?: BuiltInSlotTypeSortBy;
  maxResults?: number;
  nextToken?: string;
}
export interface BuiltInSlotTypeSummary {
  slotTypeSignature?: string;
  description?: string;
}
export type BuiltInSlotTypeSummaryList = BuiltInSlotTypeSummary[];
export interface ListBuiltInSlotTypesResponse {
  builtInSlotTypeSummaries?: BuiltInSlotTypeSummary[];
  nextToken?: string;
  localeId?: string;
}
export interface ListCustomVocabularyItemsRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ListCustomVocabularyItemsResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  customVocabularyItems?: CustomVocabularyItem[];
  nextToken?: string;
}
export type ExportSortAttribute = "LastUpdatedDateTime" | (string & {});
export interface ExportSortBy {
  attribute: ExportSortAttribute;
  order: SortOrder;
}
export type ExportFilterName = "ExportResourceType" | (string & {});
export type ExportFilterOperator = "CO" | "EQ" | (string & {});
export interface ExportFilter {
  name: ExportFilterName;
  values: string[];
  operator: ExportFilterOperator;
}
export type ExportFilters = ExportFilter[];
export interface ListExportsRequest {
  botId?: string;
  botVersion?: string;
  sortBy?: ExportSortBy;
  filters?: ExportFilter[];
  maxResults?: number;
  nextToken?: string;
  localeId?: string;
}
export interface ExportSummary {
  exportId?: string;
  resourceSpecification?: ExportResourceSpecification;
  fileFormat?: ImportExportFileFormat;
  exportStatus?: ExportStatus;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export type ExportSummaryList = ExportSummary[];
export interface ListExportsResponse {
  botId?: string;
  botVersion?: string;
  exportSummaries?: ExportSummary[];
  nextToken?: string;
  localeId?: string;
}
export type ImportSortAttribute = "LastUpdatedDateTime" | (string & {});
export interface ImportSortBy {
  attribute: ImportSortAttribute;
  order: SortOrder;
}
export type ImportFilterName = "ImportResourceType" | (string & {});
export type ImportFilterOperator = "CO" | "EQ" | (string & {});
export interface ImportFilter {
  name: ImportFilterName;
  values: string[];
  operator: ImportFilterOperator;
}
export type ImportFilters = ImportFilter[];
export interface ListImportsRequest {
  botId?: string;
  botVersion?: string;
  sortBy?: ImportSortBy;
  filters?: ImportFilter[];
  maxResults?: number;
  nextToken?: string;
  localeId?: string;
}
export type ImportResourceType =
  | "Bot"
  | "BotLocale"
  | "CustomVocabulary"
  | "TestSet"
  | (string & {});
export interface ImportSummary {
  importId?: string;
  importedResourceId?: string;
  importedResourceName?: string;
  importStatus?: ImportStatus;
  mergeStrategy?: MergeStrategy;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  importedResourceType?: ImportResourceType;
}
export type ImportSummaryList = ImportSummary[];
export interface ListImportsResponse {
  botId?: string;
  botVersion?: string;
  importSummaries?: ImportSummary[];
  nextToken?: string;
  localeId?: string;
}
export type AnalyticsIntentMetricName =
  | "Count"
  | "Success"
  | "Failure"
  | "Switched"
  | "Dropped"
  | (string & {});
export type AnalyticsMetricStatistic = "Sum" | "Avg" | "Max" | (string & {});
export type AnalyticsSortOrder = "Ascending" | "Descending" | (string & {});
export interface AnalyticsIntentMetric {
  name: AnalyticsIntentMetricName;
  statistic: AnalyticsMetricStatistic;
  order?: AnalyticsSortOrder;
}
export type AnalyticsIntentMetrics = AnalyticsIntentMetric[];
export type AnalyticsBinByName =
  | "ConversationStartTime"
  | "UtteranceTimestamp"
  | (string & {});
export type AnalyticsInterval = "OneHour" | "OneDay" | (string & {});
export interface AnalyticsBinBySpecification {
  name: AnalyticsBinByName;
  interval: AnalyticsInterval;
  order?: AnalyticsSortOrder;
}
export type AnalyticsBinByList = AnalyticsBinBySpecification[];
export type AnalyticsIntentField =
  | "IntentName"
  | "IntentEndState"
  | "IntentLevel"
  | (string & {});
export interface AnalyticsIntentGroupBySpecification {
  name: AnalyticsIntentField;
}
export type AnalyticsIntentGroupByList = AnalyticsIntentGroupBySpecification[];
export type AnalyticsIntentFilterName =
  | "BotAliasId"
  | "BotVersion"
  | "LocaleId"
  | "Modality"
  | "Channel"
  | "SessionId"
  | "OriginatingRequestId"
  | "IntentName"
  | "IntentEndState"
  | (string & {});
export type AnalyticsFilterOperator = "EQ" | "GT" | "LT" | (string & {});
export type AnalyticsFilterValue = string;
export type AnalyticsFilterValues = string[];
export interface AnalyticsIntentFilter {
  name: AnalyticsIntentFilterName;
  operator: AnalyticsFilterOperator;
  values: string[];
}
export type AnalyticsIntentFilters = AnalyticsIntentFilter[];
export interface ListIntentMetricsRequest {
  botId: string;
  startDateTime: Date;
  endDateTime: Date;
  metrics: AnalyticsIntentMetric[];
  binBy?: AnalyticsBinBySpecification[];
  groupBy?: AnalyticsIntentGroupBySpecification[];
  filters?: AnalyticsIntentFilter[];
  maxResults?: number;
  nextToken?: string;
}
export type AnalyticsBinValue = number;
export interface AnalyticsBinKey {
  name?: AnalyticsBinByName;
  value?: number;
}
export type AnalyticsBinKeys = AnalyticsBinKey[];
export type AnalyticsGroupByValue = string;
export interface AnalyticsIntentGroupByKey {
  name?: AnalyticsIntentField;
  value?: string;
}
export type AnalyticsIntentGroupByKeys = AnalyticsIntentGroupByKey[];
export type AnalyticsMetricValue = number;
export interface AnalyticsIntentMetricResult {
  name?: AnalyticsIntentMetricName;
  statistic?: AnalyticsMetricStatistic;
  value?: number;
}
export type AnalyticsIntentMetricResults = AnalyticsIntentMetricResult[];
export interface AnalyticsIntentResult {
  binKeys?: AnalyticsBinKey[];
  groupByKeys?: AnalyticsIntentGroupByKey[];
  metricsResults?: AnalyticsIntentMetricResult[];
}
export type AnalyticsIntentResults = AnalyticsIntentResult[];
export interface ListIntentMetricsResponse {
  botId?: string;
  results?: AnalyticsIntentResult[];
  nextToken?: string;
}
export type AnalyticsPath = string;
export type AnalyticsCommonFilterName =
  | "BotAliasId"
  | "BotVersion"
  | "LocaleId"
  | "Modality"
  | "Channel"
  | (string & {});
export interface AnalyticsPathFilter {
  name: AnalyticsCommonFilterName;
  operator: AnalyticsFilterOperator;
  values: string[];
}
export type AnalyticsPathFilters = AnalyticsPathFilter[];
export interface ListIntentPathsRequest {
  botId: string;
  startDateTime: Date;
  endDateTime: Date;
  intentPath: string;
  filters?: AnalyticsPathFilter[];
}
export type AnalyticsNodeCount = number;
export type AnalyticsNodeLevel = number;
export type AnalyticsNodeType = "Inner" | "Exit" | (string & {});
export interface AnalyticsIntentNodeSummary {
  intentName?: string;
  intentPath?: string;
  intentCount?: number;
  intentLevel?: number;
  nodeType?: AnalyticsNodeType;
}
export type AnalyticsIntentNodeSummaries = AnalyticsIntentNodeSummary[];
export interface ListIntentPathsResponse {
  nodeSummaries?: AnalyticsIntentNodeSummary[];
}
export type IntentSortAttribute =
  | "IntentName"
  | "LastUpdatedDateTime"
  | (string & {});
export interface IntentSortBy {
  attribute: IntentSortAttribute;
  order: SortOrder;
}
export type IntentFilterName = "IntentName" | (string & {});
export type IntentFilterOperator = "CO" | "EQ" | (string & {});
export interface IntentFilter {
  name: IntentFilterName;
  values: string[];
  operator: IntentFilterOperator;
}
export type IntentFilters = IntentFilter[];
export interface ListIntentsRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  sortBy?: IntentSortBy;
  filters?: IntentFilter[];
  maxResults?: number;
  nextToken?: string;
}
export interface IntentSummary {
  intentId?: string;
  intentName?: string;
  intentDisplayName?: string;
  description?: string;
  parentIntentSignature?: string;
  inputContexts?: InputContext[];
  outputContexts?: OutputContext[];
  lastUpdatedDateTime?: Date;
}
export type IntentSummaryList = IntentSummary[];
export interface ListIntentsResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  intentSummaries?: IntentSummary[];
  nextToken?: string;
}
export type AnalyticsIntentStageMetricName =
  | "Count"
  | "Success"
  | "Failed"
  | "Dropped"
  | "Retry"
  | (string & {});
export interface AnalyticsIntentStageMetric {
  name: AnalyticsIntentStageMetricName;
  statistic: AnalyticsMetricStatistic;
  order?: AnalyticsSortOrder;
}
export type AnalyticsIntentStageMetrics = AnalyticsIntentStageMetric[];
export type AnalyticsIntentStageField =
  | "IntentStageName"
  | "SwitchedToIntent"
  | (string & {});
export interface AnalyticsIntentStageGroupBySpecification {
  name: AnalyticsIntentStageField;
}
export type AnalyticsIntentStageGroupByList =
  AnalyticsIntentStageGroupBySpecification[];
export type AnalyticsIntentStageFilterName =
  | "BotAliasId"
  | "BotVersion"
  | "LocaleId"
  | "Modality"
  | "Channel"
  | "SessionId"
  | "OriginatingRequestId"
  | "IntentName"
  | "IntentStageName"
  | (string & {});
export interface AnalyticsIntentStageFilter {
  name: AnalyticsIntentStageFilterName;
  operator: AnalyticsFilterOperator;
  values: string[];
}
export type AnalyticsIntentStageFilters = AnalyticsIntentStageFilter[];
export interface ListIntentStageMetricsRequest {
  botId: string;
  startDateTime: Date;
  endDateTime: Date;
  metrics: AnalyticsIntentStageMetric[];
  binBy?: AnalyticsBinBySpecification[];
  groupBy?: AnalyticsIntentStageGroupBySpecification[];
  filters?: AnalyticsIntentStageFilter[];
  maxResults?: number;
  nextToken?: string;
}
export interface AnalyticsIntentStageGroupByKey {
  name?: AnalyticsIntentStageField;
  value?: string;
}
export type AnalyticsIntentStageGroupByKeys = AnalyticsIntentStageGroupByKey[];
export interface AnalyticsIntentStageMetricResult {
  name?: AnalyticsIntentStageMetricName;
  statistic?: AnalyticsMetricStatistic;
  value?: number;
}
export type AnalyticsIntentStageMetricResults =
  AnalyticsIntentStageMetricResult[];
export interface AnalyticsIntentStageResult {
  binKeys?: AnalyticsBinKey[];
  groupByKeys?: AnalyticsIntentStageGroupByKey[];
  metricsResults?: AnalyticsIntentStageMetricResult[];
}
export type AnalyticsIntentStageResults = AnalyticsIntentStageResult[];
export interface ListIntentStageMetricsResponse {
  botId?: string;
  results?: AnalyticsIntentStageResult[];
  nextToken?: string;
}
export interface ListRecommendedIntentsRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  botRecommendationId: string;
  nextToken?: string;
  maxResults?: number;
}
export type SampleUtterancesCount = number;
export interface RecommendedIntentSummary {
  intentId?: string;
  intentName?: string;
  sampleUtterancesCount?: number;
}
export type RecommendedIntentSummaryList = RecommendedIntentSummary[];
export interface ListRecommendedIntentsResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  botRecommendationId?: string;
  summaryList?: RecommendedIntentSummary[];
  nextToken?: string;
}
export type AnalyticsSessionSortByName =
  | "ConversationStartTime"
  | "NumberOfTurns"
  | "Duration"
  | (string & {});
export interface SessionDataSortBy {
  name: AnalyticsSessionSortByName;
  order: AnalyticsSortOrder;
}
export type AnalyticsSessionFilterName =
  | "BotAliasId"
  | "BotVersion"
  | "LocaleId"
  | "Modality"
  | "Channel"
  | "Duration"
  | "ConversationEndState"
  | "SessionId"
  | "OriginatingRequestId"
  | "IntentPath"
  | (string & {});
export interface AnalyticsSessionFilter {
  name: AnalyticsSessionFilterName;
  operator: AnalyticsFilterOperator;
  values: string[];
}
export type AnalyticsSessionFilters = AnalyticsSessionFilter[];
export interface ListSessionAnalyticsDataRequest {
  botId: string;
  startDateTime: Date;
  endDateTime: Date;
  sortBy?: SessionDataSortBy;
  filters?: AnalyticsSessionFilter[];
  maxResults?: number;
  nextToken?: string;
}
export type AnalyticsChannel = string;
export type AnalyticsSessionId = string;
export type AnalyticsLongValue = number;
export type ConversationEndState =
  | "Success"
  | "Failure"
  | "Dropped"
  | (string & {});
export type AnalyticsModality =
  | "Speech"
  | "Text"
  | "DTMF"
  | "MultiMode"
  | (string & {});
export interface InvokedIntentSample {
  intentName?: string;
}
export type InvokedIntentSamples = InvokedIntentSample[];
export type AnalyticsOriginatingRequestId = string;
export interface SessionSpecification {
  botAliasId?: string;
  botVersion?: string;
  localeId?: string;
  channel?: string;
  sessionId?: string;
  conversationStartTime?: Date;
  conversationEndTime?: Date;
  conversationDurationSeconds?: number;
  conversationEndState?: ConversationEndState;
  mode?: AnalyticsModality;
  numberOfTurns?: number;
  invokedIntentSamples?: InvokedIntentSample[];
  originatingRequestId?: string;
}
export type SessionSpecifications = SessionSpecification[];
export interface ListSessionAnalyticsDataResponse {
  botId?: string;
  nextToken?: string;
  sessions?: SessionSpecification[];
}
export type AnalyticsSessionMetricName =
  | "Count"
  | "Success"
  | "Failure"
  | "Dropped"
  | "Duration"
  | "TurnsPerConversation"
  | "Concurrency"
  | (string & {});
export interface AnalyticsSessionMetric {
  name: AnalyticsSessionMetricName;
  statistic: AnalyticsMetricStatistic;
  order?: AnalyticsSortOrder;
}
export type AnalyticsSessionMetrics = AnalyticsSessionMetric[];
export type AnalyticsSessionField =
  | "ConversationEndState"
  | "LocaleId"
  | (string & {});
export interface AnalyticsSessionGroupBySpecification {
  name: AnalyticsSessionField;
}
export type AnalyticsSessionGroupByList =
  AnalyticsSessionGroupBySpecification[];
export interface ListSessionMetricsRequest {
  botId: string;
  startDateTime: Date;
  endDateTime: Date;
  metrics: AnalyticsSessionMetric[];
  binBy?: AnalyticsBinBySpecification[];
  groupBy?: AnalyticsSessionGroupBySpecification[];
  filters?: AnalyticsSessionFilter[];
  maxResults?: number;
  nextToken?: string;
}
export interface AnalyticsSessionGroupByKey {
  name?: AnalyticsSessionField;
  value?: string;
}
export type AnalyticsSessionGroupByKeys = AnalyticsSessionGroupByKey[];
export interface AnalyticsSessionMetricResult {
  name?: AnalyticsSessionMetricName;
  statistic?: AnalyticsMetricStatistic;
  value?: number;
}
export type AnalyticsSessionMetricResults = AnalyticsSessionMetricResult[];
export interface AnalyticsSessionResult {
  binKeys?: AnalyticsBinKey[];
  groupByKeys?: AnalyticsSessionGroupByKey[];
  metricsResults?: AnalyticsSessionMetricResult[];
}
export type AnalyticsSessionResults = AnalyticsSessionResult[];
export interface ListSessionMetricsResponse {
  botId?: string;
  results?: AnalyticsSessionResult[];
  nextToken?: string;
}
export type SlotSortAttribute =
  | "SlotName"
  | "LastUpdatedDateTime"
  | (string & {});
export interface SlotSortBy {
  attribute: SlotSortAttribute;
  order: SortOrder;
}
export type SlotFilterName = "SlotName" | (string & {});
export type SlotFilterOperator = "CO" | "EQ" | (string & {});
export interface SlotFilter {
  name: SlotFilterName;
  values: string[];
  operator: SlotFilterOperator;
}
export type SlotFilters = SlotFilter[];
export interface ListSlotsRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  intentId: string;
  sortBy?: SlotSortBy;
  filters?: SlotFilter[];
  maxResults?: number;
  nextToken?: string;
}
export interface SlotSummary {
  slotId?: string;
  slotName?: string;
  description?: string;
  slotConstraint?: SlotConstraint;
  slotTypeId?: string;
  valueElicitationPromptSpecification?: PromptSpecification;
  lastUpdatedDateTime?: Date;
}
export type SlotSummaryList = SlotSummary[];
export interface ListSlotsResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  intentId?: string;
  slotSummaries?: SlotSummary[];
  nextToken?: string;
}
export type SlotTypeSortAttribute =
  | "SlotTypeName"
  | "LastUpdatedDateTime"
  | (string & {});
export interface SlotTypeSortBy {
  attribute: SlotTypeSortAttribute;
  order: SortOrder;
}
export type SlotTypeFilterName =
  | "SlotTypeName"
  | "ExternalSourceType"
  | (string & {});
export type SlotTypeFilterOperator = "CO" | "EQ" | (string & {});
export interface SlotTypeFilter {
  name: SlotTypeFilterName;
  values: string[];
  operator: SlotTypeFilterOperator;
}
export type SlotTypeFilters = SlotTypeFilter[];
export interface ListSlotTypesRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  sortBy?: SlotTypeSortBy;
  filters?: SlotTypeFilter[];
  maxResults?: number;
  nextToken?: string;
}
export type SlotTypeCategory =
  | "Custom"
  | "Extended"
  | "ExternalGrammar"
  | "Composite"
  | (string & {});
export interface SlotTypeSummary {
  slotTypeId?: string;
  slotTypeName?: string;
  description?: string;
  parentSlotTypeSignature?: string;
  lastUpdatedDateTime?: Date;
  slotTypeCategory?: SlotTypeCategory;
}
export type SlotTypeSummaryList = SlotTypeSummary[];
export interface ListSlotTypesResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  slotTypeSummaries?: SlotTypeSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceARN: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export type TestResultTypeFilter =
  | "OverallTestResults"
  | "ConversationLevelTestResults"
  | "IntentClassificationTestResults"
  | "SlotResolutionTestResults"
  | "UtteranceLevelResults"
  | (string & {});
export type TestResultMatchStatus =
  | "Matched"
  | "Mismatched"
  | "ExecutionError"
  | (string & {});
export interface ConversationLevelTestResultsFilterBy {
  endToEndResult?: TestResultMatchStatus;
}
export interface TestExecutionResultFilterBy {
  resultTypeFilter: TestResultTypeFilter;
  conversationLevelTestResultsFilterBy?: ConversationLevelTestResultsFilterBy;
}
export interface ListTestExecutionResultItemsRequest {
  testExecutionId: string;
  resultFilterBy: TestExecutionResultFilterBy;
  maxResults?: number;
  nextToken?: string;
}
export type TestResultMatchStatusCountMap = {
  [key in TestResultMatchStatus]?: number;
};
export interface OverallTestResultItem {
  multiTurnConversation: boolean;
  totalResultCount: number;
  speechTranscriptionResultCounts?: { [key: string]: number | undefined };
  endToEndResultCounts: { [key: string]: number | undefined };
}
export type OverallTestResultItemList = OverallTestResultItem[];
export interface OverallTestResults {
  items: OverallTestResultItem[];
}
export type TestSetConversationId = string;
export interface ConversationLevelIntentClassificationResultItem {
  intentName: string;
  matchResult: TestResultMatchStatus;
}
export type ConversationLevelIntentClassificationResults =
  ConversationLevelIntentClassificationResultItem[];
export type TestResultSlotName = string;
export interface ConversationLevelSlotResolutionResultItem {
  intentName: string;
  slotName: string;
  matchResult: TestResultMatchStatus;
}
export type ConversationLevelSlotResolutionResults =
  ConversationLevelSlotResolutionResultItem[];
export interface ConversationLevelTestResultItem {
  conversationId: string;
  endToEndResult: TestResultMatchStatus;
  speechTranscriptionResult?: TestResultMatchStatus;
  intentClassificationResults: ConversationLevelIntentClassificationResultItem[];
  slotResolutionResults: ConversationLevelSlotResolutionResultItem[];
}
export type ConversationLevelTestResultItemList =
  ConversationLevelTestResultItem[];
export interface ConversationLevelTestResults {
  items: ConversationLevelTestResultItem[];
}
export interface IntentClassificationTestResultItemCounts {
  totalResultCount: number;
  speechTranscriptionResultCounts?: { [key: string]: number | undefined };
  intentMatchResultCounts: { [key: string]: number | undefined };
}
export interface IntentClassificationTestResultItem {
  intentName: string;
  multiTurnConversation: boolean;
  resultCounts: IntentClassificationTestResultItemCounts;
}
export type IntentClassificationTestResultItemList =
  IntentClassificationTestResultItem[];
export interface IntentClassificationTestResults {
  items: IntentClassificationTestResultItem[];
}
export interface SlotResolutionTestResultItemCounts {
  totalResultCount: number;
  speechTranscriptionResultCounts?: { [key: string]: number | undefined };
  slotMatchResultCounts: { [key: string]: number | undefined };
}
export interface SlotResolutionTestResultItem {
  slotName: string;
  resultCounts: SlotResolutionTestResultItemCounts;
}
export type SlotResolutionTestResultItems = SlotResolutionTestResultItem[];
export interface IntentLevelSlotResolutionTestResultItem {
  intentName: string;
  multiTurnConversation: boolean;
  slotResolutionResults: SlotResolutionTestResultItem[];
}
export type IntentLevelSlotResolutionTestResultItemList =
  IntentLevelSlotResolutionTestResultItem[];
export interface IntentLevelSlotResolutionTestResults {
  items: IntentLevelSlotResolutionTestResultItem[];
}
export type RecordNumber = number;
export type TestSetAgentPrompt = string;
export interface ExecutionErrorDetails {
  errorCode: string;
  errorMessage: string;
}
export interface AgentTurnResult {
  expectedAgentPrompt: string;
  actualAgentPrompt?: string;
  errorDetails?: ExecutionErrorDetails;
  actualElicitedSlot?: string;
  actualIntent?: string;
}
export type TestSetUtteranceText = string;
export type AudioFileS3Location = string;
export interface UtteranceAudioInputSpecification {
  audioFileS3Location: string;
}
export interface UtteranceInputSpecification {
  textInput?: string;
  audioInput?: UtteranceAudioInputSpecification;
}
export type ActiveContextName = string;
export interface ActiveContext {
  name: string;
}
export type ActiveContextList = ActiveContext[];
export type RuntimeHintPhrase = string;
export interface RuntimeHintValue {
  phrase: string;
}
export type RuntimeHintValuesList = RuntimeHintValue[];
export interface RuntimeHintDetails {
  runtimeHintValues?: RuntimeHintValue[];
  subSlotHints?: { [key: string]: RuntimeHintDetails | undefined };
}
export type SlotHintsSlotMap = {
  [key: string]: RuntimeHintDetails | undefined;
};
export type SlotHintsIntentMap = {
  [key: string]: { [key: string]: RuntimeHintDetails | undefined } | undefined;
};
export interface RuntimeHints {
  slotHints?: {
    [key: string]:
      | { [key: string]: RuntimeHintDetails | undefined }
      | undefined;
  };
}
export interface InputSessionStateSpecification {
  sessionAttributes?: { [key: string]: string | undefined };
  activeContexts?: ActiveContext[];
  runtimeHints?: RuntimeHints;
}
export interface UserTurnInputSpecification {
  utteranceInput: UtteranceInputSpecification;
  requestAttributes?: { [key: string]: string | undefined };
  sessionState?: InputSessionStateSpecification;
}
export type UserTurnSlotOutputList = UserTurnSlotOutput[];
export interface UserTurnSlotOutput {
  value?: string;
  values?: UserTurnSlotOutput[];
  subSlots?: { [key: string]: UserTurnSlotOutput | undefined };
}
export type UserTurnSlotOutputMap = {
  [key: string]: UserTurnSlotOutput | undefined;
};
export interface UserTurnIntentOutput {
  name: string;
  slots?: { [key: string]: UserTurnSlotOutput | undefined };
}
export interface UserTurnOutputSpecification {
  intent: UserTurnIntentOutput;
  activeContexts?: ActiveContext[];
  transcript?: string;
}
export interface ConversationLevelResultDetail {
  endToEndResult: TestResultMatchStatus;
  speechTranscriptionResult?: TestResultMatchStatus;
}
export interface UserTurnResult {
  input: UserTurnInputSpecification;
  expectedOutput: UserTurnOutputSpecification;
  actualOutput?: UserTurnOutputSpecification;
  errorDetails?: ExecutionErrorDetails;
  endToEndResult?: TestResultMatchStatus;
  intentMatchResult?: TestResultMatchStatus;
  slotMatchResult?: TestResultMatchStatus;
  speechTranscriptionResult?: TestResultMatchStatus;
  conversationLevelResult?: ConversationLevelResultDetail;
}
export interface TestSetTurnResult {
  agent?: AgentTurnResult;
  user?: UserTurnResult;
}
export interface UtteranceLevelTestResultItem {
  recordNumber: number;
  conversationId?: string;
  turnResult: TestSetTurnResult;
}
export type UtteranceLevelTestResultItemList = UtteranceLevelTestResultItem[];
export interface UtteranceLevelTestResults {
  items: UtteranceLevelTestResultItem[];
}
export interface TestExecutionResultItems {
  overallTestResults?: OverallTestResults;
  conversationLevelTestResults?: ConversationLevelTestResults;
  intentClassificationTestResults?: IntentClassificationTestResults;
  intentLevelSlotResolutionTestResults?: IntentLevelSlotResolutionTestResults;
  utteranceLevelTestResults?: UtteranceLevelTestResults;
}
export interface ListTestExecutionResultItemsResponse {
  testExecutionResults?: TestExecutionResultItems;
  nextToken?: string;
}
export type TestExecutionSortAttribute =
  | "TestSetName"
  | "CreationDateTime"
  | (string & {});
export interface TestExecutionSortBy {
  attribute: TestExecutionSortAttribute;
  order: SortOrder;
}
export interface ListTestExecutionsRequest {
  sortBy?: TestExecutionSortBy;
  maxResults?: number;
  nextToken?: string;
}
export interface TestExecutionSummary {
  testExecutionId?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  testExecutionStatus?: TestExecutionStatus;
  testSetId?: string;
  testSetName?: string;
  target?: TestExecutionTarget;
  apiMode?: TestExecutionApiMode;
  testExecutionModality?: TestExecutionModality;
}
export type TestExecutionSummaryList = TestExecutionSummary[];
export interface ListTestExecutionsResponse {
  testExecutions?: TestExecutionSummary[];
  nextToken?: string;
}
export interface ListTestSetRecordsRequest {
  testSetId: string;
  maxResults?: number;
  nextToken?: string;
}
export type TurnNumber = number;
export interface AgentTurnSpecification {
  agentPrompt: string;
}
export interface UserTurnSpecification {
  input: UserTurnInputSpecification;
  expected: UserTurnOutputSpecification;
}
export interface TurnSpecification {
  agentTurn?: AgentTurnSpecification;
  userTurn?: UserTurnSpecification;
}
export interface TestSetTurnRecord {
  recordNumber: number;
  conversationId?: string;
  turnNumber?: number;
  turnSpecification: TurnSpecification;
}
export type TestSetTurnRecordList = TestSetTurnRecord[];
export interface ListTestSetRecordsResponse {
  testSetRecords?: TestSetTurnRecord[];
  nextToken?: string;
}
export type TestSetSortAttribute =
  | "TestSetName"
  | "LastUpdatedDateTime"
  | (string & {});
export interface TestSetSortBy {
  attribute: TestSetSortAttribute;
  order: SortOrder;
}
export interface ListTestSetsRequest {
  sortBy?: TestSetSortBy;
  maxResults?: number;
  nextToken?: string;
}
export interface TestSetSummary {
  testSetId?: string;
  testSetName?: string;
  description?: string;
  modality?: TestSetModality;
  status?: TestSetStatus;
  roleArn?: string;
  numTurns?: number;
  storageLocation?: TestSetStorageLocation;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export type TestSetSummaryList = TestSetSummary[];
export interface ListTestSetsResponse {
  testSets?: TestSetSummary[];
  nextToken?: string;
}
export type AnalyticsUtteranceSortByName = "UtteranceTimestamp" | (string & {});
export interface UtteranceDataSortBy {
  name: AnalyticsUtteranceSortByName;
  order: AnalyticsSortOrder;
}
export type AnalyticsUtteranceFilterName =
  | "BotAliasId"
  | "BotVersion"
  | "LocaleId"
  | "Modality"
  | "Channel"
  | "SessionId"
  | "OriginatingRequestId"
  | "UtteranceState"
  | "UtteranceText"
  | (string & {});
export interface AnalyticsUtteranceFilter {
  name: AnalyticsUtteranceFilterName;
  operator: AnalyticsFilterOperator;
  values: string[];
}
export type AnalyticsUtteranceFilters = AnalyticsUtteranceFilter[];
export interface ListUtteranceAnalyticsDataRequest {
  botId: string;
  startDateTime: Date;
  endDateTime: Date;
  sortBy?: UtteranceDataSortBy;
  filters?: AnalyticsUtteranceFilter[];
  maxResults?: number;
  nextToken?: string;
}
export type UtteranceUnderstood = boolean;
export type IntentState =
  | "Failed"
  | "Fulfilled"
  | "InProgress"
  | "ReadyForFulfillment"
  | "Waiting"
  | "FulfillmentInProgress"
  | (string & {});
export type UtteranceContentType =
  | "PlainText"
  | "CustomPayload"
  | "SSML"
  | "ImageResponseCard"
  | (string & {});
export interface UtteranceBotResponse {
  content?: string;
  contentType?: UtteranceContentType;
  imageResponseCard?: ImageResponseCard;
}
export type UtteranceBotResponses = UtteranceBotResponse[];
export interface UtteranceSpecification {
  botAliasId?: string;
  botVersion?: string;
  localeId?: string;
  sessionId?: string;
  channel?: string;
  mode?: AnalyticsModality;
  conversationStartTime?: Date;
  conversationEndTime?: Date;
  utterance?: string;
  utteranceTimestamp?: Date;
  audioVoiceDurationMillis?: number;
  utteranceUnderstood?: boolean;
  inputType?: string;
  outputType?: string;
  associatedIntentName?: string;
  associatedSlotName?: string;
  intentState?: IntentState;
  dialogActionType?: string;
  botResponseAudioVoiceId?: string;
  slotsFilledInSession?: string;
  utteranceRequestId?: string;
  botResponses?: UtteranceBotResponse[];
}
export type UtteranceSpecifications = UtteranceSpecification[];
export interface ListUtteranceAnalyticsDataResponse {
  botId?: string;
  nextToken?: string;
  utterances?: UtteranceSpecification[];
}
export type AnalyticsUtteranceMetricName =
  | "Count"
  | "Missed"
  | "Detected"
  | "UtteranceTimestamp"
  | (string & {});
export interface AnalyticsUtteranceMetric {
  name: AnalyticsUtteranceMetricName;
  statistic: AnalyticsMetricStatistic;
  order?: AnalyticsSortOrder;
}
export type AnalyticsUtteranceMetrics = AnalyticsUtteranceMetric[];
export type AnalyticsUtteranceField =
  | "UtteranceText"
  | "UtteranceState"
  | (string & {});
export interface AnalyticsUtteranceGroupBySpecification {
  name: AnalyticsUtteranceField;
}
export type AnalyticsUtteranceGroupByList =
  AnalyticsUtteranceGroupBySpecification[];
export type AnalyticsUtteranceAttributeName = "LastUsedIntent" | (string & {});
export interface AnalyticsUtteranceAttribute {
  name: AnalyticsUtteranceAttributeName;
}
export type AnalyticsUtteranceAttributes = AnalyticsUtteranceAttribute[];
export interface ListUtteranceMetricsRequest {
  botId: string;
  startDateTime: Date;
  endDateTime: Date;
  metrics: AnalyticsUtteranceMetric[];
  binBy?: AnalyticsBinBySpecification[];
  groupBy?: AnalyticsUtteranceGroupBySpecification[];
  attributes?: AnalyticsUtteranceAttribute[];
  filters?: AnalyticsUtteranceFilter[];
  maxResults?: number;
  nextToken?: string;
}
export interface AnalyticsUtteranceGroupByKey {
  name?: AnalyticsUtteranceField;
  value?: string;
}
export type AnalyticsUtteranceGroupByKeys = AnalyticsUtteranceGroupByKey[];
export interface AnalyticsUtteranceMetricResult {
  name?: AnalyticsUtteranceMetricName;
  statistic?: AnalyticsMetricStatistic;
  value?: number;
}
export type AnalyticsUtteranceMetricResults = AnalyticsUtteranceMetricResult[];
export interface AnalyticsUtteranceAttributeResult {
  lastUsedIntent?: string;
}
export type AnalyticsUtteranceAttributeResults =
  AnalyticsUtteranceAttributeResult[];
export interface AnalyticsUtteranceResult {
  binKeys?: AnalyticsBinKey[];
  groupByKeys?: AnalyticsUtteranceGroupByKey[];
  metricsResults?: AnalyticsUtteranceMetricResult[];
  attributeResults?: AnalyticsUtteranceAttributeResult[];
}
export type AnalyticsUtteranceResults = AnalyticsUtteranceResult[];
export interface ListUtteranceMetricsResponse {
  botId?: string;
  results?: AnalyticsUtteranceResult[];
  nextToken?: string;
}
export type SearchOrder = "Ascending" | "Descending" | (string & {});
export type AssociatedTranscriptFilterName =
  | "IntentId"
  | "SlotTypeId"
  | (string & {});
export interface AssociatedTranscriptFilter {
  name: AssociatedTranscriptFilterName;
  values: string[];
}
export type AssociatedTranscriptFilters = AssociatedTranscriptFilter[];
export type NextIndex = number;
export interface SearchAssociatedTranscriptsRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  botRecommendationId: string;
  searchOrder?: SearchOrder;
  filters: AssociatedTranscriptFilter[];
  maxResults?: number;
  nextIndex?: number;
}
export type Transcript = string;
export interface AssociatedTranscript {
  transcript?: string;
}
export type AssociatedTranscriptList = AssociatedTranscript[];
export interface SearchAssociatedTranscriptsResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  botRecommendationId?: string;
  nextIndex?: number;
  associatedTranscripts?: AssociatedTranscript[];
  totalResults?: number;
}
export type AnalysisScope = "BotLocale" | (string & {});
export interface StartBotAnalyzerRequest {
  botId: string;
  analysisScope: AnalysisScope;
  localeId?: string;
  botVersion?: string;
}
export interface StartBotAnalyzerResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  botAnalyzerStatus?: BotAnalyzerStatus;
  botAnalyzerRequestId?: string;
  creationDateTime?: Date;
}
export interface StartBotRecommendationRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  transcriptSourceSetting: TranscriptSourceSetting;
  encryptionSetting?: EncryptionSetting;
}
export interface StartBotRecommendationResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  botRecommendationStatus?: BotRecommendationStatus;
  botRecommendationId?: string;
  creationDateTime?: Date;
  transcriptSourceSetting?: TranscriptSourceSetting;
  encryptionSetting?: EncryptionSetting;
}
export interface StartBotResourceGenerationRequest {
  generationInputPrompt: string;
  botId: string;
  botVersion: string;
  localeId: string;
}
export interface StartBotResourceGenerationResponse {
  generationInputPrompt?: string;
  generationId?: string;
  botId?: string;
  botVersion?: string;
  localeId?: string;
  generationStatus?: GenerationStatus;
  creationDateTime?: Date;
}
export interface StartImportRequest {
  importId: string;
  resourceSpecification: ImportResourceSpecification;
  mergeStrategy: MergeStrategy;
  filePassword?: string | redacted.Redacted<string>;
}
export interface StartImportResponse {
  importId?: string;
  resourceSpecification?: ImportResourceSpecification;
  mergeStrategy?: MergeStrategy;
  importStatus?: ImportStatus;
  creationDateTime?: Date;
}
export interface StartTestExecutionRequest {
  testSetId: string;
  target: TestExecutionTarget;
  apiMode: TestExecutionApiMode;
  testExecutionModality?: TestExecutionModality;
}
export interface StartTestExecutionResponse {
  testExecutionId?: string;
  creationDateTime?: Date;
  testSetId?: string;
  target?: TestExecutionTarget;
  apiMode?: TestExecutionApiMode;
  testExecutionModality?: TestExecutionModality;
}
export interface StartTestSetGenerationRequest {
  testSetName: string;
  description?: string;
  storageLocation: TestSetStorageLocation;
  generationDataSource: TestSetGenerationDataSource;
  roleArn: string;
  testSetTags?: { [key: string]: string | undefined };
}
export interface StartTestSetGenerationResponse {
  testSetGenerationId?: string;
  creationDateTime?: Date;
  testSetGenerationStatus?: TestSetGenerationStatus;
  testSetName?: string;
  description?: string;
  storageLocation?: TestSetStorageLocation;
  generationDataSource?: TestSetGenerationDataSource;
  roleArn?: string;
  testSetTags?: { [key: string]: string | undefined };
}
export interface StopBotAnalyzerRequest {
  botId: string;
  botAnalyzerRequestId: string;
}
export interface StopBotAnalyzerResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  botAnalyzerStatus?: BotAnalyzerStatus;
  botAnalyzerRequestId?: string;
}
export interface StopBotRecommendationRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  botRecommendationId: string;
}
export interface StopBotRecommendationResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  botRecommendationStatus?: BotRecommendationStatus;
  botRecommendationId?: string;
}
export interface TagResourceRequest {
  resourceARN: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceARN: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateBotRequest {
  botId: string;
  botName: string;
  description?: string;
  roleArn: string;
  dataPrivacy: DataPrivacy;
  idleSessionTTLInSeconds: number;
  botType?: BotType;
  botMembers?: BotMember[];
  errorLogSettings?: ErrorLogSettings;
}
export interface UpdateBotResponse {
  botId?: string;
  botName?: string;
  description?: string;
  roleArn?: string;
  dataPrivacy?: DataPrivacy;
  idleSessionTTLInSeconds?: number;
  botStatus?: BotStatus;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  botType?: BotType;
  botMembers?: BotMember[];
  errorLogSettings?: ErrorLogSettings;
}
export interface UpdateBotAliasRequest {
  botAliasId: string;
  botAliasName: string;
  description?: string;
  botVersion?: string;
  botAliasLocaleSettings?: {
    [key: string]: BotAliasLocaleSettings | undefined;
  };
  conversationLogSettings?: ConversationLogSettings;
  sentimentAnalysisSettings?: SentimentAnalysisSettings;
  botId: string;
}
export interface UpdateBotAliasResponse {
  botAliasId?: string;
  botAliasName?: string;
  description?: string;
  botVersion?: string;
  botAliasLocaleSettings?: {
    [key: string]: BotAliasLocaleSettings | undefined;
  };
  conversationLogSettings?: ConversationLogSettings;
  sentimentAnalysisSettings?: SentimentAnalysisSettings;
  botAliasStatus?: BotAliasStatus;
  botId?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export interface UpdateBotLocaleRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  description?: string;
  nluIntentConfidenceThreshold: number;
  voiceSettings?: VoiceSettings;
  unifiedSpeechSettings?: UnifiedSpeechSettings;
  audioFillerSettings?: AudioFillerSettings;
  speechRecognitionSettings?: SpeechRecognitionSettings;
  generativeAISettings?: GenerativeAISettings;
  speechDetectionSensitivity?: SpeechDetectionSensitivity;
}
export interface UpdateBotLocaleResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  localeName?: string;
  description?: string;
  nluIntentConfidenceThreshold?: number;
  voiceSettings?: VoiceSettings;
  unifiedSpeechSettings?: UnifiedSpeechSettings;
  audioFillerSettings?: AudioFillerSettings;
  speechRecognitionSettings?: SpeechRecognitionSettings;
  botLocaleStatus?: BotLocaleStatus;
  failureReasons?: string[];
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  recommendedActions?: string[];
  generativeAISettings?: GenerativeAISettings;
  speechDetectionSensitivity?: SpeechDetectionSensitivity;
}
export interface UpdateBotRecommendationRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  botRecommendationId: string;
  encryptionSetting: EncryptionSetting;
}
export interface UpdateBotRecommendationResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  botRecommendationStatus?: BotRecommendationStatus;
  botRecommendationId?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  transcriptSourceSetting?: TranscriptSourceSetting;
  encryptionSetting?: EncryptionSetting;
}
export interface UpdateExportRequest {
  exportId: string;
  filePassword?: string | redacted.Redacted<string>;
}
export interface UpdateExportResponse {
  exportId?: string;
  resourceSpecification?: ExportResourceSpecification;
  fileFormat?: ImportExportFileFormat;
  exportStatus?: ExportStatus;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export interface UpdateIntentRequest {
  intentId: string;
  intentName: string;
  intentDisplayName?: string;
  description?: string;
  parentIntentSignature?: string;
  sampleUtterances?: SampleUtterance[];
  dialogCodeHook?: DialogCodeHookSettings;
  fulfillmentCodeHook?: FulfillmentCodeHookSettings;
  slotPriorities?: SlotPriority[];
  intentConfirmationSetting?: IntentConfirmationSetting;
  intentClosingSetting?: IntentClosingSetting;
  inputContexts?: InputContext[];
  outputContexts?: OutputContext[];
  kendraConfiguration?: KendraConfiguration;
  botId: string;
  botVersion: string;
  localeId: string;
  initialResponseSetting?: InitialResponseSetting;
  qnAIntentConfiguration?: QnAIntentConfiguration;
  qInConnectIntentConfiguration?: QInConnectIntentConfiguration;
}
export interface UpdateIntentResponse {
  intentId?: string;
  intentName?: string;
  intentDisplayName?: string;
  description?: string;
  parentIntentSignature?: string;
  sampleUtterances?: SampleUtterance[];
  dialogCodeHook?: DialogCodeHookSettings;
  fulfillmentCodeHook?: FulfillmentCodeHookSettings;
  slotPriorities?: SlotPriority[];
  intentConfirmationSetting?: IntentConfirmationSetting;
  intentClosingSetting?: IntentClosingSetting;
  inputContexts?: InputContext[];
  outputContexts?: OutputContext[];
  kendraConfiguration?: KendraConfiguration;
  botId?: string;
  botVersion?: string;
  localeId?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  initialResponseSetting?: InitialResponseSetting;
  qnAIntentConfiguration?: QnAIntentConfiguration;
  qInConnectIntentConfiguration?: QInConnectIntentConfiguration;
}
export interface UpdateResourcePolicyRequest {
  resourceArn: string;
  policy: string;
  expectedRevisionId?: string;
}
export interface UpdateResourcePolicyResponse {
  resourceArn?: string;
  revisionId?: string;
}
export interface UpdateSlotRequest {
  slotId: string;
  slotName: string;
  description?: string;
  slotTypeId?: string;
  valueElicitationSetting: SlotValueElicitationSetting;
  obfuscationSetting?: ObfuscationSetting;
  botId: string;
  botVersion: string;
  localeId: string;
  intentId: string;
  multipleValuesSetting?: MultipleValuesSetting;
  subSlotSetting?: SubSlotSetting;
}
export interface UpdateSlotResponse {
  slotId?: string;
  slotName?: string;
  description?: string;
  slotTypeId?: string;
  valueElicitationSetting?: SlotValueElicitationSetting;
  obfuscationSetting?: ObfuscationSetting;
  botId?: string;
  botVersion?: string;
  localeId?: string;
  intentId?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  multipleValuesSetting?: MultipleValuesSetting;
  subSlotSetting?: SubSlotSetting;
}
export interface UpdateSlotTypeRequest {
  slotTypeId: string;
  slotTypeName: string;
  description?: string;
  slotTypeValues?: SlotTypeValue[];
  valueSelectionSetting?: SlotValueSelectionSetting;
  parentSlotTypeSignature?: string;
  botId: string;
  botVersion: string;
  localeId: string;
  externalSourceSetting?: ExternalSourceSetting;
  compositeSlotTypeSetting?: CompositeSlotTypeSetting;
}
export interface UpdateSlotTypeResponse {
  slotTypeId?: string;
  slotTypeName?: string;
  description?: string;
  slotTypeValues?: SlotTypeValue[];
  valueSelectionSetting?: SlotValueSelectionSetting;
  parentSlotTypeSignature?: string;
  botId?: string;
  botVersion?: string;
  localeId?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  externalSourceSetting?: ExternalSourceSetting;
  compositeSlotTypeSetting?: CompositeSlotTypeSetting;
}
export interface UpdateTestSetRequest {
  testSetId: string;
  testSetName: string;
  description?: string;
}
export interface UpdateTestSetResponse {
  testSetId?: string;
  testSetName?: string;
  description?: string;
  modality?: TestSetModality;
  status?: TestSetStatus;
  roleArn?: string;
  numTurns?: number;
  storageLocation?: TestSetStorageLocation;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export type ExceptionMessage = string;
export type RetryAfterSeconds = number;
export type BatchCreateCustomVocabularyItemError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a batch of custom vocabulary items for a given bot locale's
 * custom vocabulary.
 */
export const batchCreateCustomVocabularyItem: API.OperationMethod<
  BatchCreateCustomVocabularyItemRequest,
  BatchCreateCustomVocabularyItemResponse,
  BatchCreateCustomVocabularyItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/customvocabulary/DEFAULT/batchcreate",
    input: {
      botId: 0,
      botVersion: 0,
      localeId: 0,
      customVocabularyItemList: D.list({ phrase: 0, weight: 0, displayAs: 0 }),
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateCustomVocabularyItem",
})) as any;

export type BatchDeleteCustomVocabularyItemError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a batch of custom vocabulary items for a given bot locale's
 * custom vocabulary.
 */
export const batchDeleteCustomVocabularyItem: API.OperationMethod<
  BatchDeleteCustomVocabularyItemRequest,
  BatchDeleteCustomVocabularyItemResponse,
  BatchDeleteCustomVocabularyItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/customvocabulary/DEFAULT/batchdelete",
    input: {
      botId: 0,
      botVersion: 0,
      localeId: 0,
      customVocabularyItemList: D.list({ itemId: 0 }),
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteCustomVocabularyItem",
})) as any;

export type BatchUpdateCustomVocabularyItemError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a batch of custom vocabulary items for a given bot locale's custom
 * vocabulary.
 */
export const batchUpdateCustomVocabularyItem: API.OperationMethod<
  BatchUpdateCustomVocabularyItemRequest,
  BatchUpdateCustomVocabularyItemResponse,
  BatchUpdateCustomVocabularyItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/customvocabulary/DEFAULT/batchupdate",
    input: {
      botId: 0,
      botVersion: 0,
      localeId: 0,
      customVocabularyItemList: D.list({
        itemId: 0,
        phrase: 0,
        weight: 0,
        displayAs: 0,
      }),
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateCustomVocabularyItem",
})) as any;

export type BuildBotLocaleError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Builds a bot, its intents, and its slot types into a specific
 * locale. A bot can be built into multiple locales. At runtime the locale
 * is used to choose a specific build of the bot.
 */
export const buildBotLocale: API.OperationMethod<
  BuildBotLocaleRequest,
  BuildBotLocaleResponse,
  BuildBotLocaleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}",
    input: { botId: 0, botVersion: 0, localeId: 0 },
    output: { lastBuildSubmittedDateTime: D.ts },
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BuildBotLocale",
})) as any;

export type CreateBotError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Lex conversational bot.
 */
export const createBot: API.OperationMethod<
  CreateBotRequest,
  CreateBotResponse,
  CreateBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /bots",
    input: {
      botName: 0,
      description: 0,
      roleArn: 0,
      dataPrivacy: i_DataPrivacy,
      idleSessionTTLInSeconds: 0,
      botTags: 0,
      testBotAliasTags: 0,
      botType: 0,
      botMembers: D.list(i_BotMember),
      errorLogSettings: i_ErrorLogSettings,
    },
    output: { creationDateTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBot",
})) as any;

export type CreateBotAliasError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an alias for the specified version of a bot. Use an alias to
 * enable you to change the version of a bot without updating applications
 * that use the bot.
 *
 * For example, you can create an alias called "PROD" that your
 * applications use to call the Amazon Lex bot.
 */
export const createBotAlias: API.OperationMethod<
  CreateBotAliasRequest,
  CreateBotAliasResponse,
  CreateBotAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /bots/{botId}/botaliases",
    input: {
      botAliasName: 0,
      description: 0,
      botVersion: 0,
      botAliasLocaleSettings: D.map(i_BotAliasLocaleSettings),
      conversationLogSettings: i_ConversationLogSettings,
      sentimentAnalysisSettings: i_SentimentAnalysisSettings,
      botId: 0,
      tags: 0,
    },
    output: { creationDateTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBotAlias",
})) as any;

export type CreateBotLocaleError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a locale in the bot. The locale contains the intents and
 * slot types that the bot uses in conversations with users in the
 * specified language and locale. You must add a locale to a bot before
 * you can add intents and slot types to the bot.
 */
export const createBotLocale: API.OperationMethod<
  CreateBotLocaleRequest,
  CreateBotLocaleResponse,
  CreateBotLocaleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /bots/{botId}/botversions/{botVersion}/botlocales",
    input: {
      botId: 0,
      botVersion: 0,
      localeId: 0,
      description: 0,
      nluIntentConfidenceThreshold: 0,
      voiceSettings: i_VoiceSettings,
      unifiedSpeechSettings: i_UnifiedSpeechSettings,
      audioFillerSettings: i_AudioFillerSettings,
      speechRecognitionSettings: i_SpeechRecognitionSettings,
      generativeAISettings: i_GenerativeAISettings,
      speechDetectionSensitivity: 0,
    },
    output: { creationDateTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBotLocale",
})) as any;

export type CreateBotReplicaError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Action to create a replication of the source bot in the secondary region.
 */
export const createBotReplica: API.OperationMethod<
  CreateBotReplicaRequest,
  CreateBotReplicaResponse,
  CreateBotReplicaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /bots/{botId}/replicas",
    input: { botId: 0, replicaRegion: 0 },
    output: { creationDateTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBotReplica",
})) as any;

export type CreateBotVersionError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an immutable version of the bot. When you create the first
 * version of a bot, Amazon Lex sets the version number to 1. Subsequent bot versions increase
 * in an increment of 1. The version number will always represent the total number
 * of versions created of the bot, not the current number of versions. If a bot version
 * is deleted, that bot version number will not be reused.
 */
export const createBotVersion: API.OperationMethod<
  CreateBotVersionRequest,
  CreateBotVersionResponse,
  CreateBotVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /bots/{botId}/botversions",
    input: {
      botId: 0,
      description: 0,
      botVersionLocaleSpecification: D.map({ sourceBotVersion: 0 }),
    },
    output: { creationDateTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBotVersion",
})) as any;

export type CreateExportError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a zip archive containing the contents of a bot or a bot
 * locale. The archive contains a directory structure that contains JSON
 * files that define the bot.
 *
 * You can create an archive that contains the complete definition of a
 * bot, or you can specify that the archive contain only the definition of
 * a single bot locale.
 *
 * For more information about exporting bots, and about the structure
 * of the export archive, see Importing and
 * exporting bots
 */
export const createExport: API.OperationMethod<
  CreateExportRequest,
  CreateExportResponse,
  CreateExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /exports",
    input: {
      resourceSpecification: {
        botExportSpecification: { botId: 0, botVersion: 0 },
        botLocaleExportSpecification: { botId: 0, botVersion: 0, localeId: 0 },
        customVocabularyExportSpecification: {
          botId: 0,
          botVersion: 0,
          localeId: 0,
        },
        testSetExportSpecification: { testSetId: 0 },
      },
      fileFormat: 0,
      filePassword: 0,
    },
    output: { creationDateTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExport",
})) as any;

export type CreateIntentError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an intent.
 *
 * To define the interaction between the user and your bot, you define
 * one or more intents. For example, for a pizza ordering bot you would
 * create an `OrderPizza` intent.
 *
 * When you create an intent, you must provide a name. You can
 * optionally provide the following:
 *
 * - Sample utterances. For example, "I want to order a pizza" and
 * "Can I order a pizza." You can't provide utterances for built-in
 * intents.
 *
 * - Information to be gathered. You specify slots for the
 * information that you bot requests from the user. You can specify
 * standard slot types, such as date and time, or custom slot types
 * for your application.
 *
 * - How the intent is fulfilled. You can provide a Lambda function
 * or configure the intent to return the intent information to your
 * client application. If you use a Lambda function, Amazon Lex invokes
 * the function when all of the intent information is
 * available.
 *
 * - A confirmation prompt to send to the user to confirm an
 * intent. For example, "Shall I order your pizza?"
 *
 * - A conclusion statement to send to the user after the intent is
 * fulfilled. For example, "I ordered your pizza."
 *
 * - A follow-up prompt that asks the user for additional activity.
 * For example, "Do you want a drink with your pizza?"
 */
export const createIntent: API.OperationMethod<
  CreateIntentRequest,
  CreateIntentResponse,
  CreateIntentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/intents",
    input: {
      intentName: 0,
      intentDisplayName: 0,
      description: 0,
      parentIntentSignature: 0,
      sampleUtterances: D.list(i_SampleUtterance),
      dialogCodeHook: i_DialogCodeHookSettings,
      fulfillmentCodeHook: i_FulfillmentCodeHookSettings,
      intentConfirmationSetting: i_IntentConfirmationSetting,
      intentClosingSetting: i_IntentClosingSetting,
      inputContexts: D.list(i_InputContext),
      outputContexts: D.list(i_OutputContext),
      kendraConfiguration: i_KendraConfiguration,
      botId: 0,
      botVersion: 0,
      localeId: 0,
      initialResponseSetting: i_InitialResponseSetting,
      qnAIntentConfiguration: i_QnAIntentConfiguration,
      qInConnectIntentConfiguration: i_QInConnectIntentConfiguration,
    },
    output: { creationDateTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIntent",
})) as any;

export type CreateResourcePolicyError =
  | InternalServerException
  | PreconditionFailedException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new resource policy with the specified policy
 * statements.
 */
export const createResourcePolicy: API.OperationMethod<
  CreateResourcePolicyRequest,
  CreateResourcePolicyResponse,
  CreateResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /policy/{resourceArn}",
    input: { resourceArn: 0, policy: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResourcePolicy",
})) as any;

export type CreateResourcePolicyStatementError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a new resource policy statement to a bot or bot alias. If a
 * resource policy exists, the statement is added to the current resource
 * policy. If a policy doesn't exist, a new policy is created.
 *
 * You can't create a resource policy statement that allows
 * cross-account access.
 *
 * You need to add the `CreateResourcePolicy` or `UpdateResourcePolicy`
 * action to the bot role in order to call the API.
 */
export const createResourcePolicyStatement: API.OperationMethod<
  CreateResourcePolicyStatementRequest,
  CreateResourcePolicyStatementResponse,
  CreateResourcePolicyStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /policy/{resourceArn}/statements",
    input: {
      resourceArn: 0,
      statementId: 0,
      effect: 0,
      principal: D.list({ service: 0, arn: 0 }),
      action: 0,
      condition: 0,
      expectedRevisionId: D.m({ query: "expectedRevisionId" }),
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResourcePolicyStatement",
})) as any;

export type CreateSlotError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a slot in an intent. A slot is a variable needed to fulfill
 * an intent. For example, an `OrderPizza` intent might need
 * slots for size, crust, and number of pizzas. For each slot, you define
 * one or more utterances that Amazon Lex uses to elicit a response from the
 * user.
 */
export const createSlot: API.OperationMethod<
  CreateSlotRequest,
  CreateSlotResponse,
  CreateSlotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/intents/{intentId}/slots",
    input: {
      slotName: 0,
      description: 0,
      slotTypeId: 0,
      valueElicitationSetting: i_SlotValueElicitationSetting,
      obfuscationSetting: i_ObfuscationSetting,
      botId: 0,
      botVersion: 0,
      localeId: 0,
      intentId: 0,
      multipleValuesSetting: i_MultipleValuesSetting,
      subSlotSetting: i_SubSlotSetting,
    },
    output: { creationDateTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSlot",
})) as any;

export type CreateSlotTypeError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a custom slot type
 *
 * To create a custom slot type, specify a name for the slot type and
 * a set of enumeration values, the values that a slot of this type can
 * assume.
 */
export const createSlotType: API.OperationMethod<
  CreateSlotTypeRequest,
  CreateSlotTypeResponse,
  CreateSlotTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/slottypes",
    input: {
      slotTypeName: 0,
      description: 0,
      slotTypeValues: D.list(i_SlotTypeValue),
      valueSelectionSetting: i_SlotValueSelectionSetting,
      parentSlotTypeSignature: 0,
      botId: 0,
      botVersion: 0,
      localeId: 0,
      externalSourceSetting: i_ExternalSourceSetting,
      compositeSlotTypeSetting: i_CompositeSlotTypeSetting,
    },
    output: { creationDateTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSlotType",
})) as any;

export type CreateTestSetDiscrepancyReportError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a report that describes the differences between the bot and the test set.
 */
export const createTestSetDiscrepancyReport: API.OperationMethod<
  CreateTestSetDiscrepancyReportRequest,
  CreateTestSetDiscrepancyReportResponse,
  CreateTestSetDiscrepancyReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /testsets/{testSetId}/testsetdiscrepancy",
    input: {
      testSetId: 0,
      target: { botAliasTarget: { botId: 0, botAliasId: 0, localeId: 0 } },
    },
    output: { creationDateTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTestSetDiscrepancyReport",
})) as any;

export type CreateUploadUrlError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a pre-signed S3 write URL that you use to upload the zip
 * archive when importing a bot or a bot locale.
 */
export const createUploadUrl: API.OperationMethod<
  CreateUploadUrlRequest,
  CreateUploadUrlResponse,
  CreateUploadUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "POST /createuploadurl", input: {} },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUploadUrl",
})) as any;

export type DeleteBotError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes all versions of a bot, including the `Draft`
 * version. To delete a specific version, use the
 * `DeleteBotVersion` operation.
 *
 * When you delete a bot, all of the resources contained in the bot are
 * also deleted. Deleting a bot removes all locales, intents, slot, and
 * slot types defined for the bot.
 *
 * If a bot has an alias, the `DeleteBot` operation returns
 * a `ResourceInUseException` exception. If you want to delete
 * the bot and the alias, set the `skipResourceInUseCheck`
 * parameter to `true`.
 */
export const deleteBot: API.OperationMethod<
  DeleteBotRequest,
  DeleteBotResponse,
  DeleteBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /bots/{botId}",
    input: {
      botId: 0,
      skipResourceInUseCheck: D.m({ query: "skipResourceInUseCheck" }),
    },
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBot",
})) as any;

export type DeleteBotAliasError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified bot alias.
 */
export const deleteBotAlias: API.OperationMethod<
  DeleteBotAliasRequest,
  DeleteBotAliasResponse,
  DeleteBotAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /bots/{botId}/botaliases/{botAliasId}",
    input: {
      botAliasId: 0,
      botId: 0,
      skipResourceInUseCheck: D.m({ query: "skipResourceInUseCheck" }),
    },
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBotAlias",
})) as any;

export type DeleteBotAnalyzerRecommendationError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Permanently deletes the recommendations and analysis results for a specific bot analysis request. This operation is provided for GDPR compliance and cannot be undone.
 *
 * After deletion, the analysis results cannot be retrieved. The analysis request ID will still appear in the history list, but attempting to describe the recommendations will return a `ResourceNotFoundException`.
 */
export const deleteBotAnalyzerRecommendation: API.OperationMethod<
  DeleteBotAnalyzerRecommendationRequest,
  DeleteBotAnalyzerRecommendationResponse,
  DeleteBotAnalyzerRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /bots/{botId}/botanalyzer/{botAnalyzerRequestId}",
    input: { botId: 0, botAnalyzerRequestId: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBotAnalyzerRecommendation",
})) as any;

export type DeleteBotLocaleError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a locale from a bot.
 *
 * When you delete a locale, all intents, slots, and slot types defined
 * for the locale are also deleted.
 */
export const deleteBotLocale: API.OperationMethod<
  DeleteBotLocaleRequest,
  DeleteBotLocaleResponse,
  DeleteBotLocaleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}",
    input: { botId: 0, botVersion: 0, localeId: 0 },
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBotLocale",
})) as any;

export type DeleteBotReplicaError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The action to delete the replicated bot in the secondary region.
 */
export const deleteBotReplica: API.OperationMethod<
  DeleteBotReplicaRequest,
  DeleteBotReplicaResponse,
  DeleteBotReplicaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /bots/{botId}/replicas/{replicaRegion}",
    input: { botId: 0, replicaRegion: 0 },
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBotReplica",
})) as any;

export type DeleteBotVersionError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specific version of a bot. To delete all versions of a bot,
 * use the DeleteBot operation.
 */
export const deleteBotVersion: API.OperationMethod<
  DeleteBotVersionRequest,
  DeleteBotVersionResponse,
  DeleteBotVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /bots/{botId}/botversions/{botVersion}",
    input: {
      botId: 0,
      botVersion: 0,
      skipResourceInUseCheck: D.m({ query: "skipResourceInUseCheck" }),
    },
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBotVersion",
})) as any;

export type DeleteCustomVocabularyError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a custom vocabulary from the specified locale
 * in the specified bot.
 */
export const deleteCustomVocabulary: API.OperationMethod<
  DeleteCustomVocabularyRequest,
  DeleteCustomVocabularyResponse,
  DeleteCustomVocabularyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/customvocabulary",
    input: { botId: 0, botVersion: 0, localeId: 0 },
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomVocabulary",
})) as any;

export type DeleteExportError =
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a previous export and the associated files stored in an S3
 * bucket.
 */
export const deleteExport: API.OperationMethod<
  DeleteExportRequest,
  DeleteExportResponse,
  DeleteExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /exports/{exportId}",
    input: { exportId: 0 },
  },
  errors: [
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteExport",
})) as any;

export type DeleteImportError =
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a previous import and the associated file stored in an S3
 * bucket.
 */
export const deleteImport: API.OperationMethod<
  DeleteImportRequest,
  DeleteImportResponse,
  DeleteImportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /imports/{importId}",
    input: { importId: 0 },
  },
  errors: [
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteImport",
})) as any;

export type DeleteIntentError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified intent.
 *
 * Deleting an intent also deletes the slots associated with the
 * intent.
 */
export const deleteIntent: API.OperationMethod<
  DeleteIntentRequest,
  DeleteIntentResponse,
  DeleteIntentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/intents/{intentId}",
    input: { intentId: 0, botId: 0, botVersion: 0, localeId: 0 },
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntent",
})) as any;

export type DeleteResourcePolicyError =
  | InternalServerException
  | PreconditionFailedException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes an existing policy from a bot or bot alias. If the resource
 * doesn't have a policy attached, Amazon Lex returns an exception.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /policy/{resourceArn}",
    input: {
      resourceArn: 0,
      expectedRevisionId: D.m({ query: "expectedRevisionId" }),
    },
  },
  errors: [
    InternalServerException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
})) as any;

export type DeleteResourcePolicyStatementError =
  | InternalServerException
  | PreconditionFailedException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a policy statement from a resource policy. If you delete the
 * last statement from a policy, the policy is deleted. If you specify a
 * statement ID that doesn't exist in the policy, or if the bot or bot
 * alias doesn't have a policy attached, Amazon Lex returns an
 * exception.
 *
 * You need to add the `DeleteResourcePolicy` or `UpdateResourcePolicy`
 * action to the bot role in order to call the API.
 */
export const deleteResourcePolicyStatement: API.OperationMethod<
  DeleteResourcePolicyStatementRequest,
  DeleteResourcePolicyStatementResponse,
  DeleteResourcePolicyStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /policy/{resourceArn}/statements/{statementId}",
    input: {
      resourceArn: 0,
      statementId: 0,
      expectedRevisionId: D.m({ query: "expectedRevisionId" }),
    },
  },
  errors: [
    InternalServerException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicyStatement",
})) as any;

export type DeleteSlotError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified slot from an intent.
 */
export const deleteSlot: API.OperationMethod<
  DeleteSlotRequest,
  DeleteSlotResponse,
  DeleteSlotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/intents/{intentId}/slots/{slotId}",
    input: { slotId: 0, botId: 0, botVersion: 0, localeId: 0, intentId: 0 },
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSlot",
})) as any;

export type DeleteSlotTypeError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a slot type from a bot locale.
 *
 * If a slot is using the slot type, Amazon Lex throws a
 * `ResourceInUseException` exception. To avoid the
 * exception, set the `skipResourceInUseCheck` parameter to
 * `true`.
 */
export const deleteSlotType: API.OperationMethod<
  DeleteSlotTypeRequest,
  DeleteSlotTypeResponse,
  DeleteSlotTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/slottypes/{slotTypeId}",
    input: {
      slotTypeId: 0,
      botId: 0,
      botVersion: 0,
      localeId: 0,
      skipResourceInUseCheck: D.m({ query: "skipResourceInUseCheck" }),
    },
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSlotType",
})) as any;

export type DeleteTestSetError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The action to delete the selected test set.
 */
export const deleteTestSet: API.OperationMethod<
  DeleteTestSetRequest,
  DeleteTestSetResponse,
  DeleteTestSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /testsets/{testSetId}",
    input: { testSetId: 0 },
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTestSet",
})) as any;

export type DeleteUtterancesError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes stored utterances.
 *
 * Amazon Lex stores the utterances that users send to your bot. Utterances
 * are stored for 15 days for use with the ListAggregatedUtterances operation, and
 * then stored indefinitely for use in improving the ability of your bot
 * to respond to user input..
 *
 * Use the `DeleteUtterances` operation to manually delete
 * utterances for a specific session. When you use the
 * `DeleteUtterances` operation, utterances stored for
 * improving your bot's ability to respond to user input are deleted
 * immediately. Utterances stored for use with the
 * `ListAggregatedUtterances` operation are deleted after 15
 * days.
 */
export const deleteUtterances: API.OperationMethod<
  DeleteUtterancesRequest,
  DeleteUtterancesResponse,
  DeleteUtterancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /bots/{botId}/utterances",
    input: {
      botId: 0,
      localeId: D.m({ query: "localeId" }),
      sessionId: D.m({ query: "sessionId" }),
    },
  },
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUtterances",
})) as any;

export type DescribeBotError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides metadata information about a bot.
 */
export const describeBot: API.OperationMethod<
  DescribeBotRequest,
  DescribeBotResponse,
  DescribeBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /bots/{botId}",
    input: { botId: 0 },
    output: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBot",
})) as any;

export type DescribeBotAliasError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get information about a specific bot alias.
 */
export const describeBotAlias: API.OperationMethod<
  DescribeBotAliasRequest,
  DescribeBotAliasResponse,
  DescribeBotAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /bots/{botId}/botaliases/{botAliasId}",
    input: { botAliasId: 0, botId: 0 },
    output: {
      botAliasHistoryEvents: D.list({ startDate: D.ts, endDate: D.ts }),
      creationDateTime: D.ts,
      lastUpdatedDateTime: D.ts,
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBotAlias",
})) as any;

export type DescribeBotAnalyzerRecommendationError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the analysis results and recommendations for bot optimization. The analysis must be in `Available` status before recommendations can be retrieved.
 *
 * Recommendations are returned with pagination support. Each recommendation includes the issue location, priority level, detailed description, and proposed fix.
 */
export const describeBotAnalyzerRecommendation: API.PaginatedOperationMethod<
  DescribeBotAnalyzerRecommendationRequest,
  DescribeBotAnalyzerRecommendationResponse,
  DescribeBotAnalyzerRecommendationError,
  Credentials | HttpClient.HttpClient,
  BotAnalyzerRecommendation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/botanalyzer/describe/{botAnalyzerRequestId}",
    input: { botId: 0, botAnalyzerRequestId: 0, nextToken: 0, maxResults: 0 },
    output: { creationDateTime: D.ts },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBotAnalyzerRecommendation",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "botAnalyzerRecommendationList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeBotLocaleError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the settings that a bot has for a specific locale.
 */
export const describeBotLocale: API.OperationMethod<
  DescribeBotLocaleRequest,
  DescribeBotLocaleResponse,
  DescribeBotLocaleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}",
    input: { botId: 0, botVersion: 0, localeId: 0 },
    output: {
      creationDateTime: D.ts,
      lastUpdatedDateTime: D.ts,
      lastBuildSubmittedDateTime: D.ts,
      botLocaleHistoryEvents: D.list({ eventDate: D.ts }),
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBotLocale",
})) as any;

export type DescribeBotRecommendationError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides metadata information about a bot recommendation. This
 * information will enable you to get a description on the request inputs,
 * to download associated transcripts after processing is complete, and to
 * download intents and slot-types generated by the bot
 * recommendation.
 */
export const describeBotRecommendation: API.OperationMethod<
  DescribeBotRecommendationRequest,
  DescribeBotRecommendationResponse,
  DescribeBotRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/botrecommendations/{botRecommendationId}",
    input: { botId: 0, botVersion: 0, localeId: 0, botRecommendationId: 0 },
    output: {
      creationDateTime: D.ts,
      lastUpdatedDateTime: D.ts,
      transcriptSourceSetting: o_TranscriptSourceSetting,
      encryptionSetting: o_EncryptionSetting,
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBotRecommendation",
})) as any;

export type DescribeBotReplicaError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Monitors the bot replication status through the UI console.
 */
export const describeBotReplica: API.OperationMethod<
  DescribeBotReplicaRequest,
  DescribeBotReplicaResponse,
  DescribeBotReplicaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /bots/{botId}/replicas/{replicaRegion}",
    input: { botId: 0, replicaRegion: 0 },
    output: { creationDateTime: D.ts },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBotReplica",
})) as any;

export type DescribeBotResourceGenerationError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a request to generate a bot through natural language description, made through
 * the `StartBotResource` API. Use the `generatedBotLocaleUrl`
 * to retrieve the Amazon S3 object containing the bot locale configuration. You can
 * then modify and import this configuration.
 */
export const describeBotResourceGeneration: API.OperationMethod<
  DescribeBotResourceGenerationRequest,
  DescribeBotResourceGenerationResponse,
  DescribeBotResourceGenerationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/generations/{generationId}",
    input: { botId: 0, botVersion: 0, localeId: 0, generationId: 0 },
    output: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBotResourceGeneration",
})) as any;

export type DescribeBotVersionError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides metadata about a version of a bot.
 */
export const describeBotVersion: API.OperationMethod<
  DescribeBotVersionRequest,
  DescribeBotVersionResponse,
  DescribeBotVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /bots/{botId}/botversions/{botVersion}",
    input: { botId: 0, botVersion: 0 },
    output: { creationDateTime: D.ts },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBotVersion",
})) as any;

export type DescribeCustomVocabularyMetadataError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides metadata information about a custom vocabulary.
 */
export const describeCustomVocabularyMetadata: API.OperationMethod<
  DescribeCustomVocabularyMetadataRequest,
  DescribeCustomVocabularyMetadataResponse,
  DescribeCustomVocabularyMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/customvocabulary/DEFAULT/metadata",
    input: { botId: 0, botVersion: 0, localeId: 0 },
    output: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCustomVocabularyMetadata",
})) as any;

export type DescribeExportError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a specific export.
 */
export const describeExport: API.OperationMethod<
  DescribeExportRequest,
  DescribeExportResponse,
  DescribeExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /exports/{exportId}",
    input: { exportId: 0 },
    output: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExport",
})) as any;

export type DescribeImportError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a specific import.
 */
export const describeImport: API.OperationMethod<
  DescribeImportRequest,
  DescribeImportResponse,
  DescribeImportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /imports/{importId}",
    input: { importId: 0 },
    output: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeImport",
})) as any;

export type DescribeIntentError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns metadata about an intent.
 */
export const describeIntent: API.OperationMethod<
  DescribeIntentRequest,
  DescribeIntentResponse,
  DescribeIntentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/intents/{intentId}",
    input: { intentId: 0, botId: 0, botVersion: 0, localeId: 0 },
    output: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIntent",
})) as any;

export type DescribeResourcePolicyError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the resource policy and policy revision for a bot or bot
 * alias.
 */
export const describeResourcePolicy: API.OperationMethod<
  DescribeResourcePolicyRequest,
  DescribeResourcePolicyResponse,
  DescribeResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /policy/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResourcePolicy",
})) as any;

export type DescribeSlotError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets metadata information about a slot.
 */
export const describeSlot: API.OperationMethod<
  DescribeSlotRequest,
  DescribeSlotResponse,
  DescribeSlotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/intents/{intentId}/slots/{slotId}",
    input: { slotId: 0, botId: 0, botVersion: 0, localeId: 0, intentId: 0 },
    output: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSlot",
})) as any;

export type DescribeSlotTypeError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets metadata information about a slot type.
 */
export const describeSlotType: API.OperationMethod<
  DescribeSlotTypeRequest,
  DescribeSlotTypeResponse,
  DescribeSlotTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/slottypes/{slotTypeId}",
    input: { slotTypeId: 0, botId: 0, botVersion: 0, localeId: 0 },
    output: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSlotType",
})) as any;

export type DescribeTestExecutionError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets metadata information about the test execution.
 */
export const describeTestExecution: API.OperationMethod<
  DescribeTestExecutionRequest,
  DescribeTestExecutionResponse,
  DescribeTestExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /testexecutions/{testExecutionId}",
    input: { testExecutionId: 0 },
    output: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTestExecution",
})) as any;

export type DescribeTestSetError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets metadata information about the test set.
 */
export const describeTestSet: API.OperationMethod<
  DescribeTestSetRequest,
  DescribeTestSetResponse,
  DescribeTestSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /testsets/{testSetId}",
    input: { testSetId: 0 },
    output: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTestSet",
})) as any;

export type DescribeTestSetDiscrepancyReportError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets metadata information about the test set discrepancy report.
 */
export const describeTestSetDiscrepancyReport: API.OperationMethod<
  DescribeTestSetDiscrepancyReportRequest,
  DescribeTestSetDiscrepancyReportResponse,
  DescribeTestSetDiscrepancyReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /testsetdiscrepancy/{testSetDiscrepancyReportId}",
    input: { testSetDiscrepancyReportId: 0 },
    output: { creationDateTime: D.ts, lastUpdatedDataTime: D.ts },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTestSetDiscrepancyReport",
})) as any;

export type DescribeTestSetGenerationError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets metadata information about the test set generation.
 */
export const describeTestSetGeneration: API.OperationMethod<
  DescribeTestSetGenerationRequest,
  DescribeTestSetGenerationResponse,
  DescribeTestSetGenerationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /testsetgenerations/{testSetGenerationId}",
    input: { testSetGenerationId: 0 },
    output: {
      generationDataSource: o_TestSetGenerationDataSource,
      creationDateTime: D.ts,
      lastUpdatedDateTime: D.ts,
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTestSetGeneration",
})) as any;

export type GenerateBotElementError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Generates sample utterances for an intent.
 */
export const generateBotElement: API.OperationMethod<
  GenerateBotElementRequest,
  GenerateBotElementResponse,
  GenerateBotElementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/generate",
    input: { intentId: 0, botId: 0, botVersion: 0, localeId: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateBotElement",
})) as any;

export type GetTestExecutionArtifactsUrlError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The pre-signed Amazon S3 URL to download the test execution result artifacts.
 */
export const getTestExecutionArtifactsUrl: API.OperationMethod<
  GetTestExecutionArtifactsUrlRequest,
  GetTestExecutionArtifactsUrlResponse,
  GetTestExecutionArtifactsUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /testexecutions/{testExecutionId}/artifacturl",
    input: { testExecutionId: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTestExecutionArtifactsUrl",
})) as any;

export type ListAggregatedUtterancesError =
  | InternalServerException
  | PreconditionFailedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides a list of utterances that users have sent to the
 * bot.
 *
 * Utterances are aggregated by the text of the utterance. For example,
 * all instances where customers used the phrase "I want to order pizza"
 * are aggregated into the same line in the response.
 *
 * You can see both detected utterances and missed utterances. A
 * detected utterance is where the bot properly recognized the utterance
 * and activated the associated intent. A missed utterance was not
 * recognized by the bot and didn't activate an intent.
 *
 * Utterances can be aggregated for a bot alias or for a bot version,
 * but not both at the same time.
 *
 * Utterances statistics are not generated under the following
 * conditions:
 *
 * - The `childDirected` field was set to true when the
 * bot was created.
 *
 * - You are using slot obfuscation with one or more slots.
 *
 * - You opted out of participating in improving Amazon Lex.
 */
export const listAggregatedUtterances: API.PaginatedOperationMethod<
  ListAggregatedUtterancesRequest,
  ListAggregatedUtterancesResponse,
  ListAggregatedUtterancesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/aggregatedutterances",
    input: {
      botId: 0,
      botAliasId: 0,
      botVersion: 0,
      localeId: 0,
      aggregationDuration: {
        relativeAggregationDuration: { timeDimension: 0, timeValue: 0 },
      },
      sortBy: { attribute: 0, order: 0 },
      filters: D.list({ name: 0, values: 0, operator: 0 }),
      maxResults: 0,
      nextToken: 0,
    },
    output: {
      aggregationWindowStartTime: D.ts,
      aggregationWindowEndTime: D.ts,
      aggregationLastRefreshedDateTime: D.ts,
      aggregatedUtterancesSummaries: D.list({
        utteranceFirstRecordedInAggregationDuration: D.ts,
        utteranceLastRecordedInAggregationDuration: D.ts,
      }),
    },
    body: true,
  },
  errors: [
    InternalServerException,
    PreconditionFailedException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAggregatedUtterances",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBotAliasesError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets a list of aliases for the specified bot.
 */
export const listBotAliases: API.PaginatedOperationMethod<
  ListBotAliasesRequest,
  ListBotAliasesResponse,
  ListBotAliasesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/botaliases",
    input: { botId: 0, maxResults: 0, nextToken: 0 },
    output: {
      botAliasSummaries: D.list({
        creationDateTime: D.ts,
        lastUpdatedDateTime: D.ts,
      }),
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBotAliases",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBotAliasReplicasError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The action to list the replicated bots created from the source bot alias.
 */
export const listBotAliasReplicas: API.PaginatedOperationMethod<
  ListBotAliasReplicasRequest,
  ListBotAliasReplicasResponse,
  ListBotAliasReplicasError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/replicas/{replicaRegion}/botaliases",
    input: { botId: 0, replicaRegion: 0, maxResults: 0, nextToken: 0 },
    output: {
      botAliasReplicaSummaries: D.list({
        creationDateTime: D.ts,
        lastUpdatedDateTime: D.ts,
      }),
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBotAliasReplicas",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBotAnalyzerHistoryError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of historical bot analysis executions for a specific bot. You can filter the results by locale and bot version.
 *
 * The history includes all analysis executions regardless of their status, allowing you to track past analyses and their outcomes.
 */
export const listBotAnalyzerHistory: API.PaginatedOperationMethod<
  ListBotAnalyzerHistoryRequest,
  ListBotAnalyzerHistoryResponse,
  ListBotAnalyzerHistoryError,
  Credentials | HttpClient.HttpClient,
  BotAnalyzerHistorySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/botanalyzer/history",
    input: {
      botId: 0,
      localeId: 0,
      botVersion: 0,
      nextToken: 0,
      maxResults: 0,
    },
    output: { botAnalyzerHistoryList: D.list({ creationDateTime: D.ts }) },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBotAnalyzerHistory",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "botAnalyzerHistoryList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBotLocalesError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of locales for the specified bot.
 */
export const listBotLocales: API.PaginatedOperationMethod<
  ListBotLocalesRequest,
  ListBotLocalesResponse,
  ListBotLocalesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/botversions/{botVersion}/botlocales",
    input: {
      botId: 0,
      botVersion: 0,
      sortBy: { attribute: 0, order: 0 },
      filters: D.list({ name: 0, values: 0, operator: 0 }),
      maxResults: 0,
      nextToken: 0,
    },
    output: {
      botLocaleSummaries: D.list({
        lastUpdatedDateTime: D.ts,
        lastBuildSubmittedDateTime: D.ts,
      }),
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBotLocales",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBotRecommendationsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a list of bot recommendations that meet the specified
 * criteria.
 */
export const listBotRecommendations: API.PaginatedOperationMethod<
  ListBotRecommendationsRequest,
  ListBotRecommendationsResponse,
  ListBotRecommendationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/botrecommendations",
    input: {
      botId: 0,
      botVersion: 0,
      localeId: 0,
      maxResults: 0,
      nextToken: 0,
    },
    output: {
      botRecommendationSummaries: D.list({
        creationDateTime: D.ts,
        lastUpdatedDateTime: D.ts,
      }),
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBotRecommendations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBotReplicasError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The action to list the replicated bots.
 */
export const listBotReplicas: API.OperationMethod<
  ListBotReplicasRequest,
  ListBotReplicasResponse,
  ListBotReplicasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/replicas",
    input: { botId: 0 },
    output: { botReplicaSummaries: D.list({ creationDateTime: D.ts }) },
  },
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBotReplicas",
})) as any;

export type ListBotResourceGenerationsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the generation requests made for a bot locale.
 */
export const listBotResourceGenerations: API.PaginatedOperationMethod<
  ListBotResourceGenerationsRequest,
  ListBotResourceGenerationsResponse,
  ListBotResourceGenerationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/generations",
    input: {
      botId: 0,
      botVersion: 0,
      localeId: 0,
      sortBy: { attribute: 0, order: 0 },
      maxResults: 0,
      nextToken: 0,
    },
    output: {
      generationSummaries: D.list({
        creationDateTime: D.ts,
        lastUpdatedDateTime: D.ts,
      }),
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBotResourceGenerations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBotsError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of available bots.
 */
export const listBots: API.PaginatedOperationMethod<
  ListBotsRequest,
  ListBotsResponse,
  ListBotsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots",
    input: {
      sortBy: { attribute: 0, order: 0 },
      filters: D.list({ name: 0, values: 0, operator: 0 }),
      maxResults: 0,
      nextToken: 0,
    },
    output: { botSummaries: D.list({ lastUpdatedDateTime: D.ts }) },
    body: true,
  },
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBots",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBotVersionReplicasError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Contains information about all the versions replication statuses applicable for Global Resiliency.
 */
export const listBotVersionReplicas: API.PaginatedOperationMethod<
  ListBotVersionReplicasRequest,
  ListBotVersionReplicasResponse,
  ListBotVersionReplicasError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/replicas/{replicaRegion}/botversions",
    input: {
      botId: 0,
      replicaRegion: 0,
      maxResults: 0,
      nextToken: 0,
      sortBy: { attribute: 0, order: 0 },
    },
    output: { botVersionReplicaSummaries: D.list({ creationDateTime: D.ts }) },
    body: true,
  },
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBotVersionReplicas",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBotVersionsError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about all of the versions of a bot.
 *
 * The `ListBotVersions` operation returns a summary of each
 * version of a bot. For example, if a bot has three numbered versions,
 * the `ListBotVersions` operation returns for summaries, one
 * for each numbered version and one for the `DRAFT`
 * version.
 *
 * The `ListBotVersions` operation always returns at least
 * one version, the `DRAFT` version.
 */
export const listBotVersions: API.PaginatedOperationMethod<
  ListBotVersionsRequest,
  ListBotVersionsResponse,
  ListBotVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/botversions",
    input: {
      botId: 0,
      sortBy: { attribute: 0, order: 0 },
      maxResults: 0,
      nextToken: 0,
    },
    output: { botVersionSummaries: D.list({ creationDateTime: D.ts }) },
    body: true,
  },
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBotVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBuiltInIntentsError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of built-in intents provided by Amazon Lex that you can use
 * in your bot.
 *
 * To use a built-in intent as a the base for your own intent, include
 * the built-in intent signature in the `parentIntentSignature`
 * parameter when you call the `CreateIntent` operation. For
 * more information, see CreateIntent.
 */
export const listBuiltInIntents: API.PaginatedOperationMethod<
  ListBuiltInIntentsRequest,
  ListBuiltInIntentsResponse,
  ListBuiltInIntentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /builtins/locales/{localeId}/intents",
    input: {
      localeId: 0,
      sortBy: { attribute: 0, order: 0 },
      maxResults: 0,
      nextToken: 0,
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBuiltInIntents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBuiltInSlotTypesError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of built-in slot types that meet the specified
 * criteria.
 */
export const listBuiltInSlotTypes: API.PaginatedOperationMethod<
  ListBuiltInSlotTypesRequest,
  ListBuiltInSlotTypesResponse,
  ListBuiltInSlotTypesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /builtins/locales/{localeId}/slottypes",
    input: {
      localeId: 0,
      sortBy: { attribute: 0, order: 0 },
      maxResults: 0,
      nextToken: 0,
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBuiltInSlotTypes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCustomVocabularyItemsError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Paginated list of custom vocabulary items for a given bot locale's
 * custom vocabulary.
 */
export const listCustomVocabularyItems: API.PaginatedOperationMethod<
  ListCustomVocabularyItemsRequest,
  ListCustomVocabularyItemsResponse,
  ListCustomVocabularyItemsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/customvocabulary/DEFAULT/list",
    input: {
      botId: 0,
      botVersion: 0,
      localeId: 0,
      maxResults: 0,
      nextToken: 0,
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomVocabularyItems",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListExportsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the exports for a bot, bot locale, or custom vocabulary.
 * Exports are kept in the list for 7 days.
 */
export const listExports: API.PaginatedOperationMethod<
  ListExportsRequest,
  ListExportsResponse,
  ListExportsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /exports",
    input: {
      botId: 0,
      botVersion: 0,
      sortBy: { attribute: 0, order: 0 },
      filters: D.list({ name: 0, values: 0, operator: 0 }),
      maxResults: 0,
      nextToken: 0,
      localeId: 0,
    },
    output: {
      exportSummaries: D.list({
        creationDateTime: D.ts,
        lastUpdatedDateTime: D.ts,
      }),
    },
    body: true,
  },
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExports",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListImportsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the imports for a bot, bot locale, or custom vocabulary.
 * Imports are kept in the list for 7 days.
 */
export const listImports: API.PaginatedOperationMethod<
  ListImportsRequest,
  ListImportsResponse,
  ListImportsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /imports",
    input: {
      botId: 0,
      botVersion: 0,
      sortBy: { attribute: 0, order: 0 },
      filters: D.list({ name: 0, values: 0, operator: 0 }),
      maxResults: 0,
      nextToken: 0,
      localeId: 0,
    },
    output: {
      importSummaries: D.list({
        creationDateTime: D.ts,
        lastUpdatedDateTime: D.ts,
      }),
    },
    body: true,
  },
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImports",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIntentMetricsError =
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves summary metrics for the intents in your bot. The following fields are required:
 *
 * - `metrics` – A list of AnalyticsIntentMetric objects. In each object, use the `name` field to specify the metric to calculate, the `statistic` field to specify whether to calculate the `Sum`, `Average`, or `Max` number, and the `order` field to specify whether to sort the results in `Ascending` or `Descending` order.
 *
 * - `startDateTime` and `endDateTime` – Define a time range for which you want to retrieve results.
 *
 * Of the optional fields, you can organize the results in the following ways:
 *
 * - Use the `filters` field to filter the results, the `groupBy` field to specify categories by which to group the results, and the `binBy` field to specify time intervals by which to group the results.
 *
 * - Use the `maxResults` field to limit the number of results to return in a single response and the `nextToken` field to return the next batch of results if the response does not return the full set of results.
 *
 * Note that an `order` field exists in both `binBy` and `metrics`. You can specify only one `order` in a given request.
 */
export const listIntentMetrics: API.PaginatedOperationMethod<
  ListIntentMetricsRequest,
  ListIntentMetricsResponse,
  ListIntentMetricsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/analytics/intentmetrics",
    input: {
      botId: 0,
      startDateTime: 0,
      endDateTime: 0,
      metrics: D.list({ name: 0, statistic: 0, order: 0 }),
      binBy: D.list(i_AnalyticsBinBySpecification),
      groupBy: D.list({ name: 0 }),
      filters: D.list({ name: 0, operator: 0, values: 0 }),
      maxResults: 0,
      nextToken: 0,
    },
    body: true,
  },
  errors: [
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIntentMetrics",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIntentPathsError =
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves summary statistics for a path of intents that users take over sessions with your bot. The following fields are required:
 *
 * - `startDateTime` and `endDateTime` – Define a time range for which you want to retrieve results.
 *
 * - `intentPath` – Define an order of intents for which you want to retrieve metrics. Separate intents in the path with a forward slash. For example, populate the `intentPath` field with `/BookCar/BookHotel` to see details about how many times users invoked the `BookCar` and `BookHotel` intents in that order.
 *
 * Use the optional `filters` field to filter the results.
 */
export const listIntentPaths: API.OperationMethod<
  ListIntentPathsRequest,
  ListIntentPathsResponse,
  ListIntentPathsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/analytics/intentpaths",
    input: {
      botId: 0,
      startDateTime: 0,
      endDateTime: 0,
      intentPath: 0,
      filters: D.list({ name: 0, operator: 0, values: 0 }),
    },
    body: true,
  },
  errors: [
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIntentPaths",
})) as any;

export type ListIntentsError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Get a list of intents that meet the specified criteria.
 */
export const listIntents: API.PaginatedOperationMethod<
  ListIntentsRequest,
  ListIntentsResponse,
  ListIntentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/intents",
    input: {
      botId: 0,
      botVersion: 0,
      localeId: 0,
      sortBy: { attribute: 0, order: 0 },
      filters: D.list({ name: 0, values: 0, operator: 0 }),
      maxResults: 0,
      nextToken: 0,
    },
    output: { intentSummaries: D.list({ lastUpdatedDateTime: D.ts }) },
    body: true,
  },
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIntents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIntentStageMetricsError =
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves summary metrics for the stages within intents in your bot. The following fields are required:
 *
 * - `metrics` – A list of AnalyticsIntentStageMetric objects. In each object, use the `name` field to specify the metric to calculate, the `statistic` field to specify whether to calculate the `Sum`, `Average`, or `Max` number, and the `order` field to specify whether to sort the results in `Ascending` or `Descending` order.
 *
 * - `startDateTime` and `endDateTime` – Define a time range for which you want to retrieve results.
 *
 * Of the optional fields, you can organize the results in the following ways:
 *
 * - Use the `filters` field to filter the results, the `groupBy` field to specify categories by which to group the results, and the `binBy` field to specify time intervals by which to group the results.
 *
 * - Use the `maxResults` field to limit the number of results to return in a single response and the `nextToken` field to return the next batch of results if the response does not return the full set of results.
 *
 * Note that an `order` field exists in both `binBy` and `metrics`. You can only specify one `order` in a given request.
 */
export const listIntentStageMetrics: API.PaginatedOperationMethod<
  ListIntentStageMetricsRequest,
  ListIntentStageMetricsResponse,
  ListIntentStageMetricsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/analytics/intentstagemetrics",
    input: {
      botId: 0,
      startDateTime: 0,
      endDateTime: 0,
      metrics: D.list({ name: 0, statistic: 0, order: 0 }),
      binBy: D.list(i_AnalyticsBinBySpecification),
      groupBy: D.list({ name: 0 }),
      filters: D.list({ name: 0, operator: 0, values: 0 }),
      maxResults: 0,
      nextToken: 0,
    },
    body: true,
  },
  errors: [
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIntentStageMetrics",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRecommendedIntentsError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of recommended intents provided by the bot
 * recommendation that you can use in your bot. Intents in the
 * response are ordered by relevance.
 */
export const listRecommendedIntents: API.PaginatedOperationMethod<
  ListRecommendedIntentsRequest,
  ListRecommendedIntentsResponse,
  ListRecommendedIntentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/botrecommendations/{botRecommendationId}/intents",
    input: {
      botId: 0,
      botVersion: 0,
      localeId: 0,
      botRecommendationId: 0,
      nextToken: 0,
      maxResults: 0,
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommendedIntents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSessionAnalyticsDataError =
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of metadata for individual user sessions with your bot. The `startDateTime` and `endDateTime` fields are required. These fields define a time range for which you want to retrieve results. Of the optional fields, you can organize the results in the following ways:
 *
 * - Use the `filters` field to filter the results and the `sortBy` field to specify the values by which to sort the results.
 *
 * - Use the `maxResults` field to limit the number of results to return in a single response and the `nextToken` field to return the next batch of results if the response does not return the full set of results.
 */
export const listSessionAnalyticsData: API.PaginatedOperationMethod<
  ListSessionAnalyticsDataRequest,
  ListSessionAnalyticsDataResponse,
  ListSessionAnalyticsDataError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/analytics/sessions",
    input: {
      botId: 0,
      startDateTime: 0,
      endDateTime: 0,
      sortBy: { name: 0, order: 0 },
      filters: D.list(i_AnalyticsSessionFilter),
      maxResults: 0,
      nextToken: 0,
    },
    output: {
      sessions: D.list({
        conversationStartTime: D.ts,
        conversationEndTime: D.ts,
      }),
    },
    body: true,
  },
  errors: [
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSessionAnalyticsData",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSessionMetricsError =
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves summary metrics for the user sessions with your bot. The following fields are required:
 *
 * - `metrics` – A list of AnalyticsSessionMetric objects. In each object, use the `name` field to specify the metric to calculate, the `statistic` field to specify whether to calculate the `Sum`, `Average`, or `Max` number, and the `order` field to specify whether to sort the results in `Ascending` or `Descending` order.
 *
 * - `startDateTime` and `endDateTime` – Define a time range for which you want to retrieve results.
 *
 * Of the optional fields, you can organize the results in the following ways:
 *
 * - Use the `filters` field to filter the results, the `groupBy` field to specify categories by which to group the results, and the `binBy` field to specify time intervals by which to group the results.
 *
 * - Use the `maxResults` field to limit the number of results to return in a single response and the `nextToken` field to return the next batch of results if the response does not return the full set of results.
 *
 * Note that an `order` field exists in both `binBy` and `metrics`. Currently, you can specify it in either field, but not in both.
 */
export const listSessionMetrics: API.PaginatedOperationMethod<
  ListSessionMetricsRequest,
  ListSessionMetricsResponse,
  ListSessionMetricsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/analytics/sessionmetrics",
    input: {
      botId: 0,
      startDateTime: 0,
      endDateTime: 0,
      metrics: D.list({ name: 0, statistic: 0, order: 0 }),
      binBy: D.list(i_AnalyticsBinBySpecification),
      groupBy: D.list({ name: 0 }),
      filters: D.list(i_AnalyticsSessionFilter),
      maxResults: 0,
      nextToken: 0,
    },
    body: true,
  },
  errors: [
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSessionMetrics",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSlotsError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of slots that match the specified criteria.
 */
export const listSlots: API.PaginatedOperationMethod<
  ListSlotsRequest,
  ListSlotsResponse,
  ListSlotsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/intents/{intentId}/slots",
    input: {
      botId: 0,
      botVersion: 0,
      localeId: 0,
      intentId: 0,
      sortBy: { attribute: 0, order: 0 },
      filters: D.list({ name: 0, values: 0, operator: 0 }),
      maxResults: 0,
      nextToken: 0,
    },
    output: { slotSummaries: D.list({ lastUpdatedDateTime: D.ts }) },
    body: true,
  },
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSlots",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSlotTypesError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets a list of slot types that match the specified criteria.
 */
export const listSlotTypes: API.PaginatedOperationMethod<
  ListSlotTypesRequest,
  ListSlotTypesResponse,
  ListSlotTypesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/slottypes",
    input: {
      botId: 0,
      botVersion: 0,
      localeId: 0,
      sortBy: { attribute: 0, order: 0 },
      filters: D.list({ name: 0, values: 0, operator: 0 }),
      maxResults: 0,
      nextToken: 0,
    },
    output: { slotTypeSummaries: D.list({ lastUpdatedDateTime: D.ts }) },
    body: true,
  },
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSlotTypes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of tags associated with a resource. Only bots, bot
 * aliases, and bot channels can have tags associated with them.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceARN}",
    input: { resourceARN: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListTestExecutionResultItemsError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of test execution result items.
 */
export const listTestExecutionResultItems: API.PaginatedOperationMethod<
  ListTestExecutionResultItemsRequest,
  ListTestExecutionResultItemsResponse,
  ListTestExecutionResultItemsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /testexecutions/{testExecutionId}/results",
    input: {
      testExecutionId: 0,
      resultFilterBy: {
        resultTypeFilter: 0,
        conversationLevelTestResultsFilterBy: { endToEndResult: 0 },
      },
      maxResults: 0,
      nextToken: 0,
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestExecutionResultItems",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTestExecutionsError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The list of test set executions.
 */
export const listTestExecutions: API.PaginatedOperationMethod<
  ListTestExecutionsRequest,
  ListTestExecutionsResponse,
  ListTestExecutionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /testexecutions",
    input: { sortBy: { attribute: 0, order: 0 }, maxResults: 0, nextToken: 0 },
    output: {
      testExecutions: D.list({
        creationDateTime: D.ts,
        lastUpdatedDateTime: D.ts,
      }),
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTestSetRecordsError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The list of test set records.
 */
export const listTestSetRecords: API.PaginatedOperationMethod<
  ListTestSetRecordsRequest,
  ListTestSetRecordsResponse,
  ListTestSetRecordsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /testsets/{testSetId}/records",
    input: { testSetId: 0, maxResults: 0, nextToken: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestSetRecords",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTestSetsError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The list of the test sets
 */
export const listTestSets: API.PaginatedOperationMethod<
  ListTestSetsRequest,
  ListTestSetsResponse,
  ListTestSetsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /testsets",
    input: { sortBy: { attribute: 0, order: 0 }, maxResults: 0, nextToken: 0 },
    output: {
      testSets: D.list({ creationDateTime: D.ts, lastUpdatedDateTime: D.ts }),
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestSets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListUtteranceAnalyticsDataError =
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * To use this API operation, your IAM role must have permissions to
 * perform the ListAggregatedUtterances operation, which provides access to
 * utterance-related analytics. See Viewing utterance
 * statistics for the IAM policy to apply to the IAM role.
 *
 * Retrieves a list of metadata for individual user utterances to your bot. The following fields are required:
 *
 * - `startDateTime` and `endDateTime` – Define a time range for which you want to retrieve results.
 *
 * Of the optional fields, you can organize the results in the following ways:
 *
 * - Use the `filters` field to filter the results and the `sortBy` field to specify the values by which to sort the results.
 *
 * - Use the `maxResults` field to limit the number of results to return in a single response and the `nextToken` field to return the next batch of results if the response does not return the full set of results.
 */
export const listUtteranceAnalyticsData: API.PaginatedOperationMethod<
  ListUtteranceAnalyticsDataRequest,
  ListUtteranceAnalyticsDataResponse,
  ListUtteranceAnalyticsDataError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/analytics/utterances",
    input: {
      botId: 0,
      startDateTime: 0,
      endDateTime: 0,
      sortBy: { name: 0, order: 0 },
      filters: D.list(i_AnalyticsUtteranceFilter),
      maxResults: 0,
      nextToken: 0,
    },
    output: {
      utterances: D.list({
        conversationStartTime: D.ts,
        conversationEndTime: D.ts,
        utteranceTimestamp: D.ts,
      }),
    },
    body: true,
  },
  errors: [
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUtteranceAnalyticsData",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListUtteranceMetricsError =
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * To use this API operation, your IAM role must have permissions to
 * perform the ListAggregatedUtterances operation, which provides access to
 * utterance-related analytics. See Viewing utterance
 * statistics for the IAM policy to apply to the IAM role.
 *
 * Retrieves summary metrics for the utterances in your bot. The following fields are required:
 *
 * - `metrics` – A list of AnalyticsUtteranceMetric objects. In each object, use the `name` field to specify the metric to calculate, the `statistic` field to specify whether to calculate the `Sum`, `Average`, or `Max` number, and the `order` field to specify whether to sort the results in `Ascending` or `Descending` order.
 *
 * - `startDateTime` and `endDateTime` – Define a time range for which you want to retrieve results.
 *
 * Of the optional fields, you can organize the results in the following ways:
 *
 * - Use the `filters` field to filter the results, the `groupBy` field to specify categories by which to group the results, and the `binBy` field to specify time intervals by which to group the results.
 *
 * - Use the `maxResults` field to limit the number of results to return in a single response and the `nextToken` field to return the next batch of results if the response does not return the full set of results.
 *
 * Note that an `order` field exists in both `binBy` and `metrics`. Currently, you can specify it in either field, but not in both.
 */
export const listUtteranceMetrics: API.PaginatedOperationMethod<
  ListUtteranceMetricsRequest,
  ListUtteranceMetricsResponse,
  ListUtteranceMetricsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/analytics/utterancemetrics",
    input: {
      botId: 0,
      startDateTime: 0,
      endDateTime: 0,
      metrics: D.list({ name: 0, statistic: 0, order: 0 }),
      binBy: D.list(i_AnalyticsBinBySpecification),
      groupBy: D.list({ name: 0 }),
      attributes: D.list({ name: 0 }),
      filters: D.list(i_AnalyticsUtteranceFilter),
      maxResults: 0,
      nextToken: 0,
    },
    body: true,
  },
  errors: [
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUtteranceMetrics",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchAssociatedTranscriptsError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Search for associated transcripts that meet the specified
 * criteria.
 */
export const searchAssociatedTranscripts: API.OperationMethod<
  SearchAssociatedTranscriptsRequest,
  SearchAssociatedTranscriptsResponse,
  SearchAssociatedTranscriptsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/botrecommendations/{botRecommendationId}/associatedtranscripts",
    input: {
      botId: 0,
      botVersion: 0,
      localeId: 0,
      botRecommendationId: 0,
      searchOrder: 0,
      filters: D.list({ name: 0, values: 0 }),
      maxResults: 0,
      nextIndex: 0,
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchAssociatedTranscripts",
})) as any;

export type StartBotAnalyzerError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates an asynchronous analysis of your bot configuration using AI-powered analysis to identify potential issues and recommend improvements based on AWS best practices.
 *
 * The analysis examines your bot's configuration, including intents, utterances, slots, and conversation flows, to provide actionable recommendations for optimization.
 */
export const startBotAnalyzer: API.OperationMethod<
  StartBotAnalyzerRequest,
  StartBotAnalyzerResponse,
  StartBotAnalyzerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{botId}/botanalyzer",
    input: { botId: 0, analysisScope: 0, localeId: 0, botVersion: 0 },
    output: { creationDateTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartBotAnalyzer",
})) as any;

export type StartBotRecommendationError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this to provide your transcript data, and to start the bot
 * recommendation process.
 */
export const startBotRecommendation: API.OperationMethod<
  StartBotRecommendationRequest,
  StartBotRecommendationResponse,
  StartBotRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/botrecommendations",
    input: {
      botId: 0,
      botVersion: 0,
      localeId: 0,
      transcriptSourceSetting: {
        s3BucketTranscriptSource: {
          s3BucketName: 0,
          pathFormat: { objectPrefixes: 0 },
          transcriptFormat: 0,
          transcriptFilter: {
            lexTranscriptFilter: {
              dateRangeFilter: { startDateTime: 0, endDateTime: 0 },
            },
          },
          kmsKeyArn: 0,
        },
      },
      encryptionSetting: i_EncryptionSetting,
    },
    output: {
      creationDateTime: D.ts,
      transcriptSourceSetting: o_TranscriptSourceSetting,
      encryptionSetting: o_EncryptionSetting,
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartBotRecommendation",
})) as any;

export type StartBotResourceGenerationError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a request for the descriptive bot builder to generate a bot locale configuration
 * based on the prompt you provide it. After you make this call, use the `DescribeBotResourceGeneration`
 * operation to check on the status of the generation and for the `generatedBotLocaleUrl` when the
 * generation is complete. Use that value to retrieve the Amazon S3 object containing the bot locale configuration. You can
 * then modify and import this configuration.
 */
export const startBotResourceGeneration: API.OperationMethod<
  StartBotResourceGenerationRequest,
  StartBotResourceGenerationResponse,
  StartBotResourceGenerationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/startgeneration",
    input: { generationInputPrompt: 0, botId: 0, botVersion: 0, localeId: 0 },
    output: { creationDateTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartBotResourceGeneration",
})) as any;

export type StartImportError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts importing a bot, bot locale, or custom vocabulary from a zip
 * archive that you uploaded to an S3 bucket.
 */
export const startImport: API.OperationMethod<
  StartImportRequest,
  StartImportResponse,
  StartImportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /imports",
    input: {
      importId: 0,
      resourceSpecification: {
        botImportSpecification: {
          botName: 0,
          roleArn: 0,
          dataPrivacy: i_DataPrivacy,
          errorLogSettings: i_ErrorLogSettings,
          idleSessionTTLInSeconds: 0,
          botTags: 0,
          testBotAliasTags: 0,
        },
        botLocaleImportSpecification: {
          botId: 0,
          botVersion: 0,
          localeId: 0,
          nluIntentConfidenceThreshold: 0,
          voiceSettings: i_VoiceSettings,
          speechRecognitionSettings: i_SpeechRecognitionSettings,
          speechDetectionSensitivity: 0,
          unifiedSpeechSettings: i_UnifiedSpeechSettings,
          audioFillerSettings: i_AudioFillerSettings,
        },
        customVocabularyImportSpecification: {
          botId: 0,
          botVersion: 0,
          localeId: 0,
        },
        testSetImportResourceSpecification: {
          testSetName: 0,
          description: 0,
          roleArn: 0,
          storageLocation: i_TestSetStorageLocation,
          importInputLocation: { s3BucketName: 0, s3Path: 0 },
          modality: 0,
          testSetTags: 0,
        },
      },
      mergeStrategy: 0,
      filePassword: 0,
    },
    output: { creationDateTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartImport",
})) as any;

export type StartTestExecutionError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The action to start test set execution.
 */
export const startTestExecution: API.OperationMethod<
  StartTestExecutionRequest,
  StartTestExecutionResponse,
  StartTestExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /testsets/{testSetId}/testexecutions",
    input: {
      testSetId: 0,
      target: { botAliasTarget: { botId: 0, botAliasId: 0, localeId: 0 } },
      apiMode: 0,
      testExecutionModality: 0,
    },
    output: { creationDateTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTestExecution",
})) as any;

export type StartTestSetGenerationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The action to start the generation of test set.
 */
export const startTestSetGeneration: API.OperationMethod<
  StartTestSetGenerationRequest,
  StartTestSetGenerationResponse,
  StartTestSetGenerationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /testsetgenerations",
    input: {
      testSetName: 0,
      description: 0,
      storageLocation: i_TestSetStorageLocation,
      generationDataSource: {
        conversationLogsDataSource: {
          botId: 0,
          botAliasId: 0,
          localeId: 0,
          filter: { startTime: 0, endTime: 0, inputMode: 0 },
        },
      },
      roleArn: 0,
      testSetTags: 0,
    },
    output: {
      creationDateTime: D.ts,
      generationDataSource: o_TestSetGenerationDataSource,
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTestSetGeneration",
})) as any;

export type StopBotAnalyzerError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels an ongoing bot analysis execution. Once stopped, the analysis cannot be resumed and no recommendations will be generated.
 */
export const stopBotAnalyzer: API.OperationMethod<
  StopBotAnalyzerRequest,
  StopBotAnalyzerResponse,
  StopBotAnalyzerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /bots/{botId}/botanalyzer/{botAnalyzerRequestId}/stop",
    input: { botId: 0, botAnalyzerRequestId: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopBotAnalyzer",
})) as any;

export type StopBotRecommendationError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stop an already running Bot Recommendation request.
 */
export const stopBotRecommendation: API.OperationMethod<
  StopBotRecommendationRequest,
  StopBotRecommendationResponse,
  StopBotRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/botrecommendations/{botRecommendationId}/stopbotrecommendation",
    input: { botId: 0, botVersion: 0, localeId: 0, botRecommendationId: 0 },
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopBotRecommendation",
})) as any;

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds the specified tags to the specified resource. If a tag key
 * already exists, the existing value is replaced with the new
 * value.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceARN}",
    input: { resourceARN: 0, tags: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from a bot, bot alias, or bot channel.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceARN}",
    input: { resourceARN: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateBotError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an existing bot.
 */
export const updateBot: API.OperationMethod<
  UpdateBotRequest,
  UpdateBotResponse,
  UpdateBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /bots/{botId}",
    input: {
      botId: 0,
      botName: 0,
      description: 0,
      roleArn: 0,
      dataPrivacy: i_DataPrivacy,
      idleSessionTTLInSeconds: 0,
      botType: 0,
      botMembers: D.list(i_BotMember),
      errorLogSettings: i_ErrorLogSettings,
    },
    output: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBot",
})) as any;

export type UpdateBotAliasError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an existing bot alias.
 */
export const updateBotAlias: API.OperationMethod<
  UpdateBotAliasRequest,
  UpdateBotAliasResponse,
  UpdateBotAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /bots/{botId}/botaliases/{botAliasId}",
    input: {
      botAliasId: 0,
      botAliasName: 0,
      description: 0,
      botVersion: 0,
      botAliasLocaleSettings: D.map(i_BotAliasLocaleSettings),
      conversationLogSettings: i_ConversationLogSettings,
      sentimentAnalysisSettings: i_SentimentAnalysisSettings,
      botId: 0,
    },
    output: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBotAlias",
})) as any;

export type UpdateBotLocaleError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the settings that a bot has for a specific locale.
 */
export const updateBotLocale: API.OperationMethod<
  UpdateBotLocaleRequest,
  UpdateBotLocaleResponse,
  UpdateBotLocaleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}",
    input: {
      botId: 0,
      botVersion: 0,
      localeId: 0,
      description: 0,
      nluIntentConfidenceThreshold: 0,
      voiceSettings: i_VoiceSettings,
      unifiedSpeechSettings: i_UnifiedSpeechSettings,
      audioFillerSettings: i_AudioFillerSettings,
      speechRecognitionSettings: i_SpeechRecognitionSettings,
      generativeAISettings: i_GenerativeAISettings,
      speechDetectionSensitivity: 0,
    },
    output: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBotLocale",
})) as any;

export type UpdateBotRecommendationError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing bot recommendation request.
 */
export const updateBotRecommendation: API.OperationMethod<
  UpdateBotRecommendationRequest,
  UpdateBotRecommendationResponse,
  UpdateBotRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/botrecommendations/{botRecommendationId}",
    input: {
      botId: 0,
      botVersion: 0,
      localeId: 0,
      botRecommendationId: 0,
      encryptionSetting: i_EncryptionSetting,
    },
    output: {
      creationDateTime: D.ts,
      lastUpdatedDateTime: D.ts,
      transcriptSourceSetting: o_TranscriptSourceSetting,
      encryptionSetting: o_EncryptionSetting,
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBotRecommendation",
})) as any;

export type UpdateExportError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the password used to protect an export zip archive.
 *
 * The password is not required. If you don't supply a password, Amazon Lex
 * generates a zip file that is not protected by a password. This is the
 * archive that is available at the pre-signed S3 URL provided by the
 * DescribeExport operation.
 */
export const updateExport: API.OperationMethod<
  UpdateExportRequest,
  UpdateExportResponse,
  UpdateExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /exports/{exportId}",
    input: { exportId: 0, filePassword: 0 },
    output: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateExport",
})) as any;

export type UpdateIntentError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the settings for an intent.
 */
export const updateIntent: API.OperationMethod<
  UpdateIntentRequest,
  UpdateIntentResponse,
  UpdateIntentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/intents/{intentId}",
    input: {
      intentId: 0,
      intentName: 0,
      intentDisplayName: 0,
      description: 0,
      parentIntentSignature: 0,
      sampleUtterances: D.list(i_SampleUtterance),
      dialogCodeHook: i_DialogCodeHookSettings,
      fulfillmentCodeHook: i_FulfillmentCodeHookSettings,
      slotPriorities: D.list({ priority: 0, slotId: 0 }),
      intentConfirmationSetting: i_IntentConfirmationSetting,
      intentClosingSetting: i_IntentClosingSetting,
      inputContexts: D.list(i_InputContext),
      outputContexts: D.list(i_OutputContext),
      kendraConfiguration: i_KendraConfiguration,
      botId: 0,
      botVersion: 0,
      localeId: 0,
      initialResponseSetting: i_InitialResponseSetting,
      qnAIntentConfiguration: i_QnAIntentConfiguration,
      qInConnectIntentConfiguration: i_QInConnectIntentConfiguration,
    },
    output: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIntent",
})) as any;

export type UpdateResourcePolicyError =
  | InternalServerException
  | PreconditionFailedException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Replaces the existing resource policy for a bot or bot alias with a
 * new one. If the policy doesn't exist, Amazon Lex returns an
 * exception.
 */
export const updateResourcePolicy: API.OperationMethod<
  UpdateResourcePolicyRequest,
  UpdateResourcePolicyResponse,
  UpdateResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /policy/{resourceArn}",
    input: {
      resourceArn: 0,
      policy: 0,
      expectedRevisionId: D.m({ query: "expectedRevisionId" }),
    },
    body: true,
  },
  errors: [
    InternalServerException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResourcePolicy",
})) as any;

export type UpdateSlotError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the settings for a slot.
 */
export const updateSlot: API.OperationMethod<
  UpdateSlotRequest,
  UpdateSlotResponse,
  UpdateSlotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/intents/{intentId}/slots/{slotId}",
    input: {
      slotId: 0,
      slotName: 0,
      description: 0,
      slotTypeId: 0,
      valueElicitationSetting: i_SlotValueElicitationSetting,
      obfuscationSetting: i_ObfuscationSetting,
      botId: 0,
      botVersion: 0,
      localeId: 0,
      intentId: 0,
      multipleValuesSetting: i_MultipleValuesSetting,
      subSlotSetting: i_SubSlotSetting,
    },
    output: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSlot",
})) as any;

export type UpdateSlotTypeError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an existing slot type.
 */
export const updateSlotType: API.OperationMethod<
  UpdateSlotTypeRequest,
  UpdateSlotTypeResponse,
  UpdateSlotTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/slottypes/{slotTypeId}",
    input: {
      slotTypeId: 0,
      slotTypeName: 0,
      description: 0,
      slotTypeValues: D.list(i_SlotTypeValue),
      valueSelectionSetting: i_SlotValueSelectionSetting,
      parentSlotTypeSignature: 0,
      botId: 0,
      botVersion: 0,
      localeId: 0,
      externalSourceSetting: i_ExternalSourceSetting,
      compositeSlotTypeSetting: i_CompositeSlotTypeSetting,
    },
    output: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSlotType",
})) as any;

export type UpdateTestSetError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The action to update the test set.
 */
export const updateTestSet: API.OperationMethod<
  UpdateTestSetRequest,
  UpdateTestSetResponse,
  UpdateTestSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /testsets/{testSetId}",
    input: { testSetId: 0, testSetName: 0, description: 0 },
    output: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTestSet",
})) as any;

const i_AnalyticsBinBySpecification: D.LazyStruct = () => ({
  name: 0,
  interval: 0,
  order: 0,
});
const i_AnalyticsSessionFilter: D.LazyStruct = () => ({
  name: 0,
  operator: 0,
  values: 0,
});
const i_AnalyticsUtteranceFilter: D.LazyStruct = () => ({
  name: 0,
  operator: 0,
  values: 0,
});
const i_AudioFillerSettings: D.LazyStruct = () => ({
  enabled: 0,
  audioType: 0,
  startDelayInMilliseconds: 0,
  minimumPlayDurationInMilliseconds: 0,
  responseDeliveryDelayInMilliseconds: 0,
});
const i_BotAliasLocaleSettings: D.LazyStruct = () => ({
  enabled: 0,
  codeHookSpecification: {
    lambdaCodeHook: { lambdaARN: 0, codeHookInterfaceVersion: 0 },
  },
});
const i_BotMember: D.LazyStruct = () => ({
  botMemberId: 0,
  botMemberName: 0,
  botMemberAliasId: 0,
  botMemberAliasName: 0,
  botMemberVersion: 0,
});
const i_CompositeSlotTypeSetting: D.LazyStruct = () => ({
  subSlots: D.list({ name: 0, slotTypeId: 0 }),
});
const i_ConversationLogSettings: D.LazyStruct = () => ({
  textLogSettings: D.list({
    enabled: 0,
    destination: { cloudWatch: { cloudWatchLogGroupArn: 0, logPrefix: 0 } },
    selectiveLoggingEnabled: 0,
  }),
  audioLogSettings: D.list({
    enabled: 0,
    destination: { s3Bucket: { kmsKeyArn: 0, s3BucketArn: 0, logPrefix: 0 } },
    selectiveLoggingEnabled: 0,
  }),
});
const i_DataPrivacy: D.LazyStruct = () => ({ childDirected: 0 });
const i_DialogCodeHookSettings: D.LazyStruct = () => ({ enabled: 0 });
const i_EncryptionSetting: D.LazyStruct = () => ({
  kmsKeyArn: 0,
  botLocaleExportPassword: 0,
  associatedTranscriptsPassword: 0,
});
const i_ErrorLogSettings: D.LazyStruct = () => ({ enabled: 0 });
const i_ExternalSourceSetting: D.LazyStruct = () => ({
  grammarSlotTypeSetting: {
    source: { s3BucketName: 0, s3ObjectKey: 0, kmsKeyArn: 0 },
  },
});
const i_FulfillmentCodeHookSettings: D.LazyStruct = () => ({
  enabled: 0,
  postFulfillmentStatusSpecification: {
    successResponse: i_ResponseSpecification,
    failureResponse: i_ResponseSpecification,
    timeoutResponse: i_ResponseSpecification,
    successNextStep: i_DialogState,
    successConditional: i_ConditionalSpecification,
    failureNextStep: i_DialogState,
    failureConditional: i_ConditionalSpecification,
    timeoutNextStep: i_DialogState,
    timeoutConditional: i_ConditionalSpecification,
  },
  fulfillmentUpdatesSpecification: {
    active: 0,
    startResponse: {
      delayInSeconds: 0,
      messageGroups: D.list(i_MessageGroup),
      allowInterrupt: 0,
    },
    updateResponse: {
      frequencyInSeconds: 0,
      messageGroups: D.list(i_MessageGroup),
      allowInterrupt: 0,
    },
    timeoutInSeconds: 0,
  },
  active: 0,
});
const i_GenerativeAISettings: D.LazyStruct = () => ({
  runtimeSettings: {
    slotResolutionImprovement: {
      enabled: 0,
      bedrockModelSpecification: i_BedrockModelSpecification,
    },
    nluImprovement: {
      enabled: 0,
      assistedNluMode: 0,
      intentDisambiguationSettings: {
        enabled: 0,
        maxDisambiguationIntents: 0,
        customDisambiguationMessage: 0,
      },
    },
  },
  buildtimeSettings: {
    descriptiveBotBuilder: {
      enabled: 0,
      bedrockModelSpecification: i_BedrockModelSpecification,
    },
    sampleUtteranceGeneration: {
      enabled: 0,
      bedrockModelSpecification: i_BedrockModelSpecification,
    },
  },
});
const i_InitialResponseSetting: D.LazyStruct = () => ({
  initialResponse: i_ResponseSpecification,
  nextStep: i_DialogState,
  conditional: i_ConditionalSpecification,
  codeHook: i_DialogCodeHookInvocationSetting,
});
const i_InputContext: D.LazyStruct = () => ({ name: 0 });
const i_IntentClosingSetting: D.LazyStruct = () => ({
  closingResponse: i_ResponseSpecification,
  active: 0,
  nextStep: i_DialogState,
  conditional: i_ConditionalSpecification,
});
const i_IntentConfirmationSetting: D.LazyStruct = () => ({
  promptSpecification: i_PromptSpecification,
  declinationResponse: i_ResponseSpecification,
  active: 0,
  confirmationResponse: i_ResponseSpecification,
  confirmationNextStep: i_DialogState,
  confirmationConditional: i_ConditionalSpecification,
  declinationNextStep: i_DialogState,
  declinationConditional: i_ConditionalSpecification,
  failureResponse: i_ResponseSpecification,
  failureNextStep: i_DialogState,
  failureConditional: i_ConditionalSpecification,
  codeHook: i_DialogCodeHookInvocationSetting,
  elicitationCodeHook: i_ElicitationCodeHookInvocationSetting,
});
const i_KendraConfiguration: D.LazyStruct = () => ({
  kendraIndex: 0,
  queryFilterStringEnabled: 0,
  queryFilterString: 0,
});
const i_MultipleValuesSetting: D.LazyStruct = () => ({
  allowMultipleValues: 0,
});
const i_ObfuscationSetting: D.LazyStruct = () => ({
  obfuscationSettingType: 0,
});
const i_OutputContext: D.LazyStruct = () => ({
  name: 0,
  timeToLiveInSeconds: 0,
  turnsToLive: 0,
});
const i_QInConnectIntentConfiguration: D.LazyStruct = () => ({
  qInConnectAssistantConfiguration: { assistantArn: 0 },
});
const i_QnAIntentConfiguration: D.LazyStruct = () => ({
  dataSourceConfiguration: {
    opensearchConfiguration: {
      domainEndpoint: 0,
      indexName: 0,
      exactResponse: 0,
      exactResponseFields: { questionField: 0, answerField: 0 },
      includeFields: 0,
    },
    kendraConfiguration: {
      kendraIndex: 0,
      queryFilterStringEnabled: 0,
      queryFilterString: 0,
      exactResponse: 0,
    },
    bedrockKnowledgeStoreConfiguration: {
      bedrockKnowledgeBaseArn: 0,
      exactResponse: 0,
      exactResponseFields: { answerField: 0 },
    },
  },
  bedrockModelConfiguration: i_BedrockModelSpecification,
});
const i_SampleUtterance: D.LazyStruct = () => ({ utterance: 0 });
const i_SentimentAnalysisSettings: D.LazyStruct = () => ({
  detectSentiment: 0,
});
const i_SlotTypeValue: D.LazyStruct = () => ({
  sampleValue: i_SampleValue,
  synonyms: D.list(i_SampleValue),
});
const i_SlotValueElicitationSetting: D.LazyStruct = () => ({
  defaultValueSpecification: i_SlotDefaultValueSpecification,
  slotConstraint: 0,
  promptSpecification: i_PromptSpecification,
  sampleUtterances: D.list(i_SampleUtterance),
  waitAndContinueSpecification: i_WaitAndContinueSpecification,
  slotCaptureSetting: {
    captureResponse: i_ResponseSpecification,
    captureNextStep: i_DialogState,
    captureConditional: i_ConditionalSpecification,
    failureResponse: i_ResponseSpecification,
    failureNextStep: i_DialogState,
    failureConditional: i_ConditionalSpecification,
    codeHook: i_DialogCodeHookInvocationSetting,
    elicitationCodeHook: i_ElicitationCodeHookInvocationSetting,
  },
  slotResolutionSetting: { slotResolutionStrategy: 0 },
});
const i_SlotValueSelectionSetting: D.LazyStruct = () => ({
  resolutionStrategy: 0,
  regexFilter: { pattern: 0 },
  advancedRecognitionSetting: { audioRecognitionStrategy: 0 },
});
const i_SpeechRecognitionSettings: D.LazyStruct = () => ({
  speechModelPreference: 0,
  speechModelConfig: { deepgramConfig: { apiTokenSecretArn: 0, modelId: 0 } },
});
const i_SubSlotSetting: D.LazyStruct = () => ({
  expression: 0,
  slotSpecifications: D.map({
    slotTypeId: 0,
    valueElicitationSetting: {
      defaultValueSpecification: i_SlotDefaultValueSpecification,
      promptSpecification: i_PromptSpecification,
      sampleUtterances: D.list(i_SampleUtterance),
      waitAndContinueSpecification: i_WaitAndContinueSpecification,
    },
  }),
});
const i_TestSetStorageLocation: D.LazyStruct = () => ({
  s3BucketName: 0,
  s3Path: 0,
  kmsKeyArn: 0,
});
const i_UnifiedSpeechSettings: D.LazyStruct = () => ({
  speechFoundationModel: { modelArn: 0, voiceId: 0 },
});
const i_VoiceSettings: D.LazyStruct = () => ({ engine: 0, voiceId: 0 });
const o_EncryptionSetting: D.LazyStruct = () => ({
  botLocaleExportPassword: D.secret,
  associatedTranscriptsPassword: D.secret,
});
const o_TestSetGenerationDataSource: D.LazyStruct = () => ({
  conversationLogsDataSource: { filter: { startTime: D.ts, endTime: D.ts } },
});
const o_TranscriptSourceSetting: D.LazyStruct = () => ({
  s3BucketTranscriptSource: {
    transcriptFilter: {
      lexTranscriptFilter: {
        dateRangeFilter: { startDateTime: D.ts, endDateTime: D.ts },
      },
    },
  },
});
const i_BedrockModelSpecification: D.LazyStruct = () => ({
  modelArn: 0,
  guardrail: { identifier: 0, version: 0 },
  traceStatus: 0,
  customPrompt: 0,
});
const i_ConditionalSpecification: D.LazyStruct = () => ({
  active: 0,
  conditionalBranches: D.list({
    name: 0,
    condition: { expressionString: 0 },
    nextStep: i_DialogState,
    response: i_ResponseSpecification,
  }),
  defaultBranch: { nextStep: i_DialogState, response: i_ResponseSpecification },
});
const i_DialogCodeHookInvocationSetting: D.LazyStruct = () => ({
  enableCodeHookInvocation: 0,
  active: 0,
  invocationLabel: 0,
  postCodeHookSpecification: {
    successResponse: i_ResponseSpecification,
    successNextStep: i_DialogState,
    successConditional: i_ConditionalSpecification,
    failureResponse: i_ResponseSpecification,
    failureNextStep: i_DialogState,
    failureConditional: i_ConditionalSpecification,
    timeoutResponse: i_ResponseSpecification,
    timeoutNextStep: i_DialogState,
    timeoutConditional: i_ConditionalSpecification,
  },
});
const i_DialogState: D.LazyStruct = () => ({
  dialogAction: { type: 0, slotToElicit: 0, suppressNextMessage: 0 },
  intent: { name: 0, slots: D.map(i_SlotValueOverride) },
  sessionAttributes: 0,
});
const i_ElicitationCodeHookInvocationSetting: D.LazyStruct = () => ({
  enableCodeHookInvocation: 0,
  invocationLabel: 0,
});
const i_MessageGroup: D.LazyStruct = () => ({
  message: i_Message,
  variations: D.list(i_Message),
});
const i_PromptSpecification: D.LazyStruct = () => ({
  messageGroups: D.list(i_MessageGroup),
  maxRetries: 0,
  allowInterrupt: 0,
  messageSelectionStrategy: 0,
  promptAttemptsSpecification: D.map({
    allowInterrupt: 0,
    allowedInputTypes: { allowAudioInput: 0, allowDTMFInput: 0 },
    audioAndDTMFInputSpecification: {
      startTimeoutMs: 0,
      audioSpecification: { maxLengthMs: 0, endTimeoutMs: 0 },
      dtmfSpecification: {
        maxLength: 0,
        endTimeoutMs: 0,
        deletionCharacter: 0,
        endCharacter: 0,
      },
    },
    textInputSpecification: { startTimeoutMs: 0 },
  }),
});
const i_ResponseSpecification: D.LazyStruct = () => ({
  messageGroups: D.list(i_MessageGroup),
  allowInterrupt: 0,
});
const i_SampleValue: D.LazyStruct = () => ({ value: 0 });
const i_SlotDefaultValueSpecification: D.LazyStruct = () => ({
  defaultValueList: D.list({ defaultValue: 0 }),
});
const i_WaitAndContinueSpecification: D.LazyStruct = () => ({
  waitingResponse: i_ResponseSpecification,
  continueResponse: i_ResponseSpecification,
  stillWaitingResponse: {
    messageGroups: D.list(i_MessageGroup),
    frequencyInSeconds: 0,
    timeoutInSeconds: 0,
    allowInterrupt: 0,
  },
  active: 0,
});
const i_Message: D.LazyStruct = () => ({
  plainTextMessage: { value: 0 },
  customPayload: { value: 0 },
  ssmlMessage: { value: 0 },
  imageResponseCard: {
    title: 0,
    subtitle: 0,
    imageUrl: 0,
    buttons: D.list({ text: 0, value: 0 }),
  },
});
const i_SlotValueOverride: D.LazyStruct = () => ({
  shape: 0,
  value: { interpretedValue: 0 },
  values: D.list(i_SlotValueOverride),
});
