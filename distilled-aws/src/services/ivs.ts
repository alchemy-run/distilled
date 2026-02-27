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
  sdkId: "ivs",
  serviceShapeName: "AmazonInteractiveVideoService",
});
const auth = T.AwsAuthSigv4({ name: "ivs" });
const ver = T.ServiceVersion("2020-07-14");
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
});

//# Newtypes
export type ChannelArn = string;
export type ChannelName = string;
export type ChannelLatencyMode = string;
export type ChannelRecordingConfigurationArn = string;
export type IngestEndpoint = string;
export type PlaybackURL = string;
export type IsAuthorized = boolean;
export type TagKey = string;
export type TagValue = string;
export type InsecureIngest = boolean;
export type SrtEndpoint = string;
export type SrtPassphrase = string | redacted.Redacted<string>;
export type ChannelPlaybackRestrictionPolicyArn = string;
export type IsMultitrackInputEnabled = boolean;
export type ContainerFormat = string;
export type ResourceArn = string;
export type ErrorCode = string;
export type ErrorMessage = string;
export type StreamKeyArn = string;
export type StreamKeyValue = string | redacted.Redacted<string>;
export type ViewerId = string;
export type ViewerSessionVersion = number;
export type PlaybackRestrictionPolicyAllowedCountry = string;
export type PlaybackRestrictionPolicyAllowedOrigin = string;
export type PlaybackRestrictionPolicyEnableStrictOriginEnforcement = boolean;
export type PlaybackRestrictionPolicyName = string;
export type PlaybackRestrictionPolicyArn = string;
export type RecordingConfigurationName = string;
export type S3DestinationBucketName = string;
export type RecordingMode = string;
export type TargetIntervalSeconds = number;
export type ThumbnailConfigurationStorage = string;
export type RecordingReconnectWindowSeconds = number;
export type RenditionConfigurationRenditionSelection = string;
export type RecordingConfigurationArn = string;
export type RecordingConfigurationState = string;
export type PlaybackKeyPairArn = string;
export type PlaybackKeyPairName = string;
export type PlaybackKeyPairFingerprint = string;
export type StreamId = string;
export type StreamStartTime = Date;
export type StreamState = string;
export type StreamHealth = string;
export type StreamViewerCount = number;
export type PlaybackPublicKeyMaterial = string;
export type PaginationToken = string;
export type MaxChannelResults = number;
export type MaxPlaybackKeyPairResults = number;
export type MaxPlaybackRestrictionPolicyResults = number;
export type MaxRecordingConfigurationResults = number;
export type MaxStreamKeyResults = number;
export type MaxStreamResults = number;
export type StreamMetadata = string | redacted.Redacted<string>;

