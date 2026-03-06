// ==========================================================================
// Dialogflow API (dialogflow v3beta1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { GCPAuth } from "../auth.ts";
import type { CommonErrors } from "../errors.ts";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "dialogflow",
  version: "v3beta1",
  rootUrl: "https://dialogflow.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleRpcStatus {
  code?: number;
  message?: string;
  details?: Array<Record<string, unknown>>;
}

export const GoogleRpcStatus: Schema.Schema<GoogleRpcStatus> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "GoogleRpcStatus" }) as any as Schema.Schema<GoogleRpcStatus>;

export interface GoogleLongrunningOperation {
  name?: string;
  metadata?: Record<string, unknown>;
  done?: boolean;
  error?: GoogleRpcStatus;
  response?: Record<string, unknown>;
}

export const GoogleLongrunningOperation: Schema.Schema<GoogleLongrunningOperation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(GoogleRpcStatus),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleLongrunningOperation" }) as any as Schema.Schema<GoogleLongrunningOperation>;

export interface GoogleLongrunningListOperationsResponse {
  operations?: Array<GoogleLongrunningOperation>;
  nextPageToken?: string;
  unreachable?: Array<string>;
}

export const GoogleLongrunningListOperationsResponse: Schema.Schema<GoogleLongrunningListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(GoogleLongrunningOperation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleLongrunningListOperationsResponse" }) as any as Schema.Schema<GoogleLongrunningListOperationsResponse>;

export interface GoogleProtobufEmpty {
}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleProtobufEmpty" }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessageText {
  text?: Array<string>;
  allowPlaybackInterruption?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessageText: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageText> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.Array(Schema.String)),
  allowPlaybackInterruption: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ResponseMessageText" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageText>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessageConversationSuccess {
  metadata?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessageConversationSuccess: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageConversationSuccess> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ResponseMessageConversationSuccess" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageConversationSuccess>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessageOutputAudioText {
  text?: string;
  ssml?: string;
  allowPlaybackInterruption?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessageOutputAudioText: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageOutputAudioText> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  ssml: Schema.optional(Schema.String),
  allowPlaybackInterruption: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ResponseMessageOutputAudioText" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageOutputAudioText>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessageLiveAgentHandoff {
  metadata?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessageLiveAgentHandoff: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageLiveAgentHandoff> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ResponseMessageLiveAgentHandoff" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageLiveAgentHandoff>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessageEndInteraction {
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessageEndInteraction: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageEndInteraction> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ResponseMessageEndInteraction" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageEndInteraction>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessagePlayAudio {
  audioUri?: string;
  allowPlaybackInterruption?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessagePlayAudio: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessagePlayAudio> = Schema.suspend(() => Schema.Struct({
  audioUri: Schema.optional(Schema.String),
  allowPlaybackInterruption: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ResponseMessagePlayAudio" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessagePlayAudio>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudioSegment {
  audio?: string;
  uri?: string;
  allowPlaybackInterruption?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudioSegment: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudioSegment> = Schema.suspend(() => Schema.Struct({
  audio: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  allowPlaybackInterruption: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudioSegment" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudioSegment>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudio {
  segments?: Array<GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudioSegment>;
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudio: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudio> = Schema.suspend(() => Schema.Struct({
  segments: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudioSegment)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudio" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudio>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessageTelephonyTransferCall {
  phoneNumber?: string;
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessageTelephonyTransferCall: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageTelephonyTransferCall> = Schema.suspend(() => Schema.Struct({
  phoneNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ResponseMessageTelephonyTransferCall" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageTelephonyTransferCall>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessageKnowledgeInfoCard {
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessageKnowledgeInfoCard: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageKnowledgeInfoCard> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ResponseMessageKnowledgeInfoCard" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageKnowledgeInfoCard>;

export interface GoogleCloudDialogflowCxV3beta1ToolCall {
  tool?: string;
  action?: string;
  inputParameters?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3beta1ToolCall: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolCall> = Schema.suspend(() => Schema.Struct({
  tool: Schema.optional(Schema.String),
  action: Schema.optional(Schema.String),
  inputParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolCall" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolCall>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessage {
  text?: GoogleCloudDialogflowCxV3beta1ResponseMessageText;
  payload?: Record<string, unknown>;
  conversationSuccess?: GoogleCloudDialogflowCxV3beta1ResponseMessageConversationSuccess;
  outputAudioText?: GoogleCloudDialogflowCxV3beta1ResponseMessageOutputAudioText;
  liveAgentHandoff?: GoogleCloudDialogflowCxV3beta1ResponseMessageLiveAgentHandoff;
  endInteraction?: GoogleCloudDialogflowCxV3beta1ResponseMessageEndInteraction;
  playAudio?: GoogleCloudDialogflowCxV3beta1ResponseMessagePlayAudio;
  mixedAudio?: GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudio;
  telephonyTransferCall?: GoogleCloudDialogflowCxV3beta1ResponseMessageTelephonyTransferCall;
  knowledgeInfoCard?: GoogleCloudDialogflowCxV3beta1ResponseMessageKnowledgeInfoCard;
  toolCall?: GoogleCloudDialogflowCxV3beta1ToolCall;
  channel?: string;
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessage: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessage> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(GoogleCloudDialogflowCxV3beta1ResponseMessageText),
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  conversationSuccess: Schema.optional(GoogleCloudDialogflowCxV3beta1ResponseMessageConversationSuccess),
  outputAudioText: Schema.optional(GoogleCloudDialogflowCxV3beta1ResponseMessageOutputAudioText),
  liveAgentHandoff: Schema.optional(GoogleCloudDialogflowCxV3beta1ResponseMessageLiveAgentHandoff),
  endInteraction: Schema.optional(GoogleCloudDialogflowCxV3beta1ResponseMessageEndInteraction),
  playAudio: Schema.optional(GoogleCloudDialogflowCxV3beta1ResponseMessagePlayAudio),
  mixedAudio: Schema.optional(GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudio),
  telephonyTransferCall: Schema.optional(GoogleCloudDialogflowCxV3beta1ResponseMessageTelephonyTransferCall),
  knowledgeInfoCard: Schema.optional(GoogleCloudDialogflowCxV3beta1ResponseMessageKnowledgeInfoCard),
  toolCall: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolCall),
  channel: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ResponseMessage" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessage>;

export interface GoogleCloudDialogflowCxV3beta1FulfillmentSetParameterAction {
  parameter?: string;
  value?: unknown;
}

export const GoogleCloudDialogflowCxV3beta1FulfillmentSetParameterAction: Schema.Schema<GoogleCloudDialogflowCxV3beta1FulfillmentSetParameterAction> = Schema.suspend(() => Schema.Struct({
  parameter: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Unknown),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1FulfillmentSetParameterAction" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1FulfillmentSetParameterAction>;

export interface GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCaseCaseContent {
  message?: GoogleCloudDialogflowCxV3beta1ResponseMessage;
  additionalCases?: GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCases;
}

export const GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCaseCaseContent: Schema.Schema<GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCaseCaseContent> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(GoogleCloudDialogflowCxV3beta1ResponseMessage),
  additionalCases: Schema.optional(GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCases),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCaseCaseContent" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCaseCaseContent>;

export interface GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCase {
  condition?: string;
  caseContent?: Array<GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCaseCaseContent>;
}

export const GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCase: Schema.Schema<GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCase> = Schema.suspend(() => Schema.Struct({
  condition: Schema.optional(Schema.String),
  caseContent: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCaseCaseContent)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCase" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCase>;

export interface GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCases {
  cases?: Array<GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCase>;
}

export const GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCases: Schema.Schema<GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCases> = Schema.suspend(() => Schema.Struct({
  cases: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCase)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCases" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCases>;

export interface GoogleCloudDialogflowCxV3beta1GcsDestination {
  uri?: string;
}

export const GoogleCloudDialogflowCxV3beta1GcsDestination: Schema.Schema<GoogleCloudDialogflowCxV3beta1GcsDestination> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1GcsDestination" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1GcsDestination>;

export interface GoogleCloudDialogflowCxV3beta1AdvancedSettingsSpeechSettings {
  endpointerSensitivity?: number;
  noSpeechTimeout?: string;
  useTimeoutBasedEndpointing?: boolean;
  models?: Record<string, string>;
}

export const GoogleCloudDialogflowCxV3beta1AdvancedSettingsSpeechSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1AdvancedSettingsSpeechSettings> = Schema.suspend(() => Schema.Struct({
  endpointerSensitivity: Schema.optional(Schema.Number),
  noSpeechTimeout: Schema.optional(Schema.String),
  useTimeoutBasedEndpointing: Schema.optional(Schema.Boolean),
  models: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1AdvancedSettingsSpeechSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1AdvancedSettingsSpeechSettings>;

export interface GoogleCloudDialogflowCxV3beta1AdvancedSettingsDtmfSettings {
  enabled?: boolean;
  maxDigits?: number;
  finishDigit?: string;
  interdigitTimeoutDuration?: string;
  endpointingTimeoutDuration?: string;
}

export const GoogleCloudDialogflowCxV3beta1AdvancedSettingsDtmfSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1AdvancedSettingsDtmfSettings> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  maxDigits: Schema.optional(Schema.Number),
  finishDigit: Schema.optional(Schema.String),
  interdigitTimeoutDuration: Schema.optional(Schema.String),
  endpointingTimeoutDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1AdvancedSettingsDtmfSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1AdvancedSettingsDtmfSettings>;

export interface GoogleCloudDialogflowCxV3beta1AdvancedSettingsLoggingSettings {
  enableStackdriverLogging?: boolean;
  enableInteractionLogging?: boolean;
  enableConsentBasedRedaction?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1AdvancedSettingsLoggingSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1AdvancedSettingsLoggingSettings> = Schema.suspend(() => Schema.Struct({
  enableStackdriverLogging: Schema.optional(Schema.Boolean),
  enableInteractionLogging: Schema.optional(Schema.Boolean),
  enableConsentBasedRedaction: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1AdvancedSettingsLoggingSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1AdvancedSettingsLoggingSettings>;

export interface GoogleCloudDialogflowCxV3beta1AdvancedSettings {
  audioExportGcsDestination?: GoogleCloudDialogflowCxV3beta1GcsDestination;
  speechSettings?: GoogleCloudDialogflowCxV3beta1AdvancedSettingsSpeechSettings;
  dtmfSettings?: GoogleCloudDialogflowCxV3beta1AdvancedSettingsDtmfSettings;
  loggingSettings?: GoogleCloudDialogflowCxV3beta1AdvancedSettingsLoggingSettings;
}

export const GoogleCloudDialogflowCxV3beta1AdvancedSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1AdvancedSettings> = Schema.suspend(() => Schema.Struct({
  audioExportGcsDestination: Schema.optional(GoogleCloudDialogflowCxV3beta1GcsDestination),
  speechSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1AdvancedSettingsSpeechSettings),
  dtmfSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1AdvancedSettingsDtmfSettings),
  loggingSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1AdvancedSettingsLoggingSettings),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1AdvancedSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1AdvancedSettings>;

export interface GoogleCloudDialogflowCxV3beta1FulfillmentGeneratorSettings {
  generator?: string;
  inputParameters?: Record<string, string>;
  outputParameter?: string;
}

export const GoogleCloudDialogflowCxV3beta1FulfillmentGeneratorSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1FulfillmentGeneratorSettings> = Schema.suspend(() => Schema.Struct({
  generator: Schema.optional(Schema.String),
  inputParameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  outputParameter: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1FulfillmentGeneratorSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1FulfillmentGeneratorSettings>;

export interface GoogleCloudDialogflowCxV3beta1Fulfillment {
  messages?: Array<GoogleCloudDialogflowCxV3beta1ResponseMessage>;
  webhook?: string;
  returnPartialResponses?: boolean;
  tag?: string;
  setParameterActions?: Array<GoogleCloudDialogflowCxV3beta1FulfillmentSetParameterAction>;
  conditionalCases?: Array<GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCases>;
  advancedSettings?: GoogleCloudDialogflowCxV3beta1AdvancedSettings;
  enableGenerativeFallback?: boolean;
  generators?: Array<GoogleCloudDialogflowCxV3beta1FulfillmentGeneratorSettings>;
}

export const GoogleCloudDialogflowCxV3beta1Fulfillment: Schema.Schema<GoogleCloudDialogflowCxV3beta1Fulfillment> = Schema.suspend(() => Schema.Struct({
  messages: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ResponseMessage)),
  webhook: Schema.optional(Schema.String),
  returnPartialResponses: Schema.optional(Schema.Boolean),
  tag: Schema.optional(Schema.String),
  setParameterActions: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1FulfillmentSetParameterAction)),
  conditionalCases: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCases)),
  advancedSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1AdvancedSettings),
  enableGenerativeFallback: Schema.optional(Schema.Boolean),
  generators: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1FulfillmentGeneratorSettings)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Fulfillment" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Fulfillment>;

export interface GoogleCloudDialogflowCxV3beta1EventHandler {
  name?: string;
  event?: string;
  triggerFulfillment?: GoogleCloudDialogflowCxV3beta1Fulfillment;
  targetPage?: string;
  targetFlow?: string;
  targetPlaybook?: string;
}

export const GoogleCloudDialogflowCxV3beta1EventHandler: Schema.Schema<GoogleCloudDialogflowCxV3beta1EventHandler> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  event: Schema.optional(Schema.String),
  triggerFulfillment: Schema.optional(GoogleCloudDialogflowCxV3beta1Fulfillment),
  targetPage: Schema.optional(Schema.String),
  targetFlow: Schema.optional(Schema.String),
  targetPlaybook: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1EventHandler" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1EventHandler>;

export interface GoogleCloudDialogflowCxV3beta1FormParameterFillBehavior {
  initialPromptFulfillment?: GoogleCloudDialogflowCxV3beta1Fulfillment;
  repromptEventHandlers?: Array<GoogleCloudDialogflowCxV3beta1EventHandler>;
}

export const GoogleCloudDialogflowCxV3beta1FormParameterFillBehavior: Schema.Schema<GoogleCloudDialogflowCxV3beta1FormParameterFillBehavior> = Schema.suspend(() => Schema.Struct({
  initialPromptFulfillment: Schema.optional(GoogleCloudDialogflowCxV3beta1Fulfillment),
  repromptEventHandlers: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1EventHandler)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1FormParameterFillBehavior" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1FormParameterFillBehavior>;

export interface GoogleCloudDialogflowCxV3beta1FormParameter {
  displayName?: string;
  required?: boolean;
  entityType?: string;
  isList?: boolean;
  fillBehavior?: GoogleCloudDialogflowCxV3beta1FormParameterFillBehavior;
  defaultValue?: unknown;
  redact?: boolean;
  advancedSettings?: GoogleCloudDialogflowCxV3beta1AdvancedSettings;
}

export const GoogleCloudDialogflowCxV3beta1FormParameter: Schema.Schema<GoogleCloudDialogflowCxV3beta1FormParameter> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  required: Schema.optional(Schema.Boolean),
  entityType: Schema.optional(Schema.String),
  isList: Schema.optional(Schema.Boolean),
  fillBehavior: Schema.optional(GoogleCloudDialogflowCxV3beta1FormParameterFillBehavior),
  defaultValue: Schema.optional(Schema.Unknown),
  redact: Schema.optional(Schema.Boolean),
  advancedSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1AdvancedSettings),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1FormParameter" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1FormParameter>;

export interface GoogleCloudDialogflowCxV3beta1Form {
  parameters?: Array<GoogleCloudDialogflowCxV3beta1FormParameter>;
}

export const GoogleCloudDialogflowCxV3beta1Form: Schema.Schema<GoogleCloudDialogflowCxV3beta1Form> = Schema.suspend(() => Schema.Struct({
  parameters: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1FormParameter)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Form" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Form>;

export interface GoogleCloudDialogflowCxV3beta1TransitionRoute {
  name?: string;
  description?: string;
  intent?: string;
  condition?: string;
  triggerFulfillment?: GoogleCloudDialogflowCxV3beta1Fulfillment;
  targetPage?: string;
  targetFlow?: string;
}

export const GoogleCloudDialogflowCxV3beta1TransitionRoute: Schema.Schema<GoogleCloudDialogflowCxV3beta1TransitionRoute> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  intent: Schema.optional(Schema.String),
  condition: Schema.optional(Schema.String),
  triggerFulfillment: Schema.optional(GoogleCloudDialogflowCxV3beta1Fulfillment),
  targetPage: Schema.optional(Schema.String),
  targetFlow: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1TransitionRoute" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TransitionRoute>;

export interface GoogleCloudDialogflowCxV3beta1DataStoreConnection {
  dataStoreType?: "DATA_STORE_TYPE_UNSPECIFIED" | "PUBLIC_WEB" | "UNSTRUCTURED" | "STRUCTURED" | (string & {});
  dataStore?: string;
  documentProcessingMode?: "DOCUMENT_PROCESSING_MODE_UNSPECIFIED" | "DOCUMENTS" | "CHUNKS" | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1DataStoreConnection: Schema.Schema<GoogleCloudDialogflowCxV3beta1DataStoreConnection> = Schema.suspend(() => Schema.Struct({
  dataStoreType: Schema.optional(Schema.String),
  dataStore: Schema.optional(Schema.String),
  documentProcessingMode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1DataStoreConnection" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1DataStoreConnection>;

export interface GoogleCloudDialogflowCxV3beta1KnowledgeConnectorSettings {
  enabled?: boolean;
  triggerFulfillment?: GoogleCloudDialogflowCxV3beta1Fulfillment;
  targetPage?: string;
  targetFlow?: string;
  dataStoreConnections?: Array<GoogleCloudDialogflowCxV3beta1DataStoreConnection>;
}

export const GoogleCloudDialogflowCxV3beta1KnowledgeConnectorSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1KnowledgeConnectorSettings> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  triggerFulfillment: Schema.optional(GoogleCloudDialogflowCxV3beta1Fulfillment),
  targetPage: Schema.optional(Schema.String),
  targetFlow: Schema.optional(Schema.String),
  dataStoreConnections: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1DataStoreConnection)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1KnowledgeConnectorSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1KnowledgeConnectorSettings>;

export interface GoogleCloudDialogflowCxV3beta1Page {
  name?: string;
  displayName?: string;
  description?: string;
  entryFulfillment?: GoogleCloudDialogflowCxV3beta1Fulfillment;
  form?: GoogleCloudDialogflowCxV3beta1Form;
  transitionRouteGroups?: Array<string>;
  transitionRoutes?: Array<GoogleCloudDialogflowCxV3beta1TransitionRoute>;
  eventHandlers?: Array<GoogleCloudDialogflowCxV3beta1EventHandler>;
  advancedSettings?: GoogleCloudDialogflowCxV3beta1AdvancedSettings;
  knowledgeConnectorSettings?: GoogleCloudDialogflowCxV3beta1KnowledgeConnectorSettings;
}

export const GoogleCloudDialogflowCxV3beta1Page: Schema.Schema<GoogleCloudDialogflowCxV3beta1Page> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  entryFulfillment: Schema.optional(GoogleCloudDialogflowCxV3beta1Fulfillment),
  form: Schema.optional(GoogleCloudDialogflowCxV3beta1Form),
  transitionRouteGroups: Schema.optional(Schema.Array(Schema.String)),
  transitionRoutes: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1TransitionRoute)),
  eventHandlers: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1EventHandler)),
  advancedSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1AdvancedSettings),
  knowledgeConnectorSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1KnowledgeConnectorSettings),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Page" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Page>;

export interface GoogleCloudDialogflowCxV3beta1ListPagesResponse {
  pages?: Array<GoogleCloudDialogflowCxV3beta1Page>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3beta1ListPagesResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ListPagesResponse> = Schema.suspend(() => Schema.Struct({
  pages: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1Page)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ListPagesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ListPagesResponse>;

export interface GoogleCloudDialogflowCxV3beta1NluSettings {
  modelType?: "MODEL_TYPE_UNSPECIFIED" | "MODEL_TYPE_STANDARD" | "MODEL_TYPE_ADVANCED" | (string & {});
  classificationThreshold?: number;
  modelTrainingMode?: "MODEL_TRAINING_MODE_UNSPECIFIED" | "MODEL_TRAINING_MODE_AUTOMATIC" | "MODEL_TRAINING_MODE_MANUAL" | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1NluSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1NluSettings> = Schema.suspend(() => Schema.Struct({
  modelType: Schema.optional(Schema.String),
  classificationThreshold: Schema.optional(Schema.Number),
  modelTrainingMode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1NluSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1NluSettings>;

export interface GoogleCloudDialogflowCxV3beta1InlineSchema {
  type?: "DATA_TYPE_UNSPECIFIED" | "STRING" | "NUMBER" | "BOOLEAN" | "ARRAY" | (string & {});
  items?: GoogleCloudDialogflowCxV3beta1TypeSchema;
}

export const GoogleCloudDialogflowCxV3beta1InlineSchema: Schema.Schema<GoogleCloudDialogflowCxV3beta1InlineSchema> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  items: Schema.optional(GoogleCloudDialogflowCxV3beta1TypeSchema),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1InlineSchema" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1InlineSchema>;

export interface GoogleCloudDialogflowCxV3beta1TypeSchemaSchemaReference {
  tool?: string;
  schema?: string;
}

export const GoogleCloudDialogflowCxV3beta1TypeSchemaSchemaReference: Schema.Schema<GoogleCloudDialogflowCxV3beta1TypeSchemaSchemaReference> = Schema.suspend(() => Schema.Struct({
  tool: Schema.optional(Schema.String),
  schema: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1TypeSchemaSchemaReference" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TypeSchemaSchemaReference>;

export interface GoogleCloudDialogflowCxV3beta1TypeSchema {
  inlineSchema?: GoogleCloudDialogflowCxV3beta1InlineSchema;
  schemaReference?: GoogleCloudDialogflowCxV3beta1TypeSchemaSchemaReference;
}

export const GoogleCloudDialogflowCxV3beta1TypeSchema: Schema.Schema<GoogleCloudDialogflowCxV3beta1TypeSchema> = Schema.suspend(() => Schema.Struct({
  inlineSchema: Schema.optional(GoogleCloudDialogflowCxV3beta1InlineSchema),
  schemaReference: Schema.optional(GoogleCloudDialogflowCxV3beta1TypeSchemaSchemaReference),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1TypeSchema" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TypeSchema>;

export interface GoogleCloudDialogflowCxV3beta1ParameterDefinition {
  name?: string;
  type?: "PARAMETER_TYPE_UNSPECIFIED" | "STRING" | "NUMBER" | "BOOLEAN" | "NULL" | "OBJECT" | "LIST" | (string & {});
  typeSchema?: GoogleCloudDialogflowCxV3beta1TypeSchema;
  description?: string;
}

export const GoogleCloudDialogflowCxV3beta1ParameterDefinition: Schema.Schema<GoogleCloudDialogflowCxV3beta1ParameterDefinition> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  typeSchema: Schema.optional(GoogleCloudDialogflowCxV3beta1TypeSchema),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ParameterDefinition" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ParameterDefinition>;

export interface GoogleCloudDialogflowCxV3beta1FlowMultiLanguageSettings {
  enableMultiLanguageDetection?: boolean;
  supportedResponseLanguageCodes?: Array<string>;
}

export const GoogleCloudDialogflowCxV3beta1FlowMultiLanguageSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1FlowMultiLanguageSettings> = Schema.suspend(() => Schema.Struct({
  enableMultiLanguageDetection: Schema.optional(Schema.Boolean),
  supportedResponseLanguageCodes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1FlowMultiLanguageSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1FlowMultiLanguageSettings>;

export interface GoogleCloudDialogflowCxV3beta1Flow {
  name?: string;
  displayName?: string;
  description?: string;
  transitionRoutes?: Array<GoogleCloudDialogflowCxV3beta1TransitionRoute>;
  eventHandlers?: Array<GoogleCloudDialogflowCxV3beta1EventHandler>;
  transitionRouteGroups?: Array<string>;
  nluSettings?: GoogleCloudDialogflowCxV3beta1NluSettings;
  advancedSettings?: GoogleCloudDialogflowCxV3beta1AdvancedSettings;
  knowledgeConnectorSettings?: GoogleCloudDialogflowCxV3beta1KnowledgeConnectorSettings;
  inputParameterDefinitions?: Array<GoogleCloudDialogflowCxV3beta1ParameterDefinition>;
  outputParameterDefinitions?: Array<GoogleCloudDialogflowCxV3beta1ParameterDefinition>;
  multiLanguageSettings?: GoogleCloudDialogflowCxV3beta1FlowMultiLanguageSettings;
  locked?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1Flow: Schema.Schema<GoogleCloudDialogflowCxV3beta1Flow> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  transitionRoutes: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1TransitionRoute)),
  eventHandlers: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1EventHandler)),
  transitionRouteGroups: Schema.optional(Schema.Array(Schema.String)),
  nluSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1NluSettings),
  advancedSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1AdvancedSettings),
  knowledgeConnectorSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1KnowledgeConnectorSettings),
  inputParameterDefinitions: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ParameterDefinition)),
  outputParameterDefinitions: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ParameterDefinition)),
  multiLanguageSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1FlowMultiLanguageSettings),
  locked: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Flow" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Flow>;

export interface GoogleCloudDialogflowCxV3beta1ListFlowsResponse {
  flows?: Array<GoogleCloudDialogflowCxV3beta1Flow>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3beta1ListFlowsResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ListFlowsResponse> = Schema.suspend(() => Schema.Struct({
  flows: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1Flow)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ListFlowsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ListFlowsResponse>;

export interface GoogleCloudDialogflowCxV3beta1TrainFlowRequest {
}

export const GoogleCloudDialogflowCxV3beta1TrainFlowRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1TrainFlowRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1TrainFlowRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TrainFlowRequest>;

export interface GoogleCloudDialogflowCxV3beta1ValidateFlowRequest {
  languageCode?: string;
}

export const GoogleCloudDialogflowCxV3beta1ValidateFlowRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1ValidateFlowRequest> = Schema.suspend(() => Schema.Struct({
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ValidateFlowRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ValidateFlowRequest>;

export interface GoogleCloudDialogflowCxV3beta1ResourceName {
  name?: string;
  displayName?: string;
}

export const GoogleCloudDialogflowCxV3beta1ResourceName: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResourceName> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ResourceName" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResourceName>;

export interface GoogleCloudDialogflowCxV3beta1ValidationMessage {
  resourceType?: "RESOURCE_TYPE_UNSPECIFIED" | "AGENT" | "INTENT" | "INTENT_TRAINING_PHRASE" | "INTENT_PARAMETER" | "INTENTS" | "INTENT_TRAINING_PHRASES" | "ENTITY_TYPE" | "ENTITY_TYPES" | "WEBHOOK" | "FLOW" | "PAGE" | "PAGES" | "TRANSITION_ROUTE_GROUP" | "AGENT_TRANSITION_ROUTE_GROUP" | (string & {});
  resources?: Array<string>;
  resourceNames?: Array<GoogleCloudDialogflowCxV3beta1ResourceName>;
  severity?: "SEVERITY_UNSPECIFIED" | "INFO" | "WARNING" | "ERROR" | (string & {});
  detail?: string;
}

export const GoogleCloudDialogflowCxV3beta1ValidationMessage: Schema.Schema<GoogleCloudDialogflowCxV3beta1ValidationMessage> = Schema.suspend(() => Schema.Struct({
  resourceType: Schema.optional(Schema.String),
  resources: Schema.optional(Schema.Array(Schema.String)),
  resourceNames: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ResourceName)),
  severity: Schema.optional(Schema.String),
  detail: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ValidationMessage" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ValidationMessage>;

export interface GoogleCloudDialogflowCxV3beta1FlowValidationResult {
  name?: string;
  validationMessages?: Array<GoogleCloudDialogflowCxV3beta1ValidationMessage>;
  updateTime?: string;
}

export const GoogleCloudDialogflowCxV3beta1FlowValidationResult: Schema.Schema<GoogleCloudDialogflowCxV3beta1FlowValidationResult> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  validationMessages: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ValidationMessage)),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1FlowValidationResult" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1FlowValidationResult>;

export interface GoogleCloudDialogflowCxV3beta1FlowImportStrategy {
  globalImportStrategy?: "IMPORT_STRATEGY_UNSPECIFIED" | "IMPORT_STRATEGY_CREATE_NEW" | "IMPORT_STRATEGY_REPLACE" | "IMPORT_STRATEGY_KEEP" | "IMPORT_STRATEGY_MERGE" | "IMPORT_STRATEGY_THROW_ERROR" | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1FlowImportStrategy: Schema.Schema<GoogleCloudDialogflowCxV3beta1FlowImportStrategy> = Schema.suspend(() => Schema.Struct({
  globalImportStrategy: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1FlowImportStrategy" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1FlowImportStrategy>;

export interface GoogleCloudDialogflowCxV3beta1ImportFlowRequest {
  flowUri?: string;
  flowContent?: string;
  importOption?: "IMPORT_OPTION_UNSPECIFIED" | "KEEP" | "FALLBACK" | (string & {});
  flowImportStrategy?: GoogleCloudDialogflowCxV3beta1FlowImportStrategy;
}

export const GoogleCloudDialogflowCxV3beta1ImportFlowRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportFlowRequest> = Schema.suspend(() => Schema.Struct({
  flowUri: Schema.optional(Schema.String),
  flowContent: Schema.optional(Schema.String),
  importOption: Schema.optional(Schema.String),
  flowImportStrategy: Schema.optional(GoogleCloudDialogflowCxV3beta1FlowImportStrategy),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ImportFlowRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportFlowRequest>;

export interface GoogleCloudDialogflowCxV3beta1ExportFlowRequest {
  flowUri?: string;
  includeReferencedFlows?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1ExportFlowRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportFlowRequest> = Schema.suspend(() => Schema.Struct({
  flowUri: Schema.optional(Schema.String),
  includeReferencedFlows: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExportFlowRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportFlowRequest>;

export interface GoogleCloudDialogflowCxV3beta1SecuritySettingsAudioExportSettings {
  gcsBucket?: string;
  audioExportPattern?: string;
  enableAudioRedaction?: boolean;
  audioFormat?: "AUDIO_FORMAT_UNSPECIFIED" | "MULAW" | "MP3" | "OGG" | (string & {});
  storeTtsAudio?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1SecuritySettingsAudioExportSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1SecuritySettingsAudioExportSettings> = Schema.suspend(() => Schema.Struct({
  gcsBucket: Schema.optional(Schema.String),
  audioExportPattern: Schema.optional(Schema.String),
  enableAudioRedaction: Schema.optional(Schema.Boolean),
  audioFormat: Schema.optional(Schema.String),
  storeTtsAudio: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1SecuritySettingsAudioExportSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1SecuritySettingsAudioExportSettings>;

export interface GoogleCloudDialogflowCxV3beta1SecuritySettingsInsightsExportSettings {
  enableInsightsExport?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1SecuritySettingsInsightsExportSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1SecuritySettingsInsightsExportSettings> = Schema.suspend(() => Schema.Struct({
  enableInsightsExport: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1SecuritySettingsInsightsExportSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1SecuritySettingsInsightsExportSettings>;

export interface GoogleCloudDialogflowCxV3beta1SecuritySettings {
  name?: string;
  displayName?: string;
  redactionStrategy?: "REDACTION_STRATEGY_UNSPECIFIED" | "REDACT_WITH_SERVICE" | (string & {});
  redactionScope?: "REDACTION_SCOPE_UNSPECIFIED" | "REDACT_DISK_STORAGE" | (string & {});
  inspectTemplate?: string;
  deidentifyTemplate?: string;
  retentionWindowDays?: number;
  retentionStrategy?: "RETENTION_STRATEGY_UNSPECIFIED" | "REMOVE_AFTER_CONVERSATION" | (string & {});
  purgeDataTypes?: Array<"PURGE_DATA_TYPE_UNSPECIFIED" | "DIALOGFLOW_HISTORY" | (string & {})>;
  audioExportSettings?: GoogleCloudDialogflowCxV3beta1SecuritySettingsAudioExportSettings;
  insightsExportSettings?: GoogleCloudDialogflowCxV3beta1SecuritySettingsInsightsExportSettings;
}

export const GoogleCloudDialogflowCxV3beta1SecuritySettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1SecuritySettings> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  redactionStrategy: Schema.optional(Schema.String),
  redactionScope: Schema.optional(Schema.String),
  inspectTemplate: Schema.optional(Schema.String),
  deidentifyTemplate: Schema.optional(Schema.String),
  retentionWindowDays: Schema.optional(Schema.Number),
  retentionStrategy: Schema.optional(Schema.String),
  purgeDataTypes: Schema.optional(Schema.Array(Schema.String)),
  audioExportSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1SecuritySettingsAudioExportSettings),
  insightsExportSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1SecuritySettingsInsightsExportSettings),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1SecuritySettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1SecuritySettings>;

export interface GoogleCloudDialogflowCxV3beta1ListSecuritySettingsResponse {
  securitySettings?: Array<GoogleCloudDialogflowCxV3beta1SecuritySettings>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3beta1ListSecuritySettingsResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ListSecuritySettingsResponse> = Schema.suspend(() => Schema.Struct({
  securitySettings: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1SecuritySettings)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ListSecuritySettingsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ListSecuritySettingsResponse>;

export interface GoogleCloudDialogflowCxV3beta1SpeechToTextSettings {
  enableSpeechAdaptation?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1SpeechToTextSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1SpeechToTextSettings> = Schema.suspend(() => Schema.Struct({
  enableSpeechAdaptation: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1SpeechToTextSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1SpeechToTextSettings>;

export interface GoogleCloudDialogflowCxV3beta1AgentGitIntegrationSettingsGithubSettings {
  displayName?: string;
  repositoryUri?: string;
  trackingBranch?: string;
  accessToken?: string;
  branches?: Array<string>;
}

export const GoogleCloudDialogflowCxV3beta1AgentGitIntegrationSettingsGithubSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1AgentGitIntegrationSettingsGithubSettings> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  repositoryUri: Schema.optional(Schema.String),
  trackingBranch: Schema.optional(Schema.String),
  accessToken: Schema.optional(Schema.String),
  branches: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1AgentGitIntegrationSettingsGithubSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1AgentGitIntegrationSettingsGithubSettings>;

export interface GoogleCloudDialogflowCxV3beta1AgentGitIntegrationSettingsGitConnectionSettings {
  displayName?: string;
  repositoryUri?: string;
  trackingBranch?: string;
  branches?: Array<string>;
  accessTokenSecret?: string;
}

export const GoogleCloudDialogflowCxV3beta1AgentGitIntegrationSettingsGitConnectionSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1AgentGitIntegrationSettingsGitConnectionSettings> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  repositoryUri: Schema.optional(Schema.String),
  trackingBranch: Schema.optional(Schema.String),
  branches: Schema.optional(Schema.Array(Schema.String)),
  accessTokenSecret: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1AgentGitIntegrationSettingsGitConnectionSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1AgentGitIntegrationSettingsGitConnectionSettings>;

export interface GoogleCloudDialogflowCxV3beta1AgentGitIntegrationSettings {
  githubSettings?: GoogleCloudDialogflowCxV3beta1AgentGitIntegrationSettingsGithubSettings;
  gitConnectionSettings?: GoogleCloudDialogflowCxV3beta1AgentGitIntegrationSettingsGitConnectionSettings;
}

export const GoogleCloudDialogflowCxV3beta1AgentGitIntegrationSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1AgentGitIntegrationSettings> = Schema.suspend(() => Schema.Struct({
  githubSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1AgentGitIntegrationSettingsGithubSettings),
  gitConnectionSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1AgentGitIntegrationSettingsGitConnectionSettings),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1AgentGitIntegrationSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1AgentGitIntegrationSettings>;

export interface GoogleCloudDialogflowCxV3beta1BigQueryExportSettings {
  enabled?: boolean;
  bigqueryTable?: string;
}

export const GoogleCloudDialogflowCxV3beta1BigQueryExportSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1BigQueryExportSettings> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  bigqueryTable: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1BigQueryExportSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1BigQueryExportSettings>;

export interface GoogleCloudDialogflowCxV3beta1VoiceSelectionParams {
  name?: string;
  ssmlGender?: "SSML_VOICE_GENDER_UNSPECIFIED" | "SSML_VOICE_GENDER_MALE" | "SSML_VOICE_GENDER_FEMALE" | "SSML_VOICE_GENDER_NEUTRAL" | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1VoiceSelectionParams: Schema.Schema<GoogleCloudDialogflowCxV3beta1VoiceSelectionParams> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  ssmlGender: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1VoiceSelectionParams" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1VoiceSelectionParams>;

export interface GoogleCloudDialogflowCxV3beta1SynthesizeSpeechConfig {
  speakingRate?: number;
  pitch?: number;
  volumeGainDb?: number;
  effectsProfileId?: Array<string>;
  voice?: GoogleCloudDialogflowCxV3beta1VoiceSelectionParams;
}

export const GoogleCloudDialogflowCxV3beta1SynthesizeSpeechConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1SynthesizeSpeechConfig> = Schema.suspend(() => Schema.Struct({
  speakingRate: Schema.optional(Schema.Number),
  pitch: Schema.optional(Schema.Number),
  volumeGainDb: Schema.optional(Schema.Number),
  effectsProfileId: Schema.optional(Schema.Array(Schema.String)),
  voice: Schema.optional(GoogleCloudDialogflowCxV3beta1VoiceSelectionParams),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1SynthesizeSpeechConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1SynthesizeSpeechConfig>;

export interface GoogleCloudDialogflowCxV3beta1TextToSpeechSettings {
  synthesizeSpeechConfigs?: Record<string, GoogleCloudDialogflowCxV3beta1SynthesizeSpeechConfig>;
}

export const GoogleCloudDialogflowCxV3beta1TextToSpeechSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1TextToSpeechSettings> = Schema.suspend(() => Schema.Struct({
  synthesizeSpeechConfigs: Schema.optional(Schema.Record(Schema.String, GoogleCloudDialogflowCxV3beta1SynthesizeSpeechConfig)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1TextToSpeechSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TextToSpeechSettings>;

export interface GoogleCloudDialogflowCxV3beta1AgentGenAppBuilderSettings {
  engine?: string;
}

export const GoogleCloudDialogflowCxV3beta1AgentGenAppBuilderSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1AgentGenAppBuilderSettings> = Schema.suspend(() => Schema.Struct({
  engine: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1AgentGenAppBuilderSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1AgentGenAppBuilderSettings>;

export interface GoogleCloudDialogflowCxV3beta1AgentAnswerFeedbackSettings {
  enableAnswerFeedback?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1AgentAnswerFeedbackSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1AgentAnswerFeedbackSettings> = Schema.suspend(() => Schema.Struct({
  enableAnswerFeedback: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1AgentAnswerFeedbackSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1AgentAnswerFeedbackSettings>;

export interface GoogleCloudDialogflowCxV3beta1AgentPersonalizationSettings {
  defaultEndUserMetadata?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3beta1AgentPersonalizationSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1AgentPersonalizationSettings> = Schema.suspend(() => Schema.Struct({
  defaultEndUserMetadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1AgentPersonalizationSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1AgentPersonalizationSettings>;

export interface GoogleCloudDialogflowCxV3beta1AgentClientCertificateSettings {
  sslCertificate?: string;
  privateKey?: string;
  passphrase?: string;
}

export const GoogleCloudDialogflowCxV3beta1AgentClientCertificateSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1AgentClientCertificateSettings> = Schema.suspend(() => Schema.Struct({
  sslCertificate: Schema.optional(Schema.String),
  privateKey: Schema.optional(Schema.String),
  passphrase: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1AgentClientCertificateSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1AgentClientCertificateSettings>;

export interface GoogleCloudDialogflowCxV3beta1Agent {
  name?: string;
  displayName?: string;
  defaultLanguageCode?: string;
  supportedLanguageCodes?: Array<string>;
  timeZone?: string;
  description?: string;
  avatarUri?: string;
  speechToTextSettings?: GoogleCloudDialogflowCxV3beta1SpeechToTextSettings;
  startFlow?: string;
  startPlaybook?: string;
  securitySettings?: string;
  enableStackdriverLogging?: boolean;
  enableSpellCorrection?: boolean;
  enableMultiLanguageTraining?: boolean;
  locked?: boolean;
  advancedSettings?: GoogleCloudDialogflowCxV3beta1AdvancedSettings;
  gitIntegrationSettings?: GoogleCloudDialogflowCxV3beta1AgentGitIntegrationSettings;
  bigqueryExportSettings?: GoogleCloudDialogflowCxV3beta1BigQueryExportSettings;
  textToSpeechSettings?: GoogleCloudDialogflowCxV3beta1TextToSpeechSettings;
  genAppBuilderSettings?: GoogleCloudDialogflowCxV3beta1AgentGenAppBuilderSettings;
  answerFeedbackSettings?: GoogleCloudDialogflowCxV3beta1AgentAnswerFeedbackSettings;
  personalizationSettings?: GoogleCloudDialogflowCxV3beta1AgentPersonalizationSettings;
  clientCertificateSettings?: GoogleCloudDialogflowCxV3beta1AgentClientCertificateSettings;
  satisfiesPzs?: boolean;
  satisfiesPzi?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1Agent: Schema.Schema<GoogleCloudDialogflowCxV3beta1Agent> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  defaultLanguageCode: Schema.optional(Schema.String),
  supportedLanguageCodes: Schema.optional(Schema.Array(Schema.String)),
  timeZone: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  avatarUri: Schema.optional(Schema.String),
  speechToTextSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1SpeechToTextSettings),
  startFlow: Schema.optional(Schema.String),
  startPlaybook: Schema.optional(Schema.String),
  securitySettings: Schema.optional(Schema.String),
  enableStackdriverLogging: Schema.optional(Schema.Boolean),
  enableSpellCorrection: Schema.optional(Schema.Boolean),
  enableMultiLanguageTraining: Schema.optional(Schema.Boolean),
  locked: Schema.optional(Schema.Boolean),
  advancedSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1AdvancedSettings),
  gitIntegrationSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1AgentGitIntegrationSettings),
  bigqueryExportSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1BigQueryExportSettings),
  textToSpeechSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1TextToSpeechSettings),
  genAppBuilderSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1AgentGenAppBuilderSettings),
  answerFeedbackSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1AgentAnswerFeedbackSettings),
  personalizationSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1AgentPersonalizationSettings),
  clientCertificateSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1AgentClientCertificateSettings),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  satisfiesPzi: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Agent" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Agent>;

export interface GoogleCloudDialogflowCxV3beta1ListAgentsResponse {
  agents?: Array<GoogleCloudDialogflowCxV3beta1Agent>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3beta1ListAgentsResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ListAgentsResponse> = Schema.suspend(() => Schema.Struct({
  agents: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1Agent)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ListAgentsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ListAgentsResponse>;

export interface GoogleCloudDialogflowCxV3beta1ExportAgentRequestGitDestination {
  trackingBranch?: string;
  commitMessage?: string;
}

export const GoogleCloudDialogflowCxV3beta1ExportAgentRequestGitDestination: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportAgentRequestGitDestination> = Schema.suspend(() => Schema.Struct({
  trackingBranch: Schema.optional(Schema.String),
  commitMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExportAgentRequestGitDestination" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportAgentRequestGitDestination>;

export interface GoogleCloudDialogflowCxV3beta1ExportAgentRequest {
  agentUri?: string;
  dataFormat?: "DATA_FORMAT_UNSPECIFIED" | "BLOB" | "JSON_PACKAGE" | (string & {});
  environment?: string;
  gitDestination?: GoogleCloudDialogflowCxV3beta1ExportAgentRequestGitDestination;
  includeBigqueryExportSettings?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1ExportAgentRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportAgentRequest> = Schema.suspend(() => Schema.Struct({
  agentUri: Schema.optional(Schema.String),
  dataFormat: Schema.optional(Schema.String),
  environment: Schema.optional(Schema.String),
  gitDestination: Schema.optional(GoogleCloudDialogflowCxV3beta1ExportAgentRequestGitDestination),
  includeBigqueryExportSettings: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExportAgentRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportAgentRequest>;

export interface GoogleCloudDialogflowCxV3beta1RestoreAgentRequestGitSource {
  trackingBranch?: string;
}

export const GoogleCloudDialogflowCxV3beta1RestoreAgentRequestGitSource: Schema.Schema<GoogleCloudDialogflowCxV3beta1RestoreAgentRequestGitSource> = Schema.suspend(() => Schema.Struct({
  trackingBranch: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1RestoreAgentRequestGitSource" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1RestoreAgentRequestGitSource>;

export interface GoogleCloudDialogflowCxV3beta1RestoreAgentRequest {
  agentUri?: string;
  agentContent?: string;
  gitSource?: GoogleCloudDialogflowCxV3beta1RestoreAgentRequestGitSource;
  restoreOption?: "RESTORE_OPTION_UNSPECIFIED" | "KEEP" | "FALLBACK" | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1RestoreAgentRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1RestoreAgentRequest> = Schema.suspend(() => Schema.Struct({
  agentUri: Schema.optional(Schema.String),
  agentContent: Schema.optional(Schema.String),
  gitSource: Schema.optional(GoogleCloudDialogflowCxV3beta1RestoreAgentRequestGitSource),
  restoreOption: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1RestoreAgentRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1RestoreAgentRequest>;

export interface GoogleCloudDialogflowCxV3beta1ValidateAgentRequest {
  languageCode?: string;
}

export const GoogleCloudDialogflowCxV3beta1ValidateAgentRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1ValidateAgentRequest> = Schema.suspend(() => Schema.Struct({
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ValidateAgentRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ValidateAgentRequest>;

export interface GoogleCloudDialogflowCxV3beta1AgentValidationResult {
  name?: string;
  flowValidationResults?: Array<GoogleCloudDialogflowCxV3beta1FlowValidationResult>;
}

export const GoogleCloudDialogflowCxV3beta1AgentValidationResult: Schema.Schema<GoogleCloudDialogflowCxV3beta1AgentValidationResult> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  flowValidationResults: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1FlowValidationResult)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1AgentValidationResult" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1AgentValidationResult>;

export interface GoogleCloudDialogflowCxV3beta1GenerativeSettingsFallbackSettingsPromptTemplate {
  displayName?: string;
  promptText?: string;
  frozen?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1GenerativeSettingsFallbackSettingsPromptTemplate: Schema.Schema<GoogleCloudDialogflowCxV3beta1GenerativeSettingsFallbackSettingsPromptTemplate> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  promptText: Schema.optional(Schema.String),
  frozen: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1GenerativeSettingsFallbackSettingsPromptTemplate" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1GenerativeSettingsFallbackSettingsPromptTemplate>;

export interface GoogleCloudDialogflowCxV3beta1GenerativeSettingsFallbackSettings {
  selectedPrompt?: string;
  promptTemplates?: Array<GoogleCloudDialogflowCxV3beta1GenerativeSettingsFallbackSettingsPromptTemplate>;
}

export const GoogleCloudDialogflowCxV3beta1GenerativeSettingsFallbackSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1GenerativeSettingsFallbackSettings> = Schema.suspend(() => Schema.Struct({
  selectedPrompt: Schema.optional(Schema.String),
  promptTemplates: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1GenerativeSettingsFallbackSettingsPromptTemplate)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1GenerativeSettingsFallbackSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1GenerativeSettingsFallbackSettings>;

export interface GoogleCloudDialogflowCxV3beta1SafetySettingsPhrase {
  text?: string;
  languageCode?: string;
}

export const GoogleCloudDialogflowCxV3beta1SafetySettingsPhrase: Schema.Schema<GoogleCloudDialogflowCxV3beta1SafetySettingsPhrase> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1SafetySettingsPhrase" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1SafetySettingsPhrase>;

export interface GoogleCloudDialogflowCxV3beta1SafetySettingsRaiSettingsCategoryFilter {
  category?: "SAFETY_CATEGORY_UNSPECIFIED" | "DANGEROUS_CONTENT" | "HATE_SPEECH" | "HARASSMENT" | "SEXUALLY_EXPLICIT_CONTENT" | (string & {});
  filterLevel?: "SAFETY_FILTER_LEVEL_UNSPECIFIED" | "BLOCK_NONE" | "BLOCK_FEW" | "BLOCK_SOME" | "BLOCK_MOST" | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1SafetySettingsRaiSettingsCategoryFilter: Schema.Schema<GoogleCloudDialogflowCxV3beta1SafetySettingsRaiSettingsCategoryFilter> = Schema.suspend(() => Schema.Struct({
  category: Schema.optional(Schema.String),
  filterLevel: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1SafetySettingsRaiSettingsCategoryFilter" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1SafetySettingsRaiSettingsCategoryFilter>;

export interface GoogleCloudDialogflowCxV3beta1SafetySettingsRaiSettings {
  categoryFilters?: Array<GoogleCloudDialogflowCxV3beta1SafetySettingsRaiSettingsCategoryFilter>;
}

export const GoogleCloudDialogflowCxV3beta1SafetySettingsRaiSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1SafetySettingsRaiSettings> = Schema.suspend(() => Schema.Struct({
  categoryFilters: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1SafetySettingsRaiSettingsCategoryFilter)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1SafetySettingsRaiSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1SafetySettingsRaiSettings>;

export interface GoogleCloudDialogflowCxV3beta1SafetySettingsPromptSecuritySettings {
  enablePromptSecurity?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1SafetySettingsPromptSecuritySettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1SafetySettingsPromptSecuritySettings> = Schema.suspend(() => Schema.Struct({
  enablePromptSecurity: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1SafetySettingsPromptSecuritySettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1SafetySettingsPromptSecuritySettings>;

export interface GoogleCloudDialogflowCxV3beta1SafetySettings {
  defaultBannedPhraseMatchStrategy?: "PHRASE_MATCH_STRATEGY_UNSPECIFIED" | "PARTIAL_MATCH" | "WORD_MATCH" | (string & {});
  bannedPhrases?: Array<GoogleCloudDialogflowCxV3beta1SafetySettingsPhrase>;
  raiSettings?: GoogleCloudDialogflowCxV3beta1SafetySettingsRaiSettings;
  defaultRaiSettings?: GoogleCloudDialogflowCxV3beta1SafetySettingsRaiSettings;
  promptSecuritySettings?: GoogleCloudDialogflowCxV3beta1SafetySettingsPromptSecuritySettings;
}

export const GoogleCloudDialogflowCxV3beta1SafetySettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1SafetySettings> = Schema.suspend(() => Schema.Struct({
  defaultBannedPhraseMatchStrategy: Schema.optional(Schema.String),
  bannedPhrases: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1SafetySettingsPhrase)),
  raiSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1SafetySettingsRaiSettings),
  defaultRaiSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1SafetySettingsRaiSettings),
  promptSecuritySettings: Schema.optional(GoogleCloudDialogflowCxV3beta1SafetySettingsPromptSecuritySettings),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1SafetySettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1SafetySettings>;

export interface GoogleCloudDialogflowCxV3beta1GenerativeSettingsKnowledgeConnectorSettings {
  business?: string;
  agent?: string;
  agentIdentity?: string;
  businessDescription?: string;
  agentScope?: string;
  disableDataStoreFallback?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1GenerativeSettingsKnowledgeConnectorSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1GenerativeSettingsKnowledgeConnectorSettings> = Schema.suspend(() => Schema.Struct({
  business: Schema.optional(Schema.String),
  agent: Schema.optional(Schema.String),
  agentIdentity: Schema.optional(Schema.String),
  businessDescription: Schema.optional(Schema.String),
  agentScope: Schema.optional(Schema.String),
  disableDataStoreFallback: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1GenerativeSettingsKnowledgeConnectorSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1GenerativeSettingsKnowledgeConnectorSettings>;

export interface GoogleCloudDialogflowCxV3beta1LlmModelSettingsParameters {
  temperature?: number;
  inputTokenLimit?: "INPUT_TOKEN_LIMIT_UNSPECIFIED" | "INPUT_TOKEN_LIMIT_SHORT" | "INPUT_TOKEN_LIMIT_MEDIUM" | "INPUT_TOKEN_LIMIT_LONG" | (string & {});
  outputTokenLimit?: "OUTPUT_TOKEN_LIMIT_UNSPECIFIED" | "OUTPUT_TOKEN_LIMIT_SHORT" | "OUTPUT_TOKEN_LIMIT_MEDIUM" | "OUTPUT_TOKEN_LIMIT_LONG" | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1LlmModelSettingsParameters: Schema.Schema<GoogleCloudDialogflowCxV3beta1LlmModelSettingsParameters> = Schema.suspend(() => Schema.Struct({
  temperature: Schema.optional(Schema.Number),
  inputTokenLimit: Schema.optional(Schema.String),
  outputTokenLimit: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1LlmModelSettingsParameters" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1LlmModelSettingsParameters>;

export interface GoogleCloudDialogflowCxV3beta1LlmModelSettings {
  model?: string;
  promptText?: string;
  parameters?: GoogleCloudDialogflowCxV3beta1LlmModelSettingsParameters;
}

export const GoogleCloudDialogflowCxV3beta1LlmModelSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1LlmModelSettings> = Schema.suspend(() => Schema.Struct({
  model: Schema.optional(Schema.String),
  promptText: Schema.optional(Schema.String),
  parameters: Schema.optional(GoogleCloudDialogflowCxV3beta1LlmModelSettingsParameters),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1LlmModelSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1LlmModelSettings>;

export interface GoogleCloudDialogflowCxV3beta1GenerativeSettings {
  name?: string;
  fallbackSettings?: GoogleCloudDialogflowCxV3beta1GenerativeSettingsFallbackSettings;
  generativeSafetySettings?: GoogleCloudDialogflowCxV3beta1SafetySettings;
  knowledgeConnectorSettings?: GoogleCloudDialogflowCxV3beta1GenerativeSettingsKnowledgeConnectorSettings;
  languageCode?: string;
  llmModelSettings?: GoogleCloudDialogflowCxV3beta1LlmModelSettings;
}

export const GoogleCloudDialogflowCxV3beta1GenerativeSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1GenerativeSettings> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  fallbackSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1GenerativeSettingsFallbackSettings),
  generativeSafetySettings: Schema.optional(GoogleCloudDialogflowCxV3beta1SafetySettings),
  knowledgeConnectorSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1GenerativeSettingsKnowledgeConnectorSettings),
  languageCode: Schema.optional(Schema.String),
  llmModelSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1LlmModelSettings),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1GenerativeSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1GenerativeSettings>;

export interface GoogleCloudDialogflowCxV3beta1Changelog {
  name?: string;
  userEmail?: string;
  displayName?: string;
  action?: string;
  type?: string;
  resource?: string;
  createTime?: string;
  languageCode?: string;
}

export const GoogleCloudDialogflowCxV3beta1Changelog: Schema.Schema<GoogleCloudDialogflowCxV3beta1Changelog> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  userEmail: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  action: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Changelog" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Changelog>;

export interface GoogleCloudDialogflowCxV3beta1ListChangelogsResponse {
  changelogs?: Array<GoogleCloudDialogflowCxV3beta1Changelog>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3beta1ListChangelogsResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ListChangelogsResponse> = Schema.suspend(() => Schema.Struct({
  changelogs: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1Changelog)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ListChangelogsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ListChangelogsResponse>;

export interface GoogleCloudDialogflowCxV3beta1IntentTrainingPhrasePart {
  text?: string;
  parameterId?: string;
}

export const GoogleCloudDialogflowCxV3beta1IntentTrainingPhrasePart: Schema.Schema<GoogleCloudDialogflowCxV3beta1IntentTrainingPhrasePart> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  parameterId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1IntentTrainingPhrasePart" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1IntentTrainingPhrasePart>;

export interface GoogleCloudDialogflowCxV3beta1IntentTrainingPhrase {
  id?: string;
  parts?: Array<GoogleCloudDialogflowCxV3beta1IntentTrainingPhrasePart>;
  repeatCount?: number;
}

export const GoogleCloudDialogflowCxV3beta1IntentTrainingPhrase: Schema.Schema<GoogleCloudDialogflowCxV3beta1IntentTrainingPhrase> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  parts: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1IntentTrainingPhrasePart)),
  repeatCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1IntentTrainingPhrase" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1IntentTrainingPhrase>;

export interface GoogleCloudDialogflowCxV3beta1IntentParameter {
  id?: string;
  entityType?: string;
  isList?: boolean;
  redact?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1IntentParameter: Schema.Schema<GoogleCloudDialogflowCxV3beta1IntentParameter> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  entityType: Schema.optional(Schema.String),
  isList: Schema.optional(Schema.Boolean),
  redact: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1IntentParameter" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1IntentParameter>;

export interface GoogleCloudDialogflowCxV3beta1Intent {
  name?: string;
  displayName?: string;
  trainingPhrases?: Array<GoogleCloudDialogflowCxV3beta1IntentTrainingPhrase>;
  parameters?: Array<GoogleCloudDialogflowCxV3beta1IntentParameter>;
  priority?: number;
  isFallback?: boolean;
  labels?: Record<string, string>;
  description?: string;
}

export const GoogleCloudDialogflowCxV3beta1Intent: Schema.Schema<GoogleCloudDialogflowCxV3beta1Intent> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  trainingPhrases: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1IntentTrainingPhrase)),
  parameters: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1IntentParameter)),
  priority: Schema.optional(Schema.Number),
  isFallback: Schema.optional(Schema.Boolean),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Intent" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Intent>;

export interface GoogleCloudDialogflowCxV3beta1ListIntentsResponse {
  intents?: Array<GoogleCloudDialogflowCxV3beta1Intent>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3beta1ListIntentsResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ListIntentsResponse> = Schema.suspend(() => Schema.Struct({
  intents: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1Intent)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ListIntentsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ListIntentsResponse>;

export interface GoogleCloudDialogflowCxV3beta1InlineSource {
  content?: string;
}

export const GoogleCloudDialogflowCxV3beta1InlineSource: Schema.Schema<GoogleCloudDialogflowCxV3beta1InlineSource> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1InlineSource" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1InlineSource>;

export interface GoogleCloudDialogflowCxV3beta1ImportIntentsRequest {
  intentsUri?: string;
  intentsContent?: GoogleCloudDialogflowCxV3beta1InlineSource;
  mergeOption?: "MERGE_OPTION_UNSPECIFIED" | "REJECT" | "REPLACE" | "MERGE" | "RENAME" | "REPORT_CONFLICT" | "KEEP" | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1ImportIntentsRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportIntentsRequest> = Schema.suspend(() => Schema.Struct({
  intentsUri: Schema.optional(Schema.String),
  intentsContent: Schema.optional(GoogleCloudDialogflowCxV3beta1InlineSource),
  mergeOption: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ImportIntentsRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportIntentsRequest>;

export interface GoogleCloudDialogflowCxV3beta1ExportIntentsRequest {
  intents?: Array<string>;
  intentsUri?: string;
  intentsContentInline?: boolean;
  dataFormat?: "DATA_FORMAT_UNSPECIFIED" | "BLOB" | "JSON" | "CSV" | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1ExportIntentsRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportIntentsRequest> = Schema.suspend(() => Schema.Struct({
  intents: Schema.optional(Schema.Array(Schema.String)),
  intentsUri: Schema.optional(Schema.String),
  intentsContentInline: Schema.optional(Schema.Boolean),
  dataFormat: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExportIntentsRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportIntentsRequest>;

export interface GoogleCloudDialogflowCxV3beta1PlaybookInput {
  precedingConversationSummary?: string;
  actionParameters?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3beta1PlaybookInput: Schema.Schema<GoogleCloudDialogflowCxV3beta1PlaybookInput> = Schema.suspend(() => Schema.Struct({
  precedingConversationSummary: Schema.optional(Schema.String),
  actionParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1PlaybookInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1PlaybookInput>;

export interface GoogleCloudDialogflowCxV3beta1PlaybookOutput {
  executionSummary?: string;
  state?: "STATE_UNSPECIFIED" | "OK" | "CANCELLED" | "FAILED" | "ESCALATED" | (string & {});
  actionParameters?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3beta1PlaybookOutput: Schema.Schema<GoogleCloudDialogflowCxV3beta1PlaybookOutput> = Schema.suspend(() => Schema.Struct({
  executionSummary: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  actionParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1PlaybookOutput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1PlaybookOutput>;

export interface GoogleCloudDialogflowCxV3beta1UserUtterance {
  text?: string;
  audioTokens?: Array<number>;
  audio?: string;
}

export const GoogleCloudDialogflowCxV3beta1UserUtterance: Schema.Schema<GoogleCloudDialogflowCxV3beta1UserUtterance> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  audioTokens: Schema.optional(Schema.Array(Schema.Number)),
  audio: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1UserUtterance" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1UserUtterance>;

export interface GoogleCloudDialogflowCxV3beta1Event {
  event?: string;
  text?: string;
}

export const GoogleCloudDialogflowCxV3beta1Event: Schema.Schema<GoogleCloudDialogflowCxV3beta1Event> = Schema.suspend(() => Schema.Struct({
  event: Schema.optional(Schema.String),
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Event" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Event>;

export interface GoogleCloudDialogflowCxV3beta1AgentUtterance {
  text?: string;
  requireGeneration?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1AgentUtterance: Schema.Schema<GoogleCloudDialogflowCxV3beta1AgentUtterance> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  requireGeneration: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1AgentUtterance" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1AgentUtterance>;

export interface GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsRewriterModelCallSignals {
  renderedPrompt?: string;
  modelOutput?: string;
  model?: string;
}

export const GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsRewriterModelCallSignals: Schema.Schema<GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsRewriterModelCallSignals> = Schema.suspend(() => Schema.Struct({
  renderedPrompt: Schema.optional(Schema.String),
  modelOutput: Schema.optional(Schema.String),
  model: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsRewriterModelCallSignals" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsRewriterModelCallSignals>;

export interface GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsSearchSnippet {
  documentTitle?: string;
  documentUri?: string;
  text?: string;
  metadata?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsSearchSnippet: Schema.Schema<GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsSearchSnippet> = Schema.suspend(() => Schema.Struct({
  documentTitle: Schema.optional(Schema.String),
  documentUri: Schema.optional(Schema.String),
  text: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsSearchSnippet" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsSearchSnippet>;

export interface GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsAnswerGenerationModelCallSignals {
  renderedPrompt?: string;
  modelOutput?: string;
  model?: string;
}

export const GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsAnswerGenerationModelCallSignals: Schema.Schema<GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsAnswerGenerationModelCallSignals> = Schema.suspend(() => Schema.Struct({
  renderedPrompt: Schema.optional(Schema.String),
  modelOutput: Schema.optional(Schema.String),
  model: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsAnswerGenerationModelCallSignals" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsAnswerGenerationModelCallSignals>;

export interface GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsAnswerPart {
  text?: string;
  supportingIndices?: Array<number>;
}

export const GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsAnswerPart: Schema.Schema<GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsAnswerPart> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  supportingIndices: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsAnswerPart" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsAnswerPart>;

export interface GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsCitedSnippet {
  searchSnippet?: GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsSearchSnippet;
  snippetIndex?: number;
}

export const GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsCitedSnippet: Schema.Schema<GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsCitedSnippet> = Schema.suspend(() => Schema.Struct({
  searchSnippet: Schema.optional(GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsSearchSnippet),
  snippetIndex: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsCitedSnippet" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsCitedSnippet>;

export interface GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsGroundingSignals {
  decision?: "GROUNDING_DECISION_UNSPECIFIED" | "ACCEPTED_BY_GROUNDING" | "REJECTED_BY_GROUNDING" | (string & {});
  score?: "GROUNDING_SCORE_BUCKET_UNSPECIFIED" | "VERY_LOW" | "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH" | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsGroundingSignals: Schema.Schema<GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsGroundingSignals> = Schema.suspend(() => Schema.Struct({
  decision: Schema.optional(Schema.String),
  score: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsGroundingSignals" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsGroundingSignals>;

export interface GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsSafetySignals {
  decision?: "SAFETY_DECISION_UNSPECIFIED" | "ACCEPTED_BY_SAFETY_CHECK" | "REJECTED_BY_SAFETY_CHECK" | (string & {});
  bannedPhraseMatch?: "BANNED_PHRASE_MATCH_UNSPECIFIED" | "BANNED_PHRASE_MATCH_NONE" | "BANNED_PHRASE_MATCH_QUERY" | "BANNED_PHRASE_MATCH_RESPONSE" | (string & {});
  matchedBannedPhrase?: string;
}

export const GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsSafetySignals: Schema.Schema<GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsSafetySignals> = Schema.suspend(() => Schema.Struct({
  decision: Schema.optional(Schema.String),
  bannedPhraseMatch: Schema.optional(Schema.String),
  matchedBannedPhrase: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsSafetySignals" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsSafetySignals>;

export interface GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignals {
  rewriterModelCallSignals?: GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsRewriterModelCallSignals;
  rewrittenQuery?: string;
  searchSnippets?: Array<GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsSearchSnippet>;
  answerGenerationModelCallSignals?: GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsAnswerGenerationModelCallSignals;
  answer?: string;
  answerParts?: Array<GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsAnswerPart>;
  citedSnippets?: Array<GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsCitedSnippet>;
  groundingSignals?: GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsGroundingSignals;
  safetySignals?: GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsSafetySignals;
}

export const GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignals: Schema.Schema<GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignals> = Schema.suspend(() => Schema.Struct({
  rewriterModelCallSignals: Schema.optional(GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsRewriterModelCallSignals),
  rewrittenQuery: Schema.optional(Schema.String),
  searchSnippets: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsSearchSnippet)),
  answerGenerationModelCallSignals: Schema.optional(GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsAnswerGenerationModelCallSignals),
  answer: Schema.optional(Schema.String),
  answerParts: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsAnswerPart)),
  citedSnippets: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsCitedSnippet)),
  groundingSignals: Schema.optional(GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsGroundingSignals),
  safetySignals: Schema.optional(GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignalsSafetySignals),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignals" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignals>;

export interface GoogleCloudDialogflowCxV3beta1ToolUseDataStoreToolTrace {
  dataStoreConnectionSignals?: GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignals;
}

export const GoogleCloudDialogflowCxV3beta1ToolUseDataStoreToolTrace: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolUseDataStoreToolTrace> = Schema.suspend(() => Schema.Struct({
  dataStoreConnectionSignals: Schema.optional(GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignals),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolUseDataStoreToolTrace" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolUseDataStoreToolTrace>;

export interface GoogleCloudDialogflowCxV3beta1ToolUseWebhookToolTrace {
  webhookTag?: string;
  webhookUri?: string;
}

export const GoogleCloudDialogflowCxV3beta1ToolUseWebhookToolTrace: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolUseWebhookToolTrace> = Schema.suspend(() => Schema.Struct({
  webhookTag: Schema.optional(Schema.String),
  webhookUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolUseWebhookToolTrace" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolUseWebhookToolTrace>;

export interface GoogleCloudDialogflowCxV3beta1ToolUse {
  tool?: string;
  displayName?: string;
  action?: string;
  inputActionParameters?: Record<string, unknown>;
  outputActionParameters?: Record<string, unknown>;
  dataStoreToolTrace?: GoogleCloudDialogflowCxV3beta1ToolUseDataStoreToolTrace;
  webhookToolTrace?: GoogleCloudDialogflowCxV3beta1ToolUseWebhookToolTrace;
}

export const GoogleCloudDialogflowCxV3beta1ToolUse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolUse> = Schema.suspend(() => Schema.Struct({
  tool: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  action: Schema.optional(Schema.String),
  inputActionParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  outputActionParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  dataStoreToolTrace: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolUseDataStoreToolTrace),
  webhookToolTrace: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolUseWebhookToolTrace),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolUse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolUse>;

export interface GoogleCloudDialogflowCxV3beta1LlmCallRetrievedExample {
  exampleId?: string;
  exampleDisplayName?: string;
  retrievalStrategy?: "RETRIEVAL_STRATEGY_UNSPECIFIED" | "DEFAULT" | "STATIC" | "NEVER" | (string & {});
  matchedRetrievalLabel?: string;
}

export const GoogleCloudDialogflowCxV3beta1LlmCallRetrievedExample: Schema.Schema<GoogleCloudDialogflowCxV3beta1LlmCallRetrievedExample> = Schema.suspend(() => Schema.Struct({
  exampleId: Schema.optional(Schema.String),
  exampleDisplayName: Schema.optional(Schema.String),
  retrievalStrategy: Schema.optional(Schema.String),
  matchedRetrievalLabel: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1LlmCallRetrievedExample" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1LlmCallRetrievedExample>;

export interface GoogleCloudDialogflowCxV3beta1LlmCallTokenCount {
  totalInputTokenCount?: string;
  conversationContextTokenCount?: string;
  exampleTokenCount?: string;
  totalOutputTokenCount?: string;
}

export const GoogleCloudDialogflowCxV3beta1LlmCallTokenCount: Schema.Schema<GoogleCloudDialogflowCxV3beta1LlmCallTokenCount> = Schema.suspend(() => Schema.Struct({
  totalInputTokenCount: Schema.optional(Schema.String),
  conversationContextTokenCount: Schema.optional(Schema.String),
  exampleTokenCount: Schema.optional(Schema.String),
  totalOutputTokenCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1LlmCallTokenCount" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1LlmCallTokenCount>;

export interface GoogleCloudDialogflowCxV3beta1LlmCall {
  retrievedExamples?: Array<GoogleCloudDialogflowCxV3beta1LlmCallRetrievedExample>;
  tokenCount?: GoogleCloudDialogflowCxV3beta1LlmCallTokenCount;
  model?: string;
  temperature?: number;
}

export const GoogleCloudDialogflowCxV3beta1LlmCall: Schema.Schema<GoogleCloudDialogflowCxV3beta1LlmCall> = Schema.suspend(() => Schema.Struct({
  retrievedExamples: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1LlmCallRetrievedExample)),
  tokenCount: Schema.optional(GoogleCloudDialogflowCxV3beta1LlmCallTokenCount),
  model: Schema.optional(Schema.String),
  temperature: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1LlmCall" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1LlmCall>;

export interface GoogleCloudDialogflowCxV3beta1ActionIntentMatchMatchedIntent {
  intentId?: string;
  displayName?: string;
  score?: number;
  generativeFallback?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3beta1ActionIntentMatchMatchedIntent: Schema.Schema<GoogleCloudDialogflowCxV3beta1ActionIntentMatchMatchedIntent> = Schema.suspend(() => Schema.Struct({
  intentId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  score: Schema.optional(Schema.Number),
  generativeFallback: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ActionIntentMatchMatchedIntent" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ActionIntentMatchMatchedIntent>;

export interface GoogleCloudDialogflowCxV3beta1ActionIntentMatch {
  matchedIntents?: Array<GoogleCloudDialogflowCxV3beta1ActionIntentMatchMatchedIntent>;
}

export const GoogleCloudDialogflowCxV3beta1ActionIntentMatch: Schema.Schema<GoogleCloudDialogflowCxV3beta1ActionIntentMatch> = Schema.suspend(() => Schema.Struct({
  matchedIntents: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ActionIntentMatchMatchedIntent)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ActionIntentMatch" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ActionIntentMatch>;

export interface GoogleCloudDialogflowCxV3beta1ActionFlowStateUpdatePageState {
  page?: string;
  displayName?: string;
  status?: string;
}

export const GoogleCloudDialogflowCxV3beta1ActionFlowStateUpdatePageState: Schema.Schema<GoogleCloudDialogflowCxV3beta1ActionFlowStateUpdatePageState> = Schema.suspend(() => Schema.Struct({
  page: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ActionFlowStateUpdatePageState" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ActionFlowStateUpdatePageState>;

export interface GoogleCloudDialogflowCxV3beta1ActionFlowStateUpdateFunctionCall {
  name?: string;
}

export const GoogleCloudDialogflowCxV3beta1ActionFlowStateUpdateFunctionCall: Schema.Schema<GoogleCloudDialogflowCxV3beta1ActionFlowStateUpdateFunctionCall> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ActionFlowStateUpdateFunctionCall" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ActionFlowStateUpdateFunctionCall>;

export interface GoogleCloudDialogflowCxV3beta1ActionFlowStateUpdate {
  eventType?: string;
  pageState?: GoogleCloudDialogflowCxV3beta1ActionFlowStateUpdatePageState;
  updatedParameters?: Record<string, unknown>;
  destination?: string;
  functionCall?: GoogleCloudDialogflowCxV3beta1ActionFlowStateUpdateFunctionCall;
}

export const GoogleCloudDialogflowCxV3beta1ActionFlowStateUpdate: Schema.Schema<GoogleCloudDialogflowCxV3beta1ActionFlowStateUpdate> = Schema.suspend(() => Schema.Struct({
  eventType: Schema.optional(Schema.String),
  pageState: Schema.optional(GoogleCloudDialogflowCxV3beta1ActionFlowStateUpdatePageState),
  updatedParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  destination: Schema.optional(Schema.String),
  functionCall: Schema.optional(GoogleCloudDialogflowCxV3beta1ActionFlowStateUpdateFunctionCall),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ActionFlowStateUpdate" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ActionFlowStateUpdate>;

export interface GoogleCloudDialogflowCxV3beta1PlaybookInvocation {
  playbook?: string;
  displayName?: string;
  playbookInput?: GoogleCloudDialogflowCxV3beta1PlaybookInput;
  playbookOutput?: GoogleCloudDialogflowCxV3beta1PlaybookOutput;
  playbookState?: "OUTPUT_STATE_UNSPECIFIED" | "OUTPUT_STATE_OK" | "OUTPUT_STATE_CANCELLED" | "OUTPUT_STATE_FAILED" | "OUTPUT_STATE_ESCALATED" | "OUTPUT_STATE_PENDING" | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1PlaybookInvocation: Schema.Schema<GoogleCloudDialogflowCxV3beta1PlaybookInvocation> = Schema.suspend(() => Schema.Struct({
  playbook: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  playbookInput: Schema.optional(GoogleCloudDialogflowCxV3beta1PlaybookInput),
  playbookOutput: Schema.optional(GoogleCloudDialogflowCxV3beta1PlaybookOutput),
  playbookState: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1PlaybookInvocation" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1PlaybookInvocation>;

export interface GoogleCloudDialogflowCxV3beta1FlowInvocation {
  flow?: string;
  displayName?: string;
  inputActionParameters?: Record<string, unknown>;
  outputActionParameters?: Record<string, unknown>;
  flowState?: "OUTPUT_STATE_UNSPECIFIED" | "OUTPUT_STATE_OK" | "OUTPUT_STATE_CANCELLED" | "OUTPUT_STATE_FAILED" | "OUTPUT_STATE_ESCALATED" | "OUTPUT_STATE_PENDING" | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1FlowInvocation: Schema.Schema<GoogleCloudDialogflowCxV3beta1FlowInvocation> = Schema.suspend(() => Schema.Struct({
  flow: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  inputActionParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  outputActionParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  flowState: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1FlowInvocation" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1FlowInvocation>;

export interface GoogleCloudDialogflowCxV3beta1PlaybookTransition {
  playbook?: string;
  displayName?: string;
  inputActionParameters?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3beta1PlaybookTransition: Schema.Schema<GoogleCloudDialogflowCxV3beta1PlaybookTransition> = Schema.suspend(() => Schema.Struct({
  playbook: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  inputActionParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1PlaybookTransition" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1PlaybookTransition>;

export interface GoogleCloudDialogflowCxV3beta1FlowTransition {
  flow?: string;
  displayName?: string;
  inputActionParameters?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3beta1FlowTransition: Schema.Schema<GoogleCloudDialogflowCxV3beta1FlowTransition> = Schema.suspend(() => Schema.Struct({
  flow: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  inputActionParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1FlowTransition" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1FlowTransition>;

export interface GoogleCloudDialogflowCxV3beta1ActionTTS {
}

export const GoogleCloudDialogflowCxV3beta1ActionTTS: Schema.Schema<GoogleCloudDialogflowCxV3beta1ActionTTS> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ActionTTS" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ActionTTS>;

export interface GoogleCloudDialogflowCxV3beta1ActionSTT {
}

export const GoogleCloudDialogflowCxV3beta1ActionSTT: Schema.Schema<GoogleCloudDialogflowCxV3beta1ActionSTT> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ActionSTT" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ActionSTT>;

export interface GoogleCloudDialogflowCxV3beta1NamedMetric {
  name?: string;
  value?: unknown;
  unit?: string;
}

export const GoogleCloudDialogflowCxV3beta1NamedMetric: Schema.Schema<GoogleCloudDialogflowCxV3beta1NamedMetric> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Unknown),
  unit: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1NamedMetric" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1NamedMetric>;

export interface GoogleCloudDialogflowCxV3beta1Span {
  name?: string;
  tags?: Array<string>;
  metrics?: Array<GoogleCloudDialogflowCxV3beta1NamedMetric>;
  startTime?: string;
  completeTime?: string;
}

export const GoogleCloudDialogflowCxV3beta1Span: Schema.Schema<GoogleCloudDialogflowCxV3beta1Span> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Array(Schema.String)),
  metrics: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1NamedMetric)),
  startTime: Schema.optional(Schema.String),
  completeTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Span" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Span>;

export interface GoogleCloudDialogflowCxV3beta1ExceptionDetail {
  errorMessage?: string;
}

export const GoogleCloudDialogflowCxV3beta1ExceptionDetail: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExceptionDetail> = Schema.suspend(() => Schema.Struct({
  errorMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExceptionDetail" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExceptionDetail>;

export interface GoogleCloudDialogflowCxV3beta1Status {
  exception?: GoogleCloudDialogflowCxV3beta1ExceptionDetail;
}

export const GoogleCloudDialogflowCxV3beta1Status: Schema.Schema<GoogleCloudDialogflowCxV3beta1Status> = Schema.suspend(() => Schema.Struct({
  exception: Schema.optional(GoogleCloudDialogflowCxV3beta1ExceptionDetail),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Status" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Status>;

export interface GoogleCloudDialogflowCxV3beta1Action {
  userUtterance?: GoogleCloudDialogflowCxV3beta1UserUtterance;
  event?: GoogleCloudDialogflowCxV3beta1Event;
  agentUtterance?: GoogleCloudDialogflowCxV3beta1AgentUtterance;
  toolUse?: GoogleCloudDialogflowCxV3beta1ToolUse;
  llmCall?: GoogleCloudDialogflowCxV3beta1LlmCall;
  intentMatch?: GoogleCloudDialogflowCxV3beta1ActionIntentMatch;
  flowStateUpdate?: GoogleCloudDialogflowCxV3beta1ActionFlowStateUpdate;
  playbookInvocation?: GoogleCloudDialogflowCxV3beta1PlaybookInvocation;
  flowInvocation?: GoogleCloudDialogflowCxV3beta1FlowInvocation;
  playbookTransition?: GoogleCloudDialogflowCxV3beta1PlaybookTransition;
  flowTransition?: GoogleCloudDialogflowCxV3beta1FlowTransition;
  tts?: GoogleCloudDialogflowCxV3beta1ActionTTS;
  stt?: GoogleCloudDialogflowCxV3beta1ActionSTT;
  displayName?: string;
  startTime?: string;
  completeTime?: string;
  subExecutionSteps?: Array<GoogleCloudDialogflowCxV3beta1Span>;
  status?: GoogleCloudDialogflowCxV3beta1Status;
}

export const GoogleCloudDialogflowCxV3beta1Action: Schema.Schema<GoogleCloudDialogflowCxV3beta1Action> = Schema.suspend(() => Schema.Struct({
  userUtterance: Schema.optional(GoogleCloudDialogflowCxV3beta1UserUtterance),
  event: Schema.optional(GoogleCloudDialogflowCxV3beta1Event),
  agentUtterance: Schema.optional(GoogleCloudDialogflowCxV3beta1AgentUtterance),
  toolUse: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolUse),
  llmCall: Schema.optional(GoogleCloudDialogflowCxV3beta1LlmCall),
  intentMatch: Schema.optional(GoogleCloudDialogflowCxV3beta1ActionIntentMatch),
  flowStateUpdate: Schema.optional(GoogleCloudDialogflowCxV3beta1ActionFlowStateUpdate),
  playbookInvocation: Schema.optional(GoogleCloudDialogflowCxV3beta1PlaybookInvocation),
  flowInvocation: Schema.optional(GoogleCloudDialogflowCxV3beta1FlowInvocation),
  playbookTransition: Schema.optional(GoogleCloudDialogflowCxV3beta1PlaybookTransition),
  flowTransition: Schema.optional(GoogleCloudDialogflowCxV3beta1FlowTransition),
  tts: Schema.optional(GoogleCloudDialogflowCxV3beta1ActionTTS),
  stt: Schema.optional(GoogleCloudDialogflowCxV3beta1ActionSTT),
  displayName: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  completeTime: Schema.optional(Schema.String),
  subExecutionSteps: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1Span)),
  status: Schema.optional(GoogleCloudDialogflowCxV3beta1Status),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Action" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Action>;

export interface GoogleCloudDialogflowCxV3beta1Example {
  name?: string;
  playbookInput?: GoogleCloudDialogflowCxV3beta1PlaybookInput;
  playbookOutput?: GoogleCloudDialogflowCxV3beta1PlaybookOutput;
  actions?: Array<GoogleCloudDialogflowCxV3beta1Action>;
  displayName?: string;
  description?: string;
  tokenCount?: string;
  createTime?: string;
  updateTime?: string;
  conversationState?: "OUTPUT_STATE_UNSPECIFIED" | "OUTPUT_STATE_OK" | "OUTPUT_STATE_CANCELLED" | "OUTPUT_STATE_FAILED" | "OUTPUT_STATE_ESCALATED" | "OUTPUT_STATE_PENDING" | (string & {});
  languageCode?: string;
}

export const GoogleCloudDialogflowCxV3beta1Example: Schema.Schema<GoogleCloudDialogflowCxV3beta1Example> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  playbookInput: Schema.optional(GoogleCloudDialogflowCxV3beta1PlaybookInput),
  playbookOutput: Schema.optional(GoogleCloudDialogflowCxV3beta1PlaybookOutput),
  actions: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1Action)),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  tokenCount: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  conversationState: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Example" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Example>;

export interface GoogleCloudDialogflowCxV3beta1ListExamplesResponse {
  examples?: Array<GoogleCloudDialogflowCxV3beta1Example>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3beta1ListExamplesResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ListExamplesResponse> = Schema.suspend(() => Schema.Struct({
  examples: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1Example)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ListExamplesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ListExamplesResponse>;

export interface GoogleCloudDialogflowCxV3beta1EntityTypeEntity {
  value?: string;
  synonyms?: Array<string>;
}

export const GoogleCloudDialogflowCxV3beta1EntityTypeEntity: Schema.Schema<GoogleCloudDialogflowCxV3beta1EntityTypeEntity> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  synonyms: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1EntityTypeEntity" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1EntityTypeEntity>;

export interface GoogleCloudDialogflowCxV3beta1EntityTypeExcludedPhrase {
  value?: string;
}

export const GoogleCloudDialogflowCxV3beta1EntityTypeExcludedPhrase: Schema.Schema<GoogleCloudDialogflowCxV3beta1EntityTypeExcludedPhrase> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1EntityTypeExcludedPhrase" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1EntityTypeExcludedPhrase>;

export interface GoogleCloudDialogflowCxV3beta1EntityType {
  name?: string;
  displayName?: string;
  kind?: "KIND_UNSPECIFIED" | "KIND_MAP" | "KIND_LIST" | "KIND_REGEXP" | (string & {});
  autoExpansionMode?: "AUTO_EXPANSION_MODE_UNSPECIFIED" | "AUTO_EXPANSION_MODE_DEFAULT" | (string & {});
  entities?: Array<GoogleCloudDialogflowCxV3beta1EntityTypeEntity>;
  excludedPhrases?: Array<GoogleCloudDialogflowCxV3beta1EntityTypeExcludedPhrase>;
  enableFuzzyExtraction?: boolean;
  redact?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1EntityType: Schema.Schema<GoogleCloudDialogflowCxV3beta1EntityType> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  autoExpansionMode: Schema.optional(Schema.String),
  entities: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1EntityTypeEntity)),
  excludedPhrases: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1EntityTypeExcludedPhrase)),
  enableFuzzyExtraction: Schema.optional(Schema.Boolean),
  redact: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1EntityType" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1EntityType>;

export interface GoogleCloudDialogflowCxV3beta1ListEntityTypesResponse {
  entityTypes?: Array<GoogleCloudDialogflowCxV3beta1EntityType>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3beta1ListEntityTypesResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ListEntityTypesResponse> = Schema.suspend(() => Schema.Struct({
  entityTypes: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1EntityType)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ListEntityTypesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ListEntityTypesResponse>;

export interface GoogleCloudDialogflowCxV3beta1ExportEntityTypesRequest {
  entityTypes?: Array<string>;
  entityTypesUri?: string;
  entityTypesContentInline?: boolean;
  dataFormat?: "DATA_FORMAT_UNSPECIFIED" | "BLOB" | "JSON_PACKAGE" | (string & {});
  languageCode?: string;
}

export const GoogleCloudDialogflowCxV3beta1ExportEntityTypesRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportEntityTypesRequest> = Schema.suspend(() => Schema.Struct({
  entityTypes: Schema.optional(Schema.Array(Schema.String)),
  entityTypesUri: Schema.optional(Schema.String),
  entityTypesContentInline: Schema.optional(Schema.Boolean),
  dataFormat: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExportEntityTypesRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportEntityTypesRequest>;

export interface GoogleCloudDialogflowCxV3beta1ImportEntityTypesRequest {
  entityTypesUri?: string;
  entityTypesContent?: GoogleCloudDialogflowCxV3beta1InlineSource;
  mergeOption?: "MERGE_OPTION_UNSPECIFIED" | "REPLACE" | "MERGE" | "RENAME" | "REPORT_CONFLICT" | "KEEP" | (string & {});
  targetEntityType?: string;
}

export const GoogleCloudDialogflowCxV3beta1ImportEntityTypesRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportEntityTypesRequest> = Schema.suspend(() => Schema.Struct({
  entityTypesUri: Schema.optional(Schema.String),
  entityTypesContent: Schema.optional(GoogleCloudDialogflowCxV3beta1InlineSource),
  mergeOption: Schema.optional(Schema.String),
  targetEntityType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ImportEntityTypesRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportEntityTypesRequest>;

export interface GoogleCloudDialogflowCxV3beta1SessionEntityType {
  name?: string;
  entityOverrideMode?: "ENTITY_OVERRIDE_MODE_UNSPECIFIED" | "ENTITY_OVERRIDE_MODE_OVERRIDE" | "ENTITY_OVERRIDE_MODE_SUPPLEMENT" | (string & {});
  entities?: Array<GoogleCloudDialogflowCxV3beta1EntityTypeEntity>;
}

export const GoogleCloudDialogflowCxV3beta1SessionEntityType: Schema.Schema<GoogleCloudDialogflowCxV3beta1SessionEntityType> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  entityOverrideMode: Schema.optional(Schema.String),
  entities: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1EntityTypeEntity)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1SessionEntityType" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1SessionEntityType>;

export interface GoogleCloudDialogflowCxV3beta1ListSessionEntityTypesResponse {
  sessionEntityTypes?: Array<GoogleCloudDialogflowCxV3beta1SessionEntityType>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3beta1ListSessionEntityTypesResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ListSessionEntityTypesResponse> = Schema.suspend(() => Schema.Struct({
  sessionEntityTypes: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1SessionEntityType)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ListSessionEntityTypesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ListSessionEntityTypesResponse>;

export interface GoogleTypeLatLng {
  latitude?: number;
  longitude?: number;
}

export const GoogleTypeLatLng: Schema.Schema<GoogleTypeLatLng> = Schema.suspend(() => Schema.Struct({
  latitude: Schema.optional(Schema.Number),
  longitude: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleTypeLatLng" }) as any as Schema.Schema<GoogleTypeLatLng>;

export interface GoogleCloudDialogflowCxV3beta1BoostSpecConditionBoostSpecBoostControlSpecControlPoint {
  attributeValue?: string;
  boostAmount?: number;
}

export const GoogleCloudDialogflowCxV3beta1BoostSpecConditionBoostSpecBoostControlSpecControlPoint: Schema.Schema<GoogleCloudDialogflowCxV3beta1BoostSpecConditionBoostSpecBoostControlSpecControlPoint> = Schema.suspend(() => Schema.Struct({
  attributeValue: Schema.optional(Schema.String),
  boostAmount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1BoostSpecConditionBoostSpecBoostControlSpecControlPoint" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1BoostSpecConditionBoostSpecBoostControlSpecControlPoint>;

export interface GoogleCloudDialogflowCxV3beta1BoostSpecConditionBoostSpecBoostControlSpec {
  fieldName?: string;
  attributeType?: "ATTRIBUTE_TYPE_UNSPECIFIED" | "NUMERICAL" | "FRESHNESS" | (string & {});
  interpolationType?: "INTERPOLATION_TYPE_UNSPECIFIED" | "LINEAR" | (string & {});
  controlPoints?: Array<GoogleCloudDialogflowCxV3beta1BoostSpecConditionBoostSpecBoostControlSpecControlPoint>;
}

export const GoogleCloudDialogflowCxV3beta1BoostSpecConditionBoostSpecBoostControlSpec: Schema.Schema<GoogleCloudDialogflowCxV3beta1BoostSpecConditionBoostSpecBoostControlSpec> = Schema.suspend(() => Schema.Struct({
  fieldName: Schema.optional(Schema.String),
  attributeType: Schema.optional(Schema.String),
  interpolationType: Schema.optional(Schema.String),
  controlPoints: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1BoostSpecConditionBoostSpecBoostControlSpecControlPoint)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1BoostSpecConditionBoostSpecBoostControlSpec" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1BoostSpecConditionBoostSpecBoostControlSpec>;

export interface GoogleCloudDialogflowCxV3beta1BoostSpecConditionBoostSpec {
  condition?: string;
  boost?: number;
  boostControlSpec?: GoogleCloudDialogflowCxV3beta1BoostSpecConditionBoostSpecBoostControlSpec;
}

export const GoogleCloudDialogflowCxV3beta1BoostSpecConditionBoostSpec: Schema.Schema<GoogleCloudDialogflowCxV3beta1BoostSpecConditionBoostSpec> = Schema.suspend(() => Schema.Struct({
  condition: Schema.optional(Schema.String),
  boost: Schema.optional(Schema.Number),
  boostControlSpec: Schema.optional(GoogleCloudDialogflowCxV3beta1BoostSpecConditionBoostSpecBoostControlSpec),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1BoostSpecConditionBoostSpec" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1BoostSpecConditionBoostSpec>;

export interface GoogleCloudDialogflowCxV3beta1BoostSpec {
  conditionBoostSpecs?: Array<GoogleCloudDialogflowCxV3beta1BoostSpecConditionBoostSpec>;
}

export const GoogleCloudDialogflowCxV3beta1BoostSpec: Schema.Schema<GoogleCloudDialogflowCxV3beta1BoostSpec> = Schema.suspend(() => Schema.Struct({
  conditionBoostSpecs: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1BoostSpecConditionBoostSpec)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1BoostSpec" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1BoostSpec>;

export interface GoogleCloudDialogflowCxV3beta1BoostSpecs {
  dataStores?: Array<string>;
  spec?: Array<GoogleCloudDialogflowCxV3beta1BoostSpec>;
}

export const GoogleCloudDialogflowCxV3beta1BoostSpecs: Schema.Schema<GoogleCloudDialogflowCxV3beta1BoostSpecs> = Schema.suspend(() => Schema.Struct({
  dataStores: Schema.optional(Schema.Array(Schema.String)),
  spec: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1BoostSpec)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1BoostSpecs" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1BoostSpecs>;

export interface GoogleCloudDialogflowCxV3beta1FilterSpecs {
  dataStores?: Array<string>;
  filter?: string;
}

export const GoogleCloudDialogflowCxV3beta1FilterSpecs: Schema.Schema<GoogleCloudDialogflowCxV3beta1FilterSpecs> = Schema.suspend(() => Schema.Struct({
  dataStores: Schema.optional(Schema.Array(Schema.String)),
  filter: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1FilterSpecs" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1FilterSpecs>;

export interface GoogleCloudDialogflowCxV3beta1SearchConfig {
  boostSpecs?: Array<GoogleCloudDialogflowCxV3beta1BoostSpecs>;
  filterSpecs?: Array<GoogleCloudDialogflowCxV3beta1FilterSpecs>;
}

export const GoogleCloudDialogflowCxV3beta1SearchConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1SearchConfig> = Schema.suspend(() => Schema.Struct({
  boostSpecs: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1BoostSpecs)),
  filterSpecs: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1FilterSpecs)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1SearchConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1SearchConfig>;

export interface GoogleCloudDialogflowCxV3beta1QueryParameters {
  timeZone?: string;
  geoLocation?: GoogleTypeLatLng;
  sessionEntityTypes?: Array<GoogleCloudDialogflowCxV3beta1SessionEntityType>;
  payload?: Record<string, unknown>;
  parameters?: Record<string, unknown>;
  parameterScope?: string;
  currentPage?: string;
  disableWebhook?: boolean;
  analyzeQueryTextSentiment?: boolean;
  webhookHeaders?: Record<string, string>;
  flowVersions?: Array<string>;
  currentPlaybook?: string;
  llmModelSettings?: GoogleCloudDialogflowCxV3beta1LlmModelSettings;
  channel?: string;
  sessionTtl?: string;
  endUserMetadata?: Record<string, unknown>;
  searchConfig?: GoogleCloudDialogflowCxV3beta1SearchConfig;
  populateDataStoreConnectionSignals?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1QueryParameters: Schema.Schema<GoogleCloudDialogflowCxV3beta1QueryParameters> = Schema.suspend(() => Schema.Struct({
  timeZone: Schema.optional(Schema.String),
  geoLocation: Schema.optional(GoogleTypeLatLng),
  sessionEntityTypes: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1SessionEntityType)),
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  parameterScope: Schema.optional(Schema.String),
  currentPage: Schema.optional(Schema.String),
  disableWebhook: Schema.optional(Schema.Boolean),
  analyzeQueryTextSentiment: Schema.optional(Schema.Boolean),
  webhookHeaders: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  flowVersions: Schema.optional(Schema.Array(Schema.String)),
  currentPlaybook: Schema.optional(Schema.String),
  llmModelSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1LlmModelSettings),
  channel: Schema.optional(Schema.String),
  sessionTtl: Schema.optional(Schema.String),
  endUserMetadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  searchConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1SearchConfig),
  populateDataStoreConnectionSignals: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1QueryParameters" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1QueryParameters>;

export interface GoogleCloudDialogflowCxV3beta1TextInput {
  text?: string;
}

export const GoogleCloudDialogflowCxV3beta1TextInput: Schema.Schema<GoogleCloudDialogflowCxV3beta1TextInput> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1TextInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TextInput>;

export interface GoogleCloudDialogflowCxV3beta1IntentInput {
  intent?: string;
}

export const GoogleCloudDialogflowCxV3beta1IntentInput: Schema.Schema<GoogleCloudDialogflowCxV3beta1IntentInput> = Schema.suspend(() => Schema.Struct({
  intent: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1IntentInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1IntentInput>;

export interface GoogleCloudDialogflowCxV3beta1BargeInConfig {
  noBargeInDuration?: string;
  totalDuration?: string;
}

export const GoogleCloudDialogflowCxV3beta1BargeInConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1BargeInConfig> = Schema.suspend(() => Schema.Struct({
  noBargeInDuration: Schema.optional(Schema.String),
  totalDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1BargeInConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1BargeInConfig>;

export interface GoogleCloudDialogflowCxV3beta1InputAudioConfig {
  audioEncoding?: "AUDIO_ENCODING_UNSPECIFIED" | "AUDIO_ENCODING_LINEAR_16" | "AUDIO_ENCODING_FLAC" | "AUDIO_ENCODING_MULAW" | "AUDIO_ENCODING_AMR" | "AUDIO_ENCODING_AMR_WB" | "AUDIO_ENCODING_OGG_OPUS" | "AUDIO_ENCODING_SPEEX_WITH_HEADER_BYTE" | "AUDIO_ENCODING_ALAW" | (string & {});
  sampleRateHertz?: number;
  enableWordInfo?: boolean;
  phraseHints?: Array<string>;
  model?: string;
  modelVariant?: "SPEECH_MODEL_VARIANT_UNSPECIFIED" | "USE_BEST_AVAILABLE" | "USE_STANDARD" | "USE_ENHANCED" | (string & {});
  singleUtterance?: boolean;
  bargeInConfig?: GoogleCloudDialogflowCxV3beta1BargeInConfig;
  optOutConformerModelMigration?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1InputAudioConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1InputAudioConfig> = Schema.suspend(() => Schema.Struct({
  audioEncoding: Schema.optional(Schema.String),
  sampleRateHertz: Schema.optional(Schema.Number),
  enableWordInfo: Schema.optional(Schema.Boolean),
  phraseHints: Schema.optional(Schema.Array(Schema.String)),
  model: Schema.optional(Schema.String),
  modelVariant: Schema.optional(Schema.String),
  singleUtterance: Schema.optional(Schema.Boolean),
  bargeInConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1BargeInConfig),
  optOutConformerModelMigration: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1InputAudioConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1InputAudioConfig>;

export interface GoogleCloudDialogflowCxV3beta1AudioInput {
  config?: GoogleCloudDialogflowCxV3beta1InputAudioConfig;
  audio?: string;
}

export const GoogleCloudDialogflowCxV3beta1AudioInput: Schema.Schema<GoogleCloudDialogflowCxV3beta1AudioInput> = Schema.suspend(() => Schema.Struct({
  config: Schema.optional(GoogleCloudDialogflowCxV3beta1InputAudioConfig),
  audio: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1AudioInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1AudioInput>;

export interface GoogleCloudDialogflowCxV3beta1EventInput {
  event?: string;
}

export const GoogleCloudDialogflowCxV3beta1EventInput: Schema.Schema<GoogleCloudDialogflowCxV3beta1EventInput> = Schema.suspend(() => Schema.Struct({
  event: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1EventInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1EventInput>;

export interface GoogleCloudDialogflowCxV3beta1DtmfInput {
  digits?: string;
  finishDigit?: string;
}

export const GoogleCloudDialogflowCxV3beta1DtmfInput: Schema.Schema<GoogleCloudDialogflowCxV3beta1DtmfInput> = Schema.suspend(() => Schema.Struct({
  digits: Schema.optional(Schema.String),
  finishDigit: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1DtmfInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1DtmfInput>;

export interface GoogleCloudDialogflowCxV3beta1ToolCallResultError {
  message?: string;
}

export const GoogleCloudDialogflowCxV3beta1ToolCallResultError: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolCallResultError> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolCallResultError" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolCallResultError>;

export interface GoogleCloudDialogflowCxV3beta1ToolCallResult {
  tool?: string;
  action?: string;
  error?: GoogleCloudDialogflowCxV3beta1ToolCallResultError;
  outputParameters?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3beta1ToolCallResult: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolCallResult> = Schema.suspend(() => Schema.Struct({
  tool: Schema.optional(Schema.String),
  action: Schema.optional(Schema.String),
  error: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolCallResultError),
  outputParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolCallResult" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolCallResult>;

export interface GoogleCloudDialogflowCxV3beta1QueryInput {
  text?: GoogleCloudDialogflowCxV3beta1TextInput;
  intent?: GoogleCloudDialogflowCxV3beta1IntentInput;
  audio?: GoogleCloudDialogflowCxV3beta1AudioInput;
  event?: GoogleCloudDialogflowCxV3beta1EventInput;
  dtmf?: GoogleCloudDialogflowCxV3beta1DtmfInput;
  toolCallResult?: GoogleCloudDialogflowCxV3beta1ToolCallResult;
  languageCode?: string;
}

export const GoogleCloudDialogflowCxV3beta1QueryInput: Schema.Schema<GoogleCloudDialogflowCxV3beta1QueryInput> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(GoogleCloudDialogflowCxV3beta1TextInput),
  intent: Schema.optional(GoogleCloudDialogflowCxV3beta1IntentInput),
  audio: Schema.optional(GoogleCloudDialogflowCxV3beta1AudioInput),
  event: Schema.optional(GoogleCloudDialogflowCxV3beta1EventInput),
  dtmf: Schema.optional(GoogleCloudDialogflowCxV3beta1DtmfInput),
  toolCallResult: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolCallResult),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1QueryInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1QueryInput>;

export interface GoogleCloudDialogflowCxV3beta1OutputAudioConfig {
  audioEncoding?: "OUTPUT_AUDIO_ENCODING_UNSPECIFIED" | "OUTPUT_AUDIO_ENCODING_LINEAR_16" | "OUTPUT_AUDIO_ENCODING_MP3" | "OUTPUT_AUDIO_ENCODING_MP3_64_KBPS" | "OUTPUT_AUDIO_ENCODING_OGG_OPUS" | "OUTPUT_AUDIO_ENCODING_MULAW" | "OUTPUT_AUDIO_ENCODING_ALAW" | (string & {});
  sampleRateHertz?: number;
  synthesizeSpeechConfig?: GoogleCloudDialogflowCxV3beta1SynthesizeSpeechConfig;
}

export const GoogleCloudDialogflowCxV3beta1OutputAudioConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1OutputAudioConfig> = Schema.suspend(() => Schema.Struct({
  audioEncoding: Schema.optional(Schema.String),
  sampleRateHertz: Schema.optional(Schema.Number),
  synthesizeSpeechConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1SynthesizeSpeechConfig),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1OutputAudioConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1OutputAudioConfig>;

export interface GoogleCloudDialogflowCxV3beta1DetectIntentRequest {
  session?: string;
  queryParams?: GoogleCloudDialogflowCxV3beta1QueryParameters;
  queryInput?: GoogleCloudDialogflowCxV3beta1QueryInput;
  outputAudioConfig?: GoogleCloudDialogflowCxV3beta1OutputAudioConfig;
  responseView?: "DETECT_INTENT_RESPONSE_VIEW_UNSPECIFIED" | "DETECT_INTENT_RESPONSE_VIEW_FULL" | "DETECT_INTENT_RESPONSE_VIEW_BASIC" | "DETECT_INTENT_RESPONSE_VIEW_DEFAULT" | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1DetectIntentRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1DetectIntentRequest> = Schema.suspend(() => Schema.Struct({
  session: Schema.optional(Schema.String),
  queryParams: Schema.optional(GoogleCloudDialogflowCxV3beta1QueryParameters),
  queryInput: Schema.optional(GoogleCloudDialogflowCxV3beta1QueryInput),
  outputAudioConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1OutputAudioConfig),
  responseView: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1DetectIntentRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1DetectIntentRequest>;

export interface GoogleCloudDialogflowCxV3beta1Match {
  intent?: GoogleCloudDialogflowCxV3beta1Intent;
  event?: string;
  parameters?: Record<string, unknown>;
  resolvedInput?: string;
  matchType?: "MATCH_TYPE_UNSPECIFIED" | "INTENT" | "DIRECT_INTENT" | "PARAMETER_FILLING" | "NO_MATCH" | "NO_INPUT" | "EVENT" | "KNOWLEDGE_CONNECTOR" | "PLAYBOOK" | (string & {});
  confidence?: number;
}

export const GoogleCloudDialogflowCxV3beta1Match: Schema.Schema<GoogleCloudDialogflowCxV3beta1Match> = Schema.suspend(() => Schema.Struct({
  intent: Schema.optional(GoogleCloudDialogflowCxV3beta1Intent),
  event: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  resolvedInput: Schema.optional(Schema.String),
  matchType: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Match" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Match>;

export interface GoogleCloudDialogflowCxV3beta1GenerativeInfo {
  currentPlaybooks?: Array<string>;
  actionTracingInfo?: GoogleCloudDialogflowCxV3beta1Example;
}

export const GoogleCloudDialogflowCxV3beta1GenerativeInfo: Schema.Schema<GoogleCloudDialogflowCxV3beta1GenerativeInfo> = Schema.suspend(() => Schema.Struct({
  currentPlaybooks: Schema.optional(Schema.Array(Schema.String)),
  actionTracingInfo: Schema.optional(GoogleCloudDialogflowCxV3beta1Example),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1GenerativeInfo" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1GenerativeInfo>;

export interface GoogleCloudDialogflowCxV3beta1SentimentAnalysisResult {
  score?: number;
  magnitude?: number;
}

export const GoogleCloudDialogflowCxV3beta1SentimentAnalysisResult: Schema.Schema<GoogleCloudDialogflowCxV3beta1SentimentAnalysisResult> = Schema.suspend(() => Schema.Struct({
  score: Schema.optional(Schema.Number),
  magnitude: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1SentimentAnalysisResult" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1SentimentAnalysisResult>;

export interface GoogleCloudDialogflowCxV3beta1QueryResult {
  text?: string;
  triggerIntent?: string;
  transcript?: string;
  triggerEvent?: string;
  dtmf?: GoogleCloudDialogflowCxV3beta1DtmfInput;
  languageCode?: string;
  parameters?: Record<string, unknown>;
  responseMessages?: Array<GoogleCloudDialogflowCxV3beta1ResponseMessage>;
  webhookIds?: Array<string>;
  webhookDisplayNames?: Array<string>;
  webhookLatencies?: Array<string>;
  webhookTags?: Array<string>;
  webhookStatuses?: Array<GoogleRpcStatus>;
  webhookPayloads?: Array<Record<string, unknown>>;
  currentPage?: GoogleCloudDialogflowCxV3beta1Page;
  currentFlow?: GoogleCloudDialogflowCxV3beta1Flow;
  intent?: GoogleCloudDialogflowCxV3beta1Intent;
  intentDetectionConfidence?: number;
  match?: GoogleCloudDialogflowCxV3beta1Match;
  diagnosticInfo?: Record<string, unknown>;
  generativeInfo?: GoogleCloudDialogflowCxV3beta1GenerativeInfo;
  sentimentAnalysisResult?: GoogleCloudDialogflowCxV3beta1SentimentAnalysisResult;
  advancedSettings?: GoogleCloudDialogflowCxV3beta1AdvancedSettings;
  allowAnswerFeedback?: boolean;
  dataStoreConnectionSignals?: GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignals;
}

export const GoogleCloudDialogflowCxV3beta1QueryResult: Schema.Schema<GoogleCloudDialogflowCxV3beta1QueryResult> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  triggerIntent: Schema.optional(Schema.String),
  transcript: Schema.optional(Schema.String),
  triggerEvent: Schema.optional(Schema.String),
  dtmf: Schema.optional(GoogleCloudDialogflowCxV3beta1DtmfInput),
  languageCode: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  responseMessages: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ResponseMessage)),
  webhookIds: Schema.optional(Schema.Array(Schema.String)),
  webhookDisplayNames: Schema.optional(Schema.Array(Schema.String)),
  webhookLatencies: Schema.optional(Schema.Array(Schema.String)),
  webhookTags: Schema.optional(Schema.Array(Schema.String)),
  webhookStatuses: Schema.optional(Schema.Array(GoogleRpcStatus)),
  webhookPayloads: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  currentPage: Schema.optional(GoogleCloudDialogflowCxV3beta1Page),
  currentFlow: Schema.optional(GoogleCloudDialogflowCxV3beta1Flow),
  intent: Schema.optional(GoogleCloudDialogflowCxV3beta1Intent),
  intentDetectionConfidence: Schema.optional(Schema.Number),
  match: Schema.optional(GoogleCloudDialogflowCxV3beta1Match),
  diagnosticInfo: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  generativeInfo: Schema.optional(GoogleCloudDialogflowCxV3beta1GenerativeInfo),
  sentimentAnalysisResult: Schema.optional(GoogleCloudDialogflowCxV3beta1SentimentAnalysisResult),
  advancedSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1AdvancedSettings),
  allowAnswerFeedback: Schema.optional(Schema.Boolean),
  dataStoreConnectionSignals: Schema.optional(GoogleCloudDialogflowCxV3beta1DataStoreConnectionSignals),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1QueryResult" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1QueryResult>;

export interface GoogleCloudDialogflowCxV3beta1DetectIntentResponse {
  responseId?: string;
  queryResult?: GoogleCloudDialogflowCxV3beta1QueryResult;
  outputAudio?: string;
  outputAudioConfig?: GoogleCloudDialogflowCxV3beta1OutputAudioConfig;
  responseType?: "RESPONSE_TYPE_UNSPECIFIED" | "PARTIAL" | "FINAL" | (string & {});
  allowCancellation?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1DetectIntentResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1DetectIntentResponse> = Schema.suspend(() => Schema.Struct({
  responseId: Schema.optional(Schema.String),
  queryResult: Schema.optional(GoogleCloudDialogflowCxV3beta1QueryResult),
  outputAudio: Schema.optional(Schema.String),
  outputAudioConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1OutputAudioConfig),
  responseType: Schema.optional(Schema.String),
  allowCancellation: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1DetectIntentResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1DetectIntentResponse>;

export interface GoogleCloudDialogflowCxV3beta1MatchIntentRequest {
  queryParams?: GoogleCloudDialogflowCxV3beta1QueryParameters;
  queryInput?: GoogleCloudDialogflowCxV3beta1QueryInput;
  persistParameterChanges?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1MatchIntentRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1MatchIntentRequest> = Schema.suspend(() => Schema.Struct({
  queryParams: Schema.optional(GoogleCloudDialogflowCxV3beta1QueryParameters),
  queryInput: Schema.optional(GoogleCloudDialogflowCxV3beta1QueryInput),
  persistParameterChanges: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1MatchIntentRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1MatchIntentRequest>;

export interface GoogleCloudDialogflowCxV3beta1MatchIntentResponse {
  text?: string;
  triggerIntent?: string;
  transcript?: string;
  triggerEvent?: string;
  matches?: Array<GoogleCloudDialogflowCxV3beta1Match>;
  currentPage?: GoogleCloudDialogflowCxV3beta1Page;
}

export const GoogleCloudDialogflowCxV3beta1MatchIntentResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1MatchIntentResponse> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  triggerIntent: Schema.optional(Schema.String),
  transcript: Schema.optional(Schema.String),
  triggerEvent: Schema.optional(Schema.String),
  matches: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1Match)),
  currentPage: Schema.optional(GoogleCloudDialogflowCxV3beta1Page),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1MatchIntentResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1MatchIntentResponse>;

export interface GoogleCloudDialogflowCxV3beta1FulfillIntentRequest {
  matchIntentRequest?: GoogleCloudDialogflowCxV3beta1MatchIntentRequest;
  match?: GoogleCloudDialogflowCxV3beta1Match;
  outputAudioConfig?: GoogleCloudDialogflowCxV3beta1OutputAudioConfig;
}

export const GoogleCloudDialogflowCxV3beta1FulfillIntentRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1FulfillIntentRequest> = Schema.suspend(() => Schema.Struct({
  matchIntentRequest: Schema.optional(GoogleCloudDialogflowCxV3beta1MatchIntentRequest),
  match: Schema.optional(GoogleCloudDialogflowCxV3beta1Match),
  outputAudioConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1OutputAudioConfig),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1FulfillIntentRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1FulfillIntentRequest>;

export interface GoogleCloudDialogflowCxV3beta1FulfillIntentResponse {
  responseId?: string;
  queryResult?: GoogleCloudDialogflowCxV3beta1QueryResult;
  outputAudio?: string;
  outputAudioConfig?: GoogleCloudDialogflowCxV3beta1OutputAudioConfig;
}

export const GoogleCloudDialogflowCxV3beta1FulfillIntentResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1FulfillIntentResponse> = Schema.suspend(() => Schema.Struct({
  responseId: Schema.optional(Schema.String),
  queryResult: Schema.optional(GoogleCloudDialogflowCxV3beta1QueryResult),
  outputAudio: Schema.optional(Schema.String),
  outputAudioConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1OutputAudioConfig),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1FulfillIntentResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1FulfillIntentResponse>;

export interface GoogleCloudDialogflowCxV3beta1AnswerFeedbackRatingReason {
  reasonLabels?: Array<string>;
  feedback?: string;
}

export const GoogleCloudDialogflowCxV3beta1AnswerFeedbackRatingReason: Schema.Schema<GoogleCloudDialogflowCxV3beta1AnswerFeedbackRatingReason> = Schema.suspend(() => Schema.Struct({
  reasonLabels: Schema.optional(Schema.Array(Schema.String)),
  feedback: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1AnswerFeedbackRatingReason" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1AnswerFeedbackRatingReason>;

export interface GoogleCloudDialogflowCxV3beta1AnswerFeedback {
  rating?: "RATING_UNSPECIFIED" | "THUMBS_UP" | "THUMBS_DOWN" | (string & {});
  ratingReason?: GoogleCloudDialogflowCxV3beta1AnswerFeedbackRatingReason;
  customRating?: string;
}

export const GoogleCloudDialogflowCxV3beta1AnswerFeedback: Schema.Schema<GoogleCloudDialogflowCxV3beta1AnswerFeedback> = Schema.suspend(() => Schema.Struct({
  rating: Schema.optional(Schema.String),
  ratingReason: Schema.optional(GoogleCloudDialogflowCxV3beta1AnswerFeedbackRatingReason),
  customRating: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1AnswerFeedback" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1AnswerFeedback>;

export interface GoogleCloudDialogflowCxV3beta1SubmitAnswerFeedbackRequest {
  responseId?: string;
  answerFeedback?: GoogleCloudDialogflowCxV3beta1AnswerFeedback;
  updateMask?: string;
}

export const GoogleCloudDialogflowCxV3beta1SubmitAnswerFeedbackRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1SubmitAnswerFeedbackRequest> = Schema.suspend(() => Schema.Struct({
  responseId: Schema.optional(Schema.String),
  answerFeedback: Schema.optional(GoogleCloudDialogflowCxV3beta1AnswerFeedback),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1SubmitAnswerFeedbackRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1SubmitAnswerFeedbackRequest>;

export interface GoogleCloudDialogflowCxV3beta1TransitionRouteGroup {
  name?: string;
  displayName?: string;
  transitionRoutes?: Array<GoogleCloudDialogflowCxV3beta1TransitionRoute>;
}

export const GoogleCloudDialogflowCxV3beta1TransitionRouteGroup: Schema.Schema<GoogleCloudDialogflowCxV3beta1TransitionRouteGroup> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  transitionRoutes: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1TransitionRoute)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1TransitionRouteGroup" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TransitionRouteGroup>;

export interface GoogleCloudDialogflowCxV3beta1ListTransitionRouteGroupsResponse {
  transitionRouteGroups?: Array<GoogleCloudDialogflowCxV3beta1TransitionRouteGroup>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3beta1ListTransitionRouteGroupsResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ListTransitionRouteGroupsResponse> = Schema.suspend(() => Schema.Struct({
  transitionRouteGroups: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1TransitionRouteGroup)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ListTransitionRouteGroupsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ListTransitionRouteGroupsResponse>;

export interface GoogleCloudDialogflowCxV3beta1TestConfig {
  trackingParameters?: Array<string>;
  flow?: string;
  page?: string;
}

export const GoogleCloudDialogflowCxV3beta1TestConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1TestConfig> = Schema.suspend(() => Schema.Struct({
  trackingParameters: Schema.optional(Schema.Array(Schema.String)),
  flow: Schema.optional(Schema.String),
  page: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1TestConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TestConfig>;

export interface GoogleCloudDialogflowCxV3beta1ConversationTurnUserInput {
  input?: GoogleCloudDialogflowCxV3beta1QueryInput;
  injectedParameters?: Record<string, unknown>;
  isWebhookEnabled?: boolean;
  enableSentimentAnalysis?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1ConversationTurnUserInput: Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationTurnUserInput> = Schema.suspend(() => Schema.Struct({
  input: Schema.optional(GoogleCloudDialogflowCxV3beta1QueryInput),
  injectedParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  isWebhookEnabled: Schema.optional(Schema.Boolean),
  enableSentimentAnalysis: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ConversationTurnUserInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationTurnUserInput>;

export interface GoogleCloudDialogflowCxV3beta1TestRunDifference {
  type?: "DIFF_TYPE_UNSPECIFIED" | "INTENT" | "PAGE" | "PARAMETERS" | "UTTERANCE" | "FLOW" | (string & {});
  description?: string;
}

export const GoogleCloudDialogflowCxV3beta1TestRunDifference: Schema.Schema<GoogleCloudDialogflowCxV3beta1TestRunDifference> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1TestRunDifference" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TestRunDifference>;

export interface GoogleCloudDialogflowCxV3beta1ConversationTurnVirtualAgentOutput {
  sessionParameters?: Record<string, unknown>;
  differences?: Array<GoogleCloudDialogflowCxV3beta1TestRunDifference>;
  diagnosticInfo?: Record<string, unknown>;
  triggeredIntent?: GoogleCloudDialogflowCxV3beta1Intent;
  currentPage?: GoogleCloudDialogflowCxV3beta1Page;
  textResponses?: Array<GoogleCloudDialogflowCxV3beta1ResponseMessageText>;
  status?: GoogleRpcStatus;
}

export const GoogleCloudDialogflowCxV3beta1ConversationTurnVirtualAgentOutput: Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationTurnVirtualAgentOutput> = Schema.suspend(() => Schema.Struct({
  sessionParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  differences: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1TestRunDifference)),
  diagnosticInfo: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  triggeredIntent: Schema.optional(GoogleCloudDialogflowCxV3beta1Intent),
  currentPage: Schema.optional(GoogleCloudDialogflowCxV3beta1Page),
  textResponses: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ResponseMessageText)),
  status: Schema.optional(GoogleRpcStatus),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ConversationTurnVirtualAgentOutput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationTurnVirtualAgentOutput>;

export interface GoogleCloudDialogflowCxV3beta1ConversationTurn {
  userInput?: GoogleCloudDialogflowCxV3beta1ConversationTurnUserInput;
  virtualAgentOutput?: GoogleCloudDialogflowCxV3beta1ConversationTurnVirtualAgentOutput;
}

export const GoogleCloudDialogflowCxV3beta1ConversationTurn: Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationTurn> = Schema.suspend(() => Schema.Struct({
  userInput: Schema.optional(GoogleCloudDialogflowCxV3beta1ConversationTurnUserInput),
  virtualAgentOutput: Schema.optional(GoogleCloudDialogflowCxV3beta1ConversationTurnVirtualAgentOutput),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ConversationTurn" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationTurn>;

export interface GoogleCloudDialogflowCxV3beta1TestCaseResult {
  name?: string;
  environment?: string;
  conversationTurns?: Array<GoogleCloudDialogflowCxV3beta1ConversationTurn>;
  testResult?: "TEST_RESULT_UNSPECIFIED" | "PASSED" | "FAILED" | (string & {});
  testTime?: string;
}

export const GoogleCloudDialogflowCxV3beta1TestCaseResult: Schema.Schema<GoogleCloudDialogflowCxV3beta1TestCaseResult> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  environment: Schema.optional(Schema.String),
  conversationTurns: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ConversationTurn)),
  testResult: Schema.optional(Schema.String),
  testTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1TestCaseResult" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TestCaseResult>;

export interface GoogleCloudDialogflowCxV3beta1TestCase {
  name?: string;
  tags?: Array<string>;
  displayName?: string;
  notes?: string;
  testConfig?: GoogleCloudDialogflowCxV3beta1TestConfig;
  testCaseConversationTurns?: Array<GoogleCloudDialogflowCxV3beta1ConversationTurn>;
  creationTime?: string;
  lastTestResult?: GoogleCloudDialogflowCxV3beta1TestCaseResult;
}

export const GoogleCloudDialogflowCxV3beta1TestCase: Schema.Schema<GoogleCloudDialogflowCxV3beta1TestCase> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Array(Schema.String)),
  displayName: Schema.optional(Schema.String),
  notes: Schema.optional(Schema.String),
  testConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1TestConfig),
  testCaseConversationTurns: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ConversationTurn)),
  creationTime: Schema.optional(Schema.String),
  lastTestResult: Schema.optional(GoogleCloudDialogflowCxV3beta1TestCaseResult),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1TestCase" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TestCase>;

export interface GoogleCloudDialogflowCxV3beta1ListTestCasesResponse {
  testCases?: Array<GoogleCloudDialogflowCxV3beta1TestCase>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3beta1ListTestCasesResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ListTestCasesResponse> = Schema.suspend(() => Schema.Struct({
  testCases: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1TestCase)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ListTestCasesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ListTestCasesResponse>;

export interface GoogleCloudDialogflowCxV3beta1BatchDeleteTestCasesRequest {
  names?: Array<string>;
}

export const GoogleCloudDialogflowCxV3beta1BatchDeleteTestCasesRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1BatchDeleteTestCasesRequest> = Schema.suspend(() => Schema.Struct({
  names: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1BatchDeleteTestCasesRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1BatchDeleteTestCasesRequest>;

export interface GoogleCloudDialogflowCxV3beta1RunTestCaseRequest {
  environment?: string;
}

export const GoogleCloudDialogflowCxV3beta1RunTestCaseRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1RunTestCaseRequest> = Schema.suspend(() => Schema.Struct({
  environment: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1RunTestCaseRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1RunTestCaseRequest>;

export interface GoogleCloudDialogflowCxV3beta1BatchRunTestCasesRequest {
  environment?: string;
  testCases?: Array<string>;
}

export const GoogleCloudDialogflowCxV3beta1BatchRunTestCasesRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1BatchRunTestCasesRequest> = Schema.suspend(() => Schema.Struct({
  environment: Schema.optional(Schema.String),
  testCases: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1BatchRunTestCasesRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1BatchRunTestCasesRequest>;

export interface GoogleCloudDialogflowCxV3beta1IntentCoverageIntent {
  intent?: string;
  covered?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1IntentCoverageIntent: Schema.Schema<GoogleCloudDialogflowCxV3beta1IntentCoverageIntent> = Schema.suspend(() => Schema.Struct({
  intent: Schema.optional(Schema.String),
  covered: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1IntentCoverageIntent" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1IntentCoverageIntent>;

export interface GoogleCloudDialogflowCxV3beta1IntentCoverage {
  intents?: Array<GoogleCloudDialogflowCxV3beta1IntentCoverageIntent>;
  coverageScore?: number;
}

export const GoogleCloudDialogflowCxV3beta1IntentCoverage: Schema.Schema<GoogleCloudDialogflowCxV3beta1IntentCoverage> = Schema.suspend(() => Schema.Struct({
  intents: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1IntentCoverageIntent)),
  coverageScore: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1IntentCoverage" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1IntentCoverage>;

export interface GoogleCloudDialogflowCxV3beta1TransitionCoverageTransitionNode {
  page?: GoogleCloudDialogflowCxV3beta1Page;
  flow?: GoogleCloudDialogflowCxV3beta1Flow;
}

export const GoogleCloudDialogflowCxV3beta1TransitionCoverageTransitionNode: Schema.Schema<GoogleCloudDialogflowCxV3beta1TransitionCoverageTransitionNode> = Schema.suspend(() => Schema.Struct({
  page: Schema.optional(GoogleCloudDialogflowCxV3beta1Page),
  flow: Schema.optional(GoogleCloudDialogflowCxV3beta1Flow),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1TransitionCoverageTransitionNode" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TransitionCoverageTransitionNode>;

export interface GoogleCloudDialogflowCxV3beta1TransitionCoverageTransition {
  source?: GoogleCloudDialogflowCxV3beta1TransitionCoverageTransitionNode;
  index?: number;
  target?: GoogleCloudDialogflowCxV3beta1TransitionCoverageTransitionNode;
  covered?: boolean;
  transitionRoute?: GoogleCloudDialogflowCxV3beta1TransitionRoute;
  eventHandler?: GoogleCloudDialogflowCxV3beta1EventHandler;
}

export const GoogleCloudDialogflowCxV3beta1TransitionCoverageTransition: Schema.Schema<GoogleCloudDialogflowCxV3beta1TransitionCoverageTransition> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(GoogleCloudDialogflowCxV3beta1TransitionCoverageTransitionNode),
  index: Schema.optional(Schema.Number),
  target: Schema.optional(GoogleCloudDialogflowCxV3beta1TransitionCoverageTransitionNode),
  covered: Schema.optional(Schema.Boolean),
  transitionRoute: Schema.optional(GoogleCloudDialogflowCxV3beta1TransitionRoute),
  eventHandler: Schema.optional(GoogleCloudDialogflowCxV3beta1EventHandler),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1TransitionCoverageTransition" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TransitionCoverageTransition>;

export interface GoogleCloudDialogflowCxV3beta1TransitionCoverage {
  transitions?: Array<GoogleCloudDialogflowCxV3beta1TransitionCoverageTransition>;
  coverageScore?: number;
}

export const GoogleCloudDialogflowCxV3beta1TransitionCoverage: Schema.Schema<GoogleCloudDialogflowCxV3beta1TransitionCoverage> = Schema.suspend(() => Schema.Struct({
  transitions: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1TransitionCoverageTransition)),
  coverageScore: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1TransitionCoverage" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TransitionCoverage>;

export interface GoogleCloudDialogflowCxV3beta1TransitionRouteGroupCoverageCoverageTransition {
  transitionRoute?: GoogleCloudDialogflowCxV3beta1TransitionRoute;
  covered?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1TransitionRouteGroupCoverageCoverageTransition: Schema.Schema<GoogleCloudDialogflowCxV3beta1TransitionRouteGroupCoverageCoverageTransition> = Schema.suspend(() => Schema.Struct({
  transitionRoute: Schema.optional(GoogleCloudDialogflowCxV3beta1TransitionRoute),
  covered: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1TransitionRouteGroupCoverageCoverageTransition" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TransitionRouteGroupCoverageCoverageTransition>;

export interface GoogleCloudDialogflowCxV3beta1TransitionRouteGroupCoverageCoverage {
  routeGroup?: GoogleCloudDialogflowCxV3beta1TransitionRouteGroup;
  transitions?: Array<GoogleCloudDialogflowCxV3beta1TransitionRouteGroupCoverageCoverageTransition>;
  coverageScore?: number;
}

export const GoogleCloudDialogflowCxV3beta1TransitionRouteGroupCoverageCoverage: Schema.Schema<GoogleCloudDialogflowCxV3beta1TransitionRouteGroupCoverageCoverage> = Schema.suspend(() => Schema.Struct({
  routeGroup: Schema.optional(GoogleCloudDialogflowCxV3beta1TransitionRouteGroup),
  transitions: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1TransitionRouteGroupCoverageCoverageTransition)),
  coverageScore: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1TransitionRouteGroupCoverageCoverage" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TransitionRouteGroupCoverageCoverage>;

export interface GoogleCloudDialogflowCxV3beta1TransitionRouteGroupCoverage {
  coverages?: Array<GoogleCloudDialogflowCxV3beta1TransitionRouteGroupCoverageCoverage>;
  coverageScore?: number;
}

export const GoogleCloudDialogflowCxV3beta1TransitionRouteGroupCoverage: Schema.Schema<GoogleCloudDialogflowCxV3beta1TransitionRouteGroupCoverage> = Schema.suspend(() => Schema.Struct({
  coverages: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1TransitionRouteGroupCoverageCoverage)),
  coverageScore: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1TransitionRouteGroupCoverage" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TransitionRouteGroupCoverage>;

export interface GoogleCloudDialogflowCxV3beta1CalculateCoverageResponse {
  agent?: string;
  intentCoverage?: GoogleCloudDialogflowCxV3beta1IntentCoverage;
  transitionCoverage?: GoogleCloudDialogflowCxV3beta1TransitionCoverage;
  routeGroupCoverage?: GoogleCloudDialogflowCxV3beta1TransitionRouteGroupCoverage;
}

export const GoogleCloudDialogflowCxV3beta1CalculateCoverageResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1CalculateCoverageResponse> = Schema.suspend(() => Schema.Struct({
  agent: Schema.optional(Schema.String),
  intentCoverage: Schema.optional(GoogleCloudDialogflowCxV3beta1IntentCoverage),
  transitionCoverage: Schema.optional(GoogleCloudDialogflowCxV3beta1TransitionCoverage),
  routeGroupCoverage: Schema.optional(GoogleCloudDialogflowCxV3beta1TransitionRouteGroupCoverage),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1CalculateCoverageResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1CalculateCoverageResponse>;

export interface GoogleCloudDialogflowCxV3beta1ImportTestCasesRequest {
  gcsUri?: string;
  content?: string;
}

export const GoogleCloudDialogflowCxV3beta1ImportTestCasesRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportTestCasesRequest> = Schema.suspend(() => Schema.Struct({
  gcsUri: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ImportTestCasesRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportTestCasesRequest>;

export interface GoogleCloudDialogflowCxV3beta1ExportTestCasesRequest {
  gcsUri?: string;
  dataFormat?: "DATA_FORMAT_UNSPECIFIED" | "BLOB" | "JSON" | (string & {});
  filter?: string;
}

export const GoogleCloudDialogflowCxV3beta1ExportTestCasesRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportTestCasesRequest> = Schema.suspend(() => Schema.Struct({
  gcsUri: Schema.optional(Schema.String),
  dataFormat: Schema.optional(Schema.String),
  filter: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExportTestCasesRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportTestCasesRequest>;

export interface GoogleCloudDialogflowCxV3beta1ListTestCaseResultsResponse {
  testCaseResults?: Array<GoogleCloudDialogflowCxV3beta1TestCaseResult>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3beta1ListTestCaseResultsResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ListTestCaseResultsResponse> = Schema.suspend(() => Schema.Struct({
  testCaseResults: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1TestCaseResult)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ListTestCaseResultsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ListTestCaseResultsResponse>;

export interface GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceSecretVersionHeaderValue {
  secretVersion?: string;
}

export const GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceSecretVersionHeaderValue: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceSecretVersionHeaderValue> = Schema.suspend(() => Schema.Struct({
  secretVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceSecretVersionHeaderValue" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceSecretVersionHeaderValue>;

export interface GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceOAuthConfig {
  clientId?: string;
  clientSecret?: string;
  secretVersionForClientSecret?: string;
  tokenEndpoint?: string;
  scopes?: Array<string>;
}

export const GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceOAuthConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceOAuthConfig> = Schema.suspend(() => Schema.Struct({
  clientId: Schema.optional(Schema.String),
  clientSecret: Schema.optional(Schema.String),
  secretVersionForClientSecret: Schema.optional(Schema.String),
  tokenEndpoint: Schema.optional(Schema.String),
  scopes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceOAuthConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceOAuthConfig>;

export interface GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceServiceAccountAuthConfig {
  serviceAccount?: string;
}

export const GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceServiceAccountAuthConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceServiceAccountAuthConfig> = Schema.suspend(() => Schema.Struct({
  serviceAccount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceServiceAccountAuthConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceServiceAccountAuthConfig>;

export interface GoogleCloudDialogflowCxV3beta1WebhookGenericWebService {
  uri?: string;
  username?: string;
  password?: string;
  secretVersionForUsernamePassword?: string;
  requestHeaders?: Record<string, string>;
  secretVersionsForRequestHeaders?: Record<string, GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceSecretVersionHeaderValue>;
  allowedCaCerts?: Array<string>;
  oauthConfig?: GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceOAuthConfig;
  serviceAgentAuth?: "SERVICE_AGENT_AUTH_UNSPECIFIED" | "NONE" | "ID_TOKEN" | "ACCESS_TOKEN" | (string & {});
  serviceAccountAuthConfig?: GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceServiceAccountAuthConfig;
  webhookType?: "WEBHOOK_TYPE_UNSPECIFIED" | "STANDARD" | "FLEXIBLE" | (string & {});
  httpMethod?: "HTTP_METHOD_UNSPECIFIED" | "POST" | "GET" | "HEAD" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | (string & {});
  requestBody?: string;
  parameterMapping?: Record<string, string>;
}

export const GoogleCloudDialogflowCxV3beta1WebhookGenericWebService: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookGenericWebService> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  username: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
  secretVersionForUsernamePassword: Schema.optional(Schema.String),
  requestHeaders: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  secretVersionsForRequestHeaders: Schema.optional(Schema.Record(Schema.String, GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceSecretVersionHeaderValue)),
  allowedCaCerts: Schema.optional(Schema.Array(Schema.String)),
  oauthConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceOAuthConfig),
  serviceAgentAuth: Schema.optional(Schema.String),
  serviceAccountAuthConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceServiceAccountAuthConfig),
  webhookType: Schema.optional(Schema.String),
  httpMethod: Schema.optional(Schema.String),
  requestBody: Schema.optional(Schema.String),
  parameterMapping: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1WebhookGenericWebService" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookGenericWebService>;

export interface GoogleCloudDialogflowCxV3beta1WebhookServiceDirectoryConfig {
  service?: string;
  genericWebService?: GoogleCloudDialogflowCxV3beta1WebhookGenericWebService;
}

export const GoogleCloudDialogflowCxV3beta1WebhookServiceDirectoryConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookServiceDirectoryConfig> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  genericWebService: Schema.optional(GoogleCloudDialogflowCxV3beta1WebhookGenericWebService),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1WebhookServiceDirectoryConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookServiceDirectoryConfig>;

export interface GoogleCloudDialogflowCxV3beta1Webhook {
  name?: string;
  displayName?: string;
  genericWebService?: GoogleCloudDialogflowCxV3beta1WebhookGenericWebService;
  serviceDirectory?: GoogleCloudDialogflowCxV3beta1WebhookServiceDirectoryConfig;
  timeout?: string;
  disabled?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1Webhook: Schema.Schema<GoogleCloudDialogflowCxV3beta1Webhook> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  genericWebService: Schema.optional(GoogleCloudDialogflowCxV3beta1WebhookGenericWebService),
  serviceDirectory: Schema.optional(GoogleCloudDialogflowCxV3beta1WebhookServiceDirectoryConfig),
  timeout: Schema.optional(Schema.String),
  disabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Webhook" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Webhook>;

export interface GoogleCloudDialogflowCxV3beta1ListWebhooksResponse {
  webhooks?: Array<GoogleCloudDialogflowCxV3beta1Webhook>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3beta1ListWebhooksResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ListWebhooksResponse> = Schema.suspend(() => Schema.Struct({
  webhooks: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1Webhook)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ListWebhooksResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ListWebhooksResponse>;

export interface GoogleCloudDialogflowCxV3beta1EnvironmentVersionConfig {
  version?: string;
}

export const GoogleCloudDialogflowCxV3beta1EnvironmentVersionConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1EnvironmentVersionConfig> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1EnvironmentVersionConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1EnvironmentVersionConfig>;

export interface GoogleCloudDialogflowCxV3beta1EnvironmentTestCasesConfig {
  testCases?: Array<string>;
  enableContinuousRun?: boolean;
  enablePredeploymentRun?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1EnvironmentTestCasesConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1EnvironmentTestCasesConfig> = Schema.suspend(() => Schema.Struct({
  testCases: Schema.optional(Schema.Array(Schema.String)),
  enableContinuousRun: Schema.optional(Schema.Boolean),
  enablePredeploymentRun: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1EnvironmentTestCasesConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1EnvironmentTestCasesConfig>;

export interface GoogleCloudDialogflowCxV3beta1EnvironmentWebhookConfig {
  webhookOverrides?: Array<GoogleCloudDialogflowCxV3beta1Webhook>;
}

export const GoogleCloudDialogflowCxV3beta1EnvironmentWebhookConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1EnvironmentWebhookConfig> = Schema.suspend(() => Schema.Struct({
  webhookOverrides: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1Webhook)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1EnvironmentWebhookConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1EnvironmentWebhookConfig>;

export interface GoogleCloudDialogflowCxV3beta1Environment {
  name?: string;
  displayName?: string;
  description?: string;
  versionConfigs?: Array<GoogleCloudDialogflowCxV3beta1EnvironmentVersionConfig>;
  updateTime?: string;
  testCasesConfig?: GoogleCloudDialogflowCxV3beta1EnvironmentTestCasesConfig;
  webhookConfig?: GoogleCloudDialogflowCxV3beta1EnvironmentWebhookConfig;
}

export const GoogleCloudDialogflowCxV3beta1Environment: Schema.Schema<GoogleCloudDialogflowCxV3beta1Environment> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  versionConfigs: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1EnvironmentVersionConfig)),
  updateTime: Schema.optional(Schema.String),
  testCasesConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1EnvironmentTestCasesConfig),
  webhookConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1EnvironmentWebhookConfig),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Environment" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Environment>;

export interface GoogleCloudDialogflowCxV3beta1ListEnvironmentsResponse {
  environments?: Array<GoogleCloudDialogflowCxV3beta1Environment>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3beta1ListEnvironmentsResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ListEnvironmentsResponse> = Schema.suspend(() => Schema.Struct({
  environments: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1Environment)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ListEnvironmentsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ListEnvironmentsResponse>;

export interface GoogleCloudDialogflowCxV3beta1LookupEnvironmentHistoryResponse {
  environments?: Array<GoogleCloudDialogflowCxV3beta1Environment>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3beta1LookupEnvironmentHistoryResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1LookupEnvironmentHistoryResponse> = Schema.suspend(() => Schema.Struct({
  environments: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1Environment)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1LookupEnvironmentHistoryResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1LookupEnvironmentHistoryResponse>;

export interface GoogleCloudDialogflowCxV3beta1RunContinuousTestRequest {
}

export const GoogleCloudDialogflowCxV3beta1RunContinuousTestRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1RunContinuousTestRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1RunContinuousTestRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1RunContinuousTestRequest>;

export interface GoogleCloudDialogflowCxV3beta1ContinuousTestResult {
  name?: string;
  result?: "AGGREGATED_TEST_RESULT_UNSPECIFIED" | "PASSED" | "FAILED" | (string & {});
  testCaseResults?: Array<string>;
  runTime?: string;
}

export const GoogleCloudDialogflowCxV3beta1ContinuousTestResult: Schema.Schema<GoogleCloudDialogflowCxV3beta1ContinuousTestResult> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  result: Schema.optional(Schema.String),
  testCaseResults: Schema.optional(Schema.Array(Schema.String)),
  runTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ContinuousTestResult" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ContinuousTestResult>;

export interface GoogleCloudDialogflowCxV3beta1ListContinuousTestResultsResponse {
  continuousTestResults?: Array<GoogleCloudDialogflowCxV3beta1ContinuousTestResult>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3beta1ListContinuousTestResultsResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ListContinuousTestResultsResponse> = Schema.suspend(() => Schema.Struct({
  continuousTestResults: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ContinuousTestResult)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ListContinuousTestResultsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ListContinuousTestResultsResponse>;

export interface GoogleCloudDialogflowCxV3beta1DeployFlowRequest {
  flowVersion?: string;
}

export const GoogleCloudDialogflowCxV3beta1DeployFlowRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1DeployFlowRequest> = Schema.suspend(() => Schema.Struct({
  flowVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1DeployFlowRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1DeployFlowRequest>;

export interface GoogleCloudDialogflowCxV3beta1ConversationMetricsQueryInputCount {
  textCount?: number;
  intentCount?: number;
  audioCount?: number;
  eventCount?: number;
  dtmfCount?: number;
}

export const GoogleCloudDialogflowCxV3beta1ConversationMetricsQueryInputCount: Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationMetricsQueryInputCount> = Schema.suspend(() => Schema.Struct({
  textCount: Schema.optional(Schema.Number),
  intentCount: Schema.optional(Schema.Number),
  audioCount: Schema.optional(Schema.Number),
  eventCount: Schema.optional(Schema.Number),
  dtmfCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ConversationMetricsQueryInputCount" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationMetricsQueryInputCount>;

export interface GoogleCloudDialogflowCxV3beta1ConversationMetricsMatchTypeCount {
  unspecifiedCount?: number;
  intentCount?: number;
  directIntentCount?: number;
  parameterFillingCount?: number;
  noMatchCount?: number;
  noInputCount?: number;
  eventCount?: number;
}

export const GoogleCloudDialogflowCxV3beta1ConversationMetricsMatchTypeCount: Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationMetricsMatchTypeCount> = Schema.suspend(() => Schema.Struct({
  unspecifiedCount: Schema.optional(Schema.Number),
  intentCount: Schema.optional(Schema.Number),
  directIntentCount: Schema.optional(Schema.Number),
  parameterFillingCount: Schema.optional(Schema.Number),
  noMatchCount: Schema.optional(Schema.Number),
  noInputCount: Schema.optional(Schema.Number),
  eventCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ConversationMetricsMatchTypeCount" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationMetricsMatchTypeCount>;

export interface GoogleCloudDialogflowCxV3beta1ConversationMetrics {
  interactionCount?: number;
  inputAudioDuration?: string;
  outputAudioDuration?: string;
  maxWebhookLatency?: string;
  hasEndInteraction?: boolean;
  hasLiveAgentHandoff?: boolean;
  averageMatchConfidence?: number;
  queryInputCount?: GoogleCloudDialogflowCxV3beta1ConversationMetricsQueryInputCount;
  matchTypeCount?: GoogleCloudDialogflowCxV3beta1ConversationMetricsMatchTypeCount;
}

export const GoogleCloudDialogflowCxV3beta1ConversationMetrics: Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationMetrics> = Schema.suspend(() => Schema.Struct({
  interactionCount: Schema.optional(Schema.Number),
  inputAudioDuration: Schema.optional(Schema.String),
  outputAudioDuration: Schema.optional(Schema.String),
  maxWebhookLatency: Schema.optional(Schema.String),
  hasEndInteraction: Schema.optional(Schema.Boolean),
  hasLiveAgentHandoff: Schema.optional(Schema.Boolean),
  averageMatchConfidence: Schema.optional(Schema.Number),
  queryInputCount: Schema.optional(GoogleCloudDialogflowCxV3beta1ConversationMetricsQueryInputCount),
  matchTypeCount: Schema.optional(GoogleCloudDialogflowCxV3beta1ConversationMetricsMatchTypeCount),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ConversationMetrics" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationMetrics>;

export interface GoogleCloudDialogflowCxV3beta1ConversationInteractionMissingTransition {
  intentDisplayName?: string;
  score?: number;
}

export const GoogleCloudDialogflowCxV3beta1ConversationInteractionMissingTransition: Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationInteractionMissingTransition> = Schema.suspend(() => Schema.Struct({
  intentDisplayName: Schema.optional(Schema.String),
  score: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ConversationInteractionMissingTransition" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationInteractionMissingTransition>;

export interface GoogleCloudDialogflowCxV3beta1ConversationInteractionStepMetrics {
  name?: string;
  latency?: string;
}

export const GoogleCloudDialogflowCxV3beta1ConversationInteractionStepMetrics: Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationInteractionStepMetrics> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  latency: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ConversationInteractionStepMetrics" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationInteractionStepMetrics>;

export interface GoogleCloudDialogflowCxV3beta1ConversationInteraction {
  request?: GoogleCloudDialogflowCxV3beta1DetectIntentRequest;
  response?: GoogleCloudDialogflowCxV3beta1DetectIntentResponse;
  partialResponses?: Array<GoogleCloudDialogflowCxV3beta1DetectIntentResponse>;
  requestUtterances?: string;
  responseUtterances?: string;
  createTime?: string;
  answerFeedback?: GoogleCloudDialogflowCxV3beta1AnswerFeedback;
  missingTransition?: GoogleCloudDialogflowCxV3beta1ConversationInteractionMissingTransition;
  stepMetrics?: Array<GoogleCloudDialogflowCxV3beta1ConversationInteractionStepMetrics>;
}

export const GoogleCloudDialogflowCxV3beta1ConversationInteraction: Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationInteraction> = Schema.suspend(() => Schema.Struct({
  request: Schema.optional(GoogleCloudDialogflowCxV3beta1DetectIntentRequest),
  response: Schema.optional(GoogleCloudDialogflowCxV3beta1DetectIntentResponse),
  partialResponses: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1DetectIntentResponse)),
  requestUtterances: Schema.optional(Schema.String),
  responseUtterances: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  answerFeedback: Schema.optional(GoogleCloudDialogflowCxV3beta1AnswerFeedback),
  missingTransition: Schema.optional(GoogleCloudDialogflowCxV3beta1ConversationInteractionMissingTransition),
  stepMetrics: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ConversationInteractionStepMetrics)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ConversationInteraction" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationInteraction>;

export interface GoogleCloudDialogflowCxV3beta1Conversation {
  name?: string;
  type?: "TYPE_UNSPECIFIED" | "AUDIO" | "TEXT" | "UNDETERMINED" | (string & {});
  languageCode?: string;
  startTime?: string;
  duration?: string;
  metrics?: GoogleCloudDialogflowCxV3beta1ConversationMetrics;
  intents?: Array<GoogleCloudDialogflowCxV3beta1Intent>;
  flows?: Array<GoogleCloudDialogflowCxV3beta1Flow>;
  pages?: Array<GoogleCloudDialogflowCxV3beta1Page>;
  interactions?: Array<GoogleCloudDialogflowCxV3beta1ConversationInteraction>;
  environment?: GoogleCloudDialogflowCxV3beta1Environment;
  flowVersions?: Record<string, string>;
}

export const GoogleCloudDialogflowCxV3beta1Conversation: Schema.Schema<GoogleCloudDialogflowCxV3beta1Conversation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  duration: Schema.optional(Schema.String),
  metrics: Schema.optional(GoogleCloudDialogflowCxV3beta1ConversationMetrics),
  intents: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1Intent)),
  flows: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1Flow)),
  pages: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1Page)),
  interactions: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ConversationInteraction)),
  environment: Schema.optional(GoogleCloudDialogflowCxV3beta1Environment),
  flowVersions: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Conversation" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Conversation>;

export interface GoogleCloudDialogflowCxV3beta1ListConversationsResponse {
  conversations?: Array<GoogleCloudDialogflowCxV3beta1Conversation>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3beta1ListConversationsResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ListConversationsResponse> = Schema.suspend(() => Schema.Struct({
  conversations: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1Conversation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ListConversationsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ListConversationsResponse>;

export interface GoogleCloudDialogflowCxV3beta1DeploymentResult {
  deploymentTestResults?: Array<string>;
  experiment?: string;
}

export const GoogleCloudDialogflowCxV3beta1DeploymentResult: Schema.Schema<GoogleCloudDialogflowCxV3beta1DeploymentResult> = Schema.suspend(() => Schema.Struct({
  deploymentTestResults: Schema.optional(Schema.Array(Schema.String)),
  experiment: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1DeploymentResult" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1DeploymentResult>;

export interface GoogleCloudDialogflowCxV3beta1Deployment {
  name?: string;
  flowVersion?: string;
  state?: "STATE_UNSPECIFIED" | "RUNNING" | "SUCCEEDED" | "FAILED" | (string & {});
  result?: GoogleCloudDialogflowCxV3beta1DeploymentResult;
  startTime?: string;
  endTime?: string;
}

export const GoogleCloudDialogflowCxV3beta1Deployment: Schema.Schema<GoogleCloudDialogflowCxV3beta1Deployment> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  flowVersion: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  result: Schema.optional(GoogleCloudDialogflowCxV3beta1DeploymentResult),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Deployment" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Deployment>;

export interface GoogleCloudDialogflowCxV3beta1ListDeploymentsResponse {
  deployments?: Array<GoogleCloudDialogflowCxV3beta1Deployment>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3beta1ListDeploymentsResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ListDeploymentsResponse> = Schema.suspend(() => Schema.Struct({
  deployments: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1Deployment)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ListDeploymentsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ListDeploymentsResponse>;

export interface GoogleCloudDialogflowCxV3beta1VersionVariantsVariant {
  version?: string;
  trafficAllocation?: number;
  isControlGroup?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1VersionVariantsVariant: Schema.Schema<GoogleCloudDialogflowCxV3beta1VersionVariantsVariant> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  trafficAllocation: Schema.optional(Schema.Number),
  isControlGroup: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1VersionVariantsVariant" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1VersionVariantsVariant>;

export interface GoogleCloudDialogflowCxV3beta1VersionVariants {
  variants?: Array<GoogleCloudDialogflowCxV3beta1VersionVariantsVariant>;
}

export const GoogleCloudDialogflowCxV3beta1VersionVariants: Schema.Schema<GoogleCloudDialogflowCxV3beta1VersionVariants> = Schema.suspend(() => Schema.Struct({
  variants: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1VersionVariantsVariant)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1VersionVariants" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1VersionVariants>;

export interface GoogleCloudDialogflowCxV3beta1ExperimentDefinition {
  condition?: string;
  versionVariants?: GoogleCloudDialogflowCxV3beta1VersionVariants;
}

export const GoogleCloudDialogflowCxV3beta1ExperimentDefinition: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExperimentDefinition> = Schema.suspend(() => Schema.Struct({
  condition: Schema.optional(Schema.String),
  versionVariants: Schema.optional(GoogleCloudDialogflowCxV3beta1VersionVariants),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExperimentDefinition" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExperimentDefinition>;

export interface GoogleCloudDialogflowCxV3beta1RolloutConfigRolloutStep {
  displayName?: string;
  trafficPercent?: number;
  minDuration?: string;
}

export const GoogleCloudDialogflowCxV3beta1RolloutConfigRolloutStep: Schema.Schema<GoogleCloudDialogflowCxV3beta1RolloutConfigRolloutStep> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  trafficPercent: Schema.optional(Schema.Number),
  minDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1RolloutConfigRolloutStep" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1RolloutConfigRolloutStep>;

export interface GoogleCloudDialogflowCxV3beta1RolloutConfig {
  rolloutSteps?: Array<GoogleCloudDialogflowCxV3beta1RolloutConfigRolloutStep>;
  rolloutCondition?: string;
  failureCondition?: string;
}

export const GoogleCloudDialogflowCxV3beta1RolloutConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1RolloutConfig> = Schema.suspend(() => Schema.Struct({
  rolloutSteps: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1RolloutConfigRolloutStep)),
  rolloutCondition: Schema.optional(Schema.String),
  failureCondition: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1RolloutConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1RolloutConfig>;

export interface GoogleCloudDialogflowCxV3beta1RolloutState {
  step?: string;
  stepIndex?: number;
  startTime?: string;
}

export const GoogleCloudDialogflowCxV3beta1RolloutState: Schema.Schema<GoogleCloudDialogflowCxV3beta1RolloutState> = Schema.suspend(() => Schema.Struct({
  step: Schema.optional(Schema.String),
  stepIndex: Schema.optional(Schema.Number),
  startTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1RolloutState" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1RolloutState>;

export interface GoogleCloudDialogflowCxV3beta1ExperimentResultConfidenceInterval {
  confidenceLevel?: number;
  ratio?: number;
  lowerBound?: number;
  upperBound?: number;
}

export const GoogleCloudDialogflowCxV3beta1ExperimentResultConfidenceInterval: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExperimentResultConfidenceInterval> = Schema.suspend(() => Schema.Struct({
  confidenceLevel: Schema.optional(Schema.Number),
  ratio: Schema.optional(Schema.Number),
  lowerBound: Schema.optional(Schema.Number),
  upperBound: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExperimentResultConfidenceInterval" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExperimentResultConfidenceInterval>;

export interface GoogleCloudDialogflowCxV3beta1ExperimentResultMetric {
  type?: "METRIC_UNSPECIFIED" | "CONTAINED_SESSION_NO_CALLBACK_RATE" | "LIVE_AGENT_HANDOFF_RATE" | "CALLBACK_SESSION_RATE" | "ABANDONED_SESSION_RATE" | "SESSION_END_RATE" | (string & {});
  countType?: "COUNT_TYPE_UNSPECIFIED" | "TOTAL_NO_MATCH_COUNT" | "TOTAL_TURN_COUNT" | "AVERAGE_TURN_COUNT" | (string & {});
  ratio?: number;
  count?: number;
  confidenceInterval?: GoogleCloudDialogflowCxV3beta1ExperimentResultConfidenceInterval;
}

export const GoogleCloudDialogflowCxV3beta1ExperimentResultMetric: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExperimentResultMetric> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  countType: Schema.optional(Schema.String),
  ratio: Schema.optional(Schema.Number),
  count: Schema.optional(Schema.Number),
  confidenceInterval: Schema.optional(GoogleCloudDialogflowCxV3beta1ExperimentResultConfidenceInterval),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExperimentResultMetric" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExperimentResultMetric>;

export interface GoogleCloudDialogflowCxV3beta1ExperimentResultVersionMetrics {
  version?: string;
  metrics?: Array<GoogleCloudDialogflowCxV3beta1ExperimentResultMetric>;
  sessionCount?: number;
}

export const GoogleCloudDialogflowCxV3beta1ExperimentResultVersionMetrics: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExperimentResultVersionMetrics> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  metrics: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ExperimentResultMetric)),
  sessionCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExperimentResultVersionMetrics" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExperimentResultVersionMetrics>;

export interface GoogleCloudDialogflowCxV3beta1ExperimentResult {
  versionMetrics?: Array<GoogleCloudDialogflowCxV3beta1ExperimentResultVersionMetrics>;
  lastUpdateTime?: string;
}

export const GoogleCloudDialogflowCxV3beta1ExperimentResult: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExperimentResult> = Schema.suspend(() => Schema.Struct({
  versionMetrics: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ExperimentResultVersionMetrics)),
  lastUpdateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExperimentResult" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExperimentResult>;

export interface GoogleCloudDialogflowCxV3beta1VariantsHistory {
  versionVariants?: GoogleCloudDialogflowCxV3beta1VersionVariants;
  updateTime?: string;
}

export const GoogleCloudDialogflowCxV3beta1VariantsHistory: Schema.Schema<GoogleCloudDialogflowCxV3beta1VariantsHistory> = Schema.suspend(() => Schema.Struct({
  versionVariants: Schema.optional(GoogleCloudDialogflowCxV3beta1VersionVariants),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1VariantsHistory" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1VariantsHistory>;

export interface GoogleCloudDialogflowCxV3beta1Experiment {
  name?: string;
  displayName?: string;
  description?: string;
  state?: "STATE_UNSPECIFIED" | "DRAFT" | "RUNNING" | "DONE" | "ROLLOUT_FAILED" | (string & {});
  definition?: GoogleCloudDialogflowCxV3beta1ExperimentDefinition;
  rolloutConfig?: GoogleCloudDialogflowCxV3beta1RolloutConfig;
  rolloutState?: GoogleCloudDialogflowCxV3beta1RolloutState;
  rolloutFailureReason?: string;
  result?: GoogleCloudDialogflowCxV3beta1ExperimentResult;
  createTime?: string;
  startTime?: string;
  endTime?: string;
  lastUpdateTime?: string;
  experimentLength?: string;
  variantsHistory?: Array<GoogleCloudDialogflowCxV3beta1VariantsHistory>;
}

export const GoogleCloudDialogflowCxV3beta1Experiment: Schema.Schema<GoogleCloudDialogflowCxV3beta1Experiment> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  definition: Schema.optional(GoogleCloudDialogflowCxV3beta1ExperimentDefinition),
  rolloutConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1RolloutConfig),
  rolloutState: Schema.optional(GoogleCloudDialogflowCxV3beta1RolloutState),
  rolloutFailureReason: Schema.optional(Schema.String),
  result: Schema.optional(GoogleCloudDialogflowCxV3beta1ExperimentResult),
  createTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  lastUpdateTime: Schema.optional(Schema.String),
  experimentLength: Schema.optional(Schema.String),
  variantsHistory: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1VariantsHistory)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Experiment" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Experiment>;

export interface GoogleCloudDialogflowCxV3beta1ListExperimentsResponse {
  experiments?: Array<GoogleCloudDialogflowCxV3beta1Experiment>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3beta1ListExperimentsResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ListExperimentsResponse> = Schema.suspend(() => Schema.Struct({
  experiments: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1Experiment)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ListExperimentsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ListExperimentsResponse>;

export interface GoogleCloudDialogflowCxV3beta1StartExperimentRequest {
}

export const GoogleCloudDialogflowCxV3beta1StartExperimentRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1StartExperimentRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1StartExperimentRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1StartExperimentRequest>;

export interface GoogleCloudDialogflowCxV3beta1StopExperimentRequest {
}

export const GoogleCloudDialogflowCxV3beta1StopExperimentRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1StopExperimentRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1StopExperimentRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1StopExperimentRequest>;

export interface GoogleCloudDialogflowCxV3beta1Phrase {
  text?: string;
}

export const GoogleCloudDialogflowCxV3beta1Phrase: Schema.Schema<GoogleCloudDialogflowCxV3beta1Phrase> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Phrase" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Phrase>;

export interface GoogleCloudDialogflowCxV3beta1GeneratorPlaceholder {
  id?: string;
  name?: string;
}

export const GoogleCloudDialogflowCxV3beta1GeneratorPlaceholder: Schema.Schema<GoogleCloudDialogflowCxV3beta1GeneratorPlaceholder> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1GeneratorPlaceholder" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1GeneratorPlaceholder>;

export interface GoogleCloudDialogflowCxV3beta1GeneratorModelParameter {
  temperature?: number;
  maxDecodeSteps?: number;
  topP?: number;
  topK?: number;
}

export const GoogleCloudDialogflowCxV3beta1GeneratorModelParameter: Schema.Schema<GoogleCloudDialogflowCxV3beta1GeneratorModelParameter> = Schema.suspend(() => Schema.Struct({
  temperature: Schema.optional(Schema.Number),
  maxDecodeSteps: Schema.optional(Schema.Number),
  topP: Schema.optional(Schema.Number),
  topK: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1GeneratorModelParameter" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1GeneratorModelParameter>;

export interface GoogleCloudDialogflowCxV3beta1Generator {
  name?: string;
  displayName?: string;
  promptText?: GoogleCloudDialogflowCxV3beta1Phrase;
  placeholders?: Array<GoogleCloudDialogflowCxV3beta1GeneratorPlaceholder>;
  llmModelSettings?: GoogleCloudDialogflowCxV3beta1LlmModelSettings;
  modelParameter?: GoogleCloudDialogflowCxV3beta1GeneratorModelParameter;
}

export const GoogleCloudDialogflowCxV3beta1Generator: Schema.Schema<GoogleCloudDialogflowCxV3beta1Generator> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  promptText: Schema.optional(GoogleCloudDialogflowCxV3beta1Phrase),
  placeholders: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1GeneratorPlaceholder)),
  llmModelSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1LlmModelSettings),
  modelParameter: Schema.optional(GoogleCloudDialogflowCxV3beta1GeneratorModelParameter),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Generator" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Generator>;

export interface GoogleCloudDialogflowCxV3beta1ListGeneratorsResponse {
  generators?: Array<GoogleCloudDialogflowCxV3beta1Generator>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3beta1ListGeneratorsResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ListGeneratorsResponse> = Schema.suspend(() => Schema.Struct({
  generators: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1Generator)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ListGeneratorsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ListGeneratorsResponse>;

export interface GoogleCloudDialogflowCxV3beta1PlaybookStep {
  text?: string;
  steps?: Array<GoogleCloudDialogflowCxV3beta1PlaybookStep>;
}

export const GoogleCloudDialogflowCxV3beta1PlaybookStep: Schema.Schema<GoogleCloudDialogflowCxV3beta1PlaybookStep> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  steps: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1PlaybookStep)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1PlaybookStep" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1PlaybookStep>;

export interface GoogleCloudDialogflowCxV3beta1PlaybookInstruction {
  guidelines?: string;
  steps?: Array<GoogleCloudDialogflowCxV3beta1PlaybookStep>;
}

export const GoogleCloudDialogflowCxV3beta1PlaybookInstruction: Schema.Schema<GoogleCloudDialogflowCxV3beta1PlaybookInstruction> = Schema.suspend(() => Schema.Struct({
  guidelines: Schema.optional(Schema.String),
  steps: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1PlaybookStep)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1PlaybookInstruction" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1PlaybookInstruction>;

export interface GoogleCloudDialogflowCxV3beta1CodeBlock {
  code?: string;
}

export const GoogleCloudDialogflowCxV3beta1CodeBlock: Schema.Schema<GoogleCloudDialogflowCxV3beta1CodeBlock> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1CodeBlock" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1CodeBlock>;

export interface GoogleCloudDialogflowCxV3beta1HandlerEventHandler {
  event?: string;
  condition?: string;
  fulfillment?: GoogleCloudDialogflowCxV3beta1Fulfillment;
}

export const GoogleCloudDialogflowCxV3beta1HandlerEventHandler: Schema.Schema<GoogleCloudDialogflowCxV3beta1HandlerEventHandler> = Schema.suspend(() => Schema.Struct({
  event: Schema.optional(Schema.String),
  condition: Schema.optional(Schema.String),
  fulfillment: Schema.optional(GoogleCloudDialogflowCxV3beta1Fulfillment),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1HandlerEventHandler" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1HandlerEventHandler>;

export interface GoogleCloudDialogflowCxV3beta1HandlerLifecycleHandler {
  lifecycleStage?: string;
  condition?: string;
  fulfillment?: GoogleCloudDialogflowCxV3beta1Fulfillment;
}

export const GoogleCloudDialogflowCxV3beta1HandlerLifecycleHandler: Schema.Schema<GoogleCloudDialogflowCxV3beta1HandlerLifecycleHandler> = Schema.suspend(() => Schema.Struct({
  lifecycleStage: Schema.optional(Schema.String),
  condition: Schema.optional(Schema.String),
  fulfillment: Schema.optional(GoogleCloudDialogflowCxV3beta1Fulfillment),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1HandlerLifecycleHandler" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1HandlerLifecycleHandler>;

export interface GoogleCloudDialogflowCxV3beta1Handler {
  eventHandler?: GoogleCloudDialogflowCxV3beta1HandlerEventHandler;
  lifecycleHandler?: GoogleCloudDialogflowCxV3beta1HandlerLifecycleHandler;
}

export const GoogleCloudDialogflowCxV3beta1Handler: Schema.Schema<GoogleCloudDialogflowCxV3beta1Handler> = Schema.suspend(() => Schema.Struct({
  eventHandler: Schema.optional(GoogleCloudDialogflowCxV3beta1HandlerEventHandler),
  lifecycleHandler: Schema.optional(GoogleCloudDialogflowCxV3beta1HandlerLifecycleHandler),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Handler" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Handler>;

export interface GoogleCloudDialogflowCxV3beta1Playbook {
  name?: string;
  displayName?: string;
  goal?: string;
  inputParameterDefinitions?: Array<GoogleCloudDialogflowCxV3beta1ParameterDefinition>;
  outputParameterDefinitions?: Array<GoogleCloudDialogflowCxV3beta1ParameterDefinition>;
  instruction?: GoogleCloudDialogflowCxV3beta1PlaybookInstruction;
  tokenCount?: string;
  createTime?: string;
  updateTime?: string;
  referencedPlaybooks?: Array<string>;
  referencedFlows?: Array<string>;
  referencedTools?: Array<string>;
  inlineActions?: Array<string>;
  codeBlock?: GoogleCloudDialogflowCxV3beta1CodeBlock;
  llmModelSettings?: GoogleCloudDialogflowCxV3beta1LlmModelSettings;
  speechSettings?: GoogleCloudDialogflowCxV3beta1AdvancedSettingsSpeechSettings;
  handlers?: Array<GoogleCloudDialogflowCxV3beta1Handler>;
  playbookType?: "PLAYBOOK_TYPE_UNSPECIFIED" | "TASK" | "ROUTINE" | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1Playbook: Schema.Schema<GoogleCloudDialogflowCxV3beta1Playbook> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  goal: Schema.optional(Schema.String),
  inputParameterDefinitions: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ParameterDefinition)),
  outputParameterDefinitions: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ParameterDefinition)),
  instruction: Schema.optional(GoogleCloudDialogflowCxV3beta1PlaybookInstruction),
  tokenCount: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  referencedPlaybooks: Schema.optional(Schema.Array(Schema.String)),
  referencedFlows: Schema.optional(Schema.Array(Schema.String)),
  referencedTools: Schema.optional(Schema.Array(Schema.String)),
  inlineActions: Schema.optional(Schema.Array(Schema.String)),
  codeBlock: Schema.optional(GoogleCloudDialogflowCxV3beta1CodeBlock),
  llmModelSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1LlmModelSettings),
  speechSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1AdvancedSettingsSpeechSettings),
  handlers: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1Handler)),
  playbookType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Playbook" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Playbook>;

export interface GoogleCloudDialogflowCxV3beta1ListPlaybooksResponse {
  playbooks?: Array<GoogleCloudDialogflowCxV3beta1Playbook>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3beta1ListPlaybooksResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ListPlaybooksResponse> = Schema.suspend(() => Schema.Struct({
  playbooks: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1Playbook)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ListPlaybooksResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ListPlaybooksResponse>;

export interface GoogleCloudDialogflowCxV3beta1ExportPlaybookRequest {
  playbookUri?: string;
  dataFormat?: "DATA_FORMAT_UNSPECIFIED" | "BLOB" | "JSON" | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1ExportPlaybookRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportPlaybookRequest> = Schema.suspend(() => Schema.Struct({
  playbookUri: Schema.optional(Schema.String),
  dataFormat: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExportPlaybookRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportPlaybookRequest>;

export interface GoogleCloudDialogflowCxV3beta1PlaybookImportStrategy {
  mainPlaybookImportStrategy?: "IMPORT_STRATEGY_UNSPECIFIED" | "IMPORT_STRATEGY_CREATE_NEW" | "IMPORT_STRATEGY_REPLACE" | "IMPORT_STRATEGY_KEEP" | "IMPORT_STRATEGY_MERGE" | "IMPORT_STRATEGY_THROW_ERROR" | (string & {});
  nestedResourceImportStrategy?: "IMPORT_STRATEGY_UNSPECIFIED" | "IMPORT_STRATEGY_CREATE_NEW" | "IMPORT_STRATEGY_REPLACE" | "IMPORT_STRATEGY_KEEP" | "IMPORT_STRATEGY_MERGE" | "IMPORT_STRATEGY_THROW_ERROR" | (string & {});
  toolImportStrategy?: "IMPORT_STRATEGY_UNSPECIFIED" | "IMPORT_STRATEGY_CREATE_NEW" | "IMPORT_STRATEGY_REPLACE" | "IMPORT_STRATEGY_KEEP" | "IMPORT_STRATEGY_MERGE" | "IMPORT_STRATEGY_THROW_ERROR" | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1PlaybookImportStrategy: Schema.Schema<GoogleCloudDialogflowCxV3beta1PlaybookImportStrategy> = Schema.suspend(() => Schema.Struct({
  mainPlaybookImportStrategy: Schema.optional(Schema.String),
  nestedResourceImportStrategy: Schema.optional(Schema.String),
  toolImportStrategy: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1PlaybookImportStrategy" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1PlaybookImportStrategy>;

export interface GoogleCloudDialogflowCxV3beta1ImportPlaybookRequest {
  playbookUri?: string;
  playbookContent?: string;
  importStrategy?: GoogleCloudDialogflowCxV3beta1PlaybookImportStrategy;
}

export const GoogleCloudDialogflowCxV3beta1ImportPlaybookRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportPlaybookRequest> = Schema.suspend(() => Schema.Struct({
  playbookUri: Schema.optional(Schema.String),
  playbookContent: Schema.optional(Schema.String),
  importStrategy: Schema.optional(GoogleCloudDialogflowCxV3beta1PlaybookImportStrategy),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ImportPlaybookRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportPlaybookRequest>;

export interface GoogleCloudDialogflowCxV3beta1PlaybookVersion {
  name?: string;
  description?: string;
  playbook?: GoogleCloudDialogflowCxV3beta1Playbook;
  examples?: Array<GoogleCloudDialogflowCxV3beta1Example>;
  updateTime?: string;
}

export const GoogleCloudDialogflowCxV3beta1PlaybookVersion: Schema.Schema<GoogleCloudDialogflowCxV3beta1PlaybookVersion> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  playbook: Schema.optional(GoogleCloudDialogflowCxV3beta1Playbook),
  examples: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1Example)),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1PlaybookVersion" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1PlaybookVersion>;

export interface GoogleCloudDialogflowCxV3beta1RestorePlaybookVersionRequest {
}

export const GoogleCloudDialogflowCxV3beta1RestorePlaybookVersionRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1RestorePlaybookVersionRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1RestorePlaybookVersionRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1RestorePlaybookVersionRequest>;

export interface GoogleCloudDialogflowCxV3beta1RestorePlaybookVersionResponse {
  playbook?: GoogleCloudDialogflowCxV3beta1Playbook;
}

export const GoogleCloudDialogflowCxV3beta1RestorePlaybookVersionResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1RestorePlaybookVersionResponse> = Schema.suspend(() => Schema.Struct({
  playbook: Schema.optional(GoogleCloudDialogflowCxV3beta1Playbook),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1RestorePlaybookVersionResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1RestorePlaybookVersionResponse>;

export interface GoogleCloudDialogflowCxV3beta1ListPlaybookVersionsResponse {
  playbookVersions?: Array<GoogleCloudDialogflowCxV3beta1PlaybookVersion>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3beta1ListPlaybookVersionsResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ListPlaybookVersionsResponse> = Schema.suspend(() => Schema.Struct({
  playbookVersions: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1PlaybookVersion)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ListPlaybookVersionsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ListPlaybookVersionsResponse>;

export interface GoogleCloudDialogflowCxV3beta1ToolAuthenticationApiKeyConfig {
  keyName?: string;
  apiKey?: string;
  secretVersionForApiKey?: string;
  requestLocation?: "REQUEST_LOCATION_UNSPECIFIED" | "HEADER" | "QUERY_STRING" | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1ToolAuthenticationApiKeyConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolAuthenticationApiKeyConfig> = Schema.suspend(() => Schema.Struct({
  keyName: Schema.optional(Schema.String),
  apiKey: Schema.optional(Schema.String),
  secretVersionForApiKey: Schema.optional(Schema.String),
  requestLocation: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolAuthenticationApiKeyConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolAuthenticationApiKeyConfig>;

export interface GoogleCloudDialogflowCxV3beta1ToolAuthenticationOAuthConfig {
  oauthGrantType?: "OAUTH_GRANT_TYPE_UNSPECIFIED" | "CLIENT_CREDENTIAL" | (string & {});
  clientId?: string;
  clientSecret?: string;
  secretVersionForClientSecret?: string;
  tokenEndpoint?: string;
  scopes?: Array<string>;
}

export const GoogleCloudDialogflowCxV3beta1ToolAuthenticationOAuthConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolAuthenticationOAuthConfig> = Schema.suspend(() => Schema.Struct({
  oauthGrantType: Schema.optional(Schema.String),
  clientId: Schema.optional(Schema.String),
  clientSecret: Schema.optional(Schema.String),
  secretVersionForClientSecret: Schema.optional(Schema.String),
  tokenEndpoint: Schema.optional(Schema.String),
  scopes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolAuthenticationOAuthConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolAuthenticationOAuthConfig>;

export interface GoogleCloudDialogflowCxV3beta1ToolAuthenticationServiceAgentAuthConfig {
  serviceAgentAuth?: "SERVICE_AGENT_AUTH_UNSPECIFIED" | "ID_TOKEN" | "ACCESS_TOKEN" | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1ToolAuthenticationServiceAgentAuthConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolAuthenticationServiceAgentAuthConfig> = Schema.suspend(() => Schema.Struct({
  serviceAgentAuth: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolAuthenticationServiceAgentAuthConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolAuthenticationServiceAgentAuthConfig>;

export interface GoogleCloudDialogflowCxV3beta1ToolAuthenticationBearerTokenConfig {
  token?: string;
  secretVersionForToken?: string;
}

export const GoogleCloudDialogflowCxV3beta1ToolAuthenticationBearerTokenConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolAuthenticationBearerTokenConfig> = Schema.suspend(() => Schema.Struct({
  token: Schema.optional(Schema.String),
  secretVersionForToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolAuthenticationBearerTokenConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolAuthenticationBearerTokenConfig>;

export interface GoogleCloudDialogflowCxV3beta1ToolAuthenticationServiceAccountAuthConfig {
  serviceAccount?: string;
}

export const GoogleCloudDialogflowCxV3beta1ToolAuthenticationServiceAccountAuthConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolAuthenticationServiceAccountAuthConfig> = Schema.suspend(() => Schema.Struct({
  serviceAccount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolAuthenticationServiceAccountAuthConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolAuthenticationServiceAccountAuthConfig>;

export interface GoogleCloudDialogflowCxV3beta1ToolAuthentication {
  apiKeyConfig?: GoogleCloudDialogflowCxV3beta1ToolAuthenticationApiKeyConfig;
  oauthConfig?: GoogleCloudDialogflowCxV3beta1ToolAuthenticationOAuthConfig;
  serviceAgentAuthConfig?: GoogleCloudDialogflowCxV3beta1ToolAuthenticationServiceAgentAuthConfig;
  bearerTokenConfig?: GoogleCloudDialogflowCxV3beta1ToolAuthenticationBearerTokenConfig;
  serviceAccountAuthConfig?: GoogleCloudDialogflowCxV3beta1ToolAuthenticationServiceAccountAuthConfig;
}

export const GoogleCloudDialogflowCxV3beta1ToolAuthentication: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolAuthentication> = Schema.suspend(() => Schema.Struct({
  apiKeyConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolAuthenticationApiKeyConfig),
  oauthConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolAuthenticationOAuthConfig),
  serviceAgentAuthConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolAuthenticationServiceAgentAuthConfig),
  bearerTokenConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolAuthenticationBearerTokenConfig),
  serviceAccountAuthConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolAuthenticationServiceAccountAuthConfig),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolAuthentication" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolAuthentication>;

export interface GoogleCloudDialogflowCxV3beta1ToolTLSConfigCACert {
  displayName?: string;
  cert?: string;
}

export const GoogleCloudDialogflowCxV3beta1ToolTLSConfigCACert: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolTLSConfigCACert> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  cert: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolTLSConfigCACert" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolTLSConfigCACert>;

export interface GoogleCloudDialogflowCxV3beta1ToolTLSConfig {
  caCerts?: Array<GoogleCloudDialogflowCxV3beta1ToolTLSConfigCACert>;
}

export const GoogleCloudDialogflowCxV3beta1ToolTLSConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolTLSConfig> = Schema.suspend(() => Schema.Struct({
  caCerts: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ToolTLSConfigCACert)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolTLSConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolTLSConfig>;

export interface GoogleCloudDialogflowCxV3beta1ToolServiceDirectoryConfig {
  service?: string;
}

export const GoogleCloudDialogflowCxV3beta1ToolServiceDirectoryConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolServiceDirectoryConfig> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolServiceDirectoryConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolServiceDirectoryConfig>;

export interface GoogleCloudDialogflowCxV3beta1ToolOpenApiTool {
  textSchema?: string;
  authentication?: GoogleCloudDialogflowCxV3beta1ToolAuthentication;
  tlsConfig?: GoogleCloudDialogflowCxV3beta1ToolTLSConfig;
  serviceDirectoryConfig?: GoogleCloudDialogflowCxV3beta1ToolServiceDirectoryConfig;
}

export const GoogleCloudDialogflowCxV3beta1ToolOpenApiTool: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolOpenApiTool> = Schema.suspend(() => Schema.Struct({
  textSchema: Schema.optional(Schema.String),
  authentication: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolAuthentication),
  tlsConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolTLSConfig),
  serviceDirectoryConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolServiceDirectoryConfig),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolOpenApiTool" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolOpenApiTool>;

export interface GoogleCloudDialogflowCxV3beta1ToolDataStoreToolFallbackPrompt {
}

export const GoogleCloudDialogflowCxV3beta1ToolDataStoreToolFallbackPrompt: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolDataStoreToolFallbackPrompt> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolDataStoreToolFallbackPrompt" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolDataStoreToolFallbackPrompt>;

export interface GoogleCloudDialogflowCxV3beta1ToolDataStoreTool {
  dataStoreConnections?: Array<GoogleCloudDialogflowCxV3beta1DataStoreConnection>;
  fallbackPrompt?: GoogleCloudDialogflowCxV3beta1ToolDataStoreToolFallbackPrompt;
}

export const GoogleCloudDialogflowCxV3beta1ToolDataStoreTool: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolDataStoreTool> = Schema.suspend(() => Schema.Struct({
  dataStoreConnections: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1DataStoreConnection)),
  fallbackPrompt: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolDataStoreToolFallbackPrompt),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolDataStoreTool" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolDataStoreTool>;

export interface GoogleCloudDialogflowCxV3beta1ToolExtensionTool {
  name?: string;
}

export const GoogleCloudDialogflowCxV3beta1ToolExtensionTool: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolExtensionTool> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolExtensionTool" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolExtensionTool>;

export interface GoogleCloudDialogflowCxV3beta1ToolFunctionTool {
  inputSchema?: Record<string, unknown>;
  outputSchema?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3beta1ToolFunctionTool: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolFunctionTool> = Schema.suspend(() => Schema.Struct({
  inputSchema: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  outputSchema: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolFunctionTool" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolFunctionTool>;

export interface GoogleCloudDialogflowCxV3beta1ToolConnectorToolActionEntityOperation {
  entityId?: string;
  operation?: "OPERATION_TYPE_UNSPECIFIED" | "LIST" | "GET" | "CREATE" | "UPDATE" | "DELETE" | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1ToolConnectorToolActionEntityOperation: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolConnectorToolActionEntityOperation> = Schema.suspend(() => Schema.Struct({
  entityId: Schema.optional(Schema.String),
  operation: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolConnectorToolActionEntityOperation" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolConnectorToolActionEntityOperation>;

export interface GoogleCloudDialogflowCxV3beta1ToolConnectorToolAction {
  connectionActionId?: string;
  entityOperation?: GoogleCloudDialogflowCxV3beta1ToolConnectorToolActionEntityOperation;
  inputFields?: Array<string>;
  outputFields?: Array<string>;
}

export const GoogleCloudDialogflowCxV3beta1ToolConnectorToolAction: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolConnectorToolAction> = Schema.suspend(() => Schema.Struct({
  connectionActionId: Schema.optional(Schema.String),
  entityOperation: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolConnectorToolActionEntityOperation),
  inputFields: Schema.optional(Schema.Array(Schema.String)),
  outputFields: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolConnectorToolAction" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolConnectorToolAction>;

export interface GoogleCloudDialogflowCxV3beta1ToolEndUserAuthConfigOauth2AuthCodeConfig {
  oauthToken?: string;
}

export const GoogleCloudDialogflowCxV3beta1ToolEndUserAuthConfigOauth2AuthCodeConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolEndUserAuthConfigOauth2AuthCodeConfig> = Schema.suspend(() => Schema.Struct({
  oauthToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolEndUserAuthConfigOauth2AuthCodeConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolEndUserAuthConfigOauth2AuthCodeConfig>;

export interface GoogleCloudDialogflowCxV3beta1ToolEndUserAuthConfigOauth2JwtBearerConfig {
  issuer?: string;
  subject?: string;
  clientKey?: string;
}

export const GoogleCloudDialogflowCxV3beta1ToolEndUserAuthConfigOauth2JwtBearerConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolEndUserAuthConfigOauth2JwtBearerConfig> = Schema.suspend(() => Schema.Struct({
  issuer: Schema.optional(Schema.String),
  subject: Schema.optional(Schema.String),
  clientKey: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolEndUserAuthConfigOauth2JwtBearerConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolEndUserAuthConfigOauth2JwtBearerConfig>;

export interface GoogleCloudDialogflowCxV3beta1ToolEndUserAuthConfig {
  oauth2AuthCodeConfig?: GoogleCloudDialogflowCxV3beta1ToolEndUserAuthConfigOauth2AuthCodeConfig;
  oauth2JwtBearerConfig?: GoogleCloudDialogflowCxV3beta1ToolEndUserAuthConfigOauth2JwtBearerConfig;
}

export const GoogleCloudDialogflowCxV3beta1ToolEndUserAuthConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolEndUserAuthConfig> = Schema.suspend(() => Schema.Struct({
  oauth2AuthCodeConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolEndUserAuthConfigOauth2AuthCodeConfig),
  oauth2JwtBearerConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolEndUserAuthConfigOauth2JwtBearerConfig),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolEndUserAuthConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolEndUserAuthConfig>;

export interface GoogleCloudDialogflowCxV3beta1ToolConnectorTool {
  name?: string;
  actions?: Array<GoogleCloudDialogflowCxV3beta1ToolConnectorToolAction>;
  endUserAuthConfig?: GoogleCloudDialogflowCxV3beta1ToolEndUserAuthConfig;
}

export const GoogleCloudDialogflowCxV3beta1ToolConnectorTool: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolConnectorTool> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  actions: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ToolConnectorToolAction)),
  endUserAuthConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolEndUserAuthConfig),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolConnectorTool" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolConnectorTool>;

export interface GoogleCloudDialogflowCxV3beta1Tool {
  name?: string;
  displayName?: string;
  description?: string;
  openApiSpec?: GoogleCloudDialogflowCxV3beta1ToolOpenApiTool;
  dataStoreSpec?: GoogleCloudDialogflowCxV3beta1ToolDataStoreTool;
  extensionSpec?: GoogleCloudDialogflowCxV3beta1ToolExtensionTool;
  functionSpec?: GoogleCloudDialogflowCxV3beta1ToolFunctionTool;
  connectorSpec?: GoogleCloudDialogflowCxV3beta1ToolConnectorTool;
  toolType?: "TOOL_TYPE_UNSPECIFIED" | "CUSTOMIZED_TOOL" | "BUILTIN_TOOL" | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1Tool: Schema.Schema<GoogleCloudDialogflowCxV3beta1Tool> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  openApiSpec: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolOpenApiTool),
  dataStoreSpec: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolDataStoreTool),
  extensionSpec: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolExtensionTool),
  functionSpec: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolFunctionTool),
  connectorSpec: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolConnectorTool),
  toolType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Tool" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Tool>;

export interface GoogleCloudDialogflowCxV3beta1ListToolsResponse {
  tools?: Array<GoogleCloudDialogflowCxV3beta1Tool>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3beta1ListToolsResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ListToolsResponse> = Schema.suspend(() => Schema.Struct({
  tools: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1Tool)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ListToolsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ListToolsResponse>;

export interface GoogleCloudDialogflowCxV3beta1ExportToolsRequest {
  tools?: Array<string>;
  toolsUri?: string;
  toolsContentInline?: boolean;
  dataFormat?: "DATA_FORMAT_UNSPECIFIED" | "BLOB" | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1ExportToolsRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportToolsRequest> = Schema.suspend(() => Schema.Struct({
  tools: Schema.optional(Schema.Array(Schema.String)),
  toolsUri: Schema.optional(Schema.String),
  toolsContentInline: Schema.optional(Schema.Boolean),
  dataFormat: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExportToolsRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportToolsRequest>;

export interface GoogleCloudDialogflowCxV3beta1ToolVersion {
  name?: string;
  displayName?: string;
  tool?: GoogleCloudDialogflowCxV3beta1Tool;
  createTime?: string;
  updateTime?: string;
}

export const GoogleCloudDialogflowCxV3beta1ToolVersion: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolVersion> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  tool: Schema.optional(GoogleCloudDialogflowCxV3beta1Tool),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolVersion" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolVersion>;

export interface GoogleCloudDialogflowCxV3beta1ListToolVersionsResponse {
  toolVersions?: Array<GoogleCloudDialogflowCxV3beta1ToolVersion>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3beta1ListToolVersionsResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ListToolVersionsResponse> = Schema.suspend(() => Schema.Struct({
  toolVersions: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ToolVersion)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ListToolVersionsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ListToolVersionsResponse>;

export interface GoogleCloudDialogflowCxV3beta1RestoreToolVersionRequest {
}

export const GoogleCloudDialogflowCxV3beta1RestoreToolVersionRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1RestoreToolVersionRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1RestoreToolVersionRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1RestoreToolVersionRequest>;

export interface GoogleCloudDialogflowCxV3beta1RestoreToolVersionResponse {
  tool?: GoogleCloudDialogflowCxV3beta1Tool;
}

export const GoogleCloudDialogflowCxV3beta1RestoreToolVersionResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1RestoreToolVersionResponse> = Schema.suspend(() => Schema.Struct({
  tool: Schema.optional(GoogleCloudDialogflowCxV3beta1Tool),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1RestoreToolVersionResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1RestoreToolVersionResponse>;

export interface GoogleCloudDialogflowCxV3beta1Version {
  name?: string;
  displayName?: string;
  description?: string;
  nluSettings?: GoogleCloudDialogflowCxV3beta1NluSettings;
  createTime?: string;
  state?: "STATE_UNSPECIFIED" | "RUNNING" | "SUCCEEDED" | "FAILED" | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1Version: Schema.Schema<GoogleCloudDialogflowCxV3beta1Version> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  nluSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1NluSettings),
  createTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Version" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Version>;

export interface GoogleCloudDialogflowCxV3beta1ListVersionsResponse {
  versions?: Array<GoogleCloudDialogflowCxV3beta1Version>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3beta1ListVersionsResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ListVersionsResponse> = Schema.suspend(() => Schema.Struct({
  versions: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1Version)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ListVersionsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ListVersionsResponse>;

export interface GoogleCloudDialogflowCxV3beta1LoadVersionRequest {
  allowOverrideAgentResources?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1LoadVersionRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1LoadVersionRequest> = Schema.suspend(() => Schema.Struct({
  allowOverrideAgentResources: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1LoadVersionRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1LoadVersionRequest>;

export interface GoogleCloudDialogflowCxV3beta1CompareVersionsRequest {
  targetVersion?: string;
  languageCode?: string;
}

export const GoogleCloudDialogflowCxV3beta1CompareVersionsRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1CompareVersionsRequest> = Schema.suspend(() => Schema.Struct({
  targetVersion: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1CompareVersionsRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1CompareVersionsRequest>;

export interface GoogleCloudDialogflowCxV3beta1CompareVersionsResponse {
  baseVersionContentJson?: string;
  targetVersionContentJson?: string;
  compareTime?: string;
}

export const GoogleCloudDialogflowCxV3beta1CompareVersionsResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1CompareVersionsResponse> = Schema.suspend(() => Schema.Struct({
  baseVersionContentJson: Schema.optional(Schema.String),
  targetVersionContentJson: Schema.optional(Schema.String),
  compareTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1CompareVersionsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1CompareVersionsResponse>;

export interface GoogleCloudLocationLocation {
  name?: string;
  locationId?: string;
  displayName?: string;
  labels?: Record<string, string>;
  metadata?: Record<string, unknown>;
}

export const GoogleCloudLocationLocation: Schema.Schema<GoogleCloudLocationLocation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudLocationLocation" }) as any as Schema.Schema<GoogleCloudLocationLocation>;

export interface GoogleCloudLocationListLocationsResponse {
  locations?: Array<GoogleCloudLocationLocation>;
  nextPageToken?: string;
}

export const GoogleCloudLocationListLocationsResponse: Schema.Schema<GoogleCloudLocationListLocationsResponse> = Schema.suspend(() => Schema.Struct({
  locations: Schema.optional(Schema.Array(GoogleCloudLocationLocation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudLocationListLocationsResponse" }) as any as Schema.Schema<GoogleCloudLocationListLocationsResponse>;

export interface GoogleCloudDialogflowCxV3CreateVersionOperationMetadata {
  version?: string;
}

export const GoogleCloudDialogflowCxV3CreateVersionOperationMetadata: Schema.Schema<GoogleCloudDialogflowCxV3CreateVersionOperationMetadata> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3CreateVersionOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3CreateVersionOperationMetadata>;

export interface GoogleCloudDialogflowCxV3ExportAgentResponse {
  agentUri?: string;
  agentContent?: string;
  commitSha?: string;
}

export const GoogleCloudDialogflowCxV3ExportAgentResponse: Schema.Schema<GoogleCloudDialogflowCxV3ExportAgentResponse> = Schema.suspend(() => Schema.Struct({
  agentUri: Schema.optional(Schema.String),
  agentContent: Schema.optional(Schema.String),
  commitSha: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ExportAgentResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportAgentResponse>;

export interface GoogleCloudDialogflowCxV3ExportFlowResponse {
  flowUri?: string;
  flowContent?: string;
}

export const GoogleCloudDialogflowCxV3ExportFlowResponse: Schema.Schema<GoogleCloudDialogflowCxV3ExportFlowResponse> = Schema.suspend(() => Schema.Struct({
  flowUri: Schema.optional(Schema.String),
  flowContent: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ExportFlowResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportFlowResponse>;

export interface GoogleCloudDialogflowCxV3ExportIntentsMetadata {
}

export const GoogleCloudDialogflowCxV3ExportIntentsMetadata: Schema.Schema<GoogleCloudDialogflowCxV3ExportIntentsMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ExportIntentsMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportIntentsMetadata>;

export interface GoogleCloudDialogflowCxV3InlineDestination {
  content?: string;
}

export const GoogleCloudDialogflowCxV3InlineDestination: Schema.Schema<GoogleCloudDialogflowCxV3InlineDestination> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3InlineDestination" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3InlineDestination>;

export interface GoogleCloudDialogflowCxV3ExportIntentsResponse {
  intentsUri?: string;
  intentsContent?: GoogleCloudDialogflowCxV3InlineDestination;
}

export const GoogleCloudDialogflowCxV3ExportIntentsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ExportIntentsResponse> = Schema.suspend(() => Schema.Struct({
  intentsUri: Schema.optional(Schema.String),
  intentsContent: Schema.optional(GoogleCloudDialogflowCxV3InlineDestination),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ExportIntentsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportIntentsResponse>;

export interface GoogleCloudDialogflowCxV3ImportFlowResponse {
  flow?: string;
}

export const GoogleCloudDialogflowCxV3ImportFlowResponse: Schema.Schema<GoogleCloudDialogflowCxV3ImportFlowResponse> = Schema.suspend(() => Schema.Struct({
  flow: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ImportFlowResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportFlowResponse>;

export interface GoogleCloudDialogflowCxV3ImportEntityTypesMetadata {
}

export const GoogleCloudDialogflowCxV3ImportEntityTypesMetadata: Schema.Schema<GoogleCloudDialogflowCxV3ImportEntityTypesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ImportEntityTypesMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportEntityTypesMetadata>;

export interface GoogleCloudDialogflowCxV3ImportEntityTypesResponseConflictingResources {
  entityTypeDisplayNames?: Array<string>;
  entityDisplayNames?: Array<string>;
}

export const GoogleCloudDialogflowCxV3ImportEntityTypesResponseConflictingResources: Schema.Schema<GoogleCloudDialogflowCxV3ImportEntityTypesResponseConflictingResources> = Schema.suspend(() => Schema.Struct({
  entityTypeDisplayNames: Schema.optional(Schema.Array(Schema.String)),
  entityDisplayNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ImportEntityTypesResponseConflictingResources" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportEntityTypesResponseConflictingResources>;

export interface GoogleCloudDialogflowCxV3ImportEntityTypesResponse {
  entityTypes?: Array<string>;
  conflictingResources?: GoogleCloudDialogflowCxV3ImportEntityTypesResponseConflictingResources;
}

export const GoogleCloudDialogflowCxV3ImportEntityTypesResponse: Schema.Schema<GoogleCloudDialogflowCxV3ImportEntityTypesResponse> = Schema.suspend(() => Schema.Struct({
  entityTypes: Schema.optional(Schema.Array(Schema.String)),
  conflictingResources: Schema.optional(GoogleCloudDialogflowCxV3ImportEntityTypesResponseConflictingResources),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ImportEntityTypesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportEntityTypesResponse>;

export interface GoogleCloudDialogflowCxV3ExportEntityTypesMetadata {
}

export const GoogleCloudDialogflowCxV3ExportEntityTypesMetadata: Schema.Schema<GoogleCloudDialogflowCxV3ExportEntityTypesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ExportEntityTypesMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportEntityTypesMetadata>;

export interface GoogleCloudDialogflowCxV3ExportEntityTypesResponse {
  entityTypesUri?: string;
  entityTypesContent?: GoogleCloudDialogflowCxV3InlineDestination;
}

export const GoogleCloudDialogflowCxV3ExportEntityTypesResponse: Schema.Schema<GoogleCloudDialogflowCxV3ExportEntityTypesResponse> = Schema.suspend(() => Schema.Struct({
  entityTypesUri: Schema.optional(Schema.String),
  entityTypesContent: Schema.optional(GoogleCloudDialogflowCxV3InlineDestination),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ExportEntityTypesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportEntityTypesResponse>;

export interface GoogleCloudDialogflowCxV3ImportIntentsMetadata {
}

export const GoogleCloudDialogflowCxV3ImportIntentsMetadata: Schema.Schema<GoogleCloudDialogflowCxV3ImportIntentsMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ImportIntentsMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportIntentsMetadata>;

export interface GoogleCloudDialogflowCxV3ImportIntentsResponseConflictingResources {
  intentDisplayNames?: Array<string>;
  entityDisplayNames?: Array<string>;
}

export const GoogleCloudDialogflowCxV3ImportIntentsResponseConflictingResources: Schema.Schema<GoogleCloudDialogflowCxV3ImportIntentsResponseConflictingResources> = Schema.suspend(() => Schema.Struct({
  intentDisplayNames: Schema.optional(Schema.Array(Schema.String)),
  entityDisplayNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ImportIntentsResponseConflictingResources" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportIntentsResponseConflictingResources>;

export interface GoogleCloudDialogflowCxV3ImportIntentsResponse {
  intents?: Array<string>;
  conflictingResources?: GoogleCloudDialogflowCxV3ImportIntentsResponseConflictingResources;
}

export const GoogleCloudDialogflowCxV3ImportIntentsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ImportIntentsResponse> = Schema.suspend(() => Schema.Struct({
  intents: Schema.optional(Schema.Array(Schema.String)),
  conflictingResources: Schema.optional(GoogleCloudDialogflowCxV3ImportIntentsResponseConflictingResources),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ImportIntentsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportIntentsResponse>;

export interface GoogleCloudDialogflowCxV3WebhookRequestFulfillmentInfo {
  tag?: string;
}

export const GoogleCloudDialogflowCxV3WebhookRequestFulfillmentInfo: Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequestFulfillmentInfo> = Schema.suspend(() => Schema.Struct({
  tag: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3WebhookRequestFulfillmentInfo" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequestFulfillmentInfo>;

export interface GoogleCloudDialogflowCxV3WebhookRequestIntentInfoIntentParameterValue {
  originalValue?: string;
  resolvedValue?: unknown;
}

export const GoogleCloudDialogflowCxV3WebhookRequestIntentInfoIntentParameterValue: Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequestIntentInfoIntentParameterValue> = Schema.suspend(() => Schema.Struct({
  originalValue: Schema.optional(Schema.String),
  resolvedValue: Schema.optional(Schema.Unknown),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3WebhookRequestIntentInfoIntentParameterValue" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequestIntentInfoIntentParameterValue>;

export interface GoogleCloudDialogflowCxV3WebhookRequestIntentInfo {
  lastMatchedIntent?: string;
  displayName?: string;
  parameters?: Record<string, GoogleCloudDialogflowCxV3WebhookRequestIntentInfoIntentParameterValue>;
  confidence?: number;
}

export const GoogleCloudDialogflowCxV3WebhookRequestIntentInfo: Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequestIntentInfo> = Schema.suspend(() => Schema.Struct({
  lastMatchedIntent: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Record(Schema.String, GoogleCloudDialogflowCxV3WebhookRequestIntentInfoIntentParameterValue)),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3WebhookRequestIntentInfo" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequestIntentInfo>;

export interface GoogleCloudDialogflowCxV3PageInfoFormInfoParameterInfo {
  displayName?: string;
  required?: boolean;
  state?: "PARAMETER_STATE_UNSPECIFIED" | "EMPTY" | "INVALID" | "FILLED" | (string & {});
  value?: unknown;
  justCollected?: boolean;
}

export const GoogleCloudDialogflowCxV3PageInfoFormInfoParameterInfo: Schema.Schema<GoogleCloudDialogflowCxV3PageInfoFormInfoParameterInfo> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  required: Schema.optional(Schema.Boolean),
  state: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Unknown),
  justCollected: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3PageInfoFormInfoParameterInfo" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3PageInfoFormInfoParameterInfo>;

export interface GoogleCloudDialogflowCxV3PageInfoFormInfo {
  parameterInfo?: Array<GoogleCloudDialogflowCxV3PageInfoFormInfoParameterInfo>;
}

export const GoogleCloudDialogflowCxV3PageInfoFormInfo: Schema.Schema<GoogleCloudDialogflowCxV3PageInfoFormInfo> = Schema.suspend(() => Schema.Struct({
  parameterInfo: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3PageInfoFormInfoParameterInfo)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3PageInfoFormInfo" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3PageInfoFormInfo>;

export interface GoogleCloudDialogflowCxV3PageInfo {
  currentPage?: string;
  displayName?: string;
  formInfo?: GoogleCloudDialogflowCxV3PageInfoFormInfo;
}

export const GoogleCloudDialogflowCxV3PageInfo: Schema.Schema<GoogleCloudDialogflowCxV3PageInfo> = Schema.suspend(() => Schema.Struct({
  currentPage: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  formInfo: Schema.optional(GoogleCloudDialogflowCxV3PageInfoFormInfo),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3PageInfo" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3PageInfo>;

export interface GoogleCloudDialogflowCxV3SessionInfo {
  session?: string;
  parameters?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3SessionInfo: Schema.Schema<GoogleCloudDialogflowCxV3SessionInfo> = Schema.suspend(() => Schema.Struct({
  session: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3SessionInfo" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SessionInfo>;

export interface GoogleCloudDialogflowCxV3ResponseMessageText {
  text?: Array<string>;
  allowPlaybackInterruption?: boolean;
}

export const GoogleCloudDialogflowCxV3ResponseMessageText: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageText> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.Array(Schema.String)),
  allowPlaybackInterruption: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ResponseMessageText" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageText>;

export interface GoogleCloudDialogflowCxV3ResponseMessageConversationSuccess {
  metadata?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3ResponseMessageConversationSuccess: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageConversationSuccess> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ResponseMessageConversationSuccess" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageConversationSuccess>;

export interface GoogleCloudDialogflowCxV3ResponseMessageOutputAudioText {
  text?: string;
  ssml?: string;
  allowPlaybackInterruption?: boolean;
}

export const GoogleCloudDialogflowCxV3ResponseMessageOutputAudioText: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageOutputAudioText> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  ssml: Schema.optional(Schema.String),
  allowPlaybackInterruption: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ResponseMessageOutputAudioText" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageOutputAudioText>;

export interface GoogleCloudDialogflowCxV3ResponseMessageLiveAgentHandoff {
  metadata?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3ResponseMessageLiveAgentHandoff: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageLiveAgentHandoff> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ResponseMessageLiveAgentHandoff" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageLiveAgentHandoff>;

export interface GoogleCloudDialogflowCxV3ResponseMessageEndInteraction {
}

export const GoogleCloudDialogflowCxV3ResponseMessageEndInteraction: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageEndInteraction> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ResponseMessageEndInteraction" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageEndInteraction>;

export interface GoogleCloudDialogflowCxV3ResponseMessagePlayAudio {
  audioUri?: string;
  allowPlaybackInterruption?: boolean;
}

export const GoogleCloudDialogflowCxV3ResponseMessagePlayAudio: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessagePlayAudio> = Schema.suspend(() => Schema.Struct({
  audioUri: Schema.optional(Schema.String),
  allowPlaybackInterruption: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ResponseMessagePlayAudio" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessagePlayAudio>;

export interface GoogleCloudDialogflowCxV3ResponseMessageMixedAudioSegment {
  audio?: string;
  uri?: string;
  allowPlaybackInterruption?: boolean;
}

export const GoogleCloudDialogflowCxV3ResponseMessageMixedAudioSegment: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageMixedAudioSegment> = Schema.suspend(() => Schema.Struct({
  audio: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  allowPlaybackInterruption: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ResponseMessageMixedAudioSegment" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageMixedAudioSegment>;

export interface GoogleCloudDialogflowCxV3ResponseMessageMixedAudio {
  segments?: Array<GoogleCloudDialogflowCxV3ResponseMessageMixedAudioSegment>;
}

export const GoogleCloudDialogflowCxV3ResponseMessageMixedAudio: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageMixedAudio> = Schema.suspend(() => Schema.Struct({
  segments: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3ResponseMessageMixedAudioSegment)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ResponseMessageMixedAudio" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageMixedAudio>;

export interface GoogleCloudDialogflowCxV3ResponseMessageTelephonyTransferCall {
  phoneNumber?: string;
}

export const GoogleCloudDialogflowCxV3ResponseMessageTelephonyTransferCall: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageTelephonyTransferCall> = Schema.suspend(() => Schema.Struct({
  phoneNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ResponseMessageTelephonyTransferCall" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageTelephonyTransferCall>;

export interface GoogleCloudDialogflowCxV3ResponseMessageKnowledgeInfoCard {
}

export const GoogleCloudDialogflowCxV3ResponseMessageKnowledgeInfoCard: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageKnowledgeInfoCard> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ResponseMessageKnowledgeInfoCard" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageKnowledgeInfoCard>;

export interface GoogleCloudDialogflowCxV3ToolCall {
  tool?: string;
  action?: string;
  inputParameters?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3ToolCall: Schema.Schema<GoogleCloudDialogflowCxV3ToolCall> = Schema.suspend(() => Schema.Struct({
  tool: Schema.optional(Schema.String),
  action: Schema.optional(Schema.String),
  inputParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ToolCall" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolCall>;

export interface GoogleCloudDialogflowCxV3ResponseMessage {
  text?: GoogleCloudDialogflowCxV3ResponseMessageText;
  payload?: Record<string, unknown>;
  conversationSuccess?: GoogleCloudDialogflowCxV3ResponseMessageConversationSuccess;
  outputAudioText?: GoogleCloudDialogflowCxV3ResponseMessageOutputAudioText;
  liveAgentHandoff?: GoogleCloudDialogflowCxV3ResponseMessageLiveAgentHandoff;
  endInteraction?: GoogleCloudDialogflowCxV3ResponseMessageEndInteraction;
  playAudio?: GoogleCloudDialogflowCxV3ResponseMessagePlayAudio;
  mixedAudio?: GoogleCloudDialogflowCxV3ResponseMessageMixedAudio;
  telephonyTransferCall?: GoogleCloudDialogflowCxV3ResponseMessageTelephonyTransferCall;
  knowledgeInfoCard?: GoogleCloudDialogflowCxV3ResponseMessageKnowledgeInfoCard;
  toolCall?: GoogleCloudDialogflowCxV3ToolCall;
  responseType?: "RESPONSE_TYPE_UNSPECIFIED" | "ENTRY_PROMPT" | "PARAMETER_PROMPT" | "HANDLER_PROMPT" | (string & {});
  channel?: string;
}

export const GoogleCloudDialogflowCxV3ResponseMessage: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessage> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(GoogleCloudDialogflowCxV3ResponseMessageText),
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  conversationSuccess: Schema.optional(GoogleCloudDialogflowCxV3ResponseMessageConversationSuccess),
  outputAudioText: Schema.optional(GoogleCloudDialogflowCxV3ResponseMessageOutputAudioText),
  liveAgentHandoff: Schema.optional(GoogleCloudDialogflowCxV3ResponseMessageLiveAgentHandoff),
  endInteraction: Schema.optional(GoogleCloudDialogflowCxV3ResponseMessageEndInteraction),
  playAudio: Schema.optional(GoogleCloudDialogflowCxV3ResponseMessagePlayAudio),
  mixedAudio: Schema.optional(GoogleCloudDialogflowCxV3ResponseMessageMixedAudio),
  telephonyTransferCall: Schema.optional(GoogleCloudDialogflowCxV3ResponseMessageTelephonyTransferCall),
  knowledgeInfoCard: Schema.optional(GoogleCloudDialogflowCxV3ResponseMessageKnowledgeInfoCard),
  toolCall: Schema.optional(GoogleCloudDialogflowCxV3ToolCall),
  responseType: Schema.optional(Schema.String),
  channel: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ResponseMessage" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessage>;

export interface GoogleCloudDialogflowCxV3WebhookRequestSentimentAnalysisResult {
  score?: number;
  magnitude?: number;
}

export const GoogleCloudDialogflowCxV3WebhookRequestSentimentAnalysisResult: Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequestSentimentAnalysisResult> = Schema.suspend(() => Schema.Struct({
  score: Schema.optional(Schema.Number),
  magnitude: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3WebhookRequestSentimentAnalysisResult" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequestSentimentAnalysisResult>;

export interface GoogleCloudDialogflowCxV3LanguageInfo {
  inputLanguageCode?: string;
  resolvedLanguageCode?: string;
  confidenceScore?: number;
}

export const GoogleCloudDialogflowCxV3LanguageInfo: Schema.Schema<GoogleCloudDialogflowCxV3LanguageInfo> = Schema.suspend(() => Schema.Struct({
  inputLanguageCode: Schema.optional(Schema.String),
  resolvedLanguageCode: Schema.optional(Schema.String),
  confidenceScore: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3LanguageInfo" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3LanguageInfo>;

export interface GoogleCloudDialogflowCxV3WebhookRequest {
  detectIntentResponseId?: string;
  text?: string;
  triggerIntent?: string;
  transcript?: string;
  triggerEvent?: string;
  dtmfDigits?: string;
  languageCode?: string;
  fulfillmentInfo?: GoogleCloudDialogflowCxV3WebhookRequestFulfillmentInfo;
  intentInfo?: GoogleCloudDialogflowCxV3WebhookRequestIntentInfo;
  pageInfo?: GoogleCloudDialogflowCxV3PageInfo;
  sessionInfo?: GoogleCloudDialogflowCxV3SessionInfo;
  messages?: Array<GoogleCloudDialogflowCxV3ResponseMessage>;
  payload?: Record<string, unknown>;
  sentimentAnalysisResult?: GoogleCloudDialogflowCxV3WebhookRequestSentimentAnalysisResult;
  languageInfo?: GoogleCloudDialogflowCxV3LanguageInfo;
}

export const GoogleCloudDialogflowCxV3WebhookRequest: Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequest> = Schema.suspend(() => Schema.Struct({
  detectIntentResponseId: Schema.optional(Schema.String),
  text: Schema.optional(Schema.String),
  triggerIntent: Schema.optional(Schema.String),
  transcript: Schema.optional(Schema.String),
  triggerEvent: Schema.optional(Schema.String),
  dtmfDigits: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  fulfillmentInfo: Schema.optional(GoogleCloudDialogflowCxV3WebhookRequestFulfillmentInfo),
  intentInfo: Schema.optional(GoogleCloudDialogflowCxV3WebhookRequestIntentInfo),
  pageInfo: Schema.optional(GoogleCloudDialogflowCxV3PageInfo),
  sessionInfo: Schema.optional(GoogleCloudDialogflowCxV3SessionInfo),
  messages: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3ResponseMessage)),
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  sentimentAnalysisResult: Schema.optional(GoogleCloudDialogflowCxV3WebhookRequestSentimentAnalysisResult),
  languageInfo: Schema.optional(GoogleCloudDialogflowCxV3LanguageInfo),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3WebhookRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequest>;

export interface GoogleCloudDialogflowCxV3WebhookResponseFulfillmentResponse {
  messages?: Array<GoogleCloudDialogflowCxV3ResponseMessage>;
  mergeBehavior?: "MERGE_BEHAVIOR_UNSPECIFIED" | "APPEND" | "REPLACE" | (string & {});
}

export const GoogleCloudDialogflowCxV3WebhookResponseFulfillmentResponse: Schema.Schema<GoogleCloudDialogflowCxV3WebhookResponseFulfillmentResponse> = Schema.suspend(() => Schema.Struct({
  messages: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3ResponseMessage)),
  mergeBehavior: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3WebhookResponseFulfillmentResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookResponseFulfillmentResponse>;

export interface GoogleCloudDialogflowCxV3WebhookResponse {
  fulfillmentResponse?: GoogleCloudDialogflowCxV3WebhookResponseFulfillmentResponse;
  pageInfo?: GoogleCloudDialogflowCxV3PageInfo;
  sessionInfo?: GoogleCloudDialogflowCxV3SessionInfo;
  payload?: Record<string, unknown>;
  targetPage?: string;
  targetFlow?: string;
}

export const GoogleCloudDialogflowCxV3WebhookResponse: Schema.Schema<GoogleCloudDialogflowCxV3WebhookResponse> = Schema.suspend(() => Schema.Struct({
  fulfillmentResponse: Schema.optional(GoogleCloudDialogflowCxV3WebhookResponseFulfillmentResponse),
  pageInfo: Schema.optional(GoogleCloudDialogflowCxV3PageInfo),
  sessionInfo: Schema.optional(GoogleCloudDialogflowCxV3SessionInfo),
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  targetPage: Schema.optional(Schema.String),
  targetFlow: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3WebhookResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookResponse>;

export interface GoogleCloudDialogflowCxV3TestError {
  testCase?: string;
  status?: GoogleRpcStatus;
  testTime?: string;
}

export const GoogleCloudDialogflowCxV3TestError: Schema.Schema<GoogleCloudDialogflowCxV3TestError> = Schema.suspend(() => Schema.Struct({
  testCase: Schema.optional(Schema.String),
  status: Schema.optional(GoogleRpcStatus),
  testTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3TestError" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TestError>;

export interface GoogleCloudDialogflowCxV3BatchRunTestCasesMetadata {
  errors?: Array<GoogleCloudDialogflowCxV3TestError>;
}

export const GoogleCloudDialogflowCxV3BatchRunTestCasesMetadata: Schema.Schema<GoogleCloudDialogflowCxV3BatchRunTestCasesMetadata> = Schema.suspend(() => Schema.Struct({
  errors: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3TestError)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3BatchRunTestCasesMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3BatchRunTestCasesMetadata>;

export interface GoogleCloudDialogflowCxV3TextInput {
  text?: string;
}

export const GoogleCloudDialogflowCxV3TextInput: Schema.Schema<GoogleCloudDialogflowCxV3TextInput> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3TextInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TextInput>;

export interface GoogleCloudDialogflowCxV3IntentInput {
  intent?: string;
}

export const GoogleCloudDialogflowCxV3IntentInput: Schema.Schema<GoogleCloudDialogflowCxV3IntentInput> = Schema.suspend(() => Schema.Struct({
  intent: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3IntentInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3IntentInput>;

export interface GoogleCloudDialogflowCxV3BargeInConfig {
  noBargeInDuration?: string;
  totalDuration?: string;
}

export const GoogleCloudDialogflowCxV3BargeInConfig: Schema.Schema<GoogleCloudDialogflowCxV3BargeInConfig> = Schema.suspend(() => Schema.Struct({
  noBargeInDuration: Schema.optional(Schema.String),
  totalDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3BargeInConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3BargeInConfig>;

export interface GoogleCloudDialogflowCxV3InputAudioConfig {
  audioEncoding?: "AUDIO_ENCODING_UNSPECIFIED" | "AUDIO_ENCODING_LINEAR_16" | "AUDIO_ENCODING_FLAC" | "AUDIO_ENCODING_MULAW" | "AUDIO_ENCODING_AMR" | "AUDIO_ENCODING_AMR_WB" | "AUDIO_ENCODING_OGG_OPUS" | "AUDIO_ENCODING_SPEEX_WITH_HEADER_BYTE" | "AUDIO_ENCODING_ALAW" | (string & {});
  sampleRateHertz?: number;
  enableWordInfo?: boolean;
  phraseHints?: Array<string>;
  model?: string;
  modelVariant?: "SPEECH_MODEL_VARIANT_UNSPECIFIED" | "USE_BEST_AVAILABLE" | "USE_STANDARD" | "USE_ENHANCED" | (string & {});
  singleUtterance?: boolean;
  bargeInConfig?: GoogleCloudDialogflowCxV3BargeInConfig;
  optOutConformerModelMigration?: boolean;
}

export const GoogleCloudDialogflowCxV3InputAudioConfig: Schema.Schema<GoogleCloudDialogflowCxV3InputAudioConfig> = Schema.suspend(() => Schema.Struct({
  audioEncoding: Schema.optional(Schema.String),
  sampleRateHertz: Schema.optional(Schema.Number),
  enableWordInfo: Schema.optional(Schema.Boolean),
  phraseHints: Schema.optional(Schema.Array(Schema.String)),
  model: Schema.optional(Schema.String),
  modelVariant: Schema.optional(Schema.String),
  singleUtterance: Schema.optional(Schema.Boolean),
  bargeInConfig: Schema.optional(GoogleCloudDialogflowCxV3BargeInConfig),
  optOutConformerModelMigration: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3InputAudioConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3InputAudioConfig>;

export interface GoogleCloudDialogflowCxV3AudioInput {
  config?: GoogleCloudDialogflowCxV3InputAudioConfig;
  audio?: string;
}

export const GoogleCloudDialogflowCxV3AudioInput: Schema.Schema<GoogleCloudDialogflowCxV3AudioInput> = Schema.suspend(() => Schema.Struct({
  config: Schema.optional(GoogleCloudDialogflowCxV3InputAudioConfig),
  audio: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3AudioInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AudioInput>;

export interface GoogleCloudDialogflowCxV3EventInput {
  event?: string;
}

export const GoogleCloudDialogflowCxV3EventInput: Schema.Schema<GoogleCloudDialogflowCxV3EventInput> = Schema.suspend(() => Schema.Struct({
  event: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3EventInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3EventInput>;

export interface GoogleCloudDialogflowCxV3DtmfInput {
  digits?: string;
  finishDigit?: string;
}

export const GoogleCloudDialogflowCxV3DtmfInput: Schema.Schema<GoogleCloudDialogflowCxV3DtmfInput> = Schema.suspend(() => Schema.Struct({
  digits: Schema.optional(Schema.String),
  finishDigit: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3DtmfInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DtmfInput>;

export interface GoogleCloudDialogflowCxV3ToolCallResultError {
  message?: string;
}

export const GoogleCloudDialogflowCxV3ToolCallResultError: Schema.Schema<GoogleCloudDialogflowCxV3ToolCallResultError> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ToolCallResultError" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolCallResultError>;

export interface GoogleCloudDialogflowCxV3ToolCallResult {
  tool?: string;
  action?: string;
  error?: GoogleCloudDialogflowCxV3ToolCallResultError;
  outputParameters?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3ToolCallResult: Schema.Schema<GoogleCloudDialogflowCxV3ToolCallResult> = Schema.suspend(() => Schema.Struct({
  tool: Schema.optional(Schema.String),
  action: Schema.optional(Schema.String),
  error: Schema.optional(GoogleCloudDialogflowCxV3ToolCallResultError),
  outputParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ToolCallResult" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolCallResult>;

export interface GoogleCloudDialogflowCxV3QueryInput {
  text?: GoogleCloudDialogflowCxV3TextInput;
  intent?: GoogleCloudDialogflowCxV3IntentInput;
  audio?: GoogleCloudDialogflowCxV3AudioInput;
  event?: GoogleCloudDialogflowCxV3EventInput;
  dtmf?: GoogleCloudDialogflowCxV3DtmfInput;
  toolCallResult?: GoogleCloudDialogflowCxV3ToolCallResult;
  languageCode?: string;
}

export const GoogleCloudDialogflowCxV3QueryInput: Schema.Schema<GoogleCloudDialogflowCxV3QueryInput> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(GoogleCloudDialogflowCxV3TextInput),
  intent: Schema.optional(GoogleCloudDialogflowCxV3IntentInput),
  audio: Schema.optional(GoogleCloudDialogflowCxV3AudioInput),
  event: Schema.optional(GoogleCloudDialogflowCxV3EventInput),
  dtmf: Schema.optional(GoogleCloudDialogflowCxV3DtmfInput),
  toolCallResult: Schema.optional(GoogleCloudDialogflowCxV3ToolCallResult),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3QueryInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3QueryInput>;

export interface GoogleCloudDialogflowCxV3ConversationTurnUserInput {
  input?: GoogleCloudDialogflowCxV3QueryInput;
  injectedParameters?: Record<string, unknown>;
  isWebhookEnabled?: boolean;
  enableSentimentAnalysis?: boolean;
}

export const GoogleCloudDialogflowCxV3ConversationTurnUserInput: Schema.Schema<GoogleCloudDialogflowCxV3ConversationTurnUserInput> = Schema.suspend(() => Schema.Struct({
  input: Schema.optional(GoogleCloudDialogflowCxV3QueryInput),
  injectedParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  isWebhookEnabled: Schema.optional(Schema.Boolean),
  enableSentimentAnalysis: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ConversationTurnUserInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ConversationTurnUserInput>;

export interface GoogleCloudDialogflowCxV3TestRunDifference {
  type?: "DIFF_TYPE_UNSPECIFIED" | "INTENT" | "PAGE" | "PARAMETERS" | "UTTERANCE" | "FLOW" | (string & {});
  description?: string;
}

export const GoogleCloudDialogflowCxV3TestRunDifference: Schema.Schema<GoogleCloudDialogflowCxV3TestRunDifference> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3TestRunDifference" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TestRunDifference>;

export interface GoogleCloudDialogflowCxV3IntentTrainingPhrasePart {
  text?: string;
  parameterId?: string;
}

export const GoogleCloudDialogflowCxV3IntentTrainingPhrasePart: Schema.Schema<GoogleCloudDialogflowCxV3IntentTrainingPhrasePart> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  parameterId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3IntentTrainingPhrasePart" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3IntentTrainingPhrasePart>;

export interface GoogleCloudDialogflowCxV3IntentTrainingPhrase {
  id?: string;
  parts?: Array<GoogleCloudDialogflowCxV3IntentTrainingPhrasePart>;
  repeatCount?: number;
}

export const GoogleCloudDialogflowCxV3IntentTrainingPhrase: Schema.Schema<GoogleCloudDialogflowCxV3IntentTrainingPhrase> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  parts: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3IntentTrainingPhrasePart)),
  repeatCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3IntentTrainingPhrase" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3IntentTrainingPhrase>;

export interface GoogleCloudDialogflowCxV3IntentParameter {
  id?: string;
  entityType?: string;
  isList?: boolean;
  redact?: boolean;
}

export const GoogleCloudDialogflowCxV3IntentParameter: Schema.Schema<GoogleCloudDialogflowCxV3IntentParameter> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  entityType: Schema.optional(Schema.String),
  isList: Schema.optional(Schema.Boolean),
  redact: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3IntentParameter" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3IntentParameter>;

export interface GoogleCloudDialogflowCxV3Intent {
  name?: string;
  displayName?: string;
  trainingPhrases?: Array<GoogleCloudDialogflowCxV3IntentTrainingPhrase>;
  parameters?: Array<GoogleCloudDialogflowCxV3IntentParameter>;
  priority?: number;
  isFallback?: boolean;
  labels?: Record<string, string>;
  description?: string;
}

export const GoogleCloudDialogflowCxV3Intent: Schema.Schema<GoogleCloudDialogflowCxV3Intent> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  trainingPhrases: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3IntentTrainingPhrase)),
  parameters: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3IntentParameter)),
  priority: Schema.optional(Schema.Number),
  isFallback: Schema.optional(Schema.Boolean),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3Intent" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Intent>;

export interface GoogleCloudDialogflowCxV3FulfillmentSetParameterAction {
  parameter?: string;
  value?: unknown;
}

export const GoogleCloudDialogflowCxV3FulfillmentSetParameterAction: Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentSetParameterAction> = Schema.suspend(() => Schema.Struct({
  parameter: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Unknown),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3FulfillmentSetParameterAction" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentSetParameterAction>;

export interface GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCaseCaseContent {
  message?: GoogleCloudDialogflowCxV3ResponseMessage;
  additionalCases?: GoogleCloudDialogflowCxV3FulfillmentConditionalCases;
}

export const GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCaseCaseContent: Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCaseCaseContent> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(GoogleCloudDialogflowCxV3ResponseMessage),
  additionalCases: Schema.optional(GoogleCloudDialogflowCxV3FulfillmentConditionalCases),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCaseCaseContent" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCaseCaseContent>;

export interface GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCase {
  condition?: string;
  caseContent?: Array<GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCaseCaseContent>;
}

export const GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCase: Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCase> = Schema.suspend(() => Schema.Struct({
  condition: Schema.optional(Schema.String),
  caseContent: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCaseCaseContent)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCase" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCase>;

export interface GoogleCloudDialogflowCxV3FulfillmentConditionalCases {
  cases?: Array<GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCase>;
}

export const GoogleCloudDialogflowCxV3FulfillmentConditionalCases: Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentConditionalCases> = Schema.suspend(() => Schema.Struct({
  cases: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCase)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3FulfillmentConditionalCases" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentConditionalCases>;

export interface GoogleCloudDialogflowCxV3GcsDestination {
  uri?: string;
}

export const GoogleCloudDialogflowCxV3GcsDestination: Schema.Schema<GoogleCloudDialogflowCxV3GcsDestination> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3GcsDestination" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3GcsDestination>;

export interface GoogleCloudDialogflowCxV3AdvancedSettingsSpeechSettings {
  endpointerSensitivity?: number;
  noSpeechTimeout?: string;
  useTimeoutBasedEndpointing?: boolean;
  models?: Record<string, string>;
}

export const GoogleCloudDialogflowCxV3AdvancedSettingsSpeechSettings: Schema.Schema<GoogleCloudDialogflowCxV3AdvancedSettingsSpeechSettings> = Schema.suspend(() => Schema.Struct({
  endpointerSensitivity: Schema.optional(Schema.Number),
  noSpeechTimeout: Schema.optional(Schema.String),
  useTimeoutBasedEndpointing: Schema.optional(Schema.Boolean),
  models: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3AdvancedSettingsSpeechSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AdvancedSettingsSpeechSettings>;

export interface GoogleCloudDialogflowCxV3AdvancedSettingsDtmfSettings {
  enabled?: boolean;
  maxDigits?: number;
  finishDigit?: string;
  interdigitTimeoutDuration?: string;
  endpointingTimeoutDuration?: string;
}

export const GoogleCloudDialogflowCxV3AdvancedSettingsDtmfSettings: Schema.Schema<GoogleCloudDialogflowCxV3AdvancedSettingsDtmfSettings> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  maxDigits: Schema.optional(Schema.Number),
  finishDigit: Schema.optional(Schema.String),
  interdigitTimeoutDuration: Schema.optional(Schema.String),
  endpointingTimeoutDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3AdvancedSettingsDtmfSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AdvancedSettingsDtmfSettings>;

export interface GoogleCloudDialogflowCxV3AdvancedSettingsLoggingSettings {
  enableStackdriverLogging?: boolean;
  enableInteractionLogging?: boolean;
  enableConsentBasedRedaction?: boolean;
}

export const GoogleCloudDialogflowCxV3AdvancedSettingsLoggingSettings: Schema.Schema<GoogleCloudDialogflowCxV3AdvancedSettingsLoggingSettings> = Schema.suspend(() => Schema.Struct({
  enableStackdriverLogging: Schema.optional(Schema.Boolean),
  enableInteractionLogging: Schema.optional(Schema.Boolean),
  enableConsentBasedRedaction: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3AdvancedSettingsLoggingSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AdvancedSettingsLoggingSettings>;

export interface GoogleCloudDialogflowCxV3AdvancedSettings {
  audioExportGcsDestination?: GoogleCloudDialogflowCxV3GcsDestination;
  speechSettings?: GoogleCloudDialogflowCxV3AdvancedSettingsSpeechSettings;
  dtmfSettings?: GoogleCloudDialogflowCxV3AdvancedSettingsDtmfSettings;
  loggingSettings?: GoogleCloudDialogflowCxV3AdvancedSettingsLoggingSettings;
}

export const GoogleCloudDialogflowCxV3AdvancedSettings: Schema.Schema<GoogleCloudDialogflowCxV3AdvancedSettings> = Schema.suspend(() => Schema.Struct({
  audioExportGcsDestination: Schema.optional(GoogleCloudDialogflowCxV3GcsDestination),
  speechSettings: Schema.optional(GoogleCloudDialogflowCxV3AdvancedSettingsSpeechSettings),
  dtmfSettings: Schema.optional(GoogleCloudDialogflowCxV3AdvancedSettingsDtmfSettings),
  loggingSettings: Schema.optional(GoogleCloudDialogflowCxV3AdvancedSettingsLoggingSettings),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3AdvancedSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AdvancedSettings>;

export interface GoogleCloudDialogflowCxV3FulfillmentGeneratorSettings {
  generator?: string;
  inputParameters?: Record<string, string>;
  outputParameter?: string;
}

export const GoogleCloudDialogflowCxV3FulfillmentGeneratorSettings: Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentGeneratorSettings> = Schema.suspend(() => Schema.Struct({
  generator: Schema.optional(Schema.String),
  inputParameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  outputParameter: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3FulfillmentGeneratorSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentGeneratorSettings>;

export interface GoogleCloudDialogflowCxV3Fulfillment {
  messages?: Array<GoogleCloudDialogflowCxV3ResponseMessage>;
  webhook?: string;
  returnPartialResponses?: boolean;
  tag?: string;
  setParameterActions?: Array<GoogleCloudDialogflowCxV3FulfillmentSetParameterAction>;
  conditionalCases?: Array<GoogleCloudDialogflowCxV3FulfillmentConditionalCases>;
  advancedSettings?: GoogleCloudDialogflowCxV3AdvancedSettings;
  enableGenerativeFallback?: boolean;
  generators?: Array<GoogleCloudDialogflowCxV3FulfillmentGeneratorSettings>;
}

export const GoogleCloudDialogflowCxV3Fulfillment: Schema.Schema<GoogleCloudDialogflowCxV3Fulfillment> = Schema.suspend(() => Schema.Struct({
  messages: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3ResponseMessage)),
  webhook: Schema.optional(Schema.String),
  returnPartialResponses: Schema.optional(Schema.Boolean),
  tag: Schema.optional(Schema.String),
  setParameterActions: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3FulfillmentSetParameterAction)),
  conditionalCases: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3FulfillmentConditionalCases)),
  advancedSettings: Schema.optional(GoogleCloudDialogflowCxV3AdvancedSettings),
  enableGenerativeFallback: Schema.optional(Schema.Boolean),
  generators: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3FulfillmentGeneratorSettings)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3Fulfillment" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Fulfillment>;

export interface GoogleCloudDialogflowCxV3EventHandler {
  name?: string;
  event?: string;
  triggerFulfillment?: GoogleCloudDialogflowCxV3Fulfillment;
  targetPage?: string;
  targetFlow?: string;
  targetPlaybook?: string;
}

export const GoogleCloudDialogflowCxV3EventHandler: Schema.Schema<GoogleCloudDialogflowCxV3EventHandler> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  event: Schema.optional(Schema.String),
  triggerFulfillment: Schema.optional(GoogleCloudDialogflowCxV3Fulfillment),
  targetPage: Schema.optional(Schema.String),
  targetFlow: Schema.optional(Schema.String),
  targetPlaybook: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3EventHandler" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3EventHandler>;

export interface GoogleCloudDialogflowCxV3FormParameterFillBehavior {
  initialPromptFulfillment?: GoogleCloudDialogflowCxV3Fulfillment;
  repromptEventHandlers?: Array<GoogleCloudDialogflowCxV3EventHandler>;
}

export const GoogleCloudDialogflowCxV3FormParameterFillBehavior: Schema.Schema<GoogleCloudDialogflowCxV3FormParameterFillBehavior> = Schema.suspend(() => Schema.Struct({
  initialPromptFulfillment: Schema.optional(GoogleCloudDialogflowCxV3Fulfillment),
  repromptEventHandlers: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3EventHandler)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3FormParameterFillBehavior" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FormParameterFillBehavior>;

export interface GoogleCloudDialogflowCxV3FormParameter {
  displayName?: string;
  required?: boolean;
  entityType?: string;
  isList?: boolean;
  fillBehavior?: GoogleCloudDialogflowCxV3FormParameterFillBehavior;
  defaultValue?: unknown;
  redact?: boolean;
  advancedSettings?: GoogleCloudDialogflowCxV3AdvancedSettings;
}

export const GoogleCloudDialogflowCxV3FormParameter: Schema.Schema<GoogleCloudDialogflowCxV3FormParameter> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  required: Schema.optional(Schema.Boolean),
  entityType: Schema.optional(Schema.String),
  isList: Schema.optional(Schema.Boolean),
  fillBehavior: Schema.optional(GoogleCloudDialogflowCxV3FormParameterFillBehavior),
  defaultValue: Schema.optional(Schema.Unknown),
  redact: Schema.optional(Schema.Boolean),
  advancedSettings: Schema.optional(GoogleCloudDialogflowCxV3AdvancedSettings),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3FormParameter" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FormParameter>;

export interface GoogleCloudDialogflowCxV3Form {
  parameters?: Array<GoogleCloudDialogflowCxV3FormParameter>;
}

export const GoogleCloudDialogflowCxV3Form: Schema.Schema<GoogleCloudDialogflowCxV3Form> = Schema.suspend(() => Schema.Struct({
  parameters: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3FormParameter)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3Form" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Form>;

export interface GoogleCloudDialogflowCxV3TransitionRoute {
  name?: string;
  description?: string;
  intent?: string;
  condition?: string;
  triggerFulfillment?: GoogleCloudDialogflowCxV3Fulfillment;
  targetPage?: string;
  targetFlow?: string;
}

export const GoogleCloudDialogflowCxV3TransitionRoute: Schema.Schema<GoogleCloudDialogflowCxV3TransitionRoute> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  intent: Schema.optional(Schema.String),
  condition: Schema.optional(Schema.String),
  triggerFulfillment: Schema.optional(GoogleCloudDialogflowCxV3Fulfillment),
  targetPage: Schema.optional(Schema.String),
  targetFlow: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3TransitionRoute" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TransitionRoute>;

export interface GoogleCloudDialogflowCxV3DataStoreConnection {
  dataStoreType?: "DATA_STORE_TYPE_UNSPECIFIED" | "PUBLIC_WEB" | "UNSTRUCTURED" | "STRUCTURED" | (string & {});
  dataStore?: string;
  documentProcessingMode?: "DOCUMENT_PROCESSING_MODE_UNSPECIFIED" | "DOCUMENTS" | "CHUNKS" | (string & {});
}

export const GoogleCloudDialogflowCxV3DataStoreConnection: Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnection> = Schema.suspend(() => Schema.Struct({
  dataStoreType: Schema.optional(Schema.String),
  dataStore: Schema.optional(Schema.String),
  documentProcessingMode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3DataStoreConnection" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnection>;

export interface GoogleCloudDialogflowCxV3KnowledgeConnectorSettings {
  enabled?: boolean;
  triggerFulfillment?: GoogleCloudDialogflowCxV3Fulfillment;
  targetPage?: string;
  targetFlow?: string;
  dataStoreConnections?: Array<GoogleCloudDialogflowCxV3DataStoreConnection>;
}

export const GoogleCloudDialogflowCxV3KnowledgeConnectorSettings: Schema.Schema<GoogleCloudDialogflowCxV3KnowledgeConnectorSettings> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  triggerFulfillment: Schema.optional(GoogleCloudDialogflowCxV3Fulfillment),
  targetPage: Schema.optional(Schema.String),
  targetFlow: Schema.optional(Schema.String),
  dataStoreConnections: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3DataStoreConnection)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3KnowledgeConnectorSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3KnowledgeConnectorSettings>;

export interface GoogleCloudDialogflowCxV3Page {
  name?: string;
  displayName?: string;
  description?: string;
  entryFulfillment?: GoogleCloudDialogflowCxV3Fulfillment;
  form?: GoogleCloudDialogflowCxV3Form;
  transitionRouteGroups?: Array<string>;
  transitionRoutes?: Array<GoogleCloudDialogflowCxV3TransitionRoute>;
  eventHandlers?: Array<GoogleCloudDialogflowCxV3EventHandler>;
  advancedSettings?: GoogleCloudDialogflowCxV3AdvancedSettings;
  knowledgeConnectorSettings?: GoogleCloudDialogflowCxV3KnowledgeConnectorSettings;
}

export const GoogleCloudDialogflowCxV3Page: Schema.Schema<GoogleCloudDialogflowCxV3Page> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  entryFulfillment: Schema.optional(GoogleCloudDialogflowCxV3Fulfillment),
  form: Schema.optional(GoogleCloudDialogflowCxV3Form),
  transitionRouteGroups: Schema.optional(Schema.Array(Schema.String)),
  transitionRoutes: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3TransitionRoute)),
  eventHandlers: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3EventHandler)),
  advancedSettings: Schema.optional(GoogleCloudDialogflowCxV3AdvancedSettings),
  knowledgeConnectorSettings: Schema.optional(GoogleCloudDialogflowCxV3KnowledgeConnectorSettings),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3Page" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Page>;

export interface GoogleCloudDialogflowCxV3ConversationTurnVirtualAgentOutput {
  sessionParameters?: Record<string, unknown>;
  differences?: Array<GoogleCloudDialogflowCxV3TestRunDifference>;
  diagnosticInfo?: Record<string, unknown>;
  triggeredIntent?: GoogleCloudDialogflowCxV3Intent;
  currentPage?: GoogleCloudDialogflowCxV3Page;
  textResponses?: Array<GoogleCloudDialogflowCxV3ResponseMessageText>;
  status?: GoogleRpcStatus;
}

export const GoogleCloudDialogflowCxV3ConversationTurnVirtualAgentOutput: Schema.Schema<GoogleCloudDialogflowCxV3ConversationTurnVirtualAgentOutput> = Schema.suspend(() => Schema.Struct({
  sessionParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  differences: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3TestRunDifference)),
  diagnosticInfo: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  triggeredIntent: Schema.optional(GoogleCloudDialogflowCxV3Intent),
  currentPage: Schema.optional(GoogleCloudDialogflowCxV3Page),
  textResponses: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3ResponseMessageText)),
  status: Schema.optional(GoogleRpcStatus),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ConversationTurnVirtualAgentOutput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ConversationTurnVirtualAgentOutput>;

export interface GoogleCloudDialogflowCxV3ConversationTurn {
  userInput?: GoogleCloudDialogflowCxV3ConversationTurnUserInput;
  virtualAgentOutput?: GoogleCloudDialogflowCxV3ConversationTurnVirtualAgentOutput;
}

export const GoogleCloudDialogflowCxV3ConversationTurn: Schema.Schema<GoogleCloudDialogflowCxV3ConversationTurn> = Schema.suspend(() => Schema.Struct({
  userInput: Schema.optional(GoogleCloudDialogflowCxV3ConversationTurnUserInput),
  virtualAgentOutput: Schema.optional(GoogleCloudDialogflowCxV3ConversationTurnVirtualAgentOutput),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ConversationTurn" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ConversationTurn>;

export interface GoogleCloudDialogflowCxV3TestCaseResult {
  name?: string;
  environment?: string;
  conversationTurns?: Array<GoogleCloudDialogflowCxV3ConversationTurn>;
  testResult?: "TEST_RESULT_UNSPECIFIED" | "PASSED" | "FAILED" | (string & {});
  testTime?: string;
}

export const GoogleCloudDialogflowCxV3TestCaseResult: Schema.Schema<GoogleCloudDialogflowCxV3TestCaseResult> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  environment: Schema.optional(Schema.String),
  conversationTurns: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3ConversationTurn)),
  testResult: Schema.optional(Schema.String),
  testTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3TestCaseResult" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TestCaseResult>;

export interface GoogleCloudDialogflowCxV3BatchRunTestCasesResponse {
  results?: Array<GoogleCloudDialogflowCxV3TestCaseResult>;
}

export const GoogleCloudDialogflowCxV3BatchRunTestCasesResponse: Schema.Schema<GoogleCloudDialogflowCxV3BatchRunTestCasesResponse> = Schema.suspend(() => Schema.Struct({
  results: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3TestCaseResult)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3BatchRunTestCasesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3BatchRunTestCasesResponse>;

export interface GoogleCloudDialogflowCxV3RunTestCaseMetadata {
}

export const GoogleCloudDialogflowCxV3RunTestCaseMetadata: Schema.Schema<GoogleCloudDialogflowCxV3RunTestCaseMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3RunTestCaseMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RunTestCaseMetadata>;

export interface GoogleCloudDialogflowCxV3RunTestCaseResponse {
  result?: GoogleCloudDialogflowCxV3TestCaseResult;
}

export const GoogleCloudDialogflowCxV3RunTestCaseResponse: Schema.Schema<GoogleCloudDialogflowCxV3RunTestCaseResponse> = Schema.suspend(() => Schema.Struct({
  result: Schema.optional(GoogleCloudDialogflowCxV3TestCaseResult),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3RunTestCaseResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RunTestCaseResponse>;

export interface GoogleCloudDialogflowCxV3ExportTestCasesMetadata {
}

export const GoogleCloudDialogflowCxV3ExportTestCasesMetadata: Schema.Schema<GoogleCloudDialogflowCxV3ExportTestCasesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ExportTestCasesMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportTestCasesMetadata>;

export interface GoogleCloudDialogflowCxV3ExportTestCasesResponse {
  gcsUri?: string;
  content?: string;
}

export const GoogleCloudDialogflowCxV3ExportTestCasesResponse: Schema.Schema<GoogleCloudDialogflowCxV3ExportTestCasesResponse> = Schema.suspend(() => Schema.Struct({
  gcsUri: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ExportTestCasesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportTestCasesResponse>;

export interface GoogleCloudDialogflowCxV3TestConfig {
  trackingParameters?: Array<string>;
  flow?: string;
  page?: string;
}

export const GoogleCloudDialogflowCxV3TestConfig: Schema.Schema<GoogleCloudDialogflowCxV3TestConfig> = Schema.suspend(() => Schema.Struct({
  trackingParameters: Schema.optional(Schema.Array(Schema.String)),
  flow: Schema.optional(Schema.String),
  page: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3TestConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TestConfig>;

export interface GoogleCloudDialogflowCxV3TestCase {
  name?: string;
  tags?: Array<string>;
  displayName?: string;
  notes?: string;
  testConfig?: GoogleCloudDialogflowCxV3TestConfig;
  testCaseConversationTurns?: Array<GoogleCloudDialogflowCxV3ConversationTurn>;
  creationTime?: string;
  lastTestResult?: GoogleCloudDialogflowCxV3TestCaseResult;
}

export const GoogleCloudDialogflowCxV3TestCase: Schema.Schema<GoogleCloudDialogflowCxV3TestCase> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  tags: Schema.optional(Schema.Array(Schema.String)),
  displayName: Schema.optional(Schema.String),
  notes: Schema.optional(Schema.String),
  testConfig: Schema.optional(GoogleCloudDialogflowCxV3TestConfig),
  testCaseConversationTurns: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3ConversationTurn)),
  creationTime: Schema.optional(Schema.String),
  lastTestResult: Schema.optional(GoogleCloudDialogflowCxV3TestCaseResult),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3TestCase" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TestCase>;

export interface GoogleCloudDialogflowCxV3TestCaseError {
  testCase?: GoogleCloudDialogflowCxV3TestCase;
  status?: GoogleRpcStatus;
}

export const GoogleCloudDialogflowCxV3TestCaseError: Schema.Schema<GoogleCloudDialogflowCxV3TestCaseError> = Schema.suspend(() => Schema.Struct({
  testCase: Schema.optional(GoogleCloudDialogflowCxV3TestCase),
  status: Schema.optional(GoogleRpcStatus),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3TestCaseError" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TestCaseError>;

export interface GoogleCloudDialogflowCxV3ImportTestCasesMetadata {
  errors?: Array<GoogleCloudDialogflowCxV3TestCaseError>;
}

export const GoogleCloudDialogflowCxV3ImportTestCasesMetadata: Schema.Schema<GoogleCloudDialogflowCxV3ImportTestCasesMetadata> = Schema.suspend(() => Schema.Struct({
  errors: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3TestCaseError)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ImportTestCasesMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportTestCasesMetadata>;

export interface GoogleCloudDialogflowCxV3ImportTestCasesResponse {
  names?: Array<string>;
}

export const GoogleCloudDialogflowCxV3ImportTestCasesResponse: Schema.Schema<GoogleCloudDialogflowCxV3ImportTestCasesResponse> = Schema.suspend(() => Schema.Struct({
  names: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ImportTestCasesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportTestCasesResponse>;

export interface GoogleCloudDialogflowCxV3RunContinuousTestMetadata {
  errors?: Array<GoogleCloudDialogflowCxV3TestError>;
}

export const GoogleCloudDialogflowCxV3RunContinuousTestMetadata: Schema.Schema<GoogleCloudDialogflowCxV3RunContinuousTestMetadata> = Schema.suspend(() => Schema.Struct({
  errors: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3TestError)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3RunContinuousTestMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RunContinuousTestMetadata>;

export interface GoogleCloudDialogflowCxV3ContinuousTestResult {
  name?: string;
  result?: "AGGREGATED_TEST_RESULT_UNSPECIFIED" | "PASSED" | "FAILED" | (string & {});
  testCaseResults?: Array<string>;
  runTime?: string;
}

export const GoogleCloudDialogflowCxV3ContinuousTestResult: Schema.Schema<GoogleCloudDialogflowCxV3ContinuousTestResult> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  result: Schema.optional(Schema.String),
  testCaseResults: Schema.optional(Schema.Array(Schema.String)),
  runTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ContinuousTestResult" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ContinuousTestResult>;

export interface GoogleCloudDialogflowCxV3RunContinuousTestResponse {
  continuousTestResult?: GoogleCloudDialogflowCxV3ContinuousTestResult;
}

export const GoogleCloudDialogflowCxV3RunContinuousTestResponse: Schema.Schema<GoogleCloudDialogflowCxV3RunContinuousTestResponse> = Schema.suspend(() => Schema.Struct({
  continuousTestResult: Schema.optional(GoogleCloudDialogflowCxV3ContinuousTestResult),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3RunContinuousTestResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RunContinuousTestResponse>;

export interface GoogleCloudDialogflowCxV3DeployFlowMetadata {
  testErrors?: Array<GoogleCloudDialogflowCxV3TestError>;
}

export const GoogleCloudDialogflowCxV3DeployFlowMetadata: Schema.Schema<GoogleCloudDialogflowCxV3DeployFlowMetadata> = Schema.suspend(() => Schema.Struct({
  testErrors: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3TestError)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3DeployFlowMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DeployFlowMetadata>;

export interface GoogleCloudDialogflowCxV3EnvironmentVersionConfig {
  version?: string;
}

export const GoogleCloudDialogflowCxV3EnvironmentVersionConfig: Schema.Schema<GoogleCloudDialogflowCxV3EnvironmentVersionConfig> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3EnvironmentVersionConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3EnvironmentVersionConfig>;

export interface GoogleCloudDialogflowCxV3EnvironmentTestCasesConfig {
  testCases?: Array<string>;
  enableContinuousRun?: boolean;
  enablePredeploymentRun?: boolean;
}

export const GoogleCloudDialogflowCxV3EnvironmentTestCasesConfig: Schema.Schema<GoogleCloudDialogflowCxV3EnvironmentTestCasesConfig> = Schema.suspend(() => Schema.Struct({
  testCases: Schema.optional(Schema.Array(Schema.String)),
  enableContinuousRun: Schema.optional(Schema.Boolean),
  enablePredeploymentRun: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3EnvironmentTestCasesConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3EnvironmentTestCasesConfig>;

export interface GoogleCloudDialogflowCxV3WebhookGenericWebServiceSecretVersionHeaderValue {
  secretVersion?: string;
}

export const GoogleCloudDialogflowCxV3WebhookGenericWebServiceSecretVersionHeaderValue: Schema.Schema<GoogleCloudDialogflowCxV3WebhookGenericWebServiceSecretVersionHeaderValue> = Schema.suspend(() => Schema.Struct({
  secretVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3WebhookGenericWebServiceSecretVersionHeaderValue" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookGenericWebServiceSecretVersionHeaderValue>;

export interface GoogleCloudDialogflowCxV3WebhookGenericWebServiceOAuthConfig {
  clientId?: string;
  clientSecret?: string;
  secretVersionForClientSecret?: string;
  tokenEndpoint?: string;
  scopes?: Array<string>;
}

export const GoogleCloudDialogflowCxV3WebhookGenericWebServiceOAuthConfig: Schema.Schema<GoogleCloudDialogflowCxV3WebhookGenericWebServiceOAuthConfig> = Schema.suspend(() => Schema.Struct({
  clientId: Schema.optional(Schema.String),
  clientSecret: Schema.optional(Schema.String),
  secretVersionForClientSecret: Schema.optional(Schema.String),
  tokenEndpoint: Schema.optional(Schema.String),
  scopes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3WebhookGenericWebServiceOAuthConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookGenericWebServiceOAuthConfig>;

export interface GoogleCloudDialogflowCxV3WebhookGenericWebServiceServiceAccountAuthConfig {
  serviceAccount?: string;
}

export const GoogleCloudDialogflowCxV3WebhookGenericWebServiceServiceAccountAuthConfig: Schema.Schema<GoogleCloudDialogflowCxV3WebhookGenericWebServiceServiceAccountAuthConfig> = Schema.suspend(() => Schema.Struct({
  serviceAccount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3WebhookGenericWebServiceServiceAccountAuthConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookGenericWebServiceServiceAccountAuthConfig>;

export interface GoogleCloudDialogflowCxV3WebhookGenericWebService {
  uri?: string;
  username?: string;
  password?: string;
  secretVersionForUsernamePassword?: string;
  requestHeaders?: Record<string, string>;
  secretVersionsForRequestHeaders?: Record<string, GoogleCloudDialogflowCxV3WebhookGenericWebServiceSecretVersionHeaderValue>;
  allowedCaCerts?: Array<string>;
  oauthConfig?: GoogleCloudDialogflowCxV3WebhookGenericWebServiceOAuthConfig;
  serviceAgentAuth?: "SERVICE_AGENT_AUTH_UNSPECIFIED" | "NONE" | "ID_TOKEN" | "ACCESS_TOKEN" | (string & {});
  serviceAccountAuthConfig?: GoogleCloudDialogflowCxV3WebhookGenericWebServiceServiceAccountAuthConfig;
  webhookType?: "WEBHOOK_TYPE_UNSPECIFIED" | "STANDARD" | "FLEXIBLE" | (string & {});
  httpMethod?: "HTTP_METHOD_UNSPECIFIED" | "POST" | "GET" | "HEAD" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | (string & {});
  requestBody?: string;
  parameterMapping?: Record<string, string>;
}

export const GoogleCloudDialogflowCxV3WebhookGenericWebService: Schema.Schema<GoogleCloudDialogflowCxV3WebhookGenericWebService> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  username: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
  secretVersionForUsernamePassword: Schema.optional(Schema.String),
  requestHeaders: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  secretVersionsForRequestHeaders: Schema.optional(Schema.Record(Schema.String, GoogleCloudDialogflowCxV3WebhookGenericWebServiceSecretVersionHeaderValue)),
  allowedCaCerts: Schema.optional(Schema.Array(Schema.String)),
  oauthConfig: Schema.optional(GoogleCloudDialogflowCxV3WebhookGenericWebServiceOAuthConfig),
  serviceAgentAuth: Schema.optional(Schema.String),
  serviceAccountAuthConfig: Schema.optional(GoogleCloudDialogflowCxV3WebhookGenericWebServiceServiceAccountAuthConfig),
  webhookType: Schema.optional(Schema.String),
  httpMethod: Schema.optional(Schema.String),
  requestBody: Schema.optional(Schema.String),
  parameterMapping: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3WebhookGenericWebService" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookGenericWebService>;

export interface GoogleCloudDialogflowCxV3WebhookServiceDirectoryConfig {
  service?: string;
  genericWebService?: GoogleCloudDialogflowCxV3WebhookGenericWebService;
}

export const GoogleCloudDialogflowCxV3WebhookServiceDirectoryConfig: Schema.Schema<GoogleCloudDialogflowCxV3WebhookServiceDirectoryConfig> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  genericWebService: Schema.optional(GoogleCloudDialogflowCxV3WebhookGenericWebService),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3WebhookServiceDirectoryConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookServiceDirectoryConfig>;

export interface GoogleCloudDialogflowCxV3Webhook {
  name?: string;
  displayName?: string;
  genericWebService?: GoogleCloudDialogflowCxV3WebhookGenericWebService;
  serviceDirectory?: GoogleCloudDialogflowCxV3WebhookServiceDirectoryConfig;
  timeout?: string;
  disabled?: boolean;
}

export const GoogleCloudDialogflowCxV3Webhook: Schema.Schema<GoogleCloudDialogflowCxV3Webhook> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  genericWebService: Schema.optional(GoogleCloudDialogflowCxV3WebhookGenericWebService),
  serviceDirectory: Schema.optional(GoogleCloudDialogflowCxV3WebhookServiceDirectoryConfig),
  timeout: Schema.optional(Schema.String),
  disabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3Webhook" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Webhook>;

export interface GoogleCloudDialogflowCxV3EnvironmentWebhookConfig {
  webhookOverrides?: Array<GoogleCloudDialogflowCxV3Webhook>;
}

export const GoogleCloudDialogflowCxV3EnvironmentWebhookConfig: Schema.Schema<GoogleCloudDialogflowCxV3EnvironmentWebhookConfig> = Schema.suspend(() => Schema.Struct({
  webhookOverrides: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Webhook)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3EnvironmentWebhookConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3EnvironmentWebhookConfig>;

export interface GoogleCloudDialogflowCxV3Environment {
  name?: string;
  displayName?: string;
  description?: string;
  versionConfigs?: Array<GoogleCloudDialogflowCxV3EnvironmentVersionConfig>;
  updateTime?: string;
  testCasesConfig?: GoogleCloudDialogflowCxV3EnvironmentTestCasesConfig;
  webhookConfig?: GoogleCloudDialogflowCxV3EnvironmentWebhookConfig;
}

export const GoogleCloudDialogflowCxV3Environment: Schema.Schema<GoogleCloudDialogflowCxV3Environment> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  versionConfigs: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3EnvironmentVersionConfig)),
  updateTime: Schema.optional(Schema.String),
  testCasesConfig: Schema.optional(GoogleCloudDialogflowCxV3EnvironmentTestCasesConfig),
  webhookConfig: Schema.optional(GoogleCloudDialogflowCxV3EnvironmentWebhookConfig),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3Environment" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Environment>;

export interface GoogleCloudDialogflowCxV3DeployFlowResponse {
  environment?: GoogleCloudDialogflowCxV3Environment;
  deployment?: string;
}

export const GoogleCloudDialogflowCxV3DeployFlowResponse: Schema.Schema<GoogleCloudDialogflowCxV3DeployFlowResponse> = Schema.suspend(() => Schema.Struct({
  environment: Schema.optional(GoogleCloudDialogflowCxV3Environment),
  deployment: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3DeployFlowResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DeployFlowResponse>;

export interface GoogleCloudDialogflowCxV3TurnSignals {
  noMatch?: boolean;
  noUserInput?: boolean;
  dtmfUsed?: boolean;
  userEscalated?: boolean;
  agentEscalated?: boolean;
  reachedEndPage?: boolean;
  webhookStatuses?: Array<string>;
  failureReasons?: Array<"FAILURE_REASON_UNSPECIFIED" | "FAILED_INTENT" | "FAILED_WEBHOOK" | (string & {})>;
  sentimentScore?: number;
  sentimentMagnitude?: number;
}

export const GoogleCloudDialogflowCxV3TurnSignals: Schema.Schema<GoogleCloudDialogflowCxV3TurnSignals> = Schema.suspend(() => Schema.Struct({
  noMatch: Schema.optional(Schema.Boolean),
  noUserInput: Schema.optional(Schema.Boolean),
  dtmfUsed: Schema.optional(Schema.Boolean),
  userEscalated: Schema.optional(Schema.Boolean),
  agentEscalated: Schema.optional(Schema.Boolean),
  reachedEndPage: Schema.optional(Schema.Boolean),
  webhookStatuses: Schema.optional(Schema.Array(Schema.String)),
  failureReasons: Schema.optional(Schema.Array(Schema.String)),
  sentimentScore: Schema.optional(Schema.Number),
  sentimentMagnitude: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3TurnSignals" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TurnSignals>;

export interface GoogleCloudDialogflowCxV3ConversationSignals {
  turnSignals?: GoogleCloudDialogflowCxV3TurnSignals;
}

export const GoogleCloudDialogflowCxV3ConversationSignals: Schema.Schema<GoogleCloudDialogflowCxV3ConversationSignals> = Schema.suspend(() => Schema.Struct({
  turnSignals: Schema.optional(GoogleCloudDialogflowCxV3TurnSignals),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ConversationSignals" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ConversationSignals>;

export interface GoogleCloudDialogflowCxV3beta1CreateVersionOperationMetadata {
  version?: string;
}

export const GoogleCloudDialogflowCxV3beta1CreateVersionOperationMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1CreateVersionOperationMetadata> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1CreateVersionOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1CreateVersionOperationMetadata>;

export interface GoogleCloudDialogflowCxV3beta1ExportAgentResponse {
  agentUri?: string;
  agentContent?: string;
  commitSha?: string;
}

export const GoogleCloudDialogflowCxV3beta1ExportAgentResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportAgentResponse> = Schema.suspend(() => Schema.Struct({
  agentUri: Schema.optional(Schema.String),
  agentContent: Schema.optional(Schema.String),
  commitSha: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExportAgentResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportAgentResponse>;

export interface GoogleCloudDialogflowCxV3beta1ExportFlowResponse {
  flowUri?: string;
  flowContent?: string;
}

export const GoogleCloudDialogflowCxV3beta1ExportFlowResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportFlowResponse> = Schema.suspend(() => Schema.Struct({
  flowUri: Schema.optional(Schema.String),
  flowContent: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExportFlowResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportFlowResponse>;

export interface GoogleCloudDialogflowCxV3beta1ExportIntentsMetadata {
}

export const GoogleCloudDialogflowCxV3beta1ExportIntentsMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportIntentsMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExportIntentsMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportIntentsMetadata>;

export interface GoogleCloudDialogflowCxV3beta1InlineDestination {
  content?: string;
}

export const GoogleCloudDialogflowCxV3beta1InlineDestination: Schema.Schema<GoogleCloudDialogflowCxV3beta1InlineDestination> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1InlineDestination" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1InlineDestination>;

export interface GoogleCloudDialogflowCxV3beta1ExportIntentsResponse {
  intentsUri?: string;
  intentsContent?: GoogleCloudDialogflowCxV3beta1InlineDestination;
}

export const GoogleCloudDialogflowCxV3beta1ExportIntentsResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportIntentsResponse> = Schema.suspend(() => Schema.Struct({
  intentsUri: Schema.optional(Schema.String),
  intentsContent: Schema.optional(GoogleCloudDialogflowCxV3beta1InlineDestination),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExportIntentsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportIntentsResponse>;

export interface GoogleCloudDialogflowCxV3beta1ImportFlowResponse {
  flow?: string;
}

export const GoogleCloudDialogflowCxV3beta1ImportFlowResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportFlowResponse> = Schema.suspend(() => Schema.Struct({
  flow: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ImportFlowResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportFlowResponse>;

export interface GoogleCloudDialogflowCxV3beta1ImportEntityTypesMetadata {
}

export const GoogleCloudDialogflowCxV3beta1ImportEntityTypesMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportEntityTypesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ImportEntityTypesMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportEntityTypesMetadata>;

export interface GoogleCloudDialogflowCxV3beta1ImportEntityTypesResponseConflictingResources {
  entityTypeDisplayNames?: Array<string>;
  entityDisplayNames?: Array<string>;
}

export const GoogleCloudDialogflowCxV3beta1ImportEntityTypesResponseConflictingResources: Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportEntityTypesResponseConflictingResources> = Schema.suspend(() => Schema.Struct({
  entityTypeDisplayNames: Schema.optional(Schema.Array(Schema.String)),
  entityDisplayNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ImportEntityTypesResponseConflictingResources" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportEntityTypesResponseConflictingResources>;

export interface GoogleCloudDialogflowCxV3beta1ImportEntityTypesResponse {
  entityTypes?: Array<string>;
  conflictingResources?: GoogleCloudDialogflowCxV3beta1ImportEntityTypesResponseConflictingResources;
}

export const GoogleCloudDialogflowCxV3beta1ImportEntityTypesResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportEntityTypesResponse> = Schema.suspend(() => Schema.Struct({
  entityTypes: Schema.optional(Schema.Array(Schema.String)),
  conflictingResources: Schema.optional(GoogleCloudDialogflowCxV3beta1ImportEntityTypesResponseConflictingResources),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ImportEntityTypesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportEntityTypesResponse>;

export interface GoogleCloudDialogflowCxV3beta1ExportEntityTypesMetadata {
}

export const GoogleCloudDialogflowCxV3beta1ExportEntityTypesMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportEntityTypesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExportEntityTypesMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportEntityTypesMetadata>;

export interface GoogleCloudDialogflowCxV3beta1ExportEntityTypesResponse {
  entityTypesUri?: string;
  entityTypesContent?: GoogleCloudDialogflowCxV3beta1InlineDestination;
}

export const GoogleCloudDialogflowCxV3beta1ExportEntityTypesResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportEntityTypesResponse> = Schema.suspend(() => Schema.Struct({
  entityTypesUri: Schema.optional(Schema.String),
  entityTypesContent: Schema.optional(GoogleCloudDialogflowCxV3beta1InlineDestination),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExportEntityTypesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportEntityTypesResponse>;

export interface GoogleCloudDialogflowCxV3beta1ImportIntentsMetadata {
}

export const GoogleCloudDialogflowCxV3beta1ImportIntentsMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportIntentsMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ImportIntentsMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportIntentsMetadata>;

export interface GoogleCloudDialogflowCxV3beta1ImportIntentsResponseConflictingResources {
  intentDisplayNames?: Array<string>;
  entityDisplayNames?: Array<string>;
}

export const GoogleCloudDialogflowCxV3beta1ImportIntentsResponseConflictingResources: Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportIntentsResponseConflictingResources> = Schema.suspend(() => Schema.Struct({
  intentDisplayNames: Schema.optional(Schema.Array(Schema.String)),
  entityDisplayNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ImportIntentsResponseConflictingResources" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportIntentsResponseConflictingResources>;

export interface GoogleCloudDialogflowCxV3beta1ImportIntentsResponse {
  intents?: Array<string>;
  conflictingResources?: GoogleCloudDialogflowCxV3beta1ImportIntentsResponseConflictingResources;
}

export const GoogleCloudDialogflowCxV3beta1ImportIntentsResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportIntentsResponse> = Schema.suspend(() => Schema.Struct({
  intents: Schema.optional(Schema.Array(Schema.String)),
  conflictingResources: Schema.optional(GoogleCloudDialogflowCxV3beta1ImportIntentsResponseConflictingResources),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ImportIntentsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportIntentsResponse>;

export interface GoogleCloudDialogflowCxV3beta1WebhookRequestFulfillmentInfo {
  tag?: string;
}

export const GoogleCloudDialogflowCxV3beta1WebhookRequestFulfillmentInfo: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequestFulfillmentInfo> = Schema.suspend(() => Schema.Struct({
  tag: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1WebhookRequestFulfillmentInfo" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequestFulfillmentInfo>;

export interface GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfoIntentParameterValue {
  originalValue?: string;
  resolvedValue?: unknown;
}

export const GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfoIntentParameterValue: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfoIntentParameterValue> = Schema.suspend(() => Schema.Struct({
  originalValue: Schema.optional(Schema.String),
  resolvedValue: Schema.optional(Schema.Unknown),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfoIntentParameterValue" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfoIntentParameterValue>;

export interface GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfo {
  lastMatchedIntent?: string;
  displayName?: string;
  parameters?: Record<string, GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfoIntentParameterValue>;
  confidence?: number;
}

export const GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfo: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfo> = Schema.suspend(() => Schema.Struct({
  lastMatchedIntent: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Record(Schema.String, GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfoIntentParameterValue)),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfo" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfo>;

export interface GoogleCloudDialogflowCxV3beta1PageInfoFormInfoParameterInfo {
  displayName?: string;
  required?: boolean;
  state?: "PARAMETER_STATE_UNSPECIFIED" | "EMPTY" | "INVALID" | "FILLED" | (string & {});
  value?: unknown;
  justCollected?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1PageInfoFormInfoParameterInfo: Schema.Schema<GoogleCloudDialogflowCxV3beta1PageInfoFormInfoParameterInfo> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  required: Schema.optional(Schema.Boolean),
  state: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Unknown),
  justCollected: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1PageInfoFormInfoParameterInfo" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1PageInfoFormInfoParameterInfo>;

export interface GoogleCloudDialogflowCxV3beta1PageInfoFormInfo {
  parameterInfo?: Array<GoogleCloudDialogflowCxV3beta1PageInfoFormInfoParameterInfo>;
}

export const GoogleCloudDialogflowCxV3beta1PageInfoFormInfo: Schema.Schema<GoogleCloudDialogflowCxV3beta1PageInfoFormInfo> = Schema.suspend(() => Schema.Struct({
  parameterInfo: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1PageInfoFormInfoParameterInfo)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1PageInfoFormInfo" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1PageInfoFormInfo>;

export interface GoogleCloudDialogflowCxV3beta1PageInfo {
  currentPage?: string;
  displayName?: string;
  formInfo?: GoogleCloudDialogflowCxV3beta1PageInfoFormInfo;
}

export const GoogleCloudDialogflowCxV3beta1PageInfo: Schema.Schema<GoogleCloudDialogflowCxV3beta1PageInfo> = Schema.suspend(() => Schema.Struct({
  currentPage: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  formInfo: Schema.optional(GoogleCloudDialogflowCxV3beta1PageInfoFormInfo),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1PageInfo" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1PageInfo>;

export interface GoogleCloudDialogflowCxV3beta1SessionInfo {
  session?: string;
  parameters?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3beta1SessionInfo: Schema.Schema<GoogleCloudDialogflowCxV3beta1SessionInfo> = Schema.suspend(() => Schema.Struct({
  session: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1SessionInfo" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1SessionInfo>;

export interface GoogleCloudDialogflowCxV3beta1WebhookRequestSentimentAnalysisResult {
  score?: number;
  magnitude?: number;
}

export const GoogleCloudDialogflowCxV3beta1WebhookRequestSentimentAnalysisResult: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequestSentimentAnalysisResult> = Schema.suspend(() => Schema.Struct({
  score: Schema.optional(Schema.Number),
  magnitude: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1WebhookRequestSentimentAnalysisResult" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequestSentimentAnalysisResult>;

export interface GoogleCloudDialogflowCxV3beta1LanguageInfo {
  inputLanguageCode?: string;
  resolvedLanguageCode?: string;
  confidenceScore?: number;
}

export const GoogleCloudDialogflowCxV3beta1LanguageInfo: Schema.Schema<GoogleCloudDialogflowCxV3beta1LanguageInfo> = Schema.suspend(() => Schema.Struct({
  inputLanguageCode: Schema.optional(Schema.String),
  resolvedLanguageCode: Schema.optional(Schema.String),
  confidenceScore: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1LanguageInfo" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1LanguageInfo>;

export interface GoogleCloudDialogflowCxV3beta1WebhookRequest {
  detectIntentResponseId?: string;
  text?: string;
  triggerIntent?: string;
  transcript?: string;
  triggerEvent?: string;
  dtmfDigits?: string;
  languageCode?: string;
  fulfillmentInfo?: GoogleCloudDialogflowCxV3beta1WebhookRequestFulfillmentInfo;
  intentInfo?: GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfo;
  pageInfo?: GoogleCloudDialogflowCxV3beta1PageInfo;
  sessionInfo?: GoogleCloudDialogflowCxV3beta1SessionInfo;
  messages?: Array<GoogleCloudDialogflowCxV3beta1ResponseMessage>;
  payload?: Record<string, unknown>;
  sentimentAnalysisResult?: GoogleCloudDialogflowCxV3beta1WebhookRequestSentimentAnalysisResult;
  languageInfo?: GoogleCloudDialogflowCxV3beta1LanguageInfo;
}

export const GoogleCloudDialogflowCxV3beta1WebhookRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequest> = Schema.suspend(() => Schema.Struct({
  detectIntentResponseId: Schema.optional(Schema.String),
  text: Schema.optional(Schema.String),
  triggerIntent: Schema.optional(Schema.String),
  transcript: Schema.optional(Schema.String),
  triggerEvent: Schema.optional(Schema.String),
  dtmfDigits: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  fulfillmentInfo: Schema.optional(GoogleCloudDialogflowCxV3beta1WebhookRequestFulfillmentInfo),
  intentInfo: Schema.optional(GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfo),
  pageInfo: Schema.optional(GoogleCloudDialogflowCxV3beta1PageInfo),
  sessionInfo: Schema.optional(GoogleCloudDialogflowCxV3beta1SessionInfo),
  messages: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ResponseMessage)),
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  sentimentAnalysisResult: Schema.optional(GoogleCloudDialogflowCxV3beta1WebhookRequestSentimentAnalysisResult),
  languageInfo: Schema.optional(GoogleCloudDialogflowCxV3beta1LanguageInfo),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1WebhookRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequest>;

export interface GoogleCloudDialogflowCxV3beta1WebhookResponseFulfillmentResponse {
  messages?: Array<GoogleCloudDialogflowCxV3beta1ResponseMessage>;
  mergeBehavior?: "MERGE_BEHAVIOR_UNSPECIFIED" | "APPEND" | "REPLACE" | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1WebhookResponseFulfillmentResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookResponseFulfillmentResponse> = Schema.suspend(() => Schema.Struct({
  messages: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ResponseMessage)),
  mergeBehavior: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1WebhookResponseFulfillmentResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookResponseFulfillmentResponse>;

export interface GoogleCloudDialogflowCxV3beta1WebhookResponse {
  fulfillmentResponse?: GoogleCloudDialogflowCxV3beta1WebhookResponseFulfillmentResponse;
  pageInfo?: GoogleCloudDialogflowCxV3beta1PageInfo;
  sessionInfo?: GoogleCloudDialogflowCxV3beta1SessionInfo;
  payload?: Record<string, unknown>;
  targetPage?: string;
  targetFlow?: string;
}

export const GoogleCloudDialogflowCxV3beta1WebhookResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookResponse> = Schema.suspend(() => Schema.Struct({
  fulfillmentResponse: Schema.optional(GoogleCloudDialogflowCxV3beta1WebhookResponseFulfillmentResponse),
  pageInfo: Schema.optional(GoogleCloudDialogflowCxV3beta1PageInfo),
  sessionInfo: Schema.optional(GoogleCloudDialogflowCxV3beta1SessionInfo),
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  targetPage: Schema.optional(Schema.String),
  targetFlow: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1WebhookResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookResponse>;

export interface GoogleCloudDialogflowCxV3beta1TestError {
  testCase?: string;
  status?: GoogleRpcStatus;
  testTime?: string;
}

export const GoogleCloudDialogflowCxV3beta1TestError: Schema.Schema<GoogleCloudDialogflowCxV3beta1TestError> = Schema.suspend(() => Schema.Struct({
  testCase: Schema.optional(Schema.String),
  status: Schema.optional(GoogleRpcStatus),
  testTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1TestError" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TestError>;

export interface GoogleCloudDialogflowCxV3beta1BatchRunTestCasesMetadata {
  errors?: Array<GoogleCloudDialogflowCxV3beta1TestError>;
}

export const GoogleCloudDialogflowCxV3beta1BatchRunTestCasesMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1BatchRunTestCasesMetadata> = Schema.suspend(() => Schema.Struct({
  errors: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1TestError)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1BatchRunTestCasesMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1BatchRunTestCasesMetadata>;

export interface GoogleCloudDialogflowCxV3beta1BatchRunTestCasesResponse {
  results?: Array<GoogleCloudDialogflowCxV3beta1TestCaseResult>;
}

export const GoogleCloudDialogflowCxV3beta1BatchRunTestCasesResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1BatchRunTestCasesResponse> = Schema.suspend(() => Schema.Struct({
  results: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1TestCaseResult)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1BatchRunTestCasesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1BatchRunTestCasesResponse>;

export interface GoogleCloudDialogflowCxV3beta1RunTestCaseMetadata {
}

export const GoogleCloudDialogflowCxV3beta1RunTestCaseMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1RunTestCaseMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1RunTestCaseMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1RunTestCaseMetadata>;

export interface GoogleCloudDialogflowCxV3beta1RunTestCaseResponse {
  result?: GoogleCloudDialogflowCxV3beta1TestCaseResult;
}

export const GoogleCloudDialogflowCxV3beta1RunTestCaseResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1RunTestCaseResponse> = Schema.suspend(() => Schema.Struct({
  result: Schema.optional(GoogleCloudDialogflowCxV3beta1TestCaseResult),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1RunTestCaseResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1RunTestCaseResponse>;

export interface GoogleCloudDialogflowCxV3beta1ExportTestCasesMetadata {
}

export const GoogleCloudDialogflowCxV3beta1ExportTestCasesMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportTestCasesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExportTestCasesMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportTestCasesMetadata>;

export interface GoogleCloudDialogflowCxV3beta1ExportTestCasesResponse {
  gcsUri?: string;
  content?: string;
}

export const GoogleCloudDialogflowCxV3beta1ExportTestCasesResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportTestCasesResponse> = Schema.suspend(() => Schema.Struct({
  gcsUri: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExportTestCasesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportTestCasesResponse>;

export interface GoogleCloudDialogflowCxV3beta1TestCaseError {
  testCase?: GoogleCloudDialogflowCxV3beta1TestCase;
  status?: GoogleRpcStatus;
}

export const GoogleCloudDialogflowCxV3beta1TestCaseError: Schema.Schema<GoogleCloudDialogflowCxV3beta1TestCaseError> = Schema.suspend(() => Schema.Struct({
  testCase: Schema.optional(GoogleCloudDialogflowCxV3beta1TestCase),
  status: Schema.optional(GoogleRpcStatus),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1TestCaseError" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TestCaseError>;

export interface GoogleCloudDialogflowCxV3beta1ImportTestCasesMetadata {
  errors?: Array<GoogleCloudDialogflowCxV3beta1TestCaseError>;
}

export const GoogleCloudDialogflowCxV3beta1ImportTestCasesMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportTestCasesMetadata> = Schema.suspend(() => Schema.Struct({
  errors: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1TestCaseError)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ImportTestCasesMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportTestCasesMetadata>;

export interface GoogleCloudDialogflowCxV3beta1ImportTestCasesResponse {
  names?: Array<string>;
}

export const GoogleCloudDialogflowCxV3beta1ImportTestCasesResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportTestCasesResponse> = Schema.suspend(() => Schema.Struct({
  names: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ImportTestCasesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportTestCasesResponse>;

export interface GoogleCloudDialogflowCxV3beta1RunContinuousTestMetadata {
  errors?: Array<GoogleCloudDialogflowCxV3beta1TestError>;
}

export const GoogleCloudDialogflowCxV3beta1RunContinuousTestMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1RunContinuousTestMetadata> = Schema.suspend(() => Schema.Struct({
  errors: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1TestError)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1RunContinuousTestMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1RunContinuousTestMetadata>;

export interface GoogleCloudDialogflowCxV3beta1RunContinuousTestResponse {
  continuousTestResult?: GoogleCloudDialogflowCxV3beta1ContinuousTestResult;
}

export const GoogleCloudDialogflowCxV3beta1RunContinuousTestResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1RunContinuousTestResponse> = Schema.suspend(() => Schema.Struct({
  continuousTestResult: Schema.optional(GoogleCloudDialogflowCxV3beta1ContinuousTestResult),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1RunContinuousTestResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1RunContinuousTestResponse>;

export interface GoogleCloudDialogflowCxV3beta1DeployFlowMetadata {
  testErrors?: Array<GoogleCloudDialogflowCxV3beta1TestError>;
}

export const GoogleCloudDialogflowCxV3beta1DeployFlowMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1DeployFlowMetadata> = Schema.suspend(() => Schema.Struct({
  testErrors: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1TestError)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1DeployFlowMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1DeployFlowMetadata>;

export interface GoogleCloudDialogflowCxV3beta1DeployFlowResponse {
  environment?: GoogleCloudDialogflowCxV3beta1Environment;
  deployment?: string;
}

export const GoogleCloudDialogflowCxV3beta1DeployFlowResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1DeployFlowResponse> = Schema.suspend(() => Schema.Struct({
  environment: Schema.optional(GoogleCloudDialogflowCxV3beta1Environment),
  deployment: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1DeployFlowResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1DeployFlowResponse>;

export interface GoogleCloudDialogflowCxV3beta1TurnSignals {
  noMatch?: boolean;
  noUserInput?: boolean;
  dtmfUsed?: boolean;
  userEscalated?: boolean;
  agentEscalated?: boolean;
  reachedEndPage?: boolean;
  webhookStatuses?: Array<string>;
  failureReasons?: Array<"FAILURE_REASON_UNSPECIFIED" | "FAILED_INTENT" | "FAILED_WEBHOOK" | (string & {})>;
  sentimentScore?: number;
  sentimentMagnitude?: number;
}

export const GoogleCloudDialogflowCxV3beta1TurnSignals: Schema.Schema<GoogleCloudDialogflowCxV3beta1TurnSignals> = Schema.suspend(() => Schema.Struct({
  noMatch: Schema.optional(Schema.Boolean),
  noUserInput: Schema.optional(Schema.Boolean),
  dtmfUsed: Schema.optional(Schema.Boolean),
  userEscalated: Schema.optional(Schema.Boolean),
  agentEscalated: Schema.optional(Schema.Boolean),
  reachedEndPage: Schema.optional(Schema.Boolean),
  webhookStatuses: Schema.optional(Schema.Array(Schema.String)),
  failureReasons: Schema.optional(Schema.Array(Schema.String)),
  sentimentScore: Schema.optional(Schema.Number),
  sentimentMagnitude: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1TurnSignals" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TurnSignals>;

export interface GoogleCloudDialogflowCxV3beta1ConversationSignals {
  turnSignals?: GoogleCloudDialogflowCxV3beta1TurnSignals;
}

export const GoogleCloudDialogflowCxV3beta1ConversationSignals: Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationSignals> = Schema.suspend(() => Schema.Struct({
  turnSignals: Schema.optional(GoogleCloudDialogflowCxV3beta1TurnSignals),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ConversationSignals" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationSignals>;

export interface GoogleCloudDialogflowV2EntityTypeEntity {
  value?: string;
  synonyms?: Array<string>;
}

export const GoogleCloudDialogflowV2EntityTypeEntity: Schema.Schema<GoogleCloudDialogflowV2EntityTypeEntity> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  synonyms: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2EntityTypeEntity" }) as any as Schema.Schema<GoogleCloudDialogflowV2EntityTypeEntity>;

export interface GoogleCloudDialogflowV2EntityType {
  name?: string;
  displayName?: string;
  kind?: "KIND_UNSPECIFIED" | "KIND_MAP" | "KIND_LIST" | "KIND_REGEXP" | (string & {});
  autoExpansionMode?: "AUTO_EXPANSION_MODE_UNSPECIFIED" | "AUTO_EXPANSION_MODE_DEFAULT" | (string & {});
  entities?: Array<GoogleCloudDialogflowV2EntityTypeEntity>;
  enableFuzzyExtraction?: boolean;
}

export const GoogleCloudDialogflowV2EntityType: Schema.Schema<GoogleCloudDialogflowV2EntityType> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  autoExpansionMode: Schema.optional(Schema.String),
  entities: Schema.optional(Schema.Array(GoogleCloudDialogflowV2EntityTypeEntity)),
  enableFuzzyExtraction: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2EntityType" }) as any as Schema.Schema<GoogleCloudDialogflowV2EntityType>;

export interface GoogleCloudDialogflowV2BatchUpdateEntityTypesResponse {
  entityTypes?: Array<GoogleCloudDialogflowV2EntityType>;
}

export const GoogleCloudDialogflowV2BatchUpdateEntityTypesResponse: Schema.Schema<GoogleCloudDialogflowV2BatchUpdateEntityTypesResponse> = Schema.suspend(() => Schema.Struct({
  entityTypes: Schema.optional(Schema.Array(GoogleCloudDialogflowV2EntityType)),
})).annotate({ identifier: "GoogleCloudDialogflowV2BatchUpdateEntityTypesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2BatchUpdateEntityTypesResponse>;

export interface GoogleCloudDialogflowV2IntentTrainingPhrasePart {
  text?: string;
  entityType?: string;
  alias?: string;
  userDefined?: boolean;
}

export const GoogleCloudDialogflowV2IntentTrainingPhrasePart: Schema.Schema<GoogleCloudDialogflowV2IntentTrainingPhrasePart> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  entityType: Schema.optional(Schema.String),
  alias: Schema.optional(Schema.String),
  userDefined: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentTrainingPhrasePart" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentTrainingPhrasePart>;

export interface GoogleCloudDialogflowV2IntentTrainingPhrase {
  name?: string;
  type?: "TYPE_UNSPECIFIED" | "EXAMPLE" | "TEMPLATE" | (string & {});
  parts?: Array<GoogleCloudDialogflowV2IntentTrainingPhrasePart>;
  timesAddedCount?: number;
}

export const GoogleCloudDialogflowV2IntentTrainingPhrase: Schema.Schema<GoogleCloudDialogflowV2IntentTrainingPhrase> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  parts: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentTrainingPhrasePart)),
  timesAddedCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentTrainingPhrase" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentTrainingPhrase>;

export interface GoogleCloudDialogflowV2Context {
  name?: string;
  lifespanCount?: number;
  parameters?: Record<string, unknown>;
}

export const GoogleCloudDialogflowV2Context: Schema.Schema<GoogleCloudDialogflowV2Context> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  lifespanCount: Schema.optional(Schema.Number),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowV2Context" }) as any as Schema.Schema<GoogleCloudDialogflowV2Context>;

export interface GoogleCloudDialogflowV2IntentParameter {
  name?: string;
  displayName?: string;
  value?: string;
  defaultValue?: string;
  entityTypeDisplayName?: string;
  mandatory?: boolean;
  prompts?: Array<string>;
  isList?: boolean;
}

export const GoogleCloudDialogflowV2IntentParameter: Schema.Schema<GoogleCloudDialogflowV2IntentParameter> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  defaultValue: Schema.optional(Schema.String),
  entityTypeDisplayName: Schema.optional(Schema.String),
  mandatory: Schema.optional(Schema.Boolean),
  prompts: Schema.optional(Schema.Array(Schema.String)),
  isList: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentParameter" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentParameter>;

export interface GoogleCloudDialogflowV2IntentMessageText {
  text?: Array<string>;
}

export const GoogleCloudDialogflowV2IntentMessageText: Schema.Schema<GoogleCloudDialogflowV2IntentMessageText> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageText" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageText>;

export interface GoogleCloudDialogflowV2IntentMessageImage {
  imageUri?: string;
  accessibilityText?: string;
}

export const GoogleCloudDialogflowV2IntentMessageImage: Schema.Schema<GoogleCloudDialogflowV2IntentMessageImage> = Schema.suspend(() => Schema.Struct({
  imageUri: Schema.optional(Schema.String),
  accessibilityText: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageImage" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageImage>;

export interface GoogleCloudDialogflowV2IntentMessageQuickReplies {
  title?: string;
  quickReplies?: Array<string>;
}

export const GoogleCloudDialogflowV2IntentMessageQuickReplies: Schema.Schema<GoogleCloudDialogflowV2IntentMessageQuickReplies> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  quickReplies: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageQuickReplies" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageQuickReplies>;

export interface GoogleCloudDialogflowV2IntentMessageCardButton {
  text?: string;
  postback?: string;
}

export const GoogleCloudDialogflowV2IntentMessageCardButton: Schema.Schema<GoogleCloudDialogflowV2IntentMessageCardButton> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  postback: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageCardButton" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageCardButton>;

export interface GoogleCloudDialogflowV2IntentMessageCard {
  title?: string;
  subtitle?: string;
  imageUri?: string;
  buttons?: Array<GoogleCloudDialogflowV2IntentMessageCardButton>;
}

export const GoogleCloudDialogflowV2IntentMessageCard: Schema.Schema<GoogleCloudDialogflowV2IntentMessageCard> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  subtitle: Schema.optional(Schema.String),
  imageUri: Schema.optional(Schema.String),
  buttons: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentMessageCardButton)),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageCard" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageCard>;

export interface GoogleCloudDialogflowV2IntentMessageSimpleResponse {
  textToSpeech?: string;
  ssml?: string;
  displayText?: string;
}

export const GoogleCloudDialogflowV2IntentMessageSimpleResponse: Schema.Schema<GoogleCloudDialogflowV2IntentMessageSimpleResponse> = Schema.suspend(() => Schema.Struct({
  textToSpeech: Schema.optional(Schema.String),
  ssml: Schema.optional(Schema.String),
  displayText: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageSimpleResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageSimpleResponse>;

export interface GoogleCloudDialogflowV2IntentMessageSimpleResponses {
  simpleResponses?: Array<GoogleCloudDialogflowV2IntentMessageSimpleResponse>;
}

export const GoogleCloudDialogflowV2IntentMessageSimpleResponses: Schema.Schema<GoogleCloudDialogflowV2IntentMessageSimpleResponses> = Schema.suspend(() => Schema.Struct({
  simpleResponses: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentMessageSimpleResponse)),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageSimpleResponses" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageSimpleResponses>;

export interface GoogleCloudDialogflowV2IntentMessageBasicCardButtonOpenUriAction {
  uri?: string;
}

export const GoogleCloudDialogflowV2IntentMessageBasicCardButtonOpenUriAction: Schema.Schema<GoogleCloudDialogflowV2IntentMessageBasicCardButtonOpenUriAction> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageBasicCardButtonOpenUriAction" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageBasicCardButtonOpenUriAction>;

export interface GoogleCloudDialogflowV2IntentMessageBasicCardButton {
  title?: string;
  openUriAction?: GoogleCloudDialogflowV2IntentMessageBasicCardButtonOpenUriAction;
}

export const GoogleCloudDialogflowV2IntentMessageBasicCardButton: Schema.Schema<GoogleCloudDialogflowV2IntentMessageBasicCardButton> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  openUriAction: Schema.optional(GoogleCloudDialogflowV2IntentMessageBasicCardButtonOpenUriAction),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageBasicCardButton" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageBasicCardButton>;

export interface GoogleCloudDialogflowV2IntentMessageBasicCard {
  title?: string;
  subtitle?: string;
  formattedText?: string;
  image?: GoogleCloudDialogflowV2IntentMessageImage;
  buttons?: Array<GoogleCloudDialogflowV2IntentMessageBasicCardButton>;
}

export const GoogleCloudDialogflowV2IntentMessageBasicCard: Schema.Schema<GoogleCloudDialogflowV2IntentMessageBasicCard> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  subtitle: Schema.optional(Schema.String),
  formattedText: Schema.optional(Schema.String),
  image: Schema.optional(GoogleCloudDialogflowV2IntentMessageImage),
  buttons: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentMessageBasicCardButton)),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageBasicCard" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageBasicCard>;

export interface GoogleCloudDialogflowV2IntentMessageSuggestion {
  title?: string;
}

export const GoogleCloudDialogflowV2IntentMessageSuggestion: Schema.Schema<GoogleCloudDialogflowV2IntentMessageSuggestion> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageSuggestion>;

export interface GoogleCloudDialogflowV2IntentMessageSuggestions {
  suggestions?: Array<GoogleCloudDialogflowV2IntentMessageSuggestion>;
}

export const GoogleCloudDialogflowV2IntentMessageSuggestions: Schema.Schema<GoogleCloudDialogflowV2IntentMessageSuggestions> = Schema.suspend(() => Schema.Struct({
  suggestions: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentMessageSuggestion)),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageSuggestions" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageSuggestions>;

export interface GoogleCloudDialogflowV2IntentMessageLinkOutSuggestion {
  destinationName?: string;
  uri?: string;
}

export const GoogleCloudDialogflowV2IntentMessageLinkOutSuggestion: Schema.Schema<GoogleCloudDialogflowV2IntentMessageLinkOutSuggestion> = Schema.suspend(() => Schema.Struct({
  destinationName: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageLinkOutSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageLinkOutSuggestion>;

export interface GoogleCloudDialogflowV2IntentMessageSelectItemInfo {
  key?: string;
  synonyms?: Array<string>;
}

export const GoogleCloudDialogflowV2IntentMessageSelectItemInfo: Schema.Schema<GoogleCloudDialogflowV2IntentMessageSelectItemInfo> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  synonyms: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageSelectItemInfo" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageSelectItemInfo>;

export interface GoogleCloudDialogflowV2IntentMessageListSelectItem {
  info?: GoogleCloudDialogflowV2IntentMessageSelectItemInfo;
  title?: string;
  description?: string;
  image?: GoogleCloudDialogflowV2IntentMessageImage;
}

export const GoogleCloudDialogflowV2IntentMessageListSelectItem: Schema.Schema<GoogleCloudDialogflowV2IntentMessageListSelectItem> = Schema.suspend(() => Schema.Struct({
  info: Schema.optional(GoogleCloudDialogflowV2IntentMessageSelectItemInfo),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  image: Schema.optional(GoogleCloudDialogflowV2IntentMessageImage),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageListSelectItem" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageListSelectItem>;

export interface GoogleCloudDialogflowV2IntentMessageListSelect {
  title?: string;
  items?: Array<GoogleCloudDialogflowV2IntentMessageListSelectItem>;
  subtitle?: string;
}

export const GoogleCloudDialogflowV2IntentMessageListSelect: Schema.Schema<GoogleCloudDialogflowV2IntentMessageListSelect> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentMessageListSelectItem)),
  subtitle: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageListSelect" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageListSelect>;

export interface GoogleCloudDialogflowV2IntentMessageCarouselSelectItem {
  info?: GoogleCloudDialogflowV2IntentMessageSelectItemInfo;
  title?: string;
  description?: string;
  image?: GoogleCloudDialogflowV2IntentMessageImage;
}

export const GoogleCloudDialogflowV2IntentMessageCarouselSelectItem: Schema.Schema<GoogleCloudDialogflowV2IntentMessageCarouselSelectItem> = Schema.suspend(() => Schema.Struct({
  info: Schema.optional(GoogleCloudDialogflowV2IntentMessageSelectItemInfo),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  image: Schema.optional(GoogleCloudDialogflowV2IntentMessageImage),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageCarouselSelectItem" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageCarouselSelectItem>;

export interface GoogleCloudDialogflowV2IntentMessageCarouselSelect {
  items?: Array<GoogleCloudDialogflowV2IntentMessageCarouselSelectItem>;
}

export const GoogleCloudDialogflowV2IntentMessageCarouselSelect: Schema.Schema<GoogleCloudDialogflowV2IntentMessageCarouselSelect> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentMessageCarouselSelectItem)),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageCarouselSelect" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageCarouselSelect>;

export interface GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction {
  url?: string;
  urlTypeHint?: "URL_TYPE_HINT_UNSPECIFIED" | "AMP_ACTION" | "AMP_CONTENT" | (string & {});
}

export const GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction: Schema.Schema<GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  urlTypeHint: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction>;

export interface GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItem {
  openUriAction?: GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction;
  title?: string;
  description?: string;
  image?: GoogleCloudDialogflowV2IntentMessageImage;
  footer?: string;
}

export const GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItem: Schema.Schema<GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItem> = Schema.suspend(() => Schema.Struct({
  openUriAction: Schema.optional(GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  image: Schema.optional(GoogleCloudDialogflowV2IntentMessageImage),
  footer: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItem" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItem>;

export interface GoogleCloudDialogflowV2IntentMessageBrowseCarouselCard {
  items?: Array<GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItem>;
  imageDisplayOptions?: "IMAGE_DISPLAY_OPTIONS_UNSPECIFIED" | "GRAY" | "WHITE" | "CROPPED" | "BLURRED_BACKGROUND" | (string & {});
}

export const GoogleCloudDialogflowV2IntentMessageBrowseCarouselCard: Schema.Schema<GoogleCloudDialogflowV2IntentMessageBrowseCarouselCard> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItem)),
  imageDisplayOptions: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageBrowseCarouselCard" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageBrowseCarouselCard>;

export interface GoogleCloudDialogflowV2IntentMessageColumnProperties {
  header?: string;
  horizontalAlignment?: "HORIZONTAL_ALIGNMENT_UNSPECIFIED" | "LEADING" | "CENTER" | "TRAILING" | (string & {});
}

export const GoogleCloudDialogflowV2IntentMessageColumnProperties: Schema.Schema<GoogleCloudDialogflowV2IntentMessageColumnProperties> = Schema.suspend(() => Schema.Struct({
  header: Schema.optional(Schema.String),
  horizontalAlignment: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageColumnProperties" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageColumnProperties>;

export interface GoogleCloudDialogflowV2IntentMessageTableCardCell {
  text?: string;
}

export const GoogleCloudDialogflowV2IntentMessageTableCardCell: Schema.Schema<GoogleCloudDialogflowV2IntentMessageTableCardCell> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageTableCardCell" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageTableCardCell>;

export interface GoogleCloudDialogflowV2IntentMessageTableCardRow {
  cells?: Array<GoogleCloudDialogflowV2IntentMessageTableCardCell>;
  dividerAfter?: boolean;
}

export const GoogleCloudDialogflowV2IntentMessageTableCardRow: Schema.Schema<GoogleCloudDialogflowV2IntentMessageTableCardRow> = Schema.suspend(() => Schema.Struct({
  cells: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentMessageTableCardCell)),
  dividerAfter: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageTableCardRow" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageTableCardRow>;

export interface GoogleCloudDialogflowV2IntentMessageTableCard {
  title?: string;
  subtitle?: string;
  image?: GoogleCloudDialogflowV2IntentMessageImage;
  columnProperties?: Array<GoogleCloudDialogflowV2IntentMessageColumnProperties>;
  rows?: Array<GoogleCloudDialogflowV2IntentMessageTableCardRow>;
  buttons?: Array<GoogleCloudDialogflowV2IntentMessageBasicCardButton>;
}

export const GoogleCloudDialogflowV2IntentMessageTableCard: Schema.Schema<GoogleCloudDialogflowV2IntentMessageTableCard> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  subtitle: Schema.optional(Schema.String),
  image: Schema.optional(GoogleCloudDialogflowV2IntentMessageImage),
  columnProperties: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentMessageColumnProperties)),
  rows: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentMessageTableCardRow)),
  buttons: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentMessageBasicCardButton)),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageTableCard" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageTableCard>;

export interface GoogleCloudDialogflowV2IntentMessageMediaContentResponseMediaObject {
  name?: string;
  description?: string;
  largeImage?: GoogleCloudDialogflowV2IntentMessageImage;
  icon?: GoogleCloudDialogflowV2IntentMessageImage;
  contentUrl?: string;
}

export const GoogleCloudDialogflowV2IntentMessageMediaContentResponseMediaObject: Schema.Schema<GoogleCloudDialogflowV2IntentMessageMediaContentResponseMediaObject> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  largeImage: Schema.optional(GoogleCloudDialogflowV2IntentMessageImage),
  icon: Schema.optional(GoogleCloudDialogflowV2IntentMessageImage),
  contentUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageMediaContentResponseMediaObject" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageMediaContentResponseMediaObject>;

export interface GoogleCloudDialogflowV2IntentMessageMediaContent {
  mediaType?: "RESPONSE_MEDIA_TYPE_UNSPECIFIED" | "AUDIO" | (string & {});
  mediaObjects?: Array<GoogleCloudDialogflowV2IntentMessageMediaContentResponseMediaObject>;
}

export const GoogleCloudDialogflowV2IntentMessageMediaContent: Schema.Schema<GoogleCloudDialogflowV2IntentMessageMediaContent> = Schema.suspend(() => Schema.Struct({
  mediaType: Schema.optional(Schema.String),
  mediaObjects: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentMessageMediaContentResponseMediaObject)),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageMediaContent" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageMediaContent>;

export interface GoogleCloudDialogflowV2IntentMessage {
  text?: GoogleCloudDialogflowV2IntentMessageText;
  image?: GoogleCloudDialogflowV2IntentMessageImage;
  quickReplies?: GoogleCloudDialogflowV2IntentMessageQuickReplies;
  card?: GoogleCloudDialogflowV2IntentMessageCard;
  payload?: Record<string, unknown>;
  simpleResponses?: GoogleCloudDialogflowV2IntentMessageSimpleResponses;
  basicCard?: GoogleCloudDialogflowV2IntentMessageBasicCard;
  suggestions?: GoogleCloudDialogflowV2IntentMessageSuggestions;
  linkOutSuggestion?: GoogleCloudDialogflowV2IntentMessageLinkOutSuggestion;
  listSelect?: GoogleCloudDialogflowV2IntentMessageListSelect;
  carouselSelect?: GoogleCloudDialogflowV2IntentMessageCarouselSelect;
  browseCarouselCard?: GoogleCloudDialogflowV2IntentMessageBrowseCarouselCard;
  tableCard?: GoogleCloudDialogflowV2IntentMessageTableCard;
  mediaContent?: GoogleCloudDialogflowV2IntentMessageMediaContent;
  platform?: "PLATFORM_UNSPECIFIED" | "FACEBOOK" | "SLACK" | "TELEGRAM" | "KIK" | "SKYPE" | "LINE" | "VIBER" | "ACTIONS_ON_GOOGLE" | "GOOGLE_HANGOUTS" | (string & {});
}

export const GoogleCloudDialogflowV2IntentMessage: Schema.Schema<GoogleCloudDialogflowV2IntentMessage> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(GoogleCloudDialogflowV2IntentMessageText),
  image: Schema.optional(GoogleCloudDialogflowV2IntentMessageImage),
  quickReplies: Schema.optional(GoogleCloudDialogflowV2IntentMessageQuickReplies),
  card: Schema.optional(GoogleCloudDialogflowV2IntentMessageCard),
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  simpleResponses: Schema.optional(GoogleCloudDialogflowV2IntentMessageSimpleResponses),
  basicCard: Schema.optional(GoogleCloudDialogflowV2IntentMessageBasicCard),
  suggestions: Schema.optional(GoogleCloudDialogflowV2IntentMessageSuggestions),
  linkOutSuggestion: Schema.optional(GoogleCloudDialogflowV2IntentMessageLinkOutSuggestion),
  listSelect: Schema.optional(GoogleCloudDialogflowV2IntentMessageListSelect),
  carouselSelect: Schema.optional(GoogleCloudDialogflowV2IntentMessageCarouselSelect),
  browseCarouselCard: Schema.optional(GoogleCloudDialogflowV2IntentMessageBrowseCarouselCard),
  tableCard: Schema.optional(GoogleCloudDialogflowV2IntentMessageTableCard),
  mediaContent: Schema.optional(GoogleCloudDialogflowV2IntentMessageMediaContent),
  platform: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessage" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessage>;

export interface GoogleCloudDialogflowV2IntentFollowupIntentInfo {
  followupIntentName?: string;
  parentFollowupIntentName?: string;
}

export const GoogleCloudDialogflowV2IntentFollowupIntentInfo: Schema.Schema<GoogleCloudDialogflowV2IntentFollowupIntentInfo> = Schema.suspend(() => Schema.Struct({
  followupIntentName: Schema.optional(Schema.String),
  parentFollowupIntentName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentFollowupIntentInfo" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentFollowupIntentInfo>;

export interface GoogleCloudDialogflowV2Intent {
  name?: string;
  displayName?: string;
  webhookState?: "WEBHOOK_STATE_UNSPECIFIED" | "WEBHOOK_STATE_ENABLED" | "WEBHOOK_STATE_ENABLED_FOR_SLOT_FILLING" | (string & {});
  priority?: number;
  isFallback?: boolean;
  mlDisabled?: boolean;
  liveAgentHandoff?: boolean;
  endInteraction?: boolean;
  inputContextNames?: Array<string>;
  events?: Array<string>;
  trainingPhrases?: Array<GoogleCloudDialogflowV2IntentTrainingPhrase>;
  action?: string;
  outputContexts?: Array<GoogleCloudDialogflowV2Context>;
  resetContexts?: boolean;
  parameters?: Array<GoogleCloudDialogflowV2IntentParameter>;
  messages?: Array<GoogleCloudDialogflowV2IntentMessage>;
  defaultResponsePlatforms?: Array<"PLATFORM_UNSPECIFIED" | "FACEBOOK" | "SLACK" | "TELEGRAM" | "KIK" | "SKYPE" | "LINE" | "VIBER" | "ACTIONS_ON_GOOGLE" | "GOOGLE_HANGOUTS" | (string & {})>;
  rootFollowupIntentName?: string;
  parentFollowupIntentName?: string;
  followupIntentInfo?: Array<GoogleCloudDialogflowV2IntentFollowupIntentInfo>;
}

export const GoogleCloudDialogflowV2Intent: Schema.Schema<GoogleCloudDialogflowV2Intent> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  webhookState: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.Number),
  isFallback: Schema.optional(Schema.Boolean),
  mlDisabled: Schema.optional(Schema.Boolean),
  liveAgentHandoff: Schema.optional(Schema.Boolean),
  endInteraction: Schema.optional(Schema.Boolean),
  inputContextNames: Schema.optional(Schema.Array(Schema.String)),
  events: Schema.optional(Schema.Array(Schema.String)),
  trainingPhrases: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentTrainingPhrase)),
  action: Schema.optional(Schema.String),
  outputContexts: Schema.optional(Schema.Array(GoogleCloudDialogflowV2Context)),
  resetContexts: Schema.optional(Schema.Boolean),
  parameters: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentParameter)),
  messages: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentMessage)),
  defaultResponsePlatforms: Schema.optional(Schema.Array(Schema.String)),
  rootFollowupIntentName: Schema.optional(Schema.String),
  parentFollowupIntentName: Schema.optional(Schema.String),
  followupIntentInfo: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentFollowupIntentInfo)),
})).annotate({ identifier: "GoogleCloudDialogflowV2Intent" }) as any as Schema.Schema<GoogleCloudDialogflowV2Intent>;

export interface GoogleCloudDialogflowV2BatchUpdateIntentsResponse {
  intents?: Array<GoogleCloudDialogflowV2Intent>;
}

export const GoogleCloudDialogflowV2BatchUpdateIntentsResponse: Schema.Schema<GoogleCloudDialogflowV2BatchUpdateIntentsResponse> = Schema.suspend(() => Schema.Struct({
  intents: Schema.optional(Schema.Array(GoogleCloudDialogflowV2Intent)),
})).annotate({ identifier: "GoogleCloudDialogflowV2BatchUpdateIntentsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2BatchUpdateIntentsResponse>;

export interface GoogleCloudDialogflowV2ClearSuggestionFeatureConfigOperationMetadata {
  conversationProfile?: string;
  participantRole?: "ROLE_UNSPECIFIED" | "HUMAN_AGENT" | "AUTOMATED_AGENT" | "END_USER" | (string & {});
  suggestionFeatureType?: "TYPE_UNSPECIFIED" | "ARTICLE_SUGGESTION" | "FAQ" | "SMART_REPLY" | "CONVERSATION_SUMMARIZATION" | "KNOWLEDGE_SEARCH" | "KNOWLEDGE_ASSIST" | (string & {});
  createTime?: string;
}

export const GoogleCloudDialogflowV2ClearSuggestionFeatureConfigOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2ClearSuggestionFeatureConfigOperationMetadata> = Schema.suspend(() => Schema.Struct({
  conversationProfile: Schema.optional(Schema.String),
  participantRole: Schema.optional(Schema.String),
  suggestionFeatureType: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2ClearSuggestionFeatureConfigOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2ClearSuggestionFeatureConfigOperationMetadata>;

export interface GoogleCloudDialogflowV2AnnotatedMessagePart {
  text?: string;
  entityType?: string;
  formattedValue?: unknown;
}

export const GoogleCloudDialogflowV2AnnotatedMessagePart: Schema.Schema<GoogleCloudDialogflowV2AnnotatedMessagePart> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  entityType: Schema.optional(Schema.String),
  formattedValue: Schema.optional(Schema.Unknown),
})).annotate({ identifier: "GoogleCloudDialogflowV2AnnotatedMessagePart" }) as any as Schema.Schema<GoogleCloudDialogflowV2AnnotatedMessagePart>;

export interface GoogleCloudDialogflowV2MessageAnnotation {
  parts?: Array<GoogleCloudDialogflowV2AnnotatedMessagePart>;
  containEntities?: boolean;
}

export const GoogleCloudDialogflowV2MessageAnnotation: Schema.Schema<GoogleCloudDialogflowV2MessageAnnotation> = Schema.suspend(() => Schema.Struct({
  parts: Schema.optional(Schema.Array(GoogleCloudDialogflowV2AnnotatedMessagePart)),
  containEntities: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2MessageAnnotation" }) as any as Schema.Schema<GoogleCloudDialogflowV2MessageAnnotation>;

export interface GoogleCloudDialogflowV2Sentiment {
  score?: number;
  magnitude?: number;
}

export const GoogleCloudDialogflowV2Sentiment: Schema.Schema<GoogleCloudDialogflowV2Sentiment> = Schema.suspend(() => Schema.Struct({
  score: Schema.optional(Schema.Number),
  magnitude: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2Sentiment" }) as any as Schema.Schema<GoogleCloudDialogflowV2Sentiment>;

export interface GoogleCloudDialogflowV2SentimentAnalysisResult {
  queryTextSentiment?: GoogleCloudDialogflowV2Sentiment;
}

export const GoogleCloudDialogflowV2SentimentAnalysisResult: Schema.Schema<GoogleCloudDialogflowV2SentimentAnalysisResult> = Schema.suspend(() => Schema.Struct({
  queryTextSentiment: Schema.optional(GoogleCloudDialogflowV2Sentiment),
})).annotate({ identifier: "GoogleCloudDialogflowV2SentimentAnalysisResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2SentimentAnalysisResult>;

export interface GoogleCloudDialogflowV2Message {
  name?: string;
  content?: string;
  languageCode?: string;
  participant?: string;
  participantRole?: "ROLE_UNSPECIFIED" | "HUMAN_AGENT" | "AUTOMATED_AGENT" | "END_USER" | (string & {});
  createTime?: string;
  sendTime?: string;
  messageAnnotation?: GoogleCloudDialogflowV2MessageAnnotation;
  sentimentAnalysis?: GoogleCloudDialogflowV2SentimentAnalysisResult;
}

export const GoogleCloudDialogflowV2Message: Schema.Schema<GoogleCloudDialogflowV2Message> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  participant: Schema.optional(Schema.String),
  participantRole: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  sendTime: Schema.optional(Schema.String),
  messageAnnotation: Schema.optional(GoogleCloudDialogflowV2MessageAnnotation),
  sentimentAnalysis: Schema.optional(GoogleCloudDialogflowV2SentimentAnalysisResult),
})).annotate({ identifier: "GoogleCloudDialogflowV2Message" }) as any as Schema.Schema<GoogleCloudDialogflowV2Message>;

export interface GoogleCloudDialogflowV2SpeechWordInfo {
  word?: string;
  startOffset?: string;
  endOffset?: string;
  confidence?: number;
}

export const GoogleCloudDialogflowV2SpeechWordInfo: Schema.Schema<GoogleCloudDialogflowV2SpeechWordInfo> = Schema.suspend(() => Schema.Struct({
  word: Schema.optional(Schema.String),
  startOffset: Schema.optional(Schema.String),
  endOffset: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2SpeechWordInfo" }) as any as Schema.Schema<GoogleCloudDialogflowV2SpeechWordInfo>;

export interface GoogleCloudDialogflowV2StreamingRecognitionResult {
  messageType?: "MESSAGE_TYPE_UNSPECIFIED" | "TRANSCRIPT" | "END_OF_SINGLE_UTTERANCE" | (string & {});
  transcript?: string;
  isFinal?: boolean;
  confidence?: number;
  speechWordInfo?: Array<GoogleCloudDialogflowV2SpeechWordInfo>;
  speechEndOffset?: string;
  languageCode?: string;
}

export const GoogleCloudDialogflowV2StreamingRecognitionResult: Schema.Schema<GoogleCloudDialogflowV2StreamingRecognitionResult> = Schema.suspend(() => Schema.Struct({
  messageType: Schema.optional(Schema.String),
  transcript: Schema.optional(Schema.String),
  isFinal: Schema.optional(Schema.Boolean),
  confidence: Schema.optional(Schema.Number),
  speechWordInfo: Schema.optional(Schema.Array(GoogleCloudDialogflowV2SpeechWordInfo)),
  speechEndOffset: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2StreamingRecognitionResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2StreamingRecognitionResult>;

export interface GoogleCloudDialogflowV2ConversationEvent {
  conversation?: string;
  type?: "TYPE_UNSPECIFIED" | "CONVERSATION_STARTED" | "CONVERSATION_FINISHED" | "HUMAN_INTERVENTION_NEEDED" | "NEW_MESSAGE" | "NEW_RECOGNITION_RESULT" | "UNRECOVERABLE_ERROR" | (string & {});
  errorStatus?: GoogleRpcStatus;
  newMessagePayload?: GoogleCloudDialogflowV2Message;
  newRecognitionResultPayload?: GoogleCloudDialogflowV2StreamingRecognitionResult;
}

export const GoogleCloudDialogflowV2ConversationEvent: Schema.Schema<GoogleCloudDialogflowV2ConversationEvent> = Schema.suspend(() => Schema.Struct({
  conversation: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  errorStatus: Schema.optional(GoogleRpcStatus),
  newMessagePayload: Schema.optional(GoogleCloudDialogflowV2Message),
  newRecognitionResultPayload: Schema.optional(GoogleCloudDialogflowV2StreamingRecognitionResult),
})).annotate({ identifier: "GoogleCloudDialogflowV2ConversationEvent" }) as any as Schema.Schema<GoogleCloudDialogflowV2ConversationEvent>;

export interface GoogleCloudDialogflowV2ExportAgentResponse {
  agentUri?: string;
  agentContent?: string;
}

export const GoogleCloudDialogflowV2ExportAgentResponse: Schema.Schema<GoogleCloudDialogflowV2ExportAgentResponse> = Schema.suspend(() => Schema.Struct({
  agentUri: Schema.optional(Schema.String),
  agentContent: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2ExportAgentResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2ExportAgentResponse>;

export interface GoogleCloudDialogflowV2ArticleAnswer {
  title?: string;
  uri?: string;
  snippets?: Array<string>;
  confidence?: number;
  metadata?: Record<string, string>;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2ArticleAnswer: Schema.Schema<GoogleCloudDialogflowV2ArticleAnswer> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  snippets: Schema.optional(Schema.Array(Schema.String)),
  confidence: Schema.optional(Schema.Number),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  answerRecord: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2ArticleAnswer" }) as any as Schema.Schema<GoogleCloudDialogflowV2ArticleAnswer>;

export interface GoogleCloudDialogflowV2SuggestArticlesResponse {
  articleAnswers?: Array<GoogleCloudDialogflowV2ArticleAnswer>;
  latestMessage?: string;
  contextSize?: number;
}

export const GoogleCloudDialogflowV2SuggestArticlesResponse: Schema.Schema<GoogleCloudDialogflowV2SuggestArticlesResponse> = Schema.suspend(() => Schema.Struct({
  articleAnswers: Schema.optional(Schema.Array(GoogleCloudDialogflowV2ArticleAnswer)),
  latestMessage: Schema.optional(Schema.String),
  contextSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2SuggestArticlesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2SuggestArticlesResponse>;

export interface GoogleCloudDialogflowV2KnowledgeAssistAnswerSuggestedQuery {
  queryText?: string;
}

export const GoogleCloudDialogflowV2KnowledgeAssistAnswerSuggestedQuery: Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerSuggestedQuery> = Schema.suspend(() => Schema.Struct({
  queryText: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2KnowledgeAssistAnswerSuggestedQuery" }) as any as Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerSuggestedQuery>;

export interface GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerFaqSource {
  question?: string;
}

export const GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerFaqSource: Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerFaqSource> = Schema.suspend(() => Schema.Struct({
  question: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerFaqSource" }) as any as Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerFaqSource>;

export interface GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet {
  uri?: string;
  text?: string;
  title?: string;
  metadata?: Record<string, unknown>;
}

export const GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet: Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  text: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet" }) as any as Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet>;

export interface GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource {
  snippets?: Array<GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet>;
}

export const GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource: Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource> = Schema.suspend(() => Schema.Struct({
  snippets: Schema.optional(Schema.Array(GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet)),
})).annotate({ identifier: "GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource" }) as any as Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource>;

export interface GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswer {
  answerText?: string;
  faqSource?: GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerFaqSource;
  generativeSource?: GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource;
}

export const GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswer: Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswer> = Schema.suspend(() => Schema.Struct({
  answerText: Schema.optional(Schema.String),
  faqSource: Schema.optional(GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerFaqSource),
  generativeSource: Schema.optional(GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource),
})).annotate({ identifier: "GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswer" }) as any as Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswer>;

export interface GoogleCloudDialogflowV2KnowledgeAssistDebugInfoKnowledgeAssistBehavior {
  answerGenerationRewriterOn?: boolean;
  endUserMetadataIncluded?: boolean;
  returnQueryOnly?: boolean;
  usePubsubDelivery?: boolean;
  disableSyncDelivery?: boolean;
  previousQueriesIncluded?: boolean;
  useTranslatedMessage?: boolean;
  useCustomSafetyFilterLevel?: boolean;
  conversationTranscriptHasMixedLanguages?: boolean;
  queryGenerationAgentLanguageMismatch?: boolean;
  queryGenerationEndUserLanguageMismatch?: boolean;
  thirdPartyConnectorAllowed?: boolean;
  multipleQueriesGenerated?: boolean;
  queryContainedSearchContext?: boolean;
  invalidItemsQuerySuggestionSkipped?: boolean;
  primaryQueryRedactedAndReplaced?: boolean;
  appendedSearchContextCount?: number;
}

export const GoogleCloudDialogflowV2KnowledgeAssistDebugInfoKnowledgeAssistBehavior: Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistDebugInfoKnowledgeAssistBehavior> = Schema.suspend(() => Schema.Struct({
  answerGenerationRewriterOn: Schema.optional(Schema.Boolean),
  endUserMetadataIncluded: Schema.optional(Schema.Boolean),
  returnQueryOnly: Schema.optional(Schema.Boolean),
  usePubsubDelivery: Schema.optional(Schema.Boolean),
  disableSyncDelivery: Schema.optional(Schema.Boolean),
  previousQueriesIncluded: Schema.optional(Schema.Boolean),
  useTranslatedMessage: Schema.optional(Schema.Boolean),
  useCustomSafetyFilterLevel: Schema.optional(Schema.Boolean),
  conversationTranscriptHasMixedLanguages: Schema.optional(Schema.Boolean),
  queryGenerationAgentLanguageMismatch: Schema.optional(Schema.Boolean),
  queryGenerationEndUserLanguageMismatch: Schema.optional(Schema.Boolean),
  thirdPartyConnectorAllowed: Schema.optional(Schema.Boolean),
  multipleQueriesGenerated: Schema.optional(Schema.Boolean),
  queryContainedSearchContext: Schema.optional(Schema.Boolean),
  invalidItemsQuerySuggestionSkipped: Schema.optional(Schema.Boolean),
  primaryQueryRedactedAndReplaced: Schema.optional(Schema.Boolean),
  appendedSearchContextCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2KnowledgeAssistDebugInfoKnowledgeAssistBehavior" }) as any as Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistDebugInfoKnowledgeAssistBehavior>;

export interface GoogleCloudDialogflowV2IngestedContextReferenceDebugInfoIngestedParameterDebugInfo {
  parameter?: string;
  ingestionStatus?: "INGESTION_STATUS_UNSPECIFIED" | "INGESTION_STATUS_SUCCEEDED" | "INGESTION_STATUS_CONTEXT_NOT_AVAILABLE" | "INGESTION_STATUS_PARSE_FAILED" | "INGESTION_STATUS_INVALID_ENTRY" | "INGESTION_STATUS_INVALID_FORMAT" | "INGESTION_STATUS_LANGUAGE_MISMATCH" | (string & {});
}

export const GoogleCloudDialogflowV2IngestedContextReferenceDebugInfoIngestedParameterDebugInfo: Schema.Schema<GoogleCloudDialogflowV2IngestedContextReferenceDebugInfoIngestedParameterDebugInfo> = Schema.suspend(() => Schema.Struct({
  parameter: Schema.optional(Schema.String),
  ingestionStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2IngestedContextReferenceDebugInfoIngestedParameterDebugInfo" }) as any as Schema.Schema<GoogleCloudDialogflowV2IngestedContextReferenceDebugInfoIngestedParameterDebugInfo>;

export interface GoogleCloudDialogflowV2IngestedContextReferenceDebugInfo {
  projectNotAllowlisted?: boolean;
  contextReferenceRetrieved?: boolean;
  ingestedParametersDebugInfo?: Array<GoogleCloudDialogflowV2IngestedContextReferenceDebugInfoIngestedParameterDebugInfo>;
}

export const GoogleCloudDialogflowV2IngestedContextReferenceDebugInfo: Schema.Schema<GoogleCloudDialogflowV2IngestedContextReferenceDebugInfo> = Schema.suspend(() => Schema.Struct({
  projectNotAllowlisted: Schema.optional(Schema.Boolean),
  contextReferenceRetrieved: Schema.optional(Schema.Boolean),
  ingestedParametersDebugInfo: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IngestedContextReferenceDebugInfoIngestedParameterDebugInfo)),
})).annotate({ identifier: "GoogleCloudDialogflowV2IngestedContextReferenceDebugInfo" }) as any as Schema.Schema<GoogleCloudDialogflowV2IngestedContextReferenceDebugInfo>;

export interface GoogleCloudDialogflowV2ServiceLatencyInternalServiceLatency {
  step?: string;
  latencyMs?: number;
  startTime?: string;
  completeTime?: string;
}

export const GoogleCloudDialogflowV2ServiceLatencyInternalServiceLatency: Schema.Schema<GoogleCloudDialogflowV2ServiceLatencyInternalServiceLatency> = Schema.suspend(() => Schema.Struct({
  step: Schema.optional(Schema.String),
  latencyMs: Schema.optional(Schema.Number),
  startTime: Schema.optional(Schema.String),
  completeTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2ServiceLatencyInternalServiceLatency" }) as any as Schema.Schema<GoogleCloudDialogflowV2ServiceLatencyInternalServiceLatency>;

export interface GoogleCloudDialogflowV2ServiceLatency {
  internalServiceLatencies?: Array<GoogleCloudDialogflowV2ServiceLatencyInternalServiceLatency>;
}

export const GoogleCloudDialogflowV2ServiceLatency: Schema.Schema<GoogleCloudDialogflowV2ServiceLatency> = Schema.suspend(() => Schema.Struct({
  internalServiceLatencies: Schema.optional(Schema.Array(GoogleCloudDialogflowV2ServiceLatencyInternalServiceLatency)),
})).annotate({ identifier: "GoogleCloudDialogflowV2ServiceLatency" }) as any as Schema.Schema<GoogleCloudDialogflowV2ServiceLatency>;

export interface GoogleCloudDialogflowV2KnowledgeAssistDebugInfo {
  queryGenerationFailureReason?: "QUERY_GENERATION_FAILURE_REASON_UNSPECIFIED" | "QUERY_GENERATION_OUT_OF_QUOTA" | "QUERY_GENERATION_FAILED" | "QUERY_GENERATION_NO_QUERY_GENERATED" | "QUERY_GENERATION_RAI_FAILED" | "NOT_IN_ALLOWLIST" | "QUERY_GENERATION_QUERY_REDACTED" | "QUERY_GENERATION_LLM_RESPONSE_PARSE_FAILED" | "QUERY_GENERATION_EMPTY_CONVERSATION" | "QUERY_GENERATION_EMPTY_LAST_MESSAGE" | "QUERY_GENERATION_TRIGGERING_EVENT_CONDITION_NOT_MET" | (string & {});
  queryCategorizationFailureReason?: "QUERY_CATEGORIZATION_FAILURE_REASON_UNSPECIFIED" | "QUERY_CATEGORIZATION_INVALID_CONFIG" | "QUERY_CATEGORIZATION_RESULT_NOT_FOUND" | "QUERY_CATEGORIZATION_FAILED" | (string & {});
  datastoreResponseReason?: "DATASTORE_RESPONSE_REASON_UNSPECIFIED" | "NONE" | "SEARCH_OUT_OF_QUOTA" | "SEARCH_EMPTY_RESULTS" | "ANSWER_GENERATION_GEN_AI_DISABLED" | "ANSWER_GENERATION_OUT_OF_QUOTA" | "ANSWER_GENERATION_ERROR" | "ANSWER_GENERATION_NOT_ENOUGH_INFO" | "ANSWER_GENERATION_RAI_FAILED" | "ANSWER_GENERATION_NOT_GROUNDED" | (string & {});
  knowledgeAssistBehavior?: GoogleCloudDialogflowV2KnowledgeAssistDebugInfoKnowledgeAssistBehavior;
  ingestedContextReferenceDebugInfo?: GoogleCloudDialogflowV2IngestedContextReferenceDebugInfo;
  serviceLatency?: GoogleCloudDialogflowV2ServiceLatency;
}

export const GoogleCloudDialogflowV2KnowledgeAssistDebugInfo: Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistDebugInfo> = Schema.suspend(() => Schema.Struct({
  queryGenerationFailureReason: Schema.optional(Schema.String),
  queryCategorizationFailureReason: Schema.optional(Schema.String),
  datastoreResponseReason: Schema.optional(Schema.String),
  knowledgeAssistBehavior: Schema.optional(GoogleCloudDialogflowV2KnowledgeAssistDebugInfoKnowledgeAssistBehavior),
  ingestedContextReferenceDebugInfo: Schema.optional(GoogleCloudDialogflowV2IngestedContextReferenceDebugInfo),
  serviceLatency: Schema.optional(GoogleCloudDialogflowV2ServiceLatency),
})).annotate({ identifier: "GoogleCloudDialogflowV2KnowledgeAssistDebugInfo" }) as any as Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistDebugInfo>;

export interface GoogleCloudDialogflowV2KnowledgeAssistAnswer {
  suggestedQuery?: GoogleCloudDialogflowV2KnowledgeAssistAnswerSuggestedQuery;
  suggestedQueryAnswer?: GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswer;
  answerRecord?: string;
  knowledgeAssistDebugInfo?: GoogleCloudDialogflowV2KnowledgeAssistDebugInfo;
}

export const GoogleCloudDialogflowV2KnowledgeAssistAnswer: Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswer> = Schema.suspend(() => Schema.Struct({
  suggestedQuery: Schema.optional(GoogleCloudDialogflowV2KnowledgeAssistAnswerSuggestedQuery),
  suggestedQueryAnswer: Schema.optional(GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswer),
  answerRecord: Schema.optional(Schema.String),
  knowledgeAssistDebugInfo: Schema.optional(GoogleCloudDialogflowV2KnowledgeAssistDebugInfo),
})).annotate({ identifier: "GoogleCloudDialogflowV2KnowledgeAssistAnswer" }) as any as Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswer>;

export interface GoogleCloudDialogflowV2SuggestKnowledgeAssistResponse {
  knowledgeAssistAnswer?: GoogleCloudDialogflowV2KnowledgeAssistAnswer;
  latestMessage?: string;
  contextSize?: number;
}

export const GoogleCloudDialogflowV2SuggestKnowledgeAssistResponse: Schema.Schema<GoogleCloudDialogflowV2SuggestKnowledgeAssistResponse> = Schema.suspend(() => Schema.Struct({
  knowledgeAssistAnswer: Schema.optional(GoogleCloudDialogflowV2KnowledgeAssistAnswer),
  latestMessage: Schema.optional(Schema.String),
  contextSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2SuggestKnowledgeAssistResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2SuggestKnowledgeAssistResponse>;

export interface GoogleCloudDialogflowV2FaqAnswer {
  answer?: string;
  confidence?: number;
  question?: string;
  source?: string;
  metadata?: Record<string, string>;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2FaqAnswer: Schema.Schema<GoogleCloudDialogflowV2FaqAnswer> = Schema.suspend(() => Schema.Struct({
  answer: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  question: Schema.optional(Schema.String),
  source: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  answerRecord: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2FaqAnswer" }) as any as Schema.Schema<GoogleCloudDialogflowV2FaqAnswer>;

export interface GoogleCloudDialogflowV2SuggestFaqAnswersResponse {
  faqAnswers?: Array<GoogleCloudDialogflowV2FaqAnswer>;
  latestMessage?: string;
  contextSize?: number;
}

export const GoogleCloudDialogflowV2SuggestFaqAnswersResponse: Schema.Schema<GoogleCloudDialogflowV2SuggestFaqAnswersResponse> = Schema.suspend(() => Schema.Struct({
  faqAnswers: Schema.optional(Schema.Array(GoogleCloudDialogflowV2FaqAnswer)),
  latestMessage: Schema.optional(Schema.String),
  contextSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2SuggestFaqAnswersResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2SuggestFaqAnswersResponse>;

export interface GoogleCloudDialogflowV2SmartReplyAnswer {
  reply?: string;
  confidence?: number;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2SmartReplyAnswer: Schema.Schema<GoogleCloudDialogflowV2SmartReplyAnswer> = Schema.suspend(() => Schema.Struct({
  reply: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  answerRecord: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2SmartReplyAnswer" }) as any as Schema.Schema<GoogleCloudDialogflowV2SmartReplyAnswer>;

export interface GoogleCloudDialogflowV2SuggestSmartRepliesResponse {
  smartReplyAnswers?: Array<GoogleCloudDialogflowV2SmartReplyAnswer>;
  latestMessage?: string;
  contextSize?: number;
}

export const GoogleCloudDialogflowV2SuggestSmartRepliesResponse: Schema.Schema<GoogleCloudDialogflowV2SuggestSmartRepliesResponse> = Schema.suspend(() => Schema.Struct({
  smartReplyAnswers: Schema.optional(Schema.Array(GoogleCloudDialogflowV2SmartReplyAnswer)),
  latestMessage: Schema.optional(Schema.String),
  contextSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2SuggestSmartRepliesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2SuggestSmartRepliesResponse>;

export interface GoogleCloudDialogflowV2FreeFormSuggestion {
  response?: string;
}

export const GoogleCloudDialogflowV2FreeFormSuggestion: Schema.Schema<GoogleCloudDialogflowV2FreeFormSuggestion> = Schema.suspend(() => Schema.Struct({
  response: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2FreeFormSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2FreeFormSuggestion>;

export interface GoogleCloudDialogflowV2SummarySuggestionSummarySection {
  section?: string;
  summary?: string;
}

export const GoogleCloudDialogflowV2SummarySuggestionSummarySection: Schema.Schema<GoogleCloudDialogflowV2SummarySuggestionSummarySection> = Schema.suspend(() => Schema.Struct({
  section: Schema.optional(Schema.String),
  summary: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2SummarySuggestionSummarySection" }) as any as Schema.Schema<GoogleCloudDialogflowV2SummarySuggestionSummarySection>;

export interface GoogleCloudDialogflowV2SummarySuggestion {
  summarySections?: Array<GoogleCloudDialogflowV2SummarySuggestionSummarySection>;
}

export const GoogleCloudDialogflowV2SummarySuggestion: Schema.Schema<GoogleCloudDialogflowV2SummarySuggestion> = Schema.suspend(() => Schema.Struct({
  summarySections: Schema.optional(Schema.Array(GoogleCloudDialogflowV2SummarySuggestionSummarySection)),
})).annotate({ identifier: "GoogleCloudDialogflowV2SummarySuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2SummarySuggestion>;

export interface GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion {
  answerRecord?: string;
  suggestionIndex?: number;
  similarityScore?: number;
}

export const GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion: Schema.Schema<GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion> = Schema.suspend(() => Schema.Struct({
  answerRecord: Schema.optional(Schema.String),
  suggestionIndex: Schema.optional(Schema.Number),
  similarityScore: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion>;

export interface GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResult {
  duplicateSuggestions?: Array<GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion>;
}

export const GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResult: Schema.Schema<GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResult> = Schema.suspend(() => Schema.Struct({
  duplicateSuggestions: Schema.optional(Schema.Array(GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion)),
})).annotate({ identifier: "GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResult>;

export interface GoogleCloudDialogflowV2AgentCoachingInstruction {
  displayName?: string;
  displayDetails?: string;
  condition?: string;
  agentAction?: string;
  systemAction?: string;
  duplicateCheckResult?: GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResult;
  triggeringEvent?: "TRIGGER_EVENT_UNSPECIFIED" | "END_OF_UTTERANCE" | "MANUAL_CALL" | "CUSTOMER_MESSAGE" | "AGENT_MESSAGE" | "TOOL_CALL_COMPLETION" | (string & {});
}

export const GoogleCloudDialogflowV2AgentCoachingInstruction: Schema.Schema<GoogleCloudDialogflowV2AgentCoachingInstruction> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  displayDetails: Schema.optional(Schema.String),
  condition: Schema.optional(Schema.String),
  agentAction: Schema.optional(Schema.String),
  systemAction: Schema.optional(Schema.String),
  duplicateCheckResult: Schema.optional(GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResult),
  triggeringEvent: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2AgentCoachingInstruction" }) as any as Schema.Schema<GoogleCloudDialogflowV2AgentCoachingInstruction>;

export interface GoogleCloudDialogflowV2AgentCoachingSuggestionSources {
  instructionIndexes?: Array<number>;
}

export const GoogleCloudDialogflowV2AgentCoachingSuggestionSources: Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionSources> = Schema.suspend(() => Schema.Struct({
  instructionIndexes: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "GoogleCloudDialogflowV2AgentCoachingSuggestionSources" }) as any as Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionSources>;

export interface GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion {
  answerRecord?: string;
  sources?: GoogleCloudDialogflowV2AgentCoachingSuggestionSources;
  suggestionIndex?: number;
  similarityScore?: number;
}

export const GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion: Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion> = Schema.suspend(() => Schema.Struct({
  answerRecord: Schema.optional(Schema.String),
  sources: Schema.optional(GoogleCloudDialogflowV2AgentCoachingSuggestionSources),
  suggestionIndex: Schema.optional(Schema.Number),
  similarityScore: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion>;

export interface GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResult {
  duplicateSuggestions?: Array<GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion>;
}

export const GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResult: Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResult> = Schema.suspend(() => Schema.Struct({
  duplicateSuggestions: Schema.optional(Schema.Array(GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion)),
})).annotate({ identifier: "GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResult>;

export interface GoogleCloudDialogflowV2AgentCoachingSuggestionAgentActionSuggestion {
  agentAction?: string;
  sources?: GoogleCloudDialogflowV2AgentCoachingSuggestionSources;
  duplicateCheckResult?: GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResult;
}

export const GoogleCloudDialogflowV2AgentCoachingSuggestionAgentActionSuggestion: Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionAgentActionSuggestion> = Schema.suspend(() => Schema.Struct({
  agentAction: Schema.optional(Schema.String),
  sources: Schema.optional(GoogleCloudDialogflowV2AgentCoachingSuggestionSources),
  duplicateCheckResult: Schema.optional(GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResult),
})).annotate({ identifier: "GoogleCloudDialogflowV2AgentCoachingSuggestionAgentActionSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionAgentActionSuggestion>;

export interface GoogleCloudDialogflowV2AgentCoachingSuggestionSampleResponse {
  responseText?: string;
  sources?: GoogleCloudDialogflowV2AgentCoachingSuggestionSources;
  duplicateCheckResult?: GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResult;
}

export const GoogleCloudDialogflowV2AgentCoachingSuggestionSampleResponse: Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionSampleResponse> = Schema.suspend(() => Schema.Struct({
  responseText: Schema.optional(Schema.String),
  sources: Schema.optional(GoogleCloudDialogflowV2AgentCoachingSuggestionSources),
  duplicateCheckResult: Schema.optional(GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResult),
})).annotate({ identifier: "GoogleCloudDialogflowV2AgentCoachingSuggestionSampleResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionSampleResponse>;

export interface GoogleCloudDialogflowV2AgentCoachingSuggestion {
  applicableInstructions?: Array<GoogleCloudDialogflowV2AgentCoachingInstruction>;
  agentActionSuggestions?: Array<GoogleCloudDialogflowV2AgentCoachingSuggestionAgentActionSuggestion>;
  sampleResponses?: Array<GoogleCloudDialogflowV2AgentCoachingSuggestionSampleResponse>;
}

export const GoogleCloudDialogflowV2AgentCoachingSuggestion: Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestion> = Schema.suspend(() => Schema.Struct({
  applicableInstructions: Schema.optional(Schema.Array(GoogleCloudDialogflowV2AgentCoachingInstruction)),
  agentActionSuggestions: Schema.optional(Schema.Array(GoogleCloudDialogflowV2AgentCoachingSuggestionAgentActionSuggestion)),
  sampleResponses: Schema.optional(Schema.Array(GoogleCloudDialogflowV2AgentCoachingSuggestionSampleResponse)),
})).annotate({ identifier: "GoogleCloudDialogflowV2AgentCoachingSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestion>;

export interface GoogleCloudDialogflowV2ToolCall {
  tool?: string;
  toolDisplayName?: string;
  toolDisplayDetails?: string;
  action?: string;
  inputParameters?: Record<string, unknown>;
  createTime?: string;
  answerRecord?: string;
  state?: "STATE_UNSPECIFIED" | "TRIGGERED" | "NEEDS_CONFIRMATION" | (string & {});
}

export const GoogleCloudDialogflowV2ToolCall: Schema.Schema<GoogleCloudDialogflowV2ToolCall> = Schema.suspend(() => Schema.Struct({
  tool: Schema.optional(Schema.String),
  toolDisplayName: Schema.optional(Schema.String),
  toolDisplayDetails: Schema.optional(Schema.String),
  action: Schema.optional(Schema.String),
  inputParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  createTime: Schema.optional(Schema.String),
  answerRecord: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2ToolCall" }) as any as Schema.Schema<GoogleCloudDialogflowV2ToolCall>;

export interface GoogleCloudDialogflowV2ToolCallResultError {
  message?: string;
}

export const GoogleCloudDialogflowV2ToolCallResultError: Schema.Schema<GoogleCloudDialogflowV2ToolCallResultError> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2ToolCallResultError" }) as any as Schema.Schema<GoogleCloudDialogflowV2ToolCallResultError>;

export interface GoogleCloudDialogflowV2ToolCallResult {
  tool?: string;
  action?: string;
  error?: GoogleCloudDialogflowV2ToolCallResultError;
  rawContent?: string;
  content?: string;
  createTime?: string;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2ToolCallResult: Schema.Schema<GoogleCloudDialogflowV2ToolCallResult> = Schema.suspend(() => Schema.Struct({
  tool: Schema.optional(Schema.String),
  action: Schema.optional(Schema.String),
  error: Schema.optional(GoogleCloudDialogflowV2ToolCallResultError),
  rawContent: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  answerRecord: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2ToolCallResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2ToolCallResult>;

export interface GoogleCloudDialogflowV2GeneratorSuggestionToolCallInfo {
  toolCall?: GoogleCloudDialogflowV2ToolCall;
  toolCallResult?: GoogleCloudDialogflowV2ToolCallResult;
}

export const GoogleCloudDialogflowV2GeneratorSuggestionToolCallInfo: Schema.Schema<GoogleCloudDialogflowV2GeneratorSuggestionToolCallInfo> = Schema.suspend(() => Schema.Struct({
  toolCall: Schema.optional(GoogleCloudDialogflowV2ToolCall),
  toolCallResult: Schema.optional(GoogleCloudDialogflowV2ToolCallResult),
})).annotate({ identifier: "GoogleCloudDialogflowV2GeneratorSuggestionToolCallInfo" }) as any as Schema.Schema<GoogleCloudDialogflowV2GeneratorSuggestionToolCallInfo>;

export interface GoogleCloudDialogflowV2GeneratorSuggestion {
  freeFormSuggestion?: GoogleCloudDialogflowV2FreeFormSuggestion;
  summarySuggestion?: GoogleCloudDialogflowV2SummarySuggestion;
  agentCoachingSuggestion?: GoogleCloudDialogflowV2AgentCoachingSuggestion;
  toolCallInfo?: Array<GoogleCloudDialogflowV2GeneratorSuggestionToolCallInfo>;
}

export const GoogleCloudDialogflowV2GeneratorSuggestion: Schema.Schema<GoogleCloudDialogflowV2GeneratorSuggestion> = Schema.suspend(() => Schema.Struct({
  freeFormSuggestion: Schema.optional(GoogleCloudDialogflowV2FreeFormSuggestion),
  summarySuggestion: Schema.optional(GoogleCloudDialogflowV2SummarySuggestion),
  agentCoachingSuggestion: Schema.optional(GoogleCloudDialogflowV2AgentCoachingSuggestion),
  toolCallInfo: Schema.optional(Schema.Array(GoogleCloudDialogflowV2GeneratorSuggestionToolCallInfo)),
})).annotate({ identifier: "GoogleCloudDialogflowV2GeneratorSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2GeneratorSuggestion>;

export interface GoogleCloudDialogflowV2GenerateSuggestionsResponseGeneratorSuggestionAnswer {
  generatorSuggestion?: GoogleCloudDialogflowV2GeneratorSuggestion;
  sourceGenerator?: string;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2GenerateSuggestionsResponseGeneratorSuggestionAnswer: Schema.Schema<GoogleCloudDialogflowV2GenerateSuggestionsResponseGeneratorSuggestionAnswer> = Schema.suspend(() => Schema.Struct({
  generatorSuggestion: Schema.optional(GoogleCloudDialogflowV2GeneratorSuggestion),
  sourceGenerator: Schema.optional(Schema.String),
  answerRecord: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2GenerateSuggestionsResponseGeneratorSuggestionAnswer" }) as any as Schema.Schema<GoogleCloudDialogflowV2GenerateSuggestionsResponseGeneratorSuggestionAnswer>;

export interface GoogleCloudDialogflowV2GenerateSuggestionsResponse {
  generatorSuggestionAnswers?: Array<GoogleCloudDialogflowV2GenerateSuggestionsResponseGeneratorSuggestionAnswer>;
  latestMessage?: string;
}

export const GoogleCloudDialogflowV2GenerateSuggestionsResponse: Schema.Schema<GoogleCloudDialogflowV2GenerateSuggestionsResponse> = Schema.suspend(() => Schema.Struct({
  generatorSuggestionAnswers: Schema.optional(Schema.Array(GoogleCloudDialogflowV2GenerateSuggestionsResponseGeneratorSuggestionAnswer)),
  latestMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2GenerateSuggestionsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2GenerateSuggestionsResponse>;

export interface GoogleCloudDialogflowV2SuggestionResult {
  error?: GoogleRpcStatus;
  suggestArticlesResponse?: GoogleCloudDialogflowV2SuggestArticlesResponse;
  suggestKnowledgeAssistResponse?: GoogleCloudDialogflowV2SuggestKnowledgeAssistResponse;
  suggestFaqAnswersResponse?: GoogleCloudDialogflowV2SuggestFaqAnswersResponse;
  suggestSmartRepliesResponse?: GoogleCloudDialogflowV2SuggestSmartRepliesResponse;
  generateSuggestionsResponse?: GoogleCloudDialogflowV2GenerateSuggestionsResponse;
}

export const GoogleCloudDialogflowV2SuggestionResult: Schema.Schema<GoogleCloudDialogflowV2SuggestionResult> = Schema.suspend(() => Schema.Struct({
  error: Schema.optional(GoogleRpcStatus),
  suggestArticlesResponse: Schema.optional(GoogleCloudDialogflowV2SuggestArticlesResponse),
  suggestKnowledgeAssistResponse: Schema.optional(GoogleCloudDialogflowV2SuggestKnowledgeAssistResponse),
  suggestFaqAnswersResponse: Schema.optional(GoogleCloudDialogflowV2SuggestFaqAnswersResponse),
  suggestSmartRepliesResponse: Schema.optional(GoogleCloudDialogflowV2SuggestSmartRepliesResponse),
  generateSuggestionsResponse: Schema.optional(GoogleCloudDialogflowV2GenerateSuggestionsResponse),
})).annotate({ identifier: "GoogleCloudDialogflowV2SuggestionResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2SuggestionResult>;

export interface GoogleCloudDialogflowV2HumanAgentAssistantEvent {
  conversation?: string;
  participant?: string;
  suggestionResults?: Array<GoogleCloudDialogflowV2SuggestionResult>;
}

export const GoogleCloudDialogflowV2HumanAgentAssistantEvent: Schema.Schema<GoogleCloudDialogflowV2HumanAgentAssistantEvent> = Schema.suspend(() => Schema.Struct({
  conversation: Schema.optional(Schema.String),
  participant: Schema.optional(Schema.String),
  suggestionResults: Schema.optional(Schema.Array(GoogleCloudDialogflowV2SuggestionResult)),
})).annotate({ identifier: "GoogleCloudDialogflowV2HumanAgentAssistantEvent" }) as any as Schema.Schema<GoogleCloudDialogflowV2HumanAgentAssistantEvent>;

export interface GoogleCloudDialogflowV2ImportDocumentsResponse {
  warnings?: Array<GoogleRpcStatus>;
}

export const GoogleCloudDialogflowV2ImportDocumentsResponse: Schema.Schema<GoogleCloudDialogflowV2ImportDocumentsResponse> = Schema.suspend(() => Schema.Struct({
  warnings: Schema.optional(Schema.Array(GoogleRpcStatus)),
})).annotate({ identifier: "GoogleCloudDialogflowV2ImportDocumentsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2ImportDocumentsResponse>;

export interface GoogleCloudDialogflowV2GcsDestination {
  uri?: string;
}

export const GoogleCloudDialogflowV2GcsDestination: Schema.Schema<GoogleCloudDialogflowV2GcsDestination> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2GcsDestination" }) as any as Schema.Schema<GoogleCloudDialogflowV2GcsDestination>;

export interface GoogleCloudDialogflowV2ExportOperationMetadata {
  exportedGcsDestination?: GoogleCloudDialogflowV2GcsDestination;
}

export const GoogleCloudDialogflowV2ExportOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2ExportOperationMetadata> = Schema.suspend(() => Schema.Struct({
  exportedGcsDestination: Schema.optional(GoogleCloudDialogflowV2GcsDestination),
})).annotate({ identifier: "GoogleCloudDialogflowV2ExportOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2ExportOperationMetadata>;

export interface GoogleCloudDialogflowV2KnowledgeOperationMetadata {
  state?: "STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "DONE" | (string & {});
  knowledgeBase?: string;
  exportOperationMetadata?: GoogleCloudDialogflowV2ExportOperationMetadata;
  doneTime?: string;
}

export const GoogleCloudDialogflowV2KnowledgeOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2KnowledgeOperationMetadata> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  knowledgeBase: Schema.optional(Schema.String),
  exportOperationMetadata: Schema.optional(GoogleCloudDialogflowV2ExportOperationMetadata),
  doneTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2KnowledgeOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2KnowledgeOperationMetadata>;

export interface GoogleCloudDialogflowV2OriginalDetectIntentRequest {
  source?: string;
  version?: string;
  payload?: Record<string, unknown>;
}

export const GoogleCloudDialogflowV2OriginalDetectIntentRequest: Schema.Schema<GoogleCloudDialogflowV2OriginalDetectIntentRequest> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowV2OriginalDetectIntentRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2OriginalDetectIntentRequest>;

export interface GoogleCloudDialogflowV2SetSuggestionFeatureConfigOperationMetadata {
  conversationProfile?: string;
  participantRole?: "ROLE_UNSPECIFIED" | "HUMAN_AGENT" | "AUTOMATED_AGENT" | "END_USER" | (string & {});
  suggestionFeatureType?: "TYPE_UNSPECIFIED" | "ARTICLE_SUGGESTION" | "FAQ" | "SMART_REPLY" | "CONVERSATION_SUMMARIZATION" | "KNOWLEDGE_SEARCH" | "KNOWLEDGE_ASSIST" | (string & {});
  createTime?: string;
}

export const GoogleCloudDialogflowV2SetSuggestionFeatureConfigOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2SetSuggestionFeatureConfigOperationMetadata> = Schema.suspend(() => Schema.Struct({
  conversationProfile: Schema.optional(Schema.String),
  participantRole: Schema.optional(Schema.String),
  suggestionFeatureType: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2SetSuggestionFeatureConfigOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2SetSuggestionFeatureConfigOperationMetadata>;

export interface GoogleCloudDialogflowV2QueryResult {
  queryText?: string;
  languageCode?: string;
  speechRecognitionConfidence?: number;
  action?: string;
  parameters?: Record<string, unknown>;
  allRequiredParamsPresent?: boolean;
  cancelsSlotFilling?: boolean;
  fulfillmentText?: string;
  fulfillmentMessages?: Array<GoogleCloudDialogflowV2IntentMessage>;
  webhookSource?: string;
  webhookPayload?: Record<string, unknown>;
  outputContexts?: Array<GoogleCloudDialogflowV2Context>;
  intent?: GoogleCloudDialogflowV2Intent;
  intentDetectionConfidence?: number;
  diagnosticInfo?: Record<string, unknown>;
  sentimentAnalysisResult?: GoogleCloudDialogflowV2SentimentAnalysisResult;
}

export const GoogleCloudDialogflowV2QueryResult: Schema.Schema<GoogleCloudDialogflowV2QueryResult> = Schema.suspend(() => Schema.Struct({
  queryText: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  speechRecognitionConfidence: Schema.optional(Schema.Number),
  action: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  allRequiredParamsPresent: Schema.optional(Schema.Boolean),
  cancelsSlotFilling: Schema.optional(Schema.Boolean),
  fulfillmentText: Schema.optional(Schema.String),
  fulfillmentMessages: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentMessage)),
  webhookSource: Schema.optional(Schema.String),
  webhookPayload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  outputContexts: Schema.optional(Schema.Array(GoogleCloudDialogflowV2Context)),
  intent: Schema.optional(GoogleCloudDialogflowV2Intent),
  intentDetectionConfidence: Schema.optional(Schema.Number),
  diagnosticInfo: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  sentimentAnalysisResult: Schema.optional(GoogleCloudDialogflowV2SentimentAnalysisResult),
})).annotate({ identifier: "GoogleCloudDialogflowV2QueryResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2QueryResult>;

export interface GoogleCloudDialogflowV2WebhookRequest {
  session?: string;
  responseId?: string;
  queryResult?: GoogleCloudDialogflowV2QueryResult;
  originalDetectIntentRequest?: GoogleCloudDialogflowV2OriginalDetectIntentRequest;
}

export const GoogleCloudDialogflowV2WebhookRequest: Schema.Schema<GoogleCloudDialogflowV2WebhookRequest> = Schema.suspend(() => Schema.Struct({
  session: Schema.optional(Schema.String),
  responseId: Schema.optional(Schema.String),
  queryResult: Schema.optional(GoogleCloudDialogflowV2QueryResult),
  originalDetectIntentRequest: Schema.optional(GoogleCloudDialogflowV2OriginalDetectIntentRequest),
})).annotate({ identifier: "GoogleCloudDialogflowV2WebhookRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2WebhookRequest>;

export interface GoogleCloudDialogflowV2EventInput {
  name?: string;
  parameters?: Record<string, unknown>;
  languageCode?: string;
}

export const GoogleCloudDialogflowV2EventInput: Schema.Schema<GoogleCloudDialogflowV2EventInput> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2EventInput" }) as any as Schema.Schema<GoogleCloudDialogflowV2EventInput>;

export interface GoogleCloudDialogflowV2SessionEntityType {
  name?: string;
  entityOverrideMode?: "ENTITY_OVERRIDE_MODE_UNSPECIFIED" | "ENTITY_OVERRIDE_MODE_OVERRIDE" | "ENTITY_OVERRIDE_MODE_SUPPLEMENT" | (string & {});
  entities?: Array<GoogleCloudDialogflowV2EntityTypeEntity>;
}

export const GoogleCloudDialogflowV2SessionEntityType: Schema.Schema<GoogleCloudDialogflowV2SessionEntityType> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  entityOverrideMode: Schema.optional(Schema.String),
  entities: Schema.optional(Schema.Array(GoogleCloudDialogflowV2EntityTypeEntity)),
})).annotate({ identifier: "GoogleCloudDialogflowV2SessionEntityType" }) as any as Schema.Schema<GoogleCloudDialogflowV2SessionEntityType>;

export interface GoogleCloudDialogflowV2WebhookResponse {
  fulfillmentText?: string;
  fulfillmentMessages?: Array<GoogleCloudDialogflowV2IntentMessage>;
  source?: string;
  payload?: Record<string, unknown>;
  outputContexts?: Array<GoogleCloudDialogflowV2Context>;
  followupEventInput?: GoogleCloudDialogflowV2EventInput;
  sessionEntityTypes?: Array<GoogleCloudDialogflowV2SessionEntityType>;
}

export const GoogleCloudDialogflowV2WebhookResponse: Schema.Schema<GoogleCloudDialogflowV2WebhookResponse> = Schema.suspend(() => Schema.Struct({
  fulfillmentText: Schema.optional(Schema.String),
  fulfillmentMessages: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentMessage)),
  source: Schema.optional(Schema.String),
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  outputContexts: Schema.optional(Schema.Array(GoogleCloudDialogflowV2Context)),
  followupEventInput: Schema.optional(GoogleCloudDialogflowV2EventInput),
  sessionEntityTypes: Schema.optional(Schema.Array(GoogleCloudDialogflowV2SessionEntityType)),
})).annotate({ identifier: "GoogleCloudDialogflowV2WebhookResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2WebhookResponse>;

export interface GoogleCloudDialogflowV2DeleteConversationDatasetOperationMetadata {
}

export const GoogleCloudDialogflowV2DeleteConversationDatasetOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2DeleteConversationDatasetOperationMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowV2DeleteConversationDatasetOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2DeleteConversationDatasetOperationMetadata>;

export interface GoogleCloudDialogflowV2ImportConversationDataOperationResponse {
  conversationDataset?: string;
  importCount?: number;
}

export const GoogleCloudDialogflowV2ImportConversationDataOperationResponse: Schema.Schema<GoogleCloudDialogflowV2ImportConversationDataOperationResponse> = Schema.suspend(() => Schema.Struct({
  conversationDataset: Schema.optional(Schema.String),
  importCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2ImportConversationDataOperationResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2ImportConversationDataOperationResponse>;

export interface GoogleCloudDialogflowV2ImportConversationDataOperationMetadata {
  conversationDataset?: string;
  partialFailures?: Array<GoogleRpcStatus>;
  createTime?: string;
}

export const GoogleCloudDialogflowV2ImportConversationDataOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2ImportConversationDataOperationMetadata> = Schema.suspend(() => Schema.Struct({
  conversationDataset: Schema.optional(Schema.String),
  partialFailures: Schema.optional(Schema.Array(GoogleRpcStatus)),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2ImportConversationDataOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2ImportConversationDataOperationMetadata>;

export interface GoogleCloudDialogflowV2EncryptionSpec {
  name?: string;
  kmsKey?: string;
}

export const GoogleCloudDialogflowV2EncryptionSpec: Schema.Schema<GoogleCloudDialogflowV2EncryptionSpec> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  kmsKey: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2EncryptionSpec" }) as any as Schema.Schema<GoogleCloudDialogflowV2EncryptionSpec>;

export interface GoogleCloudDialogflowV2InitializeEncryptionSpecRequest {
  encryptionSpec?: GoogleCloudDialogflowV2EncryptionSpec;
}

export const GoogleCloudDialogflowV2InitializeEncryptionSpecRequest: Schema.Schema<GoogleCloudDialogflowV2InitializeEncryptionSpecRequest> = Schema.suspend(() => Schema.Struct({
  encryptionSpec: Schema.optional(GoogleCloudDialogflowV2EncryptionSpec),
})).annotate({ identifier: "GoogleCloudDialogflowV2InitializeEncryptionSpecRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2InitializeEncryptionSpecRequest>;

export interface GoogleCloudDialogflowV2InitializeEncryptionSpecMetadata {
  request?: GoogleCloudDialogflowV2InitializeEncryptionSpecRequest;
}

export const GoogleCloudDialogflowV2InitializeEncryptionSpecMetadata: Schema.Schema<GoogleCloudDialogflowV2InitializeEncryptionSpecMetadata> = Schema.suspend(() => Schema.Struct({
  request: Schema.optional(GoogleCloudDialogflowV2InitializeEncryptionSpecRequest),
})).annotate({ identifier: "GoogleCloudDialogflowV2InitializeEncryptionSpecMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2InitializeEncryptionSpecMetadata>;

export interface GoogleCloudDialogflowV2CreateConversationDatasetOperationMetadata {
  conversationDataset?: string;
}

export const GoogleCloudDialogflowV2CreateConversationDatasetOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2CreateConversationDatasetOperationMetadata> = Schema.suspend(() => Schema.Struct({
  conversationDataset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2CreateConversationDatasetOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2CreateConversationDatasetOperationMetadata>;

export interface GoogleCloudDialogflowV2InputDataset {
  dataset?: string;
}

export const GoogleCloudDialogflowV2InputDataset: Schema.Schema<GoogleCloudDialogflowV2InputDataset> = Schema.suspend(() => Schema.Struct({
  dataset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2InputDataset" }) as any as Schema.Schema<GoogleCloudDialogflowV2InputDataset>;

export interface GoogleCloudDialogflowV2ArticleSuggestionModelMetadata {
  trainingModelType?: "MODEL_TYPE_UNSPECIFIED" | "SMART_REPLY_DUAL_ENCODER_MODEL" | "SMART_REPLY_BERT_MODEL" | (string & {});
}

export const GoogleCloudDialogflowV2ArticleSuggestionModelMetadata: Schema.Schema<GoogleCloudDialogflowV2ArticleSuggestionModelMetadata> = Schema.suspend(() => Schema.Struct({
  trainingModelType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2ArticleSuggestionModelMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2ArticleSuggestionModelMetadata>;

export interface GoogleCloudDialogflowV2SmartReplyModelMetadata {
  trainingModelType?: "MODEL_TYPE_UNSPECIFIED" | "SMART_REPLY_DUAL_ENCODER_MODEL" | "SMART_REPLY_BERT_MODEL" | (string & {});
}

export const GoogleCloudDialogflowV2SmartReplyModelMetadata: Schema.Schema<GoogleCloudDialogflowV2SmartReplyModelMetadata> = Schema.suspend(() => Schema.Struct({
  trainingModelType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2SmartReplyModelMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2SmartReplyModelMetadata>;

export interface GoogleCloudDialogflowV2ConversationModel {
  name?: string;
  displayName?: string;
  createTime?: string;
  datasets?: Array<GoogleCloudDialogflowV2InputDataset>;
  state?: "STATE_UNSPECIFIED" | "CREATING" | "UNDEPLOYED" | "DEPLOYING" | "DEPLOYED" | "UNDEPLOYING" | "DELETING" | "FAILED" | "PENDING" | (string & {});
  languageCode?: string;
  articleSuggestionModelMetadata?: GoogleCloudDialogflowV2ArticleSuggestionModelMetadata;
  smartReplyModelMetadata?: GoogleCloudDialogflowV2SmartReplyModelMetadata;
  satisfiesPzs?: boolean;
  satisfiesPzi?: boolean;
}

export const GoogleCloudDialogflowV2ConversationModel: Schema.Schema<GoogleCloudDialogflowV2ConversationModel> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  datasets: Schema.optional(Schema.Array(GoogleCloudDialogflowV2InputDataset)),
  state: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  articleSuggestionModelMetadata: Schema.optional(GoogleCloudDialogflowV2ArticleSuggestionModelMetadata),
  smartReplyModelMetadata: Schema.optional(GoogleCloudDialogflowV2SmartReplyModelMetadata),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  satisfiesPzi: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2ConversationModel" }) as any as Schema.Schema<GoogleCloudDialogflowV2ConversationModel>;

export interface GoogleCloudDialogflowV2CreateConversationModelOperationMetadata {
  conversationModel?: string;
  state?: "STATE_UNSPECIFIED" | "PENDING" | "SUCCEEDED" | "FAILED" | "CANCELLED" | "CANCELLING" | "TRAINING" | (string & {});
  createTime?: string;
  doneTime?: string;
}

export const GoogleCloudDialogflowV2CreateConversationModelOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2CreateConversationModelOperationMetadata> = Schema.suspend(() => Schema.Struct({
  conversationModel: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  doneTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2CreateConversationModelOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2CreateConversationModelOperationMetadata>;

export interface GoogleCloudDialogflowV2DeleteConversationModelOperationMetadata {
  conversationModel?: string;
  createTime?: string;
  doneTime?: string;
}

export const GoogleCloudDialogflowV2DeleteConversationModelOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2DeleteConversationModelOperationMetadata> = Schema.suspend(() => Schema.Struct({
  conversationModel: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  doneTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2DeleteConversationModelOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2DeleteConversationModelOperationMetadata>;

export interface GoogleCloudDialogflowV2DeployConversationModelOperationMetadata {
  conversationModel?: string;
  createTime?: string;
  doneTime?: string;
}

export const GoogleCloudDialogflowV2DeployConversationModelOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2DeployConversationModelOperationMetadata> = Schema.suspend(() => Schema.Struct({
  conversationModel: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  doneTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2DeployConversationModelOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2DeployConversationModelOperationMetadata>;

export interface GoogleCloudDialogflowV2UndeployConversationModelOperationMetadata {
  conversationModel?: string;
  createTime?: string;
  doneTime?: string;
}

export const GoogleCloudDialogflowV2UndeployConversationModelOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2UndeployConversationModelOperationMetadata> = Schema.suspend(() => Schema.Struct({
  conversationModel: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  doneTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2UndeployConversationModelOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2UndeployConversationModelOperationMetadata>;

export interface GoogleCloudDialogflowV2CreateConversationModelEvaluationOperationMetadata {
  conversationModelEvaluation?: string;
  conversationModel?: string;
  state?: "STATE_UNSPECIFIED" | "INITIALIZING" | "RUNNING" | "CANCELLED" | "SUCCEEDED" | "FAILED" | (string & {});
  createTime?: string;
}

export const GoogleCloudDialogflowV2CreateConversationModelEvaluationOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2CreateConversationModelEvaluationOperationMetadata> = Schema.suspend(() => Schema.Struct({
  conversationModelEvaluation: Schema.optional(Schema.String),
  conversationModel: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2CreateConversationModelEvaluationOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2CreateConversationModelEvaluationOperationMetadata>;

export interface GoogleCloudDialogflowV2beta1EntityTypeEntity {
  value?: string;
  synonyms?: Array<string>;
}

export const GoogleCloudDialogflowV2beta1EntityTypeEntity: Schema.Schema<GoogleCloudDialogflowV2beta1EntityTypeEntity> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  synonyms: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1EntityTypeEntity" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1EntityTypeEntity>;

export interface GoogleCloudDialogflowV2beta1EntityType {
  name?: string;
  displayName?: string;
  kind?: "KIND_UNSPECIFIED" | "KIND_MAP" | "KIND_LIST" | "KIND_REGEXP" | (string & {});
  autoExpansionMode?: "AUTO_EXPANSION_MODE_UNSPECIFIED" | "AUTO_EXPANSION_MODE_DEFAULT" | (string & {});
  entities?: Array<GoogleCloudDialogflowV2beta1EntityTypeEntity>;
  enableFuzzyExtraction?: boolean;
}

export const GoogleCloudDialogflowV2beta1EntityType: Schema.Schema<GoogleCloudDialogflowV2beta1EntityType> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  autoExpansionMode: Schema.optional(Schema.String),
  entities: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1EntityTypeEntity)),
  enableFuzzyExtraction: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1EntityType" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1EntityType>;

export interface GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesResponse {
  entityTypes?: Array<GoogleCloudDialogflowV2beta1EntityType>;
}

export const GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesResponse: Schema.Schema<GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesResponse> = Schema.suspend(() => Schema.Struct({
  entityTypes: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1EntityType)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesResponse>;

export interface GoogleCloudDialogflowV2beta1IntentTrainingPhrasePart {
  text?: string;
  entityType?: string;
  alias?: string;
  userDefined?: boolean;
}

export const GoogleCloudDialogflowV2beta1IntentTrainingPhrasePart: Schema.Schema<GoogleCloudDialogflowV2beta1IntentTrainingPhrasePart> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  entityType: Schema.optional(Schema.String),
  alias: Schema.optional(Schema.String),
  userDefined: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentTrainingPhrasePart" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentTrainingPhrasePart>;

export interface GoogleCloudDialogflowV2beta1IntentTrainingPhrase {
  name?: string;
  type?: "TYPE_UNSPECIFIED" | "EXAMPLE" | "TEMPLATE" | (string & {});
  parts?: Array<GoogleCloudDialogflowV2beta1IntentTrainingPhrasePart>;
  timesAddedCount?: number;
}

export const GoogleCloudDialogflowV2beta1IntentTrainingPhrase: Schema.Schema<GoogleCloudDialogflowV2beta1IntentTrainingPhrase> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  parts: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentTrainingPhrasePart)),
  timesAddedCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentTrainingPhrase" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentTrainingPhrase>;

export interface GoogleCloudDialogflowV2beta1Context {
  name?: string;
  lifespanCount?: number;
  parameters?: Record<string, unknown>;
}

export const GoogleCloudDialogflowV2beta1Context: Schema.Schema<GoogleCloudDialogflowV2beta1Context> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  lifespanCount: Schema.optional(Schema.Number),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1Context" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1Context>;

export interface GoogleCloudDialogflowV2beta1IntentParameter {
  name?: string;
  displayName?: string;
  value?: string;
  defaultValue?: string;
  entityTypeDisplayName?: string;
  mandatory?: boolean;
  prompts?: Array<string>;
  isList?: boolean;
}

export const GoogleCloudDialogflowV2beta1IntentParameter: Schema.Schema<GoogleCloudDialogflowV2beta1IntentParameter> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
  defaultValue: Schema.optional(Schema.String),
  entityTypeDisplayName: Schema.optional(Schema.String),
  mandatory: Schema.optional(Schema.Boolean),
  prompts: Schema.optional(Schema.Array(Schema.String)),
  isList: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentParameter" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentParameter>;

export interface GoogleCloudDialogflowV2beta1IntentMessageText {
  text?: Array<string>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageText: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageText> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageText" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageText>;

export interface GoogleCloudDialogflowV2beta1IntentMessageImage {
  imageUri?: string;
  accessibilityText?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageImage: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageImage> = Schema.suspend(() => Schema.Struct({
  imageUri: Schema.optional(Schema.String),
  accessibilityText: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageImage" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageImage>;

export interface GoogleCloudDialogflowV2beta1IntentMessageQuickReplies {
  title?: string;
  quickReplies?: Array<string>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageQuickReplies: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageQuickReplies> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  quickReplies: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageQuickReplies" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageQuickReplies>;

export interface GoogleCloudDialogflowV2beta1IntentMessageCardButton {
  text?: string;
  postback?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageCardButton: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageCardButton> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  postback: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageCardButton" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageCardButton>;

export interface GoogleCloudDialogflowV2beta1IntentMessageCard {
  title?: string;
  subtitle?: string;
  imageUri?: string;
  buttons?: Array<GoogleCloudDialogflowV2beta1IntentMessageCardButton>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageCard: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageCard> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  subtitle: Schema.optional(Schema.String),
  imageUri: Schema.optional(Schema.String),
  buttons: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageCardButton)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageCard" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageCard>;

export interface GoogleCloudDialogflowV2beta1IntentMessageSimpleResponse {
  textToSpeech?: string;
  ssml?: string;
  displayText?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageSimpleResponse: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageSimpleResponse> = Schema.suspend(() => Schema.Struct({
  textToSpeech: Schema.optional(Schema.String),
  ssml: Schema.optional(Schema.String),
  displayText: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageSimpleResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageSimpleResponse>;

export interface GoogleCloudDialogflowV2beta1IntentMessageSimpleResponses {
  simpleResponses?: Array<GoogleCloudDialogflowV2beta1IntentMessageSimpleResponse>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageSimpleResponses: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageSimpleResponses> = Schema.suspend(() => Schema.Struct({
  simpleResponses: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageSimpleResponse)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageSimpleResponses" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageSimpleResponses>;

export interface GoogleCloudDialogflowV2beta1IntentMessageBasicCardButtonOpenUriAction {
  uri?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageBasicCardButtonOpenUriAction: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBasicCardButtonOpenUriAction> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageBasicCardButtonOpenUriAction" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBasicCardButtonOpenUriAction>;

export interface GoogleCloudDialogflowV2beta1IntentMessageBasicCardButton {
  title?: string;
  openUriAction?: GoogleCloudDialogflowV2beta1IntentMessageBasicCardButtonOpenUriAction;
}

export const GoogleCloudDialogflowV2beta1IntentMessageBasicCardButton: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBasicCardButton> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  openUriAction: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageBasicCardButtonOpenUriAction),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageBasicCardButton" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBasicCardButton>;

export interface GoogleCloudDialogflowV2beta1IntentMessageBasicCard {
  title?: string;
  subtitle?: string;
  formattedText?: string;
  image?: GoogleCloudDialogflowV2beta1IntentMessageImage;
  buttons?: Array<GoogleCloudDialogflowV2beta1IntentMessageBasicCardButton>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageBasicCard: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBasicCard> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  subtitle: Schema.optional(Schema.String),
  formattedText: Schema.optional(Schema.String),
  image: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageImage),
  buttons: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageBasicCardButton)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageBasicCard" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBasicCard>;

export interface GoogleCloudDialogflowV2beta1IntentMessageSuggestion {
  title?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageSuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageSuggestion> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageSuggestion>;

export interface GoogleCloudDialogflowV2beta1IntentMessageSuggestions {
  suggestions?: Array<GoogleCloudDialogflowV2beta1IntentMessageSuggestion>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageSuggestions: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageSuggestions> = Schema.suspend(() => Schema.Struct({
  suggestions: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageSuggestion)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageSuggestions" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageSuggestions>;

export interface GoogleCloudDialogflowV2beta1IntentMessageLinkOutSuggestion {
  destinationName?: string;
  uri?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageLinkOutSuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageLinkOutSuggestion> = Schema.suspend(() => Schema.Struct({
  destinationName: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageLinkOutSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageLinkOutSuggestion>;

export interface GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo {
  key?: string;
  synonyms?: Array<string>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  synonyms: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo>;

export interface GoogleCloudDialogflowV2beta1IntentMessageListSelectItem {
  info?: GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo;
  title?: string;
  description?: string;
  image?: GoogleCloudDialogflowV2beta1IntentMessageImage;
}

export const GoogleCloudDialogflowV2beta1IntentMessageListSelectItem: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageListSelectItem> = Schema.suspend(() => Schema.Struct({
  info: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  image: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageImage),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageListSelectItem" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageListSelectItem>;

export interface GoogleCloudDialogflowV2beta1IntentMessageListSelect {
  title?: string;
  items?: Array<GoogleCloudDialogflowV2beta1IntentMessageListSelectItem>;
  subtitle?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageListSelect: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageListSelect> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageListSelectItem)),
  subtitle: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageListSelect" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageListSelect>;

export interface GoogleCloudDialogflowV2beta1IntentMessageCarouselSelectItem {
  info?: GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo;
  title?: string;
  description?: string;
  image?: GoogleCloudDialogflowV2beta1IntentMessageImage;
}

export const GoogleCloudDialogflowV2beta1IntentMessageCarouselSelectItem: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageCarouselSelectItem> = Schema.suspend(() => Schema.Struct({
  info: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  image: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageImage),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageCarouselSelectItem" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageCarouselSelectItem>;

export interface GoogleCloudDialogflowV2beta1IntentMessageCarouselSelect {
  items?: Array<GoogleCloudDialogflowV2beta1IntentMessageCarouselSelectItem>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageCarouselSelect: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageCarouselSelect> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageCarouselSelectItem)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageCarouselSelect" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageCarouselSelect>;

export interface GoogleCloudDialogflowV2beta1IntentMessageTelephonyPlayAudio {
  audioUri?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageTelephonyPlayAudio: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTelephonyPlayAudio> = Schema.suspend(() => Schema.Struct({
  audioUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageTelephonyPlayAudio" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTelephonyPlayAudio>;

export interface GoogleCloudDialogflowV2beta1IntentMessageTelephonySynthesizeSpeech {
  text?: string;
  ssml?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageTelephonySynthesizeSpeech: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTelephonySynthesizeSpeech> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  ssml: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageTelephonySynthesizeSpeech" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTelephonySynthesizeSpeech>;

export interface GoogleCloudDialogflowV2beta1IntentMessageTelephonyTransferCall {
  phoneNumber?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageTelephonyTransferCall: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTelephonyTransferCall> = Schema.suspend(() => Schema.Struct({
  phoneNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageTelephonyTransferCall" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTelephonyTransferCall>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedReply {
  text?: string;
  postbackData?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedReply: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedReply> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  postbackData: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedReply" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedReply>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionDial {
  phoneNumber?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionDial: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionDial> = Schema.suspend(() => Schema.Struct({
  phoneNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionDial" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionDial>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionOpenUri {
  uri?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionOpenUri: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionOpenUri> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionOpenUri" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionOpenUri>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionShareLocation {
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionShareLocation: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionShareLocation> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionShareLocation" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionShareLocation>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedAction {
  text?: string;
  postbackData?: string;
  dial?: GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionDial;
  openUrl?: GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionOpenUri;
  shareLocation?: GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionShareLocation;
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedAction: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedAction> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  postbackData: Schema.optional(Schema.String),
  dial: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionDial),
  openUrl: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionOpenUri),
  shareLocation: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionShareLocation),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedAction" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedAction>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion {
  reply?: GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedReply;
  action?: GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedAction;
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion> = Schema.suspend(() => Schema.Struct({
  reply: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedReply),
  action: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedAction),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmText {
  text?: string;
  rbmSuggestion?: Array<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmText: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmText> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  rbmSuggestion: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageRbmText" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmText>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmCardContentRbmMedia {
  fileUri?: string;
  thumbnailUri?: string;
  height?: "HEIGHT_UNSPECIFIED" | "SHORT" | "MEDIUM" | "TALL" | (string & {});
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmCardContentRbmMedia: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmCardContentRbmMedia> = Schema.suspend(() => Schema.Struct({
  fileUri: Schema.optional(Schema.String),
  thumbnailUri: Schema.optional(Schema.String),
  height: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageRbmCardContentRbmMedia" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmCardContentRbmMedia>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent {
  title?: string;
  description?: string;
  media?: GoogleCloudDialogflowV2beta1IntentMessageRbmCardContentRbmMedia;
  suggestions?: Array<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  media: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageRbmCardContentRbmMedia),
  suggestions: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmStandaloneCard {
  cardOrientation?: "CARD_ORIENTATION_UNSPECIFIED" | "HORIZONTAL" | "VERTICAL" | (string & {});
  thumbnailImageAlignment?: "THUMBNAIL_IMAGE_ALIGNMENT_UNSPECIFIED" | "LEFT" | "RIGHT" | (string & {});
  cardContent?: GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent;
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmStandaloneCard: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmStandaloneCard> = Schema.suspend(() => Schema.Struct({
  cardOrientation: Schema.optional(Schema.String),
  thumbnailImageAlignment: Schema.optional(Schema.String),
  cardContent: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageRbmStandaloneCard" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmStandaloneCard>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmCarouselCard {
  cardWidth?: "CARD_WIDTH_UNSPECIFIED" | "SMALL" | "MEDIUM" | (string & {});
  cardContents?: Array<GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmCarouselCard: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmCarouselCard> = Schema.suspend(() => Schema.Struct({
  cardWidth: Schema.optional(Schema.String),
  cardContents: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageRbmCarouselCard" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmCarouselCard>;

export interface GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction {
  url?: string;
  urlTypeHint?: "URL_TYPE_HINT_UNSPECIFIED" | "AMP_ACTION" | "AMP_CONTENT" | (string & {});
}

export const GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  urlTypeHint: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction>;

export interface GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItem {
  openUriAction?: GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction;
  title?: string;
  description?: string;
  image?: GoogleCloudDialogflowV2beta1IntentMessageImage;
  footer?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItem: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItem> = Schema.suspend(() => Schema.Struct({
  openUriAction: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  image: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageImage),
  footer: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItem" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItem>;

export interface GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCard {
  items?: Array<GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItem>;
  imageDisplayOptions?: "IMAGE_DISPLAY_OPTIONS_UNSPECIFIED" | "GRAY" | "WHITE" | "CROPPED" | "BLURRED_BACKGROUND" | (string & {});
}

export const GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCard: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCard> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItem)),
  imageDisplayOptions: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCard" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCard>;

export interface GoogleCloudDialogflowV2beta1IntentMessageColumnProperties {
  header?: string;
  horizontalAlignment?: "HORIZONTAL_ALIGNMENT_UNSPECIFIED" | "LEADING" | "CENTER" | "TRAILING" | (string & {});
}

export const GoogleCloudDialogflowV2beta1IntentMessageColumnProperties: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageColumnProperties> = Schema.suspend(() => Schema.Struct({
  header: Schema.optional(Schema.String),
  horizontalAlignment: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageColumnProperties" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageColumnProperties>;

export interface GoogleCloudDialogflowV2beta1IntentMessageTableCardCell {
  text?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageTableCardCell: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTableCardCell> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageTableCardCell" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTableCardCell>;

export interface GoogleCloudDialogflowV2beta1IntentMessageTableCardRow {
  cells?: Array<GoogleCloudDialogflowV2beta1IntentMessageTableCardCell>;
  dividerAfter?: boolean;
}

export const GoogleCloudDialogflowV2beta1IntentMessageTableCardRow: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTableCardRow> = Schema.suspend(() => Schema.Struct({
  cells: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageTableCardCell)),
  dividerAfter: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageTableCardRow" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTableCardRow>;

export interface GoogleCloudDialogflowV2beta1IntentMessageTableCard {
  title?: string;
  subtitle?: string;
  image?: GoogleCloudDialogflowV2beta1IntentMessageImage;
  columnProperties?: Array<GoogleCloudDialogflowV2beta1IntentMessageColumnProperties>;
  rows?: Array<GoogleCloudDialogflowV2beta1IntentMessageTableCardRow>;
  buttons?: Array<GoogleCloudDialogflowV2beta1IntentMessageBasicCardButton>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageTableCard: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTableCard> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  subtitle: Schema.optional(Schema.String),
  image: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageImage),
  columnProperties: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageColumnProperties)),
  rows: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageTableCardRow)),
  buttons: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageBasicCardButton)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageTableCard" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTableCard>;

export interface GoogleCloudDialogflowV2beta1IntentMessageMediaContentResponseMediaObject {
  name?: string;
  description?: string;
  largeImage?: GoogleCloudDialogflowV2beta1IntentMessageImage;
  icon?: GoogleCloudDialogflowV2beta1IntentMessageImage;
  contentUrl?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageMediaContentResponseMediaObject: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageMediaContentResponseMediaObject> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  largeImage: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageImage),
  icon: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageImage),
  contentUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageMediaContentResponseMediaObject" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageMediaContentResponseMediaObject>;

export interface GoogleCloudDialogflowV2beta1IntentMessageMediaContent {
  mediaType?: "RESPONSE_MEDIA_TYPE_UNSPECIFIED" | "AUDIO" | (string & {});
  mediaObjects?: Array<GoogleCloudDialogflowV2beta1IntentMessageMediaContentResponseMediaObject>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageMediaContent: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageMediaContent> = Schema.suspend(() => Schema.Struct({
  mediaType: Schema.optional(Schema.String),
  mediaObjects: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageMediaContentResponseMediaObject)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageMediaContent" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageMediaContent>;

export interface GoogleCloudDialogflowV2beta1IntentMessage {
  text?: GoogleCloudDialogflowV2beta1IntentMessageText;
  image?: GoogleCloudDialogflowV2beta1IntentMessageImage;
  quickReplies?: GoogleCloudDialogflowV2beta1IntentMessageQuickReplies;
  card?: GoogleCloudDialogflowV2beta1IntentMessageCard;
  payload?: Record<string, unknown>;
  simpleResponses?: GoogleCloudDialogflowV2beta1IntentMessageSimpleResponses;
  basicCard?: GoogleCloudDialogflowV2beta1IntentMessageBasicCard;
  suggestions?: GoogleCloudDialogflowV2beta1IntentMessageSuggestions;
  linkOutSuggestion?: GoogleCloudDialogflowV2beta1IntentMessageLinkOutSuggestion;
  listSelect?: GoogleCloudDialogflowV2beta1IntentMessageListSelect;
  carouselSelect?: GoogleCloudDialogflowV2beta1IntentMessageCarouselSelect;
  telephonyPlayAudio?: GoogleCloudDialogflowV2beta1IntentMessageTelephonyPlayAudio;
  telephonySynthesizeSpeech?: GoogleCloudDialogflowV2beta1IntentMessageTelephonySynthesizeSpeech;
  telephonyTransferCall?: GoogleCloudDialogflowV2beta1IntentMessageTelephonyTransferCall;
  rbmText?: GoogleCloudDialogflowV2beta1IntentMessageRbmText;
  rbmStandaloneRichCard?: GoogleCloudDialogflowV2beta1IntentMessageRbmStandaloneCard;
  rbmCarouselRichCard?: GoogleCloudDialogflowV2beta1IntentMessageRbmCarouselCard;
  browseCarouselCard?: GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCard;
  tableCard?: GoogleCloudDialogflowV2beta1IntentMessageTableCard;
  mediaContent?: GoogleCloudDialogflowV2beta1IntentMessageMediaContent;
  platform?: "PLATFORM_UNSPECIFIED" | "FACEBOOK" | "SLACK" | "TELEGRAM" | "KIK" | "SKYPE" | "LINE" | "VIBER" | "ACTIONS_ON_GOOGLE" | "TELEPHONY" | "GOOGLE_HANGOUTS" | (string & {});
}

export const GoogleCloudDialogflowV2beta1IntentMessage: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessage> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageText),
  image: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageImage),
  quickReplies: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageQuickReplies),
  card: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageCard),
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  simpleResponses: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageSimpleResponses),
  basicCard: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageBasicCard),
  suggestions: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageSuggestions),
  linkOutSuggestion: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageLinkOutSuggestion),
  listSelect: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageListSelect),
  carouselSelect: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageCarouselSelect),
  telephonyPlayAudio: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageTelephonyPlayAudio),
  telephonySynthesizeSpeech: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageTelephonySynthesizeSpeech),
  telephonyTransferCall: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageTelephonyTransferCall),
  rbmText: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageRbmText),
  rbmStandaloneRichCard: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageRbmStandaloneCard),
  rbmCarouselRichCard: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageRbmCarouselCard),
  browseCarouselCard: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCard),
  tableCard: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageTableCard),
  mediaContent: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageMediaContent),
  platform: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessage" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessage>;

export interface GoogleCloudDialogflowV2beta1IntentFollowupIntentInfo {
  followupIntentName?: string;
  parentFollowupIntentName?: string;
}

export const GoogleCloudDialogflowV2beta1IntentFollowupIntentInfo: Schema.Schema<GoogleCloudDialogflowV2beta1IntentFollowupIntentInfo> = Schema.suspend(() => Schema.Struct({
  followupIntentName: Schema.optional(Schema.String),
  parentFollowupIntentName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentFollowupIntentInfo" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentFollowupIntentInfo>;

export interface GoogleCloudDialogflowV2beta1Intent {
  name?: string;
  displayName?: string;
  webhookState?: "WEBHOOK_STATE_UNSPECIFIED" | "WEBHOOK_STATE_ENABLED" | "WEBHOOK_STATE_ENABLED_FOR_SLOT_FILLING" | (string & {});
  priority?: number;
  isFallback?: boolean;
  mlEnabled?: boolean;
  mlDisabled?: boolean;
  liveAgentHandoff?: boolean;
  endInteraction?: boolean;
  inputContextNames?: Array<string>;
  events?: Array<string>;
  trainingPhrases?: Array<GoogleCloudDialogflowV2beta1IntentTrainingPhrase>;
  action?: string;
  outputContexts?: Array<GoogleCloudDialogflowV2beta1Context>;
  resetContexts?: boolean;
  parameters?: Array<GoogleCloudDialogflowV2beta1IntentParameter>;
  messages?: Array<GoogleCloudDialogflowV2beta1IntentMessage>;
  defaultResponsePlatforms?: Array<"PLATFORM_UNSPECIFIED" | "FACEBOOK" | "SLACK" | "TELEGRAM" | "KIK" | "SKYPE" | "LINE" | "VIBER" | "ACTIONS_ON_GOOGLE" | "TELEPHONY" | "GOOGLE_HANGOUTS" | (string & {})>;
  rootFollowupIntentName?: string;
  parentFollowupIntentName?: string;
  followupIntentInfo?: Array<GoogleCloudDialogflowV2beta1IntentFollowupIntentInfo>;
}

export const GoogleCloudDialogflowV2beta1Intent: Schema.Schema<GoogleCloudDialogflowV2beta1Intent> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  webhookState: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.Number),
  isFallback: Schema.optional(Schema.Boolean),
  mlEnabled: Schema.optional(Schema.Boolean),
  mlDisabled: Schema.optional(Schema.Boolean),
  liveAgentHandoff: Schema.optional(Schema.Boolean),
  endInteraction: Schema.optional(Schema.Boolean),
  inputContextNames: Schema.optional(Schema.Array(Schema.String)),
  events: Schema.optional(Schema.Array(Schema.String)),
  trainingPhrases: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentTrainingPhrase)),
  action: Schema.optional(Schema.String),
  outputContexts: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1Context)),
  resetContexts: Schema.optional(Schema.Boolean),
  parameters: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentParameter)),
  messages: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessage)),
  defaultResponsePlatforms: Schema.optional(Schema.Array(Schema.String)),
  rootFollowupIntentName: Schema.optional(Schema.String),
  parentFollowupIntentName: Schema.optional(Schema.String),
  followupIntentInfo: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentFollowupIntentInfo)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1Intent" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1Intent>;

export interface GoogleCloudDialogflowV2beta1BatchUpdateIntentsResponse {
  intents?: Array<GoogleCloudDialogflowV2beta1Intent>;
}

export const GoogleCloudDialogflowV2beta1BatchUpdateIntentsResponse: Schema.Schema<GoogleCloudDialogflowV2beta1BatchUpdateIntentsResponse> = Schema.suspend(() => Schema.Struct({
  intents: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1Intent)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1BatchUpdateIntentsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1BatchUpdateIntentsResponse>;

export interface GoogleCloudDialogflowV2beta1ClearSuggestionFeatureConfigOperationMetadata {
  conversationProfile?: string;
  participantRole?: "ROLE_UNSPECIFIED" | "HUMAN_AGENT" | "AUTOMATED_AGENT" | "END_USER" | (string & {});
  suggestionFeatureType?: "TYPE_UNSPECIFIED" | "ARTICLE_SUGGESTION" | "FAQ" | "SMART_REPLY" | "DIALOGFLOW_ASSIST" | "CONVERSATION_SUMMARIZATION" | "KNOWLEDGE_SEARCH" | "KNOWLEDGE_ASSIST" | (string & {});
  createTime?: string;
}

export const GoogleCloudDialogflowV2beta1ClearSuggestionFeatureConfigOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2beta1ClearSuggestionFeatureConfigOperationMetadata> = Schema.suspend(() => Schema.Struct({
  conversationProfile: Schema.optional(Schema.String),
  participantRole: Schema.optional(Schema.String),
  suggestionFeatureType: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ClearSuggestionFeatureConfigOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ClearSuggestionFeatureConfigOperationMetadata>;

export interface GoogleCloudDialogflowV2beta1ResponseMessageText {
  text?: Array<string>;
}

export const GoogleCloudDialogflowV2beta1ResponseMessageText: Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageText> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ResponseMessageText" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageText>;

export interface GoogleCloudDialogflowV2beta1ResponseMessageLiveAgentHandoff {
  metadata?: Record<string, unknown>;
}

export const GoogleCloudDialogflowV2beta1ResponseMessageLiveAgentHandoff: Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageLiveAgentHandoff> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ResponseMessageLiveAgentHandoff" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageLiveAgentHandoff>;

export interface GoogleCloudDialogflowV2beta1ResponseMessageEndInteraction {
}

export const GoogleCloudDialogflowV2beta1ResponseMessageEndInteraction: Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageEndInteraction> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ResponseMessageEndInteraction" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageEndInteraction>;

export interface GoogleCloudDialogflowV2beta1ResponseMessageMixedAudioSegment {
  audio?: string;
  uri?: string;
  allowPlaybackInterruption?: boolean;
}

export const GoogleCloudDialogflowV2beta1ResponseMessageMixedAudioSegment: Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageMixedAudioSegment> = Schema.suspend(() => Schema.Struct({
  audio: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  allowPlaybackInterruption: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ResponseMessageMixedAudioSegment" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageMixedAudioSegment>;

export interface GoogleCloudDialogflowV2beta1ResponseMessageMixedAudio {
  segments?: Array<GoogleCloudDialogflowV2beta1ResponseMessageMixedAudioSegment>;
}

export const GoogleCloudDialogflowV2beta1ResponseMessageMixedAudio: Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageMixedAudio> = Schema.suspend(() => Schema.Struct({
  segments: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1ResponseMessageMixedAudioSegment)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ResponseMessageMixedAudio" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageMixedAudio>;

export interface GoogleCloudDialogflowV2beta1ResponseMessageTelephonyTransferCall {
  phoneNumber?: string;
  sipUri?: string;
}

export const GoogleCloudDialogflowV2beta1ResponseMessageTelephonyTransferCall: Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageTelephonyTransferCall> = Schema.suspend(() => Schema.Struct({
  phoneNumber: Schema.optional(Schema.String),
  sipUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ResponseMessageTelephonyTransferCall" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageTelephonyTransferCall>;

export interface GoogleCloudDialogflowV2beta1ResponseMessage {
  text?: GoogleCloudDialogflowV2beta1ResponseMessageText;
  payload?: Record<string, unknown>;
  liveAgentHandoff?: GoogleCloudDialogflowV2beta1ResponseMessageLiveAgentHandoff;
  endInteraction?: GoogleCloudDialogflowV2beta1ResponseMessageEndInteraction;
  mixedAudio?: GoogleCloudDialogflowV2beta1ResponseMessageMixedAudio;
  telephonyTransferCall?: GoogleCloudDialogflowV2beta1ResponseMessageTelephonyTransferCall;
}

export const GoogleCloudDialogflowV2beta1ResponseMessage: Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessage> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(GoogleCloudDialogflowV2beta1ResponseMessageText),
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  liveAgentHandoff: Schema.optional(GoogleCloudDialogflowV2beta1ResponseMessageLiveAgentHandoff),
  endInteraction: Schema.optional(GoogleCloudDialogflowV2beta1ResponseMessageEndInteraction),
  mixedAudio: Schema.optional(GoogleCloudDialogflowV2beta1ResponseMessageMixedAudio),
  telephonyTransferCall: Schema.optional(GoogleCloudDialogflowV2beta1ResponseMessageTelephonyTransferCall),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ResponseMessage" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessage>;

export interface GoogleCloudDialogflowV2beta1AnnotatedMessagePart {
  text?: string;
  entityType?: string;
  formattedValue?: unknown;
}

export const GoogleCloudDialogflowV2beta1AnnotatedMessagePart: Schema.Schema<GoogleCloudDialogflowV2beta1AnnotatedMessagePart> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  entityType: Schema.optional(Schema.String),
  formattedValue: Schema.optional(Schema.Unknown),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AnnotatedMessagePart" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AnnotatedMessagePart>;

export interface GoogleCloudDialogflowV2beta1MessageAnnotation {
  parts?: Array<GoogleCloudDialogflowV2beta1AnnotatedMessagePart>;
  containEntities?: boolean;
}

export const GoogleCloudDialogflowV2beta1MessageAnnotation: Schema.Schema<GoogleCloudDialogflowV2beta1MessageAnnotation> = Schema.suspend(() => Schema.Struct({
  parts: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1AnnotatedMessagePart)),
  containEntities: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1MessageAnnotation" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1MessageAnnotation>;

export interface GoogleCloudDialogflowV2beta1Sentiment {
  score?: number;
  magnitude?: number;
}

export const GoogleCloudDialogflowV2beta1Sentiment: Schema.Schema<GoogleCloudDialogflowV2beta1Sentiment> = Schema.suspend(() => Schema.Struct({
  score: Schema.optional(Schema.Number),
  magnitude: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1Sentiment" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1Sentiment>;

export interface GoogleCloudDialogflowV2beta1SentimentAnalysisResult {
  queryTextSentiment?: GoogleCloudDialogflowV2beta1Sentiment;
}

export const GoogleCloudDialogflowV2beta1SentimentAnalysisResult: Schema.Schema<GoogleCloudDialogflowV2beta1SentimentAnalysisResult> = Schema.suspend(() => Schema.Struct({
  queryTextSentiment: Schema.optional(GoogleCloudDialogflowV2beta1Sentiment),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SentimentAnalysisResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SentimentAnalysisResult>;

export interface GoogleCloudDialogflowV2beta1Message {
  name?: string;
  content?: string;
  responseMessages?: Array<GoogleCloudDialogflowV2beta1ResponseMessage>;
  languageCode?: string;
  participant?: string;
  participantRole?: "ROLE_UNSPECIFIED" | "HUMAN_AGENT" | "AUTOMATED_AGENT" | "END_USER" | (string & {});
  createTime?: string;
  sendTime?: string;
  messageAnnotation?: GoogleCloudDialogflowV2beta1MessageAnnotation;
  sentimentAnalysis?: GoogleCloudDialogflowV2beta1SentimentAnalysisResult;
}

export const GoogleCloudDialogflowV2beta1Message: Schema.Schema<GoogleCloudDialogflowV2beta1Message> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
  responseMessages: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1ResponseMessage)),
  languageCode: Schema.optional(Schema.String),
  participant: Schema.optional(Schema.String),
  participantRole: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  sendTime: Schema.optional(Schema.String),
  messageAnnotation: Schema.optional(GoogleCloudDialogflowV2beta1MessageAnnotation),
  sentimentAnalysis: Schema.optional(GoogleCloudDialogflowV2beta1SentimentAnalysisResult),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1Message" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1Message>;

export interface GoogleCloudDialogflowV2beta1SpeechWordInfo {
  word?: string;
  startOffset?: string;
  endOffset?: string;
  confidence?: number;
}

export const GoogleCloudDialogflowV2beta1SpeechWordInfo: Schema.Schema<GoogleCloudDialogflowV2beta1SpeechWordInfo> = Schema.suspend(() => Schema.Struct({
  word: Schema.optional(Schema.String),
  startOffset: Schema.optional(Schema.String),
  endOffset: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SpeechWordInfo" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SpeechWordInfo>;

export interface GoogleCloudDialogflowV2beta1TelephonyDtmfEvents {
  dtmfEvents?: Array<"TELEPHONY_DTMF_UNSPECIFIED" | "DTMF_ONE" | "DTMF_TWO" | "DTMF_THREE" | "DTMF_FOUR" | "DTMF_FIVE" | "DTMF_SIX" | "DTMF_SEVEN" | "DTMF_EIGHT" | "DTMF_NINE" | "DTMF_ZERO" | "DTMF_A" | "DTMF_B" | "DTMF_C" | "DTMF_D" | "DTMF_STAR" | "DTMF_POUND" | (string & {})>;
}

export const GoogleCloudDialogflowV2beta1TelephonyDtmfEvents: Schema.Schema<GoogleCloudDialogflowV2beta1TelephonyDtmfEvents> = Schema.suspend(() => Schema.Struct({
  dtmfEvents: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1TelephonyDtmfEvents" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1TelephonyDtmfEvents>;

export interface GoogleCloudDialogflowV2beta1StreamingRecognitionResult {
  messageType?: "MESSAGE_TYPE_UNSPECIFIED" | "TRANSCRIPT" | "END_OF_SINGLE_UTTERANCE" | "DTMF_DIGITS" | "PARTIAL_DTMF_DIGITS" | (string & {});
  transcript?: string;
  isFinal?: boolean;
  confidence?: number;
  stability?: number;
  speechWordInfo?: Array<GoogleCloudDialogflowV2beta1SpeechWordInfo>;
  speechEndOffset?: string;
  languageCode?: string;
  dtmfDigits?: GoogleCloudDialogflowV2beta1TelephonyDtmfEvents;
}

export const GoogleCloudDialogflowV2beta1StreamingRecognitionResult: Schema.Schema<GoogleCloudDialogflowV2beta1StreamingRecognitionResult> = Schema.suspend(() => Schema.Struct({
  messageType: Schema.optional(Schema.String),
  transcript: Schema.optional(Schema.String),
  isFinal: Schema.optional(Schema.Boolean),
  confidence: Schema.optional(Schema.Number),
  stability: Schema.optional(Schema.Number),
  speechWordInfo: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SpeechWordInfo)),
  speechEndOffset: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  dtmfDigits: Schema.optional(GoogleCloudDialogflowV2beta1TelephonyDtmfEvents),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1StreamingRecognitionResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1StreamingRecognitionResult>;

export interface GoogleCloudDialogflowV2beta1ConversationEvent {
  conversation?: string;
  type?: "TYPE_UNSPECIFIED" | "CONVERSATION_STARTED" | "CONVERSATION_FINISHED" | "HUMAN_INTERVENTION_NEEDED" | "NEW_MESSAGE" | "NEW_RECOGNITION_RESULT" | "UNRECOVERABLE_ERROR" | (string & {});
  errorStatus?: GoogleRpcStatus;
  newMessagePayload?: GoogleCloudDialogflowV2beta1Message;
  newRecognitionResultPayload?: GoogleCloudDialogflowV2beta1StreamingRecognitionResult;
}

export const GoogleCloudDialogflowV2beta1ConversationEvent: Schema.Schema<GoogleCloudDialogflowV2beta1ConversationEvent> = Schema.suspend(() => Schema.Struct({
  conversation: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  errorStatus: Schema.optional(GoogleRpcStatus),
  newMessagePayload: Schema.optional(GoogleCloudDialogflowV2beta1Message),
  newRecognitionResultPayload: Schema.optional(GoogleCloudDialogflowV2beta1StreamingRecognitionResult),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ConversationEvent" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ConversationEvent>;

export interface GoogleCloudDialogflowV2beta1ExportAgentResponse {
  agentUri?: string;
  agentContent?: string;
}

export const GoogleCloudDialogflowV2beta1ExportAgentResponse: Schema.Schema<GoogleCloudDialogflowV2beta1ExportAgentResponse> = Schema.suspend(() => Schema.Struct({
  agentUri: Schema.optional(Schema.String),
  agentContent: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ExportAgentResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ExportAgentResponse>;

export interface GoogleCloudDialogflowV2beta1ArticleAnswer {
  title?: string;
  uri?: string;
  snippets?: Array<string>;
  metadata?: Record<string, string>;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2beta1ArticleAnswer: Schema.Schema<GoogleCloudDialogflowV2beta1ArticleAnswer> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  snippets: Schema.optional(Schema.Array(Schema.String)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  answerRecord: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ArticleAnswer" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ArticleAnswer>;

export interface GoogleCloudDialogflowV2beta1SuggestArticlesResponse {
  articleAnswers?: Array<GoogleCloudDialogflowV2beta1ArticleAnswer>;
  latestMessage?: string;
  contextSize?: number;
}

export const GoogleCloudDialogflowV2beta1SuggestArticlesResponse: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestArticlesResponse> = Schema.suspend(() => Schema.Struct({
  articleAnswers: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1ArticleAnswer)),
  latestMessage: Schema.optional(Schema.String),
  contextSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SuggestArticlesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestArticlesResponse>;

export interface GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerSuggestedQuery {
  queryText?: string;
}

export const GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerSuggestedQuery: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerSuggestedQuery> = Schema.suspend(() => Schema.Struct({
  queryText: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerSuggestedQuery" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerSuggestedQuery>;

export interface GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerFaqSource {
  question?: string;
}

export const GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerFaqSource: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerFaqSource> = Schema.suspend(() => Schema.Struct({
  question: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerFaqSource" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerFaqSource>;

export interface GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet {
  uri?: string;
  text?: string;
  title?: string;
  metadata?: Record<string, unknown>;
}

export const GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  text: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet>;

export interface GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource {
  snippets?: Array<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet>;
}

export const GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource> = Schema.suspend(() => Schema.Struct({
  snippets: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource>;

export interface GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswer {
  answerText?: string;
  faqSource?: GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerFaqSource;
  generativeSource?: GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource;
}

export const GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswer: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswer> = Schema.suspend(() => Schema.Struct({
  answerText: Schema.optional(Schema.String),
  faqSource: Schema.optional(GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerFaqSource),
  generativeSource: Schema.optional(GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswer" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswer>;

export interface GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfoKnowledgeAssistBehavior {
  answerGenerationRewriterOn?: boolean;
  endUserMetadataIncluded?: boolean;
  returnQueryOnly?: boolean;
  usePubsubDelivery?: boolean;
  disableSyncDelivery?: boolean;
  previousQueriesIncluded?: boolean;
  useTranslatedMessage?: boolean;
  useCustomSafetyFilterLevel?: boolean;
  conversationTranscriptHasMixedLanguages?: boolean;
  queryGenerationAgentLanguageMismatch?: boolean;
  queryGenerationEndUserLanguageMismatch?: boolean;
  thirdPartyConnectorAllowed?: boolean;
  multipleQueriesGenerated?: boolean;
  queryContainedSearchContext?: boolean;
  invalidItemsQuerySuggestionSkipped?: boolean;
  primaryQueryRedactedAndReplaced?: boolean;
  appendedSearchContextCount?: number;
}

export const GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfoKnowledgeAssistBehavior: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfoKnowledgeAssistBehavior> = Schema.suspend(() => Schema.Struct({
  answerGenerationRewriterOn: Schema.optional(Schema.Boolean),
  endUserMetadataIncluded: Schema.optional(Schema.Boolean),
  returnQueryOnly: Schema.optional(Schema.Boolean),
  usePubsubDelivery: Schema.optional(Schema.Boolean),
  disableSyncDelivery: Schema.optional(Schema.Boolean),
  previousQueriesIncluded: Schema.optional(Schema.Boolean),
  useTranslatedMessage: Schema.optional(Schema.Boolean),
  useCustomSafetyFilterLevel: Schema.optional(Schema.Boolean),
  conversationTranscriptHasMixedLanguages: Schema.optional(Schema.Boolean),
  queryGenerationAgentLanguageMismatch: Schema.optional(Schema.Boolean),
  queryGenerationEndUserLanguageMismatch: Schema.optional(Schema.Boolean),
  thirdPartyConnectorAllowed: Schema.optional(Schema.Boolean),
  multipleQueriesGenerated: Schema.optional(Schema.Boolean),
  queryContainedSearchContext: Schema.optional(Schema.Boolean),
  invalidItemsQuerySuggestionSkipped: Schema.optional(Schema.Boolean),
  primaryQueryRedactedAndReplaced: Schema.optional(Schema.Boolean),
  appendedSearchContextCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfoKnowledgeAssistBehavior" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfoKnowledgeAssistBehavior>;

export interface GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfoIngestedParameterDebugInfo {
  parameter?: string;
  ingestionStatus?: "INGESTION_STATUS_UNSPECIFIED" | "INGESTION_STATUS_SUCCEEDED" | "INGESTION_STATUS_CONTEXT_NOT_AVAILABLE" | "INGESTION_STATUS_PARSE_FAILED" | "INGESTION_STATUS_INVALID_ENTRY" | "INGESTION_STATUS_INVALID_FORMAT" | "INGESTION_STATUS_LANGUAGE_MISMATCH" | (string & {});
}

export const GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfoIngestedParameterDebugInfo: Schema.Schema<GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfoIngestedParameterDebugInfo> = Schema.suspend(() => Schema.Struct({
  parameter: Schema.optional(Schema.String),
  ingestionStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfoIngestedParameterDebugInfo" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfoIngestedParameterDebugInfo>;

export interface GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfo {
  projectNotAllowlisted?: boolean;
  contextReferenceRetrieved?: boolean;
  ingestedParametersDebugInfo?: Array<GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfoIngestedParameterDebugInfo>;
}

export const GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfo: Schema.Schema<GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfo> = Schema.suspend(() => Schema.Struct({
  projectNotAllowlisted: Schema.optional(Schema.Boolean),
  contextReferenceRetrieved: Schema.optional(Schema.Boolean),
  ingestedParametersDebugInfo: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfoIngestedParameterDebugInfo)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfo" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfo>;

export interface GoogleCloudDialogflowV2beta1ServiceLatencyInternalServiceLatency {
  step?: string;
  latencyMs?: number;
  startTime?: string;
  completeTime?: string;
}

export const GoogleCloudDialogflowV2beta1ServiceLatencyInternalServiceLatency: Schema.Schema<GoogleCloudDialogflowV2beta1ServiceLatencyInternalServiceLatency> = Schema.suspend(() => Schema.Struct({
  step: Schema.optional(Schema.String),
  latencyMs: Schema.optional(Schema.Number),
  startTime: Schema.optional(Schema.String),
  completeTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ServiceLatencyInternalServiceLatency" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ServiceLatencyInternalServiceLatency>;

export interface GoogleCloudDialogflowV2beta1ServiceLatency {
  internalServiceLatencies?: Array<GoogleCloudDialogflowV2beta1ServiceLatencyInternalServiceLatency>;
}

export const GoogleCloudDialogflowV2beta1ServiceLatency: Schema.Schema<GoogleCloudDialogflowV2beta1ServiceLatency> = Schema.suspend(() => Schema.Struct({
  internalServiceLatencies: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1ServiceLatencyInternalServiceLatency)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ServiceLatency" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ServiceLatency>;

export interface GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfo {
  queryGenerationFailureReason?: "QUERY_GENERATION_FAILURE_REASON_UNSPECIFIED" | "QUERY_GENERATION_OUT_OF_QUOTA" | "QUERY_GENERATION_FAILED" | "QUERY_GENERATION_NO_QUERY_GENERATED" | "QUERY_GENERATION_RAI_FAILED" | "NOT_IN_ALLOWLIST" | "QUERY_GENERATION_QUERY_REDACTED" | "QUERY_GENERATION_LLM_RESPONSE_PARSE_FAILED" | "QUERY_GENERATION_EMPTY_CONVERSATION" | "QUERY_GENERATION_EMPTY_LAST_MESSAGE" | "QUERY_GENERATION_TRIGGERING_EVENT_CONDITION_NOT_MET" | (string & {});
  queryCategorizationFailureReason?: "QUERY_CATEGORIZATION_FAILURE_REASON_UNSPECIFIED" | "QUERY_CATEGORIZATION_INVALID_CONFIG" | "QUERY_CATEGORIZATION_RESULT_NOT_FOUND" | "QUERY_CATEGORIZATION_FAILED" | (string & {});
  datastoreResponseReason?: "DATASTORE_RESPONSE_REASON_UNSPECIFIED" | "NONE" | "SEARCH_OUT_OF_QUOTA" | "SEARCH_EMPTY_RESULTS" | "ANSWER_GENERATION_GEN_AI_DISABLED" | "ANSWER_GENERATION_OUT_OF_QUOTA" | "ANSWER_GENERATION_ERROR" | "ANSWER_GENERATION_NOT_ENOUGH_INFO" | "ANSWER_GENERATION_RAI_FAILED" | "ANSWER_GENERATION_NOT_GROUNDED" | (string & {});
  knowledgeAssistBehavior?: GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfoKnowledgeAssistBehavior;
  ingestedContextReferenceDebugInfo?: GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfo;
  serviceLatency?: GoogleCloudDialogflowV2beta1ServiceLatency;
}

export const GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfo: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfo> = Schema.suspend(() => Schema.Struct({
  queryGenerationFailureReason: Schema.optional(Schema.String),
  queryCategorizationFailureReason: Schema.optional(Schema.String),
  datastoreResponseReason: Schema.optional(Schema.String),
  knowledgeAssistBehavior: Schema.optional(GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfoKnowledgeAssistBehavior),
  ingestedContextReferenceDebugInfo: Schema.optional(GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfo),
  serviceLatency: Schema.optional(GoogleCloudDialogflowV2beta1ServiceLatency),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfo" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfo>;

export interface GoogleCloudDialogflowV2beta1KnowledgeAssistAnswer {
  suggestedQuery?: GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerSuggestedQuery;
  suggestedQueryAnswer?: GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswer;
  answerRecord?: string;
  knowledgeAssistDebugInfo?: GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfo;
}

export const GoogleCloudDialogflowV2beta1KnowledgeAssistAnswer: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswer> = Schema.suspend(() => Schema.Struct({
  suggestedQuery: Schema.optional(GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerSuggestedQuery),
  suggestedQueryAnswer: Schema.optional(GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswer),
  answerRecord: Schema.optional(Schema.String),
  knowledgeAssistDebugInfo: Schema.optional(GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfo),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1KnowledgeAssistAnswer" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswer>;

export interface GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistResponse {
  knowledgeAssistAnswer?: GoogleCloudDialogflowV2beta1KnowledgeAssistAnswer;
  latestMessage?: string;
  contextSize?: number;
}

export const GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistResponse: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistResponse> = Schema.suspend(() => Schema.Struct({
  knowledgeAssistAnswer: Schema.optional(GoogleCloudDialogflowV2beta1KnowledgeAssistAnswer),
  latestMessage: Schema.optional(Schema.String),
  contextSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistResponse>;

export interface GoogleCloudDialogflowV2beta1FaqAnswer {
  answer?: string;
  confidence?: number;
  question?: string;
  source?: string;
  metadata?: Record<string, string>;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2beta1FaqAnswer: Schema.Schema<GoogleCloudDialogflowV2beta1FaqAnswer> = Schema.suspend(() => Schema.Struct({
  answer: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  question: Schema.optional(Schema.String),
  source: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  answerRecord: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1FaqAnswer" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1FaqAnswer>;

export interface GoogleCloudDialogflowV2beta1SuggestFaqAnswersResponse {
  faqAnswers?: Array<GoogleCloudDialogflowV2beta1FaqAnswer>;
  latestMessage?: string;
  contextSize?: number;
}

export const GoogleCloudDialogflowV2beta1SuggestFaqAnswersResponse: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestFaqAnswersResponse> = Schema.suspend(() => Schema.Struct({
  faqAnswers: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1FaqAnswer)),
  latestMessage: Schema.optional(Schema.String),
  contextSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SuggestFaqAnswersResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestFaqAnswersResponse>;

export interface GoogleCloudDialogflowV2beta1SmartReplyAnswer {
  reply?: string;
  confidence?: number;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2beta1SmartReplyAnswer: Schema.Schema<GoogleCloudDialogflowV2beta1SmartReplyAnswer> = Schema.suspend(() => Schema.Struct({
  reply: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  answerRecord: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SmartReplyAnswer" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SmartReplyAnswer>;

export interface GoogleCloudDialogflowV2beta1SuggestSmartRepliesResponse {
  smartReplyAnswers?: Array<GoogleCloudDialogflowV2beta1SmartReplyAnswer>;
  latestMessage?: string;
  contextSize?: number;
}

export const GoogleCloudDialogflowV2beta1SuggestSmartRepliesResponse: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestSmartRepliesResponse> = Schema.suspend(() => Schema.Struct({
  smartReplyAnswers: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SmartReplyAnswer)),
  latestMessage: Schema.optional(Schema.String),
  contextSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SuggestSmartRepliesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestSmartRepliesResponse>;

export interface GoogleCloudDialogflowV2beta1KnowledgeAnswersAnswer {
  source?: string;
  faqQuestion?: string;
  answer?: string;
  matchConfidenceLevel?: "MATCH_CONFIDENCE_LEVEL_UNSPECIFIED" | "LOW" | "MEDIUM" | "HIGH" | (string & {});
  matchConfidence?: number;
}

export const GoogleCloudDialogflowV2beta1KnowledgeAnswersAnswer: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAnswersAnswer> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(Schema.String),
  faqQuestion: Schema.optional(Schema.String),
  answer: Schema.optional(Schema.String),
  matchConfidenceLevel: Schema.optional(Schema.String),
  matchConfidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1KnowledgeAnswersAnswer" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAnswersAnswer>;

export interface GoogleCloudDialogflowV2beta1KnowledgeAnswers {
  answers?: Array<GoogleCloudDialogflowV2beta1KnowledgeAnswersAnswer>;
}

export const GoogleCloudDialogflowV2beta1KnowledgeAnswers: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAnswers> = Schema.suspend(() => Schema.Struct({
  answers: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1KnowledgeAnswersAnswer)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1KnowledgeAnswers" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAnswers>;

export interface GoogleCloudDialogflowV2beta1QueryResult {
  queryText?: string;
  languageCode?: string;
  speechRecognitionConfidence?: number;
  action?: string;
  parameters?: Record<string, unknown>;
  allRequiredParamsPresent?: boolean;
  cancelsSlotFilling?: boolean;
  fulfillmentText?: string;
  fulfillmentMessages?: Array<GoogleCloudDialogflowV2beta1IntentMessage>;
  webhookSource?: string;
  webhookPayload?: Record<string, unknown>;
  outputContexts?: Array<GoogleCloudDialogflowV2beta1Context>;
  intent?: GoogleCloudDialogflowV2beta1Intent;
  intentDetectionConfidence?: number;
  diagnosticInfo?: Record<string, unknown>;
  sentimentAnalysisResult?: GoogleCloudDialogflowV2beta1SentimentAnalysisResult;
  knowledgeAnswers?: GoogleCloudDialogflowV2beta1KnowledgeAnswers;
}

export const GoogleCloudDialogflowV2beta1QueryResult: Schema.Schema<GoogleCloudDialogflowV2beta1QueryResult> = Schema.suspend(() => Schema.Struct({
  queryText: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  speechRecognitionConfidence: Schema.optional(Schema.Number),
  action: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  allRequiredParamsPresent: Schema.optional(Schema.Boolean),
  cancelsSlotFilling: Schema.optional(Schema.Boolean),
  fulfillmentText: Schema.optional(Schema.String),
  fulfillmentMessages: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessage)),
  webhookSource: Schema.optional(Schema.String),
  webhookPayload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  outputContexts: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1Context)),
  intent: Schema.optional(GoogleCloudDialogflowV2beta1Intent),
  intentDetectionConfidence: Schema.optional(Schema.Number),
  diagnosticInfo: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  sentimentAnalysisResult: Schema.optional(GoogleCloudDialogflowV2beta1SentimentAnalysisResult),
  knowledgeAnswers: Schema.optional(GoogleCloudDialogflowV2beta1KnowledgeAnswers),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1QueryResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1QueryResult>;

export interface GoogleCloudDialogflowV2beta1IntentSuggestion {
  displayName?: string;
  intentV2?: string;
  description?: string;
}

export const GoogleCloudDialogflowV2beta1IntentSuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1IntentSuggestion> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  intentV2: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentSuggestion>;

export interface GoogleCloudDialogflowV2beta1DialogflowAssistAnswer {
  queryResult?: GoogleCloudDialogflowV2beta1QueryResult;
  intentSuggestion?: GoogleCloudDialogflowV2beta1IntentSuggestion;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2beta1DialogflowAssistAnswer: Schema.Schema<GoogleCloudDialogflowV2beta1DialogflowAssistAnswer> = Schema.suspend(() => Schema.Struct({
  queryResult: Schema.optional(GoogleCloudDialogflowV2beta1QueryResult),
  intentSuggestion: Schema.optional(GoogleCloudDialogflowV2beta1IntentSuggestion),
  answerRecord: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1DialogflowAssistAnswer" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1DialogflowAssistAnswer>;

export interface GoogleCloudDialogflowV2beta1SuggestDialogflowAssistsResponse {
  dialogflowAssistAnswers?: Array<GoogleCloudDialogflowV2beta1DialogflowAssistAnswer>;
  latestMessage?: string;
  contextSize?: number;
}

export const GoogleCloudDialogflowV2beta1SuggestDialogflowAssistsResponse: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestDialogflowAssistsResponse> = Schema.suspend(() => Schema.Struct({
  dialogflowAssistAnswers: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1DialogflowAssistAnswer)),
  latestMessage: Schema.optional(Schema.String),
  contextSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SuggestDialogflowAssistsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestDialogflowAssistsResponse>;

export interface GoogleCloudDialogflowV2beta1FreeFormSuggestion {
  response?: string;
}

export const GoogleCloudDialogflowV2beta1FreeFormSuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1FreeFormSuggestion> = Schema.suspend(() => Schema.Struct({
  response: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1FreeFormSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1FreeFormSuggestion>;

export interface GoogleCloudDialogflowV2beta1SummarySuggestionSummarySection {
  section?: string;
  summary?: string;
}

export const GoogleCloudDialogflowV2beta1SummarySuggestionSummarySection: Schema.Schema<GoogleCloudDialogflowV2beta1SummarySuggestionSummarySection> = Schema.suspend(() => Schema.Struct({
  section: Schema.optional(Schema.String),
  summary: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SummarySuggestionSummarySection" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SummarySuggestionSummarySection>;

export interface GoogleCloudDialogflowV2beta1SummarySuggestion {
  summarySections?: Array<GoogleCloudDialogflowV2beta1SummarySuggestionSummarySection>;
}

export const GoogleCloudDialogflowV2beta1SummarySuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1SummarySuggestion> = Schema.suspend(() => Schema.Struct({
  summarySections: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SummarySuggestionSummarySection)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SummarySuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SummarySuggestion>;

export interface GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion {
  answerRecord?: string;
  suggestionIndex?: number;
  similarityScore?: number;
}

export const GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion> = Schema.suspend(() => Schema.Struct({
  answerRecord: Schema.optional(Schema.String),
  suggestionIndex: Schema.optional(Schema.Number),
  similarityScore: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion>;

export interface GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResult {
  duplicateSuggestions?: Array<GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion>;
}

export const GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResult: Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResult> = Schema.suspend(() => Schema.Struct({
  duplicateSuggestions: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResult>;

export interface GoogleCloudDialogflowV2beta1AgentCoachingInstruction {
  displayName?: string;
  displayDetails?: string;
  condition?: string;
  agentAction?: string;
  systemAction?: string;
  duplicateCheckResult?: GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResult;
  triggeringEvent?: "TRIGGER_EVENT_UNSPECIFIED" | "END_OF_UTTERANCE" | "MANUAL_CALL" | "CUSTOMER_MESSAGE" | "AGENT_MESSAGE" | "TOOL_CALL_COMPLETION" | (string & {});
}

export const GoogleCloudDialogflowV2beta1AgentCoachingInstruction: Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingInstruction> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  displayDetails: Schema.optional(Schema.String),
  condition: Schema.optional(Schema.String),
  agentAction: Schema.optional(Schema.String),
  systemAction: Schema.optional(Schema.String),
  duplicateCheckResult: Schema.optional(GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResult),
  triggeringEvent: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AgentCoachingInstruction" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingInstruction>;

export interface GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources {
  instructionIndexes?: Array<number>;
}

export const GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources: Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources> = Schema.suspend(() => Schema.Struct({
  instructionIndexes: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources>;

export interface GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion {
  answerRecord?: string;
  sources?: GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources;
  suggestionIndex?: number;
  similarityScore?: number;
}

export const GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion> = Schema.suspend(() => Schema.Struct({
  answerRecord: Schema.optional(Schema.String),
  sources: Schema.optional(GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources),
  suggestionIndex: Schema.optional(Schema.Number),
  similarityScore: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion>;

export interface GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResult {
  duplicateSuggestions?: Array<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion>;
}

export const GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResult: Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResult> = Schema.suspend(() => Schema.Struct({
  duplicateSuggestions: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResult>;

export interface GoogleCloudDialogflowV2beta1AgentCoachingSuggestionAgentActionSuggestion {
  agentAction?: string;
  sources?: GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources;
  duplicateCheckResult?: GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResult;
}

export const GoogleCloudDialogflowV2beta1AgentCoachingSuggestionAgentActionSuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionAgentActionSuggestion> = Schema.suspend(() => Schema.Struct({
  agentAction: Schema.optional(Schema.String),
  sources: Schema.optional(GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources),
  duplicateCheckResult: Schema.optional(GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResult),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AgentCoachingSuggestionAgentActionSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionAgentActionSuggestion>;

export interface GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSampleResponse {
  responseText?: string;
  sources?: GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources;
  duplicateCheckResult?: GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResult;
}

export const GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSampleResponse: Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSampleResponse> = Schema.suspend(() => Schema.Struct({
  responseText: Schema.optional(Schema.String),
  sources: Schema.optional(GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources),
  duplicateCheckResult: Schema.optional(GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResult),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSampleResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSampleResponse>;

export interface GoogleCloudDialogflowV2beta1AgentCoachingSuggestion {
  applicableInstructions?: Array<GoogleCloudDialogflowV2beta1AgentCoachingInstruction>;
  agentActionSuggestions?: Array<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionAgentActionSuggestion>;
  sampleResponses?: Array<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSampleResponse>;
}

export const GoogleCloudDialogflowV2beta1AgentCoachingSuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestion> = Schema.suspend(() => Schema.Struct({
  applicableInstructions: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1AgentCoachingInstruction)),
  agentActionSuggestions: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1AgentCoachingSuggestionAgentActionSuggestion)),
  sampleResponses: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSampleResponse)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AgentCoachingSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestion>;

export interface GoogleCloudDialogflowV2beta1ToolCall {
  tool?: string;
  toolDisplayName?: string;
  toolDisplayDetails?: string;
  action?: string;
  inputParameters?: Record<string, unknown>;
  createTime?: string;
  answerRecord?: string;
  state?: "STATE_UNSPECIFIED" | "TRIGGERED" | "NEEDS_CONFIRMATION" | (string & {});
}

export const GoogleCloudDialogflowV2beta1ToolCall: Schema.Schema<GoogleCloudDialogflowV2beta1ToolCall> = Schema.suspend(() => Schema.Struct({
  tool: Schema.optional(Schema.String),
  toolDisplayName: Schema.optional(Schema.String),
  toolDisplayDetails: Schema.optional(Schema.String),
  action: Schema.optional(Schema.String),
  inputParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  createTime: Schema.optional(Schema.String),
  answerRecord: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ToolCall" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ToolCall>;

export interface GoogleCloudDialogflowV2beta1ToolCallResultError {
  message?: string;
}

export const GoogleCloudDialogflowV2beta1ToolCallResultError: Schema.Schema<GoogleCloudDialogflowV2beta1ToolCallResultError> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ToolCallResultError" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ToolCallResultError>;

export interface GoogleCloudDialogflowV2beta1ToolCallResult {
  tool?: string;
  action?: string;
  error?: GoogleCloudDialogflowV2beta1ToolCallResultError;
  rawContent?: string;
  content?: string;
  createTime?: string;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2beta1ToolCallResult: Schema.Schema<GoogleCloudDialogflowV2beta1ToolCallResult> = Schema.suspend(() => Schema.Struct({
  tool: Schema.optional(Schema.String),
  action: Schema.optional(Schema.String),
  error: Schema.optional(GoogleCloudDialogflowV2beta1ToolCallResultError),
  rawContent: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  answerRecord: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ToolCallResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ToolCallResult>;

export interface GoogleCloudDialogflowV2beta1GeneratorSuggestionToolCallInfo {
  toolCall?: GoogleCloudDialogflowV2beta1ToolCall;
  toolCallResult?: GoogleCloudDialogflowV2beta1ToolCallResult;
}

export const GoogleCloudDialogflowV2beta1GeneratorSuggestionToolCallInfo: Schema.Schema<GoogleCloudDialogflowV2beta1GeneratorSuggestionToolCallInfo> = Schema.suspend(() => Schema.Struct({
  toolCall: Schema.optional(GoogleCloudDialogflowV2beta1ToolCall),
  toolCallResult: Schema.optional(GoogleCloudDialogflowV2beta1ToolCallResult),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1GeneratorSuggestionToolCallInfo" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1GeneratorSuggestionToolCallInfo>;

export interface GoogleCloudDialogflowV2beta1GeneratorSuggestion {
  freeFormSuggestion?: GoogleCloudDialogflowV2beta1FreeFormSuggestion;
  summarySuggestion?: GoogleCloudDialogflowV2beta1SummarySuggestion;
  agentCoachingSuggestion?: GoogleCloudDialogflowV2beta1AgentCoachingSuggestion;
  toolCallInfo?: Array<GoogleCloudDialogflowV2beta1GeneratorSuggestionToolCallInfo>;
}

export const GoogleCloudDialogflowV2beta1GeneratorSuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1GeneratorSuggestion> = Schema.suspend(() => Schema.Struct({
  freeFormSuggestion: Schema.optional(GoogleCloudDialogflowV2beta1FreeFormSuggestion),
  summarySuggestion: Schema.optional(GoogleCloudDialogflowV2beta1SummarySuggestion),
  agentCoachingSuggestion: Schema.optional(GoogleCloudDialogflowV2beta1AgentCoachingSuggestion),
  toolCallInfo: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1GeneratorSuggestionToolCallInfo)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1GeneratorSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1GeneratorSuggestion>;

export interface GoogleCloudDialogflowV2beta1GenerateSuggestionsResponseGeneratorSuggestionAnswer {
  generatorSuggestion?: GoogleCloudDialogflowV2beta1GeneratorSuggestion;
  sourceGenerator?: string;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2beta1GenerateSuggestionsResponseGeneratorSuggestionAnswer: Schema.Schema<GoogleCloudDialogflowV2beta1GenerateSuggestionsResponseGeneratorSuggestionAnswer> = Schema.suspend(() => Schema.Struct({
  generatorSuggestion: Schema.optional(GoogleCloudDialogflowV2beta1GeneratorSuggestion),
  sourceGenerator: Schema.optional(Schema.String),
  answerRecord: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1GenerateSuggestionsResponseGeneratorSuggestionAnswer" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1GenerateSuggestionsResponseGeneratorSuggestionAnswer>;

export interface GoogleCloudDialogflowV2beta1GenerateSuggestionsResponse {
  generatorSuggestionAnswers?: Array<GoogleCloudDialogflowV2beta1GenerateSuggestionsResponseGeneratorSuggestionAnswer>;
  latestMessage?: string;
}

export const GoogleCloudDialogflowV2beta1GenerateSuggestionsResponse: Schema.Schema<GoogleCloudDialogflowV2beta1GenerateSuggestionsResponse> = Schema.suspend(() => Schema.Struct({
  generatorSuggestionAnswers: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1GenerateSuggestionsResponseGeneratorSuggestionAnswer)),
  latestMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1GenerateSuggestionsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1GenerateSuggestionsResponse>;

export interface GoogleCloudDialogflowV2beta1SuggestionResult {
  error?: GoogleRpcStatus;
  suggestArticlesResponse?: GoogleCloudDialogflowV2beta1SuggestArticlesResponse;
  suggestKnowledgeAssistResponse?: GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistResponse;
  suggestFaqAnswersResponse?: GoogleCloudDialogflowV2beta1SuggestFaqAnswersResponse;
  suggestSmartRepliesResponse?: GoogleCloudDialogflowV2beta1SuggestSmartRepliesResponse;
  suggestDialogflowAssistsResponse?: GoogleCloudDialogflowV2beta1SuggestDialogflowAssistsResponse;
  suggestEntityExtractionResponse?: GoogleCloudDialogflowV2beta1SuggestDialogflowAssistsResponse;
  generateSuggestionsResponse?: GoogleCloudDialogflowV2beta1GenerateSuggestionsResponse;
}

export const GoogleCloudDialogflowV2beta1SuggestionResult: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestionResult> = Schema.suspend(() => Schema.Struct({
  error: Schema.optional(GoogleRpcStatus),
  suggestArticlesResponse: Schema.optional(GoogleCloudDialogflowV2beta1SuggestArticlesResponse),
  suggestKnowledgeAssistResponse: Schema.optional(GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistResponse),
  suggestFaqAnswersResponse: Schema.optional(GoogleCloudDialogflowV2beta1SuggestFaqAnswersResponse),
  suggestSmartRepliesResponse: Schema.optional(GoogleCloudDialogflowV2beta1SuggestSmartRepliesResponse),
  suggestDialogflowAssistsResponse: Schema.optional(GoogleCloudDialogflowV2beta1SuggestDialogflowAssistsResponse),
  suggestEntityExtractionResponse: Schema.optional(GoogleCloudDialogflowV2beta1SuggestDialogflowAssistsResponse),
  generateSuggestionsResponse: Schema.optional(GoogleCloudDialogflowV2beta1GenerateSuggestionsResponse),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SuggestionResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestionResult>;

export interface GoogleCloudDialogflowV2beta1HumanAgentAssistantEvent {
  conversation?: string;
  participant?: string;
  suggestionResults?: Array<GoogleCloudDialogflowV2beta1SuggestionResult>;
}

export const GoogleCloudDialogflowV2beta1HumanAgentAssistantEvent: Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantEvent> = Schema.suspend(() => Schema.Struct({
  conversation: Schema.optional(Schema.String),
  participant: Schema.optional(Schema.String),
  suggestionResults: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SuggestionResult)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1HumanAgentAssistantEvent" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantEvent>;

export interface GoogleCloudDialogflowV2beta1ImportDocumentsResponse {
  warnings?: Array<GoogleRpcStatus>;
}

export const GoogleCloudDialogflowV2beta1ImportDocumentsResponse: Schema.Schema<GoogleCloudDialogflowV2beta1ImportDocumentsResponse> = Schema.suspend(() => Schema.Struct({
  warnings: Schema.optional(Schema.Array(GoogleRpcStatus)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ImportDocumentsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ImportDocumentsResponse>;

export interface GoogleCloudDialogflowV2beta1EncryptionSpec {
  name?: string;
  kmsKey?: string;
}

export const GoogleCloudDialogflowV2beta1EncryptionSpec: Schema.Schema<GoogleCloudDialogflowV2beta1EncryptionSpec> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  kmsKey: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1EncryptionSpec" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1EncryptionSpec>;

export interface GoogleCloudDialogflowV2beta1InitializeEncryptionSpecRequest {
  encryptionSpec?: GoogleCloudDialogflowV2beta1EncryptionSpec;
}

export const GoogleCloudDialogflowV2beta1InitializeEncryptionSpecRequest: Schema.Schema<GoogleCloudDialogflowV2beta1InitializeEncryptionSpecRequest> = Schema.suspend(() => Schema.Struct({
  encryptionSpec: Schema.optional(GoogleCloudDialogflowV2beta1EncryptionSpec),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1InitializeEncryptionSpecRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1InitializeEncryptionSpecRequest>;

export interface GoogleCloudDialogflowV2beta1InitializeEncryptionSpecMetadata {
  request?: GoogleCloudDialogflowV2beta1InitializeEncryptionSpecRequest;
}

export const GoogleCloudDialogflowV2beta1InitializeEncryptionSpecMetadata: Schema.Schema<GoogleCloudDialogflowV2beta1InitializeEncryptionSpecMetadata> = Schema.suspend(() => Schema.Struct({
  request: Schema.optional(GoogleCloudDialogflowV2beta1InitializeEncryptionSpecRequest),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1InitializeEncryptionSpecMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1InitializeEncryptionSpecMetadata>;

export interface GoogleCloudDialogflowV2beta1GcsDestination {
  uri?: string;
}

export const GoogleCloudDialogflowV2beta1GcsDestination: Schema.Schema<GoogleCloudDialogflowV2beta1GcsDestination> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1GcsDestination" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1GcsDestination>;

export interface GoogleCloudDialogflowV2beta1ExportOperationMetadata {
  exportedGcsDestination?: GoogleCloudDialogflowV2beta1GcsDestination;
}

export const GoogleCloudDialogflowV2beta1ExportOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2beta1ExportOperationMetadata> = Schema.suspend(() => Schema.Struct({
  exportedGcsDestination: Schema.optional(GoogleCloudDialogflowV2beta1GcsDestination),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ExportOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ExportOperationMetadata>;

export interface GoogleCloudDialogflowV2beta1KnowledgeOperationMetadata {
  state?: "STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "DONE" | (string & {});
  knowledgeBase?: string;
  exportOperationMetadata?: GoogleCloudDialogflowV2beta1ExportOperationMetadata;
  doneTime?: string;
}

export const GoogleCloudDialogflowV2beta1KnowledgeOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeOperationMetadata> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  knowledgeBase: Schema.optional(Schema.String),
  exportOperationMetadata: Schema.optional(GoogleCloudDialogflowV2beta1ExportOperationMetadata),
  doneTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1KnowledgeOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeOperationMetadata>;

export interface GoogleCloudDialogflowV2beta1OriginalDetectIntentRequest {
  source?: string;
  version?: string;
  payload?: Record<string, unknown>;
}

export const GoogleCloudDialogflowV2beta1OriginalDetectIntentRequest: Schema.Schema<GoogleCloudDialogflowV2beta1OriginalDetectIntentRequest> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1OriginalDetectIntentRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1OriginalDetectIntentRequest>;

export interface GoogleCloudDialogflowV2beta1SetSuggestionFeatureConfigOperationMetadata {
  conversationProfile?: string;
  participantRole?: "ROLE_UNSPECIFIED" | "HUMAN_AGENT" | "AUTOMATED_AGENT" | "END_USER" | (string & {});
  suggestionFeatureType?: "TYPE_UNSPECIFIED" | "ARTICLE_SUGGESTION" | "FAQ" | "SMART_REPLY" | "DIALOGFLOW_ASSIST" | "CONVERSATION_SUMMARIZATION" | "KNOWLEDGE_SEARCH" | "KNOWLEDGE_ASSIST" | (string & {});
  createTime?: string;
}

export const GoogleCloudDialogflowV2beta1SetSuggestionFeatureConfigOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2beta1SetSuggestionFeatureConfigOperationMetadata> = Schema.suspend(() => Schema.Struct({
  conversationProfile: Schema.optional(Schema.String),
  participantRole: Schema.optional(Schema.String),
  suggestionFeatureType: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SetSuggestionFeatureConfigOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SetSuggestionFeatureConfigOperationMetadata>;

export interface GoogleCloudDialogflowV2beta1WebhookRequest {
  session?: string;
  responseId?: string;
  queryResult?: GoogleCloudDialogflowV2beta1QueryResult;
  alternativeQueryResults?: Array<GoogleCloudDialogflowV2beta1QueryResult>;
  originalDetectIntentRequest?: GoogleCloudDialogflowV2beta1OriginalDetectIntentRequest;
}

export const GoogleCloudDialogflowV2beta1WebhookRequest: Schema.Schema<GoogleCloudDialogflowV2beta1WebhookRequest> = Schema.suspend(() => Schema.Struct({
  session: Schema.optional(Schema.String),
  responseId: Schema.optional(Schema.String),
  queryResult: Schema.optional(GoogleCloudDialogflowV2beta1QueryResult),
  alternativeQueryResults: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1QueryResult)),
  originalDetectIntentRequest: Schema.optional(GoogleCloudDialogflowV2beta1OriginalDetectIntentRequest),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1WebhookRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1WebhookRequest>;

export interface GoogleCloudDialogflowV2beta1EventInput {
  name?: string;
  parameters?: Record<string, unknown>;
  languageCode?: string;
}

export const GoogleCloudDialogflowV2beta1EventInput: Schema.Schema<GoogleCloudDialogflowV2beta1EventInput> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1EventInput" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1EventInput>;

export interface GoogleCloudDialogflowV2beta1SessionEntityType {
  name?: string;
  entityOverrideMode?: "ENTITY_OVERRIDE_MODE_UNSPECIFIED" | "ENTITY_OVERRIDE_MODE_OVERRIDE" | "ENTITY_OVERRIDE_MODE_SUPPLEMENT" | (string & {});
  entities?: Array<GoogleCloudDialogflowV2beta1EntityTypeEntity>;
}

export const GoogleCloudDialogflowV2beta1SessionEntityType: Schema.Schema<GoogleCloudDialogflowV2beta1SessionEntityType> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  entityOverrideMode: Schema.optional(Schema.String),
  entities: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1EntityTypeEntity)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SessionEntityType" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SessionEntityType>;

export interface GoogleCloudDialogflowV2beta1WebhookResponse {
  fulfillmentText?: string;
  fulfillmentMessages?: Array<GoogleCloudDialogflowV2beta1IntentMessage>;
  source?: string;
  payload?: Record<string, unknown>;
  outputContexts?: Array<GoogleCloudDialogflowV2beta1Context>;
  followupEventInput?: GoogleCloudDialogflowV2beta1EventInput;
  liveAgentHandoff?: boolean;
  endInteraction?: boolean;
  sessionEntityTypes?: Array<GoogleCloudDialogflowV2beta1SessionEntityType>;
}

export const GoogleCloudDialogflowV2beta1WebhookResponse: Schema.Schema<GoogleCloudDialogflowV2beta1WebhookResponse> = Schema.suspend(() => Schema.Struct({
  fulfillmentText: Schema.optional(Schema.String),
  fulfillmentMessages: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessage)),
  source: Schema.optional(Schema.String),
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  outputContexts: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1Context)),
  followupEventInput: Schema.optional(GoogleCloudDialogflowV2beta1EventInput),
  liveAgentHandoff: Schema.optional(Schema.Boolean),
  endInteraction: Schema.optional(Schema.Boolean),
  sessionEntityTypes: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SessionEntityType)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1WebhookResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1WebhookResponse>;

export interface GoogleCloudDialogflowV3alpha1TurnSignals {
  noMatch?: boolean;
  noUserInput?: boolean;
  dtmfUsed?: boolean;
  userEscalated?: boolean;
  agentEscalated?: boolean;
  triggeredAbandonmentEvent?: boolean;
  reachedEndPage?: boolean;
  webhookStatuses?: Array<string>;
  failureReasons?: Array<"FAILURE_REASON_UNSPECIFIED" | "FAILED_INTENT" | "FAILED_WEBHOOK" | (string & {})>;
  sentimentScore?: number;
  sentimentMagnitude?: number;
}

export const GoogleCloudDialogflowV3alpha1TurnSignals: Schema.Schema<GoogleCloudDialogflowV3alpha1TurnSignals> = Schema.suspend(() => Schema.Struct({
  noMatch: Schema.optional(Schema.Boolean),
  noUserInput: Schema.optional(Schema.Boolean),
  dtmfUsed: Schema.optional(Schema.Boolean),
  userEscalated: Schema.optional(Schema.Boolean),
  agentEscalated: Schema.optional(Schema.Boolean),
  triggeredAbandonmentEvent: Schema.optional(Schema.Boolean),
  reachedEndPage: Schema.optional(Schema.Boolean),
  webhookStatuses: Schema.optional(Schema.Array(Schema.String)),
  failureReasons: Schema.optional(Schema.Array(Schema.String)),
  sentimentScore: Schema.optional(Schema.Number),
  sentimentMagnitude: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV3alpha1TurnSignals" }) as any as Schema.Schema<GoogleCloudDialogflowV3alpha1TurnSignals>;

export interface GoogleCloudDialogflowV3alpha1ConversationSignals {
  turnSignals?: GoogleCloudDialogflowV3alpha1TurnSignals;
}

export const GoogleCloudDialogflowV3alpha1ConversationSignals: Schema.Schema<GoogleCloudDialogflowV3alpha1ConversationSignals> = Schema.suspend(() => Schema.Struct({
  turnSignals: Schema.optional(GoogleCloudDialogflowV3alpha1TurnSignals),
})).annotate({ identifier: "GoogleCloudDialogflowV3alpha1ConversationSignals" }) as any as Schema.Schema<GoogleCloudDialogflowV3alpha1ConversationSignals>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListProjectsOperationsRequest {
  name: string;
  filter?: string;
  pageSize?: number;
  pageToken?: string;
  returnPartialSuccess?: boolean;
}

export const ListProjectsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsOperationsRequest>;

export type ListProjectsOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListProjectsOperationsResponse = GoogleLongrunningListOperationsResponse;

export type ListProjectsOperationsError = CommonErrors;

export const listProjectsOperations: API.PaginatedOperationMethod<ListProjectsOperationsRequest, ListProjectsOperationsResponse, ListProjectsOperationsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsOperationsRequest,
  output: ListProjectsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsOperationsRequest {
  name: string;
}

export const GetProjectsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsOperationsRequest>;

export type GetProjectsOperationsResponse = GoogleLongrunningOperation;
export const GetProjectsOperationsResponse = GoogleLongrunningOperation;

export type GetProjectsOperationsError = CommonErrors;

export const getProjectsOperations: API.OperationMethod<GetProjectsOperationsRequest, GetProjectsOperationsResponse, GetProjectsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsOperationsRequest,
  output: GetProjectsOperationsResponse,
  errors: [],
}));

export interface CancelProjectsOperationsRequest {
  name: string;
}

export const CancelProjectsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsOperationsRequest>;

export type CancelProjectsOperationsResponse = GoogleProtobufEmpty;
export const CancelProjectsOperationsResponse = GoogleProtobufEmpty;

export type CancelProjectsOperationsError = CommonErrors;

export const cancelProjectsOperations: API.OperationMethod<CancelProjectsOperationsRequest, CancelProjectsOperationsResponse, CancelProjectsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsOperationsRequest,
  output: CancelProjectsOperationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsRequest {
  name: string;
  filter?: string;
  pageSize?: number;
  pageToken?: string;
  extraLocationTypes?: string[];
}

export const ListProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = GoogleCloudLocationListLocationsResponse;
export const ListProjectsLocationsResponse = GoogleCloudLocationListLocationsResponse;

export type ListProjectsLocationsError = CommonErrors;

export const listProjectsLocations: API.PaginatedOperationMethod<ListProjectsLocationsRequest, ListProjectsLocationsResponse, ListProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsRequest {
  name: string;
}

export const GetProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = GoogleCloudLocationLocation;
export const GetProjectsLocationsResponse = GoogleCloudLocationLocation;

export type GetProjectsLocationsError = CommonErrors;

export const getProjectsLocations: API.OperationMethod<GetProjectsLocationsRequest, GetProjectsLocationsResponse, GetProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsOperationsRequest {
  name: string;
  filter?: string;
  pageSize?: number;
  pageToken?: string;
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = GoogleLongrunningListOperationsResponse;

export type ListProjectsLocationsOperationsError = CommonErrors;

export const listProjectsLocationsOperations: API.PaginatedOperationMethod<ListProjectsLocationsOperationsRequest, ListProjectsLocationsOperationsResponse, ListProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsOperationsRequest {
  name: string;
}

export const GetProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = GoogleLongrunningOperation;
export const GetProjectsLocationsOperationsResponse = GoogleLongrunningOperation;

export type GetProjectsLocationsOperationsError = CommonErrors;

export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface CancelProjectsLocationsOperationsRequest {
  name: string;
}

export const CancelProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = GoogleProtobufEmpty;
export const CancelProjectsLocationsOperationsResponse = GoogleProtobufEmpty;

export type CancelProjectsLocationsOperationsError = CommonErrors;

export const cancelProjectsLocationsOperations: API.OperationMethod<CancelProjectsLocationsOperationsRequest, CancelProjectsLocationsOperationsResponse, CancelProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsSecuritySettingsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1SecuritySettings;
}

export const CreateProjectsLocationsSecuritySettingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1SecuritySettings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/securitySettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsSecuritySettingsRequest>;

export type CreateProjectsLocationsSecuritySettingsResponse = GoogleCloudDialogflowCxV3beta1SecuritySettings;
export const CreateProjectsLocationsSecuritySettingsResponse = GoogleCloudDialogflowCxV3beta1SecuritySettings;

export type CreateProjectsLocationsSecuritySettingsError = CommonErrors;

export const createProjectsLocationsSecuritySettings: API.OperationMethod<CreateProjectsLocationsSecuritySettingsRequest, CreateProjectsLocationsSecuritySettingsResponse, CreateProjectsLocationsSecuritySettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsSecuritySettingsRequest,
  output: CreateProjectsLocationsSecuritySettingsResponse,
  errors: [],
}));

export interface GetProjectsLocationsSecuritySettingsRequest {
  name: string;
}

export const GetProjectsLocationsSecuritySettingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/securitySettings/{securitySettingsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsSecuritySettingsRequest>;

export type GetProjectsLocationsSecuritySettingsResponse = GoogleCloudDialogflowCxV3beta1SecuritySettings;
export const GetProjectsLocationsSecuritySettingsResponse = GoogleCloudDialogflowCxV3beta1SecuritySettings;

export type GetProjectsLocationsSecuritySettingsError = CommonErrors;

export const getProjectsLocationsSecuritySettings: API.OperationMethod<GetProjectsLocationsSecuritySettingsRequest, GetProjectsLocationsSecuritySettingsResponse, GetProjectsLocationsSecuritySettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsSecuritySettingsRequest,
  output: GetProjectsLocationsSecuritySettingsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsSecuritySettingsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1SecuritySettings;
}

export const PatchProjectsLocationsSecuritySettingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1SecuritySettings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/securitySettings/{securitySettingsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsSecuritySettingsRequest>;

export type PatchProjectsLocationsSecuritySettingsResponse = GoogleCloudDialogflowCxV3beta1SecuritySettings;
export const PatchProjectsLocationsSecuritySettingsResponse = GoogleCloudDialogflowCxV3beta1SecuritySettings;

export type PatchProjectsLocationsSecuritySettingsError = CommonErrors;

export const patchProjectsLocationsSecuritySettings: API.OperationMethod<PatchProjectsLocationsSecuritySettingsRequest, PatchProjectsLocationsSecuritySettingsResponse, PatchProjectsLocationsSecuritySettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsSecuritySettingsRequest,
  output: PatchProjectsLocationsSecuritySettingsResponse,
  errors: [],
}));

export interface ListProjectsLocationsSecuritySettingsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsSecuritySettingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/securitySettings" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSecuritySettingsRequest>;

export type ListProjectsLocationsSecuritySettingsResponse = GoogleCloudDialogflowCxV3beta1ListSecuritySettingsResponse;
export const ListProjectsLocationsSecuritySettingsResponse = GoogleCloudDialogflowCxV3beta1ListSecuritySettingsResponse;

export type ListProjectsLocationsSecuritySettingsError = CommonErrors;

export const listProjectsLocationsSecuritySettings: API.PaginatedOperationMethod<ListProjectsLocationsSecuritySettingsRequest, ListProjectsLocationsSecuritySettingsResponse, ListProjectsLocationsSecuritySettingsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsSecuritySettingsRequest,
  output: ListProjectsLocationsSecuritySettingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsSecuritySettingsRequest {
  name: string;
}

export const DeleteProjectsLocationsSecuritySettingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/securitySettings/{securitySettingsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsSecuritySettingsRequest>;

export type DeleteProjectsLocationsSecuritySettingsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsSecuritySettingsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsSecuritySettingsError = CommonErrors;

export const deleteProjectsLocationsSecuritySettings: API.OperationMethod<DeleteProjectsLocationsSecuritySettingsRequest, DeleteProjectsLocationsSecuritySettingsResponse, DeleteProjectsLocationsSecuritySettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsSecuritySettingsRequest,
  output: DeleteProjectsLocationsSecuritySettingsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsRequest>;

export type ListProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3beta1ListAgentsResponse;
export const ListProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3beta1ListAgentsResponse;

export type ListProjectsLocationsAgentsError = CommonErrors;

export const listProjectsLocationsAgents: API.PaginatedOperationMethod<ListProjectsLocationsAgentsRequest, ListProjectsLocationsAgentsResponse, ListProjectsLocationsAgentsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsRequest,
  output: ListProjectsLocationsAgentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentsRequest {
  name: string;
}

export const GetProjectsLocationsAgentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsRequest>;

export type GetProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3beta1Agent;
export const GetProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3beta1Agent;

export type GetProjectsLocationsAgentsError = CommonErrors;

export const getProjectsLocationsAgents: API.OperationMethod<GetProjectsLocationsAgentsRequest, GetProjectsLocationsAgentsResponse, GetProjectsLocationsAgentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsRequest,
  output: GetProjectsLocationsAgentsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1Agent;
}

export const CreateProjectsLocationsAgentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1Agent).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsRequest>;

export type CreateProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3beta1Agent;
export const CreateProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3beta1Agent;

export type CreateProjectsLocationsAgentsError = CommonErrors;

export const createProjectsLocationsAgents: API.OperationMethod<CreateProjectsLocationsAgentsRequest, CreateProjectsLocationsAgentsResponse, CreateProjectsLocationsAgentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsRequest,
  output: CreateProjectsLocationsAgentsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1Agent;
}

export const PatchProjectsLocationsAgentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1Agent).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsRequest>;

export type PatchProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3beta1Agent;
export const PatchProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3beta1Agent;

export type PatchProjectsLocationsAgentsError = CommonErrors;

export const patchProjectsLocationsAgents: API.OperationMethod<PatchProjectsLocationsAgentsRequest, PatchProjectsLocationsAgentsResponse, PatchProjectsLocationsAgentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsRequest,
  output: PatchProjectsLocationsAgentsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsRequest>;

export type DeleteProjectsLocationsAgentsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsError = CommonErrors;

export const deleteProjectsLocationsAgents: API.OperationMethod<DeleteProjectsLocationsAgentsRequest, DeleteProjectsLocationsAgentsResponse, DeleteProjectsLocationsAgentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAgentsRequest,
  output: DeleteProjectsLocationsAgentsResponse,
  errors: [],
}));

export interface ExportProjectsLocationsAgentsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1ExportAgentRequest;
}

export const ExportProjectsLocationsAgentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1ExportAgentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}:export", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExportProjectsLocationsAgentsRequest>;

export type ExportProjectsLocationsAgentsResponse = GoogleLongrunningOperation;
export const ExportProjectsLocationsAgentsResponse = GoogleLongrunningOperation;

export type ExportProjectsLocationsAgentsError = CommonErrors;

export const exportProjectsLocationsAgents: API.OperationMethod<ExportProjectsLocationsAgentsRequest, ExportProjectsLocationsAgentsResponse, ExportProjectsLocationsAgentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExportProjectsLocationsAgentsRequest,
  output: ExportProjectsLocationsAgentsResponse,
  errors: [],
}));

export interface RestoreProjectsLocationsAgentsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1RestoreAgentRequest;
}

export const RestoreProjectsLocationsAgentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1RestoreAgentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}:restore", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RestoreProjectsLocationsAgentsRequest>;

export type RestoreProjectsLocationsAgentsResponse = GoogleLongrunningOperation;
export const RestoreProjectsLocationsAgentsResponse = GoogleLongrunningOperation;

export type RestoreProjectsLocationsAgentsError = CommonErrors;

export const restoreProjectsLocationsAgents: API.OperationMethod<RestoreProjectsLocationsAgentsRequest, RestoreProjectsLocationsAgentsResponse, RestoreProjectsLocationsAgentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RestoreProjectsLocationsAgentsRequest,
  output: RestoreProjectsLocationsAgentsResponse,
  errors: [],
}));

export interface ValidateProjectsLocationsAgentsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1ValidateAgentRequest;
}

export const ValidateProjectsLocationsAgentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1ValidateAgentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}:validate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ValidateProjectsLocationsAgentsRequest>;

export type ValidateProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3beta1AgentValidationResult;
export const ValidateProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3beta1AgentValidationResult;

export type ValidateProjectsLocationsAgentsError = CommonErrors;

export const validateProjectsLocationsAgents: API.OperationMethod<ValidateProjectsLocationsAgentsRequest, ValidateProjectsLocationsAgentsResponse, ValidateProjectsLocationsAgentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ValidateProjectsLocationsAgentsRequest,
  output: ValidateProjectsLocationsAgentsResponse,
  errors: [],
}));

export interface GetValidationResultProjectsLocationsAgentsRequest {
  name: string;
  languageCode?: string;
}

export const GetValidationResultProjectsLocationsAgentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/validationResult" }),
  svc,
) as unknown as Schema.Schema<GetValidationResultProjectsLocationsAgentsRequest>;

export type GetValidationResultProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3beta1AgentValidationResult;
export const GetValidationResultProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3beta1AgentValidationResult;

export type GetValidationResultProjectsLocationsAgentsError = CommonErrors;

export const getValidationResultProjectsLocationsAgents: API.OperationMethod<GetValidationResultProjectsLocationsAgentsRequest, GetValidationResultProjectsLocationsAgentsResponse, GetValidationResultProjectsLocationsAgentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetValidationResultProjectsLocationsAgentsRequest,
  output: GetValidationResultProjectsLocationsAgentsResponse,
  errors: [],
}));

export interface GetGenerativeSettingsProjectsLocationsAgentsRequest {
  name: string;
  languageCode?: string;
}

export const GetGenerativeSettingsProjectsLocationsAgentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/generativeSettings" }),
  svc,
) as unknown as Schema.Schema<GetGenerativeSettingsProjectsLocationsAgentsRequest>;

export type GetGenerativeSettingsProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3beta1GenerativeSettings;
export const GetGenerativeSettingsProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3beta1GenerativeSettings;

export type GetGenerativeSettingsProjectsLocationsAgentsError = CommonErrors;

export const getGenerativeSettingsProjectsLocationsAgents: API.OperationMethod<GetGenerativeSettingsProjectsLocationsAgentsRequest, GetGenerativeSettingsProjectsLocationsAgentsResponse, GetGenerativeSettingsProjectsLocationsAgentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetGenerativeSettingsProjectsLocationsAgentsRequest,
  output: GetGenerativeSettingsProjectsLocationsAgentsResponse,
  errors: [],
}));

export interface UpdateGenerativeSettingsProjectsLocationsAgentsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1GenerativeSettings;
}

export const UpdateGenerativeSettingsProjectsLocationsAgentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1GenerativeSettings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/generativeSettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateGenerativeSettingsProjectsLocationsAgentsRequest>;

export type UpdateGenerativeSettingsProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3beta1GenerativeSettings;
export const UpdateGenerativeSettingsProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3beta1GenerativeSettings;

export type UpdateGenerativeSettingsProjectsLocationsAgentsError = CommonErrors;

export const updateGenerativeSettingsProjectsLocationsAgents: API.OperationMethod<UpdateGenerativeSettingsProjectsLocationsAgentsRequest, UpdateGenerativeSettingsProjectsLocationsAgentsResponse, UpdateGenerativeSettingsProjectsLocationsAgentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateGenerativeSettingsProjectsLocationsAgentsRequest,
  output: UpdateGenerativeSettingsProjectsLocationsAgentsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsFlowsRequest {
  parent: string;
  languageCode?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1Flow;
}

export const CreateProjectsLocationsAgentsFlowsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1Flow).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsFlowsRequest>;

export type CreateProjectsLocationsAgentsFlowsResponse = GoogleCloudDialogflowCxV3beta1Flow;
export const CreateProjectsLocationsAgentsFlowsResponse = GoogleCloudDialogflowCxV3beta1Flow;

export type CreateProjectsLocationsAgentsFlowsError = CommonErrors;

export const createProjectsLocationsAgentsFlows: API.OperationMethod<CreateProjectsLocationsAgentsFlowsRequest, CreateProjectsLocationsAgentsFlowsResponse, CreateProjectsLocationsAgentsFlowsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsFlowsRequest,
  output: CreateProjectsLocationsAgentsFlowsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsFlowsRequest {
  name: string;
  force?: boolean;
}

export const DeleteProjectsLocationsAgentsFlowsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsFlowsRequest>;

export type DeleteProjectsLocationsAgentsFlowsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsFlowsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsFlowsError = CommonErrors;

export const deleteProjectsLocationsAgentsFlows: API.OperationMethod<DeleteProjectsLocationsAgentsFlowsRequest, DeleteProjectsLocationsAgentsFlowsResponse, DeleteProjectsLocationsAgentsFlowsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAgentsFlowsRequest,
  output: DeleteProjectsLocationsAgentsFlowsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsFlowsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
  languageCode?: string;
}

export const ListProjectsLocationsAgentsFlowsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsFlowsRequest>;

export type ListProjectsLocationsAgentsFlowsResponse = GoogleCloudDialogflowCxV3beta1ListFlowsResponse;
export const ListProjectsLocationsAgentsFlowsResponse = GoogleCloudDialogflowCxV3beta1ListFlowsResponse;

export type ListProjectsLocationsAgentsFlowsError = CommonErrors;

export const listProjectsLocationsAgentsFlows: API.PaginatedOperationMethod<ListProjectsLocationsAgentsFlowsRequest, ListProjectsLocationsAgentsFlowsResponse, ListProjectsLocationsAgentsFlowsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsFlowsRequest,
  output: ListProjectsLocationsAgentsFlowsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentsFlowsRequest {
  name: string;
  languageCode?: string;
}

export const GetProjectsLocationsAgentsFlowsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsFlowsRequest>;

export type GetProjectsLocationsAgentsFlowsResponse = GoogleCloudDialogflowCxV3beta1Flow;
export const GetProjectsLocationsAgentsFlowsResponse = GoogleCloudDialogflowCxV3beta1Flow;

export type GetProjectsLocationsAgentsFlowsError = CommonErrors;

export const getProjectsLocationsAgentsFlows: API.OperationMethod<GetProjectsLocationsAgentsFlowsRequest, GetProjectsLocationsAgentsFlowsResponse, GetProjectsLocationsAgentsFlowsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsFlowsRequest,
  output: GetProjectsLocationsAgentsFlowsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsFlowsRequest {
  name: string;
  updateMask?: string;
  languageCode?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1Flow;
}

export const PatchProjectsLocationsAgentsFlowsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1Flow).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsFlowsRequest>;

export type PatchProjectsLocationsAgentsFlowsResponse = GoogleCloudDialogflowCxV3beta1Flow;
export const PatchProjectsLocationsAgentsFlowsResponse = GoogleCloudDialogflowCxV3beta1Flow;

export type PatchProjectsLocationsAgentsFlowsError = CommonErrors;

export const patchProjectsLocationsAgentsFlows: API.OperationMethod<PatchProjectsLocationsAgentsFlowsRequest, PatchProjectsLocationsAgentsFlowsResponse, PatchProjectsLocationsAgentsFlowsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsFlowsRequest,
  output: PatchProjectsLocationsAgentsFlowsResponse,
  errors: [],
}));

export interface TrainProjectsLocationsAgentsFlowsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1TrainFlowRequest;
}

export const TrainProjectsLocationsAgentsFlowsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1TrainFlowRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}:train", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TrainProjectsLocationsAgentsFlowsRequest>;

export type TrainProjectsLocationsAgentsFlowsResponse = GoogleLongrunningOperation;
export const TrainProjectsLocationsAgentsFlowsResponse = GoogleLongrunningOperation;

export type TrainProjectsLocationsAgentsFlowsError = CommonErrors;

export const trainProjectsLocationsAgentsFlows: API.OperationMethod<TrainProjectsLocationsAgentsFlowsRequest, TrainProjectsLocationsAgentsFlowsResponse, TrainProjectsLocationsAgentsFlowsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TrainProjectsLocationsAgentsFlowsRequest,
  output: TrainProjectsLocationsAgentsFlowsResponse,
  errors: [],
}));

export interface ValidateProjectsLocationsAgentsFlowsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1ValidateFlowRequest;
}

export const ValidateProjectsLocationsAgentsFlowsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1ValidateFlowRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}:validate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ValidateProjectsLocationsAgentsFlowsRequest>;

export type ValidateProjectsLocationsAgentsFlowsResponse = GoogleCloudDialogflowCxV3beta1FlowValidationResult;
export const ValidateProjectsLocationsAgentsFlowsResponse = GoogleCloudDialogflowCxV3beta1FlowValidationResult;

export type ValidateProjectsLocationsAgentsFlowsError = CommonErrors;

export const validateProjectsLocationsAgentsFlows: API.OperationMethod<ValidateProjectsLocationsAgentsFlowsRequest, ValidateProjectsLocationsAgentsFlowsResponse, ValidateProjectsLocationsAgentsFlowsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ValidateProjectsLocationsAgentsFlowsRequest,
  output: ValidateProjectsLocationsAgentsFlowsResponse,
  errors: [],
}));

export interface GetValidationResultProjectsLocationsAgentsFlowsRequest {
  name: string;
  languageCode?: string;
}

export const GetValidationResultProjectsLocationsAgentsFlowsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/validationResult" }),
  svc,
) as unknown as Schema.Schema<GetValidationResultProjectsLocationsAgentsFlowsRequest>;

export type GetValidationResultProjectsLocationsAgentsFlowsResponse = GoogleCloudDialogflowCxV3beta1FlowValidationResult;
export const GetValidationResultProjectsLocationsAgentsFlowsResponse = GoogleCloudDialogflowCxV3beta1FlowValidationResult;

export type GetValidationResultProjectsLocationsAgentsFlowsError = CommonErrors;

export const getValidationResultProjectsLocationsAgentsFlows: API.OperationMethod<GetValidationResultProjectsLocationsAgentsFlowsRequest, GetValidationResultProjectsLocationsAgentsFlowsResponse, GetValidationResultProjectsLocationsAgentsFlowsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetValidationResultProjectsLocationsAgentsFlowsRequest,
  output: GetValidationResultProjectsLocationsAgentsFlowsResponse,
  errors: [],
}));

export interface ImportProjectsLocationsAgentsFlowsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1ImportFlowRequest;
}

export const ImportProjectsLocationsAgentsFlowsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1ImportFlowRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows:import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportProjectsLocationsAgentsFlowsRequest>;

export type ImportProjectsLocationsAgentsFlowsResponse = GoogleLongrunningOperation;
export const ImportProjectsLocationsAgentsFlowsResponse = GoogleLongrunningOperation;

export type ImportProjectsLocationsAgentsFlowsError = CommonErrors;

export const importProjectsLocationsAgentsFlows: API.OperationMethod<ImportProjectsLocationsAgentsFlowsRequest, ImportProjectsLocationsAgentsFlowsResponse, ImportProjectsLocationsAgentsFlowsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportProjectsLocationsAgentsFlowsRequest,
  output: ImportProjectsLocationsAgentsFlowsResponse,
  errors: [],
}));

export interface ExportProjectsLocationsAgentsFlowsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1ExportFlowRequest;
}

export const ExportProjectsLocationsAgentsFlowsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1ExportFlowRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}:export", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExportProjectsLocationsAgentsFlowsRequest>;

export type ExportProjectsLocationsAgentsFlowsResponse = GoogleLongrunningOperation;
export const ExportProjectsLocationsAgentsFlowsResponse = GoogleLongrunningOperation;

export type ExportProjectsLocationsAgentsFlowsError = CommonErrors;

export const exportProjectsLocationsAgentsFlows: API.OperationMethod<ExportProjectsLocationsAgentsFlowsRequest, ExportProjectsLocationsAgentsFlowsResponse, ExportProjectsLocationsAgentsFlowsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExportProjectsLocationsAgentsFlowsRequest,
  output: ExportProjectsLocationsAgentsFlowsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsFlowsPagesRequest {
  parent: string;
  languageCode?: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsFlowsPagesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/pages" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsFlowsPagesRequest>;

export type ListProjectsLocationsAgentsFlowsPagesResponse = GoogleCloudDialogflowCxV3beta1ListPagesResponse;
export const ListProjectsLocationsAgentsFlowsPagesResponse = GoogleCloudDialogflowCxV3beta1ListPagesResponse;

export type ListProjectsLocationsAgentsFlowsPagesError = CommonErrors;

export const listProjectsLocationsAgentsFlowsPages: API.PaginatedOperationMethod<ListProjectsLocationsAgentsFlowsPagesRequest, ListProjectsLocationsAgentsFlowsPagesResponse, ListProjectsLocationsAgentsFlowsPagesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsFlowsPagesRequest,
  output: ListProjectsLocationsAgentsFlowsPagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentsFlowsPagesRequest {
  name: string;
  languageCode?: string;
}

export const GetProjectsLocationsAgentsFlowsPagesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/pages/{pagesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsFlowsPagesRequest>;

export type GetProjectsLocationsAgentsFlowsPagesResponse = GoogleCloudDialogflowCxV3beta1Page;
export const GetProjectsLocationsAgentsFlowsPagesResponse = GoogleCloudDialogflowCxV3beta1Page;

export type GetProjectsLocationsAgentsFlowsPagesError = CommonErrors;

export const getProjectsLocationsAgentsFlowsPages: API.OperationMethod<GetProjectsLocationsAgentsFlowsPagesRequest, GetProjectsLocationsAgentsFlowsPagesResponse, GetProjectsLocationsAgentsFlowsPagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsFlowsPagesRequest,
  output: GetProjectsLocationsAgentsFlowsPagesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsFlowsPagesRequest {
  parent: string;
  languageCode?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1Page;
}

export const CreateProjectsLocationsAgentsFlowsPagesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1Page).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/pages", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsFlowsPagesRequest>;

export type CreateProjectsLocationsAgentsFlowsPagesResponse = GoogleCloudDialogflowCxV3beta1Page;
export const CreateProjectsLocationsAgentsFlowsPagesResponse = GoogleCloudDialogflowCxV3beta1Page;

export type CreateProjectsLocationsAgentsFlowsPagesError = CommonErrors;

export const createProjectsLocationsAgentsFlowsPages: API.OperationMethod<CreateProjectsLocationsAgentsFlowsPagesRequest, CreateProjectsLocationsAgentsFlowsPagesResponse, CreateProjectsLocationsAgentsFlowsPagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsFlowsPagesRequest,
  output: CreateProjectsLocationsAgentsFlowsPagesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsFlowsPagesRequest {
  name: string;
  languageCode?: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1Page;
}

export const PatchProjectsLocationsAgentsFlowsPagesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1Page).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/pages/{pagesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsFlowsPagesRequest>;

export type PatchProjectsLocationsAgentsFlowsPagesResponse = GoogleCloudDialogflowCxV3beta1Page;
export const PatchProjectsLocationsAgentsFlowsPagesResponse = GoogleCloudDialogflowCxV3beta1Page;

export type PatchProjectsLocationsAgentsFlowsPagesError = CommonErrors;

export const patchProjectsLocationsAgentsFlowsPages: API.OperationMethod<PatchProjectsLocationsAgentsFlowsPagesRequest, PatchProjectsLocationsAgentsFlowsPagesResponse, PatchProjectsLocationsAgentsFlowsPagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsFlowsPagesRequest,
  output: PatchProjectsLocationsAgentsFlowsPagesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsFlowsPagesRequest {
  name: string;
  force?: boolean;
}

export const DeleteProjectsLocationsAgentsFlowsPagesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/pages/{pagesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsFlowsPagesRequest>;

export type DeleteProjectsLocationsAgentsFlowsPagesResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsFlowsPagesResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsFlowsPagesError = CommonErrors;

export const deleteProjectsLocationsAgentsFlowsPages: API.OperationMethod<DeleteProjectsLocationsAgentsFlowsPagesRequest, DeleteProjectsLocationsAgentsFlowsPagesResponse, DeleteProjectsLocationsAgentsFlowsPagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAgentsFlowsPagesRequest,
  output: DeleteProjectsLocationsAgentsFlowsPagesResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
  languageCode?: string;
}

export const ListProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/transitionRouteGroups" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest>;

export type ListProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3beta1ListTransitionRouteGroupsResponse;
export const ListProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3beta1ListTransitionRouteGroupsResponse;

export type ListProjectsLocationsAgentsFlowsTransitionRouteGroupsError = CommonErrors;

export const listProjectsLocationsAgentsFlowsTransitionRouteGroups: API.PaginatedOperationMethod<ListProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest, ListProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse, ListProjectsLocationsAgentsFlowsTransitionRouteGroupsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest,
  output: ListProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest {
  name: string;
  languageCode?: string;
}

export const GetProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/transitionRouteGroups/{transitionRouteGroupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest>;

export type GetProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3beta1TransitionRouteGroup;
export const GetProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3beta1TransitionRouteGroup;

export type GetProjectsLocationsAgentsFlowsTransitionRouteGroupsError = CommonErrors;

export const getProjectsLocationsAgentsFlowsTransitionRouteGroups: API.OperationMethod<GetProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest, GetProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse, GetProjectsLocationsAgentsFlowsTransitionRouteGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest,
  output: GetProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest {
  parent: string;
  languageCode?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1TransitionRouteGroup;
}

export const CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1TransitionRouteGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/transitionRouteGroups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest>;

export type CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3beta1TransitionRouteGroup;
export const CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3beta1TransitionRouteGroup;

export type CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsError = CommonErrors;

export const createProjectsLocationsAgentsFlowsTransitionRouteGroups: API.OperationMethod<CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest, CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse, CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest,
  output: CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest {
  name: string;
  updateMask?: string;
  languageCode?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1TransitionRouteGroup;
}

export const PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1TransitionRouteGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/transitionRouteGroups/{transitionRouteGroupsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest>;

export type PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3beta1TransitionRouteGroup;
export const PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3beta1TransitionRouteGroup;

export type PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsError = CommonErrors;

export const patchProjectsLocationsAgentsFlowsTransitionRouteGroups: API.OperationMethod<PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest, PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse, PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest,
  output: PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest {
  name: string;
  force?: boolean;
}

export const DeleteProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/transitionRouteGroups/{transitionRouteGroupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest>;

export type DeleteProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsFlowsTransitionRouteGroupsError = CommonErrors;

export const deleteProjectsLocationsAgentsFlowsTransitionRouteGroups: API.OperationMethod<DeleteProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest, DeleteProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse, DeleteProjectsLocationsAgentsFlowsTransitionRouteGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest,
  output: DeleteProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsFlowsVersionsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsFlowsVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/versions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsFlowsVersionsRequest>;

export type ListProjectsLocationsAgentsFlowsVersionsResponse = GoogleCloudDialogflowCxV3beta1ListVersionsResponse;
export const ListProjectsLocationsAgentsFlowsVersionsResponse = GoogleCloudDialogflowCxV3beta1ListVersionsResponse;

export type ListProjectsLocationsAgentsFlowsVersionsError = CommonErrors;

export const listProjectsLocationsAgentsFlowsVersions: API.PaginatedOperationMethod<ListProjectsLocationsAgentsFlowsVersionsRequest, ListProjectsLocationsAgentsFlowsVersionsResponse, ListProjectsLocationsAgentsFlowsVersionsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsFlowsVersionsRequest,
  output: ListProjectsLocationsAgentsFlowsVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentsFlowsVersionsRequest {
  name: string;
}

export const GetProjectsLocationsAgentsFlowsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsFlowsVersionsRequest>;

export type GetProjectsLocationsAgentsFlowsVersionsResponse = GoogleCloudDialogflowCxV3beta1Version;
export const GetProjectsLocationsAgentsFlowsVersionsResponse = GoogleCloudDialogflowCxV3beta1Version;

export type GetProjectsLocationsAgentsFlowsVersionsError = CommonErrors;

export const getProjectsLocationsAgentsFlowsVersions: API.OperationMethod<GetProjectsLocationsAgentsFlowsVersionsRequest, GetProjectsLocationsAgentsFlowsVersionsResponse, GetProjectsLocationsAgentsFlowsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsFlowsVersionsRequest,
  output: GetProjectsLocationsAgentsFlowsVersionsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsFlowsVersionsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1Version;
}

export const CreateProjectsLocationsAgentsFlowsVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1Version).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/versions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsFlowsVersionsRequest>;

export type CreateProjectsLocationsAgentsFlowsVersionsResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsAgentsFlowsVersionsResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsAgentsFlowsVersionsError = CommonErrors;

export const createProjectsLocationsAgentsFlowsVersions: API.OperationMethod<CreateProjectsLocationsAgentsFlowsVersionsRequest, CreateProjectsLocationsAgentsFlowsVersionsResponse, CreateProjectsLocationsAgentsFlowsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsFlowsVersionsRequest,
  output: CreateProjectsLocationsAgentsFlowsVersionsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsFlowsVersionsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1Version;
}

export const PatchProjectsLocationsAgentsFlowsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1Version).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/versions/{versionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsFlowsVersionsRequest>;

export type PatchProjectsLocationsAgentsFlowsVersionsResponse = GoogleCloudDialogflowCxV3beta1Version;
export const PatchProjectsLocationsAgentsFlowsVersionsResponse = GoogleCloudDialogflowCxV3beta1Version;

export type PatchProjectsLocationsAgentsFlowsVersionsError = CommonErrors;

export const patchProjectsLocationsAgentsFlowsVersions: API.OperationMethod<PatchProjectsLocationsAgentsFlowsVersionsRequest, PatchProjectsLocationsAgentsFlowsVersionsResponse, PatchProjectsLocationsAgentsFlowsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsFlowsVersionsRequest,
  output: PatchProjectsLocationsAgentsFlowsVersionsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsFlowsVersionsRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentsFlowsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsFlowsVersionsRequest>;

export type DeleteProjectsLocationsAgentsFlowsVersionsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsFlowsVersionsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsFlowsVersionsError = CommonErrors;

export const deleteProjectsLocationsAgentsFlowsVersions: API.OperationMethod<DeleteProjectsLocationsAgentsFlowsVersionsRequest, DeleteProjectsLocationsAgentsFlowsVersionsResponse, DeleteProjectsLocationsAgentsFlowsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAgentsFlowsVersionsRequest,
  output: DeleteProjectsLocationsAgentsFlowsVersionsResponse,
  errors: [],
}));

export interface LoadProjectsLocationsAgentsFlowsVersionsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1LoadVersionRequest;
}

export const LoadProjectsLocationsAgentsFlowsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1LoadVersionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/versions/{versionsId}:load", hasBody: true }),
  svc,
) as unknown as Schema.Schema<LoadProjectsLocationsAgentsFlowsVersionsRequest>;

export type LoadProjectsLocationsAgentsFlowsVersionsResponse = GoogleLongrunningOperation;
export const LoadProjectsLocationsAgentsFlowsVersionsResponse = GoogleLongrunningOperation;

export type LoadProjectsLocationsAgentsFlowsVersionsError = CommonErrors;

export const loadProjectsLocationsAgentsFlowsVersions: API.OperationMethod<LoadProjectsLocationsAgentsFlowsVersionsRequest, LoadProjectsLocationsAgentsFlowsVersionsResponse, LoadProjectsLocationsAgentsFlowsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LoadProjectsLocationsAgentsFlowsVersionsRequest,
  output: LoadProjectsLocationsAgentsFlowsVersionsResponse,
  errors: [],
}));

export interface CompareVersionsProjectsLocationsAgentsFlowsVersionsRequest {
  baseVersion: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1CompareVersionsRequest;
}

export const CompareVersionsProjectsLocationsAgentsFlowsVersionsRequest = Schema.Struct({
  baseVersion: Schema.String.pipe(T.HttpPath("baseVersion")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1CompareVersionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/versions/{versionsId}:compareVersions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CompareVersionsProjectsLocationsAgentsFlowsVersionsRequest>;

export type CompareVersionsProjectsLocationsAgentsFlowsVersionsResponse = GoogleCloudDialogflowCxV3beta1CompareVersionsResponse;
export const CompareVersionsProjectsLocationsAgentsFlowsVersionsResponse = GoogleCloudDialogflowCxV3beta1CompareVersionsResponse;

export type CompareVersionsProjectsLocationsAgentsFlowsVersionsError = CommonErrors;

export const compareVersionsProjectsLocationsAgentsFlowsVersions: API.OperationMethod<CompareVersionsProjectsLocationsAgentsFlowsVersionsRequest, CompareVersionsProjectsLocationsAgentsFlowsVersionsResponse, CompareVersionsProjectsLocationsAgentsFlowsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CompareVersionsProjectsLocationsAgentsFlowsVersionsRequest,
  output: CompareVersionsProjectsLocationsAgentsFlowsVersionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsChangelogsRequest {
  parent: string;
  filter?: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsChangelogsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/changelogs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsChangelogsRequest>;

export type ListProjectsLocationsAgentsChangelogsResponse = GoogleCloudDialogflowCxV3beta1ListChangelogsResponse;
export const ListProjectsLocationsAgentsChangelogsResponse = GoogleCloudDialogflowCxV3beta1ListChangelogsResponse;

export type ListProjectsLocationsAgentsChangelogsError = CommonErrors;

export const listProjectsLocationsAgentsChangelogs: API.PaginatedOperationMethod<ListProjectsLocationsAgentsChangelogsRequest, ListProjectsLocationsAgentsChangelogsResponse, ListProjectsLocationsAgentsChangelogsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsChangelogsRequest,
  output: ListProjectsLocationsAgentsChangelogsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentsChangelogsRequest {
  name: string;
}

export const GetProjectsLocationsAgentsChangelogsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/changelogs/{changelogsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsChangelogsRequest>;

export type GetProjectsLocationsAgentsChangelogsResponse = GoogleCloudDialogflowCxV3beta1Changelog;
export const GetProjectsLocationsAgentsChangelogsResponse = GoogleCloudDialogflowCxV3beta1Changelog;

export type GetProjectsLocationsAgentsChangelogsError = CommonErrors;

export const getProjectsLocationsAgentsChangelogs: API.OperationMethod<GetProjectsLocationsAgentsChangelogsRequest, GetProjectsLocationsAgentsChangelogsResponse, GetProjectsLocationsAgentsChangelogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsChangelogsRequest,
  output: GetProjectsLocationsAgentsChangelogsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsIntentsRequest {
  parent: string;
  languageCode?: string;
  intentView?: "INTENT_VIEW_UNSPECIFIED" | "INTENT_VIEW_PARTIAL" | "INTENT_VIEW_FULL" | (string & {});
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsIntentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  intentView: Schema.optional(Schema.String).pipe(T.HttpQuery("intentView")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/intents" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsIntentsRequest>;

export type ListProjectsLocationsAgentsIntentsResponse = GoogleCloudDialogflowCxV3beta1ListIntentsResponse;
export const ListProjectsLocationsAgentsIntentsResponse = GoogleCloudDialogflowCxV3beta1ListIntentsResponse;

export type ListProjectsLocationsAgentsIntentsError = CommonErrors;

export const listProjectsLocationsAgentsIntents: API.PaginatedOperationMethod<ListProjectsLocationsAgentsIntentsRequest, ListProjectsLocationsAgentsIntentsResponse, ListProjectsLocationsAgentsIntentsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsIntentsRequest,
  output: ListProjectsLocationsAgentsIntentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentsIntentsRequest {
  name: string;
  languageCode?: string;
}

export const GetProjectsLocationsAgentsIntentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/intents/{intentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsIntentsRequest>;

export type GetProjectsLocationsAgentsIntentsResponse = GoogleCloudDialogflowCxV3beta1Intent;
export const GetProjectsLocationsAgentsIntentsResponse = GoogleCloudDialogflowCxV3beta1Intent;

export type GetProjectsLocationsAgentsIntentsError = CommonErrors;

export const getProjectsLocationsAgentsIntents: API.OperationMethod<GetProjectsLocationsAgentsIntentsRequest, GetProjectsLocationsAgentsIntentsResponse, GetProjectsLocationsAgentsIntentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsIntentsRequest,
  output: GetProjectsLocationsAgentsIntentsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsIntentsRequest {
  parent: string;
  languageCode?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1Intent;
}

export const CreateProjectsLocationsAgentsIntentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1Intent).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/intents", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsIntentsRequest>;

export type CreateProjectsLocationsAgentsIntentsResponse = GoogleCloudDialogflowCxV3beta1Intent;
export const CreateProjectsLocationsAgentsIntentsResponse = GoogleCloudDialogflowCxV3beta1Intent;

export type CreateProjectsLocationsAgentsIntentsError = CommonErrors;

export const createProjectsLocationsAgentsIntents: API.OperationMethod<CreateProjectsLocationsAgentsIntentsRequest, CreateProjectsLocationsAgentsIntentsResponse, CreateProjectsLocationsAgentsIntentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsIntentsRequest,
  output: CreateProjectsLocationsAgentsIntentsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsIntentsRequest {
  name: string;
  languageCode?: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1Intent;
}

export const PatchProjectsLocationsAgentsIntentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1Intent).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/intents/{intentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsIntentsRequest>;

export type PatchProjectsLocationsAgentsIntentsResponse = GoogleCloudDialogflowCxV3beta1Intent;
export const PatchProjectsLocationsAgentsIntentsResponse = GoogleCloudDialogflowCxV3beta1Intent;

export type PatchProjectsLocationsAgentsIntentsError = CommonErrors;

export const patchProjectsLocationsAgentsIntents: API.OperationMethod<PatchProjectsLocationsAgentsIntentsRequest, PatchProjectsLocationsAgentsIntentsResponse, PatchProjectsLocationsAgentsIntentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsIntentsRequest,
  output: PatchProjectsLocationsAgentsIntentsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsIntentsRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentsIntentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/intents/{intentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsIntentsRequest>;

export type DeleteProjectsLocationsAgentsIntentsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsIntentsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsIntentsError = CommonErrors;

export const deleteProjectsLocationsAgentsIntents: API.OperationMethod<DeleteProjectsLocationsAgentsIntentsRequest, DeleteProjectsLocationsAgentsIntentsResponse, DeleteProjectsLocationsAgentsIntentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAgentsIntentsRequest,
  output: DeleteProjectsLocationsAgentsIntentsResponse,
  errors: [],
}));

export interface ImportProjectsLocationsAgentsIntentsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1ImportIntentsRequest;
}

export const ImportProjectsLocationsAgentsIntentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1ImportIntentsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/intents:import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportProjectsLocationsAgentsIntentsRequest>;

export type ImportProjectsLocationsAgentsIntentsResponse = GoogleLongrunningOperation;
export const ImportProjectsLocationsAgentsIntentsResponse = GoogleLongrunningOperation;

export type ImportProjectsLocationsAgentsIntentsError = CommonErrors;

export const importProjectsLocationsAgentsIntents: API.OperationMethod<ImportProjectsLocationsAgentsIntentsRequest, ImportProjectsLocationsAgentsIntentsResponse, ImportProjectsLocationsAgentsIntentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportProjectsLocationsAgentsIntentsRequest,
  output: ImportProjectsLocationsAgentsIntentsResponse,
  errors: [],
}));

export interface ExportProjectsLocationsAgentsIntentsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1ExportIntentsRequest;
}

export const ExportProjectsLocationsAgentsIntentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1ExportIntentsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/intents:export", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExportProjectsLocationsAgentsIntentsRequest>;

export type ExportProjectsLocationsAgentsIntentsResponse = GoogleLongrunningOperation;
export const ExportProjectsLocationsAgentsIntentsResponse = GoogleLongrunningOperation;

export type ExportProjectsLocationsAgentsIntentsError = CommonErrors;

export const exportProjectsLocationsAgentsIntents: API.OperationMethod<ExportProjectsLocationsAgentsIntentsRequest, ExportProjectsLocationsAgentsIntentsResponse, ExportProjectsLocationsAgentsIntentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExportProjectsLocationsAgentsIntentsRequest,
  output: ExportProjectsLocationsAgentsIntentsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAgentsEntityTypesRequest {
  name: string;
  languageCode?: string;
}

export const GetProjectsLocationsAgentsEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/entityTypes/{entityTypesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsEntityTypesRequest>;

export type GetProjectsLocationsAgentsEntityTypesResponse = GoogleCloudDialogflowCxV3beta1EntityType;
export const GetProjectsLocationsAgentsEntityTypesResponse = GoogleCloudDialogflowCxV3beta1EntityType;

export type GetProjectsLocationsAgentsEntityTypesError = CommonErrors;

export const getProjectsLocationsAgentsEntityTypes: API.OperationMethod<GetProjectsLocationsAgentsEntityTypesRequest, GetProjectsLocationsAgentsEntityTypesResponse, GetProjectsLocationsAgentsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsEntityTypesRequest,
  output: GetProjectsLocationsAgentsEntityTypesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsEntityTypesRequest {
  parent: string;
  languageCode?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1EntityType;
}

export const CreateProjectsLocationsAgentsEntityTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1EntityType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/entityTypes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsEntityTypesRequest>;

export type CreateProjectsLocationsAgentsEntityTypesResponse = GoogleCloudDialogflowCxV3beta1EntityType;
export const CreateProjectsLocationsAgentsEntityTypesResponse = GoogleCloudDialogflowCxV3beta1EntityType;

export type CreateProjectsLocationsAgentsEntityTypesError = CommonErrors;

export const createProjectsLocationsAgentsEntityTypes: API.OperationMethod<CreateProjectsLocationsAgentsEntityTypesRequest, CreateProjectsLocationsAgentsEntityTypesResponse, CreateProjectsLocationsAgentsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsEntityTypesRequest,
  output: CreateProjectsLocationsAgentsEntityTypesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsEntityTypesRequest {
  name: string;
  languageCode?: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1EntityType;
}

export const PatchProjectsLocationsAgentsEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1EntityType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/entityTypes/{entityTypesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsEntityTypesRequest>;

export type PatchProjectsLocationsAgentsEntityTypesResponse = GoogleCloudDialogflowCxV3beta1EntityType;
export const PatchProjectsLocationsAgentsEntityTypesResponse = GoogleCloudDialogflowCxV3beta1EntityType;

export type PatchProjectsLocationsAgentsEntityTypesError = CommonErrors;

export const patchProjectsLocationsAgentsEntityTypes: API.OperationMethod<PatchProjectsLocationsAgentsEntityTypesRequest, PatchProjectsLocationsAgentsEntityTypesResponse, PatchProjectsLocationsAgentsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsEntityTypesRequest,
  output: PatchProjectsLocationsAgentsEntityTypesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsEntityTypesRequest {
  name: string;
  force?: boolean;
}

export const DeleteProjectsLocationsAgentsEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/entityTypes/{entityTypesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsEntityTypesRequest>;

export type DeleteProjectsLocationsAgentsEntityTypesResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsEntityTypesResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsEntityTypesError = CommonErrors;

export const deleteProjectsLocationsAgentsEntityTypes: API.OperationMethod<DeleteProjectsLocationsAgentsEntityTypesRequest, DeleteProjectsLocationsAgentsEntityTypesResponse, DeleteProjectsLocationsAgentsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAgentsEntityTypesRequest,
  output: DeleteProjectsLocationsAgentsEntityTypesResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsEntityTypesRequest {
  parent: string;
  languageCode?: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsEntityTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/entityTypes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsEntityTypesRequest>;

export type ListProjectsLocationsAgentsEntityTypesResponse = GoogleCloudDialogflowCxV3beta1ListEntityTypesResponse;
export const ListProjectsLocationsAgentsEntityTypesResponse = GoogleCloudDialogflowCxV3beta1ListEntityTypesResponse;

export type ListProjectsLocationsAgentsEntityTypesError = CommonErrors;

export const listProjectsLocationsAgentsEntityTypes: API.PaginatedOperationMethod<ListProjectsLocationsAgentsEntityTypesRequest, ListProjectsLocationsAgentsEntityTypesResponse, ListProjectsLocationsAgentsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsEntityTypesRequest,
  output: ListProjectsLocationsAgentsEntityTypesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ExportProjectsLocationsAgentsEntityTypesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1ExportEntityTypesRequest;
}

export const ExportProjectsLocationsAgentsEntityTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1ExportEntityTypesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/entityTypes:export", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExportProjectsLocationsAgentsEntityTypesRequest>;

export type ExportProjectsLocationsAgentsEntityTypesResponse = GoogleLongrunningOperation;
export const ExportProjectsLocationsAgentsEntityTypesResponse = GoogleLongrunningOperation;

export type ExportProjectsLocationsAgentsEntityTypesError = CommonErrors;

export const exportProjectsLocationsAgentsEntityTypes: API.OperationMethod<ExportProjectsLocationsAgentsEntityTypesRequest, ExportProjectsLocationsAgentsEntityTypesResponse, ExportProjectsLocationsAgentsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExportProjectsLocationsAgentsEntityTypesRequest,
  output: ExportProjectsLocationsAgentsEntityTypesResponse,
  errors: [],
}));

export interface ImportProjectsLocationsAgentsEntityTypesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1ImportEntityTypesRequest;
}

export const ImportProjectsLocationsAgentsEntityTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1ImportEntityTypesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/entityTypes:import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportProjectsLocationsAgentsEntityTypesRequest>;

export type ImportProjectsLocationsAgentsEntityTypesResponse = GoogleLongrunningOperation;
export const ImportProjectsLocationsAgentsEntityTypesResponse = GoogleLongrunningOperation;

export type ImportProjectsLocationsAgentsEntityTypesError = CommonErrors;

export const importProjectsLocationsAgentsEntityTypes: API.OperationMethod<ImportProjectsLocationsAgentsEntityTypesRequest, ImportProjectsLocationsAgentsEntityTypesResponse, ImportProjectsLocationsAgentsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportProjectsLocationsAgentsEntityTypesRequest,
  output: ImportProjectsLocationsAgentsEntityTypesResponse,
  errors: [],
}));

export interface DetectIntentProjectsLocationsAgentsSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1DetectIntentRequest;
}

export const DetectIntentProjectsLocationsAgentsSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1DetectIntentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}:detectIntent", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DetectIntentProjectsLocationsAgentsSessionsRequest>;

export type DetectIntentProjectsLocationsAgentsSessionsResponse = GoogleCloudDialogflowCxV3beta1DetectIntentResponse;
export const DetectIntentProjectsLocationsAgentsSessionsResponse = GoogleCloudDialogflowCxV3beta1DetectIntentResponse;

export type DetectIntentProjectsLocationsAgentsSessionsError = CommonErrors;

export const detectIntentProjectsLocationsAgentsSessions: API.OperationMethod<DetectIntentProjectsLocationsAgentsSessionsRequest, DetectIntentProjectsLocationsAgentsSessionsResponse, DetectIntentProjectsLocationsAgentsSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DetectIntentProjectsLocationsAgentsSessionsRequest,
  output: DetectIntentProjectsLocationsAgentsSessionsResponse,
  errors: [],
}));

export interface ServerStreamingDetectIntentProjectsLocationsAgentsSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1DetectIntentRequest;
}

export const ServerStreamingDetectIntentProjectsLocationsAgentsSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1DetectIntentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}:serverStreamingDetectIntent", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ServerStreamingDetectIntentProjectsLocationsAgentsSessionsRequest>;

export type ServerStreamingDetectIntentProjectsLocationsAgentsSessionsResponse = GoogleCloudDialogflowCxV3beta1DetectIntentResponse;
export const ServerStreamingDetectIntentProjectsLocationsAgentsSessionsResponse = GoogleCloudDialogflowCxV3beta1DetectIntentResponse;

export type ServerStreamingDetectIntentProjectsLocationsAgentsSessionsError = CommonErrors;

export const serverStreamingDetectIntentProjectsLocationsAgentsSessions: API.OperationMethod<ServerStreamingDetectIntentProjectsLocationsAgentsSessionsRequest, ServerStreamingDetectIntentProjectsLocationsAgentsSessionsResponse, ServerStreamingDetectIntentProjectsLocationsAgentsSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ServerStreamingDetectIntentProjectsLocationsAgentsSessionsRequest,
  output: ServerStreamingDetectIntentProjectsLocationsAgentsSessionsResponse,
  errors: [],
}));

export interface MatchIntentProjectsLocationsAgentsSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1MatchIntentRequest;
}

export const MatchIntentProjectsLocationsAgentsSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1MatchIntentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}:matchIntent", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MatchIntentProjectsLocationsAgentsSessionsRequest>;

export type MatchIntentProjectsLocationsAgentsSessionsResponse = GoogleCloudDialogflowCxV3beta1MatchIntentResponse;
export const MatchIntentProjectsLocationsAgentsSessionsResponse = GoogleCloudDialogflowCxV3beta1MatchIntentResponse;

export type MatchIntentProjectsLocationsAgentsSessionsError = CommonErrors;

export const matchIntentProjectsLocationsAgentsSessions: API.OperationMethod<MatchIntentProjectsLocationsAgentsSessionsRequest, MatchIntentProjectsLocationsAgentsSessionsResponse, MatchIntentProjectsLocationsAgentsSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MatchIntentProjectsLocationsAgentsSessionsRequest,
  output: MatchIntentProjectsLocationsAgentsSessionsResponse,
  errors: [],
}));

export interface FulfillIntentProjectsLocationsAgentsSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1FulfillIntentRequest;
}

export const FulfillIntentProjectsLocationsAgentsSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1FulfillIntentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}:fulfillIntent", hasBody: true }),
  svc,
) as unknown as Schema.Schema<FulfillIntentProjectsLocationsAgentsSessionsRequest>;

export type FulfillIntentProjectsLocationsAgentsSessionsResponse = GoogleCloudDialogflowCxV3beta1FulfillIntentResponse;
export const FulfillIntentProjectsLocationsAgentsSessionsResponse = GoogleCloudDialogflowCxV3beta1FulfillIntentResponse;

export type FulfillIntentProjectsLocationsAgentsSessionsError = CommonErrors;

export const fulfillIntentProjectsLocationsAgentsSessions: API.OperationMethod<FulfillIntentProjectsLocationsAgentsSessionsRequest, FulfillIntentProjectsLocationsAgentsSessionsResponse, FulfillIntentProjectsLocationsAgentsSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FulfillIntentProjectsLocationsAgentsSessionsRequest,
  output: FulfillIntentProjectsLocationsAgentsSessionsResponse,
  errors: [],
}));

export interface SubmitAnswerFeedbackProjectsLocationsAgentsSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1SubmitAnswerFeedbackRequest;
}

export const SubmitAnswerFeedbackProjectsLocationsAgentsSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1SubmitAnswerFeedbackRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}:submitAnswerFeedback", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SubmitAnswerFeedbackProjectsLocationsAgentsSessionsRequest>;

export type SubmitAnswerFeedbackProjectsLocationsAgentsSessionsResponse = GoogleCloudDialogflowCxV3beta1AnswerFeedback;
export const SubmitAnswerFeedbackProjectsLocationsAgentsSessionsResponse = GoogleCloudDialogflowCxV3beta1AnswerFeedback;

export type SubmitAnswerFeedbackProjectsLocationsAgentsSessionsError = CommonErrors;

export const submitAnswerFeedbackProjectsLocationsAgentsSessions: API.OperationMethod<SubmitAnswerFeedbackProjectsLocationsAgentsSessionsRequest, SubmitAnswerFeedbackProjectsLocationsAgentsSessionsResponse, SubmitAnswerFeedbackProjectsLocationsAgentsSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SubmitAnswerFeedbackProjectsLocationsAgentsSessionsRequest,
  output: SubmitAnswerFeedbackProjectsLocationsAgentsSessionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsSessionsEntityTypesRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsSessionsEntityTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}/entityTypes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsSessionsEntityTypesRequest>;

export type ListProjectsLocationsAgentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3beta1ListSessionEntityTypesResponse;
export const ListProjectsLocationsAgentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3beta1ListSessionEntityTypesResponse;

export type ListProjectsLocationsAgentsSessionsEntityTypesError = CommonErrors;

export const listProjectsLocationsAgentsSessionsEntityTypes: API.PaginatedOperationMethod<ListProjectsLocationsAgentsSessionsEntityTypesRequest, ListProjectsLocationsAgentsSessionsEntityTypesResponse, ListProjectsLocationsAgentsSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsSessionsEntityTypesRequest,
  output: ListProjectsLocationsAgentsSessionsEntityTypesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentsSessionsEntityTypesRequest {
  name: string;
}

export const GetProjectsLocationsAgentsSessionsEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}/entityTypes/{entityTypesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsSessionsEntityTypesRequest>;

export type GetProjectsLocationsAgentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3beta1SessionEntityType;
export const GetProjectsLocationsAgentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3beta1SessionEntityType;

export type GetProjectsLocationsAgentsSessionsEntityTypesError = CommonErrors;

export const getProjectsLocationsAgentsSessionsEntityTypes: API.OperationMethod<GetProjectsLocationsAgentsSessionsEntityTypesRequest, GetProjectsLocationsAgentsSessionsEntityTypesResponse, GetProjectsLocationsAgentsSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsSessionsEntityTypesRequest,
  output: GetProjectsLocationsAgentsSessionsEntityTypesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsSessionsEntityTypesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1SessionEntityType;
}

export const CreateProjectsLocationsAgentsSessionsEntityTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1SessionEntityType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}/entityTypes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsSessionsEntityTypesRequest>;

export type CreateProjectsLocationsAgentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3beta1SessionEntityType;
export const CreateProjectsLocationsAgentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3beta1SessionEntityType;

export type CreateProjectsLocationsAgentsSessionsEntityTypesError = CommonErrors;

export const createProjectsLocationsAgentsSessionsEntityTypes: API.OperationMethod<CreateProjectsLocationsAgentsSessionsEntityTypesRequest, CreateProjectsLocationsAgentsSessionsEntityTypesResponse, CreateProjectsLocationsAgentsSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsSessionsEntityTypesRequest,
  output: CreateProjectsLocationsAgentsSessionsEntityTypesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsSessionsEntityTypesRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1SessionEntityType;
}

export const PatchProjectsLocationsAgentsSessionsEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1SessionEntityType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}/entityTypes/{entityTypesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsSessionsEntityTypesRequest>;

export type PatchProjectsLocationsAgentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3beta1SessionEntityType;
export const PatchProjectsLocationsAgentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3beta1SessionEntityType;

export type PatchProjectsLocationsAgentsSessionsEntityTypesError = CommonErrors;

export const patchProjectsLocationsAgentsSessionsEntityTypes: API.OperationMethod<PatchProjectsLocationsAgentsSessionsEntityTypesRequest, PatchProjectsLocationsAgentsSessionsEntityTypesResponse, PatchProjectsLocationsAgentsSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsSessionsEntityTypesRequest,
  output: PatchProjectsLocationsAgentsSessionsEntityTypesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsSessionsEntityTypesRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentsSessionsEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}/entityTypes/{entityTypesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsSessionsEntityTypesRequest>;

export type DeleteProjectsLocationsAgentsSessionsEntityTypesResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsSessionsEntityTypesResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsSessionsEntityTypesError = CommonErrors;

export const deleteProjectsLocationsAgentsSessionsEntityTypes: API.OperationMethod<DeleteProjectsLocationsAgentsSessionsEntityTypesRequest, DeleteProjectsLocationsAgentsSessionsEntityTypesResponse, DeleteProjectsLocationsAgentsSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAgentsSessionsEntityTypesRequest,
  output: DeleteProjectsLocationsAgentsSessionsEntityTypesResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsTransitionRouteGroupsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
  languageCode?: string;
}

export const ListProjectsLocationsAgentsTransitionRouteGroupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/transitionRouteGroups" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsTransitionRouteGroupsRequest>;

export type ListProjectsLocationsAgentsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3beta1ListTransitionRouteGroupsResponse;
export const ListProjectsLocationsAgentsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3beta1ListTransitionRouteGroupsResponse;

export type ListProjectsLocationsAgentsTransitionRouteGroupsError = CommonErrors;

export const listProjectsLocationsAgentsTransitionRouteGroups: API.PaginatedOperationMethod<ListProjectsLocationsAgentsTransitionRouteGroupsRequest, ListProjectsLocationsAgentsTransitionRouteGroupsResponse, ListProjectsLocationsAgentsTransitionRouteGroupsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsTransitionRouteGroupsRequest,
  output: ListProjectsLocationsAgentsTransitionRouteGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentsTransitionRouteGroupsRequest {
  name: string;
  languageCode?: string;
}

export const GetProjectsLocationsAgentsTransitionRouteGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/transitionRouteGroups/{transitionRouteGroupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsTransitionRouteGroupsRequest>;

export type GetProjectsLocationsAgentsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3beta1TransitionRouteGroup;
export const GetProjectsLocationsAgentsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3beta1TransitionRouteGroup;

export type GetProjectsLocationsAgentsTransitionRouteGroupsError = CommonErrors;

export const getProjectsLocationsAgentsTransitionRouteGroups: API.OperationMethod<GetProjectsLocationsAgentsTransitionRouteGroupsRequest, GetProjectsLocationsAgentsTransitionRouteGroupsResponse, GetProjectsLocationsAgentsTransitionRouteGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsTransitionRouteGroupsRequest,
  output: GetProjectsLocationsAgentsTransitionRouteGroupsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsTransitionRouteGroupsRequest {
  parent: string;
  languageCode?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1TransitionRouteGroup;
}

export const CreateProjectsLocationsAgentsTransitionRouteGroupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1TransitionRouteGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/transitionRouteGroups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsTransitionRouteGroupsRequest>;

export type CreateProjectsLocationsAgentsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3beta1TransitionRouteGroup;
export const CreateProjectsLocationsAgentsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3beta1TransitionRouteGroup;

export type CreateProjectsLocationsAgentsTransitionRouteGroupsError = CommonErrors;

export const createProjectsLocationsAgentsTransitionRouteGroups: API.OperationMethod<CreateProjectsLocationsAgentsTransitionRouteGroupsRequest, CreateProjectsLocationsAgentsTransitionRouteGroupsResponse, CreateProjectsLocationsAgentsTransitionRouteGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsTransitionRouteGroupsRequest,
  output: CreateProjectsLocationsAgentsTransitionRouteGroupsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsTransitionRouteGroupsRequest {
  name: string;
  updateMask?: string;
  languageCode?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1TransitionRouteGroup;
}

export const PatchProjectsLocationsAgentsTransitionRouteGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1TransitionRouteGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/transitionRouteGroups/{transitionRouteGroupsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsTransitionRouteGroupsRequest>;

export type PatchProjectsLocationsAgentsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3beta1TransitionRouteGroup;
export const PatchProjectsLocationsAgentsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3beta1TransitionRouteGroup;

export type PatchProjectsLocationsAgentsTransitionRouteGroupsError = CommonErrors;

export const patchProjectsLocationsAgentsTransitionRouteGroups: API.OperationMethod<PatchProjectsLocationsAgentsTransitionRouteGroupsRequest, PatchProjectsLocationsAgentsTransitionRouteGroupsResponse, PatchProjectsLocationsAgentsTransitionRouteGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsTransitionRouteGroupsRequest,
  output: PatchProjectsLocationsAgentsTransitionRouteGroupsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsTransitionRouteGroupsRequest {
  name: string;
  force?: boolean;
}

export const DeleteProjectsLocationsAgentsTransitionRouteGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/transitionRouteGroups/{transitionRouteGroupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsTransitionRouteGroupsRequest>;

export type DeleteProjectsLocationsAgentsTransitionRouteGroupsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsTransitionRouteGroupsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsTransitionRouteGroupsError = CommonErrors;

export const deleteProjectsLocationsAgentsTransitionRouteGroups: API.OperationMethod<DeleteProjectsLocationsAgentsTransitionRouteGroupsRequest, DeleteProjectsLocationsAgentsTransitionRouteGroupsResponse, DeleteProjectsLocationsAgentsTransitionRouteGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAgentsTransitionRouteGroupsRequest,
  output: DeleteProjectsLocationsAgentsTransitionRouteGroupsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsTestCasesRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
  view?: "TEST_CASE_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const ListProjectsLocationsAgentsTestCasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsTestCasesRequest>;

export type ListProjectsLocationsAgentsTestCasesResponse = GoogleCloudDialogflowCxV3beta1ListTestCasesResponse;
export const ListProjectsLocationsAgentsTestCasesResponse = GoogleCloudDialogflowCxV3beta1ListTestCasesResponse;

export type ListProjectsLocationsAgentsTestCasesError = CommonErrors;

export const listProjectsLocationsAgentsTestCases: API.PaginatedOperationMethod<ListProjectsLocationsAgentsTestCasesRequest, ListProjectsLocationsAgentsTestCasesResponse, ListProjectsLocationsAgentsTestCasesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsTestCasesRequest,
  output: ListProjectsLocationsAgentsTestCasesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface BatchDeleteProjectsLocationsAgentsTestCasesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1BatchDeleteTestCasesRequest;
}

export const BatchDeleteProjectsLocationsAgentsTestCasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1BatchDeleteTestCasesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases:batchDelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchDeleteProjectsLocationsAgentsTestCasesRequest>;

export type BatchDeleteProjectsLocationsAgentsTestCasesResponse = GoogleProtobufEmpty;
export const BatchDeleteProjectsLocationsAgentsTestCasesResponse = GoogleProtobufEmpty;

export type BatchDeleteProjectsLocationsAgentsTestCasesError = CommonErrors;

export const batchDeleteProjectsLocationsAgentsTestCases: API.OperationMethod<BatchDeleteProjectsLocationsAgentsTestCasesRequest, BatchDeleteProjectsLocationsAgentsTestCasesResponse, BatchDeleteProjectsLocationsAgentsTestCasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchDeleteProjectsLocationsAgentsTestCasesRequest,
  output: BatchDeleteProjectsLocationsAgentsTestCasesResponse,
  errors: [],
}));

export interface GetProjectsLocationsAgentsTestCasesRequest {
  name: string;
}

export const GetProjectsLocationsAgentsTestCasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases/{testCasesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsTestCasesRequest>;

export type GetProjectsLocationsAgentsTestCasesResponse = GoogleCloudDialogflowCxV3beta1TestCase;
export const GetProjectsLocationsAgentsTestCasesResponse = GoogleCloudDialogflowCxV3beta1TestCase;

export type GetProjectsLocationsAgentsTestCasesError = CommonErrors;

export const getProjectsLocationsAgentsTestCases: API.OperationMethod<GetProjectsLocationsAgentsTestCasesRequest, GetProjectsLocationsAgentsTestCasesResponse, GetProjectsLocationsAgentsTestCasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsTestCasesRequest,
  output: GetProjectsLocationsAgentsTestCasesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsTestCasesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1TestCase;
}

export const CreateProjectsLocationsAgentsTestCasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1TestCase).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsTestCasesRequest>;

export type CreateProjectsLocationsAgentsTestCasesResponse = GoogleCloudDialogflowCxV3beta1TestCase;
export const CreateProjectsLocationsAgentsTestCasesResponse = GoogleCloudDialogflowCxV3beta1TestCase;

export type CreateProjectsLocationsAgentsTestCasesError = CommonErrors;

export const createProjectsLocationsAgentsTestCases: API.OperationMethod<CreateProjectsLocationsAgentsTestCasesRequest, CreateProjectsLocationsAgentsTestCasesResponse, CreateProjectsLocationsAgentsTestCasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsTestCasesRequest,
  output: CreateProjectsLocationsAgentsTestCasesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsTestCasesRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1TestCase;
}

export const PatchProjectsLocationsAgentsTestCasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1TestCase).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases/{testCasesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsTestCasesRequest>;

export type PatchProjectsLocationsAgentsTestCasesResponse = GoogleCloudDialogflowCxV3beta1TestCase;
export const PatchProjectsLocationsAgentsTestCasesResponse = GoogleCloudDialogflowCxV3beta1TestCase;

export type PatchProjectsLocationsAgentsTestCasesError = CommonErrors;

export const patchProjectsLocationsAgentsTestCases: API.OperationMethod<PatchProjectsLocationsAgentsTestCasesRequest, PatchProjectsLocationsAgentsTestCasesResponse, PatchProjectsLocationsAgentsTestCasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsTestCasesRequest,
  output: PatchProjectsLocationsAgentsTestCasesResponse,
  errors: [],
}));

export interface RunProjectsLocationsAgentsTestCasesRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1RunTestCaseRequest;
}

export const RunProjectsLocationsAgentsTestCasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1RunTestCaseRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases/{testCasesId}:run", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RunProjectsLocationsAgentsTestCasesRequest>;

export type RunProjectsLocationsAgentsTestCasesResponse = GoogleLongrunningOperation;
export const RunProjectsLocationsAgentsTestCasesResponse = GoogleLongrunningOperation;

export type RunProjectsLocationsAgentsTestCasesError = CommonErrors;

export const runProjectsLocationsAgentsTestCases: API.OperationMethod<RunProjectsLocationsAgentsTestCasesRequest, RunProjectsLocationsAgentsTestCasesResponse, RunProjectsLocationsAgentsTestCasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RunProjectsLocationsAgentsTestCasesRequest,
  output: RunProjectsLocationsAgentsTestCasesResponse,
  errors: [],
}));

export interface BatchRunProjectsLocationsAgentsTestCasesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1BatchRunTestCasesRequest;
}

export const BatchRunProjectsLocationsAgentsTestCasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1BatchRunTestCasesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases:batchRun", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchRunProjectsLocationsAgentsTestCasesRequest>;

export type BatchRunProjectsLocationsAgentsTestCasesResponse = GoogleLongrunningOperation;
export const BatchRunProjectsLocationsAgentsTestCasesResponse = GoogleLongrunningOperation;

export type BatchRunProjectsLocationsAgentsTestCasesError = CommonErrors;

export const batchRunProjectsLocationsAgentsTestCases: API.OperationMethod<BatchRunProjectsLocationsAgentsTestCasesRequest, BatchRunProjectsLocationsAgentsTestCasesResponse, BatchRunProjectsLocationsAgentsTestCasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchRunProjectsLocationsAgentsTestCasesRequest,
  output: BatchRunProjectsLocationsAgentsTestCasesResponse,
  errors: [],
}));

export interface CalculateCoverageProjectsLocationsAgentsTestCasesRequest {
  agent: string;
  type?: "COVERAGE_TYPE_UNSPECIFIED" | "INTENT" | "PAGE_TRANSITION" | "TRANSITION_ROUTE_GROUP" | (string & {});
}

export const CalculateCoverageProjectsLocationsAgentsTestCasesRequest = Schema.Struct({
  agent: Schema.String.pipe(T.HttpPath("agent")),
  type: Schema.optional(Schema.String).pipe(T.HttpQuery("type")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases:calculateCoverage" }),
  svc,
) as unknown as Schema.Schema<CalculateCoverageProjectsLocationsAgentsTestCasesRequest>;

export type CalculateCoverageProjectsLocationsAgentsTestCasesResponse = GoogleCloudDialogflowCxV3beta1CalculateCoverageResponse;
export const CalculateCoverageProjectsLocationsAgentsTestCasesResponse = GoogleCloudDialogflowCxV3beta1CalculateCoverageResponse;

export type CalculateCoverageProjectsLocationsAgentsTestCasesError = CommonErrors;

export const calculateCoverageProjectsLocationsAgentsTestCases: API.OperationMethod<CalculateCoverageProjectsLocationsAgentsTestCasesRequest, CalculateCoverageProjectsLocationsAgentsTestCasesResponse, CalculateCoverageProjectsLocationsAgentsTestCasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CalculateCoverageProjectsLocationsAgentsTestCasesRequest,
  output: CalculateCoverageProjectsLocationsAgentsTestCasesResponse,
  errors: [],
}));

export interface ImportProjectsLocationsAgentsTestCasesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1ImportTestCasesRequest;
}

export const ImportProjectsLocationsAgentsTestCasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1ImportTestCasesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases:import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportProjectsLocationsAgentsTestCasesRequest>;

export type ImportProjectsLocationsAgentsTestCasesResponse = GoogleLongrunningOperation;
export const ImportProjectsLocationsAgentsTestCasesResponse = GoogleLongrunningOperation;

export type ImportProjectsLocationsAgentsTestCasesError = CommonErrors;

export const importProjectsLocationsAgentsTestCases: API.OperationMethod<ImportProjectsLocationsAgentsTestCasesRequest, ImportProjectsLocationsAgentsTestCasesResponse, ImportProjectsLocationsAgentsTestCasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportProjectsLocationsAgentsTestCasesRequest,
  output: ImportProjectsLocationsAgentsTestCasesResponse,
  errors: [],
}));

export interface ExportProjectsLocationsAgentsTestCasesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1ExportTestCasesRequest;
}

export const ExportProjectsLocationsAgentsTestCasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1ExportTestCasesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases:export", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExportProjectsLocationsAgentsTestCasesRequest>;

export type ExportProjectsLocationsAgentsTestCasesResponse = GoogleLongrunningOperation;
export const ExportProjectsLocationsAgentsTestCasesResponse = GoogleLongrunningOperation;

export type ExportProjectsLocationsAgentsTestCasesError = CommonErrors;

export const exportProjectsLocationsAgentsTestCases: API.OperationMethod<ExportProjectsLocationsAgentsTestCasesRequest, ExportProjectsLocationsAgentsTestCasesResponse, ExportProjectsLocationsAgentsTestCasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExportProjectsLocationsAgentsTestCasesRequest,
  output: ExportProjectsLocationsAgentsTestCasesResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsTestCasesResultsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
  filter?: string;
}

export const ListProjectsLocationsAgentsTestCasesResultsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases/{testCasesId}/results" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsTestCasesResultsRequest>;

export type ListProjectsLocationsAgentsTestCasesResultsResponse = GoogleCloudDialogflowCxV3beta1ListTestCaseResultsResponse;
export const ListProjectsLocationsAgentsTestCasesResultsResponse = GoogleCloudDialogflowCxV3beta1ListTestCaseResultsResponse;

export type ListProjectsLocationsAgentsTestCasesResultsError = CommonErrors;

export const listProjectsLocationsAgentsTestCasesResults: API.PaginatedOperationMethod<ListProjectsLocationsAgentsTestCasesResultsRequest, ListProjectsLocationsAgentsTestCasesResultsResponse, ListProjectsLocationsAgentsTestCasesResultsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsTestCasesResultsRequest,
  output: ListProjectsLocationsAgentsTestCasesResultsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentsTestCasesResultsRequest {
  name: string;
}

export const GetProjectsLocationsAgentsTestCasesResultsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases/{testCasesId}/results/{resultsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsTestCasesResultsRequest>;

export type GetProjectsLocationsAgentsTestCasesResultsResponse = GoogleCloudDialogflowCxV3beta1TestCaseResult;
export const GetProjectsLocationsAgentsTestCasesResultsResponse = GoogleCloudDialogflowCxV3beta1TestCaseResult;

export type GetProjectsLocationsAgentsTestCasesResultsError = CommonErrors;

export const getProjectsLocationsAgentsTestCasesResults: API.OperationMethod<GetProjectsLocationsAgentsTestCasesResultsRequest, GetProjectsLocationsAgentsTestCasesResultsResponse, GetProjectsLocationsAgentsTestCasesResultsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsTestCasesResultsRequest,
  output: GetProjectsLocationsAgentsTestCasesResultsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsWebhooksRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsWebhooksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/webhooks" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsWebhooksRequest>;

export type ListProjectsLocationsAgentsWebhooksResponse = GoogleCloudDialogflowCxV3beta1ListWebhooksResponse;
export const ListProjectsLocationsAgentsWebhooksResponse = GoogleCloudDialogflowCxV3beta1ListWebhooksResponse;

export type ListProjectsLocationsAgentsWebhooksError = CommonErrors;

export const listProjectsLocationsAgentsWebhooks: API.PaginatedOperationMethod<ListProjectsLocationsAgentsWebhooksRequest, ListProjectsLocationsAgentsWebhooksResponse, ListProjectsLocationsAgentsWebhooksError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsWebhooksRequest,
  output: ListProjectsLocationsAgentsWebhooksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentsWebhooksRequest {
  name: string;
}

export const GetProjectsLocationsAgentsWebhooksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/webhooks/{webhooksId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsWebhooksRequest>;

export type GetProjectsLocationsAgentsWebhooksResponse = GoogleCloudDialogflowCxV3beta1Webhook;
export const GetProjectsLocationsAgentsWebhooksResponse = GoogleCloudDialogflowCxV3beta1Webhook;

export type GetProjectsLocationsAgentsWebhooksError = CommonErrors;

export const getProjectsLocationsAgentsWebhooks: API.OperationMethod<GetProjectsLocationsAgentsWebhooksRequest, GetProjectsLocationsAgentsWebhooksResponse, GetProjectsLocationsAgentsWebhooksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsWebhooksRequest,
  output: GetProjectsLocationsAgentsWebhooksResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsWebhooksRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1Webhook;
}

export const CreateProjectsLocationsAgentsWebhooksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1Webhook).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/webhooks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsWebhooksRequest>;

export type CreateProjectsLocationsAgentsWebhooksResponse = GoogleCloudDialogflowCxV3beta1Webhook;
export const CreateProjectsLocationsAgentsWebhooksResponse = GoogleCloudDialogflowCxV3beta1Webhook;

export type CreateProjectsLocationsAgentsWebhooksError = CommonErrors;

export const createProjectsLocationsAgentsWebhooks: API.OperationMethod<CreateProjectsLocationsAgentsWebhooksRequest, CreateProjectsLocationsAgentsWebhooksResponse, CreateProjectsLocationsAgentsWebhooksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsWebhooksRequest,
  output: CreateProjectsLocationsAgentsWebhooksResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsWebhooksRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1Webhook;
}

export const PatchProjectsLocationsAgentsWebhooksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1Webhook).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/webhooks/{webhooksId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsWebhooksRequest>;

export type PatchProjectsLocationsAgentsWebhooksResponse = GoogleCloudDialogflowCxV3beta1Webhook;
export const PatchProjectsLocationsAgentsWebhooksResponse = GoogleCloudDialogflowCxV3beta1Webhook;

export type PatchProjectsLocationsAgentsWebhooksError = CommonErrors;

export const patchProjectsLocationsAgentsWebhooks: API.OperationMethod<PatchProjectsLocationsAgentsWebhooksRequest, PatchProjectsLocationsAgentsWebhooksResponse, PatchProjectsLocationsAgentsWebhooksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsWebhooksRequest,
  output: PatchProjectsLocationsAgentsWebhooksResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsWebhooksRequest {
  name: string;
  force?: boolean;
}

export const DeleteProjectsLocationsAgentsWebhooksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/webhooks/{webhooksId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsWebhooksRequest>;

export type DeleteProjectsLocationsAgentsWebhooksResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsWebhooksResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsWebhooksError = CommonErrors;

export const deleteProjectsLocationsAgentsWebhooks: API.OperationMethod<DeleteProjectsLocationsAgentsWebhooksRequest, DeleteProjectsLocationsAgentsWebhooksResponse, DeleteProjectsLocationsAgentsWebhooksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAgentsWebhooksRequest,
  output: DeleteProjectsLocationsAgentsWebhooksResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsEnvironmentsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsEnvironmentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsEnvironmentsRequest>;

export type ListProjectsLocationsAgentsEnvironmentsResponse = GoogleCloudDialogflowCxV3beta1ListEnvironmentsResponse;
export const ListProjectsLocationsAgentsEnvironmentsResponse = GoogleCloudDialogflowCxV3beta1ListEnvironmentsResponse;

export type ListProjectsLocationsAgentsEnvironmentsError = CommonErrors;

export const listProjectsLocationsAgentsEnvironments: API.PaginatedOperationMethod<ListProjectsLocationsAgentsEnvironmentsRequest, ListProjectsLocationsAgentsEnvironmentsResponse, ListProjectsLocationsAgentsEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsEnvironmentsRequest,
  output: ListProjectsLocationsAgentsEnvironmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentsEnvironmentsRequest {
  name: string;
}

export const GetProjectsLocationsAgentsEnvironmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsEnvironmentsRequest>;

export type GetProjectsLocationsAgentsEnvironmentsResponse = GoogleCloudDialogflowCxV3beta1Environment;
export const GetProjectsLocationsAgentsEnvironmentsResponse = GoogleCloudDialogflowCxV3beta1Environment;

export type GetProjectsLocationsAgentsEnvironmentsError = CommonErrors;

export const getProjectsLocationsAgentsEnvironments: API.OperationMethod<GetProjectsLocationsAgentsEnvironmentsRequest, GetProjectsLocationsAgentsEnvironmentsResponse, GetProjectsLocationsAgentsEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsEnvironmentsRequest,
  output: GetProjectsLocationsAgentsEnvironmentsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsEnvironmentsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1Environment;
}

export const CreateProjectsLocationsAgentsEnvironmentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1Environment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsEnvironmentsRequest>;

export type CreateProjectsLocationsAgentsEnvironmentsResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsAgentsEnvironmentsResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsAgentsEnvironmentsError = CommonErrors;

export const createProjectsLocationsAgentsEnvironments: API.OperationMethod<CreateProjectsLocationsAgentsEnvironmentsRequest, CreateProjectsLocationsAgentsEnvironmentsResponse, CreateProjectsLocationsAgentsEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsEnvironmentsRequest,
  output: CreateProjectsLocationsAgentsEnvironmentsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsEnvironmentsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1Environment;
}

export const PatchProjectsLocationsAgentsEnvironmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1Environment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsEnvironmentsRequest>;

export type PatchProjectsLocationsAgentsEnvironmentsResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsAgentsEnvironmentsResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsAgentsEnvironmentsError = CommonErrors;

export const patchProjectsLocationsAgentsEnvironments: API.OperationMethod<PatchProjectsLocationsAgentsEnvironmentsRequest, PatchProjectsLocationsAgentsEnvironmentsResponse, PatchProjectsLocationsAgentsEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsEnvironmentsRequest,
  output: PatchProjectsLocationsAgentsEnvironmentsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsEnvironmentsRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentsEnvironmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsEnvironmentsRequest>;

export type DeleteProjectsLocationsAgentsEnvironmentsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsEnvironmentsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsEnvironmentsError = CommonErrors;

export const deleteProjectsLocationsAgentsEnvironments: API.OperationMethod<DeleteProjectsLocationsAgentsEnvironmentsRequest, DeleteProjectsLocationsAgentsEnvironmentsResponse, DeleteProjectsLocationsAgentsEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAgentsEnvironmentsRequest,
  output: DeleteProjectsLocationsAgentsEnvironmentsResponse,
  errors: [],
}));

export interface LookupEnvironmentHistoryProjectsLocationsAgentsEnvironmentsRequest {
  name: string;
  pageSize?: number;
  pageToken?: string;
}

export const LookupEnvironmentHistoryProjectsLocationsAgentsEnvironmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}:lookupEnvironmentHistory" }),
  svc,
) as unknown as Schema.Schema<LookupEnvironmentHistoryProjectsLocationsAgentsEnvironmentsRequest>;

export type LookupEnvironmentHistoryProjectsLocationsAgentsEnvironmentsResponse = GoogleCloudDialogflowCxV3beta1LookupEnvironmentHistoryResponse;
export const LookupEnvironmentHistoryProjectsLocationsAgentsEnvironmentsResponse = GoogleCloudDialogflowCxV3beta1LookupEnvironmentHistoryResponse;

export type LookupEnvironmentHistoryProjectsLocationsAgentsEnvironmentsError = CommonErrors;

export const lookupEnvironmentHistoryProjectsLocationsAgentsEnvironments: API.PaginatedOperationMethod<LookupEnvironmentHistoryProjectsLocationsAgentsEnvironmentsRequest, LookupEnvironmentHistoryProjectsLocationsAgentsEnvironmentsResponse, LookupEnvironmentHistoryProjectsLocationsAgentsEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: LookupEnvironmentHistoryProjectsLocationsAgentsEnvironmentsRequest,
  output: LookupEnvironmentHistoryProjectsLocationsAgentsEnvironmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface RunContinuousTestProjectsLocationsAgentsEnvironmentsRequest {
  environment: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1RunContinuousTestRequest;
}

export const RunContinuousTestProjectsLocationsAgentsEnvironmentsRequest = Schema.Struct({
  environment: Schema.String.pipe(T.HttpPath("environment")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1RunContinuousTestRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}:runContinuousTest", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RunContinuousTestProjectsLocationsAgentsEnvironmentsRequest>;

export type RunContinuousTestProjectsLocationsAgentsEnvironmentsResponse = GoogleLongrunningOperation;
export const RunContinuousTestProjectsLocationsAgentsEnvironmentsResponse = GoogleLongrunningOperation;

export type RunContinuousTestProjectsLocationsAgentsEnvironmentsError = CommonErrors;

export const runContinuousTestProjectsLocationsAgentsEnvironments: API.OperationMethod<RunContinuousTestProjectsLocationsAgentsEnvironmentsRequest, RunContinuousTestProjectsLocationsAgentsEnvironmentsResponse, RunContinuousTestProjectsLocationsAgentsEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RunContinuousTestProjectsLocationsAgentsEnvironmentsRequest,
  output: RunContinuousTestProjectsLocationsAgentsEnvironmentsResponse,
  errors: [],
}));

export interface DeployFlowProjectsLocationsAgentsEnvironmentsRequest {
  environment: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1DeployFlowRequest;
}

export const DeployFlowProjectsLocationsAgentsEnvironmentsRequest = Schema.Struct({
  environment: Schema.String.pipe(T.HttpPath("environment")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1DeployFlowRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}:deployFlow", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeployFlowProjectsLocationsAgentsEnvironmentsRequest>;

export type DeployFlowProjectsLocationsAgentsEnvironmentsResponse = GoogleLongrunningOperation;
export const DeployFlowProjectsLocationsAgentsEnvironmentsResponse = GoogleLongrunningOperation;

export type DeployFlowProjectsLocationsAgentsEnvironmentsError = CommonErrors;

export const deployFlowProjectsLocationsAgentsEnvironments: API.OperationMethod<DeployFlowProjectsLocationsAgentsEnvironmentsRequest, DeployFlowProjectsLocationsAgentsEnvironmentsResponse, DeployFlowProjectsLocationsAgentsEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeployFlowProjectsLocationsAgentsEnvironmentsRequest,
  output: DeployFlowProjectsLocationsAgentsEnvironmentsResponse,
  errors: [],
}));

export interface DetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1DetectIntentRequest;
}

export const DetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1DetectIntentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/sessions/{sessionsId}:detectIntent", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest>;

export type DetectIntentProjectsLocationsAgentsEnvironmentsSessionsResponse = GoogleCloudDialogflowCxV3beta1DetectIntentResponse;
export const DetectIntentProjectsLocationsAgentsEnvironmentsSessionsResponse = GoogleCloudDialogflowCxV3beta1DetectIntentResponse;

export type DetectIntentProjectsLocationsAgentsEnvironmentsSessionsError = CommonErrors;

export const detectIntentProjectsLocationsAgentsEnvironmentsSessions: API.OperationMethod<DetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest, DetectIntentProjectsLocationsAgentsEnvironmentsSessionsResponse, DetectIntentProjectsLocationsAgentsEnvironmentsSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest,
  output: DetectIntentProjectsLocationsAgentsEnvironmentsSessionsResponse,
  errors: [],
}));

export interface ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1DetectIntentRequest;
}

export const ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1DetectIntentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/sessions/{sessionsId}:serverStreamingDetectIntent", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest>;

export type ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsResponse = GoogleCloudDialogflowCxV3beta1DetectIntentResponse;
export const ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsResponse = GoogleCloudDialogflowCxV3beta1DetectIntentResponse;

export type ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsError = CommonErrors;

export const serverStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessions: API.OperationMethod<ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest, ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsResponse, ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest,
  output: ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsResponse,
  errors: [],
}));

export interface MatchIntentProjectsLocationsAgentsEnvironmentsSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1MatchIntentRequest;
}

export const MatchIntentProjectsLocationsAgentsEnvironmentsSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1MatchIntentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/sessions/{sessionsId}:matchIntent", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MatchIntentProjectsLocationsAgentsEnvironmentsSessionsRequest>;

export type MatchIntentProjectsLocationsAgentsEnvironmentsSessionsResponse = GoogleCloudDialogflowCxV3beta1MatchIntentResponse;
export const MatchIntentProjectsLocationsAgentsEnvironmentsSessionsResponse = GoogleCloudDialogflowCxV3beta1MatchIntentResponse;

export type MatchIntentProjectsLocationsAgentsEnvironmentsSessionsError = CommonErrors;

export const matchIntentProjectsLocationsAgentsEnvironmentsSessions: API.OperationMethod<MatchIntentProjectsLocationsAgentsEnvironmentsSessionsRequest, MatchIntentProjectsLocationsAgentsEnvironmentsSessionsResponse, MatchIntentProjectsLocationsAgentsEnvironmentsSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MatchIntentProjectsLocationsAgentsEnvironmentsSessionsRequest,
  output: MatchIntentProjectsLocationsAgentsEnvironmentsSessionsResponse,
  errors: [],
}));

export interface FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1FulfillIntentRequest;
}

export const FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1FulfillIntentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/sessions/{sessionsId}:fulfillIntent", hasBody: true }),
  svc,
) as unknown as Schema.Schema<FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsRequest>;

export type FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsResponse = GoogleCloudDialogflowCxV3beta1FulfillIntentResponse;
export const FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsResponse = GoogleCloudDialogflowCxV3beta1FulfillIntentResponse;

export type FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsError = CommonErrors;

export const fulfillIntentProjectsLocationsAgentsEnvironmentsSessions: API.OperationMethod<FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsRequest, FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsResponse, FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsRequest,
  output: FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/sessions/{sessionsId}/entityTypes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest>;

export type ListProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3beta1ListSessionEntityTypesResponse;
export const ListProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3beta1ListSessionEntityTypesResponse;

export type ListProjectsLocationsAgentsEnvironmentsSessionsEntityTypesError = CommonErrors;

export const listProjectsLocationsAgentsEnvironmentsSessionsEntityTypes: API.PaginatedOperationMethod<ListProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest, ListProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse, ListProjectsLocationsAgentsEnvironmentsSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest,
  output: ListProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest {
  name: string;
}

export const GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/sessions/{sessionsId}/entityTypes/{entityTypesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest>;

export type GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3beta1SessionEntityType;
export const GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3beta1SessionEntityType;

export type GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesError = CommonErrors;

export const getProjectsLocationsAgentsEnvironmentsSessionsEntityTypes: API.OperationMethod<GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest, GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse, GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest,
  output: GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1SessionEntityType;
}

export const CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1SessionEntityType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/sessions/{sessionsId}/entityTypes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest>;

export type CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3beta1SessionEntityType;
export const CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3beta1SessionEntityType;

export type CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesError = CommonErrors;

export const createProjectsLocationsAgentsEnvironmentsSessionsEntityTypes: API.OperationMethod<CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest, CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse, CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest,
  output: CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1SessionEntityType;
}

export const PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1SessionEntityType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/sessions/{sessionsId}/entityTypes/{entityTypesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest>;

export type PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3beta1SessionEntityType;
export const PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3beta1SessionEntityType;

export type PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesError = CommonErrors;

export const patchProjectsLocationsAgentsEnvironmentsSessionsEntityTypes: API.OperationMethod<PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest, PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse, PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest,
  output: PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/sessions/{sessionsId}/entityTypes/{entityTypesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest>;

export type DeleteProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsEnvironmentsSessionsEntityTypesError = CommonErrors;

export const deleteProjectsLocationsAgentsEnvironmentsSessionsEntityTypes: API.OperationMethod<DeleteProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest, DeleteProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse, DeleteProjectsLocationsAgentsEnvironmentsSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest,
  output: DeleteProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsEnvironmentsContinuousTestResultsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsEnvironmentsContinuousTestResultsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/continuousTestResults" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsEnvironmentsContinuousTestResultsRequest>;

export type ListProjectsLocationsAgentsEnvironmentsContinuousTestResultsResponse = GoogleCloudDialogflowCxV3beta1ListContinuousTestResultsResponse;
export const ListProjectsLocationsAgentsEnvironmentsContinuousTestResultsResponse = GoogleCloudDialogflowCxV3beta1ListContinuousTestResultsResponse;

export type ListProjectsLocationsAgentsEnvironmentsContinuousTestResultsError = CommonErrors;

export const listProjectsLocationsAgentsEnvironmentsContinuousTestResults: API.PaginatedOperationMethod<ListProjectsLocationsAgentsEnvironmentsContinuousTestResultsRequest, ListProjectsLocationsAgentsEnvironmentsContinuousTestResultsResponse, ListProjectsLocationsAgentsEnvironmentsContinuousTestResultsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsEnvironmentsContinuousTestResultsRequest,
  output: ListProjectsLocationsAgentsEnvironmentsContinuousTestResultsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListProjectsLocationsAgentsEnvironmentsDeploymentsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsEnvironmentsDeploymentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/deployments" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsEnvironmentsDeploymentsRequest>;

export type ListProjectsLocationsAgentsEnvironmentsDeploymentsResponse = GoogleCloudDialogflowCxV3beta1ListDeploymentsResponse;
export const ListProjectsLocationsAgentsEnvironmentsDeploymentsResponse = GoogleCloudDialogflowCxV3beta1ListDeploymentsResponse;

export type ListProjectsLocationsAgentsEnvironmentsDeploymentsError = CommonErrors;

export const listProjectsLocationsAgentsEnvironmentsDeployments: API.PaginatedOperationMethod<ListProjectsLocationsAgentsEnvironmentsDeploymentsRequest, ListProjectsLocationsAgentsEnvironmentsDeploymentsResponse, ListProjectsLocationsAgentsEnvironmentsDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsEnvironmentsDeploymentsRequest,
  output: ListProjectsLocationsAgentsEnvironmentsDeploymentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentsEnvironmentsDeploymentsRequest {
  name: string;
}

export const GetProjectsLocationsAgentsEnvironmentsDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/deployments/{deploymentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsEnvironmentsDeploymentsRequest>;

export type GetProjectsLocationsAgentsEnvironmentsDeploymentsResponse = GoogleCloudDialogflowCxV3beta1Deployment;
export const GetProjectsLocationsAgentsEnvironmentsDeploymentsResponse = GoogleCloudDialogflowCxV3beta1Deployment;

export type GetProjectsLocationsAgentsEnvironmentsDeploymentsError = CommonErrors;

export const getProjectsLocationsAgentsEnvironmentsDeployments: API.OperationMethod<GetProjectsLocationsAgentsEnvironmentsDeploymentsRequest, GetProjectsLocationsAgentsEnvironmentsDeploymentsResponse, GetProjectsLocationsAgentsEnvironmentsDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsEnvironmentsDeploymentsRequest,
  output: GetProjectsLocationsAgentsEnvironmentsDeploymentsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsEnvironmentsExperimentsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsEnvironmentsExperimentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/experiments" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsEnvironmentsExperimentsRequest>;

export type ListProjectsLocationsAgentsEnvironmentsExperimentsResponse = GoogleCloudDialogflowCxV3beta1ListExperimentsResponse;
export const ListProjectsLocationsAgentsEnvironmentsExperimentsResponse = GoogleCloudDialogflowCxV3beta1ListExperimentsResponse;

export type ListProjectsLocationsAgentsEnvironmentsExperimentsError = CommonErrors;

export const listProjectsLocationsAgentsEnvironmentsExperiments: API.PaginatedOperationMethod<ListProjectsLocationsAgentsEnvironmentsExperimentsRequest, ListProjectsLocationsAgentsEnvironmentsExperimentsResponse, ListProjectsLocationsAgentsEnvironmentsExperimentsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsEnvironmentsExperimentsRequest,
  output: ListProjectsLocationsAgentsEnvironmentsExperimentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentsEnvironmentsExperimentsRequest {
  name: string;
}

export const GetProjectsLocationsAgentsEnvironmentsExperimentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/experiments/{experimentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsEnvironmentsExperimentsRequest>;

export type GetProjectsLocationsAgentsEnvironmentsExperimentsResponse = GoogleCloudDialogflowCxV3beta1Experiment;
export const GetProjectsLocationsAgentsEnvironmentsExperimentsResponse = GoogleCloudDialogflowCxV3beta1Experiment;

export type GetProjectsLocationsAgentsEnvironmentsExperimentsError = CommonErrors;

export const getProjectsLocationsAgentsEnvironmentsExperiments: API.OperationMethod<GetProjectsLocationsAgentsEnvironmentsExperimentsRequest, GetProjectsLocationsAgentsEnvironmentsExperimentsResponse, GetProjectsLocationsAgentsEnvironmentsExperimentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsEnvironmentsExperimentsRequest,
  output: GetProjectsLocationsAgentsEnvironmentsExperimentsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsEnvironmentsExperimentsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1Experiment;
}

export const CreateProjectsLocationsAgentsEnvironmentsExperimentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1Experiment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/experiments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsEnvironmentsExperimentsRequest>;

export type CreateProjectsLocationsAgentsEnvironmentsExperimentsResponse = GoogleCloudDialogflowCxV3beta1Experiment;
export const CreateProjectsLocationsAgentsEnvironmentsExperimentsResponse = GoogleCloudDialogflowCxV3beta1Experiment;

export type CreateProjectsLocationsAgentsEnvironmentsExperimentsError = CommonErrors;

export const createProjectsLocationsAgentsEnvironmentsExperiments: API.OperationMethod<CreateProjectsLocationsAgentsEnvironmentsExperimentsRequest, CreateProjectsLocationsAgentsEnvironmentsExperimentsResponse, CreateProjectsLocationsAgentsEnvironmentsExperimentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsEnvironmentsExperimentsRequest,
  output: CreateProjectsLocationsAgentsEnvironmentsExperimentsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsEnvironmentsExperimentsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1Experiment;
}

export const PatchProjectsLocationsAgentsEnvironmentsExperimentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1Experiment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/experiments/{experimentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsEnvironmentsExperimentsRequest>;

export type PatchProjectsLocationsAgentsEnvironmentsExperimentsResponse = GoogleCloudDialogflowCxV3beta1Experiment;
export const PatchProjectsLocationsAgentsEnvironmentsExperimentsResponse = GoogleCloudDialogflowCxV3beta1Experiment;

export type PatchProjectsLocationsAgentsEnvironmentsExperimentsError = CommonErrors;

export const patchProjectsLocationsAgentsEnvironmentsExperiments: API.OperationMethod<PatchProjectsLocationsAgentsEnvironmentsExperimentsRequest, PatchProjectsLocationsAgentsEnvironmentsExperimentsResponse, PatchProjectsLocationsAgentsEnvironmentsExperimentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsEnvironmentsExperimentsRequest,
  output: PatchProjectsLocationsAgentsEnvironmentsExperimentsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsEnvironmentsExperimentsRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentsEnvironmentsExperimentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/experiments/{experimentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsEnvironmentsExperimentsRequest>;

export type DeleteProjectsLocationsAgentsEnvironmentsExperimentsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsEnvironmentsExperimentsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsEnvironmentsExperimentsError = CommonErrors;

export const deleteProjectsLocationsAgentsEnvironmentsExperiments: API.OperationMethod<DeleteProjectsLocationsAgentsEnvironmentsExperimentsRequest, DeleteProjectsLocationsAgentsEnvironmentsExperimentsResponse, DeleteProjectsLocationsAgentsEnvironmentsExperimentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAgentsEnvironmentsExperimentsRequest,
  output: DeleteProjectsLocationsAgentsEnvironmentsExperimentsResponse,
  errors: [],
}));

export interface StartProjectsLocationsAgentsEnvironmentsExperimentsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1StartExperimentRequest;
}

export const StartProjectsLocationsAgentsEnvironmentsExperimentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1StartExperimentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/experiments/{experimentsId}:start", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StartProjectsLocationsAgentsEnvironmentsExperimentsRequest>;

export type StartProjectsLocationsAgentsEnvironmentsExperimentsResponse = GoogleCloudDialogflowCxV3beta1Experiment;
export const StartProjectsLocationsAgentsEnvironmentsExperimentsResponse = GoogleCloudDialogflowCxV3beta1Experiment;

export type StartProjectsLocationsAgentsEnvironmentsExperimentsError = CommonErrors;

export const startProjectsLocationsAgentsEnvironmentsExperiments: API.OperationMethod<StartProjectsLocationsAgentsEnvironmentsExperimentsRequest, StartProjectsLocationsAgentsEnvironmentsExperimentsResponse, StartProjectsLocationsAgentsEnvironmentsExperimentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StartProjectsLocationsAgentsEnvironmentsExperimentsRequest,
  output: StartProjectsLocationsAgentsEnvironmentsExperimentsResponse,
  errors: [],
}));

export interface StopProjectsLocationsAgentsEnvironmentsExperimentsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1StopExperimentRequest;
}

export const StopProjectsLocationsAgentsEnvironmentsExperimentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1StopExperimentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/experiments/{experimentsId}:stop", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StopProjectsLocationsAgentsEnvironmentsExperimentsRequest>;

export type StopProjectsLocationsAgentsEnvironmentsExperimentsResponse = GoogleCloudDialogflowCxV3beta1Experiment;
export const StopProjectsLocationsAgentsEnvironmentsExperimentsResponse = GoogleCloudDialogflowCxV3beta1Experiment;

export type StopProjectsLocationsAgentsEnvironmentsExperimentsError = CommonErrors;

export const stopProjectsLocationsAgentsEnvironmentsExperiments: API.OperationMethod<StopProjectsLocationsAgentsEnvironmentsExperimentsRequest, StopProjectsLocationsAgentsEnvironmentsExperimentsResponse, StopProjectsLocationsAgentsEnvironmentsExperimentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StopProjectsLocationsAgentsEnvironmentsExperimentsRequest,
  output: StopProjectsLocationsAgentsEnvironmentsExperimentsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsConversationsRequest {
  parent: string;
  filter?: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsConversationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/conversations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsConversationsRequest>;

export type ListProjectsLocationsAgentsConversationsResponse = GoogleCloudDialogflowCxV3beta1ListConversationsResponse;
export const ListProjectsLocationsAgentsConversationsResponse = GoogleCloudDialogflowCxV3beta1ListConversationsResponse;

export type ListProjectsLocationsAgentsConversationsError = CommonErrors;

export const listProjectsLocationsAgentsConversations: API.PaginatedOperationMethod<ListProjectsLocationsAgentsConversationsRequest, ListProjectsLocationsAgentsConversationsResponse, ListProjectsLocationsAgentsConversationsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsConversationsRequest,
  output: ListProjectsLocationsAgentsConversationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentsConversationsRequest {
  name: string;
}

export const GetProjectsLocationsAgentsConversationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/conversations/{conversationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsConversationsRequest>;

export type GetProjectsLocationsAgentsConversationsResponse = GoogleCloudDialogflowCxV3beta1Conversation;
export const GetProjectsLocationsAgentsConversationsResponse = GoogleCloudDialogflowCxV3beta1Conversation;

export type GetProjectsLocationsAgentsConversationsError = CommonErrors;

export const getProjectsLocationsAgentsConversations: API.OperationMethod<GetProjectsLocationsAgentsConversationsRequest, GetProjectsLocationsAgentsConversationsResponse, GetProjectsLocationsAgentsConversationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsConversationsRequest,
  output: GetProjectsLocationsAgentsConversationsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsConversationsRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentsConversationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/conversations/{conversationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsConversationsRequest>;

export type DeleteProjectsLocationsAgentsConversationsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsConversationsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsConversationsError = CommonErrors;

export const deleteProjectsLocationsAgentsConversations: API.OperationMethod<DeleteProjectsLocationsAgentsConversationsRequest, DeleteProjectsLocationsAgentsConversationsResponse, DeleteProjectsLocationsAgentsConversationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAgentsConversationsRequest,
  output: DeleteProjectsLocationsAgentsConversationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsGeneratorsRequest {
  parent: string;
  languageCode?: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsGeneratorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/generators" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsGeneratorsRequest>;

export type ListProjectsLocationsAgentsGeneratorsResponse = GoogleCloudDialogflowCxV3beta1ListGeneratorsResponse;
export const ListProjectsLocationsAgentsGeneratorsResponse = GoogleCloudDialogflowCxV3beta1ListGeneratorsResponse;

export type ListProjectsLocationsAgentsGeneratorsError = CommonErrors;

export const listProjectsLocationsAgentsGenerators: API.PaginatedOperationMethod<ListProjectsLocationsAgentsGeneratorsRequest, ListProjectsLocationsAgentsGeneratorsResponse, ListProjectsLocationsAgentsGeneratorsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsGeneratorsRequest,
  output: ListProjectsLocationsAgentsGeneratorsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentsGeneratorsRequest {
  name: string;
  languageCode?: string;
}

export const GetProjectsLocationsAgentsGeneratorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/generators/{generatorsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsGeneratorsRequest>;

export type GetProjectsLocationsAgentsGeneratorsResponse = GoogleCloudDialogflowCxV3beta1Generator;
export const GetProjectsLocationsAgentsGeneratorsResponse = GoogleCloudDialogflowCxV3beta1Generator;

export type GetProjectsLocationsAgentsGeneratorsError = CommonErrors;

export const getProjectsLocationsAgentsGenerators: API.OperationMethod<GetProjectsLocationsAgentsGeneratorsRequest, GetProjectsLocationsAgentsGeneratorsResponse, GetProjectsLocationsAgentsGeneratorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsGeneratorsRequest,
  output: GetProjectsLocationsAgentsGeneratorsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsGeneratorsRequest {
  parent: string;
  languageCode?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1Generator;
}

export const CreateProjectsLocationsAgentsGeneratorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1Generator).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/generators", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsGeneratorsRequest>;

export type CreateProjectsLocationsAgentsGeneratorsResponse = GoogleCloudDialogflowCxV3beta1Generator;
export const CreateProjectsLocationsAgentsGeneratorsResponse = GoogleCloudDialogflowCxV3beta1Generator;

export type CreateProjectsLocationsAgentsGeneratorsError = CommonErrors;

export const createProjectsLocationsAgentsGenerators: API.OperationMethod<CreateProjectsLocationsAgentsGeneratorsRequest, CreateProjectsLocationsAgentsGeneratorsResponse, CreateProjectsLocationsAgentsGeneratorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsGeneratorsRequest,
  output: CreateProjectsLocationsAgentsGeneratorsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsGeneratorsRequest {
  name: string;
  languageCode?: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1Generator;
}

export const PatchProjectsLocationsAgentsGeneratorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1Generator).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/generators/{generatorsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsGeneratorsRequest>;

export type PatchProjectsLocationsAgentsGeneratorsResponse = GoogleCloudDialogflowCxV3beta1Generator;
export const PatchProjectsLocationsAgentsGeneratorsResponse = GoogleCloudDialogflowCxV3beta1Generator;

export type PatchProjectsLocationsAgentsGeneratorsError = CommonErrors;

export const patchProjectsLocationsAgentsGenerators: API.OperationMethod<PatchProjectsLocationsAgentsGeneratorsRequest, PatchProjectsLocationsAgentsGeneratorsResponse, PatchProjectsLocationsAgentsGeneratorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsGeneratorsRequest,
  output: PatchProjectsLocationsAgentsGeneratorsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsGeneratorsRequest {
  name: string;
  force?: boolean;
}

export const DeleteProjectsLocationsAgentsGeneratorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/generators/{generatorsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsGeneratorsRequest>;

export type DeleteProjectsLocationsAgentsGeneratorsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsGeneratorsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsGeneratorsError = CommonErrors;

export const deleteProjectsLocationsAgentsGenerators: API.OperationMethod<DeleteProjectsLocationsAgentsGeneratorsRequest, DeleteProjectsLocationsAgentsGeneratorsResponse, DeleteProjectsLocationsAgentsGeneratorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAgentsGeneratorsRequest,
  output: DeleteProjectsLocationsAgentsGeneratorsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsPlaybooksRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1Playbook;
}

export const CreateProjectsLocationsAgentsPlaybooksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1Playbook).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsPlaybooksRequest>;

export type CreateProjectsLocationsAgentsPlaybooksResponse = GoogleCloudDialogflowCxV3beta1Playbook;
export const CreateProjectsLocationsAgentsPlaybooksResponse = GoogleCloudDialogflowCxV3beta1Playbook;

export type CreateProjectsLocationsAgentsPlaybooksError = CommonErrors;

export const createProjectsLocationsAgentsPlaybooks: API.OperationMethod<CreateProjectsLocationsAgentsPlaybooksRequest, CreateProjectsLocationsAgentsPlaybooksResponse, CreateProjectsLocationsAgentsPlaybooksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsPlaybooksRequest,
  output: CreateProjectsLocationsAgentsPlaybooksResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsPlaybooksRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentsPlaybooksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsPlaybooksRequest>;

export type DeleteProjectsLocationsAgentsPlaybooksResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsPlaybooksResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsPlaybooksError = CommonErrors;

export const deleteProjectsLocationsAgentsPlaybooks: API.OperationMethod<DeleteProjectsLocationsAgentsPlaybooksRequest, DeleteProjectsLocationsAgentsPlaybooksResponse, DeleteProjectsLocationsAgentsPlaybooksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAgentsPlaybooksRequest,
  output: DeleteProjectsLocationsAgentsPlaybooksResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsPlaybooksRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsPlaybooksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsPlaybooksRequest>;

export type ListProjectsLocationsAgentsPlaybooksResponse = GoogleCloudDialogflowCxV3beta1ListPlaybooksResponse;
export const ListProjectsLocationsAgentsPlaybooksResponse = GoogleCloudDialogflowCxV3beta1ListPlaybooksResponse;

export type ListProjectsLocationsAgentsPlaybooksError = CommonErrors;

export const listProjectsLocationsAgentsPlaybooks: API.PaginatedOperationMethod<ListProjectsLocationsAgentsPlaybooksRequest, ListProjectsLocationsAgentsPlaybooksResponse, ListProjectsLocationsAgentsPlaybooksError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsPlaybooksRequest,
  output: ListProjectsLocationsAgentsPlaybooksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentsPlaybooksRequest {
  name: string;
}

export const GetProjectsLocationsAgentsPlaybooksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsPlaybooksRequest>;

export type GetProjectsLocationsAgentsPlaybooksResponse = GoogleCloudDialogflowCxV3beta1Playbook;
export const GetProjectsLocationsAgentsPlaybooksResponse = GoogleCloudDialogflowCxV3beta1Playbook;

export type GetProjectsLocationsAgentsPlaybooksError = CommonErrors;

export const getProjectsLocationsAgentsPlaybooks: API.OperationMethod<GetProjectsLocationsAgentsPlaybooksRequest, GetProjectsLocationsAgentsPlaybooksResponse, GetProjectsLocationsAgentsPlaybooksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsPlaybooksRequest,
  output: GetProjectsLocationsAgentsPlaybooksResponse,
  errors: [],
}));

export interface ExportProjectsLocationsAgentsPlaybooksRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1ExportPlaybookRequest;
}

export const ExportProjectsLocationsAgentsPlaybooksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1ExportPlaybookRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}:export", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExportProjectsLocationsAgentsPlaybooksRequest>;

export type ExportProjectsLocationsAgentsPlaybooksResponse = GoogleLongrunningOperation;
export const ExportProjectsLocationsAgentsPlaybooksResponse = GoogleLongrunningOperation;

export type ExportProjectsLocationsAgentsPlaybooksError = CommonErrors;

export const exportProjectsLocationsAgentsPlaybooks: API.OperationMethod<ExportProjectsLocationsAgentsPlaybooksRequest, ExportProjectsLocationsAgentsPlaybooksResponse, ExportProjectsLocationsAgentsPlaybooksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExportProjectsLocationsAgentsPlaybooksRequest,
  output: ExportProjectsLocationsAgentsPlaybooksResponse,
  errors: [],
}));

export interface ImportProjectsLocationsAgentsPlaybooksRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1ImportPlaybookRequest;
}

export const ImportProjectsLocationsAgentsPlaybooksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1ImportPlaybookRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks:import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportProjectsLocationsAgentsPlaybooksRequest>;

export type ImportProjectsLocationsAgentsPlaybooksResponse = GoogleLongrunningOperation;
export const ImportProjectsLocationsAgentsPlaybooksResponse = GoogleLongrunningOperation;

export type ImportProjectsLocationsAgentsPlaybooksError = CommonErrors;

export const importProjectsLocationsAgentsPlaybooks: API.OperationMethod<ImportProjectsLocationsAgentsPlaybooksRequest, ImportProjectsLocationsAgentsPlaybooksResponse, ImportProjectsLocationsAgentsPlaybooksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportProjectsLocationsAgentsPlaybooksRequest,
  output: ImportProjectsLocationsAgentsPlaybooksResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsPlaybooksRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1Playbook;
}

export const PatchProjectsLocationsAgentsPlaybooksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1Playbook).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsPlaybooksRequest>;

export type PatchProjectsLocationsAgentsPlaybooksResponse = GoogleCloudDialogflowCxV3beta1Playbook;
export const PatchProjectsLocationsAgentsPlaybooksResponse = GoogleCloudDialogflowCxV3beta1Playbook;

export type PatchProjectsLocationsAgentsPlaybooksError = CommonErrors;

export const patchProjectsLocationsAgentsPlaybooks: API.OperationMethod<PatchProjectsLocationsAgentsPlaybooksRequest, PatchProjectsLocationsAgentsPlaybooksResponse, PatchProjectsLocationsAgentsPlaybooksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsPlaybooksRequest,
  output: PatchProjectsLocationsAgentsPlaybooksResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsPlaybooksExamplesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1Example;
}

export const CreateProjectsLocationsAgentsPlaybooksExamplesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1Example).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/examples", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsPlaybooksExamplesRequest>;

export type CreateProjectsLocationsAgentsPlaybooksExamplesResponse = GoogleCloudDialogflowCxV3beta1Example;
export const CreateProjectsLocationsAgentsPlaybooksExamplesResponse = GoogleCloudDialogflowCxV3beta1Example;

export type CreateProjectsLocationsAgentsPlaybooksExamplesError = CommonErrors;

export const createProjectsLocationsAgentsPlaybooksExamples: API.OperationMethod<CreateProjectsLocationsAgentsPlaybooksExamplesRequest, CreateProjectsLocationsAgentsPlaybooksExamplesResponse, CreateProjectsLocationsAgentsPlaybooksExamplesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsPlaybooksExamplesRequest,
  output: CreateProjectsLocationsAgentsPlaybooksExamplesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsPlaybooksExamplesRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentsPlaybooksExamplesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/examples/{examplesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsPlaybooksExamplesRequest>;

export type DeleteProjectsLocationsAgentsPlaybooksExamplesResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsPlaybooksExamplesResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsPlaybooksExamplesError = CommonErrors;

export const deleteProjectsLocationsAgentsPlaybooksExamples: API.OperationMethod<DeleteProjectsLocationsAgentsPlaybooksExamplesRequest, DeleteProjectsLocationsAgentsPlaybooksExamplesResponse, DeleteProjectsLocationsAgentsPlaybooksExamplesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAgentsPlaybooksExamplesRequest,
  output: DeleteProjectsLocationsAgentsPlaybooksExamplesResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsPlaybooksExamplesRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
  languageCode?: string;
}

export const ListProjectsLocationsAgentsPlaybooksExamplesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/examples" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsPlaybooksExamplesRequest>;

export type ListProjectsLocationsAgentsPlaybooksExamplesResponse = GoogleCloudDialogflowCxV3beta1ListExamplesResponse;
export const ListProjectsLocationsAgentsPlaybooksExamplesResponse = GoogleCloudDialogflowCxV3beta1ListExamplesResponse;

export type ListProjectsLocationsAgentsPlaybooksExamplesError = CommonErrors;

export const listProjectsLocationsAgentsPlaybooksExamples: API.PaginatedOperationMethod<ListProjectsLocationsAgentsPlaybooksExamplesRequest, ListProjectsLocationsAgentsPlaybooksExamplesResponse, ListProjectsLocationsAgentsPlaybooksExamplesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsPlaybooksExamplesRequest,
  output: ListProjectsLocationsAgentsPlaybooksExamplesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentsPlaybooksExamplesRequest {
  name: string;
}

export const GetProjectsLocationsAgentsPlaybooksExamplesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/examples/{examplesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsPlaybooksExamplesRequest>;

export type GetProjectsLocationsAgentsPlaybooksExamplesResponse = GoogleCloudDialogflowCxV3beta1Example;
export const GetProjectsLocationsAgentsPlaybooksExamplesResponse = GoogleCloudDialogflowCxV3beta1Example;

export type GetProjectsLocationsAgentsPlaybooksExamplesError = CommonErrors;

export const getProjectsLocationsAgentsPlaybooksExamples: API.OperationMethod<GetProjectsLocationsAgentsPlaybooksExamplesRequest, GetProjectsLocationsAgentsPlaybooksExamplesResponse, GetProjectsLocationsAgentsPlaybooksExamplesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsPlaybooksExamplesRequest,
  output: GetProjectsLocationsAgentsPlaybooksExamplesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsPlaybooksExamplesRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1Example;
}

export const PatchProjectsLocationsAgentsPlaybooksExamplesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1Example).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/examples/{examplesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsPlaybooksExamplesRequest>;

export type PatchProjectsLocationsAgentsPlaybooksExamplesResponse = GoogleCloudDialogflowCxV3beta1Example;
export const PatchProjectsLocationsAgentsPlaybooksExamplesResponse = GoogleCloudDialogflowCxV3beta1Example;

export type PatchProjectsLocationsAgentsPlaybooksExamplesError = CommonErrors;

export const patchProjectsLocationsAgentsPlaybooksExamples: API.OperationMethod<PatchProjectsLocationsAgentsPlaybooksExamplesRequest, PatchProjectsLocationsAgentsPlaybooksExamplesResponse, PatchProjectsLocationsAgentsPlaybooksExamplesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsPlaybooksExamplesRequest,
  output: PatchProjectsLocationsAgentsPlaybooksExamplesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsPlaybooksVersionsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1PlaybookVersion;
}

export const CreateProjectsLocationsAgentsPlaybooksVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1PlaybookVersion).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/versions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsPlaybooksVersionsRequest>;

export type CreateProjectsLocationsAgentsPlaybooksVersionsResponse = GoogleCloudDialogflowCxV3beta1PlaybookVersion;
export const CreateProjectsLocationsAgentsPlaybooksVersionsResponse = GoogleCloudDialogflowCxV3beta1PlaybookVersion;

export type CreateProjectsLocationsAgentsPlaybooksVersionsError = CommonErrors;

export const createProjectsLocationsAgentsPlaybooksVersions: API.OperationMethod<CreateProjectsLocationsAgentsPlaybooksVersionsRequest, CreateProjectsLocationsAgentsPlaybooksVersionsResponse, CreateProjectsLocationsAgentsPlaybooksVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsPlaybooksVersionsRequest,
  output: CreateProjectsLocationsAgentsPlaybooksVersionsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAgentsPlaybooksVersionsRequest {
  name: string;
}

export const GetProjectsLocationsAgentsPlaybooksVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsPlaybooksVersionsRequest>;

export type GetProjectsLocationsAgentsPlaybooksVersionsResponse = GoogleCloudDialogflowCxV3beta1PlaybookVersion;
export const GetProjectsLocationsAgentsPlaybooksVersionsResponse = GoogleCloudDialogflowCxV3beta1PlaybookVersion;

export type GetProjectsLocationsAgentsPlaybooksVersionsError = CommonErrors;

export const getProjectsLocationsAgentsPlaybooksVersions: API.OperationMethod<GetProjectsLocationsAgentsPlaybooksVersionsRequest, GetProjectsLocationsAgentsPlaybooksVersionsResponse, GetProjectsLocationsAgentsPlaybooksVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsPlaybooksVersionsRequest,
  output: GetProjectsLocationsAgentsPlaybooksVersionsResponse,
  errors: [],
}));

export interface RestoreProjectsLocationsAgentsPlaybooksVersionsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1RestorePlaybookVersionRequest;
}

export const RestoreProjectsLocationsAgentsPlaybooksVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1RestorePlaybookVersionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/versions/{versionsId}:restore", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RestoreProjectsLocationsAgentsPlaybooksVersionsRequest>;

export type RestoreProjectsLocationsAgentsPlaybooksVersionsResponse = GoogleCloudDialogflowCxV3beta1RestorePlaybookVersionResponse;
export const RestoreProjectsLocationsAgentsPlaybooksVersionsResponse = GoogleCloudDialogflowCxV3beta1RestorePlaybookVersionResponse;

export type RestoreProjectsLocationsAgentsPlaybooksVersionsError = CommonErrors;

export const restoreProjectsLocationsAgentsPlaybooksVersions: API.OperationMethod<RestoreProjectsLocationsAgentsPlaybooksVersionsRequest, RestoreProjectsLocationsAgentsPlaybooksVersionsResponse, RestoreProjectsLocationsAgentsPlaybooksVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RestoreProjectsLocationsAgentsPlaybooksVersionsRequest,
  output: RestoreProjectsLocationsAgentsPlaybooksVersionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsPlaybooksVersionsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsPlaybooksVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/versions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsPlaybooksVersionsRequest>;

export type ListProjectsLocationsAgentsPlaybooksVersionsResponse = GoogleCloudDialogflowCxV3beta1ListPlaybookVersionsResponse;
export const ListProjectsLocationsAgentsPlaybooksVersionsResponse = GoogleCloudDialogflowCxV3beta1ListPlaybookVersionsResponse;

export type ListProjectsLocationsAgentsPlaybooksVersionsError = CommonErrors;

export const listProjectsLocationsAgentsPlaybooksVersions: API.PaginatedOperationMethod<ListProjectsLocationsAgentsPlaybooksVersionsRequest, ListProjectsLocationsAgentsPlaybooksVersionsResponse, ListProjectsLocationsAgentsPlaybooksVersionsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsPlaybooksVersionsRequest,
  output: ListProjectsLocationsAgentsPlaybooksVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsAgentsPlaybooksVersionsRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentsPlaybooksVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsPlaybooksVersionsRequest>;

export type DeleteProjectsLocationsAgentsPlaybooksVersionsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsPlaybooksVersionsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsPlaybooksVersionsError = CommonErrors;

export const deleteProjectsLocationsAgentsPlaybooksVersions: API.OperationMethod<DeleteProjectsLocationsAgentsPlaybooksVersionsRequest, DeleteProjectsLocationsAgentsPlaybooksVersionsResponse, DeleteProjectsLocationsAgentsPlaybooksVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAgentsPlaybooksVersionsRequest,
  output: DeleteProjectsLocationsAgentsPlaybooksVersionsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsToolsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1Tool;
}

export const CreateProjectsLocationsAgentsToolsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1Tool).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsToolsRequest>;

export type CreateProjectsLocationsAgentsToolsResponse = GoogleCloudDialogflowCxV3beta1Tool;
export const CreateProjectsLocationsAgentsToolsResponse = GoogleCloudDialogflowCxV3beta1Tool;

export type CreateProjectsLocationsAgentsToolsError = CommonErrors;

export const createProjectsLocationsAgentsTools: API.OperationMethod<CreateProjectsLocationsAgentsToolsRequest, CreateProjectsLocationsAgentsToolsResponse, CreateProjectsLocationsAgentsToolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsToolsRequest,
  output: CreateProjectsLocationsAgentsToolsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsToolsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsToolsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsToolsRequest>;

export type ListProjectsLocationsAgentsToolsResponse = GoogleCloudDialogflowCxV3beta1ListToolsResponse;
export const ListProjectsLocationsAgentsToolsResponse = GoogleCloudDialogflowCxV3beta1ListToolsResponse;

export type ListProjectsLocationsAgentsToolsError = CommonErrors;

export const listProjectsLocationsAgentsTools: API.PaginatedOperationMethod<ListProjectsLocationsAgentsToolsRequest, ListProjectsLocationsAgentsToolsResponse, ListProjectsLocationsAgentsToolsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsToolsRequest,
  output: ListProjectsLocationsAgentsToolsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ExportProjectsLocationsAgentsToolsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1ExportToolsRequest;
}

export const ExportProjectsLocationsAgentsToolsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1ExportToolsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools:export", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExportProjectsLocationsAgentsToolsRequest>;

export type ExportProjectsLocationsAgentsToolsResponse = GoogleLongrunningOperation;
export const ExportProjectsLocationsAgentsToolsResponse = GoogleLongrunningOperation;

export type ExportProjectsLocationsAgentsToolsError = CommonErrors;

export const exportProjectsLocationsAgentsTools: API.OperationMethod<ExportProjectsLocationsAgentsToolsRequest, ExportProjectsLocationsAgentsToolsResponse, ExportProjectsLocationsAgentsToolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExportProjectsLocationsAgentsToolsRequest,
  output: ExportProjectsLocationsAgentsToolsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAgentsToolsRequest {
  name: string;
}

export const GetProjectsLocationsAgentsToolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools/{toolsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsToolsRequest>;

export type GetProjectsLocationsAgentsToolsResponse = GoogleCloudDialogflowCxV3beta1Tool;
export const GetProjectsLocationsAgentsToolsResponse = GoogleCloudDialogflowCxV3beta1Tool;

export type GetProjectsLocationsAgentsToolsError = CommonErrors;

export const getProjectsLocationsAgentsTools: API.OperationMethod<GetProjectsLocationsAgentsToolsRequest, GetProjectsLocationsAgentsToolsResponse, GetProjectsLocationsAgentsToolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsToolsRequest,
  output: GetProjectsLocationsAgentsToolsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsToolsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1Tool;
}

export const PatchProjectsLocationsAgentsToolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1Tool).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools/{toolsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsToolsRequest>;

export type PatchProjectsLocationsAgentsToolsResponse = GoogleCloudDialogflowCxV3beta1Tool;
export const PatchProjectsLocationsAgentsToolsResponse = GoogleCloudDialogflowCxV3beta1Tool;

export type PatchProjectsLocationsAgentsToolsError = CommonErrors;

export const patchProjectsLocationsAgentsTools: API.OperationMethod<PatchProjectsLocationsAgentsToolsRequest, PatchProjectsLocationsAgentsToolsResponse, PatchProjectsLocationsAgentsToolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsToolsRequest,
  output: PatchProjectsLocationsAgentsToolsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsToolsRequest {
  name: string;
  force?: boolean;
}

export const DeleteProjectsLocationsAgentsToolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools/{toolsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsToolsRequest>;

export type DeleteProjectsLocationsAgentsToolsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsToolsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsToolsError = CommonErrors;

export const deleteProjectsLocationsAgentsTools: API.OperationMethod<DeleteProjectsLocationsAgentsToolsRequest, DeleteProjectsLocationsAgentsToolsResponse, DeleteProjectsLocationsAgentsToolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAgentsToolsRequest,
  output: DeleteProjectsLocationsAgentsToolsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsToolsVersionsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsToolsVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools/{toolsId}/versions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsToolsVersionsRequest>;

export type ListProjectsLocationsAgentsToolsVersionsResponse = GoogleCloudDialogflowCxV3beta1ListToolVersionsResponse;
export const ListProjectsLocationsAgentsToolsVersionsResponse = GoogleCloudDialogflowCxV3beta1ListToolVersionsResponse;

export type ListProjectsLocationsAgentsToolsVersionsError = CommonErrors;

export const listProjectsLocationsAgentsToolsVersions: API.PaginatedOperationMethod<ListProjectsLocationsAgentsToolsVersionsRequest, ListProjectsLocationsAgentsToolsVersionsResponse, ListProjectsLocationsAgentsToolsVersionsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsToolsVersionsRequest,
  output: ListProjectsLocationsAgentsToolsVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsAgentsToolsVersionsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1ToolVersion;
}

export const CreateProjectsLocationsAgentsToolsVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolVersion).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools/{toolsId}/versions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsToolsVersionsRequest>;

export type CreateProjectsLocationsAgentsToolsVersionsResponse = GoogleCloudDialogflowCxV3beta1ToolVersion;
export const CreateProjectsLocationsAgentsToolsVersionsResponse = GoogleCloudDialogflowCxV3beta1ToolVersion;

export type CreateProjectsLocationsAgentsToolsVersionsError = CommonErrors;

export const createProjectsLocationsAgentsToolsVersions: API.OperationMethod<CreateProjectsLocationsAgentsToolsVersionsRequest, CreateProjectsLocationsAgentsToolsVersionsResponse, CreateProjectsLocationsAgentsToolsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsToolsVersionsRequest,
  output: CreateProjectsLocationsAgentsToolsVersionsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAgentsToolsVersionsRequest {
  name: string;
}

export const GetProjectsLocationsAgentsToolsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools/{toolsId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsToolsVersionsRequest>;

export type GetProjectsLocationsAgentsToolsVersionsResponse = GoogleCloudDialogflowCxV3beta1ToolVersion;
export const GetProjectsLocationsAgentsToolsVersionsResponse = GoogleCloudDialogflowCxV3beta1ToolVersion;

export type GetProjectsLocationsAgentsToolsVersionsError = CommonErrors;

export const getProjectsLocationsAgentsToolsVersions: API.OperationMethod<GetProjectsLocationsAgentsToolsVersionsRequest, GetProjectsLocationsAgentsToolsVersionsResponse, GetProjectsLocationsAgentsToolsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsToolsVersionsRequest,
  output: GetProjectsLocationsAgentsToolsVersionsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsToolsVersionsRequest {
  name: string;
  force?: boolean;
}

export const DeleteProjectsLocationsAgentsToolsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools/{toolsId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsToolsVersionsRequest>;

export type DeleteProjectsLocationsAgentsToolsVersionsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsToolsVersionsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsToolsVersionsError = CommonErrors;

export const deleteProjectsLocationsAgentsToolsVersions: API.OperationMethod<DeleteProjectsLocationsAgentsToolsVersionsRequest, DeleteProjectsLocationsAgentsToolsVersionsResponse, DeleteProjectsLocationsAgentsToolsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAgentsToolsVersionsRequest,
  output: DeleteProjectsLocationsAgentsToolsVersionsResponse,
  errors: [],
}));

export interface RestoreProjectsLocationsAgentsToolsVersionsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3beta1RestoreToolVersionRequest;
}

export const RestoreProjectsLocationsAgentsToolsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3beta1RestoreToolVersionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3beta1/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools/{toolsId}/versions/{versionsId}:restore", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RestoreProjectsLocationsAgentsToolsVersionsRequest>;

export type RestoreProjectsLocationsAgentsToolsVersionsResponse = GoogleCloudDialogflowCxV3beta1RestoreToolVersionResponse;
export const RestoreProjectsLocationsAgentsToolsVersionsResponse = GoogleCloudDialogflowCxV3beta1RestoreToolVersionResponse;

export type RestoreProjectsLocationsAgentsToolsVersionsError = CommonErrors;

export const restoreProjectsLocationsAgentsToolsVersions: API.OperationMethod<RestoreProjectsLocationsAgentsToolsVersionsRequest, RestoreProjectsLocationsAgentsToolsVersionsResponse, RestoreProjectsLocationsAgentsToolsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RestoreProjectsLocationsAgentsToolsVersionsRequest,
  output: RestoreProjectsLocationsAgentsToolsVersionsResponse,
  errors: [],
}));

