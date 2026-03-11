// ==========================================================================
// Cloud Speech-to-Text API (speech v1)
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
  name: "speech",
  version: "v1",
  rootUrl: "https://speech.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Phrase {
  /** The phrase itself. */
  value?: string;
  /** Hint Boost. Overrides the boost set at the phrase set level. Positive value will increase the probability that a specific phrase will be recognized over other similar sounding phrases. The higher the boost, the higher the chance of false positive recognition as well. Negative boost will simply be ignored. Though `boost` can accept a wide range of positive values, most use cases are best served with values between 0 and 20. We recommend using a binary search approach to finding the optimal value for your use case as well as adding phrases both with and without boost to your requests. */
  boost?: number;
}

export const Phrase: Schema.Schema<Phrase> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
      boost: Schema.optional(Schema.Number),
    }),
  ).annotate({ identifier: "Phrase" }) as any as Schema.Schema<Phrase>;

export interface PhraseSet {
  /** The resource name of the phrase set. */
  name?: string;
  /** A list of word and phrases. */
  phrases?: Array<Phrase>;
  /** Hint Boost. Positive value will increase the probability that a specific phrase will be recognized over other similar sounding phrases. The higher the boost, the higher the chance of false positive recognition as well. Negative boost values would correspond to anti-biasing. Anti-biasing is not enabled, so negative boost will simply be ignored. Though `boost` can accept a wide range of positive values, most use cases are best served with values between 0 (exclusive) and 20. We recommend using a binary search approach to finding the optimal value for your use case as well as adding phrases both with and without boost to your requests. */
  boost?: number;
  /** Output only. The [KMS key name](https://cloud.google.com/kms/docs/resource-hierarchy#keys) with which the content of the PhraseSet is encrypted. The expected format is `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`. */
  kmsKeyName?: string;
  /** Output only. The [KMS key version name](https://cloud.google.com/kms/docs/resource-hierarchy#key_versions) with which content of the PhraseSet is encrypted. The expected format is `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}/cryptoKeyVersions/{crypto_key_version}`. */
  kmsKeyVersionName?: string;
  /** Output only. System-assigned unique identifier for the PhraseSet. This field is not used. */
  uid?: string;
  /** Output only. User-settable, human-readable name for the PhraseSet. Must be 63 characters or less. This field is not used. */
  displayName?: string;
  /** Output only. The CustomClass lifecycle state. This field is not used. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "DELETED" | (string & {});
  /** Output only. The time at which this resource was requested for deletion. This field is not used. */
  deleteTime?: string;
  /** Output only. The time at which this resource will be purged. This field is not used. */
  expireTime?: string;
  /** Output only. Allows users to store small amounts of arbitrary data. Both the key and the value must be 63 characters or less each. At most 100 annotations. This field is not used. */
  annotations?: Record<string, string>;
  /** Output only. This checksum is computed by the server based on the value of other fields. This may be sent on update, undelete, and delete requests to ensure the client has an up-to-date value before proceeding. This field is not used. */
  etag?: string;
  /** Output only. Whether or not this PhraseSet is in the process of being updated. This field is not used. */
  reconciling?: boolean;
}

export const PhraseSet: Schema.Schema<PhraseSet> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      phrases: Schema.optional(Schema.Array(Phrase)),
      boost: Schema.optional(Schema.Number),
      kmsKeyName: Schema.optional(Schema.String),
      kmsKeyVersionName: Schema.optional(Schema.String),
      uid: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      deleteTime: Schema.optional(Schema.String),
      expireTime: Schema.optional(Schema.String),
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      etag: Schema.optional(Schema.String),
      reconciling: Schema.optional(Schema.Boolean),
    }),
  ).annotate({ identifier: "PhraseSet" }) as any as Schema.Schema<PhraseSet>;

export interface CreatePhraseSetRequest {
  /** Required. The ID to use for the phrase set, which will become the final component of the phrase set's resource name. This value should restrict to letters, numbers, and hyphens, with the first character a letter, the last a letter or a number, and be 4-63 characters. */
  phraseSetId?: string;
  /** Required. The phrase set to create. */
  phraseSet?: PhraseSet;
}

export const CreatePhraseSetRequest: Schema.Schema<CreatePhraseSetRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      phraseSetId: Schema.optional(Schema.String),
      phraseSet: Schema.optional(PhraseSet),
    }),
  ).annotate({
    identifier: "CreatePhraseSetRequest",
  }) as any as Schema.Schema<CreatePhraseSetRequest>;

export interface ListPhraseSetResponse {
  /** The phrase set. */
  phraseSets?: Array<PhraseSet>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListPhraseSetResponse: Schema.Schema<ListPhraseSetResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      phraseSets: Schema.optional(Schema.Array(PhraseSet)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListPhraseSetResponse",
  }) as any as Schema.Schema<ListPhraseSetResponse>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

export interface ClassItem {
  /** The class item's value. */
  value?: string;
}

export const ClassItem: Schema.Schema<ClassItem> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "ClassItem" }) as any as Schema.Schema<ClassItem>;

export interface CustomClass {
  /** The resource name of the custom class. */
  name?: string;
  /** If this custom class is a resource, the custom_class_id is the resource id of the CustomClass. Case sensitive. */
  customClassId?: string;
  /** A collection of class items. */
  items?: Array<ClassItem>;
  /** Output only. The [KMS key name](https://cloud.google.com/kms/docs/resource-hierarchy#keys) with which the content of the ClassItem is encrypted. The expected format is `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`. */
  kmsKeyName?: string;
  /** Output only. The [KMS key version name](https://cloud.google.com/kms/docs/resource-hierarchy#key_versions) with which content of the ClassItem is encrypted. The expected format is `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}/cryptoKeyVersions/{crypto_key_version}`. */
  kmsKeyVersionName?: string;
  /** Output only. System-assigned unique identifier for the CustomClass. This field is not used. */
  uid?: string;
  /** Output only. User-settable, human-readable name for the CustomClass. Must be 63 characters or less. This field is not used. */
  displayName?: string;
  /** Output only. The CustomClass lifecycle state. This field is not used. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "DELETED" | (string & {});
  /** Output only. The time at which this resource was requested for deletion. This field is not used. */
  deleteTime?: string;
  /** Output only. The time at which this resource will be purged. This field is not used. */
  expireTime?: string;
  /** Output only. Allows users to store small amounts of arbitrary data. Both the key and the value must be 63 characters or less each. At most 100 annotations. This field is not used. */
  annotations?: Record<string, string>;
  /** Output only. This checksum is computed by the server based on the value of other fields. This may be sent on update, undelete, and delete requests to ensure the client has an up-to-date value before proceeding. This field is not used. */
  etag?: string;
  /** Output only. Whether or not this CustomClass is in the process of being updated. This field is not used. */
  reconciling?: boolean;
}