//# Schemas
export type ChannelArnList = string[];
export const ChannelArnList = S.Array(S.String);
export interface BatchGetChannelRequest {
  arns: string[];
}
export const BatchGetChannelRequest = S.suspend(() =>
  S.Struct({ arns: ChannelArnList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchGetChannel" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetChannelRequest",
}) as any as S.Schema<BatchGetChannelRequest>;
export type ChannelType =
  | "BASIC"
  | "STANDARD"
  | "ADVANCED_SD"
  | "ADVANCED_HD"
  | (string & {});
export const ChannelType = S.String;
export type Tags = { [key: string]: string | undefined };
export const Tags = S.Record(S.String, S.String.pipe(S.optional));
export type TranscodePreset =
  | "HIGHER_BANDWIDTH_DELIVERY"
  | "CONSTRAINED_BANDWIDTH_DELIVERY"
  | (string & {});
export const TranscodePreset = S.String;
export interface Srt {
  endpoint?: string;
  passphrase?: string | redacted.Redacted<string>;
}
export const Srt = S.suspend(() =>
  S.Struct({
    endpoint: S.optional(S.String),
    passphrase: S.optional(SensitiveString),
  }),
).annotate({ identifier: "Srt" }) as any as S.Schema<Srt>;
export type MultitrackPolicy = "ALLOW" | "REQUIRE" | (string & {});
export const MultitrackPolicy = S.String;
export type MultitrackMaximumResolution =
  | "SD"
  | "HD"
  | "FULL_HD"
  | (string & {});
export const MultitrackMaximumResolution = S.String;
export interface MultitrackInputConfiguration {
  enabled?: boolean;
  policy?: MultitrackPolicy;
  maximumResolution?: MultitrackMaximumResolution;
}
export const MultitrackInputConfiguration = S.suspend(() =>
  S.Struct({
    enabled: S.optional(S.Boolean),
    policy: S.optional(MultitrackPolicy),
    maximumResolution: S.optional(MultitrackMaximumResolution),
  }),
).annotate({
  identifier: "MultitrackInputConfiguration",
}) as any as S.Schema<MultitrackInputConfiguration>;
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
}
export const Channel = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    latencyMode: S.optional(S.String),
    type: S.optional(ChannelType),
    recordingConfigurationArn: S.optional(S.String),
    ingestEndpoint: S.optional(S.String),
    playbackUrl: S.optional(S.String),
    authorized: S.optional(S.Boolean),
    tags: S.optional(Tags),
    insecureIngest: S.optional(S.Boolean),
    preset: S.optional(TranscodePreset),
    srt: S.optional(Srt),
    playbackRestrictionPolicyArn: S.optional(S.String),
    multitrackInputConfiguration: S.optional(MultitrackInputConfiguration),
    containerFormat: S.optional(S.String),
  }),
).annotate({ identifier: "Channel" }) as any as S.Schema<Channel>;
export type Channels = Channel[];
export const Channels = S.Array(Channel);
export interface BatchError {
  arn?: string;
  code?: string;
  message?: string;
}
export const BatchError = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    code: S.optional(S.String),
    message: S.optional(S.String),
  }),
).annotate({ identifier: "BatchError" }) as any as S.Schema<BatchError>;
export type BatchErrors = BatchError[];
export const BatchErrors = S.Array(BatchError);
export interface BatchGetChannelResponse {
  channels?: Channel[];
  errors?: BatchError[];
}
export const BatchGetChannelResponse = S.suspend(() =>
  S.Struct({ channels: S.optional(Channels), errors: S.optional(BatchErrors) }),
).annotate({
  identifier: "BatchGetChannelResponse",
}) as any as S.Schema<BatchGetChannelResponse>;
export type StreamKeyArnList = string[];
export const StreamKeyArnList = S.Array(S.String);
export interface BatchGetStreamKeyRequest {
  arns: string[];
}
export const BatchGetStreamKeyRequest = S.suspend(() =>
  S.Struct({ arns: StreamKeyArnList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchGetStreamKey" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetStreamKeyRequest",
}) as any as S.Schema<BatchGetStreamKeyRequest>;
export interface StreamKey {
  arn?: string;
  value?: string | redacted.Redacted<string>;
  channelArn?: string;
  tags?: { [key: string]: string | undefined };
}
export const StreamKey = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    value: S.optional(SensitiveString),
    channelArn: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({ identifier: "StreamKey" }) as any as S.Schema<StreamKey>;
export type StreamKeys = StreamKey[];
export const StreamKeys = S.Array(StreamKey);
export interface BatchGetStreamKeyResponse {
  streamKeys?: StreamKey[];
  errors?: BatchError[];
}
export const BatchGetStreamKeyResponse = S.suspend(() =>
  S.Struct({
    streamKeys: S.optional(StreamKeys),
    errors: S.optional(BatchErrors),
  }),
).annotate({
  identifier: "BatchGetStreamKeyResponse",
}) as any as S.Schema<BatchGetStreamKeyResponse>;
export interface BatchStartViewerSessionRevocationViewerSession {
  channelArn: string;
  viewerId: string;
  viewerSessionVersionsLessThanOrEqualTo?: number;
}
export const BatchStartViewerSessionRevocationViewerSession = S.suspend(() =>
  S.Struct({
    channelArn: S.String,
    viewerId: S.String,
    viewerSessionVersionsLessThanOrEqualTo: S.optional(S.Number),
  }),
).annotate({
  identifier: "BatchStartViewerSessionRevocationViewerSession",
}) as any as S.Schema<BatchStartViewerSessionRevocationViewerSession>;
export type BatchStartViewerSessionRevocationViewerSessionList =
  BatchStartViewerSessionRevocationViewerSession[];
export const BatchStartViewerSessionRevocationViewerSessionList = S.Array(
  BatchStartViewerSessionRevocationViewerSession,
);
export interface BatchStartViewerSessionRevocationRequest {
  viewerSessions: BatchStartViewerSessionRevocationViewerSession[];
}
export const BatchStartViewerSessionRevocationRequest = S.suspend(() =>
  S.Struct({
    viewerSessions: BatchStartViewerSessionRevocationViewerSessionList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchStartViewerSessionRevocation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchStartViewerSessionRevocationRequest",
}) as any as S.Schema<BatchStartViewerSessionRevocationRequest>;
export interface BatchStartViewerSessionRevocationError_ {
  channelArn: string;
  viewerId: string;
  code?: string;
  message?: string;
}
export const BatchStartViewerSessionRevocationError_ = S.suspend(() =>
  S.Struct({
    channelArn: S.String,
    viewerId: S.String,
    code: S.optional(S.String),
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchStartViewerSessionRevocationError",
}) as any as S.Schema<BatchStartViewerSessionRevocationError_>;
export type BatchStartViewerSessionRevocationErrors =
  BatchStartViewerSessionRevocationError_[];
export const BatchStartViewerSessionRevocationErrors = S.Array(
  BatchStartViewerSessionRevocationError_,
);
export interface BatchStartViewerSessionRevocationResponse {
  errors?: BatchStartViewerSessionRevocationError_[];
}
export const BatchStartViewerSessionRevocationResponse = S.suspend(() =>
  S.Struct({ errors: S.optional(BatchStartViewerSessionRevocationErrors) }),
).annotate({
  identifier: "BatchStartViewerSessionRevocationResponse",
}) as any as S.Schema<BatchStartViewerSessionRevocationResponse>;
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
}
export const CreateChannelRequest = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    latencyMode: S.optional(S.String),
    type: S.optional(ChannelType),
    authorized: S.optional(S.Boolean),
    recordingConfigurationArn: S.optional(S.String),
    tags: S.optional(Tags),
    insecureIngest: S.optional(S.Boolean),
    preset: S.optional(TranscodePreset),
    playbackRestrictionPolicyArn: S.optional(S.String),
    multitrackInputConfiguration: S.optional(MultitrackInputConfiguration),
    containerFormat: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateChannel" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateChannelRequest",
}) as any as S.Schema<CreateChannelRequest>;
export interface CreateChannelResponse {
  channel?: Channel;
  streamKey?: StreamKey;
}
export const CreateChannelResponse = S.suspend(() =>
  S.Struct({ channel: S.optional(Channel), streamKey: S.optional(StreamKey) }),
).annotate({
  identifier: "CreateChannelResponse",
}) as any as S.Schema<CreateChannelResponse>;
export type PlaybackRestrictionPolicyAllowedCountryList = string[];
export const PlaybackRestrictionPolicyAllowedCountryList = S.Array(S.String);
export type PlaybackRestrictionPolicyAllowedOriginList = string[];
export const PlaybackRestrictionPolicyAllowedOriginList = S.Array(S.String);
export interface CreatePlaybackRestrictionPolicyRequest {
  allowedCountries?: string[];
  allowedOrigins?: string[];
  enableStrictOriginEnforcement?: boolean;
  name?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreatePlaybackRestrictionPolicyRequest = S.suspend(() =>
  S.Struct({
    allowedCountries: S.optional(PlaybackRestrictionPolicyAllowedCountryList),
    allowedOrigins: S.optional(PlaybackRestrictionPolicyAllowedOriginList),
    enableStrictOriginEnforcement: S.optional(S.Boolean),
    name: S.optional(S.String),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreatePlaybackRestrictionPolicy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePlaybackRestrictionPolicyRequest",
}) as any as S.Schema<CreatePlaybackRestrictionPolicyRequest>;
export interface PlaybackRestrictionPolicy {
  arn: string;
  allowedCountries: string[];
  allowedOrigins: string[];
  enableStrictOriginEnforcement?: boolean;
  name?: string;
  tags?: { [key: string]: string | undefined };
}
export const PlaybackRestrictionPolicy = S.suspend(() =>
  S.Struct({
    arn: S.String,
    allowedCountries: PlaybackRestrictionPolicyAllowedCountryList,
    allowedOrigins: PlaybackRestrictionPolicyAllowedOriginList,
    enableStrictOriginEnforcement: S.optional(S.Boolean),
    name: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "PlaybackRestrictionPolicy",
}) as any as S.Schema<PlaybackRestrictionPolicy>;
export interface CreatePlaybackRestrictionPolicyResponse {
  playbackRestrictionPolicy?: PlaybackRestrictionPolicy;
}
export const CreatePlaybackRestrictionPolicyResponse = S.suspend(() =>
  S.Struct({
    playbackRestrictionPolicy: S.optional(PlaybackRestrictionPolicy),
  }),
).annotate({
  identifier: "CreatePlaybackRestrictionPolicyResponse",
}) as any as S.Schema<CreatePlaybackRestrictionPolicyResponse>;
export interface S3DestinationConfiguration {
  bucketName: string;
}
export const S3DestinationConfiguration = S.suspend(() =>
  S.Struct({ bucketName: S.String }),
).annotate({
  identifier: "S3DestinationConfiguration",
}) as any as S.Schema<S3DestinationConfiguration>;
export interface DestinationConfiguration {
  s3?: S3DestinationConfiguration;
}
export const DestinationConfiguration = S.suspend(() =>
  S.Struct({ s3: S.optional(S3DestinationConfiguration) }),
).annotate({
  identifier: "DestinationConfiguration",
}) as any as S.Schema<DestinationConfiguration>;
export type ThumbnailConfigurationResolution =
  | "SD"
  | "HD"
  | "FULL_HD"
  | "LOWEST_RESOLUTION"
  | (string & {});
export const ThumbnailConfigurationResolution = S.String;
export type ThumbnailConfigurationStorageList = string[];
export const ThumbnailConfigurationStorageList = S.Array(S.String);
export interface ThumbnailConfiguration {
  recordingMode?: string;
  targetIntervalSeconds?: number;
  resolution?: ThumbnailConfigurationResolution;
  storage?: string[];
}
export const ThumbnailConfiguration = S.suspend(() =>
  S.Struct({
    recordingMode: S.optional(S.String),
    targetIntervalSeconds: S.optional(S.Number),
    resolution: S.optional(ThumbnailConfigurationResolution),
    storage: S.optional(ThumbnailConfigurationStorageList),
  }),
).annotate({
  identifier: "ThumbnailConfiguration",
}) as any as S.Schema<ThumbnailConfiguration>;
export type RenditionConfigurationRendition =
  | "SD"
  | "HD"
  | "FULL_HD"
  | "LOWEST_RESOLUTION"
  | (string & {});
export const RenditionConfigurationRendition = S.String;
export type RenditionConfigurationRenditionList =
  RenditionConfigurationRendition[];
export const RenditionConfigurationRenditionList = S.Array(
  RenditionConfigurationRendition,
);
export interface RenditionConfiguration {
  renditionSelection?: string;
  renditions?: RenditionConfigurationRendition[];
}
export const RenditionConfiguration = S.suspend(() =>
  S.Struct({
    renditionSelection: S.optional(S.String),
    renditions: S.optional(RenditionConfigurationRenditionList),
  }),
).annotate({
  identifier: "RenditionConfiguration",
}) as any as S.Schema<RenditionConfiguration>;
export interface CreateRecordingConfigurationRequest {
  name?: string;
  destinationConfiguration: DestinationConfiguration;
  tags?: { [key: string]: string | undefined };
  thumbnailConfiguration?: ThumbnailConfiguration;
  recordingReconnectWindowSeconds?: number;
  renditionConfiguration?: RenditionConfiguration;
}
export const CreateRecordingConfigurationRequest = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    destinationConfiguration: DestinationConfiguration,
    tags: S.optional(Tags),
    thumbnailConfiguration: S.optional(ThumbnailConfiguration),
    recordingReconnectWindowSeconds: S.optional(S.Number),
    renditionConfiguration: S.optional(RenditionConfiguration),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateRecordingConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRecordingConfigurationRequest",
}) as any as S.Schema<CreateRecordingConfigurationRequest>;
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
export const RecordingConfiguration = S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.optional(S.String),
    destinationConfiguration: DestinationConfiguration,
    state: S.String,
    tags: S.optional(Tags),
    thumbnailConfiguration: S.optional(ThumbnailConfiguration),
    recordingReconnectWindowSeconds: S.optional(S.Number),
    renditionConfiguration: S.optional(RenditionConfiguration),
  }),
).annotate({
  identifier: "RecordingConfiguration",
}) as any as S.Schema<RecordingConfiguration>;
export interface CreateRecordingConfigurationResponse {
  recordingConfiguration?: RecordingConfiguration;
}
export const CreateRecordingConfigurationResponse = S.suspend(() =>
  S.Struct({ recordingConfiguration: S.optional(RecordingConfiguration) }),
).annotate({
  identifier: "CreateRecordingConfigurationResponse",
}) as any as S.Schema<CreateRecordingConfigurationResponse>;
export interface CreateStreamKeyRequest {
  channelArn: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateStreamKeyRequest = S.suspend(() =>
  S.Struct({ channelArn: S.String, tags: S.optional(Tags) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateStreamKey" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateStreamKeyRequest",
}) as any as S.Schema<CreateStreamKeyRequest>;
export interface CreateStreamKeyResponse {
  streamKey?: StreamKey;
}
export const CreateStreamKeyResponse = S.suspend(() =>
  S.Struct({ streamKey: S.optional(StreamKey) }),
).annotate({
  identifier: "CreateStreamKeyResponse",
}) as any as S.Schema<CreateStreamKeyResponse>;
export interface DeleteChannelRequest {
  arn: string;
}
export const DeleteChannelRequest = S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteChannel" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteChannelRequest",
}) as any as S.Schema<DeleteChannelRequest>;
export interface DeleteChannelResponse {}
export const DeleteChannelResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteChannelResponse",
}) as any as S.Schema<DeleteChannelResponse>;
export interface DeletePlaybackKeyPairRequest {
  arn: string;
}
export const DeletePlaybackKeyPairRequest = S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeletePlaybackKeyPair" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePlaybackKeyPairRequest",
}) as any as S.Schema<DeletePlaybackKeyPairRequest>;
export interface DeletePlaybackKeyPairResponse {}
export const DeletePlaybackKeyPairResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePlaybackKeyPairResponse",
}) as any as S.Schema<DeletePlaybackKeyPairResponse>;
export interface DeletePlaybackRestrictionPolicyRequest {
  arn: string;
}
export const DeletePlaybackRestrictionPolicyRequest = S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeletePlaybackRestrictionPolicy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePlaybackRestrictionPolicyRequest",
}) as any as S.Schema<DeletePlaybackRestrictionPolicyRequest>;
export interface DeletePlaybackRestrictionPolicyResponse {}
export const DeletePlaybackRestrictionPolicyResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePlaybackRestrictionPolicyResponse",
}) as any as S.Schema<DeletePlaybackRestrictionPolicyResponse>;
export interface DeleteRecordingConfigurationRequest {
  arn: string;
}
export const DeleteRecordingConfigurationRequest = S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteRecordingConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRecordingConfigurationRequest",
}) as any as S.Schema<DeleteRecordingConfigurationRequest>;
export interface DeleteRecordingConfigurationResponse {}
export const DeleteRecordingConfigurationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRecordingConfigurationResponse",
}) as any as S.Schema<DeleteRecordingConfigurationResponse>;
export interface DeleteStreamKeyRequest {
  arn: string;
}
export const DeleteStreamKeyRequest = S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteStreamKey" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteStreamKeyRequest",
}) as any as S.Schema<DeleteStreamKeyRequest>;
export interface DeleteStreamKeyResponse {}
export const DeleteStreamKeyResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteStreamKeyResponse",
}) as any as S.Schema<DeleteStreamKeyResponse>;
export interface GetChannelRequest {
  arn: string;
}
export const GetChannelRequest = S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetChannel" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetChannelRequest",
}) as any as S.Schema<GetChannelRequest>;
export interface GetChannelResponse {
  channel?: Channel;
}
export const GetChannelResponse = S.suspend(() =>
  S.Struct({ channel: S.optional(Channel) }),
).annotate({
  identifier: "GetChannelResponse",
}) as any as S.Schema<GetChannelResponse>;
export interface GetPlaybackKeyPairRequest {
  arn: string;
}
export const GetPlaybackKeyPairRequest = S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetPlaybackKeyPair" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPlaybackKeyPairRequest",
}) as any as S.Schema<GetPlaybackKeyPairRequest>;
export interface PlaybackKeyPair {
  arn?: string;
  name?: string;
  fingerprint?: string;
  tags?: { [key: string]: string | undefined };
}
export const PlaybackKeyPair = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    fingerprint: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "PlaybackKeyPair",
}) as any as S.Schema<PlaybackKeyPair>;
export interface GetPlaybackKeyPairResponse {
  keyPair?: PlaybackKeyPair;
}
export const GetPlaybackKeyPairResponse = S.suspend(() =>
  S.Struct({ keyPair: S.optional(PlaybackKeyPair) }),
).annotate({
  identifier: "GetPlaybackKeyPairResponse",
}) as any as S.Schema<GetPlaybackKeyPairResponse>;
export interface GetPlaybackRestrictionPolicyRequest {
  arn: string;
}
export const GetPlaybackRestrictionPolicyRequest = S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetPlaybackRestrictionPolicy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPlaybackRestrictionPolicyRequest",
}) as any as S.Schema<GetPlaybackRestrictionPolicyRequest>;
export interface GetPlaybackRestrictionPolicyResponse {
  playbackRestrictionPolicy?: PlaybackRestrictionPolicy;
}
export const GetPlaybackRestrictionPolicyResponse = S.suspend(() =>
  S.Struct({
    playbackRestrictionPolicy: S.optional(PlaybackRestrictionPolicy),
  }),
).annotate({
  identifier: "GetPlaybackRestrictionPolicyResponse",
}) as any as S.Schema<GetPlaybackRestrictionPolicyResponse>;
export interface GetRecordingConfigurationRequest {
  arn: string;
}
export const GetRecordingConfigurationRequest = S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetRecordingConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRecordingConfigurationRequest",
}) as any as S.Schema<GetRecordingConfigurationRequest>;
export interface GetRecordingConfigurationResponse {
  recordingConfiguration?: RecordingConfiguration;
}
export const GetRecordingConfigurationResponse = S.suspend(() =>
  S.Struct({ recordingConfiguration: S.optional(RecordingConfiguration) }),
).annotate({
  identifier: "GetRecordingConfigurationResponse",
}) as any as S.Schema<GetRecordingConfigurationResponse>;
export interface GetStreamRequest {
  channelArn: string;
}
export const GetStreamRequest = S.suspend(() =>
  S.Struct({ channelArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetStream" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetStreamRequest",
}) as any as S.Schema<GetStreamRequest>;
export interface Stream {
  channelArn?: string;
  streamId?: string;
  playbackUrl?: string;
  startTime?: Date;
  state?: string;
  health?: string;
  viewerCount?: number;
}
export const Stream = S.suspend(() =>
  S.Struct({
    channelArn: S.optional(S.String),
    streamId: S.optional(S.String),
    playbackUrl: S.optional(S.String),
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    state: S.optional(S.String),
    health: S.optional(S.String),
    viewerCount: S.optional(S.Number),
  }),
).annotate({ identifier: "Stream" }) as any as S.Schema<Stream>;
export interface GetStreamResponse {
  stream?: Stream;
}
export const GetStreamResponse = S.suspend(() =>
  S.Struct({ stream: S.optional(Stream) }),
).annotate({
  identifier: "GetStreamResponse",
}) as any as S.Schema<GetStreamResponse>;
export interface GetStreamKeyRequest {
  arn: string;
}
export const GetStreamKeyRequest = S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetStreamKey" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetStreamKeyRequest",
}) as any as S.Schema<GetStreamKeyRequest>;
export interface GetStreamKeyResponse {
  streamKey?: StreamKey;
}
export const GetStreamKeyResponse = S.suspend(() =>
  S.Struct({ streamKey: S.optional(StreamKey) }),
).annotate({
  identifier: "GetStreamKeyResponse",
}) as any as S.Schema<GetStreamKeyResponse>;
export interface GetStreamSessionRequest {
  channelArn: string;
  streamId?: string;
}
export const GetStreamSessionRequest = S.suspend(() =>
  S.Struct({ channelArn: S.String, streamId: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetStreamSession" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetStreamSessionRequest",
}) as any as S.Schema<GetStreamSessionRequest>;
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
export const VideoConfiguration = S.suspend(() =>
  S.Struct({
    avcProfile: S.optional(S.String),
    avcLevel: S.optional(S.String),
    codec: S.optional(S.String),
    encoder: S.optional(S.String),
    targetBitrate: S.optional(S.Number),
    targetFramerate: S.optional(S.Number),
    videoHeight: S.optional(S.Number),
    videoWidth: S.optional(S.Number),
    level: S.optional(S.String),
    track: S.optional(S.String),
    profile: S.optional(S.String),
  }),
).annotate({
  identifier: "VideoConfiguration",
}) as any as S.Schema<VideoConfiguration>;
export interface AudioConfiguration {
  codec?: string;
  targetBitrate?: number;
  sampleRate?: number;
  channels?: number;
  track?: string;
}
export const AudioConfiguration = S.suspend(() =>
  S.Struct({
    codec: S.optional(S.String),
    targetBitrate: S.optional(S.Number),
    sampleRate: S.optional(S.Number),
    channels: S.optional(S.Number),
    track: S.optional(S.String),
  }),
).annotate({
  identifier: "AudioConfiguration",
}) as any as S.Schema<AudioConfiguration>;
export interface IngestConfiguration {
  video?: VideoConfiguration;
  audio?: AudioConfiguration;
}
export const IngestConfiguration = S.suspend(() =>
  S.Struct({
    video: S.optional(VideoConfiguration),
    audio: S.optional(AudioConfiguration),
  }),
).annotate({
  identifier: "IngestConfiguration",
}) as any as S.Schema<IngestConfiguration>;
export type VideoConfigurationList = VideoConfiguration[];
export const VideoConfigurationList = S.Array(VideoConfiguration);
export type AudioConfigurationList = AudioConfiguration[];
export const AudioConfigurationList = S.Array(AudioConfiguration);
export interface IngestConfigurations {
  videoConfigurations: VideoConfiguration[];
  audioConfigurations: AudioConfiguration[];
}
export const IngestConfigurations = S.suspend(() =>
  S.Struct({
    videoConfigurations: VideoConfigurationList,
    audioConfigurations: AudioConfigurationList,
  }),
).annotate({
  identifier: "IngestConfigurations",
}) as any as S.Schema<IngestConfigurations>;
export interface StreamEvent {
  name?: string;
  type?: string;
  eventTime?: Date;
  code?: string;
}
export const StreamEvent = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    type: S.optional(S.String),
    eventTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    code: S.optional(S.String),
  }),
).annotate({ identifier: "StreamEvent" }) as any as S.Schema<StreamEvent>;
export type StreamEvents = StreamEvent[];
export const StreamEvents = S.Array(StreamEvent);
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
export const StreamSession = S.suspend(() =>
  S.Struct({
    streamId: S.optional(S.String),
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    channel: S.optional(Channel),
    ingestConfiguration: S.optional(IngestConfiguration),
    ingestConfigurations: S.optional(IngestConfigurations),
    recordingConfiguration: S.optional(RecordingConfiguration),
    truncatedEvents: S.optional(StreamEvents),
  }),
).annotate({ identifier: "StreamSession" }) as any as S.Schema<StreamSession>;
export interface GetStreamSessionResponse {
  streamSession?: StreamSession;
}
export const GetStreamSessionResponse = S.suspend(() =>
  S.Struct({ streamSession: S.optional(StreamSession) }),
).annotate({
  identifier: "GetStreamSessionResponse",
}) as any as S.Schema<GetStreamSessionResponse>;
export interface ImportPlaybackKeyPairRequest {
  publicKeyMaterial: string;
  name?: string;
  tags?: { [key: string]: string | undefined };
}
export const ImportPlaybackKeyPairRequest = S.suspend(() =>
  S.Struct({
    publicKeyMaterial: S.String,
    name: S.optional(S.String),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ImportPlaybackKeyPair" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ImportPlaybackKeyPairRequest",
}) as any as S.Schema<ImportPlaybackKeyPairRequest>;
export interface ImportPlaybackKeyPairResponse {
  keyPair?: PlaybackKeyPair;
}
export const ImportPlaybackKeyPairResponse = S.suspend(() =>
  S.Struct({ keyPair: S.optional(PlaybackKeyPair) }),
).annotate({
  identifier: "ImportPlaybackKeyPairResponse",
}) as any as S.Schema<ImportPlaybackKeyPairResponse>;
export interface ListChannelsRequest {
  filterByName?: string;
  filterByRecordingConfigurationArn?: string;
  filterByPlaybackRestrictionPolicyArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListChannelsRequest = S.suspend(() =>
  S.Struct({
    filterByName: S.optional(S.String),
    filterByRecordingConfigurationArn: S.optional(S.String),
    filterByPlaybackRestrictionPolicyArn: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListChannels" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListChannelsRequest",
}) as any as S.Schema<ListChannelsRequest>;
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
}
export const ChannelSummary = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    latencyMode: S.optional(S.String),
    authorized: S.optional(S.Boolean),
    recordingConfigurationArn: S.optional(S.String),
    tags: S.optional(Tags),
    insecureIngest: S.optional(S.Boolean),
    type: S.optional(ChannelType),
    preset: S.optional(TranscodePreset),
    playbackRestrictionPolicyArn: S.optional(S.String),
  }),
).annotate({ identifier: "ChannelSummary" }) as any as S.Schema<ChannelSummary>;
export type ChannelList = ChannelSummary[];
export const ChannelList = S.Array(ChannelSummary);
export interface ListChannelsResponse {
  channels: ChannelSummary[];
  nextToken?: string;
}
export const ListChannelsResponse = S.suspend(() =>
  S.Struct({ channels: ChannelList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListChannelsResponse",
}) as any as S.Schema<ListChannelsResponse>;
export interface ListPlaybackKeyPairsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListPlaybackKeyPairsRequest = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListPlaybackKeyPairs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPlaybackKeyPairsRequest",
}) as any as S.Schema<ListPlaybackKeyPairsRequest>;
export interface PlaybackKeyPairSummary {
  arn?: string;
  name?: string;
  tags?: { [key: string]: string | undefined };
}
export const PlaybackKeyPairSummary = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "PlaybackKeyPairSummary",
}) as any as S.Schema<PlaybackKeyPairSummary>;
export type PlaybackKeyPairList = PlaybackKeyPairSummary[];
export const PlaybackKeyPairList = S.Array(PlaybackKeyPairSummary);
export interface ListPlaybackKeyPairsResponse {
  keyPairs: PlaybackKeyPairSummary[];
  nextToken?: string;
}
export const ListPlaybackKeyPairsResponse = S.suspend(() =>
  S.Struct({ keyPairs: PlaybackKeyPairList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListPlaybackKeyPairsResponse",
}) as any as S.Schema<ListPlaybackKeyPairsResponse>;
export interface ListPlaybackRestrictionPoliciesRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListPlaybackRestrictionPoliciesRequest = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListPlaybackRestrictionPolicies" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPlaybackRestrictionPoliciesRequest",
}) as any as S.Schema<ListPlaybackRestrictionPoliciesRequest>;
export interface PlaybackRestrictionPolicySummary {
  arn: string;
  allowedCountries: string[];
  allowedOrigins: string[];
  enableStrictOriginEnforcement?: boolean;
  name?: string;
  tags?: { [key: string]: string | undefined };
}
export const PlaybackRestrictionPolicySummary = S.suspend(() =>
  S.Struct({
    arn: S.String,
    allowedCountries: PlaybackRestrictionPolicyAllowedCountryList,
    allowedOrigins: PlaybackRestrictionPolicyAllowedOriginList,
    enableStrictOriginEnforcement: S.optional(S.Boolean),
    name: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "PlaybackRestrictionPolicySummary",
}) as any as S.Schema<PlaybackRestrictionPolicySummary>;
export type PlaybackRestrictionPolicyList = PlaybackRestrictionPolicySummary[];
export const PlaybackRestrictionPolicyList = S.Array(
  PlaybackRestrictionPolicySummary,
);
export interface ListPlaybackRestrictionPoliciesResponse {
  playbackRestrictionPolicies: PlaybackRestrictionPolicySummary[];
  nextToken?: string;
}
export const ListPlaybackRestrictionPoliciesResponse = S.suspend(() =>
  S.Struct({
    playbackRestrictionPolicies: PlaybackRestrictionPolicyList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPlaybackRestrictionPoliciesResponse",
}) as any as S.Schema<ListPlaybackRestrictionPoliciesResponse>;
export interface ListRecordingConfigurationsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListRecordingConfigurationsRequest = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListRecordingConfigurations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRecordingConfigurationsRequest",
}) as any as S.Schema<ListRecordingConfigurationsRequest>;
export interface RecordingConfigurationSummary {
  arn: string;
  name?: string;
  destinationConfiguration: DestinationConfiguration;
  state: string;
  tags?: { [key: string]: string | undefined };
}
export const RecordingConfigurationSummary = S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.optional(S.String),
    destinationConfiguration: DestinationConfiguration,
    state: S.String,
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "RecordingConfigurationSummary",
}) as any as S.Schema<RecordingConfigurationSummary>;
export type RecordingConfigurationList = RecordingConfigurationSummary[];
export const RecordingConfigurationList = S.Array(
  RecordingConfigurationSummary,
);
export interface ListRecordingConfigurationsResponse {
  recordingConfigurations: RecordingConfigurationSummary[];
  nextToken?: string;
}
export const ListRecordingConfigurationsResponse = S.suspend(() =>
  S.Struct({
    recordingConfigurations: RecordingConfigurationList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRecordingConfigurationsResponse",
}) as any as S.Schema<ListRecordingConfigurationsResponse>;
export interface ListStreamKeysRequest {
  channelArn: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListStreamKeysRequest = S.suspend(() =>
  S.Struct({
    channelArn: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListStreamKeys" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListStreamKeysRequest",
}) as any as S.Schema<ListStreamKeysRequest>;
export interface StreamKeySummary {
  arn?: string;
  channelArn?: string;
  tags?: { [key: string]: string | undefined };
}
export const StreamKeySummary = S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    channelArn: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "StreamKeySummary",
}) as any as S.Schema<StreamKeySummary>;
export type StreamKeyList = StreamKeySummary[];
export const StreamKeyList = S.Array(StreamKeySummary);
export interface ListStreamKeysResponse {
  streamKeys: StreamKeySummary[];
  nextToken?: string;
}
export const ListStreamKeysResponse = S.suspend(() =>
  S.Struct({ streamKeys: StreamKeyList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListStreamKeysResponse",
}) as any as S.Schema<ListStreamKeysResponse>;
export interface StreamFilters {
  health?: string;
}
export const StreamFilters = S.suspend(() =>
  S.Struct({ health: S.optional(S.String) }),
).annotate({ identifier: "StreamFilters" }) as any as S.Schema<StreamFilters>;
export interface ListStreamsRequest {
  filterBy?: StreamFilters;
  nextToken?: string;
  maxResults?: number;
}
export const ListStreamsRequest = S.suspend(() =>
  S.Struct({
    filterBy: S.optional(StreamFilters),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListStreams" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListStreamsRequest",
}) as any as S.Schema<ListStreamsRequest>;
export interface StreamSummary {
  channelArn?: string;
  streamId?: string;
  state?: string;
  health?: string;
  viewerCount?: number;
  startTime?: Date;
}
export const StreamSummary = S.suspend(() =>
  S.Struct({
    channelArn: S.optional(S.String),
    streamId: S.optional(S.String),
    state: S.optional(S.String),
    health: S.optional(S.String),
    viewerCount: S.optional(S.Number),
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "StreamSummary" }) as any as S.Schema<StreamSummary>;
export type StreamList = StreamSummary[];
export const StreamList = S.Array(StreamSummary);
export interface ListStreamsResponse {
  streams: StreamSummary[];
  nextToken?: string;
}
export const ListStreamsResponse = S.suspend(() =>
  S.Struct({ streams: StreamList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListStreamsResponse",
}) as any as S.Schema<ListStreamsResponse>;
export interface ListStreamSessionsRequest {
  channelArn: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListStreamSessionsRequest = S.suspend(() =>
  S.Struct({
    channelArn: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListStreamSessions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListStreamSessionsRequest",
}) as any as S.Schema<ListStreamSessionsRequest>;
export interface StreamSessionSummary {
  streamId?: string;
  startTime?: Date;
  endTime?: Date;
  hasErrorEvent?: boolean;
}
export const StreamSessionSummary = S.suspend(() =>
  S.Struct({
    streamId: S.optional(S.String),
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    hasErrorEvent: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "StreamSessionSummary",
}) as any as S.Schema<StreamSessionSummary>;
export type StreamSessionList = StreamSessionSummary[];
export const StreamSessionList = S.Array(StreamSessionSummary);
export interface ListStreamSessionsResponse {
  streamSessions: StreamSessionSummary[];
  nextToken?: string;
}
export const ListStreamSessionsResponse = S.suspend(() =>
  S.Struct({
    streamSessions: StreamSessionList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListStreamSessionsResponse",
}) as any as S.Schema<ListStreamSessionsResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
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
  tags: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ tags: Tags }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface PutMetadataRequest {
  channelArn: string;
  metadata: string | redacted.Redacted<string>;
}
export const PutMetadataRequest = S.suspend(() =>
  S.Struct({ channelArn: S.String, metadata: SensitiveString }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/PutMetadata" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutMetadataRequest",
}) as any as S.Schema<PutMetadataRequest>;
export interface PutMetadataResponse {}
export const PutMetadataResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "PutMetadataResponse",
}) as any as S.Schema<PutMetadataResponse>;
export interface StartViewerSessionRevocationRequest {
  channelArn: string;
  viewerId: string;
  viewerSessionVersionsLessThanOrEqualTo?: number;
}
export const StartViewerSessionRevocationRequest = S.suspend(() =>
  S.Struct({
    channelArn: S.String,
    viewerId: S.String,
    viewerSessionVersionsLessThanOrEqualTo: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StartViewerSessionRevocation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartViewerSessionRevocationRequest",
}) as any as S.Schema<StartViewerSessionRevocationRequest>;
export interface StartViewerSessionRevocationResponse {}
export const StartViewerSessionRevocationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StartViewerSessionRevocationResponse",
}) as any as S.Schema<StartViewerSessionRevocationResponse>;
export interface StopStreamRequest {
  channelArn: string;
}
export const StopStreamRequest = S.suspend(() =>
  S.Struct({ channelArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StopStream" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopStreamRequest",
}) as any as S.Schema<StopStreamRequest>;
export interface StopStreamResponse {}
export const StopStreamResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "StopStreamResponse",
}) as any as S.Schema<StopStreamResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: Tags,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
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
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
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
}
export const UpdateChannelRequest = S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.optional(S.String),
    latencyMode: S.optional(S.String),
    type: S.optional(ChannelType),
    authorized: S.optional(S.Boolean),
    recordingConfigurationArn: S.optional(S.String),
    insecureIngest: S.optional(S.Boolean),
    preset: S.optional(TranscodePreset),
    playbackRestrictionPolicyArn: S.optional(S.String),
    multitrackInputConfiguration: S.optional(MultitrackInputConfiguration),
    containerFormat: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateChannel" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateChannelRequest",
}) as any as S.Schema<UpdateChannelRequest>;
export interface UpdateChannelResponse {
  channel?: Channel;
}
export const UpdateChannelResponse = S.suspend(() =>
  S.Struct({ channel: S.optional(Channel) }),
).annotate({
  identifier: "UpdateChannelResponse",
}) as any as S.Schema<UpdateChannelResponse>;
export interface UpdatePlaybackRestrictionPolicyRequest {
  arn: string;
  allowedCountries?: string[];
  allowedOrigins?: string[];
  enableStrictOriginEnforcement?: boolean;
  name?: string;
}
export const UpdatePlaybackRestrictionPolicyRequest = S.suspend(() =>
  S.Struct({
    arn: S.String,
    allowedCountries: S.optional(PlaybackRestrictionPolicyAllowedCountryList),
    allowedOrigins: S.optional(PlaybackRestrictionPolicyAllowedOriginList),
    enableStrictOriginEnforcement: S.optional(S.Boolean),
    name: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdatePlaybackRestrictionPolicy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePlaybackRestrictionPolicyRequest",
}) as any as S.Schema<UpdatePlaybackRestrictionPolicyRequest>;
export interface UpdatePlaybackRestrictionPolicyResponse {
  playbackRestrictionPolicy?: PlaybackRestrictionPolicy;
}
export const UpdatePlaybackRestrictionPolicyResponse = S.suspend(() =>
  S.Struct({
    playbackRestrictionPolicy: S.optional(PlaybackRestrictionPolicy),
  }),
).annotate({
  identifier: "UpdatePlaybackRestrictionPolicyResponse",
}) as any as S.Schema<UpdatePlaybackRestrictionPolicyResponse>;

//# Errors
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { exceptionMessage: S.optional(S.String) },
).pipe(C.withAuthError) {}
export class PendingVerification extends S.TaggedErrorClass<PendingVerification>()(
  "PendingVerification",
  { exceptionMessage: S.optional(S.String) },
).pipe(C.withAuthError) {}
export class ThrottlingException extends S.TaggedErrorClass<ThrottlingException>()(
  "ThrottlingException",
  { exceptionMessage: S.optional(S.String) },
).pipe(C.withThrottlingError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  { exceptionMessage: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { exceptionMessage: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException extends S.TaggedErrorClass<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  { exceptionMessage: S.optional(S.String) },
).pipe(C.withQuotaError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { exceptionMessage: S.optional(S.String) },
).pipe(C.withConflictError) {}
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  { exceptionMessage: S.optional(S.String) },
).pipe(C.withServerError) {}
export class ChannelNotBroadcasting extends S.TaggedErrorClass<ChannelNotBroadcasting>()(
  "ChannelNotBroadcasting",
  { exceptionMessage: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class StreamUnavailable extends S.TaggedErrorClass<StreamUnavailable>()(
  "StreamUnavailable",
  { exceptionMessage: S.optional(S.String) },
).pipe(C.withServerError) {}

//# Operations
export type BatchGetChannelError = CommonErrors;
/**
 * Performs GetChannel on multiple ARNs simultaneously.
 */
export const batchGetChannel: API.OperationMethod<
  BatchGetChannelRequest,
  BatchGetChannelResponse,
  BatchGetChannelError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchGetChannelRequest,
  output: BatchGetChannelResponse,
  errors: [],
}));
export type BatchGetStreamKeyError = CommonErrors;
/**
 * Performs GetStreamKey on multiple ARNs simultaneously.
 */
export const batchGetStreamKey: API.OperationMethod<
  BatchGetStreamKeyRequest,
  BatchGetStreamKeyResponse,
  BatchGetStreamKeyError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchGetStreamKeyRequest,
  output: BatchGetStreamKeyResponse,
  errors: [],
}));
export type BatchStartViewerSessionRevocationError =
  | AccessDeniedException
  | PendingVerification
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Performs StartViewerSessionRevocation on multiple channel ARN and viewer
 * ID pairs simultaneously.
 */
