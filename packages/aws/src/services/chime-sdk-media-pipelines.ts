import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Chime SDK Media Pipelines",
  serviceShapeName: "ChimeSDKMediaPipelinesService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "chime" });
const ver = /*@__PURE__*/ T.ServiceVersion("2021-07-15");
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
              `https://media-pipelines-chime-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://media-pipelines-chime-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://media-pipelines-chime.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://media-pipelines-chime.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://media-pipelines-chime.{R}.{D}","properties":{},"headers":{}}');

export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourceLimitExceededException>()(
    "ResourceLimitExceededException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ServiceFailureException
  extends /*@__PURE__*/ S.TaggedError<ServiceFailureException>()(
    "ServiceFailureException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export class ThrottledClientException
  extends /*@__PURE__*/ S.TaggedError<ThrottledClientException>()(
    "ThrottledClientException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnauthorizedClientException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedClientException>()(
    "UnauthorizedClientException",
    {
      Code: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ErrorCode" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RequestId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export type MediaPipelineSourceType = "ChimeSdkMeeting" | (string & {});
export type Arn = string | redacted.Redacted<string>;
export type MediaPipelineSinkType = "S3Bucket" | (string & {});
export type ClientRequestToken = string | redacted.Redacted<string>;
export type GuidString = string;
export type AttendeeIdList = string[];
export type ExternalUserIdType = string | redacted.Redacted<string>;
export type ExternalUserIdList = (string | redacted.Redacted<string>)[];
export interface SelectedVideoStreams {
  AttendeeIds?: string[];
  ExternalUserIds?: (string | redacted.Redacted<string>)[];
}
export interface SourceConfiguration {
  SelectedVideoStreams?: SelectedVideoStreams;
}
export type AudioMuxType =
  | "AudioOnly"
  | "AudioWithActiveSpeakerVideo"
  | "AudioWithCompositedVideo"
  | (string & {});
export interface AudioArtifactsConfiguration {
  MuxType: AudioMuxType;
}
export type ArtifactsState = "Enabled" | "Disabled" | (string & {});
export type VideoMuxType = "VideoOnly" | (string & {});
export interface VideoArtifactsConfiguration {
  State: ArtifactsState;
  MuxType?: VideoMuxType;
}
export type ContentMuxType = "ContentOnly" | (string & {});
export interface ContentArtifactsConfiguration {
  State: ArtifactsState;
  MuxType?: ContentMuxType;
}
export type LayoutOption = "GridView" | (string & {});
export type ResolutionOption = "HD" | "FHD" | (string & {});
export type ContentShareLayoutOption =
  | "PresenterOnly"
  | "Horizontal"
  | "Vertical"
  | "ActiveSpeakerOnly"
  | (string & {});
export type PresenterPosition =
  | "TopLeft"
  | "TopRight"
  | "BottomLeft"
  | "BottomRight"
  | (string & {});
export interface PresenterOnlyConfiguration {
  PresenterPosition?: PresenterPosition;
}
export type ActiveSpeakerPosition =
  | "TopLeft"
  | "TopRight"
  | "BottomLeft"
  | "BottomRight"
  | (string & {});
export interface ActiveSpeakerOnlyConfiguration {
  ActiveSpeakerPosition?: ActiveSpeakerPosition;
}
export type TileOrder = "JoinSequence" | "SpeakerSequence" | (string & {});
export type HorizontalTilePosition = "Top" | "Bottom" | (string & {});
export type TileCount = number;
export type TileAspectRatio = string;
export interface HorizontalLayoutConfiguration {
  TileOrder?: TileOrder;
  TilePosition?: HorizontalTilePosition;
  TileCount?: number;
  TileAspectRatio?: string;
}
export type VerticalTilePosition = "Left" | "Right" | (string & {});
export interface VerticalLayoutConfiguration {
  TileOrder?: TileOrder;
  TilePosition?: VerticalTilePosition;
  TileCount?: number;
  TileAspectRatio?: string;
}
export type CornerRadius = number;
export type BorderColor = "Black" | "Blue" | "Red" | "Green" | "White" | "Yellow" | (string & {});
export type HighlightColor =
  | "Black"
  | "Blue"
  | "Red"
  | "Green"
  | "White"
  | "Yellow"
  | (string & {});
export type BorderThickness = number;
export interface VideoAttribute {
  CornerRadius?: number;
  BorderColor?: BorderColor;
  HighlightColor?: HighlightColor;
  BorderThickness?: number;
}
export type CanvasOrientation = "Landscape" | "Portrait" | (string & {});
export interface GridViewConfiguration {
  ContentShareLayout: ContentShareLayoutOption;
  PresenterOnlyConfiguration?: PresenterOnlyConfiguration;
  ActiveSpeakerOnlyConfiguration?: ActiveSpeakerOnlyConfiguration;
  HorizontalLayoutConfiguration?: HorizontalLayoutConfiguration;
  VerticalLayoutConfiguration?: VerticalLayoutConfiguration;
  VideoAttribute?: VideoAttribute;
  CanvasOrientation?: CanvasOrientation;
}
export interface CompositedVideoArtifactsConfiguration {
  Layout?: LayoutOption;
  Resolution?: ResolutionOption;
  GridViewConfiguration: GridViewConfiguration;
}
export interface ArtifactsConfiguration {
  Audio: AudioArtifactsConfiguration;
  Video: VideoArtifactsConfiguration;
  Content: ContentArtifactsConfiguration;
  CompositedVideo?: CompositedVideoArtifactsConfiguration;
}
export interface ChimeSdkMeetingConfiguration {
  SourceConfiguration?: SourceConfiguration;
  ArtifactsConfiguration?: ArtifactsConfiguration;
}
export interface SseAwsKeyManagementParams {
  AwsKmsKeyId: string;
  AwsKmsEncryptionContext?: string;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface CreateMediaCapturePipelineRequest {
  SourceType: MediaPipelineSourceType;
  SourceArn: string | redacted.Redacted<string>;
  SinkType: MediaPipelineSinkType;
  SinkArn: string | redacted.Redacted<string>;
  ClientRequestToken?: string | redacted.Redacted<string>;
  ChimeSdkMeetingConfiguration?: ChimeSdkMeetingConfiguration;
  SseAwsKeyManagementParams?: SseAwsKeyManagementParams;
  SinkIamRoleArn?: string | redacted.Redacted<string>;
  Tags?: Tag[];
}
export type AmazonResourceName = string;
export type MediaPipelineStatus =
  | "Initializing"
  | "InProgress"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | "Paused"
  | "NotStarted"
  | (string & {});
export type Iso8601Timestamp = Date;
export interface MediaCapturePipeline {
  MediaPipelineId?: string;
  MediaPipelineArn?: string;
  SourceType?: MediaPipelineSourceType;
  SourceArn?: string | redacted.Redacted<string>;
  Status?: MediaPipelineStatus;
  SinkType?: MediaPipelineSinkType;
  SinkArn?: string | redacted.Redacted<string>;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  ChimeSdkMeetingConfiguration?: ChimeSdkMeetingConfiguration;
  SseAwsKeyManagementParams?: SseAwsKeyManagementParams;
  SinkIamRoleArn?: string | redacted.Redacted<string>;
}
export interface CreateMediaCapturePipelineResponse {
  MediaCapturePipeline?: MediaCapturePipeline;
}
export type ConcatenationSourceType = "MediaCapturePipeline" | (string & {});
export type AudioArtifactsConcatenationState = "Enabled" | (string & {});
export interface AudioConcatenationConfiguration {
  State: AudioArtifactsConcatenationState;
}
export type ArtifactsConcatenationState = "Enabled" | "Disabled" | (string & {});
export interface VideoConcatenationConfiguration {
  State: ArtifactsConcatenationState;
}
export interface ContentConcatenationConfiguration {
  State: ArtifactsConcatenationState;
}
export interface DataChannelConcatenationConfiguration {
  State: ArtifactsConcatenationState;
}
export interface TranscriptionMessagesConcatenationConfiguration {
  State: ArtifactsConcatenationState;
}
export interface MeetingEventsConcatenationConfiguration {
  State: ArtifactsConcatenationState;
}
export interface CompositedVideoConcatenationConfiguration {
  State: ArtifactsConcatenationState;
}
export interface ArtifactsConcatenationConfiguration {
  Audio: AudioConcatenationConfiguration;
  Video: VideoConcatenationConfiguration;
  Content: ContentConcatenationConfiguration;
  DataChannel: DataChannelConcatenationConfiguration;
  TranscriptionMessages: TranscriptionMessagesConcatenationConfiguration;
  MeetingEvents: MeetingEventsConcatenationConfiguration;
  CompositedVideo: CompositedVideoConcatenationConfiguration;
}
export interface ChimeSdkMeetingConcatenationConfiguration {
  ArtifactsConfiguration: ArtifactsConcatenationConfiguration;
}
export interface MediaCapturePipelineSourceConfiguration {
  MediaPipelineArn: string | redacted.Redacted<string>;
  ChimeSdkMeetingConfiguration: ChimeSdkMeetingConcatenationConfiguration;
}
export interface ConcatenationSource {
  Type: ConcatenationSourceType;
  MediaCapturePipelineSourceConfiguration: MediaCapturePipelineSourceConfiguration;
}
export type ConcatenationSourceList = ConcatenationSource[];
export type ConcatenationSinkType = "S3Bucket" | (string & {});
export interface S3BucketSinkConfiguration {
  Destination: string | redacted.Redacted<string>;
}
export interface ConcatenationSink {
  Type: ConcatenationSinkType;
  S3BucketSinkConfiguration: S3BucketSinkConfiguration;
}
export type ConcatenationSinkList = ConcatenationSink[];
export interface CreateMediaConcatenationPipelineRequest {
  Sources: ConcatenationSource[];
  Sinks: ConcatenationSink[];
  ClientRequestToken?: string | redacted.Redacted<string>;
  Tags?: Tag[];
}
export interface MediaConcatenationPipeline {
  MediaPipelineId?: string;
  MediaPipelineArn?: string;
  Sources?: ConcatenationSource[];
  Sinks?: ConcatenationSink[];
  Status?: MediaPipelineStatus;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export interface CreateMediaConcatenationPipelineResponse {
  MediaConcatenationPipeline?: MediaConcatenationPipeline;
}
export type KinesisVideoStreamArn = string;
export type FragmentNumberString = string;
export type NumberOfChannels = number;
export type ChannelId = number;
export type ParticipantRole = "AGENT" | "CUSTOMER" | (string & {});
export interface ChannelDefinition {
  ChannelId: number;
  ParticipantRole?: ParticipantRole;
}
export type ChannelDefinitions = ChannelDefinition[];
export interface StreamChannelDefinition {
  NumberOfChannels: number;
  ChannelDefinitions?: ChannelDefinition[];
}
export interface StreamConfiguration {
  StreamArn: string;
  FragmentNumber?: string;
  StreamChannelDefinition: StreamChannelDefinition;
}
export type Streams = StreamConfiguration[];
export type MediaEncoding = "pcm" | (string & {});
export type MediaSampleRateHertz = number;
export interface KinesisVideoStreamSourceRuntimeConfiguration {
  Streams: StreamConfiguration[];
  MediaEncoding: MediaEncoding;
  MediaSampleRate: number;
}
export type NonEmptyString = string;
export type MediaInsightsRuntimeMetadata = { [key: string]: string | undefined };
export interface RecordingStreamConfiguration {
  StreamArn?: string;
}
export type RecordingStreamList = RecordingStreamConfiguration[];
export type FragmentSelectorType = "ProducerTimestamp" | "ServerTimestamp" | (string & {});
export interface TimestampRange {
  StartTimestamp: Date;
  EndTimestamp: Date;
}
export interface FragmentSelector {
  FragmentSelectorType: FragmentSelectorType;
  TimestampRange: TimestampRange;
}
export interface KinesisVideoStreamRecordingSourceRuntimeConfiguration {
  Streams: RecordingStreamConfiguration[];
  FragmentSelector: FragmentSelector;
}
export type RecordingFileFormat = "Wav" | "Opus" | (string & {});
export interface S3RecordingSinkRuntimeConfiguration {
  Destination: string | redacted.Redacted<string>;
  RecordingFileFormat: RecordingFileFormat;
}
export interface CreateMediaInsightsPipelineRequest {
  MediaInsightsPipelineConfigurationArn: string | redacted.Redacted<string>;
  KinesisVideoStreamSourceRuntimeConfiguration?: KinesisVideoStreamSourceRuntimeConfiguration;
  MediaInsightsRuntimeMetadata?: { [key: string]: string | undefined };
  KinesisVideoStreamRecordingSourceRuntimeConfiguration?: KinesisVideoStreamRecordingSourceRuntimeConfiguration;
  S3RecordingSinkRuntimeConfiguration?: S3RecordingSinkRuntimeConfiguration;
  Tags?: Tag[];
  ClientRequestToken?: string | redacted.Redacted<string>;
}
export type MediaInsightsPipelineConfigurationElementType =
  | "AmazonTranscribeCallAnalyticsProcessor"
  | "VoiceAnalyticsProcessor"
  | "AmazonTranscribeProcessor"
  | "KinesisDataStreamSink"
  | "LambdaFunctionSink"
  | "SqsQueueSink"
  | "SnsTopicSink"
  | "S3RecordingSink"
  | "VoiceEnhancementSink"
  | (string & {});
export type MediaPipelineElementStatus =
  | "NotStarted"
  | "NotSupported"
  | "Initializing"
  | "InProgress"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | "Paused"
  | (string & {});
export interface MediaInsightsPipelineElementStatus {
  Type?: MediaInsightsPipelineConfigurationElementType;
  Status?: MediaPipelineElementStatus;
}
export type MediaInsightsPipelineElementStatuses = MediaInsightsPipelineElementStatus[];
export interface MediaInsightsPipeline {
  MediaPipelineId?: string;
  MediaPipelineArn?: string | redacted.Redacted<string>;
  MediaInsightsPipelineConfigurationArn?: string | redacted.Redacted<string>;
  Status?: MediaPipelineStatus;
  KinesisVideoStreamSourceRuntimeConfiguration?: KinesisVideoStreamSourceRuntimeConfiguration;
  MediaInsightsRuntimeMetadata?: { [key: string]: string | undefined };
  KinesisVideoStreamRecordingSourceRuntimeConfiguration?: KinesisVideoStreamRecordingSourceRuntimeConfiguration;
  S3RecordingSinkRuntimeConfiguration?: S3RecordingSinkRuntimeConfiguration;
  CreatedTimestamp?: Date;
  ElementStatuses?: MediaInsightsPipelineElementStatus[];
}
export interface CreateMediaInsightsPipelineResponse {
  MediaInsightsPipeline: MediaInsightsPipeline;
}
export type MediaInsightsPipelineConfigurationNameString = string;
export type RealTimeAlertRuleType = "KeywordMatch" | "Sentiment" | "IssueDetection" | (string & {});
export type RuleName = string;
export type Keyword = string;
export type KeywordMatchWordList = string[];
export interface KeywordMatchConfiguration {
  RuleName: string;
  Keywords: string[];
  Negate?: boolean;
}
export type SentimentType = "NEGATIVE" | (string & {});
export type SentimentTimePeriodInSeconds = number;
export interface SentimentConfiguration {
  RuleName: string;
  SentimentType: SentimentType;
  TimePeriod: number;
}
export interface IssueDetectionConfiguration {
  RuleName: string;
}
export interface RealTimeAlertRule {
  Type: RealTimeAlertRuleType;
  KeywordMatchConfiguration?: KeywordMatchConfiguration;
  SentimentConfiguration?: SentimentConfiguration;
  IssueDetectionConfiguration?: IssueDetectionConfiguration;
}
export type RealTimeAlertRuleList = RealTimeAlertRule[];
export interface RealTimeAlertConfiguration {
  Disabled?: boolean;
  Rules?: RealTimeAlertRule[];
}
export type CallAnalyticsLanguageCode =
  | "en-US"
  | "en-GB"
  | "es-US"
  | "fr-CA"
  | "fr-FR"
  | "en-AU"
  | "it-IT"
  | "de-DE"
  | "pt-BR"
  | (string & {});
export type VocabularyName = string;
export type VocabularyFilterName = string;
export type VocabularyFilterMethod = "remove" | "mask" | "tag" | (string & {});
export type ModelName = string;
export type PartialResultsStability = "high" | "medium" | "low" | (string & {});
export type ContentType = "PII" | (string & {});
export type PiiEntityTypes = string;
export type ContentRedactionOutput = "redacted" | "redacted_and_unredacted" | (string & {});
export interface PostCallAnalyticsSettings {
  OutputLocation: string;
  DataAccessRoleArn: string;
  ContentRedactionOutput?: ContentRedactionOutput;
  OutputEncryptionKMSKeyId?: string;
}
export type CategoryName = string;
export type CategoryNameList = string[];
export interface AmazonTranscribeCallAnalyticsProcessorConfiguration {
  LanguageCode: CallAnalyticsLanguageCode;
  VocabularyName?: string;
  VocabularyFilterName?: string;
  VocabularyFilterMethod?: VocabularyFilterMethod;
  LanguageModelName?: string;
  EnablePartialResultsStabilization?: boolean;
  PartialResultsStability?: PartialResultsStability;
  ContentIdentificationType?: ContentType;
  ContentRedactionType?: ContentType;
  PiiEntityTypes?: string;
  FilterPartialResults?: boolean;
  PostCallAnalyticsSettings?: PostCallAnalyticsSettings;
  CallAnalyticsStreamCategories?: string[];
}
export type LanguageOptions = string;
export type VocabularyNames = string;
export type VocabularyFilterNames = string;
export interface AmazonTranscribeProcessorConfiguration {
  LanguageCode?: CallAnalyticsLanguageCode;
  VocabularyName?: string;
  VocabularyFilterName?: string;
  VocabularyFilterMethod?: VocabularyFilterMethod;
  ShowSpeakerLabel?: boolean;
  EnablePartialResultsStabilization?: boolean;
  PartialResultsStability?: PartialResultsStability;
  ContentIdentificationType?: ContentType;
  ContentRedactionType?: ContentType;
  PiiEntityTypes?: string;
  LanguageModelName?: string;
  FilterPartialResults?: boolean;
  IdentifyLanguage?: boolean;
  IdentifyMultipleLanguages?: boolean;
  LanguageOptions?: string;
  PreferredLanguage?: CallAnalyticsLanguageCode;
  VocabularyNames?: string;
  VocabularyFilterNames?: string;
}
export interface KinesisDataStreamSinkConfiguration {
  InsightsTarget?: string | redacted.Redacted<string>;
}
export interface S3RecordingSinkConfiguration {
  Destination?: string | redacted.Redacted<string>;
  RecordingFileFormat?: RecordingFileFormat;
}
export type VoiceAnalyticsConfigurationStatus = "Enabled" | "Disabled" | (string & {});
export interface VoiceAnalyticsProcessorConfiguration {
  SpeakerSearchStatus?: VoiceAnalyticsConfigurationStatus;
  VoiceToneAnalysisStatus?: VoiceAnalyticsConfigurationStatus;
}
export interface LambdaFunctionSinkConfiguration {
  InsightsTarget?: string | redacted.Redacted<string>;
}
export interface SqsQueueSinkConfiguration {
  InsightsTarget?: string | redacted.Redacted<string>;
}
export interface SnsTopicSinkConfiguration {
  InsightsTarget?: string | redacted.Redacted<string>;
}
export interface VoiceEnhancementSinkConfiguration {
  Disabled?: boolean;
}
export interface MediaInsightsPipelineConfigurationElement {
  Type: MediaInsightsPipelineConfigurationElementType;
  AmazonTranscribeCallAnalyticsProcessorConfiguration?: AmazonTranscribeCallAnalyticsProcessorConfiguration;
  AmazonTranscribeProcessorConfiguration?: AmazonTranscribeProcessorConfiguration;
  KinesisDataStreamSinkConfiguration?: KinesisDataStreamSinkConfiguration;
  S3RecordingSinkConfiguration?: S3RecordingSinkConfiguration;
  VoiceAnalyticsProcessorConfiguration?: VoiceAnalyticsProcessorConfiguration;
  LambdaFunctionSinkConfiguration?: LambdaFunctionSinkConfiguration;
  SqsQueueSinkConfiguration?: SqsQueueSinkConfiguration;
  SnsTopicSinkConfiguration?: SnsTopicSinkConfiguration;
  VoiceEnhancementSinkConfiguration?: VoiceEnhancementSinkConfiguration;
}
export type MediaInsightsPipelineConfigurationElements =
  MediaInsightsPipelineConfigurationElement[];
export interface CreateMediaInsightsPipelineConfigurationRequest {
  MediaInsightsPipelineConfigurationName: string;
  ResourceAccessRoleArn: string | redacted.Redacted<string>;
  RealTimeAlertConfiguration?: RealTimeAlertConfiguration;
  Elements: MediaInsightsPipelineConfigurationElement[];
  Tags?: Tag[];
  ClientRequestToken?: string | redacted.Redacted<string>;
}
export interface MediaInsightsPipelineConfiguration {
  MediaInsightsPipelineConfigurationName?: string;
  MediaInsightsPipelineConfigurationArn?: string | redacted.Redacted<string>;
  ResourceAccessRoleArn?: string | redacted.Redacted<string>;
  RealTimeAlertConfiguration?: RealTimeAlertConfiguration;
  Elements?: MediaInsightsPipelineConfigurationElement[];
  MediaInsightsPipelineConfigurationId?: string;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export interface CreateMediaInsightsPipelineConfigurationResponse {
  MediaInsightsPipelineConfiguration?: MediaInsightsPipelineConfiguration;
}
export type LiveConnectorSourceType = "ChimeSdkMeeting" | (string & {});
export type LiveConnectorMuxType =
  | "AudioWithCompositedVideo"
  | "AudioWithActiveSpeakerVideo"
  | (string & {});
export interface ChimeSdkMeetingLiveConnectorConfiguration {
  Arn: string | redacted.Redacted<string>;
  MuxType: LiveConnectorMuxType;
  CompositedVideo?: CompositedVideoArtifactsConfiguration;
  SourceConfiguration?: SourceConfiguration;
}
export interface LiveConnectorSourceConfiguration {
  SourceType: LiveConnectorSourceType;
  ChimeSdkMeetingLiveConnectorConfiguration: ChimeSdkMeetingLiveConnectorConfiguration;
}
export type LiveConnectorSourceList = LiveConnectorSourceConfiguration[];
export type LiveConnectorSinkType = "RTMP" | (string & {});
export type SensitiveString = string | redacted.Redacted<string>;
export type AudioChannelsOption = "Stereo" | "Mono" | (string & {});
export type AudioSampleRateOption = string;
export interface LiveConnectorRTMPConfiguration {
  Url: string | redacted.Redacted<string>;
  AudioChannels?: AudioChannelsOption;
  AudioSampleRate?: string;
}
export interface LiveConnectorSinkConfiguration {
  SinkType: LiveConnectorSinkType;
  RTMPConfiguration: LiveConnectorRTMPConfiguration;
}
export type LiveConnectorSinkList = LiveConnectorSinkConfiguration[];
export interface CreateMediaLiveConnectorPipelineRequest {
  Sources: LiveConnectorSourceConfiguration[];
  Sinks: LiveConnectorSinkConfiguration[];
  ClientRequestToken?: string | redacted.Redacted<string>;
  Tags?: Tag[];
}
export interface MediaLiveConnectorPipeline {
  Sources?: LiveConnectorSourceConfiguration[];
  Sinks?: LiveConnectorSinkConfiguration[];
  MediaPipelineId?: string;
  MediaPipelineArn?: string;
  Status?: MediaPipelineStatus;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export interface CreateMediaLiveConnectorPipelineResponse {
  MediaLiveConnectorPipeline?: MediaLiveConnectorPipeline;
}
export type AwsRegion = string;
export type DataRetentionInHours = number;
export interface KinesisVideoStreamConfiguration {
  Region: string;
  DataRetentionInHours?: number;
}
export type KinesisVideoStreamPoolName = string;
export interface CreateMediaPipelineKinesisVideoStreamPoolRequest {
  StreamConfiguration: KinesisVideoStreamConfiguration;
  PoolName: string;
  ClientRequestToken?: string | redacted.Redacted<string>;
  Tags?: Tag[];
}
export type KinesisVideoStreamPoolId = string;
export type KinesisVideoStreamPoolStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "FAILED"
  | (string & {});
export type KinesisVideoStreamPoolSize = number;
export interface KinesisVideoStreamPoolConfiguration {
  PoolArn?: string | redacted.Redacted<string>;
  PoolName?: string;
  PoolId?: string;
  PoolStatus?: KinesisVideoStreamPoolStatus;
  PoolSize?: number;
  StreamConfiguration?: KinesisVideoStreamConfiguration;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export interface CreateMediaPipelineKinesisVideoStreamPoolResponse {
  KinesisVideoStreamPoolConfiguration?: KinesisVideoStreamPoolConfiguration;
}
export interface MediaStreamSource {
  SourceType: MediaPipelineSourceType;
  SourceArn: string | redacted.Redacted<string>;
}
export type MediaStreamSourceList = MediaStreamSource[];
export type MediaStreamPipelineSinkType = "KinesisVideoStreamPool" | (string & {});
export type ReservedStreamCapacity = number;
export type MediaStreamType = "MixedAudio" | "IndividualAudio" | (string & {});
export interface MediaStreamSink {
  SinkArn: string | redacted.Redacted<string>;
  SinkType: MediaStreamPipelineSinkType;
  ReservedStreamCapacity: number;
  MediaStreamType: MediaStreamType;
}
export type MediaStreamSinkList = MediaStreamSink[];
export interface CreateMediaStreamPipelineRequest {
  Sources: MediaStreamSource[];
  Sinks: MediaStreamSink[];
  ClientRequestToken?: string | redacted.Redacted<string>;
  Tags?: Tag[];
}
export interface MediaStreamPipeline {
  MediaPipelineId?: string;
  MediaPipelineArn?: string;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  Status?: MediaPipelineStatus;
  Sources?: MediaStreamSource[];
  Sinks?: MediaStreamSink[];
}
export interface CreateMediaStreamPipelineResponse {
  MediaStreamPipeline?: MediaStreamPipeline;
}
export interface DeleteMediaCapturePipelineRequest {
  MediaPipelineId: string;
}
export interface DeleteMediaCapturePipelineResponse {}
export interface DeleteMediaInsightsPipelineConfigurationRequest {
  Identifier: string;
}
export interface DeleteMediaInsightsPipelineConfigurationResponse {}
export interface DeleteMediaPipelineRequest {
  MediaPipelineId: string;
}
export interface DeleteMediaPipelineResponse {}
export interface DeleteMediaPipelineKinesisVideoStreamPoolRequest {
  Identifier: string;
}
export interface DeleteMediaPipelineKinesisVideoStreamPoolResponse {}
export interface GetMediaCapturePipelineRequest {
  MediaPipelineId: string;
}
export interface GetMediaCapturePipelineResponse {
  MediaCapturePipeline?: MediaCapturePipeline;
}
export interface GetMediaInsightsPipelineConfigurationRequest {
  Identifier: string;
}
export interface GetMediaInsightsPipelineConfigurationResponse {
  MediaInsightsPipelineConfiguration?: MediaInsightsPipelineConfiguration;
}
export interface GetMediaPipelineRequest {
  MediaPipelineId: string;
}
export interface MediaPipeline {
  MediaCapturePipeline?: MediaCapturePipeline;
  MediaLiveConnectorPipeline?: MediaLiveConnectorPipeline;
  MediaConcatenationPipeline?: MediaConcatenationPipeline;
  MediaInsightsPipeline?: MediaInsightsPipeline;
  MediaStreamPipeline?: MediaStreamPipeline;
}
export interface GetMediaPipelineResponse {
  MediaPipeline?: MediaPipeline;
}
export interface GetMediaPipelineKinesisVideoStreamPoolRequest {
  Identifier: string;
}
export interface GetMediaPipelineKinesisVideoStreamPoolResponse {
  KinesisVideoStreamPoolConfiguration?: KinesisVideoStreamPoolConfiguration;
}
export interface GetSpeakerSearchTaskRequest {
  Identifier: string;
  SpeakerSearchTaskId: string;
}
export type MediaPipelineTaskStatus =
  | "NotStarted"
  | "Initializing"
  | "InProgress"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | (string & {});
export interface SpeakerSearchTask {
  SpeakerSearchTaskId?: string;
  SpeakerSearchTaskStatus?: MediaPipelineTaskStatus;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export interface GetSpeakerSearchTaskResponse {
  SpeakerSearchTask?: SpeakerSearchTask;
}
export interface GetVoiceToneAnalysisTaskRequest {
  Identifier: string;
  VoiceToneAnalysisTaskId: string;
}
export interface VoiceToneAnalysisTask {
  VoiceToneAnalysisTaskId?: string;
  VoiceToneAnalysisTaskStatus?: MediaPipelineTaskStatus;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export interface GetVoiceToneAnalysisTaskResponse {
  VoiceToneAnalysisTask?: VoiceToneAnalysisTask;
}
export type ResultMax = number;
export interface ListMediaCapturePipelinesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface MediaCapturePipelineSummary {
  MediaPipelineId?: string;
  MediaPipelineArn?: string;
}
export type MediaCapturePipelineSummaryList = MediaCapturePipelineSummary[];
export interface ListMediaCapturePipelinesResponse {
  MediaCapturePipelines?: MediaCapturePipelineSummary[];
  NextToken?: string;
}
export interface ListMediaInsightsPipelineConfigurationsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface MediaInsightsPipelineConfigurationSummary {
  MediaInsightsPipelineConfigurationName?: string;
  MediaInsightsPipelineConfigurationId?: string;
  MediaInsightsPipelineConfigurationArn?: string | redacted.Redacted<string>;
}
export type MediaInsightsPipelineConfigurationSummaryList =
  MediaInsightsPipelineConfigurationSummary[];
export interface ListMediaInsightsPipelineConfigurationsResponse {
  MediaInsightsPipelineConfigurations?: MediaInsightsPipelineConfigurationSummary[];
  NextToken?: string;
}
export interface ListMediaPipelineKinesisVideoStreamPoolsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface KinesisVideoStreamPoolSummary {
  PoolName?: string;
  PoolId?: string;
  PoolArn?: string | redacted.Redacted<string>;
}
export type KinesisVideoStreamPoolSummaryList = KinesisVideoStreamPoolSummary[];
export interface ListMediaPipelineKinesisVideoStreamPoolsResponse {
  KinesisVideoStreamPools?: KinesisVideoStreamPoolSummary[];
  NextToken?: string;
}
export interface ListMediaPipelinesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface MediaPipelineSummary {
  MediaPipelineId?: string;
  MediaPipelineArn?: string;
}
export type MediaPipelineList = MediaPipelineSummary[];
export interface ListMediaPipelinesResponse {
  MediaPipelines?: MediaPipelineSummary[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export interface KinesisVideoStreamSourceTaskConfiguration {
  StreamArn: string;
  ChannelId: number;
  FragmentNumber?: string;
}
export interface StartSpeakerSearchTaskRequest {
  Identifier: string;
  VoiceProfileDomainArn: string | redacted.Redacted<string>;
  KinesisVideoStreamSourceTaskConfiguration?: KinesisVideoStreamSourceTaskConfiguration;
  ClientRequestToken?: string | redacted.Redacted<string>;
}
export interface StartSpeakerSearchTaskResponse {
  SpeakerSearchTask?: SpeakerSearchTask;
}
export type VoiceAnalyticsLanguageCode = "en-US" | (string & {});
export interface StartVoiceToneAnalysisTaskRequest {
  Identifier: string;
  LanguageCode: VoiceAnalyticsLanguageCode;
  KinesisVideoStreamSourceTaskConfiguration?: KinesisVideoStreamSourceTaskConfiguration;
  ClientRequestToken?: string | redacted.Redacted<string>;
}
export interface StartVoiceToneAnalysisTaskResponse {
  VoiceToneAnalysisTask?: VoiceToneAnalysisTask;
}
export interface StopSpeakerSearchTaskRequest {
  Identifier: string;
  SpeakerSearchTaskId: string;
}
export interface StopSpeakerSearchTaskResponse {}
export interface StopVoiceToneAnalysisTaskRequest {
  Identifier: string;
  VoiceToneAnalysisTaskId: string;
}
export interface StopVoiceToneAnalysisTaskResponse {}
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateMediaInsightsPipelineConfigurationRequest {
  Identifier: string;
  ResourceAccessRoleArn: string | redacted.Redacted<string>;
  RealTimeAlertConfiguration?: RealTimeAlertConfiguration;
  Elements: MediaInsightsPipelineConfigurationElement[];
}
export interface UpdateMediaInsightsPipelineConfigurationResponse {
  MediaInsightsPipelineConfiguration?: MediaInsightsPipelineConfiguration;
}
export type MediaPipelineStatusUpdate = "Pause" | "Resume" | (string & {});
export interface UpdateMediaInsightsPipelineStatusRequest {
  Identifier: string;
  UpdateStatus: MediaPipelineStatusUpdate;
}
export interface UpdateMediaInsightsPipelineStatusResponse {}
export type DataRetentionChangeInHours = number;
export interface KinesisVideoStreamConfigurationUpdate {
  DataRetentionInHours?: number;
}
export interface UpdateMediaPipelineKinesisVideoStreamPoolRequest {
  Identifier: string;
  StreamConfiguration?: KinesisVideoStreamConfigurationUpdate;
}
export interface UpdateMediaPipelineKinesisVideoStreamPoolResponse {
  KinesisVideoStreamPoolConfiguration?: KinesisVideoStreamPoolConfiguration;
}
export type ErrorCode =
  | "BadRequest"
  | "Forbidden"
  | "NotFound"
  | "ResourceLimitExceeded"
  | "ServiceFailure"
  | "ServiceUnavailable"
  | "Throttling"
  | (string & {});
export type CreateMediaCapturePipelineError =
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates a media pipeline.
 */
export const createMediaCapturePipeline: API.OperationMethod<
  CreateMediaCapturePipelineRequest,
  CreateMediaCapturePipelineResponse,
  CreateMediaCapturePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1312, __c41, 0) as any as S.Schema<CreateMediaCapturePipelineRequest>,
  output: __S(1440, __c45, 0) as any as S.Schema<CreateMediaCapturePipelineResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMediaCapturePipeline",
}));

export type CreateMediaConcatenationPipelineError =
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates a media concatenation pipeline.
 */
export const createMediaConcatenationPipeline: API.OperationMethod<
  CreateMediaConcatenationPipelineRequest,
  CreateMediaConcatenationPipelineResponse,
  CreateMediaConcatenationPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateMediaConcatenationPipelineRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateMediaConcatenationPipelineResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMediaConcatenationPipeline",
}));

export type CreateMediaInsightsPipelineError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates a media insights pipeline.
 */
export const createMediaInsightsPipeline: API.OperationMethod<
  CreateMediaInsightsPipelineRequest,
  CreateMediaInsightsPipelineResponse,
  CreateMediaInsightsPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c2, 0) as any as S.Schema<CreateMediaInsightsPipelineRequest>,
  output: __S(65, __c2, 1) as any as S.Schema<CreateMediaInsightsPipelineResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMediaInsightsPipeline",
}));

export type CreateMediaInsightsPipelineConfigurationError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * A structure that contains the static configurations for a media insights
 * pipeline.
 */
export const createMediaInsightsPipelineConfiguration: API.OperationMethod<
  CreateMediaInsightsPipelineConfigurationRequest,
  CreateMediaInsightsPipelineConfigurationResponse,
  CreateMediaInsightsPipelineConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c4, 0) as any as S.Schema<CreateMediaInsightsPipelineConfigurationRequest>,
  output: __S(176, __c5, 16) as any as S.Schema<CreateMediaInsightsPipelineConfigurationResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMediaInsightsPipelineConfiguration",
}));

export type CreateMediaLiveConnectorPipelineError =
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates a media live connector pipeline in an Amazon Chime SDK meeting.
 */
export const createMediaLiveConnectorPipeline: API.OperationMethod<
  CreateMediaLiveConnectorPipelineRequest,
  CreateMediaLiveConnectorPipelineResponse,
  CreateMediaLiveConnectorPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c6, 0) as any as S.Schema<CreateMediaLiveConnectorPipelineRequest>,
  output: __S(193, __c6, 1) as any as S.Schema<CreateMediaLiveConnectorPipelineResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMediaLiveConnectorPipeline",
}));

export type CreateMediaPipelineKinesisVideoStreamPoolError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates an Amazon Kinesis Video Stream pool for use with media stream
 * pipelines.
 *
 * If a meeting uses an opt-in Region as its
 * MediaRegion,
 * the KVS stream must be in that same Region. For example, if a meeting uses the `af-south-1` Region, the KVS stream must also be in `af-south-1`. However, if the meeting uses a
 * Region that AWS turns on by default, the KVS stream can be in any available Region, including an opt-in Region. For example, if the meeting uses `ca-central-1`, the KVS stream can be in
 * `eu-west-2`, `us-east-1`, `af-south-1`, or any other Region that the Amazon Chime SDK supports.
 *
 * To learn which AWS Region a meeting uses, call the GetMeeting API and
 * use the MediaRegion
 * parameter from the response.
 *
 * For more information about opt-in Regions, refer to Available Regions in the
 * *Amazon Chime SDK Developer Guide*, and
 * Specify which AWS Regions your account can use,
 * in the *AWS Account Management Reference Guide*.
 */
export const createMediaPipelineKinesisVideoStreamPool: API.OperationMethod<
  CreateMediaPipelineKinesisVideoStreamPoolRequest,
  CreateMediaPipelineKinesisVideoStreamPoolResponse,
  CreateMediaPipelineKinesisVideoStreamPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c8, 0) as any as S.Schema<CreateMediaPipelineKinesisVideoStreamPoolRequest>,
  output: __S(290, __c9, 2) as any as S.Schema<CreateMediaPipelineKinesisVideoStreamPoolResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMediaPipelineKinesisVideoStreamPool",
}));

export type CreateMediaStreamPipelineError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates a streaming media pipeline.
 */
export const createMediaStreamPipeline: API.OperationMethod<
  CreateMediaStreamPipelineRequest,
  CreateMediaStreamPipelineResponse,
  CreateMediaStreamPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c10, 0) as any as S.Schema<CreateMediaStreamPipelineRequest>,
  output: __S(321, __c10, 1) as any as S.Schema<CreateMediaStreamPipelineResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMediaStreamPipeline",
}));

export type DeleteMediaCapturePipelineError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes the media pipeline.
 */
export const deleteMediaCapturePipeline: API.OperationMethod<
  DeleteMediaCapturePipelineRequest,
  DeleteMediaCapturePipelineResponse,
  DeleteMediaCapturePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c12, 0) as any as S.Schema<DeleteMediaCapturePipelineRequest>,
  output: __S(416, __c13, 0) as any as S.Schema<DeleteMediaCapturePipelineResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMediaCapturePipeline",
}));

export type DeleteMediaInsightsPipelineConfigurationError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes the specified configuration settings.
 */
export const deleteMediaInsightsPipelineConfiguration: API.OperationMethod<
  DeleteMediaInsightsPipelineConfigurationRequest,
  DeleteMediaInsightsPipelineConfigurationResponse,
  DeleteMediaInsightsPipelineConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c14, 0) as any as S.Schema<DeleteMediaInsightsPipelineConfigurationRequest>,
  output: __S(416, __c13, 0) as any as S.Schema<DeleteMediaInsightsPipelineConfigurationResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMediaInsightsPipelineConfiguration",
}));

export type DeleteMediaPipelineError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes the media pipeline.
 */
export const deleteMediaPipeline: API.OperationMethod<
  DeleteMediaPipelineRequest,
  DeleteMediaPipelineResponse,
  DeleteMediaPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c15, 0) as any as S.Schema<DeleteMediaPipelineRequest>,
  output: __S(416, __c13, 0) as any as S.Schema<DeleteMediaPipelineResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMediaPipeline",
}));

export type DeleteMediaPipelineKinesisVideoStreamPoolError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes an Amazon Kinesis Video Stream pool.
 */
export const deleteMediaPipelineKinesisVideoStreamPool: API.OperationMethod<
  DeleteMediaPipelineKinesisVideoStreamPoolRequest,
  DeleteMediaPipelineKinesisVideoStreamPoolResponse,
  DeleteMediaPipelineKinesisVideoStreamPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c16, 0) as any as S.Schema<DeleteMediaPipelineKinesisVideoStreamPoolRequest>,
  output: __S(416, __c13, 0) as any as S.Schema<DeleteMediaPipelineKinesisVideoStreamPoolResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMediaPipelineKinesisVideoStreamPool",
}));

export type GetMediaCapturePipelineError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Gets an existing media pipeline.
 */
export const getMediaCapturePipeline: API.OperationMethod<
  GetMediaCapturePipelineRequest,
  GetMediaCapturePipelineResponse,
  GetMediaCapturePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c17, 0) as any as S.Schema<GetMediaCapturePipelineRequest>,
  output: __S(1440, __c45, 0) as any as S.Schema<GetMediaCapturePipelineResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMediaCapturePipeline",
}));

export type GetMediaInsightsPipelineConfigurationError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Gets the configuration settings for a media insights pipeline.
 */
export const getMediaInsightsPipelineConfiguration: API.OperationMethod<
  GetMediaInsightsPipelineConfigurationRequest,
  GetMediaInsightsPipelineConfigurationResponse,
  GetMediaInsightsPipelineConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c18, 0) as any as S.Schema<GetMediaInsightsPipelineConfigurationRequest>,
  output: __S(176, __c5, 16) as any as S.Schema<GetMediaInsightsPipelineConfigurationResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMediaInsightsPipelineConfiguration",
}));

export type GetMediaPipelineError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Gets an existing media pipeline.
 */
export const getMediaPipeline: API.OperationMethod<
  GetMediaPipelineRequest,
  GetMediaPipelineResponse,
  GetMediaPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c19, 0) as any as S.Schema<GetMediaPipelineRequest>,
  output: __S(610, __c19, 2) as any as S.Schema<GetMediaPipelineResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMediaPipeline",
}));

export type GetMediaPipelineKinesisVideoStreamPoolError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Gets an Kinesis video stream pool.
 */
export const getMediaPipelineKinesisVideoStreamPool: API.OperationMethod<
  GetMediaPipelineKinesisVideoStreamPoolRequest,
  GetMediaPipelineKinesisVideoStreamPoolResponse,
  GetMediaPipelineKinesisVideoStreamPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c20, 0) as any as S.Schema<GetMediaPipelineKinesisVideoStreamPoolRequest>,
  output: __S(290, __c9, 2) as any as S.Schema<GetMediaPipelineKinesisVideoStreamPoolResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMediaPipelineKinesisVideoStreamPool",
}));

export type GetSpeakerSearchTaskError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves the details of the specified speaker search task.
 */
export const getSpeakerSearchTask: API.OperationMethod<
  GetSpeakerSearchTaskRequest,
  GetSpeakerSearchTaskResponse,
  GetSpeakerSearchTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c21, 0) as any as S.Schema<GetSpeakerSearchTaskRequest>,
  output: __S(705, __c22, 1) as any as S.Schema<GetSpeakerSearchTaskResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSpeakerSearchTask",
}));

export type GetVoiceToneAnalysisTaskError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves the details of a voice tone analysis task.
 */
export const getVoiceToneAnalysisTask: API.OperationMethod<
  GetVoiceToneAnalysisTaskRequest,
  GetVoiceToneAnalysisTaskResponse,
  GetVoiceToneAnalysisTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c23, 0) as any as S.Schema<GetVoiceToneAnalysisTaskRequest>,
  output: __S(769, __c24, 1) as any as S.Schema<GetVoiceToneAnalysisTaskResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVoiceToneAnalysisTask",
}));

export type ListMediaCapturePipelinesError =
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Returns a list of media pipelines.
 */
export const listMediaCapturePipelines: API.PaginatedOperationMethod<
  ListMediaCapturePipelinesRequest,
  ListMediaCapturePipelinesResponse,
  ListMediaCapturePipelinesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(800, __c25, 0) as any as S.Schema<ListMediaCapturePipelinesRequest>,
  output: __S(801, __c25, 1) as any as S.Schema<ListMediaCapturePipelinesResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMediaCapturePipelines",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMediaInsightsPipelineConfigurationsError =
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the available media insights pipeline configurations.
 */
export const listMediaInsightsPipelineConfigurations: API.PaginatedOperationMethod<
  ListMediaInsightsPipelineConfigurationsRequest,
  ListMediaInsightsPipelineConfigurationsResponse,
  ListMediaInsightsPipelineConfigurationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(864, __c27, 0) as any as S.Schema<ListMediaInsightsPipelineConfigurationsRequest>,
  output: __S(867, __c27, 3) as any as S.Schema<ListMediaInsightsPipelineConfigurationsResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMediaInsightsPipelineConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMediaPipelineKinesisVideoStreamPoolsError =
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the video stream pools in the media pipeline.
 */
export const listMediaPipelineKinesisVideoStreamPools: API.PaginatedOperationMethod<
  ListMediaPipelineKinesisVideoStreamPoolsRequest,
  ListMediaPipelineKinesisVideoStreamPoolsResponse,
  ListMediaPipelineKinesisVideoStreamPoolsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(896, __c28, 0) as any as S.Schema<ListMediaPipelineKinesisVideoStreamPoolsRequest>,
  output: __S(899, __c28, 3) as any as S.Schema<ListMediaPipelineKinesisVideoStreamPoolsResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMediaPipelineKinesisVideoStreamPools",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMediaPipelinesError =
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Returns a list of media pipelines.
 */
export const listMediaPipelines: API.PaginatedOperationMethod<
  ListMediaPipelinesRequest,
  ListMediaPipelinesResponse,
  ListMediaPipelinesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(928, __c29, 0) as any as S.Schema<ListMediaPipelinesRequest>,
  output: __S(929, __c29, 1) as any as S.Schema<ListMediaPipelinesResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMediaPipelines",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the tags available for a media pipeline.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c30, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(961, __c30, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type StartSpeakerSearchTaskError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Starts a speaker search task.
 *
 * Before starting any speaker search tasks, you must provide all notices and obtain all consents from the speaker as required under applicable privacy and biometrics laws, and as required under the
 * AWS service terms for the Amazon Chime SDK.
 */
export const startSpeakerSearchTask: API.OperationMethod<
  StartSpeakerSearchTaskRequest,
  StartSpeakerSearchTaskResponse,
  StartSpeakerSearchTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c31, 0) as any as S.Schema<StartSpeakerSearchTaskRequest>,
  output: __S(705, __c22, 1) as any as S.Schema<StartSpeakerSearchTaskResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSpeakerSearchTask",
}));

export type StartVoiceToneAnalysisTaskError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Starts a voice tone analysis task. For more information about voice tone analysis, see
 * Using Amazon Chime SDK voice analytics
 * in the *Amazon Chime SDK Developer Guide*.
 *
 * Before starting any voice tone analysis tasks, you must provide all notices and obtain all consents from the speaker as required under applicable privacy and biometrics laws, and as required under the
 * AWS service terms for the Amazon Chime SDK.
 */
export const startVoiceToneAnalysisTask: API.OperationMethod<
  StartVoiceToneAnalysisTaskRequest,
  StartVoiceToneAnalysisTaskResponse,
  StartVoiceToneAnalysisTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c33, 0) as any as S.Schema<StartVoiceToneAnalysisTaskRequest>,
  output: __S(769, __c24, 1) as any as S.Schema<StartVoiceToneAnalysisTaskResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartVoiceToneAnalysisTask",
}));

export type StopSpeakerSearchTaskError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Stops a speaker search task.
 */
export const stopSpeakerSearchTask: API.OperationMethod<
  StopSpeakerSearchTaskRequest,
  StopSpeakerSearchTaskResponse,
  StopSpeakerSearchTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c34, 0) as any as S.Schema<StopSpeakerSearchTaskRequest>,
  output: __S(416, __c13, 0) as any as S.Schema<StopSpeakerSearchTaskResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopSpeakerSearchTask",
}));

export type StopVoiceToneAnalysisTaskError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Stops a voice tone analysis task.
 */
export const stopVoiceToneAnalysisTask: API.OperationMethod<
  StopVoiceToneAnalysisTaskRequest,
  StopVoiceToneAnalysisTaskResponse,
  StopVoiceToneAnalysisTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c35, 0) as any as S.Schema<StopVoiceToneAnalysisTaskRequest>,
  output: __S(416, __c13, 0) as any as S.Schema<StopVoiceToneAnalysisTaskResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopVoiceToneAnalysisTask",
}));

export type TagResourceError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * The ARN of the media pipeline that you want to tag. Consists of the pipeline's endpoint region, resource ID, and pipeline ID.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c36, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(416, __c13, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Removes any tags from a media pipeline.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c37, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(416, __c13, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateMediaInsightsPipelineConfigurationError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates the media insights pipeline's configuration settings.
 */
export const updateMediaInsightsPipelineConfiguration: API.OperationMethod<
  UpdateMediaInsightsPipelineConfigurationRequest,
  UpdateMediaInsightsPipelineConfigurationResponse,
  UpdateMediaInsightsPipelineConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1216, __c38, 0) as any as S.Schema<UpdateMediaInsightsPipelineConfigurationRequest>,
  output: __S(176, __c5, 16) as any as S.Schema<UpdateMediaInsightsPipelineConfigurationResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMediaInsightsPipelineConfiguration",
}));

export type UpdateMediaInsightsPipelineStatusError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates the status of a media insights pipeline.
 */
export const updateMediaInsightsPipelineStatus: API.OperationMethod<
  UpdateMediaInsightsPipelineStatusRequest,
  UpdateMediaInsightsPipelineStatusResponse,
  UpdateMediaInsightsPipelineStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c39, 0) as any as S.Schema<UpdateMediaInsightsPipelineStatusRequest>,
  output: __S(416, __c13, 0) as any as S.Schema<UpdateMediaInsightsPipelineStatusResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMediaInsightsPipelineStatus",
}));

export type UpdateMediaPipelineKinesisVideoStreamPoolError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates an Amazon Kinesis Video Stream pool in a media pipeline.
 */
export const updateMediaPipelineKinesisVideoStreamPool: API.OperationMethod<
  UpdateMediaPipelineKinesisVideoStreamPoolRequest,
  UpdateMediaPipelineKinesisVideoStreamPoolResponse,
  UpdateMediaPipelineKinesisVideoStreamPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1281, __c40, 1) as any as S.Schema<UpdateMediaPipelineKinesisVideoStreamPoolRequest>,
  output: __S(290, __c9, 2) as any as S.Schema<UpdateMediaPipelineKinesisVideoStreamPoolResponse>,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMediaPipelineKinesisVideoStreamPool",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Sources: __S(37, __c1, 5),
          Sinks: __S(40, __c1, 8),
          ClientRequestToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(1345, __c42, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/sdk-media-concatenation-pipelines" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateMediaConcatenationPipelineRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ MediaConcatenationPipeline: S.optional(__S(41, __c1, 9)) }),
      ).annotate({ identifier: "CreateMediaConcatenationPipelineResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ State: S.String })).annotate({
        identifier: "AudioConcatenationConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Audio: __S(32, __c1, 0),
          Video: __S(32, __c1, 0),
          Content: __S(32, __c1, 0),
          DataChannel: __S(32, __c1, 0),
          TranscriptionMessages: __S(32, __c1, 0),
          MeetingEvents: __S(32, __c1, 0),
          CompositedVideo: __S(32, __c1, 0),
        }),
      ).annotate({ identifier: "ArtifactsConcatenationConfiguration" });
    case 2:
      return S.suspend(() => S.Struct({ ArtifactsConfiguration: __S(33, __c1, 1) })).annotate({
        identifier: "ChimeSdkMeetingConcatenationConfiguration",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          MediaPipelineArn: SensitiveString,
          ChimeSdkMeetingConfiguration: __S(34, __c1, 2),
        }),
      ).annotate({ identifier: "MediaCapturePipelineSourceConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({ Type: S.String, MediaCapturePipelineSourceConfiguration: __S(35, __c1, 3) }),
      ).annotate({ identifier: "ConcatenationSource" });
    case 5:
      return S.Array(__S(36, __c1, 4));
    case 6:
      return S.suspend(() => S.Struct({ Destination: SensitiveString })).annotate({
        identifier: "S3BucketSinkConfiguration",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({ Type: S.String, S3BucketSinkConfiguration: __S(38, __c1, 6) }),
      ).annotate({ identifier: "ConcatenationSink" });
    case 8:
      return S.Array(__S(39, __c1, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          MediaPipelineId: S.optional(S.String),
          MediaPipelineArn: S.optional(S.String),
          Sources: S.optional(__S(37, __c1, 5)),
          Sinks: S.optional(__S(40, __c1, 8)),
          Status: S.optional(S.String),
          CreatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "MediaConcatenationPipeline" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MediaInsightsPipelineConfigurationArn: SensitiveString,
          KinesisVideoStreamSourceRuntimeConfiguration: S.optional(__S(101, __c3, 5)),
          MediaInsightsRuntimeMetadata: S.optional(__S(102, __c3, 6)),
          KinesisVideoStreamRecordingSourceRuntimeConfiguration: S.optional(__S(107, __c3, 11)),
          S3RecordingSinkRuntimeConfiguration: S.optional(__S(108, __c3, 12)),
          Tags: S.optional(__S(1345, __c42, 1)),
          ClientRequestToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/media-insights-pipelines" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateMediaInsightsPipelineRequest" });
    case 1:
      return S.suspend(() => S.Struct({ MediaInsightsPipeline: __S(111, __c3, 15) })).annotate({
        identifier: "CreateMediaInsightsPipelineResponse",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChannelId: S.Number, ParticipantRole: S.optional(S.String) }),
      ).annotate({ identifier: "ChannelDefinition" });
    case 1:
      return S.Array(__S(96, __c3, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ NumberOfChannels: S.Number, ChannelDefinitions: S.optional(__S(97, __c3, 1)) }),
      ).annotate({ identifier: "StreamChannelDefinition" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          StreamArn: S.String,
          FragmentNumber: S.optional(S.String),
          StreamChannelDefinition: __S(98, __c3, 2),
        }),
      ).annotate({ identifier: "StreamConfiguration" });
    case 4:
      return S.Array(__S(99, __c3, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Streams: __S(100, __c3, 4),
          MediaEncoding: S.String,
          MediaSampleRate: S.Number,
        }),
      ).annotate({ identifier: "KinesisVideoStreamSourceRuntimeConfiguration" });
    case 6:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 7:
      return S.suspend(() => S.Struct({ StreamArn: S.optional(S.String) })).annotate({
        identifier: "RecordingStreamConfiguration",
      });
    case 8:
      return S.Array(__S(103, __c3, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          StartTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "TimestampRange" });
    case 10:
      return S.suspend(() =>
        S.Struct({ FragmentSelectorType: S.String, TimestampRange: __S(105, __c3, 9) }),
      ).annotate({ identifier: "FragmentSelector" });
    case 11:
      return S.suspend(() =>
        S.Struct({ Streams: __S(104, __c3, 8), FragmentSelector: __S(106, __c3, 10) }),
      ).annotate({ identifier: "KinesisVideoStreamRecordingSourceRuntimeConfiguration" });
    case 12:
      return S.suspend(() =>
        S.Struct({ Destination: SensitiveString, RecordingFileFormat: S.String }),
      ).annotate({ identifier: "S3RecordingSinkRuntimeConfiguration" });
    case 13:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "MediaInsightsPipelineElementStatus" });
    case 14:
      return S.Array(__S(109, __c3, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          MediaPipelineId: S.optional(S.String),
          MediaPipelineArn: S.optional(SensitiveString),
          MediaInsightsPipelineConfigurationArn: S.optional(SensitiveString),
          Status: S.optional(S.String),
          KinesisVideoStreamSourceRuntimeConfiguration: S.optional(__S(101, __c3, 5)),
          MediaInsightsRuntimeMetadata: S.optional(__S(102, __c3, 6)),
          KinesisVideoStreamRecordingSourceRuntimeConfiguration: S.optional(__S(107, __c3, 11)),
          S3RecordingSinkRuntimeConfiguration: S.optional(__S(108, __c3, 12)),
          CreatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ElementStatuses: S.optional(__S(110, __c3, 14)),
        }),
      ).annotate({ identifier: "MediaInsightsPipeline" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MediaInsightsPipelineConfigurationName: S.String,
          ResourceAccessRoleArn: SensitiveString,
          RealTimeAlertConfiguration: S.optional(__S(165, __c5, 5)),
          Elements: __S(174, __c5, 14),
          Tags: S.optional(__S(1345, __c42, 1)),
          ClientRequestToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/media-insights-pipeline-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateMediaInsightsPipelineConfigurationRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleName: S.String,
          Keywords: __S(1376, __c43, 0),
          Negate: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "KeywordMatchConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ RuleName: S.String, SentimentType: S.String, TimePeriod: S.Number }),
      ).annotate({ identifier: "SentimentConfiguration" });
    case 2:
      return S.suspend(() => S.Struct({ RuleName: S.String })).annotate({
        identifier: "IssueDetectionConfiguration",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Type: S.String,
          KeywordMatchConfiguration: S.optional(__S(160, __c5, 0)),
          SentimentConfiguration: S.optional(__S(161, __c5, 1)),
          IssueDetectionConfiguration: S.optional(__S(162, __c5, 2)),
        }),
      ).annotate({ identifier: "RealTimeAlertRule" });
    case 4:
      return S.Array(__S(163, __c5, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ Disabled: S.optional(S.Boolean), Rules: S.optional(__S(164, __c5, 4)) }),
      ).annotate({ identifier: "RealTimeAlertConfiguration" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          OutputLocation: S.String,
          DataAccessRoleArn: S.String,
          ContentRedactionOutput: S.optional(S.String),
          OutputEncryptionKMSKeyId: S.optional(S.String),
        }),
      ).annotate({ identifier: "PostCallAnalyticsSettings" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          LanguageCode: S.String,
          VocabularyName: S.optional(S.String),
          VocabularyFilterName: S.optional(S.String),
          VocabularyFilterMethod: S.optional(S.String),
          LanguageModelName: S.optional(S.String),
          EnablePartialResultsStabilization: S.optional(S.Boolean),
          PartialResultsStability: S.optional(S.String),
          ContentIdentificationType: S.optional(S.String),
          ContentRedactionType: S.optional(S.String),
          PiiEntityTypes: S.optional(S.String),
          FilterPartialResults: S.optional(S.Boolean),
          PostCallAnalyticsSettings: S.optional(__S(166, __c5, 6)),
          CallAnalyticsStreamCategories: S.optional(__S(1376, __c43, 0)),
        }),
      ).annotate({ identifier: "AmazonTranscribeCallAnalyticsProcessorConfiguration" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          LanguageCode: S.optional(S.String),
          VocabularyName: S.optional(S.String),
          VocabularyFilterName: S.optional(S.String),
          VocabularyFilterMethod: S.optional(S.String),
          ShowSpeakerLabel: S.optional(S.Boolean),
          EnablePartialResultsStabilization: S.optional(S.Boolean),
          PartialResultsStability: S.optional(S.String),
          ContentIdentificationType: S.optional(S.String),
          ContentRedactionType: S.optional(S.String),
          PiiEntityTypes: S.optional(S.String),
          LanguageModelName: S.optional(S.String),
          FilterPartialResults: S.optional(S.Boolean),
          IdentifyLanguage: S.optional(S.Boolean),
          IdentifyMultipleLanguages: S.optional(S.Boolean),
          LanguageOptions: S.optional(S.String),
          PreferredLanguage: S.optional(S.String),
          VocabularyNames: S.optional(S.String),
          VocabularyFilterNames: S.optional(S.String),
        }),
      ).annotate({ identifier: "AmazonTranscribeProcessorConfiguration" });
    case 9:
      return S.suspend(() => S.Struct({ InsightsTarget: S.optional(SensitiveString) })).annotate({
        identifier: "KinesisDataStreamSinkConfiguration",
      });
    case 10:
      return S.suspend(() =>
        S.Struct({
          Destination: S.optional(SensitiveString),
          RecordingFileFormat: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3RecordingSinkConfiguration" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          SpeakerSearchStatus: S.optional(S.String),
          VoiceToneAnalysisStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "VoiceAnalyticsProcessorConfiguration" });
    case 12:
      return S.suspend(() => S.Struct({ Disabled: S.optional(S.Boolean) })).annotate({
        identifier: "VoiceEnhancementSinkConfiguration",
      });
    case 13:
      return S.suspend(() =>
        S.Struct({
          Type: S.String,
          AmazonTranscribeCallAnalyticsProcessorConfiguration: S.optional(__S(167, __c5, 7)),
          AmazonTranscribeProcessorConfiguration: S.optional(__S(168, __c5, 8)),
          KinesisDataStreamSinkConfiguration: S.optional(__S(169, __c5, 9)),
          S3RecordingSinkConfiguration: S.optional(__S(170, __c5, 10)),
          VoiceAnalyticsProcessorConfiguration: S.optional(__S(171, __c5, 11)),
          LambdaFunctionSinkConfiguration: S.optional(__S(169, __c5, 9)),
          SqsQueueSinkConfiguration: S.optional(__S(169, __c5, 9)),
          SnsTopicSinkConfiguration: S.optional(__S(169, __c5, 9)),
          VoiceEnhancementSinkConfiguration: S.optional(__S(172, __c5, 12)),
        }),
      ).annotate({ identifier: "MediaInsightsPipelineConfigurationElement" });
    case 14:
      return S.Array(__S(173, __c5, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          MediaInsightsPipelineConfigurationName: S.optional(S.String),
          MediaInsightsPipelineConfigurationArn: S.optional(SensitiveString),
          ResourceAccessRoleArn: S.optional(SensitiveString),
          RealTimeAlertConfiguration: S.optional(__S(165, __c5, 5)),
          Elements: S.optional(__S(174, __c5, 14)),
          MediaInsightsPipelineConfigurationId: S.optional(S.String),
          CreatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "MediaInsightsPipelineConfiguration" });
    case 16:
      return S.suspend(() =>
        S.Struct({ MediaInsightsPipelineConfiguration: S.optional(__S(175, __c5, 15)) }),
      ).annotate({ identifier: "CreateMediaInsightsPipelineConfigurationResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Sources: __S(226, __c7, 2),
          Sinks: __S(229, __c7, 5),
          ClientRequestToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(1345, __c42, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/sdk-media-live-connector-pipelines" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateMediaLiveConnectorPipelineRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ MediaLiveConnectorPipeline: S.optional(__S(230, __c7, 6)) }),
      ).annotate({ identifier: "CreateMediaLiveConnectorPipelineResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: SensitiveString,
          MuxType: S.String,
          CompositedVideo: S.optional(__S(1416, __c44, 8)),
          SourceConfiguration: S.optional(__S(1410, __c44, 2)),
        }),
      ).annotate({ identifier: "ChimeSdkMeetingLiveConnectorConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SourceType: S.String,
          ChimeSdkMeetingLiveConnectorConfiguration: __S(224, __c7, 0),
        }),
      ).annotate({ identifier: "LiveConnectorSourceConfiguration" });
    case 2:
      return S.Array(__S(225, __c7, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Url: SensitiveString,
          AudioChannels: S.optional(S.String),
          AudioSampleRate: S.optional(S.String),
        }),
      ).annotate({ identifier: "LiveConnectorRTMPConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({ SinkType: S.String, RTMPConfiguration: __S(227, __c7, 3) }),
      ).annotate({ identifier: "LiveConnectorSinkConfiguration" });
    case 5:
      return S.Array(__S(228, __c7, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          Sources: S.optional(__S(226, __c7, 2)),
          Sinks: S.optional(__S(229, __c7, 5)),
          MediaPipelineId: S.optional(S.String),
          MediaPipelineArn: S.optional(S.String),
          Status: S.optional(S.String),
          CreatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "MediaLiveConnectorPipeline" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamConfiguration: __S(288, __c9, 0),
          PoolName: S.String,
          ClientRequestToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(1345, __c42, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/media-pipeline-kinesis-video-stream-pools" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateMediaPipelineKinesisVideoStreamPoolRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Region: S.String, DataRetentionInHours: S.optional(S.Number) }),
      ).annotate({ identifier: "KinesisVideoStreamConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PoolArn: S.optional(SensitiveString),
          PoolName: S.optional(S.String),
          PoolId: S.optional(S.String),
          PoolStatus: S.optional(S.String),
          PoolSize: S.optional(S.Number),
          StreamConfiguration: S.optional(__S(288, __c9, 0)),
          CreatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "KinesisVideoStreamPoolConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({ KinesisVideoStreamPoolConfiguration: S.optional(__S(289, __c9, 1)) }),
      ).annotate({ identifier: "CreateMediaPipelineKinesisVideoStreamPoolResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Sources: __S(353, __c11, 1),
          Sinks: __S(355, __c11, 3),
          ClientRequestToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(1345, __c42, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/sdk-media-stream-pipelines" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateMediaStreamPipelineRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ MediaStreamPipeline: S.optional(__S(356, __c11, 4)) }),
      ).annotate({ identifier: "CreateMediaStreamPipelineResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SourceType: S.String, SourceArn: SensitiveString }),
      ).annotate({ identifier: "MediaStreamSource" });
    case 1:
      return S.Array(__S(352, __c11, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          SinkArn: SensitiveString,
          SinkType: S.String,
          ReservedStreamCapacity: S.Number,
          MediaStreamType: S.String,
        }),
      ).annotate({ identifier: "MediaStreamSink" });
    case 3:
      return S.Array(__S(354, __c11, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          MediaPipelineId: S.optional(S.String),
          MediaPipelineArn: S.optional(S.String),
          CreatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Status: S.optional(S.String),
          Sources: S.optional(__S(353, __c11, 1)),
          Sinks: S.optional(__S(355, __c11, 3)),
        }),
      ).annotate({ identifier: "MediaStreamPipeline" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MediaPipelineId: S.String.pipe(T.HttpLabel("MediaPipelineId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/sdk-media-capture-pipelines/{MediaPipelineId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMediaCapturePipelineRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "DeleteMediaCapturePipelineResponse",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/media-insights-pipeline-configurations/{Identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMediaInsightsPipelineConfigurationRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MediaPipelineId: S.String.pipe(T.HttpLabel("MediaPipelineId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/sdk-media-pipelines/{MediaPipelineId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMediaPipelineRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/media-pipeline-kinesis-video-stream-pools/{Identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMediaPipelineKinesisVideoStreamPoolRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MediaPipelineId: S.String.pipe(T.HttpLabel("MediaPipelineId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/sdk-media-capture-pipelines/{MediaPipelineId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMediaCapturePipelineRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/media-insights-pipeline-configurations/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMediaInsightsPipelineConfigurationRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MediaPipelineId: S.String.pipe(T.HttpLabel("MediaPipelineId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/sdk-media-pipelines/{MediaPipelineId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMediaPipelineRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MediaCapturePipeline: S.optional(__S(1477, __c46, 5)),
          MediaLiveConnectorPipeline: S.optional(__S(230, __c7, 6)),
          MediaConcatenationPipeline: S.optional(__S(41, __c1, 9)),
          MediaInsightsPipeline: S.optional(__S(111, __c3, 15)),
          MediaStreamPipeline: S.optional(__S(356, __c11, 4)),
        }),
      ).annotate({ identifier: "MediaPipeline" });
    case 2:
      return S.suspend(() => S.Struct({ MediaPipeline: S.optional(__S(609, __c19, 1)) })).annotate({
        identifier: "GetMediaPipelineResponse",
      });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/media-pipeline-kinesis-video-stream-pools/{Identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMediaPipelineKinesisVideoStreamPoolRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          SpeakerSearchTaskId: S.String.pipe(T.HttpLabel("SpeakerSearchTaskId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/media-insights-pipelines/{Identifier}/speaker-search-tasks/{SpeakerSearchTaskId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSpeakerSearchTaskRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SpeakerSearchTaskId: S.optional(S.String),
          SpeakerSearchTaskStatus: S.optional(S.String),
          CreatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "SpeakerSearchTask" });
    case 1:
      return S.suspend(() =>
        S.Struct({ SpeakerSearchTask: S.optional(__S(704, __c22, 0)) }),
      ).annotate({ identifier: "GetSpeakerSearchTaskResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          VoiceToneAnalysisTaskId: S.String.pipe(T.HttpLabel("VoiceToneAnalysisTaskId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/media-insights-pipelines/{Identifier}/voice-tone-analysis-tasks/{VoiceToneAnalysisTaskId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetVoiceToneAnalysisTaskRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VoiceToneAnalysisTaskId: S.optional(S.String),
          VoiceToneAnalysisTaskStatus: S.optional(S.String),
          CreatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "VoiceToneAnalysisTask" });
    case 1:
      return S.suspend(() =>
        S.Struct({ VoiceToneAnalysisTask: S.optional(__S(768, __c24, 0)) }),
      ).annotate({ identifier: "GetVoiceToneAnalysisTaskResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/sdk-media-capture-pipelines" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMediaCapturePipelinesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MediaCapturePipelines: S.optional(__S(833, __c26, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListMediaCapturePipelinesResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MediaPipelineId: S.optional(S.String), MediaPipelineArn: S.optional(S.String) }),
      ).annotate({ identifier: "MediaCapturePipelineSummary" });
    case 1:
      return S.Array(__S(832, __c26, 0));
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/media-insights-pipeline-configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMediaInsightsPipelineConfigurationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MediaInsightsPipelineConfigurationName: S.optional(S.String),
          MediaInsightsPipelineConfigurationId: S.optional(S.String),
          MediaInsightsPipelineConfigurationArn: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "MediaInsightsPipelineConfigurationSummary" });
    case 2:
      return S.Array(__S(865, __c27, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          MediaInsightsPipelineConfigurations: S.optional(__S(866, __c27, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListMediaInsightsPipelineConfigurationsResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/media-pipeline-kinesis-video-stream-pools" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMediaPipelineKinesisVideoStreamPoolsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PoolName: S.optional(S.String),
          PoolId: S.optional(S.String),
          PoolArn: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "KinesisVideoStreamPoolSummary" });
    case 2:
      return S.Array(__S(897, __c28, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          KinesisVideoStreamPools: S.optional(__S(898, __c28, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListMediaPipelineKinesisVideoStreamPoolsResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/sdk-media-pipelines" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMediaPipelinesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MediaPipelines: S.optional(__S(833, __c26, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListMediaPipelinesResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String.pipe(T.HttpQuery("arn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/tags" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(1345, __c42, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          VoiceProfileDomainArn: SensitiveString,
          KinesisVideoStreamSourceTaskConfiguration: S.optional(__S(1024, __c32, 0)),
          ClientRequestToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/media-insights-pipelines/{Identifier}/speaker-search-tasks?operation=start",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartSpeakerSearchTaskRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamArn: S.String,
          ChannelId: S.Number,
          FragmentNumber: S.optional(S.String),
        }),
      ).annotate({ identifier: "KinesisVideoStreamSourceTaskConfiguration" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          LanguageCode: S.String,
          KinesisVideoStreamSourceTaskConfiguration: S.optional(__S(1024, __c32, 0)),
          ClientRequestToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/media-insights-pipelines/{Identifier}/voice-tone-analysis-tasks?operation=start",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartVoiceToneAnalysisTaskRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          SpeakerSearchTaskId: S.String.pipe(T.HttpLabel("SpeakerSearchTaskId")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/media-insights-pipelines/{Identifier}/speaker-search-tasks/{SpeakerSearchTaskId}?operation=stop",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopSpeakerSearchTaskRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          VoiceToneAnalysisTaskId: S.String.pipe(T.HttpLabel("VoiceToneAnalysisTaskId")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/media-insights-pipelines/{Identifier}/voice-tone-analysis-tasks/{VoiceToneAnalysisTaskId}?operation=stop",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopVoiceToneAnalysisTaskRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, Tags: __S(1345, __c42, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags?operation=tag-resource" }),
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
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, TagKeys: __S(1376, __c43, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags?operation=untag-resource" }),
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
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          ResourceAccessRoleArn: SensitiveString,
          RealTimeAlertConfiguration: S.optional(__S(165, __c5, 5)),
          Elements: __S(174, __c5, 14),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/media-insights-pipeline-configurations/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateMediaInsightsPipelineConfigurationRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          UpdateStatus: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/media-insights-pipeline-status/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateMediaInsightsPipelineStatusRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ DataRetentionInHours: S.optional(S.Number) })).annotate({
        identifier: "KinesisVideoStreamConfigurationUpdate",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          StreamConfiguration: S.optional(__S(1280, __c40, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/media-pipeline-kinesis-video-stream-pools/{Identifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateMediaPipelineKinesisVideoStreamPoolRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceType: S.String,
          SourceArn: SensitiveString,
          SinkType: S.String,
          SinkArn: SensitiveString,
          ClientRequestToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
          ChimeSdkMeetingConfiguration: S.optional(__S(1475, __c46, 3)),
          SseAwsKeyManagementParams: S.optional(__S(1476, __c46, 4)),
          SinkIamRoleArn: S.optional(SensitiveString),
          Tags: S.optional(__S(1345, __c42, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/sdk-media-capture-pipelines" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateMediaCapturePipelineRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(1344, __c42, 0));
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
    case 1:
      return S.suspend(() =>
        S.Struct({
          AttendeeIds: S.optional(__S(1376, __c43, 0)),
          ExternalUserIds: S.optional(__S(1408, __c44, 0)),
        }),
      ).annotate({ identifier: "SelectedVideoStreams" });
    case 2:
      return S.suspend(() =>
        S.Struct({ SelectedVideoStreams: S.optional(__S(1409, __c44, 1)) }),
      ).annotate({ identifier: "SourceConfiguration" });
    case 3:
      return S.suspend(() => S.Struct({ PresenterPosition: S.optional(S.String) })).annotate({
        identifier: "PresenterOnlyConfiguration",
      });
    case 4:
      return S.suspend(() => S.Struct({ ActiveSpeakerPosition: S.optional(S.String) })).annotate({
        identifier: "ActiveSpeakerOnlyConfiguration",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          TileOrder: S.optional(S.String),
          TilePosition: S.optional(S.String),
          TileCount: S.optional(S.Number),
          TileAspectRatio: S.optional(S.String),
        }),
      ).annotate({ identifier: "HorizontalLayoutConfiguration" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          CornerRadius: S.optional(S.Number),
          BorderColor: S.optional(S.String),
          HighlightColor: S.optional(S.String),
          BorderThickness: S.optional(S.Number),
        }),
      ).annotate({ identifier: "VideoAttribute" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          ContentShareLayout: S.String,
          PresenterOnlyConfiguration: S.optional(__S(1411, __c44, 3)),
          ActiveSpeakerOnlyConfiguration: S.optional(__S(1412, __c44, 4)),
          HorizontalLayoutConfiguration: S.optional(__S(1413, __c44, 5)),
          VerticalLayoutConfiguration: S.optional(__S(1413, __c44, 5)),
          VideoAttribute: S.optional(__S(1414, __c44, 6)),
          CanvasOrientation: S.optional(S.String),
        }),
      ).annotate({ identifier: "GridViewConfiguration" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          Layout: S.optional(S.String),
          Resolution: S.optional(S.String),
          GridViewConfiguration: __S(1415, __c44, 7),
        }),
      ).annotate({ identifier: "CompositedVideoArtifactsConfiguration" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MediaCapturePipeline: S.optional(__S(1477, __c46, 5)) }),
      ).annotate({ identifier: "CreateMediaCapturePipelineResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ MuxType: S.String })).annotate({
        identifier: "AudioArtifactsConfiguration",
      });
    case 1:
      return S.suspend(() => S.Struct({ State: S.String, MuxType: S.optional(S.String) })).annotate(
        { identifier: "VideoArtifactsConfiguration" },
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Audio: __S(1472, __c46, 0),
          Video: __S(1473, __c46, 1),
          Content: __S(1473, __c46, 1),
          CompositedVideo: S.optional(__S(1416, __c44, 8)),
        }),
      ).annotate({ identifier: "ArtifactsConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          SourceConfiguration: S.optional(__S(1410, __c44, 2)),
          ArtifactsConfiguration: S.optional(__S(1474, __c46, 2)),
        }),
      ).annotate({ identifier: "ChimeSdkMeetingConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({ AwsKmsKeyId: S.String, AwsKmsEncryptionContext: S.optional(S.String) }),
      ).annotate({ identifier: "SseAwsKeyManagementParams" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          MediaPipelineId: S.optional(S.String),
          MediaPipelineArn: S.optional(S.String),
          SourceType: S.optional(S.String),
          SourceArn: S.optional(SensitiveString),
          Status: S.optional(S.String),
          SinkType: S.optional(S.String),
          SinkArn: S.optional(SensitiveString),
          CreatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ChimeSdkMeetingConfiguration: S.optional(__S(1475, __c46, 3)),
          SseAwsKeyManagementParams: S.optional(__S(1476, __c46, 4)),
          SinkIamRoleArn: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "MediaCapturePipeline" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