export const CustomClass: Schema.Schema<CustomClass> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      customClassId: Schema.optional(Schema.String),
      items: Schema.optional(Schema.Array(ClassItem)),
      kmsKeyName: Schema.optional(Schema.String),
      kmsKeyVersionName: Schema.optional(Schema.String),
      uid: Schema.optional(Schema.String),
      displayName: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      deleteTime: Schema.optional(Schema.String),
      expireTime: Schema.optional(Schema.String),
      annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      etag: Schema.optional(Schema.String),
      reconciling: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "CustomClass",
  }) as any as Schema.Schema<CustomClass>;

export interface CreateCustomClassRequest {
  /** Required. The ID to use for the custom class, which will become the final component of the custom class' resource name. This value should restrict to letters, numbers, and hyphens, with the first character a letter, the last a letter or a number, and be 4-63 characters. */
  customClassId?: string;
  /** Required. The custom class to create. */
  customClass?: CustomClass;
}

export const CreateCustomClassRequest: Schema.Schema<CreateCustomClassRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      customClassId: Schema.optional(Schema.String),
      customClass: Schema.optional(CustomClass),
    }),
  ).annotate({
    identifier: "CreateCustomClassRequest",
  }) as any as Schema.Schema<CreateCustomClassRequest>;

export interface ListCustomClassesResponse {
  /** The custom classes. */
  customClasses?: Array<CustomClass>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListCustomClassesResponse: Schema.Schema<ListCustomClassesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      customClasses: Schema.optional(Schema.Array(CustomClass)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListCustomClassesResponse",
  }) as any as Schema.Schema<ListCustomClassesResponse>;

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      code: Schema.optional(Schema.Number),
      message: Schema.optional(Schema.String),
      details: Schema.optional(
        Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
      ),
    }),
  ).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

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

export const Operation: Schema.Schema<Operation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      done: Schema.optional(Schema.Boolean),
      error: Schema.optional(Status),
      response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      operations: Schema.optional(Schema.Array(Operation)),
      nextPageToken: Schema.optional(Schema.String),
      unreachable: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ListOperationsResponse",
  }) as any as Schema.Schema<ListOperationsResponse>;

export interface ABNFGrammar {
  /** All declarations and rules of an ABNF grammar broken up into multiple strings that will end up concatenated. */
  abnfStrings?: Array<string>;
}

export const ABNFGrammar: Schema.Schema<ABNFGrammar> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      abnfStrings: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ABNFGrammar",
  }) as any as Schema.Schema<ABNFGrammar>;

export interface SpeechAdaptation {
  /** A collection of phrase sets. To specify the hints inline, leave the phrase set's `name` blank and fill in the rest of its fields. Any phrase set can use any custom class. */
  phraseSets?: Array<PhraseSet>;
  /** A collection of phrase set resource names to use. */
  phraseSetReferences?: Array<string>;
  /** A collection of custom classes. To specify the classes inline, leave the class' `name` blank and fill in the rest of its fields, giving it a unique `custom_class_id`. Refer to the inline defined class in phrase hints by its `custom_class_id`. */
  customClasses?: Array<CustomClass>;
  /** Augmented Backus-Naur form (ABNF) is a standardized grammar notation comprised by a set of derivation rules. See specifications: https://www.w3.org/TR/speech-grammar */
  abnfGrammar?: ABNFGrammar;
}

export const SpeechAdaptation: Schema.Schema<SpeechAdaptation> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      phraseSets: Schema.optional(Schema.Array(PhraseSet)),
      phraseSetReferences: Schema.optional(Schema.Array(Schema.String)),
      customClasses: Schema.optional(Schema.Array(CustomClass)),
      abnfGrammar: Schema.optional(ABNFGrammar),
    }),
  ).annotate({
    identifier: "SpeechAdaptation",
  }) as any as Schema.Schema<SpeechAdaptation>;

export interface Entry {
  /** What to replace. Max length is 100 characters. */
  search?: string;
  /** What to replace with. Max length is 100 characters. */
  replace?: string;
  /** Whether the search is case sensitive. */
  caseSensitive?: boolean;
}

export const Entry: Schema.Schema<Entry> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      search: Schema.optional(Schema.String),
      replace: Schema.optional(Schema.String),
      caseSensitive: Schema.optional(Schema.Boolean),
    }),
  ).annotate({ identifier: "Entry" }) as any as Schema.Schema<Entry>;

export interface TranscriptNormalization {
  /** A list of replacement entries. We will perform replacement with one entry at a time. For example, the second entry in ["cat" => "dog", "mountain cat" => "mountain dog"] will never be applied because we will always process the first entry before it. At most 100 entries. */
  entries?: Array<Entry>;
}

export const TranscriptNormalization: Schema.Schema<TranscriptNormalization> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      entries: Schema.optional(Schema.Array(Entry)),
    }),
  ).annotate({
    identifier: "TranscriptNormalization",
  }) as any as Schema.Schema<TranscriptNormalization>;

export interface SpeechContext {
  /** A list of strings containing words and phrases "hints" so that the speech recognition is more likely to recognize them. This can be used to improve the accuracy for specific words and phrases, for example, if specific commands are typically spoken by the user. This can also be used to add additional words to the vocabulary of the recognizer. See [usage limits](https://cloud.google.com/speech-to-text/quotas#content). List items can also be set to classes for groups of words that represent common concepts that occur in natural language. For example, rather than providing phrase hints for every month of the year, using the $MONTH class improves the likelihood of correctly transcribing audio that includes months. */
  phrases?: Array<string>;
  /** Hint Boost. Positive value will increase the probability that a specific phrase will be recognized over other similar sounding phrases. The higher the boost, the higher the chance of false positive recognition as well. Negative boost values would correspond to anti-biasing. Anti-biasing is not enabled, so negative boost will simply be ignored. Though `boost` can accept a wide range of positive values, most use cases are best served with values between 0 and 20. We recommend using a binary search approach to finding the optimal value for your use case. */
  boost?: number;
}