export const batchStartViewerSessionRevocation: API.OperationMethod<
  BatchStartViewerSessionRevocationRequest,
  BatchStartViewerSessionRevocationResponse,
  BatchStartViewerSessionRevocationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: BatchStartViewerSessionRevocationRequest,
  output: BatchStartViewerSessionRevocationResponse,
  errors: [
    AccessDeniedException,
    PendingVerification,
    ThrottlingException,
    ValidationException,
  ],
}));
export type CreateChannelError =
  | AccessDeniedException
  | PendingVerification
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new channel and an associated stream key to start streaming.
 */
export const createChannel: API.OperationMethod<
  CreateChannelRequest,
  CreateChannelResponse,
  CreateChannelError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateChannelRequest,
  output: CreateChannelResponse,
  errors: [
    AccessDeniedException,
    PendingVerification,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
}));
export type CreatePlaybackRestrictionPolicyError =
  | AccessDeniedException
  | PendingVerification
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new playback restriction policy, for constraining playback by countries and/or
 * origins.
 */
export const createPlaybackRestrictionPolicy: API.OperationMethod<
  CreatePlaybackRestrictionPolicyRequest,
  CreatePlaybackRestrictionPolicyResponse,
  CreatePlaybackRestrictionPolicyError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreatePlaybackRestrictionPolicyRequest,
  output: CreatePlaybackRestrictionPolicyResponse,
  errors: [
    AccessDeniedException,
    PendingVerification,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type CreateRecordingConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | PendingVerification
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new recording configuration, used to enable recording to Amazon S3.
 *
 * **Known issue:** In the us-east-1 region, if you use the
 * Amazon Web Services CLI to create a recording configuration, it returns success even if the
 * S3 bucket is in a different region. In this case, the `state` of the recording
 * configuration is `CREATE_FAILED` (instead of `ACTIVE`). (In other
 * regions, the CLI correctly returns failure if the bucket is in a different region.)
 *
 * **Workaround:** Ensure that your S3 bucket is in the same
 * region as the recording configuration. If you create a recording configuration in a different
 * region as your S3 bucket, delete that recording configuration and create a new one with an S3
 * bucket from the correct region.
 */
export const createRecordingConfiguration: API.OperationMethod<
  CreateRecordingConfigurationRequest,
  CreateRecordingConfigurationResponse,
  CreateRecordingConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateRecordingConfigurationRequest,
  output: CreateRecordingConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    PendingVerification,
    ServiceQuotaExceededException,
    ValidationException,
  ],
}));
export type CreateStreamKeyError =
  | AccessDeniedException
  | PendingVerification
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a stream key, used to initiate a stream, for the specified channel ARN.
 *
 * Note that CreateChannel creates a stream key. If you subsequently use
 * CreateStreamKey on the same channel, it will fail because a stream key already exists and
 * there is a limit of 1 stream key per channel. To reset the stream key on a channel, use DeleteStreamKey and then CreateStreamKey.
 */
