import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Lex Model Building Service",
  serviceShapeName: "AWSDeepSenseModelBuildingService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "lex" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-04-19");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://models.lex.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        if ("aws" === _.getAttr(PartitionResult, "name")) {
          return e(`https://models.lex.${Region}.amazonaws.com`);
        }
        if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
          return e(`https://models.lex.${Region}.amazonaws.com`);
        }
        return e(`https://models.lex.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://models.lex.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalFailureException
  extends /*@__PURE__*/ S.TaggedError<InternalFailureException>()(
    "InternalFailureException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    {
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class PreconditionFailedException
  extends /*@__PURE__*/ S.TaggedError<PreconditionFailedException>()(
    "PreconditionFailedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(412),
  ) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    {
      referenceType: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ReferenceType" }),
      ),
      exampleReference: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(848, __c53, 0)).annotate({
          identifier: "ResourceReference",
        }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type ContentType = "PlainText" | "SSML" | "CustomPayload" | (string & {});
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
export type FulfillmentActivityType = "ReturnIntent" | "CodeHook" | (string & {});
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
export type SlotValueSelectionStrategy = "ORIGINAL_VALUE" | "TOP_RESOLUTION" | (string & {});
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
export type ChannelType = "Facebook" | "Slack" | "Twilio-Sms" | "Kik" | (string & {});
export type ChannelConfigurationMap = { [key: string]: string | undefined };
export type ChannelStatus = "IN_PROGRESS" | "CREATED" | "FAILED" | (string & {});
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
export type MergeStrategy = "OVERWRITE_LATEST" | "FAIL_ON_CONFLICT" | (string & {});
export type ImportStatus = "IN_PROGRESS" | "COMPLETE" | "FAILED" | (string & {});
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
export type MigrationStatus = "IN_PROGRESS" | "COMPLETED" | "FAILED" | (string & {});
export type MigrationStrategy = "CREATE_NEW" | "UPDATE_EXISTING" | (string & {});
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
export type MigrationSortAttribute = "V1_BOT_NAME" | "MIGRATION_DATE_TIME" | (string & {});
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
export type ReferenceType = "Intent" | "Bot" | "BotAlias" | "BotChannel" | (string & {});
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
  input: __S(864, __c54, 0) as any as S.Schema<CreateBotVersionRequest>,
  output: __S(865, __c54, 1) as any as S.Schema<CreateBotVersionResponse>,
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
}));

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
  input: __S(912, __c57, 0) as any as S.Schema<CreateIntentVersionRequest>,
  output: __S(944, __c59, 0) as any as S.Schema<CreateIntentVersionResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<CreateSlotTypeVersionRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<CreateSlotTypeVersionResponse>,
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
}));

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
  input: __S(48, __c3, 0) as any as S.Schema<DeleteBotRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<DeleteBotResponse>,
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
}));

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
  input: __S(80, __c5, 0) as any as S.Schema<DeleteBotAliasRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<DeleteBotAliasResponse>,
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
}));

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
  input: __S(96, __c6, 0) as any as S.Schema<DeleteBotChannelAssociationRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<DeleteBotChannelAssociationResponse>,
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
}));

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
  input: __S(112, __c7, 0) as any as S.Schema<DeleteBotVersionRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<DeleteBotVersionResponse>,
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
}));

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
  input: __S(128, __c8, 0) as any as S.Schema<DeleteIntentRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<DeleteIntentResponse>,
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
}));

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
  input: __S(144, __c9, 0) as any as S.Schema<DeleteIntentVersionRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<DeleteIntentVersionResponse>,
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
}));

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
  input: __S(160, __c10, 0) as any as S.Schema<DeleteSlotTypeRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<DeleteSlotTypeResponse>,
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
}));

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
  input: __S(176, __c11, 0) as any as S.Schema<DeleteSlotTypeVersionRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<DeleteSlotTypeVersionResponse>,
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
}));

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
  input: __S(192, __c12, 0) as any as S.Schema<DeleteUtterancesRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<DeleteUtterancesResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUtterances",
}));

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
  input: __S(208, __c13, 0) as any as S.Schema<GetBotRequest>,
  output: __S(209, __c13, 1) as any as S.Schema<GetBotResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBot",
}));

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
  input: __S(224, __c14, 0) as any as S.Schema<GetBotAliasRequest>,
  output: __S(240, __c15, 0) as any as S.Schema<GetBotAliasResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBotAlias",
}));

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
  input: __S(272, __c17, 0) as any as S.Schema<GetBotAliasesRequest>,
  output: __S(274, __c17, 2) as any as S.Schema<GetBotAliasesResponse>,
  errors: [BadRequestException, InternalFailureException, LimitExceededException],
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
  input: __S(288, __c18, 0) as any as S.Schema<GetBotChannelAssociationRequest>,
  output: __S(305, __c19, 1) as any as S.Schema<GetBotChannelAssociationResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBotChannelAssociation",
}));

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
  input: __S(320, __c20, 0) as any as S.Schema<GetBotChannelAssociationsRequest>,
  output: __S(322, __c20, 2) as any as S.Schema<GetBotChannelAssociationsResponse>,
  errors: [BadRequestException, InternalFailureException, LimitExceededException],
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
  input: __S(336, __c21, 0) as any as S.Schema<GetBotsRequest>,
  output: __S(354, __c22, 2) as any as S.Schema<GetBotsResponse>,
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
  input: __S(368, __c23, 0) as any as S.Schema<GetBotVersionsRequest>,
  output: __S(354, __c22, 2) as any as S.Schema<GetBotVersionsResponse>,
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
  input: __S(384, __c24, 0) as any as S.Schema<GetBuiltinIntentRequest>,
  output: __S(387, __c24, 3) as any as S.Schema<GetBuiltinIntentResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBuiltinIntent",
}));

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
  input: __S(416, __c26, 0) as any as S.Schema<GetBuiltinIntentsRequest>,
  output: __S(417, __c26, 1) as any as S.Schema<GetBuiltinIntentsResponse>,
  errors: [BadRequestException, InternalFailureException, LimitExceededException],
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
  input: __S(448, __c28, 0) as any as S.Schema<GetBuiltinSlotTypesRequest>,
  output: __S(449, __c28, 1) as any as S.Schema<GetBuiltinSlotTypesResponse>,
  errors: [BadRequestException, InternalFailureException, LimitExceededException],
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
  input: __S(464, __c29, 0) as any as S.Schema<GetExportRequest>,
  output: __S(465, __c29, 1) as any as S.Schema<GetExportResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExport",
}));

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
  input: __S(480, __c30, 0) as any as S.Schema<GetImportRequest>,
  output: __S(481, __c30, 1) as any as S.Schema<GetImportResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImport",
}));

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
  input: __S(496, __c31, 0) as any as S.Schema<GetIntentRequest>,
  output: __S(944, __c59, 0) as any as S.Schema<GetIntentResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntent",
}));

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
  input: __S(512, __c32, 0) as any as S.Schema<GetIntentsRequest>,
  output: __S(528, __c33, 0) as any as S.Schema<GetIntentsResponse>,
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
  input: __S(560, __c35, 0) as any as S.Schema<GetIntentVersionsRequest>,
  output: __S(528, __c33, 0) as any as S.Schema<GetIntentVersionsResponse>,
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
  input: __S(576, __c36, 0) as any as S.Schema<GetMigrationRequest>,
  output: __S(579, __c36, 3) as any as S.Schema<GetMigrationResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMigration",
}));

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
  input: __S(592, __c37, 0) as any as S.Schema<GetMigrationsRequest>,
  output: __S(595, __c37, 3) as any as S.Schema<GetMigrationsResponse>,
  errors: [BadRequestException, InternalFailureException, LimitExceededException],
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
  input: __S(608, __c38, 0) as any as S.Schema<GetSlotTypeRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<GetSlotTypeResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSlotType",
}));

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
  input: __S(624, __c39, 0) as any as S.Schema<GetSlotTypesRequest>,
  output: __S(640, __c40, 0) as any as S.Schema<GetSlotTypesResponse>,
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
  input: __S(656, __c41, 0) as any as S.Schema<GetSlotTypeVersionsRequest>,
  output: __S(640, __c40, 0) as any as S.Schema<GetSlotTypeVersionsResponse>,
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
  input: __S(672, __c42, 0) as any as S.Schema<GetUtterancesViewRequest>,
  output: __S(677, __c42, 5) as any as S.Schema<GetUtterancesViewResponse>,
  errors: [BadRequestException, InternalFailureException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUtterancesView",
}));

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
  input: __S(688, __c43, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(689, __c43, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(720, __c45, 0) as any as S.Schema<PutBotRequest>,
  output: __S(721, __c45, 1) as any as S.Schema<PutBotResponse>,
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
}));

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
  input: __S(739, __c46, 3) as any as S.Schema<PutBotAliasRequest>,
  output: __S(740, __c46, 4) as any as S.Schema<PutBotAliasResponse>,
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
}));

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
  input: __S(752, __c47, 0) as any as S.Schema<PutIntentRequest>,
  output: __S(753, __c47, 1) as any as S.Schema<PutIntentResponse>,
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
}));

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
  input: __S(768, __c48, 0) as any as S.Schema<PutSlotTypeRequest>,
  output: __S(769, __c48, 1) as any as S.Schema<PutSlotTypeResponse>,
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
}));

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
  input: __S(784, __c49, 0) as any as S.Schema<StartImportRequest>,
  output: __S(785, __c49, 1) as any as S.Schema<StartImportResponse>,
  errors: [BadRequestException, InternalFailureException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartImport",
}));

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
  input: __S(800, __c50, 0) as any as S.Schema<StartMigrationRequest>,
  output: __S(801, __c50, 1) as any as S.Schema<StartMigrationResponse>,
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
}));

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
  input: __S(816, __c51, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(832, __c52, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String.pipe(T.HttpLabel("name")), checksum: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/slottypes/{name}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSlotTypeVersionRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          description: S.optional(S.String),
          enumerationValues: S.optional(__S(33, __c2, 1)),
          lastUpdatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          version: S.optional(S.String),
          checksum: S.optional(S.String),
          valueSelectionStrategy: S.optional(S.String),
          parentSlotTypeSignature: S.optional(S.String),
          slotTypeConfigurations: S.optional(__S(36, __c2, 4)),
        }),
      ).annotate({ identifier: "CreateSlotTypeVersionResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ value: S.String, synonyms: S.optional(__S(928, __c58, 0)) }),
      ).annotate({ identifier: "EnumerationValue" });
    case 1:
      return S.Array(__S(32, __c2, 0));
    case 2:
      return S.suspend(() => S.Struct({ pattern: S.String })).annotate({
        identifier: "SlotTypeRegexConfiguration",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ regexConfiguration: S.optional(__S(34, __c2, 2)) }),
      ).annotate({ identifier: "SlotTypeConfiguration" });
    case 4:
      return S.Array(__S(35, __c2, 3));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/bots/{name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteBotRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteBotResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          botName: S.String.pipe(T.HttpLabel("botName")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/bots/{botName}/aliases/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteBotAliasRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          botName: S.String.pipe(T.HttpLabel("botName")),
          botAlias: S.String.pipe(T.HttpLabel("botAlias")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/bots/{botName}/aliases/{botAlias}/channels/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteBotChannelAssociationRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          version: S.String.pipe(T.HttpLabel("version")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/bots/{name}/versions/{version}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteBotVersionRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/intents/{name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteIntentRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          version: S.String.pipe(T.HttpLabel("version")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/intents/{name}/versions/{version}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteIntentVersionRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/slottypes/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSlotTypeRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          version: S.String.pipe(T.HttpLabel("version")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/slottypes/{name}/version/{version}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSlotTypeVersionRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          botName: S.String.pipe(T.HttpLabel("botName")),
          userId: S.String.pipe(T.HttpLabel("userId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/bots/{botName}/utterances/{userId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteUtterancesRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          versionOrAlias: S.String.pipe(T.HttpLabel("versionOrAlias")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/bots/{name}/versions/{versionOrAlias}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBotRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          description: S.optional(S.String),
          intents: S.optional(__S(881, __c55, 1)),
          enableModelImprovements: S.optional(S.Boolean),
          nluIntentConfidenceThreshold: S.optional(S.Number),
          clarificationPrompt: S.optional(__S(898, __c56, 2)),
          abortStatement: S.optional(__S(899, __c56, 3)),
          status: S.optional(S.String),
          failureReason: S.optional(S.String),
          lastUpdatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          idleSessionTTLInSeconds: S.optional(S.Number),
          voiceId: S.optional(S.String),
          checksum: S.optional(S.String),
          version: S.optional(S.String),
          locale: S.optional(S.String),
          childDirected: S.optional(S.Boolean),
          detectSentiment: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GetBotResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          botName: S.String.pipe(T.HttpLabel("botName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/bots/{botName}/aliases/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBotAliasRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          description: S.optional(S.String),
          botVersion: S.optional(S.String),
          botName: S.optional(S.String),
          lastUpdatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          checksum: S.optional(S.String),
          conversationLogs: S.optional(__S(258, __c16, 2)),
        }),
      ).annotate({ identifier: "GetBotAliasResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          logType: S.optional(S.String),
          destination: S.optional(S.String),
          kmsKeyArn: S.optional(S.String),
          resourceArn: S.optional(S.String),
          resourcePrefix: S.optional(S.String),
        }),
      ).annotate({ identifier: "LogSettingsResponse" });
    case 1:
      return S.Array(__S(256, __c16, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ logSettings: S.optional(__S(257, __c16, 1)), iamRoleArn: S.optional(S.String) }),
      ).annotate({ identifier: "ConversationLogsResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          botName: S.String.pipe(T.HttpLabel("botName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nameContains: S.optional(S.String).pipe(T.HttpQuery("nameContains")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/bots/{botName}/aliases" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBotAliasesRequest" });
    case 1:
      return S.Array(__S(240, __c15, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ BotAliases: S.optional(__S(273, __c17, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetBotAliasesResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          botName: S.String.pipe(T.HttpLabel("botName")),
          botAlias: S.String.pipe(T.HttpLabel("botAlias")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/bots/{botName}/aliases/{botAlias}/channels/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBotChannelAssociationRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          description: S.optional(S.String),
          botAlias: S.optional(S.String),
          botName: S.optional(S.String),
          createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          type: S.optional(S.String),
          botConfiguration: S.optional(__S(304, __c19, 0)),
          status: S.optional(S.String),
          failureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetBotChannelAssociationResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          botName: S.String.pipe(T.HttpLabel("botName")),
          botAlias: S.String.pipe(T.HttpLabel("botAlias")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nameContains: S.optional(S.String).pipe(T.HttpQuery("nameContains")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/bots/{botName}/aliases/{botAlias}/channels" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBotChannelAssociationsRequest" });
    case 1:
      return S.Array(__S(305, __c19, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          botChannelAssociations: S.optional(__S(321, __c20, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetBotChannelAssociationsResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nameContains: S.optional(S.String).pipe(T.HttpQuery("nameContains")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/bots" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetBotsRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          description: S.optional(S.String),
          status: S.optional(S.String),
          lastUpdatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          version: S.optional(S.String),
        }),
      ).annotate({ identifier: "BotMetadata" });
    case 1:
      return S.Array(__S(352, __c22, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ bots: S.optional(__S(353, __c22, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetBotsResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/bots/{name}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBotVersionsRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ signature: S.String.pipe(T.HttpLabel("signature")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/builtins/intents/{signature}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBuiltinIntentRequest" });
    case 1:
      return S.suspend(() => S.Struct({ name: S.optional(S.String) })).annotate({
        identifier: "BuiltinIntentSlot",
      });
    case 2:
      return S.Array(__S(385, __c24, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          signature: S.optional(S.String),
          supportedLocales: S.optional(__S(400, __c25, 0)),
          slots: S.optional(__S(386, __c24, 2)),
        }),
      ).annotate({ identifier: "GetBuiltinIntentResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          locale: S.optional(S.String).pipe(T.HttpQuery("locale")),
          signatureContains: S.optional(S.String).pipe(T.HttpQuery("signatureContains")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/builtins/intents" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetBuiltinIntentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ intents: S.optional(__S(433, __c27, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetBuiltinIntentsResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          signature: S.optional(S.String),
          supportedLocales: S.optional(__S(400, __c25, 0)),
        }),
      ).annotate({ identifier: "BuiltinIntentMetadata" });
    case 1:
      return S.Array(__S(432, __c27, 0));
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          locale: S.optional(S.String).pipe(T.HttpQuery("locale")),
          signatureContains: S.optional(S.String).pipe(T.HttpQuery("signatureContains")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/builtins/slottypes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBuiltinSlotTypesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ slotTypes: S.optional(__S(433, __c27, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetBuiltinSlotTypesResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpQuery("name")),
          version: S.String.pipe(T.HttpQuery("version")),
          resourceType: S.String.pipe(T.HttpQuery("resourceType")),
          exportType: S.String.pipe(T.HttpQuery("exportType")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/exports" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetExportRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          version: S.optional(S.String),
          resourceType: S.optional(S.String),
          exportType: S.optional(S.String),
          exportStatus: S.optional(S.String),
          failureReason: S.optional(S.String),
          url: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetExportResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ importId: S.String.pipe(T.HttpLabel("importId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/imports/{importId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetImportRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          resourceType: S.optional(S.String),
          mergeStrategy: S.optional(S.String),
          importId: S.optional(S.String),
          importStatus: S.optional(S.String),
          failureReason: S.optional(__S(928, __c58, 0)),
          createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetImportResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          version: S.String.pipe(T.HttpLabel("version")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/intents/{name}/versions/{version}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetIntentRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nameContains: S.optional(S.String).pipe(T.HttpQuery("nameContains")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/intents" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetIntentsRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ intents: S.optional(__S(545, __c34, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetIntentsResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          description: S.optional(S.String),
          lastUpdatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          version: S.optional(S.String),
        }),
      ).annotate({ identifier: "IntentMetadata" });
    case 1:
      return S.Array(__S(544, __c34, 0));
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/intents/{name}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetIntentVersionsRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ migrationId: S.String.pipe(T.HttpLabel("migrationId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/migrations/{migrationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMigrationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          message: S.optional(S.String),
          details: S.optional(__S(928, __c58, 0)),
          referenceURLs: S.optional(__S(928, __c58, 0)),
        }),
      ).annotate({ identifier: "MigrationAlert" });
    case 2:
      return S.Array(__S(577, __c36, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          migrationId: S.optional(S.String),
          v1BotName: S.optional(S.String),
          v1BotVersion: S.optional(S.String),
          v1BotLocale: S.optional(S.String),
          v2BotId: S.optional(S.String),
          v2BotRole: S.optional(S.String),
          migrationStatus: S.optional(S.String),
          migrationStrategy: S.optional(S.String),
          migrationTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          alerts: S.optional(__S(578, __c36, 2)),
        }),
      ).annotate({ identifier: "GetMigrationResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sortByAttribute: S.optional(S.String).pipe(T.HttpQuery("sortByAttribute")),
          sortByOrder: S.optional(S.String).pipe(T.HttpQuery("sortByOrder")),
          v1BotNameContains: S.optional(S.String).pipe(T.HttpQuery("v1BotNameContains")),
          migrationStatusEquals: S.optional(S.String).pipe(T.HttpQuery("migrationStatusEquals")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/migrations" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetMigrationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          migrationId: S.optional(S.String),
          v1BotName: S.optional(S.String),
          v1BotVersion: S.optional(S.String),
          v1BotLocale: S.optional(S.String),
          v2BotId: S.optional(S.String),
          v2BotRole: S.optional(S.String),
          migrationStatus: S.optional(S.String),
          migrationStrategy: S.optional(S.String),
          migrationTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "MigrationSummary" });
    case 2:
      return S.Array(__S(593, __c37, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          migrationSummaries: S.optional(__S(594, __c37, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetMigrationsResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          version: S.String.pipe(T.HttpLabel("version")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/slottypes/{name}/versions/{version}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSlotTypeRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nameContains: S.optional(S.String).pipe(T.HttpQuery("nameContains")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/slottypes" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetSlotTypesRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ slotTypes: S.optional(__S(545, __c34, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetSlotTypesResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/slottypes/{name}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSlotTypeVersionsRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          botName: S.String.pipe(T.HttpLabel("botName")),
          botVersions: __S(928, __c58, 0).pipe(T.HttpQuery("bot_versions")),
          statusType: S.String.pipe(T.HttpQuery("status_type")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/bots/{botName}/utterances?view=aggregation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetUtterancesViewRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          utteranceString: S.optional(S.String),
          count: S.optional(S.Number),
          distinctUsers: S.optional(S.Number),
          firstUtteredDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUtteredDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "UtteranceData" });
    case 2:
      return S.Array(__S(673, __c42, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ botVersion: S.optional(S.String), utterances: S.optional(__S(674, __c42, 2)) }),
      ).annotate({ identifier: "UtteranceList" });
    case 4:
      return S.Array(__S(675, __c42, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ botName: S.optional(S.String), utterances: S.optional(__S(676, __c42, 4)) }),
      ).annotate({ identifier: "GetUtterancesViewResponse" });
  }
}
function __c43(j: number): any {
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
      return S.suspend(() => S.Struct({ tags: S.optional(__S(705, __c44, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(704, __c44, 0));
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          description: S.optional(S.String),
          intents: S.optional(__S(881, __c55, 1)),
          enableModelImprovements: S.optional(S.Boolean),
          nluIntentConfidenceThreshold: S.optional(S.Number),
          clarificationPrompt: S.optional(__S(898, __c56, 2)),
          abortStatement: S.optional(__S(899, __c56, 3)),
          idleSessionTTLInSeconds: S.optional(S.Number),
          voiceId: S.optional(S.String),
          checksum: S.optional(S.String),
          processBehavior: S.optional(S.String),
          locale: S.String,
          childDirected: S.Boolean,
          detectSentiment: S.optional(S.Boolean),
          createVersion: S.optional(S.Boolean),
          tags: S.optional(__S(705, __c44, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/bots/{name}/versions/$LATEST" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutBotRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          description: S.optional(S.String),
          intents: S.optional(__S(881, __c55, 1)),
          enableModelImprovements: S.optional(S.Boolean),
          nluIntentConfidenceThreshold: S.optional(S.Number),
          clarificationPrompt: S.optional(__S(898, __c56, 2)),
          abortStatement: S.optional(__S(899, __c56, 3)),
          status: S.optional(S.String),
          failureReason: S.optional(S.String),
          lastUpdatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          idleSessionTTLInSeconds: S.optional(S.Number),
          voiceId: S.optional(S.String),
          checksum: S.optional(S.String),
          version: S.optional(S.String),
          locale: S.optional(S.String),
          childDirected: S.optional(S.Boolean),
          createVersion: S.optional(S.Boolean),
          detectSentiment: S.optional(S.Boolean),
          tags: S.optional(__S(705, __c44, 1)),
        }),
      ).annotate({ identifier: "PutBotResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          logType: S.String,
          destination: S.String,
          kmsKeyArn: S.optional(S.String),
          resourceArn: S.String,
        }),
      ).annotate({ identifier: "LogSettingsRequest" });
    case 1:
      return S.Array(__S(736, __c46, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ logSettings: __S(737, __c46, 1), iamRoleArn: S.String }),
      ).annotate({ identifier: "ConversationLogsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          description: S.optional(S.String),
          botVersion: S.String,
          botName: S.String.pipe(T.HttpLabel("botName")),
          checksum: S.optional(S.String),
          conversationLogs: S.optional(__S(738, __c46, 2)),
          tags: S.optional(__S(705, __c44, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/bots/{botName}/aliases/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutBotAliasRequest" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          description: S.optional(S.String),
          botVersion: S.optional(S.String),
          botName: S.optional(S.String),
          lastUpdatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          checksum: S.optional(S.String),
          conversationLogs: S.optional(__S(258, __c16, 2)),
          tags: S.optional(__S(705, __c44, 1)),
        }),
      ).annotate({ identifier: "PutBotAliasResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          description: S.optional(S.String),
          slots: S.optional(__S(964, __c60, 4)),
          sampleUtterances: S.optional(__S(928, __c58, 0)),
          confirmationPrompt: S.optional(__S(898, __c56, 2)),
          rejectionStatement: S.optional(__S(899, __c56, 3)),
          followUpPrompt: S.optional(__S(965, __c60, 5)),
          conclusionStatement: S.optional(__S(899, __c56, 3)),
          dialogCodeHook: S.optional(__S(966, __c60, 6)),
          fulfillmentActivity: S.optional(__S(967, __c60, 7)),
          parentIntentSignature: S.optional(S.String),
          checksum: S.optional(S.String),
          createVersion: S.optional(S.Boolean),
          kendraConfiguration: S.optional(__S(968, __c60, 8)),
          inputContexts: S.optional(__S(970, __c60, 10)),
          outputContexts: S.optional(__S(972, __c60, 12)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/intents/{name}/versions/$LATEST" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutIntentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          description: S.optional(S.String),
          slots: S.optional(__S(964, __c60, 4)),
          sampleUtterances: S.optional(__S(928, __c58, 0)),
          confirmationPrompt: S.optional(__S(898, __c56, 2)),
          rejectionStatement: S.optional(__S(899, __c56, 3)),
          followUpPrompt: S.optional(__S(965, __c60, 5)),
          conclusionStatement: S.optional(__S(899, __c56, 3)),
          dialogCodeHook: S.optional(__S(966, __c60, 6)),
          fulfillmentActivity: S.optional(__S(967, __c60, 7)),
          parentIntentSignature: S.optional(S.String),
          lastUpdatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          version: S.optional(S.String),
          checksum: S.optional(S.String),
          createVersion: S.optional(S.Boolean),
          kendraConfiguration: S.optional(__S(968, __c60, 8)),
          inputContexts: S.optional(__S(970, __c60, 10)),
          outputContexts: S.optional(__S(972, __c60, 12)),
        }),
      ).annotate({ identifier: "PutIntentResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String.pipe(T.HttpLabel("name")),
          description: S.optional(S.String),
          enumerationValues: S.optional(__S(33, __c2, 1)),
          checksum: S.optional(S.String),
          valueSelectionStrategy: S.optional(S.String),
          createVersion: S.optional(S.Boolean),
          parentSlotTypeSignature: S.optional(S.String),
          slotTypeConfigurations: S.optional(__S(36, __c2, 4)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/slottypes/{name}/versions/$LATEST" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutSlotTypeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          description: S.optional(S.String),
          enumerationValues: S.optional(__S(33, __c2, 1)),
          lastUpdatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          version: S.optional(S.String),
          checksum: S.optional(S.String),
          valueSelectionStrategy: S.optional(S.String),
          createVersion: S.optional(S.Boolean),
          parentSlotTypeSignature: S.optional(S.String),
          slotTypeConfigurations: S.optional(__S(36, __c2, 4)),
        }),
      ).annotate({ identifier: "PutSlotTypeResponse" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          payload: T.Blob,
          resourceType: S.String,
          mergeStrategy: S.String,
          tags: S.optional(__S(705, __c44, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/imports" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartImportRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          resourceType: S.optional(S.String),
          mergeStrategy: S.optional(S.String),
          importId: S.optional(S.String),
          importStatus: S.optional(S.String),
          tags: S.optional(__S(705, __c44, 1)),
          createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "StartImportResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          v1BotName: S.String,
          v1BotVersion: S.String,
          v2BotName: S.String,
          v2BotRole: S.String,
          migrationStrategy: S.String,
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/migrations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartMigrationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          v1BotName: S.optional(S.String),
          v1BotVersion: S.optional(S.String),
          v1BotLocale: S.optional(S.String),
          v2BotId: S.optional(S.String),
          v2BotRole: S.optional(S.String),
          migrationId: S.optional(S.String),
          migrationStrategy: S.optional(S.String),
          migrationTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "StartMigrationResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(705, __c44, 1),
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
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(928, __c58, 0).pipe(T.HttpQuery("tagKeys")),
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
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), version: S.optional(S.String) }),
      ).annotate({ identifier: "ResourceReference" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String.pipe(T.HttpLabel("name")), checksum: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/bots/{name}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateBotVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          description: S.optional(S.String),
          intents: S.optional(__S(881, __c55, 1)),
          clarificationPrompt: S.optional(__S(898, __c56, 2)),
          abortStatement: S.optional(__S(899, __c56, 3)),
          status: S.optional(S.String),
          failureReason: S.optional(S.String),
          lastUpdatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          idleSessionTTLInSeconds: S.optional(S.Number),
          voiceId: S.optional(S.String),
          checksum: S.optional(S.String),
          version: S.optional(S.String),
          locale: S.optional(S.String),
          childDirected: S.optional(S.Boolean),
          enableModelImprovements: S.optional(S.Boolean),
          detectSentiment: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "CreateBotVersionResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ intentName: S.String, intentVersion: S.String })).annotate({
        identifier: "Intent",
      });
    case 1:
      return S.Array(__S(880, __c55, 0));
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ contentType: S.String, content: S.String, groupNumber: S.optional(S.Number) }),
      ).annotate({ identifier: "Message" });
    case 1:
      return S.Array(__S(896, __c56, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          messages: __S(897, __c56, 1),
          maxAttempts: S.Number,
          responseCard: S.optional(S.String),
        }),
      ).annotate({ identifier: "Prompt" });
    case 3:
      return S.suspend(() =>
        S.Struct({ messages: __S(897, __c56, 1), responseCard: S.optional(S.String) }),
      ).annotate({ identifier: "Statement" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String.pipe(T.HttpLabel("name")), checksum: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/intents/{name}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateIntentVersionRequest" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          description: S.optional(S.String),
          slots: S.optional(__S(964, __c60, 4)),
          sampleUtterances: S.optional(__S(928, __c58, 0)),
          confirmationPrompt: S.optional(__S(898, __c56, 2)),
          rejectionStatement: S.optional(__S(899, __c56, 3)),
          followUpPrompt: S.optional(__S(965, __c60, 5)),
          conclusionStatement: S.optional(__S(899, __c56, 3)),
          dialogCodeHook: S.optional(__S(966, __c60, 6)),
          fulfillmentActivity: S.optional(__S(967, __c60, 7)),
          parentIntentSignature: S.optional(S.String),
          lastUpdatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          version: S.optional(S.String),
          checksum: S.optional(S.String),
          kendraConfiguration: S.optional(__S(968, __c60, 8)),
          inputContexts: S.optional(__S(970, __c60, 10)),
          outputContexts: S.optional(__S(972, __c60, 12)),
        }),
      ).annotate({ identifier: "CreateIntentVersionResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ defaultValue: S.String })).annotate({
        identifier: "SlotDefaultValue",
      });
    case 1:
      return S.Array(__S(960, __c60, 0));
    case 2:
      return S.suspend(() => S.Struct({ defaultValueList: __S(961, __c60, 1) })).annotate({
        identifier: "SlotDefaultValueSpec",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          slotConstraint: S.String,
          slotType: S.optional(S.String),
          slotTypeVersion: S.optional(S.String),
          valueElicitationPrompt: S.optional(__S(898, __c56, 2)),
          priority: S.optional(S.Number),
          sampleUtterances: S.optional(__S(928, __c58, 0)),
          responseCard: S.optional(S.String),
          obfuscationSetting: S.optional(S.String),
          defaultValueSpec: S.optional(__S(962, __c60, 2)),
        }),
      ).annotate({ identifier: "Slot" });
    case 4:
      return S.Array(__S(963, __c60, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ prompt: __S(898, __c56, 2), rejectionStatement: __S(899, __c56, 3) }),
      ).annotate({ identifier: "FollowUpPrompt" });
    case 6:
      return S.suspend(() => S.Struct({ uri: S.String, messageVersion: S.String })).annotate({
        identifier: "CodeHook",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({ type: S.String, codeHook: S.optional(__S(966, __c60, 6)) }),
      ).annotate({ identifier: "FulfillmentActivity" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          kendraIndex: S.String,
          queryFilterString: S.optional(S.String),
          role: S.String,
        }),
      ).annotate({ identifier: "KendraConfiguration" });
    case 9:
      return S.suspend(() => S.Struct({ name: S.String })).annotate({ identifier: "InputContext" });
    case 10:
      return S.Array(__S(969, __c60, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({ name: S.String, timeToLiveInSeconds: S.Number, turnsToLive: S.Number }),
      ).annotate({ identifier: "OutputContext" });
    case 12:
      return S.Array(__S(971, __c60, 11));
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