export const SpeechContext: Schema.Schema<SpeechContext> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      phrases: Schema.optional(Schema.Array(Schema.String)),
      boost: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "SpeechContext",
  }) as any as Schema.Schema<SpeechContext>;

export interface SpeakerDiarizationConfig {
  /** If 'true', enables speaker detection for each recognized word in the top alternative of the recognition result using a speaker_label provided in the WordInfo. */
  enableSpeakerDiarization?: boolean;
  /** Minimum number of speakers in the conversation. This range gives you more flexibility by allowing the system to automatically determine the correct number of speakers. If not set, the default value is 2. */
  minSpeakerCount?: number;
  /** Maximum number of speakers in the conversation. This range gives you more flexibility by allowing the system to automatically determine the correct number of speakers. If not set, the default value is 6. */
  maxSpeakerCount?: number;
  /** Output only. Unused. */
  speakerTag?: number;
}

export const SpeakerDiarizationConfig: Schema.Schema<SpeakerDiarizationConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      enableSpeakerDiarization: Schema.optional(Schema.Boolean),
      minSpeakerCount: Schema.optional(Schema.Number),
      maxSpeakerCount: Schema.optional(Schema.Number),
      speakerTag: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "SpeakerDiarizationConfig",
  }) as any as Schema.Schema<SpeakerDiarizationConfig>;

export interface RecognitionMetadata {
  /** The use case most closely describing the audio content to be recognized. */
  interactionType?:
    | "INTERACTION_TYPE_UNSPECIFIED"
    | "DISCUSSION"
    | "PRESENTATION"
    | "PHONE_CALL"
    | "VOICEMAIL"
    | "PROFESSIONALLY_PRODUCED"
    | "VOICE_SEARCH"
    | "VOICE_COMMAND"
    | "DICTATION"
    | (string & {});
  /** The industry vertical to which this speech recognition request most closely applies. This is most indicative of the topics contained in the audio. Use the 6-digit NAICS code to identify the industry vertical - see https://www.naics.com/search/. */
  industryNaicsCodeOfAudio?: number;
  /** The audio type that most closely describes the audio being recognized. */
  microphoneDistance?:
    | "MICROPHONE_DISTANCE_UNSPECIFIED"
    | "NEARFIELD"
    | "MIDFIELD"
    | "FARFIELD"
    | (string & {});
  /** The original media the speech was recorded on. */
  originalMediaType?:
    | "ORIGINAL_MEDIA_TYPE_UNSPECIFIED"
    | "AUDIO"
    | "VIDEO"
    | (string & {});
  /** The type of device the speech was recorded with. */
  recordingDeviceType?:
    | "RECORDING_DEVICE_TYPE_UNSPECIFIED"
    | "SMARTPHONE"
    | "PC"
    | "PHONE_LINE"
    | "VEHICLE"
    | "OTHER_OUTDOOR_DEVICE"
    | "OTHER_INDOOR_DEVICE"
    | (string & {});
  /** The device used to make the recording. Examples 'Nexus 5X' or 'Polycom SoundStation IP 6000' or 'POTS' or 'VoIP' or 'Cardioid Microphone'. */
  recordingDeviceName?: string;
  /** Mime type of the original audio file. For example `audio/m4a`, `audio/x-alaw-basic`, `audio/mp3`, `audio/3gpp`. A list of possible audio mime types is maintained at http://www.iana.org/assignments/media-types/media-types.xhtml#audio */
  originalMimeType?: string;
  /** Description of the content. Eg. "Recordings of federal supreme court hearings from 2012". */
  audioTopic?: string;
}

export const RecognitionMetadata: Schema.Schema<RecognitionMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      interactionType: Schema.optional(Schema.String),
      industryNaicsCodeOfAudio: Schema.optional(Schema.Number),
      microphoneDistance: Schema.optional(Schema.String),
      originalMediaType: Schema.optional(Schema.String),
      recordingDeviceType: Schema.optional(Schema.String),
      recordingDeviceName: Schema.optional(Schema.String),
      originalMimeType: Schema.optional(Schema.String),
      audioTopic: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RecognitionMetadata",
  }) as any as Schema.Schema<RecognitionMetadata>;

