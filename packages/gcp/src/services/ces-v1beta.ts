// ==========================================================================
// Gemini Enterprise for Customer Experience API (ces v1beta)
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
  name: "ces",
  version: "v1beta",
  rootUrl: "https://ces.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface ToolsetTool {
  /** Optional. The tool ID to filter the tools to retrieve the schema for. */
  toolId?: string;
  /** Required. The resource name of the Toolset from which this tool is derived. Format: `projects/{project}/locations/{location}/apps/{app}/toolsets/{toolset}` */
  toolset?: string;
}

export const ToolsetTool: Schema.Schema<ToolsetTool> = Schema.suspend(() =>
  Schema.Struct({
    toolId: Schema.optional(Schema.String),
    toolset: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "ToolsetTool" }) as any as Schema.Schema<ToolsetTool>;

export interface EvaluationResultSpanLatency {
  /** Output only. The toolset tool identifier. */
  toolset?: ToolsetTool;
  /** Output only. The resource name of the guardrail or tool spans. */
  resource?: string;
  /** Output only. The display name of the span. Applicable to tool and guardrail spans. */
  displayName?: string;
  /** Output only. The name of the LLM span. */
  model?: string;
  /** Output only. The type of span. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "TOOL"
    | "USER_CALLBACK"
    | "GUARDRAIL"
    | "LLM"
    | (string & {});
  /** Output only. The start time of span. */
  startTime?: string;
  /** Output only. The latency of span. */
  executionLatency?: string;
  /** Output only. The end time of span. */
  endTime?: string;
  /** Output only. The name of the user callback span. */
  callback?: string;
}

export const EvaluationResultSpanLatency: Schema.Schema<EvaluationResultSpanLatency> =
  Schema.suspend(() =>
    Schema.Struct({
      toolset: Schema.optional(ToolsetTool),
      resource: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      model: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
      startTime: Schema.optional(Schema.String),
      executionLatency: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      callback: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EvaluationResultSpanLatency",
  }) as any as Schema.Schema<EvaluationResultSpanLatency>;

export interface ChannelProfileWebWidgetConfigSecuritySettings {
  /** Optional. Indicates whether public access to the web widget is enabled. If `true`, the web widget will be publicly accessible. If `false`, the web widget must be integrated with your own authentication and authorization system to return valid credentials for accessing the CES agent. */
  enablePublicAccess?: boolean;
  /** Optional. The origins that are allowed to host the web widget. An origin is defined by RFC 6454. If empty, all origins are allowed. A maximum of 100 origins is allowed. Example: "https://example.com" */
  allowedOrigins?: Array<string>;
  /** Optional. Indicates whether reCAPTCHA verification for the web widget is enabled. */
  enableRecaptcha?: boolean;
  /** Optional. Indicates whether origin check for the web widget is enabled. If `true`, the web widget will check the origin of the website that loads the web widget and only allow it to be loaded in the same origin or any of the allowed origins. */
  enableOriginCheck?: boolean;
}

export const ChannelProfileWebWidgetConfigSecuritySettings: Schema.Schema<ChannelProfileWebWidgetConfigSecuritySettings> =
  Schema.suspend(() =>
    Schema.Struct({
      enablePublicAccess: Schema.optional(Schema.Boolean),
      allowedOrigins: Schema.optional(Schema.Array(Schema.String)),
      enableRecaptcha: Schema.optional(Schema.Boolean),
      enableOriginCheck: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ChannelProfileWebWidgetConfigSecuritySettings",
  }) as any as Schema.Schema<ChannelProfileWebWidgetConfigSecuritySettings>;

export interface ChannelProfileWebWidgetConfig {
  /** Optional. The title of the web widget. */
  webWidgetTitle?: string;
  /** Optional. The theme of the web widget. */
  theme?: "THEME_UNSPECIFIED" | "LIGHT" | "DARK" | (string & {});
  /** Optional. The security settings of the web widget. */
  securitySettings?: ChannelProfileWebWidgetConfigSecuritySettings;
  /** Optional. The modality of the web widget. */
  modality?:
    | "MODALITY_UNSPECIFIED"
    | "CHAT_AND_VOICE"
    | "VOICE_ONLY"
    | "CHAT_ONLY"
    | (string & {});
}

export const ChannelProfileWebWidgetConfig: Schema.Schema<ChannelProfileWebWidgetConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      webWidgetTitle: Schema.optional(Schema.String),
      theme: Schema.optional(Schema.String),
      securitySettings: Schema.optional(
        ChannelProfileWebWidgetConfigSecuritySettings,
      ),
      modality: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ChannelProfileWebWidgetConfig",
  }) as any as Schema.Schema<ChannelProfileWebWidgetConfig>;

export interface ChannelProfilePersonaProperty {
  /** Optional. The persona of the channel. */
  persona?: "UNKNOWN" | "CONCISE" | "CHATTY" | (string & {});
}

export const ChannelProfilePersonaProperty: Schema.Schema<ChannelProfilePersonaProperty> =
  Schema.suspend(() =>
    Schema.Struct({
      persona: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ChannelProfilePersonaProperty",
  }) as any as Schema.Schema<ChannelProfilePersonaProperty>;

export interface ChannelProfile {
  /** Optional. Whether to disable DTMF (dual-tone multi-frequency). */
  disableDtmf?: boolean;
  /** Optional. The type of the channel profile. */
  channelType?:
    | "UNKNOWN"
    | "WEB_UI"
    | "API"
    | "TWILIO"
    | "GOOGLE_TELEPHONY_PLATFORM"
    | "CONTACT_CENTER_AS_A_SERVICE"
    | "FIVE9"
    | "CONTACT_CENTER_INTEGRATION"
    | (string & {});
  /** Optional. The configuration for the web widget. */
  webWidgetConfig?: ChannelProfileWebWidgetConfig;
  /** Optional. The unique identifier of the channel profile. */
  profileId?: string;
  /** Optional. Whether to disable user barge-in control in the conversation. - **true**: User interruptions are disabled while the agent is speaking. - **false**: The agent retains automatic control over when the user can interrupt. */
  disableBargeInControl?: boolean;
  /** Optional. The persona property of the channel profile. */
  personaProperty?: ChannelProfilePersonaProperty;
  /** Optional. The noise suppression level of the channel profile. Available values are "low", "moderate", "high", "very_high". */
  noiseSuppressionLevel?: string;
}

export const ChannelProfile: Schema.Schema<ChannelProfile> = Schema.suspend(
  () =>
    Schema.Struct({
      disableDtmf: Schema.optional(Schema.Boolean),
      channelType: Schema.optional(Schema.String),
      webWidgetConfig: Schema.optional(ChannelProfileWebWidgetConfig),
      profileId: Schema.optional(Schema.String),
      disableBargeInControl: Schema.optional(Schema.Boolean),
      personaProperty: Schema.optional(ChannelProfilePersonaProperty),
      noiseSuppressionLevel: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ChannelProfile",
}) as any as Schema.Schema<ChannelProfile>;

export interface Deployment {
  /** Identifier. The resource name of the deployment. Format: `projects/{project}/locations/{location}/apps/{app}/deployments/{deployment}` */
  name?: string;
  /** Output only. Timestamp when this deployment was last updated. */
  updateTime?: string;
  /** Optional. The resource name of the app version to deploy. Format: `projects/{project}/locations/{location}/apps/{app}/versions/{version}` Use `projects/{project}/locations/{location}/apps/{app}/versions/-` to use the draft app. */
  appVersion?: string;
  /** Required. Display name of the deployment. */
  displayName?: string;
  /** Required. The channel profile used in the deployment. */
  channelProfile?: ChannelProfile;
  /** Output only. Timestamp when this deployment was created. */
  createTime?: string;
  /** Output only. Etag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes. */
  etag?: string;
}

export const Deployment: Schema.Schema<Deployment> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    updateTime: Schema.optional(Schema.String),
    appVersion: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
    channelProfile: Schema.optional(ChannelProfile),
    createTime: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Deployment" }) as any as Schema.Schema<Deployment>;

export interface Image {
  /** Required. The IANA standard MIME type of the source data. Supported image types includes: * image/png * image/jpeg * image/webp */
  mimeType?: string;
  /** Required. Raw bytes of the image. */
  data?: string;
}

export const Image: Schema.Schema<Image> = Schema.suspend(() =>
  Schema.Struct({
    mimeType: Schema.optional(Schema.String),
    data: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Image" }) as any as Schema.Schema<Image>;

export interface Blob {
  /** Required. Raw bytes of the blob. */
  data?: string;
  /** Required. The IANA standard MIME type of the source data. */
  mimeType?: string;
}

export const Blob: Schema.Schema<Blob> = Schema.suspend(() =>
  Schema.Struct({
    data: Schema.optional(Schema.String),
    mimeType: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Blob" }) as any as Schema.Schema<Blob>;

export interface AgentTransfer {
  /** Required. The agent to which the conversation is being transferred. The agent will handle the conversation from this point forward. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}` */
  targetAgent?: string;
  /** Output only. Display name of the agent. */
  displayName?: string;
}

export const AgentTransfer: Schema.Schema<AgentTransfer> = Schema.suspend(() =>
  Schema.Struct({
    targetAgent: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "AgentTransfer",
}) as any as Schema.Schema<AgentTransfer>;

export interface ToolCall {
  /** Optional. The unique identifier of the tool call. If populated, the client should return the execution result with the matching ID in ToolResponse. */
  id?: string;
  /** Output only. Display name of the tool. */
  displayName?: string;
  /** Optional. The input parameters and values for the tool in JSON object format. */
  args?: Record<string, unknown>;
  /** Optional. The toolset tool to execute. */
  toolsetTool?: ToolsetTool;
  /** Optional. The name of the tool to execute. Format: `projects/{project}/locations/{location}/apps/{app}/tools/{tool}` */
  tool?: string;
}

export const ToolCall: Schema.Schema<ToolCall> = Schema.suspend(() =>
  Schema.Struct({
    id: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
    args: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    toolsetTool: Schema.optional(ToolsetTool),
    tool: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "ToolCall" }) as any as Schema.Schema<ToolCall>;

export interface ToolResponse {
  /** Output only. Display name of the tool. */
  displayName?: string;
  /** Required. The tool execution result in JSON object format. Use "output" key to specify tool response and "error" key to specify error details (if any). If "output" and "error" keys are not specified, then whole "response" is treated as tool execution result. */
  response?: Record<string, unknown>;
  /** Optional. The toolset tool that got executed. */
  toolsetTool?: ToolsetTool;
  /** Optional. The name of the tool to execute. Format: `projects/{project}/locations/{location}/apps/{app}/tools/{tool}` */
  tool?: string;
  /** Optional. The matching ID of the tool call the response is for. */
  id?: string;
}

export const ToolResponse: Schema.Schema<ToolResponse> = Schema.suspend(() =>
  Schema.Struct({
    displayName: Schema.optional(Schema.String),
    response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    toolsetTool: Schema.optional(ToolsetTool),
    tool: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "ToolResponse",
}) as any as Schema.Schema<ToolResponse>;

export interface Chunk {
  /** Optional. Image data. */
  image?: Image;
  /** Optional. Blob data. */
  blob?: Blob;
  /** A struct represents variables that were updated in the conversation, keyed by variable names. */
  updatedVariables?: Record<string, unknown>;
  /** Optional. Transcript associated with the audio. */
  transcript?: string;
  /** Optional. Agent transfer event. */
  agentTransfer?: AgentTransfer;
  /** Optional. Custom payload data. */
  payload?: Record<string, unknown>;
  /** Optional. Tool execution request. */
  toolCall?: ToolCall;
  /** A struct represents default variables at the start of the conversation, keyed by variable names. */
  defaultVariables?: Record<string, unknown>;
  /** Optional. Tool execution response. */
  toolResponse?: ToolResponse;
  /** Optional. Text data. */
  text?: string;
}

export const Chunk: Schema.Schema<Chunk> = Schema.suspend(() =>
  Schema.Struct({
    image: Schema.optional(Image),
    blob: Schema.optional(Blob),
    updatedVariables: Schema.optional(
      Schema.Record(Schema.String, Schema.Unknown),
    ),
    transcript: Schema.optional(Schema.String),
    agentTransfer: Schema.optional(AgentTransfer),
    payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    toolCall: Schema.optional(ToolCall),
    defaultVariables: Schema.optional(
      Schema.Record(Schema.String, Schema.Unknown),
    ),
    toolResponse: Schema.optional(ToolResponse),
    text: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Chunk" }) as any as Schema.Schema<Chunk>;

export interface Message {
  /** Optional. Content of the message as a series of chunks. */
  chunks?: Array<Chunk>;
  /** Optional. The role within the conversation, e.g., user, agent. */
  role?: string;
  /** Optional. Timestamp when the message was sent or received. Should not be used if the message is part of an example. */
  eventTime?: string;
}

export const Message: Schema.Schema<Message> = Schema.suspend(() =>
  Schema.Struct({
    chunks: Schema.optional(Schema.Array(Chunk)),
    role: Schema.optional(Schema.String),
    eventTime: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Message" }) as any as Schema.Schema<Message>;

export interface SessionConfigRemoteDialogflowQueryParameters {
  /** Optional. The HTTP headers to be sent as webhook_headers in [QueryParameters](https://cloud.google.com/dialogflow/cx/docs/reference/rpc/google.cloud.dialogflow.cx.v3#queryparameters). */
  webhookHeaders?: Record<string, string>;
  /** Optional. The payload to be sent in [QueryParameters](https://cloud.google.com/dialogflow/cx/docs/reference/rpc/google.cloud.dialogflow.cx.v3#queryparameters). */
  payload?: Record<string, unknown>;
  /** Optional. The end user metadata to be sent in [QueryParameters](https://cloud.google.com/dialogflow/cx/docs/reference/rpc/google.cloud.dialogflow.cx.v3#queryparameters). */
  endUserMetadata?: Record<string, unknown>;
}

export const SessionConfigRemoteDialogflowQueryParameters: Schema.Schema<SessionConfigRemoteDialogflowQueryParameters> =
  Schema.suspend(() =>
    Schema.Struct({
      webhookHeaders: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      endUserMetadata: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
    }),
  ).annotate({
    identifier: "SessionConfigRemoteDialogflowQueryParameters",
  }) as any as Schema.Schema<SessionConfigRemoteDialogflowQueryParameters>;

export interface InputAudioConfig {
  /** Required. The encoding of the input audio data. */
  audioEncoding?:
    | "AUDIO_ENCODING_UNSPECIFIED"
    | "LINEAR16"
    | "MULAW"
    | "ALAW"
    | (string & {});
  /** Optional. Whether to enable noise suppression on the input audio. Available values are "low", "moderate", "high", "very_high". */
  noiseSuppressionLevel?: string;
  /** Required. The sample rate (in Hertz) of the input audio data. */
  sampleRateHertz?: number;
}

export const InputAudioConfig: Schema.Schema<InputAudioConfig> = Schema.suspend(
  () =>
    Schema.Struct({
      audioEncoding: Schema.optional(Schema.String),
      noiseSuppressionLevel: Schema.optional(Schema.String),
      sampleRateHertz: Schema.optional(Schema.Number),
    }),
).annotate({
  identifier: "InputAudioConfig",
}) as any as Schema.Schema<InputAudioConfig>;

export interface OutputAudioConfig {
  /** Required. The sample rate (in Hertz) of the output audio data. */
  sampleRateHertz?: number;
  /** Required. The encoding of the output audio data. */
  audioEncoding?:
    | "AUDIO_ENCODING_UNSPECIFIED"
    | "LINEAR16"
    | "MULAW"
    | "ALAW"
    | (string & {});
}

export const OutputAudioConfig: Schema.Schema<OutputAudioConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      sampleRateHertz: Schema.optional(Schema.Number),
      audioEncoding: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OutputAudioConfig",
  }) as any as Schema.Schema<OutputAudioConfig>;

export interface SessionConfig {
  /** Optional. The historical context of the session, including user inputs, agent responses, and other messages. Typically, CES agent would manage session automatically so client doesn't need to explicitly populate this field. However, client can optionally override the historical contexts to force the session start from certain state. */
  historicalContexts?: Array<Message>;
  /** Optional. The deployment of the app to use for the session. Format: `projects/{project}/locations/{location}/apps/{app}/deployments/{deployment}` */
  deployment?: string;
  /** Optional. The entry agent to handle the session. If not specified, the session will be handled by the root agent of the app. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}` */
  entryAgent?: string;
  /** Optional. [QueryParameters](https://cloud.google.com/dialogflow/cx/docs/reference/rpc/google.cloud.dialogflow.cx.v3#queryparameters) to send to the remote [Dialogflow](https://cloud.google.com/dialogflow/cx/docs/concept/console-conversational-agents) agent when the session control is transferred to the remote agent. */
  remoteDialogflowQueryParameters?: SessionConfigRemoteDialogflowQueryParameters;
  /** Optional. Configuration for processing the input audio. */
  inputAudioConfig?: InputAudioConfig;
  /** Optional. Whether to use tool fakes for the session. If this field is set, the agent will attempt use tool fakes instead of calling the real tools. */
  useToolFakes?: boolean;
  /** Optional. The time zone of the user. If provided, the agent will use the time zone for date and time related variables. Otherwise, the agent will use the time zone specified in the App.time_zone_settings. The format is the IANA Time Zone Database time zone, e.g. "America/Los_Angeles". */
  timeZone?: string;
  /** Optional. Configuration for generating the output audio. */
  outputAudioConfig?: OutputAudioConfig;
}

export const SessionConfig: Schema.Schema<SessionConfig> = Schema.suspend(() =>
  Schema.Struct({
    historicalContexts: Schema.optional(Schema.Array(Message)),
    deployment: Schema.optional(Schema.String),
    entryAgent: Schema.optional(Schema.String),
    remoteDialogflowQueryParameters: Schema.optional(
      SessionConfigRemoteDialogflowQueryParameters,
    ),
    inputAudioConfig: Schema.optional(InputAudioConfig),
    useToolFakes: Schema.optional(Schema.Boolean),
    timeZone: Schema.optional(Schema.String),
    outputAudioConfig: Schema.optional(OutputAudioConfig),
  }),
).annotate({
  identifier: "SessionConfig",
}) as any as Schema.Schema<SessionConfig>;

export interface EndUserAuthConfigOauth2JwtBearerConfig {
  /** Required. Subject parameter name to pass through. Must be in the format `$context.variables.`. */
  subject?: string;
  /** Required. Issuer parameter name to pass through. Must be in the format `$context.variables.`. */
  issuer?: string;
  /** Required. Client parameter name to pass through. Must be in the format `$context.variables.`. */
  clientKey?: string;
}

export const EndUserAuthConfigOauth2JwtBearerConfig: Schema.Schema<EndUserAuthConfigOauth2JwtBearerConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      subject: Schema.optional(Schema.String),
      issuer: Schema.optional(Schema.String),
      clientKey: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EndUserAuthConfigOauth2JwtBearerConfig",
  }) as any as Schema.Schema<EndUserAuthConfigOauth2JwtBearerConfig>;

export interface EvaluationScenarioUserFact {
  /** Required. The name of the user fact. */
  name?: string;
  /** Required. The value of the user fact. */
  value?: string;
}

export const EvaluationScenarioUserFact: Schema.Schema<EvaluationScenarioUserFact> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      value: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EvaluationScenarioUserFact",
  }) as any as Schema.Schema<EvaluationScenarioUserFact>;

export interface EvaluationScenarioExpectationToolExpectation {
  /** Required. The expected tool call, with the parameters of interest specified. Any parameters not specified will be hallucinated by the LLM. */
  expectedToolCall?: ToolCall;
  /** Required. The tool response to mock, with the parameters of interest specified. Any parameters not specified will be hallucinated by the LLM. */
  mockToolResponse?: ToolResponse;
}

export const EvaluationScenarioExpectationToolExpectation: Schema.Schema<EvaluationScenarioExpectationToolExpectation> =
  Schema.suspend(() =>
    Schema.Struct({
      expectedToolCall: Schema.optional(ToolCall),
      mockToolResponse: Schema.optional(ToolResponse),
    }),
  ).annotate({
    identifier: "EvaluationScenarioExpectationToolExpectation",
  }) as any as Schema.Schema<EvaluationScenarioExpectationToolExpectation>;

export interface EvaluationScenarioExpectation {
  /** Optional. The tool call and response pair to be evaluated. */
  toolExpectation?: EvaluationScenarioExpectationToolExpectation;
  /** Optional. The agent response to be evaluated. */
  agentResponse?: Message;
}

export const EvaluationScenarioExpectation: Schema.Schema<EvaluationScenarioExpectation> =
  Schema.suspend(() =>
    Schema.Struct({
      toolExpectation: Schema.optional(
        EvaluationScenarioExpectationToolExpectation,
      ),
      agentResponse: Schema.optional(Message),
    }),
  ).annotate({
    identifier: "EvaluationScenarioExpectation",
  }) as any as Schema.Schema<EvaluationScenarioExpectation>;

export interface EvaluationScenario {
  /** Optional. The maximum number of turns to simulate. If not specified, the simulation will continue until the task is complete. */
  maxTurns?: number;
  /** Optional. Deprecated. Use user_goal_behavior instead. */
  taskCompletionBehavior?:
    | "TASK_COMPLETION_BEHAVIOR_UNSPECIFIED"
    | "TASK_SATISFIED"
    | "TASK_REJECTED"
    | (string & {});
  /** Optional. The user facts to be used by the scenario. */
  userFacts?: Array<EvaluationScenarioUserFact>;
  /** Required. The rubrics to score the scenario against. */
  rubrics?: Array<string>;
  /** Optional. The evaluation expectations to evaluate the conversation produced by the simulation against. Format: `projects/{project}/locations/{location}/apps/{app}/evaluationExpectations/{evaluationExpectation}` */
  evaluationExpectations?: Array<string>;
  /** Required. The task to be targeted by the scenario. */
  task?: string;
  /** Optional. The expected behavior of the user goal. */
  userGoalBehavior?:
    | "USER_GOAL_BEHAVIOR_UNSPECIFIED"
    | "USER_GOAL_SATISFIED"
    | "USER_GOAL_REJECTED"
    | "USER_GOAL_IGNORED"
    | (string & {});
  /** Required. The ScenarioExpectations to evaluate the conversation produced by the user simulation. */
  scenarioExpectations?: Array<EvaluationScenarioExpectation>;
  /** Optional. Variables / Session Parameters as context for the session, keyed by variable names. Members of this struct will override any default values set by the system. Note, these are different from user facts, which are facts known to the user. Variables are parameters known to the agent: i.e. MDN (phone number) passed by the telephony system. */
  variableOverrides?: Record<string, unknown>;
}

export const EvaluationScenario: Schema.Schema<EvaluationScenario> =
  Schema.suspend(() =>
    Schema.Struct({
      maxTurns: Schema.optional(Schema.Number),
      taskCompletionBehavior: Schema.optional(Schema.String),
      userFacts: Schema.optional(Schema.Array(EvaluationScenarioUserFact)),
      rubrics: Schema.optional(Schema.Array(Schema.String)),
      evaluationExpectations: Schema.optional(Schema.Array(Schema.String)),
      task: Schema.optional(Schema.String),
      userGoalBehavior: Schema.optional(Schema.String),
      scenarioExpectations: Schema.optional(
        Schema.Array(EvaluationScenarioExpectation),
      ),
      variableOverrides: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
    }),
  ).annotate({
    identifier: "EvaluationScenario",
  }) as any as Schema.Schema<EvaluationScenario>;

export interface AggregatedMetricsHallucinationMetrics {
  /** Output only. The average hallucination score (0 to 1). */
  score?: number;
}

export const AggregatedMetricsHallucinationMetrics: Schema.Schema<AggregatedMetricsHallucinationMetrics> =
  Schema.suspend(() =>
    Schema.Struct({
      score: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "AggregatedMetricsHallucinationMetrics",
  }) as any as Schema.Schema<AggregatedMetricsHallucinationMetrics>;

export interface AggregatedMetricsToolMetrics {
  /** Output only. The number of times the tool passed. */
  passCount?: number;
  /** Output only. The number of times the tool failed. */
  failCount?: number;
  /** Output only. The name of the tool. */
  tool?: string;
}

export const AggregatedMetricsToolMetrics: Schema.Schema<AggregatedMetricsToolMetrics> =
  Schema.suspend(() =>
    Schema.Struct({
      passCount: Schema.optional(Schema.Number),
      failCount: Schema.optional(Schema.Number),
      tool: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AggregatedMetricsToolMetrics",
  }) as any as Schema.Schema<AggregatedMetricsToolMetrics>;

export interface AggregatedMetricsTurnLatencyMetrics {
  /** Output only. The average latency of the turns. */
  averageLatency?: string;
}

export const AggregatedMetricsTurnLatencyMetrics: Schema.Schema<AggregatedMetricsTurnLatencyMetrics> =
  Schema.suspend(() =>
    Schema.Struct({
      averageLatency: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AggregatedMetricsTurnLatencyMetrics",
  }) as any as Schema.Schema<AggregatedMetricsTurnLatencyMetrics>;

export interface AggregatedMetricsSemanticSimilarityMetrics {
  /** Output only. The average semantic similarity score (0-4). */
  score?: number;
}

export const AggregatedMetricsSemanticSimilarityMetrics: Schema.Schema<AggregatedMetricsSemanticSimilarityMetrics> =
  Schema.suspend(() =>
    Schema.Struct({
      score: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "AggregatedMetricsSemanticSimilarityMetrics",
  }) as any as Schema.Schema<AggregatedMetricsSemanticSimilarityMetrics>;

export interface AggregatedMetricsToolCallLatencyMetrics {
  /** Output only. The name of the tool. */
  tool?: string;
  /** Output only. The average latency of the tool calls. */
  averageLatency?: string;
}

export const AggregatedMetricsToolCallLatencyMetrics: Schema.Schema<AggregatedMetricsToolCallLatencyMetrics> =
  Schema.suspend(() =>
    Schema.Struct({
      tool: Schema.optional(Schema.String),
      averageLatency: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AggregatedMetricsToolCallLatencyMetrics",
  }) as any as Schema.Schema<AggregatedMetricsToolCallLatencyMetrics>;

export interface AggregatedMetricsMetricsByTurn {
  /** Output only. Metrics for each tool within this turn. */
  toolMetrics?: Array<AggregatedMetricsToolMetrics>;
  /** Output only. Metrics for semantic similarity within this turn. */
  semanticSimilarityMetrics?: Array<AggregatedMetricsSemanticSimilarityMetrics>;
  /** Output only. Metrics for tool call latency within this turn. */
  toolCallLatencyMetrics?: Array<AggregatedMetricsToolCallLatencyMetrics>;
  /** Output only. The turn index (0-based). */
  turnIndex?: number;
  /** Output only. Metrics for turn latency within this turn. */
  turnLatencyMetrics?: Array<AggregatedMetricsTurnLatencyMetrics>;
  /** Output only. Metrics for hallucination within this turn. */
  hallucinationMetrics?: Array<AggregatedMetricsHallucinationMetrics>;
}

export const AggregatedMetricsMetricsByTurn: Schema.Schema<AggregatedMetricsMetricsByTurn> =
  Schema.suspend(() =>
    Schema.Struct({
      toolMetrics: Schema.optional(Schema.Array(AggregatedMetricsToolMetrics)),
      semanticSimilarityMetrics: Schema.optional(
        Schema.Array(AggregatedMetricsSemanticSimilarityMetrics),
      ),
      toolCallLatencyMetrics: Schema.optional(
        Schema.Array(AggregatedMetricsToolCallLatencyMetrics),
      ),
      turnIndex: Schema.optional(Schema.Number),
      turnLatencyMetrics: Schema.optional(
        Schema.Array(AggregatedMetricsTurnLatencyMetrics),
      ),
      hallucinationMetrics: Schema.optional(
        Schema.Array(AggregatedMetricsHallucinationMetrics),
      ),
    }),
  ).annotate({
    identifier: "AggregatedMetricsMetricsByTurn",
  }) as any as Schema.Schema<AggregatedMetricsMetricsByTurn>;

export interface AggregatedMetricsMetricsByAppVersion {
  /** Output only. The number of times the evaluation passed. */
  passCount?: number;
  /** Output only. The app version ID. */
  appVersionId?: string;
  /** Output only. Metrics for hallucination within this app version. */
  hallucinationMetrics?: Array<AggregatedMetricsHallucinationMetrics>;
  /** Output only. Metrics for each tool within this app version. */
  toolMetrics?: Array<AggregatedMetricsToolMetrics>;
  /** Output only. Metrics for turn latency within this app version. */
  turnLatencyMetrics?: Array<AggregatedMetricsTurnLatencyMetrics>;
  /** Output only. The number of times the evaluation failed. */
  failCount?: number;
  /** Output only. Metrics aggregated per turn within this app version. */
  metricsByTurn?: Array<AggregatedMetricsMetricsByTurn>;
  /** Output only. Metrics for semantic similarity within this app version. */
  semanticSimilarityMetrics?: Array<AggregatedMetricsSemanticSimilarityMetrics>;
  /** Output only. Metrics for tool call latency within this app version. */
  toolCallLatencyMetrics?: Array<AggregatedMetricsToolCallLatencyMetrics>;
}

export const AggregatedMetricsMetricsByAppVersion: Schema.Schema<AggregatedMetricsMetricsByAppVersion> =
  Schema.suspend(() =>
    Schema.Struct({
      passCount: Schema.optional(Schema.Number),
      appVersionId: Schema.optional(Schema.String),
      hallucinationMetrics: Schema.optional(
        Schema.Array(AggregatedMetricsHallucinationMetrics),
      ),
      toolMetrics: Schema.optional(Schema.Array(AggregatedMetricsToolMetrics)),
      turnLatencyMetrics: Schema.optional(
        Schema.Array(AggregatedMetricsTurnLatencyMetrics),
      ),
      failCount: Schema.optional(Schema.Number),
      metricsByTurn: Schema.optional(
        Schema.Array(AggregatedMetricsMetricsByTurn),
      ),
      semanticSimilarityMetrics: Schema.optional(
        Schema.Array(AggregatedMetricsSemanticSimilarityMetrics),
      ),
      toolCallLatencyMetrics: Schema.optional(
        Schema.Array(AggregatedMetricsToolCallLatencyMetrics),
      ),
    }),
  ).annotate({
    identifier: "AggregatedMetricsMetricsByAppVersion",
  }) as any as Schema.Schema<AggregatedMetricsMetricsByAppVersion>;

export interface AggregatedMetrics {
  /** Output only. Aggregated metrics, grouped by app version ID. */
  metricsByAppVersion?: Array<AggregatedMetricsMetricsByAppVersion>;
}

export const AggregatedMetrics: Schema.Schema<AggregatedMetrics> =
  Schema.suspend(() =>
    Schema.Struct({
      metricsByAppVersion: Schema.optional(
        Schema.Array(AggregatedMetricsMetricsByAppVersion),
      ),
    }),
  ).annotate({
    identifier: "AggregatedMetrics",
  }) as any as Schema.Schema<AggregatedMetrics>;

export interface Span {
  /** Output only. The name of the span. */
  name?: string;
  /** Output only. The end time of the span. */
  endTime?: string;
  /** Output only. The child spans that are nested under this span. */
  childSpans?: Array<Span>;
  /** Output only. The duration of the span. */
  duration?: string;
  /** Output only. The start time of the span. */
  startTime?: string;
  /** Output only. Key-value attributes associated with the span. */
  attributes?: Record<string, unknown>;
}

export const Span: Schema.Schema<Span> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    childSpans: Schema.optional(Schema.Array(Span)),
    duration: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    attributes: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  }),
).annotate({ identifier: "Span" }) as any as Schema.Schema<Span>;

export interface Event {
  /** Required. The name of the event. */
  event?: string;
}

export const Event: Schema.Schema<Event> = Schema.suspend(() =>
  Schema.Struct({
    event: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Event" }) as any as Schema.Schema<Event>;

export interface ToolResponses {
  /** Optional. The list of tool execution results. */
  toolResponses?: Array<ToolResponse>;
}

export const ToolResponses: Schema.Schema<ToolResponses> = Schema.suspend(() =>
  Schema.Struct({
    toolResponses: Schema.optional(Schema.Array(ToolResponse)),
  }),
).annotate({
  identifier: "ToolResponses",
}) as any as Schema.Schema<ToolResponses>;

export interface SessionInput {
  /** Optional. Blob data from the end user. */
  blob?: Blob;
  /** Optional. Event input. */
  event?: Event;
  /** Optional. Contextual variables for the session, keyed by name. Only variables declared in the app will be used by the CES agent. Unrecognized variables will still be sent to the Dialogflow agent as additional session parameters. */
  variables?: Record<string, unknown>;
  /** Optional. A flag to indicate if the current message is a fragment of a larger input in the bidi streaming session. When set to `true`, the agent defers processing until it receives a subsequent message where `will_continue` is `false`, or until the system detects an endpoint in the audio input. NOTE: This field does not apply to audio and DTMF inputs, as they are always processed automatically based on the endpointing signal. */
  willContinue?: boolean;
  /** Optional. Execution results for the tool calls from the client. */
  toolResponses?: ToolResponses;
  /** Optional. Image data from the end user. */
  image?: Image;
  /** Optional. DTMF digits from the end user. */
  dtmf?: string;
  /** Optional. Audio data from the end user. */
  audio?: string;
  /** Optional. Text data from the end user. */
  text?: string;
}

export const SessionInput: Schema.Schema<SessionInput> = Schema.suspend(() =>
  Schema.Struct({
    blob: Schema.optional(Blob),
    event: Schema.optional(Event),
    variables: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    willContinue: Schema.optional(Schema.Boolean),
    toolResponses: Schema.optional(ToolResponses),
    image: Schema.optional(Image),
    dtmf: Schema.optional(Schema.String),
    audio: Schema.optional(Schema.String),
    text: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "SessionInput",
}) as any as Schema.Schema<SessionInput>;

export interface EvaluationGoldenExpectation {
  /** Optional. Check that the agent transferred the conversation to a different agent. */
  agentTransfer?: AgentTransfer;
  /** Optional. Check that a specific tool was called with the parameters. */
  toolCall?: ToolCall;
  /** Optional. Check that a specific tool had the expected response. */
  toolResponse?: ToolResponse;
  /** Optional. Check that the agent updated the session variables to the expected values. Used to also capture agent variable updates for golden evals. */
  updatedVariables?: Record<string, unknown>;
  /** Optional. The tool response to mock, with the parameters of interest specified. Any parameters not specified will be hallucinated by the LLM. */
  mockToolResponse?: ToolResponse;
  /** Optional. Check that the agent responded with the correct response. The role "agent" is implied. */
  agentResponse?: Message;
  /** Optional. A note for this requirement, useful in reporting when specific checks fail. E.g., "Check_Payment_Tool_Called". */
  note?: string;
}

export const EvaluationGoldenExpectation: Schema.Schema<EvaluationGoldenExpectation> =
  Schema.suspend(() =>
    Schema.Struct({
      agentTransfer: Schema.optional(AgentTransfer),
      toolCall: Schema.optional(ToolCall),
      toolResponse: Schema.optional(ToolResponse),
      updatedVariables: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      mockToolResponse: Schema.optional(ToolResponse),
      agentResponse: Schema.optional(Message),
      note: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EvaluationGoldenExpectation",
  }) as any as Schema.Schema<EvaluationGoldenExpectation>;

export interface EvaluationStep {
  /** Optional. User input for the conversation. */
  userInput?: SessionInput;
  /** Optional. Executes an expectation on the current turn. */
  expectation?: EvaluationGoldenExpectation;
  /** Optional. Transfer the conversation to a different agent. */
  agentTransfer?: AgentTransfer;
}

export const EvaluationStep: Schema.Schema<EvaluationStep> = Schema.suspend(
  () =>
    Schema.Struct({
      userInput: Schema.optional(SessionInput),
      expectation: Schema.optional(EvaluationGoldenExpectation),
      agentTransfer: Schema.optional(AgentTransfer),
    }),
).annotate({
  identifier: "EvaluationStep",
}) as any as Schema.Schema<EvaluationStep>;

export interface EvaluationGoldenTurn {
  /** Optional. The root span of the golden turn for processing and maintaining audio information. */
  rootSpan?: Span;
  /** Required. The steps required to replay a golden conversation. */
  steps?: Array<EvaluationStep>;
}

export const EvaluationGoldenTurn: Schema.Schema<EvaluationGoldenTurn> =
  Schema.suspend(() =>
    Schema.Struct({
      rootSpan: Schema.optional(Span),
      steps: Schema.optional(Schema.Array(EvaluationStep)),
    }),
  ).annotate({
    identifier: "EvaluationGoldenTurn",
  }) as any as Schema.Schema<EvaluationGoldenTurn>;

export interface EvaluationGolden {
  /** Required. The golden turns required to replay a golden conversation. */
  turns?: Array<EvaluationGoldenTurn>;
  /** Optional. The evaluation expectations to evaluate the replayed conversation against. Format: `projects/{project}/locations/{location}/apps/{app}/evaluationExpectations/{evaluationExpectation}` */
  evaluationExpectations?: Array<string>;
}

export const EvaluationGolden: Schema.Schema<EvaluationGolden> = Schema.suspend(
  () =>
    Schema.Struct({
      turns: Schema.optional(Schema.Array(EvaluationGoldenTurn)),
      evaluationExpectations: Schema.optional(Schema.Array(Schema.String)),
    }),
).annotate({
  identifier: "EvaluationGolden",
}) as any as Schema.Schema<EvaluationGolden>;

export interface EvaluationResultEvaluationExpectationResult {
  /** Output only. The explanation for the result. */
  explanation?: string;
  /** Output only. The evaluation expectation. Format: `projects/{project}/locations/{location}/apps/{app}/evaluationExpectations/{evaluation_expectation}` */
  evaluationExpectation?: string;
  /** Output only. The outcome of the evaluation expectation. */
  outcome?: "OUTCOME_UNSPECIFIED" | "PASS" | "FAIL" | (string & {});
  /** Output only. The prompt that was used for the evaluation. */
  prompt?: string;
}

export const EvaluationResultEvaluationExpectationResult: Schema.Schema<EvaluationResultEvaluationExpectationResult> =
  Schema.suspend(() =>
    Schema.Struct({
      explanation: Schema.optional(Schema.String),
      evaluationExpectation: Schema.optional(Schema.String),
      outcome: Schema.optional(Schema.String),
      prompt: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EvaluationResultEvaluationExpectationResult",
  }) as any as Schema.Schema<EvaluationResultEvaluationExpectationResult>;

export interface EvaluationResultSemanticSimilarityResult {
  /** Output only. The semantic similarity score. Can be 0, 1, 2, 3, or 4. */
  score?: number;
  /** Output only. The explanation for the semantic similarity score. */
  explanation?: string;
  /** Output only. The label associated with each score. Score 4: Fully Consistent Score 3: Mostly Consistent Score 2: Partially Consistent (Minor Omissions) Score 1: Largely Inconsistent (Major Omissions) Score 0: Completely Inconsistent / Contradictory */
  label?: string;
  /** Output only. The outcome of the semantic similarity check. This is determined by comparing the score to the semantic_similarity_success_threshold. If the score is equal to or above the threshold, the outcome will be PASS. Otherwise, the outcome will be FAIL. */
  outcome?: "OUTCOME_UNSPECIFIED" | "PASS" | "FAIL" | (string & {});
}

export const EvaluationResultSemanticSimilarityResult: Schema.Schema<EvaluationResultSemanticSimilarityResult> =
  Schema.suspend(() =>
    Schema.Struct({
      score: Schema.optional(Schema.Number),
      explanation: Schema.optional(Schema.String),
      label: Schema.optional(Schema.String),
      outcome: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EvaluationResultSemanticSimilarityResult",
  }) as any as Schema.Schema<EvaluationResultSemanticSimilarityResult>;

export interface EvaluationErrorInfo {
  /** Output only. The session ID for the conversation that caused the error. */
  sessionId?: string;
  /** Output only. The type of error. */
  errorType?:
    | "ERROR_TYPE_UNSPECIFIED"
    | "RUNTIME_FAILURE"
    | "CONVERSATION_RETRIEVAL_FAILURE"
    | "METRIC_CALCULATION_FAILURE"
    | "EVALUATION_UPDATE_FAILURE"
    | "QUOTA_EXHAUSTED"
    | "USER_SIMULATION_FAILURE"
    | (string & {});
  /** Output only. The error message. */
  errorMessage?: string;
}

export const EvaluationErrorInfo: Schema.Schema<EvaluationErrorInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      sessionId: Schema.optional(Schema.String),
      errorType: Schema.optional(Schema.String),
      errorMessage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EvaluationErrorInfo",
  }) as any as Schema.Schema<EvaluationErrorInfo>;

export interface EvaluationResultToolCallLatency {
  /** Output only. The start time of the tool call execution. */
  startTime?: string;
  /** Output only. The name of the tool that got executed. Format: `projects/{project}/locations/{location}/apps/{app}/tools/{tool}`. */
  tool?: string;
  /** Output only. The latency of the tool call execution. */
  executionLatency?: string;
  /** Output only. The display name of the tool. */
  displayName?: string;
  /** Output only. The end time of the tool call execution. */
  endTime?: string;
}

export const EvaluationResultToolCallLatency: Schema.Schema<EvaluationResultToolCallLatency> =
  Schema.suspend(() =>
    Schema.Struct({
      startTime: Schema.optional(Schema.String),
      tool: Schema.optional(Schema.String),
      executionLatency: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EvaluationResultToolCallLatency",
  }) as any as Schema.Schema<EvaluationResultToolCallLatency>;

export interface EvaluationResultHallucinationResult {
  /** Output only. The explanation for the hallucination score. */
  explanation?: string;
  /** Output only. The hallucination score. Can be -1, 0, 1. */
  score?: number;
  /** Output only. The label associated with each score. Score 1: Justified Score 0: Not Justified Score -1: No Claim To Assess */
  label?: string;
}

export const EvaluationResultHallucinationResult: Schema.Schema<EvaluationResultHallucinationResult> =
  Schema.suspend(() =>
    Schema.Struct({
      explanation: Schema.optional(Schema.String),
      score: Schema.optional(Schema.Number),
      label: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EvaluationResultHallucinationResult",
  }) as any as Schema.Schema<EvaluationResultHallucinationResult>;

export interface EvaluationResultGoldenExpectationOutcomeToolInvocationResult {
  /** Output only. The tool invocation parameter correctness score. This indicates the percent of parameters from the expected tool call that were also present in the actual tool call. */
  parameterCorrectnessScore?: number;
  /** Output only. A free text explanation for the tool invocation result. */
  explanation?: string;
  /** Output only. The outcome of the tool invocation check. This is determined by comparing the parameter_correctness_score to the threshold. If the score is equal to or above the threshold, the outcome will be PASS. Otherwise, the outcome will be FAIL. */
  outcome?: "OUTCOME_UNSPECIFIED" | "PASS" | "FAIL" | (string & {});
}

export const EvaluationResultGoldenExpectationOutcomeToolInvocationResult: Schema.Schema<EvaluationResultGoldenExpectationOutcomeToolInvocationResult> =
  Schema.suspend(() =>
    Schema.Struct({
      parameterCorrectnessScore: Schema.optional(Schema.Number),
      explanation: Schema.optional(Schema.String),
      outcome: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EvaluationResultGoldenExpectationOutcomeToolInvocationResult",
  }) as any as Schema.Schema<EvaluationResultGoldenExpectationOutcomeToolInvocationResult>;

export interface EvaluationResultGoldenExpectationOutcome {
  /** Output only. The outcome of the expectation. */
  outcome?: "OUTCOME_UNSPECIFIED" | "PASS" | "FAIL" | (string & {});
  /** Output only. The result of the agent response expectation. */
  observedAgentResponse?: Message;
  /** Output only. The expectation that was evaluated. */
  expectation?: EvaluationGoldenExpectation;
  /** Output only. The result of the agent transfer expectation. */
  observedAgentTransfer?: AgentTransfer;
  /** Output only. The result of the semantic similarity check. */
  semanticSimilarityResult?: EvaluationResultSemanticSimilarityResult;
  /** Output only. The result of the tool call expectation. */
  observedToolCall?: ToolCall;
  /** Output only. The result of the tool invocation check. */
  toolInvocationResult?: EvaluationResultGoldenExpectationOutcomeToolInvocationResult;
  /** Output only. The result of the tool response expectation. */
  observedToolResponse?: ToolResponse;
}

export const EvaluationResultGoldenExpectationOutcome: Schema.Schema<EvaluationResultGoldenExpectationOutcome> =
  Schema.suspend(() =>
    Schema.Struct({
      outcome: Schema.optional(Schema.String),
      observedAgentResponse: Schema.optional(Message),
      expectation: Schema.optional(EvaluationGoldenExpectation),
      observedAgentTransfer: Schema.optional(AgentTransfer),
      semanticSimilarityResult: Schema.optional(
        EvaluationResultSemanticSimilarityResult,
      ),
      observedToolCall: Schema.optional(ToolCall),
      toolInvocationResult: Schema.optional(
        EvaluationResultGoldenExpectationOutcomeToolInvocationResult,
      ),
      observedToolResponse: Schema.optional(ToolResponse),
    }),
  ).annotate({
    identifier: "EvaluationResultGoldenExpectationOutcome",
  }) as any as Schema.Schema<EvaluationResultGoldenExpectationOutcome>;

export interface EvaluationResultOverallToolInvocationResult {
  /** Output only. The outcome of the tool invocation check. This is determined by comparing the tool_invocation_score to the overall_tool_invocation_correctness_threshold. If the score is equal to or above the threshold, the outcome will be PASS. Otherwise, the outcome will be FAIL. */
  outcome?: "OUTCOME_UNSPECIFIED" | "PASS" | "FAIL" | (string & {});
  /** The overall tool invocation score for this turn. This indicates the overall percent of tools from the expected turn that were actually invoked. */
  toolInvocationScore?: number;
}

export const EvaluationResultOverallToolInvocationResult: Schema.Schema<EvaluationResultOverallToolInvocationResult> =
  Schema.suspend(() =>
    Schema.Struct({
      outcome: Schema.optional(Schema.String),
      toolInvocationScore: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "EvaluationResultOverallToolInvocationResult",
  }) as any as Schema.Schema<EvaluationResultOverallToolInvocationResult>;

export interface EvaluationResultGoldenResultTurnReplayResult {
  /** Output only. Deprecated. Use OverallToolInvocationResult instead. */
  toolInvocationScore?: number;
  /** Output only. The result of the semantic similarity check. */
  semanticSimilarityResult?: EvaluationResultSemanticSimilarityResult;
  /** Output only. Information about the error that occurred during this turn. */
  errorInfo?: EvaluationErrorInfo;
  /** Output only. The latency of each tool call in the turn. */
  toolCallLatencies?: Array<EvaluationResultToolCallLatency>;
  /** Output only. The result of the hallucination check. */
  hallucinationResult?: EvaluationResultHallucinationResult;
  /** Output only. The outcome of each expectation. */
  expectationOutcome?: Array<EvaluationResultGoldenExpectationOutcome>;
  /** Output only. The latency of spans in the turn. */
  spanLatencies?: Array<EvaluationResultSpanLatency>;
  /** Output only. Duration of the turn. */
  turnLatency?: string;
  /** Output only. The conversation that was generated for this turn. */
  conversation?: string;
  /** Output only. The result of the overall tool invocation check. */
  overallToolInvocationResult?: EvaluationResultOverallToolInvocationResult;
  /** Output only. The overall tool ordered invocation score for this turn. This indicates the overall percent of tools from the expected turn that were actually invoked in the expected order. */
  toolOrderedInvocationScore?: number;
}

export const EvaluationResultGoldenResultTurnReplayResult: Schema.Schema<EvaluationResultGoldenResultTurnReplayResult> =
  Schema.suspend(() =>
    Schema.Struct({
      toolInvocationScore: Schema.optional(Schema.Number),
      semanticSimilarityResult: Schema.optional(
        EvaluationResultSemanticSimilarityResult,
      ),
      errorInfo: Schema.optional(EvaluationErrorInfo),
      toolCallLatencies: Schema.optional(
        Schema.Array(EvaluationResultToolCallLatency),
      ),
      hallucinationResult: Schema.optional(EvaluationResultHallucinationResult),
      expectationOutcome: Schema.optional(
        Schema.Array(EvaluationResultGoldenExpectationOutcome),
      ),
      spanLatencies: Schema.optional(Schema.Array(EvaluationResultSpanLatency)),
      turnLatency: Schema.optional(Schema.String),
      conversation: Schema.optional(Schema.String),
      overallToolInvocationResult: Schema.optional(
        EvaluationResultOverallToolInvocationResult,
      ),
      toolOrderedInvocationScore: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "EvaluationResultGoldenResultTurnReplayResult",
  }) as any as Schema.Schema<EvaluationResultGoldenResultTurnReplayResult>;

export interface EvaluationResultGoldenResult {
  /** Output only. The results of the evaluation expectations. */
  evaluationExpectationResults?: Array<EvaluationResultEvaluationExpectationResult>;
  /** Output only. The result of running each turn of the golden conversation. */
  turnReplayResults?: Array<EvaluationResultGoldenResultTurnReplayResult>;
}

export const EvaluationResultGoldenResult: Schema.Schema<EvaluationResultGoldenResult> =
  Schema.suspend(() =>
    Schema.Struct({
      evaluationExpectationResults: Schema.optional(
        Schema.Array(EvaluationResultEvaluationExpectationResult),
      ),
      turnReplayResults: Schema.optional(
        Schema.Array(EvaluationResultGoldenResultTurnReplayResult),
      ),
    }),
  ).annotate({
    identifier: "EvaluationResultGoldenResult",
  }) as any as Schema.Schema<EvaluationResultGoldenResult>;

export interface EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholdsTurnLevelMetricsThresholds {
  /** Optional. The success threshold for overall tool invocation correctness. Must be a float between 0 and 1. Default is 1.0. */
  overallToolInvocationCorrectnessThreshold?: number;
  /** Optional. The success threshold for semantic similarity. Must be an integer between 0 and 4. Default is >= 3. */
  semanticSimilaritySuccessThreshold?: number;
  /** Optional. The semantic similarity channel to use for evaluation. */
  semanticSimilarityChannel?:
    | "SEMANTIC_SIMILARITY_CHANNEL_UNSPECIFIED"
    | "TEXT"
    | "AUDIO"
    | (string & {});
}

export const EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholdsTurnLevelMetricsThresholds: Schema.Schema<EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholdsTurnLevelMetricsThresholds> =
  Schema.suspend(() =>
    Schema.Struct({
      overallToolInvocationCorrectnessThreshold: Schema.optional(Schema.Number),
      semanticSimilaritySuccessThreshold: Schema.optional(Schema.Number),
      semanticSimilarityChannel: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholdsTurnLevelMetricsThresholds",
  }) as any as Schema.Schema<EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholdsTurnLevelMetricsThresholds>;

export interface EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholdsExpectationLevelMetricsThresholds {
  /** Optional. The success threshold for individual tool invocation parameter correctness. Must be a float between 0 and 1. Default is 1.0. */
  toolInvocationParameterCorrectnessThreshold?: number;
}

export const EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholdsExpectationLevelMetricsThresholds: Schema.Schema<EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholdsExpectationLevelMetricsThresholds> =
  Schema.suspend(() =>
    Schema.Struct({
      toolInvocationParameterCorrectnessThreshold: Schema.optional(
        Schema.Number,
      ),
    }),
  ).annotate({
    identifier:
      "EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholdsExpectationLevelMetricsThresholds",
  }) as any as Schema.Schema<EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholdsExpectationLevelMetricsThresholds>;

export interface EvaluationMetricsThresholdsToolMatchingSettings {
  /** Optional. Behavior for extra tool calls. Defaults to FAIL. */
  extraToolCallBehavior?:
    | "EXTRA_TOOL_CALL_BEHAVIOR_UNSPECIFIED"
    | "FAIL"
    | "ALLOW"
    | (string & {});
}

export const EvaluationMetricsThresholdsToolMatchingSettings: Schema.Schema<EvaluationMetricsThresholdsToolMatchingSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      extraToolCallBehavior: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EvaluationMetricsThresholdsToolMatchingSettings",
  }) as any as Schema.Schema<EvaluationMetricsThresholdsToolMatchingSettings>;

export interface EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholds {
  /** Optional. The turn level metrics thresholds. */
  turnLevelMetricsThresholds?: EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholdsTurnLevelMetricsThresholds;
  /** Optional. The expectation level metrics thresholds. */
  expectationLevelMetricsThresholds?: EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholdsExpectationLevelMetricsThresholds;
  /** Optional. The tool matching settings. An extra tool call is a tool call that is present in the execution but does not match any tool call in the golden expectation. */
  toolMatchingSettings?: EvaluationMetricsThresholdsToolMatchingSettings;
}

export const EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholds: Schema.Schema<EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholds> =
  Schema.suspend(() =>
    Schema.Struct({
      turnLevelMetricsThresholds: Schema.optional(
        EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholdsTurnLevelMetricsThresholds,
      ),
      expectationLevelMetricsThresholds: Schema.optional(
        EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholdsExpectationLevelMetricsThresholds,
      ),
      toolMatchingSettings: Schema.optional(
        EvaluationMetricsThresholdsToolMatchingSettings,
      ),
    }),
  ).annotate({
    identifier: "EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholds",
  }) as any as Schema.Schema<EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholds>;

export interface EvaluationMetricsThresholds {
  /** Optional. The golden evaluation metrics thresholds. */
  goldenEvaluationMetricsThresholds?: EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholds;
  /** Optional. Deprecated: Use `golden_hallucination_metric_behavior` instead. The hallucination metric behavior is currently used for golden evaluations. */
  hallucinationMetricBehavior?:
    | "HALLUCINATION_METRIC_BEHAVIOR_UNSPECIFIED"
    | "DISABLED"
    | "ENABLED"
    | (string & {});
  /** Optional. The hallucination metric behavior for golden evaluations. */
  goldenHallucinationMetricBehavior?:
    | "HALLUCINATION_METRIC_BEHAVIOR_UNSPECIFIED"
    | "DISABLED"
    | "ENABLED"
    | (string & {});
  /** Optional. The hallucination metric behavior for scenario evaluations. */
  scenarioHallucinationMetricBehavior?:
    | "HALLUCINATION_METRIC_BEHAVIOR_UNSPECIFIED"
    | "DISABLED"
    | "ENABLED"
    | (string & {});
}

export const EvaluationMetricsThresholds: Schema.Schema<EvaluationMetricsThresholds> =
  Schema.suspend(() =>
    Schema.Struct({
      goldenEvaluationMetricsThresholds: Schema.optional(
        EvaluationMetricsThresholdsGoldenEvaluationMetricsThresholds,
      ),
      hallucinationMetricBehavior: Schema.optional(Schema.String),
      goldenHallucinationMetricBehavior: Schema.optional(Schema.String),
      scenarioHallucinationMetricBehavior: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EvaluationMetricsThresholds",
  }) as any as Schema.Schema<EvaluationMetricsThresholds>;

export interface EvaluationResultTaskCompletionResult {
  /** Output only. The task completion score. Can be -1, 0, 1 */
  score?: number;
  /** Output only. The explanation for the task completion score. */
  explanation?: string;
  /** Output only. The label associated with each score. Score 1: Task Completed Score 0: Task Not Completed Score -1: User Goal Undefined */
  label?: string;
}

export const EvaluationResultTaskCompletionResult: Schema.Schema<EvaluationResultTaskCompletionResult> =
  Schema.suspend(() =>
    Schema.Struct({
      score: Schema.optional(Schema.Number),
      explanation: Schema.optional(Schema.String),
      label: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EvaluationResultTaskCompletionResult",
  }) as any as Schema.Schema<EvaluationResultTaskCompletionResult>;

export interface EvaluationResultScenarioRubricOutcome {
  /** Output only. The score of the conversation against the rubric. */
  score?: number;
  /** Output only. The rater's response to the rubric. */
  scoreExplanation?: string;
  /** Output only. The rubric that was used to evaluate the conversation. */
  rubric?: string;
}

export const EvaluationResultScenarioRubricOutcome: Schema.Schema<EvaluationResultScenarioRubricOutcome> =
  Schema.suspend(() =>
    Schema.Struct({
      score: Schema.optional(Schema.Number),
      scoreExplanation: Schema.optional(Schema.String),
      rubric: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EvaluationResultScenarioRubricOutcome",
  }) as any as Schema.Schema<EvaluationResultScenarioRubricOutcome>;

export interface EvaluationResultUserGoalSatisfactionResult {
  /** Output only. The label associated with each score. Score 1: User Task Satisfied Score 0: User Task Not Satisfied Score -1: User Task Unspecified */
  label?: string;
  /** Output only. The explanation for the user task satisfaction score. */
  explanation?: string;
  /** Output only. The user task satisfaction score. Can be -1, 0, 1. */
  score?: number;
}

export const EvaluationResultUserGoalSatisfactionResult: Schema.Schema<EvaluationResultUserGoalSatisfactionResult> =
  Schema.suspend(() =>
    Schema.Struct({
      label: Schema.optional(Schema.String),
      explanation: Schema.optional(Schema.String),
      score: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "EvaluationResultUserGoalSatisfactionResult",
  }) as any as Schema.Schema<EvaluationResultUserGoalSatisfactionResult>;

export interface EvaluationResultScenarioExpectationOutcomeObservedToolCall {
  /** Output only. The observed tool response. */
  toolResponse?: ToolResponse;
  /** Output only. The observed tool call. */
  toolCall?: ToolCall;
}

export const EvaluationResultScenarioExpectationOutcomeObservedToolCall: Schema.Schema<EvaluationResultScenarioExpectationOutcomeObservedToolCall> =
  Schema.suspend(() =>
    Schema.Struct({
      toolResponse: Schema.optional(ToolResponse),
      toolCall: Schema.optional(ToolCall),
    }),
  ).annotate({
    identifier: "EvaluationResultScenarioExpectationOutcomeObservedToolCall",
  }) as any as Schema.Schema<EvaluationResultScenarioExpectationOutcomeObservedToolCall>;

export interface EvaluationResultScenarioExpectationOutcome {
  /** Output only. The expectation that was evaluated. */
  expectation?: EvaluationScenarioExpectation;
  /** Output only. The outcome of the ScenarioExpectation. */
  outcome?: "OUTCOME_UNSPECIFIED" | "PASS" | "FAIL" | (string & {});
  /** Output only. The observed tool call. */
  observedToolCall?: EvaluationResultScenarioExpectationOutcomeObservedToolCall;
  /** Output only. The observed agent response. */
  observedAgentResponse?: Message;
}

export const EvaluationResultScenarioExpectationOutcome: Schema.Schema<EvaluationResultScenarioExpectationOutcome> =
  Schema.suspend(() =>
    Schema.Struct({
      expectation: Schema.optional(EvaluationScenarioExpectation),
      outcome: Schema.optional(Schema.String),
      observedToolCall: Schema.optional(
        EvaluationResultScenarioExpectationOutcomeObservedToolCall,
      ),
      observedAgentResponse: Schema.optional(Message),
    }),
  ).annotate({
    identifier: "EvaluationResultScenarioExpectationOutcome",
  }) as any as Schema.Schema<EvaluationResultScenarioExpectationOutcome>;

export interface EvaluationResultScenarioResult {
  /** Output only. The user facts that were used by the scenario for this result. */
  userFacts?: Array<EvaluationScenarioUserFact>;
  /** Output only. Whether all expectations were satisfied for this turn. */
  allExpectationsSatisfied?: boolean;
  /** Output only. Whether the task was completed for this turn. This is a composite of all expectations satisfied, no hallucinations, and user goal satisfaction. */
  taskCompleted?: boolean;
  /** Output only. The conversation that was generated in the scenario. */
  conversation?: string;
  /** Output only. The result of the task completion check. */
  taskCompletionResult?: EvaluationResultTaskCompletionResult;
  /** Output only. The outcome of the rubric. */
  rubricOutcomes?: Array<EvaluationResultScenarioRubricOutcome>;
  /** Output only. The task that was used when running the scenario for this result. */
  task?: string;
  /** Output only. The results of the evaluation expectations. */
  evaluationExpectationResults?: Array<EvaluationResultEvaluationExpectationResult>;
  /** Output only. The latency of each tool call execution in the conversation. */
  toolCallLatencies?: Array<EvaluationResultToolCallLatency>;
  /** Output only. The result of the hallucination check. There will be one hallucination result for each turn in the conversation. */
  hallucinationResult?: Array<EvaluationResultHallucinationResult>;
  /** Output only. The result of the user goal satisfaction check. */
  userGoalSatisfactionResult?: EvaluationResultUserGoalSatisfactionResult;
  /** Output only. The outcome of each expectation. */
  expectationOutcomes?: Array<EvaluationResultScenarioExpectationOutcome>;
  /** Output only. The latency of spans in the conversation. */
  spanLatencies?: Array<EvaluationResultSpanLatency>;
}

export const EvaluationResultScenarioResult: Schema.Schema<EvaluationResultScenarioResult> =
  Schema.suspend(() =>
    Schema.Struct({
      userFacts: Schema.optional(Schema.Array(EvaluationScenarioUserFact)),
      allExpectationsSatisfied: Schema.optional(Schema.Boolean),
      taskCompleted: Schema.optional(Schema.Boolean),
      conversation: Schema.optional(Schema.String),
      taskCompletionResult: Schema.optional(
        EvaluationResultTaskCompletionResult,
      ),
      rubricOutcomes: Schema.optional(
        Schema.Array(EvaluationResultScenarioRubricOutcome),
      ),
      task: Schema.optional(Schema.String),
      evaluationExpectationResults: Schema.optional(
        Schema.Array(EvaluationResultEvaluationExpectationResult),
      ),
      toolCallLatencies: Schema.optional(
        Schema.Array(EvaluationResultToolCallLatency),
      ),
      hallucinationResult: Schema.optional(
        Schema.Array(EvaluationResultHallucinationResult),
      ),
      userGoalSatisfactionResult: Schema.optional(
        EvaluationResultUserGoalSatisfactionResult,
      ),
      expectationOutcomes: Schema.optional(
        Schema.Array(EvaluationResultScenarioExpectationOutcome),
      ),
      spanLatencies: Schema.optional(Schema.Array(EvaluationResultSpanLatency)),
    }),
  ).annotate({
    identifier: "EvaluationResultScenarioResult",
  }) as any as Schema.Schema<EvaluationResultScenarioResult>;

export interface EvaluationPersonaSpeechConfig {
  /** Optional. The specific voice identifier/accent to use. Example: "en-US-Wavenet-D" or "en-GB-Standard-A" */
  voiceId?: string;
  /** Optional. The speaking rate. 1.0 is normal. Lower is slower (e.g., 0.8), higher is faster (e.g., 1.5). Useful for testing how the agent handles fast talkers. */
  speakingRate?: number;
  /** Optional. The simulated audio environment. */
  environment?:
    | "BACKGROUND_ENVIRONMENT_UNSPECIFIED"
    | "CALL_CENTER"
    | "TRAFFIC"
    | "KIDS_NOISE"
    | "CAFE"
    | (string & {});
}

export const EvaluationPersonaSpeechConfig: Schema.Schema<EvaluationPersonaSpeechConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      voiceId: Schema.optional(Schema.String),
      speakingRate: Schema.optional(Schema.Number),
      environment: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EvaluationPersonaSpeechConfig",
  }) as any as Schema.Schema<EvaluationPersonaSpeechConfig>;

export interface EvaluationPersona {
  /** Required. The display name of the persona. Unique within an app. */
  displayName?: string;
  /** Required. An instruction for the agent on how to behave in the evaluation. */
  personality?: string;
  /** Optional. The description of the persona. */
  description?: string;
  /** Required. The unique identifier of the persona. Format: `projects/{project}/locations/{location}/apps/{app}/evaluationPersonas/{evaluationPersona}` */
  name?: string;
  /** Optional. Configuration for how the persona sounds (TTS settings). */
  speechConfig?: EvaluationPersonaSpeechConfig;
}

export const EvaluationPersona: Schema.Schema<EvaluationPersona> =
  Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      personality: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      speechConfig: Schema.optional(EvaluationPersonaSpeechConfig),
    }),
  ).annotate({
    identifier: "EvaluationPersona",
  }) as any as Schema.Schema<EvaluationPersona>;

export interface EvaluationConfig {
  /** Optional. Configuration for processing the input audio. */
  inputAudioConfig?: InputAudioConfig;
  /** Optional. Specifies whether the evaluation should use real tool calls or fake tools. */
  toolCallBehaviour?:
    | "EVALUATION_TOOL_CALL_BEHAVIOUR_UNSPECIFIED"
    | "REAL"
    | "FAKE"
    | (string & {});
  /** Optional. Configuration for generating the output audio. */
  outputAudioConfig?: OutputAudioConfig;
  /** Optional. The channel to evaluate. */
  evaluationChannel?:
    | "EVALUATION_CHANNEL_UNSPECIFIED"
    | "TEXT"
    | "AUDIO"
    | (string & {});
}

export const EvaluationConfig: Schema.Schema<EvaluationConfig> = Schema.suspend(
  () =>
    Schema.Struct({
      inputAudioConfig: Schema.optional(InputAudioConfig),
      toolCallBehaviour: Schema.optional(Schema.String),
      outputAudioConfig: Schema.optional(OutputAudioConfig),
      evaluationChannel: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "EvaluationConfig",
}) as any as Schema.Schema<EvaluationConfig>;

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() =>
  Schema.Struct({
    code: Schema.optional(Schema.Number),
    details: Schema.optional(
      Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
    ),
    message: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface EvaluationResult {
  /** Identifier. The unique identifier of the evaluation result. Format: `projects/{project}/locations/{location}/apps/{app}/evaluations/{evaluation}/results/{result}` */
  name?: string;
  /** Required. Display name of the Evaluation Result. Unique within an Evaluation. By default, it has the following format: " result - ". */
  displayName?: string;
  /** Output only. The outcome of a golden evaluation. */
  goldenResult?: EvaluationResultGoldenResult;
  /** Output only. The state of the evaluation result execution. */
  executionState?:
    | "EXECUTION_STATE_UNSPECIFIED"
    | "RUNNING"
    | "COMPLETED"
    | "ERROR"
    | (string & {});
  /** Output only. The app version used to generate the conversation that resulted in this result. Format: `projects/{project}/locations/{location}/apps/{app}/versions/{version}` */
  appVersion?: string;
  /** Output only. The evaluation thresholds for the result. */
  evaluationMetricsThresholds?: EvaluationMetricsThresholds;
  /** Output only. The outcome of a scenario evaluation. */
  scenarioResult?: EvaluationResultScenarioResult;
  /** Output only. The user who initiated the evaluation run that resulted in this result. */
  initiatedBy?: string;
  /** Output only. Error information for the evaluation result. */
  errorInfo?: EvaluationErrorInfo;
  /** Output only. The outcome of the evaluation. Only populated if execution_state is COMPLETE. */
  evaluationStatus?: "OUTCOME_UNSPECIFIED" | "PASS" | "FAIL" | (string & {});
  /** Output only. Timestamp when the evaluation result was created. */
  createTime?: string;
  /** Output only. The changelog of the app version that the evaluation ran against. This is populated if user runs evaluation on latest/draft. */
  changelog?: string;
  /** Output only. The method used to run the golden evaluation. */
  goldenRunMethod?:
    | "GOLDEN_RUN_METHOD_UNSPECIFIED"
    | "STABLE"
    | "NAIVE"
    | (string & {});
  /** Output only. The persona used to generate the conversation for the evaluation result. */
  persona?: EvaluationPersona;
  /** Output only. The create time of the changelog of the app version that the evaluation ran against. This is populated if user runs evaluation on latest/draft. */
  changelogCreateTime?: string;
  /** Output only. The display name of the `app_version` that the evaluation ran against. */
  appVersionDisplayName?: string;
  /** Output only. The evaluation run that produced this result. Format: `projects/{project}/locations/{location}/apps/{app}/evaluationRuns/{evaluationRun}` */
  evaluationRun?: string;
  /** Output only. The configuration used in the evaluation run that resulted in this result. */
  config?: EvaluationConfig;
  /** Output only. Deprecated: Use `error_info` instead. Errors encountered during execution. */
  error?: Status;
}

export const EvaluationResult: Schema.Schema<EvaluationResult> = Schema.suspend(
  () =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      goldenResult: Schema.optional(EvaluationResultGoldenResult),
      executionState: Schema.optional(Schema.String),
      appVersion: Schema.optional(Schema.String),
      evaluationMetricsThresholds: Schema.optional(EvaluationMetricsThresholds),
      scenarioResult: Schema.optional(EvaluationResultScenarioResult),
      initiatedBy: Schema.optional(Schema.String),
      errorInfo: Schema.optional(EvaluationErrorInfo),
      evaluationStatus: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      changelog: Schema.optional(Schema.String),
      goldenRunMethod: Schema.optional(Schema.String),
      persona: Schema.optional(EvaluationPersona),
      changelogCreateTime: Schema.optional(Schema.String),
      appVersionDisplayName: Schema.optional(Schema.String),
      evaluationRun: Schema.optional(Schema.String),
      config: Schema.optional(EvaluationConfig),
      error: Schema.optional(Status),
    }),
).annotate({
  identifier: "EvaluationResult",
}) as any as Schema.Schema<EvaluationResult>;

export interface Evaluation {
  /** Output only. The EvaluationRuns that this Evaluation is associated with. */
  evaluationRuns?: Array<string>;
  /** Optional. The config for a scenario. */
  scenario?: EvaluationScenario;
  /** Output only. The user who created the evaluation. */
  createdBy?: string;
  /** Output only. Whether the evaluation is invalid. This can happen if an evaluation is referencing a tool, toolset, or agent that has since been deleted. */
  invalid?: boolean;
  /** Output only. The aggregated metrics for this evaluation across all runs. */
  aggregatedMetrics?: AggregatedMetrics;
  /** Optional. The golden steps to be evaluated. */
  golden?: EvaluationGolden;
  /** Output only. Timestamp when the evaluation was created. */
  createTime?: string;
  /** Output only. The user who last updated the evaluation. */
  lastUpdatedBy?: string;
  /** Optional. User defined tags to categorize the evaluation. */
  tags?: Array<string>;
  /** Output only. The last 10 evaluation results for this evaluation. This is only populated if include_last_ten_results is set to true in the ListEvaluationsRequest or GetEvaluationRequest. */
  lastTenResults?: Array<EvaluationResult>;
  /** Output only. List of evaluation datasets the evaluation belongs to. Format: `projects/{project}/locations/{location}/apps/{app}/evaluationDatasets/{evaluationDataset}` */
  evaluationDatasets?: Array<string>;
  /** Required. User-defined display name of the evaluation. Unique within an App. */
  displayName?: string;
  /** Output only. The latest evaluation result for this evaluation. */
  lastCompletedResult?: EvaluationResult;
  /** Output only. Timestamp when the evaluation was last updated. */
  updateTime?: string;
  /** Optional. User-defined description of the evaluation. */
  description?: string;
  /** Identifier. The unique identifier of this evaluation. Format: `projects/{project}/locations/{location}/apps/{app}/evaluations/{evaluation}` */
  name?: string;
  /** Output only. Etag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes. */
  etag?: string;
}

export const Evaluation: Schema.Schema<Evaluation> = Schema.suspend(() =>
  Schema.Struct({
    evaluationRuns: Schema.optional(Schema.Array(Schema.String)),
    scenario: Schema.optional(EvaluationScenario),
    createdBy: Schema.optional(Schema.String),
    invalid: Schema.optional(Schema.Boolean),
    aggregatedMetrics: Schema.optional(AggregatedMetrics),
    golden: Schema.optional(EvaluationGolden),
    createTime: Schema.optional(Schema.String),
    lastUpdatedBy: Schema.optional(Schema.String),
    tags: Schema.optional(Schema.Array(Schema.String)),
    lastTenResults: Schema.optional(Schema.Array(EvaluationResult)),
    evaluationDatasets: Schema.optional(Schema.Array(Schema.String)),
    displayName: Schema.optional(Schema.String),
    lastCompletedResult: Schema.optional(EvaluationResult),
    updateTime: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Evaluation" }) as any as Schema.Schema<Evaluation>;

export interface GuardrailLlmPromptSecurityDefaultSecuritySettings {
  /** Output only. The default prompt template used by the system. This field is for display purposes to show the user what prompt the system uses by default. It is OUTPUT_ONLY. */
  defaultPromptTemplate?: string;
}

export const GuardrailLlmPromptSecurityDefaultSecuritySettings: Schema.Schema<GuardrailLlmPromptSecurityDefaultSecuritySettings> =
  Schema.suspend(() =>
    Schema.Struct({
      defaultPromptTemplate: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GuardrailLlmPromptSecurityDefaultSecuritySettings",
  }) as any as Schema.Schema<GuardrailLlmPromptSecurityDefaultSecuritySettings>;

export interface ModelSettings {
  /** Optional. If set, this temperature will be used for the LLM model. Temperature controls the randomness of the model's responses. Lower temperatures produce responses that are more predictable. Higher temperatures produce responses that are more creative. */
  temperature?: number;
  /** Optional. The LLM model that the agent should use. If not set, the agent will inherit the model from its parent agent. */
  model?: string;
}

export const ModelSettings: Schema.Schema<ModelSettings> = Schema.suspend(() =>
  Schema.Struct({
    temperature: Schema.optional(Schema.Number),
    model: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "ModelSettings",
}) as any as Schema.Schema<ModelSettings>;

export interface GuardrailLlmPolicy {
  /** Optional. By default, the LLM policy check is bypassed for short utterances. Enabling this setting applies the policy check to all utterances, including those that would normally be skipped. */
  allowShortUtterance?: boolean;
  /** Optional. When checking this policy, consider the last 'n' messages in the conversation. When not set a default value of 10 will be used. */
  maxConversationMessages?: number;
  /** Required. Policy prompt. */
  prompt?: string;
  /** Optional. Model settings. */
  modelSettings?: ModelSettings;
  /** Required. Defines when to apply the policy check during the conversation. If set to `POLICY_SCOPE_UNSPECIFIED`, the policy will be applied to the user input. When applying the policy to the agent response, additional latency will be introduced before the agent can respond. */
  policyScope?:
    | "POLICY_SCOPE_UNSPECIFIED"
    | "USER_QUERY"
    | "AGENT_RESPONSE"
    | "USER_QUERY_AND_AGENT_RESPONSE"
    | (string & {});
  /** Optional. If an error occurs during the policy check, fail open and do not trigger the guardrail. */
  failOpen?: boolean;
}

export const GuardrailLlmPolicy: Schema.Schema<GuardrailLlmPolicy> =
  Schema.suspend(() =>
    Schema.Struct({
      allowShortUtterance: Schema.optional(Schema.Boolean),
      maxConversationMessages: Schema.optional(Schema.Number),
      prompt: Schema.optional(Schema.String),
      modelSettings: Schema.optional(ModelSettings),
      policyScope: Schema.optional(Schema.String),
      failOpen: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "GuardrailLlmPolicy",
  }) as any as Schema.Schema<GuardrailLlmPolicy>;

export interface GuardrailLlmPromptSecurity {
  /** Optional. Use the system's predefined default security settings. To select this mode, include an empty 'default_settings' message in the request. The 'default_prompt_template' field within will be populated by the server in the response. */
  defaultSettings?: GuardrailLlmPromptSecurityDefaultSecuritySettings;
  /** Optional. Determines the behavior when the guardrail encounters an LLM error. - If true: the guardrail is bypassed. - If false (default): the guardrail triggers/blocks. Note: If a custom policy is provided, this field is ignored in favor of the policy's 'fail_open' configuration. */
  failOpen?: boolean;
  /** Optional. Use a user-defined LlmPolicy to configure the security guardrail. */
  customPolicy?: GuardrailLlmPolicy;
}

export const GuardrailLlmPromptSecurity: Schema.Schema<GuardrailLlmPromptSecurity> =
  Schema.suspend(() =>
    Schema.Struct({
      defaultSettings: Schema.optional(
        GuardrailLlmPromptSecurityDefaultSecuritySettings,
      ),
      failOpen: Schema.optional(Schema.Boolean),
      customPolicy: Schema.optional(GuardrailLlmPolicy),
    }),
  ).annotate({
    identifier: "GuardrailLlmPromptSecurity",
  }) as any as Schema.Schema<GuardrailLlmPromptSecurity>;

export interface TriggerActionGenerativeAnswer {
  /** Required. The prompt to use for the generative answer. */
  prompt?: string;
}

export const TriggerActionGenerativeAnswer: Schema.Schema<TriggerActionGenerativeAnswer> =
  Schema.suspend(() =>
    Schema.Struct({
      prompt: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "TriggerActionGenerativeAnswer",
  }) as any as Schema.Schema<TriggerActionGenerativeAnswer>;

export interface TriggerActionResponse {
  /** Required. Text for the agent to respond with. */
  text?: string;
  /** Optional. Whether the response is disabled. Disabled responses are not used by the agent. */
  disabled?: boolean;
}

export const TriggerActionResponse: Schema.Schema<TriggerActionResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      text: Schema.optional(Schema.String),
      disabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "TriggerActionResponse",
  }) as any as Schema.Schema<TriggerActionResponse>;

export interface TriggerActionRespondImmediately {
  /** Required. The canned responses for the agent to choose from. The response is chosen randomly. */
  responses?: Array<TriggerActionResponse>;
}

export const TriggerActionRespondImmediately: Schema.Schema<TriggerActionRespondImmediately> =
  Schema.suspend(() =>
    Schema.Struct({
      responses: Schema.optional(Schema.Array(TriggerActionResponse)),
    }),
  ).annotate({
    identifier: "TriggerActionRespondImmediately",
  }) as any as Schema.Schema<TriggerActionRespondImmediately>;

export interface TriggerActionTransferAgent {
  /** Required. The name of the agent to transfer the conversation to. The agent must be in the same app as the current agent. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}` */
  agent?: string;
}

export const TriggerActionTransferAgent: Schema.Schema<TriggerActionTransferAgent> =
  Schema.suspend(() =>
    Schema.Struct({
      agent: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "TriggerActionTransferAgent",
  }) as any as Schema.Schema<TriggerActionTransferAgent>;

export interface TriggerAction {
  /** Optional. Respond with a generative answer. */
  generativeAnswer?: TriggerActionGenerativeAnswer;
  /** Optional. Immediately respond with a preconfigured response. */
  respondImmediately?: TriggerActionRespondImmediately;
  /** Optional. Transfer the conversation to a different agent. */
  transferAgent?: TriggerActionTransferAgent;
}

export const TriggerAction: Schema.Schema<TriggerAction> = Schema.suspend(() =>
  Schema.Struct({
    generativeAnswer: Schema.optional(TriggerActionGenerativeAnswer),
    respondImmediately: Schema.optional(TriggerActionRespondImmediately),
    transferAgent: Schema.optional(TriggerActionTransferAgent),
  }),
).annotate({
  identifier: "TriggerAction",
}) as any as Schema.Schema<TriggerAction>;

export interface GuardrailModelSafetySafetySetting {
  /** Required. The harm category. */
  category?:
    | "HARM_CATEGORY_UNSPECIFIED"
    | "HARM_CATEGORY_HATE_SPEECH"
    | "HARM_CATEGORY_DANGEROUS_CONTENT"
    | "HARM_CATEGORY_HARASSMENT"
    | "HARM_CATEGORY_SEXUALLY_EXPLICIT"
    | (string & {});
  /** Required. The harm block threshold. */
  threshold?:
    | "HARM_BLOCK_THRESHOLD_UNSPECIFIED"
    | "BLOCK_LOW_AND_ABOVE"
    | "BLOCK_MEDIUM_AND_ABOVE"
    | "BLOCK_ONLY_HIGH"
    | "BLOCK_NONE"
    | "OFF"
    | (string & {});
}

export const GuardrailModelSafetySafetySetting: Schema.Schema<GuardrailModelSafetySafetySetting> =
  Schema.suspend(() =>
    Schema.Struct({
      category: Schema.optional(Schema.String),
      threshold: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GuardrailModelSafetySafetySetting",
  }) as any as Schema.Schema<GuardrailModelSafetySafetySetting>;

export interface GuardrailModelSafety {
  /** Required. List of safety settings. */
  safetySettings?: Array<GuardrailModelSafetySafetySetting>;
}

export const GuardrailModelSafety: Schema.Schema<GuardrailModelSafety> =
  Schema.suspend(() =>
    Schema.Struct({
      safetySettings: Schema.optional(
        Schema.Array(GuardrailModelSafetySafetySetting),
      ),
    }),
  ).annotate({
    identifier: "GuardrailModelSafety",
  }) as any as Schema.Schema<GuardrailModelSafety>;

export interface Callback {
  /** Required. The python code to execute for the callback. */
  pythonCode?: string;
  /** Optional. Whether the callback is disabled. Disabled callbacks are ignored by the agent. */
  disabled?: boolean;
  /** Optional. Human-readable description of the callback. */
  description?: string;
  /** Optional. If enabled, the callback will also be executed on intermediate model outputs. This setting only affects after model callback. **ENABLE WITH CAUTION**. Typically after model callback only needs to be executed after receiving all model responses. Enabling proactive execution may have negative implication on the execution cost and latency, and should only be enabled in rare situations. */
  proactiveExecutionEnabled?: boolean;
}

export const Callback: Schema.Schema<Callback> = Schema.suspend(() =>
  Schema.Struct({
    pythonCode: Schema.optional(Schema.String),
    disabled: Schema.optional(Schema.Boolean),
    description: Schema.optional(Schema.String),
    proactiveExecutionEnabled: Schema.optional(Schema.Boolean),
  }),
).annotate({ identifier: "Callback" }) as any as Schema.Schema<Callback>;

export interface GuardrailCodeCallback {
  /** Optional. The callback to execute before the model is called. If there are multiple calls to the model, the callback will be executed multiple times. Each callback function is expected to return a structure (e.g., a dict or object) containing at least: - 'decision': Either 'OK' or 'TRIGGER'. - 'reason': A string explaining the decision. A 'TRIGGER' decision may halt further processing. */
  beforeModelCallback?: Callback;
  /** Optional. The callback to execute after the model is called. If there are multiple calls to the model, the callback will be executed multiple times. Each callback function is expected to return a structure (e.g., a dict or object) containing at least: - 'decision': Either 'OK' or 'TRIGGER'. - 'reason': A string explaining the decision. A 'TRIGGER' decision may halt further processing. */
  afterModelCallback?: Callback;
  /** Optional. The callback to execute after the agent is called. Each callback function is expected to return a structure (e.g., a dict or object) containing at least: - 'decision': Either 'OK' or 'TRIGGER'. - 'reason': A string explaining the decision. A 'TRIGGER' decision may halt further processing. */
  afterAgentCallback?: Callback;
  /** Optional. The callback to execute before the agent is called. Each callback function is expected to return a structure (e.g., a dict or object) containing at least: - 'decision': Either 'OK' or 'TRIGGER'. - 'reason': A string explaining the decision. A 'TRIGGER' decision may halt further processing. */
  beforeAgentCallback?: Callback;
}

export const GuardrailCodeCallback: Schema.Schema<GuardrailCodeCallback> =
  Schema.suspend(() =>
    Schema.Struct({
      beforeModelCallback: Schema.optional(Callback),
      afterModelCallback: Schema.optional(Callback),
      afterAgentCallback: Schema.optional(Callback),
      beforeAgentCallback: Schema.optional(Callback),
    }),
  ).annotate({
    identifier: "GuardrailCodeCallback",
  }) as any as Schema.Schema<GuardrailCodeCallback>;

export interface GuardrailContentFilter {
  /** Optional. If true, diacritics are ignored during matching. */
  disregardDiacritics?: boolean;
  /** Optional. List of banned phrases. Applies only to user inputs. */
  bannedContentsInUserInput?: Array<string>;
  /** Required. Match type for the content filter. */
  matchType?:
    | "MATCH_TYPE_UNSPECIFIED"
    | "SIMPLE_STRING_MATCH"
    | "WORD_BOUNDARY_STRING_MATCH"
    | "REGEXP_MATCH"
    | (string & {});
  /** Optional. List of banned phrases. Applies to both user inputs and agent responses. */
  bannedContents?: Array<string>;
  /** Optional. List of banned phrases. Applies only to agent responses. */
  bannedContentsInAgentResponse?: Array<string>;
}

export const GuardrailContentFilter: Schema.Schema<GuardrailContentFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      disregardDiacritics: Schema.optional(Schema.Boolean),
      bannedContentsInUserInput: Schema.optional(Schema.Array(Schema.String)),
      matchType: Schema.optional(Schema.String),
      bannedContents: Schema.optional(Schema.Array(Schema.String)),
      bannedContentsInAgentResponse: Schema.optional(
        Schema.Array(Schema.String),
      ),
    }),
  ).annotate({
    identifier: "GuardrailContentFilter",
  }) as any as Schema.Schema<GuardrailContentFilter>;

export interface Guardrail {
  /** Identifier. The unique identifier of the guardrail. Format: `projects/{project}/locations/{location}/apps/{app}/guardrails/{guardrail}` */
  name?: string;
  /** Optional. Guardrail that blocks the conversation if the prompt is considered unsafe based on the LLM classification. */
  llmPromptSecurity?: GuardrailLlmPromptSecurity;
  /** Optional. Whether the guardrail is enabled. */
  enabled?: boolean;
  /** Etag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes. */
  etag?: string;
  /** Optional. Action to take when the guardrail is triggered. */
  action?: TriggerAction;
  /** Required. Display name of the guardrail. */
  displayName?: string;
  /** Output only. Timestamp when the guardrail was last updated. */
  updateTime?: string;
  /** Optional. Description of the guardrail. */
  description?: string;
  /** Optional. Guardrail that blocks the conversation if the LLM response is considered unsafe based on the model safety settings. */
  modelSafety?: GuardrailModelSafety;
  /** Optional. Guardrail that blocks the conversation if the LLM response is considered violating the policy based on the LLM classification. */
  llmPolicy?: GuardrailLlmPolicy;
  /** Output only. Timestamp when the guardrail was created. */
  createTime?: string;
  /** Optional. Guardrail that potentially blocks the conversation based on the result of the callback execution. */
  codeCallback?: GuardrailCodeCallback;
  /** Optional. Guardrail that bans certain content from being used in the conversation. */
  contentFilter?: GuardrailContentFilter;
}

export const Guardrail: Schema.Schema<Guardrail> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    llmPromptSecurity: Schema.optional(GuardrailLlmPromptSecurity),
    enabled: Schema.optional(Schema.Boolean),
    etag: Schema.optional(Schema.String),
    action: Schema.optional(TriggerAction),
    displayName: Schema.optional(Schema.String),
    updateTime: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    modelSafety: Schema.optional(GuardrailModelSafety),
    llmPolicy: Schema.optional(GuardrailLlmPolicy),
    createTime: Schema.optional(Schema.String),
    codeCallback: Schema.optional(GuardrailCodeCallback),
    contentFilter: Schema.optional(GuardrailContentFilter),
  }),
).annotate({ identifier: "Guardrail" }) as any as Schema.Schema<Guardrail>;

export interface ListEvaluationsResponse {
  /** A token that can be sent as ListEvaluationsRequest.page_token to retrieve the next page. Absence of this field indicates there are no subsequent pages. */
  nextPageToken?: string;
  /** The list of evaluations. */
  evaluations?: Array<Evaluation>;
}

export const ListEvaluationsResponse: Schema.Schema<ListEvaluationsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      evaluations: Schema.optional(Schema.Array(Evaluation)),
    }),
  ).annotate({
    identifier: "ListEvaluationsResponse",
  }) as any as Schema.Schema<ListEvaluationsResponse>;

export interface ServiceDirectoryConfig {
  /** Required. The name of [Service Directory](https://cloud.google.com/service-directory) service. Format: `projects/{project}/locations/{location}/namespaces/{namespace}/services/{service}`. Location of the service directory must be the same as the location of the app. */
  service?: string;
}

export const ServiceDirectoryConfig: Schema.Schema<ServiceDirectoryConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      service: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ServiceDirectoryConfig",
  }) as any as Schema.Schema<ServiceDirectoryConfig>;

export interface Ces_Schema {
  /** Optional. Maximum number of the elements for Type.ARRAY. */
  maxItems?: string;
  /** Optional. Maximum value for Type.INTEGER and Type.NUMBER. */
  maximum?: number;
  /** Optional. A map of definitions for use by `ref`. Only allowed at the root of the schema. */
  defs?: Record<string, Ces_Schema>;
  /** Optional. Can either be a boolean or an object, controls the presence of additional properties. */
  additionalProperties?: Ces_Schema;
  /** Optional. Schema of the elements of Type.ARRAY. */
  items?: Ces_Schema;
  /** Optional. The value should be validated against any (one or more) of the subschemas in the list. */
  anyOf?: Array<Ces_Schema>;
  /** Optional. Default value of the data. */
  default?: unknown;
  /** Required. The type of the data. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "STRING"
    | "INTEGER"
    | "NUMBER"
    | "BOOLEAN"
    | "OBJECT"
    | "ARRAY"
    | (string & {});
  /** Optional. Indicate the items in the array must be unique. Only applies to TYPE.ARRAY. */
  uniqueItems?: boolean;
  /** Optional. The description of the data. */
  description?: string;
  /** Optional. The title of the schema. */
  title?: string;
  /** Optional. Required properties of Type.OBJECT. */
  required?: Array<string>;
  /** Optional. Allows indirect references between schema nodes. The value should be a valid reference to a child of the root `defs`. For example, the following schema defines a reference to a schema node named "Pet": ``` type: object properties: pet: ref: #/defs/Pet defs: Pet: type: object properties: name: type: string ``` The value of the "pet" property is a reference to the schema node named "Pet". See details in https://json-schema.org/understanding-json-schema/structuring. */
  ref?: string;
  /** Optional. Schemas of initial elements of Type.ARRAY. */
  prefixItems?: Array<Ces_Schema>;
  /** Optional. Minimum value for Type.INTEGER and Type.NUMBER. */
  minimum?: number;
  /** Optional. Indicates if the value may be null. */
  nullable?: boolean;
  /** Optional. Minimum number of the elements for Type.ARRAY. */
  minItems?: string;
  /** Optional. Possible values of the element of primitive type with enum format. Examples: 1. We can define direction as : {type:STRING, format:enum, enum:["EAST", NORTH", "SOUTH", "WEST"]} 2. We can define apartment number as : {type:INTEGER, format:enum, enum:["101", "201", "301"]} */
  enum?: Array<string>;
  /** Optional. Properties of Type.OBJECT. */
  properties?: Record<string, Ces_Schema>;
}

export const Ces_Schema: Schema.Schema<Ces_Schema> = Schema.suspend(() =>
  Schema.Struct({
    maxItems: Schema.optional(Schema.String),
    maximum: Schema.optional(Schema.Number),
    defs: Schema.optional(Schema.Record(Schema.String, Ces_Schema)),
    additionalProperties: Schema.optional(Ces_Schema),
    items: Schema.optional(Ces_Schema),
    anyOf: Schema.optional(Schema.Array(Ces_Schema)),
    default: Schema.optional(Schema.Unknown),
    type: Schema.optional(Schema.String),
    uniqueItems: Schema.optional(Schema.Boolean),
    description: Schema.optional(Schema.String),
    title: Schema.optional(Schema.String),
    required: Schema.optional(Schema.Array(Schema.String)),
    ref: Schema.optional(Schema.String),
    prefixItems: Schema.optional(Schema.Array(Ces_Schema)),
    minimum: Schema.optional(Schema.Number),
    nullable: Schema.optional(Schema.Boolean),
    minItems: Schema.optional(Schema.String),
    enum: Schema.optional(Schema.Array(Schema.String)),
    properties: Schema.optional(Schema.Record(Schema.String, Ces_Schema)),
  }),
).annotate({ identifier: "Ces_Schema" }) as any as Schema.Schema<Ces_Schema>;

export interface TlsConfigCaCert {
  /** Required. The name of the allowed custom CA certificates. This can be used to disambiguate the custom CA certificates. */
  displayName?: string;
  /** Required. The allowed custom CA certificates (in DER format) for HTTPS verification. This overrides the default SSL trust store. If this is empty or unspecified, CES will use Google's default trust store to verify certificates. N.B. Make sure the HTTPS server certificates are signed with "subject alt name". For instance a certificate can be self-signed using the following command: ``` openssl x509 -req -days 200 -in example.com.csr \ -signkey example.com.key \ -out example.com.crt \ -extfile <(printf "\nsubjectAltName='DNS:www.example.com'") ``` */
  cert?: string;
}

export const TlsConfigCaCert: Schema.Schema<TlsConfigCaCert> = Schema.suspend(
  () =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      cert: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "TlsConfigCaCert",
}) as any as Schema.Schema<TlsConfigCaCert>;

export interface TlsConfig {
  /** Required. Specifies a list of allowed custom CA certificates for HTTPS verification. */
  caCerts?: Array<TlsConfigCaCert>;
}

export const TlsConfig: Schema.Schema<TlsConfig> = Schema.suspend(() =>
  Schema.Struct({
    caCerts: Schema.optional(Schema.Array(TlsConfigCaCert)),
  }),
).annotate({ identifier: "TlsConfig" }) as any as Schema.Schema<TlsConfig>;

export interface ServiceAccountAuthConfig {
  /** Required. The email address of the service account used for authentication. CES uses this service account to exchange an access token and the access token is then sent in the `Authorization` header of the request. The service account must have the `roles/iam.serviceAccountTokenCreator` role granted to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`. */
  serviceAccount?: string;
  /** Optional. The OAuth scopes to grant. If not specified, the default scope `https://www.googleapis.com/auth/cloud-platform` is used. */
  scopes?: Array<string>;
}

export const ServiceAccountAuthConfig: Schema.Schema<ServiceAccountAuthConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      serviceAccount: Schema.optional(Schema.String),
      scopes: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ServiceAccountAuthConfig",
  }) as any as Schema.Schema<ServiceAccountAuthConfig>;

export interface OAuthConfig {
  /** Required. The token endpoint in the OAuth provider to exchange for an access token. */
  tokenEndpoint?: string;
  /** Required. The name of the SecretManager secret version resource storing the client secret. Format: `projects/{project}/secrets/{secret}/versions/{version}` Note: You should grant `roles/secretmanager.secretAccessor` role to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`. */
  clientSecretVersion?: string;
  /** Optional. The OAuth scopes to grant. */
  scopes?: Array<string>;
  /** Required. The client ID from the OAuth provider. */
  clientId?: string;
  /** Required. OAuth grant types. */
  oauthGrantType?:
    | "OAUTH_GRANT_TYPE_UNSPECIFIED"
    | "CLIENT_CREDENTIAL"
    | (string & {});
}

export const OAuthConfig: Schema.Schema<OAuthConfig> = Schema.suspend(() =>
  Schema.Struct({
    tokenEndpoint: Schema.optional(Schema.String),
    clientSecretVersion: Schema.optional(Schema.String),
    scopes: Schema.optional(Schema.Array(Schema.String)),
    clientId: Schema.optional(Schema.String),
    oauthGrantType: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "OAuthConfig" }) as any as Schema.Schema<OAuthConfig>;

export interface BearerTokenConfig {
  /** Required. The bearer token. Must be in the format `$context.variables.`. */
  token?: string;
}

export const BearerTokenConfig: Schema.Schema<BearerTokenConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      token: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BearerTokenConfig",
  }) as any as Schema.Schema<BearerTokenConfig>;

export interface ApiKeyConfig {
  /** Required. The parameter name or the header name of the API key. E.g., If the API request is "https://example.com/act?X-Api-Key=", "X-Api-Key" would be the parameter name. */
  keyName?: string;
  /** Required. The name of the SecretManager secret version resource storing the API key. Format: `projects/{project}/secrets/{secret}/versions/{version}` Note: You should grant `roles/secretmanager.secretAccessor` role to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`. */
  apiKeySecretVersion?: string;
  /** Required. Key location in the request. */
  requestLocation?:
    | "REQUEST_LOCATION_UNSPECIFIED"
    | "HEADER"
    | "QUERY_STRING"
    | (string & {});
}

export const ApiKeyConfig: Schema.Schema<ApiKeyConfig> = Schema.suspend(() =>
  Schema.Struct({
    keyName: Schema.optional(Schema.String),
    apiKeySecretVersion: Schema.optional(Schema.String),
    requestLocation: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "ApiKeyConfig",
}) as any as Schema.Schema<ApiKeyConfig>;

export interface ServiceAgentIdTokenAuthConfig {}

export const ServiceAgentIdTokenAuthConfig: Schema.Schema<ServiceAgentIdTokenAuthConfig> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "ServiceAgentIdTokenAuthConfig",
  }) as any as Schema.Schema<ServiceAgentIdTokenAuthConfig>;

export interface ApiAuthentication {
  /** Optional. Config for service account authentication. */
  serviceAccountAuthConfig?: ServiceAccountAuthConfig;
  /** Optional. Config for OAuth. */
  oauthConfig?: OAuthConfig;
  /** Optional. Config for bearer token auth. */
  bearerTokenConfig?: BearerTokenConfig;
  /** Optional. Config for API key auth. */
  apiKeyConfig?: ApiKeyConfig;
  /** Optional. Config for ID token auth generated from CES service agent. */
  serviceAgentIdTokenAuthConfig?: ServiceAgentIdTokenAuthConfig;
}

export const ApiAuthentication: Schema.Schema<ApiAuthentication> =
  Schema.suspend(() =>
    Schema.Struct({
      serviceAccountAuthConfig: Schema.optional(ServiceAccountAuthConfig),
      oauthConfig: Schema.optional(OAuthConfig),
      bearerTokenConfig: Schema.optional(BearerTokenConfig),
      apiKeyConfig: Schema.optional(ApiKeyConfig),
      serviceAgentIdTokenAuthConfig: Schema.optional(
        ServiceAgentIdTokenAuthConfig,
      ),
    }),
  ).annotate({
    identifier: "ApiAuthentication",
  }) as any as Schema.Schema<ApiAuthentication>;

export interface McpTool {
  /** Optional. Service Directory configuration for VPC-SC, used to resolve service names within a perimeter. */
  serviceDirectoryConfig?: ServiceDirectoryConfig;
  /** Optional. The schema of the output arguments of the MCP tool. */
  outputSchema?: Ces_Schema;
  /** Required. The name of the MCP tool. */
  name?: string;
  /** Optional. The TLS configuration. Includes the custom server certificates that the client should trust. */
  tlsConfig?: TlsConfig;
  /** Optional. Authentication information required to execute the tool against the MCP server. For bearer token authentication, the token applies only to tool execution, not to listing tools. This requires that tools can be listed without authentication. */
  apiAuthentication?: ApiAuthentication;
  /** Optional. The description of the MCP tool. */
  description?: string;
  /** Required. The server address of the MCP server, e.g., "https://example.com/mcp/". If the server is built with the MCP SDK, the url should be suffixed with "/mcp/". Only Streamable HTTP transport based servers are supported. This is the same as the server_address in the McpToolset. See https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http for more details. */
  serverAddress?: string;
  /** Optional. The schema of the input arguments of the MCP tool. */
  inputSchema?: Ces_Schema;
}

export const McpTool: Schema.Schema<McpTool> = Schema.suspend(() =>
  Schema.Struct({
    serviceDirectoryConfig: Schema.optional(ServiceDirectoryConfig),
    outputSchema: Schema.optional(Ces_Schema),
    name: Schema.optional(Schema.String),
    tlsConfig: Schema.optional(TlsConfig),
    apiAuthentication: Schema.optional(ApiAuthentication),
    description: Schema.optional(Schema.String),
    serverAddress: Schema.optional(Schema.String),
    inputSchema: Schema.optional(Ces_Schema),
  }),
).annotate({ identifier: "McpTool" }) as any as Schema.Schema<McpTool>;

export interface WidgetTool {
  /** Optional. The type of the widget tool. If not specified, the default type will be CUSTOMIZED. */
  widgetType?:
    | "WIDGET_TYPE_UNSPECIFIED"
    | "CUSTOM"
    | "PRODUCT_CAROUSEL"
    | "PRODUCT_DETAILS"
    | "QUICK_ACTIONS"
    | "PRODUCT_COMPARISON"
    | "ADVANCED_PRODUCT_DETAILS"
    | "SHORT_FORM"
    | "OVERALL_SATISFACTION"
    | "ORDER_SUMMARY"
    | "APPOINTMENT_DETAILS"
    | "APPOINTMENT_SCHEDULER"
    | "CONTACT_FORM"
    | (string & {});
  /** Optional. The input parameters of the widget tool. */
  parameters?: Ces_Schema;
  /** Required. The display name of the widget tool. */
  name?: string;
  /** Optional. The description of the widget tool. */
  description?: string;
}

export const WidgetTool: Schema.Schema<WidgetTool> = Schema.suspend(() =>
  Schema.Struct({
    widgetType: Schema.optional(Schema.String),
    parameters: Schema.optional(Ces_Schema),
    name: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "WidgetTool" }) as any as Schema.Schema<WidgetTool>;

export interface GoogleSearchToolPromptConfig {
  /** Optional. Defines the prompt used for the system instructions when interacting with the agent in voice conversations. If not set, default prompt will be used. */
  voicePrompt?: string;
  /** Optional. Defines the prompt used for the system instructions when interacting with the agent in chat conversations. If not set, default prompt will be used. */
  textPrompt?: string;
}

export const GoogleSearchToolPromptConfig: Schema.Schema<GoogleSearchToolPromptConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      voicePrompt: Schema.optional(Schema.String),
      textPrompt: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleSearchToolPromptConfig",
  }) as any as Schema.Schema<GoogleSearchToolPromptConfig>;

export interface ToolCalls {
  /** Optional. The list of tool calls to execute. */
  toolCalls?: Array<ToolCall>;
}

export const ToolCalls: Schema.Schema<ToolCalls> = Schema.suspend(() =>
  Schema.Struct({
    toolCalls: Schema.optional(Schema.Array(ToolCall)),
  }),
).annotate({ identifier: "ToolCalls" }) as any as Schema.Schema<ToolCalls>;

export interface LanguageSettings {
  /** Optional. The action to perform when an agent receives input in an unsupported language. This can be a predefined action or a custom tool call. Valid values are: - A tool's full resource name, which triggers a specific tool execution. - A predefined system action, such as "escalate" or "exit", which triggers an EndSession signal with corresponding metadata to terminate the conversation. */
  fallbackAction?: string;
  /** Optional. Enables multilingual support. If true, agents in the app will use pre-built instructions to improve handling of multilingual input. */
  enableMultilingualSupport?: boolean;
  /** Optional. The default language code of the app. */
  defaultLanguageCode?: string;
  /** Optional. List of languages codes supported by the app, in addition to the `default_language_code`. */
  supportedLanguageCodes?: Array<string>;
}

export const LanguageSettings: Schema.Schema<LanguageSettings> = Schema.suspend(
  () =>
    Schema.Struct({
      fallbackAction: Schema.optional(Schema.String),
      enableMultilingualSupport: Schema.optional(Schema.Boolean),
      defaultLanguageCode: Schema.optional(Schema.String),
      supportedLanguageCodes: Schema.optional(Schema.Array(Schema.String)),
    }),
).annotate({
  identifier: "LanguageSettings",
}) as any as Schema.Schema<LanguageSettings>;

export interface UploadEvaluationAudioResponse {
  /** The transcript of the audio, generated by Cloud Speech-to-Text. */
  transcript?: string;
  /** The duration of the audio. */
  duration?: string;
  /** The Google Cloud Storage URI where the uploaded audio file is stored. Format: `gs:///` */
  audioGcsUri?: string;
}

export const UploadEvaluationAudioResponse: Schema.Schema<UploadEvaluationAudioResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      transcript: Schema.optional(Schema.String),
      duration: Schema.optional(Schema.String),
      audioGcsUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UploadEvaluationAudioResponse",
  }) as any as Schema.Schema<UploadEvaluationAudioResponse>;

export interface ScheduledEvaluationRunSchedulingConfig {
  /** Required. Timestamp when the eval should start. */
  startTime?: string;
  /** Optional. The days of the week to run the eval. Applicable only for Weekly and Biweekly frequencies. 1 is Monday, 2 is Tuesday, ..., 7 is Sunday. */
  daysOfWeek?: Array<number>;
  /** Required. The frequency with which to run the eval */
  frequency?:
    | "FREQUENCY_UNSPECIFIED"
    | "NONE"
    | "DAILY"
    | "WEEKLY"
    | "BIWEEKLY"
    | (string & {});
}

export const ScheduledEvaluationRunSchedulingConfig: Schema.Schema<ScheduledEvaluationRunSchedulingConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      startTime: Schema.optional(Schema.String),
      daysOfWeek: Schema.optional(Schema.Array(Schema.Number)),
      frequency: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ScheduledEvaluationRunSchedulingConfig",
  }) as any as Schema.Schema<ScheduledEvaluationRunSchedulingConfig>;

export interface PersonaRunConfig {
  /** Optional. The number of tasks to run for the persona. */
  taskCount?: number;
  /** Optional. The persona to use for the evaluation. Format: `projects/{project}/locations/{location}/apps/{app}/evaluationPersonas/{evaluationPersona}` */
  persona?: string;
}

export const PersonaRunConfig: Schema.Schema<PersonaRunConfig> = Schema.suspend(
  () =>
    Schema.Struct({
      taskCount: Schema.optional(Schema.Number),
      persona: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "PersonaRunConfig",
}) as any as Schema.Schema<PersonaRunConfig>;

export interface OptimizationConfig {
  /** Output only. The error message if the optimization run failed. */
  errorMessage?: string;
  /** Output only. The assistant session to use for the optimization based on this evaluation run. Format: `projects/{project}/locations/{location}/apps/{app}/assistantSessions/{assistantSession}` */
  assistantSession?: string;
  /** Output only. The status of the optimization run. */
  status?:
    | "OPTIMIZATION_STATUS_UNSPECIFIED"
    | "RUNNING"
    | "COMPLETED"
    | "ERROR"
    | (string & {});
  /** Optional. Whether to generate a loss report. */
  generateLossReport?: boolean;
  /** Output only. The generated loss report. */
  lossReport?: Record<string, unknown>;
  /** Output only. The summary of the loss report. */
  reportSummary?: string;
  /** Output only. Whether to suggest a fix for the losses. */
  shouldSuggestFix?: boolean;
}

export const OptimizationConfig: Schema.Schema<OptimizationConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      errorMessage: Schema.optional(Schema.String),
      assistantSession: Schema.optional(Schema.String),
      status: Schema.optional(Schema.String),
      generateLossReport: Schema.optional(Schema.Boolean),
      lossReport: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      reportSummary: Schema.optional(Schema.String),
      shouldSuggestFix: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "OptimizationConfig",
  }) as any as Schema.Schema<OptimizationConfig>;

export interface RunEvaluationRequest {
  /** Optional. The resource name of the `ScheduledEvaluationRun` that is triggering this evaluation run. If this field is set, the `scheduled_evaluation_run` field on the created `EvaluationRun` resource will be populated from this value. Format: `projects/{project}/locations/{location}/apps/{app}/scheduledEvaluationRuns/{scheduled_evaluation_run}` */
  scheduledEvaluationRun?: string;
  /** Optional. List of evaluations to run. Format: `projects/{project}/locations/{location}/apps/{app}/evaluations/{evaluation}` */
  evaluations?: Array<string>;
  /** Optional. The app version to evaluate. Format: `projects/{project}/locations/{location}/apps/{app}/versions/{version}` */
  appVersion?: string;
  /** Optional. The method to run the evaluation if it is a golden evaluation. If not set, default to STABLE. */
  goldenRunMethod?:
    | "GOLDEN_RUN_METHOD_UNSPECIFIED"
    | "STABLE"
    | "NAIVE"
    | (string & {});
  /** Optional. An evaluation dataset to run. Format: `projects/{project}/locations/{location}/apps/{app}/evaluationDatasets/{evaluationDataset}` */
  evaluationDataset?: string;
  /** Optional. The display name of the evaluation run. */
  displayName?: string;
  /** Optional. The number of times to run the evaluation. If not set, the default value is 1 per golden, and 5 per scenario. */
  runCount?: number;
  /** Optional. The configuration to use for the run per persona. */
  personaRunConfigs?: Array<PersonaRunConfig>;
  /** Required. The app to evaluate. Format: `projects/{project}/locations/{location}/apps/{app}` */
  app?: string;
  /** Optional. The configuration to use for the run. */
  config?: EvaluationConfig;
  /** Optional. Configuration for running the optimization step after the evaluation run. If not set, the optimization step will not be run. */
  optimizationConfig?: OptimizationConfig;
  /** Optional. Whether to generate a latency report for the evaluation run. */
  generateLatencyReport?: boolean;
}

export const RunEvaluationRequest: Schema.Schema<RunEvaluationRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      scheduledEvaluationRun: Schema.optional(Schema.String),
      evaluations: Schema.optional(Schema.Array(Schema.String)),
      appVersion: Schema.optional(Schema.String),
      goldenRunMethod: Schema.optional(Schema.String),
      evaluationDataset: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      runCount: Schema.optional(Schema.Number),
      personaRunConfigs: Schema.optional(Schema.Array(PersonaRunConfig)),
      app: Schema.optional(Schema.String),
      config: Schema.optional(EvaluationConfig),
      optimizationConfig: Schema.optional(OptimizationConfig),
      generateLatencyReport: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "RunEvaluationRequest",
  }) as any as Schema.Schema<RunEvaluationRequest>;

export interface ScheduledEvaluationRun {
  /** Required. User-defined display name of the scheduled evaluation run config. */
  displayName?: string;
  /** Output only. The last successful EvaluationRun of this scheduled execution. Format: `projects/{project}/locations/{location}/apps/{app}/evaluationRuns/{evaluationRun}` */
  lastCompletedRun?: string;
  /** Required. Configuration for the timing and frequency with which to execute the evaluations. */
  schedulingConfig?: ScheduledEvaluationRunSchedulingConfig;
  /** Output only. The next time this is scheduled to execute */
  nextScheduledExecutionTime?: string;
  /** Output only. The user who last updated the evaluation. */
  lastUpdatedBy?: string;
  /** Output only. The total number of times this run has been executed */
  totalExecutions?: number;
  /** Required. The RunEvaluationRequest to schedule */
  request?: RunEvaluationRequest;
  /** Identifier. The unique identifier of the scheduled evaluation run config. Format: projects/{projectId}/locations/{locationId}/apps/{appId}/scheduledEvaluationRuns/{scheduledEvaluationRunId} */
  name?: string;
  /** Output only. The user who created the scheduled evaluation run. */
  createdBy?: string;
  /** Optional. User-defined description of the scheduled evaluation run. */
  description?: string;
  /** Output only. Timestamp when the evaluation was last updated. */
  updateTime?: string;
  /** Output only. Timestamp when the scheduled evaluation run was created. */
  createTime?: string;
  /** Optional. Whether this config is active */
  active?: boolean;
  /** Output only. Etag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes. */
  etag?: string;
}

export const ScheduledEvaluationRun: Schema.Schema<ScheduledEvaluationRun> =
  Schema.suspend(() =>
    Schema.Struct({
      displayName: Schema.optional(Schema.String),
      lastCompletedRun: Schema.optional(Schema.String),
      schedulingConfig: Schema.optional(ScheduledEvaluationRunSchedulingConfig),
      nextScheduledExecutionTime: Schema.optional(Schema.String),
      lastUpdatedBy: Schema.optional(Schema.String),
      totalExecutions: Schema.optional(Schema.Number),
      request: Schema.optional(RunEvaluationRequest),
      name: Schema.optional(Schema.String),
      createdBy: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      active: Schema.optional(Schema.Boolean),
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ScheduledEvaluationRun",
  }) as any as Schema.Schema<ScheduledEvaluationRun>;

export interface DataStoreToolBoostSpecConditionBoostSpecBoostControlSpecControlPoint {
  /** Optional. The value between -1 to 1 by which to boost the score if the attribute_value evaluates to the value specified above. */
  boostAmount?: number;
  /** Optional. Can be one of: 1. The numerical field value. 2. The duration spec for freshness: The value must be formatted as an XSD `dayTimeDuration` value (a restricted subset of an ISO 8601 duration value). The pattern for this is: `nDnM]`. */
  attributeValue?: string;
}

export const DataStoreToolBoostSpecConditionBoostSpecBoostControlSpecControlPoint: Schema.Schema<DataStoreToolBoostSpecConditionBoostSpecBoostControlSpecControlPoint> =
  Schema.suspend(() =>
    Schema.Struct({
      boostAmount: Schema.optional(Schema.Number),
      attributeValue: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier:
      "DataStoreToolBoostSpecConditionBoostSpecBoostControlSpecControlPoint",
  }) as any as Schema.Schema<DataStoreToolBoostSpecConditionBoostSpecBoostControlSpecControlPoint>;

export interface DataStoreToolBoostSpecConditionBoostSpecBoostControlSpec {
  /** Optional. The interpolation type to be applied to connect the control points listed below. */
  interpolationType?:
    | "INTERPOLATION_TYPE_UNSPECIFIED"
    | "LINEAR"
    | (string & {});
  /** Optional. The attribute type to be used to determine the boost amount. The attribute value can be derived from the field value of the specified field_name. In the case of numerical it is straightforward i.e. attribute_value = numerical_field_value. In the case of freshness however, attribute_value = (time.now() - datetime_field_value). */
  attributeType?:
    | "ATTRIBUTE_TYPE_UNSPECIFIED"
    | "NUMERICAL"
    | "FRESHNESS"
    | (string & {});
  /** Optional. The control points used to define the curve. The monotonic function (defined through the interpolation_type above) passes through the control points listed here. */
  controlPoints?: Array<DataStoreToolBoostSpecConditionBoostSpecBoostControlSpecControlPoint>;
  /** Optional. The name of the field whose value will be used to determine the boost amount. */
  fieldName?: string;
}

export const DataStoreToolBoostSpecConditionBoostSpecBoostControlSpec: Schema.Schema<DataStoreToolBoostSpecConditionBoostSpecBoostControlSpec> =
  Schema.suspend(() =>
    Schema.Struct({
      interpolationType: Schema.optional(Schema.String),
      attributeType: Schema.optional(Schema.String),
      controlPoints: Schema.optional(
        Schema.Array(
          DataStoreToolBoostSpecConditionBoostSpecBoostControlSpecControlPoint,
        ),
      ),
      fieldName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DataStoreToolBoostSpecConditionBoostSpecBoostControlSpec",
  }) as any as Schema.Schema<DataStoreToolBoostSpecConditionBoostSpecBoostControlSpec>;

export interface DataStoreToolBoostSpecConditionBoostSpec {
  /** Optional. Complex specification for custom ranking based on customer defined attribute value. */
  boostControlSpec?: DataStoreToolBoostSpecConditionBoostSpecBoostControlSpec;
  /** Required. An expression which specifies a boost condition. The syntax is the same as filter expression syntax. Currently, the only supported condition is a list of BCP-47 lang codes. Example: To boost suggestions in languages en or fr: (lang_code: ANY("en", "fr")) */
  condition?: string;
  /** Optional. Strength of the boost, which should be in [-1, 1]. Negative boost means demotion. Default is 0.0. Setting to 1.0 gives the suggestions a big promotion. However, it does not necessarily mean that the top result will be a boosted suggestion. Setting to -1.0 gives the suggestions a big demotion. However, other suggestions that are relevant might still be shown. Setting to 0.0 means no boost applied. The boosting condition is ignored. */
  boost?: number;
}

export const DataStoreToolBoostSpecConditionBoostSpec: Schema.Schema<DataStoreToolBoostSpecConditionBoostSpec> =
  Schema.suspend(() =>
    Schema.Struct({
      boostControlSpec: Schema.optional(
        DataStoreToolBoostSpecConditionBoostSpecBoostControlSpec,
      ),
      condition: Schema.optional(Schema.String),
      boost: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "DataStoreToolBoostSpecConditionBoostSpec",
  }) as any as Schema.Schema<DataStoreToolBoostSpecConditionBoostSpec>;

export interface DataStoreToolBoostSpec {
  /** Required. A list of boosting specifications. */
  conditionBoostSpecs?: Array<DataStoreToolBoostSpecConditionBoostSpec>;
}

export const DataStoreToolBoostSpec: Schema.Schema<DataStoreToolBoostSpec> =
  Schema.suspend(() =>
    Schema.Struct({
      conditionBoostSpecs: Schema.optional(
        Schema.Array(DataStoreToolBoostSpecConditionBoostSpec),
      ),
    }),
  ).annotate({
    identifier: "DataStoreToolBoostSpec",
  }) as any as Schema.Schema<DataStoreToolBoostSpec>;

export interface DataStoreToolBoostSpecs {
  /** Required. The Data Store where the boosting configuration is applied. Full resource name of DataStore, such as projects/{project}/locations/{location}/collections/{collection}/dataStores/{dataStore}. */
  dataStores?: Array<string>;
  /** Required. A list of boosting specifications. */
  spec?: Array<DataStoreToolBoostSpec>;
}

export const DataStoreToolBoostSpecs: Schema.Schema<DataStoreToolBoostSpecs> =
  Schema.suspend(() =>
    Schema.Struct({
      dataStores: Schema.optional(Schema.Array(Schema.String)),
      spec: Schema.optional(Schema.Array(DataStoreToolBoostSpec)),
    }),
  ).annotate({
    identifier: "DataStoreToolBoostSpecs",
  }) as any as Schema.Schema<DataStoreToolBoostSpecs>;

export interface DataStoreConnectorConfig {
  /** The name of the data source. Example: `salesforce`, `jira`, `confluence`, `bigquery`. */
  dataSource?: string;
  /** Display name of the collection the data store belongs to. */
  collectionDisplayName?: string;
  /** Resource name of the collection the data store belongs to. */
  collection?: string;
}

export const DataStoreConnectorConfig: Schema.Schema<DataStoreConnectorConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      dataSource: Schema.optional(Schema.String),
      collectionDisplayName: Schema.optional(Schema.String),
      collection: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DataStoreConnectorConfig",
  }) as any as Schema.Schema<DataStoreConnectorConfig>;

export interface DataStore {
  /** Output only. The display name of the data store. */
  displayName?: string;
  /** Required. Full resource name of the DataStore. Format: `projects/{project}/locations/{location}/collections/{collection}/dataStores/{dataStore}` */
  name?: string;
  /** Output only. Timestamp when the data store was created. */
  createTime?: string;
  /** Output only. The connector config for the data store connection. */
  connectorConfig?: DataStoreConnectorConfig;
  /** Output only. The type of the data store. This field is readonly and populated by the server. */
  type?:
    | "DATA_STORE_TYPE_UNSPECIFIED"
    | "PUBLIC_WEB"
    | "UNSTRUCTURED"
    | "FAQ"
    | "CONNECTOR"
    | (string & {});
  /** Output only. The document processing mode for the data store connection. Only set for PUBLIC_WEB and UNSTRUCTURED data stores. */
  documentProcessingMode?:
    | "DOCUMENT_PROCESSING_MODE_UNSPECIFIED"
    | "DOCUMENTS"
    | "CHUNKS"
    | (string & {});
}

export const DataStore: Schema.Schema<DataStore> = Schema.suspend(() =>
  Schema.Struct({
    displayName: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
    connectorConfig: Schema.optional(DataStoreConnectorConfig),
    type: Schema.optional(Schema.String),
    documentProcessingMode: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "DataStore" }) as any as Schema.Schema<DataStore>;

export interface DataStoreToolDataStoreSource {
  /** Optional. The data store. */
  dataStore?: DataStore;
  /** Optional. Filter specification for the DataStore. See: https://cloud.google.com/generative-ai-app-builder/docs/filter-search-metadata */
  filter?: string;
}

export const DataStoreToolDataStoreSource: Schema.Schema<DataStoreToolDataStoreSource> =
  Schema.suspend(() =>
    Schema.Struct({
      dataStore: Schema.optional(DataStore),
      filter: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DataStoreToolDataStoreSource",
  }) as any as Schema.Schema<DataStoreToolDataStoreSource>;

export interface DataStoreToolEngineSource {
  /** Required. Full resource name of the Engine. Format: `projects/{project}/locations/{location}/collections/{collection}/engines/{engine}` */
  engine?: string;
  /** Optional. A filter applied to the search across the Engine. Not relevant and not used if 'data_store_sources' is provided. See: https://cloud.google.com/generative-ai-app-builder/docs/filter-search-metadata */
  filter?: string;
  /** Optional. Use to target specific DataStores within the Engine. If empty, the search applies to all DataStores associated with the Engine. */
  dataStoreSources?: Array<DataStoreToolDataStoreSource>;
}

export const DataStoreToolEngineSource: Schema.Schema<DataStoreToolEngineSource> =
  Schema.suspend(() =>
    Schema.Struct({
      engine: Schema.optional(Schema.String),
      filter: Schema.optional(Schema.String),
      dataStoreSources: Schema.optional(
        Schema.Array(DataStoreToolDataStoreSource),
      ),
    }),
  ).annotate({
    identifier: "DataStoreToolEngineSource",
  }) as any as Schema.Schema<DataStoreToolEngineSource>;

export interface DataStoreToolRewriterConfig {
  /** Optional. Whether the rewriter is disabled. */
  disabled?: boolean;
  /** Optional. The prompt definition. If not set, default prompt will be used. */
  prompt?: string;
  /** Required. Configurations for the LLM model. */
  modelSettings?: ModelSettings;
}

export const DataStoreToolRewriterConfig: Schema.Schema<DataStoreToolRewriterConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      disabled: Schema.optional(Schema.Boolean),
      prompt: Schema.optional(Schema.String),
      modelSettings: Schema.optional(ModelSettings),
    }),
  ).annotate({
    identifier: "DataStoreToolRewriterConfig",
  }) as any as Schema.Schema<DataStoreToolRewriterConfig>;

export interface DataStoreToolGroundingConfig {
  /** Optional. Whether grounding is disabled. */
  disabled?: boolean;
  /** Optional. The groundedness threshold of the answer based on the retrieved sources. The value has a configurable range of [1, 5]. The level is used to threshold the groundedness of the answer, meaning that all responses with a groundedness score below the threshold will fall back to returning relevant snippets only. For example, a level of 3 means that the groundedness score must be 3 or higher for the response to be returned. */
  groundingLevel?: number;
}

export const DataStoreToolGroundingConfig: Schema.Schema<DataStoreToolGroundingConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      disabled: Schema.optional(Schema.Boolean),
      groundingLevel: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "DataStoreToolGroundingConfig",
  }) as any as Schema.Schema<DataStoreToolGroundingConfig>;

export interface DataStoreToolSummarizationConfig {
  /** Optional. Configurations for the LLM model. */
  modelSettings?: ModelSettings;
  /** Optional. The prompt definition. If not set, default prompt will be used. */
  prompt?: string;
  /** Optional. Whether summarization is disabled. */
  disabled?: boolean;
}

export const DataStoreToolSummarizationConfig: Schema.Schema<DataStoreToolSummarizationConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      modelSettings: Schema.optional(ModelSettings),
      prompt: Schema.optional(Schema.String),
      disabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "DataStoreToolSummarizationConfig",
  }) as any as Schema.Schema<DataStoreToolSummarizationConfig>;

export interface DataStoreToolModalityConfig {
  /** Optional. The rewriter config. */
  rewriterConfig?: DataStoreToolRewriterConfig;
  /** Required. The modality type. */
  modalityType?: "MODALITY_TYPE_UNSPECIFIED" | "TEXT" | "AUDIO" | (string & {});
  /** Optional. The grounding configuration. */
  groundingConfig?: DataStoreToolGroundingConfig;
  /** Optional. The summarization config. */
  summarizationConfig?: DataStoreToolSummarizationConfig;
}

export const DataStoreToolModalityConfig: Schema.Schema<DataStoreToolModalityConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      rewriterConfig: Schema.optional(DataStoreToolRewriterConfig),
      modalityType: Schema.optional(Schema.String),
      groundingConfig: Schema.optional(DataStoreToolGroundingConfig),
      summarizationConfig: Schema.optional(DataStoreToolSummarizationConfig),
    }),
  ).annotate({
    identifier: "DataStoreToolModalityConfig",
  }) as any as Schema.Schema<DataStoreToolModalityConfig>;

export interface DataStoreTool {
  /** Optional. Boost specification to boost certain documents. */
  boostSpecs?: Array<DataStoreToolBoostSpecs>;
  /** Optional. Search within an Engine (potentially across multiple DataStores). */
  engineSource?: DataStoreToolEngineSource;
  /** Required. The data store tool name. */
  name?: string;
  /** Optional. The filter parameter behavior. */
  filterParameterBehavior?:
    | "FILTER_PARAMETER_BEHAVIOR_UNSPECIFIED"
    | "ALWAYS_INCLUDE"
    | "NEVER_INCLUDE"
    | (string & {});
  /** Optional. The tool description. */
  description?: string;
  /** Optional. Search within a single specific DataStore. */
  dataStoreSource?: DataStoreToolDataStoreSource;
  /** Optional. The modality configs for the data store. */
  modalityConfigs?: Array<DataStoreToolModalityConfig>;
}

export const DataStoreTool: Schema.Schema<DataStoreTool> = Schema.suspend(() =>
  Schema.Struct({
    boostSpecs: Schema.optional(Schema.Array(DataStoreToolBoostSpecs)),
    engineSource: Schema.optional(DataStoreToolEngineSource),
    name: Schema.optional(Schema.String),
    filterParameterBehavior: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    dataStoreSource: Schema.optional(DataStoreToolDataStoreSource),
    modalityConfigs: Schema.optional(Schema.Array(DataStoreToolModalityConfig)),
  }),
).annotate({
  identifier: "DataStoreTool",
}) as any as Schema.Schema<DataStoreTool>;

export interface Operation {
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() =>
  Schema.Struct({
    error: Schema.optional(Status),
    done: Schema.optional(Schema.Boolean),
    response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    name: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      operations: Schema.optional(Schema.Array(Operation)),
    }),
  ).annotate({
    identifier: "ListOperationsResponse",
  }) as any as Schema.Schema<ListOperationsResponse>;

export interface Changelog {
  /** Output only. The type of the resource that was changed. */
  resourceType?: string;
  /** Output only. Description of the change. which typically captures the changed fields in the resource. */
  description?: string;
  /** Output only. The new resource after the change. */
  newResource?: Record<string, unknown>;
  /** Output only. The resource that was changed. */
  resource?: string;
  /** Output only. The dependent resources that were changed. */
  dependentResources?: Array<Record<string, unknown>>;
  /** Identifier. The unique identifier of the changelog. Format: `projects/{project}/locations/{location}/apps/{app}/changelogs/{changelog}` */
  name?: string;
  /** Output only. Display name of the change. It typically should be the display name of the resource that was changed. */
  displayName?: string;
  /** Output only. The original resource before the change. */
  originalResource?: Record<string, unknown>;
  /** Output only. The action that was performed on the resource. */
  action?: string;
  /** Output only. Email address of the change author. */
  author?: string;
  /** Output only. The monotonically increasing sequence number of the changelog. */
  sequenceNumber?: string;
  /** Output only. The time when the change was made. */
  createTime?: string;
}

export const Changelog: Schema.Schema<Changelog> = Schema.suspend(() =>
  Schema.Struct({
    resourceType: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    newResource: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    resource: Schema.optional(Schema.String),
    dependentResources: Schema.optional(
      Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
    ),
    name: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
    originalResource: Schema.optional(
      Schema.Record(Schema.String, Schema.Unknown),
    ),
    action: Schema.optional(Schema.String),
    author: Schema.optional(Schema.String),
    sequenceNumber: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Changelog" }) as any as Schema.Schema<Changelog>;

export interface ListChangelogsResponse {
  /** A token that can be sent as ListChangelogsRequest.page_token to retrieve the next page. Absence of this field indicates there are no subsequent pages. */
  nextPageToken?: string;
  /** The list of changelogs. */
  changelogs?: Array<Changelog>;
}

export const ListChangelogsResponse: Schema.Schema<ListChangelogsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      changelogs: Schema.optional(Schema.Array(Changelog)),
    }),
  ).annotate({
    identifier: "ListChangelogsResponse",
  }) as any as Schema.Schema<ListChangelogsResponse>;

export interface ImportAppRequestImportOptions {
  /** Optional. The strategy to use when resolving conflicts during import. */
  conflictResolutionStrategy?:
    | "CONFLICT_RESOLUTION_STRATEGY_UNSPECIFIED"
    | "REPLACE"
    | "OVERWRITE"
    | (string & {});
}

export const ImportAppRequestImportOptions: Schema.Schema<ImportAppRequestImportOptions> =
  Schema.suspend(() =>
    Schema.Struct({
      conflictResolutionStrategy: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ImportAppRequestImportOptions",
  }) as any as Schema.Schema<ImportAppRequestImportOptions>;

export interface LatencyReportLatencyMetrics {
  /** Output only. The 99th percentile latency. */
  p99Latency?: string;
  /** Output only. The 50th percentile latency. */
  p50Latency?: string;
  /** Output only. The 90th percentile latency. */
  p90Latency?: string;
  /** Output only. The number of times the resource was called. */
  callCount?: number;
}

export const LatencyReportLatencyMetrics: Schema.Schema<LatencyReportLatencyMetrics> =
  Schema.suspend(() =>
    Schema.Struct({
      p99Latency: Schema.optional(Schema.String),
      p50Latency: Schema.optional(Schema.String),
      p90Latency: Schema.optional(Schema.String),
      callCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "LatencyReportLatencyMetrics",
  }) as any as Schema.Schema<LatencyReportLatencyMetrics>;

export interface LatencyReportLlmCallLatency {
  /** Output only. The name of the model. */
  model?: string;
  /** Output only. The latency metrics for the LLM call. */
  latencyMetrics?: LatencyReportLatencyMetrics;
}

export const LatencyReportLlmCallLatency: Schema.Schema<LatencyReportLlmCallLatency> =
  Schema.suspend(() =>
    Schema.Struct({
      model: Schema.optional(Schema.String),
      latencyMetrics: Schema.optional(LatencyReportLatencyMetrics),
    }),
  ).annotate({
    identifier: "LatencyReportLlmCallLatency",
  }) as any as Schema.Schema<LatencyReportLlmCallLatency>;

export interface BatchDeleteConversationsRequest {
  /** Required. The resource names of the conversations to delete. */
  conversations?: Array<string>;
}

export const BatchDeleteConversationsRequest: Schema.Schema<BatchDeleteConversationsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      conversations: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "BatchDeleteConversationsRequest",
  }) as any as Schema.Schema<BatchDeleteConversationsRequest>;

export interface ListEvaluationResultsResponse {
  /** A token that can be sent as ListEvaluationResultsRequest.page_token to retrieve the next page. Absence of this field indicates there are no subsequent pages. */
  nextPageToken?: string;
  /** The list of evaluation results. */
  evaluationResults?: Array<EvaluationResult>;
}

export const ListEvaluationResultsResponse: Schema.Schema<ListEvaluationResultsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      evaluationResults: Schema.optional(Schema.Array(EvaluationResult)),
    }),
  ).annotate({
    identifier: "ListEvaluationResultsResponse",
  }) as any as Schema.Schema<ListEvaluationResultsResponse>;

export interface ExecuteToolResponse {
  /** The toolset tool that got executed. */
  toolsetTool?: ToolsetTool;
  /** The name of the tool that got executed. Format: `projects/{project}/locations/{location}/apps/{app}/tools/{tool}` */
  tool?: string;
  /** The variable values at the end of the tool execution. */
  variables?: Record<string, unknown>;
  /** The tool execution result in JSON object format. Use "output" key to specify tool response and "error" key to specify error details (if any). If "output" and "error" keys are not specified, then whole "response" is treated as tool execution result. */
  response?: Record<string, unknown>;
}

export const ExecuteToolResponse: Schema.Schema<ExecuteToolResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      toolsetTool: Schema.optional(ToolsetTool),
      tool: Schema.optional(Schema.String),
      variables: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({
    identifier: "ExecuteToolResponse",
  }) as any as Schema.Schema<ExecuteToolResponse>;

export interface OmnichannelIntegrationConfigWhatsappConfig {
  /** The access token for authenticating API calls to the WhatsApp Cloud API. https://developers.facebook.com/docs/whatsapp/business-management-api/get-started/#business-integration-system-user-access-tokens */
  whatsappBusinessToken?: string;
  /** The Meta Business Portfolio (MBP) ID. https://www.facebook.com/business/help/1710077379203657 */
  metaBusinessPortfolioId?: string;
  /** The Phone Number ID associated with the WhatsApp Business Account. */
  phoneNumberId?: string;
  /** The verify token configured in the Meta App Dashboard for webhook verification. */
  webhookVerifyToken?: string;
  /** The phone number used for sending/receiving messages. */
  phoneNumber?: string;
  /** The customer's WhatsApp Business Account (WABA) ID. */
  whatsappBusinessAccountId?: string;
}

export const OmnichannelIntegrationConfigWhatsappConfig: Schema.Schema<OmnichannelIntegrationConfigWhatsappConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      whatsappBusinessToken: Schema.optional(Schema.String),
      metaBusinessPortfolioId: Schema.optional(Schema.String),
      phoneNumberId: Schema.optional(Schema.String),
      webhookVerifyToken: Schema.optional(Schema.String),
      phoneNumber: Schema.optional(Schema.String),
      whatsappBusinessAccountId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OmnichannelIntegrationConfigWhatsappConfig",
  }) as any as Schema.Schema<OmnichannelIntegrationConfigWhatsappConfig>;

export interface OmnichannelIntegrationConfigChannelConfig {
  /** WhatsApp config. */
  whatsappConfig?: OmnichannelIntegrationConfigWhatsappConfig;
}

export const OmnichannelIntegrationConfigChannelConfig: Schema.Schema<OmnichannelIntegrationConfigChannelConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      whatsappConfig: Schema.optional(
        OmnichannelIntegrationConfigWhatsappConfig,
      ),
    }),
  ).annotate({
    identifier: "OmnichannelIntegrationConfigChannelConfig",
  }) as any as Schema.Schema<OmnichannelIntegrationConfigChannelConfig>;

export interface LatencyReportToolLatency {
  /** Output only. The toolset tool identifier. */
  toolsetTool?: ToolsetTool;
  /** Output only. The display name of the tool. */
  toolDisplayName?: string;
  /** Output only. The latency metrics for the tool. */
  latencyMetrics?: LatencyReportLatencyMetrics;
  /** Output only. Format: `projects/{project}/locations/{location}/apps/{app}/tools/{tool}`. */
  tool?: string;
}

export const LatencyReportToolLatency: Schema.Schema<LatencyReportToolLatency> =
  Schema.suspend(() =>
    Schema.Struct({
      toolsetTool: Schema.optional(ToolsetTool),
      toolDisplayName: Schema.optional(Schema.String),
      latencyMetrics: Schema.optional(LatencyReportLatencyMetrics),
      tool: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LatencyReportToolLatency",
  }) as any as Schema.Schema<LatencyReportToolLatency>;

export interface LatencyReportCallbackLatency {
  /** Output only. The latency metrics for the callback. */
  latencyMetrics?: LatencyReportLatencyMetrics;
  /** Output only. The stage of the callback. */
  stage?: string;
}

export const LatencyReportCallbackLatency: Schema.Schema<LatencyReportCallbackLatency> =
  Schema.suspend(() =>
    Schema.Struct({
      latencyMetrics: Schema.optional(LatencyReportLatencyMetrics),
      stage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LatencyReportCallbackLatency",
  }) as any as Schema.Schema<LatencyReportCallbackLatency>;

export interface LatencyReportGuardrailLatency {
  /** Output only. The display name of the guardrail. */
  guardrailDisplayName?: string;
  /** Output only. The latency metrics for the guardrail. */
  latencyMetrics?: LatencyReportLatencyMetrics;
  /** Output only. The name of the guardrail. Format: `projects/{project}/locations/{location}/apps/{app}/guardrails/{guardrail}`. */
  guardrail?: string;
}

export const LatencyReportGuardrailLatency: Schema.Schema<LatencyReportGuardrailLatency> =
  Schema.suspend(() =>
    Schema.Struct({
      guardrailDisplayName: Schema.optional(Schema.String),
      latencyMetrics: Schema.optional(LatencyReportLatencyMetrics),
      guardrail: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LatencyReportGuardrailLatency",
  }) as any as Schema.Schema<LatencyReportGuardrailLatency>;

export interface LatencyReport {
  /** Output only. Unordered list. Latency metrics for each LLM call. */
  llmCallLatencies?: Array<LatencyReportLlmCallLatency>;
  /** Output only. The total number of sessions considered in the latency report. */
  sessionCount?: number;
  /** Output only. Unordered list. Latency metrics for each tool. */
  toolLatencies?: Array<LatencyReportToolLatency>;
  /** Output only. Unordered list. Latency metrics for each callback. */
  callbackLatencies?: Array<LatencyReportCallbackLatency>;
  /** Output only. Unordered list. Latency metrics for each guardrail. */
  guardrailLatencies?: Array<LatencyReportGuardrailLatency>;
}

export const LatencyReport: Schema.Schema<LatencyReport> = Schema.suspend(() =>
  Schema.Struct({
    llmCallLatencies: Schema.optional(
      Schema.Array(LatencyReportLlmCallLatency),
    ),
    sessionCount: Schema.optional(Schema.Number),
    toolLatencies: Schema.optional(Schema.Array(LatencyReportToolLatency)),
    callbackLatencies: Schema.optional(
      Schema.Array(LatencyReportCallbackLatency),
    ),
    guardrailLatencies: Schema.optional(
      Schema.Array(LatencyReportGuardrailLatency),
    ),
  }),
).annotate({
  identifier: "LatencyReport",
}) as any as Schema.Schema<LatencyReport>;

export interface ExpressionCondition {
  /** Required. The string representation of cloud.api.Expression condition. */
  expression?: string;
}

export const ExpressionCondition: Schema.Schema<ExpressionCondition> =
  Schema.suspend(() =>
    Schema.Struct({
      expression: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ExpressionCondition",
  }) as any as Schema.Schema<ExpressionCondition>;

export interface PythonCodeCondition {
  /** Required. The python code to execute. */
  pythonCode?: string;
}

export const PythonCodeCondition: Schema.Schema<PythonCodeCondition> =
  Schema.suspend(() =>
    Schema.Struct({
      pythonCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PythonCodeCondition",
  }) as any as Schema.Schema<PythonCodeCondition>;

export interface TransferRuleDeterministicTransfer {
  /** Optional. A rule that evaluates a session state condition. If the condition evaluates to true, the transfer occurs. */
  expressionCondition?: ExpressionCondition;
  /** Optional. A rule that uses Python code block to evaluate the conditions. If the condition evaluates to true, the transfer occurs. */
  pythonCodeCondition?: PythonCodeCondition;
}

export const TransferRuleDeterministicTransfer: Schema.Schema<TransferRuleDeterministicTransfer> =
  Schema.suspend(() =>
    Schema.Struct({
      expressionCondition: Schema.optional(ExpressionCondition),
      pythonCodeCondition: Schema.optional(PythonCodeCondition),
    }),
  ).annotate({
    identifier: "TransferRuleDeterministicTransfer",
  }) as any as Schema.Schema<TransferRuleDeterministicTransfer>;

export interface SessionOutputDiagnosticInfo {
  /** A trace of the entire request processing, represented as a root span. This span can contain nested child spans for specific operations. */
  rootSpan?: Span;
  /** List of the messages that happened during the processing. */
  messages?: Array<Message>;
}

export const SessionOutputDiagnosticInfo: Schema.Schema<SessionOutputDiagnosticInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      rootSpan: Schema.optional(Span),
      messages: Schema.optional(Schema.Array(Message)),
    }),
  ).annotate({
    identifier: "SessionOutputDiagnosticInfo",
  }) as any as Schema.Schema<SessionOutputDiagnosticInfo>;

export interface McpToolset {
  /** Optional. Service Directory configuration for VPC-SC, used to resolve service names within a perimeter. */
  serviceDirectoryConfig?: ServiceDirectoryConfig;
  /** Required. The address of the MCP server, for example, "https://example.com/mcp/". If the server is built with the MCP SDK, the url should be suffixed with "/mcp/". Only Streamable HTTP transport based servers are supported. See https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http for more details. */
  serverAddress?: string;
  /** Optional. Authentication information required to access tools and execute a tool against the MCP server. For bearer token authentication, the token applies only to tool execution, not to listing tools. This requires that tools can be listed without authentication. */
  apiAuthentication?: ApiAuthentication;
  /** Optional. The TLS configuration. Includes the custom server certificates that the client should trust. */
  tlsConfig?: TlsConfig;
}

export const McpToolset: Schema.Schema<McpToolset> = Schema.suspend(() =>
  Schema.Struct({
    serviceDirectoryConfig: Schema.optional(ServiceDirectoryConfig),
    serverAddress: Schema.optional(Schema.String),
    apiAuthentication: Schema.optional(ApiAuthentication),
    tlsConfig: Schema.optional(TlsConfig),
  }),
).annotate({ identifier: "McpToolset" }) as any as Schema.Schema<McpToolset>;

export interface AppVariableDeclaration {
  /** Required. The schema of the variable. */
  schema?: Ces_Schema;
  /** Required. The name of the variable. The name must start with a letter or underscore and contain only letters, numbers, or underscores. */
  name?: string;
  /** Required. The description of the variable. */
  description?: string;
}

export const AppVariableDeclaration: Schema.Schema<AppVariableDeclaration> =
  Schema.suspend(() =>
    Schema.Struct({
      schema: Schema.optional(Ces_Schema),
      name: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AppVariableDeclaration",
  }) as any as Schema.Schema<AppVariableDeclaration>;

export interface CitationsCitedChunk {
  /** Title of the cited document. */
  title?: string;
  /** Text used for citation. */
  text?: string;
  /** URI used for citation. */
  uri?: string;
}

export const CitationsCitedChunk: Schema.Schema<CitationsCitedChunk> =
  Schema.suspend(() =>
    Schema.Struct({
      title: Schema.optional(Schema.String),
      text: Schema.optional(Schema.String),
      uri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CitationsCitedChunk",
  }) as any as Schema.Schema<CitationsCitedChunk>;

export interface Citations {
  /** List of cited pieces of information. */
  citedChunks?: Array<CitationsCitedChunk>;
}

export const Citations: Schema.Schema<Citations> = Schema.suspend(() =>
  Schema.Struct({
    citedChunks: Schema.optional(Schema.Array(CitationsCitedChunk)),
  }),
).annotate({ identifier: "Citations" }) as any as Schema.Schema<Citations>;

export interface OmnichannelIntegrationConfigCesAppConfig {
  /** The unique identifier of the CES app. Format: `projects/{project}/locations/{location}/apps/{app}` */
  app?: string;
}

export const OmnichannelIntegrationConfigCesAppConfig: Schema.Schema<OmnichannelIntegrationConfigCesAppConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      app: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OmnichannelIntegrationConfigCesAppConfig",
  }) as any as Schema.Schema<OmnichannelIntegrationConfigCesAppConfig>;

export interface OmnichannelIntegrationConfigSubscriberConfig {
  /** Ces app config. */
  cesAppConfig?: OmnichannelIntegrationConfigCesAppConfig;
}

export const OmnichannelIntegrationConfigSubscriberConfig: Schema.Schema<OmnichannelIntegrationConfigSubscriberConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      cesAppConfig: Schema.optional(OmnichannelIntegrationConfigCesAppConfig),
    }),
  ).annotate({
    identifier: "OmnichannelIntegrationConfigSubscriberConfig",
  }) as any as Schema.Schema<OmnichannelIntegrationConfigSubscriberConfig>;

export interface CodeBlock {
  /** Required. Python code which will be invoked in tool fake mode. Expected Python function signature - To catch all tool calls: def fake_tool_call(tool: Tool, input: dict[str, Any], callback_context: CallbackContext) -> Optional[dict[str, Any]]: To catch a specific tool call: def fake_{tool_id}(tool: Tool, input: dict[str, Any], callback_context: CallbackContext) -> Optional[dict[str, Any]]: If the function returns None, the real tool will be invoked instead. */
  pythonCode?: string;
}

export const CodeBlock: Schema.Schema<CodeBlock> = Schema.suspend(() =>
  Schema.Struct({
    pythonCode: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "CodeBlock" }) as any as Schema.Schema<CodeBlock>;

export interface RedactionConfig {
  /** Optional. If true, redaction will be applied in various logging scenarios, including conversation history, Cloud Logging and audio recording. */
  enableRedaction?: boolean;
  /** Optional. [DLP](https://cloud.google.com/dlp/docs) inspect template name to configure detection of sensitive data types. Format: `projects/{project}/locations/{location}/inspectTemplates/{inspect_template}` */
  inspectTemplate?: string;
  /** Optional. [DLP](https://cloud.google.com/dlp/docs) deidentify template name to instruct on how to de-identify content. Format: `projects/{project}/locations/{location}/deidentifyTemplates/{deidentify_template}` */
  deidentifyTemplate?: string;
}

export const RedactionConfig: Schema.Schema<RedactionConfig> = Schema.suspend(
  () =>
    Schema.Struct({
      enableRedaction: Schema.optional(Schema.Boolean),
      inspectTemplate: Schema.optional(Schema.String),
      deidentifyTemplate: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "RedactionConfig",
}) as any as Schema.Schema<RedactionConfig>;

export interface FileSearchTool {
  /** Optional. The type of the corpus. Default is FULLY_MANAGED. */
  corpusType?:
    | "CORPUS_TYPE_UNSPECIFIED"
    | "USER_OWNED"
    | "FULLY_MANAGED"
    | (string & {});
  /** Optional. The corpus where files are stored. Format: projects/{project}/locations/{location}/ragCorpora/{rag_corpus} */
  fileCorpus?: string;
  /** Required. The tool name. */
  name?: string;
  /** Optional. The tool description. */
  description?: string;
}

export const FileSearchTool: Schema.Schema<FileSearchTool> = Schema.suspend(
  () =>
    Schema.Struct({
      corpusType: Schema.optional(Schema.String),
      fileCorpus: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "FileSearchTool",
}) as any as Schema.Schema<FileSearchTool>;

export interface ClientFunction {
  /** Optional. The function description. */
  description?: string;
  /** Optional. The schema of the function parameters. */
  parameters?: Ces_Schema;
  /** Optional. The schema of the function response. */
  response?: Ces_Schema;
  /** Required. The function name. */
  name?: string;
}

export const ClientFunction: Schema.Schema<ClientFunction> = Schema.suspend(
  () =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
      parameters: Schema.optional(Ces_Schema),
      response: Schema.optional(Ces_Schema),
      name: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ClientFunction",
}) as any as Schema.Schema<ClientFunction>;

export interface ToolFakeConfig {
  /** Optional. Code block which will be executed instead of a real tool call. */
  codeBlock?: CodeBlock;
  /** Optional. Whether the tool is using fake mode. */
  enableFakeMode?: boolean;
}

export const ToolFakeConfig: Schema.Schema<ToolFakeConfig> = Schema.suspend(
  () =>
    Schema.Struct({
      codeBlock: Schema.optional(CodeBlock),
      enableFakeMode: Schema.optional(Schema.Boolean),
    }),
).annotate({
  identifier: "ToolFakeConfig",
}) as any as Schema.Schema<ToolFakeConfig>;

export interface GoogleSearchTool {
  /** Optional. Prompt instructions passed to planner on how the search results should be processed for text and voice. */
  promptConfig?: GoogleSearchToolPromptConfig;
  /** Optional. Description of the tool's purpose. */
  description?: string;
  /** Required. The name of the tool. */
  name?: string;
  /** Optional. Content will be fetched directly from these URLs for context and grounding. Example: "https://example.com/path.html". A maximum of 20 URLs are allowed. */
  contextUrls?: Array<string>;
  /** Optional. Specifies domains to restrict search results to. Example: "example.com", "another.site". A maximum of 20 domains can be specified. */
  preferredDomains?: Array<string>;
  /** Optional. List of domains to be excluded from the search results. Example: "example.com". A maximum of 2000 domains can be excluded. */
  excludeDomains?: Array<string>;
}

export const GoogleSearchTool: Schema.Schema<GoogleSearchTool> = Schema.suspend(
  () =>
    Schema.Struct({
      promptConfig: Schema.optional(GoogleSearchToolPromptConfig),
      description: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      contextUrls: Schema.optional(Schema.Array(Schema.String)),
      preferredDomains: Schema.optional(Schema.Array(Schema.String)),
      excludeDomains: Schema.optional(Schema.Array(Schema.String)),
    }),
).annotate({
  identifier: "GoogleSearchTool",
}) as any as Schema.Schema<GoogleSearchTool>;

export interface SystemTool {
  /** Output only. The description of the system tool. */
  description?: string;
  /** Required. The name of the system tool. */
  name?: string;
}

export const SystemTool: Schema.Schema<SystemTool> = Schema.suspend(() =>
  Schema.Struct({
    description: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "SystemTool" }) as any as Schema.Schema<SystemTool>;

export interface PythonFunction {
  /** Output only. The description of the Python function, parsed from the python code's docstring. */
  description?: string;
  /** Optional. The name of the Python function to execute. Must match a Python function name defined in the python code. Case sensitive. If the name is not provided, the first function defined in the python code will be used. */
  name?: string;
  /** Optional. The Python code to execute for the tool. */
  pythonCode?: string;
}

export const PythonFunction: Schema.Schema<PythonFunction> = Schema.suspend(
  () =>
    Schema.Struct({
      description: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      pythonCode: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "PythonFunction",
}) as any as Schema.Schema<PythonFunction>;

export interface EndUserAuthConfigOauth2AuthCodeConfig {
  /** Required. Oauth token parameter name to pass through. Must be in the format `$context.variables.`. */
  oauthToken?: string;
}

export const EndUserAuthConfigOauth2AuthCodeConfig: Schema.Schema<EndUserAuthConfigOauth2AuthCodeConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      oauthToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EndUserAuthConfigOauth2AuthCodeConfig",
  }) as any as Schema.Schema<EndUserAuthConfigOauth2AuthCodeConfig>;

export interface EndUserAuthConfig {
  /** Oauth 2.0 Authorization Code authentication. */
  oauth2AuthCodeConfig?: EndUserAuthConfigOauth2AuthCodeConfig;
  /** JWT Profile Oauth 2.0 Authorization Grant authentication. */
  oauth2JwtBearerConfig?: EndUserAuthConfigOauth2JwtBearerConfig;
}

export const EndUserAuthConfig: Schema.Schema<EndUserAuthConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      oauth2AuthCodeConfig: Schema.optional(
        EndUserAuthConfigOauth2AuthCodeConfig,
      ),
      oauth2JwtBearerConfig: Schema.optional(
        EndUserAuthConfigOauth2JwtBearerConfig,
      ),
    }),
  ).annotate({
    identifier: "EndUserAuthConfig",
  }) as any as Schema.Schema<EndUserAuthConfig>;

export interface ActionEntityOperation {
  /** Required. Operation to perform on the entity. */
  operation?:
    | "OPERATION_TYPE_UNSPECIFIED"
    | "LIST"
    | "GET"
    | "CREATE"
    | "UPDATE"
    | "DELETE"
    | (string & {});
  /** Required. ID of the entity. */
  entityId?: string;
}

export const ActionEntityOperation: Schema.Schema<ActionEntityOperation> =
  Schema.suspend(() =>
    Schema.Struct({
      operation: Schema.optional(Schema.String),
      entityId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ActionEntityOperation",
  }) as any as Schema.Schema<ActionEntityOperation>;

export interface Action {
  /** Entity operation configuration for the tool to use. */
  entityOperation?: ActionEntityOperation;
  /** ID of a Connection action for the tool to use. */
  connectionActionId?: string;
  /** Optional. Entity fields to return from the operation. If no fields are specified, all fields of the Entity will be returned. */
  outputFields?: Array<string>;
  /** Optional. Entity fields to use as inputs for the operation. If no fields are specified, all fields of the Entity will be used. */
  inputFields?: Array<string>;
}

export const Action: Schema.Schema<Action> = Schema.suspend(() =>
  Schema.Struct({
    entityOperation: Schema.optional(ActionEntityOperation),
    connectionActionId: Schema.optional(Schema.String),
    outputFields: Schema.optional(Schema.Array(Schema.String)),
    inputFields: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({ identifier: "Action" }) as any as Schema.Schema<Action>;

export interface ConnectorTool {
  /** Optional. Configures how authentication is handled in Integration Connectors. By default, an admin authentication is passed in the Integration Connectors API requests. You can override it with a different end-user authentication config. **Note**: The Connection must have authentication override enabled in order to specify an EUC configuration here - otherwise, the ConnectorTool creation will fail. See https://cloud.google.com/application-integration/docs/configure-connectors-task#configure-authentication-override for details. */
  authConfig?: EndUserAuthConfig;
  /** Optional. The name of the tool that can be used by the Agent to decide whether to call this ConnectorTool. */
  name?: string;
  /** Optional. The description of the tool that can be used by the Agent to decide whether to call this ConnectorTool. */
  description?: string;
  /** Required. The full resource name of the referenced Integration Connectors Connection. Format: `projects/{project}/locations/{location}/connections/{connection}` */
  connection?: string;
  /** Required. Action for the tool to use. */
  action?: Action;
}

export const ConnectorTool: Schema.Schema<ConnectorTool> = Schema.suspend(() =>
  Schema.Struct({
    authConfig: Schema.optional(EndUserAuthConfig),
    name: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    connection: Schema.optional(Schema.String),
    action: Schema.optional(Action),
  }),
).annotate({
  identifier: "ConnectorTool",
}) as any as Schema.Schema<ConnectorTool>;

export interface OpenApiTool {
  /** Optional. The description of the tool. If not provided, the description of the tool will be derived from the OpenAPI schema, from `operation.description` or `operation.summary`. */
  description?: string;
  /** Optional. The name of the tool. If not provided, the name of the tool will be derived from the OpenAPI schema, from `operation.operationId`. */
  name?: string;
  /** Optional. Service Directory configuration. */
  serviceDirectoryConfig?: ServiceDirectoryConfig;
  /** Optional. The TLS configuration. Includes the custom server certificates that the client will trust. */
  tlsConfig?: TlsConfig;
  /** Optional. If true, the agent will ignore unknown fields in the API response. */
  ignoreUnknownFields?: boolean;
  /** Required. The OpenAPI schema in JSON or YAML format. */
  openApiSchema?: string;
  /** Optional. The server URL of the Open API schema. This field is only set in tools in the environment dependencies during the export process if the schema contains a server url. During the import process, if this url is present in the environment dependencies and the schema has the $env_var placeholder, it will replace the placeholder in the schema. */
  url?: string;
  /** Optional. Authentication information required by the API. */
  apiAuthentication?: ApiAuthentication;
}

export const OpenApiTool: Schema.Schema<OpenApiTool> = Schema.suspend(() =>
  Schema.Struct({
    description: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    serviceDirectoryConfig: Schema.optional(ServiceDirectoryConfig),
    tlsConfig: Schema.optional(TlsConfig),
    ignoreUnknownFields: Schema.optional(Schema.Boolean),
    openApiSchema: Schema.optional(Schema.String),
    url: Schema.optional(Schema.String),
    apiAuthentication: Schema.optional(ApiAuthentication),
  }),
).annotate({ identifier: "OpenApiTool" }) as any as Schema.Schema<OpenApiTool>;

export interface Tool {
  /** Optional. The file search tool. */
  fileSearchTool?: FileSearchTool;
  /** Etag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes. */
  etag?: string;
  /** Optional. The client function. */
  clientFunction?: ClientFunction;
  /** Output only. The display name of the tool, derived based on the tool's type. For example, display name of a ClientFunction is derived from its `name` property. */
  displayName?: string;
  /** Output only. Timestamp when the tool was last updated. */
  updateTime?: string;
  /** Optional. The execution type of the tool. */
  executionType?:
    | "EXECUTION_TYPE_UNSPECIFIED"
    | "SYNCHRONOUS"
    | "ASYNCHRONOUS"
    | (string & {});
  /** Optional. The data store tool. */
  dataStoreTool?: DataStoreTool;
  /** Optional. Configuration for tool behavior in fake mode. */
  toolFakeConfig?: ToolFakeConfig;
  /** Optional. The MCP tool. An MCP tool cannot be created or updated directly and is managed by the MCP toolset. */
  mcpTool?: McpTool;
  /** Optional. The google search tool. */
  googleSearchTool?: GoogleSearchTool;
  /** Optional. The widget tool. */
  widgetTool?: WidgetTool;
  /** Optional. The system tool. */
  systemTool?: SystemTool;
  /** Optional. The python function tool. */
  pythonFunction?: PythonFunction;
  /** Optional. The Integration Connector tool. */
  connectorTool?: ConnectorTool;
  /** Optional. The open API tool. */
  openApiTool?: OpenApiTool;
  /** Identifier. The resource name of the tool. Format: * `projects/{project}/locations/{location}/apps/{app}/tools/{tool}` for standalone tools. * `projects/{project}/locations/{location}/apps/{app}/toolsets/{toolset}/tools/{tool}` for tools retrieved from a toolset. These tools are dynamic and output-only; they cannot be referenced directly where a tool is expected. */
  name?: string;
  /** Output only. If the tool is generated by the LLM assistant, this field contains a descriptive summary of the generation. */
  generatedSummary?: string;
  /** Output only. Timestamp when the tool was created. */
  createTime?: string;
}

export const Tool: Schema.Schema<Tool> = Schema.suspend(() =>
  Schema.Struct({
    fileSearchTool: Schema.optional(FileSearchTool),
    etag: Schema.optional(Schema.String),
    clientFunction: Schema.optional(ClientFunction),
    displayName: Schema.optional(Schema.String),
    updateTime: Schema.optional(Schema.String),
    executionType: Schema.optional(Schema.String),
    dataStoreTool: Schema.optional(DataStoreTool),
    toolFakeConfig: Schema.optional(ToolFakeConfig),
    mcpTool: Schema.optional(McpTool),
    googleSearchTool: Schema.optional(GoogleSearchTool),
    widgetTool: Schema.optional(WidgetTool),
    systemTool: Schema.optional(SystemTool),
    pythonFunction: Schema.optional(PythonFunction),
    connectorTool: Schema.optional(ConnectorTool),
    openApiTool: Schema.optional(OpenApiTool),
    name: Schema.optional(Schema.String),
    generatedSummary: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Tool" }) as any as Schema.Schema<Tool>;

export interface GenerateAppResourceResponseTools {
  /** The list of tools generated by the LLM assistant. */
  tools?: Array<Tool>;
}

export const GenerateAppResourceResponseTools: Schema.Schema<GenerateAppResourceResponseTools> =
  Schema.suspend(() =>
    Schema.Struct({
      tools: Schema.optional(Schema.Array(Tool)),
    }),
  ).annotate({
    identifier: "GenerateAppResourceResponseTools",
  }) as any as Schema.Schema<GenerateAppResourceResponseTools>;

export interface AgentLlmAgent {}

export const AgentLlmAgent: Schema.Schema<AgentLlmAgent> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({
  identifier: "AgentLlmAgent",
}) as any as Schema.Schema<AgentLlmAgent>;

export interface AgentAgentToolset {
  /** Required. The resource name of the toolset. Format: `projects/{project}/locations/{location}/apps/{app}/toolsets/{toolset}` */
  toolset?: string;
  /** Optional. The tools IDs to filter the toolset. */
  toolIds?: Array<string>;
}

export const AgentAgentToolset: Schema.Schema<AgentAgentToolset> =
  Schema.suspend(() =>
    Schema.Struct({
      toolset: Schema.optional(Schema.String),
      toolIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "AgentAgentToolset",
  }) as any as Schema.Schema<AgentAgentToolset>;

export interface AgentRemoteDialogflowAgent {
  /** Optional. The environment ID of the Dialogflow agent to be used for the agent execution. If not specified, the draft environment will be used. */
  environmentId?: string;
  /** Required. The [Dialogflow](https://docs.cloud.google.com/dialogflow/cx/docs/concept/agent) agent resource name. Format: `projects/{project}/locations/{location}/agents/{agent}` */
  agent?: string;
  /** Optional. Indicates whether to respect the message-level interruption settings configured in the Dialogflow agent. * If false: all response messages from the Dialogflow agent follow the app-level barge-in settings. * If true: only response messages with [`allow_playback_interruption`](https://docs.cloud.google.com/dialogflow/cx/docs/reference/rpc/google.cloud.dialogflow.cx.v3#text) set to true will be interruptable, all other messages follow the app-level barge-in settings. */
  respectResponseInterruptionSettings?: boolean;
  /** Optional. The flow ID of the flow in the Dialogflow agent. */
  flowId?: string;
  /** Optional. The mapping of the Dialogflow session parameters names to the app variables names to be sent back to the CES agent after the Dialogflow agent execution ends. */
  outputVariableMapping?: Record<string, string>;
  /** Optional. The mapping of the app variables names to the Dialogflow session parameters names to be sent to the Dialogflow agent as input. */
  inputVariableMapping?: Record<string, string>;
}

export const AgentRemoteDialogflowAgent: Schema.Schema<AgentRemoteDialogflowAgent> =
  Schema.suspend(() =>
    Schema.Struct({
      environmentId: Schema.optional(Schema.String),
      agent: Schema.optional(Schema.String),
      respectResponseInterruptionSettings: Schema.optional(Schema.Boolean),
      flowId: Schema.optional(Schema.String),
      outputVariableMapping: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      inputVariableMapping: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
    }),
  ).annotate({
    identifier: "AgentRemoteDialogflowAgent",
  }) as any as Schema.Schema<AgentRemoteDialogflowAgent>;

export interface TransferRuleDisablePlannerTransfer {
  /** Required. If the condition evaluates to true, planner will not be allowed to transfer to the target agent. */
  expressionCondition?: ExpressionCondition;
}

export const TransferRuleDisablePlannerTransfer: Schema.Schema<TransferRuleDisablePlannerTransfer> =
  Schema.suspend(() =>
    Schema.Struct({
      expressionCondition: Schema.optional(ExpressionCondition),
    }),
  ).annotate({
    identifier: "TransferRuleDisablePlannerTransfer",
  }) as any as Schema.Schema<TransferRuleDisablePlannerTransfer>;

export interface TransferRule {
  /** Required. The direction of the transfer. */
  direction?:
    | "DIRECTION_UNSPECIFIED"
    | "PARENT_TO_CHILD"
    | "CHILD_TO_PARENT"
    | (string & {});
  /** Required. The resource name of the child agent the rule applies to. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}` */
  childAgent?: string;
  /** Optional. Rule that prevents the planner from transferring to the target agent. */
  disablePlannerTransfer?: TransferRuleDisablePlannerTransfer;
  /** Optional. A rule that immediately transfers to the target agent when the condition is met. */
  deterministicTransfer?: TransferRuleDeterministicTransfer;
}

export const TransferRule: Schema.Schema<TransferRule> = Schema.suspend(() =>
  Schema.Struct({
    direction: Schema.optional(Schema.String),
    childAgent: Schema.optional(Schema.String),
    disablePlannerTransfer: Schema.optional(TransferRuleDisablePlannerTransfer),
    deterministicTransfer: Schema.optional(TransferRuleDeterministicTransfer),
  }),
).annotate({
  identifier: "TransferRule",
}) as any as Schema.Schema<TransferRule>;

export interface Agent {
  /** Optional. The default agent type. */
  llmAgent?: AgentLlmAgent;
  /** Optional. List of toolsets for the agent. */
  toolsets?: Array<AgentAgentToolset>;
  /** Optional. The callbacks to execute before the model is called. If there are multiple calls to the model, the callback will be executed multiple times. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped. */
  beforeModelCallbacks?: Array<Callback>;
  /** Etag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes. */
  etag?: string;
  /** Optional. List of child agents in the agent tree. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}` */
  childAgents?: Array<string>;
  /** Output only. Timestamp when the agent was created. */
  createTime?: string;
  /** Optional. List of guardrails for the agent. Format: `projects/{project}/locations/{location}/apps/{app}/guardrails/{guardrail}` */
  guardrails?: Array<string>;
  /** Output only. Timestamp when the agent was last updated. */
  updateTime?: string;
  /** Optional. The callbacks to execute after the tool is invoked. If there are multiple tool invocations, the callback will be executed multiple times. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped. */
  afterToolCallbacks?: Array<Callback>;
  /** Optional. Instructions for the LLM model to guide the agent's behavior. */
  instruction?: string;
  /** Optional. The callbacks to execute after the agent is called. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped. */
  afterAgentCallbacks?: Array<Callback>;
  /** Output only. If the agent is generated by the LLM assistant, this field contains a descriptive summary of the generation. */
  generatedSummary?: string;
  /** Optional. Configurations for the LLM model. */
  modelSettings?: ModelSettings;
  /** Optional. The callbacks to execute before the tool is invoked. If there are multiple tool invocations, the callback will be executed multiple times. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped. */
  beforeToolCallbacks?: Array<Callback>;
  /** Optional. The callbacks to execute after the model is called. If there are multiple calls to the model, the callback will be executed multiple times. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped. */
  afterModelCallbacks?: Array<Callback>;
  /** Optional. The callbacks to execute before the agent is called. The provided callbacks are executed sequentially in the exact order they are given in the list. If a callback returns an overridden response, execution stops and any remaining callbacks are skipped. */
  beforeAgentCallbacks?: Array<Callback>;
  /** Optional. List of available tools for the agent. Format: `projects/{project}/locations/{location}/apps/{app}/tools/{tool}` */
  tools?: Array<string>;
  /** Identifier. The unique identifier of the agent. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}` */
  name?: string;
  /** Optional. Human-readable description of the agent. */
  description?: string;
  /** Required. Display name of the agent. */
  displayName?: string;
  /** Optional. The remote [Dialogflow](https://cloud.google.com/dialogflow/cx/docs/concept/console-conversational-agents) agent to be used for the agent execution. If this field is set, all other agent level properties will be ignored. Note: If the Dialogflow agent is in a different project from the app, you should grant `roles/dialogflow.client` to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`. */
  remoteDialogflowAgent?: AgentRemoteDialogflowAgent;
  /** Optional. Agent transfer rules. If multiple rules match, the first one in the list will be used. */
  transferRules?: Array<TransferRule>;
}

export const Agent: Schema.Schema<Agent> = Schema.suspend(() =>
  Schema.Struct({
    llmAgent: Schema.optional(AgentLlmAgent),
    toolsets: Schema.optional(Schema.Array(AgentAgentToolset)),
    beforeModelCallbacks: Schema.optional(Schema.Array(Callback)),
    etag: Schema.optional(Schema.String),
    childAgents: Schema.optional(Schema.Array(Schema.String)),
    createTime: Schema.optional(Schema.String),
    guardrails: Schema.optional(Schema.Array(Schema.String)),
    updateTime: Schema.optional(Schema.String),
    afterToolCallbacks: Schema.optional(Schema.Array(Callback)),
    instruction: Schema.optional(Schema.String),
    afterAgentCallbacks: Schema.optional(Schema.Array(Callback)),
    generatedSummary: Schema.optional(Schema.String),
    modelSettings: Schema.optional(ModelSettings),
    beforeToolCallbacks: Schema.optional(Schema.Array(Callback)),
    afterModelCallbacks: Schema.optional(Schema.Array(Callback)),
    beforeAgentCallbacks: Schema.optional(Schema.Array(Callback)),
    tools: Schema.optional(Schema.Array(Schema.String)),
    name: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
    remoteDialogflowAgent: Schema.optional(AgentRemoteDialogflowAgent),
    transferRules: Schema.optional(Schema.Array(TransferRule)),
  }),
).annotate({ identifier: "Agent" }) as any as Schema.Schema<Agent>;

export interface Example {
  /** Optional. Human-readable description of the example. */
  description?: string;
  /** Optional. The collection of messages that make up the conversation. */
  messages?: Array<Message>;
  /** Required. Display name of the example. */
  displayName?: string;
  /** Etag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes. */
  etag?: string;
  /** Output only. Timestamp when the example was last updated. */
  updateTime?: string;
  /** Optional. The agent that initially handles the conversation. If not specified, the example represents a conversation that is handled by the root agent. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}` */
  entryAgent?: string;
  /** Output only. The example may become invalid if referencing resources are deleted. Invalid examples will not be used as few-shot examples. */
  invalid?: boolean;
  /** Identifier. The unique identifier of the example. Format: `projects/{project}/locations/{location}/apps/{app}/examples/{example}` */
  name?: string;
  /** Output only. Timestamp when the example was created. */
  createTime?: string;
}

export const Example: Schema.Schema<Example> = Schema.suspend(() =>
  Schema.Struct({
    description: Schema.optional(Schema.String),
    messages: Schema.optional(Schema.Array(Message)),
    displayName: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
    updateTime: Schema.optional(Schema.String),
    entryAgent: Schema.optional(Schema.String),
    invalid: Schema.optional(Schema.Boolean),
    name: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Example" }) as any as Schema.Schema<Example>;

export interface SynthesizeSpeechConfig {
  /** Optional. The speaking rate/speed in the range [0.25, 2.0]. 1.0 is the normal native speed supported by the specific voice. 2.0 is twice as fast, and 0.5 is half as fast. Values outside of the range [0.25, 2.0] will return an error. */
  speakingRate?: number;
  /** Optional. The name of the voice. If not set, the service will choose a voice based on the other parameters such as language_code. For the list of available voices, please refer to [Supported voices and languages](https://cloud.google.com/text-to-speech/docs/voices) from Cloud Text-to-Speech. */
  voice?: string;
}

export const SynthesizeSpeechConfig: Schema.Schema<SynthesizeSpeechConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      speakingRate: Schema.optional(Schema.Number),
      voice: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SynthesizeSpeechConfig",
  }) as any as Schema.Schema<SynthesizeSpeechConfig>;

export interface BargeInConfig {
  /** Optional. If enabled, the agent will adapt its next response based on the assumption that the user hasn't heard the full preceding agent message. This should not be used in scenarios where agent responses are displayed visually. */
  bargeInAwareness?: boolean;
  /** Optional. Disables user barge-in while the agent is speaking. If true, user input during agent response playback will be ignored. Deprecated: `disable_barge_in` is deprecated in favor of `disable_barge_in_control` in ChannelProfile. */
  disableBargeIn?: boolean;
}

export const BargeInConfig: Schema.Schema<BargeInConfig> = Schema.suspend(() =>
  Schema.Struct({
    bargeInAwareness: Schema.optional(Schema.Boolean),
    disableBargeIn: Schema.optional(Schema.Boolean),
  }),
).annotate({
  identifier: "BargeInConfig",
}) as any as Schema.Schema<BargeInConfig>;

export interface AmbientSoundConfig {
  /** Optional. Ambient noise as a mono-channel, 16kHz WAV file stored in [Cloud Storage](https://cloud.google.com/storage). Note: Please make sure the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com` has `storage.objects.get` permission to the Cloud Storage object. */
  gcsUri?: string;
  /** Optional. Name of the prebuilt ambient sound. Valid values are: - "coffee_shop" - "keyboard" - "keypad" - "hum" - "office_1" - "office_2" - "office_3" - "room_1" - "room_2" - "room_3" - "room_4" - "room_5" - "air_conditioner" */
  prebuiltAmbientSound?: string;
  /** Optional. Volume gain (in dB) of the normal native volume supported by ambient noise, in the range [-96.0, 16.0]. If unset, or set to a value of 0.0 (dB), will play at normal native signal amplitude. A value of -6.0 (dB) will play at approximately half the amplitude of the normal native signal amplitude. A value of +6.0 (dB) will play at approximately twice the amplitude of the normal native signal amplitude. We strongly recommend not to exceed +10 (dB) as there's usually no effective increase in loudness for any value greater than that. */
  volumeGainDb?: number;
  /** Optional. Deprecated: `prebuilt_ambient_noise` is deprecated in favor of `prebuilt_ambient_sound`. */
  prebuiltAmbientNoise?:
    | "PREBUILT_AMBIENT_NOISE_UNSPECIFIED"
    | "RETAIL_STORE"
    | "CONVENTION_HALL"
    | "OUTDOOR"
    | (string & {});
}

export const AmbientSoundConfig: Schema.Schema<AmbientSoundConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      gcsUri: Schema.optional(Schema.String),
      prebuiltAmbientSound: Schema.optional(Schema.String),
      volumeGainDb: Schema.optional(Schema.Number),
      prebuiltAmbientNoise: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AmbientSoundConfig",
  }) as any as Schema.Schema<AmbientSoundConfig>;

export interface AudioProcessingConfig {
  /** Optional. Configuration of how the agent response should be synthesized, mapping from the language code to SynthesizeSpeechConfig. If the configuration for the specified language code is not found, the configuration for the root language code will be used. For example, if the map contains "en-us" and "en", and the specified language code is "en-gb", then "en" configuration will be used. Note: Language code is case-insensitive. */
  synthesizeSpeechConfigs?: Record<string, SynthesizeSpeechConfig>;
  /** Optional. Configures the agent behavior for the user barge-in activities. */
  bargeInConfig?: BargeInConfig;
  /** Optional. The duration of user inactivity (no speech or interaction) before the agent prompts the user for reengagement. If not set, the agent will not prompt the user for reengagement. */
  inactivityTimeout?: string;
  /** Optional. Configuration for the ambient sound to be played with the synthesized agent response, to enhance the naturalness of the conversation. */
  ambientSoundConfig?: AmbientSoundConfig;
}

export const AudioProcessingConfig: Schema.Schema<AudioProcessingConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      synthesizeSpeechConfigs: Schema.optional(
        Schema.Record(Schema.String, SynthesizeSpeechConfig),
      ),
      bargeInConfig: Schema.optional(BargeInConfig),
      inactivityTimeout: Schema.optional(Schema.String),
      ambientSoundConfig: Schema.optional(AmbientSoundConfig),
    }),
  ).annotate({
    identifier: "AudioProcessingConfig",
  }) as any as Schema.Schema<AudioProcessingConfig>;

export interface ClientCertificateSettings {
  /** Required. The TLS certificate encoded in PEM format. This string must include the begin header and end footer lines. */
  tlsCertificate?: string;
  /** Required. The name of the SecretManager secret version resource storing the private key encoded in PEM format. Format: `projects/{project}/secrets/{secret}/versions/{version}` */
  privateKey?: string;
  /** Optional. The name of the SecretManager secret version resource storing the passphrase to decrypt the private key. Should be left unset if the private key is not encrypted. Format: `projects/{project}/secrets/{secret}/versions/{version}` */
  passphrase?: string;
}

export const ClientCertificateSettings: Schema.Schema<ClientCertificateSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      tlsCertificate: Schema.optional(Schema.String),
      privateKey: Schema.optional(Schema.String),
      passphrase: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ClientCertificateSettings",
  }) as any as Schema.Schema<ClientCertificateSettings>;

export interface DataStoreSettingsEngine {
  /** Output only. The type of the engine. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "ENGINE_TYPE_SEARCH"
    | "ENGINE_TYPE_CHAT"
    | (string & {});
  /** Output only. The resource name of the engine. Format: `projects/{project}/locations/{location}/collections/{collection}/engines/{engine}` */
  name?: string;
}

export const DataStoreSettingsEngine: Schema.Schema<DataStoreSettingsEngine> =
  Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DataStoreSettingsEngine",
  }) as any as Schema.Schema<DataStoreSettingsEngine>;

export interface DataStoreSettings {
  /** Output only. The engines for the app. */
  engines?: Array<DataStoreSettingsEngine>;
}

export const DataStoreSettings: Schema.Schema<DataStoreSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      engines: Schema.optional(Schema.Array(DataStoreSettingsEngine)),
    }),
  ).annotate({
    identifier: "DataStoreSettings",
  }) as any as Schema.Schema<DataStoreSettings>;

export interface AudioRecordingConfig {
  /** Optional. The [Cloud Storage](https://cloud.google.com/storage) bucket to store the session audio recordings. The URI must start with "gs://". Please choose a bucket location that meets your data residency requirements. Note: If the Cloud Storage bucket is in a different project from the app, you should grant `storage.objects.create` permission to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`. */
  gcsBucket?: string;
  /** Optional. The Cloud Storage path prefix for audio recordings. This prefix can include the following placeholders, which will be dynamically substituted at serving time: - $project: project ID - $location: app location - $app: app ID - $date: session date in YYYY-MM-DD format - $session: session ID If the path prefix is not specified, the default prefix `$project/$location/$app/$date/$session/` will be used. */
  gcsPathPrefix?: string;
}

export const AudioRecordingConfig: Schema.Schema<AudioRecordingConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      gcsBucket: Schema.optional(Schema.String),
      gcsPathPrefix: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AudioRecordingConfig",
  }) as any as Schema.Schema<AudioRecordingConfig>;

export interface MetricAnalysisSettings {
  /** Optional. Whether to collect conversation data for llm analysis metrics. If true, conversation data will not be collected for llm analysis metrics; otherwise, conversation data will be collected. */
  llmMetricsOptedOut?: boolean;
}

export const MetricAnalysisSettings: Schema.Schema<MetricAnalysisSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      llmMetricsOptedOut: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "MetricAnalysisSettings",
  }) as any as Schema.Schema<MetricAnalysisSettings>;

export interface CloudLoggingSettings {
  /** Optional. Whether to enable Cloud Logging for the sessions. */
  enableCloudLogging?: boolean;
}

export const CloudLoggingSettings: Schema.Schema<CloudLoggingSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      enableCloudLogging: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "CloudLoggingSettings",
  }) as any as Schema.Schema<CloudLoggingSettings>;

export interface BigQueryExportSettings {
  /** Optional. The BigQuery dataset to export the data to. */
  dataset?: string;
  /** Optional. The project ID of the BigQuery dataset to export the data to. Note: If the BigQuery dataset is in a different project from the app, you should grant `roles/bigquery.admin` role to the CES service agent `service-@gcp-sa-ces.iam.gserviceaccount.com`. */
  project?: string;
  /** Optional. Indicates whether the BigQuery export is enabled. */
  enabled?: boolean;
}

export const BigQueryExportSettings: Schema.Schema<BigQueryExportSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      dataset: Schema.optional(Schema.String),
      project: Schema.optional(Schema.String),
      enabled: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "BigQueryExportSettings",
  }) as any as Schema.Schema<BigQueryExportSettings>;

export interface ConversationLoggingSettings {
  /** Optional. Whether to disable conversation logging for the sessions. */
  disableConversationLogging?: boolean;
}

export const ConversationLoggingSettings: Schema.Schema<ConversationLoggingSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      disableConversationLogging: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ConversationLoggingSettings",
  }) as any as Schema.Schema<ConversationLoggingSettings>;

export interface LoggingSettings {
  /** Optional. Configuration for how audio interactions should be recorded for the evaluation. By default, audio recording is not enabled for evaluation sessions. */
  evaluationAudioRecordingConfig?: AudioRecordingConfig;
  /** Optional. Settings to describe the conversation data collection behaviors for the LLM analysis pipeline for the app. */
  metricAnalysisSettings?: MetricAnalysisSettings;
  /** Optional. Settings to describe the Cloud Logging behaviors for the app. */
  cloudLoggingSettings?: CloudLoggingSettings;
  /** Optional. Configuration for how sensitive data should be redacted. */
  redactionConfig?: RedactionConfig;
  /** Optional. Settings to describe the BigQuery export behaviors for the app. The conversation data will be exported to BigQuery tables if it is enabled. */
  bigqueryExportSettings?: BigQueryExportSettings;
  /** Optional. Configuration for how audio interactions should be recorded. */
  audioRecordingConfig?: AudioRecordingConfig;
  /** Optional. Settings to describe the conversation logging behaviors for the app. */
  conversationLoggingSettings?: ConversationLoggingSettings;
}

export const LoggingSettings: Schema.Schema<LoggingSettings> = Schema.suspend(
  () =>
    Schema.Struct({
      evaluationAudioRecordingConfig: Schema.optional(AudioRecordingConfig),
      metricAnalysisSettings: Schema.optional(MetricAnalysisSettings),
      cloudLoggingSettings: Schema.optional(CloudLoggingSettings),
      redactionConfig: Schema.optional(RedactionConfig),
      bigqueryExportSettings: Schema.optional(BigQueryExportSettings),
      audioRecordingConfig: Schema.optional(AudioRecordingConfig),
      conversationLoggingSettings: Schema.optional(ConversationLoggingSettings),
    }),
).annotate({
  identifier: "LoggingSettings",
}) as any as Schema.Schema<LoggingSettings>;

export interface ErrorHandlingSettings {
  /** Optional. The strategy to use for error handling. */
  errorHandlingStrategy?:
    | "ERROR_HANDLING_STRATEGY_UNSPECIFIED"
    | "NONE"
    | "FALLBACK_RESPONSE"
    | (string & {});
}

export const ErrorHandlingSettings: Schema.Schema<ErrorHandlingSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      errorHandlingStrategy: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ErrorHandlingSettings",
  }) as any as Schema.Schema<ErrorHandlingSettings>;

export interface EvaluationSettings {
  /** Optional. Who starts the conversation in a scenario evaluation. */
  scenarioConversationInitiator?:
    | "SCENARIO_CONVERSATION_INITIATOR_UNSPECIFIED"
    | "USER"
    | "AGENT"
    | (string & {});
  /** Optional. The default method used to run golden evaluations. This will be used if no golden_run_method is specified in the RunEvaluationRequest. */
  goldenRunMethod?:
    | "GOLDEN_RUN_METHOD_UNSPECIFIED"
    | "STABLE"
    | "NAIVE"
    | (string & {});
  /** Optional. Configures the default tool call behaviour for golden evaluations. */
  goldenEvaluationToolCallBehaviour?:
    | "EVALUATION_TOOL_CALL_BEHAVIOUR_UNSPECIFIED"
    | "REAL"
    | "FAKE"
    | (string & {});
  /** Optional. Configures the default tool call behaviour for scenario evaluations. */
  scenarioEvaluationToolCallBehaviour?:
    | "EVALUATION_TOOL_CALL_BEHAVIOUR_UNSPECIFIED"
    | "REAL"
    | "FAKE"
    | (string & {});
}

export const EvaluationSettings: Schema.Schema<EvaluationSettings> =
  Schema.suspend(() =>
    Schema.Struct({
      scenarioConversationInitiator: Schema.optional(Schema.String),
      goldenRunMethod: Schema.optional(Schema.String),
      goldenEvaluationToolCallBehaviour: Schema.optional(Schema.String),
      scenarioEvaluationToolCallBehaviour: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EvaluationSettings",
  }) as any as Schema.Schema<EvaluationSettings>;

export interface TimeZoneSettings {
  /** Optional. The time zone of the app from the [time zone database](https://www.iana.org/time-zones), e.g., America/Los_Angeles, Europe/Paris. */
  timeZone?: string;
}

export const TimeZoneSettings: Schema.Schema<TimeZoneSettings> = Schema.suspend(
  () =>
    Schema.Struct({
      timeZone: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "TimeZoneSettings",
}) as any as Schema.Schema<TimeZoneSettings>;

export interface App {
  /** Optional. List of guardrails for the app. Format: `projects/{project}/locations/{location}/apps/{app}/guardrails/{guardrail}` */
  guardrails?: Array<string>;
  /** Output only. Timestamp when the app was last updated. */
  updateTime?: string;
  /** Optional. The declarations of the variables. */
  variableDeclarations?: Array<AppVariableDeclaration>;
  /** Output only. Etag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes. */
  etag?: string;
  /** Optional. Audio processing configuration of the app. */
  audioProcessingConfig?: AudioProcessingConfig;
  /** Optional. Language settings of the app. */
  languageSettings?: LanguageSettings;
  /** Optional. Whether the app is pinned in the app list. */
  pinned?: boolean;
  /** Output only. The declarations of predefined variables for the app. */
  predefinedVariableDeclarations?: Array<AppVariableDeclaration>;
  /** Optional. The default client certificate settings for the app. */
  clientCertificateSettings?: ClientCertificateSettings;
  /** Identifier. The unique identifier of the app. Format: `projects/{project}/locations/{location}/apps/{app}` */
  name?: string;
  /** Optional. The default LLM model settings for the app. Individual resources (e.g. agents, guardrails) can override these configurations as needed. */
  modelSettings?: ModelSettings;
  /** Optional. The data store settings for the app. */
  dataStoreSettings?: DataStoreSettings;
  /** Optional. The root agent is the entry point of the app. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}` */
  rootAgent?: string;
  /** Output only. Number of deployments in the app. */
  deploymentCount?: number;
  /** Output only. Timestamp when the app was created. */
  createTime?: string;
  /** Optional. The evaluation personas for the app. This field is used to define the personas that can be used for evaluation. Maximum of 30 personas can be defined. */
  evaluationPersonas?: Array<EvaluationPersona>;
  /** Optional. The default channel profile used by the app. */
  defaultChannelProfile?: ChannelProfile;
  /** Optional. The tool execution mode for the app. If not provided, will default to PARALLEL. */
  toolExecutionMode?:
    | "TOOL_EXECUTION_MODE_UNSPECIFIED"
    | "PARALLEL"
    | "SEQUENTIAL"
    | (string & {});
  /** Optional. Indicates whether the app is locked for changes. If the app is locked, modifications to the app resources will be rejected. */
  locked?: boolean;
  /** Optional. Logging settings of the app. */
  loggingSettings?: LoggingSettings;
  /** Optional. Error handling settings of the app. */
  errorHandlingSettings?: ErrorHandlingSettings;
  /** Optional. The evaluation thresholds for the app. */
  evaluationMetricsThresholds?: EvaluationMetricsThresholds;
  /** Optional. Human-readable description of the app. */
  description?: string;
  /** Optional. Instructions for all the agents in the app. You can use this instruction to set up a stable identity or personality across all the agents. */
  globalInstruction?: string;
  /** Optional. Metadata about the app. This field can be used to store additional information relevant to the app's details or intended usages. */
  metadata?: Record<string, string>;
  /** Optional. The evaluation settings for the app. */
  evaluationSettings?: EvaluationSettings;
  /** Optional. TimeZone settings of the app. */
  timeZoneSettings?: TimeZoneSettings;
  /** Required. Display name of the app. */
  displayName?: string;
}

export const App: Schema.Schema<App> = Schema.suspend(() =>
  Schema.Struct({
    guardrails: Schema.optional(Schema.Array(Schema.String)),
    updateTime: Schema.optional(Schema.String),
    variableDeclarations: Schema.optional(Schema.Array(AppVariableDeclaration)),
    etag: Schema.optional(Schema.String),
    audioProcessingConfig: Schema.optional(AudioProcessingConfig),
    languageSettings: Schema.optional(LanguageSettings),
    pinned: Schema.optional(Schema.Boolean),
    predefinedVariableDeclarations: Schema.optional(
      Schema.Array(AppVariableDeclaration),
    ),
    clientCertificateSettings: Schema.optional(ClientCertificateSettings),
    name: Schema.optional(Schema.String),
    modelSettings: Schema.optional(ModelSettings),
    dataStoreSettings: Schema.optional(DataStoreSettings),
    rootAgent: Schema.optional(Schema.String),
    deploymentCount: Schema.optional(Schema.Number),
    createTime: Schema.optional(Schema.String),
    evaluationPersonas: Schema.optional(Schema.Array(EvaluationPersona)),
    defaultChannelProfile: Schema.optional(ChannelProfile),
    toolExecutionMode: Schema.optional(Schema.String),
    locked: Schema.optional(Schema.Boolean),
    loggingSettings: Schema.optional(LoggingSettings),
    errorHandlingSettings: Schema.optional(ErrorHandlingSettings),
    evaluationMetricsThresholds: Schema.optional(EvaluationMetricsThresholds),
    description: Schema.optional(Schema.String),
    globalInstruction: Schema.optional(Schema.String),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    evaluationSettings: Schema.optional(EvaluationSettings),
    timeZoneSettings: Schema.optional(TimeZoneSettings),
    displayName: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "App" }) as any as Schema.Schema<App>;

export interface OpenApiToolset {
  /** Optional. The TLS configuration. Includes the custom server certificates */
  tlsConfig?: TlsConfig;
  /** Optional. If true, the agent will ignore unknown fields in the API response for all operations defined in the OpenAPI schema. */
  ignoreUnknownFields?: boolean;
  /** Optional. Authentication information required by the API. */
  apiAuthentication?: ApiAuthentication;
  /** Required. The OpenAPI schema of the toolset. */
  openApiSchema?: string;
  /** Optional. Service Directory configuration. */
  serviceDirectoryConfig?: ServiceDirectoryConfig;
  /** Optional. The server URL of the Open API schema. This field is only set in toolsets in the environment dependencies during the export process if the schema contains a server url. During the import process, if this url is present in the environment dependencies and the schema has the $env_var placeholder, it will replace the placeholder in the schema. */
  url?: string;
}

export const OpenApiToolset: Schema.Schema<OpenApiToolset> = Schema.suspend(
  () =>
    Schema.Struct({
      tlsConfig: Schema.optional(TlsConfig),
      ignoreUnknownFields: Schema.optional(Schema.Boolean),
      apiAuthentication: Schema.optional(ApiAuthentication),
      openApiSchema: Schema.optional(Schema.String),
      serviceDirectoryConfig: Schema.optional(ServiceDirectoryConfig),
      url: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "OpenApiToolset",
}) as any as Schema.Schema<OpenApiToolset>;

export interface ConnectorToolset {
  /** Required. The list of connector actions/entity operations to generate tools for. */
  connectorActions?: Array<Action>;
  /** Optional. Configures how authentication is handled in Integration Connectors. By default, an admin authentication is passed in the Integration Connectors API requests. You can override it with a different end-user authentication config. **Note**: The Connection must have authentication override enabled in order to specify an EUC configuration here - otherwise, the Toolset creation will fail. See: https://cloud.google.com/application-integration/docs/configure-connectors-task#configure-authentication-override */
  authConfig?: EndUserAuthConfig;
  /** Required. The full resource name of the referenced Integration Connectors Connection. Format: `projects/{project}/locations/{location}/connections/{connection}` */
  connection?: string;
}

export const ConnectorToolset: Schema.Schema<ConnectorToolset> = Schema.suspend(
  () =>
    Schema.Struct({
      connectorActions: Schema.optional(Schema.Array(Action)),
      authConfig: Schema.optional(EndUserAuthConfig),
      connection: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ConnectorToolset",
}) as any as Schema.Schema<ConnectorToolset>;

export interface Toolset {
  /** Output only. Timestamp when the toolset was last updated. */
  updateTime?: string;
  /** Output only. Timestamp when the toolset was created. */
  createTime?: string;
  /** Optional. A toolset that contains a list of tools that are defined by an OpenAPI schema. */
  openApiToolset?: OpenApiToolset;
  /** Optional. The execution type of the tools in the toolset. */
  executionType?:
    | "EXECUTION_TYPE_UNSPECIFIED"
    | "SYNCHRONOUS"
    | "ASYNCHRONOUS"
    | (string & {});
  /** Optional. Configuration for tools behavior in fake mode. */
  toolFakeConfig?: ToolFakeConfig;
  /** Optional. The display name of the toolset. Must be unique within the same app. */
  displayName?: string;
  /** Identifier. The unique identifier of the toolset. Format: `projects/{project}/locations/{location}/apps/{app}/toolsets/{toolset}` */
  name?: string;
  /** Optional. A toolset that contains a list of tools that are offered by the MCP server. */
  mcpToolset?: McpToolset;
  /** Optional. The description of the toolset. */
  description?: string;
  /** Optional. A toolset that generates tools from an Integration Connectors Connection. */
  connectorToolset?: ConnectorToolset;
  /** ETag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes. */
  etag?: string;
}

export const Toolset: Schema.Schema<Toolset> = Schema.suspend(() =>
  Schema.Struct({
    updateTime: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
    openApiToolset: Schema.optional(OpenApiToolset),
    executionType: Schema.optional(Schema.String),
    toolFakeConfig: Schema.optional(ToolFakeConfig),
    displayName: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    mcpToolset: Schema.optional(McpToolset),
    description: Schema.optional(Schema.String),
    connectorToolset: Schema.optional(ConnectorToolset),
    etag: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Toolset" }) as any as Schema.Schema<Toolset>;

export interface AppSnapshot {
  /** Optional. List of agents in the app. */
  agents?: Array<Agent>;
  /** Optional. List of tools in the app. */
  tools?: Array<Tool>;
  /** Optional. List of guardrails in the app. */
  guardrails?: Array<Guardrail>;
  /** Optional. List of examples in the app. */
  examples?: Array<Example>;
  /** Optional. The basic settings for the app. */
  app?: App;
  /** Optional. List of toolsets in the app. */
  toolsets?: Array<Toolset>;
}

export const AppSnapshot: Schema.Schema<AppSnapshot> = Schema.suspend(() =>
  Schema.Struct({
    agents: Schema.optional(Schema.Array(Agent)),
    tools: Schema.optional(Schema.Array(Tool)),
    guardrails: Schema.optional(Schema.Array(Guardrail)),
    examples: Schema.optional(Schema.Array(Example)),
    app: Schema.optional(App),
    toolsets: Schema.optional(Schema.Array(Toolset)),
  }),
).annotate({ identifier: "AppSnapshot" }) as any as Schema.Schema<AppSnapshot>;

export interface AppVersion {
  /** Optional. The description of the app version. */
  description?: string;
  /** Identifier. The unique identifier of the app version. Format: `projects/{project}/locations/{location}/apps/{app}/versions/{version}` */
  name?: string;
  /** Output only. The snapshot of the app when the version is created. */
  snapshot?: AppSnapshot;
  /** Output only. Timestamp when the app version was created. */
  createTime?: string;
  /** Output only. Etag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes. */
  etag?: string;
  /** Optional. The display name of the app version. */
  displayName?: string;
  /** Output only. Email of the user who created the app version. */
  creator?: string;
}

export const AppVersion: Schema.Schema<AppVersion> = Schema.suspend(() =>
  Schema.Struct({
    description: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    snapshot: Schema.optional(AppSnapshot),
    createTime: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
    creator: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "AppVersion" }) as any as Schema.Schema<AppVersion>;

export interface ListAppVersionsResponse {
  /** A token that can be sent as ListAppVersionsRequest.page_token to retrieve the next page. Absence of this field indicates there are no subsequent pages. */
  nextPageToken?: string;
  /** The list of app versions. */
  appVersions?: Array<AppVersion>;
}

export const ListAppVersionsResponse: Schema.Schema<ListAppVersionsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      appVersions: Schema.optional(Schema.Array(AppVersion)),
    }),
  ).annotate({
    identifier: "ListAppVersionsResponse",
  }) as any as Schema.Schema<ListAppVersionsResponse>;

export interface RetrieveToolSchemaResponse {
  /** The schema of the tool input parameters. */
  inputSchema?: Ces_Schema;
  /** The toolset tool that the schema is for. */
  toolsetTool?: ToolsetTool;
  /** The name of the tool that the schema is for. Format: `projects/{project}/locations/{location}/apps/{app}/tools/{tool}` */
  tool?: string;
  /** The schema of the tool output parameters. */
  outputSchema?: Ces_Schema;
}

export const RetrieveToolSchemaResponse: Schema.Schema<RetrieveToolSchemaResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      inputSchema: Schema.optional(Ces_Schema),
      toolsetTool: Schema.optional(ToolsetTool),
      tool: Schema.optional(Schema.String),
      outputSchema: Schema.optional(Ces_Schema),
    }),
  ).annotate({
    identifier: "RetrieveToolSchemaResponse",
  }) as any as Schema.Schema<RetrieveToolSchemaResponse>;

export interface ImportAppResponse {
  /** The resource name of the app that was imported. */
  name?: string;
  /** Warning messages generated during the import process. If errors occur for specific resources, they will not be included in the imported app and the error will be mentioned here. */
  warnings?: Array<string>;
}

export const ImportAppResponse: Schema.Schema<ImportAppResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      warnings: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ImportAppResponse",
  }) as any as Schema.Schema<ImportAppResponse>;

export interface RetrieveToolsResponse {
  /** The list of tools that are included in the specified toolset. */
  tools?: Array<Tool>;
}

export const RetrieveToolsResponse: Schema.Schema<RetrieveToolsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      tools: Schema.optional(Schema.Array(Tool)),
    }),
  ).annotate({
    identifier: "RetrieveToolsResponse",
  }) as any as Schema.Schema<RetrieveToolsResponse>;

export interface OmnichannelIntegrationConfigRoutingConfig {
  /** The key of the subscriber. */
  subscriberKey?: string;
}

export const OmnichannelIntegrationConfigRoutingConfig: Schema.Schema<OmnichannelIntegrationConfigRoutingConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      subscriberKey: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OmnichannelIntegrationConfigRoutingConfig",
  }) as any as Schema.Schema<OmnichannelIntegrationConfigRoutingConfig>;

export interface EvaluationExpectationLlmCriteria {
  /** Required. The prompt/instructions provided to the LLM judge. */
  prompt?: string;
}

export const EvaluationExpectationLlmCriteria: Schema.Schema<EvaluationExpectationLlmCriteria> =
  Schema.suspend(() =>
    Schema.Struct({
      prompt: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EvaluationExpectationLlmCriteria",
  }) as any as Schema.Schema<EvaluationExpectationLlmCriteria>;

export interface EvaluationExpectation {
  /** Output only. Timestamp when the evaluation expectation was last updated. */
  updateTime?: string;
  /** Optional. Evaluation criteria based on an LLM prompt. */
  llmCriteria?: EvaluationExpectationLlmCriteria;
  /** Output only. Etag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes. */
  etag?: string;
  /** Identifier. The unique identifier of this evaluation expectation. Format: `projects/{project}/locations/{location}/apps/{app}/evaluationExpectations/{evaluation_expectation}` */
  name?: string;
  /** Optional. User-defined tags for expectations. Can be used to filter expectations. */
  tags?: Array<string>;
  /** Required. User-defined display name. Must be unique within the app. */
  displayName?: string;
  /** Output only. Timestamp when the evaluation expectation was created. */
  createTime?: string;
}

export const EvaluationExpectation: Schema.Schema<EvaluationExpectation> =
  Schema.suspend(() =>
    Schema.Struct({
      updateTime: Schema.optional(Schema.String),
      llmCriteria: Schema.optional(EvaluationExpectationLlmCriteria),
      etag: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      tags: Schema.optional(Schema.Array(Schema.String)),
      displayName: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EvaluationExpectation",
  }) as any as Schema.Schema<EvaluationExpectation>;

export interface ListEvaluationExpectationsResponse {
  /** A token that can be sent as ListEvaluationExpectationsRequest.page_token to retrieve the next page. Absence of this field indicates there are no subsequent pages. */
  nextPageToken?: string;
  /** The list of evaluation expectations. */
  evaluationExpectations?: Array<EvaluationExpectation>;
}

export const ListEvaluationExpectationsResponse: Schema.Schema<ListEvaluationExpectationsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      evaluationExpectations: Schema.optional(
        Schema.Array(EvaluationExpectation),
      ),
    }),
  ).annotate({
    identifier: "ListEvaluationExpectationsResponse",
  }) as any as Schema.Schema<ListEvaluationExpectationsResponse>;

export interface OmnichannelIntegrationConfig {
  /** Optional. Various of subscribers configs. */
  subscriberConfigs?: Record<
    string,
    OmnichannelIntegrationConfigSubscriberConfig
  >;
  /** Optional. The key of routing_configs is a key of `app_configs`, value is a `RoutingConfig`, which contains subscriber's key. */
  routingConfigs?: Record<string, OmnichannelIntegrationConfigRoutingConfig>;
  /** Optional. Various of configuration for handling App events. */
  channelConfigs?: Record<string, OmnichannelIntegrationConfigChannelConfig>;
}

export const OmnichannelIntegrationConfig: Schema.Schema<OmnichannelIntegrationConfig> =
  Schema.suspend(() =>
    Schema.Struct({
      subscriberConfigs: Schema.optional(
        Schema.Record(
          Schema.String,
          OmnichannelIntegrationConfigSubscriberConfig,
        ),
      ),
      routingConfigs: Schema.optional(
        Schema.Record(Schema.String, OmnichannelIntegrationConfigRoutingConfig),
      ),
      channelConfigs: Schema.optional(
        Schema.Record(Schema.String, OmnichannelIntegrationConfigChannelConfig),
      ),
    }),
  ).annotate({
    identifier: "OmnichannelIntegrationConfig",
  }) as any as Schema.Schema<OmnichannelIntegrationConfig>;

export interface Omnichannel {
  /** Required. Display name of the omnichannel resource. */
  displayName?: string;
  /** Output only. Etag used to ensure the object hasn't changed during a read-modify-write operation. */
  etag?: string;
  /** Optional. The integration config for the omnichannel resource. */
  integrationConfig?: OmnichannelIntegrationConfig;
  /** Identifier. The unique identifier of the omnichannel resource. Format: `projects/{project}/locations/{location}/omnichannels/{omnichannel}` */
  name?: string;
  /** Output only. Timestamp when the omnichannel resource was created. */
  createTime?: string;
  /** Optional. Human-readable description of the omnichannel resource. */
  description?: string;
  /** Output only. Timestamp when the omnichannel resource was last updated. */
  updateTime?: string;
}

export const Omnichannel: Schema.Schema<Omnichannel> = Schema.suspend(() =>
  Schema.Struct({
    displayName: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
    integrationConfig: Schema.optional(OmnichannelIntegrationConfig),
    name: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    updateTime: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Omnichannel" }) as any as Schema.Schema<Omnichannel>;

export interface ImportEvaluationsRequestConversationList {
  /** Optional. Conversation resource names. */
  conversations?: Array<string>;
}

export const ImportEvaluationsRequestConversationList: Schema.Schema<ImportEvaluationsRequestConversationList> =
  Schema.suspend(() =>
    Schema.Struct({
      conversations: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ImportEvaluationsRequestConversationList",
  }) as any as Schema.Schema<ImportEvaluationsRequestConversationList>;

export interface ImportEvaluationsRequestImportOptions {
  /** Optional. The strategy to use when resolving conflicts during import. */
  conflictResolutionStrategy?:
    | "CONFLICT_RESOLUTION_STRATEGY_UNSPECIFIED"
    | "OVERWRITE"
    | "SKIP"
    | "DUPLICATE"
    | (string & {});
}

export const ImportEvaluationsRequestImportOptions: Schema.Schema<ImportEvaluationsRequestImportOptions> =
  Schema.suspend(() =>
    Schema.Struct({
      conflictResolutionStrategy: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ImportEvaluationsRequestImportOptions",
  }) as any as Schema.Schema<ImportEvaluationsRequestImportOptions>;

export interface ImportEvaluationsRequest {
  /** The [Google Cloud Storage](https://cloud.google.com/storage/docs/) URI from which to import evaluations. The format of this URI must be `gs:///`. */
  gcsUri?: string;
  /** Raw bytes representing the csv file with the evaluations structure. */
  csvContent?: string;
  /** The conversations to import the evaluations from. */
  conversationList?: ImportEvaluationsRequestConversationList;
  /** Optional. Options governing the import process for the evaluations. */
  importOptions?: ImportEvaluationsRequestImportOptions;
}

export const ImportEvaluationsRequest: Schema.Schema<ImportEvaluationsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      gcsUri: Schema.optional(Schema.String),
      csvContent: Schema.optional(Schema.String),
      conversationList: Schema.optional(
        ImportEvaluationsRequestConversationList,
      ),
      importOptions: Schema.optional(ImportEvaluationsRequestImportOptions),
    }),
  ).annotate({
    identifier: "ImportEvaluationsRequest",
  }) as any as Schema.Schema<ImportEvaluationsRequest>;

export interface EndSession {
  /** Optional. Provides additional information about the end session signal, such as the reason for ending the session. */
  metadata?: Record<string, unknown>;
}

export const EndSession: Schema.Schema<EndSession> = Schema.suspend(() =>
  Schema.Struct({
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  }),
).annotate({ identifier: "EndSession" }) as any as Schema.Schema<EndSession>;

export interface WebSearchQuery {
  /** The search query text. */
  query?: string;
  /** The URI to the Google Search results page for the query. */
  uri?: string;
}

export const WebSearchQuery: Schema.Schema<WebSearchQuery> = Schema.suspend(
  () =>
    Schema.Struct({
      query: Schema.optional(Schema.String),
      uri: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "WebSearchQuery",
}) as any as Schema.Schema<WebSearchQuery>;

export interface GoogleSearchSuggestions {
  /** List of queries used to perform the google search along with the search result URIs forming the search suggestions. */
  webSearchQueries?: Array<WebSearchQuery>;
  /** Compliant HTML and CSS styling for search suggestions. The provided HTML and CSS automatically adapts to your device settings, displaying in either light or dark mode indicated by `@media(prefers-color-scheme)`. */
  htmls?: Array<string>;
}

export const GoogleSearchSuggestions: Schema.Schema<GoogleSearchSuggestions> =
  Schema.suspend(() =>
    Schema.Struct({
      webSearchQueries: Schema.optional(Schema.Array(WebSearchQuery)),
      htmls: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "GoogleSearchSuggestions",
  }) as any as Schema.Schema<GoogleSearchSuggestions>;

export interface SessionOutput {
  /** Request for the client to execute the tools. */
  toolCalls?: ToolCalls;
  /** Indicates the session has ended. */
  endSession?: EndSession;
  /** Custom payload with structured output from the CES agent. */
  payload?: Record<string, unknown>;
  /** If true, the CES agent has detected the end of the current conversation turn and will provide no further output for this turn. */
  turnCompleted?: boolean;
  /** The suggestions returned from Google Search as a result of invoking the GoogleSearchTool. */
  googleSearchSuggestions?: GoogleSearchSuggestions;
  /** Indicates the sequential order of conversation turn to which this output belongs to, starting from 1. */
  turnIndex?: number;
  /** Optional. Diagnostic information contains execution details during the processing of the input. Only populated in the last SessionOutput (with `turn_completed=true`) for each turn. */
  diagnosticInfo?: SessionOutputDiagnosticInfo;
  /** Output text from the CES agent. */
  text?: string;
  /** Output audio from the CES agent. */
  audio?: string;
  /** Citations that provide the source information for the agent's generated text. */
  citations?: Citations;
}

export const SessionOutput: Schema.Schema<SessionOutput> = Schema.suspend(() =>
  Schema.Struct({
    toolCalls: Schema.optional(ToolCalls),
    endSession: Schema.optional(EndSession),
    payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    turnCompleted: Schema.optional(Schema.Boolean),
    googleSearchSuggestions: Schema.optional(GoogleSearchSuggestions),
    turnIndex: Schema.optional(Schema.Number),
    diagnosticInfo: Schema.optional(SessionOutputDiagnosticInfo),
    text: Schema.optional(Schema.String),
    audio: Schema.optional(Schema.String),
    citations: Schema.optional(Citations),
  }),
).annotate({
  identifier: "SessionOutput",
}) as any as Schema.Schema<SessionOutput>;

export interface RunSessionResponse {
  /** Outputs for the session. */
  outputs?: Array<SessionOutput>;
}

export const RunSessionResponse: Schema.Schema<RunSessionResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      outputs: Schema.optional(Schema.Array(SessionOutput)),
    }),
  ).annotate({
    identifier: "RunSessionResponse",
  }) as any as Schema.Schema<RunSessionResponse>;

export interface ConversationTurn {
  /** Optional. List of messages in the conversation turn, including user input, agent responses and intermediate events during the processing. */
  messages?: Array<Message>;
  /** Optional. The root span of the action processing. */
  rootSpan?: Span;
}

export const ConversationTurn: Schema.Schema<ConversationTurn> = Schema.suspend(
  () =>
    Schema.Struct({
      messages: Schema.optional(Schema.Array(Message)),
      rootSpan: Schema.optional(Span),
    }),
).annotate({
  identifier: "ConversationTurn",
}) as any as Schema.Schema<ConversationTurn>;

export interface Conversation {
  /** Output only. Timestamp when the conversation was created. */
  startTime?: string;
  /** Output only. The number of turns in the conversation. */
  turnCount?: number;
  /** Output only. The agent that initially handles the conversation. If not specified, the conversation is handled by the root agent. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}` */
  entryAgent?: string;
  /** Required. The turns in the conversation. */
  turns?: Array<ConversationTurn>;
  /** Output only. Indicate the source of the conversation. */
  source?: "SOURCE_UNSPECIFIED" | "LIVE" | "SIMULATOR" | "EVAL" | (string & {});
  /** Deprecated. Use turns instead. */
  messages?: Array<Message>;
  /** Output only. Timestamp when the conversation was completed. */
  endTime?: string;
  /** Output only. The language code of the conversation. */
  languageCode?: string;
  /** Output only. The deployment of the app used for processing the conversation. Format: `projects/{project}/locations/{location}/apps/{app}/deployments/{deployment}` */
  deployment?: string;
  /** Output only. The version of the app used for processing the conversation. Format: `projects/{project}/locations/{location}/apps/{app}/versions/{version}` */
  appVersion?: string;
  /** Identifier. The unique identifier of the conversation. Format: `projects/{project}/locations/{location}/apps/{app}/conversations/{conversation}` */
  name?: string;
  /** DEPRECATED. Please use input_types instead. */
  channelType?:
    | "CHANNEL_TYPE_UNSPECIFIED"
    | "TEXT"
    | "AUDIO"
    | "MULTIMODAL"
    | (string & {});
  /** Output only. The input types of the conversation. */
  inputTypes?: Array<
    | "INPUT_TYPE_UNSPECIFIED"
    | "INPUT_TYPE_TEXT"
    | "INPUT_TYPE_AUDIO"
    | "INPUT_TYPE_IMAGE"
    | "INPUT_TYPE_BLOB"
    | "INPUT_TYPE_TOOL_RESPONSE"
    | "INPUT_TYPE_VARIABLES"
    | (string & {})
  >;
}

export const Conversation: Schema.Schema<Conversation> = Schema.suspend(() =>
  Schema.Struct({
    startTime: Schema.optional(Schema.String),
    turnCount: Schema.optional(Schema.Number),
    entryAgent: Schema.optional(Schema.String),
    turns: Schema.optional(Schema.Array(ConversationTurn)),
    source: Schema.optional(Schema.String),
    messages: Schema.optional(Schema.Array(Message)),
    endTime: Schema.optional(Schema.String),
    languageCode: Schema.optional(Schema.String),
    deployment: Schema.optional(Schema.String),
    appVersion: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    channelType: Schema.optional(Schema.String),
    inputTypes: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({
  identifier: "Conversation",
}) as any as Schema.Schema<Conversation>;

export interface ListConversationsResponse {
  /** The list of conversations. */
  conversations?: Array<Conversation>;
  /** A token that can be sent as ListConversationsRequest.page_token to retrieve the next page. Absence of this field indicates there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListConversationsResponse: Schema.Schema<ListConversationsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      conversations: Schema.optional(Schema.Array(Conversation)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListConversationsResponse",
  }) as any as Schema.Schema<ListConversationsResponse>;

export interface DeleteEvaluationRunOperationMetadata {}

export const DeleteEvaluationRunOperationMetadata: Schema.Schema<DeleteEvaluationRunOperationMetadata> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "DeleteEvaluationRunOperationMetadata",
  }) as any as Schema.Schema<DeleteEvaluationRunOperationMetadata>;

export interface RestoreAppVersionRequest {}

export const RestoreAppVersionRequest: Schema.Schema<RestoreAppVersionRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "RestoreAppVersionRequest",
  }) as any as Schema.Schema<RestoreAppVersionRequest>;

export interface ListToolsResponse {
  /** The list of tools. */
  tools?: Array<Tool>;
  /** A token that can be sent as ListToolsRequest.page_token to retrieve the next page. Absence of this field indicates there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListToolsResponse: Schema.Schema<ListToolsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      tools: Schema.optional(Schema.Array(Tool)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListToolsResponse",
  }) as any as Schema.Schema<ListToolsResponse>;

export interface Location {
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() =>
  Schema.Struct({
    labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    locationId: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  }),
).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface ListLocationsResponse {
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      locations: Schema.optional(Schema.Array(Location)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListLocationsResponse",
  }) as any as Schema.Schema<ListLocationsResponse>;

export interface OmnichannelOperationMetadata {
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. */
  requestedCancellation?: boolean;
  /** Output only. The time the operation finished running. */
  endTime?: string;
}

export const OmnichannelOperationMetadata: Schema.Schema<OmnichannelOperationMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      statusMessage: Schema.optional(Schema.String),
      requestedCancellation: Schema.optional(Schema.Boolean),
      endTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OmnichannelOperationMetadata",
  }) as any as Schema.Schema<OmnichannelOperationMetadata>;

export interface GenerateAppResourceResponseGenerateResultInfo {
  /** An explanation of the changes in the generated resource. */
  explanation?: string;
}

export const GenerateAppResourceResponseGenerateResultInfo: Schema.Schema<GenerateAppResourceResponseGenerateResultInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      explanation: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GenerateAppResourceResponseGenerateResultInfo",
  }) as any as Schema.Schema<GenerateAppResourceResponseGenerateResultInfo>;

export interface GenerateEvaluationOperationMetadata {}

export const GenerateEvaluationOperationMetadata: Schema.Schema<GenerateEvaluationOperationMetadata> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GenerateEvaluationOperationMetadata",
  }) as any as Schema.Schema<GenerateEvaluationOperationMetadata>;

export interface GenerateChatTokenRequest {
  /** Optional. The reCAPTCHA token generated by the client-side chat widget. */
  recaptchaToken?: string;
  /** Required. The deployment of the app to use for the session. Format: projects/{project}/locations/{location}/apps/{app}/deployments/{deployment} */
  deployment?: string;
}

export const GenerateChatTokenRequest: Schema.Schema<GenerateChatTokenRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      recaptchaToken: Schema.optional(Schema.String),
      deployment: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GenerateChatTokenRequest",
  }) as any as Schema.Schema<GenerateChatTokenRequest>;

export interface ListExamplesResponse {
  /** A token that can be sent as ListExamplesRequest.page_token to retrieve the next page. Absence of this field indicates there are no subsequent pages. */
  nextPageToken?: string;
  /** The list of examples. */
  examples?: Array<Example>;
}

export const ListExamplesResponse: Schema.Schema<ListExamplesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      examples: Schema.optional(Schema.Array(Example)),
    }),
  ).annotate({
    identifier: "ListExamplesResponse",
  }) as any as Schema.Schema<ListExamplesResponse>;

export interface GenerateEvaluationRequest {
  /** Optional. Indicate the source of the conversation. If not set, all sources will be searched. */
  source?: "SOURCE_UNSPECIFIED" | "LIVE" | "SIMULATOR" | "EVAL" | (string & {});
}

export const GenerateEvaluationRequest: Schema.Schema<GenerateEvaluationRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      source: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GenerateEvaluationRequest",
  }) as any as Schema.Schema<GenerateEvaluationRequest>;

export interface ExecuteToolRequest {
  /** Optional. The variables that are available for the tool execution. */
  variables?: Record<string, unknown>;
  /** Optional. The name of the tool to execute. Format: projects/{project}/locations/{location}/apps/{app}/tools/{tool} */
  tool?: string;
  /** Optional. The [ToolCallContext](https://docs.cloud.google.com/customer-engagement-ai/conversational-agents/ps/tool/python#environment for details) to be passed to the Python tool. */
  context?: Record<string, unknown>;
  /** Optional. The toolset tool to execute. Only one tool should match the predicate from the toolset. Otherwise, an error will be returned. */
  toolsetTool?: ToolsetTool;
  /** Optional. The input parameters and values for the tool in JSON object format. */
  args?: Record<string, unknown>;
}

export const ExecuteToolRequest: Schema.Schema<ExecuteToolRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      variables: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      tool: Schema.optional(Schema.String),
      context: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      toolsetTool: Schema.optional(ToolsetTool),
      args: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({
    identifier: "ExecuteToolRequest",
  }) as any as Schema.Schema<ExecuteToolRequest>;

export interface ListDeploymentsResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** The list of deployments. */
  deployments?: Array<Deployment>;
}

export const ListDeploymentsResponse: Schema.Schema<ListDeploymentsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      deployments: Schema.optional(Schema.Array(Deployment)),
    }),
  ).annotate({
    identifier: "ListDeploymentsResponse",
  }) as any as Schema.Schema<ListDeploymentsResponse>;

export interface GenerateAppResourceResponseAppResources {
  /** The app snapshot generated by the LLM assistant. This snapshot contains the app, agents & tools generated by the LLM assistant. */
  appSnapshot?: AppSnapshot;
  /** The list of evaluations generated by the LLM assistant. */
  evaluations?: Array<Evaluation>;
}

export const GenerateAppResourceResponseAppResources: Schema.Schema<GenerateAppResourceResponseAppResources> =
  Schema.suspend(() =>
    Schema.Struct({
      appSnapshot: Schema.optional(AppSnapshot),
      evaluations: Schema.optional(Schema.Array(Evaluation)),
    }),
  ).annotate({
    identifier: "GenerateAppResourceResponseAppResources",
  }) as any as Schema.Schema<GenerateAppResourceResponseAppResources>;

export interface ListAgentsResponse {
  /** A token that can be sent as ListAgentsRequest.page_token to retrieve the next page. Absence of this field indicates there are no subsequent pages. */
  nextPageToken?: string;
  /** The list of agents. */
  agents?: Array<Agent>;
}

export const ListAgentsResponse: Schema.Schema<ListAgentsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      agents: Schema.optional(Schema.Array(Agent)),
    }),
  ).annotate({
    identifier: "ListAgentsResponse",
  }) as any as Schema.Schema<ListAgentsResponse>;

export interface ListToolsetsResponse {
  /** A token that can be sent as ListToolsetsRequest.page_token to retrieve the next page. Absence of this field indicates there are no subsequent pages. */
  nextPageToken?: string;
  /** The list of toolsets. */
  toolsets?: Array<Toolset>;
}

export const ListToolsetsResponse: Schema.Schema<ListToolsetsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      toolsets: Schema.optional(Schema.Array(Toolset)),
    }),
  ).annotate({
    identifier: "ListToolsetsResponse",
  }) as any as Schema.Schema<ListToolsetsResponse>;

export interface EndpointControlPolicy {
  /** Optional. The scope in which this policy's allowed_origins list is enforced. */
  enforcementScope?:
    | "ENFORCEMENT_SCOPE_UNSPECIFIED"
    | "VPCSC_ONLY"
    | "ALWAYS"
    | (string & {});
  /** Optional. The allowed HTTP(s) origins that tools in the App are able to directly call. The enforcement depends on the value of enforcement_scope and the VPC-SC status of the project. If a port number is not provided, all ports will be allowed. Otherwise, the port number must match exactly. For example, "https://example.com" will match "https://example.com:443" and any other port. "https://example.com:443" will only match "https://example.com:443". */
  allowedOrigins?: Array<string>;
}

export const EndpointControlPolicy: Schema.Schema<EndpointControlPolicy> =
  Schema.suspend(() =>
    Schema.Struct({
      enforcementScope: Schema.optional(Schema.String),
      allowedOrigins: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "EndpointControlPolicy",
  }) as any as Schema.Schema<EndpointControlPolicy>;

export interface SecuritySettings {
  /** Output only. Etag of the security settings. */
  etag?: string;
  /** Output only. Last update time of the security settings. */
  updateTime?: string;
  /** Output only. Create time of the security settings. */
  createTime?: string;
  /** Identifier. The unique identifier of the security settings. Format: `projects/{project}/locations/{location}/securitySettings` */
  name?: string;
  /** Optional. Endpoint control related settings. */
  endpointControlPolicy?: EndpointControlPolicy;
}

export const SecuritySettings: Schema.Schema<SecuritySettings> = Schema.suspend(
  () =>
    Schema.Struct({
      etag: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      endpointControlPolicy: Schema.optional(EndpointControlPolicy),
    }),
).annotate({
  identifier: "SecuritySettings",
}) as any as Schema.Schema<SecuritySettings>;

export interface OperationMetadata {
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      endTime: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      statusMessage: Schema.optional(Schema.String),
      requestedCancellation: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "OperationMetadata",
  }) as any as Schema.Schema<OperationMetadata>;

export interface EvaluationRunEvaluationRunSummary {
  /** Output only. Number of error results for the associated Evaluation in this run. */
  errorCount?: number;
  /** Output only. Number of failed results for the associated Evaluation in this run. */
  failedCount?: number;
  /** Output only. Number of passed results for the associated Evaluation in this run. */
  passedCount?: number;
}

export const EvaluationRunEvaluationRunSummary: Schema.Schema<EvaluationRunEvaluationRunSummary> =
  Schema.suspend(() =>
    Schema.Struct({
      errorCount: Schema.optional(Schema.Number),
      failedCount: Schema.optional(Schema.Number),
      passedCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "EvaluationRunEvaluationRunSummary",
  }) as any as Schema.Schema<EvaluationRunEvaluationRunSummary>;

export interface EvaluationRunProgress {
  /** Output only. Number of completed evaluation results with an outcome of PASS. (EvaluationResult.execution_state is COMPLETED and EvaluationResult.evaluation_status is PASS). */
  passedCount?: number;
  /** Output only. Number of evaluation results that failed to execute. (EvaluationResult.execution_state is ERROR). */
  errorCount?: number;
  /** Output only. Number of completed evaluation results with an outcome of FAIL. (EvaluationResult.execution_state is COMPLETED and EvaluationResult.evaluation_status is FAIL). */
  failedCount?: number;
  /** Output only. Total number of evaluation results in this run. */
  totalCount?: number;
  /** Output only. Number of evaluation results that finished successfully. (EvaluationResult.execution_state is COMPLETED). */
  completedCount?: number;
}

export const EvaluationRunProgress: Schema.Schema<EvaluationRunProgress> =
  Schema.suspend(() =>
    Schema.Struct({
      passedCount: Schema.optional(Schema.Number),
      errorCount: Schema.optional(Schema.Number),
      failedCount: Schema.optional(Schema.Number),
      totalCount: Schema.optional(Schema.Number),
      completedCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "EvaluationRunProgress",
  }) as any as Schema.Schema<EvaluationRunProgress>;

export interface EvaluationRun {
  /** Output only. The scheduled evaluation run resource name that created this evaluation run. This field is only set if the evaluation run was created by a scheduled evaluation run. Format: `projects/{project}/locations/{location}/apps/{app}/scheduledEvaluationRuns/{scheduled_evaluation_run}` */
  scheduledEvaluationRun?: string;
  /** Output only. Error information for the evaluation run. */
  errorInfo?: EvaluationErrorInfo;
  /** Output only. The type of the evaluations in this run. */
  evaluationType?:
    | "EVALUATION_TYPE_UNSPECIFIED"
    | "GOLDEN"
    | "SCENARIO"
    | "MIXED"
    | (string & {});
  /** Output only. Latency report for the evaluation run. */
  latencyReport?: LatencyReport;
  /** Output only. The number of times the evaluations inside the run were run. */
  runCount?: number;
  /** Output only. Map of evaluation name to EvaluationRunSummary. */
  evaluationRunSummaries?: Record<string, EvaluationRunEvaluationRunSummary>;
  /** Output only. The evaluation results that are part of this run. Format: `projects/{project}/locations/{location}/apps/{app}/evaluations/{evaluation}/results/{result}` */
  evaluationResults?: Array<string>;
  /** Output only. The display name of the `app_version` that the evaluation ran against. */
  appVersionDisplayName?: string;
  /** Output only. The configuration to use for the run per persona. */
  personaRunConfigs?: Array<PersonaRunConfig>;
  /** Output only. The create time of the changelog of the app version that the evaluation ran against. This is populated if user runs evaluation on latest/draft. */
  changelogCreateTime?: string;
  /** Output only. The user who initiated the evaluation run. */
  initiatedBy?: string;
  /** Output only. The state of the evaluation run. */
  state?:
    | "EVALUATION_RUN_STATE_UNSPECIFIED"
    | "RUNNING"
    | "COMPLETED"
    | "ERROR"
    | (string & {});
  /** Output only. The app version to evaluate. Format: `projects/{project}/locations/{location}/apps/{app}/versions/{version}` */
  appVersion?: string;
  /** Output only. The evaluations that are part of this run. The list may contain evaluations of either type. This field is mutually exclusive with `evaluation_dataset`. Format: `projects/{project}/locations/{location}/apps/{app}/evaluations/{evaluation}` */
  evaluations?: Array<string>;
  /** Identifier. The unique identifier of the evaluation run. Format: `projects/{project}/locations/{location}/apps/{app}/evaluationRuns/{evaluationRun}` */
  name?: string;
  /** Output only. The evaluation dataset that this run is associated with. This field is mutually exclusive with `evaluations`. Format: `projects/{project}/locations/{location}/apps/{app}/evaluationDatasets/{evaluationDataset}` */
  evaluationDataset?: string;
  /** Optional. Configuration for running the optimization step after the evaluation run. If not set, the optimization step will not be run. */
  optimizationConfig?: OptimizationConfig;
  /** Optional. User-defined display name of the evaluation run. default: " run - ". */
  displayName?: string;
  /** Output only. The configuration used in the run. */
  config?: EvaluationConfig;
  /** Output only. Timestamp when the evaluation run was created. */
  createTime?: string;
  /** Output only. Deprecated: Use error_info instead. Errors encountered during execution. */
  error?: Status;
  /** Output only. The progress of the evaluation run. */
  progress?: EvaluationRunProgress;
  /** Output only. The changelog of the app version that the evaluation ran against. This is populated if user runs evaluation on latest/draft. */
  changelog?: string;
  /** Output only. The method used to run the evaluation. */
  goldenRunMethod?:
    | "GOLDEN_RUN_METHOD_UNSPECIFIED"
    | "STABLE"
    | "NAIVE"
    | (string & {});
}

export const EvaluationRun: Schema.Schema<EvaluationRun> = Schema.suspend(() =>
  Schema.Struct({
    scheduledEvaluationRun: Schema.optional(Schema.String),
    errorInfo: Schema.optional(EvaluationErrorInfo),
    evaluationType: Schema.optional(Schema.String),
    latencyReport: Schema.optional(LatencyReport),
    runCount: Schema.optional(Schema.Number),
    evaluationRunSummaries: Schema.optional(
      Schema.Record(Schema.String, EvaluationRunEvaluationRunSummary),
    ),
    evaluationResults: Schema.optional(Schema.Array(Schema.String)),
    appVersionDisplayName: Schema.optional(Schema.String),
    personaRunConfigs: Schema.optional(Schema.Array(PersonaRunConfig)),
    changelogCreateTime: Schema.optional(Schema.String),
    initiatedBy: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
    appVersion: Schema.optional(Schema.String),
    evaluations: Schema.optional(Schema.Array(Schema.String)),
    name: Schema.optional(Schema.String),
    evaluationDataset: Schema.optional(Schema.String),
    optimizationConfig: Schema.optional(OptimizationConfig),
    displayName: Schema.optional(Schema.String),
    config: Schema.optional(EvaluationConfig),
    createTime: Schema.optional(Schema.String),
    error: Schema.optional(Status),
    progress: Schema.optional(EvaluationRunProgress),
    changelog: Schema.optional(Schema.String),
    goldenRunMethod: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "EvaluationRun",
}) as any as Schema.Schema<EvaluationRun>;

export interface EvaluationDataset {
  /** Output only. Timestamp when the evaluation dataset was created. */
  createTime?: string;
  /** Identifier. The unique identifier of this evaluation dataset. Format: `projects/{project}/locations/{location}/apps/{app}/evaluationDatasets/{evaluationDataset}` */
  name?: string;
  /** Output only. The user who created the evaluation dataset. */
  createdBy?: string;
  /** Output only. Timestamp when the evaluation dataset was last updated. */
  updateTime?: string;
  /** Optional. Evaluations that are included in this dataset. */
  evaluations?: Array<string>;
  /** Output only. Etag used to ensure the object hasn't changed during a read-modify-write operation. If the etag is empty, the update will overwrite any concurrent changes. */
  etag?: string;
  /** Output only. The aggregated metrics for this evaluation dataset across all runs. */
  aggregatedMetrics?: AggregatedMetrics;
  /** Output only. The user who last updated the evaluation dataset. */
  lastUpdatedBy?: string;
  /** Required. User-defined display name of the evaluation dataset. Unique within an App. */
  displayName?: string;
}

export const EvaluationDataset: Schema.Schema<EvaluationDataset> =
  Schema.suspend(() =>
    Schema.Struct({
      createTime: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      createdBy: Schema.optional(Schema.String),
      updateTime: Schema.optional(Schema.String),
      evaluations: Schema.optional(Schema.Array(Schema.String)),
      etag: Schema.optional(Schema.String),
      aggregatedMetrics: Schema.optional(AggregatedMetrics),
      lastUpdatedBy: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "EvaluationDataset",
  }) as any as Schema.Schema<EvaluationDataset>;

export interface ImportAppRequest {
  /** Optional. The ID to use for the imported app. * If not specified, a unique ID will be automatically assigned for the app. * Otherwise, the imported app will use this ID as the final component of its resource name. If an app with the same ID already exists at the specified location in the project, the content of the existing app will be replaced. */
  appId?: string;
  /** Optional. The display name of the app to import. * If the app is created on import, and the display name is specified, the imported app will use this display name. If a conflict is detected with an existing app, a timestamp will be appended to the display name to make it unique. * If the app is a reimport, this field should not be set. Providing a display name during reimport will result in an INVALID_ARGUMENT error. */
  displayName?: string;
  /** The [Google Cloud Storage](https://cloud.google.com/storage/docs/) URI from which to import app. The format of this URI must be `gs:///`. */
  gcsUri?: string;
  /** Optional. Options governing the import process for the app. */
  importOptions?: ImportAppRequestImportOptions;
  /** Raw bytes representing the compressed zip file with the app folder structure. */
  appContent?: string;
  /** Optional. Flag for overriding the app lock during import. If set to true, the import process will ignore the app lock. */
  ignoreAppLock?: boolean;
}

export const ImportAppRequest: Schema.Schema<ImportAppRequest> = Schema.suspend(
  () =>
    Schema.Struct({
      appId: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      gcsUri: Schema.optional(Schema.String),
      importOptions: Schema.optional(ImportAppRequestImportOptions),
      appContent: Schema.optional(Schema.String),
      ignoreAppLock: Schema.optional(Schema.Boolean),
    }),
).annotate({
  identifier: "ImportAppRequest",
}) as any as Schema.Schema<ImportAppRequest>;

export interface ImportEvaluationsResponse {
  /** The number of evaluations that were not imported due to errors. */
  importFailureCount?: number;
  /** Optional. A list of error messages associated with evaluations that failed to be imported. */
  errorMessages?: Array<string>;
  /** The list of evaluations that were imported into the app. */
  evaluations?: Array<Evaluation>;
}

export const ImportEvaluationsResponse: Schema.Schema<ImportEvaluationsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      importFailureCount: Schema.optional(Schema.Number),
      errorMessages: Schema.optional(Schema.Array(Schema.String)),
      evaluations: Schema.optional(Schema.Array(Evaluation)),
    }),
  ).annotate({
    identifier: "ImportEvaluationsResponse",
  }) as any as Schema.Schema<ImportEvaluationsResponse>;

export interface ListScheduledEvaluationRunsResponse {
  /** The list of scheduled evaluation runs. */
  scheduledEvaluationRuns?: Array<ScheduledEvaluationRun>;
  /** A token that can be sent as ListScheduledEvaluationRunsRequest.page_token to retrieve the next page. Absence of this field indicates there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListScheduledEvaluationRunsResponse: Schema.Schema<ListScheduledEvaluationRunsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      scheduledEvaluationRuns: Schema.optional(
        Schema.Array(ScheduledEvaluationRun),
      ),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListScheduledEvaluationRunsResponse",
  }) as any as Schema.Schema<ListScheduledEvaluationRunsResponse>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface TestPersonaVoiceRequest {
  /** Required. The persona ID to test the voice for. Also accepts "default". */
  personaId?: string;
  /** Required. The text to test the voice for. */
  text?: string;
}

export const TestPersonaVoiceRequest: Schema.Schema<TestPersonaVoiceRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      personaId: Schema.optional(Schema.String),
      text: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "TestPersonaVoiceRequest",
  }) as any as Schema.Schema<TestPersonaVoiceRequest>;

export interface UploadEvaluationAudioRequest {
  /** Required. The raw audio bytes. The format of the audio must be single-channel LINEAR16 with a sample rate of 16kHz (default InputAudioConfig). */
  audioContent?: string;
  /** Optional. The Google Cloud Storage URI of the previously uploaded audio file to be deleted. Format: `gs:///` */
  previousAudioGcsUri?: string;
}

export const UploadEvaluationAudioRequest: Schema.Schema<UploadEvaluationAudioRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      audioContent: Schema.optional(Schema.String),
      previousAudioGcsUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "UploadEvaluationAudioRequest",
  }) as any as Schema.Schema<UploadEvaluationAudioRequest>;

export interface RetrieveToolSchemaRequest {
  /** Optional. The toolset tool to retrieve the schema for. Only one tool should match the predicate from the toolset. Otherwise, an error will be returned. */
  toolsetTool?: ToolsetTool;
  /** Optional. The name of the tool to retrieve the schema for. Format: projects/{project}/locations/{location}/apps/{app}/tools/{tool} */
  tool?: string;
}

export const RetrieveToolSchemaRequest: Schema.Schema<RetrieveToolSchemaRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      toolsetTool: Schema.optional(ToolsetTool),
      tool: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RetrieveToolSchemaRequest",
  }) as any as Schema.Schema<RetrieveToolSchemaRequest>;

export interface BatchDeleteConversationsResponse {
  /** The list of conversations that were successfully deleted. */
  deletedConversations?: Array<string>;
  /** Optional. A list of error messages associated with conversations that failed to be deleted. */
  errorMessages?: Array<string>;
  /** The list of conversations that failed to be deleted. */
  failedConversations?: Array<string>;
}

export const BatchDeleteConversationsResponse: Schema.Schema<BatchDeleteConversationsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      deletedConversations: Schema.optional(Schema.Array(Schema.String)),
      errorMessages: Schema.optional(Schema.Array(Schema.String)),
      failedConversations: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "BatchDeleteConversationsResponse",
  }) as any as Schema.Schema<BatchDeleteConversationsResponse>;

export interface ImportEvaluationsOperationMetadata {
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. The time the operation was created. */
  createTime?: string;
}

export const ImportEvaluationsOperationMetadata: Schema.Schema<ImportEvaluationsOperationMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      statusMessage: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ImportEvaluationsOperationMetadata",
  }) as any as Schema.Schema<ImportEvaluationsOperationMetadata>;

export interface ListEvaluationRunsResponse {
  /** A token that can be sent as ListEvaluationRunsRequest.page_token to retrieve the next page. Absence of this field indicates there are no subsequent pages. */
  nextPageToken?: string;
  /** The list of evaluation runs. */
  evaluationRuns?: Array<EvaluationRun>;
}

export const ListEvaluationRunsResponse: Schema.Schema<ListEvaluationRunsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      evaluationRuns: Schema.optional(Schema.Array(EvaluationRun)),
    }),
  ).annotate({
    identifier: "ListEvaluationRunsResponse",
  }) as any as Schema.Schema<ListEvaluationRunsResponse>;

export interface ExportAppRequest {
  /** Required. The format to export the app in. */
  exportFormat?: "EXPORT_FORMAT_UNSPECIFIED" | "JSON" | "YAML" | (string & {});
  /** Optional. The [Google Cloud Storage](https://cloud.google.com/storage/docs/) URI to which to export the app. The format of this URI must be `gs:///`. The exported app archive will be written directly to the specified GCS object. */
  gcsUri?: string;
}

export const ExportAppRequest: Schema.Schema<ExportAppRequest> = Schema.suspend(
  () =>
    Schema.Struct({
      exportFormat: Schema.optional(Schema.String),
      gcsUri: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ExportAppRequest",
}) as any as Schema.Schema<ExportAppRequest>;

export interface RunSessionRequest {
  /** Required. Inputs for the session. */
  inputs?: Array<SessionInput>;
  /** Required. The configuration for the session. */
  config?: SessionConfig;
}

export const RunSessionRequest: Schema.Schema<RunSessionRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      inputs: Schema.optional(Schema.Array(SessionInput)),
      config: Schema.optional(SessionConfig),
    }),
  ).annotate({
    identifier: "RunSessionRequest",
  }) as any as Schema.Schema<RunSessionRequest>;

export interface ListGuardrailsResponse {
  /** The list of guardrails. */
  guardrails?: Array<Guardrail>;
  /** A token that can be sent as ListGuardrailsRequest.page_token to retrieve the next page. Absence of this field indicates there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListGuardrailsResponse: Schema.Schema<ListGuardrailsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      guardrails: Schema.optional(Schema.Array(Guardrail)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListGuardrailsResponse",
  }) as any as Schema.Schema<ListGuardrailsResponse>;

export interface GenerateAppResourceResponseEvaluations {
  /** The list of generated evaluations. */
  evaluations?: Array<Evaluation>;
}

export const GenerateAppResourceResponseEvaluations: Schema.Schema<GenerateAppResourceResponseEvaluations> =
  Schema.suspend(() =>
    Schema.Struct({
      evaluations: Schema.optional(Schema.Array(Evaluation)),
    }),
  ).annotate({
    identifier: "GenerateAppResourceResponseEvaluations",
  }) as any as Schema.Schema<GenerateAppResourceResponseEvaluations>;

export interface CancelOperationRequest {}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CancelOperationRequest",
  }) as any as Schema.Schema<CancelOperationRequest>;

export interface ListAppsResponse {
  /** The list of apps. */
  apps?: Array<App>;
  /** Unordered list. Locations that could not be reached. */
  unreachable?: Array<string>;
  /** A token that can be sent as ListAppsRequest.page_token to retrieve the next page. Absence of this field indicates there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListAppsResponse: Schema.Schema<ListAppsResponse> = Schema.suspend(
  () =>
    Schema.Struct({
      apps: Schema.optional(Schema.Array(App)),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
      nextPageToken: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ListAppsResponse",
}) as any as Schema.Schema<ListAppsResponse>;

export interface ExportAppResponse {
  /** App folder compressed as a zip file. */
  appContent?: string;
  /** The [Google Cloud Storage](https://cloud.google.com/storage/docs/) URI to which the app was exported. */
  appUri?: string;
}

export const ExportAppResponse: Schema.Schema<ExportAppResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      appContent: Schema.optional(Schema.String),
      appUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ExportAppResponse",
  }) as any as Schema.Schema<ExportAppResponse>;

export interface TestPersonaVoiceResponse {
  /** The audio data bytes of the synthesized voice. */
  audio?: string;
}

export const TestPersonaVoiceResponse: Schema.Schema<TestPersonaVoiceResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      audio: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "TestPersonaVoiceResponse",
  }) as any as Schema.Schema<TestPersonaVoiceResponse>;

export interface GenerateChatTokenResponse {
  /** The time at which the chat token expires. */
  expireTime?: string;
  /** The session scoped token for chat widget to authenticate with Session APIs. */
  chatToken?: string;
}

export const GenerateChatTokenResponse: Schema.Schema<GenerateChatTokenResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      expireTime: Schema.optional(Schema.String),
      chatToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GenerateChatTokenResponse",
  }) as any as Schema.Schema<GenerateChatTokenResponse>;

export interface ListEvaluationDatasetsResponse {
  /** The list of evaluation datasets. */
  evaluationDatasets?: Array<EvaluationDataset>;
  /** A token that can be sent as ListEvaluationDatasetsRequest.page_token to retrieve the next page. Absence of this field indicates there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListEvaluationDatasetsResponse: Schema.Schema<ListEvaluationDatasetsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      evaluationDatasets: Schema.optional(Schema.Array(EvaluationDataset)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListEvaluationDatasetsResponse",
  }) as any as Schema.Schema<ListEvaluationDatasetsResponse>;

export interface RetrieveToolsRequest {
  /** Optional. The identifiers of the tools to retrieve from the toolset. If empty, all tools in the toolset will be returned. */
  toolIds?: Array<string>;
}

export const RetrieveToolsRequest: Schema.Schema<RetrieveToolsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      toolIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "RetrieveToolsRequest",
  }) as any as Schema.Schema<RetrieveToolsRequest>;

export interface GenerateAppResourceResponse {
  /** Additional information about the generated result. */
  generateResultInfo?: GenerateAppResourceResponseGenerateResultInfo;
  /** The list of tools generated by the LLM assistant. */
  tools?: GenerateAppResourceResponseTools;
  /** Toolset generated by the LLM assistant. Supports Open API toolset schema generation. */
  toolset?: Toolset;
  /** Agent generated by the LLM assistant. */
  agent?: Agent;
  /** Evaluations generated by the LLM assistant. */
  evaluations?: GenerateAppResourceResponseEvaluations;
  /** App snapshot generated by the LLM assistant. This snapshot contains the app, agents & tools generated by the LLM assistant. */
  appSnapshot?: AppSnapshot;
  /** The app resources generated by the LLM assistant. */
  appResources?: GenerateAppResourceResponseAppResources;
}

export const GenerateAppResourceResponse: Schema.Schema<GenerateAppResourceResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      generateResultInfo: Schema.optional(
        GenerateAppResourceResponseGenerateResultInfo,
      ),
      tools: Schema.optional(GenerateAppResourceResponseTools),
      toolset: Schema.optional(Toolset),
      agent: Schema.optional(Agent),
      evaluations: Schema.optional(GenerateAppResourceResponseEvaluations),
      appSnapshot: Schema.optional(AppSnapshot),
      appResources: Schema.optional(GenerateAppResourceResponseAppResources),
    }),
  ).annotate({
    identifier: "GenerateAppResourceResponse",
  }) as any as Schema.Schema<GenerateAppResourceResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ListProjectsLocationsRequest {
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
}

export const ListProjectsLocationsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("extraLocationTypes"),
  ),
  name: Schema.String.pipe(T.HttpPath("name")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse = ListLocationsResponse;

export type ListProjectsLocationsError = DefaultErrors;

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export const listProjectsLocations: API.PaginatedOperationMethod<
  ListProjectsLocationsRequest,
  ListProjectsLocationsResponse,
  ListProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetSecuritySettingsProjectsLocationsRequest {
  /** Required. The resource name of the security settings to retrieve. Format: `projects/{project}/locations/{location}/securitySettings` */
  name: string;
}

export const GetSecuritySettingsProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/securitySettings",
  }),
  svc,
) as unknown as Schema.Schema<GetSecuritySettingsProjectsLocationsRequest>;

export type GetSecuritySettingsProjectsLocationsResponse = SecuritySettings;
export const GetSecuritySettingsProjectsLocationsResponse = SecuritySettings;

export type GetSecuritySettingsProjectsLocationsError = DefaultErrors;

/** Retrieves the security settings for the project and location. */
export const getSecuritySettingsProjectsLocations: API.OperationMethod<
  GetSecuritySettingsProjectsLocationsRequest,
  GetSecuritySettingsProjectsLocationsResponse,
  GetSecuritySettingsProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSecuritySettingsProjectsLocationsRequest,
  output: GetSecuritySettingsProjectsLocationsResponse,
  errors: [],
}));

export interface UpdateSecuritySettingsProjectsLocationsRequest {
  /** Optional. Field mask is used to control which fields get updated. If the mask is not present, all fields will be updated. */
  updateMask?: string;
  /** Identifier. The unique identifier of the security settings. Format: `projects/{project}/locations/{location}/securitySettings` */
  name: string;
  /** Request body */
  body?: SecuritySettings;
}

export const UpdateSecuritySettingsProjectsLocationsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SecuritySettings).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/securitySettings",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<UpdateSecuritySettingsProjectsLocationsRequest>;

export type UpdateSecuritySettingsProjectsLocationsResponse = SecuritySettings;
export const UpdateSecuritySettingsProjectsLocationsResponse = SecuritySettings;

export type UpdateSecuritySettingsProjectsLocationsError = DefaultErrors;

/** Updates the security settings for the project and location. */
export const updateSecuritySettingsProjectsLocations: API.OperationMethod<
  UpdateSecuritySettingsProjectsLocationsRequest,
  UpdateSecuritySettingsProjectsLocationsResponse,
  UpdateSecuritySettingsProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateSecuritySettingsProjectsLocationsRequest,
  output: UpdateSecuritySettingsProjectsLocationsResponse,
  errors: [],
}));

export interface GetProjectsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse = Location;

export type GetProjectsLocationsError = DefaultErrors;

/** Gets information about a location. */
export const getProjectsLocations: API.OperationMethod<
  GetProjectsLocationsRequest,
  GetProjectsLocationsResponse,
  GetProjectsLocationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

export interface ImportEvaluationsProjectsLocationsAppsRequest {
  /** Required. The app to import the evaluations into. Format: `projects/{project}/locations/{location}/apps/{app}` */
  parent: string;
  /** Request body */
  body?: ImportEvaluationsRequest;
}

export const ImportEvaluationsProjectsLocationsAppsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ImportEvaluationsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}:importEvaluations",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ImportEvaluationsProjectsLocationsAppsRequest>;

export type ImportEvaluationsProjectsLocationsAppsResponse = Operation;
export const ImportEvaluationsProjectsLocationsAppsResponse = Operation;

export type ImportEvaluationsProjectsLocationsAppsError = DefaultErrors;

/** Imports evaluations into the app. */
export const importEvaluationsProjectsLocationsApps: API.OperationMethod<
  ImportEvaluationsProjectsLocationsAppsRequest,
  ImportEvaluationsProjectsLocationsAppsResponse,
  ImportEvaluationsProjectsLocationsAppsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ImportEvaluationsProjectsLocationsAppsRequest,
  output: ImportEvaluationsProjectsLocationsAppsResponse,
  errors: [],
}));

export interface ExecuteToolProjectsLocationsAppsRequest {
  /** Required. The resource name of the app which the tool/toolset belongs to. Format: `projects/{project}/locations/{location}/apps/{app}` */
  parent: string;
  /** Request body */
  body?: ExecuteToolRequest;
}

export const ExecuteToolProjectsLocationsAppsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ExecuteToolRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}:executeTool",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ExecuteToolProjectsLocationsAppsRequest>;

export type ExecuteToolProjectsLocationsAppsResponse = ExecuteToolResponse;
export const ExecuteToolProjectsLocationsAppsResponse = ExecuteToolResponse;

export type ExecuteToolProjectsLocationsAppsError = DefaultErrors;

/** Executes the given tool with the given arguments. */
export const executeToolProjectsLocationsApps: API.OperationMethod<
  ExecuteToolProjectsLocationsAppsRequest,
  ExecuteToolProjectsLocationsAppsResponse,
  ExecuteToolProjectsLocationsAppsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ExecuteToolProjectsLocationsAppsRequest,
  output: ExecuteToolProjectsLocationsAppsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAppsRequest {
  /** Optional. Field mask is used to control which fields get updated. If the mask is not present, all fields will be updated. */
  updateMask?: string;
  /** Identifier. The unique identifier of the app. Format: `projects/{project}/locations/{location}/apps/{app}` */
  name: string;
  /** Request body */
  body?: App;
}

export const PatchProjectsLocationsAppsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(App).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAppsRequest>;

export type PatchProjectsLocationsAppsResponse = App;
export const PatchProjectsLocationsAppsResponse = App;

export type PatchProjectsLocationsAppsError = DefaultErrors;

/** Updates the specified app. */
export const patchProjectsLocationsApps: API.OperationMethod<
  PatchProjectsLocationsAppsRequest,
  PatchProjectsLocationsAppsResponse,
  PatchProjectsLocationsAppsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsAppsRequest,
  output: PatchProjectsLocationsAppsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAppsRequest {
  /** Optional. The current etag of the app. If an etag is not provided, the deletion will overwrite any concurrent changes. If an etag is provided and does not match the current etag of the app, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** Required. The resource name of the app to delete. */
  name: string;
}

export const DeleteProjectsLocationsAppsRequest = Schema.Struct({
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAppsRequest>;

export type DeleteProjectsLocationsAppsResponse = Operation;
export const DeleteProjectsLocationsAppsResponse = Operation;

export type DeleteProjectsLocationsAppsError = DefaultErrors;

/** Deletes the specified app. */
export const deleteProjectsLocationsApps: API.OperationMethod<
  DeleteProjectsLocationsAppsRequest,
  DeleteProjectsLocationsAppsResponse,
  DeleteProjectsLocationsAppsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsAppsRequest,
  output: DeleteProjectsLocationsAppsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAppsRequest {
  /** Optional. Field to sort by. Only "name" and "create_time" is supported. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Required. The resource name of the location to list apps from. */
  parent: string;
  /** Optional. Filter to be applied when listing the apps. See https://google.aip.dev/160 for more details. */
  filter?: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. The next_page_token value returned from a previous list AgentService.ListApps call. */
  pageToken?: string;
}

export const ListProjectsLocationsAppsRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAppsRequest>;

export type ListProjectsLocationsAppsResponse = ListAppsResponse;
export const ListProjectsLocationsAppsResponse = ListAppsResponse;

export type ListProjectsLocationsAppsError = DefaultErrors;

/** Lists apps in the given project and location. */
export const listProjectsLocationsApps: API.PaginatedOperationMethod<
  ListProjectsLocationsAppsRequest,
  ListProjectsLocationsAppsResponse,
  ListProjectsLocationsAppsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsAppsRequest,
  output: ListProjectsLocationsAppsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface TestPersonaVoiceProjectsLocationsAppsRequest {
  /** Required. the resource name of the app to test the persona voice for. Format: `projects/{project}/locations/{location}/apps/{app}` */
  app: string;
  /** Request body */
  body?: TestPersonaVoiceRequest;
}

export const TestPersonaVoiceProjectsLocationsAppsRequest = Schema.Struct({
  app: Schema.String.pipe(T.HttpPath("app")),
  body: Schema.optional(TestPersonaVoiceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}:testPersonaVoice",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<TestPersonaVoiceProjectsLocationsAppsRequest>;

export type TestPersonaVoiceProjectsLocationsAppsResponse =
  TestPersonaVoiceResponse;
export const TestPersonaVoiceProjectsLocationsAppsResponse =
  TestPersonaVoiceResponse;

export type TestPersonaVoiceProjectsLocationsAppsError = DefaultErrors;

/** Tests the voice of a persona. Also accepts a default persona. */
export const testPersonaVoiceProjectsLocationsApps: API.OperationMethod<
  TestPersonaVoiceProjectsLocationsAppsRequest,
  TestPersonaVoiceProjectsLocationsAppsResponse,
  TestPersonaVoiceProjectsLocationsAppsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: TestPersonaVoiceProjectsLocationsAppsRequest,
  output: TestPersonaVoiceProjectsLocationsAppsResponse,
  errors: [],
}));

export interface RetrieveToolSchemaProjectsLocationsAppsRequest {
  /** Required. The resource name of the app which the tool/toolset belongs to. Format: `projects/{project}/locations/{location}/apps/{app}` */
  parent: string;
  /** Request body */
  body?: RetrieveToolSchemaRequest;
}

export const RetrieveToolSchemaProjectsLocationsAppsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(RetrieveToolSchemaRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}:retrieveToolSchema",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<RetrieveToolSchemaProjectsLocationsAppsRequest>;

export type RetrieveToolSchemaProjectsLocationsAppsResponse =
  RetrieveToolSchemaResponse;
export const RetrieveToolSchemaProjectsLocationsAppsResponse =
  RetrieveToolSchemaResponse;

export type RetrieveToolSchemaProjectsLocationsAppsError = DefaultErrors;

/** Retrieve the schema of the given tool. The schema is computed on the fly for the given instance of the tool. */
export const retrieveToolSchemaProjectsLocationsApps: API.OperationMethod<
  RetrieveToolSchemaProjectsLocationsAppsRequest,
  RetrieveToolSchemaProjectsLocationsAppsResponse,
  RetrieveToolSchemaProjectsLocationsAppsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RetrieveToolSchemaProjectsLocationsAppsRequest,
  output: RetrieveToolSchemaProjectsLocationsAppsResponse,
  errors: [],
}));

export interface ExportAppProjectsLocationsAppsRequest {
  /** Required. The resource name of the app to export. */
  name: string;
  /** Request body */
  body?: ExportAppRequest;
}

export const ExportAppProjectsLocationsAppsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ExportAppRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}:exportApp",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ExportAppProjectsLocationsAppsRequest>;

export type ExportAppProjectsLocationsAppsResponse = Operation;
export const ExportAppProjectsLocationsAppsResponse = Operation;

export type ExportAppProjectsLocationsAppsError = DefaultErrors;

/** Exports the specified app. */
export const exportAppProjectsLocationsApps: API.OperationMethod<
  ExportAppProjectsLocationsAppsRequest,
  ExportAppProjectsLocationsAppsResponse,
  ExportAppProjectsLocationsAppsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ExportAppProjectsLocationsAppsRequest,
  output: ExportAppProjectsLocationsAppsResponse,
  errors: [],
}));

export interface RunEvaluationProjectsLocationsAppsRequest {
  /** Required. The app to evaluate. Format: `projects/{project}/locations/{location}/apps/{app}` */
  app: string;
  /** Request body */
  body?: RunEvaluationRequest;
}

export const RunEvaluationProjectsLocationsAppsRequest = Schema.Struct({
  app: Schema.String.pipe(T.HttpPath("app")),
  body: Schema.optional(RunEvaluationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}:runEvaluation",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<RunEvaluationProjectsLocationsAppsRequest>;

export type RunEvaluationProjectsLocationsAppsResponse = Operation;
export const RunEvaluationProjectsLocationsAppsResponse = Operation;

export type RunEvaluationProjectsLocationsAppsError = DefaultErrors;

/** Runs an evaluation of the app. */
export const runEvaluationProjectsLocationsApps: API.OperationMethod<
  RunEvaluationProjectsLocationsAppsRequest,
  RunEvaluationProjectsLocationsAppsResponse,
  RunEvaluationProjectsLocationsAppsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RunEvaluationProjectsLocationsAppsRequest,
  output: RunEvaluationProjectsLocationsAppsResponse,
  errors: [],
}));

export interface ImportAppProjectsLocationsAppsRequest {
  /** Required. The parent resource name with the location of the app to import. */
  parent: string;
  /** Request body */
  body?: ImportAppRequest;
}

export const ImportAppProjectsLocationsAppsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ImportAppRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps:importApp",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ImportAppProjectsLocationsAppsRequest>;

export type ImportAppProjectsLocationsAppsResponse = Operation;
export const ImportAppProjectsLocationsAppsResponse = Operation;

export type ImportAppProjectsLocationsAppsError = DefaultErrors;

/** Imports the specified app. */
export const importAppProjectsLocationsApps: API.OperationMethod<
  ImportAppProjectsLocationsAppsRequest,
  ImportAppProjectsLocationsAppsResponse,
  ImportAppProjectsLocationsAppsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ImportAppProjectsLocationsAppsRequest,
  output: ImportAppProjectsLocationsAppsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAppsRequest {
  /** Optional. The ID to use for the app, which will become the final component of the app's resource name. If not provided, a unique ID will be automatically assigned for the app. */
  appId?: string;
  /** Required. The resource name of the location to create an app in. */
  parent: string;
  /** Request body */
  body?: App;
}

export const CreateProjectsLocationsAppsRequest = Schema.Struct({
  appId: Schema.optional(Schema.String).pipe(T.HttpQuery("appId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(App).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAppsRequest>;

export type CreateProjectsLocationsAppsResponse = Operation;
export const CreateProjectsLocationsAppsResponse = Operation;

export type CreateProjectsLocationsAppsError = DefaultErrors;

/** Creates a new app in the given project and location. */
export const createProjectsLocationsApps: API.OperationMethod<
  CreateProjectsLocationsAppsRequest,
  CreateProjectsLocationsAppsResponse,
  CreateProjectsLocationsAppsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsAppsRequest,
  output: CreateProjectsLocationsAppsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAppsRequest {
  /** Required. The resource name of the app to retrieve. */
  name: string;
}

export const GetProjectsLocationsAppsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAppsRequest>;

export type GetProjectsLocationsAppsResponse = App;
export const GetProjectsLocationsAppsResponse = App;

export type GetProjectsLocationsAppsError = DefaultErrors;

/** Gets details of the specified app. */
export const getProjectsLocationsApps: API.OperationMethod<
  GetProjectsLocationsAppsRequest,
  GetProjectsLocationsAppsResponse,
  GetProjectsLocationsAppsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsAppsRequest,
  output: GetProjectsLocationsAppsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAppsToolsRequest {
  /** Required. The resource name of the tool to retrieve. */
  name: string;
}

export const GetProjectsLocationsAppsToolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/tools/{toolsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAppsToolsRequest>;

export type GetProjectsLocationsAppsToolsResponse = Tool;
export const GetProjectsLocationsAppsToolsResponse = Tool;

export type GetProjectsLocationsAppsToolsError = DefaultErrors;

/** Gets details of the specified tool. */
export const getProjectsLocationsAppsTools: API.OperationMethod<
  GetProjectsLocationsAppsToolsRequest,
  GetProjectsLocationsAppsToolsResponse,
  GetProjectsLocationsAppsToolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsAppsToolsRequest,
  output: GetProjectsLocationsAppsToolsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAppsToolsRequest {
  /** Optional. The next_page_token value returned from a previous list AgentService.ListTools call. */
  pageToken?: string;
  /** Required. The resource name of the app to list tools from. */
  parent: string;
  /** Optional. Filter to be applied when listing the tools. Use "include_system_tools=true" to include system tools in the response. See https://google.aip.dev/160 for more details. */
  filter?: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Field to sort by. Only "name" and "create_time" is supported. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
}

export const ListProjectsLocationsAppsToolsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/tools",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAppsToolsRequest>;

export type ListProjectsLocationsAppsToolsResponse = ListToolsResponse;
export const ListProjectsLocationsAppsToolsResponse = ListToolsResponse;

export type ListProjectsLocationsAppsToolsError = DefaultErrors;

/** Lists tools in the given app. */
export const listProjectsLocationsAppsTools: API.PaginatedOperationMethod<
  ListProjectsLocationsAppsToolsRequest,
  ListProjectsLocationsAppsToolsResponse,
  ListProjectsLocationsAppsToolsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsAppsToolsRequest,
  output: ListProjectsLocationsAppsToolsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsAppsToolsRequest {
  /** Optional. The current etag of the tool. If an etag is not provided, the deletion will overwrite any concurrent changes. If an etag is provided and does not match the current etag of the tool, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** Optional. Indicates whether to forcefully delete the tool, even if it is still referenced by agents/examples. * If `force = false`, the deletion will fail if any agents still reference the tool. * If `force = true`, all existing references from agents will be removed and the tool will be deleted. */
  force?: boolean;
  /** Required. The resource name of the tool to delete. */
  name: string;
}

export const DeleteProjectsLocationsAppsToolsRequest = Schema.Struct({
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/tools/{toolsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAppsToolsRequest>;

export type DeleteProjectsLocationsAppsToolsResponse = Empty;
export const DeleteProjectsLocationsAppsToolsResponse = Empty;

export type DeleteProjectsLocationsAppsToolsError = DefaultErrors;

/** Deletes the specified tool. */
export const deleteProjectsLocationsAppsTools: API.OperationMethod<
  DeleteProjectsLocationsAppsToolsRequest,
  DeleteProjectsLocationsAppsToolsResponse,
  DeleteProjectsLocationsAppsToolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsAppsToolsRequest,
  output: DeleteProjectsLocationsAppsToolsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAppsToolsRequest {
  /** Optional. The ID to use for the tool, which will become the final component of the tool's resource name. If not provided, a unique ID will be automatically assigned for the tool. */
  toolId?: string;
  /** Required. The resource name of the app to create a tool in. */
  parent: string;
  /** Request body */
  body?: Tool;
}

export const CreateProjectsLocationsAppsToolsRequest = Schema.Struct({
  toolId: Schema.optional(Schema.String).pipe(T.HttpQuery("toolId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Tool).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/tools",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAppsToolsRequest>;

export type CreateProjectsLocationsAppsToolsResponse = Tool;
export const CreateProjectsLocationsAppsToolsResponse = Tool;

export type CreateProjectsLocationsAppsToolsError = DefaultErrors;

/** Creates a new tool in the given app. */
export const createProjectsLocationsAppsTools: API.OperationMethod<
  CreateProjectsLocationsAppsToolsRequest,
  CreateProjectsLocationsAppsToolsResponse,
  CreateProjectsLocationsAppsToolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsAppsToolsRequest,
  output: CreateProjectsLocationsAppsToolsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAppsToolsRequest {
  /** Optional. Field mask is used to control which fields get updated. If the mask is not present, all fields will be updated. */
  updateMask?: string;
  /** Identifier. The resource name of the tool. Format: * `projects/{project}/locations/{location}/apps/{app}/tools/{tool}` for standalone tools. * `projects/{project}/locations/{location}/apps/{app}/toolsets/{toolset}/tools/{tool}` for tools retrieved from a toolset. These tools are dynamic and output-only; they cannot be referenced directly where a tool is expected. */
  name: string;
  /** Request body */
  body?: Tool;
}

export const PatchProjectsLocationsAppsToolsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Tool).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/tools/{toolsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAppsToolsRequest>;

export type PatchProjectsLocationsAppsToolsResponse = Tool;
export const PatchProjectsLocationsAppsToolsResponse = Tool;

export type PatchProjectsLocationsAppsToolsError = DefaultErrors;

/** Updates the specified tool. */
export const patchProjectsLocationsAppsTools: API.OperationMethod<
  PatchProjectsLocationsAppsToolsRequest,
  PatchProjectsLocationsAppsToolsResponse,
  PatchProjectsLocationsAppsToolsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsAppsToolsRequest,
  output: PatchProjectsLocationsAppsToolsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAppsEvaluationRunsRequest {
  /** Optional. Field to sort by. Only "name" and "create_time", and "update_time" are supported. Time fields are ordered in descending order, and the name field is ordered in ascending order. If not included, "update_time" will be the default. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Required. The resource name of the app to list evaluation runs from. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Filter to be applied when listing the evaluation runs. See https://google.aip.dev/160 for more details. */
  filter?: string;
  /** Optional. The next_page_token value returned from a previous list EvaluationService.ListEvaluationRuns call. */
  pageToken?: string;
}

export const ListProjectsLocationsAppsEvaluationRunsRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/evaluationRuns",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAppsEvaluationRunsRequest>;

export type ListProjectsLocationsAppsEvaluationRunsResponse =
  ListEvaluationRunsResponse;
export const ListProjectsLocationsAppsEvaluationRunsResponse =
  ListEvaluationRunsResponse;

export type ListProjectsLocationsAppsEvaluationRunsError = DefaultErrors;

/** Lists all evaluation runs in the given app. */
export const listProjectsLocationsAppsEvaluationRuns: API.PaginatedOperationMethod<
  ListProjectsLocationsAppsEvaluationRunsRequest,
  ListProjectsLocationsAppsEvaluationRunsResponse,
  ListProjectsLocationsAppsEvaluationRunsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsAppsEvaluationRunsRequest,
  output: ListProjectsLocationsAppsEvaluationRunsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsAppsEvaluationRunsRequest {
  /** Required. The resource name of the evaluation run to delete. */
  name: string;
}

export const DeleteProjectsLocationsAppsEvaluationRunsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/evaluationRuns/{evaluationRunsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAppsEvaluationRunsRequest>;

export type DeleteProjectsLocationsAppsEvaluationRunsResponse = Operation;
export const DeleteProjectsLocationsAppsEvaluationRunsResponse = Operation;

export type DeleteProjectsLocationsAppsEvaluationRunsError = DefaultErrors;

/** Deletes an evaluation run. */
export const deleteProjectsLocationsAppsEvaluationRuns: API.OperationMethod<
  DeleteProjectsLocationsAppsEvaluationRunsRequest,
  DeleteProjectsLocationsAppsEvaluationRunsResponse,
  DeleteProjectsLocationsAppsEvaluationRunsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsAppsEvaluationRunsRequest,
  output: DeleteProjectsLocationsAppsEvaluationRunsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAppsEvaluationRunsRequest {
  /** Required. The resource name of the evaluation run to retrieve. */
  name: string;
}

export const GetProjectsLocationsAppsEvaluationRunsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/evaluationRuns/{evaluationRunsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAppsEvaluationRunsRequest>;

export type GetProjectsLocationsAppsEvaluationRunsResponse = EvaluationRun;
export const GetProjectsLocationsAppsEvaluationRunsResponse = EvaluationRun;

export type GetProjectsLocationsAppsEvaluationRunsError = DefaultErrors;

/** Gets details of the specified evaluation run. */
export const getProjectsLocationsAppsEvaluationRuns: API.OperationMethod<
  GetProjectsLocationsAppsEvaluationRunsRequest,
  GetProjectsLocationsAppsEvaluationRunsResponse,
  GetProjectsLocationsAppsEvaluationRunsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsAppsEvaluationRunsRequest,
  output: GetProjectsLocationsAppsEvaluationRunsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAppsDeploymentsRequest {
  /** Optional. The etag of the deployment. If an etag is provided and does not match the current etag of the deployment, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** Required. The name of the deployment to delete. Format: `projects/{project}/locations/{location}/apps/{app}/deployments/{deployment}` */
  name: string;
}

export const DeleteProjectsLocationsAppsDeploymentsRequest = Schema.Struct({
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/deployments/{deploymentsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAppsDeploymentsRequest>;

export type DeleteProjectsLocationsAppsDeploymentsResponse = Empty;
export const DeleteProjectsLocationsAppsDeploymentsResponse = Empty;

export type DeleteProjectsLocationsAppsDeploymentsError = DefaultErrors;

/** Deletes the specified deployment. */
export const deleteProjectsLocationsAppsDeployments: API.OperationMethod<
  DeleteProjectsLocationsAppsDeploymentsRequest,
  DeleteProjectsLocationsAppsDeploymentsResponse,
  DeleteProjectsLocationsAppsDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsAppsDeploymentsRequest,
  output: DeleteProjectsLocationsAppsDeploymentsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAppsDeploymentsRequest {
  /** Required. The name of the deployment. Format: `projects/{project}/locations/{location}/apps/{app}/deployments/{deployment}` */
  name: string;
}

export const GetProjectsLocationsAppsDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/deployments/{deploymentsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAppsDeploymentsRequest>;

export type GetProjectsLocationsAppsDeploymentsResponse = Deployment;
export const GetProjectsLocationsAppsDeploymentsResponse = Deployment;

export type GetProjectsLocationsAppsDeploymentsError = DefaultErrors;

/** Gets details of the specified deployment. */
export const getProjectsLocationsAppsDeployments: API.OperationMethod<
  GetProjectsLocationsAppsDeploymentsRequest,
  GetProjectsLocationsAppsDeploymentsResponse,
  GetProjectsLocationsAppsDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsAppsDeploymentsRequest,
  output: GetProjectsLocationsAppsDeploymentsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAppsDeploymentsRequest {
  /** Identifier. The resource name of the deployment. Format: `projects/{project}/locations/{location}/apps/{app}/deployments/{deployment}` */
  name: string;
  /** Optional. The list of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: Deployment;
}

export const PatchProjectsLocationsAppsDeploymentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Deployment).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/deployments/{deploymentsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAppsDeploymentsRequest>;

export type PatchProjectsLocationsAppsDeploymentsResponse = Deployment;
export const PatchProjectsLocationsAppsDeploymentsResponse = Deployment;

export type PatchProjectsLocationsAppsDeploymentsError = DefaultErrors;

/** Updates the specified deployment. */
export const patchProjectsLocationsAppsDeployments: API.OperationMethod<
  PatchProjectsLocationsAppsDeploymentsRequest,
  PatchProjectsLocationsAppsDeploymentsResponse,
  PatchProjectsLocationsAppsDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsAppsDeploymentsRequest,
  output: PatchProjectsLocationsAppsDeploymentsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAppsDeploymentsRequest {
  /** Required. The parent app. Format: `projects/{project}/locations/{location}/apps/{app}` */
  parent: string;
  /** Optional. A page token, received from a previous `ListDeployments` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListDeployments` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. The maximum number of deployments to return. The service may return fewer than this value. If unspecified, at most 50 deployments will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. Field to sort by. Only "name" and "create_time" is supported. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
}

export const ListProjectsLocationsAppsDeploymentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/deployments",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAppsDeploymentsRequest>;

export type ListProjectsLocationsAppsDeploymentsResponse =
  ListDeploymentsResponse;
export const ListProjectsLocationsAppsDeploymentsResponse =
  ListDeploymentsResponse;

export type ListProjectsLocationsAppsDeploymentsError = DefaultErrors;

/** Lists deployments in the given app. */
export const listProjectsLocationsAppsDeployments: API.PaginatedOperationMethod<
  ListProjectsLocationsAppsDeploymentsRequest,
  ListProjectsLocationsAppsDeploymentsResponse,
  ListProjectsLocationsAppsDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsAppsDeploymentsRequest,
  output: ListProjectsLocationsAppsDeploymentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsAppsDeploymentsRequest {
  /** Optional. The ID to use for the deployment, which will become the final component of the deployment's resource name. If not provided, a unique ID will be automatically assigned for the deployment. */
  deploymentId?: string;
  /** Required. The parent app. Format: `projects/{project}/locations/{location}/apps/{app}` */
  parent: string;
  /** Request body */
  body?: Deployment;
}

export const CreateProjectsLocationsAppsDeploymentsRequest = Schema.Struct({
  deploymentId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("deploymentId"),
  ),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Deployment).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/deployments",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAppsDeploymentsRequest>;

export type CreateProjectsLocationsAppsDeploymentsResponse = Deployment;
export const CreateProjectsLocationsAppsDeploymentsResponse = Deployment;

export type CreateProjectsLocationsAppsDeploymentsError = DefaultErrors;

/** Creates a new deployment in the given app. */
export const createProjectsLocationsAppsDeployments: API.OperationMethod<
  CreateProjectsLocationsAppsDeploymentsRequest,
  CreateProjectsLocationsAppsDeploymentsResponse,
  CreateProjectsLocationsAppsDeploymentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsAppsDeploymentsRequest,
  output: CreateProjectsLocationsAppsDeploymentsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAppsAgentsRequest {
  /** Required. The resource name of the agent to retrieve. */
  name: string;
}

export const GetProjectsLocationsAppsAgentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/agents/{agentsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAppsAgentsRequest>;

export type GetProjectsLocationsAppsAgentsResponse = Agent;
export const GetProjectsLocationsAppsAgentsResponse = Agent;

export type GetProjectsLocationsAppsAgentsError = DefaultErrors;

/** Gets details of the specified agent. */
export const getProjectsLocationsAppsAgents: API.OperationMethod<
  GetProjectsLocationsAppsAgentsRequest,
  GetProjectsLocationsAppsAgentsResponse,
  GetProjectsLocationsAppsAgentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsAppsAgentsRequest,
  output: GetProjectsLocationsAppsAgentsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAppsAgentsRequest {
  /** Required. The resource name of the agent to delete. */
  name: string;
  /** Optional. Indicates whether to forcefully delete the agent, even if it is still referenced by other app/agents/examples. * If `force = false`, the deletion fails if other agents/examples reference it. * If `force = true`, delete the agent and remove it from all referencing apps/agents/examples. */
  force?: boolean;
  /** Optional. The current etag of the agent. If an etag is not provided, the deletion will overwrite any concurrent changes. If an etag is provided and does not match the current etag of the agent, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
}

export const DeleteProjectsLocationsAppsAgentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/agents/{agentsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAppsAgentsRequest>;

export type DeleteProjectsLocationsAppsAgentsResponse = Empty;
export const DeleteProjectsLocationsAppsAgentsResponse = Empty;

export type DeleteProjectsLocationsAppsAgentsError = DefaultErrors;

/** Deletes the specified agent. */
export const deleteProjectsLocationsAppsAgents: API.OperationMethod<
  DeleteProjectsLocationsAppsAgentsRequest,
  DeleteProjectsLocationsAppsAgentsResponse,
  DeleteProjectsLocationsAppsAgentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsAppsAgentsRequest,
  output: DeleteProjectsLocationsAppsAgentsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAppsAgentsRequest {
  /** Identifier. The unique identifier of the agent. Format: `projects/{project}/locations/{location}/apps/{app}/agents/{agent}` */
  name: string;
  /** Optional. Field mask is used to control which fields get updated. If the mask is not present, all fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: Agent;
}

export const PatchProjectsLocationsAppsAgentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Agent).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/agents/{agentsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAppsAgentsRequest>;

export type PatchProjectsLocationsAppsAgentsResponse = Agent;
export const PatchProjectsLocationsAppsAgentsResponse = Agent;

export type PatchProjectsLocationsAppsAgentsError = DefaultErrors;

/** Updates the specified agent. */
export const patchProjectsLocationsAppsAgents: API.OperationMethod<
  PatchProjectsLocationsAppsAgentsRequest,
  PatchProjectsLocationsAppsAgentsResponse,
  PatchProjectsLocationsAppsAgentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsAppsAgentsRequest,
  output: PatchProjectsLocationsAppsAgentsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAppsAgentsRequest {
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. The next_page_token value returned from a previous list AgentService.ListAgents call. */
  pageToken?: string;
  /** Required. The resource name of the app to list agents from. */
  parent: string;
  /** Optional. Filter to be applied when listing the agents. See https://google.aip.dev/160 for more details. */
  filter?: string;
  /** Optional. Field to sort by. Only "name" and "create_time" is supported. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
}

export const ListProjectsLocationsAppsAgentsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/agents",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAppsAgentsRequest>;

export type ListProjectsLocationsAppsAgentsResponse = ListAgentsResponse;
export const ListProjectsLocationsAppsAgentsResponse = ListAgentsResponse;

export type ListProjectsLocationsAppsAgentsError = DefaultErrors;

/** Lists agents in the given app. */
export const listProjectsLocationsAppsAgents: API.PaginatedOperationMethod<
  ListProjectsLocationsAppsAgentsRequest,
  ListProjectsLocationsAppsAgentsResponse,
  ListProjectsLocationsAppsAgentsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsAppsAgentsRequest,
  output: ListProjectsLocationsAppsAgentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsAppsAgentsRequest {
  /** Required. The resource name of the app to create an agent in. */
  parent: string;
  /** Optional. The ID to use for the agent, which will become the final component of the agent's resource name. If not provided, a unique ID will be automatically assigned for the agent. */
  agentId?: string;
  /** Request body */
  body?: Agent;
}

export const CreateProjectsLocationsAppsAgentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  agentId: Schema.optional(Schema.String).pipe(T.HttpQuery("agentId")),
  body: Schema.optional(Agent).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/agents",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAppsAgentsRequest>;

export type CreateProjectsLocationsAppsAgentsResponse = Agent;
export const CreateProjectsLocationsAppsAgentsResponse = Agent;

export type CreateProjectsLocationsAppsAgentsError = DefaultErrors;

/** Creates a new agent in the given app. */
export const createProjectsLocationsAppsAgents: API.OperationMethod<
  CreateProjectsLocationsAppsAgentsRequest,
  CreateProjectsLocationsAppsAgentsResponse,
  CreateProjectsLocationsAppsAgentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsAppsAgentsRequest,
  output: CreateProjectsLocationsAppsAgentsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAppsExamplesRequest {
  /** Optional. The current etag of the example. If an etag is not provided, the deletion will overwrite any concurrent changes. If an etag is provided and does not match the current etag of the example, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** Required. The resource name of the example to delete. */
  name: string;
}

export const DeleteProjectsLocationsAppsExamplesRequest = Schema.Struct({
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/examples/{examplesId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAppsExamplesRequest>;

export type DeleteProjectsLocationsAppsExamplesResponse = Empty;
export const DeleteProjectsLocationsAppsExamplesResponse = Empty;

export type DeleteProjectsLocationsAppsExamplesError = DefaultErrors;

/** Deletes the specified example. */
export const deleteProjectsLocationsAppsExamples: API.OperationMethod<
  DeleteProjectsLocationsAppsExamplesRequest,
  DeleteProjectsLocationsAppsExamplesResponse,
  DeleteProjectsLocationsAppsExamplesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsAppsExamplesRequest,
  output: DeleteProjectsLocationsAppsExamplesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAppsExamplesRequest {
  /** Optional. The ID to use for the example, which will become the final component of the example's resource name. If not provided, a unique ID will be automatically assigned for the example. */
  exampleId?: string;
  /** Required. The resource name of the app to create an example in. */
  parent: string;
  /** Request body */
  body?: Example;
}

export const CreateProjectsLocationsAppsExamplesRequest = Schema.Struct({
  exampleId: Schema.optional(Schema.String).pipe(T.HttpQuery("exampleId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Example).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/examples",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAppsExamplesRequest>;

export type CreateProjectsLocationsAppsExamplesResponse = Example;
export const CreateProjectsLocationsAppsExamplesResponse = Example;

export type CreateProjectsLocationsAppsExamplesError = DefaultErrors;

/** Creates a new example in the given app. */
export const createProjectsLocationsAppsExamples: API.OperationMethod<
  CreateProjectsLocationsAppsExamplesRequest,
  CreateProjectsLocationsAppsExamplesResponse,
  CreateProjectsLocationsAppsExamplesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsAppsExamplesRequest,
  output: CreateProjectsLocationsAppsExamplesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAppsExamplesRequest {
  /** Optional. Field mask is used to control which fields get updated. If the mask is not present, all fields will be updated. */
  updateMask?: string;
  /** Identifier. The unique identifier of the example. Format: `projects/{project}/locations/{location}/apps/{app}/examples/{example}` */
  name: string;
  /** Request body */
  body?: Example;
}

export const PatchProjectsLocationsAppsExamplesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Example).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/examples/{examplesId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAppsExamplesRequest>;

export type PatchProjectsLocationsAppsExamplesResponse = Example;
export const PatchProjectsLocationsAppsExamplesResponse = Example;

export type PatchProjectsLocationsAppsExamplesError = DefaultErrors;

/** Updates the specified example. */
export const patchProjectsLocationsAppsExamples: API.OperationMethod<
  PatchProjectsLocationsAppsExamplesRequest,
  PatchProjectsLocationsAppsExamplesResponse,
  PatchProjectsLocationsAppsExamplesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsAppsExamplesRequest,
  output: PatchProjectsLocationsAppsExamplesResponse,
  errors: [],
}));

export interface ListProjectsLocationsAppsExamplesRequest {
  /** Optional. The next_page_token value returned from a previous list AgentService.ListExamples call. */
  pageToken?: string;
  /** Optional. Filter to be applied when listing the examples. See https://google.aip.dev/160 for more details. */
  filter?: string;
  /** Optional. Field to sort by. Only "name" and "create_time" is supported. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Required. The resource name of the app to list examples from. */
  parent: string;
}

export const ListProjectsLocationsAppsExamplesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/examples",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAppsExamplesRequest>;

export type ListProjectsLocationsAppsExamplesResponse = ListExamplesResponse;
export const ListProjectsLocationsAppsExamplesResponse = ListExamplesResponse;

export type ListProjectsLocationsAppsExamplesError = DefaultErrors;

/** Lists examples in the given app. */
export const listProjectsLocationsAppsExamples: API.PaginatedOperationMethod<
  ListProjectsLocationsAppsExamplesRequest,
  ListProjectsLocationsAppsExamplesResponse,
  ListProjectsLocationsAppsExamplesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsAppsExamplesRequest,
  output: ListProjectsLocationsAppsExamplesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAppsExamplesRequest {
  /** Required. The resource name of the example to retrieve. */
  name: string;
}

export const GetProjectsLocationsAppsExamplesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/examples/{examplesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAppsExamplesRequest>;

export type GetProjectsLocationsAppsExamplesResponse = Example;
export const GetProjectsLocationsAppsExamplesResponse = Example;

export type GetProjectsLocationsAppsExamplesError = DefaultErrors;

/** Gets details of the specified example. */
export const getProjectsLocationsAppsExamples: API.OperationMethod<
  GetProjectsLocationsAppsExamplesRequest,
  GetProjectsLocationsAppsExamplesResponse,
  GetProjectsLocationsAppsExamplesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsAppsExamplesRequest,
  output: GetProjectsLocationsAppsExamplesResponse,
  errors: [],
}));

export interface GenerateEvaluationProjectsLocationsAppsConversationsRequest {
  /** Required. The conversation to create the golden evaluation for. Format: `projects/{project}/locations/{location}/apps/{app}/conversations/{conversation}` */
  conversation: string;
  /** Request body */
  body?: GenerateEvaluationRequest;
}

export const GenerateEvaluationProjectsLocationsAppsConversationsRequest =
  Schema.Struct({
    conversation: Schema.String.pipe(T.HttpPath("conversation")),
    body: Schema.optional(GenerateEvaluationRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/conversations/{conversationsId}:generateEvaluation",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<GenerateEvaluationProjectsLocationsAppsConversationsRequest>;

export type GenerateEvaluationProjectsLocationsAppsConversationsResponse =
  Operation;
export const GenerateEvaluationProjectsLocationsAppsConversationsResponse =
  Operation;

export type GenerateEvaluationProjectsLocationsAppsConversationsError =
  DefaultErrors;

/** Creates a golden evaluation from a conversation. */
export const generateEvaluationProjectsLocationsAppsConversations: API.OperationMethod<
  GenerateEvaluationProjectsLocationsAppsConversationsRequest,
  GenerateEvaluationProjectsLocationsAppsConversationsResponse,
  GenerateEvaluationProjectsLocationsAppsConversationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GenerateEvaluationProjectsLocationsAppsConversationsRequest,
  output: GenerateEvaluationProjectsLocationsAppsConversationsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAppsConversationsRequest {
  /** Optional. Indicate the source of the conversation. If not set, all source will be searched. */
  source?: "SOURCE_UNSPECIFIED" | "LIVE" | "SIMULATOR" | "EVAL" | (string & {});
  /** Required. The resource name of the conversation to retrieve. */
  name: string;
}

export const GetProjectsLocationsAppsConversationsRequest = Schema.Struct({
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/conversations/{conversationsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAppsConversationsRequest>;

export type GetProjectsLocationsAppsConversationsResponse = Conversation;
export const GetProjectsLocationsAppsConversationsResponse = Conversation;

export type GetProjectsLocationsAppsConversationsError = DefaultErrors;

/** Gets details of the specified conversation. */
export const getProjectsLocationsAppsConversations: API.OperationMethod<
  GetProjectsLocationsAppsConversationsRequest,
  GetProjectsLocationsAppsConversationsResponse,
  GetProjectsLocationsAppsConversationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsAppsConversationsRequest,
  output: GetProjectsLocationsAppsConversationsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAppsConversationsRequest {
  /** Required. The resource name of the conversation to delete. */
  name: string;
  /** Optional. Indicate the source of the conversation. If not set, Source.Live will be applied by default. */
  source?: "SOURCE_UNSPECIFIED" | "LIVE" | "SIMULATOR" | "EVAL" | (string & {});
}

export const DeleteProjectsLocationsAppsConversationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/conversations/{conversationsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAppsConversationsRequest>;

export type DeleteProjectsLocationsAppsConversationsResponse = Empty;
export const DeleteProjectsLocationsAppsConversationsResponse = Empty;

export type DeleteProjectsLocationsAppsConversationsError = DefaultErrors;

/** Deletes the specified conversation. */
export const deleteProjectsLocationsAppsConversations: API.OperationMethod<
  DeleteProjectsLocationsAppsConversationsRequest,
  DeleteProjectsLocationsAppsConversationsResponse,
  DeleteProjectsLocationsAppsConversationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsAppsConversationsRequest,
  output: DeleteProjectsLocationsAppsConversationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAppsConversationsRequest {
  /** Required. The resource name of the app to list conversations from. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. The next_page_token value returned from a previous list AgentService.ListConversations call. */
  pageToken?: string;
  /** Optional. Indicate the sources of the conversations. If not set, all available sources will be applied by default. */
  sources?:
    | "SOURCE_UNSPECIFIED"
    | "LIVE"
    | "SIMULATOR"
    | "EVAL"
    | (string & {})[];
  /** Optional. Filter to be applied when listing the conversations. See https://google.aip.dev/160 for more details. */
  filter?: string;
  /** Optional. Indicate the source of the conversation. If not set, Source.Live will be applied by default. Will be deprecated in favor of `sources` field. */
  source?: "SOURCE_UNSPECIFIED" | "LIVE" | "SIMULATOR" | "EVAL" | (string & {});
}

export const ListProjectsLocationsAppsConversationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  sources: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("sources"),
  ),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  source: Schema.optional(Schema.String).pipe(T.HttpQuery("source")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/conversations",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAppsConversationsRequest>;

export type ListProjectsLocationsAppsConversationsResponse =
  ListConversationsResponse;
export const ListProjectsLocationsAppsConversationsResponse =
  ListConversationsResponse;

export type ListProjectsLocationsAppsConversationsError = DefaultErrors;

/** Lists conversations in the given app. */
export const listProjectsLocationsAppsConversations: API.PaginatedOperationMethod<
  ListProjectsLocationsAppsConversationsRequest,
  ListProjectsLocationsAppsConversationsResponse,
  ListProjectsLocationsAppsConversationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsAppsConversationsRequest,
  output: ListProjectsLocationsAppsConversationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface BatchDeleteProjectsLocationsAppsConversationsRequest {
  /** Required. The resource name of the app to delete conversations from. Format: `projects/{project}/locations/{location}/apps/{app}` */
  parent: string;
  /** Request body */
  body?: BatchDeleteConversationsRequest;
}

export const BatchDeleteProjectsLocationsAppsConversationsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(BatchDeleteConversationsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/conversations:batchDelete",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<BatchDeleteProjectsLocationsAppsConversationsRequest>;

export type BatchDeleteProjectsLocationsAppsConversationsResponse = Operation;
export const BatchDeleteProjectsLocationsAppsConversationsResponse = Operation;

export type BatchDeleteProjectsLocationsAppsConversationsError = DefaultErrors;

/** Batch deletes the specified conversations. */
export const batchDeleteProjectsLocationsAppsConversations: API.OperationMethod<
  BatchDeleteProjectsLocationsAppsConversationsRequest,
  BatchDeleteProjectsLocationsAppsConversationsResponse,
  BatchDeleteProjectsLocationsAppsConversationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: BatchDeleteProjectsLocationsAppsConversationsRequest,
  output: BatchDeleteProjectsLocationsAppsConversationsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAppsGuardrailsRequest {
  /** Optional. Field mask is used to control which fields get updated. If the mask is not present, all fields will be updated. */
  updateMask?: string;
  /** Identifier. The unique identifier of the guardrail. Format: `projects/{project}/locations/{location}/apps/{app}/guardrails/{guardrail}` */
  name: string;
  /** Request body */
  body?: Guardrail;
}

export const PatchProjectsLocationsAppsGuardrailsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Guardrail).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/guardrails/{guardrailsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAppsGuardrailsRequest>;

export type PatchProjectsLocationsAppsGuardrailsResponse = Guardrail;
export const PatchProjectsLocationsAppsGuardrailsResponse = Guardrail;

export type PatchProjectsLocationsAppsGuardrailsError = DefaultErrors;

/** Updates the specified guardrail. */
export const patchProjectsLocationsAppsGuardrails: API.OperationMethod<
  PatchProjectsLocationsAppsGuardrailsRequest,
  PatchProjectsLocationsAppsGuardrailsResponse,
  PatchProjectsLocationsAppsGuardrailsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsAppsGuardrailsRequest,
  output: PatchProjectsLocationsAppsGuardrailsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAppsGuardrailsRequest {
  /** Optional. Indicates whether to forcefully delete the guardrail, even if it is still referenced by app/agents. * If `force = false`, the deletion fails if any apps/agents still reference the guardrail. * If `force = true`, all existing references from apps/agents will be removed and the guardrail will be deleted. */
  force?: boolean;
  /** Optional. The current etag of the guardrail. If an etag is not provided, the deletion will overwrite any concurrent changes. If an etag is provided and does not match the current etag of the guardrail, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** Required. The resource name of the guardrail to delete. */
  name: string;
}

export const DeleteProjectsLocationsAppsGuardrailsRequest = Schema.Struct({
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/guardrails/{guardrailsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAppsGuardrailsRequest>;

export type DeleteProjectsLocationsAppsGuardrailsResponse = Empty;
export const DeleteProjectsLocationsAppsGuardrailsResponse = Empty;

export type DeleteProjectsLocationsAppsGuardrailsError = DefaultErrors;

/** Deletes the specified guardrail. */
export const deleteProjectsLocationsAppsGuardrails: API.OperationMethod<
  DeleteProjectsLocationsAppsGuardrailsRequest,
  DeleteProjectsLocationsAppsGuardrailsResponse,
  DeleteProjectsLocationsAppsGuardrailsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsAppsGuardrailsRequest,
  output: DeleteProjectsLocationsAppsGuardrailsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAppsGuardrailsRequest {
  /** Optional. Field to sort by. Only "name" and "create_time" is supported. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Required. The resource name of the app to list guardrails from. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. The next_page_token value returned from a previous list AgentService.ListGuardrails call. */
  pageToken?: string;
  /** Optional. Filter to be applied when listing the guardrails. See https://google.aip.dev/160 for more details. */
  filter?: string;
}

export const ListProjectsLocationsAppsGuardrailsRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/guardrails",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAppsGuardrailsRequest>;

export type ListProjectsLocationsAppsGuardrailsResponse =
  ListGuardrailsResponse;
export const ListProjectsLocationsAppsGuardrailsResponse =
  ListGuardrailsResponse;

export type ListProjectsLocationsAppsGuardrailsError = DefaultErrors;

/** Lists guardrails in the given app. */
export const listProjectsLocationsAppsGuardrails: API.PaginatedOperationMethod<
  ListProjectsLocationsAppsGuardrailsRequest,
  ListProjectsLocationsAppsGuardrailsResponse,
  ListProjectsLocationsAppsGuardrailsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsAppsGuardrailsRequest,
  output: ListProjectsLocationsAppsGuardrailsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsAppsGuardrailsRequest {
  /** Optional. The ID to use for the guardrail, which will become the final component of the guardrail's resource name. If not provided, a unique ID will be automatically assigned for the guardrail. */
  guardrailId?: string;
  /** Required. The resource name of the app to create a guardrail in. */
  parent: string;
  /** Request body */
  body?: Guardrail;
}

export const CreateProjectsLocationsAppsGuardrailsRequest = Schema.Struct({
  guardrailId: Schema.optional(Schema.String).pipe(T.HttpQuery("guardrailId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Guardrail).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/guardrails",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAppsGuardrailsRequest>;

export type CreateProjectsLocationsAppsGuardrailsResponse = Guardrail;
export const CreateProjectsLocationsAppsGuardrailsResponse = Guardrail;

export type CreateProjectsLocationsAppsGuardrailsError = DefaultErrors;

/** Creates a new guardrail in the given app. */
export const createProjectsLocationsAppsGuardrails: API.OperationMethod<
  CreateProjectsLocationsAppsGuardrailsRequest,
  CreateProjectsLocationsAppsGuardrailsResponse,
  CreateProjectsLocationsAppsGuardrailsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsAppsGuardrailsRequest,
  output: CreateProjectsLocationsAppsGuardrailsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAppsGuardrailsRequest {
  /** Required. The resource name of the guardrail to retrieve. */
  name: string;
}

export const GetProjectsLocationsAppsGuardrailsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/guardrails/{guardrailsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAppsGuardrailsRequest>;

export type GetProjectsLocationsAppsGuardrailsResponse = Guardrail;
export const GetProjectsLocationsAppsGuardrailsResponse = Guardrail;

export type GetProjectsLocationsAppsGuardrailsError = DefaultErrors;

/** Gets details of the specified guardrail. */
export const getProjectsLocationsAppsGuardrails: API.OperationMethod<
  GetProjectsLocationsAppsGuardrailsRequest,
  GetProjectsLocationsAppsGuardrailsResponse,
  GetProjectsLocationsAppsGuardrailsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsAppsGuardrailsRequest,
  output: GetProjectsLocationsAppsGuardrailsResponse,
  errors: [],
}));

export interface RunSessionProjectsLocationsAppsSessionsRequest {
  /** Required. The unique identifier of the session. Format: `projects/{project}/locations/{location}/apps/{app}/sessions/{session}` */
  session: string;
  /** Request body */
  body?: RunSessionRequest;
}

export const RunSessionProjectsLocationsAppsSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(RunSessionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/sessions/{sessionsId}:runSession",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<RunSessionProjectsLocationsAppsSessionsRequest>;

export type RunSessionProjectsLocationsAppsSessionsResponse =
  RunSessionResponse;
export const RunSessionProjectsLocationsAppsSessionsResponse =
  RunSessionResponse;

export type RunSessionProjectsLocationsAppsSessionsError = DefaultErrors;

/** Initiates a single turn interaction with the CES agent within a session. */
export const runSessionProjectsLocationsAppsSessions: API.OperationMethod<
  RunSessionProjectsLocationsAppsSessionsRequest,
  RunSessionProjectsLocationsAppsSessionsResponse,
  RunSessionProjectsLocationsAppsSessionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RunSessionProjectsLocationsAppsSessionsRequest,
  output: RunSessionProjectsLocationsAppsSessionsResponse,
  errors: [],
}));

export interface GenerateChatTokenProjectsLocationsAppsSessionsRequest {
  /** Required. The session name to generate the chat token for. Format: projects/{project}/locations/{location}/apps/{app}/sessions/{session} */
  name: string;
  /** Request body */
  body?: GenerateChatTokenRequest;
}

export const GenerateChatTokenProjectsLocationsAppsSessionsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(GenerateChatTokenRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/sessions/{sessionsId}:generateChatToken",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<GenerateChatTokenProjectsLocationsAppsSessionsRequest>;

export type GenerateChatTokenProjectsLocationsAppsSessionsResponse =
  GenerateChatTokenResponse;
export const GenerateChatTokenProjectsLocationsAppsSessionsResponse =
  GenerateChatTokenResponse;

export type GenerateChatTokenProjectsLocationsAppsSessionsError = DefaultErrors;

/** Generates a session scoped token for chat widget to authenticate with Session APIs. */
export const generateChatTokenProjectsLocationsAppsSessions: API.OperationMethod<
  GenerateChatTokenProjectsLocationsAppsSessionsRequest,
  GenerateChatTokenProjectsLocationsAppsSessionsResponse,
  GenerateChatTokenProjectsLocationsAppsSessionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GenerateChatTokenProjectsLocationsAppsSessionsRequest,
  output: GenerateChatTokenProjectsLocationsAppsSessionsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAppsScheduledEvaluationRunsRequest {
  /** Required. The resource name of the scheduled evaluation run to retrieve. */
  name: string;
}

export const GetProjectsLocationsAppsScheduledEvaluationRunsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/scheduledEvaluationRuns/{scheduledEvaluationRunsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsAppsScheduledEvaluationRunsRequest>;

export type GetProjectsLocationsAppsScheduledEvaluationRunsResponse =
  ScheduledEvaluationRun;
export const GetProjectsLocationsAppsScheduledEvaluationRunsResponse =
  ScheduledEvaluationRun;

export type GetProjectsLocationsAppsScheduledEvaluationRunsError =
  DefaultErrors;

/** Gets details of the specified scheduled evaluation run. */
export const getProjectsLocationsAppsScheduledEvaluationRuns: API.OperationMethod<
  GetProjectsLocationsAppsScheduledEvaluationRunsRequest,
  GetProjectsLocationsAppsScheduledEvaluationRunsResponse,
  GetProjectsLocationsAppsScheduledEvaluationRunsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsAppsScheduledEvaluationRunsRequest,
  output: GetProjectsLocationsAppsScheduledEvaluationRunsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAppsScheduledEvaluationRunsRequest {
  /** Required. The resource name of the app to list scheduled evaluation runs from. */
  parent: string;
  /** Optional. The next_page_token value returned from a previous list EvaluationService.ListScheduledEvaluationRuns call. */
  pageToken?: string;
  /** Optional. Field to sort by. Supported fields are: "name" (ascending), "create_time" (descending), "update_time" (descending), "next_scheduled_execution" (ascending), and "last_completed_run.create_time" (descending). If not included, "update_time" will be the default. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Optional. Filter to be applied when listing the scheduled evaluation runs. See https://google.aip.dev/160 for more details. Currently supports filtering by: * request.evaluations:evaluation_id * request.evaluation_dataset:evaluation_dataset_id */
  filter?: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
}

export const ListProjectsLocationsAppsScheduledEvaluationRunsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/scheduledEvaluationRuns",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsAppsScheduledEvaluationRunsRequest>;

export type ListProjectsLocationsAppsScheduledEvaluationRunsResponse =
  ListScheduledEvaluationRunsResponse;
export const ListProjectsLocationsAppsScheduledEvaluationRunsResponse =
  ListScheduledEvaluationRunsResponse;

export type ListProjectsLocationsAppsScheduledEvaluationRunsError =
  DefaultErrors;

/** Lists all scheduled evaluation runs in the given app. */
export const listProjectsLocationsAppsScheduledEvaluationRuns: API.PaginatedOperationMethod<
  ListProjectsLocationsAppsScheduledEvaluationRunsRequest,
  ListProjectsLocationsAppsScheduledEvaluationRunsResponse,
  ListProjectsLocationsAppsScheduledEvaluationRunsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsAppsScheduledEvaluationRunsRequest,
  output: ListProjectsLocationsAppsScheduledEvaluationRunsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsAppsScheduledEvaluationRunsRequest {
  /** Required. The resource name of the scheduled evaluation run to delete. */
  name: string;
  /** Optional. The etag of the ScheduledEvaluationRun. If provided, it must match the server's etag. */
  etag?: string;
}

export const DeleteProjectsLocationsAppsScheduledEvaluationRunsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/scheduledEvaluationRuns/{scheduledEvaluationRunsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsAppsScheduledEvaluationRunsRequest>;

export type DeleteProjectsLocationsAppsScheduledEvaluationRunsResponse = Empty;
export const DeleteProjectsLocationsAppsScheduledEvaluationRunsResponse = Empty;

export type DeleteProjectsLocationsAppsScheduledEvaluationRunsError =
  DefaultErrors;

/** Deletes a scheduled evaluation run. */
export const deleteProjectsLocationsAppsScheduledEvaluationRuns: API.OperationMethod<
  DeleteProjectsLocationsAppsScheduledEvaluationRunsRequest,
  DeleteProjectsLocationsAppsScheduledEvaluationRunsResponse,
  DeleteProjectsLocationsAppsScheduledEvaluationRunsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsAppsScheduledEvaluationRunsRequest,
  output: DeleteProjectsLocationsAppsScheduledEvaluationRunsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAppsScheduledEvaluationRunsRequest {
  /** Required. The app to create the scheduled evaluation run for. Format: `projects/{project}/locations/{location}/apps/{app}` */
  parent: string;
  /** Optional. The ID to use for the scheduled evaluation run, which will become the final component of the scheduled evaluation run's resource name. If not provided, a unique ID will be automatically assigned. */
  scheduledEvaluationRunId?: string;
  /** Request body */
  body?: ScheduledEvaluationRun;
}

export const CreateProjectsLocationsAppsScheduledEvaluationRunsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    scheduledEvaluationRunId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("scheduledEvaluationRunId"),
    ),
    body: Schema.optional(ScheduledEvaluationRun).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/scheduledEvaluationRuns",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsAppsScheduledEvaluationRunsRequest>;

export type CreateProjectsLocationsAppsScheduledEvaluationRunsResponse =
  ScheduledEvaluationRun;
export const CreateProjectsLocationsAppsScheduledEvaluationRunsResponse =
  ScheduledEvaluationRun;

export type CreateProjectsLocationsAppsScheduledEvaluationRunsError =
  DefaultErrors;

/** Creates a scheduled evaluation run. */
export const createProjectsLocationsAppsScheduledEvaluationRuns: API.OperationMethod<
  CreateProjectsLocationsAppsScheduledEvaluationRunsRequest,
  CreateProjectsLocationsAppsScheduledEvaluationRunsResponse,
  CreateProjectsLocationsAppsScheduledEvaluationRunsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsAppsScheduledEvaluationRunsRequest,
  output: CreateProjectsLocationsAppsScheduledEvaluationRunsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAppsScheduledEvaluationRunsRequest {
  /** Optional. Field mask is used to control which fields get updated. If the mask is not present, all fields will be updated. */
  updateMask?: string;
  /** Identifier. The unique identifier of the scheduled evaluation run config. Format: projects/{projectId}/locations/{locationId}/apps/{appId}/scheduledEvaluationRuns/{scheduledEvaluationRunId} */
  name: string;
  /** Request body */
  body?: ScheduledEvaluationRun;
}

export const PatchProjectsLocationsAppsScheduledEvaluationRunsRequest =
  Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(ScheduledEvaluationRun).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/scheduledEvaluationRuns/{scheduledEvaluationRunsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsAppsScheduledEvaluationRunsRequest>;

export type PatchProjectsLocationsAppsScheduledEvaluationRunsResponse =
  ScheduledEvaluationRun;
export const PatchProjectsLocationsAppsScheduledEvaluationRunsResponse =
  ScheduledEvaluationRun;

export type PatchProjectsLocationsAppsScheduledEvaluationRunsError =
  DefaultErrors;

/** Updates a scheduled evaluation run. */
export const patchProjectsLocationsAppsScheduledEvaluationRuns: API.OperationMethod<
  PatchProjectsLocationsAppsScheduledEvaluationRunsRequest,
  PatchProjectsLocationsAppsScheduledEvaluationRunsResponse,
  PatchProjectsLocationsAppsScheduledEvaluationRunsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsAppsScheduledEvaluationRunsRequest,
  output: PatchProjectsLocationsAppsScheduledEvaluationRunsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAppsToolsetsRequest {
  /** Optional. The current etag of the toolset. If an etag is not provided, the deletion will overwrite any concurrent changes. If an etag is provided and does not match the current etag of the toolset, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** Required. The resource name of the toolset to delete. */
  name: string;
  /** Optional. Indicates whether to forcefully delete the toolset, even if it is still referenced by app/agents. * If `force = false`, the deletion fails if any agents still reference the toolset. * If `force = true`, all existing references from agents will be removed and the toolset will be deleted. */
  force?: boolean;
}

export const DeleteProjectsLocationsAppsToolsetsRequest = Schema.Struct({
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/toolsets/{toolsetsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAppsToolsetsRequest>;

export type DeleteProjectsLocationsAppsToolsetsResponse = Empty;
export const DeleteProjectsLocationsAppsToolsetsResponse = Empty;

export type DeleteProjectsLocationsAppsToolsetsError = DefaultErrors;

/** Deletes the specified toolset. */
export const deleteProjectsLocationsAppsToolsets: API.OperationMethod<
  DeleteProjectsLocationsAppsToolsetsRequest,
  DeleteProjectsLocationsAppsToolsetsResponse,
  DeleteProjectsLocationsAppsToolsetsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsAppsToolsetsRequest,
  output: DeleteProjectsLocationsAppsToolsetsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAppsToolsetsRequest {
  /** Required. The resource name of the toolset to retrieve. */
  name: string;
}

export const GetProjectsLocationsAppsToolsetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/toolsets/{toolsetsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAppsToolsetsRequest>;

export type GetProjectsLocationsAppsToolsetsResponse = Toolset;
export const GetProjectsLocationsAppsToolsetsResponse = Toolset;

export type GetProjectsLocationsAppsToolsetsError = DefaultErrors;

/** Gets details of the specified toolset. */
export const getProjectsLocationsAppsToolsets: API.OperationMethod<
  GetProjectsLocationsAppsToolsetsRequest,
  GetProjectsLocationsAppsToolsetsResponse,
  GetProjectsLocationsAppsToolsetsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsAppsToolsetsRequest,
  output: GetProjectsLocationsAppsToolsetsResponse,
  errors: [],
}));

export interface RetrieveToolsProjectsLocationsAppsToolsetsRequest {
  /** Required. The name of the toolset to retrieve the tools for. Format: `projects/{project}/locations/{location}/apps/{app}/toolsets/{toolset}` */
  toolset: string;
  /** Request body */
  body?: RetrieveToolsRequest;
}

export const RetrieveToolsProjectsLocationsAppsToolsetsRequest = Schema.Struct({
  toolset: Schema.String.pipe(T.HttpPath("toolset")),
  body: Schema.optional(RetrieveToolsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/toolsets/{toolsetsId}:retrieveTools",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<RetrieveToolsProjectsLocationsAppsToolsetsRequest>;

export type RetrieveToolsProjectsLocationsAppsToolsetsResponse =
  RetrieveToolsResponse;
export const RetrieveToolsProjectsLocationsAppsToolsetsResponse =
  RetrieveToolsResponse;

export type RetrieveToolsProjectsLocationsAppsToolsetsError = DefaultErrors;

/** Retrieve the list of tools included in the specified toolset. */
export const retrieveToolsProjectsLocationsAppsToolsets: API.OperationMethod<
  RetrieveToolsProjectsLocationsAppsToolsetsRequest,
  RetrieveToolsProjectsLocationsAppsToolsetsResponse,
  RetrieveToolsProjectsLocationsAppsToolsetsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RetrieveToolsProjectsLocationsAppsToolsetsRequest,
  output: RetrieveToolsProjectsLocationsAppsToolsetsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAppsToolsetsRequest {
  /** Identifier. The unique identifier of the toolset. Format: `projects/{project}/locations/{location}/apps/{app}/toolsets/{toolset}` */
  name: string;
  /** Optional. Field mask is used to control which fields get updated. If the mask is not present, all fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: Toolset;
}

export const PatchProjectsLocationsAppsToolsetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Toolset).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/toolsets/{toolsetsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAppsToolsetsRequest>;

export type PatchProjectsLocationsAppsToolsetsResponse = Toolset;
export const PatchProjectsLocationsAppsToolsetsResponse = Toolset;

export type PatchProjectsLocationsAppsToolsetsError = DefaultErrors;

/** Updates the specified toolset. */
export const patchProjectsLocationsAppsToolsets: API.OperationMethod<
  PatchProjectsLocationsAppsToolsetsRequest,
  PatchProjectsLocationsAppsToolsetsResponse,
  PatchProjectsLocationsAppsToolsetsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsAppsToolsetsRequest,
  output: PatchProjectsLocationsAppsToolsetsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAppsToolsetsRequest {
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Field to sort by. Only "name" and "create_time" is supported. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Required. The resource name of the app to list toolsets from. */
  parent: string;
  /** Optional. The next_page_token value returned from a previous list AgentService.ListToolsets call. */
  pageToken?: string;
  /** Optional. Filter to be applied when listing the toolsets. See https://google.aip.dev/160 for more details. */
  filter?: string;
}

export const ListProjectsLocationsAppsToolsetsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/toolsets",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAppsToolsetsRequest>;

export type ListProjectsLocationsAppsToolsetsResponse = ListToolsetsResponse;
export const ListProjectsLocationsAppsToolsetsResponse = ListToolsetsResponse;

export type ListProjectsLocationsAppsToolsetsError = DefaultErrors;

/** Lists toolsets in the given app. */
export const listProjectsLocationsAppsToolsets: API.PaginatedOperationMethod<
  ListProjectsLocationsAppsToolsetsRequest,
  ListProjectsLocationsAppsToolsetsResponse,
  ListProjectsLocationsAppsToolsetsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsAppsToolsetsRequest,
  output: ListProjectsLocationsAppsToolsetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsAppsToolsetsRequest {
  /** Required. The resource name of the app to create a toolset in. */
  parent: string;
  /** Optional. The ID to use for the toolset, which will become the final component of the toolset's resource name. If not provided, a unique ID will be automatically assigned for the toolset. */
  toolsetId?: string;
  /** Request body */
  body?: Toolset;
}

export const CreateProjectsLocationsAppsToolsetsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  toolsetId: Schema.optional(Schema.String).pipe(T.HttpQuery("toolsetId")),
  body: Schema.optional(Toolset).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/toolsets",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAppsToolsetsRequest>;

export type CreateProjectsLocationsAppsToolsetsResponse = Toolset;
export const CreateProjectsLocationsAppsToolsetsResponse = Toolset;

export type CreateProjectsLocationsAppsToolsetsError = DefaultErrors;

/** Creates a new toolset in the given app. */
export const createProjectsLocationsAppsToolsets: API.OperationMethod<
  CreateProjectsLocationsAppsToolsetsRequest,
  CreateProjectsLocationsAppsToolsetsResponse,
  CreateProjectsLocationsAppsToolsetsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsAppsToolsetsRequest,
  output: CreateProjectsLocationsAppsToolsetsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAppsChangelogsRequest {
  /** Optional. Field to sort by. Only "name" and "create_time" is supported. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Required. The resource name of the app to list changelogs from. */
  parent: string;
  /** Optional. The next_page_token value returned from a previous list AgentService.ListChangelogs call. */
  pageToken?: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Filter to be applied when listing the changelogs. See https://google.aip.dev/160 for more details. The filter string can be used to filter by `action`, `resource_type`, `resource_name`, `author`, and `create_time`. The `:` comparator can be used for case-insensitive partial matching on string fields, while `=` performs an exact case-sensitive match. Examples: * `action:update` (case-insensitive partial match) * `action="Create"` (case-sensitive exact match) * `resource_type:agent` * `resource_name:my-agent` * `author:me@example.com` * `create_time > "2025-01-01T00:00:00Z"` * `create_time <= "2025-01-01T00:00:00Z" AND resource_type:tool` */
  filter?: string;
}

export const ListProjectsLocationsAppsChangelogsRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/changelogs",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAppsChangelogsRequest>;

export type ListProjectsLocationsAppsChangelogsResponse =
  ListChangelogsResponse;
export const ListProjectsLocationsAppsChangelogsResponse =
  ListChangelogsResponse;

export type ListProjectsLocationsAppsChangelogsError = DefaultErrors;

/** Lists the changelogs of the specified app. */
export const listProjectsLocationsAppsChangelogs: API.PaginatedOperationMethod<
  ListProjectsLocationsAppsChangelogsRequest,
  ListProjectsLocationsAppsChangelogsResponse,
  ListProjectsLocationsAppsChangelogsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsAppsChangelogsRequest,
  output: ListProjectsLocationsAppsChangelogsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAppsChangelogsRequest {
  /** Required. The resource name of the changelog to retrieve. */
  name: string;
}

export const GetProjectsLocationsAppsChangelogsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/changelogs/{changelogsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAppsChangelogsRequest>;

export type GetProjectsLocationsAppsChangelogsResponse = Changelog;
export const GetProjectsLocationsAppsChangelogsResponse = Changelog;

export type GetProjectsLocationsAppsChangelogsError = DefaultErrors;

/** Gets the specified changelog. */
export const getProjectsLocationsAppsChangelogs: API.OperationMethod<
  GetProjectsLocationsAppsChangelogsRequest,
  GetProjectsLocationsAppsChangelogsResponse,
  GetProjectsLocationsAppsChangelogsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsAppsChangelogsRequest,
  output: GetProjectsLocationsAppsChangelogsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAppsVersionsRequest {
  /** Required. The resource name of the app version to delete. */
  name: string;
  /** Optional. The current etag of the app version. If an etag is not provided, the deletion will overwrite any concurrent changes. If an etag is provided and does not match the current etag of the app version, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
}

export const DeleteProjectsLocationsAppsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/versions/{versionsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAppsVersionsRequest>;

export type DeleteProjectsLocationsAppsVersionsResponse = Empty;
export const DeleteProjectsLocationsAppsVersionsResponse = Empty;

export type DeleteProjectsLocationsAppsVersionsError = DefaultErrors;

/** Deletes the specified app version. */
export const deleteProjectsLocationsAppsVersions: API.OperationMethod<
  DeleteProjectsLocationsAppsVersionsRequest,
  DeleteProjectsLocationsAppsVersionsResponse,
  DeleteProjectsLocationsAppsVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsAppsVersionsRequest,
  output: DeleteProjectsLocationsAppsVersionsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAppsVersionsRequest {
  /** Required. The resource name of the app version to retrieve. */
  name: string;
}

export const GetProjectsLocationsAppsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/versions/{versionsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAppsVersionsRequest>;

export type GetProjectsLocationsAppsVersionsResponse = AppVersion;
export const GetProjectsLocationsAppsVersionsResponse = AppVersion;

export type GetProjectsLocationsAppsVersionsError = DefaultErrors;

/** Gets details of the specified app version. */
export const getProjectsLocationsAppsVersions: API.OperationMethod<
  GetProjectsLocationsAppsVersionsRequest,
  GetProjectsLocationsAppsVersionsResponse,
  GetProjectsLocationsAppsVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsAppsVersionsRequest,
  output: GetProjectsLocationsAppsVersionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAppsVersionsRequest {
  /** Optional. Field to sort by. Only "name" and "create_time" is supported. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Optional. Filter to be applied when listing the app versions. See https://google.aip.dev/160 for more details. */
  filter?: string;
  /** Optional. The next_page_token value returned from a previous list AgentService.ListAppVersions call. */
  pageToken?: string;
  /** Required. The resource name of the app to list app versions from. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
}

export const ListProjectsLocationsAppsVersionsRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/versions",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAppsVersionsRequest>;

export type ListProjectsLocationsAppsVersionsResponse = ListAppVersionsResponse;
export const ListProjectsLocationsAppsVersionsResponse =
  ListAppVersionsResponse;

export type ListProjectsLocationsAppsVersionsError = DefaultErrors;

/** Lists all app versions in the given app. */
export const listProjectsLocationsAppsVersions: API.PaginatedOperationMethod<
  ListProjectsLocationsAppsVersionsRequest,
  ListProjectsLocationsAppsVersionsResponse,
  ListProjectsLocationsAppsVersionsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsAppsVersionsRequest,
  output: ListProjectsLocationsAppsVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateProjectsLocationsAppsVersionsRequest {
  /** Optional. The ID to use for the app version, which will become the final component of the app version's resource name. If not provided, a unique ID will be automatically assigned for the app version. */
  appVersionId?: string;
  /** Required. The resource name of the app to create an app version in. */
  parent: string;
  /** Request body */
  body?: AppVersion;
}

export const CreateProjectsLocationsAppsVersionsRequest = Schema.Struct({
  appVersionId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("appVersionId"),
  ),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(AppVersion).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/versions",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAppsVersionsRequest>;

export type CreateProjectsLocationsAppsVersionsResponse = AppVersion;
export const CreateProjectsLocationsAppsVersionsResponse = AppVersion;

export type CreateProjectsLocationsAppsVersionsError = DefaultErrors;

/** Creates a new app version in the given app. */
export const createProjectsLocationsAppsVersions: API.OperationMethod<
  CreateProjectsLocationsAppsVersionsRequest,
  CreateProjectsLocationsAppsVersionsResponse,
  CreateProjectsLocationsAppsVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsAppsVersionsRequest,
  output: CreateProjectsLocationsAppsVersionsResponse,
  errors: [],
}));

export interface RestoreProjectsLocationsAppsVersionsRequest {
  /** Required. The resource name of the app version to restore. */
  name: string;
  /** Request body */
  body?: RestoreAppVersionRequest;
}

export const RestoreProjectsLocationsAppsVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RestoreAppVersionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/versions/{versionsId}:restore",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<RestoreProjectsLocationsAppsVersionsRequest>;

export type RestoreProjectsLocationsAppsVersionsResponse = Operation;
export const RestoreProjectsLocationsAppsVersionsResponse = Operation;

export type RestoreProjectsLocationsAppsVersionsError = DefaultErrors;

/** Restores the specified app version. This will create a new app version from the current draft app and overwrite the current draft with the specified app version. */
export const restoreProjectsLocationsAppsVersions: API.OperationMethod<
  RestoreProjectsLocationsAppsVersionsRequest,
  RestoreProjectsLocationsAppsVersionsResponse,
  RestoreProjectsLocationsAppsVersionsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RestoreProjectsLocationsAppsVersionsRequest,
  output: RestoreProjectsLocationsAppsVersionsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAppsEvaluationDatasetsRequest {
  /** Identifier. The unique identifier of this evaluation dataset. Format: `projects/{project}/locations/{location}/apps/{app}/evaluationDatasets/{evaluationDataset}` */
  name: string;
  /** Optional. Field mask is used to control which fields get updated. If the mask is not present, all fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: EvaluationDataset;
}

export const PatchProjectsLocationsAppsEvaluationDatasetsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(EvaluationDataset).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/evaluationDatasets/{evaluationDatasetsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsAppsEvaluationDatasetsRequest>;

export type PatchProjectsLocationsAppsEvaluationDatasetsResponse =
  EvaluationDataset;
export const PatchProjectsLocationsAppsEvaluationDatasetsResponse =
  EvaluationDataset;

export type PatchProjectsLocationsAppsEvaluationDatasetsError = DefaultErrors;

/** Updates an evaluation dataset. */
export const patchProjectsLocationsAppsEvaluationDatasets: API.OperationMethod<
  PatchProjectsLocationsAppsEvaluationDatasetsRequest,
  PatchProjectsLocationsAppsEvaluationDatasetsResponse,
  PatchProjectsLocationsAppsEvaluationDatasetsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsAppsEvaluationDatasetsRequest,
  output: PatchProjectsLocationsAppsEvaluationDatasetsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAppsEvaluationDatasetsRequest {
  /** Required. The resource name of the evaluation dataset to delete. */
  name: string;
  /** Optional. The current etag of the evaluation dataset. If an etag is not provided, the deletion will overwrite any concurrent changes. If an etag is provided and does not match the current etag of the evaluation dataset, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
}

export const DeleteProjectsLocationsAppsEvaluationDatasetsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/evaluationDatasets/{evaluationDatasetsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsAppsEvaluationDatasetsRequest>;

export type DeleteProjectsLocationsAppsEvaluationDatasetsResponse = Empty;
export const DeleteProjectsLocationsAppsEvaluationDatasetsResponse = Empty;

export type DeleteProjectsLocationsAppsEvaluationDatasetsError = DefaultErrors;

/** Deletes an evaluation dataset. */
export const deleteProjectsLocationsAppsEvaluationDatasets: API.OperationMethod<
  DeleteProjectsLocationsAppsEvaluationDatasetsRequest,
  DeleteProjectsLocationsAppsEvaluationDatasetsResponse,
  DeleteProjectsLocationsAppsEvaluationDatasetsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsAppsEvaluationDatasetsRequest,
  output: DeleteProjectsLocationsAppsEvaluationDatasetsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAppsEvaluationDatasetsRequest {
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Field to sort by. Only "name" and "create_time", and "update_time" are supported. Time fields are ordered in descending order, and the name field is ordered in ascending order. If not included, "update_time" will be the default. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Required. The resource name of the app to list evaluation datasets from. */
  parent: string;
  /** Optional. Filter to be applied when listing the evaluation datasets. See https://google.aip.dev/160 for more details. */
  filter?: string;
  /** Optional. The next_page_token value returned from a previous list EvaluationService.ListEvaluationDatasets call. */
  pageToken?: string;
}

export const ListProjectsLocationsAppsEvaluationDatasetsRequest = Schema.Struct(
  {
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/evaluationDatasets",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAppsEvaluationDatasetsRequest>;

export type ListProjectsLocationsAppsEvaluationDatasetsResponse =
  ListEvaluationDatasetsResponse;
export const ListProjectsLocationsAppsEvaluationDatasetsResponse =
  ListEvaluationDatasetsResponse;

export type ListProjectsLocationsAppsEvaluationDatasetsError = DefaultErrors;

/** Lists all evaluation datasets in the given app. */
export const listProjectsLocationsAppsEvaluationDatasets: API.PaginatedOperationMethod<
  ListProjectsLocationsAppsEvaluationDatasetsRequest,
  ListProjectsLocationsAppsEvaluationDatasetsResponse,
  ListProjectsLocationsAppsEvaluationDatasetsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsAppsEvaluationDatasetsRequest,
  output: ListProjectsLocationsAppsEvaluationDatasetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAppsEvaluationDatasetsRequest {
  /** Required. The resource name of the evaluation dataset to retrieve. */
  name: string;
}

export const GetProjectsLocationsAppsEvaluationDatasetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/evaluationDatasets/{evaluationDatasetsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAppsEvaluationDatasetsRequest>;

export type GetProjectsLocationsAppsEvaluationDatasetsResponse =
  EvaluationDataset;
export const GetProjectsLocationsAppsEvaluationDatasetsResponse =
  EvaluationDataset;

export type GetProjectsLocationsAppsEvaluationDatasetsError = DefaultErrors;

/** Gets details of the specified evaluation dataset. */
export const getProjectsLocationsAppsEvaluationDatasets: API.OperationMethod<
  GetProjectsLocationsAppsEvaluationDatasetsRequest,
  GetProjectsLocationsAppsEvaluationDatasetsResponse,
  GetProjectsLocationsAppsEvaluationDatasetsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsAppsEvaluationDatasetsRequest,
  output: GetProjectsLocationsAppsEvaluationDatasetsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAppsEvaluationDatasetsRequest {
  /** Required. The app to create the evaluation for. Format: `projects/{project}/locations/{location}/apps/{app}` */
  parent: string;
  /** Optional. The ID to use for the evaluation dataset, which will become the final component of the evaluation dataset's resource name. If not provided, a unique ID will be automatically assigned for the evaluation. */
  evaluationDatasetId?: string;
  /** Request body */
  body?: EvaluationDataset;
}

export const CreateProjectsLocationsAppsEvaluationDatasetsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    evaluationDatasetId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("evaluationDatasetId"),
    ),
    body: Schema.optional(EvaluationDataset).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/evaluationDatasets",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsAppsEvaluationDatasetsRequest>;

export type CreateProjectsLocationsAppsEvaluationDatasetsResponse =
  EvaluationDataset;
export const CreateProjectsLocationsAppsEvaluationDatasetsResponse =
  EvaluationDataset;

export type CreateProjectsLocationsAppsEvaluationDatasetsError = DefaultErrors;

/** Creates an evaluation dataset. */
export const createProjectsLocationsAppsEvaluationDatasets: API.OperationMethod<
  CreateProjectsLocationsAppsEvaluationDatasetsRequest,
  CreateProjectsLocationsAppsEvaluationDatasetsResponse,
  CreateProjectsLocationsAppsEvaluationDatasetsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsAppsEvaluationDatasetsRequest,
  output: CreateProjectsLocationsAppsEvaluationDatasetsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAppsEvaluationExpectationsRequest {
  /** Optional. The current etag of the evaluation expectation. If an etag is not provided, the deletion will overwrite any concurrent changes. If an etag is provided and does not match the current etag of the evaluation expectation, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** Required. The resource name of the evaluation expectation to delete. */
  name: string;
}

export const DeleteProjectsLocationsAppsEvaluationExpectationsRequest =
  Schema.Struct({
    etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/evaluationExpectations/{evaluationExpectationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsAppsEvaluationExpectationsRequest>;

export type DeleteProjectsLocationsAppsEvaluationExpectationsResponse = Empty;
export const DeleteProjectsLocationsAppsEvaluationExpectationsResponse = Empty;

export type DeleteProjectsLocationsAppsEvaluationExpectationsError =
  DefaultErrors;

/** Deletes an evaluation expectation. */
export const deleteProjectsLocationsAppsEvaluationExpectations: API.OperationMethod<
  DeleteProjectsLocationsAppsEvaluationExpectationsRequest,
  DeleteProjectsLocationsAppsEvaluationExpectationsResponse,
  DeleteProjectsLocationsAppsEvaluationExpectationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsAppsEvaluationExpectationsRequest,
  output: DeleteProjectsLocationsAppsEvaluationExpectationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAppsEvaluationExpectationsRequest {
  /** Optional. The next_page_token value returned from a previous list EvaluationService.ListEvaluationExpectations call. */
  pageToken?: string;
  /** Optional. Filter to be applied when listing the evaluation expectations. See https://google.aip.dev/160 for more details. */
  filter?: string;
  /** Optional. Field to sort by. Only "name" and "create_time", and "update_time" are supported. Time fields are ordered in descending order, and the name field is ordered in ascending order. If not included, "update_time" will be the default. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Required. The resource name of the app to list evaluation expectations from. */
  parent: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
}

export const ListProjectsLocationsAppsEvaluationExpectationsRequest =
  Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/evaluationExpectations",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsAppsEvaluationExpectationsRequest>;

export type ListProjectsLocationsAppsEvaluationExpectationsResponse =
  ListEvaluationExpectationsResponse;
export const ListProjectsLocationsAppsEvaluationExpectationsResponse =
  ListEvaluationExpectationsResponse;

export type ListProjectsLocationsAppsEvaluationExpectationsError =
  DefaultErrors;

/** Lists all evaluation expectations in the given app. */
export const listProjectsLocationsAppsEvaluationExpectations: API.PaginatedOperationMethod<
  ListProjectsLocationsAppsEvaluationExpectationsRequest,
  ListProjectsLocationsAppsEvaluationExpectationsResponse,
  ListProjectsLocationsAppsEvaluationExpectationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsAppsEvaluationExpectationsRequest,
  output: ListProjectsLocationsAppsEvaluationExpectationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsLocationsAppsEvaluationExpectationsRequest {
  /** Optional. Field mask is used to control which fields get updated. If the mask is not present, all fields will be updated. */
  updateMask?: string;
  /** Identifier. The unique identifier of this evaluation expectation. Format: `projects/{project}/locations/{location}/apps/{app}/evaluationExpectations/{evaluation_expectation}` */
  name: string;
  /** Request body */
  body?: EvaluationExpectation;
}

export const PatchProjectsLocationsAppsEvaluationExpectationsRequest =
  Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(EvaluationExpectation).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/evaluationExpectations/{evaluationExpectationsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsAppsEvaluationExpectationsRequest>;

export type PatchProjectsLocationsAppsEvaluationExpectationsResponse =
  EvaluationExpectation;
export const PatchProjectsLocationsAppsEvaluationExpectationsResponse =
  EvaluationExpectation;

export type PatchProjectsLocationsAppsEvaluationExpectationsError =
  DefaultErrors;

/** Updates an evaluation expectation. */
export const patchProjectsLocationsAppsEvaluationExpectations: API.OperationMethod<
  PatchProjectsLocationsAppsEvaluationExpectationsRequest,
  PatchProjectsLocationsAppsEvaluationExpectationsResponse,
  PatchProjectsLocationsAppsEvaluationExpectationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsAppsEvaluationExpectationsRequest,
  output: PatchProjectsLocationsAppsEvaluationExpectationsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAppsEvaluationExpectationsRequest {
  /** Optional. The ID to use for the evaluation expectation, which will become the final component of the evaluation expectation's resource name. If not provided, a unique ID will be automatically assigned for the evaluation expectation. */
  evaluationExpectationId?: string;
  /** Required. The app to create the evaluation expectation for. Format: `projects/{project}/locations/{location}/apps/{app}` */
  parent: string;
  /** Request body */
  body?: EvaluationExpectation;
}

export const CreateProjectsLocationsAppsEvaluationExpectationsRequest =
  Schema.Struct({
    evaluationExpectationId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("evaluationExpectationId"),
    ),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(EvaluationExpectation).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/evaluationExpectations",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsAppsEvaluationExpectationsRequest>;

export type CreateProjectsLocationsAppsEvaluationExpectationsResponse =
  EvaluationExpectation;
export const CreateProjectsLocationsAppsEvaluationExpectationsResponse =
  EvaluationExpectation;

export type CreateProjectsLocationsAppsEvaluationExpectationsError =
  DefaultErrors;

/** Creates an evaluation expectation. */
export const createProjectsLocationsAppsEvaluationExpectations: API.OperationMethod<
  CreateProjectsLocationsAppsEvaluationExpectationsRequest,
  CreateProjectsLocationsAppsEvaluationExpectationsResponse,
  CreateProjectsLocationsAppsEvaluationExpectationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsAppsEvaluationExpectationsRequest,
  output: CreateProjectsLocationsAppsEvaluationExpectationsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAppsEvaluationExpectationsRequest {
  /** Required. The resource name of the evaluation expectation to retrieve. */
  name: string;
}

export const GetProjectsLocationsAppsEvaluationExpectationsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/evaluationExpectations/{evaluationExpectationsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsAppsEvaluationExpectationsRequest>;

export type GetProjectsLocationsAppsEvaluationExpectationsResponse =
  EvaluationExpectation;
export const GetProjectsLocationsAppsEvaluationExpectationsResponse =
  EvaluationExpectation;

export type GetProjectsLocationsAppsEvaluationExpectationsError = DefaultErrors;

/** Gets details of the specified evaluation expectation. */
export const getProjectsLocationsAppsEvaluationExpectations: API.OperationMethod<
  GetProjectsLocationsAppsEvaluationExpectationsRequest,
  GetProjectsLocationsAppsEvaluationExpectationsResponse,
  GetProjectsLocationsAppsEvaluationExpectationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsAppsEvaluationExpectationsRequest,
  output: GetProjectsLocationsAppsEvaluationExpectationsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAppsEvaluationsRequest {
  /** Identifier. The unique identifier of this evaluation. Format: `projects/{project}/locations/{location}/apps/{app}/evaluations/{evaluation}` */
  name: string;
  /** Optional. Field mask is used to control which fields get updated. If the mask is not present, all fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: Evaluation;
}

export const PatchProjectsLocationsAppsEvaluationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Evaluation).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/evaluations/{evaluationsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAppsEvaluationsRequest>;

export type PatchProjectsLocationsAppsEvaluationsResponse = Evaluation;
export const PatchProjectsLocationsAppsEvaluationsResponse = Evaluation;

export type PatchProjectsLocationsAppsEvaluationsError = DefaultErrors;

/** Updates an evaluation. */
export const patchProjectsLocationsAppsEvaluations: API.OperationMethod<
  PatchProjectsLocationsAppsEvaluationsRequest,
  PatchProjectsLocationsAppsEvaluationsResponse,
  PatchProjectsLocationsAppsEvaluationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsLocationsAppsEvaluationsRequest,
  output: PatchProjectsLocationsAppsEvaluationsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAppsEvaluationsRequest {
  /** Required. The app to create the evaluation for. Format: `projects/{project}/locations/{location}/apps/{app}` */
  parent: string;
  /** Optional. The ID to use for the evaluation, which will become the final component of the evaluation's resource name. If not provided, a unique ID will be automatically assigned for the evaluation. */
  evaluationId?: string;
  /** Request body */
  body?: Evaluation;
}

export const CreateProjectsLocationsAppsEvaluationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  evaluationId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("evaluationId"),
  ),
  body: Schema.optional(Evaluation).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/evaluations",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAppsEvaluationsRequest>;

export type CreateProjectsLocationsAppsEvaluationsResponse = Evaluation;
export const CreateProjectsLocationsAppsEvaluationsResponse = Evaluation;

export type CreateProjectsLocationsAppsEvaluationsError = DefaultErrors;

/** Creates an evaluation. */
export const createProjectsLocationsAppsEvaluations: API.OperationMethod<
  CreateProjectsLocationsAppsEvaluationsRequest,
  CreateProjectsLocationsAppsEvaluationsResponse,
  CreateProjectsLocationsAppsEvaluationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsLocationsAppsEvaluationsRequest,
  output: CreateProjectsLocationsAppsEvaluationsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAppsEvaluationsRequest {
  /** Required. The resource name of the evaluation to retrieve. */
  name: string;
}

export const GetProjectsLocationsAppsEvaluationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/evaluations/{evaluationsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAppsEvaluationsRequest>;

export type GetProjectsLocationsAppsEvaluationsResponse = Evaluation;
export const GetProjectsLocationsAppsEvaluationsResponse = Evaluation;

export type GetProjectsLocationsAppsEvaluationsError = DefaultErrors;

/** Gets details of the specified evaluation. */
export const getProjectsLocationsAppsEvaluations: API.OperationMethod<
  GetProjectsLocationsAppsEvaluationsRequest,
  GetProjectsLocationsAppsEvaluationsResponse,
  GetProjectsLocationsAppsEvaluationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsAppsEvaluationsRequest,
  output: GetProjectsLocationsAppsEvaluationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAppsEvaluationsRequest {
  /** Optional. Filter to be applied on the evaluation when listing the evaluations. See https://google.aip.dev/160 for more details. Supported fields: evaluation_datasets */
  evaluationFilter?: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Filter string for fields on the associated EvaluationRun resources. See https://google.aip.dev/160 for more details. Supported fields: create_time, initiated_by, app_version_display_name */
  evaluationRunFilter?: string;
  /** Required. The resource name of the app to list evaluations from. */
  parent: string;
  /** Optional. Deprecated: Use evaluation_filter and evaluation_run_filter instead. */
  filter?: string;
  /** Optional. Whether to include the last 10 evaluation results for each evaluation in the response. */
  lastTenResults?: boolean;
  /** Optional. Field to sort by. Only "name" and "create_time", and "update_time" are supported. Time fields are ordered in descending order, and the name field is ordered in ascending order. If not included, "update_time" will be the default. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Optional. The next_page_token value returned from a previous list EvaluationService.ListEvaluations call. */
  pageToken?: string;
}

export const ListProjectsLocationsAppsEvaluationsRequest = Schema.Struct({
  evaluationFilter: Schema.optional(Schema.String).pipe(
    T.HttpQuery("evaluationFilter"),
  ),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  evaluationRunFilter: Schema.optional(Schema.String).pipe(
    T.HttpQuery("evaluationRunFilter"),
  ),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  lastTenResults: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("lastTenResults"),
  ),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/evaluations",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAppsEvaluationsRequest>;

export type ListProjectsLocationsAppsEvaluationsResponse =
  ListEvaluationsResponse;
export const ListProjectsLocationsAppsEvaluationsResponse =
  ListEvaluationsResponse;

export type ListProjectsLocationsAppsEvaluationsError = DefaultErrors;

/** Lists all evaluations in the given app. */
export const listProjectsLocationsAppsEvaluations: API.PaginatedOperationMethod<
  ListProjectsLocationsAppsEvaluationsRequest,
  ListProjectsLocationsAppsEvaluationsResponse,
  ListProjectsLocationsAppsEvaluationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsAppsEvaluationsRequest,
  output: ListProjectsLocationsAppsEvaluationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface UploadEvaluationAudioProjectsLocationsAppsEvaluationsRequest {
  /** Required. The resource name of the Evaluation for which to upload the evaluation audio. Format: `projects/{project}/locations/{location}/apps/{app}/evaluations/{evaluation}` */
  name: string;
  /** Request body */
  body?: UploadEvaluationAudioRequest;
}

export const UploadEvaluationAudioProjectsLocationsAppsEvaluationsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(UploadEvaluationAudioRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/evaluations/{evaluationsId}:uploadEvaluationAudio",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<UploadEvaluationAudioProjectsLocationsAppsEvaluationsRequest>;

export type UploadEvaluationAudioProjectsLocationsAppsEvaluationsResponse =
  UploadEvaluationAudioResponse;
export const UploadEvaluationAudioProjectsLocationsAppsEvaluationsResponse =
  UploadEvaluationAudioResponse;

export type UploadEvaluationAudioProjectsLocationsAppsEvaluationsError =
  DefaultErrors;

/** Uploads audio for use in Golden Evaluations. Stores the audio in the Cloud Storage bucket defined in 'App.logging_settings.evaluation_audio_recording_config.gcs_bucket' and returns a transcript. */
export const uploadEvaluationAudioProjectsLocationsAppsEvaluations: API.OperationMethod<
  UploadEvaluationAudioProjectsLocationsAppsEvaluationsRequest,
  UploadEvaluationAudioProjectsLocationsAppsEvaluationsResponse,
  UploadEvaluationAudioProjectsLocationsAppsEvaluationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UploadEvaluationAudioProjectsLocationsAppsEvaluationsRequest,
  output: UploadEvaluationAudioProjectsLocationsAppsEvaluationsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAppsEvaluationsRequest {
  /** Optional. The current etag of the evaluation. If an etag is not provided, the deletion will overwrite any concurrent changes. If an etag is provided and does not match the current etag of the evaluation, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** Optional. Indicates whether to forcefully delete the evaluation, even if it is still referenced by evaluation datasets. * If `force = false`, the deletion will fail if any datasets still reference the evaluation. * If `force = true`, all existing references from datasets will be removed and the evaluation will be deleted. */
  force?: boolean;
  /** Required. The resource name of the evaluation to delete. */
  name: string;
}

export const DeleteProjectsLocationsAppsEvaluationsRequest = Schema.Struct({
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/evaluations/{evaluationsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAppsEvaluationsRequest>;

export type DeleteProjectsLocationsAppsEvaluationsResponse = Empty;
export const DeleteProjectsLocationsAppsEvaluationsResponse = Empty;

export type DeleteProjectsLocationsAppsEvaluationsError = DefaultErrors;

/** Deletes an evaluation. */
export const deleteProjectsLocationsAppsEvaluations: API.OperationMethod<
  DeleteProjectsLocationsAppsEvaluationsRequest,
  DeleteProjectsLocationsAppsEvaluationsResponse,
  DeleteProjectsLocationsAppsEvaluationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsAppsEvaluationsRequest,
  output: DeleteProjectsLocationsAppsEvaluationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAppsEvaluationsResultsRequest {
  /** Optional. Field to sort by. Only "name" and "create_time", and "update_time" are supported. Time fields are ordered in descending order, and the name field is ordered in ascending order. If not included, "update_time" will be the default. See https://google.aip.dev/132#ordering for more details. */
  orderBy?: string;
  /** Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. */
  pageSize?: number;
  /** Optional. Filter to be applied when listing the evaluation results. See https://google.aip.dev/160 for more details. */
  filter?: string;
  /** Required. The resource name of the evaluation to list evaluation results from. To filter by evaluation run, use `-` as the evaluation ID and specify the evaluation run ID in the filter. For example: `projects/{project}/locations/{location}/apps/{app}/evaluations/-` */
  parent: string;
  /** Optional. The next_page_token value returned from a previous list EvaluationService.ListEvaluationResults call. */
  pageToken?: string;
}

export const ListProjectsLocationsAppsEvaluationsResultsRequest = Schema.Struct(
  {
    orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/evaluations/{evaluationsId}/results",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAppsEvaluationsResultsRequest>;

export type ListProjectsLocationsAppsEvaluationsResultsResponse =
  ListEvaluationResultsResponse;
export const ListProjectsLocationsAppsEvaluationsResultsResponse =
  ListEvaluationResultsResponse;

export type ListProjectsLocationsAppsEvaluationsResultsError = DefaultErrors;

/** Lists all evaluation results for a given evaluation. */
export const listProjectsLocationsAppsEvaluationsResults: API.PaginatedOperationMethod<
  ListProjectsLocationsAppsEvaluationsResultsRequest,
  ListProjectsLocationsAppsEvaluationsResultsResponse,
  ListProjectsLocationsAppsEvaluationsResultsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsAppsEvaluationsResultsRequest,
  output: ListProjectsLocationsAppsEvaluationsResultsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAppsEvaluationsResultsRequest {
  /** Required. The resource name of the evaluation result to retrieve. */
  name: string;
}

export const GetProjectsLocationsAppsEvaluationsResultsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/evaluations/{evaluationsId}/results/{resultsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAppsEvaluationsResultsRequest>;

export type GetProjectsLocationsAppsEvaluationsResultsResponse =
  EvaluationResult;
export const GetProjectsLocationsAppsEvaluationsResultsResponse =
  EvaluationResult;

export type GetProjectsLocationsAppsEvaluationsResultsError = DefaultErrors;

/** Gets details of the specified evaluation result. */
export const getProjectsLocationsAppsEvaluationsResults: API.OperationMethod<
  GetProjectsLocationsAppsEvaluationsResultsRequest,
  GetProjectsLocationsAppsEvaluationsResultsResponse,
  GetProjectsLocationsAppsEvaluationsResultsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsAppsEvaluationsResultsRequest,
  output: GetProjectsLocationsAppsEvaluationsResultsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAppsEvaluationsResultsRequest {
  /** Required. The resource name of the evaluation result to delete. */
  name: string;
}

export const DeleteProjectsLocationsAppsEvaluationsResultsRequest =
  Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta/projects/{projectsId}/locations/{locationsId}/apps/{appsId}/evaluations/{evaluationsId}/results/{resultsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsAppsEvaluationsResultsRequest>;

export type DeleteProjectsLocationsAppsEvaluationsResultsResponse = Empty;
export const DeleteProjectsLocationsAppsEvaluationsResultsResponse = Empty;

export type DeleteProjectsLocationsAppsEvaluationsResultsError = DefaultErrors;

/** Deletes an evaluation result. */
export const deleteProjectsLocationsAppsEvaluationsResults: API.OperationMethod<
  DeleteProjectsLocationsAppsEvaluationsResultsRequest,
  DeleteProjectsLocationsAppsEvaluationsResultsResponse,
  DeleteProjectsLocationsAppsEvaluationsResultsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsAppsEvaluationsResultsRequest,
  output: DeleteProjectsLocationsAppsEvaluationsResultsResponse,
  errors: [],
}));

export interface CancelProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse = Empty;

export type CancelProjectsLocationsOperationsError = DefaultErrors;

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export const cancelProjectsLocationsOperations: API.OperationMethod<
  CancelProjectsLocationsOperationsRequest,
  CancelProjectsLocationsOperationsResponse,
  CancelProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsOperationsRequest>;

export type DeleteProjectsLocationsOperationsResponse = Empty;
export const DeleteProjectsLocationsOperationsResponse = Empty;

export type DeleteProjectsLocationsOperationsError = DefaultErrors;

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export const deleteProjectsLocationsOperations: API.OperationMethod<
  DeleteProjectsLocationsOperationsRequest,
  DeleteProjectsLocationsOperationsResponse,
  DeleteProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsOperationsRequest {
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page token. */
  pageToken?: string;
  /** The standard list page size. */
  pageSize?: number;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("returnPartialSuccess"),
  ),
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/operations",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = ListOperationsResponse;

export type ListProjectsLocationsOperationsError = DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listProjectsLocationsOperations: API.PaginatedOperationMethod<
  ListProjectsLocationsOperationsRequest,
  ListProjectsLocationsOperationsResponse,
  ListProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse = Operation;

export type GetProjectsLocationsOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsLocationsOperations: API.OperationMethod<
  GetProjectsLocationsOperationsRequest,
  GetProjectsLocationsOperationsResponse,
  GetProjectsLocationsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));
