import * as HttpClient from "effect/unstable/http/HttpClient";
import * as effect from "effect/Effect";
import * as redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as stream from "effect/Stream";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import type { Region } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "Chime SDK Media Pipelines",
  serviceShapeName: "ChimeSDKMediaPipelinesService",
});
const auth = T.AwsAuthSigv4({ name: "chime" });
const ver = T.ServiceVersion("2021-07-15");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
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
});

//# Newtypes
export type Arn = string | redacted.Redacted<string>;
export type ClientRequestToken = string | redacted.Redacted<string>;
export type GuidString = string;
export type ExternalUserIdType = string | redacted.Redacted<string>;
export type TileCount = number;
export type TileAspectRatio = string;
export type CornerRadius = number;
export type BorderThickness = number;
export type TagKey = string;
export type TagValue = string;
export type AmazonResourceName = string;
export type Iso8601Timestamp = Date;
export type KinesisVideoStreamArn = string;
export type FragmentNumberString = string;
export type NumberOfChannels = number;
export type ChannelId = number;
export type MediaSampleRateHertz = number;
export type NonEmptyString = string;
export type MediaInsightsPipelineConfigurationNameString = string;
export type RuleName = string;
export type Keyword = string;
export type SentimentTimePeriodInSeconds = number;
export type VocabularyName = string;
export type VocabularyFilterName = string;
export type ModelName = string;
export type PiiEntityTypes = string;
export type CategoryName = string;
export type LanguageOptions = string;
export type VocabularyNames = string;
export type VocabularyFilterNames = string;
export type SensitiveString = string | redacted.Redacted<string>;
export type AudioSampleRateOption = string;
export type AwsRegion = string;
export type DataRetentionInHours = number;
export type KinesisVideoStreamPoolName = string;
export type KinesisVideoStreamPoolId = string;
export type KinesisVideoStreamPoolSize = number;
export type ReservedStreamCapacity = number;
export type ResultMax = number;
export type DataRetentionChangeInHours = number;

//# Schemas
export type MediaPipelineSourceType = "ChimeSdkMeeting" | (string & {});
export const MediaPipelineSourceType = S.String;
export type MediaPipelineSinkType = "S3Bucket" | (string & {});
export const MediaPipelineSinkType = S.String;
export type AttendeeIdList = string[];
export const AttendeeIdList = S.Array(S.String);
export type ExternalUserIdList = string | redacted.Redacted<string>[];
export const ExternalUserIdList = S.Array(SensitiveString);
export interface SelectedVideoStreams {
  AttendeeIds?: string[];
  ExternalUserIds?: string | redacted.Redacted<string>[];
}
export const SelectedVideoStreams = S.suspend(() =>
  S.Struct({
    AttendeeIds: S.optional(AttendeeIdList),
    ExternalUserIds: S.optional(ExternalUserIdList),
  }),
).annotate({
  identifier: "SelectedVideoStreams",
}) as any as S.Schema<SelectedVideoStreams>;
export interface SourceConfiguration {
  SelectedVideoStreams?: SelectedVideoStreams;
}
export const SourceConfiguration = S.suspend(() =>
  S.Struct({ SelectedVideoStreams: S.optional(SelectedVideoStreams) }),
).annotate({
  identifier: "SourceConfiguration",
}) as any as S.Schema<SourceConfiguration>;
export type AudioMuxType =
  | "AudioOnly"
  | "AudioWithActiveSpeakerVideo"
  | "AudioWithCompositedVideo"
  | (string & {});
export const AudioMuxType = S.String;
export interface AudioArtifactsConfiguration {
  MuxType: AudioMuxType;
}
export const AudioArtifactsConfiguration = S.suspend(() =>
  S.Struct({ MuxType: AudioMuxType }),
).annotate({
  identifier: "AudioArtifactsConfiguration",
}) as any as S.Schema<AudioArtifactsConfiguration>;
export type ArtifactsState = "Enabled" | "Disabled" | (string & {});
export const ArtifactsState = S.String;
export type VideoMuxType = "VideoOnly" | (string & {});
export const VideoMuxType = S.String;
export interface VideoArtifactsConfiguration {
  State: ArtifactsState;
  MuxType?: VideoMuxType;
}
export const VideoArtifactsConfiguration = S.suspend(() =>
  S.Struct({ State: ArtifactsState, MuxType: S.optional(VideoMuxType) }),
).annotate({
  identifier: "VideoArtifactsConfiguration",
}) as any as S.Schema<VideoArtifactsConfiguration>;
export type ContentMuxType = "ContentOnly" | (string & {});
export const ContentMuxType = S.String;
export interface ContentArtifactsConfiguration {
  State: ArtifactsState;
  MuxType?: ContentMuxType;
}
export const ContentArtifactsConfiguration = S.suspend(() =>
  S.Struct({ State: ArtifactsState, MuxType: S.optional(ContentMuxType) }),
).annotate({
  identifier: "ContentArtifactsConfiguration",
}) as any as S.Schema<ContentArtifactsConfiguration>;
export type LayoutOption = "GridView" | (string & {});
export const LayoutOption = S.String;
export type ResolutionOption = "HD" | "FHD" | (string & {});
export const ResolutionOption = S.String;
export type ContentShareLayoutOption =
  | "PresenterOnly"
  | "Horizontal"
  | "Vertical"
  | "ActiveSpeakerOnly"
  | (string & {});
export const ContentShareLayoutOption = S.String;
export type PresenterPosition =
  | "TopLeft"
  | "TopRight"
  | "BottomLeft"
  | "BottomRight"
  | (string & {});
export const PresenterPosition = S.String;
export interface PresenterOnlyConfiguration {
  PresenterPosition?: PresenterPosition;
}
export const PresenterOnlyConfiguration = S.suspend(() =>
  S.Struct({ PresenterPosition: S.optional(PresenterPosition) }),
).annotate({
  identifier: "PresenterOnlyConfiguration",
}) as any as S.Schema<PresenterOnlyConfiguration>;
export type ActiveSpeakerPosition =
  | "TopLeft"
  | "TopRight"
  | "BottomLeft"
  | "BottomRight"
  | (string & {});
export const ActiveSpeakerPosition = S.String;
export interface ActiveSpeakerOnlyConfiguration {
  ActiveSpeakerPosition?: ActiveSpeakerPosition;
}
export const ActiveSpeakerOnlyConfiguration = S.suspend(() =>
  S.Struct({ ActiveSpeakerPosition: S.optional(ActiveSpeakerPosition) }),
).annotate({
  identifier: "ActiveSpeakerOnlyConfiguration",
}) as any as S.Schema<ActiveSpeakerOnlyConfiguration>;
export type TileOrder = "JoinSequence" | "SpeakerSequence" | (string & {});
export const TileOrder = S.String;
export type HorizontalTilePosition = "Top" | "Bottom" | (string & {});
export const HorizontalTilePosition = S.String;
export interface HorizontalLayoutConfiguration {
  TileOrder?: TileOrder;
  TilePosition?: HorizontalTilePosition;
  TileCount?: number;
  TileAspectRatio?: string;
}
export const HorizontalLayoutConfiguration = S.suspend(() =>
  S.Struct({
    TileOrder: S.optional(TileOrder),
    TilePosition: S.optional(HorizontalTilePosition),
    TileCount: S.optional(S.Number),
    TileAspectRatio: S.optional(S.String),
  }),
).annotate({
  identifier: "HorizontalLayoutConfiguration",
}) as any as S.Schema<HorizontalLayoutConfiguration>;
export type VerticalTilePosition = "Left" | "Right" | (string & {});
export const VerticalTilePosition = S.String;
export interface VerticalLayoutConfiguration {
  TileOrder?: TileOrder;
  TilePosition?: VerticalTilePosition;
  TileCount?: number;
  TileAspectRatio?: string;
}
export const VerticalLayoutConfiguration = S.suspend(() =>
  S.Struct({
    TileOrder: S.optional(TileOrder),
    TilePosition: S.optional(VerticalTilePosition),
    TileCount: S.optional(S.Number),
    TileAspectRatio: S.optional(S.String),
  }),
).annotate({
  identifier: "VerticalLayoutConfiguration",
}) as any as S.Schema<VerticalLayoutConfiguration>;
export type BorderColor =
  | "Black"
  | "Blue"
  | "Red"
  | "Green"
  | "White"
  | "Yellow"
  | (string & {});
export const BorderColor = S.String;
export type HighlightColor =
  | "Black"
  | "Blue"
  | "Red"
  | "Green"
  | "White"
  | "Yellow"
  | (string & {});
