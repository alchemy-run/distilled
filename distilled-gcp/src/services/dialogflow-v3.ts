// ==========================================================================
// Dialogflow API (dialogflow v3)
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
  version: "v3",
  rootUrl: "https://dialogflow.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleCloudDialogflowV2ServiceLatencyInternalServiceLatency {
  step?: string;
  startTime?: string;
  completeTime?: string;
  latencyMs?: number;
}

export const GoogleCloudDialogflowV2ServiceLatencyInternalServiceLatency: Schema.Schema<GoogleCloudDialogflowV2ServiceLatencyInternalServiceLatency> = Schema.suspend(() => Schema.Struct({
  step: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  completeTime: Schema.optional(Schema.String),
  latencyMs: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2ServiceLatencyInternalServiceLatency" }) as any as Schema.Schema<GoogleCloudDialogflowV2ServiceLatencyInternalServiceLatency>;

export interface GoogleCloudDialogflowCxV3TypeSchemaSchemaReference {
  schema?: string;
  tool?: string;
}

export const GoogleCloudDialogflowCxV3TypeSchemaSchemaReference: Schema.Schema<GoogleCloudDialogflowCxV3TypeSchemaSchemaReference> = Schema.suspend(() => Schema.Struct({
  schema: Schema.optional(Schema.String),
  tool: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3TypeSchemaSchemaReference" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TypeSchemaSchemaReference>;

export interface GoogleCloudDialogflowCxV3TypeSchema {
  schemaReference?: GoogleCloudDialogflowCxV3TypeSchemaSchemaReference;
  inlineSchema?: GoogleCloudDialogflowCxV3InlineSchema;
}

export const GoogleCloudDialogflowCxV3TypeSchema: Schema.Schema<GoogleCloudDialogflowCxV3TypeSchema> = Schema.suspend(() => Schema.Struct({
  schemaReference: Schema.optional(GoogleCloudDialogflowCxV3TypeSchemaSchemaReference),
  inlineSchema: Schema.optional(GoogleCloudDialogflowCxV3InlineSchema),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3TypeSchema" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TypeSchema>;

export interface GoogleCloudDialogflowCxV3InlineSchema {
  type?: "DATA_TYPE_UNSPECIFIED" | "STRING" | "NUMBER" | "BOOLEAN" | "ARRAY" | (string & {});
  items?: GoogleCloudDialogflowCxV3TypeSchema;
}

export const GoogleCloudDialogflowCxV3InlineSchema: Schema.Schema<GoogleCloudDialogflowCxV3InlineSchema> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  items: Schema.optional(GoogleCloudDialogflowCxV3TypeSchema),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3InlineSchema" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3InlineSchema>;

export interface GoogleTypeLatLng {
  latitude?: number;
  longitude?: number;
}

export const GoogleTypeLatLng: Schema.Schema<GoogleTypeLatLng> = Schema.suspend(() => Schema.Struct({
  latitude: Schema.optional(Schema.Number),
  longitude: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleTypeLatLng" }) as any as Schema.Schema<GoogleTypeLatLng>;

export interface GoogleCloudDialogflowV2beta1ToolCall {
  action?: string;
  inputParameters?: Record<string, unknown>;
  toolDisplayDetails?: string;
  state?: "STATE_UNSPECIFIED" | "TRIGGERED" | "NEEDS_CONFIRMATION" | (string & {});
  toolDisplayName?: string;
  createTime?: string;
  answerRecord?: string;
  tool?: string;
}

export const GoogleCloudDialogflowV2beta1ToolCall: Schema.Schema<GoogleCloudDialogflowV2beta1ToolCall> = Schema.suspend(() => Schema.Struct({
  action: Schema.optional(Schema.String),
  inputParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  toolDisplayDetails: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  toolDisplayName: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  answerRecord: Schema.optional(Schema.String),
  tool: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ToolCall" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ToolCall>;

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

export interface GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion {
  suggestionIndex?: number;
  answerRecord?: string;
  similarityScore?: number;
}

export const GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion: Schema.Schema<GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion> = Schema.suspend(() => Schema.Struct({
  suggestionIndex: Schema.optional(Schema.Number),
  answerRecord: Schema.optional(Schema.String),
  similarityScore: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion>;

export interface GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResult {
  duplicateSuggestions?: Array<GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion>;
}

export const GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResult: Schema.Schema<GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResult> = Schema.suspend(() => Schema.Struct({
  duplicateSuggestions: Schema.optional(Schema.Array(GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion)),
})).annotate({ identifier: "GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResult>;

export interface GoogleCloudDialogflowV2AgentCoachingInstruction {
  condition?: string;
  duplicateCheckResult?: GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResult;
  systemAction?: string;
  triggeringEvent?: "TRIGGER_EVENT_UNSPECIFIED" | "END_OF_UTTERANCE" | "MANUAL_CALL" | "CUSTOMER_MESSAGE" | "AGENT_MESSAGE" | "TOOL_CALL_COMPLETION" | (string & {});
  displayDetails?: string;
  displayName?: string;
  agentAction?: string;
}

export const GoogleCloudDialogflowV2AgentCoachingInstruction: Schema.Schema<GoogleCloudDialogflowV2AgentCoachingInstruction> = Schema.suspend(() => Schema.Struct({
  condition: Schema.optional(Schema.String),
  duplicateCheckResult: Schema.optional(GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResult),
  systemAction: Schema.optional(Schema.String),
  triggeringEvent: Schema.optional(Schema.String),
  displayDetails: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  agentAction: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2AgentCoachingInstruction" }) as any as Schema.Schema<GoogleCloudDialogflowV2AgentCoachingInstruction>;

export interface GoogleCloudDialogflowV2AgentCoachingSuggestionSources {
  instructionIndexes?: Array<number>;
}

export const GoogleCloudDialogflowV2AgentCoachingSuggestionSources: Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionSources> = Schema.suspend(() => Schema.Struct({
  instructionIndexes: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "GoogleCloudDialogflowV2AgentCoachingSuggestionSources" }) as any as Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionSources>;

export interface GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion {
  sources?: GoogleCloudDialogflowV2AgentCoachingSuggestionSources;
  suggestionIndex?: number;
  similarityScore?: number;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion: Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion> = Schema.suspend(() => Schema.Struct({
  sources: Schema.optional(GoogleCloudDialogflowV2AgentCoachingSuggestionSources),
  suggestionIndex: Schema.optional(Schema.Number),
  similarityScore: Schema.optional(Schema.Number),
  answerRecord: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion>;

export interface GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResult {
  duplicateSuggestions?: Array<GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion>;
}

export const GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResult: Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResult> = Schema.suspend(() => Schema.Struct({
  duplicateSuggestions: Schema.optional(Schema.Array(GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion)),
})).annotate({ identifier: "GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResult>;

export interface GoogleCloudDialogflowV2AgentCoachingSuggestionSampleResponse {
  duplicateCheckResult?: GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResult;
  responseText?: string;
  sources?: GoogleCloudDialogflowV2AgentCoachingSuggestionSources;
}

export const GoogleCloudDialogflowV2AgentCoachingSuggestionSampleResponse: Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionSampleResponse> = Schema.suspend(() => Schema.Struct({
  duplicateCheckResult: Schema.optional(GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResult),
  responseText: Schema.optional(Schema.String),
  sources: Schema.optional(GoogleCloudDialogflowV2AgentCoachingSuggestionSources),
})).annotate({ identifier: "GoogleCloudDialogflowV2AgentCoachingSuggestionSampleResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionSampleResponse>;

export interface GoogleCloudDialogflowV2AgentCoachingSuggestionAgentActionSuggestion {
  sources?: GoogleCloudDialogflowV2AgentCoachingSuggestionSources;
  agentAction?: string;
  duplicateCheckResult?: GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResult;
}

export const GoogleCloudDialogflowV2AgentCoachingSuggestionAgentActionSuggestion: Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionAgentActionSuggestion> = Schema.suspend(() => Schema.Struct({
  sources: Schema.optional(GoogleCloudDialogflowV2AgentCoachingSuggestionSources),
  agentAction: Schema.optional(Schema.String),
  duplicateCheckResult: Schema.optional(GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResult),
})).annotate({ identifier: "GoogleCloudDialogflowV2AgentCoachingSuggestionAgentActionSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionAgentActionSuggestion>;

export interface GoogleCloudDialogflowV2AgentCoachingSuggestion {
  applicableInstructions?: Array<GoogleCloudDialogflowV2AgentCoachingInstruction>;
  sampleResponses?: Array<GoogleCloudDialogflowV2AgentCoachingSuggestionSampleResponse>;
  agentActionSuggestions?: Array<GoogleCloudDialogflowV2AgentCoachingSuggestionAgentActionSuggestion>;
}

export const GoogleCloudDialogflowV2AgentCoachingSuggestion: Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestion> = Schema.suspend(() => Schema.Struct({
  applicableInstructions: Schema.optional(Schema.Array(GoogleCloudDialogflowV2AgentCoachingInstruction)),
  sampleResponses: Schema.optional(Schema.Array(GoogleCloudDialogflowV2AgentCoachingSuggestionSampleResponse)),
  agentActionSuggestions: Schema.optional(Schema.Array(GoogleCloudDialogflowV2AgentCoachingSuggestionAgentActionSuggestion)),
})).annotate({ identifier: "GoogleCloudDialogflowV2AgentCoachingSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestion>;

export interface GoogleCloudDialogflowCxV3ParameterDefinition {
  description?: string;
  typeSchema?: GoogleCloudDialogflowCxV3TypeSchema;
  type?: "PARAMETER_TYPE_UNSPECIFIED" | "STRING" | "NUMBER" | "BOOLEAN" | "NULL" | "OBJECT" | "LIST" | (string & {});
  name?: string;
}

export const GoogleCloudDialogflowCxV3ParameterDefinition: Schema.Schema<GoogleCloudDialogflowCxV3ParameterDefinition> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  typeSchema: Schema.optional(GoogleCloudDialogflowCxV3TypeSchema),
  type: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ParameterDefinition" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ParameterDefinition>;

export interface GoogleCloudDialogflowCxV3Phrase {
  text?: string;
}

export const GoogleCloudDialogflowCxV3Phrase: Schema.Schema<GoogleCloudDialogflowCxV3Phrase> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3Phrase" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Phrase>;

export interface GoogleCloudDialogflowCxV3ResponseMessageEndInteraction {
}

export const GoogleCloudDialogflowCxV3ResponseMessageEndInteraction: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageEndInteraction> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ResponseMessageEndInteraction" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageEndInteraction>;

export interface GoogleCloudDialogflowCxV3ResponseMessageText {
  allowPlaybackInterruption?: boolean;
  text?: Array<string>;
}

export const GoogleCloudDialogflowCxV3ResponseMessageText: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageText> = Schema.suspend(() => Schema.Struct({
  allowPlaybackInterruption: Schema.optional(Schema.Boolean),
  text: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ResponseMessageText" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageText>;

export interface GoogleCloudDialogflowCxV3ResponseMessageConversationSuccess {
  metadata?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3ResponseMessageConversationSuccess: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageConversationSuccess> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ResponseMessageConversationSuccess" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageConversationSuccess>;

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

export interface GoogleCloudDialogflowCxV3ResponseMessageOutputAudioText {
  ssml?: string;
  text?: string;
  allowPlaybackInterruption?: boolean;
}

export const GoogleCloudDialogflowCxV3ResponseMessageOutputAudioText: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageOutputAudioText> = Schema.suspend(() => Schema.Struct({
  ssml: Schema.optional(Schema.String),
  text: Schema.optional(Schema.String),
  allowPlaybackInterruption: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ResponseMessageOutputAudioText" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageOutputAudioText>;

export interface GoogleCloudDialogflowCxV3ResponseMessagePlayAudio {
  allowPlaybackInterruption?: boolean;
  audioUri?: string;
}

export const GoogleCloudDialogflowCxV3ResponseMessagePlayAudio: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessagePlayAudio> = Schema.suspend(() => Schema.Struct({
  allowPlaybackInterruption: Schema.optional(Schema.Boolean),
  audioUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ResponseMessagePlayAudio" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessagePlayAudio>;

export interface GoogleCloudDialogflowCxV3ResponseMessageKnowledgeInfoCard {
}

export const GoogleCloudDialogflowCxV3ResponseMessageKnowledgeInfoCard: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageKnowledgeInfoCard> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ResponseMessageKnowledgeInfoCard" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageKnowledgeInfoCard>;

export interface GoogleCloudDialogflowCxV3ResponseMessageLiveAgentHandoff {
  metadata?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3ResponseMessageLiveAgentHandoff: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageLiveAgentHandoff> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ResponseMessageLiveAgentHandoff" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageLiveAgentHandoff>;

export interface GoogleCloudDialogflowCxV3ToolCall {
  tool?: string;
  inputParameters?: Record<string, unknown>;
  action?: string;
}

export const GoogleCloudDialogflowCxV3ToolCall: Schema.Schema<GoogleCloudDialogflowCxV3ToolCall> = Schema.suspend(() => Schema.Struct({
  tool: Schema.optional(Schema.String),
  inputParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  action: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ToolCall" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolCall>;

export interface GoogleCloudDialogflowCxV3ResponseMessageTelephonyTransferCall {
  phoneNumber?: string;
}

export const GoogleCloudDialogflowCxV3ResponseMessageTelephonyTransferCall: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageTelephonyTransferCall> = Schema.suspend(() => Schema.Struct({
  phoneNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ResponseMessageTelephonyTransferCall" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageTelephonyTransferCall>;

export interface GoogleCloudDialogflowCxV3ResponseMessage {
  endInteraction?: GoogleCloudDialogflowCxV3ResponseMessageEndInteraction;
  text?: GoogleCloudDialogflowCxV3ResponseMessageText;
  conversationSuccess?: GoogleCloudDialogflowCxV3ResponseMessageConversationSuccess;
  responseType?: "RESPONSE_TYPE_UNSPECIFIED" | "ENTRY_PROMPT" | "PARAMETER_PROMPT" | "HANDLER_PROMPT" | (string & {});
  mixedAudio?: GoogleCloudDialogflowCxV3ResponseMessageMixedAudio;
  outputAudioText?: GoogleCloudDialogflowCxV3ResponseMessageOutputAudioText;
  playAudio?: GoogleCloudDialogflowCxV3ResponseMessagePlayAudio;
  knowledgeInfoCard?: GoogleCloudDialogflowCxV3ResponseMessageKnowledgeInfoCard;
  liveAgentHandoff?: GoogleCloudDialogflowCxV3ResponseMessageLiveAgentHandoff;
  channel?: string;
  toolCall?: GoogleCloudDialogflowCxV3ToolCall;
  payload?: Record<string, unknown>;
  telephonyTransferCall?: GoogleCloudDialogflowCxV3ResponseMessageTelephonyTransferCall;
}

export const GoogleCloudDialogflowCxV3ResponseMessage: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessage> = Schema.suspend(() => Schema.Struct({
  endInteraction: Schema.optional(GoogleCloudDialogflowCxV3ResponseMessageEndInteraction),
  text: Schema.optional(GoogleCloudDialogflowCxV3ResponseMessageText),
  conversationSuccess: Schema.optional(GoogleCloudDialogflowCxV3ResponseMessageConversationSuccess),
  responseType: Schema.optional(Schema.String),
  mixedAudio: Schema.optional(GoogleCloudDialogflowCxV3ResponseMessageMixedAudio),
  outputAudioText: Schema.optional(GoogleCloudDialogflowCxV3ResponseMessageOutputAudioText),
  playAudio: Schema.optional(GoogleCloudDialogflowCxV3ResponseMessagePlayAudio),
  knowledgeInfoCard: Schema.optional(GoogleCloudDialogflowCxV3ResponseMessageKnowledgeInfoCard),
  liveAgentHandoff: Schema.optional(GoogleCloudDialogflowCxV3ResponseMessageLiveAgentHandoff),
  channel: Schema.optional(Schema.String),
  toolCall: Schema.optional(GoogleCloudDialogflowCxV3ToolCall),
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  telephonyTransferCall: Schema.optional(GoogleCloudDialogflowCxV3ResponseMessageTelephonyTransferCall),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ResponseMessage" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessage>;

export interface GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCaseCaseContent {
  additionalCases?: GoogleCloudDialogflowCxV3FulfillmentConditionalCases;
  message?: GoogleCloudDialogflowCxV3ResponseMessage;
}

export const GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCaseCaseContent: Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCaseCaseContent> = Schema.suspend(() => Schema.Struct({
  additionalCases: Schema.optional(GoogleCloudDialogflowCxV3FulfillmentConditionalCases),
  message: Schema.optional(GoogleCloudDialogflowCxV3ResponseMessage),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCaseCaseContent" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCaseCaseContent>;

export interface GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCase {
  caseContent?: Array<GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCaseCaseContent>;
  condition?: string;
}

export const GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCase: Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCase> = Schema.suspend(() => Schema.Struct({
  caseContent: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCaseCaseContent)),
  condition: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCase" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCase>;

export interface GoogleCloudDialogflowCxV3FulfillmentConditionalCases {
  cases?: Array<GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCase>;
}

export const GoogleCloudDialogflowCxV3FulfillmentConditionalCases: Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentConditionalCases> = Schema.suspend(() => Schema.Struct({
  cases: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCase)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3FulfillmentConditionalCases" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentConditionalCases>;

export interface GoogleCloudDialogflowCxV3AdvancedSettingsDtmfSettings {
  endpointingTimeoutDuration?: string;
  finishDigit?: string;
  maxDigits?: number;
  enabled?: boolean;
  interdigitTimeoutDuration?: string;
}

export const GoogleCloudDialogflowCxV3AdvancedSettingsDtmfSettings: Schema.Schema<GoogleCloudDialogflowCxV3AdvancedSettingsDtmfSettings> = Schema.suspend(() => Schema.Struct({
  endpointingTimeoutDuration: Schema.optional(Schema.String),
  finishDigit: Schema.optional(Schema.String),
  maxDigits: Schema.optional(Schema.Number),
  enabled: Schema.optional(Schema.Boolean),
  interdigitTimeoutDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3AdvancedSettingsDtmfSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AdvancedSettingsDtmfSettings>;

export interface GoogleCloudDialogflowCxV3AdvancedSettingsLoggingSettings {
  enableStackdriverLogging?: boolean;
  enableConsentBasedRedaction?: boolean;
  enableInteractionLogging?: boolean;
}

export const GoogleCloudDialogflowCxV3AdvancedSettingsLoggingSettings: Schema.Schema<GoogleCloudDialogflowCxV3AdvancedSettingsLoggingSettings> = Schema.suspend(() => Schema.Struct({
  enableStackdriverLogging: Schema.optional(Schema.Boolean),
  enableConsentBasedRedaction: Schema.optional(Schema.Boolean),
  enableInteractionLogging: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3AdvancedSettingsLoggingSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AdvancedSettingsLoggingSettings>;

export interface GoogleCloudDialogflowCxV3AdvancedSettingsSpeechSettings {
  endpointerSensitivity?: number;
  models?: Record<string, string>;
  noSpeechTimeout?: string;
  useTimeoutBasedEndpointing?: boolean;
}

export const GoogleCloudDialogflowCxV3AdvancedSettingsSpeechSettings: Schema.Schema<GoogleCloudDialogflowCxV3AdvancedSettingsSpeechSettings> = Schema.suspend(() => Schema.Struct({
  endpointerSensitivity: Schema.optional(Schema.Number),
  models: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  noSpeechTimeout: Schema.optional(Schema.String),
  useTimeoutBasedEndpointing: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3AdvancedSettingsSpeechSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AdvancedSettingsSpeechSettings>;

export interface GoogleCloudDialogflowCxV3GcsDestination {
  uri?: string;
}

export const GoogleCloudDialogflowCxV3GcsDestination: Schema.Schema<GoogleCloudDialogflowCxV3GcsDestination> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3GcsDestination" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3GcsDestination>;

export interface GoogleCloudDialogflowCxV3AdvancedSettings {
  dtmfSettings?: GoogleCloudDialogflowCxV3AdvancedSettingsDtmfSettings;
  loggingSettings?: GoogleCloudDialogflowCxV3AdvancedSettingsLoggingSettings;
  speechSettings?: GoogleCloudDialogflowCxV3AdvancedSettingsSpeechSettings;
  audioExportGcsDestination?: GoogleCloudDialogflowCxV3GcsDestination;
}

export const GoogleCloudDialogflowCxV3AdvancedSettings: Schema.Schema<GoogleCloudDialogflowCxV3AdvancedSettings> = Schema.suspend(() => Schema.Struct({
  dtmfSettings: Schema.optional(GoogleCloudDialogflowCxV3AdvancedSettingsDtmfSettings),
  loggingSettings: Schema.optional(GoogleCloudDialogflowCxV3AdvancedSettingsLoggingSettings),
  speechSettings: Schema.optional(GoogleCloudDialogflowCxV3AdvancedSettingsSpeechSettings),
  audioExportGcsDestination: Schema.optional(GoogleCloudDialogflowCxV3GcsDestination),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3AdvancedSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AdvancedSettings>;

export interface GoogleCloudDialogflowCxV3FulfillmentSetParameterAction {
  parameter?: string;
  value?: unknown;
}

export const GoogleCloudDialogflowCxV3FulfillmentSetParameterAction: Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentSetParameterAction> = Schema.suspend(() => Schema.Struct({
  parameter: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Unknown),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3FulfillmentSetParameterAction" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentSetParameterAction>;

export interface GoogleCloudDialogflowCxV3FulfillmentGeneratorSettings {
  generator?: string;
  outputParameter?: string;
  inputParameters?: Record<string, string>;
}

export const GoogleCloudDialogflowCxV3FulfillmentGeneratorSettings: Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentGeneratorSettings> = Schema.suspend(() => Schema.Struct({
  generator: Schema.optional(Schema.String),
  outputParameter: Schema.optional(Schema.String),
  inputParameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3FulfillmentGeneratorSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentGeneratorSettings>;

export interface GoogleCloudDialogflowCxV3Fulfillment {
  enableGenerativeFallback?: boolean;
  tag?: string;
  webhook?: string;
  returnPartialResponses?: boolean;
  messages?: Array<GoogleCloudDialogflowCxV3ResponseMessage>;
  conditionalCases?: Array<GoogleCloudDialogflowCxV3FulfillmentConditionalCases>;
  advancedSettings?: GoogleCloudDialogflowCxV3AdvancedSettings;
  setParameterActions?: Array<GoogleCloudDialogflowCxV3FulfillmentSetParameterAction>;
  generators?: Array<GoogleCloudDialogflowCxV3FulfillmentGeneratorSettings>;
}

export const GoogleCloudDialogflowCxV3Fulfillment: Schema.Schema<GoogleCloudDialogflowCxV3Fulfillment> = Schema.suspend(() => Schema.Struct({
  enableGenerativeFallback: Schema.optional(Schema.Boolean),
  tag: Schema.optional(Schema.String),
  webhook: Schema.optional(Schema.String),
  returnPartialResponses: Schema.optional(Schema.Boolean),
  messages: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3ResponseMessage)),
  conditionalCases: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3FulfillmentConditionalCases)),
  advancedSettings: Schema.optional(GoogleCloudDialogflowCxV3AdvancedSettings),
  setParameterActions: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3FulfillmentSetParameterAction)),
  generators: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3FulfillmentGeneratorSettings)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3Fulfillment" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Fulfillment>;

export interface GoogleCloudDialogflowCxV3TransitionRoute {
  intent?: string;
  targetPage?: string;
  triggerFulfillment?: GoogleCloudDialogflowCxV3Fulfillment;
  name?: string;
  targetFlow?: string;
  description?: string;
  condition?: string;
}

export const GoogleCloudDialogflowCxV3TransitionRoute: Schema.Schema<GoogleCloudDialogflowCxV3TransitionRoute> = Schema.suspend(() => Schema.Struct({
  intent: Schema.optional(Schema.String),
  targetPage: Schema.optional(Schema.String),
  triggerFulfillment: Schema.optional(GoogleCloudDialogflowCxV3Fulfillment),
  name: Schema.optional(Schema.String),
  targetFlow: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  condition: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3TransitionRoute" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TransitionRoute>;

export interface GoogleCloudDialogflowCxV3TransitionRouteGroup {
  displayName?: string;
  name?: string;
  transitionRoutes?: Array<GoogleCloudDialogflowCxV3TransitionRoute>;
}

export const GoogleCloudDialogflowCxV3TransitionRouteGroup: Schema.Schema<GoogleCloudDialogflowCxV3TransitionRouteGroup> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  transitionRoutes: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3TransitionRoute)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3TransitionRouteGroup" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TransitionRouteGroup>;

export interface GoogleCloudDialogflowCxV3TurnSignals {
  noMatch?: boolean;
  dtmfUsed?: boolean;
  reachedEndPage?: boolean;
  noUserInput?: boolean;
  userEscalated?: boolean;
  sentimentMagnitude?: number;
  failureReasons?: Array<"FAILURE_REASON_UNSPECIFIED" | "FAILED_INTENT" | "FAILED_WEBHOOK" | (string & {})>;
  sentimentScore?: number;
  agentEscalated?: boolean;
  webhookStatuses?: Array<string>;
}

export const GoogleCloudDialogflowCxV3TurnSignals: Schema.Schema<GoogleCloudDialogflowCxV3TurnSignals> = Schema.suspend(() => Schema.Struct({
  noMatch: Schema.optional(Schema.Boolean),
  dtmfUsed: Schema.optional(Schema.Boolean),
  reachedEndPage: Schema.optional(Schema.Boolean),
  noUserInput: Schema.optional(Schema.Boolean),
  userEscalated: Schema.optional(Schema.Boolean),
  sentimentMagnitude: Schema.optional(Schema.Number),
  failureReasons: Schema.optional(Schema.Array(Schema.String)),
  sentimentScore: Schema.optional(Schema.Number),
  agentEscalated: Schema.optional(Schema.Boolean),
  webhookStatuses: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3TurnSignals" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TurnSignals>;

export interface GoogleCloudDialogflowCxV3EventHandler {
  triggerFulfillment?: GoogleCloudDialogflowCxV3Fulfillment;
  targetFlow?: string;
  event?: string;
  name?: string;
  targetPlaybook?: string;
  targetPage?: string;
}

export const GoogleCloudDialogflowCxV3EventHandler: Schema.Schema<GoogleCloudDialogflowCxV3EventHandler> = Schema.suspend(() => Schema.Struct({
  triggerFulfillment: Schema.optional(GoogleCloudDialogflowCxV3Fulfillment),
  targetFlow: Schema.optional(Schema.String),
  event: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  targetPlaybook: Schema.optional(Schema.String),
  targetPage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3EventHandler" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3EventHandler>;

export interface GoogleCloudDialogflowCxV3FormParameterFillBehavior {
  repromptEventHandlers?: Array<GoogleCloudDialogflowCxV3EventHandler>;
  initialPromptFulfillment?: GoogleCloudDialogflowCxV3Fulfillment;
}

export const GoogleCloudDialogflowCxV3FormParameterFillBehavior: Schema.Schema<GoogleCloudDialogflowCxV3FormParameterFillBehavior> = Schema.suspend(() => Schema.Struct({
  repromptEventHandlers: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3EventHandler)),
  initialPromptFulfillment: Schema.optional(GoogleCloudDialogflowCxV3Fulfillment),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3FormParameterFillBehavior" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FormParameterFillBehavior>;

export interface GoogleCloudDialogflowCxV3RolloutState {
  step?: string;
  stepIndex?: number;
  startTime?: string;
}

export const GoogleCloudDialogflowCxV3RolloutState: Schema.Schema<GoogleCloudDialogflowCxV3RolloutState> = Schema.suspend(() => Schema.Struct({
  step: Schema.optional(Schema.String),
  stepIndex: Schema.optional(Schema.Number),
  startTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3RolloutState" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RolloutState>;

export interface GoogleCloudDialogflowCxV3VersionVariantsVariant {
  version?: string;
  trafficAllocation?: number;
  isControlGroup?: boolean;
}

export const GoogleCloudDialogflowCxV3VersionVariantsVariant: Schema.Schema<GoogleCloudDialogflowCxV3VersionVariantsVariant> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  trafficAllocation: Schema.optional(Schema.Number),
  isControlGroup: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3VersionVariantsVariant" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3VersionVariantsVariant>;

export interface GoogleCloudDialogflowCxV3VersionVariants {
  variants?: Array<GoogleCloudDialogflowCxV3VersionVariantsVariant>;
}

export const GoogleCloudDialogflowCxV3VersionVariants: Schema.Schema<GoogleCloudDialogflowCxV3VersionVariants> = Schema.suspend(() => Schema.Struct({
  variants: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3VersionVariantsVariant)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3VersionVariants" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3VersionVariants>;

export interface GoogleCloudDialogflowCxV3VariantsHistory {
  versionVariants?: GoogleCloudDialogflowCxV3VersionVariants;
  updateTime?: string;
}

export const GoogleCloudDialogflowCxV3VariantsHistory: Schema.Schema<GoogleCloudDialogflowCxV3VariantsHistory> = Schema.suspend(() => Schema.Struct({
  versionVariants: Schema.optional(GoogleCloudDialogflowCxV3VersionVariants),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3VariantsHistory" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3VariantsHistory>;

export interface GoogleCloudDialogflowCxV3ExperimentResultConfidenceInterval {
  confidenceLevel?: number;
  lowerBound?: number;
  ratio?: number;
  upperBound?: number;
}

export const GoogleCloudDialogflowCxV3ExperimentResultConfidenceInterval: Schema.Schema<GoogleCloudDialogflowCxV3ExperimentResultConfidenceInterval> = Schema.suspend(() => Schema.Struct({
  confidenceLevel: Schema.optional(Schema.Number),
  lowerBound: Schema.optional(Schema.Number),
  ratio: Schema.optional(Schema.Number),
  upperBound: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ExperimentResultConfidenceInterval" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExperimentResultConfidenceInterval>;

export interface GoogleCloudDialogflowCxV3ExperimentResultMetric {
  confidenceInterval?: GoogleCloudDialogflowCxV3ExperimentResultConfidenceInterval;
  type?: "METRIC_UNSPECIFIED" | "CONTAINED_SESSION_NO_CALLBACK_RATE" | "LIVE_AGENT_HANDOFF_RATE" | "CALLBACK_SESSION_RATE" | "ABANDONED_SESSION_RATE" | "SESSION_END_RATE" | (string & {});
  ratio?: number;
  countType?: "COUNT_TYPE_UNSPECIFIED" | "TOTAL_NO_MATCH_COUNT" | "TOTAL_TURN_COUNT" | "AVERAGE_TURN_COUNT" | (string & {});
  count?: number;
}

export const GoogleCloudDialogflowCxV3ExperimentResultMetric: Schema.Schema<GoogleCloudDialogflowCxV3ExperimentResultMetric> = Schema.suspend(() => Schema.Struct({
  confidenceInterval: Schema.optional(GoogleCloudDialogflowCxV3ExperimentResultConfidenceInterval),
  type: Schema.optional(Schema.String),
  ratio: Schema.optional(Schema.Number),
  countType: Schema.optional(Schema.String),
  count: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ExperimentResultMetric" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExperimentResultMetric>;

export interface GoogleCloudDialogflowCxV3ExperimentResultVersionMetrics {
  version?: string;
  sessionCount?: number;
  metrics?: Array<GoogleCloudDialogflowCxV3ExperimentResultMetric>;
}

export const GoogleCloudDialogflowCxV3ExperimentResultVersionMetrics: Schema.Schema<GoogleCloudDialogflowCxV3ExperimentResultVersionMetrics> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  sessionCount: Schema.optional(Schema.Number),
  metrics: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3ExperimentResultMetric)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ExperimentResultVersionMetrics" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExperimentResultVersionMetrics>;

export interface GoogleCloudDialogflowCxV3ExperimentResult {
  versionMetrics?: Array<GoogleCloudDialogflowCxV3ExperimentResultVersionMetrics>;
  lastUpdateTime?: string;
}

export const GoogleCloudDialogflowCxV3ExperimentResult: Schema.Schema<GoogleCloudDialogflowCxV3ExperimentResult> = Schema.suspend(() => Schema.Struct({
  versionMetrics: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3ExperimentResultVersionMetrics)),
  lastUpdateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ExperimentResult" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExperimentResult>;

export interface GoogleCloudDialogflowCxV3ExperimentDefinition {
  condition?: string;
  versionVariants?: GoogleCloudDialogflowCxV3VersionVariants;
}

export const GoogleCloudDialogflowCxV3ExperimentDefinition: Schema.Schema<GoogleCloudDialogflowCxV3ExperimentDefinition> = Schema.suspend(() => Schema.Struct({
  condition: Schema.optional(Schema.String),
  versionVariants: Schema.optional(GoogleCloudDialogflowCxV3VersionVariants),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ExperimentDefinition" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExperimentDefinition>;

export interface GoogleCloudDialogflowCxV3RolloutConfigRolloutStep {
  minDuration?: string;
  trafficPercent?: number;
  displayName?: string;
}

export const GoogleCloudDialogflowCxV3RolloutConfigRolloutStep: Schema.Schema<GoogleCloudDialogflowCxV3RolloutConfigRolloutStep> = Schema.suspend(() => Schema.Struct({
  minDuration: Schema.optional(Schema.String),
  trafficPercent: Schema.optional(Schema.Number),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3RolloutConfigRolloutStep" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RolloutConfigRolloutStep>;

export interface GoogleCloudDialogflowCxV3RolloutConfig {
  rolloutSteps?: Array<GoogleCloudDialogflowCxV3RolloutConfigRolloutStep>;
  rolloutCondition?: string;
  failureCondition?: string;
}

export const GoogleCloudDialogflowCxV3RolloutConfig: Schema.Schema<GoogleCloudDialogflowCxV3RolloutConfig> = Schema.suspend(() => Schema.Struct({
  rolloutSteps: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3RolloutConfigRolloutStep)),
  rolloutCondition: Schema.optional(Schema.String),
  failureCondition: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3RolloutConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RolloutConfig>;

export interface GoogleCloudDialogflowCxV3Experiment {
  startTime?: string;
  displayName?: string;
  rolloutFailureReason?: string;
  createTime?: string;
  state?: "STATE_UNSPECIFIED" | "DRAFT" | "RUNNING" | "DONE" | "ROLLOUT_FAILED" | (string & {});
  rolloutState?: GoogleCloudDialogflowCxV3RolloutState;
  variantsHistory?: Array<GoogleCloudDialogflowCxV3VariantsHistory>;
  result?: GoogleCloudDialogflowCxV3ExperimentResult;
  experimentLength?: string;
  endTime?: string;
  definition?: GoogleCloudDialogflowCxV3ExperimentDefinition;
  lastUpdateTime?: string;
  description?: string;
  name?: string;
  rolloutConfig?: GoogleCloudDialogflowCxV3RolloutConfig;
}

export const GoogleCloudDialogflowCxV3Experiment: Schema.Schema<GoogleCloudDialogflowCxV3Experiment> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  rolloutFailureReason: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  rolloutState: Schema.optional(GoogleCloudDialogflowCxV3RolloutState),
  variantsHistory: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3VariantsHistory)),
  result: Schema.optional(GoogleCloudDialogflowCxV3ExperimentResult),
  experimentLength: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  definition: Schema.optional(GoogleCloudDialogflowCxV3ExperimentDefinition),
  lastUpdateTime: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  rolloutConfig: Schema.optional(GoogleCloudDialogflowCxV3RolloutConfig),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3Experiment" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Experiment>;

export interface GoogleCloudDialogflowCxV3ListExperimentsResponse {
  nextPageToken?: string;
  experiments?: Array<GoogleCloudDialogflowCxV3Experiment>;
}

export const GoogleCloudDialogflowCxV3ListExperimentsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListExperimentsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  experiments: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Experiment)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ListExperimentsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListExperimentsResponse>;

export interface GoogleCloudDialogflowCxV3beta1TextInput {
  text?: string;
}

export const GoogleCloudDialogflowCxV3beta1TextInput: Schema.Schema<GoogleCloudDialogflowCxV3beta1TextInput> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1TextInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TextInput>;

export interface GoogleCloudDialogflowCxV3beta1BargeInConfig {
  noBargeInDuration?: string;
  totalDuration?: string;
}

export const GoogleCloudDialogflowCxV3beta1BargeInConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1BargeInConfig> = Schema.suspend(() => Schema.Struct({
  noBargeInDuration: Schema.optional(Schema.String),
  totalDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1BargeInConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1BargeInConfig>;

export interface GoogleCloudDialogflowCxV3beta1InputAudioConfig {
  model?: string;
  audioEncoding?: "AUDIO_ENCODING_UNSPECIFIED" | "AUDIO_ENCODING_LINEAR_16" | "AUDIO_ENCODING_FLAC" | "AUDIO_ENCODING_MULAW" | "AUDIO_ENCODING_AMR" | "AUDIO_ENCODING_AMR_WB" | "AUDIO_ENCODING_OGG_OPUS" | "AUDIO_ENCODING_SPEEX_WITH_HEADER_BYTE" | "AUDIO_ENCODING_ALAW" | (string & {});
  optOutConformerModelMigration?: boolean;
  bargeInConfig?: GoogleCloudDialogflowCxV3beta1BargeInConfig;
  singleUtterance?: boolean;
  sampleRateHertz?: number;
  phraseHints?: Array<string>;
  enableWordInfo?: boolean;
  modelVariant?: "SPEECH_MODEL_VARIANT_UNSPECIFIED" | "USE_BEST_AVAILABLE" | "USE_STANDARD" | "USE_ENHANCED" | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1InputAudioConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1InputAudioConfig> = Schema.suspend(() => Schema.Struct({
  model: Schema.optional(Schema.String),
  audioEncoding: Schema.optional(Schema.String),
  optOutConformerModelMigration: Schema.optional(Schema.Boolean),
  bargeInConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1BargeInConfig),
  singleUtterance: Schema.optional(Schema.Boolean),
  sampleRateHertz: Schema.optional(Schema.Number),
  phraseHints: Schema.optional(Schema.Array(Schema.String)),
  enableWordInfo: Schema.optional(Schema.Boolean),
  modelVariant: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1InputAudioConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1InputAudioConfig>;

export interface GoogleCloudDialogflowCxV3beta1AudioInput {
  audio?: string;
  config?: GoogleCloudDialogflowCxV3beta1InputAudioConfig;
}

export const GoogleCloudDialogflowCxV3beta1AudioInput: Schema.Schema<GoogleCloudDialogflowCxV3beta1AudioInput> = Schema.suspend(() => Schema.Struct({
  audio: Schema.optional(Schema.String),
  config: Schema.optional(GoogleCloudDialogflowCxV3beta1InputAudioConfig),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1AudioInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1AudioInput>;

export interface GoogleCloudDialogflowCxV3beta1ToolCallResultError {
  message?: string;
}

export const GoogleCloudDialogflowCxV3beta1ToolCallResultError: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolCallResultError> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolCallResultError" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolCallResultError>;

export interface GoogleCloudDialogflowCxV3beta1ToolCallResult {
  outputParameters?: Record<string, unknown>;
  action?: string;
  error?: GoogleCloudDialogflowCxV3beta1ToolCallResultError;
  tool?: string;
}

export const GoogleCloudDialogflowCxV3beta1ToolCallResult: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolCallResult> = Schema.suspend(() => Schema.Struct({
  outputParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  action: Schema.optional(Schema.String),
  error: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolCallResultError),
  tool: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolCallResult" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolCallResult>;

export interface GoogleCloudDialogflowCxV3beta1DtmfInput {
  finishDigit?: string;
  digits?: string;
}

export const GoogleCloudDialogflowCxV3beta1DtmfInput: Schema.Schema<GoogleCloudDialogflowCxV3beta1DtmfInput> = Schema.suspend(() => Schema.Struct({
  finishDigit: Schema.optional(Schema.String),
  digits: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1DtmfInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1DtmfInput>;

export interface GoogleCloudDialogflowCxV3beta1IntentInput {
  intent?: string;
}

export const GoogleCloudDialogflowCxV3beta1IntentInput: Schema.Schema<GoogleCloudDialogflowCxV3beta1IntentInput> = Schema.suspend(() => Schema.Struct({
  intent: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1IntentInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1IntentInput>;

export interface GoogleCloudDialogflowCxV3beta1EventInput {
  event?: string;
}

export const GoogleCloudDialogflowCxV3beta1EventInput: Schema.Schema<GoogleCloudDialogflowCxV3beta1EventInput> = Schema.suspend(() => Schema.Struct({
  event: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1EventInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1EventInput>;

export interface GoogleCloudDialogflowCxV3beta1QueryInput {
  text?: GoogleCloudDialogflowCxV3beta1TextInput;
  audio?: GoogleCloudDialogflowCxV3beta1AudioInput;
  toolCallResult?: GoogleCloudDialogflowCxV3beta1ToolCallResult;
  languageCode?: string;
  dtmf?: GoogleCloudDialogflowCxV3beta1DtmfInput;
  intent?: GoogleCloudDialogflowCxV3beta1IntentInput;
  event?: GoogleCloudDialogflowCxV3beta1EventInput;
}

export const GoogleCloudDialogflowCxV3beta1QueryInput: Schema.Schema<GoogleCloudDialogflowCxV3beta1QueryInput> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(GoogleCloudDialogflowCxV3beta1TextInput),
  audio: Schema.optional(GoogleCloudDialogflowCxV3beta1AudioInput),
  toolCallResult: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolCallResult),
  languageCode: Schema.optional(Schema.String),
  dtmf: Schema.optional(GoogleCloudDialogflowCxV3beta1DtmfInput),
  intent: Schema.optional(GoogleCloudDialogflowCxV3beta1IntentInput),
  event: Schema.optional(GoogleCloudDialogflowCxV3beta1EventInput),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1QueryInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1QueryInput>;

export interface GoogleCloudDialogflowCxV3beta1ConversationTurnUserInput {
  input?: GoogleCloudDialogflowCxV3beta1QueryInput;
  enableSentimentAnalysis?: boolean;
  injectedParameters?: Record<string, unknown>;
  isWebhookEnabled?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1ConversationTurnUserInput: Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationTurnUserInput> = Schema.suspend(() => Schema.Struct({
  input: Schema.optional(GoogleCloudDialogflowCxV3beta1QueryInput),
  enableSentimentAnalysis: Schema.optional(Schema.Boolean),
  injectedParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  isWebhookEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ConversationTurnUserInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationTurnUserInput>;

export interface GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpecBoostControlSpecControlPoint {
  attributeValue?: string;
  boostAmount?: number;
}

export const GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpecBoostControlSpecControlPoint: Schema.Schema<GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpecBoostControlSpecControlPoint> = Schema.suspend(() => Schema.Struct({
  attributeValue: Schema.optional(Schema.String),
  boostAmount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpecBoostControlSpecControlPoint" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpecBoostControlSpecControlPoint>;

export interface GoogleCloudDialogflowCxV3ToolUse {
  outputActionParameters?: Record<string, unknown>;
  action?: string;
  tool?: string;
  displayName?: string;
  inputActionParameters?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3ToolUse: Schema.Schema<GoogleCloudDialogflowCxV3ToolUse> = Schema.suspend(() => Schema.Struct({
  outputActionParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  action: Schema.optional(Schema.String),
  tool: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  inputActionParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ToolUse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolUse>;

export interface GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceSecretVersionHeaderValue {
  secretVersion?: string;
}

export const GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceSecretVersionHeaderValue: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceSecretVersionHeaderValue> = Schema.suspend(() => Schema.Struct({
  secretVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceSecretVersionHeaderValue" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceSecretVersionHeaderValue>;

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
  entityTypeDisplayName?: string;
  defaultValue?: string;
  name?: string;
  prompts?: Array<string>;
  mandatory?: boolean;
  value?: string;
  displayName?: string;
  isList?: boolean;
}

export const GoogleCloudDialogflowV2IntentParameter: Schema.Schema<GoogleCloudDialogflowV2IntentParameter> = Schema.suspend(() => Schema.Struct({
  entityTypeDisplayName: Schema.optional(Schema.String),
  defaultValue: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  prompts: Schema.optional(Schema.Array(Schema.String)),
  mandatory: Schema.optional(Schema.Boolean),
  value: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  isList: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentParameter" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentParameter>;

export interface GoogleCloudDialogflowV2IntentTrainingPhrasePart {
  alias?: string;
  text?: string;
  entityType?: string;
  userDefined?: boolean;
}

export const GoogleCloudDialogflowV2IntentTrainingPhrasePart: Schema.Schema<GoogleCloudDialogflowV2IntentTrainingPhrasePart> = Schema.suspend(() => Schema.Struct({
  alias: Schema.optional(Schema.String),
  text: Schema.optional(Schema.String),
  entityType: Schema.optional(Schema.String),
  userDefined: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentTrainingPhrasePart" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentTrainingPhrasePart>;

export interface GoogleCloudDialogflowV2IntentTrainingPhrase {
  type?: "TYPE_UNSPECIFIED" | "EXAMPLE" | "TEMPLATE" | (string & {});
  name?: string;
  timesAddedCount?: number;
  parts?: Array<GoogleCloudDialogflowV2IntentTrainingPhrasePart>;
}

export const GoogleCloudDialogflowV2IntentTrainingPhrase: Schema.Schema<GoogleCloudDialogflowV2IntentTrainingPhrase> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  timesAddedCount: Schema.optional(Schema.Number),
  parts: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentTrainingPhrasePart)),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentTrainingPhrase" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentTrainingPhrase>;

export interface GoogleCloudDialogflowV2IntentFollowupIntentInfo {
  followupIntentName?: string;
  parentFollowupIntentName?: string;
}

export const GoogleCloudDialogflowV2IntentFollowupIntentInfo: Schema.Schema<GoogleCloudDialogflowV2IntentFollowupIntentInfo> = Schema.suspend(() => Schema.Struct({
  followupIntentName: Schema.optional(Schema.String),
  parentFollowupIntentName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentFollowupIntentInfo" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentFollowupIntentInfo>;

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

export interface GoogleCloudDialogflowV2IntentMessageBasicCard {
  title?: string;
  image?: GoogleCloudDialogflowV2IntentMessageImage;
  formattedText?: string;
  buttons?: Array<GoogleCloudDialogflowV2IntentMessageBasicCardButton>;
  subtitle?: string;
}

export const GoogleCloudDialogflowV2IntentMessageBasicCard: Schema.Schema<GoogleCloudDialogflowV2IntentMessageBasicCard> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  image: Schema.optional(GoogleCloudDialogflowV2IntentMessageImage),
  formattedText: Schema.optional(Schema.String),
  buttons: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentMessageBasicCardButton)),
  subtitle: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageBasicCard" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageBasicCard>;

export interface GoogleCloudDialogflowV2IntentMessageQuickReplies {
  quickReplies?: Array<string>;
  title?: string;
}

export const GoogleCloudDialogflowV2IntentMessageQuickReplies: Schema.Schema<GoogleCloudDialogflowV2IntentMessageQuickReplies> = Schema.suspend(() => Schema.Struct({
  quickReplies: Schema.optional(Schema.Array(Schema.String)),
  title: Schema.optional(Schema.String),
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
  subtitle?: string;
  imageUri?: string;
  buttons?: Array<GoogleCloudDialogflowV2IntentMessageCardButton>;
  title?: string;
}

export const GoogleCloudDialogflowV2IntentMessageCard: Schema.Schema<GoogleCloudDialogflowV2IntentMessageCard> = Schema.suspend(() => Schema.Struct({
  subtitle: Schema.optional(Schema.String),
  imageUri: Schema.optional(Schema.String),
  buttons: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentMessageCardButton)),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageCard" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageCard>;

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

export interface GoogleCloudDialogflowV2IntentMessageColumnProperties {
  header?: string;
  horizontalAlignment?: "HORIZONTAL_ALIGNMENT_UNSPECIFIED" | "LEADING" | "CENTER" | "TRAILING" | (string & {});
}

export const GoogleCloudDialogflowV2IntentMessageColumnProperties: Schema.Schema<GoogleCloudDialogflowV2IntentMessageColumnProperties> = Schema.suspend(() => Schema.Struct({
  header: Schema.optional(Schema.String),
  horizontalAlignment: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageColumnProperties" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageColumnProperties>;

export interface GoogleCloudDialogflowV2IntentMessageTableCard {
  image?: GoogleCloudDialogflowV2IntentMessageImage;
  rows?: Array<GoogleCloudDialogflowV2IntentMessageTableCardRow>;
  buttons?: Array<GoogleCloudDialogflowV2IntentMessageBasicCardButton>;
  subtitle?: string;
  columnProperties?: Array<GoogleCloudDialogflowV2IntentMessageColumnProperties>;
  title?: string;
}

export const GoogleCloudDialogflowV2IntentMessageTableCard: Schema.Schema<GoogleCloudDialogflowV2IntentMessageTableCard> = Schema.suspend(() => Schema.Struct({
  image: Schema.optional(GoogleCloudDialogflowV2IntentMessageImage),
  rows: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentMessageTableCardRow)),
  buttons: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentMessageBasicCardButton)),
  subtitle: Schema.optional(Schema.String),
  columnProperties: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentMessageColumnProperties)),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageTableCard" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageTableCard>;

export interface GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction {
  urlTypeHint?: "URL_TYPE_HINT_UNSPECIFIED" | "AMP_ACTION" | "AMP_CONTENT" | (string & {});
  url?: string;
}

export const GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction: Schema.Schema<GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction> = Schema.suspend(() => Schema.Struct({
  urlTypeHint: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction>;

export interface GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItem {
  footer?: string;
  openUriAction?: GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction;
  title?: string;
  description?: string;
  image?: GoogleCloudDialogflowV2IntentMessageImage;
}

export const GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItem: Schema.Schema<GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItem> = Schema.suspend(() => Schema.Struct({
  footer: Schema.optional(Schema.String),
  openUriAction: Schema.optional(GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  image: Schema.optional(GoogleCloudDialogflowV2IntentMessageImage),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItem" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItem>;

export interface GoogleCloudDialogflowV2IntentMessageBrowseCarouselCard {
  items?: Array<GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItem>;
  imageDisplayOptions?: "IMAGE_DISPLAY_OPTIONS_UNSPECIFIED" | "GRAY" | "WHITE" | "CROPPED" | "BLURRED_BACKGROUND" | (string & {});
}

export const GoogleCloudDialogflowV2IntentMessageBrowseCarouselCard: Schema.Schema<GoogleCloudDialogflowV2IntentMessageBrowseCarouselCard> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItem)),
  imageDisplayOptions: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageBrowseCarouselCard" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageBrowseCarouselCard>;

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

export interface GoogleCloudDialogflowV2IntentMessageMediaContentResponseMediaObject {
  name?: string;
  description?: string;
  icon?: GoogleCloudDialogflowV2IntentMessageImage;
  largeImage?: GoogleCloudDialogflowV2IntentMessageImage;
  contentUrl?: string;
}

export const GoogleCloudDialogflowV2IntentMessageMediaContentResponseMediaObject: Schema.Schema<GoogleCloudDialogflowV2IntentMessageMediaContentResponseMediaObject> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  icon: Schema.optional(GoogleCloudDialogflowV2IntentMessageImage),
  largeImage: Schema.optional(GoogleCloudDialogflowV2IntentMessageImage),
  contentUrl: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageMediaContentResponseMediaObject" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageMediaContentResponseMediaObject>;

export interface GoogleCloudDialogflowV2IntentMessageMediaContent {
  mediaObjects?: Array<GoogleCloudDialogflowV2IntentMessageMediaContentResponseMediaObject>;
  mediaType?: "RESPONSE_MEDIA_TYPE_UNSPECIFIED" | "AUDIO" | (string & {});
}

export const GoogleCloudDialogflowV2IntentMessageMediaContent: Schema.Schema<GoogleCloudDialogflowV2IntentMessageMediaContent> = Schema.suspend(() => Schema.Struct({
  mediaObjects: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentMessageMediaContentResponseMediaObject)),
  mediaType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageMediaContent" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageMediaContent>;

export interface GoogleCloudDialogflowV2IntentMessageSelectItemInfo {
  key?: string;
  synonyms?: Array<string>;
}

export const GoogleCloudDialogflowV2IntentMessageSelectItemInfo: Schema.Schema<GoogleCloudDialogflowV2IntentMessageSelectItemInfo> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  synonyms: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageSelectItemInfo" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageSelectItemInfo>;

export interface GoogleCloudDialogflowV2IntentMessageListSelectItem {
  description?: string;
  info?: GoogleCloudDialogflowV2IntentMessageSelectItemInfo;
  image?: GoogleCloudDialogflowV2IntentMessageImage;
  title?: string;
}

export const GoogleCloudDialogflowV2IntentMessageListSelectItem: Schema.Schema<GoogleCloudDialogflowV2IntentMessageListSelectItem> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  info: Schema.optional(GoogleCloudDialogflowV2IntentMessageSelectItemInfo),
  image: Schema.optional(GoogleCloudDialogflowV2IntentMessageImage),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageListSelectItem" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageListSelectItem>;

export interface GoogleCloudDialogflowV2IntentMessageListSelect {
  items?: Array<GoogleCloudDialogflowV2IntentMessageListSelectItem>;
  subtitle?: string;
  title?: string;
}

export const GoogleCloudDialogflowV2IntentMessageListSelect: Schema.Schema<GoogleCloudDialogflowV2IntentMessageListSelect> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentMessageListSelectItem)),
  subtitle: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageListSelect" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageListSelect>;

export interface GoogleCloudDialogflowV2IntentMessageSimpleResponse {
  textToSpeech?: string;
  displayText?: string;
  ssml?: string;
}

export const GoogleCloudDialogflowV2IntentMessageSimpleResponse: Schema.Schema<GoogleCloudDialogflowV2IntentMessageSimpleResponse> = Schema.suspend(() => Schema.Struct({
  textToSpeech: Schema.optional(Schema.String),
  displayText: Schema.optional(Schema.String),
  ssml: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageSimpleResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageSimpleResponse>;

export interface GoogleCloudDialogflowV2IntentMessageSimpleResponses {
  simpleResponses?: Array<GoogleCloudDialogflowV2IntentMessageSimpleResponse>;
}

export const GoogleCloudDialogflowV2IntentMessageSimpleResponses: Schema.Schema<GoogleCloudDialogflowV2IntentMessageSimpleResponses> = Schema.suspend(() => Schema.Struct({
  simpleResponses: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentMessageSimpleResponse)),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageSimpleResponses" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageSimpleResponses>;

export interface GoogleCloudDialogflowV2IntentMessageCarouselSelectItem {
  image?: GoogleCloudDialogflowV2IntentMessageImage;
  description?: string;
  info?: GoogleCloudDialogflowV2IntentMessageSelectItemInfo;
  title?: string;
}

export const GoogleCloudDialogflowV2IntentMessageCarouselSelectItem: Schema.Schema<GoogleCloudDialogflowV2IntentMessageCarouselSelectItem> = Schema.suspend(() => Schema.Struct({
  image: Schema.optional(GoogleCloudDialogflowV2IntentMessageImage),
  description: Schema.optional(Schema.String),
  info: Schema.optional(GoogleCloudDialogflowV2IntentMessageSelectItemInfo),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageCarouselSelectItem" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageCarouselSelectItem>;

export interface GoogleCloudDialogflowV2IntentMessageCarouselSelect {
  items?: Array<GoogleCloudDialogflowV2IntentMessageCarouselSelectItem>;
}

export const GoogleCloudDialogflowV2IntentMessageCarouselSelect: Schema.Schema<GoogleCloudDialogflowV2IntentMessageCarouselSelect> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentMessageCarouselSelectItem)),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessageCarouselSelect" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageCarouselSelect>;

export interface GoogleCloudDialogflowV2IntentMessage {
  text?: GoogleCloudDialogflowV2IntentMessageText;
  platform?: "PLATFORM_UNSPECIFIED" | "FACEBOOK" | "SLACK" | "TELEGRAM" | "KIK" | "SKYPE" | "LINE" | "VIBER" | "ACTIONS_ON_GOOGLE" | "GOOGLE_HANGOUTS" | (string & {});
  basicCard?: GoogleCloudDialogflowV2IntentMessageBasicCard;
  quickReplies?: GoogleCloudDialogflowV2IntentMessageQuickReplies;
  card?: GoogleCloudDialogflowV2IntentMessageCard;
  tableCard?: GoogleCloudDialogflowV2IntentMessageTableCard;
  browseCarouselCard?: GoogleCloudDialogflowV2IntentMessageBrowseCarouselCard;
  suggestions?: GoogleCloudDialogflowV2IntentMessageSuggestions;
  linkOutSuggestion?: GoogleCloudDialogflowV2IntentMessageLinkOutSuggestion;
  mediaContent?: GoogleCloudDialogflowV2IntentMessageMediaContent;
  listSelect?: GoogleCloudDialogflowV2IntentMessageListSelect;
  simpleResponses?: GoogleCloudDialogflowV2IntentMessageSimpleResponses;
  carouselSelect?: GoogleCloudDialogflowV2IntentMessageCarouselSelect;
  payload?: Record<string, unknown>;
  image?: GoogleCloudDialogflowV2IntentMessageImage;
}

export const GoogleCloudDialogflowV2IntentMessage: Schema.Schema<GoogleCloudDialogflowV2IntentMessage> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(GoogleCloudDialogflowV2IntentMessageText),
  platform: Schema.optional(Schema.String),
  basicCard: Schema.optional(GoogleCloudDialogflowV2IntentMessageBasicCard),
  quickReplies: Schema.optional(GoogleCloudDialogflowV2IntentMessageQuickReplies),
  card: Schema.optional(GoogleCloudDialogflowV2IntentMessageCard),
  tableCard: Schema.optional(GoogleCloudDialogflowV2IntentMessageTableCard),
  browseCarouselCard: Schema.optional(GoogleCloudDialogflowV2IntentMessageBrowseCarouselCard),
  suggestions: Schema.optional(GoogleCloudDialogflowV2IntentMessageSuggestions),
  linkOutSuggestion: Schema.optional(GoogleCloudDialogflowV2IntentMessageLinkOutSuggestion),
  mediaContent: Schema.optional(GoogleCloudDialogflowV2IntentMessageMediaContent),
  listSelect: Schema.optional(GoogleCloudDialogflowV2IntentMessageListSelect),
  simpleResponses: Schema.optional(GoogleCloudDialogflowV2IntentMessageSimpleResponses),
  carouselSelect: Schema.optional(GoogleCloudDialogflowV2IntentMessageCarouselSelect),
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  image: Schema.optional(GoogleCloudDialogflowV2IntentMessageImage),
})).annotate({ identifier: "GoogleCloudDialogflowV2IntentMessage" }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessage>;

export interface GoogleCloudDialogflowV2Intent {
  resetContexts?: boolean;
  mlDisabled?: boolean;
  rootFollowupIntentName?: string;
  outputContexts?: Array<GoogleCloudDialogflowV2Context>;
  isFallback?: boolean;
  parentFollowupIntentName?: string;
  events?: Array<string>;
  liveAgentHandoff?: boolean;
  inputContextNames?: Array<string>;
  parameters?: Array<GoogleCloudDialogflowV2IntentParameter>;
  action?: string;
  priority?: number;
  trainingPhrases?: Array<GoogleCloudDialogflowV2IntentTrainingPhrase>;
  name?: string;
  displayName?: string;
  followupIntentInfo?: Array<GoogleCloudDialogflowV2IntentFollowupIntentInfo>;
  defaultResponsePlatforms?: Array<"PLATFORM_UNSPECIFIED" | "FACEBOOK" | "SLACK" | "TELEGRAM" | "KIK" | "SKYPE" | "LINE" | "VIBER" | "ACTIONS_ON_GOOGLE" | "GOOGLE_HANGOUTS" | (string & {})>;
  messages?: Array<GoogleCloudDialogflowV2IntentMessage>;
  webhookState?: "WEBHOOK_STATE_UNSPECIFIED" | "WEBHOOK_STATE_ENABLED" | "WEBHOOK_STATE_ENABLED_FOR_SLOT_FILLING" | (string & {});
  endInteraction?: boolean;
}

export const GoogleCloudDialogflowV2Intent: Schema.Schema<GoogleCloudDialogflowV2Intent> = Schema.suspend(() => Schema.Struct({
  resetContexts: Schema.optional(Schema.Boolean),
  mlDisabled: Schema.optional(Schema.Boolean),
  rootFollowupIntentName: Schema.optional(Schema.String),
  outputContexts: Schema.optional(Schema.Array(GoogleCloudDialogflowV2Context)),
  isFallback: Schema.optional(Schema.Boolean),
  parentFollowupIntentName: Schema.optional(Schema.String),
  events: Schema.optional(Schema.Array(Schema.String)),
  liveAgentHandoff: Schema.optional(Schema.Boolean),
  inputContextNames: Schema.optional(Schema.Array(Schema.String)),
  parameters: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentParameter)),
  action: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.Number),
  trainingPhrases: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentTrainingPhrase)),
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  followupIntentInfo: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentFollowupIntentInfo)),
  defaultResponsePlatforms: Schema.optional(Schema.Array(Schema.String)),
  messages: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentMessage)),
  webhookState: Schema.optional(Schema.String),
  endInteraction: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2Intent" }) as any as Schema.Schema<GoogleCloudDialogflowV2Intent>;

export interface GoogleCloudDialogflowV2KnowledgeAssistAnswerSuggestedQuery {
  queryText?: string;
}

export const GoogleCloudDialogflowV2KnowledgeAssistAnswerSuggestedQuery: Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerSuggestedQuery> = Schema.suspend(() => Schema.Struct({
  queryText: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2KnowledgeAssistAnswerSuggestedQuery" }) as any as Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerSuggestedQuery>;

export interface GoogleCloudDialogflowV2beta1IntentMessageImage {
  accessibilityText?: string;
  imageUri?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageImage: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageImage> = Schema.suspend(() => Schema.Struct({
  accessibilityText: Schema.optional(Schema.String),
  imageUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageImage" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageImage>;

export interface GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction {
  url?: string;
  urlTypeHint?: "URL_TYPE_HINT_UNSPECIFIED" | "AMP_ACTION" | "AMP_CONTENT" | (string & {});
}

export const GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  urlTypeHint: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction>;

export interface GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItem {
  description?: string;
  footer?: string;
  image?: GoogleCloudDialogflowV2beta1IntentMessageImage;
  openUriAction?: GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction;
  title?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItem: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItem> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  footer: Schema.optional(Schema.String),
  image: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageImage),
  openUriAction: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItem" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItem>;

export interface GoogleCloudDialogflowCxV3SentimentAnalysisResult {
  magnitude?: number;
  score?: number;
}

export const GoogleCloudDialogflowCxV3SentimentAnalysisResult: Schema.Schema<GoogleCloudDialogflowCxV3SentimentAnalysisResult> = Schema.suspend(() => Schema.Struct({
  magnitude: Schema.optional(Schema.Number),
  score: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3SentimentAnalysisResult" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SentimentAnalysisResult>;

export interface GoogleCloudDialogflowV2beta1SpeechWordInfo {
  confidence?: number;
  word?: string;
  startOffset?: string;
  endOffset?: string;
}

export const GoogleCloudDialogflowV2beta1SpeechWordInfo: Schema.Schema<GoogleCloudDialogflowV2beta1SpeechWordInfo> = Schema.suspend(() => Schema.Struct({
  confidence: Schema.optional(Schema.Number),
  word: Schema.optional(Schema.String),
  startOffset: Schema.optional(Schema.String),
  endOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SpeechWordInfo" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SpeechWordInfo>;

export interface GoogleCloudDialogflowV2GcsDestination {
  uri?: string;
}

export const GoogleCloudDialogflowV2GcsDestination: Schema.Schema<GoogleCloudDialogflowV2GcsDestination> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2GcsDestination" }) as any as Schema.Schema<GoogleCloudDialogflowV2GcsDestination>;

export interface GoogleCloudDialogflowV2EntityTypeEntity {
  value?: string;
  synonyms?: Array<string>;
}

export const GoogleCloudDialogflowV2EntityTypeEntity: Schema.Schema<GoogleCloudDialogflowV2EntityTypeEntity> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  synonyms: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2EntityTypeEntity" }) as any as Schema.Schema<GoogleCloudDialogflowV2EntityTypeEntity>;

export interface GoogleCloudDialogflowV2SessionEntityType {
  name?: string;
  entities?: Array<GoogleCloudDialogflowV2EntityTypeEntity>;
  entityOverrideMode?: "ENTITY_OVERRIDE_MODE_UNSPECIFIED" | "ENTITY_OVERRIDE_MODE_OVERRIDE" | "ENTITY_OVERRIDE_MODE_SUPPLEMENT" | (string & {});
}

export const GoogleCloudDialogflowV2SessionEntityType: Schema.Schema<GoogleCloudDialogflowV2SessionEntityType> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  entities: Schema.optional(Schema.Array(GoogleCloudDialogflowV2EntityTypeEntity)),
  entityOverrideMode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2SessionEntityType" }) as any as Schema.Schema<GoogleCloudDialogflowV2SessionEntityType>;

export interface GoogleCloudDialogflowCxV3LlmModelSettings {
  model?: string;
  promptText?: string;
}

export const GoogleCloudDialogflowCxV3LlmModelSettings: Schema.Schema<GoogleCloudDialogflowCxV3LlmModelSettings> = Schema.suspend(() => Schema.Struct({
  model: Schema.optional(Schema.String),
  promptText: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3LlmModelSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3LlmModelSettings>;

export interface GoogleCloudDialogflowCxV3SafetySettingsPhrase {
  text?: string;
  languageCode?: string;
}

export const GoogleCloudDialogflowCxV3SafetySettingsPhrase: Schema.Schema<GoogleCloudDialogflowCxV3SafetySettingsPhrase> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3SafetySettingsPhrase" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SafetySettingsPhrase>;

export interface GoogleCloudDialogflowCxV3SafetySettingsRaiSettingsCategoryFilter {
  category?: "SAFETY_CATEGORY_UNSPECIFIED" | "DANGEROUS_CONTENT" | "HATE_SPEECH" | "HARASSMENT" | "SEXUALLY_EXPLICIT_CONTENT" | (string & {});
  filterLevel?: "SAFETY_FILTER_LEVEL_UNSPECIFIED" | "BLOCK_NONE" | "BLOCK_FEW" | "BLOCK_SOME" | "BLOCK_MOST" | (string & {});
}

export const GoogleCloudDialogflowCxV3SafetySettingsRaiSettingsCategoryFilter: Schema.Schema<GoogleCloudDialogflowCxV3SafetySettingsRaiSettingsCategoryFilter> = Schema.suspend(() => Schema.Struct({
  category: Schema.optional(Schema.String),
  filterLevel: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3SafetySettingsRaiSettingsCategoryFilter" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SafetySettingsRaiSettingsCategoryFilter>;

export interface GoogleCloudDialogflowCxV3SafetySettingsRaiSettings {
  categoryFilters?: Array<GoogleCloudDialogflowCxV3SafetySettingsRaiSettingsCategoryFilter>;
}

export const GoogleCloudDialogflowCxV3SafetySettingsRaiSettings: Schema.Schema<GoogleCloudDialogflowCxV3SafetySettingsRaiSettings> = Schema.suspend(() => Schema.Struct({
  categoryFilters: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3SafetySettingsRaiSettingsCategoryFilter)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3SafetySettingsRaiSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SafetySettingsRaiSettings>;

export interface GoogleCloudDialogflowCxV3SafetySettingsPromptSecuritySettings {
  enablePromptSecurity?: boolean;
}

export const GoogleCloudDialogflowCxV3SafetySettingsPromptSecuritySettings: Schema.Schema<GoogleCloudDialogflowCxV3SafetySettingsPromptSecuritySettings> = Schema.suspend(() => Schema.Struct({
  enablePromptSecurity: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3SafetySettingsPromptSecuritySettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SafetySettingsPromptSecuritySettings>;

export interface GoogleCloudDialogflowCxV3SafetySettings {
  bannedPhrases?: Array<GoogleCloudDialogflowCxV3SafetySettingsPhrase>;
  defaultRaiSettings?: GoogleCloudDialogflowCxV3SafetySettingsRaiSettings;
  raiSettings?: GoogleCloudDialogflowCxV3SafetySettingsRaiSettings;
  defaultBannedPhraseMatchStrategy?: "PHRASE_MATCH_STRATEGY_UNSPECIFIED" | "PARTIAL_MATCH" | "WORD_MATCH" | (string & {});
  promptSecuritySettings?: GoogleCloudDialogflowCxV3SafetySettingsPromptSecuritySettings;
}

export const GoogleCloudDialogflowCxV3SafetySettings: Schema.Schema<GoogleCloudDialogflowCxV3SafetySettings> = Schema.suspend(() => Schema.Struct({
  bannedPhrases: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3SafetySettingsPhrase)),
  defaultRaiSettings: Schema.optional(GoogleCloudDialogflowCxV3SafetySettingsRaiSettings),
  raiSettings: Schema.optional(GoogleCloudDialogflowCxV3SafetySettingsRaiSettings),
  defaultBannedPhraseMatchStrategy: Schema.optional(Schema.String),
  promptSecuritySettings: Schema.optional(GoogleCloudDialogflowCxV3SafetySettingsPromptSecuritySettings),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3SafetySettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SafetySettings>;

export interface GoogleCloudDialogflowCxV3GenerativeSettingsKnowledgeConnectorSettings {
  businessDescription?: string;
  disableDataStoreFallback?: boolean;
  business?: string;
  agentScope?: string;
  agent?: string;
  agentIdentity?: string;
}

export const GoogleCloudDialogflowCxV3GenerativeSettingsKnowledgeConnectorSettings: Schema.Schema<GoogleCloudDialogflowCxV3GenerativeSettingsKnowledgeConnectorSettings> = Schema.suspend(() => Schema.Struct({
  businessDescription: Schema.optional(Schema.String),
  disableDataStoreFallback: Schema.optional(Schema.Boolean),
  business: Schema.optional(Schema.String),
  agentScope: Schema.optional(Schema.String),
  agent: Schema.optional(Schema.String),
  agentIdentity: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3GenerativeSettingsKnowledgeConnectorSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3GenerativeSettingsKnowledgeConnectorSettings>;

export interface GoogleCloudDialogflowCxV3GenerativeSettingsFallbackSettingsPromptTemplate {
  displayName?: string;
  promptText?: string;
  frozen?: boolean;
}

export const GoogleCloudDialogflowCxV3GenerativeSettingsFallbackSettingsPromptTemplate: Schema.Schema<GoogleCloudDialogflowCxV3GenerativeSettingsFallbackSettingsPromptTemplate> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  promptText: Schema.optional(Schema.String),
  frozen: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3GenerativeSettingsFallbackSettingsPromptTemplate" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3GenerativeSettingsFallbackSettingsPromptTemplate>;

export interface GoogleCloudDialogflowCxV3GenerativeSettingsFallbackSettings {
  selectedPrompt?: string;
  promptTemplates?: Array<GoogleCloudDialogflowCxV3GenerativeSettingsFallbackSettingsPromptTemplate>;
}

export const GoogleCloudDialogflowCxV3GenerativeSettingsFallbackSettings: Schema.Schema<GoogleCloudDialogflowCxV3GenerativeSettingsFallbackSettings> = Schema.suspend(() => Schema.Struct({
  selectedPrompt: Schema.optional(Schema.String),
  promptTemplates: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3GenerativeSettingsFallbackSettingsPromptTemplate)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3GenerativeSettingsFallbackSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3GenerativeSettingsFallbackSettings>;

export interface GoogleCloudDialogflowCxV3GenerativeSettings {
  llmModelSettings?: GoogleCloudDialogflowCxV3LlmModelSettings;
  languageCode?: string;
  name?: string;
  generativeSafetySettings?: GoogleCloudDialogflowCxV3SafetySettings;
  knowledgeConnectorSettings?: GoogleCloudDialogflowCxV3GenerativeSettingsKnowledgeConnectorSettings;
  fallbackSettings?: GoogleCloudDialogflowCxV3GenerativeSettingsFallbackSettings;
}

export const GoogleCloudDialogflowCxV3GenerativeSettings: Schema.Schema<GoogleCloudDialogflowCxV3GenerativeSettings> = Schema.suspend(() => Schema.Struct({
  llmModelSettings: Schema.optional(GoogleCloudDialogflowCxV3LlmModelSettings),
  languageCode: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  generativeSafetySettings: Schema.optional(GoogleCloudDialogflowCxV3SafetySettings),
  knowledgeConnectorSettings: Schema.optional(GoogleCloudDialogflowCxV3GenerativeSettingsKnowledgeConnectorSettings),
  fallbackSettings: Schema.optional(GoogleCloudDialogflowCxV3GenerativeSettingsFallbackSettings),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3GenerativeSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3GenerativeSettings>;

export interface GoogleCloudDialogflowV2ArticleAnswer {
  uri?: string;
  snippets?: Array<string>;
  title?: string;
  answerRecord?: string;
  confidence?: number;
  metadata?: Record<string, string>;
}

export const GoogleCloudDialogflowV2ArticleAnswer: Schema.Schema<GoogleCloudDialogflowV2ArticleAnswer> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  snippets: Schema.optional(Schema.Array(Schema.String)),
  title: Schema.optional(Schema.String),
  answerRecord: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2ArticleAnswer" }) as any as Schema.Schema<GoogleCloudDialogflowV2ArticleAnswer>;

export interface GoogleCloudDialogflowV2SuggestArticlesResponse {
  contextSize?: number;
  articleAnswers?: Array<GoogleCloudDialogflowV2ArticleAnswer>;
  latestMessage?: string;
}

export const GoogleCloudDialogflowV2SuggestArticlesResponse: Schema.Schema<GoogleCloudDialogflowV2SuggestArticlesResponse> = Schema.suspend(() => Schema.Struct({
  contextSize: Schema.optional(Schema.Number),
  articleAnswers: Schema.optional(Schema.Array(GoogleCloudDialogflowV2ArticleAnswer)),
  latestMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2SuggestArticlesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2SuggestArticlesResponse>;

export interface GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerFaqSource {
  question?: string;
}

export const GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerFaqSource: Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerFaqSource> = Schema.suspend(() => Schema.Struct({
  question: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerFaqSource" }) as any as Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerFaqSource>;

export interface GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet {
  title?: string;
  text?: string;
  uri?: string;
  metadata?: Record<string, unknown>;
}

export const GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet: Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  text: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet" }) as any as Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet>;

export interface GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource {
  snippets?: Array<GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet>;
}

export const GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource: Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource> = Schema.suspend(() => Schema.Struct({
  snippets: Schema.optional(Schema.Array(GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet)),
})).annotate({ identifier: "GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource" }) as any as Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource>;

export interface GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswer {
  faqSource?: GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerFaqSource;
  answerText?: string;
  generativeSource?: GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource;
}

export const GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswer: Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswer> = Schema.suspend(() => Schema.Struct({
  faqSource: Schema.optional(GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerFaqSource),
  answerText: Schema.optional(Schema.String),
  generativeSource: Schema.optional(GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource),
})).annotate({ identifier: "GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswer" }) as any as Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswer>;

export interface GoogleCloudDialogflowV2IngestedContextReferenceDebugInfoIngestedParameterDebugInfo {
  ingestionStatus?: "INGESTION_STATUS_UNSPECIFIED" | "INGESTION_STATUS_SUCCEEDED" | "INGESTION_STATUS_CONTEXT_NOT_AVAILABLE" | "INGESTION_STATUS_PARSE_FAILED" | "INGESTION_STATUS_INVALID_ENTRY" | "INGESTION_STATUS_INVALID_FORMAT" | "INGESTION_STATUS_LANGUAGE_MISMATCH" | (string & {});
  parameter?: string;
}

export const GoogleCloudDialogflowV2IngestedContextReferenceDebugInfoIngestedParameterDebugInfo: Schema.Schema<GoogleCloudDialogflowV2IngestedContextReferenceDebugInfoIngestedParameterDebugInfo> = Schema.suspend(() => Schema.Struct({
  ingestionStatus: Schema.optional(Schema.String),
  parameter: Schema.optional(Schema.String),
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

export interface GoogleCloudDialogflowV2KnowledgeAssistDebugInfoKnowledgeAssistBehavior {
  queryGenerationEndUserLanguageMismatch?: boolean;
  previousQueriesIncluded?: boolean;
  appendedSearchContextCount?: number;
  thirdPartyConnectorAllowed?: boolean;
  multipleQueriesGenerated?: boolean;
  queryGenerationAgentLanguageMismatch?: boolean;
  disableSyncDelivery?: boolean;
  useTranslatedMessage?: boolean;
  usePubsubDelivery?: boolean;
  invalidItemsQuerySuggestionSkipped?: boolean;
  conversationTranscriptHasMixedLanguages?: boolean;
  endUserMetadataIncluded?: boolean;
  useCustomSafetyFilterLevel?: boolean;
  returnQueryOnly?: boolean;
  primaryQueryRedactedAndReplaced?: boolean;
  queryContainedSearchContext?: boolean;
  answerGenerationRewriterOn?: boolean;
}

export const GoogleCloudDialogflowV2KnowledgeAssistDebugInfoKnowledgeAssistBehavior: Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistDebugInfoKnowledgeAssistBehavior> = Schema.suspend(() => Schema.Struct({
  queryGenerationEndUserLanguageMismatch: Schema.optional(Schema.Boolean),
  previousQueriesIncluded: Schema.optional(Schema.Boolean),
  appendedSearchContextCount: Schema.optional(Schema.Number),
  thirdPartyConnectorAllowed: Schema.optional(Schema.Boolean),
  multipleQueriesGenerated: Schema.optional(Schema.Boolean),
  queryGenerationAgentLanguageMismatch: Schema.optional(Schema.Boolean),
  disableSyncDelivery: Schema.optional(Schema.Boolean),
  useTranslatedMessage: Schema.optional(Schema.Boolean),
  usePubsubDelivery: Schema.optional(Schema.Boolean),
  invalidItemsQuerySuggestionSkipped: Schema.optional(Schema.Boolean),
  conversationTranscriptHasMixedLanguages: Schema.optional(Schema.Boolean),
  endUserMetadataIncluded: Schema.optional(Schema.Boolean),
  useCustomSafetyFilterLevel: Schema.optional(Schema.Boolean),
  returnQueryOnly: Schema.optional(Schema.Boolean),
  primaryQueryRedactedAndReplaced: Schema.optional(Schema.Boolean),
  queryContainedSearchContext: Schema.optional(Schema.Boolean),
  answerGenerationRewriterOn: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2KnowledgeAssistDebugInfoKnowledgeAssistBehavior" }) as any as Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistDebugInfoKnowledgeAssistBehavior>;

export interface GoogleCloudDialogflowV2ServiceLatency {
  internalServiceLatencies?: Array<GoogleCloudDialogflowV2ServiceLatencyInternalServiceLatency>;
}

export const GoogleCloudDialogflowV2ServiceLatency: Schema.Schema<GoogleCloudDialogflowV2ServiceLatency> = Schema.suspend(() => Schema.Struct({
  internalServiceLatencies: Schema.optional(Schema.Array(GoogleCloudDialogflowV2ServiceLatencyInternalServiceLatency)),
})).annotate({ identifier: "GoogleCloudDialogflowV2ServiceLatency" }) as any as Schema.Schema<GoogleCloudDialogflowV2ServiceLatency>;

export interface GoogleCloudDialogflowV2KnowledgeAssistDebugInfo {
  queryCategorizationFailureReason?: "QUERY_CATEGORIZATION_FAILURE_REASON_UNSPECIFIED" | "QUERY_CATEGORIZATION_INVALID_CONFIG" | "QUERY_CATEGORIZATION_RESULT_NOT_FOUND" | "QUERY_CATEGORIZATION_FAILED" | (string & {});
  datastoreResponseReason?: "DATASTORE_RESPONSE_REASON_UNSPECIFIED" | "NONE" | "SEARCH_OUT_OF_QUOTA" | "SEARCH_EMPTY_RESULTS" | "ANSWER_GENERATION_GEN_AI_DISABLED" | "ANSWER_GENERATION_OUT_OF_QUOTA" | "ANSWER_GENERATION_ERROR" | "ANSWER_GENERATION_NOT_ENOUGH_INFO" | "ANSWER_GENERATION_RAI_FAILED" | "ANSWER_GENERATION_NOT_GROUNDED" | (string & {});
  queryGenerationFailureReason?: "QUERY_GENERATION_FAILURE_REASON_UNSPECIFIED" | "QUERY_GENERATION_OUT_OF_QUOTA" | "QUERY_GENERATION_FAILED" | "QUERY_GENERATION_NO_QUERY_GENERATED" | "QUERY_GENERATION_RAI_FAILED" | "NOT_IN_ALLOWLIST" | "QUERY_GENERATION_QUERY_REDACTED" | "QUERY_GENERATION_LLM_RESPONSE_PARSE_FAILED" | "QUERY_GENERATION_EMPTY_CONVERSATION" | "QUERY_GENERATION_EMPTY_LAST_MESSAGE" | "QUERY_GENERATION_TRIGGERING_EVENT_CONDITION_NOT_MET" | (string & {});
  ingestedContextReferenceDebugInfo?: GoogleCloudDialogflowV2IngestedContextReferenceDebugInfo;
  knowledgeAssistBehavior?: GoogleCloudDialogflowV2KnowledgeAssistDebugInfoKnowledgeAssistBehavior;
  serviceLatency?: GoogleCloudDialogflowV2ServiceLatency;
}

export const GoogleCloudDialogflowV2KnowledgeAssistDebugInfo: Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistDebugInfo> = Schema.suspend(() => Schema.Struct({
  queryCategorizationFailureReason: Schema.optional(Schema.String),
  datastoreResponseReason: Schema.optional(Schema.String),
  queryGenerationFailureReason: Schema.optional(Schema.String),
  ingestedContextReferenceDebugInfo: Schema.optional(GoogleCloudDialogflowV2IngestedContextReferenceDebugInfo),
  knowledgeAssistBehavior: Schema.optional(GoogleCloudDialogflowV2KnowledgeAssistDebugInfoKnowledgeAssistBehavior),
  serviceLatency: Schema.optional(GoogleCloudDialogflowV2ServiceLatency),
})).annotate({ identifier: "GoogleCloudDialogflowV2KnowledgeAssistDebugInfo" }) as any as Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistDebugInfo>;

export interface GoogleCloudDialogflowV2KnowledgeAssistAnswer {
  answerRecord?: string;
  suggestedQueryAnswer?: GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswer;
  knowledgeAssistDebugInfo?: GoogleCloudDialogflowV2KnowledgeAssistDebugInfo;
  suggestedQuery?: GoogleCloudDialogflowV2KnowledgeAssistAnswerSuggestedQuery;
}

export const GoogleCloudDialogflowV2KnowledgeAssistAnswer: Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswer> = Schema.suspend(() => Schema.Struct({
  answerRecord: Schema.optional(Schema.String),
  suggestedQueryAnswer: Schema.optional(GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswer),
  knowledgeAssistDebugInfo: Schema.optional(GoogleCloudDialogflowV2KnowledgeAssistDebugInfo),
  suggestedQuery: Schema.optional(GoogleCloudDialogflowV2KnowledgeAssistAnswerSuggestedQuery),
})).annotate({ identifier: "GoogleCloudDialogflowV2KnowledgeAssistAnswer" }) as any as Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswer>;

export interface GoogleCloudDialogflowV2SuggestKnowledgeAssistResponse {
  knowledgeAssistAnswer?: GoogleCloudDialogflowV2KnowledgeAssistAnswer;
  contextSize?: number;
  latestMessage?: string;
}

export const GoogleCloudDialogflowV2SuggestKnowledgeAssistResponse: Schema.Schema<GoogleCloudDialogflowV2SuggestKnowledgeAssistResponse> = Schema.suspend(() => Schema.Struct({
  knowledgeAssistAnswer: Schema.optional(GoogleCloudDialogflowV2KnowledgeAssistAnswer),
  contextSize: Schema.optional(Schema.Number),
  latestMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2SuggestKnowledgeAssistResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2SuggestKnowledgeAssistResponse>;

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

export interface GoogleCloudDialogflowV2ToolCall {
  action?: string;
  toolDisplayName?: string;
  inputParameters?: Record<string, unknown>;
  state?: "STATE_UNSPECIFIED" | "TRIGGERED" | "NEEDS_CONFIRMATION" | (string & {});
  answerRecord?: string;
  tool?: string;
  toolDisplayDetails?: string;
  createTime?: string;
}

export const GoogleCloudDialogflowV2ToolCall: Schema.Schema<GoogleCloudDialogflowV2ToolCall> = Schema.suspend(() => Schema.Struct({
  action: Schema.optional(Schema.String),
  toolDisplayName: Schema.optional(Schema.String),
  inputParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  state: Schema.optional(Schema.String),
  answerRecord: Schema.optional(Schema.String),
  tool: Schema.optional(Schema.String),
  toolDisplayDetails: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2ToolCall" }) as any as Schema.Schema<GoogleCloudDialogflowV2ToolCall>;

export interface GoogleCloudDialogflowV2ToolCallResultError {
  message?: string;
}

export const GoogleCloudDialogflowV2ToolCallResultError: Schema.Schema<GoogleCloudDialogflowV2ToolCallResultError> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2ToolCallResultError" }) as any as Schema.Schema<GoogleCloudDialogflowV2ToolCallResultError>;

export interface GoogleCloudDialogflowV2ToolCallResult {
  rawContent?: string;
  error?: GoogleCloudDialogflowV2ToolCallResultError;
  content?: string;
  answerRecord?: string;
  tool?: string;
  action?: string;
  createTime?: string;
}

export const GoogleCloudDialogflowV2ToolCallResult: Schema.Schema<GoogleCloudDialogflowV2ToolCallResult> = Schema.suspend(() => Schema.Struct({
  rawContent: Schema.optional(Schema.String),
  error: Schema.optional(GoogleCloudDialogflowV2ToolCallResultError),
  content: Schema.optional(Schema.String),
  answerRecord: Schema.optional(Schema.String),
  tool: Schema.optional(Schema.String),
  action: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2ToolCallResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2ToolCallResult>;

export interface GoogleCloudDialogflowV2GeneratorSuggestionToolCallInfo {
  toolCall?: GoogleCloudDialogflowV2ToolCall;
  toolCallResult?: GoogleCloudDialogflowV2ToolCallResult;
}

export const GoogleCloudDialogflowV2GeneratorSuggestionToolCallInfo: Schema.Schema<GoogleCloudDialogflowV2GeneratorSuggestionToolCallInfo> = Schema.suspend(() => Schema.Struct({
  toolCall: Schema.optional(GoogleCloudDialogflowV2ToolCall),
  toolCallResult: Schema.optional(GoogleCloudDialogflowV2ToolCallResult),
})).annotate({ identifier: "GoogleCloudDialogflowV2GeneratorSuggestionToolCallInfo" }) as any as Schema.Schema<GoogleCloudDialogflowV2GeneratorSuggestionToolCallInfo>;

export interface GoogleCloudDialogflowV2FreeFormSuggestion {
  response?: string;
}

export const GoogleCloudDialogflowV2FreeFormSuggestion: Schema.Schema<GoogleCloudDialogflowV2FreeFormSuggestion> = Schema.suspend(() => Schema.Struct({
  response: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2FreeFormSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2FreeFormSuggestion>;

export interface GoogleCloudDialogflowV2GeneratorSuggestion {
  agentCoachingSuggestion?: GoogleCloudDialogflowV2AgentCoachingSuggestion;
  summarySuggestion?: GoogleCloudDialogflowV2SummarySuggestion;
  toolCallInfo?: Array<GoogleCloudDialogflowV2GeneratorSuggestionToolCallInfo>;
  freeFormSuggestion?: GoogleCloudDialogflowV2FreeFormSuggestion;
}

export const GoogleCloudDialogflowV2GeneratorSuggestion: Schema.Schema<GoogleCloudDialogflowV2GeneratorSuggestion> = Schema.suspend(() => Schema.Struct({
  agentCoachingSuggestion: Schema.optional(GoogleCloudDialogflowV2AgentCoachingSuggestion),
  summarySuggestion: Schema.optional(GoogleCloudDialogflowV2SummarySuggestion),
  toolCallInfo: Schema.optional(Schema.Array(GoogleCloudDialogflowV2GeneratorSuggestionToolCallInfo)),
  freeFormSuggestion: Schema.optional(GoogleCloudDialogflowV2FreeFormSuggestion),
})).annotate({ identifier: "GoogleCloudDialogflowV2GeneratorSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2GeneratorSuggestion>;

export interface GoogleCloudDialogflowV2GenerateSuggestionsResponseGeneratorSuggestionAnswer {
  answerRecord?: string;
  generatorSuggestion?: GoogleCloudDialogflowV2GeneratorSuggestion;
  sourceGenerator?: string;
}

export const GoogleCloudDialogflowV2GenerateSuggestionsResponseGeneratorSuggestionAnswer: Schema.Schema<GoogleCloudDialogflowV2GenerateSuggestionsResponseGeneratorSuggestionAnswer> = Schema.suspend(() => Schema.Struct({
  answerRecord: Schema.optional(Schema.String),
  generatorSuggestion: Schema.optional(GoogleCloudDialogflowV2GeneratorSuggestion),
  sourceGenerator: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2GenerateSuggestionsResponseGeneratorSuggestionAnswer" }) as any as Schema.Schema<GoogleCloudDialogflowV2GenerateSuggestionsResponseGeneratorSuggestionAnswer>;

export interface GoogleCloudDialogflowV2GenerateSuggestionsResponse {
  latestMessage?: string;
  generatorSuggestionAnswers?: Array<GoogleCloudDialogflowV2GenerateSuggestionsResponseGeneratorSuggestionAnswer>;
}

export const GoogleCloudDialogflowV2GenerateSuggestionsResponse: Schema.Schema<GoogleCloudDialogflowV2GenerateSuggestionsResponse> = Schema.suspend(() => Schema.Struct({
  latestMessage: Schema.optional(Schema.String),
  generatorSuggestionAnswers: Schema.optional(Schema.Array(GoogleCloudDialogflowV2GenerateSuggestionsResponseGeneratorSuggestionAnswer)),
})).annotate({ identifier: "GoogleCloudDialogflowV2GenerateSuggestionsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2GenerateSuggestionsResponse>;

export interface GoogleRpcStatus {
  details?: Array<Record<string, unknown>>;
  code?: number;
  message?: string;
}

export const GoogleRpcStatus: Schema.Schema<GoogleRpcStatus> = Schema.suspend(() => Schema.Struct({
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleRpcStatus" }) as any as Schema.Schema<GoogleRpcStatus>;

export interface GoogleCloudDialogflowV2SmartReplyAnswer {
  answerRecord?: string;
  confidence?: number;
  reply?: string;
}

export const GoogleCloudDialogflowV2SmartReplyAnswer: Schema.Schema<GoogleCloudDialogflowV2SmartReplyAnswer> = Schema.suspend(() => Schema.Struct({
  answerRecord: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  reply: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2SmartReplyAnswer" }) as any as Schema.Schema<GoogleCloudDialogflowV2SmartReplyAnswer>;

export interface GoogleCloudDialogflowV2SuggestSmartRepliesResponse {
  smartReplyAnswers?: Array<GoogleCloudDialogflowV2SmartReplyAnswer>;
  contextSize?: number;
  latestMessage?: string;
}

export const GoogleCloudDialogflowV2SuggestSmartRepliesResponse: Schema.Schema<GoogleCloudDialogflowV2SuggestSmartRepliesResponse> = Schema.suspend(() => Schema.Struct({
  smartReplyAnswers: Schema.optional(Schema.Array(GoogleCloudDialogflowV2SmartReplyAnswer)),
  contextSize: Schema.optional(Schema.Number),
  latestMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2SuggestSmartRepliesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2SuggestSmartRepliesResponse>;

export interface GoogleCloudDialogflowV2FaqAnswer {
  metadata?: Record<string, string>;
  answer?: string;
  confidence?: number;
  source?: string;
  question?: string;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2FaqAnswer: Schema.Schema<GoogleCloudDialogflowV2FaqAnswer> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  answer: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  source: Schema.optional(Schema.String),
  question: Schema.optional(Schema.String),
  answerRecord: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2FaqAnswer" }) as any as Schema.Schema<GoogleCloudDialogflowV2FaqAnswer>;

export interface GoogleCloudDialogflowV2SuggestFaqAnswersResponse {
  latestMessage?: string;
  contextSize?: number;
  faqAnswers?: Array<GoogleCloudDialogflowV2FaqAnswer>;
}

export const GoogleCloudDialogflowV2SuggestFaqAnswersResponse: Schema.Schema<GoogleCloudDialogflowV2SuggestFaqAnswersResponse> = Schema.suspend(() => Schema.Struct({
  latestMessage: Schema.optional(Schema.String),
  contextSize: Schema.optional(Schema.Number),
  faqAnswers: Schema.optional(Schema.Array(GoogleCloudDialogflowV2FaqAnswer)),
})).annotate({ identifier: "GoogleCloudDialogflowV2SuggestFaqAnswersResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2SuggestFaqAnswersResponse>;

export interface GoogleCloudDialogflowV2SuggestionResult {
  suggestArticlesResponse?: GoogleCloudDialogflowV2SuggestArticlesResponse;
  suggestKnowledgeAssistResponse?: GoogleCloudDialogflowV2SuggestKnowledgeAssistResponse;
  generateSuggestionsResponse?: GoogleCloudDialogflowV2GenerateSuggestionsResponse;
  error?: GoogleRpcStatus;
  suggestSmartRepliesResponse?: GoogleCloudDialogflowV2SuggestSmartRepliesResponse;
  suggestFaqAnswersResponse?: GoogleCloudDialogflowV2SuggestFaqAnswersResponse;
}

export const GoogleCloudDialogflowV2SuggestionResult: Schema.Schema<GoogleCloudDialogflowV2SuggestionResult> = Schema.suspend(() => Schema.Struct({
  suggestArticlesResponse: Schema.optional(GoogleCloudDialogflowV2SuggestArticlesResponse),
  suggestKnowledgeAssistResponse: Schema.optional(GoogleCloudDialogflowV2SuggestKnowledgeAssistResponse),
  generateSuggestionsResponse: Schema.optional(GoogleCloudDialogflowV2GenerateSuggestionsResponse),
  error: Schema.optional(GoogleRpcStatus),
  suggestSmartRepliesResponse: Schema.optional(GoogleCloudDialogflowV2SuggestSmartRepliesResponse),
  suggestFaqAnswersResponse: Schema.optional(GoogleCloudDialogflowV2SuggestFaqAnswersResponse),
})).annotate({ identifier: "GoogleCloudDialogflowV2SuggestionResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2SuggestionResult>;

export interface GoogleCloudDialogflowV2HumanAgentAssistantEvent {
  suggestionResults?: Array<GoogleCloudDialogflowV2SuggestionResult>;
  participant?: string;
  conversation?: string;
}

export const GoogleCloudDialogflowV2HumanAgentAssistantEvent: Schema.Schema<GoogleCloudDialogflowV2HumanAgentAssistantEvent> = Schema.suspend(() => Schema.Struct({
  suggestionResults: Schema.optional(Schema.Array(GoogleCloudDialogflowV2SuggestionResult)),
  participant: Schema.optional(Schema.String),
  conversation: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2HumanAgentAssistantEvent" }) as any as Schema.Schema<GoogleCloudDialogflowV2HumanAgentAssistantEvent>;

export interface GoogleCloudDialogflowV2beta1EventInput {
  languageCode?: string;
  name?: string;
  parameters?: Record<string, unknown>;
}

export const GoogleCloudDialogflowV2beta1EventInput: Schema.Schema<GoogleCloudDialogflowV2beta1EventInput> = Schema.suspend(() => Schema.Struct({
  languageCode: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1EventInput" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1EventInput>;

export interface GoogleCloudDialogflowV2beta1IntentMessageQuickReplies {
  title?: string;
  quickReplies?: Array<string>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageQuickReplies: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageQuickReplies> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  quickReplies: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageQuickReplies" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageQuickReplies>;

export interface GoogleCloudDialogflowV2beta1IntentMessageMediaContentResponseMediaObject {
  contentUrl?: string;
  largeImage?: GoogleCloudDialogflowV2beta1IntentMessageImage;
  description?: string;
  name?: string;
  icon?: GoogleCloudDialogflowV2beta1IntentMessageImage;
}

export const GoogleCloudDialogflowV2beta1IntentMessageMediaContentResponseMediaObject: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageMediaContentResponseMediaObject> = Schema.suspend(() => Schema.Struct({
  contentUrl: Schema.optional(Schema.String),
  largeImage: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageImage),
  description: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  icon: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageImage),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageMediaContentResponseMediaObject" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageMediaContentResponseMediaObject>;

export interface GoogleCloudDialogflowV2beta1IntentMessageMediaContent {
  mediaType?: "RESPONSE_MEDIA_TYPE_UNSPECIFIED" | "AUDIO" | (string & {});
  mediaObjects?: Array<GoogleCloudDialogflowV2beta1IntentMessageMediaContentResponseMediaObject>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageMediaContent: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageMediaContent> = Schema.suspend(() => Schema.Struct({
  mediaType: Schema.optional(Schema.String),
  mediaObjects: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageMediaContentResponseMediaObject)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageMediaContent" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageMediaContent>;

export interface GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCard {
  imageDisplayOptions?: "IMAGE_DISPLAY_OPTIONS_UNSPECIFIED" | "GRAY" | "WHITE" | "CROPPED" | "BLURRED_BACKGROUND" | (string & {});
  items?: Array<GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItem>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCard: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCard> = Schema.suspend(() => Schema.Struct({
  imageDisplayOptions: Schema.optional(Schema.String),
  items: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItem)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCard" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCard>;

export interface GoogleCloudDialogflowV2beta1IntentMessageTelephonyTransferCall {
  phoneNumber?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageTelephonyTransferCall: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTelephonyTransferCall> = Schema.suspend(() => Schema.Struct({
  phoneNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageTelephonyTransferCall" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTelephonyTransferCall>;

export interface GoogleCloudDialogflowV2beta1IntentMessageCardButton {
  postback?: string;
  text?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageCardButton: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageCardButton> = Schema.suspend(() => Schema.Struct({
  postback: Schema.optional(Schema.String),
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageCardButton" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageCardButton>;

export interface GoogleCloudDialogflowV2beta1IntentMessageCard {
  buttons?: Array<GoogleCloudDialogflowV2beta1IntentMessageCardButton>;
  imageUri?: string;
  title?: string;
  subtitle?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageCard: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageCard> = Schema.suspend(() => Schema.Struct({
  buttons: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageCardButton)),
  imageUri: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  subtitle: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageCard" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageCard>;

export interface GoogleCloudDialogflowV2beta1IntentMessageLinkOutSuggestion {
  uri?: string;
  destinationName?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageLinkOutSuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageLinkOutSuggestion> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  destinationName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageLinkOutSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageLinkOutSuggestion>;

export interface GoogleCloudDialogflowV2beta1IntentMessageTelephonySynthesizeSpeech {
  text?: string;
  ssml?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageTelephonySynthesizeSpeech: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTelephonySynthesizeSpeech> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  ssml: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageTelephonySynthesizeSpeech" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTelephonySynthesizeSpeech>;

export interface GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo {
  synonyms?: Array<string>;
  key?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo> = Schema.suspend(() => Schema.Struct({
  synonyms: Schema.optional(Schema.Array(Schema.String)),
  key: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo>;

export interface GoogleCloudDialogflowV2beta1IntentMessageListSelectItem {
  description?: string;
  image?: GoogleCloudDialogflowV2beta1IntentMessageImage;
  info?: GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo;
  title?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageListSelectItem: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageListSelectItem> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  image: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageImage),
  info: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageListSelectItem" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageListSelectItem>;

export interface GoogleCloudDialogflowV2beta1IntentMessageListSelect {
  items?: Array<GoogleCloudDialogflowV2beta1IntentMessageListSelectItem>;
  title?: string;
  subtitle?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageListSelect: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageListSelect> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageListSelectItem)),
  title: Schema.optional(Schema.String),
  subtitle: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageListSelect" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageListSelect>;

export interface GoogleCloudDialogflowV2beta1IntentMessageText {
  text?: Array<string>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageText: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageText> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageText" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageText>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionOpenUri {
  uri?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionOpenUri: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionOpenUri> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionOpenUri" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionOpenUri>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionDial {
  phoneNumber?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionDial: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionDial> = Schema.suspend(() => Schema.Struct({
  phoneNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionDial" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionDial>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionShareLocation {
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionShareLocation: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionShareLocation> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionShareLocation" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionShareLocation>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedAction {
  openUrl?: GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionOpenUri;
  dial?: GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionDial;
  shareLocation?: GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionShareLocation;
  postbackData?: string;
  text?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedAction: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedAction> = Schema.suspend(() => Schema.Struct({
  openUrl: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionOpenUri),
  dial: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionDial),
  shareLocation: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionShareLocation),
  postbackData: Schema.optional(Schema.String),
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedAction" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedAction>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedReply {
  postbackData?: string;
  text?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedReply: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedReply> = Schema.suspend(() => Schema.Struct({
  postbackData: Schema.optional(Schema.String),
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedReply" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedReply>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion {
  action?: GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedAction;
  reply?: GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedReply;
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion> = Schema.suspend(() => Schema.Struct({
  action: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedAction),
  reply: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedReply),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmCardContentRbmMedia {
  height?: "HEIGHT_UNSPECIFIED" | "SHORT" | "MEDIUM" | "TALL" | (string & {});
  fileUri?: string;
  thumbnailUri?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmCardContentRbmMedia: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmCardContentRbmMedia> = Schema.suspend(() => Schema.Struct({
  height: Schema.optional(Schema.String),
  fileUri: Schema.optional(Schema.String),
  thumbnailUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageRbmCardContentRbmMedia" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmCardContentRbmMedia>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent {
  suggestions?: Array<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion>;
  media?: GoogleCloudDialogflowV2beta1IntentMessageRbmCardContentRbmMedia;
  description?: string;
  title?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent> = Schema.suspend(() => Schema.Struct({
  suggestions: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion)),
  media: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageRbmCardContentRbmMedia),
  description: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmStandaloneCard {
  cardContent?: GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent;
  thumbnailImageAlignment?: "THUMBNAIL_IMAGE_ALIGNMENT_UNSPECIFIED" | "LEFT" | "RIGHT" | (string & {});
  cardOrientation?: "CARD_ORIENTATION_UNSPECIFIED" | "HORIZONTAL" | "VERTICAL" | (string & {});
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmStandaloneCard: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmStandaloneCard> = Schema.suspend(() => Schema.Struct({
  cardContent: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent),
  thumbnailImageAlignment: Schema.optional(Schema.String),
  cardOrientation: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageRbmStandaloneCard" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmStandaloneCard>;

export interface GoogleCloudDialogflowV2beta1IntentMessageTelephonyPlayAudio {
  audioUri?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageTelephonyPlayAudio: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTelephonyPlayAudio> = Schema.suspend(() => Schema.Struct({
  audioUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageTelephonyPlayAudio" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTelephonyPlayAudio>;

export interface GoogleCloudDialogflowV2beta1IntentMessageCarouselSelectItem {
  info?: GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo;
  title?: string;
  image?: GoogleCloudDialogflowV2beta1IntentMessageImage;
  description?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageCarouselSelectItem: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageCarouselSelectItem> = Schema.suspend(() => Schema.Struct({
  info: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo),
  title: Schema.optional(Schema.String),
  image: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageImage),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageCarouselSelectItem" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageCarouselSelectItem>;

export interface GoogleCloudDialogflowV2beta1IntentMessageCarouselSelect {
  items?: Array<GoogleCloudDialogflowV2beta1IntentMessageCarouselSelectItem>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageCarouselSelect: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageCarouselSelect> = Schema.suspend(() => Schema.Struct({
  items: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageCarouselSelectItem)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageCarouselSelect" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageCarouselSelect>;

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
  image?: GoogleCloudDialogflowV2beta1IntentMessageImage;
  formattedText?: string;
  title?: string;
  buttons?: Array<GoogleCloudDialogflowV2beta1IntentMessageBasicCardButton>;
  subtitle?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageBasicCard: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBasicCard> = Schema.suspend(() => Schema.Struct({
  image: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageImage),
  formattedText: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  buttons: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageBasicCardButton)),
  subtitle: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageBasicCard" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBasicCard>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmCarouselCard {
  cardWidth?: "CARD_WIDTH_UNSPECIFIED" | "SMALL" | "MEDIUM" | (string & {});
  cardContents?: Array<GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmCarouselCard: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmCarouselCard> = Schema.suspend(() => Schema.Struct({
  cardWidth: Schema.optional(Schema.String),
  cardContents: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageRbmCarouselCard" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmCarouselCard>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmText {
  text?: string;
  rbmSuggestion?: Array<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmText: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmText> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  rbmSuggestion: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageRbmText" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmText>;

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

export interface GoogleCloudDialogflowV2beta1IntentMessageColumnProperties {
  horizontalAlignment?: "HORIZONTAL_ALIGNMENT_UNSPECIFIED" | "LEADING" | "CENTER" | "TRAILING" | (string & {});
  header?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageColumnProperties: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageColumnProperties> = Schema.suspend(() => Schema.Struct({
  horizontalAlignment: Schema.optional(Schema.String),
  header: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageColumnProperties" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageColumnProperties>;

export interface GoogleCloudDialogflowV2beta1IntentMessageTableCard {
  rows?: Array<GoogleCloudDialogflowV2beta1IntentMessageTableCardRow>;
  image?: GoogleCloudDialogflowV2beta1IntentMessageImage;
  columnProperties?: Array<GoogleCloudDialogflowV2beta1IntentMessageColumnProperties>;
  buttons?: Array<GoogleCloudDialogflowV2beta1IntentMessageBasicCardButton>;
  subtitle?: string;
  title?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageTableCard: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTableCard> = Schema.suspend(() => Schema.Struct({
  rows: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageTableCardRow)),
  image: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageImage),
  columnProperties: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageColumnProperties)),
  buttons: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageBasicCardButton)),
  subtitle: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessageTableCard" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTableCard>;

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

export interface GoogleCloudDialogflowV2beta1IntentMessage {
  quickReplies?: GoogleCloudDialogflowV2beta1IntentMessageQuickReplies;
  mediaContent?: GoogleCloudDialogflowV2beta1IntentMessageMediaContent;
  browseCarouselCard?: GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCard;
  telephonyTransferCall?: GoogleCloudDialogflowV2beta1IntentMessageTelephonyTransferCall;
  payload?: Record<string, unknown>;
  card?: GoogleCloudDialogflowV2beta1IntentMessageCard;
  platform?: "PLATFORM_UNSPECIFIED" | "FACEBOOK" | "SLACK" | "TELEGRAM" | "KIK" | "SKYPE" | "LINE" | "VIBER" | "ACTIONS_ON_GOOGLE" | "TELEPHONY" | "GOOGLE_HANGOUTS" | (string & {});
  linkOutSuggestion?: GoogleCloudDialogflowV2beta1IntentMessageLinkOutSuggestion;
  telephonySynthesizeSpeech?: GoogleCloudDialogflowV2beta1IntentMessageTelephonySynthesizeSpeech;
  listSelect?: GoogleCloudDialogflowV2beta1IntentMessageListSelect;
  text?: GoogleCloudDialogflowV2beta1IntentMessageText;
  rbmStandaloneRichCard?: GoogleCloudDialogflowV2beta1IntentMessageRbmStandaloneCard;
  telephonyPlayAudio?: GoogleCloudDialogflowV2beta1IntentMessageTelephonyPlayAudio;
  carouselSelect?: GoogleCloudDialogflowV2beta1IntentMessageCarouselSelect;
  basicCard?: GoogleCloudDialogflowV2beta1IntentMessageBasicCard;
  rbmCarouselRichCard?: GoogleCloudDialogflowV2beta1IntentMessageRbmCarouselCard;
  rbmText?: GoogleCloudDialogflowV2beta1IntentMessageRbmText;
  tableCard?: GoogleCloudDialogflowV2beta1IntentMessageTableCard;
  simpleResponses?: GoogleCloudDialogflowV2beta1IntentMessageSimpleResponses;
  image?: GoogleCloudDialogflowV2beta1IntentMessageImage;
  suggestions?: GoogleCloudDialogflowV2beta1IntentMessageSuggestions;
}

export const GoogleCloudDialogflowV2beta1IntentMessage: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessage> = Schema.suspend(() => Schema.Struct({
  quickReplies: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageQuickReplies),
  mediaContent: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageMediaContent),
  browseCarouselCard: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCard),
  telephonyTransferCall: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageTelephonyTransferCall),
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  card: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageCard),
  platform: Schema.optional(Schema.String),
  linkOutSuggestion: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageLinkOutSuggestion),
  telephonySynthesizeSpeech: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageTelephonySynthesizeSpeech),
  listSelect: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageListSelect),
  text: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageText),
  rbmStandaloneRichCard: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageRbmStandaloneCard),
  telephonyPlayAudio: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageTelephonyPlayAudio),
  carouselSelect: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageCarouselSelect),
  basicCard: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageBasicCard),
  rbmCarouselRichCard: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageRbmCarouselCard),
  rbmText: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageRbmText),
  tableCard: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageTableCard),
  simpleResponses: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageSimpleResponses),
  image: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageImage),
  suggestions: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageSuggestions),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentMessage" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessage>;

export interface GoogleCloudDialogflowV2beta1EntityTypeEntity {
  synonyms?: Array<string>;
  value?: string;
}

export const GoogleCloudDialogflowV2beta1EntityTypeEntity: Schema.Schema<GoogleCloudDialogflowV2beta1EntityTypeEntity> = Schema.suspend(() => Schema.Struct({
  synonyms: Schema.optional(Schema.Array(Schema.String)),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1EntityTypeEntity" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1EntityTypeEntity>;

export interface GoogleCloudDialogflowV2beta1SessionEntityType {
  entities?: Array<GoogleCloudDialogflowV2beta1EntityTypeEntity>;
  name?: string;
  entityOverrideMode?: "ENTITY_OVERRIDE_MODE_UNSPECIFIED" | "ENTITY_OVERRIDE_MODE_OVERRIDE" | "ENTITY_OVERRIDE_MODE_SUPPLEMENT" | (string & {});
}

export const GoogleCloudDialogflowV2beta1SessionEntityType: Schema.Schema<GoogleCloudDialogflowV2beta1SessionEntityType> = Schema.suspend(() => Schema.Struct({
  entities: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1EntityTypeEntity)),
  name: Schema.optional(Schema.String),
  entityOverrideMode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SessionEntityType" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SessionEntityType>;

export interface GoogleCloudDialogflowV2beta1Context {
  lifespanCount?: number;
  name?: string;
  parameters?: Record<string, unknown>;
}

export const GoogleCloudDialogflowV2beta1Context: Schema.Schema<GoogleCloudDialogflowV2beta1Context> = Schema.suspend(() => Schema.Struct({
  lifespanCount: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1Context" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1Context>;

export interface GoogleCloudDialogflowV2beta1WebhookResponse {
  payload?: Record<string, unknown>;
  followupEventInput?: GoogleCloudDialogflowV2beta1EventInput;
  source?: string;
  fulfillmentMessages?: Array<GoogleCloudDialogflowV2beta1IntentMessage>;
  endInteraction?: boolean;
  liveAgentHandoff?: boolean;
  sessionEntityTypes?: Array<GoogleCloudDialogflowV2beta1SessionEntityType>;
  outputContexts?: Array<GoogleCloudDialogflowV2beta1Context>;
  fulfillmentText?: string;
}

export const GoogleCloudDialogflowV2beta1WebhookResponse: Schema.Schema<GoogleCloudDialogflowV2beta1WebhookResponse> = Schema.suspend(() => Schema.Struct({
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  followupEventInput: Schema.optional(GoogleCloudDialogflowV2beta1EventInput),
  source: Schema.optional(Schema.String),
  fulfillmentMessages: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessage)),
  endInteraction: Schema.optional(Schema.Boolean),
  liveAgentHandoff: Schema.optional(Schema.Boolean),
  sessionEntityTypes: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SessionEntityType)),
  outputContexts: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1Context)),
  fulfillmentText: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1WebhookResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1WebhookResponse>;

export interface GoogleCloudDialogflowCxV3FormParameter {
  advancedSettings?: GoogleCloudDialogflowCxV3AdvancedSettings;
  displayName?: string;
  required?: boolean;
  isList?: boolean;
  fillBehavior?: GoogleCloudDialogflowCxV3FormParameterFillBehavior;
  entityType?: string;
  defaultValue?: unknown;
  redact?: boolean;
}

export const GoogleCloudDialogflowCxV3FormParameter: Schema.Schema<GoogleCloudDialogflowCxV3FormParameter> = Schema.suspend(() => Schema.Struct({
  advancedSettings: Schema.optional(GoogleCloudDialogflowCxV3AdvancedSettings),
  displayName: Schema.optional(Schema.String),
  required: Schema.optional(Schema.Boolean),
  isList: Schema.optional(Schema.Boolean),
  fillBehavior: Schema.optional(GoogleCloudDialogflowCxV3FormParameterFillBehavior),
  entityType: Schema.optional(Schema.String),
  defaultValue: Schema.optional(Schema.Unknown),
  redact: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3FormParameter" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FormParameter>;

export interface GoogleCloudDialogflowCxV3VoiceSelectionParams {
  name?: string;
  ssmlGender?: "SSML_VOICE_GENDER_UNSPECIFIED" | "SSML_VOICE_GENDER_MALE" | "SSML_VOICE_GENDER_FEMALE" | "SSML_VOICE_GENDER_NEUTRAL" | (string & {});
}

export const GoogleCloudDialogflowCxV3VoiceSelectionParams: Schema.Schema<GoogleCloudDialogflowCxV3VoiceSelectionParams> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  ssmlGender: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3VoiceSelectionParams" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3VoiceSelectionParams>;

export interface GoogleCloudDialogflowCxV3SynthesizeSpeechConfig {
  pitch?: number;
  effectsProfileId?: Array<string>;
  voice?: GoogleCloudDialogflowCxV3VoiceSelectionParams;
  speakingRate?: number;
  volumeGainDb?: number;
}

export const GoogleCloudDialogflowCxV3SynthesizeSpeechConfig: Schema.Schema<GoogleCloudDialogflowCxV3SynthesizeSpeechConfig> = Schema.suspend(() => Schema.Struct({
  pitch: Schema.optional(Schema.Number),
  effectsProfileId: Schema.optional(Schema.Array(Schema.String)),
  voice: Schema.optional(GoogleCloudDialogflowCxV3VoiceSelectionParams),
  speakingRate: Schema.optional(Schema.Number),
  volumeGainDb: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3SynthesizeSpeechConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SynthesizeSpeechConfig>;

export interface GoogleCloudDialogflowCxV3OutputAudioConfig {
  synthesizeSpeechConfig?: GoogleCloudDialogflowCxV3SynthesizeSpeechConfig;
  audioEncoding?: "OUTPUT_AUDIO_ENCODING_UNSPECIFIED" | "OUTPUT_AUDIO_ENCODING_LINEAR_16" | "OUTPUT_AUDIO_ENCODING_MP3" | "OUTPUT_AUDIO_ENCODING_MP3_64_KBPS" | "OUTPUT_AUDIO_ENCODING_OGG_OPUS" | "OUTPUT_AUDIO_ENCODING_MULAW" | "OUTPUT_AUDIO_ENCODING_ALAW" | (string & {});
  sampleRateHertz?: number;
}

export const GoogleCloudDialogflowCxV3OutputAudioConfig: Schema.Schema<GoogleCloudDialogflowCxV3OutputAudioConfig> = Schema.suspend(() => Schema.Struct({
  synthesizeSpeechConfig: Schema.optional(GoogleCloudDialogflowCxV3SynthesizeSpeechConfig),
  audioEncoding: Schema.optional(Schema.String),
  sampleRateHertz: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3OutputAudioConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3OutputAudioConfig>;

export interface GoogleCloudDialogflowCxV3DtmfInput {
  digits?: string;
  finishDigit?: string;
}

export const GoogleCloudDialogflowCxV3DtmfInput: Schema.Schema<GoogleCloudDialogflowCxV3DtmfInput> = Schema.suspend(() => Schema.Struct({
  digits: Schema.optional(Schema.String),
  finishDigit: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3DtmfInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DtmfInput>;

export interface GoogleCloudDialogflowCxV3IntentParameter {
  isList?: boolean;
  id?: string;
  entityType?: string;
  redact?: boolean;
}

export const GoogleCloudDialogflowCxV3IntentParameter: Schema.Schema<GoogleCloudDialogflowCxV3IntentParameter> = Schema.suspend(() => Schema.Struct({
  isList: Schema.optional(Schema.Boolean),
  id: Schema.optional(Schema.String),
  entityType: Schema.optional(Schema.String),
  redact: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3IntentParameter" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3IntentParameter>;

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

export interface GoogleCloudDialogflowCxV3Intent {
  displayName?: string;
  isFallback?: boolean;
  parameters?: Array<GoogleCloudDialogflowCxV3IntentParameter>;
  trainingPhrases?: Array<GoogleCloudDialogflowCxV3IntentTrainingPhrase>;
  name?: string;
  priority?: number;
  labels?: Record<string, string>;
  description?: string;
}

export const GoogleCloudDialogflowCxV3Intent: Schema.Schema<GoogleCloudDialogflowCxV3Intent> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  isFallback: Schema.optional(Schema.Boolean),
  parameters: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3IntentParameter)),
  trainingPhrases: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3IntentTrainingPhrase)),
  name: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.Number),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3Intent" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Intent>;

export interface GoogleCloudDialogflowCxV3DataStoreConnectionSignalsGroundingSignals {
  decision?: "GROUNDING_DECISION_UNSPECIFIED" | "ACCEPTED_BY_GROUNDING" | "REJECTED_BY_GROUNDING" | (string & {});
  score?: "GROUNDING_SCORE_BUCKET_UNSPECIFIED" | "VERY_LOW" | "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH" | (string & {});
}

export const GoogleCloudDialogflowCxV3DataStoreConnectionSignalsGroundingSignals: Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsGroundingSignals> = Schema.suspend(() => Schema.Struct({
  decision: Schema.optional(Schema.String),
  score: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3DataStoreConnectionSignalsGroundingSignals" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsGroundingSignals>;

export interface GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSafetySignals {
  bannedPhraseMatch?: "BANNED_PHRASE_MATCH_UNSPECIFIED" | "BANNED_PHRASE_MATCH_NONE" | "BANNED_PHRASE_MATCH_QUERY" | "BANNED_PHRASE_MATCH_RESPONSE" | (string & {});
  decision?: "SAFETY_DECISION_UNSPECIFIED" | "ACCEPTED_BY_SAFETY_CHECK" | "REJECTED_BY_SAFETY_CHECK" | (string & {});
  matchedBannedPhrase?: string;
}

export const GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSafetySignals: Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSafetySignals> = Schema.suspend(() => Schema.Struct({
  bannedPhraseMatch: Schema.optional(Schema.String),
  decision: Schema.optional(Schema.String),
  matchedBannedPhrase: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSafetySignals" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSafetySignals>;

export interface GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSearchSnippet {
  text?: string;
  metadata?: Record<string, unknown>;
  documentTitle?: string;
  documentUri?: string;
}

export const GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSearchSnippet: Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSearchSnippet> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  documentTitle: Schema.optional(Schema.String),
  documentUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSearchSnippet" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSearchSnippet>;

export interface GoogleCloudDialogflowCxV3DataStoreConnectionSignalsCitedSnippet {
  searchSnippet?: GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSearchSnippet;
  snippetIndex?: number;
}

export const GoogleCloudDialogflowCxV3DataStoreConnectionSignalsCitedSnippet: Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsCitedSnippet> = Schema.suspend(() => Schema.Struct({
  searchSnippet: Schema.optional(GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSearchSnippet),
  snippetIndex: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3DataStoreConnectionSignalsCitedSnippet" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsCitedSnippet>;

export interface GoogleCloudDialogflowCxV3DataStoreConnectionSignalsRewriterModelCallSignals {
  model?: string;
  renderedPrompt?: string;
  modelOutput?: string;
}

export const GoogleCloudDialogflowCxV3DataStoreConnectionSignalsRewriterModelCallSignals: Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsRewriterModelCallSignals> = Schema.suspend(() => Schema.Struct({
  model: Schema.optional(Schema.String),
  renderedPrompt: Schema.optional(Schema.String),
  modelOutput: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3DataStoreConnectionSignalsRewriterModelCallSignals" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsRewriterModelCallSignals>;

export interface GoogleCloudDialogflowCxV3DataStoreConnectionSignalsAnswerPart {
  text?: string;
  supportingIndices?: Array<number>;
}

export const GoogleCloudDialogflowCxV3DataStoreConnectionSignalsAnswerPart: Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsAnswerPart> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  supportingIndices: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3DataStoreConnectionSignalsAnswerPart" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsAnswerPart>;

export interface GoogleCloudDialogflowCxV3DataStoreConnectionSignalsAnswerGenerationModelCallSignals {
  model?: string;
  modelOutput?: string;
  renderedPrompt?: string;
}

export const GoogleCloudDialogflowCxV3DataStoreConnectionSignalsAnswerGenerationModelCallSignals: Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsAnswerGenerationModelCallSignals> = Schema.suspend(() => Schema.Struct({
  model: Schema.optional(Schema.String),
  modelOutput: Schema.optional(Schema.String),
  renderedPrompt: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3DataStoreConnectionSignalsAnswerGenerationModelCallSignals" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsAnswerGenerationModelCallSignals>;

export interface GoogleCloudDialogflowCxV3DataStoreConnectionSignals {
  groundingSignals?: GoogleCloudDialogflowCxV3DataStoreConnectionSignalsGroundingSignals;
  safetySignals?: GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSafetySignals;
  citedSnippets?: Array<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsCitedSnippet>;
  searchSnippets?: Array<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSearchSnippet>;
  rewrittenQuery?: string;
  answer?: string;
  rewriterModelCallSignals?: GoogleCloudDialogflowCxV3DataStoreConnectionSignalsRewriterModelCallSignals;
  answerParts?: Array<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsAnswerPart>;
  answerGenerationModelCallSignals?: GoogleCloudDialogflowCxV3DataStoreConnectionSignalsAnswerGenerationModelCallSignals;
}

export const GoogleCloudDialogflowCxV3DataStoreConnectionSignals: Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignals> = Schema.suspend(() => Schema.Struct({
  groundingSignals: Schema.optional(GoogleCloudDialogflowCxV3DataStoreConnectionSignalsGroundingSignals),
  safetySignals: Schema.optional(GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSafetySignals),
  citedSnippets: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3DataStoreConnectionSignalsCitedSnippet)),
  searchSnippets: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSearchSnippet)),
  rewrittenQuery: Schema.optional(Schema.String),
  answer: Schema.optional(Schema.String),
  rewriterModelCallSignals: Schema.optional(GoogleCloudDialogflowCxV3DataStoreConnectionSignalsRewriterModelCallSignals),
  answerParts: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3DataStoreConnectionSignalsAnswerPart)),
  answerGenerationModelCallSignals: Schema.optional(GoogleCloudDialogflowCxV3DataStoreConnectionSignalsAnswerGenerationModelCallSignals),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3DataStoreConnectionSignals" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignals>;

export interface GoogleCloudDialogflowCxV3FlowMultiLanguageSettings {
  supportedResponseLanguageCodes?: Array<string>;
  enableMultiLanguageDetection?: boolean;
}

export const GoogleCloudDialogflowCxV3FlowMultiLanguageSettings: Schema.Schema<GoogleCloudDialogflowCxV3FlowMultiLanguageSettings> = Schema.suspend(() => Schema.Struct({
  supportedResponseLanguageCodes: Schema.optional(Schema.Array(Schema.String)),
  enableMultiLanguageDetection: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3FlowMultiLanguageSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FlowMultiLanguageSettings>;

export interface GoogleCloudDialogflowCxV3NluSettings {
  modelType?: "MODEL_TYPE_UNSPECIFIED" | "MODEL_TYPE_STANDARD" | "MODEL_TYPE_ADVANCED" | (string & {});
  classificationThreshold?: number;
  modelTrainingMode?: "MODEL_TRAINING_MODE_UNSPECIFIED" | "MODEL_TRAINING_MODE_AUTOMATIC" | "MODEL_TRAINING_MODE_MANUAL" | (string & {});
}

export const GoogleCloudDialogflowCxV3NluSettings: Schema.Schema<GoogleCloudDialogflowCxV3NluSettings> = Schema.suspend(() => Schema.Struct({
  modelType: Schema.optional(Schema.String),
  classificationThreshold: Schema.optional(Schema.Number),
  modelTrainingMode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3NluSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3NluSettings>;

export interface GoogleCloudDialogflowCxV3DataStoreConnection {
  dataStore?: string;
  dataStoreType?: "DATA_STORE_TYPE_UNSPECIFIED" | "PUBLIC_WEB" | "UNSTRUCTURED" | "STRUCTURED" | (string & {});
  documentProcessingMode?: "DOCUMENT_PROCESSING_MODE_UNSPECIFIED" | "DOCUMENTS" | "CHUNKS" | (string & {});
}

export const GoogleCloudDialogflowCxV3DataStoreConnection: Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnection> = Schema.suspend(() => Schema.Struct({
  dataStore: Schema.optional(Schema.String),
  dataStoreType: Schema.optional(Schema.String),
  documentProcessingMode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3DataStoreConnection" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnection>;

export interface GoogleCloudDialogflowCxV3KnowledgeConnectorSettings {
  targetFlow?: string;
  dataStoreConnections?: Array<GoogleCloudDialogflowCxV3DataStoreConnection>;
  triggerFulfillment?: GoogleCloudDialogflowCxV3Fulfillment;
  enabled?: boolean;
  targetPage?: string;
}

export const GoogleCloudDialogflowCxV3KnowledgeConnectorSettings: Schema.Schema<GoogleCloudDialogflowCxV3KnowledgeConnectorSettings> = Schema.suspend(() => Schema.Struct({
  targetFlow: Schema.optional(Schema.String),
  dataStoreConnections: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3DataStoreConnection)),
  triggerFulfillment: Schema.optional(GoogleCloudDialogflowCxV3Fulfillment),
  enabled: Schema.optional(Schema.Boolean),
  targetPage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3KnowledgeConnectorSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3KnowledgeConnectorSettings>;

export interface GoogleCloudDialogflowCxV3Flow {
  name?: string;
  advancedSettings?: GoogleCloudDialogflowCxV3AdvancedSettings;
  eventHandlers?: Array<GoogleCloudDialogflowCxV3EventHandler>;
  multiLanguageSettings?: GoogleCloudDialogflowCxV3FlowMultiLanguageSettings;
  displayName?: string;
  description?: string;
  outputParameterDefinitions?: Array<GoogleCloudDialogflowCxV3ParameterDefinition>;
  transitionRouteGroups?: Array<string>;
  transitionRoutes?: Array<GoogleCloudDialogflowCxV3TransitionRoute>;
  inputParameterDefinitions?: Array<GoogleCloudDialogflowCxV3ParameterDefinition>;
  nluSettings?: GoogleCloudDialogflowCxV3NluSettings;
  knowledgeConnectorSettings?: GoogleCloudDialogflowCxV3KnowledgeConnectorSettings;
  locked?: boolean;
}

export const GoogleCloudDialogflowCxV3Flow: Schema.Schema<GoogleCloudDialogflowCxV3Flow> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  advancedSettings: Schema.optional(GoogleCloudDialogflowCxV3AdvancedSettings),
  eventHandlers: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3EventHandler)),
  multiLanguageSettings: Schema.optional(GoogleCloudDialogflowCxV3FlowMultiLanguageSettings),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  outputParameterDefinitions: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3ParameterDefinition)),
  transitionRouteGroups: Schema.optional(Schema.Array(Schema.String)),
  transitionRoutes: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3TransitionRoute)),
  inputParameterDefinitions: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3ParameterDefinition)),
  nluSettings: Schema.optional(GoogleCloudDialogflowCxV3NluSettings),
  knowledgeConnectorSettings: Schema.optional(GoogleCloudDialogflowCxV3KnowledgeConnectorSettings),
  locked: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3Flow" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Flow>;

export interface GoogleCloudDialogflowCxV3Match {
  confidence?: number;
  resolvedInput?: string;
  matchType?: "MATCH_TYPE_UNSPECIFIED" | "INTENT" | "DIRECT_INTENT" | "PARAMETER_FILLING" | "NO_MATCH" | "NO_INPUT" | "EVENT" | "KNOWLEDGE_CONNECTOR" | "PLAYBOOK" | (string & {});
  intent?: GoogleCloudDialogflowCxV3Intent;
  parameters?: Record<string, unknown>;
  event?: string;
}

export const GoogleCloudDialogflowCxV3Match: Schema.Schema<GoogleCloudDialogflowCxV3Match> = Schema.suspend(() => Schema.Struct({
  confidence: Schema.optional(Schema.Number),
  resolvedInput: Schema.optional(Schema.String),
  matchType: Schema.optional(Schema.String),
  intent: Schema.optional(GoogleCloudDialogflowCxV3Intent),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  event: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3Match" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Match>;

export interface GoogleCloudDialogflowCxV3Form {
  parameters?: Array<GoogleCloudDialogflowCxV3FormParameter>;
}

export const GoogleCloudDialogflowCxV3Form: Schema.Schema<GoogleCloudDialogflowCxV3Form> = Schema.suspend(() => Schema.Struct({
  parameters: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3FormParameter)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3Form" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Form>;

export interface GoogleCloudDialogflowCxV3Page {
  entryFulfillment?: GoogleCloudDialogflowCxV3Fulfillment;
  form?: GoogleCloudDialogflowCxV3Form;
  displayName?: string;
  advancedSettings?: GoogleCloudDialogflowCxV3AdvancedSettings;
  eventHandlers?: Array<GoogleCloudDialogflowCxV3EventHandler>;
  transitionRoutes?: Array<GoogleCloudDialogflowCxV3TransitionRoute>;
  knowledgeConnectorSettings?: GoogleCloudDialogflowCxV3KnowledgeConnectorSettings;
  transitionRouteGroups?: Array<string>;
  description?: string;
  name?: string;
}

export const GoogleCloudDialogflowCxV3Page: Schema.Schema<GoogleCloudDialogflowCxV3Page> = Schema.suspend(() => Schema.Struct({
  entryFulfillment: Schema.optional(GoogleCloudDialogflowCxV3Fulfillment),
  form: Schema.optional(GoogleCloudDialogflowCxV3Form),
  displayName: Schema.optional(Schema.String),
  advancedSettings: Schema.optional(GoogleCloudDialogflowCxV3AdvancedSettings),
  eventHandlers: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3EventHandler)),
  transitionRoutes: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3TransitionRoute)),
  knowledgeConnectorSettings: Schema.optional(GoogleCloudDialogflowCxV3KnowledgeConnectorSettings),
  transitionRouteGroups: Schema.optional(Schema.Array(Schema.String)),
  description: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3Page" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Page>;

export interface GoogleCloudDialogflowCxV3QueryResult {
  diagnosticInfo?: Record<string, unknown>;
  triggerEvent?: string;
  webhookPayloads?: Array<Record<string, unknown>>;
  dtmf?: GoogleCloudDialogflowCxV3DtmfInput;
  languageCode?: string;
  text?: string;
  intentDetectionConfidence?: number;
  advancedSettings?: GoogleCloudDialogflowCxV3AdvancedSettings;
  transcript?: string;
  intent?: GoogleCloudDialogflowCxV3Intent;
  webhookStatuses?: Array<GoogleRpcStatus>;
  dataStoreConnectionSignals?: GoogleCloudDialogflowCxV3DataStoreConnectionSignals;
  parameters?: Record<string, unknown>;
  allowAnswerFeedback?: boolean;
  currentFlow?: GoogleCloudDialogflowCxV3Flow;
  sentimentAnalysisResult?: GoogleCloudDialogflowCxV3SentimentAnalysisResult;
  responseMessages?: Array<GoogleCloudDialogflowCxV3ResponseMessage>;
  triggerIntent?: string;
  match?: GoogleCloudDialogflowCxV3Match;
  currentPage?: GoogleCloudDialogflowCxV3Page;
}

export const GoogleCloudDialogflowCxV3QueryResult: Schema.Schema<GoogleCloudDialogflowCxV3QueryResult> = Schema.suspend(() => Schema.Struct({
  diagnosticInfo: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  triggerEvent: Schema.optional(Schema.String),
  webhookPayloads: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  dtmf: Schema.optional(GoogleCloudDialogflowCxV3DtmfInput),
  languageCode: Schema.optional(Schema.String),
  text: Schema.optional(Schema.String),
  intentDetectionConfidence: Schema.optional(Schema.Number),
  advancedSettings: Schema.optional(GoogleCloudDialogflowCxV3AdvancedSettings),
  transcript: Schema.optional(Schema.String),
  intent: Schema.optional(GoogleCloudDialogflowCxV3Intent),
  webhookStatuses: Schema.optional(Schema.Array(GoogleRpcStatus)),
  dataStoreConnectionSignals: Schema.optional(GoogleCloudDialogflowCxV3DataStoreConnectionSignals),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  allowAnswerFeedback: Schema.optional(Schema.Boolean),
  currentFlow: Schema.optional(GoogleCloudDialogflowCxV3Flow),
  sentimentAnalysisResult: Schema.optional(GoogleCloudDialogflowCxV3SentimentAnalysisResult),
  responseMessages: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3ResponseMessage)),
  triggerIntent: Schema.optional(Schema.String),
  match: Schema.optional(GoogleCloudDialogflowCxV3Match),
  currentPage: Schema.optional(GoogleCloudDialogflowCxV3Page),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3QueryResult" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3QueryResult>;

export interface GoogleCloudDialogflowCxV3DetectIntentResponse {
  outputAudio?: string;
  outputAudioConfig?: GoogleCloudDialogflowCxV3OutputAudioConfig;
  responseId?: string;
  responseType?: "RESPONSE_TYPE_UNSPECIFIED" | "PARTIAL" | "FINAL" | (string & {});
  allowCancellation?: boolean;
  queryResult?: GoogleCloudDialogflowCxV3QueryResult;
}

export const GoogleCloudDialogflowCxV3DetectIntentResponse: Schema.Schema<GoogleCloudDialogflowCxV3DetectIntentResponse> = Schema.suspend(() => Schema.Struct({
  outputAudio: Schema.optional(Schema.String),
  outputAudioConfig: Schema.optional(GoogleCloudDialogflowCxV3OutputAudioConfig),
  responseId: Schema.optional(Schema.String),
  responseType: Schema.optional(Schema.String),
  allowCancellation: Schema.optional(Schema.Boolean),
  queryResult: Schema.optional(GoogleCloudDialogflowCxV3QueryResult),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3DetectIntentResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DetectIntentResponse>;

export interface GoogleCloudDialogflowCxV3FlowTransition {
  flow?: string;
  displayName?: string;
}

export const GoogleCloudDialogflowCxV3FlowTransition: Schema.Schema<GoogleCloudDialogflowCxV3FlowTransition> = Schema.suspend(() => Schema.Struct({
  flow: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3FlowTransition" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FlowTransition>;

export interface GoogleCloudDialogflowV2beta1ResponseMessageTelephonyTransferCall {
  phoneNumber?: string;
  sipUri?: string;
}

export const GoogleCloudDialogflowV2beta1ResponseMessageTelephonyTransferCall: Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageTelephonyTransferCall> = Schema.suspend(() => Schema.Struct({
  phoneNumber: Schema.optional(Schema.String),
  sipUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ResponseMessageTelephonyTransferCall" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageTelephonyTransferCall>;

export interface GoogleCloudDialogflowV2beta1ResponseMessageEndInteraction {
}

export const GoogleCloudDialogflowV2beta1ResponseMessageEndInteraction: Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageEndInteraction> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ResponseMessageEndInteraction" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageEndInteraction>;

export interface GoogleCloudDialogflowV2beta1ResponseMessageLiveAgentHandoff {
  metadata?: Record<string, unknown>;
}

export const GoogleCloudDialogflowV2beta1ResponseMessageLiveAgentHandoff: Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageLiveAgentHandoff> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ResponseMessageLiveAgentHandoff" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageLiveAgentHandoff>;

export interface GoogleCloudDialogflowV2beta1ResponseMessageMixedAudioSegment {
  uri?: string;
  allowPlaybackInterruption?: boolean;
  audio?: string;
}

export const GoogleCloudDialogflowV2beta1ResponseMessageMixedAudioSegment: Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageMixedAudioSegment> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  allowPlaybackInterruption: Schema.optional(Schema.Boolean),
  audio: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ResponseMessageMixedAudioSegment" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageMixedAudioSegment>;

export interface GoogleCloudDialogflowV2beta1ResponseMessageMixedAudio {
  segments?: Array<GoogleCloudDialogflowV2beta1ResponseMessageMixedAudioSegment>;
}

export const GoogleCloudDialogflowV2beta1ResponseMessageMixedAudio: Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageMixedAudio> = Schema.suspend(() => Schema.Struct({
  segments: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1ResponseMessageMixedAudioSegment)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ResponseMessageMixedAudio" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageMixedAudio>;

export interface GoogleCloudDialogflowV2beta1ResponseMessageText {
  text?: Array<string>;
}

export const GoogleCloudDialogflowV2beta1ResponseMessageText: Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageText> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ResponseMessageText" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageText>;

export interface GoogleCloudDialogflowV2beta1ResponseMessage {
  telephonyTransferCall?: GoogleCloudDialogflowV2beta1ResponseMessageTelephonyTransferCall;
  endInteraction?: GoogleCloudDialogflowV2beta1ResponseMessageEndInteraction;
  liveAgentHandoff?: GoogleCloudDialogflowV2beta1ResponseMessageLiveAgentHandoff;
  payload?: Record<string, unknown>;
  mixedAudio?: GoogleCloudDialogflowV2beta1ResponseMessageMixedAudio;
  text?: GoogleCloudDialogflowV2beta1ResponseMessageText;
}

export const GoogleCloudDialogflowV2beta1ResponseMessage: Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessage> = Schema.suspend(() => Schema.Struct({
  telephonyTransferCall: Schema.optional(GoogleCloudDialogflowV2beta1ResponseMessageTelephonyTransferCall),
  endInteraction: Schema.optional(GoogleCloudDialogflowV2beta1ResponseMessageEndInteraction),
  liveAgentHandoff: Schema.optional(GoogleCloudDialogflowV2beta1ResponseMessageLiveAgentHandoff),
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  mixedAudio: Schema.optional(GoogleCloudDialogflowV2beta1ResponseMessageMixedAudio),
  text: Schema.optional(GoogleCloudDialogflowV2beta1ResponseMessageText),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ResponseMessage" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessage>;

export interface GoogleCloudDialogflowCxV3beta1ExportTestCasesMetadata {
}

export const GoogleCloudDialogflowCxV3beta1ExportTestCasesMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportTestCasesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExportTestCasesMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportTestCasesMetadata>;

export interface GoogleCloudDialogflowCxV3WebhookGenericWebServiceServiceAccountAuthConfig {
  serviceAccount?: string;
}

export const GoogleCloudDialogflowCxV3WebhookGenericWebServiceServiceAccountAuthConfig: Schema.Schema<GoogleCloudDialogflowCxV3WebhookGenericWebServiceServiceAccountAuthConfig> = Schema.suspend(() => Schema.Struct({
  serviceAccount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3WebhookGenericWebServiceServiceAccountAuthConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookGenericWebServiceServiceAccountAuthConfig>;

export interface GoogleCloudDialogflowCxV3WebhookGenericWebServiceOAuthConfig {
  tokenEndpoint?: string;
  scopes?: Array<string>;
  secretVersionForClientSecret?: string;
  clientSecret?: string;
  clientId?: string;
}

export const GoogleCloudDialogflowCxV3WebhookGenericWebServiceOAuthConfig: Schema.Schema<GoogleCloudDialogflowCxV3WebhookGenericWebServiceOAuthConfig> = Schema.suspend(() => Schema.Struct({
  tokenEndpoint: Schema.optional(Schema.String),
  scopes: Schema.optional(Schema.Array(Schema.String)),
  secretVersionForClientSecret: Schema.optional(Schema.String),
  clientSecret: Schema.optional(Schema.String),
  clientId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3WebhookGenericWebServiceOAuthConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookGenericWebServiceOAuthConfig>;

export interface GoogleCloudDialogflowCxV3WebhookGenericWebServiceSecretVersionHeaderValue {
  secretVersion?: string;
}

export const GoogleCloudDialogflowCxV3WebhookGenericWebServiceSecretVersionHeaderValue: Schema.Schema<GoogleCloudDialogflowCxV3WebhookGenericWebServiceSecretVersionHeaderValue> = Schema.suspend(() => Schema.Struct({
  secretVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3WebhookGenericWebServiceSecretVersionHeaderValue" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookGenericWebServiceSecretVersionHeaderValue>;

export interface GoogleCloudDialogflowCxV3WebhookGenericWebService {
  password?: string;
  httpMethod?: "HTTP_METHOD_UNSPECIFIED" | "POST" | "GET" | "HEAD" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | (string & {});
  serviceAccountAuthConfig?: GoogleCloudDialogflowCxV3WebhookGenericWebServiceServiceAccountAuthConfig;
  oauthConfig?: GoogleCloudDialogflowCxV3WebhookGenericWebServiceOAuthConfig;
  secretVersionsForRequestHeaders?: Record<string, GoogleCloudDialogflowCxV3WebhookGenericWebServiceSecretVersionHeaderValue>;
  secretVersionForUsernamePassword?: string;
  webhookType?: "WEBHOOK_TYPE_UNSPECIFIED" | "STANDARD" | "FLEXIBLE" | (string & {});
  serviceAgentAuth?: "SERVICE_AGENT_AUTH_UNSPECIFIED" | "NONE" | "ID_TOKEN" | "ACCESS_TOKEN" | (string & {});
  uri?: string;
  parameterMapping?: Record<string, string>;
  requestHeaders?: Record<string, string>;
  allowedCaCerts?: Array<string>;
  username?: string;
  requestBody?: string;
}

export const GoogleCloudDialogflowCxV3WebhookGenericWebService: Schema.Schema<GoogleCloudDialogflowCxV3WebhookGenericWebService> = Schema.suspend(() => Schema.Struct({
  password: Schema.optional(Schema.String),
  httpMethod: Schema.optional(Schema.String),
  serviceAccountAuthConfig: Schema.optional(GoogleCloudDialogflowCxV3WebhookGenericWebServiceServiceAccountAuthConfig),
  oauthConfig: Schema.optional(GoogleCloudDialogflowCxV3WebhookGenericWebServiceOAuthConfig),
  secretVersionsForRequestHeaders: Schema.optional(Schema.Record(Schema.String, GoogleCloudDialogflowCxV3WebhookGenericWebServiceSecretVersionHeaderValue)),
  secretVersionForUsernamePassword: Schema.optional(Schema.String),
  webhookType: Schema.optional(Schema.String),
  serviceAgentAuth: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  parameterMapping: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  requestHeaders: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  allowedCaCerts: Schema.optional(Schema.Array(Schema.String)),
  username: Schema.optional(Schema.String),
  requestBody: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3WebhookGenericWebService" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookGenericWebService>;

export interface GoogleCloudDialogflowCxV3WebhookServiceDirectoryConfig {
  genericWebService?: GoogleCloudDialogflowCxV3WebhookGenericWebService;
  service?: string;
}

export const GoogleCloudDialogflowCxV3WebhookServiceDirectoryConfig: Schema.Schema<GoogleCloudDialogflowCxV3WebhookServiceDirectoryConfig> = Schema.suspend(() => Schema.Struct({
  genericWebService: Schema.optional(GoogleCloudDialogflowCxV3WebhookGenericWebService),
  service: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3WebhookServiceDirectoryConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookServiceDirectoryConfig>;

export interface GoogleCloudDialogflowCxV3Webhook {
  displayName?: string;
  serviceDirectory?: GoogleCloudDialogflowCxV3WebhookServiceDirectoryConfig;
  name?: string;
  genericWebService?: GoogleCloudDialogflowCxV3WebhookGenericWebService;
  disabled?: boolean;
  timeout?: string;
}

export const GoogleCloudDialogflowCxV3Webhook: Schema.Schema<GoogleCloudDialogflowCxV3Webhook> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  serviceDirectory: Schema.optional(GoogleCloudDialogflowCxV3WebhookServiceDirectoryConfig),
  name: Schema.optional(Schema.String),
  genericWebService: Schema.optional(GoogleCloudDialogflowCxV3WebhookGenericWebService),
  disabled: Schema.optional(Schema.Boolean),
  timeout: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3Webhook" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Webhook>;

export interface GoogleCloudDialogflowCxV3ExportEntityTypesRequest {
  entityTypesUri?: string;
  entityTypesContentInline?: boolean;
  entityTypes?: Array<string>;
  dataFormat?: "DATA_FORMAT_UNSPECIFIED" | "BLOB" | "JSON_PACKAGE" | (string & {});
  languageCode?: string;
}

export const GoogleCloudDialogflowCxV3ExportEntityTypesRequest: Schema.Schema<GoogleCloudDialogflowCxV3ExportEntityTypesRequest> = Schema.suspend(() => Schema.Struct({
  entityTypesUri: Schema.optional(Schema.String),
  entityTypesContentInline: Schema.optional(Schema.Boolean),
  entityTypes: Schema.optional(Schema.Array(Schema.String)),
  dataFormat: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ExportEntityTypesRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportEntityTypesRequest>;

export interface GoogleCloudDialogflowCxV3IntentInput {
  intent?: string;
}

export const GoogleCloudDialogflowCxV3IntentInput: Schema.Schema<GoogleCloudDialogflowCxV3IntentInput> = Schema.suspend(() => Schema.Struct({
  intent: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3IntentInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3IntentInput>;

export interface GoogleCloudDialogflowV2beta1Sentiment {
  magnitude?: number;
  score?: number;
}

export const GoogleCloudDialogflowV2beta1Sentiment: Schema.Schema<GoogleCloudDialogflowV2beta1Sentiment> = Schema.suspend(() => Schema.Struct({
  magnitude: Schema.optional(Schema.Number),
  score: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1Sentiment" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1Sentiment>;

export interface GoogleCloudDialogflowCxV3ExportEntityTypesMetadata {
}

export const GoogleCloudDialogflowCxV3ExportEntityTypesMetadata: Schema.Schema<GoogleCloudDialogflowCxV3ExportEntityTypesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ExportEntityTypesMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportEntityTypesMetadata>;

export interface GoogleCloudDialogflowCxV3ToolServiceDirectoryConfig {
  service?: string;
}

export const GoogleCloudDialogflowCxV3ToolServiceDirectoryConfig: Schema.Schema<GoogleCloudDialogflowCxV3ToolServiceDirectoryConfig> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ToolServiceDirectoryConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolServiceDirectoryConfig>;

export interface GoogleCloudDialogflowCxV3ToolAuthenticationServiceAccountAuthConfig {
  serviceAccount?: string;
}

export const GoogleCloudDialogflowCxV3ToolAuthenticationServiceAccountAuthConfig: Schema.Schema<GoogleCloudDialogflowCxV3ToolAuthenticationServiceAccountAuthConfig> = Schema.suspend(() => Schema.Struct({
  serviceAccount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ToolAuthenticationServiceAccountAuthConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolAuthenticationServiceAccountAuthConfig>;

export interface GoogleCloudDialogflowCxV3ToolAuthenticationBearerTokenConfig {
  token?: string;
  secretVersionForToken?: string;
}

export const GoogleCloudDialogflowCxV3ToolAuthenticationBearerTokenConfig: Schema.Schema<GoogleCloudDialogflowCxV3ToolAuthenticationBearerTokenConfig> = Schema.suspend(() => Schema.Struct({
  token: Schema.optional(Schema.String),
  secretVersionForToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ToolAuthenticationBearerTokenConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolAuthenticationBearerTokenConfig>;

export interface GoogleCloudDialogflowCxV3ToolAuthenticationApiKeyConfig {
  keyName?: string;
  requestLocation?: "REQUEST_LOCATION_UNSPECIFIED" | "HEADER" | "QUERY_STRING" | (string & {});
  secretVersionForApiKey?: string;
  apiKey?: string;
}

export const GoogleCloudDialogflowCxV3ToolAuthenticationApiKeyConfig: Schema.Schema<GoogleCloudDialogflowCxV3ToolAuthenticationApiKeyConfig> = Schema.suspend(() => Schema.Struct({
  keyName: Schema.optional(Schema.String),
  requestLocation: Schema.optional(Schema.String),
  secretVersionForApiKey: Schema.optional(Schema.String),
  apiKey: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ToolAuthenticationApiKeyConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolAuthenticationApiKeyConfig>;

export interface GoogleCloudDialogflowCxV3ToolAuthenticationServiceAgentAuthConfig {
  serviceAgentAuth?: "SERVICE_AGENT_AUTH_UNSPECIFIED" | "ID_TOKEN" | "ACCESS_TOKEN" | (string & {});
}

export const GoogleCloudDialogflowCxV3ToolAuthenticationServiceAgentAuthConfig: Schema.Schema<GoogleCloudDialogflowCxV3ToolAuthenticationServiceAgentAuthConfig> = Schema.suspend(() => Schema.Struct({
  serviceAgentAuth: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ToolAuthenticationServiceAgentAuthConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolAuthenticationServiceAgentAuthConfig>;

export interface GoogleCloudDialogflowCxV3ToolAuthenticationOAuthConfig {
  scopes?: Array<string>;
  tokenEndpoint?: string;
  oauthGrantType?: "OAUTH_GRANT_TYPE_UNSPECIFIED" | "CLIENT_CREDENTIAL" | (string & {});
  secretVersionForClientSecret?: string;
  clientSecret?: string;
  clientId?: string;
}

export const GoogleCloudDialogflowCxV3ToolAuthenticationOAuthConfig: Schema.Schema<GoogleCloudDialogflowCxV3ToolAuthenticationOAuthConfig> = Schema.suspend(() => Schema.Struct({
  scopes: Schema.optional(Schema.Array(Schema.String)),
  tokenEndpoint: Schema.optional(Schema.String),
  oauthGrantType: Schema.optional(Schema.String),
  secretVersionForClientSecret: Schema.optional(Schema.String),
  clientSecret: Schema.optional(Schema.String),
  clientId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ToolAuthenticationOAuthConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolAuthenticationOAuthConfig>;

export interface GoogleCloudDialogflowCxV3ToolAuthentication {
  serviceAccountAuthConfig?: GoogleCloudDialogflowCxV3ToolAuthenticationServiceAccountAuthConfig;
  bearerTokenConfig?: GoogleCloudDialogflowCxV3ToolAuthenticationBearerTokenConfig;
  apiKeyConfig?: GoogleCloudDialogflowCxV3ToolAuthenticationApiKeyConfig;
  serviceAgentAuthConfig?: GoogleCloudDialogflowCxV3ToolAuthenticationServiceAgentAuthConfig;
  oauthConfig?: GoogleCloudDialogflowCxV3ToolAuthenticationOAuthConfig;
}

export const GoogleCloudDialogflowCxV3ToolAuthentication: Schema.Schema<GoogleCloudDialogflowCxV3ToolAuthentication> = Schema.suspend(() => Schema.Struct({
  serviceAccountAuthConfig: Schema.optional(GoogleCloudDialogflowCxV3ToolAuthenticationServiceAccountAuthConfig),
  bearerTokenConfig: Schema.optional(GoogleCloudDialogflowCxV3ToolAuthenticationBearerTokenConfig),
  apiKeyConfig: Schema.optional(GoogleCloudDialogflowCxV3ToolAuthenticationApiKeyConfig),
  serviceAgentAuthConfig: Schema.optional(GoogleCloudDialogflowCxV3ToolAuthenticationServiceAgentAuthConfig),
  oauthConfig: Schema.optional(GoogleCloudDialogflowCxV3ToolAuthenticationOAuthConfig),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ToolAuthentication" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolAuthentication>;

export interface GoogleCloudDialogflowCxV3ToolTLSConfigCACert {
  displayName?: string;
  cert?: string;
}

export const GoogleCloudDialogflowCxV3ToolTLSConfigCACert: Schema.Schema<GoogleCloudDialogflowCxV3ToolTLSConfigCACert> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  cert: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ToolTLSConfigCACert" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolTLSConfigCACert>;

export interface GoogleCloudDialogflowCxV3ToolTLSConfig {
  caCerts?: Array<GoogleCloudDialogflowCxV3ToolTLSConfigCACert>;
}

export const GoogleCloudDialogflowCxV3ToolTLSConfig: Schema.Schema<GoogleCloudDialogflowCxV3ToolTLSConfig> = Schema.suspend(() => Schema.Struct({
  caCerts: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3ToolTLSConfigCACert)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ToolTLSConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolTLSConfig>;

export interface GoogleCloudDialogflowCxV3ToolOpenApiTool {
  serviceDirectoryConfig?: GoogleCloudDialogflowCxV3ToolServiceDirectoryConfig;
  authentication?: GoogleCloudDialogflowCxV3ToolAuthentication;
  textSchema?: string;
  tlsConfig?: GoogleCloudDialogflowCxV3ToolTLSConfig;
}

export const GoogleCloudDialogflowCxV3ToolOpenApiTool: Schema.Schema<GoogleCloudDialogflowCxV3ToolOpenApiTool> = Schema.suspend(() => Schema.Struct({
  serviceDirectoryConfig: Schema.optional(GoogleCloudDialogflowCxV3ToolServiceDirectoryConfig),
  authentication: Schema.optional(GoogleCloudDialogflowCxV3ToolAuthentication),
  textSchema: Schema.optional(Schema.String),
  tlsConfig: Schema.optional(GoogleCloudDialogflowCxV3ToolTLSConfig),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ToolOpenApiTool" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolOpenApiTool>;

export interface GoogleCloudDialogflowCxV3ToolFunctionTool {
  outputSchema?: Record<string, unknown>;
  inputSchema?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3ToolFunctionTool: Schema.Schema<GoogleCloudDialogflowCxV3ToolFunctionTool> = Schema.suspend(() => Schema.Struct({
  outputSchema: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  inputSchema: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ToolFunctionTool" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolFunctionTool>;

export interface GoogleCloudDialogflowCxV3ToolDataStoreToolFallbackPrompt {
}

export const GoogleCloudDialogflowCxV3ToolDataStoreToolFallbackPrompt: Schema.Schema<GoogleCloudDialogflowCxV3ToolDataStoreToolFallbackPrompt> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ToolDataStoreToolFallbackPrompt" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolDataStoreToolFallbackPrompt>;

export interface GoogleCloudDialogflowCxV3ToolDataStoreTool {
  fallbackPrompt?: GoogleCloudDialogflowCxV3ToolDataStoreToolFallbackPrompt;
  dataStoreConnections?: Array<GoogleCloudDialogflowCxV3DataStoreConnection>;
}

export const GoogleCloudDialogflowCxV3ToolDataStoreTool: Schema.Schema<GoogleCloudDialogflowCxV3ToolDataStoreTool> = Schema.suspend(() => Schema.Struct({
  fallbackPrompt: Schema.optional(GoogleCloudDialogflowCxV3ToolDataStoreToolFallbackPrompt),
  dataStoreConnections: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3DataStoreConnection)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ToolDataStoreTool" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolDataStoreTool>;

export interface GoogleCloudDialogflowCxV3Tool {
  openApiSpec?: GoogleCloudDialogflowCxV3ToolOpenApiTool;
  displayName?: string;
  functionSpec?: GoogleCloudDialogflowCxV3ToolFunctionTool;
  toolType?: "TOOL_TYPE_UNSPECIFIED" | "CUSTOMIZED_TOOL" | "BUILTIN_TOOL" | (string & {});
  name?: string;
  description?: string;
  dataStoreSpec?: GoogleCloudDialogflowCxV3ToolDataStoreTool;
}

export const GoogleCloudDialogflowCxV3Tool: Schema.Schema<GoogleCloudDialogflowCxV3Tool> = Schema.suspend(() => Schema.Struct({
  openApiSpec: Schema.optional(GoogleCloudDialogflowCxV3ToolOpenApiTool),
  displayName: Schema.optional(Schema.String),
  functionSpec: Schema.optional(GoogleCloudDialogflowCxV3ToolFunctionTool),
  toolType: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  dataStoreSpec: Schema.optional(GoogleCloudDialogflowCxV3ToolDataStoreTool),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3Tool" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Tool>;

export interface GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceOAuthConfig {
  clientSecret?: string;
  scopes?: Array<string>;
  clientId?: string;
  tokenEndpoint?: string;
  secretVersionForClientSecret?: string;
}

export const GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceOAuthConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceOAuthConfig> = Schema.suspend(() => Schema.Struct({
  clientSecret: Schema.optional(Schema.String),
  scopes: Schema.optional(Schema.Array(Schema.String)),
  clientId: Schema.optional(Schema.String),
  tokenEndpoint: Schema.optional(Schema.String),
  secretVersionForClientSecret: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceOAuthConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceOAuthConfig>;

export interface GoogleCloudDialogflowCxV3PlaybookInput {
  precedingConversationSummary?: string;
}

export const GoogleCloudDialogflowCxV3PlaybookInput: Schema.Schema<GoogleCloudDialogflowCxV3PlaybookInput> = Schema.suspend(() => Schema.Struct({
  precedingConversationSummary: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3PlaybookInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3PlaybookInput>;

export interface GoogleCloudDialogflowCxV3PlaybookOutput {
  executionSummary?: string;
}

export const GoogleCloudDialogflowCxV3PlaybookOutput: Schema.Schema<GoogleCloudDialogflowCxV3PlaybookOutput> = Schema.suspend(() => Schema.Struct({
  executionSummary: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3PlaybookOutput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3PlaybookOutput>;

export interface GoogleCloudDialogflowCxV3PlaybookTransition {
  playbook?: string;
  displayName?: string;
}

export const GoogleCloudDialogflowCxV3PlaybookTransition: Schema.Schema<GoogleCloudDialogflowCxV3PlaybookTransition> = Schema.suspend(() => Schema.Struct({
  playbook: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3PlaybookTransition" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3PlaybookTransition>;

export interface GoogleCloudDialogflowCxV3AgentUtterance {
  text?: string;
}

export const GoogleCloudDialogflowCxV3AgentUtterance: Schema.Schema<GoogleCloudDialogflowCxV3AgentUtterance> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3AgentUtterance" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AgentUtterance>;

export interface GoogleCloudDialogflowCxV3FlowInvocation {
  flowState?: "OUTPUT_STATE_UNSPECIFIED" | "OUTPUT_STATE_OK" | "OUTPUT_STATE_CANCELLED" | "OUTPUT_STATE_FAILED" | "OUTPUT_STATE_ESCALATED" | "OUTPUT_STATE_PENDING" | (string & {});
  flow?: string;
  displayName?: string;
}

export const GoogleCloudDialogflowCxV3FlowInvocation: Schema.Schema<GoogleCloudDialogflowCxV3FlowInvocation> = Schema.suspend(() => Schema.Struct({
  flowState: Schema.optional(Schema.String),
  flow: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3FlowInvocation" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FlowInvocation>;

export interface GoogleCloudDialogflowCxV3UserUtterance {
  text?: string;
}

export const GoogleCloudDialogflowCxV3UserUtterance: Schema.Schema<GoogleCloudDialogflowCxV3UserUtterance> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3UserUtterance" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3UserUtterance>;

export interface GoogleCloudDialogflowCxV3PlaybookInvocation {
  playbook?: string;
  playbookState?: "OUTPUT_STATE_UNSPECIFIED" | "OUTPUT_STATE_OK" | "OUTPUT_STATE_CANCELLED" | "OUTPUT_STATE_FAILED" | "OUTPUT_STATE_ESCALATED" | "OUTPUT_STATE_PENDING" | (string & {});
  playbookInput?: GoogleCloudDialogflowCxV3PlaybookInput;
  displayName?: string;
  playbookOutput?: GoogleCloudDialogflowCxV3PlaybookOutput;
}

export const GoogleCloudDialogflowCxV3PlaybookInvocation: Schema.Schema<GoogleCloudDialogflowCxV3PlaybookInvocation> = Schema.suspend(() => Schema.Struct({
  playbook: Schema.optional(Schema.String),
  playbookState: Schema.optional(Schema.String),
  playbookInput: Schema.optional(GoogleCloudDialogflowCxV3PlaybookInput),
  displayName: Schema.optional(Schema.String),
  playbookOutput: Schema.optional(GoogleCloudDialogflowCxV3PlaybookOutput),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3PlaybookInvocation" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3PlaybookInvocation>;

export interface GoogleCloudDialogflowCxV3Action {
  flowTransition?: GoogleCloudDialogflowCxV3FlowTransition;
  playbookTransition?: GoogleCloudDialogflowCxV3PlaybookTransition;
  agentUtterance?: GoogleCloudDialogflowCxV3AgentUtterance;
  toolUse?: GoogleCloudDialogflowCxV3ToolUse;
  flowInvocation?: GoogleCloudDialogflowCxV3FlowInvocation;
  userUtterance?: GoogleCloudDialogflowCxV3UserUtterance;
  playbookInvocation?: GoogleCloudDialogflowCxV3PlaybookInvocation;
}

export const GoogleCloudDialogflowCxV3Action: Schema.Schema<GoogleCloudDialogflowCxV3Action> = Schema.suspend(() => Schema.Struct({
  flowTransition: Schema.optional(GoogleCloudDialogflowCxV3FlowTransition),
  playbookTransition: Schema.optional(GoogleCloudDialogflowCxV3PlaybookTransition),
  agentUtterance: Schema.optional(GoogleCloudDialogflowCxV3AgentUtterance),
  toolUse: Schema.optional(GoogleCloudDialogflowCxV3ToolUse),
  flowInvocation: Schema.optional(GoogleCloudDialogflowCxV3FlowInvocation),
  userUtterance: Schema.optional(GoogleCloudDialogflowCxV3UserUtterance),
  playbookInvocation: Schema.optional(GoogleCloudDialogflowCxV3PlaybookInvocation),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3Action" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Action>;

export interface GoogleCloudDialogflowCxV3Example {
  languageCode?: string;
  conversationState?: "OUTPUT_STATE_UNSPECIFIED" | "OUTPUT_STATE_OK" | "OUTPUT_STATE_CANCELLED" | "OUTPUT_STATE_FAILED" | "OUTPUT_STATE_ESCALATED" | "OUTPUT_STATE_PENDING" | (string & {});
  playbookInput?: GoogleCloudDialogflowCxV3PlaybookInput;
  name?: string;
  displayName?: string;
  playbookOutput?: GoogleCloudDialogflowCxV3PlaybookOutput;
  tokenCount?: string;
  createTime?: string;
  description?: string;
  actions?: Array<GoogleCloudDialogflowCxV3Action>;
  updateTime?: string;
}

export const GoogleCloudDialogflowCxV3Example: Schema.Schema<GoogleCloudDialogflowCxV3Example> = Schema.suspend(() => Schema.Struct({
  languageCode: Schema.optional(Schema.String),
  conversationState: Schema.optional(Schema.String),
  playbookInput: Schema.optional(GoogleCloudDialogflowCxV3PlaybookInput),
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  playbookOutput: Schema.optional(GoogleCloudDialogflowCxV3PlaybookOutput),
  tokenCount: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  actions: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Action)),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3Example" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Example>;

export interface GoogleCloudDialogflowCxV3PlaybookStep {
  steps?: Array<GoogleCloudDialogflowCxV3PlaybookStep>;
  text?: string;
}

export const GoogleCloudDialogflowCxV3PlaybookStep: Schema.Schema<GoogleCloudDialogflowCxV3PlaybookStep> = Schema.suspend(() => Schema.Struct({
  steps: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3PlaybookStep)),
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3PlaybookStep" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3PlaybookStep>;

export interface GoogleCloudDialogflowCxV3PlaybookInstruction {
  guidelines?: string;
  steps?: Array<GoogleCloudDialogflowCxV3PlaybookStep>;
}

export const GoogleCloudDialogflowCxV3PlaybookInstruction: Schema.Schema<GoogleCloudDialogflowCxV3PlaybookInstruction> = Schema.suspend(() => Schema.Struct({
  guidelines: Schema.optional(Schema.String),
  steps: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3PlaybookStep)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3PlaybookInstruction" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3PlaybookInstruction>;

export interface GoogleCloudDialogflowCxV3CodeBlock {
  code?: string;
}

export const GoogleCloudDialogflowCxV3CodeBlock: Schema.Schema<GoogleCloudDialogflowCxV3CodeBlock> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3CodeBlock" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3CodeBlock>;

export interface GoogleCloudDialogflowCxV3HandlerEventHandler {
  condition?: string;
  fulfillment?: GoogleCloudDialogflowCxV3Fulfillment;
  event?: string;
}

export const GoogleCloudDialogflowCxV3HandlerEventHandler: Schema.Schema<GoogleCloudDialogflowCxV3HandlerEventHandler> = Schema.suspend(() => Schema.Struct({
  condition: Schema.optional(Schema.String),
  fulfillment: Schema.optional(GoogleCloudDialogflowCxV3Fulfillment),
  event: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3HandlerEventHandler" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3HandlerEventHandler>;

export interface GoogleCloudDialogflowCxV3HandlerLifecycleHandler {
  lifecycleStage?: string;
  condition?: string;
  fulfillment?: GoogleCloudDialogflowCxV3Fulfillment;
}

export const GoogleCloudDialogflowCxV3HandlerLifecycleHandler: Schema.Schema<GoogleCloudDialogflowCxV3HandlerLifecycleHandler> = Schema.suspend(() => Schema.Struct({
  lifecycleStage: Schema.optional(Schema.String),
  condition: Schema.optional(Schema.String),
  fulfillment: Schema.optional(GoogleCloudDialogflowCxV3Fulfillment),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3HandlerLifecycleHandler" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3HandlerLifecycleHandler>;

export interface GoogleCloudDialogflowCxV3Handler {
  eventHandler?: GoogleCloudDialogflowCxV3HandlerEventHandler;
  lifecycleHandler?: GoogleCloudDialogflowCxV3HandlerLifecycleHandler;
}

export const GoogleCloudDialogflowCxV3Handler: Schema.Schema<GoogleCloudDialogflowCxV3Handler> = Schema.suspend(() => Schema.Struct({
  eventHandler: Schema.optional(GoogleCloudDialogflowCxV3HandlerEventHandler),
  lifecycleHandler: Schema.optional(GoogleCloudDialogflowCxV3HandlerLifecycleHandler),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3Handler" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Handler>;

export interface GoogleCloudDialogflowCxV3Playbook {
  name?: string;
  inlineActions?: Array<string>;
  inputParameterDefinitions?: Array<GoogleCloudDialogflowCxV3ParameterDefinition>;
  outputParameterDefinitions?: Array<GoogleCloudDialogflowCxV3ParameterDefinition>;
  updateTime?: string;
  referencedFlows?: Array<string>;
  displayName?: string;
  tokenCount?: string;
  referencedTools?: Array<string>;
  llmModelSettings?: GoogleCloudDialogflowCxV3LlmModelSettings;
  createTime?: string;
  instruction?: GoogleCloudDialogflowCxV3PlaybookInstruction;
  playbookType?: "PLAYBOOK_TYPE_UNSPECIFIED" | "TASK" | "ROUTINE" | (string & {});
  codeBlock?: GoogleCloudDialogflowCxV3CodeBlock;
  handlers?: Array<GoogleCloudDialogflowCxV3Handler>;
  referencedPlaybooks?: Array<string>;
  goal?: string;
}

export const GoogleCloudDialogflowCxV3Playbook: Schema.Schema<GoogleCloudDialogflowCxV3Playbook> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  inlineActions: Schema.optional(Schema.Array(Schema.String)),
  inputParameterDefinitions: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3ParameterDefinition)),
  outputParameterDefinitions: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3ParameterDefinition)),
  updateTime: Schema.optional(Schema.String),
  referencedFlows: Schema.optional(Schema.Array(Schema.String)),
  displayName: Schema.optional(Schema.String),
  tokenCount: Schema.optional(Schema.String),
  referencedTools: Schema.optional(Schema.Array(Schema.String)),
  llmModelSettings: Schema.optional(GoogleCloudDialogflowCxV3LlmModelSettings),
  createTime: Schema.optional(Schema.String),
  instruction: Schema.optional(GoogleCloudDialogflowCxV3PlaybookInstruction),
  playbookType: Schema.optional(Schema.String),
  codeBlock: Schema.optional(GoogleCloudDialogflowCxV3CodeBlock),
  handlers: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Handler)),
  referencedPlaybooks: Schema.optional(Schema.Array(Schema.String)),
  goal: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3Playbook" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Playbook>;

export interface GoogleCloudDialogflowCxV3PlaybookVersion {
  examples?: Array<GoogleCloudDialogflowCxV3Example>;
  updateTime?: string;
  description?: string;
  playbook?: GoogleCloudDialogflowCxV3Playbook;
  name?: string;
}

export const GoogleCloudDialogflowCxV3PlaybookVersion: Schema.Schema<GoogleCloudDialogflowCxV3PlaybookVersion> = Schema.suspend(() => Schema.Struct({
  examples: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Example)),
  updateTime: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  playbook: Schema.optional(GoogleCloudDialogflowCxV3Playbook),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3PlaybookVersion" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3PlaybookVersion>;

export interface GoogleCloudDialogflowCxV3ListPlaybookVersionsResponse {
  playbookVersions?: Array<GoogleCloudDialogflowCxV3PlaybookVersion>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListPlaybookVersionsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListPlaybookVersionsResponse> = Schema.suspend(() => Schema.Struct({
  playbookVersions: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3PlaybookVersion)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ListPlaybookVersionsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListPlaybookVersionsResponse>;

export interface GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion {
  suggestionIndex?: number;
  similarityScore?: number;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion> = Schema.suspend(() => Schema.Struct({
  suggestionIndex: Schema.optional(Schema.Number),
  similarityScore: Schema.optional(Schema.Number),
  answerRecord: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion>;

export interface GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResult {
  duplicateSuggestions?: Array<GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion>;
}

export const GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResult: Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResult> = Schema.suspend(() => Schema.Struct({
  duplicateSuggestions: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResult>;

export interface GoogleCloudDialogflowV2Sentiment {
  magnitude?: number;
  score?: number;
}

export const GoogleCloudDialogflowV2Sentiment: Schema.Schema<GoogleCloudDialogflowV2Sentiment> = Schema.suspend(() => Schema.Struct({
  magnitude: Schema.optional(Schema.Number),
  score: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2Sentiment" }) as any as Schema.Schema<GoogleCloudDialogflowV2Sentiment>;

export interface GoogleCloudDialogflowV2SentimentAnalysisResult {
  queryTextSentiment?: GoogleCloudDialogflowV2Sentiment;
}

export const GoogleCloudDialogflowV2SentimentAnalysisResult: Schema.Schema<GoogleCloudDialogflowV2SentimentAnalysisResult> = Schema.suspend(() => Schema.Struct({
  queryTextSentiment: Schema.optional(GoogleCloudDialogflowV2Sentiment),
})).annotate({ identifier: "GoogleCloudDialogflowV2SentimentAnalysisResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2SentimentAnalysisResult>;

export interface GoogleCloudDialogflowV2QueryResult {
  outputContexts?: Array<GoogleCloudDialogflowV2Context>;
  queryText?: string;
  intentDetectionConfidence?: number;
  diagnosticInfo?: Record<string, unknown>;
  speechRecognitionConfidence?: number;
  webhookPayload?: Record<string, unknown>;
  fulfillmentMessages?: Array<GoogleCloudDialogflowV2IntentMessage>;
  cancelsSlotFilling?: boolean;
  intent?: GoogleCloudDialogflowV2Intent;
  languageCode?: string;
  sentimentAnalysisResult?: GoogleCloudDialogflowV2SentimentAnalysisResult;
  webhookSource?: string;
  action?: string;
  parameters?: Record<string, unknown>;
  fulfillmentText?: string;
  allRequiredParamsPresent?: boolean;
}

export const GoogleCloudDialogflowV2QueryResult: Schema.Schema<GoogleCloudDialogflowV2QueryResult> = Schema.suspend(() => Schema.Struct({
  outputContexts: Schema.optional(Schema.Array(GoogleCloudDialogflowV2Context)),
  queryText: Schema.optional(Schema.String),
  intentDetectionConfidence: Schema.optional(Schema.Number),
  diagnosticInfo: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  speechRecognitionConfidence: Schema.optional(Schema.Number),
  webhookPayload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  fulfillmentMessages: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentMessage)),
  cancelsSlotFilling: Schema.optional(Schema.Boolean),
  intent: Schema.optional(GoogleCloudDialogflowV2Intent),
  languageCode: Schema.optional(Schema.String),
  sentimentAnalysisResult: Schema.optional(GoogleCloudDialogflowV2SentimentAnalysisResult),
  webhookSource: Schema.optional(Schema.String),
  action: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  fulfillmentText: Schema.optional(Schema.String),
  allRequiredParamsPresent: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2QueryResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2QueryResult>;

export interface GoogleCloudDialogflowCxV3beta1TurnSignals {
  reachedEndPage?: boolean;
  webhookStatuses?: Array<string>;
  sentimentScore?: number;
  dtmfUsed?: boolean;
  userEscalated?: boolean;
  sentimentMagnitude?: number;
  failureReasons?: Array<"FAILURE_REASON_UNSPECIFIED" | "FAILED_INTENT" | "FAILED_WEBHOOK" | (string & {})>;
  agentEscalated?: boolean;
  noMatch?: boolean;
  noUserInput?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1TurnSignals: Schema.Schema<GoogleCloudDialogflowCxV3beta1TurnSignals> = Schema.suspend(() => Schema.Struct({
  reachedEndPage: Schema.optional(Schema.Boolean),
  webhookStatuses: Schema.optional(Schema.Array(Schema.String)),
  sentimentScore: Schema.optional(Schema.Number),
  dtmfUsed: Schema.optional(Schema.Boolean),
  userEscalated: Schema.optional(Schema.Boolean),
  sentimentMagnitude: Schema.optional(Schema.Number),
  failureReasons: Schema.optional(Schema.Array(Schema.String)),
  agentEscalated: Schema.optional(Schema.Boolean),
  noMatch: Schema.optional(Schema.Boolean),
  noUserInput: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1TurnSignals" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TurnSignals>;

export interface GoogleCloudDialogflowCxV3EnvironmentVersionConfig {
  version?: string;
}

export const GoogleCloudDialogflowCxV3EnvironmentVersionConfig: Schema.Schema<GoogleCloudDialogflowCxV3EnvironmentVersionConfig> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3EnvironmentVersionConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3EnvironmentVersionConfig>;

export interface GoogleCloudDialogflowCxV3AnswerFeedbackRatingReason {
  feedback?: string;
  reasonLabels?: Array<string>;
}

export const GoogleCloudDialogflowCxV3AnswerFeedbackRatingReason: Schema.Schema<GoogleCloudDialogflowCxV3AnswerFeedbackRatingReason> = Schema.suspend(() => Schema.Struct({
  feedback: Schema.optional(Schema.String),
  reasonLabels: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3AnswerFeedbackRatingReason" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AnswerFeedbackRatingReason>;

export interface GoogleCloudDialogflowCxV3ContinuousTestResult {
  testCaseResults?: Array<string>;
  result?: "AGGREGATED_TEST_RESULT_UNSPECIFIED" | "PASSED" | "FAILED" | (string & {});
  name?: string;
  runTime?: string;
}

export const GoogleCloudDialogflowCxV3ContinuousTestResult: Schema.Schema<GoogleCloudDialogflowCxV3ContinuousTestResult> = Schema.suspend(() => Schema.Struct({
  testCaseResults: Schema.optional(Schema.Array(Schema.String)),
  result: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  runTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ContinuousTestResult" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ContinuousTestResult>;

export interface GoogleCloudDialogflowCxV3RunContinuousTestResponse {
  continuousTestResult?: GoogleCloudDialogflowCxV3ContinuousTestResult;
}

export const GoogleCloudDialogflowCxV3RunContinuousTestResponse: Schema.Schema<GoogleCloudDialogflowCxV3RunContinuousTestResponse> = Schema.suspend(() => Schema.Struct({
  continuousTestResult: Schema.optional(GoogleCloudDialogflowCxV3ContinuousTestResult),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3RunContinuousTestResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RunContinuousTestResponse>;

export interface GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources {
  instructionIndexes?: Array<number>;
}

export const GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources: Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources> = Schema.suspend(() => Schema.Struct({
  instructionIndexes: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources>;

export interface GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion {
  similarityScore?: number;
  sources?: GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources;
  answerRecord?: string;
  suggestionIndex?: number;
}

export const GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion> = Schema.suspend(() => Schema.Struct({
  similarityScore: Schema.optional(Schema.Number),
  sources: Schema.optional(GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources),
  answerRecord: Schema.optional(Schema.String),
  suggestionIndex: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion>;

export interface GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResult {
  duplicateSuggestions?: Array<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion>;
}

export const GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResult: Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResult> = Schema.suspend(() => Schema.Struct({
  duplicateSuggestions: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResult>;

export interface GoogleCloudDialogflowCxV3WebhookResponseFulfillmentResponse {
  mergeBehavior?: "MERGE_BEHAVIOR_UNSPECIFIED" | "APPEND" | "REPLACE" | (string & {});
  messages?: Array<GoogleCloudDialogflowCxV3ResponseMessage>;
}

export const GoogleCloudDialogflowCxV3WebhookResponseFulfillmentResponse: Schema.Schema<GoogleCloudDialogflowCxV3WebhookResponseFulfillmentResponse> = Schema.suspend(() => Schema.Struct({
  mergeBehavior: Schema.optional(Schema.String),
  messages: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3ResponseMessage)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3WebhookResponseFulfillmentResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookResponseFulfillmentResponse>;

export interface GoogleCloudDialogflowV2ImportConversationDataOperationResponse {
  conversationDataset?: string;
  importCount?: number;
}

export const GoogleCloudDialogflowV2ImportConversationDataOperationResponse: Schema.Schema<GoogleCloudDialogflowV2ImportConversationDataOperationResponse> = Schema.suspend(() => Schema.Struct({
  conversationDataset: Schema.optional(Schema.String),
  importCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2ImportConversationDataOperationResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2ImportConversationDataOperationResponse>;

export interface GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSampleResponse {
  sources?: GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources;
  responseText?: string;
  duplicateCheckResult?: GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResult;
}

export const GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSampleResponse: Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSampleResponse> = Schema.suspend(() => Schema.Struct({
  sources: Schema.optional(GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources),
  responseText: Schema.optional(Schema.String),
  duplicateCheckResult: Schema.optional(GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResult),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSampleResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSampleResponse>;

export interface GoogleCloudDialogflowCxV3ExportTestCasesResponse {
  content?: string;
  gcsUri?: string;
}

export const GoogleCloudDialogflowCxV3ExportTestCasesResponse: Schema.Schema<GoogleCloudDialogflowCxV3ExportTestCasesResponse> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
  gcsUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ExportTestCasesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportTestCasesResponse>;

export interface GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerSuggestedQuery {
  queryText?: string;
}

export const GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerSuggestedQuery: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerSuggestedQuery> = Schema.suspend(() => Schema.Struct({
  queryText: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerSuggestedQuery" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerSuggestedQuery>;

export interface GoogleCloudDialogflowV2EntityType {
  displayName?: string;
  kind?: "KIND_UNSPECIFIED" | "KIND_MAP" | "KIND_LIST" | "KIND_REGEXP" | (string & {});
  autoExpansionMode?: "AUTO_EXPANSION_MODE_UNSPECIFIED" | "AUTO_EXPANSION_MODE_DEFAULT" | (string & {});
  entities?: Array<GoogleCloudDialogflowV2EntityTypeEntity>;
  enableFuzzyExtraction?: boolean;
  name?: string;
}

export const GoogleCloudDialogflowV2EntityType: Schema.Schema<GoogleCloudDialogflowV2EntityType> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  autoExpansionMode: Schema.optional(Schema.String),
  entities: Schema.optional(Schema.Array(GoogleCloudDialogflowV2EntityTypeEntity)),
  enableFuzzyExtraction: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2EntityType" }) as any as Schema.Schema<GoogleCloudDialogflowV2EntityType>;

export interface GoogleCloudDialogflowV2BatchUpdateEntityTypesResponse {
  entityTypes?: Array<GoogleCloudDialogflowV2EntityType>;
}

export const GoogleCloudDialogflowV2BatchUpdateEntityTypesResponse: Schema.Schema<GoogleCloudDialogflowV2BatchUpdateEntityTypesResponse> = Schema.suspend(() => Schema.Struct({
  entityTypes: Schema.optional(Schema.Array(GoogleCloudDialogflowV2EntityType)),
})).annotate({ identifier: "GoogleCloudDialogflowV2BatchUpdateEntityTypesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2BatchUpdateEntityTypesResponse>;

export interface GoogleCloudDialogflowV2SmartReplyModelMetadata {
  trainingModelType?: "MODEL_TYPE_UNSPECIFIED" | "SMART_REPLY_DUAL_ENCODER_MODEL" | "SMART_REPLY_BERT_MODEL" | (string & {});
}

export const GoogleCloudDialogflowV2SmartReplyModelMetadata: Schema.Schema<GoogleCloudDialogflowV2SmartReplyModelMetadata> = Schema.suspend(() => Schema.Struct({
  trainingModelType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2SmartReplyModelMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2SmartReplyModelMetadata>;

export interface GoogleCloudDialogflowCxV3EnvironmentTestCasesConfig {
  testCases?: Array<string>;
  enablePredeploymentRun?: boolean;
  enableContinuousRun?: boolean;
}

export const GoogleCloudDialogflowCxV3EnvironmentTestCasesConfig: Schema.Schema<GoogleCloudDialogflowCxV3EnvironmentTestCasesConfig> = Schema.suspend(() => Schema.Struct({
  testCases: Schema.optional(Schema.Array(Schema.String)),
  enablePredeploymentRun: Schema.optional(Schema.Boolean),
  enableContinuousRun: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3EnvironmentTestCasesConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3EnvironmentTestCasesConfig>;

export interface GoogleCloudDialogflowCxV3EnvironmentWebhookConfig {
  webhookOverrides?: Array<GoogleCloudDialogflowCxV3Webhook>;
}

export const GoogleCloudDialogflowCxV3EnvironmentWebhookConfig: Schema.Schema<GoogleCloudDialogflowCxV3EnvironmentWebhookConfig> = Schema.suspend(() => Schema.Struct({
  webhookOverrides: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Webhook)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3EnvironmentWebhookConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3EnvironmentWebhookConfig>;

export interface GoogleCloudDialogflowCxV3Environment {
  versionConfigs?: Array<GoogleCloudDialogflowCxV3EnvironmentVersionConfig>;
  updateTime?: string;
  description?: string;
  name?: string;
  testCasesConfig?: GoogleCloudDialogflowCxV3EnvironmentTestCasesConfig;
  displayName?: string;
  webhookConfig?: GoogleCloudDialogflowCxV3EnvironmentWebhookConfig;
}

export const GoogleCloudDialogflowCxV3Environment: Schema.Schema<GoogleCloudDialogflowCxV3Environment> = Schema.suspend(() => Schema.Struct({
  versionConfigs: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3EnvironmentVersionConfig)),
  updateTime: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  testCasesConfig: Schema.optional(GoogleCloudDialogflowCxV3EnvironmentTestCasesConfig),
  displayName: Schema.optional(Schema.String),
  webhookConfig: Schema.optional(GoogleCloudDialogflowCxV3EnvironmentWebhookConfig),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3Environment" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Environment>;

export interface GoogleCloudDialogflowV2beta1EntityType {
  kind?: "KIND_UNSPECIFIED" | "KIND_MAP" | "KIND_LIST" | "KIND_REGEXP" | (string & {});
  enableFuzzyExtraction?: boolean;
  name?: string;
  autoExpansionMode?: "AUTO_EXPANSION_MODE_UNSPECIFIED" | "AUTO_EXPANSION_MODE_DEFAULT" | (string & {});
  entities?: Array<GoogleCloudDialogflowV2beta1EntityTypeEntity>;
  displayName?: string;
}

export const GoogleCloudDialogflowV2beta1EntityType: Schema.Schema<GoogleCloudDialogflowV2beta1EntityType> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  enableFuzzyExtraction: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
  autoExpansionMode: Schema.optional(Schema.String),
  entities: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1EntityTypeEntity)),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1EntityType" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1EntityType>;

export interface GoogleCloudDialogflowCxV3IntentCoverageIntent {
  intent?: string;
  covered?: boolean;
}

export const GoogleCloudDialogflowCxV3IntentCoverageIntent: Schema.Schema<GoogleCloudDialogflowCxV3IntentCoverageIntent> = Schema.suspend(() => Schema.Struct({
  intent: Schema.optional(Schema.String),
  covered: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3IntentCoverageIntent" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3IntentCoverageIntent>;

export interface GoogleCloudDialogflowCxV3ImportTestCasesRequest {
  content?: string;
  gcsUri?: string;
}

export const GoogleCloudDialogflowCxV3ImportTestCasesRequest: Schema.Schema<GoogleCloudDialogflowCxV3ImportTestCasesRequest> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
  gcsUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ImportTestCasesRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportTestCasesRequest>;

export interface GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesResponse {
  entityTypes?: Array<GoogleCloudDialogflowV2beta1EntityType>;
}

export const GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesResponse: Schema.Schema<GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesResponse> = Schema.suspend(() => Schema.Struct({
  entityTypes: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1EntityType)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesResponse>;

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

export interface GoogleCloudDialogflowCxV3EventInput {
  event?: string;
}

export const GoogleCloudDialogflowCxV3EventInput: Schema.Schema<GoogleCloudDialogflowCxV3EventInput> = Schema.suspend(() => Schema.Struct({
  event: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3EventInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3EventInput>;

export interface GoogleCloudDialogflowCxV3BargeInConfig {
  totalDuration?: string;
  noBargeInDuration?: string;
}

export const GoogleCloudDialogflowCxV3BargeInConfig: Schema.Schema<GoogleCloudDialogflowCxV3BargeInConfig> = Schema.suspend(() => Schema.Struct({
  totalDuration: Schema.optional(Schema.String),
  noBargeInDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3BargeInConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3BargeInConfig>;

export interface GoogleCloudDialogflowCxV3InputAudioConfig {
  bargeInConfig?: GoogleCloudDialogflowCxV3BargeInConfig;
  optOutConformerModelMigration?: boolean;
  sampleRateHertz?: number;
  phraseHints?: Array<string>;
  model?: string;
  singleUtterance?: boolean;
  audioEncoding?: "AUDIO_ENCODING_UNSPECIFIED" | "AUDIO_ENCODING_LINEAR_16" | "AUDIO_ENCODING_FLAC" | "AUDIO_ENCODING_MULAW" | "AUDIO_ENCODING_AMR" | "AUDIO_ENCODING_AMR_WB" | "AUDIO_ENCODING_OGG_OPUS" | "AUDIO_ENCODING_SPEEX_WITH_HEADER_BYTE" | "AUDIO_ENCODING_ALAW" | (string & {});
  modelVariant?: "SPEECH_MODEL_VARIANT_UNSPECIFIED" | "USE_BEST_AVAILABLE" | "USE_STANDARD" | "USE_ENHANCED" | (string & {});
  enableWordInfo?: boolean;
}

export const GoogleCloudDialogflowCxV3InputAudioConfig: Schema.Schema<GoogleCloudDialogflowCxV3InputAudioConfig> = Schema.suspend(() => Schema.Struct({
  bargeInConfig: Schema.optional(GoogleCloudDialogflowCxV3BargeInConfig),
  optOutConformerModelMigration: Schema.optional(Schema.Boolean),
  sampleRateHertz: Schema.optional(Schema.Number),
  phraseHints: Schema.optional(Schema.Array(Schema.String)),
  model: Schema.optional(Schema.String),
  singleUtterance: Schema.optional(Schema.Boolean),
  audioEncoding: Schema.optional(Schema.String),
  modelVariant: Schema.optional(Schema.String),
  enableWordInfo: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3InputAudioConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3InputAudioConfig>;

export interface GoogleCloudDialogflowCxV3AudioInput {
  config?: GoogleCloudDialogflowCxV3InputAudioConfig;
  audio?: string;
}

export const GoogleCloudDialogflowCxV3AudioInput: Schema.Schema<GoogleCloudDialogflowCxV3AudioInput> = Schema.suspend(() => Schema.Struct({
  config: Schema.optional(GoogleCloudDialogflowCxV3InputAudioConfig),
  audio: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3AudioInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AudioInput>;

export interface GoogleCloudDialogflowCxV3ToolCallResultError {
  message?: string;
}

export const GoogleCloudDialogflowCxV3ToolCallResultError: Schema.Schema<GoogleCloudDialogflowCxV3ToolCallResultError> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ToolCallResultError" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolCallResultError>;

export interface GoogleCloudDialogflowCxV3ToolCallResult {
  outputParameters?: Record<string, unknown>;
  action?: string;
  tool?: string;
  error?: GoogleCloudDialogflowCxV3ToolCallResultError;
}

export const GoogleCloudDialogflowCxV3ToolCallResult: Schema.Schema<GoogleCloudDialogflowCxV3ToolCallResult> = Schema.suspend(() => Schema.Struct({
  outputParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  action: Schema.optional(Schema.String),
  tool: Schema.optional(Schema.String),
  error: Schema.optional(GoogleCloudDialogflowCxV3ToolCallResultError),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ToolCallResult" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolCallResult>;

export interface GoogleCloudDialogflowCxV3TextInput {
  text?: string;
}

export const GoogleCloudDialogflowCxV3TextInput: Schema.Schema<GoogleCloudDialogflowCxV3TextInput> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3TextInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TextInput>;

export interface GoogleCloudDialogflowCxV3QueryInput {
  event?: GoogleCloudDialogflowCxV3EventInput;
  audio?: GoogleCloudDialogflowCxV3AudioInput;
  intent?: GoogleCloudDialogflowCxV3IntentInput;
  dtmf?: GoogleCloudDialogflowCxV3DtmfInput;
  languageCode?: string;
  toolCallResult?: GoogleCloudDialogflowCxV3ToolCallResult;
  text?: GoogleCloudDialogflowCxV3TextInput;
}

export const GoogleCloudDialogflowCxV3QueryInput: Schema.Schema<GoogleCloudDialogflowCxV3QueryInput> = Schema.suspend(() => Schema.Struct({
  event: Schema.optional(GoogleCloudDialogflowCxV3EventInput),
  audio: Schema.optional(GoogleCloudDialogflowCxV3AudioInput),
  intent: Schema.optional(GoogleCloudDialogflowCxV3IntentInput),
  dtmf: Schema.optional(GoogleCloudDialogflowCxV3DtmfInput),
  languageCode: Schema.optional(Schema.String),
  toolCallResult: Schema.optional(GoogleCloudDialogflowCxV3ToolCallResult),
  text: Schema.optional(GoogleCloudDialogflowCxV3TextInput),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3QueryInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3QueryInput>;

export interface GoogleCloudDialogflowCxV3ConversationTurnUserInput {
  enableSentimentAnalysis?: boolean;
  isWebhookEnabled?: boolean;
  input?: GoogleCloudDialogflowCxV3QueryInput;
  injectedParameters?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3ConversationTurnUserInput: Schema.Schema<GoogleCloudDialogflowCxV3ConversationTurnUserInput> = Schema.suspend(() => Schema.Struct({
  enableSentimentAnalysis: Schema.optional(Schema.Boolean),
  isWebhookEnabled: Schema.optional(Schema.Boolean),
  input: Schema.optional(GoogleCloudDialogflowCxV3QueryInput),
  injectedParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ConversationTurnUserInput" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ConversationTurnUserInput>;

export interface GoogleCloudDialogflowCxV3TestRunDifference {
  description?: string;
  type?: "DIFF_TYPE_UNSPECIFIED" | "INTENT" | "PAGE" | "PARAMETERS" | "UTTERANCE" | "FLOW" | (string & {});
}

export const GoogleCloudDialogflowCxV3TestRunDifference: Schema.Schema<GoogleCloudDialogflowCxV3TestRunDifference> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3TestRunDifference" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TestRunDifference>;

export interface GoogleCloudDialogflowCxV3ConversationTurnVirtualAgentOutput {
  currentPage?: GoogleCloudDialogflowCxV3Page;
  differences?: Array<GoogleCloudDialogflowCxV3TestRunDifference>;
  sessionParameters?: Record<string, unknown>;
  status?: GoogleRpcStatus;
  triggeredIntent?: GoogleCloudDialogflowCxV3Intent;
  diagnosticInfo?: Record<string, unknown>;
  textResponses?: Array<GoogleCloudDialogflowCxV3ResponseMessageText>;
}

export const GoogleCloudDialogflowCxV3ConversationTurnVirtualAgentOutput: Schema.Schema<GoogleCloudDialogflowCxV3ConversationTurnVirtualAgentOutput> = Schema.suspend(() => Schema.Struct({
  currentPage: Schema.optional(GoogleCloudDialogflowCxV3Page),
  differences: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3TestRunDifference)),
  sessionParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  status: Schema.optional(GoogleRpcStatus),
  triggeredIntent: Schema.optional(GoogleCloudDialogflowCxV3Intent),
  diagnosticInfo: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  textResponses: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3ResponseMessageText)),
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
  testTime?: string;
  environment?: string;
  testResult?: "TEST_RESULT_UNSPECIFIED" | "PASSED" | "FAILED" | (string & {});
  name?: string;
  conversationTurns?: Array<GoogleCloudDialogflowCxV3ConversationTurn>;
}

export const GoogleCloudDialogflowCxV3TestCaseResult: Schema.Schema<GoogleCloudDialogflowCxV3TestCaseResult> = Schema.suspend(() => Schema.Struct({
  testTime: Schema.optional(Schema.String),
  environment: Schema.optional(Schema.String),
  testResult: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  conversationTurns: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3ConversationTurn)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3TestCaseResult" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TestCaseResult>;

export interface GoogleCloudDialogflowCxV3TestConfig {
  flow?: string;
  page?: string;
  trackingParameters?: Array<string>;
}

export const GoogleCloudDialogflowCxV3TestConfig: Schema.Schema<GoogleCloudDialogflowCxV3TestConfig> = Schema.suspend(() => Schema.Struct({
  flow: Schema.optional(Schema.String),
  page: Schema.optional(Schema.String),
  trackingParameters: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3TestConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TestConfig>;

export interface GoogleCloudDialogflowCxV3TestCase {
  tags?: Array<string>;
  lastTestResult?: GoogleCloudDialogflowCxV3TestCaseResult;
  testCaseConversationTurns?: Array<GoogleCloudDialogflowCxV3ConversationTurn>;
  creationTime?: string;
  notes?: string;
  testConfig?: GoogleCloudDialogflowCxV3TestConfig;
  displayName?: string;
  name?: string;
}

export const GoogleCloudDialogflowCxV3TestCase: Schema.Schema<GoogleCloudDialogflowCxV3TestCase> = Schema.suspend(() => Schema.Struct({
  tags: Schema.optional(Schema.Array(Schema.String)),
  lastTestResult: Schema.optional(GoogleCloudDialogflowCxV3TestCaseResult),
  testCaseConversationTurns: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3ConversationTurn)),
  creationTime: Schema.optional(Schema.String),
  notes: Schema.optional(Schema.String),
  testConfig: Schema.optional(GoogleCloudDialogflowCxV3TestConfig),
  displayName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3TestCase" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TestCase>;

export interface GoogleCloudDialogflowCxV3beta1FulfillmentSetParameterAction {
  value?: unknown;
  parameter?: string;
}

export const GoogleCloudDialogflowCxV3beta1FulfillmentSetParameterAction: Schema.Schema<GoogleCloudDialogflowCxV3beta1FulfillmentSetParameterAction> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Unknown),
  parameter: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1FulfillmentSetParameterAction" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1FulfillmentSetParameterAction>;

export interface GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpecBoostControlSpec {
  controlPoints?: Array<GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpecBoostControlSpecControlPoint>;
  fieldName?: string;
  attributeType?: "ATTRIBUTE_TYPE_UNSPECIFIED" | "NUMERICAL" | "FRESHNESS" | (string & {});
  interpolationType?: "INTERPOLATION_TYPE_UNSPECIFIED" | "LINEAR" | (string & {});
}

export const GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpecBoostControlSpec: Schema.Schema<GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpecBoostControlSpec> = Schema.suspend(() => Schema.Struct({
  controlPoints: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpecBoostControlSpecControlPoint)),
  fieldName: Schema.optional(Schema.String),
  attributeType: Schema.optional(Schema.String),
  interpolationType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpecBoostControlSpec" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpecBoostControlSpec>;

export interface GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpec {
  boostControlSpec?: GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpecBoostControlSpec;
  boost?: number;
  condition?: string;
}

export const GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpec: Schema.Schema<GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpec> = Schema.suspend(() => Schema.Struct({
  boostControlSpec: Schema.optional(GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpecBoostControlSpec),
  boost: Schema.optional(Schema.Number),
  condition: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpec" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpec>;

export interface GoogleCloudDialogflowCxV3BoostSpec {
  conditionBoostSpecs?: Array<GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpec>;
}

export const GoogleCloudDialogflowCxV3BoostSpec: Schema.Schema<GoogleCloudDialogflowCxV3BoostSpec> = Schema.suspend(() => Schema.Struct({
  conditionBoostSpecs: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpec)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3BoostSpec" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3BoostSpec>;

export interface GoogleCloudDialogflowCxV3BoostSpecs {
  dataStores?: Array<string>;
  spec?: Array<GoogleCloudDialogflowCxV3BoostSpec>;
}

export const GoogleCloudDialogflowCxV3BoostSpecs: Schema.Schema<GoogleCloudDialogflowCxV3BoostSpecs> = Schema.suspend(() => Schema.Struct({
  dataStores: Schema.optional(Schema.Array(Schema.String)),
  spec: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3BoostSpec)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3BoostSpecs" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3BoostSpecs>;

export interface GoogleCloudLocationLocation {
  labels?: Record<string, string>;
  locationId?: string;
  displayName?: string;
  metadata?: Record<string, unknown>;
  name?: string;
}

export const GoogleCloudLocationLocation: Schema.Schema<GoogleCloudLocationLocation> = Schema.suspend(() => Schema.Struct({
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  locationId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudLocationLocation" }) as any as Schema.Schema<GoogleCloudLocationLocation>;

export interface GoogleCloudLocationListLocationsResponse {
  nextPageToken?: string;
  locations?: Array<GoogleCloudLocationLocation>;
}

export const GoogleCloudLocationListLocationsResponse: Schema.Schema<GoogleCloudLocationListLocationsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  locations: Schema.optional(Schema.Array(GoogleCloudLocationLocation)),
})).annotate({ identifier: "GoogleCloudLocationListLocationsResponse" }) as any as Schema.Schema<GoogleCloudLocationListLocationsResponse>;

export interface GoogleCloudDialogflowV2EncryptionSpec {
  kmsKey?: string;
  name?: string;
}

export const GoogleCloudDialogflowV2EncryptionSpec: Schema.Schema<GoogleCloudDialogflowV2EncryptionSpec> = Schema.suspend(() => Schema.Struct({
  kmsKey: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
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

export interface GoogleCloudDialogflowCxV3beta1ExportTestCasesResponse {
  content?: string;
  gcsUri?: string;
}

export const GoogleCloudDialogflowCxV3beta1ExportTestCasesResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportTestCasesResponse> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
  gcsUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExportTestCasesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportTestCasesResponse>;

export interface GoogleCloudDialogflowV2beta1ToolCallResultError {
  message?: string;
}

export const GoogleCloudDialogflowV2beta1ToolCallResultError: Schema.Schema<GoogleCloudDialogflowV2beta1ToolCallResultError> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ToolCallResultError" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ToolCallResultError>;

export interface GoogleCloudDialogflowV2beta1ToolCallResult {
  action?: string;
  content?: string;
  tool?: string;
  error?: GoogleCloudDialogflowV2beta1ToolCallResultError;
  rawContent?: string;
  createTime?: string;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2beta1ToolCallResult: Schema.Schema<GoogleCloudDialogflowV2beta1ToolCallResult> = Schema.suspend(() => Schema.Struct({
  action: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
  tool: Schema.optional(Schema.String),
  error: Schema.optional(GoogleCloudDialogflowV2beta1ToolCallResultError),
  rawContent: Schema.optional(Schema.String),
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

export interface GoogleCloudDialogflowV2beta1AgentCoachingInstruction {
  duplicateCheckResult?: GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResult;
  displayName?: string;
  triggeringEvent?: "TRIGGER_EVENT_UNSPECIFIED" | "END_OF_UTTERANCE" | "MANUAL_CALL" | "CUSTOMER_MESSAGE" | "AGENT_MESSAGE" | "TOOL_CALL_COMPLETION" | (string & {});
  systemAction?: string;
  condition?: string;
  displayDetails?: string;
  agentAction?: string;
}

export const GoogleCloudDialogflowV2beta1AgentCoachingInstruction: Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingInstruction> = Schema.suspend(() => Schema.Struct({
  duplicateCheckResult: Schema.optional(GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResult),
  displayName: Schema.optional(Schema.String),
  triggeringEvent: Schema.optional(Schema.String),
  systemAction: Schema.optional(Schema.String),
  condition: Schema.optional(Schema.String),
  displayDetails: Schema.optional(Schema.String),
  agentAction: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AgentCoachingInstruction" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingInstruction>;

export interface GoogleCloudDialogflowV2beta1AgentCoachingSuggestionAgentActionSuggestion {
  sources?: GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources;
  agentAction?: string;
  duplicateCheckResult?: GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResult;
}

export const GoogleCloudDialogflowV2beta1AgentCoachingSuggestionAgentActionSuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionAgentActionSuggestion> = Schema.suspend(() => Schema.Struct({
  sources: Schema.optional(GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources),
  agentAction: Schema.optional(Schema.String),
  duplicateCheckResult: Schema.optional(GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResult),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AgentCoachingSuggestionAgentActionSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionAgentActionSuggestion>;

export interface GoogleCloudDialogflowV2beta1AgentCoachingSuggestion {
  sampleResponses?: Array<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSampleResponse>;
  applicableInstructions?: Array<GoogleCloudDialogflowV2beta1AgentCoachingInstruction>;
  agentActionSuggestions?: Array<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionAgentActionSuggestion>;
}

export const GoogleCloudDialogflowV2beta1AgentCoachingSuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestion> = Schema.suspend(() => Schema.Struct({
  sampleResponses: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSampleResponse)),
  applicableInstructions: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1AgentCoachingInstruction)),
  agentActionSuggestions: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1AgentCoachingSuggestionAgentActionSuggestion)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AgentCoachingSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestion>;

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

export interface GoogleCloudDialogflowV2beta1GeneratorSuggestion {
  toolCallInfo?: Array<GoogleCloudDialogflowV2beta1GeneratorSuggestionToolCallInfo>;
  agentCoachingSuggestion?: GoogleCloudDialogflowV2beta1AgentCoachingSuggestion;
  freeFormSuggestion?: GoogleCloudDialogflowV2beta1FreeFormSuggestion;
  summarySuggestion?: GoogleCloudDialogflowV2beta1SummarySuggestion;
}

export const GoogleCloudDialogflowV2beta1GeneratorSuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1GeneratorSuggestion> = Schema.suspend(() => Schema.Struct({
  toolCallInfo: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1GeneratorSuggestionToolCallInfo)),
  agentCoachingSuggestion: Schema.optional(GoogleCloudDialogflowV2beta1AgentCoachingSuggestion),
  freeFormSuggestion: Schema.optional(GoogleCloudDialogflowV2beta1FreeFormSuggestion),
  summarySuggestion: Schema.optional(GoogleCloudDialogflowV2beta1SummarySuggestion),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1GeneratorSuggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1GeneratorSuggestion>;

export interface GoogleCloudDialogflowV3alpha1TurnSignals {
  agentEscalated?: boolean;
  failureReasons?: Array<"FAILURE_REASON_UNSPECIFIED" | "FAILED_INTENT" | "FAILED_WEBHOOK" | (string & {})>;
  webhookStatuses?: Array<string>;
  triggeredAbandonmentEvent?: boolean;
  sentimentScore?: number;
  noUserInput?: boolean;
  reachedEndPage?: boolean;
  dtmfUsed?: boolean;
  noMatch?: boolean;
  userEscalated?: boolean;
  sentimentMagnitude?: number;
}

export const GoogleCloudDialogflowV3alpha1TurnSignals: Schema.Schema<GoogleCloudDialogflowV3alpha1TurnSignals> = Schema.suspend(() => Schema.Struct({
  agentEscalated: Schema.optional(Schema.Boolean),
  failureReasons: Schema.optional(Schema.Array(Schema.String)),
  webhookStatuses: Schema.optional(Schema.Array(Schema.String)),
  triggeredAbandonmentEvent: Schema.optional(Schema.Boolean),
  sentimentScore: Schema.optional(Schema.Number),
  noUserInput: Schema.optional(Schema.Boolean),
  reachedEndPage: Schema.optional(Schema.Boolean),
  dtmfUsed: Schema.optional(Schema.Boolean),
  noMatch: Schema.optional(Schema.Boolean),
  userEscalated: Schema.optional(Schema.Boolean),
  sentimentMagnitude: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV3alpha1TurnSignals" }) as any as Schema.Schema<GoogleCloudDialogflowV3alpha1TurnSignals>;

export interface GoogleCloudDialogflowV3alpha1ConversationSignals {
  turnSignals?: GoogleCloudDialogflowV3alpha1TurnSignals;
}

export const GoogleCloudDialogflowV3alpha1ConversationSignals: Schema.Schema<GoogleCloudDialogflowV3alpha1ConversationSignals> = Schema.suspend(() => Schema.Struct({
  turnSignals: Schema.optional(GoogleCloudDialogflowV3alpha1TurnSignals),
})).annotate({ identifier: "GoogleCloudDialogflowV3alpha1ConversationSignals" }) as any as Schema.Schema<GoogleCloudDialogflowV3alpha1ConversationSignals>;

export interface GoogleCloudDialogflowV2beta1KnowledgeAnswersAnswer {
  matchConfidence?: number;
  faqQuestion?: string;
  answer?: string;
  source?: string;
  matchConfidenceLevel?: "MATCH_CONFIDENCE_LEVEL_UNSPECIFIED" | "LOW" | "MEDIUM" | "HIGH" | (string & {});
}

export const GoogleCloudDialogflowV2beta1KnowledgeAnswersAnswer: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAnswersAnswer> = Schema.suspend(() => Schema.Struct({
  matchConfidence: Schema.optional(Schema.Number),
  faqQuestion: Schema.optional(Schema.String),
  answer: Schema.optional(Schema.String),
  source: Schema.optional(Schema.String),
  matchConfidenceLevel: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1KnowledgeAnswersAnswer" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAnswersAnswer>;

export interface GoogleCloudDialogflowV2beta1KnowledgeAnswers {
  answers?: Array<GoogleCloudDialogflowV2beta1KnowledgeAnswersAnswer>;
}

export const GoogleCloudDialogflowV2beta1KnowledgeAnswers: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAnswers> = Schema.suspend(() => Schema.Struct({
  answers: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1KnowledgeAnswersAnswer)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1KnowledgeAnswers" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAnswers>;

export interface GoogleCloudDialogflowV2beta1SentimentAnalysisResult {
  queryTextSentiment?: GoogleCloudDialogflowV2beta1Sentiment;
}

export const GoogleCloudDialogflowV2beta1SentimentAnalysisResult: Schema.Schema<GoogleCloudDialogflowV2beta1SentimentAnalysisResult> = Schema.suspend(() => Schema.Struct({
  queryTextSentiment: Schema.optional(GoogleCloudDialogflowV2beta1Sentiment),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SentimentAnalysisResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SentimentAnalysisResult>;

export interface GoogleCloudDialogflowV2beta1IntentParameter {
  mandatory?: boolean;
  name?: string;
  isList?: boolean;
  entityTypeDisplayName?: string;
  prompts?: Array<string>;
  defaultValue?: string;
  displayName?: string;
  value?: string;
}

export const GoogleCloudDialogflowV2beta1IntentParameter: Schema.Schema<GoogleCloudDialogflowV2beta1IntentParameter> = Schema.suspend(() => Schema.Struct({
  mandatory: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
  isList: Schema.optional(Schema.Boolean),
  entityTypeDisplayName: Schema.optional(Schema.String),
  prompts: Schema.optional(Schema.Array(Schema.String)),
  defaultValue: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentParameter" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentParameter>;

export interface GoogleCloudDialogflowV2beta1IntentTrainingPhrasePart {
  alias?: string;
  text?: string;
  userDefined?: boolean;
  entityType?: string;
}

export const GoogleCloudDialogflowV2beta1IntentTrainingPhrasePart: Schema.Schema<GoogleCloudDialogflowV2beta1IntentTrainingPhrasePart> = Schema.suspend(() => Schema.Struct({
  alias: Schema.optional(Schema.String),
  text: Schema.optional(Schema.String),
  userDefined: Schema.optional(Schema.Boolean),
  entityType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentTrainingPhrasePart" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentTrainingPhrasePart>;

export interface GoogleCloudDialogflowV2beta1IntentTrainingPhrase {
  type?: "TYPE_UNSPECIFIED" | "EXAMPLE" | "TEMPLATE" | (string & {});
  parts?: Array<GoogleCloudDialogflowV2beta1IntentTrainingPhrasePart>;
  name?: string;
  timesAddedCount?: number;
}

export const GoogleCloudDialogflowV2beta1IntentTrainingPhrase: Schema.Schema<GoogleCloudDialogflowV2beta1IntentTrainingPhrase> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  parts: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentTrainingPhrasePart)),
  name: Schema.optional(Schema.String),
  timesAddedCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentTrainingPhrase" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentTrainingPhrase>;

export interface GoogleCloudDialogflowV2beta1IntentFollowupIntentInfo {
  followupIntentName?: string;
  parentFollowupIntentName?: string;
}

export const GoogleCloudDialogflowV2beta1IntentFollowupIntentInfo: Schema.Schema<GoogleCloudDialogflowV2beta1IntentFollowupIntentInfo> = Schema.suspend(() => Schema.Struct({
  followupIntentName: Schema.optional(Schema.String),
  parentFollowupIntentName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentFollowupIntentInfo" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentFollowupIntentInfo>;

export interface GoogleCloudDialogflowV2beta1Intent {
  rootFollowupIntentName?: string;
  messages?: Array<GoogleCloudDialogflowV2beta1IntentMessage>;
  endInteraction?: boolean;
  action?: string;
  events?: Array<string>;
  mlEnabled?: boolean;
  parentFollowupIntentName?: string;
  resetContexts?: boolean;
  parameters?: Array<GoogleCloudDialogflowV2beta1IntentParameter>;
  mlDisabled?: boolean;
  inputContextNames?: Array<string>;
  liveAgentHandoff?: boolean;
  defaultResponsePlatforms?: Array<"PLATFORM_UNSPECIFIED" | "FACEBOOK" | "SLACK" | "TELEGRAM" | "KIK" | "SKYPE" | "LINE" | "VIBER" | "ACTIONS_ON_GOOGLE" | "TELEPHONY" | "GOOGLE_HANGOUTS" | (string & {})>;
  trainingPhrases?: Array<GoogleCloudDialogflowV2beta1IntentTrainingPhrase>;
  outputContexts?: Array<GoogleCloudDialogflowV2beta1Context>;
  name?: string;
  isFallback?: boolean;
  followupIntentInfo?: Array<GoogleCloudDialogflowV2beta1IntentFollowupIntentInfo>;
  displayName?: string;
  webhookState?: "WEBHOOK_STATE_UNSPECIFIED" | "WEBHOOK_STATE_ENABLED" | "WEBHOOK_STATE_ENABLED_FOR_SLOT_FILLING" | (string & {});
  priority?: number;
}

export const GoogleCloudDialogflowV2beta1Intent: Schema.Schema<GoogleCloudDialogflowV2beta1Intent> = Schema.suspend(() => Schema.Struct({
  rootFollowupIntentName: Schema.optional(Schema.String),
  messages: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessage)),
  endInteraction: Schema.optional(Schema.Boolean),
  action: Schema.optional(Schema.String),
  events: Schema.optional(Schema.Array(Schema.String)),
  mlEnabled: Schema.optional(Schema.Boolean),
  parentFollowupIntentName: Schema.optional(Schema.String),
  resetContexts: Schema.optional(Schema.Boolean),
  parameters: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentParameter)),
  mlDisabled: Schema.optional(Schema.Boolean),
  inputContextNames: Schema.optional(Schema.Array(Schema.String)),
  liveAgentHandoff: Schema.optional(Schema.Boolean),
  defaultResponsePlatforms: Schema.optional(Schema.Array(Schema.String)),
  trainingPhrases: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentTrainingPhrase)),
  outputContexts: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1Context)),
  name: Schema.optional(Schema.String),
  isFallback: Schema.optional(Schema.Boolean),
  followupIntentInfo: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentFollowupIntentInfo)),
  displayName: Schema.optional(Schema.String),
  webhookState: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1Intent" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1Intent>;

export interface GoogleCloudDialogflowV2beta1QueryResult {
  diagnosticInfo?: Record<string, unknown>;
  webhookPayload?: Record<string, unknown>;
  action?: string;
  webhookSource?: string;
  queryText?: string;
  parameters?: Record<string, unknown>;
  knowledgeAnswers?: GoogleCloudDialogflowV2beta1KnowledgeAnswers;
  sentimentAnalysisResult?: GoogleCloudDialogflowV2beta1SentimentAnalysisResult;
  allRequiredParamsPresent?: boolean;
  fulfillmentMessages?: Array<GoogleCloudDialogflowV2beta1IntentMessage>;
  cancelsSlotFilling?: boolean;
  languageCode?: string;
  outputContexts?: Array<GoogleCloudDialogflowV2beta1Context>;
  speechRecognitionConfidence?: number;
  fulfillmentText?: string;
  intent?: GoogleCloudDialogflowV2beta1Intent;
  intentDetectionConfidence?: number;
}

export const GoogleCloudDialogflowV2beta1QueryResult: Schema.Schema<GoogleCloudDialogflowV2beta1QueryResult> = Schema.suspend(() => Schema.Struct({
  diagnosticInfo: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  webhookPayload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  action: Schema.optional(Schema.String),
  webhookSource: Schema.optional(Schema.String),
  queryText: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  knowledgeAnswers: Schema.optional(GoogleCloudDialogflowV2beta1KnowledgeAnswers),
  sentimentAnalysisResult: Schema.optional(GoogleCloudDialogflowV2beta1SentimentAnalysisResult),
  allRequiredParamsPresent: Schema.optional(Schema.Boolean),
  fulfillmentMessages: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IntentMessage)),
  cancelsSlotFilling: Schema.optional(Schema.Boolean),
  languageCode: Schema.optional(Schema.String),
  outputContexts: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1Context)),
  speechRecognitionConfidence: Schema.optional(Schema.Number),
  fulfillmentText: Schema.optional(Schema.String),
  intent: Schema.optional(GoogleCloudDialogflowV2beta1Intent),
  intentDetectionConfidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1QueryResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1QueryResult>;

export interface GoogleCloudDialogflowV2beta1IntentSuggestion {
  displayName?: string;
  description?: string;
  intentV2?: string;
}

export const GoogleCloudDialogflowV2beta1IntentSuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1IntentSuggestion> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  intentV2: Schema.optional(Schema.String),
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

export interface GoogleCloudDialogflowCxV3beta1ImportIntentsMetadata {
}

export const GoogleCloudDialogflowCxV3beta1ImportIntentsMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportIntentsMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ImportIntentsMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportIntentsMetadata>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudioSegment {
  allowPlaybackInterruption?: boolean;
  uri?: string;
  audio?: string;
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudioSegment: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudioSegment> = Schema.suspend(() => Schema.Struct({
  allowPlaybackInterruption: Schema.optional(Schema.Boolean),
  uri: Schema.optional(Schema.String),
  audio: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudioSegment" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudioSegment>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudio {
  segments?: Array<GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudioSegment>;
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudio: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudio> = Schema.suspend(() => Schema.Struct({
  segments: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudioSegment)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudio" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudio>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessageEndInteraction {
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessageEndInteraction: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageEndInteraction> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ResponseMessageEndInteraction" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageEndInteraction>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessageLiveAgentHandoff {
  metadata?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessageLiveAgentHandoff: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageLiveAgentHandoff> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ResponseMessageLiveAgentHandoff" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageLiveAgentHandoff>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessageOutputAudioText {
  ssml?: string;
  allowPlaybackInterruption?: boolean;
  text?: string;
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessageOutputAudioText: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageOutputAudioText> = Schema.suspend(() => Schema.Struct({
  ssml: Schema.optional(Schema.String),
  allowPlaybackInterruption: Schema.optional(Schema.Boolean),
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ResponseMessageOutputAudioText" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageOutputAudioText>;

export interface GoogleCloudDialogflowCxV3beta1ToolCall {
  inputParameters?: Record<string, unknown>;
  tool?: string;
  action?: string;
}

export const GoogleCloudDialogflowCxV3beta1ToolCall: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolCall> = Schema.suspend(() => Schema.Struct({
  inputParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  tool: Schema.optional(Schema.String),
  action: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ToolCall" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolCall>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessageKnowledgeInfoCard {
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessageKnowledgeInfoCard: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageKnowledgeInfoCard> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ResponseMessageKnowledgeInfoCard" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageKnowledgeInfoCard>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessageConversationSuccess {
  metadata?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessageConversationSuccess: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageConversationSuccess> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ResponseMessageConversationSuccess" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageConversationSuccess>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessageTelephonyTransferCall {
  phoneNumber?: string;
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessageTelephonyTransferCall: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageTelephonyTransferCall> = Schema.suspend(() => Schema.Struct({
  phoneNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ResponseMessageTelephonyTransferCall" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageTelephonyTransferCall>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessageText {
  text?: Array<string>;
  allowPlaybackInterruption?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessageText: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageText> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.Array(Schema.String)),
  allowPlaybackInterruption: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ResponseMessageText" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageText>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessagePlayAudio {
  allowPlaybackInterruption?: boolean;
  audioUri?: string;
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessagePlayAudio: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessagePlayAudio> = Schema.suspend(() => Schema.Struct({
  allowPlaybackInterruption: Schema.optional(Schema.Boolean),
  audioUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ResponseMessagePlayAudio" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessagePlayAudio>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessage {
  mixedAudio?: GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudio;
  endInteraction?: GoogleCloudDialogflowCxV3beta1ResponseMessageEndInteraction;
  payload?: Record<string, unknown>;
  liveAgentHandoff?: GoogleCloudDialogflowCxV3beta1ResponseMessageLiveAgentHandoff;
  outputAudioText?: GoogleCloudDialogflowCxV3beta1ResponseMessageOutputAudioText;
  toolCall?: GoogleCloudDialogflowCxV3beta1ToolCall;
  knowledgeInfoCard?: GoogleCloudDialogflowCxV3beta1ResponseMessageKnowledgeInfoCard;
  conversationSuccess?: GoogleCloudDialogflowCxV3beta1ResponseMessageConversationSuccess;
  telephonyTransferCall?: GoogleCloudDialogflowCxV3beta1ResponseMessageTelephonyTransferCall;
  text?: GoogleCloudDialogflowCxV3beta1ResponseMessageText;
  channel?: string;
  playAudio?: GoogleCloudDialogflowCxV3beta1ResponseMessagePlayAudio;
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessage: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessage> = Schema.suspend(() => Schema.Struct({
  mixedAudio: Schema.optional(GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudio),
  endInteraction: Schema.optional(GoogleCloudDialogflowCxV3beta1ResponseMessageEndInteraction),
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  liveAgentHandoff: Schema.optional(GoogleCloudDialogflowCxV3beta1ResponseMessageLiveAgentHandoff),
  outputAudioText: Schema.optional(GoogleCloudDialogflowCxV3beta1ResponseMessageOutputAudioText),
  toolCall: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolCall),
  knowledgeInfoCard: Schema.optional(GoogleCloudDialogflowCxV3beta1ResponseMessageKnowledgeInfoCard),
  conversationSuccess: Schema.optional(GoogleCloudDialogflowCxV3beta1ResponseMessageConversationSuccess),
  telephonyTransferCall: Schema.optional(GoogleCloudDialogflowCxV3beta1ResponseMessageTelephonyTransferCall),
  text: Schema.optional(GoogleCloudDialogflowCxV3beta1ResponseMessageText),
  channel: Schema.optional(Schema.String),
  playAudio: Schema.optional(GoogleCloudDialogflowCxV3beta1ResponseMessagePlayAudio),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ResponseMessage" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessage>;

export interface GoogleCloudDialogflowCxV3beta1WebhookResponseFulfillmentResponse {
  messages?: Array<GoogleCloudDialogflowCxV3beta1ResponseMessage>;
  mergeBehavior?: "MERGE_BEHAVIOR_UNSPECIFIED" | "APPEND" | "REPLACE" | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1WebhookResponseFulfillmentResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookResponseFulfillmentResponse> = Schema.suspend(() => Schema.Struct({
  messages: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ResponseMessage)),
  mergeBehavior: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1WebhookResponseFulfillmentResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookResponseFulfillmentResponse>;

export interface GoogleCloudDialogflowCxV3beta1SessionInfo {
  parameters?: Record<string, unknown>;
  session?: string;
}

export const GoogleCloudDialogflowCxV3beta1SessionInfo: Schema.Schema<GoogleCloudDialogflowCxV3beta1SessionInfo> = Schema.suspend(() => Schema.Struct({
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  session: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1SessionInfo" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1SessionInfo>;

export interface GoogleCloudDialogflowCxV3beta1PageInfoFormInfoParameterInfo {
  value?: unknown;
  justCollected?: boolean;
  displayName?: string;
  state?: "PARAMETER_STATE_UNSPECIFIED" | "EMPTY" | "INVALID" | "FILLED" | (string & {});
  required?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1PageInfoFormInfoParameterInfo: Schema.Schema<GoogleCloudDialogflowCxV3beta1PageInfoFormInfoParameterInfo> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.Unknown),
  justCollected: Schema.optional(Schema.Boolean),
  displayName: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  required: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1PageInfoFormInfoParameterInfo" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1PageInfoFormInfoParameterInfo>;

export interface GoogleCloudDialogflowCxV3beta1PageInfoFormInfo {
  parameterInfo?: Array<GoogleCloudDialogflowCxV3beta1PageInfoFormInfoParameterInfo>;
}

export const GoogleCloudDialogflowCxV3beta1PageInfoFormInfo: Schema.Schema<GoogleCloudDialogflowCxV3beta1PageInfoFormInfo> = Schema.suspend(() => Schema.Struct({
  parameterInfo: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1PageInfoFormInfoParameterInfo)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1PageInfoFormInfo" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1PageInfoFormInfo>;

export interface GoogleCloudDialogflowCxV3beta1PageInfo {
  currentPage?: string;
  formInfo?: GoogleCloudDialogflowCxV3beta1PageInfoFormInfo;
  displayName?: string;
}

export const GoogleCloudDialogflowCxV3beta1PageInfo: Schema.Schema<GoogleCloudDialogflowCxV3beta1PageInfo> = Schema.suspend(() => Schema.Struct({
  currentPage: Schema.optional(Schema.String),
  formInfo: Schema.optional(GoogleCloudDialogflowCxV3beta1PageInfoFormInfo),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1PageInfo" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1PageInfo>;

export interface GoogleCloudDialogflowCxV3beta1WebhookResponse {
  targetPage?: string;
  fulfillmentResponse?: GoogleCloudDialogflowCxV3beta1WebhookResponseFulfillmentResponse;
  targetFlow?: string;
  payload?: Record<string, unknown>;
  sessionInfo?: GoogleCloudDialogflowCxV3beta1SessionInfo;
  pageInfo?: GoogleCloudDialogflowCxV3beta1PageInfo;
}

export const GoogleCloudDialogflowCxV3beta1WebhookResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookResponse> = Schema.suspend(() => Schema.Struct({
  targetPage: Schema.optional(Schema.String),
  fulfillmentResponse: Schema.optional(GoogleCloudDialogflowCxV3beta1WebhookResponseFulfillmentResponse),
  targetFlow: Schema.optional(Schema.String),
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  sessionInfo: Schema.optional(GoogleCloudDialogflowCxV3beta1SessionInfo),
  pageInfo: Schema.optional(GoogleCloudDialogflowCxV3beta1PageInfo),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1WebhookResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookResponse>;

export interface GoogleCloudDialogflowCxV3ExportTestCasesRequest {
  gcsUri?: string;
  dataFormat?: "DATA_FORMAT_UNSPECIFIED" | "BLOB" | "JSON" | (string & {});
  filter?: string;
}

export const GoogleCloudDialogflowCxV3ExportTestCasesRequest: Schema.Schema<GoogleCloudDialogflowCxV3ExportTestCasesRequest> = Schema.suspend(() => Schema.Struct({
  gcsUri: Schema.optional(Schema.String),
  dataFormat: Schema.optional(Schema.String),
  filter: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ExportTestCasesRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportTestCasesRequest>;

export interface GoogleCloudDialogflowV2beta1GenerateSuggestionsResponseGeneratorSuggestionAnswer {
  sourceGenerator?: string;
  generatorSuggestion?: GoogleCloudDialogflowV2beta1GeneratorSuggestion;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2beta1GenerateSuggestionsResponseGeneratorSuggestionAnswer: Schema.Schema<GoogleCloudDialogflowV2beta1GenerateSuggestionsResponseGeneratorSuggestionAnswer> = Schema.suspend(() => Schema.Struct({
  sourceGenerator: Schema.optional(Schema.String),
  generatorSuggestion: Schema.optional(GoogleCloudDialogflowV2beta1GeneratorSuggestion),
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

export interface GoogleCloudDialogflowV2beta1FaqAnswer {
  answerRecord?: string;
  question?: string;
  source?: string;
  metadata?: Record<string, string>;
  answer?: string;
  confidence?: number;
}

export const GoogleCloudDialogflowV2beta1FaqAnswer: Schema.Schema<GoogleCloudDialogflowV2beta1FaqAnswer> = Schema.suspend(() => Schema.Struct({
  answerRecord: Schema.optional(Schema.String),
  question: Schema.optional(Schema.String),
  source: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  answer: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1FaqAnswer" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1FaqAnswer>;

export interface GoogleCloudDialogflowV2beta1SuggestFaqAnswersResponse {
  latestMessage?: string;
  faqAnswers?: Array<GoogleCloudDialogflowV2beta1FaqAnswer>;
  contextSize?: number;
}

export const GoogleCloudDialogflowV2beta1SuggestFaqAnswersResponse: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestFaqAnswersResponse> = Schema.suspend(() => Schema.Struct({
  latestMessage: Schema.optional(Schema.String),
  faqAnswers: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1FaqAnswer)),
  contextSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SuggestFaqAnswersResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestFaqAnswersResponse>;

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

export interface GoogleCloudDialogflowV2beta1SmartReplyAnswer {
  confidence?: number;
  answerRecord?: string;
  reply?: string;
}

export const GoogleCloudDialogflowV2beta1SmartReplyAnswer: Schema.Schema<GoogleCloudDialogflowV2beta1SmartReplyAnswer> = Schema.suspend(() => Schema.Struct({
  confidence: Schema.optional(Schema.Number),
  answerRecord: Schema.optional(Schema.String),
  reply: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SmartReplyAnswer" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SmartReplyAnswer>;

export interface GoogleCloudDialogflowV2beta1SuggestSmartRepliesResponse {
  contextSize?: number;
  latestMessage?: string;
  smartReplyAnswers?: Array<GoogleCloudDialogflowV2beta1SmartReplyAnswer>;
}

export const GoogleCloudDialogflowV2beta1SuggestSmartRepliesResponse: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestSmartRepliesResponse> = Schema.suspend(() => Schema.Struct({
  contextSize: Schema.optional(Schema.Number),
  latestMessage: Schema.optional(Schema.String),
  smartReplyAnswers: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SmartReplyAnswer)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SuggestSmartRepliesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestSmartRepliesResponse>;

export interface GoogleCloudDialogflowV2beta1ArticleAnswer {
  uri?: string;
  metadata?: Record<string, string>;
  title?: string;
  answerRecord?: string;
  snippets?: Array<string>;
}

export const GoogleCloudDialogflowV2beta1ArticleAnswer: Schema.Schema<GoogleCloudDialogflowV2beta1ArticleAnswer> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  title: Schema.optional(Schema.String),
  answerRecord: Schema.optional(Schema.String),
  snippets: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ArticleAnswer" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ArticleAnswer>;

export interface GoogleCloudDialogflowV2beta1SuggestArticlesResponse {
  latestMessage?: string;
  contextSize?: number;
  articleAnswers?: Array<GoogleCloudDialogflowV2beta1ArticleAnswer>;
}

export const GoogleCloudDialogflowV2beta1SuggestArticlesResponse: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestArticlesResponse> = Schema.suspend(() => Schema.Struct({
  latestMessage: Schema.optional(Schema.String),
  contextSize: Schema.optional(Schema.Number),
  articleAnswers: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1ArticleAnswer)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SuggestArticlesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestArticlesResponse>;

export interface GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfoKnowledgeAssistBehavior {
  useTranslatedMessage?: boolean;
  endUserMetadataIncluded?: boolean;
  queryGenerationAgentLanguageMismatch?: boolean;
  previousQueriesIncluded?: boolean;
  returnQueryOnly?: boolean;
  appendedSearchContextCount?: number;
  usePubsubDelivery?: boolean;
  primaryQueryRedactedAndReplaced?: boolean;
  thirdPartyConnectorAllowed?: boolean;
  queryContainedSearchContext?: boolean;
  answerGenerationRewriterOn?: boolean;
  multipleQueriesGenerated?: boolean;
  conversationTranscriptHasMixedLanguages?: boolean;
  invalidItemsQuerySuggestionSkipped?: boolean;
  queryGenerationEndUserLanguageMismatch?: boolean;
  disableSyncDelivery?: boolean;
  useCustomSafetyFilterLevel?: boolean;
}

export const GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfoKnowledgeAssistBehavior: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfoKnowledgeAssistBehavior> = Schema.suspend(() => Schema.Struct({
  useTranslatedMessage: Schema.optional(Schema.Boolean),
  endUserMetadataIncluded: Schema.optional(Schema.Boolean),
  queryGenerationAgentLanguageMismatch: Schema.optional(Schema.Boolean),
  previousQueriesIncluded: Schema.optional(Schema.Boolean),
  returnQueryOnly: Schema.optional(Schema.Boolean),
  appendedSearchContextCount: Schema.optional(Schema.Number),
  usePubsubDelivery: Schema.optional(Schema.Boolean),
  primaryQueryRedactedAndReplaced: Schema.optional(Schema.Boolean),
  thirdPartyConnectorAllowed: Schema.optional(Schema.Boolean),
  queryContainedSearchContext: Schema.optional(Schema.Boolean),
  answerGenerationRewriterOn: Schema.optional(Schema.Boolean),
  multipleQueriesGenerated: Schema.optional(Schema.Boolean),
  conversationTranscriptHasMixedLanguages: Schema.optional(Schema.Boolean),
  invalidItemsQuerySuggestionSkipped: Schema.optional(Schema.Boolean),
  queryGenerationEndUserLanguageMismatch: Schema.optional(Schema.Boolean),
  disableSyncDelivery: Schema.optional(Schema.Boolean),
  useCustomSafetyFilterLevel: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfoKnowledgeAssistBehavior" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfoKnowledgeAssistBehavior>;

export interface GoogleCloudDialogflowV2beta1ServiceLatencyInternalServiceLatency {
  completeTime?: string;
  step?: string;
  startTime?: string;
  latencyMs?: number;
}

export const GoogleCloudDialogflowV2beta1ServiceLatencyInternalServiceLatency: Schema.Schema<GoogleCloudDialogflowV2beta1ServiceLatencyInternalServiceLatency> = Schema.suspend(() => Schema.Struct({
  completeTime: Schema.optional(Schema.String),
  step: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  latencyMs: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ServiceLatencyInternalServiceLatency" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ServiceLatencyInternalServiceLatency>;

export interface GoogleCloudDialogflowV2beta1ServiceLatency {
  internalServiceLatencies?: Array<GoogleCloudDialogflowV2beta1ServiceLatencyInternalServiceLatency>;
}

export const GoogleCloudDialogflowV2beta1ServiceLatency: Schema.Schema<GoogleCloudDialogflowV2beta1ServiceLatency> = Schema.suspend(() => Schema.Struct({
  internalServiceLatencies: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1ServiceLatencyInternalServiceLatency)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ServiceLatency" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ServiceLatency>;

export interface GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfoIngestedParameterDebugInfo {
  ingestionStatus?: "INGESTION_STATUS_UNSPECIFIED" | "INGESTION_STATUS_SUCCEEDED" | "INGESTION_STATUS_CONTEXT_NOT_AVAILABLE" | "INGESTION_STATUS_PARSE_FAILED" | "INGESTION_STATUS_INVALID_ENTRY" | "INGESTION_STATUS_INVALID_FORMAT" | "INGESTION_STATUS_LANGUAGE_MISMATCH" | (string & {});
  parameter?: string;
}

export const GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfoIngestedParameterDebugInfo: Schema.Schema<GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfoIngestedParameterDebugInfo> = Schema.suspend(() => Schema.Struct({
  ingestionStatus: Schema.optional(Schema.String),
  parameter: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfoIngestedParameterDebugInfo" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfoIngestedParameterDebugInfo>;

export interface GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfo {
  ingestedParametersDebugInfo?: Array<GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfoIngestedParameterDebugInfo>;
  projectNotAllowlisted?: boolean;
  contextReferenceRetrieved?: boolean;
}

export const GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfo: Schema.Schema<GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfo> = Schema.suspend(() => Schema.Struct({
  ingestedParametersDebugInfo: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfoIngestedParameterDebugInfo)),
  projectNotAllowlisted: Schema.optional(Schema.Boolean),
  contextReferenceRetrieved: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfo" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfo>;

export interface GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfo {
  queryGenerationFailureReason?: "QUERY_GENERATION_FAILURE_REASON_UNSPECIFIED" | "QUERY_GENERATION_OUT_OF_QUOTA" | "QUERY_GENERATION_FAILED" | "QUERY_GENERATION_NO_QUERY_GENERATED" | "QUERY_GENERATION_RAI_FAILED" | "NOT_IN_ALLOWLIST" | "QUERY_GENERATION_QUERY_REDACTED" | "QUERY_GENERATION_LLM_RESPONSE_PARSE_FAILED" | "QUERY_GENERATION_EMPTY_CONVERSATION" | "QUERY_GENERATION_EMPTY_LAST_MESSAGE" | "QUERY_GENERATION_TRIGGERING_EVENT_CONDITION_NOT_MET" | (string & {});
  datastoreResponseReason?: "DATASTORE_RESPONSE_REASON_UNSPECIFIED" | "NONE" | "SEARCH_OUT_OF_QUOTA" | "SEARCH_EMPTY_RESULTS" | "ANSWER_GENERATION_GEN_AI_DISABLED" | "ANSWER_GENERATION_OUT_OF_QUOTA" | "ANSWER_GENERATION_ERROR" | "ANSWER_GENERATION_NOT_ENOUGH_INFO" | "ANSWER_GENERATION_RAI_FAILED" | "ANSWER_GENERATION_NOT_GROUNDED" | (string & {});
  knowledgeAssistBehavior?: GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfoKnowledgeAssistBehavior;
  serviceLatency?: GoogleCloudDialogflowV2beta1ServiceLatency;
  ingestedContextReferenceDebugInfo?: GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfo;
  queryCategorizationFailureReason?: "QUERY_CATEGORIZATION_FAILURE_REASON_UNSPECIFIED" | "QUERY_CATEGORIZATION_INVALID_CONFIG" | "QUERY_CATEGORIZATION_RESULT_NOT_FOUND" | "QUERY_CATEGORIZATION_FAILED" | (string & {});
}

export const GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfo: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfo> = Schema.suspend(() => Schema.Struct({
  queryGenerationFailureReason: Schema.optional(Schema.String),
  datastoreResponseReason: Schema.optional(Schema.String),
  knowledgeAssistBehavior: Schema.optional(GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfoKnowledgeAssistBehavior),
  serviceLatency: Schema.optional(GoogleCloudDialogflowV2beta1ServiceLatency),
  ingestedContextReferenceDebugInfo: Schema.optional(GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfo),
  queryCategorizationFailureReason: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfo" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfo>;

export interface GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerFaqSource {
  question?: string;
}

export const GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerFaqSource: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerFaqSource> = Schema.suspend(() => Schema.Struct({
  question: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerFaqSource" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerFaqSource>;

export interface GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet {
  uri?: string;
  metadata?: Record<string, unknown>;
  title?: string;
  text?: string;
}

export const GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  title: Schema.optional(Schema.String),
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet>;

export interface GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource {
  snippets?: Array<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet>;
}

export const GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource> = Schema.suspend(() => Schema.Struct({
  snippets: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource>;

export interface GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswer {
  faqSource?: GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerFaqSource;
  generativeSource?: GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource;
  answerText?: string;
}

export const GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswer: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswer> = Schema.suspend(() => Schema.Struct({
  faqSource: Schema.optional(GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerFaqSource),
  generativeSource: Schema.optional(GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource),
  answerText: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswer" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswer>;

export interface GoogleCloudDialogflowV2beta1KnowledgeAssistAnswer {
  knowledgeAssistDebugInfo?: GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfo;
  suggestedQuery?: GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerSuggestedQuery;
  answerRecord?: string;
  suggestedQueryAnswer?: GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswer;
}

export const GoogleCloudDialogflowV2beta1KnowledgeAssistAnswer: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswer> = Schema.suspend(() => Schema.Struct({
  knowledgeAssistDebugInfo: Schema.optional(GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfo),
  suggestedQuery: Schema.optional(GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerSuggestedQuery),
  answerRecord: Schema.optional(Schema.String),
  suggestedQueryAnswer: Schema.optional(GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswer),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1KnowledgeAssistAnswer" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswer>;

export interface GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistResponse {
  latestMessage?: string;
  knowledgeAssistAnswer?: GoogleCloudDialogflowV2beta1KnowledgeAssistAnswer;
  contextSize?: number;
}

export const GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistResponse: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistResponse> = Schema.suspend(() => Schema.Struct({
  latestMessage: Schema.optional(Schema.String),
  knowledgeAssistAnswer: Schema.optional(GoogleCloudDialogflowV2beta1KnowledgeAssistAnswer),
  contextSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistResponse>;

export interface GoogleCloudDialogflowV2beta1SuggestionResult {
  generateSuggestionsResponse?: GoogleCloudDialogflowV2beta1GenerateSuggestionsResponse;
  suggestFaqAnswersResponse?: GoogleCloudDialogflowV2beta1SuggestFaqAnswersResponse;
  suggestDialogflowAssistsResponse?: GoogleCloudDialogflowV2beta1SuggestDialogflowAssistsResponse;
  suggestEntityExtractionResponse?: GoogleCloudDialogflowV2beta1SuggestDialogflowAssistsResponse;
  suggestSmartRepliesResponse?: GoogleCloudDialogflowV2beta1SuggestSmartRepliesResponse;
  suggestArticlesResponse?: GoogleCloudDialogflowV2beta1SuggestArticlesResponse;
  error?: GoogleRpcStatus;
  suggestKnowledgeAssistResponse?: GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistResponse;
}

export const GoogleCloudDialogflowV2beta1SuggestionResult: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestionResult> = Schema.suspend(() => Schema.Struct({
  generateSuggestionsResponse: Schema.optional(GoogleCloudDialogflowV2beta1GenerateSuggestionsResponse),
  suggestFaqAnswersResponse: Schema.optional(GoogleCloudDialogflowV2beta1SuggestFaqAnswersResponse),
  suggestDialogflowAssistsResponse: Schema.optional(GoogleCloudDialogflowV2beta1SuggestDialogflowAssistsResponse),
  suggestEntityExtractionResponse: Schema.optional(GoogleCloudDialogflowV2beta1SuggestDialogflowAssistsResponse),
  suggestSmartRepliesResponse: Schema.optional(GoogleCloudDialogflowV2beta1SuggestSmartRepliesResponse),
  suggestArticlesResponse: Schema.optional(GoogleCloudDialogflowV2beta1SuggestArticlesResponse),
  error: Schema.optional(GoogleRpcStatus),
  suggestKnowledgeAssistResponse: Schema.optional(GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistResponse),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SuggestionResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestionResult>;

export interface GoogleCloudDialogflowV2beta1HumanAgentAssistantEvent {
  conversation?: string;
  suggestionResults?: Array<GoogleCloudDialogflowV2beta1SuggestionResult>;
  participant?: string;
}

export const GoogleCloudDialogflowV2beta1HumanAgentAssistantEvent: Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantEvent> = Schema.suspend(() => Schema.Struct({
  conversation: Schema.optional(Schema.String),
  suggestionResults: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SuggestionResult)),
  participant: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1HumanAgentAssistantEvent" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantEvent>;

export interface GoogleCloudDialogflowCxV3SecuritySettingsInsightsExportSettings {
  enableInsightsExport?: boolean;
}

export const GoogleCloudDialogflowCxV3SecuritySettingsInsightsExportSettings: Schema.Schema<GoogleCloudDialogflowCxV3SecuritySettingsInsightsExportSettings> = Schema.suspend(() => Schema.Struct({
  enableInsightsExport: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3SecuritySettingsInsightsExportSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SecuritySettingsInsightsExportSettings>;

export interface GoogleCloudDialogflowCxV3SecuritySettingsAudioExportSettings {
  audioFormat?: "AUDIO_FORMAT_UNSPECIFIED" | "MULAW" | "MP3" | "OGG" | (string & {});
  storeTtsAudio?: boolean;
  audioExportPattern?: string;
  gcsBucket?: string;
  enableAudioRedaction?: boolean;
}

export const GoogleCloudDialogflowCxV3SecuritySettingsAudioExportSettings: Schema.Schema<GoogleCloudDialogflowCxV3SecuritySettingsAudioExportSettings> = Schema.suspend(() => Schema.Struct({
  audioFormat: Schema.optional(Schema.String),
  storeTtsAudio: Schema.optional(Schema.Boolean),
  audioExportPattern: Schema.optional(Schema.String),
  gcsBucket: Schema.optional(Schema.String),
  enableAudioRedaction: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3SecuritySettingsAudioExportSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SecuritySettingsAudioExportSettings>;

export interface GoogleCloudDialogflowCxV3SecuritySettings {
  redactionStrategy?: "REDACTION_STRATEGY_UNSPECIFIED" | "REDACT_WITH_SERVICE" | (string & {});
  displayName?: string;
  insightsExportSettings?: GoogleCloudDialogflowCxV3SecuritySettingsInsightsExportSettings;
  inspectTemplate?: string;
  audioExportSettings?: GoogleCloudDialogflowCxV3SecuritySettingsAudioExportSettings;
  deidentifyTemplate?: string;
  retentionWindowDays?: number;
  name?: string;
  redactionScope?: "REDACTION_SCOPE_UNSPECIFIED" | "REDACT_DISK_STORAGE" | (string & {});
  retentionStrategy?: "RETENTION_STRATEGY_UNSPECIFIED" | "REMOVE_AFTER_CONVERSATION" | (string & {});
  purgeDataTypes?: Array<"PURGE_DATA_TYPE_UNSPECIFIED" | "DIALOGFLOW_HISTORY" | (string & {})>;
}

export const GoogleCloudDialogflowCxV3SecuritySettings: Schema.Schema<GoogleCloudDialogflowCxV3SecuritySettings> = Schema.suspend(() => Schema.Struct({
  redactionStrategy: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  insightsExportSettings: Schema.optional(GoogleCloudDialogflowCxV3SecuritySettingsInsightsExportSettings),
  inspectTemplate: Schema.optional(Schema.String),
  audioExportSettings: Schema.optional(GoogleCloudDialogflowCxV3SecuritySettingsAudioExportSettings),
  deidentifyTemplate: Schema.optional(Schema.String),
  retentionWindowDays: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
  redactionScope: Schema.optional(Schema.String),
  retentionStrategy: Schema.optional(Schema.String),
  purgeDataTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3SecuritySettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SecuritySettings>;

export interface GoogleCloudDialogflowCxV3ListSecuritySettingsResponse {
  nextPageToken?: string;
  securitySettings?: Array<GoogleCloudDialogflowCxV3SecuritySettings>;
}

export const GoogleCloudDialogflowCxV3ListSecuritySettingsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListSecuritySettingsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  securitySettings: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3SecuritySettings)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ListSecuritySettingsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListSecuritySettingsResponse>;

export interface GoogleCloudDialogflowCxV3PlaybookImportStrategy {
  toolImportStrategy?: "IMPORT_STRATEGY_UNSPECIFIED" | "IMPORT_STRATEGY_CREATE_NEW" | "IMPORT_STRATEGY_REPLACE" | "IMPORT_STRATEGY_KEEP" | "IMPORT_STRATEGY_MERGE" | "IMPORT_STRATEGY_THROW_ERROR" | (string & {});
  mainPlaybookImportStrategy?: "IMPORT_STRATEGY_UNSPECIFIED" | "IMPORT_STRATEGY_CREATE_NEW" | "IMPORT_STRATEGY_REPLACE" | "IMPORT_STRATEGY_KEEP" | "IMPORT_STRATEGY_MERGE" | "IMPORT_STRATEGY_THROW_ERROR" | (string & {});
  nestedResourceImportStrategy?: "IMPORT_STRATEGY_UNSPECIFIED" | "IMPORT_STRATEGY_CREATE_NEW" | "IMPORT_STRATEGY_REPLACE" | "IMPORT_STRATEGY_KEEP" | "IMPORT_STRATEGY_MERGE" | "IMPORT_STRATEGY_THROW_ERROR" | (string & {});
}

export const GoogleCloudDialogflowCxV3PlaybookImportStrategy: Schema.Schema<GoogleCloudDialogflowCxV3PlaybookImportStrategy> = Schema.suspend(() => Schema.Struct({
  toolImportStrategy: Schema.optional(Schema.String),
  mainPlaybookImportStrategy: Schema.optional(Schema.String),
  nestedResourceImportStrategy: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3PlaybookImportStrategy" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3PlaybookImportStrategy>;

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

export interface GoogleCloudDialogflowV2WebhookResponse {
  outputContexts?: Array<GoogleCloudDialogflowV2Context>;
  source?: string;
  payload?: Record<string, unknown>;
  fulfillmentText?: string;
  sessionEntityTypes?: Array<GoogleCloudDialogflowV2SessionEntityType>;
  followupEventInput?: GoogleCloudDialogflowV2EventInput;
  fulfillmentMessages?: Array<GoogleCloudDialogflowV2IntentMessage>;
}

export const GoogleCloudDialogflowV2WebhookResponse: Schema.Schema<GoogleCloudDialogflowV2WebhookResponse> = Schema.suspend(() => Schema.Struct({
  outputContexts: Schema.optional(Schema.Array(GoogleCloudDialogflowV2Context)),
  source: Schema.optional(Schema.String),
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  fulfillmentText: Schema.optional(Schema.String),
  sessionEntityTypes: Schema.optional(Schema.Array(GoogleCloudDialogflowV2SessionEntityType)),
  followupEventInput: Schema.optional(GoogleCloudDialogflowV2EventInput),
  fulfillmentMessages: Schema.optional(Schema.Array(GoogleCloudDialogflowV2IntentMessage)),
})).annotate({ identifier: "GoogleCloudDialogflowV2WebhookResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2WebhookResponse>;

export interface GoogleCloudDialogflowV2AnnotatedMessagePart {
  entityType?: string;
  formattedValue?: unknown;
  text?: string;
}

export const GoogleCloudDialogflowV2AnnotatedMessagePart: Schema.Schema<GoogleCloudDialogflowV2AnnotatedMessagePart> = Schema.suspend(() => Schema.Struct({
  entityType: Schema.optional(Schema.String),
  formattedValue: Schema.optional(Schema.Unknown),
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2AnnotatedMessagePart" }) as any as Schema.Schema<GoogleCloudDialogflowV2AnnotatedMessagePart>;

export interface GoogleCloudDialogflowV2MessageAnnotation {
  containEntities?: boolean;
  parts?: Array<GoogleCloudDialogflowV2AnnotatedMessagePart>;
}

export const GoogleCloudDialogflowV2MessageAnnotation: Schema.Schema<GoogleCloudDialogflowV2MessageAnnotation> = Schema.suspend(() => Schema.Struct({
  containEntities: Schema.optional(Schema.Boolean),
  parts: Schema.optional(Schema.Array(GoogleCloudDialogflowV2AnnotatedMessagePart)),
})).annotate({ identifier: "GoogleCloudDialogflowV2MessageAnnotation" }) as any as Schema.Schema<GoogleCloudDialogflowV2MessageAnnotation>;

export interface GoogleCloudDialogflowV2Message {
  content?: string;
  messageAnnotation?: GoogleCloudDialogflowV2MessageAnnotation;
  sendTime?: string;
  createTime?: string;
  participantRole?: "ROLE_UNSPECIFIED" | "HUMAN_AGENT" | "AUTOMATED_AGENT" | "END_USER" | (string & {});
  name?: string;
  languageCode?: string;
  sentimentAnalysis?: GoogleCloudDialogflowV2SentimentAnalysisResult;
  participant?: string;
}

export const GoogleCloudDialogflowV2Message: Schema.Schema<GoogleCloudDialogflowV2Message> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
  messageAnnotation: Schema.optional(GoogleCloudDialogflowV2MessageAnnotation),
  sendTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  participantRole: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  sentimentAnalysis: Schema.optional(GoogleCloudDialogflowV2SentimentAnalysisResult),
  participant: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2Message" }) as any as Schema.Schema<GoogleCloudDialogflowV2Message>;

export interface GoogleCloudDialogflowCxV3CreateVersionOperationMetadata {
  version?: string;
}

export const GoogleCloudDialogflowCxV3CreateVersionOperationMetadata: Schema.Schema<GoogleCloudDialogflowCxV3CreateVersionOperationMetadata> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3CreateVersionOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3CreateVersionOperationMetadata>;

export interface GoogleCloudDialogflowCxV3beta1CreateVersionOperationMetadata {
  version?: string;
}

export const GoogleCloudDialogflowCxV3beta1CreateVersionOperationMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1CreateVersionOperationMetadata> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1CreateVersionOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1CreateVersionOperationMetadata>;

export interface GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceServiceAccountAuthConfig {
  serviceAccount?: string;
}

export const GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceServiceAccountAuthConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceServiceAccountAuthConfig> = Schema.suspend(() => Schema.Struct({
  serviceAccount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceServiceAccountAuthConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceServiceAccountAuthConfig>;

export interface GoogleCloudDialogflowCxV3beta1WebhookGenericWebService {
  requestHeaders?: Record<string, string>;
  username?: string;
  serviceAgentAuth?: "SERVICE_AGENT_AUTH_UNSPECIFIED" | "NONE" | "ID_TOKEN" | "ACCESS_TOKEN" | (string & {});
  parameterMapping?: Record<string, string>;
  requestBody?: string;
  secretVersionForUsernamePassword?: string;
  uri?: string;
  secretVersionsForRequestHeaders?: Record<string, GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceSecretVersionHeaderValue>;
  httpMethod?: "HTTP_METHOD_UNSPECIFIED" | "POST" | "GET" | "HEAD" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | (string & {});
  serviceAccountAuthConfig?: GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceServiceAccountAuthConfig;
  allowedCaCerts?: Array<string>;
  password?: string;
  oauthConfig?: GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceOAuthConfig;
  webhookType?: "WEBHOOK_TYPE_UNSPECIFIED" | "STANDARD" | "FLEXIBLE" | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1WebhookGenericWebService: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookGenericWebService> = Schema.suspend(() => Schema.Struct({
  requestHeaders: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  username: Schema.optional(Schema.String),
  serviceAgentAuth: Schema.optional(Schema.String),
  parameterMapping: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  requestBody: Schema.optional(Schema.String),
  secretVersionForUsernamePassword: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  secretVersionsForRequestHeaders: Schema.optional(Schema.Record(Schema.String, GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceSecretVersionHeaderValue)),
  httpMethod: Schema.optional(Schema.String),
  serviceAccountAuthConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceServiceAccountAuthConfig),
  allowedCaCerts: Schema.optional(Schema.Array(Schema.String)),
  password: Schema.optional(Schema.String),
  oauthConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceOAuthConfig),
  webhookType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1WebhookGenericWebService" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookGenericWebService>;

export interface GoogleCloudDialogflowCxV3beta1WebhookServiceDirectoryConfig {
  service?: string;
  genericWebService?: GoogleCloudDialogflowCxV3beta1WebhookGenericWebService;
}

export const GoogleCloudDialogflowCxV3beta1WebhookServiceDirectoryConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookServiceDirectoryConfig> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  genericWebService: Schema.optional(GoogleCloudDialogflowCxV3beta1WebhookGenericWebService),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1WebhookServiceDirectoryConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookServiceDirectoryConfig>;

export interface GoogleCloudDialogflowCxV3GeneratorPlaceholder {
  id?: string;
  name?: string;
}

export const GoogleCloudDialogflowCxV3GeneratorPlaceholder: Schema.Schema<GoogleCloudDialogflowCxV3GeneratorPlaceholder> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3GeneratorPlaceholder" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3GeneratorPlaceholder>;

export interface GoogleCloudDialogflowCxV3AgentGitIntegrationSettingsGithubSettings {
  accessToken?: string;
  displayName?: string;
  trackingBranch?: string;
  branches?: Array<string>;
  repositoryUri?: string;
}

export const GoogleCloudDialogflowCxV3AgentGitIntegrationSettingsGithubSettings: Schema.Schema<GoogleCloudDialogflowCxV3AgentGitIntegrationSettingsGithubSettings> = Schema.suspend(() => Schema.Struct({
  accessToken: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  trackingBranch: Schema.optional(Schema.String),
  branches: Schema.optional(Schema.Array(Schema.String)),
  repositoryUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3AgentGitIntegrationSettingsGithubSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AgentGitIntegrationSettingsGithubSettings>;

export interface GoogleCloudDialogflowCxV3AgentGitIntegrationSettings {
  githubSettings?: GoogleCloudDialogflowCxV3AgentGitIntegrationSettingsGithubSettings;
}

export const GoogleCloudDialogflowCxV3AgentGitIntegrationSettings: Schema.Schema<GoogleCloudDialogflowCxV3AgentGitIntegrationSettings> = Schema.suspend(() => Schema.Struct({
  githubSettings: Schema.optional(GoogleCloudDialogflowCxV3AgentGitIntegrationSettingsGithubSettings),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3AgentGitIntegrationSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AgentGitIntegrationSettings>;

export interface GoogleCloudDialogflowCxV3beta1ConversationSignals {
  turnSignals?: GoogleCloudDialogflowCxV3beta1TurnSignals;
}

export const GoogleCloudDialogflowCxV3beta1ConversationSignals: Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationSignals> = Schema.suspend(() => Schema.Struct({
  turnSignals: Schema.optional(GoogleCloudDialogflowCxV3beta1TurnSignals),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ConversationSignals" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationSignals>;

export interface GoogleCloudDialogflowV2ArticleSuggestionModelMetadata {
  trainingModelType?: "MODEL_TYPE_UNSPECIFIED" | "SMART_REPLY_DUAL_ENCODER_MODEL" | "SMART_REPLY_BERT_MODEL" | (string & {});
}

export const GoogleCloudDialogflowV2ArticleSuggestionModelMetadata: Schema.Schema<GoogleCloudDialogflowV2ArticleSuggestionModelMetadata> = Schema.suspend(() => Schema.Struct({
  trainingModelType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2ArticleSuggestionModelMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2ArticleSuggestionModelMetadata>;

export interface GoogleCloudDialogflowCxV3ImportPlaybookRequest {
  importStrategy?: GoogleCloudDialogflowCxV3PlaybookImportStrategy;
  playbookUri?: string;
  playbookContent?: string;
}

export const GoogleCloudDialogflowCxV3ImportPlaybookRequest: Schema.Schema<GoogleCloudDialogflowCxV3ImportPlaybookRequest> = Schema.suspend(() => Schema.Struct({
  importStrategy: Schema.optional(GoogleCloudDialogflowCxV3PlaybookImportStrategy),
  playbookUri: Schema.optional(Schema.String),
  playbookContent: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ImportPlaybookRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportPlaybookRequest>;

export interface GoogleCloudDialogflowCxV3beta1EnvironmentTestCasesConfig {
  enableContinuousRun?: boolean;
  testCases?: Array<string>;
  enablePredeploymentRun?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1EnvironmentTestCasesConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1EnvironmentTestCasesConfig> = Schema.suspend(() => Schema.Struct({
  enableContinuousRun: Schema.optional(Schema.Boolean),
  testCases: Schema.optional(Schema.Array(Schema.String)),
  enablePredeploymentRun: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1EnvironmentTestCasesConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1EnvironmentTestCasesConfig>;

export interface GoogleCloudDialogflowCxV3beta1DataStoreConnection {
  documentProcessingMode?: "DOCUMENT_PROCESSING_MODE_UNSPECIFIED" | "DOCUMENTS" | "CHUNKS" | (string & {});
  dataStoreType?: "DATA_STORE_TYPE_UNSPECIFIED" | "PUBLIC_WEB" | "UNSTRUCTURED" | "STRUCTURED" | (string & {});
  dataStore?: string;
}

export const GoogleCloudDialogflowCxV3beta1DataStoreConnection: Schema.Schema<GoogleCloudDialogflowCxV3beta1DataStoreConnection> = Schema.suspend(() => Schema.Struct({
  documentProcessingMode: Schema.optional(Schema.String),
  dataStoreType: Schema.optional(Schema.String),
  dataStore: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1DataStoreConnection" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1DataStoreConnection>;

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

export interface GoogleCloudDialogflowCxV3beta1AdvancedSettingsDtmfSettings {
  endpointingTimeoutDuration?: string;
  interdigitTimeoutDuration?: string;
  maxDigits?: number;
  finishDigit?: string;
  enabled?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1AdvancedSettingsDtmfSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1AdvancedSettingsDtmfSettings> = Schema.suspend(() => Schema.Struct({
  endpointingTimeoutDuration: Schema.optional(Schema.String),
  interdigitTimeoutDuration: Schema.optional(Schema.String),
  maxDigits: Schema.optional(Schema.Number),
  finishDigit: Schema.optional(Schema.String),
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1AdvancedSettingsDtmfSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1AdvancedSettingsDtmfSettings>;

export interface GoogleCloudDialogflowCxV3beta1GcsDestination {
  uri?: string;
}

export const GoogleCloudDialogflowCxV3beta1GcsDestination: Schema.Schema<GoogleCloudDialogflowCxV3beta1GcsDestination> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1GcsDestination" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1GcsDestination>;

export interface GoogleCloudDialogflowCxV3beta1AdvancedSettingsLoggingSettings {
  enableStackdriverLogging?: boolean;
  enableConsentBasedRedaction?: boolean;
  enableInteractionLogging?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1AdvancedSettingsLoggingSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1AdvancedSettingsLoggingSettings> = Schema.suspend(() => Schema.Struct({
  enableStackdriverLogging: Schema.optional(Schema.Boolean),
  enableConsentBasedRedaction: Schema.optional(Schema.Boolean),
  enableInteractionLogging: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1AdvancedSettingsLoggingSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1AdvancedSettingsLoggingSettings>;

export interface GoogleCloudDialogflowCxV3beta1AdvancedSettingsSpeechSettings {
  endpointerSensitivity?: number;
  useTimeoutBasedEndpointing?: boolean;
  models?: Record<string, string>;
  noSpeechTimeout?: string;
}

export const GoogleCloudDialogflowCxV3beta1AdvancedSettingsSpeechSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1AdvancedSettingsSpeechSettings> = Schema.suspend(() => Schema.Struct({
  endpointerSensitivity: Schema.optional(Schema.Number),
  useTimeoutBasedEndpointing: Schema.optional(Schema.Boolean),
  models: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  noSpeechTimeout: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1AdvancedSettingsSpeechSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1AdvancedSettingsSpeechSettings>;

export interface GoogleCloudDialogflowCxV3beta1AdvancedSettings {
  dtmfSettings?: GoogleCloudDialogflowCxV3beta1AdvancedSettingsDtmfSettings;
  audioExportGcsDestination?: GoogleCloudDialogflowCxV3beta1GcsDestination;
  loggingSettings?: GoogleCloudDialogflowCxV3beta1AdvancedSettingsLoggingSettings;
  speechSettings?: GoogleCloudDialogflowCxV3beta1AdvancedSettingsSpeechSettings;
}

export const GoogleCloudDialogflowCxV3beta1AdvancedSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1AdvancedSettings> = Schema.suspend(() => Schema.Struct({
  dtmfSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1AdvancedSettingsDtmfSettings),
  audioExportGcsDestination: Schema.optional(GoogleCloudDialogflowCxV3beta1GcsDestination),
  loggingSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1AdvancedSettingsLoggingSettings),
  speechSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1AdvancedSettingsSpeechSettings),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1AdvancedSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1AdvancedSettings>;

export interface GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCaseCaseContent {
  additionalCases?: GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCases;
  message?: GoogleCloudDialogflowCxV3beta1ResponseMessage;
}

export const GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCaseCaseContent: Schema.Schema<GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCaseCaseContent> = Schema.suspend(() => Schema.Struct({
  additionalCases: Schema.optional(GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCases),
  message: Schema.optional(GoogleCloudDialogflowCxV3beta1ResponseMessage),
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

export interface GoogleCloudDialogflowCxV3beta1Fulfillment {
  generators?: Array<GoogleCloudDialogflowCxV3beta1FulfillmentGeneratorSettings>;
  returnPartialResponses?: boolean;
  enableGenerativeFallback?: boolean;
  webhook?: string;
  messages?: Array<GoogleCloudDialogflowCxV3beta1ResponseMessage>;
  advancedSettings?: GoogleCloudDialogflowCxV3beta1AdvancedSettings;
  setParameterActions?: Array<GoogleCloudDialogflowCxV3beta1FulfillmentSetParameterAction>;
  conditionalCases?: Array<GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCases>;
  tag?: string;
}

export const GoogleCloudDialogflowCxV3beta1Fulfillment: Schema.Schema<GoogleCloudDialogflowCxV3beta1Fulfillment> = Schema.suspend(() => Schema.Struct({
  generators: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1FulfillmentGeneratorSettings)),
  returnPartialResponses: Schema.optional(Schema.Boolean),
  enableGenerativeFallback: Schema.optional(Schema.Boolean),
  webhook: Schema.optional(Schema.String),
  messages: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ResponseMessage)),
  advancedSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1AdvancedSettings),
  setParameterActions: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1FulfillmentSetParameterAction)),
  conditionalCases: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCases)),
  tag: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Fulfillment" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Fulfillment>;

export interface GoogleCloudDialogflowCxV3beta1KnowledgeConnectorSettings {
  enabled?: boolean;
  targetFlow?: string;
  targetPage?: string;
  dataStoreConnections?: Array<GoogleCloudDialogflowCxV3beta1DataStoreConnection>;
  triggerFulfillment?: GoogleCloudDialogflowCxV3beta1Fulfillment;
}

export const GoogleCloudDialogflowCxV3beta1KnowledgeConnectorSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1KnowledgeConnectorSettings> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  targetFlow: Schema.optional(Schema.String),
  targetPage: Schema.optional(Schema.String),
  dataStoreConnections: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1DataStoreConnection)),
  triggerFulfillment: Schema.optional(GoogleCloudDialogflowCxV3beta1Fulfillment),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1KnowledgeConnectorSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1KnowledgeConnectorSettings>;

export interface GoogleLongrunningOperation {
  done?: boolean;
  metadata?: Record<string, unknown>;
  name?: string;
  error?: GoogleRpcStatus;
  response?: Record<string, unknown>;
}

export const GoogleLongrunningOperation: Schema.Schema<GoogleLongrunningOperation> = Schema.suspend(() => Schema.Struct({
  done: Schema.optional(Schema.Boolean),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  name: Schema.optional(Schema.String),
  error: Schema.optional(GoogleRpcStatus),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleLongrunningOperation" }) as any as Schema.Schema<GoogleLongrunningOperation>;

export interface GoogleCloudDialogflowCxV3ExportAgentResponse {
  agentContent?: string;
  commitSha?: string;
  agentUri?: string;
}

export const GoogleCloudDialogflowCxV3ExportAgentResponse: Schema.Schema<GoogleCloudDialogflowCxV3ExportAgentResponse> = Schema.suspend(() => Schema.Struct({
  agentContent: Schema.optional(Schema.String),
  commitSha: Schema.optional(Schema.String),
  agentUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ExportAgentResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportAgentResponse>;

export interface GoogleCloudDialogflowCxV3beta1ImportTestCasesResponse {
  names?: Array<string>;
}

export const GoogleCloudDialogflowCxV3beta1ImportTestCasesResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportTestCasesResponse> = Schema.suspend(() => Schema.Struct({
  names: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ImportTestCasesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportTestCasesResponse>;

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

export interface GoogleCloudDialogflowCxV3EntityTypeEntity {
  value?: string;
  synonyms?: Array<string>;
}

export const GoogleCloudDialogflowCxV3EntityTypeEntity: Schema.Schema<GoogleCloudDialogflowCxV3EntityTypeEntity> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  synonyms: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3EntityTypeEntity" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3EntityTypeEntity>;

export interface GoogleCloudDialogflowCxV3EntityTypeExcludedPhrase {
  value?: string;
}

export const GoogleCloudDialogflowCxV3EntityTypeExcludedPhrase: Schema.Schema<GoogleCloudDialogflowCxV3EntityTypeExcludedPhrase> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3EntityTypeExcludedPhrase" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3EntityTypeExcludedPhrase>;

export interface GoogleCloudDialogflowCxV3EntityType {
  name?: string;
  enableFuzzyExtraction?: boolean;
  kind?: "KIND_UNSPECIFIED" | "KIND_MAP" | "KIND_LIST" | "KIND_REGEXP" | (string & {});
  redact?: boolean;
  entities?: Array<GoogleCloudDialogflowCxV3EntityTypeEntity>;
  excludedPhrases?: Array<GoogleCloudDialogflowCxV3EntityTypeExcludedPhrase>;
  autoExpansionMode?: "AUTO_EXPANSION_MODE_UNSPECIFIED" | "AUTO_EXPANSION_MODE_DEFAULT" | (string & {});
  displayName?: string;
}

export const GoogleCloudDialogflowCxV3EntityType: Schema.Schema<GoogleCloudDialogflowCxV3EntityType> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  enableFuzzyExtraction: Schema.optional(Schema.Boolean),
  kind: Schema.optional(Schema.String),
  redact: Schema.optional(Schema.Boolean),
  entities: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3EntityTypeEntity)),
  excludedPhrases: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3EntityTypeExcludedPhrase)),
  autoExpansionMode: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3EntityType" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3EntityType>;

export interface GoogleCloudDialogflowCxV3CompareVersionsRequest {
  targetVersion?: string;
  languageCode?: string;
}

export const GoogleCloudDialogflowCxV3CompareVersionsRequest: Schema.Schema<GoogleCloudDialogflowCxV3CompareVersionsRequest> = Schema.suspend(() => Schema.Struct({
  targetVersion: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3CompareVersionsRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3CompareVersionsRequest>;

export interface GoogleCloudDialogflowCxV3CompareVersionsResponse {
  targetVersionContentJson?: string;
  compareTime?: string;
  baseVersionContentJson?: string;
}

export const GoogleCloudDialogflowCxV3CompareVersionsResponse: Schema.Schema<GoogleCloudDialogflowCxV3CompareVersionsResponse> = Schema.suspend(() => Schema.Struct({
  targetVersionContentJson: Schema.optional(Schema.String),
  compareTime: Schema.optional(Schema.String),
  baseVersionContentJson: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3CompareVersionsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3CompareVersionsResponse>;

export interface GoogleCloudDialogflowCxV3TestError {
  testTime?: string;
  testCase?: string;
  status?: GoogleRpcStatus;
}

export const GoogleCloudDialogflowCxV3TestError: Schema.Schema<GoogleCloudDialogflowCxV3TestError> = Schema.suspend(() => Schema.Struct({
  testTime: Schema.optional(Schema.String),
  testCase: Schema.optional(Schema.String),
  status: Schema.optional(GoogleRpcStatus),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3TestError" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TestError>;

export interface GoogleCloudDialogflowCxV3RunContinuousTestMetadata {
  errors?: Array<GoogleCloudDialogflowCxV3TestError>;
}

export const GoogleCloudDialogflowCxV3RunContinuousTestMetadata: Schema.Schema<GoogleCloudDialogflowCxV3RunContinuousTestMetadata> = Schema.suspend(() => Schema.Struct({
  errors: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3TestError)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3RunContinuousTestMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RunContinuousTestMetadata>;

export interface GoogleCloudDialogflowCxV3AgentClientCertificateSettings {
  privateKey?: string;
  passphrase?: string;
  sslCertificate?: string;
}

export const GoogleCloudDialogflowCxV3AgentClientCertificateSettings: Schema.Schema<GoogleCloudDialogflowCxV3AgentClientCertificateSettings> = Schema.suspend(() => Schema.Struct({
  privateKey: Schema.optional(Schema.String),
  passphrase: Schema.optional(Schema.String),
  sslCertificate: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3AgentClientCertificateSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AgentClientCertificateSettings>;

export interface GoogleLongrunningListOperationsResponse {
  unreachable?: Array<string>;
  nextPageToken?: string;
  operations?: Array<GoogleLongrunningOperation>;
}

export const GoogleLongrunningListOperationsResponse: Schema.Schema<GoogleLongrunningListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
  operations: Schema.optional(Schema.Array(GoogleLongrunningOperation)),
})).annotate({ identifier: "GoogleLongrunningListOperationsResponse" }) as any as Schema.Schema<GoogleLongrunningListOperationsResponse>;

export interface GoogleCloudDialogflowCxV3FilterSpecs {
  filter?: string;
  dataStores?: Array<string>;
}

export const GoogleCloudDialogflowCxV3FilterSpecs: Schema.Schema<GoogleCloudDialogflowCxV3FilterSpecs> = Schema.suspend(() => Schema.Struct({
  filter: Schema.optional(Schema.String),
  dataStores: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3FilterSpecs" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FilterSpecs>;

export interface GoogleCloudDialogflowCxV3SearchConfig {
  filterSpecs?: Array<GoogleCloudDialogflowCxV3FilterSpecs>;
  boostSpecs?: Array<GoogleCloudDialogflowCxV3BoostSpecs>;
}

export const GoogleCloudDialogflowCxV3SearchConfig: Schema.Schema<GoogleCloudDialogflowCxV3SearchConfig> = Schema.suspend(() => Schema.Struct({
  filterSpecs: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3FilterSpecs)),
  boostSpecs: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3BoostSpecs)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3SearchConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SearchConfig>;

export interface GoogleCloudDialogflowCxV3SessionEntityType {
  name?: string;
  entityOverrideMode?: "ENTITY_OVERRIDE_MODE_UNSPECIFIED" | "ENTITY_OVERRIDE_MODE_OVERRIDE" | "ENTITY_OVERRIDE_MODE_SUPPLEMENT" | (string & {});
  entities?: Array<GoogleCloudDialogflowCxV3EntityTypeEntity>;
}

export const GoogleCloudDialogflowCxV3SessionEntityType: Schema.Schema<GoogleCloudDialogflowCxV3SessionEntityType> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  entityOverrideMode: Schema.optional(Schema.String),
  entities: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3EntityTypeEntity)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3SessionEntityType" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SessionEntityType>;

export interface GoogleCloudDialogflowCxV3QueryParameters {
  sessionTtl?: string;
  payload?: Record<string, unknown>;
  searchConfig?: GoogleCloudDialogflowCxV3SearchConfig;
  disableWebhook?: boolean;
  llmModelSettings?: GoogleCloudDialogflowCxV3LlmModelSettings;
  parameters?: Record<string, unknown>;
  analyzeQueryTextSentiment?: boolean;
  geoLocation?: GoogleTypeLatLng;
  flowVersions?: Array<string>;
  parameterScope?: string;
  sessionEntityTypes?: Array<GoogleCloudDialogflowCxV3SessionEntityType>;
  currentPlaybook?: string;
  endUserMetadata?: Record<string, unknown>;
  timeZone?: string;
  webhookHeaders?: Record<string, string>;
  currentPage?: string;
  channel?: string;
  populateDataStoreConnectionSignals?: boolean;
}

export const GoogleCloudDialogflowCxV3QueryParameters: Schema.Schema<GoogleCloudDialogflowCxV3QueryParameters> = Schema.suspend(() => Schema.Struct({
  sessionTtl: Schema.optional(Schema.String),
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  searchConfig: Schema.optional(GoogleCloudDialogflowCxV3SearchConfig),
  disableWebhook: Schema.optional(Schema.Boolean),
  llmModelSettings: Schema.optional(GoogleCloudDialogflowCxV3LlmModelSettings),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  analyzeQueryTextSentiment: Schema.optional(Schema.Boolean),
  geoLocation: Schema.optional(GoogleTypeLatLng),
  flowVersions: Schema.optional(Schema.Array(Schema.String)),
  parameterScope: Schema.optional(Schema.String),
  sessionEntityTypes: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3SessionEntityType)),
  currentPlaybook: Schema.optional(Schema.String),
  endUserMetadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  timeZone: Schema.optional(Schema.String),
  webhookHeaders: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  currentPage: Schema.optional(Schema.String),
  channel: Schema.optional(Schema.String),
  populateDataStoreConnectionSignals: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3QueryParameters" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3QueryParameters>;

export interface GoogleCloudDialogflowCxV3MatchIntentRequest {
  persistParameterChanges?: boolean;
  queryInput?: GoogleCloudDialogflowCxV3QueryInput;
  queryParams?: GoogleCloudDialogflowCxV3QueryParameters;
}

export const GoogleCloudDialogflowCxV3MatchIntentRequest: Schema.Schema<GoogleCloudDialogflowCxV3MatchIntentRequest> = Schema.suspend(() => Schema.Struct({
  persistParameterChanges: Schema.optional(Schema.Boolean),
  queryInput: Schema.optional(GoogleCloudDialogflowCxV3QueryInput),
  queryParams: Schema.optional(GoogleCloudDialogflowCxV3QueryParameters),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3MatchIntentRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3MatchIntentRequest>;

export interface GoogleCloudDialogflowCxV3FulfillIntentRequest {
  outputAudioConfig?: GoogleCloudDialogflowCxV3OutputAudioConfig;
  match?: GoogleCloudDialogflowCxV3Match;
  matchIntentRequest?: GoogleCloudDialogflowCxV3MatchIntentRequest;
}

export const GoogleCloudDialogflowCxV3FulfillIntentRequest: Schema.Schema<GoogleCloudDialogflowCxV3FulfillIntentRequest> = Schema.suspend(() => Schema.Struct({
  outputAudioConfig: Schema.optional(GoogleCloudDialogflowCxV3OutputAudioConfig),
  match: Schema.optional(GoogleCloudDialogflowCxV3Match),
  matchIntentRequest: Schema.optional(GoogleCloudDialogflowCxV3MatchIntentRequest),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3FulfillIntentRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FulfillIntentRequest>;

export interface GoogleCloudDialogflowCxV3RunTestCaseMetadata {
}

export const GoogleCloudDialogflowCxV3RunTestCaseMetadata: Schema.Schema<GoogleCloudDialogflowCxV3RunTestCaseMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3RunTestCaseMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RunTestCaseMetadata>;

export interface GoogleCloudDialogflowV2OriginalDetectIntentRequest {
  payload?: Record<string, unknown>;
  source?: string;
  version?: string;
}

export const GoogleCloudDialogflowV2OriginalDetectIntentRequest: Schema.Schema<GoogleCloudDialogflowV2OriginalDetectIntentRequest> = Schema.suspend(() => Schema.Struct({
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  source: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2OriginalDetectIntentRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2OriginalDetectIntentRequest>;

export interface GoogleCloudDialogflowV2WebhookRequest {
  queryResult?: GoogleCloudDialogflowV2QueryResult;
  responseId?: string;
  originalDetectIntentRequest?: GoogleCloudDialogflowV2OriginalDetectIntentRequest;
  session?: string;
}

export const GoogleCloudDialogflowV2WebhookRequest: Schema.Schema<GoogleCloudDialogflowV2WebhookRequest> = Schema.suspend(() => Schema.Struct({
  queryResult: Schema.optional(GoogleCloudDialogflowV2QueryResult),
  responseId: Schema.optional(Schema.String),
  originalDetectIntentRequest: Schema.optional(GoogleCloudDialogflowV2OriginalDetectIntentRequest),
  session: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2WebhookRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2WebhookRequest>;

export interface GoogleCloudDialogflowCxV3GeneratorModelParameter {
  topP?: number;
  topK?: number;
  temperature?: number;
  maxDecodeSteps?: number;
}

export const GoogleCloudDialogflowCxV3GeneratorModelParameter: Schema.Schema<GoogleCloudDialogflowCxV3GeneratorModelParameter> = Schema.suspend(() => Schema.Struct({
  topP: Schema.optional(Schema.Number),
  topK: Schema.optional(Schema.Number),
  temperature: Schema.optional(Schema.Number),
  maxDecodeSteps: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3GeneratorModelParameter" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3GeneratorModelParameter>;

export interface GoogleCloudDialogflowCxV3InlineDestination {
  content?: string;
}

export const GoogleCloudDialogflowCxV3InlineDestination: Schema.Schema<GoogleCloudDialogflowCxV3InlineDestination> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3InlineDestination" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3InlineDestination>;

export interface GoogleCloudDialogflowCxV3beta1TestError {
  testTime?: string;
  status?: GoogleRpcStatus;
  testCase?: string;
}

export const GoogleCloudDialogflowCxV3beta1TestError: Schema.Schema<GoogleCloudDialogflowCxV3beta1TestError> = Schema.suspend(() => Schema.Struct({
  testTime: Schema.optional(Schema.String),
  status: Schema.optional(GoogleRpcStatus),
  testCase: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1TestError" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TestError>;

export interface GoogleCloudDialogflowCxV3beta1DeployFlowMetadata {
  testErrors?: Array<GoogleCloudDialogflowCxV3beta1TestError>;
}

export const GoogleCloudDialogflowCxV3beta1DeployFlowMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1DeployFlowMetadata> = Schema.suspend(() => Schema.Struct({
  testErrors: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1TestError)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1DeployFlowMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1DeployFlowMetadata>;

export interface GoogleCloudDialogflowCxV3LookupEnvironmentHistoryResponse {
  nextPageToken?: string;
  environments?: Array<GoogleCloudDialogflowCxV3Environment>;
}

export const GoogleCloudDialogflowCxV3LookupEnvironmentHistoryResponse: Schema.Schema<GoogleCloudDialogflowCxV3LookupEnvironmentHistoryResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  environments: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Environment)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3LookupEnvironmentHistoryResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3LookupEnvironmentHistoryResponse>;

export interface GoogleCloudDialogflowCxV3SpeechToTextSettings {
  enableSpeechAdaptation?: boolean;
}

export const GoogleCloudDialogflowCxV3SpeechToTextSettings: Schema.Schema<GoogleCloudDialogflowCxV3SpeechToTextSettings> = Schema.suspend(() => Schema.Struct({
  enableSpeechAdaptation: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3SpeechToTextSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SpeechToTextSettings>;

export interface GoogleCloudDialogflowV2ClearSuggestionFeatureConfigOperationMetadata {
  participantRole?: "ROLE_UNSPECIFIED" | "HUMAN_AGENT" | "AUTOMATED_AGENT" | "END_USER" | (string & {});
  conversationProfile?: string;
  createTime?: string;
  suggestionFeatureType?: "TYPE_UNSPECIFIED" | "ARTICLE_SUGGESTION" | "FAQ" | "SMART_REPLY" | "CONVERSATION_SUMMARIZATION" | "KNOWLEDGE_SEARCH" | "KNOWLEDGE_ASSIST" | (string & {});
}

export const GoogleCloudDialogflowV2ClearSuggestionFeatureConfigOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2ClearSuggestionFeatureConfigOperationMetadata> = Schema.suspend(() => Schema.Struct({
  participantRole: Schema.optional(Schema.String),
  conversationProfile: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  suggestionFeatureType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2ClearSuggestionFeatureConfigOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2ClearSuggestionFeatureConfigOperationMetadata>;

export interface GoogleCloudDialogflowV2InputDataset {
  dataset?: string;
}

export const GoogleCloudDialogflowV2InputDataset: Schema.Schema<GoogleCloudDialogflowV2InputDataset> = Schema.suspend(() => Schema.Struct({
  dataset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2InputDataset" }) as any as Schema.Schema<GoogleCloudDialogflowV2InputDataset>;

export interface GoogleCloudDialogflowV2ConversationModel {
  articleSuggestionModelMetadata?: GoogleCloudDialogflowV2ArticleSuggestionModelMetadata;
  satisfiesPzi?: boolean;
  datasets?: Array<GoogleCloudDialogflowV2InputDataset>;
  displayName?: string;
  satisfiesPzs?: boolean;
  state?: "STATE_UNSPECIFIED" | "CREATING" | "UNDEPLOYED" | "DEPLOYING" | "DEPLOYED" | "UNDEPLOYING" | "DELETING" | "FAILED" | "PENDING" | (string & {});
  createTime?: string;
  name?: string;
  languageCode?: string;
  smartReplyModelMetadata?: GoogleCloudDialogflowV2SmartReplyModelMetadata;
}

export const GoogleCloudDialogflowV2ConversationModel: Schema.Schema<GoogleCloudDialogflowV2ConversationModel> = Schema.suspend(() => Schema.Struct({
  articleSuggestionModelMetadata: Schema.optional(GoogleCloudDialogflowV2ArticleSuggestionModelMetadata),
  satisfiesPzi: Schema.optional(Schema.Boolean),
  datasets: Schema.optional(Schema.Array(GoogleCloudDialogflowV2InputDataset)),
  displayName: Schema.optional(Schema.String),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  state: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  smartReplyModelMetadata: Schema.optional(GoogleCloudDialogflowV2SmartReplyModelMetadata),
})).annotate({ identifier: "GoogleCloudDialogflowV2ConversationModel" }) as any as Schema.Schema<GoogleCloudDialogflowV2ConversationModel>;

export interface GoogleCloudDialogflowCxV3beta1IntentTrainingPhrasePart {
  text?: string;
  parameterId?: string;
}

export const GoogleCloudDialogflowCxV3beta1IntentTrainingPhrasePart: Schema.Schema<GoogleCloudDialogflowCxV3beta1IntentTrainingPhrasePart> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  parameterId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1IntentTrainingPhrasePart" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1IntentTrainingPhrasePart>;

export interface GoogleCloudDialogflowCxV3beta1IntentTrainingPhrase {
  parts?: Array<GoogleCloudDialogflowCxV3beta1IntentTrainingPhrasePart>;
  id?: string;
  repeatCount?: number;
}

export const GoogleCloudDialogflowCxV3beta1IntentTrainingPhrase: Schema.Schema<GoogleCloudDialogflowCxV3beta1IntentTrainingPhrase> = Schema.suspend(() => Schema.Struct({
  parts: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1IntentTrainingPhrasePart)),
  id: Schema.optional(Schema.String),
  repeatCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1IntentTrainingPhrase" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1IntentTrainingPhrase>;

export interface GoogleCloudDialogflowV2beta1TelephonyDtmfEvents {
  dtmfEvents?: Array<"TELEPHONY_DTMF_UNSPECIFIED" | "DTMF_ONE" | "DTMF_TWO" | "DTMF_THREE" | "DTMF_FOUR" | "DTMF_FIVE" | "DTMF_SIX" | "DTMF_SEVEN" | "DTMF_EIGHT" | "DTMF_NINE" | "DTMF_ZERO" | "DTMF_A" | "DTMF_B" | "DTMF_C" | "DTMF_D" | "DTMF_STAR" | "DTMF_POUND" | (string & {})>;
}

export const GoogleCloudDialogflowV2beta1TelephonyDtmfEvents: Schema.Schema<GoogleCloudDialogflowV2beta1TelephonyDtmfEvents> = Schema.suspend(() => Schema.Struct({
  dtmfEvents: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1TelephonyDtmfEvents" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1TelephonyDtmfEvents>;

export interface GoogleCloudDialogflowCxV3beta1EnvironmentVersionConfig {
  version?: string;
}

export const GoogleCloudDialogflowCxV3beta1EnvironmentVersionConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1EnvironmentVersionConfig> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1EnvironmentVersionConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1EnvironmentVersionConfig>;

export interface GoogleCloudDialogflowCxV3beta1Webhook {
  serviceDirectory?: GoogleCloudDialogflowCxV3beta1WebhookServiceDirectoryConfig;
  displayName?: string;
  genericWebService?: GoogleCloudDialogflowCxV3beta1WebhookGenericWebService;
  name?: string;
  disabled?: boolean;
  timeout?: string;
}

export const GoogleCloudDialogflowCxV3beta1Webhook: Schema.Schema<GoogleCloudDialogflowCxV3beta1Webhook> = Schema.suspend(() => Schema.Struct({
  serviceDirectory: Schema.optional(GoogleCloudDialogflowCxV3beta1WebhookServiceDirectoryConfig),
  displayName: Schema.optional(Schema.String),
  genericWebService: Schema.optional(GoogleCloudDialogflowCxV3beta1WebhookGenericWebService),
  name: Schema.optional(Schema.String),
  disabled: Schema.optional(Schema.Boolean),
  timeout: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Webhook" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Webhook>;

export interface GoogleCloudDialogflowCxV3beta1EnvironmentWebhookConfig {
  webhookOverrides?: Array<GoogleCloudDialogflowCxV3beta1Webhook>;
}

export const GoogleCloudDialogflowCxV3beta1EnvironmentWebhookConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1EnvironmentWebhookConfig> = Schema.suspend(() => Schema.Struct({
  webhookOverrides: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1Webhook)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1EnvironmentWebhookConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1EnvironmentWebhookConfig>;

export interface GoogleCloudDialogflowCxV3beta1Environment {
  versionConfigs?: Array<GoogleCloudDialogflowCxV3beta1EnvironmentVersionConfig>;
  webhookConfig?: GoogleCloudDialogflowCxV3beta1EnvironmentWebhookConfig;
  updateTime?: string;
  description?: string;
  displayName?: string;
  name?: string;
  testCasesConfig?: GoogleCloudDialogflowCxV3beta1EnvironmentTestCasesConfig;
}

export const GoogleCloudDialogflowCxV3beta1Environment: Schema.Schema<GoogleCloudDialogflowCxV3beta1Environment> = Schema.suspend(() => Schema.Struct({
  versionConfigs: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1EnvironmentVersionConfig)),
  webhookConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1EnvironmentWebhookConfig),
  updateTime: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  testCasesConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1EnvironmentTestCasesConfig),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Environment" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Environment>;

export interface GoogleCloudDialogflowCxV3beta1DeployFlowResponse {
  environment?: GoogleCloudDialogflowCxV3beta1Environment;
  deployment?: string;
}

export const GoogleCloudDialogflowCxV3beta1DeployFlowResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1DeployFlowResponse> = Schema.suspend(() => Schema.Struct({
  environment: Schema.optional(GoogleCloudDialogflowCxV3beta1Environment),
  deployment: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1DeployFlowResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1DeployFlowResponse>;

export interface GoogleCloudDialogflowCxV3TrainFlowRequest {
}

export const GoogleCloudDialogflowCxV3TrainFlowRequest: Schema.Schema<GoogleCloudDialogflowCxV3TrainFlowRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3TrainFlowRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TrainFlowRequest>;

export interface GoogleCloudDialogflowCxV3DetectIntentRequest {
  queryParams?: GoogleCloudDialogflowCxV3QueryParameters;
  responseView?: "DETECT_INTENT_RESPONSE_VIEW_UNSPECIFIED" | "DETECT_INTENT_RESPONSE_VIEW_FULL" | "DETECT_INTENT_RESPONSE_VIEW_BASIC" | "DETECT_INTENT_RESPONSE_VIEW_DEFAULT" | (string & {});
  outputAudioConfig?: GoogleCloudDialogflowCxV3OutputAudioConfig;
  queryInput?: GoogleCloudDialogflowCxV3QueryInput;
}

export const GoogleCloudDialogflowCxV3DetectIntentRequest: Schema.Schema<GoogleCloudDialogflowCxV3DetectIntentRequest> = Schema.suspend(() => Schema.Struct({
  queryParams: Schema.optional(GoogleCloudDialogflowCxV3QueryParameters),
  responseView: Schema.optional(Schema.String),
  outputAudioConfig: Schema.optional(GoogleCloudDialogflowCxV3OutputAudioConfig),
  queryInput: Schema.optional(GoogleCloudDialogflowCxV3QueryInput),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3DetectIntentRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DetectIntentRequest>;

export interface GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfoIntentParameterValue {
  originalValue?: string;
  resolvedValue?: unknown;
}

export const GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfoIntentParameterValue: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfoIntentParameterValue> = Schema.suspend(() => Schema.Struct({
  originalValue: Schema.optional(Schema.String),
  resolvedValue: Schema.optional(Schema.Unknown),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfoIntentParameterValue" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfoIntentParameterValue>;

export interface GoogleCloudDialogflowV2CreateConversationModelEvaluationOperationMetadata {
  state?: "STATE_UNSPECIFIED" | "INITIALIZING" | "RUNNING" | "CANCELLED" | "SUCCEEDED" | "FAILED" | (string & {});
  conversationModelEvaluation?: string;
  createTime?: string;
  conversationModel?: string;
}

export const GoogleCloudDialogflowV2CreateConversationModelEvaluationOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2CreateConversationModelEvaluationOperationMetadata> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  conversationModelEvaluation: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  conversationModel: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2CreateConversationModelEvaluationOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2CreateConversationModelEvaluationOperationMetadata>;

export interface GoogleCloudDialogflowCxV3ConversationSignals {
  turnSignals?: GoogleCloudDialogflowCxV3TurnSignals;
}

export const GoogleCloudDialogflowCxV3ConversationSignals: Schema.Schema<GoogleCloudDialogflowCxV3ConversationSignals> = Schema.suspend(() => Schema.Struct({
  turnSignals: Schema.optional(GoogleCloudDialogflowCxV3TurnSignals),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ConversationSignals" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ConversationSignals>;

export interface GoogleCloudDialogflowCxV3DeploymentResult {
  deploymentTestResults?: Array<string>;
  experiment?: string;
}

export const GoogleCloudDialogflowCxV3DeploymentResult: Schema.Schema<GoogleCloudDialogflowCxV3DeploymentResult> = Schema.suspend(() => Schema.Struct({
  deploymentTestResults: Schema.optional(Schema.Array(Schema.String)),
  experiment: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3DeploymentResult" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DeploymentResult>;

export interface GoogleCloudDialogflowCxV3Deployment {
  flowVersion?: string;
  result?: GoogleCloudDialogflowCxV3DeploymentResult;
  name?: string;
  state?: "STATE_UNSPECIFIED" | "RUNNING" | "SUCCEEDED" | "FAILED" | (string & {});
  startTime?: string;
  endTime?: string;
}

export const GoogleCloudDialogflowCxV3Deployment: Schema.Schema<GoogleCloudDialogflowCxV3Deployment> = Schema.suspend(() => Schema.Struct({
  flowVersion: Schema.optional(Schema.String),
  result: Schema.optional(GoogleCloudDialogflowCxV3DeploymentResult),
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3Deployment" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Deployment>;

export interface GoogleCloudDialogflowCxV3FlowImportStrategy {
  globalImportStrategy?: "IMPORT_STRATEGY_UNSPECIFIED" | "IMPORT_STRATEGY_CREATE_NEW" | "IMPORT_STRATEGY_REPLACE" | "IMPORT_STRATEGY_KEEP" | "IMPORT_STRATEGY_MERGE" | "IMPORT_STRATEGY_THROW_ERROR" | (string & {});
}

export const GoogleCloudDialogflowCxV3FlowImportStrategy: Schema.Schema<GoogleCloudDialogflowCxV3FlowImportStrategy> = Schema.suspend(() => Schema.Struct({
  globalImportStrategy: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3FlowImportStrategy" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FlowImportStrategy>;

export interface GoogleCloudDialogflowCxV3beta1ExportIntentsMetadata {
}

export const GoogleCloudDialogflowCxV3beta1ExportIntentsMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportIntentsMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExportIntentsMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportIntentsMetadata>;

export interface GoogleCloudDialogflowV2DeleteConversationModelOperationMetadata {
  doneTime?: string;
  conversationModel?: string;
  createTime?: string;
}

export const GoogleCloudDialogflowV2DeleteConversationModelOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2DeleteConversationModelOperationMetadata> = Schema.suspend(() => Schema.Struct({
  doneTime: Schema.optional(Schema.String),
  conversationModel: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2DeleteConversationModelOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2DeleteConversationModelOperationMetadata>;

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
  speechEndOffset?: string;
  confidence?: number;
  isFinal?: boolean;
  transcript?: string;
  speechWordInfo?: Array<GoogleCloudDialogflowV2SpeechWordInfo>;
  messageType?: "MESSAGE_TYPE_UNSPECIFIED" | "TRANSCRIPT" | "END_OF_SINGLE_UTTERANCE" | (string & {});
  languageCode?: string;
}

export const GoogleCloudDialogflowV2StreamingRecognitionResult: Schema.Schema<GoogleCloudDialogflowV2StreamingRecognitionResult> = Schema.suspend(() => Schema.Struct({
  speechEndOffset: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  isFinal: Schema.optional(Schema.Boolean),
  transcript: Schema.optional(Schema.String),
  speechWordInfo: Schema.optional(Schema.Array(GoogleCloudDialogflowV2SpeechWordInfo)),
  messageType: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2StreamingRecognitionResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2StreamingRecognitionResult>;

export interface GoogleCloudDialogflowV2ConversationEvent {
  errorStatus?: GoogleRpcStatus;
  conversation?: string;
  type?: "TYPE_UNSPECIFIED" | "CONVERSATION_STARTED" | "CONVERSATION_FINISHED" | "HUMAN_INTERVENTION_NEEDED" | "NEW_MESSAGE" | "NEW_RECOGNITION_RESULT" | "UNRECOVERABLE_ERROR" | (string & {});
  newMessagePayload?: GoogleCloudDialogflowV2Message;
  newRecognitionResultPayload?: GoogleCloudDialogflowV2StreamingRecognitionResult;
}

export const GoogleCloudDialogflowV2ConversationEvent: Schema.Schema<GoogleCloudDialogflowV2ConversationEvent> = Schema.suspend(() => Schema.Struct({
  errorStatus: Schema.optional(GoogleRpcStatus),
  conversation: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  newMessagePayload: Schema.optional(GoogleCloudDialogflowV2Message),
  newRecognitionResultPayload: Schema.optional(GoogleCloudDialogflowV2StreamingRecognitionResult),
})).annotate({ identifier: "GoogleCloudDialogflowV2ConversationEvent" }) as any as Schema.Schema<GoogleCloudDialogflowV2ConversationEvent>;

export interface GoogleCloudDialogflowCxV3ImportTestCasesResponse {
  names?: Array<string>;
}

export const GoogleCloudDialogflowCxV3ImportTestCasesResponse: Schema.Schema<GoogleCloudDialogflowCxV3ImportTestCasesResponse> = Schema.suspend(() => Schema.Struct({
  names: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ImportTestCasesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportTestCasesResponse>;

export interface GoogleCloudDialogflowCxV3RestorePlaybookVersionRequest {
}

export const GoogleCloudDialogflowCxV3RestorePlaybookVersionRequest: Schema.Schema<GoogleCloudDialogflowCxV3RestorePlaybookVersionRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3RestorePlaybookVersionRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RestorePlaybookVersionRequest>;

export interface GoogleCloudDialogflowCxV3beta1ContinuousTestResult {
  runTime?: string;
  result?: "AGGREGATED_TEST_RESULT_UNSPECIFIED" | "PASSED" | "FAILED" | (string & {});
  testCaseResults?: Array<string>;
  name?: string;
}

export const GoogleCloudDialogflowCxV3beta1ContinuousTestResult: Schema.Schema<GoogleCloudDialogflowCxV3beta1ContinuousTestResult> = Schema.suspend(() => Schema.Struct({
  runTime: Schema.optional(Schema.String),
  result: Schema.optional(Schema.String),
  testCaseResults: Schema.optional(Schema.Array(Schema.String)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ContinuousTestResult" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ContinuousTestResult>;

export interface GoogleCloudDialogflowCxV3TransitionCoverageTransitionNode {
  page?: GoogleCloudDialogflowCxV3Page;
  flow?: GoogleCloudDialogflowCxV3Flow;
}

export const GoogleCloudDialogflowCxV3TransitionCoverageTransitionNode: Schema.Schema<GoogleCloudDialogflowCxV3TransitionCoverageTransitionNode> = Schema.suspend(() => Schema.Struct({
  page: Schema.optional(GoogleCloudDialogflowCxV3Page),
  flow: Schema.optional(GoogleCloudDialogflowCxV3Flow),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3TransitionCoverageTransitionNode" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TransitionCoverageTransitionNode>;

export interface GoogleCloudDialogflowCxV3TransitionCoverageTransition {
  eventHandler?: GoogleCloudDialogflowCxV3EventHandler;
  transitionRoute?: GoogleCloudDialogflowCxV3TransitionRoute;
  index?: number;
  covered?: boolean;
  target?: GoogleCloudDialogflowCxV3TransitionCoverageTransitionNode;
  source?: GoogleCloudDialogflowCxV3TransitionCoverageTransitionNode;
}

export const GoogleCloudDialogflowCxV3TransitionCoverageTransition: Schema.Schema<GoogleCloudDialogflowCxV3TransitionCoverageTransition> = Schema.suspend(() => Schema.Struct({
  eventHandler: Schema.optional(GoogleCloudDialogflowCxV3EventHandler),
  transitionRoute: Schema.optional(GoogleCloudDialogflowCxV3TransitionRoute),
  index: Schema.optional(Schema.Number),
  covered: Schema.optional(Schema.Boolean),
  target: Schema.optional(GoogleCloudDialogflowCxV3TransitionCoverageTransitionNode),
  source: Schema.optional(GoogleCloudDialogflowCxV3TransitionCoverageTransitionNode),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3TransitionCoverageTransition" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TransitionCoverageTransition>;

export interface GoogleCloudDialogflowCxV3TransitionCoverage {
  transitions?: Array<GoogleCloudDialogflowCxV3TransitionCoverageTransition>;
  coverageScore?: number;
}

export const GoogleCloudDialogflowCxV3TransitionCoverage: Schema.Schema<GoogleCloudDialogflowCxV3TransitionCoverage> = Schema.suspend(() => Schema.Struct({
  transitions: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3TransitionCoverageTransition)),
  coverageScore: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3TransitionCoverage" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TransitionCoverage>;

export interface GoogleCloudDialogflowCxV3IntentCoverage {
  intents?: Array<GoogleCloudDialogflowCxV3IntentCoverageIntent>;
  coverageScore?: number;
}

export const GoogleCloudDialogflowCxV3IntentCoverage: Schema.Schema<GoogleCloudDialogflowCxV3IntentCoverage> = Schema.suspend(() => Schema.Struct({
  intents: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3IntentCoverageIntent)),
  coverageScore: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3IntentCoverage" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3IntentCoverage>;

export interface GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverageTransition {
  transitionRoute?: GoogleCloudDialogflowCxV3TransitionRoute;
  covered?: boolean;
}

export const GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverageTransition: Schema.Schema<GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverageTransition> = Schema.suspend(() => Schema.Struct({
  transitionRoute: Schema.optional(GoogleCloudDialogflowCxV3TransitionRoute),
  covered: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverageTransition" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverageTransition>;

export interface GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverage {
  routeGroup?: GoogleCloudDialogflowCxV3TransitionRouteGroup;
  transitions?: Array<GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverageTransition>;
  coverageScore?: number;
}

export const GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverage: Schema.Schema<GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverage> = Schema.suspend(() => Schema.Struct({
  routeGroup: Schema.optional(GoogleCloudDialogflowCxV3TransitionRouteGroup),
  transitions: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverageTransition)),
  coverageScore: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverage" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverage>;

export interface GoogleCloudDialogflowCxV3TransitionRouteGroupCoverage {
  coverages?: Array<GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverage>;
  coverageScore?: number;
}

export const GoogleCloudDialogflowCxV3TransitionRouteGroupCoverage: Schema.Schema<GoogleCloudDialogflowCxV3TransitionRouteGroupCoverage> = Schema.suspend(() => Schema.Struct({
  coverages: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverage)),
  coverageScore: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3TransitionRouteGroupCoverage" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TransitionRouteGroupCoverage>;

export interface GoogleCloudDialogflowCxV3CalculateCoverageResponse {
  transitionCoverage?: GoogleCloudDialogflowCxV3TransitionCoverage;
  intentCoverage?: GoogleCloudDialogflowCxV3IntentCoverage;
  agent?: string;
  routeGroupCoverage?: GoogleCloudDialogflowCxV3TransitionRouteGroupCoverage;
}

export const GoogleCloudDialogflowCxV3CalculateCoverageResponse: Schema.Schema<GoogleCloudDialogflowCxV3CalculateCoverageResponse> = Schema.suspend(() => Schema.Struct({
  transitionCoverage: Schema.optional(GoogleCloudDialogflowCxV3TransitionCoverage),
  intentCoverage: Schema.optional(GoogleCloudDialogflowCxV3IntentCoverage),
  agent: Schema.optional(Schema.String),
  routeGroupCoverage: Schema.optional(GoogleCloudDialogflowCxV3TransitionRouteGroupCoverage),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3CalculateCoverageResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3CalculateCoverageResponse>;

export interface GoogleCloudDialogflowCxV3Changelog {
  name?: string;
  languageCode?: string;
  type?: string;
  displayName?: string;
  resource?: string;
  userEmail?: string;
  action?: string;
  createTime?: string;
}

export const GoogleCloudDialogflowCxV3Changelog: Schema.Schema<GoogleCloudDialogflowCxV3Changelog> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.String),
  userEmail: Schema.optional(Schema.String),
  action: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3Changelog" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Changelog>;

export interface GoogleCloudDialogflowCxV3MatchIntentResponse {
  transcript?: string;
  triggerEvent?: string;
  matches?: Array<GoogleCloudDialogflowCxV3Match>;
  triggerIntent?: string;
  text?: string;
  currentPage?: GoogleCloudDialogflowCxV3Page;
}

export const GoogleCloudDialogflowCxV3MatchIntentResponse: Schema.Schema<GoogleCloudDialogflowCxV3MatchIntentResponse> = Schema.suspend(() => Schema.Struct({
  transcript: Schema.optional(Schema.String),
  triggerEvent: Schema.optional(Schema.String),
  matches: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Match)),
  triggerIntent: Schema.optional(Schema.String),
  text: Schema.optional(Schema.String),
  currentPage: Schema.optional(GoogleCloudDialogflowCxV3Page),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3MatchIntentResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3MatchIntentResponse>;

export interface GoogleCloudDialogflowCxV3ToolVersion {
  tool?: GoogleCloudDialogflowCxV3Tool;
  updateTime?: string;
  name?: string;
  createTime?: string;
  displayName?: string;
}

export const GoogleCloudDialogflowCxV3ToolVersion: Schema.Schema<GoogleCloudDialogflowCxV3ToolVersion> = Schema.suspend(() => Schema.Struct({
  tool: Schema.optional(GoogleCloudDialogflowCxV3Tool),
  updateTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ToolVersion" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolVersion>;

export interface GoogleCloudDialogflowCxV3ListToolVersionsResponse {
  toolVersions?: Array<GoogleCloudDialogflowCxV3ToolVersion>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListToolVersionsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListToolVersionsResponse> = Schema.suspend(() => Schema.Struct({
  toolVersions: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3ToolVersion)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ListToolVersionsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListToolVersionsResponse>;

export interface GoogleCloudDialogflowCxV3RunTestCaseRequest {
  environment?: string;
}

export const GoogleCloudDialogflowCxV3RunTestCaseRequest: Schema.Schema<GoogleCloudDialogflowCxV3RunTestCaseRequest> = Schema.suspend(() => Schema.Struct({
  environment: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3RunTestCaseRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RunTestCaseRequest>;

export interface GoogleCloudDialogflowCxV3Generator {
  placeholders?: Array<GoogleCloudDialogflowCxV3GeneratorPlaceholder>;
  modelParameter?: GoogleCloudDialogflowCxV3GeneratorModelParameter;
  llmModelSettings?: GoogleCloudDialogflowCxV3LlmModelSettings;
  name?: string;
  displayName?: string;
  promptText?: GoogleCloudDialogflowCxV3Phrase;
}

export const GoogleCloudDialogflowCxV3Generator: Schema.Schema<GoogleCloudDialogflowCxV3Generator> = Schema.suspend(() => Schema.Struct({
  placeholders: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3GeneratorPlaceholder)),
  modelParameter: Schema.optional(GoogleCloudDialogflowCxV3GeneratorModelParameter),
  llmModelSettings: Schema.optional(GoogleCloudDialogflowCxV3LlmModelSettings),
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  promptText: Schema.optional(GoogleCloudDialogflowCxV3Phrase),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3Generator" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Generator>;

export interface GoogleCloudDialogflowCxV3ListGeneratorsResponse {
  generators?: Array<GoogleCloudDialogflowCxV3Generator>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListGeneratorsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListGeneratorsResponse> = Schema.suspend(() => Schema.Struct({
  generators: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Generator)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ListGeneratorsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListGeneratorsResponse>;

export interface GoogleCloudDialogflowV2ExportOperationMetadata {
  exportedGcsDestination?: GoogleCloudDialogflowV2GcsDestination;
}

export const GoogleCloudDialogflowV2ExportOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2ExportOperationMetadata> = Schema.suspend(() => Schema.Struct({
  exportedGcsDestination: Schema.optional(GoogleCloudDialogflowV2GcsDestination),
})).annotate({ identifier: "GoogleCloudDialogflowV2ExportOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2ExportOperationMetadata>;

export interface GoogleCloudDialogflowCxV3beta1RunTestCaseMetadata {
}

export const GoogleCloudDialogflowCxV3beta1RunTestCaseMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1RunTestCaseMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1RunTestCaseMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1RunTestCaseMetadata>;

export interface GoogleCloudDialogflowCxV3beta1IntentParameter {
  redact?: boolean;
  id?: string;
  entityType?: string;
  isList?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1IntentParameter: Schema.Schema<GoogleCloudDialogflowCxV3beta1IntentParameter> = Schema.suspend(() => Schema.Struct({
  redact: Schema.optional(Schema.Boolean),
  id: Schema.optional(Schema.String),
  entityType: Schema.optional(Schema.String),
  isList: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1IntentParameter" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1IntentParameter>;

export interface GoogleCloudDialogflowCxV3beta1TestConfig {
  page?: string;
  flow?: string;
  trackingParameters?: Array<string>;
}

export const GoogleCloudDialogflowCxV3beta1TestConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1TestConfig> = Schema.suspend(() => Schema.Struct({
  page: Schema.optional(Schema.String),
  flow: Schema.optional(Schema.String),
  trackingParameters: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1TestConfig" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TestConfig>;

export interface GoogleCloudDialogflowCxV3ImportIntentsResponseConflictingResources {
  entityDisplayNames?: Array<string>;
  intentDisplayNames?: Array<string>;
}

export const GoogleCloudDialogflowCxV3ImportIntentsResponseConflictingResources: Schema.Schema<GoogleCloudDialogflowCxV3ImportIntentsResponseConflictingResources> = Schema.suspend(() => Schema.Struct({
  entityDisplayNames: Schema.optional(Schema.Array(Schema.String)),
  intentDisplayNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ImportIntentsResponseConflictingResources" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportIntentsResponseConflictingResources>;

export interface GoogleCloudDialogflowCxV3ListTransitionRouteGroupsResponse {
  nextPageToken?: string;
  transitionRouteGroups?: Array<GoogleCloudDialogflowCxV3TransitionRouteGroup>;
}

export const GoogleCloudDialogflowCxV3ListTransitionRouteGroupsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListTransitionRouteGroupsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  transitionRouteGroups: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3TransitionRouteGroup)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ListTransitionRouteGroupsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListTransitionRouteGroupsResponse>;

export interface GoogleCloudDialogflowCxV3beta1TransitionRoute {
  triggerFulfillment?: GoogleCloudDialogflowCxV3beta1Fulfillment;
  description?: string;
  targetFlow?: string;
  name?: string;
  condition?: string;
  targetPage?: string;
  intent?: string;
}

export const GoogleCloudDialogflowCxV3beta1TransitionRoute: Schema.Schema<GoogleCloudDialogflowCxV3beta1TransitionRoute> = Schema.suspend(() => Schema.Struct({
  triggerFulfillment: Schema.optional(GoogleCloudDialogflowCxV3beta1Fulfillment),
  description: Schema.optional(Schema.String),
  targetFlow: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  condition: Schema.optional(Schema.String),
  targetPage: Schema.optional(Schema.String),
  intent: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1TransitionRoute" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TransitionRoute>;

export interface GoogleCloudDialogflowV2beta1KnowledgeOperationMetadata {
  knowledgeBase?: string;
  exportOperationMetadata?: GoogleCloudDialogflowV2beta1ExportOperationMetadata;
  state?: "STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "DONE" | (string & {});
  doneTime?: string;
}

export const GoogleCloudDialogflowV2beta1KnowledgeOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeOperationMetadata> = Schema.suspend(() => Schema.Struct({
  knowledgeBase: Schema.optional(Schema.String),
  exportOperationMetadata: Schema.optional(GoogleCloudDialogflowV2beta1ExportOperationMetadata),
  state: Schema.optional(Schema.String),
  doneTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1KnowledgeOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeOperationMetadata>;

export interface GoogleCloudDialogflowCxV3ExportIntentsResponse {
  intentsContent?: GoogleCloudDialogflowCxV3InlineDestination;
  intentsUri?: string;
}

export const GoogleCloudDialogflowCxV3ExportIntentsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ExportIntentsResponse> = Schema.suspend(() => Schema.Struct({
  intentsContent: Schema.optional(GoogleCloudDialogflowCxV3InlineDestination),
  intentsUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ExportIntentsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportIntentsResponse>;

export interface GoogleCloudDialogflowCxV3StartExperimentRequest {
}

export const GoogleCloudDialogflowCxV3StartExperimentRequest: Schema.Schema<GoogleCloudDialogflowCxV3StartExperimentRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3StartExperimentRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3StartExperimentRequest>;

export interface GoogleCloudDialogflowCxV3RestoreAgentRequestGitSource {
  trackingBranch?: string;
}

export const GoogleCloudDialogflowCxV3RestoreAgentRequestGitSource: Schema.Schema<GoogleCloudDialogflowCxV3RestoreAgentRequestGitSource> = Schema.suspend(() => Schema.Struct({
  trackingBranch: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3RestoreAgentRequestGitSource" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RestoreAgentRequestGitSource>;

export interface GoogleCloudDialogflowCxV3ListSessionEntityTypesResponse {
  sessionEntityTypes?: Array<GoogleCloudDialogflowCxV3SessionEntityType>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListSessionEntityTypesResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListSessionEntityTypesResponse> = Schema.suspend(() => Schema.Struct({
  sessionEntityTypes: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3SessionEntityType)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ListSessionEntityTypesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListSessionEntityTypesResponse>;

export interface GoogleCloudDialogflowCxV3TestCaseError {
  testCase?: GoogleCloudDialogflowCxV3TestCase;
  status?: GoogleRpcStatus;
}

export const GoogleCloudDialogflowCxV3TestCaseError: Schema.Schema<GoogleCloudDialogflowCxV3TestCaseError> = Schema.suspend(() => Schema.Struct({
  testCase: Schema.optional(GoogleCloudDialogflowCxV3TestCase),
  status: Schema.optional(GoogleRpcStatus),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3TestCaseError" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TestCaseError>;

export interface GoogleCloudDialogflowV2beta1OriginalDetectIntentRequest {
  source?: string;
  payload?: Record<string, unknown>;
  version?: string;
}

export const GoogleCloudDialogflowV2beta1OriginalDetectIntentRequest: Schema.Schema<GoogleCloudDialogflowV2beta1OriginalDetectIntentRequest> = Schema.suspend(() => Schema.Struct({
  source: Schema.optional(Schema.String),
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1OriginalDetectIntentRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1OriginalDetectIntentRequest>;

export interface GoogleCloudDialogflowCxV3InlineSource {
  content?: string;
}

export const GoogleCloudDialogflowCxV3InlineSource: Schema.Schema<GoogleCloudDialogflowCxV3InlineSource> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3InlineSource" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3InlineSource>;

export interface GoogleCloudDialogflowCxV3ImportEntityTypesRequest {
  targetEntityType?: string;
  entityTypesUri?: string;
  entityTypesContent?: GoogleCloudDialogflowCxV3InlineSource;
  mergeOption?: "MERGE_OPTION_UNSPECIFIED" | "REPLACE" | "MERGE" | "RENAME" | "REPORT_CONFLICT" | "KEEP" | (string & {});
}

export const GoogleCloudDialogflowCxV3ImportEntityTypesRequest: Schema.Schema<GoogleCloudDialogflowCxV3ImportEntityTypesRequest> = Schema.suspend(() => Schema.Struct({
  targetEntityType: Schema.optional(Schema.String),
  entityTypesUri: Schema.optional(Schema.String),
  entityTypesContent: Schema.optional(GoogleCloudDialogflowCxV3InlineSource),
  mergeOption: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ImportEntityTypesRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportEntityTypesRequest>;

export interface GoogleCloudDialogflowCxV3WebhookRequestIntentInfoIntentParameterValue {
  resolvedValue?: unknown;
  originalValue?: string;
}

export const GoogleCloudDialogflowCxV3WebhookRequestIntentInfoIntentParameterValue: Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequestIntentInfoIntentParameterValue> = Schema.suspend(() => Schema.Struct({
  resolvedValue: Schema.optional(Schema.Unknown),
  originalValue: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3WebhookRequestIntentInfoIntentParameterValue" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequestIntentInfoIntentParameterValue>;

export interface GoogleCloudDialogflowCxV3WebhookRequestIntentInfo {
  lastMatchedIntent?: string;
  confidence?: number;
  parameters?: Record<string, GoogleCloudDialogflowCxV3WebhookRequestIntentInfoIntentParameterValue>;
  displayName?: string;
}

export const GoogleCloudDialogflowCxV3WebhookRequestIntentInfo: Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequestIntentInfo> = Schema.suspend(() => Schema.Struct({
  lastMatchedIntent: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  parameters: Schema.optional(Schema.Record(Schema.String, GoogleCloudDialogflowCxV3WebhookRequestIntentInfoIntentParameterValue)),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3WebhookRequestIntentInfo" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequestIntentInfo>;

export interface GoogleCloudDialogflowCxV3PageInfoFormInfoParameterInfo {
  displayName?: string;
  required?: boolean;
  justCollected?: boolean;
  state?: "PARAMETER_STATE_UNSPECIFIED" | "EMPTY" | "INVALID" | "FILLED" | (string & {});
  value?: unknown;
}

export const GoogleCloudDialogflowCxV3PageInfoFormInfoParameterInfo: Schema.Schema<GoogleCloudDialogflowCxV3PageInfoFormInfoParameterInfo> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  required: Schema.optional(Schema.Boolean),
  justCollected: Schema.optional(Schema.Boolean),
  state: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Unknown),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3PageInfoFormInfoParameterInfo" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3PageInfoFormInfoParameterInfo>;

export interface GoogleCloudDialogflowCxV3beta1Intent {
  description?: string;
  displayName?: string;
  priority?: number;
  labels?: Record<string, string>;
  isFallback?: boolean;
  trainingPhrases?: Array<GoogleCloudDialogflowCxV3beta1IntentTrainingPhrase>;
  parameters?: Array<GoogleCloudDialogflowCxV3beta1IntentParameter>;
  name?: string;
}

export const GoogleCloudDialogflowCxV3beta1Intent: Schema.Schema<GoogleCloudDialogflowCxV3beta1Intent> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.Number),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  isFallback: Schema.optional(Schema.Boolean),
  trainingPhrases: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1IntentTrainingPhrase)),
  parameters: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1IntentParameter)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Intent" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Intent>;

export interface GoogleCloudDialogflowCxV3beta1TestRunDifference {
  description?: string;
  type?: "DIFF_TYPE_UNSPECIFIED" | "INTENT" | "PAGE" | "PARAMETERS" | "UTTERANCE" | "FLOW" | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1TestRunDifference: Schema.Schema<GoogleCloudDialogflowCxV3beta1TestRunDifference> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1TestRunDifference" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TestRunDifference>;

export interface GoogleCloudDialogflowCxV3beta1EventHandler {
  name?: string;
  triggerFulfillment?: GoogleCloudDialogflowCxV3beta1Fulfillment;
  targetFlow?: string;
  event?: string;
  targetPlaybook?: string;
  targetPage?: string;
}

export const GoogleCloudDialogflowCxV3beta1EventHandler: Schema.Schema<GoogleCloudDialogflowCxV3beta1EventHandler> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  triggerFulfillment: Schema.optional(GoogleCloudDialogflowCxV3beta1Fulfillment),
  targetFlow: Schema.optional(Schema.String),
  event: Schema.optional(Schema.String),
  targetPlaybook: Schema.optional(Schema.String),
  targetPage: Schema.optional(Schema.String),
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
  advancedSettings?: GoogleCloudDialogflowCxV3beta1AdvancedSettings;
  defaultValue?: unknown;
  entityType?: string;
  required?: boolean;
  redact?: boolean;
  fillBehavior?: GoogleCloudDialogflowCxV3beta1FormParameterFillBehavior;
  displayName?: string;
  isList?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1FormParameter: Schema.Schema<GoogleCloudDialogflowCxV3beta1FormParameter> = Schema.suspend(() => Schema.Struct({
  advancedSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1AdvancedSettings),
  defaultValue: Schema.optional(Schema.Unknown),
  entityType: Schema.optional(Schema.String),
  required: Schema.optional(Schema.Boolean),
  redact: Schema.optional(Schema.Boolean),
  fillBehavior: Schema.optional(GoogleCloudDialogflowCxV3beta1FormParameterFillBehavior),
  displayName: Schema.optional(Schema.String),
  isList: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1FormParameter" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1FormParameter>;

export interface GoogleCloudDialogflowCxV3beta1Form {
  parameters?: Array<GoogleCloudDialogflowCxV3beta1FormParameter>;
}

export const GoogleCloudDialogflowCxV3beta1Form: Schema.Schema<GoogleCloudDialogflowCxV3beta1Form> = Schema.suspend(() => Schema.Struct({
  parameters: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1FormParameter)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Form" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Form>;

export interface GoogleCloudDialogflowCxV3beta1Page {
  description?: string;
  displayName?: string;
  entryFulfillment?: GoogleCloudDialogflowCxV3beta1Fulfillment;
  knowledgeConnectorSettings?: GoogleCloudDialogflowCxV3beta1KnowledgeConnectorSettings;
  name?: string;
  eventHandlers?: Array<GoogleCloudDialogflowCxV3beta1EventHandler>;
  transitionRouteGroups?: Array<string>;
  form?: GoogleCloudDialogflowCxV3beta1Form;
  advancedSettings?: GoogleCloudDialogflowCxV3beta1AdvancedSettings;
  transitionRoutes?: Array<GoogleCloudDialogflowCxV3beta1TransitionRoute>;
}

export const GoogleCloudDialogflowCxV3beta1Page: Schema.Schema<GoogleCloudDialogflowCxV3beta1Page> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  entryFulfillment: Schema.optional(GoogleCloudDialogflowCxV3beta1Fulfillment),
  knowledgeConnectorSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1KnowledgeConnectorSettings),
  name: Schema.optional(Schema.String),
  eventHandlers: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1EventHandler)),
  transitionRouteGroups: Schema.optional(Schema.Array(Schema.String)),
  form: Schema.optional(GoogleCloudDialogflowCxV3beta1Form),
  advancedSettings: Schema.optional(GoogleCloudDialogflowCxV3beta1AdvancedSettings),
  transitionRoutes: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1TransitionRoute)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1Page" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Page>;

export interface GoogleCloudDialogflowCxV3beta1ConversationTurnVirtualAgentOutput {
  triggeredIntent?: GoogleCloudDialogflowCxV3beta1Intent;
  textResponses?: Array<GoogleCloudDialogflowCxV3beta1ResponseMessageText>;
  diagnosticInfo?: Record<string, unknown>;
  differences?: Array<GoogleCloudDialogflowCxV3beta1TestRunDifference>;
  currentPage?: GoogleCloudDialogflowCxV3beta1Page;
  sessionParameters?: Record<string, unknown>;
  status?: GoogleRpcStatus;
}

export const GoogleCloudDialogflowCxV3beta1ConversationTurnVirtualAgentOutput: Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationTurnVirtualAgentOutput> = Schema.suspend(() => Schema.Struct({
  triggeredIntent: Schema.optional(GoogleCloudDialogflowCxV3beta1Intent),
  textResponses: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ResponseMessageText)),
  diagnosticInfo: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  differences: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1TestRunDifference)),
  currentPage: Schema.optional(GoogleCloudDialogflowCxV3beta1Page),
  sessionParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
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

export interface GoogleCloudDialogflowCxV3BatchRunTestCasesResponse {
  results?: Array<GoogleCloudDialogflowCxV3TestCaseResult>;
}

export const GoogleCloudDialogflowCxV3BatchRunTestCasesResponse: Schema.Schema<GoogleCloudDialogflowCxV3BatchRunTestCasesResponse> = Schema.suspend(() => Schema.Struct({
  results: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3TestCaseResult)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3BatchRunTestCasesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3BatchRunTestCasesResponse>;

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

export interface GoogleCloudDialogflowCxV3ExportEntityTypesResponse {
  entityTypesContent?: GoogleCloudDialogflowCxV3InlineDestination;
  entityTypesUri?: string;
}

export const GoogleCloudDialogflowCxV3ExportEntityTypesResponse: Schema.Schema<GoogleCloudDialogflowCxV3ExportEntityTypesResponse> = Schema.suspend(() => Schema.Struct({
  entityTypesContent: Schema.optional(GoogleCloudDialogflowCxV3InlineDestination),
  entityTypesUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ExportEntityTypesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportEntityTypesResponse>;

export interface GoogleCloudDialogflowCxV3ResourceName {
  name?: string;
  displayName?: string;
}

export const GoogleCloudDialogflowCxV3ResourceName: Schema.Schema<GoogleCloudDialogflowCxV3ResourceName> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ResourceName" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResourceName>;

export interface GoogleCloudDialogflowCxV3ValidationMessage {
  resources?: Array<string>;
  resourceType?: "RESOURCE_TYPE_UNSPECIFIED" | "AGENT" | "INTENT" | "INTENT_TRAINING_PHRASE" | "INTENT_PARAMETER" | "INTENTS" | "INTENT_TRAINING_PHRASES" | "ENTITY_TYPE" | "ENTITY_TYPES" | "WEBHOOK" | "FLOW" | "PAGE" | "PAGES" | "TRANSITION_ROUTE_GROUP" | "AGENT_TRANSITION_ROUTE_GROUP" | (string & {});
  severity?: "SEVERITY_UNSPECIFIED" | "INFO" | "WARNING" | "ERROR" | (string & {});
  resourceNames?: Array<GoogleCloudDialogflowCxV3ResourceName>;
  detail?: string;
}

export const GoogleCloudDialogflowCxV3ValidationMessage: Schema.Schema<GoogleCloudDialogflowCxV3ValidationMessage> = Schema.suspend(() => Schema.Struct({
  resources: Schema.optional(Schema.Array(Schema.String)),
  resourceType: Schema.optional(Schema.String),
  severity: Schema.optional(Schema.String),
  resourceNames: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3ResourceName)),
  detail: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ValidationMessage" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ValidationMessage>;

export interface GoogleCloudDialogflowCxV3FlowValidationResult {
  validationMessages?: Array<GoogleCloudDialogflowCxV3ValidationMessage>;
  name?: string;
  updateTime?: string;
}

export const GoogleCloudDialogflowCxV3FlowValidationResult: Schema.Schema<GoogleCloudDialogflowCxV3FlowValidationResult> = Schema.suspend(() => Schema.Struct({
  validationMessages: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3ValidationMessage)),
  name: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3FlowValidationResult" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FlowValidationResult>;

export interface GoogleCloudDialogflowCxV3DeployFlowResponse {
  environment?: GoogleCloudDialogflowCxV3Environment;
  deployment?: string;
}

export const GoogleCloudDialogflowCxV3DeployFlowResponse: Schema.Schema<GoogleCloudDialogflowCxV3DeployFlowResponse> = Schema.suspend(() => Schema.Struct({
  environment: Schema.optional(GoogleCloudDialogflowCxV3Environment),
  deployment: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3DeployFlowResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DeployFlowResponse>;

export interface GoogleCloudDialogflowCxV3ExportIntentsMetadata {
}

export const GoogleCloudDialogflowCxV3ExportIntentsMetadata: Schema.Schema<GoogleCloudDialogflowCxV3ExportIntentsMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ExportIntentsMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportIntentsMetadata>;

export interface GoogleCloudDialogflowV2beta1MessageAnnotation {
  containEntities?: boolean;
  parts?: Array<GoogleCloudDialogflowV2beta1AnnotatedMessagePart>;
}

export const GoogleCloudDialogflowV2beta1MessageAnnotation: Schema.Schema<GoogleCloudDialogflowV2beta1MessageAnnotation> = Schema.suspend(() => Schema.Struct({
  containEntities: Schema.optional(Schema.Boolean),
  parts: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1AnnotatedMessagePart)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1MessageAnnotation" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1MessageAnnotation>;

export interface GoogleCloudDialogflowV2beta1Message {
  languageCode?: string;
  content?: string;
  responseMessages?: Array<GoogleCloudDialogflowV2beta1ResponseMessage>;
  participantRole?: "ROLE_UNSPECIFIED" | "HUMAN_AGENT" | "AUTOMATED_AGENT" | "END_USER" | (string & {});
  messageAnnotation?: GoogleCloudDialogflowV2beta1MessageAnnotation;
  participant?: string;
  sentimentAnalysis?: GoogleCloudDialogflowV2beta1SentimentAnalysisResult;
  name?: string;
  sendTime?: string;
  createTime?: string;
}

export const GoogleCloudDialogflowV2beta1Message: Schema.Schema<GoogleCloudDialogflowV2beta1Message> = Schema.suspend(() => Schema.Struct({
  languageCode: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
  responseMessages: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1ResponseMessage)),
  participantRole: Schema.optional(Schema.String),
  messageAnnotation: Schema.optional(GoogleCloudDialogflowV2beta1MessageAnnotation),
  participant: Schema.optional(Schema.String),
  sentimentAnalysis: Schema.optional(GoogleCloudDialogflowV2beta1SentimentAnalysisResult),
  name: Schema.optional(Schema.String),
  sendTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1Message" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1Message>;

export interface GoogleCloudDialogflowV2beta1StreamingRecognitionResult {
  messageType?: "MESSAGE_TYPE_UNSPECIFIED" | "TRANSCRIPT" | "END_OF_SINGLE_UTTERANCE" | "DTMF_DIGITS" | "PARTIAL_DTMF_DIGITS" | (string & {});
  stability?: number;
  isFinal?: boolean;
  languageCode?: string;
  confidence?: number;
  speechWordInfo?: Array<GoogleCloudDialogflowV2beta1SpeechWordInfo>;
  dtmfDigits?: GoogleCloudDialogflowV2beta1TelephonyDtmfEvents;
  speechEndOffset?: string;
  transcript?: string;
}

export const GoogleCloudDialogflowV2beta1StreamingRecognitionResult: Schema.Schema<GoogleCloudDialogflowV2beta1StreamingRecognitionResult> = Schema.suspend(() => Schema.Struct({
  messageType: Schema.optional(Schema.String),
  stability: Schema.optional(Schema.Number),
  isFinal: Schema.optional(Schema.Boolean),
  languageCode: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  speechWordInfo: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SpeechWordInfo)),
  dtmfDigits: Schema.optional(GoogleCloudDialogflowV2beta1TelephonyDtmfEvents),
  speechEndOffset: Schema.optional(Schema.String),
  transcript: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1StreamingRecognitionResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1StreamingRecognitionResult>;

export interface GoogleCloudDialogflowV2beta1ConversationEvent {
  newMessagePayload?: GoogleCloudDialogflowV2beta1Message;
  type?: "TYPE_UNSPECIFIED" | "CONVERSATION_STARTED" | "CONVERSATION_FINISHED" | "HUMAN_INTERVENTION_NEEDED" | "NEW_MESSAGE" | "NEW_RECOGNITION_RESULT" | "UNRECOVERABLE_ERROR" | (string & {});
  newRecognitionResultPayload?: GoogleCloudDialogflowV2beta1StreamingRecognitionResult;
  conversation?: string;
  errorStatus?: GoogleRpcStatus;
}

export const GoogleCloudDialogflowV2beta1ConversationEvent: Schema.Schema<GoogleCloudDialogflowV2beta1ConversationEvent> = Schema.suspend(() => Schema.Struct({
  newMessagePayload: Schema.optional(GoogleCloudDialogflowV2beta1Message),
  type: Schema.optional(Schema.String),
  newRecognitionResultPayload: Schema.optional(GoogleCloudDialogflowV2beta1StreamingRecognitionResult),
  conversation: Schema.optional(Schema.String),
  errorStatus: Schema.optional(GoogleRpcStatus),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ConversationEvent" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ConversationEvent>;

export interface GoogleCloudDialogflowCxV3beta1WebhookRequestSentimentAnalysisResult {
  score?: number;
  magnitude?: number;
}

export const GoogleCloudDialogflowCxV3beta1WebhookRequestSentimentAnalysisResult: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequestSentimentAnalysisResult> = Schema.suspend(() => Schema.Struct({
  score: Schema.optional(Schema.Number),
  magnitude: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1WebhookRequestSentimentAnalysisResult" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequestSentimentAnalysisResult>;

export interface GoogleCloudDialogflowCxV3Version {
  nluSettings?: GoogleCloudDialogflowCxV3NluSettings;
  displayName?: string;
  createTime?: string;
  name?: string;
  description?: string;
  state?: "STATE_UNSPECIFIED" | "RUNNING" | "SUCCEEDED" | "FAILED" | (string & {});
}

export const GoogleCloudDialogflowCxV3Version: Schema.Schema<GoogleCloudDialogflowCxV3Version> = Schema.suspend(() => Schema.Struct({
  nluSettings: Schema.optional(GoogleCloudDialogflowCxV3NluSettings),
  displayName: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3Version" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Version>;

export interface GoogleCloudDialogflowCxV3SessionInfo {
  session?: string;
  parameters?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3SessionInfo: Schema.Schema<GoogleCloudDialogflowCxV3SessionInfo> = Schema.suspend(() => Schema.Struct({
  session: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3SessionInfo" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SessionInfo>;

export interface GoogleCloudDialogflowV2ExportAgentResponse {
  agentContent?: string;
  agentUri?: string;
}

export const GoogleCloudDialogflowV2ExportAgentResponse: Schema.Schema<GoogleCloudDialogflowV2ExportAgentResponse> = Schema.suspend(() => Schema.Struct({
  agentContent: Schema.optional(Schema.String),
  agentUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2ExportAgentResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2ExportAgentResponse>;

export interface GoogleCloudDialogflowCxV3beta1RunContinuousTestResponse {
  continuousTestResult?: GoogleCloudDialogflowCxV3beta1ContinuousTestResult;
}

export const GoogleCloudDialogflowCxV3beta1RunContinuousTestResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1RunContinuousTestResponse> = Schema.suspend(() => Schema.Struct({
  continuousTestResult: Schema.optional(GoogleCloudDialogflowCxV3beta1ContinuousTestResult),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1RunContinuousTestResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1RunContinuousTestResponse>;

export interface GoogleCloudDialogflowCxV3beta1TestCaseResult {
  name?: string;
  environment?: string;
  conversationTurns?: Array<GoogleCloudDialogflowCxV3beta1ConversationTurn>;
  testTime?: string;
  testResult?: "TEST_RESULT_UNSPECIFIED" | "PASSED" | "FAILED" | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1TestCaseResult: Schema.Schema<GoogleCloudDialogflowCxV3beta1TestCaseResult> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  environment: Schema.optional(Schema.String),
  conversationTurns: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ConversationTurn)),
  testTime: Schema.optional(Schema.String),
  testResult: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1TestCaseResult" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TestCaseResult>;

export interface GoogleCloudDialogflowCxV3beta1RunTestCaseResponse {
  result?: GoogleCloudDialogflowCxV3beta1TestCaseResult;
}

export const GoogleCloudDialogflowCxV3beta1RunTestCaseResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1RunTestCaseResponse> = Schema.suspend(() => Schema.Struct({
  result: Schema.optional(GoogleCloudDialogflowCxV3beta1TestCaseResult),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1RunTestCaseResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1RunTestCaseResponse>;

export interface GoogleCloudDialogflowCxV3LanguageInfo {
  resolvedLanguageCode?: string;
  inputLanguageCode?: string;
  confidenceScore?: number;
}

export const GoogleCloudDialogflowCxV3LanguageInfo: Schema.Schema<GoogleCloudDialogflowCxV3LanguageInfo> = Schema.suspend(() => Schema.Struct({
  resolvedLanguageCode: Schema.optional(Schema.String),
  inputLanguageCode: Schema.optional(Schema.String),
  confidenceScore: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3LanguageInfo" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3LanguageInfo>;

export interface GoogleCloudDialogflowCxV3WebhookRequestFulfillmentInfo {
  tag?: string;
}

export const GoogleCloudDialogflowCxV3WebhookRequestFulfillmentInfo: Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequestFulfillmentInfo> = Schema.suspend(() => Schema.Struct({
  tag: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3WebhookRequestFulfillmentInfo" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequestFulfillmentInfo>;

export interface GoogleCloudDialogflowCxV3PageInfoFormInfo {
  parameterInfo?: Array<GoogleCloudDialogflowCxV3PageInfoFormInfoParameterInfo>;
}

export const GoogleCloudDialogflowCxV3PageInfoFormInfo: Schema.Schema<GoogleCloudDialogflowCxV3PageInfoFormInfo> = Schema.suspend(() => Schema.Struct({
  parameterInfo: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3PageInfoFormInfoParameterInfo)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3PageInfoFormInfo" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3PageInfoFormInfo>;

export interface GoogleCloudDialogflowCxV3PageInfo {
  displayName?: string;
  currentPage?: string;
  formInfo?: GoogleCloudDialogflowCxV3PageInfoFormInfo;
}

export const GoogleCloudDialogflowCxV3PageInfo: Schema.Schema<GoogleCloudDialogflowCxV3PageInfo> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  currentPage: Schema.optional(Schema.String),
  formInfo: Schema.optional(GoogleCloudDialogflowCxV3PageInfoFormInfo),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3PageInfo" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3PageInfo>;

export interface GoogleCloudDialogflowCxV3WebhookRequestSentimentAnalysisResult {
  score?: number;
  magnitude?: number;
}

export const GoogleCloudDialogflowCxV3WebhookRequestSentimentAnalysisResult: Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequestSentimentAnalysisResult> = Schema.suspend(() => Schema.Struct({
  score: Schema.optional(Schema.Number),
  magnitude: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3WebhookRequestSentimentAnalysisResult" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequestSentimentAnalysisResult>;

export interface GoogleCloudDialogflowCxV3WebhookRequest {
  transcript?: string;
  triggerEvent?: string;
  languageInfo?: GoogleCloudDialogflowCxV3LanguageInfo;
  fulfillmentInfo?: GoogleCloudDialogflowCxV3WebhookRequestFulfillmentInfo;
  intentInfo?: GoogleCloudDialogflowCxV3WebhookRequestIntentInfo;
  text?: string;
  pageInfo?: GoogleCloudDialogflowCxV3PageInfo;
  triggerIntent?: string;
  languageCode?: string;
  messages?: Array<GoogleCloudDialogflowCxV3ResponseMessage>;
  sentimentAnalysisResult?: GoogleCloudDialogflowCxV3WebhookRequestSentimentAnalysisResult;
  detectIntentResponseId?: string;
  payload?: Record<string, unknown>;
  sessionInfo?: GoogleCloudDialogflowCxV3SessionInfo;
  dtmfDigits?: string;
}

export const GoogleCloudDialogflowCxV3WebhookRequest: Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequest> = Schema.suspend(() => Schema.Struct({
  transcript: Schema.optional(Schema.String),
  triggerEvent: Schema.optional(Schema.String),
  languageInfo: Schema.optional(GoogleCloudDialogflowCxV3LanguageInfo),
  fulfillmentInfo: Schema.optional(GoogleCloudDialogflowCxV3WebhookRequestFulfillmentInfo),
  intentInfo: Schema.optional(GoogleCloudDialogflowCxV3WebhookRequestIntentInfo),
  text: Schema.optional(Schema.String),
  pageInfo: Schema.optional(GoogleCloudDialogflowCxV3PageInfo),
  triggerIntent: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  messages: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3ResponseMessage)),
  sentimentAnalysisResult: Schema.optional(GoogleCloudDialogflowCxV3WebhookRequestSentimentAnalysisResult),
  detectIntentResponseId: Schema.optional(Schema.String),
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  sessionInfo: Schema.optional(GoogleCloudDialogflowCxV3SessionInfo),
  dtmfDigits: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3WebhookRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequest>;

export interface GoogleCloudDialogflowCxV3ListDeploymentsResponse {
  deployments?: Array<GoogleCloudDialogflowCxV3Deployment>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListDeploymentsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListDeploymentsResponse> = Schema.suspend(() => Schema.Struct({
  deployments: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Deployment)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ListDeploymentsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListDeploymentsResponse>;

export interface GoogleCloudDialogflowV2DeleteConversationDatasetOperationMetadata {
}

export const GoogleCloudDialogflowV2DeleteConversationDatasetOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2DeleteConversationDatasetOperationMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowV2DeleteConversationDatasetOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2DeleteConversationDatasetOperationMetadata>;

export interface GoogleCloudDialogflowCxV3beta1InlineDestination {
  content?: string;
}

export const GoogleCloudDialogflowCxV3beta1InlineDestination: Schema.Schema<GoogleCloudDialogflowCxV3beta1InlineDestination> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1InlineDestination" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1InlineDestination>;

export interface GoogleCloudDialogflowCxV3beta1TestCase {
  lastTestResult?: GoogleCloudDialogflowCxV3beta1TestCaseResult;
  testConfig?: GoogleCloudDialogflowCxV3beta1TestConfig;
  tags?: Array<string>;
  displayName?: string;
  name?: string;
  testCaseConversationTurns?: Array<GoogleCloudDialogflowCxV3beta1ConversationTurn>;
  notes?: string;
  creationTime?: string;
}

export const GoogleCloudDialogflowCxV3beta1TestCase: Schema.Schema<GoogleCloudDialogflowCxV3beta1TestCase> = Schema.suspend(() => Schema.Struct({
  lastTestResult: Schema.optional(GoogleCloudDialogflowCxV3beta1TestCaseResult),
  testConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1TestConfig),
  tags: Schema.optional(Schema.Array(Schema.String)),
  displayName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  testCaseConversationTurns: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ConversationTurn)),
  notes: Schema.optional(Schema.String),
  creationTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1TestCase" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TestCase>;

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

export interface GoogleCloudDialogflowV2beta1EncryptionSpec {
  kmsKey?: string;
  name?: string;
}

export const GoogleCloudDialogflowV2beta1EncryptionSpec: Schema.Schema<GoogleCloudDialogflowV2beta1EncryptionSpec> = Schema.suspend(() => Schema.Struct({
  kmsKey: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1EncryptionSpec" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1EncryptionSpec>;

export interface GoogleCloudDialogflowCxV3ExportFlowResponse {
  flowContent?: string;
  flowUri?: string;
}

export const GoogleCloudDialogflowCxV3ExportFlowResponse: Schema.Schema<GoogleCloudDialogflowCxV3ExportFlowResponse> = Schema.suspend(() => Schema.Struct({
  flowContent: Schema.optional(Schema.String),
  flowUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ExportFlowResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportFlowResponse>;

export interface GoogleCloudDialogflowCxV3RestoreToolVersionResponse {
  tool?: GoogleCloudDialogflowCxV3Tool;
}

export const GoogleCloudDialogflowCxV3RestoreToolVersionResponse: Schema.Schema<GoogleCloudDialogflowCxV3RestoreToolVersionResponse> = Schema.suspend(() => Schema.Struct({
  tool: Schema.optional(GoogleCloudDialogflowCxV3Tool),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3RestoreToolVersionResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RestoreToolVersionResponse>;

export interface GoogleCloudDialogflowCxV3WebhookResponse {
  targetFlow?: string;
  payload?: Record<string, unknown>;
  fulfillmentResponse?: GoogleCloudDialogflowCxV3WebhookResponseFulfillmentResponse;
  pageInfo?: GoogleCloudDialogflowCxV3PageInfo;
  sessionInfo?: GoogleCloudDialogflowCxV3SessionInfo;
  targetPage?: string;
}

export const GoogleCloudDialogflowCxV3WebhookResponse: Schema.Schema<GoogleCloudDialogflowCxV3WebhookResponse> = Schema.suspend(() => Schema.Struct({
  targetFlow: Schema.optional(Schema.String),
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  fulfillmentResponse: Schema.optional(GoogleCloudDialogflowCxV3WebhookResponseFulfillmentResponse),
  pageInfo: Schema.optional(GoogleCloudDialogflowCxV3PageInfo),
  sessionInfo: Schema.optional(GoogleCloudDialogflowCxV3SessionInfo),
  targetPage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3WebhookResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookResponse>;

export interface GoogleCloudDialogflowV2beta1ImportDocumentsResponse {
  warnings?: Array<GoogleRpcStatus>;
}

export const GoogleCloudDialogflowV2beta1ImportDocumentsResponse: Schema.Schema<GoogleCloudDialogflowV2beta1ImportDocumentsResponse> = Schema.suspend(() => Schema.Struct({
  warnings: Schema.optional(Schema.Array(GoogleRpcStatus)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ImportDocumentsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ImportDocumentsResponse>;

export interface GoogleCloudDialogflowCxV3beta1ExportEntityTypesResponse {
  entityTypesContent?: GoogleCloudDialogflowCxV3beta1InlineDestination;
  entityTypesUri?: string;
}

export const GoogleCloudDialogflowCxV3beta1ExportEntityTypesResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportEntityTypesResponse> = Schema.suspend(() => Schema.Struct({
  entityTypesContent: Schema.optional(GoogleCloudDialogflowCxV3beta1InlineDestination),
  entityTypesUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExportEntityTypesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportEntityTypesResponse>;

export interface GoogleCloudDialogflowCxV3ExportIntentsRequest {
  dataFormat?: "DATA_FORMAT_UNSPECIFIED" | "BLOB" | "JSON" | "CSV" | (string & {});
  intentsUri?: string;
  intents?: Array<string>;
  intentsContentInline?: boolean;
}

export const GoogleCloudDialogflowCxV3ExportIntentsRequest: Schema.Schema<GoogleCloudDialogflowCxV3ExportIntentsRequest> = Schema.suspend(() => Schema.Struct({
  dataFormat: Schema.optional(Schema.String),
  intentsUri: Schema.optional(Schema.String),
  intents: Schema.optional(Schema.Array(Schema.String)),
  intentsContentInline: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ExportIntentsRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportIntentsRequest>;

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

export interface GoogleCloudDialogflowCxV3beta1ExportFlowResponse {
  flowUri?: string;
  flowContent?: string;
}

export const GoogleCloudDialogflowCxV3beta1ExportFlowResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportFlowResponse> = Schema.suspend(() => Schema.Struct({
  flowUri: Schema.optional(Schema.String),
  flowContent: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExportFlowResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportFlowResponse>;

export interface GoogleCloudDialogflowCxV3LoadVersionRequest {
  allowOverrideAgentResources?: boolean;
}

export const GoogleCloudDialogflowCxV3LoadVersionRequest: Schema.Schema<GoogleCloudDialogflowCxV3LoadVersionRequest> = Schema.suspend(() => Schema.Struct({
  allowOverrideAgentResources: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3LoadVersionRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3LoadVersionRequest>;

export interface GoogleCloudDialogflowCxV3RestoreAgentRequest {
  agentUri?: string;
  gitSource?: GoogleCloudDialogflowCxV3RestoreAgentRequestGitSource;
  restoreOption?: "RESTORE_OPTION_UNSPECIFIED" | "KEEP" | "FALLBACK" | (string & {});
  agentContent?: string;
}

export const GoogleCloudDialogflowCxV3RestoreAgentRequest: Schema.Schema<GoogleCloudDialogflowCxV3RestoreAgentRequest> = Schema.suspend(() => Schema.Struct({
  agentUri: Schema.optional(Schema.String),
  gitSource: Schema.optional(GoogleCloudDialogflowCxV3RestoreAgentRequestGitSource),
  restoreOption: Schema.optional(Schema.String),
  agentContent: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3RestoreAgentRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RestoreAgentRequest>;

export interface GoogleCloudDialogflowCxV3ImportTestCasesMetadata {
  errors?: Array<GoogleCloudDialogflowCxV3TestCaseError>;
}

export const GoogleCloudDialogflowCxV3ImportTestCasesMetadata: Schema.Schema<GoogleCloudDialogflowCxV3ImportTestCasesMetadata> = Schema.suspend(() => Schema.Struct({
  errors: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3TestCaseError)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ImportTestCasesMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportTestCasesMetadata>;

export interface GoogleCloudDialogflowCxV3beta1ExportIntentsResponse {
  intentsContent?: GoogleCloudDialogflowCxV3beta1InlineDestination;
  intentsUri?: string;
}

export const GoogleCloudDialogflowCxV3beta1ExportIntentsResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportIntentsResponse> = Schema.suspend(() => Schema.Struct({
  intentsContent: Schema.optional(GoogleCloudDialogflowCxV3beta1InlineDestination),
  intentsUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExportIntentsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportIntentsResponse>;

export interface GoogleCloudDialogflowCxV3beta1WebhookRequestFulfillmentInfo {
  tag?: string;
}

export const GoogleCloudDialogflowCxV3beta1WebhookRequestFulfillmentInfo: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequestFulfillmentInfo> = Schema.suspend(() => Schema.Struct({
  tag: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1WebhookRequestFulfillmentInfo" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequestFulfillmentInfo>;

export interface GoogleCloudDialogflowCxV3beta1LanguageInfo {
  inputLanguageCode?: string;
  confidenceScore?: number;
  resolvedLanguageCode?: string;
}

export const GoogleCloudDialogflowCxV3beta1LanguageInfo: Schema.Schema<GoogleCloudDialogflowCxV3beta1LanguageInfo> = Schema.suspend(() => Schema.Struct({
  inputLanguageCode: Schema.optional(Schema.String),
  confidenceScore: Schema.optional(Schema.Number),
  resolvedLanguageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1LanguageInfo" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1LanguageInfo>;

export interface GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfo {
  parameters?: Record<string, GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfoIntentParameterValue>;
  displayName?: string;
  lastMatchedIntent?: string;
  confidence?: number;
}

export const GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfo: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfo> = Schema.suspend(() => Schema.Struct({
  parameters: Schema.optional(Schema.Record(Schema.String, GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfoIntentParameterValue)),
  displayName: Schema.optional(Schema.String),
  lastMatchedIntent: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfo" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfo>;

export interface GoogleCloudDialogflowCxV3beta1WebhookRequest {
  payload?: Record<string, unknown>;
  dtmfDigits?: string;
  triggerIntent?: string;
  text?: string;
  languageCode?: string;
  sentimentAnalysisResult?: GoogleCloudDialogflowCxV3beta1WebhookRequestSentimentAnalysisResult;
  languageInfo?: GoogleCloudDialogflowCxV3beta1LanguageInfo;
  intentInfo?: GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfo;
  pageInfo?: GoogleCloudDialogflowCxV3beta1PageInfo;
  messages?: Array<GoogleCloudDialogflowCxV3beta1ResponseMessage>;
  sessionInfo?: GoogleCloudDialogflowCxV3beta1SessionInfo;
  fulfillmentInfo?: GoogleCloudDialogflowCxV3beta1WebhookRequestFulfillmentInfo;
  triggerEvent?: string;
  detectIntentResponseId?: string;
  transcript?: string;
}

export const GoogleCloudDialogflowCxV3beta1WebhookRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequest> = Schema.suspend(() => Schema.Struct({
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  dtmfDigits: Schema.optional(Schema.String),
  triggerIntent: Schema.optional(Schema.String),
  text: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  sentimentAnalysisResult: Schema.optional(GoogleCloudDialogflowCxV3beta1WebhookRequestSentimentAnalysisResult),
  languageInfo: Schema.optional(GoogleCloudDialogflowCxV3beta1LanguageInfo),
  intentInfo: Schema.optional(GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfo),
  pageInfo: Schema.optional(GoogleCloudDialogflowCxV3beta1PageInfo),
  messages: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1ResponseMessage)),
  sessionInfo: Schema.optional(GoogleCloudDialogflowCxV3beta1SessionInfo),
  fulfillmentInfo: Schema.optional(GoogleCloudDialogflowCxV3beta1WebhookRequestFulfillmentInfo),
  triggerEvent: Schema.optional(Schema.String),
  detectIntentResponseId: Schema.optional(Schema.String),
  transcript: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1WebhookRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequest>;

export interface GoogleCloudDialogflowCxV3FulfillIntentResponse {
  responseId?: string;
  queryResult?: GoogleCloudDialogflowCxV3QueryResult;
  outputAudioConfig?: GoogleCloudDialogflowCxV3OutputAudioConfig;
  outputAudio?: string;
}

export const GoogleCloudDialogflowCxV3FulfillIntentResponse: Schema.Schema<GoogleCloudDialogflowCxV3FulfillIntentResponse> = Schema.suspend(() => Schema.Struct({
  responseId: Schema.optional(Schema.String),
  queryResult: Schema.optional(GoogleCloudDialogflowCxV3QueryResult),
  outputAudioConfig: Schema.optional(GoogleCloudDialogflowCxV3OutputAudioConfig),
  outputAudio: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3FulfillIntentResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FulfillIntentResponse>;

export interface GoogleCloudDialogflowCxV3RestoreToolVersionRequest {
}

export const GoogleCloudDialogflowCxV3RestoreToolVersionRequest: Schema.Schema<GoogleCloudDialogflowCxV3RestoreToolVersionRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3RestoreToolVersionRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RestoreToolVersionRequest>;

export interface GoogleCloudDialogflowCxV3AgentPersonalizationSettings {
  defaultEndUserMetadata?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3AgentPersonalizationSettings: Schema.Schema<GoogleCloudDialogflowCxV3AgentPersonalizationSettings> = Schema.suspend(() => Schema.Struct({
  defaultEndUserMetadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3AgentPersonalizationSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AgentPersonalizationSettings>;

export interface GoogleCloudDialogflowCxV3ListExamplesResponse {
  nextPageToken?: string;
  examples?: Array<GoogleCloudDialogflowCxV3Example>;
}

export const GoogleCloudDialogflowCxV3ListExamplesResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListExamplesResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  examples: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Example)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ListExamplesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListExamplesResponse>;

export interface GoogleCloudDialogflowCxV3ListToolsResponse {
  tools?: Array<GoogleCloudDialogflowCxV3Tool>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListToolsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListToolsResponse> = Schema.suspend(() => Schema.Struct({
  tools: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Tool)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ListToolsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListToolsResponse>;

export interface GoogleCloudDialogflowCxV3beta1BatchRunTestCasesMetadata {
  errors?: Array<GoogleCloudDialogflowCxV3beta1TestError>;
}

export const GoogleCloudDialogflowCxV3beta1BatchRunTestCasesMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1BatchRunTestCasesMetadata> = Schema.suspend(() => Schema.Struct({
  errors: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1TestError)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1BatchRunTestCasesMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1BatchRunTestCasesMetadata>;

export interface GoogleCloudDialogflowCxV3ListIntentsResponse {
  nextPageToken?: string;
  intents?: Array<GoogleCloudDialogflowCxV3Intent>;
}

export const GoogleCloudDialogflowCxV3ListIntentsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListIntentsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  intents: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Intent)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ListIntentsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListIntentsResponse>;

export interface GoogleCloudDialogflowCxV3beta1ExportEntityTypesMetadata {
}

export const GoogleCloudDialogflowCxV3beta1ExportEntityTypesMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportEntityTypesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExportEntityTypesMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportEntityTypesMetadata>;

export interface GoogleCloudDialogflowCxV3ImportIntentsMetadata {
}

export const GoogleCloudDialogflowCxV3ImportIntentsMetadata: Schema.Schema<GoogleCloudDialogflowCxV3ImportIntentsMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ImportIntentsMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportIntentsMetadata>;

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

export interface GoogleCloudDialogflowV2beta1SetSuggestionFeatureConfigOperationMetadata {
  participantRole?: "ROLE_UNSPECIFIED" | "HUMAN_AGENT" | "AUTOMATED_AGENT" | "END_USER" | (string & {});
  createTime?: string;
  conversationProfile?: string;
  suggestionFeatureType?: "TYPE_UNSPECIFIED" | "ARTICLE_SUGGESTION" | "FAQ" | "SMART_REPLY" | "DIALOGFLOW_ASSIST" | "CONVERSATION_SUMMARIZATION" | "KNOWLEDGE_SEARCH" | "KNOWLEDGE_ASSIST" | (string & {});
}

export const GoogleCloudDialogflowV2beta1SetSuggestionFeatureConfigOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2beta1SetSuggestionFeatureConfigOperationMetadata> = Schema.suspend(() => Schema.Struct({
  participantRole: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  conversationProfile: Schema.optional(Schema.String),
  suggestionFeatureType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SetSuggestionFeatureConfigOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SetSuggestionFeatureConfigOperationMetadata>;

export interface GoogleCloudDialogflowCxV3AgentGenAppBuilderSettings {
  engine?: string;
}

export const GoogleCloudDialogflowCxV3AgentGenAppBuilderSettings: Schema.Schema<GoogleCloudDialogflowCxV3AgentGenAppBuilderSettings> = Schema.suspend(() => Schema.Struct({
  engine: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3AgentGenAppBuilderSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AgentGenAppBuilderSettings>;

export interface GoogleCloudDialogflowCxV3AgentAnswerFeedbackSettings {
  enableAnswerFeedback?: boolean;
}

export const GoogleCloudDialogflowCxV3AgentAnswerFeedbackSettings: Schema.Schema<GoogleCloudDialogflowCxV3AgentAnswerFeedbackSettings> = Schema.suspend(() => Schema.Struct({
  enableAnswerFeedback: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3AgentAnswerFeedbackSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AgentAnswerFeedbackSettings>;

export interface GoogleCloudDialogflowCxV3TextToSpeechSettings {
  synthesizeSpeechConfigs?: Record<string, GoogleCloudDialogflowCxV3SynthesizeSpeechConfig>;
}

export const GoogleCloudDialogflowCxV3TextToSpeechSettings: Schema.Schema<GoogleCloudDialogflowCxV3TextToSpeechSettings> = Schema.suspend(() => Schema.Struct({
  synthesizeSpeechConfigs: Schema.optional(Schema.Record(Schema.String, GoogleCloudDialogflowCxV3SynthesizeSpeechConfig)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3TextToSpeechSettings" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TextToSpeechSettings>;

export interface GoogleCloudDialogflowCxV3Agent {
  enableStackdriverLogging?: boolean;
  securitySettings?: string;
  displayName?: string;
  advancedSettings?: GoogleCloudDialogflowCxV3AdvancedSettings;
  enableSpellCorrection?: boolean;
  startFlow?: string;
  supportedLanguageCodes?: Array<string>;
  defaultLanguageCode?: string;
  timeZone?: string;
  startPlaybook?: string;
  satisfiesPzs?: boolean;
  speechToTextSettings?: GoogleCloudDialogflowCxV3SpeechToTextSettings;
  genAppBuilderSettings?: GoogleCloudDialogflowCxV3AgentGenAppBuilderSettings;
  answerFeedbackSettings?: GoogleCloudDialogflowCxV3AgentAnswerFeedbackSettings;
  satisfiesPzi?: boolean;
  textToSpeechSettings?: GoogleCloudDialogflowCxV3TextToSpeechSettings;
  avatarUri?: string;
  gitIntegrationSettings?: GoogleCloudDialogflowCxV3AgentGitIntegrationSettings;
  enableMultiLanguageTraining?: boolean;
  personalizationSettings?: GoogleCloudDialogflowCxV3AgentPersonalizationSettings;
  clientCertificateSettings?: GoogleCloudDialogflowCxV3AgentClientCertificateSettings;
  name?: string;
  locked?: boolean;
  description?: string;
}

export const GoogleCloudDialogflowCxV3Agent: Schema.Schema<GoogleCloudDialogflowCxV3Agent> = Schema.suspend(() => Schema.Struct({
  enableStackdriverLogging: Schema.optional(Schema.Boolean),
  securitySettings: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  advancedSettings: Schema.optional(GoogleCloudDialogflowCxV3AdvancedSettings),
  enableSpellCorrection: Schema.optional(Schema.Boolean),
  startFlow: Schema.optional(Schema.String),
  supportedLanguageCodes: Schema.optional(Schema.Array(Schema.String)),
  defaultLanguageCode: Schema.optional(Schema.String),
  timeZone: Schema.optional(Schema.String),
  startPlaybook: Schema.optional(Schema.String),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  speechToTextSettings: Schema.optional(GoogleCloudDialogflowCxV3SpeechToTextSettings),
  genAppBuilderSettings: Schema.optional(GoogleCloudDialogflowCxV3AgentGenAppBuilderSettings),
  answerFeedbackSettings: Schema.optional(GoogleCloudDialogflowCxV3AgentAnswerFeedbackSettings),
  satisfiesPzi: Schema.optional(Schema.Boolean),
  textToSpeechSettings: Schema.optional(GoogleCloudDialogflowCxV3TextToSpeechSettings),
  avatarUri: Schema.optional(Schema.String),
  gitIntegrationSettings: Schema.optional(GoogleCloudDialogflowCxV3AgentGitIntegrationSettings),
  enableMultiLanguageTraining: Schema.optional(Schema.Boolean),
  personalizationSettings: Schema.optional(GoogleCloudDialogflowCxV3AgentPersonalizationSettings),
  clientCertificateSettings: Schema.optional(GoogleCloudDialogflowCxV3AgentClientCertificateSettings),
  name: Schema.optional(Schema.String),
  locked: Schema.optional(Schema.Boolean),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3Agent" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Agent>;

export interface GoogleCloudDialogflowCxV3ExportAgentRequestGitDestination {
  commitMessage?: string;
  trackingBranch?: string;
}

export const GoogleCloudDialogflowCxV3ExportAgentRequestGitDestination: Schema.Schema<GoogleCloudDialogflowCxV3ExportAgentRequestGitDestination> = Schema.suspend(() => Schema.Struct({
  commitMessage: Schema.optional(Schema.String),
  trackingBranch: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ExportAgentRequestGitDestination" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportAgentRequestGitDestination>;

export interface GoogleCloudDialogflowV2beta1BatchUpdateIntentsResponse {
  intents?: Array<GoogleCloudDialogflowV2beta1Intent>;
}

export const GoogleCloudDialogflowV2beta1BatchUpdateIntentsResponse: Schema.Schema<GoogleCloudDialogflowV2beta1BatchUpdateIntentsResponse> = Schema.suspend(() => Schema.Struct({
  intents: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1Intent)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1BatchUpdateIntentsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1BatchUpdateIntentsResponse>;

export interface GoogleCloudDialogflowV2beta1ClearSuggestionFeatureConfigOperationMetadata {
  participantRole?: "ROLE_UNSPECIFIED" | "HUMAN_AGENT" | "AUTOMATED_AGENT" | "END_USER" | (string & {});
  suggestionFeatureType?: "TYPE_UNSPECIFIED" | "ARTICLE_SUGGESTION" | "FAQ" | "SMART_REPLY" | "DIALOGFLOW_ASSIST" | "CONVERSATION_SUMMARIZATION" | "KNOWLEDGE_SEARCH" | "KNOWLEDGE_ASSIST" | (string & {});
  conversationProfile?: string;
  createTime?: string;
}

export const GoogleCloudDialogflowV2beta1ClearSuggestionFeatureConfigOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2beta1ClearSuggestionFeatureConfigOperationMetadata> = Schema.suspend(() => Schema.Struct({
  participantRole: Schema.optional(Schema.String),
  suggestionFeatureType: Schema.optional(Schema.String),
  conversationProfile: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ClearSuggestionFeatureConfigOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ClearSuggestionFeatureConfigOperationMetadata>;

export interface GoogleCloudDialogflowCxV3RestorePlaybookVersionResponse {
  playbook?: GoogleCloudDialogflowCxV3Playbook;
}

export const GoogleCloudDialogflowCxV3RestorePlaybookVersionResponse: Schema.Schema<GoogleCloudDialogflowCxV3RestorePlaybookVersionResponse> = Schema.suspend(() => Schema.Struct({
  playbook: Schema.optional(GoogleCloudDialogflowCxV3Playbook),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3RestorePlaybookVersionResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RestorePlaybookVersionResponse>;

export interface GoogleCloudDialogflowCxV3ListEntityTypesResponse {
  entityTypes?: Array<GoogleCloudDialogflowCxV3EntityType>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListEntityTypesResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListEntityTypesResponse> = Schema.suspend(() => Schema.Struct({
  entityTypes: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3EntityType)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ListEntityTypesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListEntityTypesResponse>;

export interface GoogleCloudDialogflowV2ImportDocumentsResponse {
  warnings?: Array<GoogleRpcStatus>;
}

export const GoogleCloudDialogflowV2ImportDocumentsResponse: Schema.Schema<GoogleCloudDialogflowV2ImportDocumentsResponse> = Schema.suspend(() => Schema.Struct({
  warnings: Schema.optional(Schema.Array(GoogleRpcStatus)),
})).annotate({ identifier: "GoogleCloudDialogflowV2ImportDocumentsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2ImportDocumentsResponse>;

export interface GoogleCloudDialogflowV2KnowledgeOperationMetadata {
  doneTime?: string;
  exportOperationMetadata?: GoogleCloudDialogflowV2ExportOperationMetadata;
  state?: "STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "DONE" | (string & {});
  knowledgeBase?: string;
}

export const GoogleCloudDialogflowV2KnowledgeOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2KnowledgeOperationMetadata> = Schema.suspend(() => Schema.Struct({
  doneTime: Schema.optional(Schema.String),
  exportOperationMetadata: Schema.optional(GoogleCloudDialogflowV2ExportOperationMetadata),
  state: Schema.optional(Schema.String),
  knowledgeBase: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2KnowledgeOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2KnowledgeOperationMetadata>;

export interface GoogleCloudDialogflowCxV3AnswerFeedback {
  rating?: "RATING_UNSPECIFIED" | "THUMBS_UP" | "THUMBS_DOWN" | (string & {});
  ratingReason?: GoogleCloudDialogflowCxV3AnswerFeedbackRatingReason;
  customRating?: string;
}

export const GoogleCloudDialogflowCxV3AnswerFeedback: Schema.Schema<GoogleCloudDialogflowCxV3AnswerFeedback> = Schema.suspend(() => Schema.Struct({
  rating: Schema.optional(Schema.String),
  ratingReason: Schema.optional(GoogleCloudDialogflowCxV3AnswerFeedbackRatingReason),
  customRating: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3AnswerFeedback" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AnswerFeedback>;

export interface GoogleCloudDialogflowCxV3SubmitAnswerFeedbackRequest {
  responseId?: string;
  updateMask?: string;
  answerFeedback?: GoogleCloudDialogflowCxV3AnswerFeedback;
}

export const GoogleCloudDialogflowCxV3SubmitAnswerFeedbackRequest: Schema.Schema<GoogleCloudDialogflowCxV3SubmitAnswerFeedbackRequest> = Schema.suspend(() => Schema.Struct({
  responseId: Schema.optional(Schema.String),
  updateMask: Schema.optional(Schema.String),
  answerFeedback: Schema.optional(GoogleCloudDialogflowCxV3AnswerFeedback),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3SubmitAnswerFeedbackRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SubmitAnswerFeedbackRequest>;

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

export interface GoogleCloudDialogflowCxV3BatchRunTestCasesRequest {
  environment?: string;
  testCases?: Array<string>;
}

export const GoogleCloudDialogflowCxV3BatchRunTestCasesRequest: Schema.Schema<GoogleCloudDialogflowCxV3BatchRunTestCasesRequest> = Schema.suspend(() => Schema.Struct({
  environment: Schema.optional(Schema.String),
  testCases: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3BatchRunTestCasesRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3BatchRunTestCasesRequest>;

export interface GoogleCloudDialogflowCxV3ImportFlowResponse {
  flow?: string;
}

export const GoogleCloudDialogflowCxV3ImportFlowResponse: Schema.Schema<GoogleCloudDialogflowCxV3ImportFlowResponse> = Schema.suspend(() => Schema.Struct({
  flow: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ImportFlowResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportFlowResponse>;

export interface GoogleCloudDialogflowV2beta1InitializeEncryptionSpecRequest {
  encryptionSpec?: GoogleCloudDialogflowV2beta1EncryptionSpec;
}

export const GoogleCloudDialogflowV2beta1InitializeEncryptionSpecRequest: Schema.Schema<GoogleCloudDialogflowV2beta1InitializeEncryptionSpecRequest> = Schema.suspend(() => Schema.Struct({
  encryptionSpec: Schema.optional(GoogleCloudDialogflowV2beta1EncryptionSpec),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1InitializeEncryptionSpecRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1InitializeEncryptionSpecRequest>;

export interface GoogleCloudDialogflowCxV3beta1ExportAgentResponse {
  agentContent?: string;
  commitSha?: string;
  agentUri?: string;
}

export const GoogleCloudDialogflowCxV3beta1ExportAgentResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportAgentResponse> = Schema.suspend(() => Schema.Struct({
  agentContent: Schema.optional(Schema.String),
  commitSha: Schema.optional(Schema.String),
  agentUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ExportAgentResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportAgentResponse>;

export interface GoogleCloudDialogflowCxV3ImportFlowRequest {
  flowImportStrategy?: GoogleCloudDialogflowCxV3FlowImportStrategy;
  flowContent?: string;
  importOption?: "IMPORT_OPTION_UNSPECIFIED" | "KEEP" | "FALLBACK" | (string & {});
  flowUri?: string;
}

export const GoogleCloudDialogflowCxV3ImportFlowRequest: Schema.Schema<GoogleCloudDialogflowCxV3ImportFlowRequest> = Schema.suspend(() => Schema.Struct({
  flowImportStrategy: Schema.optional(GoogleCloudDialogflowCxV3FlowImportStrategy),
  flowContent: Schema.optional(Schema.String),
  importOption: Schema.optional(Schema.String),
  flowUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ImportFlowRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportFlowRequest>;

export interface GoogleCloudDialogflowCxV3ListEnvironmentsResponse {
  environments?: Array<GoogleCloudDialogflowCxV3Environment>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListEnvironmentsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListEnvironmentsResponse> = Schema.suspend(() => Schema.Struct({
  environments: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Environment)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ListEnvironmentsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListEnvironmentsResponse>;

export interface GoogleCloudDialogflowCxV3BatchRunTestCasesMetadata {
  errors?: Array<GoogleCloudDialogflowCxV3TestError>;
}

export const GoogleCloudDialogflowCxV3BatchRunTestCasesMetadata: Schema.Schema<GoogleCloudDialogflowCxV3BatchRunTestCasesMetadata> = Schema.suspend(() => Schema.Struct({
  errors: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3TestError)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3BatchRunTestCasesMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3BatchRunTestCasesMetadata>;

export interface GoogleCloudDialogflowCxV3ListTestCaseResultsResponse {
  testCaseResults?: Array<GoogleCloudDialogflowCxV3TestCaseResult>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListTestCaseResultsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListTestCaseResultsResponse> = Schema.suspend(() => Schema.Struct({
  testCaseResults: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3TestCaseResult)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ListTestCaseResultsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListTestCaseResultsResponse>;

export interface GoogleCloudDialogflowV2BatchUpdateIntentsResponse {
  intents?: Array<GoogleCloudDialogflowV2Intent>;
}

export const GoogleCloudDialogflowV2BatchUpdateIntentsResponse: Schema.Schema<GoogleCloudDialogflowV2BatchUpdateIntentsResponse> = Schema.suspend(() => Schema.Struct({
  intents: Schema.optional(Schema.Array(GoogleCloudDialogflowV2Intent)),
})).annotate({ identifier: "GoogleCloudDialogflowV2BatchUpdateIntentsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2BatchUpdateIntentsResponse>;

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

export interface GoogleCloudDialogflowCxV3BatchDeleteTestCasesRequest {
  names?: Array<string>;
}

export const GoogleCloudDialogflowCxV3BatchDeleteTestCasesRequest: Schema.Schema<GoogleCloudDialogflowCxV3BatchDeleteTestCasesRequest> = Schema.suspend(() => Schema.Struct({
  names: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3BatchDeleteTestCasesRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3BatchDeleteTestCasesRequest>;

export interface GoogleCloudDialogflowCxV3RunTestCaseResponse {
  result?: GoogleCloudDialogflowCxV3TestCaseResult;
}

export const GoogleCloudDialogflowCxV3RunTestCaseResponse: Schema.Schema<GoogleCloudDialogflowCxV3RunTestCaseResponse> = Schema.suspend(() => Schema.Struct({
  result: Schema.optional(GoogleCloudDialogflowCxV3TestCaseResult),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3RunTestCaseResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RunTestCaseResponse>;

export interface GoogleCloudDialogflowCxV3ExportPlaybookRequest {
  dataFormat?: "DATA_FORMAT_UNSPECIFIED" | "BLOB" | "JSON" | (string & {});
  playbookUri?: string;
}

export const GoogleCloudDialogflowCxV3ExportPlaybookRequest: Schema.Schema<GoogleCloudDialogflowCxV3ExportPlaybookRequest> = Schema.suspend(() => Schema.Struct({
  dataFormat: Schema.optional(Schema.String),
  playbookUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ExportPlaybookRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportPlaybookRequest>;

export interface GoogleCloudDialogflowCxV3ImportIntentsRequest {
  intentsContent?: GoogleCloudDialogflowCxV3InlineSource;
  intentsUri?: string;
  mergeOption?: "MERGE_OPTION_UNSPECIFIED" | "REJECT" | "REPLACE" | "MERGE" | "RENAME" | "REPORT_CONFLICT" | "KEEP" | (string & {});
}

export const GoogleCloudDialogflowCxV3ImportIntentsRequest: Schema.Schema<GoogleCloudDialogflowCxV3ImportIntentsRequest> = Schema.suspend(() => Schema.Struct({
  intentsContent: Schema.optional(GoogleCloudDialogflowCxV3InlineSource),
  intentsUri: Schema.optional(Schema.String),
  mergeOption: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ImportIntentsRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportIntentsRequest>;

export interface GoogleCloudDialogflowV2CreateConversationModelOperationMetadata {
  state?: "STATE_UNSPECIFIED" | "PENDING" | "SUCCEEDED" | "FAILED" | "CANCELLED" | "CANCELLING" | "TRAINING" | (string & {});
  conversationModel?: string;
  createTime?: string;
  doneTime?: string;
}

export const GoogleCloudDialogflowV2CreateConversationModelOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2CreateConversationModelOperationMetadata> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  conversationModel: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  doneTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2CreateConversationModelOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2CreateConversationModelOperationMetadata>;

export interface GoogleCloudDialogflowCxV3ListPlaybooksResponse {
  playbooks?: Array<GoogleCloudDialogflowCxV3Playbook>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListPlaybooksResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListPlaybooksResponse> = Schema.suspend(() => Schema.Struct({
  playbooks: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Playbook)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ListPlaybooksResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListPlaybooksResponse>;

export interface GoogleCloudDialogflowCxV3beta1RunContinuousTestMetadata {
  errors?: Array<GoogleCloudDialogflowCxV3beta1TestError>;
}

export const GoogleCloudDialogflowCxV3beta1RunContinuousTestMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1RunContinuousTestMetadata> = Schema.suspend(() => Schema.Struct({
  errors: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1TestError)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1RunContinuousTestMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1RunContinuousTestMetadata>;

export interface GoogleCloudDialogflowCxV3ListTestCasesResponse {
  testCases?: Array<GoogleCloudDialogflowCxV3TestCase>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListTestCasesResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListTestCasesResponse> = Schema.suspend(() => Schema.Struct({
  testCases: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3TestCase)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ListTestCasesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListTestCasesResponse>;

export interface GoogleCloudDialogflowCxV3ExportAgentRequest {
  gitDestination?: GoogleCloudDialogflowCxV3ExportAgentRequestGitDestination;
  includeBigqueryExportSettings?: boolean;
  agentUri?: string;
  dataFormat?: "DATA_FORMAT_UNSPECIFIED" | "BLOB" | "JSON_PACKAGE" | (string & {});
  environment?: string;
}

export const GoogleCloudDialogflowCxV3ExportAgentRequest: Schema.Schema<GoogleCloudDialogflowCxV3ExportAgentRequest> = Schema.suspend(() => Schema.Struct({
  gitDestination: Schema.optional(GoogleCloudDialogflowCxV3ExportAgentRequestGitDestination),
  includeBigqueryExportSettings: Schema.optional(Schema.Boolean),
  agentUri: Schema.optional(Schema.String),
  dataFormat: Schema.optional(Schema.String),
  environment: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ExportAgentRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportAgentRequest>;

export interface GoogleCloudDialogflowCxV3ExportFlowRequest {
  includeReferencedFlows?: boolean;
  flowUri?: string;
}

export const GoogleCloudDialogflowCxV3ExportFlowRequest: Schema.Schema<GoogleCloudDialogflowCxV3ExportFlowRequest> = Schema.suspend(() => Schema.Struct({
  includeReferencedFlows: Schema.optional(Schema.Boolean),
  flowUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ExportFlowRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportFlowRequest>;

export interface GoogleCloudDialogflowCxV3ListFlowsResponse {
  nextPageToken?: string;
  flows?: Array<GoogleCloudDialogflowCxV3Flow>;
}

export const GoogleCloudDialogflowCxV3ListFlowsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListFlowsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  flows: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Flow)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ListFlowsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListFlowsResponse>;

export interface GoogleCloudDialogflowCxV3RunContinuousTestRequest {
}

export const GoogleCloudDialogflowCxV3RunContinuousTestRequest: Schema.Schema<GoogleCloudDialogflowCxV3RunContinuousTestRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3RunContinuousTestRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RunContinuousTestRequest>;

export interface GoogleCloudDialogflowV2beta1InitializeEncryptionSpecMetadata {
  request?: GoogleCloudDialogflowV2beta1InitializeEncryptionSpecRequest;
}

export const GoogleCloudDialogflowV2beta1InitializeEncryptionSpecMetadata: Schema.Schema<GoogleCloudDialogflowV2beta1InitializeEncryptionSpecMetadata> = Schema.suspend(() => Schema.Struct({
  request: Schema.optional(GoogleCloudDialogflowV2beta1InitializeEncryptionSpecRequest),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1InitializeEncryptionSpecMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1InitializeEncryptionSpecMetadata>;

export interface GoogleCloudDialogflowCxV3ListVersionsResponse {
  versions?: Array<GoogleCloudDialogflowCxV3Version>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListVersionsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListVersionsResponse> = Schema.suspend(() => Schema.Struct({
  versions: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Version)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ListVersionsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListVersionsResponse>;

export interface GoogleCloudDialogflowCxV3beta1ImportFlowResponse {
  flow?: string;
}

export const GoogleCloudDialogflowCxV3beta1ImportFlowResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportFlowResponse> = Schema.suspend(() => Schema.Struct({
  flow: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ImportFlowResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportFlowResponse>;

export interface GoogleCloudDialogflowCxV3DeployFlowRequest {
  flowVersion?: string;
}

export const GoogleCloudDialogflowCxV3DeployFlowRequest: Schema.Schema<GoogleCloudDialogflowCxV3DeployFlowRequest> = Schema.suspend(() => Schema.Struct({
  flowVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3DeployFlowRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DeployFlowRequest>;

export interface GoogleCloudDialogflowCxV3ListContinuousTestResultsResponse {
  continuousTestResults?: Array<GoogleCloudDialogflowCxV3ContinuousTestResult>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListContinuousTestResultsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListContinuousTestResultsResponse> = Schema.suspend(() => Schema.Struct({
  continuousTestResults: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3ContinuousTestResult)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ListContinuousTestResultsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListContinuousTestResultsResponse>;

export interface GoogleCloudDialogflowCxV3ImportEntityTypesMetadata {
}

export const GoogleCloudDialogflowCxV3ImportEntityTypesMetadata: Schema.Schema<GoogleCloudDialogflowCxV3ImportEntityTypesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ImportEntityTypesMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportEntityTypesMetadata>;

export interface GoogleCloudDialogflowCxV3StopExperimentRequest {
}

export const GoogleCloudDialogflowCxV3StopExperimentRequest: Schema.Schema<GoogleCloudDialogflowCxV3StopExperimentRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3StopExperimentRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3StopExperimentRequest>;

export interface GoogleCloudDialogflowV2beta1ExportAgentResponse {
  agentUri?: string;
  agentContent?: string;
}

export const GoogleCloudDialogflowV2beta1ExportAgentResponse: Schema.Schema<GoogleCloudDialogflowV2beta1ExportAgentResponse> = Schema.suspend(() => Schema.Struct({
  agentUri: Schema.optional(Schema.String),
  agentContent: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ExportAgentResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ExportAgentResponse>;

export interface GoogleCloudDialogflowCxV3DeployFlowMetadata {
  testErrors?: Array<GoogleCloudDialogflowCxV3TestError>;
}

export const GoogleCloudDialogflowCxV3DeployFlowMetadata: Schema.Schema<GoogleCloudDialogflowCxV3DeployFlowMetadata> = Schema.suspend(() => Schema.Struct({
  testErrors: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3TestError)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3DeployFlowMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DeployFlowMetadata>;

export interface GoogleCloudDialogflowCxV3ListPagesResponse {
  pages?: Array<GoogleCloudDialogflowCxV3Page>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListPagesResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListPagesResponse> = Schema.suspend(() => Schema.Struct({
  pages: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Page)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ListPagesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListPagesResponse>;

export interface GoogleCloudDialogflowCxV3beta1BatchRunTestCasesResponse {
  results?: Array<GoogleCloudDialogflowCxV3beta1TestCaseResult>;
}

export const GoogleCloudDialogflowCxV3beta1BatchRunTestCasesResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1BatchRunTestCasesResponse> = Schema.suspend(() => Schema.Struct({
  results: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3beta1TestCaseResult)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1BatchRunTestCasesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1BatchRunTestCasesResponse>;

export interface GoogleCloudDialogflowCxV3ListWebhooksResponse {
  nextPageToken?: string;
  webhooks?: Array<GoogleCloudDialogflowCxV3Webhook>;
}

export const GoogleCloudDialogflowCxV3ListWebhooksResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListWebhooksResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  webhooks: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Webhook)),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ListWebhooksResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListWebhooksResponse>;

export interface GoogleCloudDialogflowCxV3ValidateFlowRequest {
  languageCode?: string;
}

export const GoogleCloudDialogflowCxV3ValidateFlowRequest: Schema.Schema<GoogleCloudDialogflowCxV3ValidateFlowRequest> = Schema.suspend(() => Schema.Struct({
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ValidateFlowRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ValidateFlowRequest>;

export interface GoogleCloudDialogflowCxV3ExportTestCasesMetadata {
}

export const GoogleCloudDialogflowCxV3ExportTestCasesMetadata: Schema.Schema<GoogleCloudDialogflowCxV3ExportTestCasesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ExportTestCasesMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportTestCasesMetadata>;

export interface GoogleProtobufEmpty {
}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleProtobufEmpty" }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface GoogleCloudDialogflowV2UndeployConversationModelOperationMetadata {
  createTime?: string;
  doneTime?: string;
  conversationModel?: string;
}

export const GoogleCloudDialogflowV2UndeployConversationModelOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2UndeployConversationModelOperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  doneTime: Schema.optional(Schema.String),
  conversationModel: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2UndeployConversationModelOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2UndeployConversationModelOperationMetadata>;

export interface GoogleCloudDialogflowCxV3AgentValidationResult {
  flowValidationResults?: Array<GoogleCloudDialogflowCxV3FlowValidationResult>;
  name?: string;
}

export const GoogleCloudDialogflowCxV3AgentValidationResult: Schema.Schema<GoogleCloudDialogflowCxV3AgentValidationResult> = Schema.suspend(() => Schema.Struct({
  flowValidationResults: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3FlowValidationResult)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3AgentValidationResult" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AgentValidationResult>;

export interface GoogleCloudDialogflowV2CreateConversationDatasetOperationMetadata {
  conversationDataset?: string;
}

export const GoogleCloudDialogflowV2CreateConversationDatasetOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2CreateConversationDatasetOperationMetadata> = Schema.suspend(() => Schema.Struct({
  conversationDataset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2CreateConversationDatasetOperationMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowV2CreateConversationDatasetOperationMetadata>;

export interface GoogleCloudDialogflowCxV3beta1ImportEntityTypesMetadata {
}

export const GoogleCloudDialogflowCxV3beta1ImportEntityTypesMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportEntityTypesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowCxV3beta1ImportEntityTypesMetadata" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportEntityTypesMetadata>;

export interface GoogleCloudDialogflowCxV3ListAgentsResponse {
  agents?: Array<GoogleCloudDialogflowCxV3Agent>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListAgentsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListAgentsResponse> = Schema.suspend(() => Schema.Struct({
  agents: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Agent)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ListAgentsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListAgentsResponse>;

export interface GoogleCloudDialogflowCxV3ListChangelogsResponse {
  changelogs?: Array<GoogleCloudDialogflowCxV3Changelog>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListChangelogsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListChangelogsResponse> = Schema.suspend(() => Schema.Struct({
  changelogs: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Changelog)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ListChangelogsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListChangelogsResponse>;

export interface GoogleCloudDialogflowV2beta1WebhookRequest {
  alternativeQueryResults?: Array<GoogleCloudDialogflowV2beta1QueryResult>;
  originalDetectIntentRequest?: GoogleCloudDialogflowV2beta1OriginalDetectIntentRequest;
  responseId?: string;
  session?: string;
  queryResult?: GoogleCloudDialogflowV2beta1QueryResult;
}

export const GoogleCloudDialogflowV2beta1WebhookRequest: Schema.Schema<GoogleCloudDialogflowV2beta1WebhookRequest> = Schema.suspend(() => Schema.Struct({
  alternativeQueryResults: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1QueryResult)),
  originalDetectIntentRequest: Schema.optional(GoogleCloudDialogflowV2beta1OriginalDetectIntentRequest),
  responseId: Schema.optional(Schema.String),
  session: Schema.optional(Schema.String),
  queryResult: Schema.optional(GoogleCloudDialogflowV2beta1QueryResult),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1WebhookRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1WebhookRequest>;

export interface GoogleCloudDialogflowCxV3ImportIntentsResponse {
  intents?: Array<string>;
  conflictingResources?: GoogleCloudDialogflowCxV3ImportIntentsResponseConflictingResources;
}

export const GoogleCloudDialogflowCxV3ImportIntentsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ImportIntentsResponse> = Schema.suspend(() => Schema.Struct({
  intents: Schema.optional(Schema.Array(Schema.String)),
  conflictingResources: Schema.optional(GoogleCloudDialogflowCxV3ImportIntentsResponseConflictingResources),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ImportIntentsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportIntentsResponse>;

export interface GoogleCloudDialogflowCxV3ValidateAgentRequest {
  languageCode?: string;
}

export const GoogleCloudDialogflowCxV3ValidateAgentRequest: Schema.Schema<GoogleCloudDialogflowCxV3ValidateAgentRequest> = Schema.suspend(() => Schema.Struct({
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowCxV3ValidateAgentRequest" }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ValidateAgentRequest>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListProjectsLocationsRequest {
  filter?: string;
  name: string;
  pageSize?: number;
  pageToken?: string;
  extraLocationTypes?: string[];
}

export const ListProjectsLocationsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = GoogleCloudLocationListLocationsResponse;
export const ListProjectsLocationsResponse = GoogleCloudLocationListLocationsResponse;

export type ListProjectsLocationsError = CommonErrors;

export const listProjectsLocations = API.makePaginated(() => ({
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
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}" }),
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

export interface CreateProjectsLocationsSecuritySettingsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3SecuritySettings;
}

export const CreateProjectsLocationsSecuritySettingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3SecuritySettings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/securitySettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsSecuritySettingsRequest>;

export type CreateProjectsLocationsSecuritySettingsResponse = GoogleCloudDialogflowCxV3SecuritySettings;
export const CreateProjectsLocationsSecuritySettingsResponse = GoogleCloudDialogflowCxV3SecuritySettings;

export type CreateProjectsLocationsSecuritySettingsError = CommonErrors;

export const createProjectsLocationsSecuritySettings: API.OperationMethod<CreateProjectsLocationsSecuritySettingsRequest, CreateProjectsLocationsSecuritySettingsResponse, CreateProjectsLocationsSecuritySettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsSecuritySettingsRequest,
  output: CreateProjectsLocationsSecuritySettingsResponse,
  errors: [],
}));

export interface ListProjectsLocationsSecuritySettingsRequest {
  pageToken?: string;
  parent: string;
  pageSize?: number;
}

export const ListProjectsLocationsSecuritySettingsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/securitySettings" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSecuritySettingsRequest>;

export type ListProjectsLocationsSecuritySettingsResponse = GoogleCloudDialogflowCxV3ListSecuritySettingsResponse;
export const ListProjectsLocationsSecuritySettingsResponse = GoogleCloudDialogflowCxV3ListSecuritySettingsResponse;

export type ListProjectsLocationsSecuritySettingsError = CommonErrors;

export const listProjectsLocationsSecuritySettings = API.makePaginated(() => ({
  input: ListProjectsLocationsSecuritySettingsRequest,
  output: ListProjectsLocationsSecuritySettingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsLocationsSecuritySettingsRequest {
  updateMask?: string;
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3SecuritySettings;
}

export const PatchProjectsLocationsSecuritySettingsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3SecuritySettings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/projects/{projectsId}/locations/{locationsId}/securitySettings/{securitySettingsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsSecuritySettingsRequest>;

export type PatchProjectsLocationsSecuritySettingsResponse = GoogleCloudDialogflowCxV3SecuritySettings;
export const PatchProjectsLocationsSecuritySettingsResponse = GoogleCloudDialogflowCxV3SecuritySettings;

export type PatchProjectsLocationsSecuritySettingsError = CommonErrors;

export const patchProjectsLocationsSecuritySettings: API.OperationMethod<PatchProjectsLocationsSecuritySettingsRequest, PatchProjectsLocationsSecuritySettingsResponse, PatchProjectsLocationsSecuritySettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsSecuritySettingsRequest,
  output: PatchProjectsLocationsSecuritySettingsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsSecuritySettingsRequest {
  name: string;
}

export const DeleteProjectsLocationsSecuritySettingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/locations/{locationsId}/securitySettings/{securitySettingsId}" }),
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

export interface GetProjectsLocationsSecuritySettingsRequest {
  name: string;
}

export const GetProjectsLocationsSecuritySettingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/securitySettings/{securitySettingsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsSecuritySettingsRequest>;

export type GetProjectsLocationsSecuritySettingsResponse = GoogleCloudDialogflowCxV3SecuritySettings;
export const GetProjectsLocationsSecuritySettingsResponse = GoogleCloudDialogflowCxV3SecuritySettings;

export type GetProjectsLocationsSecuritySettingsError = CommonErrors;

export const getProjectsLocationsSecuritySettings: API.OperationMethod<GetProjectsLocationsSecuritySettingsRequest, GetProjectsLocationsSecuritySettingsResponse, GetProjectsLocationsSecuritySettingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsSecuritySettingsRequest,
  output: GetProjectsLocationsSecuritySettingsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAgentsRequest {
  name: string;
}

export const GetProjectsLocationsAgentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsRequest>;

export type GetProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3Agent;
export const GetProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3Agent;

export type GetProjectsLocationsAgentsError = CommonErrors;

export const getProjectsLocationsAgents: API.OperationMethod<GetProjectsLocationsAgentsRequest, GetProjectsLocationsAgentsResponse, GetProjectsLocationsAgentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsRequest,
  output: GetProjectsLocationsAgentsResponse,
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
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/generativeSettings" }),
  svc,
) as unknown as Schema.Schema<GetGenerativeSettingsProjectsLocationsAgentsRequest>;

export type GetGenerativeSettingsProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3GenerativeSettings;
export const GetGenerativeSettingsProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3GenerativeSettings;

export type GetGenerativeSettingsProjectsLocationsAgentsError = CommonErrors;

export const getGenerativeSettingsProjectsLocationsAgents: API.OperationMethod<GetGenerativeSettingsProjectsLocationsAgentsRequest, GetGenerativeSettingsProjectsLocationsAgentsResponse, GetGenerativeSettingsProjectsLocationsAgentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetGenerativeSettingsProjectsLocationsAgentsRequest,
  output: GetGenerativeSettingsProjectsLocationsAgentsResponse,
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
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/validationResult" }),
  svc,
) as unknown as Schema.Schema<GetValidationResultProjectsLocationsAgentsRequest>;

export type GetValidationResultProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3AgentValidationResult;
export const GetValidationResultProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3AgentValidationResult;

export type GetValidationResultProjectsLocationsAgentsError = CommonErrors;

export const getValidationResultProjectsLocationsAgents: API.OperationMethod<GetValidationResultProjectsLocationsAgentsRequest, GetValidationResultProjectsLocationsAgentsResponse, GetValidationResultProjectsLocationsAgentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetValidationResultProjectsLocationsAgentsRequest,
  output: GetValidationResultProjectsLocationsAgentsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsRequest {
  updateMask?: string;
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Agent;
}

export const PatchProjectsLocationsAgentsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3Agent).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsRequest>;

export type PatchProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3Agent;
export const PatchProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3Agent;

export type PatchProjectsLocationsAgentsError = CommonErrors;

export const patchProjectsLocationsAgents: API.OperationMethod<PatchProjectsLocationsAgentsRequest, PatchProjectsLocationsAgentsResponse, PatchProjectsLocationsAgentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsRequest,
  output: PatchProjectsLocationsAgentsResponse,
  errors: [],
}));

export interface RestoreProjectsLocationsAgentsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3RestoreAgentRequest;
}

export const RestoreProjectsLocationsAgentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3RestoreAgentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}:restore", hasBody: true }),
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
  body?: GoogleCloudDialogflowCxV3ValidateAgentRequest;
}

export const ValidateProjectsLocationsAgentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3ValidateAgentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}:validate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ValidateProjectsLocationsAgentsRequest>;

export type ValidateProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3AgentValidationResult;
export const ValidateProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3AgentValidationResult;

export type ValidateProjectsLocationsAgentsError = CommonErrors;

export const validateProjectsLocationsAgents: API.OperationMethod<ValidateProjectsLocationsAgentsRequest, ValidateProjectsLocationsAgentsResponse, ValidateProjectsLocationsAgentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ValidateProjectsLocationsAgentsRequest,
  output: ValidateProjectsLocationsAgentsResponse,
  errors: [],
}));

export interface UpdateGenerativeSettingsProjectsLocationsAgentsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3GenerativeSettings;
}

export const UpdateGenerativeSettingsProjectsLocationsAgentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowCxV3GenerativeSettings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/generativeSettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateGenerativeSettingsProjectsLocationsAgentsRequest>;

export type UpdateGenerativeSettingsProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3GenerativeSettings;
export const UpdateGenerativeSettingsProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3GenerativeSettings;

export type UpdateGenerativeSettingsProjectsLocationsAgentsError = CommonErrors;

export const updateGenerativeSettingsProjectsLocationsAgents: API.OperationMethod<UpdateGenerativeSettingsProjectsLocationsAgentsRequest, UpdateGenerativeSettingsProjectsLocationsAgentsResponse, UpdateGenerativeSettingsProjectsLocationsAgentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateGenerativeSettingsProjectsLocationsAgentsRequest,
  output: UpdateGenerativeSettingsProjectsLocationsAgentsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsRequest {
  pageToken?: string;
  parent: string;
  pageSize?: number;
}

export const ListProjectsLocationsAgentsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsRequest>;

export type ListProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3ListAgentsResponse;
export const ListProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3ListAgentsResponse;

export type ListProjectsLocationsAgentsError = CommonErrors;

export const listProjectsLocationsAgents = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsRequest,
  output: ListProjectsLocationsAgentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsAgentsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Agent;
}

export const CreateProjectsLocationsAgentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3Agent).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsRequest>;

export type CreateProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3Agent;
export const CreateProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3Agent;

export type CreateProjectsLocationsAgentsError = CommonErrors;

export const createProjectsLocationsAgents: API.OperationMethod<CreateProjectsLocationsAgentsRequest, CreateProjectsLocationsAgentsResponse, CreateProjectsLocationsAgentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsRequest,
  output: CreateProjectsLocationsAgentsResponse,
  errors: [],
}));

export interface ExportProjectsLocationsAgentsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3ExportAgentRequest;
}

export const ExportProjectsLocationsAgentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3ExportAgentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}:export", hasBody: true }),
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

export interface DeleteProjectsLocationsAgentsRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}" }),
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

export interface CreateProjectsLocationsAgentsEnvironmentsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Environment;
}

export const CreateProjectsLocationsAgentsEnvironmentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3Environment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments", hasBody: true }),
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
  updateMask?: string;
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Environment;
}

export const PatchProjectsLocationsAgentsEnvironmentsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3Environment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}", hasBody: true }),
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

export interface ListProjectsLocationsAgentsEnvironmentsRequest {
  pageSize?: number;
  parent: string;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsEnvironmentsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsEnvironmentsRequest>;

export type ListProjectsLocationsAgentsEnvironmentsResponse = GoogleCloudDialogflowCxV3ListEnvironmentsResponse;
export const ListProjectsLocationsAgentsEnvironmentsResponse = GoogleCloudDialogflowCxV3ListEnvironmentsResponse;

export type ListProjectsLocationsAgentsEnvironmentsError = CommonErrors;

export const listProjectsLocationsAgentsEnvironments = API.makePaginated(() => ({
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
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsEnvironmentsRequest>;

export type GetProjectsLocationsAgentsEnvironmentsResponse = GoogleCloudDialogflowCxV3Environment;
export const GetProjectsLocationsAgentsEnvironmentsResponse = GoogleCloudDialogflowCxV3Environment;

export type GetProjectsLocationsAgentsEnvironmentsError = CommonErrors;

export const getProjectsLocationsAgentsEnvironments: API.OperationMethod<GetProjectsLocationsAgentsEnvironmentsRequest, GetProjectsLocationsAgentsEnvironmentsResponse, GetProjectsLocationsAgentsEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsEnvironmentsRequest,
  output: GetProjectsLocationsAgentsEnvironmentsResponse,
  errors: [],
}));

export interface RunContinuousTestProjectsLocationsAgentsEnvironmentsRequest {
  environment: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3RunContinuousTestRequest;
}

export const RunContinuousTestProjectsLocationsAgentsEnvironmentsRequest = Schema.Struct({
  environment: Schema.String.pipe(T.HttpPath("environment")),
  body: Schema.optional(GoogleCloudDialogflowCxV3RunContinuousTestRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}:runContinuousTest", hasBody: true }),
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

export interface DeleteProjectsLocationsAgentsEnvironmentsRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentsEnvironmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}" }),
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

export interface DeployFlowProjectsLocationsAgentsEnvironmentsRequest {
  environment: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3DeployFlowRequest;
}

export const DeployFlowProjectsLocationsAgentsEnvironmentsRequest = Schema.Struct({
  environment: Schema.String.pipe(T.HttpPath("environment")),
  body: Schema.optional(GoogleCloudDialogflowCxV3DeployFlowRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}:deployFlow", hasBody: true }),
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

export interface LookupEnvironmentHistoryProjectsLocationsAgentsEnvironmentsRequest {
  pageToken?: string;
  name: string;
  pageSize?: number;
}

export const LookupEnvironmentHistoryProjectsLocationsAgentsEnvironmentsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}:lookupEnvironmentHistory" }),
  svc,
) as unknown as Schema.Schema<LookupEnvironmentHistoryProjectsLocationsAgentsEnvironmentsRequest>;

export type LookupEnvironmentHistoryProjectsLocationsAgentsEnvironmentsResponse = GoogleCloudDialogflowCxV3LookupEnvironmentHistoryResponse;
export const LookupEnvironmentHistoryProjectsLocationsAgentsEnvironmentsResponse = GoogleCloudDialogflowCxV3LookupEnvironmentHistoryResponse;

export type LookupEnvironmentHistoryProjectsLocationsAgentsEnvironmentsError = CommonErrors;

export const lookupEnvironmentHistoryProjectsLocationsAgentsEnvironments = API.makePaginated(() => ({
  input: LookupEnvironmentHistoryProjectsLocationsAgentsEnvironmentsRequest,
  output: LookupEnvironmentHistoryProjectsLocationsAgentsEnvironmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListProjectsLocationsAgentsEnvironmentsDeploymentsRequest {
  pageToken?: string;
  pageSize?: number;
  parent: string;
}

export const ListProjectsLocationsAgentsEnvironmentsDeploymentsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/deployments" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsEnvironmentsDeploymentsRequest>;

export type ListProjectsLocationsAgentsEnvironmentsDeploymentsResponse = GoogleCloudDialogflowCxV3ListDeploymentsResponse;
export const ListProjectsLocationsAgentsEnvironmentsDeploymentsResponse = GoogleCloudDialogflowCxV3ListDeploymentsResponse;

export type ListProjectsLocationsAgentsEnvironmentsDeploymentsError = CommonErrors;

export const listProjectsLocationsAgentsEnvironmentsDeployments = API.makePaginated(() => ({
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
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/deployments/{deploymentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsEnvironmentsDeploymentsRequest>;

export type GetProjectsLocationsAgentsEnvironmentsDeploymentsResponse = GoogleCloudDialogflowCxV3Deployment;
export const GetProjectsLocationsAgentsEnvironmentsDeploymentsResponse = GoogleCloudDialogflowCxV3Deployment;

export type GetProjectsLocationsAgentsEnvironmentsDeploymentsError = CommonErrors;

export const getProjectsLocationsAgentsEnvironmentsDeployments: API.OperationMethod<GetProjectsLocationsAgentsEnvironmentsDeploymentsRequest, GetProjectsLocationsAgentsEnvironmentsDeploymentsResponse, GetProjectsLocationsAgentsEnvironmentsDeploymentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsEnvironmentsDeploymentsRequest,
  output: GetProjectsLocationsAgentsEnvironmentsDeploymentsResponse,
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
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/continuousTestResults" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsEnvironmentsContinuousTestResultsRequest>;

export type ListProjectsLocationsAgentsEnvironmentsContinuousTestResultsResponse = GoogleCloudDialogflowCxV3ListContinuousTestResultsResponse;
export const ListProjectsLocationsAgentsEnvironmentsContinuousTestResultsResponse = GoogleCloudDialogflowCxV3ListContinuousTestResultsResponse;

export type ListProjectsLocationsAgentsEnvironmentsContinuousTestResultsError = CommonErrors;

export const listProjectsLocationsAgentsEnvironmentsContinuousTestResults = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsEnvironmentsContinuousTestResultsRequest,
  output: ListProjectsLocationsAgentsEnvironmentsContinuousTestResultsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3DetectIntentRequest;
}

export const ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(GoogleCloudDialogflowCxV3DetectIntentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/sessions/{sessionsId}:serverStreamingDetectIntent", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest>;

export type ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsResponse = GoogleCloudDialogflowCxV3DetectIntentResponse;
export const ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsResponse = GoogleCloudDialogflowCxV3DetectIntentResponse;

export type ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsError = CommonErrors;

export const serverStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessions: API.OperationMethod<ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest, ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsResponse, ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest,
  output: ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsResponse,
  errors: [],
}));

export interface FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3FulfillIntentRequest;
}

export const FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(GoogleCloudDialogflowCxV3FulfillIntentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/sessions/{sessionsId}:fulfillIntent", hasBody: true }),
  svc,
) as unknown as Schema.Schema<FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsRequest>;

export type FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsResponse = GoogleCloudDialogflowCxV3FulfillIntentResponse;
export const FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsResponse = GoogleCloudDialogflowCxV3FulfillIntentResponse;

export type FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsError = CommonErrors;

export const fulfillIntentProjectsLocationsAgentsEnvironmentsSessions: API.OperationMethod<FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsRequest, FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsResponse, FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsRequest,
  output: FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsResponse,
  errors: [],
}));

export interface MatchIntentProjectsLocationsAgentsEnvironmentsSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3MatchIntentRequest;
}

export const MatchIntentProjectsLocationsAgentsEnvironmentsSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(GoogleCloudDialogflowCxV3MatchIntentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/sessions/{sessionsId}:matchIntent", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MatchIntentProjectsLocationsAgentsEnvironmentsSessionsRequest>;

export type MatchIntentProjectsLocationsAgentsEnvironmentsSessionsResponse = GoogleCloudDialogflowCxV3MatchIntentResponse;
export const MatchIntentProjectsLocationsAgentsEnvironmentsSessionsResponse = GoogleCloudDialogflowCxV3MatchIntentResponse;

export type MatchIntentProjectsLocationsAgentsEnvironmentsSessionsError = CommonErrors;

export const matchIntentProjectsLocationsAgentsEnvironmentsSessions: API.OperationMethod<MatchIntentProjectsLocationsAgentsEnvironmentsSessionsRequest, MatchIntentProjectsLocationsAgentsEnvironmentsSessionsResponse, MatchIntentProjectsLocationsAgentsEnvironmentsSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MatchIntentProjectsLocationsAgentsEnvironmentsSessionsRequest,
  output: MatchIntentProjectsLocationsAgentsEnvironmentsSessionsResponse,
  errors: [],
}));

export interface DetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3DetectIntentRequest;
}

export const DetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(GoogleCloudDialogflowCxV3DetectIntentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/sessions/{sessionsId}:detectIntent", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest>;

export type DetectIntentProjectsLocationsAgentsEnvironmentsSessionsResponse = GoogleCloudDialogflowCxV3DetectIntentResponse;
export const DetectIntentProjectsLocationsAgentsEnvironmentsSessionsResponse = GoogleCloudDialogflowCxV3DetectIntentResponse;

export type DetectIntentProjectsLocationsAgentsEnvironmentsSessionsError = CommonErrors;

export const detectIntentProjectsLocationsAgentsEnvironmentsSessions: API.OperationMethod<DetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest, DetectIntentProjectsLocationsAgentsEnvironmentsSessionsResponse, DetectIntentProjectsLocationsAgentsEnvironmentsSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest,
  output: DetectIntentProjectsLocationsAgentsEnvironmentsSessionsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest {
  name: string;
}

export const GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/sessions/{sessionsId}/entityTypes/{entityTypesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest>;

export type GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3SessionEntityType;
export const GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3SessionEntityType;

export type GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesError = CommonErrors;

export const getProjectsLocationsAgentsEnvironmentsSessionsEntityTypes: API.OperationMethod<GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest, GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse, GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest,
  output: GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest {
  updateMask?: string;
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3SessionEntityType;
}

export const PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3SessionEntityType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/sessions/{sessionsId}/entityTypes/{entityTypesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest>;

export type PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3SessionEntityType;
export const PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3SessionEntityType;

export type PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesError = CommonErrors;

export const patchProjectsLocationsAgentsEnvironmentsSessionsEntityTypes: API.OperationMethod<PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest, PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse, PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest,
  output: PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest {
  pageToken?: string;
  parent: string;
  pageSize?: number;
}

export const ListProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/sessions/{sessionsId}/entityTypes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest>;

export type ListProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3ListSessionEntityTypesResponse;
export const ListProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3ListSessionEntityTypesResponse;

export type ListProjectsLocationsAgentsEnvironmentsSessionsEntityTypesError = CommonErrors;

export const listProjectsLocationsAgentsEnvironmentsSessionsEntityTypes = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest,
  output: ListProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/sessions/{sessionsId}/entityTypes/{entityTypesId}" }),
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

export interface CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3SessionEntityType;
}

export const CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3SessionEntityType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/sessions/{sessionsId}/entityTypes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest>;

export type CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3SessionEntityType;
export const CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3SessionEntityType;

export type CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesError = CommonErrors;

export const createProjectsLocationsAgentsEnvironmentsSessionsEntityTypes: API.OperationMethod<CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest, CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse, CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest,
  output: CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsEnvironmentsExperimentsRequest {
  pageSize?: number;
  pageToken?: string;
  parent: string;
}

export const ListProjectsLocationsAgentsEnvironmentsExperimentsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/experiments" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsEnvironmentsExperimentsRequest>;

export type ListProjectsLocationsAgentsEnvironmentsExperimentsResponse = GoogleCloudDialogflowCxV3ListExperimentsResponse;
export const ListProjectsLocationsAgentsEnvironmentsExperimentsResponse = GoogleCloudDialogflowCxV3ListExperimentsResponse;

export type ListProjectsLocationsAgentsEnvironmentsExperimentsError = CommonErrors;

export const listProjectsLocationsAgentsEnvironmentsExperiments = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsEnvironmentsExperimentsRequest,
  output: ListProjectsLocationsAgentsEnvironmentsExperimentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface StopProjectsLocationsAgentsEnvironmentsExperimentsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3StopExperimentRequest;
}

export const StopProjectsLocationsAgentsEnvironmentsExperimentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3StopExperimentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/experiments/{experimentsId}:stop", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StopProjectsLocationsAgentsEnvironmentsExperimentsRequest>;

export type StopProjectsLocationsAgentsEnvironmentsExperimentsResponse = GoogleCloudDialogflowCxV3Experiment;
export const StopProjectsLocationsAgentsEnvironmentsExperimentsResponse = GoogleCloudDialogflowCxV3Experiment;

export type StopProjectsLocationsAgentsEnvironmentsExperimentsError = CommonErrors;

export const stopProjectsLocationsAgentsEnvironmentsExperiments: API.OperationMethod<StopProjectsLocationsAgentsEnvironmentsExperimentsRequest, StopProjectsLocationsAgentsEnvironmentsExperimentsResponse, StopProjectsLocationsAgentsEnvironmentsExperimentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StopProjectsLocationsAgentsEnvironmentsExperimentsRequest,
  output: StopProjectsLocationsAgentsEnvironmentsExperimentsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsEnvironmentsExperimentsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Experiment;
}

export const CreateProjectsLocationsAgentsEnvironmentsExperimentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3Experiment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/experiments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsEnvironmentsExperimentsRequest>;

export type CreateProjectsLocationsAgentsEnvironmentsExperimentsResponse = GoogleCloudDialogflowCxV3Experiment;
export const CreateProjectsLocationsAgentsEnvironmentsExperimentsResponse = GoogleCloudDialogflowCxV3Experiment;

export type CreateProjectsLocationsAgentsEnvironmentsExperimentsError = CommonErrors;

export const createProjectsLocationsAgentsEnvironmentsExperiments: API.OperationMethod<CreateProjectsLocationsAgentsEnvironmentsExperimentsRequest, CreateProjectsLocationsAgentsEnvironmentsExperimentsResponse, CreateProjectsLocationsAgentsEnvironmentsExperimentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsEnvironmentsExperimentsRequest,
  output: CreateProjectsLocationsAgentsEnvironmentsExperimentsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAgentsEnvironmentsExperimentsRequest {
  name: string;
}

export const GetProjectsLocationsAgentsEnvironmentsExperimentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/experiments/{experimentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsEnvironmentsExperimentsRequest>;

export type GetProjectsLocationsAgentsEnvironmentsExperimentsResponse = GoogleCloudDialogflowCxV3Experiment;
export const GetProjectsLocationsAgentsEnvironmentsExperimentsResponse = GoogleCloudDialogflowCxV3Experiment;

export type GetProjectsLocationsAgentsEnvironmentsExperimentsError = CommonErrors;

export const getProjectsLocationsAgentsEnvironmentsExperiments: API.OperationMethod<GetProjectsLocationsAgentsEnvironmentsExperimentsRequest, GetProjectsLocationsAgentsEnvironmentsExperimentsResponse, GetProjectsLocationsAgentsEnvironmentsExperimentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsEnvironmentsExperimentsRequest,
  output: GetProjectsLocationsAgentsEnvironmentsExperimentsResponse,
  errors: [],
}));

export interface StartProjectsLocationsAgentsEnvironmentsExperimentsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3StartExperimentRequest;
}

export const StartProjectsLocationsAgentsEnvironmentsExperimentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3StartExperimentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/experiments/{experimentsId}:start", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StartProjectsLocationsAgentsEnvironmentsExperimentsRequest>;

export type StartProjectsLocationsAgentsEnvironmentsExperimentsResponse = GoogleCloudDialogflowCxV3Experiment;
export const StartProjectsLocationsAgentsEnvironmentsExperimentsResponse = GoogleCloudDialogflowCxV3Experiment;

export type StartProjectsLocationsAgentsEnvironmentsExperimentsError = CommonErrors;

export const startProjectsLocationsAgentsEnvironmentsExperiments: API.OperationMethod<StartProjectsLocationsAgentsEnvironmentsExperimentsRequest, StartProjectsLocationsAgentsEnvironmentsExperimentsResponse, StartProjectsLocationsAgentsEnvironmentsExperimentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StartProjectsLocationsAgentsEnvironmentsExperimentsRequest,
  output: StartProjectsLocationsAgentsEnvironmentsExperimentsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsEnvironmentsExperimentsRequest {
  updateMask?: string;
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Experiment;
}

export const PatchProjectsLocationsAgentsEnvironmentsExperimentsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3Experiment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/experiments/{experimentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsEnvironmentsExperimentsRequest>;

export type PatchProjectsLocationsAgentsEnvironmentsExperimentsResponse = GoogleCloudDialogflowCxV3Experiment;
export const PatchProjectsLocationsAgentsEnvironmentsExperimentsResponse = GoogleCloudDialogflowCxV3Experiment;

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
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/experiments/{experimentsId}" }),
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

export interface GetProjectsLocationsAgentsToolsRequest {
  name: string;
}

export const GetProjectsLocationsAgentsToolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools/{toolsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsToolsRequest>;

export type GetProjectsLocationsAgentsToolsResponse = GoogleCloudDialogflowCxV3Tool;
export const GetProjectsLocationsAgentsToolsResponse = GoogleCloudDialogflowCxV3Tool;

export type GetProjectsLocationsAgentsToolsError = CommonErrors;

export const getProjectsLocationsAgentsTools: API.OperationMethod<GetProjectsLocationsAgentsToolsRequest, GetProjectsLocationsAgentsToolsResponse, GetProjectsLocationsAgentsToolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsToolsRequest,
  output: GetProjectsLocationsAgentsToolsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsToolsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Tool;
}

export const CreateProjectsLocationsAgentsToolsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3Tool).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsToolsRequest>;

export type CreateProjectsLocationsAgentsToolsResponse = GoogleCloudDialogflowCxV3Tool;
export const CreateProjectsLocationsAgentsToolsResponse = GoogleCloudDialogflowCxV3Tool;

export type CreateProjectsLocationsAgentsToolsError = CommonErrors;

export const createProjectsLocationsAgentsTools: API.OperationMethod<CreateProjectsLocationsAgentsToolsRequest, CreateProjectsLocationsAgentsToolsResponse, CreateProjectsLocationsAgentsToolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsToolsRequest,
  output: CreateProjectsLocationsAgentsToolsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsToolsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Tool;
}

export const PatchProjectsLocationsAgentsToolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowCxV3Tool).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools/{toolsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsToolsRequest>;

export type PatchProjectsLocationsAgentsToolsResponse = GoogleCloudDialogflowCxV3Tool;
export const PatchProjectsLocationsAgentsToolsResponse = GoogleCloudDialogflowCxV3Tool;

export type PatchProjectsLocationsAgentsToolsError = CommonErrors;

export const patchProjectsLocationsAgentsTools: API.OperationMethod<PatchProjectsLocationsAgentsToolsRequest, PatchProjectsLocationsAgentsToolsResponse, PatchProjectsLocationsAgentsToolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsToolsRequest,
  output: PatchProjectsLocationsAgentsToolsResponse,
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
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsToolsRequest>;

export type ListProjectsLocationsAgentsToolsResponse = GoogleCloudDialogflowCxV3ListToolsResponse;
export const ListProjectsLocationsAgentsToolsResponse = GoogleCloudDialogflowCxV3ListToolsResponse;

export type ListProjectsLocationsAgentsToolsError = CommonErrors;

export const listProjectsLocationsAgentsTools = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsToolsRequest,
  output: ListProjectsLocationsAgentsToolsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsAgentsToolsRequest {
  name: string;
  force?: boolean;
}

export const DeleteProjectsLocationsAgentsToolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools/{toolsId}" }),
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

export interface CreateProjectsLocationsAgentsToolsVersionsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3ToolVersion;
}

export const CreateProjectsLocationsAgentsToolsVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3ToolVersion).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools/{toolsId}/versions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsToolsVersionsRequest>;

export type CreateProjectsLocationsAgentsToolsVersionsResponse = GoogleCloudDialogflowCxV3ToolVersion;
export const CreateProjectsLocationsAgentsToolsVersionsResponse = GoogleCloudDialogflowCxV3ToolVersion;

export type CreateProjectsLocationsAgentsToolsVersionsError = CommonErrors;

export const createProjectsLocationsAgentsToolsVersions: API.OperationMethod<CreateProjectsLocationsAgentsToolsVersionsRequest, CreateProjectsLocationsAgentsToolsVersionsResponse, CreateProjectsLocationsAgentsToolsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsToolsVersionsRequest,
  output: CreateProjectsLocationsAgentsToolsVersionsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsToolsVersionsRequest {
  force?: boolean;
  name: string;
}

export const DeleteProjectsLocationsAgentsToolsVersionsRequest = Schema.Struct({
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools/{toolsId}/versions/{versionsId}" }),
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
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools/{toolsId}/versions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsToolsVersionsRequest>;

export type ListProjectsLocationsAgentsToolsVersionsResponse = GoogleCloudDialogflowCxV3ListToolVersionsResponse;
export const ListProjectsLocationsAgentsToolsVersionsResponse = GoogleCloudDialogflowCxV3ListToolVersionsResponse;

export type ListProjectsLocationsAgentsToolsVersionsError = CommonErrors;

export const listProjectsLocationsAgentsToolsVersions = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsToolsVersionsRequest,
  output: ListProjectsLocationsAgentsToolsVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentsToolsVersionsRequest {
  name: string;
}

export const GetProjectsLocationsAgentsToolsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools/{toolsId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsToolsVersionsRequest>;

export type GetProjectsLocationsAgentsToolsVersionsResponse = GoogleCloudDialogflowCxV3ToolVersion;
export const GetProjectsLocationsAgentsToolsVersionsResponse = GoogleCloudDialogflowCxV3ToolVersion;

export type GetProjectsLocationsAgentsToolsVersionsError = CommonErrors;

export const getProjectsLocationsAgentsToolsVersions: API.OperationMethod<GetProjectsLocationsAgentsToolsVersionsRequest, GetProjectsLocationsAgentsToolsVersionsResponse, GetProjectsLocationsAgentsToolsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsToolsVersionsRequest,
  output: GetProjectsLocationsAgentsToolsVersionsResponse,
  errors: [],
}));

export interface RestoreProjectsLocationsAgentsToolsVersionsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3RestoreToolVersionRequest;
}

export const RestoreProjectsLocationsAgentsToolsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3RestoreToolVersionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools/{toolsId}/versions/{versionsId}:restore", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RestoreProjectsLocationsAgentsToolsVersionsRequest>;

export type RestoreProjectsLocationsAgentsToolsVersionsResponse = GoogleCloudDialogflowCxV3RestoreToolVersionResponse;
export const RestoreProjectsLocationsAgentsToolsVersionsResponse = GoogleCloudDialogflowCxV3RestoreToolVersionResponse;

export type RestoreProjectsLocationsAgentsToolsVersionsError = CommonErrors;

export const restoreProjectsLocationsAgentsToolsVersions: API.OperationMethod<RestoreProjectsLocationsAgentsToolsVersionsRequest, RestoreProjectsLocationsAgentsToolsVersionsResponse, RestoreProjectsLocationsAgentsToolsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RestoreProjectsLocationsAgentsToolsVersionsRequest,
  output: RestoreProjectsLocationsAgentsToolsVersionsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAgentsEntityTypesRequest {
  languageCode?: string;
  name: string;
}

export const GetProjectsLocationsAgentsEntityTypesRequest = Schema.Struct({
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/entityTypes/{entityTypesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsEntityTypesRequest>;

export type GetProjectsLocationsAgentsEntityTypesResponse = GoogleCloudDialogflowCxV3EntityType;
export const GetProjectsLocationsAgentsEntityTypesResponse = GoogleCloudDialogflowCxV3EntityType;

export type GetProjectsLocationsAgentsEntityTypesError = CommonErrors;

export const getProjectsLocationsAgentsEntityTypes: API.OperationMethod<GetProjectsLocationsAgentsEntityTypesRequest, GetProjectsLocationsAgentsEntityTypesResponse, GetProjectsLocationsAgentsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsEntityTypesRequest,
  output: GetProjectsLocationsAgentsEntityTypesResponse,
  errors: [],
}));

export interface ExportProjectsLocationsAgentsEntityTypesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3ExportEntityTypesRequest;
}

export const ExportProjectsLocationsAgentsEntityTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3ExportEntityTypesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/entityTypes:export", hasBody: true }),
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

export interface ListProjectsLocationsAgentsEntityTypesRequest {
  languageCode?: string;
  parent: string;
  pageToken?: string;
  pageSize?: number;
}

export const ListProjectsLocationsAgentsEntityTypesRequest = Schema.Struct({
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/entityTypes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsEntityTypesRequest>;

export type ListProjectsLocationsAgentsEntityTypesResponse = GoogleCloudDialogflowCxV3ListEntityTypesResponse;
export const ListProjectsLocationsAgentsEntityTypesResponse = GoogleCloudDialogflowCxV3ListEntityTypesResponse;

export type ListProjectsLocationsAgentsEntityTypesError = CommonErrors;

export const listProjectsLocationsAgentsEntityTypes = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsEntityTypesRequest,
  output: ListProjectsLocationsAgentsEntityTypesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsLocationsAgentsEntityTypesRequest {
  updateMask?: string;
  name: string;
  languageCode?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3EntityType;
}

export const PatchProjectsLocationsAgentsEntityTypesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  body: Schema.optional(GoogleCloudDialogflowCxV3EntityType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/entityTypes/{entityTypesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsEntityTypesRequest>;

export type PatchProjectsLocationsAgentsEntityTypesResponse = GoogleCloudDialogflowCxV3EntityType;
export const PatchProjectsLocationsAgentsEntityTypesResponse = GoogleCloudDialogflowCxV3EntityType;

export type PatchProjectsLocationsAgentsEntityTypesError = CommonErrors;

export const patchProjectsLocationsAgentsEntityTypes: API.OperationMethod<PatchProjectsLocationsAgentsEntityTypesRequest, PatchProjectsLocationsAgentsEntityTypesResponse, PatchProjectsLocationsAgentsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsEntityTypesRequest,
  output: PatchProjectsLocationsAgentsEntityTypesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsEntityTypesRequest {
  languageCode?: string;
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3EntityType;
}

export const CreateProjectsLocationsAgentsEntityTypesRequest = Schema.Struct({
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3EntityType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/entityTypes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsEntityTypesRequest>;

export type CreateProjectsLocationsAgentsEntityTypesResponse = GoogleCloudDialogflowCxV3EntityType;
export const CreateProjectsLocationsAgentsEntityTypesResponse = GoogleCloudDialogflowCxV3EntityType;

export type CreateProjectsLocationsAgentsEntityTypesError = CommonErrors;

export const createProjectsLocationsAgentsEntityTypes: API.OperationMethod<CreateProjectsLocationsAgentsEntityTypesRequest, CreateProjectsLocationsAgentsEntityTypesResponse, CreateProjectsLocationsAgentsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsEntityTypesRequest,
  output: CreateProjectsLocationsAgentsEntityTypesResponse,
  errors: [],
}));

export interface ImportProjectsLocationsAgentsEntityTypesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3ImportEntityTypesRequest;
}

export const ImportProjectsLocationsAgentsEntityTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3ImportEntityTypesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/entityTypes:import", hasBody: true }),
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

export interface DeleteProjectsLocationsAgentsEntityTypesRequest {
  name: string;
  force?: boolean;
}

export const DeleteProjectsLocationsAgentsEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/entityTypes/{entityTypesId}" }),
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

export interface ListProjectsLocationsAgentsPlaybooksRequest {
  parent: string;
  pageToken?: string;
  pageSize?: number;
}

export const ListProjectsLocationsAgentsPlaybooksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsPlaybooksRequest>;

export type ListProjectsLocationsAgentsPlaybooksResponse = GoogleCloudDialogflowCxV3ListPlaybooksResponse;
export const ListProjectsLocationsAgentsPlaybooksResponse = GoogleCloudDialogflowCxV3ListPlaybooksResponse;

export type ListProjectsLocationsAgentsPlaybooksError = CommonErrors;

export const listProjectsLocationsAgentsPlaybooks = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsPlaybooksRequest,
  output: ListProjectsLocationsAgentsPlaybooksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsAgentsPlaybooksRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentsPlaybooksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}" }),
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

export interface ExportProjectsLocationsAgentsPlaybooksRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3ExportPlaybookRequest;
}

export const ExportProjectsLocationsAgentsPlaybooksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3ExportPlaybookRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}:export", hasBody: true }),
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

export interface PatchProjectsLocationsAgentsPlaybooksRequest {
  updateMask?: string;
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Playbook;
}

export const PatchProjectsLocationsAgentsPlaybooksRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3Playbook).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsPlaybooksRequest>;

export type PatchProjectsLocationsAgentsPlaybooksResponse = GoogleCloudDialogflowCxV3Playbook;
export const PatchProjectsLocationsAgentsPlaybooksResponse = GoogleCloudDialogflowCxV3Playbook;

export type PatchProjectsLocationsAgentsPlaybooksError = CommonErrors;

export const patchProjectsLocationsAgentsPlaybooks: API.OperationMethod<PatchProjectsLocationsAgentsPlaybooksRequest, PatchProjectsLocationsAgentsPlaybooksResponse, PatchProjectsLocationsAgentsPlaybooksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsPlaybooksRequest,
  output: PatchProjectsLocationsAgentsPlaybooksResponse,
  errors: [],
}));

export interface GetProjectsLocationsAgentsPlaybooksRequest {
  name: string;
}

export const GetProjectsLocationsAgentsPlaybooksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsPlaybooksRequest>;

export type GetProjectsLocationsAgentsPlaybooksResponse = GoogleCloudDialogflowCxV3Playbook;
export const GetProjectsLocationsAgentsPlaybooksResponse = GoogleCloudDialogflowCxV3Playbook;

export type GetProjectsLocationsAgentsPlaybooksError = CommonErrors;

export const getProjectsLocationsAgentsPlaybooks: API.OperationMethod<GetProjectsLocationsAgentsPlaybooksRequest, GetProjectsLocationsAgentsPlaybooksResponse, GetProjectsLocationsAgentsPlaybooksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsPlaybooksRequest,
  output: GetProjectsLocationsAgentsPlaybooksResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsPlaybooksRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Playbook;
}

export const CreateProjectsLocationsAgentsPlaybooksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3Playbook).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsPlaybooksRequest>;

export type CreateProjectsLocationsAgentsPlaybooksResponse = GoogleCloudDialogflowCxV3Playbook;
export const CreateProjectsLocationsAgentsPlaybooksResponse = GoogleCloudDialogflowCxV3Playbook;

export type CreateProjectsLocationsAgentsPlaybooksError = CommonErrors;

export const createProjectsLocationsAgentsPlaybooks: API.OperationMethod<CreateProjectsLocationsAgentsPlaybooksRequest, CreateProjectsLocationsAgentsPlaybooksResponse, CreateProjectsLocationsAgentsPlaybooksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsPlaybooksRequest,
  output: CreateProjectsLocationsAgentsPlaybooksResponse,
  errors: [],
}));

export interface ImportProjectsLocationsAgentsPlaybooksRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3ImportPlaybookRequest;
}

export const ImportProjectsLocationsAgentsPlaybooksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3ImportPlaybookRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks:import", hasBody: true }),
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

export interface GetProjectsLocationsAgentsPlaybooksExamplesRequest {
  name: string;
}

export const GetProjectsLocationsAgentsPlaybooksExamplesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/examples/{examplesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsPlaybooksExamplesRequest>;

export type GetProjectsLocationsAgentsPlaybooksExamplesResponse = GoogleCloudDialogflowCxV3Example;
export const GetProjectsLocationsAgentsPlaybooksExamplesResponse = GoogleCloudDialogflowCxV3Example;

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
  body?: GoogleCloudDialogflowCxV3Example;
}

export const PatchProjectsLocationsAgentsPlaybooksExamplesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowCxV3Example).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/examples/{examplesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsPlaybooksExamplesRequest>;

export type PatchProjectsLocationsAgentsPlaybooksExamplesResponse = GoogleCloudDialogflowCxV3Example;
export const PatchProjectsLocationsAgentsPlaybooksExamplesResponse = GoogleCloudDialogflowCxV3Example;

export type PatchProjectsLocationsAgentsPlaybooksExamplesError = CommonErrors;

export const patchProjectsLocationsAgentsPlaybooksExamples: API.OperationMethod<PatchProjectsLocationsAgentsPlaybooksExamplesRequest, PatchProjectsLocationsAgentsPlaybooksExamplesResponse, PatchProjectsLocationsAgentsPlaybooksExamplesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsPlaybooksExamplesRequest,
  output: PatchProjectsLocationsAgentsPlaybooksExamplesResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsPlaybooksExamplesRequest {
  pageSize?: number;
  pageToken?: string;
  languageCode?: string;
  parent: string;
}

export const ListProjectsLocationsAgentsPlaybooksExamplesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/examples" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsPlaybooksExamplesRequest>;

export type ListProjectsLocationsAgentsPlaybooksExamplesResponse = GoogleCloudDialogflowCxV3ListExamplesResponse;
export const ListProjectsLocationsAgentsPlaybooksExamplesResponse = GoogleCloudDialogflowCxV3ListExamplesResponse;

export type ListProjectsLocationsAgentsPlaybooksExamplesError = CommonErrors;

export const listProjectsLocationsAgentsPlaybooksExamples = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsPlaybooksExamplesRequest,
  output: ListProjectsLocationsAgentsPlaybooksExamplesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsAgentsPlaybooksExamplesRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentsPlaybooksExamplesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/examples/{examplesId}" }),
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

export interface CreateProjectsLocationsAgentsPlaybooksExamplesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Example;
}

export const CreateProjectsLocationsAgentsPlaybooksExamplesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3Example).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/examples", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsPlaybooksExamplesRequest>;

export type CreateProjectsLocationsAgentsPlaybooksExamplesResponse = GoogleCloudDialogflowCxV3Example;
export const CreateProjectsLocationsAgentsPlaybooksExamplesResponse = GoogleCloudDialogflowCxV3Example;

export type CreateProjectsLocationsAgentsPlaybooksExamplesError = CommonErrors;

export const createProjectsLocationsAgentsPlaybooksExamples: API.OperationMethod<CreateProjectsLocationsAgentsPlaybooksExamplesRequest, CreateProjectsLocationsAgentsPlaybooksExamplesResponse, CreateProjectsLocationsAgentsPlaybooksExamplesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsPlaybooksExamplesRequest,
  output: CreateProjectsLocationsAgentsPlaybooksExamplesResponse,
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
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/versions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsPlaybooksVersionsRequest>;

export type ListProjectsLocationsAgentsPlaybooksVersionsResponse = GoogleCloudDialogflowCxV3ListPlaybookVersionsResponse;
export const ListProjectsLocationsAgentsPlaybooksVersionsResponse = GoogleCloudDialogflowCxV3ListPlaybookVersionsResponse;

export type ListProjectsLocationsAgentsPlaybooksVersionsError = CommonErrors;

export const listProjectsLocationsAgentsPlaybooksVersions = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsPlaybooksVersionsRequest,
  output: ListProjectsLocationsAgentsPlaybooksVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsAgentsPlaybooksVersionsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3PlaybookVersion;
}

export const CreateProjectsLocationsAgentsPlaybooksVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3PlaybookVersion).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/versions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsPlaybooksVersionsRequest>;

export type CreateProjectsLocationsAgentsPlaybooksVersionsResponse = GoogleCloudDialogflowCxV3PlaybookVersion;
export const CreateProjectsLocationsAgentsPlaybooksVersionsResponse = GoogleCloudDialogflowCxV3PlaybookVersion;

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
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsPlaybooksVersionsRequest>;

export type GetProjectsLocationsAgentsPlaybooksVersionsResponse = GoogleCloudDialogflowCxV3PlaybookVersion;
export const GetProjectsLocationsAgentsPlaybooksVersionsResponse = GoogleCloudDialogflowCxV3PlaybookVersion;

export type GetProjectsLocationsAgentsPlaybooksVersionsError = CommonErrors;

export const getProjectsLocationsAgentsPlaybooksVersions: API.OperationMethod<GetProjectsLocationsAgentsPlaybooksVersionsRequest, GetProjectsLocationsAgentsPlaybooksVersionsResponse, GetProjectsLocationsAgentsPlaybooksVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsPlaybooksVersionsRequest,
  output: GetProjectsLocationsAgentsPlaybooksVersionsResponse,
  errors: [],
}));

export interface RestoreProjectsLocationsAgentsPlaybooksVersionsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3RestorePlaybookVersionRequest;
}

export const RestoreProjectsLocationsAgentsPlaybooksVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3RestorePlaybookVersionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/versions/{versionsId}:restore", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RestoreProjectsLocationsAgentsPlaybooksVersionsRequest>;

export type RestoreProjectsLocationsAgentsPlaybooksVersionsResponse = GoogleCloudDialogflowCxV3RestorePlaybookVersionResponse;
export const RestoreProjectsLocationsAgentsPlaybooksVersionsResponse = GoogleCloudDialogflowCxV3RestorePlaybookVersionResponse;

export type RestoreProjectsLocationsAgentsPlaybooksVersionsError = CommonErrors;

export const restoreProjectsLocationsAgentsPlaybooksVersions: API.OperationMethod<RestoreProjectsLocationsAgentsPlaybooksVersionsRequest, RestoreProjectsLocationsAgentsPlaybooksVersionsResponse, RestoreProjectsLocationsAgentsPlaybooksVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RestoreProjectsLocationsAgentsPlaybooksVersionsRequest,
  output: RestoreProjectsLocationsAgentsPlaybooksVersionsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsPlaybooksVersionsRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentsPlaybooksVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/versions/{versionsId}" }),
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

export interface CreateProjectsLocationsAgentsTransitionRouteGroupsRequest {
  languageCode?: string;
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3TransitionRouteGroup;
}

export const CreateProjectsLocationsAgentsTransitionRouteGroupsRequest = Schema.Struct({
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3TransitionRouteGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/transitionRouteGroups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsTransitionRouteGroupsRequest>;

export type CreateProjectsLocationsAgentsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3TransitionRouteGroup;
export const CreateProjectsLocationsAgentsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3TransitionRouteGroup;

export type CreateProjectsLocationsAgentsTransitionRouteGroupsError = CommonErrors;

export const createProjectsLocationsAgentsTransitionRouteGroups: API.OperationMethod<CreateProjectsLocationsAgentsTransitionRouteGroupsRequest, CreateProjectsLocationsAgentsTransitionRouteGroupsResponse, CreateProjectsLocationsAgentsTransitionRouteGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsTransitionRouteGroupsRequest,
  output: CreateProjectsLocationsAgentsTransitionRouteGroupsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAgentsTransitionRouteGroupsRequest {
  name: string;
  languageCode?: string;
}

export const GetProjectsLocationsAgentsTransitionRouteGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/transitionRouteGroups/{transitionRouteGroupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsTransitionRouteGroupsRequest>;

export type GetProjectsLocationsAgentsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3TransitionRouteGroup;
export const GetProjectsLocationsAgentsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3TransitionRouteGroup;

export type GetProjectsLocationsAgentsTransitionRouteGroupsError = CommonErrors;

export const getProjectsLocationsAgentsTransitionRouteGroups: API.OperationMethod<GetProjectsLocationsAgentsTransitionRouteGroupsRequest, GetProjectsLocationsAgentsTransitionRouteGroupsResponse, GetProjectsLocationsAgentsTransitionRouteGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsTransitionRouteGroupsRequest,
  output: GetProjectsLocationsAgentsTransitionRouteGroupsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsTransitionRouteGroupsRequest {
  languageCode?: string;
  updateMask?: string;
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3TransitionRouteGroup;
}

export const PatchProjectsLocationsAgentsTransitionRouteGroupsRequest = Schema.Struct({
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3TransitionRouteGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/transitionRouteGroups/{transitionRouteGroupsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsTransitionRouteGroupsRequest>;

export type PatchProjectsLocationsAgentsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3TransitionRouteGroup;
export const PatchProjectsLocationsAgentsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3TransitionRouteGroup;

export type PatchProjectsLocationsAgentsTransitionRouteGroupsError = CommonErrors;

export const patchProjectsLocationsAgentsTransitionRouteGroups: API.OperationMethod<PatchProjectsLocationsAgentsTransitionRouteGroupsRequest, PatchProjectsLocationsAgentsTransitionRouteGroupsResponse, PatchProjectsLocationsAgentsTransitionRouteGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsTransitionRouteGroupsRequest,
  output: PatchProjectsLocationsAgentsTransitionRouteGroupsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsTransitionRouteGroupsRequest {
  languageCode?: string;
  pageSize?: number;
  pageToken?: string;
  parent: string;
}

export const ListProjectsLocationsAgentsTransitionRouteGroupsRequest = Schema.Struct({
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/transitionRouteGroups" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsTransitionRouteGroupsRequest>;

export type ListProjectsLocationsAgentsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3ListTransitionRouteGroupsResponse;
export const ListProjectsLocationsAgentsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3ListTransitionRouteGroupsResponse;

export type ListProjectsLocationsAgentsTransitionRouteGroupsError = CommonErrors;

export const listProjectsLocationsAgentsTransitionRouteGroups = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsTransitionRouteGroupsRequest,
  output: ListProjectsLocationsAgentsTransitionRouteGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsAgentsTransitionRouteGroupsRequest {
  name: string;
  force?: boolean;
}

export const DeleteProjectsLocationsAgentsTransitionRouteGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/transitionRouteGroups/{transitionRouteGroupsId}" }),
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

export interface CreateProjectsLocationsAgentsGeneratorsRequest {
  parent: string;
  languageCode?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Generator;
}

export const CreateProjectsLocationsAgentsGeneratorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  body: Schema.optional(GoogleCloudDialogflowCxV3Generator).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/generators", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsGeneratorsRequest>;

export type CreateProjectsLocationsAgentsGeneratorsResponse = GoogleCloudDialogflowCxV3Generator;
export const CreateProjectsLocationsAgentsGeneratorsResponse = GoogleCloudDialogflowCxV3Generator;

export type CreateProjectsLocationsAgentsGeneratorsError = CommonErrors;

export const createProjectsLocationsAgentsGenerators: API.OperationMethod<CreateProjectsLocationsAgentsGeneratorsRequest, CreateProjectsLocationsAgentsGeneratorsResponse, CreateProjectsLocationsAgentsGeneratorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsGeneratorsRequest,
  output: CreateProjectsLocationsAgentsGeneratorsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsGeneratorsRequest {
  languageCode?: string;
  updateMask?: string;
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Generator;
}

export const PatchProjectsLocationsAgentsGeneratorsRequest = Schema.Struct({
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3Generator).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/generators/{generatorsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsGeneratorsRequest>;

export type PatchProjectsLocationsAgentsGeneratorsResponse = GoogleCloudDialogflowCxV3Generator;
export const PatchProjectsLocationsAgentsGeneratorsResponse = GoogleCloudDialogflowCxV3Generator;

export type PatchProjectsLocationsAgentsGeneratorsError = CommonErrors;

export const patchProjectsLocationsAgentsGenerators: API.OperationMethod<PatchProjectsLocationsAgentsGeneratorsRequest, PatchProjectsLocationsAgentsGeneratorsResponse, PatchProjectsLocationsAgentsGeneratorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsGeneratorsRequest,
  output: PatchProjectsLocationsAgentsGeneratorsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsGeneratorsRequest {
  pageSize?: number;
  parent: string;
  pageToken?: string;
  languageCode?: string;
}

export const ListProjectsLocationsAgentsGeneratorsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/generators" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsGeneratorsRequest>;

export type ListProjectsLocationsAgentsGeneratorsResponse = GoogleCloudDialogflowCxV3ListGeneratorsResponse;
export const ListProjectsLocationsAgentsGeneratorsResponse = GoogleCloudDialogflowCxV3ListGeneratorsResponse;

export type ListProjectsLocationsAgentsGeneratorsError = CommonErrors;

export const listProjectsLocationsAgentsGenerators = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsGeneratorsRequest,
  output: ListProjectsLocationsAgentsGeneratorsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsAgentsGeneratorsRequest {
  name: string;
  force?: boolean;
}

export const DeleteProjectsLocationsAgentsGeneratorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/generators/{generatorsId}" }),
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

export interface GetProjectsLocationsAgentsGeneratorsRequest {
  languageCode?: string;
  name: string;
}

export const GetProjectsLocationsAgentsGeneratorsRequest = Schema.Struct({
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/generators/{generatorsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsGeneratorsRequest>;

export type GetProjectsLocationsAgentsGeneratorsResponse = GoogleCloudDialogflowCxV3Generator;
export const GetProjectsLocationsAgentsGeneratorsResponse = GoogleCloudDialogflowCxV3Generator;

export type GetProjectsLocationsAgentsGeneratorsError = CommonErrors;

export const getProjectsLocationsAgentsGenerators: API.OperationMethod<GetProjectsLocationsAgentsGeneratorsRequest, GetProjectsLocationsAgentsGeneratorsResponse, GetProjectsLocationsAgentsGeneratorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsGeneratorsRequest,
  output: GetProjectsLocationsAgentsGeneratorsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAgentsIntentsRequest {
  name: string;
  languageCode?: string;
}

export const GetProjectsLocationsAgentsIntentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/intents/{intentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsIntentsRequest>;

export type GetProjectsLocationsAgentsIntentsResponse = GoogleCloudDialogflowCxV3Intent;
export const GetProjectsLocationsAgentsIntentsResponse = GoogleCloudDialogflowCxV3Intent;

export type GetProjectsLocationsAgentsIntentsError = CommonErrors;

export const getProjectsLocationsAgentsIntents: API.OperationMethod<GetProjectsLocationsAgentsIntentsRequest, GetProjectsLocationsAgentsIntentsResponse, GetProjectsLocationsAgentsIntentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsIntentsRequest,
  output: GetProjectsLocationsAgentsIntentsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsIntentsRequest {
  languageCode?: string;
  updateMask?: string;
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Intent;
}

export const PatchProjectsLocationsAgentsIntentsRequest = Schema.Struct({
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3Intent).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/intents/{intentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsIntentsRequest>;

export type PatchProjectsLocationsAgentsIntentsResponse = GoogleCloudDialogflowCxV3Intent;
export const PatchProjectsLocationsAgentsIntentsResponse = GoogleCloudDialogflowCxV3Intent;

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
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/intents/{intentsId}" }),
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

export interface ExportProjectsLocationsAgentsIntentsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3ExportIntentsRequest;
}

export const ExportProjectsLocationsAgentsIntentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3ExportIntentsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/intents:export", hasBody: true }),
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

export interface ListProjectsLocationsAgentsIntentsRequest {
  parent: string;
  languageCode?: string;
  intentView?: "INTENT_VIEW_UNSPECIFIED" | "INTENT_VIEW_PARTIAL" | "INTENT_VIEW_FULL" | (string & {});
  pageToken?: string;
  pageSize?: number;
}

export const ListProjectsLocationsAgentsIntentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  intentView: Schema.optional(Schema.String).pipe(T.HttpQuery("intentView")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/intents" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsIntentsRequest>;

export type ListProjectsLocationsAgentsIntentsResponse = GoogleCloudDialogflowCxV3ListIntentsResponse;
export const ListProjectsLocationsAgentsIntentsResponse = GoogleCloudDialogflowCxV3ListIntentsResponse;

export type ListProjectsLocationsAgentsIntentsError = CommonErrors;

export const listProjectsLocationsAgentsIntents = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsIntentsRequest,
  output: ListProjectsLocationsAgentsIntentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ImportProjectsLocationsAgentsIntentsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3ImportIntentsRequest;
}

export const ImportProjectsLocationsAgentsIntentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3ImportIntentsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/intents:import", hasBody: true }),
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

export interface CreateProjectsLocationsAgentsIntentsRequest {
  parent: string;
  languageCode?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Intent;
}

export const CreateProjectsLocationsAgentsIntentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  body: Schema.optional(GoogleCloudDialogflowCxV3Intent).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/intents", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsIntentsRequest>;

export type CreateProjectsLocationsAgentsIntentsResponse = GoogleCloudDialogflowCxV3Intent;
export const CreateProjectsLocationsAgentsIntentsResponse = GoogleCloudDialogflowCxV3Intent;

export type CreateProjectsLocationsAgentsIntentsError = CommonErrors;

export const createProjectsLocationsAgentsIntents: API.OperationMethod<CreateProjectsLocationsAgentsIntentsRequest, CreateProjectsLocationsAgentsIntentsResponse, CreateProjectsLocationsAgentsIntentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsIntentsRequest,
  output: CreateProjectsLocationsAgentsIntentsResponse,
  errors: [],
}));

export interface TrainProjectsLocationsAgentsFlowsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3TrainFlowRequest;
}

export const TrainProjectsLocationsAgentsFlowsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3TrainFlowRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}:train", hasBody: true }),
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

export interface ExportProjectsLocationsAgentsFlowsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3ExportFlowRequest;
}

export const ExportProjectsLocationsAgentsFlowsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3ExportFlowRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}:export", hasBody: true }),
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

export interface ListProjectsLocationsAgentsFlowsRequest {
  pageSize?: number;
  parent: string;
  pageToken?: string;
  languageCode?: string;
}

export const ListProjectsLocationsAgentsFlowsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsFlowsRequest>;

export type ListProjectsLocationsAgentsFlowsResponse = GoogleCloudDialogflowCxV3ListFlowsResponse;
export const ListProjectsLocationsAgentsFlowsResponse = GoogleCloudDialogflowCxV3ListFlowsResponse;

export type ListProjectsLocationsAgentsFlowsError = CommonErrors;

export const listProjectsLocationsAgentsFlows = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsFlowsRequest,
  output: ListProjectsLocationsAgentsFlowsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsAgentsFlowsRequest {
  force?: boolean;
  name: string;
}

export const DeleteProjectsLocationsAgentsFlowsRequest = Schema.Struct({
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}" }),
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

export interface GetValidationResultProjectsLocationsAgentsFlowsRequest {
  name: string;
  languageCode?: string;
}

export const GetValidationResultProjectsLocationsAgentsFlowsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/validationResult" }),
  svc,
) as unknown as Schema.Schema<GetValidationResultProjectsLocationsAgentsFlowsRequest>;

export type GetValidationResultProjectsLocationsAgentsFlowsResponse = GoogleCloudDialogflowCxV3FlowValidationResult;
export const GetValidationResultProjectsLocationsAgentsFlowsResponse = GoogleCloudDialogflowCxV3FlowValidationResult;

export type GetValidationResultProjectsLocationsAgentsFlowsError = CommonErrors;

export const getValidationResultProjectsLocationsAgentsFlows: API.OperationMethod<GetValidationResultProjectsLocationsAgentsFlowsRequest, GetValidationResultProjectsLocationsAgentsFlowsResponse, GetValidationResultProjectsLocationsAgentsFlowsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetValidationResultProjectsLocationsAgentsFlowsRequest,
  output: GetValidationResultProjectsLocationsAgentsFlowsResponse,
  errors: [],
}));

export interface ImportProjectsLocationsAgentsFlowsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3ImportFlowRequest;
}

export const ImportProjectsLocationsAgentsFlowsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3ImportFlowRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows:import", hasBody: true }),
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

export interface GetProjectsLocationsAgentsFlowsRequest {
  name: string;
  languageCode?: string;
}

export const GetProjectsLocationsAgentsFlowsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsFlowsRequest>;

export type GetProjectsLocationsAgentsFlowsResponse = GoogleCloudDialogflowCxV3Flow;
export const GetProjectsLocationsAgentsFlowsResponse = GoogleCloudDialogflowCxV3Flow;

export type GetProjectsLocationsAgentsFlowsError = CommonErrors;

export const getProjectsLocationsAgentsFlows: API.OperationMethod<GetProjectsLocationsAgentsFlowsRequest, GetProjectsLocationsAgentsFlowsResponse, GetProjectsLocationsAgentsFlowsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsFlowsRequest,
  output: GetProjectsLocationsAgentsFlowsResponse,
  errors: [],
}));

export interface ValidateProjectsLocationsAgentsFlowsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3ValidateFlowRequest;
}

export const ValidateProjectsLocationsAgentsFlowsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3ValidateFlowRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}:validate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ValidateProjectsLocationsAgentsFlowsRequest>;

export type ValidateProjectsLocationsAgentsFlowsResponse = GoogleCloudDialogflowCxV3FlowValidationResult;
export const ValidateProjectsLocationsAgentsFlowsResponse = GoogleCloudDialogflowCxV3FlowValidationResult;

export type ValidateProjectsLocationsAgentsFlowsError = CommonErrors;

export const validateProjectsLocationsAgentsFlows: API.OperationMethod<ValidateProjectsLocationsAgentsFlowsRequest, ValidateProjectsLocationsAgentsFlowsResponse, ValidateProjectsLocationsAgentsFlowsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ValidateProjectsLocationsAgentsFlowsRequest,
  output: ValidateProjectsLocationsAgentsFlowsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsFlowsRequest {
  parent: string;
  languageCode?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Flow;
}

export const CreateProjectsLocationsAgentsFlowsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  body: Schema.optional(GoogleCloudDialogflowCxV3Flow).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsFlowsRequest>;

export type CreateProjectsLocationsAgentsFlowsResponse = GoogleCloudDialogflowCxV3Flow;
export const CreateProjectsLocationsAgentsFlowsResponse = GoogleCloudDialogflowCxV3Flow;

export type CreateProjectsLocationsAgentsFlowsError = CommonErrors;

export const createProjectsLocationsAgentsFlows: API.OperationMethod<CreateProjectsLocationsAgentsFlowsRequest, CreateProjectsLocationsAgentsFlowsResponse, CreateProjectsLocationsAgentsFlowsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsFlowsRequest,
  output: CreateProjectsLocationsAgentsFlowsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsFlowsRequest {
  languageCode?: string;
  updateMask?: string;
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Flow;
}

export const PatchProjectsLocationsAgentsFlowsRequest = Schema.Struct({
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3Flow).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsFlowsRequest>;

export type PatchProjectsLocationsAgentsFlowsResponse = GoogleCloudDialogflowCxV3Flow;
export const PatchProjectsLocationsAgentsFlowsResponse = GoogleCloudDialogflowCxV3Flow;

export type PatchProjectsLocationsAgentsFlowsError = CommonErrors;

export const patchProjectsLocationsAgentsFlows: API.OperationMethod<PatchProjectsLocationsAgentsFlowsRequest, PatchProjectsLocationsAgentsFlowsResponse, PatchProjectsLocationsAgentsFlowsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsFlowsRequest,
  output: PatchProjectsLocationsAgentsFlowsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsFlowsVersionsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Version;
}

export const PatchProjectsLocationsAgentsFlowsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowCxV3Version).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/versions/{versionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsFlowsVersionsRequest>;

export type PatchProjectsLocationsAgentsFlowsVersionsResponse = GoogleCloudDialogflowCxV3Version;
export const PatchProjectsLocationsAgentsFlowsVersionsResponse = GoogleCloudDialogflowCxV3Version;

export type PatchProjectsLocationsAgentsFlowsVersionsError = CommonErrors;

export const patchProjectsLocationsAgentsFlowsVersions: API.OperationMethod<PatchProjectsLocationsAgentsFlowsVersionsRequest, PatchProjectsLocationsAgentsFlowsVersionsResponse, PatchProjectsLocationsAgentsFlowsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsFlowsVersionsRequest,
  output: PatchProjectsLocationsAgentsFlowsVersionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsFlowsVersionsRequest {
  pageSize?: number;
  pageToken?: string;
  parent: string;
}

export const ListProjectsLocationsAgentsFlowsVersionsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/versions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsFlowsVersionsRequest>;

export type ListProjectsLocationsAgentsFlowsVersionsResponse = GoogleCloudDialogflowCxV3ListVersionsResponse;
export const ListProjectsLocationsAgentsFlowsVersionsResponse = GoogleCloudDialogflowCxV3ListVersionsResponse;

export type ListProjectsLocationsAgentsFlowsVersionsError = CommonErrors;

export const listProjectsLocationsAgentsFlowsVersions = API.makePaginated(() => ({
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
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsFlowsVersionsRequest>;

export type GetProjectsLocationsAgentsFlowsVersionsResponse = GoogleCloudDialogflowCxV3Version;
export const GetProjectsLocationsAgentsFlowsVersionsResponse = GoogleCloudDialogflowCxV3Version;

export type GetProjectsLocationsAgentsFlowsVersionsError = CommonErrors;

export const getProjectsLocationsAgentsFlowsVersions: API.OperationMethod<GetProjectsLocationsAgentsFlowsVersionsRequest, GetProjectsLocationsAgentsFlowsVersionsResponse, GetProjectsLocationsAgentsFlowsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsFlowsVersionsRequest,
  output: GetProjectsLocationsAgentsFlowsVersionsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsFlowsVersionsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Version;
}

export const CreateProjectsLocationsAgentsFlowsVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3Version).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/versions", hasBody: true }),
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

export interface DeleteProjectsLocationsAgentsFlowsVersionsRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentsFlowsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/versions/{versionsId}" }),
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
  body?: GoogleCloudDialogflowCxV3LoadVersionRequest;
}

export const LoadProjectsLocationsAgentsFlowsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3LoadVersionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/versions/{versionsId}:load", hasBody: true }),
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
  body?: GoogleCloudDialogflowCxV3CompareVersionsRequest;
}

export const CompareVersionsProjectsLocationsAgentsFlowsVersionsRequest = Schema.Struct({
  baseVersion: Schema.String.pipe(T.HttpPath("baseVersion")),
  body: Schema.optional(GoogleCloudDialogflowCxV3CompareVersionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/versions/{versionsId}:compareVersions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CompareVersionsProjectsLocationsAgentsFlowsVersionsRequest>;

export type CompareVersionsProjectsLocationsAgentsFlowsVersionsResponse = GoogleCloudDialogflowCxV3CompareVersionsResponse;
export const CompareVersionsProjectsLocationsAgentsFlowsVersionsResponse = GoogleCloudDialogflowCxV3CompareVersionsResponse;

export type CompareVersionsProjectsLocationsAgentsFlowsVersionsError = CommonErrors;

export const compareVersionsProjectsLocationsAgentsFlowsVersions: API.OperationMethod<CompareVersionsProjectsLocationsAgentsFlowsVersionsRequest, CompareVersionsProjectsLocationsAgentsFlowsVersionsResponse, CompareVersionsProjectsLocationsAgentsFlowsVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CompareVersionsProjectsLocationsAgentsFlowsVersionsRequest,
  output: CompareVersionsProjectsLocationsAgentsFlowsVersionsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAgentsFlowsPagesRequest {
  languageCode?: string;
  name: string;
}

export const GetProjectsLocationsAgentsFlowsPagesRequest = Schema.Struct({
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/pages/{pagesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsFlowsPagesRequest>;

export type GetProjectsLocationsAgentsFlowsPagesResponse = GoogleCloudDialogflowCxV3Page;
export const GetProjectsLocationsAgentsFlowsPagesResponse = GoogleCloudDialogflowCxV3Page;

export type GetProjectsLocationsAgentsFlowsPagesError = CommonErrors;

export const getProjectsLocationsAgentsFlowsPages: API.OperationMethod<GetProjectsLocationsAgentsFlowsPagesRequest, GetProjectsLocationsAgentsFlowsPagesResponse, GetProjectsLocationsAgentsFlowsPagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsFlowsPagesRequest,
  output: GetProjectsLocationsAgentsFlowsPagesResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsFlowsPagesRequest {
  pageToken?: string;
  pageSize?: number;
  parent: string;
  languageCode?: string;
}

export const ListProjectsLocationsAgentsFlowsPagesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/pages" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsFlowsPagesRequest>;

export type ListProjectsLocationsAgentsFlowsPagesResponse = GoogleCloudDialogflowCxV3ListPagesResponse;
export const ListProjectsLocationsAgentsFlowsPagesResponse = GoogleCloudDialogflowCxV3ListPagesResponse;

export type ListProjectsLocationsAgentsFlowsPagesError = CommonErrors;

export const listProjectsLocationsAgentsFlowsPages = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsFlowsPagesRequest,
  output: ListProjectsLocationsAgentsFlowsPagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsLocationsAgentsFlowsPagesRequest {
  languageCode?: string;
  updateMask?: string;
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Page;
}

export const PatchProjectsLocationsAgentsFlowsPagesRequest = Schema.Struct({
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3Page).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/pages/{pagesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsFlowsPagesRequest>;

export type PatchProjectsLocationsAgentsFlowsPagesResponse = GoogleCloudDialogflowCxV3Page;
export const PatchProjectsLocationsAgentsFlowsPagesResponse = GoogleCloudDialogflowCxV3Page;

export type PatchProjectsLocationsAgentsFlowsPagesError = CommonErrors;

export const patchProjectsLocationsAgentsFlowsPages: API.OperationMethod<PatchProjectsLocationsAgentsFlowsPagesRequest, PatchProjectsLocationsAgentsFlowsPagesResponse, PatchProjectsLocationsAgentsFlowsPagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsFlowsPagesRequest,
  output: PatchProjectsLocationsAgentsFlowsPagesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsFlowsPagesRequest {
  parent: string;
  languageCode?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Page;
}

export const CreateProjectsLocationsAgentsFlowsPagesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  body: Schema.optional(GoogleCloudDialogflowCxV3Page).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/pages", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsFlowsPagesRequest>;

export type CreateProjectsLocationsAgentsFlowsPagesResponse = GoogleCloudDialogflowCxV3Page;
export const CreateProjectsLocationsAgentsFlowsPagesResponse = GoogleCloudDialogflowCxV3Page;

export type CreateProjectsLocationsAgentsFlowsPagesError = CommonErrors;

export const createProjectsLocationsAgentsFlowsPages: API.OperationMethod<CreateProjectsLocationsAgentsFlowsPagesRequest, CreateProjectsLocationsAgentsFlowsPagesResponse, CreateProjectsLocationsAgentsFlowsPagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsFlowsPagesRequest,
  output: CreateProjectsLocationsAgentsFlowsPagesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsFlowsPagesRequest {
  force?: boolean;
  name: string;
}

export const DeleteProjectsLocationsAgentsFlowsPagesRequest = Schema.Struct({
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/pages/{pagesId}" }),
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
  pageToken?: string;
  pageSize?: number;
  languageCode?: string;
  parent: string;
}

export const ListProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/transitionRouteGroups" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest>;

export type ListProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3ListTransitionRouteGroupsResponse;
export const ListProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3ListTransitionRouteGroupsResponse;

export type ListProjectsLocationsAgentsFlowsTransitionRouteGroupsError = CommonErrors;

export const listProjectsLocationsAgentsFlowsTransitionRouteGroups = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest,
  output: ListProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest {
  languageCode?: string;
  name: string;
}

export const GetProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest = Schema.Struct({
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/transitionRouteGroups/{transitionRouteGroupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest>;

export type GetProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3TransitionRouteGroup;
export const GetProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3TransitionRouteGroup;

export type GetProjectsLocationsAgentsFlowsTransitionRouteGroupsError = CommonErrors;

export const getProjectsLocationsAgentsFlowsTransitionRouteGroups: API.OperationMethod<GetProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest, GetProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse, GetProjectsLocationsAgentsFlowsTransitionRouteGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest,
  output: GetProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest {
  name: string;
  languageCode?: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3TransitionRouteGroup;
}

export const PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowCxV3TransitionRouteGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/transitionRouteGroups/{transitionRouteGroupsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest>;

export type PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3TransitionRouteGroup;
export const PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3TransitionRouteGroup;

export type PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsError = CommonErrors;

export const patchProjectsLocationsAgentsFlowsTransitionRouteGroups: API.OperationMethod<PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest, PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse, PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest,
  output: PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest {
  languageCode?: string;
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3TransitionRouteGroup;
}

export const CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest = Schema.Struct({
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3TransitionRouteGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/transitionRouteGroups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest>;

export type CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3TransitionRouteGroup;
export const CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse = GoogleCloudDialogflowCxV3TransitionRouteGroup;

export type CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsError = CommonErrors;

export const createProjectsLocationsAgentsFlowsTransitionRouteGroups: API.OperationMethod<CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest, CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse, CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest,
  output: CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse,
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
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/transitionRouteGroups/{transitionRouteGroupsId}" }),
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

export interface CreateProjectsLocationsAgentsWebhooksRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Webhook;
}

export const CreateProjectsLocationsAgentsWebhooksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3Webhook).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/webhooks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsWebhooksRequest>;

export type CreateProjectsLocationsAgentsWebhooksResponse = GoogleCloudDialogflowCxV3Webhook;
export const CreateProjectsLocationsAgentsWebhooksResponse = GoogleCloudDialogflowCxV3Webhook;

export type CreateProjectsLocationsAgentsWebhooksError = CommonErrors;

export const createProjectsLocationsAgentsWebhooks: API.OperationMethod<CreateProjectsLocationsAgentsWebhooksRequest, CreateProjectsLocationsAgentsWebhooksResponse, CreateProjectsLocationsAgentsWebhooksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsWebhooksRequest,
  output: CreateProjectsLocationsAgentsWebhooksResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsWebhooksRequest {
  pageToken?: string;
  pageSize?: number;
  parent: string;
}

export const ListProjectsLocationsAgentsWebhooksRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/webhooks" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsWebhooksRequest>;

export type ListProjectsLocationsAgentsWebhooksResponse = GoogleCloudDialogflowCxV3ListWebhooksResponse;
export const ListProjectsLocationsAgentsWebhooksResponse = GoogleCloudDialogflowCxV3ListWebhooksResponse;

export type ListProjectsLocationsAgentsWebhooksError = CommonErrors;

export const listProjectsLocationsAgentsWebhooks = API.makePaginated(() => ({
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
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/webhooks/{webhooksId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsWebhooksRequest>;

export type GetProjectsLocationsAgentsWebhooksResponse = GoogleCloudDialogflowCxV3Webhook;
export const GetProjectsLocationsAgentsWebhooksResponse = GoogleCloudDialogflowCxV3Webhook;

export type GetProjectsLocationsAgentsWebhooksError = CommonErrors;

export const getProjectsLocationsAgentsWebhooks: API.OperationMethod<GetProjectsLocationsAgentsWebhooksRequest, GetProjectsLocationsAgentsWebhooksResponse, GetProjectsLocationsAgentsWebhooksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsWebhooksRequest,
  output: GetProjectsLocationsAgentsWebhooksResponse,
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
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/webhooks/{webhooksId}" }),
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

export interface PatchProjectsLocationsAgentsWebhooksRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Webhook;
}

export const PatchProjectsLocationsAgentsWebhooksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowCxV3Webhook).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/webhooks/{webhooksId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsWebhooksRequest>;

export type PatchProjectsLocationsAgentsWebhooksResponse = GoogleCloudDialogflowCxV3Webhook;
export const PatchProjectsLocationsAgentsWebhooksResponse = GoogleCloudDialogflowCxV3Webhook;

export type PatchProjectsLocationsAgentsWebhooksError = CommonErrors;

export const patchProjectsLocationsAgentsWebhooks: API.OperationMethod<PatchProjectsLocationsAgentsWebhooksRequest, PatchProjectsLocationsAgentsWebhooksResponse, PatchProjectsLocationsAgentsWebhooksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsWebhooksRequest,
  output: PatchProjectsLocationsAgentsWebhooksResponse,
  errors: [],
}));

export interface DetectIntentProjectsLocationsAgentsSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3DetectIntentRequest;
}

export const DetectIntentProjectsLocationsAgentsSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(GoogleCloudDialogflowCxV3DetectIntentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}:detectIntent", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DetectIntentProjectsLocationsAgentsSessionsRequest>;

export type DetectIntentProjectsLocationsAgentsSessionsResponse = GoogleCloudDialogflowCxV3DetectIntentResponse;
export const DetectIntentProjectsLocationsAgentsSessionsResponse = GoogleCloudDialogflowCxV3DetectIntentResponse;

export type DetectIntentProjectsLocationsAgentsSessionsError = CommonErrors;

export const detectIntentProjectsLocationsAgentsSessions: API.OperationMethod<DetectIntentProjectsLocationsAgentsSessionsRequest, DetectIntentProjectsLocationsAgentsSessionsResponse, DetectIntentProjectsLocationsAgentsSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DetectIntentProjectsLocationsAgentsSessionsRequest,
  output: DetectIntentProjectsLocationsAgentsSessionsResponse,
  errors: [],
}));

export interface FulfillIntentProjectsLocationsAgentsSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3FulfillIntentRequest;
}

export const FulfillIntentProjectsLocationsAgentsSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(GoogleCloudDialogflowCxV3FulfillIntentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}:fulfillIntent", hasBody: true }),
  svc,
) as unknown as Schema.Schema<FulfillIntentProjectsLocationsAgentsSessionsRequest>;

export type FulfillIntentProjectsLocationsAgentsSessionsResponse = GoogleCloudDialogflowCxV3FulfillIntentResponse;
export const FulfillIntentProjectsLocationsAgentsSessionsResponse = GoogleCloudDialogflowCxV3FulfillIntentResponse;

export type FulfillIntentProjectsLocationsAgentsSessionsError = CommonErrors;

export const fulfillIntentProjectsLocationsAgentsSessions: API.OperationMethod<FulfillIntentProjectsLocationsAgentsSessionsRequest, FulfillIntentProjectsLocationsAgentsSessionsResponse, FulfillIntentProjectsLocationsAgentsSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FulfillIntentProjectsLocationsAgentsSessionsRequest,
  output: FulfillIntentProjectsLocationsAgentsSessionsResponse,
  errors: [],
}));

export interface SubmitAnswerFeedbackProjectsLocationsAgentsSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3SubmitAnswerFeedbackRequest;
}

export const SubmitAnswerFeedbackProjectsLocationsAgentsSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(GoogleCloudDialogflowCxV3SubmitAnswerFeedbackRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}:submitAnswerFeedback", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SubmitAnswerFeedbackProjectsLocationsAgentsSessionsRequest>;

export type SubmitAnswerFeedbackProjectsLocationsAgentsSessionsResponse = GoogleCloudDialogflowCxV3AnswerFeedback;
export const SubmitAnswerFeedbackProjectsLocationsAgentsSessionsResponse = GoogleCloudDialogflowCxV3AnswerFeedback;

export type SubmitAnswerFeedbackProjectsLocationsAgentsSessionsError = CommonErrors;

export const submitAnswerFeedbackProjectsLocationsAgentsSessions: API.OperationMethod<SubmitAnswerFeedbackProjectsLocationsAgentsSessionsRequest, SubmitAnswerFeedbackProjectsLocationsAgentsSessionsResponse, SubmitAnswerFeedbackProjectsLocationsAgentsSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SubmitAnswerFeedbackProjectsLocationsAgentsSessionsRequest,
  output: SubmitAnswerFeedbackProjectsLocationsAgentsSessionsResponse,
  errors: [],
}));

export interface ServerStreamingDetectIntentProjectsLocationsAgentsSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3DetectIntentRequest;
}

export const ServerStreamingDetectIntentProjectsLocationsAgentsSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(GoogleCloudDialogflowCxV3DetectIntentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}:serverStreamingDetectIntent", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ServerStreamingDetectIntentProjectsLocationsAgentsSessionsRequest>;

export type ServerStreamingDetectIntentProjectsLocationsAgentsSessionsResponse = GoogleCloudDialogflowCxV3DetectIntentResponse;
export const ServerStreamingDetectIntentProjectsLocationsAgentsSessionsResponse = GoogleCloudDialogflowCxV3DetectIntentResponse;

export type ServerStreamingDetectIntentProjectsLocationsAgentsSessionsError = CommonErrors;

export const serverStreamingDetectIntentProjectsLocationsAgentsSessions: API.OperationMethod<ServerStreamingDetectIntentProjectsLocationsAgentsSessionsRequest, ServerStreamingDetectIntentProjectsLocationsAgentsSessionsResponse, ServerStreamingDetectIntentProjectsLocationsAgentsSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ServerStreamingDetectIntentProjectsLocationsAgentsSessionsRequest,
  output: ServerStreamingDetectIntentProjectsLocationsAgentsSessionsResponse,
  errors: [],
}));

export interface MatchIntentProjectsLocationsAgentsSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3MatchIntentRequest;
}

export const MatchIntentProjectsLocationsAgentsSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(GoogleCloudDialogflowCxV3MatchIntentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}:matchIntent", hasBody: true }),
  svc,
) as unknown as Schema.Schema<MatchIntentProjectsLocationsAgentsSessionsRequest>;

export type MatchIntentProjectsLocationsAgentsSessionsResponse = GoogleCloudDialogflowCxV3MatchIntentResponse;
export const MatchIntentProjectsLocationsAgentsSessionsResponse = GoogleCloudDialogflowCxV3MatchIntentResponse;

export type MatchIntentProjectsLocationsAgentsSessionsError = CommonErrors;

export const matchIntentProjectsLocationsAgentsSessions: API.OperationMethod<MatchIntentProjectsLocationsAgentsSessionsRequest, MatchIntentProjectsLocationsAgentsSessionsResponse, MatchIntentProjectsLocationsAgentsSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: MatchIntentProjectsLocationsAgentsSessionsRequest,
  output: MatchIntentProjectsLocationsAgentsSessionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsSessionsEntityTypesRequest {
  pageSize?: number;
  parent: string;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsSessionsEntityTypesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}/entityTypes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsSessionsEntityTypesRequest>;

export type ListProjectsLocationsAgentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3ListSessionEntityTypesResponse;
export const ListProjectsLocationsAgentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3ListSessionEntityTypesResponse;

export type ListProjectsLocationsAgentsSessionsEntityTypesError = CommonErrors;

export const listProjectsLocationsAgentsSessionsEntityTypes = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsSessionsEntityTypesRequest,
  output: ListProjectsLocationsAgentsSessionsEntityTypesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsAgentsSessionsEntityTypesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3SessionEntityType;
}

export const CreateProjectsLocationsAgentsSessionsEntityTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3SessionEntityType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}/entityTypes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsSessionsEntityTypesRequest>;

export type CreateProjectsLocationsAgentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3SessionEntityType;
export const CreateProjectsLocationsAgentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3SessionEntityType;

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
  body?: GoogleCloudDialogflowCxV3SessionEntityType;
}

export const PatchProjectsLocationsAgentsSessionsEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowCxV3SessionEntityType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}/entityTypes/{entityTypesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsSessionsEntityTypesRequest>;

export type PatchProjectsLocationsAgentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3SessionEntityType;
export const PatchProjectsLocationsAgentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3SessionEntityType;

export type PatchProjectsLocationsAgentsSessionsEntityTypesError = CommonErrors;

export const patchProjectsLocationsAgentsSessionsEntityTypes: API.OperationMethod<PatchProjectsLocationsAgentsSessionsEntityTypesRequest, PatchProjectsLocationsAgentsSessionsEntityTypesResponse, PatchProjectsLocationsAgentsSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsSessionsEntityTypesRequest,
  output: PatchProjectsLocationsAgentsSessionsEntityTypesResponse,
  errors: [],
}));

export interface GetProjectsLocationsAgentsSessionsEntityTypesRequest {
  name: string;
}

export const GetProjectsLocationsAgentsSessionsEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}/entityTypes/{entityTypesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsSessionsEntityTypesRequest>;

export type GetProjectsLocationsAgentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3SessionEntityType;
export const GetProjectsLocationsAgentsSessionsEntityTypesResponse = GoogleCloudDialogflowCxV3SessionEntityType;

export type GetProjectsLocationsAgentsSessionsEntityTypesError = CommonErrors;

export const getProjectsLocationsAgentsSessionsEntityTypes: API.OperationMethod<GetProjectsLocationsAgentsSessionsEntityTypesRequest, GetProjectsLocationsAgentsSessionsEntityTypesResponse, GetProjectsLocationsAgentsSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsSessionsEntityTypesRequest,
  output: GetProjectsLocationsAgentsSessionsEntityTypesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsSessionsEntityTypesRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentsSessionsEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}/entityTypes/{entityTypesId}" }),
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

export interface RunProjectsLocationsAgentsTestCasesRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3RunTestCaseRequest;
}

export const RunProjectsLocationsAgentsTestCasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowCxV3RunTestCaseRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases/{testCasesId}:run", hasBody: true }),
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

export interface ExportProjectsLocationsAgentsTestCasesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3ExportTestCasesRequest;
}

export const ExportProjectsLocationsAgentsTestCasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3ExportTestCasesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases:export", hasBody: true }),
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

export interface ImportProjectsLocationsAgentsTestCasesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3ImportTestCasesRequest;
}

export const ImportProjectsLocationsAgentsTestCasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3ImportTestCasesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases:import", hasBody: true }),
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

export interface CalculateCoverageProjectsLocationsAgentsTestCasesRequest {
  agent: string;
  type?: "COVERAGE_TYPE_UNSPECIFIED" | "INTENT" | "PAGE_TRANSITION" | "TRANSITION_ROUTE_GROUP" | (string & {});
}

export const CalculateCoverageProjectsLocationsAgentsTestCasesRequest = Schema.Struct({
  agent: Schema.String.pipe(T.HttpPath("agent")),
  type: Schema.optional(Schema.String).pipe(T.HttpQuery("type")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases:calculateCoverage" }),
  svc,
) as unknown as Schema.Schema<CalculateCoverageProjectsLocationsAgentsTestCasesRequest>;

export type CalculateCoverageProjectsLocationsAgentsTestCasesResponse = GoogleCloudDialogflowCxV3CalculateCoverageResponse;
export const CalculateCoverageProjectsLocationsAgentsTestCasesResponse = GoogleCloudDialogflowCxV3CalculateCoverageResponse;

export type CalculateCoverageProjectsLocationsAgentsTestCasesError = CommonErrors;

export const calculateCoverageProjectsLocationsAgentsTestCases: API.OperationMethod<CalculateCoverageProjectsLocationsAgentsTestCasesRequest, CalculateCoverageProjectsLocationsAgentsTestCasesResponse, CalculateCoverageProjectsLocationsAgentsTestCasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CalculateCoverageProjectsLocationsAgentsTestCasesRequest,
  output: CalculateCoverageProjectsLocationsAgentsTestCasesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsTestCasesRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3TestCase;
}

export const PatchProjectsLocationsAgentsTestCasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowCxV3TestCase).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases/{testCasesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentsTestCasesRequest>;

export type PatchProjectsLocationsAgentsTestCasesResponse = GoogleCloudDialogflowCxV3TestCase;
export const PatchProjectsLocationsAgentsTestCasesResponse = GoogleCloudDialogflowCxV3TestCase;

export type PatchProjectsLocationsAgentsTestCasesError = CommonErrors;

export const patchProjectsLocationsAgentsTestCases: API.OperationMethod<PatchProjectsLocationsAgentsTestCasesRequest, PatchProjectsLocationsAgentsTestCasesResponse, PatchProjectsLocationsAgentsTestCasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentsTestCasesRequest,
  output: PatchProjectsLocationsAgentsTestCasesResponse,
  errors: [],
}));

export interface BatchRunProjectsLocationsAgentsTestCasesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3BatchRunTestCasesRequest;
}

export const BatchRunProjectsLocationsAgentsTestCasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3BatchRunTestCasesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases:batchRun", hasBody: true }),
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

export interface BatchDeleteProjectsLocationsAgentsTestCasesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3BatchDeleteTestCasesRequest;
}

export const BatchDeleteProjectsLocationsAgentsTestCasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3BatchDeleteTestCasesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases:batchDelete", hasBody: true }),
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
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases/{testCasesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsTestCasesRequest>;

export type GetProjectsLocationsAgentsTestCasesResponse = GoogleCloudDialogflowCxV3TestCase;
export const GetProjectsLocationsAgentsTestCasesResponse = GoogleCloudDialogflowCxV3TestCase;

export type GetProjectsLocationsAgentsTestCasesError = CommonErrors;

export const getProjectsLocationsAgentsTestCases: API.OperationMethod<GetProjectsLocationsAgentsTestCasesRequest, GetProjectsLocationsAgentsTestCasesResponse, GetProjectsLocationsAgentsTestCasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsTestCasesRequest,
  output: GetProjectsLocationsAgentsTestCasesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsTestCasesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3TestCase;
}

export const CreateProjectsLocationsAgentsTestCasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowCxV3TestCase).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentsTestCasesRequest>;

export type CreateProjectsLocationsAgentsTestCasesResponse = GoogleCloudDialogflowCxV3TestCase;
export const CreateProjectsLocationsAgentsTestCasesResponse = GoogleCloudDialogflowCxV3TestCase;

export type CreateProjectsLocationsAgentsTestCasesError = CommonErrors;

export const createProjectsLocationsAgentsTestCases: API.OperationMethod<CreateProjectsLocationsAgentsTestCasesRequest, CreateProjectsLocationsAgentsTestCasesResponse, CreateProjectsLocationsAgentsTestCasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentsTestCasesRequest,
  output: CreateProjectsLocationsAgentsTestCasesResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsTestCasesRequest {
  pageSize?: number;
  pageToken?: string;
  parent: string;
  view?: "TEST_CASE_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const ListProjectsLocationsAgentsTestCasesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsTestCasesRequest>;

export type ListProjectsLocationsAgentsTestCasesResponse = GoogleCloudDialogflowCxV3ListTestCasesResponse;
export const ListProjectsLocationsAgentsTestCasesResponse = GoogleCloudDialogflowCxV3ListTestCasesResponse;

export type ListProjectsLocationsAgentsTestCasesError = CommonErrors;

export const listProjectsLocationsAgentsTestCases = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsTestCasesRequest,
  output: ListProjectsLocationsAgentsTestCasesResponse,
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
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases/{testCasesId}/results/{resultsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsTestCasesResultsRequest>;

export type GetProjectsLocationsAgentsTestCasesResultsResponse = GoogleCloudDialogflowCxV3TestCaseResult;
export const GetProjectsLocationsAgentsTestCasesResultsResponse = GoogleCloudDialogflowCxV3TestCaseResult;

export type GetProjectsLocationsAgentsTestCasesResultsError = CommonErrors;

export const getProjectsLocationsAgentsTestCasesResults: API.OperationMethod<GetProjectsLocationsAgentsTestCasesResultsRequest, GetProjectsLocationsAgentsTestCasesResultsResponse, GetProjectsLocationsAgentsTestCasesResultsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsTestCasesResultsRequest,
  output: GetProjectsLocationsAgentsTestCasesResultsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsTestCasesResultsRequest {
  pageSize?: number;
  pageToken?: string;
  filter?: string;
  parent: string;
}

export const ListProjectsLocationsAgentsTestCasesResultsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases/{testCasesId}/results" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsTestCasesResultsRequest>;

export type ListProjectsLocationsAgentsTestCasesResultsResponse = GoogleCloudDialogflowCxV3ListTestCaseResultsResponse;
export const ListProjectsLocationsAgentsTestCasesResultsResponse = GoogleCloudDialogflowCxV3ListTestCaseResultsResponse;

export type ListProjectsLocationsAgentsTestCasesResultsError = CommonErrors;

export const listProjectsLocationsAgentsTestCasesResults = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsTestCasesResultsRequest,
  output: ListProjectsLocationsAgentsTestCasesResultsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListProjectsLocationsAgentsChangelogsRequest {
  filter?: string;
  parent: string;
  pageToken?: string;
  pageSize?: number;
}

export const ListProjectsLocationsAgentsChangelogsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/changelogs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentsChangelogsRequest>;

export type ListProjectsLocationsAgentsChangelogsResponse = GoogleCloudDialogflowCxV3ListChangelogsResponse;
export const ListProjectsLocationsAgentsChangelogsResponse = GoogleCloudDialogflowCxV3ListChangelogsResponse;

export type ListProjectsLocationsAgentsChangelogsError = CommonErrors;

export const listProjectsLocationsAgentsChangelogs = API.makePaginated(() => ({
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
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/changelogs/{changelogsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentsChangelogsRequest>;

export type GetProjectsLocationsAgentsChangelogsResponse = GoogleCloudDialogflowCxV3Changelog;
export const GetProjectsLocationsAgentsChangelogsResponse = GoogleCloudDialogflowCxV3Changelog;

export type GetProjectsLocationsAgentsChangelogsError = CommonErrors;

export const getProjectsLocationsAgentsChangelogs: API.OperationMethod<GetProjectsLocationsAgentsChangelogsRequest, GetProjectsLocationsAgentsChangelogsResponse, GetProjectsLocationsAgentsChangelogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentsChangelogsRequest,
  output: GetProjectsLocationsAgentsChangelogsResponse,
  errors: [],
}));

export interface ListProjectsLocationsOperationsRequest {
  returnPartialSuccess?: boolean;
  name: string;
  filter?: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = GoogleLongrunningListOperationsResponse;

export type ListProjectsLocationsOperationsError = CommonErrors;

export const listProjectsLocationsOperations = API.makePaginated(() => ({
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
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
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
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
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

export interface ListProjectsOperationsRequest {
  name: string;
  returnPartialSuccess?: boolean;
  filter?: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsOperationsRequest>;

export type ListProjectsOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListProjectsOperationsResponse = GoogleLongrunningListOperationsResponse;

export type ListProjectsOperationsError = CommonErrors;

export const listProjectsOperations = API.makePaginated(() => ({
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
  T.Http({ method: "GET", path: "v3/projects/{projectsId}/operations/{operationsId}" }),
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
  T.Http({ method: "POST", path: "v3/projects/{projectsId}/operations/{operationsId}:cancel", hasBody: true }),
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

