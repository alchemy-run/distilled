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
  sdkId: "ivs",
  target: "AmazonInteractiveVideoService",
  version: "2020-07-14",
  sigv4: "ivs",
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
                `https://ivs-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://ivs-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://ivs.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://ivs.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
    headers: {
      accessControlAllowOrigin: "Access-Control-Allow-Origin",
      accessControlExposeHeaders: "Access-Control-Expose-Headers",
      cacheControl: "Cache-Control",
      contentSecurityPolicy: "Content-Security-Policy",
      strictTransportSecurity: "Strict-Transport-Security",
      xContentTypeOptions: "X-Content-Type-Options",
      xFrameOptions: "X-Frame-Options",
      xAmznErrorType: "x-amzn-ErrorType",
    },
  })<{
    readonly accessControlAllowOrigin?: string;
    readonly accessControlExposeHeaders?: string;
    readonly cacheControl?: string;
    readonly contentSecurityPolicy?: string;
    readonly strictTransportSecurity?: string;
    readonly xContentTypeOptions?: string;
    readonly xFrameOptions?: string;
    readonly xAmznErrorType?: string;
    readonly exceptionMessage?: string;
    readonly message?: string;
  }> {}
export class ChannelNotBroadcasting
  extends /*@__PURE__*/ TE.TaggedError(
    "ChannelNotBroadcasting",
    ["BadRequestError"],
    {
      status: 404,
      headers: {
        accessControlAllowOrigin: "Access-Control-Allow-Origin",
        accessControlExposeHeaders: "Access-Control-Expose-Headers",
        cacheControl: "Cache-Control",
        contentSecurityPolicy: "Content-Security-Policy",
        strictTransportSecurity: "Strict-Transport-Security",
        xContentTypeOptions: "X-Content-Type-Options",
        xFrameOptions: "X-Frame-Options",
        xAmznErrorType: "x-amzn-ErrorType",
      },
    },
  )<{
    readonly accessControlAllowOrigin?: string;
    readonly accessControlExposeHeaders?: string;
    readonly cacheControl?: string;
    readonly contentSecurityPolicy?: string;
    readonly strictTransportSecurity?: string;
    readonly xContentTypeOptions?: string;
    readonly xFrameOptions?: string;
    readonly xAmznErrorType?: string;
    readonly exceptionMessage?: string;
    readonly message?: string;
  }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
    headers: {
      accessControlAllowOrigin: "Access-Control-Allow-Origin",
      accessControlExposeHeaders: "Access-Control-Expose-Headers",
      cacheControl: "Cache-Control",
      contentSecurityPolicy: "Content-Security-Policy",
      strictTransportSecurity: "Strict-Transport-Security",
      xContentTypeOptions: "X-Content-Type-Options",
      xFrameOptions: "X-Frame-Options",
      xAmznErrorType: "x-amzn-ErrorType",
    },
  })<{
    readonly accessControlAllowOrigin?: string;
    readonly accessControlExposeHeaders?: string;
    readonly cacheControl?: string;
    readonly contentSecurityPolicy?: string;
    readonly strictTransportSecurity?: string;
    readonly xContentTypeOptions?: string;
    readonly xFrameOptions?: string;
    readonly xAmznErrorType?: string;
    readonly exceptionMessage?: string;
    readonly message?: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    {
      status: 500,
      headers: {
        accessControlAllowOrigin: "Access-Control-Allow-Origin",
        accessControlExposeHeaders: "Access-Control-Expose-Headers",
        cacheControl: "Cache-Control",
        contentSecurityPolicy: "Content-Security-Policy",
        strictTransportSecurity: "Strict-Transport-Security",
        xContentTypeOptions: "X-Content-Type-Options",
        xFrameOptions: "X-Frame-Options",
        xAmznErrorType: "x-amzn-ErrorType",
      },
    },
  )<{
    readonly accessControlAllowOrigin?: string;
    readonly accessControlExposeHeaders?: string;
    readonly cacheControl?: string;
    readonly contentSecurityPolicy?: string;
    readonly strictTransportSecurity?: string;
    readonly xContentTypeOptions?: string;
    readonly xFrameOptions?: string;
    readonly xAmznErrorType?: string;
    readonly exceptionMessage?: string;
    readonly message?: string;
  }> {}
export class PendingVerification
  extends /*@__PURE__*/ TE.TaggedError("PendingVerification", ["AuthError"], {
    status: 403,
    headers: {
      accessControlAllowOrigin: "Access-Control-Allow-Origin",
      accessControlExposeHeaders: "Access-Control-Expose-Headers",
      cacheControl: "Cache-Control",
      contentSecurityPolicy: "Content-Security-Policy",
      strictTransportSecurity: "Strict-Transport-Security",
      xContentTypeOptions: "X-Content-Type-Options",
      xFrameOptions: "X-Frame-Options",
      xAmznErrorType: "x-amzn-ErrorType",
    },
  })<{
    readonly accessControlAllowOrigin?: string;
    readonly accessControlExposeHeaders?: string;
    readonly cacheControl?: string;
    readonly contentSecurityPolicy?: string;
    readonly strictTransportSecurity?: string;
    readonly xContentTypeOptions?: string;
    readonly xFrameOptions?: string;
    readonly xAmznErrorType?: string;
    readonly exceptionMessage?: string;
    readonly message?: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    {
      status: 404,
      headers: {
        accessControlAllowOrigin: "Access-Control-Allow-Origin",
        accessControlExposeHeaders: "Access-Control-Expose-Headers",
        cacheControl: "Cache-Control",
        contentSecurityPolicy: "Content-Security-Policy",
        strictTransportSecurity: "Strict-Transport-Security",
        xContentTypeOptions: "X-Content-Type-Options",
        xFrameOptions: "X-Frame-Options",
        xAmznErrorType: "x-amzn-ErrorType",
      },
    },
  )<{
    readonly accessControlAllowOrigin?: string;
    readonly accessControlExposeHeaders?: string;
    readonly cacheControl?: string;
    readonly contentSecurityPolicy?: string;
    readonly strictTransportSecurity?: string;
    readonly xContentTypeOptions?: string;
    readonly xFrameOptions?: string;
    readonly xAmznErrorType?: string;
    readonly exceptionMessage?: string;
    readonly message?: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    {
      status: 402,
      headers: {
        accessControlAllowOrigin: "Access-Control-Allow-Origin",
        accessControlExposeHeaders: "Access-Control-Expose-Headers",
        cacheControl: "Cache-Control",
        contentSecurityPolicy: "Content-Security-Policy",
        strictTransportSecurity: "Strict-Transport-Security",
        xContentTypeOptions: "X-Content-Type-Options",
        xFrameOptions: "X-Frame-Options",
        xAmznErrorType: "x-amzn-ErrorType",
      },
    },
  )<{
    readonly accessControlAllowOrigin?: string;
    readonly accessControlExposeHeaders?: string;
    readonly cacheControl?: string;
    readonly contentSecurityPolicy?: string;
    readonly strictTransportSecurity?: string;
    readonly xContentTypeOptions?: string;
    readonly xFrameOptions?: string;
    readonly xAmznErrorType?: string;
    readonly exceptionMessage?: string;
    readonly message?: string;
  }> {}
export class ServiceUnavailable
  extends /*@__PURE__*/ TE.TaggedError("ServiceUnavailable", ["ServerError"], {
    status: 503,
    headers: {
      accessControlAllowOrigin: "Access-Control-Allow-Origin",
      accessControlExposeHeaders: "Access-Control-Expose-Headers",
      cacheControl: "Cache-Control",
      contentSecurityPolicy: "Content-Security-Policy",
      strictTransportSecurity: "Strict-Transport-Security",
      xContentTypeOptions: "X-Content-Type-Options",
      xFrameOptions: "X-Frame-Options",
      xAmznErrorType: "x-amzn-ErrorType",
    },
  })<{
    readonly accessControlAllowOrigin?: string;
    readonly accessControlExposeHeaders?: string;
    readonly cacheControl?: string;
    readonly contentSecurityPolicy?: string;
    readonly strictTransportSecurity?: string;
    readonly xContentTypeOptions?: string;
    readonly xFrameOptions?: string;
    readonly xAmznErrorType?: string;
    readonly exceptionMessage?: string;
    readonly message?: string;
  }> {}
export class StreamUnavailable
  extends /*@__PURE__*/ TE.TaggedError("StreamUnavailable", ["ServerError"], {
    status: 503,
    headers: {
      accessControlAllowOrigin: "Access-Control-Allow-Origin",
      accessControlExposeHeaders: "Access-Control-Expose-Headers",
      cacheControl: "Cache-Control",
      contentSecurityPolicy: "Content-Security-Policy",
      strictTransportSecurity: "Strict-Transport-Security",
      xContentTypeOptions: "X-Content-Type-Options",
      xFrameOptions: "X-Frame-Options",
      xAmznErrorType: "x-amzn-ErrorType",
    },
  })<{
    readonly accessControlAllowOrigin?: string;
    readonly accessControlExposeHeaders?: string;
    readonly cacheControl?: string;
    readonly contentSecurityPolicy?: string;
    readonly strictTransportSecurity?: string;
    readonly xContentTypeOptions?: string;
    readonly xFrameOptions?: string;
    readonly xAmznErrorType?: string;
    readonly exceptionMessage?: string;
    readonly message?: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    {
      status: 429,
      headers: {
        accessControlAllowOrigin: "Access-Control-Allow-Origin",
        accessControlExposeHeaders: "Access-Control-Expose-Headers",
        cacheControl: "Cache-Control",
        contentSecurityPolicy: "Content-Security-Policy",
        strictTransportSecurity: "Strict-Transport-Security",
        xContentTypeOptions: "X-Content-Type-Options",
        xFrameOptions: "X-Frame-Options",
        xAmznErrorType: "x-amzn-ErrorType",
      },
    },
  )<{
    readonly accessControlAllowOrigin?: string;
    readonly accessControlExposeHeaders?: string;
    readonly cacheControl?: string;
    readonly contentSecurityPolicy?: string;
    readonly strictTransportSecurity?: string;
    readonly xContentTypeOptions?: string;
    readonly xFrameOptions?: string;
    readonly xAmznErrorType?: string;
    readonly exceptionMessage?: string;
    readonly message?: string;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    {
      status: 400,
      headers: {
        accessControlAllowOrigin: "Access-Control-Allow-Origin",
        accessControlExposeHeaders: "Access-Control-Expose-Headers",
        cacheControl: "Cache-Control",
        contentSecurityPolicy: "Content-Security-Policy",
        strictTransportSecurity: "Strict-Transport-Security",
        xContentTypeOptions: "X-Content-Type-Options",
        xFrameOptions: "X-Frame-Options",
        xAmznErrorType: "x-amzn-ErrorType",
      },
    },
  )<{
    readonly accessControlAllowOrigin?: string;
    readonly accessControlExposeHeaders?: string;
    readonly cacheControl?: string;
    readonly contentSecurityPolicy?: string;
    readonly strictTransportSecurity?: string;
    readonly xContentTypeOptions?: string;
    readonly xFrameOptions?: string;
    readonly xAmznErrorType?: string;
    readonly exceptionMessage?: string;
    readonly message?: string;
  }> {}
export type ChannelArn = string;
export type ChannelArnList = string[];
export interface BatchGetChannelRequest {
  arns: string[];
}
export type ChannelName = string;
export type ChannelLatencyMode = string;
export type ChannelType =
  | "BASIC"
  | "STANDARD"
  | "ADVANCED_SD"
  | "ADVANCED_HD"
  | (string & {});
export type ChannelRecordingConfigurationArn = string;
export type IngestEndpoint = string;
export type PlaybackURL = string;
export type IsAuthorized = boolean;
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export type InsecureIngest = boolean;
export type TranscodePreset =
  | "HIGHER_BANDWIDTH_DELIVERY"
  | "CONSTRAINED_BANDWIDTH_DELIVERY"
  | (string & {});
export type SrtEndpoint = string;
export type SrtPassphrase = string | redacted.Redacted<string>;
export interface Srt {
  endpoint?: string;
  passphrase?: string | redacted.Redacted<string>;
}
export type ChannelPlaybackRestrictionPolicyArn = string;
export type IsMultitrackInputEnabled = boolean;
export type MultitrackPolicy = "ALLOW" | "REQUIRE" | (string & {});
export type MultitrackMaximumResolution =
  | "SD"
  | "HD"
  | "FULL_HD"
  | (string & {});
export interface MultitrackInputConfiguration {
  enabled?: boolean;
  policy?: MultitrackPolicy;
  maximumResolution?: MultitrackMaximumResolution;
}
export type ContainerFormat = string;
export type ChannelAdConfigurationArn = string;
export interface Channel {
  arn?: string;
  name?: string;
  latencyMode?: string;
  type?: ChannelType;
  recordingConfigurationArn?: string;
  ingestEndpoint?: string;
  playbackUrl?: string;
  authorized?: boolean;
  tags?: { [key: string]: string | undefined };
  insecureIngest?: boolean;
  preset?: TranscodePreset;
  srt?: Srt;
  playbackRestrictionPolicyArn?: string;
  multitrackInputConfiguration?: MultitrackInputConfiguration;
  containerFormat?: string;
  adConfigurationArn?: string;
}
export type Channels = Channel[];
export type ResourceArn = string;
export type ErrorCode = string;
export type ErrorMessage = string;
export interface BatchError {
  arn?: string;
  code?: string;
  message?: string;
}
export type BatchErrors = BatchError[];
export interface BatchGetChannelResponse {
  accessControlAllowOrigin?: string;
  accessControlExposeHeaders?: string;
  cacheControl?: string;
  contentSecurityPolicy?: string;
  strictTransportSecurity?: string;
  xContentTypeOptions?: string;
  xFrameOptions?: string;
  channels?: Channel[];
  errors?: BatchError[];
}
export type StreamKeyArn = string;
export type StreamKeyArnList = string[];
export interface BatchGetStreamKeyRequest {
  arns: string[];
}
export type StreamKeyValue = string | redacted.Redacted<string>;
export interface StreamKey {
  arn?: string;
  value?: string | redacted.Redacted<string>;
  channelArn?: string;
  tags?: { [key: string]: string | undefined };
}
export type StreamKeys = StreamKey[];
export interface BatchGetStreamKeyResponse {
  accessControlAllowOrigin?: string;
  accessControlExposeHeaders?: string;
  cacheControl?: string;
  contentSecurityPolicy?: string;
  strictTransportSecurity?: string;
  xContentTypeOptions?: string;
  xFrameOptions?: string;
  streamKeys?: StreamKey[];
  errors?: BatchError[];
}
export type ViewerId = string;
export type ViewerSessionVersion = number;
export interface BatchStartViewerSessionRevocationViewerSession {
  channelArn: string;
  viewerId: string;
  viewerSessionVersionsLessThanOrEqualTo?: number;
}
export type BatchStartViewerSessionRevocationViewerSessionList =
  BatchStartViewerSessionRevocationViewerSession[];
export interface BatchStartViewerSessionRevocationRequest {
  viewerSessions: BatchStartViewerSessionRevocationViewerSession[];
}
export interface BatchStartViewerSessionRevocationError_ {
  channelArn: string;
  viewerId: string;
  code?: string;
  message?: string;
}
export type BatchStartViewerSessionRevocationErrors =
  BatchStartViewerSessionRevocationError_[];
export interface BatchStartViewerSessionRevocationResponse {
  accessControlAllowOrigin?: string;
  accessControlExposeHeaders?: string;
  cacheControl?: string;
  contentSecurityPolicy?: string;
  strictTransportSecurity?: string;
  xContentTypeOptions?: string;
  xFrameOptions?: string;
  errors?: BatchStartViewerSessionRevocationError_[];
}
export type AdConfigurationName = string;
export type MediaTailorPlaybackConfigurationArn = string;
export interface MediaTailorPlaybackConfiguration {
  playbackConfigurationArn?: string;
}
export type MediaTailorPlaybackConfigurationsList =
  MediaTailorPlaybackConfiguration[];
export type AdDurationSeconds = number;
export interface PostRollConfiguration {
  durationSeconds: number;
  enabled: boolean;
}
export interface CreateAdConfigurationRequest {
  name?: string;
  mediaTailorPlaybackConfigurations: MediaTailorPlaybackConfiguration[];
  postRollConfiguration?: PostRollConfiguration;
  tags?: { [key: string]: string | undefined };
}
export type AdConfigurationArn = string;
export interface AdConfiguration {
  arn: string;
  name?: string;
  mediaTailorPlaybackConfigurations: MediaTailorPlaybackConfiguration[];
  postRollConfiguration?: PostRollConfiguration;
  tags?: { [key: string]: string | undefined };
}
export interface CreateAdConfigurationResponse {
  adConfiguration: AdConfiguration;
}
export interface CreateChannelRequest {
  name?: string;
  latencyMode?: string;
  type?: ChannelType;
  authorized?: boolean;
  recordingConfigurationArn?: string;
  tags?: { [key: string]: string | undefined };
  insecureIngest?: boolean;
  preset?: TranscodePreset;
  playbackRestrictionPolicyArn?: string;
  multitrackInputConfiguration?: MultitrackInputConfiguration;
  containerFormat?: string;
  adConfigurationArn?: string;
}
export interface CreateChannelResponse {
  channel?: Channel;
  streamKey?: StreamKey;
}
export type PlaybackRestrictionPolicyAllowedCountry = string;
export type PlaybackRestrictionPolicyAllowedCountryList = string[];
export type PlaybackRestrictionPolicyAllowedOrigin = string;
export type PlaybackRestrictionPolicyAllowedOriginList = string[];
export type PlaybackRestrictionPolicyEnableStrictOriginEnforcement = boolean;
export type PlaybackRestrictionPolicyName = string;
export interface CreatePlaybackRestrictionPolicyRequest {
  allowedCountries?: string[];
  allowedOrigins?: string[];
  enableStrictOriginEnforcement?: boolean;
  name?: string;
  tags?: { [key: string]: string | undefined };
}
export type PlaybackRestrictionPolicyArn = string;
export interface PlaybackRestrictionPolicy {
  arn: string;
  allowedCountries: string[];
  allowedOrigins: string[];
  enableStrictOriginEnforcement?: boolean;
  name?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreatePlaybackRestrictionPolicyResponse {
  playbackRestrictionPolicy?: PlaybackRestrictionPolicy;
}
export type RecordingConfigurationName = string;
export type S3DestinationBucketName = string;
export interface S3DestinationConfiguration {
  bucketName: string;
}
export interface DestinationConfiguration {
  s3?: S3DestinationConfiguration;
}
export type RecordingMode = string;
export type TargetIntervalSeconds = number;
export type ThumbnailConfigurationResolution =
  | "SD"
  | "HD"
  | "FULL_HD"
  | "LOWEST_RESOLUTION"
  | (string & {});
export type ThumbnailConfigurationStorage = string;
export type ThumbnailConfigurationStorageList = string[];
export interface ThumbnailConfiguration {
  recordingMode?: string;
  targetIntervalSeconds?: number;
  resolution?: ThumbnailConfigurationResolution;
  storage?: string[];
}
export type RecordingReconnectWindowSeconds = number;
export type RenditionConfigurationRenditionSelection = string;
export type RenditionConfigurationRendition =
  | "SD"
  | "HD"
  | "FULL_HD"
  | "LOWEST_RESOLUTION"
  | (string & {});
export type RenditionConfigurationRenditionList =
  RenditionConfigurationRendition[];
export interface RenditionConfiguration {
  renditionSelection?: string;
  renditions?: RenditionConfigurationRendition[];
}
export interface CreateRecordingConfigurationRequest {
  name?: string;
  destinationConfiguration: DestinationConfiguration;
  tags?: { [key: string]: string | undefined };
  thumbnailConfiguration?: ThumbnailConfiguration;
  recordingReconnectWindowSeconds?: number;
  renditionConfiguration?: RenditionConfiguration;
}
export type RecordingConfigurationArn = string;
export type RecordingConfigurationState = string;
export interface RecordingConfiguration {
  arn: string;
  name?: string;
  destinationConfiguration: DestinationConfiguration;
  state: string;
  tags?: { [key: string]: string | undefined };
  thumbnailConfiguration?: ThumbnailConfiguration;
  recordingReconnectWindowSeconds?: number;
  renditionConfiguration?: RenditionConfiguration;
}
export interface CreateRecordingConfigurationResponse {
  recordingConfiguration?: RecordingConfiguration;
}
export interface CreateStreamKeyRequest {
  channelArn: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateStreamKeyResponse {
  streamKey?: StreamKey;
}
export interface DeleteAdConfigurationRequest {
  arn: string;
}
export interface DeleteAdConfigurationResponse {}
export interface DeleteChannelRequest {
  arn: string;
}
export interface DeleteChannelResponse {}
export type PlaybackKeyPairArn = string;
export interface DeletePlaybackKeyPairRequest {
  arn: string;
}
export interface DeletePlaybackKeyPairResponse {}
export interface DeletePlaybackRestrictionPolicyRequest {
  arn: string;
}
export interface DeletePlaybackRestrictionPolicyResponse {}
export interface DeleteRecordingConfigurationRequest {
  arn: string;
}
export interface DeleteRecordingConfigurationResponse {}
export interface DeleteStreamKeyRequest {
  arn: string;
}
export interface DeleteStreamKeyResponse {}
export interface GetAdConfigurationRequest {
  arn: string;
}
export interface GetAdConfigurationResponse {
  adConfiguration?: AdConfiguration;
}
export interface GetChannelRequest {
  arn: string;
}
export interface GetChannelResponse {
  channel?: Channel;
}
export interface GetPlaybackKeyPairRequest {
  arn: string;
}
export type PlaybackKeyPairName = string;
export type PlaybackKeyPairFingerprint = string;
export interface PlaybackKeyPair {
  arn?: string;
  name?: string;
  fingerprint?: string;
  tags?: { [key: string]: string | undefined };
}
export interface GetPlaybackKeyPairResponse {
  keyPair?: PlaybackKeyPair;
}
export interface GetPlaybackRestrictionPolicyRequest {
  arn: string;
}
export interface GetPlaybackRestrictionPolicyResponse {
  playbackRestrictionPolicy?: PlaybackRestrictionPolicy;
}
export interface GetRecordingConfigurationRequest {
  arn: string;
}
export interface GetRecordingConfigurationResponse {
  recordingConfiguration?: RecordingConfiguration;
}
export interface GetStreamRequest {
  channelArn: string;
}
export type StreamId = string;
export type StreamStartTime = Date;
export type StreamState = string;
export type StreamHealth = string;
export type StreamViewerCount = number;
export interface Stream {
  channelArn?: string;
  streamId?: string;
  playbackUrl?: string;
  startTime?: Date;
  state?: string;
  health?: string;
  viewerCount?: number;
}
export interface GetStreamResponse {
  stream?: Stream;
}
export interface GetStreamKeyRequest {
  arn: string;
}
export interface GetStreamKeyResponse {
  streamKey?: StreamKey;
}
export interface GetStreamSessionRequest {
  channelArn: string;
  streamId?: string;
}
export interface VideoConfiguration {
  avcProfile?: string;
  avcLevel?: string;
  codec?: string;
  encoder?: string;
  targetBitrate?: number;
  targetFramerate?: number;
  videoHeight?: number;
  videoWidth?: number;
  level?: string;
  track?: string;
  profile?: string;
}
export interface AudioConfiguration {
  codec?: string;
  targetBitrate?: number;
  sampleRate?: number;
  channels?: number;
  track?: string;
}
export interface IngestConfiguration {
  video?: VideoConfiguration;
  audio?: AudioConfiguration;
}
export type VideoConfigurationList = VideoConfiguration[];
export type AudioConfigurationList = AudioConfiguration[];
export interface IngestConfigurations {
  videoConfigurations: VideoConfiguration[];
  audioConfigurations: AudioConfiguration[];
}
export interface StreamEvent {
  name?: string;
  type?: string;
  eventTime?: Date;
  code?: string;
}
export type StreamEvents = StreamEvent[];
export interface StreamSession {
  streamId?: string;
  startTime?: Date;
  endTime?: Date;
  channel?: Channel;
  ingestConfiguration?: IngestConfiguration;
  ingestConfigurations?: IngestConfigurations;
  recordingConfiguration?: RecordingConfiguration;
  truncatedEvents?: StreamEvent[];
}
export interface GetStreamSessionResponse {
  streamSession?: StreamSession;
}
export type PlaybackPublicKeyMaterial = string;
export interface ImportPlaybackKeyPairRequest {
  publicKeyMaterial: string;
  name?: string;
  tags?: { [key: string]: string | undefined };
}
export interface ImportPlaybackKeyPairResponse {
  keyPair?: PlaybackKeyPair;
}
export interface InsertAdBreakRequest {
  channelArn: string;
  durationSeconds: number;
}
export type AdBreakId = string;
export interface InsertAdBreakResponse {
  adBreakId?: string;
}
export type PaginationToken = string;
export type MaxAdConfigurationResults = number;
export interface ListAdConfigurationsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface AdConfigurationSummary {
  arn: string;
  name?: string;
  mediaTailorPlaybackConfigurations: MediaTailorPlaybackConfiguration[];
  postRollConfiguration?: PostRollConfiguration;
  tags?: { [key: string]: string | undefined };
}
export type AdConfigurationList = AdConfigurationSummary[];
export interface ListAdConfigurationsResponse {
  adConfigurations: AdConfigurationSummary[];
  nextToken?: string;
}
export type MaxChannelResults = number;
export interface ListChannelsRequest {
  filterByName?: string;
  filterByRecordingConfigurationArn?: string;
  filterByPlaybackRestrictionPolicyArn?: string;
  filterByAdConfigurationArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ChannelSummary {
  arn?: string;
  name?: string;
  latencyMode?: string;
  authorized?: boolean;
  recordingConfigurationArn?: string;
  tags?: { [key: string]: string | undefined };
  insecureIngest?: boolean;
  type?: ChannelType;
  preset?: TranscodePreset;
  playbackRestrictionPolicyArn?: string;
  adConfigurationArn?: string;
}
export type ChannelList = ChannelSummary[];
export interface ListChannelsResponse {
  channels: ChannelSummary[];
  nextToken?: string;
}
export type MaxPlaybackKeyPairResults = number;
export interface ListPlaybackKeyPairsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface PlaybackKeyPairSummary {
  arn?: string;
  name?: string;
  tags?: { [key: string]: string | undefined };
}
export type PlaybackKeyPairList = PlaybackKeyPairSummary[];
export interface ListPlaybackKeyPairsResponse {
  keyPairs: PlaybackKeyPairSummary[];
  nextToken?: string;
}
export type MaxPlaybackRestrictionPolicyResults = number;
export interface ListPlaybackRestrictionPoliciesRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface PlaybackRestrictionPolicySummary {
  arn: string;
  allowedCountries: string[];
  allowedOrigins: string[];
  enableStrictOriginEnforcement?: boolean;
  name?: string;
  tags?: { [key: string]: string | undefined };
}
export type PlaybackRestrictionPolicyList = PlaybackRestrictionPolicySummary[];
export interface ListPlaybackRestrictionPoliciesResponse {
  playbackRestrictionPolicies: PlaybackRestrictionPolicySummary[];
  nextToken?: string;
}
export type MaxRecordingConfigurationResults = number;
export interface ListRecordingConfigurationsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface RecordingConfigurationSummary {
  arn: string;
  name?: string;
  destinationConfiguration: DestinationConfiguration;
  state: string;
  tags?: { [key: string]: string | undefined };
}
export type RecordingConfigurationList = RecordingConfigurationSummary[];
export interface ListRecordingConfigurationsResponse {
  recordingConfigurations: RecordingConfigurationSummary[];
  nextToken?: string;
}
export type MaxStreamKeyResults = number;
export interface ListStreamKeysRequest {
  channelArn: string;
  nextToken?: string;
  maxResults?: number;
}
export interface StreamKeySummary {
  arn?: string;
  channelArn?: string;
  tags?: { [key: string]: string | undefined };
}
export type StreamKeyList = StreamKeySummary[];
export interface ListStreamKeysResponse {
  streamKeys: StreamKeySummary[];
  nextToken?: string;
}
export interface StreamFilters {
  health?: string;
}
export type MaxStreamResults = number;
export interface ListStreamsRequest {
  filterBy?: StreamFilters;
  nextToken?: string;
  maxResults?: number;
}
export interface StreamSummary {
  channelArn?: string;
  streamId?: string;
  state?: string;
  health?: string;
  viewerCount?: number;
  startTime?: Date;
}
export type StreamList = StreamSummary[];
export interface ListStreamsResponse {
  streams: StreamSummary[];
  nextToken?: string;
}
export interface ListStreamSessionsRequest {
  channelArn: string;
  nextToken?: string;
  maxResults?: number;
}
export interface StreamSessionSummary {
  streamId?: string;
  startTime?: Date;
  endTime?: Date;
  hasErrorEvent?: boolean;
}
export type StreamSessionList = StreamSessionSummary[];
export interface ListStreamSessionsResponse {
  streamSessions: StreamSessionSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags: { [key: string]: string | undefined };
}
export type StreamMetadata = string | redacted.Redacted<string>;
export interface PutMetadataRequest {
  channelArn: string;
  metadata: string | redacted.Redacted<string>;
}
export interface PutMetadataResponse {}
export interface StartViewerSessionRevocationRequest {
  channelArn: string;
  viewerId: string;
  viewerSessionVersionsLessThanOrEqualTo?: number;
}
export interface StartViewerSessionRevocationResponse {}
export interface StopStreamRequest {
  channelArn: string;
}
export interface StopStreamResponse {}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAdConfigurationRequest {
  arn: string;
  name?: string;
  mediaTailorPlaybackConfigurations?: MediaTailorPlaybackConfiguration[];
  postRollConfiguration?: PostRollConfiguration;
}
export interface UpdateAdConfigurationResponse {
  adConfiguration: AdConfiguration;
}
export interface UpdateChannelRequest {
  arn: string;
  name?: string;
  latencyMode?: string;
  type?: ChannelType;
  authorized?: boolean;
  recordingConfigurationArn?: string;
  insecureIngest?: boolean;
  preset?: TranscodePreset;
  playbackRestrictionPolicyArn?: string;
  multitrackInputConfiguration?: MultitrackInputConfiguration;
  containerFormat?: string;
  adConfigurationArn?: string;
}
export interface UpdateChannelResponse {
  channel?: Channel;
}
export interface UpdatePlaybackRestrictionPolicyRequest {
  arn: string;
  allowedCountries?: string[];
  allowedOrigins?: string[];
  enableStrictOriginEnforcement?: boolean;
  name?: string;
}
export interface UpdatePlaybackRestrictionPolicyResponse {
  playbackRestrictionPolicy?: PlaybackRestrictionPolicy;
}
export type BatchGetChannelError =
  | AccessDeniedException
  | ServiceUnavailable
  | ValidationException
  | CommonErrors;
/**
 * Performs GetChannel on multiple ARNs simultaneously.
 */
export const batchGetChannel: API.OperationMethod<
  BatchGetChannelRequest,
  BatchGetChannelResponse,
  BatchGetChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /BatchGetChannel",
    input: { arns: 0 },
    output: {
      accessControlAllowOrigin: D.m({ header: "Access-Control-Allow-Origin" }),
      accessControlExposeHeaders: D.m({
        header: "Access-Control-Expose-Headers",
      }),
      cacheControl: D.m({ header: "Cache-Control" }),
      contentSecurityPolicy: D.m({ header: "Content-Security-Policy" }),
      strictTransportSecurity: D.m({ header: "Strict-Transport-Security" }),
      xContentTypeOptions: D.m({ header: "X-Content-Type-Options" }),
      xFrameOptions: D.m({ header: "X-Frame-Options" }),
      channels: D.list(o_Channel),
    },
    body: true,
  },
  errors: [AccessDeniedException, ServiceUnavailable, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetChannel",
})) as any;

export type BatchGetStreamKeyError =
  | AccessDeniedException
  | ServiceUnavailable
  | ValidationException
  | CommonErrors;
/**
 * Performs GetStreamKey on multiple ARNs simultaneously.
 */
export const batchGetStreamKey: API.OperationMethod<
  BatchGetStreamKeyRequest,
  BatchGetStreamKeyResponse,
  BatchGetStreamKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /BatchGetStreamKey",
    input: { arns: 0 },
    output: {
      accessControlAllowOrigin: D.m({ header: "Access-Control-Allow-Origin" }),
      accessControlExposeHeaders: D.m({
        header: "Access-Control-Expose-Headers",
      }),
      cacheControl: D.m({ header: "Cache-Control" }),
      contentSecurityPolicy: D.m({ header: "Content-Security-Policy" }),
      strictTransportSecurity: D.m({ header: "Strict-Transport-Security" }),
      xContentTypeOptions: D.m({ header: "X-Content-Type-Options" }),
      xFrameOptions: D.m({ header: "X-Frame-Options" }),
      streamKeys: D.list(o_StreamKey),
    },
    body: true,
  },
  errors: [AccessDeniedException, ServiceUnavailable, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetStreamKey",
})) as any;

export type BatchStartViewerSessionRevocationError =
  | AccessDeniedException
  | PendingVerification
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Performs StartViewerSessionRevocation on multiple channel ARN and viewer ID pairs simultaneously.
 */
export const batchStartViewerSessionRevocation: API.OperationMethod<
  BatchStartViewerSessionRevocationRequest,
  BatchStartViewerSessionRevocationResponse,
  BatchStartViewerSessionRevocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /BatchStartViewerSessionRevocation",
    input: {
      viewerSessions: D.list({
        channelArn: 0,
        viewerId: 0,
        viewerSessionVersionsLessThanOrEqualTo: 0,
      }),
    },
    output: {
      accessControlAllowOrigin: D.m({ header: "Access-Control-Allow-Origin" }),
      accessControlExposeHeaders: D.m({
        header: "Access-Control-Expose-Headers",
      }),
      cacheControl: D.m({ header: "Cache-Control" }),
      contentSecurityPolicy: D.m({ header: "Content-Security-Policy" }),
      strictTransportSecurity: D.m({ header: "Strict-Transport-Security" }),
      xContentTypeOptions: D.m({ header: "X-Content-Type-Options" }),
      xFrameOptions: D.m({ header: "X-Frame-Options" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    PendingVerification,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchStartViewerSessionRevocation",
})) as any;

export type CreateAdConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | PendingVerification
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new ad configuration to be used for server-side ad insertion.
 */
export const createAdConfiguration: API.OperationMethod<
  CreateAdConfigurationRequest,
  CreateAdConfigurationResponse,
  CreateAdConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateAdConfiguration",
    input: {
      name: 0,
      mediaTailorPlaybackConfigurations: D.list(
        i_MediaTailorPlaybackConfiguration,
      ),
      postRollConfiguration: i_PostRollConfiguration,
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    PendingVerification,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAdConfiguration",
})) as any;

export type CreateChannelError =
  | AccessDeniedException
  | PendingVerification
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new channel and an associated stream key to start streaming.
 */
export const createChannel: API.OperationMethod<
  CreateChannelRequest,
  CreateChannelResponse,
  CreateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateChannel",
    input: {
      name: 0,
      latencyMode: 0,
      type: 0,
      authorized: 0,
      recordingConfigurationArn: 0,
      tags: 0,
      insecureIngest: 0,
      preset: 0,
      playbackRestrictionPolicyArn: 0,
      multitrackInputConfiguration: i_MultitrackInputConfiguration,
      containerFormat: 0,
      adConfigurationArn: 0,
    },
    output: { channel: o_Channel, streamKey: o_StreamKey },
    body: true,
  },
  errors: [
    AccessDeniedException,
    PendingVerification,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChannel",
})) as any;

export type CreatePlaybackRestrictionPolicyError =
  | AccessDeniedException
  | PendingVerification
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new playback restriction policy, for constraining playback by countries and/or origins.
 */
export const createPlaybackRestrictionPolicy: API.OperationMethod<
  CreatePlaybackRestrictionPolicyRequest,
  CreatePlaybackRestrictionPolicyResponse,
  CreatePlaybackRestrictionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreatePlaybackRestrictionPolicy",
    input: {
      allowedCountries: 0,
      allowedOrigins: 0,
      enableStrictOriginEnforcement: 0,
      name: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    PendingVerification,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePlaybackRestrictionPolicy",
})) as any;

export type CreateRecordingConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | PendingVerification
  | ServiceQuotaExceededException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new recording configuration, used to enable recording to Amazon S3.
 *
 * **Known issue:** In the us-east-1 region, if you use the Amazon Web Services CLI to create a recording configuration, it returns success even if the S3 bucket is in a different region. In this case, the `state` of the recording configuration is `CREATE_FAILED` (instead of `ACTIVE`). (In other regions, the CLI correctly returns failure if the bucket is in a different region.)
 *
 * **Workaround:** Ensure that your S3 bucket is in the same region as the recording configuration. If you create a recording configuration in a different region as your S3 bucket, delete that recording configuration and create a new one with an S3 bucket from the correct region.
 */
export const createRecordingConfiguration: API.OperationMethod<
  CreateRecordingConfigurationRequest,
  CreateRecordingConfigurationResponse,
  CreateRecordingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateRecordingConfiguration",
    input: {
      name: 0,
      destinationConfiguration: { s3: { bucketName: 0 } },
      tags: 0,
      thumbnailConfiguration: {
        recordingMode: 0,
        targetIntervalSeconds: 0,
        resolution: 0,
        storage: 0,
      },
      recordingReconnectWindowSeconds: 0,
      renditionConfiguration: { renditionSelection: 0, renditions: 0 },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    PendingVerification,
    ServiceQuotaExceededException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRecordingConfiguration",
})) as any;

export type CreateStreamKeyError =
  | AccessDeniedException
  | PendingVerification
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a stream key, used to initiate a stream, for the specified channel ARN.
 *
 * Note that CreateChannel creates a stream key. If you subsequently use CreateStreamKey on the same channel, it will fail because a stream key already exists and there is a limit of 1 stream key per channel. To reset the stream key on a channel, use DeleteStreamKey and then CreateStreamKey.
 */
export const createStreamKey: API.OperationMethod<
  CreateStreamKeyRequest,
  CreateStreamKeyResponse,
  CreateStreamKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateStreamKey",
    input: { channelArn: 0, tags: 0 },
    output: { streamKey: o_StreamKey },
    body: true,
  },
  errors: [
    AccessDeniedException,
    PendingVerification,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStreamKey",
})) as any;

export type DeleteAdConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the specified ad configuration.
 */
export const deleteAdConfiguration: API.OperationMethod<
  DeleteAdConfigurationRequest,
  DeleteAdConfigurationResponse,
  DeleteAdConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteAdConfiguration",
    input: { arn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAdConfiguration",
})) as any;

export type DeleteChannelError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the specified channel and its associated stream keys.
 *
 * If you try to delete a live channel, you will get an error (409 ConflictException). To delete a channel that is live, call StopStream, wait for the Amazon EventBridge "Stream End" event (to verify that the stream's state is no longer Live), then call DeleteChannel. (See Using EventBridge with Amazon IVS.)
 */
export const deleteChannel: API.OperationMethod<
  DeleteChannelRequest,
  DeleteChannelResponse,
  DeleteChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteChannel",
    input: { arn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChannel",
})) as any;

export type DeletePlaybackKeyPairError =
  | AccessDeniedException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | InternalServerException
  | CommonErrors;
/**
 * Deletes a specified authorization key pair. This invalidates future viewer tokens generated using the key pair’s `privateKey`. For more information, see Setting Up Private Channels in the *Amazon IVS User Guide*.
 */
export const deletePlaybackKeyPair: API.OperationMethod<
  DeletePlaybackKeyPairRequest,
  DeletePlaybackKeyPairResponse,
  DeletePlaybackKeyPairError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeletePlaybackKeyPair",
    input: { arn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
    InternalServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePlaybackKeyPair",
})) as any;

export type DeletePlaybackRestrictionPolicyError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the specified playback restriction policy.
 */
export const deletePlaybackRestrictionPolicy: API.OperationMethod<
  DeletePlaybackRestrictionPolicyRequest,
  DeletePlaybackRestrictionPolicyResponse,
  DeletePlaybackRestrictionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeletePlaybackRestrictionPolicy",
    input: { arn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePlaybackRestrictionPolicy",
})) as any;

export type DeleteRecordingConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the recording configuration for the specified ARN.
 *
 * If you try to delete a recording configuration that is associated with a channel, you will get an error (409 ConflictException). To avoid this, for all channels that reference the recording configuration, first use UpdateChannel to set the `recordingConfigurationArn` field to an empty string, then use DeleteRecordingConfiguration.
 */
export const deleteRecordingConfiguration: API.OperationMethod<
  DeleteRecordingConfigurationRequest,
  DeleteRecordingConfigurationResponse,
  DeleteRecordingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteRecordingConfiguration",
    input: { arn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRecordingConfiguration",
})) as any;

export type DeleteStreamKeyError =
  | AccessDeniedException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the stream key for the specified ARN, so it can no longer be used to stream.
 */
export const deleteStreamKey: API.OperationMethod<
  DeleteStreamKeyRequest,
  DeleteStreamKeyResponse,
  DeleteStreamKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteStreamKey",
    input: { arn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStreamKey",
})) as any;

export type GetAdConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the ad configuration represented by the specified ARN.
 */
export const getAdConfiguration: API.OperationMethod<
  GetAdConfigurationRequest,
  GetAdConfigurationResponse,
  GetAdConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetAdConfiguration",
    input: { arn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAdConfiguration",
})) as any;

export type GetChannelError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the channel configuration for the specified channel ARN. See also BatchGetChannel.
 */
export const getChannel: API.OperationMethod<
  GetChannelRequest,
  GetChannelResponse,
  GetChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetChannel",
    input: { arn: 0 },
    output: { channel: o_Channel },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChannel",
})) as any;

export type GetPlaybackKeyPairError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets a specified playback authorization key pair and returns the `arn` and `fingerprint`. The `privateKey` held by the caller can be used to generate viewer authorization tokens, to grant viewers access to private channels. For more information, see Setting Up Private Channels in the *Amazon IVS User Guide*.
 */
export const getPlaybackKeyPair: API.OperationMethod<
  GetPlaybackKeyPairRequest,
  GetPlaybackKeyPairResponse,
  GetPlaybackKeyPairError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetPlaybackKeyPair",
    input: { arn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPlaybackKeyPair",
})) as any;

export type GetPlaybackRestrictionPolicyError =
  | AccessDeniedException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the specified playback restriction policy.
 */
export const getPlaybackRestrictionPolicy: API.OperationMethod<
  GetPlaybackRestrictionPolicyRequest,
  GetPlaybackRestrictionPolicyResponse,
  GetPlaybackRestrictionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetPlaybackRestrictionPolicy",
    input: { arn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPlaybackRestrictionPolicy",
})) as any;

export type GetRecordingConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the recording configuration for the specified ARN.
 */
export const getRecordingConfiguration: API.OperationMethod<
  GetRecordingConfigurationRequest,
  GetRecordingConfigurationResponse,
  GetRecordingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetRecordingConfiguration",
    input: { arn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecordingConfiguration",
})) as any;

export type GetStreamError =
  | AccessDeniedException
  | ChannelNotBroadcasting
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about the active (live) stream on a specified channel.
 */
export const getStream: API.OperationMethod<
  GetStreamRequest,
  GetStreamResponse,
  GetStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetStream",
    input: { channelArn: 0 },
    output: { stream: { startTime: D.ts } },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ChannelNotBroadcasting,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStream",
})) as any;

export type GetStreamKeyError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets stream-key information for a specified ARN.
 */
export const getStreamKey: API.OperationMethod<
  GetStreamKeyRequest,
  GetStreamKeyResponse,
  GetStreamKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetStreamKey",
    input: { arn: 0 },
    output: { streamKey: o_StreamKey },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStreamKey",
})) as any;

export type GetStreamSessionError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets metadata on a specified stream.
 */
export const getStreamSession: API.OperationMethod<
  GetStreamSessionRequest,
  GetStreamSessionResponse,
  GetStreamSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetStreamSession",
    input: { channelArn: 0, streamId: 0 },
    output: {
      streamSession: {
        startTime: D.ts,
        endTime: D.ts,
        channel: o_Channel,
        truncatedEvents: D.list({ eventTime: D.ts }),
      },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStreamSession",
})) as any;

export type ImportPlaybackKeyPairError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ServiceQuotaExceededException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Imports the public portion of a new key pair and returns its `arn` and `fingerprint`. The `privateKey` can then be used to generate viewer authorization tokens, to grant viewers access to private channels. For more information, see Setting Up Private Channels in the *Amazon IVS User Guide*.
 */
export const importPlaybackKeyPair: API.OperationMethod<
  ImportPlaybackKeyPairRequest,
  ImportPlaybackKeyPairResponse,
  ImportPlaybackKeyPairError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /ImportPlaybackKeyPair",
    input: { publicKeyMaterial: 0, name: 0, tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    PendingVerification,
    ServiceQuotaExceededException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportPlaybackKeyPair",
})) as any;

export type InsertAdBreakError =
  | AccessDeniedException
  | ChannelNotBroadcasting
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Inserts an ad marker in the playlist for the specified channel and duration using the ad configuration associated with the channel.
 *
 * **Note:** AWS Elemental MediaTailor (EMT), the service that handles ad requests, provides CloudWatch metrics to help you monitor the success or failure of each InsertAdBreak operation. See Monitoring AWS Elemental MediaTailor with Amazon CloudWatch metrics in the *AWS Elemental MediaTailor User Guide* for details on available metrics.
 */
export const insertAdBreak: API.OperationMethod<
  InsertAdBreakRequest,
  InsertAdBreakResponse,
  InsertAdBreakError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /InsertAdBreak",
    input: { channelArn: 0, durationSeconds: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ChannelNotBroadcasting,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InsertAdBreak",
})) as any;

export type ListAdConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets summary information about all ad configurations in your account, in the AWS region where the API request is processed.
 */
export const listAdConfigurations: API.PaginatedOperationMethod<
  ListAdConfigurationsRequest,
  ListAdConfigurationsResponse,
  ListAdConfigurationsError,
  Credentials | HttpClient.HttpClient,
  AdConfigurationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListAdConfigurations",
    input: { nextToken: 0, maxResults: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAdConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "adConfigurations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListChannelsError =
  | AccessDeniedException
  | ConflictException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets summary information about all channels in your account, in the Amazon Web Services region where the API request is processed. This list can be filtered to match a specified name or recording-configuration ARN. Filters are mutually exclusive and cannot be used together. If you try to use both filters, you will get an error (409 ConflictException).
 */
export const listChannels: API.PaginatedOperationMethod<
  ListChannelsRequest,
  ListChannelsResponse,
  ListChannelsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListChannels",
    input: {
      filterByName: 0,
      filterByRecordingConfigurationArn: 0,
      filterByPlaybackRestrictionPolicyArn: 0,
      filterByAdConfigurationArn: 0,
      nextToken: 0,
      maxResults: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChannels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPlaybackKeyPairsError =
  | AccessDeniedException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets summary information about playback key pairs. For more information, see Setting Up Private Channels in the *Amazon IVS User Guide*.
 */
export const listPlaybackKeyPairs: API.PaginatedOperationMethod<
  ListPlaybackKeyPairsRequest,
  ListPlaybackKeyPairsResponse,
  ListPlaybackKeyPairsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListPlaybackKeyPairs",
    input: { nextToken: 0, maxResults: 0 },
    body: true,
  },
  errors: [AccessDeniedException, ValidationException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPlaybackKeyPairs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPlaybackRestrictionPoliciesError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets summary information about playback restriction policies.
 */
export const listPlaybackRestrictionPolicies: API.PaginatedOperationMethod<
  ListPlaybackRestrictionPoliciesRequest,
  ListPlaybackRestrictionPoliciesResponse,
  ListPlaybackRestrictionPoliciesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListPlaybackRestrictionPolicies",
    input: { nextToken: 0, maxResults: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    PendingVerification,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPlaybackRestrictionPolicies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRecordingConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets summary information about all recording configurations in your account, in the Amazon Web Services region where the API request is processed.
 */
export const listRecordingConfigurations: API.PaginatedOperationMethod<
  ListRecordingConfigurationsRequest,
  ListRecordingConfigurationsResponse,
  ListRecordingConfigurationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListRecordingConfigurations",
    input: { nextToken: 0, maxResults: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecordingConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStreamKeysError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets summary information about stream keys for the specified channel.
 */
export const listStreamKeys: API.PaginatedOperationMethod<
  ListStreamKeysRequest,
  ListStreamKeysResponse,
  ListStreamKeysError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListStreamKeys",
    input: { channelArn: 0, nextToken: 0, maxResults: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStreamKeys",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStreamsError =
  | AccessDeniedException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets summary information about live streams in your account, in the Amazon Web Services region where the API request is processed.
 */
export const listStreams: API.PaginatedOperationMethod<
  ListStreamsRequest,
  ListStreamsResponse,
  ListStreamsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListStreams",
    input: { filterBy: { health: 0 }, nextToken: 0, maxResults: 0 },
    output: { streams: D.list({ startTime: D.ts }) },
    body: true,
  },
  errors: [AccessDeniedException, ValidationException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStreams",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStreamSessionsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets a summary of current and previous streams for a specified channel in your account, in the AWS region where the API request is processed.
 */
export const listStreamSessions: API.PaginatedOperationMethod<
  ListStreamSessionsRequest,
  ListStreamSessionsResponse,
  ListStreamSessionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListStreamSessions",
    input: { channelArn: 0, nextToken: 0, maxResults: 0 },
    output: { streamSessions: D.list({ startTime: D.ts, endTime: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStreamSessions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about Amazon Web Services tags for the specified ARN.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type PutMetadataError =
  | AccessDeniedException
  | ChannelNotBroadcasting
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Inserts metadata into the active stream of the specified channel. At most 5 requests per second per channel are allowed, each with a maximum 1 KB payload. (If 5 TPS is not sufficient for your needs, we recommend batching your data into a single PutMetadata call.) At most 155 requests per second per account are allowed. Also see Embedding Metadata within a Video Stream in the *Amazon IVS User Guide*.
 */
export const putMetadata: API.OperationMethod<
  PutMetadataRequest,
  PutMetadataResponse,
  PutMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /PutMetadata",
    input: { channelArn: 0, metadata: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ChannelNotBroadcasting,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMetadata",
})) as any;

export type StartViewerSessionRevocationError =
  | AccessDeniedException
  | InternalServerException
  | PendingVerification
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts the process of revoking the viewer session associated with a specified channel ARN and viewer ID. Optionally, you can provide a version to revoke viewer sessions less than and including that version. For instructions on associating a viewer ID with a viewer session, see Setting Up Private Channels.
 */
export const startViewerSessionRevocation: API.OperationMethod<
  StartViewerSessionRevocationRequest,
  StartViewerSessionRevocationResponse,
  StartViewerSessionRevocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /StartViewerSessionRevocation",
    input: {
      channelArn: 0,
      viewerId: 0,
      viewerSessionVersionsLessThanOrEqualTo: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    PendingVerification,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartViewerSessionRevocation",
})) as any;

export type StopStreamError =
  | AccessDeniedException
  | ChannelNotBroadcasting
  | ResourceNotFoundException
  | StreamUnavailable
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Disconnects the incoming RTMPS stream for the specified channel. Can be used in conjunction with DeleteStreamKey to prevent further streaming to a channel.
 *
 * Many streaming client-software libraries automatically reconnect a dropped RTMPS session, so to stop the stream permanently, you may want to first revoke the `streamKey` attached to the channel.
 */
export const stopStream: API.OperationMethod<
  StopStreamRequest,
  StopStreamResponse,
  StopStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /StopStream",
    input: { channelArn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ChannelNotBroadcasting,
    ResourceNotFoundException,
    StreamUnavailable,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopStream",
})) as any;

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds or updates tags for the Amazon Web Services resource with the specified ARN.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes tags from the resource with the specified ARN.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAdConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | PendingVerification
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a specified ad configuration.
 */
export const updateAdConfiguration: API.OperationMethod<
  UpdateAdConfigurationRequest,
  UpdateAdConfigurationResponse,
  UpdateAdConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateAdConfiguration",
    input: {
      arn: 0,
      name: 0,
      mediaTailorPlaybackConfigurations: D.list(
        i_MediaTailorPlaybackConfiguration,
      ),
      postRollConfiguration: i_PostRollConfiguration,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    PendingVerification,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAdConfiguration",
})) as any;

export type UpdateChannelError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a channel's configuration. Live channels cannot be updated. You must stop the ongoing stream, update the channel, and restart the stream for the changes to take effect.
 */
export const updateChannel: API.OperationMethod<
  UpdateChannelRequest,
  UpdateChannelResponse,
  UpdateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateChannel",
    input: {
      arn: 0,
      name: 0,
      latencyMode: 0,
      type: 0,
      authorized: 0,
      recordingConfigurationArn: 0,
      insecureIngest: 0,
      preset: 0,
      playbackRestrictionPolicyArn: 0,
      multitrackInputConfiguration: i_MultitrackInputConfiguration,
      containerFormat: 0,
      adConfigurationArn: 0,
    },
    output: { channel: o_Channel },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateChannel",
})) as any;

export type UpdatePlaybackRestrictionPolicyError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a specified playback restriction policy.
 */
export const updatePlaybackRestrictionPolicy: API.OperationMethod<
  UpdatePlaybackRestrictionPolicyRequest,
  UpdatePlaybackRestrictionPolicyResponse,
  UpdatePlaybackRestrictionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdatePlaybackRestrictionPolicy",
    input: {
      arn: 0,
      allowedCountries: 0,
      allowedOrigins: 0,
      enableStrictOriginEnforcement: 0,
      name: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePlaybackRestrictionPolicy",
})) as any;

const i_MediaTailorPlaybackConfiguration: D.LazyStruct = () => ({
  playbackConfigurationArn: 0,
});
const i_MultitrackInputConfiguration: D.LazyStruct = () => ({
  enabled: 0,
  policy: 0,
  maximumResolution: 0,
});
const i_PostRollConfiguration: D.LazyStruct = () => ({
  durationSeconds: 0,
  enabled: 0,
});
const o_Channel: D.LazyStruct = () => ({ srt: { passphrase: D.secret } });
const o_StreamKey: D.LazyStruct = () => ({ value: D.secret });