export const createStreamKey: API.OperationMethod<
  CreateStreamKeyRequest,
  CreateStreamKeyResponse,
  CreateStreamKeyError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateStreamKeyRequest,
  output: CreateStreamKeyResponse,
  errors: [
    AccessDeniedException,
    PendingVerification,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
}));
export type DeleteChannelError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified channel and its associated stream keys.
 *
 * If you try to delete a live channel, you will get an error (409 ConflictException). To
 * delete a channel that is live, call StopStream, wait for the Amazon
 * EventBridge "Stream End" event (to verify that the stream's state is no longer Live), then
 * call DeleteChannel. (See Using EventBridge with Amazon IVS.)
 */
export const deleteChannel: API.OperationMethod<
  DeleteChannelRequest,
  DeleteChannelResponse,
  DeleteChannelError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteChannelRequest,
  output: DeleteChannelResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type DeletePlaybackKeyPairError =
  | AccessDeniedException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specified authorization key pair. This invalidates future viewer tokens
 * generated using the key pair’s `privateKey`. For more information, see Setting Up Private
 * Channels in the *Amazon IVS User Guide*.
 */
export const deletePlaybackKeyPair: API.OperationMethod<
  DeletePlaybackKeyPairRequest,
  DeletePlaybackKeyPairResponse,
  DeletePlaybackKeyPairError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeletePlaybackKeyPairRequest,
  output: DeletePlaybackKeyPairResponse,
  errors: [
    AccessDeniedException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type DeletePlaybackRestrictionPolicyError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified playback restriction policy.
 */
export const deletePlaybackRestrictionPolicy: API.OperationMethod<
  DeletePlaybackRestrictionPolicyRequest,
  DeletePlaybackRestrictionPolicyResponse,
  DeletePlaybackRestrictionPolicyError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeletePlaybackRestrictionPolicyRequest,
  output: DeletePlaybackRestrictionPolicyResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type DeleteRecordingConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the recording configuration for the specified ARN.
 *
 * If you try to delete a recording configuration that is associated with a channel, you will
 * get an error (409 ConflictException). To avoid this, for all channels that reference the
 * recording configuration, first use UpdateChannel to set the
 * `recordingConfigurationArn` field to an empty string, then use
 * DeleteRecordingConfiguration.
 */
export const deleteRecordingConfiguration: API.OperationMethod<
  DeleteRecordingConfigurationRequest,
  DeleteRecordingConfigurationResponse,
  DeleteRecordingConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteRecordingConfigurationRequest,
  output: DeleteRecordingConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type DeleteStreamKeyError =
  | AccessDeniedException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the stream key for the specified ARN, so it can no longer be used to
 * stream.
 */
export const deleteStreamKey: API.OperationMethod<
  DeleteStreamKeyRequest,
  DeleteStreamKeyResponse,
  DeleteStreamKeyError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteStreamKeyRequest,
  output: DeleteStreamKeyResponse,
  errors: [
    AccessDeniedException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type GetChannelError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets the channel configuration for the specified channel ARN. See also BatchGetChannel.
 */
export const getChannel: API.OperationMethod<
  GetChannelRequest,
  GetChannelResponse,
  GetChannelError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetChannelRequest,
  output: GetChannelResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type GetPlaybackKeyPairError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets a specified playback authorization key pair and returns the `arn` and
 * `fingerprint`. The `privateKey` held by the caller can be used to
 * generate viewer authorization tokens, to grant viewers access to private channels. For more
 * information, see Setting Up Private Channels in the Amazon IVS User
 * Guide.
 */
export const getPlaybackKeyPair: API.OperationMethod<
  GetPlaybackKeyPairRequest,
  GetPlaybackKeyPairResponse,
  GetPlaybackKeyPairError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPlaybackKeyPairRequest,
  output: GetPlaybackKeyPairResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type GetPlaybackRestrictionPolicyError =
  | AccessDeniedException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets the specified playback restriction policy.
 */
export const getPlaybackRestrictionPolicy: API.OperationMethod<
  GetPlaybackRestrictionPolicyRequest,
  GetPlaybackRestrictionPolicyResponse,
  GetPlaybackRestrictionPolicyError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPlaybackRestrictionPolicyRequest,
  output: GetPlaybackRestrictionPolicyResponse,
  errors: [
    AccessDeniedException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type GetRecordingConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets the recording configuration for the specified ARN.
 */
export const getRecordingConfiguration: API.OperationMethod<
  GetRecordingConfigurationRequest,
  GetRecordingConfigurationResponse,
  GetRecordingConfigurationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetRecordingConfigurationRequest,
  output: GetRecordingConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type GetStreamError =
  | AccessDeniedException
  | ChannelNotBroadcasting
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the active (live) stream on a specified channel.
 */
export const getStream: API.OperationMethod<
  GetStreamRequest,
  GetStreamResponse,
  GetStreamError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetStreamRequest,
  output: GetStreamResponse,
  errors: [
    AccessDeniedException,
    ChannelNotBroadcasting,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type GetStreamKeyError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets stream-key information for a specified ARN.
 */
export const getStreamKey: API.OperationMethod<
  GetStreamKeyRequest,
  GetStreamKeyResponse,
  GetStreamKeyError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetStreamKeyRequest,
  output: GetStreamKeyResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type GetStreamSessionError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets metadata on a specified stream.
 */
export const getStreamSession: API.OperationMethod<
  GetStreamSessionRequest,
  GetStreamSessionResponse,
  GetStreamSessionError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetStreamSessionRequest,
  output: GetStreamSessionResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type ImportPlaybackKeyPairError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Imports the public portion of a new key pair and returns its `arn` and
 * `fingerprint`. The `privateKey` can then be used to generate viewer
 * authorization tokens, to grant viewers access to private channels. For more information, see
 * Setting Up
 * Private Channels in the *Amazon IVS User Guide*.
 */
export const importPlaybackKeyPair: API.OperationMethod<
  ImportPlaybackKeyPairRequest,
  ImportPlaybackKeyPairResponse,
  ImportPlaybackKeyPairError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ImportPlaybackKeyPairRequest,
  output: ImportPlaybackKeyPairResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    PendingVerification,
    ServiceQuotaExceededException,
    ValidationException,
  ],
}));
export type ListChannelsError =
  | AccessDeniedException
  | ConflictException
  | ValidationException
  | CommonErrors;
/**
 * Gets summary information about all channels in your account, in the Amazon Web Services
 * region where the API request is processed. This list can be filtered to match a specified name
 * or recording-configuration ARN. Filters are mutually exclusive and cannot be used together. If
 * you try to use both filters, you will get an error (409 ConflictException).
 */
export const listChannels: API.OperationMethod<
  ListChannelsRequest,
  ListChannelsResponse,
  ListChannelsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListChannelsRequest,
  ) => stream.Stream<
    ListChannelsResponse,
    ListChannelsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListChannelsRequest,
  ) => stream.Stream<
    unknown,
    ListChannelsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListChannelsRequest,
  output: ListChannelsResponse,
  errors: [AccessDeniedException, ConflictException, ValidationException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
export type ListPlaybackKeyPairsError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Gets summary information about playback key pairs. For more information, see Setting Up Private
 * Channels in the *Amazon IVS User Guide*.
 */
export const listPlaybackKeyPairs: API.OperationMethod<
  ListPlaybackKeyPairsRequest,
  ListPlaybackKeyPairsResponse,
  ListPlaybackKeyPairsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListPlaybackKeyPairsRequest,
  ) => stream.Stream<
    ListPlaybackKeyPairsResponse,
    ListPlaybackKeyPairsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListPlaybackKeyPairsRequest,
  ) => stream.Stream<
    unknown,
    ListPlaybackKeyPairsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPlaybackKeyPairsRequest,
  output: ListPlaybackKeyPairsResponse,
  errors: [AccessDeniedException, ValidationException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
export type ListPlaybackRestrictionPoliciesError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ValidationException
  | CommonErrors;
/**
 * Gets summary information about playback restriction policies.
 */
export const listPlaybackRestrictionPolicies: API.OperationMethod<
  ListPlaybackRestrictionPoliciesRequest,
  ListPlaybackRestrictionPoliciesResponse,
  ListPlaybackRestrictionPoliciesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListPlaybackRestrictionPoliciesRequest,
  ) => stream.Stream<
    ListPlaybackRestrictionPoliciesResponse,
    ListPlaybackRestrictionPoliciesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListPlaybackRestrictionPoliciesRequest,
  ) => stream.Stream<
    unknown,
    ListPlaybackRestrictionPoliciesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPlaybackRestrictionPoliciesRequest,
  output: ListPlaybackRestrictionPoliciesResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    PendingVerification,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
