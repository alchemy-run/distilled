import type * as HttpClient from "effect/unstable/http/HttpClient";
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
  sdkId: "Lex Model Building Service",
  target: "AWSDeepSenseModelBuildingService",
  version: "2017-04-19",
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
                `https://models.lex-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws") {
                return e(`https://models-fips.lex.${Region}.amazonaws.com`);
              }
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(`https://models-fips.lex.${Region}.amazonaws.com`);
              }
              return e(
                `https://models.lex-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://models.lex.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          if ("aws" === _.getAttr(PartitionResult, "name")) {
            return e(`https://models.lex.${Region}.amazonaws.com`);
          }
          if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
            return e(`https://models.lex.${Region}.amazonaws.com`);
          }
          return e(
            `https://models.lex.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class InternalFailureException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalFailureException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["ThrottlingError"],
    { status: 429, headers: { retryAfterSeconds: "Retry-After" } },
  )<{ readonly retryAfterSeconds?: string; readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class PreconditionFailedException
  extends /*@__PURE__*/ TE.TaggedError("PreconditionFailedException", [], {
    status: 412,
  })<{ readonly message?: string }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceInUseException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly referenceType?: ReferenceType;
    readonly exampleReference?: ResourceReference;
    readonly message?: string;
  }> {}
export type BotName = string;
export interface CreateBotVersionRequest {
  name: string;
  checksum?: string;
}
export type Description = string;
export type IntentName = string;
export type Version = string;
export interface Intent {
  intentName: string;
  intentVersion: string;
}
export type IntentList = Intent[];
export type ContentType =
  | "PlainText"
  | "SSML"
  | "CustomPayload"
  | (string & {});
export type ContentString = string;
export type GroupNumber = number;
export interface Message {
  contentType: ContentType;
  content: string;
  groupNumber?: number;
}
export type MessageList = Message[];
export type PromptMaxAttempts = number;
export type ResponseCard = string;
export interface Prompt {
  messages: Message[];
  maxAttempts: number;
  responseCard?: string;
}
export interface Statement {
  messages: Message[];
  responseCard?: string;
}
export type Status =
  | "BUILDING"
  | "READY"
  | "READY_BASIC_TESTING"
  | "FAILED"
  | "NOT_BUILT"
  | (string & {});
export type SessionTTL = number;
export type Locale =
  | "de-DE"
  | "en-AU"
  | "en-GB"
  | "en-IN"
  | "en-US"
  | "es-419"
  | "es-ES"
  | "es-US"
  | "fr-FR"
  | "fr-CA"
  | "it-IT"
  | "ja-JP"
  | "ko-KR"
  | (string & {});
export interface CreateBotVersionResponse {
  name?: string;
  description?: string;
  intents?: Intent[];
  clarificationPrompt?: Prompt;
  abortStatement?: Statement;
  status?: Status;
  failureReason?: string;
  lastUpdatedDate?: Date;
  createdDate?: Date;
  idleSessionTTLInSeconds?: number;
  voiceId?: string;
  checksum?: string;
  version?: string;
  locale?: Locale;
  childDirected?: boolean;
  enableModelImprovements?: boolean;
  detectSentiment?: boolean;
}
export interface CreateIntentVersionRequest {
  name: string;
  checksum?: string;
}
export type SlotName = string;
export type SlotConstraint = "Required" | "Optional" | (string & {});
export type CustomOrBuiltinSlotTypeName = string;
export type Priority = number;
export type Utterance = string;
export type SlotUtteranceList = string[];
export type ObfuscationSetting = "NONE" | "DEFAULT_OBFUSCATION" | (string & {});
export type SlotDefaultValueString = string;
export interface SlotDefaultValue {
  defaultValue: string;
}
export type SlotDefaultValueList = SlotDefaultValue[];
export interface SlotDefaultValueSpec {
  defaultValueList: SlotDefaultValue[];
}
export interface Slot {
  name: string;
  description?: string;
  slotConstraint: SlotConstraint;
  slotType?: string;
  slotTypeVersion?: string;
  valueElicitationPrompt?: Prompt;
  priority?: number;
  sampleUtterances?: string[];
  responseCard?: string;
  obfuscationSetting?: ObfuscationSetting;
  defaultValueSpec?: SlotDefaultValueSpec;
}
export type SlotList = Slot[];
export type IntentUtteranceList = string[];
export interface FollowUpPrompt {
  prompt: Prompt;
  rejectionStatement: Statement;
}
export type LambdaARN = string;
export type MessageVersion = string;
export interface CodeHook {
  uri: string;
  messageVersion: string;
}
export type FulfillmentActivityType =
  | "ReturnIntent"
  | "CodeHook"
  | (string & {});
export interface FulfillmentActivity {
  type: FulfillmentActivityType;
  codeHook?: CodeHook;
}
export type BuiltinIntentSignature = string;
export type KendraIndexArn = string;
export type QueryFilterString = string;
export type RoleArn = string;
export interface KendraConfiguration {
  kendraIndex: string;
  queryFilterString?: string;
  role: string;
}
export type InputContextName = string;
export interface InputContext {
  name: string;
}
export type InputContextList = InputContext[];
export type OutputContextName = string;
export type ContextTimeToLiveInSeconds = number;
export type ContextTurnsToLive = number;
export interface OutputContext {
  name: string;
  timeToLiveInSeconds: number;
  turnsToLive: number;
}
export type OutputContextList = OutputContext[];
export interface CreateIntentVersionResponse {
  name?: string;
  description?: string;
  slots?: Slot[];
  sampleUtterances?: string[];
  confirmationPrompt?: Prompt;
  rejectionStatement?: Statement;
  followUpPrompt?: FollowUpPrompt;
  conclusionStatement?: Statement;
  dialogCodeHook?: CodeHook;
  fulfillmentActivity?: FulfillmentActivity;
  parentIntentSignature?: string;
  lastUpdatedDate?: Date;
  createdDate?: Date;
  version?: string;
  checksum?: string;
  kendraConfiguration?: KendraConfiguration;
  inputContexts?: InputContext[];
  outputContexts?: OutputContext[];
}
export type SlotTypeName = string;
export interface CreateSlotTypeVersionRequest {
  name: string;
  checksum?: string;
}
export type Value = string;
export type SynonymList = string[];
export interface EnumerationValue {
  value: string;
  synonyms?: string[];
}
export type EnumerationValues = EnumerationValue[];
export type SlotValueSelectionStrategy =
  | "ORIGINAL_VALUE"
  | "TOP_RESOLUTION"
  | (string & {});
export type RegexPattern = string;
export interface SlotTypeRegexConfiguration {
  pattern: string;
}
export interface SlotTypeConfiguration {
  regexConfiguration?: SlotTypeRegexConfiguration;
}
export type SlotTypeConfigurations = SlotTypeConfiguration[];
export interface CreateSlotTypeVersionResponse {
  name?: string;
  description?: string;
  enumerationValues?: EnumerationValue[];
  lastUpdatedDate?: Date;
  createdDate?: Date;
  version?: string;
  checksum?: string;
  valueSelectionStrategy?: SlotValueSelectionStrategy;
  parentSlotTypeSignature?: string;
  slotTypeConfigurations?: SlotTypeConfiguration[];
}
export interface DeleteBotRequest {
  name: string;
}
export interface DeleteBotResponse {}
export type AliasName = string;
export interface DeleteBotAliasRequest {
  name: string;
  botName: string;
}
export interface DeleteBotAliasResponse {}
export type BotChannelName = string;
export interface DeleteBotChannelAssociationRequest {
  name: string;
  botName: string;
  botAlias: string;
}
export interface DeleteBotChannelAssociationResponse {}
export type NumericalVersion = string;
export interface DeleteBotVersionRequest {
  name: string;
  version: string;
}
export interface DeleteBotVersionResponse {}
export interface DeleteIntentRequest {
  name: string;
}
export interface DeleteIntentResponse {}
export interface DeleteIntentVersionRequest {
  name: string;
  version: string;
}
export interface DeleteIntentVersionResponse {}
export interface DeleteSlotTypeRequest {
  name: string;
}
export interface DeleteSlotTypeResponse {}
export interface DeleteSlotTypeVersionRequest {
  name: string;
  version: string;
}
export interface DeleteSlotTypeVersionResponse {}
export type UserId = string;
export interface DeleteUtterancesRequest {
  botName: string;
  userId: string;
}
export interface DeleteUtterancesResponse {}
export interface GetBotRequest {
  name: string;
  versionOrAlias: string;
}
export type ConfidenceThreshold = number;
export interface GetBotResponse {
  name?: string;
  description?: string;
  intents?: Intent[];
  enableModelImprovements?: boolean;
  nluIntentConfidenceThreshold?: number;
  clarificationPrompt?: Prompt;
  abortStatement?: Statement;
  status?: Status;
  failureReason?: string;
  lastUpdatedDate?: Date;
  createdDate?: Date;
  idleSessionTTLInSeconds?: number;
  voiceId?: string;
  checksum?: string;
  version?: string;
  locale?: Locale;
  childDirected?: boolean;
  detectSentiment?: boolean;
}
export interface GetBotAliasRequest {
  name: string;
  botName: string;
}
export type LogType = "AUDIO" | "TEXT" | (string & {});
export type Destination = "CLOUDWATCH_LOGS" | "S3" | (string & {});
export type KmsKeyArn = string;
export type ResourceArn = string;
export type ResourcePrefix = string;
export interface LogSettingsResponse {
  logType?: LogType;
  destination?: Destination;
  kmsKeyArn?: string;
  resourceArn?: string;
  resourcePrefix?: string;
}
export type LogSettingsResponseList = LogSettingsResponse[];
export type IamRoleArn = string;
export interface ConversationLogsResponse {
  logSettings?: LogSettingsResponse[];
  iamRoleArn?: string;
}
export interface GetBotAliasResponse {
  name?: string;
  description?: string;
  botVersion?: string;
  botName?: string;
  lastUpdatedDate?: Date;
  createdDate?: Date;
  checksum?: string;
  conversationLogs?: ConversationLogsResponse;
}
export type NextToken = string;
export type MaxResults = number;
export interface GetBotAliasesRequest {
  botName: string;
  nextToken?: string;
  maxResults?: number;
  nameContains?: string;
}
export interface BotAliasMetadata {
  name?: string;
  description?: string;
  botVersion?: string;
  botName?: string;
  lastUpdatedDate?: Date;
  createdDate?: Date;
  checksum?: string;
  conversationLogs?: ConversationLogsResponse;
}
export type BotAliasMetadataList = BotAliasMetadata[];
export interface GetBotAliasesResponse {
  BotAliases?: BotAliasMetadata[];
  nextToken?: string;
}
export interface GetBotChannelAssociationRequest {
  name: string;
  botName: string;
  botAlias: string;
}
export type ChannelType =
  | "Facebook"
  | "Slack"
  | "Twilio-Sms"
  | "Kik"
  | (string & {});
export type ChannelConfigurationMap = { [key: string]: string | undefined };
export type ChannelStatus =
  | "IN_PROGRESS"
  | "CREATED"
  | "FAILED"
  | (string & {});
export interface GetBotChannelAssociationResponse {
  name?: string;
  description?: string;
  botAlias?: string;
  botName?: string;
  createdDate?: Date;
  type?: ChannelType;
  botConfiguration?: { [key: string]: string | undefined };
  status?: ChannelStatus;
  failureReason?: string;
}
export type AliasNameOrListAll = string;
export interface GetBotChannelAssociationsRequest {
  botName: string;
  botAlias: string;
  nextToken?: string;
  maxResults?: number;
  nameContains?: string;
}
export interface BotChannelAssociation {
  name?: string;
  description?: string;
  botAlias?: string;
  botName?: string;
  createdDate?: Date;
  type?: ChannelType;
  botConfiguration?: { [key: string]: string | undefined };
  status?: ChannelStatus;
  failureReason?: string;
}
export type BotChannelAssociationList = BotChannelAssociation[];
export interface GetBotChannelAssociationsResponse {
  botChannelAssociations?: BotChannelAssociation[];
  nextToken?: string;
}
export interface GetBotsRequest {
  nextToken?: string;
  maxResults?: number;
  nameContains?: string;
}
export interface BotMetadata {
  name?: string;
  description?: string;
  status?: Status;
  lastUpdatedDate?: Date;
  createdDate?: Date;
  version?: string;
}
export type BotMetadataList = BotMetadata[];
export interface GetBotsResponse {
  bots?: BotMetadata[];
  nextToken?: string;
}
export interface GetBotVersionsRequest {
  name: string;
  nextToken?: string;
  maxResults?: number;
}
export interface GetBotVersionsResponse {
  bots?: BotMetadata[];
  nextToken?: string;
}
export interface GetBuiltinIntentRequest {
  signature: string;
}
export type LocaleList = Locale[];
export interface BuiltinIntentSlot {
  name?: string;
}
export type BuiltinIntentSlotList = BuiltinIntentSlot[];
export interface GetBuiltinIntentResponse {
  signature?: string;
  supportedLocales?: Locale[];
  slots?: BuiltinIntentSlot[];
}
export interface GetBuiltinIntentsRequest {
  locale?: Locale;
  signatureContains?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface BuiltinIntentMetadata {
  signature?: string;
  supportedLocales?: Locale[];
}
export type BuiltinIntentMetadataList = BuiltinIntentMetadata[];
export interface GetBuiltinIntentsResponse {
  intents?: BuiltinIntentMetadata[];
  nextToken?: string;
}
export interface GetBuiltinSlotTypesRequest {
  locale?: Locale;
  signatureContains?: string;
  nextToken?: string;
  maxResults?: number;
}
export type BuiltinSlotTypeSignature = string;
export interface BuiltinSlotTypeMetadata {
  signature?: string;
  supportedLocales?: Locale[];
}
export type BuiltinSlotTypeMetadataList = BuiltinSlotTypeMetadata[];
export interface GetBuiltinSlotTypesResponse {
  slotTypes?: BuiltinSlotTypeMetadata[];
  nextToken?: string;
}
export type Name = string;
export type ResourceType = "BOT" | "INTENT" | "SLOT_TYPE" | (string & {});
export type ExportType = "ALEXA_SKILLS_KIT" | "LEX" | (string & {});
export interface GetExportRequest {
  name: string;
  version: string;
  resourceType: ResourceType;
  exportType: ExportType;
}
export type ExportStatus = "IN_PROGRESS" | "READY" | "FAILED" | (string & {});
export interface GetExportResponse {
  name?: string;
  version?: string;
  resourceType?: ResourceType;
  exportType?: ExportType;
  exportStatus?: ExportStatus;
  failureReason?: string;
  url?: string;
}
export interface GetImportRequest {
  importId: string;
}
export type MergeStrategy =
  | "OVERWRITE_LATEST"
  | "FAIL_ON_CONFLICT"
  | (string & {});
export type ImportStatus =
  | "IN_PROGRESS"
  | "COMPLETE"
  | "FAILED"
  | (string & {});
export type StringList = string[];
export interface GetImportResponse {
  name?: string;
  resourceType?: ResourceType;
  mergeStrategy?: MergeStrategy;
  importId?: string;
  importStatus?: ImportStatus;
  failureReason?: string[];
  createdDate?: Date;
}
export interface GetIntentRequest {
  name: string;
  version: string;
}
export interface GetIntentResponse {
  name?: string;
  description?: string;
  slots?: Slot[];
  sampleUtterances?: string[];
  confirmationPrompt?: Prompt;
  rejectionStatement?: Statement;
  followUpPrompt?: FollowUpPrompt;
  conclusionStatement?: Statement;
  dialogCodeHook?: CodeHook;
  fulfillmentActivity?: FulfillmentActivity;
  parentIntentSignature?: string;
  lastUpdatedDate?: Date;
  createdDate?: Date;
  version?: string;
  checksum?: string;
  kendraConfiguration?: KendraConfiguration;
  inputContexts?: InputContext[];
  outputContexts?: OutputContext[];
}
export interface GetIntentsRequest {
  nextToken?: string;
  maxResults?: number;
  nameContains?: string;
}
export interface IntentMetadata {
  name?: string;
  description?: string;
  lastUpdatedDate?: Date;
  createdDate?: Date;
  version?: string;
}
export type IntentMetadataList = IntentMetadata[];
export interface GetIntentsResponse {
  intents?: IntentMetadata[];
  nextToken?: string;
}
export interface GetIntentVersionsRequest {
  name: string;
  nextToken?: string;
  maxResults?: number;
}
export interface GetIntentVersionsResponse {
  intents?: IntentMetadata[];
  nextToken?: string;
}
export type MigrationId = string;
export interface GetMigrationRequest {
  migrationId: string;
}
export type V2BotId = string;
export type MigrationStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export type MigrationStrategy =
  | "CREATE_NEW"
  | "UPDATE_EXISTING"
  | (string & {});
export type MigrationAlertType = "ERROR" | "WARN" | (string & {});
export type MigrationAlertMessage = string;
export type MigrationAlertDetail = string;
export type MigrationAlertDetails = string[];
export type MigrationAlertReferenceURL = string;
export type MigrationAlertReferenceURLs = string[];
export interface MigrationAlert {
  type?: MigrationAlertType;
  message?: string;
  details?: string[];
  referenceURLs?: string[];
}
export type MigrationAlerts = MigrationAlert[];
export interface GetMigrationResponse {
  migrationId?: string;
  v1BotName?: string;
  v1BotVersion?: string;
  v1BotLocale?: Locale;
  v2BotId?: string;
  v2BotRole?: string;
  migrationStatus?: MigrationStatus;
  migrationStrategy?: MigrationStrategy;
  migrationTimestamp?: Date;
  alerts?: MigrationAlert[];
}
export type MigrationSortAttribute =
  | "V1_BOT_NAME"
  | "MIGRATION_DATE_TIME"
  | (string & {});
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export interface GetMigrationsRequest {
  sortByAttribute?: MigrationSortAttribute;
  sortByOrder?: SortOrder;
  v1BotNameContains?: string;
  migrationStatusEquals?: MigrationStatus;
  maxResults?: number;
  nextToken?: string;
}
export interface MigrationSummary {
  migrationId?: string;
  v1BotName?: string;
  v1BotVersion?: string;
  v1BotLocale?: Locale;
  v2BotId?: string;
  v2BotRole?: string;
  migrationStatus?: MigrationStatus;
  migrationStrategy?: MigrationStrategy;
  migrationTimestamp?: Date;
}
export type MigrationSummaryList = MigrationSummary[];
export interface GetMigrationsResponse {
  migrationSummaries?: MigrationSummary[];
  nextToken?: string;
}
export interface GetSlotTypeRequest {
  name: string;
  version: string;
}
export interface GetSlotTypeResponse {
  name?: string;
  description?: string;
  enumerationValues?: EnumerationValue[];
  lastUpdatedDate?: Date;
  createdDate?: Date;
  version?: string;
  checksum?: string;
  valueSelectionStrategy?: SlotValueSelectionStrategy;
  parentSlotTypeSignature?: string;
  slotTypeConfigurations?: SlotTypeConfiguration[];
}
export interface GetSlotTypesRequest {
  nextToken?: string;
  maxResults?: number;
  nameContains?: string;
}
export interface SlotTypeMetadata {
  name?: string;
  description?: string;
  lastUpdatedDate?: Date;
  createdDate?: Date;
  version?: string;
}
export type SlotTypeMetadataList = SlotTypeMetadata[];
export interface GetSlotTypesResponse {
  slotTypes?: SlotTypeMetadata[];
  nextToken?: string;
}
export interface GetSlotTypeVersionsRequest {
  name: string;
  nextToken?: string;
  maxResults?: number;
}
export interface GetSlotTypeVersionsResponse {
  slotTypes?: SlotTypeMetadata[];
  nextToken?: string;
}
export type BotVersions = string[];
export type StatusType = "Detected" | "Missed" | (string & {});
export interface GetUtterancesViewRequest {
  botName: string;
  botVersions: string[];
  statusType: StatusType;
}
export type UtteranceString = string;
export type Count = number;
export interface UtteranceData {
  utteranceString?: string;
  count?: number;
  distinctUsers?: number;
  firstUtteredDate?: Date;
  lastUtteredDate?: Date;
}
export type ListOfUtterance = UtteranceData[];
export interface UtteranceList {
  botVersion?: string;
  utterances?: UtteranceData[];
}
export type ListsOfUtterances = UtteranceList[];
export interface GetUtterancesViewResponse {
  botName?: string;
  utterances?: UtteranceList[];
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export type TagList = Tag[];
export interface ListTagsForResourceResponse {
  tags?: Tag[];
}
export type ProcessBehavior = "SAVE" | "BUILD" | (string & {});
export interface PutBotRequest {
  name: string;
  description?: string;
  intents?: Intent[];
  enableModelImprovements?: boolean;
  nluIntentConfidenceThreshold?: number;
  clarificationPrompt?: Prompt;
  abortStatement?: Statement;
  idleSessionTTLInSeconds?: number;
  voiceId?: string;
  checksum?: string;
  processBehavior?: ProcessBehavior;
  locale: Locale;
  childDirected: boolean;
  detectSentiment?: boolean;
  createVersion?: boolean;
  tags?: Tag[];
}
export interface PutBotResponse {
  name?: string;
  description?: string;
  intents?: Intent[];
  enableModelImprovements?: boolean;
  nluIntentConfidenceThreshold?: number;
  clarificationPrompt?: Prompt;
  abortStatement?: Statement;
  status?: Status;
  failureReason?: string;
  lastUpdatedDate?: Date;
  createdDate?: Date;
  idleSessionTTLInSeconds?: number;
  voiceId?: string;
  checksum?: string;
  version?: string;
  locale?: Locale;
  childDirected?: boolean;
  createVersion?: boolean;
  detectSentiment?: boolean;
  tags?: Tag[];
}
export interface LogSettingsRequest {
  logType: LogType;
  destination: Destination;
  kmsKeyArn?: string;
  resourceArn: string;
}
export type LogSettingsRequestList = LogSettingsRequest[];
export interface ConversationLogsRequest {
  logSettings: LogSettingsRequest[];
  iamRoleArn: string;
}
export interface PutBotAliasRequest {
  name: string;
  description?: string;
  botVersion: string;
  botName: string;
  checksum?: string;
  conversationLogs?: ConversationLogsRequest;
  tags?: Tag[];
}
export interface PutBotAliasResponse {
  name?: string;
  description?: string;
  botVersion?: string;
  botName?: string;
  lastUpdatedDate?: Date;
  createdDate?: Date;
  checksum?: string;
  conversationLogs?: ConversationLogsResponse;
  tags?: Tag[];
}
export interface PutIntentRequest {
  name: string;
  description?: string;
  slots?: Slot[];
  sampleUtterances?: string[];
  confirmationPrompt?: Prompt;
  rejectionStatement?: Statement;
  followUpPrompt?: FollowUpPrompt;
  conclusionStatement?: Statement;
  dialogCodeHook?: CodeHook;
  fulfillmentActivity?: FulfillmentActivity;
  parentIntentSignature?: string;
  checksum?: string;
  createVersion?: boolean;
  kendraConfiguration?: KendraConfiguration;
  inputContexts?: InputContext[];
  outputContexts?: OutputContext[];
}
export interface PutIntentResponse {
  name?: string;
  description?: string;
  slots?: Slot[];
  sampleUtterances?: string[];
  confirmationPrompt?: Prompt;
  rejectionStatement?: Statement;
  followUpPrompt?: FollowUpPrompt;
  conclusionStatement?: Statement;
  dialogCodeHook?: CodeHook;
  fulfillmentActivity?: FulfillmentActivity;
  parentIntentSignature?: string;
  lastUpdatedDate?: Date;
  createdDate?: Date;
  version?: string;
  checksum?: string;
  createVersion?: boolean;
  kendraConfiguration?: KendraConfiguration;
  inputContexts?: InputContext[];
  outputContexts?: OutputContext[];
}
export interface PutSlotTypeRequest {
  name: string;
  description?: string;
  enumerationValues?: EnumerationValue[];
  checksum?: string;
  valueSelectionStrategy?: SlotValueSelectionStrategy;
  createVersion?: boolean;
  parentSlotTypeSignature?: string;
  slotTypeConfigurations?: SlotTypeConfiguration[];
}
export interface PutSlotTypeResponse {
  name?: string;
  description?: string;
  enumerationValues?: EnumerationValue[];
  lastUpdatedDate?: Date;
  createdDate?: Date;
  version?: string;
  checksum?: string;
  valueSelectionStrategy?: SlotValueSelectionStrategy;
  createVersion?: boolean;
  parentSlotTypeSignature?: string;
  slotTypeConfigurations?: SlotTypeConfiguration[];
}
export interface StartImportRequest {
  payload: Uint8Array;
  resourceType: ResourceType;
  mergeStrategy: MergeStrategy;
  tags?: Tag[];
}
export interface StartImportResponse {
  name?: string;
  resourceType?: ResourceType;
  mergeStrategy?: MergeStrategy;
  importId?: string;
  importStatus?: ImportStatus;
  tags?: Tag[];
  createdDate?: Date;
}
export type V2BotName = string;
export interface StartMigrationRequest {
  v1BotName: string;
  v1BotVersion: string;
  v2BotName: string;
  v2BotRole: string;
  migrationStrategy: MigrationStrategy;
}
export interface StartMigrationResponse {
  v1BotName?: string;
  v1BotVersion?: string;
  v1BotLocale?: Locale;
  v2BotId?: string;
  v2BotRole?: string;
  migrationId?: string;
  migrationStrategy?: MigrationStrategy;
  migrationTimestamp?: Date;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export type ReferenceType =
  | "Intent"
  | "Bot"
  | "BotAlias"
  | "BotChannel"
  | (string & {});
export interface ResourceReference {
  name?: string;
  version?: string;
}
export type CreateBotVersionError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | PreconditionFailedException
  | CommonErrors;
/**
 * Creates a new version of the bot based on the `$LATEST`
 * version. If the `$LATEST` version of this resource hasn't
 * changed since you created the last version, Amazon Lex doesn't create a new
 * version. It returns the last created version.
 *
 * You can update only the `$LATEST` version of the bot.
 * You can't update the numbered versions that you create with the
 * `CreateBotVersion` operation.
 *
 * When you create the first version of a bot, Amazon Lex sets the version
 * to 1. Subsequent versions increment by 1. For more information, see versioning-intro.
 *
 * This operation requires permission for the
 * `lex:CreateBotVersion` action.
 */
export const createBotVersion: API.OperationMethod<
  CreateBotVersionRequest,
  CreateBotVersionResponse,
  CreateBotVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /bots/{name}/versions",
    input: { name: 0, checksum: 0 },
    output: { lastUpdatedDate: D.ts, createdDate: D.ts },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    PreconditionFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBotVersion",
})) as any;

export type CreateIntentVersionError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | PreconditionFailedException
  | CommonErrors;
/**
 * Creates a new version of an intent based on the
 * `$LATEST` version of the intent. If the `$LATEST`
 * version of this intent hasn't changed since you last updated it, Amazon Lex
 * doesn't create a new version. It returns the last version you
 * created.
 *
 * You can update only the `$LATEST` version of the
 * intent. You can't update the numbered versions that you create with the
 * `CreateIntentVersion` operation.
 *
 * When you create a version of an intent, Amazon Lex sets the version to
 * 1. Subsequent versions increment by 1. For more information, see versioning-intro.
 *
 * This operation requires permissions to perform the
 * `lex:CreateIntentVersion` action.
 */
export const createIntentVersion: API.OperationMethod<
  CreateIntentVersionRequest,
  CreateIntentVersionResponse,
  CreateIntentVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /intents/{name}/versions",
    input: { name: 0, checksum: 0 },
    output: { lastUpdatedDate: D.ts, createdDate: D.ts },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    PreconditionFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIntentVersion",
})) as any;

export type CreateSlotTypeVersionError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | PreconditionFailedException
  | CommonErrors;
/**
 * Creates a new version of a slot type based on the
 * `$LATEST` version of the specified slot type. If the
 * `$LATEST` version of this resource has not changed since the
 * last version that you created, Amazon Lex doesn't create a new version. It
 * returns the last version that you created.
 *
 * You can update only the `$LATEST` version of a slot
 * type. You can't update the numbered versions that you create with the
 * `CreateSlotTypeVersion` operation.
 *
 * When you create a version of a slot type, Amazon Lex sets the version to
 * 1. Subsequent versions increment by 1. For more information, see versioning-intro.
 *
 * This operation requires permissions for the
 * `lex:CreateSlotTypeVersion` action.
 */
export const createSlotTypeVersion: API.OperationMethod<
  CreateSlotTypeVersionRequest,
  CreateSlotTypeVersionResponse,
  CreateSlotTypeVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /slottypes/{name}/versions",
    input: { name: 0, checksum: 0 },
    output: { lastUpdatedDate: D.ts, createdDate: D.ts },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    PreconditionFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSlotTypeVersion",
})) as any;

export type DeleteBotError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | ResourceInUseException
  | CommonErrors;
/**
 * Deletes all versions of the bot, including the `$LATEST`
 * version. To delete a specific version of the bot, use the DeleteBotVersion operation. The `DeleteBot`
 * operation doesn't immediately remove the bot schema. Instead, it is marked
 * for deletion and removed later.
 *
 * Amazon Lex stores utterances indefinitely for improving the ability of
 * your bot to respond to user inputs. These utterances are not removed when
 * the bot is deleted. To remove the utterances, use the DeleteUtterances operation.
 *
 * If a bot has an alias, you can't delete it. Instead, the
 * `DeleteBot` operation returns a
 * `ResourceInUseException` exception that includes a reference
 * to the alias that refers to the bot. To remove the reference to the bot,
 * delete the alias. If you get the same exception again, delete the
 * referring alias until the `DeleteBot` operation is
 * successful.
 *
 * This operation requires permissions for the
 * `lex:DeleteBot` action.
 */
export const deleteBot: API.OperationMethod<
  DeleteBotRequest,
  DeleteBotResponse,
  DeleteBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "DELETE /bots/{name}", input: { name: 0 } },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBot",
})) as any;

export type DeleteBotAliasError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | ResourceInUseException
  | CommonErrors;
/**
 * Deletes an alias for the specified bot.
 *
 * You can't delete an alias that is used in the association between a
 * bot and a messaging channel. If an alias is used in a channel association,
 * the `DeleteBot` operation returns a
 * `ResourceInUseException` exception that includes a reference
 * to the channel association that refers to the bot. You can remove the
 * reference to the alias by deleting the channel association. If you get the
 * same exception again, delete the referring association until the
 * `DeleteBotAlias` operation is successful.
 */
export const deleteBotAlias: API.OperationMethod<
  DeleteBotAliasRequest,
  DeleteBotAliasResponse,
  DeleteBotAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /bots/{botName}/aliases/{name}",
    input: { name: 0, botName: 0 },
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBotAlias",
})) as any;

export type DeleteBotChannelAssociationError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes the association between an Amazon Lex bot and a messaging
 * platform.
 *
 * This operation requires permission for the
 * `lex:DeleteBotChannelAssociation` action.
 */
export const deleteBotChannelAssociation: API.OperationMethod<
  DeleteBotChannelAssociationRequest,
  DeleteBotChannelAssociationResponse,
  DeleteBotChannelAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /bots/{botName}/aliases/{botAlias}/channels/{name}",
    input: { name: 0, botName: 0, botAlias: 0 },
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBotChannelAssociation",
})) as any;

export type DeleteBotVersionError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | ResourceInUseException
  | CommonErrors;
/**
 * Deletes a specific version of a bot. To delete all versions of a
 * bot, use the DeleteBot operation.
 *
 * This operation requires permissions for the
 * `lex:DeleteBotVersion` action.
 */
export const deleteBotVersion: API.OperationMethod<
  DeleteBotVersionRequest,
  DeleteBotVersionResponse,
  DeleteBotVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /bots/{name}/versions/{version}",
    input: { name: 0, version: 0 },
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBotVersion",
})) as any;

export type DeleteIntentError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | ResourceInUseException
  | CommonErrors;
/**
 * Deletes all versions of the intent, including the
 * `$LATEST` version. To delete a specific version of the
 * intent, use the DeleteIntentVersion operation.
 *
 * You can delete a version of an intent only if it is not
 * referenced. To delete an intent that is referred to in one or more bots
 * (see how-it-works), you must remove those references
 * first.
 *
 * If you get the `ResourceInUseException` exception, it
 * provides an example reference that shows where the intent is referenced.
 * To remove the reference to the intent, either update the bot or delete
 * it. If you get the same exception when you attempt to delete the intent
 * again, repeat until the intent has no references and the call to
 * `DeleteIntent` is successful.
 *
 * This operation requires permission for the
 * `lex:DeleteIntent` action.
 */
export const deleteIntent: API.OperationMethod<
  DeleteIntentRequest,
  DeleteIntentResponse,
  DeleteIntentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /intents/{name}",
    input: { name: 0 },
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntent",
})) as any;

export type DeleteIntentVersionError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | ResourceInUseException
  | CommonErrors;
/**
 * Deletes a specific version of an intent. To delete all versions of
 * a intent, use the DeleteIntent operation.
 *
 * This operation requires permissions for the
 * `lex:DeleteIntentVersion` action.
 */
export const deleteIntentVersion: API.OperationMethod<
  DeleteIntentVersionRequest,
  DeleteIntentVersionResponse,
  DeleteIntentVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /intents/{name}/versions/{version}",
    input: { name: 0, version: 0 },
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntentVersion",
})) as any;

export type DeleteSlotTypeError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | ResourceInUseException
  | CommonErrors;
/**
 * Deletes all versions of the slot type, including the
 * `$LATEST` version. To delete a specific version of the slot
 * type, use the DeleteSlotTypeVersion operation.
 *
 * You can delete a version of a slot type only if it is not
 * referenced. To delete a slot type that is referred to in one or more
 * intents, you must remove those references first.
 *
 * If you get the `ResourceInUseException` exception,
 * the exception provides an example reference that shows the intent where
 * the slot type is referenced. To remove the reference to the slot type,
 * either update the intent or delete it. If you get the same exception
 * when you attempt to delete the slot type again, repeat until the slot
 * type has no references and the `DeleteSlotType` call is
 * successful.
 *
 * This operation requires permission for the
 * `lex:DeleteSlotType` action.
 */
export const deleteSlotType: API.OperationMethod<
  DeleteSlotTypeRequest,
  DeleteSlotTypeResponse,
  DeleteSlotTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /slottypes/{name}",
    input: { name: 0 },
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSlotType",
})) as any;

export type DeleteSlotTypeVersionError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | ResourceInUseException
  | CommonErrors;
/**
 * Deletes a specific version of a slot type. To delete all versions
 * of a slot type, use the DeleteSlotType operation.
 *
 * This operation requires permissions for the
 * `lex:DeleteSlotTypeVersion` action.
 */
export const deleteSlotTypeVersion: API.OperationMethod<
  DeleteSlotTypeVersionRequest,
  DeleteSlotTypeVersionResponse,
  DeleteSlotTypeVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /slottypes/{name}/version/{version}",
    input: { name: 0, version: 0 },
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSlotTypeVersion",
})) as any;

export type DeleteUtterancesError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes stored utterances.
 *
 * Amazon Lex stores the utterances that users send to your bot. Utterances
 * are stored for 15 days for use with the GetUtterancesView operation, and then stored indefinitely for use in improving the
 * ability of your bot to respond to user input.
 *
 * Use the `DeleteUtterances` operation to manually delete
 * stored utterances for a specific user. When you use the
 * `DeleteUtterances` operation, utterances stored for improving
 * your bot's ability to respond to user input are deleted immediately.
 * Utterances stored for use with the `GetUtterancesView`
 * operation are deleted after 15 days.
 *
 * This operation requires permissions for the
 * `lex:DeleteUtterances` action.
 */
export const deleteUtterances: API.OperationMethod<
  DeleteUtterancesRequest,
  DeleteUtterancesResponse,
  DeleteUtterancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /bots/{botName}/utterances/{userId}",
    input: { botName: 0, userId: 0 },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUtterances",
})) as any;

export type GetBotError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Returns metadata information for a specific bot. You must provide
 * the bot name and the bot version or alias.
 *
 * This operation requires permissions for the
 * `lex:GetBot` action.
 */
export const getBot: API.OperationMethod<
  GetBotRequest,
  GetBotResponse,
  GetBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /bots/{name}/versions/{versionOrAlias}",
    input: { name: 0, versionOrAlias: 0 },
    output: { lastUpdatedDate: D.ts, createdDate: D.ts },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBot",
})) as any;

export type GetBotAliasError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Returns information about an Amazon Lex bot alias. For more information
 * about aliases, see versioning-aliases.
 *
 * This operation requires permissions for the
 * `lex:GetBotAlias` action.
 */
export const getBotAlias: API.OperationMethod<
  GetBotAliasRequest,
  GetBotAliasResponse,
  GetBotAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /bots/{botName}/aliases/{name}",
    input: { name: 0, botName: 0 },
    output: { lastUpdatedDate: D.ts, createdDate: D.ts },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBotAlias",
})) as any;

export type GetBotAliasesError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Returns a list of aliases for a specified Amazon Lex bot.
 *
 * This operation requires permissions for the
 * `lex:GetBotAliases` action.
 */
export const getBotAliases: API.PaginatedOperationMethod<
  GetBotAliasesRequest,
  GetBotAliasesResponse,
  GetBotAliasesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /bots/{botName}/aliases",
    input: {
      botName: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      nameContains: D.m({ query: "nameContains" }),
    },
    output: {
      BotAliases: D.list({ lastUpdatedDate: D.ts, createdDate: D.ts }),
    },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBotAliases",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetBotChannelAssociationError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Returns information about the association between an Amazon Lex bot and
 * a messaging platform.
 *
 * This operation requires permissions for the
 * `lex:GetBotChannelAssociation` action.
 */
export const getBotChannelAssociation: API.OperationMethod<
  GetBotChannelAssociationRequest,
  GetBotChannelAssociationResponse,
  GetBotChannelAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /bots/{botName}/aliases/{botAlias}/channels/{name}",
    input: { name: 0, botName: 0, botAlias: 0 },
    output: { createdDate: D.ts },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBotChannelAssociation",
})) as any;

export type GetBotChannelAssociationsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Returns a list of all of the channels associated with the
 * specified bot.
 *
 * The `GetBotChannelAssociations` operation requires
 * permissions for the `lex:GetBotChannelAssociations`
 * action.
 */
export const getBotChannelAssociations: API.PaginatedOperationMethod<
  GetBotChannelAssociationsRequest,
  GetBotChannelAssociationsResponse,
  GetBotChannelAssociationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /bots/{botName}/aliases/{botAlias}/channels",
    input: {
      botName: 0,
      botAlias: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      nameContains: D.m({ query: "nameContains" }),
    },
    output: { botChannelAssociations: D.list({ createdDate: D.ts }) },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBotChannelAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetBotsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Returns bot information as follows:
 *
 * - If you provide the `nameContains` field, the
 * response includes information for the `$LATEST` version of
 * all bots whose name contains the specified string.
 *
 * - If you don't specify the `nameContains` field, the
 * operation returns information about the `$LATEST` version
 * of all of your bots.
 *
 * This operation requires permission for the `lex:GetBots`
 * action.
 */
export const getBots: API.PaginatedOperationMethod<
  GetBotsRequest,
  GetBotsResponse,
  GetBotsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /bots",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      nameContains: D.m({ query: "nameContains" }),
    },
    output: { bots: D.list(o_BotMetadata) },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBots",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetBotVersionsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Gets information about all of the versions of a bot.
 *
 * The `GetBotVersions` operation returns a
 * `BotMetadata` object for each version of a bot. For example,
 * if a bot has three numbered versions, the `GetBotVersions`
 * operation returns four `BotMetadata` objects in the response,
 * one for each numbered version and one for the `$LATEST`
 * version.
 *
 * The `GetBotVersions` operation always returns at least
 * one version, the `$LATEST` version.
 *
 * This operation requires permissions for the
 * `lex:GetBotVersions` action.
 */
export const getBotVersions: API.PaginatedOperationMethod<
  GetBotVersionsRequest,
  GetBotVersionsResponse,
  GetBotVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /bots/{name}/versions",
    input: {
      name: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { bots: D.list(o_BotMetadata) },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBotVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetBuiltinIntentError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Returns information about a built-in intent.
 *
 * This operation requires permission for the
 * `lex:GetBuiltinIntent` action.
 */
export const getBuiltinIntent: API.OperationMethod<
  GetBuiltinIntentRequest,
  GetBuiltinIntentResponse,
  GetBuiltinIntentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /builtins/intents/{signature}",
    input: { signature: 0 },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBuiltinIntent",
})) as any;

export type GetBuiltinIntentsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Gets a list of built-in intents that meet the specified
 * criteria.
 *
 * This operation requires permission for the
 * `lex:GetBuiltinIntents` action.
 */
export const getBuiltinIntents: API.PaginatedOperationMethod<
  GetBuiltinIntentsRequest,
  GetBuiltinIntentsResponse,
  GetBuiltinIntentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /builtins/intents",
    input: {
      locale: D.m({ query: "locale" }),
      signatureContains: D.m({ query: "signatureContains" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBuiltinIntents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetBuiltinSlotTypesError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Gets a list of built-in slot types that meet the specified
 * criteria.
 *
 * For a list of built-in slot types, see Slot Type Reference in the Alexa Skills
 * Kit.
 *
 * This operation requires permission for the
 * `lex:GetBuiltInSlotTypes` action.
 */
export const getBuiltinSlotTypes: API.PaginatedOperationMethod<
  GetBuiltinSlotTypesRequest,
  GetBuiltinSlotTypesResponse,
  GetBuiltinSlotTypesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /builtins/slottypes",
    input: {
      locale: D.m({ query: "locale" }),
      signatureContains: D.m({ query: "signatureContains" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBuiltinSlotTypes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetExportError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Exports the contents of a Amazon Lex resource in a specified format.
 */
export const getExport: API.OperationMethod<
  GetExportRequest,
  GetExportResponse,
  GetExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /exports",
    input: {
      name: D.m({ query: "name" }),
      version: D.m({ query: "version" }),
      resourceType: D.m({ query: "resourceType" }),
      exportType: D.m({ query: "exportType" }),
    },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExport",
})) as any;

export type GetImportError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Gets information about an import job started with the
 * `StartImport` operation.
 */
export const getImport: API.OperationMethod<
  GetImportRequest,
  GetImportResponse,
  GetImportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /imports/{importId}",
    input: { importId: 0 },
    output: { createdDate: D.ts },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImport",
})) as any;

export type GetIntentError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Returns information about an intent. In addition to the intent
 * name, you must specify the intent version.
 *
 * This operation requires permissions to perform the
 * `lex:GetIntent` action.
 */
export const getIntent: API.OperationMethod<
  GetIntentRequest,
  GetIntentResponse,
  GetIntentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /intents/{name}/versions/{version}",
    input: { name: 0, version: 0 },
    output: { lastUpdatedDate: D.ts, createdDate: D.ts },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntent",
})) as any;

export type GetIntentsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Returns intent information as follows:
 *
 * - If you specify the `nameContains` field, returns the
 * `$LATEST` version of all intents that contain the
 * specified string.
 *
 * - If you don't specify the `nameContains` field,
 * returns information about the `$LATEST` version of all
 * intents.
 *
 * The operation requires permission for the
 * `lex:GetIntents` action.
 */
export const getIntents: API.PaginatedOperationMethod<
  GetIntentsRequest,
  GetIntentsResponse,
  GetIntentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /intents",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      nameContains: D.m({ query: "nameContains" }),
    },
    output: { intents: D.list(o_IntentMetadata) },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetIntentVersionsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Gets information about all of the versions of an intent.
 *
 * The `GetIntentVersions` operation returns an
 * `IntentMetadata` object for each version of an intent. For
 * example, if an intent has three numbered versions, the
 * `GetIntentVersions` operation returns four
 * `IntentMetadata` objects in the response, one for each
 * numbered version and one for the `$LATEST` version.
 *
 * The `GetIntentVersions` operation always returns at
 * least one version, the `$LATEST` version.
 *
 * This operation requires permissions for the
 * `lex:GetIntentVersions` action.
 */
export const getIntentVersions: API.PaginatedOperationMethod<
  GetIntentVersionsRequest,
  GetIntentVersionsResponse,
  GetIntentVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /intents/{name}/versions",
    input: {
      name: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { intents: D.list(o_IntentMetadata) },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntentVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetMigrationError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Provides details about an ongoing or complete migration from an
 * Amazon Lex V1 bot to an Amazon Lex V2 bot. Use this operation to view the migration
 * alerts and warnings related to the migration.
 */
export const getMigration: API.OperationMethod<
  GetMigrationRequest,
  GetMigrationResponse,
  GetMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /migrations/{migrationId}",
    input: { migrationId: 0 },
    output: { migrationTimestamp: D.ts },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMigration",
})) as any;

export type GetMigrationsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Gets a list of migrations between Amazon Lex V1 and Amazon Lex V2.
 */
export const getMigrations: API.PaginatedOperationMethod<
  GetMigrationsRequest,
  GetMigrationsResponse,
  GetMigrationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /migrations",
    input: {
      sortByAttribute: D.m({ query: "sortByAttribute" }),
      sortByOrder: D.m({ query: "sortByOrder" }),
      v1BotNameContains: D.m({ query: "v1BotNameContains" }),
      migrationStatusEquals: D.m({ query: "migrationStatusEquals" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { migrationSummaries: D.list({ migrationTimestamp: D.ts }) },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMigrations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetSlotTypeError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Returns information about a specific version of a slot type. In
 * addition to specifying the slot type name, you must specify the slot type
 * version.
 *
 * This operation requires permissions for the
 * `lex:GetSlotType` action.
 */
export const getSlotType: API.OperationMethod<
  GetSlotTypeRequest,
  GetSlotTypeResponse,
  GetSlotTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /slottypes/{name}/versions/{version}",
    input: { name: 0, version: 0 },
    output: { lastUpdatedDate: D.ts, createdDate: D.ts },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSlotType",
})) as any;

export type GetSlotTypesError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Returns slot type information as follows:
 *
 * - If you specify the `nameContains` field, returns the
 * `$LATEST` version of all slot types that contain the
 * specified string.
 *
 * - If you don't specify the `nameContains` field,
 * returns information about the `$LATEST` version of all slot
 * types.
 *
 * The operation requires permission for the
 * `lex:GetSlotTypes` action.
 */
export const getSlotTypes: API.PaginatedOperationMethod<
  GetSlotTypesRequest,
  GetSlotTypesResponse,
  GetSlotTypesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /slottypes",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      nameContains: D.m({ query: "nameContains" }),
    },
    output: { slotTypes: D.list(o_SlotTypeMetadata) },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSlotTypes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetSlotTypeVersionsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Gets information about all versions of a slot type.
 *
 * The `GetSlotTypeVersions` operation returns a
 * `SlotTypeMetadata` object for each version of a slot type.
 * For example, if a slot type has three numbered versions, the
 * `GetSlotTypeVersions` operation returns four
 * `SlotTypeMetadata` objects in the response, one for each
 * numbered version and one for the `$LATEST` version.
 *
 * The `GetSlotTypeVersions` operation always returns at
 * least one version, the `$LATEST` version.
 *
 * This operation requires permissions for the
 * `lex:GetSlotTypeVersions` action.
 */
export const getSlotTypeVersions: API.PaginatedOperationMethod<
  GetSlotTypeVersionsRequest,
  GetSlotTypeVersionsResponse,
  GetSlotTypeVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /slottypes/{name}/versions",
    input: {
      name: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { slotTypes: D.list(o_SlotTypeMetadata) },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSlotTypeVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetUtterancesViewError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Use the `GetUtterancesView` operation to get information
 * about the utterances that your users have made to your bot. You can use
 * this list to tune the utterances that your bot responds to.
 *
 * For example, say that you have created a bot to order flowers.
 * After your users have used your bot for a while, use the
 * `GetUtterancesView` operation to see the requests that they
 * have made and whether they have been successful. You might find that the
 * utterance "I want flowers" is not being recognized. You could add this
 * utterance to the `OrderFlowers` intent so that your bot
 * recognizes that utterance.
 *
 * After you publish a new version of a bot, you can get information
 * about the old version and the new so that you can compare the performance
 * across the two versions.
 *
 * Utterance statistics are generated once a day. Data is available
 * for the last 15 days. You can request information for up to 5 versions of
 * your bot in each request. Amazon Lex returns the most frequent utterances
 * received by the bot in the last 15 days. The response contains information
 * about a maximum of 100 utterances for each version.
 *
 * If you set `childDirected` field to true when you
 * created your bot, if you are using slot obfuscation with one or more
 * slots, or if you opted out of participating in improving Amazon Lex, utterances
 * are not available.
 *
 * This operation requires permissions for the
 * `lex:GetUtterancesView` action.
 */
export const getUtterancesView: API.OperationMethod<
  GetUtterancesViewRequest,
  GetUtterancesViewResponse,
  GetUtterancesViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /bots/{botName}/utterances?view=aggregation",
    input: {
      botName: 0,
      botVersions: D.m({ query: "bot_versions" }),
      statusType: D.m({ query: "status_type" }),
    },
    output: {
      utterances: D.list({
        utterances: D.list({ firstUtteredDate: D.ts, lastUtteredDate: D.ts }),
      }),
    },
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUtterancesView",
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Gets a list of tags associated with the specified resource. Only bots,
 * bot aliases, and bot channels can have tags associated with them.
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
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type PutBotError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | PreconditionFailedException
  | CommonErrors;
/**
 * Creates an Amazon Lex conversational bot or replaces an existing bot.
 * When you create or update a bot you are only required to specify a name, a
 * locale, and whether the bot is directed toward children under age 13. You
 * can use this to add intents later, or to remove intents from an existing
 * bot. When you create a bot with the minimum information, the bot is
 * created or updated but Amazon Lex returns the `` response
 * `FAILED`. You can build the bot after you add one or more
 * intents. For more information about Amazon Lex bots, see how-it-works.
 *
 * If you specify the name of an existing bot, the fields in the
 * request replace the existing values in the `$LATEST` version of
 * the bot. Amazon Lex removes any fields that you don't provide values for in the
 * request, except for the `idleTTLInSeconds` and
 * `privacySettings` fields, which are set to their default
 * values. If you don't specify values for required fields, Amazon Lex throws an
 * exception.
 *
 * This operation requires permissions for the `lex:PutBot`
 * action. For more information, see security-iam.
 */
export const putBot: API.OperationMethod<
  PutBotRequest,
  PutBotResponse,
  PutBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /bots/{name}/versions/$LATEST",
    input: {
      name: 0,
      description: 0,
      intents: D.list({ intentName: 0, intentVersion: 0 }),
      enableModelImprovements: 0,
      nluIntentConfidenceThreshold: 0,
      clarificationPrompt: i_Prompt,
      abortStatement: i_Statement,
      idleSessionTTLInSeconds: 0,
      voiceId: 0,
      checksum: 0,
      processBehavior: 0,
      locale: 0,
      childDirected: 0,
      detectSentiment: 0,
      createVersion: 0,
      tags: D.list(i_Tag),
    },
    output: { lastUpdatedDate: D.ts, createdDate: D.ts },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    PreconditionFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBot",
})) as any;

export type PutBotAliasError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | PreconditionFailedException
  | CommonErrors;
/**
 * Creates an alias for the specified version of the bot or replaces
 * an alias for the specified bot. To change the version of the bot that the
 * alias points to, replace the alias. For more information about aliases,
 * see versioning-aliases.
 *
 * This operation requires permissions for the
 * `lex:PutBotAlias` action.
 */
export const putBotAlias: API.OperationMethod<
  PutBotAliasRequest,
  PutBotAliasResponse,
  PutBotAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /bots/{botName}/aliases/{name}",
    input: {
      name: 0,
      description: 0,
      botVersion: 0,
      botName: 0,
      checksum: 0,
      conversationLogs: {
        logSettings: D.list({
          logType: 0,
          destination: 0,
          kmsKeyArn: 0,
          resourceArn: 0,
        }),
        iamRoleArn: 0,
      },
      tags: D.list(i_Tag),
    },
    output: { lastUpdatedDate: D.ts, createdDate: D.ts },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    PreconditionFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBotAlias",
})) as any;

export type PutIntentError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | PreconditionFailedException
  | CommonErrors;
/**
 * Creates an intent or replaces an existing intent.
 *
 * To define the interaction between the user and your bot, you use
 * one or more intents. For a pizza ordering bot, for example, you would
 * create an `OrderPizza` intent.
 *
 * To create an intent or replace an existing intent, you must provide
 * the following:
 *
 * - Intent name. For example, `OrderPizza`.
 *
 * - Sample utterances. For example, "Can I order a pizza, please."
 * and "I want to order a pizza."
 *
 * - Information to be gathered. You specify slot types for the
 * information that your bot will request from the user. You can specify
 * standard slot types, such as a date or a time, or custom slot types
 * such as the size and crust of a pizza.
 *
 * - How the intent will be fulfilled. You can provide a Lambda
 * function or configure the intent to return the intent information to
 * the client application. If you use a Lambda function, when all of the
 * intent information is available, Amazon Lex invokes your Lambda function.
 * If you configure your intent to return the intent information to the
 * client application.
 *
 * You can specify other optional information in the request, such
 * as:
 *
 * - A confirmation prompt to ask the user to confirm an intent. For
 * example, "Shall I order your pizza?"
 *
 * - A conclusion statement to send to the user after the intent has
 * been fulfilled. For example, "I placed your pizza order."
 *
 * - A follow-up prompt that asks the user for additional activity.
 * For example, asking "Do you want to order a drink with your
 * pizza?"
 *
 * If you specify an existing intent name to update the intent, Amazon Lex
 * replaces the values in the `$LATEST` version of the intent with
 * the values in the request. Amazon Lex removes fields that you don't provide in
 * the request. If you don't specify the required fields, Amazon Lex throws an
 * exception. When you update the `$LATEST` version of an intent,
 * the `status` field of any bot that uses the
 * `$LATEST` version of the intent is set to
 * `NOT_BUILT`.
 *
 * For more information, see how-it-works.
 *
 * This operation requires permissions for the
 * `lex:PutIntent` action.
 */
export const putIntent: API.OperationMethod<
  PutIntentRequest,
  PutIntentResponse,
  PutIntentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /intents/{name}/versions/$LATEST",
    input: {
      name: 0,
      description: 0,
      slots: D.list({
        name: 0,
        description: 0,
        slotConstraint: 0,
        slotType: 0,
        slotTypeVersion: 0,
        valueElicitationPrompt: i_Prompt,
        priority: 0,
        sampleUtterances: 0,
        responseCard: 0,
        obfuscationSetting: 0,
        defaultValueSpec: { defaultValueList: D.list({ defaultValue: 0 }) },
      }),
      sampleUtterances: 0,
      confirmationPrompt: i_Prompt,
      rejectionStatement: i_Statement,
      followUpPrompt: { prompt: i_Prompt, rejectionStatement: i_Statement },
      conclusionStatement: i_Statement,
      dialogCodeHook: i_CodeHook,
      fulfillmentActivity: { type: 0, codeHook: i_CodeHook },
      parentIntentSignature: 0,
      checksum: 0,
      createVersion: 0,
      kendraConfiguration: { kendraIndex: 0, queryFilterString: 0, role: 0 },
      inputContexts: D.list({ name: 0 }),
      outputContexts: D.list({
        name: 0,
        timeToLiveInSeconds: 0,
        turnsToLive: 0,
      }),
    },
    output: { lastUpdatedDate: D.ts, createdDate: D.ts },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    PreconditionFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutIntent",
})) as any;

export type PutSlotTypeError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | PreconditionFailedException
  | CommonErrors;
/**
 * Creates a custom slot type or replaces an existing custom slot
 * type.
 *
 * To create a custom slot type, specify a name for the slot type and
 * a set of enumeration values, which are the values that a slot of this type
 * can assume. For more information, see how-it-works.
 *
 * If you specify the name of an existing slot type, the fields in the
 * request replace the existing values in the `$LATEST` version of
 * the slot type. Amazon Lex removes the fields that you don't provide in the
 * request. If you don't specify required fields, Amazon Lex throws an exception.
 * When you update the `$LATEST` version of a slot type, if a bot
 * uses the `$LATEST` version of an intent that contains the slot
 * type, the bot's `status` field is set to
 * `NOT_BUILT`.
 *
 * This operation requires permissions for the
 * `lex:PutSlotType` action.
 */
export const putSlotType: API.OperationMethod<
  PutSlotTypeRequest,
  PutSlotTypeResponse,
  PutSlotTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /slottypes/{name}/versions/$LATEST",
    input: {
      name: 0,
      description: 0,
      enumerationValues: D.list({ value: 0, synonyms: 0 }),
      checksum: 0,
      valueSelectionStrategy: 0,
      createVersion: 0,
      parentSlotTypeSignature: 0,
      slotTypeConfigurations: D.list({ regexConfiguration: { pattern: 0 } }),
    },
    output: { lastUpdatedDate: D.ts, createdDate: D.ts },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    PreconditionFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSlotType",
})) as any;

export type StartImportError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Starts a job to import a resource to Amazon Lex.
 */
export const startImport: API.OperationMethod<
  StartImportRequest,
  StartImportResponse,
  StartImportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /imports",
    input: {
      payload: 0,
      resourceType: 0,
      mergeStrategy: 0,
      tags: D.list(i_Tag),
    },
    output: { createdDate: D.ts },
    body: true,
  },
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartImport",
})) as any;

export type StartMigrationError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Starts migrating a bot from Amazon Lex V1 to Amazon Lex V2. Migrate your bot when
 * you want to take advantage of the new features of Amazon Lex V2.
 *
 * For more information, see Migrating a bot in the Amazon Lex
 * developer guide.
 */
export const startMigration: API.OperationMethod<
  StartMigrationRequest,
  StartMigrationResponse,
  StartMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /migrations",
    input: {
      v1BotName: 0,
      v1BotVersion: 0,
      v2BotName: 0,
      v2BotRole: 0,
      migrationStrategy: 0,
    },
    output: { migrationTimestamp: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMigration",
})) as any;

export type TagResourceError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Adds the specified tags to the specified resource. If a tag key
 * already exists, the existing value is replaced with the new value.
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
    input: { resourceArn: 0, tags: D.list(i_Tag) },
    body: true,
  },
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Removes tags from a bot, bot alias or bot channel.
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
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

const i_CodeHook: D.LazyStruct = () => ({ uri: 0, messageVersion: 0 });
const i_Prompt: D.LazyStruct = () => ({
  messages: D.list(i_Message),
  maxAttempts: 0,
  responseCard: 0,
});
const i_Statement: D.LazyStruct = () => ({
  messages: D.list(i_Message),
  responseCard: 0,
});
const i_Tag: D.LazyStruct = () => ({ key: 0, value: 0 });
const o_BotMetadata: D.LazyStruct = () => ({
  lastUpdatedDate: D.ts,
  createdDate: D.ts,
});
const o_IntentMetadata: D.LazyStruct = () => ({
  lastUpdatedDate: D.ts,
  createdDate: D.ts,
});
const o_SlotTypeMetadata: D.LazyStruct = () => ({
  lastUpdatedDate: D.ts,
  createdDate: D.ts,
});
const i_Message: D.LazyStruct = () => ({
  contentType: 0,
  content: 0,
  groupNumber: 0,
});
