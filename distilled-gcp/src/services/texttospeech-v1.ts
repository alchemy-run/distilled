// ==========================================================================
// Cloud Text-to-Speech API (texttospeech v1)
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
  name: "texttospeech",
  version: "v1",
  rootUrl: "https://texttospeech.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Voice {
  /** The languages that this voice supports, expressed as [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) language tags (e.g. "en-US", "es-419", "cmn-tw"). */
  languageCodes?: Array<string>;
  /** The name of this voice. Each distinct voice has a unique name. */
  name?: string;
  /** The gender of this voice. */
  ssmlGender?: "SSML_VOICE_GENDER_UNSPECIFIED" | "MALE" | "FEMALE" | "NEUTRAL" | (string & {});
  /** The natural sample rate (in hertz) for this voice. */
  naturalSampleRateHertz?: number;
}

export const Voice: Schema.Schema<Voice> = Schema.suspend(() => Schema.Struct({
  languageCodes: Schema.optional(Schema.Array(Schema.String)),
  name: Schema.optional(Schema.String),
  ssmlGender: Schema.optional(Schema.String),
  naturalSampleRateHertz: Schema.optional(Schema.Number),
})).annotate({ identifier: "Voice" }) as any as Schema.Schema<Voice>;

export interface ListVoicesResponse {
  /** The list of voices. */
  voices?: Array<Voice>;
}

export const ListVoicesResponse: Schema.Schema<ListVoicesResponse> = Schema.suspend(() => Schema.Struct({
  voices: Schema.optional(Schema.Array(Voice)),
})).annotate({ identifier: "ListVoicesResponse" }) as any as Schema.Schema<ListVoicesResponse>;

export interface Turn {
  /** Required. The speaker of the turn, for example, 'O' or 'Q'. Please refer to documentation for available speakers. */
  speaker?: string;
  /** Required. The text to speak. */
  text?: string;
}

export const Turn: Schema.Schema<Turn> = Schema.suspend(() => Schema.Struct({
  speaker: Schema.optional(Schema.String),
  text: Schema.optional(Schema.String),
})).annotate({ identifier: "Turn" }) as any as Schema.Schema<Turn>;

export interface MultiSpeakerMarkup {
  /** Required. Speaker turns. */
  turns?: Array<Turn>;
}

export const MultiSpeakerMarkup: Schema.Schema<MultiSpeakerMarkup> = Schema.suspend(() => Schema.Struct({
  turns: Schema.optional(Schema.Array(Turn)),
})).annotate({ identifier: "MultiSpeakerMarkup" }) as any as Schema.Schema<MultiSpeakerMarkup>;

export interface CustomPronunciationParams {
  /** The phrase to which the customization is applied. The phrase can be multiple words, such as proper nouns, but shouldn't span the length of the sentence. */
  phrase?: string;
  /** The phonetic encoding of the phrase. */
  phoneticEncoding?: "PHONETIC_ENCODING_UNSPECIFIED" | "PHONETIC_ENCODING_IPA" | "PHONETIC_ENCODING_X_SAMPA" | "PHONETIC_ENCODING_JAPANESE_YOMIGANA" | "PHONETIC_ENCODING_PINYIN" | (string & {});
  /** The pronunciation of the phrase. This must be in the phonetic encoding specified above. */
  pronunciation?: string;
}