export interface RecognitionConfig {
  /** Encoding of audio data sent in all `RecognitionAudio` messages. This field is optional for `FLAC` and `WAV` audio files and required for all other audio formats. For details, see AudioEncoding. */
  encoding?:
    | "ENCODING_UNSPECIFIED"
    | "LINEAR16"
    | "FLAC"
    | "MULAW"
    | "AMR"
    | "AMR_WB"
    | "OGG_OPUS"
    | "SPEEX_WITH_HEADER_BYTE"
    | "MP3"
    | "WEBM_OPUS"
    | "ALAW"
    | (string & {});
  /** Sample rate in Hertz of the audio data sent in all `RecognitionAudio` messages. Valid values are: 8000-48000. 16000 is optimal. For best results, set the sampling rate of the audio source to 16000 Hz. If that's not possible, use the native sample rate of the audio source (instead of re-sampling). This field is optional for FLAC and WAV audio files, but is required for all other audio formats. For details, see AudioEncoding. */
  sampleRateHertz?: number;
  /** The number of channels in the input audio data. ONLY set this for MULTI-CHANNEL recognition. Valid values for LINEAR16, OGG_OPUS and FLAC are `1`-`8`. Valid value for MULAW, AMR, AMR_WB and SPEEX_WITH_HEADER_BYTE is only `1`. If `0` or omitted, defaults to one channel (mono). Note: We only recognize the first channel by default. To perform independent recognition on each channel set `enable_separate_recognition_per_channel` to 'true'. */
  audioChannelCount?: number;
  /** This needs to be set to `true` explicitly and `audio_channel_count` > 1 to get each channel recognized separately. The recognition result will contain a `channel_tag` field to state which channel that result belongs to. If this is not true, we will only recognize the first channel. The request is billed cumulatively for all channels recognized: `audio_channel_count` multiplied by the length of the audio. */
  enableSeparateRecognitionPerChannel?: boolean;
  /** Required. The language of the supplied audio as a [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) language tag. Example: "en-US". See [Language Support](https://cloud.google.com/speech-to-text/docs/languages) for a list of the currently supported language codes. */
  languageCode?: string;
  /** A list of up to 3 additional [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) language tags, listing possible alternative languages of the supplied audio. See [Language Support](https://cloud.google.com/speech-to-text/docs/languages) for a list of the currently supported language codes. If alternative languages are listed, recognition result will contain recognition in the most likely language detected including the main language_code. The recognition result will include the language tag of the language detected in the audio. Note: This feature is only supported for Voice Command and Voice Search use cases and performance may vary for other use cases (e.g., phone call transcription). */
  alternativeLanguageCodes?: Array<string>;
  /** Maximum number of recognition hypotheses to be returned. Specifically, the maximum number of `SpeechRecognitionAlternative` messages within each `SpeechRecognitionResult`. The server may return fewer than `max_alternatives`. Valid values are `0`-`30`. A value of `0` or `1` will return a maximum of one. If omitted, will return a maximum of one. */
  maxAlternatives?: number;
  /** If set to `true`, the server will attempt to filter out profanities, replacing all but the initial character in each filtered word with asterisks, e.g. "f***". If set to `false` or omitted, profanities won't be filtered out. */
  profanityFilter?: boolean;
  /** Speech adaptation configuration improves the accuracy of speech recognition. For more information, see the [speech adaptation](https://cloud.google.com/speech-to-text/docs/adaptation) documentation. When speech adaptation is set it supersedes the `speech_contexts` field. */
  adaptation?: SpeechAdaptation;
  /** Optional. Use transcription normalization to automatically replace parts of the transcript with phrases of your choosing. For StreamingRecognize, this normalization only applies to stable partial transcripts (stability > 0.8) and final transcripts. */
  transcriptNormalization?: TranscriptNormalization;
  /** Array of SpeechContext. A means to provide context to assist the speech recognition. For more information, see [speech adaptation](https://cloud.google.com/speech-to-text/docs/adaptation). */
  speechContexts?: Array<SpeechContext>;
  /** If `true`, the top result includes a list of words and the start and end time offsets (timestamps) for those words. If `false`, no word-level time offset information is returned. The default is `false`. */
  enableWordTimeOffsets?: boolean;
  /** If `true`, the top result includes a list of words and the confidence for those words. If `false`, no word-level confidence information is returned. The default is `false`. */
  enableWordConfidence?: boolean;
  /** If 'true', adds punctuation to recognition result hypotheses. This feature is only available in select languages. Setting this for requests in other languages has no effect at all. The default 'false' value does not add punctuation to result hypotheses. */
  enableAutomaticPunctuation?: boolean;
  /** The spoken punctuation behavior for the call If not set, uses default behavior based on model of choice e.g. command_and_search will enable spoken punctuation by default If 'true', replaces spoken punctuation with the corresponding symbols in the request. For example, "how are you question mark" becomes "how are you?". See https://cloud.google.com/speech-to-text/docs/spoken-punctuation for support. If 'false', spoken punctuation is not replaced. */
  enableSpokenPunctuation?: boolean;
  /** The spoken emoji behavior for the call If not set, uses default behavior based on model of choice If 'true', adds spoken emoji formatting for the request. This will replace spoken emojis with the corresponding Unicode symbols in the final transcript. If 'false', spoken emojis are not replaced. */
  enableSpokenEmojis?: boolean;
  /** Config to enable speaker diarization and set additional parameters to make diarization better suited for your application. Note: When this is enabled, we send all the words from the beginning of the audio for the top alternative in every consecutive STREAMING responses. This is done in order to improve our speaker tags as our models learn to identify the speakers in the conversation over time. For non-streaming requests, the diarization results will be provided only in the top alternative of the FINAL SpeechRecognitionResult. */
  diarizationConfig?: SpeakerDiarizationConfig;
  /** Metadata regarding this request. */
  metadata?: RecognitionMetadata;
  /** Which model to select for the given request. Select the model best suited to your domain to get best results. If a model is not explicitly specified, then we auto-select a model based on the parameters in the RecognitionConfig. *Model* *Description* latest_long Best for long form content like media or conversation. latest_short Best for short form content like commands or single shot directed speech. command_and_search Best for short queries such as voice commands or voice search. phone_call Best for audio that originated from a phone call (typically recorded at an 8khz sampling rate). video Best for audio that originated from video or includes multiple speakers. Ideally the audio is recorded at a 16khz or greater sampling rate. This is a premium model that costs more than the standard rate. default Best for audio that is not one of the specific audio models. For example, long-form audio. Ideally the audio is high-fidelity, recorded at a 16khz or greater sampling rate. medical_conversation Best for audio that originated from a conversation between a medical provider and patient. medical_dictation Best for audio that originated from dictation notes by a medical provider. */
  model?: string;
  /** Set to true to use an enhanced model for speech recognition. If `use_enhanced` is set to true and the `model` field is not set, then an appropriate enhanced model is chosen if an enhanced model exists for the audio. If `use_enhanced` is true and an enhanced version of the specified model does not exist, then the speech is recognized using the standard version of the specified model. */
  useEnhanced?: boolean;
}

export const RecognitionConfig: Schema.Schema<RecognitionConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      encoding: Schema.optional(Schema.String),
      sampleRateHertz: Schema.optional(Schema.Number),
      audioChannelCount: Schema.optional(Schema.Number),
      enableSeparateRecognitionPerChannel: Schema.optional(Schema.Boolean),
      languageCode: Schema.optional(Schema.String),
      alternativeLanguageCodes: Schema.optional(Schema.Array(Schema.String)),
      maxAlternatives: Schema.optional(Schema.Number),
      profanityFilter: Schema.optional(Schema.Boolean),
      adaptation: Schema.optional(SpeechAdaptation),
      transcriptNormalization: Schema.optional(TranscriptNormalization),
      speechContexts: Schema.optional(Schema.Array(SpeechContext)),
      enableWordTimeOffsets: Schema.optional(Schema.Boolean),
      enableWordConfidence: Schema.optional(Schema.Boolean),
      enableAutomaticPunctuation: Schema.optional(Schema.Boolean),
      enableSpokenPunctuation: Schema.optional(Schema.Boolean),
      enableSpokenEmojis: Schema.optional(Schema.Boolean),
      diarizationConfig: Schema.optional(SpeakerDiarizationConfig),
      metadata: Schema.optional(RecognitionMetadata),
      model: Schema.optional(Schema.String),
      useEnhanced: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "RecognitionConfig",
  }) as any as Schema.Schema<RecognitionConfig>;

