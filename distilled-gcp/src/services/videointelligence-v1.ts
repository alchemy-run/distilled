// ==========================================================================
// Cloud Video Intelligence API (videointelligence v1)
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
  name: "videointelligence",
  version: "v1",
  rootUrl: "https://videointelligence.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleRpc_Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const GoogleRpc_Status: Schema.Schema<GoogleRpc_Status> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "GoogleRpc_Status" }) as any as Schema.Schema<GoogleRpc_Status>;

export interface GoogleLongrunning_Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: GoogleRpc_Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const GoogleLongrunning_Operation: Schema.Schema<GoogleLongrunning_Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(GoogleRpc_Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleLongrunning_Operation" }) as any as Schema.Schema<GoogleLongrunning_Operation>;

export interface GoogleLongrunning_ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<GoogleLongrunning_Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const GoogleLongrunning_ListOperationsResponse: Schema.Schema<GoogleLongrunning_ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(GoogleLongrunning_Operation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleLongrunning_ListOperationsResponse" }) as any as Schema.Schema<GoogleLongrunning_ListOperationsResponse>;

export interface GoogleProtobuf_Empty {
}

export const GoogleProtobuf_Empty: Schema.Schema<GoogleProtobuf_Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleProtobuf_Empty" }) as any as Schema.Schema<GoogleProtobuf_Empty>;

export interface GoogleLongrunning_CancelOperationRequest {
}

export const GoogleLongrunning_CancelOperationRequest: Schema.Schema<GoogleLongrunning_CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleLongrunning_CancelOperationRequest" }) as any as Schema.Schema<GoogleLongrunning_CancelOperationRequest>;

export interface GoogleCloudVideointelligenceV1_VideoSegment {
  /** Time-offset, relative to the beginning of the video, corresponding to the start of the segment (inclusive). */
  startTimeOffset?: string;
  /** Time-offset, relative to the beginning of the video, corresponding to the end of the segment (inclusive). */
  endTimeOffset?: string;
}

export const GoogleCloudVideointelligenceV1_VideoSegment: Schema.Schema<GoogleCloudVideointelligenceV1_VideoSegment> = Schema.suspend(() => Schema.Struct({
  startTimeOffset: Schema.optional(Schema.String),
  endTimeOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_VideoSegment" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_VideoSegment>;

export interface GoogleCloudVideointelligenceV1_LabelDetectionConfig {
  /** What labels should be detected with LABEL_DETECTION, in addition to video-level labels or segment-level labels. If unspecified, defaults to `SHOT_MODE`. */
  labelDetectionMode?: "LABEL_DETECTION_MODE_UNSPECIFIED" | "SHOT_MODE" | "FRAME_MODE" | "SHOT_AND_FRAME_MODE" | (string & {});
  /** Whether the video has been shot from a stationary (i.e., non-moving) camera. When set to true, might improve detection accuracy for moving objects. Should be used with `SHOT_AND_FRAME_MODE` enabled. */
  stationaryCamera?: boolean;
  /** Model to use for label detection. Supported values: "builtin/stable" (the default if unset) and "builtin/latest". */
  model?: string;
  /** The confidence threshold we perform filtering on the labels from frame-level detection. If not set, it is set to 0.4 by default. The valid range for this threshold is [0.1, 0.9]. Any value set outside of this range will be clipped. Note: For best results, follow the default threshold. We will update the default threshold everytime when we release a new model. */
  frameConfidenceThreshold?: number;
  /** The confidence threshold we perform filtering on the labels from video-level and shot-level detections. If not set, it's set to 0.3 by default. The valid range for this threshold is [0.1, 0.9]. Any value set outside of this range will be clipped. Note: For best results, follow the default threshold. We will update the default threshold everytime when we release a new model. */
  videoConfidenceThreshold?: number;
}

export const GoogleCloudVideointelligenceV1_LabelDetectionConfig: Schema.Schema<GoogleCloudVideointelligenceV1_LabelDetectionConfig> = Schema.suspend(() => Schema.Struct({
  labelDetectionMode: Schema.optional(Schema.String),
  stationaryCamera: Schema.optional(Schema.Boolean),
  model: Schema.optional(Schema.String),
  frameConfidenceThreshold: Schema.optional(Schema.Number),
  videoConfidenceThreshold: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_LabelDetectionConfig" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_LabelDetectionConfig>;

export interface GoogleCloudVideointelligenceV1_ShotChangeDetectionConfig {
  /** Model to use for shot change detection. Supported values: "builtin/stable" (the default if unset), "builtin/latest", and "builtin/legacy". */
  model?: string;
}

export const GoogleCloudVideointelligenceV1_ShotChangeDetectionConfig: Schema.Schema<GoogleCloudVideointelligenceV1_ShotChangeDetectionConfig> = Schema.suspend(() => Schema.Struct({
  model: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_ShotChangeDetectionConfig" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_ShotChangeDetectionConfig>;

export interface GoogleCloudVideointelligenceV1_ExplicitContentDetectionConfig {
  /** Model to use for explicit content detection. Supported values: "builtin/stable" (the default if unset) and "builtin/latest". */
  model?: string;
}

export const GoogleCloudVideointelligenceV1_ExplicitContentDetectionConfig: Schema.Schema<GoogleCloudVideointelligenceV1_ExplicitContentDetectionConfig> = Schema.suspend(() => Schema.Struct({
  model: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_ExplicitContentDetectionConfig" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_ExplicitContentDetectionConfig>;

export interface GoogleCloudVideointelligenceV1_FaceDetectionConfig {
  /** Model to use for face detection. Supported values: "builtin/stable" (the default if unset) and "builtin/latest". */
  model?: string;
  /** Whether bounding boxes are included in the face annotation output. */
  includeBoundingBoxes?: boolean;
  /** Whether to enable face attributes detection, such as glasses, dark_glasses, mouth_open etc. Ignored if 'include_bounding_boxes' is set to false. */
  includeAttributes?: boolean;
}

export const GoogleCloudVideointelligenceV1_FaceDetectionConfig: Schema.Schema<GoogleCloudVideointelligenceV1_FaceDetectionConfig> = Schema.suspend(() => Schema.Struct({
  model: Schema.optional(Schema.String),
  includeBoundingBoxes: Schema.optional(Schema.Boolean),
  includeAttributes: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_FaceDetectionConfig" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_FaceDetectionConfig>;

export interface GoogleCloudVideointelligenceV1_SpeechContext {
  /** Optional. A list of strings containing words and phrases "hints" so that the speech recognition is more likely to recognize them. This can be used to improve the accuracy for specific words and phrases, for example, if specific commands are typically spoken by the user. This can also be used to add additional words to the vocabulary of the recognizer. See [usage limits](https://cloud.google.com/speech/limits#content). */
  phrases?: Array<string>;
}

export const GoogleCloudVideointelligenceV1_SpeechContext: Schema.Schema<GoogleCloudVideointelligenceV1_SpeechContext> = Schema.suspend(() => Schema.Struct({
  phrases: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_SpeechContext" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_SpeechContext>;

export interface GoogleCloudVideointelligenceV1_SpeechTranscriptionConfig {
  /** Required. *Required* The language of the supplied audio as a [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) language tag. Example: "en-US". See [Language Support](https://cloud.google.com/speech/docs/languages) for a list of the currently supported language codes. */
  languageCode?: string;
  /** Optional. Maximum number of recognition hypotheses to be returned. Specifically, the maximum number of `SpeechRecognitionAlternative` messages within each `SpeechTranscription`. The server may return fewer than `max_alternatives`. Valid values are `0`-`30`. A value of `0` or `1` will return a maximum of one. If omitted, will return a maximum of one. */
  maxAlternatives?: number;
  /** Optional. If set to `true`, the server will attempt to filter out profanities, replacing all but the initial character in each filtered word with asterisks, e.g. "f***". If set to `false` or omitted, profanities won't be filtered out. */
  filterProfanity?: boolean;
  /** Optional. A means to provide context to assist the speech recognition. */
  speechContexts?: Array<GoogleCloudVideointelligenceV1_SpeechContext>;
  /** Optional. If 'true', adds punctuation to recognition result hypotheses. This feature is only available in select languages. Setting this for requests in other languages has no effect at all. The default 'false' value does not add punctuation to result hypotheses. NOTE: "This is currently offered as an experimental service, complimentary to all users. In the future this may be exclusively available as a premium feature." */
  enableAutomaticPunctuation?: boolean;
  /** Optional. For file formats, such as MXF or MKV, supporting multiple audio tracks, specify up to two tracks. Default: track 0. */
  audioTracks?: Array<number>;
  /** Optional. If 'true', enables speaker detection for each recognized word in the top alternative of the recognition result using a speaker_tag provided in the WordInfo. Note: When this is true, we send all the words from the beginning of the audio for the top alternative in every consecutive response. This is done in order to improve our speaker tags as our models learn to identify the speakers in the conversation over time. */
  enableSpeakerDiarization?: boolean;
  /** Optional. If set, specifies the estimated number of speakers in the conversation. If not set, defaults to '2'. Ignored unless enable_speaker_diarization is set to true. */
  diarizationSpeakerCount?: number;
  /** Optional. If `true`, the top result includes a list of words and the confidence for those words. If `false`, no word-level confidence information is returned. The default is `false`. */
  enableWordConfidence?: boolean;
}

export const GoogleCloudVideointelligenceV1_SpeechTranscriptionConfig: Schema.Schema<GoogleCloudVideointelligenceV1_SpeechTranscriptionConfig> = Schema.suspend(() => Schema.Struct({
  languageCode: Schema.optional(Schema.String),
  maxAlternatives: Schema.optional(Schema.Number),
  filterProfanity: Schema.optional(Schema.Boolean),
  speechContexts: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_SpeechContext)),
  enableAutomaticPunctuation: Schema.optional(Schema.Boolean),
  audioTracks: Schema.optional(Schema.Array(Schema.Number)),
  enableSpeakerDiarization: Schema.optional(Schema.Boolean),
  diarizationSpeakerCount: Schema.optional(Schema.Number),
  enableWordConfidence: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_SpeechTranscriptionConfig" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_SpeechTranscriptionConfig>;

export interface GoogleCloudVideointelligenceV1_TextDetectionConfig {
  /** Language hint can be specified if the language to be detected is known a priori. It can increase the accuracy of the detection. Language hint must be language code in BCP-47 format. Automatic language detection is performed if no hint is provided. */
  languageHints?: Array<string>;
  /** Model to use for text detection. Supported values: "builtin/stable" (the default if unset) and "builtin/latest". */
  model?: string;
}

export const GoogleCloudVideointelligenceV1_TextDetectionConfig: Schema.Schema<GoogleCloudVideointelligenceV1_TextDetectionConfig> = Schema.suspend(() => Schema.Struct({
  languageHints: Schema.optional(Schema.Array(Schema.String)),
  model: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_TextDetectionConfig" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_TextDetectionConfig>;

export interface GoogleCloudVideointelligenceV1_PersonDetectionConfig {
  /** Whether bounding boxes are included in the person detection annotation output. */
  includeBoundingBoxes?: boolean;
  /** Whether to enable pose landmarks detection. Ignored if 'include_bounding_boxes' is set to false. */
  includePoseLandmarks?: boolean;
  /** Whether to enable person attributes detection, such as cloth color (black, blue, etc), type (coat, dress, etc), pattern (plain, floral, etc), hair, etc. Ignored if 'include_bounding_boxes' is set to false. */
  includeAttributes?: boolean;
}

export const GoogleCloudVideointelligenceV1_PersonDetectionConfig: Schema.Schema<GoogleCloudVideointelligenceV1_PersonDetectionConfig> = Schema.suspend(() => Schema.Struct({
  includeBoundingBoxes: Schema.optional(Schema.Boolean),
  includePoseLandmarks: Schema.optional(Schema.Boolean),
  includeAttributes: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_PersonDetectionConfig" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_PersonDetectionConfig>;

export interface GoogleCloudVideointelligenceV1_ObjectTrackingConfig {
  /** Model to use for object tracking. Supported values: "builtin/stable" (the default if unset) and "builtin/latest". */
  model?: string;
}

export const GoogleCloudVideointelligenceV1_ObjectTrackingConfig: Schema.Schema<GoogleCloudVideointelligenceV1_ObjectTrackingConfig> = Schema.suspend(() => Schema.Struct({
  model: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_ObjectTrackingConfig" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_ObjectTrackingConfig>;

export interface GoogleCloudVideointelligenceV1_VideoContext {
  /** Video segments to annotate. The segments may overlap and are not required to be contiguous or span the whole video. If unspecified, each video is treated as a single segment. */
  segments?: Array<GoogleCloudVideointelligenceV1_VideoSegment>;
  /** Config for LABEL_DETECTION. */
  labelDetectionConfig?: GoogleCloudVideointelligenceV1_LabelDetectionConfig;
  /** Config for SHOT_CHANGE_DETECTION. */
  shotChangeDetectionConfig?: GoogleCloudVideointelligenceV1_ShotChangeDetectionConfig;
  /** Config for EXPLICIT_CONTENT_DETECTION. */
  explicitContentDetectionConfig?: GoogleCloudVideointelligenceV1_ExplicitContentDetectionConfig;
  /** Config for FACE_DETECTION. */
  faceDetectionConfig?: GoogleCloudVideointelligenceV1_FaceDetectionConfig;
  /** Config for SPEECH_TRANSCRIPTION. */
  speechTranscriptionConfig?: GoogleCloudVideointelligenceV1_SpeechTranscriptionConfig;
  /** Config for TEXT_DETECTION. */
  textDetectionConfig?: GoogleCloudVideointelligenceV1_TextDetectionConfig;
  /** Config for PERSON_DETECTION. */
  personDetectionConfig?: GoogleCloudVideointelligenceV1_PersonDetectionConfig;
  /** Config for OBJECT_TRACKING. */
  objectTrackingConfig?: GoogleCloudVideointelligenceV1_ObjectTrackingConfig;
}

export const GoogleCloudVideointelligenceV1_VideoContext: Schema.Schema<GoogleCloudVideointelligenceV1_VideoContext> = Schema.suspend(() => Schema.Struct({
  segments: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_VideoSegment)),
  labelDetectionConfig: Schema.optional(GoogleCloudVideointelligenceV1_LabelDetectionConfig),
  shotChangeDetectionConfig: Schema.optional(GoogleCloudVideointelligenceV1_ShotChangeDetectionConfig),
  explicitContentDetectionConfig: Schema.optional(GoogleCloudVideointelligenceV1_ExplicitContentDetectionConfig),
  faceDetectionConfig: Schema.optional(GoogleCloudVideointelligenceV1_FaceDetectionConfig),
  speechTranscriptionConfig: Schema.optional(GoogleCloudVideointelligenceV1_SpeechTranscriptionConfig),
  textDetectionConfig: Schema.optional(GoogleCloudVideointelligenceV1_TextDetectionConfig),
  personDetectionConfig: Schema.optional(GoogleCloudVideointelligenceV1_PersonDetectionConfig),
  objectTrackingConfig: Schema.optional(GoogleCloudVideointelligenceV1_ObjectTrackingConfig),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_VideoContext" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_VideoContext>;

export interface GoogleCloudVideointelligenceV1_AnnotateVideoRequest {
  /** Input video location. Currently, only [Cloud Storage](https://cloud.google.com/storage/) URIs are supported. URIs must be specified in the following format: `gs://bucket-id/object-id` (other URI formats return google.rpc.Code.INVALID_ARGUMENT). For more information, see [Request URIs](https://cloud.google.com/storage/docs/request-endpoints). To identify multiple videos, a video URI may include wildcards in the `object-id`. Supported wildcards: '*' to match 0 or more characters; '?' to match 1 character. If unset, the input video should be embedded in the request as `input_content`. If set, `input_content` must be unset. */
  inputUri?: string;
  /** The video data bytes. If unset, the input video(s) should be specified via the `input_uri`. If set, `input_uri` must be unset. */
  inputContent?: string;
  /** Required. Requested video annotation features. */
  features?: Array<"FEATURE_UNSPECIFIED" | "LABEL_DETECTION" | "SHOT_CHANGE_DETECTION" | "EXPLICIT_CONTENT_DETECTION" | "FACE_DETECTION" | "SPEECH_TRANSCRIPTION" | "TEXT_DETECTION" | "OBJECT_TRACKING" | "LOGO_RECOGNITION" | "PERSON_DETECTION" | (string & {})>;
  /** Additional video context and/or feature-specific parameters. */
  videoContext?: GoogleCloudVideointelligenceV1_VideoContext;
  /** Optional. Location where the output (in JSON format) should be stored. Currently, only [Cloud Storage](https://cloud.google.com/storage/) URIs are supported. These must be specified in the following format: `gs://bucket-id/object-id` (other URI formats return google.rpc.Code.INVALID_ARGUMENT). For more information, see [Request URIs](https://cloud.google.com/storage/docs/request-endpoints). */
  outputUri?: string;
  /** Optional. Cloud region where annotation should take place. Supported cloud regions are: `us-east1`, `us-west1`, `europe-west1`, `asia-east1`. If no region is specified, the region will be determined based on video file location. */
  locationId?: string;
}

export const GoogleCloudVideointelligenceV1_AnnotateVideoRequest: Schema.Schema<GoogleCloudVideointelligenceV1_AnnotateVideoRequest> = Schema.suspend(() => Schema.Struct({
  inputUri: Schema.optional(Schema.String),
  inputContent: Schema.optional(Schema.String),
  features: Schema.optional(Schema.Array(Schema.String)),
  videoContext: Schema.optional(GoogleCloudVideointelligenceV1_VideoContext),
  outputUri: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_AnnotateVideoRequest" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_AnnotateVideoRequest>;

export interface GoogleCloudVideointelligenceV1beta2_VideoSegment {
  /** Time-offset, relative to the beginning of the video, corresponding to the start of the segment (inclusive). */
  startTimeOffset?: string;
  /** Time-offset, relative to the beginning of the video, corresponding to the end of the segment (inclusive). */
  endTimeOffset?: string;
}

export const GoogleCloudVideointelligenceV1beta2_VideoSegment: Schema.Schema<GoogleCloudVideointelligenceV1beta2_VideoSegment> = Schema.suspend(() => Schema.Struct({
  startTimeOffset: Schema.optional(Schema.String),
  endTimeOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_VideoSegment" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_VideoSegment>;

export interface GoogleCloudVideointelligenceV1beta2_Entity {
  /** Opaque entity ID. Some IDs may be available in [Google Knowledge Graph Search API](https://developers.google.com/knowledge-graph/). */
  entityId?: string;
  /** Textual description, e.g., `Fixed-gear bicycle`. */
  description?: string;
  /** Language code for `description` in BCP-47 format. */
  languageCode?: string;
}

export const GoogleCloudVideointelligenceV1beta2_Entity: Schema.Schema<GoogleCloudVideointelligenceV1beta2_Entity> = Schema.suspend(() => Schema.Struct({
  entityId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_Entity" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_Entity>;

export interface GoogleCloudVideointelligenceV1beta2_LabelSegment {
  /** Video segment where a label was detected. */
  segment?: GoogleCloudVideointelligenceV1beta2_VideoSegment;
  /** Confidence that the label is accurate. Range: [0, 1]. */
  confidence?: number;
}

export const GoogleCloudVideointelligenceV1beta2_LabelSegment: Schema.Schema<GoogleCloudVideointelligenceV1beta2_LabelSegment> = Schema.suspend(() => Schema.Struct({
  segment: Schema.optional(GoogleCloudVideointelligenceV1beta2_VideoSegment),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_LabelSegment" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_LabelSegment>;

export interface GoogleCloudVideointelligenceV1beta2_LabelFrame {
  /** Time-offset, relative to the beginning of the video, corresponding to the video frame for this location. */
  timeOffset?: string;
  /** Confidence that the label is accurate. Range: [0, 1]. */
  confidence?: number;
}

export const GoogleCloudVideointelligenceV1beta2_LabelFrame: Schema.Schema<GoogleCloudVideointelligenceV1beta2_LabelFrame> = Schema.suspend(() => Schema.Struct({
  timeOffset: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_LabelFrame" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_LabelFrame>;

export interface GoogleCloudVideointelligenceV1beta2_LabelAnnotation {
  /** Detected entity. */
  entity?: GoogleCloudVideointelligenceV1beta2_Entity;
  /** Common categories for the detected entity. For example, when the label is `Terrier`, the category is likely `dog`. And in some cases there might be more than one categories e.g., `Terrier` could also be a `pet`. */
  categoryEntities?: Array<GoogleCloudVideointelligenceV1beta2_Entity>;
  /** All video segments where a label was detected. */
  segments?: Array<GoogleCloudVideointelligenceV1beta2_LabelSegment>;
  /** All video frames where a label was detected. */
  frames?: Array<GoogleCloudVideointelligenceV1beta2_LabelFrame>;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1beta2_LabelAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1beta2_LabelAnnotation> = Schema.suspend(() => Schema.Struct({
  entity: Schema.optional(GoogleCloudVideointelligenceV1beta2_Entity),
  categoryEntities: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_Entity)),
  segments: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_LabelSegment)),
  frames: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_LabelFrame)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_LabelAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_LabelAnnotation>;

export interface GoogleCloudVideointelligenceV1beta2_FaceSegment {
  /** Video segment where a face was detected. */
  segment?: GoogleCloudVideointelligenceV1beta2_VideoSegment;
}

export const GoogleCloudVideointelligenceV1beta2_FaceSegment: Schema.Schema<GoogleCloudVideointelligenceV1beta2_FaceSegment> = Schema.suspend(() => Schema.Struct({
  segment: Schema.optional(GoogleCloudVideointelligenceV1beta2_VideoSegment),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_FaceSegment" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_FaceSegment>;

export interface GoogleCloudVideointelligenceV1beta2_NormalizedBoundingBox {
  /** Left X coordinate. */
  left?: number;
  /** Top Y coordinate. */
  top?: number;
  /** Right X coordinate. */
  right?: number;
  /** Bottom Y coordinate. */
  bottom?: number;
}

export const GoogleCloudVideointelligenceV1beta2_NormalizedBoundingBox: Schema.Schema<GoogleCloudVideointelligenceV1beta2_NormalizedBoundingBox> = Schema.suspend(() => Schema.Struct({
  left: Schema.optional(Schema.Number),
  top: Schema.optional(Schema.Number),
  right: Schema.optional(Schema.Number),
  bottom: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_NormalizedBoundingBox" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_NormalizedBoundingBox>;

export interface GoogleCloudVideointelligenceV1beta2_FaceFrame {
  /** Normalized Bounding boxes in a frame. There can be more than one boxes if the same face is detected in multiple locations within the current frame. */
  normalizedBoundingBoxes?: Array<GoogleCloudVideointelligenceV1beta2_NormalizedBoundingBox>;
  /** Time-offset, relative to the beginning of the video, corresponding to the video frame for this location. */
  timeOffset?: string;
}

export const GoogleCloudVideointelligenceV1beta2_FaceFrame: Schema.Schema<GoogleCloudVideointelligenceV1beta2_FaceFrame> = Schema.suspend(() => Schema.Struct({
  normalizedBoundingBoxes: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_NormalizedBoundingBox)),
  timeOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_FaceFrame" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_FaceFrame>;

export interface GoogleCloudVideointelligenceV1beta2_FaceAnnotation {
  /** Thumbnail of a representative face view (in JPEG format). */
  thumbnail?: string;
  /** All video segments where a face was detected. */
  segments?: Array<GoogleCloudVideointelligenceV1beta2_FaceSegment>;
  /** All video frames where a face was detected. */
  frames?: Array<GoogleCloudVideointelligenceV1beta2_FaceFrame>;
}

export const GoogleCloudVideointelligenceV1beta2_FaceAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1beta2_FaceAnnotation> = Schema.suspend(() => Schema.Struct({
  thumbnail: Schema.optional(Schema.String),
  segments: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_FaceSegment)),
  frames: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_FaceFrame)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_FaceAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_FaceAnnotation>;

export interface GoogleCloudVideointelligenceV1beta2_DetectedAttribute {
  /** The name of the attribute, for example, glasses, dark_glasses, mouth_open. A full list of supported type names will be provided in the document. */
  name?: string;
  /** Detected attribute confidence. Range [0, 1]. */
  confidence?: number;
  /** Text value of the detection result. For example, the value for "HairColor" can be "black", "blonde", etc. */
  value?: string;
}

export const GoogleCloudVideointelligenceV1beta2_DetectedAttribute: Schema.Schema<GoogleCloudVideointelligenceV1beta2_DetectedAttribute> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_DetectedAttribute" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_DetectedAttribute>;

export interface GoogleCloudVideointelligenceV1beta2_NormalizedVertex {
  /** X coordinate. */
  x?: number;
  /** Y coordinate. */
  y?: number;
}

export const GoogleCloudVideointelligenceV1beta2_NormalizedVertex: Schema.Schema<GoogleCloudVideointelligenceV1beta2_NormalizedVertex> = Schema.suspend(() => Schema.Struct({
  x: Schema.optional(Schema.Number),
  y: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_NormalizedVertex" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_NormalizedVertex>;

export interface GoogleCloudVideointelligenceV1beta2_DetectedLandmark {
  /** The name of this landmark, for example, left_hand, right_shoulder. */
  name?: string;
  /** The 2D point of the detected landmark using the normalized image coordinate system. The normalized coordinates have the range from 0 to 1. */
  point?: GoogleCloudVideointelligenceV1beta2_NormalizedVertex;
  /** The confidence score of the detected landmark. Range [0, 1]. */
  confidence?: number;
}

export const GoogleCloudVideointelligenceV1beta2_DetectedLandmark: Schema.Schema<GoogleCloudVideointelligenceV1beta2_DetectedLandmark> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  point: Schema.optional(GoogleCloudVideointelligenceV1beta2_NormalizedVertex),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_DetectedLandmark" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_DetectedLandmark>;

export interface GoogleCloudVideointelligenceV1beta2_TimestampedObject {
  /** Normalized Bounding box in a frame, where the object is located. */
  normalizedBoundingBox?: GoogleCloudVideointelligenceV1beta2_NormalizedBoundingBox;
  /** Time-offset, relative to the beginning of the video, corresponding to the video frame for this object. */
  timeOffset?: string;
  /** Optional. The attributes of the object in the bounding box. */
  attributes?: Array<GoogleCloudVideointelligenceV1beta2_DetectedAttribute>;
  /** Optional. The detected landmarks. */
  landmarks?: Array<GoogleCloudVideointelligenceV1beta2_DetectedLandmark>;
}

export const GoogleCloudVideointelligenceV1beta2_TimestampedObject: Schema.Schema<GoogleCloudVideointelligenceV1beta2_TimestampedObject> = Schema.suspend(() => Schema.Struct({
  normalizedBoundingBox: Schema.optional(GoogleCloudVideointelligenceV1beta2_NormalizedBoundingBox),
  timeOffset: Schema.optional(Schema.String),
  attributes: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_DetectedAttribute)),
  landmarks: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_DetectedLandmark)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_TimestampedObject" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_TimestampedObject>;

export interface GoogleCloudVideointelligenceV1beta2_Track {
  /** Video segment of a track. */
  segment?: GoogleCloudVideointelligenceV1beta2_VideoSegment;
  /** The object with timestamp and attributes per frame in the track. */
  timestampedObjects?: Array<GoogleCloudVideointelligenceV1beta2_TimestampedObject>;
  /** Optional. Attributes in the track level. */
  attributes?: Array<GoogleCloudVideointelligenceV1beta2_DetectedAttribute>;
  /** Optional. The confidence score of the tracked object. */
  confidence?: number;
}

export const GoogleCloudVideointelligenceV1beta2_Track: Schema.Schema<GoogleCloudVideointelligenceV1beta2_Track> = Schema.suspend(() => Schema.Struct({
  segment: Schema.optional(GoogleCloudVideointelligenceV1beta2_VideoSegment),
  timestampedObjects: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_TimestampedObject)),
  attributes: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_DetectedAttribute)),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_Track" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_Track>;

export interface GoogleCloudVideointelligenceV1beta2_FaceDetectionAnnotation {
  /** The face tracks with attributes. */
  tracks?: Array<GoogleCloudVideointelligenceV1beta2_Track>;
  /** The thumbnail of a person's face. */
  thumbnail?: string;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1beta2_FaceDetectionAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1beta2_FaceDetectionAnnotation> = Schema.suspend(() => Schema.Struct({
  tracks: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_Track)),
  thumbnail: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_FaceDetectionAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_FaceDetectionAnnotation>;

export interface GoogleCloudVideointelligenceV1beta2_ExplicitContentFrame {
  /** Time-offset, relative to the beginning of the video, corresponding to the video frame for this location. */
  timeOffset?: string;
  /** Likelihood of the pornography content.. */
  pornographyLikelihood?: "LIKELIHOOD_UNSPECIFIED" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
}

export const GoogleCloudVideointelligenceV1beta2_ExplicitContentFrame: Schema.Schema<GoogleCloudVideointelligenceV1beta2_ExplicitContentFrame> = Schema.suspend(() => Schema.Struct({
  timeOffset: Schema.optional(Schema.String),
  pornographyLikelihood: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_ExplicitContentFrame" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_ExplicitContentFrame>;

export interface GoogleCloudVideointelligenceV1beta2_ExplicitContentAnnotation {
  /** All video frames where explicit content was detected. */
  frames?: Array<GoogleCloudVideointelligenceV1beta2_ExplicitContentFrame>;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1beta2_ExplicitContentAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1beta2_ExplicitContentAnnotation> = Schema.suspend(() => Schema.Struct({
  frames: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_ExplicitContentFrame)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_ExplicitContentAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_ExplicitContentAnnotation>;

export interface GoogleCloudVideointelligenceV1beta2_WordInfo {
  /** Time offset relative to the beginning of the audio, and corresponding to the start of the spoken word. This field is only set if `enable_word_time_offsets=true` and only in the top hypothesis. This is an experimental feature and the accuracy of the time offset can vary. */
  startTime?: string;
  /** Time offset relative to the beginning of the audio, and corresponding to the end of the spoken word. This field is only set if `enable_word_time_offsets=true` and only in the top hypothesis. This is an experimental feature and the accuracy of the time offset can vary. */
  endTime?: string;
  /** The word corresponding to this set of information. */
  word?: string;
  /** Output only. The confidence estimate between 0.0 and 1.0. A higher number indicates an estimated greater likelihood that the recognized words are correct. This field is set only for the top alternative. This field is not guaranteed to be accurate and users should not rely on it to be always provided. The default of 0.0 is a sentinel value indicating `confidence` was not set. */
  confidence?: number;
  /** Output only. A distinct integer value is assigned for every speaker within the audio. This field specifies which one of those speakers was detected to have spoken this word. Value ranges from 1 up to diarization_speaker_count, and is only set if speaker diarization is enabled. */
  speakerTag?: number;
}

export const GoogleCloudVideointelligenceV1beta2_WordInfo: Schema.Schema<GoogleCloudVideointelligenceV1beta2_WordInfo> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  word: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  speakerTag: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_WordInfo" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_WordInfo>;

export interface GoogleCloudVideointelligenceV1beta2_SpeechRecognitionAlternative {
  /** Transcript text representing the words that the user spoke. */
  transcript?: string;
  /** Output only. The confidence estimate between 0.0 and 1.0. A higher number indicates an estimated greater likelihood that the recognized words are correct. This field is set only for the top alternative. This field is not guaranteed to be accurate and users should not rely on it to be always provided. The default of 0.0 is a sentinel value indicating `confidence` was not set. */
  confidence?: number;
  /** Output only. A list of word-specific information for each recognized word. Note: When `enable_speaker_diarization` is set to true, you will see all the words from the beginning of the audio. */
  words?: Array<GoogleCloudVideointelligenceV1beta2_WordInfo>;
}

export const GoogleCloudVideointelligenceV1beta2_SpeechRecognitionAlternative: Schema.Schema<GoogleCloudVideointelligenceV1beta2_SpeechRecognitionAlternative> = Schema.suspend(() => Schema.Struct({
  transcript: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  words: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_WordInfo)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_SpeechRecognitionAlternative" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_SpeechRecognitionAlternative>;

export interface GoogleCloudVideointelligenceV1beta2_SpeechTranscription {
  /** May contain one or more recognition hypotheses (up to the maximum specified in `max_alternatives`). These alternatives are ordered in terms of accuracy, with the top (first) alternative being the most probable, as ranked by the recognizer. */
  alternatives?: Array<GoogleCloudVideointelligenceV1beta2_SpeechRecognitionAlternative>;
  /** Output only. The [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) language tag of the language in this result. This language code was detected to have the most likelihood of being spoken in the audio. */
  languageCode?: string;
}

export const GoogleCloudVideointelligenceV1beta2_SpeechTranscription: Schema.Schema<GoogleCloudVideointelligenceV1beta2_SpeechTranscription> = Schema.suspend(() => Schema.Struct({
  alternatives: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_SpeechRecognitionAlternative)),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_SpeechTranscription" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_SpeechTranscription>;

export interface GoogleCloudVideointelligenceV1beta2_NormalizedBoundingPoly {
  /** Normalized vertices of the bounding polygon. */
  vertices?: Array<GoogleCloudVideointelligenceV1beta2_NormalizedVertex>;
}

export const GoogleCloudVideointelligenceV1beta2_NormalizedBoundingPoly: Schema.Schema<GoogleCloudVideointelligenceV1beta2_NormalizedBoundingPoly> = Schema.suspend(() => Schema.Struct({
  vertices: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_NormalizedVertex)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_NormalizedBoundingPoly" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_NormalizedBoundingPoly>;

export interface GoogleCloudVideointelligenceV1beta2_TextFrame {
  /** Bounding polygon of the detected text for this frame. */
  rotatedBoundingBox?: GoogleCloudVideointelligenceV1beta2_NormalizedBoundingPoly;
  /** Timestamp of this frame. */
  timeOffset?: string;
}

export const GoogleCloudVideointelligenceV1beta2_TextFrame: Schema.Schema<GoogleCloudVideointelligenceV1beta2_TextFrame> = Schema.suspend(() => Schema.Struct({
  rotatedBoundingBox: Schema.optional(GoogleCloudVideointelligenceV1beta2_NormalizedBoundingPoly),
  timeOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_TextFrame" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_TextFrame>;

export interface GoogleCloudVideointelligenceV1beta2_TextSegment {
  /** Video segment where a text snippet was detected. */
  segment?: GoogleCloudVideointelligenceV1beta2_VideoSegment;
  /** Confidence for the track of detected text. It is calculated as the highest over all frames where OCR detected text appears. */
  confidence?: number;
  /** Information related to the frames where OCR detected text appears. */
  frames?: Array<GoogleCloudVideointelligenceV1beta2_TextFrame>;
}

export const GoogleCloudVideointelligenceV1beta2_TextSegment: Schema.Schema<GoogleCloudVideointelligenceV1beta2_TextSegment> = Schema.suspend(() => Schema.Struct({
  segment: Schema.optional(GoogleCloudVideointelligenceV1beta2_VideoSegment),
  confidence: Schema.optional(Schema.Number),
  frames: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_TextFrame)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_TextSegment" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_TextSegment>;

export interface GoogleCloudVideointelligenceV1beta2_TextAnnotation {
  /** The detected text. */
  text?: string;
  /** All video segments where OCR detected text appears. */
  segments?: Array<GoogleCloudVideointelligenceV1beta2_TextSegment>;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1beta2_TextAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1beta2_TextAnnotation> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  segments: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_TextSegment)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_TextAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_TextAnnotation>;

export interface GoogleCloudVideointelligenceV1beta2_ObjectTrackingFrame {
  /** The normalized bounding box location of this object track for the frame. */
  normalizedBoundingBox?: GoogleCloudVideointelligenceV1beta2_NormalizedBoundingBox;
  /** The timestamp of the frame in microseconds. */
  timeOffset?: string;
}

export const GoogleCloudVideointelligenceV1beta2_ObjectTrackingFrame: Schema.Schema<GoogleCloudVideointelligenceV1beta2_ObjectTrackingFrame> = Schema.suspend(() => Schema.Struct({
  normalizedBoundingBox: Schema.optional(GoogleCloudVideointelligenceV1beta2_NormalizedBoundingBox),
  timeOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_ObjectTrackingFrame" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_ObjectTrackingFrame>;

export interface GoogleCloudVideointelligenceV1beta2_ObjectTrackingAnnotation {
  /** Non-streaming batch mode ONLY. Each object track corresponds to one video segment where it appears. */
  segment?: GoogleCloudVideointelligenceV1beta2_VideoSegment;
  /** Streaming mode ONLY. In streaming mode, we do not know the end time of a tracked object before it is completed. Hence, there is no VideoSegment info returned. Instead, we provide a unique identifiable integer track_id so that the customers can correlate the results of the ongoing ObjectTrackAnnotation of the same track_id over time. */
  trackId?: string;
  /** Entity to specify the object category that this track is labeled as. */
  entity?: GoogleCloudVideointelligenceV1beta2_Entity;
  /** Object category's labeling confidence of this track. */
  confidence?: number;
  /** Information corresponding to all frames where this object track appears. Non-streaming batch mode: it may be one or multiple ObjectTrackingFrame messages in frames. Streaming mode: it can only be one ObjectTrackingFrame message in frames. */
  frames?: Array<GoogleCloudVideointelligenceV1beta2_ObjectTrackingFrame>;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1beta2_ObjectTrackingAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1beta2_ObjectTrackingAnnotation> = Schema.suspend(() => Schema.Struct({
  segment: Schema.optional(GoogleCloudVideointelligenceV1beta2_VideoSegment),
  trackId: Schema.optional(Schema.String),
  entity: Schema.optional(GoogleCloudVideointelligenceV1beta2_Entity),
  confidence: Schema.optional(Schema.Number),
  frames: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_ObjectTrackingFrame)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_ObjectTrackingAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_ObjectTrackingAnnotation>;

export interface GoogleCloudVideointelligenceV1beta2_LogoRecognitionAnnotation {
  /** Entity category information to specify the logo class that all the logo tracks within this LogoRecognitionAnnotation are recognized as. */
  entity?: GoogleCloudVideointelligenceV1beta2_Entity;
  /** All logo tracks where the recognized logo appears. Each track corresponds to one logo instance appearing in consecutive frames. */
  tracks?: Array<GoogleCloudVideointelligenceV1beta2_Track>;
  /** All video segments where the recognized logo appears. There might be multiple instances of the same logo class appearing in one VideoSegment. */
  segments?: Array<GoogleCloudVideointelligenceV1beta2_VideoSegment>;
}

export const GoogleCloudVideointelligenceV1beta2_LogoRecognitionAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1beta2_LogoRecognitionAnnotation> = Schema.suspend(() => Schema.Struct({
  entity: Schema.optional(GoogleCloudVideointelligenceV1beta2_Entity),
  tracks: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_Track)),
  segments: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_VideoSegment)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_LogoRecognitionAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_LogoRecognitionAnnotation>;

export interface GoogleCloudVideointelligenceV1beta2_PersonDetectionAnnotation {
  /** The detected tracks of a person. */
  tracks?: Array<GoogleCloudVideointelligenceV1beta2_Track>;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1beta2_PersonDetectionAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1beta2_PersonDetectionAnnotation> = Schema.suspend(() => Schema.Struct({
  tracks: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_Track)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_PersonDetectionAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_PersonDetectionAnnotation>;

export interface GoogleCloudVideointelligenceV1beta2_VideoAnnotationResults {
  /** Video file location in [Cloud Storage](https://cloud.google.com/storage/). */
  inputUri?: string;
  /** Video segment on which the annotation is run. */
  segment?: GoogleCloudVideointelligenceV1beta2_VideoSegment;
  /** Topical label annotations on video level or user-specified segment level. There is exactly one element for each unique label. */
  segmentLabelAnnotations?: Array<GoogleCloudVideointelligenceV1beta2_LabelAnnotation>;
  /** Presence label annotations on video level or user-specified segment level. There is exactly one element for each unique label. Compared to the existing topical `segment_label_annotations`, this field presents more fine-grained, segment-level labels detected in video content and is made available only when the client sets `LabelDetectionConfig.model` to "builtin/latest" in the request. */
  segmentPresenceLabelAnnotations?: Array<GoogleCloudVideointelligenceV1beta2_LabelAnnotation>;
  /** Topical label annotations on shot level. There is exactly one element for each unique label. */
  shotLabelAnnotations?: Array<GoogleCloudVideointelligenceV1beta2_LabelAnnotation>;
  /** Presence label annotations on shot level. There is exactly one element for each unique label. Compared to the existing topical `shot_label_annotations`, this field presents more fine-grained, shot-level labels detected in video content and is made available only when the client sets `LabelDetectionConfig.model` to "builtin/latest" in the request. */
  shotPresenceLabelAnnotations?: Array<GoogleCloudVideointelligenceV1beta2_LabelAnnotation>;
  /** Label annotations on frame level. There is exactly one element for each unique label. */
  frameLabelAnnotations?: Array<GoogleCloudVideointelligenceV1beta2_LabelAnnotation>;
  /** Deprecated. Please use `face_detection_annotations` instead. */
  faceAnnotations?: Array<GoogleCloudVideointelligenceV1beta2_FaceAnnotation>;
  /** Face detection annotations. */
  faceDetectionAnnotations?: Array<GoogleCloudVideointelligenceV1beta2_FaceDetectionAnnotation>;
  /** Shot annotations. Each shot is represented as a video segment. */
  shotAnnotations?: Array<GoogleCloudVideointelligenceV1beta2_VideoSegment>;
  /** Explicit content annotation. */
  explicitAnnotation?: GoogleCloudVideointelligenceV1beta2_ExplicitContentAnnotation;
  /** Speech transcription. */
  speechTranscriptions?: Array<GoogleCloudVideointelligenceV1beta2_SpeechTranscription>;
  /** OCR text detection and tracking. Annotations for list of detected text snippets. Each will have list of frame information associated with it. */
  textAnnotations?: Array<GoogleCloudVideointelligenceV1beta2_TextAnnotation>;
  /** Annotations for list of objects detected and tracked in video. */
  objectAnnotations?: Array<GoogleCloudVideointelligenceV1beta2_ObjectTrackingAnnotation>;
  /** Annotations for list of logos detected, tracked and recognized in video. */
  logoRecognitionAnnotations?: Array<GoogleCloudVideointelligenceV1beta2_LogoRecognitionAnnotation>;
  /** Person detection annotations. */
  personDetectionAnnotations?: Array<GoogleCloudVideointelligenceV1beta2_PersonDetectionAnnotation>;
  /** If set, indicates an error. Note that for a single `AnnotateVideoRequest` some videos may succeed and some may fail. */
  error?: GoogleRpc_Status;
}

export const GoogleCloudVideointelligenceV1beta2_VideoAnnotationResults: Schema.Schema<GoogleCloudVideointelligenceV1beta2_VideoAnnotationResults> = Schema.suspend(() => Schema.Struct({
  inputUri: Schema.optional(Schema.String),
  segment: Schema.optional(GoogleCloudVideointelligenceV1beta2_VideoSegment),
  segmentLabelAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_LabelAnnotation)),
  segmentPresenceLabelAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_LabelAnnotation)),
  shotLabelAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_LabelAnnotation)),
  shotPresenceLabelAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_LabelAnnotation)),
  frameLabelAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_LabelAnnotation)),
  faceAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_FaceAnnotation)),
  faceDetectionAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_FaceDetectionAnnotation)),
  shotAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_VideoSegment)),
  explicitAnnotation: Schema.optional(GoogleCloudVideointelligenceV1beta2_ExplicitContentAnnotation),
  speechTranscriptions: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_SpeechTranscription)),
  textAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_TextAnnotation)),
  objectAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_ObjectTrackingAnnotation)),
  logoRecognitionAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_LogoRecognitionAnnotation)),
  personDetectionAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_PersonDetectionAnnotation)),
  error: Schema.optional(GoogleRpc_Status),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_VideoAnnotationResults" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_VideoAnnotationResults>;

export interface GoogleCloudVideointelligenceV1beta2_AnnotateVideoResponse {
  /** Annotation results for all videos specified in `AnnotateVideoRequest`. */
  annotationResults?: Array<GoogleCloudVideointelligenceV1beta2_VideoAnnotationResults>;
}

export const GoogleCloudVideointelligenceV1beta2_AnnotateVideoResponse: Schema.Schema<GoogleCloudVideointelligenceV1beta2_AnnotateVideoResponse> = Schema.suspend(() => Schema.Struct({
  annotationResults: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_VideoAnnotationResults)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_AnnotateVideoResponse" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_AnnotateVideoResponse>;

export interface GoogleCloudVideointelligenceV1beta2_ExportToOutputUriStatus {
  /** Output only. State of the `output_uri` export. */
  state?: "STATE_UNSPECIFIED" | "SUCCEEDED" | "FAILED" | (string & {});
  /** Output only. Only set if state is FAILED. */
  status?: GoogleRpc_Status;
}

export const GoogleCloudVideointelligenceV1beta2_ExportToOutputUriStatus: Schema.Schema<GoogleCloudVideointelligenceV1beta2_ExportToOutputUriStatus> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  status: Schema.optional(GoogleRpc_Status),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_ExportToOutputUriStatus" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_ExportToOutputUriStatus>;

export interface GoogleCloudVideointelligenceV1beta2_VideoAnnotationProgress {
  /** Video file location in [Cloud Storage](https://cloud.google.com/storage/). */
  inputUri?: string;
  /** Approximate percentage processed thus far. Guaranteed to be 100 when fully processed. */
  progressPercent?: number;
  /** Time when the request was received. */
  startTime?: string;
  /** Time of the most recent update. */
  updateTime?: string;
  /** Specifies which feature is being tracked if the request contains more than one feature. */
  feature?: "FEATURE_UNSPECIFIED" | "LABEL_DETECTION" | "SHOT_CHANGE_DETECTION" | "EXPLICIT_CONTENT_DETECTION" | "FACE_DETECTION" | "SPEECH_TRANSCRIPTION" | "TEXT_DETECTION" | "OBJECT_TRACKING" | "LOGO_RECOGNITION" | "PERSON_DETECTION" | (string & {});
  /** Specifies which segment is being tracked if the request contains more than one segment. */
  segment?: GoogleCloudVideointelligenceV1beta2_VideoSegment;
  /** Status of exporting annotation response to user specified `output_uri`. Only set if `output_uri` is set in the request. */
  exportStatus?: GoogleCloudVideointelligenceV1beta2_ExportToOutputUriStatus;
}

export const GoogleCloudVideointelligenceV1beta2_VideoAnnotationProgress: Schema.Schema<GoogleCloudVideointelligenceV1beta2_VideoAnnotationProgress> = Schema.suspend(() => Schema.Struct({
  inputUri: Schema.optional(Schema.String),
  progressPercent: Schema.optional(Schema.Number),
  startTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  feature: Schema.optional(Schema.String),
  segment: Schema.optional(GoogleCloudVideointelligenceV1beta2_VideoSegment),
  exportStatus: Schema.optional(GoogleCloudVideointelligenceV1beta2_ExportToOutputUriStatus),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_VideoAnnotationProgress" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_VideoAnnotationProgress>;

export interface GoogleCloudVideointelligenceV1beta2_AnnotateVideoProgress {
  /** Progress metadata for all videos specified in `AnnotateVideoRequest`. */
  annotationProgress?: Array<GoogleCloudVideointelligenceV1beta2_VideoAnnotationProgress>;
}

export const GoogleCloudVideointelligenceV1beta2_AnnotateVideoProgress: Schema.Schema<GoogleCloudVideointelligenceV1beta2_AnnotateVideoProgress> = Schema.suspend(() => Schema.Struct({
  annotationProgress: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1beta2_VideoAnnotationProgress)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1beta2_AnnotateVideoProgress" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1beta2_AnnotateVideoProgress>;

export interface GoogleCloudVideointelligenceV1_Entity {
  /** Opaque entity ID. Some IDs may be available in [Google Knowledge Graph Search API](https://developers.google.com/knowledge-graph/). */
  entityId?: string;
  /** Textual description, e.g., `Fixed-gear bicycle`. */
  description?: string;
  /** Language code for `description` in BCP-47 format. */
  languageCode?: string;
}

export const GoogleCloudVideointelligenceV1_Entity: Schema.Schema<GoogleCloudVideointelligenceV1_Entity> = Schema.suspend(() => Schema.Struct({
  entityId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_Entity" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_Entity>;

export interface GoogleCloudVideointelligenceV1_LabelSegment {
  /** Video segment where a label was detected. */
  segment?: GoogleCloudVideointelligenceV1_VideoSegment;
  /** Confidence that the label is accurate. Range: [0, 1]. */
  confidence?: number;
}

export const GoogleCloudVideointelligenceV1_LabelSegment: Schema.Schema<GoogleCloudVideointelligenceV1_LabelSegment> = Schema.suspend(() => Schema.Struct({
  segment: Schema.optional(GoogleCloudVideointelligenceV1_VideoSegment),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_LabelSegment" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_LabelSegment>;

export interface GoogleCloudVideointelligenceV1_LabelFrame {
  /** Time-offset, relative to the beginning of the video, corresponding to the video frame for this location. */
  timeOffset?: string;
  /** Confidence that the label is accurate. Range: [0, 1]. */
  confidence?: number;
}

export const GoogleCloudVideointelligenceV1_LabelFrame: Schema.Schema<GoogleCloudVideointelligenceV1_LabelFrame> = Schema.suspend(() => Schema.Struct({
  timeOffset: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_LabelFrame" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_LabelFrame>;

export interface GoogleCloudVideointelligenceV1_LabelAnnotation {
  /** Detected entity. */
  entity?: GoogleCloudVideointelligenceV1_Entity;
  /** Common categories for the detected entity. For example, when the label is `Terrier`, the category is likely `dog`. And in some cases there might be more than one categories e.g., `Terrier` could also be a `pet`. */
  categoryEntities?: Array<GoogleCloudVideointelligenceV1_Entity>;
  /** All video segments where a label was detected. */
  segments?: Array<GoogleCloudVideointelligenceV1_LabelSegment>;
  /** All video frames where a label was detected. */
  frames?: Array<GoogleCloudVideointelligenceV1_LabelFrame>;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1_LabelAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1_LabelAnnotation> = Schema.suspend(() => Schema.Struct({
  entity: Schema.optional(GoogleCloudVideointelligenceV1_Entity),
  categoryEntities: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_Entity)),
  segments: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_LabelSegment)),
  frames: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_LabelFrame)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_LabelAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_LabelAnnotation>;

export interface GoogleCloudVideointelligenceV1_FaceSegment {
  /** Video segment where a face was detected. */
  segment?: GoogleCloudVideointelligenceV1_VideoSegment;
}

export const GoogleCloudVideointelligenceV1_FaceSegment: Schema.Schema<GoogleCloudVideointelligenceV1_FaceSegment> = Schema.suspend(() => Schema.Struct({
  segment: Schema.optional(GoogleCloudVideointelligenceV1_VideoSegment),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_FaceSegment" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_FaceSegment>;

export interface GoogleCloudVideointelligenceV1_NormalizedBoundingBox {
  /** Left X coordinate. */
  left?: number;
  /** Top Y coordinate. */
  top?: number;
  /** Right X coordinate. */
  right?: number;
  /** Bottom Y coordinate. */
  bottom?: number;
}

export const GoogleCloudVideointelligenceV1_NormalizedBoundingBox: Schema.Schema<GoogleCloudVideointelligenceV1_NormalizedBoundingBox> = Schema.suspend(() => Schema.Struct({
  left: Schema.optional(Schema.Number),
  top: Schema.optional(Schema.Number),
  right: Schema.optional(Schema.Number),
  bottom: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_NormalizedBoundingBox" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_NormalizedBoundingBox>;

export interface GoogleCloudVideointelligenceV1_FaceFrame {
  /** Normalized Bounding boxes in a frame. There can be more than one boxes if the same face is detected in multiple locations within the current frame. */
  normalizedBoundingBoxes?: Array<GoogleCloudVideointelligenceV1_NormalizedBoundingBox>;
  /** Time-offset, relative to the beginning of the video, corresponding to the video frame for this location. */
  timeOffset?: string;
}

export const GoogleCloudVideointelligenceV1_FaceFrame: Schema.Schema<GoogleCloudVideointelligenceV1_FaceFrame> = Schema.suspend(() => Schema.Struct({
  normalizedBoundingBoxes: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_NormalizedBoundingBox)),
  timeOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_FaceFrame" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_FaceFrame>;

export interface GoogleCloudVideointelligenceV1_FaceAnnotation {
  /** Thumbnail of a representative face view (in JPEG format). */
  thumbnail?: string;
  /** All video segments where a face was detected. */
  segments?: Array<GoogleCloudVideointelligenceV1_FaceSegment>;
  /** All video frames where a face was detected. */
  frames?: Array<GoogleCloudVideointelligenceV1_FaceFrame>;
}

export const GoogleCloudVideointelligenceV1_FaceAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1_FaceAnnotation> = Schema.suspend(() => Schema.Struct({
  thumbnail: Schema.optional(Schema.String),
  segments: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_FaceSegment)),
  frames: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_FaceFrame)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_FaceAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_FaceAnnotation>;

export interface GoogleCloudVideointelligenceV1_DetectedAttribute {
  /** The name of the attribute, for example, glasses, dark_glasses, mouth_open. A full list of supported type names will be provided in the document. */
  name?: string;
  /** Detected attribute confidence. Range [0, 1]. */
  confidence?: number;
  /** Text value of the detection result. For example, the value for "HairColor" can be "black", "blonde", etc. */
  value?: string;
}

export const GoogleCloudVideointelligenceV1_DetectedAttribute: Schema.Schema<GoogleCloudVideointelligenceV1_DetectedAttribute> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_DetectedAttribute" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_DetectedAttribute>;

export interface GoogleCloudVideointelligenceV1_NormalizedVertex {
  /** X coordinate. */
  x?: number;
  /** Y coordinate. */
  y?: number;
}

export const GoogleCloudVideointelligenceV1_NormalizedVertex: Schema.Schema<GoogleCloudVideointelligenceV1_NormalizedVertex> = Schema.suspend(() => Schema.Struct({
  x: Schema.optional(Schema.Number),
  y: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_NormalizedVertex" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_NormalizedVertex>;

export interface GoogleCloudVideointelligenceV1_DetectedLandmark {
  /** The name of this landmark, for example, left_hand, right_shoulder. */
  name?: string;
  /** The 2D point of the detected landmark using the normalized image coordinate system. The normalized coordinates have the range from 0 to 1. */
  point?: GoogleCloudVideointelligenceV1_NormalizedVertex;
  /** The confidence score of the detected landmark. Range [0, 1]. */
  confidence?: number;
}

export const GoogleCloudVideointelligenceV1_DetectedLandmark: Schema.Schema<GoogleCloudVideointelligenceV1_DetectedLandmark> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  point: Schema.optional(GoogleCloudVideointelligenceV1_NormalizedVertex),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_DetectedLandmark" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_DetectedLandmark>;

export interface GoogleCloudVideointelligenceV1_TimestampedObject {
  /** Normalized Bounding box in a frame, where the object is located. */
  normalizedBoundingBox?: GoogleCloudVideointelligenceV1_NormalizedBoundingBox;
  /** Time-offset, relative to the beginning of the video, corresponding to the video frame for this object. */
  timeOffset?: string;
  /** Optional. The attributes of the object in the bounding box. */
  attributes?: Array<GoogleCloudVideointelligenceV1_DetectedAttribute>;
  /** Optional. The detected landmarks. */
  landmarks?: Array<GoogleCloudVideointelligenceV1_DetectedLandmark>;
}

export const GoogleCloudVideointelligenceV1_TimestampedObject: Schema.Schema<GoogleCloudVideointelligenceV1_TimestampedObject> = Schema.suspend(() => Schema.Struct({
  normalizedBoundingBox: Schema.optional(GoogleCloudVideointelligenceV1_NormalizedBoundingBox),
  timeOffset: Schema.optional(Schema.String),
  attributes: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_DetectedAttribute)),
  landmarks: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_DetectedLandmark)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_TimestampedObject" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_TimestampedObject>;

export interface GoogleCloudVideointelligenceV1_Track {
  /** Video segment of a track. */
  segment?: GoogleCloudVideointelligenceV1_VideoSegment;
  /** The object with timestamp and attributes per frame in the track. */
  timestampedObjects?: Array<GoogleCloudVideointelligenceV1_TimestampedObject>;
  /** Optional. Attributes in the track level. */
  attributes?: Array<GoogleCloudVideointelligenceV1_DetectedAttribute>;
  /** Optional. The confidence score of the tracked object. */
  confidence?: number;
}

export const GoogleCloudVideointelligenceV1_Track: Schema.Schema<GoogleCloudVideointelligenceV1_Track> = Schema.suspend(() => Schema.Struct({
  segment: Schema.optional(GoogleCloudVideointelligenceV1_VideoSegment),
  timestampedObjects: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_TimestampedObject)),
  attributes: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_DetectedAttribute)),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_Track" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_Track>;

export interface GoogleCloudVideointelligenceV1_FaceDetectionAnnotation {
  /** The face tracks with attributes. */
  tracks?: Array<GoogleCloudVideointelligenceV1_Track>;
  /** The thumbnail of a person's face. */
  thumbnail?: string;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1_FaceDetectionAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1_FaceDetectionAnnotation> = Schema.suspend(() => Schema.Struct({
  tracks: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_Track)),
  thumbnail: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_FaceDetectionAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_FaceDetectionAnnotation>;

export interface GoogleCloudVideointelligenceV1_ExplicitContentFrame {
  /** Time-offset, relative to the beginning of the video, corresponding to the video frame for this location. */
  timeOffset?: string;
  /** Likelihood of the pornography content.. */
  pornographyLikelihood?: "LIKELIHOOD_UNSPECIFIED" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
}

export const GoogleCloudVideointelligenceV1_ExplicitContentFrame: Schema.Schema<GoogleCloudVideointelligenceV1_ExplicitContentFrame> = Schema.suspend(() => Schema.Struct({
  timeOffset: Schema.optional(Schema.String),
  pornographyLikelihood: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_ExplicitContentFrame" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_ExplicitContentFrame>;

export interface GoogleCloudVideointelligenceV1_ExplicitContentAnnotation {
  /** All video frames where explicit content was detected. */
  frames?: Array<GoogleCloudVideointelligenceV1_ExplicitContentFrame>;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1_ExplicitContentAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1_ExplicitContentAnnotation> = Schema.suspend(() => Schema.Struct({
  frames: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_ExplicitContentFrame)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_ExplicitContentAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_ExplicitContentAnnotation>;

export interface GoogleCloudVideointelligenceV1_WordInfo {
  /** Time offset relative to the beginning of the audio, and corresponding to the start of the spoken word. This field is only set if `enable_word_time_offsets=true` and only in the top hypothesis. This is an experimental feature and the accuracy of the time offset can vary. */
  startTime?: string;
  /** Time offset relative to the beginning of the audio, and corresponding to the end of the spoken word. This field is only set if `enable_word_time_offsets=true` and only in the top hypothesis. This is an experimental feature and the accuracy of the time offset can vary. */
  endTime?: string;
  /** The word corresponding to this set of information. */
  word?: string;
  /** Output only. The confidence estimate between 0.0 and 1.0. A higher number indicates an estimated greater likelihood that the recognized words are correct. This field is set only for the top alternative. This field is not guaranteed to be accurate and users should not rely on it to be always provided. The default of 0.0 is a sentinel value indicating `confidence` was not set. */
  confidence?: number;
  /** Output only. A distinct integer value is assigned for every speaker within the audio. This field specifies which one of those speakers was detected to have spoken this word. Value ranges from 1 up to diarization_speaker_count, and is only set if speaker diarization is enabled. */
  speakerTag?: number;
}

export const GoogleCloudVideointelligenceV1_WordInfo: Schema.Schema<GoogleCloudVideointelligenceV1_WordInfo> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  word: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  speakerTag: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_WordInfo" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_WordInfo>;

export interface GoogleCloudVideointelligenceV1_SpeechRecognitionAlternative {
  /** Transcript text representing the words that the user spoke. */
  transcript?: string;
  /** Output only. The confidence estimate between 0.0 and 1.0. A higher number indicates an estimated greater likelihood that the recognized words are correct. This field is set only for the top alternative. This field is not guaranteed to be accurate and users should not rely on it to be always provided. The default of 0.0 is a sentinel value indicating `confidence` was not set. */
  confidence?: number;
  /** Output only. A list of word-specific information for each recognized word. Note: When `enable_speaker_diarization` is set to true, you will see all the words from the beginning of the audio. */
  words?: Array<GoogleCloudVideointelligenceV1_WordInfo>;
}

export const GoogleCloudVideointelligenceV1_SpeechRecognitionAlternative: Schema.Schema<GoogleCloudVideointelligenceV1_SpeechRecognitionAlternative> = Schema.suspend(() => Schema.Struct({
  transcript: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  words: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_WordInfo)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_SpeechRecognitionAlternative" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_SpeechRecognitionAlternative>;

export interface GoogleCloudVideointelligenceV1_SpeechTranscription {
  /** May contain one or more recognition hypotheses (up to the maximum specified in `max_alternatives`). These alternatives are ordered in terms of accuracy, with the top (first) alternative being the most probable, as ranked by the recognizer. */
  alternatives?: Array<GoogleCloudVideointelligenceV1_SpeechRecognitionAlternative>;
  /** Output only. The [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) language tag of the language in this result. This language code was detected to have the most likelihood of being spoken in the audio. */
  languageCode?: string;
}

export const GoogleCloudVideointelligenceV1_SpeechTranscription: Schema.Schema<GoogleCloudVideointelligenceV1_SpeechTranscription> = Schema.suspend(() => Schema.Struct({
  alternatives: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_SpeechRecognitionAlternative)),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_SpeechTranscription" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_SpeechTranscription>;

export interface GoogleCloudVideointelligenceV1_NormalizedBoundingPoly {
  /** Normalized vertices of the bounding polygon. */
  vertices?: Array<GoogleCloudVideointelligenceV1_NormalizedVertex>;
}

export const GoogleCloudVideointelligenceV1_NormalizedBoundingPoly: Schema.Schema<GoogleCloudVideointelligenceV1_NormalizedBoundingPoly> = Schema.suspend(() => Schema.Struct({
  vertices: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_NormalizedVertex)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_NormalizedBoundingPoly" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_NormalizedBoundingPoly>;

export interface GoogleCloudVideointelligenceV1_TextFrame {
  /** Bounding polygon of the detected text for this frame. */
  rotatedBoundingBox?: GoogleCloudVideointelligenceV1_NormalizedBoundingPoly;
  /** Timestamp of this frame. */
  timeOffset?: string;
}

export const GoogleCloudVideointelligenceV1_TextFrame: Schema.Schema<GoogleCloudVideointelligenceV1_TextFrame> = Schema.suspend(() => Schema.Struct({
  rotatedBoundingBox: Schema.optional(GoogleCloudVideointelligenceV1_NormalizedBoundingPoly),
  timeOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_TextFrame" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_TextFrame>;

export interface GoogleCloudVideointelligenceV1_TextSegment {
  /** Video segment where a text snippet was detected. */
  segment?: GoogleCloudVideointelligenceV1_VideoSegment;
  /** Confidence for the track of detected text. It is calculated as the highest over all frames where OCR detected text appears. */
  confidence?: number;
  /** Information related to the frames where OCR detected text appears. */
  frames?: Array<GoogleCloudVideointelligenceV1_TextFrame>;
}

export const GoogleCloudVideointelligenceV1_TextSegment: Schema.Schema<GoogleCloudVideointelligenceV1_TextSegment> = Schema.suspend(() => Schema.Struct({
  segment: Schema.optional(GoogleCloudVideointelligenceV1_VideoSegment),
  confidence: Schema.optional(Schema.Number),
  frames: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_TextFrame)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_TextSegment" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_TextSegment>;

export interface GoogleCloudVideointelligenceV1_TextAnnotation {
  /** The detected text. */
  text?: string;
  /** All video segments where OCR detected text appears. */
  segments?: Array<GoogleCloudVideointelligenceV1_TextSegment>;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1_TextAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1_TextAnnotation> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  segments: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_TextSegment)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_TextAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_TextAnnotation>;

export interface GoogleCloudVideointelligenceV1_ObjectTrackingFrame {
  /** The normalized bounding box location of this object track for the frame. */
  normalizedBoundingBox?: GoogleCloudVideointelligenceV1_NormalizedBoundingBox;
  /** The timestamp of the frame in microseconds. */
  timeOffset?: string;
}

export const GoogleCloudVideointelligenceV1_ObjectTrackingFrame: Schema.Schema<GoogleCloudVideointelligenceV1_ObjectTrackingFrame> = Schema.suspend(() => Schema.Struct({
  normalizedBoundingBox: Schema.optional(GoogleCloudVideointelligenceV1_NormalizedBoundingBox),
  timeOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_ObjectTrackingFrame" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_ObjectTrackingFrame>;

export interface GoogleCloudVideointelligenceV1_ObjectTrackingAnnotation {
  /** Non-streaming batch mode ONLY. Each object track corresponds to one video segment where it appears. */
  segment?: GoogleCloudVideointelligenceV1_VideoSegment;
  /** Streaming mode ONLY. In streaming mode, we do not know the end time of a tracked object before it is completed. Hence, there is no VideoSegment info returned. Instead, we provide a unique identifiable integer track_id so that the customers can correlate the results of the ongoing ObjectTrackAnnotation of the same track_id over time. */
  trackId?: string;
  /** Entity to specify the object category that this track is labeled as. */
  entity?: GoogleCloudVideointelligenceV1_Entity;
  /** Object category's labeling confidence of this track. */
  confidence?: number;
  /** Information corresponding to all frames where this object track appears. Non-streaming batch mode: it may be one or multiple ObjectTrackingFrame messages in frames. Streaming mode: it can only be one ObjectTrackingFrame message in frames. */
  frames?: Array<GoogleCloudVideointelligenceV1_ObjectTrackingFrame>;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1_ObjectTrackingAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1_ObjectTrackingAnnotation> = Schema.suspend(() => Schema.Struct({
  segment: Schema.optional(GoogleCloudVideointelligenceV1_VideoSegment),
  trackId: Schema.optional(Schema.String),
  entity: Schema.optional(GoogleCloudVideointelligenceV1_Entity),
  confidence: Schema.optional(Schema.Number),
  frames: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_ObjectTrackingFrame)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_ObjectTrackingAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_ObjectTrackingAnnotation>;

export interface GoogleCloudVideointelligenceV1_LogoRecognitionAnnotation {
  /** Entity category information to specify the logo class that all the logo tracks within this LogoRecognitionAnnotation are recognized as. */
  entity?: GoogleCloudVideointelligenceV1_Entity;
  /** All logo tracks where the recognized logo appears. Each track corresponds to one logo instance appearing in consecutive frames. */
  tracks?: Array<GoogleCloudVideointelligenceV1_Track>;
  /** All video segments where the recognized logo appears. There might be multiple instances of the same logo class appearing in one VideoSegment. */
  segments?: Array<GoogleCloudVideointelligenceV1_VideoSegment>;
}

export const GoogleCloudVideointelligenceV1_LogoRecognitionAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1_LogoRecognitionAnnotation> = Schema.suspend(() => Schema.Struct({
  entity: Schema.optional(GoogleCloudVideointelligenceV1_Entity),
  tracks: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_Track)),
  segments: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_VideoSegment)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_LogoRecognitionAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_LogoRecognitionAnnotation>;

export interface GoogleCloudVideointelligenceV1_PersonDetectionAnnotation {
  /** The detected tracks of a person. */
  tracks?: Array<GoogleCloudVideointelligenceV1_Track>;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1_PersonDetectionAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1_PersonDetectionAnnotation> = Schema.suspend(() => Schema.Struct({
  tracks: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_Track)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_PersonDetectionAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_PersonDetectionAnnotation>;

export interface GoogleCloudVideointelligenceV1_VideoAnnotationResults {
  /** Video file location in [Cloud Storage](https://cloud.google.com/storage/). */
  inputUri?: string;
  /** Video segment on which the annotation is run. */
  segment?: GoogleCloudVideointelligenceV1_VideoSegment;
  /** Topical label annotations on video level or user-specified segment level. There is exactly one element for each unique label. */
  segmentLabelAnnotations?: Array<GoogleCloudVideointelligenceV1_LabelAnnotation>;
  /** Presence label annotations on video level or user-specified segment level. There is exactly one element for each unique label. Compared to the existing topical `segment_label_annotations`, this field presents more fine-grained, segment-level labels detected in video content and is made available only when the client sets `LabelDetectionConfig.model` to "builtin/latest" in the request. */
  segmentPresenceLabelAnnotations?: Array<GoogleCloudVideointelligenceV1_LabelAnnotation>;
  /** Topical label annotations on shot level. There is exactly one element for each unique label. */
  shotLabelAnnotations?: Array<GoogleCloudVideointelligenceV1_LabelAnnotation>;
  /** Presence label annotations on shot level. There is exactly one element for each unique label. Compared to the existing topical `shot_label_annotations`, this field presents more fine-grained, shot-level labels detected in video content and is made available only when the client sets `LabelDetectionConfig.model` to "builtin/latest" in the request. */
  shotPresenceLabelAnnotations?: Array<GoogleCloudVideointelligenceV1_LabelAnnotation>;
  /** Label annotations on frame level. There is exactly one element for each unique label. */
  frameLabelAnnotations?: Array<GoogleCloudVideointelligenceV1_LabelAnnotation>;
  /** Deprecated. Please use `face_detection_annotations` instead. */
  faceAnnotations?: Array<GoogleCloudVideointelligenceV1_FaceAnnotation>;
  /** Face detection annotations. */
  faceDetectionAnnotations?: Array<GoogleCloudVideointelligenceV1_FaceDetectionAnnotation>;
  /** Shot annotations. Each shot is represented as a video segment. */
  shotAnnotations?: Array<GoogleCloudVideointelligenceV1_VideoSegment>;
  /** Explicit content annotation. */
  explicitAnnotation?: GoogleCloudVideointelligenceV1_ExplicitContentAnnotation;
  /** Speech transcription. */
  speechTranscriptions?: Array<GoogleCloudVideointelligenceV1_SpeechTranscription>;
  /** OCR text detection and tracking. Annotations for list of detected text snippets. Each will have list of frame information associated with it. */
  textAnnotations?: Array<GoogleCloudVideointelligenceV1_TextAnnotation>;
  /** Annotations for list of objects detected and tracked in video. */
  objectAnnotations?: Array<GoogleCloudVideointelligenceV1_ObjectTrackingAnnotation>;
  /** Annotations for list of logos detected, tracked and recognized in video. */
  logoRecognitionAnnotations?: Array<GoogleCloudVideointelligenceV1_LogoRecognitionAnnotation>;
  /** Person detection annotations. */
  personDetectionAnnotations?: Array<GoogleCloudVideointelligenceV1_PersonDetectionAnnotation>;
  /** If set, indicates an error. Note that for a single `AnnotateVideoRequest` some videos may succeed and some may fail. */
  error?: GoogleRpc_Status;
}

export const GoogleCloudVideointelligenceV1_VideoAnnotationResults: Schema.Schema<GoogleCloudVideointelligenceV1_VideoAnnotationResults> = Schema.suspend(() => Schema.Struct({
  inputUri: Schema.optional(Schema.String),
  segment: Schema.optional(GoogleCloudVideointelligenceV1_VideoSegment),
  segmentLabelAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_LabelAnnotation)),
  segmentPresenceLabelAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_LabelAnnotation)),
  shotLabelAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_LabelAnnotation)),
  shotPresenceLabelAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_LabelAnnotation)),
  frameLabelAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_LabelAnnotation)),
  faceAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_FaceAnnotation)),
  faceDetectionAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_FaceDetectionAnnotation)),
  shotAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_VideoSegment)),
  explicitAnnotation: Schema.optional(GoogleCloudVideointelligenceV1_ExplicitContentAnnotation),
  speechTranscriptions: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_SpeechTranscription)),
  textAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_TextAnnotation)),
  objectAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_ObjectTrackingAnnotation)),
  logoRecognitionAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_LogoRecognitionAnnotation)),
  personDetectionAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_PersonDetectionAnnotation)),
  error: Schema.optional(GoogleRpc_Status),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_VideoAnnotationResults" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_VideoAnnotationResults>;

export interface GoogleCloudVideointelligenceV1_AnnotateVideoResponse {
  /** Annotation results for all videos specified in `AnnotateVideoRequest`. */
  annotationResults?: Array<GoogleCloudVideointelligenceV1_VideoAnnotationResults>;
}

export const GoogleCloudVideointelligenceV1_AnnotateVideoResponse: Schema.Schema<GoogleCloudVideointelligenceV1_AnnotateVideoResponse> = Schema.suspend(() => Schema.Struct({
  annotationResults: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_VideoAnnotationResults)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_AnnotateVideoResponse" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_AnnotateVideoResponse>;

export interface GoogleCloudVideointelligenceV1_ExportToOutputUriStatus {
  /** Output only. State of the `output_uri` export. */
  state?: "STATE_UNSPECIFIED" | "SUCCEEDED" | "FAILED" | (string & {});
  /** Output only. Only set if state is FAILED. */
  status?: GoogleRpc_Status;
}

export const GoogleCloudVideointelligenceV1_ExportToOutputUriStatus: Schema.Schema<GoogleCloudVideointelligenceV1_ExportToOutputUriStatus> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  status: Schema.optional(GoogleRpc_Status),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_ExportToOutputUriStatus" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_ExportToOutputUriStatus>;

export interface GoogleCloudVideointelligenceV1_VideoAnnotationProgress {
  /** Video file location in [Cloud Storage](https://cloud.google.com/storage/). */
  inputUri?: string;
  /** Approximate percentage processed thus far. Guaranteed to be 100 when fully processed. */
  progressPercent?: number;
  /** Time when the request was received. */
  startTime?: string;
  /** Time of the most recent update. */
  updateTime?: string;
  /** Specifies which feature is being tracked if the request contains more than one feature. */
  feature?: "FEATURE_UNSPECIFIED" | "LABEL_DETECTION" | "SHOT_CHANGE_DETECTION" | "EXPLICIT_CONTENT_DETECTION" | "FACE_DETECTION" | "SPEECH_TRANSCRIPTION" | "TEXT_DETECTION" | "OBJECT_TRACKING" | "LOGO_RECOGNITION" | "PERSON_DETECTION" | (string & {});
  /** Specifies which segment is being tracked if the request contains more than one segment. */
  segment?: GoogleCloudVideointelligenceV1_VideoSegment;
  /** Status of exporting annotation response to user specified `output_uri`. Only set if `output_uri` is set in the request. */
  exportStatus?: GoogleCloudVideointelligenceV1_ExportToOutputUriStatus;
}

export const GoogleCloudVideointelligenceV1_VideoAnnotationProgress: Schema.Schema<GoogleCloudVideointelligenceV1_VideoAnnotationProgress> = Schema.suspend(() => Schema.Struct({
  inputUri: Schema.optional(Schema.String),
  progressPercent: Schema.optional(Schema.Number),
  startTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  feature: Schema.optional(Schema.String),
  segment: Schema.optional(GoogleCloudVideointelligenceV1_VideoSegment),
  exportStatus: Schema.optional(GoogleCloudVideointelligenceV1_ExportToOutputUriStatus),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_VideoAnnotationProgress" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_VideoAnnotationProgress>;

export interface GoogleCloudVideointelligenceV1_AnnotateVideoProgress {
  /** Progress metadata for all videos specified in `AnnotateVideoRequest`. */
  annotationProgress?: Array<GoogleCloudVideointelligenceV1_VideoAnnotationProgress>;
}

export const GoogleCloudVideointelligenceV1_AnnotateVideoProgress: Schema.Schema<GoogleCloudVideointelligenceV1_AnnotateVideoProgress> = Schema.suspend(() => Schema.Struct({
  annotationProgress: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1_VideoAnnotationProgress)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1_AnnotateVideoProgress" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1_AnnotateVideoProgress>;

export interface GoogleCloudVideointelligenceV1p1beta1_VideoSegment {
  /** Time-offset, relative to the beginning of the video, corresponding to the start of the segment (inclusive). */
  startTimeOffset?: string;
  /** Time-offset, relative to the beginning of the video, corresponding to the end of the segment (inclusive). */
  endTimeOffset?: string;
}

export const GoogleCloudVideointelligenceV1p1beta1_VideoSegment: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_VideoSegment> = Schema.suspend(() => Schema.Struct({
  startTimeOffset: Schema.optional(Schema.String),
  endTimeOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_VideoSegment" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_VideoSegment>;

export interface GoogleCloudVideointelligenceV1p1beta1_Entity {
  /** Opaque entity ID. Some IDs may be available in [Google Knowledge Graph Search API](https://developers.google.com/knowledge-graph/). */
  entityId?: string;
  /** Textual description, e.g., `Fixed-gear bicycle`. */
  description?: string;
  /** Language code for `description` in BCP-47 format. */
  languageCode?: string;
}

export const GoogleCloudVideointelligenceV1p1beta1_Entity: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_Entity> = Schema.suspend(() => Schema.Struct({
  entityId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_Entity" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_Entity>;

export interface GoogleCloudVideointelligenceV1p1beta1_LabelSegment {
  /** Video segment where a label was detected. */
  segment?: GoogleCloudVideointelligenceV1p1beta1_VideoSegment;
  /** Confidence that the label is accurate. Range: [0, 1]. */
  confidence?: number;
}

export const GoogleCloudVideointelligenceV1p1beta1_LabelSegment: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_LabelSegment> = Schema.suspend(() => Schema.Struct({
  segment: Schema.optional(GoogleCloudVideointelligenceV1p1beta1_VideoSegment),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_LabelSegment" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_LabelSegment>;

export interface GoogleCloudVideointelligenceV1p1beta1_LabelFrame {
  /** Time-offset, relative to the beginning of the video, corresponding to the video frame for this location. */
  timeOffset?: string;
  /** Confidence that the label is accurate. Range: [0, 1]. */
  confidence?: number;
}

export const GoogleCloudVideointelligenceV1p1beta1_LabelFrame: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_LabelFrame> = Schema.suspend(() => Schema.Struct({
  timeOffset: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_LabelFrame" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_LabelFrame>;

export interface GoogleCloudVideointelligenceV1p1beta1_LabelAnnotation {
  /** Detected entity. */
  entity?: GoogleCloudVideointelligenceV1p1beta1_Entity;
  /** Common categories for the detected entity. For example, when the label is `Terrier`, the category is likely `dog`. And in some cases there might be more than one categories e.g., `Terrier` could also be a `pet`. */
  categoryEntities?: Array<GoogleCloudVideointelligenceV1p1beta1_Entity>;
  /** All video segments where a label was detected. */
  segments?: Array<GoogleCloudVideointelligenceV1p1beta1_LabelSegment>;
  /** All video frames where a label was detected. */
  frames?: Array<GoogleCloudVideointelligenceV1p1beta1_LabelFrame>;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1p1beta1_LabelAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_LabelAnnotation> = Schema.suspend(() => Schema.Struct({
  entity: Schema.optional(GoogleCloudVideointelligenceV1p1beta1_Entity),
  categoryEntities: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_Entity)),
  segments: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_LabelSegment)),
  frames: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_LabelFrame)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_LabelAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_LabelAnnotation>;

export interface GoogleCloudVideointelligenceV1p1beta1_FaceSegment {
  /** Video segment where a face was detected. */
  segment?: GoogleCloudVideointelligenceV1p1beta1_VideoSegment;
}

export const GoogleCloudVideointelligenceV1p1beta1_FaceSegment: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_FaceSegment> = Schema.suspend(() => Schema.Struct({
  segment: Schema.optional(GoogleCloudVideointelligenceV1p1beta1_VideoSegment),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_FaceSegment" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_FaceSegment>;

export interface GoogleCloudVideointelligenceV1p1beta1_NormalizedBoundingBox {
  /** Left X coordinate. */
  left?: number;
  /** Top Y coordinate. */
  top?: number;
  /** Right X coordinate. */
  right?: number;
  /** Bottom Y coordinate. */
  bottom?: number;
}

export const GoogleCloudVideointelligenceV1p1beta1_NormalizedBoundingBox: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_NormalizedBoundingBox> = Schema.suspend(() => Schema.Struct({
  left: Schema.optional(Schema.Number),
  top: Schema.optional(Schema.Number),
  right: Schema.optional(Schema.Number),
  bottom: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_NormalizedBoundingBox" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_NormalizedBoundingBox>;

export interface GoogleCloudVideointelligenceV1p1beta1_FaceFrame {
  /** Normalized Bounding boxes in a frame. There can be more than one boxes if the same face is detected in multiple locations within the current frame. */
  normalizedBoundingBoxes?: Array<GoogleCloudVideointelligenceV1p1beta1_NormalizedBoundingBox>;
  /** Time-offset, relative to the beginning of the video, corresponding to the video frame for this location. */
  timeOffset?: string;
}

export const GoogleCloudVideointelligenceV1p1beta1_FaceFrame: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_FaceFrame> = Schema.suspend(() => Schema.Struct({
  normalizedBoundingBoxes: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_NormalizedBoundingBox)),
  timeOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_FaceFrame" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_FaceFrame>;

export interface GoogleCloudVideointelligenceV1p1beta1_FaceAnnotation {
  /** Thumbnail of a representative face view (in JPEG format). */
  thumbnail?: string;
  /** All video segments where a face was detected. */
  segments?: Array<GoogleCloudVideointelligenceV1p1beta1_FaceSegment>;
  /** All video frames where a face was detected. */
  frames?: Array<GoogleCloudVideointelligenceV1p1beta1_FaceFrame>;
}

export const GoogleCloudVideointelligenceV1p1beta1_FaceAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_FaceAnnotation> = Schema.suspend(() => Schema.Struct({
  thumbnail: Schema.optional(Schema.String),
  segments: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_FaceSegment)),
  frames: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_FaceFrame)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_FaceAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_FaceAnnotation>;

export interface GoogleCloudVideointelligenceV1p1beta1_DetectedAttribute {
  /** The name of the attribute, for example, glasses, dark_glasses, mouth_open. A full list of supported type names will be provided in the document. */
  name?: string;
  /** Detected attribute confidence. Range [0, 1]. */
  confidence?: number;
  /** Text value of the detection result. For example, the value for "HairColor" can be "black", "blonde", etc. */
  value?: string;
}

export const GoogleCloudVideointelligenceV1p1beta1_DetectedAttribute: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_DetectedAttribute> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_DetectedAttribute" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_DetectedAttribute>;

export interface GoogleCloudVideointelligenceV1p1beta1_NormalizedVertex {
  /** X coordinate. */
  x?: number;
  /** Y coordinate. */
  y?: number;
}

export const GoogleCloudVideointelligenceV1p1beta1_NormalizedVertex: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_NormalizedVertex> = Schema.suspend(() => Schema.Struct({
  x: Schema.optional(Schema.Number),
  y: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_NormalizedVertex" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_NormalizedVertex>;

export interface GoogleCloudVideointelligenceV1p1beta1_DetectedLandmark {
  /** The name of this landmark, for example, left_hand, right_shoulder. */
  name?: string;
  /** The 2D point of the detected landmark using the normalized image coordinate system. The normalized coordinates have the range from 0 to 1. */
  point?: GoogleCloudVideointelligenceV1p1beta1_NormalizedVertex;
  /** The confidence score of the detected landmark. Range [0, 1]. */
  confidence?: number;
}

export const GoogleCloudVideointelligenceV1p1beta1_DetectedLandmark: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_DetectedLandmark> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  point: Schema.optional(GoogleCloudVideointelligenceV1p1beta1_NormalizedVertex),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_DetectedLandmark" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_DetectedLandmark>;

export interface GoogleCloudVideointelligenceV1p1beta1_TimestampedObject {
  /** Normalized Bounding box in a frame, where the object is located. */
  normalizedBoundingBox?: GoogleCloudVideointelligenceV1p1beta1_NormalizedBoundingBox;
  /** Time-offset, relative to the beginning of the video, corresponding to the video frame for this object. */
  timeOffset?: string;
  /** Optional. The attributes of the object in the bounding box. */
  attributes?: Array<GoogleCloudVideointelligenceV1p1beta1_DetectedAttribute>;
  /** Optional. The detected landmarks. */
  landmarks?: Array<GoogleCloudVideointelligenceV1p1beta1_DetectedLandmark>;
}

export const GoogleCloudVideointelligenceV1p1beta1_TimestampedObject: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_TimestampedObject> = Schema.suspend(() => Schema.Struct({
  normalizedBoundingBox: Schema.optional(GoogleCloudVideointelligenceV1p1beta1_NormalizedBoundingBox),
  timeOffset: Schema.optional(Schema.String),
  attributes: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_DetectedAttribute)),
  landmarks: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_DetectedLandmark)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_TimestampedObject" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_TimestampedObject>;

export interface GoogleCloudVideointelligenceV1p1beta1_Track {
  /** Video segment of a track. */
  segment?: GoogleCloudVideointelligenceV1p1beta1_VideoSegment;
  /** The object with timestamp and attributes per frame in the track. */
  timestampedObjects?: Array<GoogleCloudVideointelligenceV1p1beta1_TimestampedObject>;
  /** Optional. Attributes in the track level. */
  attributes?: Array<GoogleCloudVideointelligenceV1p1beta1_DetectedAttribute>;
  /** Optional. The confidence score of the tracked object. */
  confidence?: number;
}

export const GoogleCloudVideointelligenceV1p1beta1_Track: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_Track> = Schema.suspend(() => Schema.Struct({
  segment: Schema.optional(GoogleCloudVideointelligenceV1p1beta1_VideoSegment),
  timestampedObjects: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_TimestampedObject)),
  attributes: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_DetectedAttribute)),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_Track" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_Track>;

export interface GoogleCloudVideointelligenceV1p1beta1_FaceDetectionAnnotation {
  /** The face tracks with attributes. */
  tracks?: Array<GoogleCloudVideointelligenceV1p1beta1_Track>;
  /** The thumbnail of a person's face. */
  thumbnail?: string;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1p1beta1_FaceDetectionAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_FaceDetectionAnnotation> = Schema.suspend(() => Schema.Struct({
  tracks: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_Track)),
  thumbnail: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_FaceDetectionAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_FaceDetectionAnnotation>;

export interface GoogleCloudVideointelligenceV1p1beta1_ExplicitContentFrame {
  /** Time-offset, relative to the beginning of the video, corresponding to the video frame for this location. */
  timeOffset?: string;
  /** Likelihood of the pornography content.. */
  pornographyLikelihood?: "LIKELIHOOD_UNSPECIFIED" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
}

export const GoogleCloudVideointelligenceV1p1beta1_ExplicitContentFrame: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_ExplicitContentFrame> = Schema.suspend(() => Schema.Struct({
  timeOffset: Schema.optional(Schema.String),
  pornographyLikelihood: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_ExplicitContentFrame" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_ExplicitContentFrame>;

export interface GoogleCloudVideointelligenceV1p1beta1_ExplicitContentAnnotation {
  /** All video frames where explicit content was detected. */
  frames?: Array<GoogleCloudVideointelligenceV1p1beta1_ExplicitContentFrame>;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1p1beta1_ExplicitContentAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_ExplicitContentAnnotation> = Schema.suspend(() => Schema.Struct({
  frames: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_ExplicitContentFrame)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_ExplicitContentAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_ExplicitContentAnnotation>;

export interface GoogleCloudVideointelligenceV1p1beta1_WordInfo {
  /** Time offset relative to the beginning of the audio, and corresponding to the start of the spoken word. This field is only set if `enable_word_time_offsets=true` and only in the top hypothesis. This is an experimental feature and the accuracy of the time offset can vary. */
  startTime?: string;
  /** Time offset relative to the beginning of the audio, and corresponding to the end of the spoken word. This field is only set if `enable_word_time_offsets=true` and only in the top hypothesis. This is an experimental feature and the accuracy of the time offset can vary. */
  endTime?: string;
  /** The word corresponding to this set of information. */
  word?: string;
  /** Output only. The confidence estimate between 0.0 and 1.0. A higher number indicates an estimated greater likelihood that the recognized words are correct. This field is set only for the top alternative. This field is not guaranteed to be accurate and users should not rely on it to be always provided. The default of 0.0 is a sentinel value indicating `confidence` was not set. */
  confidence?: number;
  /** Output only. A distinct integer value is assigned for every speaker within the audio. This field specifies which one of those speakers was detected to have spoken this word. Value ranges from 1 up to diarization_speaker_count, and is only set if speaker diarization is enabled. */
  speakerTag?: number;
}

export const GoogleCloudVideointelligenceV1p1beta1_WordInfo: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_WordInfo> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  word: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  speakerTag: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_WordInfo" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_WordInfo>;

export interface GoogleCloudVideointelligenceV1p1beta1_SpeechRecognitionAlternative {
  /** Transcript text representing the words that the user spoke. */
  transcript?: string;
  /** Output only. The confidence estimate between 0.0 and 1.0. A higher number indicates an estimated greater likelihood that the recognized words are correct. This field is set only for the top alternative. This field is not guaranteed to be accurate and users should not rely on it to be always provided. The default of 0.0 is a sentinel value indicating `confidence` was not set. */
  confidence?: number;
  /** Output only. A list of word-specific information for each recognized word. Note: When `enable_speaker_diarization` is set to true, you will see all the words from the beginning of the audio. */
  words?: Array<GoogleCloudVideointelligenceV1p1beta1_WordInfo>;
}

export const GoogleCloudVideointelligenceV1p1beta1_SpeechRecognitionAlternative: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_SpeechRecognitionAlternative> = Schema.suspend(() => Schema.Struct({
  transcript: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  words: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_WordInfo)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_SpeechRecognitionAlternative" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_SpeechRecognitionAlternative>;

export interface GoogleCloudVideointelligenceV1p1beta1_SpeechTranscription {
  /** May contain one or more recognition hypotheses (up to the maximum specified in `max_alternatives`). These alternatives are ordered in terms of accuracy, with the top (first) alternative being the most probable, as ranked by the recognizer. */
  alternatives?: Array<GoogleCloudVideointelligenceV1p1beta1_SpeechRecognitionAlternative>;
  /** Output only. The [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) language tag of the language in this result. This language code was detected to have the most likelihood of being spoken in the audio. */
  languageCode?: string;
}

export const GoogleCloudVideointelligenceV1p1beta1_SpeechTranscription: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_SpeechTranscription> = Schema.suspend(() => Schema.Struct({
  alternatives: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_SpeechRecognitionAlternative)),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_SpeechTranscription" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_SpeechTranscription>;

export interface GoogleCloudVideointelligenceV1p1beta1_NormalizedBoundingPoly {
  /** Normalized vertices of the bounding polygon. */
  vertices?: Array<GoogleCloudVideointelligenceV1p1beta1_NormalizedVertex>;
}

export const GoogleCloudVideointelligenceV1p1beta1_NormalizedBoundingPoly: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_NormalizedBoundingPoly> = Schema.suspend(() => Schema.Struct({
  vertices: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_NormalizedVertex)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_NormalizedBoundingPoly" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_NormalizedBoundingPoly>;

export interface GoogleCloudVideointelligenceV1p1beta1_TextFrame {
  /** Bounding polygon of the detected text for this frame. */
  rotatedBoundingBox?: GoogleCloudVideointelligenceV1p1beta1_NormalizedBoundingPoly;
  /** Timestamp of this frame. */
  timeOffset?: string;
}

export const GoogleCloudVideointelligenceV1p1beta1_TextFrame: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_TextFrame> = Schema.suspend(() => Schema.Struct({
  rotatedBoundingBox: Schema.optional(GoogleCloudVideointelligenceV1p1beta1_NormalizedBoundingPoly),
  timeOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_TextFrame" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_TextFrame>;

export interface GoogleCloudVideointelligenceV1p1beta1_TextSegment {
  /** Video segment where a text snippet was detected. */
  segment?: GoogleCloudVideointelligenceV1p1beta1_VideoSegment;
  /** Confidence for the track of detected text. It is calculated as the highest over all frames where OCR detected text appears. */
  confidence?: number;
  /** Information related to the frames where OCR detected text appears. */
  frames?: Array<GoogleCloudVideointelligenceV1p1beta1_TextFrame>;
}

export const GoogleCloudVideointelligenceV1p1beta1_TextSegment: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_TextSegment> = Schema.suspend(() => Schema.Struct({
  segment: Schema.optional(GoogleCloudVideointelligenceV1p1beta1_VideoSegment),
  confidence: Schema.optional(Schema.Number),
  frames: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_TextFrame)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_TextSegment" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_TextSegment>;

export interface GoogleCloudVideointelligenceV1p1beta1_TextAnnotation {
  /** The detected text. */
  text?: string;
  /** All video segments where OCR detected text appears. */
  segments?: Array<GoogleCloudVideointelligenceV1p1beta1_TextSegment>;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1p1beta1_TextAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_TextAnnotation> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  segments: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_TextSegment)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_TextAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_TextAnnotation>;

export interface GoogleCloudVideointelligenceV1p1beta1_ObjectTrackingFrame {
  /** The normalized bounding box location of this object track for the frame. */
  normalizedBoundingBox?: GoogleCloudVideointelligenceV1p1beta1_NormalizedBoundingBox;
  /** The timestamp of the frame in microseconds. */
  timeOffset?: string;
}

export const GoogleCloudVideointelligenceV1p1beta1_ObjectTrackingFrame: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_ObjectTrackingFrame> = Schema.suspend(() => Schema.Struct({
  normalizedBoundingBox: Schema.optional(GoogleCloudVideointelligenceV1p1beta1_NormalizedBoundingBox),
  timeOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_ObjectTrackingFrame" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_ObjectTrackingFrame>;

export interface GoogleCloudVideointelligenceV1p1beta1_ObjectTrackingAnnotation {
  /** Non-streaming batch mode ONLY. Each object track corresponds to one video segment where it appears. */
  segment?: GoogleCloudVideointelligenceV1p1beta1_VideoSegment;
  /** Streaming mode ONLY. In streaming mode, we do not know the end time of a tracked object before it is completed. Hence, there is no VideoSegment info returned. Instead, we provide a unique identifiable integer track_id so that the customers can correlate the results of the ongoing ObjectTrackAnnotation of the same track_id over time. */
  trackId?: string;
  /** Entity to specify the object category that this track is labeled as. */
  entity?: GoogleCloudVideointelligenceV1p1beta1_Entity;
  /** Object category's labeling confidence of this track. */
  confidence?: number;
  /** Information corresponding to all frames where this object track appears. Non-streaming batch mode: it may be one or multiple ObjectTrackingFrame messages in frames. Streaming mode: it can only be one ObjectTrackingFrame message in frames. */
  frames?: Array<GoogleCloudVideointelligenceV1p1beta1_ObjectTrackingFrame>;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1p1beta1_ObjectTrackingAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_ObjectTrackingAnnotation> = Schema.suspend(() => Schema.Struct({
  segment: Schema.optional(GoogleCloudVideointelligenceV1p1beta1_VideoSegment),
  trackId: Schema.optional(Schema.String),
  entity: Schema.optional(GoogleCloudVideointelligenceV1p1beta1_Entity),
  confidence: Schema.optional(Schema.Number),
  frames: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_ObjectTrackingFrame)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_ObjectTrackingAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_ObjectTrackingAnnotation>;

export interface GoogleCloudVideointelligenceV1p1beta1_LogoRecognitionAnnotation {
  /** Entity category information to specify the logo class that all the logo tracks within this LogoRecognitionAnnotation are recognized as. */
  entity?: GoogleCloudVideointelligenceV1p1beta1_Entity;
  /** All logo tracks where the recognized logo appears. Each track corresponds to one logo instance appearing in consecutive frames. */
  tracks?: Array<GoogleCloudVideointelligenceV1p1beta1_Track>;
  /** All video segments where the recognized logo appears. There might be multiple instances of the same logo class appearing in one VideoSegment. */
  segments?: Array<GoogleCloudVideointelligenceV1p1beta1_VideoSegment>;
}

export const GoogleCloudVideointelligenceV1p1beta1_LogoRecognitionAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_LogoRecognitionAnnotation> = Schema.suspend(() => Schema.Struct({
  entity: Schema.optional(GoogleCloudVideointelligenceV1p1beta1_Entity),
  tracks: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_Track)),
  segments: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_VideoSegment)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_LogoRecognitionAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_LogoRecognitionAnnotation>;

export interface GoogleCloudVideointelligenceV1p1beta1_PersonDetectionAnnotation {
  /** The detected tracks of a person. */
  tracks?: Array<GoogleCloudVideointelligenceV1p1beta1_Track>;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1p1beta1_PersonDetectionAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_PersonDetectionAnnotation> = Schema.suspend(() => Schema.Struct({
  tracks: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_Track)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_PersonDetectionAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_PersonDetectionAnnotation>;

export interface GoogleCloudVideointelligenceV1p1beta1_VideoAnnotationResults {
  /** Video file location in [Cloud Storage](https://cloud.google.com/storage/). */
  inputUri?: string;
  /** Video segment on which the annotation is run. */
  segment?: GoogleCloudVideointelligenceV1p1beta1_VideoSegment;
  /** Topical label annotations on video level or user-specified segment level. There is exactly one element for each unique label. */
  segmentLabelAnnotations?: Array<GoogleCloudVideointelligenceV1p1beta1_LabelAnnotation>;
  /** Presence label annotations on video level or user-specified segment level. There is exactly one element for each unique label. Compared to the existing topical `segment_label_annotations`, this field presents more fine-grained, segment-level labels detected in video content and is made available only when the client sets `LabelDetectionConfig.model` to "builtin/latest" in the request. */
  segmentPresenceLabelAnnotations?: Array<GoogleCloudVideointelligenceV1p1beta1_LabelAnnotation>;
  /** Topical label annotations on shot level. There is exactly one element for each unique label. */
  shotLabelAnnotations?: Array<GoogleCloudVideointelligenceV1p1beta1_LabelAnnotation>;
  /** Presence label annotations on shot level. There is exactly one element for each unique label. Compared to the existing topical `shot_label_annotations`, this field presents more fine-grained, shot-level labels detected in video content and is made available only when the client sets `LabelDetectionConfig.model` to "builtin/latest" in the request. */
  shotPresenceLabelAnnotations?: Array<GoogleCloudVideointelligenceV1p1beta1_LabelAnnotation>;
  /** Label annotations on frame level. There is exactly one element for each unique label. */
  frameLabelAnnotations?: Array<GoogleCloudVideointelligenceV1p1beta1_LabelAnnotation>;
  /** Deprecated. Please use `face_detection_annotations` instead. */
  faceAnnotations?: Array<GoogleCloudVideointelligenceV1p1beta1_FaceAnnotation>;
  /** Face detection annotations. */
  faceDetectionAnnotations?: Array<GoogleCloudVideointelligenceV1p1beta1_FaceDetectionAnnotation>;
  /** Shot annotations. Each shot is represented as a video segment. */
  shotAnnotations?: Array<GoogleCloudVideointelligenceV1p1beta1_VideoSegment>;
  /** Explicit content annotation. */
  explicitAnnotation?: GoogleCloudVideointelligenceV1p1beta1_ExplicitContentAnnotation;
  /** Speech transcription. */
  speechTranscriptions?: Array<GoogleCloudVideointelligenceV1p1beta1_SpeechTranscription>;
  /** OCR text detection and tracking. Annotations for list of detected text snippets. Each will have list of frame information associated with it. */
  textAnnotations?: Array<GoogleCloudVideointelligenceV1p1beta1_TextAnnotation>;
  /** Annotations for list of objects detected and tracked in video. */
  objectAnnotations?: Array<GoogleCloudVideointelligenceV1p1beta1_ObjectTrackingAnnotation>;
  /** Annotations for list of logos detected, tracked and recognized in video. */
  logoRecognitionAnnotations?: Array<GoogleCloudVideointelligenceV1p1beta1_LogoRecognitionAnnotation>;
  /** Person detection annotations. */
  personDetectionAnnotations?: Array<GoogleCloudVideointelligenceV1p1beta1_PersonDetectionAnnotation>;
  /** If set, indicates an error. Note that for a single `AnnotateVideoRequest` some videos may succeed and some may fail. */
  error?: GoogleRpc_Status;
}

export const GoogleCloudVideointelligenceV1p1beta1_VideoAnnotationResults: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_VideoAnnotationResults> = Schema.suspend(() => Schema.Struct({
  inputUri: Schema.optional(Schema.String),
  segment: Schema.optional(GoogleCloudVideointelligenceV1p1beta1_VideoSegment),
  segmentLabelAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_LabelAnnotation)),
  segmentPresenceLabelAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_LabelAnnotation)),
  shotLabelAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_LabelAnnotation)),
  shotPresenceLabelAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_LabelAnnotation)),
  frameLabelAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_LabelAnnotation)),
  faceAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_FaceAnnotation)),
  faceDetectionAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_FaceDetectionAnnotation)),
  shotAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_VideoSegment)),
  explicitAnnotation: Schema.optional(GoogleCloudVideointelligenceV1p1beta1_ExplicitContentAnnotation),
  speechTranscriptions: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_SpeechTranscription)),
  textAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_TextAnnotation)),
  objectAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_ObjectTrackingAnnotation)),
  logoRecognitionAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_LogoRecognitionAnnotation)),
  personDetectionAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_PersonDetectionAnnotation)),
  error: Schema.optional(GoogleRpc_Status),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_VideoAnnotationResults" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_VideoAnnotationResults>;

export interface GoogleCloudVideointelligenceV1p1beta1_AnnotateVideoResponse {
  /** Annotation results for all videos specified in `AnnotateVideoRequest`. */
  annotationResults?: Array<GoogleCloudVideointelligenceV1p1beta1_VideoAnnotationResults>;
}

export const GoogleCloudVideointelligenceV1p1beta1_AnnotateVideoResponse: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_AnnotateVideoResponse> = Schema.suspend(() => Schema.Struct({
  annotationResults: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_VideoAnnotationResults)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_AnnotateVideoResponse" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_AnnotateVideoResponse>;

export interface GoogleCloudVideointelligenceV1p1beta1_ExportToOutputUriStatus {
  /** Output only. State of the `output_uri` export. */
  state?: "STATE_UNSPECIFIED" | "SUCCEEDED" | "FAILED" | (string & {});
  /** Output only. Only set if state is FAILED. */
  status?: GoogleRpc_Status;
}

export const GoogleCloudVideointelligenceV1p1beta1_ExportToOutputUriStatus: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_ExportToOutputUriStatus> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  status: Schema.optional(GoogleRpc_Status),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_ExportToOutputUriStatus" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_ExportToOutputUriStatus>;

export interface GoogleCloudVideointelligenceV1p1beta1_VideoAnnotationProgress {
  /** Video file location in [Cloud Storage](https://cloud.google.com/storage/). */
  inputUri?: string;
  /** Approximate percentage processed thus far. Guaranteed to be 100 when fully processed. */
  progressPercent?: number;
  /** Time when the request was received. */
  startTime?: string;
  /** Time of the most recent update. */
  updateTime?: string;
  /** Specifies which feature is being tracked if the request contains more than one feature. */
  feature?: "FEATURE_UNSPECIFIED" | "LABEL_DETECTION" | "SHOT_CHANGE_DETECTION" | "EXPLICIT_CONTENT_DETECTION" | "FACE_DETECTION" | "SPEECH_TRANSCRIPTION" | "TEXT_DETECTION" | "OBJECT_TRACKING" | "LOGO_RECOGNITION" | "PERSON_DETECTION" | (string & {});
  /** Specifies which segment is being tracked if the request contains more than one segment. */
  segment?: GoogleCloudVideointelligenceV1p1beta1_VideoSegment;
  /** Status of exporting annotation response to user specified `output_uri`. Only set if `output_uri` is set in the request. */
  exportStatus?: GoogleCloudVideointelligenceV1p1beta1_ExportToOutputUriStatus;
}

export const GoogleCloudVideointelligenceV1p1beta1_VideoAnnotationProgress: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_VideoAnnotationProgress> = Schema.suspend(() => Schema.Struct({
  inputUri: Schema.optional(Schema.String),
  progressPercent: Schema.optional(Schema.Number),
  startTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  feature: Schema.optional(Schema.String),
  segment: Schema.optional(GoogleCloudVideointelligenceV1p1beta1_VideoSegment),
  exportStatus: Schema.optional(GoogleCloudVideointelligenceV1p1beta1_ExportToOutputUriStatus),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_VideoAnnotationProgress" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_VideoAnnotationProgress>;

export interface GoogleCloudVideointelligenceV1p1beta1_AnnotateVideoProgress {
  /** Progress metadata for all videos specified in `AnnotateVideoRequest`. */
  annotationProgress?: Array<GoogleCloudVideointelligenceV1p1beta1_VideoAnnotationProgress>;
}

export const GoogleCloudVideointelligenceV1p1beta1_AnnotateVideoProgress: Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_AnnotateVideoProgress> = Schema.suspend(() => Schema.Struct({
  annotationProgress: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p1beta1_VideoAnnotationProgress)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p1beta1_AnnotateVideoProgress" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p1beta1_AnnotateVideoProgress>;

export interface GoogleCloudVideointelligenceV1p2beta1_VideoSegment {
  /** Time-offset, relative to the beginning of the video, corresponding to the start of the segment (inclusive). */
  startTimeOffset?: string;
  /** Time-offset, relative to the beginning of the video, corresponding to the end of the segment (inclusive). */
  endTimeOffset?: string;
}

export const GoogleCloudVideointelligenceV1p2beta1_VideoSegment: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_VideoSegment> = Schema.suspend(() => Schema.Struct({
  startTimeOffset: Schema.optional(Schema.String),
  endTimeOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_VideoSegment" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_VideoSegment>;

export interface GoogleCloudVideointelligenceV1p2beta1_Entity {
  /** Opaque entity ID. Some IDs may be available in [Google Knowledge Graph Search API](https://developers.google.com/knowledge-graph/). */
  entityId?: string;
  /** Textual description, e.g., `Fixed-gear bicycle`. */
  description?: string;
  /** Language code for `description` in BCP-47 format. */
  languageCode?: string;
}

export const GoogleCloudVideointelligenceV1p2beta1_Entity: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_Entity> = Schema.suspend(() => Schema.Struct({
  entityId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_Entity" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_Entity>;

export interface GoogleCloudVideointelligenceV1p2beta1_LabelSegment {
  /** Video segment where a label was detected. */
  segment?: GoogleCloudVideointelligenceV1p2beta1_VideoSegment;
  /** Confidence that the label is accurate. Range: [0, 1]. */
  confidence?: number;
}

export const GoogleCloudVideointelligenceV1p2beta1_LabelSegment: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_LabelSegment> = Schema.suspend(() => Schema.Struct({
  segment: Schema.optional(GoogleCloudVideointelligenceV1p2beta1_VideoSegment),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_LabelSegment" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_LabelSegment>;

export interface GoogleCloudVideointelligenceV1p2beta1_LabelFrame {
  /** Time-offset, relative to the beginning of the video, corresponding to the video frame for this location. */
  timeOffset?: string;
  /** Confidence that the label is accurate. Range: [0, 1]. */
  confidence?: number;
}

export const GoogleCloudVideointelligenceV1p2beta1_LabelFrame: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_LabelFrame> = Schema.suspend(() => Schema.Struct({
  timeOffset: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_LabelFrame" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_LabelFrame>;

export interface GoogleCloudVideointelligenceV1p2beta1_LabelAnnotation {
  /** Detected entity. */
  entity?: GoogleCloudVideointelligenceV1p2beta1_Entity;
  /** Common categories for the detected entity. For example, when the label is `Terrier`, the category is likely `dog`. And in some cases there might be more than one categories e.g., `Terrier` could also be a `pet`. */
  categoryEntities?: Array<GoogleCloudVideointelligenceV1p2beta1_Entity>;
  /** All video segments where a label was detected. */
  segments?: Array<GoogleCloudVideointelligenceV1p2beta1_LabelSegment>;
  /** All video frames where a label was detected. */
  frames?: Array<GoogleCloudVideointelligenceV1p2beta1_LabelFrame>;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1p2beta1_LabelAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_LabelAnnotation> = Schema.suspend(() => Schema.Struct({
  entity: Schema.optional(GoogleCloudVideointelligenceV1p2beta1_Entity),
  categoryEntities: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_Entity)),
  segments: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_LabelSegment)),
  frames: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_LabelFrame)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_LabelAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_LabelAnnotation>;

export interface GoogleCloudVideointelligenceV1p2beta1_FaceSegment {
  /** Video segment where a face was detected. */
  segment?: GoogleCloudVideointelligenceV1p2beta1_VideoSegment;
}

export const GoogleCloudVideointelligenceV1p2beta1_FaceSegment: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_FaceSegment> = Schema.suspend(() => Schema.Struct({
  segment: Schema.optional(GoogleCloudVideointelligenceV1p2beta1_VideoSegment),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_FaceSegment" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_FaceSegment>;

export interface GoogleCloudVideointelligenceV1p2beta1_NormalizedBoundingBox {
  /** Left X coordinate. */
  left?: number;
  /** Top Y coordinate. */
  top?: number;
  /** Right X coordinate. */
  right?: number;
  /** Bottom Y coordinate. */
  bottom?: number;
}

export const GoogleCloudVideointelligenceV1p2beta1_NormalizedBoundingBox: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_NormalizedBoundingBox> = Schema.suspend(() => Schema.Struct({
  left: Schema.optional(Schema.Number),
  top: Schema.optional(Schema.Number),
  right: Schema.optional(Schema.Number),
  bottom: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_NormalizedBoundingBox" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_NormalizedBoundingBox>;

export interface GoogleCloudVideointelligenceV1p2beta1_FaceFrame {
  /** Normalized Bounding boxes in a frame. There can be more than one boxes if the same face is detected in multiple locations within the current frame. */
  normalizedBoundingBoxes?: Array<GoogleCloudVideointelligenceV1p2beta1_NormalizedBoundingBox>;
  /** Time-offset, relative to the beginning of the video, corresponding to the video frame for this location. */
  timeOffset?: string;
}

export const GoogleCloudVideointelligenceV1p2beta1_FaceFrame: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_FaceFrame> = Schema.suspend(() => Schema.Struct({
  normalizedBoundingBoxes: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_NormalizedBoundingBox)),
  timeOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_FaceFrame" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_FaceFrame>;

export interface GoogleCloudVideointelligenceV1p2beta1_FaceAnnotation {
  /** Thumbnail of a representative face view (in JPEG format). */
  thumbnail?: string;
  /** All video segments where a face was detected. */
  segments?: Array<GoogleCloudVideointelligenceV1p2beta1_FaceSegment>;
  /** All video frames where a face was detected. */
  frames?: Array<GoogleCloudVideointelligenceV1p2beta1_FaceFrame>;
}

export const GoogleCloudVideointelligenceV1p2beta1_FaceAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_FaceAnnotation> = Schema.suspend(() => Schema.Struct({
  thumbnail: Schema.optional(Schema.String),
  segments: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_FaceSegment)),
  frames: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_FaceFrame)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_FaceAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_FaceAnnotation>;

export interface GoogleCloudVideointelligenceV1p2beta1_DetectedAttribute {
  /** The name of the attribute, for example, glasses, dark_glasses, mouth_open. A full list of supported type names will be provided in the document. */
  name?: string;
  /** Detected attribute confidence. Range [0, 1]. */
  confidence?: number;
  /** Text value of the detection result. For example, the value for "HairColor" can be "black", "blonde", etc. */
  value?: string;
}

export const GoogleCloudVideointelligenceV1p2beta1_DetectedAttribute: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_DetectedAttribute> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_DetectedAttribute" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_DetectedAttribute>;

export interface GoogleCloudVideointelligenceV1p2beta1_NormalizedVertex {
  /** X coordinate. */
  x?: number;
  /** Y coordinate. */
  y?: number;
}

export const GoogleCloudVideointelligenceV1p2beta1_NormalizedVertex: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_NormalizedVertex> = Schema.suspend(() => Schema.Struct({
  x: Schema.optional(Schema.Number),
  y: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_NormalizedVertex" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_NormalizedVertex>;

export interface GoogleCloudVideointelligenceV1p2beta1_DetectedLandmark {
  /** The name of this landmark, for example, left_hand, right_shoulder. */
  name?: string;
  /** The 2D point of the detected landmark using the normalized image coordinate system. The normalized coordinates have the range from 0 to 1. */
  point?: GoogleCloudVideointelligenceV1p2beta1_NormalizedVertex;
  /** The confidence score of the detected landmark. Range [0, 1]. */
  confidence?: number;
}

export const GoogleCloudVideointelligenceV1p2beta1_DetectedLandmark: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_DetectedLandmark> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  point: Schema.optional(GoogleCloudVideointelligenceV1p2beta1_NormalizedVertex),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_DetectedLandmark" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_DetectedLandmark>;

export interface GoogleCloudVideointelligenceV1p2beta1_TimestampedObject {
  /** Normalized Bounding box in a frame, where the object is located. */
  normalizedBoundingBox?: GoogleCloudVideointelligenceV1p2beta1_NormalizedBoundingBox;
  /** Time-offset, relative to the beginning of the video, corresponding to the video frame for this object. */
  timeOffset?: string;
  /** Optional. The attributes of the object in the bounding box. */
  attributes?: Array<GoogleCloudVideointelligenceV1p2beta1_DetectedAttribute>;
  /** Optional. The detected landmarks. */
  landmarks?: Array<GoogleCloudVideointelligenceV1p2beta1_DetectedLandmark>;
}

export const GoogleCloudVideointelligenceV1p2beta1_TimestampedObject: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_TimestampedObject> = Schema.suspend(() => Schema.Struct({
  normalizedBoundingBox: Schema.optional(GoogleCloudVideointelligenceV1p2beta1_NormalizedBoundingBox),
  timeOffset: Schema.optional(Schema.String),
  attributes: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_DetectedAttribute)),
  landmarks: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_DetectedLandmark)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_TimestampedObject" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_TimestampedObject>;

export interface GoogleCloudVideointelligenceV1p2beta1_Track {
  /** Video segment of a track. */
  segment?: GoogleCloudVideointelligenceV1p2beta1_VideoSegment;
  /** The object with timestamp and attributes per frame in the track. */
  timestampedObjects?: Array<GoogleCloudVideointelligenceV1p2beta1_TimestampedObject>;
  /** Optional. Attributes in the track level. */
  attributes?: Array<GoogleCloudVideointelligenceV1p2beta1_DetectedAttribute>;
  /** Optional. The confidence score of the tracked object. */
  confidence?: number;
}

export const GoogleCloudVideointelligenceV1p2beta1_Track: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_Track> = Schema.suspend(() => Schema.Struct({
  segment: Schema.optional(GoogleCloudVideointelligenceV1p2beta1_VideoSegment),
  timestampedObjects: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_TimestampedObject)),
  attributes: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_DetectedAttribute)),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_Track" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_Track>;

export interface GoogleCloudVideointelligenceV1p2beta1_FaceDetectionAnnotation {
  /** The face tracks with attributes. */
  tracks?: Array<GoogleCloudVideointelligenceV1p2beta1_Track>;
  /** The thumbnail of a person's face. */
  thumbnail?: string;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1p2beta1_FaceDetectionAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_FaceDetectionAnnotation> = Schema.suspend(() => Schema.Struct({
  tracks: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_Track)),
  thumbnail: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_FaceDetectionAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_FaceDetectionAnnotation>;

export interface GoogleCloudVideointelligenceV1p2beta1_ExplicitContentFrame {
  /** Time-offset, relative to the beginning of the video, corresponding to the video frame for this location. */
  timeOffset?: string;
  /** Likelihood of the pornography content.. */
  pornographyLikelihood?: "LIKELIHOOD_UNSPECIFIED" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
}

export const GoogleCloudVideointelligenceV1p2beta1_ExplicitContentFrame: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_ExplicitContentFrame> = Schema.suspend(() => Schema.Struct({
  timeOffset: Schema.optional(Schema.String),
  pornographyLikelihood: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_ExplicitContentFrame" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_ExplicitContentFrame>;

export interface GoogleCloudVideointelligenceV1p2beta1_ExplicitContentAnnotation {
  /** All video frames where explicit content was detected. */
  frames?: Array<GoogleCloudVideointelligenceV1p2beta1_ExplicitContentFrame>;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1p2beta1_ExplicitContentAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_ExplicitContentAnnotation> = Schema.suspend(() => Schema.Struct({
  frames: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_ExplicitContentFrame)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_ExplicitContentAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_ExplicitContentAnnotation>;

export interface GoogleCloudVideointelligenceV1p2beta1_WordInfo {
  /** Time offset relative to the beginning of the audio, and corresponding to the start of the spoken word. This field is only set if `enable_word_time_offsets=true` and only in the top hypothesis. This is an experimental feature and the accuracy of the time offset can vary. */
  startTime?: string;
  /** Time offset relative to the beginning of the audio, and corresponding to the end of the spoken word. This field is only set if `enable_word_time_offsets=true` and only in the top hypothesis. This is an experimental feature and the accuracy of the time offset can vary. */
  endTime?: string;
  /** The word corresponding to this set of information. */
  word?: string;
  /** Output only. The confidence estimate between 0.0 and 1.0. A higher number indicates an estimated greater likelihood that the recognized words are correct. This field is set only for the top alternative. This field is not guaranteed to be accurate and users should not rely on it to be always provided. The default of 0.0 is a sentinel value indicating `confidence` was not set. */
  confidence?: number;
  /** Output only. A distinct integer value is assigned for every speaker within the audio. This field specifies which one of those speakers was detected to have spoken this word. Value ranges from 1 up to diarization_speaker_count, and is only set if speaker diarization is enabled. */
  speakerTag?: number;
}

export const GoogleCloudVideointelligenceV1p2beta1_WordInfo: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_WordInfo> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  word: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  speakerTag: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_WordInfo" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_WordInfo>;

export interface GoogleCloudVideointelligenceV1p2beta1_SpeechRecognitionAlternative {
  /** Transcript text representing the words that the user spoke. */
  transcript?: string;
  /** Output only. The confidence estimate between 0.0 and 1.0. A higher number indicates an estimated greater likelihood that the recognized words are correct. This field is set only for the top alternative. This field is not guaranteed to be accurate and users should not rely on it to be always provided. The default of 0.0 is a sentinel value indicating `confidence` was not set. */
  confidence?: number;
  /** Output only. A list of word-specific information for each recognized word. Note: When `enable_speaker_diarization` is set to true, you will see all the words from the beginning of the audio. */
  words?: Array<GoogleCloudVideointelligenceV1p2beta1_WordInfo>;
}

export const GoogleCloudVideointelligenceV1p2beta1_SpeechRecognitionAlternative: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_SpeechRecognitionAlternative> = Schema.suspend(() => Schema.Struct({
  transcript: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  words: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_WordInfo)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_SpeechRecognitionAlternative" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_SpeechRecognitionAlternative>;

export interface GoogleCloudVideointelligenceV1p2beta1_SpeechTranscription {
  /** May contain one or more recognition hypotheses (up to the maximum specified in `max_alternatives`). These alternatives are ordered in terms of accuracy, with the top (first) alternative being the most probable, as ranked by the recognizer. */
  alternatives?: Array<GoogleCloudVideointelligenceV1p2beta1_SpeechRecognitionAlternative>;
  /** Output only. The [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) language tag of the language in this result. This language code was detected to have the most likelihood of being spoken in the audio. */
  languageCode?: string;
}

export const GoogleCloudVideointelligenceV1p2beta1_SpeechTranscription: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_SpeechTranscription> = Schema.suspend(() => Schema.Struct({
  alternatives: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_SpeechRecognitionAlternative)),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_SpeechTranscription" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_SpeechTranscription>;

export interface GoogleCloudVideointelligenceV1p2beta1_NormalizedBoundingPoly {
  /** Normalized vertices of the bounding polygon. */
  vertices?: Array<GoogleCloudVideointelligenceV1p2beta1_NormalizedVertex>;
}

export const GoogleCloudVideointelligenceV1p2beta1_NormalizedBoundingPoly: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_NormalizedBoundingPoly> = Schema.suspend(() => Schema.Struct({
  vertices: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_NormalizedVertex)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_NormalizedBoundingPoly" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_NormalizedBoundingPoly>;

export interface GoogleCloudVideointelligenceV1p2beta1_TextFrame {
  /** Bounding polygon of the detected text for this frame. */
  rotatedBoundingBox?: GoogleCloudVideointelligenceV1p2beta1_NormalizedBoundingPoly;
  /** Timestamp of this frame. */
  timeOffset?: string;
}

export const GoogleCloudVideointelligenceV1p2beta1_TextFrame: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_TextFrame> = Schema.suspend(() => Schema.Struct({
  rotatedBoundingBox: Schema.optional(GoogleCloudVideointelligenceV1p2beta1_NormalizedBoundingPoly),
  timeOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_TextFrame" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_TextFrame>;

export interface GoogleCloudVideointelligenceV1p2beta1_TextSegment {
  /** Video segment where a text snippet was detected. */
  segment?: GoogleCloudVideointelligenceV1p2beta1_VideoSegment;
  /** Confidence for the track of detected text. It is calculated as the highest over all frames where OCR detected text appears. */
  confidence?: number;
  /** Information related to the frames where OCR detected text appears. */
  frames?: Array<GoogleCloudVideointelligenceV1p2beta1_TextFrame>;
}

export const GoogleCloudVideointelligenceV1p2beta1_TextSegment: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_TextSegment> = Schema.suspend(() => Schema.Struct({
  segment: Schema.optional(GoogleCloudVideointelligenceV1p2beta1_VideoSegment),
  confidence: Schema.optional(Schema.Number),
  frames: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_TextFrame)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_TextSegment" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_TextSegment>;

export interface GoogleCloudVideointelligenceV1p2beta1_TextAnnotation {
  /** The detected text. */
  text?: string;
  /** All video segments where OCR detected text appears. */
  segments?: Array<GoogleCloudVideointelligenceV1p2beta1_TextSegment>;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1p2beta1_TextAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_TextAnnotation> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  segments: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_TextSegment)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_TextAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_TextAnnotation>;

export interface GoogleCloudVideointelligenceV1p2beta1_ObjectTrackingFrame {
  /** The normalized bounding box location of this object track for the frame. */
  normalizedBoundingBox?: GoogleCloudVideointelligenceV1p2beta1_NormalizedBoundingBox;
  /** The timestamp of the frame in microseconds. */
  timeOffset?: string;
}

export const GoogleCloudVideointelligenceV1p2beta1_ObjectTrackingFrame: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_ObjectTrackingFrame> = Schema.suspend(() => Schema.Struct({
  normalizedBoundingBox: Schema.optional(GoogleCloudVideointelligenceV1p2beta1_NormalizedBoundingBox),
  timeOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_ObjectTrackingFrame" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_ObjectTrackingFrame>;

export interface GoogleCloudVideointelligenceV1p2beta1_ObjectTrackingAnnotation {
  /** Non-streaming batch mode ONLY. Each object track corresponds to one video segment where it appears. */
  segment?: GoogleCloudVideointelligenceV1p2beta1_VideoSegment;
  /** Streaming mode ONLY. In streaming mode, we do not know the end time of a tracked object before it is completed. Hence, there is no VideoSegment info returned. Instead, we provide a unique identifiable integer track_id so that the customers can correlate the results of the ongoing ObjectTrackAnnotation of the same track_id over time. */
  trackId?: string;
  /** Entity to specify the object category that this track is labeled as. */
  entity?: GoogleCloudVideointelligenceV1p2beta1_Entity;
  /** Object category's labeling confidence of this track. */
  confidence?: number;
  /** Information corresponding to all frames where this object track appears. Non-streaming batch mode: it may be one or multiple ObjectTrackingFrame messages in frames. Streaming mode: it can only be one ObjectTrackingFrame message in frames. */
  frames?: Array<GoogleCloudVideointelligenceV1p2beta1_ObjectTrackingFrame>;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1p2beta1_ObjectTrackingAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_ObjectTrackingAnnotation> = Schema.suspend(() => Schema.Struct({
  segment: Schema.optional(GoogleCloudVideointelligenceV1p2beta1_VideoSegment),
  trackId: Schema.optional(Schema.String),
  entity: Schema.optional(GoogleCloudVideointelligenceV1p2beta1_Entity),
  confidence: Schema.optional(Schema.Number),
  frames: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_ObjectTrackingFrame)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_ObjectTrackingAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_ObjectTrackingAnnotation>;

export interface GoogleCloudVideointelligenceV1p2beta1_LogoRecognitionAnnotation {
  /** Entity category information to specify the logo class that all the logo tracks within this LogoRecognitionAnnotation are recognized as. */
  entity?: GoogleCloudVideointelligenceV1p2beta1_Entity;
  /** All logo tracks where the recognized logo appears. Each track corresponds to one logo instance appearing in consecutive frames. */
  tracks?: Array<GoogleCloudVideointelligenceV1p2beta1_Track>;
  /** All video segments where the recognized logo appears. There might be multiple instances of the same logo class appearing in one VideoSegment. */
  segments?: Array<GoogleCloudVideointelligenceV1p2beta1_VideoSegment>;
}

export const GoogleCloudVideointelligenceV1p2beta1_LogoRecognitionAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_LogoRecognitionAnnotation> = Schema.suspend(() => Schema.Struct({
  entity: Schema.optional(GoogleCloudVideointelligenceV1p2beta1_Entity),
  tracks: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_Track)),
  segments: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_VideoSegment)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_LogoRecognitionAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_LogoRecognitionAnnotation>;

export interface GoogleCloudVideointelligenceV1p2beta1_PersonDetectionAnnotation {
  /** The detected tracks of a person. */
  tracks?: Array<GoogleCloudVideointelligenceV1p2beta1_Track>;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1p2beta1_PersonDetectionAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_PersonDetectionAnnotation> = Schema.suspend(() => Schema.Struct({
  tracks: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_Track)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_PersonDetectionAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_PersonDetectionAnnotation>;

export interface GoogleCloudVideointelligenceV1p2beta1_VideoAnnotationResults {
  /** Video file location in [Cloud Storage](https://cloud.google.com/storage/). */
  inputUri?: string;
  /** Video segment on which the annotation is run. */
  segment?: GoogleCloudVideointelligenceV1p2beta1_VideoSegment;
  /** Topical label annotations on video level or user-specified segment level. There is exactly one element for each unique label. */
  segmentLabelAnnotations?: Array<GoogleCloudVideointelligenceV1p2beta1_LabelAnnotation>;
  /** Presence label annotations on video level or user-specified segment level. There is exactly one element for each unique label. Compared to the existing topical `segment_label_annotations`, this field presents more fine-grained, segment-level labels detected in video content and is made available only when the client sets `LabelDetectionConfig.model` to "builtin/latest" in the request. */
  segmentPresenceLabelAnnotations?: Array<GoogleCloudVideointelligenceV1p2beta1_LabelAnnotation>;
  /** Topical label annotations on shot level. There is exactly one element for each unique label. */
  shotLabelAnnotations?: Array<GoogleCloudVideointelligenceV1p2beta1_LabelAnnotation>;
  /** Presence label annotations on shot level. There is exactly one element for each unique label. Compared to the existing topical `shot_label_annotations`, this field presents more fine-grained, shot-level labels detected in video content and is made available only when the client sets `LabelDetectionConfig.model` to "builtin/latest" in the request. */
  shotPresenceLabelAnnotations?: Array<GoogleCloudVideointelligenceV1p2beta1_LabelAnnotation>;
  /** Label annotations on frame level. There is exactly one element for each unique label. */
  frameLabelAnnotations?: Array<GoogleCloudVideointelligenceV1p2beta1_LabelAnnotation>;
  /** Deprecated. Please use `face_detection_annotations` instead. */
  faceAnnotations?: Array<GoogleCloudVideointelligenceV1p2beta1_FaceAnnotation>;
  /** Face detection annotations. */
  faceDetectionAnnotations?: Array<GoogleCloudVideointelligenceV1p2beta1_FaceDetectionAnnotation>;
  /** Shot annotations. Each shot is represented as a video segment. */
  shotAnnotations?: Array<GoogleCloudVideointelligenceV1p2beta1_VideoSegment>;
  /** Explicit content annotation. */
  explicitAnnotation?: GoogleCloudVideointelligenceV1p2beta1_ExplicitContentAnnotation;
  /** Speech transcription. */
  speechTranscriptions?: Array<GoogleCloudVideointelligenceV1p2beta1_SpeechTranscription>;
  /** OCR text detection and tracking. Annotations for list of detected text snippets. Each will have list of frame information associated with it. */
  textAnnotations?: Array<GoogleCloudVideointelligenceV1p2beta1_TextAnnotation>;
  /** Annotations for list of objects detected and tracked in video. */
  objectAnnotations?: Array<GoogleCloudVideointelligenceV1p2beta1_ObjectTrackingAnnotation>;
  /** Annotations for list of logos detected, tracked and recognized in video. */
  logoRecognitionAnnotations?: Array<GoogleCloudVideointelligenceV1p2beta1_LogoRecognitionAnnotation>;
  /** Person detection annotations. */
  personDetectionAnnotations?: Array<GoogleCloudVideointelligenceV1p2beta1_PersonDetectionAnnotation>;
  /** If set, indicates an error. Note that for a single `AnnotateVideoRequest` some videos may succeed and some may fail. */
  error?: GoogleRpc_Status;
}

export const GoogleCloudVideointelligenceV1p2beta1_VideoAnnotationResults: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_VideoAnnotationResults> = Schema.suspend(() => Schema.Struct({
  inputUri: Schema.optional(Schema.String),
  segment: Schema.optional(GoogleCloudVideointelligenceV1p2beta1_VideoSegment),
  segmentLabelAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_LabelAnnotation)),
  segmentPresenceLabelAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_LabelAnnotation)),
  shotLabelAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_LabelAnnotation)),
  shotPresenceLabelAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_LabelAnnotation)),
  frameLabelAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_LabelAnnotation)),
  faceAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_FaceAnnotation)),
  faceDetectionAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_FaceDetectionAnnotation)),
  shotAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_VideoSegment)),
  explicitAnnotation: Schema.optional(GoogleCloudVideointelligenceV1p2beta1_ExplicitContentAnnotation),
  speechTranscriptions: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_SpeechTranscription)),
  textAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_TextAnnotation)),
  objectAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_ObjectTrackingAnnotation)),
  logoRecognitionAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_LogoRecognitionAnnotation)),
  personDetectionAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_PersonDetectionAnnotation)),
  error: Schema.optional(GoogleRpc_Status),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_VideoAnnotationResults" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_VideoAnnotationResults>;

export interface GoogleCloudVideointelligenceV1p2beta1_AnnotateVideoResponse {
  /** Annotation results for all videos specified in `AnnotateVideoRequest`. */
  annotationResults?: Array<GoogleCloudVideointelligenceV1p2beta1_VideoAnnotationResults>;
}

export const GoogleCloudVideointelligenceV1p2beta1_AnnotateVideoResponse: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_AnnotateVideoResponse> = Schema.suspend(() => Schema.Struct({
  annotationResults: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_VideoAnnotationResults)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_AnnotateVideoResponse" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_AnnotateVideoResponse>;

export interface GoogleCloudVideointelligenceV1p2beta1_ExportToOutputUriStatus {
  /** Output only. State of the `output_uri` export. */
  state?: "STATE_UNSPECIFIED" | "SUCCEEDED" | "FAILED" | (string & {});
  /** Output only. Only set if state is FAILED. */
  status?: GoogleRpc_Status;
}

export const GoogleCloudVideointelligenceV1p2beta1_ExportToOutputUriStatus: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_ExportToOutputUriStatus> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  status: Schema.optional(GoogleRpc_Status),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_ExportToOutputUriStatus" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_ExportToOutputUriStatus>;

export interface GoogleCloudVideointelligenceV1p2beta1_VideoAnnotationProgress {
  /** Video file location in [Cloud Storage](https://cloud.google.com/storage/). */
  inputUri?: string;
  /** Approximate percentage processed thus far. Guaranteed to be 100 when fully processed. */
  progressPercent?: number;
  /** Time when the request was received. */
  startTime?: string;
  /** Time of the most recent update. */
  updateTime?: string;
  /** Specifies which feature is being tracked if the request contains more than one feature. */
  feature?: "FEATURE_UNSPECIFIED" | "LABEL_DETECTION" | "SHOT_CHANGE_DETECTION" | "EXPLICIT_CONTENT_DETECTION" | "FACE_DETECTION" | "SPEECH_TRANSCRIPTION" | "TEXT_DETECTION" | "OBJECT_TRACKING" | "LOGO_RECOGNITION" | "PERSON_DETECTION" | (string & {});
  /** Specifies which segment is being tracked if the request contains more than one segment. */
  segment?: GoogleCloudVideointelligenceV1p2beta1_VideoSegment;
  /** Status of exporting annotation response to user specified `output_uri`. Only set if `output_uri` is set in the request. */
  exportStatus?: GoogleCloudVideointelligenceV1p2beta1_ExportToOutputUriStatus;
}

export const GoogleCloudVideointelligenceV1p2beta1_VideoAnnotationProgress: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_VideoAnnotationProgress> = Schema.suspend(() => Schema.Struct({
  inputUri: Schema.optional(Schema.String),
  progressPercent: Schema.optional(Schema.Number),
  startTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  feature: Schema.optional(Schema.String),
  segment: Schema.optional(GoogleCloudVideointelligenceV1p2beta1_VideoSegment),
  exportStatus: Schema.optional(GoogleCloudVideointelligenceV1p2beta1_ExportToOutputUriStatus),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_VideoAnnotationProgress" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_VideoAnnotationProgress>;

export interface GoogleCloudVideointelligenceV1p2beta1_AnnotateVideoProgress {
  /** Progress metadata for all videos specified in `AnnotateVideoRequest`. */
  annotationProgress?: Array<GoogleCloudVideointelligenceV1p2beta1_VideoAnnotationProgress>;
}

export const GoogleCloudVideointelligenceV1p2beta1_AnnotateVideoProgress: Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_AnnotateVideoProgress> = Schema.suspend(() => Schema.Struct({
  annotationProgress: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p2beta1_VideoAnnotationProgress)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p2beta1_AnnotateVideoProgress" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p2beta1_AnnotateVideoProgress>;

export interface GoogleCloudVideointelligenceV1p3beta1_VideoSegment {
  /** Time-offset, relative to the beginning of the video, corresponding to the start of the segment (inclusive). */
  startTimeOffset?: string;
  /** Time-offset, relative to the beginning of the video, corresponding to the end of the segment (inclusive). */
  endTimeOffset?: string;
}

export const GoogleCloudVideointelligenceV1p3beta1_VideoSegment: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_VideoSegment> = Schema.suspend(() => Schema.Struct({
  startTimeOffset: Schema.optional(Schema.String),
  endTimeOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_VideoSegment" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_VideoSegment>;

export interface GoogleCloudVideointelligenceV1p3beta1_Entity {
  /** Opaque entity ID. Some IDs may be available in [Google Knowledge Graph Search API](https://developers.google.com/knowledge-graph/). */
  entityId?: string;
  /** Textual description, e.g., `Fixed-gear bicycle`. */
  description?: string;
  /** Language code for `description` in BCP-47 format. */
  languageCode?: string;
}

export const GoogleCloudVideointelligenceV1p3beta1_Entity: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_Entity> = Schema.suspend(() => Schema.Struct({
  entityId: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_Entity" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_Entity>;

export interface GoogleCloudVideointelligenceV1p3beta1_LabelSegment {
  /** Video segment where a label was detected. */
  segment?: GoogleCloudVideointelligenceV1p3beta1_VideoSegment;
  /** Confidence that the label is accurate. Range: [0, 1]. */
  confidence?: number;
}

export const GoogleCloudVideointelligenceV1p3beta1_LabelSegment: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_LabelSegment> = Schema.suspend(() => Schema.Struct({
  segment: Schema.optional(GoogleCloudVideointelligenceV1p3beta1_VideoSegment),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_LabelSegment" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_LabelSegment>;

export interface GoogleCloudVideointelligenceV1p3beta1_LabelFrame {
  /** Time-offset, relative to the beginning of the video, corresponding to the video frame for this location. */
  timeOffset?: string;
  /** Confidence that the label is accurate. Range: [0, 1]. */
  confidence?: number;
}

export const GoogleCloudVideointelligenceV1p3beta1_LabelFrame: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_LabelFrame> = Schema.suspend(() => Schema.Struct({
  timeOffset: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_LabelFrame" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_LabelFrame>;

export interface GoogleCloudVideointelligenceV1p3beta1_LabelAnnotation {
  /** Detected entity. */
  entity?: GoogleCloudVideointelligenceV1p3beta1_Entity;
  /** Common categories for the detected entity. For example, when the label is `Terrier`, the category is likely `dog`. And in some cases there might be more than one categories e.g., `Terrier` could also be a `pet`. */
  categoryEntities?: Array<GoogleCloudVideointelligenceV1p3beta1_Entity>;
  /** All video segments where a label was detected. */
  segments?: Array<GoogleCloudVideointelligenceV1p3beta1_LabelSegment>;
  /** All video frames where a label was detected. */
  frames?: Array<GoogleCloudVideointelligenceV1p3beta1_LabelFrame>;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1p3beta1_LabelAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_LabelAnnotation> = Schema.suspend(() => Schema.Struct({
  entity: Schema.optional(GoogleCloudVideointelligenceV1p3beta1_Entity),
  categoryEntities: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_Entity)),
  segments: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_LabelSegment)),
  frames: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_LabelFrame)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_LabelAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_LabelAnnotation>;

export interface GoogleCloudVideointelligenceV1p3beta1_FaceSegment {
  /** Video segment where a face was detected. */
  segment?: GoogleCloudVideointelligenceV1p3beta1_VideoSegment;
}

export const GoogleCloudVideointelligenceV1p3beta1_FaceSegment: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_FaceSegment> = Schema.suspend(() => Schema.Struct({
  segment: Schema.optional(GoogleCloudVideointelligenceV1p3beta1_VideoSegment),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_FaceSegment" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_FaceSegment>;

export interface GoogleCloudVideointelligenceV1p3beta1_NormalizedBoundingBox {
  /** Left X coordinate. */
  left?: number;
  /** Top Y coordinate. */
  top?: number;
  /** Right X coordinate. */
  right?: number;
  /** Bottom Y coordinate. */
  bottom?: number;
}

export const GoogleCloudVideointelligenceV1p3beta1_NormalizedBoundingBox: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_NormalizedBoundingBox> = Schema.suspend(() => Schema.Struct({
  left: Schema.optional(Schema.Number),
  top: Schema.optional(Schema.Number),
  right: Schema.optional(Schema.Number),
  bottom: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_NormalizedBoundingBox" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_NormalizedBoundingBox>;

export interface GoogleCloudVideointelligenceV1p3beta1_FaceFrame {
  /** Normalized Bounding boxes in a frame. There can be more than one boxes if the same face is detected in multiple locations within the current frame. */
  normalizedBoundingBoxes?: Array<GoogleCloudVideointelligenceV1p3beta1_NormalizedBoundingBox>;
  /** Time-offset, relative to the beginning of the video, corresponding to the video frame for this location. */
  timeOffset?: string;
}

export const GoogleCloudVideointelligenceV1p3beta1_FaceFrame: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_FaceFrame> = Schema.suspend(() => Schema.Struct({
  normalizedBoundingBoxes: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_NormalizedBoundingBox)),
  timeOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_FaceFrame" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_FaceFrame>;

export interface GoogleCloudVideointelligenceV1p3beta1_FaceAnnotation {
  /** Thumbnail of a representative face view (in JPEG format). */
  thumbnail?: string;
  /** All video segments where a face was detected. */
  segments?: Array<GoogleCloudVideointelligenceV1p3beta1_FaceSegment>;
  /** All video frames where a face was detected. */
  frames?: Array<GoogleCloudVideointelligenceV1p3beta1_FaceFrame>;
}

export const GoogleCloudVideointelligenceV1p3beta1_FaceAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_FaceAnnotation> = Schema.suspend(() => Schema.Struct({
  thumbnail: Schema.optional(Schema.String),
  segments: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_FaceSegment)),
  frames: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_FaceFrame)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_FaceAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_FaceAnnotation>;

export interface GoogleCloudVideointelligenceV1p3beta1_DetectedAttribute {
  /** The name of the attribute, for example, glasses, dark_glasses, mouth_open. A full list of supported type names will be provided in the document. */
  name?: string;
  /** Detected attribute confidence. Range [0, 1]. */
  confidence?: number;
  /** Text value of the detection result. For example, the value for "HairColor" can be "black", "blonde", etc. */
  value?: string;
}

export const GoogleCloudVideointelligenceV1p3beta1_DetectedAttribute: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_DetectedAttribute> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_DetectedAttribute" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_DetectedAttribute>;

export interface GoogleCloudVideointelligenceV1p3beta1_NormalizedVertex {
  /** X coordinate. */
  x?: number;
  /** Y coordinate. */
  y?: number;
}

export const GoogleCloudVideointelligenceV1p3beta1_NormalizedVertex: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_NormalizedVertex> = Schema.suspend(() => Schema.Struct({
  x: Schema.optional(Schema.Number),
  y: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_NormalizedVertex" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_NormalizedVertex>;

export interface GoogleCloudVideointelligenceV1p3beta1_DetectedLandmark {
  /** The name of this landmark, for example, left_hand, right_shoulder. */
  name?: string;
  /** The 2D point of the detected landmark using the normalized image coordinate system. The normalized coordinates have the range from 0 to 1. */
  point?: GoogleCloudVideointelligenceV1p3beta1_NormalizedVertex;
  /** The confidence score of the detected landmark. Range [0, 1]. */
  confidence?: number;
}

export const GoogleCloudVideointelligenceV1p3beta1_DetectedLandmark: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_DetectedLandmark> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  point: Schema.optional(GoogleCloudVideointelligenceV1p3beta1_NormalizedVertex),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_DetectedLandmark" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_DetectedLandmark>;

export interface GoogleCloudVideointelligenceV1p3beta1_TimestampedObject {
  /** Normalized Bounding box in a frame, where the object is located. */
  normalizedBoundingBox?: GoogleCloudVideointelligenceV1p3beta1_NormalizedBoundingBox;
  /** Time-offset, relative to the beginning of the video, corresponding to the video frame for this object. */
  timeOffset?: string;
  /** Optional. The attributes of the object in the bounding box. */
  attributes?: Array<GoogleCloudVideointelligenceV1p3beta1_DetectedAttribute>;
  /** Optional. The detected landmarks. */
  landmarks?: Array<GoogleCloudVideointelligenceV1p3beta1_DetectedLandmark>;
}

export const GoogleCloudVideointelligenceV1p3beta1_TimestampedObject: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_TimestampedObject> = Schema.suspend(() => Schema.Struct({
  normalizedBoundingBox: Schema.optional(GoogleCloudVideointelligenceV1p3beta1_NormalizedBoundingBox),
  timeOffset: Schema.optional(Schema.String),
  attributes: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_DetectedAttribute)),
  landmarks: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_DetectedLandmark)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_TimestampedObject" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_TimestampedObject>;

export interface GoogleCloudVideointelligenceV1p3beta1_Track {
  /** Video segment of a track. */
  segment?: GoogleCloudVideointelligenceV1p3beta1_VideoSegment;
  /** The object with timestamp and attributes per frame in the track. */
  timestampedObjects?: Array<GoogleCloudVideointelligenceV1p3beta1_TimestampedObject>;
  /** Optional. Attributes in the track level. */
  attributes?: Array<GoogleCloudVideointelligenceV1p3beta1_DetectedAttribute>;
  /** Optional. The confidence score of the tracked object. */
  confidence?: number;
}

export const GoogleCloudVideointelligenceV1p3beta1_Track: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_Track> = Schema.suspend(() => Schema.Struct({
  segment: Schema.optional(GoogleCloudVideointelligenceV1p3beta1_VideoSegment),
  timestampedObjects: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_TimestampedObject)),
  attributes: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_DetectedAttribute)),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_Track" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_Track>;

export interface GoogleCloudVideointelligenceV1p3beta1_FaceDetectionAnnotation {
  /** The face tracks with attributes. */
  tracks?: Array<GoogleCloudVideointelligenceV1p3beta1_Track>;
  /** The thumbnail of a person's face. */
  thumbnail?: string;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1p3beta1_FaceDetectionAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_FaceDetectionAnnotation> = Schema.suspend(() => Schema.Struct({
  tracks: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_Track)),
  thumbnail: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_FaceDetectionAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_FaceDetectionAnnotation>;

export interface GoogleCloudVideointelligenceV1p3beta1_ExplicitContentFrame {
  /** Time-offset, relative to the beginning of the video, corresponding to the video frame for this location. */
  timeOffset?: string;
  /** Likelihood of the pornography content.. */
  pornographyLikelihood?: "LIKELIHOOD_UNSPECIFIED" | "VERY_UNLIKELY" | "UNLIKELY" | "POSSIBLE" | "LIKELY" | "VERY_LIKELY" | (string & {});
}

export const GoogleCloudVideointelligenceV1p3beta1_ExplicitContentFrame: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_ExplicitContentFrame> = Schema.suspend(() => Schema.Struct({
  timeOffset: Schema.optional(Schema.String),
  pornographyLikelihood: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_ExplicitContentFrame" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_ExplicitContentFrame>;

export interface GoogleCloudVideointelligenceV1p3beta1_ExplicitContentAnnotation {
  /** All video frames where explicit content was detected. */
  frames?: Array<GoogleCloudVideointelligenceV1p3beta1_ExplicitContentFrame>;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1p3beta1_ExplicitContentAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_ExplicitContentAnnotation> = Schema.suspend(() => Schema.Struct({
  frames: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_ExplicitContentFrame)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_ExplicitContentAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_ExplicitContentAnnotation>;

export interface GoogleCloudVideointelligenceV1p3beta1_WordInfo {
  /** Time offset relative to the beginning of the audio, and corresponding to the start of the spoken word. This field is only set if `enable_word_time_offsets=true` and only in the top hypothesis. This is an experimental feature and the accuracy of the time offset can vary. */
  startTime?: string;
  /** Time offset relative to the beginning of the audio, and corresponding to the end of the spoken word. This field is only set if `enable_word_time_offsets=true` and only in the top hypothesis. This is an experimental feature and the accuracy of the time offset can vary. */
  endTime?: string;
  /** The word corresponding to this set of information. */
  word?: string;
  /** Output only. The confidence estimate between 0.0 and 1.0. A higher number indicates an estimated greater likelihood that the recognized words are correct. This field is set only for the top alternative. This field is not guaranteed to be accurate and users should not rely on it to be always provided. The default of 0.0 is a sentinel value indicating `confidence` was not set. */
  confidence?: number;
  /** Output only. A distinct integer value is assigned for every speaker within the audio. This field specifies which one of those speakers was detected to have spoken this word. Value ranges from 1 up to diarization_speaker_count, and is only set if speaker diarization is enabled. */
  speakerTag?: number;
}

export const GoogleCloudVideointelligenceV1p3beta1_WordInfo: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_WordInfo> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  word: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  speakerTag: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_WordInfo" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_WordInfo>;

export interface GoogleCloudVideointelligenceV1p3beta1_SpeechRecognitionAlternative {
  /** Transcript text representing the words that the user spoke. */
  transcript?: string;
  /** Output only. The confidence estimate between 0.0 and 1.0. A higher number indicates an estimated greater likelihood that the recognized words are correct. This field is set only for the top alternative. This field is not guaranteed to be accurate and users should not rely on it to be always provided. The default of 0.0 is a sentinel value indicating `confidence` was not set. */
  confidence?: number;
  /** Output only. A list of word-specific information for each recognized word. Note: When `enable_speaker_diarization` is set to true, you will see all the words from the beginning of the audio. */
  words?: Array<GoogleCloudVideointelligenceV1p3beta1_WordInfo>;
}

export const GoogleCloudVideointelligenceV1p3beta1_SpeechRecognitionAlternative: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_SpeechRecognitionAlternative> = Schema.suspend(() => Schema.Struct({
  transcript: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
  words: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_WordInfo)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_SpeechRecognitionAlternative" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_SpeechRecognitionAlternative>;

export interface GoogleCloudVideointelligenceV1p3beta1_SpeechTranscription {
  /** May contain one or more recognition hypotheses (up to the maximum specified in `max_alternatives`). These alternatives are ordered in terms of accuracy, with the top (first) alternative being the most probable, as ranked by the recognizer. */
  alternatives?: Array<GoogleCloudVideointelligenceV1p3beta1_SpeechRecognitionAlternative>;
  /** Output only. The [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) language tag of the language in this result. This language code was detected to have the most likelihood of being spoken in the audio. */
  languageCode?: string;
}

export const GoogleCloudVideointelligenceV1p3beta1_SpeechTranscription: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_SpeechTranscription> = Schema.suspend(() => Schema.Struct({
  alternatives: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_SpeechRecognitionAlternative)),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_SpeechTranscription" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_SpeechTranscription>;

export interface GoogleCloudVideointelligenceV1p3beta1_NormalizedBoundingPoly {
  /** Normalized vertices of the bounding polygon. */
  vertices?: Array<GoogleCloudVideointelligenceV1p3beta1_NormalizedVertex>;
}

export const GoogleCloudVideointelligenceV1p3beta1_NormalizedBoundingPoly: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_NormalizedBoundingPoly> = Schema.suspend(() => Schema.Struct({
  vertices: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_NormalizedVertex)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_NormalizedBoundingPoly" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_NormalizedBoundingPoly>;

export interface GoogleCloudVideointelligenceV1p3beta1_TextFrame {
  /** Bounding polygon of the detected text for this frame. */
  rotatedBoundingBox?: GoogleCloudVideointelligenceV1p3beta1_NormalizedBoundingPoly;
  /** Timestamp of this frame. */
  timeOffset?: string;
}

export const GoogleCloudVideointelligenceV1p3beta1_TextFrame: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_TextFrame> = Schema.suspend(() => Schema.Struct({
  rotatedBoundingBox: Schema.optional(GoogleCloudVideointelligenceV1p3beta1_NormalizedBoundingPoly),
  timeOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_TextFrame" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_TextFrame>;

export interface GoogleCloudVideointelligenceV1p3beta1_TextSegment {
  /** Video segment where a text snippet was detected. */
  segment?: GoogleCloudVideointelligenceV1p3beta1_VideoSegment;
  /** Confidence for the track of detected text. It is calculated as the highest over all frames where OCR detected text appears. */
  confidence?: number;
  /** Information related to the frames where OCR detected text appears. */
  frames?: Array<GoogleCloudVideointelligenceV1p3beta1_TextFrame>;
}

export const GoogleCloudVideointelligenceV1p3beta1_TextSegment: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_TextSegment> = Schema.suspend(() => Schema.Struct({
  segment: Schema.optional(GoogleCloudVideointelligenceV1p3beta1_VideoSegment),
  confidence: Schema.optional(Schema.Number),
  frames: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_TextFrame)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_TextSegment" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_TextSegment>;

export interface GoogleCloudVideointelligenceV1p3beta1_TextAnnotation {
  /** The detected text. */
  text?: string;
  /** All video segments where OCR detected text appears. */
  segments?: Array<GoogleCloudVideointelligenceV1p3beta1_TextSegment>;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1p3beta1_TextAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_TextAnnotation> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  segments: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_TextSegment)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_TextAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_TextAnnotation>;

export interface GoogleCloudVideointelligenceV1p3beta1_ObjectTrackingFrame {
  /** The normalized bounding box location of this object track for the frame. */
  normalizedBoundingBox?: GoogleCloudVideointelligenceV1p3beta1_NormalizedBoundingBox;
  /** The timestamp of the frame in microseconds. */
  timeOffset?: string;
}

export const GoogleCloudVideointelligenceV1p3beta1_ObjectTrackingFrame: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_ObjectTrackingFrame> = Schema.suspend(() => Schema.Struct({
  normalizedBoundingBox: Schema.optional(GoogleCloudVideointelligenceV1p3beta1_NormalizedBoundingBox),
  timeOffset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_ObjectTrackingFrame" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_ObjectTrackingFrame>;

export interface GoogleCloudVideointelligenceV1p3beta1_ObjectTrackingAnnotation {
  /** Non-streaming batch mode ONLY. Each object track corresponds to one video segment where it appears. */
  segment?: GoogleCloudVideointelligenceV1p3beta1_VideoSegment;
  /** Streaming mode ONLY. In streaming mode, we do not know the end time of a tracked object before it is completed. Hence, there is no VideoSegment info returned. Instead, we provide a unique identifiable integer track_id so that the customers can correlate the results of the ongoing ObjectTrackAnnotation of the same track_id over time. */
  trackId?: string;
  /** Entity to specify the object category that this track is labeled as. */
  entity?: GoogleCloudVideointelligenceV1p3beta1_Entity;
  /** Object category's labeling confidence of this track. */
  confidence?: number;
  /** Information corresponding to all frames where this object track appears. Non-streaming batch mode: it may be one or multiple ObjectTrackingFrame messages in frames. Streaming mode: it can only be one ObjectTrackingFrame message in frames. */
  frames?: Array<GoogleCloudVideointelligenceV1p3beta1_ObjectTrackingFrame>;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1p3beta1_ObjectTrackingAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_ObjectTrackingAnnotation> = Schema.suspend(() => Schema.Struct({
  segment: Schema.optional(GoogleCloudVideointelligenceV1p3beta1_VideoSegment),
  trackId: Schema.optional(Schema.String),
  entity: Schema.optional(GoogleCloudVideointelligenceV1p3beta1_Entity),
  confidence: Schema.optional(Schema.Number),
  frames: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_ObjectTrackingFrame)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_ObjectTrackingAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_ObjectTrackingAnnotation>;

export interface GoogleCloudVideointelligenceV1p3beta1_LogoRecognitionAnnotation {
  /** Entity category information to specify the logo class that all the logo tracks within this LogoRecognitionAnnotation are recognized as. */
  entity?: GoogleCloudVideointelligenceV1p3beta1_Entity;
  /** All logo tracks where the recognized logo appears. Each track corresponds to one logo instance appearing in consecutive frames. */
  tracks?: Array<GoogleCloudVideointelligenceV1p3beta1_Track>;
  /** All video segments where the recognized logo appears. There might be multiple instances of the same logo class appearing in one VideoSegment. */
  segments?: Array<GoogleCloudVideointelligenceV1p3beta1_VideoSegment>;
}

export const GoogleCloudVideointelligenceV1p3beta1_LogoRecognitionAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_LogoRecognitionAnnotation> = Schema.suspend(() => Schema.Struct({
  entity: Schema.optional(GoogleCloudVideointelligenceV1p3beta1_Entity),
  tracks: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_Track)),
  segments: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_VideoSegment)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_LogoRecognitionAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_LogoRecognitionAnnotation>;

export interface GoogleCloudVideointelligenceV1p3beta1_PersonDetectionAnnotation {
  /** The detected tracks of a person. */
  tracks?: Array<GoogleCloudVideointelligenceV1p3beta1_Track>;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1p3beta1_PersonDetectionAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_PersonDetectionAnnotation> = Schema.suspend(() => Schema.Struct({
  tracks: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_Track)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_PersonDetectionAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_PersonDetectionAnnotation>;

export interface GoogleCloudVideointelligenceV1p3beta1_Celebrity {
  /** The resource name of the celebrity. Have the format `video-intelligence/kg-mid` indicates a celebrity from preloaded gallery. kg-mid is the id in Google knowledge graph, which is unique for the celebrity. */
  name?: string;
  /** The celebrity name. */
  displayName?: string;
  /** Textual description of additional information about the celebrity, if applicable. */
  description?: string;
}

export const GoogleCloudVideointelligenceV1p3beta1_Celebrity: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_Celebrity> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_Celebrity" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_Celebrity>;

export interface GoogleCloudVideointelligenceV1p3beta1_RecognizedCelebrity {
  /** The recognized celebrity. */
  celebrity?: GoogleCloudVideointelligenceV1p3beta1_Celebrity;
  /** Recognition confidence. Range [0, 1]. */
  confidence?: number;
}

export const GoogleCloudVideointelligenceV1p3beta1_RecognizedCelebrity: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_RecognizedCelebrity> = Schema.suspend(() => Schema.Struct({
  celebrity: Schema.optional(GoogleCloudVideointelligenceV1p3beta1_Celebrity),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_RecognizedCelebrity" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_RecognizedCelebrity>;

export interface GoogleCloudVideointelligenceV1p3beta1_CelebrityTrack {
  /** Top N match of the celebrities for the face in this track. */
  celebrities?: Array<GoogleCloudVideointelligenceV1p3beta1_RecognizedCelebrity>;
  /** A track of a person's face. */
  faceTrack?: GoogleCloudVideointelligenceV1p3beta1_Track;
}

export const GoogleCloudVideointelligenceV1p3beta1_CelebrityTrack: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_CelebrityTrack> = Schema.suspend(() => Schema.Struct({
  celebrities: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_RecognizedCelebrity)),
  faceTrack: Schema.optional(GoogleCloudVideointelligenceV1p3beta1_Track),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_CelebrityTrack" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_CelebrityTrack>;

export interface GoogleCloudVideointelligenceV1p3beta1_CelebrityRecognitionAnnotation {
  /** The tracks detected from the input video, including recognized celebrities and other detected faces in the video. */
  celebrityTracks?: Array<GoogleCloudVideointelligenceV1p3beta1_CelebrityTrack>;
  /** Feature version. */
  version?: string;
}

export const GoogleCloudVideointelligenceV1p3beta1_CelebrityRecognitionAnnotation: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_CelebrityRecognitionAnnotation> = Schema.suspend(() => Schema.Struct({
  celebrityTracks: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_CelebrityTrack)),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_CelebrityRecognitionAnnotation" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_CelebrityRecognitionAnnotation>;

export interface GoogleCloudVideointelligenceV1p3beta1_VideoAnnotationResults {
  /** Video file location in [Cloud Storage](https://cloud.google.com/storage/). */
  inputUri?: string;
  /** Video segment on which the annotation is run. */
  segment?: GoogleCloudVideointelligenceV1p3beta1_VideoSegment;
  /** Topical label annotations on video level or user-specified segment level. There is exactly one element for each unique label. */
  segmentLabelAnnotations?: Array<GoogleCloudVideointelligenceV1p3beta1_LabelAnnotation>;
  /** Presence label annotations on video level or user-specified segment level. There is exactly one element for each unique label. Compared to the existing topical `segment_label_annotations`, this field presents more fine-grained, segment-level labels detected in video content and is made available only when the client sets `LabelDetectionConfig.model` to "builtin/latest" in the request. */
  segmentPresenceLabelAnnotations?: Array<GoogleCloudVideointelligenceV1p3beta1_LabelAnnotation>;
  /** Topical label annotations on shot level. There is exactly one element for each unique label. */
  shotLabelAnnotations?: Array<GoogleCloudVideointelligenceV1p3beta1_LabelAnnotation>;
  /** Presence label annotations on shot level. There is exactly one element for each unique label. Compared to the existing topical `shot_label_annotations`, this field presents more fine-grained, shot-level labels detected in video content and is made available only when the client sets `LabelDetectionConfig.model` to "builtin/latest" in the request. */
  shotPresenceLabelAnnotations?: Array<GoogleCloudVideointelligenceV1p3beta1_LabelAnnotation>;
  /** Label annotations on frame level. There is exactly one element for each unique label. */
  frameLabelAnnotations?: Array<GoogleCloudVideointelligenceV1p3beta1_LabelAnnotation>;
  /** Deprecated. Please use `face_detection_annotations` instead. */
  faceAnnotations?: Array<GoogleCloudVideointelligenceV1p3beta1_FaceAnnotation>;
  /** Face detection annotations. */
  faceDetectionAnnotations?: Array<GoogleCloudVideointelligenceV1p3beta1_FaceDetectionAnnotation>;
  /** Shot annotations. Each shot is represented as a video segment. */
  shotAnnotations?: Array<GoogleCloudVideointelligenceV1p3beta1_VideoSegment>;
  /** Explicit content annotation. */
  explicitAnnotation?: GoogleCloudVideointelligenceV1p3beta1_ExplicitContentAnnotation;
  /** Speech transcription. */
  speechTranscriptions?: Array<GoogleCloudVideointelligenceV1p3beta1_SpeechTranscription>;
  /** OCR text detection and tracking. Annotations for list of detected text snippets. Each will have list of frame information associated with it. */
  textAnnotations?: Array<GoogleCloudVideointelligenceV1p3beta1_TextAnnotation>;
  /** Annotations for list of objects detected and tracked in video. */
  objectAnnotations?: Array<GoogleCloudVideointelligenceV1p3beta1_ObjectTrackingAnnotation>;
  /** Annotations for list of logos detected, tracked and recognized in video. */
  logoRecognitionAnnotations?: Array<GoogleCloudVideointelligenceV1p3beta1_LogoRecognitionAnnotation>;
  /** Person detection annotations. */
  personDetectionAnnotations?: Array<GoogleCloudVideointelligenceV1p3beta1_PersonDetectionAnnotation>;
  /** Celebrity recognition annotations. */
  celebrityRecognitionAnnotations?: GoogleCloudVideointelligenceV1p3beta1_CelebrityRecognitionAnnotation;
  /** If set, indicates an error. Note that for a single `AnnotateVideoRequest` some videos may succeed and some may fail. */
  error?: GoogleRpc_Status;
}

export const GoogleCloudVideointelligenceV1p3beta1_VideoAnnotationResults: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_VideoAnnotationResults> = Schema.suspend(() => Schema.Struct({
  inputUri: Schema.optional(Schema.String),
  segment: Schema.optional(GoogleCloudVideointelligenceV1p3beta1_VideoSegment),
  segmentLabelAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_LabelAnnotation)),
  segmentPresenceLabelAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_LabelAnnotation)),
  shotLabelAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_LabelAnnotation)),
  shotPresenceLabelAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_LabelAnnotation)),
  frameLabelAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_LabelAnnotation)),
  faceAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_FaceAnnotation)),
  faceDetectionAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_FaceDetectionAnnotation)),
  shotAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_VideoSegment)),
  explicitAnnotation: Schema.optional(GoogleCloudVideointelligenceV1p3beta1_ExplicitContentAnnotation),
  speechTranscriptions: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_SpeechTranscription)),
  textAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_TextAnnotation)),
  objectAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_ObjectTrackingAnnotation)),
  logoRecognitionAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_LogoRecognitionAnnotation)),
  personDetectionAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_PersonDetectionAnnotation)),
  celebrityRecognitionAnnotations: Schema.optional(GoogleCloudVideointelligenceV1p3beta1_CelebrityRecognitionAnnotation),
  error: Schema.optional(GoogleRpc_Status),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_VideoAnnotationResults" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_VideoAnnotationResults>;

export interface GoogleCloudVideointelligenceV1p3beta1_AnnotateVideoResponse {
  /** Annotation results for all videos specified in `AnnotateVideoRequest`. */
  annotationResults?: Array<GoogleCloudVideointelligenceV1p3beta1_VideoAnnotationResults>;
}

export const GoogleCloudVideointelligenceV1p3beta1_AnnotateVideoResponse: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_AnnotateVideoResponse> = Schema.suspend(() => Schema.Struct({
  annotationResults: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_VideoAnnotationResults)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_AnnotateVideoResponse" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_AnnotateVideoResponse>;

export interface GoogleCloudVideointelligenceV1p3beta1_ExportToOutputUriStatus {
  /** Output only. State of the `output_uri` export. */
  state?: "STATE_UNSPECIFIED" | "SUCCEEDED" | "FAILED" | (string & {});
  /** Output only. Only set if state is FAILED. */
  status?: GoogleRpc_Status;
}

export const GoogleCloudVideointelligenceV1p3beta1_ExportToOutputUriStatus: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_ExportToOutputUriStatus> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  status: Schema.optional(GoogleRpc_Status),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_ExportToOutputUriStatus" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_ExportToOutputUriStatus>;

export interface GoogleCloudVideointelligenceV1p3beta1_VideoAnnotationProgress {
  /** Video file location in [Cloud Storage](https://cloud.google.com/storage/). */
  inputUri?: string;
  /** Approximate percentage processed thus far. Guaranteed to be 100 when fully processed. */
  progressPercent?: number;
  /** Time when the request was received. */
  startTime?: string;
  /** Time of the most recent update. */
  updateTime?: string;
  /** Specifies which feature is being tracked if the request contains more than one feature. */
  feature?: "FEATURE_UNSPECIFIED" | "LABEL_DETECTION" | "SHOT_CHANGE_DETECTION" | "EXPLICIT_CONTENT_DETECTION" | "FACE_DETECTION" | "SPEECH_TRANSCRIPTION" | "TEXT_DETECTION" | "OBJECT_TRACKING" | "LOGO_RECOGNITION" | "CELEBRITY_RECOGNITION" | "PERSON_DETECTION" | (string & {});
  /** Specifies which segment is being tracked if the request contains more than one segment. */
  segment?: GoogleCloudVideointelligenceV1p3beta1_VideoSegment;
  /** Status of exporting annotation response to user specified `output_uri`. Only set if `output_uri` is set in the request. */
  exportStatus?: GoogleCloudVideointelligenceV1p3beta1_ExportToOutputUriStatus;
}

export const GoogleCloudVideointelligenceV1p3beta1_VideoAnnotationProgress: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_VideoAnnotationProgress> = Schema.suspend(() => Schema.Struct({
  inputUri: Schema.optional(Schema.String),
  progressPercent: Schema.optional(Schema.Number),
  startTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  feature: Schema.optional(Schema.String),
  segment: Schema.optional(GoogleCloudVideointelligenceV1p3beta1_VideoSegment),
  exportStatus: Schema.optional(GoogleCloudVideointelligenceV1p3beta1_ExportToOutputUriStatus),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_VideoAnnotationProgress" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_VideoAnnotationProgress>;

export interface GoogleCloudVideointelligenceV1p3beta1_AnnotateVideoProgress {
  /** Progress metadata for all videos specified in `AnnotateVideoRequest`. */
  annotationProgress?: Array<GoogleCloudVideointelligenceV1p3beta1_VideoAnnotationProgress>;
}

export const GoogleCloudVideointelligenceV1p3beta1_AnnotateVideoProgress: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_AnnotateVideoProgress> = Schema.suspend(() => Schema.Struct({
  annotationProgress: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_VideoAnnotationProgress)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_AnnotateVideoProgress" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_AnnotateVideoProgress>;

export interface GoogleCloudVideointelligenceV1p3beta1_StreamingVideoAnnotationResults {
  /** Timestamp of the processed frame in microseconds. */
  frameTimestamp?: string;
  /** Shot annotation results. Each shot is represented as a video segment. */
  shotAnnotations?: Array<GoogleCloudVideointelligenceV1p3beta1_VideoSegment>;
  /** Label annotation results. */
  labelAnnotations?: Array<GoogleCloudVideointelligenceV1p3beta1_LabelAnnotation>;
  /** Explicit content annotation results. */
  explicitAnnotation?: GoogleCloudVideointelligenceV1p3beta1_ExplicitContentAnnotation;
  /** Object tracking results. */
  objectAnnotations?: Array<GoogleCloudVideointelligenceV1p3beta1_ObjectTrackingAnnotation>;
}

export const GoogleCloudVideointelligenceV1p3beta1_StreamingVideoAnnotationResults: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_StreamingVideoAnnotationResults> = Schema.suspend(() => Schema.Struct({
  frameTimestamp: Schema.optional(Schema.String),
  shotAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_VideoSegment)),
  labelAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_LabelAnnotation)),
  explicitAnnotation: Schema.optional(GoogleCloudVideointelligenceV1p3beta1_ExplicitContentAnnotation),
  objectAnnotations: Schema.optional(Schema.Array(GoogleCloudVideointelligenceV1p3beta1_ObjectTrackingAnnotation)),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_StreamingVideoAnnotationResults" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_StreamingVideoAnnotationResults>;

export interface GoogleCloudVideointelligenceV1p3beta1_StreamingAnnotateVideoResponse {
  /** If set, returns a google.rpc.Status message that specifies the error for the operation. */
  error?: GoogleRpc_Status;
  /** Streaming annotation results. */
  annotationResults?: GoogleCloudVideointelligenceV1p3beta1_StreamingVideoAnnotationResults;
  /** Google Cloud Storage URI that stores annotation results of one streaming session in JSON format. It is the annotation_result_storage_directory from the request followed by '/cloud_project_number-session_id'. */
  annotationResultsUri?: string;
}

export const GoogleCloudVideointelligenceV1p3beta1_StreamingAnnotateVideoResponse: Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_StreamingAnnotateVideoResponse> = Schema.suspend(() => Schema.Struct({
  error: Schema.optional(GoogleRpc_Status),
  annotationResults: Schema.optional(GoogleCloudVideointelligenceV1p3beta1_StreamingVideoAnnotationResults),
  annotationResultsUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudVideointelligenceV1p3beta1_StreamingAnnotateVideoResponse" }) as any as Schema.Schema<GoogleCloudVideointelligenceV1p3beta1_StreamingAnnotateVideoResponse>;

// ==========================================================================
// Operations
// ==========================================================================

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
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = GoogleLongrunning_ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = GoogleLongrunning_ListOperationsResponse;

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

export type GetProjectsLocationsOperationsResponse = GoogleLongrunning_Operation;
export const GetProjectsLocationsOperationsResponse = GoogleLongrunning_Operation;

export type GetProjectsLocationsOperationsError = CommonErrors;

export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsOperationsRequest>;

export type DeleteProjectsLocationsOperationsResponse = GoogleProtobuf_Empty;
export const DeleteProjectsLocationsOperationsResponse = GoogleProtobuf_Empty;

export type DeleteProjectsLocationsOperationsError = CommonErrors;

export const deleteProjectsLocationsOperations: API.OperationMethod<DeleteProjectsLocationsOperationsRequest, DeleteProjectsLocationsOperationsResponse, DeleteProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: GoogleLongrunning_CancelOperationRequest;
}

export const CancelProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleLongrunning_CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = GoogleProtobuf_Empty;
export const CancelProjectsLocationsOperationsResponse = GoogleProtobuf_Empty;

export type CancelProjectsLocationsOperationsError = CommonErrors;

export const cancelProjectsLocationsOperations: API.OperationMethod<CancelProjectsLocationsOperationsRequest, CancelProjectsLocationsOperationsResponse, CancelProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetOperationsProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOperationsProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/operations/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOperationsProjectsLocationsOperationsRequest>;

export type GetOperationsProjectsLocationsOperationsResponse = GoogleLongrunning_Operation;
export const GetOperationsProjectsLocationsOperationsResponse = GoogleLongrunning_Operation;

export type GetOperationsProjectsLocationsOperationsError = CommonErrors;

export const getOperationsProjectsLocationsOperations: API.OperationMethod<GetOperationsProjectsLocationsOperationsRequest, GetOperationsProjectsLocationsOperationsResponse, GetOperationsProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOperationsProjectsLocationsOperationsRequest,
  output: GetOperationsProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteOperationsProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteOperationsProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/operations/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOperationsProjectsLocationsOperationsRequest>;

export type DeleteOperationsProjectsLocationsOperationsResponse = GoogleProtobuf_Empty;
export const DeleteOperationsProjectsLocationsOperationsResponse = GoogleProtobuf_Empty;

export type DeleteOperationsProjectsLocationsOperationsError = CommonErrors;

export const deleteOperationsProjectsLocationsOperations: API.OperationMethod<DeleteOperationsProjectsLocationsOperationsRequest, DeleteOperationsProjectsLocationsOperationsResponse, DeleteOperationsProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOperationsProjectsLocationsOperationsRequest,
  output: DeleteOperationsProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelOperationsProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
}

export const CancelOperationsProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "POST", path: "v1/operations/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelOperationsProjectsLocationsOperationsRequest>;

export type CancelOperationsProjectsLocationsOperationsResponse = GoogleProtobuf_Empty;
export const CancelOperationsProjectsLocationsOperationsResponse = GoogleProtobuf_Empty;

export type CancelOperationsProjectsLocationsOperationsError = CommonErrors;

export const cancelOperationsProjectsLocationsOperations: API.OperationMethod<CancelOperationsProjectsLocationsOperationsRequest, CancelOperationsProjectsLocationsOperationsResponse, CancelOperationsProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelOperationsProjectsLocationsOperationsRequest,
  output: CancelOperationsProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Performs asynchronous video annotation. Progress and results can be retrieved through the `google.longrunning.Operations` interface. `Operation.metadata` contains `AnnotateVideoProgress` (progress). `Operation.response` contains `AnnotateVideoResponse` (results). */
export interface AnnotateVideosRequest {
  /** Request body */
  body?: GoogleCloudVideointelligenceV1_AnnotateVideoRequest;
}

export const AnnotateVideosRequest = Schema.Struct({
  body: Schema.optional(GoogleCloudVideointelligenceV1_AnnotateVideoRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/videos:annotate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AnnotateVideosRequest>;

export type AnnotateVideosResponse = GoogleLongrunning_Operation;
export const AnnotateVideosResponse = GoogleLongrunning_Operation;

export type AnnotateVideosError = CommonErrors;

export const annotateVideos: API.OperationMethod<AnnotateVideosRequest, AnnotateVideosResponse, AnnotateVideosError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AnnotateVideosRequest,
  output: AnnotateVideosResponse,
  errors: [],
}));