export type ListRecordingConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Gets summary information about all recording configurations in your account, in the
 * Amazon Web Services region where the API request is processed.
 */
export const listRecordingConfigurations: API.OperationMethod<
  ListRecordingConfigurationsRequest,
  ListRecordingConfigurationsResponse,
  ListRecordingConfigurationsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListRecordingConfigurationsRequest,
  ) => stream.Stream<
    ListRecordingConfigurationsResponse,
    ListRecordingConfigurationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListRecordingConfigurationsRequest,
  ) => stream.Stream<
    unknown,
    ListRecordingConfigurationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRecordingConfigurationsRequest,
  output: ListRecordingConfigurationsResponse,
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
export type ListStreamKeysError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets summary information about stream keys for the specified channel.
 */
export const listStreamKeys: API.OperationMethod<
  ListStreamKeysRequest,
  ListStreamKeysResponse,
  ListStreamKeysError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListStreamKeysRequest,
  ) => stream.Stream<
    ListStreamKeysResponse,
    ListStreamKeysError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListStreamKeysRequest,
  ) => stream.Stream<
    unknown,
    ListStreamKeysError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListStreamKeysRequest,
  output: ListStreamKeysResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
export type ListStreamsError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Gets summary information about live streams in your account, in the Amazon Web Services
 * region where the API request is processed.
 */
