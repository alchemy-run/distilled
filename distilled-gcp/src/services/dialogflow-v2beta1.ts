// ==========================================================================
// Dialogflow API (dialogflow v2beta1)
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
  version: "v2beta1",
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

export interface GoogleCloudDialogflowV2beta1FulfillmentGenericWebService {
  uri?: string;
  username?: string;
  password?: string;
  requestHeaders?: Record<string, string>;
  isCloudFunction?: boolean;
}

export const GoogleCloudDialogflowV2beta1FulfillmentGenericWebService: Schema.Schema<GoogleCloudDialogflowV2beta1FulfillmentGenericWebService> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  username: Schema.optional(Schema.String),
  password: Schema.optional(Schema.String),
  requestHeaders: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  isCloudFunction: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1FulfillmentGenericWebService" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1FulfillmentGenericWebService>;

export interface GoogleCloudDialogflowV2beta1FulfillmentFeature {
  type?: "TYPE_UNSPECIFIED" | "SMALLTALK" | (string & {});
}

export const GoogleCloudDialogflowV2beta1FulfillmentFeature: Schema.Schema<GoogleCloudDialogflowV2beta1FulfillmentFeature> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1FulfillmentFeature" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1FulfillmentFeature>;

export interface GoogleCloudDialogflowV2beta1Fulfillment {
  name?: string;
  displayName?: string;
  genericWebService?: GoogleCloudDialogflowV2beta1FulfillmentGenericWebService;
  enabled?: boolean;
  features?: Array<GoogleCloudDialogflowV2beta1FulfillmentFeature>;
}

export const GoogleCloudDialogflowV2beta1Fulfillment: Schema.Schema<GoogleCloudDialogflowV2beta1Fulfillment> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  genericWebService: Schema.optional(GoogleCloudDialogflowV2beta1FulfillmentGenericWebService),
  enabled: Schema.optional(Schema.Boolean),
  features: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1FulfillmentFeature)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1Fulfillment" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1Fulfillment>;

export interface GoogleCloudDialogflowV2beta1VoiceSelectionParams {
  name?: string;
  ssmlGender?: "SSML_VOICE_GENDER_UNSPECIFIED" | "SSML_VOICE_GENDER_MALE" | "SSML_VOICE_GENDER_FEMALE" | "SSML_VOICE_GENDER_NEUTRAL" | (string & {});
}

export const GoogleCloudDialogflowV2beta1VoiceSelectionParams: Schema.Schema<GoogleCloudDialogflowV2beta1VoiceSelectionParams> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  ssmlGender: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1VoiceSelectionParams" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1VoiceSelectionParams>;

export interface GoogleCloudDialogflowV2beta1CustomPronunciationParams {
  phrase?: string;
  phoneticEncoding?: "PHONETIC_ENCODING_UNSPECIFIED" | "PHONETIC_ENCODING_IPA" | "PHONETIC_ENCODING_X_SAMPA" | (string & {});
  pronunciation?: string;
}

export const GoogleCloudDialogflowV2beta1CustomPronunciationParams: Schema.Schema<GoogleCloudDialogflowV2beta1CustomPronunciationParams> = Schema.suspend(() => Schema.Struct({
  phrase: Schema.optional(Schema.String),
  phoneticEncoding: Schema.optional(Schema.String),
  pronunciation: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1CustomPronunciationParams" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1CustomPronunciationParams>;

export interface GoogleCloudDialogflowV2beta1SynthesizeSpeechConfig {
  speakingRate?: number;
  pitch?: number;
  volumeGainDb?: number;
  effectsProfileId?: Array<string>;
  voice?: GoogleCloudDialogflowV2beta1VoiceSelectionParams;
  pronunciations?: Array<GoogleCloudDialogflowV2beta1CustomPronunciationParams>;
}

export const GoogleCloudDialogflowV2beta1SynthesizeSpeechConfig: Schema.Schema<GoogleCloudDialogflowV2beta1SynthesizeSpeechConfig> = Schema.suspend(() => Schema.Struct({
  speakingRate: Schema.optional(Schema.Number),
  pitch: Schema.optional(Schema.Number),
  volumeGainDb: Schema.optional(Schema.Number),
  effectsProfileId: Schema.optional(Schema.Array(Schema.String)),
  voice: Schema.optional(GoogleCloudDialogflowV2beta1VoiceSelectionParams),
  pronunciations: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1CustomPronunciationParams)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SynthesizeSpeechConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SynthesizeSpeechConfig>;

export interface GoogleCloudDialogflowV2beta1TextToSpeechSettings {
  enableTextToSpeech?: boolean;
  outputAudioEncoding?: "OUTPUT_AUDIO_ENCODING_UNSPECIFIED" | "OUTPUT_AUDIO_ENCODING_LINEAR_16" | "OUTPUT_AUDIO_ENCODING_MP3" | "OUTPUT_AUDIO_ENCODING_MP3_64_KBPS" | "OUTPUT_AUDIO_ENCODING_OGG_OPUS" | "OUTPUT_AUDIO_ENCODING_MULAW" | "OUTPUT_AUDIO_ENCODING_ALAW" | (string & {});
  sampleRateHertz?: number;
  synthesizeSpeechConfigs?: Record<string, GoogleCloudDialogflowV2beta1SynthesizeSpeechConfig>;
}

export const GoogleCloudDialogflowV2beta1TextToSpeechSettings: Schema.Schema<GoogleCloudDialogflowV2beta1TextToSpeechSettings> = Schema.suspend(() => Schema.Struct({
  enableTextToSpeech: Schema.optional(Schema.Boolean),
  outputAudioEncoding: Schema.optional(Schema.String),
  sampleRateHertz: Schema.optional(Schema.Number),
  synthesizeSpeechConfigs: Schema.optional(Schema.Record(Schema.String, GoogleCloudDialogflowV2beta1SynthesizeSpeechConfig)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1TextToSpeechSettings" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1TextToSpeechSettings>;

export interface GoogleCloudDialogflowV2beta1Environment {
  name?: string;
  description?: string;
  agentVersion?: string;
  state?: "STATE_UNSPECIFIED" | "STOPPED" | "LOADING" | "RUNNING" | (string & {});
  updateTime?: string;
  textToSpeechSettings?: GoogleCloudDialogflowV2beta1TextToSpeechSettings;
  fulfillment?: GoogleCloudDialogflowV2beta1Fulfillment;
}

export const GoogleCloudDialogflowV2beta1Environment: Schema.Schema<GoogleCloudDialogflowV2beta1Environment> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  agentVersion: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  textToSpeechSettings: Schema.optional(GoogleCloudDialogflowV2beta1TextToSpeechSettings),
  fulfillment: Schema.optional(GoogleCloudDialogflowV2beta1Fulfillment),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1Environment" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1Environment>;

export interface GoogleCloudDialogflowV2beta1ListEnvironmentsResponse {
  environments?: Array<GoogleCloudDialogflowV2beta1Environment>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowV2beta1ListEnvironmentsResponse: Schema.Schema<GoogleCloudDialogflowV2beta1ListEnvironmentsResponse> = Schema.suspend(() => Schema.Struct({
  environments: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1Environment)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ListEnvironmentsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ListEnvironmentsResponse>;

export interface GoogleCloudDialogflowV2beta1EnvironmentHistoryEntry {
  agentVersion?: string;
  description?: string;
  createTime?: string;
}

export const GoogleCloudDialogflowV2beta1EnvironmentHistoryEntry: Schema.Schema<GoogleCloudDialogflowV2beta1EnvironmentHistoryEntry> = Schema.suspend(() => Schema.Struct({
  agentVersion: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1EnvironmentHistoryEntry" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1EnvironmentHistoryEntry>;

export interface GoogleCloudDialogflowV2beta1EnvironmentHistory {
  parent?: string;
  entries?: Array<GoogleCloudDialogflowV2beta1EnvironmentHistoryEntry>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowV2beta1EnvironmentHistory: Schema.Schema<GoogleCloudDialogflowV2beta1EnvironmentHistory> = Schema.suspend(() => Schema.Struct({
  parent: Schema.optional(Schema.String),
  entries: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1EnvironmentHistoryEntry)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1EnvironmentHistory" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1EnvironmentHistory>;

export interface GoogleCloudDialogflowV2beta1Agent {
  parent?: string;
  displayName?: string;
  defaultLanguageCode?: string;
  supportedLanguageCodes?: Array<string>;
  timeZone?: string;
  description?: string;
  avatarUri?: string;
  enableLogging?: boolean;
  matchMode?: "MATCH_MODE_UNSPECIFIED" | "MATCH_MODE_HYBRID" | "MATCH_MODE_ML_ONLY" | (string & {});
  classificationThreshold?: number;
  apiVersion?: "API_VERSION_UNSPECIFIED" | "API_VERSION_V1" | "API_VERSION_V2" | "API_VERSION_V2_BETA_1" | (string & {});
  tier?: "TIER_UNSPECIFIED" | "TIER_STANDARD" | "TIER_ENTERPRISE" | "TIER_ENTERPRISE_PLUS" | (string & {});
}

export const GoogleCloudDialogflowV2beta1Agent: Schema.Schema<GoogleCloudDialogflowV2beta1Agent> = Schema.suspend(() => Schema.Struct({
  parent: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  defaultLanguageCode: Schema.optional(Schema.String),
  supportedLanguageCodes: Schema.optional(Schema.Array(Schema.String)),
  timeZone: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  avatarUri: Schema.optional(Schema.String),
  enableLogging: Schema.optional(Schema.Boolean),
  matchMode: Schema.optional(Schema.String),
  classificationThreshold: Schema.optional(Schema.Number),
  apiVersion: Schema.optional(Schema.String),
  tier: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1Agent" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1Agent>;

export interface GoogleCloudDialogflowV2beta1SearchAgentsResponse {
  agents?: Array<GoogleCloudDialogflowV2beta1Agent>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowV2beta1SearchAgentsResponse: Schema.Schema<GoogleCloudDialogflowV2beta1SearchAgentsResponse> = Schema.suspend(() => Schema.Struct({
  agents: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1Agent)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SearchAgentsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SearchAgentsResponse>;

export interface GoogleCloudDialogflowV2beta1TrainAgentRequest {
}

export const GoogleCloudDialogflowV2beta1TrainAgentRequest: Schema.Schema<GoogleCloudDialogflowV2beta1TrainAgentRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1TrainAgentRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1TrainAgentRequest>;

export interface GoogleCloudDialogflowV2beta1ExportAgentRequest {
  agentUri?: string;
}

export const GoogleCloudDialogflowV2beta1ExportAgentRequest: Schema.Schema<GoogleCloudDialogflowV2beta1ExportAgentRequest> = Schema.suspend(() => Schema.Struct({
  agentUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ExportAgentRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ExportAgentRequest>;

export interface GoogleCloudDialogflowV2beta1ImportAgentRequest {
  agentUri?: string;
  agentContent?: string;
}

export const GoogleCloudDialogflowV2beta1ImportAgentRequest: Schema.Schema<GoogleCloudDialogflowV2beta1ImportAgentRequest> = Schema.suspend(() => Schema.Struct({
  agentUri: Schema.optional(Schema.String),
  agentContent: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ImportAgentRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ImportAgentRequest>;

export interface GoogleCloudDialogflowV2beta1RestoreAgentRequest {
  agentUri?: string;
  agentContent?: string;
}

export const GoogleCloudDialogflowV2beta1RestoreAgentRequest: Schema.Schema<GoogleCloudDialogflowV2beta1RestoreAgentRequest> = Schema.suspend(() => Schema.Struct({
  agentUri: Schema.optional(Schema.String),
  agentContent: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1RestoreAgentRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1RestoreAgentRequest>;

export interface GoogleCloudDialogflowV2beta1ValidationError {
  severity?: "SEVERITY_UNSPECIFIED" | "INFO" | "WARNING" | "ERROR" | "CRITICAL" | (string & {});
  entries?: Array<string>;
  errorMessage?: string;
}

export const GoogleCloudDialogflowV2beta1ValidationError: Schema.Schema<GoogleCloudDialogflowV2beta1ValidationError> = Schema.suspend(() => Schema.Struct({
  severity: Schema.optional(Schema.String),
  entries: Schema.optional(Schema.Array(Schema.String)),
  errorMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ValidationError" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ValidationError>;

export interface GoogleCloudDialogflowV2beta1ValidationResult {
  validationErrors?: Array<GoogleCloudDialogflowV2beta1ValidationError>;
}

export const GoogleCloudDialogflowV2beta1ValidationResult: Schema.Schema<GoogleCloudDialogflowV2beta1ValidationResult> = Schema.suspend(() => Schema.Struct({
  validationErrors: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1ValidationError)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ValidationResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ValidationResult>;

export interface GoogleCloudDialogflowV2beta1ToolExtensionTool {
  name?: string;
}

export const GoogleCloudDialogflowV2beta1ToolExtensionTool: Schema.Schema<GoogleCloudDialogflowV2beta1ToolExtensionTool> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ToolExtensionTool" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ToolExtensionTool>;

export interface GoogleCloudDialogflowV2beta1ToolFunctionTool {
  inputSchema?: Record<string, unknown>;
  outputSchema?: Record<string, unknown>;
  methodType?: "METHOD_TYPE_UNSPECIFIED" | "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | (string & {});
}

export const GoogleCloudDialogflowV2beta1ToolFunctionTool: Schema.Schema<GoogleCloudDialogflowV2beta1ToolFunctionTool> = Schema.suspend(() => Schema.Struct({
  inputSchema: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  outputSchema: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  methodType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ToolFunctionTool" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ToolFunctionTool>;

export interface GoogleCloudDialogflowV2beta1ToolConnectorToolActionEntityOperation {
  entityId?: string;
  operation?: "OPERATION_TYPE_UNSPECIFIED" | "LIST" | "GET" | "CREATE" | "UPDATE" | "DELETE" | (string & {});
}

export const GoogleCloudDialogflowV2beta1ToolConnectorToolActionEntityOperation: Schema.Schema<GoogleCloudDialogflowV2beta1ToolConnectorToolActionEntityOperation> = Schema.suspend(() => Schema.Struct({
  entityId: Schema.optional(Schema.String),
  operation: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ToolConnectorToolActionEntityOperation" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ToolConnectorToolActionEntityOperation>;

export interface GoogleCloudDialogflowV2beta1ToolConnectorToolAction {
  connectionActionId?: string;
  entityOperation?: GoogleCloudDialogflowV2beta1ToolConnectorToolActionEntityOperation;
  inputFields?: Array<string>;
  outputFields?: Array<string>;
}

export const GoogleCloudDialogflowV2beta1ToolConnectorToolAction: Schema.Schema<GoogleCloudDialogflowV2beta1ToolConnectorToolAction> = Schema.suspend(() => Schema.Struct({
  connectionActionId: Schema.optional(Schema.String),
  entityOperation: Schema.optional(GoogleCloudDialogflowV2beta1ToolConnectorToolActionEntityOperation),
  inputFields: Schema.optional(Schema.Array(Schema.String)),
  outputFields: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ToolConnectorToolAction" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ToolConnectorToolAction>;

export interface GoogleCloudDialogflowV2beta1ToolConnectorTool {
  name?: string;
  actions?: Array<GoogleCloudDialogflowV2beta1ToolConnectorToolAction>;
}

export const GoogleCloudDialogflowV2beta1ToolConnectorTool: Schema.Schema<GoogleCloudDialogflowV2beta1ToolConnectorTool> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  actions: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1ToolConnectorToolAction)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ToolConnectorTool" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ToolConnectorTool>;

export interface GoogleCloudDialogflowV2beta1ToolAuthenticationApiKeyConfig {
  keyName?: string;
  apiKey?: string;
  secretVersionForApiKey?: string;
  requestLocation?: "REQUEST_LOCATION_UNSPECIFIED" | "HEADER" | "QUERY_STRING" | (string & {});
}

export const GoogleCloudDialogflowV2beta1ToolAuthenticationApiKeyConfig: Schema.Schema<GoogleCloudDialogflowV2beta1ToolAuthenticationApiKeyConfig> = Schema.suspend(() => Schema.Struct({
  keyName: Schema.optional(Schema.String),
  apiKey: Schema.optional(Schema.String),
  secretVersionForApiKey: Schema.optional(Schema.String),
  requestLocation: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ToolAuthenticationApiKeyConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ToolAuthenticationApiKeyConfig>;

export interface GoogleCloudDialogflowV2beta1ToolAuthenticationOAuthConfig {
  oauthGrantType?: "OAUTH_GRANT_TYPE_UNSPECIFIED" | "CLIENT_CREDENTIAL" | (string & {});
  clientId?: string;
  clientSecret?: string;
  secretVersionForClientSecret?: string;
  tokenEndpoint?: string;
  scopes?: Array<string>;
}

export const GoogleCloudDialogflowV2beta1ToolAuthenticationOAuthConfig: Schema.Schema<GoogleCloudDialogflowV2beta1ToolAuthenticationOAuthConfig> = Schema.suspend(() => Schema.Struct({
  oauthGrantType: Schema.optional(Schema.String),
  clientId: Schema.optional(Schema.String),
  clientSecret: Schema.optional(Schema.String),
  secretVersionForClientSecret: Schema.optional(Schema.String),
  tokenEndpoint: Schema.optional(Schema.String),
  scopes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ToolAuthenticationOAuthConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ToolAuthenticationOAuthConfig>;

export interface GoogleCloudDialogflowV2beta1ToolAuthenticationServiceAgentAuthConfig {
  serviceAgentAuth?: "SERVICE_AGENT_AUTH_UNSPECIFIED" | "ID_TOKEN" | "ACCESS_TOKEN" | (string & {});
}

export const GoogleCloudDialogflowV2beta1ToolAuthenticationServiceAgentAuthConfig: Schema.Schema<GoogleCloudDialogflowV2beta1ToolAuthenticationServiceAgentAuthConfig> = Schema.suspend(() => Schema.Struct({
  serviceAgentAuth: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ToolAuthenticationServiceAgentAuthConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ToolAuthenticationServiceAgentAuthConfig>;

export interface GoogleCloudDialogflowV2beta1ToolAuthenticationBearerTokenConfig {
  token?: string;
  secretVersionForToken?: string;
}

export const GoogleCloudDialogflowV2beta1ToolAuthenticationBearerTokenConfig: Schema.Schema<GoogleCloudDialogflowV2beta1ToolAuthenticationBearerTokenConfig> = Schema.suspend(() => Schema.Struct({
  token: Schema.optional(Schema.String),
  secretVersionForToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ToolAuthenticationBearerTokenConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ToolAuthenticationBearerTokenConfig>;

export interface GoogleCloudDialogflowV2beta1ToolAuthentication {
  apiKeyConfig?: GoogleCloudDialogflowV2beta1ToolAuthenticationApiKeyConfig;
  oauthConfig?: GoogleCloudDialogflowV2beta1ToolAuthenticationOAuthConfig;
  serviceAgentAuthConfig?: GoogleCloudDialogflowV2beta1ToolAuthenticationServiceAgentAuthConfig;
  bearerTokenConfig?: GoogleCloudDialogflowV2beta1ToolAuthenticationBearerTokenConfig;
}

export const GoogleCloudDialogflowV2beta1ToolAuthentication: Schema.Schema<GoogleCloudDialogflowV2beta1ToolAuthentication> = Schema.suspend(() => Schema.Struct({
  apiKeyConfig: Schema.optional(GoogleCloudDialogflowV2beta1ToolAuthenticationApiKeyConfig),
  oauthConfig: Schema.optional(GoogleCloudDialogflowV2beta1ToolAuthenticationOAuthConfig),
  serviceAgentAuthConfig: Schema.optional(GoogleCloudDialogflowV2beta1ToolAuthenticationServiceAgentAuthConfig),
  bearerTokenConfig: Schema.optional(GoogleCloudDialogflowV2beta1ToolAuthenticationBearerTokenConfig),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ToolAuthentication" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ToolAuthentication>;

export interface GoogleCloudDialogflowV2beta1ToolTLSConfigCACert {
  displayName?: string;
  cert?: string;
}

export const GoogleCloudDialogflowV2beta1ToolTLSConfigCACert: Schema.Schema<GoogleCloudDialogflowV2beta1ToolTLSConfigCACert> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  cert: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ToolTLSConfigCACert" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ToolTLSConfigCACert>;

export interface GoogleCloudDialogflowV2beta1ToolTLSConfig {
  caCerts?: Array<GoogleCloudDialogflowV2beta1ToolTLSConfigCACert>;
}

export const GoogleCloudDialogflowV2beta1ToolTLSConfig: Schema.Schema<GoogleCloudDialogflowV2beta1ToolTLSConfig> = Schema.suspend(() => Schema.Struct({
  caCerts: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1ToolTLSConfigCACert)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ToolTLSConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ToolTLSConfig>;

export interface GoogleCloudDialogflowV2beta1ToolServiceDirectoryConfig {
  service?: string;
}

export const GoogleCloudDialogflowV2beta1ToolServiceDirectoryConfig: Schema.Schema<GoogleCloudDialogflowV2beta1ToolServiceDirectoryConfig> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ToolServiceDirectoryConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ToolServiceDirectoryConfig>;

export interface GoogleCloudDialogflowV2beta1ToolOpenApiTool {
  textSchema?: string;
  authentication?: GoogleCloudDialogflowV2beta1ToolAuthentication;
  tlsConfig?: GoogleCloudDialogflowV2beta1ToolTLSConfig;
  serviceDirectoryConfig?: GoogleCloudDialogflowV2beta1ToolServiceDirectoryConfig;
}

export const GoogleCloudDialogflowV2beta1ToolOpenApiTool: Schema.Schema<GoogleCloudDialogflowV2beta1ToolOpenApiTool> = Schema.suspend(() => Schema.Struct({
  textSchema: Schema.optional(Schema.String),
  authentication: Schema.optional(GoogleCloudDialogflowV2beta1ToolAuthentication),
  tlsConfig: Schema.optional(GoogleCloudDialogflowV2beta1ToolTLSConfig),
  serviceDirectoryConfig: Schema.optional(GoogleCloudDialogflowV2beta1ToolServiceDirectoryConfig),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ToolOpenApiTool" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ToolOpenApiTool>;

export interface GoogleCloudDialogflowV2beta1Tool {
  name?: string;
  toolKey?: string;
  displayName?: string;
  description?: string;
  actionConfirmationRequirement?: Record<string, "CONFIRMATION_REQUIREMENT_UNSPECIFIED" | "REQUIRED" | "NOT_REQUIRED" | (string & {})>;
  extensionSpec?: GoogleCloudDialogflowV2beta1ToolExtensionTool;
  functionSpec?: GoogleCloudDialogflowV2beta1ToolFunctionTool;
  connectorSpec?: GoogleCloudDialogflowV2beta1ToolConnectorTool;
  openApiSpec?: GoogleCloudDialogflowV2beta1ToolOpenApiTool;
  createTime?: string;
  updateTime?: string;
  satisfiesPzs?: boolean;
  satisfiesPzi?: boolean;
}

export const GoogleCloudDialogflowV2beta1Tool: Schema.Schema<GoogleCloudDialogflowV2beta1Tool> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  toolKey: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  actionConfirmationRequirement: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  extensionSpec: Schema.optional(GoogleCloudDialogflowV2beta1ToolExtensionTool),
  functionSpec: Schema.optional(GoogleCloudDialogflowV2beta1ToolFunctionTool),
  connectorSpec: Schema.optional(GoogleCloudDialogflowV2beta1ToolConnectorTool),
  openApiSpec: Schema.optional(GoogleCloudDialogflowV2beta1ToolOpenApiTool),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  satisfiesPzi: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1Tool" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1Tool>;

export interface GoogleCloudDialogflowV2beta1ListToolsResponse {
  tools?: Array<GoogleCloudDialogflowV2beta1Tool>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowV2beta1ListToolsResponse: Schema.Schema<GoogleCloudDialogflowV2beta1ListToolsResponse> = Schema.suspend(() => Schema.Struct({
  tools: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1Tool)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ListToolsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ListToolsResponse>;

export interface GoogleCloudDialogflowV2beta1FreeFormContext {
  text?: string;
}

export const GoogleCloudDialogflowV2beta1FreeFormContext: Schema.Schema<GoogleCloudDialogflowV2beta1FreeFormContext> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1FreeFormContext" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1FreeFormContext>;

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

export interface GoogleCloudDialogflowV2beta1AgentCoachingContext {
  overarchingGuidance?: string;
  instructions?: Array<GoogleCloudDialogflowV2beta1AgentCoachingInstruction>;
  version?: string;
  outputLanguageCode?: string;
}

export const GoogleCloudDialogflowV2beta1AgentCoachingContext: Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingContext> = Schema.suspend(() => Schema.Struct({
  overarchingGuidance: Schema.optional(Schema.String),
  instructions: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1AgentCoachingInstruction)),
  version: Schema.optional(Schema.String),
  outputLanguageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AgentCoachingContext" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentCoachingContext>;

export interface GoogleCloudDialogflowV2beta1SummarizationSection {
  key?: string;
  definition?: string;
  type?: "TYPE_UNSPECIFIED" | "SITUATION" | "ACTION" | "RESOLUTION" | "REASON_FOR_CANCELLATION" | "CUSTOMER_SATISFACTION" | "ENTITIES" | "CUSTOMER_DEFINED" | "SITUATION_CONCISE" | "ACTION_CONCISE" | (string & {});
}

export const GoogleCloudDialogflowV2beta1SummarizationSection: Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationSection> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  definition: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SummarizationSection" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationSection>;

export interface GoogleCloudDialogflowV2beta1MessageEntry {
  role?: "ROLE_UNSPECIFIED" | "HUMAN_AGENT" | "AUTOMATED_AGENT" | "END_USER" | (string & {});
  text?: string;
  languageCode?: string;
  createTime?: string;
}

export const GoogleCloudDialogflowV2beta1MessageEntry: Schema.Schema<GoogleCloudDialogflowV2beta1MessageEntry> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  text: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1MessageEntry" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1MessageEntry>;

export interface GoogleCloudDialogflowV2beta1ConversationContext {
  messageEntries?: Array<GoogleCloudDialogflowV2beta1MessageEntry>;
}

export const GoogleCloudDialogflowV2beta1ConversationContext: Schema.Schema<GoogleCloudDialogflowV2beta1ConversationContext> = Schema.suspend(() => Schema.Struct({
  messageEntries: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1MessageEntry)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ConversationContext" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ConversationContext>;

export interface GoogleCloudDialogflowV2beta1SummarizationSectionList {
  summarizationSections?: Array<GoogleCloudDialogflowV2beta1SummarizationSection>;
}

export const GoogleCloudDialogflowV2beta1SummarizationSectionList: Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationSectionList> = Schema.suspend(() => Schema.Struct({
  summarizationSections: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SummarizationSection)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SummarizationSectionList" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationSectionList>;

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

export interface GoogleCloudDialogflowV2beta1FewShotExample {
  conversationContext?: GoogleCloudDialogflowV2beta1ConversationContext;
  extraInfo?: Record<string, string>;
  summarizationSectionList?: GoogleCloudDialogflowV2beta1SummarizationSectionList;
  output?: GoogleCloudDialogflowV2beta1GeneratorSuggestion;
}

export const GoogleCloudDialogflowV2beta1FewShotExample: Schema.Schema<GoogleCloudDialogflowV2beta1FewShotExample> = Schema.suspend(() => Schema.Struct({
  conversationContext: Schema.optional(GoogleCloudDialogflowV2beta1ConversationContext),
  extraInfo: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  summarizationSectionList: Schema.optional(GoogleCloudDialogflowV2beta1SummarizationSectionList),
  output: Schema.optional(GoogleCloudDialogflowV2beta1GeneratorSuggestion),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1FewShotExample" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1FewShotExample>;

export interface GoogleCloudDialogflowV2beta1SummarizationContext {
  summarizationSections?: Array<GoogleCloudDialogflowV2beta1SummarizationSection>;
  fewShotExamples?: Array<GoogleCloudDialogflowV2beta1FewShotExample>;
  version?: string;
  outputLanguageCode?: string;
}

export const GoogleCloudDialogflowV2beta1SummarizationContext: Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationContext> = Schema.suspend(() => Schema.Struct({
  summarizationSections: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SummarizationSection)),
  fewShotExamples: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1FewShotExample)),
  version: Schema.optional(Schema.String),
  outputLanguageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SummarizationContext" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationContext>;

export interface GoogleCloudDialogflowV2beta1InferenceParameter {
  maxOutputTokens?: number;
  temperature?: number;
  topK?: number;
  topP?: number;
}

export const GoogleCloudDialogflowV2beta1InferenceParameter: Schema.Schema<GoogleCloudDialogflowV2beta1InferenceParameter> = Schema.suspend(() => Schema.Struct({
  maxOutputTokens: Schema.optional(Schema.Number),
  temperature: Schema.optional(Schema.Number),
  topK: Schema.optional(Schema.Number),
  topP: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1InferenceParameter" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1InferenceParameter>;

export interface GoogleCloudDialogflowV2beta1SuggestionDedupingConfig {
  enableDeduping?: boolean;
  similarityThreshold?: number;
}

export const GoogleCloudDialogflowV2beta1SuggestionDedupingConfig: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestionDedupingConfig> = Schema.suspend(() => Schema.Struct({
  enableDeduping: Schema.optional(Schema.Boolean),
  similarityThreshold: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SuggestionDedupingConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestionDedupingConfig>;

export interface GoogleCloudDialogflowV2beta1Generator {
  name?: string;
  description?: string;
  freeFormContext?: GoogleCloudDialogflowV2beta1FreeFormContext;
  agentCoachingContext?: GoogleCloudDialogflowV2beta1AgentCoachingContext;
  summarizationContext?: GoogleCloudDialogflowV2beta1SummarizationContext;
  inferenceParameter?: GoogleCloudDialogflowV2beta1InferenceParameter;
  triggerEvent?: "TRIGGER_EVENT_UNSPECIFIED" | "END_OF_UTTERANCE" | "MANUAL_CALL" | "CUSTOMER_MESSAGE" | "AGENT_MESSAGE" | (string & {});
  publishedModel?: string;
  createTime?: string;
  updateTime?: string;
  tools?: Array<string>;
  suggestionDedupingConfig?: GoogleCloudDialogflowV2beta1SuggestionDedupingConfig;
}

export const GoogleCloudDialogflowV2beta1Generator: Schema.Schema<GoogleCloudDialogflowV2beta1Generator> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  freeFormContext: Schema.optional(GoogleCloudDialogflowV2beta1FreeFormContext),
  agentCoachingContext: Schema.optional(GoogleCloudDialogflowV2beta1AgentCoachingContext),
  summarizationContext: Schema.optional(GoogleCloudDialogflowV2beta1SummarizationContext),
  inferenceParameter: Schema.optional(GoogleCloudDialogflowV2beta1InferenceParameter),
  triggerEvent: Schema.optional(Schema.String),
  publishedModel: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  tools: Schema.optional(Schema.Array(Schema.String)),
  suggestionDedupingConfig: Schema.optional(GoogleCloudDialogflowV2beta1SuggestionDedupingConfig),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1Generator" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1Generator>;

export interface GoogleCloudDialogflowV2beta1ListGeneratorsResponse {
  generators?: Array<GoogleCloudDialogflowV2beta1Generator>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowV2beta1ListGeneratorsResponse: Schema.Schema<GoogleCloudDialogflowV2beta1ListGeneratorsResponse> = Schema.suspend(() => Schema.Struct({
  generators: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1Generator)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ListGeneratorsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ListGeneratorsResponse>;

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

export interface GoogleCloudDialogflowV2beta1ListContextsResponse {
  contexts?: Array<GoogleCloudDialogflowV2beta1Context>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowV2beta1ListContextsResponse: Schema.Schema<GoogleCloudDialogflowV2beta1ListContextsResponse> = Schema.suspend(() => Schema.Struct({
  contexts: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1Context)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ListContextsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ListContextsResponse>;

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

export interface GoogleCloudDialogflowV2beta1ListIntentsResponse {
  intents?: Array<GoogleCloudDialogflowV2beta1Intent>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowV2beta1ListIntentsResponse: Schema.Schema<GoogleCloudDialogflowV2beta1ListIntentsResponse> = Schema.suspend(() => Schema.Struct({
  intents: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1Intent)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ListIntentsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ListIntentsResponse>;

export interface GoogleCloudDialogflowV2beta1IntentBatch {
  intents?: Array<GoogleCloudDialogflowV2beta1Intent>;
}

export const GoogleCloudDialogflowV2beta1IntentBatch: Schema.Schema<GoogleCloudDialogflowV2beta1IntentBatch> = Schema.suspend(() => Schema.Struct({
  intents: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1Intent)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentBatch" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentBatch>;

export interface GoogleCloudDialogflowV2beta1BatchUpdateIntentsRequest {
  intentBatchUri?: string;
  intentBatchInline?: GoogleCloudDialogflowV2beta1IntentBatch;
  languageCode?: string;
  updateMask?: string;
  intentView?: "INTENT_VIEW_UNSPECIFIED" | "INTENT_VIEW_FULL" | (string & {});
}

export const GoogleCloudDialogflowV2beta1BatchUpdateIntentsRequest: Schema.Schema<GoogleCloudDialogflowV2beta1BatchUpdateIntentsRequest> = Schema.suspend(() => Schema.Struct({
  intentBatchUri: Schema.optional(Schema.String),
  intentBatchInline: Schema.optional(GoogleCloudDialogflowV2beta1IntentBatch),
  languageCode: Schema.optional(Schema.String),
  updateMask: Schema.optional(Schema.String),
  intentView: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1BatchUpdateIntentsRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1BatchUpdateIntentsRequest>;

export interface GoogleCloudDialogflowV2beta1BatchDeleteIntentsRequest {
  intents?: Array<GoogleCloudDialogflowV2beta1Intent>;
}

export const GoogleCloudDialogflowV2beta1BatchDeleteIntentsRequest: Schema.Schema<GoogleCloudDialogflowV2beta1BatchDeleteIntentsRequest> = Schema.suspend(() => Schema.Struct({
  intents: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1Intent)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1BatchDeleteIntentsRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1BatchDeleteIntentsRequest>;

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

export interface GoogleCloudDialogflowV2beta1ListEntityTypesResponse {
  entityTypes?: Array<GoogleCloudDialogflowV2beta1EntityType>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowV2beta1ListEntityTypesResponse: Schema.Schema<GoogleCloudDialogflowV2beta1ListEntityTypesResponse> = Schema.suspend(() => Schema.Struct({
  entityTypes: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1EntityType)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ListEntityTypesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ListEntityTypesResponse>;

export interface GoogleCloudDialogflowV2beta1EntityTypeBatch {
  entityTypes?: Array<GoogleCloudDialogflowV2beta1EntityType>;
}

export const GoogleCloudDialogflowV2beta1EntityTypeBatch: Schema.Schema<GoogleCloudDialogflowV2beta1EntityTypeBatch> = Schema.suspend(() => Schema.Struct({
  entityTypes: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1EntityType)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1EntityTypeBatch" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1EntityTypeBatch>;

export interface GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesRequest {
  entityTypeBatchUri?: string;
  entityTypeBatchInline?: GoogleCloudDialogflowV2beta1EntityTypeBatch;
  languageCode?: string;
  updateMask?: string;
}

export const GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesRequest: Schema.Schema<GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesRequest> = Schema.suspend(() => Schema.Struct({
  entityTypeBatchUri: Schema.optional(Schema.String),
  entityTypeBatchInline: Schema.optional(GoogleCloudDialogflowV2beta1EntityTypeBatch),
  languageCode: Schema.optional(Schema.String),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesRequest>;

export interface GoogleCloudDialogflowV2beta1BatchDeleteEntityTypesRequest {
  entityTypeNames?: Array<string>;
}

export const GoogleCloudDialogflowV2beta1BatchDeleteEntityTypesRequest: Schema.Schema<GoogleCloudDialogflowV2beta1BatchDeleteEntityTypesRequest> = Schema.suspend(() => Schema.Struct({
  entityTypeNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1BatchDeleteEntityTypesRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1BatchDeleteEntityTypesRequest>;

export interface GoogleCloudDialogflowV2beta1BatchCreateEntitiesRequest {
  entities?: Array<GoogleCloudDialogflowV2beta1EntityTypeEntity>;
  languageCode?: string;
}

export const GoogleCloudDialogflowV2beta1BatchCreateEntitiesRequest: Schema.Schema<GoogleCloudDialogflowV2beta1BatchCreateEntitiesRequest> = Schema.suspend(() => Schema.Struct({
  entities: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1EntityTypeEntity)),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1BatchCreateEntitiesRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1BatchCreateEntitiesRequest>;

export interface GoogleCloudDialogflowV2beta1BatchUpdateEntitiesRequest {
  entities?: Array<GoogleCloudDialogflowV2beta1EntityTypeEntity>;
  languageCode?: string;
  updateMask?: string;
}

export const GoogleCloudDialogflowV2beta1BatchUpdateEntitiesRequest: Schema.Schema<GoogleCloudDialogflowV2beta1BatchUpdateEntitiesRequest> = Schema.suspend(() => Schema.Struct({
  entities: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1EntityTypeEntity)),
  languageCode: Schema.optional(Schema.String),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1BatchUpdateEntitiesRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1BatchUpdateEntitiesRequest>;

export interface GoogleCloudDialogflowV2beta1BatchDeleteEntitiesRequest {
  entityValues?: Array<string>;
  languageCode?: string;
}

export const GoogleCloudDialogflowV2beta1BatchDeleteEntitiesRequest: Schema.Schema<GoogleCloudDialogflowV2beta1BatchDeleteEntitiesRequest> = Schema.suspend(() => Schema.Struct({
  entityValues: Schema.optional(Schema.Array(Schema.String)),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1BatchDeleteEntitiesRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1BatchDeleteEntitiesRequest>;

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

export interface GoogleCloudDialogflowV2beta1ListSessionEntityTypesResponse {
  sessionEntityTypes?: Array<GoogleCloudDialogflowV2beta1SessionEntityType>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowV2beta1ListSessionEntityTypesResponse: Schema.Schema<GoogleCloudDialogflowV2beta1ListSessionEntityTypesResponse> = Schema.suspend(() => Schema.Struct({
  sessionEntityTypes: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SessionEntityType)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ListSessionEntityTypesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ListSessionEntityTypesResponse>;

export interface GoogleTypeLatLng {
  latitude?: number;
  longitude?: number;
}

export const GoogleTypeLatLng: Schema.Schema<GoogleTypeLatLng> = Schema.suspend(() => Schema.Struct({
  latitude: Schema.optional(Schema.Number),
  longitude: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleTypeLatLng" }) as any as Schema.Schema<GoogleTypeLatLng>;

export interface GoogleCloudDialogflowV2beta1SentimentAnalysisRequestConfig {
  analyzeQueryTextSentiment?: boolean;
}

export const GoogleCloudDialogflowV2beta1SentimentAnalysisRequestConfig: Schema.Schema<GoogleCloudDialogflowV2beta1SentimentAnalysisRequestConfig> = Schema.suspend(() => Schema.Struct({
  analyzeQueryTextSentiment: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SentimentAnalysisRequestConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SentimentAnalysisRequestConfig>;

export interface GoogleCloudDialogflowV2beta1SubAgent {
  project?: string;
  environment?: string;
}

export const GoogleCloudDialogflowV2beta1SubAgent: Schema.Schema<GoogleCloudDialogflowV2beta1SubAgent> = Schema.suspend(() => Schema.Struct({
  project: Schema.optional(Schema.String),
  environment: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SubAgent" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SubAgent>;

export interface GoogleCloudDialogflowV2beta1QueryParameters {
  timeZone?: string;
  geoLocation?: GoogleTypeLatLng;
  contexts?: Array<GoogleCloudDialogflowV2beta1Context>;
  resetContexts?: boolean;
  sessionEntityTypes?: Array<GoogleCloudDialogflowV2beta1SessionEntityType>;
  payload?: Record<string, unknown>;
  knowledgeBaseNames?: Array<string>;
  sentimentAnalysisRequestConfig?: GoogleCloudDialogflowV2beta1SentimentAnalysisRequestConfig;
  subAgents?: Array<GoogleCloudDialogflowV2beta1SubAgent>;
  webhookHeaders?: Record<string, string>;
  platform?: string;
}

export const GoogleCloudDialogflowV2beta1QueryParameters: Schema.Schema<GoogleCloudDialogflowV2beta1QueryParameters> = Schema.suspend(() => Schema.Struct({
  timeZone: Schema.optional(Schema.String),
  geoLocation: Schema.optional(GoogleTypeLatLng),
  contexts: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1Context)),
  resetContexts: Schema.optional(Schema.Boolean),
  sessionEntityTypes: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SessionEntityType)),
  payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  knowledgeBaseNames: Schema.optional(Schema.Array(Schema.String)),
  sentimentAnalysisRequestConfig: Schema.optional(GoogleCloudDialogflowV2beta1SentimentAnalysisRequestConfig),
  subAgents: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SubAgent)),
  webhookHeaders: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  platform: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1QueryParameters" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1QueryParameters>;

export interface GoogleCloudDialogflowV2beta1SpeechContext {
  phrases?: Array<string>;
  boost?: number;
}

export const GoogleCloudDialogflowV2beta1SpeechContext: Schema.Schema<GoogleCloudDialogflowV2beta1SpeechContext> = Schema.suspend(() => Schema.Struct({
  phrases: Schema.optional(Schema.Array(Schema.String)),
  boost: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SpeechContext" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SpeechContext>;

export interface GoogleCloudDialogflowV2beta1BargeInConfig {
  noBargeInDuration?: string;
  totalDuration?: string;
}

export const GoogleCloudDialogflowV2beta1BargeInConfig: Schema.Schema<GoogleCloudDialogflowV2beta1BargeInConfig> = Schema.suspend(() => Schema.Struct({
  noBargeInDuration: Schema.optional(Schema.String),
  totalDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1BargeInConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1BargeInConfig>;

export interface GoogleCloudDialogflowV2beta1InputAudioConfig {
  audioEncoding?: "AUDIO_ENCODING_UNSPECIFIED" | "AUDIO_ENCODING_LINEAR_16" | "AUDIO_ENCODING_FLAC" | "AUDIO_ENCODING_MULAW" | "AUDIO_ENCODING_AMR" | "AUDIO_ENCODING_AMR_WB" | "AUDIO_ENCODING_OGG_OPUS" | "AUDIO_ENCODING_SPEEX_WITH_HEADER_BYTE" | "AUDIO_ENCODING_ALAW" | (string & {});
  sampleRateHertz?: number;
  languageCode?: string;
  enableWordInfo?: boolean;
  phraseHints?: Array<string>;
  speechContexts?: Array<GoogleCloudDialogflowV2beta1SpeechContext>;
  model?: string;
  modelVariant?: "SPEECH_MODEL_VARIANT_UNSPECIFIED" | "USE_BEST_AVAILABLE" | "USE_STANDARD" | "USE_ENHANCED" | (string & {});
  singleUtterance?: boolean;
  disableNoSpeechRecognizedEvent?: boolean;
  bargeInConfig?: GoogleCloudDialogflowV2beta1BargeInConfig;
  enableAutomaticPunctuation?: boolean;
  defaultNoSpeechTimeout?: string;
  phraseSets?: Array<string>;
  optOutConformerModelMigration?: boolean;
}

export const GoogleCloudDialogflowV2beta1InputAudioConfig: Schema.Schema<GoogleCloudDialogflowV2beta1InputAudioConfig> = Schema.suspend(() => Schema.Struct({
  audioEncoding: Schema.optional(Schema.String),
  sampleRateHertz: Schema.optional(Schema.Number),
  languageCode: Schema.optional(Schema.String),
  enableWordInfo: Schema.optional(Schema.Boolean),
  phraseHints: Schema.optional(Schema.Array(Schema.String)),
  speechContexts: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SpeechContext)),
  model: Schema.optional(Schema.String),
  modelVariant: Schema.optional(Schema.String),
  singleUtterance: Schema.optional(Schema.Boolean),
  disableNoSpeechRecognizedEvent: Schema.optional(Schema.Boolean),
  bargeInConfig: Schema.optional(GoogleCloudDialogflowV2beta1BargeInConfig),
  enableAutomaticPunctuation: Schema.optional(Schema.Boolean),
  defaultNoSpeechTimeout: Schema.optional(Schema.String),
  phraseSets: Schema.optional(Schema.Array(Schema.String)),
  optOutConformerModelMigration: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1InputAudioConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1InputAudioConfig>;

export interface GoogleCloudDialogflowV2beta1TextInput {
  text?: string;
  languageCode?: string;
}

export const GoogleCloudDialogflowV2beta1TextInput: Schema.Schema<GoogleCloudDialogflowV2beta1TextInput> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1TextInput" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1TextInput>;

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

export interface GoogleCloudDialogflowV2beta1TelephonyDtmfEvents {
  dtmfEvents?: Array<"TELEPHONY_DTMF_UNSPECIFIED" | "DTMF_ONE" | "DTMF_TWO" | "DTMF_THREE" | "DTMF_FOUR" | "DTMF_FIVE" | "DTMF_SIX" | "DTMF_SEVEN" | "DTMF_EIGHT" | "DTMF_NINE" | "DTMF_ZERO" | "DTMF_A" | "DTMF_B" | "DTMF_C" | "DTMF_D" | "DTMF_STAR" | "DTMF_POUND" | (string & {})>;
}

export const GoogleCloudDialogflowV2beta1TelephonyDtmfEvents: Schema.Schema<GoogleCloudDialogflowV2beta1TelephonyDtmfEvents> = Schema.suspend(() => Schema.Struct({
  dtmfEvents: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1TelephonyDtmfEvents" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1TelephonyDtmfEvents>;

export interface GoogleCloudDialogflowV2beta1QueryInput {
  audioConfig?: GoogleCloudDialogflowV2beta1InputAudioConfig;
  text?: GoogleCloudDialogflowV2beta1TextInput;
  event?: GoogleCloudDialogflowV2beta1EventInput;
  dtmf?: GoogleCloudDialogflowV2beta1TelephonyDtmfEvents;
}

export const GoogleCloudDialogflowV2beta1QueryInput: Schema.Schema<GoogleCloudDialogflowV2beta1QueryInput> = Schema.suspend(() => Schema.Struct({
  audioConfig: Schema.optional(GoogleCloudDialogflowV2beta1InputAudioConfig),
  text: Schema.optional(GoogleCloudDialogflowV2beta1TextInput),
  event: Schema.optional(GoogleCloudDialogflowV2beta1EventInput),
  dtmf: Schema.optional(GoogleCloudDialogflowV2beta1TelephonyDtmfEvents),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1QueryInput" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1QueryInput>;

export interface GoogleCloudDialogflowV2beta1OutputAudioConfig {
  audioEncoding?: "OUTPUT_AUDIO_ENCODING_UNSPECIFIED" | "OUTPUT_AUDIO_ENCODING_LINEAR_16" | "OUTPUT_AUDIO_ENCODING_MP3" | "OUTPUT_AUDIO_ENCODING_MP3_64_KBPS" | "OUTPUT_AUDIO_ENCODING_OGG_OPUS" | "OUTPUT_AUDIO_ENCODING_MULAW" | "OUTPUT_AUDIO_ENCODING_ALAW" | (string & {});
  sampleRateHertz?: number;
  synthesizeSpeechConfig?: GoogleCloudDialogflowV2beta1SynthesizeSpeechConfig;
}

export const GoogleCloudDialogflowV2beta1OutputAudioConfig: Schema.Schema<GoogleCloudDialogflowV2beta1OutputAudioConfig> = Schema.suspend(() => Schema.Struct({
  audioEncoding: Schema.optional(Schema.String),
  sampleRateHertz: Schema.optional(Schema.Number),
  synthesizeSpeechConfig: Schema.optional(GoogleCloudDialogflowV2beta1SynthesizeSpeechConfig),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1OutputAudioConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1OutputAudioConfig>;

export interface GoogleCloudDialogflowV2beta1DetectIntentRequest {
  queryParams?: GoogleCloudDialogflowV2beta1QueryParameters;
  queryInput?: GoogleCloudDialogflowV2beta1QueryInput;
  outputAudioConfig?: GoogleCloudDialogflowV2beta1OutputAudioConfig;
  outputAudioConfigMask?: string;
  inputAudio?: string;
}

export const GoogleCloudDialogflowV2beta1DetectIntentRequest: Schema.Schema<GoogleCloudDialogflowV2beta1DetectIntentRequest> = Schema.suspend(() => Schema.Struct({
  queryParams: Schema.optional(GoogleCloudDialogflowV2beta1QueryParameters),
  queryInput: Schema.optional(GoogleCloudDialogflowV2beta1QueryInput),
  outputAudioConfig: Schema.optional(GoogleCloudDialogflowV2beta1OutputAudioConfig),
  outputAudioConfigMask: Schema.optional(Schema.String),
  inputAudio: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1DetectIntentRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1DetectIntentRequest>;

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

export interface GoogleCloudDialogflowV2beta1DetectIntentResponse {
  responseId?: string;
  queryResult?: GoogleCloudDialogflowV2beta1QueryResult;
  alternativeQueryResults?: Array<GoogleCloudDialogflowV2beta1QueryResult>;
  webhookStatus?: GoogleRpcStatus;
  outputAudio?: string;
  outputAudioConfig?: GoogleCloudDialogflowV2beta1OutputAudioConfig;
}

export const GoogleCloudDialogflowV2beta1DetectIntentResponse: Schema.Schema<GoogleCloudDialogflowV2beta1DetectIntentResponse> = Schema.suspend(() => Schema.Struct({
  responseId: Schema.optional(Schema.String),
  queryResult: Schema.optional(GoogleCloudDialogflowV2beta1QueryResult),
  alternativeQueryResults: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1QueryResult)),
  webhookStatus: Schema.optional(GoogleRpcStatus),
  outputAudio: Schema.optional(Schema.String),
  outputAudioConfig: Schema.optional(GoogleCloudDialogflowV2beta1OutputAudioConfig),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1DetectIntentResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1DetectIntentResponse>;

export interface GoogleCloudDialogflowV2beta1Participant {
  name?: string;
  role?: "ROLE_UNSPECIFIED" | "HUMAN_AGENT" | "AUTOMATED_AGENT" | "END_USER" | (string & {});
  obfuscatedExternalUserId?: string;
  documentsMetadataFilters?: Record<string, string>;
  agentDesktopSource?: "AGENT_DESKTOP_SOURCE_UNSPECIFIED" | "LIVE_PERSON" | "GENESYS_CLOUD" | "TWILIO" | "SALESFORCE" | "OTHER" | (string & {});
}

export const GoogleCloudDialogflowV2beta1Participant: Schema.Schema<GoogleCloudDialogflowV2beta1Participant> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  role: Schema.optional(Schema.String),
  obfuscatedExternalUserId: Schema.optional(Schema.String),
  documentsMetadataFilters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  agentDesktopSource: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1Participant" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1Participant>;

export interface GoogleCloudDialogflowV2beta1ListParticipantsResponse {
  participants?: Array<GoogleCloudDialogflowV2beta1Participant>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowV2beta1ListParticipantsResponse: Schema.Schema<GoogleCloudDialogflowV2beta1ListParticipantsResponse> = Schema.suspend(() => Schema.Struct({
  participants: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1Participant)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ListParticipantsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ListParticipantsResponse>;

export interface GoogleCloudDialogflowV2beta1AudioInput {
  config?: GoogleCloudDialogflowV2beta1InputAudioConfig;
  audio?: string;
}

export const GoogleCloudDialogflowV2beta1AudioInput: Schema.Schema<GoogleCloudDialogflowV2beta1AudioInput> = Schema.suspend(() => Schema.Struct({
  config: Schema.optional(GoogleCloudDialogflowV2beta1InputAudioConfig),
  audio: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AudioInput" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AudioInput>;

export interface GoogleCloudDialogflowV2beta1IntentInput {
  intent?: string;
  languageCode?: string;
}

export const GoogleCloudDialogflowV2beta1IntentInput: Schema.Schema<GoogleCloudDialogflowV2beta1IntentInput> = Schema.suspend(() => Schema.Struct({
  intent: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IntentInput" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IntentInput>;

export interface GoogleCloudDialogflowV2beta1SuggestionInput {
  answerRecord?: string;
  textOverride?: GoogleCloudDialogflowV2beta1TextInput;
  parameters?: Record<string, unknown>;
  action?: "ACTION_UNSPECIFIED" | "CANCEL" | "REVISE" | "CONFIRM" | (string & {});
  intentInput?: GoogleCloudDialogflowV2beta1IntentInput;
  sendTime?: string;
}

export const GoogleCloudDialogflowV2beta1SuggestionInput: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestionInput> = Schema.suspend(() => Schema.Struct({
  answerRecord: Schema.optional(Schema.String),
  textOverride: Schema.optional(GoogleCloudDialogflowV2beta1TextInput),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  action: Schema.optional(Schema.String),
  intentInput: Schema.optional(GoogleCloudDialogflowV2beta1IntentInput),
  sendTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SuggestionInput" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestionInput>;

export interface GoogleCloudDialogflowV2beta1AssistQueryParameters {
  documentsMetadataFilters?: Record<string, string>;
}

export const GoogleCloudDialogflowV2beta1AssistQueryParameters: Schema.Schema<GoogleCloudDialogflowV2beta1AssistQueryParameters> = Schema.suspend(() => Schema.Struct({
  documentsMetadataFilters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AssistQueryParameters" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AssistQueryParameters>;

export interface GoogleCloudDialogflowV2beta1AnalyzeContentRequest {
  textInput?: GoogleCloudDialogflowV2beta1TextInput;
  audioInput?: GoogleCloudDialogflowV2beta1AudioInput;
  eventInput?: GoogleCloudDialogflowV2beta1EventInput;
  suggestionInput?: GoogleCloudDialogflowV2beta1SuggestionInput;
  intentInput?: GoogleCloudDialogflowV2beta1IntentInput;
  replyAudioConfig?: GoogleCloudDialogflowV2beta1OutputAudioConfig;
  queryParams?: GoogleCloudDialogflowV2beta1QueryParameters;
  assistQueryParams?: GoogleCloudDialogflowV2beta1AssistQueryParameters;
  cxParameters?: Record<string, unknown>;
  cxCurrentPage?: string;
  messageSendTime?: string;
  requestId?: string;
}

export const GoogleCloudDialogflowV2beta1AnalyzeContentRequest: Schema.Schema<GoogleCloudDialogflowV2beta1AnalyzeContentRequest> = Schema.suspend(() => Schema.Struct({
  textInput: Schema.optional(GoogleCloudDialogflowV2beta1TextInput),
  audioInput: Schema.optional(GoogleCloudDialogflowV2beta1AudioInput),
  eventInput: Schema.optional(GoogleCloudDialogflowV2beta1EventInput),
  suggestionInput: Schema.optional(GoogleCloudDialogflowV2beta1SuggestionInput),
  intentInput: Schema.optional(GoogleCloudDialogflowV2beta1IntentInput),
  replyAudioConfig: Schema.optional(GoogleCloudDialogflowV2beta1OutputAudioConfig),
  queryParams: Schema.optional(GoogleCloudDialogflowV2beta1QueryParameters),
  assistQueryParams: Schema.optional(GoogleCloudDialogflowV2beta1AssistQueryParameters),
  cxParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  cxCurrentPage: Schema.optional(Schema.String),
  messageSendTime: Schema.optional(Schema.String),
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AnalyzeContentRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AnalyzeContentRequest>;

export interface GoogleCloudDialogflowV2beta1OutputAudio {
  config?: GoogleCloudDialogflowV2beta1OutputAudioConfig;
  audio?: string;
}

export const GoogleCloudDialogflowV2beta1OutputAudio: Schema.Schema<GoogleCloudDialogflowV2beta1OutputAudio> = Schema.suspend(() => Schema.Struct({
  config: Schema.optional(GoogleCloudDialogflowV2beta1OutputAudioConfig),
  audio: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1OutputAudio" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1OutputAudio>;

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

export interface GoogleCloudDialogflowV2beta1AutomatedAgentReply {
  detectIntentResponse?: GoogleCloudDialogflowV2beta1DetectIntentResponse;
  responseMessages?: Array<GoogleCloudDialogflowV2beta1ResponseMessage>;
  intent?: string;
  event?: string;
  matchConfidence?: number;
  parameters?: Record<string, unknown>;
  cxSessionParameters?: Record<string, unknown>;
  automatedAgentReplyType?: "AUTOMATED_AGENT_REPLY_TYPE_UNSPECIFIED" | "PARTIAL" | "FINAL" | (string & {});
  allowCancellation?: boolean;
  cxCurrentPage?: string;
  callCompanionAuthCode?: string;
}

export const GoogleCloudDialogflowV2beta1AutomatedAgentReply: Schema.Schema<GoogleCloudDialogflowV2beta1AutomatedAgentReply> = Schema.suspend(() => Schema.Struct({
  detectIntentResponse: Schema.optional(GoogleCloudDialogflowV2beta1DetectIntentResponse),
  responseMessages: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1ResponseMessage)),
  intent: Schema.optional(Schema.String),
  event: Schema.optional(Schema.String),
  matchConfidence: Schema.optional(Schema.Number),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  cxSessionParameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  automatedAgentReplyType: Schema.optional(Schema.String),
  allowCancellation: Schema.optional(Schema.Boolean),
  cxCurrentPage: Schema.optional(Schema.String),
  callCompanionAuthCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AutomatedAgentReply" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AutomatedAgentReply>;

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

export interface GoogleCloudDialogflowV2beta1DtmfParameters {
  acceptsDtmfInput?: boolean;
}

export const GoogleCloudDialogflowV2beta1DtmfParameters: Schema.Schema<GoogleCloudDialogflowV2beta1DtmfParameters> = Schema.suspend(() => Schema.Struct({
  acceptsDtmfInput: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1DtmfParameters" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1DtmfParameters>;

export interface GoogleCloudDialogflowV2beta1AnalyzeContentResponse {
  replyText?: string;
  replyAudio?: GoogleCloudDialogflowV2beta1OutputAudio;
  automatedAgentReply?: GoogleCloudDialogflowV2beta1AutomatedAgentReply;
  message?: GoogleCloudDialogflowV2beta1Message;
  humanAgentSuggestionResults?: Array<GoogleCloudDialogflowV2beta1SuggestionResult>;
  endUserSuggestionResults?: Array<GoogleCloudDialogflowV2beta1SuggestionResult>;
  dtmfParameters?: GoogleCloudDialogflowV2beta1DtmfParameters;
}

export const GoogleCloudDialogflowV2beta1AnalyzeContentResponse: Schema.Schema<GoogleCloudDialogflowV2beta1AnalyzeContentResponse> = Schema.suspend(() => Schema.Struct({
  replyText: Schema.optional(Schema.String),
  replyAudio: Schema.optional(GoogleCloudDialogflowV2beta1OutputAudio),
  automatedAgentReply: Schema.optional(GoogleCloudDialogflowV2beta1AutomatedAgentReply),
  message: Schema.optional(GoogleCloudDialogflowV2beta1Message),
  humanAgentSuggestionResults: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SuggestionResult)),
  endUserSuggestionResults: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SuggestionResult)),
  dtmfParameters: Schema.optional(GoogleCloudDialogflowV2beta1DtmfParameters),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AnalyzeContentResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AnalyzeContentResponse>;

export interface GoogleCloudDialogflowV2beta1SuggestArticlesRequest {
  latestMessage?: string;
  contextSize?: number;
  assistQueryParams?: GoogleCloudDialogflowV2beta1AssistQueryParameters;
}

export const GoogleCloudDialogflowV2beta1SuggestArticlesRequest: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestArticlesRequest> = Schema.suspend(() => Schema.Struct({
  latestMessage: Schema.optional(Schema.String),
  contextSize: Schema.optional(Schema.Number),
  assistQueryParams: Schema.optional(GoogleCloudDialogflowV2beta1AssistQueryParameters),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SuggestArticlesRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestArticlesRequest>;

export interface GoogleCloudDialogflowV2beta1SuggestFaqAnswersRequest {
  latestMessage?: string;
  contextSize?: number;
  assistQueryParams?: GoogleCloudDialogflowV2beta1AssistQueryParameters;
}

export const GoogleCloudDialogflowV2beta1SuggestFaqAnswersRequest: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestFaqAnswersRequest> = Schema.suspend(() => Schema.Struct({
  latestMessage: Schema.optional(Schema.String),
  contextSize: Schema.optional(Schema.Number),
  assistQueryParams: Schema.optional(GoogleCloudDialogflowV2beta1AssistQueryParameters),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SuggestFaqAnswersRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestFaqAnswersRequest>;

export interface GoogleCloudDialogflowV2beta1SuggestSmartRepliesRequest {
  currentTextInput?: GoogleCloudDialogflowV2beta1TextInput;
  latestMessage?: string;
  contextSize?: number;
}

export const GoogleCloudDialogflowV2beta1SuggestSmartRepliesRequest: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestSmartRepliesRequest> = Schema.suspend(() => Schema.Struct({
  currentTextInput: Schema.optional(GoogleCloudDialogflowV2beta1TextInput),
  latestMessage: Schema.optional(Schema.String),
  contextSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SuggestSmartRepliesRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestSmartRepliesRequest>;

export interface GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistRequest {
  latestMessage?: string;
  contextSize?: number;
  previousSuggestedQuery?: string;
}

export const GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistRequest: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistRequest> = Schema.suspend(() => Schema.Struct({
  latestMessage: Schema.optional(Schema.String),
  contextSize: Schema.optional(Schema.Number),
  previousSuggestedQuery: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistRequest>;

export interface GoogleCloudDialogflowV2beta1SuggestionArticle {
  title?: string;
  uri?: string;
  snippets?: Array<string>;
  metadata?: Record<string, string>;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2beta1SuggestionArticle: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestionArticle> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  snippets: Schema.optional(Schema.Array(Schema.String)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  answerRecord: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SuggestionArticle" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestionArticle>;

export interface GoogleCloudDialogflowV2beta1SuggestionFaqAnswer {
  answer?: string;
  confidence?: number;
  question?: string;
  source?: string;
  metadata?: Record<string, string>;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2beta1SuggestionFaqAnswer: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestionFaqAnswer> = Schema.suspend(() => Schema.Struct({
  answer: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  question: Schema.optional(Schema.String),
  source: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  answerRecord: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SuggestionFaqAnswer" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestionFaqAnswer>;

export interface GoogleCloudDialogflowV2beta1Suggestion {
  name?: string;
  articles?: Array<GoogleCloudDialogflowV2beta1SuggestionArticle>;
  faqAnswers?: Array<GoogleCloudDialogflowV2beta1SuggestionFaqAnswer>;
  createTime?: string;
  latestMessage?: string;
}

export const GoogleCloudDialogflowV2beta1Suggestion: Schema.Schema<GoogleCloudDialogflowV2beta1Suggestion> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  articles: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SuggestionArticle)),
  faqAnswers: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SuggestionFaqAnswer)),
  createTime: Schema.optional(Schema.String),
  latestMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1Suggestion" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1Suggestion>;

export interface GoogleCloudDialogflowV2beta1ListSuggestionsResponse {
  suggestions?: Array<GoogleCloudDialogflowV2beta1Suggestion>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowV2beta1ListSuggestionsResponse: Schema.Schema<GoogleCloudDialogflowV2beta1ListSuggestionsResponse> = Schema.suspend(() => Schema.Struct({
  suggestions: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1Suggestion)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ListSuggestionsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ListSuggestionsResponse>;

export interface GoogleCloudDialogflowV2beta1CompileSuggestionRequest {
  latestMessage?: string;
  contextSize?: number;
}

export const GoogleCloudDialogflowV2beta1CompileSuggestionRequest: Schema.Schema<GoogleCloudDialogflowV2beta1CompileSuggestionRequest> = Schema.suspend(() => Schema.Struct({
  latestMessage: Schema.optional(Schema.String),
  contextSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1CompileSuggestionRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1CompileSuggestionRequest>;

export interface GoogleCloudDialogflowV2beta1CompileSuggestionResponse {
  suggestion?: GoogleCloudDialogflowV2beta1Suggestion;
  latestMessage?: string;
  contextSize?: number;
}

export const GoogleCloudDialogflowV2beta1CompileSuggestionResponse: Schema.Schema<GoogleCloudDialogflowV2beta1CompileSuggestionResponse> = Schema.suspend(() => Schema.Struct({
  suggestion: Schema.optional(GoogleCloudDialogflowV2beta1Suggestion),
  latestMessage: Schema.optional(Schema.String),
  contextSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1CompileSuggestionResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1CompileSuggestionResponse>;

export interface GoogleCloudDialogflowV2beta1AgentAssistantFeedbackSummarizationFeedback {
  startTimestamp?: string;
  submitTimestamp?: string;
  summaryText?: string;
  textSections?: Record<string, string>;
}

export const GoogleCloudDialogflowV2beta1AgentAssistantFeedbackSummarizationFeedback: Schema.Schema<GoogleCloudDialogflowV2beta1AgentAssistantFeedbackSummarizationFeedback> = Schema.suspend(() => Schema.Struct({
  startTimestamp: Schema.optional(Schema.String),
  submitTimestamp: Schema.optional(Schema.String),
  summaryText: Schema.optional(Schema.String),
  textSections: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AgentAssistantFeedbackSummarizationFeedback" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentAssistantFeedbackSummarizationFeedback>;

export interface GoogleCloudDialogflowV2beta1AgentAssistantFeedbackKnowledgeSearchFeedback {
  answerCopied?: boolean;
  clickedUris?: Array<string>;
}

export const GoogleCloudDialogflowV2beta1AgentAssistantFeedbackKnowledgeSearchFeedback: Schema.Schema<GoogleCloudDialogflowV2beta1AgentAssistantFeedbackKnowledgeSearchFeedback> = Schema.suspend(() => Schema.Struct({
  answerCopied: Schema.optional(Schema.Boolean),
  clickedUris: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AgentAssistantFeedbackKnowledgeSearchFeedback" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentAssistantFeedbackKnowledgeSearchFeedback>;

export interface GoogleCloudDialogflowV2beta1AgentAssistantFeedbackKnowledgeAssistFeedback {
  answerCopied?: boolean;
  clickedUris?: Array<string>;
}

export const GoogleCloudDialogflowV2beta1AgentAssistantFeedbackKnowledgeAssistFeedback: Schema.Schema<GoogleCloudDialogflowV2beta1AgentAssistantFeedbackKnowledgeAssistFeedback> = Schema.suspend(() => Schema.Struct({
  answerCopied: Schema.optional(Schema.Boolean),
  clickedUris: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AgentAssistantFeedbackKnowledgeAssistFeedback" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentAssistantFeedbackKnowledgeAssistFeedback>;

export interface GoogleCloudDialogflowV2beta1AgentAssistantFeedback {
  answerRelevance?: "ANSWER_RELEVANCE_UNSPECIFIED" | "IRRELEVANT" | "RELEVANT" | (string & {});
  documentCorrectness?: "DOCUMENT_CORRECTNESS_UNSPECIFIED" | "INCORRECT" | "CORRECT" | (string & {});
  documentEfficiency?: "DOCUMENT_EFFICIENCY_UNSPECIFIED" | "INEFFICIENT" | "EFFICIENT" | (string & {});
  summarizationFeedback?: GoogleCloudDialogflowV2beta1AgentAssistantFeedbackSummarizationFeedback;
  knowledgeSearchFeedback?: GoogleCloudDialogflowV2beta1AgentAssistantFeedbackKnowledgeSearchFeedback;
  knowledgeAssistFeedback?: GoogleCloudDialogflowV2beta1AgentAssistantFeedbackKnowledgeAssistFeedback;
}

export const GoogleCloudDialogflowV2beta1AgentAssistantFeedback: Schema.Schema<GoogleCloudDialogflowV2beta1AgentAssistantFeedback> = Schema.suspend(() => Schema.Struct({
  answerRelevance: Schema.optional(Schema.String),
  documentCorrectness: Schema.optional(Schema.String),
  documentEfficiency: Schema.optional(Schema.String),
  summarizationFeedback: Schema.optional(GoogleCloudDialogflowV2beta1AgentAssistantFeedbackSummarizationFeedback),
  knowledgeSearchFeedback: Schema.optional(GoogleCloudDialogflowV2beta1AgentAssistantFeedbackKnowledgeSearchFeedback),
  knowledgeAssistFeedback: Schema.optional(GoogleCloudDialogflowV2beta1AgentAssistantFeedbackKnowledgeAssistFeedback),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AgentAssistantFeedback" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentAssistantFeedback>;

export interface GoogleCloudDialogflowV2beta1AnswerFeedback {
  correctnessLevel?: "CORRECTNESS_LEVEL_UNSPECIFIED" | "NOT_CORRECT" | "PARTIALLY_CORRECT" | "FULLY_CORRECT" | (string & {});
  agentAssistantDetailFeedback?: GoogleCloudDialogflowV2beta1AgentAssistantFeedback;
  clicked?: boolean;
  clickTime?: string;
  displayed?: boolean;
  displayTime?: string;
}

export const GoogleCloudDialogflowV2beta1AnswerFeedback: Schema.Schema<GoogleCloudDialogflowV2beta1AnswerFeedback> = Schema.suspend(() => Schema.Struct({
  correctnessLevel: Schema.optional(Schema.String),
  agentAssistantDetailFeedback: Schema.optional(GoogleCloudDialogflowV2beta1AgentAssistantFeedback),
  clicked: Schema.optional(Schema.Boolean),
  clickTime: Schema.optional(Schema.String),
  displayed: Schema.optional(Schema.Boolean),
  displayTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AnswerFeedback" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AnswerFeedback>;

export interface GoogleCloudDialogflowV2beta1AgentAssistantRecord {
  articleSuggestionAnswer?: GoogleCloudDialogflowV2beta1ArticleAnswer;
  faqAnswer?: GoogleCloudDialogflowV2beta1FaqAnswer;
  dialogflowAssistAnswer?: GoogleCloudDialogflowV2beta1DialogflowAssistAnswer;
  generatorSuggestion?: GoogleCloudDialogflowV2beta1GeneratorSuggestion;
}

export const GoogleCloudDialogflowV2beta1AgentAssistantRecord: Schema.Schema<GoogleCloudDialogflowV2beta1AgentAssistantRecord> = Schema.suspend(() => Schema.Struct({
  articleSuggestionAnswer: Schema.optional(GoogleCloudDialogflowV2beta1ArticleAnswer),
  faqAnswer: Schema.optional(GoogleCloudDialogflowV2beta1FaqAnswer),
  dialogflowAssistAnswer: Schema.optional(GoogleCloudDialogflowV2beta1DialogflowAssistAnswer),
  generatorSuggestion: Schema.optional(GoogleCloudDialogflowV2beta1GeneratorSuggestion),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AgentAssistantRecord" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AgentAssistantRecord>;

export interface GoogleCloudDialogflowV2beta1AnswerRecord {
  name?: string;
  answerFeedback?: GoogleCloudDialogflowV2beta1AnswerFeedback;
  agentAssistantRecord?: GoogleCloudDialogflowV2beta1AgentAssistantRecord;
}

export const GoogleCloudDialogflowV2beta1AnswerRecord: Schema.Schema<GoogleCloudDialogflowV2beta1AnswerRecord> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  answerFeedback: Schema.optional(GoogleCloudDialogflowV2beta1AnswerFeedback),
  agentAssistantRecord: Schema.optional(GoogleCloudDialogflowV2beta1AgentAssistantRecord),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AnswerRecord" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AnswerRecord>;

export interface GoogleCloudDialogflowV2beta1ListAnswerRecordsResponse {
  answerRecords?: Array<GoogleCloudDialogflowV2beta1AnswerRecord>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowV2beta1ListAnswerRecordsResponse: Schema.Schema<GoogleCloudDialogflowV2beta1ListAnswerRecordsResponse> = Schema.suspend(() => Schema.Struct({
  answerRecords: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1AnswerRecord)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ListAnswerRecordsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ListAnswerRecordsResponse>;

export interface GoogleCloudDialogflowV2beta1DocumentReloadStatus {
  time?: string;
  status?: GoogleRpcStatus;
}

export const GoogleCloudDialogflowV2beta1DocumentReloadStatus: Schema.Schema<GoogleCloudDialogflowV2beta1DocumentReloadStatus> = Schema.suspend(() => Schema.Struct({
  time: Schema.optional(Schema.String),
  status: Schema.optional(GoogleRpcStatus),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1DocumentReloadStatus" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1DocumentReloadStatus>;

export interface GoogleCloudDialogflowV2beta1Document {
  name?: string;
  displayName?: string;
  mimeType?: string;
  knowledgeTypes?: Array<"KNOWLEDGE_TYPE_UNSPECIFIED" | "FAQ" | "EXTRACTIVE_QA" | "ARTICLE_SUGGESTION" | "AGENT_FACING_SMART_REPLY" | "SMART_REPLY" | (string & {})>;
  contentUri?: string;
  content?: string;
  rawContent?: string;
  enableAutoReload?: boolean;
  latestReloadStatus?: GoogleCloudDialogflowV2beta1DocumentReloadStatus;
  metadata?: Record<string, string>;
  state?: "STATE_UNSPECIFIED" | "CREATING" | "ACTIVE" | "UPDATING" | "RELOADING" | "DELETING" | (string & {});
}

export const GoogleCloudDialogflowV2beta1Document: Schema.Schema<GoogleCloudDialogflowV2beta1Document> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  mimeType: Schema.optional(Schema.String),
  knowledgeTypes: Schema.optional(Schema.Array(Schema.String)),
  contentUri: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
  rawContent: Schema.optional(Schema.String),
  enableAutoReload: Schema.optional(Schema.Boolean),
  latestReloadStatus: Schema.optional(GoogleCloudDialogflowV2beta1DocumentReloadStatus),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1Document" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1Document>;

export interface GoogleCloudDialogflowV2beta1ListDocumentsResponse {
  documents?: Array<GoogleCloudDialogflowV2beta1Document>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowV2beta1ListDocumentsResponse: Schema.Schema<GoogleCloudDialogflowV2beta1ListDocumentsResponse> = Schema.suspend(() => Schema.Struct({
  documents: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1Document)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ListDocumentsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ListDocumentsResponse>;

export interface GoogleCloudDialogflowV2beta1GcsSources {
  uris?: Array<string>;
}

export const GoogleCloudDialogflowV2beta1GcsSources: Schema.Schema<GoogleCloudDialogflowV2beta1GcsSources> = Schema.suspend(() => Schema.Struct({
  uris: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1GcsSources" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1GcsSources>;

export interface GoogleCloudDialogflowV2beta1ImportDocumentTemplate {
  mimeType?: string;
  knowledgeTypes?: Array<"KNOWLEDGE_TYPE_UNSPECIFIED" | "FAQ" | "EXTRACTIVE_QA" | "ARTICLE_SUGGESTION" | "AGENT_FACING_SMART_REPLY" | "SMART_REPLY" | (string & {})>;
  metadata?: Record<string, string>;
}

export const GoogleCloudDialogflowV2beta1ImportDocumentTemplate: Schema.Schema<GoogleCloudDialogflowV2beta1ImportDocumentTemplate> = Schema.suspend(() => Schema.Struct({
  mimeType: Schema.optional(Schema.String),
  knowledgeTypes: Schema.optional(Schema.Array(Schema.String)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ImportDocumentTemplate" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ImportDocumentTemplate>;

export interface GoogleCloudDialogflowV2beta1ImportDocumentsRequest {
  gcsSource?: GoogleCloudDialogflowV2beta1GcsSources;
  documentTemplate?: GoogleCloudDialogflowV2beta1ImportDocumentTemplate;
  importGcsCustomMetadata?: boolean;
}

export const GoogleCloudDialogflowV2beta1ImportDocumentsRequest: Schema.Schema<GoogleCloudDialogflowV2beta1ImportDocumentsRequest> = Schema.suspend(() => Schema.Struct({
  gcsSource: Schema.optional(GoogleCloudDialogflowV2beta1GcsSources),
  documentTemplate: Schema.optional(GoogleCloudDialogflowV2beta1ImportDocumentTemplate),
  importGcsCustomMetadata: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ImportDocumentsRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ImportDocumentsRequest>;

export interface GoogleCloudDialogflowV2beta1GcsSource {
  uri?: string;
}

export const GoogleCloudDialogflowV2beta1GcsSource: Schema.Schema<GoogleCloudDialogflowV2beta1GcsSource> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1GcsSource" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1GcsSource>;

export interface GoogleCloudDialogflowV2beta1ReloadDocumentRequest {
  gcsSource?: GoogleCloudDialogflowV2beta1GcsSource;
  importGcsCustomMetadata?: boolean;
}

export const GoogleCloudDialogflowV2beta1ReloadDocumentRequest: Schema.Schema<GoogleCloudDialogflowV2beta1ReloadDocumentRequest> = Schema.suspend(() => Schema.Struct({
  gcsSource: Schema.optional(GoogleCloudDialogflowV2beta1GcsSource),
  importGcsCustomMetadata: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ReloadDocumentRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ReloadDocumentRequest>;

export interface GoogleCloudDialogflowV2beta1AutomatedAgentConfig {
  agent?: string;
  sessionTtl?: string;
}

export const GoogleCloudDialogflowV2beta1AutomatedAgentConfig: Schema.Schema<GoogleCloudDialogflowV2beta1AutomatedAgentConfig> = Schema.suspend(() => Schema.Struct({
  agent: Schema.optional(Schema.String),
  sessionTtl: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1AutomatedAgentConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1AutomatedAgentConfig>;

export interface GoogleCloudDialogflowV2beta1NotificationConfig {
  topic?: string;
  messageFormat?: "MESSAGE_FORMAT_UNSPECIFIED" | "PROTO" | "JSON" | (string & {});
}

export const GoogleCloudDialogflowV2beta1NotificationConfig: Schema.Schema<GoogleCloudDialogflowV2beta1NotificationConfig> = Schema.suspend(() => Schema.Struct({
  topic: Schema.optional(Schema.String),
  messageFormat: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1NotificationConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1NotificationConfig>;

export interface GoogleCloudDialogflowV2beta1SuggestionFeature {
  type?: "TYPE_UNSPECIFIED" | "ARTICLE_SUGGESTION" | "FAQ" | "SMART_REPLY" | "DIALOGFLOW_ASSIST" | "CONVERSATION_SUMMARIZATION" | "KNOWLEDGE_SEARCH" | "KNOWLEDGE_ASSIST" | (string & {});
}

export const GoogleCloudDialogflowV2beta1SuggestionFeature: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestionFeature> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SuggestionFeature" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestionFeature>;

export interface GoogleCloudDialogflowV2beta1RaiSettingsRaiCategoryConfig {
  category?: "RAI_CATEGORY_UNSPECIFIED" | "DANGEROUS_CONTENT" | "SEXUALLY_EXPLICIT" | "HARASSMENT" | "HATE_SPEECH" | (string & {});
  sensitivityLevel?: "SENSITIVITY_LEVEL_UNSPECIFIED" | "BLOCK_MOST" | "BLOCK_SOME" | "BLOCK_FEW" | "BLOCK_NONE" | (string & {});
}

export const GoogleCloudDialogflowV2beta1RaiSettingsRaiCategoryConfig: Schema.Schema<GoogleCloudDialogflowV2beta1RaiSettingsRaiCategoryConfig> = Schema.suspend(() => Schema.Struct({
  category: Schema.optional(Schema.String),
  sensitivityLevel: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1RaiSettingsRaiCategoryConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1RaiSettingsRaiCategoryConfig>;

export interface GoogleCloudDialogflowV2beta1RaiSettings {
  raiCategoryConfigs?: Array<GoogleCloudDialogflowV2beta1RaiSettingsRaiCategoryConfig>;
}

export const GoogleCloudDialogflowV2beta1RaiSettings: Schema.Schema<GoogleCloudDialogflowV2beta1RaiSettings> = Schema.suspend(() => Schema.Struct({
  raiCategoryConfigs: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1RaiSettingsRaiCategoryConfig)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1RaiSettings" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1RaiSettings>;

export interface GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionTriggerSettings {
  noSmallTalk?: boolean;
  onlyEndUser?: boolean;
}

export const GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionTriggerSettings: Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionTriggerSettings> = Schema.suspend(() => Schema.Struct({
  noSmallTalk: Schema.optional(Schema.Boolean),
  onlyEndUser: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionTriggerSettings" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionTriggerSettings>;

export interface GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigKnowledgeBaseQuerySource {
  knowledgeBases?: Array<string>;
}

export const GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigKnowledgeBaseQuerySource: Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigKnowledgeBaseQuerySource> = Schema.suspend(() => Schema.Struct({
  knowledgeBases: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigKnowledgeBaseQuerySource" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigKnowledgeBaseQuerySource>;

export interface GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigDocumentQuerySource {
  documents?: Array<string>;
}

export const GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigDocumentQuerySource: Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigDocumentQuerySource> = Schema.suspend(() => Schema.Struct({
  documents: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigDocumentQuerySource" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigDocumentQuerySource>;

export interface GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigDialogflowQuerySourceHumanAgentSideConfig {
  agent?: string;
}

export const GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigDialogflowQuerySourceHumanAgentSideConfig: Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigDialogflowQuerySourceHumanAgentSideConfig> = Schema.suspend(() => Schema.Struct({
  agent: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigDialogflowQuerySourceHumanAgentSideConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigDialogflowQuerySourceHumanAgentSideConfig>;

export interface GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigDialogflowQuerySource {
  agent?: string;
  humanAgentSideConfig?: GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigDialogflowQuerySourceHumanAgentSideConfig;
}

export const GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigDialogflowQuerySource: Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigDialogflowQuerySource> = Schema.suspend(() => Schema.Struct({
  agent: Schema.optional(Schema.String),
  humanAgentSideConfig: Schema.optional(GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigDialogflowQuerySourceHumanAgentSideConfig),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigDialogflowQuerySource" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigDialogflowQuerySource>;

export interface GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigContextFilterSettings {
  dropHandoffMessages?: boolean;
  dropVirtualAgentMessages?: boolean;
  dropIvrMessages?: boolean;
}

export const GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigContextFilterSettings: Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigContextFilterSettings> = Schema.suspend(() => Schema.Struct({
  dropHandoffMessages: Schema.optional(Schema.Boolean),
  dropVirtualAgentMessages: Schema.optional(Schema.Boolean),
  dropIvrMessages: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigContextFilterSettings" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigContextFilterSettings>;

export interface GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigSections {
  sectionTypes?: Array<"SECTION_TYPE_UNSPECIFIED" | "SITUATION" | "ACTION" | "RESOLUTION" | "REASON_FOR_CANCELLATION" | "CUSTOMER_SATISFACTION" | "ENTITIES" | (string & {})>;
}

export const GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigSections: Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigSections> = Schema.suspend(() => Schema.Struct({
  sectionTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigSections" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigSections>;

export interface GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfig {
  knowledgeBaseQuerySource?: GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigKnowledgeBaseQuerySource;
  documentQuerySource?: GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigDocumentQuerySource;
  dialogflowQuerySource?: GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigDialogflowQuerySource;
  maxResults?: number;
  confidenceThreshold?: number;
  contextFilterSettings?: GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigContextFilterSettings;
  sections?: GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigSections;
  contextSize?: number;
}

export const GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfig: Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfig> = Schema.suspend(() => Schema.Struct({
  knowledgeBaseQuerySource: Schema.optional(GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigKnowledgeBaseQuerySource),
  documentQuerySource: Schema.optional(GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigDocumentQuerySource),
  dialogflowQuerySource: Schema.optional(GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigDialogflowQuerySource),
  maxResults: Schema.optional(Schema.Number),
  confidenceThreshold: Schema.optional(Schema.Number),
  contextFilterSettings: Schema.optional(GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigContextFilterSettings),
  sections: Schema.optional(GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfigSections),
  contextSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfig>;

export interface GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigConversationModelConfig {
  model?: string;
  baselineModelVersion?: string;
}

export const GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigConversationModelConfig: Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigConversationModelConfig> = Schema.suspend(() => Schema.Struct({
  model: Schema.optional(Schema.String),
  baselineModelVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigConversationModelConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigConversationModelConfig>;

export interface GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigConversationProcessConfig {
  recentSentencesCount?: number;
}

export const GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigConversationProcessConfig: Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigConversationProcessConfig> = Schema.suspend(() => Schema.Struct({
  recentSentencesCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigConversationProcessConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigConversationProcessConfig>;

export interface GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionFeatureConfig {
  suggestionFeature?: GoogleCloudDialogflowV2beta1SuggestionFeature;
  enableEventBasedSuggestion?: boolean;
  disableAgentQueryLogging?: boolean;
  enableQuerySuggestionWhenNoAnswer?: boolean;
  enableConversationAugmentedQuery?: boolean;
  enableQuerySuggestionOnly?: boolean;
  enableResponseDebugInfo?: boolean;
  raiSettings?: GoogleCloudDialogflowV2beta1RaiSettings;
  suggestionTriggerSettings?: GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionTriggerSettings;
  queryConfig?: GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfig;
  conversationModelConfig?: GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigConversationModelConfig;
  conversationProcessConfig?: GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigConversationProcessConfig;
}

export const GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionFeatureConfig: Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionFeatureConfig> = Schema.suspend(() => Schema.Struct({
  suggestionFeature: Schema.optional(GoogleCloudDialogflowV2beta1SuggestionFeature),
  enableEventBasedSuggestion: Schema.optional(Schema.Boolean),
  disableAgentQueryLogging: Schema.optional(Schema.Boolean),
  enableQuerySuggestionWhenNoAnswer: Schema.optional(Schema.Boolean),
  enableConversationAugmentedQuery: Schema.optional(Schema.Boolean),
  enableQuerySuggestionOnly: Schema.optional(Schema.Boolean),
  enableResponseDebugInfo: Schema.optional(Schema.Boolean),
  raiSettings: Schema.optional(GoogleCloudDialogflowV2beta1RaiSettings),
  suggestionTriggerSettings: Schema.optional(GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionTriggerSettings),
  queryConfig: Schema.optional(GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionQueryConfig),
  conversationModelConfig: Schema.optional(GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigConversationModelConfig),
  conversationProcessConfig: Schema.optional(GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigConversationProcessConfig),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionFeatureConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionFeatureConfig>;

export interface GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionConfig {
  featureConfigs?: Array<GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionFeatureConfig>;
  groupSuggestionResponses?: boolean;
  generators?: Array<string>;
  disableHighLatencyFeaturesSyncDelivery?: boolean;
  skipEmptyEventBasedSuggestion?: boolean;
  useUnredactedConversationData?: boolean;
  enableAsyncToolCall?: boolean;
}

export const GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionConfig: Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionConfig> = Schema.suspend(() => Schema.Struct({
  featureConfigs: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionFeatureConfig)),
  groupSuggestionResponses: Schema.optional(Schema.Boolean),
  generators: Schema.optional(Schema.Array(Schema.String)),
  disableHighLatencyFeaturesSyncDelivery: Schema.optional(Schema.Boolean),
  skipEmptyEventBasedSuggestion: Schema.optional(Schema.Boolean),
  useUnredactedConversationData: Schema.optional(Schema.Boolean),
  enableAsyncToolCall: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionConfig>;

export interface GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigMessageAnalysisConfig {
  enableEntityExtraction?: boolean;
  enableSentimentAnalysis?: boolean;
  enableSentimentAnalysisV3?: boolean;
}

export const GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigMessageAnalysisConfig: Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigMessageAnalysisConfig> = Schema.suspend(() => Schema.Struct({
  enableEntityExtraction: Schema.optional(Schema.Boolean),
  enableSentimentAnalysis: Schema.optional(Schema.Boolean),
  enableSentimentAnalysisV3: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigMessageAnalysisConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigMessageAnalysisConfig>;

export interface GoogleCloudDialogflowV2beta1HumanAgentAssistantConfig {
  notificationConfig?: GoogleCloudDialogflowV2beta1NotificationConfig;
  humanAgentSuggestionConfig?: GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionConfig;
  endUserSuggestionConfig?: GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionConfig;
  messageAnalysisConfig?: GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigMessageAnalysisConfig;
}

export const GoogleCloudDialogflowV2beta1HumanAgentAssistantConfig: Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantConfig> = Schema.suspend(() => Schema.Struct({
  notificationConfig: Schema.optional(GoogleCloudDialogflowV2beta1NotificationConfig),
  humanAgentSuggestionConfig: Schema.optional(GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionConfig),
  endUserSuggestionConfig: Schema.optional(GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionConfig),
  messageAnalysisConfig: Schema.optional(GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigMessageAnalysisConfig),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1HumanAgentAssistantConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentAssistantConfig>;

export interface GoogleCloudDialogflowV2beta1HumanAgentHandoffConfigLivePersonConfig {
  accountNumber?: string;
}

export const GoogleCloudDialogflowV2beta1HumanAgentHandoffConfigLivePersonConfig: Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentHandoffConfigLivePersonConfig> = Schema.suspend(() => Schema.Struct({
  accountNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1HumanAgentHandoffConfigLivePersonConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentHandoffConfigLivePersonConfig>;

export interface GoogleCloudDialogflowV2beta1HumanAgentHandoffConfigSalesforceLiveAgentConfig {
  organizationId?: string;
  deploymentId?: string;
  buttonId?: string;
  endpointDomain?: string;
}

export const GoogleCloudDialogflowV2beta1HumanAgentHandoffConfigSalesforceLiveAgentConfig: Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentHandoffConfigSalesforceLiveAgentConfig> = Schema.suspend(() => Schema.Struct({
  organizationId: Schema.optional(Schema.String),
  deploymentId: Schema.optional(Schema.String),
  buttonId: Schema.optional(Schema.String),
  endpointDomain: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1HumanAgentHandoffConfigSalesforceLiveAgentConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentHandoffConfigSalesforceLiveAgentConfig>;

export interface GoogleCloudDialogflowV2beta1HumanAgentHandoffConfig {
  livePersonConfig?: GoogleCloudDialogflowV2beta1HumanAgentHandoffConfigLivePersonConfig;
  salesforceLiveAgentConfig?: GoogleCloudDialogflowV2beta1HumanAgentHandoffConfigSalesforceLiveAgentConfig;
}

export const GoogleCloudDialogflowV2beta1HumanAgentHandoffConfig: Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentHandoffConfig> = Schema.suspend(() => Schema.Struct({
  livePersonConfig: Schema.optional(GoogleCloudDialogflowV2beta1HumanAgentHandoffConfigLivePersonConfig),
  salesforceLiveAgentConfig: Schema.optional(GoogleCloudDialogflowV2beta1HumanAgentHandoffConfigSalesforceLiveAgentConfig),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1HumanAgentHandoffConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1HumanAgentHandoffConfig>;

export interface GoogleCloudDialogflowV2beta1LoggingConfig {
  enableStackdriverLogging?: boolean;
}

export const GoogleCloudDialogflowV2beta1LoggingConfig: Schema.Schema<GoogleCloudDialogflowV2beta1LoggingConfig> = Schema.suspend(() => Schema.Struct({
  enableStackdriverLogging: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1LoggingConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1LoggingConfig>;

export interface GoogleCloudDialogflowV2beta1SpeechToTextConfig {
  speechModelVariant?: "SPEECH_MODEL_VARIANT_UNSPECIFIED" | "USE_BEST_AVAILABLE" | "USE_STANDARD" | "USE_ENHANCED" | (string & {});
  model?: string;
  phraseSets?: Array<string>;
  audioEncoding?: "AUDIO_ENCODING_UNSPECIFIED" | "AUDIO_ENCODING_LINEAR_16" | "AUDIO_ENCODING_FLAC" | "AUDIO_ENCODING_MULAW" | "AUDIO_ENCODING_AMR" | "AUDIO_ENCODING_AMR_WB" | "AUDIO_ENCODING_OGG_OPUS" | "AUDIO_ENCODING_SPEEX_WITH_HEADER_BYTE" | "AUDIO_ENCODING_ALAW" | (string & {});
  sampleRateHertz?: number;
  languageCode?: string;
  enableWordInfo?: boolean;
  useTimeoutBasedEndpointing?: boolean;
}

export const GoogleCloudDialogflowV2beta1SpeechToTextConfig: Schema.Schema<GoogleCloudDialogflowV2beta1SpeechToTextConfig> = Schema.suspend(() => Schema.Struct({
  speechModelVariant: Schema.optional(Schema.String),
  model: Schema.optional(Schema.String),
  phraseSets: Schema.optional(Schema.Array(Schema.String)),
  audioEncoding: Schema.optional(Schema.String),
  sampleRateHertz: Schema.optional(Schema.Number),
  languageCode: Schema.optional(Schema.String),
  enableWordInfo: Schema.optional(Schema.Boolean),
  useTimeoutBasedEndpointing: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SpeechToTextConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SpeechToTextConfig>;

export interface GoogleCloudDialogflowV2beta1ConversationProfile {
  name?: string;
  displayName?: string;
  createTime?: string;
  updateTime?: string;
  useBidiStreaming?: boolean;
  automatedAgentConfig?: GoogleCloudDialogflowV2beta1AutomatedAgentConfig;
  humanAgentAssistantConfig?: GoogleCloudDialogflowV2beta1HumanAgentAssistantConfig;
  humanAgentHandoffConfig?: GoogleCloudDialogflowV2beta1HumanAgentHandoffConfig;
  notificationConfig?: GoogleCloudDialogflowV2beta1NotificationConfig;
  loggingConfig?: GoogleCloudDialogflowV2beta1LoggingConfig;
  newMessageEventNotificationConfig?: GoogleCloudDialogflowV2beta1NotificationConfig;
  newRecognitionResultNotificationConfig?: GoogleCloudDialogflowV2beta1NotificationConfig;
  sttConfig?: GoogleCloudDialogflowV2beta1SpeechToTextConfig;
  languageCode?: string;
  timeZone?: string;
  securitySettings?: string;
  ttsConfig?: GoogleCloudDialogflowV2beta1SynthesizeSpeechConfig;
}

export const GoogleCloudDialogflowV2beta1ConversationProfile: Schema.Schema<GoogleCloudDialogflowV2beta1ConversationProfile> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  useBidiStreaming: Schema.optional(Schema.Boolean),
  automatedAgentConfig: Schema.optional(GoogleCloudDialogflowV2beta1AutomatedAgentConfig),
  humanAgentAssistantConfig: Schema.optional(GoogleCloudDialogflowV2beta1HumanAgentAssistantConfig),
  humanAgentHandoffConfig: Schema.optional(GoogleCloudDialogflowV2beta1HumanAgentHandoffConfig),
  notificationConfig: Schema.optional(GoogleCloudDialogflowV2beta1NotificationConfig),
  loggingConfig: Schema.optional(GoogleCloudDialogflowV2beta1LoggingConfig),
  newMessageEventNotificationConfig: Schema.optional(GoogleCloudDialogflowV2beta1NotificationConfig),
  newRecognitionResultNotificationConfig: Schema.optional(GoogleCloudDialogflowV2beta1NotificationConfig),
  sttConfig: Schema.optional(GoogleCloudDialogflowV2beta1SpeechToTextConfig),
  languageCode: Schema.optional(Schema.String),
  timeZone: Schema.optional(Schema.String),
  securitySettings: Schema.optional(Schema.String),
  ttsConfig: Schema.optional(GoogleCloudDialogflowV2beta1SynthesizeSpeechConfig),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ConversationProfile" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ConversationProfile>;

export interface GoogleCloudDialogflowV2beta1ListConversationProfilesResponse {
  conversationProfiles?: Array<GoogleCloudDialogflowV2beta1ConversationProfile>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowV2beta1ListConversationProfilesResponse: Schema.Schema<GoogleCloudDialogflowV2beta1ListConversationProfilesResponse> = Schema.suspend(() => Schema.Struct({
  conversationProfiles: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1ConversationProfile)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ListConversationProfilesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ListConversationProfilesResponse>;

export interface GoogleCloudDialogflowV2beta1SetSuggestionFeatureConfigRequest {
  participantRole?: "ROLE_UNSPECIFIED" | "HUMAN_AGENT" | "AUTOMATED_AGENT" | "END_USER" | (string & {});
  suggestionFeatureConfig?: GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionFeatureConfig;
}

export const GoogleCloudDialogflowV2beta1SetSuggestionFeatureConfigRequest: Schema.Schema<GoogleCloudDialogflowV2beta1SetSuggestionFeatureConfigRequest> = Schema.suspend(() => Schema.Struct({
  participantRole: Schema.optional(Schema.String),
  suggestionFeatureConfig: Schema.optional(GoogleCloudDialogflowV2beta1HumanAgentAssistantConfigSuggestionFeatureConfig),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SetSuggestionFeatureConfigRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SetSuggestionFeatureConfigRequest>;

export interface GoogleCloudDialogflowV2beta1ClearSuggestionFeatureConfigRequest {
  participantRole?: "ROLE_UNSPECIFIED" | "HUMAN_AGENT" | "AUTOMATED_AGENT" | "END_USER" | (string & {});
  suggestionFeatureType?: "TYPE_UNSPECIFIED" | "ARTICLE_SUGGESTION" | "FAQ" | "SMART_REPLY" | "DIALOGFLOW_ASSIST" | "CONVERSATION_SUMMARIZATION" | "KNOWLEDGE_SEARCH" | "KNOWLEDGE_ASSIST" | (string & {});
}

export const GoogleCloudDialogflowV2beta1ClearSuggestionFeatureConfigRequest: Schema.Schema<GoogleCloudDialogflowV2beta1ClearSuggestionFeatureConfigRequest> = Schema.suspend(() => Schema.Struct({
  participantRole: Schema.optional(Schema.String),
  suggestionFeatureType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ClearSuggestionFeatureConfigRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ClearSuggestionFeatureConfigRequest>;

export interface GoogleCloudDialogflowV2beta1ConversationPhoneNumber {
  countryCode?: number;
  phoneNumber?: string;
}

export const GoogleCloudDialogflowV2beta1ConversationPhoneNumber: Schema.Schema<GoogleCloudDialogflowV2beta1ConversationPhoneNumber> = Schema.suspend(() => Schema.Struct({
  countryCode: Schema.optional(Schema.Number),
  phoneNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ConversationPhoneNumber" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ConversationPhoneNumber>;

export interface GoogleCloudDialogflowV2beta1ConversationTelephonyConnectionInfoSipHeader {
  name?: string;
  value?: string;
}

export const GoogleCloudDialogflowV2beta1ConversationTelephonyConnectionInfoSipHeader: Schema.Schema<GoogleCloudDialogflowV2beta1ConversationTelephonyConnectionInfoSipHeader> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ConversationTelephonyConnectionInfoSipHeader" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ConversationTelephonyConnectionInfoSipHeader>;

export interface GoogleCloudDialogflowV2beta1ConversationTelephonyConnectionInfoMimeContent {
  mimeType?: string;
  content?: string;
}

export const GoogleCloudDialogflowV2beta1ConversationTelephonyConnectionInfoMimeContent: Schema.Schema<GoogleCloudDialogflowV2beta1ConversationTelephonyConnectionInfoMimeContent> = Schema.suspend(() => Schema.Struct({
  mimeType: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ConversationTelephonyConnectionInfoMimeContent" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ConversationTelephonyConnectionInfoMimeContent>;

export interface GoogleCloudDialogflowV2beta1ConversationTelephonyConnectionInfo {
  dialedNumber?: string;
  sdp?: string;
  sipHeaders?: Array<GoogleCloudDialogflowV2beta1ConversationTelephonyConnectionInfoSipHeader>;
  extraMimeContents?: Array<GoogleCloudDialogflowV2beta1ConversationTelephonyConnectionInfoMimeContent>;
}

export const GoogleCloudDialogflowV2beta1ConversationTelephonyConnectionInfo: Schema.Schema<GoogleCloudDialogflowV2beta1ConversationTelephonyConnectionInfo> = Schema.suspend(() => Schema.Struct({
  dialedNumber: Schema.optional(Schema.String),
  sdp: Schema.optional(Schema.String),
  sipHeaders: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1ConversationTelephonyConnectionInfoSipHeader)),
  extraMimeContents: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1ConversationTelephonyConnectionInfoMimeContent)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ConversationTelephonyConnectionInfo" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ConversationTelephonyConnectionInfo>;

export interface GoogleCloudDialogflowV2beta1ConversationContextReferenceContextContent {
  content?: string;
  contentFormat?: "CONTENT_FORMAT_UNSPECIFIED" | "JSON" | "PLAIN_TEXT" | (string & {});
  ingestionTime?: string;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2beta1ConversationContextReferenceContextContent: Schema.Schema<GoogleCloudDialogflowV2beta1ConversationContextReferenceContextContent> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
  contentFormat: Schema.optional(Schema.String),
  ingestionTime: Schema.optional(Schema.String),
  answerRecord: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ConversationContextReferenceContextContent" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ConversationContextReferenceContextContent>;

export interface GoogleCloudDialogflowV2beta1ConversationContextReference {
  contextContents?: Array<GoogleCloudDialogflowV2beta1ConversationContextReferenceContextContent>;
  updateMode?: "UPDATE_MODE_UNSPECIFIED" | "APPEND" | "OVERWRITE" | (string & {});
  languageCode?: string;
  createTime?: string;
}

export const GoogleCloudDialogflowV2beta1ConversationContextReference: Schema.Schema<GoogleCloudDialogflowV2beta1ConversationContextReference> = Schema.suspend(() => Schema.Struct({
  contextContents: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1ConversationContextReferenceContextContent)),
  updateMode: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ConversationContextReference" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ConversationContextReference>;

export interface GoogleCloudDialogflowV2beta1Conversation {
  name?: string;
  lifecycleState?: "LIFECYCLE_STATE_UNSPECIFIED" | "IN_PROGRESS" | "COMPLETED" | (string & {});
  conversationProfile?: string;
  phoneNumber?: GoogleCloudDialogflowV2beta1ConversationPhoneNumber;
  conversationStage?: "CONVERSATION_STAGE_UNSPECIFIED" | "VIRTUAL_AGENT_STAGE" | "HUMAN_ASSIST_STAGE" | (string & {});
  startTime?: string;
  endTime?: string;
  telephonyConnectionInfo?: GoogleCloudDialogflowV2beta1ConversationTelephonyConnectionInfo;
  ingestedContextReferences?: Record<string, GoogleCloudDialogflowV2beta1ConversationContextReference>;
}

export const GoogleCloudDialogflowV2beta1Conversation: Schema.Schema<GoogleCloudDialogflowV2beta1Conversation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  lifecycleState: Schema.optional(Schema.String),
  conversationProfile: Schema.optional(Schema.String),
  phoneNumber: Schema.optional(GoogleCloudDialogflowV2beta1ConversationPhoneNumber),
  conversationStage: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  telephonyConnectionInfo: Schema.optional(GoogleCloudDialogflowV2beta1ConversationTelephonyConnectionInfo),
  ingestedContextReferences: Schema.optional(Schema.Record(Schema.String, GoogleCloudDialogflowV2beta1ConversationContextReference)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1Conversation" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1Conversation>;

export interface GoogleCloudDialogflowV2beta1ListConversationsResponse {
  conversations?: Array<GoogleCloudDialogflowV2beta1Conversation>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowV2beta1ListConversationsResponse: Schema.Schema<GoogleCloudDialogflowV2beta1ListConversationsResponse> = Schema.suspend(() => Schema.Struct({
  conversations: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1Conversation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ListConversationsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ListConversationsResponse>;

export interface GoogleCloudDialogflowV2beta1CompleteConversationRequest {
}

export const GoogleCloudDialogflowV2beta1CompleteConversationRequest: Schema.Schema<GoogleCloudDialogflowV2beta1CompleteConversationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1CompleteConversationRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1CompleteConversationRequest>;

export interface GoogleCloudDialogflowV2beta1IngestContextReferencesRequest {
  contextReferences?: Record<string, GoogleCloudDialogflowV2beta1ConversationContextReference>;
}

export const GoogleCloudDialogflowV2beta1IngestContextReferencesRequest: Schema.Schema<GoogleCloudDialogflowV2beta1IngestContextReferencesRequest> = Schema.suspend(() => Schema.Struct({
  contextReferences: Schema.optional(Schema.Record(Schema.String, GoogleCloudDialogflowV2beta1ConversationContextReference)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IngestContextReferencesRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IngestContextReferencesRequest>;

export interface GoogleCloudDialogflowV2beta1IngestContextReferencesResponse {
  ingestedContextReferences?: Record<string, GoogleCloudDialogflowV2beta1ConversationContextReference>;
}

export const GoogleCloudDialogflowV2beta1IngestContextReferencesResponse: Schema.Schema<GoogleCloudDialogflowV2beta1IngestContextReferencesResponse> = Schema.suspend(() => Schema.Struct({
  ingestedContextReferences: Schema.optional(Schema.Record(Schema.String, GoogleCloudDialogflowV2beta1ConversationContextReference)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1IngestContextReferencesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1IngestContextReferencesResponse>;

export interface GoogleCloudDialogflowV2beta1CreateMessageRequest {
  parent?: string;
  message?: GoogleCloudDialogflowV2beta1Message;
}

export const GoogleCloudDialogflowV2beta1CreateMessageRequest: Schema.Schema<GoogleCloudDialogflowV2beta1CreateMessageRequest> = Schema.suspend(() => Schema.Struct({
  parent: Schema.optional(Schema.String),
  message: Schema.optional(GoogleCloudDialogflowV2beta1Message),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1CreateMessageRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1CreateMessageRequest>;

export interface GoogleCloudDialogflowV2beta1BatchCreateMessagesRequest {
  requests?: Array<GoogleCloudDialogflowV2beta1CreateMessageRequest>;
}

export const GoogleCloudDialogflowV2beta1BatchCreateMessagesRequest: Schema.Schema<GoogleCloudDialogflowV2beta1BatchCreateMessagesRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1CreateMessageRequest)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1BatchCreateMessagesRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1BatchCreateMessagesRequest>;

export interface GoogleCloudDialogflowV2beta1BatchCreateMessagesResponse {
  messages?: Array<GoogleCloudDialogflowV2beta1Message>;
}

export const GoogleCloudDialogflowV2beta1BatchCreateMessagesResponse: Schema.Schema<GoogleCloudDialogflowV2beta1BatchCreateMessagesResponse> = Schema.suspend(() => Schema.Struct({
  messages: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1Message)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1BatchCreateMessagesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1BatchCreateMessagesResponse>;

export interface GoogleCloudDialogflowV2beta1ListMessagesResponse {
  messages?: Array<GoogleCloudDialogflowV2beta1Message>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowV2beta1ListMessagesResponse: Schema.Schema<GoogleCloudDialogflowV2beta1ListMessagesResponse> = Schema.suspend(() => Schema.Struct({
  messages: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1Message)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ListMessagesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ListMessagesResponse>;

export interface GoogleCloudDialogflowV2beta1SuggestConversationSummaryRequest {
  latestMessage?: string;
  contextSize?: number;
  assistQueryParams?: GoogleCloudDialogflowV2beta1AssistQueryParameters;
}

export const GoogleCloudDialogflowV2beta1SuggestConversationSummaryRequest: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestConversationSummaryRequest> = Schema.suspend(() => Schema.Struct({
  latestMessage: Schema.optional(Schema.String),
  contextSize: Schema.optional(Schema.Number),
  assistQueryParams: Schema.optional(GoogleCloudDialogflowV2beta1AssistQueryParameters),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SuggestConversationSummaryRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestConversationSummaryRequest>;

export interface GoogleCloudDialogflowV2beta1SuggestConversationSummaryResponseSummarySummarySection {
  section?: string;
  summary?: string;
}

export const GoogleCloudDialogflowV2beta1SuggestConversationSummaryResponseSummarySummarySection: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestConversationSummaryResponseSummarySummarySection> = Schema.suspend(() => Schema.Struct({
  section: Schema.optional(Schema.String),
  summary: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SuggestConversationSummaryResponseSummarySummarySection" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestConversationSummaryResponseSummarySummarySection>;

export interface GoogleCloudDialogflowV2beta1SuggestConversationSummaryResponseSummary {
  text?: string;
  textSections?: Record<string, string>;
  sortedTextSections?: Array<GoogleCloudDialogflowV2beta1SuggestConversationSummaryResponseSummarySummarySection>;
  answerRecord?: string;
  baselineModelVersion?: string;
}

export const GoogleCloudDialogflowV2beta1SuggestConversationSummaryResponseSummary: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestConversationSummaryResponseSummary> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  textSections: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  sortedTextSections: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SuggestConversationSummaryResponseSummarySummarySection)),
  answerRecord: Schema.optional(Schema.String),
  baselineModelVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SuggestConversationSummaryResponseSummary" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestConversationSummaryResponseSummary>;

export interface GoogleCloudDialogflowV2beta1SuggestConversationSummaryResponse {
  summary?: GoogleCloudDialogflowV2beta1SuggestConversationSummaryResponseSummary;
  latestMessage?: string;
  contextSize?: number;
}

export const GoogleCloudDialogflowV2beta1SuggestConversationSummaryResponse: Schema.Schema<GoogleCloudDialogflowV2beta1SuggestConversationSummaryResponse> = Schema.suspend(() => Schema.Struct({
  summary: Schema.optional(GoogleCloudDialogflowV2beta1SuggestConversationSummaryResponseSummary),
  latestMessage: Schema.optional(Schema.String),
  contextSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SuggestConversationSummaryResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SuggestConversationSummaryResponse>;

export interface GoogleCloudDialogflowV2beta1GenerateStatelessSummaryRequestMinimalConversation {
  messages?: Array<GoogleCloudDialogflowV2beta1Message>;
}

export const GoogleCloudDialogflowV2beta1GenerateStatelessSummaryRequestMinimalConversation: Schema.Schema<GoogleCloudDialogflowV2beta1GenerateStatelessSummaryRequestMinimalConversation> = Schema.suspend(() => Schema.Struct({
  messages: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1Message)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1GenerateStatelessSummaryRequestMinimalConversation" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1GenerateStatelessSummaryRequestMinimalConversation>;

export interface GoogleCloudDialogflowV2beta1GenerateStatelessSummaryRequest {
  statelessConversation?: GoogleCloudDialogflowV2beta1GenerateStatelessSummaryRequestMinimalConversation;
  conversationProfile?: GoogleCloudDialogflowV2beta1ConversationProfile;
  latestMessage?: string;
  maxContextSize?: number;
}

export const GoogleCloudDialogflowV2beta1GenerateStatelessSummaryRequest: Schema.Schema<GoogleCloudDialogflowV2beta1GenerateStatelessSummaryRequest> = Schema.suspend(() => Schema.Struct({
  statelessConversation: Schema.optional(GoogleCloudDialogflowV2beta1GenerateStatelessSummaryRequestMinimalConversation),
  conversationProfile: Schema.optional(GoogleCloudDialogflowV2beta1ConversationProfile),
  latestMessage: Schema.optional(Schema.String),
  maxContextSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1GenerateStatelessSummaryRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1GenerateStatelessSummaryRequest>;

export interface GoogleCloudDialogflowV2beta1GenerateStatelessSummaryResponseSummary {
  text?: string;
  textSections?: Record<string, string>;
  baselineModelVersion?: string;
}

export const GoogleCloudDialogflowV2beta1GenerateStatelessSummaryResponseSummary: Schema.Schema<GoogleCloudDialogflowV2beta1GenerateStatelessSummaryResponseSummary> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  textSections: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  baselineModelVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1GenerateStatelessSummaryResponseSummary" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1GenerateStatelessSummaryResponseSummary>;

export interface GoogleCloudDialogflowV2beta1GenerateStatelessSummaryResponse {
  summary?: GoogleCloudDialogflowV2beta1GenerateStatelessSummaryResponseSummary;
  latestMessage?: string;
  contextSize?: number;
}

export const GoogleCloudDialogflowV2beta1GenerateStatelessSummaryResponse: Schema.Schema<GoogleCloudDialogflowV2beta1GenerateStatelessSummaryResponse> = Schema.suspend(() => Schema.Struct({
  summary: Schema.optional(GoogleCloudDialogflowV2beta1GenerateStatelessSummaryResponseSummary),
  latestMessage: Schema.optional(Schema.String),
  contextSize: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1GenerateStatelessSummaryResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1GenerateStatelessSummaryResponse>;

export interface GoogleCloudDialogflowV2beta1GenerateStatelessSuggestionRequest {
  generator?: GoogleCloudDialogflowV2beta1Generator;
  generatorName?: string;
  contextReferences?: Record<string, GoogleCloudDialogflowV2beta1ConversationContextReference>;
  conversationContext?: GoogleCloudDialogflowV2beta1ConversationContext;
  triggerEvents?: Array<"TRIGGER_EVENT_UNSPECIFIED" | "END_OF_UTTERANCE" | "MANUAL_CALL" | "CUSTOMER_MESSAGE" | "AGENT_MESSAGE" | (string & {})>;
  securitySettings?: string;
}

export const GoogleCloudDialogflowV2beta1GenerateStatelessSuggestionRequest: Schema.Schema<GoogleCloudDialogflowV2beta1GenerateStatelessSuggestionRequest> = Schema.suspend(() => Schema.Struct({
  generator: Schema.optional(GoogleCloudDialogflowV2beta1Generator),
  generatorName: Schema.optional(Schema.String),
  contextReferences: Schema.optional(Schema.Record(Schema.String, GoogleCloudDialogflowV2beta1ConversationContextReference)),
  conversationContext: Schema.optional(GoogleCloudDialogflowV2beta1ConversationContext),
  triggerEvents: Schema.optional(Schema.Array(Schema.String)),
  securitySettings: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1GenerateStatelessSuggestionRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1GenerateStatelessSuggestionRequest>;

export interface GoogleCloudDialogflowV2beta1GenerateStatelessSuggestionResponse {
  generatorSuggestion?: GoogleCloudDialogflowV2beta1GeneratorSuggestion;
}

export const GoogleCloudDialogflowV2beta1GenerateStatelessSuggestionResponse: Schema.Schema<GoogleCloudDialogflowV2beta1GenerateStatelessSuggestionResponse> = Schema.suspend(() => Schema.Struct({
  generatorSuggestion: Schema.optional(GoogleCloudDialogflowV2beta1GeneratorSuggestion),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1GenerateStatelessSuggestionResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1GenerateStatelessSuggestionResponse>;

export interface GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecsBoostSpecConditionBoostSpecBoostControlSpecControlPoint {
  attributeValue?: string;
  boostAmount?: number;
}

export const GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecsBoostSpecConditionBoostSpecBoostControlSpecControlPoint: Schema.Schema<GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecsBoostSpecConditionBoostSpecBoostControlSpecControlPoint> = Schema.suspend(() => Schema.Struct({
  attributeValue: Schema.optional(Schema.String),
  boostAmount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecsBoostSpecConditionBoostSpecBoostControlSpecControlPoint" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecsBoostSpecConditionBoostSpecBoostControlSpecControlPoint>;

export interface GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecsBoostSpecConditionBoostSpecBoostControlSpec {
  fieldName?: string;
  attributeType?: "ATTRIBUTE_TYPE_UNSPECIFIED" | "NUMERICAL" | "FRESHNESS" | (string & {});
  interpolationType?: "INTERPOLATION_TYPE_UNSPECIFIED" | "LINEAR" | (string & {});
  controlPoints?: Array<GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecsBoostSpecConditionBoostSpecBoostControlSpecControlPoint>;
}

export const GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecsBoostSpecConditionBoostSpecBoostControlSpec: Schema.Schema<GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecsBoostSpecConditionBoostSpecBoostControlSpec> = Schema.suspend(() => Schema.Struct({
  fieldName: Schema.optional(Schema.String),
  attributeType: Schema.optional(Schema.String),
  interpolationType: Schema.optional(Schema.String),
  controlPoints: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecsBoostSpecConditionBoostSpecBoostControlSpecControlPoint)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecsBoostSpecConditionBoostSpecBoostControlSpec" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecsBoostSpecConditionBoostSpecBoostControlSpec>;

export interface GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecsBoostSpecConditionBoostSpec {
  condition?: string;
  boost?: number;
  boostControlSpec?: GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecsBoostSpecConditionBoostSpecBoostControlSpec;
}

export const GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecsBoostSpecConditionBoostSpec: Schema.Schema<GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecsBoostSpecConditionBoostSpec> = Schema.suspend(() => Schema.Struct({
  condition: Schema.optional(Schema.String),
  boost: Schema.optional(Schema.Number),
  boostControlSpec: Schema.optional(GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecsBoostSpecConditionBoostSpecBoostControlSpec),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecsBoostSpecConditionBoostSpec" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecsBoostSpecConditionBoostSpec>;

export interface GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecsBoostSpec {
  conditionBoostSpecs?: Array<GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecsBoostSpecConditionBoostSpec>;
}

export const GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecsBoostSpec: Schema.Schema<GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecsBoostSpec> = Schema.suspend(() => Schema.Struct({
  conditionBoostSpecs: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecsBoostSpecConditionBoostSpec)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecsBoostSpec" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecsBoostSpec>;

export interface GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecs {
  dataStores?: Array<string>;
  spec?: Array<GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecsBoostSpec>;
}

export const GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecs: Schema.Schema<GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecs> = Schema.suspend(() => Schema.Struct({
  dataStores: Schema.optional(Schema.Array(Schema.String)),
  spec: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecsBoostSpec)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecs" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecs>;

export interface GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigFilterSpecs {
  dataStores?: Array<string>;
  filter?: string;
}

export const GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigFilterSpecs: Schema.Schema<GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigFilterSpecs> = Schema.suspend(() => Schema.Struct({
  dataStores: Schema.optional(Schema.Array(Schema.String)),
  filter: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigFilterSpecs" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigFilterSpecs>;

export interface GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfig {
  boostSpecs?: Array<GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecs>;
  filterSpecs?: Array<GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigFilterSpecs>;
}

export const GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfig: Schema.Schema<GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfig> = Schema.suspend(() => Schema.Struct({
  boostSpecs: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigBoostSpecs)),
  filterSpecs: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfigFilterSpecs)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfig>;

export interface GoogleCloudDialogflowV2beta1SearchKnowledgeRequest {
  parent?: string;
  query?: GoogleCloudDialogflowV2beta1TextInput;
  conversationProfile?: string;
  sessionId?: string;
  conversation?: string;
  latestMessage?: string;
  querySource?: "QUERY_SOURCE_UNSPECIFIED" | "AGENT_QUERY" | "SUGGESTED_QUERY" | (string & {});
  endUserMetadata?: Record<string, unknown>;
  searchConfig?: GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfig;
  exactSearch?: boolean;
}

export const GoogleCloudDialogflowV2beta1SearchKnowledgeRequest: Schema.Schema<GoogleCloudDialogflowV2beta1SearchKnowledgeRequest> = Schema.suspend(() => Schema.Struct({
  parent: Schema.optional(Schema.String),
  query: Schema.optional(GoogleCloudDialogflowV2beta1TextInput),
  conversationProfile: Schema.optional(Schema.String),
  sessionId: Schema.optional(Schema.String),
  conversation: Schema.optional(Schema.String),
  latestMessage: Schema.optional(Schema.String),
  querySource: Schema.optional(Schema.String),
  endUserMetadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  searchConfig: Schema.optional(GoogleCloudDialogflowV2beta1SearchKnowledgeRequestSearchConfig),
  exactSearch: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SearchKnowledgeRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SearchKnowledgeRequest>;

export interface GoogleCloudDialogflowV2beta1SearchKnowledgeAnswerAnswerSource {
  title?: string;
  uri?: string;
  snippet?: string;
  metadata?: Record<string, unknown>;
}

export const GoogleCloudDialogflowV2beta1SearchKnowledgeAnswerAnswerSource: Schema.Schema<GoogleCloudDialogflowV2beta1SearchKnowledgeAnswerAnswerSource> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  snippet: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SearchKnowledgeAnswerAnswerSource" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SearchKnowledgeAnswerAnswerSource>;

export interface GoogleCloudDialogflowV2beta1SearchKnowledgeAnswer {
  answer?: string;
  answerType?: "ANSWER_TYPE_UNSPECIFIED" | "FAQ" | "GENERATIVE" | "INTENT" | (string & {});
  answerSources?: Array<GoogleCloudDialogflowV2beta1SearchKnowledgeAnswerAnswerSource>;
  answerRecord?: string;
}

export const GoogleCloudDialogflowV2beta1SearchKnowledgeAnswer: Schema.Schema<GoogleCloudDialogflowV2beta1SearchKnowledgeAnswer> = Schema.suspend(() => Schema.Struct({
  answer: Schema.optional(Schema.String),
  answerType: Schema.optional(Schema.String),
  answerSources: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SearchKnowledgeAnswerAnswerSource)),
  answerRecord: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SearchKnowledgeAnswer" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SearchKnowledgeAnswer>;

export interface GoogleCloudDialogflowV2beta1SearchKnowledgeDebugInfoSearchKnowledgeBehavior {
  answerGenerationRewriterOn?: boolean;
  endUserMetadataIncluded?: boolean;
  thirdPartyConnectorAllowed?: boolean;
}

export const GoogleCloudDialogflowV2beta1SearchKnowledgeDebugInfoSearchKnowledgeBehavior: Schema.Schema<GoogleCloudDialogflowV2beta1SearchKnowledgeDebugInfoSearchKnowledgeBehavior> = Schema.suspend(() => Schema.Struct({
  answerGenerationRewriterOn: Schema.optional(Schema.Boolean),
  endUserMetadataIncluded: Schema.optional(Schema.Boolean),
  thirdPartyConnectorAllowed: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SearchKnowledgeDebugInfoSearchKnowledgeBehavior" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SearchKnowledgeDebugInfoSearchKnowledgeBehavior>;

export interface GoogleCloudDialogflowV2beta1SearchKnowledgeDebugInfo {
  datastoreResponseReason?: "DATASTORE_RESPONSE_REASON_UNSPECIFIED" | "NONE" | "SEARCH_OUT_OF_QUOTA" | "SEARCH_EMPTY_RESULTS" | "ANSWER_GENERATION_GEN_AI_DISABLED" | "ANSWER_GENERATION_OUT_OF_QUOTA" | "ANSWER_GENERATION_ERROR" | "ANSWER_GENERATION_NOT_ENOUGH_INFO" | "ANSWER_GENERATION_RAI_FAILED" | "ANSWER_GENERATION_NOT_GROUNDED" | (string & {});
  searchKnowledgeBehavior?: GoogleCloudDialogflowV2beta1SearchKnowledgeDebugInfoSearchKnowledgeBehavior;
  ingestedContextReferenceDebugInfo?: GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfo;
  serviceLatency?: GoogleCloudDialogflowV2beta1ServiceLatency;
}

export const GoogleCloudDialogflowV2beta1SearchKnowledgeDebugInfo: Schema.Schema<GoogleCloudDialogflowV2beta1SearchKnowledgeDebugInfo> = Schema.suspend(() => Schema.Struct({
  datastoreResponseReason: Schema.optional(Schema.String),
  searchKnowledgeBehavior: Schema.optional(GoogleCloudDialogflowV2beta1SearchKnowledgeDebugInfoSearchKnowledgeBehavior),
  ingestedContextReferenceDebugInfo: Schema.optional(GoogleCloudDialogflowV2beta1IngestedContextReferenceDebugInfo),
  serviceLatency: Schema.optional(GoogleCloudDialogflowV2beta1ServiceLatency),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SearchKnowledgeDebugInfo" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SearchKnowledgeDebugInfo>;

export interface GoogleCloudDialogflowV2beta1SearchKnowledgeResponse {
  answers?: Array<GoogleCloudDialogflowV2beta1SearchKnowledgeAnswer>;
  rewrittenQuery?: string;
  searchKnowledgeDebugInfo?: GoogleCloudDialogflowV2beta1SearchKnowledgeDebugInfo;
}

export const GoogleCloudDialogflowV2beta1SearchKnowledgeResponse: Schema.Schema<GoogleCloudDialogflowV2beta1SearchKnowledgeResponse> = Schema.suspend(() => Schema.Struct({
  answers: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SearchKnowledgeAnswer)),
  rewrittenQuery: Schema.optional(Schema.String),
  searchKnowledgeDebugInfo: Schema.optional(GoogleCloudDialogflowV2beta1SearchKnowledgeDebugInfo),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SearchKnowledgeResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SearchKnowledgeResponse>;

export interface GoogleCloudDialogflowV2beta1GenerateSuggestionsRequest {
  latestMessage?: string;
  triggerEvents?: Array<"TRIGGER_EVENT_UNSPECIFIED" | "END_OF_UTTERANCE" | "MANUAL_CALL" | "CUSTOMER_MESSAGE" | "AGENT_MESSAGE" | (string & {})>;
}

export const GoogleCloudDialogflowV2beta1GenerateSuggestionsRequest: Schema.Schema<GoogleCloudDialogflowV2beta1GenerateSuggestionsRequest> = Schema.suspend(() => Schema.Struct({
  latestMessage: Schema.optional(Schema.String),
  triggerEvents: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1GenerateSuggestionsRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1GenerateSuggestionsRequest>;

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

export interface GoogleCloudDialogflowV2beta1GeneratorEvaluationConfigAgentAssistInputDataConfig {
  startTime?: string;
  endTime?: string;
}

export const GoogleCloudDialogflowV2beta1GeneratorEvaluationConfigAgentAssistInputDataConfig: Schema.Schema<GoogleCloudDialogflowV2beta1GeneratorEvaluationConfigAgentAssistInputDataConfig> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1GeneratorEvaluationConfigAgentAssistInputDataConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1GeneratorEvaluationConfigAgentAssistInputDataConfig>;

export interface GoogleCloudDialogflowV2beta1GeneratorEvaluationConfigDatasetInputDataConfig {
  dataset?: string;
}

export const GoogleCloudDialogflowV2beta1GeneratorEvaluationConfigDatasetInputDataConfig: Schema.Schema<GoogleCloudDialogflowV2beta1GeneratorEvaluationConfigDatasetInputDataConfig> = Schema.suspend(() => Schema.Struct({
  dataset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1GeneratorEvaluationConfigDatasetInputDataConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1GeneratorEvaluationConfigDatasetInputDataConfig>;

export interface GoogleCloudDialogflowV2beta1GeneratorEvaluationConfigInputDataConfig {
  inputDataSourceType?: "INPUT_DATA_SOURCE_TYPE_UNSPECIFIED" | "AGENT_ASSIST_CONVERSATIONS" | "INSIGHTS_CONVERSATIONS" | (string & {});
  startTime?: string;
  endTime?: string;
  sampleSize?: number;
  isSummaryGenerationAllowed?: boolean;
  summaryGenerationOption?: "SUMMARY_GENERATION_OPTION_UNSPECIFIED" | "ALWAYS_GENERATE" | "GENERATE_IF_MISSING" | "DO_NOT_GENERATE" | (string & {});
  agentAssistInputDataConfig?: GoogleCloudDialogflowV2beta1GeneratorEvaluationConfigAgentAssistInputDataConfig;
  datasetInputDataConfig?: GoogleCloudDialogflowV2beta1GeneratorEvaluationConfigDatasetInputDataConfig;
}

export const GoogleCloudDialogflowV2beta1GeneratorEvaluationConfigInputDataConfig: Schema.Schema<GoogleCloudDialogflowV2beta1GeneratorEvaluationConfigInputDataConfig> = Schema.suspend(() => Schema.Struct({
  inputDataSourceType: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  sampleSize: Schema.optional(Schema.Number),
  isSummaryGenerationAllowed: Schema.optional(Schema.Boolean),
  summaryGenerationOption: Schema.optional(Schema.String),
  agentAssistInputDataConfig: Schema.optional(GoogleCloudDialogflowV2beta1GeneratorEvaluationConfigAgentAssistInputDataConfig),
  datasetInputDataConfig: Schema.optional(GoogleCloudDialogflowV2beta1GeneratorEvaluationConfigDatasetInputDataConfig),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1GeneratorEvaluationConfigInputDataConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1GeneratorEvaluationConfigInputDataConfig>;

export interface GoogleCloudDialogflowV2beta1GeneratorEvaluationConfigSummarizationConfig {
  enableAccuracyEvaluation?: boolean;
  accuracyEvaluationVersion?: string;
  enableCompletenessEvaluation?: boolean;
  completenessEvaluationVersion?: string;
  evaluatorVersion?: string;
}

export const GoogleCloudDialogflowV2beta1GeneratorEvaluationConfigSummarizationConfig: Schema.Schema<GoogleCloudDialogflowV2beta1GeneratorEvaluationConfigSummarizationConfig> = Schema.suspend(() => Schema.Struct({
  enableAccuracyEvaluation: Schema.optional(Schema.Boolean),
  accuracyEvaluationVersion: Schema.optional(Schema.String),
  enableCompletenessEvaluation: Schema.optional(Schema.Boolean),
  completenessEvaluationVersion: Schema.optional(Schema.String),
  evaluatorVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1GeneratorEvaluationConfigSummarizationConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1GeneratorEvaluationConfigSummarizationConfig>;

export interface GoogleCloudDialogflowV2beta1GeneratorEvaluationConfig {
  inputDataConfig?: GoogleCloudDialogflowV2beta1GeneratorEvaluationConfigInputDataConfig;
  outputGcsBucketPath?: string;
  summarizationConfig?: GoogleCloudDialogflowV2beta1GeneratorEvaluationConfigSummarizationConfig;
}

export const GoogleCloudDialogflowV2beta1GeneratorEvaluationConfig: Schema.Schema<GoogleCloudDialogflowV2beta1GeneratorEvaluationConfig> = Schema.suspend(() => Schema.Struct({
  inputDataConfig: Schema.optional(GoogleCloudDialogflowV2beta1GeneratorEvaluationConfigInputDataConfig),
  outputGcsBucketPath: Schema.optional(Schema.String),
  summarizationConfig: Schema.optional(GoogleCloudDialogflowV2beta1GeneratorEvaluationConfigSummarizationConfig),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1GeneratorEvaluationConfig" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1GeneratorEvaluationConfig>;

export interface GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsAccuracyDecomposition {
  point?: string;
  accuracyReasoning?: string;
  isAccurate?: boolean;
}

export const GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsAccuracyDecomposition: Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsAccuracyDecomposition> = Schema.suspend(() => Schema.Struct({
  point: Schema.optional(Schema.String),
  accuracyReasoning: Schema.optional(Schema.String),
  isAccurate: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsAccuracyDecomposition" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsAccuracyDecomposition>;

export interface GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsAdherenceDecomposition {
  point?: string;
  adherenceReasoning?: string;
  isAdherent?: boolean;
}

export const GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsAdherenceDecomposition: Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsAdherenceDecomposition> = Schema.suspend(() => Schema.Struct({
  point: Schema.optional(Schema.String),
  adherenceReasoning: Schema.optional(Schema.String),
  isAdherent: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsAdherenceDecomposition" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsAdherenceDecomposition>;

export interface GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsDecomposition {
  accuracyDecomposition?: GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsAccuracyDecomposition;
  adherenceDecomposition?: GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsAdherenceDecomposition;
}

export const GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsDecomposition: Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsDecomposition> = Schema.suspend(() => Schema.Struct({
  accuracyDecomposition: Schema.optional(GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsAccuracyDecomposition),
  adherenceDecomposition: Schema.optional(GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsAdherenceDecomposition),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsDecomposition" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsDecomposition>;

export interface GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsAdherenceRubric {
  question?: string;
  reasoning?: string;
  isAddressed?: boolean;
}

export const GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsAdherenceRubric: Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsAdherenceRubric> = Schema.suspend(() => Schema.Struct({
  question: Schema.optional(Schema.String),
  reasoning: Schema.optional(Schema.String),
  isAddressed: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsAdherenceRubric" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsAdherenceRubric>;

export interface GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsCompletenessRubric {
  question?: string;
  isAddressed?: boolean;
}

export const GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsCompletenessRubric: Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsCompletenessRubric> = Schema.suspend(() => Schema.Struct({
  question: Schema.optional(Schema.String),
  isAddressed: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsCompletenessRubric" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsCompletenessRubric>;

export interface GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsEvaluationResult {
  accuracyDecomposition?: GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsAccuracyDecomposition;
  adherenceRubric?: GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsAdherenceRubric;
  completenessRubric?: GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsCompletenessRubric;
}

export const GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsEvaluationResult: Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsEvaluationResult> = Schema.suspend(() => Schema.Struct({
  accuracyDecomposition: Schema.optional(GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsAccuracyDecomposition),
  adherenceRubric: Schema.optional(GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsAdherenceRubric),
  completenessRubric: Schema.optional(GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsCompletenessRubric),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsEvaluationResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsEvaluationResult>;

export interface GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsSummarizationEvaluationResult {
  sessionId?: string;
  metric?: string;
  section?: string;
  score?: number;
  sectionSummary?: string;
  decompositions?: Array<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsDecomposition>;
  evaluationResults?: Array<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsEvaluationResult>;
}

export const GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsSummarizationEvaluationResult: Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsSummarizationEvaluationResult> = Schema.suspend(() => Schema.Struct({
  sessionId: Schema.optional(Schema.String),
  metric: Schema.optional(Schema.String),
  section: Schema.optional(Schema.String),
  score: Schema.optional(Schema.Number),
  sectionSummary: Schema.optional(Schema.String),
  decompositions: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsDecomposition)),
  evaluationResults: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsEvaluationResult)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsSummarizationEvaluationResult" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsSummarizationEvaluationResult>;

export interface GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsOverallScoresByMetric {
  metric?: string;
}

export const GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsOverallScoresByMetric: Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsOverallScoresByMetric> = Schema.suspend(() => Schema.Struct({
  metric: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsOverallScoresByMetric" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsOverallScoresByMetric>;

export interface GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsSectionToken {
  section?: string;
  tokenCount?: string;
}

export const GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsSectionToken: Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsSectionToken> = Schema.suspend(() => Schema.Struct({
  section: Schema.optional(Schema.String),
  tokenCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsSectionToken" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsSectionToken>;

export interface GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsConversationDetailMetricDetailSectionDetail {
  section?: string;
  score?: number;
  sectionSummary?: string;
  evaluationResults?: Array<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsEvaluationResult>;
}

export const GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsConversationDetailMetricDetailSectionDetail: Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsConversationDetailMetricDetailSectionDetail> = Schema.suspend(() => Schema.Struct({
  section: Schema.optional(Schema.String),
  score: Schema.optional(Schema.Number),
  sectionSummary: Schema.optional(Schema.String),
  evaluationResults: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsEvaluationResult)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsConversationDetailMetricDetailSectionDetail" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsConversationDetailMetricDetailSectionDetail>;

export interface GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsConversationDetailMetricDetail {
  metric?: string;
  score?: number;
  sectionDetails?: Array<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsConversationDetailMetricDetailSectionDetail>;
}

export const GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsConversationDetailMetricDetail: Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsConversationDetailMetricDetail> = Schema.suspend(() => Schema.Struct({
  metric: Schema.optional(Schema.String),
  score: Schema.optional(Schema.Number),
  sectionDetails: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsConversationDetailMetricDetailSectionDetail)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsConversationDetailMetricDetail" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsConversationDetailMetricDetail>;

export interface GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsConversationDetail {
  messageEntries?: Array<GoogleCloudDialogflowV2beta1MessageEntry>;
  summarySections?: Array<GoogleCloudDialogflowV2beta1SummarySuggestionSummarySection>;
  metricDetails?: Array<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsConversationDetailMetricDetail>;
  sectionTokens?: Array<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsSectionToken>;
}

export const GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsConversationDetail: Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsConversationDetail> = Schema.suspend(() => Schema.Struct({
  messageEntries: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1MessageEntry)),
  summarySections: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SummarySuggestionSummarySection)),
  metricDetails: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsConversationDetailMetricDetail)),
  sectionTokens: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsSectionToken)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsConversationDetail" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsConversationDetail>;

export interface GoogleCloudDialogflowV2beta1SummarizationEvaluationMetrics {
  summarizationEvaluationResults?: Array<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsSummarizationEvaluationResult>;
  summarizationEvaluationMergedResultsUri?: string;
  overallMetrics?: Array<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsOverallScoresByMetric>;
  overallSectionTokens?: Array<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsSectionToken>;
  conversationDetails?: Array<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsConversationDetail>;
}

export const GoogleCloudDialogflowV2beta1SummarizationEvaluationMetrics: Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetrics> = Schema.suspend(() => Schema.Struct({
  summarizationEvaluationResults: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsSummarizationEvaluationResult)),
  summarizationEvaluationMergedResultsUri: Schema.optional(Schema.String),
  overallMetrics: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsOverallScoresByMetric)),
  overallSectionTokens: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsSectionToken)),
  conversationDetails: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SummarizationEvaluationMetricsConversationDetail)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SummarizationEvaluationMetrics" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SummarizationEvaluationMetrics>;

export interface GoogleCloudDialogflowV2beta1EvaluationStatus {
  done?: boolean;
  pipelineStatus?: GoogleRpcStatus;
}

export const GoogleCloudDialogflowV2beta1EvaluationStatus: Schema.Schema<GoogleCloudDialogflowV2beta1EvaluationStatus> = Schema.suspend(() => Schema.Struct({
  done: Schema.optional(Schema.Boolean),
  pipelineStatus: Schema.optional(GoogleRpcStatus),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1EvaluationStatus" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1EvaluationStatus>;

export interface GoogleCloudDialogflowV2beta1GeneratorEvaluation {
  name?: string;
  displayName?: string;
  generatorEvaluationConfig?: GoogleCloudDialogflowV2beta1GeneratorEvaluationConfig;
  createTime?: string;
  completeTime?: string;
  initialGenerator?: GoogleCloudDialogflowV2beta1Generator;
  summarizationMetrics?: GoogleCloudDialogflowV2beta1SummarizationEvaluationMetrics;
  evaluationStatus?: GoogleCloudDialogflowV2beta1EvaluationStatus;
  satisfiesPzs?: boolean;
  satisfiesPzi?: boolean;
}

export const GoogleCloudDialogflowV2beta1GeneratorEvaluation: Schema.Schema<GoogleCloudDialogflowV2beta1GeneratorEvaluation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  generatorEvaluationConfig: Schema.optional(GoogleCloudDialogflowV2beta1GeneratorEvaluationConfig),
  createTime: Schema.optional(Schema.String),
  completeTime: Schema.optional(Schema.String),
  initialGenerator: Schema.optional(GoogleCloudDialogflowV2beta1Generator),
  summarizationMetrics: Schema.optional(GoogleCloudDialogflowV2beta1SummarizationEvaluationMetrics),
  evaluationStatus: Schema.optional(GoogleCloudDialogflowV2beta1EvaluationStatus),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  satisfiesPzi: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1GeneratorEvaluation" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1GeneratorEvaluation>;

export interface GoogleCloudDialogflowV2beta1ListGeneratorEvaluationsResponse {
  generatorEvaluations?: Array<GoogleCloudDialogflowV2beta1GeneratorEvaluation>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowV2beta1ListGeneratorEvaluationsResponse: Schema.Schema<GoogleCloudDialogflowV2beta1ListGeneratorEvaluationsResponse> = Schema.suspend(() => Schema.Struct({
  generatorEvaluations: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1GeneratorEvaluation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ListGeneratorEvaluationsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ListGeneratorEvaluationsResponse>;

export interface GoogleCloudDialogflowV2beta1KnowledgeBase {
  name?: string;
  displayName?: string;
  languageCode?: string;
}

export const GoogleCloudDialogflowV2beta1KnowledgeBase: Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeBase> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1KnowledgeBase" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1KnowledgeBase>;

export interface GoogleCloudDialogflowV2beta1ListKnowledgeBasesResponse {
  knowledgeBases?: Array<GoogleCloudDialogflowV2beta1KnowledgeBase>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowV2beta1ListKnowledgeBasesResponse: Schema.Schema<GoogleCloudDialogflowV2beta1ListKnowledgeBasesResponse> = Schema.suspend(() => Schema.Struct({
  knowledgeBases: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1KnowledgeBase)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ListKnowledgeBasesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ListKnowledgeBasesResponse>;

export interface GoogleCloudDialogflowV2beta1PhoneNumber {
  name?: string;
  phoneNumber?: string;
  conversationProfile?: string;
  lifecycleState?: "LIFECYCLE_STATE_UNSPECIFIED" | "ACTIVE" | "DELETE_REQUESTED" | (string & {});
}

export const GoogleCloudDialogflowV2beta1PhoneNumber: Schema.Schema<GoogleCloudDialogflowV2beta1PhoneNumber> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  phoneNumber: Schema.optional(Schema.String),
  conversationProfile: Schema.optional(Schema.String),
  lifecycleState: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1PhoneNumber" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1PhoneNumber>;

export interface GoogleCloudDialogflowV2beta1ListPhoneNumbersResponse {
  phoneNumbers?: Array<GoogleCloudDialogflowV2beta1PhoneNumber>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowV2beta1ListPhoneNumbersResponse: Schema.Schema<GoogleCloudDialogflowV2beta1ListPhoneNumbersResponse> = Schema.suspend(() => Schema.Struct({
  phoneNumbers: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1PhoneNumber)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ListPhoneNumbersResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ListPhoneNumbersResponse>;

export interface GoogleCloudDialogflowV2beta1UndeletePhoneNumberRequest {
}

export const GoogleCloudDialogflowV2beta1UndeletePhoneNumberRequest: Schema.Schema<GoogleCloudDialogflowV2beta1UndeletePhoneNumberRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1UndeletePhoneNumberRequest" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1UndeletePhoneNumberRequest>;

export interface GoogleCloudDialogflowV2beta1ConnectionErrorDetails {
  certificateState?: "CERTIFICATE_STATE_UNSPECIFIED" | "CERTIFICATE_VALID" | "CERTIFICATE_INVALID" | "CERTIFICATE_EXPIRED" | "CERTIFICATE_HOSTNAME_NOT_FOUND" | "CERTIFICATE_UNAUTHENTICATED" | "CERTIFICATE_TRUST_STORE_NOT_FOUND" | "CERTIFICATE_HOSTNAME_INVALID_FORMAT" | "CERTIFICATE_QUOTA_EXCEEDED" | (string & {});
  errorMessage?: string;
}

export const GoogleCloudDialogflowV2beta1ConnectionErrorDetails: Schema.Schema<GoogleCloudDialogflowV2beta1ConnectionErrorDetails> = Schema.suspend(() => Schema.Struct({
  certificateState: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ConnectionErrorDetails" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ConnectionErrorDetails>;

export interface GoogleCloudDialogflowV2beta1Connection {
  connectionId?: string;
  state?: "STATE_UNSPECIFIED" | "CONNECTED" | "DISCONNECTED" | "AUTHENTICATION_FAILED" | "KEEPALIVE" | (string & {});
  updateTime?: string;
  errorDetails?: GoogleCloudDialogflowV2beta1ConnectionErrorDetails;
}

export const GoogleCloudDialogflowV2beta1Connection: Schema.Schema<GoogleCloudDialogflowV2beta1Connection> = Schema.suspend(() => Schema.Struct({
  connectionId: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  errorDetails: Schema.optional(GoogleCloudDialogflowV2beta1ConnectionErrorDetails),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1Connection" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1Connection>;

export interface GoogleCloudDialogflowV2beta1SipTrunk {
  name?: string;
  expectedHostname?: Array<string>;
  connections?: Array<GoogleCloudDialogflowV2beta1Connection>;
  displayName?: string;
}

export const GoogleCloudDialogflowV2beta1SipTrunk: Schema.Schema<GoogleCloudDialogflowV2beta1SipTrunk> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  expectedHostname: Schema.optional(Schema.Array(Schema.String)),
  connections: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1Connection)),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1SipTrunk" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1SipTrunk>;

export interface GoogleCloudDialogflowV2beta1ListSipTrunksResponse {
  sipTrunks?: Array<GoogleCloudDialogflowV2beta1SipTrunk>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowV2beta1ListSipTrunksResponse: Schema.Schema<GoogleCloudDialogflowV2beta1ListSipTrunksResponse> = Schema.suspend(() => Schema.Struct({
  sipTrunks: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1SipTrunk)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ListSipTrunksResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ListSipTrunksResponse>;

export interface GoogleCloudDialogflowV2beta1Version {
  name?: string;
  description?: string;
  versionNumber?: number;
  createTime?: string;
  status?: "VERSION_STATUS_UNSPECIFIED" | "IN_PROGRESS" | "READY" | "FAILED" | (string & {});
}

export const GoogleCloudDialogflowV2beta1Version: Schema.Schema<GoogleCloudDialogflowV2beta1Version> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  versionNumber: Schema.optional(Schema.Number),
  createTime: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1Version" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1Version>;

export interface GoogleCloudDialogflowV2beta1ListVersionsResponse {
  versions?: Array<GoogleCloudDialogflowV2beta1Version>;
  nextPageToken?: string;
}

export const GoogleCloudDialogflowV2beta1ListVersionsResponse: Schema.Schema<GoogleCloudDialogflowV2beta1ListVersionsResponse> = Schema.suspend(() => Schema.Struct({
  versions: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1Version)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1ListVersionsResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1ListVersionsResponse>;

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

export interface GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesResponse {
  entityTypes?: Array<GoogleCloudDialogflowV2beta1EntityType>;
}

export const GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesResponse: Schema.Schema<GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesResponse> = Schema.suspend(() => Schema.Struct({
  entityTypes: Schema.optional(Schema.Array(GoogleCloudDialogflowV2beta1EntityType)),
})).annotate({ identifier: "GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesResponse" }) as any as Schema.Schema<GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesResponse>;

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

export interface GetAgentProjectsRequest {
  parent: string;
}

export const GetAgentProjectsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/agent" }),
  svc,
) as unknown as Schema.Schema<GetAgentProjectsRequest>;

export type GetAgentProjectsResponse = GoogleCloudDialogflowV2beta1Agent;
export const GetAgentProjectsResponse = GoogleCloudDialogflowV2beta1Agent;

export type GetAgentProjectsError = CommonErrors;

export const getAgentProjects: API.OperationMethod<GetAgentProjectsRequest, GetAgentProjectsResponse, GetAgentProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAgentProjectsRequest,
  output: GetAgentProjectsResponse,
  errors: [],
}));

export interface SetAgentProjectsRequest {
  parent: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Agent;
}

export const SetAgentProjectsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Agent).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/agent", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetAgentProjectsRequest>;

export type SetAgentProjectsResponse = GoogleCloudDialogflowV2beta1Agent;
export const SetAgentProjectsResponse = GoogleCloudDialogflowV2beta1Agent;

export type SetAgentProjectsError = CommonErrors;

export const setAgentProjects: API.OperationMethod<SetAgentProjectsRequest, SetAgentProjectsResponse, SetAgentProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetAgentProjectsRequest,
  output: SetAgentProjectsResponse,
  errors: [],
}));

export interface DeleteAgentProjectsRequest {
  parent: string;
}

export const DeleteAgentProjectsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/agent" }),
  svc,
) as unknown as Schema.Schema<DeleteAgentProjectsRequest>;

export type DeleteAgentProjectsResponse = GoogleProtobufEmpty;
export const DeleteAgentProjectsResponse = GoogleProtobufEmpty;

export type DeleteAgentProjectsError = CommonErrors;

export const deleteAgentProjects: API.OperationMethod<DeleteAgentProjectsRequest, DeleteAgentProjectsResponse, DeleteAgentProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAgentProjectsRequest,
  output: DeleteAgentProjectsResponse,
  errors: [],
}));

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
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/operations" }),
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
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/operations/{operationsId}" }),
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
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/operations/{operationsId}:cancel", hasBody: true }),
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

export interface GetFulfillmentProjectsAgentRequest {
  name: string;
}

export const GetFulfillmentProjectsAgentRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/agent/fulfillment" }),
  svc,
) as unknown as Schema.Schema<GetFulfillmentProjectsAgentRequest>;

export type GetFulfillmentProjectsAgentResponse = GoogleCloudDialogflowV2beta1Fulfillment;
export const GetFulfillmentProjectsAgentResponse = GoogleCloudDialogflowV2beta1Fulfillment;

export type GetFulfillmentProjectsAgentError = CommonErrors;

export const getFulfillmentProjectsAgent: API.OperationMethod<GetFulfillmentProjectsAgentRequest, GetFulfillmentProjectsAgentResponse, GetFulfillmentProjectsAgentError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFulfillmentProjectsAgentRequest,
  output: GetFulfillmentProjectsAgentResponse,
  errors: [],
}));

export interface UpdateFulfillmentProjectsAgentRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Fulfillment;
}

export const UpdateFulfillmentProjectsAgentRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Fulfillment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/agent/fulfillment", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateFulfillmentProjectsAgentRequest>;

export type UpdateFulfillmentProjectsAgentResponse = GoogleCloudDialogflowV2beta1Fulfillment;
export const UpdateFulfillmentProjectsAgentResponse = GoogleCloudDialogflowV2beta1Fulfillment;

export type UpdateFulfillmentProjectsAgentError = CommonErrors;

export const updateFulfillmentProjectsAgent: API.OperationMethod<UpdateFulfillmentProjectsAgentRequest, UpdateFulfillmentProjectsAgentResponse, UpdateFulfillmentProjectsAgentError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateFulfillmentProjectsAgentRequest,
  output: UpdateFulfillmentProjectsAgentResponse,
  errors: [],
}));

export interface SearchProjectsAgentRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const SearchProjectsAgentRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/agent:search" }),
  svc,
) as unknown as Schema.Schema<SearchProjectsAgentRequest>;

export type SearchProjectsAgentResponse = GoogleCloudDialogflowV2beta1SearchAgentsResponse;
export const SearchProjectsAgentResponse = GoogleCloudDialogflowV2beta1SearchAgentsResponse;

export type SearchProjectsAgentError = CommonErrors;

export const searchProjectsAgent: API.PaginatedOperationMethod<SearchProjectsAgentRequest, SearchProjectsAgentResponse, SearchProjectsAgentError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: SearchProjectsAgentRequest,
  output: SearchProjectsAgentResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface TrainProjectsAgentRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1TrainAgentRequest;
}

export const TrainProjectsAgentRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1TrainAgentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/agent:train", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TrainProjectsAgentRequest>;

export type TrainProjectsAgentResponse = GoogleLongrunningOperation;
export const TrainProjectsAgentResponse = GoogleLongrunningOperation;

export type TrainProjectsAgentError = CommonErrors;

export const trainProjectsAgent: API.OperationMethod<TrainProjectsAgentRequest, TrainProjectsAgentResponse, TrainProjectsAgentError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TrainProjectsAgentRequest,
  output: TrainProjectsAgentResponse,
  errors: [],
}));

export interface ExportProjectsAgentRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1ExportAgentRequest;
}

export const ExportProjectsAgentRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1ExportAgentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/agent:export", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExportProjectsAgentRequest>;

export type ExportProjectsAgentResponse = GoogleLongrunningOperation;
export const ExportProjectsAgentResponse = GoogleLongrunningOperation;

export type ExportProjectsAgentError = CommonErrors;

export const exportProjectsAgent: API.OperationMethod<ExportProjectsAgentRequest, ExportProjectsAgentResponse, ExportProjectsAgentError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExportProjectsAgentRequest,
  output: ExportProjectsAgentResponse,
  errors: [],
}));

export interface ImportProjectsAgentRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1ImportAgentRequest;
}

export const ImportProjectsAgentRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1ImportAgentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/agent:import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportProjectsAgentRequest>;

export type ImportProjectsAgentResponse = GoogleLongrunningOperation;
export const ImportProjectsAgentResponse = GoogleLongrunningOperation;

export type ImportProjectsAgentError = CommonErrors;

export const importProjectsAgent: API.OperationMethod<ImportProjectsAgentRequest, ImportProjectsAgentResponse, ImportProjectsAgentError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportProjectsAgentRequest,
  output: ImportProjectsAgentResponse,
  errors: [],
}));

export interface RestoreProjectsAgentRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1RestoreAgentRequest;
}

export const RestoreProjectsAgentRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1RestoreAgentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/agent:restore", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RestoreProjectsAgentRequest>;

export type RestoreProjectsAgentResponse = GoogleLongrunningOperation;
export const RestoreProjectsAgentResponse = GoogleLongrunningOperation;

export type RestoreProjectsAgentError = CommonErrors;

export const restoreProjectsAgent: API.OperationMethod<RestoreProjectsAgentRequest, RestoreProjectsAgentResponse, RestoreProjectsAgentError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RestoreProjectsAgentRequest,
  output: RestoreProjectsAgentResponse,
  errors: [],
}));

export interface GetValidationResultProjectsAgentRequest {
  parent: string;
  languageCode?: string;
}

export const GetValidationResultProjectsAgentRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/agent/validationResult" }),
  svc,
) as unknown as Schema.Schema<GetValidationResultProjectsAgentRequest>;

export type GetValidationResultProjectsAgentResponse = GoogleCloudDialogflowV2beta1ValidationResult;
export const GetValidationResultProjectsAgentResponse = GoogleCloudDialogflowV2beta1ValidationResult;

export type GetValidationResultProjectsAgentError = CommonErrors;

export const getValidationResultProjectsAgent: API.OperationMethod<GetValidationResultProjectsAgentRequest, GetValidationResultProjectsAgentResponse, GetValidationResultProjectsAgentError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetValidationResultProjectsAgentRequest,
  output: GetValidationResultProjectsAgentResponse,
  errors: [],
}));

export interface ListProjectsAgentEnvironmentsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsAgentEnvironmentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/agent/environments" }),
  svc,
) as unknown as Schema.Schema<ListProjectsAgentEnvironmentsRequest>;

export type ListProjectsAgentEnvironmentsResponse = GoogleCloudDialogflowV2beta1ListEnvironmentsResponse;
export const ListProjectsAgentEnvironmentsResponse = GoogleCloudDialogflowV2beta1ListEnvironmentsResponse;

export type ListProjectsAgentEnvironmentsError = CommonErrors;

export const listProjectsAgentEnvironments: API.PaginatedOperationMethod<ListProjectsAgentEnvironmentsRequest, ListProjectsAgentEnvironmentsResponse, ListProjectsAgentEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsAgentEnvironmentsRequest,
  output: ListProjectsAgentEnvironmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsAgentEnvironmentsRequest {
  name: string;
}

export const GetProjectsAgentEnvironmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/agent/environments/{environmentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsAgentEnvironmentsRequest>;

export type GetProjectsAgentEnvironmentsResponse = GoogleCloudDialogflowV2beta1Environment;
export const GetProjectsAgentEnvironmentsResponse = GoogleCloudDialogflowV2beta1Environment;

export type GetProjectsAgentEnvironmentsError = CommonErrors;

export const getProjectsAgentEnvironments: API.OperationMethod<GetProjectsAgentEnvironmentsRequest, GetProjectsAgentEnvironmentsResponse, GetProjectsAgentEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsAgentEnvironmentsRequest,
  output: GetProjectsAgentEnvironmentsResponse,
  errors: [],
}));

export interface CreateProjectsAgentEnvironmentsRequest {
  parent: string;
  environmentId?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Environment;
}

export const CreateProjectsAgentEnvironmentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  environmentId: Schema.optional(Schema.String).pipe(T.HttpQuery("environmentId")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Environment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/agent/environments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsAgentEnvironmentsRequest>;

export type CreateProjectsAgentEnvironmentsResponse = GoogleCloudDialogflowV2beta1Environment;
export const CreateProjectsAgentEnvironmentsResponse = GoogleCloudDialogflowV2beta1Environment;

export type CreateProjectsAgentEnvironmentsError = CommonErrors;

export const createProjectsAgentEnvironments: API.OperationMethod<CreateProjectsAgentEnvironmentsRequest, CreateProjectsAgentEnvironmentsResponse, CreateProjectsAgentEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsAgentEnvironmentsRequest,
  output: CreateProjectsAgentEnvironmentsResponse,
  errors: [],
}));

export interface PatchProjectsAgentEnvironmentsRequest {
  name: string;
  updateMask?: string;
  allowLoadToDraftAndDiscardChanges?: boolean;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Environment;
}

export const PatchProjectsAgentEnvironmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  allowLoadToDraftAndDiscardChanges: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowLoadToDraftAndDiscardChanges")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Environment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/agent/environments/{environmentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsAgentEnvironmentsRequest>;

export type PatchProjectsAgentEnvironmentsResponse = GoogleCloudDialogflowV2beta1Environment;
export const PatchProjectsAgentEnvironmentsResponse = GoogleCloudDialogflowV2beta1Environment;

export type PatchProjectsAgentEnvironmentsError = CommonErrors;

export const patchProjectsAgentEnvironments: API.OperationMethod<PatchProjectsAgentEnvironmentsRequest, PatchProjectsAgentEnvironmentsResponse, PatchProjectsAgentEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsAgentEnvironmentsRequest,
  output: PatchProjectsAgentEnvironmentsResponse,
  errors: [],
}));

export interface DeleteProjectsAgentEnvironmentsRequest {
  name: string;
}

export const DeleteProjectsAgentEnvironmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/agent/environments/{environmentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsAgentEnvironmentsRequest>;

export type DeleteProjectsAgentEnvironmentsResponse = GoogleProtobufEmpty;
export const DeleteProjectsAgentEnvironmentsResponse = GoogleProtobufEmpty;

export type DeleteProjectsAgentEnvironmentsError = CommonErrors;

export const deleteProjectsAgentEnvironments: API.OperationMethod<DeleteProjectsAgentEnvironmentsRequest, DeleteProjectsAgentEnvironmentsResponse, DeleteProjectsAgentEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsAgentEnvironmentsRequest,
  output: DeleteProjectsAgentEnvironmentsResponse,
  errors: [],
}));

export interface GetHistoryProjectsAgentEnvironmentsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const GetHistoryProjectsAgentEnvironmentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/agent/environments/{environmentsId}/history" }),
  svc,
) as unknown as Schema.Schema<GetHistoryProjectsAgentEnvironmentsRequest>;

export type GetHistoryProjectsAgentEnvironmentsResponse = GoogleCloudDialogflowV2beta1EnvironmentHistory;
export const GetHistoryProjectsAgentEnvironmentsResponse = GoogleCloudDialogflowV2beta1EnvironmentHistory;

export type GetHistoryProjectsAgentEnvironmentsError = CommonErrors;

export const getHistoryProjectsAgentEnvironments: API.PaginatedOperationMethod<GetHistoryProjectsAgentEnvironmentsRequest, GetHistoryProjectsAgentEnvironmentsResponse, GetHistoryProjectsAgentEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: GetHistoryProjectsAgentEnvironmentsRequest,
  output: GetHistoryProjectsAgentEnvironmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteContextsProjectsAgentEnvironmentsUsersSessionsRequest {
  parent: string;
}

export const DeleteContextsProjectsAgentEnvironmentsUsersSessionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/agent/environments/{environmentsId}/users/{usersId}/sessions/{sessionsId}/contexts" }),
  svc,
) as unknown as Schema.Schema<DeleteContextsProjectsAgentEnvironmentsUsersSessionsRequest>;

export type DeleteContextsProjectsAgentEnvironmentsUsersSessionsResponse = GoogleProtobufEmpty;
export const DeleteContextsProjectsAgentEnvironmentsUsersSessionsResponse = GoogleProtobufEmpty;

export type DeleteContextsProjectsAgentEnvironmentsUsersSessionsError = CommonErrors;

export const deleteContextsProjectsAgentEnvironmentsUsersSessions: API.OperationMethod<DeleteContextsProjectsAgentEnvironmentsUsersSessionsRequest, DeleteContextsProjectsAgentEnvironmentsUsersSessionsResponse, DeleteContextsProjectsAgentEnvironmentsUsersSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteContextsProjectsAgentEnvironmentsUsersSessionsRequest,
  output: DeleteContextsProjectsAgentEnvironmentsUsersSessionsResponse,
  errors: [],
}));

export interface DetectIntentProjectsAgentEnvironmentsUsersSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1DetectIntentRequest;
}

export const DetectIntentProjectsAgentEnvironmentsUsersSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1DetectIntentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/agent/environments/{environmentsId}/users/{usersId}/sessions/{sessionsId}:detectIntent", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DetectIntentProjectsAgentEnvironmentsUsersSessionsRequest>;

export type DetectIntentProjectsAgentEnvironmentsUsersSessionsResponse = GoogleCloudDialogflowV2beta1DetectIntentResponse;
export const DetectIntentProjectsAgentEnvironmentsUsersSessionsResponse = GoogleCloudDialogflowV2beta1DetectIntentResponse;

export type DetectIntentProjectsAgentEnvironmentsUsersSessionsError = CommonErrors;

export const detectIntentProjectsAgentEnvironmentsUsersSessions: API.OperationMethod<DetectIntentProjectsAgentEnvironmentsUsersSessionsRequest, DetectIntentProjectsAgentEnvironmentsUsersSessionsResponse, DetectIntentProjectsAgentEnvironmentsUsersSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DetectIntentProjectsAgentEnvironmentsUsersSessionsRequest,
  output: DetectIntentProjectsAgentEnvironmentsUsersSessionsResponse,
  errors: [],
}));

export interface ListProjectsAgentEnvironmentsUsersSessionsContextsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsAgentEnvironmentsUsersSessionsContextsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/agent/environments/{environmentsId}/users/{usersId}/sessions/{sessionsId}/contexts" }),
  svc,
) as unknown as Schema.Schema<ListProjectsAgentEnvironmentsUsersSessionsContextsRequest>;

export type ListProjectsAgentEnvironmentsUsersSessionsContextsResponse = GoogleCloudDialogflowV2beta1ListContextsResponse;
export const ListProjectsAgentEnvironmentsUsersSessionsContextsResponse = GoogleCloudDialogflowV2beta1ListContextsResponse;

export type ListProjectsAgentEnvironmentsUsersSessionsContextsError = CommonErrors;

export const listProjectsAgentEnvironmentsUsersSessionsContexts: API.PaginatedOperationMethod<ListProjectsAgentEnvironmentsUsersSessionsContextsRequest, ListProjectsAgentEnvironmentsUsersSessionsContextsResponse, ListProjectsAgentEnvironmentsUsersSessionsContextsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsAgentEnvironmentsUsersSessionsContextsRequest,
  output: ListProjectsAgentEnvironmentsUsersSessionsContextsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsAgentEnvironmentsUsersSessionsContextsRequest {
  name: string;
}

export const GetProjectsAgentEnvironmentsUsersSessionsContextsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/agent/environments/{environmentsId}/users/{usersId}/sessions/{sessionsId}/contexts/{contextsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsAgentEnvironmentsUsersSessionsContextsRequest>;

export type GetProjectsAgentEnvironmentsUsersSessionsContextsResponse = GoogleCloudDialogflowV2beta1Context;
export const GetProjectsAgentEnvironmentsUsersSessionsContextsResponse = GoogleCloudDialogflowV2beta1Context;

export type GetProjectsAgentEnvironmentsUsersSessionsContextsError = CommonErrors;

export const getProjectsAgentEnvironmentsUsersSessionsContexts: API.OperationMethod<GetProjectsAgentEnvironmentsUsersSessionsContextsRequest, GetProjectsAgentEnvironmentsUsersSessionsContextsResponse, GetProjectsAgentEnvironmentsUsersSessionsContextsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsAgentEnvironmentsUsersSessionsContextsRequest,
  output: GetProjectsAgentEnvironmentsUsersSessionsContextsResponse,
  errors: [],
}));

export interface CreateProjectsAgentEnvironmentsUsersSessionsContextsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Context;
}

export const CreateProjectsAgentEnvironmentsUsersSessionsContextsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Context).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/agent/environments/{environmentsId}/users/{usersId}/sessions/{sessionsId}/contexts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsAgentEnvironmentsUsersSessionsContextsRequest>;

export type CreateProjectsAgentEnvironmentsUsersSessionsContextsResponse = GoogleCloudDialogflowV2beta1Context;
export const CreateProjectsAgentEnvironmentsUsersSessionsContextsResponse = GoogleCloudDialogflowV2beta1Context;

export type CreateProjectsAgentEnvironmentsUsersSessionsContextsError = CommonErrors;

export const createProjectsAgentEnvironmentsUsersSessionsContexts: API.OperationMethod<CreateProjectsAgentEnvironmentsUsersSessionsContextsRequest, CreateProjectsAgentEnvironmentsUsersSessionsContextsResponse, CreateProjectsAgentEnvironmentsUsersSessionsContextsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsAgentEnvironmentsUsersSessionsContextsRequest,
  output: CreateProjectsAgentEnvironmentsUsersSessionsContextsResponse,
  errors: [],
}));

export interface PatchProjectsAgentEnvironmentsUsersSessionsContextsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Context;
}

export const PatchProjectsAgentEnvironmentsUsersSessionsContextsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Context).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/agent/environments/{environmentsId}/users/{usersId}/sessions/{sessionsId}/contexts/{contextsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsAgentEnvironmentsUsersSessionsContextsRequest>;

export type PatchProjectsAgentEnvironmentsUsersSessionsContextsResponse = GoogleCloudDialogflowV2beta1Context;
export const PatchProjectsAgentEnvironmentsUsersSessionsContextsResponse = GoogleCloudDialogflowV2beta1Context;

export type PatchProjectsAgentEnvironmentsUsersSessionsContextsError = CommonErrors;

export const patchProjectsAgentEnvironmentsUsersSessionsContexts: API.OperationMethod<PatchProjectsAgentEnvironmentsUsersSessionsContextsRequest, PatchProjectsAgentEnvironmentsUsersSessionsContextsResponse, PatchProjectsAgentEnvironmentsUsersSessionsContextsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsAgentEnvironmentsUsersSessionsContextsRequest,
  output: PatchProjectsAgentEnvironmentsUsersSessionsContextsResponse,
  errors: [],
}));

export interface DeleteProjectsAgentEnvironmentsUsersSessionsContextsRequest {
  name: string;
}

export const DeleteProjectsAgentEnvironmentsUsersSessionsContextsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/agent/environments/{environmentsId}/users/{usersId}/sessions/{sessionsId}/contexts/{contextsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsAgentEnvironmentsUsersSessionsContextsRequest>;

export type DeleteProjectsAgentEnvironmentsUsersSessionsContextsResponse = GoogleProtobufEmpty;
export const DeleteProjectsAgentEnvironmentsUsersSessionsContextsResponse = GoogleProtobufEmpty;

export type DeleteProjectsAgentEnvironmentsUsersSessionsContextsError = CommonErrors;

export const deleteProjectsAgentEnvironmentsUsersSessionsContexts: API.OperationMethod<DeleteProjectsAgentEnvironmentsUsersSessionsContextsRequest, DeleteProjectsAgentEnvironmentsUsersSessionsContextsResponse, DeleteProjectsAgentEnvironmentsUsersSessionsContextsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsAgentEnvironmentsUsersSessionsContextsRequest,
  output: DeleteProjectsAgentEnvironmentsUsersSessionsContextsResponse,
  errors: [],
}));

export interface ListProjectsAgentEnvironmentsUsersSessionsEntityTypesRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsAgentEnvironmentsUsersSessionsEntityTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/agent/environments/{environmentsId}/users/{usersId}/sessions/{sessionsId}/entityTypes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsAgentEnvironmentsUsersSessionsEntityTypesRequest>;

export type ListProjectsAgentEnvironmentsUsersSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1ListSessionEntityTypesResponse;
export const ListProjectsAgentEnvironmentsUsersSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1ListSessionEntityTypesResponse;

export type ListProjectsAgentEnvironmentsUsersSessionsEntityTypesError = CommonErrors;

export const listProjectsAgentEnvironmentsUsersSessionsEntityTypes: API.PaginatedOperationMethod<ListProjectsAgentEnvironmentsUsersSessionsEntityTypesRequest, ListProjectsAgentEnvironmentsUsersSessionsEntityTypesResponse, ListProjectsAgentEnvironmentsUsersSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsAgentEnvironmentsUsersSessionsEntityTypesRequest,
  output: ListProjectsAgentEnvironmentsUsersSessionsEntityTypesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsAgentEnvironmentsUsersSessionsEntityTypesRequest {
  name: string;
}

export const GetProjectsAgentEnvironmentsUsersSessionsEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/agent/environments/{environmentsId}/users/{usersId}/sessions/{sessionsId}/entityTypes/{entityTypesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsAgentEnvironmentsUsersSessionsEntityTypesRequest>;

export type GetProjectsAgentEnvironmentsUsersSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1SessionEntityType;
export const GetProjectsAgentEnvironmentsUsersSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1SessionEntityType;

export type GetProjectsAgentEnvironmentsUsersSessionsEntityTypesError = CommonErrors;

export const getProjectsAgentEnvironmentsUsersSessionsEntityTypes: API.OperationMethod<GetProjectsAgentEnvironmentsUsersSessionsEntityTypesRequest, GetProjectsAgentEnvironmentsUsersSessionsEntityTypesResponse, GetProjectsAgentEnvironmentsUsersSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsAgentEnvironmentsUsersSessionsEntityTypesRequest,
  output: GetProjectsAgentEnvironmentsUsersSessionsEntityTypesResponse,
  errors: [],
}));

export interface CreateProjectsAgentEnvironmentsUsersSessionsEntityTypesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1SessionEntityType;
}

export const CreateProjectsAgentEnvironmentsUsersSessionsEntityTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1SessionEntityType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/agent/environments/{environmentsId}/users/{usersId}/sessions/{sessionsId}/entityTypes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsAgentEnvironmentsUsersSessionsEntityTypesRequest>;

export type CreateProjectsAgentEnvironmentsUsersSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1SessionEntityType;
export const CreateProjectsAgentEnvironmentsUsersSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1SessionEntityType;

export type CreateProjectsAgentEnvironmentsUsersSessionsEntityTypesError = CommonErrors;

export const createProjectsAgentEnvironmentsUsersSessionsEntityTypes: API.OperationMethod<CreateProjectsAgentEnvironmentsUsersSessionsEntityTypesRequest, CreateProjectsAgentEnvironmentsUsersSessionsEntityTypesResponse, CreateProjectsAgentEnvironmentsUsersSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsAgentEnvironmentsUsersSessionsEntityTypesRequest,
  output: CreateProjectsAgentEnvironmentsUsersSessionsEntityTypesResponse,
  errors: [],
}));

export interface PatchProjectsAgentEnvironmentsUsersSessionsEntityTypesRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1SessionEntityType;
}

export const PatchProjectsAgentEnvironmentsUsersSessionsEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1SessionEntityType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/agent/environments/{environmentsId}/users/{usersId}/sessions/{sessionsId}/entityTypes/{entityTypesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsAgentEnvironmentsUsersSessionsEntityTypesRequest>;

export type PatchProjectsAgentEnvironmentsUsersSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1SessionEntityType;
export const PatchProjectsAgentEnvironmentsUsersSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1SessionEntityType;

export type PatchProjectsAgentEnvironmentsUsersSessionsEntityTypesError = CommonErrors;

export const patchProjectsAgentEnvironmentsUsersSessionsEntityTypes: API.OperationMethod<PatchProjectsAgentEnvironmentsUsersSessionsEntityTypesRequest, PatchProjectsAgentEnvironmentsUsersSessionsEntityTypesResponse, PatchProjectsAgentEnvironmentsUsersSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsAgentEnvironmentsUsersSessionsEntityTypesRequest,
  output: PatchProjectsAgentEnvironmentsUsersSessionsEntityTypesResponse,
  errors: [],
}));

export interface DeleteProjectsAgentEnvironmentsUsersSessionsEntityTypesRequest {
  name: string;
}

export const DeleteProjectsAgentEnvironmentsUsersSessionsEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/agent/environments/{environmentsId}/users/{usersId}/sessions/{sessionsId}/entityTypes/{entityTypesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsAgentEnvironmentsUsersSessionsEntityTypesRequest>;

export type DeleteProjectsAgentEnvironmentsUsersSessionsEntityTypesResponse = GoogleProtobufEmpty;
export const DeleteProjectsAgentEnvironmentsUsersSessionsEntityTypesResponse = GoogleProtobufEmpty;

export type DeleteProjectsAgentEnvironmentsUsersSessionsEntityTypesError = CommonErrors;

export const deleteProjectsAgentEnvironmentsUsersSessionsEntityTypes: API.OperationMethod<DeleteProjectsAgentEnvironmentsUsersSessionsEntityTypesRequest, DeleteProjectsAgentEnvironmentsUsersSessionsEntityTypesResponse, DeleteProjectsAgentEnvironmentsUsersSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsAgentEnvironmentsUsersSessionsEntityTypesRequest,
  output: DeleteProjectsAgentEnvironmentsUsersSessionsEntityTypesResponse,
  errors: [],
}));

export interface ListProjectsAgentEnvironmentsIntentsRequest {
  parent: string;
  languageCode?: string;
  intentView?: "INTENT_VIEW_UNSPECIFIED" | "INTENT_VIEW_FULL" | (string & {});
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsAgentEnvironmentsIntentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  intentView: Schema.optional(Schema.String).pipe(T.HttpQuery("intentView")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/agent/environments/{environmentsId}/intents" }),
  svc,
) as unknown as Schema.Schema<ListProjectsAgentEnvironmentsIntentsRequest>;

export type ListProjectsAgentEnvironmentsIntentsResponse = GoogleCloudDialogflowV2beta1ListIntentsResponse;
export const ListProjectsAgentEnvironmentsIntentsResponse = GoogleCloudDialogflowV2beta1ListIntentsResponse;

export type ListProjectsAgentEnvironmentsIntentsError = CommonErrors;

export const listProjectsAgentEnvironmentsIntents: API.PaginatedOperationMethod<ListProjectsAgentEnvironmentsIntentsRequest, ListProjectsAgentEnvironmentsIntentsResponse, ListProjectsAgentEnvironmentsIntentsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsAgentEnvironmentsIntentsRequest,
  output: ListProjectsAgentEnvironmentsIntentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteContextsProjectsAgentSessionsRequest {
  parent: string;
}

export const DeleteContextsProjectsAgentSessionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/agent/sessions/{sessionsId}/contexts" }),
  svc,
) as unknown as Schema.Schema<DeleteContextsProjectsAgentSessionsRequest>;

export type DeleteContextsProjectsAgentSessionsResponse = GoogleProtobufEmpty;
export const DeleteContextsProjectsAgentSessionsResponse = GoogleProtobufEmpty;

export type DeleteContextsProjectsAgentSessionsError = CommonErrors;

export const deleteContextsProjectsAgentSessions: API.OperationMethod<DeleteContextsProjectsAgentSessionsRequest, DeleteContextsProjectsAgentSessionsResponse, DeleteContextsProjectsAgentSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteContextsProjectsAgentSessionsRequest,
  output: DeleteContextsProjectsAgentSessionsResponse,
  errors: [],
}));

export interface DetectIntentProjectsAgentSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1DetectIntentRequest;
}

export const DetectIntentProjectsAgentSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1DetectIntentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/agent/sessions/{sessionsId}:detectIntent", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DetectIntentProjectsAgentSessionsRequest>;

export type DetectIntentProjectsAgentSessionsResponse = GoogleCloudDialogflowV2beta1DetectIntentResponse;
export const DetectIntentProjectsAgentSessionsResponse = GoogleCloudDialogflowV2beta1DetectIntentResponse;

export type DetectIntentProjectsAgentSessionsError = CommonErrors;

export const detectIntentProjectsAgentSessions: API.OperationMethod<DetectIntentProjectsAgentSessionsRequest, DetectIntentProjectsAgentSessionsResponse, DetectIntentProjectsAgentSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DetectIntentProjectsAgentSessionsRequest,
  output: DetectIntentProjectsAgentSessionsResponse,
  errors: [],
}));

export interface ListProjectsAgentSessionsContextsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsAgentSessionsContextsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/agent/sessions/{sessionsId}/contexts" }),
  svc,
) as unknown as Schema.Schema<ListProjectsAgentSessionsContextsRequest>;

export type ListProjectsAgentSessionsContextsResponse = GoogleCloudDialogflowV2beta1ListContextsResponse;
export const ListProjectsAgentSessionsContextsResponse = GoogleCloudDialogflowV2beta1ListContextsResponse;

export type ListProjectsAgentSessionsContextsError = CommonErrors;

export const listProjectsAgentSessionsContexts: API.PaginatedOperationMethod<ListProjectsAgentSessionsContextsRequest, ListProjectsAgentSessionsContextsResponse, ListProjectsAgentSessionsContextsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsAgentSessionsContextsRequest,
  output: ListProjectsAgentSessionsContextsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsAgentSessionsContextsRequest {
  name: string;
}

export const GetProjectsAgentSessionsContextsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/agent/sessions/{sessionsId}/contexts/{contextsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsAgentSessionsContextsRequest>;

export type GetProjectsAgentSessionsContextsResponse = GoogleCloudDialogflowV2beta1Context;
export const GetProjectsAgentSessionsContextsResponse = GoogleCloudDialogflowV2beta1Context;

export type GetProjectsAgentSessionsContextsError = CommonErrors;

export const getProjectsAgentSessionsContexts: API.OperationMethod<GetProjectsAgentSessionsContextsRequest, GetProjectsAgentSessionsContextsResponse, GetProjectsAgentSessionsContextsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsAgentSessionsContextsRequest,
  output: GetProjectsAgentSessionsContextsResponse,
  errors: [],
}));

export interface CreateProjectsAgentSessionsContextsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Context;
}

export const CreateProjectsAgentSessionsContextsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Context).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/agent/sessions/{sessionsId}/contexts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsAgentSessionsContextsRequest>;

export type CreateProjectsAgentSessionsContextsResponse = GoogleCloudDialogflowV2beta1Context;
export const CreateProjectsAgentSessionsContextsResponse = GoogleCloudDialogflowV2beta1Context;

export type CreateProjectsAgentSessionsContextsError = CommonErrors;

export const createProjectsAgentSessionsContexts: API.OperationMethod<CreateProjectsAgentSessionsContextsRequest, CreateProjectsAgentSessionsContextsResponse, CreateProjectsAgentSessionsContextsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsAgentSessionsContextsRequest,
  output: CreateProjectsAgentSessionsContextsResponse,
  errors: [],
}));

export interface PatchProjectsAgentSessionsContextsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Context;
}

export const PatchProjectsAgentSessionsContextsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Context).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/agent/sessions/{sessionsId}/contexts/{contextsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsAgentSessionsContextsRequest>;

export type PatchProjectsAgentSessionsContextsResponse = GoogleCloudDialogflowV2beta1Context;
export const PatchProjectsAgentSessionsContextsResponse = GoogleCloudDialogflowV2beta1Context;

export type PatchProjectsAgentSessionsContextsError = CommonErrors;

export const patchProjectsAgentSessionsContexts: API.OperationMethod<PatchProjectsAgentSessionsContextsRequest, PatchProjectsAgentSessionsContextsResponse, PatchProjectsAgentSessionsContextsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsAgentSessionsContextsRequest,
  output: PatchProjectsAgentSessionsContextsResponse,
  errors: [],
}));

export interface DeleteProjectsAgentSessionsContextsRequest {
  name: string;
}

export const DeleteProjectsAgentSessionsContextsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/agent/sessions/{sessionsId}/contexts/{contextsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsAgentSessionsContextsRequest>;

export type DeleteProjectsAgentSessionsContextsResponse = GoogleProtobufEmpty;
export const DeleteProjectsAgentSessionsContextsResponse = GoogleProtobufEmpty;

export type DeleteProjectsAgentSessionsContextsError = CommonErrors;

export const deleteProjectsAgentSessionsContexts: API.OperationMethod<DeleteProjectsAgentSessionsContextsRequest, DeleteProjectsAgentSessionsContextsResponse, DeleteProjectsAgentSessionsContextsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsAgentSessionsContextsRequest,
  output: DeleteProjectsAgentSessionsContextsResponse,
  errors: [],
}));

export interface ListProjectsAgentSessionsEntityTypesRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsAgentSessionsEntityTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/agent/sessions/{sessionsId}/entityTypes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsAgentSessionsEntityTypesRequest>;

export type ListProjectsAgentSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1ListSessionEntityTypesResponse;
export const ListProjectsAgentSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1ListSessionEntityTypesResponse;

export type ListProjectsAgentSessionsEntityTypesError = CommonErrors;

export const listProjectsAgentSessionsEntityTypes: API.PaginatedOperationMethod<ListProjectsAgentSessionsEntityTypesRequest, ListProjectsAgentSessionsEntityTypesResponse, ListProjectsAgentSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsAgentSessionsEntityTypesRequest,
  output: ListProjectsAgentSessionsEntityTypesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsAgentSessionsEntityTypesRequest {
  name: string;
}

export const GetProjectsAgentSessionsEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/agent/sessions/{sessionsId}/entityTypes/{entityTypesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsAgentSessionsEntityTypesRequest>;

export type GetProjectsAgentSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1SessionEntityType;
export const GetProjectsAgentSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1SessionEntityType;

export type GetProjectsAgentSessionsEntityTypesError = CommonErrors;

export const getProjectsAgentSessionsEntityTypes: API.OperationMethod<GetProjectsAgentSessionsEntityTypesRequest, GetProjectsAgentSessionsEntityTypesResponse, GetProjectsAgentSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsAgentSessionsEntityTypesRequest,
  output: GetProjectsAgentSessionsEntityTypesResponse,
  errors: [],
}));

export interface CreateProjectsAgentSessionsEntityTypesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1SessionEntityType;
}

export const CreateProjectsAgentSessionsEntityTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1SessionEntityType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/agent/sessions/{sessionsId}/entityTypes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsAgentSessionsEntityTypesRequest>;

export type CreateProjectsAgentSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1SessionEntityType;
export const CreateProjectsAgentSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1SessionEntityType;

export type CreateProjectsAgentSessionsEntityTypesError = CommonErrors;

export const createProjectsAgentSessionsEntityTypes: API.OperationMethod<CreateProjectsAgentSessionsEntityTypesRequest, CreateProjectsAgentSessionsEntityTypesResponse, CreateProjectsAgentSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsAgentSessionsEntityTypesRequest,
  output: CreateProjectsAgentSessionsEntityTypesResponse,
  errors: [],
}));

export interface PatchProjectsAgentSessionsEntityTypesRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1SessionEntityType;
}

export const PatchProjectsAgentSessionsEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1SessionEntityType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/agent/sessions/{sessionsId}/entityTypes/{entityTypesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsAgentSessionsEntityTypesRequest>;

export type PatchProjectsAgentSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1SessionEntityType;
export const PatchProjectsAgentSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1SessionEntityType;

export type PatchProjectsAgentSessionsEntityTypesError = CommonErrors;

export const patchProjectsAgentSessionsEntityTypes: API.OperationMethod<PatchProjectsAgentSessionsEntityTypesRequest, PatchProjectsAgentSessionsEntityTypesResponse, PatchProjectsAgentSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsAgentSessionsEntityTypesRequest,
  output: PatchProjectsAgentSessionsEntityTypesResponse,
  errors: [],
}));

export interface DeleteProjectsAgentSessionsEntityTypesRequest {
  name: string;
}

export const DeleteProjectsAgentSessionsEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/agent/sessions/{sessionsId}/entityTypes/{entityTypesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsAgentSessionsEntityTypesRequest>;

export type DeleteProjectsAgentSessionsEntityTypesResponse = GoogleProtobufEmpty;
export const DeleteProjectsAgentSessionsEntityTypesResponse = GoogleProtobufEmpty;

export type DeleteProjectsAgentSessionsEntityTypesError = CommonErrors;

export const deleteProjectsAgentSessionsEntityTypes: API.OperationMethod<DeleteProjectsAgentSessionsEntityTypesRequest, DeleteProjectsAgentSessionsEntityTypesResponse, DeleteProjectsAgentSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsAgentSessionsEntityTypesRequest,
  output: DeleteProjectsAgentSessionsEntityTypesResponse,
  errors: [],
}));

export interface ListProjectsAgentIntentsRequest {
  parent: string;
  languageCode?: string;
  intentView?: "INTENT_VIEW_UNSPECIFIED" | "INTENT_VIEW_FULL" | (string & {});
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsAgentIntentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  intentView: Schema.optional(Schema.String).pipe(T.HttpQuery("intentView")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/agent/intents" }),
  svc,
) as unknown as Schema.Schema<ListProjectsAgentIntentsRequest>;

export type ListProjectsAgentIntentsResponse = GoogleCloudDialogflowV2beta1ListIntentsResponse;
export const ListProjectsAgentIntentsResponse = GoogleCloudDialogflowV2beta1ListIntentsResponse;

export type ListProjectsAgentIntentsError = CommonErrors;

export const listProjectsAgentIntents: API.PaginatedOperationMethod<ListProjectsAgentIntentsRequest, ListProjectsAgentIntentsResponse, ListProjectsAgentIntentsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsAgentIntentsRequest,
  output: ListProjectsAgentIntentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsAgentIntentsRequest {
  name: string;
  languageCode?: string;
  intentView?: "INTENT_VIEW_UNSPECIFIED" | "INTENT_VIEW_FULL" | (string & {});
}

export const GetProjectsAgentIntentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  intentView: Schema.optional(Schema.String).pipe(T.HttpQuery("intentView")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/agent/intents/{intentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsAgentIntentsRequest>;

export type GetProjectsAgentIntentsResponse = GoogleCloudDialogflowV2beta1Intent;
export const GetProjectsAgentIntentsResponse = GoogleCloudDialogflowV2beta1Intent;

export type GetProjectsAgentIntentsError = CommonErrors;

export const getProjectsAgentIntents: API.OperationMethod<GetProjectsAgentIntentsRequest, GetProjectsAgentIntentsResponse, GetProjectsAgentIntentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsAgentIntentsRequest,
  output: GetProjectsAgentIntentsResponse,
  errors: [],
}));

export interface CreateProjectsAgentIntentsRequest {
  parent: string;
  languageCode?: string;
  intentView?: "INTENT_VIEW_UNSPECIFIED" | "INTENT_VIEW_FULL" | (string & {});
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Intent;
}

export const CreateProjectsAgentIntentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  intentView: Schema.optional(Schema.String).pipe(T.HttpQuery("intentView")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Intent).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/agent/intents", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsAgentIntentsRequest>;

export type CreateProjectsAgentIntentsResponse = GoogleCloudDialogflowV2beta1Intent;
export const CreateProjectsAgentIntentsResponse = GoogleCloudDialogflowV2beta1Intent;

export type CreateProjectsAgentIntentsError = CommonErrors;

export const createProjectsAgentIntents: API.OperationMethod<CreateProjectsAgentIntentsRequest, CreateProjectsAgentIntentsResponse, CreateProjectsAgentIntentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsAgentIntentsRequest,
  output: CreateProjectsAgentIntentsResponse,
  errors: [],
}));

export interface PatchProjectsAgentIntentsRequest {
  name: string;
  languageCode?: string;
  updateMask?: string;
  intentView?: "INTENT_VIEW_UNSPECIFIED" | "INTENT_VIEW_FULL" | (string & {});
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Intent;
}

export const PatchProjectsAgentIntentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  intentView: Schema.optional(Schema.String).pipe(T.HttpQuery("intentView")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Intent).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/agent/intents/{intentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsAgentIntentsRequest>;

export type PatchProjectsAgentIntentsResponse = GoogleCloudDialogflowV2beta1Intent;
export const PatchProjectsAgentIntentsResponse = GoogleCloudDialogflowV2beta1Intent;

export type PatchProjectsAgentIntentsError = CommonErrors;

export const patchProjectsAgentIntents: API.OperationMethod<PatchProjectsAgentIntentsRequest, PatchProjectsAgentIntentsResponse, PatchProjectsAgentIntentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsAgentIntentsRequest,
  output: PatchProjectsAgentIntentsResponse,
  errors: [],
}));

export interface DeleteProjectsAgentIntentsRequest {
  name: string;
}

export const DeleteProjectsAgentIntentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/agent/intents/{intentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsAgentIntentsRequest>;

export type DeleteProjectsAgentIntentsResponse = GoogleProtobufEmpty;
export const DeleteProjectsAgentIntentsResponse = GoogleProtobufEmpty;

export type DeleteProjectsAgentIntentsError = CommonErrors;

export const deleteProjectsAgentIntents: API.OperationMethod<DeleteProjectsAgentIntentsRequest, DeleteProjectsAgentIntentsResponse, DeleteProjectsAgentIntentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsAgentIntentsRequest,
  output: DeleteProjectsAgentIntentsResponse,
  errors: [],
}));

export interface BatchUpdateProjectsAgentIntentsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1BatchUpdateIntentsRequest;
}

export const BatchUpdateProjectsAgentIntentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1BatchUpdateIntentsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/agent/intents:batchUpdate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchUpdateProjectsAgentIntentsRequest>;

export type BatchUpdateProjectsAgentIntentsResponse = GoogleLongrunningOperation;
export const BatchUpdateProjectsAgentIntentsResponse = GoogleLongrunningOperation;

export type BatchUpdateProjectsAgentIntentsError = CommonErrors;

export const batchUpdateProjectsAgentIntents: API.OperationMethod<BatchUpdateProjectsAgentIntentsRequest, BatchUpdateProjectsAgentIntentsResponse, BatchUpdateProjectsAgentIntentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchUpdateProjectsAgentIntentsRequest,
  output: BatchUpdateProjectsAgentIntentsResponse,
  errors: [],
}));

export interface BatchDeleteProjectsAgentIntentsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1BatchDeleteIntentsRequest;
}

export const BatchDeleteProjectsAgentIntentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1BatchDeleteIntentsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/agent/intents:batchDelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchDeleteProjectsAgentIntentsRequest>;

export type BatchDeleteProjectsAgentIntentsResponse = GoogleLongrunningOperation;
export const BatchDeleteProjectsAgentIntentsResponse = GoogleLongrunningOperation;

export type BatchDeleteProjectsAgentIntentsError = CommonErrors;

export const batchDeleteProjectsAgentIntents: API.OperationMethod<BatchDeleteProjectsAgentIntentsRequest, BatchDeleteProjectsAgentIntentsResponse, BatchDeleteProjectsAgentIntentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchDeleteProjectsAgentIntentsRequest,
  output: BatchDeleteProjectsAgentIntentsResponse,
  errors: [],
}));

export interface ListProjectsAgentEntityTypesRequest {
  parent: string;
  languageCode?: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsAgentEntityTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/agent/entityTypes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsAgentEntityTypesRequest>;

export type ListProjectsAgentEntityTypesResponse = GoogleCloudDialogflowV2beta1ListEntityTypesResponse;
export const ListProjectsAgentEntityTypesResponse = GoogleCloudDialogflowV2beta1ListEntityTypesResponse;

export type ListProjectsAgentEntityTypesError = CommonErrors;

export const listProjectsAgentEntityTypes: API.PaginatedOperationMethod<ListProjectsAgentEntityTypesRequest, ListProjectsAgentEntityTypesResponse, ListProjectsAgentEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsAgentEntityTypesRequest,
  output: ListProjectsAgentEntityTypesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsAgentEntityTypesRequest {
  name: string;
  languageCode?: string;
}

export const GetProjectsAgentEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/agent/entityTypes/{entityTypesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsAgentEntityTypesRequest>;

export type GetProjectsAgentEntityTypesResponse = GoogleCloudDialogflowV2beta1EntityType;
export const GetProjectsAgentEntityTypesResponse = GoogleCloudDialogflowV2beta1EntityType;

export type GetProjectsAgentEntityTypesError = CommonErrors;

export const getProjectsAgentEntityTypes: API.OperationMethod<GetProjectsAgentEntityTypesRequest, GetProjectsAgentEntityTypesResponse, GetProjectsAgentEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsAgentEntityTypesRequest,
  output: GetProjectsAgentEntityTypesResponse,
  errors: [],
}));

export interface CreateProjectsAgentEntityTypesRequest {
  parent: string;
  languageCode?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1EntityType;
}

export const CreateProjectsAgentEntityTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1EntityType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/agent/entityTypes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsAgentEntityTypesRequest>;

export type CreateProjectsAgentEntityTypesResponse = GoogleCloudDialogflowV2beta1EntityType;
export const CreateProjectsAgentEntityTypesResponse = GoogleCloudDialogflowV2beta1EntityType;

export type CreateProjectsAgentEntityTypesError = CommonErrors;

export const createProjectsAgentEntityTypes: API.OperationMethod<CreateProjectsAgentEntityTypesRequest, CreateProjectsAgentEntityTypesResponse, CreateProjectsAgentEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsAgentEntityTypesRequest,
  output: CreateProjectsAgentEntityTypesResponse,
  errors: [],
}));

export interface PatchProjectsAgentEntityTypesRequest {
  name: string;
  languageCode?: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1EntityType;
}

export const PatchProjectsAgentEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1EntityType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/agent/entityTypes/{entityTypesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsAgentEntityTypesRequest>;

export type PatchProjectsAgentEntityTypesResponse = GoogleCloudDialogflowV2beta1EntityType;
export const PatchProjectsAgentEntityTypesResponse = GoogleCloudDialogflowV2beta1EntityType;

export type PatchProjectsAgentEntityTypesError = CommonErrors;

export const patchProjectsAgentEntityTypes: API.OperationMethod<PatchProjectsAgentEntityTypesRequest, PatchProjectsAgentEntityTypesResponse, PatchProjectsAgentEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsAgentEntityTypesRequest,
  output: PatchProjectsAgentEntityTypesResponse,
  errors: [],
}));

export interface DeleteProjectsAgentEntityTypesRequest {
  name: string;
}

export const DeleteProjectsAgentEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/agent/entityTypes/{entityTypesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsAgentEntityTypesRequest>;

export type DeleteProjectsAgentEntityTypesResponse = GoogleProtobufEmpty;
export const DeleteProjectsAgentEntityTypesResponse = GoogleProtobufEmpty;

export type DeleteProjectsAgentEntityTypesError = CommonErrors;

export const deleteProjectsAgentEntityTypes: API.OperationMethod<DeleteProjectsAgentEntityTypesRequest, DeleteProjectsAgentEntityTypesResponse, DeleteProjectsAgentEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsAgentEntityTypesRequest,
  output: DeleteProjectsAgentEntityTypesResponse,
  errors: [],
}));

export interface BatchUpdateProjectsAgentEntityTypesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesRequest;
}

export const BatchUpdateProjectsAgentEntityTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/agent/entityTypes:batchUpdate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchUpdateProjectsAgentEntityTypesRequest>;

export type BatchUpdateProjectsAgentEntityTypesResponse = GoogleLongrunningOperation;
export const BatchUpdateProjectsAgentEntityTypesResponse = GoogleLongrunningOperation;

export type BatchUpdateProjectsAgentEntityTypesError = CommonErrors;

export const batchUpdateProjectsAgentEntityTypes: API.OperationMethod<BatchUpdateProjectsAgentEntityTypesRequest, BatchUpdateProjectsAgentEntityTypesResponse, BatchUpdateProjectsAgentEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchUpdateProjectsAgentEntityTypesRequest,
  output: BatchUpdateProjectsAgentEntityTypesResponse,
  errors: [],
}));

export interface BatchDeleteProjectsAgentEntityTypesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1BatchDeleteEntityTypesRequest;
}

export const BatchDeleteProjectsAgentEntityTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1BatchDeleteEntityTypesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/agent/entityTypes:batchDelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchDeleteProjectsAgentEntityTypesRequest>;

export type BatchDeleteProjectsAgentEntityTypesResponse = GoogleLongrunningOperation;
export const BatchDeleteProjectsAgentEntityTypesResponse = GoogleLongrunningOperation;

export type BatchDeleteProjectsAgentEntityTypesError = CommonErrors;

export const batchDeleteProjectsAgentEntityTypes: API.OperationMethod<BatchDeleteProjectsAgentEntityTypesRequest, BatchDeleteProjectsAgentEntityTypesResponse, BatchDeleteProjectsAgentEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchDeleteProjectsAgentEntityTypesRequest,
  output: BatchDeleteProjectsAgentEntityTypesResponse,
  errors: [],
}));

export interface BatchCreateProjectsAgentEntityTypesEntitiesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1BatchCreateEntitiesRequest;
}

export const BatchCreateProjectsAgentEntityTypesEntitiesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1BatchCreateEntitiesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/agent/entityTypes/{entityTypesId}/entities:batchCreate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchCreateProjectsAgentEntityTypesEntitiesRequest>;

export type BatchCreateProjectsAgentEntityTypesEntitiesResponse = GoogleLongrunningOperation;
export const BatchCreateProjectsAgentEntityTypesEntitiesResponse = GoogleLongrunningOperation;

export type BatchCreateProjectsAgentEntityTypesEntitiesError = CommonErrors;

export const batchCreateProjectsAgentEntityTypesEntities: API.OperationMethod<BatchCreateProjectsAgentEntityTypesEntitiesRequest, BatchCreateProjectsAgentEntityTypesEntitiesResponse, BatchCreateProjectsAgentEntityTypesEntitiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchCreateProjectsAgentEntityTypesEntitiesRequest,
  output: BatchCreateProjectsAgentEntityTypesEntitiesResponse,
  errors: [],
}));

export interface BatchUpdateProjectsAgentEntityTypesEntitiesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1BatchUpdateEntitiesRequest;
}

export const BatchUpdateProjectsAgentEntityTypesEntitiesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1BatchUpdateEntitiesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/agent/entityTypes/{entityTypesId}/entities:batchUpdate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchUpdateProjectsAgentEntityTypesEntitiesRequest>;

export type BatchUpdateProjectsAgentEntityTypesEntitiesResponse = GoogleLongrunningOperation;
export const BatchUpdateProjectsAgentEntityTypesEntitiesResponse = GoogleLongrunningOperation;

export type BatchUpdateProjectsAgentEntityTypesEntitiesError = CommonErrors;

export const batchUpdateProjectsAgentEntityTypesEntities: API.OperationMethod<BatchUpdateProjectsAgentEntityTypesEntitiesRequest, BatchUpdateProjectsAgentEntityTypesEntitiesResponse, BatchUpdateProjectsAgentEntityTypesEntitiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchUpdateProjectsAgentEntityTypesEntitiesRequest,
  output: BatchUpdateProjectsAgentEntityTypesEntitiesResponse,
  errors: [],
}));

export interface BatchDeleteProjectsAgentEntityTypesEntitiesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1BatchDeleteEntitiesRequest;
}

export const BatchDeleteProjectsAgentEntityTypesEntitiesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1BatchDeleteEntitiesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/agent/entityTypes/{entityTypesId}/entities:batchDelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchDeleteProjectsAgentEntityTypesEntitiesRequest>;

export type BatchDeleteProjectsAgentEntityTypesEntitiesResponse = GoogleLongrunningOperation;
export const BatchDeleteProjectsAgentEntityTypesEntitiesResponse = GoogleLongrunningOperation;

export type BatchDeleteProjectsAgentEntityTypesEntitiesError = CommonErrors;

export const batchDeleteProjectsAgentEntityTypesEntities: API.OperationMethod<BatchDeleteProjectsAgentEntityTypesEntitiesRequest, BatchDeleteProjectsAgentEntityTypesEntitiesResponse, BatchDeleteProjectsAgentEntityTypesEntitiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchDeleteProjectsAgentEntityTypesEntitiesRequest,
  output: BatchDeleteProjectsAgentEntityTypesEntitiesResponse,
  errors: [],
}));

export interface ListProjectsAgentKnowledgeBasesRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
  filter?: string;
}

export const ListProjectsAgentKnowledgeBasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/agent/knowledgeBases" }),
  svc,
) as unknown as Schema.Schema<ListProjectsAgentKnowledgeBasesRequest>;

export type ListProjectsAgentKnowledgeBasesResponse = GoogleCloudDialogflowV2beta1ListKnowledgeBasesResponse;
export const ListProjectsAgentKnowledgeBasesResponse = GoogleCloudDialogflowV2beta1ListKnowledgeBasesResponse;

export type ListProjectsAgentKnowledgeBasesError = CommonErrors;

export const listProjectsAgentKnowledgeBases: API.PaginatedOperationMethod<ListProjectsAgentKnowledgeBasesRequest, ListProjectsAgentKnowledgeBasesResponse, ListProjectsAgentKnowledgeBasesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsAgentKnowledgeBasesRequest,
  output: ListProjectsAgentKnowledgeBasesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsAgentKnowledgeBasesRequest {
  name: string;
}

export const GetProjectsAgentKnowledgeBasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/agent/knowledgeBases/{knowledgeBasesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsAgentKnowledgeBasesRequest>;

export type GetProjectsAgentKnowledgeBasesResponse = GoogleCloudDialogflowV2beta1KnowledgeBase;
export const GetProjectsAgentKnowledgeBasesResponse = GoogleCloudDialogflowV2beta1KnowledgeBase;

export type GetProjectsAgentKnowledgeBasesError = CommonErrors;

export const getProjectsAgentKnowledgeBases: API.OperationMethod<GetProjectsAgentKnowledgeBasesRequest, GetProjectsAgentKnowledgeBasesResponse, GetProjectsAgentKnowledgeBasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsAgentKnowledgeBasesRequest,
  output: GetProjectsAgentKnowledgeBasesResponse,
  errors: [],
}));

export interface CreateProjectsAgentKnowledgeBasesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1KnowledgeBase;
}

export const CreateProjectsAgentKnowledgeBasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1KnowledgeBase).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/agent/knowledgeBases", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsAgentKnowledgeBasesRequest>;

export type CreateProjectsAgentKnowledgeBasesResponse = GoogleCloudDialogflowV2beta1KnowledgeBase;
export const CreateProjectsAgentKnowledgeBasesResponse = GoogleCloudDialogflowV2beta1KnowledgeBase;

export type CreateProjectsAgentKnowledgeBasesError = CommonErrors;

export const createProjectsAgentKnowledgeBases: API.OperationMethod<CreateProjectsAgentKnowledgeBasesRequest, CreateProjectsAgentKnowledgeBasesResponse, CreateProjectsAgentKnowledgeBasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsAgentKnowledgeBasesRequest,
  output: CreateProjectsAgentKnowledgeBasesResponse,
  errors: [],
}));

export interface DeleteProjectsAgentKnowledgeBasesRequest {
  name: string;
  force?: boolean;
}

export const DeleteProjectsAgentKnowledgeBasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/agent/knowledgeBases/{knowledgeBasesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsAgentKnowledgeBasesRequest>;

export type DeleteProjectsAgentKnowledgeBasesResponse = GoogleProtobufEmpty;
export const DeleteProjectsAgentKnowledgeBasesResponse = GoogleProtobufEmpty;

export type DeleteProjectsAgentKnowledgeBasesError = CommonErrors;

export const deleteProjectsAgentKnowledgeBases: API.OperationMethod<DeleteProjectsAgentKnowledgeBasesRequest, DeleteProjectsAgentKnowledgeBasesResponse, DeleteProjectsAgentKnowledgeBasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsAgentKnowledgeBasesRequest,
  output: DeleteProjectsAgentKnowledgeBasesResponse,
  errors: [],
}));

export interface PatchProjectsAgentKnowledgeBasesRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1KnowledgeBase;
}

export const PatchProjectsAgentKnowledgeBasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1KnowledgeBase).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/agent/knowledgeBases/{knowledgeBasesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsAgentKnowledgeBasesRequest>;

export type PatchProjectsAgentKnowledgeBasesResponse = GoogleCloudDialogflowV2beta1KnowledgeBase;
export const PatchProjectsAgentKnowledgeBasesResponse = GoogleCloudDialogflowV2beta1KnowledgeBase;

export type PatchProjectsAgentKnowledgeBasesError = CommonErrors;

export const patchProjectsAgentKnowledgeBases: API.OperationMethod<PatchProjectsAgentKnowledgeBasesRequest, PatchProjectsAgentKnowledgeBasesResponse, PatchProjectsAgentKnowledgeBasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsAgentKnowledgeBasesRequest,
  output: PatchProjectsAgentKnowledgeBasesResponse,
  errors: [],
}));

export interface ListProjectsAgentKnowledgeBasesDocumentsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
  filter?: string;
}

export const ListProjectsAgentKnowledgeBasesDocumentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/agent/knowledgeBases/{knowledgeBasesId}/documents" }),
  svc,
) as unknown as Schema.Schema<ListProjectsAgentKnowledgeBasesDocumentsRequest>;

export type ListProjectsAgentKnowledgeBasesDocumentsResponse = GoogleCloudDialogflowV2beta1ListDocumentsResponse;
export const ListProjectsAgentKnowledgeBasesDocumentsResponse = GoogleCloudDialogflowV2beta1ListDocumentsResponse;

export type ListProjectsAgentKnowledgeBasesDocumentsError = CommonErrors;

export const listProjectsAgentKnowledgeBasesDocuments: API.PaginatedOperationMethod<ListProjectsAgentKnowledgeBasesDocumentsRequest, ListProjectsAgentKnowledgeBasesDocumentsResponse, ListProjectsAgentKnowledgeBasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsAgentKnowledgeBasesDocumentsRequest,
  output: ListProjectsAgentKnowledgeBasesDocumentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsAgentKnowledgeBasesDocumentsRequest {
  name: string;
}

export const GetProjectsAgentKnowledgeBasesDocumentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/agent/knowledgeBases/{knowledgeBasesId}/documents/{documentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsAgentKnowledgeBasesDocumentsRequest>;

export type GetProjectsAgentKnowledgeBasesDocumentsResponse = GoogleCloudDialogflowV2beta1Document;
export const GetProjectsAgentKnowledgeBasesDocumentsResponse = GoogleCloudDialogflowV2beta1Document;

export type GetProjectsAgentKnowledgeBasesDocumentsError = CommonErrors;

export const getProjectsAgentKnowledgeBasesDocuments: API.OperationMethod<GetProjectsAgentKnowledgeBasesDocumentsRequest, GetProjectsAgentKnowledgeBasesDocumentsResponse, GetProjectsAgentKnowledgeBasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsAgentKnowledgeBasesDocumentsRequest,
  output: GetProjectsAgentKnowledgeBasesDocumentsResponse,
  errors: [],
}));

export interface CreateProjectsAgentKnowledgeBasesDocumentsRequest {
  parent: string;
  importGcsCustomMetadata?: boolean;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Document;
}

export const CreateProjectsAgentKnowledgeBasesDocumentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  importGcsCustomMetadata: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("importGcsCustomMetadata")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Document).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/agent/knowledgeBases/{knowledgeBasesId}/documents", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsAgentKnowledgeBasesDocumentsRequest>;

export type CreateProjectsAgentKnowledgeBasesDocumentsResponse = GoogleLongrunningOperation;
export const CreateProjectsAgentKnowledgeBasesDocumentsResponse = GoogleLongrunningOperation;

export type CreateProjectsAgentKnowledgeBasesDocumentsError = CommonErrors;

export const createProjectsAgentKnowledgeBasesDocuments: API.OperationMethod<CreateProjectsAgentKnowledgeBasesDocumentsRequest, CreateProjectsAgentKnowledgeBasesDocumentsResponse, CreateProjectsAgentKnowledgeBasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsAgentKnowledgeBasesDocumentsRequest,
  output: CreateProjectsAgentKnowledgeBasesDocumentsResponse,
  errors: [],
}));

export interface DeleteProjectsAgentKnowledgeBasesDocumentsRequest {
  name: string;
}

export const DeleteProjectsAgentKnowledgeBasesDocumentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/agent/knowledgeBases/{knowledgeBasesId}/documents/{documentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsAgentKnowledgeBasesDocumentsRequest>;

export type DeleteProjectsAgentKnowledgeBasesDocumentsResponse = GoogleLongrunningOperation;
export const DeleteProjectsAgentKnowledgeBasesDocumentsResponse = GoogleLongrunningOperation;

export type DeleteProjectsAgentKnowledgeBasesDocumentsError = CommonErrors;

export const deleteProjectsAgentKnowledgeBasesDocuments: API.OperationMethod<DeleteProjectsAgentKnowledgeBasesDocumentsRequest, DeleteProjectsAgentKnowledgeBasesDocumentsResponse, DeleteProjectsAgentKnowledgeBasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsAgentKnowledgeBasesDocumentsRequest,
  output: DeleteProjectsAgentKnowledgeBasesDocumentsResponse,
  errors: [],
}));

export interface PatchProjectsAgentKnowledgeBasesDocumentsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Document;
}

export const PatchProjectsAgentKnowledgeBasesDocumentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Document).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/agent/knowledgeBases/{knowledgeBasesId}/documents/{documentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsAgentKnowledgeBasesDocumentsRequest>;

export type PatchProjectsAgentKnowledgeBasesDocumentsResponse = GoogleLongrunningOperation;
export const PatchProjectsAgentKnowledgeBasesDocumentsResponse = GoogleLongrunningOperation;

export type PatchProjectsAgentKnowledgeBasesDocumentsError = CommonErrors;

export const patchProjectsAgentKnowledgeBasesDocuments: API.OperationMethod<PatchProjectsAgentKnowledgeBasesDocumentsRequest, PatchProjectsAgentKnowledgeBasesDocumentsResponse, PatchProjectsAgentKnowledgeBasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsAgentKnowledgeBasesDocumentsRequest,
  output: PatchProjectsAgentKnowledgeBasesDocumentsResponse,
  errors: [],
}));

export interface ReloadProjectsAgentKnowledgeBasesDocumentsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1ReloadDocumentRequest;
}

export const ReloadProjectsAgentKnowledgeBasesDocumentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1ReloadDocumentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/agent/knowledgeBases/{knowledgeBasesId}/documents/{documentsId}:reload", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReloadProjectsAgentKnowledgeBasesDocumentsRequest>;

export type ReloadProjectsAgentKnowledgeBasesDocumentsResponse = GoogleLongrunningOperation;
export const ReloadProjectsAgentKnowledgeBasesDocumentsResponse = GoogleLongrunningOperation;

export type ReloadProjectsAgentKnowledgeBasesDocumentsError = CommonErrors;

export const reloadProjectsAgentKnowledgeBasesDocuments: API.OperationMethod<ReloadProjectsAgentKnowledgeBasesDocumentsRequest, ReloadProjectsAgentKnowledgeBasesDocumentsResponse, ReloadProjectsAgentKnowledgeBasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReloadProjectsAgentKnowledgeBasesDocumentsRequest,
  output: ReloadProjectsAgentKnowledgeBasesDocumentsResponse,
  errors: [],
}));

export interface ListProjectsAgentVersionsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsAgentVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/agent/versions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsAgentVersionsRequest>;

export type ListProjectsAgentVersionsResponse = GoogleCloudDialogflowV2beta1ListVersionsResponse;
export const ListProjectsAgentVersionsResponse = GoogleCloudDialogflowV2beta1ListVersionsResponse;

export type ListProjectsAgentVersionsError = CommonErrors;

export const listProjectsAgentVersions: API.PaginatedOperationMethod<ListProjectsAgentVersionsRequest, ListProjectsAgentVersionsResponse, ListProjectsAgentVersionsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsAgentVersionsRequest,
  output: ListProjectsAgentVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsAgentVersionsRequest {
  name: string;
}

export const GetProjectsAgentVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/agent/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsAgentVersionsRequest>;

export type GetProjectsAgentVersionsResponse = GoogleCloudDialogflowV2beta1Version;
export const GetProjectsAgentVersionsResponse = GoogleCloudDialogflowV2beta1Version;

export type GetProjectsAgentVersionsError = CommonErrors;

export const getProjectsAgentVersions: API.OperationMethod<GetProjectsAgentVersionsRequest, GetProjectsAgentVersionsResponse, GetProjectsAgentVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsAgentVersionsRequest,
  output: GetProjectsAgentVersionsResponse,
  errors: [],
}));

export interface CreateProjectsAgentVersionsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Version;
}

export const CreateProjectsAgentVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Version).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/agent/versions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsAgentVersionsRequest>;

export type CreateProjectsAgentVersionsResponse = GoogleCloudDialogflowV2beta1Version;
export const CreateProjectsAgentVersionsResponse = GoogleCloudDialogflowV2beta1Version;

export type CreateProjectsAgentVersionsError = CommonErrors;

export const createProjectsAgentVersions: API.OperationMethod<CreateProjectsAgentVersionsRequest, CreateProjectsAgentVersionsResponse, CreateProjectsAgentVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsAgentVersionsRequest,
  output: CreateProjectsAgentVersionsResponse,
  errors: [],
}));

export interface PatchProjectsAgentVersionsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Version;
}

export const PatchProjectsAgentVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Version).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/agent/versions/{versionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsAgentVersionsRequest>;

export type PatchProjectsAgentVersionsResponse = GoogleCloudDialogflowV2beta1Version;
export const PatchProjectsAgentVersionsResponse = GoogleCloudDialogflowV2beta1Version;

export type PatchProjectsAgentVersionsError = CommonErrors;

export const patchProjectsAgentVersions: API.OperationMethod<PatchProjectsAgentVersionsRequest, PatchProjectsAgentVersionsResponse, PatchProjectsAgentVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsAgentVersionsRequest,
  output: PatchProjectsAgentVersionsResponse,
  errors: [],
}));

export interface DeleteProjectsAgentVersionsRequest {
  name: string;
}

export const DeleteProjectsAgentVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/agent/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsAgentVersionsRequest>;

export type DeleteProjectsAgentVersionsResponse = GoogleProtobufEmpty;
export const DeleteProjectsAgentVersionsResponse = GoogleProtobufEmpty;

export type DeleteProjectsAgentVersionsError = CommonErrors;

export const deleteProjectsAgentVersions: API.OperationMethod<DeleteProjectsAgentVersionsRequest, DeleteProjectsAgentVersionsResponse, DeleteProjectsAgentVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsAgentVersionsRequest,
  output: DeleteProjectsAgentVersionsResponse,
  errors: [],
}));

export interface GetAgentProjectsLocationsRequest {
  parent: string;
}

export const GetAgentProjectsLocationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent" }),
  svc,
) as unknown as Schema.Schema<GetAgentProjectsLocationsRequest>;

export type GetAgentProjectsLocationsResponse = GoogleCloudDialogflowV2beta1Agent;
export const GetAgentProjectsLocationsResponse = GoogleCloudDialogflowV2beta1Agent;

export type GetAgentProjectsLocationsError = CommonErrors;

export const getAgentProjectsLocations: API.OperationMethod<GetAgentProjectsLocationsRequest, GetAgentProjectsLocationsResponse, GetAgentProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAgentProjectsLocationsRequest,
  output: GetAgentProjectsLocationsResponse,
  errors: [],
}));

export interface SetAgentProjectsLocationsRequest {
  parent: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Agent;
}

export const SetAgentProjectsLocationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Agent).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetAgentProjectsLocationsRequest>;

export type SetAgentProjectsLocationsResponse = GoogleCloudDialogflowV2beta1Agent;
export const SetAgentProjectsLocationsResponse = GoogleCloudDialogflowV2beta1Agent;

export type SetAgentProjectsLocationsError = CommonErrors;

export const setAgentProjectsLocations: API.OperationMethod<SetAgentProjectsLocationsRequest, SetAgentProjectsLocationsResponse, SetAgentProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetAgentProjectsLocationsRequest,
  output: SetAgentProjectsLocationsResponse,
  errors: [],
}));

export interface DeleteAgentProjectsLocationsRequest {
  parent: string;
}

export const DeleteAgentProjectsLocationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent" }),
  svc,
) as unknown as Schema.Schema<DeleteAgentProjectsLocationsRequest>;

export type DeleteAgentProjectsLocationsResponse = GoogleProtobufEmpty;
export const DeleteAgentProjectsLocationsResponse = GoogleProtobufEmpty;

export type DeleteAgentProjectsLocationsError = CommonErrors;

export const deleteAgentProjectsLocations: API.OperationMethod<DeleteAgentProjectsLocationsRequest, DeleteAgentProjectsLocationsResponse, DeleteAgentProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAgentProjectsLocationsRequest,
  output: DeleteAgentProjectsLocationsResponse,
  errors: [],
}));

export interface GetEncryptionSpecProjectsLocationsRequest {
  name: string;
}

export const GetEncryptionSpecProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/encryptionSpec" }),
  svc,
) as unknown as Schema.Schema<GetEncryptionSpecProjectsLocationsRequest>;

export type GetEncryptionSpecProjectsLocationsResponse = GoogleCloudDialogflowV2beta1EncryptionSpec;
export const GetEncryptionSpecProjectsLocationsResponse = GoogleCloudDialogflowV2beta1EncryptionSpec;

export type GetEncryptionSpecProjectsLocationsError = CommonErrors;

export const getEncryptionSpecProjectsLocations: API.OperationMethod<GetEncryptionSpecProjectsLocationsRequest, GetEncryptionSpecProjectsLocationsResponse, GetEncryptionSpecProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetEncryptionSpecProjectsLocationsRequest,
  output: GetEncryptionSpecProjectsLocationsResponse,
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
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations" }),
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
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}" }),
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
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/operations" }),
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
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
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
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
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

export interface GetFulfillmentProjectsLocationsAgentRequest {
  name: string;
}

export const GetFulfillmentProjectsLocationsAgentRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/fulfillment" }),
  svc,
) as unknown as Schema.Schema<GetFulfillmentProjectsLocationsAgentRequest>;

export type GetFulfillmentProjectsLocationsAgentResponse = GoogleCloudDialogflowV2beta1Fulfillment;
export const GetFulfillmentProjectsLocationsAgentResponse = GoogleCloudDialogflowV2beta1Fulfillment;

export type GetFulfillmentProjectsLocationsAgentError = CommonErrors;

export const getFulfillmentProjectsLocationsAgent: API.OperationMethod<GetFulfillmentProjectsLocationsAgentRequest, GetFulfillmentProjectsLocationsAgentResponse, GetFulfillmentProjectsLocationsAgentError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFulfillmentProjectsLocationsAgentRequest,
  output: GetFulfillmentProjectsLocationsAgentResponse,
  errors: [],
}));

export interface UpdateFulfillmentProjectsLocationsAgentRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Fulfillment;
}

export const UpdateFulfillmentProjectsLocationsAgentRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Fulfillment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/fulfillment", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateFulfillmentProjectsLocationsAgentRequest>;

export type UpdateFulfillmentProjectsLocationsAgentResponse = GoogleCloudDialogflowV2beta1Fulfillment;
export const UpdateFulfillmentProjectsLocationsAgentResponse = GoogleCloudDialogflowV2beta1Fulfillment;

export type UpdateFulfillmentProjectsLocationsAgentError = CommonErrors;

export const updateFulfillmentProjectsLocationsAgent: API.OperationMethod<UpdateFulfillmentProjectsLocationsAgentRequest, UpdateFulfillmentProjectsLocationsAgentResponse, UpdateFulfillmentProjectsLocationsAgentError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateFulfillmentProjectsLocationsAgentRequest,
  output: UpdateFulfillmentProjectsLocationsAgentResponse,
  errors: [],
}));

export interface SearchProjectsLocationsAgentRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const SearchProjectsLocationsAgentRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent:search" }),
  svc,
) as unknown as Schema.Schema<SearchProjectsLocationsAgentRequest>;

export type SearchProjectsLocationsAgentResponse = GoogleCloudDialogflowV2beta1SearchAgentsResponse;
export const SearchProjectsLocationsAgentResponse = GoogleCloudDialogflowV2beta1SearchAgentsResponse;

export type SearchProjectsLocationsAgentError = CommonErrors;

export const searchProjectsLocationsAgent: API.PaginatedOperationMethod<SearchProjectsLocationsAgentRequest, SearchProjectsLocationsAgentResponse, SearchProjectsLocationsAgentError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: SearchProjectsLocationsAgentRequest,
  output: SearchProjectsLocationsAgentResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface TrainProjectsLocationsAgentRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1TrainAgentRequest;
}

export const TrainProjectsLocationsAgentRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1TrainAgentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent:train", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TrainProjectsLocationsAgentRequest>;

export type TrainProjectsLocationsAgentResponse = GoogleLongrunningOperation;
export const TrainProjectsLocationsAgentResponse = GoogleLongrunningOperation;

export type TrainProjectsLocationsAgentError = CommonErrors;

export const trainProjectsLocationsAgent: API.OperationMethod<TrainProjectsLocationsAgentRequest, TrainProjectsLocationsAgentResponse, TrainProjectsLocationsAgentError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TrainProjectsLocationsAgentRequest,
  output: TrainProjectsLocationsAgentResponse,
  errors: [],
}));

export interface ExportProjectsLocationsAgentRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1ExportAgentRequest;
}

export const ExportProjectsLocationsAgentRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1ExportAgentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent:export", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExportProjectsLocationsAgentRequest>;

export type ExportProjectsLocationsAgentResponse = GoogleLongrunningOperation;
export const ExportProjectsLocationsAgentResponse = GoogleLongrunningOperation;

export type ExportProjectsLocationsAgentError = CommonErrors;

export const exportProjectsLocationsAgent: API.OperationMethod<ExportProjectsLocationsAgentRequest, ExportProjectsLocationsAgentResponse, ExportProjectsLocationsAgentError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExportProjectsLocationsAgentRequest,
  output: ExportProjectsLocationsAgentResponse,
  errors: [],
}));

export interface ImportProjectsLocationsAgentRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1ImportAgentRequest;
}

export const ImportProjectsLocationsAgentRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1ImportAgentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent:import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportProjectsLocationsAgentRequest>;

export type ImportProjectsLocationsAgentResponse = GoogleLongrunningOperation;
export const ImportProjectsLocationsAgentResponse = GoogleLongrunningOperation;

export type ImportProjectsLocationsAgentError = CommonErrors;

export const importProjectsLocationsAgent: API.OperationMethod<ImportProjectsLocationsAgentRequest, ImportProjectsLocationsAgentResponse, ImportProjectsLocationsAgentError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportProjectsLocationsAgentRequest,
  output: ImportProjectsLocationsAgentResponse,
  errors: [],
}));

export interface RestoreProjectsLocationsAgentRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1RestoreAgentRequest;
}

export const RestoreProjectsLocationsAgentRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1RestoreAgentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent:restore", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RestoreProjectsLocationsAgentRequest>;

export type RestoreProjectsLocationsAgentResponse = GoogleLongrunningOperation;
export const RestoreProjectsLocationsAgentResponse = GoogleLongrunningOperation;

export type RestoreProjectsLocationsAgentError = CommonErrors;

export const restoreProjectsLocationsAgent: API.OperationMethod<RestoreProjectsLocationsAgentRequest, RestoreProjectsLocationsAgentResponse, RestoreProjectsLocationsAgentError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RestoreProjectsLocationsAgentRequest,
  output: RestoreProjectsLocationsAgentResponse,
  errors: [],
}));

export interface GetValidationResultProjectsLocationsAgentRequest {
  parent: string;
  languageCode?: string;
}

export const GetValidationResultProjectsLocationsAgentRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/validationResult" }),
  svc,
) as unknown as Schema.Schema<GetValidationResultProjectsLocationsAgentRequest>;

export type GetValidationResultProjectsLocationsAgentResponse = GoogleCloudDialogflowV2beta1ValidationResult;
export const GetValidationResultProjectsLocationsAgentResponse = GoogleCloudDialogflowV2beta1ValidationResult;

export type GetValidationResultProjectsLocationsAgentError = CommonErrors;

export const getValidationResultProjectsLocationsAgent: API.OperationMethod<GetValidationResultProjectsLocationsAgentRequest, GetValidationResultProjectsLocationsAgentResponse, GetValidationResultProjectsLocationsAgentError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetValidationResultProjectsLocationsAgentRequest,
  output: GetValidationResultProjectsLocationsAgentResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentEnvironmentsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentEnvironmentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/environments" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentEnvironmentsRequest>;

export type ListProjectsLocationsAgentEnvironmentsResponse = GoogleCloudDialogflowV2beta1ListEnvironmentsResponse;
export const ListProjectsLocationsAgentEnvironmentsResponse = GoogleCloudDialogflowV2beta1ListEnvironmentsResponse;

export type ListProjectsLocationsAgentEnvironmentsError = CommonErrors;

export const listProjectsLocationsAgentEnvironments: API.PaginatedOperationMethod<ListProjectsLocationsAgentEnvironmentsRequest, ListProjectsLocationsAgentEnvironmentsResponse, ListProjectsLocationsAgentEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentEnvironmentsRequest,
  output: ListProjectsLocationsAgentEnvironmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentEnvironmentsRequest {
  name: string;
}

export const GetProjectsLocationsAgentEnvironmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/environments/{environmentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentEnvironmentsRequest>;

export type GetProjectsLocationsAgentEnvironmentsResponse = GoogleCloudDialogflowV2beta1Environment;
export const GetProjectsLocationsAgentEnvironmentsResponse = GoogleCloudDialogflowV2beta1Environment;

export type GetProjectsLocationsAgentEnvironmentsError = CommonErrors;

export const getProjectsLocationsAgentEnvironments: API.OperationMethod<GetProjectsLocationsAgentEnvironmentsRequest, GetProjectsLocationsAgentEnvironmentsResponse, GetProjectsLocationsAgentEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentEnvironmentsRequest,
  output: GetProjectsLocationsAgentEnvironmentsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentEnvironmentsRequest {
  parent: string;
  environmentId?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Environment;
}

export const CreateProjectsLocationsAgentEnvironmentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  environmentId: Schema.optional(Schema.String).pipe(T.HttpQuery("environmentId")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Environment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/environments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentEnvironmentsRequest>;

export type CreateProjectsLocationsAgentEnvironmentsResponse = GoogleCloudDialogflowV2beta1Environment;
export const CreateProjectsLocationsAgentEnvironmentsResponse = GoogleCloudDialogflowV2beta1Environment;

export type CreateProjectsLocationsAgentEnvironmentsError = CommonErrors;

export const createProjectsLocationsAgentEnvironments: API.OperationMethod<CreateProjectsLocationsAgentEnvironmentsRequest, CreateProjectsLocationsAgentEnvironmentsResponse, CreateProjectsLocationsAgentEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentEnvironmentsRequest,
  output: CreateProjectsLocationsAgentEnvironmentsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentEnvironmentsRequest {
  name: string;
  updateMask?: string;
  allowLoadToDraftAndDiscardChanges?: boolean;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Environment;
}

export const PatchProjectsLocationsAgentEnvironmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  allowLoadToDraftAndDiscardChanges: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowLoadToDraftAndDiscardChanges")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Environment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/environments/{environmentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentEnvironmentsRequest>;

export type PatchProjectsLocationsAgentEnvironmentsResponse = GoogleCloudDialogflowV2beta1Environment;
export const PatchProjectsLocationsAgentEnvironmentsResponse = GoogleCloudDialogflowV2beta1Environment;

export type PatchProjectsLocationsAgentEnvironmentsError = CommonErrors;

export const patchProjectsLocationsAgentEnvironments: API.OperationMethod<PatchProjectsLocationsAgentEnvironmentsRequest, PatchProjectsLocationsAgentEnvironmentsResponse, PatchProjectsLocationsAgentEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentEnvironmentsRequest,
  output: PatchProjectsLocationsAgentEnvironmentsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentEnvironmentsRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentEnvironmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/environments/{environmentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAgentEnvironmentsRequest>;

export type DeleteProjectsLocationsAgentEnvironmentsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentEnvironmentsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentEnvironmentsError = CommonErrors;

export const deleteProjectsLocationsAgentEnvironments: API.OperationMethod<DeleteProjectsLocationsAgentEnvironmentsRequest, DeleteProjectsLocationsAgentEnvironmentsResponse, DeleteProjectsLocationsAgentEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAgentEnvironmentsRequest,
  output: DeleteProjectsLocationsAgentEnvironmentsResponse,
  errors: [],
}));

export interface GetHistoryProjectsLocationsAgentEnvironmentsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const GetHistoryProjectsLocationsAgentEnvironmentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/environments/{environmentsId}/history" }),
  svc,
) as unknown as Schema.Schema<GetHistoryProjectsLocationsAgentEnvironmentsRequest>;

export type GetHistoryProjectsLocationsAgentEnvironmentsResponse = GoogleCloudDialogflowV2beta1EnvironmentHistory;
export const GetHistoryProjectsLocationsAgentEnvironmentsResponse = GoogleCloudDialogflowV2beta1EnvironmentHistory;

export type GetHistoryProjectsLocationsAgentEnvironmentsError = CommonErrors;

export const getHistoryProjectsLocationsAgentEnvironments: API.PaginatedOperationMethod<GetHistoryProjectsLocationsAgentEnvironmentsRequest, GetHistoryProjectsLocationsAgentEnvironmentsResponse, GetHistoryProjectsLocationsAgentEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: GetHistoryProjectsLocationsAgentEnvironmentsRequest,
  output: GetHistoryProjectsLocationsAgentEnvironmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteContextsProjectsLocationsAgentEnvironmentsUsersSessionsRequest {
  parent: string;
}

export const DeleteContextsProjectsLocationsAgentEnvironmentsUsersSessionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/environments/{environmentsId}/users/{usersId}/sessions/{sessionsId}/contexts" }),
  svc,
) as unknown as Schema.Schema<DeleteContextsProjectsLocationsAgentEnvironmentsUsersSessionsRequest>;

export type DeleteContextsProjectsLocationsAgentEnvironmentsUsersSessionsResponse = GoogleProtobufEmpty;
export const DeleteContextsProjectsLocationsAgentEnvironmentsUsersSessionsResponse = GoogleProtobufEmpty;

export type DeleteContextsProjectsLocationsAgentEnvironmentsUsersSessionsError = CommonErrors;

export const deleteContextsProjectsLocationsAgentEnvironmentsUsersSessions: API.OperationMethod<DeleteContextsProjectsLocationsAgentEnvironmentsUsersSessionsRequest, DeleteContextsProjectsLocationsAgentEnvironmentsUsersSessionsResponse, DeleteContextsProjectsLocationsAgentEnvironmentsUsersSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteContextsProjectsLocationsAgentEnvironmentsUsersSessionsRequest,
  output: DeleteContextsProjectsLocationsAgentEnvironmentsUsersSessionsResponse,
  errors: [],
}));

export interface DetectIntentProjectsLocationsAgentEnvironmentsUsersSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1DetectIntentRequest;
}

export const DetectIntentProjectsLocationsAgentEnvironmentsUsersSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1DetectIntentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/environments/{environmentsId}/users/{usersId}/sessions/{sessionsId}:detectIntent", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DetectIntentProjectsLocationsAgentEnvironmentsUsersSessionsRequest>;

export type DetectIntentProjectsLocationsAgentEnvironmentsUsersSessionsResponse = GoogleCloudDialogflowV2beta1DetectIntentResponse;
export const DetectIntentProjectsLocationsAgentEnvironmentsUsersSessionsResponse = GoogleCloudDialogflowV2beta1DetectIntentResponse;

export type DetectIntentProjectsLocationsAgentEnvironmentsUsersSessionsError = CommonErrors;

export const detectIntentProjectsLocationsAgentEnvironmentsUsersSessions: API.OperationMethod<DetectIntentProjectsLocationsAgentEnvironmentsUsersSessionsRequest, DetectIntentProjectsLocationsAgentEnvironmentsUsersSessionsResponse, DetectIntentProjectsLocationsAgentEnvironmentsUsersSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DetectIntentProjectsLocationsAgentEnvironmentsUsersSessionsRequest,
  output: DetectIntentProjectsLocationsAgentEnvironmentsUsersSessionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentEnvironmentsUsersSessionsContextsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentEnvironmentsUsersSessionsContextsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/environments/{environmentsId}/users/{usersId}/sessions/{sessionsId}/contexts" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentEnvironmentsUsersSessionsContextsRequest>;

export type ListProjectsLocationsAgentEnvironmentsUsersSessionsContextsResponse = GoogleCloudDialogflowV2beta1ListContextsResponse;
export const ListProjectsLocationsAgentEnvironmentsUsersSessionsContextsResponse = GoogleCloudDialogflowV2beta1ListContextsResponse;

export type ListProjectsLocationsAgentEnvironmentsUsersSessionsContextsError = CommonErrors;

export const listProjectsLocationsAgentEnvironmentsUsersSessionsContexts: API.PaginatedOperationMethod<ListProjectsLocationsAgentEnvironmentsUsersSessionsContextsRequest, ListProjectsLocationsAgentEnvironmentsUsersSessionsContextsResponse, ListProjectsLocationsAgentEnvironmentsUsersSessionsContextsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentEnvironmentsUsersSessionsContextsRequest,
  output: ListProjectsLocationsAgentEnvironmentsUsersSessionsContextsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentEnvironmentsUsersSessionsContextsRequest {
  name: string;
}

export const GetProjectsLocationsAgentEnvironmentsUsersSessionsContextsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/environments/{environmentsId}/users/{usersId}/sessions/{sessionsId}/contexts/{contextsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentEnvironmentsUsersSessionsContextsRequest>;

export type GetProjectsLocationsAgentEnvironmentsUsersSessionsContextsResponse = GoogleCloudDialogflowV2beta1Context;
export const GetProjectsLocationsAgentEnvironmentsUsersSessionsContextsResponse = GoogleCloudDialogflowV2beta1Context;

export type GetProjectsLocationsAgentEnvironmentsUsersSessionsContextsError = CommonErrors;

export const getProjectsLocationsAgentEnvironmentsUsersSessionsContexts: API.OperationMethod<GetProjectsLocationsAgentEnvironmentsUsersSessionsContextsRequest, GetProjectsLocationsAgentEnvironmentsUsersSessionsContextsResponse, GetProjectsLocationsAgentEnvironmentsUsersSessionsContextsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentEnvironmentsUsersSessionsContextsRequest,
  output: GetProjectsLocationsAgentEnvironmentsUsersSessionsContextsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentEnvironmentsUsersSessionsContextsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Context;
}

export const CreateProjectsLocationsAgentEnvironmentsUsersSessionsContextsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Context).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/environments/{environmentsId}/users/{usersId}/sessions/{sessionsId}/contexts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentEnvironmentsUsersSessionsContextsRequest>;

export type CreateProjectsLocationsAgentEnvironmentsUsersSessionsContextsResponse = GoogleCloudDialogflowV2beta1Context;
export const CreateProjectsLocationsAgentEnvironmentsUsersSessionsContextsResponse = GoogleCloudDialogflowV2beta1Context;

export type CreateProjectsLocationsAgentEnvironmentsUsersSessionsContextsError = CommonErrors;

export const createProjectsLocationsAgentEnvironmentsUsersSessionsContexts: API.OperationMethod<CreateProjectsLocationsAgentEnvironmentsUsersSessionsContextsRequest, CreateProjectsLocationsAgentEnvironmentsUsersSessionsContextsResponse, CreateProjectsLocationsAgentEnvironmentsUsersSessionsContextsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentEnvironmentsUsersSessionsContextsRequest,
  output: CreateProjectsLocationsAgentEnvironmentsUsersSessionsContextsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentEnvironmentsUsersSessionsContextsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Context;
}

export const PatchProjectsLocationsAgentEnvironmentsUsersSessionsContextsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Context).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/environments/{environmentsId}/users/{usersId}/sessions/{sessionsId}/contexts/{contextsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentEnvironmentsUsersSessionsContextsRequest>;

export type PatchProjectsLocationsAgentEnvironmentsUsersSessionsContextsResponse = GoogleCloudDialogflowV2beta1Context;
export const PatchProjectsLocationsAgentEnvironmentsUsersSessionsContextsResponse = GoogleCloudDialogflowV2beta1Context;

export type PatchProjectsLocationsAgentEnvironmentsUsersSessionsContextsError = CommonErrors;

export const patchProjectsLocationsAgentEnvironmentsUsersSessionsContexts: API.OperationMethod<PatchProjectsLocationsAgentEnvironmentsUsersSessionsContextsRequest, PatchProjectsLocationsAgentEnvironmentsUsersSessionsContextsResponse, PatchProjectsLocationsAgentEnvironmentsUsersSessionsContextsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentEnvironmentsUsersSessionsContextsRequest,
  output: PatchProjectsLocationsAgentEnvironmentsUsersSessionsContextsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentEnvironmentsUsersSessionsContextsRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentEnvironmentsUsersSessionsContextsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/environments/{environmentsId}/users/{usersId}/sessions/{sessionsId}/contexts/{contextsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAgentEnvironmentsUsersSessionsContextsRequest>;

export type DeleteProjectsLocationsAgentEnvironmentsUsersSessionsContextsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentEnvironmentsUsersSessionsContextsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentEnvironmentsUsersSessionsContextsError = CommonErrors;

export const deleteProjectsLocationsAgentEnvironmentsUsersSessionsContexts: API.OperationMethod<DeleteProjectsLocationsAgentEnvironmentsUsersSessionsContextsRequest, DeleteProjectsLocationsAgentEnvironmentsUsersSessionsContextsResponse, DeleteProjectsLocationsAgentEnvironmentsUsersSessionsContextsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAgentEnvironmentsUsersSessionsContextsRequest,
  output: DeleteProjectsLocationsAgentEnvironmentsUsersSessionsContextsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/environments/{environmentsId}/users/{usersId}/sessions/{sessionsId}/entityTypes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesRequest>;

export type ListProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1ListSessionEntityTypesResponse;
export const ListProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1ListSessionEntityTypesResponse;

export type ListProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesError = CommonErrors;

export const listProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypes: API.PaginatedOperationMethod<ListProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesRequest, ListProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesResponse, ListProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesRequest,
  output: ListProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesRequest {
  name: string;
}

export const GetProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/environments/{environmentsId}/users/{usersId}/sessions/{sessionsId}/entityTypes/{entityTypesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesRequest>;

export type GetProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1SessionEntityType;
export const GetProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1SessionEntityType;

export type GetProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesError = CommonErrors;

export const getProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypes: API.OperationMethod<GetProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesRequest, GetProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesResponse, GetProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesRequest,
  output: GetProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1SessionEntityType;
}

export const CreateProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1SessionEntityType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/environments/{environmentsId}/users/{usersId}/sessions/{sessionsId}/entityTypes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesRequest>;

export type CreateProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1SessionEntityType;
export const CreateProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1SessionEntityType;

export type CreateProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesError = CommonErrors;

export const createProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypes: API.OperationMethod<CreateProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesRequest, CreateProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesResponse, CreateProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesRequest,
  output: CreateProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1SessionEntityType;
}

export const PatchProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1SessionEntityType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/environments/{environmentsId}/users/{usersId}/sessions/{sessionsId}/entityTypes/{entityTypesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesRequest>;

export type PatchProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1SessionEntityType;
export const PatchProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1SessionEntityType;

export type PatchProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesError = CommonErrors;

export const patchProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypes: API.OperationMethod<PatchProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesRequest, PatchProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesResponse, PatchProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesRequest,
  output: PatchProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/environments/{environmentsId}/users/{usersId}/sessions/{sessionsId}/entityTypes/{entityTypesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesRequest>;

export type DeleteProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesError = CommonErrors;

export const deleteProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypes: API.OperationMethod<DeleteProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesRequest, DeleteProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesResponse, DeleteProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesRequest,
  output: DeleteProjectsLocationsAgentEnvironmentsUsersSessionsEntityTypesResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentEnvironmentsIntentsRequest {
  parent: string;
  languageCode?: string;
  intentView?: "INTENT_VIEW_UNSPECIFIED" | "INTENT_VIEW_FULL" | (string & {});
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentEnvironmentsIntentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  intentView: Schema.optional(Schema.String).pipe(T.HttpQuery("intentView")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/environments/{environmentsId}/intents" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentEnvironmentsIntentsRequest>;

export type ListProjectsLocationsAgentEnvironmentsIntentsResponse = GoogleCloudDialogflowV2beta1ListIntentsResponse;
export const ListProjectsLocationsAgentEnvironmentsIntentsResponse = GoogleCloudDialogflowV2beta1ListIntentsResponse;

export type ListProjectsLocationsAgentEnvironmentsIntentsError = CommonErrors;

export const listProjectsLocationsAgentEnvironmentsIntents: API.PaginatedOperationMethod<ListProjectsLocationsAgentEnvironmentsIntentsRequest, ListProjectsLocationsAgentEnvironmentsIntentsResponse, ListProjectsLocationsAgentEnvironmentsIntentsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentEnvironmentsIntentsRequest,
  output: ListProjectsLocationsAgentEnvironmentsIntentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteContextsProjectsLocationsAgentSessionsRequest {
  parent: string;
}

export const DeleteContextsProjectsLocationsAgentSessionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/sessions/{sessionsId}/contexts" }),
  svc,
) as unknown as Schema.Schema<DeleteContextsProjectsLocationsAgentSessionsRequest>;

export type DeleteContextsProjectsLocationsAgentSessionsResponse = GoogleProtobufEmpty;
export const DeleteContextsProjectsLocationsAgentSessionsResponse = GoogleProtobufEmpty;

export type DeleteContextsProjectsLocationsAgentSessionsError = CommonErrors;

export const deleteContextsProjectsLocationsAgentSessions: API.OperationMethod<DeleteContextsProjectsLocationsAgentSessionsRequest, DeleteContextsProjectsLocationsAgentSessionsResponse, DeleteContextsProjectsLocationsAgentSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteContextsProjectsLocationsAgentSessionsRequest,
  output: DeleteContextsProjectsLocationsAgentSessionsResponse,
  errors: [],
}));

export interface DetectIntentProjectsLocationsAgentSessionsRequest {
  session: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1DetectIntentRequest;
}

export const DetectIntentProjectsLocationsAgentSessionsRequest = Schema.Struct({
  session: Schema.String.pipe(T.HttpPath("session")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1DetectIntentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/sessions/{sessionsId}:detectIntent", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DetectIntentProjectsLocationsAgentSessionsRequest>;

export type DetectIntentProjectsLocationsAgentSessionsResponse = GoogleCloudDialogflowV2beta1DetectIntentResponse;
export const DetectIntentProjectsLocationsAgentSessionsResponse = GoogleCloudDialogflowV2beta1DetectIntentResponse;

export type DetectIntentProjectsLocationsAgentSessionsError = CommonErrors;

export const detectIntentProjectsLocationsAgentSessions: API.OperationMethod<DetectIntentProjectsLocationsAgentSessionsRequest, DetectIntentProjectsLocationsAgentSessionsResponse, DetectIntentProjectsLocationsAgentSessionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DetectIntentProjectsLocationsAgentSessionsRequest,
  output: DetectIntentProjectsLocationsAgentSessionsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentSessionsContextsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentSessionsContextsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/sessions/{sessionsId}/contexts" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentSessionsContextsRequest>;

export type ListProjectsLocationsAgentSessionsContextsResponse = GoogleCloudDialogflowV2beta1ListContextsResponse;
export const ListProjectsLocationsAgentSessionsContextsResponse = GoogleCloudDialogflowV2beta1ListContextsResponse;

export type ListProjectsLocationsAgentSessionsContextsError = CommonErrors;

export const listProjectsLocationsAgentSessionsContexts: API.PaginatedOperationMethod<ListProjectsLocationsAgentSessionsContextsRequest, ListProjectsLocationsAgentSessionsContextsResponse, ListProjectsLocationsAgentSessionsContextsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentSessionsContextsRequest,
  output: ListProjectsLocationsAgentSessionsContextsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentSessionsContextsRequest {
  name: string;
}

export const GetProjectsLocationsAgentSessionsContextsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/sessions/{sessionsId}/contexts/{contextsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentSessionsContextsRequest>;

export type GetProjectsLocationsAgentSessionsContextsResponse = GoogleCloudDialogflowV2beta1Context;
export const GetProjectsLocationsAgentSessionsContextsResponse = GoogleCloudDialogflowV2beta1Context;

export type GetProjectsLocationsAgentSessionsContextsError = CommonErrors;

export const getProjectsLocationsAgentSessionsContexts: API.OperationMethod<GetProjectsLocationsAgentSessionsContextsRequest, GetProjectsLocationsAgentSessionsContextsResponse, GetProjectsLocationsAgentSessionsContextsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentSessionsContextsRequest,
  output: GetProjectsLocationsAgentSessionsContextsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentSessionsContextsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Context;
}

export const CreateProjectsLocationsAgentSessionsContextsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Context).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/sessions/{sessionsId}/contexts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentSessionsContextsRequest>;

export type CreateProjectsLocationsAgentSessionsContextsResponse = GoogleCloudDialogflowV2beta1Context;
export const CreateProjectsLocationsAgentSessionsContextsResponse = GoogleCloudDialogflowV2beta1Context;

export type CreateProjectsLocationsAgentSessionsContextsError = CommonErrors;

export const createProjectsLocationsAgentSessionsContexts: API.OperationMethod<CreateProjectsLocationsAgentSessionsContextsRequest, CreateProjectsLocationsAgentSessionsContextsResponse, CreateProjectsLocationsAgentSessionsContextsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentSessionsContextsRequest,
  output: CreateProjectsLocationsAgentSessionsContextsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentSessionsContextsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Context;
}

export const PatchProjectsLocationsAgentSessionsContextsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Context).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/sessions/{sessionsId}/contexts/{contextsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentSessionsContextsRequest>;

export type PatchProjectsLocationsAgentSessionsContextsResponse = GoogleCloudDialogflowV2beta1Context;
export const PatchProjectsLocationsAgentSessionsContextsResponse = GoogleCloudDialogflowV2beta1Context;

export type PatchProjectsLocationsAgentSessionsContextsError = CommonErrors;

export const patchProjectsLocationsAgentSessionsContexts: API.OperationMethod<PatchProjectsLocationsAgentSessionsContextsRequest, PatchProjectsLocationsAgentSessionsContextsResponse, PatchProjectsLocationsAgentSessionsContextsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentSessionsContextsRequest,
  output: PatchProjectsLocationsAgentSessionsContextsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentSessionsContextsRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentSessionsContextsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/sessions/{sessionsId}/contexts/{contextsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAgentSessionsContextsRequest>;

export type DeleteProjectsLocationsAgentSessionsContextsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentSessionsContextsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentSessionsContextsError = CommonErrors;

export const deleteProjectsLocationsAgentSessionsContexts: API.OperationMethod<DeleteProjectsLocationsAgentSessionsContextsRequest, DeleteProjectsLocationsAgentSessionsContextsResponse, DeleteProjectsLocationsAgentSessionsContextsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAgentSessionsContextsRequest,
  output: DeleteProjectsLocationsAgentSessionsContextsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentSessionsEntityTypesRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentSessionsEntityTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/sessions/{sessionsId}/entityTypes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentSessionsEntityTypesRequest>;

export type ListProjectsLocationsAgentSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1ListSessionEntityTypesResponse;
export const ListProjectsLocationsAgentSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1ListSessionEntityTypesResponse;

export type ListProjectsLocationsAgentSessionsEntityTypesError = CommonErrors;

export const listProjectsLocationsAgentSessionsEntityTypes: API.PaginatedOperationMethod<ListProjectsLocationsAgentSessionsEntityTypesRequest, ListProjectsLocationsAgentSessionsEntityTypesResponse, ListProjectsLocationsAgentSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentSessionsEntityTypesRequest,
  output: ListProjectsLocationsAgentSessionsEntityTypesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentSessionsEntityTypesRequest {
  name: string;
}

export const GetProjectsLocationsAgentSessionsEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/sessions/{sessionsId}/entityTypes/{entityTypesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentSessionsEntityTypesRequest>;

export type GetProjectsLocationsAgentSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1SessionEntityType;
export const GetProjectsLocationsAgentSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1SessionEntityType;

export type GetProjectsLocationsAgentSessionsEntityTypesError = CommonErrors;

export const getProjectsLocationsAgentSessionsEntityTypes: API.OperationMethod<GetProjectsLocationsAgentSessionsEntityTypesRequest, GetProjectsLocationsAgentSessionsEntityTypesResponse, GetProjectsLocationsAgentSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentSessionsEntityTypesRequest,
  output: GetProjectsLocationsAgentSessionsEntityTypesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentSessionsEntityTypesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1SessionEntityType;
}

export const CreateProjectsLocationsAgentSessionsEntityTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1SessionEntityType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/sessions/{sessionsId}/entityTypes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentSessionsEntityTypesRequest>;

export type CreateProjectsLocationsAgentSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1SessionEntityType;
export const CreateProjectsLocationsAgentSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1SessionEntityType;

export type CreateProjectsLocationsAgentSessionsEntityTypesError = CommonErrors;

export const createProjectsLocationsAgentSessionsEntityTypes: API.OperationMethod<CreateProjectsLocationsAgentSessionsEntityTypesRequest, CreateProjectsLocationsAgentSessionsEntityTypesResponse, CreateProjectsLocationsAgentSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentSessionsEntityTypesRequest,
  output: CreateProjectsLocationsAgentSessionsEntityTypesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentSessionsEntityTypesRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1SessionEntityType;
}

export const PatchProjectsLocationsAgentSessionsEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1SessionEntityType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/sessions/{sessionsId}/entityTypes/{entityTypesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentSessionsEntityTypesRequest>;

export type PatchProjectsLocationsAgentSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1SessionEntityType;
export const PatchProjectsLocationsAgentSessionsEntityTypesResponse = GoogleCloudDialogflowV2beta1SessionEntityType;

export type PatchProjectsLocationsAgentSessionsEntityTypesError = CommonErrors;

export const patchProjectsLocationsAgentSessionsEntityTypes: API.OperationMethod<PatchProjectsLocationsAgentSessionsEntityTypesRequest, PatchProjectsLocationsAgentSessionsEntityTypesResponse, PatchProjectsLocationsAgentSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentSessionsEntityTypesRequest,
  output: PatchProjectsLocationsAgentSessionsEntityTypesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentSessionsEntityTypesRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentSessionsEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/sessions/{sessionsId}/entityTypes/{entityTypesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAgentSessionsEntityTypesRequest>;

export type DeleteProjectsLocationsAgentSessionsEntityTypesResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentSessionsEntityTypesResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentSessionsEntityTypesError = CommonErrors;

export const deleteProjectsLocationsAgentSessionsEntityTypes: API.OperationMethod<DeleteProjectsLocationsAgentSessionsEntityTypesRequest, DeleteProjectsLocationsAgentSessionsEntityTypesResponse, DeleteProjectsLocationsAgentSessionsEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAgentSessionsEntityTypesRequest,
  output: DeleteProjectsLocationsAgentSessionsEntityTypesResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentIntentsRequest {
  parent: string;
  languageCode?: string;
  intentView?: "INTENT_VIEW_UNSPECIFIED" | "INTENT_VIEW_FULL" | (string & {});
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentIntentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  intentView: Schema.optional(Schema.String).pipe(T.HttpQuery("intentView")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/intents" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentIntentsRequest>;

export type ListProjectsLocationsAgentIntentsResponse = GoogleCloudDialogflowV2beta1ListIntentsResponse;
export const ListProjectsLocationsAgentIntentsResponse = GoogleCloudDialogflowV2beta1ListIntentsResponse;

export type ListProjectsLocationsAgentIntentsError = CommonErrors;

export const listProjectsLocationsAgentIntents: API.PaginatedOperationMethod<ListProjectsLocationsAgentIntentsRequest, ListProjectsLocationsAgentIntentsResponse, ListProjectsLocationsAgentIntentsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentIntentsRequest,
  output: ListProjectsLocationsAgentIntentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentIntentsRequest {
  name: string;
  languageCode?: string;
  intentView?: "INTENT_VIEW_UNSPECIFIED" | "INTENT_VIEW_FULL" | (string & {});
}

export const GetProjectsLocationsAgentIntentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  intentView: Schema.optional(Schema.String).pipe(T.HttpQuery("intentView")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/intents/{intentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentIntentsRequest>;

export type GetProjectsLocationsAgentIntentsResponse = GoogleCloudDialogflowV2beta1Intent;
export const GetProjectsLocationsAgentIntentsResponse = GoogleCloudDialogflowV2beta1Intent;

export type GetProjectsLocationsAgentIntentsError = CommonErrors;

export const getProjectsLocationsAgentIntents: API.OperationMethod<GetProjectsLocationsAgentIntentsRequest, GetProjectsLocationsAgentIntentsResponse, GetProjectsLocationsAgentIntentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentIntentsRequest,
  output: GetProjectsLocationsAgentIntentsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentIntentsRequest {
  parent: string;
  languageCode?: string;
  intentView?: "INTENT_VIEW_UNSPECIFIED" | "INTENT_VIEW_FULL" | (string & {});
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Intent;
}

export const CreateProjectsLocationsAgentIntentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  intentView: Schema.optional(Schema.String).pipe(T.HttpQuery("intentView")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Intent).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/intents", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentIntentsRequest>;

export type CreateProjectsLocationsAgentIntentsResponse = GoogleCloudDialogflowV2beta1Intent;
export const CreateProjectsLocationsAgentIntentsResponse = GoogleCloudDialogflowV2beta1Intent;

export type CreateProjectsLocationsAgentIntentsError = CommonErrors;

export const createProjectsLocationsAgentIntents: API.OperationMethod<CreateProjectsLocationsAgentIntentsRequest, CreateProjectsLocationsAgentIntentsResponse, CreateProjectsLocationsAgentIntentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentIntentsRequest,
  output: CreateProjectsLocationsAgentIntentsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentIntentsRequest {
  name: string;
  languageCode?: string;
  updateMask?: string;
  intentView?: "INTENT_VIEW_UNSPECIFIED" | "INTENT_VIEW_FULL" | (string & {});
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Intent;
}

export const PatchProjectsLocationsAgentIntentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  intentView: Schema.optional(Schema.String).pipe(T.HttpQuery("intentView")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Intent).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/intents/{intentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentIntentsRequest>;

export type PatchProjectsLocationsAgentIntentsResponse = GoogleCloudDialogflowV2beta1Intent;
export const PatchProjectsLocationsAgentIntentsResponse = GoogleCloudDialogflowV2beta1Intent;

export type PatchProjectsLocationsAgentIntentsError = CommonErrors;

export const patchProjectsLocationsAgentIntents: API.OperationMethod<PatchProjectsLocationsAgentIntentsRequest, PatchProjectsLocationsAgentIntentsResponse, PatchProjectsLocationsAgentIntentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentIntentsRequest,
  output: PatchProjectsLocationsAgentIntentsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentIntentsRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentIntentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/intents/{intentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAgentIntentsRequest>;

export type DeleteProjectsLocationsAgentIntentsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentIntentsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentIntentsError = CommonErrors;

export const deleteProjectsLocationsAgentIntents: API.OperationMethod<DeleteProjectsLocationsAgentIntentsRequest, DeleteProjectsLocationsAgentIntentsResponse, DeleteProjectsLocationsAgentIntentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAgentIntentsRequest,
  output: DeleteProjectsLocationsAgentIntentsResponse,
  errors: [],
}));

export interface BatchUpdateProjectsLocationsAgentIntentsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1BatchUpdateIntentsRequest;
}

export const BatchUpdateProjectsLocationsAgentIntentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1BatchUpdateIntentsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/intents:batchUpdate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchUpdateProjectsLocationsAgentIntentsRequest>;

export type BatchUpdateProjectsLocationsAgentIntentsResponse = GoogleLongrunningOperation;
export const BatchUpdateProjectsLocationsAgentIntentsResponse = GoogleLongrunningOperation;

export type BatchUpdateProjectsLocationsAgentIntentsError = CommonErrors;

export const batchUpdateProjectsLocationsAgentIntents: API.OperationMethod<BatchUpdateProjectsLocationsAgentIntentsRequest, BatchUpdateProjectsLocationsAgentIntentsResponse, BatchUpdateProjectsLocationsAgentIntentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchUpdateProjectsLocationsAgentIntentsRequest,
  output: BatchUpdateProjectsLocationsAgentIntentsResponse,
  errors: [],
}));

export interface BatchDeleteProjectsLocationsAgentIntentsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1BatchDeleteIntentsRequest;
}

export const BatchDeleteProjectsLocationsAgentIntentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1BatchDeleteIntentsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/intents:batchDelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchDeleteProjectsLocationsAgentIntentsRequest>;

export type BatchDeleteProjectsLocationsAgentIntentsResponse = GoogleLongrunningOperation;
export const BatchDeleteProjectsLocationsAgentIntentsResponse = GoogleLongrunningOperation;

export type BatchDeleteProjectsLocationsAgentIntentsError = CommonErrors;

export const batchDeleteProjectsLocationsAgentIntents: API.OperationMethod<BatchDeleteProjectsLocationsAgentIntentsRequest, BatchDeleteProjectsLocationsAgentIntentsResponse, BatchDeleteProjectsLocationsAgentIntentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchDeleteProjectsLocationsAgentIntentsRequest,
  output: BatchDeleteProjectsLocationsAgentIntentsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentEntityTypesRequest {
  parent: string;
  languageCode?: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentEntityTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/entityTypes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentEntityTypesRequest>;

export type ListProjectsLocationsAgentEntityTypesResponse = GoogleCloudDialogflowV2beta1ListEntityTypesResponse;
export const ListProjectsLocationsAgentEntityTypesResponse = GoogleCloudDialogflowV2beta1ListEntityTypesResponse;

export type ListProjectsLocationsAgentEntityTypesError = CommonErrors;

export const listProjectsLocationsAgentEntityTypes: API.PaginatedOperationMethod<ListProjectsLocationsAgentEntityTypesRequest, ListProjectsLocationsAgentEntityTypesResponse, ListProjectsLocationsAgentEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentEntityTypesRequest,
  output: ListProjectsLocationsAgentEntityTypesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentEntityTypesRequest {
  name: string;
  languageCode?: string;
}

export const GetProjectsLocationsAgentEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/entityTypes/{entityTypesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentEntityTypesRequest>;

export type GetProjectsLocationsAgentEntityTypesResponse = GoogleCloudDialogflowV2beta1EntityType;
export const GetProjectsLocationsAgentEntityTypesResponse = GoogleCloudDialogflowV2beta1EntityType;

export type GetProjectsLocationsAgentEntityTypesError = CommonErrors;

export const getProjectsLocationsAgentEntityTypes: API.OperationMethod<GetProjectsLocationsAgentEntityTypesRequest, GetProjectsLocationsAgentEntityTypesResponse, GetProjectsLocationsAgentEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentEntityTypesRequest,
  output: GetProjectsLocationsAgentEntityTypesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentEntityTypesRequest {
  parent: string;
  languageCode?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1EntityType;
}

export const CreateProjectsLocationsAgentEntityTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1EntityType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/entityTypes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentEntityTypesRequest>;

export type CreateProjectsLocationsAgentEntityTypesResponse = GoogleCloudDialogflowV2beta1EntityType;
export const CreateProjectsLocationsAgentEntityTypesResponse = GoogleCloudDialogflowV2beta1EntityType;

export type CreateProjectsLocationsAgentEntityTypesError = CommonErrors;

export const createProjectsLocationsAgentEntityTypes: API.OperationMethod<CreateProjectsLocationsAgentEntityTypesRequest, CreateProjectsLocationsAgentEntityTypesResponse, CreateProjectsLocationsAgentEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentEntityTypesRequest,
  output: CreateProjectsLocationsAgentEntityTypesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentEntityTypesRequest {
  name: string;
  languageCode?: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1EntityType;
}

export const PatchProjectsLocationsAgentEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1EntityType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/entityTypes/{entityTypesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentEntityTypesRequest>;

export type PatchProjectsLocationsAgentEntityTypesResponse = GoogleCloudDialogflowV2beta1EntityType;
export const PatchProjectsLocationsAgentEntityTypesResponse = GoogleCloudDialogflowV2beta1EntityType;

export type PatchProjectsLocationsAgentEntityTypesError = CommonErrors;

export const patchProjectsLocationsAgentEntityTypes: API.OperationMethod<PatchProjectsLocationsAgentEntityTypesRequest, PatchProjectsLocationsAgentEntityTypesResponse, PatchProjectsLocationsAgentEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentEntityTypesRequest,
  output: PatchProjectsLocationsAgentEntityTypesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentEntityTypesRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentEntityTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/entityTypes/{entityTypesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAgentEntityTypesRequest>;

export type DeleteProjectsLocationsAgentEntityTypesResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentEntityTypesResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentEntityTypesError = CommonErrors;

export const deleteProjectsLocationsAgentEntityTypes: API.OperationMethod<DeleteProjectsLocationsAgentEntityTypesRequest, DeleteProjectsLocationsAgentEntityTypesResponse, DeleteProjectsLocationsAgentEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAgentEntityTypesRequest,
  output: DeleteProjectsLocationsAgentEntityTypesResponse,
  errors: [],
}));

export interface BatchUpdateProjectsLocationsAgentEntityTypesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesRequest;
}

export const BatchUpdateProjectsLocationsAgentEntityTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1BatchUpdateEntityTypesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/entityTypes:batchUpdate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchUpdateProjectsLocationsAgentEntityTypesRequest>;

export type BatchUpdateProjectsLocationsAgentEntityTypesResponse = GoogleLongrunningOperation;
export const BatchUpdateProjectsLocationsAgentEntityTypesResponse = GoogleLongrunningOperation;

export type BatchUpdateProjectsLocationsAgentEntityTypesError = CommonErrors;

export const batchUpdateProjectsLocationsAgentEntityTypes: API.OperationMethod<BatchUpdateProjectsLocationsAgentEntityTypesRequest, BatchUpdateProjectsLocationsAgentEntityTypesResponse, BatchUpdateProjectsLocationsAgentEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchUpdateProjectsLocationsAgentEntityTypesRequest,
  output: BatchUpdateProjectsLocationsAgentEntityTypesResponse,
  errors: [],
}));

export interface BatchDeleteProjectsLocationsAgentEntityTypesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1BatchDeleteEntityTypesRequest;
}

export const BatchDeleteProjectsLocationsAgentEntityTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1BatchDeleteEntityTypesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/entityTypes:batchDelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchDeleteProjectsLocationsAgentEntityTypesRequest>;

export type BatchDeleteProjectsLocationsAgentEntityTypesResponse = GoogleLongrunningOperation;
export const BatchDeleteProjectsLocationsAgentEntityTypesResponse = GoogleLongrunningOperation;

export type BatchDeleteProjectsLocationsAgentEntityTypesError = CommonErrors;

export const batchDeleteProjectsLocationsAgentEntityTypes: API.OperationMethod<BatchDeleteProjectsLocationsAgentEntityTypesRequest, BatchDeleteProjectsLocationsAgentEntityTypesResponse, BatchDeleteProjectsLocationsAgentEntityTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchDeleteProjectsLocationsAgentEntityTypesRequest,
  output: BatchDeleteProjectsLocationsAgentEntityTypesResponse,
  errors: [],
}));

export interface BatchCreateProjectsLocationsAgentEntityTypesEntitiesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1BatchCreateEntitiesRequest;
}

export const BatchCreateProjectsLocationsAgentEntityTypesEntitiesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1BatchCreateEntitiesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/entityTypes/{entityTypesId}/entities:batchCreate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchCreateProjectsLocationsAgentEntityTypesEntitiesRequest>;

export type BatchCreateProjectsLocationsAgentEntityTypesEntitiesResponse = GoogleLongrunningOperation;
export const BatchCreateProjectsLocationsAgentEntityTypesEntitiesResponse = GoogleLongrunningOperation;

export type BatchCreateProjectsLocationsAgentEntityTypesEntitiesError = CommonErrors;

export const batchCreateProjectsLocationsAgentEntityTypesEntities: API.OperationMethod<BatchCreateProjectsLocationsAgentEntityTypesEntitiesRequest, BatchCreateProjectsLocationsAgentEntityTypesEntitiesResponse, BatchCreateProjectsLocationsAgentEntityTypesEntitiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchCreateProjectsLocationsAgentEntityTypesEntitiesRequest,
  output: BatchCreateProjectsLocationsAgentEntityTypesEntitiesResponse,
  errors: [],
}));

export interface BatchUpdateProjectsLocationsAgentEntityTypesEntitiesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1BatchUpdateEntitiesRequest;
}

export const BatchUpdateProjectsLocationsAgentEntityTypesEntitiesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1BatchUpdateEntitiesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/entityTypes/{entityTypesId}/entities:batchUpdate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchUpdateProjectsLocationsAgentEntityTypesEntitiesRequest>;

export type BatchUpdateProjectsLocationsAgentEntityTypesEntitiesResponse = GoogleLongrunningOperation;
export const BatchUpdateProjectsLocationsAgentEntityTypesEntitiesResponse = GoogleLongrunningOperation;

export type BatchUpdateProjectsLocationsAgentEntityTypesEntitiesError = CommonErrors;

export const batchUpdateProjectsLocationsAgentEntityTypesEntities: API.OperationMethod<BatchUpdateProjectsLocationsAgentEntityTypesEntitiesRequest, BatchUpdateProjectsLocationsAgentEntityTypesEntitiesResponse, BatchUpdateProjectsLocationsAgentEntityTypesEntitiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchUpdateProjectsLocationsAgentEntityTypesEntitiesRequest,
  output: BatchUpdateProjectsLocationsAgentEntityTypesEntitiesResponse,
  errors: [],
}));

export interface BatchDeleteProjectsLocationsAgentEntityTypesEntitiesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1BatchDeleteEntitiesRequest;
}

export const BatchDeleteProjectsLocationsAgentEntityTypesEntitiesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1BatchDeleteEntitiesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/entityTypes/{entityTypesId}/entities:batchDelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchDeleteProjectsLocationsAgentEntityTypesEntitiesRequest>;

export type BatchDeleteProjectsLocationsAgentEntityTypesEntitiesResponse = GoogleLongrunningOperation;
export const BatchDeleteProjectsLocationsAgentEntityTypesEntitiesResponse = GoogleLongrunningOperation;

export type BatchDeleteProjectsLocationsAgentEntityTypesEntitiesError = CommonErrors;

export const batchDeleteProjectsLocationsAgentEntityTypesEntities: API.OperationMethod<BatchDeleteProjectsLocationsAgentEntityTypesEntitiesRequest, BatchDeleteProjectsLocationsAgentEntityTypesEntitiesResponse, BatchDeleteProjectsLocationsAgentEntityTypesEntitiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchDeleteProjectsLocationsAgentEntityTypesEntitiesRequest,
  output: BatchDeleteProjectsLocationsAgentEntityTypesEntitiesResponse,
  errors: [],
}));

export interface ListProjectsLocationsAgentVersionsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAgentVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/versions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAgentVersionsRequest>;

export type ListProjectsLocationsAgentVersionsResponse = GoogleCloudDialogflowV2beta1ListVersionsResponse;
export const ListProjectsLocationsAgentVersionsResponse = GoogleCloudDialogflowV2beta1ListVersionsResponse;

export type ListProjectsLocationsAgentVersionsError = CommonErrors;

export const listProjectsLocationsAgentVersions: API.PaginatedOperationMethod<ListProjectsLocationsAgentVersionsRequest, ListProjectsLocationsAgentVersionsResponse, ListProjectsLocationsAgentVersionsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAgentVersionsRequest,
  output: ListProjectsLocationsAgentVersionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsAgentVersionsRequest {
  name: string;
}

export const GetProjectsLocationsAgentVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAgentVersionsRequest>;

export type GetProjectsLocationsAgentVersionsResponse = GoogleCloudDialogflowV2beta1Version;
export const GetProjectsLocationsAgentVersionsResponse = GoogleCloudDialogflowV2beta1Version;

export type GetProjectsLocationsAgentVersionsError = CommonErrors;

export const getProjectsLocationsAgentVersions: API.OperationMethod<GetProjectsLocationsAgentVersionsRequest, GetProjectsLocationsAgentVersionsResponse, GetProjectsLocationsAgentVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAgentVersionsRequest,
  output: GetProjectsLocationsAgentVersionsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsAgentVersionsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Version;
}

export const CreateProjectsLocationsAgentVersionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Version).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/versions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAgentVersionsRequest>;

export type CreateProjectsLocationsAgentVersionsResponse = GoogleCloudDialogflowV2beta1Version;
export const CreateProjectsLocationsAgentVersionsResponse = GoogleCloudDialogflowV2beta1Version;

export type CreateProjectsLocationsAgentVersionsError = CommonErrors;

export const createProjectsLocationsAgentVersions: API.OperationMethod<CreateProjectsLocationsAgentVersionsRequest, CreateProjectsLocationsAgentVersionsResponse, CreateProjectsLocationsAgentVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAgentVersionsRequest,
  output: CreateProjectsLocationsAgentVersionsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsAgentVersionsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Version;
}

export const PatchProjectsLocationsAgentVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Version).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/versions/{versionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAgentVersionsRequest>;

export type PatchProjectsLocationsAgentVersionsResponse = GoogleCloudDialogflowV2beta1Version;
export const PatchProjectsLocationsAgentVersionsResponse = GoogleCloudDialogflowV2beta1Version;

export type PatchProjectsLocationsAgentVersionsError = CommonErrors;

export const patchProjectsLocationsAgentVersions: API.OperationMethod<PatchProjectsLocationsAgentVersionsRequest, PatchProjectsLocationsAgentVersionsResponse, PatchProjectsLocationsAgentVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAgentVersionsRequest,
  output: PatchProjectsLocationsAgentVersionsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsAgentVersionsRequest {
  name: string;
}

export const DeleteProjectsLocationsAgentVersionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/agent/versions/{versionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAgentVersionsRequest>;

export type DeleteProjectsLocationsAgentVersionsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsAgentVersionsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsAgentVersionsError = CommonErrors;

export const deleteProjectsLocationsAgentVersions: API.OperationMethod<DeleteProjectsLocationsAgentVersionsRequest, DeleteProjectsLocationsAgentVersionsResponse, DeleteProjectsLocationsAgentVersionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAgentVersionsRequest,
  output: DeleteProjectsLocationsAgentVersionsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsToolsRequest {
  parent: string;
  toolId?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Tool;
}

export const CreateProjectsLocationsToolsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  toolId: Schema.optional(Schema.String).pipe(T.HttpQuery("toolId")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Tool).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/tools", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsToolsRequest>;

export type CreateProjectsLocationsToolsResponse = GoogleCloudDialogflowV2beta1Tool;
export const CreateProjectsLocationsToolsResponse = GoogleCloudDialogflowV2beta1Tool;

export type CreateProjectsLocationsToolsError = CommonErrors;

export const createProjectsLocationsTools: API.OperationMethod<CreateProjectsLocationsToolsRequest, CreateProjectsLocationsToolsResponse, CreateProjectsLocationsToolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsToolsRequest,
  output: CreateProjectsLocationsToolsResponse,
  errors: [],
}));

export interface GetProjectsLocationsToolsRequest {
  name: string;
}

export const GetProjectsLocationsToolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/tools/{toolsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsToolsRequest>;

export type GetProjectsLocationsToolsResponse = GoogleCloudDialogflowV2beta1Tool;
export const GetProjectsLocationsToolsResponse = GoogleCloudDialogflowV2beta1Tool;

export type GetProjectsLocationsToolsError = CommonErrors;

export const getProjectsLocationsTools: API.OperationMethod<GetProjectsLocationsToolsRequest, GetProjectsLocationsToolsResponse, GetProjectsLocationsToolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsToolsRequest,
  output: GetProjectsLocationsToolsResponse,
  errors: [],
}));

export interface ListProjectsLocationsToolsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsToolsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/tools" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsToolsRequest>;

export type ListProjectsLocationsToolsResponse = GoogleCloudDialogflowV2beta1ListToolsResponse;
export const ListProjectsLocationsToolsResponse = GoogleCloudDialogflowV2beta1ListToolsResponse;

export type ListProjectsLocationsToolsError = CommonErrors;

export const listProjectsLocationsTools: API.PaginatedOperationMethod<ListProjectsLocationsToolsRequest, ListProjectsLocationsToolsResponse, ListProjectsLocationsToolsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsToolsRequest,
  output: ListProjectsLocationsToolsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsToolsRequest {
  name: string;
}

export const DeleteProjectsLocationsToolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/tools/{toolsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsToolsRequest>;

export type DeleteProjectsLocationsToolsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsToolsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsToolsError = CommonErrors;

export const deleteProjectsLocationsTools: API.OperationMethod<DeleteProjectsLocationsToolsRequest, DeleteProjectsLocationsToolsResponse, DeleteProjectsLocationsToolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsToolsRequest,
  output: DeleteProjectsLocationsToolsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsToolsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Tool;
}

export const PatchProjectsLocationsToolsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Tool).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/tools/{toolsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsToolsRequest>;

export type PatchProjectsLocationsToolsResponse = GoogleCloudDialogflowV2beta1Tool;
export const PatchProjectsLocationsToolsResponse = GoogleCloudDialogflowV2beta1Tool;

export type PatchProjectsLocationsToolsError = CommonErrors;

export const patchProjectsLocationsTools: API.OperationMethod<PatchProjectsLocationsToolsRequest, PatchProjectsLocationsToolsResponse, PatchProjectsLocationsToolsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsToolsRequest,
  output: PatchProjectsLocationsToolsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsGeneratorsRequest {
  parent: string;
  generatorId?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Generator;
}

export const CreateProjectsLocationsGeneratorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  generatorId: Schema.optional(Schema.String).pipe(T.HttpQuery("generatorId")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Generator).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/generators", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsGeneratorsRequest>;

export type CreateProjectsLocationsGeneratorsResponse = GoogleCloudDialogflowV2beta1Generator;
export const CreateProjectsLocationsGeneratorsResponse = GoogleCloudDialogflowV2beta1Generator;

export type CreateProjectsLocationsGeneratorsError = CommonErrors;

export const createProjectsLocationsGenerators: API.OperationMethod<CreateProjectsLocationsGeneratorsRequest, CreateProjectsLocationsGeneratorsResponse, CreateProjectsLocationsGeneratorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsGeneratorsRequest,
  output: CreateProjectsLocationsGeneratorsResponse,
  errors: [],
}));

export interface GetProjectsLocationsGeneratorsRequest {
  name: string;
}

export const GetProjectsLocationsGeneratorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/generators/{generatorsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsGeneratorsRequest>;

export type GetProjectsLocationsGeneratorsResponse = GoogleCloudDialogflowV2beta1Generator;
export const GetProjectsLocationsGeneratorsResponse = GoogleCloudDialogflowV2beta1Generator;

export type GetProjectsLocationsGeneratorsError = CommonErrors;

export const getProjectsLocationsGenerators: API.OperationMethod<GetProjectsLocationsGeneratorsRequest, GetProjectsLocationsGeneratorsResponse, GetProjectsLocationsGeneratorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsGeneratorsRequest,
  output: GetProjectsLocationsGeneratorsResponse,
  errors: [],
}));

export interface ListProjectsLocationsGeneratorsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsGeneratorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/generators" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsGeneratorsRequest>;

export type ListProjectsLocationsGeneratorsResponse = GoogleCloudDialogflowV2beta1ListGeneratorsResponse;
export const ListProjectsLocationsGeneratorsResponse = GoogleCloudDialogflowV2beta1ListGeneratorsResponse;

export type ListProjectsLocationsGeneratorsError = CommonErrors;

export const listProjectsLocationsGenerators: API.PaginatedOperationMethod<ListProjectsLocationsGeneratorsRequest, ListProjectsLocationsGeneratorsResponse, ListProjectsLocationsGeneratorsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsGeneratorsRequest,
  output: ListProjectsLocationsGeneratorsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsGeneratorsRequest {
  name: string;
}

export const DeleteProjectsLocationsGeneratorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/generators/{generatorsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsGeneratorsRequest>;

export type DeleteProjectsLocationsGeneratorsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsGeneratorsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsGeneratorsError = CommonErrors;

export const deleteProjectsLocationsGenerators: API.OperationMethod<DeleteProjectsLocationsGeneratorsRequest, DeleteProjectsLocationsGeneratorsResponse, DeleteProjectsLocationsGeneratorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsGeneratorsRequest,
  output: DeleteProjectsLocationsGeneratorsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsGeneratorsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Generator;
}

export const PatchProjectsLocationsGeneratorsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Generator).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/generators/{generatorsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsGeneratorsRequest>;

export type PatchProjectsLocationsGeneratorsResponse = GoogleCloudDialogflowV2beta1Generator;
export const PatchProjectsLocationsGeneratorsResponse = GoogleCloudDialogflowV2beta1Generator;

export type PatchProjectsLocationsGeneratorsError = CommonErrors;

export const patchProjectsLocationsGenerators: API.OperationMethod<PatchProjectsLocationsGeneratorsRequest, PatchProjectsLocationsGeneratorsResponse, PatchProjectsLocationsGeneratorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsGeneratorsRequest,
  output: PatchProjectsLocationsGeneratorsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsGeneratorsEvaluationsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1GeneratorEvaluation;
}

export const CreateProjectsLocationsGeneratorsEvaluationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1GeneratorEvaluation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/generators/{generatorsId}/evaluations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsGeneratorsEvaluationsRequest>;

export type CreateProjectsLocationsGeneratorsEvaluationsResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsGeneratorsEvaluationsResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsGeneratorsEvaluationsError = CommonErrors;

export const createProjectsLocationsGeneratorsEvaluations: API.OperationMethod<CreateProjectsLocationsGeneratorsEvaluationsRequest, CreateProjectsLocationsGeneratorsEvaluationsResponse, CreateProjectsLocationsGeneratorsEvaluationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsGeneratorsEvaluationsRequest,
  output: CreateProjectsLocationsGeneratorsEvaluationsResponse,
  errors: [],
}));

export interface GetProjectsLocationsGeneratorsEvaluationsRequest {
  name: string;
}

export const GetProjectsLocationsGeneratorsEvaluationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/generators/{generatorsId}/evaluations/{evaluationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsGeneratorsEvaluationsRequest>;

export type GetProjectsLocationsGeneratorsEvaluationsResponse = GoogleCloudDialogflowV2beta1GeneratorEvaluation;
export const GetProjectsLocationsGeneratorsEvaluationsResponse = GoogleCloudDialogflowV2beta1GeneratorEvaluation;

export type GetProjectsLocationsGeneratorsEvaluationsError = CommonErrors;

export const getProjectsLocationsGeneratorsEvaluations: API.OperationMethod<GetProjectsLocationsGeneratorsEvaluationsRequest, GetProjectsLocationsGeneratorsEvaluationsResponse, GetProjectsLocationsGeneratorsEvaluationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsGeneratorsEvaluationsRequest,
  output: GetProjectsLocationsGeneratorsEvaluationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsGeneratorsEvaluationsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsGeneratorsEvaluationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/generators/{generatorsId}/evaluations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsGeneratorsEvaluationsRequest>;

export type ListProjectsLocationsGeneratorsEvaluationsResponse = GoogleCloudDialogflowV2beta1ListGeneratorEvaluationsResponse;
export const ListProjectsLocationsGeneratorsEvaluationsResponse = GoogleCloudDialogflowV2beta1ListGeneratorEvaluationsResponse;

export type ListProjectsLocationsGeneratorsEvaluationsError = CommonErrors;

export const listProjectsLocationsGeneratorsEvaluations: API.PaginatedOperationMethod<ListProjectsLocationsGeneratorsEvaluationsRequest, ListProjectsLocationsGeneratorsEvaluationsResponse, ListProjectsLocationsGeneratorsEvaluationsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsGeneratorsEvaluationsRequest,
  output: ListProjectsLocationsGeneratorsEvaluationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsLocationsGeneratorsEvaluationsRequest {
  name: string;
}

export const DeleteProjectsLocationsGeneratorsEvaluationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/generators/{generatorsId}/evaluations/{evaluationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsGeneratorsEvaluationsRequest>;

export type DeleteProjectsLocationsGeneratorsEvaluationsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsGeneratorsEvaluationsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsGeneratorsEvaluationsError = CommonErrors;

export const deleteProjectsLocationsGeneratorsEvaluations: API.OperationMethod<DeleteProjectsLocationsGeneratorsEvaluationsRequest, DeleteProjectsLocationsGeneratorsEvaluationsResponse, DeleteProjectsLocationsGeneratorsEvaluationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsGeneratorsEvaluationsRequest,
  output: DeleteProjectsLocationsGeneratorsEvaluationsResponse,
  errors: [],
}));

export interface GetProjectsLocationsAnswerRecordsRequest {
  name: string;
}

export const GetProjectsLocationsAnswerRecordsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/answerRecords/{answerRecordsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAnswerRecordsRequest>;

export type GetProjectsLocationsAnswerRecordsResponse = GoogleCloudDialogflowV2beta1AnswerRecord;
export const GetProjectsLocationsAnswerRecordsResponse = GoogleCloudDialogflowV2beta1AnswerRecord;

export type GetProjectsLocationsAnswerRecordsError = CommonErrors;

export const getProjectsLocationsAnswerRecords: API.OperationMethod<GetProjectsLocationsAnswerRecordsRequest, GetProjectsLocationsAnswerRecordsResponse, GetProjectsLocationsAnswerRecordsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAnswerRecordsRequest,
  output: GetProjectsLocationsAnswerRecordsResponse,
  errors: [],
}));

export interface ListProjectsLocationsAnswerRecordsRequest {
  parent: string;
  filter?: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsAnswerRecordsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/answerRecords" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAnswerRecordsRequest>;

export type ListProjectsLocationsAnswerRecordsResponse = GoogleCloudDialogflowV2beta1ListAnswerRecordsResponse;
export const ListProjectsLocationsAnswerRecordsResponse = GoogleCloudDialogflowV2beta1ListAnswerRecordsResponse;

export type ListProjectsLocationsAnswerRecordsError = CommonErrors;

export const listProjectsLocationsAnswerRecords: API.PaginatedOperationMethod<ListProjectsLocationsAnswerRecordsRequest, ListProjectsLocationsAnswerRecordsResponse, ListProjectsLocationsAnswerRecordsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsAnswerRecordsRequest,
  output: ListProjectsLocationsAnswerRecordsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsLocationsAnswerRecordsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1AnswerRecord;
}

export const PatchProjectsLocationsAnswerRecordsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1AnswerRecord).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/answerRecords/{answerRecordsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAnswerRecordsRequest>;

export type PatchProjectsLocationsAnswerRecordsResponse = GoogleCloudDialogflowV2beta1AnswerRecord;
export const PatchProjectsLocationsAnswerRecordsResponse = GoogleCloudDialogflowV2beta1AnswerRecord;

export type PatchProjectsLocationsAnswerRecordsError = CommonErrors;

export const patchProjectsLocationsAnswerRecords: API.OperationMethod<PatchProjectsLocationsAnswerRecordsRequest, PatchProjectsLocationsAnswerRecordsResponse, PatchProjectsLocationsAnswerRecordsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAnswerRecordsRequest,
  output: PatchProjectsLocationsAnswerRecordsResponse,
  errors: [],
}));

export interface ListProjectsLocationsConversationProfilesRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsConversationProfilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/conversationProfiles" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsConversationProfilesRequest>;

export type ListProjectsLocationsConversationProfilesResponse = GoogleCloudDialogflowV2beta1ListConversationProfilesResponse;
export const ListProjectsLocationsConversationProfilesResponse = GoogleCloudDialogflowV2beta1ListConversationProfilesResponse;

export type ListProjectsLocationsConversationProfilesError = CommonErrors;

export const listProjectsLocationsConversationProfiles: API.PaginatedOperationMethod<ListProjectsLocationsConversationProfilesRequest, ListProjectsLocationsConversationProfilesResponse, ListProjectsLocationsConversationProfilesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsConversationProfilesRequest,
  output: ListProjectsLocationsConversationProfilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsConversationProfilesRequest {
  name: string;
}

export const GetProjectsLocationsConversationProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/conversationProfiles/{conversationProfilesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsConversationProfilesRequest>;

export type GetProjectsLocationsConversationProfilesResponse = GoogleCloudDialogflowV2beta1ConversationProfile;
export const GetProjectsLocationsConversationProfilesResponse = GoogleCloudDialogflowV2beta1ConversationProfile;

export type GetProjectsLocationsConversationProfilesError = CommonErrors;

export const getProjectsLocationsConversationProfiles: API.OperationMethod<GetProjectsLocationsConversationProfilesRequest, GetProjectsLocationsConversationProfilesResponse, GetProjectsLocationsConversationProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsConversationProfilesRequest,
  output: GetProjectsLocationsConversationProfilesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsConversationProfilesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1ConversationProfile;
}

export const CreateProjectsLocationsConversationProfilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1ConversationProfile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/conversationProfiles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsConversationProfilesRequest>;

export type CreateProjectsLocationsConversationProfilesResponse = GoogleCloudDialogflowV2beta1ConversationProfile;
export const CreateProjectsLocationsConversationProfilesResponse = GoogleCloudDialogflowV2beta1ConversationProfile;

export type CreateProjectsLocationsConversationProfilesError = CommonErrors;

export const createProjectsLocationsConversationProfiles: API.OperationMethod<CreateProjectsLocationsConversationProfilesRequest, CreateProjectsLocationsConversationProfilesResponse, CreateProjectsLocationsConversationProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsConversationProfilesRequest,
  output: CreateProjectsLocationsConversationProfilesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsConversationProfilesRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1ConversationProfile;
}

export const PatchProjectsLocationsConversationProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1ConversationProfile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/conversationProfiles/{conversationProfilesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsConversationProfilesRequest>;

export type PatchProjectsLocationsConversationProfilesResponse = GoogleCloudDialogflowV2beta1ConversationProfile;
export const PatchProjectsLocationsConversationProfilesResponse = GoogleCloudDialogflowV2beta1ConversationProfile;

export type PatchProjectsLocationsConversationProfilesError = CommonErrors;

export const patchProjectsLocationsConversationProfiles: API.OperationMethod<PatchProjectsLocationsConversationProfilesRequest, PatchProjectsLocationsConversationProfilesResponse, PatchProjectsLocationsConversationProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsConversationProfilesRequest,
  output: PatchProjectsLocationsConversationProfilesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsConversationProfilesRequest {
  name: string;
}

export const DeleteProjectsLocationsConversationProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/conversationProfiles/{conversationProfilesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsConversationProfilesRequest>;

export type DeleteProjectsLocationsConversationProfilesResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsConversationProfilesResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsConversationProfilesError = CommonErrors;

export const deleteProjectsLocationsConversationProfiles: API.OperationMethod<DeleteProjectsLocationsConversationProfilesRequest, DeleteProjectsLocationsConversationProfilesResponse, DeleteProjectsLocationsConversationProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsConversationProfilesRequest,
  output: DeleteProjectsLocationsConversationProfilesResponse,
  errors: [],
}));

export interface SetSuggestionFeatureConfigProjectsLocationsConversationProfilesRequest {
  conversationProfile: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1SetSuggestionFeatureConfigRequest;
}

export const SetSuggestionFeatureConfigProjectsLocationsConversationProfilesRequest = Schema.Struct({
  conversationProfile: Schema.String.pipe(T.HttpPath("conversationProfile")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1SetSuggestionFeatureConfigRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/conversationProfiles/{conversationProfilesId}:setSuggestionFeatureConfig", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetSuggestionFeatureConfigProjectsLocationsConversationProfilesRequest>;

export type SetSuggestionFeatureConfigProjectsLocationsConversationProfilesResponse = GoogleLongrunningOperation;
export const SetSuggestionFeatureConfigProjectsLocationsConversationProfilesResponse = GoogleLongrunningOperation;

export type SetSuggestionFeatureConfigProjectsLocationsConversationProfilesError = CommonErrors;

export const setSuggestionFeatureConfigProjectsLocationsConversationProfiles: API.OperationMethod<SetSuggestionFeatureConfigProjectsLocationsConversationProfilesRequest, SetSuggestionFeatureConfigProjectsLocationsConversationProfilesResponse, SetSuggestionFeatureConfigProjectsLocationsConversationProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetSuggestionFeatureConfigProjectsLocationsConversationProfilesRequest,
  output: SetSuggestionFeatureConfigProjectsLocationsConversationProfilesResponse,
  errors: [],
}));

export interface ClearSuggestionFeatureConfigProjectsLocationsConversationProfilesRequest {
  conversationProfile: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1ClearSuggestionFeatureConfigRequest;
}

export const ClearSuggestionFeatureConfigProjectsLocationsConversationProfilesRequest = Schema.Struct({
  conversationProfile: Schema.String.pipe(T.HttpPath("conversationProfile")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1ClearSuggestionFeatureConfigRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/conversationProfiles/{conversationProfilesId}:clearSuggestionFeatureConfig", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ClearSuggestionFeatureConfigProjectsLocationsConversationProfilesRequest>;

export type ClearSuggestionFeatureConfigProjectsLocationsConversationProfilesResponse = GoogleLongrunningOperation;
export const ClearSuggestionFeatureConfigProjectsLocationsConversationProfilesResponse = GoogleLongrunningOperation;

export type ClearSuggestionFeatureConfigProjectsLocationsConversationProfilesError = CommonErrors;

export const clearSuggestionFeatureConfigProjectsLocationsConversationProfiles: API.OperationMethod<ClearSuggestionFeatureConfigProjectsLocationsConversationProfilesRequest, ClearSuggestionFeatureConfigProjectsLocationsConversationProfilesResponse, ClearSuggestionFeatureConfigProjectsLocationsConversationProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ClearSuggestionFeatureConfigProjectsLocationsConversationProfilesRequest,
  output: ClearSuggestionFeatureConfigProjectsLocationsConversationProfilesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsConversationsRequest {
  parent: string;
  conversationId?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Conversation;
}

export const CreateProjectsLocationsConversationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  conversationId: Schema.optional(Schema.String).pipe(T.HttpQuery("conversationId")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Conversation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/conversations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsConversationsRequest>;

export type CreateProjectsLocationsConversationsResponse = GoogleCloudDialogflowV2beta1Conversation;
export const CreateProjectsLocationsConversationsResponse = GoogleCloudDialogflowV2beta1Conversation;

export type CreateProjectsLocationsConversationsError = CommonErrors;

export const createProjectsLocationsConversations: API.OperationMethod<CreateProjectsLocationsConversationsRequest, CreateProjectsLocationsConversationsResponse, CreateProjectsLocationsConversationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsConversationsRequest,
  output: CreateProjectsLocationsConversationsResponse,
  errors: [],
}));

export interface ListProjectsLocationsConversationsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
  filter?: string;
}

export const ListProjectsLocationsConversationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/conversations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsConversationsRequest>;

export type ListProjectsLocationsConversationsResponse = GoogleCloudDialogflowV2beta1ListConversationsResponse;
export const ListProjectsLocationsConversationsResponse = GoogleCloudDialogflowV2beta1ListConversationsResponse;

export type ListProjectsLocationsConversationsError = CommonErrors;

export const listProjectsLocationsConversations: API.PaginatedOperationMethod<ListProjectsLocationsConversationsRequest, ListProjectsLocationsConversationsResponse, ListProjectsLocationsConversationsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsConversationsRequest,
  output: ListProjectsLocationsConversationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsConversationsRequest {
  name: string;
}

export const GetProjectsLocationsConversationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/conversations/{conversationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsConversationsRequest>;

export type GetProjectsLocationsConversationsResponse = GoogleCloudDialogflowV2beta1Conversation;
export const GetProjectsLocationsConversationsResponse = GoogleCloudDialogflowV2beta1Conversation;

export type GetProjectsLocationsConversationsError = CommonErrors;

export const getProjectsLocationsConversations: API.OperationMethod<GetProjectsLocationsConversationsRequest, GetProjectsLocationsConversationsResponse, GetProjectsLocationsConversationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsConversationsRequest,
  output: GetProjectsLocationsConversationsResponse,
  errors: [],
}));

export interface CompleteProjectsLocationsConversationsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1CompleteConversationRequest;
}

export const CompleteProjectsLocationsConversationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1CompleteConversationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/conversations/{conversationsId}:complete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CompleteProjectsLocationsConversationsRequest>;

export type CompleteProjectsLocationsConversationsResponse = GoogleCloudDialogflowV2beta1Conversation;
export const CompleteProjectsLocationsConversationsResponse = GoogleCloudDialogflowV2beta1Conversation;

export type CompleteProjectsLocationsConversationsError = CommonErrors;

export const completeProjectsLocationsConversations: API.OperationMethod<CompleteProjectsLocationsConversationsRequest, CompleteProjectsLocationsConversationsResponse, CompleteProjectsLocationsConversationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CompleteProjectsLocationsConversationsRequest,
  output: CompleteProjectsLocationsConversationsResponse,
  errors: [],
}));

export interface IngestContextReferencesProjectsLocationsConversationsRequest {
  conversation: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1IngestContextReferencesRequest;
}

export const IngestContextReferencesProjectsLocationsConversationsRequest = Schema.Struct({
  conversation: Schema.String.pipe(T.HttpPath("conversation")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1IngestContextReferencesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/conversations/{conversationsId}:ingestContextReferences", hasBody: true }),
  svc,
) as unknown as Schema.Schema<IngestContextReferencesProjectsLocationsConversationsRequest>;

export type IngestContextReferencesProjectsLocationsConversationsResponse = GoogleCloudDialogflowV2beta1IngestContextReferencesResponse;
export const IngestContextReferencesProjectsLocationsConversationsResponse = GoogleCloudDialogflowV2beta1IngestContextReferencesResponse;

export type IngestContextReferencesProjectsLocationsConversationsError = CommonErrors;

export const ingestContextReferencesProjectsLocationsConversations: API.OperationMethod<IngestContextReferencesProjectsLocationsConversationsRequest, IngestContextReferencesProjectsLocationsConversationsResponse, IngestContextReferencesProjectsLocationsConversationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: IngestContextReferencesProjectsLocationsConversationsRequest,
  output: IngestContextReferencesProjectsLocationsConversationsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsConversationsParticipantsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Participant;
}

export const CreateProjectsLocationsConversationsParticipantsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Participant).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/conversations/{conversationsId}/participants", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsConversationsParticipantsRequest>;

export type CreateProjectsLocationsConversationsParticipantsResponse = GoogleCloudDialogflowV2beta1Participant;
export const CreateProjectsLocationsConversationsParticipantsResponse = GoogleCloudDialogflowV2beta1Participant;

export type CreateProjectsLocationsConversationsParticipantsError = CommonErrors;

export const createProjectsLocationsConversationsParticipants: API.OperationMethod<CreateProjectsLocationsConversationsParticipantsRequest, CreateProjectsLocationsConversationsParticipantsResponse, CreateProjectsLocationsConversationsParticipantsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsConversationsParticipantsRequest,
  output: CreateProjectsLocationsConversationsParticipantsResponse,
  errors: [],
}));

export interface GetProjectsLocationsConversationsParticipantsRequest {
  name: string;
}

export const GetProjectsLocationsConversationsParticipantsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/conversations/{conversationsId}/participants/{participantsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsConversationsParticipantsRequest>;

export type GetProjectsLocationsConversationsParticipantsResponse = GoogleCloudDialogflowV2beta1Participant;
export const GetProjectsLocationsConversationsParticipantsResponse = GoogleCloudDialogflowV2beta1Participant;

export type GetProjectsLocationsConversationsParticipantsError = CommonErrors;

export const getProjectsLocationsConversationsParticipants: API.OperationMethod<GetProjectsLocationsConversationsParticipantsRequest, GetProjectsLocationsConversationsParticipantsResponse, GetProjectsLocationsConversationsParticipantsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsConversationsParticipantsRequest,
  output: GetProjectsLocationsConversationsParticipantsResponse,
  errors: [],
}));

export interface ListProjectsLocationsConversationsParticipantsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsConversationsParticipantsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/conversations/{conversationsId}/participants" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsConversationsParticipantsRequest>;

export type ListProjectsLocationsConversationsParticipantsResponse = GoogleCloudDialogflowV2beta1ListParticipantsResponse;
export const ListProjectsLocationsConversationsParticipantsResponse = GoogleCloudDialogflowV2beta1ListParticipantsResponse;

export type ListProjectsLocationsConversationsParticipantsError = CommonErrors;

export const listProjectsLocationsConversationsParticipants: API.PaginatedOperationMethod<ListProjectsLocationsConversationsParticipantsRequest, ListProjectsLocationsConversationsParticipantsResponse, ListProjectsLocationsConversationsParticipantsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsConversationsParticipantsRequest,
  output: ListProjectsLocationsConversationsParticipantsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsLocationsConversationsParticipantsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Participant;
}

export const PatchProjectsLocationsConversationsParticipantsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Participant).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/conversations/{conversationsId}/participants/{participantsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsConversationsParticipantsRequest>;

export type PatchProjectsLocationsConversationsParticipantsResponse = GoogleCloudDialogflowV2beta1Participant;
export const PatchProjectsLocationsConversationsParticipantsResponse = GoogleCloudDialogflowV2beta1Participant;

export type PatchProjectsLocationsConversationsParticipantsError = CommonErrors;

export const patchProjectsLocationsConversationsParticipants: API.OperationMethod<PatchProjectsLocationsConversationsParticipantsRequest, PatchProjectsLocationsConversationsParticipantsResponse, PatchProjectsLocationsConversationsParticipantsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsConversationsParticipantsRequest,
  output: PatchProjectsLocationsConversationsParticipantsResponse,
  errors: [],
}));

export interface AnalyzeContentProjectsLocationsConversationsParticipantsRequest {
  participant: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1AnalyzeContentRequest;
}

export const AnalyzeContentProjectsLocationsConversationsParticipantsRequest = Schema.Struct({
  participant: Schema.String.pipe(T.HttpPath("participant")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1AnalyzeContentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/conversations/{conversationsId}/participants/{participantsId}:analyzeContent", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AnalyzeContentProjectsLocationsConversationsParticipantsRequest>;

export type AnalyzeContentProjectsLocationsConversationsParticipantsResponse = GoogleCloudDialogflowV2beta1AnalyzeContentResponse;
export const AnalyzeContentProjectsLocationsConversationsParticipantsResponse = GoogleCloudDialogflowV2beta1AnalyzeContentResponse;

export type AnalyzeContentProjectsLocationsConversationsParticipantsError = CommonErrors;

export const analyzeContentProjectsLocationsConversationsParticipants: API.OperationMethod<AnalyzeContentProjectsLocationsConversationsParticipantsRequest, AnalyzeContentProjectsLocationsConversationsParticipantsResponse, AnalyzeContentProjectsLocationsConversationsParticipantsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AnalyzeContentProjectsLocationsConversationsParticipantsRequest,
  output: AnalyzeContentProjectsLocationsConversationsParticipantsResponse,
  errors: [],
}));

export interface SuggestArticlesProjectsLocationsConversationsParticipantsSuggestionsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1SuggestArticlesRequest;
}

export const SuggestArticlesProjectsLocationsConversationsParticipantsSuggestionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1SuggestArticlesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/conversations/{conversationsId}/participants/{participantsId}/suggestions:suggestArticles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SuggestArticlesProjectsLocationsConversationsParticipantsSuggestionsRequest>;

export type SuggestArticlesProjectsLocationsConversationsParticipantsSuggestionsResponse = GoogleCloudDialogflowV2beta1SuggestArticlesResponse;
export const SuggestArticlesProjectsLocationsConversationsParticipantsSuggestionsResponse = GoogleCloudDialogflowV2beta1SuggestArticlesResponse;

export type SuggestArticlesProjectsLocationsConversationsParticipantsSuggestionsError = CommonErrors;

export const suggestArticlesProjectsLocationsConversationsParticipantsSuggestions: API.OperationMethod<SuggestArticlesProjectsLocationsConversationsParticipantsSuggestionsRequest, SuggestArticlesProjectsLocationsConversationsParticipantsSuggestionsResponse, SuggestArticlesProjectsLocationsConversationsParticipantsSuggestionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SuggestArticlesProjectsLocationsConversationsParticipantsSuggestionsRequest,
  output: SuggestArticlesProjectsLocationsConversationsParticipantsSuggestionsResponse,
  errors: [],
}));

export interface SuggestFaqAnswersProjectsLocationsConversationsParticipantsSuggestionsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1SuggestFaqAnswersRequest;
}

export const SuggestFaqAnswersProjectsLocationsConversationsParticipantsSuggestionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1SuggestFaqAnswersRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/conversations/{conversationsId}/participants/{participantsId}/suggestions:suggestFaqAnswers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SuggestFaqAnswersProjectsLocationsConversationsParticipantsSuggestionsRequest>;

export type SuggestFaqAnswersProjectsLocationsConversationsParticipantsSuggestionsResponse = GoogleCloudDialogflowV2beta1SuggestFaqAnswersResponse;
export const SuggestFaqAnswersProjectsLocationsConversationsParticipantsSuggestionsResponse = GoogleCloudDialogflowV2beta1SuggestFaqAnswersResponse;

export type SuggestFaqAnswersProjectsLocationsConversationsParticipantsSuggestionsError = CommonErrors;

export const suggestFaqAnswersProjectsLocationsConversationsParticipantsSuggestions: API.OperationMethod<SuggestFaqAnswersProjectsLocationsConversationsParticipantsSuggestionsRequest, SuggestFaqAnswersProjectsLocationsConversationsParticipantsSuggestionsResponse, SuggestFaqAnswersProjectsLocationsConversationsParticipantsSuggestionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SuggestFaqAnswersProjectsLocationsConversationsParticipantsSuggestionsRequest,
  output: SuggestFaqAnswersProjectsLocationsConversationsParticipantsSuggestionsResponse,
  errors: [],
}));

export interface SuggestSmartRepliesProjectsLocationsConversationsParticipantsSuggestionsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1SuggestSmartRepliesRequest;
}

export const SuggestSmartRepliesProjectsLocationsConversationsParticipantsSuggestionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1SuggestSmartRepliesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/conversations/{conversationsId}/participants/{participantsId}/suggestions:suggestSmartReplies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SuggestSmartRepliesProjectsLocationsConversationsParticipantsSuggestionsRequest>;

export type SuggestSmartRepliesProjectsLocationsConversationsParticipantsSuggestionsResponse = GoogleCloudDialogflowV2beta1SuggestSmartRepliesResponse;
export const SuggestSmartRepliesProjectsLocationsConversationsParticipantsSuggestionsResponse = GoogleCloudDialogflowV2beta1SuggestSmartRepliesResponse;

export type SuggestSmartRepliesProjectsLocationsConversationsParticipantsSuggestionsError = CommonErrors;

export const suggestSmartRepliesProjectsLocationsConversationsParticipantsSuggestions: API.OperationMethod<SuggestSmartRepliesProjectsLocationsConversationsParticipantsSuggestionsRequest, SuggestSmartRepliesProjectsLocationsConversationsParticipantsSuggestionsResponse, SuggestSmartRepliesProjectsLocationsConversationsParticipantsSuggestionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SuggestSmartRepliesProjectsLocationsConversationsParticipantsSuggestionsRequest,
  output: SuggestSmartRepliesProjectsLocationsConversationsParticipantsSuggestionsResponse,
  errors: [],
}));

export interface SuggestKnowledgeAssistProjectsLocationsConversationsParticipantsSuggestionsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistRequest;
}

export const SuggestKnowledgeAssistProjectsLocationsConversationsParticipantsSuggestionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/conversations/{conversationsId}/participants/{participantsId}/suggestions:suggestKnowledgeAssist", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SuggestKnowledgeAssistProjectsLocationsConversationsParticipantsSuggestionsRequest>;

export type SuggestKnowledgeAssistProjectsLocationsConversationsParticipantsSuggestionsResponse = GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistResponse;
export const SuggestKnowledgeAssistProjectsLocationsConversationsParticipantsSuggestionsResponse = GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistResponse;

export type SuggestKnowledgeAssistProjectsLocationsConversationsParticipantsSuggestionsError = CommonErrors;

export const suggestKnowledgeAssistProjectsLocationsConversationsParticipantsSuggestions: API.OperationMethod<SuggestKnowledgeAssistProjectsLocationsConversationsParticipantsSuggestionsRequest, SuggestKnowledgeAssistProjectsLocationsConversationsParticipantsSuggestionsResponse, SuggestKnowledgeAssistProjectsLocationsConversationsParticipantsSuggestionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SuggestKnowledgeAssistProjectsLocationsConversationsParticipantsSuggestionsRequest,
  output: SuggestKnowledgeAssistProjectsLocationsConversationsParticipantsSuggestionsResponse,
  errors: [],
}));

export interface BatchCreateProjectsLocationsConversationsMessagesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1BatchCreateMessagesRequest;
}

export const BatchCreateProjectsLocationsConversationsMessagesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1BatchCreateMessagesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/conversations/{conversationsId}/messages:batchCreate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchCreateProjectsLocationsConversationsMessagesRequest>;

export type BatchCreateProjectsLocationsConversationsMessagesResponse = GoogleCloudDialogflowV2beta1BatchCreateMessagesResponse;
export const BatchCreateProjectsLocationsConversationsMessagesResponse = GoogleCloudDialogflowV2beta1BatchCreateMessagesResponse;

export type BatchCreateProjectsLocationsConversationsMessagesError = CommonErrors;

export const batchCreateProjectsLocationsConversationsMessages: API.OperationMethod<BatchCreateProjectsLocationsConversationsMessagesRequest, BatchCreateProjectsLocationsConversationsMessagesResponse, BatchCreateProjectsLocationsConversationsMessagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchCreateProjectsLocationsConversationsMessagesRequest,
  output: BatchCreateProjectsLocationsConversationsMessagesResponse,
  errors: [],
}));

export interface ListProjectsLocationsConversationsMessagesRequest {
  parent: string;
  filter?: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsConversationsMessagesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/conversations/{conversationsId}/messages" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsConversationsMessagesRequest>;

export type ListProjectsLocationsConversationsMessagesResponse = GoogleCloudDialogflowV2beta1ListMessagesResponse;
export const ListProjectsLocationsConversationsMessagesResponse = GoogleCloudDialogflowV2beta1ListMessagesResponse;

export type ListProjectsLocationsConversationsMessagesError = CommonErrors;

export const listProjectsLocationsConversationsMessages: API.PaginatedOperationMethod<ListProjectsLocationsConversationsMessagesRequest, ListProjectsLocationsConversationsMessagesResponse, ListProjectsLocationsConversationsMessagesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsConversationsMessagesRequest,
  output: ListProjectsLocationsConversationsMessagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface SuggestConversationSummaryProjectsLocationsConversationsSuggestionsRequest {
  conversation: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1SuggestConversationSummaryRequest;
}

export const SuggestConversationSummaryProjectsLocationsConversationsSuggestionsRequest = Schema.Struct({
  conversation: Schema.String.pipe(T.HttpPath("conversation")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1SuggestConversationSummaryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/conversations/{conversationsId}/suggestions:suggestConversationSummary", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SuggestConversationSummaryProjectsLocationsConversationsSuggestionsRequest>;

export type SuggestConversationSummaryProjectsLocationsConversationsSuggestionsResponse = GoogleCloudDialogflowV2beta1SuggestConversationSummaryResponse;
export const SuggestConversationSummaryProjectsLocationsConversationsSuggestionsResponse = GoogleCloudDialogflowV2beta1SuggestConversationSummaryResponse;

export type SuggestConversationSummaryProjectsLocationsConversationsSuggestionsError = CommonErrors;

export const suggestConversationSummaryProjectsLocationsConversationsSuggestions: API.OperationMethod<SuggestConversationSummaryProjectsLocationsConversationsSuggestionsRequest, SuggestConversationSummaryProjectsLocationsConversationsSuggestionsResponse, SuggestConversationSummaryProjectsLocationsConversationsSuggestionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SuggestConversationSummaryProjectsLocationsConversationsSuggestionsRequest,
  output: SuggestConversationSummaryProjectsLocationsConversationsSuggestionsResponse,
  errors: [],
}));

export interface SearchKnowledgeProjectsLocationsConversationsSuggestionsRequest {
  conversation: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1SearchKnowledgeRequest;
}

export const SearchKnowledgeProjectsLocationsConversationsSuggestionsRequest = Schema.Struct({
  conversation: Schema.String.pipe(T.HttpPath("conversation")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1SearchKnowledgeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/conversations/{conversationsId}/suggestions:searchKnowledge", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SearchKnowledgeProjectsLocationsConversationsSuggestionsRequest>;

export type SearchKnowledgeProjectsLocationsConversationsSuggestionsResponse = GoogleCloudDialogflowV2beta1SearchKnowledgeResponse;
export const SearchKnowledgeProjectsLocationsConversationsSuggestionsResponse = GoogleCloudDialogflowV2beta1SearchKnowledgeResponse;

export type SearchKnowledgeProjectsLocationsConversationsSuggestionsError = CommonErrors;

export const searchKnowledgeProjectsLocationsConversationsSuggestions: API.OperationMethod<SearchKnowledgeProjectsLocationsConversationsSuggestionsRequest, SearchKnowledgeProjectsLocationsConversationsSuggestionsResponse, SearchKnowledgeProjectsLocationsConversationsSuggestionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchKnowledgeProjectsLocationsConversationsSuggestionsRequest,
  output: SearchKnowledgeProjectsLocationsConversationsSuggestionsResponse,
  errors: [],
}));

export interface GenerateProjectsLocationsConversationsSuggestionsRequest {
  conversation: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1GenerateSuggestionsRequest;
}

export const GenerateProjectsLocationsConversationsSuggestionsRequest = Schema.Struct({
  conversation: Schema.String.pipe(T.HttpPath("conversation")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1GenerateSuggestionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/conversations/{conversationsId}/suggestions:generate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateProjectsLocationsConversationsSuggestionsRequest>;

export type GenerateProjectsLocationsConversationsSuggestionsResponse = GoogleCloudDialogflowV2beta1GenerateSuggestionsResponse;
export const GenerateProjectsLocationsConversationsSuggestionsResponse = GoogleCloudDialogflowV2beta1GenerateSuggestionsResponse;

export type GenerateProjectsLocationsConversationsSuggestionsError = CommonErrors;

export const generateProjectsLocationsConversationsSuggestions: API.OperationMethod<GenerateProjectsLocationsConversationsSuggestionsRequest, GenerateProjectsLocationsConversationsSuggestionsResponse, GenerateProjectsLocationsConversationsSuggestionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateProjectsLocationsConversationsSuggestionsRequest,
  output: GenerateProjectsLocationsConversationsSuggestionsResponse,
  errors: [],
}));

export interface GenerateStatelessSummaryProjectsLocationsSuggestionsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1GenerateStatelessSummaryRequest;
}

export const GenerateStatelessSummaryProjectsLocationsSuggestionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1GenerateStatelessSummaryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/suggestions:generateStatelessSummary", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateStatelessSummaryProjectsLocationsSuggestionsRequest>;

export type GenerateStatelessSummaryProjectsLocationsSuggestionsResponse = GoogleCloudDialogflowV2beta1GenerateStatelessSummaryResponse;
export const GenerateStatelessSummaryProjectsLocationsSuggestionsResponse = GoogleCloudDialogflowV2beta1GenerateStatelessSummaryResponse;

export type GenerateStatelessSummaryProjectsLocationsSuggestionsError = CommonErrors;

export const generateStatelessSummaryProjectsLocationsSuggestions: API.OperationMethod<GenerateStatelessSummaryProjectsLocationsSuggestionsRequest, GenerateStatelessSummaryProjectsLocationsSuggestionsResponse, GenerateStatelessSummaryProjectsLocationsSuggestionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateStatelessSummaryProjectsLocationsSuggestionsRequest,
  output: GenerateStatelessSummaryProjectsLocationsSuggestionsResponse,
  errors: [],
}));

export interface SearchKnowledgeProjectsLocationsSuggestionsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1SearchKnowledgeRequest;
}

export const SearchKnowledgeProjectsLocationsSuggestionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1SearchKnowledgeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/suggestions:searchKnowledge", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SearchKnowledgeProjectsLocationsSuggestionsRequest>;

export type SearchKnowledgeProjectsLocationsSuggestionsResponse = GoogleCloudDialogflowV2beta1SearchKnowledgeResponse;
export const SearchKnowledgeProjectsLocationsSuggestionsResponse = GoogleCloudDialogflowV2beta1SearchKnowledgeResponse;

export type SearchKnowledgeProjectsLocationsSuggestionsError = CommonErrors;

export const searchKnowledgeProjectsLocationsSuggestions: API.OperationMethod<SearchKnowledgeProjectsLocationsSuggestionsRequest, SearchKnowledgeProjectsLocationsSuggestionsResponse, SearchKnowledgeProjectsLocationsSuggestionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchKnowledgeProjectsLocationsSuggestionsRequest,
  output: SearchKnowledgeProjectsLocationsSuggestionsResponse,
  errors: [],
}));

export interface GenerateProjectsLocationsStatelessSuggestionRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1GenerateStatelessSuggestionRequest;
}

export const GenerateProjectsLocationsStatelessSuggestionRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1GenerateStatelessSuggestionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/statelessSuggestion:generate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateProjectsLocationsStatelessSuggestionRequest>;

export type GenerateProjectsLocationsStatelessSuggestionResponse = GoogleCloudDialogflowV2beta1GenerateStatelessSuggestionResponse;
export const GenerateProjectsLocationsStatelessSuggestionResponse = GoogleCloudDialogflowV2beta1GenerateStatelessSuggestionResponse;

export type GenerateProjectsLocationsStatelessSuggestionError = CommonErrors;

export const generateProjectsLocationsStatelessSuggestion: API.OperationMethod<GenerateProjectsLocationsStatelessSuggestionRequest, GenerateProjectsLocationsStatelessSuggestionResponse, GenerateProjectsLocationsStatelessSuggestionError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateProjectsLocationsStatelessSuggestionRequest,
  output: GenerateProjectsLocationsStatelessSuggestionResponse,
  errors: [],
}));

export interface InitializeProjectsLocationsEncryptionSpecRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1InitializeEncryptionSpecRequest;
}

export const InitializeProjectsLocationsEncryptionSpecRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1InitializeEncryptionSpecRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/encryptionSpec:initialize", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InitializeProjectsLocationsEncryptionSpecRequest>;

export type InitializeProjectsLocationsEncryptionSpecResponse = GoogleLongrunningOperation;
export const InitializeProjectsLocationsEncryptionSpecResponse = GoogleLongrunningOperation;

export type InitializeProjectsLocationsEncryptionSpecError = CommonErrors;

export const initializeProjectsLocationsEncryptionSpec: API.OperationMethod<InitializeProjectsLocationsEncryptionSpecRequest, InitializeProjectsLocationsEncryptionSpecResponse, InitializeProjectsLocationsEncryptionSpecError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InitializeProjectsLocationsEncryptionSpecRequest,
  output: InitializeProjectsLocationsEncryptionSpecResponse,
  errors: [],
}));

export interface ListProjectsLocationsKnowledgeBasesRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
  filter?: string;
}

export const ListProjectsLocationsKnowledgeBasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/knowledgeBases" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsKnowledgeBasesRequest>;

export type ListProjectsLocationsKnowledgeBasesResponse = GoogleCloudDialogflowV2beta1ListKnowledgeBasesResponse;
export const ListProjectsLocationsKnowledgeBasesResponse = GoogleCloudDialogflowV2beta1ListKnowledgeBasesResponse;

export type ListProjectsLocationsKnowledgeBasesError = CommonErrors;

export const listProjectsLocationsKnowledgeBases: API.PaginatedOperationMethod<ListProjectsLocationsKnowledgeBasesRequest, ListProjectsLocationsKnowledgeBasesResponse, ListProjectsLocationsKnowledgeBasesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsKnowledgeBasesRequest,
  output: ListProjectsLocationsKnowledgeBasesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsKnowledgeBasesRequest {
  name: string;
}

export const GetProjectsLocationsKnowledgeBasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/knowledgeBases/{knowledgeBasesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsKnowledgeBasesRequest>;

export type GetProjectsLocationsKnowledgeBasesResponse = GoogleCloudDialogflowV2beta1KnowledgeBase;
export const GetProjectsLocationsKnowledgeBasesResponse = GoogleCloudDialogflowV2beta1KnowledgeBase;

export type GetProjectsLocationsKnowledgeBasesError = CommonErrors;

export const getProjectsLocationsKnowledgeBases: API.OperationMethod<GetProjectsLocationsKnowledgeBasesRequest, GetProjectsLocationsKnowledgeBasesResponse, GetProjectsLocationsKnowledgeBasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsKnowledgeBasesRequest,
  output: GetProjectsLocationsKnowledgeBasesResponse,
  errors: [],
}));

export interface CreateProjectsLocationsKnowledgeBasesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1KnowledgeBase;
}

export const CreateProjectsLocationsKnowledgeBasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1KnowledgeBase).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/knowledgeBases", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsKnowledgeBasesRequest>;

export type CreateProjectsLocationsKnowledgeBasesResponse = GoogleCloudDialogflowV2beta1KnowledgeBase;
export const CreateProjectsLocationsKnowledgeBasesResponse = GoogleCloudDialogflowV2beta1KnowledgeBase;

export type CreateProjectsLocationsKnowledgeBasesError = CommonErrors;

export const createProjectsLocationsKnowledgeBases: API.OperationMethod<CreateProjectsLocationsKnowledgeBasesRequest, CreateProjectsLocationsKnowledgeBasesResponse, CreateProjectsLocationsKnowledgeBasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsKnowledgeBasesRequest,
  output: CreateProjectsLocationsKnowledgeBasesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsKnowledgeBasesRequest {
  name: string;
  force?: boolean;
}

export const DeleteProjectsLocationsKnowledgeBasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/knowledgeBases/{knowledgeBasesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsKnowledgeBasesRequest>;

export type DeleteProjectsLocationsKnowledgeBasesResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsKnowledgeBasesResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsKnowledgeBasesError = CommonErrors;

export const deleteProjectsLocationsKnowledgeBases: API.OperationMethod<DeleteProjectsLocationsKnowledgeBasesRequest, DeleteProjectsLocationsKnowledgeBasesResponse, DeleteProjectsLocationsKnowledgeBasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsKnowledgeBasesRequest,
  output: DeleteProjectsLocationsKnowledgeBasesResponse,
  errors: [],
}));

export interface PatchProjectsLocationsKnowledgeBasesRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1KnowledgeBase;
}

export const PatchProjectsLocationsKnowledgeBasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1KnowledgeBase).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/knowledgeBases/{knowledgeBasesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsKnowledgeBasesRequest>;

export type PatchProjectsLocationsKnowledgeBasesResponse = GoogleCloudDialogflowV2beta1KnowledgeBase;
export const PatchProjectsLocationsKnowledgeBasesResponse = GoogleCloudDialogflowV2beta1KnowledgeBase;

export type PatchProjectsLocationsKnowledgeBasesError = CommonErrors;

export const patchProjectsLocationsKnowledgeBases: API.OperationMethod<PatchProjectsLocationsKnowledgeBasesRequest, PatchProjectsLocationsKnowledgeBasesResponse, PatchProjectsLocationsKnowledgeBasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsKnowledgeBasesRequest,
  output: PatchProjectsLocationsKnowledgeBasesResponse,
  errors: [],
}));

export interface ListProjectsLocationsKnowledgeBasesDocumentsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
  filter?: string;
}

export const ListProjectsLocationsKnowledgeBasesDocumentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/knowledgeBases/{knowledgeBasesId}/documents" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsKnowledgeBasesDocumentsRequest>;

export type ListProjectsLocationsKnowledgeBasesDocumentsResponse = GoogleCloudDialogflowV2beta1ListDocumentsResponse;
export const ListProjectsLocationsKnowledgeBasesDocumentsResponse = GoogleCloudDialogflowV2beta1ListDocumentsResponse;

export type ListProjectsLocationsKnowledgeBasesDocumentsError = CommonErrors;

export const listProjectsLocationsKnowledgeBasesDocuments: API.PaginatedOperationMethod<ListProjectsLocationsKnowledgeBasesDocumentsRequest, ListProjectsLocationsKnowledgeBasesDocumentsResponse, ListProjectsLocationsKnowledgeBasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsKnowledgeBasesDocumentsRequest,
  output: ListProjectsLocationsKnowledgeBasesDocumentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsKnowledgeBasesDocumentsRequest {
  name: string;
}

export const GetProjectsLocationsKnowledgeBasesDocumentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/knowledgeBases/{knowledgeBasesId}/documents/{documentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsKnowledgeBasesDocumentsRequest>;

export type GetProjectsLocationsKnowledgeBasesDocumentsResponse = GoogleCloudDialogflowV2beta1Document;
export const GetProjectsLocationsKnowledgeBasesDocumentsResponse = GoogleCloudDialogflowV2beta1Document;

export type GetProjectsLocationsKnowledgeBasesDocumentsError = CommonErrors;

export const getProjectsLocationsKnowledgeBasesDocuments: API.OperationMethod<GetProjectsLocationsKnowledgeBasesDocumentsRequest, GetProjectsLocationsKnowledgeBasesDocumentsResponse, GetProjectsLocationsKnowledgeBasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsKnowledgeBasesDocumentsRequest,
  output: GetProjectsLocationsKnowledgeBasesDocumentsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsKnowledgeBasesDocumentsRequest {
  parent: string;
  importGcsCustomMetadata?: boolean;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Document;
}

export const CreateProjectsLocationsKnowledgeBasesDocumentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  importGcsCustomMetadata: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("importGcsCustomMetadata")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Document).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/knowledgeBases/{knowledgeBasesId}/documents", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsKnowledgeBasesDocumentsRequest>;

export type CreateProjectsLocationsKnowledgeBasesDocumentsResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsKnowledgeBasesDocumentsResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsKnowledgeBasesDocumentsError = CommonErrors;

export const createProjectsLocationsKnowledgeBasesDocuments: API.OperationMethod<CreateProjectsLocationsKnowledgeBasesDocumentsRequest, CreateProjectsLocationsKnowledgeBasesDocumentsResponse, CreateProjectsLocationsKnowledgeBasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsKnowledgeBasesDocumentsRequest,
  output: CreateProjectsLocationsKnowledgeBasesDocumentsResponse,
  errors: [],
}));

export interface ImportProjectsLocationsKnowledgeBasesDocumentsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1ImportDocumentsRequest;
}

export const ImportProjectsLocationsKnowledgeBasesDocumentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1ImportDocumentsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/knowledgeBases/{knowledgeBasesId}/documents:import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportProjectsLocationsKnowledgeBasesDocumentsRequest>;

export type ImportProjectsLocationsKnowledgeBasesDocumentsResponse = GoogleLongrunningOperation;
export const ImportProjectsLocationsKnowledgeBasesDocumentsResponse = GoogleLongrunningOperation;

export type ImportProjectsLocationsKnowledgeBasesDocumentsError = CommonErrors;

export const importProjectsLocationsKnowledgeBasesDocuments: API.OperationMethod<ImportProjectsLocationsKnowledgeBasesDocumentsRequest, ImportProjectsLocationsKnowledgeBasesDocumentsResponse, ImportProjectsLocationsKnowledgeBasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportProjectsLocationsKnowledgeBasesDocumentsRequest,
  output: ImportProjectsLocationsKnowledgeBasesDocumentsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsKnowledgeBasesDocumentsRequest {
  name: string;
}

export const DeleteProjectsLocationsKnowledgeBasesDocumentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/knowledgeBases/{knowledgeBasesId}/documents/{documentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsKnowledgeBasesDocumentsRequest>;

export type DeleteProjectsLocationsKnowledgeBasesDocumentsResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsKnowledgeBasesDocumentsResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsKnowledgeBasesDocumentsError = CommonErrors;

export const deleteProjectsLocationsKnowledgeBasesDocuments: API.OperationMethod<DeleteProjectsLocationsKnowledgeBasesDocumentsRequest, DeleteProjectsLocationsKnowledgeBasesDocumentsResponse, DeleteProjectsLocationsKnowledgeBasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsKnowledgeBasesDocumentsRequest,
  output: DeleteProjectsLocationsKnowledgeBasesDocumentsResponse,
  errors: [],
}));

export interface PatchProjectsLocationsKnowledgeBasesDocumentsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Document;
}

export const PatchProjectsLocationsKnowledgeBasesDocumentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Document).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/knowledgeBases/{knowledgeBasesId}/documents/{documentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsKnowledgeBasesDocumentsRequest>;

export type PatchProjectsLocationsKnowledgeBasesDocumentsResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsKnowledgeBasesDocumentsResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsKnowledgeBasesDocumentsError = CommonErrors;

export const patchProjectsLocationsKnowledgeBasesDocuments: API.OperationMethod<PatchProjectsLocationsKnowledgeBasesDocumentsRequest, PatchProjectsLocationsKnowledgeBasesDocumentsResponse, PatchProjectsLocationsKnowledgeBasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsKnowledgeBasesDocumentsRequest,
  output: PatchProjectsLocationsKnowledgeBasesDocumentsResponse,
  errors: [],
}));

export interface ReloadProjectsLocationsKnowledgeBasesDocumentsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1ReloadDocumentRequest;
}

export const ReloadProjectsLocationsKnowledgeBasesDocumentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1ReloadDocumentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/knowledgeBases/{knowledgeBasesId}/documents/{documentsId}:reload", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReloadProjectsLocationsKnowledgeBasesDocumentsRequest>;

export type ReloadProjectsLocationsKnowledgeBasesDocumentsResponse = GoogleLongrunningOperation;
export const ReloadProjectsLocationsKnowledgeBasesDocumentsResponse = GoogleLongrunningOperation;

export type ReloadProjectsLocationsKnowledgeBasesDocumentsError = CommonErrors;

export const reloadProjectsLocationsKnowledgeBasesDocuments: API.OperationMethod<ReloadProjectsLocationsKnowledgeBasesDocumentsRequest, ReloadProjectsLocationsKnowledgeBasesDocumentsResponse, ReloadProjectsLocationsKnowledgeBasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReloadProjectsLocationsKnowledgeBasesDocumentsRequest,
  output: ReloadProjectsLocationsKnowledgeBasesDocumentsResponse,
  errors: [],
}));

export interface ListProjectsLocationsPhoneNumbersRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
  showDeleted?: boolean;
}

export const ListProjectsLocationsPhoneNumbersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/phoneNumbers" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsPhoneNumbersRequest>;

export type ListProjectsLocationsPhoneNumbersResponse = GoogleCloudDialogflowV2beta1ListPhoneNumbersResponse;
export const ListProjectsLocationsPhoneNumbersResponse = GoogleCloudDialogflowV2beta1ListPhoneNumbersResponse;

export type ListProjectsLocationsPhoneNumbersError = CommonErrors;

export const listProjectsLocationsPhoneNumbers: API.PaginatedOperationMethod<ListProjectsLocationsPhoneNumbersRequest, ListProjectsLocationsPhoneNumbersResponse, ListProjectsLocationsPhoneNumbersError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsPhoneNumbersRequest,
  output: ListProjectsLocationsPhoneNumbersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsLocationsPhoneNumbersRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1PhoneNumber;
}

export const PatchProjectsLocationsPhoneNumbersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1PhoneNumber).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/phoneNumbers/{phoneNumbersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsPhoneNumbersRequest>;

export type PatchProjectsLocationsPhoneNumbersResponse = GoogleCloudDialogflowV2beta1PhoneNumber;
export const PatchProjectsLocationsPhoneNumbersResponse = GoogleCloudDialogflowV2beta1PhoneNumber;

export type PatchProjectsLocationsPhoneNumbersError = CommonErrors;

export const patchProjectsLocationsPhoneNumbers: API.OperationMethod<PatchProjectsLocationsPhoneNumbersRequest, PatchProjectsLocationsPhoneNumbersResponse, PatchProjectsLocationsPhoneNumbersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsPhoneNumbersRequest,
  output: PatchProjectsLocationsPhoneNumbersResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsPhoneNumbersRequest {
  name: string;
}

export const DeleteProjectsLocationsPhoneNumbersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/phoneNumbers/{phoneNumbersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsPhoneNumbersRequest>;

export type DeleteProjectsLocationsPhoneNumbersResponse = GoogleCloudDialogflowV2beta1PhoneNumber;
export const DeleteProjectsLocationsPhoneNumbersResponse = GoogleCloudDialogflowV2beta1PhoneNumber;

export type DeleteProjectsLocationsPhoneNumbersError = CommonErrors;

export const deleteProjectsLocationsPhoneNumbers: API.OperationMethod<DeleteProjectsLocationsPhoneNumbersRequest, DeleteProjectsLocationsPhoneNumbersResponse, DeleteProjectsLocationsPhoneNumbersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsPhoneNumbersRequest,
  output: DeleteProjectsLocationsPhoneNumbersResponse,
  errors: [],
}));

export interface UndeleteProjectsLocationsPhoneNumbersRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1UndeletePhoneNumberRequest;
}

export const UndeleteProjectsLocationsPhoneNumbersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1UndeletePhoneNumberRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/phoneNumbers/{phoneNumbersId}:undelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UndeleteProjectsLocationsPhoneNumbersRequest>;

export type UndeleteProjectsLocationsPhoneNumbersResponse = GoogleCloudDialogflowV2beta1PhoneNumber;
export const UndeleteProjectsLocationsPhoneNumbersResponse = GoogleCloudDialogflowV2beta1PhoneNumber;

export type UndeleteProjectsLocationsPhoneNumbersError = CommonErrors;

export const undeleteProjectsLocationsPhoneNumbers: API.OperationMethod<UndeleteProjectsLocationsPhoneNumbersRequest, UndeleteProjectsLocationsPhoneNumbersResponse, UndeleteProjectsLocationsPhoneNumbersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UndeleteProjectsLocationsPhoneNumbersRequest,
  output: UndeleteProjectsLocationsPhoneNumbersResponse,
  errors: [],
}));

export interface CreateProjectsLocationsSipTrunksRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1SipTrunk;
}

export const CreateProjectsLocationsSipTrunksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1SipTrunk).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/sipTrunks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsSipTrunksRequest>;

export type CreateProjectsLocationsSipTrunksResponse = GoogleCloudDialogflowV2beta1SipTrunk;
export const CreateProjectsLocationsSipTrunksResponse = GoogleCloudDialogflowV2beta1SipTrunk;

export type CreateProjectsLocationsSipTrunksError = CommonErrors;

export const createProjectsLocationsSipTrunks: API.OperationMethod<CreateProjectsLocationsSipTrunksRequest, CreateProjectsLocationsSipTrunksResponse, CreateProjectsLocationsSipTrunksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsSipTrunksRequest,
  output: CreateProjectsLocationsSipTrunksResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsSipTrunksRequest {
  name: string;
}

export const DeleteProjectsLocationsSipTrunksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/sipTrunks/{sipTrunksId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsSipTrunksRequest>;

export type DeleteProjectsLocationsSipTrunksResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsSipTrunksResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsSipTrunksError = CommonErrors;

export const deleteProjectsLocationsSipTrunks: API.OperationMethod<DeleteProjectsLocationsSipTrunksRequest, DeleteProjectsLocationsSipTrunksResponse, DeleteProjectsLocationsSipTrunksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsSipTrunksRequest,
  output: DeleteProjectsLocationsSipTrunksResponse,
  errors: [],
}));

export interface ListProjectsLocationsSipTrunksRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsLocationsSipTrunksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/sipTrunks" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSipTrunksRequest>;

export type ListProjectsLocationsSipTrunksResponse = GoogleCloudDialogflowV2beta1ListSipTrunksResponse;
export const ListProjectsLocationsSipTrunksResponse = GoogleCloudDialogflowV2beta1ListSipTrunksResponse;

export type ListProjectsLocationsSipTrunksError = CommonErrors;

export const listProjectsLocationsSipTrunks: API.PaginatedOperationMethod<ListProjectsLocationsSipTrunksRequest, ListProjectsLocationsSipTrunksResponse, ListProjectsLocationsSipTrunksError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsLocationsSipTrunksRequest,
  output: ListProjectsLocationsSipTrunksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsLocationsSipTrunksRequest {
  name: string;
}

export const GetProjectsLocationsSipTrunksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/sipTrunks/{sipTrunksId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsSipTrunksRequest>;

export type GetProjectsLocationsSipTrunksResponse = GoogleCloudDialogflowV2beta1SipTrunk;
export const GetProjectsLocationsSipTrunksResponse = GoogleCloudDialogflowV2beta1SipTrunk;

export type GetProjectsLocationsSipTrunksError = CommonErrors;

export const getProjectsLocationsSipTrunks: API.OperationMethod<GetProjectsLocationsSipTrunksRequest, GetProjectsLocationsSipTrunksResponse, GetProjectsLocationsSipTrunksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsSipTrunksRequest,
  output: GetProjectsLocationsSipTrunksResponse,
  errors: [],
}));

export interface PatchProjectsLocationsSipTrunksRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1SipTrunk;
}

export const PatchProjectsLocationsSipTrunksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1SipTrunk).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/locations/{locationsId}/sipTrunks/{sipTrunksId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsSipTrunksRequest>;

export type PatchProjectsLocationsSipTrunksResponse = GoogleCloudDialogflowV2beta1SipTrunk;
export const PatchProjectsLocationsSipTrunksResponse = GoogleCloudDialogflowV2beta1SipTrunk;

export type PatchProjectsLocationsSipTrunksError = CommonErrors;

export const patchProjectsLocationsSipTrunks: API.OperationMethod<PatchProjectsLocationsSipTrunksRequest, PatchProjectsLocationsSipTrunksResponse, PatchProjectsLocationsSipTrunksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsSipTrunksRequest,
  output: PatchProjectsLocationsSipTrunksResponse,
  errors: [],
}));

export interface CreateProjectsGeneratorsRequest {
  parent: string;
  generatorId?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Generator;
}

export const CreateProjectsGeneratorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  generatorId: Schema.optional(Schema.String).pipe(T.HttpQuery("generatorId")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Generator).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/generators", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsGeneratorsRequest>;

export type CreateProjectsGeneratorsResponse = GoogleCloudDialogflowV2beta1Generator;
export const CreateProjectsGeneratorsResponse = GoogleCloudDialogflowV2beta1Generator;

export type CreateProjectsGeneratorsError = CommonErrors;

export const createProjectsGenerators: API.OperationMethod<CreateProjectsGeneratorsRequest, CreateProjectsGeneratorsResponse, CreateProjectsGeneratorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsGeneratorsRequest,
  output: CreateProjectsGeneratorsResponse,
  errors: [],
}));

export interface ListProjectsGeneratorsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsGeneratorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/generators" }),
  svc,
) as unknown as Schema.Schema<ListProjectsGeneratorsRequest>;

export type ListProjectsGeneratorsResponse = GoogleCloudDialogflowV2beta1ListGeneratorsResponse;
export const ListProjectsGeneratorsResponse = GoogleCloudDialogflowV2beta1ListGeneratorsResponse;

export type ListProjectsGeneratorsError = CommonErrors;

export const listProjectsGenerators: API.PaginatedOperationMethod<ListProjectsGeneratorsRequest, ListProjectsGeneratorsResponse, ListProjectsGeneratorsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsGeneratorsRequest,
  output: ListProjectsGeneratorsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsAnswerRecordsRequest {
  name: string;
}

export const GetProjectsAnswerRecordsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/answerRecords/{answerRecordsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsAnswerRecordsRequest>;

export type GetProjectsAnswerRecordsResponse = GoogleCloudDialogflowV2beta1AnswerRecord;
export const GetProjectsAnswerRecordsResponse = GoogleCloudDialogflowV2beta1AnswerRecord;

export type GetProjectsAnswerRecordsError = CommonErrors;

export const getProjectsAnswerRecords: API.OperationMethod<GetProjectsAnswerRecordsRequest, GetProjectsAnswerRecordsResponse, GetProjectsAnswerRecordsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsAnswerRecordsRequest,
  output: GetProjectsAnswerRecordsResponse,
  errors: [],
}));

export interface ListProjectsAnswerRecordsRequest {
  parent: string;
  filter?: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsAnswerRecordsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/answerRecords" }),
  svc,
) as unknown as Schema.Schema<ListProjectsAnswerRecordsRequest>;

export type ListProjectsAnswerRecordsResponse = GoogleCloudDialogflowV2beta1ListAnswerRecordsResponse;
export const ListProjectsAnswerRecordsResponse = GoogleCloudDialogflowV2beta1ListAnswerRecordsResponse;

export type ListProjectsAnswerRecordsError = CommonErrors;

export const listProjectsAnswerRecords: API.PaginatedOperationMethod<ListProjectsAnswerRecordsRequest, ListProjectsAnswerRecordsResponse, ListProjectsAnswerRecordsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsAnswerRecordsRequest,
  output: ListProjectsAnswerRecordsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsAnswerRecordsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1AnswerRecord;
}

export const PatchProjectsAnswerRecordsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1AnswerRecord).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/answerRecords/{answerRecordsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsAnswerRecordsRequest>;

export type PatchProjectsAnswerRecordsResponse = GoogleCloudDialogflowV2beta1AnswerRecord;
export const PatchProjectsAnswerRecordsResponse = GoogleCloudDialogflowV2beta1AnswerRecord;

export type PatchProjectsAnswerRecordsError = CommonErrors;

export const patchProjectsAnswerRecords: API.OperationMethod<PatchProjectsAnswerRecordsRequest, PatchProjectsAnswerRecordsResponse, PatchProjectsAnswerRecordsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsAnswerRecordsRequest,
  output: PatchProjectsAnswerRecordsResponse,
  errors: [],
}));

export interface ListProjectsConversationProfilesRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsConversationProfilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/conversationProfiles" }),
  svc,
) as unknown as Schema.Schema<ListProjectsConversationProfilesRequest>;

export type ListProjectsConversationProfilesResponse = GoogleCloudDialogflowV2beta1ListConversationProfilesResponse;
export const ListProjectsConversationProfilesResponse = GoogleCloudDialogflowV2beta1ListConversationProfilesResponse;

export type ListProjectsConversationProfilesError = CommonErrors;

export const listProjectsConversationProfiles: API.PaginatedOperationMethod<ListProjectsConversationProfilesRequest, ListProjectsConversationProfilesResponse, ListProjectsConversationProfilesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsConversationProfilesRequest,
  output: ListProjectsConversationProfilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsConversationProfilesRequest {
  name: string;
}

export const GetProjectsConversationProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/conversationProfiles/{conversationProfilesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsConversationProfilesRequest>;

export type GetProjectsConversationProfilesResponse = GoogleCloudDialogflowV2beta1ConversationProfile;
export const GetProjectsConversationProfilesResponse = GoogleCloudDialogflowV2beta1ConversationProfile;

export type GetProjectsConversationProfilesError = CommonErrors;

export const getProjectsConversationProfiles: API.OperationMethod<GetProjectsConversationProfilesRequest, GetProjectsConversationProfilesResponse, GetProjectsConversationProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsConversationProfilesRequest,
  output: GetProjectsConversationProfilesResponse,
  errors: [],
}));

export interface CreateProjectsConversationProfilesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1ConversationProfile;
}

export const CreateProjectsConversationProfilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1ConversationProfile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/conversationProfiles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsConversationProfilesRequest>;

export type CreateProjectsConversationProfilesResponse = GoogleCloudDialogflowV2beta1ConversationProfile;
export const CreateProjectsConversationProfilesResponse = GoogleCloudDialogflowV2beta1ConversationProfile;

export type CreateProjectsConversationProfilesError = CommonErrors;

export const createProjectsConversationProfiles: API.OperationMethod<CreateProjectsConversationProfilesRequest, CreateProjectsConversationProfilesResponse, CreateProjectsConversationProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsConversationProfilesRequest,
  output: CreateProjectsConversationProfilesResponse,
  errors: [],
}));

export interface PatchProjectsConversationProfilesRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1ConversationProfile;
}

export const PatchProjectsConversationProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1ConversationProfile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/conversationProfiles/{conversationProfilesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsConversationProfilesRequest>;

export type PatchProjectsConversationProfilesResponse = GoogleCloudDialogflowV2beta1ConversationProfile;
export const PatchProjectsConversationProfilesResponse = GoogleCloudDialogflowV2beta1ConversationProfile;

export type PatchProjectsConversationProfilesError = CommonErrors;

export const patchProjectsConversationProfiles: API.OperationMethod<PatchProjectsConversationProfilesRequest, PatchProjectsConversationProfilesResponse, PatchProjectsConversationProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsConversationProfilesRequest,
  output: PatchProjectsConversationProfilesResponse,
  errors: [],
}));

export interface DeleteProjectsConversationProfilesRequest {
  name: string;
}

export const DeleteProjectsConversationProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/conversationProfiles/{conversationProfilesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsConversationProfilesRequest>;

export type DeleteProjectsConversationProfilesResponse = GoogleProtobufEmpty;
export const DeleteProjectsConversationProfilesResponse = GoogleProtobufEmpty;

export type DeleteProjectsConversationProfilesError = CommonErrors;

export const deleteProjectsConversationProfiles: API.OperationMethod<DeleteProjectsConversationProfilesRequest, DeleteProjectsConversationProfilesResponse, DeleteProjectsConversationProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsConversationProfilesRequest,
  output: DeleteProjectsConversationProfilesResponse,
  errors: [],
}));

export interface SetSuggestionFeatureConfigProjectsConversationProfilesRequest {
  conversationProfile: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1SetSuggestionFeatureConfigRequest;
}

export const SetSuggestionFeatureConfigProjectsConversationProfilesRequest = Schema.Struct({
  conversationProfile: Schema.String.pipe(T.HttpPath("conversationProfile")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1SetSuggestionFeatureConfigRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/conversationProfiles/{conversationProfilesId}:setSuggestionFeatureConfig", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetSuggestionFeatureConfigProjectsConversationProfilesRequest>;

export type SetSuggestionFeatureConfigProjectsConversationProfilesResponse = GoogleLongrunningOperation;
export const SetSuggestionFeatureConfigProjectsConversationProfilesResponse = GoogleLongrunningOperation;

export type SetSuggestionFeatureConfigProjectsConversationProfilesError = CommonErrors;

export const setSuggestionFeatureConfigProjectsConversationProfiles: API.OperationMethod<SetSuggestionFeatureConfigProjectsConversationProfilesRequest, SetSuggestionFeatureConfigProjectsConversationProfilesResponse, SetSuggestionFeatureConfigProjectsConversationProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetSuggestionFeatureConfigProjectsConversationProfilesRequest,
  output: SetSuggestionFeatureConfigProjectsConversationProfilesResponse,
  errors: [],
}));

export interface ClearSuggestionFeatureConfigProjectsConversationProfilesRequest {
  conversationProfile: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1ClearSuggestionFeatureConfigRequest;
}

export const ClearSuggestionFeatureConfigProjectsConversationProfilesRequest = Schema.Struct({
  conversationProfile: Schema.String.pipe(T.HttpPath("conversationProfile")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1ClearSuggestionFeatureConfigRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/conversationProfiles/{conversationProfilesId}:clearSuggestionFeatureConfig", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ClearSuggestionFeatureConfigProjectsConversationProfilesRequest>;

export type ClearSuggestionFeatureConfigProjectsConversationProfilesResponse = GoogleLongrunningOperation;
export const ClearSuggestionFeatureConfigProjectsConversationProfilesResponse = GoogleLongrunningOperation;

export type ClearSuggestionFeatureConfigProjectsConversationProfilesError = CommonErrors;

export const clearSuggestionFeatureConfigProjectsConversationProfiles: API.OperationMethod<ClearSuggestionFeatureConfigProjectsConversationProfilesRequest, ClearSuggestionFeatureConfigProjectsConversationProfilesResponse, ClearSuggestionFeatureConfigProjectsConversationProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ClearSuggestionFeatureConfigProjectsConversationProfilesRequest,
  output: ClearSuggestionFeatureConfigProjectsConversationProfilesResponse,
  errors: [],
}));

export interface CreateProjectsConversationsRequest {
  parent: string;
  conversationId?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Conversation;
}

export const CreateProjectsConversationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  conversationId: Schema.optional(Schema.String).pipe(T.HttpQuery("conversationId")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Conversation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/conversations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsConversationsRequest>;

export type CreateProjectsConversationsResponse = GoogleCloudDialogflowV2beta1Conversation;
export const CreateProjectsConversationsResponse = GoogleCloudDialogflowV2beta1Conversation;

export type CreateProjectsConversationsError = CommonErrors;

export const createProjectsConversations: API.OperationMethod<CreateProjectsConversationsRequest, CreateProjectsConversationsResponse, CreateProjectsConversationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsConversationsRequest,
  output: CreateProjectsConversationsResponse,
  errors: [],
}));

export interface ListProjectsConversationsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
  filter?: string;
}

export const ListProjectsConversationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/conversations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsConversationsRequest>;

export type ListProjectsConversationsResponse = GoogleCloudDialogflowV2beta1ListConversationsResponse;
export const ListProjectsConversationsResponse = GoogleCloudDialogflowV2beta1ListConversationsResponse;

export type ListProjectsConversationsError = CommonErrors;

export const listProjectsConversations: API.PaginatedOperationMethod<ListProjectsConversationsRequest, ListProjectsConversationsResponse, ListProjectsConversationsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsConversationsRequest,
  output: ListProjectsConversationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsConversationsRequest {
  name: string;
}

export const GetProjectsConversationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/conversations/{conversationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsConversationsRequest>;

export type GetProjectsConversationsResponse = GoogleCloudDialogflowV2beta1Conversation;
export const GetProjectsConversationsResponse = GoogleCloudDialogflowV2beta1Conversation;

export type GetProjectsConversationsError = CommonErrors;

export const getProjectsConversations: API.OperationMethod<GetProjectsConversationsRequest, GetProjectsConversationsResponse, GetProjectsConversationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsConversationsRequest,
  output: GetProjectsConversationsResponse,
  errors: [],
}));

export interface CompleteProjectsConversationsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1CompleteConversationRequest;
}

export const CompleteProjectsConversationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1CompleteConversationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/conversations/{conversationsId}:complete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CompleteProjectsConversationsRequest>;

export type CompleteProjectsConversationsResponse = GoogleCloudDialogflowV2beta1Conversation;
export const CompleteProjectsConversationsResponse = GoogleCloudDialogflowV2beta1Conversation;

export type CompleteProjectsConversationsError = CommonErrors;

export const completeProjectsConversations: API.OperationMethod<CompleteProjectsConversationsRequest, CompleteProjectsConversationsResponse, CompleteProjectsConversationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CompleteProjectsConversationsRequest,
  output: CompleteProjectsConversationsResponse,
  errors: [],
}));

export interface CreateProjectsConversationsParticipantsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Participant;
}

export const CreateProjectsConversationsParticipantsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Participant).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/conversations/{conversationsId}/participants", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsConversationsParticipantsRequest>;

export type CreateProjectsConversationsParticipantsResponse = GoogleCloudDialogflowV2beta1Participant;
export const CreateProjectsConversationsParticipantsResponse = GoogleCloudDialogflowV2beta1Participant;

export type CreateProjectsConversationsParticipantsError = CommonErrors;

export const createProjectsConversationsParticipants: API.OperationMethod<CreateProjectsConversationsParticipantsRequest, CreateProjectsConversationsParticipantsResponse, CreateProjectsConversationsParticipantsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsConversationsParticipantsRequest,
  output: CreateProjectsConversationsParticipantsResponse,
  errors: [],
}));

export interface GetProjectsConversationsParticipantsRequest {
  name: string;
}

export const GetProjectsConversationsParticipantsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/conversations/{conversationsId}/participants/{participantsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsConversationsParticipantsRequest>;

export type GetProjectsConversationsParticipantsResponse = GoogleCloudDialogflowV2beta1Participant;
export const GetProjectsConversationsParticipantsResponse = GoogleCloudDialogflowV2beta1Participant;

export type GetProjectsConversationsParticipantsError = CommonErrors;

export const getProjectsConversationsParticipants: API.OperationMethod<GetProjectsConversationsParticipantsRequest, GetProjectsConversationsParticipantsResponse, GetProjectsConversationsParticipantsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsConversationsParticipantsRequest,
  output: GetProjectsConversationsParticipantsResponse,
  errors: [],
}));

export interface ListProjectsConversationsParticipantsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsConversationsParticipantsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/conversations/{conversationsId}/participants" }),
  svc,
) as unknown as Schema.Schema<ListProjectsConversationsParticipantsRequest>;

export type ListProjectsConversationsParticipantsResponse = GoogleCloudDialogflowV2beta1ListParticipantsResponse;
export const ListProjectsConversationsParticipantsResponse = GoogleCloudDialogflowV2beta1ListParticipantsResponse;

export type ListProjectsConversationsParticipantsError = CommonErrors;

export const listProjectsConversationsParticipants: API.PaginatedOperationMethod<ListProjectsConversationsParticipantsRequest, ListProjectsConversationsParticipantsResponse, ListProjectsConversationsParticipantsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsConversationsParticipantsRequest,
  output: ListProjectsConversationsParticipantsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsConversationsParticipantsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Participant;
}

export const PatchProjectsConversationsParticipantsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Participant).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/conversations/{conversationsId}/participants/{participantsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsConversationsParticipantsRequest>;

export type PatchProjectsConversationsParticipantsResponse = GoogleCloudDialogflowV2beta1Participant;
export const PatchProjectsConversationsParticipantsResponse = GoogleCloudDialogflowV2beta1Participant;

export type PatchProjectsConversationsParticipantsError = CommonErrors;

export const patchProjectsConversationsParticipants: API.OperationMethod<PatchProjectsConversationsParticipantsRequest, PatchProjectsConversationsParticipantsResponse, PatchProjectsConversationsParticipantsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsConversationsParticipantsRequest,
  output: PatchProjectsConversationsParticipantsResponse,
  errors: [],
}));

export interface AnalyzeContentProjectsConversationsParticipantsRequest {
  participant: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1AnalyzeContentRequest;
}

export const AnalyzeContentProjectsConversationsParticipantsRequest = Schema.Struct({
  participant: Schema.String.pipe(T.HttpPath("participant")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1AnalyzeContentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/conversations/{conversationsId}/participants/{participantsId}:analyzeContent", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AnalyzeContentProjectsConversationsParticipantsRequest>;

export type AnalyzeContentProjectsConversationsParticipantsResponse = GoogleCloudDialogflowV2beta1AnalyzeContentResponse;
export const AnalyzeContentProjectsConversationsParticipantsResponse = GoogleCloudDialogflowV2beta1AnalyzeContentResponse;

export type AnalyzeContentProjectsConversationsParticipantsError = CommonErrors;

export const analyzeContentProjectsConversationsParticipants: API.OperationMethod<AnalyzeContentProjectsConversationsParticipantsRequest, AnalyzeContentProjectsConversationsParticipantsResponse, AnalyzeContentProjectsConversationsParticipantsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AnalyzeContentProjectsConversationsParticipantsRequest,
  output: AnalyzeContentProjectsConversationsParticipantsResponse,
  errors: [],
}));

export interface SuggestArticlesProjectsConversationsParticipantsSuggestionsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1SuggestArticlesRequest;
}

export const SuggestArticlesProjectsConversationsParticipantsSuggestionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1SuggestArticlesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/conversations/{conversationsId}/participants/{participantsId}/suggestions:suggestArticles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SuggestArticlesProjectsConversationsParticipantsSuggestionsRequest>;

export type SuggestArticlesProjectsConversationsParticipantsSuggestionsResponse = GoogleCloudDialogflowV2beta1SuggestArticlesResponse;
export const SuggestArticlesProjectsConversationsParticipantsSuggestionsResponse = GoogleCloudDialogflowV2beta1SuggestArticlesResponse;

export type SuggestArticlesProjectsConversationsParticipantsSuggestionsError = CommonErrors;

export const suggestArticlesProjectsConversationsParticipantsSuggestions: API.OperationMethod<SuggestArticlesProjectsConversationsParticipantsSuggestionsRequest, SuggestArticlesProjectsConversationsParticipantsSuggestionsResponse, SuggestArticlesProjectsConversationsParticipantsSuggestionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SuggestArticlesProjectsConversationsParticipantsSuggestionsRequest,
  output: SuggestArticlesProjectsConversationsParticipantsSuggestionsResponse,
  errors: [],
}));

export interface SuggestFaqAnswersProjectsConversationsParticipantsSuggestionsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1SuggestFaqAnswersRequest;
}

export const SuggestFaqAnswersProjectsConversationsParticipantsSuggestionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1SuggestFaqAnswersRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/conversations/{conversationsId}/participants/{participantsId}/suggestions:suggestFaqAnswers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SuggestFaqAnswersProjectsConversationsParticipantsSuggestionsRequest>;

export type SuggestFaqAnswersProjectsConversationsParticipantsSuggestionsResponse = GoogleCloudDialogflowV2beta1SuggestFaqAnswersResponse;
export const SuggestFaqAnswersProjectsConversationsParticipantsSuggestionsResponse = GoogleCloudDialogflowV2beta1SuggestFaqAnswersResponse;

export type SuggestFaqAnswersProjectsConversationsParticipantsSuggestionsError = CommonErrors;

export const suggestFaqAnswersProjectsConversationsParticipantsSuggestions: API.OperationMethod<SuggestFaqAnswersProjectsConversationsParticipantsSuggestionsRequest, SuggestFaqAnswersProjectsConversationsParticipantsSuggestionsResponse, SuggestFaqAnswersProjectsConversationsParticipantsSuggestionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SuggestFaqAnswersProjectsConversationsParticipantsSuggestionsRequest,
  output: SuggestFaqAnswersProjectsConversationsParticipantsSuggestionsResponse,
  errors: [],
}));

export interface SuggestSmartRepliesProjectsConversationsParticipantsSuggestionsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1SuggestSmartRepliesRequest;
}

export const SuggestSmartRepliesProjectsConversationsParticipantsSuggestionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1SuggestSmartRepliesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/conversations/{conversationsId}/participants/{participantsId}/suggestions:suggestSmartReplies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SuggestSmartRepliesProjectsConversationsParticipantsSuggestionsRequest>;

export type SuggestSmartRepliesProjectsConversationsParticipantsSuggestionsResponse = GoogleCloudDialogflowV2beta1SuggestSmartRepliesResponse;
export const SuggestSmartRepliesProjectsConversationsParticipantsSuggestionsResponse = GoogleCloudDialogflowV2beta1SuggestSmartRepliesResponse;

export type SuggestSmartRepliesProjectsConversationsParticipantsSuggestionsError = CommonErrors;

export const suggestSmartRepliesProjectsConversationsParticipantsSuggestions: API.OperationMethod<SuggestSmartRepliesProjectsConversationsParticipantsSuggestionsRequest, SuggestSmartRepliesProjectsConversationsParticipantsSuggestionsResponse, SuggestSmartRepliesProjectsConversationsParticipantsSuggestionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SuggestSmartRepliesProjectsConversationsParticipantsSuggestionsRequest,
  output: SuggestSmartRepliesProjectsConversationsParticipantsSuggestionsResponse,
  errors: [],
}));

export interface SuggestKnowledgeAssistProjectsConversationsParticipantsSuggestionsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistRequest;
}

export const SuggestKnowledgeAssistProjectsConversationsParticipantsSuggestionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/conversations/{conversationsId}/participants/{participantsId}/suggestions:suggestKnowledgeAssist", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SuggestKnowledgeAssistProjectsConversationsParticipantsSuggestionsRequest>;

export type SuggestKnowledgeAssistProjectsConversationsParticipantsSuggestionsResponse = GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistResponse;
export const SuggestKnowledgeAssistProjectsConversationsParticipantsSuggestionsResponse = GoogleCloudDialogflowV2beta1SuggestKnowledgeAssistResponse;

export type SuggestKnowledgeAssistProjectsConversationsParticipantsSuggestionsError = CommonErrors;

export const suggestKnowledgeAssistProjectsConversationsParticipantsSuggestions: API.OperationMethod<SuggestKnowledgeAssistProjectsConversationsParticipantsSuggestionsRequest, SuggestKnowledgeAssistProjectsConversationsParticipantsSuggestionsResponse, SuggestKnowledgeAssistProjectsConversationsParticipantsSuggestionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SuggestKnowledgeAssistProjectsConversationsParticipantsSuggestionsRequest,
  output: SuggestKnowledgeAssistProjectsConversationsParticipantsSuggestionsResponse,
  errors: [],
}));

export interface ListProjectsConversationsParticipantsSuggestionsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
  filter?: string;
}

export const ListProjectsConversationsParticipantsSuggestionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/conversations/{conversationsId}/participants/{participantsId}/suggestions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsConversationsParticipantsSuggestionsRequest>;

export type ListProjectsConversationsParticipantsSuggestionsResponse = GoogleCloudDialogflowV2beta1ListSuggestionsResponse;
export const ListProjectsConversationsParticipantsSuggestionsResponse = GoogleCloudDialogflowV2beta1ListSuggestionsResponse;

export type ListProjectsConversationsParticipantsSuggestionsError = CommonErrors;

export const listProjectsConversationsParticipantsSuggestions: API.PaginatedOperationMethod<ListProjectsConversationsParticipantsSuggestionsRequest, ListProjectsConversationsParticipantsSuggestionsResponse, ListProjectsConversationsParticipantsSuggestionsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsConversationsParticipantsSuggestionsRequest,
  output: ListProjectsConversationsParticipantsSuggestionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CompileProjectsConversationsParticipantsSuggestionsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1CompileSuggestionRequest;
}

export const CompileProjectsConversationsParticipantsSuggestionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1CompileSuggestionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/conversations/{conversationsId}/participants/{participantsId}/suggestions:compile", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CompileProjectsConversationsParticipantsSuggestionsRequest>;

export type CompileProjectsConversationsParticipantsSuggestionsResponse = GoogleCloudDialogflowV2beta1CompileSuggestionResponse;
export const CompileProjectsConversationsParticipantsSuggestionsResponse = GoogleCloudDialogflowV2beta1CompileSuggestionResponse;

export type CompileProjectsConversationsParticipantsSuggestionsError = CommonErrors;

export const compileProjectsConversationsParticipantsSuggestions: API.OperationMethod<CompileProjectsConversationsParticipantsSuggestionsRequest, CompileProjectsConversationsParticipantsSuggestionsResponse, CompileProjectsConversationsParticipantsSuggestionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CompileProjectsConversationsParticipantsSuggestionsRequest,
  output: CompileProjectsConversationsParticipantsSuggestionsResponse,
  errors: [],
}));

export interface BatchCreateProjectsConversationsMessagesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1BatchCreateMessagesRequest;
}

export const BatchCreateProjectsConversationsMessagesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1BatchCreateMessagesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/conversations/{conversationsId}/messages:batchCreate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchCreateProjectsConversationsMessagesRequest>;

export type BatchCreateProjectsConversationsMessagesResponse = GoogleCloudDialogflowV2beta1BatchCreateMessagesResponse;
export const BatchCreateProjectsConversationsMessagesResponse = GoogleCloudDialogflowV2beta1BatchCreateMessagesResponse;

export type BatchCreateProjectsConversationsMessagesError = CommonErrors;

export const batchCreateProjectsConversationsMessages: API.OperationMethod<BatchCreateProjectsConversationsMessagesRequest, BatchCreateProjectsConversationsMessagesResponse, BatchCreateProjectsConversationsMessagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchCreateProjectsConversationsMessagesRequest,
  output: BatchCreateProjectsConversationsMessagesResponse,
  errors: [],
}));

export interface ListProjectsConversationsMessagesRequest {
  parent: string;
  filter?: string;
  pageSize?: number;
  pageToken?: string;
}

export const ListProjectsConversationsMessagesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/conversations/{conversationsId}/messages" }),
  svc,
) as unknown as Schema.Schema<ListProjectsConversationsMessagesRequest>;

export type ListProjectsConversationsMessagesResponse = GoogleCloudDialogflowV2beta1ListMessagesResponse;
export const ListProjectsConversationsMessagesResponse = GoogleCloudDialogflowV2beta1ListMessagesResponse;

export type ListProjectsConversationsMessagesError = CommonErrors;

export const listProjectsConversationsMessages: API.PaginatedOperationMethod<ListProjectsConversationsMessagesRequest, ListProjectsConversationsMessagesResponse, ListProjectsConversationsMessagesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsConversationsMessagesRequest,
  output: ListProjectsConversationsMessagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface SuggestConversationSummaryProjectsConversationsSuggestionsRequest {
  conversation: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1SuggestConversationSummaryRequest;
}

export const SuggestConversationSummaryProjectsConversationsSuggestionsRequest = Schema.Struct({
  conversation: Schema.String.pipe(T.HttpPath("conversation")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1SuggestConversationSummaryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/conversations/{conversationsId}/suggestions:suggestConversationSummary", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SuggestConversationSummaryProjectsConversationsSuggestionsRequest>;

export type SuggestConversationSummaryProjectsConversationsSuggestionsResponse = GoogleCloudDialogflowV2beta1SuggestConversationSummaryResponse;
export const SuggestConversationSummaryProjectsConversationsSuggestionsResponse = GoogleCloudDialogflowV2beta1SuggestConversationSummaryResponse;

export type SuggestConversationSummaryProjectsConversationsSuggestionsError = CommonErrors;

export const suggestConversationSummaryProjectsConversationsSuggestions: API.OperationMethod<SuggestConversationSummaryProjectsConversationsSuggestionsRequest, SuggestConversationSummaryProjectsConversationsSuggestionsResponse, SuggestConversationSummaryProjectsConversationsSuggestionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SuggestConversationSummaryProjectsConversationsSuggestionsRequest,
  output: SuggestConversationSummaryProjectsConversationsSuggestionsResponse,
  errors: [],
}));

export interface SearchKnowledgeProjectsConversationsSuggestionsRequest {
  conversation: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1SearchKnowledgeRequest;
}

export const SearchKnowledgeProjectsConversationsSuggestionsRequest = Schema.Struct({
  conversation: Schema.String.pipe(T.HttpPath("conversation")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1SearchKnowledgeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/conversations/{conversationsId}/suggestions:searchKnowledge", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SearchKnowledgeProjectsConversationsSuggestionsRequest>;

export type SearchKnowledgeProjectsConversationsSuggestionsResponse = GoogleCloudDialogflowV2beta1SearchKnowledgeResponse;
export const SearchKnowledgeProjectsConversationsSuggestionsResponse = GoogleCloudDialogflowV2beta1SearchKnowledgeResponse;

export type SearchKnowledgeProjectsConversationsSuggestionsError = CommonErrors;

export const searchKnowledgeProjectsConversationsSuggestions: API.OperationMethod<SearchKnowledgeProjectsConversationsSuggestionsRequest, SearchKnowledgeProjectsConversationsSuggestionsResponse, SearchKnowledgeProjectsConversationsSuggestionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchKnowledgeProjectsConversationsSuggestionsRequest,
  output: SearchKnowledgeProjectsConversationsSuggestionsResponse,
  errors: [],
}));

export interface GenerateProjectsConversationsSuggestionsRequest {
  conversation: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1GenerateSuggestionsRequest;
}

export const GenerateProjectsConversationsSuggestionsRequest = Schema.Struct({
  conversation: Schema.String.pipe(T.HttpPath("conversation")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1GenerateSuggestionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/conversations/{conversationsId}/suggestions:generate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateProjectsConversationsSuggestionsRequest>;

export type GenerateProjectsConversationsSuggestionsResponse = GoogleCloudDialogflowV2beta1GenerateSuggestionsResponse;
export const GenerateProjectsConversationsSuggestionsResponse = GoogleCloudDialogflowV2beta1GenerateSuggestionsResponse;

export type GenerateProjectsConversationsSuggestionsError = CommonErrors;

export const generateProjectsConversationsSuggestions: API.OperationMethod<GenerateProjectsConversationsSuggestionsRequest, GenerateProjectsConversationsSuggestionsResponse, GenerateProjectsConversationsSuggestionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateProjectsConversationsSuggestionsRequest,
  output: GenerateProjectsConversationsSuggestionsResponse,
  errors: [],
}));

export interface GenerateStatelessSummaryProjectsSuggestionsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1GenerateStatelessSummaryRequest;
}

export const GenerateStatelessSummaryProjectsSuggestionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1GenerateStatelessSummaryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/suggestions:generateStatelessSummary", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateStatelessSummaryProjectsSuggestionsRequest>;

export type GenerateStatelessSummaryProjectsSuggestionsResponse = GoogleCloudDialogflowV2beta1GenerateStatelessSummaryResponse;
export const GenerateStatelessSummaryProjectsSuggestionsResponse = GoogleCloudDialogflowV2beta1GenerateStatelessSummaryResponse;

export type GenerateStatelessSummaryProjectsSuggestionsError = CommonErrors;

export const generateStatelessSummaryProjectsSuggestions: API.OperationMethod<GenerateStatelessSummaryProjectsSuggestionsRequest, GenerateStatelessSummaryProjectsSuggestionsResponse, GenerateStatelessSummaryProjectsSuggestionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateStatelessSummaryProjectsSuggestionsRequest,
  output: GenerateStatelessSummaryProjectsSuggestionsResponse,
  errors: [],
}));

export interface SearchKnowledgeProjectsSuggestionsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1SearchKnowledgeRequest;
}

export const SearchKnowledgeProjectsSuggestionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1SearchKnowledgeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/suggestions:searchKnowledge", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SearchKnowledgeProjectsSuggestionsRequest>;

export type SearchKnowledgeProjectsSuggestionsResponse = GoogleCloudDialogflowV2beta1SearchKnowledgeResponse;
export const SearchKnowledgeProjectsSuggestionsResponse = GoogleCloudDialogflowV2beta1SearchKnowledgeResponse;

export type SearchKnowledgeProjectsSuggestionsError = CommonErrors;

export const searchKnowledgeProjectsSuggestions: API.OperationMethod<SearchKnowledgeProjectsSuggestionsRequest, SearchKnowledgeProjectsSuggestionsResponse, SearchKnowledgeProjectsSuggestionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchKnowledgeProjectsSuggestionsRequest,
  output: SearchKnowledgeProjectsSuggestionsResponse,
  errors: [],
}));

export interface ListProjectsKnowledgeBasesRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
  filter?: string;
}

export const ListProjectsKnowledgeBasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/knowledgeBases" }),
  svc,
) as unknown as Schema.Schema<ListProjectsKnowledgeBasesRequest>;

export type ListProjectsKnowledgeBasesResponse = GoogleCloudDialogflowV2beta1ListKnowledgeBasesResponse;
export const ListProjectsKnowledgeBasesResponse = GoogleCloudDialogflowV2beta1ListKnowledgeBasesResponse;

export type ListProjectsKnowledgeBasesError = CommonErrors;

export const listProjectsKnowledgeBases: API.PaginatedOperationMethod<ListProjectsKnowledgeBasesRequest, ListProjectsKnowledgeBasesResponse, ListProjectsKnowledgeBasesError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsKnowledgeBasesRequest,
  output: ListProjectsKnowledgeBasesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsKnowledgeBasesRequest {
  name: string;
}

export const GetProjectsKnowledgeBasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/knowledgeBases/{knowledgeBasesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsKnowledgeBasesRequest>;

export type GetProjectsKnowledgeBasesResponse = GoogleCloudDialogflowV2beta1KnowledgeBase;
export const GetProjectsKnowledgeBasesResponse = GoogleCloudDialogflowV2beta1KnowledgeBase;

export type GetProjectsKnowledgeBasesError = CommonErrors;

export const getProjectsKnowledgeBases: API.OperationMethod<GetProjectsKnowledgeBasesRequest, GetProjectsKnowledgeBasesResponse, GetProjectsKnowledgeBasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsKnowledgeBasesRequest,
  output: GetProjectsKnowledgeBasesResponse,
  errors: [],
}));

export interface CreateProjectsKnowledgeBasesRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1KnowledgeBase;
}

export const CreateProjectsKnowledgeBasesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1KnowledgeBase).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/knowledgeBases", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsKnowledgeBasesRequest>;

export type CreateProjectsKnowledgeBasesResponse = GoogleCloudDialogflowV2beta1KnowledgeBase;
export const CreateProjectsKnowledgeBasesResponse = GoogleCloudDialogflowV2beta1KnowledgeBase;

export type CreateProjectsKnowledgeBasesError = CommonErrors;

export const createProjectsKnowledgeBases: API.OperationMethod<CreateProjectsKnowledgeBasesRequest, CreateProjectsKnowledgeBasesResponse, CreateProjectsKnowledgeBasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsKnowledgeBasesRequest,
  output: CreateProjectsKnowledgeBasesResponse,
  errors: [],
}));

export interface DeleteProjectsKnowledgeBasesRequest {
  name: string;
  force?: boolean;
}

export const DeleteProjectsKnowledgeBasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/knowledgeBases/{knowledgeBasesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsKnowledgeBasesRequest>;

export type DeleteProjectsKnowledgeBasesResponse = GoogleProtobufEmpty;
export const DeleteProjectsKnowledgeBasesResponse = GoogleProtobufEmpty;

export type DeleteProjectsKnowledgeBasesError = CommonErrors;

export const deleteProjectsKnowledgeBases: API.OperationMethod<DeleteProjectsKnowledgeBasesRequest, DeleteProjectsKnowledgeBasesResponse, DeleteProjectsKnowledgeBasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsKnowledgeBasesRequest,
  output: DeleteProjectsKnowledgeBasesResponse,
  errors: [],
}));

export interface PatchProjectsKnowledgeBasesRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1KnowledgeBase;
}

export const PatchProjectsKnowledgeBasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1KnowledgeBase).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/knowledgeBases/{knowledgeBasesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsKnowledgeBasesRequest>;

export type PatchProjectsKnowledgeBasesResponse = GoogleCloudDialogflowV2beta1KnowledgeBase;
export const PatchProjectsKnowledgeBasesResponse = GoogleCloudDialogflowV2beta1KnowledgeBase;

export type PatchProjectsKnowledgeBasesError = CommonErrors;

export const patchProjectsKnowledgeBases: API.OperationMethod<PatchProjectsKnowledgeBasesRequest, PatchProjectsKnowledgeBasesResponse, PatchProjectsKnowledgeBasesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsKnowledgeBasesRequest,
  output: PatchProjectsKnowledgeBasesResponse,
  errors: [],
}));

export interface ListProjectsKnowledgeBasesDocumentsRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
  filter?: string;
}

export const ListProjectsKnowledgeBasesDocumentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/knowledgeBases/{knowledgeBasesId}/documents" }),
  svc,
) as unknown as Schema.Schema<ListProjectsKnowledgeBasesDocumentsRequest>;

export type ListProjectsKnowledgeBasesDocumentsResponse = GoogleCloudDialogflowV2beta1ListDocumentsResponse;
export const ListProjectsKnowledgeBasesDocumentsResponse = GoogleCloudDialogflowV2beta1ListDocumentsResponse;

export type ListProjectsKnowledgeBasesDocumentsError = CommonErrors;

export const listProjectsKnowledgeBasesDocuments: API.PaginatedOperationMethod<ListProjectsKnowledgeBasesDocumentsRequest, ListProjectsKnowledgeBasesDocumentsResponse, ListProjectsKnowledgeBasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsKnowledgeBasesDocumentsRequest,
  output: ListProjectsKnowledgeBasesDocumentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsKnowledgeBasesDocumentsRequest {
  name: string;
}

export const GetProjectsKnowledgeBasesDocumentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/knowledgeBases/{knowledgeBasesId}/documents/{documentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsKnowledgeBasesDocumentsRequest>;

export type GetProjectsKnowledgeBasesDocumentsResponse = GoogleCloudDialogflowV2beta1Document;
export const GetProjectsKnowledgeBasesDocumentsResponse = GoogleCloudDialogflowV2beta1Document;

export type GetProjectsKnowledgeBasesDocumentsError = CommonErrors;

export const getProjectsKnowledgeBasesDocuments: API.OperationMethod<GetProjectsKnowledgeBasesDocumentsRequest, GetProjectsKnowledgeBasesDocumentsResponse, GetProjectsKnowledgeBasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsKnowledgeBasesDocumentsRequest,
  output: GetProjectsKnowledgeBasesDocumentsResponse,
  errors: [],
}));

export interface CreateProjectsKnowledgeBasesDocumentsRequest {
  parent: string;
  importGcsCustomMetadata?: boolean;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Document;
}

export const CreateProjectsKnowledgeBasesDocumentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  importGcsCustomMetadata: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("importGcsCustomMetadata")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Document).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/knowledgeBases/{knowledgeBasesId}/documents", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsKnowledgeBasesDocumentsRequest>;

export type CreateProjectsKnowledgeBasesDocumentsResponse = GoogleLongrunningOperation;
export const CreateProjectsKnowledgeBasesDocumentsResponse = GoogleLongrunningOperation;

export type CreateProjectsKnowledgeBasesDocumentsError = CommonErrors;

export const createProjectsKnowledgeBasesDocuments: API.OperationMethod<CreateProjectsKnowledgeBasesDocumentsRequest, CreateProjectsKnowledgeBasesDocumentsResponse, CreateProjectsKnowledgeBasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsKnowledgeBasesDocumentsRequest,
  output: CreateProjectsKnowledgeBasesDocumentsResponse,
  errors: [],
}));

export interface ImportProjectsKnowledgeBasesDocumentsRequest {
  parent: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1ImportDocumentsRequest;
}

export const ImportProjectsKnowledgeBasesDocumentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1ImportDocumentsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/knowledgeBases/{knowledgeBasesId}/documents:import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportProjectsKnowledgeBasesDocumentsRequest>;

export type ImportProjectsKnowledgeBasesDocumentsResponse = GoogleLongrunningOperation;
export const ImportProjectsKnowledgeBasesDocumentsResponse = GoogleLongrunningOperation;

export type ImportProjectsKnowledgeBasesDocumentsError = CommonErrors;

export const importProjectsKnowledgeBasesDocuments: API.OperationMethod<ImportProjectsKnowledgeBasesDocumentsRequest, ImportProjectsKnowledgeBasesDocumentsResponse, ImportProjectsKnowledgeBasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportProjectsKnowledgeBasesDocumentsRequest,
  output: ImportProjectsKnowledgeBasesDocumentsResponse,
  errors: [],
}));

export interface DeleteProjectsKnowledgeBasesDocumentsRequest {
  name: string;
}

export const DeleteProjectsKnowledgeBasesDocumentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/knowledgeBases/{knowledgeBasesId}/documents/{documentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsKnowledgeBasesDocumentsRequest>;

export type DeleteProjectsKnowledgeBasesDocumentsResponse = GoogleLongrunningOperation;
export const DeleteProjectsKnowledgeBasesDocumentsResponse = GoogleLongrunningOperation;

export type DeleteProjectsKnowledgeBasesDocumentsError = CommonErrors;

export const deleteProjectsKnowledgeBasesDocuments: API.OperationMethod<DeleteProjectsKnowledgeBasesDocumentsRequest, DeleteProjectsKnowledgeBasesDocumentsResponse, DeleteProjectsKnowledgeBasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsKnowledgeBasesDocumentsRequest,
  output: DeleteProjectsKnowledgeBasesDocumentsResponse,
  errors: [],
}));

export interface PatchProjectsKnowledgeBasesDocumentsRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1Document;
}

export const PatchProjectsKnowledgeBasesDocumentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1Document).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/knowledgeBases/{knowledgeBasesId}/documents/{documentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsKnowledgeBasesDocumentsRequest>;

export type PatchProjectsKnowledgeBasesDocumentsResponse = GoogleLongrunningOperation;
export const PatchProjectsKnowledgeBasesDocumentsResponse = GoogleLongrunningOperation;

export type PatchProjectsKnowledgeBasesDocumentsError = CommonErrors;

export const patchProjectsKnowledgeBasesDocuments: API.OperationMethod<PatchProjectsKnowledgeBasesDocumentsRequest, PatchProjectsKnowledgeBasesDocumentsResponse, PatchProjectsKnowledgeBasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsKnowledgeBasesDocumentsRequest,
  output: PatchProjectsKnowledgeBasesDocumentsResponse,
  errors: [],
}));

export interface ReloadProjectsKnowledgeBasesDocumentsRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1ReloadDocumentRequest;
}

export const ReloadProjectsKnowledgeBasesDocumentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1ReloadDocumentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/knowledgeBases/{knowledgeBasesId}/documents/{documentsId}:reload", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReloadProjectsKnowledgeBasesDocumentsRequest>;

export type ReloadProjectsKnowledgeBasesDocumentsResponse = GoogleLongrunningOperation;
export const ReloadProjectsKnowledgeBasesDocumentsResponse = GoogleLongrunningOperation;

export type ReloadProjectsKnowledgeBasesDocumentsError = CommonErrors;

export const reloadProjectsKnowledgeBasesDocuments: API.OperationMethod<ReloadProjectsKnowledgeBasesDocumentsRequest, ReloadProjectsKnowledgeBasesDocumentsResponse, ReloadProjectsKnowledgeBasesDocumentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReloadProjectsKnowledgeBasesDocumentsRequest,
  output: ReloadProjectsKnowledgeBasesDocumentsResponse,
  errors: [],
}));

export interface ListProjectsPhoneNumbersRequest {
  parent: string;
  pageSize?: number;
  pageToken?: string;
  showDeleted?: boolean;
}

export const ListProjectsPhoneNumbersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  showDeleted: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showDeleted")),
}).pipe(
  T.Http({ method: "GET", path: "v2beta1/projects/{projectsId}/phoneNumbers" }),
  svc,
) as unknown as Schema.Schema<ListProjectsPhoneNumbersRequest>;

export type ListProjectsPhoneNumbersResponse = GoogleCloudDialogflowV2beta1ListPhoneNumbersResponse;
export const ListProjectsPhoneNumbersResponse = GoogleCloudDialogflowV2beta1ListPhoneNumbersResponse;

export type ListProjectsPhoneNumbersError = CommonErrors;

export const listProjectsPhoneNumbers: API.PaginatedOperationMethod<ListProjectsPhoneNumbersRequest, ListProjectsPhoneNumbersResponse, ListProjectsPhoneNumbersError, GCPAuth | HttpClient.HttpClient> = API.makePaginated(() => ({
  input: ListProjectsPhoneNumbersRequest,
  output: ListProjectsPhoneNumbersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsPhoneNumbersRequest {
  name: string;
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1PhoneNumber;
}

export const PatchProjectsPhoneNumbersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1PhoneNumber).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2beta1/projects/{projectsId}/phoneNumbers/{phoneNumbersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsPhoneNumbersRequest>;

export type PatchProjectsPhoneNumbersResponse = GoogleCloudDialogflowV2beta1PhoneNumber;
export const PatchProjectsPhoneNumbersResponse = GoogleCloudDialogflowV2beta1PhoneNumber;

export type PatchProjectsPhoneNumbersError = CommonErrors;

export const patchProjectsPhoneNumbers: API.OperationMethod<PatchProjectsPhoneNumbersRequest, PatchProjectsPhoneNumbersResponse, PatchProjectsPhoneNumbersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsPhoneNumbersRequest,
  output: PatchProjectsPhoneNumbersResponse,
  errors: [],
}));

export interface DeleteProjectsPhoneNumbersRequest {
  name: string;
}

export const DeleteProjectsPhoneNumbersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2beta1/projects/{projectsId}/phoneNumbers/{phoneNumbersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsPhoneNumbersRequest>;

export type DeleteProjectsPhoneNumbersResponse = GoogleCloudDialogflowV2beta1PhoneNumber;
export const DeleteProjectsPhoneNumbersResponse = GoogleCloudDialogflowV2beta1PhoneNumber;

export type DeleteProjectsPhoneNumbersError = CommonErrors;

export const deleteProjectsPhoneNumbers: API.OperationMethod<DeleteProjectsPhoneNumbersRequest, DeleteProjectsPhoneNumbersResponse, DeleteProjectsPhoneNumbersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsPhoneNumbersRequest,
  output: DeleteProjectsPhoneNumbersResponse,
  errors: [],
}));

export interface UndeleteProjectsPhoneNumbersRequest {
  name: string;
  /** Request body */
  body?: GoogleCloudDialogflowV2beta1UndeletePhoneNumberRequest;
}

export const UndeleteProjectsPhoneNumbersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDialogflowV2beta1UndeletePhoneNumberRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2beta1/projects/{projectsId}/phoneNumbers/{phoneNumbersId}:undelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UndeleteProjectsPhoneNumbersRequest>;

export type UndeleteProjectsPhoneNumbersResponse = GoogleCloudDialogflowV2beta1PhoneNumber;
export const UndeleteProjectsPhoneNumbersResponse = GoogleCloudDialogflowV2beta1PhoneNumber;

export type UndeleteProjectsPhoneNumbersError = CommonErrors;

export const undeleteProjectsPhoneNumbers: API.OperationMethod<UndeleteProjectsPhoneNumbersRequest, UndeleteProjectsPhoneNumbersResponse, UndeleteProjectsPhoneNumbersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UndeleteProjectsPhoneNumbersRequest,
  output: UndeleteProjectsPhoneNumbersResponse,
  errors: [],
}));