export const CustomPronunciationParams: Schema.Schema<CustomPronunciationParams> = Schema.suspend(() => Schema.Struct({
  phrase: Schema.optional(Schema.String),
  phoneticEncoding: Schema.optional(Schema.String),
  pronunciation: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomPronunciationParams" }) as any as Schema.Schema<CustomPronunciationParams>;

export interface CustomPronunciations {
  /** The pronunciation customizations are applied. */
  pronunciations?: Array<CustomPronunciationParams>;
}

export const CustomPronunciations: Schema.Schema<CustomPronunciations> = Schema.suspend(() => Schema.Struct({
  pronunciations: Schema.optional(Schema.Array(CustomPronunciationParams)),
})).annotate({ identifier: "CustomPronunciations" }) as any as Schema.Schema<CustomPronunciations>;

export interface SynthesisInput {
  /** The raw text to be synthesized. */
  text?: string;
  /** Markup for Chirp 3: HD voices specifically. This field may not be used with any other voices. */
  markup?: string;
  /** The SSML document to be synthesized. The SSML document must be valid and well-formed. Otherwise the RPC will fail and return google.rpc.Code.INVALID_ARGUMENT. For more information, see [SSML](https://cloud.google.com/text-to-speech/docs/ssml). */
  ssml?: string;
  /** The multi-speaker input to be synthesized. Only applicable for multi-speaker synthesis. */
  multiSpeakerMarkup?: MultiSpeakerMarkup;
  /** This system instruction is supported only for controllable/promptable voice models. If this system instruction is used, we pass the unedited text to Gemini-TTS. Otherwise, a default system instruction is used. AI Studio calls this system instruction, Style Instructions. */
  prompt?: string;
  /** Optional. The pronunciation customizations are applied to the input. If this is set, the input is synthesized using the given pronunciation customizations. The initial support is for en-us, with plans to expand to other locales in the future. Instant Clone voices aren't supported. In order to customize the pronunciation of a phrase, there must be an exact match of the phrase in the input types. If using SSML, the phrase must not be inside a phoneme tag. */
  customPronunciations?: CustomPronunciations;
}

export const SynthesisInput: Schema.Schema<SynthesisInput> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  markup: Schema.optional(Schema.String),
  ssml: Schema.optional(Schema.String),
  multiSpeakerMarkup: Schema.optional(MultiSpeakerMarkup),
  prompt: Schema.optional(Schema.String),
  customPronunciations: Schema.optional(CustomPronunciations),
})).annotate({ identifier: "SynthesisInput" }) as any as Schema.Schema<SynthesisInput>;

export interface CustomVoiceParams {
  /** Required. The name of the AutoML model that synthesizes the custom voice. */
  model?: string;
  /** Optional. Deprecated. The usage of the synthesized audio to be reported. */
  reportedUsage?: "REPORTED_USAGE_UNSPECIFIED" | "REALTIME" | "OFFLINE" | (string & {});
}