export const listStreams: API.OperationMethod<
  ListStreamsRequest,
  ListStreamsResponse,
  ListStreamsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListStreamsRequest,
  ) => stream.Stream<
    ListStreamsResponse,
    ListStreamsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListStreamsRequest,
  ) => stream.Stream<
    unknown,
    ListStreamsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListStreamsRequest,
  output: ListStreamsResponse,
  errors: [AccessDeniedException, ValidationException],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
export type ListStreamSessionsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets a summary of current and previous streams for a specified channel in your account, in
 * the AWS region where the API request is processed.
 */
export const listStreamSessions: API.OperationMethod<
  ListStreamSessionsRequest,
  ListStreamSessionsResponse,
  ListStreamSessionsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListStreamSessionsRequest,
  ) => stream.Stream<
    ListStreamSessionsResponse,
    ListStreamSessionsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListStreamSessionsRequest,
  ) => stream.Stream<
    unknown,
    ListStreamSessionsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListStreamSessionsRequest,
  output: ListStreamSessionsResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
}));
export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about Amazon Web Services tags for the specified ARN.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type PutMetadataError =
  | AccessDeniedException
  | ChannelNotBroadcasting
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Inserts metadata into the active stream of the specified channel. At most 5 requests per
 * second per channel are allowed, each with a maximum 1 KB payload. (If 5 TPS is not sufficient
 * for your needs, we recommend batching your data into a single PutMetadata call.) At most 155
 * requests per second per account are allowed. Also see Embedding Metadata within a Video Stream in
 * the *Amazon IVS User Guide*.
 */