export const HighlightColor = S.String;
export interface VideoAttribute {
  CornerRadius?: number;
  BorderColor?: BorderColor;
  HighlightColor?: HighlightColor;
  BorderThickness?: number;
}
export const VideoAttribute = S.suspend(() =>
  S.Struct({
    CornerRadius: S.optional(S.Number),
    BorderColor: S.optional(BorderColor),
    HighlightColor: S.optional(HighlightColor),
    BorderThickness: S.optional(S.Number),
  }),
).annotate({ identifier: "VideoAttribute" }) as any as S.Schema<VideoAttribute>;
export type CanvasOrientation = "Landscape" | "Portrait" | (string & {});
export const CanvasOrientation = S.String;
export interface GridViewConfiguration {
  ContentShareLayout: ContentShareLayoutOption;
  PresenterOnlyConfiguration?: PresenterOnlyConfiguration;
  ActiveSpeakerOnlyConfiguration?: ActiveSpeakerOnlyConfiguration;
  HorizontalLayoutConfiguration?: HorizontalLayoutConfiguration;
  VerticalLayoutConfiguration?: VerticalLayoutConfiguration;
  VideoAttribute?: VideoAttribute;
  CanvasOrientation?: CanvasOrientation;
}
export const GridViewConfiguration = S.suspend(() =>
  S.Struct({
    ContentShareLayout: ContentShareLayoutOption,
    PresenterOnlyConfiguration: S.optional(PresenterOnlyConfiguration),
    ActiveSpeakerOnlyConfiguration: S.optional(ActiveSpeakerOnlyConfiguration),
    HorizontalLayoutConfiguration: S.optional(HorizontalLayoutConfiguration),
    VerticalLayoutConfiguration: S.optional(VerticalLayoutConfiguration),
    VideoAttribute: S.optional(VideoAttribute),
    CanvasOrientation: S.optional(CanvasOrientation),
  }),
).annotate({
  identifier: "GridViewConfiguration",
}) as any as S.Schema<GridViewConfiguration>;
export interface CompositedVideoArtifactsConfiguration {
  Layout?: LayoutOption;
  Resolution?: ResolutionOption;
  GridViewConfiguration: GridViewConfiguration;
}
export const CompositedVideoArtifactsConfiguration = S.suspend(() =>
  S.Struct({
    Layout: S.optional(LayoutOption),
    Resolution: S.optional(ResolutionOption),
    GridViewConfiguration: GridViewConfiguration,
  }),
).annotate({
  identifier: "CompositedVideoArtifactsConfiguration",
}) as any as S.Schema<CompositedVideoArtifactsConfiguration>;
export interface ArtifactsConfiguration {
  Audio: AudioArtifactsConfiguration;
  Video: VideoArtifactsConfiguration;
  Content: ContentArtifactsConfiguration;
  CompositedVideo?: CompositedVideoArtifactsConfiguration;
}
export const ArtifactsConfiguration = S.suspend(() =>
  S.Struct({
    Audio: AudioArtifactsConfiguration,
    Video: VideoArtifactsConfiguration,
    Content: ContentArtifactsConfiguration,
    CompositedVideo: S.optional(CompositedVideoArtifactsConfiguration),
  }),
).annotate({
  identifier: "ArtifactsConfiguration",
}) as any as S.Schema<ArtifactsConfiguration>;
export interface ChimeSdkMeetingConfiguration {
  SourceConfiguration?: SourceConfiguration;
  ArtifactsConfiguration?: ArtifactsConfiguration;
}
export const ChimeSdkMeetingConfiguration = S.suspend(() =>
  S.Struct({
    SourceConfiguration: S.optional(SourceConfiguration),
    ArtifactsConfiguration: S.optional(ArtifactsConfiguration),
  }),
).annotate({
  identifier: "ChimeSdkMeetingConfiguration",
}) as any as S.Schema<ChimeSdkMeetingConfiguration>;
export interface SseAwsKeyManagementParams {
  AwsKmsKeyId: string;
  AwsKmsEncryptionContext?: string;
}
export const SseAwsKeyManagementParams = S.suspend(() =>
  S.Struct({
    AwsKmsKeyId: S.String,
    AwsKmsEncryptionContext: S.optional(S.String),
  }),
).annotate({
  identifier: "SseAwsKeyManagementParams",
}) as any as S.Schema<SseAwsKeyManagementParams>;
export interface Tag {
  Key: string;
  Value: string;
}
export const Tag = S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = S.Array(Tag);
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
export const CreateMediaCapturePipelineRequest = S.suspend(() =>
  S.Struct({
    SourceType: MediaPipelineSourceType,
    SourceArn: SensitiveString,
    SinkType: MediaPipelineSinkType,
    SinkArn: SensitiveString,
    ClientRequestToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
    ChimeSdkMeetingConfiguration: S.optional(ChimeSdkMeetingConfiguration),
    SseAwsKeyManagementParams: S.optional(SseAwsKeyManagementParams),
    SinkIamRoleArn: S.optional(SensitiveString),
    Tags: S.optional(TagList),
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
).annotate({
  identifier: "CreateMediaCapturePipelineRequest",
}) as any as S.Schema<CreateMediaCapturePipelineRequest>;
export type MediaPipelineStatus =
  | "Initializing"
  | "InProgress"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | "Paused"
  | "NotStarted"
  | (string & {});
export const MediaPipelineStatus = S.String;
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
export const MediaCapturePipeline = S.suspend(() =>
  S.Struct({
    MediaPipelineId: S.optional(S.String),
    MediaPipelineArn: S.optional(S.String),
    SourceType: S.optional(MediaPipelineSourceType),
    SourceArn: S.optional(SensitiveString),
    Status: S.optional(MediaPipelineStatus),
    SinkType: S.optional(MediaPipelineSinkType),
    SinkArn: S.optional(SensitiveString),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ChimeSdkMeetingConfiguration: S.optional(ChimeSdkMeetingConfiguration),
    SseAwsKeyManagementParams: S.optional(SseAwsKeyManagementParams),
    SinkIamRoleArn: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "MediaCapturePipeline",
}) as any as S.Schema<MediaCapturePipeline>;
export interface CreateMediaCapturePipelineResponse {
  MediaCapturePipeline?: MediaCapturePipeline;
}
export const CreateMediaCapturePipelineResponse = S.suspend(() =>
  S.Struct({ MediaCapturePipeline: S.optional(MediaCapturePipeline) }),
).annotate({
  identifier: "CreateMediaCapturePipelineResponse",
}) as any as S.Schema<CreateMediaCapturePipelineResponse>;
export type ErrorCode =
  | "BadRequest"
  | "Forbidden"
  | "NotFound"
  | "ResourceLimitExceeded"
  | "ServiceFailure"
  | "ServiceUnavailable"
  | "Throttling"
  | (string & {});
export const ErrorCode = S.String;
export type ConcatenationSourceType = "MediaCapturePipeline" | (string & {});
export const ConcatenationSourceType = S.String;
export type AudioArtifactsConcatenationState = "Enabled" | (string & {});
export const AudioArtifactsConcatenationState = S.String;
export interface AudioConcatenationConfiguration {
  State: AudioArtifactsConcatenationState;
}
export const AudioConcatenationConfiguration = S.suspend(() =>
  S.Struct({ State: AudioArtifactsConcatenationState }),
).annotate({
  identifier: "AudioConcatenationConfiguration",
}) as any as S.Schema<AudioConcatenationConfiguration>;
export type ArtifactsConcatenationState =
  | "Enabled"
  | "Disabled"
  | (string & {});
export const ArtifactsConcatenationState = S.String;
export interface VideoConcatenationConfiguration {
  State: ArtifactsConcatenationState;
}
export const VideoConcatenationConfiguration = S.suspend(() =>
  S.Struct({ State: ArtifactsConcatenationState }),
).annotate({
  identifier: "VideoConcatenationConfiguration",
}) as any as S.Schema<VideoConcatenationConfiguration>;
export interface ContentConcatenationConfiguration {
  State: ArtifactsConcatenationState;
}
export const ContentConcatenationConfiguration = S.suspend(() =>
  S.Struct({ State: ArtifactsConcatenationState }),
).annotate({
  identifier: "ContentConcatenationConfiguration",
}) as any as S.Schema<ContentConcatenationConfiguration>;
export interface DataChannelConcatenationConfiguration {
  State: ArtifactsConcatenationState;
}
export const DataChannelConcatenationConfiguration = S.suspend(() =>
  S.Struct({ State: ArtifactsConcatenationState }),
).annotate({
  identifier: "DataChannelConcatenationConfiguration",
}) as any as S.Schema<DataChannelConcatenationConfiguration>;
export interface TranscriptionMessagesConcatenationConfiguration {
  State: ArtifactsConcatenationState;
}
export const TranscriptionMessagesConcatenationConfiguration = S.suspend(() =>
  S.Struct({ State: ArtifactsConcatenationState }),
).annotate({
  identifier: "TranscriptionMessagesConcatenationConfiguration",
}) as any as S.Schema<TranscriptionMessagesConcatenationConfiguration>;
export interface MeetingEventsConcatenationConfiguration {
  State: ArtifactsConcatenationState;
}
export const MeetingEventsConcatenationConfiguration = S.suspend(() =>
  S.Struct({ State: ArtifactsConcatenationState }),
).annotate({
  identifier: "MeetingEventsConcatenationConfiguration",
}) as any as S.Schema<MeetingEventsConcatenationConfiguration>;
export interface CompositedVideoConcatenationConfiguration {
  State: ArtifactsConcatenationState;
}
export const CompositedVideoConcatenationConfiguration = S.suspend(() =>
  S.Struct({ State: ArtifactsConcatenationState }),
).annotate({
  identifier: "CompositedVideoConcatenationConfiguration",
}) as any as S.Schema<CompositedVideoConcatenationConfiguration>;
export interface ArtifactsConcatenationConfiguration {
  Audio: AudioConcatenationConfiguration;
  Video: VideoConcatenationConfiguration;
  Content: ContentConcatenationConfiguration;
  DataChannel: DataChannelConcatenationConfiguration;
  TranscriptionMessages: TranscriptionMessagesConcatenationConfiguration;
  MeetingEvents: MeetingEventsConcatenationConfiguration;
  CompositedVideo: CompositedVideoConcatenationConfiguration;
}
export const ArtifactsConcatenationConfiguration = S.suspend(() =>
  S.Struct({
    Audio: AudioConcatenationConfiguration,
    Video: VideoConcatenationConfiguration,
    Content: ContentConcatenationConfiguration,
    DataChannel: DataChannelConcatenationConfiguration,
    TranscriptionMessages: TranscriptionMessagesConcatenationConfiguration,
    MeetingEvents: MeetingEventsConcatenationConfiguration,
    CompositedVideo: CompositedVideoConcatenationConfiguration,
  }),
).annotate({
  identifier: "ArtifactsConcatenationConfiguration",
}) as any as S.Schema<ArtifactsConcatenationConfiguration>;
export interface ChimeSdkMeetingConcatenationConfiguration {
  ArtifactsConfiguration: ArtifactsConcatenationConfiguration;
}
export const ChimeSdkMeetingConcatenationConfiguration = S.suspend(() =>
  S.Struct({ ArtifactsConfiguration: ArtifactsConcatenationConfiguration }),
).annotate({
  identifier: "ChimeSdkMeetingConcatenationConfiguration",
}) as any as S.Schema<ChimeSdkMeetingConcatenationConfiguration>;
export interface MediaCapturePipelineSourceConfiguration {
  MediaPipelineArn: string | redacted.Redacted<string>;
  ChimeSdkMeetingConfiguration: ChimeSdkMeetingConcatenationConfiguration;
}
export const MediaCapturePipelineSourceConfiguration = S.suspend(() =>
  S.Struct({
    MediaPipelineArn: SensitiveString,
    ChimeSdkMeetingConfiguration: ChimeSdkMeetingConcatenationConfiguration,
  }),
).annotate({
  identifier: "MediaCapturePipelineSourceConfiguration",
}) as any as S.Schema<MediaCapturePipelineSourceConfiguration>;
export interface ConcatenationSource {
  Type: ConcatenationSourceType;
  MediaCapturePipelineSourceConfiguration: MediaCapturePipelineSourceConfiguration;
}
export const ConcatenationSource = S.suspend(() =>
  S.Struct({
    Type: ConcatenationSourceType,
    MediaCapturePipelineSourceConfiguration:
      MediaCapturePipelineSourceConfiguration,
  }),
).annotate({
  identifier: "ConcatenationSource",
}) as any as S.Schema<ConcatenationSource>;
export type ConcatenationSourceList = ConcatenationSource[];
export const ConcatenationSourceList = S.Array(ConcatenationSource);
export type ConcatenationSinkType = "S3Bucket" | (string & {});
export const ConcatenationSinkType = S.String;
export interface S3BucketSinkConfiguration {
  Destination: string | redacted.Redacted<string>;
}
export const S3BucketSinkConfiguration = S.suspend(() =>
  S.Struct({ Destination: SensitiveString }),
).annotate({
  identifier: "S3BucketSinkConfiguration",
}) as any as S.Schema<S3BucketSinkConfiguration>;
export interface ConcatenationSink {
  Type: ConcatenationSinkType;
  S3BucketSinkConfiguration: S3BucketSinkConfiguration;
}
export const ConcatenationSink = S.suspend(() =>
  S.Struct({
    Type: ConcatenationSinkType,
    S3BucketSinkConfiguration: S3BucketSinkConfiguration,
  }),
).annotate({
  identifier: "ConcatenationSink",
}) as any as S.Schema<ConcatenationSink>;
export type ConcatenationSinkList = ConcatenationSink[];
export const ConcatenationSinkList = S.Array(ConcatenationSink);
export interface CreateMediaConcatenationPipelineRequest {
  Sources: ConcatenationSource[];
  Sinks: ConcatenationSink[];
  ClientRequestToken?: string | redacted.Redacted<string>;
  Tags?: Tag[];
}
export const CreateMediaConcatenationPipelineRequest = S.suspend(() =>
  S.Struct({
    Sources: ConcatenationSourceList,
    Sinks: ConcatenationSinkList,
    ClientRequestToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagList),
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
).annotate({
  identifier: "CreateMediaConcatenationPipelineRequest",
}) as any as S.Schema<CreateMediaConcatenationPipelineRequest>;
export interface MediaConcatenationPipeline {
  MediaPipelineId?: string;
  MediaPipelineArn?: string;
  Sources?: ConcatenationSource[];
  Sinks?: ConcatenationSink[];
  Status?: MediaPipelineStatus;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export const MediaConcatenationPipeline = S.suspend(() =>
  S.Struct({
    MediaPipelineId: S.optional(S.String),
    MediaPipelineArn: S.optional(S.String),
    Sources: S.optional(ConcatenationSourceList),
    Sinks: S.optional(ConcatenationSinkList),
    Status: S.optional(MediaPipelineStatus),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "MediaConcatenationPipeline",
}) as any as S.Schema<MediaConcatenationPipeline>;
export interface CreateMediaConcatenationPipelineResponse {
  MediaConcatenationPipeline?: MediaConcatenationPipeline;
}
export const CreateMediaConcatenationPipelineResponse = S.suspend(() =>
  S.Struct({
    MediaConcatenationPipeline: S.optional(MediaConcatenationPipeline),
  }),
).annotate({
  identifier: "CreateMediaConcatenationPipelineResponse",
}) as any as S.Schema<CreateMediaConcatenationPipelineResponse>;
export type ParticipantRole = "AGENT" | "CUSTOMER" | (string & {});
export const ParticipantRole = S.String;
export interface ChannelDefinition {
  ChannelId: number;
  ParticipantRole?: ParticipantRole;
}
export const ChannelDefinition = S.suspend(() =>
  S.Struct({
    ChannelId: S.Number,
    ParticipantRole: S.optional(ParticipantRole),
  }),
).annotate({
  identifier: "ChannelDefinition",
}) as any as S.Schema<ChannelDefinition>;
export type ChannelDefinitions = ChannelDefinition[];
export const ChannelDefinitions = S.Array(ChannelDefinition);
export interface StreamChannelDefinition {
  NumberOfChannels: number;
  ChannelDefinitions?: ChannelDefinition[];
}
export const StreamChannelDefinition = S.suspend(() =>
  S.Struct({
    NumberOfChannels: S.Number,
    ChannelDefinitions: S.optional(ChannelDefinitions),
  }),
).annotate({
  identifier: "StreamChannelDefinition",
}) as any as S.Schema<StreamChannelDefinition>;
export interface StreamConfiguration {
  StreamArn: string;
  FragmentNumber?: string;
  StreamChannelDefinition: StreamChannelDefinition;
}
export const StreamConfiguration = S.suspend(() =>
  S.Struct({
    StreamArn: S.String,
    FragmentNumber: S.optional(S.String),
    StreamChannelDefinition: StreamChannelDefinition,
  }),
).annotate({
  identifier: "StreamConfiguration",
}) as any as S.Schema<StreamConfiguration>;
export type Streams = StreamConfiguration[];
export const Streams = S.Array(StreamConfiguration);
export type MediaEncoding = "pcm" | (string & {});
export const MediaEncoding = S.String;
export interface KinesisVideoStreamSourceRuntimeConfiguration {
  Streams: StreamConfiguration[];
  MediaEncoding: MediaEncoding;
  MediaSampleRate: number;
}
export const KinesisVideoStreamSourceRuntimeConfiguration = S.suspend(() =>
  S.Struct({
    Streams: Streams,
    MediaEncoding: MediaEncoding,
    MediaSampleRate: S.Number,
  }),
).annotate({
  identifier: "KinesisVideoStreamSourceRuntimeConfiguration",
}) as any as S.Schema<KinesisVideoStreamSourceRuntimeConfiguration>;
export type MediaInsightsRuntimeMetadata = {
  [key: string]: string | undefined;
};
export const MediaInsightsRuntimeMetadata = S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface RecordingStreamConfiguration {
  StreamArn?: string;
}
export const RecordingStreamConfiguration = S.suspend(() =>
  S.Struct({ StreamArn: S.optional(S.String) }),
).annotate({
  identifier: "RecordingStreamConfiguration",
}) as any as S.Schema<RecordingStreamConfiguration>;
export type RecordingStreamList = RecordingStreamConfiguration[];
export const RecordingStreamList = S.Array(RecordingStreamConfiguration);
export type FragmentSelectorType =
  | "ProducerTimestamp"
  | "ServerTimestamp"
  | (string & {});
export const FragmentSelectorType = S.String;
export interface TimestampRange {
  StartTimestamp: Date;
  EndTimestamp: Date;
}
export const TimestampRange = S.suspend(() =>
  S.Struct({
    StartTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "TimestampRange" }) as any as S.Schema<TimestampRange>;
export interface FragmentSelector {
  FragmentSelectorType: FragmentSelectorType;
  TimestampRange: TimestampRange;
}
export const FragmentSelector = S.suspend(() =>
  S.Struct({
    FragmentSelectorType: FragmentSelectorType,
    TimestampRange: TimestampRange,
  }),
).annotate({
  identifier: "FragmentSelector",
}) as any as S.Schema<FragmentSelector>;
export interface KinesisVideoStreamRecordingSourceRuntimeConfiguration {
  Streams: RecordingStreamConfiguration[];
  FragmentSelector: FragmentSelector;
}
export const KinesisVideoStreamRecordingSourceRuntimeConfiguration = S.suspend(
  () =>
    S.Struct({
      Streams: RecordingStreamList,
      FragmentSelector: FragmentSelector,
    }),
).annotate({
  identifier: "KinesisVideoStreamRecordingSourceRuntimeConfiguration",
}) as any as S.Schema<KinesisVideoStreamRecordingSourceRuntimeConfiguration>;
export type RecordingFileFormat = "Wav" | "Opus" | (string & {});
export const RecordingFileFormat = S.String;
export interface S3RecordingSinkRuntimeConfiguration {
  Destination: string | redacted.Redacted<string>;
  RecordingFileFormat: RecordingFileFormat;
}
export const S3RecordingSinkRuntimeConfiguration = S.suspend(() =>
  S.Struct({
    Destination: SensitiveString,
    RecordingFileFormat: RecordingFileFormat,
  }),
).annotate({
  identifier: "S3RecordingSinkRuntimeConfiguration",
}) as any as S.Schema<S3RecordingSinkRuntimeConfiguration>;
export interface CreateMediaInsightsPipelineRequest {
  MediaInsightsPipelineConfigurationArn: string | redacted.Redacted<string>;
  KinesisVideoStreamSourceRuntimeConfiguration?: KinesisVideoStreamSourceRuntimeConfiguration;
  MediaInsightsRuntimeMetadata?: { [key: string]: string | undefined };
  KinesisVideoStreamRecordingSourceRuntimeConfiguration?: KinesisVideoStreamRecordingSourceRuntimeConfiguration;
  S3RecordingSinkRuntimeConfiguration?: S3RecordingSinkRuntimeConfiguration;
  Tags?: Tag[];
  ClientRequestToken?: string | redacted.Redacted<string>;
}
export const CreateMediaInsightsPipelineRequest = S.suspend(() =>
  S.Struct({
    MediaInsightsPipelineConfigurationArn: SensitiveString,
    KinesisVideoStreamSourceRuntimeConfiguration: S.optional(
      KinesisVideoStreamSourceRuntimeConfiguration,
    ),
    MediaInsightsRuntimeMetadata: S.optional(MediaInsightsRuntimeMetadata),
    KinesisVideoStreamRecordingSourceRuntimeConfiguration: S.optional(
      KinesisVideoStreamRecordingSourceRuntimeConfiguration,
    ),
    S3RecordingSinkRuntimeConfiguration: S.optional(
      S3RecordingSinkRuntimeConfiguration,
    ),
    Tags: S.optional(TagList),
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
).annotate({
  identifier: "CreateMediaInsightsPipelineRequest",
}) as any as S.Schema<CreateMediaInsightsPipelineRequest>;
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
export const MediaInsightsPipelineConfigurationElementType = S.String;
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
export const MediaPipelineElementStatus = S.String;
export interface MediaInsightsPipelineElementStatus {
  Type?: MediaInsightsPipelineConfigurationElementType;
  Status?: MediaPipelineElementStatus;
}
export const MediaInsightsPipelineElementStatus = S.suspend(() =>
  S.Struct({
    Type: S.optional(MediaInsightsPipelineConfigurationElementType),
    Status: S.optional(MediaPipelineElementStatus),
  }),
).annotate({
  identifier: "MediaInsightsPipelineElementStatus",
}) as any as S.Schema<MediaInsightsPipelineElementStatus>;
export type MediaInsightsPipelineElementStatuses =
  MediaInsightsPipelineElementStatus[];
export const MediaInsightsPipelineElementStatuses = S.Array(
  MediaInsightsPipelineElementStatus,
);
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
export const MediaInsightsPipeline = S.suspend(() =>
  S.Struct({
    MediaPipelineId: S.optional(S.String),
    MediaPipelineArn: S.optional(SensitiveString),
    MediaInsightsPipelineConfigurationArn: S.optional(SensitiveString),
    Status: S.optional(MediaPipelineStatus),
    KinesisVideoStreamSourceRuntimeConfiguration: S.optional(
      KinesisVideoStreamSourceRuntimeConfiguration,
    ),
    MediaInsightsRuntimeMetadata: S.optional(MediaInsightsRuntimeMetadata),
    KinesisVideoStreamRecordingSourceRuntimeConfiguration: S.optional(
      KinesisVideoStreamRecordingSourceRuntimeConfiguration,
    ),
    S3RecordingSinkRuntimeConfiguration: S.optional(
      S3RecordingSinkRuntimeConfiguration,
    ),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ElementStatuses: S.optional(MediaInsightsPipelineElementStatuses),
  }),
).annotate({
  identifier: "MediaInsightsPipeline",
}) as any as S.Schema<MediaInsightsPipeline>;
export interface CreateMediaInsightsPipelineResponse {
  MediaInsightsPipeline: MediaInsightsPipeline;
}
export const CreateMediaInsightsPipelineResponse = S.suspend(() =>
  S.Struct({ MediaInsightsPipeline: MediaInsightsPipeline }),
).annotate({
  identifier: "CreateMediaInsightsPipelineResponse",
}) as any as S.Schema<CreateMediaInsightsPipelineResponse>;
export type RealTimeAlertRuleType =
  | "KeywordMatch"
  | "Sentiment"
  | "IssueDetection"
  | (string & {});
export const RealTimeAlertRuleType = S.String;
export type KeywordMatchWordList = string[];
export const KeywordMatchWordList = S.Array(S.String);
export interface KeywordMatchConfiguration {
  RuleName: string;
  Keywords: string[];
  Negate?: boolean;
}
export const KeywordMatchConfiguration = S.suspend(() =>
  S.Struct({
    RuleName: S.String,
    Keywords: KeywordMatchWordList,
    Negate: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "KeywordMatchConfiguration",
}) as any as S.Schema<KeywordMatchConfiguration>;
export type SentimentType = "NEGATIVE" | (string & {});
export const SentimentType = S.String;
export interface SentimentConfiguration {
  RuleName: string;
  SentimentType: SentimentType;
  TimePeriod: number;
}
export const SentimentConfiguration = S.suspend(() =>
  S.Struct({
    RuleName: S.String,
    SentimentType: SentimentType,
    TimePeriod: S.Number,
  }),
).annotate({
  identifier: "SentimentConfiguration",
}) as any as S.Schema<SentimentConfiguration>;
export interface IssueDetectionConfiguration {
  RuleName: string;
}
export const IssueDetectionConfiguration = S.suspend(() =>
  S.Struct({ RuleName: S.String }),
).annotate({
  identifier: "IssueDetectionConfiguration",
}) as any as S.Schema<IssueDetectionConfiguration>;
export interface RealTimeAlertRule {
  Type: RealTimeAlertRuleType;
  KeywordMatchConfiguration?: KeywordMatchConfiguration;
  SentimentConfiguration?: SentimentConfiguration;
  IssueDetectionConfiguration?: IssueDetectionConfiguration;
}
export const RealTimeAlertRule = S.suspend(() =>
  S.Struct({
    Type: RealTimeAlertRuleType,
    KeywordMatchConfiguration: S.optional(KeywordMatchConfiguration),
    SentimentConfiguration: S.optional(SentimentConfiguration),
    IssueDetectionConfiguration: S.optional(IssueDetectionConfiguration),
  }),
).annotate({
  identifier: "RealTimeAlertRule",
}) as any as S.Schema<RealTimeAlertRule>;
export type RealTimeAlertRuleList = RealTimeAlertRule[];
export const RealTimeAlertRuleList = S.Array(RealTimeAlertRule);
export interface RealTimeAlertConfiguration {
  Disabled?: boolean;
  Rules?: RealTimeAlertRule[];
}
export const RealTimeAlertConfiguration = S.suspend(() =>
  S.Struct({
    Disabled: S.optional(S.Boolean),
    Rules: S.optional(RealTimeAlertRuleList),
  }),
).annotate({
  identifier: "RealTimeAlertConfiguration",
}) as any as S.Schema<RealTimeAlertConfiguration>;
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
export const CallAnalyticsLanguageCode = S.String;
export type VocabularyFilterMethod = "remove" | "mask" | "tag" | (string & {});
export const VocabularyFilterMethod = S.String;
export type PartialResultsStability = "high" | "medium" | "low" | (string & {});
export const PartialResultsStability = S.String;
export type ContentType = "PII" | (string & {});
export const ContentType = S.String;
export type ContentRedactionOutput =
  | "redacted"
  | "redacted_and_unredacted"
  | (string & {});
export const ContentRedactionOutput = S.String;
export interface PostCallAnalyticsSettings {
  OutputLocation: string;
  DataAccessRoleArn: string;
  ContentRedactionOutput?: ContentRedactionOutput;
  OutputEncryptionKMSKeyId?: string;
}
export const PostCallAnalyticsSettings = S.suspend(() =>
  S.Struct({
    OutputLocation: S.String,
    DataAccessRoleArn: S.String,
    ContentRedactionOutput: S.optional(ContentRedactionOutput),
    OutputEncryptionKMSKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "PostCallAnalyticsSettings",
}) as any as S.Schema<PostCallAnalyticsSettings>;
export type CategoryNameList = string[];
export const CategoryNameList = S.Array(S.String);
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
export const AmazonTranscribeCallAnalyticsProcessorConfiguration = S.suspend(
  () =>
    S.Struct({
      LanguageCode: CallAnalyticsLanguageCode,
      VocabularyName: S.optional(S.String),
      VocabularyFilterName: S.optional(S.String),
      VocabularyFilterMethod: S.optional(VocabularyFilterMethod),
      LanguageModelName: S.optional(S.String),
      EnablePartialResultsStabilization: S.optional(S.Boolean),
      PartialResultsStability: S.optional(PartialResultsStability),
      ContentIdentificationType: S.optional(ContentType),
      ContentRedactionType: S.optional(ContentType),
      PiiEntityTypes: S.optional(S.String),
      FilterPartialResults: S.optional(S.Boolean),
      PostCallAnalyticsSettings: S.optional(PostCallAnalyticsSettings),
      CallAnalyticsStreamCategories: S.optional(CategoryNameList),
    }),
).annotate({
  identifier: "AmazonTranscribeCallAnalyticsProcessorConfiguration",
}) as any as S.Schema<AmazonTranscribeCallAnalyticsProcessorConfiguration>;
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
export const AmazonTranscribeProcessorConfiguration = S.suspend(() =>
  S.Struct({
    LanguageCode: S.optional(CallAnalyticsLanguageCode),
    VocabularyName: S.optional(S.String),
    VocabularyFilterName: S.optional(S.String),
    VocabularyFilterMethod: S.optional(VocabularyFilterMethod),
    ShowSpeakerLabel: S.optional(S.Boolean),
    EnablePartialResultsStabilization: S.optional(S.Boolean),
    PartialResultsStability: S.optional(PartialResultsStability),
    ContentIdentificationType: S.optional(ContentType),
    ContentRedactionType: S.optional(ContentType),
    PiiEntityTypes: S.optional(S.String),
    LanguageModelName: S.optional(S.String),
    FilterPartialResults: S.optional(S.Boolean),
    IdentifyLanguage: S.optional(S.Boolean),
    IdentifyMultipleLanguages: S.optional(S.Boolean),
    LanguageOptions: S.optional(S.String),
    PreferredLanguage: S.optional(CallAnalyticsLanguageCode),
    VocabularyNames: S.optional(S.String),
    VocabularyFilterNames: S.optional(S.String),
  }),
).annotate({
  identifier: "AmazonTranscribeProcessorConfiguration",
}) as any as S.Schema<AmazonTranscribeProcessorConfiguration>;
export interface KinesisDataStreamSinkConfiguration {
  InsightsTarget?: string | redacted.Redacted<string>;
}
export const KinesisDataStreamSinkConfiguration = S.suspend(() =>
  S.Struct({ InsightsTarget: S.optional(SensitiveString) }),
).annotate({
  identifier: "KinesisDataStreamSinkConfiguration",
}) as any as S.Schema<KinesisDataStreamSinkConfiguration>;
export interface S3RecordingSinkConfiguration {
  Destination?: string | redacted.Redacted<string>;
  RecordingFileFormat?: RecordingFileFormat;
}
export const S3RecordingSinkConfiguration = S.suspend(() =>
  S.Struct({
    Destination: S.optional(SensitiveString),
    RecordingFileFormat: S.optional(RecordingFileFormat),
  }),
).annotate({
  identifier: "S3RecordingSinkConfiguration",
}) as any as S.Schema<S3RecordingSinkConfiguration>;
export type VoiceAnalyticsConfigurationStatus =
  | "Enabled"
  | "Disabled"
  | (string & {});
export const VoiceAnalyticsConfigurationStatus = S.String;
export interface VoiceAnalyticsProcessorConfiguration {
  SpeakerSearchStatus?: VoiceAnalyticsConfigurationStatus;
  VoiceToneAnalysisStatus?: VoiceAnalyticsConfigurationStatus;
}
export const VoiceAnalyticsProcessorConfiguration = S.suspend(() =>
  S.Struct({
    SpeakerSearchStatus: S.optional(VoiceAnalyticsConfigurationStatus),
    VoiceToneAnalysisStatus: S.optional(VoiceAnalyticsConfigurationStatus),
  }),
).annotate({
  identifier: "VoiceAnalyticsProcessorConfiguration",
}) as any as S.Schema<VoiceAnalyticsProcessorConfiguration>;
export interface LambdaFunctionSinkConfiguration {
  InsightsTarget?: string | redacted.Redacted<string>;
}
export const LambdaFunctionSinkConfiguration = S.suspend(() =>
  S.Struct({ InsightsTarget: S.optional(SensitiveString) }),
).annotate({
  identifier: "LambdaFunctionSinkConfiguration",
}) as any as S.Schema<LambdaFunctionSinkConfiguration>;
export interface SqsQueueSinkConfiguration {
  InsightsTarget?: string | redacted.Redacted<string>;
}
export const SqsQueueSinkConfiguration = S.suspend(() =>
  S.Struct({ InsightsTarget: S.optional(SensitiveString) }),
).annotate({
  identifier: "SqsQueueSinkConfiguration",
}) as any as S.Schema<SqsQueueSinkConfiguration>;
export interface SnsTopicSinkConfiguration {
  InsightsTarget?: string | redacted.Redacted<string>;
}
export const SnsTopicSinkConfiguration = S.suspend(() =>
  S.Struct({ InsightsTarget: S.optional(SensitiveString) }),
).annotate({
  identifier: "SnsTopicSinkConfiguration",
}) as any as S.Schema<SnsTopicSinkConfiguration>;
export interface VoiceEnhancementSinkConfiguration {
  Disabled?: boolean;
}
export const VoiceEnhancementSinkConfiguration = S.suspend(() =>
  S.Struct({ Disabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "VoiceEnhancementSinkConfiguration",
}) as any as S.Schema<VoiceEnhancementSinkConfiguration>;
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
export const MediaInsightsPipelineConfigurationElement = S.suspend(() =>
  S.Struct({
    Type: MediaInsightsPipelineConfigurationElementType,
    AmazonTranscribeCallAnalyticsProcessorConfiguration: S.optional(
      AmazonTranscribeCallAnalyticsProcessorConfiguration,
    ),
    AmazonTranscribeProcessorConfiguration: S.optional(
      AmazonTranscribeProcessorConfiguration,
    ),
    KinesisDataStreamSinkConfiguration: S.optional(
      KinesisDataStreamSinkConfiguration,
    ),
    S3RecordingSinkConfiguration: S.optional(S3RecordingSinkConfiguration),
    VoiceAnalyticsProcessorConfiguration: S.optional(
      VoiceAnalyticsProcessorConfiguration,
    ),
    LambdaFunctionSinkConfiguration: S.optional(
      LambdaFunctionSinkConfiguration,
    ),
    SqsQueueSinkConfiguration: S.optional(SqsQueueSinkConfiguration),
    SnsTopicSinkConfiguration: S.optional(SnsTopicSinkConfiguration),
    VoiceEnhancementSinkConfiguration: S.optional(
      VoiceEnhancementSinkConfiguration,
    ),
  }),
).annotate({
  identifier: "MediaInsightsPipelineConfigurationElement",
}) as any as S.Schema<MediaInsightsPipelineConfigurationElement>;
export type MediaInsightsPipelineConfigurationElements =
  MediaInsightsPipelineConfigurationElement[];
export const MediaInsightsPipelineConfigurationElements = S.Array(
  MediaInsightsPipelineConfigurationElement,
);
export interface CreateMediaInsightsPipelineConfigurationRequest {
  MediaInsightsPipelineConfigurationName: string;
  ResourceAccessRoleArn: string | redacted.Redacted<string>;
  RealTimeAlertConfiguration?: RealTimeAlertConfiguration;
  Elements: MediaInsightsPipelineConfigurationElement[];
  Tags?: Tag[];
  ClientRequestToken?: string | redacted.Redacted<string>;
}
export const CreateMediaInsightsPipelineConfigurationRequest = S.suspend(() =>
  S.Struct({
    MediaInsightsPipelineConfigurationName: S.String,
    ResourceAccessRoleArn: SensitiveString,
    RealTimeAlertConfiguration: S.optional(RealTimeAlertConfiguration),
    Elements: MediaInsightsPipelineConfigurationElements,
    Tags: S.optional(TagList),
    ClientRequestToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/media-insights-pipeline-configurations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMediaInsightsPipelineConfigurationRequest",
}) as any as S.Schema<CreateMediaInsightsPipelineConfigurationRequest>;
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
export const MediaInsightsPipelineConfiguration = S.suspend(() =>
  S.Struct({
    MediaInsightsPipelineConfigurationName: S.optional(S.String),
    MediaInsightsPipelineConfigurationArn: S.optional(SensitiveString),
    ResourceAccessRoleArn: S.optional(SensitiveString),
    RealTimeAlertConfiguration: S.optional(RealTimeAlertConfiguration),
    Elements: S.optional(MediaInsightsPipelineConfigurationElements),
    MediaInsightsPipelineConfigurationId: S.optional(S.String),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "MediaInsightsPipelineConfiguration",
}) as any as S.Schema<MediaInsightsPipelineConfiguration>;
export interface CreateMediaInsightsPipelineConfigurationResponse {
  MediaInsightsPipelineConfiguration?: MediaInsightsPipelineConfiguration;
}
export const CreateMediaInsightsPipelineConfigurationResponse = S.suspend(() =>
  S.Struct({
    MediaInsightsPipelineConfiguration: S.optional(
      MediaInsightsPipelineConfiguration,
    ),
  }),
).annotate({
  identifier: "CreateMediaInsightsPipelineConfigurationResponse",
}) as any as S.Schema<CreateMediaInsightsPipelineConfigurationResponse>;
export type LiveConnectorSourceType = "ChimeSdkMeeting" | (string & {});
export const LiveConnectorSourceType = S.String;
export type LiveConnectorMuxType =
  | "AudioWithCompositedVideo"
  | "AudioWithActiveSpeakerVideo"
  | (string & {});
export const LiveConnectorMuxType = S.String;
export interface ChimeSdkMeetingLiveConnectorConfiguration {
  Arn: string | redacted.Redacted<string>;
  MuxType: LiveConnectorMuxType;
  CompositedVideo?: CompositedVideoArtifactsConfiguration;
  SourceConfiguration?: SourceConfiguration;
}
export const ChimeSdkMeetingLiveConnectorConfiguration = S.suspend(() =>
  S.Struct({
    Arn: SensitiveString,
    MuxType: LiveConnectorMuxType,
    CompositedVideo: S.optional(CompositedVideoArtifactsConfiguration),
    SourceConfiguration: S.optional(SourceConfiguration),
  }),
).annotate({
  identifier: "ChimeSdkMeetingLiveConnectorConfiguration",
}) as any as S.Schema<ChimeSdkMeetingLiveConnectorConfiguration>;
export interface LiveConnectorSourceConfiguration {
  SourceType: LiveConnectorSourceType;
  ChimeSdkMeetingLiveConnectorConfiguration: ChimeSdkMeetingLiveConnectorConfiguration;
}
export const LiveConnectorSourceConfiguration = S.suspend(() =>
  S.Struct({
    SourceType: LiveConnectorSourceType,
    ChimeSdkMeetingLiveConnectorConfiguration:
      ChimeSdkMeetingLiveConnectorConfiguration,
  }),
).annotate({
  identifier: "LiveConnectorSourceConfiguration",
}) as any as S.Schema<LiveConnectorSourceConfiguration>;
export type LiveConnectorSourceList = LiveConnectorSourceConfiguration[];
export const LiveConnectorSourceList = S.Array(
  LiveConnectorSourceConfiguration,
);
export type LiveConnectorSinkType = "RTMP" | (string & {});
export const LiveConnectorSinkType = S.String;
export type AudioChannelsOption = "Stereo" | "Mono" | (string & {});
export const AudioChannelsOption = S.String;
export interface LiveConnectorRTMPConfiguration {
  Url: string | redacted.Redacted<string>;
  AudioChannels?: AudioChannelsOption;
  AudioSampleRate?: string;
}
export const LiveConnectorRTMPConfiguration = S.suspend(() =>
  S.Struct({
    Url: SensitiveString,
    AudioChannels: S.optional(AudioChannelsOption),
    AudioSampleRate: S.optional(S.String),
  }),
).annotate({
  identifier: "LiveConnectorRTMPConfiguration",
}) as any as S.Schema<LiveConnectorRTMPConfiguration>;
export interface LiveConnectorSinkConfiguration {
  SinkType: LiveConnectorSinkType;
  RTMPConfiguration: LiveConnectorRTMPConfiguration;
}
export const LiveConnectorSinkConfiguration = S.suspend(() =>
  S.Struct({
    SinkType: LiveConnectorSinkType,
    RTMPConfiguration: LiveConnectorRTMPConfiguration,
  }),
).annotate({
  identifier: "LiveConnectorSinkConfiguration",
}) as any as S.Schema<LiveConnectorSinkConfiguration>;
export type LiveConnectorSinkList = LiveConnectorSinkConfiguration[];
export const LiveConnectorSinkList = S.Array(LiveConnectorSinkConfiguration);
export interface CreateMediaLiveConnectorPipelineRequest {
  Sources: LiveConnectorSourceConfiguration[];
  Sinks: LiveConnectorSinkConfiguration[];
  ClientRequestToken?: string | redacted.Redacted<string>;
  Tags?: Tag[];
}
export const CreateMediaLiveConnectorPipelineRequest = S.suspend(() =>
  S.Struct({
    Sources: LiveConnectorSourceList,
    Sinks: LiveConnectorSinkList,
    ClientRequestToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagList),
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
).annotate({
  identifier: "CreateMediaLiveConnectorPipelineRequest",
}) as any as S.Schema<CreateMediaLiveConnectorPipelineRequest>;
export interface MediaLiveConnectorPipeline {
  Sources?: LiveConnectorSourceConfiguration[];
  Sinks?: LiveConnectorSinkConfiguration[];
  MediaPipelineId?: string;
  MediaPipelineArn?: string;
  Status?: MediaPipelineStatus;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export const MediaLiveConnectorPipeline = S.suspend(() =>
  S.Struct({
    Sources: S.optional(LiveConnectorSourceList),
    Sinks: S.optional(LiveConnectorSinkList),
    MediaPipelineId: S.optional(S.String),
    MediaPipelineArn: S.optional(S.String),
    Status: S.optional(MediaPipelineStatus),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "MediaLiveConnectorPipeline",
}) as any as S.Schema<MediaLiveConnectorPipeline>;
export interface CreateMediaLiveConnectorPipelineResponse {
  MediaLiveConnectorPipeline?: MediaLiveConnectorPipeline;
}
export const CreateMediaLiveConnectorPipelineResponse = S.suspend(() =>
  S.Struct({
    MediaLiveConnectorPipeline: S.optional(MediaLiveConnectorPipeline),
  }),
).annotate({
  identifier: "CreateMediaLiveConnectorPipelineResponse",
}) as any as S.Schema<CreateMediaLiveConnectorPipelineResponse>;
export interface KinesisVideoStreamConfiguration {
  Region: string;
  DataRetentionInHours?: number;
}
export const KinesisVideoStreamConfiguration = S.suspend(() =>
  S.Struct({ Region: S.String, DataRetentionInHours: S.optional(S.Number) }),
).annotate({
  identifier: "KinesisVideoStreamConfiguration",
}) as any as S.Schema<KinesisVideoStreamConfiguration>;
export interface CreateMediaPipelineKinesisVideoStreamPoolRequest {
  StreamConfiguration: KinesisVideoStreamConfiguration;
  PoolName: string;
  ClientRequestToken?: string | redacted.Redacted<string>;
  Tags?: Tag[];
}
export const CreateMediaPipelineKinesisVideoStreamPoolRequest = S.suspend(() =>
  S.Struct({
    StreamConfiguration: KinesisVideoStreamConfiguration,
    PoolName: S.String,
    ClientRequestToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/media-pipeline-kinesis-video-stream-pools",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMediaPipelineKinesisVideoStreamPoolRequest",
}) as any as S.Schema<CreateMediaPipelineKinesisVideoStreamPoolRequest>;
export type KinesisVideoStreamPoolStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "FAILED"
  | (string & {});
export const KinesisVideoStreamPoolStatus = S.String;
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
export const KinesisVideoStreamPoolConfiguration = S.suspend(() =>
  S.Struct({
    PoolArn: S.optional(SensitiveString),
    PoolName: S.optional(S.String),
    PoolId: S.optional(S.String),
    PoolStatus: S.optional(KinesisVideoStreamPoolStatus),
    PoolSize: S.optional(S.Number),
    StreamConfiguration: S.optional(KinesisVideoStreamConfiguration),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "KinesisVideoStreamPoolConfiguration",
}) as any as S.Schema<KinesisVideoStreamPoolConfiguration>;
export interface CreateMediaPipelineKinesisVideoStreamPoolResponse {
  KinesisVideoStreamPoolConfiguration?: KinesisVideoStreamPoolConfiguration;
}
export const CreateMediaPipelineKinesisVideoStreamPoolResponse = S.suspend(() =>
  S.Struct({
    KinesisVideoStreamPoolConfiguration: S.optional(
      KinesisVideoStreamPoolConfiguration,
    ),
  }),
).annotate({
  identifier: "CreateMediaPipelineKinesisVideoStreamPoolResponse",
}) as any as S.Schema<CreateMediaPipelineKinesisVideoStreamPoolResponse>;
export interface MediaStreamSource {
  SourceType: MediaPipelineSourceType;
  SourceArn: string | redacted.Redacted<string>;
}
export const MediaStreamSource = S.suspend(() =>
  S.Struct({ SourceType: MediaPipelineSourceType, SourceArn: SensitiveString }),
).annotate({
  identifier: "MediaStreamSource",
}) as any as S.Schema<MediaStreamSource>;
export type MediaStreamSourceList = MediaStreamSource[];
export const MediaStreamSourceList = S.Array(MediaStreamSource);
export type MediaStreamPipelineSinkType =
  | "KinesisVideoStreamPool"
  | (string & {});
export const MediaStreamPipelineSinkType = S.String;
export type MediaStreamType = "MixedAudio" | "IndividualAudio" | (string & {});
export const MediaStreamType = S.String;
export interface MediaStreamSink {
  SinkArn: string | redacted.Redacted<string>;
  SinkType: MediaStreamPipelineSinkType;
  ReservedStreamCapacity: number;
  MediaStreamType: MediaStreamType;
}
export const MediaStreamSink = S.suspend(() =>
  S.Struct({
    SinkArn: SensitiveString,
    SinkType: MediaStreamPipelineSinkType,
    ReservedStreamCapacity: S.Number,
    MediaStreamType: MediaStreamType,
  }),
).annotate({
  identifier: "MediaStreamSink",
}) as any as S.Schema<MediaStreamSink>;
export type MediaStreamSinkList = MediaStreamSink[];
export const MediaStreamSinkList = S.Array(MediaStreamSink);
export interface CreateMediaStreamPipelineRequest {
  Sources: MediaStreamSource[];
  Sinks: MediaStreamSink[];
  ClientRequestToken?: string | redacted.Redacted<string>;
  Tags?: Tag[];
}
export const CreateMediaStreamPipelineRequest = S.suspend(() =>
  S.Struct({
    Sources: MediaStreamSourceList,
    Sinks: MediaStreamSinkList,
    ClientRequestToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagList),
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
).annotate({
  identifier: "CreateMediaStreamPipelineRequest",
}) as any as S.Schema<CreateMediaStreamPipelineRequest>;
export interface MediaStreamPipeline {
  MediaPipelineId?: string;
  MediaPipelineArn?: string;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  Status?: MediaPipelineStatus;
  Sources?: MediaStreamSource[];
  Sinks?: MediaStreamSink[];
}
export const MediaStreamPipeline = S.suspend(() =>
  S.Struct({
    MediaPipelineId: S.optional(S.String),
    MediaPipelineArn: S.optional(S.String),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Status: S.optional(MediaPipelineStatus),
    Sources: S.optional(MediaStreamSourceList),
    Sinks: S.optional(MediaStreamSinkList),
  }),
).annotate({
  identifier: "MediaStreamPipeline",
}) as any as S.Schema<MediaStreamPipeline>;
export interface CreateMediaStreamPipelineResponse {
  MediaStreamPipeline?: MediaStreamPipeline;
}
export const CreateMediaStreamPipelineResponse = S.suspend(() =>
  S.Struct({ MediaStreamPipeline: S.optional(MediaStreamPipeline) }),
).annotate({
  identifier: "CreateMediaStreamPipelineResponse",
}) as any as S.Schema<CreateMediaStreamPipelineResponse>;
export interface DeleteMediaCapturePipelineRequest {
  MediaPipelineId: string;
}
export const DeleteMediaCapturePipelineRequest = S.suspend(() =>
  S.Struct({
    MediaPipelineId: S.String.pipe(T.HttpLabel("MediaPipelineId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/sdk-media-capture-pipelines/{MediaPipelineId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMediaCapturePipelineRequest",
}) as any as S.Schema<DeleteMediaCapturePipelineRequest>;
export interface DeleteMediaCapturePipelineResponse {}
export const DeleteMediaCapturePipelineResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteMediaCapturePipelineResponse",
}) as any as S.Schema<DeleteMediaCapturePipelineResponse>;
export interface DeleteMediaInsightsPipelineConfigurationRequest {
  Identifier: string;
}
export const DeleteMediaInsightsPipelineConfigurationRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteMediaInsightsPipelineConfigurationRequest",
}) as any as S.Schema<DeleteMediaInsightsPipelineConfigurationRequest>;
export interface DeleteMediaInsightsPipelineConfigurationResponse {}
export const DeleteMediaInsightsPipelineConfigurationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteMediaInsightsPipelineConfigurationResponse",
}) as any as S.Schema<DeleteMediaInsightsPipelineConfigurationResponse>;
export interface DeleteMediaPipelineRequest {
  MediaPipelineId: string;
}
export const DeleteMediaPipelineRequest = S.suspend(() =>
  S.Struct({
    MediaPipelineId: S.String.pipe(T.HttpLabel("MediaPipelineId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/sdk-media-pipelines/{MediaPipelineId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMediaPipelineRequest",
}) as any as S.Schema<DeleteMediaPipelineRequest>;
export interface DeleteMediaPipelineResponse {}
export const DeleteMediaPipelineResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteMediaPipelineResponse",
}) as any as S.Schema<DeleteMediaPipelineResponse>;
export interface DeleteMediaPipelineKinesisVideoStreamPoolRequest {
  Identifier: string;
}
export const DeleteMediaPipelineKinesisVideoStreamPoolRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeleteMediaPipelineKinesisVideoStreamPoolRequest",
}) as any as S.Schema<DeleteMediaPipelineKinesisVideoStreamPoolRequest>;
export interface DeleteMediaPipelineKinesisVideoStreamPoolResponse {}
export const DeleteMediaPipelineKinesisVideoStreamPoolResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteMediaPipelineKinesisVideoStreamPoolResponse",
}) as any as S.Schema<DeleteMediaPipelineKinesisVideoStreamPoolResponse>;
export interface GetMediaCapturePipelineRequest {
  MediaPipelineId: string;
}
export const GetMediaCapturePipelineRequest = S.suspend(() =>
  S.Struct({
    MediaPipelineId: S.String.pipe(T.HttpLabel("MediaPipelineId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/sdk-media-capture-pipelines/{MediaPipelineId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMediaCapturePipelineRequest",
}) as any as S.Schema<GetMediaCapturePipelineRequest>;
export interface GetMediaCapturePipelineResponse {
  MediaCapturePipeline?: MediaCapturePipeline;
}
export const GetMediaCapturePipelineResponse = S.suspend(() =>
  S.Struct({ MediaCapturePipeline: S.optional(MediaCapturePipeline) }),
).annotate({
  identifier: "GetMediaCapturePipelineResponse",
}) as any as S.Schema<GetMediaCapturePipelineResponse>;
export interface GetMediaInsightsPipelineConfigurationRequest {
  Identifier: string;
}
export const GetMediaInsightsPipelineConfigurationRequest = S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/media-insights-pipeline-configurations/{Identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMediaInsightsPipelineConfigurationRequest",
}) as any as S.Schema<GetMediaInsightsPipelineConfigurationRequest>;
export interface GetMediaInsightsPipelineConfigurationResponse {
  MediaInsightsPipelineConfiguration?: MediaInsightsPipelineConfiguration;
}
export const GetMediaInsightsPipelineConfigurationResponse = S.suspend(() =>
  S.Struct({
    MediaInsightsPipelineConfiguration: S.optional(
      MediaInsightsPipelineConfiguration,
    ),
  }),
).annotate({
  identifier: "GetMediaInsightsPipelineConfigurationResponse",
}) as any as S.Schema<GetMediaInsightsPipelineConfigurationResponse>;
export interface GetMediaPipelineRequest {
  MediaPipelineId: string;
}
export const GetMediaPipelineRequest = S.suspend(() =>
  S.Struct({
    MediaPipelineId: S.String.pipe(T.HttpLabel("MediaPipelineId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sdk-media-pipelines/{MediaPipelineId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMediaPipelineRequest",
}) as any as S.Schema<GetMediaPipelineRequest>;
export interface MediaPipeline {
  MediaCapturePipeline?: MediaCapturePipeline;
  MediaLiveConnectorPipeline?: MediaLiveConnectorPipeline;
  MediaConcatenationPipeline?: MediaConcatenationPipeline;
  MediaInsightsPipeline?: MediaInsightsPipeline;
  MediaStreamPipeline?: MediaStreamPipeline;
}
export const MediaPipeline = S.suspend(() =>
  S.Struct({
    MediaCapturePipeline: S.optional(MediaCapturePipeline),
    MediaLiveConnectorPipeline: S.optional(MediaLiveConnectorPipeline),
    MediaConcatenationPipeline: S.optional(MediaConcatenationPipeline),
    MediaInsightsPipeline: S.optional(MediaInsightsPipeline),
    MediaStreamPipeline: S.optional(MediaStreamPipeline),
  }),
).annotate({ identifier: "MediaPipeline" }) as any as S.Schema<MediaPipeline>;
export interface GetMediaPipelineResponse {
  MediaPipeline?: MediaPipeline;
}
export const GetMediaPipelineResponse = S.suspend(() =>
  S.Struct({ MediaPipeline: S.optional(MediaPipeline) }),
).annotate({
  identifier: "GetMediaPipelineResponse",
}) as any as S.Schema<GetMediaPipelineResponse>;
export interface GetMediaPipelineKinesisVideoStreamPoolRequest {
  Identifier: string;
}
export const GetMediaPipelineKinesisVideoStreamPoolRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetMediaPipelineKinesisVideoStreamPoolRequest",
}) as any as S.Schema<GetMediaPipelineKinesisVideoStreamPoolRequest>;
export interface GetMediaPipelineKinesisVideoStreamPoolResponse {
  KinesisVideoStreamPoolConfiguration?: KinesisVideoStreamPoolConfiguration;
}
export const GetMediaPipelineKinesisVideoStreamPoolResponse = S.suspend(() =>
  S.Struct({
    KinesisVideoStreamPoolConfiguration: S.optional(
      KinesisVideoStreamPoolConfiguration,
    ),
  }),
).annotate({
  identifier: "GetMediaPipelineKinesisVideoStreamPoolResponse",
}) as any as S.Schema<GetMediaPipelineKinesisVideoStreamPoolResponse>;
export interface GetSpeakerSearchTaskRequest {
  Identifier: string;
  SpeakerSearchTaskId: string;
}
export const GetSpeakerSearchTaskRequest = S.suspend(() =>
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
).annotate({
  identifier: "GetSpeakerSearchTaskRequest",
}) as any as S.Schema<GetSpeakerSearchTaskRequest>;
export type MediaPipelineTaskStatus =
  | "NotStarted"
  | "Initializing"
  | "InProgress"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | (string & {});
export const MediaPipelineTaskStatus = S.String;
export interface SpeakerSearchTask {
  SpeakerSearchTaskId?: string;
  SpeakerSearchTaskStatus?: MediaPipelineTaskStatus;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export const SpeakerSearchTask = S.suspend(() =>
  S.Struct({
    SpeakerSearchTaskId: S.optional(S.String),
    SpeakerSearchTaskStatus: S.optional(MediaPipelineTaskStatus),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "SpeakerSearchTask",
}) as any as S.Schema<SpeakerSearchTask>;
export interface GetSpeakerSearchTaskResponse {
  SpeakerSearchTask?: SpeakerSearchTask;
}
export const GetSpeakerSearchTaskResponse = S.suspend(() =>
  S.Struct({ SpeakerSearchTask: S.optional(SpeakerSearchTask) }),
).annotate({
  identifier: "GetSpeakerSearchTaskResponse",
}) as any as S.Schema<GetSpeakerSearchTaskResponse>;
export interface GetVoiceToneAnalysisTaskRequest {
  Identifier: string;
  VoiceToneAnalysisTaskId: string;
}
export const GetVoiceToneAnalysisTaskRequest = S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    VoiceToneAnalysisTaskId: S.String.pipe(
      T.HttpLabel("VoiceToneAnalysisTaskId"),
    ),
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
).annotate({
  identifier: "GetVoiceToneAnalysisTaskRequest",
}) as any as S.Schema<GetVoiceToneAnalysisTaskRequest>;
export interface VoiceToneAnalysisTask {
  VoiceToneAnalysisTaskId?: string;
  VoiceToneAnalysisTaskStatus?: MediaPipelineTaskStatus;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export const VoiceToneAnalysisTask = S.suspend(() =>
  S.Struct({
    VoiceToneAnalysisTaskId: S.optional(S.String),
    VoiceToneAnalysisTaskStatus: S.optional(MediaPipelineTaskStatus),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "VoiceToneAnalysisTask",
}) as any as S.Schema<VoiceToneAnalysisTask>;
export interface GetVoiceToneAnalysisTaskResponse {
  VoiceToneAnalysisTask?: VoiceToneAnalysisTask;
}
export const GetVoiceToneAnalysisTaskResponse = S.suspend(() =>
  S.Struct({ VoiceToneAnalysisTask: S.optional(VoiceToneAnalysisTask) }),
).annotate({
  identifier: "GetVoiceToneAnalysisTaskResponse",
}) as any as S.Schema<GetVoiceToneAnalysisTaskResponse>;
export interface ListMediaCapturePipelinesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListMediaCapturePipelinesRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListMediaCapturePipelinesRequest",
}) as any as S.Schema<ListMediaCapturePipelinesRequest>;
export interface MediaCapturePipelineSummary {
  MediaPipelineId?: string;
  MediaPipelineArn?: string;
}
export const MediaCapturePipelineSummary = S.suspend(() =>
  S.Struct({
    MediaPipelineId: S.optional(S.String),
    MediaPipelineArn: S.optional(S.String),
  }),
).annotate({
  identifier: "MediaCapturePipelineSummary",
}) as any as S.Schema<MediaCapturePipelineSummary>;
export type MediaCapturePipelineSummaryList = MediaCapturePipelineSummary[];
export const MediaCapturePipelineSummaryList = S.Array(
  MediaCapturePipelineSummary,
);
export interface ListMediaCapturePipelinesResponse {
  MediaCapturePipelines?: MediaCapturePipelineSummary[];
  NextToken?: string;
}
export const ListMediaCapturePipelinesResponse = S.suspend(() =>
  S.Struct({
    MediaCapturePipelines: S.optional(MediaCapturePipelineSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMediaCapturePipelinesResponse",
}) as any as S.Schema<ListMediaCapturePipelinesResponse>;
export interface ListMediaInsightsPipelineConfigurationsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListMediaInsightsPipelineConfigurationsRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListMediaInsightsPipelineConfigurationsRequest",
}) as any as S.Schema<ListMediaInsightsPipelineConfigurationsRequest>;
export interface MediaInsightsPipelineConfigurationSummary {
  MediaInsightsPipelineConfigurationName?: string;
  MediaInsightsPipelineConfigurationId?: string;
  MediaInsightsPipelineConfigurationArn?: string | redacted.Redacted<string>;
}
export const MediaInsightsPipelineConfigurationSummary = S.suspend(() =>
  S.Struct({
    MediaInsightsPipelineConfigurationName: S.optional(S.String),
    MediaInsightsPipelineConfigurationId: S.optional(S.String),
    MediaInsightsPipelineConfigurationArn: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "MediaInsightsPipelineConfigurationSummary",
}) as any as S.Schema<MediaInsightsPipelineConfigurationSummary>;
export type MediaInsightsPipelineConfigurationSummaryList =
  MediaInsightsPipelineConfigurationSummary[];
export const MediaInsightsPipelineConfigurationSummaryList = S.Array(
  MediaInsightsPipelineConfigurationSummary,
);
export interface ListMediaInsightsPipelineConfigurationsResponse {
  MediaInsightsPipelineConfigurations?: MediaInsightsPipelineConfigurationSummary[];
  NextToken?: string;
}
export const ListMediaInsightsPipelineConfigurationsResponse = S.suspend(() =>
  S.Struct({
    MediaInsightsPipelineConfigurations: S.optional(
      MediaInsightsPipelineConfigurationSummaryList,
    ),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMediaInsightsPipelineConfigurationsResponse",
}) as any as S.Schema<ListMediaInsightsPipelineConfigurationsResponse>;
export interface ListMediaPipelineKinesisVideoStreamPoolsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListMediaPipelineKinesisVideoStreamPoolsRequest = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/media-pipeline-kinesis-video-stream-pools",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMediaPipelineKinesisVideoStreamPoolsRequest",
}) as any as S.Schema<ListMediaPipelineKinesisVideoStreamPoolsRequest>;
export interface KinesisVideoStreamPoolSummary {
  PoolName?: string;
  PoolId?: string;
  PoolArn?: string | redacted.Redacted<string>;
}
export const KinesisVideoStreamPoolSummary = S.suspend(() =>
  S.Struct({
    PoolName: S.optional(S.String),
    PoolId: S.optional(S.String),
    PoolArn: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "KinesisVideoStreamPoolSummary",
}) as any as S.Schema<KinesisVideoStreamPoolSummary>;
export type KinesisVideoStreamPoolSummaryList = KinesisVideoStreamPoolSummary[];
export const KinesisVideoStreamPoolSummaryList = S.Array(
  KinesisVideoStreamPoolSummary,
);
export interface ListMediaPipelineKinesisVideoStreamPoolsResponse {
  KinesisVideoStreamPools?: KinesisVideoStreamPoolSummary[];
  NextToken?: string;
}
export const ListMediaPipelineKinesisVideoStreamPoolsResponse = S.suspend(() =>
  S.Struct({
    KinesisVideoStreamPools: S.optional(KinesisVideoStreamPoolSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMediaPipelineKinesisVideoStreamPoolsResponse",
}) as any as S.Schema<ListMediaPipelineKinesisVideoStreamPoolsResponse>;
export interface ListMediaPipelinesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListMediaPipelinesRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListMediaPipelinesRequest",
}) as any as S.Schema<ListMediaPipelinesRequest>;
export interface MediaPipelineSummary {
  MediaPipelineId?: string;
  MediaPipelineArn?: string;
}
export const MediaPipelineSummary = S.suspend(() =>
  S.Struct({
    MediaPipelineId: S.optional(S.String),
    MediaPipelineArn: S.optional(S.String),
  }),
).annotate({
  identifier: "MediaPipelineSummary",
}) as any as S.Schema<MediaPipelineSummary>;
export type MediaPipelineList = MediaPipelineSummary[];
export const MediaPipelineList = S.Array(MediaPipelineSummary);
export interface ListMediaPipelinesResponse {
  MediaPipelines?: MediaPipelineSummary[];
  NextToken?: string;
}
export const ListMediaPipelinesResponse = S.suspend(() =>
  S.Struct({
    MediaPipelines: S.optional(MediaPipelineList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMediaPipelinesResponse",
}) as any as S.Schema<ListMediaPipelinesResponse>;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
  S.Struct({ ResourceARN: S.String.pipe(T.HttpQuery("arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface KinesisVideoStreamSourceTaskConfiguration {
  StreamArn: string;
  ChannelId: number;
  FragmentNumber?: string;
}
export const KinesisVideoStreamSourceTaskConfiguration = S.suspend(() =>
  S.Struct({
    StreamArn: S.String,
    ChannelId: S.Number,
    FragmentNumber: S.optional(S.String),
  }),
).annotate({
  identifier: "KinesisVideoStreamSourceTaskConfiguration",
}) as any as S.Schema<KinesisVideoStreamSourceTaskConfiguration>;
export interface StartSpeakerSearchTaskRequest {
  Identifier: string;
  VoiceProfileDomainArn: string | redacted.Redacted<string>;
  KinesisVideoStreamSourceTaskConfiguration?: KinesisVideoStreamSourceTaskConfiguration;
  ClientRequestToken?: string | redacted.Redacted<string>;
}
export const StartSpeakerSearchTaskRequest = S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    VoiceProfileDomainArn: SensitiveString,
    KinesisVideoStreamSourceTaskConfiguration: S.optional(
      KinesisVideoStreamSourceTaskConfiguration,
    ),
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
).annotate({
  identifier: "StartSpeakerSearchTaskRequest",
}) as any as S.Schema<StartSpeakerSearchTaskRequest>;
export interface StartSpeakerSearchTaskResponse {
  SpeakerSearchTask?: SpeakerSearchTask;
}
export const StartSpeakerSearchTaskResponse = S.suspend(() =>
  S.Struct({ SpeakerSearchTask: S.optional(SpeakerSearchTask) }),
).annotate({
  identifier: "StartSpeakerSearchTaskResponse",
}) as any as S.Schema<StartSpeakerSearchTaskResponse>;
export type VoiceAnalyticsLanguageCode = "en-US" | (string & {});
export const VoiceAnalyticsLanguageCode = S.String;
export interface StartVoiceToneAnalysisTaskRequest {
  Identifier: string;
  LanguageCode: VoiceAnalyticsLanguageCode;
  KinesisVideoStreamSourceTaskConfiguration?: KinesisVideoStreamSourceTaskConfiguration;
  ClientRequestToken?: string | redacted.Redacted<string>;
}
export const StartVoiceToneAnalysisTaskRequest = S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    LanguageCode: VoiceAnalyticsLanguageCode,
    KinesisVideoStreamSourceTaskConfiguration: S.optional(
      KinesisVideoStreamSourceTaskConfiguration,
    ),
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
).annotate({
  identifier: "StartVoiceToneAnalysisTaskRequest",
}) as any as S.Schema<StartVoiceToneAnalysisTaskRequest>;
export interface StartVoiceToneAnalysisTaskResponse {
  VoiceToneAnalysisTask?: VoiceToneAnalysisTask;
}
export const StartVoiceToneAnalysisTaskResponse = S.suspend(() =>
  S.Struct({ VoiceToneAnalysisTask: S.optional(VoiceToneAnalysisTask) }),
).annotate({
  identifier: "StartVoiceToneAnalysisTaskResponse",
}) as any as S.Schema<StartVoiceToneAnalysisTaskResponse>;
export interface StopSpeakerSearchTaskRequest {
  Identifier: string;
  SpeakerSearchTaskId: string;
}
export const StopSpeakerSearchTaskRequest = S.suspend(() =>
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
).annotate({
  identifier: "StopSpeakerSearchTaskRequest",
}) as any as S.Schema<StopSpeakerSearchTaskRequest>;
export interface StopSpeakerSearchTaskResponse {}
export const StopSpeakerSearchTaskResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopSpeakerSearchTaskResponse",
}) as any as S.Schema<StopSpeakerSearchTaskResponse>;
export interface StopVoiceToneAnalysisTaskRequest {
  Identifier: string;
  VoiceToneAnalysisTaskId: string;
}
export const StopVoiceToneAnalysisTaskRequest = S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    VoiceToneAnalysisTaskId: S.String.pipe(
      T.HttpLabel("VoiceToneAnalysisTaskId"),
    ),
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
).annotate({
  identifier: "StopVoiceToneAnalysisTaskRequest",
}) as any as S.Schema<StopVoiceToneAnalysisTaskRequest>;
export interface StopVoiceToneAnalysisTaskResponse {}
export const StopVoiceToneAnalysisTaskResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopVoiceToneAnalysisTaskResponse",
}) as any as S.Schema<StopVoiceToneAnalysisTaskResponse>;
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({ ResourceARN: S.String, Tags: TagList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags?operation=tag-resource" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeyList = string[];
export const TagKeyList = S.Array(S.String);
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({ ResourceARN: S.String, TagKeys: TagKeyList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags?operation=untag-resource" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateMediaInsightsPipelineConfigurationRequest {
  Identifier: string;
  ResourceAccessRoleArn: string | redacted.Redacted<string>;
  RealTimeAlertConfiguration?: RealTimeAlertConfiguration;
  Elements: MediaInsightsPipelineConfigurationElement[];
}
export const UpdateMediaInsightsPipelineConfigurationRequest = S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    ResourceAccessRoleArn: SensitiveString,
    RealTimeAlertConfiguration: S.optional(RealTimeAlertConfiguration),
    Elements: MediaInsightsPipelineConfigurationElements,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/media-insights-pipeline-configurations/{Identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateMediaInsightsPipelineConfigurationRequest",
}) as any as S.Schema<UpdateMediaInsightsPipelineConfigurationRequest>;
export interface UpdateMediaInsightsPipelineConfigurationResponse {
  MediaInsightsPipelineConfiguration?: MediaInsightsPipelineConfiguration;
}
export const UpdateMediaInsightsPipelineConfigurationResponse = S.suspend(() =>
  S.Struct({
    MediaInsightsPipelineConfiguration: S.optional(
      MediaInsightsPipelineConfiguration,
    ),
  }),
).annotate({
  identifier: "UpdateMediaInsightsPipelineConfigurationResponse",
}) as any as S.Schema<UpdateMediaInsightsPipelineConfigurationResponse>;
export type MediaPipelineStatusUpdate = "Pause" | "Resume" | (string & {});
export const MediaPipelineStatusUpdate = S.String;
export interface UpdateMediaInsightsPipelineStatusRequest {
  Identifier: string;
  UpdateStatus: MediaPipelineStatusUpdate;
}
export const UpdateMediaInsightsPipelineStatusRequest = S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    UpdateStatus: MediaPipelineStatusUpdate,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/media-insights-pipeline-status/{Identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateMediaInsightsPipelineStatusRequest",
}) as any as S.Schema<UpdateMediaInsightsPipelineStatusRequest>;
export interface UpdateMediaInsightsPipelineStatusResponse {}
export const UpdateMediaInsightsPipelineStatusResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateMediaInsightsPipelineStatusResponse",
}) as any as S.Schema<UpdateMediaInsightsPipelineStatusResponse>;
export interface KinesisVideoStreamConfigurationUpdate {
  DataRetentionInHours?: number;
}
export const KinesisVideoStreamConfigurationUpdate = S.suspend(() =>
  S.Struct({ DataRetentionInHours: S.optional(S.Number) }),
).annotate({
  identifier: "KinesisVideoStreamConfigurationUpdate",
}) as any as S.Schema<KinesisVideoStreamConfigurationUpdate>;
export interface UpdateMediaPipelineKinesisVideoStreamPoolRequest {
  Identifier: string;
  StreamConfiguration?: KinesisVideoStreamConfigurationUpdate;
}
export const UpdateMediaPipelineKinesisVideoStreamPoolRequest = S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    StreamConfiguration: S.optional(KinesisVideoStreamConfigurationUpdate),
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
).annotate({
  identifier: "UpdateMediaPipelineKinesisVideoStreamPoolRequest",
}) as any as S.Schema<UpdateMediaPipelineKinesisVideoStreamPoolRequest>;
export interface UpdateMediaPipelineKinesisVideoStreamPoolResponse {
  KinesisVideoStreamPoolConfiguration?: KinesisVideoStreamPoolConfiguration;
}
export const UpdateMediaPipelineKinesisVideoStreamPoolResponse = S.suspend(() =>
  S.Struct({
    KinesisVideoStreamPoolConfiguration: S.optional(
      KinesisVideoStreamPoolConfiguration,
    ),
  }),
).annotate({
  identifier: "UpdateMediaPipelineKinesisVideoStreamPoolResponse",
}) as any as S.Schema<UpdateMediaPipelineKinesisVideoStreamPoolResponse>;

//# Errors
export class BadRequestException extends S.TaggedErrorClass<BadRequestException>()(
  "BadRequestException",
  {
    Code: S.optional(ErrorCode),
    Message: S.optional(S.String),
    RequestId: S.optional(S.String),
  },
).pipe(C.withBadRequestError) {}
export class ForbiddenException extends S.TaggedErrorClass<ForbiddenException>()(
  "ForbiddenException",
  {
    Code: S.optional(ErrorCode),
    Message: S.optional(S.String),
    RequestId: S.optional(S.String),
  },
).pipe(C.withAuthError) {}
export class ResourceLimitExceededException extends S.TaggedErrorClass<ResourceLimitExceededException>()(
  "ResourceLimitExceededException",
  {
    Code: S.optional(ErrorCode),
    Message: S.optional(S.String),
    RequestId: S.optional(S.String),
  },
).pipe(C.withBadRequestError) {}
export class ServiceFailureException extends S.TaggedErrorClass<ServiceFailureException>()(
  "ServiceFailureException",
  {
    Code: S.optional(ErrorCode),
    Message: S.optional(S.String),
    RequestId: S.optional(S.String),
  },
).pipe(C.withServerError) {}
export class ServiceUnavailableException extends S.TaggedErrorClass<ServiceUnavailableException>()(
  "ServiceUnavailableException",
  {
    Code: S.optional(ErrorCode),
    Message: S.optional(S.String),
    RequestId: S.optional(S.String),
  },
).pipe(C.withServerError) {}
export class ThrottledClientException extends S.TaggedErrorClass<ThrottledClientException>()(
  "ThrottledClientException",
  {
    Code: S.optional(ErrorCode),
    Message: S.optional(S.String),
    RequestId: S.optional(S.String),
  },
).pipe(C.withThrottlingError) {}
export class UnauthorizedClientException extends S.TaggedErrorClass<UnauthorizedClientException>()(
  "UnauthorizedClientException",
  {
    Code: S.optional(ErrorCode),
    Message: S.optional(S.String),
    RequestId: S.optional(S.String),
  },
).pipe(C.withAuthError) {}
export class NotFoundException extends S.TaggedErrorClass<NotFoundException>()(
  "NotFoundException",
  {
    Code: S.optional(ErrorCode),
    Message: S.optional(S.String),
    RequestId: S.optional(S.String),
  },
).pipe(C.withBadRequestError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  {
    Code: S.optional(ErrorCode),
    Message: S.optional(S.String),
    RequestId: S.optional(S.String),
  },
).pipe(C.withConflictError) {}

//# Operations
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateMediaCapturePipelineRequest,
  output: CreateMediaCapturePipelineResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateMediaConcatenationPipelineRequest,
  output: CreateMediaConcatenationPipelineResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateMediaInsightsPipelineRequest,
  output: CreateMediaInsightsPipelineResponse,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateMediaInsightsPipelineConfigurationRequest,
  output: CreateMediaInsightsPipelineConfigurationResponse,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateMediaLiveConnectorPipelineRequest,
  output: CreateMediaLiveConnectorPipelineResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateMediaPipelineKinesisVideoStreamPoolRequest,
  output: CreateMediaPipelineKinesisVideoStreamPoolResponse,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateMediaStreamPipelineRequest,
  output: CreateMediaStreamPipelineResponse,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteMediaCapturePipelineRequest,
  output: DeleteMediaCapturePipelineResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteMediaInsightsPipelineConfigurationRequest,
  output: DeleteMediaInsightsPipelineConfigurationResponse,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteMediaPipelineRequest,
  output: DeleteMediaPipelineResponse,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteMediaPipelineKinesisVideoStreamPoolRequest,
  output: DeleteMediaPipelineKinesisVideoStreamPoolResponse,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetMediaCapturePipelineRequest,
  output: GetMediaCapturePipelineResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetMediaInsightsPipelineConfigurationRequest,
  output: GetMediaInsightsPipelineConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetMediaPipelineRequest,
  output: GetMediaPipelineResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetMediaPipelineKinesisVideoStreamPoolRequest,
  output: GetMediaPipelineKinesisVideoStreamPoolResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSpeakerSearchTaskRequest,
  output: GetSpeakerSearchTaskResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetVoiceToneAnalysisTaskRequest,
  output: GetVoiceToneAnalysisTaskResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
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
export const listMediaCapturePipelines: API.OperationMethod<
  ListMediaCapturePipelinesRequest,
  ListMediaCapturePipelinesResponse,
  ListMediaCapturePipelinesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListMediaCapturePipelinesRequest,
  ) => stream.Stream<
    ListMediaCapturePipelinesResponse,
    ListMediaCapturePipelinesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListMediaCapturePipelinesRequest,
  ) => stream.Stream<
    unknown,
    ListMediaCapturePipelinesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListMediaCapturePipelinesRequest,
  output: ListMediaCapturePipelinesResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listMediaInsightsPipelineConfigurations: API.OperationMethod<
  ListMediaInsightsPipelineConfigurationsRequest,
  ListMediaInsightsPipelineConfigurationsResponse,
  ListMediaInsightsPipelineConfigurationsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListMediaInsightsPipelineConfigurationsRequest,
  ) => stream.Stream<
    ListMediaInsightsPipelineConfigurationsResponse,
    ListMediaInsightsPipelineConfigurationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListMediaInsightsPipelineConfigurationsRequest,
  ) => stream.Stream<
    unknown,
    ListMediaInsightsPipelineConfigurationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListMediaInsightsPipelineConfigurationsRequest,
  output: ListMediaInsightsPipelineConfigurationsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listMediaPipelineKinesisVideoStreamPools: API.OperationMethod<
  ListMediaPipelineKinesisVideoStreamPoolsRequest,
  ListMediaPipelineKinesisVideoStreamPoolsResponse,
  ListMediaPipelineKinesisVideoStreamPoolsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListMediaPipelineKinesisVideoStreamPoolsRequest,
  ) => stream.Stream<
    ListMediaPipelineKinesisVideoStreamPoolsResponse,
    ListMediaPipelineKinesisVideoStreamPoolsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListMediaPipelineKinesisVideoStreamPoolsRequest,
  ) => stream.Stream<
    unknown,
    ListMediaPipelineKinesisVideoStreamPoolsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListMediaPipelineKinesisVideoStreamPoolsRequest,
  output: ListMediaPipelineKinesisVideoStreamPoolsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listMediaPipelines: API.OperationMethod<
  ListMediaPipelinesRequest,
  ListMediaPipelinesResponse,
  ListMediaPipelinesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListMediaPipelinesRequest,
  ) => stream.Stream<
    ListMediaPipelinesResponse,
    ListMediaPipelinesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListMediaPipelinesRequest,
  ) => stream.Stream<
    unknown,
    ListMediaPipelinesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListMediaPipelinesRequest,
  output: ListMediaPipelinesResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartSpeakerSearchTaskRequest,
  output: StartSpeakerSearchTaskResponse,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartVoiceToneAnalysisTaskRequest,
  output: StartVoiceToneAnalysisTaskResponse,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopSpeakerSearchTaskRequest,
  output: StopSpeakerSearchTaskResponse,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopVoiceToneAnalysisTaskRequest,
  output: StopVoiceToneAnalysisTaskResponse,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateMediaInsightsPipelineConfigurationRequest,
  output: UpdateMediaInsightsPipelineConfigurationResponse,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateMediaInsightsPipelineStatusRequest,
  output: UpdateMediaInsightsPipelineStatusResponse,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateMediaPipelineKinesisVideoStreamPoolRequest,
  output: UpdateMediaPipelineKinesisVideoStreamPoolResponse,
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
}));
