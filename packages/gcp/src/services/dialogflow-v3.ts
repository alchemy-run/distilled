// ==========================================================================
// Dialogflow API (dialogflow v3)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
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

export interface GoogleCloudDialogflowCxV3ResponseMessageText {
  text?: Array<string>;
  allowPlaybackInterruption?: boolean;
}

export const GoogleCloudDialogflowCxV3ResponseMessageText: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageText> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.Array(Schema.String)),
      allowPlaybackInterruption: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ResponseMessageText",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageText>;

export interface GoogleCloudDialogflowCxV3ResponseMessageConversationSuccess {
  metadata?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3ResponseMessageConversationSuccess: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageConversationSuccess> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ResponseMessageConversationSuccess",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageConversationSuccess>;

export interface GoogleCloudDialogflowCxV3ResponseMessageOutputAudioText {
  text?: string;
  ssml?: string;
  allowPlaybackInterruption?: boolean;
}

export const GoogleCloudDialogflowCxV3ResponseMessageOutputAudioText: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageOutputAudioText> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
      ssml: Schema.optional(Schema.String),
      allowPlaybackInterruption: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ResponseMessageOutputAudioText",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageOutputAudioText>;

export interface GoogleCloudDialogflowCxV3ResponseMessageLiveAgentHandoff {
  metadata?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3ResponseMessageLiveAgentHandoff: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageLiveAgentHandoff> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ResponseMessageLiveAgentHandoff",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageLiveAgentHandoff>;

export interface GoogleCloudDialogflowCxV3ResponseMessageEndInteraction {}

export const GoogleCloudDialogflowCxV3ResponseMessageEndInteraction: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageEndInteraction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudDialogflowCxV3ResponseMessageEndInteraction",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageEndInteraction>;

export interface GoogleCloudDialogflowCxV3ResponseMessagePlayAudio {
  audioUri?: string;
  allowPlaybackInterruption?: boolean;
}

export const GoogleCloudDialogflowCxV3ResponseMessagePlayAudio: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessagePlayAudio> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      audioUri: Schema.optional(Schema.String),
      allowPlaybackInterruption: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ResponseMessagePlayAudio",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessagePlayAudio>;

export interface GoogleCloudDialogflowCxV3ResponseMessageMixedAudioSegment {
  audio?: string;
  uri?: string;
  allowPlaybackInterruption?: boolean;
}

export const GoogleCloudDialogflowCxV3ResponseMessageMixedAudioSegment: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageMixedAudioSegment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      audio: Schema.optional(Schema.String),
      uri: Schema.optional(Schema.String),
      allowPlaybackInterruption: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ResponseMessageMixedAudioSegment",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageMixedAudioSegment>;

export interface GoogleCloudDialogflowCxV3ResponseMessageMixedAudio {
  segments?: Array<GoogleCloudDialogflowCxV3ResponseMessageMixedAudioSegment>;
}

export const GoogleCloudDialogflowCxV3ResponseMessageMixedAudio: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageMixedAudio> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      segments: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3ResponseMessageMixedAudioSegment),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ResponseMessageMixedAudio",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageMixedAudio>;

export interface GoogleCloudDialogflowCxV3ResponseMessageTelephonyTransferCall {
  phoneNumber?: string;
}

export const GoogleCloudDialogflowCxV3ResponseMessageTelephonyTransferCall: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageTelephonyTransferCall> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      phoneNumber: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ResponseMessageTelephonyTransferCall",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageTelephonyTransferCall>;

export interface GoogleCloudDialogflowCxV3ResponseMessageKnowledgeInfoCard {}

export const GoogleCloudDialogflowCxV3ResponseMessageKnowledgeInfoCard: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageKnowledgeInfoCard> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudDialogflowCxV3ResponseMessageKnowledgeInfoCard",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessageKnowledgeInfoCard>;

export interface GoogleCloudDialogflowCxV3ToolCall {
  tool?: string;
  action?: string;
  inputParameters?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3ToolCall: Schema.Schema<GoogleCloudDialogflowCxV3ToolCall> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tool: Schema.optional(Schema.String),
      action: Schema.optional(Schema.String),
      inputParameters: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ToolCall",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolCall>;

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
  responseType?:
    | "RESPONSE_TYPE_UNSPECIFIED"
    | "ENTRY_PROMPT"
    | "PARAMETER_PROMPT"
    | "HANDLER_PROMPT"
    | (string & {});
  channel?: string;
}

export const GoogleCloudDialogflowCxV3ResponseMessage: Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(GoogleCloudDialogflowCxV3ResponseMessageText),
      payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      conversationSuccess: Schema.optional(
        GoogleCloudDialogflowCxV3ResponseMessageConversationSuccess,
      ),
      outputAudioText: Schema.optional(
        GoogleCloudDialogflowCxV3ResponseMessageOutputAudioText,
      ),
      liveAgentHandoff: Schema.optional(
        GoogleCloudDialogflowCxV3ResponseMessageLiveAgentHandoff,
      ),
      endInteraction: Schema.optional(
        GoogleCloudDialogflowCxV3ResponseMessageEndInteraction,
      ),
      playAudio: Schema.optional(
        GoogleCloudDialogflowCxV3ResponseMessagePlayAudio,
      ),
      mixedAudio: Schema.optional(
        GoogleCloudDialogflowCxV3ResponseMessageMixedAudio,
      ),
      telephonyTransferCall: Schema.optional(
        GoogleCloudDialogflowCxV3ResponseMessageTelephonyTransferCall,
      ),
      knowledgeInfoCard: Schema.optional(
        GoogleCloudDialogflowCxV3ResponseMessageKnowledgeInfoCard,
      ),
      toolCall: Schema.optional(GoogleCloudDialogflowCxV3ToolCall),
      responseType: Schema.optional(Schema.String),
      channel: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ResponseMessage",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResponseMessage>;

export interface GoogleCloudDialogflowCxV3FulfillmentSetParameterAction {
  parameter?: string;
  value?: unknown;
}

export const GoogleCloudDialogflowCxV3FulfillmentSetParameterAction: Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentSetParameterAction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      parameter: Schema.optional(Schema.String),
      value: Schema.optional(Schema.Unknown),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3FulfillmentSetParameterAction",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentSetParameterAction>;

export interface GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCaseCaseContent {
  message?: GoogleCloudDialogflowCxV3ResponseMessage;
  additionalCases?: GoogleCloudDialogflowCxV3FulfillmentConditionalCases;
}

export const GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCaseCaseContent: Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCaseCaseContent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(GoogleCloudDialogflowCxV3ResponseMessage),
      additionalCases: Schema.optional(
        GoogleCloudDialogflowCxV3FulfillmentConditionalCases,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCaseCaseContent",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCaseCaseContent>;

export interface GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCase {
  condition?: string;
  caseContent?: Array<GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCaseCaseContent>;
}

export const GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCase: Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCase> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      condition: Schema.optional(Schema.String),
      caseContent: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCaseCaseContent,
        ),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCase",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCase>;

export interface GoogleCloudDialogflowCxV3FulfillmentConditionalCases {
  cases?: Array<GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCase>;
}

export const GoogleCloudDialogflowCxV3FulfillmentConditionalCases: Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentConditionalCases> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cases: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3FulfillmentConditionalCasesCase),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3FulfillmentConditionalCases",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentConditionalCases>;

export interface GoogleCloudDialogflowCxV3GcsDestination {
  uri?: string;
}

export const GoogleCloudDialogflowCxV3GcsDestination: Schema.Schema<GoogleCloudDialogflowCxV3GcsDestination> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3GcsDestination",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3GcsDestination>;

export interface GoogleCloudDialogflowCxV3AdvancedSettingsSpeechSettings {
  endpointerSensitivity?: number;
  noSpeechTimeout?: string;
  useTimeoutBasedEndpointing?: boolean;
  models?: Record<string, string>;
}

export const GoogleCloudDialogflowCxV3AdvancedSettingsSpeechSettings: Schema.Schema<GoogleCloudDialogflowCxV3AdvancedSettingsSpeechSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      endpointerSensitivity: Schema.optional(Schema.Number),
      noSpeechTimeout: Schema.optional(Schema.String),
      useTimeoutBasedEndpointing: Schema.optional(Schema.Boolean),
      models: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3AdvancedSettingsSpeechSettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AdvancedSettingsSpeechSettings>;

export interface GoogleCloudDialogflowCxV3AdvancedSettingsDtmfSettings {
  enabled?: boolean;
  maxDigits?: number;
  finishDigit?: string;
  interdigitTimeoutDuration?: string;
  endpointingTimeoutDuration?: string;
}

export const GoogleCloudDialogflowCxV3AdvancedSettingsDtmfSettings: Schema.Schema<GoogleCloudDialogflowCxV3AdvancedSettingsDtmfSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
      maxDigits: Schema.optional(Schema.Number),
      finishDigit: Schema.optional(Schema.String),
      interdigitTimeoutDuration: Schema.optional(Schema.String),
      endpointingTimeoutDuration: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3AdvancedSettingsDtmfSettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AdvancedSettingsDtmfSettings>;

export interface GoogleCloudDialogflowCxV3AdvancedSettingsLoggingSettings {
  enableStackdriverLogging?: boolean;
  enableInteractionLogging?: boolean;
  enableConsentBasedRedaction?: boolean;
}

export const GoogleCloudDialogflowCxV3AdvancedSettingsLoggingSettings: Schema.Schema<GoogleCloudDialogflowCxV3AdvancedSettingsLoggingSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enableStackdriverLogging: Schema.optional(Schema.Boolean),
      enableInteractionLogging: Schema.optional(Schema.Boolean),
      enableConsentBasedRedaction: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3AdvancedSettingsLoggingSettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AdvancedSettingsLoggingSettings>;

export interface GoogleCloudDialogflowCxV3AdvancedSettings {
  audioExportGcsDestination?: GoogleCloudDialogflowCxV3GcsDestination;
  speechSettings?: GoogleCloudDialogflowCxV3AdvancedSettingsSpeechSettings;
  dtmfSettings?: GoogleCloudDialogflowCxV3AdvancedSettingsDtmfSettings;
  loggingSettings?: GoogleCloudDialogflowCxV3AdvancedSettingsLoggingSettings;
}

export const GoogleCloudDialogflowCxV3AdvancedSettings: Schema.Schema<GoogleCloudDialogflowCxV3AdvancedSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      audioExportGcsDestination: Schema.optional(
        GoogleCloudDialogflowCxV3GcsDestination,
      ),
      speechSettings: Schema.optional(
        GoogleCloudDialogflowCxV3AdvancedSettingsSpeechSettings,
      ),
      dtmfSettings: Schema.optional(
        GoogleCloudDialogflowCxV3AdvancedSettingsDtmfSettings,
      ),
      loggingSettings: Schema.optional(
        GoogleCloudDialogflowCxV3AdvancedSettingsLoggingSettings,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3AdvancedSettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AdvancedSettings>;

export interface GoogleCloudDialogflowCxV3FulfillmentGeneratorSettings {
  generator?: string;
  inputParameters?: Record<string, string>;
  outputParameter?: string;
}

export const GoogleCloudDialogflowCxV3FulfillmentGeneratorSettings: Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentGeneratorSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      generator: Schema.optional(Schema.String),
      inputParameters: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      outputParameter: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3FulfillmentGeneratorSettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FulfillmentGeneratorSettings>;

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

export const GoogleCloudDialogflowCxV3Fulfillment: Schema.Schema<GoogleCloudDialogflowCxV3Fulfillment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      messages: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3ResponseMessage),
      ),
      webhook: Schema.optional(Schema.String),
      returnPartialResponses: Schema.optional(Schema.Boolean),
      tag: Schema.optional(Schema.String),
      setParameterActions: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3FulfillmentSetParameterAction),
      ),
      conditionalCases: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3FulfillmentConditionalCases),
      ),
      advancedSettings: Schema.optional(
        GoogleCloudDialogflowCxV3AdvancedSettings,
      ),
      enableGenerativeFallback: Schema.optional(Schema.Boolean),
      generators: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3FulfillmentGeneratorSettings),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3Fulfillment",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Fulfillment>;

export interface GoogleCloudDialogflowCxV3EventHandler {
  name?: string;
  event?: string;
  triggerFulfillment?: GoogleCloudDialogflowCxV3Fulfillment;
  targetPage?: string;
  targetFlow?: string;
  targetPlaybook?: string;
}

export const GoogleCloudDialogflowCxV3EventHandler: Schema.Schema<GoogleCloudDialogflowCxV3EventHandler> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      event: Schema.optional(Schema.String),
      triggerFulfillment: Schema.optional(GoogleCloudDialogflowCxV3Fulfillment),
      targetPage: Schema.optional(Schema.String),
      targetFlow: Schema.optional(Schema.String),
      targetPlaybook: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3EventHandler",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3EventHandler>;

export interface GoogleCloudDialogflowCxV3FormParameterFillBehavior {
  initialPromptFulfillment?: GoogleCloudDialogflowCxV3Fulfillment;
  repromptEventHandlers?: Array<GoogleCloudDialogflowCxV3EventHandler>;
}

export const GoogleCloudDialogflowCxV3FormParameterFillBehavior: Schema.Schema<GoogleCloudDialogflowCxV3FormParameterFillBehavior> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      initialPromptFulfillment: Schema.optional(
        GoogleCloudDialogflowCxV3Fulfillment,
      ),
      repromptEventHandlers: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3EventHandler),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3FormParameterFillBehavior",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FormParameterFillBehavior>;

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

export const GoogleCloudDialogflowCxV3FormParameter: Schema.Schema<GoogleCloudDialogflowCxV3FormParameter> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      required: Schema.optional(Schema.Boolean),
      entityType: Schema.optional(Schema.String),
      isList: Schema.optional(Schema.Boolean),
      fillBehavior: Schema.optional(
        GoogleCloudDialogflowCxV3FormParameterFillBehavior,
      ),
      defaultValue: Schema.optional(Schema.Unknown),
      redact: Schema.optional(Schema.Boolean),
      advancedSettings: Schema.optional(
        GoogleCloudDialogflowCxV3AdvancedSettings,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3FormParameter",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FormParameter>;

export interface GoogleCloudDialogflowCxV3Form {
  parameters?: Array<GoogleCloudDialogflowCxV3FormParameter>;
}

export const GoogleCloudDialogflowCxV3Form: Schema.Schema<GoogleCloudDialogflowCxV3Form> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      parameters: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3FormParameter),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3Form",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Form>;

export interface GoogleCloudDialogflowCxV3TransitionRoute {
  name?: string;
  description?: string;
  intent?: string;
  condition?: string;
  triggerFulfillment?: GoogleCloudDialogflowCxV3Fulfillment;
  targetPage?: string;
  targetFlow?: string;
}

export const GoogleCloudDialogflowCxV3TransitionRoute: Schema.Schema<GoogleCloudDialogflowCxV3TransitionRoute> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      intent: Schema.optional(Schema.String),
      condition: Schema.optional(Schema.String),
      triggerFulfillment: Schema.optional(GoogleCloudDialogflowCxV3Fulfillment),
      targetPage: Schema.optional(Schema.String),
      targetFlow: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3TransitionRoute",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TransitionRoute>;

export interface GoogleCloudDialogflowCxV3DataStoreConnection {
  dataStoreType?:
    | "DATA_STORE_TYPE_UNSPECIFIED"
    | "PUBLIC_WEB"
    | "UNSTRUCTURED"
    | "STRUCTURED"
    | (string & {});
  dataStore?: string;
  documentProcessingMode?:
    | "DOCUMENT_PROCESSING_MODE_UNSPECIFIED"
    | "DOCUMENTS"
    | "CHUNKS"
    | (string & {});
}

export const GoogleCloudDialogflowCxV3DataStoreConnection: Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnection> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dataStoreType: Schema.optional(Schema.String),
      dataStore: Schema.optional(Schema.String),
      documentProcessingMode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3DataStoreConnection",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnection>;

export interface GoogleCloudDialogflowCxV3KnowledgeConnectorSettings {
  enabled?: boolean;
  triggerFulfillment?: GoogleCloudDialogflowCxV3Fulfillment;
  targetPage?: string;
  targetFlow?: string;
  dataStoreConnections?: Array<GoogleCloudDialogflowCxV3DataStoreConnection>;
}

export const GoogleCloudDialogflowCxV3KnowledgeConnectorSettings: Schema.Schema<GoogleCloudDialogflowCxV3KnowledgeConnectorSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
      triggerFulfillment: Schema.optional(GoogleCloudDialogflowCxV3Fulfillment),
      targetPage: Schema.optional(Schema.String),
      targetFlow: Schema.optional(Schema.String),
      dataStoreConnections: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3DataStoreConnection),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3KnowledgeConnectorSettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3KnowledgeConnectorSettings>;

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

export const GoogleCloudDialogflowCxV3Page: Schema.Schema<GoogleCloudDialogflowCxV3Page> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      entryFulfillment: Schema.optional(GoogleCloudDialogflowCxV3Fulfillment),
      form: Schema.optional(GoogleCloudDialogflowCxV3Form),
      transitionRouteGroups: Schema.optional(Schema.Array(Schema.String)),
      transitionRoutes: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3TransitionRoute),
      ),
      eventHandlers: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3EventHandler),
      ),
      advancedSettings: Schema.optional(
        GoogleCloudDialogflowCxV3AdvancedSettings,
      ),
      knowledgeConnectorSettings: Schema.optional(
        GoogleCloudDialogflowCxV3KnowledgeConnectorSettings,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3Page",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Page>;

export interface GoogleCloudDialogflowCxV3ListPagesResponse {
  pages?: Array<GoogleCloudDialogflowCxV3Page>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListPagesResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListPagesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      pages: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Page)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ListPagesResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListPagesResponse>;

export interface GoogleProtobufEmpty {}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleProtobufEmpty",
  }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface GoogleRpcStatus {
  code?: number;
  message?: string;
  details?: Array<Record<string, unknown>>;
}

export const GoogleRpcStatus: Schema.Schema<GoogleRpcStatus> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      code: Schema.optional(Schema.Number),
      message: Schema.optional(Schema.String),
      details: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
    }),
  ).annotate({
    identifier: "GoogleRpcStatus",
  }) as any as Schema.Schema<GoogleRpcStatus>;

export interface GoogleLongrunningOperation {
  name?: string;
  metadata?: Record<string, unknown>;
  done?: boolean;
  error?: GoogleRpcStatus;
  response?: Record<string, unknown>;
}

export const GoogleLongrunningOperation: Schema.Schema<GoogleLongrunningOperation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      done: Schema.optional(Schema.Boolean),
      error: Schema.optional(GoogleRpcStatus),
      response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({
    identifier: "GoogleLongrunningOperation",
  }) as any as Schema.Schema<GoogleLongrunningOperation>;

export interface GoogleLongrunningListOperationsResponse {
  operations?: Array<GoogleLongrunningOperation>;
  nextPageToken?: string;
  unreachable?: Array<string>;
}

export const GoogleLongrunningListOperationsResponse: Schema.Schema<GoogleLongrunningListOperationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      operations: Schema.optional(Schema.Array(GoogleLongrunningOperation)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleLongrunningListOperationsResponse",
  }) as any as Schema.Schema<GoogleLongrunningListOperationsResponse>;

export interface GoogleCloudDialogflowCxV3NluSettings {
  modelType?:
    | "MODEL_TYPE_UNSPECIFIED"
    | "MODEL_TYPE_STANDARD"
    | "MODEL_TYPE_ADVANCED"
    | (string & {});
  classificationThreshold?: number;
  modelTrainingMode?:
    | "MODEL_TRAINING_MODE_UNSPECIFIED"
    | "MODEL_TRAINING_MODE_AUTOMATIC"
    | "MODEL_TRAINING_MODE_MANUAL"
    | (string & {});
}

export const GoogleCloudDialogflowCxV3NluSettings: Schema.Schema<GoogleCloudDialogflowCxV3NluSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      modelType: Schema.optional(Schema.String),
      classificationThreshold: Schema.optional(Schema.Number),
      modelTrainingMode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3NluSettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3NluSettings>;

export interface GoogleCloudDialogflowCxV3InlineSchema {
  type?:
    | "DATA_TYPE_UNSPECIFIED"
    | "STRING"
    | "NUMBER"
    | "BOOLEAN"
    | "ARRAY"
    | (string & {});
  items?: GoogleCloudDialogflowCxV3TypeSchema;
}

export const GoogleCloudDialogflowCxV3InlineSchema: Schema.Schema<GoogleCloudDialogflowCxV3InlineSchema> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      items: Schema.optional(GoogleCloudDialogflowCxV3TypeSchema),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3InlineSchema",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3InlineSchema>;

export interface GoogleCloudDialogflowCxV3TypeSchemaSchemaReference {
  tool?: string;
  schema?: string;
}

export const GoogleCloudDialogflowCxV3TypeSchemaSchemaReference: Schema.Schema<GoogleCloudDialogflowCxV3TypeSchemaSchemaReference> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tool: Schema.optional(Schema.String),
      schema: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3TypeSchemaSchemaReference",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TypeSchemaSchemaReference>;

export interface GoogleCloudDialogflowCxV3TypeSchema {
  inlineSchema?: GoogleCloudDialogflowCxV3InlineSchema;
  schemaReference?: GoogleCloudDialogflowCxV3TypeSchemaSchemaReference;
}

export const GoogleCloudDialogflowCxV3TypeSchema: Schema.Schema<GoogleCloudDialogflowCxV3TypeSchema> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      inlineSchema: Schema.optional(GoogleCloudDialogflowCxV3InlineSchema),
      schemaReference: Schema.optional(
        GoogleCloudDialogflowCxV3TypeSchemaSchemaReference,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3TypeSchema",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TypeSchema>;

export interface GoogleCloudDialogflowCxV3ParameterDefinition {
  name?: string;
  type?:
    | "PARAMETER_TYPE_UNSPECIFIED"
    | "STRING"
    | "NUMBER"
    | "BOOLEAN"
    | "NULL"
    | "OBJECT"
    | "LIST"
    | (string & {});
  typeSchema?: GoogleCloudDialogflowCxV3TypeSchema;
  description?: string;
}

export const GoogleCloudDialogflowCxV3ParameterDefinition: Schema.Schema<GoogleCloudDialogflowCxV3ParameterDefinition> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      typeSchema: Schema.optional(GoogleCloudDialogflowCxV3TypeSchema),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ParameterDefinition",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ParameterDefinition>;

export interface GoogleCloudDialogflowCxV3FlowMultiLanguageSettings {
  enableMultiLanguageDetection?: boolean;
  supportedResponseLanguageCodes?: Array<string>;
}

export const GoogleCloudDialogflowCxV3FlowMultiLanguageSettings: Schema.Schema<GoogleCloudDialogflowCxV3FlowMultiLanguageSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enableMultiLanguageDetection: Schema.optional(Schema.Boolean),
      supportedResponseLanguageCodes: Schema.optional(
        Schema.Array(Schema.String),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3FlowMultiLanguageSettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FlowMultiLanguageSettings>;

export interface GoogleCloudDialogflowCxV3Flow {
  name?: string;
  displayName?: string;
  description?: string;
  transitionRoutes?: Array<GoogleCloudDialogflowCxV3TransitionRoute>;
  eventHandlers?: Array<GoogleCloudDialogflowCxV3EventHandler>;
  transitionRouteGroups?: Array<string>;
  nluSettings?: GoogleCloudDialogflowCxV3NluSettings;
  advancedSettings?: GoogleCloudDialogflowCxV3AdvancedSettings;
  knowledgeConnectorSettings?: GoogleCloudDialogflowCxV3KnowledgeConnectorSettings;
  inputParameterDefinitions?: Array<GoogleCloudDialogflowCxV3ParameterDefinition>;
  outputParameterDefinitions?: Array<GoogleCloudDialogflowCxV3ParameterDefinition>;
  multiLanguageSettings?: GoogleCloudDialogflowCxV3FlowMultiLanguageSettings;
  locked?: boolean;
}

export const GoogleCloudDialogflowCxV3Flow: Schema.Schema<GoogleCloudDialogflowCxV3Flow> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      transitionRoutes: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3TransitionRoute),
      ),
      eventHandlers: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3EventHandler),
      ),
      transitionRouteGroups: Schema.optional(Schema.Array(Schema.String)),
      nluSettings: Schema.optional(GoogleCloudDialogflowCxV3NluSettings),
      advancedSettings: Schema.optional(
        GoogleCloudDialogflowCxV3AdvancedSettings,
      ),
      knowledgeConnectorSettings: Schema.optional(
        GoogleCloudDialogflowCxV3KnowledgeConnectorSettings,
      ),
      inputParameterDefinitions: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3ParameterDefinition),
      ),
      outputParameterDefinitions: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3ParameterDefinition),
      ),
      multiLanguageSettings: Schema.optional(
        GoogleCloudDialogflowCxV3FlowMultiLanguageSettings,
      ),
      locked: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3Flow",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Flow>;

export interface GoogleCloudDialogflowCxV3ListFlowsResponse {
  flows?: Array<GoogleCloudDialogflowCxV3Flow>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListFlowsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListFlowsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      flows: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Flow)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ListFlowsResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListFlowsResponse>;

export interface GoogleCloudDialogflowCxV3TrainFlowRequest {}

export const GoogleCloudDialogflowCxV3TrainFlowRequest: Schema.Schema<GoogleCloudDialogflowCxV3TrainFlowRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudDialogflowCxV3TrainFlowRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TrainFlowRequest>;

export interface GoogleCloudDialogflowCxV3ValidateFlowRequest {
  languageCode?: string;
}

export const GoogleCloudDialogflowCxV3ValidateFlowRequest: Schema.Schema<GoogleCloudDialogflowCxV3ValidateFlowRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      languageCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ValidateFlowRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ValidateFlowRequest>;

export interface GoogleCloudDialogflowCxV3ResourceName {
  name?: string;
  displayName?: string;
}

export const GoogleCloudDialogflowCxV3ResourceName: Schema.Schema<GoogleCloudDialogflowCxV3ResourceName> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ResourceName",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ResourceName>;

export interface GoogleCloudDialogflowCxV3ValidationMessage {
  resourceType?:
    | "RESOURCE_TYPE_UNSPECIFIED"
    | "AGENT"
    | "INTENT"
    | "INTENT_TRAINING_PHRASE"
    | "INTENT_PARAMETER"
    | "INTENTS"
    | "INTENT_TRAINING_PHRASES"
    | "ENTITY_TYPE"
    | "ENTITY_TYPES"
    | "WEBHOOK"
    | "FLOW"
    | "PAGE"
    | "PAGES"
    | "TRANSITION_ROUTE_GROUP"
    | "AGENT_TRANSITION_ROUTE_GROUP"
    | (string & {});
  resources?: Array<string>;
  resourceNames?: Array<GoogleCloudDialogflowCxV3ResourceName>;
  severity?:
    | "SEVERITY_UNSPECIFIED"
    | "INFO"
    | "WARNING"
    | "ERROR"
    | (string & {});
  detail?: string;
}

export const GoogleCloudDialogflowCxV3ValidationMessage: Schema.Schema<GoogleCloudDialogflowCxV3ValidationMessage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      resourceType: Schema.optional(Schema.String),
      resources: Schema.optional(Schema.Array(Schema.String)),
      resourceNames: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3ResourceName),
      ),
      severity: Schema.optional(Schema.String),
      detail: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ValidationMessage",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ValidationMessage>;

export interface GoogleCloudDialogflowCxV3FlowValidationResult {
  name?: string;
  validationMessages?: Array<GoogleCloudDialogflowCxV3ValidationMessage>;
  updateTime?: string;
}

export const GoogleCloudDialogflowCxV3FlowValidationResult: Schema.Schema<GoogleCloudDialogflowCxV3FlowValidationResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      validationMessages: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3ValidationMessage),
      ),
      updateTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3FlowValidationResult",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FlowValidationResult>;

export interface GoogleCloudDialogflowCxV3FlowImportStrategy {
  globalImportStrategy?:
    | "IMPORT_STRATEGY_UNSPECIFIED"
    | "IMPORT_STRATEGY_CREATE_NEW"
    | "IMPORT_STRATEGY_REPLACE"
    | "IMPORT_STRATEGY_KEEP"
    | "IMPORT_STRATEGY_MERGE"
    | "IMPORT_STRATEGY_THROW_ERROR"
    | (string & {});
}

export const GoogleCloudDialogflowCxV3FlowImportStrategy: Schema.Schema<GoogleCloudDialogflowCxV3FlowImportStrategy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      globalImportStrategy: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3FlowImportStrategy",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FlowImportStrategy>;

export interface GoogleCloudDialogflowCxV3ImportFlowRequest {
  flowUri?: string;
  flowContent?: string;
  importOption?:
    | "IMPORT_OPTION_UNSPECIFIED"
    | "KEEP"
    | "FALLBACK"
    | (string & {});
  flowImportStrategy?: GoogleCloudDialogflowCxV3FlowImportStrategy;
}

export const GoogleCloudDialogflowCxV3ImportFlowRequest: Schema.Schema<GoogleCloudDialogflowCxV3ImportFlowRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      flowUri: Schema.optional(Schema.String),
      flowContent: Schema.optional(Schema.String),
      importOption: Schema.optional(Schema.String),
      flowImportStrategy: Schema.optional(
        GoogleCloudDialogflowCxV3FlowImportStrategy,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ImportFlowRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportFlowRequest>;

export interface GoogleCloudDialogflowCxV3ExportFlowRequest {
  flowUri?: string;
  includeReferencedFlows?: boolean;
}

export const GoogleCloudDialogflowCxV3ExportFlowRequest: Schema.Schema<GoogleCloudDialogflowCxV3ExportFlowRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      flowUri: Schema.optional(Schema.String),
      includeReferencedFlows: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ExportFlowRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportFlowRequest>;

export interface GoogleCloudDialogflowCxV3SecuritySettingsAudioExportSettings {
  gcsBucket?: string;
  audioExportPattern?: string;
  enableAudioRedaction?: boolean;
  audioFormat?:
    | "AUDIO_FORMAT_UNSPECIFIED"
    | "MULAW"
    | "MP3"
    | "OGG"
    | (string & {});
  storeTtsAudio?: boolean;
}

export const GoogleCloudDialogflowCxV3SecuritySettingsAudioExportSettings: Schema.Schema<GoogleCloudDialogflowCxV3SecuritySettingsAudioExportSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gcsBucket: Schema.optional(Schema.String),
      audioExportPattern: Schema.optional(Schema.String),
      enableAudioRedaction: Schema.optional(Schema.Boolean),
      audioFormat: Schema.optional(Schema.String),
      storeTtsAudio: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3SecuritySettingsAudioExportSettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SecuritySettingsAudioExportSettings>;

export interface GoogleCloudDialogflowCxV3SecuritySettingsInsightsExportSettings {
  enableInsightsExport?: boolean;
}

export const GoogleCloudDialogflowCxV3SecuritySettingsInsightsExportSettings: Schema.Schema<GoogleCloudDialogflowCxV3SecuritySettingsInsightsExportSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enableInsightsExport: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3SecuritySettingsInsightsExportSettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SecuritySettingsInsightsExportSettings>;

export interface GoogleCloudDialogflowCxV3SecuritySettings {
  name?: string;
  displayName?: string;
  redactionStrategy?:
    | "REDACTION_STRATEGY_UNSPECIFIED"
    | "REDACT_WITH_SERVICE"
    | (string & {});
  redactionScope?:
    | "REDACTION_SCOPE_UNSPECIFIED"
    | "REDACT_DISK_STORAGE"
    | (string & {});
  inspectTemplate?: string;
  deidentifyTemplate?: string;
  retentionWindowDays?: number;
  retentionStrategy?:
    | "RETENTION_STRATEGY_UNSPECIFIED"
    | "REMOVE_AFTER_CONVERSATION"
    | (string & {});
  purgeDataTypes?: Array<
    "PURGE_DATA_TYPE_UNSPECIFIED" | "DIALOGFLOW_HISTORY" | (string & {})
  >;
  audioExportSettings?: GoogleCloudDialogflowCxV3SecuritySettingsAudioExportSettings;
  insightsExportSettings?: GoogleCloudDialogflowCxV3SecuritySettingsInsightsExportSettings;
}

export const GoogleCloudDialogflowCxV3SecuritySettings: Schema.Schema<GoogleCloudDialogflowCxV3SecuritySettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      redactionStrategy: Schema.optional(Schema.String),
      redactionScope: Schema.optional(Schema.String),
      inspectTemplate: Schema.optional(Schema.String),
      deidentifyTemplate: Schema.optional(Schema.String),
      retentionWindowDays: Schema.optional(Schema.Number),
      retentionStrategy: Schema.optional(Schema.String),
      purgeDataTypes: Schema.optional(Schema.Array(Schema.String)),
      audioExportSettings: Schema.optional(
        GoogleCloudDialogflowCxV3SecuritySettingsAudioExportSettings,
      ),
      insightsExportSettings: Schema.optional(
        GoogleCloudDialogflowCxV3SecuritySettingsInsightsExportSettings,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3SecuritySettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SecuritySettings>;

export interface GoogleCloudDialogflowCxV3ListSecuritySettingsResponse {
  securitySettings?: Array<GoogleCloudDialogflowCxV3SecuritySettings>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListSecuritySettingsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListSecuritySettingsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      securitySettings: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3SecuritySettings),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ListSecuritySettingsResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListSecuritySettingsResponse>;

export interface GoogleCloudDialogflowCxV3SpeechToTextSettings {
  enableSpeechAdaptation?: boolean;
}

export const GoogleCloudDialogflowCxV3SpeechToTextSettings: Schema.Schema<GoogleCloudDialogflowCxV3SpeechToTextSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enableSpeechAdaptation: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3SpeechToTextSettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SpeechToTextSettings>;

export interface GoogleCloudDialogflowCxV3AgentGitIntegrationSettingsGithubSettings {
  displayName?: string;
  repositoryUri?: string;
  trackingBranch?: string;
  accessToken?: string;
  branches?: Array<string>;
}

export const GoogleCloudDialogflowCxV3AgentGitIntegrationSettingsGithubSettings: Schema.Schema<GoogleCloudDialogflowCxV3AgentGitIntegrationSettingsGithubSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      repositoryUri: Schema.optional(Schema.String),
      trackingBranch: Schema.optional(Schema.String),
      accessToken: Schema.optional(Schema.String),
      branches: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3AgentGitIntegrationSettingsGithubSettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AgentGitIntegrationSettingsGithubSettings>;

export interface GoogleCloudDialogflowCxV3AgentGitIntegrationSettings {
  githubSettings?: GoogleCloudDialogflowCxV3AgentGitIntegrationSettingsGithubSettings;
}

export const GoogleCloudDialogflowCxV3AgentGitIntegrationSettings: Schema.Schema<GoogleCloudDialogflowCxV3AgentGitIntegrationSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      githubSettings: Schema.optional(
        GoogleCloudDialogflowCxV3AgentGitIntegrationSettingsGithubSettings,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3AgentGitIntegrationSettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AgentGitIntegrationSettings>;

export interface GoogleCloudDialogflowCxV3VoiceSelectionParams {
  name?: string;
  ssmlGender?:
    | "SSML_VOICE_GENDER_UNSPECIFIED"
    | "SSML_VOICE_GENDER_MALE"
    | "SSML_VOICE_GENDER_FEMALE"
    | "SSML_VOICE_GENDER_NEUTRAL"
    | (string & {});
}

export const GoogleCloudDialogflowCxV3VoiceSelectionParams: Schema.Schema<GoogleCloudDialogflowCxV3VoiceSelectionParams> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      ssmlGender: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3VoiceSelectionParams",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3VoiceSelectionParams>;

export interface GoogleCloudDialogflowCxV3SynthesizeSpeechConfig {
  speakingRate?: number;
  pitch?: number;
  volumeGainDb?: number;
  effectsProfileId?: Array<string>;
  voice?: GoogleCloudDialogflowCxV3VoiceSelectionParams;
}

export const GoogleCloudDialogflowCxV3SynthesizeSpeechConfig: Schema.Schema<GoogleCloudDialogflowCxV3SynthesizeSpeechConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      speakingRate: Schema.optional(Schema.Number),
      pitch: Schema.optional(Schema.Number),
      volumeGainDb: Schema.optional(Schema.Number),
      effectsProfileId: Schema.optional(Schema.Array(Schema.String)),
      voice: Schema.optional(GoogleCloudDialogflowCxV3VoiceSelectionParams),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3SynthesizeSpeechConfig",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SynthesizeSpeechConfig>;

export interface GoogleCloudDialogflowCxV3TextToSpeechSettings {
  synthesizeSpeechConfigs?: Record<
    string,
    GoogleCloudDialogflowCxV3SynthesizeSpeechConfig
  >;
}

export const GoogleCloudDialogflowCxV3TextToSpeechSettings: Schema.Schema<GoogleCloudDialogflowCxV3TextToSpeechSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      synthesizeSpeechConfigs: Schema.optional(
        Schema.Record(
          Schema.String,
          GoogleCloudDialogflowCxV3SynthesizeSpeechConfig,
        ),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3TextToSpeechSettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TextToSpeechSettings>;

export interface GoogleCloudDialogflowCxV3AgentGenAppBuilderSettings {
  engine?: string;
}

export const GoogleCloudDialogflowCxV3AgentGenAppBuilderSettings: Schema.Schema<GoogleCloudDialogflowCxV3AgentGenAppBuilderSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      engine: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3AgentGenAppBuilderSettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AgentGenAppBuilderSettings>;

export interface GoogleCloudDialogflowCxV3AgentAnswerFeedbackSettings {
  enableAnswerFeedback?: boolean;
}

export const GoogleCloudDialogflowCxV3AgentAnswerFeedbackSettings: Schema.Schema<GoogleCloudDialogflowCxV3AgentAnswerFeedbackSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enableAnswerFeedback: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3AgentAnswerFeedbackSettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AgentAnswerFeedbackSettings>;

export interface GoogleCloudDialogflowCxV3AgentPersonalizationSettings {
  defaultEndUserMetadata?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3AgentPersonalizationSettings: Schema.Schema<GoogleCloudDialogflowCxV3AgentPersonalizationSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      defaultEndUserMetadata: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3AgentPersonalizationSettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AgentPersonalizationSettings>;

export interface GoogleCloudDialogflowCxV3AgentClientCertificateSettings {
  sslCertificate?: string;
  privateKey?: string;
  passphrase?: string;
}

export const GoogleCloudDialogflowCxV3AgentClientCertificateSettings: Schema.Schema<GoogleCloudDialogflowCxV3AgentClientCertificateSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sslCertificate: Schema.optional(Schema.String),
      privateKey: Schema.optional(Schema.String),
      passphrase: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3AgentClientCertificateSettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AgentClientCertificateSettings>;

export interface GoogleCloudDialogflowCxV3Agent {
  name?: string;
  displayName?: string;
  defaultLanguageCode?: string;
  supportedLanguageCodes?: Array<string>;
  timeZone?: string;
  description?: string;
  avatarUri?: string;
  speechToTextSettings?: GoogleCloudDialogflowCxV3SpeechToTextSettings;
  startFlow?: string;
  startPlaybook?: string;
  securitySettings?: string;
  enableStackdriverLogging?: boolean;
  enableSpellCorrection?: boolean;
  enableMultiLanguageTraining?: boolean;
  locked?: boolean;
  advancedSettings?: GoogleCloudDialogflowCxV3AdvancedSettings;
  gitIntegrationSettings?: GoogleCloudDialogflowCxV3AgentGitIntegrationSettings;
  textToSpeechSettings?: GoogleCloudDialogflowCxV3TextToSpeechSettings;
  genAppBuilderSettings?: GoogleCloudDialogflowCxV3AgentGenAppBuilderSettings;
  answerFeedbackSettings?: GoogleCloudDialogflowCxV3AgentAnswerFeedbackSettings;
  personalizationSettings?: GoogleCloudDialogflowCxV3AgentPersonalizationSettings;
  clientCertificateSettings?: GoogleCloudDialogflowCxV3AgentClientCertificateSettings;
  satisfiesPzs?: boolean;
  satisfiesPzi?: boolean;
}

export const GoogleCloudDialogflowCxV3Agent: Schema.Schema<GoogleCloudDialogflowCxV3Agent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      defaultLanguageCode: Schema.optional(Schema.String),
      supportedLanguageCodes: Schema.optional(Schema.Array(Schema.String)),
      timeZone: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      avatarUri: Schema.optional(Schema.String),
      speechToTextSettings: Schema.optional(
        GoogleCloudDialogflowCxV3SpeechToTextSettings,
      ),
      startFlow: Schema.optional(Schema.String),
      startPlaybook: Schema.optional(Schema.String),
      securitySettings: Schema.optional(Schema.String),
      enableStackdriverLogging: Schema.optional(Schema.Boolean),
      enableSpellCorrection: Schema.optional(Schema.Boolean),
      enableMultiLanguageTraining: Schema.optional(Schema.Boolean),
      locked: Schema.optional(Schema.Boolean),
      advancedSettings: Schema.optional(
        GoogleCloudDialogflowCxV3AdvancedSettings,
      ),
      gitIntegrationSettings: Schema.optional(
        GoogleCloudDialogflowCxV3AgentGitIntegrationSettings,
      ),
      textToSpeechSettings: Schema.optional(
        GoogleCloudDialogflowCxV3TextToSpeechSettings,
      ),
      genAppBuilderSettings: Schema.optional(
        GoogleCloudDialogflowCxV3AgentGenAppBuilderSettings,
      ),
      answerFeedbackSettings: Schema.optional(
        GoogleCloudDialogflowCxV3AgentAnswerFeedbackSettings,
      ),
      personalizationSettings: Schema.optional(
        GoogleCloudDialogflowCxV3AgentPersonalizationSettings,
      ),
      clientCertificateSettings: Schema.optional(
        GoogleCloudDialogflowCxV3AgentClientCertificateSettings,
      ),
      satisfiesPzs: Schema.optional(Schema.Boolean),
      satisfiesPzi: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3Agent",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Agent>;

export interface GoogleCloudDialogflowCxV3ListAgentsResponse {
  agents?: Array<GoogleCloudDialogflowCxV3Agent>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListAgentsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListAgentsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      agents: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Agent)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ListAgentsResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListAgentsResponse>;

export interface GoogleCloudDialogflowCxV3ExportAgentRequestGitDestination {
  trackingBranch?: string;
  commitMessage?: string;
}

export const GoogleCloudDialogflowCxV3ExportAgentRequestGitDestination: Schema.Schema<GoogleCloudDialogflowCxV3ExportAgentRequestGitDestination> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      trackingBranch: Schema.optional(Schema.String),
      commitMessage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ExportAgentRequestGitDestination",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportAgentRequestGitDestination>;

export interface GoogleCloudDialogflowCxV3ExportAgentRequest {
  agentUri?: string;
  dataFormat?:
    | "DATA_FORMAT_UNSPECIFIED"
    | "BLOB"
    | "JSON_PACKAGE"
    | (string & {});
  environment?: string;
  gitDestination?: GoogleCloudDialogflowCxV3ExportAgentRequestGitDestination;
  includeBigqueryExportSettings?: boolean;
}

export const GoogleCloudDialogflowCxV3ExportAgentRequest: Schema.Schema<GoogleCloudDialogflowCxV3ExportAgentRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      agentUri: Schema.optional(Schema.String),
      dataFormat: Schema.optional(Schema.String),
      environment: Schema.optional(Schema.String),
      gitDestination: Schema.optional(
        GoogleCloudDialogflowCxV3ExportAgentRequestGitDestination,
      ),
      includeBigqueryExportSettings: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ExportAgentRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportAgentRequest>;

export interface GoogleCloudDialogflowCxV3RestoreAgentRequestGitSource {
  trackingBranch?: string;
}

export const GoogleCloudDialogflowCxV3RestoreAgentRequestGitSource: Schema.Schema<GoogleCloudDialogflowCxV3RestoreAgentRequestGitSource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      trackingBranch: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3RestoreAgentRequestGitSource",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RestoreAgentRequestGitSource>;

export interface GoogleCloudDialogflowCxV3RestoreAgentRequest {
  agentUri?: string;
  agentContent?: string;
  gitSource?: GoogleCloudDialogflowCxV3RestoreAgentRequestGitSource;
  restoreOption?:
    | "RESTORE_OPTION_UNSPECIFIED"
    | "KEEP"
    | "FALLBACK"
    | (string & {});
}

export const GoogleCloudDialogflowCxV3RestoreAgentRequest: Schema.Schema<GoogleCloudDialogflowCxV3RestoreAgentRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      agentUri: Schema.optional(Schema.String),
      agentContent: Schema.optional(Schema.String),
      gitSource: Schema.optional(
        GoogleCloudDialogflowCxV3RestoreAgentRequestGitSource,
      ),
      restoreOption: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3RestoreAgentRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RestoreAgentRequest>;

export interface GoogleCloudDialogflowCxV3ValidateAgentRequest {
  languageCode?: string;
}

export const GoogleCloudDialogflowCxV3ValidateAgentRequest: Schema.Schema<GoogleCloudDialogflowCxV3ValidateAgentRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      languageCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ValidateAgentRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ValidateAgentRequest>;

export interface GoogleCloudDialogflowCxV3AgentValidationResult {
  name?: string;
  flowValidationResults?: Array<GoogleCloudDialogflowCxV3FlowValidationResult>;
}

export const GoogleCloudDialogflowCxV3AgentValidationResult: Schema.Schema<GoogleCloudDialogflowCxV3AgentValidationResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      flowValidationResults: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3FlowValidationResult),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3AgentValidationResult",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AgentValidationResult>;

export interface GoogleCloudDialogflowCxV3GenerativeSettingsFallbackSettingsPromptTemplate {
  displayName?: string;
  promptText?: string;
  frozen?: boolean;
}

export const GoogleCloudDialogflowCxV3GenerativeSettingsFallbackSettingsPromptTemplate: Schema.Schema<GoogleCloudDialogflowCxV3GenerativeSettingsFallbackSettingsPromptTemplate> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      promptText: Schema.optional(Schema.String),
      frozen: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3GenerativeSettingsFallbackSettingsPromptTemplate",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3GenerativeSettingsFallbackSettingsPromptTemplate>;

export interface GoogleCloudDialogflowCxV3GenerativeSettingsFallbackSettings {
  selectedPrompt?: string;
  promptTemplates?: Array<GoogleCloudDialogflowCxV3GenerativeSettingsFallbackSettingsPromptTemplate>;
}

export const GoogleCloudDialogflowCxV3GenerativeSettingsFallbackSettings: Schema.Schema<GoogleCloudDialogflowCxV3GenerativeSettingsFallbackSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      selectedPrompt: Schema.optional(Schema.String),
      promptTemplates: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowCxV3GenerativeSettingsFallbackSettingsPromptTemplate,
        ),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3GenerativeSettingsFallbackSettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3GenerativeSettingsFallbackSettings>;

export interface GoogleCloudDialogflowCxV3SafetySettingsPhrase {
  text?: string;
  languageCode?: string;
}

export const GoogleCloudDialogflowCxV3SafetySettingsPhrase: Schema.Schema<GoogleCloudDialogflowCxV3SafetySettingsPhrase> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
      languageCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3SafetySettingsPhrase",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SafetySettingsPhrase>;

export interface GoogleCloudDialogflowCxV3SafetySettingsRaiSettingsCategoryFilter {
  category?:
    | "SAFETY_CATEGORY_UNSPECIFIED"
    | "DANGEROUS_CONTENT"
    | "HATE_SPEECH"
    | "HARASSMENT"
    | "SEXUALLY_EXPLICIT_CONTENT"
    | (string & {});
  filterLevel?:
    | "SAFETY_FILTER_LEVEL_UNSPECIFIED"
    | "BLOCK_NONE"
    | "BLOCK_FEW"
    | "BLOCK_SOME"
    | "BLOCK_MOST"
    | (string & {});
}

export const GoogleCloudDialogflowCxV3SafetySettingsRaiSettingsCategoryFilter: Schema.Schema<GoogleCloudDialogflowCxV3SafetySettingsRaiSettingsCategoryFilter> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      category: Schema.optional(Schema.String),
      filterLevel: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3SafetySettingsRaiSettingsCategoryFilter",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SafetySettingsRaiSettingsCategoryFilter>;

export interface GoogleCloudDialogflowCxV3SafetySettingsRaiSettings {
  categoryFilters?: Array<GoogleCloudDialogflowCxV3SafetySettingsRaiSettingsCategoryFilter>;
}

export const GoogleCloudDialogflowCxV3SafetySettingsRaiSettings: Schema.Schema<GoogleCloudDialogflowCxV3SafetySettingsRaiSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      categoryFilters: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowCxV3SafetySettingsRaiSettingsCategoryFilter,
        ),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3SafetySettingsRaiSettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SafetySettingsRaiSettings>;

export interface GoogleCloudDialogflowCxV3SafetySettingsPromptSecuritySettings {
  enablePromptSecurity?: boolean;
}

export const GoogleCloudDialogflowCxV3SafetySettingsPromptSecuritySettings: Schema.Schema<GoogleCloudDialogflowCxV3SafetySettingsPromptSecuritySettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enablePromptSecurity: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3SafetySettingsPromptSecuritySettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SafetySettingsPromptSecuritySettings>;

export interface GoogleCloudDialogflowCxV3SafetySettings {
  defaultBannedPhraseMatchStrategy?:
    | "PHRASE_MATCH_STRATEGY_UNSPECIFIED"
    | "PARTIAL_MATCH"
    | "WORD_MATCH"
    | (string & {});
  bannedPhrases?: Array<GoogleCloudDialogflowCxV3SafetySettingsPhrase>;
  raiSettings?: GoogleCloudDialogflowCxV3SafetySettingsRaiSettings;
  defaultRaiSettings?: GoogleCloudDialogflowCxV3SafetySettingsRaiSettings;
  promptSecuritySettings?: GoogleCloudDialogflowCxV3SafetySettingsPromptSecuritySettings;
}

export const GoogleCloudDialogflowCxV3SafetySettings: Schema.Schema<GoogleCloudDialogflowCxV3SafetySettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      defaultBannedPhraseMatchStrategy: Schema.optional(Schema.String),
      bannedPhrases: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3SafetySettingsPhrase),
      ),
      raiSettings: Schema.optional(
        GoogleCloudDialogflowCxV3SafetySettingsRaiSettings,
      ),
      defaultRaiSettings: Schema.optional(
        GoogleCloudDialogflowCxV3SafetySettingsRaiSettings,
      ),
      promptSecuritySettings: Schema.optional(
        GoogleCloudDialogflowCxV3SafetySettingsPromptSecuritySettings,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3SafetySettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SafetySettings>;

export interface GoogleCloudDialogflowCxV3GenerativeSettingsKnowledgeConnectorSettings {
  business?: string;
  agent?: string;
  agentIdentity?: string;
  businessDescription?: string;
  agentScope?: string;
  disableDataStoreFallback?: boolean;
}

export const GoogleCloudDialogflowCxV3GenerativeSettingsKnowledgeConnectorSettings: Schema.Schema<GoogleCloudDialogflowCxV3GenerativeSettingsKnowledgeConnectorSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      business: Schema.optional(Schema.String),
      agent: Schema.optional(Schema.String),
      agentIdentity: Schema.optional(Schema.String),
      businessDescription: Schema.optional(Schema.String),
      agentScope: Schema.optional(Schema.String),
      disableDataStoreFallback: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3GenerativeSettingsKnowledgeConnectorSettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3GenerativeSettingsKnowledgeConnectorSettings>;

export interface GoogleCloudDialogflowCxV3LlmModelSettings {
  model?: string;
  promptText?: string;
}

export const GoogleCloudDialogflowCxV3LlmModelSettings: Schema.Schema<GoogleCloudDialogflowCxV3LlmModelSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      model: Schema.optional(Schema.String),
      promptText: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3LlmModelSettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3LlmModelSettings>;

export interface GoogleCloudDialogflowCxV3GenerativeSettings {
  name?: string;
  fallbackSettings?: GoogleCloudDialogflowCxV3GenerativeSettingsFallbackSettings;
  generativeSafetySettings?: GoogleCloudDialogflowCxV3SafetySettings;
  knowledgeConnectorSettings?: GoogleCloudDialogflowCxV3GenerativeSettingsKnowledgeConnectorSettings;
  languageCode?: string;
  llmModelSettings?: GoogleCloudDialogflowCxV3LlmModelSettings;
}

export const GoogleCloudDialogflowCxV3GenerativeSettings: Schema.Schema<GoogleCloudDialogflowCxV3GenerativeSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      fallbackSettings: Schema.optional(
        GoogleCloudDialogflowCxV3GenerativeSettingsFallbackSettings,
      ),
      generativeSafetySettings: Schema.optional(
        GoogleCloudDialogflowCxV3SafetySettings,
      ),
      knowledgeConnectorSettings: Schema.optional(
        GoogleCloudDialogflowCxV3GenerativeSettingsKnowledgeConnectorSettings,
      ),
      languageCode: Schema.optional(Schema.String),
      llmModelSettings: Schema.optional(
        GoogleCloudDialogflowCxV3LlmModelSettings,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3GenerativeSettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3GenerativeSettings>;

export interface GoogleCloudDialogflowCxV3Changelog {
  name?: string;
  userEmail?: string;
  displayName?: string;
  action?: string;
  type?: string;
  resource?: string;
  createTime?: string;
  languageCode?: string;
}

export const GoogleCloudDialogflowCxV3Changelog: Schema.Schema<GoogleCloudDialogflowCxV3Changelog> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      userEmail: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      action: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      resource: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      languageCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3Changelog",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Changelog>;

export interface GoogleCloudDialogflowCxV3ListChangelogsResponse {
  changelogs?: Array<GoogleCloudDialogflowCxV3Changelog>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListChangelogsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListChangelogsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      changelogs: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3Changelog),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ListChangelogsResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListChangelogsResponse>;

export interface GoogleCloudDialogflowCxV3DeploymentResult {
  deploymentTestResults?: Array<string>;
  experiment?: string;
}

export const GoogleCloudDialogflowCxV3DeploymentResult: Schema.Schema<GoogleCloudDialogflowCxV3DeploymentResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      deploymentTestResults: Schema.optional(Schema.Array(Schema.String)),
      experiment: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3DeploymentResult",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DeploymentResult>;

export interface GoogleCloudDialogflowCxV3Deployment {
  name?: string;
  flowVersion?: string;
  state?:
    | "STATE_UNSPECIFIED"
    | "RUNNING"
    | "SUCCEEDED"
    | "FAILED"
    | (string & {});
  result?: GoogleCloudDialogflowCxV3DeploymentResult;
  startTime?: string;
  endTime?: string;
}

export const GoogleCloudDialogflowCxV3Deployment: Schema.Schema<GoogleCloudDialogflowCxV3Deployment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      flowVersion: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      result: Schema.optional(GoogleCloudDialogflowCxV3DeploymentResult),
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3Deployment",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Deployment>;

export interface GoogleCloudDialogflowCxV3ListDeploymentsResponse {
  deployments?: Array<GoogleCloudDialogflowCxV3Deployment>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListDeploymentsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListDeploymentsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      deployments: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3Deployment),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ListDeploymentsResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListDeploymentsResponse>;

export interface GoogleCloudDialogflowCxV3EntityTypeEntity {
  value?: string;
  synonyms?: Array<string>;
}

export const GoogleCloudDialogflowCxV3EntityTypeEntity: Schema.Schema<GoogleCloudDialogflowCxV3EntityTypeEntity> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
      synonyms: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3EntityTypeEntity",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3EntityTypeEntity>;

export interface GoogleCloudDialogflowCxV3EntityTypeExcludedPhrase {
  value?: string;
}

export const GoogleCloudDialogflowCxV3EntityTypeExcludedPhrase: Schema.Schema<GoogleCloudDialogflowCxV3EntityTypeExcludedPhrase> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3EntityTypeExcludedPhrase",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3EntityTypeExcludedPhrase>;

export interface GoogleCloudDialogflowCxV3EntityType {
  name?: string;
  displayName?: string;
  kind?:
    | "KIND_UNSPECIFIED"
    | "KIND_MAP"
    | "KIND_LIST"
    | "KIND_REGEXP"
    | (string & {});
  autoExpansionMode?:
    | "AUTO_EXPANSION_MODE_UNSPECIFIED"
    | "AUTO_EXPANSION_MODE_DEFAULT"
    | (string & {});
  entities?: Array<GoogleCloudDialogflowCxV3EntityTypeEntity>;
  excludedPhrases?: Array<GoogleCloudDialogflowCxV3EntityTypeExcludedPhrase>;
  enableFuzzyExtraction?: boolean;
  redact?: boolean;
}

export const GoogleCloudDialogflowCxV3EntityType: Schema.Schema<GoogleCloudDialogflowCxV3EntityType> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      autoExpansionMode: Schema.optional(Schema.String),
      entities: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3EntityTypeEntity),
      ),
      excludedPhrases: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3EntityTypeExcludedPhrase),
      ),
      enableFuzzyExtraction: Schema.optional(Schema.Boolean),
      redact: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3EntityType",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3EntityType>;

export interface GoogleCloudDialogflowCxV3ListEntityTypesResponse {
  entityTypes?: Array<GoogleCloudDialogflowCxV3EntityType>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListEntityTypesResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListEntityTypesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entityTypes: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3EntityType),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ListEntityTypesResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListEntityTypesResponse>;

export interface GoogleCloudDialogflowCxV3ExportEntityTypesRequest {
  entityTypes?: Array<string>;
  entityTypesUri?: string;
  entityTypesContentInline?: boolean;
  dataFormat?:
    | "DATA_FORMAT_UNSPECIFIED"
    | "BLOB"
    | "JSON_PACKAGE"
    | (string & {});
  languageCode?: string;
}

export const GoogleCloudDialogflowCxV3ExportEntityTypesRequest: Schema.Schema<GoogleCloudDialogflowCxV3ExportEntityTypesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entityTypes: Schema.optional(Schema.Array(Schema.String)),
      entityTypesUri: Schema.optional(Schema.String),
      entityTypesContentInline: Schema.optional(Schema.Boolean),
      dataFormat: Schema.optional(Schema.String),
      languageCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ExportEntityTypesRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportEntityTypesRequest>;

export interface GoogleCloudDialogflowCxV3InlineSource {
  content?: string;
}

export const GoogleCloudDialogflowCxV3InlineSource: Schema.Schema<GoogleCloudDialogflowCxV3InlineSource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      content: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3InlineSource",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3InlineSource>;

export interface GoogleCloudDialogflowCxV3ImportEntityTypesRequest {
  entityTypesUri?: string;
  entityTypesContent?: GoogleCloudDialogflowCxV3InlineSource;
  mergeOption?:
    | "MERGE_OPTION_UNSPECIFIED"
    | "REPLACE"
    | "MERGE"
    | "RENAME"
    | "REPORT_CONFLICT"
    | "KEEP"
    | (string & {});
  targetEntityType?: string;
}

export const GoogleCloudDialogflowCxV3ImportEntityTypesRequest: Schema.Schema<GoogleCloudDialogflowCxV3ImportEntityTypesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entityTypesUri: Schema.optional(Schema.String),
      entityTypesContent: Schema.optional(
        GoogleCloudDialogflowCxV3InlineSource,
      ),
      mergeOption: Schema.optional(Schema.String),
      targetEntityType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ImportEntityTypesRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportEntityTypesRequest>;

export interface GoogleCloudDialogflowCxV3IntentTrainingPhrasePart {
  text?: string;
  parameterId?: string;
}

export const GoogleCloudDialogflowCxV3IntentTrainingPhrasePart: Schema.Schema<GoogleCloudDialogflowCxV3IntentTrainingPhrasePart> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
      parameterId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3IntentTrainingPhrasePart",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3IntentTrainingPhrasePart>;

export interface GoogleCloudDialogflowCxV3IntentTrainingPhrase {
  id?: string;
  parts?: Array<GoogleCloudDialogflowCxV3IntentTrainingPhrasePart>;
  repeatCount?: number;
}

export const GoogleCloudDialogflowCxV3IntentTrainingPhrase: Schema.Schema<GoogleCloudDialogflowCxV3IntentTrainingPhrase> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      parts: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3IntentTrainingPhrasePart),
      ),
      repeatCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3IntentTrainingPhrase",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3IntentTrainingPhrase>;

export interface GoogleCloudDialogflowCxV3IntentParameter {
  id?: string;
  entityType?: string;
  isList?: boolean;
  redact?: boolean;
}

export const GoogleCloudDialogflowCxV3IntentParameter: Schema.Schema<GoogleCloudDialogflowCxV3IntentParameter> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      entityType: Schema.optional(Schema.String),
      isList: Schema.optional(Schema.Boolean),
      redact: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3IntentParameter",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3IntentParameter>;

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

export const GoogleCloudDialogflowCxV3Intent: Schema.Schema<GoogleCloudDialogflowCxV3Intent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      trainingPhrases: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3IntentTrainingPhrase),
      ),
      parameters: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3IntentParameter),
      ),
      priority: Schema.optional(Schema.Number),
      isFallback: Schema.optional(Schema.Boolean),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3Intent",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Intent>;

export interface GoogleCloudDialogflowCxV3ListIntentsResponse {
  intents?: Array<GoogleCloudDialogflowCxV3Intent>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListIntentsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListIntentsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      intents: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Intent)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ListIntentsResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListIntentsResponse>;

export interface GoogleCloudDialogflowCxV3ImportIntentsRequest {
  intentsUri?: string;
  intentsContent?: GoogleCloudDialogflowCxV3InlineSource;
  mergeOption?:
    | "MERGE_OPTION_UNSPECIFIED"
    | "REJECT"
    | "REPLACE"
    | "MERGE"
    | "RENAME"
    | "REPORT_CONFLICT"
    | "KEEP"
    | (string & {});
}

export const GoogleCloudDialogflowCxV3ImportIntentsRequest: Schema.Schema<GoogleCloudDialogflowCxV3ImportIntentsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      intentsUri: Schema.optional(Schema.String),
      intentsContent: Schema.optional(GoogleCloudDialogflowCxV3InlineSource),
      mergeOption: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ImportIntentsRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportIntentsRequest>;

export interface GoogleCloudDialogflowCxV3ExportIntentsRequest {
  intents?: Array<string>;
  intentsUri?: string;
  intentsContentInline?: boolean;
  dataFormat?:
    | "DATA_FORMAT_UNSPECIFIED"
    | "BLOB"
    | "JSON"
    | "CSV"
    | (string & {});
}

export const GoogleCloudDialogflowCxV3ExportIntentsRequest: Schema.Schema<GoogleCloudDialogflowCxV3ExportIntentsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      intents: Schema.optional(Schema.Array(Schema.String)),
      intentsUri: Schema.optional(Schema.String),
      intentsContentInline: Schema.optional(Schema.Boolean),
      dataFormat: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ExportIntentsRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportIntentsRequest>;

export interface GoogleCloudDialogflowCxV3SessionEntityType {
  name?: string;
  entityOverrideMode?:
    | "ENTITY_OVERRIDE_MODE_UNSPECIFIED"
    | "ENTITY_OVERRIDE_MODE_OVERRIDE"
    | "ENTITY_OVERRIDE_MODE_SUPPLEMENT"
    | (string & {});
  entities?: Array<GoogleCloudDialogflowCxV3EntityTypeEntity>;
}

export const GoogleCloudDialogflowCxV3SessionEntityType: Schema.Schema<GoogleCloudDialogflowCxV3SessionEntityType> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      entityOverrideMode: Schema.optional(Schema.String),
      entities: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3EntityTypeEntity),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3SessionEntityType",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SessionEntityType>;

export interface GoogleCloudDialogflowCxV3ListSessionEntityTypesResponse {
  sessionEntityTypes?: Array<GoogleCloudDialogflowCxV3SessionEntityType>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListSessionEntityTypesResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListSessionEntityTypesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sessionEntityTypes: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3SessionEntityType),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ListSessionEntityTypesResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListSessionEntityTypesResponse>;

export interface GoogleTypeLatLng {
  latitude?: number;
  longitude?: number;
}

export const GoogleTypeLatLng: Schema.Schema<GoogleTypeLatLng> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      latitude: Schema.optional(Schema.Number),
      longitude: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleTypeLatLng",
  }) as any as Schema.Schema<GoogleTypeLatLng>;

export interface GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpecBoostControlSpecControlPoint {
  attributeValue?: string;
  boostAmount?: number;
}

export const GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpecBoostControlSpecControlPoint: Schema.Schema<GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpecBoostControlSpecControlPoint> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      attributeValue: Schema.optional(Schema.String),
      boostAmount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpecBoostControlSpecControlPoint",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpecBoostControlSpecControlPoint>;

export interface GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpecBoostControlSpec {
  fieldName?: string;
  attributeType?:
    | "ATTRIBUTE_TYPE_UNSPECIFIED"
    | "NUMERICAL"
    | "FRESHNESS"
    | (string & {});
  interpolationType?:
    | "INTERPOLATION_TYPE_UNSPECIFIED"
    | "LINEAR"
    | (string & {});
  controlPoints?: Array<GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpecBoostControlSpecControlPoint>;
}

export const GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpecBoostControlSpec: Schema.Schema<GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpecBoostControlSpec> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fieldName: Schema.optional(Schema.String),
      attributeType: Schema.optional(Schema.String),
      interpolationType: Schema.optional(Schema.String),
      controlPoints: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpecBoostControlSpecControlPoint,
        ),
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpecBoostControlSpec",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpecBoostControlSpec>;

export interface GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpec {
  condition?: string;
  boost?: number;
  boostControlSpec?: GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpecBoostControlSpec;
}

export const GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpec: Schema.Schema<GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpec> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      condition: Schema.optional(Schema.String),
      boost: Schema.optional(Schema.Number),
      boostControlSpec: Schema.optional(
        GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpecBoostControlSpec,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpec",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpec>;

export interface GoogleCloudDialogflowCxV3BoostSpec {
  conditionBoostSpecs?: Array<GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpec>;
}

export const GoogleCloudDialogflowCxV3BoostSpec: Schema.Schema<GoogleCloudDialogflowCxV3BoostSpec> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      conditionBoostSpecs: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3BoostSpecConditionBoostSpec),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3BoostSpec",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3BoostSpec>;

export interface GoogleCloudDialogflowCxV3BoostSpecs {
  dataStores?: Array<string>;
  spec?: Array<GoogleCloudDialogflowCxV3BoostSpec>;
}

export const GoogleCloudDialogflowCxV3BoostSpecs: Schema.Schema<GoogleCloudDialogflowCxV3BoostSpecs> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dataStores: Schema.optional(Schema.Array(Schema.String)),
      spec: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3BoostSpec)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3BoostSpecs",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3BoostSpecs>;

export interface GoogleCloudDialogflowCxV3FilterSpecs {
  dataStores?: Array<string>;
  filter?: string;
}

export const GoogleCloudDialogflowCxV3FilterSpecs: Schema.Schema<GoogleCloudDialogflowCxV3FilterSpecs> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dataStores: Schema.optional(Schema.Array(Schema.String)),
      filter: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3FilterSpecs",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FilterSpecs>;

export interface GoogleCloudDialogflowCxV3SearchConfig {
  boostSpecs?: Array<GoogleCloudDialogflowCxV3BoostSpecs>;
  filterSpecs?: Array<GoogleCloudDialogflowCxV3FilterSpecs>;
}

export const GoogleCloudDialogflowCxV3SearchConfig: Schema.Schema<GoogleCloudDialogflowCxV3SearchConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      boostSpecs: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3BoostSpecs),
      ),
      filterSpecs: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3FilterSpecs),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3SearchConfig",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SearchConfig>;

export interface GoogleCloudDialogflowCxV3QueryParameters {
  timeZone?: string;
  geoLocation?: GoogleTypeLatLng;
  sessionEntityTypes?: Array<GoogleCloudDialogflowCxV3SessionEntityType>;
  payload?: Record<string, unknown>;
  parameters?: Record<string, unknown>;
  parameterScope?: string;
  currentPage?: string;
  disableWebhook?: boolean;
  analyzeQueryTextSentiment?: boolean;
  webhookHeaders?: Record<string, string>;
  flowVersions?: Array<string>;
  currentPlaybook?: string;
  llmModelSettings?: GoogleCloudDialogflowCxV3LlmModelSettings;
  channel?: string;
  sessionTtl?: string;
  endUserMetadata?: Record<string, unknown>;
  searchConfig?: GoogleCloudDialogflowCxV3SearchConfig;
  populateDataStoreConnectionSignals?: boolean;
}

export const GoogleCloudDialogflowCxV3QueryParameters: Schema.Schema<GoogleCloudDialogflowCxV3QueryParameters> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      timeZone: Schema.optional(Schema.String),
      geoLocation: Schema.optional(GoogleTypeLatLng),
      sessionEntityTypes: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3SessionEntityType),
      ),
      payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      parameterScope: Schema.optional(Schema.String),
      currentPage: Schema.optional(Schema.String),
      disableWebhook: Schema.optional(Schema.Boolean),
      analyzeQueryTextSentiment: Schema.optional(Schema.Boolean),
      webhookHeaders: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      flowVersions: Schema.optional(Schema.Array(Schema.String)),
      currentPlaybook: Schema.optional(Schema.String),
      llmModelSettings: Schema.optional(
        GoogleCloudDialogflowCxV3LlmModelSettings,
      ),
      channel: Schema.optional(Schema.String),
      sessionTtl: Schema.optional(Schema.String),
      endUserMetadata: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      searchConfig: Schema.optional(GoogleCloudDialogflowCxV3SearchConfig),
      populateDataStoreConnectionSignals: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3QueryParameters",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3QueryParameters>;

export interface GoogleCloudDialogflowCxV3TextInput {
  text?: string;
}

export const GoogleCloudDialogflowCxV3TextInput: Schema.Schema<GoogleCloudDialogflowCxV3TextInput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3TextInput",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TextInput>;

export interface GoogleCloudDialogflowCxV3IntentInput {
  intent?: string;
}

export const GoogleCloudDialogflowCxV3IntentInput: Schema.Schema<GoogleCloudDialogflowCxV3IntentInput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      intent: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3IntentInput",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3IntentInput>;

export interface GoogleCloudDialogflowCxV3BargeInConfig {
  noBargeInDuration?: string;
  totalDuration?: string;
}

export const GoogleCloudDialogflowCxV3BargeInConfig: Schema.Schema<GoogleCloudDialogflowCxV3BargeInConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      noBargeInDuration: Schema.optional(Schema.String),
      totalDuration: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3BargeInConfig",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3BargeInConfig>;

export interface GoogleCloudDialogflowCxV3InputAudioConfig {
  audioEncoding?:
    | "AUDIO_ENCODING_UNSPECIFIED"
    | "AUDIO_ENCODING_LINEAR_16"
    | "AUDIO_ENCODING_FLAC"
    | "AUDIO_ENCODING_MULAW"
    | "AUDIO_ENCODING_AMR"
    | "AUDIO_ENCODING_AMR_WB"
    | "AUDIO_ENCODING_OGG_OPUS"
    | "AUDIO_ENCODING_SPEEX_WITH_HEADER_BYTE"
    | "AUDIO_ENCODING_ALAW"
    | (string & {});
  sampleRateHertz?: number;
  enableWordInfo?: boolean;
  phraseHints?: Array<string>;
  model?: string;
  modelVariant?:
    | "SPEECH_MODEL_VARIANT_UNSPECIFIED"
    | "USE_BEST_AVAILABLE"
    | "USE_STANDARD"
    | "USE_ENHANCED"
    | (string & {});
  singleUtterance?: boolean;
  bargeInConfig?: GoogleCloudDialogflowCxV3BargeInConfig;
  optOutConformerModelMigration?: boolean;
}

export const GoogleCloudDialogflowCxV3InputAudioConfig: Schema.Schema<GoogleCloudDialogflowCxV3InputAudioConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      audioEncoding: Schema.optional(Schema.String),
      sampleRateHertz: Schema.optional(Schema.Number),
      enableWordInfo: Schema.optional(Schema.Boolean),
      phraseHints: Schema.optional(Schema.Array(Schema.String)),
      model: Schema.optional(Schema.String),
      modelVariant: Schema.optional(Schema.String),
      singleUtterance: Schema.optional(Schema.Boolean),
      bargeInConfig: Schema.optional(GoogleCloudDialogflowCxV3BargeInConfig),
      optOutConformerModelMigration: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3InputAudioConfig",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3InputAudioConfig>;

export interface GoogleCloudDialogflowCxV3AudioInput {
  config?: GoogleCloudDialogflowCxV3InputAudioConfig;
  audio?: string;
}

export const GoogleCloudDialogflowCxV3AudioInput: Schema.Schema<GoogleCloudDialogflowCxV3AudioInput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      config: Schema.optional(GoogleCloudDialogflowCxV3InputAudioConfig),
      audio: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3AudioInput",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AudioInput>;

export interface GoogleCloudDialogflowCxV3EventInput {
  event?: string;
}

export const GoogleCloudDialogflowCxV3EventInput: Schema.Schema<GoogleCloudDialogflowCxV3EventInput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      event: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3EventInput",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3EventInput>;

export interface GoogleCloudDialogflowCxV3DtmfInput {
  digits?: string;
  finishDigit?: string;
}

export const GoogleCloudDialogflowCxV3DtmfInput: Schema.Schema<GoogleCloudDialogflowCxV3DtmfInput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      digits: Schema.optional(Schema.String),
      finishDigit: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3DtmfInput",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DtmfInput>;

export interface GoogleCloudDialogflowCxV3ToolCallResultError {
  message?: string;
}

export const GoogleCloudDialogflowCxV3ToolCallResultError: Schema.Schema<GoogleCloudDialogflowCxV3ToolCallResultError> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ToolCallResultError",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolCallResultError>;

export interface GoogleCloudDialogflowCxV3ToolCallResult {
  tool?: string;
  action?: string;
  error?: GoogleCloudDialogflowCxV3ToolCallResultError;
  outputParameters?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3ToolCallResult: Schema.Schema<GoogleCloudDialogflowCxV3ToolCallResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tool: Schema.optional(Schema.String),
      action: Schema.optional(Schema.String),
      error: Schema.optional(GoogleCloudDialogflowCxV3ToolCallResultError),
      outputParameters: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ToolCallResult",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolCallResult>;

export interface GoogleCloudDialogflowCxV3QueryInput {
  text?: GoogleCloudDialogflowCxV3TextInput;
  intent?: GoogleCloudDialogflowCxV3IntentInput;
  audio?: GoogleCloudDialogflowCxV3AudioInput;
  event?: GoogleCloudDialogflowCxV3EventInput;
  dtmf?: GoogleCloudDialogflowCxV3DtmfInput;
  toolCallResult?: GoogleCloudDialogflowCxV3ToolCallResult;
  languageCode?: string;
}

export const GoogleCloudDialogflowCxV3QueryInput: Schema.Schema<GoogleCloudDialogflowCxV3QueryInput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(GoogleCloudDialogflowCxV3TextInput),
      intent: Schema.optional(GoogleCloudDialogflowCxV3IntentInput),
      audio: Schema.optional(GoogleCloudDialogflowCxV3AudioInput),
      event: Schema.optional(GoogleCloudDialogflowCxV3EventInput),
      dtmf: Schema.optional(GoogleCloudDialogflowCxV3DtmfInput),
      toolCallResult: Schema.optional(GoogleCloudDialogflowCxV3ToolCallResult),
      languageCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3QueryInput",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3QueryInput>;

export interface GoogleCloudDialogflowCxV3OutputAudioConfig {
  audioEncoding?:
    | "OUTPUT_AUDIO_ENCODING_UNSPECIFIED"
    | "OUTPUT_AUDIO_ENCODING_LINEAR_16"
    | "OUTPUT_AUDIO_ENCODING_MP3"
    | "OUTPUT_AUDIO_ENCODING_MP3_64_KBPS"
    | "OUTPUT_AUDIO_ENCODING_OGG_OPUS"
    | "OUTPUT_AUDIO_ENCODING_MULAW"
    | "OUTPUT_AUDIO_ENCODING_ALAW"
    | (string & {});
  sampleRateHertz?: number;
  synthesizeSpeechConfig?: GoogleCloudDialogflowCxV3SynthesizeSpeechConfig;
}

export const GoogleCloudDialogflowCxV3OutputAudioConfig: Schema.Schema<GoogleCloudDialogflowCxV3OutputAudioConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      audioEncoding: Schema.optional(Schema.String),
      sampleRateHertz: Schema.optional(Schema.Number),
      synthesizeSpeechConfig: Schema.optional(
        GoogleCloudDialogflowCxV3SynthesizeSpeechConfig,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3OutputAudioConfig",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3OutputAudioConfig>;

export interface GoogleCloudDialogflowCxV3DetectIntentRequest {
  queryParams?: GoogleCloudDialogflowCxV3QueryParameters;
  queryInput?: GoogleCloudDialogflowCxV3QueryInput;
  outputAudioConfig?: GoogleCloudDialogflowCxV3OutputAudioConfig;
  responseView?:
    | "DETECT_INTENT_RESPONSE_VIEW_UNSPECIFIED"
    | "DETECT_INTENT_RESPONSE_VIEW_FULL"
    | "DETECT_INTENT_RESPONSE_VIEW_BASIC"
    | "DETECT_INTENT_RESPONSE_VIEW_DEFAULT"
    | (string & {});
}

export const GoogleCloudDialogflowCxV3DetectIntentRequest: Schema.Schema<GoogleCloudDialogflowCxV3DetectIntentRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      queryParams: Schema.optional(GoogleCloudDialogflowCxV3QueryParameters),
      queryInput: Schema.optional(GoogleCloudDialogflowCxV3QueryInput),
      outputAudioConfig: Schema.optional(
        GoogleCloudDialogflowCxV3OutputAudioConfig,
      ),
      responseView: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3DetectIntentRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DetectIntentRequest>;

export interface GoogleCloudDialogflowCxV3Match {
  intent?: GoogleCloudDialogflowCxV3Intent;
  event?: string;
  parameters?: Record<string, unknown>;
  resolvedInput?: string;
  matchType?:
    | "MATCH_TYPE_UNSPECIFIED"
    | "INTENT"
    | "DIRECT_INTENT"
    | "PARAMETER_FILLING"
    | "NO_MATCH"
    | "NO_INPUT"
    | "EVENT"
    | "KNOWLEDGE_CONNECTOR"
    | "PLAYBOOK"
    | (string & {});
  confidence?: number;
}

export const GoogleCloudDialogflowCxV3Match: Schema.Schema<GoogleCloudDialogflowCxV3Match> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      intent: Schema.optional(GoogleCloudDialogflowCxV3Intent),
      event: Schema.optional(Schema.String),
      parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      resolvedInput: Schema.optional(Schema.String),
      matchType: Schema.optional(Schema.String),
      confidence: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3Match",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Match>;

export interface GoogleCloudDialogflowCxV3SentimentAnalysisResult {
  score?: number;
  magnitude?: number;
}

export const GoogleCloudDialogflowCxV3SentimentAnalysisResult: Schema.Schema<GoogleCloudDialogflowCxV3SentimentAnalysisResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      score: Schema.optional(Schema.Number),
      magnitude: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3SentimentAnalysisResult",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SentimentAnalysisResult>;

export interface GoogleCloudDialogflowCxV3DataStoreConnectionSignalsRewriterModelCallSignals {
  renderedPrompt?: string;
  modelOutput?: string;
  model?: string;
}

export const GoogleCloudDialogflowCxV3DataStoreConnectionSignalsRewriterModelCallSignals: Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsRewriterModelCallSignals> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      renderedPrompt: Schema.optional(Schema.String),
      modelOutput: Schema.optional(Schema.String),
      model: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3DataStoreConnectionSignalsRewriterModelCallSignals",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsRewriterModelCallSignals>;

export interface GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSearchSnippet {
  documentTitle?: string;
  documentUri?: string;
  text?: string;
  metadata?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSearchSnippet: Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSearchSnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      documentTitle: Schema.optional(Schema.String),
      documentUri: Schema.optional(Schema.String),
      text: Schema.optional(Schema.String),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSearchSnippet",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSearchSnippet>;

export interface GoogleCloudDialogflowCxV3DataStoreConnectionSignalsAnswerGenerationModelCallSignals {
  renderedPrompt?: string;
  modelOutput?: string;
  model?: string;
}

export const GoogleCloudDialogflowCxV3DataStoreConnectionSignalsAnswerGenerationModelCallSignals: Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsAnswerGenerationModelCallSignals> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      renderedPrompt: Schema.optional(Schema.String),
      modelOutput: Schema.optional(Schema.String),
      model: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3DataStoreConnectionSignalsAnswerGenerationModelCallSignals",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsAnswerGenerationModelCallSignals>;

export interface GoogleCloudDialogflowCxV3DataStoreConnectionSignalsAnswerPart {
  text?: string;
  supportingIndices?: Array<number>;
}

export const GoogleCloudDialogflowCxV3DataStoreConnectionSignalsAnswerPart: Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsAnswerPart> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
      supportingIndices: Schema.optional(Schema.Array(Schema.Number)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3DataStoreConnectionSignalsAnswerPart",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsAnswerPart>;

export interface GoogleCloudDialogflowCxV3DataStoreConnectionSignalsCitedSnippet {
  searchSnippet?: GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSearchSnippet;
  snippetIndex?: number;
}

export const GoogleCloudDialogflowCxV3DataStoreConnectionSignalsCitedSnippet: Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsCitedSnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      searchSnippet: Schema.optional(
        GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSearchSnippet,
      ),
      snippetIndex: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3DataStoreConnectionSignalsCitedSnippet",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsCitedSnippet>;

export interface GoogleCloudDialogflowCxV3DataStoreConnectionSignalsGroundingSignals {
  decision?:
    | "GROUNDING_DECISION_UNSPECIFIED"
    | "ACCEPTED_BY_GROUNDING"
    | "REJECTED_BY_GROUNDING"
    | (string & {});
  score?:
    | "GROUNDING_SCORE_BUCKET_UNSPECIFIED"
    | "VERY_LOW"
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "VERY_HIGH"
    | (string & {});
}

export const GoogleCloudDialogflowCxV3DataStoreConnectionSignalsGroundingSignals: Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsGroundingSignals> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      decision: Schema.optional(Schema.String),
      score: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3DataStoreConnectionSignalsGroundingSignals",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsGroundingSignals>;

export interface GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSafetySignals {
  decision?:
    | "SAFETY_DECISION_UNSPECIFIED"
    | "ACCEPTED_BY_SAFETY_CHECK"
    | "REJECTED_BY_SAFETY_CHECK"
    | (string & {});
  bannedPhraseMatch?:
    | "BANNED_PHRASE_MATCH_UNSPECIFIED"
    | "BANNED_PHRASE_MATCH_NONE"
    | "BANNED_PHRASE_MATCH_QUERY"
    | "BANNED_PHRASE_MATCH_RESPONSE"
    | (string & {});
  matchedBannedPhrase?: string;
}

export const GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSafetySignals: Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSafetySignals> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      decision: Schema.optional(Schema.String),
      bannedPhraseMatch: Schema.optional(Schema.String),
      matchedBannedPhrase: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSafetySignals",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSafetySignals>;

export interface GoogleCloudDialogflowCxV3DataStoreConnectionSignals {
  rewriterModelCallSignals?: GoogleCloudDialogflowCxV3DataStoreConnectionSignalsRewriterModelCallSignals;
  rewrittenQuery?: string;
  searchSnippets?: Array<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSearchSnippet>;
  answerGenerationModelCallSignals?: GoogleCloudDialogflowCxV3DataStoreConnectionSignalsAnswerGenerationModelCallSignals;
  answer?: string;
  answerParts?: Array<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsAnswerPart>;
  citedSnippets?: Array<GoogleCloudDialogflowCxV3DataStoreConnectionSignalsCitedSnippet>;
  groundingSignals?: GoogleCloudDialogflowCxV3DataStoreConnectionSignalsGroundingSignals;
  safetySignals?: GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSafetySignals;
}

export const GoogleCloudDialogflowCxV3DataStoreConnectionSignals: Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignals> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rewriterModelCallSignals: Schema.optional(
        GoogleCloudDialogflowCxV3DataStoreConnectionSignalsRewriterModelCallSignals,
      ),
      rewrittenQuery: Schema.optional(Schema.String),
      searchSnippets: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSearchSnippet,
        ),
      ),
      answerGenerationModelCallSignals: Schema.optional(
        GoogleCloudDialogflowCxV3DataStoreConnectionSignalsAnswerGenerationModelCallSignals,
      ),
      answer: Schema.optional(Schema.String),
      answerParts: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowCxV3DataStoreConnectionSignalsAnswerPart,
        ),
      ),
      citedSnippets: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowCxV3DataStoreConnectionSignalsCitedSnippet,
        ),
      ),
      groundingSignals: Schema.optional(
        GoogleCloudDialogflowCxV3DataStoreConnectionSignalsGroundingSignals,
      ),
      safetySignals: Schema.optional(
        GoogleCloudDialogflowCxV3DataStoreConnectionSignalsSafetySignals,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3DataStoreConnectionSignals",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DataStoreConnectionSignals>;

export interface GoogleCloudDialogflowCxV3QueryResult {
  text?: string;
  triggerIntent?: string;
  transcript?: string;
  triggerEvent?: string;
  dtmf?: GoogleCloudDialogflowCxV3DtmfInput;
  languageCode?: string;
  parameters?: Record<string, unknown>;
  responseMessages?: Array<GoogleCloudDialogflowCxV3ResponseMessage>;
  webhookStatuses?: Array<GoogleRpcStatus>;
  webhookPayloads?: Array<Record<string, unknown>>;
  currentPage?: GoogleCloudDialogflowCxV3Page;
  currentFlow?: GoogleCloudDialogflowCxV3Flow;
  intent?: GoogleCloudDialogflowCxV3Intent;
  intentDetectionConfidence?: number;
  match?: GoogleCloudDialogflowCxV3Match;
  diagnosticInfo?: Record<string, unknown>;
  sentimentAnalysisResult?: GoogleCloudDialogflowCxV3SentimentAnalysisResult;
  advancedSettings?: GoogleCloudDialogflowCxV3AdvancedSettings;
  allowAnswerFeedback?: boolean;
  dataStoreConnectionSignals?: GoogleCloudDialogflowCxV3DataStoreConnectionSignals;
}

export const GoogleCloudDialogflowCxV3QueryResult: Schema.Schema<GoogleCloudDialogflowCxV3QueryResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
      triggerIntent: Schema.optional(Schema.String),
      transcript: Schema.optional(Schema.String),
      triggerEvent: Schema.optional(Schema.String),
      dtmf: Schema.optional(GoogleCloudDialogflowCxV3DtmfInput),
      languageCode: Schema.optional(Schema.String),
      parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      responseMessages: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3ResponseMessage),
      ),
      webhookStatuses: Schema.optional(Schema.Array(GoogleRpcStatus)),
      webhookPayloads: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
      currentPage: Schema.optional(GoogleCloudDialogflowCxV3Page),
      currentFlow: Schema.optional(GoogleCloudDialogflowCxV3Flow),
      intent: Schema.optional(GoogleCloudDialogflowCxV3Intent),
      intentDetectionConfidence: Schema.optional(Schema.Number),
      match: Schema.optional(GoogleCloudDialogflowCxV3Match),
      diagnosticInfo: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      sentimentAnalysisResult: Schema.optional(
        GoogleCloudDialogflowCxV3SentimentAnalysisResult,
      ),
      advancedSettings: Schema.optional(
        GoogleCloudDialogflowCxV3AdvancedSettings,
      ),
      allowAnswerFeedback: Schema.optional(Schema.Boolean),
      dataStoreConnectionSignals: Schema.optional(
        GoogleCloudDialogflowCxV3DataStoreConnectionSignals,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3QueryResult",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3QueryResult>;

export interface GoogleCloudDialogflowCxV3DetectIntentResponse {
  responseId?: string;
  queryResult?: GoogleCloudDialogflowCxV3QueryResult;
  outputAudio?: string;
  outputAudioConfig?: GoogleCloudDialogflowCxV3OutputAudioConfig;
  responseType?:
    | "RESPONSE_TYPE_UNSPECIFIED"
    | "PARTIAL"
    | "FINAL"
    | (string & {});
  allowCancellation?: boolean;
}

export const GoogleCloudDialogflowCxV3DetectIntentResponse: Schema.Schema<GoogleCloudDialogflowCxV3DetectIntentResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      responseId: Schema.optional(Schema.String),
      queryResult: Schema.optional(GoogleCloudDialogflowCxV3QueryResult),
      outputAudio: Schema.optional(Schema.String),
      outputAudioConfig: Schema.optional(
        GoogleCloudDialogflowCxV3OutputAudioConfig,
      ),
      responseType: Schema.optional(Schema.String),
      allowCancellation: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3DetectIntentResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DetectIntentResponse>;

export interface GoogleCloudDialogflowCxV3MatchIntentRequest {
  queryParams?: GoogleCloudDialogflowCxV3QueryParameters;
  queryInput?: GoogleCloudDialogflowCxV3QueryInput;
  persistParameterChanges?: boolean;
}

export const GoogleCloudDialogflowCxV3MatchIntentRequest: Schema.Schema<GoogleCloudDialogflowCxV3MatchIntentRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      queryParams: Schema.optional(GoogleCloudDialogflowCxV3QueryParameters),
      queryInput: Schema.optional(GoogleCloudDialogflowCxV3QueryInput),
      persistParameterChanges: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3MatchIntentRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3MatchIntentRequest>;

export interface GoogleCloudDialogflowCxV3MatchIntentResponse {
  text?: string;
  triggerIntent?: string;
  transcript?: string;
  triggerEvent?: string;
  matches?: Array<GoogleCloudDialogflowCxV3Match>;
  currentPage?: GoogleCloudDialogflowCxV3Page;
}

export const GoogleCloudDialogflowCxV3MatchIntentResponse: Schema.Schema<GoogleCloudDialogflowCxV3MatchIntentResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
      triggerIntent: Schema.optional(Schema.String),
      transcript: Schema.optional(Schema.String),
      triggerEvent: Schema.optional(Schema.String),
      matches: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Match)),
      currentPage: Schema.optional(GoogleCloudDialogflowCxV3Page),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3MatchIntentResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3MatchIntentResponse>;

export interface GoogleCloudDialogflowCxV3FulfillIntentRequest {
  matchIntentRequest?: GoogleCloudDialogflowCxV3MatchIntentRequest;
  match?: GoogleCloudDialogflowCxV3Match;
  outputAudioConfig?: GoogleCloudDialogflowCxV3OutputAudioConfig;
}

export const GoogleCloudDialogflowCxV3FulfillIntentRequest: Schema.Schema<GoogleCloudDialogflowCxV3FulfillIntentRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      matchIntentRequest: Schema.optional(
        GoogleCloudDialogflowCxV3MatchIntentRequest,
      ),
      match: Schema.optional(GoogleCloudDialogflowCxV3Match),
      outputAudioConfig: Schema.optional(
        GoogleCloudDialogflowCxV3OutputAudioConfig,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3FulfillIntentRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FulfillIntentRequest>;

export interface GoogleCloudDialogflowCxV3FulfillIntentResponse {
  responseId?: string;
  queryResult?: GoogleCloudDialogflowCxV3QueryResult;
  outputAudio?: string;
  outputAudioConfig?: GoogleCloudDialogflowCxV3OutputAudioConfig;
}

export const GoogleCloudDialogflowCxV3FulfillIntentResponse: Schema.Schema<GoogleCloudDialogflowCxV3FulfillIntentResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      responseId: Schema.optional(Schema.String),
      queryResult: Schema.optional(GoogleCloudDialogflowCxV3QueryResult),
      outputAudio: Schema.optional(Schema.String),
      outputAudioConfig: Schema.optional(
        GoogleCloudDialogflowCxV3OutputAudioConfig,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3FulfillIntentResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FulfillIntentResponse>;

export interface GoogleCloudDialogflowCxV3AnswerFeedbackRatingReason {
  reasonLabels?: Array<string>;
  feedback?: string;
}

export const GoogleCloudDialogflowCxV3AnswerFeedbackRatingReason: Schema.Schema<GoogleCloudDialogflowCxV3AnswerFeedbackRatingReason> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      reasonLabels: Schema.optional(Schema.Array(Schema.String)),
      feedback: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3AnswerFeedbackRatingReason",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AnswerFeedbackRatingReason>;

export interface GoogleCloudDialogflowCxV3AnswerFeedback {
  rating?: "RATING_UNSPECIFIED" | "THUMBS_UP" | "THUMBS_DOWN" | (string & {});
  ratingReason?: GoogleCloudDialogflowCxV3AnswerFeedbackRatingReason;
  customRating?: string;
}

export const GoogleCloudDialogflowCxV3AnswerFeedback: Schema.Schema<GoogleCloudDialogflowCxV3AnswerFeedback> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rating: Schema.optional(Schema.String),
      ratingReason: Schema.optional(
        GoogleCloudDialogflowCxV3AnswerFeedbackRatingReason,
      ),
      customRating: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3AnswerFeedback",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AnswerFeedback>;

export interface GoogleCloudDialogflowCxV3SubmitAnswerFeedbackRequest {
  responseId?: string;
  answerFeedback?: GoogleCloudDialogflowCxV3AnswerFeedback;
  updateMask?: string;
}

export const GoogleCloudDialogflowCxV3SubmitAnswerFeedbackRequest: Schema.Schema<GoogleCloudDialogflowCxV3SubmitAnswerFeedbackRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      responseId: Schema.optional(Schema.String),
      answerFeedback: Schema.optional(GoogleCloudDialogflowCxV3AnswerFeedback),
      updateMask: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3SubmitAnswerFeedbackRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SubmitAnswerFeedbackRequest>;

export interface GoogleCloudDialogflowCxV3TransitionRouteGroup {
  name?: string;
  displayName?: string;
  transitionRoutes?: Array<GoogleCloudDialogflowCxV3TransitionRoute>;
}

export const GoogleCloudDialogflowCxV3TransitionRouteGroup: Schema.Schema<GoogleCloudDialogflowCxV3TransitionRouteGroup> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      transitionRoutes: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3TransitionRoute),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3TransitionRouteGroup",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TransitionRouteGroup>;

export interface GoogleCloudDialogflowCxV3ListTransitionRouteGroupsResponse {
  transitionRouteGroups?: Array<GoogleCloudDialogflowCxV3TransitionRouteGroup>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListTransitionRouteGroupsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListTransitionRouteGroupsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      transitionRouteGroups: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3TransitionRouteGroup),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ListTransitionRouteGroupsResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListTransitionRouteGroupsResponse>;

export interface GoogleCloudDialogflowCxV3TestConfig {
  trackingParameters?: Array<string>;
  flow?: string;
  page?: string;
}

export const GoogleCloudDialogflowCxV3TestConfig: Schema.Schema<GoogleCloudDialogflowCxV3TestConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      trackingParameters: Schema.optional(Schema.Array(Schema.String)),
      flow: Schema.optional(Schema.String),
      page: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3TestConfig",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TestConfig>;

export interface GoogleCloudDialogflowCxV3ConversationTurnUserInput {
  input?: GoogleCloudDialogflowCxV3QueryInput;
  injectedParameters?: Record<string, unknown>;
  isWebhookEnabled?: boolean;
  enableSentimentAnalysis?: boolean;
}

export const GoogleCloudDialogflowCxV3ConversationTurnUserInput: Schema.Schema<GoogleCloudDialogflowCxV3ConversationTurnUserInput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      input: Schema.optional(GoogleCloudDialogflowCxV3QueryInput),
      injectedParameters: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      isWebhookEnabled: Schema.optional(Schema.Boolean),
      enableSentimentAnalysis: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ConversationTurnUserInput",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ConversationTurnUserInput>;

export interface GoogleCloudDialogflowCxV3TestRunDifference {
  type?:
    | "DIFF_TYPE_UNSPECIFIED"
    | "INTENT"
    | "PAGE"
    | "PARAMETERS"
    | "UTTERANCE"
    | "FLOW"
    | (string & {});
  description?: string;
}

export const GoogleCloudDialogflowCxV3TestRunDifference: Schema.Schema<GoogleCloudDialogflowCxV3TestRunDifference> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3TestRunDifference",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TestRunDifference>;

export interface GoogleCloudDialogflowCxV3ConversationTurnVirtualAgentOutput {
  sessionParameters?: Record<string, unknown>;
  differences?: Array<GoogleCloudDialogflowCxV3TestRunDifference>;
  diagnosticInfo?: Record<string, unknown>;
  triggeredIntent?: GoogleCloudDialogflowCxV3Intent;
  currentPage?: GoogleCloudDialogflowCxV3Page;
  textResponses?: Array<GoogleCloudDialogflowCxV3ResponseMessageText>;
  status?: GoogleRpcStatus;
}

export const GoogleCloudDialogflowCxV3ConversationTurnVirtualAgentOutput: Schema.Schema<GoogleCloudDialogflowCxV3ConversationTurnVirtualAgentOutput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sessionParameters: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      differences: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3TestRunDifference),
      ),
      diagnosticInfo: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      triggeredIntent: Schema.optional(GoogleCloudDialogflowCxV3Intent),
      currentPage: Schema.optional(GoogleCloudDialogflowCxV3Page),
      textResponses: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3ResponseMessageText),
      ),
      status: Schema.optional(GoogleRpcStatus),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ConversationTurnVirtualAgentOutput",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ConversationTurnVirtualAgentOutput>;

export interface GoogleCloudDialogflowCxV3ConversationTurn {
  userInput?: GoogleCloudDialogflowCxV3ConversationTurnUserInput;
  virtualAgentOutput?: GoogleCloudDialogflowCxV3ConversationTurnVirtualAgentOutput;
}

export const GoogleCloudDialogflowCxV3ConversationTurn: Schema.Schema<GoogleCloudDialogflowCxV3ConversationTurn> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      userInput: Schema.optional(
        GoogleCloudDialogflowCxV3ConversationTurnUserInput,
      ),
      virtualAgentOutput: Schema.optional(
        GoogleCloudDialogflowCxV3ConversationTurnVirtualAgentOutput,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ConversationTurn",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ConversationTurn>;

export interface GoogleCloudDialogflowCxV3TestCaseResult {
  name?: string;
  environment?: string;
  conversationTurns?: Array<GoogleCloudDialogflowCxV3ConversationTurn>;
  testResult?: "TEST_RESULT_UNSPECIFIED" | "PASSED" | "FAILED" | (string & {});
  testTime?: string;
}

export const GoogleCloudDialogflowCxV3TestCaseResult: Schema.Schema<GoogleCloudDialogflowCxV3TestCaseResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      environment: Schema.optional(Schema.String),
      conversationTurns: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3ConversationTurn),
      ),
      testResult: Schema.optional(Schema.String),
      testTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3TestCaseResult",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TestCaseResult>;

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

export const GoogleCloudDialogflowCxV3TestCase: Schema.Schema<GoogleCloudDialogflowCxV3TestCase> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      tags: Schema.optional(Schema.Array(Schema.String)),
      displayName: Schema.optional(Schema.String),
      notes: Schema.optional(Schema.String),
      testConfig: Schema.optional(GoogleCloudDialogflowCxV3TestConfig),
      testCaseConversationTurns: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3ConversationTurn),
      ),
      creationTime: Schema.optional(Schema.String),
      lastTestResult: Schema.optional(GoogleCloudDialogflowCxV3TestCaseResult),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3TestCase",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TestCase>;

export interface GoogleCloudDialogflowCxV3ListTestCasesResponse {
  testCases?: Array<GoogleCloudDialogflowCxV3TestCase>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListTestCasesResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListTestCasesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      testCases: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3TestCase),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ListTestCasesResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListTestCasesResponse>;

export interface GoogleCloudDialogflowCxV3BatchDeleteTestCasesRequest {
  names?: Array<string>;
}

export const GoogleCloudDialogflowCxV3BatchDeleteTestCasesRequest: Schema.Schema<GoogleCloudDialogflowCxV3BatchDeleteTestCasesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      names: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3BatchDeleteTestCasesRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3BatchDeleteTestCasesRequest>;

export interface GoogleCloudDialogflowCxV3RunTestCaseRequest {
  environment?: string;
}

export const GoogleCloudDialogflowCxV3RunTestCaseRequest: Schema.Schema<GoogleCloudDialogflowCxV3RunTestCaseRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      environment: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3RunTestCaseRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RunTestCaseRequest>;

export interface GoogleCloudDialogflowCxV3BatchRunTestCasesRequest {
  environment?: string;
  testCases?: Array<string>;
}

export const GoogleCloudDialogflowCxV3BatchRunTestCasesRequest: Schema.Schema<GoogleCloudDialogflowCxV3BatchRunTestCasesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      environment: Schema.optional(Schema.String),
      testCases: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3BatchRunTestCasesRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3BatchRunTestCasesRequest>;

export interface GoogleCloudDialogflowCxV3IntentCoverageIntent {
  intent?: string;
  covered?: boolean;
}

export const GoogleCloudDialogflowCxV3IntentCoverageIntent: Schema.Schema<GoogleCloudDialogflowCxV3IntentCoverageIntent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      intent: Schema.optional(Schema.String),
      covered: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3IntentCoverageIntent",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3IntentCoverageIntent>;

export interface GoogleCloudDialogflowCxV3IntentCoverage {
  intents?: Array<GoogleCloudDialogflowCxV3IntentCoverageIntent>;
  coverageScore?: number;
}

export const GoogleCloudDialogflowCxV3IntentCoverage: Schema.Schema<GoogleCloudDialogflowCxV3IntentCoverage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      intents: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3IntentCoverageIntent),
      ),
      coverageScore: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3IntentCoverage",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3IntentCoverage>;

export interface GoogleCloudDialogflowCxV3TransitionCoverageTransitionNode {
  page?: GoogleCloudDialogflowCxV3Page;
  flow?: GoogleCloudDialogflowCxV3Flow;
}

export const GoogleCloudDialogflowCxV3TransitionCoverageTransitionNode: Schema.Schema<GoogleCloudDialogflowCxV3TransitionCoverageTransitionNode> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      page: Schema.optional(GoogleCloudDialogflowCxV3Page),
      flow: Schema.optional(GoogleCloudDialogflowCxV3Flow),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3TransitionCoverageTransitionNode",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TransitionCoverageTransitionNode>;

export interface GoogleCloudDialogflowCxV3TransitionCoverageTransition {
  source?: GoogleCloudDialogflowCxV3TransitionCoverageTransitionNode;
  index?: number;
  target?: GoogleCloudDialogflowCxV3TransitionCoverageTransitionNode;
  covered?: boolean;
  transitionRoute?: GoogleCloudDialogflowCxV3TransitionRoute;
  eventHandler?: GoogleCloudDialogflowCxV3EventHandler;
}

export const GoogleCloudDialogflowCxV3TransitionCoverageTransition: Schema.Schema<GoogleCloudDialogflowCxV3TransitionCoverageTransition> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      source: Schema.optional(
        GoogleCloudDialogflowCxV3TransitionCoverageTransitionNode,
      ),
      index: Schema.optional(Schema.Number),
      target: Schema.optional(
        GoogleCloudDialogflowCxV3TransitionCoverageTransitionNode,
      ),
      covered: Schema.optional(Schema.Boolean),
      transitionRoute: Schema.optional(
        GoogleCloudDialogflowCxV3TransitionRoute,
      ),
      eventHandler: Schema.optional(GoogleCloudDialogflowCxV3EventHandler),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3TransitionCoverageTransition",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TransitionCoverageTransition>;

export interface GoogleCloudDialogflowCxV3TransitionCoverage {
  transitions?: Array<GoogleCloudDialogflowCxV3TransitionCoverageTransition>;
  coverageScore?: number;
}

export const GoogleCloudDialogflowCxV3TransitionCoverage: Schema.Schema<GoogleCloudDialogflowCxV3TransitionCoverage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      transitions: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3TransitionCoverageTransition),
      ),
      coverageScore: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3TransitionCoverage",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TransitionCoverage>;

export interface GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverageTransition {
  transitionRoute?: GoogleCloudDialogflowCxV3TransitionRoute;
  covered?: boolean;
}

export const GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverageTransition: Schema.Schema<GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverageTransition> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      transitionRoute: Schema.optional(
        GoogleCloudDialogflowCxV3TransitionRoute,
      ),
      covered: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverageTransition",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverageTransition>;

export interface GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverage {
  routeGroup?: GoogleCloudDialogflowCxV3TransitionRouteGroup;
  transitions?: Array<GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverageTransition>;
  coverageScore?: number;
}

export const GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverage: Schema.Schema<GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      routeGroup: Schema.optional(
        GoogleCloudDialogflowCxV3TransitionRouteGroup,
      ),
      transitions: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverageTransition,
        ),
      ),
      coverageScore: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverage",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverage>;

export interface GoogleCloudDialogflowCxV3TransitionRouteGroupCoverage {
  coverages?: Array<GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverage>;
  coverageScore?: number;
}

export const GoogleCloudDialogflowCxV3TransitionRouteGroupCoverage: Schema.Schema<GoogleCloudDialogflowCxV3TransitionRouteGroupCoverage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      coverages: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowCxV3TransitionRouteGroupCoverageCoverage,
        ),
      ),
      coverageScore: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3TransitionRouteGroupCoverage",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TransitionRouteGroupCoverage>;

export interface GoogleCloudDialogflowCxV3CalculateCoverageResponse {
  agent?: string;
  intentCoverage?: GoogleCloudDialogflowCxV3IntentCoverage;
  transitionCoverage?: GoogleCloudDialogflowCxV3TransitionCoverage;
  routeGroupCoverage?: GoogleCloudDialogflowCxV3TransitionRouteGroupCoverage;
}

export const GoogleCloudDialogflowCxV3CalculateCoverageResponse: Schema.Schema<GoogleCloudDialogflowCxV3CalculateCoverageResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      agent: Schema.optional(Schema.String),
      intentCoverage: Schema.optional(GoogleCloudDialogflowCxV3IntentCoverage),
      transitionCoverage: Schema.optional(
        GoogleCloudDialogflowCxV3TransitionCoverage,
      ),
      routeGroupCoverage: Schema.optional(
        GoogleCloudDialogflowCxV3TransitionRouteGroupCoverage,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3CalculateCoverageResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3CalculateCoverageResponse>;

export interface GoogleCloudDialogflowCxV3ImportTestCasesRequest {
  gcsUri?: string;
  content?: string;
}

export const GoogleCloudDialogflowCxV3ImportTestCasesRequest: Schema.Schema<GoogleCloudDialogflowCxV3ImportTestCasesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gcsUri: Schema.optional(Schema.String),
      content: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ImportTestCasesRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportTestCasesRequest>;

export interface GoogleCloudDialogflowCxV3ExportTestCasesRequest {
  gcsUri?: string;
  dataFormat?: "DATA_FORMAT_UNSPECIFIED" | "BLOB" | "JSON" | (string & {});
  filter?: string;
}

export const GoogleCloudDialogflowCxV3ExportTestCasesRequest: Schema.Schema<GoogleCloudDialogflowCxV3ExportTestCasesRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gcsUri: Schema.optional(Schema.String),
      dataFormat: Schema.optional(Schema.String),
      filter: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ExportTestCasesRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportTestCasesRequest>;

export interface GoogleCloudDialogflowCxV3ListTestCaseResultsResponse {
  testCaseResults?: Array<GoogleCloudDialogflowCxV3TestCaseResult>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListTestCaseResultsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListTestCaseResultsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      testCaseResults: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3TestCaseResult),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ListTestCaseResultsResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListTestCaseResultsResponse>;

export interface GoogleCloudDialogflowCxV3WebhookGenericWebServiceSecretVersionHeaderValue {
  secretVersion?: string;
}

export const GoogleCloudDialogflowCxV3WebhookGenericWebServiceSecretVersionHeaderValue: Schema.Schema<GoogleCloudDialogflowCxV3WebhookGenericWebServiceSecretVersionHeaderValue> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      secretVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3WebhookGenericWebServiceSecretVersionHeaderValue",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookGenericWebServiceSecretVersionHeaderValue>;

export interface GoogleCloudDialogflowCxV3WebhookGenericWebServiceOAuthConfig {
  clientId?: string;
  clientSecret?: string;
  secretVersionForClientSecret?: string;
  tokenEndpoint?: string;
  scopes?: Array<string>;
}

export const GoogleCloudDialogflowCxV3WebhookGenericWebServiceOAuthConfig: Schema.Schema<GoogleCloudDialogflowCxV3WebhookGenericWebServiceOAuthConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      clientId: Schema.optional(Schema.String),
      clientSecret: Schema.optional(Schema.String),
      secretVersionForClientSecret: Schema.optional(Schema.String),
      tokenEndpoint: Schema.optional(Schema.String),
      scopes: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3WebhookGenericWebServiceOAuthConfig",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookGenericWebServiceOAuthConfig>;

export interface GoogleCloudDialogflowCxV3WebhookGenericWebServiceServiceAccountAuthConfig {
  serviceAccount?: string;
}

export const GoogleCloudDialogflowCxV3WebhookGenericWebServiceServiceAccountAuthConfig: Schema.Schema<GoogleCloudDialogflowCxV3WebhookGenericWebServiceServiceAccountAuthConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      serviceAccount: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3WebhookGenericWebServiceServiceAccountAuthConfig",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookGenericWebServiceServiceAccountAuthConfig>;

export interface GoogleCloudDialogflowCxV3WebhookGenericWebService {
  uri?: string;
  username?: string;
  password?: string;
  secretVersionForUsernamePassword?: string;
  requestHeaders?: Record<string, string>;
  secretVersionsForRequestHeaders?: Record<
    string,
    GoogleCloudDialogflowCxV3WebhookGenericWebServiceSecretVersionHeaderValue
  >;
  allowedCaCerts?: Array<string>;
  oauthConfig?: GoogleCloudDialogflowCxV3WebhookGenericWebServiceOAuthConfig;
  serviceAgentAuth?:
    | "SERVICE_AGENT_AUTH_UNSPECIFIED"
    | "NONE"
    | "ID_TOKEN"
    | "ACCESS_TOKEN"
    | (string & {});
  serviceAccountAuthConfig?: GoogleCloudDialogflowCxV3WebhookGenericWebServiceServiceAccountAuthConfig;
  webhookType?:
    | "WEBHOOK_TYPE_UNSPECIFIED"
    | "STANDARD"
    | "FLEXIBLE"
    | (string & {});
  httpMethod?:
    | "HTTP_METHOD_UNSPECIFIED"
    | "POST"
    | "GET"
    | "HEAD"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "OPTIONS"
    | (string & {});
  requestBody?: string;
  parameterMapping?: Record<string, string>;
}

export const GoogleCloudDialogflowCxV3WebhookGenericWebService: Schema.Schema<GoogleCloudDialogflowCxV3WebhookGenericWebService> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
      username: Schema.optional(Schema.String),
      password: Schema.optional(Schema.String),
      secretVersionForUsernamePassword: Schema.optional(Schema.String),
      requestHeaders: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      secretVersionsForRequestHeaders: Schema.optional(
        Schema.Record(
          Schema.String,
          GoogleCloudDialogflowCxV3WebhookGenericWebServiceSecretVersionHeaderValue,
        ),
      ),
      allowedCaCerts: Schema.optional(Schema.Array(Schema.String)),
      oauthConfig: Schema.optional(
        GoogleCloudDialogflowCxV3WebhookGenericWebServiceOAuthConfig,
      ),
      serviceAgentAuth: Schema.optional(Schema.String),
      serviceAccountAuthConfig: Schema.optional(
        GoogleCloudDialogflowCxV3WebhookGenericWebServiceServiceAccountAuthConfig,
      ),
      webhookType: Schema.optional(Schema.String),
      httpMethod: Schema.optional(Schema.String),
      requestBody: Schema.optional(Schema.String),
      parameterMapping: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3WebhookGenericWebService",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookGenericWebService>;

export interface GoogleCloudDialogflowCxV3WebhookServiceDirectoryConfig {
  service?: string;
  genericWebService?: GoogleCloudDialogflowCxV3WebhookGenericWebService;
}

export const GoogleCloudDialogflowCxV3WebhookServiceDirectoryConfig: Schema.Schema<GoogleCloudDialogflowCxV3WebhookServiceDirectoryConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      service: Schema.optional(Schema.String),
      genericWebService: Schema.optional(
        GoogleCloudDialogflowCxV3WebhookGenericWebService,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3WebhookServiceDirectoryConfig",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookServiceDirectoryConfig>;

export interface GoogleCloudDialogflowCxV3Webhook {
  name?: string;
  displayName?: string;
  genericWebService?: GoogleCloudDialogflowCxV3WebhookGenericWebService;
  serviceDirectory?: GoogleCloudDialogflowCxV3WebhookServiceDirectoryConfig;
  timeout?: string;
  disabled?: boolean;
}

export const GoogleCloudDialogflowCxV3Webhook: Schema.Schema<GoogleCloudDialogflowCxV3Webhook> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      genericWebService: Schema.optional(
        GoogleCloudDialogflowCxV3WebhookGenericWebService,
      ),
      serviceDirectory: Schema.optional(
        GoogleCloudDialogflowCxV3WebhookServiceDirectoryConfig,
      ),
      timeout: Schema.optional(Schema.String),
      disabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3Webhook",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Webhook>;

export interface GoogleCloudDialogflowCxV3ListWebhooksResponse {
  webhooks?: Array<GoogleCloudDialogflowCxV3Webhook>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListWebhooksResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListWebhooksResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      webhooks: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Webhook)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ListWebhooksResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListWebhooksResponse>;

export interface GoogleCloudDialogflowCxV3EnvironmentVersionConfig {
  version?: string;
}

export const GoogleCloudDialogflowCxV3EnvironmentVersionConfig: Schema.Schema<GoogleCloudDialogflowCxV3EnvironmentVersionConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3EnvironmentVersionConfig",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3EnvironmentVersionConfig>;

export interface GoogleCloudDialogflowCxV3EnvironmentTestCasesConfig {
  testCases?: Array<string>;
  enableContinuousRun?: boolean;
  enablePredeploymentRun?: boolean;
}

export const GoogleCloudDialogflowCxV3EnvironmentTestCasesConfig: Schema.Schema<GoogleCloudDialogflowCxV3EnvironmentTestCasesConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      testCases: Schema.optional(Schema.Array(Schema.String)),
      enableContinuousRun: Schema.optional(Schema.Boolean),
      enablePredeploymentRun: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3EnvironmentTestCasesConfig",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3EnvironmentTestCasesConfig>;

export interface GoogleCloudDialogflowCxV3EnvironmentWebhookConfig {
  webhookOverrides?: Array<GoogleCloudDialogflowCxV3Webhook>;
}

export const GoogleCloudDialogflowCxV3EnvironmentWebhookConfig: Schema.Schema<GoogleCloudDialogflowCxV3EnvironmentWebhookConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      webhookOverrides: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3Webhook),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3EnvironmentWebhookConfig",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3EnvironmentWebhookConfig>;

export interface GoogleCloudDialogflowCxV3Environment {
  name?: string;
  displayName?: string;
  description?: string;
  versionConfigs?: Array<GoogleCloudDialogflowCxV3EnvironmentVersionConfig>;
  updateTime?: string;
  testCasesConfig?: GoogleCloudDialogflowCxV3EnvironmentTestCasesConfig;
  webhookConfig?: GoogleCloudDialogflowCxV3EnvironmentWebhookConfig;
}

export const GoogleCloudDialogflowCxV3Environment: Schema.Schema<GoogleCloudDialogflowCxV3Environment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      versionConfigs: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3EnvironmentVersionConfig),
      ),
      updateTime: Schema.optional(Schema.String),
      testCasesConfig: Schema.optional(
        GoogleCloudDialogflowCxV3EnvironmentTestCasesConfig,
      ),
      webhookConfig: Schema.optional(
        GoogleCloudDialogflowCxV3EnvironmentWebhookConfig,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3Environment",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Environment>;

export interface GoogleCloudDialogflowCxV3ListEnvironmentsResponse {
  environments?: Array<GoogleCloudDialogflowCxV3Environment>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListEnvironmentsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListEnvironmentsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      environments: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3Environment),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ListEnvironmentsResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListEnvironmentsResponse>;

export interface GoogleCloudDialogflowCxV3LookupEnvironmentHistoryResponse {
  environments?: Array<GoogleCloudDialogflowCxV3Environment>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3LookupEnvironmentHistoryResponse: Schema.Schema<GoogleCloudDialogflowCxV3LookupEnvironmentHistoryResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      environments: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3Environment),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3LookupEnvironmentHistoryResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3LookupEnvironmentHistoryResponse>;

export interface GoogleCloudDialogflowCxV3RunContinuousTestRequest {}

export const GoogleCloudDialogflowCxV3RunContinuousTestRequest: Schema.Schema<GoogleCloudDialogflowCxV3RunContinuousTestRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudDialogflowCxV3RunContinuousTestRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RunContinuousTestRequest>;

export interface GoogleCloudDialogflowCxV3ContinuousTestResult {
  name?: string;
  result?:
    | "AGGREGATED_TEST_RESULT_UNSPECIFIED"
    | "PASSED"
    | "FAILED"
    | (string & {});
  testCaseResults?: Array<string>;
  runTime?: string;
}

export const GoogleCloudDialogflowCxV3ContinuousTestResult: Schema.Schema<GoogleCloudDialogflowCxV3ContinuousTestResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      result: Schema.optional(Schema.String),
      testCaseResults: Schema.optional(Schema.Array(Schema.String)),
      runTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ContinuousTestResult",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ContinuousTestResult>;

export interface GoogleCloudDialogflowCxV3ListContinuousTestResultsResponse {
  continuousTestResults?: Array<GoogleCloudDialogflowCxV3ContinuousTestResult>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListContinuousTestResultsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListContinuousTestResultsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      continuousTestResults: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3ContinuousTestResult),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ListContinuousTestResultsResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListContinuousTestResultsResponse>;

export interface GoogleCloudDialogflowCxV3DeployFlowRequest {
  flowVersion?: string;
}

export const GoogleCloudDialogflowCxV3DeployFlowRequest: Schema.Schema<GoogleCloudDialogflowCxV3DeployFlowRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      flowVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3DeployFlowRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DeployFlowRequest>;

export interface GoogleCloudDialogflowCxV3PlaybookInput {
  precedingConversationSummary?: string;
}

export const GoogleCloudDialogflowCxV3PlaybookInput: Schema.Schema<GoogleCloudDialogflowCxV3PlaybookInput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      precedingConversationSummary: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3PlaybookInput",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3PlaybookInput>;

export interface GoogleCloudDialogflowCxV3PlaybookOutput {
  executionSummary?: string;
}

export const GoogleCloudDialogflowCxV3PlaybookOutput: Schema.Schema<GoogleCloudDialogflowCxV3PlaybookOutput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      executionSummary: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3PlaybookOutput",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3PlaybookOutput>;

export interface GoogleCloudDialogflowCxV3UserUtterance {
  text?: string;
}

export const GoogleCloudDialogflowCxV3UserUtterance: Schema.Schema<GoogleCloudDialogflowCxV3UserUtterance> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3UserUtterance",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3UserUtterance>;

export interface GoogleCloudDialogflowCxV3AgentUtterance {
  text?: string;
}

export const GoogleCloudDialogflowCxV3AgentUtterance: Schema.Schema<GoogleCloudDialogflowCxV3AgentUtterance> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3AgentUtterance",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3AgentUtterance>;

export interface GoogleCloudDialogflowCxV3ToolUse {
  tool?: string;
  displayName?: string;
  action?: string;
  inputActionParameters?: Record<string, unknown>;
  outputActionParameters?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3ToolUse: Schema.Schema<GoogleCloudDialogflowCxV3ToolUse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tool: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      action: Schema.optional(Schema.String),
      inputActionParameters: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      outputActionParameters: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ToolUse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolUse>;

export interface GoogleCloudDialogflowCxV3PlaybookInvocation {
  playbook?: string;
  displayName?: string;
  playbookInput?: GoogleCloudDialogflowCxV3PlaybookInput;
  playbookOutput?: GoogleCloudDialogflowCxV3PlaybookOutput;
  playbookState?:
    | "OUTPUT_STATE_UNSPECIFIED"
    | "OUTPUT_STATE_OK"
    | "OUTPUT_STATE_CANCELLED"
    | "OUTPUT_STATE_FAILED"
    | "OUTPUT_STATE_ESCALATED"
    | "OUTPUT_STATE_PENDING"
    | (string & {});
}

export const GoogleCloudDialogflowCxV3PlaybookInvocation: Schema.Schema<GoogleCloudDialogflowCxV3PlaybookInvocation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      playbook: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      playbookInput: Schema.optional(GoogleCloudDialogflowCxV3PlaybookInput),
      playbookOutput: Schema.optional(GoogleCloudDialogflowCxV3PlaybookOutput),
      playbookState: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3PlaybookInvocation",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3PlaybookInvocation>;

export interface GoogleCloudDialogflowCxV3FlowInvocation {
  flow?: string;
  displayName?: string;
  flowState?:
    | "OUTPUT_STATE_UNSPECIFIED"
    | "OUTPUT_STATE_OK"
    | "OUTPUT_STATE_CANCELLED"
    | "OUTPUT_STATE_FAILED"
    | "OUTPUT_STATE_ESCALATED"
    | "OUTPUT_STATE_PENDING"
    | (string & {});
}

export const GoogleCloudDialogflowCxV3FlowInvocation: Schema.Schema<GoogleCloudDialogflowCxV3FlowInvocation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      flow: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      flowState: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3FlowInvocation",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FlowInvocation>;

export interface GoogleCloudDialogflowCxV3PlaybookTransition {
  playbook?: string;
  displayName?: string;
}

export const GoogleCloudDialogflowCxV3PlaybookTransition: Schema.Schema<GoogleCloudDialogflowCxV3PlaybookTransition> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      playbook: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3PlaybookTransition",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3PlaybookTransition>;

export interface GoogleCloudDialogflowCxV3FlowTransition {
  flow?: string;
  displayName?: string;
}

export const GoogleCloudDialogflowCxV3FlowTransition: Schema.Schema<GoogleCloudDialogflowCxV3FlowTransition> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      flow: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3FlowTransition",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3FlowTransition>;

export interface GoogleCloudDialogflowCxV3Action {
  userUtterance?: GoogleCloudDialogflowCxV3UserUtterance;
  agentUtterance?: GoogleCloudDialogflowCxV3AgentUtterance;
  toolUse?: GoogleCloudDialogflowCxV3ToolUse;
  playbookInvocation?: GoogleCloudDialogflowCxV3PlaybookInvocation;
  flowInvocation?: GoogleCloudDialogflowCxV3FlowInvocation;
  playbookTransition?: GoogleCloudDialogflowCxV3PlaybookTransition;
  flowTransition?: GoogleCloudDialogflowCxV3FlowTransition;
}

export const GoogleCloudDialogflowCxV3Action: Schema.Schema<GoogleCloudDialogflowCxV3Action> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      userUtterance: Schema.optional(GoogleCloudDialogflowCxV3UserUtterance),
      agentUtterance: Schema.optional(GoogleCloudDialogflowCxV3AgentUtterance),
      toolUse: Schema.optional(GoogleCloudDialogflowCxV3ToolUse),
      playbookInvocation: Schema.optional(
        GoogleCloudDialogflowCxV3PlaybookInvocation,
      ),
      flowInvocation: Schema.optional(GoogleCloudDialogflowCxV3FlowInvocation),
      playbookTransition: Schema.optional(
        GoogleCloudDialogflowCxV3PlaybookTransition,
      ),
      flowTransition: Schema.optional(GoogleCloudDialogflowCxV3FlowTransition),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3Action",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Action>;

export interface GoogleCloudDialogflowCxV3Example {
  name?: string;
  playbookInput?: GoogleCloudDialogflowCxV3PlaybookInput;
  playbookOutput?: GoogleCloudDialogflowCxV3PlaybookOutput;
  actions?: Array<GoogleCloudDialogflowCxV3Action>;
  displayName?: string;
  description?: string;
  tokenCount?: string;
  createTime?: string;
  updateTime?: string;
  conversationState?:
    | "OUTPUT_STATE_UNSPECIFIED"
    | "OUTPUT_STATE_OK"
    | "OUTPUT_STATE_CANCELLED"
    | "OUTPUT_STATE_FAILED"
    | "OUTPUT_STATE_ESCALATED"
    | "OUTPUT_STATE_PENDING"
    | (string & {});
  languageCode?: string;
}

export const GoogleCloudDialogflowCxV3Example: Schema.Schema<GoogleCloudDialogflowCxV3Example> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      playbookInput: Schema.optional(GoogleCloudDialogflowCxV3PlaybookInput),
      playbookOutput: Schema.optional(GoogleCloudDialogflowCxV3PlaybookOutput),
      actions: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Action)),
      displayName: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      tokenCount: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      conversationState: Schema.optional(Schema.String),
      languageCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3Example",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Example>;

export interface GoogleCloudDialogflowCxV3ListExamplesResponse {
  examples?: Array<GoogleCloudDialogflowCxV3Example>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListExamplesResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListExamplesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      examples: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Example)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ListExamplesResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListExamplesResponse>;

export interface GoogleCloudDialogflowCxV3VersionVariantsVariant {
  version?: string;
  trafficAllocation?: number;
  isControlGroup?: boolean;
}

export const GoogleCloudDialogflowCxV3VersionVariantsVariant: Schema.Schema<GoogleCloudDialogflowCxV3VersionVariantsVariant> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.String),
      trafficAllocation: Schema.optional(Schema.Number),
      isControlGroup: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3VersionVariantsVariant",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3VersionVariantsVariant>;

export interface GoogleCloudDialogflowCxV3VersionVariants {
  variants?: Array<GoogleCloudDialogflowCxV3VersionVariantsVariant>;
}

export const GoogleCloudDialogflowCxV3VersionVariants: Schema.Schema<GoogleCloudDialogflowCxV3VersionVariants> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      variants: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3VersionVariantsVariant),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3VersionVariants",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3VersionVariants>;

export interface GoogleCloudDialogflowCxV3ExperimentDefinition {
  condition?: string;
  versionVariants?: GoogleCloudDialogflowCxV3VersionVariants;
}

export const GoogleCloudDialogflowCxV3ExperimentDefinition: Schema.Schema<GoogleCloudDialogflowCxV3ExperimentDefinition> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      condition: Schema.optional(Schema.String),
      versionVariants: Schema.optional(
        GoogleCloudDialogflowCxV3VersionVariants,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ExperimentDefinition",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExperimentDefinition>;

export interface GoogleCloudDialogflowCxV3RolloutConfigRolloutStep {
  displayName?: string;
  trafficPercent?: number;
  minDuration?: string;
}

export const GoogleCloudDialogflowCxV3RolloutConfigRolloutStep: Schema.Schema<GoogleCloudDialogflowCxV3RolloutConfigRolloutStep> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      trafficPercent: Schema.optional(Schema.Number),
      minDuration: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3RolloutConfigRolloutStep",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RolloutConfigRolloutStep>;

export interface GoogleCloudDialogflowCxV3RolloutConfig {
  rolloutSteps?: Array<GoogleCloudDialogflowCxV3RolloutConfigRolloutStep>;
  rolloutCondition?: string;
  failureCondition?: string;
}

export const GoogleCloudDialogflowCxV3RolloutConfig: Schema.Schema<GoogleCloudDialogflowCxV3RolloutConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      rolloutSteps: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3RolloutConfigRolloutStep),
      ),
      rolloutCondition: Schema.optional(Schema.String),
      failureCondition: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3RolloutConfig",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RolloutConfig>;

export interface GoogleCloudDialogflowCxV3RolloutState {
  step?: string;
  stepIndex?: number;
  startTime?: string;
}

export const GoogleCloudDialogflowCxV3RolloutState: Schema.Schema<GoogleCloudDialogflowCxV3RolloutState> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      step: Schema.optional(Schema.String),
      stepIndex: Schema.optional(Schema.Number),
      startTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3RolloutState",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RolloutState>;

export interface GoogleCloudDialogflowCxV3ExperimentResultConfidenceInterval {
  confidenceLevel?: number;
  ratio?: number;
  lowerBound?: number;
  upperBound?: number;
}

export const GoogleCloudDialogflowCxV3ExperimentResultConfidenceInterval: Schema.Schema<GoogleCloudDialogflowCxV3ExperimentResultConfidenceInterval> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      confidenceLevel: Schema.optional(Schema.Number),
      ratio: Schema.optional(Schema.Number),
      lowerBound: Schema.optional(Schema.Number),
      upperBound: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ExperimentResultConfidenceInterval",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExperimentResultConfidenceInterval>;

export interface GoogleCloudDialogflowCxV3ExperimentResultMetric {
  type?:
    | "METRIC_UNSPECIFIED"
    | "CONTAINED_SESSION_NO_CALLBACK_RATE"
    | "LIVE_AGENT_HANDOFF_RATE"
    | "CALLBACK_SESSION_RATE"
    | "ABANDONED_SESSION_RATE"
    | "SESSION_END_RATE"
    | (string & {});
  countType?:
    | "COUNT_TYPE_UNSPECIFIED"
    | "TOTAL_NO_MATCH_COUNT"
    | "TOTAL_TURN_COUNT"
    | "AVERAGE_TURN_COUNT"
    | (string & {});
  ratio?: number;
  count?: number;
  confidenceInterval?: GoogleCloudDialogflowCxV3ExperimentResultConfidenceInterval;
}

export const GoogleCloudDialogflowCxV3ExperimentResultMetric: Schema.Schema<GoogleCloudDialogflowCxV3ExperimentResultMetric> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      countType: Schema.optional(Schema.String),
      ratio: Schema.optional(Schema.Number),
      count: Schema.optional(Schema.Number),
      confidenceInterval: Schema.optional(
        GoogleCloudDialogflowCxV3ExperimentResultConfidenceInterval,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ExperimentResultMetric",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExperimentResultMetric>;

export interface GoogleCloudDialogflowCxV3ExperimentResultVersionMetrics {
  version?: string;
  metrics?: Array<GoogleCloudDialogflowCxV3ExperimentResultMetric>;
  sessionCount?: number;
}

export const GoogleCloudDialogflowCxV3ExperimentResultVersionMetrics: Schema.Schema<GoogleCloudDialogflowCxV3ExperimentResultVersionMetrics> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.String),
      metrics: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3ExperimentResultMetric),
      ),
      sessionCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ExperimentResultVersionMetrics",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExperimentResultVersionMetrics>;

export interface GoogleCloudDialogflowCxV3ExperimentResult {
  versionMetrics?: Array<GoogleCloudDialogflowCxV3ExperimentResultVersionMetrics>;
  lastUpdateTime?: string;
}

export const GoogleCloudDialogflowCxV3ExperimentResult: Schema.Schema<GoogleCloudDialogflowCxV3ExperimentResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      versionMetrics: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3ExperimentResultVersionMetrics),
      ),
      lastUpdateTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ExperimentResult",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExperimentResult>;

export interface GoogleCloudDialogflowCxV3VariantsHistory {
  versionVariants?: GoogleCloudDialogflowCxV3VersionVariants;
  updateTime?: string;
}

export const GoogleCloudDialogflowCxV3VariantsHistory: Schema.Schema<GoogleCloudDialogflowCxV3VariantsHistory> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      versionVariants: Schema.optional(
        GoogleCloudDialogflowCxV3VersionVariants,
      ),
      updateTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3VariantsHistory",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3VariantsHistory>;

export interface GoogleCloudDialogflowCxV3Experiment {
  name?: string;
  displayName?: string;
  description?: string;
  state?:
    | "STATE_UNSPECIFIED"
    | "DRAFT"
    | "RUNNING"
    | "DONE"
    | "ROLLOUT_FAILED"
    | (string & {});
  definition?: GoogleCloudDialogflowCxV3ExperimentDefinition;
  rolloutConfig?: GoogleCloudDialogflowCxV3RolloutConfig;
  rolloutState?: GoogleCloudDialogflowCxV3RolloutState;
  rolloutFailureReason?: string;
  result?: GoogleCloudDialogflowCxV3ExperimentResult;
  createTime?: string;
  startTime?: string;
  endTime?: string;
  lastUpdateTime?: string;
  experimentLength?: string;
  variantsHistory?: Array<GoogleCloudDialogflowCxV3VariantsHistory>;
}

export const GoogleCloudDialogflowCxV3Experiment: Schema.Schema<GoogleCloudDialogflowCxV3Experiment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      definition: Schema.optional(
        GoogleCloudDialogflowCxV3ExperimentDefinition,
      ),
      rolloutConfig: Schema.optional(GoogleCloudDialogflowCxV3RolloutConfig),
      rolloutState: Schema.optional(GoogleCloudDialogflowCxV3RolloutState),
      rolloutFailureReason: Schema.optional(Schema.String),
      result: Schema.optional(GoogleCloudDialogflowCxV3ExperimentResult),
      createTime: Schema.optional(Schema.String),
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      lastUpdateTime: Schema.optional(Schema.String),
      experimentLength: Schema.optional(Schema.String),
      variantsHistory: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3VariantsHistory),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3Experiment",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Experiment>;

export interface GoogleCloudDialogflowCxV3ListExperimentsResponse {
  experiments?: Array<GoogleCloudDialogflowCxV3Experiment>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListExperimentsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListExperimentsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      experiments: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3Experiment),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ListExperimentsResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListExperimentsResponse>;

export interface GoogleCloudDialogflowCxV3StartExperimentRequest {}

export const GoogleCloudDialogflowCxV3StartExperimentRequest: Schema.Schema<GoogleCloudDialogflowCxV3StartExperimentRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudDialogflowCxV3StartExperimentRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3StartExperimentRequest>;

export interface GoogleCloudDialogflowCxV3StopExperimentRequest {}

export const GoogleCloudDialogflowCxV3StopExperimentRequest: Schema.Schema<GoogleCloudDialogflowCxV3StopExperimentRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudDialogflowCxV3StopExperimentRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3StopExperimentRequest>;

export interface GoogleCloudDialogflowCxV3Phrase {
  text?: string;
}

export const GoogleCloudDialogflowCxV3Phrase: Schema.Schema<GoogleCloudDialogflowCxV3Phrase> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3Phrase",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Phrase>;

export interface GoogleCloudDialogflowCxV3GeneratorPlaceholder {
  id?: string;
  name?: string;
}

export const GoogleCloudDialogflowCxV3GeneratorPlaceholder: Schema.Schema<GoogleCloudDialogflowCxV3GeneratorPlaceholder> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3GeneratorPlaceholder",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3GeneratorPlaceholder>;

export interface GoogleCloudDialogflowCxV3GeneratorModelParameter {
  temperature?: number;
  maxDecodeSteps?: number;
  topP?: number;
  topK?: number;
}

export const GoogleCloudDialogflowCxV3GeneratorModelParameter: Schema.Schema<GoogleCloudDialogflowCxV3GeneratorModelParameter> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      temperature: Schema.optional(Schema.Number),
      maxDecodeSteps: Schema.optional(Schema.Number),
      topP: Schema.optional(Schema.Number),
      topK: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3GeneratorModelParameter",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3GeneratorModelParameter>;

export interface GoogleCloudDialogflowCxV3Generator {
  name?: string;
  displayName?: string;
  promptText?: GoogleCloudDialogflowCxV3Phrase;
  placeholders?: Array<GoogleCloudDialogflowCxV3GeneratorPlaceholder>;
  llmModelSettings?: GoogleCloudDialogflowCxV3LlmModelSettings;
  modelParameter?: GoogleCloudDialogflowCxV3GeneratorModelParameter;
}

export const GoogleCloudDialogflowCxV3Generator: Schema.Schema<GoogleCloudDialogflowCxV3Generator> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      promptText: Schema.optional(GoogleCloudDialogflowCxV3Phrase),
      placeholders: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3GeneratorPlaceholder),
      ),
      llmModelSettings: Schema.optional(
        GoogleCloudDialogflowCxV3LlmModelSettings,
      ),
      modelParameter: Schema.optional(
        GoogleCloudDialogflowCxV3GeneratorModelParameter,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3Generator",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Generator>;

export interface GoogleCloudDialogflowCxV3ListGeneratorsResponse {
  generators?: Array<GoogleCloudDialogflowCxV3Generator>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListGeneratorsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListGeneratorsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      generators: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3Generator),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ListGeneratorsResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListGeneratorsResponse>;

export interface GoogleCloudDialogflowCxV3PlaybookStep {
  text?: string;
  steps?: Array<GoogleCloudDialogflowCxV3PlaybookStep>;
}

export const GoogleCloudDialogflowCxV3PlaybookStep: Schema.Schema<GoogleCloudDialogflowCxV3PlaybookStep> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
      steps: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3PlaybookStep),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3PlaybookStep",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3PlaybookStep>;

export interface GoogleCloudDialogflowCxV3PlaybookInstruction {
  guidelines?: string;
  steps?: Array<GoogleCloudDialogflowCxV3PlaybookStep>;
}

export const GoogleCloudDialogflowCxV3PlaybookInstruction: Schema.Schema<GoogleCloudDialogflowCxV3PlaybookInstruction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      guidelines: Schema.optional(Schema.String),
      steps: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3PlaybookStep),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3PlaybookInstruction",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3PlaybookInstruction>;

export interface GoogleCloudDialogflowCxV3CodeBlock {
  code?: string;
}

export const GoogleCloudDialogflowCxV3CodeBlock: Schema.Schema<GoogleCloudDialogflowCxV3CodeBlock> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      code: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3CodeBlock",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3CodeBlock>;

export interface GoogleCloudDialogflowCxV3HandlerEventHandler {
  event?: string;
  condition?: string;
  fulfillment?: GoogleCloudDialogflowCxV3Fulfillment;
}

export const GoogleCloudDialogflowCxV3HandlerEventHandler: Schema.Schema<GoogleCloudDialogflowCxV3HandlerEventHandler> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      event: Schema.optional(Schema.String),
      condition: Schema.optional(Schema.String),
      fulfillment: Schema.optional(GoogleCloudDialogflowCxV3Fulfillment),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3HandlerEventHandler",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3HandlerEventHandler>;

export interface GoogleCloudDialogflowCxV3HandlerLifecycleHandler {
  lifecycleStage?: string;
  condition?: string;
  fulfillment?: GoogleCloudDialogflowCxV3Fulfillment;
}

export const GoogleCloudDialogflowCxV3HandlerLifecycleHandler: Schema.Schema<GoogleCloudDialogflowCxV3HandlerLifecycleHandler> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      lifecycleStage: Schema.optional(Schema.String),
      condition: Schema.optional(Schema.String),
      fulfillment: Schema.optional(GoogleCloudDialogflowCxV3Fulfillment),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3HandlerLifecycleHandler",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3HandlerLifecycleHandler>;

export interface GoogleCloudDialogflowCxV3Handler {
  eventHandler?: GoogleCloudDialogflowCxV3HandlerEventHandler;
  lifecycleHandler?: GoogleCloudDialogflowCxV3HandlerLifecycleHandler;
}

export const GoogleCloudDialogflowCxV3Handler: Schema.Schema<GoogleCloudDialogflowCxV3Handler> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      eventHandler: Schema.optional(
        GoogleCloudDialogflowCxV3HandlerEventHandler,
      ),
      lifecycleHandler: Schema.optional(
        GoogleCloudDialogflowCxV3HandlerLifecycleHandler,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3Handler",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Handler>;

export interface GoogleCloudDialogflowCxV3Playbook {
  name?: string;
  displayName?: string;
  goal?: string;
  inputParameterDefinitions?: Array<GoogleCloudDialogflowCxV3ParameterDefinition>;
  outputParameterDefinitions?: Array<GoogleCloudDialogflowCxV3ParameterDefinition>;
  instruction?: GoogleCloudDialogflowCxV3PlaybookInstruction;
  tokenCount?: string;
  createTime?: string;
  updateTime?: string;
  referencedPlaybooks?: Array<string>;
  referencedFlows?: Array<string>;
  referencedTools?: Array<string>;
  inlineActions?: Array<string>;
  codeBlock?: GoogleCloudDialogflowCxV3CodeBlock;
  llmModelSettings?: GoogleCloudDialogflowCxV3LlmModelSettings;
  handlers?: Array<GoogleCloudDialogflowCxV3Handler>;
  playbookType?:
    | "PLAYBOOK_TYPE_UNSPECIFIED"
    | "TASK"
    | "ROUTINE"
    | (string & {});
}

export const GoogleCloudDialogflowCxV3Playbook: Schema.Schema<GoogleCloudDialogflowCxV3Playbook> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      goal: Schema.optional(Schema.String),
      inputParameterDefinitions: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3ParameterDefinition),
      ),
      outputParameterDefinitions: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3ParameterDefinition),
      ),
      instruction: Schema.optional(
        GoogleCloudDialogflowCxV3PlaybookInstruction,
      ),
      tokenCount: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      referencedPlaybooks: Schema.optional(Schema.Array(Schema.String)),
      referencedFlows: Schema.optional(Schema.Array(Schema.String)),
      referencedTools: Schema.optional(Schema.Array(Schema.String)),
      inlineActions: Schema.optional(Schema.Array(Schema.String)),
      codeBlock: Schema.optional(GoogleCloudDialogflowCxV3CodeBlock),
      llmModelSettings: Schema.optional(
        GoogleCloudDialogflowCxV3LlmModelSettings,
      ),
      handlers: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Handler)),
      playbookType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3Playbook",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Playbook>;

export interface GoogleCloudDialogflowCxV3ListPlaybooksResponse {
  playbooks?: Array<GoogleCloudDialogflowCxV3Playbook>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListPlaybooksResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListPlaybooksResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      playbooks: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3Playbook),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ListPlaybooksResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListPlaybooksResponse>;

export interface GoogleCloudDialogflowCxV3ExportPlaybookRequest {
  playbookUri?: string;
  dataFormat?: "DATA_FORMAT_UNSPECIFIED" | "BLOB" | "JSON" | (string & {});
}

export const GoogleCloudDialogflowCxV3ExportPlaybookRequest: Schema.Schema<GoogleCloudDialogflowCxV3ExportPlaybookRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      playbookUri: Schema.optional(Schema.String),
      dataFormat: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ExportPlaybookRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportPlaybookRequest>;

export interface GoogleCloudDialogflowCxV3PlaybookImportStrategy {
  mainPlaybookImportStrategy?:
    | "IMPORT_STRATEGY_UNSPECIFIED"
    | "IMPORT_STRATEGY_CREATE_NEW"
    | "IMPORT_STRATEGY_REPLACE"
    | "IMPORT_STRATEGY_KEEP"
    | "IMPORT_STRATEGY_MERGE"
    | "IMPORT_STRATEGY_THROW_ERROR"
    | (string & {});
  nestedResourceImportStrategy?:
    | "IMPORT_STRATEGY_UNSPECIFIED"
    | "IMPORT_STRATEGY_CREATE_NEW"
    | "IMPORT_STRATEGY_REPLACE"
    | "IMPORT_STRATEGY_KEEP"
    | "IMPORT_STRATEGY_MERGE"
    | "IMPORT_STRATEGY_THROW_ERROR"
    | (string & {});
  toolImportStrategy?:
    | "IMPORT_STRATEGY_UNSPECIFIED"
    | "IMPORT_STRATEGY_CREATE_NEW"
    | "IMPORT_STRATEGY_REPLACE"
    | "IMPORT_STRATEGY_KEEP"
    | "IMPORT_STRATEGY_MERGE"
    | "IMPORT_STRATEGY_THROW_ERROR"
    | (string & {});
}

export const GoogleCloudDialogflowCxV3PlaybookImportStrategy: Schema.Schema<GoogleCloudDialogflowCxV3PlaybookImportStrategy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      mainPlaybookImportStrategy: Schema.optional(Schema.String),
      nestedResourceImportStrategy: Schema.optional(Schema.String),
      toolImportStrategy: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3PlaybookImportStrategy",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3PlaybookImportStrategy>;

export interface GoogleCloudDialogflowCxV3ImportPlaybookRequest {
  playbookUri?: string;
  playbookContent?: string;
  importStrategy?: GoogleCloudDialogflowCxV3PlaybookImportStrategy;
}

export const GoogleCloudDialogflowCxV3ImportPlaybookRequest: Schema.Schema<GoogleCloudDialogflowCxV3ImportPlaybookRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      playbookUri: Schema.optional(Schema.String),
      playbookContent: Schema.optional(Schema.String),
      importStrategy: Schema.optional(
        GoogleCloudDialogflowCxV3PlaybookImportStrategy,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ImportPlaybookRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportPlaybookRequest>;

export interface GoogleCloudDialogflowCxV3PlaybookVersion {
  name?: string;
  description?: string;
  playbook?: GoogleCloudDialogflowCxV3Playbook;
  examples?: Array<GoogleCloudDialogflowCxV3Example>;
  updateTime?: string;
}

export const GoogleCloudDialogflowCxV3PlaybookVersion: Schema.Schema<GoogleCloudDialogflowCxV3PlaybookVersion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      playbook: Schema.optional(GoogleCloudDialogflowCxV3Playbook),
      examples: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Example)),
      updateTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3PlaybookVersion",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3PlaybookVersion>;

export interface GoogleCloudDialogflowCxV3RestorePlaybookVersionRequest {}

export const GoogleCloudDialogflowCxV3RestorePlaybookVersionRequest: Schema.Schema<GoogleCloudDialogflowCxV3RestorePlaybookVersionRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudDialogflowCxV3RestorePlaybookVersionRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RestorePlaybookVersionRequest>;

export interface GoogleCloudDialogflowCxV3RestorePlaybookVersionResponse {
  playbook?: GoogleCloudDialogflowCxV3Playbook;
}

export const GoogleCloudDialogflowCxV3RestorePlaybookVersionResponse: Schema.Schema<GoogleCloudDialogflowCxV3RestorePlaybookVersionResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      playbook: Schema.optional(GoogleCloudDialogflowCxV3Playbook),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3RestorePlaybookVersionResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RestorePlaybookVersionResponse>;

export interface GoogleCloudDialogflowCxV3ListPlaybookVersionsResponse {
  playbookVersions?: Array<GoogleCloudDialogflowCxV3PlaybookVersion>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListPlaybookVersionsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListPlaybookVersionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      playbookVersions: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3PlaybookVersion),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ListPlaybookVersionsResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListPlaybookVersionsResponse>;

export interface GoogleCloudDialogflowCxV3ToolAuthenticationApiKeyConfig {
  keyName?: string;
  apiKey?: string;
  secretVersionForApiKey?: string;
  requestLocation?:
    | "REQUEST_LOCATION_UNSPECIFIED"
    | "HEADER"
    | "QUERY_STRING"
    | (string & {});
}

export const GoogleCloudDialogflowCxV3ToolAuthenticationApiKeyConfig: Schema.Schema<GoogleCloudDialogflowCxV3ToolAuthenticationApiKeyConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      keyName: Schema.optional(Schema.String),
      apiKey: Schema.optional(Schema.String),
      secretVersionForApiKey: Schema.optional(Schema.String),
      requestLocation: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ToolAuthenticationApiKeyConfig",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolAuthenticationApiKeyConfig>;

export interface GoogleCloudDialogflowCxV3ToolAuthenticationOAuthConfig {
  oauthGrantType?:
    | "OAUTH_GRANT_TYPE_UNSPECIFIED"
    | "CLIENT_CREDENTIAL"
    | (string & {});
  clientId?: string;
  clientSecret?: string;
  secretVersionForClientSecret?: string;
  tokenEndpoint?: string;
  scopes?: Array<string>;
}

export const GoogleCloudDialogflowCxV3ToolAuthenticationOAuthConfig: Schema.Schema<GoogleCloudDialogflowCxV3ToolAuthenticationOAuthConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      oauthGrantType: Schema.optional(Schema.String),
      clientId: Schema.optional(Schema.String),
      clientSecret: Schema.optional(Schema.String),
      secretVersionForClientSecret: Schema.optional(Schema.String),
      tokenEndpoint: Schema.optional(Schema.String),
      scopes: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ToolAuthenticationOAuthConfig",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolAuthenticationOAuthConfig>;

export interface GoogleCloudDialogflowCxV3ToolAuthenticationServiceAgentAuthConfig {
  serviceAgentAuth?:
    | "SERVICE_AGENT_AUTH_UNSPECIFIED"
    | "ID_TOKEN"
    | "ACCESS_TOKEN"
    | (string & {});
}

export const GoogleCloudDialogflowCxV3ToolAuthenticationServiceAgentAuthConfig: Schema.Schema<GoogleCloudDialogflowCxV3ToolAuthenticationServiceAgentAuthConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      serviceAgentAuth: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3ToolAuthenticationServiceAgentAuthConfig",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolAuthenticationServiceAgentAuthConfig>;

export interface GoogleCloudDialogflowCxV3ToolAuthenticationBearerTokenConfig {
  token?: string;
  secretVersionForToken?: string;
}

export const GoogleCloudDialogflowCxV3ToolAuthenticationBearerTokenConfig: Schema.Schema<GoogleCloudDialogflowCxV3ToolAuthenticationBearerTokenConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      token: Schema.optional(Schema.String),
      secretVersionForToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ToolAuthenticationBearerTokenConfig",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolAuthenticationBearerTokenConfig>;

export interface GoogleCloudDialogflowCxV3ToolAuthenticationServiceAccountAuthConfig {
  serviceAccount?: string;
}

export const GoogleCloudDialogflowCxV3ToolAuthenticationServiceAccountAuthConfig: Schema.Schema<GoogleCloudDialogflowCxV3ToolAuthenticationServiceAccountAuthConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      serviceAccount: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3ToolAuthenticationServiceAccountAuthConfig",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolAuthenticationServiceAccountAuthConfig>;

export interface GoogleCloudDialogflowCxV3ToolAuthentication {
  apiKeyConfig?: GoogleCloudDialogflowCxV3ToolAuthenticationApiKeyConfig;
  oauthConfig?: GoogleCloudDialogflowCxV3ToolAuthenticationOAuthConfig;
  serviceAgentAuthConfig?: GoogleCloudDialogflowCxV3ToolAuthenticationServiceAgentAuthConfig;
  bearerTokenConfig?: GoogleCloudDialogflowCxV3ToolAuthenticationBearerTokenConfig;
  serviceAccountAuthConfig?: GoogleCloudDialogflowCxV3ToolAuthenticationServiceAccountAuthConfig;
}

export const GoogleCloudDialogflowCxV3ToolAuthentication: Schema.Schema<GoogleCloudDialogflowCxV3ToolAuthentication> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      apiKeyConfig: Schema.optional(
        GoogleCloudDialogflowCxV3ToolAuthenticationApiKeyConfig,
      ),
      oauthConfig: Schema.optional(
        GoogleCloudDialogflowCxV3ToolAuthenticationOAuthConfig,
      ),
      serviceAgentAuthConfig: Schema.optional(
        GoogleCloudDialogflowCxV3ToolAuthenticationServiceAgentAuthConfig,
      ),
      bearerTokenConfig: Schema.optional(
        GoogleCloudDialogflowCxV3ToolAuthenticationBearerTokenConfig,
      ),
      serviceAccountAuthConfig: Schema.optional(
        GoogleCloudDialogflowCxV3ToolAuthenticationServiceAccountAuthConfig,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ToolAuthentication",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolAuthentication>;

export interface GoogleCloudDialogflowCxV3ToolTLSConfigCACert {
  displayName?: string;
  cert?: string;
}

export const GoogleCloudDialogflowCxV3ToolTLSConfigCACert: Schema.Schema<GoogleCloudDialogflowCxV3ToolTLSConfigCACert> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      cert: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ToolTLSConfigCACert",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolTLSConfigCACert>;

export interface GoogleCloudDialogflowCxV3ToolTLSConfig {
  caCerts?: Array<GoogleCloudDialogflowCxV3ToolTLSConfigCACert>;
}

export const GoogleCloudDialogflowCxV3ToolTLSConfig: Schema.Schema<GoogleCloudDialogflowCxV3ToolTLSConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      caCerts: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3ToolTLSConfigCACert),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ToolTLSConfig",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolTLSConfig>;

export interface GoogleCloudDialogflowCxV3ToolServiceDirectoryConfig {
  service?: string;
}

export const GoogleCloudDialogflowCxV3ToolServiceDirectoryConfig: Schema.Schema<GoogleCloudDialogflowCxV3ToolServiceDirectoryConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      service: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ToolServiceDirectoryConfig",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolServiceDirectoryConfig>;

export interface GoogleCloudDialogflowCxV3ToolOpenApiTool {
  textSchema?: string;
  authentication?: GoogleCloudDialogflowCxV3ToolAuthentication;
  tlsConfig?: GoogleCloudDialogflowCxV3ToolTLSConfig;
  serviceDirectoryConfig?: GoogleCloudDialogflowCxV3ToolServiceDirectoryConfig;
}

export const GoogleCloudDialogflowCxV3ToolOpenApiTool: Schema.Schema<GoogleCloudDialogflowCxV3ToolOpenApiTool> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      textSchema: Schema.optional(Schema.String),
      authentication: Schema.optional(
        GoogleCloudDialogflowCxV3ToolAuthentication,
      ),
      tlsConfig: Schema.optional(GoogleCloudDialogflowCxV3ToolTLSConfig),
      serviceDirectoryConfig: Schema.optional(
        GoogleCloudDialogflowCxV3ToolServiceDirectoryConfig,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ToolOpenApiTool",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolOpenApiTool>;

export interface GoogleCloudDialogflowCxV3ToolDataStoreToolFallbackPrompt {}

export const GoogleCloudDialogflowCxV3ToolDataStoreToolFallbackPrompt: Schema.Schema<GoogleCloudDialogflowCxV3ToolDataStoreToolFallbackPrompt> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudDialogflowCxV3ToolDataStoreToolFallbackPrompt",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolDataStoreToolFallbackPrompt>;

export interface GoogleCloudDialogflowCxV3ToolDataStoreTool {
  dataStoreConnections?: Array<GoogleCloudDialogflowCxV3DataStoreConnection>;
  fallbackPrompt?: GoogleCloudDialogflowCxV3ToolDataStoreToolFallbackPrompt;
}

export const GoogleCloudDialogflowCxV3ToolDataStoreTool: Schema.Schema<GoogleCloudDialogflowCxV3ToolDataStoreTool> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dataStoreConnections: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3DataStoreConnection),
      ),
      fallbackPrompt: Schema.optional(
        GoogleCloudDialogflowCxV3ToolDataStoreToolFallbackPrompt,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ToolDataStoreTool",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolDataStoreTool>;

export interface GoogleCloudDialogflowCxV3ToolFunctionTool {
  inputSchema?: Record<string, unknown>;
  outputSchema?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3ToolFunctionTool: Schema.Schema<GoogleCloudDialogflowCxV3ToolFunctionTool> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      inputSchema: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      outputSchema: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ToolFunctionTool",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolFunctionTool>;

export interface GoogleCloudDialogflowCxV3Tool {
  name?: string;
  displayName?: string;
  description?: string;
  openApiSpec?: GoogleCloudDialogflowCxV3ToolOpenApiTool;
  dataStoreSpec?: GoogleCloudDialogflowCxV3ToolDataStoreTool;
  functionSpec?: GoogleCloudDialogflowCxV3ToolFunctionTool;
  toolType?:
    | "TOOL_TYPE_UNSPECIFIED"
    | "CUSTOMIZED_TOOL"
    | "BUILTIN_TOOL"
    | (string & {});
}

export const GoogleCloudDialogflowCxV3Tool: Schema.Schema<GoogleCloudDialogflowCxV3Tool> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      openApiSpec: Schema.optional(GoogleCloudDialogflowCxV3ToolOpenApiTool),
      dataStoreSpec: Schema.optional(
        GoogleCloudDialogflowCxV3ToolDataStoreTool,
      ),
      functionSpec: Schema.optional(GoogleCloudDialogflowCxV3ToolFunctionTool),
      toolType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3Tool",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Tool>;

export interface GoogleCloudDialogflowCxV3ListToolsResponse {
  tools?: Array<GoogleCloudDialogflowCxV3Tool>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListToolsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListToolsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tools: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Tool)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ListToolsResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListToolsResponse>;

export interface GoogleCloudDialogflowCxV3ToolVersion {
  name?: string;
  displayName?: string;
  tool?: GoogleCloudDialogflowCxV3Tool;
  createTime?: string;
  updateTime?: string;
}

export const GoogleCloudDialogflowCxV3ToolVersion: Schema.Schema<GoogleCloudDialogflowCxV3ToolVersion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      tool: Schema.optional(GoogleCloudDialogflowCxV3Tool),
      createTime: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ToolVersion",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ToolVersion>;

export interface GoogleCloudDialogflowCxV3ListToolVersionsResponse {
  toolVersions?: Array<GoogleCloudDialogflowCxV3ToolVersion>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListToolVersionsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListToolVersionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      toolVersions: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3ToolVersion),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ListToolVersionsResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListToolVersionsResponse>;

export interface GoogleCloudDialogflowCxV3RestoreToolVersionRequest {}

export const GoogleCloudDialogflowCxV3RestoreToolVersionRequest: Schema.Schema<GoogleCloudDialogflowCxV3RestoreToolVersionRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudDialogflowCxV3RestoreToolVersionRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RestoreToolVersionRequest>;

export interface GoogleCloudDialogflowCxV3RestoreToolVersionResponse {
  tool?: GoogleCloudDialogflowCxV3Tool;
}

export const GoogleCloudDialogflowCxV3RestoreToolVersionResponse: Schema.Schema<GoogleCloudDialogflowCxV3RestoreToolVersionResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tool: Schema.optional(GoogleCloudDialogflowCxV3Tool),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3RestoreToolVersionResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RestoreToolVersionResponse>;

export interface GoogleCloudDialogflowCxV3Version {
  name?: string;
  displayName?: string;
  description?: string;
  nluSettings?: GoogleCloudDialogflowCxV3NluSettings;
  createTime?: string;
  state?:
    | "STATE_UNSPECIFIED"
    | "RUNNING"
    | "SUCCEEDED"
    | "FAILED"
    | (string & {});
}

export const GoogleCloudDialogflowCxV3Version: Schema.Schema<GoogleCloudDialogflowCxV3Version> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      nluSettings: Schema.optional(GoogleCloudDialogflowCxV3NluSettings),
      createTime: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3Version",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3Version>;

export interface GoogleCloudDialogflowCxV3ListVersionsResponse {
  versions?: Array<GoogleCloudDialogflowCxV3Version>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowCxV3ListVersionsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ListVersionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      versions: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3Version)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ListVersionsResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ListVersionsResponse>;

export interface GoogleCloudDialogflowCxV3LoadVersionRequest {
  allowOverrideAgentResources?: boolean;
}

export const GoogleCloudDialogflowCxV3LoadVersionRequest: Schema.Schema<GoogleCloudDialogflowCxV3LoadVersionRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      allowOverrideAgentResources: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3LoadVersionRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3LoadVersionRequest>;

export interface GoogleCloudDialogflowCxV3CompareVersionsRequest {
  targetVersion?: string;
  languageCode?: string;
}

export const GoogleCloudDialogflowCxV3CompareVersionsRequest: Schema.Schema<GoogleCloudDialogflowCxV3CompareVersionsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      targetVersion: Schema.optional(Schema.String),
      languageCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3CompareVersionsRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3CompareVersionsRequest>;

export interface GoogleCloudDialogflowCxV3CompareVersionsResponse {
  baseVersionContentJson?: string;
  targetVersionContentJson?: string;
  compareTime?: string;
}

export const GoogleCloudDialogflowCxV3CompareVersionsResponse: Schema.Schema<GoogleCloudDialogflowCxV3CompareVersionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      baseVersionContentJson: Schema.optional(Schema.String),
      targetVersionContentJson: Schema.optional(Schema.String),
      compareTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3CompareVersionsResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3CompareVersionsResponse>;

export interface GoogleCloudLocationLocation {
  name?: string;
  locationId?: string;
  displayName?: string;
  labels?: Record<string, string>;
  metadata?: Record<string, unknown>;
}

export const GoogleCloudLocationLocation: Schema.Schema<GoogleCloudLocationLocation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      locationId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({
    identifier: "GoogleCloudLocationLocation",
  }) as any as Schema.Schema<GoogleCloudLocationLocation>;

export interface GoogleCloudLocationListLocationsResponse {
  locations?: Array<GoogleCloudLocationLocation>;
  nextPageToken?: string;
}

export const GoogleCloudLocationListLocationsResponse: Schema.Schema<GoogleCloudLocationListLocationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      locations: Schema.optional(Schema.Array(GoogleCloudLocationLocation)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudLocationListLocationsResponse",
  }) as any as Schema.Schema<GoogleCloudLocationListLocationsResponse>;

export interface GoogleCloudDialogflowCxV3CreateVersionOperationMetadata {
  version?: string;
}

export const GoogleCloudDialogflowCxV3CreateVersionOperationMetadata: Schema.Schema<GoogleCloudDialogflowCxV3CreateVersionOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3CreateVersionOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3CreateVersionOperationMetadata>;

export interface GoogleCloudDialogflowCxV3ExportAgentResponse {
  agentUri?: string;
  agentContent?: string;
  commitSha?: string;
}

export const GoogleCloudDialogflowCxV3ExportAgentResponse: Schema.Schema<GoogleCloudDialogflowCxV3ExportAgentResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      agentUri: Schema.optional(Schema.String),
      agentContent: Schema.optional(Schema.String),
      commitSha: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ExportAgentResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportAgentResponse>;

export interface GoogleCloudDialogflowCxV3ExportFlowResponse {
  flowUri?: string;
  flowContent?: string;
}

export const GoogleCloudDialogflowCxV3ExportFlowResponse: Schema.Schema<GoogleCloudDialogflowCxV3ExportFlowResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      flowUri: Schema.optional(Schema.String),
      flowContent: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ExportFlowResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportFlowResponse>;

export interface GoogleCloudDialogflowCxV3ExportIntentsMetadata {}

export const GoogleCloudDialogflowCxV3ExportIntentsMetadata: Schema.Schema<GoogleCloudDialogflowCxV3ExportIntentsMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudDialogflowCxV3ExportIntentsMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportIntentsMetadata>;

export interface GoogleCloudDialogflowCxV3InlineDestination {
  content?: string;
}

export const GoogleCloudDialogflowCxV3InlineDestination: Schema.Schema<GoogleCloudDialogflowCxV3InlineDestination> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      content: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3InlineDestination",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3InlineDestination>;

export interface GoogleCloudDialogflowCxV3ExportIntentsResponse {
  intentsUri?: string;
  intentsContent?: GoogleCloudDialogflowCxV3InlineDestination;
}

export const GoogleCloudDialogflowCxV3ExportIntentsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ExportIntentsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      intentsUri: Schema.optional(Schema.String),
      intentsContent: Schema.optional(
        GoogleCloudDialogflowCxV3InlineDestination,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ExportIntentsResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportIntentsResponse>;

export interface GoogleCloudDialogflowCxV3ImportFlowResponse {
  flow?: string;
}

export const GoogleCloudDialogflowCxV3ImportFlowResponse: Schema.Schema<GoogleCloudDialogflowCxV3ImportFlowResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      flow: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ImportFlowResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportFlowResponse>;

export interface GoogleCloudDialogflowCxV3ImportEntityTypesMetadata {}

export const GoogleCloudDialogflowCxV3ImportEntityTypesMetadata: Schema.Schema<GoogleCloudDialogflowCxV3ImportEntityTypesMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudDialogflowCxV3ImportEntityTypesMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportEntityTypesMetadata>;

export interface GoogleCloudDialogflowCxV3ImportEntityTypesResponseConflictingResources {
  entityTypeDisplayNames?: Array<string>;
  entityDisplayNames?: Array<string>;
}

export const GoogleCloudDialogflowCxV3ImportEntityTypesResponseConflictingResources: Schema.Schema<GoogleCloudDialogflowCxV3ImportEntityTypesResponseConflictingResources> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entityTypeDisplayNames: Schema.optional(Schema.Array(Schema.String)),
      entityDisplayNames: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3ImportEntityTypesResponseConflictingResources",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportEntityTypesResponseConflictingResources>;

export interface GoogleCloudDialogflowCxV3ImportEntityTypesResponse {
  entityTypes?: Array<string>;
  conflictingResources?: GoogleCloudDialogflowCxV3ImportEntityTypesResponseConflictingResources;
}

export const GoogleCloudDialogflowCxV3ImportEntityTypesResponse: Schema.Schema<GoogleCloudDialogflowCxV3ImportEntityTypesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entityTypes: Schema.optional(Schema.Array(Schema.String)),
      conflictingResources: Schema.optional(
        GoogleCloudDialogflowCxV3ImportEntityTypesResponseConflictingResources,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ImportEntityTypesResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportEntityTypesResponse>;

export interface GoogleCloudDialogflowCxV3ExportEntityTypesMetadata {}

export const GoogleCloudDialogflowCxV3ExportEntityTypesMetadata: Schema.Schema<GoogleCloudDialogflowCxV3ExportEntityTypesMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudDialogflowCxV3ExportEntityTypesMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportEntityTypesMetadata>;

export interface GoogleCloudDialogflowCxV3ExportEntityTypesResponse {
  entityTypesUri?: string;
  entityTypesContent?: GoogleCloudDialogflowCxV3InlineDestination;
}

export const GoogleCloudDialogflowCxV3ExportEntityTypesResponse: Schema.Schema<GoogleCloudDialogflowCxV3ExportEntityTypesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entityTypesUri: Schema.optional(Schema.String),
      entityTypesContent: Schema.optional(
        GoogleCloudDialogflowCxV3InlineDestination,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ExportEntityTypesResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportEntityTypesResponse>;

export interface GoogleCloudDialogflowCxV3ImportIntentsMetadata {}

export const GoogleCloudDialogflowCxV3ImportIntentsMetadata: Schema.Schema<GoogleCloudDialogflowCxV3ImportIntentsMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudDialogflowCxV3ImportIntentsMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportIntentsMetadata>;

export interface GoogleCloudDialogflowCxV3ImportIntentsResponseConflictingResources {
  intentDisplayNames?: Array<string>;
  entityDisplayNames?: Array<string>;
}

export const GoogleCloudDialogflowCxV3ImportIntentsResponseConflictingResources: Schema.Schema<GoogleCloudDialogflowCxV3ImportIntentsResponseConflictingResources> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      intentDisplayNames: Schema.optional(Schema.Array(Schema.String)),
      entityDisplayNames: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3ImportIntentsResponseConflictingResources",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportIntentsResponseConflictingResources>;

export interface GoogleCloudDialogflowCxV3ImportIntentsResponse {
  intents?: Array<string>;
  conflictingResources?: GoogleCloudDialogflowCxV3ImportIntentsResponseConflictingResources;
}

export const GoogleCloudDialogflowCxV3ImportIntentsResponse: Schema.Schema<GoogleCloudDialogflowCxV3ImportIntentsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      intents: Schema.optional(Schema.Array(Schema.String)),
      conflictingResources: Schema.optional(
        GoogleCloudDialogflowCxV3ImportIntentsResponseConflictingResources,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ImportIntentsResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportIntentsResponse>;

export interface GoogleCloudDialogflowCxV3WebhookRequestFulfillmentInfo {
  tag?: string;
}

export const GoogleCloudDialogflowCxV3WebhookRequestFulfillmentInfo: Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequestFulfillmentInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tag: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3WebhookRequestFulfillmentInfo",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequestFulfillmentInfo>;

export interface GoogleCloudDialogflowCxV3WebhookRequestIntentInfoIntentParameterValue {
  originalValue?: string;
  resolvedValue?: unknown;
}

export const GoogleCloudDialogflowCxV3WebhookRequestIntentInfoIntentParameterValue: Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequestIntentInfoIntentParameterValue> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      originalValue: Schema.optional(Schema.String),
      resolvedValue: Schema.optional(Schema.Unknown),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3WebhookRequestIntentInfoIntentParameterValue",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequestIntentInfoIntentParameterValue>;

export interface GoogleCloudDialogflowCxV3WebhookRequestIntentInfo {
  lastMatchedIntent?: string;
  displayName?: string;
  parameters?: Record<
    string,
    GoogleCloudDialogflowCxV3WebhookRequestIntentInfoIntentParameterValue
  >;
  confidence?: number;
}

export const GoogleCloudDialogflowCxV3WebhookRequestIntentInfo: Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequestIntentInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      lastMatchedIntent: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      parameters: Schema.optional(
        Schema.Record(
          Schema.String,
          GoogleCloudDialogflowCxV3WebhookRequestIntentInfoIntentParameterValue,
        ),
      ),
      confidence: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3WebhookRequestIntentInfo",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequestIntentInfo>;

export interface GoogleCloudDialogflowCxV3PageInfoFormInfoParameterInfo {
  displayName?: string;
  required?: boolean;
  state?:
    | "PARAMETER_STATE_UNSPECIFIED"
    | "EMPTY"
    | "INVALID"
    | "FILLED"
    | (string & {});
  value?: unknown;
  justCollected?: boolean;
}

export const GoogleCloudDialogflowCxV3PageInfoFormInfoParameterInfo: Schema.Schema<GoogleCloudDialogflowCxV3PageInfoFormInfoParameterInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      required: Schema.optional(Schema.Boolean),
      state: Schema.optional(Schema.String),
      value: Schema.optional(Schema.Unknown),
      justCollected: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3PageInfoFormInfoParameterInfo",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3PageInfoFormInfoParameterInfo>;

export interface GoogleCloudDialogflowCxV3PageInfoFormInfo {
  parameterInfo?: Array<GoogleCloudDialogflowCxV3PageInfoFormInfoParameterInfo>;
}

export const GoogleCloudDialogflowCxV3PageInfoFormInfo: Schema.Schema<GoogleCloudDialogflowCxV3PageInfoFormInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      parameterInfo: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3PageInfoFormInfoParameterInfo),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3PageInfoFormInfo",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3PageInfoFormInfo>;

export interface GoogleCloudDialogflowCxV3PageInfo {
  currentPage?: string;
  displayName?: string;
  formInfo?: GoogleCloudDialogflowCxV3PageInfoFormInfo;
}

export const GoogleCloudDialogflowCxV3PageInfo: Schema.Schema<GoogleCloudDialogflowCxV3PageInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      currentPage: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      formInfo: Schema.optional(GoogleCloudDialogflowCxV3PageInfoFormInfo),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3PageInfo",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3PageInfo>;

export interface GoogleCloudDialogflowCxV3SessionInfo {
  session?: string;
  parameters?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3SessionInfo: Schema.Schema<GoogleCloudDialogflowCxV3SessionInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      session: Schema.optional(Schema.String),
      parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3SessionInfo",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3SessionInfo>;

export interface GoogleCloudDialogflowCxV3WebhookRequestSentimentAnalysisResult {
  score?: number;
  magnitude?: number;
}

export const GoogleCloudDialogflowCxV3WebhookRequestSentimentAnalysisResult: Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequestSentimentAnalysisResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      score: Schema.optional(Schema.Number),
      magnitude: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3WebhookRequestSentimentAnalysisResult",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequestSentimentAnalysisResult>;

export interface GoogleCloudDialogflowCxV3LanguageInfo {
  inputLanguageCode?: string;
  resolvedLanguageCode?: string;
  confidenceScore?: number;
}

export const GoogleCloudDialogflowCxV3LanguageInfo: Schema.Schema<GoogleCloudDialogflowCxV3LanguageInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      inputLanguageCode: Schema.optional(Schema.String),
      resolvedLanguageCode: Schema.optional(Schema.String),
      confidenceScore: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3LanguageInfo",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3LanguageInfo>;

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

export const GoogleCloudDialogflowCxV3WebhookRequest: Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      detectIntentResponseId: Schema.optional(Schema.String),
      text: Schema.optional(Schema.String),
      triggerIntent: Schema.optional(Schema.String),
      transcript: Schema.optional(Schema.String),
      triggerEvent: Schema.optional(Schema.String),
      dtmfDigits: Schema.optional(Schema.String),
      languageCode: Schema.optional(Schema.String),
      fulfillmentInfo: Schema.optional(
        GoogleCloudDialogflowCxV3WebhookRequestFulfillmentInfo,
      ),
      intentInfo: Schema.optional(
        GoogleCloudDialogflowCxV3WebhookRequestIntentInfo,
      ),
      pageInfo: Schema.optional(GoogleCloudDialogflowCxV3PageInfo),
      sessionInfo: Schema.optional(GoogleCloudDialogflowCxV3SessionInfo),
      messages: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3ResponseMessage),
      ),
      payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      sentimentAnalysisResult: Schema.optional(
        GoogleCloudDialogflowCxV3WebhookRequestSentimentAnalysisResult,
      ),
      languageInfo: Schema.optional(GoogleCloudDialogflowCxV3LanguageInfo),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3WebhookRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookRequest>;

export interface GoogleCloudDialogflowCxV3WebhookResponseFulfillmentResponse {
  messages?: Array<GoogleCloudDialogflowCxV3ResponseMessage>;
  mergeBehavior?:
    | "MERGE_BEHAVIOR_UNSPECIFIED"
    | "APPEND"
    | "REPLACE"
    | (string & {});
}

export const GoogleCloudDialogflowCxV3WebhookResponseFulfillmentResponse: Schema.Schema<GoogleCloudDialogflowCxV3WebhookResponseFulfillmentResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      messages: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3ResponseMessage),
      ),
      mergeBehavior: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3WebhookResponseFulfillmentResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookResponseFulfillmentResponse>;

export interface GoogleCloudDialogflowCxV3WebhookResponse {
  fulfillmentResponse?: GoogleCloudDialogflowCxV3WebhookResponseFulfillmentResponse;
  pageInfo?: GoogleCloudDialogflowCxV3PageInfo;
  sessionInfo?: GoogleCloudDialogflowCxV3SessionInfo;
  payload?: Record<string, unknown>;
  targetPage?: string;
  targetFlow?: string;
}

export const GoogleCloudDialogflowCxV3WebhookResponse: Schema.Schema<GoogleCloudDialogflowCxV3WebhookResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fulfillmentResponse: Schema.optional(
        GoogleCloudDialogflowCxV3WebhookResponseFulfillmentResponse,
      ),
      pageInfo: Schema.optional(GoogleCloudDialogflowCxV3PageInfo),
      sessionInfo: Schema.optional(GoogleCloudDialogflowCxV3SessionInfo),
      payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      targetPage: Schema.optional(Schema.String),
      targetFlow: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3WebhookResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3WebhookResponse>;

export interface GoogleCloudDialogflowCxV3TestError {
  testCase?: string;
  status?: GoogleRpcStatus;
  testTime?: string;
}

export const GoogleCloudDialogflowCxV3TestError: Schema.Schema<GoogleCloudDialogflowCxV3TestError> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      testCase: Schema.optional(Schema.String),
      status: Schema.optional(GoogleRpcStatus),
      testTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3TestError",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TestError>;

export interface GoogleCloudDialogflowCxV3BatchRunTestCasesMetadata {
  errors?: Array<GoogleCloudDialogflowCxV3TestError>;
}

export const GoogleCloudDialogflowCxV3BatchRunTestCasesMetadata: Schema.Schema<GoogleCloudDialogflowCxV3BatchRunTestCasesMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      errors: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3TestError)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3BatchRunTestCasesMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3BatchRunTestCasesMetadata>;

export interface GoogleCloudDialogflowCxV3BatchRunTestCasesResponse {
  results?: Array<GoogleCloudDialogflowCxV3TestCaseResult>;
}

export const GoogleCloudDialogflowCxV3BatchRunTestCasesResponse: Schema.Schema<GoogleCloudDialogflowCxV3BatchRunTestCasesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      results: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3TestCaseResult),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3BatchRunTestCasesResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3BatchRunTestCasesResponse>;

export interface GoogleCloudDialogflowCxV3RunTestCaseMetadata {}

export const GoogleCloudDialogflowCxV3RunTestCaseMetadata: Schema.Schema<GoogleCloudDialogflowCxV3RunTestCaseMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudDialogflowCxV3RunTestCaseMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RunTestCaseMetadata>;

export interface GoogleCloudDialogflowCxV3RunTestCaseResponse {
  result?: GoogleCloudDialogflowCxV3TestCaseResult;
}

export const GoogleCloudDialogflowCxV3RunTestCaseResponse: Schema.Schema<GoogleCloudDialogflowCxV3RunTestCaseResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      result: Schema.optional(GoogleCloudDialogflowCxV3TestCaseResult),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3RunTestCaseResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RunTestCaseResponse>;

export interface GoogleCloudDialogflowCxV3ExportTestCasesMetadata {}

export const GoogleCloudDialogflowCxV3ExportTestCasesMetadata: Schema.Schema<GoogleCloudDialogflowCxV3ExportTestCasesMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudDialogflowCxV3ExportTestCasesMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportTestCasesMetadata>;

export interface GoogleCloudDialogflowCxV3ExportTestCasesResponse {
  gcsUri?: string;
  content?: string;
}

export const GoogleCloudDialogflowCxV3ExportTestCasesResponse: Schema.Schema<GoogleCloudDialogflowCxV3ExportTestCasesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gcsUri: Schema.optional(Schema.String),
      content: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ExportTestCasesResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ExportTestCasesResponse>;

export interface GoogleCloudDialogflowCxV3TestCaseError {
  testCase?: GoogleCloudDialogflowCxV3TestCase;
  status?: GoogleRpcStatus;
}

export const GoogleCloudDialogflowCxV3TestCaseError: Schema.Schema<GoogleCloudDialogflowCxV3TestCaseError> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      testCase: Schema.optional(GoogleCloudDialogflowCxV3TestCase),
      status: Schema.optional(GoogleRpcStatus),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3TestCaseError",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TestCaseError>;

export interface GoogleCloudDialogflowCxV3ImportTestCasesMetadata {
  errors?: Array<GoogleCloudDialogflowCxV3TestCaseError>;
}

export const GoogleCloudDialogflowCxV3ImportTestCasesMetadata: Schema.Schema<GoogleCloudDialogflowCxV3ImportTestCasesMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      errors: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3TestCaseError),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ImportTestCasesMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportTestCasesMetadata>;

export interface GoogleCloudDialogflowCxV3ImportTestCasesResponse {
  names?: Array<string>;
}

export const GoogleCloudDialogflowCxV3ImportTestCasesResponse: Schema.Schema<GoogleCloudDialogflowCxV3ImportTestCasesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      names: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ImportTestCasesResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ImportTestCasesResponse>;

export interface GoogleCloudDialogflowCxV3RunContinuousTestMetadata {
  errors?: Array<GoogleCloudDialogflowCxV3TestError>;
}

export const GoogleCloudDialogflowCxV3RunContinuousTestMetadata: Schema.Schema<GoogleCloudDialogflowCxV3RunContinuousTestMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      errors: Schema.optional(Schema.Array(GoogleCloudDialogflowCxV3TestError)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3RunContinuousTestMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RunContinuousTestMetadata>;

export interface GoogleCloudDialogflowCxV3RunContinuousTestResponse {
  continuousTestResult?: GoogleCloudDialogflowCxV3ContinuousTestResult;
}

export const GoogleCloudDialogflowCxV3RunContinuousTestResponse: Schema.Schema<GoogleCloudDialogflowCxV3RunContinuousTestResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      continuousTestResult: Schema.optional(
        GoogleCloudDialogflowCxV3ContinuousTestResult,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3RunContinuousTestResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3RunContinuousTestResponse>;

export interface GoogleCloudDialogflowCxV3DeployFlowMetadata {
  testErrors?: Array<GoogleCloudDialogflowCxV3TestError>;
}

export const GoogleCloudDialogflowCxV3DeployFlowMetadata: Schema.Schema<GoogleCloudDialogflowCxV3DeployFlowMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      testErrors: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3TestError),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3DeployFlowMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DeployFlowMetadata>;

export interface GoogleCloudDialogflowCxV3DeployFlowResponse {
  environment?: GoogleCloudDialogflowCxV3Environment;
  deployment?: string;
}

export const GoogleCloudDialogflowCxV3DeployFlowResponse: Schema.Schema<GoogleCloudDialogflowCxV3DeployFlowResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      environment: Schema.optional(GoogleCloudDialogflowCxV3Environment),
      deployment: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3DeployFlowResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3DeployFlowResponse>;

export interface GoogleCloudDialogflowCxV3TurnSignals {
  noMatch?: boolean;
  noUserInput?: boolean;
  dtmfUsed?: boolean;
  userEscalated?: boolean;
  agentEscalated?: boolean;
  reachedEndPage?: boolean;
  webhookStatuses?: Array<string>;
  failureReasons?: Array<
    | "FAILURE_REASON_UNSPECIFIED"
    | "FAILED_INTENT"
    | "FAILED_WEBHOOK"
    | (string & {})
  >;
  sentimentScore?: number;
  sentimentMagnitude?: number;
}

export const GoogleCloudDialogflowCxV3TurnSignals: Schema.Schema<GoogleCloudDialogflowCxV3TurnSignals> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
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
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3TurnSignals",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3TurnSignals>;

export interface GoogleCloudDialogflowCxV3ConversationSignals {
  turnSignals?: GoogleCloudDialogflowCxV3TurnSignals;
}

export const GoogleCloudDialogflowCxV3ConversationSignals: Schema.Schema<GoogleCloudDialogflowCxV3ConversationSignals> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      turnSignals: Schema.optional(GoogleCloudDialogflowCxV3TurnSignals),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3ConversationSignals",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3ConversationSignals>;

export interface GoogleCloudDialogflowCxV3beta1CreateVersionOperationMetadata {
  version?: string;
}

export const GoogleCloudDialogflowCxV3beta1CreateVersionOperationMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1CreateVersionOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1CreateVersionOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1CreateVersionOperationMetadata>;

export interface GoogleCloudDialogflowCxV3beta1ExportAgentResponse {
  agentUri?: string;
  agentContent?: string;
  commitSha?: string;
}

export const GoogleCloudDialogflowCxV3beta1ExportAgentResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportAgentResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      agentUri: Schema.optional(Schema.String),
      agentContent: Schema.optional(Schema.String),
      commitSha: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1ExportAgentResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportAgentResponse>;

export interface GoogleCloudDialogflowCxV3beta1ExportFlowResponse {
  flowUri?: string;
  flowContent?: string;
}

export const GoogleCloudDialogflowCxV3beta1ExportFlowResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportFlowResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      flowUri: Schema.optional(Schema.String),
      flowContent: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1ExportFlowResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportFlowResponse>;

export interface GoogleCloudDialogflowCxV3beta1ExportIntentsMetadata {}

export const GoogleCloudDialogflowCxV3beta1ExportIntentsMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportIntentsMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1ExportIntentsMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportIntentsMetadata>;

export interface GoogleCloudDialogflowCxV3beta1InlineDestination {
  content?: string;
}

export const GoogleCloudDialogflowCxV3beta1InlineDestination: Schema.Schema<GoogleCloudDialogflowCxV3beta1InlineDestination> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      content: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1InlineDestination",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1InlineDestination>;

export interface GoogleCloudDialogflowCxV3beta1ExportIntentsResponse {
  intentsUri?: string;
  intentsContent?: GoogleCloudDialogflowCxV3beta1InlineDestination;
}

export const GoogleCloudDialogflowCxV3beta1ExportIntentsResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportIntentsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      intentsUri: Schema.optional(Schema.String),
      intentsContent: Schema.optional(
        GoogleCloudDialogflowCxV3beta1InlineDestination,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1ExportIntentsResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportIntentsResponse>;

export interface GoogleCloudDialogflowCxV3beta1ImportFlowResponse {
  flow?: string;
}

export const GoogleCloudDialogflowCxV3beta1ImportFlowResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportFlowResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      flow: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1ImportFlowResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportFlowResponse>;

export interface GoogleCloudDialogflowCxV3beta1ImportEntityTypesMetadata {}

export const GoogleCloudDialogflowCxV3beta1ImportEntityTypesMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportEntityTypesMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1ImportEntityTypesMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportEntityTypesMetadata>;

export interface GoogleCloudDialogflowCxV3beta1ImportEntityTypesResponseConflictingResources {
  entityTypeDisplayNames?: Array<string>;
  entityDisplayNames?: Array<string>;
}

export const GoogleCloudDialogflowCxV3beta1ImportEntityTypesResponseConflictingResources: Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportEntityTypesResponseConflictingResources> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entityTypeDisplayNames: Schema.optional(Schema.Array(Schema.String)),
      entityDisplayNames: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3beta1ImportEntityTypesResponseConflictingResources",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportEntityTypesResponseConflictingResources>;

export interface GoogleCloudDialogflowCxV3beta1ImportEntityTypesResponse {
  entityTypes?: Array<string>;
  conflictingResources?: GoogleCloudDialogflowCxV3beta1ImportEntityTypesResponseConflictingResources;
}

export const GoogleCloudDialogflowCxV3beta1ImportEntityTypesResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportEntityTypesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entityTypes: Schema.optional(Schema.Array(Schema.String)),
      conflictingResources: Schema.optional(
        GoogleCloudDialogflowCxV3beta1ImportEntityTypesResponseConflictingResources,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1ImportEntityTypesResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportEntityTypesResponse>;

export interface GoogleCloudDialogflowCxV3beta1ExportEntityTypesMetadata {}

export const GoogleCloudDialogflowCxV3beta1ExportEntityTypesMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportEntityTypesMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1ExportEntityTypesMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportEntityTypesMetadata>;

export interface GoogleCloudDialogflowCxV3beta1ExportEntityTypesResponse {
  entityTypesUri?: string;
  entityTypesContent?: GoogleCloudDialogflowCxV3beta1InlineDestination;
}

export const GoogleCloudDialogflowCxV3beta1ExportEntityTypesResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportEntityTypesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entityTypesUri: Schema.optional(Schema.String),
      entityTypesContent: Schema.optional(
        GoogleCloudDialogflowCxV3beta1InlineDestination,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1ExportEntityTypesResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportEntityTypesResponse>;

export interface GoogleCloudDialogflowCxV3beta1ImportIntentsMetadata {}

export const GoogleCloudDialogflowCxV3beta1ImportIntentsMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportIntentsMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1ImportIntentsMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportIntentsMetadata>;

export interface GoogleCloudDialogflowCxV3beta1ImportIntentsResponseConflictingResources {
  intentDisplayNames?: Array<string>;
  entityDisplayNames?: Array<string>;
}

export const GoogleCloudDialogflowCxV3beta1ImportIntentsResponseConflictingResources: Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportIntentsResponseConflictingResources> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      intentDisplayNames: Schema.optional(Schema.Array(Schema.String)),
      entityDisplayNames: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3beta1ImportIntentsResponseConflictingResources",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportIntentsResponseConflictingResources>;

export interface GoogleCloudDialogflowCxV3beta1ImportIntentsResponse {
  intents?: Array<string>;
  conflictingResources?: GoogleCloudDialogflowCxV3beta1ImportIntentsResponseConflictingResources;
}

export const GoogleCloudDialogflowCxV3beta1ImportIntentsResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportIntentsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      intents: Schema.optional(Schema.Array(Schema.String)),
      conflictingResources: Schema.optional(
        GoogleCloudDialogflowCxV3beta1ImportIntentsResponseConflictingResources,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1ImportIntentsResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportIntentsResponse>;

export interface GoogleCloudDialogflowCxV3beta1WebhookRequestFulfillmentInfo {
  tag?: string;
}

export const GoogleCloudDialogflowCxV3beta1WebhookRequestFulfillmentInfo: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequestFulfillmentInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tag: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1WebhookRequestFulfillmentInfo",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequestFulfillmentInfo>;

export interface GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfoIntentParameterValue {
  originalValue?: string;
  resolvedValue?: unknown;
}

export const GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfoIntentParameterValue: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfoIntentParameterValue> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      originalValue: Schema.optional(Schema.String),
      resolvedValue: Schema.optional(Schema.Unknown),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfoIntentParameterValue",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfoIntentParameterValue>;

export interface GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfo {
  lastMatchedIntent?: string;
  displayName?: string;
  parameters?: Record<
    string,
    GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfoIntentParameterValue
  >;
  confidence?: number;
}

export const GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfo: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      lastMatchedIntent: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      parameters: Schema.optional(
        Schema.Record(
          Schema.String,
          GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfoIntentParameterValue,
        ),
      ),
      confidence: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfo",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfo>;

export interface GoogleCloudDialogflowCxV3beta1PageInfoFormInfoParameterInfo {
  displayName?: string;
  required?: boolean;
  state?:
    | "PARAMETER_STATE_UNSPECIFIED"
    | "EMPTY"
    | "INVALID"
    | "FILLED"
    | (string & {});
  value?: unknown;
  justCollected?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1PageInfoFormInfoParameterInfo: Schema.Schema<GoogleCloudDialogflowCxV3beta1PageInfoFormInfoParameterInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      required: Schema.optional(Schema.Boolean),
      state: Schema.optional(Schema.String),
      value: Schema.optional(Schema.Unknown),
      justCollected: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1PageInfoFormInfoParameterInfo",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1PageInfoFormInfoParameterInfo>;

export interface GoogleCloudDialogflowCxV3beta1PageInfoFormInfo {
  parameterInfo?: Array<GoogleCloudDialogflowCxV3beta1PageInfoFormInfoParameterInfo>;
}

export const GoogleCloudDialogflowCxV3beta1PageInfoFormInfo: Schema.Schema<GoogleCloudDialogflowCxV3beta1PageInfoFormInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      parameterInfo: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowCxV3beta1PageInfoFormInfoParameterInfo,
        ),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1PageInfoFormInfo",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1PageInfoFormInfo>;

export interface GoogleCloudDialogflowCxV3beta1PageInfo {
  currentPage?: string;
  displayName?: string;
  formInfo?: GoogleCloudDialogflowCxV3beta1PageInfoFormInfo;
}

export const GoogleCloudDialogflowCxV3beta1PageInfo: Schema.Schema<GoogleCloudDialogflowCxV3beta1PageInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      currentPage: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      formInfo: Schema.optional(GoogleCloudDialogflowCxV3beta1PageInfoFormInfo),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1PageInfo",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1PageInfo>;

export interface GoogleCloudDialogflowCxV3beta1SessionInfo {
  session?: string;
  parameters?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3beta1SessionInfo: Schema.Schema<GoogleCloudDialogflowCxV3beta1SessionInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      session: Schema.optional(Schema.String),
      parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1SessionInfo",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1SessionInfo>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessageText {
  text?: Array<string>;
  allowPlaybackInterruption?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessageText: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageText> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.Array(Schema.String)),
      allowPlaybackInterruption: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1ResponseMessageText",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageText>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessageConversationSuccess {
  metadata?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessageConversationSuccess: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageConversationSuccess> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3beta1ResponseMessageConversationSuccess",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageConversationSuccess>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessageOutputAudioText {
  text?: string;
  ssml?: string;
  allowPlaybackInterruption?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessageOutputAudioText: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageOutputAudioText> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
      ssml: Schema.optional(Schema.String),
      allowPlaybackInterruption: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1ResponseMessageOutputAudioText",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageOutputAudioText>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessageLiveAgentHandoff {
  metadata?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessageLiveAgentHandoff: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageLiveAgentHandoff> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1ResponseMessageLiveAgentHandoff",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageLiveAgentHandoff>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessageEndInteraction {}

export const GoogleCloudDialogflowCxV3beta1ResponseMessageEndInteraction: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageEndInteraction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1ResponseMessageEndInteraction",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageEndInteraction>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessagePlayAudio {
  audioUri?: string;
  allowPlaybackInterruption?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessagePlayAudio: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessagePlayAudio> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      audioUri: Schema.optional(Schema.String),
      allowPlaybackInterruption: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1ResponseMessagePlayAudio",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessagePlayAudio>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudioSegment {
  audio?: string;
  uri?: string;
  allowPlaybackInterruption?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudioSegment: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudioSegment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      audio: Schema.optional(Schema.String),
      uri: Schema.optional(Schema.String),
      allowPlaybackInterruption: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudioSegment",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudioSegment>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudio {
  segments?: Array<GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudioSegment>;
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudio: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudio> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      segments: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudioSegment,
        ),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudio",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudio>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessageTelephonyTransferCall {
  phoneNumber?: string;
}

export const GoogleCloudDialogflowCxV3beta1ResponseMessageTelephonyTransferCall: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageTelephonyTransferCall> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      phoneNumber: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3beta1ResponseMessageTelephonyTransferCall",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageTelephonyTransferCall>;

export interface GoogleCloudDialogflowCxV3beta1ResponseMessageKnowledgeInfoCard {}

export const GoogleCloudDialogflowCxV3beta1ResponseMessageKnowledgeInfoCard: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageKnowledgeInfoCard> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3beta1ResponseMessageKnowledgeInfoCard",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessageKnowledgeInfoCard>;

export interface GoogleCloudDialogflowCxV3beta1ToolCall {
  tool?: string;
  action?: string;
  inputParameters?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3beta1ToolCall: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolCall> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tool: Schema.optional(Schema.String),
      action: Schema.optional(Schema.String),
      inputParameters: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1ToolCall",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolCall>;

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

export const GoogleCloudDialogflowCxV3beta1ResponseMessage: Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(GoogleCloudDialogflowCxV3beta1ResponseMessageText),
      payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      conversationSuccess: Schema.optional(
        GoogleCloudDialogflowCxV3beta1ResponseMessageConversationSuccess,
      ),
      outputAudioText: Schema.optional(
        GoogleCloudDialogflowCxV3beta1ResponseMessageOutputAudioText,
      ),
      liveAgentHandoff: Schema.optional(
        GoogleCloudDialogflowCxV3beta1ResponseMessageLiveAgentHandoff,
      ),
      endInteraction: Schema.optional(
        GoogleCloudDialogflowCxV3beta1ResponseMessageEndInteraction,
      ),
      playAudio: Schema.optional(
        GoogleCloudDialogflowCxV3beta1ResponseMessagePlayAudio,
      ),
      mixedAudio: Schema.optional(
        GoogleCloudDialogflowCxV3beta1ResponseMessageMixedAudio,
      ),
      telephonyTransferCall: Schema.optional(
        GoogleCloudDialogflowCxV3beta1ResponseMessageTelephonyTransferCall,
      ),
      knowledgeInfoCard: Schema.optional(
        GoogleCloudDialogflowCxV3beta1ResponseMessageKnowledgeInfoCard,
      ),
      toolCall: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolCall),
      channel: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1ResponseMessage",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ResponseMessage>;

export interface GoogleCloudDialogflowCxV3beta1WebhookRequestSentimentAnalysisResult {
  score?: number;
  magnitude?: number;
}

export const GoogleCloudDialogflowCxV3beta1WebhookRequestSentimentAnalysisResult: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequestSentimentAnalysisResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      score: Schema.optional(Schema.Number),
      magnitude: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3beta1WebhookRequestSentimentAnalysisResult",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequestSentimentAnalysisResult>;

export interface GoogleCloudDialogflowCxV3beta1LanguageInfo {
  inputLanguageCode?: string;
  resolvedLanguageCode?: string;
  confidenceScore?: number;
}

export const GoogleCloudDialogflowCxV3beta1LanguageInfo: Schema.Schema<GoogleCloudDialogflowCxV3beta1LanguageInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      inputLanguageCode: Schema.optional(Schema.String),
      resolvedLanguageCode: Schema.optional(Schema.String),
      confidenceScore: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1LanguageInfo",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1LanguageInfo>;

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

export const GoogleCloudDialogflowCxV3beta1WebhookRequest: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      detectIntentResponseId: Schema.optional(Schema.String),
      text: Schema.optional(Schema.String),
      triggerIntent: Schema.optional(Schema.String),
      transcript: Schema.optional(Schema.String),
      triggerEvent: Schema.optional(Schema.String),
      dtmfDigits: Schema.optional(Schema.String),
      languageCode: Schema.optional(Schema.String),
      fulfillmentInfo: Schema.optional(
        GoogleCloudDialogflowCxV3beta1WebhookRequestFulfillmentInfo,
      ),
      intentInfo: Schema.optional(
        GoogleCloudDialogflowCxV3beta1WebhookRequestIntentInfo,
      ),
      pageInfo: Schema.optional(GoogleCloudDialogflowCxV3beta1PageInfo),
      sessionInfo: Schema.optional(GoogleCloudDialogflowCxV3beta1SessionInfo),
      messages: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3beta1ResponseMessage),
      ),
      payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      sentimentAnalysisResult: Schema.optional(
        GoogleCloudDialogflowCxV3beta1WebhookRequestSentimentAnalysisResult,
      ),
      languageInfo: Schema.optional(GoogleCloudDialogflowCxV3beta1LanguageInfo),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1WebhookRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookRequest>;

export interface GoogleCloudDialogflowCxV3beta1WebhookResponseFulfillmentResponse {
  messages?: Array<GoogleCloudDialogflowCxV3beta1ResponseMessage>;
  mergeBehavior?:
    | "MERGE_BEHAVIOR_UNSPECIFIED"
    | "APPEND"
    | "REPLACE"
    | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1WebhookResponseFulfillmentResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookResponseFulfillmentResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      messages: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3beta1ResponseMessage),
      ),
      mergeBehavior: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3beta1WebhookResponseFulfillmentResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookResponseFulfillmentResponse>;

export interface GoogleCloudDialogflowCxV3beta1WebhookResponse {
  fulfillmentResponse?: GoogleCloudDialogflowCxV3beta1WebhookResponseFulfillmentResponse;
  pageInfo?: GoogleCloudDialogflowCxV3beta1PageInfo;
  sessionInfo?: GoogleCloudDialogflowCxV3beta1SessionInfo;
  payload?: Record<string, unknown>;
  targetPage?: string;
  targetFlow?: string;
}

export const GoogleCloudDialogflowCxV3beta1WebhookResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fulfillmentResponse: Schema.optional(
        GoogleCloudDialogflowCxV3beta1WebhookResponseFulfillmentResponse,
      ),
      pageInfo: Schema.optional(GoogleCloudDialogflowCxV3beta1PageInfo),
      sessionInfo: Schema.optional(GoogleCloudDialogflowCxV3beta1SessionInfo),
      payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      targetPage: Schema.optional(Schema.String),
      targetFlow: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1WebhookResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookResponse>;

export interface GoogleCloudDialogflowCxV3beta1TestError {
  testCase?: string;
  status?: GoogleRpcStatus;
  testTime?: string;
}

export const GoogleCloudDialogflowCxV3beta1TestError: Schema.Schema<GoogleCloudDialogflowCxV3beta1TestError> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      testCase: Schema.optional(Schema.String),
      status: Schema.optional(GoogleRpcStatus),
      testTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1TestError",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TestError>;

export interface GoogleCloudDialogflowCxV3beta1BatchRunTestCasesMetadata {
  errors?: Array<GoogleCloudDialogflowCxV3beta1TestError>;
}

export const GoogleCloudDialogflowCxV3beta1BatchRunTestCasesMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1BatchRunTestCasesMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      errors: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3beta1TestError),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1BatchRunTestCasesMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1BatchRunTestCasesMetadata>;

export interface GoogleCloudDialogflowCxV3beta1TextInput {
  text?: string;
}

export const GoogleCloudDialogflowCxV3beta1TextInput: Schema.Schema<GoogleCloudDialogflowCxV3beta1TextInput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1TextInput",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TextInput>;

export interface GoogleCloudDialogflowCxV3beta1IntentInput {
  intent?: string;
}

export const GoogleCloudDialogflowCxV3beta1IntentInput: Schema.Schema<GoogleCloudDialogflowCxV3beta1IntentInput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      intent: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1IntentInput",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1IntentInput>;

export interface GoogleCloudDialogflowCxV3beta1BargeInConfig {
  noBargeInDuration?: string;
  totalDuration?: string;
}

export const GoogleCloudDialogflowCxV3beta1BargeInConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1BargeInConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      noBargeInDuration: Schema.optional(Schema.String),
      totalDuration: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1BargeInConfig",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1BargeInConfig>;

export interface GoogleCloudDialogflowCxV3beta1InputAudioConfig {
  audioEncoding?:
    | "AUDIO_ENCODING_UNSPECIFIED"
    | "AUDIO_ENCODING_LINEAR_16"
    | "AUDIO_ENCODING_FLAC"
    | "AUDIO_ENCODING_MULAW"
    | "AUDIO_ENCODING_AMR"
    | "AUDIO_ENCODING_AMR_WB"
    | "AUDIO_ENCODING_OGG_OPUS"
    | "AUDIO_ENCODING_SPEEX_WITH_HEADER_BYTE"
    | "AUDIO_ENCODING_ALAW"
    | (string & {});
  sampleRateHertz?: number;
  enableWordInfo?: boolean;
  phraseHints?: Array<string>;
  model?: string;
  modelVariant?:
    | "SPEECH_MODEL_VARIANT_UNSPECIFIED"
    | "USE_BEST_AVAILABLE"
    | "USE_STANDARD"
    | "USE_ENHANCED"
    | (string & {});
  singleUtterance?: boolean;
  bargeInConfig?: GoogleCloudDialogflowCxV3beta1BargeInConfig;
  optOutConformerModelMigration?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1InputAudioConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1InputAudioConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      audioEncoding: Schema.optional(Schema.String),
      sampleRateHertz: Schema.optional(Schema.Number),
      enableWordInfo: Schema.optional(Schema.Boolean),
      phraseHints: Schema.optional(Schema.Array(Schema.String)),
      model: Schema.optional(Schema.String),
      modelVariant: Schema.optional(Schema.String),
      singleUtterance: Schema.optional(Schema.Boolean),
      bargeInConfig: Schema.optional(
        GoogleCloudDialogflowCxV3beta1BargeInConfig,
      ),
      optOutConformerModelMigration: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1InputAudioConfig",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1InputAudioConfig>;

export interface GoogleCloudDialogflowCxV3beta1AudioInput {
  config?: GoogleCloudDialogflowCxV3beta1InputAudioConfig;
  audio?: string;
}

export const GoogleCloudDialogflowCxV3beta1AudioInput: Schema.Schema<GoogleCloudDialogflowCxV3beta1AudioInput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      config: Schema.optional(GoogleCloudDialogflowCxV3beta1InputAudioConfig),
      audio: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1AudioInput",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1AudioInput>;

export interface GoogleCloudDialogflowCxV3beta1EventInput {
  event?: string;
}

export const GoogleCloudDialogflowCxV3beta1EventInput: Schema.Schema<GoogleCloudDialogflowCxV3beta1EventInput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      event: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1EventInput",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1EventInput>;

export interface GoogleCloudDialogflowCxV3beta1DtmfInput {
  digits?: string;
  finishDigit?: string;
}

export const GoogleCloudDialogflowCxV3beta1DtmfInput: Schema.Schema<GoogleCloudDialogflowCxV3beta1DtmfInput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      digits: Schema.optional(Schema.String),
      finishDigit: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1DtmfInput",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1DtmfInput>;

export interface GoogleCloudDialogflowCxV3beta1ToolCallResultError {
  message?: string;
}

export const GoogleCloudDialogflowCxV3beta1ToolCallResultError: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolCallResultError> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1ToolCallResultError",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolCallResultError>;

export interface GoogleCloudDialogflowCxV3beta1ToolCallResult {
  tool?: string;
  action?: string;
  error?: GoogleCloudDialogflowCxV3beta1ToolCallResultError;
  outputParameters?: Record<string, unknown>;
}

export const GoogleCloudDialogflowCxV3beta1ToolCallResult: Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolCallResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tool: Schema.optional(Schema.String),
      action: Schema.optional(Schema.String),
      error: Schema.optional(GoogleCloudDialogflowCxV3beta1ToolCallResultError),
      outputParameters: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1ToolCallResult",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ToolCallResult>;

export interface GoogleCloudDialogflowCxV3beta1QueryInput {
  text?: GoogleCloudDialogflowCxV3beta1TextInput;
  intent?: GoogleCloudDialogflowCxV3beta1IntentInput;
  audio?: GoogleCloudDialogflowCxV3beta1AudioInput;
  event?: GoogleCloudDialogflowCxV3beta1EventInput;
  dtmf?: GoogleCloudDialogflowCxV3beta1DtmfInput;
  toolCallResult?: GoogleCloudDialogflowCxV3beta1ToolCallResult;
  languageCode?: string;
}

export const GoogleCloudDialogflowCxV3beta1QueryInput: Schema.Schema<GoogleCloudDialogflowCxV3beta1QueryInput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(GoogleCloudDialogflowCxV3beta1TextInput),
      intent: Schema.optional(GoogleCloudDialogflowCxV3beta1IntentInput),
      audio: Schema.optional(GoogleCloudDialogflowCxV3beta1AudioInput),
      event: Schema.optional(GoogleCloudDialogflowCxV3beta1EventInput),
      dtmf: Schema.optional(GoogleCloudDialogflowCxV3beta1DtmfInput),
      toolCallResult: Schema.optional(
        GoogleCloudDialogflowCxV3beta1ToolCallResult,
      ),
      languageCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1QueryInput",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1QueryInput>;

export interface GoogleCloudDialogflowCxV3beta1ConversationTurnUserInput {
  input?: GoogleCloudDialogflowCxV3beta1QueryInput;
  injectedParameters?: Record<string, unknown>;
  isWebhookEnabled?: boolean;
  enableSentimentAnalysis?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1ConversationTurnUserInput: Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationTurnUserInput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      input: Schema.optional(GoogleCloudDialogflowCxV3beta1QueryInput),
      injectedParameters: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      isWebhookEnabled: Schema.optional(Schema.Boolean),
      enableSentimentAnalysis: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1ConversationTurnUserInput",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationTurnUserInput>;

export interface GoogleCloudDialogflowCxV3beta1TestRunDifference {
  type?:
    | "DIFF_TYPE_UNSPECIFIED"
    | "INTENT"
    | "PAGE"
    | "PARAMETERS"
    | "UTTERANCE"
    | "FLOW"
    | (string & {});
  description?: string;
}

export const GoogleCloudDialogflowCxV3beta1TestRunDifference: Schema.Schema<GoogleCloudDialogflowCxV3beta1TestRunDifference> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1TestRunDifference",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TestRunDifference>;

export interface GoogleCloudDialogflowCxV3beta1IntentTrainingPhrasePart {
  text?: string;
  parameterId?: string;
}

export const GoogleCloudDialogflowCxV3beta1IntentTrainingPhrasePart: Schema.Schema<GoogleCloudDialogflowCxV3beta1IntentTrainingPhrasePart> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
      parameterId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1IntentTrainingPhrasePart",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1IntentTrainingPhrasePart>;

export interface GoogleCloudDialogflowCxV3beta1IntentTrainingPhrase {
  id?: string;
  parts?: Array<GoogleCloudDialogflowCxV3beta1IntentTrainingPhrasePart>;
  repeatCount?: number;
}

export const GoogleCloudDialogflowCxV3beta1IntentTrainingPhrase: Schema.Schema<GoogleCloudDialogflowCxV3beta1IntentTrainingPhrase> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      parts: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3beta1IntentTrainingPhrasePart),
      ),
      repeatCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1IntentTrainingPhrase",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1IntentTrainingPhrase>;

export interface GoogleCloudDialogflowCxV3beta1IntentParameter {
  id?: string;
  entityType?: string;
  isList?: boolean;
  redact?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1IntentParameter: Schema.Schema<GoogleCloudDialogflowCxV3beta1IntentParameter> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      entityType: Schema.optional(Schema.String),
      isList: Schema.optional(Schema.Boolean),
      redact: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1IntentParameter",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1IntentParameter>;

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

export const GoogleCloudDialogflowCxV3beta1Intent: Schema.Schema<GoogleCloudDialogflowCxV3beta1Intent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      trainingPhrases: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3beta1IntentTrainingPhrase),
      ),
      parameters: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3beta1IntentParameter),
      ),
      priority: Schema.optional(Schema.Number),
      isFallback: Schema.optional(Schema.Boolean),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1Intent",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Intent>;

export interface GoogleCloudDialogflowCxV3beta1FulfillmentSetParameterAction {
  parameter?: string;
  value?: unknown;
}

export const GoogleCloudDialogflowCxV3beta1FulfillmentSetParameterAction: Schema.Schema<GoogleCloudDialogflowCxV3beta1FulfillmentSetParameterAction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      parameter: Schema.optional(Schema.String),
      value: Schema.optional(Schema.Unknown),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1FulfillmentSetParameterAction",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1FulfillmentSetParameterAction>;

export interface GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCaseCaseContent {
  message?: GoogleCloudDialogflowCxV3beta1ResponseMessage;
  additionalCases?: GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCases;
}

export const GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCaseCaseContent: Schema.Schema<GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCaseCaseContent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(GoogleCloudDialogflowCxV3beta1ResponseMessage),
      additionalCases: Schema.optional(
        GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCases,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCaseCaseContent",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCaseCaseContent>;

export interface GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCase {
  condition?: string;
  caseContent?: Array<GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCaseCaseContent>;
}

export const GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCase: Schema.Schema<GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCase> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      condition: Schema.optional(Schema.String),
      caseContent: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCaseCaseContent,
        ),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCase",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCase>;

export interface GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCases {
  cases?: Array<GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCase>;
}

export const GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCases: Schema.Schema<GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCases> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cases: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCasesCase,
        ),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCases",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCases>;

export interface GoogleCloudDialogflowCxV3beta1GcsDestination {
  uri?: string;
}

export const GoogleCloudDialogflowCxV3beta1GcsDestination: Schema.Schema<GoogleCloudDialogflowCxV3beta1GcsDestination> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1GcsDestination",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1GcsDestination>;

export interface GoogleCloudDialogflowCxV3beta1AdvancedSettingsSpeechSettings {
  endpointerSensitivity?: number;
  noSpeechTimeout?: string;
  useTimeoutBasedEndpointing?: boolean;
  models?: Record<string, string>;
}

export const GoogleCloudDialogflowCxV3beta1AdvancedSettingsSpeechSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1AdvancedSettingsSpeechSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      endpointerSensitivity: Schema.optional(Schema.Number),
      noSpeechTimeout: Schema.optional(Schema.String),
      useTimeoutBasedEndpointing: Schema.optional(Schema.Boolean),
      models: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1AdvancedSettingsSpeechSettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1AdvancedSettingsSpeechSettings>;

export interface GoogleCloudDialogflowCxV3beta1AdvancedSettingsDtmfSettings {
  enabled?: boolean;
  maxDigits?: number;
  finishDigit?: string;
  interdigitTimeoutDuration?: string;
  endpointingTimeoutDuration?: string;
}

export const GoogleCloudDialogflowCxV3beta1AdvancedSettingsDtmfSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1AdvancedSettingsDtmfSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
      maxDigits: Schema.optional(Schema.Number),
      finishDigit: Schema.optional(Schema.String),
      interdigitTimeoutDuration: Schema.optional(Schema.String),
      endpointingTimeoutDuration: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1AdvancedSettingsDtmfSettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1AdvancedSettingsDtmfSettings>;

export interface GoogleCloudDialogflowCxV3beta1AdvancedSettingsLoggingSettings {
  enableStackdriverLogging?: boolean;
  enableInteractionLogging?: boolean;
  enableConsentBasedRedaction?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1AdvancedSettingsLoggingSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1AdvancedSettingsLoggingSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enableStackdriverLogging: Schema.optional(Schema.Boolean),
      enableInteractionLogging: Schema.optional(Schema.Boolean),
      enableConsentBasedRedaction: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1AdvancedSettingsLoggingSettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1AdvancedSettingsLoggingSettings>;

export interface GoogleCloudDialogflowCxV3beta1AdvancedSettings {
  audioExportGcsDestination?: GoogleCloudDialogflowCxV3beta1GcsDestination;
  speechSettings?: GoogleCloudDialogflowCxV3beta1AdvancedSettingsSpeechSettings;
  dtmfSettings?: GoogleCloudDialogflowCxV3beta1AdvancedSettingsDtmfSettings;
  loggingSettings?: GoogleCloudDialogflowCxV3beta1AdvancedSettingsLoggingSettings;
}

export const GoogleCloudDialogflowCxV3beta1AdvancedSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1AdvancedSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      audioExportGcsDestination: Schema.optional(
        GoogleCloudDialogflowCxV3beta1GcsDestination,
      ),
      speechSettings: Schema.optional(
        GoogleCloudDialogflowCxV3beta1AdvancedSettingsSpeechSettings,
      ),
      dtmfSettings: Schema.optional(
        GoogleCloudDialogflowCxV3beta1AdvancedSettingsDtmfSettings,
      ),
      loggingSettings: Schema.optional(
        GoogleCloudDialogflowCxV3beta1AdvancedSettingsLoggingSettings,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1AdvancedSettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1AdvancedSettings>;

export interface GoogleCloudDialogflowCxV3beta1FulfillmentGeneratorSettings {
  generator?: string;
  inputParameters?: Record<string, string>;
  outputParameter?: string;
}

export const GoogleCloudDialogflowCxV3beta1FulfillmentGeneratorSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1FulfillmentGeneratorSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      generator: Schema.optional(Schema.String),
      inputParameters: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      outputParameter: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1FulfillmentGeneratorSettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1FulfillmentGeneratorSettings>;

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

export const GoogleCloudDialogflowCxV3beta1Fulfillment: Schema.Schema<GoogleCloudDialogflowCxV3beta1Fulfillment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      messages: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3beta1ResponseMessage),
      ),
      webhook: Schema.optional(Schema.String),
      returnPartialResponses: Schema.optional(Schema.Boolean),
      tag: Schema.optional(Schema.String),
      setParameterActions: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowCxV3beta1FulfillmentSetParameterAction,
        ),
      ),
      conditionalCases: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3beta1FulfillmentConditionalCases),
      ),
      advancedSettings: Schema.optional(
        GoogleCloudDialogflowCxV3beta1AdvancedSettings,
      ),
      enableGenerativeFallback: Schema.optional(Schema.Boolean),
      generators: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowCxV3beta1FulfillmentGeneratorSettings,
        ),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1Fulfillment",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Fulfillment>;

export interface GoogleCloudDialogflowCxV3beta1EventHandler {
  name?: string;
  event?: string;
  triggerFulfillment?: GoogleCloudDialogflowCxV3beta1Fulfillment;
  targetPage?: string;
  targetFlow?: string;
  targetPlaybook?: string;
}

export const GoogleCloudDialogflowCxV3beta1EventHandler: Schema.Schema<GoogleCloudDialogflowCxV3beta1EventHandler> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      event: Schema.optional(Schema.String),
      triggerFulfillment: Schema.optional(
        GoogleCloudDialogflowCxV3beta1Fulfillment,
      ),
      targetPage: Schema.optional(Schema.String),
      targetFlow: Schema.optional(Schema.String),
      targetPlaybook: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1EventHandler",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1EventHandler>;

export interface GoogleCloudDialogflowCxV3beta1FormParameterFillBehavior {
  initialPromptFulfillment?: GoogleCloudDialogflowCxV3beta1Fulfillment;
  repromptEventHandlers?: Array<GoogleCloudDialogflowCxV3beta1EventHandler>;
}

export const GoogleCloudDialogflowCxV3beta1FormParameterFillBehavior: Schema.Schema<GoogleCloudDialogflowCxV3beta1FormParameterFillBehavior> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      initialPromptFulfillment: Schema.optional(
        GoogleCloudDialogflowCxV3beta1Fulfillment,
      ),
      repromptEventHandlers: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3beta1EventHandler),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1FormParameterFillBehavior",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1FormParameterFillBehavior>;

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

export const GoogleCloudDialogflowCxV3beta1FormParameter: Schema.Schema<GoogleCloudDialogflowCxV3beta1FormParameter> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      required: Schema.optional(Schema.Boolean),
      entityType: Schema.optional(Schema.String),
      isList: Schema.optional(Schema.Boolean),
      fillBehavior: Schema.optional(
        GoogleCloudDialogflowCxV3beta1FormParameterFillBehavior,
      ),
      defaultValue: Schema.optional(Schema.Unknown),
      redact: Schema.optional(Schema.Boolean),
      advancedSettings: Schema.optional(
        GoogleCloudDialogflowCxV3beta1AdvancedSettings,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1FormParameter",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1FormParameter>;

export interface GoogleCloudDialogflowCxV3beta1Form {
  parameters?: Array<GoogleCloudDialogflowCxV3beta1FormParameter>;
}

export const GoogleCloudDialogflowCxV3beta1Form: Schema.Schema<GoogleCloudDialogflowCxV3beta1Form> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      parameters: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3beta1FormParameter),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1Form",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Form>;

export interface GoogleCloudDialogflowCxV3beta1TransitionRoute {
  name?: string;
  description?: string;
  intent?: string;
  condition?: string;
  triggerFulfillment?: GoogleCloudDialogflowCxV3beta1Fulfillment;
  targetPage?: string;
  targetFlow?: string;
}

export const GoogleCloudDialogflowCxV3beta1TransitionRoute: Schema.Schema<GoogleCloudDialogflowCxV3beta1TransitionRoute> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      intent: Schema.optional(Schema.String),
      condition: Schema.optional(Schema.String),
      triggerFulfillment: Schema.optional(
        GoogleCloudDialogflowCxV3beta1Fulfillment,
      ),
      targetPage: Schema.optional(Schema.String),
      targetFlow: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1TransitionRoute",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TransitionRoute>;

export interface GoogleCloudDialogflowCxV3beta1DataStoreConnection {
  dataStoreType?:
    | "DATA_STORE_TYPE_UNSPECIFIED"
    | "PUBLIC_WEB"
    | "UNSTRUCTURED"
    | "STRUCTURED"
    | (string & {});
  dataStore?: string;
  documentProcessingMode?:
    | "DOCUMENT_PROCESSING_MODE_UNSPECIFIED"
    | "DOCUMENTS"
    | "CHUNKS"
    | (string & {});
}

export const GoogleCloudDialogflowCxV3beta1DataStoreConnection: Schema.Schema<GoogleCloudDialogflowCxV3beta1DataStoreConnection> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dataStoreType: Schema.optional(Schema.String),
      dataStore: Schema.optional(Schema.String),
      documentProcessingMode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1DataStoreConnection",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1DataStoreConnection>;

export interface GoogleCloudDialogflowCxV3beta1KnowledgeConnectorSettings {
  enabled?: boolean;
  triggerFulfillment?: GoogleCloudDialogflowCxV3beta1Fulfillment;
  targetPage?: string;
  targetFlow?: string;
  dataStoreConnections?: Array<GoogleCloudDialogflowCxV3beta1DataStoreConnection>;
}

export const GoogleCloudDialogflowCxV3beta1KnowledgeConnectorSettings: Schema.Schema<GoogleCloudDialogflowCxV3beta1KnowledgeConnectorSettings> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enabled: Schema.optional(Schema.Boolean),
      triggerFulfillment: Schema.optional(
        GoogleCloudDialogflowCxV3beta1Fulfillment,
      ),
      targetPage: Schema.optional(Schema.String),
      targetFlow: Schema.optional(Schema.String),
      dataStoreConnections: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3beta1DataStoreConnection),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1KnowledgeConnectorSettings",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1KnowledgeConnectorSettings>;

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

export const GoogleCloudDialogflowCxV3beta1Page: Schema.Schema<GoogleCloudDialogflowCxV3beta1Page> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      entryFulfillment: Schema.optional(
        GoogleCloudDialogflowCxV3beta1Fulfillment,
      ),
      form: Schema.optional(GoogleCloudDialogflowCxV3beta1Form),
      transitionRouteGroups: Schema.optional(Schema.Array(Schema.String)),
      transitionRoutes: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3beta1TransitionRoute),
      ),
      eventHandlers: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3beta1EventHandler),
      ),
      advancedSettings: Schema.optional(
        GoogleCloudDialogflowCxV3beta1AdvancedSettings,
      ),
      knowledgeConnectorSettings: Schema.optional(
        GoogleCloudDialogflowCxV3beta1KnowledgeConnectorSettings,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1Page",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Page>;

export interface GoogleCloudDialogflowCxV3beta1ConversationTurnVirtualAgentOutput {
  sessionParameters?: Record<string, unknown>;
  differences?: Array<GoogleCloudDialogflowCxV3beta1TestRunDifference>;
  diagnosticInfo?: Record<string, unknown>;
  triggeredIntent?: GoogleCloudDialogflowCxV3beta1Intent;
  currentPage?: GoogleCloudDialogflowCxV3beta1Page;
  textResponses?: Array<GoogleCloudDialogflowCxV3beta1ResponseMessageText>;
  status?: GoogleRpcStatus;
}

export const GoogleCloudDialogflowCxV3beta1ConversationTurnVirtualAgentOutput: Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationTurnVirtualAgentOutput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      sessionParameters: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      differences: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3beta1TestRunDifference),
      ),
      diagnosticInfo: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      triggeredIntent: Schema.optional(GoogleCloudDialogflowCxV3beta1Intent),
      currentPage: Schema.optional(GoogleCloudDialogflowCxV3beta1Page),
      textResponses: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3beta1ResponseMessageText),
      ),
      status: Schema.optional(GoogleRpcStatus),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3beta1ConversationTurnVirtualAgentOutput",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationTurnVirtualAgentOutput>;

export interface GoogleCloudDialogflowCxV3beta1ConversationTurn {
  userInput?: GoogleCloudDialogflowCxV3beta1ConversationTurnUserInput;
  virtualAgentOutput?: GoogleCloudDialogflowCxV3beta1ConversationTurnVirtualAgentOutput;
}

export const GoogleCloudDialogflowCxV3beta1ConversationTurn: Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationTurn> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      userInput: Schema.optional(
        GoogleCloudDialogflowCxV3beta1ConversationTurnUserInput,
      ),
      virtualAgentOutput: Schema.optional(
        GoogleCloudDialogflowCxV3beta1ConversationTurnVirtualAgentOutput,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1ConversationTurn",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationTurn>;

export interface GoogleCloudDialogflowCxV3beta1TestCaseResult {
  name?: string;
  environment?: string;
  conversationTurns?: Array<GoogleCloudDialogflowCxV3beta1ConversationTurn>;
  testResult?: "TEST_RESULT_UNSPECIFIED" | "PASSED" | "FAILED" | (string & {});
  testTime?: string;
}

export const GoogleCloudDialogflowCxV3beta1TestCaseResult: Schema.Schema<GoogleCloudDialogflowCxV3beta1TestCaseResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      environment: Schema.optional(Schema.String),
      conversationTurns: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3beta1ConversationTurn),
      ),
      testResult: Schema.optional(Schema.String),
      testTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1TestCaseResult",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TestCaseResult>;

export interface GoogleCloudDialogflowCxV3beta1BatchRunTestCasesResponse {
  results?: Array<GoogleCloudDialogflowCxV3beta1TestCaseResult>;
}

export const GoogleCloudDialogflowCxV3beta1BatchRunTestCasesResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1BatchRunTestCasesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      results: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3beta1TestCaseResult),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1BatchRunTestCasesResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1BatchRunTestCasesResponse>;

export interface GoogleCloudDialogflowCxV3beta1RunTestCaseMetadata {}

export const GoogleCloudDialogflowCxV3beta1RunTestCaseMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1RunTestCaseMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1RunTestCaseMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1RunTestCaseMetadata>;

export interface GoogleCloudDialogflowCxV3beta1RunTestCaseResponse {
  result?: GoogleCloudDialogflowCxV3beta1TestCaseResult;
}

export const GoogleCloudDialogflowCxV3beta1RunTestCaseResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1RunTestCaseResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      result: Schema.optional(GoogleCloudDialogflowCxV3beta1TestCaseResult),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1RunTestCaseResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1RunTestCaseResponse>;

export interface GoogleCloudDialogflowCxV3beta1ExportTestCasesMetadata {}

export const GoogleCloudDialogflowCxV3beta1ExportTestCasesMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportTestCasesMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1ExportTestCasesMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportTestCasesMetadata>;

export interface GoogleCloudDialogflowCxV3beta1ExportTestCasesResponse {
  gcsUri?: string;
  content?: string;
}

export const GoogleCloudDialogflowCxV3beta1ExportTestCasesResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportTestCasesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gcsUri: Schema.optional(Schema.String),
      content: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1ExportTestCasesResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ExportTestCasesResponse>;

export interface GoogleCloudDialogflowCxV3beta1TestConfig {
  trackingParameters?: Array<string>;
  flow?: string;
  page?: string;
}

export const GoogleCloudDialogflowCxV3beta1TestConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1TestConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      trackingParameters: Schema.optional(Schema.Array(Schema.String)),
      flow: Schema.optional(Schema.String),
      page: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1TestConfig",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TestConfig>;

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

export const GoogleCloudDialogflowCxV3beta1TestCase: Schema.Schema<GoogleCloudDialogflowCxV3beta1TestCase> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      tags: Schema.optional(Schema.Array(Schema.String)),
      displayName: Schema.optional(Schema.String),
      notes: Schema.optional(Schema.String),
      testConfig: Schema.optional(GoogleCloudDialogflowCxV3beta1TestConfig),
      testCaseConversationTurns: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3beta1ConversationTurn),
      ),
      creationTime: Schema.optional(Schema.String),
      lastTestResult: Schema.optional(
        GoogleCloudDialogflowCxV3beta1TestCaseResult,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1TestCase",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TestCase>;

export interface GoogleCloudDialogflowCxV3beta1TestCaseError {
  testCase?: GoogleCloudDialogflowCxV3beta1TestCase;
  status?: GoogleRpcStatus;
}

export const GoogleCloudDialogflowCxV3beta1TestCaseError: Schema.Schema<GoogleCloudDialogflowCxV3beta1TestCaseError> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      testCase: Schema.optional(GoogleCloudDialogflowCxV3beta1TestCase),
      status: Schema.optional(GoogleRpcStatus),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1TestCaseError",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TestCaseError>;

export interface GoogleCloudDialogflowCxV3beta1ImportTestCasesMetadata {
  errors?: Array<GoogleCloudDialogflowCxV3beta1TestCaseError>;
}

export const GoogleCloudDialogflowCxV3beta1ImportTestCasesMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportTestCasesMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      errors: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3beta1TestCaseError),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1ImportTestCasesMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportTestCasesMetadata>;

export interface GoogleCloudDialogflowCxV3beta1ImportTestCasesResponse {
  names?: Array<string>;
}

export const GoogleCloudDialogflowCxV3beta1ImportTestCasesResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportTestCasesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      names: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1ImportTestCasesResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ImportTestCasesResponse>;

export interface GoogleCloudDialogflowCxV3beta1RunContinuousTestMetadata {
  errors?: Array<GoogleCloudDialogflowCxV3beta1TestError>;
}

export const GoogleCloudDialogflowCxV3beta1RunContinuousTestMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1RunContinuousTestMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      errors: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3beta1TestError),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1RunContinuousTestMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1RunContinuousTestMetadata>;

export interface GoogleCloudDialogflowCxV3beta1ContinuousTestResult {
  name?: string;
  result?:
    | "AGGREGATED_TEST_RESULT_UNSPECIFIED"
    | "PASSED"
    | "FAILED"
    | (string & {});
  testCaseResults?: Array<string>;
  runTime?: string;
}

export const GoogleCloudDialogflowCxV3beta1ContinuousTestResult: Schema.Schema<GoogleCloudDialogflowCxV3beta1ContinuousTestResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      result: Schema.optional(Schema.String),
      testCaseResults: Schema.optional(Schema.Array(Schema.String)),
      runTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1ContinuousTestResult",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ContinuousTestResult>;

export interface GoogleCloudDialogflowCxV3beta1RunContinuousTestResponse {
  continuousTestResult?: GoogleCloudDialogflowCxV3beta1ContinuousTestResult;
}

export const GoogleCloudDialogflowCxV3beta1RunContinuousTestResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1RunContinuousTestResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      continuousTestResult: Schema.optional(
        GoogleCloudDialogflowCxV3beta1ContinuousTestResult,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1RunContinuousTestResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1RunContinuousTestResponse>;

export interface GoogleCloudDialogflowCxV3beta1DeployFlowMetadata {
  testErrors?: Array<GoogleCloudDialogflowCxV3beta1TestError>;
}

export const GoogleCloudDialogflowCxV3beta1DeployFlowMetadata: Schema.Schema<GoogleCloudDialogflowCxV3beta1DeployFlowMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      testErrors: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3beta1TestError),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1DeployFlowMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1DeployFlowMetadata>;

export interface GoogleCloudDialogflowCxV3beta1EnvironmentVersionConfig {
  version?: string;
}

export const GoogleCloudDialogflowCxV3beta1EnvironmentVersionConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1EnvironmentVersionConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1EnvironmentVersionConfig",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1EnvironmentVersionConfig>;

export interface GoogleCloudDialogflowCxV3beta1EnvironmentTestCasesConfig {
  testCases?: Array<string>;
  enableContinuousRun?: boolean;
  enablePredeploymentRun?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1EnvironmentTestCasesConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1EnvironmentTestCasesConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      testCases: Schema.optional(Schema.Array(Schema.String)),
      enableContinuousRun: Schema.optional(Schema.Boolean),
      enablePredeploymentRun: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1EnvironmentTestCasesConfig",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1EnvironmentTestCasesConfig>;

export interface GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceSecretVersionHeaderValue {
  secretVersion?: string;
}

export const GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceSecretVersionHeaderValue: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceSecretVersionHeaderValue> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      secretVersion: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceSecretVersionHeaderValue",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceSecretVersionHeaderValue>;

export interface GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceOAuthConfig {
  clientId?: string;
  clientSecret?: string;
  secretVersionForClientSecret?: string;
  tokenEndpoint?: string;
  scopes?: Array<string>;
}

export const GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceOAuthConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceOAuthConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      clientId: Schema.optional(Schema.String),
      clientSecret: Schema.optional(Schema.String),
      secretVersionForClientSecret: Schema.optional(Schema.String),
      tokenEndpoint: Schema.optional(Schema.String),
      scopes: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceOAuthConfig",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceOAuthConfig>;

export interface GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceServiceAccountAuthConfig {
  serviceAccount?: string;
}

export const GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceServiceAccountAuthConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceServiceAccountAuthConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      serviceAccount: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceServiceAccountAuthConfig",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceServiceAccountAuthConfig>;

export interface GoogleCloudDialogflowCxV3beta1WebhookGenericWebService {
  uri?: string;
  username?: string;
  password?: string;
  secretVersionForUsernamePassword?: string;
  requestHeaders?: Record<string, string>;
  secretVersionsForRequestHeaders?: Record<
    string,
    GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceSecretVersionHeaderValue
  >;
  allowedCaCerts?: Array<string>;
  oauthConfig?: GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceOAuthConfig;
  serviceAgentAuth?:
    | "SERVICE_AGENT_AUTH_UNSPECIFIED"
    | "NONE"
    | "ID_TOKEN"
    | "ACCESS_TOKEN"
    | (string & {});
  serviceAccountAuthConfig?: GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceServiceAccountAuthConfig;
  webhookType?:
    | "WEBHOOK_TYPE_UNSPECIFIED"
    | "STANDARD"
    | "FLEXIBLE"
    | (string & {});
  httpMethod?:
    | "HTTP_METHOD_UNSPECIFIED"
    | "POST"
    | "GET"
    | "HEAD"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "OPTIONS"
    | (string & {});
  requestBody?: string;
  parameterMapping?: Record<string, string>;
}

export const GoogleCloudDialogflowCxV3beta1WebhookGenericWebService: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookGenericWebService> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
      username: Schema.optional(Schema.String),
      password: Schema.optional(Schema.String),
      secretVersionForUsernamePassword: Schema.optional(Schema.String),
      requestHeaders: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      secretVersionsForRequestHeaders: Schema.optional(
        Schema.Record(
          Schema.String,
          GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceSecretVersionHeaderValue,
        ),
      ),
      allowedCaCerts: Schema.optional(Schema.Array(Schema.String)),
      oauthConfig: Schema.optional(
        GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceOAuthConfig,
      ),
      serviceAgentAuth: Schema.optional(Schema.String),
      serviceAccountAuthConfig: Schema.optional(
        GoogleCloudDialogflowCxV3beta1WebhookGenericWebServiceServiceAccountAuthConfig,
      ),
      webhookType: Schema.optional(Schema.String),
      httpMethod: Schema.optional(Schema.String),
      requestBody: Schema.optional(Schema.String),
      parameterMapping: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1WebhookGenericWebService",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookGenericWebService>;

export interface GoogleCloudDialogflowCxV3beta1WebhookServiceDirectoryConfig {
  service?: string;
  genericWebService?: GoogleCloudDialogflowCxV3beta1WebhookGenericWebService;
}

export const GoogleCloudDialogflowCxV3beta1WebhookServiceDirectoryConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookServiceDirectoryConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      service: Schema.optional(Schema.String),
      genericWebService: Schema.optional(
        GoogleCloudDialogflowCxV3beta1WebhookGenericWebService,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1WebhookServiceDirectoryConfig",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1WebhookServiceDirectoryConfig>;

export interface GoogleCloudDialogflowCxV3beta1Webhook {
  name?: string;
  displayName?: string;
  genericWebService?: GoogleCloudDialogflowCxV3beta1WebhookGenericWebService;
  serviceDirectory?: GoogleCloudDialogflowCxV3beta1WebhookServiceDirectoryConfig;
  timeout?: string;
  disabled?: boolean;
}

export const GoogleCloudDialogflowCxV3beta1Webhook: Schema.Schema<GoogleCloudDialogflowCxV3beta1Webhook> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      genericWebService: Schema.optional(
        GoogleCloudDialogflowCxV3beta1WebhookGenericWebService,
      ),
      serviceDirectory: Schema.optional(
        GoogleCloudDialogflowCxV3beta1WebhookServiceDirectoryConfig,
      ),
      timeout: Schema.optional(Schema.String),
      disabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1Webhook",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Webhook>;

export interface GoogleCloudDialogflowCxV3beta1EnvironmentWebhookConfig {
  webhookOverrides?: Array<GoogleCloudDialogflowCxV3beta1Webhook>;
}

export const GoogleCloudDialogflowCxV3beta1EnvironmentWebhookConfig: Schema.Schema<GoogleCloudDialogflowCxV3beta1EnvironmentWebhookConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      webhookOverrides: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3beta1Webhook),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1EnvironmentWebhookConfig",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1EnvironmentWebhookConfig>;

export interface GoogleCloudDialogflowCxV3beta1Environment {
  name?: string;
  displayName?: string;
  description?: string;
  versionConfigs?: Array<GoogleCloudDialogflowCxV3beta1EnvironmentVersionConfig>;
  updateTime?: string;
  testCasesConfig?: GoogleCloudDialogflowCxV3beta1EnvironmentTestCasesConfig;
  webhookConfig?: GoogleCloudDialogflowCxV3beta1EnvironmentWebhookConfig;
}

export const GoogleCloudDialogflowCxV3beta1Environment: Schema.Schema<GoogleCloudDialogflowCxV3beta1Environment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      versionConfigs: Schema.optional(
        Schema.Array(GoogleCloudDialogflowCxV3beta1EnvironmentVersionConfig),
      ),
      updateTime: Schema.optional(Schema.String),
      testCasesConfig: Schema.optional(
        GoogleCloudDialogflowCxV3beta1EnvironmentTestCasesConfig,
      ),
      webhookConfig: Schema.optional(
        GoogleCloudDialogflowCxV3beta1EnvironmentWebhookConfig,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1Environment",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1Environment>;

export interface GoogleCloudDialogflowCxV3beta1DeployFlowResponse {
  environment?: GoogleCloudDialogflowCxV3beta1Environment;
  deployment?: string;
}

export const GoogleCloudDialogflowCxV3beta1DeployFlowResponse: Schema.Schema<GoogleCloudDialogflowCxV3beta1DeployFlowResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      environment: Schema.optional(GoogleCloudDialogflowCxV3beta1Environment),
      deployment: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1DeployFlowResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1DeployFlowResponse>;

export interface GoogleCloudDialogflowCxV3beta1TurnSignals {
  noMatch?: boolean;
  noUserInput?: boolean;
  dtmfUsed?: boolean;
  userEscalated?: boolean;
  agentEscalated?: boolean;
  reachedEndPage?: boolean;
  webhookStatuses?: Array<string>;
  failureReasons?: Array<
    | "FAILURE_REASON_UNSPECIFIED"
    | "FAILED_INTENT"
    | "FAILED_WEBHOOK"
    | (string & {})
  >;
  sentimentScore?: number;
  sentimentMagnitude?: number;
}

export const GoogleCloudDialogflowCxV3beta1TurnSignals: Schema.Schema<GoogleCloudDialogflowCxV3beta1TurnSignals> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
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
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1TurnSignals",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1TurnSignals>;

export interface GoogleCloudDialogflowCxV3beta1ConversationSignals {
  turnSignals?: GoogleCloudDialogflowCxV3beta1TurnSignals;
}

export const GoogleCloudDialogflowCxV3beta1ConversationSignals: Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationSignals> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      turnSignals: Schema.optional(GoogleCloudDialogflowCxV3beta1TurnSignals),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowCxV3beta1ConversationSignals",
  }) as any as Schema.Schema<GoogleCloudDialogflowCxV3beta1ConversationSignals>;

export interface GoogleCloudDialogflowV2EntityTypeEntity {
  value?: string;
  synonyms?: Array<string>;
}

export const GoogleCloudDialogflowV2EntityTypeEntity: Schema.Schema<GoogleCloudDialogflowV2EntityTypeEntity> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
      synonyms: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2EntityTypeEntity",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2EntityTypeEntity>;

export interface GoogleCloudDialogflowV2EntityType {
  name?: string;
  displayName?: string;
  kind?:
    | "KIND_UNSPECIFIED"
    | "KIND_MAP"
    | "KIND_LIST"
    | "KIND_REGEXP"
    | (string & {});
  autoExpansionMode?:
    | "AUTO_EXPANSION_MODE_UNSPECIFIED"
    | "AUTO_EXPANSION_MODE_DEFAULT"
    | (string & {});
  entities?: Array<GoogleCloudDialogflowV2EntityTypeEntity>;
  enableFuzzyExtraction?: boolean;
}

export const GoogleCloudDialogflowV2EntityType: Schema.Schema<GoogleCloudDialogflowV2EntityType> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      autoExpansionMode: Schema.optional(Schema.String),
      entities: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2EntityTypeEntity),
      ),
      enableFuzzyExtraction: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2EntityType",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2EntityType>;

export interface GoogleCloudDialogflowV2BatchUpdateEntityTypesResponse {
  entityTypes?: Array<GoogleCloudDialogflowV2EntityType>;
}

export const GoogleCloudDialogflowV2BatchUpdateEntityTypesResponse: Schema.Schema<GoogleCloudDialogflowV2BatchUpdateEntityTypesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entityTypes: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2EntityType),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2BatchUpdateEntityTypesResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2BatchUpdateEntityTypesResponse>;

export interface GoogleCloudDialogflowV2IntentTrainingPhrasePart {
  text?: string;
  entityType?: string;
  alias?: string;
  userDefined?: boolean;
}

export const GoogleCloudDialogflowV2IntentTrainingPhrasePart: Schema.Schema<GoogleCloudDialogflowV2IntentTrainingPhrasePart> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
      entityType: Schema.optional(Schema.String),
      alias: Schema.optional(Schema.String),
      userDefined: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2IntentTrainingPhrasePart",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentTrainingPhrasePart>;

export interface GoogleCloudDialogflowV2IntentTrainingPhrase {
  name?: string;
  type?: "TYPE_UNSPECIFIED" | "EXAMPLE" | "TEMPLATE" | (string & {});
  parts?: Array<GoogleCloudDialogflowV2IntentTrainingPhrasePart>;
  timesAddedCount?: number;
}

export const GoogleCloudDialogflowV2IntentTrainingPhrase: Schema.Schema<GoogleCloudDialogflowV2IntentTrainingPhrase> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      parts: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2IntentTrainingPhrasePart),
      ),
      timesAddedCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2IntentTrainingPhrase",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentTrainingPhrase>;

export interface GoogleCloudDialogflowV2Context {
  name?: string;
  lifespanCount?: number;
  parameters?: Record<string, unknown>;
}

export const GoogleCloudDialogflowV2Context: Schema.Schema<GoogleCloudDialogflowV2Context> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      lifespanCount: Schema.optional(Schema.Number),
      parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2Context",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2Context>;

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

export const GoogleCloudDialogflowV2IntentParameter: Schema.Schema<GoogleCloudDialogflowV2IntentParameter> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
      defaultValue: Schema.optional(Schema.String),
      entityTypeDisplayName: Schema.optional(Schema.String),
      mandatory: Schema.optional(Schema.Boolean),
      prompts: Schema.optional(Schema.Array(Schema.String)),
      isList: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2IntentParameter",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentParameter>;

export interface GoogleCloudDialogflowV2IntentMessageText {
  text?: Array<string>;
}

export const GoogleCloudDialogflowV2IntentMessageText: Schema.Schema<GoogleCloudDialogflowV2IntentMessageText> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2IntentMessageText",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageText>;

export interface GoogleCloudDialogflowV2IntentMessageImage {
  imageUri?: string;
  accessibilityText?: string;
}

export const GoogleCloudDialogflowV2IntentMessageImage: Schema.Schema<GoogleCloudDialogflowV2IntentMessageImage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      imageUri: Schema.optional(Schema.String),
      accessibilityText: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2IntentMessageImage",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageImage>;

export interface GoogleCloudDialogflowV2IntentMessageQuickReplies {
  title?: string;
  quickReplies?: Array<string>;
}

export const GoogleCloudDialogflowV2IntentMessageQuickReplies: Schema.Schema<GoogleCloudDialogflowV2IntentMessageQuickReplies> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      quickReplies: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2IntentMessageQuickReplies",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageQuickReplies>;

export interface GoogleCloudDialogflowV2IntentMessageCardButton {
  text?: string;
  postback?: string;
}

export const GoogleCloudDialogflowV2IntentMessageCardButton: Schema.Schema<GoogleCloudDialogflowV2IntentMessageCardButton> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
      postback: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2IntentMessageCardButton",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageCardButton>;

export interface GoogleCloudDialogflowV2IntentMessageCard {
  title?: string;
  subtitle?: string;
  imageUri?: string;
  buttons?: Array<GoogleCloudDialogflowV2IntentMessageCardButton>;
}

export const GoogleCloudDialogflowV2IntentMessageCard: Schema.Schema<GoogleCloudDialogflowV2IntentMessageCard> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      subtitle: Schema.optional(Schema.String),
      imageUri: Schema.optional(Schema.String),
      buttons: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2IntentMessageCardButton),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2IntentMessageCard",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageCard>;

export interface GoogleCloudDialogflowV2IntentMessageSimpleResponse {
  textToSpeech?: string;
  ssml?: string;
  displayText?: string;
}

export const GoogleCloudDialogflowV2IntentMessageSimpleResponse: Schema.Schema<GoogleCloudDialogflowV2IntentMessageSimpleResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      textToSpeech: Schema.optional(Schema.String),
      ssml: Schema.optional(Schema.String),
      displayText: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2IntentMessageSimpleResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageSimpleResponse>;

export interface GoogleCloudDialogflowV2IntentMessageSimpleResponses {
  simpleResponses?: Array<GoogleCloudDialogflowV2IntentMessageSimpleResponse>;
}

export const GoogleCloudDialogflowV2IntentMessageSimpleResponses: Schema.Schema<GoogleCloudDialogflowV2IntentMessageSimpleResponses> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      simpleResponses: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2IntentMessageSimpleResponse),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2IntentMessageSimpleResponses",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageSimpleResponses>;

export interface GoogleCloudDialogflowV2IntentMessageBasicCardButtonOpenUriAction {
  uri?: string;
}

export const GoogleCloudDialogflowV2IntentMessageBasicCardButtonOpenUriAction: Schema.Schema<GoogleCloudDialogflowV2IntentMessageBasicCardButtonOpenUriAction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2IntentMessageBasicCardButtonOpenUriAction",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageBasicCardButtonOpenUriAction>;

export interface GoogleCloudDialogflowV2IntentMessageBasicCardButton {
  title?: string;
  openUriAction?: GoogleCloudDialogflowV2IntentMessageBasicCardButtonOpenUriAction;
}

export const GoogleCloudDialogflowV2IntentMessageBasicCardButton: Schema.Schema<GoogleCloudDialogflowV2IntentMessageBasicCardButton> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      openUriAction: Schema.optional(
        GoogleCloudDialogflowV2IntentMessageBasicCardButtonOpenUriAction,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2IntentMessageBasicCardButton",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageBasicCardButton>;

export interface GoogleCloudDialogflowV2IntentMessageBasicCard {
  title?: string;
  subtitle?: string;
  formattedText?: string;
  image?: GoogleCloudDialogflowV2IntentMessageImage;
  buttons?: Array<GoogleCloudDialogflowV2IntentMessageBasicCardButton>;
}

export const GoogleCloudDialogflowV2IntentMessageBasicCard: Schema.Schema<GoogleCloudDialogflowV2IntentMessageBasicCard> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      subtitle: Schema.optional(Schema.String),
      formattedText: Schema.optional(Schema.String),
      image: Schema.optional(GoogleCloudDialogflowV2IntentMessageImage),
      buttons: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2IntentMessageBasicCardButton),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2IntentMessageBasicCard",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageBasicCard>;

export interface GoogleCloudDialogflowV2IntentMessageSuggestion {
  title?: string;
}

export const GoogleCloudDialogflowV2IntentMessageSuggestion: Schema.Schema<GoogleCloudDialogflowV2IntentMessageSuggestion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2IntentMessageSuggestion",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageSuggestion>;

export interface GoogleCloudDialogflowV2IntentMessageSuggestions {
  suggestions?: Array<GoogleCloudDialogflowV2IntentMessageSuggestion>;
}

export const GoogleCloudDialogflowV2IntentMessageSuggestions: Schema.Schema<GoogleCloudDialogflowV2IntentMessageSuggestions> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      suggestions: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2IntentMessageSuggestion),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2IntentMessageSuggestions",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageSuggestions>;

export interface GoogleCloudDialogflowV2IntentMessageLinkOutSuggestion {
  destinationName?: string;
  uri?: string;
}

export const GoogleCloudDialogflowV2IntentMessageLinkOutSuggestion: Schema.Schema<GoogleCloudDialogflowV2IntentMessageLinkOutSuggestion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      destinationName: Schema.optional(Schema.String),
      uri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2IntentMessageLinkOutSuggestion",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageLinkOutSuggestion>;

export interface GoogleCloudDialogflowV2IntentMessageSelectItemInfo {
  key?: string;
  synonyms?: Array<string>;
}

export const GoogleCloudDialogflowV2IntentMessageSelectItemInfo: Schema.Schema<GoogleCloudDialogflowV2IntentMessageSelectItemInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      key: Schema.optional(Schema.String),
      synonyms: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2IntentMessageSelectItemInfo",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageSelectItemInfo>;

export interface GoogleCloudDialogflowV2IntentMessageListSelectItem {
  info?: GoogleCloudDialogflowV2IntentMessageSelectItemInfo;
  title?: string;
  description?: string;
  image?: GoogleCloudDialogflowV2IntentMessageImage;
}

export const GoogleCloudDialogflowV2IntentMessageListSelectItem: Schema.Schema<GoogleCloudDialogflowV2IntentMessageListSelectItem> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      info: Schema.optional(GoogleCloudDialogflowV2IntentMessageSelectItemInfo),
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      image: Schema.optional(GoogleCloudDialogflowV2IntentMessageImage),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2IntentMessageListSelectItem",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageListSelectItem>;

export interface GoogleCloudDialogflowV2IntentMessageListSelect {
  title?: string;
  items?: Array<GoogleCloudDialogflowV2IntentMessageListSelectItem>;
  subtitle?: string;
}

export const GoogleCloudDialogflowV2IntentMessageListSelect: Schema.Schema<GoogleCloudDialogflowV2IntentMessageListSelect> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      items: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2IntentMessageListSelectItem),
      ),
      subtitle: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2IntentMessageListSelect",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageListSelect>;

export interface GoogleCloudDialogflowV2IntentMessageCarouselSelectItem {
  info?: GoogleCloudDialogflowV2IntentMessageSelectItemInfo;
  title?: string;
  description?: string;
  image?: GoogleCloudDialogflowV2IntentMessageImage;
}

export const GoogleCloudDialogflowV2IntentMessageCarouselSelectItem: Schema.Schema<GoogleCloudDialogflowV2IntentMessageCarouselSelectItem> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      info: Schema.optional(GoogleCloudDialogflowV2IntentMessageSelectItemInfo),
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      image: Schema.optional(GoogleCloudDialogflowV2IntentMessageImage),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2IntentMessageCarouselSelectItem",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageCarouselSelectItem>;

export interface GoogleCloudDialogflowV2IntentMessageCarouselSelect {
  items?: Array<GoogleCloudDialogflowV2IntentMessageCarouselSelectItem>;
}

export const GoogleCloudDialogflowV2IntentMessageCarouselSelect: Schema.Schema<GoogleCloudDialogflowV2IntentMessageCarouselSelect> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      items: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2IntentMessageCarouselSelectItem),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2IntentMessageCarouselSelect",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageCarouselSelect>;

export interface GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction {
  url?: string;
  urlTypeHint?:
    | "URL_TYPE_HINT_UNSPECIFIED"
    | "AMP_ACTION"
    | "AMP_CONTENT"
    | (string & {});
}

export const GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction: Schema.Schema<GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      url: Schema.optional(Schema.String),
      urlTypeHint: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction>;

export interface GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItem {
  openUriAction?: GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction;
  title?: string;
  description?: string;
  image?: GoogleCloudDialogflowV2IntentMessageImage;
  footer?: string;
}

export const GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItem: Schema.Schema<GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItem> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      openUriAction: Schema.optional(
        GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction,
      ),
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      image: Schema.optional(GoogleCloudDialogflowV2IntentMessageImage),
      footer: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItem",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItem>;

export interface GoogleCloudDialogflowV2IntentMessageBrowseCarouselCard {
  items?: Array<GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItem>;
  imageDisplayOptions?:
    | "IMAGE_DISPLAY_OPTIONS_UNSPECIFIED"
    | "GRAY"
    | "WHITE"
    | "CROPPED"
    | "BLURRED_BACKGROUND"
    | (string & {});
}

export const GoogleCloudDialogflowV2IntentMessageBrowseCarouselCard: Schema.Schema<GoogleCloudDialogflowV2IntentMessageBrowseCarouselCard> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      items: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowV2IntentMessageBrowseCarouselCardBrowseCarouselCardItem,
        ),
      ),
      imageDisplayOptions: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2IntentMessageBrowseCarouselCard",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageBrowseCarouselCard>;

export interface GoogleCloudDialogflowV2IntentMessageColumnProperties {
  header?: string;
  horizontalAlignment?:
    | "HORIZONTAL_ALIGNMENT_UNSPECIFIED"
    | "LEADING"
    | "CENTER"
    | "TRAILING"
    | (string & {});
}

export const GoogleCloudDialogflowV2IntentMessageColumnProperties: Schema.Schema<GoogleCloudDialogflowV2IntentMessageColumnProperties> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      header: Schema.optional(Schema.String),
      horizontalAlignment: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2IntentMessageColumnProperties",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageColumnProperties>;

export interface GoogleCloudDialogflowV2IntentMessageTableCardCell {
  text?: string;
}

export const GoogleCloudDialogflowV2IntentMessageTableCardCell: Schema.Schema<GoogleCloudDialogflowV2IntentMessageTableCardCell> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2IntentMessageTableCardCell",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageTableCardCell>;

export interface GoogleCloudDialogflowV2IntentMessageTableCardRow {
  cells?: Array<GoogleCloudDialogflowV2IntentMessageTableCardCell>;
  dividerAfter?: boolean;
}

export const GoogleCloudDialogflowV2IntentMessageTableCardRow: Schema.Schema<GoogleCloudDialogflowV2IntentMessageTableCardRow> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cells: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2IntentMessageTableCardCell),
      ),
      dividerAfter: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2IntentMessageTableCardRow",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageTableCardRow>;

export interface GoogleCloudDialogflowV2IntentMessageTableCard {
  title?: string;
  subtitle?: string;
  image?: GoogleCloudDialogflowV2IntentMessageImage;
  columnProperties?: Array<GoogleCloudDialogflowV2IntentMessageColumnProperties>;
  rows?: Array<GoogleCloudDialogflowV2IntentMessageTableCardRow>;
  buttons?: Array<GoogleCloudDialogflowV2IntentMessageBasicCardButton>;
}

export const GoogleCloudDialogflowV2IntentMessageTableCard: Schema.Schema<GoogleCloudDialogflowV2IntentMessageTableCard> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      subtitle: Schema.optional(Schema.String),
      image: Schema.optional(GoogleCloudDialogflowV2IntentMessageImage),
      columnProperties: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2IntentMessageColumnProperties),
      ),
      rows: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2IntentMessageTableCardRow),
      ),
      buttons: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2IntentMessageBasicCardButton),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2IntentMessageTableCard",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageTableCard>;

export interface GoogleCloudDialogflowV2IntentMessageMediaContentResponseMediaObject {
  name?: string;
  description?: string;
  largeImage?: GoogleCloudDialogflowV2IntentMessageImage;
  icon?: GoogleCloudDialogflowV2IntentMessageImage;
  contentUrl?: string;
}

export const GoogleCloudDialogflowV2IntentMessageMediaContentResponseMediaObject: Schema.Schema<GoogleCloudDialogflowV2IntentMessageMediaContentResponseMediaObject> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      largeImage: Schema.optional(GoogleCloudDialogflowV2IntentMessageImage),
      icon: Schema.optional(GoogleCloudDialogflowV2IntentMessageImage),
      contentUrl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2IntentMessageMediaContentResponseMediaObject",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageMediaContentResponseMediaObject>;

export interface GoogleCloudDialogflowV2IntentMessageMediaContent {
  mediaType?: "RESPONSE_MEDIA_TYPE_UNSPECIFIED" | "AUDIO" | (string & {});
  mediaObjects?: Array<GoogleCloudDialogflowV2IntentMessageMediaContentResponseMediaObject>;
}

export const GoogleCloudDialogflowV2IntentMessageMediaContent: Schema.Schema<GoogleCloudDialogflowV2IntentMessageMediaContent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      mediaType: Schema.optional(Schema.String),
      mediaObjects: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowV2IntentMessageMediaContentResponseMediaObject,
        ),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2IntentMessageMediaContent",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessageMediaContent>;

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
  platform?:
    | "PLATFORM_UNSPECIFIED"
    | "FACEBOOK"
    | "SLACK"
    | "TELEGRAM"
    | "KIK"
    | "SKYPE"
    | "LINE"
    | "VIBER"
    | "ACTIONS_ON_GOOGLE"
    | "GOOGLE_HANGOUTS"
    | (string & {});
}

export const GoogleCloudDialogflowV2IntentMessage: Schema.Schema<GoogleCloudDialogflowV2IntentMessage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(GoogleCloudDialogflowV2IntentMessageText),
      image: Schema.optional(GoogleCloudDialogflowV2IntentMessageImage),
      quickReplies: Schema.optional(
        GoogleCloudDialogflowV2IntentMessageQuickReplies,
      ),
      card: Schema.optional(GoogleCloudDialogflowV2IntentMessageCard),
      payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      simpleResponses: Schema.optional(
        GoogleCloudDialogflowV2IntentMessageSimpleResponses,
      ),
      basicCard: Schema.optional(GoogleCloudDialogflowV2IntentMessageBasicCard),
      suggestions: Schema.optional(
        GoogleCloudDialogflowV2IntentMessageSuggestions,
      ),
      linkOutSuggestion: Schema.optional(
        GoogleCloudDialogflowV2IntentMessageLinkOutSuggestion,
      ),
      listSelect: Schema.optional(
        GoogleCloudDialogflowV2IntentMessageListSelect,
      ),
      carouselSelect: Schema.optional(
        GoogleCloudDialogflowV2IntentMessageCarouselSelect,
      ),
      browseCarouselCard: Schema.optional(
        GoogleCloudDialogflowV2IntentMessageBrowseCarouselCard,
      ),
      tableCard: Schema.optional(GoogleCloudDialogflowV2IntentMessageTableCard),
      mediaContent: Schema.optional(
        GoogleCloudDialogflowV2IntentMessageMediaContent,
      ),
      platform: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2IntentMessage",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentMessage>;

export interface GoogleCloudDialogflowV2IntentFollowupIntentInfo {
  followupIntentName?: string;
  parentFollowupIntentName?: string;
}

export const GoogleCloudDialogflowV2IntentFollowupIntentInfo: Schema.Schema<GoogleCloudDialogflowV2IntentFollowupIntentInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      followupIntentName: Schema.optional(Schema.String),
      parentFollowupIntentName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2IntentFollowupIntentInfo",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IntentFollowupIntentInfo>;

export interface GoogleCloudDialogflowV2Intent {
  name?: string;
  displayName?: string;
  webhookState?:
    | "WEBHOOK_STATE_UNSPECIFIED"
    | "WEBHOOK_STATE_ENABLED"
    | "WEBHOOK_STATE_ENABLED_FOR_SLOT_FILLING"
    | (string & {});
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
  defaultResponsePlatforms?: Array<
    | "PLATFORM_UNSPECIFIED"
    | "FACEBOOK"
    | "SLACK"
    | "TELEGRAM"
    | "KIK"
    | "SKYPE"
    | "LINE"
    | "VIBER"
    | "ACTIONS_ON_GOOGLE"
    | "GOOGLE_HANGOUTS"
    | (string & {})
  >;
  rootFollowupIntentName?: string;
  parentFollowupIntentName?: string;
  followupIntentInfo?: Array<GoogleCloudDialogflowV2IntentFollowupIntentInfo>;
}

export const GoogleCloudDialogflowV2Intent: Schema.Schema<GoogleCloudDialogflowV2Intent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
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
      trainingPhrases: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2IntentTrainingPhrase),
      ),
      action: Schema.optional(Schema.String),
      outputContexts: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2Context),
      ),
      resetContexts: Schema.optional(Schema.Boolean),
      parameters: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2IntentParameter),
      ),
      messages: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2IntentMessage),
      ),
      defaultResponsePlatforms: Schema.optional(Schema.Array(Schema.String)),
      rootFollowupIntentName: Schema.optional(Schema.String),
      parentFollowupIntentName: Schema.optional(Schema.String),
      followupIntentInfo: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2IntentFollowupIntentInfo),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2Intent",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2Intent>;

export interface GoogleCloudDialogflowV2BatchUpdateIntentsResponse {
  intents?: Array<GoogleCloudDialogflowV2Intent>;
}

export const GoogleCloudDialogflowV2BatchUpdateIntentsResponse: Schema.Schema<GoogleCloudDialogflowV2BatchUpdateIntentsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      intents: Schema.optional(Schema.Array(GoogleCloudDialogflowV2Intent)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2BatchUpdateIntentsResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2BatchUpdateIntentsResponse>;

export interface GoogleCloudDialogflowV2ClearSuggestionFeatureConfigOperationMetadata {
  conversationProfile?: string;
  participantRole?:
    | "ROLE_UNSPECIFIED"
    | "HUMAN_AGENT"
    | "AUTOMATED_AGENT"
    | "END_USER"
    | (string & {});
  suggestionFeatureType?:
    | "TYPE_UNSPECIFIED"
    | "ARTICLE_SUGGESTION"
    | "FAQ"
    | "SMART_REPLY"
    | "CONVERSATION_SUMMARIZATION"
    | "KNOWLEDGE_SEARCH"
    | "KNOWLEDGE_ASSIST"
    | (string & {});
  createTime?: string;
}

export const GoogleCloudDialogflowV2ClearSuggestionFeatureConfigOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2ClearSuggestionFeatureConfigOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      conversationProfile: Schema.optional(Schema.String),
      participantRole: Schema.optional(Schema.String),
      suggestionFeatureType: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2ClearSuggestionFeatureConfigOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2ClearSuggestionFeatureConfigOperationMetadata>;

export interface GoogleCloudDialogflowV2AnnotatedMessagePart {
  text?: string;
  entityType?: string;
  formattedValue?: unknown;
}

export const GoogleCloudDialogflowV2AnnotatedMessagePart: Schema.Schema<GoogleCloudDialogflowV2AnnotatedMessagePart> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
      entityType: Schema.optional(Schema.String),
      formattedValue: Schema.optional(Schema.Unknown),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2AnnotatedMessagePart",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2AnnotatedMessagePart>;

export interface GoogleCloudDialogflowV2MessageAnnotation {
  parts?: Array<GoogleCloudDialogflowV2AnnotatedMessagePart>;
  containEntities?: boolean;
}

export const GoogleCloudDialogflowV2MessageAnnotation: Schema.Schema<GoogleCloudDialogflowV2MessageAnnotation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      parts: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2AnnotatedMessagePart),
      ),
      containEntities: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2MessageAnnotation",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2MessageAnnotation>;

export interface GoogleCloudDialogflowV2Sentiment {
  score?: number;
  magnitude?: number;
}

export const GoogleCloudDialogflowV2Sentiment: Schema.Schema<GoogleCloudDialogflowV2Sentiment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      score: Schema.optional(Schema.Number),
      magnitude: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2Sentiment",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2Sentiment>;

export interface GoogleCloudDialogflowV2SentimentAnalysisResult {
  queryTextSentiment?: GoogleCloudDialogflowV2Sentiment;
}

export const GoogleCloudDialogflowV2SentimentAnalysisResult: Schema.Schema<GoogleCloudDialogflowV2SentimentAnalysisResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      queryTextSentiment: Schema.optional(GoogleCloudDialogflowV2Sentiment),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2SentimentAnalysisResult",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2SentimentAnalysisResult>;

export interface GoogleCloudDialogflowV2Message {
  name?: string;
  content?: string;
  languageCode?: string;
  participant?: string;
  participantRole?:
    | "ROLE_UNSPECIFIED"
    | "HUMAN_AGENT"
    | "AUTOMATED_AGENT"
    | "END_USER"
    | (string & {});
  createTime?: string;
  sendTime?: string;
  messageAnnotation?: GoogleCloudDialogflowV2MessageAnnotation;
  sentimentAnalysis?: GoogleCloudDialogflowV2SentimentAnalysisResult;
}

export const GoogleCloudDialogflowV2Message: Schema.Schema<GoogleCloudDialogflowV2Message> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      content: Schema.optional(Schema.String),
      languageCode: Schema.optional(Schema.String),
      participant: Schema.optional(Schema.String),
      participantRole: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      sendTime: Schema.optional(Schema.String),
      messageAnnotation: Schema.optional(
        GoogleCloudDialogflowV2MessageAnnotation,
      ),
      sentimentAnalysis: Schema.optional(
        GoogleCloudDialogflowV2SentimentAnalysisResult,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2Message",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2Message>;

export interface GoogleCloudDialogflowV2SpeechWordInfo {
  word?: string;
  startOffset?: string;
  endOffset?: string;
  confidence?: number;
}

export const GoogleCloudDialogflowV2SpeechWordInfo: Schema.Schema<GoogleCloudDialogflowV2SpeechWordInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      word: Schema.optional(Schema.String),
      startOffset: Schema.optional(Schema.String),
      endOffset: Schema.optional(Schema.String),
      confidence: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2SpeechWordInfo",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2SpeechWordInfo>;

export interface GoogleCloudDialogflowV2StreamingRecognitionResult {
  messageType?:
    | "MESSAGE_TYPE_UNSPECIFIED"
    | "TRANSCRIPT"
    | "END_OF_SINGLE_UTTERANCE"
    | (string & {});
  transcript?: string;
  isFinal?: boolean;
  confidence?: number;
  speechWordInfo?: Array<GoogleCloudDialogflowV2SpeechWordInfo>;
  speechEndOffset?: string;
  languageCode?: string;
}

export const GoogleCloudDialogflowV2StreamingRecognitionResult: Schema.Schema<GoogleCloudDialogflowV2StreamingRecognitionResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      messageType: Schema.optional(Schema.String),
      transcript: Schema.optional(Schema.String),
      isFinal: Schema.optional(Schema.Boolean),
      confidence: Schema.optional(Schema.Number),
      speechWordInfo: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2SpeechWordInfo),
      ),
      speechEndOffset: Schema.optional(Schema.String),
      languageCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2StreamingRecognitionResult",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2StreamingRecognitionResult>;

export interface GoogleCloudDialogflowV2ConversationEvent {
  conversation?: string;
  type?:
    | "TYPE_UNSPECIFIED"
    | "CONVERSATION_STARTED"
    | "CONVERSATION_FINISHED"
    | "HUMAN_INTERVENTION_NEEDED"
    | "NEW_MESSAGE"
    | "NEW_RECOGNITION_RESULT"
    | "UNRECOVERABLE_ERROR"
    | (string & {});
  errorStatus?: GoogleRpcStatus;
  newMessagePayload?: GoogleCloudDialogflowV2Message;
  newRecognitionResultPayload?: GoogleCloudDialogflowV2StreamingRecognitionResult;
}

export const GoogleCloudDialogflowV2ConversationEvent: Schema.Schema<GoogleCloudDialogflowV2ConversationEvent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      conversation: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      errorStatus: Schema.optional(GoogleRpcStatus),
      newMessagePayload: Schema.optional(GoogleCloudDialogflowV2Message),
      newRecognitionResultPayload: Schema.optional(
        GoogleCloudDialogflowV2StreamingRecognitionResult,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2ConversationEvent",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2ConversationEvent>;

export interface GoogleCloudDialogflowV2ExportAgentResponse {
  agentUri?: string;
  agentContent?: string;
}

export const GoogleCloudDialogflowV2ExportAgentResponse: Schema.Schema<GoogleCloudDialogflowV2ExportAgentResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      agentUri: Schema.optional(Schema.String),
      agentContent: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2ExportAgentResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2ExportAgentResponse>;

export interface GoogleCloudDialogflowV2ArticleAnswer {
  title?: string;
  uri?: string;
  snippets?: Array<string>;
  confidence?: number;
  metadata?: Record<string, string>;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2ArticleAnswer: Schema.Schema<GoogleCloudDialogflowV2ArticleAnswer> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      uri: Schema.optional(Schema.String),
      snippets: Schema.optional(Schema.Array(Schema.String)),
      confidence: Schema.optional(Schema.Number),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      answerRecord: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2ArticleAnswer",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2ArticleAnswer>;

export interface GoogleCloudDialogflowV2SuggestArticlesResponse {
  articleAnswers?: Array<GoogleCloudDialogflowV2ArticleAnswer>;
  latestMessage?: string;
  contextSize?: number;
}

export const GoogleCloudDialogflowV2SuggestArticlesResponse: Schema.Schema<GoogleCloudDialogflowV2SuggestArticlesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      articleAnswers: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2ArticleAnswer),
      ),
      latestMessage: Schema.optional(Schema.String),
      contextSize: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2SuggestArticlesResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2SuggestArticlesResponse>;

export interface GoogleCloudDialogflowV2KnowledgeAssistAnswerSuggestedQuery {
  queryText?: string;
}

export const GoogleCloudDialogflowV2KnowledgeAssistAnswerSuggestedQuery: Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerSuggestedQuery> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      queryText: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2KnowledgeAssistAnswerSuggestedQuery",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerSuggestedQuery>;

export interface GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerFaqSource {
  question?: string;
}

export const GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerFaqSource: Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerFaqSource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      question: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerFaqSource",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerFaqSource>;

export interface GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet {
  uri?: string;
  text?: string;
  title?: string;
  metadata?: Record<string, unknown>;
}

export const GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet: Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
      text: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet>;

export interface GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource {
  snippets?: Array<GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet>;
}

export const GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource: Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      snippets: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet,
        ),
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource>;

export interface GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswer {
  answerText?: string;
  faqSource?: GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerFaqSource;
  generativeSource?: GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource;
}

export const GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswer: Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswer> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      answerText: Schema.optional(Schema.String),
      faqSource: Schema.optional(
        GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerFaqSource,
      ),
      generativeSource: Schema.optional(
        GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswer",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswer>;

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

export const GoogleCloudDialogflowV2KnowledgeAssistDebugInfoKnowledgeAssistBehavior: Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistDebugInfoKnowledgeAssistBehavior> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
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
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2KnowledgeAssistDebugInfoKnowledgeAssistBehavior",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistDebugInfoKnowledgeAssistBehavior>;

export interface GoogleCloudDialogflowV2IngestedContextReferenceDebugInfoIngestedParameterDebugInfo {
  parameter?: string;
  ingestionStatus?:
    | "INGESTION_STATUS_UNSPECIFIED"
    | "INGESTION_STATUS_SUCCEEDED"
    | "INGESTION_STATUS_CONTEXT_NOT_AVAILABLE"
    | "INGESTION_STATUS_PARSE_FAILED"
    | "INGESTION_STATUS_INVALID_ENTRY"
    | "INGESTION_STATUS_INVALID_FORMAT"
    | "INGESTION_STATUS_LANGUAGE_MISMATCH"
    | (string & {});
}

export const GoogleCloudDialogflowV2IngestedContextReferenceDebugInfoIngestedParameterDebugInfo: Schema.Schema<GoogleCloudDialogflowV2IngestedContextReferenceDebugInfoIngestedParameterDebugInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      parameter: Schema.optional(Schema.String),
      ingestionStatus: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2IngestedContextReferenceDebugInfoIngestedParameterDebugInfo",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IngestedContextReferenceDebugInfoIngestedParameterDebugInfo>;

export interface GoogleCloudDialogflowV2IngestedContextReferenceDebugInfo {
  projectNotAllowlisted?: boolean;
  contextReferenceRetrieved?: boolean;
  ingestedParametersDebugInfo?: Array<GoogleCloudDialogflowV2IngestedContextReferenceDebugInfoIngestedParameterDebugInfo>;
}

export const GoogleCloudDialogflowV2IngestedContextReferenceDebugInfo: Schema.Schema<GoogleCloudDialogflowV2IngestedContextReferenceDebugInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      projectNotAllowlisted: Schema.optional(Schema.Boolean),
      contextReferenceRetrieved: Schema.optional(Schema.Boolean),
      ingestedParametersDebugInfo: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowV2IngestedContextReferenceDebugInfoIngestedParameterDebugInfo,
        ),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2IngestedContextReferenceDebugInfo",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2IngestedContextReferenceDebugInfo>;

export interface GoogleCloudDialogflowV2ServiceLatencyInternalServiceLatency {
  step?: string;
  latencyMs?: number;
  startTime?: string;
  completeTime?: string;
}

export const GoogleCloudDialogflowV2ServiceLatencyInternalServiceLatency: Schema.Schema<GoogleCloudDialogflowV2ServiceLatencyInternalServiceLatency> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      step: Schema.optional(Schema.String),
      latencyMs: Schema.optional(Schema.Number),
      startTime: Schema.optional(Schema.String),
      completeTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2ServiceLatencyInternalServiceLatency",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2ServiceLatencyInternalServiceLatency>;

export interface GoogleCloudDialogflowV2ServiceLatency {
  internalServiceLatencies?: Array<GoogleCloudDialogflowV2ServiceLatencyInternalServiceLatency>;
}

export const GoogleCloudDialogflowV2ServiceLatency: Schema.Schema<GoogleCloudDialogflowV2ServiceLatency> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      internalServiceLatencies: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowV2ServiceLatencyInternalServiceLatency,
        ),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2ServiceLatency",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2ServiceLatency>;

export interface GoogleCloudDialogflowV2KnowledgeAssistDebugInfo {
  queryGenerationFailureReason?:
    | "QUERY_GENERATION_FAILURE_REASON_UNSPECIFIED"
    | "QUERY_GENERATION_OUT_OF_QUOTA"
    | "QUERY_GENERATION_FAILED"
    | "QUERY_GENERATION_NO_QUERY_GENERATED"
    | "QUERY_GENERATION_RAI_FAILED"
    | "NOT_IN_ALLOWLIST"
    | "QUERY_GENERATION_QUERY_REDACTED"
    | "QUERY_GENERATION_LLM_RESPONSE_PARSE_FAILED"
    | "QUERY_GENERATION_EMPTY_CONVERSATION"
    | "QUERY_GENERATION_EMPTY_LAST_MESSAGE"
    | "QUERY_GENERATION_TRIGGERING_EVENT_CONDITION_NOT_MET"
    | (string & {});
  queryCategorizationFailureReason?:
    | "QUERY_CATEGORIZATION_FAILURE_REASON_UNSPECIFIED"
    | "QUERY_CATEGORIZATION_INVALID_CONFIG"
    | "QUERY_CATEGORIZATION_RESULT_NOT_FOUND"
    | "QUERY_CATEGORIZATION_FAILED"
    | (string & {});
  datastoreResponseReason?:
    | "DATASTORE_RESPONSE_REASON_UNSPECIFIED"
    | "NONE"
    | "SEARCH_OUT_OF_QUOTA"
    | "SEARCH_EMPTY_RESULTS"
    | "ANSWER_GENERATION_GEN_AI_DISABLED"
    | "ANSWER_GENERATION_OUT_OF_QUOTA"
    | "ANSWER_GENERATION_ERROR"
    | "ANSWER_GENERATION_NOT_ENOUGH_INFO"
    | "ANSWER_GENERATION_RAI_FAILED"
    | "ANSWER_GENERATION_NOT_GROUNDED"
    | (string & {});
  knowledgeAssistBehavior?: GoogleCloudDialogflowV2KnowledgeAssistDebugInfoKnowledgeAssistBehavior;
  ingestedContextReferenceDebugInfo?: GoogleCloudDialogflowV2IngestedContextReferenceDebugInfo;
  serviceLatency?: GoogleCloudDialogflowV2ServiceLatency;
}

export const GoogleCloudDialogflowV2KnowledgeAssistDebugInfo: Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistDebugInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      queryGenerationFailureReason: Schema.optional(Schema.String),
      queryCategorizationFailureReason: Schema.optional(Schema.String),
      datastoreResponseReason: Schema.optional(Schema.String),
      knowledgeAssistBehavior: Schema.optional(
        GoogleCloudDialogflowV2KnowledgeAssistDebugInfoKnowledgeAssistBehavior,
      ),
      ingestedContextReferenceDebugInfo: Schema.optional(
        GoogleCloudDialogflowV2IngestedContextReferenceDebugInfo,
      ),
      serviceLatency: Schema.optional(GoogleCloudDialogflowV2ServiceLatency),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2KnowledgeAssistDebugInfo",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistDebugInfo>;

export interface GoogleCloudDialogflowV2KnowledgeAssistAnswer {
  suggestedQuery?: GoogleCloudDialogflowV2KnowledgeAssistAnswerSuggestedQuery;
  suggestedQueryAnswer?: GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswer;
  answerRecord?: string;
  knowledgeAssistDebugInfo?: GoogleCloudDialogflowV2KnowledgeAssistDebugInfo;
}

export const GoogleCloudDialogflowV2KnowledgeAssistAnswer: Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswer> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      suggestedQuery: Schema.optional(
        GoogleCloudDialogflowV2KnowledgeAssistAnswerSuggestedQuery,
      ),
      suggestedQueryAnswer: Schema.optional(
        GoogleCloudDialogflowV2KnowledgeAssistAnswerKnowledgeAnswer,
      ),
      answerRecord: Schema.optional(Schema.String),
      knowledgeAssistDebugInfo: Schema.optional(
        GoogleCloudDialogflowV2KnowledgeAssistDebugInfo,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2KnowledgeAssistAnswer",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2KnowledgeAssistAnswer>;

export interface GoogleCloudDialogflowV2SuggestKnowledgeAssistResponse {
  knowledgeAssistAnswer?: GoogleCloudDialogflowV2KnowledgeAssistAnswer;
  latestMessage?: string;
  contextSize?: number;
}

export const GoogleCloudDialogflowV2SuggestKnowledgeAssistResponse: Schema.Schema<GoogleCloudDialogflowV2SuggestKnowledgeAssistResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      knowledgeAssistAnswer: Schema.optional(
        GoogleCloudDialogflowV2KnowledgeAssistAnswer,
      ),
      latestMessage: Schema.optional(Schema.String),
      contextSize: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2SuggestKnowledgeAssistResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2SuggestKnowledgeAssistResponse>;

export interface GoogleCloudDialogflowV2FaqAnswer {
  answer?: string;
  confidence?: number;
  question?: string;
  source?: string;
  metadata?: Record<string, string>;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2FaqAnswer: Schema.Schema<GoogleCloudDialogflowV2FaqAnswer> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      answer: Schema.optional(Schema.String),
      confidence: Schema.optional(Schema.Number),
      question: Schema.optional(Schema.String),
      source: Schema.optional(Schema.String),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      answerRecord: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2FaqAnswer",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2FaqAnswer>;

export interface GoogleCloudDialogflowV2SuggestFaqAnswersResponse {
  faqAnswers?: Array<GoogleCloudDialogflowV2FaqAnswer>;
  latestMessage?: string;
  contextSize?: number;
}

export const GoogleCloudDialogflowV2SuggestFaqAnswersResponse: Schema.Schema<GoogleCloudDialogflowV2SuggestFaqAnswersResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      faqAnswers: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2FaqAnswer),
      ),
      latestMessage: Schema.optional(Schema.String),
      contextSize: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2SuggestFaqAnswersResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2SuggestFaqAnswersResponse>;

export interface GoogleCloudDialogflowV2SmartReplyAnswer {
  reply?: string;
  confidence?: number;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2SmartReplyAnswer: Schema.Schema<GoogleCloudDialogflowV2SmartReplyAnswer> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      reply: Schema.optional(Schema.String),
      confidence: Schema.optional(Schema.Number),
      answerRecord: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2SmartReplyAnswer",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2SmartReplyAnswer>;

export interface GoogleCloudDialogflowV2SuggestSmartRepliesResponse {
  smartReplyAnswers?: Array<GoogleCloudDialogflowV2SmartReplyAnswer>;
  latestMessage?: string;
  contextSize?: number;
}

export const GoogleCloudDialogflowV2SuggestSmartRepliesResponse: Schema.Schema<GoogleCloudDialogflowV2SuggestSmartRepliesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      smartReplyAnswers: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2SmartReplyAnswer),
      ),
      latestMessage: Schema.optional(Schema.String),
      contextSize: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2SuggestSmartRepliesResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2SuggestSmartRepliesResponse>;

export interface GoogleCloudDialogflowV2FreeFormSuggestion {
  response?: string;
}

export const GoogleCloudDialogflowV2FreeFormSuggestion: Schema.Schema<GoogleCloudDialogflowV2FreeFormSuggestion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      response: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2FreeFormSuggestion",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2FreeFormSuggestion>;

export interface GoogleCloudDialogflowV2SummarySuggestionSummarySection {
  section?: string;
  summary?: string;
}

export const GoogleCloudDialogflowV2SummarySuggestionSummarySection: Schema.Schema<GoogleCloudDialogflowV2SummarySuggestionSummarySection> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      section: Schema.optional(Schema.String),
      summary: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2SummarySuggestionSummarySection",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2SummarySuggestionSummarySection>;

export interface GoogleCloudDialogflowV2SummarySuggestion {
  summarySections?: Array<GoogleCloudDialogflowV2SummarySuggestionSummarySection>;
}

export const GoogleCloudDialogflowV2SummarySuggestion: Schema.Schema<GoogleCloudDialogflowV2SummarySuggestion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      summarySections: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2SummarySuggestionSummarySection),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2SummarySuggestion",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2SummarySuggestion>;

export interface GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion {
  answerRecord?: string;
  suggestionIndex?: number;
  similarityScore?: number;
}

export const GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion: Schema.Schema<GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      answerRecord: Schema.optional(Schema.String),
      suggestionIndex: Schema.optional(Schema.Number),
      similarityScore: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion>;

export interface GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResult {
  duplicateSuggestions?: Array<GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion>;
}

export const GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResult: Schema.Schema<GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      duplicateSuggestions: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion,
        ),
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResult",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResult>;

export interface GoogleCloudDialogflowV2AgentCoachingInstruction {
  displayName?: string;
  displayDetails?: string;
  condition?: string;
  agentAction?: string;
  systemAction?: string;
  duplicateCheckResult?: GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResult;
  triggeringEvent?:
    | "TRIGGER_EVENT_UNSPECIFIED"
    | "END_OF_UTTERANCE"
    | "MANUAL_CALL"
    | "CUSTOMER_MESSAGE"
    | "AGENT_MESSAGE"
    | "TOOL_CALL_COMPLETION"
    | (string & {});
}

export const GoogleCloudDialogflowV2AgentCoachingInstruction: Schema.Schema<GoogleCloudDialogflowV2AgentCoachingInstruction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      displayDetails: Schema.optional(Schema.String),
      condition: Schema.optional(Schema.String),
      agentAction: Schema.optional(Schema.String),
      systemAction: Schema.optional(Schema.String),
      duplicateCheckResult: Schema.optional(
        GoogleCloudDialogflowV2AgentCoachingInstructionDuplicateCheckResult,
      ),
      triggeringEvent: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2AgentCoachingInstruction",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2AgentCoachingInstruction>;

export interface GoogleCloudDialogflowV2AgentCoachingSuggestionSources {
  instructionIndexes?: Array<number>;
}

export const GoogleCloudDialogflowV2AgentCoachingSuggestionSources: Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionSources> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      instructionIndexes: Schema.optional(Schema.Array(Schema.Number)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2AgentCoachingSuggestionSources",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionSources>;

export interface GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion {
  answerRecord?: string;
  sources?: GoogleCloudDialogflowV2AgentCoachingSuggestionSources;
  suggestionIndex?: number;
  similarityScore?: number;
}

export const GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion: Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      answerRecord: Schema.optional(Schema.String),
      sources: Schema.optional(
        GoogleCloudDialogflowV2AgentCoachingSuggestionSources,
      ),
      suggestionIndex: Schema.optional(Schema.Number),
      similarityScore: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion>;

export interface GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResult {
  duplicateSuggestions?: Array<GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion>;
}

export const GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResult: Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      duplicateSuggestions: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion,
        ),
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResult",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResult>;

export interface GoogleCloudDialogflowV2AgentCoachingSuggestionAgentActionSuggestion {
  agentAction?: string;
  sources?: GoogleCloudDialogflowV2AgentCoachingSuggestionSources;
  duplicateCheckResult?: GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResult;
}

export const GoogleCloudDialogflowV2AgentCoachingSuggestionAgentActionSuggestion: Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionAgentActionSuggestion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      agentAction: Schema.optional(Schema.String),
      sources: Schema.optional(
        GoogleCloudDialogflowV2AgentCoachingSuggestionSources,
      ),
      duplicateCheckResult: Schema.optional(
        GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResult,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2AgentCoachingSuggestionAgentActionSuggestion",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionAgentActionSuggestion>;

export interface GoogleCloudDialogflowV2AgentCoachingSuggestionSampleResponse {
  responseText?: string;
  sources?: GoogleCloudDialogflowV2AgentCoachingSuggestionSources;
  duplicateCheckResult?: GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResult;
}

export const GoogleCloudDialogflowV2AgentCoachingSuggestionSampleResponse: Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionSampleResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      responseText: Schema.optional(Schema.String),
      sources: Schema.optional(
        GoogleCloudDialogflowV2AgentCoachingSuggestionSources,
      ),
      duplicateCheckResult: Schema.optional(
        GoogleCloudDialogflowV2AgentCoachingSuggestionDuplicateCheckResult,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2AgentCoachingSuggestionSampleResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestionSampleResponse>;

export interface GoogleCloudDialogflowV2AgentCoachingSuggestion {
  applicableInstructions?: Array<GoogleCloudDialogflowV2AgentCoachingInstruction>;
  agentActionSuggestions?: Array<GoogleCloudDialogflowV2AgentCoachingSuggestionAgentActionSuggestion>;
  sampleResponses?: Array<GoogleCloudDialogflowV2AgentCoachingSuggestionSampleResponse>;
}

export const GoogleCloudDialogflowV2AgentCoachingSuggestion: Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      applicableInstructions: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2AgentCoachingInstruction),
      ),
      agentActionSuggestions: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowV2AgentCoachingSuggestionAgentActionSuggestion,
        ),
      ),
      sampleResponses: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowV2AgentCoachingSuggestionSampleResponse,
        ),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2AgentCoachingSuggestion",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2AgentCoachingSuggestion>;

export interface GoogleCloudDialogflowV2ToolCall {
  tool?: string;
  toolDisplayName?: string;
  toolDisplayDetails?: string;
  action?: string;
  inputParameters?: Record<string, unknown>;
  createTime?: string;
  answerRecord?: string;
  state?:
    | "STATE_UNSPECIFIED"
    | "TRIGGERED"
    | "NEEDS_CONFIRMATION"
    | (string & {});
}

export const GoogleCloudDialogflowV2ToolCall: Schema.Schema<GoogleCloudDialogflowV2ToolCall> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tool: Schema.optional(Schema.String),
      toolDisplayName: Schema.optional(Schema.String),
      toolDisplayDetails: Schema.optional(Schema.String),
      action: Schema.optional(Schema.String),
      inputParameters: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      createTime: Schema.optional(Schema.String),
      answerRecord: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2ToolCall",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2ToolCall>;

export interface GoogleCloudDialogflowV2ToolCallResultError {
  message?: string;
}

export const GoogleCloudDialogflowV2ToolCallResultError: Schema.Schema<GoogleCloudDialogflowV2ToolCallResultError> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2ToolCallResultError",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2ToolCallResultError>;

export interface GoogleCloudDialogflowV2ToolCallResult {
  tool?: string;
  action?: string;
  error?: GoogleCloudDialogflowV2ToolCallResultError;
  rawContent?: string;
  content?: string;
  createTime?: string;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2ToolCallResult: Schema.Schema<GoogleCloudDialogflowV2ToolCallResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tool: Schema.optional(Schema.String),
      action: Schema.optional(Schema.String),
      error: Schema.optional(GoogleCloudDialogflowV2ToolCallResultError),
      rawContent: Schema.optional(Schema.String),
      content: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      answerRecord: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2ToolCallResult",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2ToolCallResult>;

export interface GoogleCloudDialogflowV2GeneratorSuggestionToolCallInfo {
  toolCall?: GoogleCloudDialogflowV2ToolCall;
  toolCallResult?: GoogleCloudDialogflowV2ToolCallResult;
}

export const GoogleCloudDialogflowV2GeneratorSuggestionToolCallInfo: Schema.Schema<GoogleCloudDialogflowV2GeneratorSuggestionToolCallInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      toolCall: Schema.optional(GoogleCloudDialogflowV2ToolCall),
      toolCallResult: Schema.optional(GoogleCloudDialogflowV2ToolCallResult),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2GeneratorSuggestionToolCallInfo",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2GeneratorSuggestionToolCallInfo>;

export interface GoogleCloudDialogflowV2GeneratorSuggestion {
  freeFormSuggestion?: GoogleCloudDialogflowV2FreeFormSuggestion;
  summarySuggestion?: GoogleCloudDialogflowV2SummarySuggestion;
  agentCoachingSuggestion?: GoogleCloudDialogflowV2AgentCoachingSuggestion;
  toolCallInfo?: Array<GoogleCloudDialogflowV2GeneratorSuggestionToolCallInfo>;
}

export const GoogleCloudDialogflowV2GeneratorSuggestion: Schema.Schema<GoogleCloudDialogflowV2GeneratorSuggestion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      freeFormSuggestion: Schema.optional(
        GoogleCloudDialogflowV2FreeFormSuggestion,
      ),
      summarySuggestion: Schema.optional(
        GoogleCloudDialogflowV2SummarySuggestion,
      ),
      agentCoachingSuggestion: Schema.optional(
        GoogleCloudDialogflowV2AgentCoachingSuggestion,
      ),
      toolCallInfo: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2GeneratorSuggestionToolCallInfo),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2GeneratorSuggestion",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2GeneratorSuggestion>;

export interface GoogleCloudDialogflowV2GenerateSuggestionsResponseGeneratorSuggestionAnswer {
  generatorSuggestion?: GoogleCloudDialogflowV2GeneratorSuggestion;
  sourceGenerator?: string;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2GenerateSuggestionsResponseGeneratorSuggestionAnswer: Schema.Schema<GoogleCloudDialogflowV2GenerateSuggestionsResponseGeneratorSuggestionAnswer> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      generatorSuggestion: Schema.optional(
        GoogleCloudDialogflowV2GeneratorSuggestion,
      ),
      sourceGenerator: Schema.optional(Schema.String),
      answerRecord: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2GenerateSuggestionsResponseGeneratorSuggestionAnswer",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2GenerateSuggestionsResponseGeneratorSuggestionAnswer>;

export interface GoogleCloudDialogflowV2GenerateSuggestionsResponse {
  generatorSuggestionAnswers?: Array<GoogleCloudDialogflowV2GenerateSuggestionsResponseGeneratorSuggestionAnswer>;
  latestMessage?: string;
}

export const GoogleCloudDialogflowV2GenerateSuggestionsResponse: Schema.Schema<GoogleCloudDialogflowV2GenerateSuggestionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      generatorSuggestionAnswers: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowV2GenerateSuggestionsResponseGeneratorSuggestionAnswer,
        ),
      ),
      latestMessage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2GenerateSuggestionsResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2GenerateSuggestionsResponse>;

export interface GoogleCloudDialogflowV2SuggestionResult {
  error?: GoogleRpcStatus;
  suggestArticlesResponse?: GoogleCloudDialogflowV2SuggestArticlesResponse;
  suggestKnowledgeAssistResponse?: GoogleCloudDialogflowV2SuggestKnowledgeAssistResponse;
  suggestFaqAnswersResponse?: GoogleCloudDialogflowV2SuggestFaqAnswersResponse;
  suggestSmartRepliesResponse?: GoogleCloudDialogflowV2SuggestSmartRepliesResponse;
  generateSuggestionsResponse?: GoogleCloudDialogflowV2GenerateSuggestionsResponse;
}

export const GoogleCloudDialogflowV2SuggestionResult: Schema.Schema<GoogleCloudDialogflowV2SuggestionResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      error: Schema.optional(GoogleRpcStatus),
      suggestArticlesResponse: Schema.optional(
        GoogleCloudDialogflowV2SuggestArticlesResponse,
      ),
      suggestKnowledgeAssistResponse: Schema.optional(
        GoogleCloudDialogflowV2SuggestKnowledgeAssistResponse,
      ),
      suggestFaqAnswersResponse: Schema.optional(
        GoogleCloudDialogflowV2SuggestFaqAnswersResponse,
      ),
      suggestSmartRepliesResponse: Schema.optional(
        GoogleCloudDialogflowV2SuggestSmartRepliesResponse,
      ),
      generateSuggestionsResponse: Schema.optional(
        GoogleCloudDialogflowV2GenerateSuggestionsResponse,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2SuggestionResult",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2SuggestionResult>;

export interface GoogleCloudDialogflowV2HumanAgentAssistantEvent {
  conversation?: string;
  participant?: string;
  suggestionResults?: Array<GoogleCloudDialogflowV2SuggestionResult>;
}

export const GoogleCloudDialogflowV2HumanAgentAssistantEvent: Schema.Schema<GoogleCloudDialogflowV2HumanAgentAssistantEvent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      conversation: Schema.optional(Schema.String),
      participant: Schema.optional(Schema.String),
      suggestionResults: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2SuggestionResult),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2HumanAgentAssistantEvent",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2HumanAgentAssistantEvent>;

export interface GoogleCloudDialogflowV2ImportDocumentsResponse {
  warnings?: Array<GoogleRpcStatus>;
}

export const GoogleCloudDialogflowV2ImportDocumentsResponse: Schema.Schema<GoogleCloudDialogflowV2ImportDocumentsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      warnings: Schema.optional(Schema.Array(GoogleRpcStatus)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2ImportDocumentsResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2ImportDocumentsResponse>;

export interface GoogleCloudDialogflowV2GcsDestination {
  uri?: string;
}

export const GoogleCloudDialogflowV2GcsDestination: Schema.Schema<GoogleCloudDialogflowV2GcsDestination> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2GcsDestination",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2GcsDestination>;

export interface GoogleCloudDialogflowV2ExportOperationMetadata {
  exportedGcsDestination?: GoogleCloudDialogflowV2GcsDestination;
}

export const GoogleCloudDialogflowV2ExportOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2ExportOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      exportedGcsDestination: Schema.optional(
        GoogleCloudDialogflowV2GcsDestination,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2ExportOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2ExportOperationMetadata>;

export interface GoogleCloudDialogflowV2KnowledgeOperationMetadata {
  state?: "STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "DONE" | (string & {});
  knowledgeBase?: string;
  exportOperationMetadata?: GoogleCloudDialogflowV2ExportOperationMetadata;
  doneTime?: string;
}

export const GoogleCloudDialogflowV2KnowledgeOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2KnowledgeOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
      knowledgeBase: Schema.optional(Schema.String),
      exportOperationMetadata: Schema.optional(
        GoogleCloudDialogflowV2ExportOperationMetadata,
      ),
      doneTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2KnowledgeOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2KnowledgeOperationMetadata>;

export interface GoogleCloudDialogflowV2OriginalDetectIntentRequest {
  source?: string;
  version?: string;
  payload?: Record<string, unknown>;
}

export const GoogleCloudDialogflowV2OriginalDetectIntentRequest: Schema.Schema<GoogleCloudDialogflowV2OriginalDetectIntentRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      source: Schema.optional(Schema.String),
      version: Schema.optional(Schema.String),
      payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2OriginalDetectIntentRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2OriginalDetectIntentRequest>;

export interface GoogleCloudDialogflowV2SetSuggestionFeatureConfigOperationMetadata {
  conversationProfile?: string;
  participantRole?:
    | "ROLE_UNSPECIFIED"
    | "HUMAN_AGENT"
    | "AUTOMATED_AGENT"
    | "END_USER"
    | (string & {});
  suggestionFeatureType?:
    | "TYPE_UNSPECIFIED"
    | "ARTICLE_SUGGESTION"
    | "FAQ"
    | "SMART_REPLY"
    | "CONVERSATION_SUMMARIZATION"
    | "KNOWLEDGE_SEARCH"
    | "KNOWLEDGE_ASSIST"
    | (string & {});
  createTime?: string;
}

export const GoogleCloudDialogflowV2SetSuggestionFeatureConfigOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2SetSuggestionFeatureConfigOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      conversationProfile: Schema.optional(Schema.String),
      participantRole: Schema.optional(Schema.String),
      suggestionFeatureType: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2SetSuggestionFeatureConfigOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2SetSuggestionFeatureConfigOperationMetadata>;

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

export const GoogleCloudDialogflowV2QueryResult: Schema.Schema<GoogleCloudDialogflowV2QueryResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      queryText: Schema.optional(Schema.String),
      languageCode: Schema.optional(Schema.String),
      speechRecognitionConfidence: Schema.optional(Schema.Number),
      action: Schema.optional(Schema.String),
      parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      allRequiredParamsPresent: Schema.optional(Schema.Boolean),
      cancelsSlotFilling: Schema.optional(Schema.Boolean),
      fulfillmentText: Schema.optional(Schema.String),
      fulfillmentMessages: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2IntentMessage),
      ),
      webhookSource: Schema.optional(Schema.String),
      webhookPayload: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      outputContexts: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2Context),
      ),
      intent: Schema.optional(GoogleCloudDialogflowV2Intent),
      intentDetectionConfidence: Schema.optional(Schema.Number),
      diagnosticInfo: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      sentimentAnalysisResult: Schema.optional(
        GoogleCloudDialogflowV2SentimentAnalysisResult,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2QueryResult",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2QueryResult>;

export interface GoogleCloudDialogflowV2WebhookRequest {
  session?: string;
  responseId?: string;
  queryResult?: GoogleCloudDialogflowV2QueryResult;
  originalDetectIntentRequest?: GoogleCloudDialogflowV2OriginalDetectIntentRequest;
}

export const GoogleCloudDialogflowV2WebhookRequest: Schema.Schema<GoogleCloudDialogflowV2WebhookRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      session: Schema.optional(Schema.String),
      responseId: Schema.optional(Schema.String),
      queryResult: Schema.optional(GoogleCloudDialogflowV2QueryResult),
      originalDetectIntentRequest: Schema.optional(
        GoogleCloudDialogflowV2OriginalDetectIntentRequest,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2WebhookRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2WebhookRequest>;

export interface GoogleCloudDialogflowV2EventInput {
  name?: string;
  parameters?: Record<string, unknown>;
  languageCode?: string;
}

export const GoogleCloudDialogflowV2EventInput: Schema.Schema<GoogleCloudDialogflowV2EventInput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      languageCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2EventInput",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2EventInput>;

export interface GoogleCloudDialogflowV2SessionEntityType {
  name?: string;
  entityOverrideMode?:
    | "ENTITY_OVERRIDE_MODE_UNSPECIFIED"
    | "ENTITY_OVERRIDE_MODE_OVERRIDE"
    | "ENTITY_OVERRIDE_MODE_SUPPLEMENT"
    | (string & {});
  entities?: Array<GoogleCloudDialogflowV2EntityTypeEntity>;
}

export const GoogleCloudDialogflowV2SessionEntityType: Schema.Schema<GoogleCloudDialogflowV2SessionEntityType> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      entityOverrideMode: Schema.optional(Schema.String),
      entities: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2EntityTypeEntity),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2SessionEntityType",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2SessionEntityType>;

export interface GoogleCloudDialogflowV2WebhookResponse {
  fulfillmentText?: string;
  fulfillmentMessages?: Array<GoogleCloudDialogflowV2IntentMessage>;
  source?: string;
  payload?: Record<string, unknown>;
  outputContexts?: Array<GoogleCloudDialogflowV2Context>;
  followupEventInput?: GoogleCloudDialogflowV2EventInput;
  sessionEntityTypes?: Array<GoogleCloudDialogflowV2SessionEntityType>;
}

export const GoogleCloudDialogflowV2WebhookResponse: Schema.Schema<GoogleCloudDialogflowV2WebhookResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fulfillmentText: Schema.optional(Schema.String),
      fulfillmentMessages: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2IntentMessage),
      ),
      source: Schema.optional(Schema.String),
      payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      outputContexts: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2Context),
      ),
      followupEventInput: Schema.optional(GoogleCloudDialogflowV2EventInput),
      sessionEntityTypes: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2SessionEntityType),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2WebhookResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2WebhookResponse>;

export interface GoogleCloudDialogflowV2DeleteConversationDatasetOperationMetadata {}

export const GoogleCloudDialogflowV2DeleteConversationDatasetOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2DeleteConversationDatasetOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier:
      "GoogleCloudDialogflowV2DeleteConversationDatasetOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2DeleteConversationDatasetOperationMetadata>;

export interface GoogleCloudDialogflowV2ImportConversationDataOperationResponse {
  conversationDataset?: string;
  importCount?: number;
}

export const GoogleCloudDialogflowV2ImportConversationDataOperationResponse: Schema.Schema<GoogleCloudDialogflowV2ImportConversationDataOperationResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      conversationDataset: Schema.optional(Schema.String),
      importCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2ImportConversationDataOperationResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2ImportConversationDataOperationResponse>;

export interface GoogleCloudDialogflowV2ImportConversationDataOperationMetadata {
  conversationDataset?: string;
  partialFailures?: Array<GoogleRpcStatus>;
  createTime?: string;
}

export const GoogleCloudDialogflowV2ImportConversationDataOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2ImportConversationDataOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      conversationDataset: Schema.optional(Schema.String),
      partialFailures: Schema.optional(Schema.Array(GoogleRpcStatus)),
      createTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2ImportConversationDataOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2ImportConversationDataOperationMetadata>;

export interface GoogleCloudDialogflowV2EncryptionSpec {
  name?: string;
  kmsKey?: string;
}

export const GoogleCloudDialogflowV2EncryptionSpec: Schema.Schema<GoogleCloudDialogflowV2EncryptionSpec> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      kmsKey: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2EncryptionSpec",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2EncryptionSpec>;

export interface GoogleCloudDialogflowV2InitializeEncryptionSpecRequest {
  encryptionSpec?: GoogleCloudDialogflowV2EncryptionSpec;
}

export const GoogleCloudDialogflowV2InitializeEncryptionSpecRequest: Schema.Schema<GoogleCloudDialogflowV2InitializeEncryptionSpecRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      encryptionSpec: Schema.optional(GoogleCloudDialogflowV2EncryptionSpec),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2InitializeEncryptionSpecRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2InitializeEncryptionSpecRequest>;

export interface GoogleCloudDialogflowV2InitializeEncryptionSpecMetadata {
  request?: GoogleCloudDialogflowV2InitializeEncryptionSpecRequest;
}

export const GoogleCloudDialogflowV2InitializeEncryptionSpecMetadata: Schema.Schema<GoogleCloudDialogflowV2InitializeEncryptionSpecMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      request: Schema.optional(
        GoogleCloudDialogflowV2InitializeEncryptionSpecRequest,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2InitializeEncryptionSpecMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2InitializeEncryptionSpecMetadata>;

export interface GoogleCloudDialogflowV2CreateConversationDatasetOperationMetadata {
  conversationDataset?: string;
}

export const GoogleCloudDialogflowV2CreateConversationDatasetOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2CreateConversationDatasetOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      conversationDataset: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2CreateConversationDatasetOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2CreateConversationDatasetOperationMetadata>;

export interface GoogleCloudDialogflowV2InputDataset {
  dataset?: string;
}

export const GoogleCloudDialogflowV2InputDataset: Schema.Schema<GoogleCloudDialogflowV2InputDataset> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dataset: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2InputDataset",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2InputDataset>;

export interface GoogleCloudDialogflowV2ArticleSuggestionModelMetadata {
  trainingModelType?:
    | "MODEL_TYPE_UNSPECIFIED"
    | "SMART_REPLY_DUAL_ENCODER_MODEL"
    | "SMART_REPLY_BERT_MODEL"
    | (string & {});
}

export const GoogleCloudDialogflowV2ArticleSuggestionModelMetadata: Schema.Schema<GoogleCloudDialogflowV2ArticleSuggestionModelMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      trainingModelType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2ArticleSuggestionModelMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2ArticleSuggestionModelMetadata>;

export interface GoogleCloudDialogflowV2SmartReplyModelMetadata {
  trainingModelType?:
    | "MODEL_TYPE_UNSPECIFIED"
    | "SMART_REPLY_DUAL_ENCODER_MODEL"
    | "SMART_REPLY_BERT_MODEL"
    | (string & {});
}

export const GoogleCloudDialogflowV2SmartReplyModelMetadata: Schema.Schema<GoogleCloudDialogflowV2SmartReplyModelMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      trainingModelType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2SmartReplyModelMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2SmartReplyModelMetadata>;

export interface GoogleCloudDialogflowV2ConversationModel {
  name?: string;
  displayName?: string;
  createTime?: string;
  datasets?: Array<GoogleCloudDialogflowV2InputDataset>;
  state?:
    | "STATE_UNSPECIFIED"
    | "CREATING"
    | "UNDEPLOYED"
    | "DEPLOYING"
    | "DEPLOYED"
    | "UNDEPLOYING"
    | "DELETING"
    | "FAILED"
    | "PENDING"
    | (string & {});
  languageCode?: string;
  articleSuggestionModelMetadata?: GoogleCloudDialogflowV2ArticleSuggestionModelMetadata;
  smartReplyModelMetadata?: GoogleCloudDialogflowV2SmartReplyModelMetadata;
  satisfiesPzs?: boolean;
  satisfiesPzi?: boolean;
}

export const GoogleCloudDialogflowV2ConversationModel: Schema.Schema<GoogleCloudDialogflowV2ConversationModel> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      datasets: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2InputDataset),
      ),
      state: Schema.optional(Schema.String),
      languageCode: Schema.optional(Schema.String),
      articleSuggestionModelMetadata: Schema.optional(
        GoogleCloudDialogflowV2ArticleSuggestionModelMetadata,
      ),
      smartReplyModelMetadata: Schema.optional(
        GoogleCloudDialogflowV2SmartReplyModelMetadata,
      ),
      satisfiesPzs: Schema.optional(Schema.Boolean),
      satisfiesPzi: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2ConversationModel",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2ConversationModel>;

export interface GoogleCloudDialogflowV2CreateConversationModelOperationMetadata {
  conversationModel?: string;
  state?:
    | "STATE_UNSPECIFIED"
    | "PENDING"
    | "SUCCEEDED"
    | "FAILED"
    | "CANCELLED"
    | "CANCELLING"
    | "TRAINING"
    | (string & {});
  createTime?: string;
  doneTime?: string;
}

export const GoogleCloudDialogflowV2CreateConversationModelOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2CreateConversationModelOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      conversationModel: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      doneTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2CreateConversationModelOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2CreateConversationModelOperationMetadata>;

export interface GoogleCloudDialogflowV2DeleteConversationModelOperationMetadata {
  conversationModel?: string;
  createTime?: string;
  doneTime?: string;
}

export const GoogleCloudDialogflowV2DeleteConversationModelOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2DeleteConversationModelOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      conversationModel: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      doneTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2DeleteConversationModelOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2DeleteConversationModelOperationMetadata>;

export interface GoogleCloudDialogflowV2DeployConversationModelOperationMetadata {
  conversationModel?: string;
  createTime?: string;
  doneTime?: string;
}

export const GoogleCloudDialogflowV2DeployConversationModelOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2DeployConversationModelOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      conversationModel: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      doneTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2DeployConversationModelOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2DeployConversationModelOperationMetadata>;

export interface GoogleCloudDialogflowV2UndeployConversationModelOperationMetadata {
  conversationModel?: string;
  createTime?: string;
  doneTime?: string;
}

export const GoogleCloudDialogflowV2UndeployConversationModelOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2UndeployConversationModelOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      conversationModel: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      doneTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2UndeployConversationModelOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2UndeployConversationModelOperationMetadata>;

export interface GoogleCloudDialogflowV2CreateConversationModelEvaluationOperationMetadata {
  conversationModelEvaluation?: string;
  conversationModel?: string;
  state?:
    | "STATE_UNSPECIFIED"
    | "INITIALIZING"
    | "RUNNING"
    | "CANCELLED"
    | "SUCCEEDED"
    | "FAILED"
    | (string & {});
  createTime?: string;
}

export const GoogleCloudDialogflowV2CreateConversationModelEvaluationOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2CreateConversationModelEvaluationOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      conversationModelEvaluation: Schema.optional(Schema.String),
      conversationModel: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2CreateConversationModelEvaluationOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2CreateConversationModelEvaluationOperationMetadata>;

export interface GoogleCloudDialogflowV2beta1EntityTypeEntity {
  value?: string;
  synonyms?: Array<string>;
}

export const GoogleCloudDialogflowV2beta1EntityTypeEntity: Schema.Schema<GoogleCloudDialogflowV2beta1EntityTypeEntity> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
      synonyms: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1EntityTypeEntity",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1EntityTypeEntity>;

export interface GoogleCloudDialogflowV2beta1EntityType {
  name?: string;
  displayName?: string;
  kind?:
    | "KIND_UNSPECIFIED"
    | "KIND_MAP"
    | "KIND_LIST"
    | "KIND_REGEXP"
    | (string & {});
  autoExpansionMode?:
    | "AUTO_EXPANSION_MODE_UNSPECIFIED"
    | "AUTO_EXPANSION_MODE_DEFAULT"
    | (string & {});
  entities?: Array<GoogleCloudDialogflowV2beta1EntityTypeEntity>;
  enableFuzzyExtraction?: boolean;
}

export const GoogleCloudDialogflowV2beta1EntityType: Schema.Schema<GoogleCloudDialogflowV2beta1EntityType> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      kind: Schema.optional(Schema.String),
      autoExpansionMode: Schema.optional(Schema.String),
      entities: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1EntityTypeEntity),
      ),
      enableFuzzyExtraction: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1EntityType",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1EntityType>;

export interface GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesResponse {
  entityTypes?: Array<GoogleCloudDialogflowV2beta1EntityType>;
}

export const GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesResponse: Schema.Schema<GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entityTypes: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1EntityType),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesResponse>;

export interface GoogleCloudDialogflowV2beta1IntentTrainingPhrasePart {
  text?: string;
  entityType?: string;
  alias?: string;
  userDefined?: boolean;
}

export const GoogleCloudDialogflowV2beta1IntentTrainingPhrasePart: Schema.Schema<GoogleCloudDialogflowV2beta1IntentTrainingPhrasePart> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
      entityType: Schema.optional(Schema.String),
      alias: Schema.optional(Schema.String),
      userDefined: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentTrainingPhrasePart",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentTrainingPhrasePart>;

export interface GoogleCloudDialogflowV2beta1IntentTrainingPhrase {
  name?: string;
  type?: "TYPE_UNSPECIFIED" | "EXAMPLE" | "TEMPLATE" | (string & {});
  parts?: Array<GoogleCloudDialogflowV2beta1IntentTrainingPhrasePart>;
  timesAddedCount?: number;
}

export const GoogleCloudDialogflowV2beta1IntentTrainingPhrase: Schema.Schema<GoogleCloudDialogflowV2beta1IntentTrainingPhrase> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      parts: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1IntentTrainingPhrasePart),
      ),
      timesAddedCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentTrainingPhrase",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentTrainingPhrase>;

export interface GoogleCloudDialogflowV2beta1Context {
  name?: string;
  lifespanCount?: number;
  parameters?: Record<string, unknown>;
}

export const GoogleCloudDialogflowV2beta1Context: Schema.Schema<GoogleCloudDialogflowV2beta1Context> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      lifespanCount: Schema.optional(Schema.Number),
      parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1Context",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1Context>;

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

export const GoogleCloudDialogflowV2beta1IntentParameter: Schema.Schema<GoogleCloudDialogflowV2beta1IntentParameter> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
      defaultValue: Schema.optional(Schema.String),
      entityTypeDisplayName: Schema.optional(Schema.String),
      mandatory: Schema.optional(Schema.Boolean),
      prompts: Schema.optional(Schema.Array(Schema.String)),
      isList: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentParameter",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentParameter>;

export interface GoogleCloudDialogflowV2beta1IntentMessageText {
  text?: Array<string>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageText: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageText> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageText",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageText>;

export interface GoogleCloudDialogflowV2beta1IntentMessageImage {
  imageUri?: string;
  accessibilityText?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageImage: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageImage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      imageUri: Schema.optional(Schema.String),
      accessibilityText: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageImage",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageImage>;

export interface GoogleCloudDialogflowV2beta1IntentMessageQuickReplies {
  title?: string;
  quickReplies?: Array<string>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageQuickReplies: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageQuickReplies> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      quickReplies: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageQuickReplies",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageQuickReplies>;

export interface GoogleCloudDialogflowV2beta1IntentMessageCardButton {
  text?: string;
  postback?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageCardButton: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageCardButton> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
      postback: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageCardButton",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageCardButton>;

export interface GoogleCloudDialogflowV2beta1IntentMessageCard {
  title?: string;
  subtitle?: string;
  imageUri?: string;
  buttons?: Array<GoogleCloudDialogflowV2beta1IntentMessageCardButton>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageCard: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageCard> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      subtitle: Schema.optional(Schema.String),
      imageUri: Schema.optional(Schema.String),
      buttons: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageCardButton),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageCard",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageCard>;

export interface GoogleCloudDialogflowV2beta1IntentMessageSimpleResponse {
  textToSpeech?: string;
  ssml?: string;
  displayText?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageSimpleResponse: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageSimpleResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      textToSpeech: Schema.optional(Schema.String),
      ssml: Schema.optional(Schema.String),
      displayText: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageSimpleResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageSimpleResponse>;

export interface GoogleCloudDialogflowV2beta1IntentMessageSimpleResponses {
  simpleResponses?: Array<GoogleCloudDialogflowV2beta1IntentMessageSimpleResponse>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageSimpleResponses: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageSimpleResponses> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      simpleResponses: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageSimpleResponse),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageSimpleResponses",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageSimpleResponses>;

export interface GoogleCloudDialogflowV2beta1IntentMessageBasicCardButtonOpenUriAction {
  uri?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageBasicCardButtonOpenUriAction: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBasicCardButtonOpenUriAction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2beta1IntentMessageBasicCardButtonOpenUriAction",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBasicCardButtonOpenUriAction>;

export interface GoogleCloudDialogflowV2beta1IntentMessageBasicCardButton {
  title?: string;
  openUriAction?: GoogleCloudDialogflowV2beta1IntentMessageBasicCardButtonOpenUriAction;
}

export const GoogleCloudDialogflowV2beta1IntentMessageBasicCardButton: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBasicCardButton> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      openUriAction: Schema.optional(
        GoogleCloudDialogflowV2beta1IntentMessageBasicCardButtonOpenUriAction,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageBasicCardButton",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBasicCardButton>;

export interface GoogleCloudDialogflowV2beta1IntentMessageBasicCard {
  title?: string;
  subtitle?: string;
  formattedText?: string;
  image?: GoogleCloudDialogflowV2beta1IntentMessageImage;
  buttons?: Array<GoogleCloudDialogflowV2beta1IntentMessageBasicCardButton>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageBasicCard: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBasicCard> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      subtitle: Schema.optional(Schema.String),
      formattedText: Schema.optional(Schema.String),
      image: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageImage),
      buttons: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageBasicCardButton),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageBasicCard",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBasicCard>;

export interface GoogleCloudDialogflowV2beta1IntentMessageSuggestion {
  title?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageSuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageSuggestion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageSuggestion",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageSuggestion>;

export interface GoogleCloudDialogflowV2beta1IntentMessageSuggestions {
  suggestions?: Array<GoogleCloudDialogflowV2beta1IntentMessageSuggestion>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageSuggestions: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageSuggestions> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      suggestions: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageSuggestion),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageSuggestions",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageSuggestions>;

export interface GoogleCloudDialogflowV2beta1IntentMessageLinkOutSuggestion {
  destinationName?: string;
  uri?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageLinkOutSuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageLinkOutSuggestion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      destinationName: Schema.optional(Schema.String),
      uri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageLinkOutSuggestion",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageLinkOutSuggestion>;

export interface GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo {
  key?: string;
  synonyms?: Array<string>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      key: Schema.optional(Schema.String),
      synonyms: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo>;

export interface GoogleCloudDialogflowV2beta1IntentMessageListSelectItem {
  info?: GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo;
  title?: string;
  description?: string;
  image?: GoogleCloudDialogflowV2beta1IntentMessageImage;
}

export const GoogleCloudDialogflowV2beta1IntentMessageListSelectItem: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageListSelectItem> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      info: Schema.optional(
        GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo,
      ),
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      image: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageImage),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageListSelectItem",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageListSelectItem>;

export interface GoogleCloudDialogflowV2beta1IntentMessageListSelect {
  title?: string;
  items?: Array<GoogleCloudDialogflowV2beta1IntentMessageListSelectItem>;
  subtitle?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageListSelect: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageListSelect> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      items: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageListSelectItem),
      ),
      subtitle: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageListSelect",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageListSelect>;

export interface GoogleCloudDialogflowV2beta1IntentMessageCarouselSelectItem {
  info?: GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo;
  title?: string;
  description?: string;
  image?: GoogleCloudDialogflowV2beta1IntentMessageImage;
}

export const GoogleCloudDialogflowV2beta1IntentMessageCarouselSelectItem: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageCarouselSelectItem> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      info: Schema.optional(
        GoogleCloudDialogflowV2beta1IntentMessageSelectItemInfo,
      ),
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      image: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageImage),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageCarouselSelectItem",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageCarouselSelectItem>;

export interface GoogleCloudDialogflowV2beta1IntentMessageCarouselSelect {
  items?: Array<GoogleCloudDialogflowV2beta1IntentMessageCarouselSelectItem>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageCarouselSelect: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageCarouselSelect> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      items: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowV2beta1IntentMessageCarouselSelectItem,
        ),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageCarouselSelect",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageCarouselSelect>;

export interface GoogleCloudDialogflowV2beta1IntentMessageTelephonyPlayAudio {
  audioUri?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageTelephonyPlayAudio: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTelephonyPlayAudio> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      audioUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageTelephonyPlayAudio",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTelephonyPlayAudio>;

export interface GoogleCloudDialogflowV2beta1IntentMessageTelephonySynthesizeSpeech {
  text?: string;
  ssml?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageTelephonySynthesizeSpeech: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTelephonySynthesizeSpeech> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
      ssml: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2beta1IntentMessageTelephonySynthesizeSpeech",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTelephonySynthesizeSpeech>;

export interface GoogleCloudDialogflowV2beta1IntentMessageTelephonyTransferCall {
  phoneNumber?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageTelephonyTransferCall: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTelephonyTransferCall> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      phoneNumber: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2beta1IntentMessageTelephonyTransferCall",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTelephonyTransferCall>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedReply {
  text?: string;
  postbackData?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedReply: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedReply> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
      postbackData: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedReply",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedReply>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionDial {
  phoneNumber?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionDial: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionDial> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      phoneNumber: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionDial",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionDial>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionOpenUri {
  uri?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionOpenUri: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionOpenUri> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionOpenUri",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionOpenUri>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionShareLocation {}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionShareLocation: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionShareLocation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier:
      "GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionShareLocation",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionShareLocation>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedAction {
  text?: string;
  postbackData?: string;
  dial?: GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionDial;
  openUrl?: GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionOpenUri;
  shareLocation?: GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionShareLocation;
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedAction: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedAction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
      postbackData: Schema.optional(Schema.String),
      dial: Schema.optional(
        GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionDial,
      ),
      openUrl: Schema.optional(
        GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionOpenUri,
      ),
      shareLocation: Schema.optional(
        GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedActionRbmSuggestedActionShareLocation,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedAction",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedAction>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion {
  reply?: GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedReply;
  action?: GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedAction;
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      reply: Schema.optional(
        GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedReply,
      ),
      action: Schema.optional(
        GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestedAction,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmText {
  text?: string;
  rbmSuggestion?: Array<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmText: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmText> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
      rbmSuggestion: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageRbmText",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmText>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmCardContentRbmMedia {
  fileUri?: string;
  thumbnailUri?: string;
  height?: "HEIGHT_UNSPECIFIED" | "SHORT" | "MEDIUM" | "TALL" | (string & {});
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmCardContentRbmMedia: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmCardContentRbmMedia> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fileUri: Schema.optional(Schema.String),
      thumbnailUri: Schema.optional(Schema.String),
      height: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2beta1IntentMessageRbmCardContentRbmMedia",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmCardContentRbmMedia>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent {
  title?: string;
  description?: string;
  media?: GoogleCloudDialogflowV2beta1IntentMessageRbmCardContentRbmMedia;
  suggestions?: Array<GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      media: Schema.optional(
        GoogleCloudDialogflowV2beta1IntentMessageRbmCardContentRbmMedia,
      ),
      suggestions: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageRbmSuggestion),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmStandaloneCard {
  cardOrientation?:
    | "CARD_ORIENTATION_UNSPECIFIED"
    | "HORIZONTAL"
    | "VERTICAL"
    | (string & {});
  thumbnailImageAlignment?:
    | "THUMBNAIL_IMAGE_ALIGNMENT_UNSPECIFIED"
    | "LEFT"
    | "RIGHT"
    | (string & {});
  cardContent?: GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent;
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmStandaloneCard: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmStandaloneCard> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cardOrientation: Schema.optional(Schema.String),
      thumbnailImageAlignment: Schema.optional(Schema.String),
      cardContent: Schema.optional(
        GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageRbmStandaloneCard",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmStandaloneCard>;

export interface GoogleCloudDialogflowV2beta1IntentMessageRbmCarouselCard {
  cardWidth?: "CARD_WIDTH_UNSPECIFIED" | "SMALL" | "MEDIUM" | (string & {});
  cardContents?: Array<GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageRbmCarouselCard: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmCarouselCard> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cardWidth: Schema.optional(Schema.String),
      cardContents: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageRbmCardContent),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageRbmCarouselCard",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageRbmCarouselCard>;

export interface GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction {
  url?: string;
  urlTypeHint?:
    | "URL_TYPE_HINT_UNSPECIFIED"
    | "AMP_ACTION"
    | "AMP_CONTENT"
    | (string & {});
}

export const GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      url: Schema.optional(Schema.String),
      urlTypeHint: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction>;

export interface GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItem {
  openUriAction?: GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction;
  title?: string;
  description?: string;
  image?: GoogleCloudDialogflowV2beta1IntentMessageImage;
  footer?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItem: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItem> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      openUriAction: Schema.optional(
        GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItemOpenUrlAction,
      ),
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      image: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageImage),
      footer: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItem",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItem>;

export interface GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCard {
  items?: Array<GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItem>;
  imageDisplayOptions?:
    | "IMAGE_DISPLAY_OPTIONS_UNSPECIFIED"
    | "GRAY"
    | "WHITE"
    | "CROPPED"
    | "BLURRED_BACKGROUND"
    | (string & {});
}

export const GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCard: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCard> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      items: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCardBrowseCarouselCardItem,
        ),
      ),
      imageDisplayOptions: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCard",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCard>;

export interface GoogleCloudDialogflowV2beta1IntentMessageColumnProperties {
  header?: string;
  horizontalAlignment?:
    | "HORIZONTAL_ALIGNMENT_UNSPECIFIED"
    | "LEADING"
    | "CENTER"
    | "TRAILING"
    | (string & {});
}

export const GoogleCloudDialogflowV2beta1IntentMessageColumnProperties: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageColumnProperties> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      header: Schema.optional(Schema.String),
      horizontalAlignment: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageColumnProperties",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageColumnProperties>;

export interface GoogleCloudDialogflowV2beta1IntentMessageTableCardCell {
  text?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageTableCardCell: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTableCardCell> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageTableCardCell",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTableCardCell>;

export interface GoogleCloudDialogflowV2beta1IntentMessageTableCardRow {
  cells?: Array<GoogleCloudDialogflowV2beta1IntentMessageTableCardCell>;
  dividerAfter?: boolean;
}

export const GoogleCloudDialogflowV2beta1IntentMessageTableCardRow: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTableCardRow> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      cells: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageTableCardCell),
      ),
      dividerAfter: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageTableCardRow",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTableCardRow>;

export interface GoogleCloudDialogflowV2beta1IntentMessageTableCard {
  title?: string;
  subtitle?: string;
  image?: GoogleCloudDialogflowV2beta1IntentMessageImage;
  columnProperties?: Array<GoogleCloudDialogflowV2beta1IntentMessageColumnProperties>;
  rows?: Array<GoogleCloudDialogflowV2beta1IntentMessageTableCardRow>;
  buttons?: Array<GoogleCloudDialogflowV2beta1IntentMessageBasicCardButton>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageTableCard: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTableCard> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      subtitle: Schema.optional(Schema.String),
      image: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageImage),
      columnProperties: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageColumnProperties),
      ),
      rows: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageTableCardRow),
      ),
      buttons: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1IntentMessageBasicCardButton),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageTableCard",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageTableCard>;

export interface GoogleCloudDialogflowV2beta1IntentMessageMediaContentResponseMediaObject {
  name?: string;
  description?: string;
  largeImage?: GoogleCloudDialogflowV2beta1IntentMessageImage;
  icon?: GoogleCloudDialogflowV2beta1IntentMessageImage;
  contentUrl?: string;
}

export const GoogleCloudDialogflowV2beta1IntentMessageMediaContentResponseMediaObject: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageMediaContentResponseMediaObject> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      largeImage: Schema.optional(
        GoogleCloudDialogflowV2beta1IntentMessageImage,
      ),
      icon: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageImage),
      contentUrl: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2beta1IntentMessageMediaContentResponseMediaObject",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageMediaContentResponseMediaObject>;

export interface GoogleCloudDialogflowV2beta1IntentMessageMediaContent {
  mediaType?: "RESPONSE_MEDIA_TYPE_UNSPECIFIED" | "AUDIO" | (string & {});
  mediaObjects?: Array<GoogleCloudDialogflowV2beta1IntentMessageMediaContentResponseMediaObject>;
}

export const GoogleCloudDialogflowV2beta1IntentMessageMediaContent: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageMediaContent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      mediaType: Schema.optional(Schema.String),
      mediaObjects: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowV2beta1IntentMessageMediaContentResponseMediaObject,
        ),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessageMediaContent",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessageMediaContent>;

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
  platform?:
    | "PLATFORM_UNSPECIFIED"
    | "FACEBOOK"
    | "SLACK"
    | "TELEGRAM"
    | "KIK"
    | "SKYPE"
    | "LINE"
    | "VIBER"
    | "ACTIONS_ON_GOOGLE"
    | "TELEPHONY"
    | "GOOGLE_HANGOUTS"
    | (string & {});
}

export const GoogleCloudDialogflowV2beta1IntentMessage: Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageText),
      image: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageImage),
      quickReplies: Schema.optional(
        GoogleCloudDialogflowV2beta1IntentMessageQuickReplies,
      ),
      card: Schema.optional(GoogleCloudDialogflowV2beta1IntentMessageCard),
      payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      simpleResponses: Schema.optional(
        GoogleCloudDialogflowV2beta1IntentMessageSimpleResponses,
      ),
      basicCard: Schema.optional(
        GoogleCloudDialogflowV2beta1IntentMessageBasicCard,
      ),
      suggestions: Schema.optional(
        GoogleCloudDialogflowV2beta1IntentMessageSuggestions,
      ),
      linkOutSuggestion: Schema.optional(
        GoogleCloudDialogflowV2beta1IntentMessageLinkOutSuggestion,
      ),
      listSelect: Schema.optional(
        GoogleCloudDialogflowV2beta1IntentMessageListSelect,
      ),
      carouselSelect: Schema.optional(
        GoogleCloudDialogflowV2beta1IntentMessageCarouselSelect,
      ),
      telephonyPlayAudio: Schema.optional(
        GoogleCloudDialogflowV2beta1IntentMessageTelephonyPlayAudio,
      ),
      telephonySynthesizeSpeech: Schema.optional(
        GoogleCloudDialogflowV2beta1IntentMessageTelephonySynthesizeSpeech,
      ),
      telephonyTransferCall: Schema.optional(
        GoogleCloudDialogflowV2beta1IntentMessageTelephonyTransferCall,
      ),
      rbmText: Schema.optional(
        GoogleCloudDialogflowV2beta1IntentMessageRbmText,
      ),
      rbmStandaloneRichCard: Schema.optional(
        GoogleCloudDialogflowV2beta1IntentMessageRbmStandaloneCard,
      ),
      rbmCarouselRichCard: Schema.optional(
        GoogleCloudDialogflowV2beta1IntentMessageRbmCarouselCard,
      ),
      browseCarouselCard: Schema.optional(
        GoogleCloudDialogflowV2beta1IntentMessageBrowseCarouselCard,
      ),
      tableCard: Schema.optional(
        GoogleCloudDialogflowV2beta1IntentMessageTableCard,
      ),
      mediaContent: Schema.optional(
        GoogleCloudDialogflowV2beta1IntentMessageMediaContent,
      ),
      platform: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentMessage",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentMessage>;

export interface GoogleCloudDialogflowV2beta1IntentFollowupIntentInfo {
  followupIntentName?: string;
  parentFollowupIntentName?: string;
}

export const GoogleCloudDialogflowV2beta1IntentFollowupIntentInfo: Schema.Schema<GoogleCloudDialogflowV2beta1IntentFollowupIntentInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      followupIntentName: Schema.optional(Schema.String),
      parentFollowupIntentName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentFollowupIntentInfo",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentFollowupIntentInfo>;

export interface GoogleCloudDialogflowV2beta1Intent {
  name?: string;
  displayName?: string;
  webhookState?:
    | "WEBHOOK_STATE_UNSPECIFIED"
    | "WEBHOOK_STATE_ENABLED"
    | "WEBHOOK_STATE_ENABLED_FOR_SLOT_FILLING"
    | (string & {});
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
  defaultResponsePlatforms?: Array<
    | "PLATFORM_UNSPECIFIED"
    | "FACEBOOK"
    | "SLACK"
    | "TELEGRAM"
    | "KIK"
    | "SKYPE"
    | "LINE"
    | "VIBER"
    | "ACTIONS_ON_GOOGLE"
    | "TELEPHONY"
    | "GOOGLE_HANGOUTS"
    | (string & {})
  >;
  rootFollowupIntentName?: string;
  parentFollowupIntentName?: string;
  followupIntentInfo?: Array<GoogleCloudDialogflowV2beta1IntentFollowupIntentInfo>;
}

export const GoogleCloudDialogflowV2beta1Intent: Schema.Schema<GoogleCloudDialogflowV2beta1Intent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
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
      trainingPhrases: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1IntentTrainingPhrase),
      ),
      action: Schema.optional(Schema.String),
      outputContexts: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1Context),
      ),
      resetContexts: Schema.optional(Schema.Boolean),
      parameters: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1IntentParameter),
      ),
      messages: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1IntentMessage),
      ),
      defaultResponsePlatforms: Schema.optional(Schema.Array(Schema.String)),
      rootFollowupIntentName: Schema.optional(Schema.String),
      parentFollowupIntentName: Schema.optional(Schema.String),
      followupIntentInfo: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1IntentFollowupIntentInfo),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1Intent",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1Intent>;

export interface GoogleCloudDialogflowV2beta1BatchUpdateIntentsResponse {
  intents?: Array<GoogleCloudDialogflowV2beta1Intent>;
}

export const GoogleCloudDialogflowV2beta1BatchUpdateIntentsResponse: Schema.Schema<GoogleCloudDialogflowV2beta1BatchUpdateIntentsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      intents: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1Intent),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1BatchUpdateIntentsResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1BatchUpdateIntentsResponse>;

export interface GoogleCloudDialogflowV2beta1ClearSuggestionFeatureConfigOperationMetadata {
  conversationProfile?: string;
  participantRole?:
    | "ROLE_UNSPECIFIED"
    | "HUMAN_AGENT"
    | "AUTOMATED_AGENT"
    | "END_USER"
    | (string & {});
  suggestionFeatureType?:
    | "TYPE_UNSPECIFIED"
    | "ARTICLE_SUGGESTION"
    | "FAQ"
    | "SMART_REPLY"
    | "DIALOGFLOW_ASSIST"
    | "CONVERSATION_SUMMARIZATION"
    | "KNOWLEDGE_SEARCH"
    | "KNOWLEDGE_ASSIST"
    | (string & {});
  createTime?: string;
}

export const GoogleCloudDialogflowV2beta1ClearSuggestionFeatureConfigOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2beta1ClearSuggestionFeatureConfigOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      conversationProfile: Schema.optional(Schema.String),
      participantRole: Schema.optional(Schema.String),
      suggestionFeatureType: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2beta1ClearSuggestionFeatureConfigOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ClearSuggestionFeatureConfigOperationMetadata>;

export interface GoogleCloudDialogflowV2beta1ResponseMessageText {
  text?: Array<string>;
}

export const GoogleCloudDialogflowV2beta1ResponseMessageText: Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageText> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1ResponseMessageText",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageText>;

export interface GoogleCloudDialogflowV2beta1ResponseMessageLiveAgentHandoff {
  metadata?: Record<string, unknown>;
}

export const GoogleCloudDialogflowV2beta1ResponseMessageLiveAgentHandoff: Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageLiveAgentHandoff> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1ResponseMessageLiveAgentHandoff",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageLiveAgentHandoff>;

export interface GoogleCloudDialogflowV2beta1ResponseMessageEndInteraction {}

export const GoogleCloudDialogflowV2beta1ResponseMessageEndInteraction: Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageEndInteraction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleCloudDialogflowV2beta1ResponseMessageEndInteraction",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageEndInteraction>;

export interface GoogleCloudDialogflowV2beta1ResponseMessageMixedAudioSegment {
  audio?: string;
  uri?: string;
  allowPlaybackInterruption?: boolean;
}

export const GoogleCloudDialogflowV2beta1ResponseMessageMixedAudioSegment: Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageMixedAudioSegment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      audio: Schema.optional(Schema.String),
      uri: Schema.optional(Schema.String),
      allowPlaybackInterruption: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1ResponseMessageMixedAudioSegment",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageMixedAudioSegment>;

export interface GoogleCloudDialogflowV2beta1ResponseMessageMixedAudio {
  segments?: Array<GoogleCloudDialogflowV2beta1ResponseMessageMixedAudioSegment>;
}

export const GoogleCloudDialogflowV2beta1ResponseMessageMixedAudio: Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageMixedAudio> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      segments: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowV2beta1ResponseMessageMixedAudioSegment,
        ),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1ResponseMessageMixedAudio",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageMixedAudio>;

export interface GoogleCloudDialogflowV2beta1ResponseMessageTelephonyTransferCall {
  phoneNumber?: string;
  sipUri?: string;
}

export const GoogleCloudDialogflowV2beta1ResponseMessageTelephonyTransferCall: Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageTelephonyTransferCall> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      phoneNumber: Schema.optional(Schema.String),
      sipUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2beta1ResponseMessageTelephonyTransferCall",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessageTelephonyTransferCall>;

export interface GoogleCloudDialogflowV2beta1ResponseMessage {
  text?: GoogleCloudDialogflowV2beta1ResponseMessageText;
  payload?: Record<string, unknown>;
  liveAgentHandoff?: GoogleCloudDialogflowV2beta1ResponseMessageLiveAgentHandoff;
  endInteraction?: GoogleCloudDialogflowV2beta1ResponseMessageEndInteraction;
  mixedAudio?: GoogleCloudDialogflowV2beta1ResponseMessageMixedAudio;
  telephonyTransferCall?: GoogleCloudDialogflowV2beta1ResponseMessageTelephonyTransferCall;
}

export const GoogleCloudDialogflowV2beta1ResponseMessage: Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(GoogleCloudDialogflowV2beta1ResponseMessageText),
      payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      liveAgentHandoff: Schema.optional(
        GoogleCloudDialogflowV2beta1ResponseMessageLiveAgentHandoff,
      ),
      endInteraction: Schema.optional(
        GoogleCloudDialogflowV2beta1ResponseMessageEndInteraction,
      ),
      mixedAudio: Schema.optional(
        GoogleCloudDialogflowV2beta1ResponseMessageMixedAudio,
      ),
      telephonyTransferCall: Schema.optional(
        GoogleCloudDialogflowV2beta1ResponseMessageTelephonyTransferCall,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1ResponseMessage",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ResponseMessage>;

export interface GoogleCloudDialogflowV2beta1AnnotatedMessagePart {
  text?: string;
  entityType?: string;
  formattedValue?: unknown;
}

export const GoogleCloudDialogflowV2beta1AnnotatedMessagePart: Schema.Schema<GoogleCloudDialogflowV2beta1AnnotatedMessagePart> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
      entityType: Schema.optional(Schema.String),
      formattedValue: Schema.optional(Schema.Unknown),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1AnnotatedMessagePart",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AnnotatedMessagePart>;

export interface GoogleCloudDialogflowV2beta1MessageAnnotation {
  parts?: Array<GoogleCloudDialogflowV2beta1AnnotatedMessagePart>;
  containEntities?: boolean;
}

export const GoogleCloudDialogflowV2beta1MessageAnnotation: Schema.Schema<GoogleCloudDialogflowV2beta1MessageAnnotation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      parts: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1AnnotatedMessagePart),
      ),
      containEntities: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1MessageAnnotation",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1MessageAnnotation>;

export interface GoogleCloudDialogflowV2beta1Sentiment {
  score?: number;
  magnitude?: number;
}

export const GoogleCloudDialogflowV2beta1Sentiment: Schema.Schema<GoogleCloudDialogflowV2beta1Sentiment> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      score: Schema.optional(Schema.Number),
      magnitude: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1Sentiment",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1Sentiment>;

export interface GoogleCloudDialogflowV2beta1SentimentAnalysisResult {
  queryTextSentiment?: GoogleCloudDialogflowV2beta1Sentiment;
}

export const GoogleCloudDialogflowV2beta1SentimentAnalysisResult: Schema.Schema<GoogleCloudDialogflowV2beta1SentimentAnalysisResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      queryTextSentiment: Schema.optional(
        GoogleCloudDialogflowV2beta1Sentiment,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1SentimentAnalysisResult",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SentimentAnalysisResult>;

export interface GoogleCloudDialogflowV2beta1Message {
  name?: string;
  content?: string;
  responseMessages?: Array<GoogleCloudDialogflowV2beta1ResponseMessage>;
  languageCode?: string;
  participant?: string;
  participantRole?:
    | "ROLE_UNSPECIFIED"
    | "HUMAN_AGENT"
    | "AUTOMATED_AGENT"
    | "END_USER"
    | (string & {});
  createTime?: string;
  sendTime?: string;
  messageAnnotation?: GoogleCloudDialogflowV2beta1MessageAnnotation;
  sentimentAnalysis?: GoogleCloudDialogflowV2beta1SentimentAnalysisResult;
}

export const GoogleCloudDialogflowV2beta1Message: Schema.Schema<GoogleCloudDialogflowV2beta1Message> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      content: Schema.optional(Schema.String),
      responseMessages: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1ResponseMessage),
      ),
      languageCode: Schema.optional(Schema.String),
      participant: Schema.optional(Schema.String),
      participantRole: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      sendTime: Schema.optional(Schema.String),
      messageAnnotation: Schema.optional(
        GoogleCloudDialogflowV2beta1MessageAnnotation,
      ),
      sentimentAnalysis: Schema.optional(
        GoogleCloudDialogflowV2beta1SentimentAnalysisResult,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1Message",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1Message>;

export interface GoogleCloudDialogflowV2beta1SpeechWordInfo {
  word?: string;
  startOffset?: string;
  endOffset?: string;
  confidence?: number;
}

export const GoogleCloudDialogflowV2beta1SpeechWordInfo: Schema.Schema<GoogleCloudDialogflowV2beta1SpeechWordInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      word: Schema.optional(Schema.String),
      startOffset: Schema.optional(Schema.String),
      endOffset: Schema.optional(Schema.String),
      confidence: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1SpeechWordInfo",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SpeechWordInfo>;

export interface GoogleCloudDialogflowV2beta1TelephonyDtmfEvents {
  dtmfEvents?: Array<
    | "TELEPHONY_DTMF_UNSPECIFIED"
    | "DTMF_ONE"
    | "DTMF_TWO"
    | "DTMF_THREE"
    | "DTMF_FOUR"
    | "DTMF_FIVE"
    | "DTMF_SIX"
    | "DTMF_SEVEN"
    | "DTMF_EIGHT"
    | "DTMF_NINE"
    | "DTMF_ZERO"
    | "DTMF_A"
    | "DTMF_B"
    | "DTMF_C"
    | "DTMF_D"
    | "DTMF_STAR"
    | "DTMF_POUND"
    | (string & {})
  >;
}

export const GoogleCloudDialogflowV2beta1TelephonyDtmfEvents: Schema.Schema<GoogleCloudDialogflowV2beta1TelephonyDtmfEvents> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dtmfEvents: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1TelephonyDtmfEvents",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1TelephonyDtmfEvents>;

export interface GoogleCloudDialogflowV2beta1StreamingRecognitionResult {
  messageType?:
    | "MESSAGE_TYPE_UNSPECIFIED"
    | "TRANSCRIPT"
    | "END_OF_SINGLE_UTTERANCE"
    | "DTMF_DIGITS"
    | "PARTIAL_DTMF_DIGITS"
    | (string & {});
  transcript?: string;
  isFinal?: boolean;
  confidence?: number;
  stability?: number;
  speechWordInfo?: Array<GoogleCloudDialogflowV2beta1SpeechWordInfo>;
  speechEndOffset?: string;
  languageCode?: string;
  dtmfDigits?: GoogleCloudDialogflowV2beta1TelephonyDtmfEvents;
}

export const GoogleCloudDialogflowV2beta1StreamingRecognitionResult: Schema.Schema<GoogleCloudDialogflowV2beta1StreamingRecognitionResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      messageType: Schema.optional(Schema.String),
      transcript: Schema.optional(Schema.String),
      isFinal: Schema.optional(Schema.Boolean),
      confidence: Schema.optional(Schema.Number),
      stability: Schema.optional(Schema.Number),
      speechWordInfo: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1SpeechWordInfo),
      ),
      speechEndOffset: Schema.optional(Schema.String),
      languageCode: Schema.optional(Schema.String),
      dtmfDigits: Schema.optional(
        GoogleCloudDialogflowV2beta1TelephonyDtmfEvents,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1StreamingRecognitionResult",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1StreamingRecognitionResult>;

export interface GoogleCloudDialogflowV2beta1ConversationEvent {
  conversation?: string;
  type?:
    | "TYPE_UNSPECIFIED"
    | "CONVERSATION_STARTED"
    | "CONVERSATION_FINISHED"
    | "HUMAN_INTERVENTION_NEEDED"
    | "NEW_MESSAGE"
    | "NEW_RECOGNITION_RESULT"
    | "UNRECOVERABLE_ERROR"
    | (string & {});
  errorStatus?: GoogleRpcStatus;
  newMessagePayload?: GoogleCloudDialogflowV2beta1Message;
  newRecognitionResultPayload?: GoogleCloudDialogflowV2beta1StreamingRecognitionResult;
}

export const GoogleCloudDialogflowV2beta1ConversationEvent: Schema.Schema<GoogleCloudDialogflowV2beta1ConversationEvent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      conversation: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      errorStatus: Schema.optional(GoogleRpcStatus),
      newMessagePayload: Schema.optional(GoogleCloudDialogflowV2beta1Message),
      newRecognitionResultPayload: Schema.optional(
        GoogleCloudDialogflowV2beta1StreamingRecognitionResult,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1ConversationEvent",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ConversationEvent>;

export interface GoogleCloudDialogflowV2beta1ExportAgentResponse {
  agentUri?: string;
  agentContent?: string;
}

export const GoogleCloudDialogflowV2beta1ExportAgentResponse: Schema.Schema<GoogleCloudDialogflowV2beta1ExportAgentResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      agentUri: Schema.optional(Schema.String),
      agentContent: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1ExportAgentResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ExportAgentResponse>;

export interface GoogleCloudDialogflowV2beta1ArticleAnswer {
  title?: string;
  uri?: string;
  snippets?: Array<string>;
  metadata?: Record<string, string>;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2beta1ArticleAnswer: Schema.Schema<GoogleCloudDialogflowV2beta1ArticleAnswer> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      uri: Schema.optional(Schema.String),
      snippets: Schema.optional(Schema.Array(Schema.String)),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      answerRecord: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1ArticleAnswer",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ArticleAnswer>;

export interface GoogleCloudDialogflowV2beta1SuggestArticlesResponse {
  articleAnswers?: Array<GoogleCloudDialogflowV2beta1ArticleAnswer>;
  latestMessage?: string;
  contextSize?: number;
}

export const GoogleCloudDialogflowV2beta1SuggestArticlesResponse: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestArticlesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      articleAnswers: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1ArticleAnswer),
      ),
      latestMessage: Schema.optional(Schema.String),
      contextSize: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1SuggestArticlesResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestArticlesResponse>;

export interface GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerSuggestedQuery {
  queryText?: string;
}

export const GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerSuggestedQuery: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerSuggestedQuery> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      queryText: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerSuggestedQuery",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerSuggestedQuery>;

export interface GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerFaqSource {
  question?: string;
}

export const GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerFaqSource: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerFaqSource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      question: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerFaqSource",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerFaqSource>;

export interface GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet {
  uri?: string;
  text?: string;
  title?: string;
  metadata?: Record<string, unknown>;
}

export const GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
      text: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet>;

export interface GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource {
  snippets?: Array<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet>;
}

export const GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      snippets: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSourceSnippet,
        ),
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource>;

export interface GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswer {
  answerText?: string;
  faqSource?: GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerFaqSource;
  generativeSource?: GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource;
}

export const GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswer: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswer> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      answerText: Schema.optional(Schema.String),
      faqSource: Schema.optional(
        GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerFaqSource,
      ),
      generativeSource: Schema.optional(
        GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswerGenerativeSource,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswer",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswer>;

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

export const GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfoKnowledgeAssistBehavior: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfoKnowledgeAssistBehavior> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
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
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfoKnowledgeAssistBehavior",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfoKnowledgeAssistBehavior>;

export interface GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfoIngestedParameterDebugInfo {
  parameter?: string;
  ingestionStatus?:
    | "INGESTION_STATUS_UNSPECIFIED"
    | "INGESTION_STATUS_SUCCEEDED"
    | "INGESTION_STATUS_CONTEXT_NOT_AVAILABLE"
    | "INGESTION_STATUS_PARSE_FAILED"
    | "INGESTION_STATUS_INVALID_ENTRY"
    | "INGESTION_STATUS_INVALID_FORMAT"
    | "INGESTION_STATUS_LANGUAGE_MISMATCH"
    | (string & {});
}

export const GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfoIngestedParameterDebugInfo: Schema.Schema<GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfoIngestedParameterDebugInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      parameter: Schema.optional(Schema.String),
      ingestionStatus: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfoIngestedParameterDebugInfo",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfoIngestedParameterDebugInfo>;

export interface GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfo {
  projectNotAllowlisted?: boolean;
  contextReferenceRetrieved?: boolean;
  ingestedParametersDebugInfo?: Array<GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfoIngestedParameterDebugInfo>;
}

export const GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfo: Schema.Schema<GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      projectNotAllowlisted: Schema.optional(Schema.Boolean),
      contextReferenceRetrieved: Schema.optional(Schema.Boolean),
      ingestedParametersDebugInfo: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfoIngestedParameterDebugInfo,
        ),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfo",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfo>;

export interface GoogleCloudDialogflowV2beta1ServiceLatencyInternalServiceLatency {
  step?: string;
  latencyMs?: number;
  startTime?: string;
  completeTime?: string;
}

export const GoogleCloudDialogflowV2beta1ServiceLatencyInternalServiceLatency: Schema.Schema<GoogleCloudDialogflowV2beta1ServiceLatencyInternalServiceLatency> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      step: Schema.optional(Schema.String),
      latencyMs: Schema.optional(Schema.Number),
      startTime: Schema.optional(Schema.String),
      completeTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2beta1ServiceLatencyInternalServiceLatency",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ServiceLatencyInternalServiceLatency>;

export interface GoogleCloudDialogflowV2beta1ServiceLatency {
  internalServiceLatencies?: Array<GoogleCloudDialogflowV2beta1ServiceLatencyInternalServiceLatency>;
}

export const GoogleCloudDialogflowV2beta1ServiceLatency: Schema.Schema<GoogleCloudDialogflowV2beta1ServiceLatency> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      internalServiceLatencies: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowV2beta1ServiceLatencyInternalServiceLatency,
        ),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1ServiceLatency",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ServiceLatency>;

export interface GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfo {
  queryGenerationFailureReason?:
    | "QUERY_GENERATION_FAILURE_REASON_UNSPECIFIED"
    | "QUERY_GENERATION_OUT_OF_QUOTA"
    | "QUERY_GENERATION_FAILED"
    | "QUERY_GENERATION_NO_QUERY_GENERATED"
    | "QUERY_GENERATION_RAI_FAILED"
    | "NOT_IN_ALLOWLIST"
    | "QUERY_GENERATION_QUERY_REDACTED"
    | "QUERY_GENERATION_LLM_RESPONSE_PARSE_FAILED"
    | "QUERY_GENERATION_EMPTY_CONVERSATION"
    | "QUERY_GENERATION_EMPTY_LAST_MESSAGE"
    | "QUERY_GENERATION_TRIGGERING_EVENT_CONDITION_NOT_MET"
    | (string & {});
  queryCategorizationFailureReason?:
    | "QUERY_CATEGORIZATION_FAILURE_REASON_UNSPECIFIED"
    | "QUERY_CATEGORIZATION_INVALID_CONFIG"
    | "QUERY_CATEGORIZATION_RESULT_NOT_FOUND"
    | "QUERY_CATEGORIZATION_FAILED"
    | (string & {});
  datastoreResponseReason?:
    | "DATASTORE_RESPONSE_REASON_UNSPECIFIED"
    | "NONE"
    | "SEARCH_OUT_OF_QUOTA"
    | "SEARCH_EMPTY_RESULTS"
    | "ANSWER_GENERATION_GEN_AI_DISABLED"
    | "ANSWER_GENERATION_OUT_OF_QUOTA"
    | "ANSWER_GENERATION_ERROR"
    | "ANSWER_GENERATION_NOT_ENOUGH_INFO"
    | "ANSWER_GENERATION_RAI_FAILED"
    | "ANSWER_GENERATION_NOT_GROUNDED"
    | (string & {});
  knowledgeAssistBehavior?: GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfoKnowledgeAssistBehavior;
  ingestedContextReferenceDebugInfo?: GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfo;
  serviceLatency?: GoogleCloudDialogflowV2beta1ServiceLatency;
}

export const GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfo: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      queryGenerationFailureReason: Schema.optional(Schema.String),
      queryCategorizationFailureReason: Schema.optional(Schema.String),
      datastoreResponseReason: Schema.optional(Schema.String),
      knowledgeAssistBehavior: Schema.optional(
        GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfoKnowledgeAssistBehavior,
      ),
      ingestedContextReferenceDebugInfo: Schema.optional(
        GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfo,
      ),
      serviceLatency: Schema.optional(
        GoogleCloudDialogflowV2beta1ServiceLatency,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfo",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfo>;

export interface GoogleCloudDialogflowV2beta1KnowledgeAssistAnswer {
  suggestedQuery?: GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerSuggestedQuery;
  suggestedQueryAnswer?: GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswer;
  answerRecord?: string;
  knowledgeAssistDebugInfo?: GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfo;
}

export const GoogleCloudDialogflowV2beta1KnowledgeAssistAnswer: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswer> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      suggestedQuery: Schema.optional(
        GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerSuggestedQuery,
      ),
      suggestedQueryAnswer: Schema.optional(
        GoogleCloudDialogflowV2beta1KnowledgeAssistAnswerKnowledgeAnswer,
      ),
      answerRecord: Schema.optional(Schema.String),
      knowledgeAssistDebugInfo: Schema.optional(
        GoogleCloudDialogflowV2beta1KnowledgeAssistDebugInfo,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1KnowledgeAssistAnswer",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAssistAnswer>;

export interface GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistResponse {
  knowledgeAssistAnswer?: GoogleCloudDialogflowV2beta1KnowledgeAssistAnswer;
  latestMessage?: string;
  contextSize?: number;
}

export const GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistResponse: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      knowledgeAssistAnswer: Schema.optional(
        GoogleCloudDialogflowV2beta1KnowledgeAssistAnswer,
      ),
      latestMessage: Schema.optional(Schema.String),
      contextSize: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistResponse>;

export interface GoogleCloudDialogflowV2beta1FaqAnswer {
  answer?: string;
  confidence?: number;
  question?: string;
  source?: string;
  metadata?: Record<string, string>;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2beta1FaqAnswer: Schema.Schema<GoogleCloudDialogflowV2beta1FaqAnswer> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      answer: Schema.optional(Schema.String),
      confidence: Schema.optional(Schema.Number),
      question: Schema.optional(Schema.String),
      source: Schema.optional(Schema.String),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      answerRecord: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1FaqAnswer",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1FaqAnswer>;

export interface GoogleCloudDialogflowV2beta1SuggestFaqAnswersResponse {
  faqAnswers?: Array<GoogleCloudDialogflowV2beta1FaqAnswer>;
  latestMessage?: string;
  contextSize?: number;
}

export const GoogleCloudDialogflowV2beta1SuggestFaqAnswersResponse: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestFaqAnswersResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      faqAnswers: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1FaqAnswer),
      ),
      latestMessage: Schema.optional(Schema.String),
      contextSize: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1SuggestFaqAnswersResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestFaqAnswersResponse>;

export interface GoogleCloudDialogflowV2beta1SmartReplyAnswer {
  reply?: string;
  confidence?: number;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2beta1SmartReplyAnswer: Schema.Schema<GoogleCloudDialogflowV2beta1SmartReplyAnswer> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      reply: Schema.optional(Schema.String),
      confidence: Schema.optional(Schema.Number),
      answerRecord: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1SmartReplyAnswer",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SmartReplyAnswer>;

export interface GoogleCloudDialogflowV2beta1SuggestSmartRepliesResponse {
  smartReplyAnswers?: Array<GoogleCloudDialogflowV2beta1SmartReplyAnswer>;
  latestMessage?: string;
  contextSize?: number;
}

export const GoogleCloudDialogflowV2beta1SuggestSmartRepliesResponse: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestSmartRepliesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      smartReplyAnswers: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1SmartReplyAnswer),
      ),
      latestMessage: Schema.optional(Schema.String),
      contextSize: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1SuggestSmartRepliesResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestSmartRepliesResponse>;

export interface GoogleCloudDialogflowV2beta1KnowledgeAnswersAnswer {
  source?: string;
  faqQuestion?: string;
  answer?: string;
  matchConfidenceLevel?:
    | "MATCH_CONFIDENCE_LEVEL_UNSPECIFIED"
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | (string & {});
  matchConfidence?: number;
}

export const GoogleCloudDialogflowV2beta1KnowledgeAnswersAnswer: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAnswersAnswer> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      source: Schema.optional(Schema.String),
      faqQuestion: Schema.optional(Schema.String),
      answer: Schema.optional(Schema.String),
      matchConfidenceLevel: Schema.optional(Schema.String),
      matchConfidence: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1KnowledgeAnswersAnswer",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAnswersAnswer>;

export interface GoogleCloudDialogflowV2beta1KnowledgeAnswers {
  answers?: Array<GoogleCloudDialogflowV2beta1KnowledgeAnswersAnswer>;
}

export const GoogleCloudDialogflowV2beta1KnowledgeAnswers: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAnswers> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      answers: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1KnowledgeAnswersAnswer),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1KnowledgeAnswers",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeAnswers>;

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

export const GoogleCloudDialogflowV2beta1QueryResult: Schema.Schema<GoogleCloudDialogflowV2beta1QueryResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      queryText: Schema.optional(Schema.String),
      languageCode: Schema.optional(Schema.String),
      speechRecognitionConfidence: Schema.optional(Schema.Number),
      action: Schema.optional(Schema.String),
      parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      allRequiredParamsPresent: Schema.optional(Schema.Boolean),
      cancelsSlotFilling: Schema.optional(Schema.Boolean),
      fulfillmentText: Schema.optional(Schema.String),
      fulfillmentMessages: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1IntentMessage),
      ),
      webhookSource: Schema.optional(Schema.String),
      webhookPayload: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      outputContexts: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1Context),
      ),
      intent: Schema.optional(GoogleCloudDialogflowV2beta1Intent),
      intentDetectionConfidence: Schema.optional(Schema.Number),
      diagnosticInfo: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      sentimentAnalysisResult: Schema.optional(
        GoogleCloudDialogflowV2beta1SentimentAnalysisResult,
      ),
      knowledgeAnswers: Schema.optional(
        GoogleCloudDialogflowV2beta1KnowledgeAnswers,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1QueryResult",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1QueryResult>;

export interface GoogleCloudDialogflowV2beta1IntentSuggestion {
  displayName?: string;
  intentV2?: string;
  description?: string;
}

export const GoogleCloudDialogflowV2beta1IntentSuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1IntentSuggestion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      intentV2: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1IntentSuggestion",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentSuggestion>;

export interface GoogleCloudDialogflowV2beta1DialogflowAssistAnswer {
  queryResult?: GoogleCloudDialogflowV2beta1QueryResult;
  intentSuggestion?: GoogleCloudDialogflowV2beta1IntentSuggestion;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2beta1DialogflowAssistAnswer: Schema.Schema<GoogleCloudDialogflowV2beta1DialogflowAssistAnswer> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      queryResult: Schema.optional(GoogleCloudDialogflowV2beta1QueryResult),
      intentSuggestion: Schema.optional(
        GoogleCloudDialogflowV2beta1IntentSuggestion,
      ),
      answerRecord: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1DialogflowAssistAnswer",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1DialogflowAssistAnswer>;

export interface GoogleCloudDialogflowV2beta1SuggestDialogflowAssistsResponse {
  dialogflowAssistAnswers?: Array<GoogleCloudDialogflowV2beta1DialogflowAssistAnswer>;
  latestMessage?: string;
  contextSize?: number;
}

export const GoogleCloudDialogflowV2beta1SuggestDialogflowAssistsResponse: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestDialogflowAssistsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      dialogflowAssistAnswers: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1DialogflowAssistAnswer),
      ),
      latestMessage: Schema.optional(Schema.String),
      contextSize: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1SuggestDialogflowAssistsResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestDialogflowAssistsResponse>;

export interface GoogleCloudDialogflowV2beta1FreeFormSuggestion {
  response?: string;
}

export const GoogleCloudDialogflowV2beta1FreeFormSuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1FreeFormSuggestion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      response: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1FreeFormSuggestion",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1FreeFormSuggestion>;

export interface GoogleCloudDialogflowV2beta1SummarySuggestionSummarySection {
  section?: string;
  summary?: string;
}

export const GoogleCloudDialogflowV2beta1SummarySuggestionSummarySection: Schema.Schema<GoogleCloudDialogflowV2beta1SummarySuggestionSummarySection> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      section: Schema.optional(Schema.String),
      summary: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1SummarySuggestionSummarySection",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SummarySuggestionSummarySection>;

export interface GoogleCloudDialogflowV2beta1SummarySuggestion {
  summarySections?: Array<GoogleCloudDialogflowV2beta1SummarySuggestionSummarySection>;
}

export const GoogleCloudDialogflowV2beta1SummarySuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1SummarySuggestion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      summarySections: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowV2beta1SummarySuggestionSummarySection,
        ),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1SummarySuggestion",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SummarySuggestion>;

export interface GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion {
  answerRecord?: string;
  suggestionIndex?: number;
  similarityScore?: number;
}

export const GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      answerRecord: Schema.optional(Schema.String),
      suggestionIndex: Schema.optional(Schema.Number),
      similarityScore: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion>;

export interface GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResult {
  duplicateSuggestions?: Array<GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion>;
}

export const GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResult: Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      duplicateSuggestions: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResultDuplicateSuggestion,
        ),
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResult",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResult>;

export interface GoogleCloudDialogflowV2beta1AgentCoachingInstruction {
  displayName?: string;
  displayDetails?: string;
  condition?: string;
  agentAction?: string;
  systemAction?: string;
  duplicateCheckResult?: GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResult;
  triggeringEvent?:
    | "TRIGGER_EVENT_UNSPECIFIED"
    | "END_OF_UTTERANCE"
    | "MANUAL_CALL"
    | "CUSTOMER_MESSAGE"
    | "AGENT_MESSAGE"
    | "TOOL_CALL_COMPLETION"
    | (string & {});
}

export const GoogleCloudDialogflowV2beta1AgentCoachingInstruction: Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingInstruction> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      displayDetails: Schema.optional(Schema.String),
      condition: Schema.optional(Schema.String),
      agentAction: Schema.optional(Schema.String),
      systemAction: Schema.optional(Schema.String),
      duplicateCheckResult: Schema.optional(
        GoogleCloudDialogflowV2beta1AgentCoachingInstructionDuplicateCheckResult,
      ),
      triggeringEvent: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1AgentCoachingInstruction",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingInstruction>;

export interface GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources {
  instructionIndexes?: Array<number>;
}

export const GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources: Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      instructionIndexes: Schema.optional(Schema.Array(Schema.Number)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources>;

export interface GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion {
  answerRecord?: string;
  sources?: GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources;
  suggestionIndex?: number;
  similarityScore?: number;
}

export const GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      answerRecord: Schema.optional(Schema.String),
      sources: Schema.optional(
        GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources,
      ),
      suggestionIndex: Schema.optional(Schema.Number),
      similarityScore: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion>;

export interface GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResult {
  duplicateSuggestions?: Array<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion>;
}

export const GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResult: Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      duplicateSuggestions: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResultDuplicateSuggestion,
        ),
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResult",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResult>;

export interface GoogleCloudDialogflowV2beta1AgentCoachingSuggestionAgentActionSuggestion {
  agentAction?: string;
  sources?: GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources;
  duplicateCheckResult?: GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResult;
}

export const GoogleCloudDialogflowV2beta1AgentCoachingSuggestionAgentActionSuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionAgentActionSuggestion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      agentAction: Schema.optional(Schema.String),
      sources: Schema.optional(
        GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources,
      ),
      duplicateCheckResult: Schema.optional(
        GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResult,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2beta1AgentCoachingSuggestionAgentActionSuggestion",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionAgentActionSuggestion>;

export interface GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSampleResponse {
  responseText?: string;
  sources?: GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources;
  duplicateCheckResult?: GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResult;
}

export const GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSampleResponse: Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSampleResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      responseText: Schema.optional(Schema.String),
      sources: Schema.optional(
        GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSources,
      ),
      duplicateCheckResult: Schema.optional(
        GoogleCloudDialogflowV2beta1AgentCoachingSuggestionDuplicateCheckResult,
      ),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSampleResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSampleResponse>;

export interface GoogleCloudDialogflowV2beta1AgentCoachingSuggestion {
  applicableInstructions?: Array<GoogleCloudDialogflowV2beta1AgentCoachingInstruction>;
  agentActionSuggestions?: Array<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionAgentActionSuggestion>;
  sampleResponses?: Array<GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSampleResponse>;
}

export const GoogleCloudDialogflowV2beta1AgentCoachingSuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      applicableInstructions: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1AgentCoachingInstruction),
      ),
      agentActionSuggestions: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowV2beta1AgentCoachingSuggestionAgentActionSuggestion,
        ),
      ),
      sampleResponses: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowV2beta1AgentCoachingSuggestionSampleResponse,
        ),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1AgentCoachingSuggestion",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingSuggestion>;

export interface GoogleCloudDialogflowV2beta1ToolCall {
  tool?: string;
  toolDisplayName?: string;
  toolDisplayDetails?: string;
  action?: string;
  inputParameters?: Record<string, unknown>;
  createTime?: string;
  answerRecord?: string;
  state?:
    | "STATE_UNSPECIFIED"
    | "TRIGGERED"
    | "NEEDS_CONFIRMATION"
    | (string & {});
}

export const GoogleCloudDialogflowV2beta1ToolCall: Schema.Schema<GoogleCloudDialogflowV2beta1ToolCall> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tool: Schema.optional(Schema.String),
      toolDisplayName: Schema.optional(Schema.String),
      toolDisplayDetails: Schema.optional(Schema.String),
      action: Schema.optional(Schema.String),
      inputParameters: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      createTime: Schema.optional(Schema.String),
      answerRecord: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1ToolCall",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ToolCall>;

export interface GoogleCloudDialogflowV2beta1ToolCallResultError {
  message?: string;
}

export const GoogleCloudDialogflowV2beta1ToolCallResultError: Schema.Schema<GoogleCloudDialogflowV2beta1ToolCallResultError> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      message: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1ToolCallResultError",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ToolCallResultError>;

export interface GoogleCloudDialogflowV2beta1ToolCallResult {
  tool?: string;
  action?: string;
  error?: GoogleCloudDialogflowV2beta1ToolCallResultError;
  rawContent?: string;
  content?: string;
  createTime?: string;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2beta1ToolCallResult: Schema.Schema<GoogleCloudDialogflowV2beta1ToolCallResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      tool: Schema.optional(Schema.String),
      action: Schema.optional(Schema.String),
      error: Schema.optional(GoogleCloudDialogflowV2beta1ToolCallResultError),
      rawContent: Schema.optional(Schema.String),
      content: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      answerRecord: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1ToolCallResult",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ToolCallResult>;

export interface GoogleCloudDialogflowV2beta1GeneratorSuggestionToolCallInfo {
  toolCall?: GoogleCloudDialogflowV2beta1ToolCall;
  toolCallResult?: GoogleCloudDialogflowV2beta1ToolCallResult;
}

export const GoogleCloudDialogflowV2beta1GeneratorSuggestionToolCallInfo: Schema.Schema<GoogleCloudDialogflowV2beta1GeneratorSuggestionToolCallInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      toolCall: Schema.optional(GoogleCloudDialogflowV2beta1ToolCall),
      toolCallResult: Schema.optional(
        GoogleCloudDialogflowV2beta1ToolCallResult,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1GeneratorSuggestionToolCallInfo",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1GeneratorSuggestionToolCallInfo>;

export interface GoogleCloudDialogflowV2beta1GeneratorSuggestion {
  freeFormSuggestion?: GoogleCloudDialogflowV2beta1FreeFormSuggestion;
  summarySuggestion?: GoogleCloudDialogflowV2beta1SummarySuggestion;
  agentCoachingSuggestion?: GoogleCloudDialogflowV2beta1AgentCoachingSuggestion;
  toolCallInfo?: Array<GoogleCloudDialogflowV2beta1GeneratorSuggestionToolCallInfo>;
}

export const GoogleCloudDialogflowV2beta1GeneratorSuggestion: Schema.Schema<GoogleCloudDialogflowV2beta1GeneratorSuggestion> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      freeFormSuggestion: Schema.optional(
        GoogleCloudDialogflowV2beta1FreeFormSuggestion,
      ),
      summarySuggestion: Schema.optional(
        GoogleCloudDialogflowV2beta1SummarySuggestion,
      ),
      agentCoachingSuggestion: Schema.optional(
        GoogleCloudDialogflowV2beta1AgentCoachingSuggestion,
      ),
      toolCallInfo: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowV2beta1GeneratorSuggestionToolCallInfo,
        ),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1GeneratorSuggestion",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1GeneratorSuggestion>;

export interface GoogleCloudDialogflowV2beta1GenerateSuggestionsResponseGeneratorSuggestionAnswer {
  generatorSuggestion?: GoogleCloudDialogflowV2beta1GeneratorSuggestion;
  sourceGenerator?: string;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2beta1GenerateSuggestionsResponseGeneratorSuggestionAnswer: Schema.Schema<GoogleCloudDialogflowV2beta1GenerateSuggestionsResponseGeneratorSuggestionAnswer> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      generatorSuggestion: Schema.optional(
        GoogleCloudDialogflowV2beta1GeneratorSuggestion,
      ),
      sourceGenerator: Schema.optional(Schema.String),
      answerRecord: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2beta1GenerateSuggestionsResponseGeneratorSuggestionAnswer",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1GenerateSuggestionsResponseGeneratorSuggestionAnswer>;

export interface GoogleCloudDialogflowV2beta1GenerateSuggestionsResponse {
  generatorSuggestionAnswers?: Array<GoogleCloudDialogflowV2beta1GenerateSuggestionsResponseGeneratorSuggestionAnswer>;
  latestMessage?: string;
}

export const GoogleCloudDialogflowV2beta1GenerateSuggestionsResponse: Schema.Schema<GoogleCloudDialogflowV2beta1GenerateSuggestionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      generatorSuggestionAnswers: Schema.optional(
        Schema.Array(
          GoogleCloudDialogflowV2beta1GenerateSuggestionsResponseGeneratorSuggestionAnswer,
        ),
      ),
      latestMessage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1GenerateSuggestionsResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1GenerateSuggestionsResponse>;

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

export const GoogleCloudDialogflowV2beta1SuggestionResult: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestionResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      error: Schema.optional(GoogleRpcStatus),
      suggestArticlesResponse: Schema.optional(
        GoogleCloudDialogflowV2beta1SuggestArticlesResponse,
      ),
      suggestKnowledgeAssistResponse: Schema.optional(
        GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistResponse,
      ),
      suggestFaqAnswersResponse: Schema.optional(
        GoogleCloudDialogflowV2beta1SuggestFaqAnswersResponse,
      ),
      suggestSmartRepliesResponse: Schema.optional(
        GoogleCloudDialogflowV2beta1SuggestSmartRepliesResponse,
      ),
      suggestDialogflowAssistsResponse: Schema.optional(
        GoogleCloudDialogflowV2beta1SuggestDialogflowAssistsResponse,
      ),
      suggestEntityExtractionResponse: Schema.optional(
        GoogleCloudDialogflowV2beta1SuggestDialogflowAssistsResponse,
      ),
      generateSuggestionsResponse: Schema.optional(
        GoogleCloudDialogflowV2beta1GenerateSuggestionsResponse,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1SuggestionResult",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestionResult>;

export interface GoogleCloudDialogflowV2beta1HumanAgentAssistantEvent {
  conversation?: string;
  participant?: string;
  suggestionResults?: Array<GoogleCloudDialogflowV2beta1SuggestionResult>;
}

export const GoogleCloudDialogflowV2beta1HumanAgentAssistantEvent: Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantEvent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      conversation: Schema.optional(Schema.String),
      participant: Schema.optional(Schema.String),
      suggestionResults: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1SuggestionResult),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1HumanAgentAssistantEvent",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantEvent>;

export interface GoogleCloudDialogflowV2beta1ImportDocumentsResponse {
  warnings?: Array<GoogleRpcStatus>;
}

export const GoogleCloudDialogflowV2beta1ImportDocumentsResponse: Schema.Schema<GoogleCloudDialogflowV2beta1ImportDocumentsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      warnings: Schema.optional(Schema.Array(GoogleRpcStatus)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1ImportDocumentsResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ImportDocumentsResponse>;

export interface GoogleCloudDialogflowV2beta1EncryptionSpec {
  name?: string;
  kmsKey?: string;
}

export const GoogleCloudDialogflowV2beta1EncryptionSpec: Schema.Schema<GoogleCloudDialogflowV2beta1EncryptionSpec> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      kmsKey: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1EncryptionSpec",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1EncryptionSpec>;

export interface GoogleCloudDialogflowV2beta1InitializeEncryptionSpecRequest {
  encryptionSpec?: GoogleCloudDialogflowV2beta1EncryptionSpec;
}

export const GoogleCloudDialogflowV2beta1InitializeEncryptionSpecRequest: Schema.Schema<GoogleCloudDialogflowV2beta1InitializeEncryptionSpecRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      encryptionSpec: Schema.optional(
        GoogleCloudDialogflowV2beta1EncryptionSpec,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1InitializeEncryptionSpecRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1InitializeEncryptionSpecRequest>;

export interface GoogleCloudDialogflowV2beta1InitializeEncryptionSpecMetadata {
  request?: GoogleCloudDialogflowV2beta1InitializeEncryptionSpecRequest;
}

export const GoogleCloudDialogflowV2beta1InitializeEncryptionSpecMetadata: Schema.Schema<GoogleCloudDialogflowV2beta1InitializeEncryptionSpecMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      request: Schema.optional(
        GoogleCloudDialogflowV2beta1InitializeEncryptionSpecRequest,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1InitializeEncryptionSpecMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1InitializeEncryptionSpecMetadata>;

export interface GoogleCloudDialogflowV2beta1GcsDestination {
  uri?: string;
}

export const GoogleCloudDialogflowV2beta1GcsDestination: Schema.Schema<GoogleCloudDialogflowV2beta1GcsDestination> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      uri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1GcsDestination",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1GcsDestination>;

export interface GoogleCloudDialogflowV2beta1ExportOperationMetadata {
  exportedGcsDestination?: GoogleCloudDialogflowV2beta1GcsDestination;
}

export const GoogleCloudDialogflowV2beta1ExportOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2beta1ExportOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      exportedGcsDestination: Schema.optional(
        GoogleCloudDialogflowV2beta1GcsDestination,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1ExportOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ExportOperationMetadata>;

export interface GoogleCloudDialogflowV2beta1KnowledgeOperationMetadata {
  state?: "STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "DONE" | (string & {});
  knowledgeBase?: string;
  exportOperationMetadata?: GoogleCloudDialogflowV2beta1ExportOperationMetadata;
  doneTime?: string;
}

export const GoogleCloudDialogflowV2beta1KnowledgeOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      state: Schema.optional(Schema.String),
      knowledgeBase: Schema.optional(Schema.String),
      exportOperationMetadata: Schema.optional(
        GoogleCloudDialogflowV2beta1ExportOperationMetadata,
      ),
      doneTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1KnowledgeOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeOperationMetadata>;

export interface GoogleCloudDialogflowV2beta1OriginalDetectIntentRequest {
  source?: string;
  version?: string;
  payload?: Record<string, unknown>;
}

export const GoogleCloudDialogflowV2beta1OriginalDetectIntentRequest: Schema.Schema<GoogleCloudDialogflowV2beta1OriginalDetectIntentRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      source: Schema.optional(Schema.String),
      version: Schema.optional(Schema.String),
      payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1OriginalDetectIntentRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1OriginalDetectIntentRequest>;

export interface GoogleCloudDialogflowV2beta1SetSuggestionFeatureConfigOperationMetadata {
  conversationProfile?: string;
  participantRole?:
    | "ROLE_UNSPECIFIED"
    | "HUMAN_AGENT"
    | "AUTOMATED_AGENT"
    | "END_USER"
    | (string & {});
  suggestionFeatureType?:
    | "TYPE_UNSPECIFIED"
    | "ARTICLE_SUGGESTION"
    | "FAQ"
    | "SMART_REPLY"
    | "DIALOGFLOW_ASSIST"
    | "CONVERSATION_SUMMARIZATION"
    | "KNOWLEDGE_SEARCH"
    | "KNOWLEDGE_ASSIST"
    | (string & {});
  createTime?: string;
}

export const GoogleCloudDialogflowV2beta1SetSuggestionFeatureConfigOperationMetadata: Schema.Schema<GoogleCloudDialogflowV2beta1SetSuggestionFeatureConfigOperationMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      conversationProfile: Schema.optional(Schema.String),
      participantRole: Schema.optional(Schema.String),
      suggestionFeatureType: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "GoogleCloudDialogflowV2beta1SetSuggestionFeatureConfigOperationMetadata",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SetSuggestionFeatureConfigOperationMetadata>;

export interface GoogleCloudDialogflowV2beta1WebhookRequest {
  session?: string;
  responseId?: string;
  queryResult?: GoogleCloudDialogflowV2beta1QueryResult;
  alternativeQueryResults?: Array<GoogleCloudDialogflowV2beta1QueryResult>;
  originalDetectIntentRequest?: GoogleCloudDialogflowV2beta1OriginalDetectIntentRequest;
}

export const GoogleCloudDialogflowV2beta1WebhookRequest: Schema.Schema<GoogleCloudDialogflowV2beta1WebhookRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      session: Schema.optional(Schema.String),
      responseId: Schema.optional(Schema.String),
      queryResult: Schema.optional(GoogleCloudDialogflowV2beta1QueryResult),
      alternativeQueryResults: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1QueryResult),
      ),
      originalDetectIntentRequest: Schema.optional(
        GoogleCloudDialogflowV2beta1OriginalDetectIntentRequest,
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1WebhookRequest",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1WebhookRequest>;

export interface GoogleCloudDialogflowV2beta1EventInput {
  name?: string;
  parameters?: Record<string, unknown>;
  languageCode?: string;
}

export const GoogleCloudDialogflowV2beta1EventInput: Schema.Schema<GoogleCloudDialogflowV2beta1EventInput> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      languageCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1EventInput",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1EventInput>;

export interface GoogleCloudDialogflowV2beta1SessionEntityType {
  name?: string;
  entityOverrideMode?:
    | "ENTITY_OVERRIDE_MODE_UNSPECIFIED"
    | "ENTITY_OVERRIDE_MODE_OVERRIDE"
    | "ENTITY_OVERRIDE_MODE_SUPPLEMENT"
    | (string & {});
  entities?: Array<GoogleCloudDialogflowV2beta1EntityTypeEntity>;
}

export const GoogleCloudDialogflowV2beta1SessionEntityType: Schema.Schema<GoogleCloudDialogflowV2beta1SessionEntityType> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      entityOverrideMode: Schema.optional(Schema.String),
      entities: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1EntityTypeEntity),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1SessionEntityType",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SessionEntityType>;

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

export const GoogleCloudDialogflowV2beta1WebhookResponse: Schema.Schema<GoogleCloudDialogflowV2beta1WebhookResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      fulfillmentText: Schema.optional(Schema.String),
      fulfillmentMessages: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1IntentMessage),
      ),
      source: Schema.optional(Schema.String),
      payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      outputContexts: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1Context),
      ),
      followupEventInput: Schema.optional(
        GoogleCloudDialogflowV2beta1EventInput,
      ),
      liveAgentHandoff: Schema.optional(Schema.Boolean),
      endInteraction: Schema.optional(Schema.Boolean),
      sessionEntityTypes: Schema.optional(
        Schema.Array(GoogleCloudDialogflowV2beta1SessionEntityType),
      ),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV2beta1WebhookResponse",
  }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1WebhookResponse>;

export interface GoogleCloudDialogflowV3alpha1TurnSignals {
  noMatch?: boolean;
  noUserInput?: boolean;
  dtmfUsed?: boolean;
  userEscalated?: boolean;
  agentEscalated?: boolean;
  triggeredAbandonmentEvent?: boolean;
  reachedEndPage?: boolean;
  webhookStatuses?: Array<string>;
  failureReasons?: Array<
    | "FAILURE_REASON_UNSPECIFIED"
    | "FAILED_INTENT"
    | "FAILED_WEBHOOK"
    | (string & {})
  >;
  sentimentScore?: number;
  sentimentMagnitude?: number;
}

export const GoogleCloudDialogflowV3alpha1TurnSignals: Schema.Schema<GoogleCloudDialogflowV3alpha1TurnSignals> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
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
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV3alpha1TurnSignals",
  }) as any as Schema.Schema<GoogleCloudDialogflowV3alpha1TurnSignals>;

export interface GoogleCloudDialogflowV3alpha1ConversationSignals {
  turnSignals?: GoogleCloudDialogflowV3alpha1TurnSignals;
}

export const GoogleCloudDialogflowV3alpha1ConversationSignals: Schema.Schema<GoogleCloudDialogflowV3alpha1ConversationSignals> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      turnSignals: Schema.optional(GoogleCloudDialogflowV3alpha1TurnSignals),
    }),
  ).annotate({
    identifier: "GoogleCloudDialogflowV3alpha1ConversationSignals",
  }) as any as Schema.Schema<GoogleCloudDialogflowV3alpha1ConversationSignals>;

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

export const ListProjectsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnPartialSuccess"),
    ),
  }).pipe(
    T.Http({ method: "GET", path: "v3/projects/{projectsId}/operations" }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsOperationsRequest>;

export type ListProjectsOperationsResponse =
  GoogleLongrunningListOperationsResponse;
export const ListProjectsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningListOperationsResponse;

export type ListProjectsOperationsError = DefaultErrors;

export const listProjectsOperations: API.PaginatedOperationMethod<
  ListProjectsOperationsRequest,
  ListProjectsOperationsResponse,
  ListProjectsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
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

export const GetProjectsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsOperationsRequest>;

export type GetProjectsOperationsResponse = GoogleLongrunningOperation;
export const GetProjectsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type GetProjectsOperationsError = DefaultErrors;

export const getProjectsOperations: API.OperationMethod<
  GetProjectsOperationsRequest,
  GetProjectsOperationsResponse,
  GetProjectsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsOperationsRequest,
  output: GetProjectsOperationsResponse,
  errors: [],
}));

export interface CancelProjectsOperationsRequest {
  name: string;
}

export const CancelProjectsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/operations/{operationsId}:cancel",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CancelProjectsOperationsRequest>;

export type CancelProjectsOperationsResponse = GoogleProtobufEmpty;
export const CancelProjectsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type CancelProjectsOperationsError = DefaultErrors;

export const cancelProjectsOperations: API.OperationMethod<
  CancelProjectsOperationsRequest,
  CancelProjectsOperationsResponse,
  CancelProjectsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ListProjectsLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(
      T.HttpQuery("extraLocationTypes"),
    ),
  }).pipe(
    T.Http({ method: "GET", path: "v3/projects/{projectsId}/locations" }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse =
  GoogleCloudLocationListLocationsResponse;
export const ListProjectsLocationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudLocationListLocationsResponse;

export type ListProjectsLocationsError = DefaultErrors;

export const listProjectsLocations: API.PaginatedOperationMethod<
  ListProjectsLocationsRequest,
  ListProjectsLocationsResponse,
  ListProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
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

export const GetProjectsLocationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = GoogleCloudLocationLocation;
export const GetProjectsLocationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudLocationLocation;

export type GetProjectsLocationsError = DefaultErrors;

export const getProjectsLocations: API.OperationMethod<
  GetProjectsLocationsRequest,
  GetProjectsLocationsResponse,
  GetProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ListProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
      T.HttpQuery("returnPartialSuccess"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/operations",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse =
  GoogleLongrunningListOperationsResponse;
export const ListProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningListOperationsResponse;

export type ListProjectsLocationsOperationsError = DefaultErrors;

export const listProjectsLocationsOperations: API.PaginatedOperationMethod<
  ListProjectsLocationsOperationsRequest,
  ListProjectsLocationsOperationsResponse,
  ListProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
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

export const GetProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = GoogleLongrunningOperation;
export const GetProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type GetProjectsLocationsOperationsError = DefaultErrors;

export const getProjectsLocationsOperations: API.OperationMethod<
  GetProjectsLocationsOperationsRequest,
  GetProjectsLocationsOperationsResponse,
  GetProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface CancelProjectsLocationsOperationsRequest {
  name: string;
}

export const CancelProjectsLocationsOperationsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = GoogleProtobufEmpty;
export const CancelProjectsLocationsOperationsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type CancelProjectsLocationsOperationsError = DefaultErrors;

export const cancelProjectsLocationsOperations: API.OperationMethod<
  CancelProjectsLocationsOperationsRequest,
  CancelProjectsLocationsOperationsResponse,
  CancelProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsSecuritySettingsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3SecuritySettings;
}

export const CreateProjectsLocationsSecuritySettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(GoogleCloudDialogflowCxV3SecuritySettings).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/securitySettings",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsSecuritySettingsRequest>;

export type CreateProjectsLocationsSecuritySettingsResponse =
  GoogleCloudDialogflowCxV3SecuritySettings;
export const CreateProjectsLocationsSecuritySettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3SecuritySettings;

export type CreateProjectsLocationsSecuritySettingsError = DefaultErrors;

export const createProjectsLocationsSecuritySettings: API.OperationMethod<
  CreateProjectsLocationsSecuritySettingsRequest,
  CreateProjectsLocationsSecuritySettingsResponse,
  CreateProjectsLocationsSecuritySettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsSecuritySettingsRequest,
  output: CreateProjectsLocationsSecuritySettingsResponse,
  errors: [],
}));

export interface GetProjectsLocationsSecuritySettingsRequest {
  name: string;
}

export const GetProjectsLocationsSecuritySettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/securitySettings/{securitySettingsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsSecuritySettingsRequest>;

export type GetProjectsLocationsSecuritySettingsResponse =
  GoogleCloudDialogflowCxV3SecuritySettings;
export const GetProjectsLocationsSecuritySettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3SecuritySettings;

export type GetProjectsLocationsSecuritySettingsError = DefaultErrors;

export const getProjectsLocationsSecuritySettings: API.OperationMethod<
  GetProjectsLocationsSecuritySettingsRequest,
  GetProjectsLocationsSecuritySettingsResponse,
  GetProjectsLocationsSecuritySettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsSecuritySettingsRequest,
  output: GetProjectsLocationsSecuritySettingsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsSecuritySettingsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3SecuritySettings;
}

export const PatchProjectsLocationsSecuritySettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GoogleCloudDialogflowCxV3SecuritySettings).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v3/projects/{projectsId}/locations/{locationsId}/securitySettings/{securitySettingsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsSecuritySettingsRequest>;

export type PatchProjectsLocationsSecuritySettingsResponse =
  GoogleCloudDialogflowCxV3SecuritySettings;
export const PatchProjectsLocationsSecuritySettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3SecuritySettings;

export type PatchProjectsLocationsSecuritySettingsError = DefaultErrors;

export const patchProjectsLocationsSecuritySettings: API.OperationMethod<
  PatchProjectsLocationsSecuritySettingsRequest,
  PatchProjectsLocationsSecuritySettingsResponse,
  PatchProjectsLocationsSecuritySettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsSecuritySettingsRequest,
  output: PatchProjectsLocationsSecuritySettingsResponse,
  errors: [],
}));

export interface ListProjectsLocationsSecuritySettingsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsSecuritySettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/securitySettings",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsSecuritySettingsRequest>;

export type ListProjectsLocationsSecuritySettingsResponse =
  GoogleCloudDialogflowCxV3ListSecuritySettingsResponse;
export const ListProjectsLocationsSecuritySettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3ListSecuritySettingsResponse;

export type ListProjectsLocationsSecuritySettingsError = DefaultErrors;

export const listProjectsLocationsSecuritySettings: API.PaginatedOperationMethod<
  ListProjectsLocationsSecuritySettingsRequest,
  ListProjectsLocationsSecuritySettingsResponse,
  ListProjectsLocationsSecuritySettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
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

export const DeleteProjectsLocationsSecuritySettingsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v3/projects/{projectsId}/locations/{locationsId}/securitySettings/{securitySettingsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsSecuritySettingsRequest>;

export type DeleteProjectsLocationsSecuritySettingsResponse =
  GoogleProtobufEmpty;
export const DeleteProjectsLocationsSecuritySettingsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsLocationsSecuritySettingsError = DefaultErrors;

export const deleteProjectsLocationsSecuritySettings: API.OperationMethod<
  DeleteProjectsLocationsSecuritySettingsRequest,
  DeleteProjectsLocationsSecuritySettingsResponse,
  DeleteProjectsLocationsSecuritySettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsSecuritySettingsRequest,
  output: DeleteProjectsLocationsSecuritySettingsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsAgentsRequest>;

export type ListProjectsLocationsAgentsResponse =
  GoogleCloudDialogflowCxV3ListAgentsResponse;
export const ListProjectsLocationsAgentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3ListAgentsResponse;

export type ListProjectsLocationsAgentsError = DefaultErrors;

export const listProjectsLocationsAgents: API.PaginatedOperationMethod<
  ListProjectsLocationsAgentsRequest,
  ListProjectsLocationsAgentsResponse,
  ListProjectsLocationsAgentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
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

export const GetProjectsLocationsAgentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsAgentsRequest>;

export type GetProjectsLocationsAgentsResponse = GoogleCloudDialogflowCxV3Agent;
export const GetProjectsLocationsAgentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Agent;

export type GetProjectsLocationsAgentsError = DefaultErrors;

export const getProjectsLocationsAgents: API.OperationMethod<
  GetProjectsLocationsAgentsRequest,
  GetProjectsLocationsAgentsResponse,
  GetProjectsLocationsAgentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsAgentsRequest,
  output: GetProjectsLocationsAgentsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Agent;
}

export const CreateProjectsLocationsAgentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(GoogleCloudDialogflowCxV3Agent).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsAgentsRequest>;

export type CreateProjectsLocationsAgentsResponse =
  GoogleCloudDialogflowCxV3Agent;
export const CreateProjectsLocationsAgentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Agent;

export type CreateProjectsLocationsAgentsError = DefaultErrors;

export const createProjectsLocationsAgents: API.OperationMethod<
  CreateProjectsLocationsAgentsRequest,
  CreateProjectsLocationsAgentsResponse,
  CreateProjectsLocationsAgentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsAgentsRequest,
  output: CreateProjectsLocationsAgentsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Agent;
}

export const PatchProjectsLocationsAgentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GoogleCloudDialogflowCxV3Agent).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsAgentsRequest>;

export type PatchProjectsLocationsAgentsResponse =
  GoogleCloudDialogflowCxV3Agent;
export const PatchProjectsLocationsAgentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Agent;

export type PatchProjectsLocationsAgentsError = DefaultErrors;

export const patchProjectsLocationsAgents: API.OperationMethod<
  PatchProjectsLocationsAgentsRequest,
  PatchProjectsLocationsAgentsResponse,
  PatchProjectsLocationsAgentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsAgentsRequest,
  output: PatchProjectsLocationsAgentsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsRequest>;

export type DeleteProjectsLocationsAgentsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsError = DefaultErrors;

export const deleteProjectsLocationsAgents: API.OperationMethod<
  DeleteProjectsLocationsAgentsRequest,
  DeleteProjectsLocationsAgentsResponse,
  DeleteProjectsLocationsAgentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsAgentsRequest,
  output: DeleteProjectsLocationsAgentsResponse,
  errors: [],
}));

export interface ExportProjectsLocationsAgentsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3ExportAgentRequest;
}

export const ExportProjectsLocationsAgentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(GoogleCloudDialogflowCxV3ExportAgentRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}:export",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ExportProjectsLocationsAgentsRequest>;

export type ExportProjectsLocationsAgentsResponse = GoogleLongrunningOperation;
export const ExportProjectsLocationsAgentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type ExportProjectsLocationsAgentsError = DefaultErrors;

export const exportProjectsLocationsAgents: API.OperationMethod<
  ExportProjectsLocationsAgentsRequest,
  ExportProjectsLocationsAgentsResponse,
  ExportProjectsLocationsAgentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ExportProjectsLocationsAgentsRequest,
  output: ExportProjectsLocationsAgentsResponse,
  errors: [],
}));

export interface RestoreProjectsLocationsAgentsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3RestoreAgentRequest;
}

export const RestoreProjectsLocationsAgentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(GoogleCloudDialogflowCxV3RestoreAgentRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}:restore",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RestoreProjectsLocationsAgentsRequest>;

export type RestoreProjectsLocationsAgentsResponse = GoogleLongrunningOperation;
export const RestoreProjectsLocationsAgentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type RestoreProjectsLocationsAgentsError = DefaultErrors;

export const restoreProjectsLocationsAgents: API.OperationMethod<
  RestoreProjectsLocationsAgentsRequest,
  RestoreProjectsLocationsAgentsResponse,
  RestoreProjectsLocationsAgentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RestoreProjectsLocationsAgentsRequest,
  output: RestoreProjectsLocationsAgentsResponse,
  errors: [],
}));

export interface ValidateProjectsLocationsAgentsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3ValidateAgentRequest;
}

export const ValidateProjectsLocationsAgentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(GoogleCloudDialogflowCxV3ValidateAgentRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}:validate",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ValidateProjectsLocationsAgentsRequest>;

export type ValidateProjectsLocationsAgentsResponse =
  GoogleCloudDialogflowCxV3AgentValidationResult;
export const ValidateProjectsLocationsAgentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3AgentValidationResult;

export type ValidateProjectsLocationsAgentsError = DefaultErrors;

export const validateProjectsLocationsAgents: API.OperationMethod<
  ValidateProjectsLocationsAgentsRequest,
  ValidateProjectsLocationsAgentsResponse,
  ValidateProjectsLocationsAgentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ValidateProjectsLocationsAgentsRequest,
  output: ValidateProjectsLocationsAgentsResponse,
  errors: [],
}));

export interface GetValidationResultProjectsLocationsAgentsRequest {
  name: string;
  languageCode?: string;
}

export const GetValidationResultProjectsLocationsAgentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/validationResult",
    }),
    svc,
  ) as unknown as Schema.Schema<GetValidationResultProjectsLocationsAgentsRequest>;

export type GetValidationResultProjectsLocationsAgentsResponse =
  GoogleCloudDialogflowCxV3AgentValidationResult;
export const GetValidationResultProjectsLocationsAgentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3AgentValidationResult;

export type GetValidationResultProjectsLocationsAgentsError = DefaultErrors;

export const getValidationResultProjectsLocationsAgents: API.OperationMethod<
  GetValidationResultProjectsLocationsAgentsRequest,
  GetValidationResultProjectsLocationsAgentsResponse,
  GetValidationResultProjectsLocationsAgentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetValidationResultProjectsLocationsAgentsRequest,
  output: GetValidationResultProjectsLocationsAgentsResponse,
  errors: [],
}));

export interface GetGenerativeSettingsProjectsLocationsAgentsRequest {
  name: string;
  languageCode?: string;
}

export const GetGenerativeSettingsProjectsLocationsAgentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/generativeSettings",
    }),
    svc,
  ) as unknown as Schema.Schema<GetGenerativeSettingsProjectsLocationsAgentsRequest>;

export type GetGenerativeSettingsProjectsLocationsAgentsResponse =
  GoogleCloudDialogflowCxV3GenerativeSettings;
export const GetGenerativeSettingsProjectsLocationsAgentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3GenerativeSettings;

export type GetGenerativeSettingsProjectsLocationsAgentsError = DefaultErrors;

export const getGenerativeSettingsProjectsLocationsAgents: API.OperationMethod<
  GetGenerativeSettingsProjectsLocationsAgentsRequest,
  GetGenerativeSettingsProjectsLocationsAgentsResponse,
  GetGenerativeSettingsProjectsLocationsAgentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetGenerativeSettingsProjectsLocationsAgentsRequest,
  output: GetGenerativeSettingsProjectsLocationsAgentsResponse,
  errors: [],
}));

export interface UpdateGenerativeSettingsProjectsLocationsAgentsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3GenerativeSettings;
}

export const UpdateGenerativeSettingsProjectsLocationsAgentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GoogleCloudDialogflowCxV3GenerativeSettings).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/generativeSettings",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UpdateGenerativeSettingsProjectsLocationsAgentsRequest>;

export type UpdateGenerativeSettingsProjectsLocationsAgentsResponse =
  GoogleCloudDialogflowCxV3GenerativeSettings;
export const UpdateGenerativeSettingsProjectsLocationsAgentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3GenerativeSettings;

export type UpdateGenerativeSettingsProjectsLocationsAgentsError =
  DefaultErrors;

export const updateGenerativeSettingsProjectsLocationsAgents: API.OperationMethod<
  UpdateGenerativeSettingsProjectsLocationsAgentsRequest,
  UpdateGenerativeSettingsProjectsLocationsAgentsResponse,
  UpdateGenerativeSettingsProjectsLocationsAgentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateGenerativeSettingsProjectsLocationsAgentsRequest,
  output: UpdateGenerativeSettingsProjectsLocationsAgentsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsFlowsRequest {
  parent: string;
  languageCode?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Flow;
}

export const CreateProjectsLocationsAgentsFlowsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
    body: Schema.optional(GoogleCloudDialogflowCxV3Flow).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsAgentsFlowsRequest>;

export type CreateProjectsLocationsAgentsFlowsResponse =
  GoogleCloudDialogflowCxV3Flow;
export const CreateProjectsLocationsAgentsFlowsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Flow;

export type CreateProjectsLocationsAgentsFlowsError = DefaultErrors;

export const createProjectsLocationsAgentsFlows: API.OperationMethod<
  CreateProjectsLocationsAgentsFlowsRequest,
  CreateProjectsLocationsAgentsFlowsResponse,
  CreateProjectsLocationsAgentsFlowsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsAgentsFlowsRequest,
  output: CreateProjectsLocationsAgentsFlowsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsFlowsRequest {
  name: string;
  force?: boolean;
}

export const DeleteProjectsLocationsAgentsFlowsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsFlowsRequest>;

export type DeleteProjectsLocationsAgentsFlowsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsFlowsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsFlowsError = DefaultErrors;

export const deleteProjectsLocationsAgentsFlows: API.OperationMethod<
  DeleteProjectsLocationsAgentsFlowsRequest,
  DeleteProjectsLocationsAgentsFlowsResponse,
  DeleteProjectsLocationsAgentsFlowsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ListProjectsLocationsAgentsFlowsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsAgentsFlowsRequest>;

export type ListProjectsLocationsAgentsFlowsResponse =
  GoogleCloudDialogflowCxV3ListFlowsResponse;
export const ListProjectsLocationsAgentsFlowsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3ListFlowsResponse;

export type ListProjectsLocationsAgentsFlowsError = DefaultErrors;

export const listProjectsLocationsAgentsFlows: API.PaginatedOperationMethod<
  ListProjectsLocationsAgentsFlowsRequest,
  ListProjectsLocationsAgentsFlowsResponse,
  ListProjectsLocationsAgentsFlowsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
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

export const GetProjectsLocationsAgentsFlowsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsAgentsFlowsRequest>;

export type GetProjectsLocationsAgentsFlowsResponse =
  GoogleCloudDialogflowCxV3Flow;
export const GetProjectsLocationsAgentsFlowsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Flow;

export type GetProjectsLocationsAgentsFlowsError = DefaultErrors;

export const getProjectsLocationsAgentsFlows: API.OperationMethod<
  GetProjectsLocationsAgentsFlowsRequest,
  GetProjectsLocationsAgentsFlowsResponse,
  GetProjectsLocationsAgentsFlowsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsAgentsFlowsRequest,
  output: GetProjectsLocationsAgentsFlowsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsFlowsRequest {
  name: string;
  updateMask?: string;
  languageCode?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Flow;
}

export const PatchProjectsLocationsAgentsFlowsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
    body: Schema.optional(GoogleCloudDialogflowCxV3Flow).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsAgentsFlowsRequest>;

export type PatchProjectsLocationsAgentsFlowsResponse =
  GoogleCloudDialogflowCxV3Flow;
export const PatchProjectsLocationsAgentsFlowsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Flow;

export type PatchProjectsLocationsAgentsFlowsError = DefaultErrors;

export const patchProjectsLocationsAgentsFlows: API.OperationMethod<
  PatchProjectsLocationsAgentsFlowsRequest,
  PatchProjectsLocationsAgentsFlowsResponse,
  PatchProjectsLocationsAgentsFlowsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsAgentsFlowsRequest,
  output: PatchProjectsLocationsAgentsFlowsResponse,
  errors: [],
}));

export interface TrainProjectsLocationsAgentsFlowsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3TrainFlowRequest;
}

export const TrainProjectsLocationsAgentsFlowsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(GoogleCloudDialogflowCxV3TrainFlowRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}:train",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TrainProjectsLocationsAgentsFlowsRequest>;

export type TrainProjectsLocationsAgentsFlowsResponse =
  GoogleLongrunningOperation;
export const TrainProjectsLocationsAgentsFlowsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type TrainProjectsLocationsAgentsFlowsError = DefaultErrors;

export const trainProjectsLocationsAgentsFlows: API.OperationMethod<
  TrainProjectsLocationsAgentsFlowsRequest,
  TrainProjectsLocationsAgentsFlowsResponse,
  TrainProjectsLocationsAgentsFlowsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TrainProjectsLocationsAgentsFlowsRequest,
  output: TrainProjectsLocationsAgentsFlowsResponse,
  errors: [],
}));

export interface ValidateProjectsLocationsAgentsFlowsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3ValidateFlowRequest;
}

export const ValidateProjectsLocationsAgentsFlowsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(GoogleCloudDialogflowCxV3ValidateFlowRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}:validate",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ValidateProjectsLocationsAgentsFlowsRequest>;

export type ValidateProjectsLocationsAgentsFlowsResponse =
  GoogleCloudDialogflowCxV3FlowValidationResult;
export const ValidateProjectsLocationsAgentsFlowsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3FlowValidationResult;

export type ValidateProjectsLocationsAgentsFlowsError = DefaultErrors;

export const validateProjectsLocationsAgentsFlows: API.OperationMethod<
  ValidateProjectsLocationsAgentsFlowsRequest,
  ValidateProjectsLocationsAgentsFlowsResponse,
  ValidateProjectsLocationsAgentsFlowsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ValidateProjectsLocationsAgentsFlowsRequest,
  output: ValidateProjectsLocationsAgentsFlowsResponse,
  errors: [],
}));

export interface GetValidationResultProjectsLocationsAgentsFlowsRequest {
  name: string;
  languageCode?: string;
}

export const GetValidationResultProjectsLocationsAgentsFlowsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/validationResult",
    }),
    svc,
  ) as unknown as Schema.Schema<GetValidationResultProjectsLocationsAgentsFlowsRequest>;

export type GetValidationResultProjectsLocationsAgentsFlowsResponse =
  GoogleCloudDialogflowCxV3FlowValidationResult;
export const GetValidationResultProjectsLocationsAgentsFlowsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3FlowValidationResult;

export type GetValidationResultProjectsLocationsAgentsFlowsError =
  DefaultErrors;

export const getValidationResultProjectsLocationsAgentsFlows: API.OperationMethod<
  GetValidationResultProjectsLocationsAgentsFlowsRequest,
  GetValidationResultProjectsLocationsAgentsFlowsResponse,
  GetValidationResultProjectsLocationsAgentsFlowsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetValidationResultProjectsLocationsAgentsFlowsRequest,
  output: GetValidationResultProjectsLocationsAgentsFlowsResponse,
  errors: [],
}));

export interface ImportProjectsLocationsAgentsFlowsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3ImportFlowRequest;
}

export const ImportProjectsLocationsAgentsFlowsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(GoogleCloudDialogflowCxV3ImportFlowRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows:import",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ImportProjectsLocationsAgentsFlowsRequest>;

export type ImportProjectsLocationsAgentsFlowsResponse =
  GoogleLongrunningOperation;
export const ImportProjectsLocationsAgentsFlowsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type ImportProjectsLocationsAgentsFlowsError = DefaultErrors;

export const importProjectsLocationsAgentsFlows: API.OperationMethod<
  ImportProjectsLocationsAgentsFlowsRequest,
  ImportProjectsLocationsAgentsFlowsResponse,
  ImportProjectsLocationsAgentsFlowsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ImportProjectsLocationsAgentsFlowsRequest,
  output: ImportProjectsLocationsAgentsFlowsResponse,
  errors: [],
}));

export interface ExportProjectsLocationsAgentsFlowsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3ExportFlowRequest;
}

export const ExportProjectsLocationsAgentsFlowsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(GoogleCloudDialogflowCxV3ExportFlowRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}:export",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ExportProjectsLocationsAgentsFlowsRequest>;

export type ExportProjectsLocationsAgentsFlowsResponse =
  GoogleLongrunningOperation;
export const ExportProjectsLocationsAgentsFlowsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type ExportProjectsLocationsAgentsFlowsError = DefaultErrors;

export const exportProjectsLocationsAgentsFlows: API.OperationMethod<
  ExportProjectsLocationsAgentsFlowsRequest,
  ExportProjectsLocationsAgentsFlowsResponse,
  ExportProjectsLocationsAgentsFlowsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ListProjectsLocationsAgentsFlowsPagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/pages",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsAgentsFlowsPagesRequest>;

export type ListProjectsLocationsAgentsFlowsPagesResponse =
  GoogleCloudDialogflowCxV3ListPagesResponse;
export const ListProjectsLocationsAgentsFlowsPagesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3ListPagesResponse;

export type ListProjectsLocationsAgentsFlowsPagesError = DefaultErrors;

export const listProjectsLocationsAgentsFlowsPages: API.PaginatedOperationMethod<
  ListProjectsLocationsAgentsFlowsPagesRequest,
  ListProjectsLocationsAgentsFlowsPagesResponse,
  ListProjectsLocationsAgentsFlowsPagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
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

export const GetProjectsLocationsAgentsFlowsPagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/pages/{pagesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsAgentsFlowsPagesRequest>;

export type GetProjectsLocationsAgentsFlowsPagesResponse =
  GoogleCloudDialogflowCxV3Page;
export const GetProjectsLocationsAgentsFlowsPagesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Page;

export type GetProjectsLocationsAgentsFlowsPagesError = DefaultErrors;

export const getProjectsLocationsAgentsFlowsPages: API.OperationMethod<
  GetProjectsLocationsAgentsFlowsPagesRequest,
  GetProjectsLocationsAgentsFlowsPagesResponse,
  GetProjectsLocationsAgentsFlowsPagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsAgentsFlowsPagesRequest,
  output: GetProjectsLocationsAgentsFlowsPagesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsFlowsPagesRequest {
  parent: string;
  languageCode?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Page;
}

export const CreateProjectsLocationsAgentsFlowsPagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
    body: Schema.optional(GoogleCloudDialogflowCxV3Page).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/pages",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsAgentsFlowsPagesRequest>;

export type CreateProjectsLocationsAgentsFlowsPagesResponse =
  GoogleCloudDialogflowCxV3Page;
export const CreateProjectsLocationsAgentsFlowsPagesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Page;

export type CreateProjectsLocationsAgentsFlowsPagesError = DefaultErrors;

export const createProjectsLocationsAgentsFlowsPages: API.OperationMethod<
  CreateProjectsLocationsAgentsFlowsPagesRequest,
  CreateProjectsLocationsAgentsFlowsPagesResponse,
  CreateProjectsLocationsAgentsFlowsPagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsAgentsFlowsPagesRequest,
  output: CreateProjectsLocationsAgentsFlowsPagesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsFlowsPagesRequest {
  name: string;
  languageCode?: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Page;
}

export const PatchProjectsLocationsAgentsFlowsPagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GoogleCloudDialogflowCxV3Page).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/pages/{pagesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsAgentsFlowsPagesRequest>;

export type PatchProjectsLocationsAgentsFlowsPagesResponse =
  GoogleCloudDialogflowCxV3Page;
export const PatchProjectsLocationsAgentsFlowsPagesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Page;

export type PatchProjectsLocationsAgentsFlowsPagesError = DefaultErrors;

export const patchProjectsLocationsAgentsFlowsPages: API.OperationMethod<
  PatchProjectsLocationsAgentsFlowsPagesRequest,
  PatchProjectsLocationsAgentsFlowsPagesResponse,
  PatchProjectsLocationsAgentsFlowsPagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsAgentsFlowsPagesRequest,
  output: PatchProjectsLocationsAgentsFlowsPagesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsFlowsPagesRequest {
  name: string;
  force?: boolean;
}

export const DeleteProjectsLocationsAgentsFlowsPagesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/pages/{pagesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsFlowsPagesRequest>;

export type DeleteProjectsLocationsAgentsFlowsPagesResponse =
  GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsFlowsPagesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsFlowsPagesError = DefaultErrors;

export const deleteProjectsLocationsAgentsFlowsPages: API.OperationMethod<
  DeleteProjectsLocationsAgentsFlowsPagesRequest,
  DeleteProjectsLocationsAgentsFlowsPagesResponse,
  DeleteProjectsLocationsAgentsFlowsPagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ListProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/transitionRouteGroups",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest>;

export type ListProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse =
  GoogleCloudDialogflowCxV3ListTransitionRouteGroupsResponse;
export const ListProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3ListTransitionRouteGroupsResponse;

export type ListProjectsLocationsAgentsFlowsTransitionRouteGroupsError =
  DefaultErrors;

export const listProjectsLocationsAgentsFlowsTransitionRouteGroups: API.PaginatedOperationMethod<
  ListProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest,
  ListProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse,
  ListProjectsLocationsAgentsFlowsTransitionRouteGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
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

export const GetProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/transitionRouteGroups/{transitionRouteGroupsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest>;

export type GetProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse =
  GoogleCloudDialogflowCxV3TransitionRouteGroup;
export const GetProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3TransitionRouteGroup;

export type GetProjectsLocationsAgentsFlowsTransitionRouteGroupsError =
  DefaultErrors;

export const getProjectsLocationsAgentsFlowsTransitionRouteGroups: API.OperationMethod<
  GetProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest,
  GetProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse,
  GetProjectsLocationsAgentsFlowsTransitionRouteGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest,
  output: GetProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest {
  parent: string;
  languageCode?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3TransitionRouteGroup;
}

export const CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
    body: Schema.optional(GoogleCloudDialogflowCxV3TransitionRouteGroup).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/transitionRouteGroups",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest>;

export type CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse =
  GoogleCloudDialogflowCxV3TransitionRouteGroup;
export const CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3TransitionRouteGroup;

export type CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsError =
  DefaultErrors;

export const createProjectsLocationsAgentsFlowsTransitionRouteGroups: API.OperationMethod<
  CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest,
  CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse,
  CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest,
  output: CreateProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest {
  name: string;
  updateMask?: string;
  languageCode?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3TransitionRouteGroup;
}

export const PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
    body: Schema.optional(GoogleCloudDialogflowCxV3TransitionRouteGroup).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/transitionRouteGroups/{transitionRouteGroupsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest>;

export type PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse =
  GoogleCloudDialogflowCxV3TransitionRouteGroup;
export const PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3TransitionRouteGroup;

export type PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsError =
  DefaultErrors;

export const patchProjectsLocationsAgentsFlowsTransitionRouteGroups: API.OperationMethod<
  PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest,
  PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse,
  PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest,
  output: PatchProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest {
  name: string;
  force?: boolean;
}

export const DeleteProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/transitionRouteGroups/{transitionRouteGroupsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest>;

export type DeleteProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse =
  GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsFlowsTransitionRouteGroupsError =
  DefaultErrors;

export const deleteProjectsLocationsAgentsFlowsTransitionRouteGroups: API.OperationMethod<
  DeleteProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest,
  DeleteProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse,
  DeleteProjectsLocationsAgentsFlowsTransitionRouteGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsAgentsFlowsTransitionRouteGroupsRequest,
  output: DeleteProjectsLocationsAgentsFlowsTransitionRouteGroupsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsFlowsVersionsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsFlowsVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/versions",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsAgentsFlowsVersionsRequest>;

export type ListProjectsLocationsAgentsFlowsVersionsResponse =
  GoogleCloudDialogflowCxV3ListVersionsResponse;
export const ListProjectsLocationsAgentsFlowsVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3ListVersionsResponse;

export type ListProjectsLocationsAgentsFlowsVersionsError = DefaultErrors;

export const listProjectsLocationsAgentsFlowsVersions: API.PaginatedOperationMethod<
  ListProjectsLocationsAgentsFlowsVersionsRequest,
  ListProjectsLocationsAgentsFlowsVersionsResponse,
  ListProjectsLocationsAgentsFlowsVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
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

export const GetProjectsLocationsAgentsFlowsVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/versions/{versionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsAgentsFlowsVersionsRequest>;

export type GetProjectsLocationsAgentsFlowsVersionsResponse =
  GoogleCloudDialogflowCxV3Version;
export const GetProjectsLocationsAgentsFlowsVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Version;

export type GetProjectsLocationsAgentsFlowsVersionsError = DefaultErrors;

export const getProjectsLocationsAgentsFlowsVersions: API.OperationMethod<
  GetProjectsLocationsAgentsFlowsVersionsRequest,
  GetProjectsLocationsAgentsFlowsVersionsResponse,
  GetProjectsLocationsAgentsFlowsVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsAgentsFlowsVersionsRequest,
  output: GetProjectsLocationsAgentsFlowsVersionsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsFlowsVersionsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Version;
}

export const CreateProjectsLocationsAgentsFlowsVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(GoogleCloudDialogflowCxV3Version).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/versions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsAgentsFlowsVersionsRequest>;

export type CreateProjectsLocationsAgentsFlowsVersionsResponse =
  GoogleLongrunningOperation;
export const CreateProjectsLocationsAgentsFlowsVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type CreateProjectsLocationsAgentsFlowsVersionsError = DefaultErrors;

export const createProjectsLocationsAgentsFlowsVersions: API.OperationMethod<
  CreateProjectsLocationsAgentsFlowsVersionsRequest,
  CreateProjectsLocationsAgentsFlowsVersionsResponse,
  CreateProjectsLocationsAgentsFlowsVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsAgentsFlowsVersionsRequest,
  output: CreateProjectsLocationsAgentsFlowsVersionsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsFlowsVersionsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Version;
}

export const PatchProjectsLocationsAgentsFlowsVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GoogleCloudDialogflowCxV3Version).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/versions/{versionsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsAgentsFlowsVersionsRequest>;

export type PatchProjectsLocationsAgentsFlowsVersionsResponse =
  GoogleCloudDialogflowCxV3Version;
export const PatchProjectsLocationsAgentsFlowsVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Version;

export type PatchProjectsLocationsAgentsFlowsVersionsError = DefaultErrors;

export const patchProjectsLocationsAgentsFlowsVersions: API.OperationMethod<
  PatchProjectsLocationsAgentsFlowsVersionsRequest,
  PatchProjectsLocationsAgentsFlowsVersionsResponse,
  PatchProjectsLocationsAgentsFlowsVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsAgentsFlowsVersionsRequest,
  output: PatchProjectsLocationsAgentsFlowsVersionsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsFlowsVersionsRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentsFlowsVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/versions/{versionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsFlowsVersionsRequest>;

export type DeleteProjectsLocationsAgentsFlowsVersionsResponse =
  GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsFlowsVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsFlowsVersionsError = DefaultErrors;

export const deleteProjectsLocationsAgentsFlowsVersions: API.OperationMethod<
  DeleteProjectsLocationsAgentsFlowsVersionsRequest,
  DeleteProjectsLocationsAgentsFlowsVersionsResponse,
  DeleteProjectsLocationsAgentsFlowsVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsAgentsFlowsVersionsRequest,
  output: DeleteProjectsLocationsAgentsFlowsVersionsResponse,
  errors: [],
}));

export interface LoadProjectsLocationsAgentsFlowsVersionsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3LoadVersionRequest;
}

export const LoadProjectsLocationsAgentsFlowsVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(GoogleCloudDialogflowCxV3LoadVersionRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/versions/{versionsId}:load",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<LoadProjectsLocationsAgentsFlowsVersionsRequest>;

export type LoadProjectsLocationsAgentsFlowsVersionsResponse =
  GoogleLongrunningOperation;
export const LoadProjectsLocationsAgentsFlowsVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type LoadProjectsLocationsAgentsFlowsVersionsError = DefaultErrors;

export const loadProjectsLocationsAgentsFlowsVersions: API.OperationMethod<
  LoadProjectsLocationsAgentsFlowsVersionsRequest,
  LoadProjectsLocationsAgentsFlowsVersionsResponse,
  LoadProjectsLocationsAgentsFlowsVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: LoadProjectsLocationsAgentsFlowsVersionsRequest,
  output: LoadProjectsLocationsAgentsFlowsVersionsResponse,
  errors: [],
}));

export interface CompareVersionsProjectsLocationsAgentsFlowsVersionsRequest {
  baseVersion: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3CompareVersionsRequest;
}

export const CompareVersionsProjectsLocationsAgentsFlowsVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    baseVersion: Schema.String.pipe(T.HttpPath("baseVersion")),
    body: Schema.optional(GoogleCloudDialogflowCxV3CompareVersionsRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/flows/{flowsId}/versions/{versionsId}:compareVersions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CompareVersionsProjectsLocationsAgentsFlowsVersionsRequest>;

export type CompareVersionsProjectsLocationsAgentsFlowsVersionsResponse =
  GoogleCloudDialogflowCxV3CompareVersionsResponse;
export const CompareVersionsProjectsLocationsAgentsFlowsVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3CompareVersionsResponse;

export type CompareVersionsProjectsLocationsAgentsFlowsVersionsError =
  DefaultErrors;

export const compareVersionsProjectsLocationsAgentsFlowsVersions: API.OperationMethod<
  CompareVersionsProjectsLocationsAgentsFlowsVersionsRequest,
  CompareVersionsProjectsLocationsAgentsFlowsVersionsResponse,
  CompareVersionsProjectsLocationsAgentsFlowsVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ListProjectsLocationsAgentsChangelogsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/changelogs",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsAgentsChangelogsRequest>;

export type ListProjectsLocationsAgentsChangelogsResponse =
  GoogleCloudDialogflowCxV3ListChangelogsResponse;
export const ListProjectsLocationsAgentsChangelogsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3ListChangelogsResponse;

export type ListProjectsLocationsAgentsChangelogsError = DefaultErrors;

export const listProjectsLocationsAgentsChangelogs: API.PaginatedOperationMethod<
  ListProjectsLocationsAgentsChangelogsRequest,
  ListProjectsLocationsAgentsChangelogsResponse,
  ListProjectsLocationsAgentsChangelogsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
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

export const GetProjectsLocationsAgentsChangelogsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/changelogs/{changelogsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsAgentsChangelogsRequest>;

export type GetProjectsLocationsAgentsChangelogsResponse =
  GoogleCloudDialogflowCxV3Changelog;
export const GetProjectsLocationsAgentsChangelogsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Changelog;

export type GetProjectsLocationsAgentsChangelogsError = DefaultErrors;

export const getProjectsLocationsAgentsChangelogs: API.OperationMethod<
  GetProjectsLocationsAgentsChangelogsRequest,
  GetProjectsLocationsAgentsChangelogsResponse,
  GetProjectsLocationsAgentsChangelogsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsAgentsChangelogsRequest,
  output: GetProjectsLocationsAgentsChangelogsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAgentsEntityTypesRequest {
  name: string;
  languageCode?: string;
}

export const GetProjectsLocationsAgentsEntityTypesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/entityTypes/{entityTypesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsAgentsEntityTypesRequest>;

export type GetProjectsLocationsAgentsEntityTypesResponse =
  GoogleCloudDialogflowCxV3EntityType;
export const GetProjectsLocationsAgentsEntityTypesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3EntityType;

export type GetProjectsLocationsAgentsEntityTypesError = DefaultErrors;

export const getProjectsLocationsAgentsEntityTypes: API.OperationMethod<
  GetProjectsLocationsAgentsEntityTypesRequest,
  GetProjectsLocationsAgentsEntityTypesResponse,
  GetProjectsLocationsAgentsEntityTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsAgentsEntityTypesRequest,
  output: GetProjectsLocationsAgentsEntityTypesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsEntityTypesRequest {
  parent: string;
  languageCode?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3EntityType;
}

export const CreateProjectsLocationsAgentsEntityTypesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
    body: Schema.optional(GoogleCloudDialogflowCxV3EntityType).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/entityTypes",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsAgentsEntityTypesRequest>;

export type CreateProjectsLocationsAgentsEntityTypesResponse =
  GoogleCloudDialogflowCxV3EntityType;
export const CreateProjectsLocationsAgentsEntityTypesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3EntityType;

export type CreateProjectsLocationsAgentsEntityTypesError = DefaultErrors;

export const createProjectsLocationsAgentsEntityTypes: API.OperationMethod<
  CreateProjectsLocationsAgentsEntityTypesRequest,
  CreateProjectsLocationsAgentsEntityTypesResponse,
  CreateProjectsLocationsAgentsEntityTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsAgentsEntityTypesRequest,
  output: CreateProjectsLocationsAgentsEntityTypesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsEntityTypesRequest {
  name: string;
  languageCode?: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3EntityType;
}

export const PatchProjectsLocationsAgentsEntityTypesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GoogleCloudDialogflowCxV3EntityType).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/entityTypes/{entityTypesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsAgentsEntityTypesRequest>;

export type PatchProjectsLocationsAgentsEntityTypesResponse =
  GoogleCloudDialogflowCxV3EntityType;
export const PatchProjectsLocationsAgentsEntityTypesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3EntityType;

export type PatchProjectsLocationsAgentsEntityTypesError = DefaultErrors;

export const patchProjectsLocationsAgentsEntityTypes: API.OperationMethod<
  PatchProjectsLocationsAgentsEntityTypesRequest,
  PatchProjectsLocationsAgentsEntityTypesResponse,
  PatchProjectsLocationsAgentsEntityTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsAgentsEntityTypesRequest,
  output: PatchProjectsLocationsAgentsEntityTypesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsEntityTypesRequest {
  name: string;
  force?: boolean;
}

export const DeleteProjectsLocationsAgentsEntityTypesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/entityTypes/{entityTypesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsEntityTypesRequest>;

export type DeleteProjectsLocationsAgentsEntityTypesResponse =
  GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsEntityTypesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsEntityTypesError = DefaultErrors;

export const deleteProjectsLocationsAgentsEntityTypes: API.OperationMethod<
  DeleteProjectsLocationsAgentsEntityTypesRequest,
  DeleteProjectsLocationsAgentsEntityTypesResponse,
  DeleteProjectsLocationsAgentsEntityTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ListProjectsLocationsAgentsEntityTypesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/entityTypes",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsAgentsEntityTypesRequest>;

export type ListProjectsLocationsAgentsEntityTypesResponse =
  GoogleCloudDialogflowCxV3ListEntityTypesResponse;
export const ListProjectsLocationsAgentsEntityTypesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3ListEntityTypesResponse;

export type ListProjectsLocationsAgentsEntityTypesError = DefaultErrors;

export const listProjectsLocationsAgentsEntityTypes: API.PaginatedOperationMethod<
  ListProjectsLocationsAgentsEntityTypesRequest,
  ListProjectsLocationsAgentsEntityTypesResponse,
  ListProjectsLocationsAgentsEntityTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
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
  body?: GoogleCloudDialogflowCxV3ExportEntityTypesRequest;
}

export const ExportProjectsLocationsAgentsEntityTypesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(
      GoogleCloudDialogflowCxV3ExportEntityTypesRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/entityTypes:export",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ExportProjectsLocationsAgentsEntityTypesRequest>;

export type ExportProjectsLocationsAgentsEntityTypesResponse =
  GoogleLongrunningOperation;
export const ExportProjectsLocationsAgentsEntityTypesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type ExportProjectsLocationsAgentsEntityTypesError = DefaultErrors;

export const exportProjectsLocationsAgentsEntityTypes: API.OperationMethod<
  ExportProjectsLocationsAgentsEntityTypesRequest,
  ExportProjectsLocationsAgentsEntityTypesResponse,
  ExportProjectsLocationsAgentsEntityTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ExportProjectsLocationsAgentsEntityTypesRequest,
  output: ExportProjectsLocationsAgentsEntityTypesResponse,
  errors: [],
}));

export interface ImportProjectsLocationsAgentsEntityTypesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3ImportEntityTypesRequest;
}

export const ImportProjectsLocationsAgentsEntityTypesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(
      GoogleCloudDialogflowCxV3ImportEntityTypesRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/entityTypes:import",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ImportProjectsLocationsAgentsEntityTypesRequest>;

export type ImportProjectsLocationsAgentsEntityTypesResponse =
  GoogleLongrunningOperation;
export const ImportProjectsLocationsAgentsEntityTypesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type ImportProjectsLocationsAgentsEntityTypesError = DefaultErrors;

export const importProjectsLocationsAgentsEntityTypes: API.OperationMethod<
  ImportProjectsLocationsAgentsEntityTypesRequest,
  ImportProjectsLocationsAgentsEntityTypesResponse,
  ImportProjectsLocationsAgentsEntityTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ImportProjectsLocationsAgentsEntityTypesRequest,
  output: ImportProjectsLocationsAgentsEntityTypesResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsIntentsRequest {
  parent: string;
  languageCode?: string;
  intentView?:
    | "INTENT_VIEW_UNSPECIFIED"
    | "INTENT_VIEW_PARTIAL"
    | "INTENT_VIEW_FULL"
    | (string & {});
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsIntentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
    intentView: Schema.optional(Schema.String).pipe(T.HttpQuery("intentView")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/intents",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsAgentsIntentsRequest>;

export type ListProjectsLocationsAgentsIntentsResponse =
  GoogleCloudDialogflowCxV3ListIntentsResponse;
export const ListProjectsLocationsAgentsIntentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3ListIntentsResponse;

export type ListProjectsLocationsAgentsIntentsError = DefaultErrors;

export const listProjectsLocationsAgentsIntents: API.PaginatedOperationMethod<
  ListProjectsLocationsAgentsIntentsRequest,
  ListProjectsLocationsAgentsIntentsResponse,
  ListProjectsLocationsAgentsIntentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
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

export const GetProjectsLocationsAgentsIntentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/intents/{intentsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsAgentsIntentsRequest>;

export type GetProjectsLocationsAgentsIntentsResponse =
  GoogleCloudDialogflowCxV3Intent;
export const GetProjectsLocationsAgentsIntentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Intent;

export type GetProjectsLocationsAgentsIntentsError = DefaultErrors;

export const getProjectsLocationsAgentsIntents: API.OperationMethod<
  GetProjectsLocationsAgentsIntentsRequest,
  GetProjectsLocationsAgentsIntentsResponse,
  GetProjectsLocationsAgentsIntentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsAgentsIntentsRequest,
  output: GetProjectsLocationsAgentsIntentsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsIntentsRequest {
  parent: string;
  languageCode?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Intent;
}

export const CreateProjectsLocationsAgentsIntentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
    body: Schema.optional(GoogleCloudDialogflowCxV3Intent).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/intents",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsAgentsIntentsRequest>;

export type CreateProjectsLocationsAgentsIntentsResponse =
  GoogleCloudDialogflowCxV3Intent;
export const CreateProjectsLocationsAgentsIntentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Intent;

export type CreateProjectsLocationsAgentsIntentsError = DefaultErrors;

export const createProjectsLocationsAgentsIntents: API.OperationMethod<
  CreateProjectsLocationsAgentsIntentsRequest,
  CreateProjectsLocationsAgentsIntentsResponse,
  CreateProjectsLocationsAgentsIntentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsAgentsIntentsRequest,
  output: CreateProjectsLocationsAgentsIntentsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsIntentsRequest {
  name: string;
  languageCode?: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Intent;
}

export const PatchProjectsLocationsAgentsIntentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GoogleCloudDialogflowCxV3Intent).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/intents/{intentsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsAgentsIntentsRequest>;

export type PatchProjectsLocationsAgentsIntentsResponse =
  GoogleCloudDialogflowCxV3Intent;
export const PatchProjectsLocationsAgentsIntentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Intent;

export type PatchProjectsLocationsAgentsIntentsError = DefaultErrors;

export const patchProjectsLocationsAgentsIntents: API.OperationMethod<
  PatchProjectsLocationsAgentsIntentsRequest,
  PatchProjectsLocationsAgentsIntentsResponse,
  PatchProjectsLocationsAgentsIntentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsAgentsIntentsRequest,
  output: PatchProjectsLocationsAgentsIntentsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsIntentsRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentsIntentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/intents/{intentsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsIntentsRequest>;

export type DeleteProjectsLocationsAgentsIntentsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsIntentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsIntentsError = DefaultErrors;

export const deleteProjectsLocationsAgentsIntents: API.OperationMethod<
  DeleteProjectsLocationsAgentsIntentsRequest,
  DeleteProjectsLocationsAgentsIntentsResponse,
  DeleteProjectsLocationsAgentsIntentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsAgentsIntentsRequest,
  output: DeleteProjectsLocationsAgentsIntentsResponse,
  errors: [],
}));

export interface ImportProjectsLocationsAgentsIntentsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3ImportIntentsRequest;
}

export const ImportProjectsLocationsAgentsIntentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(GoogleCloudDialogflowCxV3ImportIntentsRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/intents:import",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ImportProjectsLocationsAgentsIntentsRequest>;

export type ImportProjectsLocationsAgentsIntentsResponse =
  GoogleLongrunningOperation;
export const ImportProjectsLocationsAgentsIntentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type ImportProjectsLocationsAgentsIntentsError = DefaultErrors;

export const importProjectsLocationsAgentsIntents: API.OperationMethod<
  ImportProjectsLocationsAgentsIntentsRequest,
  ImportProjectsLocationsAgentsIntentsResponse,
  ImportProjectsLocationsAgentsIntentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ImportProjectsLocationsAgentsIntentsRequest,
  output: ImportProjectsLocationsAgentsIntentsResponse,
  errors: [],
}));

export interface ExportProjectsLocationsAgentsIntentsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3ExportIntentsRequest;
}

export const ExportProjectsLocationsAgentsIntentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(GoogleCloudDialogflowCxV3ExportIntentsRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/intents:export",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ExportProjectsLocationsAgentsIntentsRequest>;

export type ExportProjectsLocationsAgentsIntentsResponse =
  GoogleLongrunningOperation;
export const ExportProjectsLocationsAgentsIntentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type ExportProjectsLocationsAgentsIntentsError = DefaultErrors;

export const exportProjectsLocationsAgentsIntents: API.OperationMethod<
  ExportProjectsLocationsAgentsIntentsRequest,
  ExportProjectsLocationsAgentsIntentsResponse,
  ExportProjectsLocationsAgentsIntentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ExportProjectsLocationsAgentsIntentsRequest,
  output: ExportProjectsLocationsAgentsIntentsResponse,
  errors: [],
}));

export interface DetectIntentProjectsLocationsAgentsSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3DetectIntentRequest;
}

export const DetectIntentProjectsLocationsAgentsSessionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    session: Schema.String.pipe(T.HttpPath("session")),
    body: Schema.optional(GoogleCloudDialogflowCxV3DetectIntentRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}:detectIntent",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<DetectIntentProjectsLocationsAgentsSessionsRequest>;

export type DetectIntentProjectsLocationsAgentsSessionsResponse =
  GoogleCloudDialogflowCxV3DetectIntentResponse;
export const DetectIntentProjectsLocationsAgentsSessionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3DetectIntentResponse;

export type DetectIntentProjectsLocationsAgentsSessionsError = DefaultErrors;

export const detectIntentProjectsLocationsAgentsSessions: API.OperationMethod<
  DetectIntentProjectsLocationsAgentsSessionsRequest,
  DetectIntentProjectsLocationsAgentsSessionsResponse,
  DetectIntentProjectsLocationsAgentsSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DetectIntentProjectsLocationsAgentsSessionsRequest,
  output: DetectIntentProjectsLocationsAgentsSessionsResponse,
  errors: [],
}));

export interface ServerStreamingDetectIntentProjectsLocationsAgentsSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3DetectIntentRequest;
}

export const ServerStreamingDetectIntentProjectsLocationsAgentsSessionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    session: Schema.String.pipe(T.HttpPath("session")),
    body: Schema.optional(GoogleCloudDialogflowCxV3DetectIntentRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}:serverStreamingDetectIntent",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ServerStreamingDetectIntentProjectsLocationsAgentsSessionsRequest>;

export type ServerStreamingDetectIntentProjectsLocationsAgentsSessionsResponse =
  GoogleCloudDialogflowCxV3DetectIntentResponse;
export const ServerStreamingDetectIntentProjectsLocationsAgentsSessionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3DetectIntentResponse;

export type ServerStreamingDetectIntentProjectsLocationsAgentsSessionsError =
  DefaultErrors;

export const serverStreamingDetectIntentProjectsLocationsAgentsSessions: API.OperationMethod<
  ServerStreamingDetectIntentProjectsLocationsAgentsSessionsRequest,
  ServerStreamingDetectIntentProjectsLocationsAgentsSessionsResponse,
  ServerStreamingDetectIntentProjectsLocationsAgentsSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ServerStreamingDetectIntentProjectsLocationsAgentsSessionsRequest,
  output: ServerStreamingDetectIntentProjectsLocationsAgentsSessionsResponse,
  errors: [],
}));

export interface MatchIntentProjectsLocationsAgentsSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3MatchIntentRequest;
}

export const MatchIntentProjectsLocationsAgentsSessionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    session: Schema.String.pipe(T.HttpPath("session")),
    body: Schema.optional(GoogleCloudDialogflowCxV3MatchIntentRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}:matchIntent",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<MatchIntentProjectsLocationsAgentsSessionsRequest>;

export type MatchIntentProjectsLocationsAgentsSessionsResponse =
  GoogleCloudDialogflowCxV3MatchIntentResponse;
export const MatchIntentProjectsLocationsAgentsSessionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3MatchIntentResponse;

export type MatchIntentProjectsLocationsAgentsSessionsError = DefaultErrors;

export const matchIntentProjectsLocationsAgentsSessions: API.OperationMethod<
  MatchIntentProjectsLocationsAgentsSessionsRequest,
  MatchIntentProjectsLocationsAgentsSessionsResponse,
  MatchIntentProjectsLocationsAgentsSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: MatchIntentProjectsLocationsAgentsSessionsRequest,
  output: MatchIntentProjectsLocationsAgentsSessionsResponse,
  errors: [],
}));

export interface FulfillIntentProjectsLocationsAgentsSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3FulfillIntentRequest;
}

export const FulfillIntentProjectsLocationsAgentsSessionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    session: Schema.String.pipe(T.HttpPath("session")),
    body: Schema.optional(GoogleCloudDialogflowCxV3FulfillIntentRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}:fulfillIntent",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<FulfillIntentProjectsLocationsAgentsSessionsRequest>;

export type FulfillIntentProjectsLocationsAgentsSessionsResponse =
  GoogleCloudDialogflowCxV3FulfillIntentResponse;
export const FulfillIntentProjectsLocationsAgentsSessionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3FulfillIntentResponse;

export type FulfillIntentProjectsLocationsAgentsSessionsError = DefaultErrors;

export const fulfillIntentProjectsLocationsAgentsSessions: API.OperationMethod<
  FulfillIntentProjectsLocationsAgentsSessionsRequest,
  FulfillIntentProjectsLocationsAgentsSessionsResponse,
  FulfillIntentProjectsLocationsAgentsSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: FulfillIntentProjectsLocationsAgentsSessionsRequest,
  output: FulfillIntentProjectsLocationsAgentsSessionsResponse,
  errors: [],
}));

export interface SubmitAnswerFeedbackProjectsLocationsAgentsSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3SubmitAnswerFeedbackRequest;
}

export const SubmitAnswerFeedbackProjectsLocationsAgentsSessionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    session: Schema.String.pipe(T.HttpPath("session")),
    body: Schema.optional(
      GoogleCloudDialogflowCxV3SubmitAnswerFeedbackRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}:submitAnswerFeedback",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SubmitAnswerFeedbackProjectsLocationsAgentsSessionsRequest>;

export type SubmitAnswerFeedbackProjectsLocationsAgentsSessionsResponse =
  GoogleCloudDialogflowCxV3AnswerFeedback;
export const SubmitAnswerFeedbackProjectsLocationsAgentsSessionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3AnswerFeedback;

export type SubmitAnswerFeedbackProjectsLocationsAgentsSessionsError =
  DefaultErrors;

export const submitAnswerFeedbackProjectsLocationsAgentsSessions: API.OperationMethod<
  SubmitAnswerFeedbackProjectsLocationsAgentsSessionsRequest,
  SubmitAnswerFeedbackProjectsLocationsAgentsSessionsResponse,
  SubmitAnswerFeedbackProjectsLocationsAgentsSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SubmitAnswerFeedbackProjectsLocationsAgentsSessionsRequest,
  output: SubmitAnswerFeedbackProjectsLocationsAgentsSessionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsSessionsEntityTypesRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsSessionsEntityTypesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}/entityTypes",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsAgentsSessionsEntityTypesRequest>;

export type ListProjectsLocationsAgentsSessionsEntityTypesResponse =
  GoogleCloudDialogflowCxV3ListSessionEntityTypesResponse;
export const ListProjectsLocationsAgentsSessionsEntityTypesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3ListSessionEntityTypesResponse;

export type ListProjectsLocationsAgentsSessionsEntityTypesError = DefaultErrors;

export const listProjectsLocationsAgentsSessionsEntityTypes: API.PaginatedOperationMethod<
  ListProjectsLocationsAgentsSessionsEntityTypesRequest,
  ListProjectsLocationsAgentsSessionsEntityTypesResponse,
  ListProjectsLocationsAgentsSessionsEntityTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
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

export const GetProjectsLocationsAgentsSessionsEntityTypesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}/entityTypes/{entityTypesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsAgentsSessionsEntityTypesRequest>;

export type GetProjectsLocationsAgentsSessionsEntityTypesResponse =
  GoogleCloudDialogflowCxV3SessionEntityType;
export const GetProjectsLocationsAgentsSessionsEntityTypesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3SessionEntityType;

export type GetProjectsLocationsAgentsSessionsEntityTypesError = DefaultErrors;

export const getProjectsLocationsAgentsSessionsEntityTypes: API.OperationMethod<
  GetProjectsLocationsAgentsSessionsEntityTypesRequest,
  GetProjectsLocationsAgentsSessionsEntityTypesResponse,
  GetProjectsLocationsAgentsSessionsEntityTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsAgentsSessionsEntityTypesRequest,
  output: GetProjectsLocationsAgentsSessionsEntityTypesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsSessionsEntityTypesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3SessionEntityType;
}

export const CreateProjectsLocationsAgentsSessionsEntityTypesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(GoogleCloudDialogflowCxV3SessionEntityType).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}/entityTypes",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsAgentsSessionsEntityTypesRequest>;

export type CreateProjectsLocationsAgentsSessionsEntityTypesResponse =
  GoogleCloudDialogflowCxV3SessionEntityType;
export const CreateProjectsLocationsAgentsSessionsEntityTypesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3SessionEntityType;

export type CreateProjectsLocationsAgentsSessionsEntityTypesError =
  DefaultErrors;

export const createProjectsLocationsAgentsSessionsEntityTypes: API.OperationMethod<
  CreateProjectsLocationsAgentsSessionsEntityTypesRequest,
  CreateProjectsLocationsAgentsSessionsEntityTypesResponse,
  CreateProjectsLocationsAgentsSessionsEntityTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const PatchProjectsLocationsAgentsSessionsEntityTypesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GoogleCloudDialogflowCxV3SessionEntityType).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}/entityTypes/{entityTypesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsAgentsSessionsEntityTypesRequest>;

export type PatchProjectsLocationsAgentsSessionsEntityTypesResponse =
  GoogleCloudDialogflowCxV3SessionEntityType;
export const PatchProjectsLocationsAgentsSessionsEntityTypesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3SessionEntityType;

export type PatchProjectsLocationsAgentsSessionsEntityTypesError =
  DefaultErrors;

export const patchProjectsLocationsAgentsSessionsEntityTypes: API.OperationMethod<
  PatchProjectsLocationsAgentsSessionsEntityTypesRequest,
  PatchProjectsLocationsAgentsSessionsEntityTypesResponse,
  PatchProjectsLocationsAgentsSessionsEntityTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsAgentsSessionsEntityTypesRequest,
  output: PatchProjectsLocationsAgentsSessionsEntityTypesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsSessionsEntityTypesRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentsSessionsEntityTypesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/sessions/{sessionsId}/entityTypes/{entityTypesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsSessionsEntityTypesRequest>;

export type DeleteProjectsLocationsAgentsSessionsEntityTypesResponse =
  GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsSessionsEntityTypesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsSessionsEntityTypesError =
  DefaultErrors;

export const deleteProjectsLocationsAgentsSessionsEntityTypes: API.OperationMethod<
  DeleteProjectsLocationsAgentsSessionsEntityTypesRequest,
  DeleteProjectsLocationsAgentsSessionsEntityTypesResponse,
  DeleteProjectsLocationsAgentsSessionsEntityTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ListProjectsLocationsAgentsTransitionRouteGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/transitionRouteGroups",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsAgentsTransitionRouteGroupsRequest>;

export type ListProjectsLocationsAgentsTransitionRouteGroupsResponse =
  GoogleCloudDialogflowCxV3ListTransitionRouteGroupsResponse;
export const ListProjectsLocationsAgentsTransitionRouteGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3ListTransitionRouteGroupsResponse;

export type ListProjectsLocationsAgentsTransitionRouteGroupsError =
  DefaultErrors;

export const listProjectsLocationsAgentsTransitionRouteGroups: API.PaginatedOperationMethod<
  ListProjectsLocationsAgentsTransitionRouteGroupsRequest,
  ListProjectsLocationsAgentsTransitionRouteGroupsResponse,
  ListProjectsLocationsAgentsTransitionRouteGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
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

export const GetProjectsLocationsAgentsTransitionRouteGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/transitionRouteGroups/{transitionRouteGroupsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsAgentsTransitionRouteGroupsRequest>;

export type GetProjectsLocationsAgentsTransitionRouteGroupsResponse =
  GoogleCloudDialogflowCxV3TransitionRouteGroup;
export const GetProjectsLocationsAgentsTransitionRouteGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3TransitionRouteGroup;

export type GetProjectsLocationsAgentsTransitionRouteGroupsError =
  DefaultErrors;

export const getProjectsLocationsAgentsTransitionRouteGroups: API.OperationMethod<
  GetProjectsLocationsAgentsTransitionRouteGroupsRequest,
  GetProjectsLocationsAgentsTransitionRouteGroupsResponse,
  GetProjectsLocationsAgentsTransitionRouteGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsAgentsTransitionRouteGroupsRequest,
  output: GetProjectsLocationsAgentsTransitionRouteGroupsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsTransitionRouteGroupsRequest {
  parent: string;
  languageCode?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3TransitionRouteGroup;
}

export const CreateProjectsLocationsAgentsTransitionRouteGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
    body: Schema.optional(GoogleCloudDialogflowCxV3TransitionRouteGroup).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/transitionRouteGroups",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsAgentsTransitionRouteGroupsRequest>;

export type CreateProjectsLocationsAgentsTransitionRouteGroupsResponse =
  GoogleCloudDialogflowCxV3TransitionRouteGroup;
export const CreateProjectsLocationsAgentsTransitionRouteGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3TransitionRouteGroup;

export type CreateProjectsLocationsAgentsTransitionRouteGroupsError =
  DefaultErrors;

export const createProjectsLocationsAgentsTransitionRouteGroups: API.OperationMethod<
  CreateProjectsLocationsAgentsTransitionRouteGroupsRequest,
  CreateProjectsLocationsAgentsTransitionRouteGroupsResponse,
  CreateProjectsLocationsAgentsTransitionRouteGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsAgentsTransitionRouteGroupsRequest,
  output: CreateProjectsLocationsAgentsTransitionRouteGroupsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsTransitionRouteGroupsRequest {
  name: string;
  updateMask?: string;
  languageCode?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3TransitionRouteGroup;
}

export const PatchProjectsLocationsAgentsTransitionRouteGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
    body: Schema.optional(GoogleCloudDialogflowCxV3TransitionRouteGroup).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/transitionRouteGroups/{transitionRouteGroupsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsAgentsTransitionRouteGroupsRequest>;

export type PatchProjectsLocationsAgentsTransitionRouteGroupsResponse =
  GoogleCloudDialogflowCxV3TransitionRouteGroup;
export const PatchProjectsLocationsAgentsTransitionRouteGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3TransitionRouteGroup;

export type PatchProjectsLocationsAgentsTransitionRouteGroupsError =
  DefaultErrors;

export const patchProjectsLocationsAgentsTransitionRouteGroups: API.OperationMethod<
  PatchProjectsLocationsAgentsTransitionRouteGroupsRequest,
  PatchProjectsLocationsAgentsTransitionRouteGroupsResponse,
  PatchProjectsLocationsAgentsTransitionRouteGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsAgentsTransitionRouteGroupsRequest,
  output: PatchProjectsLocationsAgentsTransitionRouteGroupsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsTransitionRouteGroupsRequest {
  name: string;
  force?: boolean;
}

export const DeleteProjectsLocationsAgentsTransitionRouteGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/transitionRouteGroups/{transitionRouteGroupsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsTransitionRouteGroupsRequest>;

export type DeleteProjectsLocationsAgentsTransitionRouteGroupsResponse =
  GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsTransitionRouteGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsTransitionRouteGroupsError =
  DefaultErrors;

export const deleteProjectsLocationsAgentsTransitionRouteGroups: API.OperationMethod<
  DeleteProjectsLocationsAgentsTransitionRouteGroupsRequest,
  DeleteProjectsLocationsAgentsTransitionRouteGroupsResponse,
  DeleteProjectsLocationsAgentsTransitionRouteGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ListProjectsLocationsAgentsTestCasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsAgentsTestCasesRequest>;

export type ListProjectsLocationsAgentsTestCasesResponse =
  GoogleCloudDialogflowCxV3ListTestCasesResponse;
export const ListProjectsLocationsAgentsTestCasesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3ListTestCasesResponse;

export type ListProjectsLocationsAgentsTestCasesError = DefaultErrors;

export const listProjectsLocationsAgentsTestCases: API.PaginatedOperationMethod<
  ListProjectsLocationsAgentsTestCasesRequest,
  ListProjectsLocationsAgentsTestCasesResponse,
  ListProjectsLocationsAgentsTestCasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
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
  body?: GoogleCloudDialogflowCxV3BatchDeleteTestCasesRequest;
}

export const BatchDeleteProjectsLocationsAgentsTestCasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(
      GoogleCloudDialogflowCxV3BatchDeleteTestCasesRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases:batchDelete",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BatchDeleteProjectsLocationsAgentsTestCasesRequest>;

export type BatchDeleteProjectsLocationsAgentsTestCasesResponse =
  GoogleProtobufEmpty;
export const BatchDeleteProjectsLocationsAgentsTestCasesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type BatchDeleteProjectsLocationsAgentsTestCasesError = DefaultErrors;

export const batchDeleteProjectsLocationsAgentsTestCases: API.OperationMethod<
  BatchDeleteProjectsLocationsAgentsTestCasesRequest,
  BatchDeleteProjectsLocationsAgentsTestCasesResponse,
  BatchDeleteProjectsLocationsAgentsTestCasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchDeleteProjectsLocationsAgentsTestCasesRequest,
  output: BatchDeleteProjectsLocationsAgentsTestCasesResponse,
  errors: [],
}));

export interface GetProjectsLocationsAgentsTestCasesRequest {
  name: string;
}

export const GetProjectsLocationsAgentsTestCasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases/{testCasesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsAgentsTestCasesRequest>;

export type GetProjectsLocationsAgentsTestCasesResponse =
  GoogleCloudDialogflowCxV3TestCase;
export const GetProjectsLocationsAgentsTestCasesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3TestCase;

export type GetProjectsLocationsAgentsTestCasesError = DefaultErrors;

export const getProjectsLocationsAgentsTestCases: API.OperationMethod<
  GetProjectsLocationsAgentsTestCasesRequest,
  GetProjectsLocationsAgentsTestCasesResponse,
  GetProjectsLocationsAgentsTestCasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsAgentsTestCasesRequest,
  output: GetProjectsLocationsAgentsTestCasesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsTestCasesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3TestCase;
}

export const CreateProjectsLocationsAgentsTestCasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(GoogleCloudDialogflowCxV3TestCase).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsAgentsTestCasesRequest>;

export type CreateProjectsLocationsAgentsTestCasesResponse =
  GoogleCloudDialogflowCxV3TestCase;
export const CreateProjectsLocationsAgentsTestCasesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3TestCase;

export type CreateProjectsLocationsAgentsTestCasesError = DefaultErrors;

export const createProjectsLocationsAgentsTestCases: API.OperationMethod<
  CreateProjectsLocationsAgentsTestCasesRequest,
  CreateProjectsLocationsAgentsTestCasesResponse,
  CreateProjectsLocationsAgentsTestCasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsAgentsTestCasesRequest,
  output: CreateProjectsLocationsAgentsTestCasesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsTestCasesRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3TestCase;
}

export const PatchProjectsLocationsAgentsTestCasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GoogleCloudDialogflowCxV3TestCase).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases/{testCasesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsAgentsTestCasesRequest>;

export type PatchProjectsLocationsAgentsTestCasesResponse =
  GoogleCloudDialogflowCxV3TestCase;
export const PatchProjectsLocationsAgentsTestCasesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3TestCase;

export type PatchProjectsLocationsAgentsTestCasesError = DefaultErrors;

export const patchProjectsLocationsAgentsTestCases: API.OperationMethod<
  PatchProjectsLocationsAgentsTestCasesRequest,
  PatchProjectsLocationsAgentsTestCasesResponse,
  PatchProjectsLocationsAgentsTestCasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsAgentsTestCasesRequest,
  output: PatchProjectsLocationsAgentsTestCasesResponse,
  errors: [],
}));

export interface RunProjectsLocationsAgentsTestCasesRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3RunTestCaseRequest;
}

export const RunProjectsLocationsAgentsTestCasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(GoogleCloudDialogflowCxV3RunTestCaseRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases/{testCasesId}:run",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RunProjectsLocationsAgentsTestCasesRequest>;

export type RunProjectsLocationsAgentsTestCasesResponse =
  GoogleLongrunningOperation;
export const RunProjectsLocationsAgentsTestCasesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type RunProjectsLocationsAgentsTestCasesError = DefaultErrors;

export const runProjectsLocationsAgentsTestCases: API.OperationMethod<
  RunProjectsLocationsAgentsTestCasesRequest,
  RunProjectsLocationsAgentsTestCasesResponse,
  RunProjectsLocationsAgentsTestCasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RunProjectsLocationsAgentsTestCasesRequest,
  output: RunProjectsLocationsAgentsTestCasesResponse,
  errors: [],
}));

export interface BatchRunProjectsLocationsAgentsTestCasesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3BatchRunTestCasesRequest;
}

export const BatchRunProjectsLocationsAgentsTestCasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(
      GoogleCloudDialogflowCxV3BatchRunTestCasesRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases:batchRun",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BatchRunProjectsLocationsAgentsTestCasesRequest>;

export type BatchRunProjectsLocationsAgentsTestCasesResponse =
  GoogleLongrunningOperation;
export const BatchRunProjectsLocationsAgentsTestCasesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type BatchRunProjectsLocationsAgentsTestCasesError = DefaultErrors;

export const batchRunProjectsLocationsAgentsTestCases: API.OperationMethod<
  BatchRunProjectsLocationsAgentsTestCasesRequest,
  BatchRunProjectsLocationsAgentsTestCasesResponse,
  BatchRunProjectsLocationsAgentsTestCasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchRunProjectsLocationsAgentsTestCasesRequest,
  output: BatchRunProjectsLocationsAgentsTestCasesResponse,
  errors: [],
}));

export interface CalculateCoverageProjectsLocationsAgentsTestCasesRequest {
  agent: string;
  type?:
    | "COVERAGE_TYPE_UNSPECIFIED"
    | "INTENT"
    | "PAGE_TRANSITION"
    | "TRANSITION_ROUTE_GROUP"
    | (string & {});
}

export const CalculateCoverageProjectsLocationsAgentsTestCasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    agent: Schema.String.pipe(T.HttpPath("agent")),
    type: Schema.optional(Schema.String).pipe(T.HttpQuery("type")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases:calculateCoverage",
    }),
    svc,
  ) as unknown as Schema.Schema<CalculateCoverageProjectsLocationsAgentsTestCasesRequest>;

export type CalculateCoverageProjectsLocationsAgentsTestCasesResponse =
  GoogleCloudDialogflowCxV3CalculateCoverageResponse;
export const CalculateCoverageProjectsLocationsAgentsTestCasesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3CalculateCoverageResponse;

export type CalculateCoverageProjectsLocationsAgentsTestCasesError =
  DefaultErrors;

export const calculateCoverageProjectsLocationsAgentsTestCases: API.OperationMethod<
  CalculateCoverageProjectsLocationsAgentsTestCasesRequest,
  CalculateCoverageProjectsLocationsAgentsTestCasesResponse,
  CalculateCoverageProjectsLocationsAgentsTestCasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CalculateCoverageProjectsLocationsAgentsTestCasesRequest,
  output: CalculateCoverageProjectsLocationsAgentsTestCasesResponse,
  errors: [],
}));

export interface ImportProjectsLocationsAgentsTestCasesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3ImportTestCasesRequest;
}

export const ImportProjectsLocationsAgentsTestCasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(GoogleCloudDialogflowCxV3ImportTestCasesRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases:import",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ImportProjectsLocationsAgentsTestCasesRequest>;

export type ImportProjectsLocationsAgentsTestCasesResponse =
  GoogleLongrunningOperation;
export const ImportProjectsLocationsAgentsTestCasesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type ImportProjectsLocationsAgentsTestCasesError = DefaultErrors;

export const importProjectsLocationsAgentsTestCases: API.OperationMethod<
  ImportProjectsLocationsAgentsTestCasesRequest,
  ImportProjectsLocationsAgentsTestCasesResponse,
  ImportProjectsLocationsAgentsTestCasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ImportProjectsLocationsAgentsTestCasesRequest,
  output: ImportProjectsLocationsAgentsTestCasesResponse,
  errors: [],
}));

export interface ExportProjectsLocationsAgentsTestCasesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3ExportTestCasesRequest;
}

export const ExportProjectsLocationsAgentsTestCasesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(GoogleCloudDialogflowCxV3ExportTestCasesRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases:export",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ExportProjectsLocationsAgentsTestCasesRequest>;

export type ExportProjectsLocationsAgentsTestCasesResponse =
  GoogleLongrunningOperation;
export const ExportProjectsLocationsAgentsTestCasesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type ExportProjectsLocationsAgentsTestCasesError = DefaultErrors;

export const exportProjectsLocationsAgentsTestCases: API.OperationMethod<
  ExportProjectsLocationsAgentsTestCasesRequest,
  ExportProjectsLocationsAgentsTestCasesResponse,
  ExportProjectsLocationsAgentsTestCasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ListProjectsLocationsAgentsTestCasesResultsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases/{testCasesId}/results",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsAgentsTestCasesResultsRequest>;

export type ListProjectsLocationsAgentsTestCasesResultsResponse =
  GoogleCloudDialogflowCxV3ListTestCaseResultsResponse;
export const ListProjectsLocationsAgentsTestCasesResultsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3ListTestCaseResultsResponse;

export type ListProjectsLocationsAgentsTestCasesResultsError = DefaultErrors;

export const listProjectsLocationsAgentsTestCasesResults: API.PaginatedOperationMethod<
  ListProjectsLocationsAgentsTestCasesResultsRequest,
  ListProjectsLocationsAgentsTestCasesResultsResponse,
  ListProjectsLocationsAgentsTestCasesResultsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
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

export const GetProjectsLocationsAgentsTestCasesResultsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/testCases/{testCasesId}/results/{resultsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsAgentsTestCasesResultsRequest>;

export type GetProjectsLocationsAgentsTestCasesResultsResponse =
  GoogleCloudDialogflowCxV3TestCaseResult;
export const GetProjectsLocationsAgentsTestCasesResultsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3TestCaseResult;

export type GetProjectsLocationsAgentsTestCasesResultsError = DefaultErrors;

export const getProjectsLocationsAgentsTestCasesResults: API.OperationMethod<
  GetProjectsLocationsAgentsTestCasesResultsRequest,
  GetProjectsLocationsAgentsTestCasesResultsResponse,
  GetProjectsLocationsAgentsTestCasesResultsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsAgentsTestCasesResultsRequest,
  output: GetProjectsLocationsAgentsTestCasesResultsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsWebhooksRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsWebhooksRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/webhooks",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsAgentsWebhooksRequest>;

export type ListProjectsLocationsAgentsWebhooksResponse =
  GoogleCloudDialogflowCxV3ListWebhooksResponse;
export const ListProjectsLocationsAgentsWebhooksResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3ListWebhooksResponse;

export type ListProjectsLocationsAgentsWebhooksError = DefaultErrors;

export const listProjectsLocationsAgentsWebhooks: API.PaginatedOperationMethod<
  ListProjectsLocationsAgentsWebhooksRequest,
  ListProjectsLocationsAgentsWebhooksResponse,
  ListProjectsLocationsAgentsWebhooksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
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

export const GetProjectsLocationsAgentsWebhooksRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/webhooks/{webhooksId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsAgentsWebhooksRequest>;

export type GetProjectsLocationsAgentsWebhooksResponse =
  GoogleCloudDialogflowCxV3Webhook;
export const GetProjectsLocationsAgentsWebhooksResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Webhook;

export type GetProjectsLocationsAgentsWebhooksError = DefaultErrors;

export const getProjectsLocationsAgentsWebhooks: API.OperationMethod<
  GetProjectsLocationsAgentsWebhooksRequest,
  GetProjectsLocationsAgentsWebhooksResponse,
  GetProjectsLocationsAgentsWebhooksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsAgentsWebhooksRequest,
  output: GetProjectsLocationsAgentsWebhooksResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsWebhooksRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Webhook;
}

export const CreateProjectsLocationsAgentsWebhooksRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(GoogleCloudDialogflowCxV3Webhook).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/webhooks",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsAgentsWebhooksRequest>;

export type CreateProjectsLocationsAgentsWebhooksResponse =
  GoogleCloudDialogflowCxV3Webhook;
export const CreateProjectsLocationsAgentsWebhooksResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Webhook;

export type CreateProjectsLocationsAgentsWebhooksError = DefaultErrors;

export const createProjectsLocationsAgentsWebhooks: API.OperationMethod<
  CreateProjectsLocationsAgentsWebhooksRequest,
  CreateProjectsLocationsAgentsWebhooksResponse,
  CreateProjectsLocationsAgentsWebhooksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsAgentsWebhooksRequest,
  output: CreateProjectsLocationsAgentsWebhooksResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsWebhooksRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Webhook;
}

export const PatchProjectsLocationsAgentsWebhooksRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GoogleCloudDialogflowCxV3Webhook).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/webhooks/{webhooksId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsAgentsWebhooksRequest>;

export type PatchProjectsLocationsAgentsWebhooksResponse =
  GoogleCloudDialogflowCxV3Webhook;
export const PatchProjectsLocationsAgentsWebhooksResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Webhook;

export type PatchProjectsLocationsAgentsWebhooksError = DefaultErrors;

export const patchProjectsLocationsAgentsWebhooks: API.OperationMethod<
  PatchProjectsLocationsAgentsWebhooksRequest,
  PatchProjectsLocationsAgentsWebhooksResponse,
  PatchProjectsLocationsAgentsWebhooksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsAgentsWebhooksRequest,
  output: PatchProjectsLocationsAgentsWebhooksResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsWebhooksRequest {
  name: string;
  force?: boolean;
}

export const DeleteProjectsLocationsAgentsWebhooksRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/webhooks/{webhooksId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsWebhooksRequest>;

export type DeleteProjectsLocationsAgentsWebhooksResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsWebhooksResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsWebhooksError = DefaultErrors;

export const deleteProjectsLocationsAgentsWebhooks: API.OperationMethod<
  DeleteProjectsLocationsAgentsWebhooksRequest,
  DeleteProjectsLocationsAgentsWebhooksResponse,
  DeleteProjectsLocationsAgentsWebhooksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsAgentsWebhooksRequest,
  output: DeleteProjectsLocationsAgentsWebhooksResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsEnvironmentsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsEnvironmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsAgentsEnvironmentsRequest>;

export type ListProjectsLocationsAgentsEnvironmentsResponse =
  GoogleCloudDialogflowCxV3ListEnvironmentsResponse;
export const ListProjectsLocationsAgentsEnvironmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3ListEnvironmentsResponse;

export type ListProjectsLocationsAgentsEnvironmentsError = DefaultErrors;

export const listProjectsLocationsAgentsEnvironments: API.PaginatedOperationMethod<
  ListProjectsLocationsAgentsEnvironmentsRequest,
  ListProjectsLocationsAgentsEnvironmentsResponse,
  ListProjectsLocationsAgentsEnvironmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
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

export const GetProjectsLocationsAgentsEnvironmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsAgentsEnvironmentsRequest>;

export type GetProjectsLocationsAgentsEnvironmentsResponse =
  GoogleCloudDialogflowCxV3Environment;
export const GetProjectsLocationsAgentsEnvironmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Environment;

export type GetProjectsLocationsAgentsEnvironmentsError = DefaultErrors;

export const getProjectsLocationsAgentsEnvironments: API.OperationMethod<
  GetProjectsLocationsAgentsEnvironmentsRequest,
  GetProjectsLocationsAgentsEnvironmentsResponse,
  GetProjectsLocationsAgentsEnvironmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsAgentsEnvironmentsRequest,
  output: GetProjectsLocationsAgentsEnvironmentsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsEnvironmentsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Environment;
}

export const CreateProjectsLocationsAgentsEnvironmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(GoogleCloudDialogflowCxV3Environment).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsAgentsEnvironmentsRequest>;

export type CreateProjectsLocationsAgentsEnvironmentsResponse =
  GoogleLongrunningOperation;
export const CreateProjectsLocationsAgentsEnvironmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type CreateProjectsLocationsAgentsEnvironmentsError = DefaultErrors;

export const createProjectsLocationsAgentsEnvironments: API.OperationMethod<
  CreateProjectsLocationsAgentsEnvironmentsRequest,
  CreateProjectsLocationsAgentsEnvironmentsResponse,
  CreateProjectsLocationsAgentsEnvironmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsAgentsEnvironmentsRequest,
  output: CreateProjectsLocationsAgentsEnvironmentsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsEnvironmentsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Environment;
}

export const PatchProjectsLocationsAgentsEnvironmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GoogleCloudDialogflowCxV3Environment).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsAgentsEnvironmentsRequest>;

export type PatchProjectsLocationsAgentsEnvironmentsResponse =
  GoogleLongrunningOperation;
export const PatchProjectsLocationsAgentsEnvironmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type PatchProjectsLocationsAgentsEnvironmentsError = DefaultErrors;

export const patchProjectsLocationsAgentsEnvironments: API.OperationMethod<
  PatchProjectsLocationsAgentsEnvironmentsRequest,
  PatchProjectsLocationsAgentsEnvironmentsResponse,
  PatchProjectsLocationsAgentsEnvironmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsAgentsEnvironmentsRequest,
  output: PatchProjectsLocationsAgentsEnvironmentsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsEnvironmentsRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentsEnvironmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsEnvironmentsRequest>;

export type DeleteProjectsLocationsAgentsEnvironmentsResponse =
  GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsEnvironmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsEnvironmentsError = DefaultErrors;

export const deleteProjectsLocationsAgentsEnvironments: API.OperationMethod<
  DeleteProjectsLocationsAgentsEnvironmentsRequest,
  DeleteProjectsLocationsAgentsEnvironmentsResponse,
  DeleteProjectsLocationsAgentsEnvironmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsAgentsEnvironmentsRequest,
  output: DeleteProjectsLocationsAgentsEnvironmentsResponse,
  errors: [],
}));

export interface LookupEnvironmentHistoryProjectsLocationsAgentsEnvironmentsRequest {
  name: string;
  pageSize?: number;
  pageToken?: string;
}

export const LookupEnvironmentHistoryProjectsLocationsAgentsEnvironmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}:lookupEnvironmentHistory",
    }),
    svc,
  ) as unknown as Schema.Schema<LookupEnvironmentHistoryProjectsLocationsAgentsEnvironmentsRequest>;

export type LookupEnvironmentHistoryProjectsLocationsAgentsEnvironmentsResponse =
  GoogleCloudDialogflowCxV3LookupEnvironmentHistoryResponse;
export const LookupEnvironmentHistoryProjectsLocationsAgentsEnvironmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3LookupEnvironmentHistoryResponse;

export type LookupEnvironmentHistoryProjectsLocationsAgentsEnvironmentsError =
  DefaultErrors;

export const lookupEnvironmentHistoryProjectsLocationsAgentsEnvironments: API.PaginatedOperationMethod<
  LookupEnvironmentHistoryProjectsLocationsAgentsEnvironmentsRequest,
  LookupEnvironmentHistoryProjectsLocationsAgentsEnvironmentsResponse,
  LookupEnvironmentHistoryProjectsLocationsAgentsEnvironmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
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
  body?: GoogleCloudDialogflowCxV3RunContinuousTestRequest;
}

export const RunContinuousTestProjectsLocationsAgentsEnvironmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    environment: Schema.String.pipe(T.HttpPath("environment")),
    body: Schema.optional(
      GoogleCloudDialogflowCxV3RunContinuousTestRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}:runContinuousTest",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RunContinuousTestProjectsLocationsAgentsEnvironmentsRequest>;

export type RunContinuousTestProjectsLocationsAgentsEnvironmentsResponse =
  GoogleLongrunningOperation;
export const RunContinuousTestProjectsLocationsAgentsEnvironmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type RunContinuousTestProjectsLocationsAgentsEnvironmentsError =
  DefaultErrors;

export const runContinuousTestProjectsLocationsAgentsEnvironments: API.OperationMethod<
  RunContinuousTestProjectsLocationsAgentsEnvironmentsRequest,
  RunContinuousTestProjectsLocationsAgentsEnvironmentsResponse,
  RunContinuousTestProjectsLocationsAgentsEnvironmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RunContinuousTestProjectsLocationsAgentsEnvironmentsRequest,
  output: RunContinuousTestProjectsLocationsAgentsEnvironmentsResponse,
  errors: [],
}));

export interface DeployFlowProjectsLocationsAgentsEnvironmentsRequest {
  environment: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3DeployFlowRequest;
}

export const DeployFlowProjectsLocationsAgentsEnvironmentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    environment: Schema.String.pipe(T.HttpPath("environment")),
    body: Schema.optional(GoogleCloudDialogflowCxV3DeployFlowRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}:deployFlow",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<DeployFlowProjectsLocationsAgentsEnvironmentsRequest>;

export type DeployFlowProjectsLocationsAgentsEnvironmentsResponse =
  GoogleLongrunningOperation;
export const DeployFlowProjectsLocationsAgentsEnvironmentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type DeployFlowProjectsLocationsAgentsEnvironmentsError = DefaultErrors;

export const deployFlowProjectsLocationsAgentsEnvironments: API.OperationMethod<
  DeployFlowProjectsLocationsAgentsEnvironmentsRequest,
  DeployFlowProjectsLocationsAgentsEnvironmentsResponse,
  DeployFlowProjectsLocationsAgentsEnvironmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeployFlowProjectsLocationsAgentsEnvironmentsRequest,
  output: DeployFlowProjectsLocationsAgentsEnvironmentsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsEnvironmentsDeploymentsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsEnvironmentsDeploymentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/deployments",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsAgentsEnvironmentsDeploymentsRequest>;

export type ListProjectsLocationsAgentsEnvironmentsDeploymentsResponse =
  GoogleCloudDialogflowCxV3ListDeploymentsResponse;
export const ListProjectsLocationsAgentsEnvironmentsDeploymentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3ListDeploymentsResponse;

export type ListProjectsLocationsAgentsEnvironmentsDeploymentsError =
  DefaultErrors;

export const listProjectsLocationsAgentsEnvironmentsDeployments: API.PaginatedOperationMethod<
  ListProjectsLocationsAgentsEnvironmentsDeploymentsRequest,
  ListProjectsLocationsAgentsEnvironmentsDeploymentsResponse,
  ListProjectsLocationsAgentsEnvironmentsDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
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

export const GetProjectsLocationsAgentsEnvironmentsDeploymentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/deployments/{deploymentsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsAgentsEnvironmentsDeploymentsRequest>;

export type GetProjectsLocationsAgentsEnvironmentsDeploymentsResponse =
  GoogleCloudDialogflowCxV3Deployment;
export const GetProjectsLocationsAgentsEnvironmentsDeploymentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Deployment;

export type GetProjectsLocationsAgentsEnvironmentsDeploymentsError =
  DefaultErrors;

export const getProjectsLocationsAgentsEnvironmentsDeployments: API.OperationMethod<
  GetProjectsLocationsAgentsEnvironmentsDeploymentsRequest,
  GetProjectsLocationsAgentsEnvironmentsDeploymentsResponse,
  GetProjectsLocationsAgentsEnvironmentsDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsAgentsEnvironmentsDeploymentsRequest,
  output: GetProjectsLocationsAgentsEnvironmentsDeploymentsResponse,
  errors: [],
}));

export interface DetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3DetectIntentRequest;
}

export const DetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    session: Schema.String.pipe(T.HttpPath("session")),
    body: Schema.optional(GoogleCloudDialogflowCxV3DetectIntentRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/sessions/{sessionsId}:detectIntent",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<DetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest>;

export type DetectIntentProjectsLocationsAgentsEnvironmentsSessionsResponse =
  GoogleCloudDialogflowCxV3DetectIntentResponse;
export const DetectIntentProjectsLocationsAgentsEnvironmentsSessionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3DetectIntentResponse;

export type DetectIntentProjectsLocationsAgentsEnvironmentsSessionsError =
  DefaultErrors;

export const detectIntentProjectsLocationsAgentsEnvironmentsSessions: API.OperationMethod<
  DetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest,
  DetectIntentProjectsLocationsAgentsEnvironmentsSessionsResponse,
  DetectIntentProjectsLocationsAgentsEnvironmentsSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest,
  output: DetectIntentProjectsLocationsAgentsEnvironmentsSessionsResponse,
  errors: [],
}));

export interface ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3DetectIntentRequest;
}

export const ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    session: Schema.String.pipe(T.HttpPath("session")),
    body: Schema.optional(GoogleCloudDialogflowCxV3DetectIntentRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/sessions/{sessionsId}:serverStreamingDetectIntent",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest>;

export type ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsResponse =
  GoogleCloudDialogflowCxV3DetectIntentResponse;
export const ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3DetectIntentResponse;

export type ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsError =
  DefaultErrors;

export const serverStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessions: API.OperationMethod<
  ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest,
  ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsResponse,
  ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input:
    ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsRequest,
  output:
    ServerStreamingDetectIntentProjectsLocationsAgentsEnvironmentsSessionsResponse,
  errors: [],
}));

export interface MatchIntentProjectsLocationsAgentsEnvironmentsSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3MatchIntentRequest;
}

export const MatchIntentProjectsLocationsAgentsEnvironmentsSessionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    session: Schema.String.pipe(T.HttpPath("session")),
    body: Schema.optional(GoogleCloudDialogflowCxV3MatchIntentRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/sessions/{sessionsId}:matchIntent",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<MatchIntentProjectsLocationsAgentsEnvironmentsSessionsRequest>;

export type MatchIntentProjectsLocationsAgentsEnvironmentsSessionsResponse =
  GoogleCloudDialogflowCxV3MatchIntentResponse;
export const MatchIntentProjectsLocationsAgentsEnvironmentsSessionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3MatchIntentResponse;

export type MatchIntentProjectsLocationsAgentsEnvironmentsSessionsError =
  DefaultErrors;

export const matchIntentProjectsLocationsAgentsEnvironmentsSessions: API.OperationMethod<
  MatchIntentProjectsLocationsAgentsEnvironmentsSessionsRequest,
  MatchIntentProjectsLocationsAgentsEnvironmentsSessionsResponse,
  MatchIntentProjectsLocationsAgentsEnvironmentsSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: MatchIntentProjectsLocationsAgentsEnvironmentsSessionsRequest,
  output: MatchIntentProjectsLocationsAgentsEnvironmentsSessionsResponse,
  errors: [],
}));

export interface FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3FulfillIntentRequest;
}

export const FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    session: Schema.String.pipe(T.HttpPath("session")),
    body: Schema.optional(GoogleCloudDialogflowCxV3FulfillIntentRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/sessions/{sessionsId}:fulfillIntent",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsRequest>;

export type FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsResponse =
  GoogleCloudDialogflowCxV3FulfillIntentResponse;
export const FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3FulfillIntentResponse;

export type FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsError =
  DefaultErrors;

export const fulfillIntentProjectsLocationsAgentsEnvironmentsSessions: API.OperationMethod<
  FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsRequest,
  FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsResponse,
  FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsRequest,
  output: FulfillIntentProjectsLocationsAgentsEnvironmentsSessionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/sessions/{sessionsId}/entityTypes",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest>;

export type ListProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse =
  GoogleCloudDialogflowCxV3ListSessionEntityTypesResponse;
export const ListProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3ListSessionEntityTypesResponse;

export type ListProjectsLocationsAgentsEnvironmentsSessionsEntityTypesError =
  DefaultErrors;

export const listProjectsLocationsAgentsEnvironmentsSessionsEntityTypes: API.PaginatedOperationMethod<
  ListProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest,
  ListProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse,
  ListProjectsLocationsAgentsEnvironmentsSessionsEntityTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
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

export const GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/sessions/{sessionsId}/entityTypes/{entityTypesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest>;

export type GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse =
  GoogleCloudDialogflowCxV3SessionEntityType;
export const GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3SessionEntityType;

export type GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesError =
  DefaultErrors;

export const getProjectsLocationsAgentsEnvironmentsSessionsEntityTypes: API.OperationMethod<
  GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest,
  GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse,
  GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest,
  output: GetProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3SessionEntityType;
}

export const CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(GoogleCloudDialogflowCxV3SessionEntityType).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/sessions/{sessionsId}/entityTypes",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest>;

export type CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse =
  GoogleCloudDialogflowCxV3SessionEntityType;
export const CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3SessionEntityType;

export type CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesError =
  DefaultErrors;

export const createProjectsLocationsAgentsEnvironmentsSessionsEntityTypes: API.OperationMethod<
  CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest,
  CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse,
  CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest,
  output: CreateProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3SessionEntityType;
}

export const PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GoogleCloudDialogflowCxV3SessionEntityType).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/sessions/{sessionsId}/entityTypes/{entityTypesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest>;

export type PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse =
  GoogleCloudDialogflowCxV3SessionEntityType;
export const PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3SessionEntityType;

export type PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesError =
  DefaultErrors;

export const patchProjectsLocationsAgentsEnvironmentsSessionsEntityTypes: API.OperationMethod<
  PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest,
  PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse,
  PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest,
  output: PatchProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/sessions/{sessionsId}/entityTypes/{entityTypesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest>;

export type DeleteProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse =
  GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsEnvironmentsSessionsEntityTypesError =
  DefaultErrors;

export const deleteProjectsLocationsAgentsEnvironmentsSessionsEntityTypes: API.OperationMethod<
  DeleteProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest,
  DeleteProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse,
  DeleteProjectsLocationsAgentsEnvironmentsSessionsEntityTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsAgentsEnvironmentsSessionsEntityTypesRequest,
  output: DeleteProjectsLocationsAgentsEnvironmentsSessionsEntityTypesResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsEnvironmentsContinuousTestResultsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsEnvironmentsContinuousTestResultsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/continuousTestResults",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsAgentsEnvironmentsContinuousTestResultsRequest>;

export type ListProjectsLocationsAgentsEnvironmentsContinuousTestResultsResponse =
  GoogleCloudDialogflowCxV3ListContinuousTestResultsResponse;
export const ListProjectsLocationsAgentsEnvironmentsContinuousTestResultsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3ListContinuousTestResultsResponse;

export type ListProjectsLocationsAgentsEnvironmentsContinuousTestResultsError =
  DefaultErrors;

export const listProjectsLocationsAgentsEnvironmentsContinuousTestResults: API.PaginatedOperationMethod<
  ListProjectsLocationsAgentsEnvironmentsContinuousTestResultsRequest,
  ListProjectsLocationsAgentsEnvironmentsContinuousTestResultsResponse,
  ListProjectsLocationsAgentsEnvironmentsContinuousTestResultsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsEnvironmentsContinuousTestResultsRequest,
  output: ListProjectsLocationsAgentsEnvironmentsContinuousTestResultsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListProjectsLocationsAgentsEnvironmentsExperimentsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsEnvironmentsExperimentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/experiments",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsAgentsEnvironmentsExperimentsRequest>;

export type ListProjectsLocationsAgentsEnvironmentsExperimentsResponse =
  GoogleCloudDialogflowCxV3ListExperimentsResponse;
export const ListProjectsLocationsAgentsEnvironmentsExperimentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3ListExperimentsResponse;

export type ListProjectsLocationsAgentsEnvironmentsExperimentsError =
  DefaultErrors;

export const listProjectsLocationsAgentsEnvironmentsExperiments: API.PaginatedOperationMethod<
  ListProjectsLocationsAgentsEnvironmentsExperimentsRequest,
  ListProjectsLocationsAgentsEnvironmentsExperimentsResponse,
  ListProjectsLocationsAgentsEnvironmentsExperimentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
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

export const GetProjectsLocationsAgentsEnvironmentsExperimentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/experiments/{experimentsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsAgentsEnvironmentsExperimentsRequest>;

export type GetProjectsLocationsAgentsEnvironmentsExperimentsResponse =
  GoogleCloudDialogflowCxV3Experiment;
export const GetProjectsLocationsAgentsEnvironmentsExperimentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Experiment;

export type GetProjectsLocationsAgentsEnvironmentsExperimentsError =
  DefaultErrors;

export const getProjectsLocationsAgentsEnvironmentsExperiments: API.OperationMethod<
  GetProjectsLocationsAgentsEnvironmentsExperimentsRequest,
  GetProjectsLocationsAgentsEnvironmentsExperimentsResponse,
  GetProjectsLocationsAgentsEnvironmentsExperimentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsAgentsEnvironmentsExperimentsRequest,
  output: GetProjectsLocationsAgentsEnvironmentsExperimentsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsEnvironmentsExperimentsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Experiment;
}

export const CreateProjectsLocationsAgentsEnvironmentsExperimentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(GoogleCloudDialogflowCxV3Experiment).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/experiments",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsAgentsEnvironmentsExperimentsRequest>;

export type CreateProjectsLocationsAgentsEnvironmentsExperimentsResponse =
  GoogleCloudDialogflowCxV3Experiment;
export const CreateProjectsLocationsAgentsEnvironmentsExperimentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Experiment;

export type CreateProjectsLocationsAgentsEnvironmentsExperimentsError =
  DefaultErrors;

export const createProjectsLocationsAgentsEnvironmentsExperiments: API.OperationMethod<
  CreateProjectsLocationsAgentsEnvironmentsExperimentsRequest,
  CreateProjectsLocationsAgentsEnvironmentsExperimentsResponse,
  CreateProjectsLocationsAgentsEnvironmentsExperimentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsAgentsEnvironmentsExperimentsRequest,
  output: CreateProjectsLocationsAgentsEnvironmentsExperimentsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsEnvironmentsExperimentsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Experiment;
}

export const PatchProjectsLocationsAgentsEnvironmentsExperimentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GoogleCloudDialogflowCxV3Experiment).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/experiments/{experimentsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsAgentsEnvironmentsExperimentsRequest>;

export type PatchProjectsLocationsAgentsEnvironmentsExperimentsResponse =
  GoogleCloudDialogflowCxV3Experiment;
export const PatchProjectsLocationsAgentsEnvironmentsExperimentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Experiment;

export type PatchProjectsLocationsAgentsEnvironmentsExperimentsError =
  DefaultErrors;

export const patchProjectsLocationsAgentsEnvironmentsExperiments: API.OperationMethod<
  PatchProjectsLocationsAgentsEnvironmentsExperimentsRequest,
  PatchProjectsLocationsAgentsEnvironmentsExperimentsResponse,
  PatchProjectsLocationsAgentsEnvironmentsExperimentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsAgentsEnvironmentsExperimentsRequest,
  output: PatchProjectsLocationsAgentsEnvironmentsExperimentsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsEnvironmentsExperimentsRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentsEnvironmentsExperimentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/experiments/{experimentsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsEnvironmentsExperimentsRequest>;

export type DeleteProjectsLocationsAgentsEnvironmentsExperimentsResponse =
  GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsEnvironmentsExperimentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsEnvironmentsExperimentsError =
  DefaultErrors;

export const deleteProjectsLocationsAgentsEnvironmentsExperiments: API.OperationMethod<
  DeleteProjectsLocationsAgentsEnvironmentsExperimentsRequest,
  DeleteProjectsLocationsAgentsEnvironmentsExperimentsResponse,
  DeleteProjectsLocationsAgentsEnvironmentsExperimentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsAgentsEnvironmentsExperimentsRequest,
  output: DeleteProjectsLocationsAgentsEnvironmentsExperimentsResponse,
  errors: [],
}));

export interface StartProjectsLocationsAgentsEnvironmentsExperimentsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3StartExperimentRequest;
}

export const StartProjectsLocationsAgentsEnvironmentsExperimentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(GoogleCloudDialogflowCxV3StartExperimentRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/experiments/{experimentsId}:start",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<StartProjectsLocationsAgentsEnvironmentsExperimentsRequest>;

export type StartProjectsLocationsAgentsEnvironmentsExperimentsResponse =
  GoogleCloudDialogflowCxV3Experiment;
export const StartProjectsLocationsAgentsEnvironmentsExperimentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Experiment;

export type StartProjectsLocationsAgentsEnvironmentsExperimentsError =
  DefaultErrors;

export const startProjectsLocationsAgentsEnvironmentsExperiments: API.OperationMethod<
  StartProjectsLocationsAgentsEnvironmentsExperimentsRequest,
  StartProjectsLocationsAgentsEnvironmentsExperimentsResponse,
  StartProjectsLocationsAgentsEnvironmentsExperimentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartProjectsLocationsAgentsEnvironmentsExperimentsRequest,
  output: StartProjectsLocationsAgentsEnvironmentsExperimentsResponse,
  errors: [],
}));

export interface StopProjectsLocationsAgentsEnvironmentsExperimentsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3StopExperimentRequest;
}

export const StopProjectsLocationsAgentsEnvironmentsExperimentsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(GoogleCloudDialogflowCxV3StopExperimentRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/environments/{environmentsId}/experiments/{experimentsId}:stop",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<StopProjectsLocationsAgentsEnvironmentsExperimentsRequest>;

export type StopProjectsLocationsAgentsEnvironmentsExperimentsResponse =
  GoogleCloudDialogflowCxV3Experiment;
export const StopProjectsLocationsAgentsEnvironmentsExperimentsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Experiment;

export type StopProjectsLocationsAgentsEnvironmentsExperimentsError =
  DefaultErrors;

export const stopProjectsLocationsAgentsEnvironmentsExperiments: API.OperationMethod<
  StopProjectsLocationsAgentsEnvironmentsExperimentsRequest,
  StopProjectsLocationsAgentsEnvironmentsExperimentsResponse,
  StopProjectsLocationsAgentsEnvironmentsExperimentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopProjectsLocationsAgentsEnvironmentsExperimentsRequest,
  output: StopProjectsLocationsAgentsEnvironmentsExperimentsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsGeneratorsRequest {
  parent: string;
  languageCode?: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsGeneratorsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/generators",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsAgentsGeneratorsRequest>;

export type ListProjectsLocationsAgentsGeneratorsResponse =
  GoogleCloudDialogflowCxV3ListGeneratorsResponse;
export const ListProjectsLocationsAgentsGeneratorsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3ListGeneratorsResponse;

export type ListProjectsLocationsAgentsGeneratorsError = DefaultErrors;

export const listProjectsLocationsAgentsGenerators: API.PaginatedOperationMethod<
  ListProjectsLocationsAgentsGeneratorsRequest,
  ListProjectsLocationsAgentsGeneratorsResponse,
  ListProjectsLocationsAgentsGeneratorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
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

export const GetProjectsLocationsAgentsGeneratorsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/generators/{generatorsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsAgentsGeneratorsRequest>;

export type GetProjectsLocationsAgentsGeneratorsResponse =
  GoogleCloudDialogflowCxV3Generator;
export const GetProjectsLocationsAgentsGeneratorsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Generator;

export type GetProjectsLocationsAgentsGeneratorsError = DefaultErrors;

export const getProjectsLocationsAgentsGenerators: API.OperationMethod<
  GetProjectsLocationsAgentsGeneratorsRequest,
  GetProjectsLocationsAgentsGeneratorsResponse,
  GetProjectsLocationsAgentsGeneratorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsAgentsGeneratorsRequest,
  output: GetProjectsLocationsAgentsGeneratorsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsGeneratorsRequest {
  parent: string;
  languageCode?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Generator;
}

export const CreateProjectsLocationsAgentsGeneratorsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
    body: Schema.optional(GoogleCloudDialogflowCxV3Generator).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/generators",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsAgentsGeneratorsRequest>;

export type CreateProjectsLocationsAgentsGeneratorsResponse =
  GoogleCloudDialogflowCxV3Generator;
export const CreateProjectsLocationsAgentsGeneratorsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Generator;

export type CreateProjectsLocationsAgentsGeneratorsError = DefaultErrors;

export const createProjectsLocationsAgentsGenerators: API.OperationMethod<
  CreateProjectsLocationsAgentsGeneratorsRequest,
  CreateProjectsLocationsAgentsGeneratorsResponse,
  CreateProjectsLocationsAgentsGeneratorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsAgentsGeneratorsRequest,
  output: CreateProjectsLocationsAgentsGeneratorsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsGeneratorsRequest {
  name: string;
  languageCode?: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Generator;
}

export const PatchProjectsLocationsAgentsGeneratorsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GoogleCloudDialogflowCxV3Generator).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/generators/{generatorsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsAgentsGeneratorsRequest>;

export type PatchProjectsLocationsAgentsGeneratorsResponse =
  GoogleCloudDialogflowCxV3Generator;
export const PatchProjectsLocationsAgentsGeneratorsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Generator;

export type PatchProjectsLocationsAgentsGeneratorsError = DefaultErrors;

export const patchProjectsLocationsAgentsGenerators: API.OperationMethod<
  PatchProjectsLocationsAgentsGeneratorsRequest,
  PatchProjectsLocationsAgentsGeneratorsResponse,
  PatchProjectsLocationsAgentsGeneratorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsAgentsGeneratorsRequest,
  output: PatchProjectsLocationsAgentsGeneratorsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsGeneratorsRequest {
  name: string;
  force?: boolean;
}

export const DeleteProjectsLocationsAgentsGeneratorsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/generators/{generatorsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsGeneratorsRequest>;

export type DeleteProjectsLocationsAgentsGeneratorsResponse =
  GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsGeneratorsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsGeneratorsError = DefaultErrors;

export const deleteProjectsLocationsAgentsGenerators: API.OperationMethod<
  DeleteProjectsLocationsAgentsGeneratorsRequest,
  DeleteProjectsLocationsAgentsGeneratorsResponse,
  DeleteProjectsLocationsAgentsGeneratorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsAgentsGeneratorsRequest,
  output: DeleteProjectsLocationsAgentsGeneratorsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsPlaybooksRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Playbook;
}

export const CreateProjectsLocationsAgentsPlaybooksRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(GoogleCloudDialogflowCxV3Playbook).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsAgentsPlaybooksRequest>;

export type CreateProjectsLocationsAgentsPlaybooksResponse =
  GoogleCloudDialogflowCxV3Playbook;
export const CreateProjectsLocationsAgentsPlaybooksResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Playbook;

export type CreateProjectsLocationsAgentsPlaybooksError = DefaultErrors;

export const createProjectsLocationsAgentsPlaybooks: API.OperationMethod<
  CreateProjectsLocationsAgentsPlaybooksRequest,
  CreateProjectsLocationsAgentsPlaybooksResponse,
  CreateProjectsLocationsAgentsPlaybooksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsAgentsPlaybooksRequest,
  output: CreateProjectsLocationsAgentsPlaybooksResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsPlaybooksRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentsPlaybooksRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsPlaybooksRequest>;

export type DeleteProjectsLocationsAgentsPlaybooksResponse =
  GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsPlaybooksResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsPlaybooksError = DefaultErrors;

export const deleteProjectsLocationsAgentsPlaybooks: API.OperationMethod<
  DeleteProjectsLocationsAgentsPlaybooksRequest,
  DeleteProjectsLocationsAgentsPlaybooksResponse,
  DeleteProjectsLocationsAgentsPlaybooksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsAgentsPlaybooksRequest,
  output: DeleteProjectsLocationsAgentsPlaybooksResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsPlaybooksRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsPlaybooksRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsAgentsPlaybooksRequest>;

export type ListProjectsLocationsAgentsPlaybooksResponse =
  GoogleCloudDialogflowCxV3ListPlaybooksResponse;
export const ListProjectsLocationsAgentsPlaybooksResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3ListPlaybooksResponse;

export type ListProjectsLocationsAgentsPlaybooksError = DefaultErrors;

export const listProjectsLocationsAgentsPlaybooks: API.PaginatedOperationMethod<
  ListProjectsLocationsAgentsPlaybooksRequest,
  ListProjectsLocationsAgentsPlaybooksResponse,
  ListProjectsLocationsAgentsPlaybooksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
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

export const GetProjectsLocationsAgentsPlaybooksRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsAgentsPlaybooksRequest>;

export type GetProjectsLocationsAgentsPlaybooksResponse =
  GoogleCloudDialogflowCxV3Playbook;
export const GetProjectsLocationsAgentsPlaybooksResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Playbook;

export type GetProjectsLocationsAgentsPlaybooksError = DefaultErrors;

export const getProjectsLocationsAgentsPlaybooks: API.OperationMethod<
  GetProjectsLocationsAgentsPlaybooksRequest,
  GetProjectsLocationsAgentsPlaybooksResponse,
  GetProjectsLocationsAgentsPlaybooksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsAgentsPlaybooksRequest,
  output: GetProjectsLocationsAgentsPlaybooksResponse,
  errors: [],
}));

export interface ExportProjectsLocationsAgentsPlaybooksRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3ExportPlaybookRequest;
}

export const ExportProjectsLocationsAgentsPlaybooksRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(GoogleCloudDialogflowCxV3ExportPlaybookRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}:export",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ExportProjectsLocationsAgentsPlaybooksRequest>;

export type ExportProjectsLocationsAgentsPlaybooksResponse =
  GoogleLongrunningOperation;
export const ExportProjectsLocationsAgentsPlaybooksResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type ExportProjectsLocationsAgentsPlaybooksError = DefaultErrors;

export const exportProjectsLocationsAgentsPlaybooks: API.OperationMethod<
  ExportProjectsLocationsAgentsPlaybooksRequest,
  ExportProjectsLocationsAgentsPlaybooksResponse,
  ExportProjectsLocationsAgentsPlaybooksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ExportProjectsLocationsAgentsPlaybooksRequest,
  output: ExportProjectsLocationsAgentsPlaybooksResponse,
  errors: [],
}));

export interface ImportProjectsLocationsAgentsPlaybooksRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3ImportPlaybookRequest;
}

export const ImportProjectsLocationsAgentsPlaybooksRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(GoogleCloudDialogflowCxV3ImportPlaybookRequest).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks:import",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ImportProjectsLocationsAgentsPlaybooksRequest>;

export type ImportProjectsLocationsAgentsPlaybooksResponse =
  GoogleLongrunningOperation;
export const ImportProjectsLocationsAgentsPlaybooksResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleLongrunningOperation;

export type ImportProjectsLocationsAgentsPlaybooksError = DefaultErrors;

export const importProjectsLocationsAgentsPlaybooks: API.OperationMethod<
  ImportProjectsLocationsAgentsPlaybooksRequest,
  ImportProjectsLocationsAgentsPlaybooksResponse,
  ImportProjectsLocationsAgentsPlaybooksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ImportProjectsLocationsAgentsPlaybooksRequest,
  output: ImportProjectsLocationsAgentsPlaybooksResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsPlaybooksRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Playbook;
}

export const PatchProjectsLocationsAgentsPlaybooksRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GoogleCloudDialogflowCxV3Playbook).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsAgentsPlaybooksRequest>;

export type PatchProjectsLocationsAgentsPlaybooksResponse =
  GoogleCloudDialogflowCxV3Playbook;
export const PatchProjectsLocationsAgentsPlaybooksResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Playbook;

export type PatchProjectsLocationsAgentsPlaybooksError = DefaultErrors;

export const patchProjectsLocationsAgentsPlaybooks: API.OperationMethod<
  PatchProjectsLocationsAgentsPlaybooksRequest,
  PatchProjectsLocationsAgentsPlaybooksResponse,
  PatchProjectsLocationsAgentsPlaybooksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsAgentsPlaybooksRequest,
  output: PatchProjectsLocationsAgentsPlaybooksResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsPlaybooksExamplesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Example;
}

export const CreateProjectsLocationsAgentsPlaybooksExamplesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(GoogleCloudDialogflowCxV3Example).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/examples",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsAgentsPlaybooksExamplesRequest>;

export type CreateProjectsLocationsAgentsPlaybooksExamplesResponse =
  GoogleCloudDialogflowCxV3Example;
export const CreateProjectsLocationsAgentsPlaybooksExamplesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Example;

export type CreateProjectsLocationsAgentsPlaybooksExamplesError = DefaultErrors;

export const createProjectsLocationsAgentsPlaybooksExamples: API.OperationMethod<
  CreateProjectsLocationsAgentsPlaybooksExamplesRequest,
  CreateProjectsLocationsAgentsPlaybooksExamplesResponse,
  CreateProjectsLocationsAgentsPlaybooksExamplesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsAgentsPlaybooksExamplesRequest,
  output: CreateProjectsLocationsAgentsPlaybooksExamplesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsPlaybooksExamplesRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentsPlaybooksExamplesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/examples/{examplesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsPlaybooksExamplesRequest>;

export type DeleteProjectsLocationsAgentsPlaybooksExamplesResponse =
  GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsPlaybooksExamplesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsPlaybooksExamplesError = DefaultErrors;

export const deleteProjectsLocationsAgentsPlaybooksExamples: API.OperationMethod<
  DeleteProjectsLocationsAgentsPlaybooksExamplesRequest,
  DeleteProjectsLocationsAgentsPlaybooksExamplesResponse,
  DeleteProjectsLocationsAgentsPlaybooksExamplesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const ListProjectsLocationsAgentsPlaybooksExamplesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    languageCode: Schema.optional(Schema.String).pipe(
      T.HttpQuery("languageCode"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/examples",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsAgentsPlaybooksExamplesRequest>;

export type ListProjectsLocationsAgentsPlaybooksExamplesResponse =
  GoogleCloudDialogflowCxV3ListExamplesResponse;
export const ListProjectsLocationsAgentsPlaybooksExamplesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3ListExamplesResponse;

export type ListProjectsLocationsAgentsPlaybooksExamplesError = DefaultErrors;

export const listProjectsLocationsAgentsPlaybooksExamples: API.PaginatedOperationMethod<
  ListProjectsLocationsAgentsPlaybooksExamplesRequest,
  ListProjectsLocationsAgentsPlaybooksExamplesResponse,
  ListProjectsLocationsAgentsPlaybooksExamplesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
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

export const GetProjectsLocationsAgentsPlaybooksExamplesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/examples/{examplesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsAgentsPlaybooksExamplesRequest>;

export type GetProjectsLocationsAgentsPlaybooksExamplesResponse =
  GoogleCloudDialogflowCxV3Example;
export const GetProjectsLocationsAgentsPlaybooksExamplesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Example;

export type GetProjectsLocationsAgentsPlaybooksExamplesError = DefaultErrors;

export const getProjectsLocationsAgentsPlaybooksExamples: API.OperationMethod<
  GetProjectsLocationsAgentsPlaybooksExamplesRequest,
  GetProjectsLocationsAgentsPlaybooksExamplesResponse,
  GetProjectsLocationsAgentsPlaybooksExamplesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
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

export const PatchProjectsLocationsAgentsPlaybooksExamplesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GoogleCloudDialogflowCxV3Example).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/examples/{examplesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsAgentsPlaybooksExamplesRequest>;

export type PatchProjectsLocationsAgentsPlaybooksExamplesResponse =
  GoogleCloudDialogflowCxV3Example;
export const PatchProjectsLocationsAgentsPlaybooksExamplesResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Example;

export type PatchProjectsLocationsAgentsPlaybooksExamplesError = DefaultErrors;

export const patchProjectsLocationsAgentsPlaybooksExamples: API.OperationMethod<
  PatchProjectsLocationsAgentsPlaybooksExamplesRequest,
  PatchProjectsLocationsAgentsPlaybooksExamplesResponse,
  PatchProjectsLocationsAgentsPlaybooksExamplesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsAgentsPlaybooksExamplesRequest,
  output: PatchProjectsLocationsAgentsPlaybooksExamplesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsPlaybooksVersionsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3PlaybookVersion;
}

export const CreateProjectsLocationsAgentsPlaybooksVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(GoogleCloudDialogflowCxV3PlaybookVersion).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/versions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsAgentsPlaybooksVersionsRequest>;

export type CreateProjectsLocationsAgentsPlaybooksVersionsResponse =
  GoogleCloudDialogflowCxV3PlaybookVersion;
export const CreateProjectsLocationsAgentsPlaybooksVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3PlaybookVersion;

export type CreateProjectsLocationsAgentsPlaybooksVersionsError = DefaultErrors;

export const createProjectsLocationsAgentsPlaybooksVersions: API.OperationMethod<
  CreateProjectsLocationsAgentsPlaybooksVersionsRequest,
  CreateProjectsLocationsAgentsPlaybooksVersionsResponse,
  CreateProjectsLocationsAgentsPlaybooksVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsAgentsPlaybooksVersionsRequest,
  output: CreateProjectsLocationsAgentsPlaybooksVersionsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAgentsPlaybooksVersionsRequest {
  name: string;
}

export const GetProjectsLocationsAgentsPlaybooksVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/versions/{versionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsAgentsPlaybooksVersionsRequest>;

export type GetProjectsLocationsAgentsPlaybooksVersionsResponse =
  GoogleCloudDialogflowCxV3PlaybookVersion;
export const GetProjectsLocationsAgentsPlaybooksVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3PlaybookVersion;

export type GetProjectsLocationsAgentsPlaybooksVersionsError = DefaultErrors;

export const getProjectsLocationsAgentsPlaybooksVersions: API.OperationMethod<
  GetProjectsLocationsAgentsPlaybooksVersionsRequest,
  GetProjectsLocationsAgentsPlaybooksVersionsResponse,
  GetProjectsLocationsAgentsPlaybooksVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsAgentsPlaybooksVersionsRequest,
  output: GetProjectsLocationsAgentsPlaybooksVersionsResponse,
  errors: [],
}));

export interface RestoreProjectsLocationsAgentsPlaybooksVersionsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3RestorePlaybookVersionRequest;
}

export const RestoreProjectsLocationsAgentsPlaybooksVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(
      GoogleCloudDialogflowCxV3RestorePlaybookVersionRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/versions/{versionsId}:restore",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RestoreProjectsLocationsAgentsPlaybooksVersionsRequest>;

export type RestoreProjectsLocationsAgentsPlaybooksVersionsResponse =
  GoogleCloudDialogflowCxV3RestorePlaybookVersionResponse;
export const RestoreProjectsLocationsAgentsPlaybooksVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3RestorePlaybookVersionResponse;

export type RestoreProjectsLocationsAgentsPlaybooksVersionsError =
  DefaultErrors;

export const restoreProjectsLocationsAgentsPlaybooksVersions: API.OperationMethod<
  RestoreProjectsLocationsAgentsPlaybooksVersionsRequest,
  RestoreProjectsLocationsAgentsPlaybooksVersionsResponse,
  RestoreProjectsLocationsAgentsPlaybooksVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RestoreProjectsLocationsAgentsPlaybooksVersionsRequest,
  output: RestoreProjectsLocationsAgentsPlaybooksVersionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsPlaybooksVersionsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsPlaybooksVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/versions",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsAgentsPlaybooksVersionsRequest>;

export type ListProjectsLocationsAgentsPlaybooksVersionsResponse =
  GoogleCloudDialogflowCxV3ListPlaybookVersionsResponse;
export const ListProjectsLocationsAgentsPlaybooksVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3ListPlaybookVersionsResponse;

export type ListProjectsLocationsAgentsPlaybooksVersionsError = DefaultErrors;

export const listProjectsLocationsAgentsPlaybooksVersions: API.PaginatedOperationMethod<
  ListProjectsLocationsAgentsPlaybooksVersionsRequest,
  ListProjectsLocationsAgentsPlaybooksVersionsResponse,
  ListProjectsLocationsAgentsPlaybooksVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
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

export const DeleteProjectsLocationsAgentsPlaybooksVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/playbooks/{playbooksId}/versions/{versionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsPlaybooksVersionsRequest>;

export type DeleteProjectsLocationsAgentsPlaybooksVersionsResponse =
  GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsPlaybooksVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsPlaybooksVersionsError = DefaultErrors;

export const deleteProjectsLocationsAgentsPlaybooksVersions: API.OperationMethod<
  DeleteProjectsLocationsAgentsPlaybooksVersionsRequest,
  DeleteProjectsLocationsAgentsPlaybooksVersionsResponse,
  DeleteProjectsLocationsAgentsPlaybooksVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsAgentsPlaybooksVersionsRequest,
  output: DeleteProjectsLocationsAgentsPlaybooksVersionsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentsToolsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Tool;
}

export const CreateProjectsLocationsAgentsToolsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(GoogleCloudDialogflowCxV3Tool).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsAgentsToolsRequest>;

export type CreateProjectsLocationsAgentsToolsResponse =
  GoogleCloudDialogflowCxV3Tool;
export const CreateProjectsLocationsAgentsToolsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Tool;

export type CreateProjectsLocationsAgentsToolsError = DefaultErrors;

export const createProjectsLocationsAgentsTools: API.OperationMethod<
  CreateProjectsLocationsAgentsToolsRequest,
  CreateProjectsLocationsAgentsToolsResponse,
  CreateProjectsLocationsAgentsToolsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsAgentsToolsRequest,
  output: CreateProjectsLocationsAgentsToolsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsToolsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsToolsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsAgentsToolsRequest>;

export type ListProjectsLocationsAgentsToolsResponse =
  GoogleCloudDialogflowCxV3ListToolsResponse;
export const ListProjectsLocationsAgentsToolsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3ListToolsResponse;

export type ListProjectsLocationsAgentsToolsError = DefaultErrors;

export const listProjectsLocationsAgentsTools: API.PaginatedOperationMethod<
  ListProjectsLocationsAgentsToolsRequest,
  ListProjectsLocationsAgentsToolsResponse,
  ListProjectsLocationsAgentsToolsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsAgentsToolsRequest,
  output: ListProjectsLocationsAgentsToolsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentsToolsRequest {
  name: string;
}

export const GetProjectsLocationsAgentsToolsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools/{toolsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsAgentsToolsRequest>;

export type GetProjectsLocationsAgentsToolsResponse =
  GoogleCloudDialogflowCxV3Tool;
export const GetProjectsLocationsAgentsToolsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Tool;

export type GetProjectsLocationsAgentsToolsError = DefaultErrors;

export const getProjectsLocationsAgentsTools: API.OperationMethod<
  GetProjectsLocationsAgentsToolsRequest,
  GetProjectsLocationsAgentsToolsResponse,
  GetProjectsLocationsAgentsToolsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsAgentsToolsRequest,
  output: GetProjectsLocationsAgentsToolsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentsToolsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3Tool;
}

export const PatchProjectsLocationsAgentsToolsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(GoogleCloudDialogflowCxV3Tool).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools/{toolsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsAgentsToolsRequest>;

export type PatchProjectsLocationsAgentsToolsResponse =
  GoogleCloudDialogflowCxV3Tool;
export const PatchProjectsLocationsAgentsToolsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3Tool;

export type PatchProjectsLocationsAgentsToolsError = DefaultErrors;

export const patchProjectsLocationsAgentsTools: API.OperationMethod<
  PatchProjectsLocationsAgentsToolsRequest,
  PatchProjectsLocationsAgentsToolsResponse,
  PatchProjectsLocationsAgentsToolsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsAgentsToolsRequest,
  output: PatchProjectsLocationsAgentsToolsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsToolsRequest {
  name: string;
  force?: boolean;
}

export const DeleteProjectsLocationsAgentsToolsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools/{toolsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsToolsRequest>;

export type DeleteProjectsLocationsAgentsToolsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsToolsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsToolsError = DefaultErrors;

export const deleteProjectsLocationsAgentsTools: API.OperationMethod<
  DeleteProjectsLocationsAgentsToolsRequest,
  DeleteProjectsLocationsAgentsToolsResponse,
  DeleteProjectsLocationsAgentsToolsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsAgentsToolsRequest,
  output: DeleteProjectsLocationsAgentsToolsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentsToolsVersionsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentsToolsVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools/{toolsId}/versions",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsAgentsToolsVersionsRequest>;

export type ListProjectsLocationsAgentsToolsVersionsResponse =
  GoogleCloudDialogflowCxV3ListToolVersionsResponse;
export const ListProjectsLocationsAgentsToolsVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3ListToolVersionsResponse;

export type ListProjectsLocationsAgentsToolsVersionsError = DefaultErrors;

export const listProjectsLocationsAgentsToolsVersions: API.PaginatedOperationMethod<
  ListProjectsLocationsAgentsToolsVersionsRequest,
  ListProjectsLocationsAgentsToolsVersionsResponse,
  ListProjectsLocationsAgentsToolsVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
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
  body?: GoogleCloudDialogflowCxV3ToolVersion;
}

export const CreateProjectsLocationsAgentsToolsVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(GoogleCloudDialogflowCxV3ToolVersion).pipe(
      T.HttpBody(),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools/{toolsId}/versions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsAgentsToolsVersionsRequest>;

export type CreateProjectsLocationsAgentsToolsVersionsResponse =
  GoogleCloudDialogflowCxV3ToolVersion;
export const CreateProjectsLocationsAgentsToolsVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3ToolVersion;

export type CreateProjectsLocationsAgentsToolsVersionsError = DefaultErrors;

export const createProjectsLocationsAgentsToolsVersions: API.OperationMethod<
  CreateProjectsLocationsAgentsToolsVersionsRequest,
  CreateProjectsLocationsAgentsToolsVersionsResponse,
  CreateProjectsLocationsAgentsToolsVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsAgentsToolsVersionsRequest,
  output: CreateProjectsLocationsAgentsToolsVersionsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAgentsToolsVersionsRequest {
  name: string;
}

export const GetProjectsLocationsAgentsToolsVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools/{toolsId}/versions/{versionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsAgentsToolsVersionsRequest>;

export type GetProjectsLocationsAgentsToolsVersionsResponse =
  GoogleCloudDialogflowCxV3ToolVersion;
export const GetProjectsLocationsAgentsToolsVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3ToolVersion;

export type GetProjectsLocationsAgentsToolsVersionsError = DefaultErrors;

export const getProjectsLocationsAgentsToolsVersions: API.OperationMethod<
  GetProjectsLocationsAgentsToolsVersionsRequest,
  GetProjectsLocationsAgentsToolsVersionsResponse,
  GetProjectsLocationsAgentsToolsVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsAgentsToolsVersionsRequest,
  output: GetProjectsLocationsAgentsToolsVersionsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentsToolsVersionsRequest {
  name: string;
  force?: boolean;
}

export const DeleteProjectsLocationsAgentsToolsVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools/{toolsId}/versions/{versionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsAgentsToolsVersionsRequest>;

export type DeleteProjectsLocationsAgentsToolsVersionsResponse =
  GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentsToolsVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentsToolsVersionsError = DefaultErrors;

export const deleteProjectsLocationsAgentsToolsVersions: API.OperationMethod<
  DeleteProjectsLocationsAgentsToolsVersionsRequest,
  DeleteProjectsLocationsAgentsToolsVersionsResponse,
  DeleteProjectsLocationsAgentsToolsVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsAgentsToolsVersionsRequest,
  output: DeleteProjectsLocationsAgentsToolsVersionsResponse,
  errors: [],
}));

export interface RestoreProjectsLocationsAgentsToolsVersionsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowCxV3RestoreToolVersionRequest;
}

export const RestoreProjectsLocationsAgentsToolsVersionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(
      GoogleCloudDialogflowCxV3RestoreToolVersionRequest,
    ).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v3/projects/{projectsId}/locations/{locationsId}/agents/{agentsId}/tools/{toolsId}/versions/{versionsId}:restore",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RestoreProjectsLocationsAgentsToolsVersionsRequest>;

export type RestoreProjectsLocationsAgentsToolsVersionsResponse =
  GoogleCloudDialogflowCxV3RestoreToolVersionResponse;
export const RestoreProjectsLocationsAgentsToolsVersionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ GoogleCloudDialogflowCxV3RestoreToolVersionResponse;

export type RestoreProjectsLocationsAgentsToolsVersionsError = DefaultErrors;

export const restoreProjectsLocationsAgentsToolsVersions: API.OperationMethod<
  RestoreProjectsLocationsAgentsToolsVersionsRequest,
  RestoreProjectsLocationsAgentsToolsVersionsResponse,
  RestoreProjectsLocationsAgentsToolsVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RestoreProjectsLocationsAgentsToolsVersionsRequest,
  output: RestoreProjectsLocationsAgentsToolsVersionsResponse,
  errors: [],
}));