export const putMetadata: API.OperationMethod<
  PutMetadataRequest,
  PutMetadataResponse,
  PutMetadataError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutMetadataRequest,
  output: PutMetadataResponse,
  errors: [
    AccessDeniedException,
    ChannelNotBroadcasting,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type StartViewerSessionRevocationError =
  | AccessDeniedException
  | InternalServerException
  | PendingVerification
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts the process of revoking the viewer session associated with a specified channel ARN
 * and viewer ID. Optionally, you can provide a version to revoke viewer sessions less than and
 * including that version. For instructions on associating a viewer ID with a viewer session, see
 * Setting Up
 * Private Channels.
 */
export const startViewerSessionRevocation: API.OperationMethod<
  StartViewerSessionRevocationRequest,
  StartViewerSessionRevocationResponse,
  StartViewerSessionRevocationError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StartViewerSessionRevocationRequest,
  output: StartViewerSessionRevocationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    PendingVerification,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type StopStreamError =
  | AccessDeniedException
  | ChannelNotBroadcasting
  | ResourceNotFoundException
  | StreamUnavailable
  | ValidationException
  | CommonErrors;
/**
 * Disconnects the incoming RTMPS stream for the specified channel. Can be used in
 * conjunction with DeleteStreamKey to prevent further streaming to a
 * channel.
 *
 * Many streaming client-software libraries automatically reconnect a dropped RTMPS
 * session, so to stop the stream permanently, you may want to first revoke the
 * `streamKey` attached to the channel.
 */
export const stopStream: API.OperationMethod<
  StopStreamRequest,
  StopStreamResponse,
  StopStreamError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: StopStreamRequest,
  output: StopStreamResponse,
  errors: [
    AccessDeniedException,
    ChannelNotBroadcasting,
    ResourceNotFoundException,
    StreamUnavailable,
    ValidationException,
  ],
}));
export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds or updates tags for the Amazon Web Services resource with the specified ARN.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from the resource with the specified ARN.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
export type UpdateChannelError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a channel's configuration. Live channels cannot be updated. You must stop the
 * ongoing stream, update the channel, and restart the stream for the changes to take
 * effect.
 */
export const updateChannel: API.OperationMethod<
  UpdateChannelRequest,
  UpdateChannelResponse,
  UpdateChannelError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateChannelRequest,
  output: UpdateChannelResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePlaybackRestrictionPolicyRequest,
  output: UpdatePlaybackRestrictionPolicyResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