export interface RecognitionAudio {
  /** The audio data bytes encoded as specified in `RecognitionConfig`. Note: as with all bytes fields, proto buffers use a pure binary representation, whereas JSON representations use base64. */
  content?: string;
  /** URI that points to a file that contains audio data bytes as specified in `RecognitionConfig`. The file must not be compressed (for example, gzip). Currently, only Google Cloud Storage URIs are supported, which must be specified in the following format: `gs://bucket_name/object_name` (other URI formats return google.rpc.Code.INVALID_ARGUMENT). For more information, see [Request URIs](https://cloud.google.com/storage/docs/reference-uris). */
  uri?: string;
}

export const RecognitionAudio: Schema.Schema<RecognitionAudio> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      content: Schema.optional(Schema.String),
      uri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RecognitionAudio",
  }) as any as Schema.Schema<RecognitionAudio>;

export interface RecognizeRequest {
  /** Required. Provides information to the recognizer that specifies how to process the request. */
  config?: RecognitionConfig;
  /** Required. The audio data to be recognized. */
  audio?: RecognitionAudio;
}

export const RecognizeRequest: Schema.Schema<RecognizeRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      config: Schema.optional(RecognitionConfig),
      audio: Schema.optional(RecognitionAudio),
    }),
  ).annotate({
    identifier: "RecognizeRequest",
  }) as any as Schema.Schema<RecognizeRequest>;

export interface WordInfo {
  /** Time offset relative to the beginning of the audio, and corresponding to the start of the spoken word. This field is only set if `enable_word_time_offsets=true` and only in the top hypothesis. This is an experimental feature and the accuracy of the time offset can vary. */
  startTime?: string;
  /** Time offset relative to the beginning of the audio, and corresponding to the end of the spoken word. This field is only set if `enable_word_time_offsets=true` and only in the top hypothesis. This is an experimental feature and the accuracy of the time offset can vary. */
  endTime?: string;
  /** The word corresponding to this set of information. */
  word?: string;
  /** The confidence estimate between 0.0 and 1.0. A higher number indicates an estimated greater likelihood that the recognized words are correct. This field is set only for the top alternative of a non-streaming result or, of a streaming result where `is_final=true`. This field is not guaranteed to be accurate and users should not rely on it to be always provided. The default of 0.0 is a sentinel value indicating `confidence` was not set. */
  confidence?: number;
  /** Output only. A distinct integer value is assigned for every speaker within the audio. This field specifies which one of those speakers was detected to have spoken this word. Value ranges from '1' to diarization_speaker_count. speaker_tag is set if enable_speaker_diarization = 'true' and only for the top alternative. Note: Use speaker_label instead. */
  speakerTag?: number;
  /** Output only. A label value assigned for every unique speaker within the audio. This field specifies which speaker was detected to have spoken this word. For some models, like medical_conversation this can be actual speaker role, for example "patient" or "provider", but generally this would be a number identifying a speaker. This field is only set if enable_speaker_diarization = 'true' and only for the top alternative. */
  speakerLabel?: string;
}

export const WordInfo: Schema.Schema<WordInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      word: Schema.optional(Schema.String),
      confidence: Schema.optional(Schema.Number),
      speakerTag: Schema.optional(Schema.Number),
      speakerLabel: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "WordInfo" }) as any as Schema.Schema<WordInfo>;

export interface SpeechRecognitionAlternative {
  /** Transcript text representing the words that the user spoke. In languages that use spaces to separate words, the transcript might have a leading space if it isn't the first result. You can concatenate each result to obtain the full transcript without using a separator. */
  transcript?: string;
  /** The confidence estimate between 0.0 and 1.0. A higher number indicates an estimated greater likelihood that the recognized words are correct. This field is set only for the top alternative of a non-streaming result or, of a streaming result where `is_final=true`. This field is not guaranteed to be accurate and users should not rely on it to be always provided. The default of 0.0 is a sentinel value indicating `confidence` was not set. */
  confidence?: number;
  /** A list of word-specific information for each recognized word. Note: When `enable_speaker_diarization` is true, you will see all the words from the beginning of the audio. */
  words?: Array<WordInfo>;
}

export const SpeechRecognitionAlternative: Schema.Schema<SpeechRecognitionAlternative> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      transcript: Schema.optional(Schema.String),
      confidence: Schema.optional(Schema.Number),
      words: Schema.optional(Schema.Array(WordInfo)),
    }),
  ).annotate({
    identifier: "SpeechRecognitionAlternative",
  }) as any as Schema.Schema<SpeechRecognitionAlternative>;

export interface SpeechRecognitionResult {
  /** May contain one or more recognition hypotheses (up to the maximum specified in `max_alternatives`). These alternatives are ordered in terms of accuracy, with the top (first) alternative being the most probable, as ranked by the recognizer. */
  alternatives?: Array<SpeechRecognitionAlternative>;
  /** For multi-channel audio, this is the channel number corresponding to the recognized result for the audio from that channel. For audio_channel_count = N, its output values can range from '1' to 'N'. */
  channelTag?: number;
  /** Time offset of the end of this result relative to the beginning of the audio. */
  resultEndTime?: string;
  /** Output only. The [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) language tag of the language in this result. This language code was detected to have the most likelihood of being spoken in the audio. */
  languageCode?: string;
}

export const SpeechRecognitionResult: Schema.Schema<SpeechRecognitionResult> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      alternatives: Schema.optional(Schema.Array(SpeechRecognitionAlternative)),
      channelTag: Schema.optional(Schema.Number),
      resultEndTime: Schema.optional(Schema.String),
      languageCode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SpeechRecognitionResult",
  }) as any as Schema.Schema<SpeechRecognitionResult>;

export interface SpeechAdaptationInfo {
  /** Whether there was a timeout when applying speech adaptation. If true, adaptation had no effect in the response transcript. */
  adaptationTimeout?: boolean;
  /** If set, returns a message specifying which part of the speech adaptation request timed out. */
  timeoutMessage?: string;
}

export const SpeechAdaptationInfo: Schema.Schema<SpeechAdaptationInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      adaptationTimeout: Schema.optional(Schema.Boolean),
      timeoutMessage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SpeechAdaptationInfo",
  }) as any as Schema.Schema<SpeechAdaptationInfo>;

