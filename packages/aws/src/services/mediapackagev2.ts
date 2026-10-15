import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "MediaPackageV2",
  serviceShapeName: "mediapackagev2",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "mediapackagev2" });
const ver = /*@__PURE__*/ T.ServiceVersion("2022-12-25");
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
              `https://mediapackagev2-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://mediapackagev2-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://mediapackagev2.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://mediapackagev2.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://mediapackagev2.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ConflictExceptionType: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ConflictExceptionType" }),
      ),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceTypeNotFound: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ResourceTypeNotFound" }),
      ),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()("ValidationException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    ValidationExceptionType: /*@__PURE__*/ S.optional(
      /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ValidationExceptionType" }),
    ),
  }) {}
export type ResourceName = string;
export type EntityTag = string;
export interface CancelHarvestJobRequest {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  HarvestJobName: string;
  ETag?: string;
}
export interface CancelHarvestJobResponse {}
export type IdempotencyToken = string;
export type InputType = "HLS" | "CMAF" | "MULTIVIEW" | (string & {});
export type ResourceDescription = string;
export interface InputSwitchConfiguration {
  MQCSInputSwitching?: boolean;
  PreferredInput?: number;
}
export interface OutputHeaderConfiguration {
  PublishMQCS?: boolean;
}
export type MultiviewSourceList = string[];
export type MultiviewLayoutType =
  | "LAYOUT_2EH"
  | "LAYOUT_2PL"
  | "LAYOUT_3EL"
  | "LAYOUT_3PL"
  | "LAYOUT_4E"
  | "LAYOUT_4PL"
  | (string & {});
export type MultiviewLayoutList = MultiviewLayoutType[];
export interface MultiviewConfiguration {
  AvailableSources: string[];
  AvailableLayouts: MultiviewLayoutType[];
}
export type OutputLockingMode = "EPOCH_LOCKED" | "NON_EPOCH_LOCKED" | (string & {});
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateChannelRequest {
  ChannelGroupName: string;
  ChannelName: string;
  ClientToken?: string;
  InputType?: InputType;
  Description?: string;
  InputSwitchConfiguration?: InputSwitchConfiguration;
  OutputHeaderConfiguration?: OutputHeaderConfiguration;
  MultiviewConfiguration?: MultiviewConfiguration;
  OutputLockingMode?: OutputLockingMode;
  Tags?: { [key: string]: string | undefined };
}
export type AttachedMultiviewChannelList = string[];
export interface IngestEndpoint {
  Id?: string;
  Url?: string;
}
export type IngestEndpointList = IngestEndpoint[];
export interface CreateChannelResponse {
  MultiviewConfiguration?: MultiviewConfiguration;
  AttachedMultiviewChannels?: string[];
  Arn: string;
  ChannelName: string;
  ChannelGroupName: string;
  CreatedAt: Date;
  ModifiedAt: Date;
  Description?: string;
  IngestEndpoints?: IngestEndpoint[];
  InputType?: InputType;
  ETag?: string;
  Tags?: { [key: string]: string | undefined };
  InputSwitchConfiguration?: InputSwitchConfiguration;
  OutputHeaderConfiguration?: OutputHeaderConfiguration;
  OutputLockingMode?: OutputLockingMode;
}
export interface CreateChannelGroupRequest {
  ChannelGroupName: string;
  ClientToken?: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateChannelGroupResponse {
  ChannelGroupName: string;
  Arn: string;
  EgressDomain: string;
  CreatedAt: Date;
  ModifiedAt: Date;
  ETag?: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface HarvestedHlsManifest {
  ManifestName: string;
}
export type HarvestedHlsManifestsList = HarvestedHlsManifest[];
export interface HarvestedDashManifest {
  ManifestName: string;
}
export type HarvestedDashManifestsList = HarvestedDashManifest[];
export interface HarvestedLowLatencyHlsManifest {
  ManifestName: string;
}
export type HarvestedLowLatencyHlsManifestsList = HarvestedLowLatencyHlsManifest[];
export interface HarvestedManifests {
  HlsManifests?: HarvestedHlsManifest[];
  DashManifests?: HarvestedDashManifest[];
  LowLatencyHlsManifests?: HarvestedLowLatencyHlsManifest[];
}
export interface HarvesterScheduleConfiguration {
  StartTime: Date;
  EndTime: Date;
}
export type S3BucketName = string;
export type S3DestinationPath = string;
export interface S3DestinationConfig {
  BucketName: string;
  DestinationPath: string;
}
export interface Destination {
  S3Destination: S3DestinationConfig;
}
export interface CreateHarvestJobRequest {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  Description?: string;
  HarvestedManifests: HarvestedManifests;
  ScheduleConfiguration: HarvesterScheduleConfiguration;
  Destination: Destination;
  ClientToken?: string;
  HarvestJobName?: string;
  Tags?: { [key: string]: string | undefined };
}
export type HarvestJobStatus =
  | "QUEUED"
  | "IN_PROGRESS"
  | "CANCELLED"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export interface CreateHarvestJobResponse {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  Destination: Destination;
  HarvestJobName: string;
  HarvestedManifests: HarvestedManifests;
  Description?: string;
  ScheduleConfiguration: HarvesterScheduleConfiguration;
  Arn: string;
  CreatedAt: Date;
  ModifiedAt: Date;
  Status: HarvestJobStatus;
  ErrorMessage?: string;
  ETag?: string;
  Tags?: { [key: string]: string | undefined };
}
export type ContainerType = "TS" | "CMAF" | "ISM" | (string & {});
export type ScteFilter =
  | "SPLICE_INSERT"
  | "BREAK"
  | "PROVIDER_ADVERTISEMENT"
  | "DISTRIBUTOR_ADVERTISEMENT"
  | "PROVIDER_PLACEMENT_OPPORTUNITY"
  | "DISTRIBUTOR_PLACEMENT_OPPORTUNITY"
  | "PROVIDER_OVERLAY_PLACEMENT_OPPORTUNITY"
  | "DISTRIBUTOR_OVERLAY_PLACEMENT_OPPORTUNITY"
  | "PROGRAM"
  | "CHAPTER"
  | "UNSCHEDULED_EVENT"
  | "ALTERNATE_CONTENT_OPPORTUNITY"
  | "NETWORK"
  | "PROVIDER_PROMO"
  | "DISTRIBUTOR_PROMO"
  | "PROVIDER_AD_BLOCK"
  | "DISTRIBUTOR_AD_BLOCK"
  | "CONTENT_IDENTIFICATION"
  | "CALL_AD_SERVER"
  | (string & {});
export type ScteFilterList = ScteFilter[];
export type ScteInSegments = "NONE" | "ALL" | "MATCHES_FILTER" | (string & {});
export type CustomAdType =
  | "PROGRAM"
  | "CHAPTER"
  | "UNSCHEDULED_EVENT"
  | "ALTERNATE_CONTENT_OPPORTUNITY"
  | "NETWORK"
  | (string & {});
export type CustomAdTypeList = CustomAdType[];
export interface Scte {
  ScteFilter?: ScteFilter[];
  ScteInSegments?: ScteInSegments;
  CustomAdTypes?: CustomAdType[];
}
export type TsEncryptionMethod = "AES_128" | "SAMPLE_AES" | (string & {});
export type CmafEncryptionMethod = "CENC" | "CBCS" | (string & {});
export type IsmEncryptionMethod = "CENC" | (string & {});
export interface EncryptionMethod {
  TsEncryptionMethod?: TsEncryptionMethod;
  CmafEncryptionMethod?: CmafEncryptionMethod;
  IsmEncryptionMethod?: IsmEncryptionMethod;
}
export type PresetSpeke20Audio =
  | "PRESET_AUDIO_1"
  | "PRESET_AUDIO_2"
  | "PRESET_AUDIO_3"
  | "SHARED"
  | "UNENCRYPTED"
  | (string & {});
export type PresetSpeke20Video =
  | "PRESET_VIDEO_1"
  | "PRESET_VIDEO_2"
  | "PRESET_VIDEO_3"
  | "PRESET_VIDEO_4"
  | "PRESET_VIDEO_5"
  | "PRESET_VIDEO_6"
  | "PRESET_VIDEO_7"
  | "PRESET_VIDEO_8"
  | "SHARED"
  | "UNENCRYPTED"
  | (string & {});
export interface EncryptionContractConfiguration {
  PresetSpeke20Audio: PresetSpeke20Audio;
  PresetSpeke20Video: PresetSpeke20Video;
}
export type DrmSystem =
  | "CLEAR_KEY_AES_128"
  | "FAIRPLAY"
  | "PLAYREADY"
  | "WIDEVINE"
  | "IRDETO"
  | (string & {});
export type DrmSystems = DrmSystem[];
export type SpekeVersion = "V2_0" | "V2_1" | (string & {});
export type ContentKeyPeriodTiming =
  | "INDEX_ONLY"
  | "START_END_ONLY"
  | "INDEX_WITH_START_END"
  | (string & {});
export interface ContentKeyPeriodConfiguration {
  ContentKeyPeriodTiming?: ContentKeyPeriodTiming;
}
export interface SpekeKeyProvider {
  EncryptionContractConfiguration: EncryptionContractConfiguration;
  ResourceId: string;
  DrmSystems: DrmSystem[];
  RoleArn: string;
  Url: string;
  CertificateArn?: string;
  SpekeVersion?: SpekeVersion;
  ContentKeyPeriodConfiguration?: ContentKeyPeriodConfiguration;
}
export interface Encryption {
  ConstantInitializationVector?: string;
  EncryptionMethod: EncryptionMethod;
  KeyRotationIntervalSeconds?: number;
  CmafExcludeSegmentDrmMetadata?: boolean;
  SpekeKeyProvider: SpekeKeyProvider;
}
export type OutputTimestampMode = "PASSTHROUGH" | "REBASED_TO_CHANNEL_START" | (string & {});
export interface Segment {
  SegmentDurationSeconds?: number;
  SegmentName?: string;
  TsUseAudioRenditionGroup?: boolean;
  IncludeIframeOnlyStreams?: boolean;
  TsIncludeDvbSubtitles?: boolean;
  Scte?: Scte;
  Encryption?: Encryption;
  OutputTimestampMode?: OutputTimestampMode;
}
export type ManifestName = string;
export type AdMarkerHls = "DATERANGE" | "SCTE35_ENHANCED" | (string & {});
export type ScteInManifests = "ALL" | "MATCHES_FILTER" | (string & {});
export interface ScteHls {
  AdMarkerHls?: AdMarkerHls;
  ScteInManifests?: ScteInManifests;
}
export interface StartTag {
  TimeOffset: number;
  Precise?: boolean;
}
export interface MultiviewFilterConfiguration {
  Layout: MultiviewLayoutType;
  Sources: string[];
}
export interface FilterConfiguration {
  ManifestFilter?: string;
  DrmSettings?: string;
  Start?: Date;
  End?: Date;
  TimeDelaySeconds?: number;
  ClipStartTime?: Date;
  Multiview?: MultiviewFilterConfiguration;
}
export type UriPathType = "LEAF" | "ROOT" | (string & {});
export interface CreateHlsManifestConfiguration {
  ManifestName: string;
  ChildManifestName?: string;
  ScteHls?: ScteHls;
  StartTag?: StartTag;
  ManifestWindowSeconds?: number;
  ProgramDateTimeIntervalSeconds?: number;
  FilterConfiguration?: FilterConfiguration;
  UrlEncodeChildManifest?: boolean;
  UriPathType?: UriPathType;
}
export type CreateHlsManifests = CreateHlsManifestConfiguration[];
export interface CreateLowLatencyHlsManifestConfiguration {
  ManifestName: string;
  ChildManifestName?: string;
  ScteHls?: ScteHls;
  StartTag?: StartTag;
  ManifestWindowSeconds?: number;
  ProgramDateTimeIntervalSeconds?: number;
  FilterConfiguration?: FilterConfiguration;
  UrlEncodeChildManifest?: boolean;
  UriPathType?: UriPathType;
}
export type CreateLowLatencyHlsManifests = CreateLowLatencyHlsManifestConfiguration[];
export type DashSegmentTemplateFormat = "NUMBER_WITH_TIMELINE" | (string & {});
export type DashPeriodTrigger =
  | "AVAILS"
  | "DRM_KEY_ROTATION"
  | "SOURCE_CHANGES"
  | "SOURCE_DISRUPTIONS"
  | "NONE"
  | (string & {});
export type DashPeriodTriggers = DashPeriodTrigger[];
export type AdMarkerDash = "BINARY" | "XML" | (string & {});
export interface ScteDash {
  AdMarkerDash?: AdMarkerDash;
  ScteInManifests?: ScteInManifests;
}
export type DashDrmSignaling = "INDIVIDUAL" | "REFERENCED" | (string & {});
export type DashUtcTimingMode =
  | "HTTP_HEAD"
  | "HTTP_ISO"
  | "HTTP_XSDATE"
  | "UTC_DIRECT"
  | (string & {});
export interface DashUtcTiming {
  TimingMode?: DashUtcTimingMode;
  TimingSource?: string;
}
export type DashProfile = "DVB_DASH" | (string & {});
export type DashProfiles = DashProfile[];
export interface DashBaseUrl {
  Url: string;
  ServiceLocation?: string;
  DvbPriority?: number;
  DvbWeight?: number;
}
export type DashBaseUrls = DashBaseUrl[];
export interface DashProgramInformation {
  Title?: string;
  Source?: string;
  Copyright?: string;
  LanguageCode?: string;
  MoreInformationUrl?: string;
}
export interface DashDvbFontDownload {
  Url?: string;
  MimeType?: string;
  FontFamily?: string;
}
export interface DashDvbMetricsReporting {
  ReportingUrl: string;
  Probability?: number;
}
export type DashDvbErrorMetrics = DashDvbMetricsReporting[];
export interface DashDvbSettings {
  FontDownload?: DashDvbFontDownload;
  ErrorMetrics?: DashDvbMetricsReporting[];
}
export type DashCompactness = "STANDARD" | "NONE" | (string & {});
export type DashAudioTimelinePattern = "NONE" | "PATTERNED" | (string & {});
export type DashTtmlProfile = "IMSC_1" | "EBU_TT_D_101" | (string & {});
export interface DashTtmlConfiguration {
  TtmlProfile: DashTtmlProfile;
}
export interface DashSubtitleConfiguration {
  TtmlConfiguration?: DashTtmlConfiguration;
}
export type DashAvailabilityStartTimeConfiguration = { FixedAvailabilityStartTime: Date };
export interface CreateDashManifestConfiguration {
  ManifestName: string;
  ManifestWindowSeconds?: number;
  FilterConfiguration?: FilterConfiguration;
  MinUpdatePeriodSeconds?: number;
  MinBufferTimeSeconds?: number;
  SuggestedPresentationDelaySeconds?: number;
  SegmentTemplateFormat?: DashSegmentTemplateFormat;
  PeriodTriggers?: DashPeriodTrigger[];
  ScteDash?: ScteDash;
  DrmSignaling?: DashDrmSignaling;
  UtcTiming?: DashUtcTiming;
  Profiles?: DashProfile[];
  BaseUrls?: DashBaseUrl[];
  ProgramInformation?: DashProgramInformation;
  DvbSettings?: DashDvbSettings;
  Compactness?: DashCompactness;
  AudioTimelinePattern?: DashAudioTimelinePattern;
  SubtitleConfiguration?: DashSubtitleConfiguration;
  UriPathType?: UriPathType;
  AvailabilityStartTimeConfiguration?: DashAvailabilityStartTimeConfiguration;
}
export type CreateDashManifests = CreateDashManifestConfiguration[];
export type MssManifestLayout = "FULL" | "COMPACT" | (string & {});
export interface CreateMssManifestConfiguration {
  ManifestName: string;
  ManifestWindowSeconds?: number;
  FilterConfiguration?: FilterConfiguration;
  ManifestLayout?: MssManifestLayout;
}
export type CreateMssManifests = CreateMssManifestConfiguration[];
export type EndpointErrorCondition =
  | "STALE_MANIFEST"
  | "INCOMPLETE_MANIFEST"
  | "MISSING_DRM_KEY"
  | "SLATE_INPUT"
  | (string & {});
export type EndpointErrorConditions = EndpointErrorCondition[];
export interface ForceEndpointErrorConfiguration {
  EndpointErrorConditions?: EndpointErrorCondition[];
}
export type UriSeparator = "UNDERSCORE" | "HYPHEN" | (string & {});
export type StreamNameOutputMode = "INDEX" | "PASSTHROUGH_NAME" | (string & {});
export interface CreateOriginEndpointRequest {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  ContainerType: ContainerType;
  Segment?: Segment;
  ClientToken?: string;
  Description?: string;
  StartoverWindowSeconds?: number;
  HlsManifests?: CreateHlsManifestConfiguration[];
  LowLatencyHlsManifests?: CreateLowLatencyHlsManifestConfiguration[];
  DashManifests?: CreateDashManifestConfiguration[];
  MssManifests?: CreateMssManifestConfiguration[];
  ForceEndpointErrorConfiguration?: ForceEndpointErrorConfiguration;
  UriSeparator?: UriSeparator;
  StreamNameOutputMode?: StreamNameOutputMode;
  Tags?: { [key: string]: string | undefined };
}
export interface GetHlsManifestConfiguration {
  ManifestName: string;
  Url: string;
  ChildManifestName?: string;
  ManifestWindowSeconds?: number;
  ProgramDateTimeIntervalSeconds?: number;
  ScteHls?: ScteHls;
  FilterConfiguration?: FilterConfiguration;
  StartTag?: StartTag;
  UrlEncodeChildManifest?: boolean;
  UriPathType?: UriPathType;
}
export type GetHlsManifests = GetHlsManifestConfiguration[];
export interface GetLowLatencyHlsManifestConfiguration {
  ManifestName: string;
  Url: string;
  ChildManifestName?: string;
  ManifestWindowSeconds?: number;
  ProgramDateTimeIntervalSeconds?: number;
  ScteHls?: ScteHls;
  FilterConfiguration?: FilterConfiguration;
  StartTag?: StartTag;
  UrlEncodeChildManifest?: boolean;
  UriPathType?: UriPathType;
}
export type GetLowLatencyHlsManifests = GetLowLatencyHlsManifestConfiguration[];
export interface GetDashManifestConfiguration {
  ManifestName: string;
  Url: string;
  ManifestWindowSeconds?: number;
  FilterConfiguration?: FilterConfiguration;
  MinUpdatePeriodSeconds?: number;
  MinBufferTimeSeconds?: number;
  SuggestedPresentationDelaySeconds?: number;
  SegmentTemplateFormat?: DashSegmentTemplateFormat;
  PeriodTriggers?: DashPeriodTrigger[];
  ScteDash?: ScteDash;
  DrmSignaling?: DashDrmSignaling;
  UtcTiming?: DashUtcTiming;
  Profiles?: DashProfile[];
  BaseUrls?: DashBaseUrl[];
  ProgramInformation?: DashProgramInformation;
  DvbSettings?: DashDvbSettings;
  Compactness?: DashCompactness;
  AudioTimelinePattern?: DashAudioTimelinePattern;
  SubtitleConfiguration?: DashSubtitleConfiguration;
  UriPathType?: UriPathType;
  AvailabilityStartTimeConfiguration?: DashAvailabilityStartTimeConfiguration;
}
export type GetDashManifests = GetDashManifestConfiguration[];
export interface GetMssManifestConfiguration {
  ManifestName: string;
  Url: string;
  FilterConfiguration?: FilterConfiguration;
  ManifestWindowSeconds?: number;
  ManifestLayout?: MssManifestLayout;
}
export type GetMssManifests = GetMssManifestConfiguration[];
export interface CreateOriginEndpointResponse {
  Arn: string;
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  ContainerType: ContainerType;
  Segment: Segment;
  CreatedAt: Date;
  ModifiedAt: Date;
  Description?: string;
  StartoverWindowSeconds?: number;
  HlsManifests?: GetHlsManifestConfiguration[];
  LowLatencyHlsManifests?: GetLowLatencyHlsManifestConfiguration[];
  DashManifests?: GetDashManifestConfiguration[];
  MssManifests?: GetMssManifestConfiguration[];
  ForceEndpointErrorConfiguration?: ForceEndpointErrorConfiguration;
  UriSeparator?: UriSeparator;
  StreamNameOutputMode?: StreamNameOutputMode;
  ETag?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface DeleteChannelRequest {
  ChannelGroupName: string;
  ChannelName: string;
}
export interface DeleteChannelResponse {}
export interface DeleteChannelGroupRequest {
  ChannelGroupName: string;
}
export interface DeleteChannelGroupResponse {}
export interface DeleteChannelPolicyRequest {
  ChannelGroupName: string;
  ChannelName: string;
}
export interface DeleteChannelPolicyResponse {}
export interface DeleteOriginEndpointRequest {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
}
export interface DeleteOriginEndpointResponse {}
export interface DeleteOriginEndpointPolicyRequest {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
}
export interface DeleteOriginEndpointPolicyResponse {}
export interface GetChannelRequest {
  ChannelGroupName: string;
  ChannelName: string;
}
export interface GetChannelResponse {
  MultiviewConfiguration?: MultiviewConfiguration;
  AttachedMultiviewChannels?: string[];
  Arn: string;
  ChannelName: string;
  ChannelGroupName: string;
  CreatedAt: Date;
  ModifiedAt: Date;
  ResetAt?: Date;
  Description?: string;
  IngestEndpoints?: IngestEndpoint[];
  InputType?: InputType;
  ETag?: string;
  Tags?: { [key: string]: string | undefined };
  InputSwitchConfiguration?: InputSwitchConfiguration;
  OutputHeaderConfiguration?: OutputHeaderConfiguration;
  OutputLockingMode?: OutputLockingMode;
}
export interface GetChannelGroupRequest {
  ChannelGroupName: string;
}
export interface GetChannelGroupResponse {
  ChannelGroupName: string;
  Arn: string;
  EgressDomain: string;
  CreatedAt: Date;
  ModifiedAt: Date;
  Description?: string;
  ETag?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface GetChannelPolicyRequest {
  ChannelGroupName: string;
  ChannelName: string;
}
export type PolicyText = string;
export interface GetChannelPolicyResponse {
  ChannelGroupName: string;
  ChannelName: string;
  Policy: string;
}
export interface GetHarvestJobRequest {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  HarvestJobName: string;
}
export interface GetHarvestJobResponse {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  Destination: Destination;
  HarvestJobName: string;
  HarvestedManifests: HarvestedManifests;
  Description?: string;
  ScheduleConfiguration: HarvesterScheduleConfiguration;
  Arn: string;
  CreatedAt: Date;
  ModifiedAt: Date;
  Status: HarvestJobStatus;
  ErrorMessage?: string;
  ETag?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface GetOriginEndpointRequest {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
}
export interface GetOriginEndpointResponse {
  Arn: string;
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  ContainerType: ContainerType;
  Segment: Segment;
  CreatedAt: Date;
  ModifiedAt: Date;
  ResetAt?: Date;
  Description?: string;
  StartoverWindowSeconds?: number;
  HlsManifests?: GetHlsManifestConfiguration[];
  LowLatencyHlsManifests?: GetLowLatencyHlsManifestConfiguration[];
  DashManifests?: GetDashManifestConfiguration[];
  MssManifests?: GetMssManifestConfiguration[];
  ForceEndpointErrorConfiguration?: ForceEndpointErrorConfiguration;
  UriSeparator?: UriSeparator;
  StreamNameOutputMode?: StreamNameOutputMode;
  ETag?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface GetOriginEndpointPolicyRequest {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
}
export type CdnIdentifierSecretArn = string;
export type CdnIdentifierSecretArns = string[];
export interface CdnAuthConfiguration {
  CdnIdentifierSecretArns: string[];
  SecretsRoleArn: string;
}
export interface GetOriginEndpointPolicyResponse {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  Policy: string;
  CdnAuthConfiguration?: CdnAuthConfiguration;
}
export type ListResourceMaxResults = number;
export interface ListChannelGroupsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface ChannelGroupListConfiguration {
  ChannelGroupName: string;
  Arn: string;
  CreatedAt: Date;
  ModifiedAt: Date;
  Description?: string;
}
export type ChannelGroupsList = ChannelGroupListConfiguration[];
export interface ListChannelGroupsResponse {
  Items?: ChannelGroupListConfiguration[];
  NextToken?: string;
}
export interface ListChannelsRequest {
  ChannelGroupName: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ChannelListConfiguration {
  Arn: string;
  ChannelName: string;
  ChannelGroupName: string;
  CreatedAt: Date;
  ModifiedAt: Date;
  Description?: string;
  InputType?: InputType;
  OutputLockingMode?: OutputLockingMode;
  MultiviewConfiguration?: MultiviewConfiguration;
  AttachedMultiviewChannels?: string[];
}
export type ChannelList = ChannelListConfiguration[];
export interface ListChannelsResponse {
  Items?: ChannelListConfiguration[];
  NextToken?: string;
}
export interface ListHarvestJobsRequest {
  ChannelGroupName: string;
  ChannelName?: string;
  OriginEndpointName?: string;
  Status?: HarvestJobStatus;
  MaxResults?: number;
  NextToken?: string;
}
export interface HarvestJob {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  Destination: Destination;
  HarvestJobName: string;
  HarvestedManifests: HarvestedManifests;
  Description?: string;
  ScheduleConfiguration: HarvesterScheduleConfiguration;
  Arn: string;
  CreatedAt: Date;
  ModifiedAt: Date;
  Status: HarvestJobStatus;
  ErrorMessage?: string;
  ETag?: string;
}
export type HarvestJobsList = HarvestJob[];
export interface ListHarvestJobsResponse {
  Items?: HarvestJob[];
  NextToken?: string;
}
export interface ListOriginEndpointsRequest {
  ChannelGroupName: string;
  ChannelName: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListHlsManifestConfiguration {
  ManifestName: string;
  ChildManifestName?: string;
  Url?: string;
}
export type ListHlsManifests = ListHlsManifestConfiguration[];
export interface ListLowLatencyHlsManifestConfiguration {
  ManifestName: string;
  ChildManifestName?: string;
  Url?: string;
}
export type ListLowLatencyHlsManifests = ListLowLatencyHlsManifestConfiguration[];
export interface ListDashManifestConfiguration {
  ManifestName: string;
  Url?: string;
}
export type ListDashManifests = ListDashManifestConfiguration[];
export interface ListMssManifestConfiguration {
  ManifestName: string;
  Url?: string;
}
export type ListMssManifests = ListMssManifestConfiguration[];
export interface OriginEndpointListConfiguration {
  Arn: string;
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  ContainerType: ContainerType;
  Description?: string;
  CreatedAt?: Date;
  ModifiedAt?: Date;
  HlsManifests?: ListHlsManifestConfiguration[];
  LowLatencyHlsManifests?: ListLowLatencyHlsManifestConfiguration[];
  DashManifests?: ListDashManifestConfiguration[];
  MssManifests?: ListMssManifestConfiguration[];
  ForceEndpointErrorConfiguration?: ForceEndpointErrorConfiguration;
  UriSeparator?: UriSeparator;
  StreamNameOutputMode?: StreamNameOutputMode;
}
export type OriginEndpointsList = OriginEndpointListConfiguration[];
export interface ListOriginEndpointsResponse {
  Items?: OriginEndpointListConfiguration[];
  NextToken?: string;
}
export type TagArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface PutChannelPolicyRequest {
  ChannelGroupName: string;
  ChannelName: string;
  Policy: string;
}
export interface PutChannelPolicyResponse {}
export interface PutOriginEndpointPolicyRequest {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  Policy: string;
  CdnAuthConfiguration?: CdnAuthConfiguration;
}
export interface PutOriginEndpointPolicyResponse {}
export interface ResetChannelStateRequest {
  ChannelGroupName: string;
  ChannelName: string;
}
export interface ResetChannelStateResponse {
  ChannelGroupName: string;
  ChannelName: string;
  Arn: string;
  ResetAt: Date;
}
export interface ResetOriginEndpointStateRequest {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
}
export interface ResetOriginEndpointStateResponse {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  Arn: string;
  ResetAt: Date;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateChannelRequest {
  ChannelGroupName: string;
  ChannelName: string;
  ETag?: string;
  Description?: string;
  InputSwitchConfiguration?: InputSwitchConfiguration;
  OutputHeaderConfiguration?: OutputHeaderConfiguration;
  MultiviewConfiguration?: MultiviewConfiguration;
}
export interface UpdateChannelResponse {
  MultiviewConfiguration?: MultiviewConfiguration;
  AttachedMultiviewChannels?: string[];
  Arn: string;
  ChannelName: string;
  ChannelGroupName: string;
  CreatedAt: Date;
  ModifiedAt: Date;
  Description?: string;
  IngestEndpoints?: IngestEndpoint[];
  InputType?: InputType;
  ETag?: string;
  Tags?: { [key: string]: string | undefined };
  InputSwitchConfiguration?: InputSwitchConfiguration;
  OutputHeaderConfiguration?: OutputHeaderConfiguration;
  OutputLockingMode?: OutputLockingMode;
}
export interface UpdateChannelGroupRequest {
  ChannelGroupName: string;
  ETag?: string;
  Description?: string;
}
export interface UpdateChannelGroupResponse {
  ChannelGroupName: string;
  Arn: string;
  EgressDomain: string;
  CreatedAt: Date;
  ModifiedAt: Date;
  Description?: string;
  ETag?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface UpdateOriginEndpointRequest {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  ContainerType: ContainerType;
  Segment?: Segment;
  Description?: string;
  StartoverWindowSeconds?: number;
  HlsManifests?: CreateHlsManifestConfiguration[];
  LowLatencyHlsManifests?: CreateLowLatencyHlsManifestConfiguration[];
  DashManifests?: CreateDashManifestConfiguration[];
  MssManifests?: CreateMssManifestConfiguration[];
  ForceEndpointErrorConfiguration?: ForceEndpointErrorConfiguration;
  UriSeparator?: UriSeparator;
  StreamNameOutputMode?: StreamNameOutputMode;
  ETag?: string;
}
export interface UpdateOriginEndpointResponse {
  Arn: string;
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  ContainerType: ContainerType;
  Segment: Segment;
  CreatedAt: Date;
  ModifiedAt: Date;
  Description?: string;
  StartoverWindowSeconds?: number;
  HlsManifests?: GetHlsManifestConfiguration[];
  LowLatencyHlsManifests?: GetLowLatencyHlsManifestConfiguration[];
  MssManifests?: GetMssManifestConfiguration[];
  ForceEndpointErrorConfiguration?: ForceEndpointErrorConfiguration;
  UriSeparator?: UriSeparator;
  StreamNameOutputMode?: StreamNameOutputMode;
  ETag?: string;
  Tags?: { [key: string]: string | undefined };
  DashManifests?: GetDashManifestConfiguration[];
}
export type ConflictExceptionType =
  | "RESOURCE_IN_USE"
  | "RESOURCE_ALREADY_EXISTS"
  | "IDEMPOTENT_PARAMETER_MISMATCH"
  | "CONFLICTING_OPERATION"
  | (string & {});
export type ResourceTypeNotFound =
  | "CHANNEL_GROUP"
  | "CHANNEL"
  | "ORIGIN_ENDPOINT"
  | "HARVEST_JOB"
  | (string & {});
export type ValidationExceptionType =
  | "CONTAINER_TYPE_IMMUTABLE"
  | "INVALID_PAGINATION_TOKEN"
  | "INVALID_PAGINATION_MAX_RESULTS"
  | "INVALID_POLICY"
  | "INVALID_ROLE_ARN"
  | "MANIFEST_NAME_COLLISION"
  | "ENCRYPTION_METHOD_CONTAINER_TYPE_MISMATCH"
  | "CENC_IV_INCOMPATIBLE"
  | "ENCRYPTION_CONTRACT_WITHOUT_AUDIO_RENDITION_INCOMPATIBLE"
  | "ENCRYPTION_CONTRACT_WITH_ISM_CONTAINER_INCOMPATIBLE"
  | "ENCRYPTION_CONTRACT_UNENCRYPTED"
  | "ENCRYPTION_CONTRACT_SHARED"
  | "NUM_MANIFESTS_LOW"
  | "NUM_MANIFESTS_HIGH"
  | "MANIFEST_DRM_SYSTEMS_INCOMPATIBLE"
  | "DRM_SYSTEMS_ENCRYPTION_METHOD_INCOMPATIBLE"
  | "ROLE_ARN_NOT_ASSUMABLE"
  | "ROLE_ARN_LENGTH_OUT_OF_RANGE"
  | "ROLE_ARN_INVALID_FORMAT"
  | "URL_INVALID"
  | "URL_SCHEME"
  | "URL_USER_INFO"
  | "URL_PORT"
  | "URL_UNKNOWN_HOST"
  | "URL_LOCAL_ADDRESS"
  | "URL_LOOPBACK_ADDRESS"
  | "URL_LINK_LOCAL_ADDRESS"
  | "URL_MULTICAST_ADDRESS"
  | "MEMBER_INVALID"
  | "MEMBER_MISSING"
  | "MEMBER_MIN_VALUE"
  | "MEMBER_MAX_VALUE"
  | "MEMBER_MIN_LENGTH"
  | "MEMBER_MAX_LENGTH"
  | "MEMBER_INVALID_ENUM_VALUE"
  | "MEMBER_DOES_NOT_MATCH_PATTERN"
  | "INVALID_MANIFEST_FILTER"
  | "INVALID_DRM_SETTINGS"
  | "INVALID_TIME_DELAY_SECONDS"
  | "END_TIME_EARLIER_THAN_START_TIME"
  | "TS_CONTAINER_TYPE_WITH_DASH_MANIFEST"
  | "DIRECT_MODE_WITH_TIMING_SOURCE"
  | "NONE_MODE_WITH_TIMING_SOURCE"
  | "TIMING_SOURCE_MISSING"
  | "UPDATE_PERIOD_SMALLER_THAN_SEGMENT_DURATION"
  | "PERIOD_TRIGGERS_NONE_SPECIFIED_WITH_ADDITIONAL_VALUES"
  | "DRM_SIGNALING_MISMATCH_SEGMENT_ENCRYPTION_STATUS"
  | "ONLY_CMAF_INPUT_TYPE_ALLOW_FORCE_ENDPOINT_ERROR_CONFIGURATION"
  | "SOURCE_DISRUPTIONS_ENABLED_INCORRECTLY"
  | "HARVESTED_MANIFEST_HAS_START_END_FILTER_CONFIGURATION"
  | "HARVESTED_MANIFEST_NOT_FOUND_ON_ENDPOINT"
  | "TOO_MANY_IN_PROGRESS_HARVEST_JOBS"
  | "HARVEST_JOB_INELIGIBLE_FOR_CANCELLATION"
  | "INVALID_HARVEST_JOB_DURATION"
  | "HARVEST_JOB_S3_DESTINATION_MISSING_OR_INCOMPLETE"
  | "HARVEST_JOB_UNABLE_TO_WRITE_TO_S3_DESTINATION"
  | "HARVEST_JOB_CUSTOMER_ENDPOINT_READ_ACCESS_DENIED"
  | "CLIP_START_TIME_WITH_START_OR_END"
  | "START_TAG_TIME_OFFSET_INVALID"
  | "INCOMPATIBLE_DASH_PROFILE_DVB_DASH_CONFIGURATION"
  | "DASH_DVB_ATTRIBUTES_WITHOUT_DVB_DASH_PROFILE"
  | "INCOMPATIBLE_DASH_COMPACTNESS_CONFIGURATION"
  | "INCOMPATIBLE_XML_ENCODING"
  | "CMAF_EXCLUDE_SEGMENT_DRM_METADATA_INCOMPATIBLE_CONTAINER_TYPE"
  | "ONLY_CMAF_INPUT_TYPE_ALLOW_MQCS_INPUT_SWITCHING"
  | "ONLY_CMAF_INPUT_TYPE_ALLOW_MQCS_OUTPUT_CONFIGURATION"
  | "ONLY_CMAF_INPUT_TYPE_ALLOW_PREFERRED_INPUT_CONFIGURATION"
  | "TS_CONTAINER_TYPE_WITH_MSS_MANIFEST"
  | "CMAF_CONTAINER_TYPE_WITH_MSS_MANIFEST"
  | "ISM_CONTAINER_TYPE_WITH_HLS_MANIFEST"
  | "ISM_CONTAINER_TYPE_WITH_LL_HLS_MANIFEST"
  | "ISM_CONTAINER_TYPE_WITH_DASH_MANIFEST"
  | "ISM_CONTAINER_TYPE_WITH_SCTE"
  | "ISM_CONTAINER_WITH_KEY_ROTATION"
  | "BATCH_GET_SECRET_VALUE_DENIED"
  | "GET_SECRET_VALUE_DENIED"
  | "DESCRIBE_SECRET_DENIED"
  | "INVALID_SECRET_FORMAT"
  | "SECRET_IS_NOT_ONE_KEY_VALUE_PAIR"
  | "INVALID_SECRET_KEY"
  | "INVALID_SECRET_VALUE"
  | "SECRET_ARN_RESOURCE_NOT_FOUND"
  | "DECRYPT_SECRET_FAILED"
  | "TOO_MANY_SECRETS"
  | "DUPLICATED_SECRET"
  | "MALFORMED_SECRET_ARN"
  | "SECRET_FROM_DIFFERENT_ACCOUNT"
  | "SECRET_FROM_DIFFERENT_REGION"
  | "INVALID_SECRET"
  | "RESOURCE_NOT_IN_SAME_REGION"
  | "CERTIFICATE_RESOURCE_NOT_FOUND"
  | "CERTIFICATE_ACCESS_DENIED"
  | "DESCRIBE_CERTIFICATE_FAILED"
  | "INVALID_CERTIFICATE_STATUS"
  | "INVALID_CERTIFICATE_KEY_ALGORITHM"
  | "INVALID_CERTIFICATE_SIGNATURE_ALGORITHM"
  | "MISSING_CERTIFICATE_DOMAIN_NAME"
  | "INVALID_ARN"
  | "SCTE_IN_MANIFESTS_INVALID_CONFIGURATION"
  | "CUSTOM_AD_TYPES_INVALID_CONFIGURATION"
  | "ONLY_CMAF_INPUT_TYPE_ALLOW_OUTPUT_LOCKING_MODE"
  | "ONLY_NON_EPOCH_LOCKED_ALLOW_OUTPUT_TIMESTAMP_MODE"
  | "OUTPUT_TIMESTAMP_MODE_IMMUTABLE"
  | "NON_EPOCH_LOCKED_WITH_FORCE_ENDPOINT_ERROR_CONFIGURATION"
  | "ONLY_HLS_INPUT_TYPE_ALLOW_STREAM_NAME_OUTPUT_MODE"
  | "STREAM_NAME_OUTPUT_MODE_IMMUTABLE"
  | "MULTIVIEW_CONFIGURATION_REQUIRED"
  | "MULTIVIEW_CONFIGURATION_NOT_ALLOWED"
  | "MULTIVIEW_SOURCE_NOT_FOUND"
  | "MULTIVIEW_SOURCE_INVALID_INPUT_TYPE"
  | "MULTIVIEW_CHANNEL_POLICY_NOT_ALLOWED"
  | "MULTIVIEW_INPUT_TYPE_WITH_LL_HLS_MANIFEST"
  | "MULTIVIEW_INPUT_TYPE_WITH_MSS_MANIFEST"
  | "MULTIVIEW_INPUT_TYPE_WITH_ISM_CONTAINER"
  | "MULTIVIEW_INPUT_TYPE_WITH_FILTER_CONFIGURATION"
  | "MULTIVIEW_INPUT_TYPE_WITH_START_TAG"
  | "MULTIVIEW_INPUT_TYPE_WITH_HARVEST_JOB"
  | "MULTIVIEW_RESET_NOT_ALLOWED"
  | "MULTIVIEW_DUPLICATE_SOURCE"
  | "MULTIVIEW_DUPLICATE_LAYOUT"
  | "MULTIVIEW_INPUT_SWITCH_NOT_ALLOWED"
  | "MULTIVIEW_OUTPUT_HEADER_NOT_ALLOWED"
  | "MULTIVIEW_STARTOVER_WINDOW_NOT_ALLOWED"
  | "MULTIVIEW_INVALID_TIME_DELAY_SECONDS"
  | "MULTIVIEW_MANIFEST_WINDOW_TOO_LONG"
  | "MULTIVIEW_INPUT_TYPE_WITH_IFRAME_ONLY_STREAMS"
  | "MULTIVIEW_INPUT_TYPE_WITH_NON_EPOCH_LOCKED"
  | "MULTIVIEW_INPUT_TYPE_WITH_SEGMENT_DURATION"
  | "MULTIVIEW_SOURCE_NON_EPOCH_LOCKED"
  | "MULTIVIEW_SCTE_REQUIRES_AVAILS_PERIOD_TRIGGER"
  | "CONTENT_KEY_PERIOD_TIMING_WITHOUT_KEY_ROTATION"
  | "CONTENT_KEY_PERIOD_TIMING_REQUIRES_SPEKE_V2_1"
  | "MULTIVIEW_FILTER_CONFIGURATION_NOT_ALLOWED"
  | "MULTIVIEW_FILTER_LAYOUT_NOT_AVAILABLE"
  | "MULTIVIEW_FILTER_SOURCE_NOT_AVAILABLE"
  | "MULTIVIEW_FILTER_SOURCE_COUNT_MISMATCH"
  | "MULTIVIEW_SOURCE_CHANNEL_LIMIT_EXCEEDED"
  | "MULTIVIEW_TS_USE_AUDIO_RENDITION_GROUP_DISABLED"
  | (string & {});
export type CancelHarvestJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels an in-progress harvest job.
 */
export const cancelHarvestJob: API.OperationMethod<
  CancelHarvestJobRequest,
  CancelHarvestJobResponse,
  CancelHarvestJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c34, 0) as any as S.Schema<CancelHarvestJobRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<CancelHarvestJobResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelHarvestJob",
}));

export type CreateChannelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a channel to start receiving content streams. The channel represents the input to MediaPackage for incoming live content from an encoder such as AWS Elemental MediaLive. The channel receives content, and after packaging it, outputs it through an origin endpoint to downstream devices (such as video players or CDNs) that request the content. You can create only one channel with each request. We recommend that you spread out channels between channel groups, such as putting redundant channels in the same AWS Region in different channel groups.
 */
export const createChannel: API.OperationMethod<
  CreateChannelRequest,
  CreateChannelResponse,
  CreateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c36, 0) as any as S.Schema<CreateChannelRequest>,
  output: __S(1153, __c36, 1) as any as S.Schema<CreateChannelResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChannel",
}));

export type CreateChannelGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a channel group to group your channels and origin endpoints. A channel group is the top-level resource that consists of channels and origin endpoints that are associated with it and that provides predictable URLs for stream delivery. All channels and origin endpoints within the channel group are guaranteed to share the DNS. You can create only one channel group with each request.
 */
export const createChannelGroup: API.OperationMethod<
  CreateChannelGroupRequest,
  CreateChannelGroupResponse,
  CreateChannelGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1344, __c42, 0) as any as S.Schema<CreateChannelGroupRequest>,
  output: __S(1345, __c42, 1) as any as S.Schema<CreateChannelGroupResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChannelGroup",
}));

export type CreateHarvestJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new harvest job to export content from a MediaPackage v2 channel to an S3 bucket.
 */
export const createHarvestJob: API.OperationMethod<
  CreateHarvestJobRequest,
  CreateHarvestJobResponse,
  CreateHarvestJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateHarvestJobRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<CreateHarvestJobResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHarvestJob",
}));

export type CreateOriginEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The endpoint is attached to a channel, and represents the output of the live content. You can associate multiple endpoints to a single channel. Each endpoint gives players and downstream CDNs (such as Amazon CloudFront) access to the content for playback. Content can't be served from a channel until it has an endpoint. You can create only one endpoint with each request.
 */
export const createOriginEndpoint: API.OperationMethod<
  CreateOriginEndpointRequest,
  CreateOriginEndpointResponse,
  CreateOriginEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c3, 0) as any as S.Schema<CreateOriginEndpointRequest>,
  output: __S(97, __c3, 1) as any as S.Schema<CreateOriginEndpointResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOriginEndpoint",
}));

export type DeleteChannelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a channel to stop AWS Elemental MediaPackage from receiving further content. You must delete the channel's origin endpoints before you can delete the channel.
 */
export const deleteChannel: API.OperationMethod<
  DeleteChannelRequest,
  DeleteChannelResponse,
  DeleteChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c7, 0) as any as S.Schema<DeleteChannelRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<DeleteChannelResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChannel",
}));

export type DeleteChannelGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a channel group. You must delete the channel group's channels and origin endpoints before you can delete the channel group. If you delete a channel group, you'll lose access to the egress domain and will have to create a new channel group to replace it.
 */
export const deleteChannelGroup: API.OperationMethod<
  DeleteChannelGroupRequest,
  DeleteChannelGroupResponse,
  DeleteChannelGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c8, 0) as any as S.Schema<DeleteChannelGroupRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<DeleteChannelGroupResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChannelGroup",
}));

export type DeleteChannelPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a channel policy.
 */
export const deleteChannelPolicy: API.OperationMethod<
  DeleteChannelPolicyRequest,
  DeleteChannelPolicyResponse,
  DeleteChannelPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c9, 0) as any as S.Schema<DeleteChannelPolicyRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<DeleteChannelPolicyResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChannelPolicy",
}));

export type DeleteOriginEndpointError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Origin endpoints can serve content until they're deleted. Delete the endpoint if it should no longer respond to playback requests. You must delete all endpoints from a channel before you can delete the channel.
 */
export const deleteOriginEndpoint: API.OperationMethod<
  DeleteOriginEndpointRequest,
  DeleteOriginEndpointResponse,
  DeleteOriginEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c10, 0) as any as S.Schema<DeleteOriginEndpointRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<DeleteOriginEndpointResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOriginEndpoint",
}));

export type DeleteOriginEndpointPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete an origin endpoint policy.
 */
export const deleteOriginEndpointPolicy: API.OperationMethod<
  DeleteOriginEndpointPolicyRequest,
  DeleteOriginEndpointPolicyResponse,
  DeleteOriginEndpointPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c11, 0) as any as S.Schema<DeleteOriginEndpointPolicyRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<DeleteOriginEndpointPolicyResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOriginEndpointPolicy",
}));

export type GetChannelError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified channel that's configured in AWS Elemental MediaPackage.
 */
export const getChannel: API.OperationMethod<
  GetChannelRequest,
  GetChannelResponse,
  GetChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c12, 0) as any as S.Schema<GetChannelRequest>,
  output: __S(385, __c12, 1) as any as S.Schema<GetChannelResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChannel",
}));

export type GetChannelGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified channel group that's configured in AWS Elemental MediaPackage.
 */
export const getChannelGroup: API.OperationMethod<
  GetChannelGroupRequest,
  GetChannelGroupResponse,
  GetChannelGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c13, 0) as any as S.Schema<GetChannelGroupRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<GetChannelGroupResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChannelGroup",
}));

export type GetChannelPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified channel policy that's configured in AWS Elemental MediaPackage. With policies, you can specify who has access to AWS resources and what actions they can perform on those resources.
 */
export const getChannelPolicy: API.OperationMethod<
  GetChannelPolicyRequest,
  GetChannelPolicyResponse,
  GetChannelPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c15, 0) as any as S.Schema<GetChannelPolicyRequest>,
  output: __S(481, __c15, 1) as any as S.Schema<GetChannelPolicyResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChannelPolicy",
}));

export type GetHarvestJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a specific harvest job.
 */
export const getHarvestJob: API.OperationMethod<
  GetHarvestJobRequest,
  GetHarvestJobResponse,
  GetHarvestJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c16, 0) as any as S.Schema<GetHarvestJobRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<GetHarvestJobResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHarvestJob",
}));

export type GetOriginEndpointError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified origin endpoint that's configured in AWS Elemental MediaPackage to obtain its playback URL and to view the packaging settings that it's currently using.
 */
export const getOriginEndpoint: API.OperationMethod<
  GetOriginEndpointRequest,
  GetOriginEndpointResponse,
  GetOriginEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c17, 0) as any as S.Schema<GetOriginEndpointRequest>,
  output: __S(545, __c17, 1) as any as S.Schema<GetOriginEndpointResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOriginEndpoint",
}));

export type GetOriginEndpointPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified origin endpoint policy that's configured in AWS Elemental MediaPackage.
 */
export const getOriginEndpointPolicy: API.OperationMethod<
  GetOriginEndpointPolicyRequest,
  GetOriginEndpointPolicyResponse,
  GetOriginEndpointPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c18, 0) as any as S.Schema<GetOriginEndpointPolicyRequest>,
  output: __S(577, __c18, 1) as any as S.Schema<GetOriginEndpointPolicyResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOriginEndpointPolicy",
}));

export type ListChannelGroupsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves all channel groups that are configured in Elemental MediaPackage.
 */
export const listChannelGroups: API.PaginatedOperationMethod<
  ListChannelGroupsRequest,
  ListChannelGroupsResponse,
  ListChannelGroupsError,
  Credentials | HttpClient.HttpClient,
  ChannelGroupListConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(640, __c20, 0) as any as S.Schema<ListChannelGroupsRequest>,
  output: __S(643, __c20, 3) as any as S.Schema<ListChannelGroupsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChannelGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListChannelsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves all channels in a specific channel group that are configured in AWS Elemental MediaPackage.
 */
export const listChannels: API.PaginatedOperationMethod<
  ListChannelsRequest,
  ListChannelsResponse,
  ListChannelsError,
  Credentials | HttpClient.HttpClient,
  ChannelListConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(672, __c21, 0) as any as S.Schema<ListChannelsRequest>,
  output: __S(675, __c21, 3) as any as S.Schema<ListChannelsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChannels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListHarvestJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of harvest jobs that match the specified criteria.
 */
export const listHarvestJobs: API.PaginatedOperationMethod<
  ListHarvestJobsRequest,
  ListHarvestJobsResponse,
  ListHarvestJobsError,
  Credentials | HttpClient.HttpClient,
  HarvestJob
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(704, __c22, 0) as any as S.Schema<ListHarvestJobsRequest>,
  output: __S(707, __c22, 3) as any as S.Schema<ListHarvestJobsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHarvestJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOriginEndpointsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves all origin endpoints in a specific channel that are configured in AWS Elemental MediaPackage.
 */
export const listOriginEndpoints: API.PaginatedOperationMethod<
  ListOriginEndpointsRequest,
  ListOriginEndpointsResponse,
  ListOriginEndpointsError,
  Credentials | HttpClient.HttpClient,
  OriginEndpointListConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(736, __c23, 0) as any as S.Schema<ListOriginEndpointsRequest>,
  output: __S(743, __c23, 7) as any as S.Schema<ListOriginEndpointsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOriginEndpoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = ValidationException | CommonErrors;
/**
 * Lists the tags assigned to a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c24, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(769, __c24, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutChannelPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Attaches an IAM policy to the specified channel. With policies, you can specify who has access to AWS resources and what actions they can perform on those resources. You can attach only one policy with each request.
 */
export const putChannelPolicy: API.OperationMethod<
  PutChannelPolicyRequest,
  PutChannelPolicyResponse,
  PutChannelPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c25, 0) as any as S.Schema<PutChannelPolicyRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<PutChannelPolicyResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutChannelPolicy",
}));

export type PutOriginEndpointPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Attaches an IAM policy to the specified origin endpoint. You can attach only one policy with each request.
 */
export const putOriginEndpointPolicy: API.OperationMethod<
  PutOriginEndpointPolicyRequest,
  PutOriginEndpointPolicyResponse,
  PutOriginEndpointPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c26, 0) as any as S.Schema<PutOriginEndpointPolicyRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<PutOriginEndpointPolicyResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutOriginEndpointPolicy",
}));

export type ResetChannelStateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Resetting the channel can help to clear errors from misconfigurations in the encoder. A reset refreshes the ingest stream and removes previous content.
 *
 * Be sure to stop the encoder before you reset the channel, and wait at least 30 seconds before you restart the encoder.
 */
export const resetChannelState: API.OperationMethod<
  ResetChannelStateRequest,
  ResetChannelStateResponse,
  ResetChannelStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c27, 0) as any as S.Schema<ResetChannelStateRequest>,
  output: __S(865, __c27, 1) as any as S.Schema<ResetChannelStateResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetChannelState",
}));

export type ResetOriginEndpointStateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Resetting the origin endpoint can help to resolve unexpected behavior and other content packaging issues. It also helps to preserve special events when you don't want the previous content to be available for viewing. A reset clears out all previous content from the origin endpoint.
 *
 * MediaPackage might return old content from this endpoint in the first 30 seconds after the endpoint reset. For best results, when possible, wait 30 seconds from endpoint reset to send playback requests to this endpoint.
 */
export const resetOriginEndpointState: API.OperationMethod<
  ResetOriginEndpointStateRequest,
  ResetOriginEndpointStateResponse,
  ResetOriginEndpointStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c28, 0) as any as S.Schema<ResetOriginEndpointStateRequest>,
  output: __S(897, __c28, 1) as any as S.Schema<ResetOriginEndpointStateResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetOriginEndpointState",
}));

export type TagResourceError = ValidationException | CommonErrors;
/**
 * Assigns one of more tags (key-value pairs) to the specified MediaPackage resource.
 *
 * Tags can help you organize and categorize your resources. You can also use them to scope user permissions, by granting a user permission to access or change only resources with certain tag values. You can use the TagResource operation with a resource that already has tags. If you specify a new tag key for the resource, this tag is appended to the list of tags associated with the resource. If you specify a tag key that is already associated with the resource, the new tag value that you specify replaces the previous value for that tag.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c29, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<TagResourceResponse>,
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = ValidationException | CommonErrors;
/**
 * Removes one or more tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c30, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateChannelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the specified channel. You can edit if MediaPackage sends ingest or egress access logs to the CloudWatch log group, if content will be encrypted, the description on a channel, and your channel's policy settings. You can't edit the name of the channel or CloudFront distribution details.
 *
 * Any edits you make that impact the video output may not be reflected for a few minutes.
 */
export const updateChannel: API.OperationMethod<
  UpdateChannelRequest,
  UpdateChannelResponse,
  UpdateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c31, 0) as any as S.Schema<UpdateChannelRequest>,
  output: __S(993, __c31, 1) as any as S.Schema<UpdateChannelResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateChannel",
}));

export type UpdateChannelGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the specified channel group. You can edit the description on a channel group for easier identification later from the AWS Elemental MediaPackage console. You can't edit the name of the channel group.
 *
 * Any edits you make that impact the video output may not be reflected for a few minutes.
 */
export const updateChannelGroup: API.OperationMethod<
  UpdateChannelGroupRequest,
  UpdateChannelGroupResponse,
  UpdateChannelGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c32, 0) as any as S.Schema<UpdateChannelGroupRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<UpdateChannelGroupResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateChannelGroup",
}));

export type UpdateOriginEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the specified origin endpoint. Edit the packaging preferences on an endpoint to optimize the viewing experience. You can't edit the name of the endpoint.
 *
 * Any edits you make that impact the video output may not be reflected for a few minutes.
 */
export const updateOriginEndpoint: API.OperationMethod<
  UpdateOriginEndpointRequest,
  UpdateOriginEndpointResponse,
  UpdateOriginEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c33, 0) as any as S.Schema<UpdateOriginEndpointRequest>,
  output: __S(1057, __c33, 1) as any as S.Schema<UpdateOriginEndpointResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOriginEndpoint",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
          ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
          OriginEndpointName: S.String.pipe(T.HttpLabel("OriginEndpointName")),
          Description: S.optional(S.String),
          HarvestedManifests: __S(66, __c2, 2),
          ScheduleConfiguration: __S(67, __c2, 3),
          Destination: __S(69, __c2, 5),
          ClientToken: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-client-token"),
            T.IdempotencyToken(),
          ),
          HarvestJobName: S.optional(S.String),
          Tags: S.optional(__S(1312, __c41, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}/harvestJob",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateHarvestJobRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String,
          ChannelName: S.String,
          OriginEndpointName: S.String,
          Destination: __S(69, __c2, 5),
          HarvestJobName: S.String,
          HarvestedManifests: __S(66, __c2, 2),
          Description: S.optional(S.String),
          ScheduleConfiguration: __S(67, __c2, 3),
          Arn: S.String,
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Status: S.String,
          ErrorMessage: S.optional(S.String),
          ETag: S.optional(S.String),
          Tags: S.optional(__S(1312, __c41, 0)),
        }),
      ).annotate({ identifier: "CreateHarvestJobResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ManifestName: S.String })).annotate({
        identifier: "HarvestedHlsManifest",
      });
    case 1:
      return S.Array(__S(64, __c2, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          HlsManifests: S.optional(__S(65, __c2, 1)),
          DashManifests: S.optional(__S(65, __c2, 1)),
          LowLatencyHlsManifests: S.optional(__S(65, __c2, 1)),
        }),
      ).annotate({ identifier: "HarvestedManifests" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "HarvesterScheduleConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({ BucketName: S.String, DestinationPath: S.String }),
      ).annotate({ identifier: "S3DestinationConfig" });
    case 5:
      return S.suspend(() => S.Struct({ S3Destination: __S(68, __c2, 4) })).annotate({
        identifier: "Destination",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
          ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
          OriginEndpointName: S.String,
          ContainerType: S.String,
          Segment: S.optional(__S(166, __c5, 6)),
          ClientToken: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-client-token"),
            T.IdempotencyToken(),
          ),
          Description: S.optional(S.String),
          StartoverWindowSeconds: S.optional(S.Number),
          HlsManifests: S.optional(__S(193, __c6, 1)),
          LowLatencyHlsManifests: S.optional(__S(193, __c6, 1)),
          DashManifests: S.optional(__S(195, __c6, 3)),
          MssManifests: S.optional(__S(197, __c6, 5)),
          ForceEndpointErrorConfiguration: S.optional(__S(128, __c4, 0)),
          UriSeparator: S.optional(S.String),
          StreamNameOutputMode: S.optional(S.String),
          Tags: S.optional(__S(1312, __c41, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateOriginEndpointRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          ChannelGroupName: S.String,
          ChannelName: S.String,
          OriginEndpointName: S.String,
          ContainerType: S.String,
          Segment: __S(166, __c5, 6),
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Description: S.optional(S.String),
          StartoverWindowSeconds: S.optional(S.Number),
          HlsManifests: S.optional(__S(184, __c5, 24)),
          LowLatencyHlsManifests: S.optional(__S(184, __c5, 24)),
          DashManifests: S.optional(__S(186, __c5, 26)),
          MssManifests: S.optional(__S(188, __c5, 28)),
          ForceEndpointErrorConfiguration: S.optional(__S(128, __c4, 0)),
          UriSeparator: S.optional(S.String),
          StreamNameOutputMode: S.optional(S.String),
          ETag: S.optional(S.String),
          Tags: S.optional(__S(1312, __c41, 0)),
        }),
      ).annotate({ identifier: "CreateOriginEndpointResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EndpointErrorConditions: S.optional(__S(1216, __c38, 0)) }),
      ).annotate({ identifier: "ForceEndpointErrorConfiguration" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ScteFilter: S.optional(__S(1216, __c38, 0)),
          ScteInSegments: S.optional(S.String),
          CustomAdTypes: S.optional(__S(1216, __c38, 0)),
        }),
      ).annotate({ identifier: "Scte" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TsEncryptionMethod: S.optional(S.String),
          CmafEncryptionMethod: S.optional(S.String),
          IsmEncryptionMethod: S.optional(S.String),
        }),
      ).annotate({ identifier: "EncryptionMethod" });
    case 2:
      return S.suspend(() =>
        S.Struct({ PresetSpeke20Audio: S.String, PresetSpeke20Video: S.String }),
      ).annotate({ identifier: "EncryptionContractConfiguration" });
    case 3:
      return S.suspend(() => S.Struct({ ContentKeyPeriodTiming: S.optional(S.String) })).annotate({
        identifier: "ContentKeyPeriodConfiguration",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          EncryptionContractConfiguration: __S(162, __c5, 2),
          ResourceId: S.String,
          DrmSystems: __S(1216, __c38, 0),
          RoleArn: S.String,
          Url: S.String,
          CertificateArn: S.optional(S.String),
          SpekeVersion: S.optional(S.String),
          ContentKeyPeriodConfiguration: S.optional(__S(163, __c5, 3)),
        }),
      ).annotate({ identifier: "SpekeKeyProvider" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          ConstantInitializationVector: S.optional(S.String),
          EncryptionMethod: __S(161, __c5, 1),
          KeyRotationIntervalSeconds: S.optional(S.Number),
          CmafExcludeSegmentDrmMetadata: S.optional(S.Boolean),
          SpekeKeyProvider: __S(164, __c5, 4),
        }),
      ).annotate({ identifier: "Encryption" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          SegmentDurationSeconds: S.optional(S.Number),
          SegmentName: S.optional(S.String),
          TsUseAudioRenditionGroup: S.optional(S.Boolean),
          IncludeIframeOnlyStreams: S.optional(S.Boolean),
          TsIncludeDvbSubtitles: S.optional(S.Boolean),
          Scte: S.optional(__S(160, __c5, 0)),
          Encryption: S.optional(__S(165, __c5, 5)),
          OutputTimestampMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "Segment" });
    case 7:
      return S.suspend(() =>
        S.Struct({ AdMarkerHls: S.optional(S.String), ScteInManifests: S.optional(S.String) }),
      ).annotate({ identifier: "ScteHls" });
    case 8:
      return S.suspend(() =>
        S.Struct({ TimeOffset: S.Number, Precise: S.optional(S.Boolean) }),
      ).annotate({ identifier: "StartTag" });
    case 9:
      return S.suspend(() => S.Struct({ Layout: S.String, Sources: __S(1184, __c37, 0) })).annotate(
        { identifier: "MultiviewFilterConfiguration" },
      );
    case 10:
      return S.suspend(() =>
        S.Struct({
          ManifestFilter: S.optional(S.String),
          DrmSettings: S.optional(S.String),
          Start: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          End: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TimeDelaySeconds: S.optional(S.Number),
          ClipStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Multiview: S.optional(__S(169, __c5, 9)),
        }),
      ).annotate({ identifier: "FilterConfiguration" });
    case 11:
      return S.suspend(() =>
        S.Struct({ AdMarkerDash: S.optional(S.String), ScteInManifests: S.optional(S.String) }),
      ).annotate({ identifier: "ScteDash" });
    case 12:
      return S.suspend(() =>
        S.Struct({ TimingMode: S.optional(S.String), TimingSource: S.optional(S.String) }),
      ).annotate({ identifier: "DashUtcTiming" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          Url: S.String,
          ServiceLocation: S.optional(S.String),
          DvbPriority: S.optional(S.Number),
          DvbWeight: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DashBaseUrl" });
    case 14:
      return S.Array(__S(173, __c5, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          Title: S.optional(S.String),
          Source: S.optional(S.String),
          Copyright: S.optional(S.String),
          LanguageCode: S.optional(S.String),
          MoreInformationUrl: S.optional(S.String),
        }),
      ).annotate({ identifier: "DashProgramInformation" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          Url: S.optional(S.String),
          MimeType: S.optional(S.String),
          FontFamily: S.optional(S.String),
        }),
      ).annotate({ identifier: "DashDvbFontDownload" });
    case 17:
      return S.suspend(() =>
        S.Struct({ ReportingUrl: S.String, Probability: S.optional(S.Number) }),
      ).annotate({ identifier: "DashDvbMetricsReporting" });
    case 18:
      return S.Array(__S(177, __c5, 17));
    case 19:
      return S.suspend(() =>
        S.Struct({
          FontDownload: S.optional(__S(176, __c5, 16)),
          ErrorMetrics: S.optional(__S(178, __c5, 18)),
        }),
      ).annotate({ identifier: "DashDvbSettings" });
    case 20:
      return S.suspend(() => S.Struct({ TtmlProfile: S.String })).annotate({
        identifier: "DashTtmlConfiguration",
      });
    case 21:
      return S.suspend(() =>
        S.Struct({ TtmlConfiguration: S.optional(__S(180, __c5, 20)) }),
      ).annotate({ identifier: "DashSubtitleConfiguration" });
    case 22:
      return S.Union([
        /*@__PURE__*/ S.Struct({
          FixedAvailabilityStartTime: /*@__PURE__*/ S.Date.pipe(
            /*@__PURE__*/ T.TimestampFormat("epoch-seconds"),
          ),
        }),
      ]);
    case 23:
      return S.suspend(() =>
        S.Struct({
          ManifestName: S.String,
          Url: S.String,
          ChildManifestName: S.optional(S.String),
          ManifestWindowSeconds: S.optional(S.Number),
          ProgramDateTimeIntervalSeconds: S.optional(S.Number),
          ScteHls: S.optional(__S(167, __c5, 7)),
          FilterConfiguration: S.optional(__S(170, __c5, 10)),
          StartTag: S.optional(__S(168, __c5, 8)),
          UrlEncodeChildManifest: S.optional(S.Boolean),
          UriPathType: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetHlsManifestConfiguration" });
    case 24:
      return S.Array(__S(183, __c5, 23));
    case 25:
      return S.suspend(() =>
        S.Struct({
          ManifestName: S.String,
          Url: S.String,
          ManifestWindowSeconds: S.optional(S.Number),
          FilterConfiguration: S.optional(__S(170, __c5, 10)),
          MinUpdatePeriodSeconds: S.optional(S.Number),
          MinBufferTimeSeconds: S.optional(S.Number),
          SuggestedPresentationDelaySeconds: S.optional(S.Number),
          SegmentTemplateFormat: S.optional(S.String),
          PeriodTriggers: S.optional(__S(1216, __c38, 0)),
          ScteDash: S.optional(__S(171, __c5, 11)),
          DrmSignaling: S.optional(S.String),
          UtcTiming: S.optional(__S(172, __c5, 12)),
          Profiles: S.optional(__S(1216, __c38, 0)),
          BaseUrls: S.optional(__S(174, __c5, 14)),
          ProgramInformation: S.optional(__S(175, __c5, 15)),
          DvbSettings: S.optional(__S(179, __c5, 19)),
          Compactness: S.optional(S.String),
          AudioTimelinePattern: S.optional(S.String),
          SubtitleConfiguration: S.optional(__S(181, __c5, 21)),
          UriPathType: S.optional(S.String),
          AvailabilityStartTimeConfiguration: S.optional(__S(182, __c5, 22)),
        }),
      ).annotate({ identifier: "GetDashManifestConfiguration" });
    case 26:
      return S.Array(__S(185, __c5, 25));
    case 27:
      return S.suspend(() =>
        S.Struct({
          ManifestName: S.String,
          Url: S.String,
          FilterConfiguration: S.optional(__S(170, __c5, 10)),
          ManifestWindowSeconds: S.optional(S.Number),
          ManifestLayout: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetMssManifestConfiguration" });
    case 28:
      return S.Array(__S(187, __c5, 27));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ManifestName: S.String,
          ChildManifestName: S.optional(S.String),
          ScteHls: S.optional(__S(167, __c5, 7)),
          StartTag: S.optional(__S(168, __c5, 8)),
          ManifestWindowSeconds: S.optional(S.Number),
          ProgramDateTimeIntervalSeconds: S.optional(S.Number),
          FilterConfiguration: S.optional(__S(170, __c5, 10)),
          UrlEncodeChildManifest: S.optional(S.Boolean),
          UriPathType: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateHlsManifestConfiguration" });
    case 1:
      return S.Array(__S(192, __c6, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ManifestName: S.String,
          ManifestWindowSeconds: S.optional(S.Number),
          FilterConfiguration: S.optional(__S(170, __c5, 10)),
          MinUpdatePeriodSeconds: S.optional(S.Number),
          MinBufferTimeSeconds: S.optional(S.Number),
          SuggestedPresentationDelaySeconds: S.optional(S.Number),
          SegmentTemplateFormat: S.optional(S.String),
          PeriodTriggers: S.optional(__S(1216, __c38, 0)),
          ScteDash: S.optional(__S(171, __c5, 11)),
          DrmSignaling: S.optional(S.String),
          UtcTiming: S.optional(__S(172, __c5, 12)),
          Profiles: S.optional(__S(1216, __c38, 0)),
          BaseUrls: S.optional(__S(174, __c5, 14)),
          ProgramInformation: S.optional(__S(175, __c5, 15)),
          DvbSettings: S.optional(__S(179, __c5, 19)),
          Compactness: S.optional(S.String),
          AudioTimelinePattern: S.optional(S.String),
          SubtitleConfiguration: S.optional(__S(181, __c5, 21)),
          UriPathType: S.optional(S.String),
          AvailabilityStartTimeConfiguration: S.optional(__S(182, __c5, 22)),
        }),
      ).annotate({ identifier: "CreateDashManifestConfiguration" });
    case 3:
      return S.Array(__S(194, __c6, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ManifestName: S.String,
          ManifestWindowSeconds: S.optional(S.Number),
          FilterConfiguration: S.optional(__S(170, __c5, 10)),
          ManifestLayout: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateMssManifestConfiguration" });
    case 5:
      return S.Array(__S(196, __c6, 4));
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
          ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteChannelRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/channelGroup/{ChannelGroupName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteChannelGroupRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
          ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/policy",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteChannelPolicyRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
          ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
          OriginEndpointName: S.String.pipe(T.HttpLabel("OriginEndpointName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteOriginEndpointRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
          ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
          OriginEndpointName: S.String.pipe(T.HttpLabel("OriginEndpointName")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}/policy",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteOriginEndpointPolicyRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
          ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetChannelRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MultiviewConfiguration: S.optional(__S(1248, __c39, 0)),
          AttachedMultiviewChannels: S.optional(__S(1184, __c37, 0)),
          Arn: S.String,
          ChannelName: S.String,
          ChannelGroupName: S.String,
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ResetAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Description: S.optional(S.String),
          IngestEndpoints: S.optional(__S(1283, __c40, 3)),
          InputType: S.optional(S.String),
          ETag: S.optional(S.String),
          Tags: S.optional(__S(1312, __c41, 0)),
          InputSwitchConfiguration: S.optional(__S(1280, __c40, 0)),
          OutputHeaderConfiguration: S.optional(__S(1281, __c40, 1)),
          OutputLockingMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetChannelResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/channelGroup/{ChannelGroupName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetChannelGroupRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String,
          Arn: S.String,
          EgressDomain: S.String,
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Description: S.optional(S.String),
          ETag: S.optional(S.String),
          Tags: S.optional(__S(1312, __c41, 0)),
        }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "GetChannelGroupResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
          ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/policy",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetChannelPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ChannelGroupName: S.String, ChannelName: S.String, Policy: S.String }),
      ).annotate({ identifier: "GetChannelPolicyResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
          ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
          OriginEndpointName: S.String.pipe(T.HttpLabel("OriginEndpointName")),
          HarvestJobName: S.String.pipe(T.HttpLabel("HarvestJobName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}/harvestJob/{HarvestJobName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetHarvestJobRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
          ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
          OriginEndpointName: S.String.pipe(T.HttpLabel("OriginEndpointName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetOriginEndpointRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          ChannelGroupName: S.String,
          ChannelName: S.String,
          OriginEndpointName: S.String,
          ContainerType: S.String,
          Segment: __S(166, __c5, 6),
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ResetAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Description: S.optional(S.String),
          StartoverWindowSeconds: S.optional(S.Number),
          HlsManifests: S.optional(__S(184, __c5, 24)),
          LowLatencyHlsManifests: S.optional(__S(184, __c5, 24)),
          DashManifests: S.optional(__S(186, __c5, 26)),
          MssManifests: S.optional(__S(188, __c5, 28)),
          ForceEndpointErrorConfiguration: S.optional(__S(128, __c4, 0)),
          UriSeparator: S.optional(S.String),
          StreamNameOutputMode: S.optional(S.String),
          ETag: S.optional(S.String),
          Tags: S.optional(__S(1312, __c41, 0)),
        }),
      ).annotate({ identifier: "GetOriginEndpointResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
          ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
          OriginEndpointName: S.String.pipe(T.HttpLabel("OriginEndpointName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}/policy",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetOriginEndpointPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String,
          ChannelName: S.String,
          OriginEndpointName: S.String,
          Policy: S.String,
          CdnAuthConfiguration: S.optional(__S(608, __c19, 0)),
        }),
      ).annotate({ identifier: "GetOriginEndpointPolicyResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CdnIdentifierSecretArns: __S(1184, __c37, 0), SecretsRoleArn: S.String }),
      ).annotate({ identifier: "CdnAuthConfiguration" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/channelGroup" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListChannelGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String,
          Arn: S.String,
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Description: S.optional(S.String),
        }),
      ).annotate({ identifier: "ChannelGroupListConfiguration" });
    case 2:
      return S.Array(__S(641, __c20, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(642, __c20, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListChannelGroupsResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/channelGroup/{ChannelGroupName}/channel" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListChannelsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          ChannelName: S.String,
          ChannelGroupName: S.String,
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Description: S.optional(S.String),
          InputType: S.optional(S.String),
          OutputLockingMode: S.optional(S.String),
          MultiviewConfiguration: S.optional(__S(1248, __c39, 0)),
          AttachedMultiviewChannels: S.optional(__S(1184, __c37, 0)),
        }),
      ).annotate({ identifier: "ChannelListConfiguration" });
    case 2:
      return S.Array(__S(673, __c21, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(674, __c21, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListChannelsResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
          ChannelName: S.optional(S.String).pipe(T.HttpQuery("channelName")),
          OriginEndpointName: S.optional(S.String).pipe(T.HttpQuery("originEndpointName")),
          Status: S.optional(S.String).pipe(T.HttpQuery("includeStatus")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/channelGroup/{ChannelGroupName}/harvestJob" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListHarvestJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String,
          ChannelName: S.String,
          OriginEndpointName: S.String,
          Destination: __S(69, __c2, 5),
          HarvestJobName: S.String,
          HarvestedManifests: __S(66, __c2, 2),
          Description: S.optional(S.String),
          ScheduleConfiguration: __S(67, __c2, 3),
          Arn: S.String,
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Status: S.String,
          ErrorMessage: S.optional(S.String),
          ETag: S.optional(S.String),
        }),
      ).annotate({ identifier: "HarvestJob" });
    case 2:
      return S.Array(__S(705, __c22, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(706, __c22, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListHarvestJobsResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
          ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListOriginEndpointsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ManifestName: S.String,
          ChildManifestName: S.optional(S.String),
          Url: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListHlsManifestConfiguration" });
    case 2:
      return S.Array(__S(737, __c23, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ ManifestName: S.String, Url: S.optional(S.String) }),
      ).annotate({ identifier: "ListDashManifestConfiguration" });
    case 4:
      return S.Array(__S(739, __c23, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          ChannelGroupName: S.String,
          ChannelName: S.String,
          OriginEndpointName: S.String,
          ContainerType: S.String,
          Description: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ModifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          HlsManifests: S.optional(__S(738, __c23, 2)),
          LowLatencyHlsManifests: S.optional(__S(738, __c23, 2)),
          DashManifests: S.optional(__S(740, __c23, 4)),
          MssManifests: S.optional(__S(740, __c23, 4)),
          ForceEndpointErrorConfiguration: S.optional(__S(128, __c4, 0)),
          UriSeparator: S.optional(S.String),
          StreamNameOutputMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "OriginEndpointListConfiguration" });
    case 6:
      return S.Array(__S(741, __c23, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ Items: S.optional(__S(742, __c23, 6)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListOriginEndpointsResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Tags: S.optional(__S(1312, __c41, 0)) }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
          ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
          Policy: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/policy",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutChannelPolicyRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
          ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
          OriginEndpointName: S.String.pipe(T.HttpLabel("OriginEndpointName")),
          Policy: S.String,
          CdnAuthConfiguration: S.optional(__S(608, __c19, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}/policy",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutOriginEndpointPolicyRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
          ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/reset",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ResetChannelStateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String,
          ChannelName: S.String,
          Arn: S.String,
          ResetAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "ResetChannelStateResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
          ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
          OriginEndpointName: S.String.pipe(T.HttpLabel("OriginEndpointName")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}/reset",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ResetOriginEndpointStateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String,
          ChannelName: S.String,
          OriginEndpointName: S.String,
          Arn: S.String,
          ResetAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "ResetOriginEndpointStateResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: __S(1312, __c41, 0),
        })
          .pipe(S.encodeKeys({ Tags: "tags" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
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
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: __S(1184, __c37, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
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
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
          ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
          ETag: S.optional(S.String).pipe(T.HttpHeader("x-amzn-update-if-match")),
          Description: S.optional(S.String),
          InputSwitchConfiguration: S.optional(__S(1280, __c40, 0)),
          OutputHeaderConfiguration: S.optional(__S(1281, __c40, 1)),
          MultiviewConfiguration: S.optional(__S(1248, __c39, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateChannelRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MultiviewConfiguration: S.optional(__S(1248, __c39, 0)),
          AttachedMultiviewChannels: S.optional(__S(1184, __c37, 0)),
          Arn: S.String,
          ChannelName: S.String,
          ChannelGroupName: S.String,
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Description: S.optional(S.String),
          IngestEndpoints: S.optional(__S(1283, __c40, 3)),
          InputType: S.optional(S.String),
          ETag: S.optional(S.String),
          Tags: S.optional(__S(1312, __c41, 0)),
          InputSwitchConfiguration: S.optional(__S(1280, __c40, 0)),
          OutputHeaderConfiguration: S.optional(__S(1281, __c40, 1)),
          OutputLockingMode: S.optional(S.String),
        }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "UpdateChannelResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
          ETag: S.optional(S.String).pipe(T.HttpHeader("x-amzn-update-if-match")),
          Description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/channelGroup/{ChannelGroupName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateChannelGroupRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
          ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
          OriginEndpointName: S.String.pipe(T.HttpLabel("OriginEndpointName")),
          ContainerType: S.String,
          Segment: S.optional(__S(166, __c5, 6)),
          Description: S.optional(S.String),
          StartoverWindowSeconds: S.optional(S.Number),
          HlsManifests: S.optional(__S(193, __c6, 1)),
          LowLatencyHlsManifests: S.optional(__S(193, __c6, 1)),
          DashManifests: S.optional(__S(195, __c6, 3)),
          MssManifests: S.optional(__S(197, __c6, 5)),
          ForceEndpointErrorConfiguration: S.optional(__S(128, __c4, 0)),
          UriSeparator: S.optional(S.String),
          StreamNameOutputMode: S.optional(S.String),
          ETag: S.optional(S.String).pipe(T.HttpHeader("x-amzn-update-if-match")),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateOriginEndpointRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          ChannelGroupName: S.String,
          ChannelName: S.String,
          OriginEndpointName: S.String,
          ContainerType: S.String,
          Segment: __S(166, __c5, 6),
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Description: S.optional(S.String),
          StartoverWindowSeconds: S.optional(S.Number),
          HlsManifests: S.optional(__S(184, __c5, 24)),
          LowLatencyHlsManifests: S.optional(__S(184, __c5, 24)),
          MssManifests: S.optional(__S(188, __c5, 28)),
          ForceEndpointErrorConfiguration: S.optional(__S(128, __c4, 0)),
          UriSeparator: S.optional(S.String),
          StreamNameOutputMode: S.optional(S.String),
          ETag: S.optional(S.String),
          Tags: S.optional(__S(1312, __c41, 0)),
          DashManifests: S.optional(__S(186, __c5, 26)),
        }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "UpdateOriginEndpointResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
          ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
          OriginEndpointName: S.String.pipe(T.HttpLabel("OriginEndpointName")),
          HarvestJobName: S.String.pipe(T.HttpLabel("HarvestJobName")),
          ETag: S.optional(S.String).pipe(T.HttpHeader("x-amzn-update-if-match")),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}/harvestJob/{HarvestJobName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelHarvestJobRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "CancelHarvestJobResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
          ChannelName: S.String,
          ClientToken: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-client-token"),
            T.IdempotencyToken(),
          ),
          InputType: S.optional(S.String),
          Description: S.optional(S.String),
          InputSwitchConfiguration: S.optional(__S(1280, __c40, 0)),
          OutputHeaderConfiguration: S.optional(__S(1281, __c40, 1)),
          MultiviewConfiguration: S.optional(__S(1248, __c39, 0)),
          OutputLockingMode: S.optional(S.String),
          Tags: S.optional(__S(1312, __c41, 0)),
        })
          .pipe(S.encodeKeys({ Tags: "tags" }))
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/channelGroup/{ChannelGroupName}/channel" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateChannelRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MultiviewConfiguration: S.optional(__S(1248, __c39, 0)),
          AttachedMultiviewChannels: S.optional(__S(1184, __c37, 0)),
          Arn: S.String,
          ChannelName: S.String,
          ChannelGroupName: S.String,
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          Description: S.optional(S.String),
          IngestEndpoints: S.optional(__S(1283, __c40, 3)),
          InputType: S.optional(S.String),
          ETag: S.optional(S.String),
          Tags: S.optional(__S(1312, __c41, 0)),
          InputSwitchConfiguration: S.optional(__S(1280, __c40, 0)),
          OutputHeaderConfiguration: S.optional(__S(1281, __c40, 1)),
          OutputLockingMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateChannelResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AvailableSources: __S(1184, __c37, 0), AvailableLayouts: __S(1216, __c38, 0) }),
      ).annotate({ identifier: "MultiviewConfiguration" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MQCSInputSwitching: S.optional(S.Boolean),
          PreferredInput: S.optional(S.Number),
        }),
      ).annotate({ identifier: "InputSwitchConfiguration" });
    case 1:
      return S.suspend(() => S.Struct({ PublishMQCS: S.optional(S.Boolean) })).annotate({
        identifier: "OutputHeaderConfiguration",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ Id: S.optional(S.String), Url: S.optional(S.String) }),
      ).annotate({ identifier: "IngestEndpoint" });
    case 3:
      return S.Array(__S(1282, __c40, 2));
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String,
          ClientToken: S.optional(S.String).pipe(
            T.HttpHeader("x-amzn-client-token"),
            T.IdempotencyToken(),
          ),
          Description: S.optional(S.String),
          Tags: S.optional(__S(1312, __c41, 0)),
        })
          .pipe(S.encodeKeys({ Tags: "tags" }))
          .pipe(
            T.all(T.Http({ method: "POST", uri: "/channelGroup" }), svc, auth, proto, ver, rules),
          ),
      ).annotate({ identifier: "CreateChannelGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ChannelGroupName: S.String,
          Arn: S.String,
          EgressDomain: S.String,
          CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ETag: S.optional(S.String),
          Description: S.optional(S.String),
          Tags: S.optional(__S(1312, __c41, 0)),
        }),
      ).annotate({ identifier: "CreateChannelGroupResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