export const CustomVoiceParams: Schema.Schema<CustomVoiceParams> = Schema.suspend(() => Schema.Struct({
  model: Schema.optional(Schema.String),
  reportedUsage: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomVoiceParams" }) as any as Schema.Schema<CustomVoiceParams>;

export interface VoiceCloneParams {
  /** Required. Created by GenerateVoiceCloningKey. */
  voiceCloningKey?: string;
}

export const VoiceCloneParams: Schema.Schema<VoiceCloneParams> = Schema.suspend(() => Schema.Struct({
  voiceCloningKey: Schema.optional(Schema.String),
})).annotate({ identifier: "VoiceCloneParams" }) as any as Schema.Schema<VoiceCloneParams>;

export interface MultispeakerPrebuiltVoice {
  /** Required. The speaker alias of the voice. This is the user-chosen speaker name that is used in the multispeaker text input, such as "Speaker1". */
  speakerAlias?: string;
  /** Required. The speaker ID of the voice. See https://cloud.google.com/text-to-speech/docs/gemini-tts#voice_options for available values. */
  speakerId?: string;
}

export const MultispeakerPrebuiltVoice: Schema.Schema<MultispeakerPrebuiltVoice> = Schema.suspend(() => Schema.Struct({
  speakerAlias: Schema.optional(Schema.String),
  speakerId: Schema.optional(Schema.String),
})).annotate({ identifier: "MultispeakerPrebuiltVoice" }) as any as Schema.Schema<MultispeakerPrebuiltVoice>;

export interface MultiSpeakerVoiceConfig {
  /** Required. A list of configurations for the voices of the speakers. Exactly two speaker voice configurations must be provided. */
  speakerVoiceConfigs?: Array<MultispeakerPrebuiltVoice>;
}

export const MultiSpeakerVoiceConfig: Schema.Schema<MultiSpeakerVoiceConfig> = Schema.suspend(() => Schema.Struct({
  speakerVoiceConfigs: Schema.optional(Schema.Array(MultispeakerPrebuiltVoice)),
})).annotate({ identifier: "MultiSpeakerVoiceConfig" }) as any as Schema.Schema<MultiSpeakerVoiceConfig>;

export interface VoiceSelectionParams {
  /** Required. The language (and potentially also the region) of the voice expressed as a [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) language tag, e.g. "en-US". This should not include a script tag (e.g. use "cmn-cn" rather than "cmn-Hant-cn"), because the script will be inferred from the input provided in the SynthesisInput. The TTS service will use this parameter to help choose an appropriate voice. Note that the TTS service may choose a voice with a slightly different language code than the one selected; it may substitute a different region (e.g. using en-US rather than en-CA if there isn't a Canadian voice available), or even a different language, e.g. using "nb" (Norwegian Bokmal) instead of "no" (Norwegian)". */
  languageCode?: string;
  /** The name of the voice. If both the name and the gender are not set, the service will choose a voice based on the other parameters such as language_code. */
  name?: string;
  /** The preferred gender of the voice. If not set, the service will choose a voice based on the other parameters such as language_code and name. Note that this is only a preference, not requirement; if a voice of the appropriate gender is not available, the synthesizer should substitute a voice with a different gender rather than failing the request. */
  ssmlGender?: "SSML_VOICE_GENDER_UNSPECIFIED" | "MALE" | "FEMALE" | "NEUTRAL" | (string & {});
  /** The configuration for a custom voice. If [CustomVoiceParams.model] is set, the service will choose the custom voice matching the specified configuration. */
  customVoice?: CustomVoiceParams;
  /** Optional. The configuration for a voice clone. If [VoiceCloneParams.voice_clone_key] is set, the service chooses the voice clone matching the specified configuration. */
  voiceClone?: VoiceCloneParams;
  /** Optional. The name of the model. If set, the service will choose the model matching the specified configuration. */
  modelName?: string;
  /** Optional. The configuration for a Gemini multi-speaker text-to-speech setup. Enables the use of two distinct voices in a single synthesis request. */
  multiSpeakerVoiceConfig?: MultiSpeakerVoiceConfig;
}

export const VoiceSelectionParams: Schema.Schema<VoiceSelectionParams> = Schema.suspend(() => Schema.Struct({
  languageCode: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  ssmlGender: Schema.optional(Schema.String),
  customVoice: Schema.optional(CustomVoiceParams),
  voiceClone: Schema.optional(VoiceCloneParams),
  modelName: Schema.optional(Schema.String),
  multiSpeakerVoiceConfig: Schema.optional(MultiSpeakerVoiceConfig),
})).annotate({ identifier: "VoiceSelectionParams" }) as any as Schema.Schema<VoiceSelectionParams>;

export interface AudioConfig {
  /** Required. The format of the audio byte stream. */
  audioEncoding?: "AUDIO_ENCODING_UNSPECIFIED" | "LINEAR16" | "MP3" | "OGG_OPUS" | "MULAW" | "ALAW" | "PCM" | "M4A" | (string & {});
  /** Optional. Input only. Speaking rate/speed, in the range [0.25, 2.0]. 1.0 is the normal native speed supported by the specific voice. 2.0 is twice as fast, and 0.5 is half as fast. If unset(0.0), defaults to the native 1.0 speed. Any other values < 0.25 or > 2.0 will return an error. */
  speakingRate?: number;
  /** Optional. Input only. Speaking pitch, in the range [-20.0, 20.0]. 20 means increase 20 semitones from the original pitch. -20 means decrease 20 semitones from the original pitch. */
  pitch?: number;
  /** Optional. Input only. Volume gain (in dB) of the normal native volume supported by the specific voice, in the range [-96.0, 16.0]. If unset, or set to a value of 0.0 (dB), will play at normal native signal amplitude. A value of -6.0 (dB) will play at approximately half the amplitude of the normal native signal amplitude. A value of +6.0 (dB) will play at approximately twice the amplitude of the normal native signal amplitude. Strongly recommend not to exceed +10 (dB) as there's usually no effective increase in loudness for any value greater than that. */
  volumeGainDb?: number;
  /** Optional. The synthesis sample rate (in hertz) for this audio. When this is specified in SynthesizeSpeechRequest, if this is different from the voice's natural sample rate, then the synthesizer will honor this request by converting to the desired sample rate (which might result in worse audio quality), unless the specified sample rate is not supported for the encoding chosen, in which case it will fail the request and return google.rpc.Code.INVALID_ARGUMENT. */
  sampleRateHertz?: number;
  /** Optional. Input only. An identifier which selects 'audio effects' profiles that are applied on (post synthesized) text to speech. Effects are applied on top of each other in the order they are given. See [audio profiles](https://cloud.google.com/text-to-speech/docs/audio-profiles) for current supported profile ids. */
  effectsProfileId?: Array<string>;
}

export const AudioConfig: Schema.Schema<AudioConfig> = Schema.suspend(() => Schema.Struct({
  audioEncoding: Schema.optional(Schema.String),
  speakingRate: Schema.optional(Schema.Number),
  pitch: Schema.optional(Schema.Number),
  volumeGainDb: Schema.optional(Schema.Number),
  sampleRateHertz: Schema.optional(Schema.Number),
  effectsProfileId: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AudioConfig" }) as any as Schema.Schema<AudioConfig>;

export interface AdvancedVoiceOptions {
  /** Only for Journey voices. If false, the synthesis is context aware and has a higher latency. */
  lowLatencyJourneySynthesis?: boolean;
  /** Optional. Input only. If true, relaxes safety filters for Gemini TTS. Only supported for accounts linked to Invoiced (Offline) Cloud billing accounts. Otherwise, will return result google.rpc.Code.INVALID_ARGUMENT. */
  relaxSafetyFilters?: boolean;
  /** Optional. If true, textnorm will be applied to text input. This feature is enabled by default. Only applies for Gemini TTS. */
  enableTextnorm?: boolean;
}

export const AdvancedVoiceOptions: Schema.Schema<AdvancedVoiceOptions> = Schema.suspend(() => Schema.Struct({
  lowLatencyJourneySynthesis: Schema.optional(Schema.Boolean),
  relaxSafetyFilters: Schema.optional(Schema.Boolean),
  enableTextnorm: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AdvancedVoiceOptions" }) as any as Schema.Schema<AdvancedVoiceOptions>;

export interface SynthesizeSpeechRequest {
  /** Required. The Synthesizer requires either plain text or SSML as input. */
  input?: SynthesisInput;
  /** Required. The desired voice of the synthesized audio. */
  voice?: VoiceSelectionParams;
  /** Required. The configuration of the synthesized audio. */
  audioConfig?: AudioConfig;
  /** Optional. Advanced voice options. */
  advancedVoiceOptions?: AdvancedVoiceOptions;
}

export const SynthesizeSpeechRequest: Schema.Schema<SynthesizeSpeechRequest> = Schema.suspend(() => Schema.Struct({
  input: Schema.optional(SynthesisInput),
  voice: Schema.optional(VoiceSelectionParams),
  audioConfig: Schema.optional(AudioConfig),
  advancedVoiceOptions: Schema.optional(AdvancedVoiceOptions),
})).annotate({ identifier: "SynthesizeSpeechRequest" }) as any as Schema.Schema<SynthesizeSpeechRequest>;

export interface SynthesizeSpeechResponse {
  /** The audio data bytes encoded as specified in the request, including the header for encodings that are wrapped in containers (e.g. MP3, OGG_OPUS). For LINEAR16 audio, we include the WAV header. Note: as with all bytes fields, protobuffers use a pure binary representation, whereas JSON representations use base64. */
  audioContent?: string;
}

export const SynthesizeSpeechResponse: Schema.Schema<SynthesizeSpeechResponse> = Schema.suspend(() => Schema.Struct({
  audioContent: Schema.optional(Schema.String),
})).annotate({ identifier: "SynthesizeSpeechResponse" }) as any as Schema.Schema<SynthesizeSpeechResponse>;

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface SynthesizeLongAudioRequest {
  /** Required. The Synthesizer requires either plain text or SSML as input. */
  input?: SynthesisInput;
  /** Required. The configuration of the synthesized audio. */
  audioConfig?: AudioConfig;
  /** Required. Specifies a Cloud Storage URI for the synthesis results. Must be specified in the format: `gs://bucket_name/object_name`, and the bucket must already exist. */
  outputGcsUri?: string;
  /** Required. The desired voice of the synthesized audio. */
  voice?: VoiceSelectionParams;
}

export const SynthesizeLongAudioRequest: Schema.Schema<SynthesizeLongAudioRequest> = Schema.suspend(() => Schema.Struct({
  input: Schema.optional(SynthesisInput),
  audioConfig: Schema.optional(AudioConfig),
  outputGcsUri: Schema.optional(Schema.String),
  voice: Schema.optional(VoiceSelectionParams),
})).annotate({ identifier: "SynthesizeLongAudioRequest" }) as any as Schema.Schema<SynthesizeLongAudioRequest>;

export interface SynthesizeLongAudioMetadata {
  /** Time when the request was received. */
  startTime?: string;
  /** Deprecated. Do not use. */
  lastUpdateTime?: string;
  /** The progress of the most recent processing update in percentage, ie. 70.0%. */
  progressPercentage?: number;
}

export const SynthesizeLongAudioMetadata: Schema.Schema<SynthesizeLongAudioMetadata> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  lastUpdateTime: Schema.optional(Schema.String),
  progressPercentage: Schema.optional(Schema.Number),
})).annotate({ identifier: "SynthesizeLongAudioMetadata" }) as any as Schema.Schema<SynthesizeLongAudioMetadata>;

export interface GoogleCloudTexttospeechV1SynthesizeLongAudioMetadata {
  /** Time when the request was received. */
  startTime?: string;
  /** Deprecated. Do not use. */
  lastUpdateTime?: string;
  /** The progress of the most recent processing update in percentage, ie. 70.0%. */
  progressPercentage?: number;
}

export const GoogleCloudTexttospeechV1SynthesizeLongAudioMetadata: Schema.Schema<GoogleCloudTexttospeechV1SynthesizeLongAudioMetadata> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  lastUpdateTime: Schema.optional(Schema.String),
  progressPercentage: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudTexttospeechV1SynthesizeLongAudioMetadata" }) as any as Schema.Schema<GoogleCloudTexttospeechV1SynthesizeLongAudioMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

/** Returns a list of Voice supported for synthesis. */
export interface ListVoicesRequest {
  /** Optional. Recommended. [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) language tag. If not specified, the API will return all supported voices. If specified, the ListVoices call will only return voices that can be used to synthesize this language_code. For example, if you specify `"en-NZ"`, all `"en-NZ"` voices will be returned. If you specify `"no"`, both `"no-\*"` (Norwegian) and `"nb-\*"` (Norwegian Bokmal) voices will be returned. */
  languageCode?: string;
}

export const ListVoicesRequest = Schema.Struct({
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v1/voices" }),
  svc,
) as unknown as Schema.Schema<ListVoicesRequest>;

export type ListVoicesResponse_Op = ListVoicesResponse;
export const ListVoicesResponse_Op = ListVoicesResponse;

export type ListVoicesError = CommonErrors;

export const listVoices: API.OperationMethod<ListVoicesRequest, ListVoicesResponse_Op, ListVoicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListVoicesRequest,
  output: ListVoicesResponse_Op,
  errors: [],
}));

/** Synthesizes speech synchronously: receive results after all text input has been processed. */
export interface SynthesizeTextRequest {
  /** Request body */
  body?: SynthesizeSpeechRequest;
}

export const SynthesizeTextRequest = Schema.Struct({
  body: Schema.optional(SynthesizeSpeechRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/text:synthesize", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SynthesizeTextRequest>;

export type SynthesizeTextResponse = SynthesizeSpeechResponse;
export const SynthesizeTextResponse = SynthesizeSpeechResponse;

export type SynthesizeTextError = CommonErrors;

export const synthesizeText: API.OperationMethod<SynthesizeTextRequest, SynthesizeTextResponse, SynthesizeTextError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SynthesizeTextRequest,
  output: SynthesizeTextResponse,
  errors: [],
}));

/** Synthesizes long form text asynchronously. */
export interface SynthesizeLongAudioProjectsLocationsRequest {
  /** The resource states of the request in the form of `projects/* /locations/*`. */
  parent: string;
  /** Request body */
  body?: SynthesizeLongAudioRequest;
}

export const SynthesizeLongAudioProjectsLocationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SynthesizeLongAudioRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}:synthesizeLongAudio", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SynthesizeLongAudioProjectsLocationsRequest>;

export type SynthesizeLongAudioProjectsLocationsResponse = Operation;
export const SynthesizeLongAudioProjectsLocationsResponse = Operation;

export type SynthesizeLongAudioProjectsLocationsError = CommonErrors;

export const synthesizeLongAudioProjectsLocations: API.OperationMethod<SynthesizeLongAudioProjectsLocationsRequest, SynthesizeLongAudioProjectsLocationsResponse, SynthesizeLongAudioProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SynthesizeLongAudioProjectsLocationsRequest,
  output: SynthesizeLongAudioProjectsLocationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsLocationsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = ListOperationsResponse;

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

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse = Operation;

export type GetProjectsLocationsOperationsError = CommonErrors;

export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOperationsRequest>;

export type DeleteOperationsResponse = Empty;
export const DeleteOperationsResponse = Empty;

export type DeleteOperationsError = CommonErrors;

export const deleteOperations: API.OperationMethod<DeleteOperationsRequest, DeleteOperationsResponse, DeleteOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOperationsRequest,
  output: DeleteOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelOperationsRequest>;

export type CancelOperationsResponse = Empty;
export const CancelOperationsResponse = Empty;

export type CancelOperationsError = CommonErrors;

export const cancelOperations: API.OperationMethod<CancelOperationsRequest, CancelOperationsResponse, CancelOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelOperationsRequest,
  output: CancelOperationsResponse,
  errors: [],
}));