export interface RecognizeResponse {
  /** Sequential list of transcription results corresponding to sequential portions of audio. */
  results?: Array<SpeechRecognitionResult>;
  /** When available, billed audio seconds for the corresponding request. */
  totalBilledTime?: string;
  /** Provides information on adaptation behavior in response */
  speechAdaptationInfo?: SpeechAdaptationInfo;
  /** The ID associated with the request. This is a unique ID specific only to the given request. */
  requestId?: string;
  /** Whether request used legacy asr models (was not automatically migrated to use conformer models). */
  usingLegacyModels?: boolean;
}

export const RecognizeResponse: Schema.Schema<RecognizeResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      results: Schema.optional(Schema.Array(SpeechRecognitionResult)),
      totalBilledTime: Schema.optional(Schema.String),
      speechAdaptationInfo: Schema.optional(SpeechAdaptationInfo),
      requestId: Schema.optional(Schema.String),
      usingLegacyModels: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "RecognizeResponse",
  }) as any as Schema.Schema<RecognizeResponse>;

export interface TranscriptOutputConfig {
  /** Specifies a Cloud Storage URI for the recognition results. Must be specified in the format: `gs://bucket_name/object_name`, and the bucket must already exist. */
  gcsUri?: string;
}

export const TranscriptOutputConfig: Schema.Schema<TranscriptOutputConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      gcsUri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "TranscriptOutputConfig",
  }) as any as Schema.Schema<TranscriptOutputConfig>;

export interface LongRunningRecognizeRequest {
  /** Required. Provides information to the recognizer that specifies how to process the request. */
  config?: RecognitionConfig;
  /** Required. The audio data to be recognized. */
  audio?: RecognitionAudio;
  /** Optional. Specifies an optional destination for the recognition results. */
  outputConfig?: TranscriptOutputConfig;
}

export const LongRunningRecognizeRequest: Schema.Schema<LongRunningRecognizeRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      config: Schema.optional(RecognitionConfig),
      audio: Schema.optional(RecognitionAudio),
      outputConfig: Schema.optional(TranscriptOutputConfig),
    }),
  ).annotate({
    identifier: "LongRunningRecognizeRequest",
  }) as any as Schema.Schema<LongRunningRecognizeRequest>;

export interface LongRunningRecognizeMetadata {
  /** Approximate percentage of audio processed thus far. Guaranteed to be 100 when the audio is fully processed and the results are available. */
  progressPercent?: number;
  /** Time when the request was received. */
  startTime?: string;
  /** Time of the most recent processing update. */
  lastUpdateTime?: string;
  /** Output only. The URI of the audio file being transcribed. Empty if the audio was sent as byte content. */
  uri?: string;
}

export const LongRunningRecognizeMetadata: Schema.Schema<LongRunningRecognizeMetadata> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      progressPercent: Schema.optional(Schema.Number),
      startTime: Schema.optional(Schema.String),
      lastUpdateTime: Schema.optional(Schema.String),
      uri: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LongRunningRecognizeMetadata",
  }) as any as Schema.Schema<LongRunningRecognizeMetadata>;

export interface LongRunningRecognizeResponse {
  /** Sequential list of transcription results corresponding to sequential portions of audio. */
  results?: Array<SpeechRecognitionResult>;
  /** When available, billed audio seconds for the corresponding request. */
  totalBilledTime?: string;
  /** Original output config if present in the request. */
  outputConfig?: TranscriptOutputConfig;
  /** If the transcript output fails this field contains the relevant error. */
  outputError?: Status;
  /** Provides information on speech adaptation behavior in response */
  speechAdaptationInfo?: SpeechAdaptationInfo;
  /** The ID associated with the request. This is a unique ID specific only to the given request. */
  requestId?: string;
}

export const LongRunningRecognizeResponse: Schema.Schema<LongRunningRecognizeResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      results: Schema.optional(Schema.Array(SpeechRecognitionResult)),
      totalBilledTime: Schema.optional(Schema.String),
      outputConfig: Schema.optional(TranscriptOutputConfig),
      outputError: Schema.optional(Status),
      speechAdaptationInfo: Schema.optional(SpeechAdaptationInfo),
      requestId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LongRunningRecognizeResponse",
  }) as any as Schema.Schema<LongRunningRecognizeResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface CreateProjectsLocationsPhraseSetsRequest {
  /** Required. The parent resource where this phrase set will be created. Format: `projects/{project}/locations/{location}` Speech-to-Text supports three locations: `global`, `us` (US North America), and `eu` (Europe). If you are calling the `speech.googleapis.com` endpoint, use the `global` location. To specify a region, use a [regional endpoint](https://cloud.google.com/speech-to-text/docs/endpoints) with matching `us` or `eu` location value. */
  parent: string;
  /** Request body */
  body?: CreatePhraseSetRequest;
}

export const CreateProjectsLocationsPhraseSetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(CreatePhraseSetRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/phraseSets",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsPhraseSetsRequest>;

export type CreateProjectsLocationsPhraseSetsResponse = PhraseSet;
export const CreateProjectsLocationsPhraseSetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ PhraseSet;

export type CreateProjectsLocationsPhraseSetsError = DefaultErrors;

/** Create a set of phrase hints. Each item in the set can be a single word or a multi-word phrase. The items in the PhraseSet are favored by the recognition model when you send a call that includes the PhraseSet. */
export const createProjectsLocationsPhraseSets: API.OperationMethod<
  CreateProjectsLocationsPhraseSetsRequest,
  CreateProjectsLocationsPhraseSetsResponse,
  CreateProjectsLocationsPhraseSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsPhraseSetsRequest,
  output: CreateProjectsLocationsPhraseSetsResponse,
  errors: [],
}));

export interface GetProjectsLocationsPhraseSetsRequest {
  /** Required. The name of the phrase set to retrieve. Format: `projects/{project}/locations/{location}/phraseSets/{phrase_set}` Speech-to-Text supports three locations: `global`, `us` (US North America), and `eu` (Europe). If you are calling the `speech.googleapis.com` endpoint, use the `global` location. To specify a region, use a [regional endpoint](https://cloud.google.com/speech-to-text/docs/endpoints) with matching `us` or `eu` location value. */
  name: string;
}

export const GetProjectsLocationsPhraseSetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/phraseSets/{phraseSetsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsPhraseSetsRequest>;

export type GetProjectsLocationsPhraseSetsResponse = PhraseSet;
export const GetProjectsLocationsPhraseSetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ PhraseSet;

export type GetProjectsLocationsPhraseSetsError = DefaultErrors;

/** Get a phrase set. */
export const getProjectsLocationsPhraseSets: API.OperationMethod<
  GetProjectsLocationsPhraseSetsRequest,
  GetProjectsLocationsPhraseSetsResponse,
  GetProjectsLocationsPhraseSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsPhraseSetsRequest,
  output: GetProjectsLocationsPhraseSetsResponse,
  errors: [],
}));

