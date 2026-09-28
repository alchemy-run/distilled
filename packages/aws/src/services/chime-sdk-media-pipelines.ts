import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Chime SDK Media Pipelines",
  target: "ChimeSDKMediaPipelinesService",
  version: "2021-07-15",
  sigv4: "chime",
  protocol: restJson1Protocol,
  rules: (p, _) => {
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
        return err(
          "Invalid Configuration: FIPS and custom endpoint are not supported",
        );
      }
      if (UseDualStack === true) {
        return err(
          "Invalid Configuration: Dualstack and custom endpoint are not supported",
        );
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://media-pipelines-chime.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://media-pipelines-chime.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly Code?: ErrorCode;
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly Code?: ErrorCode;
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class ForbiddenException
  extends /*@__PURE__*/ TE.TaggedError("ForbiddenException", ["AuthError"], {
    status: 403,
  })<{
    readonly Code?: ErrorCode;
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly Code?: ErrorCode;
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class ResourceLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly Code?: ErrorCode;
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class ServiceFailureException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceFailureException",
    ["ServerError"],
    { status: 500 },
  )<{
    readonly Code?: ErrorCode;
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { status: 503 },
  )<{
    readonly Code?: ErrorCode;
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class ThrottledClientException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottledClientException",
    ["ThrottlingError"],
    { status: 429 },
  )<{
    readonly Code?: ErrorCode;
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
export class UnauthorizedClientException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnauthorizedClientException",
    ["AuthError"],
    { status: 401 },
  )<{
    readonly Code?: ErrorCode;
    readonly message?: string;
    readonly RequestId?: string;
  }> {}
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
export type BorderColor =
  | "Black"
  | "Blue"
  | "Red"
  | "Green"
  | "White"
  | "Yellow"
  | (string & {});
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
export type ArtifactsConcatenationState =
  | "Enabled"
  | "Disabled"
  | (string & {});
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
export type MediaInsightsRuntimeMetadata = {
  [key: string]: string | undefined;
};
export interface RecordingStreamConfiguration {
  StreamArn?: string;
}
export type RecordingStreamList = RecordingStreamConfiguration[];
export type FragmentSelectorType =
  | "ProducerTimestamp"
  | "ServerTimestamp"
  | (string & {});
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
export type MediaInsightsPipelineElementStatuses =
  MediaInsightsPipelineElementStatus[];
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
export type RealTimeAlertRuleType =
  | "KeywordMatch"
  | "Sentiment"
  | "IssueDetection"
  | (string & {});
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
export type ContentRedactionOutput =
  | "redacted"
  | "redacted_and_unredacted"
  | (string & {});
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
export type VoiceAnalyticsConfigurationStatus =
  | "Enabled"
  | "Disabled"
  | (string & {});
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
export type MediaStreamPipelineSinkType =
  | "KinesisVideoStreamPool"
  | (string & {});
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
  descriptor: {
    service: svc,
    http: "POST /sdk-media-capture-pipelines",
    input: {
      SourceType: 0,
      SourceArn: 0,
      SinkType: 0,
      SinkArn: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      ChimeSdkMeetingConfiguration: {
        SourceConfiguration: i_SourceConfiguration,
        ArtifactsConfiguration: {
          Audio: { MuxType: 0 },
          Video: { State: 0, MuxType: 0 },
          Content: { State: 0, MuxType: 0 },
          CompositedVideo: i_CompositedVideoArtifactsConfiguration,
        },
      },
      SseAwsKeyManagementParams: { AwsKmsKeyId: 0, AwsKmsEncryptionContext: 0 },
      SinkIamRoleArn: 0,
      Tags: D.list(i_Tag),
    },
    output: { MediaCapturePipeline: o_MediaCapturePipeline },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /sdk-media-concatenation-pipelines",
    input: {
      Sources: D.list({
        Type: 0,
        MediaCapturePipelineSourceConfiguration: {
          MediaPipelineArn: 0,
          ChimeSdkMeetingConfiguration: {
            ArtifactsConfiguration: {
              Audio: { State: 0 },
              Video: { State: 0 },
              Content: { State: 0 },
              DataChannel: { State: 0 },
              TranscriptionMessages: { State: 0 },
              MeetingEvents: { State: 0 },
              CompositedVideo: { State: 0 },
            },
          },
        },
      }),
      Sinks: D.list({ Type: 0, S3BucketSinkConfiguration: { Destination: 0 } }),
      ClientRequestToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
    },
    output: { MediaConcatenationPipeline: o_MediaConcatenationPipeline },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /media-insights-pipelines",
    input: {
      MediaInsightsPipelineConfigurationArn: 0,
      KinesisVideoStreamSourceRuntimeConfiguration: {
        Streams: D.list({
          StreamArn: 0,
          FragmentNumber: 0,
          StreamChannelDefinition: {
            NumberOfChannels: 0,
            ChannelDefinitions: D.list({ ChannelId: 0, ParticipantRole: 0 }),
          },
        }),
        MediaEncoding: 0,
        MediaSampleRate: 0,
      },
      MediaInsightsRuntimeMetadata: 0,
      KinesisVideoStreamRecordingSourceRuntimeConfiguration: {
        Streams: D.list({ StreamArn: 0 }),
        FragmentSelector: {
          FragmentSelectorType: 0,
          TimestampRange: { StartTimestamp: 0, EndTimestamp: 0 },
        },
      },
      S3RecordingSinkRuntimeConfiguration: {
        Destination: 0,
        RecordingFileFormat: 0,
      },
      Tags: D.list(i_Tag),
      ClientRequestToken: D.m({ idempotency: true }),
    },
    output: { MediaInsightsPipeline: o_MediaInsightsPipeline },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /media-insights-pipeline-configurations",
    input: {
      MediaInsightsPipelineConfigurationName: 0,
      ResourceAccessRoleArn: 0,
      RealTimeAlertConfiguration: i_RealTimeAlertConfiguration,
      Elements: D.list(i_MediaInsightsPipelineConfigurationElement),
      Tags: D.list(i_Tag),
      ClientRequestToken: D.m({ idempotency: true }),
    },
    output: {
      MediaInsightsPipelineConfiguration: o_MediaInsightsPipelineConfiguration,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /sdk-media-live-connector-pipelines",
    input: {
      Sources: D.list({
        SourceType: 0,
        ChimeSdkMeetingLiveConnectorConfiguration: {
          Arn: 0,
          MuxType: 0,
          CompositedVideo: i_CompositedVideoArtifactsConfiguration,
          SourceConfiguration: i_SourceConfiguration,
        },
      }),
      Sinks: D.list({
        SinkType: 0,
        RTMPConfiguration: { Url: 0, AudioChannels: 0, AudioSampleRate: 0 },
      }),
      ClientRequestToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
    },
    output: { MediaLiveConnectorPipeline: o_MediaLiveConnectorPipeline },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /media-pipeline-kinesis-video-stream-pools",
    input: {
      StreamConfiguration: { Region: 0, DataRetentionInHours: 0 },
      PoolName: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
    },
    output: {
      KinesisVideoStreamPoolConfiguration:
        o_KinesisVideoStreamPoolConfiguration,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /sdk-media-stream-pipelines",
    input: {
      Sources: D.list({ SourceType: 0, SourceArn: 0 }),
      Sinks: D.list({
        SinkArn: 0,
        SinkType: 0,
        ReservedStreamCapacity: 0,
        MediaStreamType: 0,
      }),
      ClientRequestToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
    },
    output: { MediaStreamPipeline: o_MediaStreamPipeline },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /sdk-media-capture-pipelines/{MediaPipelineId}",
    input: { MediaPipelineId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /media-insights-pipeline-configurations/{Identifier}",
    input: { Identifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /sdk-media-pipelines/{MediaPipelineId}",
    input: { MediaPipelineId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /media-pipeline-kinesis-video-stream-pools/{Identifier}",
    input: { Identifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /sdk-media-capture-pipelines/{MediaPipelineId}",
    input: { MediaPipelineId: 0 },
    output: { MediaCapturePipeline: o_MediaCapturePipeline },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /media-insights-pipeline-configurations/{Identifier}",
    input: { Identifier: 0 },
    output: {
      MediaInsightsPipelineConfiguration: o_MediaInsightsPipelineConfiguration,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /sdk-media-pipelines/{MediaPipelineId}",
    input: { MediaPipelineId: 0 },
    output: {
      MediaPipeline: {
        MediaCapturePipeline: o_MediaCapturePipeline,
        MediaLiveConnectorPipeline: o_MediaLiveConnectorPipeline,
        MediaConcatenationPipeline: o_MediaConcatenationPipeline,
        MediaInsightsPipeline: o_MediaInsightsPipeline,
        MediaStreamPipeline: o_MediaStreamPipeline,
      },
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /media-pipeline-kinesis-video-stream-pools/{Identifier}",
    input: { Identifier: 0 },
    output: {
      KinesisVideoStreamPoolConfiguration:
        o_KinesisVideoStreamPoolConfiguration,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /media-insights-pipelines/{Identifier}/speaker-search-tasks/{SpeakerSearchTaskId}",
    input: { Identifier: 0, SpeakerSearchTaskId: 0 },
    output: { SpeakerSearchTask: o_SpeakerSearchTask },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /media-insights-pipelines/{Identifier}/voice-tone-analysis-tasks/{VoiceToneAnalysisTaskId}",
    input: { Identifier: 0, VoiceToneAnalysisTaskId: 0 },
    output: { VoiceToneAnalysisTask: o_VoiceToneAnalysisTask },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /sdk-media-capture-pipelines",
    input: {
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /media-insights-pipeline-configurations",
    input: {
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: {
      MediaInsightsPipelineConfigurations: D.list({
        MediaInsightsPipelineConfigurationArn: D.secret,
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /media-pipeline-kinesis-video-stream-pools",
    input: {
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
    output: { KinesisVideoStreamPools: D.list({ PoolArn: D.secret }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /sdk-media-pipelines",
    input: {
      NextToken: D.m({ query: "next-token" }),
      MaxResults: D.m({ query: "max-results" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /tags",
    input: { ResourceARN: D.m({ query: "arn" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /media-insights-pipelines/{Identifier}/speaker-search-tasks?operation=start",
    input: {
      Identifier: 0,
      VoiceProfileDomainArn: 0,
      KinesisVideoStreamSourceTaskConfiguration:
        i_KinesisVideoStreamSourceTaskConfiguration,
      ClientRequestToken: D.m({ idempotency: true }),
    },
    output: { SpeakerSearchTask: o_SpeakerSearchTask },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /media-insights-pipelines/{Identifier}/voice-tone-analysis-tasks?operation=start",
    input: {
      Identifier: 0,
      LanguageCode: 0,
      KinesisVideoStreamSourceTaskConfiguration:
        i_KinesisVideoStreamSourceTaskConfiguration,
      ClientRequestToken: D.m({ idempotency: true }),
    },
    output: { VoiceToneAnalysisTask: o_VoiceToneAnalysisTask },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /media-insights-pipelines/{Identifier}/speaker-search-tasks/{SpeakerSearchTaskId}?operation=stop",
    input: { Identifier: 0, SpeakerSearchTaskId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /media-insights-pipelines/{Identifier}/voice-tone-analysis-tasks/{VoiceToneAnalysisTaskId}?operation=stop",
    input: { Identifier: 0, VoiceToneAnalysisTaskId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags?operation=tag-resource",
    input: { ResourceARN: 0, Tags: D.list(i_Tag) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags?operation=untag-resource",
    input: { ResourceARN: 0, TagKeys: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /media-insights-pipeline-configurations/{Identifier}",
    input: {
      Identifier: 0,
      ResourceAccessRoleArn: 0,
      RealTimeAlertConfiguration: i_RealTimeAlertConfiguration,
      Elements: D.list(i_MediaInsightsPipelineConfigurationElement),
    },
    output: {
      MediaInsightsPipelineConfiguration: o_MediaInsightsPipelineConfiguration,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /media-insights-pipeline-status/{Identifier}",
    input: { Identifier: 0, UpdateStatus: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /media-pipeline-kinesis-video-stream-pools/{Identifier}",
    input: { Identifier: 0, StreamConfiguration: { DataRetentionInHours: 0 } },
    output: {
      KinesisVideoStreamPoolConfiguration:
        o_KinesisVideoStreamPoolConfiguration,
    },
    body: true,
  },
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
})) as any;

const i_CompositedVideoArtifactsConfiguration: D.LazyStruct = () => ({
  Layout: 0,
  Resolution: 0,
  GridViewConfiguration: {
    ContentShareLayout: 0,
    PresenterOnlyConfiguration: { PresenterPosition: 0 },
    ActiveSpeakerOnlyConfiguration: { ActiveSpeakerPosition: 0 },
    HorizontalLayoutConfiguration: {
      TileOrder: 0,
      TilePosition: 0,
      TileCount: 0,
      TileAspectRatio: 0,
    },
    VerticalLayoutConfiguration: {
      TileOrder: 0,
      TilePosition: 0,
      TileCount: 0,
      TileAspectRatio: 0,
    },
    VideoAttribute: {
      CornerRadius: 0,
      BorderColor: 0,
      HighlightColor: 0,
      BorderThickness: 0,
    },
    CanvasOrientation: 0,
  },
});
const i_KinesisVideoStreamSourceTaskConfiguration: D.LazyStruct = () => ({
  StreamArn: 0,
  ChannelId: 0,
  FragmentNumber: 0,
});
const i_MediaInsightsPipelineConfigurationElement: D.LazyStruct = () => ({
  Type: 0,
  AmazonTranscribeCallAnalyticsProcessorConfiguration: {
    LanguageCode: 0,
    VocabularyName: 0,
    VocabularyFilterName: 0,
    VocabularyFilterMethod: 0,
    LanguageModelName: 0,
    EnablePartialResultsStabilization: 0,
    PartialResultsStability: 0,
    ContentIdentificationType: 0,
    ContentRedactionType: 0,
    PiiEntityTypes: 0,
    FilterPartialResults: 0,
    PostCallAnalyticsSettings: {
      OutputLocation: 0,
      DataAccessRoleArn: 0,
      ContentRedactionOutput: 0,
      OutputEncryptionKMSKeyId: 0,
    },
    CallAnalyticsStreamCategories: 0,
  },
  AmazonTranscribeProcessorConfiguration: {
    LanguageCode: 0,
    VocabularyName: 0,
    VocabularyFilterName: 0,
    VocabularyFilterMethod: 0,
    ShowSpeakerLabel: 0,
    EnablePartialResultsStabilization: 0,
    PartialResultsStability: 0,
    ContentIdentificationType: 0,
    ContentRedactionType: 0,
    PiiEntityTypes: 0,
    LanguageModelName: 0,
    FilterPartialResults: 0,
    IdentifyLanguage: 0,
    IdentifyMultipleLanguages: 0,
    LanguageOptions: 0,
    PreferredLanguage: 0,
    VocabularyNames: 0,
    VocabularyFilterNames: 0,
  },
  KinesisDataStreamSinkConfiguration: { InsightsTarget: 0 },
  S3RecordingSinkConfiguration: { Destination: 0, RecordingFileFormat: 0 },
  VoiceAnalyticsProcessorConfiguration: {
    SpeakerSearchStatus: 0,
    VoiceToneAnalysisStatus: 0,
  },
  LambdaFunctionSinkConfiguration: { InsightsTarget: 0 },
  SqsQueueSinkConfiguration: { InsightsTarget: 0 },
  SnsTopicSinkConfiguration: { InsightsTarget: 0 },
  VoiceEnhancementSinkConfiguration: { Disabled: 0 },
});
const i_RealTimeAlertConfiguration: D.LazyStruct = () => ({
  Disabled: 0,
  Rules: D.list({
    Type: 0,
    KeywordMatchConfiguration: { RuleName: 0, Keywords: 0, Negate: 0 },
    SentimentConfiguration: { RuleName: 0, SentimentType: 0, TimePeriod: 0 },
    IssueDetectionConfiguration: { RuleName: 0 },
  }),
});
const i_SourceConfiguration: D.LazyStruct = () => ({
  SelectedVideoStreams: { AttendeeIds: 0, ExternalUserIds: 0 },
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_KinesisVideoStreamPoolConfiguration: D.LazyStruct = () => ({
  PoolArn: D.secret,
  CreatedTimestamp: D.ts,
  UpdatedTimestamp: D.ts,
});
const o_MediaCapturePipeline: D.LazyStruct = () => ({
  SourceArn: D.secret,
  SinkArn: D.secret,
  CreatedTimestamp: D.ts,
  UpdatedTimestamp: D.ts,
  ChimeSdkMeetingConfiguration: { SourceConfiguration: o_SourceConfiguration },
  SinkIamRoleArn: D.secret,
});
const o_MediaConcatenationPipeline: D.LazyStruct = () => ({
  Sources: D.list({
    MediaCapturePipelineSourceConfiguration: { MediaPipelineArn: D.secret },
  }),
  Sinks: D.list({ S3BucketSinkConfiguration: { Destination: D.secret } }),
  CreatedTimestamp: D.ts,
  UpdatedTimestamp: D.ts,
});
const o_MediaInsightsPipeline: D.LazyStruct = () => ({
  MediaPipelineArn: D.secret,
  MediaInsightsPipelineConfigurationArn: D.secret,
  KinesisVideoStreamRecordingSourceRuntimeConfiguration: {
    FragmentSelector: {
      TimestampRange: { StartTimestamp: D.ts, EndTimestamp: D.ts },
    },
  },
  S3RecordingSinkRuntimeConfiguration: { Destination: D.secret },
  CreatedTimestamp: D.ts,
});
const o_MediaInsightsPipelineConfiguration: D.LazyStruct = () => ({
  MediaInsightsPipelineConfigurationArn: D.secret,
  ResourceAccessRoleArn: D.secret,
  Elements: D.list({
    KinesisDataStreamSinkConfiguration: { InsightsTarget: D.secret },
    S3RecordingSinkConfiguration: { Destination: D.secret },
    LambdaFunctionSinkConfiguration: { InsightsTarget: D.secret },
    SqsQueueSinkConfiguration: { InsightsTarget: D.secret },
    SnsTopicSinkConfiguration: { InsightsTarget: D.secret },
  }),
  CreatedTimestamp: D.ts,
  UpdatedTimestamp: D.ts,
});
const o_MediaLiveConnectorPipeline: D.LazyStruct = () => ({
  Sources: D.list({
    ChimeSdkMeetingLiveConnectorConfiguration: {
      Arn: D.secret,
      SourceConfiguration: o_SourceConfiguration,
    },
  }),
  Sinks: D.list({ RTMPConfiguration: { Url: D.secret } }),
  CreatedTimestamp: D.ts,
  UpdatedTimestamp: D.ts,
});
const o_MediaStreamPipeline: D.LazyStruct = () => ({
  CreatedTimestamp: D.ts,
  UpdatedTimestamp: D.ts,
  Sources: D.list({ SourceArn: D.secret }),
  Sinks: D.list({ SinkArn: D.secret }),
});
const o_SpeakerSearchTask: D.LazyStruct = () => ({
  CreatedTimestamp: D.ts,
  UpdatedTimestamp: D.ts,
});
const o_VoiceToneAnalysisTask: D.LazyStruct = () => ({
  CreatedTimestamp: D.ts,
  UpdatedTimestamp: D.ts,
});
const o_SourceConfiguration: D.LazyStruct = () => ({
  SelectedVideoStreams: { ExternalUserIds: D.list(D.secret) },
});
