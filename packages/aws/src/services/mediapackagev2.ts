import type * as HttpClient from "effect/unstable/http/HttpClient";
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
  sdkId: "MediaPackageV2",
  target: "mediapackagev2",
  version: "2022-12-25",
  sigv4: "mediapackagev2",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://mediapackagev2.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://mediapackagev2.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message?: string;
    readonly ConflictExceptionType?: ConflictExceptionType;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message?: string;
    readonly ResourceTypeNotFound?: ResourceTypeNotFound;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError("ValidationException")<{
    readonly message?: string;
    readonly ValidationExceptionType?: ValidationExceptionType;
  }> {}
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
export type InputType = "HLS" | "CMAF" | (string & {});
export type ResourceDescription = string;
export interface InputSwitchConfiguration {
  MQCSInputSwitching?: boolean;
  PreferredInput?: number;
}
export interface OutputHeaderConfiguration {
  PublishMQCS?: boolean;
}
export type OutputLockingMode =
  | "EPOCH_LOCKED"
  | "NON_EPOCH_LOCKED"
  | (string & {});
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
  OutputLockingMode?: OutputLockingMode;
  Tags?: { [key: string]: string | undefined };
}
export interface IngestEndpoint {
  Id?: string;
  Url?: string;
}
export type IngestEndpointList = IngestEndpoint[];
export interface CreateChannelResponse {
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
export type HarvestedLowLatencyHlsManifestsList =
  HarvestedLowLatencyHlsManifest[];
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
export interface SpekeKeyProvider {
  EncryptionContractConfiguration: EncryptionContractConfiguration;
  ResourceId: string;
  DrmSystems: DrmSystem[];
  RoleArn: string;
  Url: string;
  CertificateArn?: string;
}
export interface Encryption {
  ConstantInitializationVector?: string;
  EncryptionMethod: EncryptionMethod;
  KeyRotationIntervalSeconds?: number;
  CmafExcludeSegmentDrmMetadata?: boolean;
  SpekeKeyProvider: SpekeKeyProvider;
}
export type OutputTimestampMode =
  | "PASSTHROUGH"
  | "REBASED_TO_CHANNEL_START"
  | (string & {});
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
export interface FilterConfiguration {
  ManifestFilter?: string;
  DrmSettings?: string;
  Start?: Date;
  End?: Date;
  TimeDelaySeconds?: number;
  ClipStartTime?: Date;
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
export type CreateLowLatencyHlsManifests =
  CreateLowLatencyHlsManifestConfiguration[];
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
export type DashAvailabilityStartTimeConfiguration = {
  FixedAvailabilityStartTime: Date;
};
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
export type ListLowLatencyHlsManifests =
  ListLowLatencyHlsManifestConfiguration[];
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
}
export interface UpdateChannelResponse {
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
  descriptor: {
    service: svc,
    http: "PUT /channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}/harvestJob/{HarvestJobName}",
    input: {
      ChannelGroupName: 0,
      ChannelName: 0,
      OriginEndpointName: 0,
      HarvestJobName: 0,
      ETag: D.m({ header: "x-amzn-update-if-match" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /channelGroup/{ChannelGroupName}/channel",
    input: {
      ChannelGroupName: 0,
      ChannelName: 0,
      ClientToken: D.m({ header: "x-amzn-client-token", idempotency: true }),
      InputType: 0,
      Description: 0,
      InputSwitchConfiguration: i_InputSwitchConfiguration,
      OutputHeaderConfiguration: i_OutputHeaderConfiguration,
      OutputLockingMode: 0,
      Tags: D.m({ wire: "tags" }),
    },
    output: { CreatedAt: D.ts, ModifiedAt: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /channelGroup",
    input: {
      ChannelGroupName: 0,
      ClientToken: D.m({ header: "x-amzn-client-token", idempotency: true }),
      Description: 0,
      Tags: D.m({ wire: "tags" }),
    },
    output: { CreatedAt: D.ts, ModifiedAt: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}/harvestJob",
    input: {
      ChannelGroupName: 0,
      ChannelName: 0,
      OriginEndpointName: 0,
      Description: 0,
      HarvestedManifests: {
        HlsManifests: D.list({ ManifestName: 0 }),
        DashManifests: D.list({ ManifestName: 0 }),
        LowLatencyHlsManifests: D.list({ ManifestName: 0 }),
      },
      ScheduleConfiguration: { StartTime: 0, EndTime: 0 },
      Destination: { S3Destination: { BucketName: 0, DestinationPath: 0 } },
      ClientToken: D.m({ header: "x-amzn-client-token", idempotency: true }),
      HarvestJobName: 0,
      Tags: 0,
    },
    output: {
      ScheduleConfiguration: o_HarvesterScheduleConfiguration,
      CreatedAt: D.ts,
      ModifiedAt: D.ts,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint",
    input: {
      ChannelGroupName: 0,
      ChannelName: 0,
      OriginEndpointName: 0,
      ContainerType: 0,
      Segment: i_Segment,
      ClientToken: D.m({ header: "x-amzn-client-token", idempotency: true }),
      Description: 0,
      StartoverWindowSeconds: 0,
      HlsManifests: D.list(i_CreateHlsManifestConfiguration),
      LowLatencyHlsManifests: D.list(
        i_CreateLowLatencyHlsManifestConfiguration,
      ),
      DashManifests: D.list(i_CreateDashManifestConfiguration),
      MssManifests: D.list(i_CreateMssManifestConfiguration),
      ForceEndpointErrorConfiguration: i_ForceEndpointErrorConfiguration,
      UriSeparator: 0,
      StreamNameOutputMode: 0,
      Tags: 0,
    },
    output: {
      CreatedAt: D.ts,
      ModifiedAt: D.ts,
      HlsManifests: D.list(o_GetHlsManifestConfiguration),
      LowLatencyHlsManifests: D.list(o_GetLowLatencyHlsManifestConfiguration),
      DashManifests: D.list(o_GetDashManifestConfiguration),
      MssManifests: D.list(o_GetMssManifestConfiguration),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /channelGroup/{ChannelGroupName}/channel/{ChannelName}/",
    input: { ChannelGroupName: 0, ChannelName: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /channelGroup/{ChannelGroupName}",
    input: { ChannelGroupName: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /channelGroup/{ChannelGroupName}/channel/{ChannelName}/policy",
    input: { ChannelGroupName: 0, ChannelName: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}",
    input: { ChannelGroupName: 0, ChannelName: 0, OriginEndpointName: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOriginEndpoint",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}/policy",
    input: { ChannelGroupName: 0, ChannelName: 0, OriginEndpointName: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /channelGroup/{ChannelGroupName}/channel/{ChannelName}/",
    input: { ChannelGroupName: 0, ChannelName: 0 },
    output: { CreatedAt: D.ts, ModifiedAt: D.ts, ResetAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /channelGroup/{ChannelGroupName}",
    input: { ChannelGroupName: 0 },
    output: { CreatedAt: D.ts, ModifiedAt: D.ts, Tags: D.m({ wire: "tags" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /channelGroup/{ChannelGroupName}/channel/{ChannelName}/policy",
    input: { ChannelGroupName: 0, ChannelName: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}/harvestJob/{HarvestJobName}",
    input: {
      ChannelGroupName: 0,
      ChannelName: 0,
      OriginEndpointName: 0,
      HarvestJobName: 0,
    },
    output: {
      ScheduleConfiguration: o_HarvesterScheduleConfiguration,
      CreatedAt: D.ts,
      ModifiedAt: D.ts,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}",
    input: { ChannelGroupName: 0, ChannelName: 0, OriginEndpointName: 0 },
    output: {
      CreatedAt: D.ts,
      ModifiedAt: D.ts,
      ResetAt: D.ts,
      HlsManifests: D.list(o_GetHlsManifestConfiguration),
      LowLatencyHlsManifests: D.list(o_GetLowLatencyHlsManifestConfiguration),
      DashManifests: D.list(o_GetDashManifestConfiguration),
      MssManifests: D.list(o_GetMssManifestConfiguration),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}/policy",
    input: { ChannelGroupName: 0, ChannelName: 0, OriginEndpointName: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /channelGroup",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { Items: D.list({ CreatedAt: D.ts, ModifiedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /channelGroup/{ChannelGroupName}/channel",
    input: {
      ChannelGroupName: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { Items: D.list({ CreatedAt: D.ts, ModifiedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /channelGroup/{ChannelGroupName}/harvestJob",
    input: {
      ChannelGroupName: 0,
      ChannelName: D.m({ query: "channelName" }),
      OriginEndpointName: D.m({ query: "originEndpointName" }),
      Status: D.m({ query: "includeStatus" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Items: D.list({
        ScheduleConfiguration: o_HarvesterScheduleConfiguration,
        CreatedAt: D.ts,
        ModifiedAt: D.ts,
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint",
    input: {
      ChannelGroupName: 0,
      ChannelName: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { Items: D.list({ CreatedAt: D.ts, ModifiedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /tags/{ResourceArn}",
    input: { ResourceArn: 0 },
    output: { Tags: D.m({ wire: "tags" }) },
  },
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /channelGroup/{ChannelGroupName}/channel/{ChannelName}/policy",
    input: { ChannelGroupName: 0, ChannelName: 0, Policy: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}/policy",
    input: {
      ChannelGroupName: 0,
      ChannelName: 0,
      OriginEndpointName: 0,
      Policy: 0,
      CdnAuthConfiguration: { CdnIdentifierSecretArns: 0, SecretsRoleArn: 0 },
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /channelGroup/{ChannelGroupName}/channel/{ChannelName}/reset",
    input: { ChannelGroupName: 0, ChannelName: 0 },
    output: { ResetAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}/reset",
    input: { ChannelGroupName: 0, ChannelName: 0, OriginEndpointName: 0 },
    output: { ResetAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: D.m({ wire: "tags" }) },
    body: true,
  },
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /channelGroup/{ChannelGroupName}/channel/{ChannelName}/",
    input: {
      ChannelGroupName: 0,
      ChannelName: 0,
      ETag: D.m({ header: "x-amzn-update-if-match" }),
      Description: 0,
      InputSwitchConfiguration: i_InputSwitchConfiguration,
      OutputHeaderConfiguration: i_OutputHeaderConfiguration,
    },
    output: { CreatedAt: D.ts, ModifiedAt: D.ts, Tags: D.m({ wire: "tags" }) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /channelGroup/{ChannelGroupName}",
    input: {
      ChannelGroupName: 0,
      ETag: D.m({ header: "x-amzn-update-if-match" }),
      Description: 0,
    },
    output: { CreatedAt: D.ts, ModifiedAt: D.ts, Tags: D.m({ wire: "tags" }) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}",
    input: {
      ChannelGroupName: 0,
      ChannelName: 0,
      OriginEndpointName: 0,
      ContainerType: 0,
      Segment: i_Segment,
      Description: 0,
      StartoverWindowSeconds: 0,
      HlsManifests: D.list(i_CreateHlsManifestConfiguration),
      LowLatencyHlsManifests: D.list(
        i_CreateLowLatencyHlsManifestConfiguration,
      ),
      DashManifests: D.list(i_CreateDashManifestConfiguration),
      MssManifests: D.list(i_CreateMssManifestConfiguration),
      ForceEndpointErrorConfiguration: i_ForceEndpointErrorConfiguration,
      UriSeparator: 0,
      StreamNameOutputMode: 0,
      ETag: D.m({ header: "x-amzn-update-if-match" }),
    },
    output: {
      CreatedAt: D.ts,
      ModifiedAt: D.ts,
      HlsManifests: D.list(o_GetHlsManifestConfiguration),
      LowLatencyHlsManifests: D.list(o_GetLowLatencyHlsManifestConfiguration),
      MssManifests: D.list(o_GetMssManifestConfiguration),
      Tags: D.m({ wire: "tags" }),
      DashManifests: D.list(o_GetDashManifestConfiguration),
    },
    body: true,
  },
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
})) as any;

const i_CreateDashManifestConfiguration: D.LazyStruct = () => ({
  ManifestName: 0,
  ManifestWindowSeconds: 0,
  FilterConfiguration: i_FilterConfiguration,
  MinUpdatePeriodSeconds: 0,
  MinBufferTimeSeconds: 0,
  SuggestedPresentationDelaySeconds: 0,
  SegmentTemplateFormat: 0,
  PeriodTriggers: 0,
  ScteDash: { AdMarkerDash: 0, ScteInManifests: 0 },
  DrmSignaling: 0,
  UtcTiming: { TimingMode: 0, TimingSource: 0 },
  Profiles: 0,
  BaseUrls: D.list({
    Url: 0,
    ServiceLocation: 0,
    DvbPriority: 0,
    DvbWeight: 0,
  }),
  ProgramInformation: {
    Title: 0,
    Source: 0,
    Copyright: 0,
    LanguageCode: 0,
    MoreInformationUrl: 0,
  },
  DvbSettings: {
    FontDownload: { Url: 0, MimeType: 0, FontFamily: 0 },
    ErrorMetrics: D.list({ ReportingUrl: 0, Probability: 0 }),
  },
  Compactness: 0,
  AudioTimelinePattern: 0,
  SubtitleConfiguration: { TtmlConfiguration: { TtmlProfile: 0 } },
  UriPathType: 0,
  AvailabilityStartTimeConfiguration: {
    FixedAvailabilityStartTime: D.tsAs("date-time"),
  },
});
const i_CreateHlsManifestConfiguration: D.LazyStruct = () => ({
  ManifestName: 0,
  ChildManifestName: 0,
  ScteHls: i_ScteHls,
  StartTag: i_StartTag,
  ManifestWindowSeconds: 0,
  ProgramDateTimeIntervalSeconds: 0,
  FilterConfiguration: i_FilterConfiguration,
  UrlEncodeChildManifest: 0,
  UriPathType: 0,
});
const i_CreateLowLatencyHlsManifestConfiguration: D.LazyStruct = () => ({
  ManifestName: 0,
  ChildManifestName: 0,
  ScteHls: i_ScteHls,
  StartTag: i_StartTag,
  ManifestWindowSeconds: 0,
  ProgramDateTimeIntervalSeconds: 0,
  FilterConfiguration: i_FilterConfiguration,
  UrlEncodeChildManifest: 0,
  UriPathType: 0,
});
const i_CreateMssManifestConfiguration: D.LazyStruct = () => ({
  ManifestName: 0,
  ManifestWindowSeconds: 0,
  FilterConfiguration: i_FilterConfiguration,
  ManifestLayout: 0,
});
const i_ForceEndpointErrorConfiguration: D.LazyStruct = () => ({
  EndpointErrorConditions: 0,
});
const i_InputSwitchConfiguration: D.LazyStruct = () => ({
  MQCSInputSwitching: 0,
  PreferredInput: 0,
});
const i_OutputHeaderConfiguration: D.LazyStruct = () => ({ PublishMQCS: 0 });
const i_Segment: D.LazyStruct = () => ({
  SegmentDurationSeconds: 0,
  SegmentName: 0,
  TsUseAudioRenditionGroup: 0,
  IncludeIframeOnlyStreams: 0,
  TsIncludeDvbSubtitles: 0,
  Scte: { ScteFilter: 0, ScteInSegments: 0, CustomAdTypes: 0 },
  Encryption: {
    ConstantInitializationVector: 0,
    EncryptionMethod: {
      TsEncryptionMethod: 0,
      CmafEncryptionMethod: 0,
      IsmEncryptionMethod: 0,
    },
    KeyRotationIntervalSeconds: 0,
    CmafExcludeSegmentDrmMetadata: 0,
    SpekeKeyProvider: {
      EncryptionContractConfiguration: {
        PresetSpeke20Audio: 0,
        PresetSpeke20Video: 0,
      },
      ResourceId: 0,
      DrmSystems: 0,
      RoleArn: 0,
      Url: 0,
      CertificateArn: 0,
    },
  },
  OutputTimestampMode: 0,
});
const o_GetDashManifestConfiguration: D.LazyStruct = () => ({
  FilterConfiguration: o_FilterConfiguration,
  AvailabilityStartTimeConfiguration: { FixedAvailabilityStartTime: D.ts },
});
const o_GetHlsManifestConfiguration: D.LazyStruct = () => ({
  FilterConfiguration: o_FilterConfiguration,
});
const o_GetLowLatencyHlsManifestConfiguration: D.LazyStruct = () => ({
  FilterConfiguration: o_FilterConfiguration,
});
const o_GetMssManifestConfiguration: D.LazyStruct = () => ({
  FilterConfiguration: o_FilterConfiguration,
});
const o_HarvesterScheduleConfiguration: D.LazyStruct = () => ({
  StartTime: D.ts,
  EndTime: D.ts,
});
const i_FilterConfiguration: D.LazyStruct = () => ({
  ManifestFilter: 0,
  DrmSettings: 0,
  Start: 0,
  End: 0,
  TimeDelaySeconds: 0,
  ClipStartTime: 0,
});
const i_ScteHls: D.LazyStruct = () => ({ AdMarkerHls: 0, ScteInManifests: 0 });
const i_StartTag: D.LazyStruct = () => ({ TimeOffset: 0, Precise: 0 });
const o_FilterConfiguration: D.LazyStruct = () => ({
  Start: D.ts,
  End: D.ts,
  ClipStartTime: D.ts,
});