export interface ListProjectsLocationsPhraseSetsRequest {
  /** Required. The parent, which owns this collection of phrase set. Format: `projects/{project}/locations/{location}` Speech-to-Text supports three locations: `global`, `us` (US North America), and `eu` (Europe). If you are calling the `speech.googleapis.com` endpoint, use the `global` location. To specify a region, use a [regional endpoint](https://cloud.google.com/speech-to-text/docs/endpoints) with matching `us` or `eu` location value. */
  parent: string;
  /** The maximum number of phrase sets to return. The service may return fewer than this value. If unspecified, at most 50 phrase sets will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListPhraseSet` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListPhraseSet` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsPhraseSetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/phraseSets",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsPhraseSetsRequest>;

export type ListProjectsLocationsPhraseSetsResponse = ListPhraseSetResponse;
export const ListProjectsLocationsPhraseSetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListPhraseSetResponse;

export type ListProjectsLocationsPhraseSetsError = DefaultErrors;

/** List phrase sets. */
export const listProjectsLocationsPhraseSets: API.PaginatedOperationMethod<
  ListProjectsLocationsPhraseSetsRequest,
  ListProjectsLocationsPhraseSetsResponse,
  ListProjectsLocationsPhraseSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsPhraseSetsRequest,
  output: ListProjectsLocationsPhraseSetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsLocationsPhraseSetsRequest {
  /** The resource name of the phrase set. */
  name: string;
  /** The list of fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: PhraseSet;
}

export const PatchProjectsLocationsPhraseSetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(PhraseSet).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/phraseSets/{phraseSetsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsPhraseSetsRequest>;

export type PatchProjectsLocationsPhraseSetsResponse = PhraseSet;
export const PatchProjectsLocationsPhraseSetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ PhraseSet;

export type PatchProjectsLocationsPhraseSetsError = DefaultErrors;

/** Update a phrase set. */
export const patchProjectsLocationsPhraseSets: API.OperationMethod<
  PatchProjectsLocationsPhraseSetsRequest,
  PatchProjectsLocationsPhraseSetsResponse,
  PatchProjectsLocationsPhraseSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsPhraseSetsRequest,
  output: PatchProjectsLocationsPhraseSetsResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsPhraseSetsRequest {
  /** Required. The name of the phrase set to delete. Format: `projects/{project}/locations/{location}/phraseSets/{phrase_set}` */
  name: string;
}

export const DeleteProjectsLocationsPhraseSetsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/phraseSets/{phraseSetsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsPhraseSetsRequest>;

export type DeleteProjectsLocationsPhraseSetsResponse = Empty;
export const DeleteProjectsLocationsPhraseSetsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsLocationsPhraseSetsError = DefaultErrors;

/** Delete a phrase set. */
export const deleteProjectsLocationsPhraseSets: API.OperationMethod<
  DeleteProjectsLocationsPhraseSetsRequest,
  DeleteProjectsLocationsPhraseSetsResponse,
  DeleteProjectsLocationsPhraseSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsPhraseSetsRequest,
  output: DeleteProjectsLocationsPhraseSetsResponse,
  errors: [],
}));

export interface CreateProjectsLocationsCustomClassesRequest {
  /** Required. The parent resource where this custom class will be created. Format: `projects/{project}/locations/{location}/customClasses` Speech-to-Text supports three locations: `global`, `us` (US North America), and `eu` (Europe). If you are calling the `speech.googleapis.com` endpoint, use the `global` location. To specify a region, use a [regional endpoint](https://cloud.google.com/speech-to-text/docs/endpoints) with matching `us` or `eu` location value. */
  parent: string;
  /** Request body */
  body?: CreateCustomClassRequest;
}

export const CreateProjectsLocationsCustomClassesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(CreateCustomClassRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/projects/{projectsId}/locations/{locationsId}/customClasses",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsLocationsCustomClassesRequest>;

export type CreateProjectsLocationsCustomClassesResponse = CustomClass;
export const CreateProjectsLocationsCustomClassesResponse =
  /*@__PURE__*/ /*#__PURE__*/ CustomClass;

export type CreateProjectsLocationsCustomClassesError = DefaultErrors;

/** Create a custom class. */
export const createProjectsLocationsCustomClasses: API.OperationMethod<
  CreateProjectsLocationsCustomClassesRequest,
  CreateProjectsLocationsCustomClassesResponse,
  CreateProjectsLocationsCustomClassesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsLocationsCustomClassesRequest,
  output: CreateProjectsLocationsCustomClassesResponse,
  errors: [],
}));

export interface GetProjectsLocationsCustomClassesRequest {
  /** Required. The name of the custom class to retrieve. Format: `projects/{project}/locations/{location}/customClasses/{custom_class}` */
  name: string;
}

export const GetProjectsLocationsCustomClassesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/customClasses/{customClassesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsLocationsCustomClassesRequest>;

export type GetProjectsLocationsCustomClassesResponse = CustomClass;
export const GetProjectsLocationsCustomClassesResponse =
  /*@__PURE__*/ /*#__PURE__*/ CustomClass;

export type GetProjectsLocationsCustomClassesError = DefaultErrors;

/** Get a custom class. */
export const getProjectsLocationsCustomClasses: API.OperationMethod<
  GetProjectsLocationsCustomClassesRequest,
  GetProjectsLocationsCustomClassesResponse,
  GetProjectsLocationsCustomClassesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsLocationsCustomClassesRequest,
  output: GetProjectsLocationsCustomClassesResponse,
  errors: [],
}));

