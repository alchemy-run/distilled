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
  sdkId: "IVS RealTime",
  target: "AmazonInteractiveVideoServiceRealTime",
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
                `https://ivsrealtime-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://ivsrealtime-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://ivsrealtime.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://ivsrealtime.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError("ThrottlingException")<{
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
export type EncoderConfigurationName = string;
export type Width = number;
export type Height = number;
export type Framerate = number;
export type Bitrate = number;
export interface Video {
  width?: number;
  height?: number;
  framerate?: number;
  bitrate?: number;
}
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export interface CreateEncoderConfigurationRequest {
  name?: string;
  video?: Video;
  tags?: { [key: string]: string | undefined };
}
export type EncoderConfigurationArn = string;
export interface EncoderConfiguration {
  arn: string;
  name?: string;
  video?: Video;
  tags?: { [key: string]: string | undefined };
}
export interface CreateEncoderConfigurationResponse {
  encoderConfiguration?: EncoderConfiguration;
}
export type IngestConfigurationName = string;
export type IngestConfigurationStageArn = string;
export type UserId = string;
export type ParticipantAttributes = { [key: string]: string | undefined };
export type IngestProtocol = "RTMP" | "RTMPS" | (string & {});
export type InsecureIngest = boolean;
export type RedundantIngest = boolean;
export interface CreateIngestConfigurationRequest {
  name?: string;
  stageArn?: string;
  userId?: string;
  attributes?: { [key: string]: string | undefined };
  ingestProtocol: IngestProtocol;
  insecureIngest?: boolean;
  redundantIngest?: boolean;
  tags?: { [key: string]: string | undefined };
}
export type IngestConfigurationArn = string;
export type StreamKey = string | redacted.Redacted<string>;
export type ParticipantId = string;
export type IngestConfigurationState = string;
export interface RedundantIngestCredential {
  participantId?: string;
  streamKey?: string | redacted.Redacted<string>;
}
export type RedundantIngestCredentials = RedundantIngestCredential[];
export interface IngestConfiguration {
  name?: string;
  arn: string;
  ingestProtocol: IngestProtocol;
  streamKey: string | redacted.Redacted<string>;
  stageArn: string;
  participantId: string;
  state: string;
  userId?: string;
  redundantIngest?: boolean;
  redundantIngestCredentials?: RedundantIngestCredential[];
  attributes?: { [key: string]: string | undefined };
  tags?: { [key: string]: string | undefined };
}
export interface CreateIngestConfigurationResponse {
  ingestConfiguration?: IngestConfiguration;
}
export type StageArn = string;
export type ParticipantTokenDurationMinutes = number;
export type ParticipantTokenUserId = string;
export type ParticipantTokenAttributes = { [key: string]: string | undefined };
export type ParticipantTokenCapability = string;
export type ParticipantTokenCapabilities = string[];
export interface CreateParticipantTokenRequest {
  stageArn: string;
  duration?: number;
  userId?: string;
  attributes?: { [key: string]: string | undefined };
  capabilities?: string[];
}
export type ParticipantTokenId = string;
export type ParticipantTokenString = string | redacted.Redacted<string>;
export type ParticipantTokenExpirationTime = Date;
export interface ParticipantToken {
  participantId?: string;
  token?: string | redacted.Redacted<string>;
  userId?: string;
  attributes?: { [key: string]: string | undefined };
  duration?: number;
  capabilities?: string[];
  expirationTime?: Date;
}
export interface CreateParticipantTokenResponse {
  participantToken?: ParticipantToken;
}
export type StageName = string;
export interface ParticipantTokenConfiguration {
  duration?: number;
  userId?: string;
  attributes?: { [key: string]: string | undefined };
  capabilities?: string[];
}
export type ParticipantTokenConfigurations = ParticipantTokenConfiguration[];
export type AutoParticipantRecordingStorageConfigurationArn = string;
export type ParticipantRecordingMediaType =
  | "AUDIO_VIDEO"
  | "AUDIO_ONLY"
  | "NONE"
  | (string & {});
export type ParticipantRecordingMediaTypeList = ParticipantRecordingMediaType[];
export type ThumbnailIntervalSeconds = number;
export type ThumbnailStorageType = "SEQUENTIAL" | "LATEST" | (string & {});
export type ThumbnailStorageTypeList = ThumbnailStorageType[];
export type ThumbnailRecordingMode = "INTERVAL" | "DISABLED" | (string & {});
export interface ParticipantThumbnailConfiguration {
  targetIntervalSeconds?: number;
  storage?: ThumbnailStorageType[];
  recordingMode?: ThumbnailRecordingMode;
}
export type ParticipantRecordingReconnectWindowSeconds = number;
export type ParticipantRecordingTargetSegmentDurationSeconds = number;
export interface ParticipantRecordingHlsConfiguration {
  targetSegmentDurationSeconds?: number;
}
export type RecordParticipantReplicas = boolean;
export interface AutoParticipantRecordingConfiguration {
  storageConfigurationArn: string;
  mediaTypes?: ParticipantRecordingMediaType[];
  thumbnailConfiguration?: ParticipantThumbnailConfiguration;
  recordingReconnectWindowSeconds?: number;
  hlsConfiguration?: ParticipantRecordingHlsConfiguration;
  recordParticipantReplicas?: boolean;
}
export interface CreateStageRequest {
  name?: string;
  participantTokenConfigurations?: ParticipantTokenConfiguration[];
  tags?: { [key: string]: string | undefined };
  autoParticipantRecordingConfiguration?: AutoParticipantRecordingConfiguration;
}
export type StageSessionId = string;
export type StageEndpoint = string;
export interface StageEndpoints {
  events?: string;
  whip?: string;
  rtmp?: string;
  rtmps?: string;
}
export interface Stage {
  arn: string;
  name?: string;
  activeSessionId?: string;
  tags?: { [key: string]: string | undefined };
  autoParticipantRecordingConfiguration?: AutoParticipantRecordingConfiguration;
  endpoints?: StageEndpoints;
}
export type ParticipantTokenList = ParticipantToken[];
export interface CreateStageResponse {
  stage?: Stage;
  participantTokens?: ParticipantToken[];
}
export type StorageConfigurationName = string;
export type S3BucketName = string;
export interface S3StorageConfiguration {
  bucketName: string;
}
export interface CreateStorageConfigurationRequest {
  name?: string;
  s3: S3StorageConfiguration;
  tags?: { [key: string]: string | undefined };
}
export type StorageConfigurationArn = string;
export interface StorageConfiguration {
  arn: string;
  name?: string;
  s3?: S3StorageConfiguration;
  tags?: { [key: string]: string | undefined };
}
export interface CreateStorageConfigurationResponse {
  storageConfiguration?: StorageConfiguration;
}
export interface DeleteEncoderConfigurationRequest {
  arn: string;
}
export interface DeleteEncoderConfigurationResponse {}
export interface DeleteIngestConfigurationRequest {
  arn: string;
  force?: boolean;
}
export interface DeleteIngestConfigurationResponse {}
export type PublicKeyArn = string;
export interface DeletePublicKeyRequest {
  arn: string;
}
export interface DeletePublicKeyResponse {}
export interface DeleteStageRequest {
  arn: string;
}
export interface DeleteStageResponse {}
export interface DeleteStorageConfigurationRequest {
  arn: string;
}
export interface DeleteStorageConfigurationResponse {}
export type DisconnectParticipantReason = string;
export interface DisconnectParticipantRequest {
  stageArn: string;
  participantId: string;
  reason?: string;
}
export interface DisconnectParticipantResponse {}
export type CompositionArn = string;
export interface GetCompositionRequest {
  arn: string;
}
export type CompositionState = string;
export type AttributeKey = string;
export type OmitStoppedVideo = boolean;
export type VideoAspectRatio =
  | "AUTO"
  | "VIDEO"
  | "SQUARE"
  | "PORTRAIT"
  | (string & {});
export type VideoFillMode = "FILL" | "COVER" | "CONTAIN" | (string & {});
export type GridGap = number;
export interface GridConfiguration {
  featuredParticipantAttribute?: string;
  omitStoppedVideo?: boolean;
  videoAspectRatio?: VideoAspectRatio;
  videoFillMode?: VideoFillMode;
  gridGap?: number;
  participantOrderAttribute?: string;
}
export type PipBehavior = "STATIC" | "DYNAMIC" | (string & {});
export type PipOffset = number;
export type PipPosition =
  | "TOP_LEFT"
  | "TOP_RIGHT"
  | "BOTTOM_LEFT"
  | "BOTTOM_RIGHT"
  | (string & {});
export type PipWidth = number;
export type PipHeight = number;
export interface PipConfiguration {
  featuredParticipantAttribute?: string;
  omitStoppedVideo?: boolean;
  videoFillMode?: VideoFillMode;
  gridGap?: number;
  pipParticipantAttribute?: string;
  pipBehavior?: PipBehavior;
  pipOffset?: number;
  pipPosition?: PipPosition;
  pipWidth?: number;
  pipHeight?: number;
  participantOrderAttribute?: string;
}
export interface LayoutConfiguration {
  grid?: GridConfiguration;
  pip?: PipConfiguration;
}
export type DestinationState = string;
export type DestinationConfigurationName = string;
export type ChannelArn = string;
export interface ChannelDestinationConfiguration {
  channelArn: string;
  encoderConfigurationArn?: string;
}
export type EncoderConfigurationArnList = string[];
export type CompositionRecordingTargetSegmentDurationSeconds = number;
export interface CompositionRecordingHlsConfiguration {
  targetSegmentDurationSeconds?: number;
}
export type RecordingConfigurationFormat = string;
export interface RecordingConfiguration {
  hlsConfiguration?: CompositionRecordingHlsConfiguration;
  format?: string;
}
export interface CompositionThumbnailConfiguration {
  targetIntervalSeconds?: number;
  storage?: ThumbnailStorageType[];
}
export type CompositionThumbnailConfigurationList =
  CompositionThumbnailConfiguration[];
export interface S3DestinationConfiguration {
  storageConfigurationArn: string;
  encoderConfigurationArns: string[];
  recordingConfiguration?: RecordingConfiguration;
  thumbnailConfigurations?: CompositionThumbnailConfiguration[];
}
export interface DestinationConfiguration {
  name?: string;
  channel?: ChannelDestinationConfiguration;
  s3?: S3DestinationConfiguration;
}
export interface S3Detail {
  recordingPrefix: string;
}
export interface DestinationDetail {
  s3?: S3Detail;
}
export interface Destination {
  id: string;
  state: string;
  startTime?: Date;
  endTime?: Date;
  configuration: DestinationConfiguration;
  detail?: DestinationDetail;
}
export type DestinationList = Destination[];
export interface Composition {
  arn: string;
  stageArn: string;
  state: string;
  layout: LayoutConfiguration;
  destinations: Destination[];
  tags?: { [key: string]: string | undefined };
  startTime?: Date;
  endTime?: Date;
}
export interface GetCompositionResponse {
  composition?: Composition;
}
export interface GetEncoderConfigurationRequest {
  arn: string;
}
export interface GetEncoderConfigurationResponse {
  encoderConfiguration?: EncoderConfiguration;
}
export interface GetIngestConfigurationRequest {
  arn: string;
}
export interface GetIngestConfigurationResponse {
  ingestConfiguration?: IngestConfiguration;
}
export interface GetParticipantRequest {
  stageArn: string;
  sessionId: string;
  participantId: string;
}
export type ParticipantState = string;
export type Published = boolean;
export type ParticipantClientAttribute = string;
export type ParticipantRecordingS3BucketName = string;
export type ParticipantRecordingS3Prefix = string;
export type ParticipantRecordingState = string;
export type ParticipantProtocol =
  | "UNKNOWN"
  | "WHIP"
  | "RTMP"
  | "RTMPS"
  | (string & {});
export type ReplicationType = string;
export type ReplicationState = string;
export interface Participant {
  participantId?: string;
  userId?: string;
  state?: string;
  firstJoinTime?: Date;
  attributes?: { [key: string]: string | undefined };
  published?: boolean;
  ispName?: string;
  osName?: string;
  osVersion?: string;
  browserName?: string;
  browserVersion?: string;
  sdkVersion?: string;
  recordingS3BucketName?: string;
  recordingS3Prefix?: string;
  recordingState?: string;
  protocol?: ParticipantProtocol;
  replicationType?: string;
  replicationState?: string;
  sourceStageArn?: string;
  sourceSessionId?: string;
  redundantIngest?: boolean;
  ingestConfigurationArn?: string;
}
export interface GetParticipantResponse {
  participant?: Participant;
}
export interface GetPublicKeyRequest {
  arn: string;
}
export type PublicKeyName = string;
export type PublicKeyMaterial = string;
export type PublicKeyFingerprint = string;
export interface PublicKey {
  arn?: string;
  name?: string;
  publicKeyMaterial?: string;
  fingerprint?: string;
  tags?: { [key: string]: string | undefined };
}
export interface GetPublicKeyResponse {
  publicKey?: PublicKey;
}
export interface GetStageRequest {
  arn: string;
}
export interface GetStageResponse {
  stage?: Stage;
}
export interface GetStageSessionRequest {
  stageArn: string;
  sessionId: string;
}
export interface StageSession {
  sessionId?: string;
  startTime?: Date;
  endTime?: Date;
}
export interface GetStageSessionResponse {
  stageSession?: StageSession;
}
export interface GetStorageConfigurationRequest {
  arn: string;
}
export interface GetStorageConfigurationResponse {
  storageConfiguration?: StorageConfiguration;
}
export interface ImportPublicKeyRequest {
  publicKeyMaterial: string;
  name?: string;
  tags?: { [key: string]: string | undefined };
}
export interface ImportPublicKeyResponse {
  publicKey?: PublicKey;
}
export type PaginationToken = string;
export type MaxCompositionResults = number;
export interface ListCompositionsRequest {
  filterByStageArn?: string;
  filterByEncoderConfigurationArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface DestinationSummary {
  id: string;
  state: string;
  startTime?: Date;
  endTime?: Date;
}
export type DestinationSummaryList = DestinationSummary[];
export interface CompositionSummary {
  arn: string;
  stageArn: string;
  destinations: DestinationSummary[];
  state: string;
  tags?: { [key: string]: string | undefined };
  startTime?: Date;
  endTime?: Date;
}
export type CompositionSummaryList = CompositionSummary[];
export interface ListCompositionsResponse {
  compositions: CompositionSummary[];
  nextToken?: string;
}
export type MaxEncoderConfigurationResults = number;
export interface ListEncoderConfigurationsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface EncoderConfigurationSummary {
  arn: string;
  name?: string;
  tags?: { [key: string]: string | undefined };
}
export type EncoderConfigurationSummaryList = EncoderConfigurationSummary[];
export interface ListEncoderConfigurationsResponse {
  encoderConfigurations: EncoderConfigurationSummary[];
  nextToken?: string;
}
export type MaxIngestConfigurationResults = number;
export interface ListIngestConfigurationsRequest {
  filterByStageArn?: string;
  filterByState?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface IngestConfigurationSummary {
  name?: string;
  arn: string;
  ingestProtocol: IngestProtocol;
  stageArn: string;
  participantId: string;
  state: string;
  userId?: string;
  redundantIngest?: boolean;
}
export type IngestConfigurationList = IngestConfigurationSummary[];
export interface ListIngestConfigurationsResponse {
  ingestConfigurations: IngestConfigurationSummary[];
  nextToken?: string;
}
export type MaxParticipantEventResults = number;
export interface ListParticipantEventsRequest {
  stageArn: string;
  sessionId: string;
  participantId: string;
  nextToken?: string;
  maxResults?: number;
}
export type EventName = string;
export type EventErrorCode =
  | "INSUFFICIENT_CAPABILITIES"
  | "QUOTA_EXCEEDED"
  | "PUBLISHER_NOT_FOUND"
  | "BITRATE_EXCEEDED"
  | "RESOLUTION_EXCEEDED"
  | "STREAM_DURATION_EXCEEDED"
  | "INVALID_AUDIO_CODEC"
  | "INVALID_VIDEO_CODEC"
  | "INVALID_PROTOCOL"
  | "INVALID_STREAM_KEY"
  | "REUSE_OF_STREAM_KEY"
  | "B_FRAME_PRESENT"
  | "INVALID_INPUT"
  | "INTERNAL_SERVER_EXCEPTION"
  | (string & {});
export type Replica = boolean;
export interface ExchangedParticipantToken {
  capabilities?: string[];
  attributes?: { [key: string]: string | undefined };
  userId?: string;
  expirationTime?: Date;
}
export interface Event {
  name?: string;
  participantId?: string;
  eventTime?: Date;
  remoteParticipantId?: string;
  errorCode?: EventErrorCode;
  destinationStageArn?: string;
  destinationSessionId?: string;
  replica?: boolean;
  previousToken?: ExchangedParticipantToken;
  newToken?: ExchangedParticipantToken;
}
export type EventList = Event[];
export interface ListParticipantEventsResponse {
  events: Event[];
  nextToken?: string;
}
export type MaxParticipantReplicaResults = number;
export interface ListParticipantReplicasRequest {
  sourceStageArn: string;
  participantId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ParticipantReplica {
  sourceStageArn: string;
  participantId: string;
  sourceSessionId: string;
  destinationStageArn: string;
  destinationSessionId: string;
  replicationState: string;
}
export type ParticipantReplicaList = ParticipantReplica[];
export interface ListParticipantReplicasResponse {
  replicas: ParticipantReplica[];
  nextToken?: string;
}
export type MaxParticipantResults = number;
export type ParticipantRecordingFilterByRecordingState = string;
export interface ListParticipantsRequest {
  stageArn: string;
  sessionId: string;
  filterByUserId?: string;
  filterByPublished?: boolean;
  filterByState?: string;
  nextToken?: string;
  maxResults?: number;
  filterByRecordingState?: string;
}
export interface ParticipantSummary {
  participantId?: string;
  userId?: string;
  state?: string;
  firstJoinTime?: Date;
  published?: boolean;
  recordingState?: string;
  replicationType?: string;
  replicationState?: string;
  sourceStageArn?: string;
  sourceSessionId?: string;
  redundantIngest?: boolean;
  ingestConfigurationArn?: string;
}
export type ParticipantList = ParticipantSummary[];
export interface ListParticipantsResponse {
  participants: ParticipantSummary[];
  nextToken?: string;
}
export type MaxPublicKeyResults = number;
export interface ListPublicKeysRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface PublicKeySummary {
  arn?: string;
  name?: string;
  tags?: { [key: string]: string | undefined };
}
export type PublicKeyList = PublicKeySummary[];
export interface ListPublicKeysResponse {
  publicKeys: PublicKeySummary[];
  nextToken?: string;
}
export type MaxStageResults = number;
export interface ListStagesRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface StageSummary {
  arn: string;
  name?: string;
  activeSessionId?: string;
  tags?: { [key: string]: string | undefined };
}
export type StageSummaryList = StageSummary[];
export interface ListStagesResponse {
  stages: StageSummary[];
  nextToken?: string;
}
export type MaxStageSessionResults = number;
export interface ListStageSessionsRequest {
  stageArn: string;
  nextToken?: string;
  maxResults?: number;
}
export interface StageSessionSummary {
  sessionId?: string;
  startTime?: Date;
  endTime?: Date;
}
export type StageSessionList = StageSessionSummary[];
export interface ListStageSessionsResponse {
  stageSessions: StageSessionSummary[];
  nextToken?: string;
}
export type MaxStorageConfigurationResults = number;
export interface ListStorageConfigurationsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface StorageConfigurationSummary {
  arn: string;
  name?: string;
  s3?: S3StorageConfiguration;
  tags?: { [key: string]: string | undefined };
}
export type StorageConfigurationSummaryList = StorageConfigurationSummary[];
export interface ListStorageConfigurationsResponse {
  storageConfigurations: StorageConfigurationSummary[];
  nextToken?: string;
}
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags: { [key: string]: string | undefined };
}
export type CompositionClientToken = string;
export type DestinationConfigurationList = DestinationConfiguration[];
export interface StartCompositionRequest {
  stageArn: string;
  idempotencyToken?: string;
  layout?: LayoutConfiguration;
  destinations: DestinationConfiguration[];
  tags?: { [key: string]: string | undefined };
}
export interface StartCompositionResponse {
  composition?: Composition;
}
export type ReconnectWindowSeconds = number;
export interface StartParticipantReplicationRequest {
  sourceStageArn: string;
  destinationStageArn: string;
  participantId: string;
  reconnectWindowSeconds?: number;
  attributes?: { [key: string]: string | undefined };
}
export interface StartParticipantReplicationResponse {
  accessControlAllowOrigin?: string;
  accessControlExposeHeaders?: string;
  cacheControl?: string;
  contentSecurityPolicy?: string;
  strictTransportSecurity?: string;
  xContentTypeOptions?: string;
  xFrameOptions?: string;
}
export interface StopCompositionRequest {
  arn: string;
}
export interface StopCompositionResponse {}
export interface StopParticipantReplicationRequest {
  sourceStageArn: string;
  destinationStageArn: string;
  participantId: string;
}
export interface StopParticipantReplicationResponse {
  accessControlAllowOrigin?: string;
  accessControlExposeHeaders?: string;
  cacheControl?: string;
  contentSecurityPolicy?: string;
  strictTransportSecurity?: string;
  xContentTypeOptions?: string;
  xFrameOptions?: string;
}
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
export interface UpdateIngestConfigurationRequest {
  arn: string;
  stageArn?: string;
  redundantIngest?: boolean;
}
export interface UpdateIngestConfigurationResponse {
  ingestConfiguration?: IngestConfiguration;
}
export interface UpdateStageRequest {
  arn: string;
  name?: string;
  autoParticipantRecordingConfiguration?: AutoParticipantRecordingConfiguration;
}
export interface UpdateStageResponse {
  stage?: Stage;
}
export type ErrorMessage = string;
export type CreateEncoderConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | PendingVerification
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an EncoderConfiguration object.
 */
export const createEncoderConfiguration: API.OperationMethod<
  CreateEncoderConfigurationRequest,
  CreateEncoderConfigurationResponse,
  CreateEncoderConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateEncoderConfiguration",
    input: {
      name: 0,
      video: { width: 0, height: 0, framerate: 0, bitrate: 0 },
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
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEncoderConfiguration",
})) as any;

export type CreateIngestConfigurationError =
  | AccessDeniedException
  | PendingVerification
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new IngestConfiguration resource, used to specify the ingest protocol for a stage.
 */
export const createIngestConfiguration: API.OperationMethod<
  CreateIngestConfigurationRequest,
  CreateIngestConfigurationResponse,
  CreateIngestConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateIngestConfiguration",
    input: {
      name: 0,
      stageArn: 0,
      userId: 0,
      attributes: 0,
      ingestProtocol: 0,
      insecureIngest: 0,
      redundantIngest: 0,
      tags: 0,
    },
    output: { ingestConfiguration: o_IngestConfiguration },
    body: true,
  },
  errors: [
    AccessDeniedException,
    PendingVerification,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIngestConfiguration",
})) as any;

export type CreateParticipantTokenError =
  | AccessDeniedException
  | PendingVerification
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an additional token for a specified stage. This can be done after stage creation
 * or when tokens expire. Tokens always are scoped to the stage for which they are
 * created.
 *
 * Encryption keys are owned by Amazon IVS and never used directly by your
 * application.
 */
export const createParticipantToken: API.OperationMethod<
  CreateParticipantTokenRequest,
  CreateParticipantTokenResponse,
  CreateParticipantTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateParticipantToken",
    input: {
      stageArn: 0,
      duration: 0,
      userId: 0,
      attributes: 0,
      capabilities: 0,
    },
    output: { participantToken: o_ParticipantToken },
    body: true,
  },
  errors: [
    AccessDeniedException,
    PendingVerification,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateParticipantToken",
})) as any;

export type CreateStageError =
  | AccessDeniedException
  | PendingVerification
  | ServiceQuotaExceededException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new stage (and optionally participant tokens).
 */
export const createStage: API.OperationMethod<
  CreateStageRequest,
  CreateStageResponse,
  CreateStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateStage",
    input: {
      name: 0,
      participantTokenConfigurations: D.list({
        duration: 0,
        userId: 0,
        attributes: 0,
        capabilities: 0,
      }),
      tags: 0,
      autoParticipantRecordingConfiguration:
        i_AutoParticipantRecordingConfiguration,
    },
    output: { participantTokens: D.list(o_ParticipantToken) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    PendingVerification,
    ServiceQuotaExceededException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStage",
})) as any;

export type CreateStorageConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | PendingVerification
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new storage configuration, used to enable recording to Amazon S3.
 * When a StorageConfiguration is created, IVS will modify the S3 bucketPolicy of the provided bucket.
 * This will ensure that IVS has sufficient permissions to write content to the provided bucket.
 */
export const createStorageConfiguration: API.OperationMethod<
  CreateStorageConfigurationRequest,
  CreateStorageConfigurationResponse,
  CreateStorageConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateStorageConfiguration",
    input: { name: 0, s3: { bucketName: 0 }, tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    PendingVerification,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStorageConfiguration",
})) as any;

export type DeleteEncoderConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an EncoderConfiguration resource. Ensures that no Compositions are using this
 * template; otherwise, returns an error.
 */
export const deleteEncoderConfiguration: API.OperationMethod<
  DeleteEncoderConfigurationRequest,
  DeleteEncoderConfigurationResponse,
  DeleteEncoderConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteEncoderConfiguration",
    input: { arn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEncoderConfiguration",
})) as any;

export type DeleteIngestConfigurationError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specified IngestConfiguration, so it can no longer be used to broadcast. An IngestConfiguration cannot be deleted if the publisher is actively streaming to a stage, unless `force` is set to `true`.
 */
export const deleteIngestConfiguration: API.OperationMethod<
  DeleteIngestConfigurationRequest,
  DeleteIngestConfigurationResponse,
  DeleteIngestConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteIngestConfiguration",
    input: { arn: 0, force: 0 },
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
  operationName: "DeleteIngestConfiguration",
})) as any;

export type DeletePublicKeyError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified public key used to sign stage participant tokens.
 * This invalidates future participant tokens generated using the key pair’s private key.
 */
export const deletePublicKey: API.OperationMethod<
  DeletePublicKeyRequest,
  DeletePublicKeyResponse,
  DeletePublicKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeletePublicKey",
    input: { arn: 0 },
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
  operationName: "DeletePublicKey",
})) as any;

export type DeleteStageError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Shuts down and deletes the specified stage (disconnecting all participants). This operation also
 * removes the `stageArn` from the associated IngestConfiguration, if there are participants
 * using the IngestConfiguration to publish to the stage.
 */
export const deleteStage: API.OperationMethod<
  DeleteStageRequest,
  DeleteStageResponse,
  DeleteStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteStage",
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
  operationName: "DeleteStage",
})) as any;

export type DeleteStorageConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the storage configuration for the specified ARN.
 *
 * If you try to delete a storage configuration that is used by a Composition, you will get an error (409 ConflictException).
 * To avoid this, for all Compositions that reference the storage configuration, first use StopComposition and wait for it to complete,
 * then use DeleteStorageConfiguration.
 */
export const deleteStorageConfiguration: API.OperationMethod<
  DeleteStorageConfigurationRequest,
  DeleteStorageConfigurationResponse,
  DeleteStorageConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteStorageConfiguration",
    input: { arn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStorageConfiguration",
})) as any;

export type DisconnectParticipantError =
  | AccessDeniedException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Disconnects a specified participant from a specified stage. If the participant is publishing using
 * an IngestConfiguration, DisconnectParticipant also updates the `stageArn`
 * in the IngestConfiguration to be an empty string.
 */
export const disconnectParticipant: API.OperationMethod<
  DisconnectParticipantRequest,
  DisconnectParticipantResponse,
  DisconnectParticipantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DisconnectParticipant",
    input: { stageArn: 0, participantId: 0, reason: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisconnectParticipant",
})) as any;

export type GetCompositionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Get information about the specified Composition resource.
 */
export const getComposition: API.OperationMethod<
  GetCompositionRequest,
  GetCompositionResponse,
  GetCompositionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetComposition",
    input: { arn: 0 },
    output: { composition: o_Composition },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetComposition",
})) as any;

export type GetEncoderConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified EncoderConfiguration resource.
 */
export const getEncoderConfiguration: API.OperationMethod<
  GetEncoderConfigurationRequest,
  GetEncoderConfigurationResponse,
  GetEncoderConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetEncoderConfiguration",
    input: { arn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEncoderConfiguration",
})) as any;

export type GetIngestConfigurationError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified IngestConfiguration.
 */
export const getIngestConfiguration: API.OperationMethod<
  GetIngestConfigurationRequest,
  GetIngestConfigurationResponse,
  GetIngestConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetIngestConfiguration",
    input: { arn: 0 },
    output: { ingestConfiguration: o_IngestConfiguration },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIngestConfiguration",
})) as any;

export type GetParticipantError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified participant token.
 */
export const getParticipant: API.OperationMethod<
  GetParticipantRequest,
  GetParticipantResponse,
  GetParticipantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetParticipant",
    input: { stageArn: 0, sessionId: 0, participantId: 0 },
    output: { participant: { firstJoinTime: D.ts } },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetParticipant",
})) as any;

export type GetPublicKeyError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information for the specified public key.
 */
export const getPublicKey: API.OperationMethod<
  GetPublicKeyRequest,
  GetPublicKeyResponse,
  GetPublicKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetPublicKey",
    input: { arn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPublicKey",
})) as any;

export type GetStageError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information for the specified stage.
 */
export const getStage: API.OperationMethod<
  GetStageRequest,
  GetStageResponse,
  GetStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetStage",
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
  operationName: "GetStage",
})) as any;

export type GetStageSessionError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information for the specified stage session.
 */
export const getStageSession: API.OperationMethod<
  GetStageSessionRequest,
  GetStageSessionResponse,
  GetStageSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetStageSession",
    input: { stageArn: 0, sessionId: 0 },
    output: { stageSession: { startTime: D.ts, endTime: D.ts } },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStageSession",
})) as any;

export type GetStorageConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Gets the storage configuration for the specified ARN.
 */
export const getStorageConfiguration: API.OperationMethod<
  GetStorageConfigurationRequest,
  GetStorageConfigurationResponse,
  GetStorageConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetStorageConfiguration",
    input: { arn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStorageConfiguration",
})) as any;

export type ImportPublicKeyError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Import a public key to be used for signing stage participant tokens.
 */
export const importPublicKey: API.OperationMethod<
  ImportPublicKeyRequest,
  ImportPublicKeyResponse,
  ImportPublicKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /ImportPublicKey",
    input: { publicKeyMaterial: 0, name: 0, tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    PendingVerification,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportPublicKey",
})) as any;

export type ListCompositionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Gets summary information about all Compositions in your account, in the AWS region
 * where the API request is processed.
 */
export const listCompositions: API.PaginatedOperationMethod<
  ListCompositionsRequest,
  ListCompositionsResponse,
  ListCompositionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListCompositions",
    input: {
      filterByStageArn: 0,
      filterByEncoderConfigurationArn: 0,
      nextToken: 0,
      maxResults: 0,
    },
    output: {
      compositions: D.list({
        destinations: D.list({ startTime: D.ts, endTime: D.ts }),
        startTime: D.ts,
        endTime: D.ts,
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCompositions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEncoderConfigurationsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Gets summary information about all EncoderConfigurations in your account, in the AWS
 * region where the API request is processed.
 */
export const listEncoderConfigurations: API.PaginatedOperationMethod<
  ListEncoderConfigurationsRequest,
  ListEncoderConfigurationsResponse,
  ListEncoderConfigurationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListEncoderConfigurations",
    input: { nextToken: 0, maxResults: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEncoderConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIngestConfigurationsError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Lists all IngestConfigurations in your account, in the AWS region where the API request is processed.
 */
export const listIngestConfigurations: API.PaginatedOperationMethod<
  ListIngestConfigurationsRequest,
  ListIngestConfigurationsResponse,
  ListIngestConfigurationsError,
  Credentials | HttpClient.HttpClient,
  IngestConfigurationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListIngestConfigurations",
    input: {
      filterByStageArn: 0,
      filterByState: 0,
      nextToken: 0,
      maxResults: 0,
    },
    body: true,
  },
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIngestConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "ingestConfigurations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListParticipantEventsError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Lists events for a specified participant that occurred during a specified stage
 * session.
 */
export const listParticipantEvents: API.PaginatedOperationMethod<
  ListParticipantEventsRequest,
  ListParticipantEventsResponse,
  ListParticipantEventsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListParticipantEvents",
    input: {
      stageArn: 0,
      sessionId: 0,
      participantId: 0,
      nextToken: 0,
      maxResults: 0,
    },
    output: {
      events: D.list({
        eventTime: D.ts,
        previousToken: o_ExchangedParticipantToken,
        newToken: o_ExchangedParticipantToken,
      }),
    },
    body: true,
  },
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListParticipantEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListParticipantReplicasError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the replicas for a participant from a source stage.
 */
export const listParticipantReplicas: API.PaginatedOperationMethod<
  ListParticipantReplicasRequest,
  ListParticipantReplicasResponse,
  ListParticipantReplicasError,
  Credentials | HttpClient.HttpClient,
  ParticipantReplica
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListParticipantReplicas",
    input: { sourceStageArn: 0, participantId: 0, nextToken: 0, maxResults: 0 },
    body: true,
  },
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListParticipantReplicas",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "replicas",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListParticipantsError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Lists all participants in a specified stage session.
 */
export const listParticipants: API.PaginatedOperationMethod<
  ListParticipantsRequest,
  ListParticipantsResponse,
  ListParticipantsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListParticipants",
    input: {
      stageArn: 0,
      sessionId: 0,
      filterByUserId: 0,
      filterByPublished: 0,
      filterByState: 0,
      nextToken: 0,
      maxResults: 0,
      filterByRecordingState: 0,
    },
    output: { participants: D.list({ firstJoinTime: D.ts }) },
    body: true,
  },
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListParticipants",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPublicKeysError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Gets summary information about all public keys in your account, in the AWS region where the API request is processed.
 */
export const listPublicKeys: API.PaginatedOperationMethod<
  ListPublicKeysRequest,
  ListPublicKeysResponse,
  ListPublicKeysError,
  Credentials | HttpClient.HttpClient,
  PublicKeySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListPublicKeys",
    input: { nextToken: 0, maxResults: 0 },
    body: true,
  },
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPublicKeys",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "publicKeys",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStagesError =
  | AccessDeniedException
  | ConflictException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets summary information about all stages in your account, in the AWS region where the
 * API request is processed.
 */
export const listStages: API.PaginatedOperationMethod<
  ListStagesRequest,
  ListStagesResponse,
  ListStagesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListStages",
    input: { nextToken: 0, maxResults: 0 },
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
  operationName: "ListStages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStageSessionsError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Gets all sessions for a specified stage.
 */
export const listStageSessions: API.PaginatedOperationMethod<
  ListStageSessionsRequest,
  ListStageSessionsResponse,
  ListStageSessionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListStageSessions",
    input: { stageArn: 0, nextToken: 0, maxResults: 0 },
    output: { stageSessions: D.list({ startTime: D.ts, endTime: D.ts }) },
    body: true,
  },
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStageSessions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStorageConfigurationsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Gets summary information about all storage configurations in your account,
 * in the AWS region where the API request is processed.
 */
export const listStorageConfigurations: API.PaginatedOperationMethod<
  ListStorageConfigurationsRequest,
  ListStorageConfigurationsResponse,
  ListStorageConfigurationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListStorageConfigurations",
    input: { nextToken: 0, maxResults: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStorageConfigurations",
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
 * Gets information about AWS tags for the specified ARN.
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

export type StartCompositionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | PendingVerification
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Starts a Composition from a stage based on the configuration provided in the
 * request.
 *
 * A Composition is an ephemeral resource that exists after this operation returns
 * successfully. Composition stops and the resource is deleted:
 *
 * - When StopComposition is called.
 *
 * - After a 1-minute timeout, when all participants are disconnected from the
 * stage.
 *
 * - After a 1-minute timeout, if there are no participants in the stage when
 * StartComposition is called.
 *
 * - When broadcasting to the IVS channel fails and all retries are exhausted.
 *
 * - When broadcasting is disconnected and all attempts to reconnect are
 * exhausted.
 */
export const startComposition: API.OperationMethod<
  StartCompositionRequest,
  StartCompositionResponse,
  StartCompositionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /StartComposition",
    input: {
      stageArn: 0,
      idempotencyToken: D.m({ idempotency: true }),
      layout: {
        grid: {
          featuredParticipantAttribute: 0,
          omitStoppedVideo: 0,
          videoAspectRatio: 0,
          videoFillMode: 0,
          gridGap: 0,
          participantOrderAttribute: 0,
        },
        pip: {
          featuredParticipantAttribute: 0,
          omitStoppedVideo: 0,
          videoFillMode: 0,
          gridGap: 0,
          pipParticipantAttribute: 0,
          pipBehavior: 0,
          pipOffset: 0,
          pipPosition: 0,
          pipWidth: 0,
          pipHeight: 0,
          participantOrderAttribute: 0,
        },
      },
      destinations: D.list({
        name: 0,
        channel: { channelArn: 0, encoderConfigurationArn: 0 },
        s3: {
          storageConfigurationArn: 0,
          encoderConfigurationArns: 0,
          recordingConfiguration: {
            hlsConfiguration: { targetSegmentDurationSeconds: 0 },
            format: 0,
          },
          thumbnailConfigurations: D.list({
            targetIntervalSeconds: 0,
            storage: 0,
          }),
        },
      }),
      tags: 0,
    },
    output: { composition: o_Composition },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    PendingVerification,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartComposition",
})) as any;

export type StartParticipantReplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | PendingVerification
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Starts replicating a publishing participant from a source stage to a destination stage.
 */
export const startParticipantReplication: API.OperationMethod<
  StartParticipantReplicationRequest,
  StartParticipantReplicationResponse,
  StartParticipantReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /StartParticipantReplication",
    input: {
      sourceStageArn: 0,
      destinationStageArn: 0,
      participantId: 0,
      reconnectWindowSeconds: 0,
      attributes: 0,
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
    ConflictException,
    InternalServerException,
    PendingVerification,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartParticipantReplication",
})) as any;

export type StopCompositionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Stops and deletes a Composition resource. Any broadcast from the Composition resource
 * is stopped.
 */
export const stopComposition: API.OperationMethod<
  StopCompositionRequest,
  StopCompositionResponse,
  StopCompositionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /StopComposition",
    input: { arn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopComposition",
})) as any;

export type StopParticipantReplicationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Stops a replicated participant session.
 */
export const stopParticipantReplication: API.OperationMethod<
  StopParticipantReplicationRequest,
  StopParticipantReplicationResponse,
  StopParticipantReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /StopParticipantReplication",
    input: { sourceStageArn: 0, destinationStageArn: 0, participantId: 0 },
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopParticipantReplication",
})) as any;

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds or updates tags for the AWS resource with the specified ARN.
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

export type UpdateIngestConfigurationError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a specified IngestConfiguration. Only the stage ARN attached to the IngestConfiguration can be updated. An IngestConfiguration that is active cannot be updated.
 */
export const updateIngestConfiguration: API.OperationMethod<
  UpdateIngestConfigurationRequest,
  UpdateIngestConfigurationResponse,
  UpdateIngestConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateIngestConfiguration",
    input: { arn: 0, stageArn: 0, redundantIngest: 0 },
    output: { ingestConfiguration: o_IngestConfiguration },
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
  operationName: "UpdateIngestConfiguration",
})) as any;

export type UpdateStageError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a stage’s configuration.
 */
export const updateStage: API.OperationMethod<
  UpdateStageRequest,
  UpdateStageResponse,
  UpdateStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateStage",
    input: {
      arn: 0,
      name: 0,
      autoParticipantRecordingConfiguration:
        i_AutoParticipantRecordingConfiguration,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    PendingVerification,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStage",
})) as any;

const i_AutoParticipantRecordingConfiguration: D.LazyStruct = () => ({
  storageConfigurationArn: 0,
  mediaTypes: 0,
  thumbnailConfiguration: {
    targetIntervalSeconds: 0,
    storage: 0,
    recordingMode: 0,
  },
  recordingReconnectWindowSeconds: 0,
  hlsConfiguration: { targetSegmentDurationSeconds: 0 },
  recordParticipantReplicas: 0,
});
const o_Composition: D.LazyStruct = () => ({
  destinations: D.list({ startTime: D.ts, endTime: D.ts }),
  startTime: D.ts,
  endTime: D.ts,
});
const o_ExchangedParticipantToken: D.LazyStruct = () => ({
  expirationTime: D.ts,
});
const o_IngestConfiguration: D.LazyStruct = () => ({
  streamKey: D.secret,
  redundantIngestCredentials: D.list({ streamKey: D.secret }),
});
const o_ParticipantToken: D.LazyStruct = () => ({
  token: D.secret,
  expirationTime: D.ts,
});