export interface ListProjectsLocationsCustomClassesRequest {
  /** Required. The parent, which owns this collection of custom classes. Format: `projects/{project}/locations/{location}/customClasses` Speech-to-Text supports three locations: `global`, `us` (US North America), and `eu` (Europe). If you are calling the `speech.googleapis.com` endpoint, use the `global` location. To specify a region, use a [regional endpoint](https://cloud.google.com/speech-to-text/docs/endpoints) with matching `us` or `eu` location value. */
  parent: string;
  /** The maximum number of custom classes to return. The service may return fewer than this value. If unspecified, at most 50 custom classes will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** A page token, received from a previous `ListCustomClass` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListCustomClass` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsCustomClassesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1/projects/{projectsId}/locations/{locationsId}/customClasses",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsLocationsCustomClassesRequest>;

export type ListProjectsLocationsCustomClassesResponse =
  ListCustomClassesResponse;
export const ListProjectsLocationsCustomClassesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListCustomClassesResponse;

export type ListProjectsLocationsCustomClassesError = DefaultErrors;

/** List custom classes. */
export const listProjectsLocationsCustomClasses: API.PaginatedOperationMethod<
  ListProjectsLocationsCustomClassesRequest,
  ListProjectsLocationsCustomClassesResponse,
  ListProjectsLocationsCustomClassesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsLocationsCustomClassesRequest,
  output: ListProjectsLocationsCustomClassesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsLocationsCustomClassesRequest {
  /** The resource name of the custom class. */
  name: string;
  /** The list of fields to be updated. */
  updateMask?: string;
  /** Request body */
  body?: CustomClass;
}

export const PatchProjectsLocationsCustomClassesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(CustomClass).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1/projects/{projectsId}/locations/{locationsId}/customClasses/{customClassesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchProjectsLocationsCustomClassesRequest>;

export type PatchProjectsLocationsCustomClassesResponse = CustomClass;
export const PatchProjectsLocationsCustomClassesResponse =
  /*@__PURE__*/ /*#__PURE__*/ CustomClass;

export type PatchProjectsLocationsCustomClassesError = DefaultErrors;

/** Update a custom class. */
export const patchProjectsLocationsCustomClasses: API.OperationMethod<
  PatchProjectsLocationsCustomClassesRequest,
  PatchProjectsLocationsCustomClassesResponse,
  PatchProjectsLocationsCustomClassesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchProjectsLocationsCustomClassesRequest,
  output: PatchProjectsLocationsCustomClassesResponse,
  errors: [],
}));

export interface DeleteProjectsLocationsCustomClassesRequest {
  /** Required. The name of the custom class to delete. Format: `projects/{project}/locations/{location}/customClasses/{custom_class}` Speech-to-Text supports three locations: `global`, `us` (US North America), and `eu` (Europe). If you are calling the `speech.googleapis.com` endpoint, use the `global` location. To specify a region, use a [regional endpoint](https://cloud.google.com/speech-to-text/docs/endpoints) with matching `us` or `eu` location value. */
  name: string;
}

export const DeleteProjectsLocationsCustomClassesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1/projects/{projectsId}/locations/{locationsId}/customClasses/{customClassesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsLocationsCustomClassesRequest>;

export type DeleteProjectsLocationsCustomClassesResponse = Empty;
export const DeleteProjectsLocationsCustomClassesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsLocationsCustomClassesError = DefaultErrors;

/** Delete a custom class. */
export const deleteProjectsLocationsCustomClasses: API.OperationMethod<
  DeleteProjectsLocationsCustomClassesRequest,
  DeleteProjectsLocationsCustomClassesResponse,
  DeleteProjectsLocationsCustomClassesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsLocationsCustomClassesRequest,
  output: DeleteProjectsLocationsCustomClassesResponse,
  errors: [],
}));

export interface ListOperationsRequest {
  /** The name of the operation's parent resource. */
  name?: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListOperationsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.optional(Schema.String).pipe(T.HttpQuery("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("returnPartialSuccess"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "v1/operations" }),
  svc,
) as unknown as Schema.Schema<ListOperationsRequest>;

export type ListOperationsResponse_Op = ListOperationsResponse;
export const ListOperationsResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ ListOperationsResponse;

export type ListOperationsError = DefaultErrors;

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export const listOperations: API.PaginatedOperationMethod<
  ListOperationsRequest,
  ListOperationsResponse_Op,
  ListOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListOperationsRequest,
  output: ListOperationsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOperationsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOperationsRequest>;

export type GetOperationsResponse = Operation;
export const GetOperationsResponse = /*@__PURE__*/ /*#__PURE__*/ Operation;

export type GetOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getOperations: API.OperationMethod<
  GetOperationsRequest,
  GetOperationsResponse,
  GetOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetOperationsRequest,
  output: GetOperationsResponse,
  errors: [],
}));

export interface RecognizeSpeechRequest {
  /** Request body */
  body?: RecognizeRequest;
}

export const RecognizeSpeechRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    body: Schema.optional(RecognizeRequest).pipe(T.HttpBody()),
  },
).pipe(
  T.Http({ method: "POST", path: "v1/speech:recognize", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RecognizeSpeechRequest>;

export type RecognizeSpeechResponse = RecognizeResponse;
export const RecognizeSpeechResponse =
  /*@__PURE__*/ /*#__PURE__*/ RecognizeResponse;

export type RecognizeSpeechError = DefaultErrors;

/** Performs synchronous speech recognition: receive results after all audio has been sent and processed. */
export const recognizeSpeech: API.OperationMethod<
  RecognizeSpeechRequest,
  RecognizeSpeechResponse,
  RecognizeSpeechError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RecognizeSpeechRequest,
  output: RecognizeSpeechResponse,
  errors: [],
}));

export interface LongrunningrecognizeSpeechRequest {
  /** Request body */
  body?: LongRunningRecognizeRequest;
}

export const LongrunningrecognizeSpeechRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(LongRunningRecognizeRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1/speech:longrunningrecognize",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<LongrunningrecognizeSpeechRequest>;

export type LongrunningrecognizeSpeechResponse = Operation;
export const LongrunningrecognizeSpeechResponse =
  /*@__PURE__*/ /*#__PURE__*/ Operation;

export type LongrunningrecognizeSpeechError = DefaultErrors;

/** Performs asynchronous speech recognition: receive results via the google.longrunning.Operations interface. Returns either an `Operation.error` or an `Operation.response` which contains a `LongRunningRecognizeResponse` message. For more information on asynchronous speech recognition, see the [how-to](https://cloud.google.com/speech-to-text/docs/async-recognize). */
export const longrunningrecognizeSpeech: API.OperationMethod<
  LongrunningrecognizeSpeechRequest,
  LongrunningrecognizeSpeechResponse,
  LongrunningrecognizeSpeechError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: LongrunningrecognizeSpeechRequest,
  output: LongrunningrecognizeSpeechResponse,
  errors: [],
}));
