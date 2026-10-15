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
  sdkId: "MediaPackage",
  serviceShapeName: "MediaPackage",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "mediapackage" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-10-12");
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
              `https://mediapackage-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://mediapackage-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://mediapackage.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://mediapackage.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://mediapackage.{R}.{D}","properties":{},"headers":{}}');

export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnprocessableEntityException
  extends /*@__PURE__*/ S.TaggedError<UnprocessableEntityException>()(
    "UnprocessableEntityException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(422),
  ).pipe(C.withBadRequestError) {}
export interface EgressAccessLogs {
  LogGroupName?: string;
}
export interface IngressAccessLogs {
  LogGroupName?: string;
}
export interface ConfigureLogsRequest {
  EgressAccessLogs?: EgressAccessLogs;
  Id: string;
  IngressAccessLogs?: IngressAccessLogs;
}
export type SensitiveString = string | redacted.Redacted<string>;
export interface IngestEndpoint {
  Id?: string;
  Password?: string | redacted.Redacted<string>;
  Url?: string;
  Username?: string | redacted.Redacted<string>;
}
export type __listOfIngestEndpoint = IngestEndpoint[];
const __listOfIngestEndpoint = /*@__PURE__*/ __L.at(__c17, 2);
export interface HlsIngest {
  IngestEndpoints?: IngestEndpoint[];
}
export type Tags = { [key: string]: string | undefined };
export interface ConfigureLogsResponse {
  Arn?: string;
  CreatedAt?: string;
  Description?: string;
  EgressAccessLogs?: EgressAccessLogs;
  HlsIngest?: HlsIngest;
  Id?: string;
  IngressAccessLogs?: IngressAccessLogs;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateChannelRequest {
  Description?: string;
  Id?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateChannelResponse {
  Arn?: string;
  CreatedAt?: string;
  Description?: string;
  EgressAccessLogs?: EgressAccessLogs;
  HlsIngest?: HlsIngest;
  Id?: string;
  IngressAccessLogs?: IngressAccessLogs;
  Tags?: { [key: string]: string | undefined };
}
export interface S3Destination {
  BucketName?: string;
  ManifestKey?: string;
  RoleArn?: string;
}
export interface CreateHarvestJobRequest {
  EndTime?: string;
  Id?: string;
  OriginEndpointId?: string;
  S3Destination?: S3Destination;
  StartTime?: string;
}
export type Status = "IN_PROGRESS" | "SUCCEEDED" | "FAILED" | (string & {});
export interface CreateHarvestJobResponse {
  Arn?: string;
  ChannelId?: string;
  CreatedAt?: string;
  EndTime?: string;
  Id?: string;
  OriginEndpointId?: string;
  S3Destination?: S3Destination & { BucketName: string; ManifestKey: string; RoleArn: string };
  StartTime?: string;
  Status?: Status;
}
export interface Authorization {
  CdnIdentifierSecret?: string;
  SecretsRoleArn?: string;
}
export type CmafEncryptionMethod = "SAMPLE_AES" | "AES_CTR" | (string & {});
export type PresetSpeke20Audio =
  | "PRESET-AUDIO-1"
  | "PRESET-AUDIO-2"
  | "PRESET-AUDIO-3"
  | "SHARED"
  | "UNENCRYPTED"
  | (string & {});
export type PresetSpeke20Video =
  | "PRESET-VIDEO-1"
  | "PRESET-VIDEO-2"
  | "PRESET-VIDEO-3"
  | "PRESET-VIDEO-4"
  | "PRESET-VIDEO-5"
  | "PRESET-VIDEO-6"
  | "PRESET-VIDEO-7"
  | "PRESET-VIDEO-8"
  | "SHARED"
  | "UNENCRYPTED"
  | (string & {});
export interface EncryptionContractConfiguration {
  PresetSpeke20Audio?: PresetSpeke20Audio;
  PresetSpeke20Video?: PresetSpeke20Video;
}
export type __listOf__string = string[];
const __listOf__string = /*@__PURE__*/ __L.at(__c23, 0);
export interface SpekeKeyProvider {
  CertificateArn?: string;
  EncryptionContractConfiguration?: EncryptionContractConfiguration;
  ResourceId?: string;
  RoleArn?: string;
  SystemIds?: string[];
  Url?: string;
}
export interface CmafEncryption {
  ConstantInitializationVector?: string;
  EncryptionMethod?: CmafEncryptionMethod;
  KeyRotationIntervalSeconds?: number;
  SpekeKeyProvider?: SpekeKeyProvider;
}
export type AdMarkers = "NONE" | "SCTE35_ENHANCED" | "PASSTHROUGH" | "DATERANGE" | (string & {});
export type __AdTriggersElement =
  | "SPLICE_INSERT"
  | "BREAK"
  | "PROVIDER_ADVERTISEMENT"
  | "DISTRIBUTOR_ADVERTISEMENT"
  | "PROVIDER_PLACEMENT_OPPORTUNITY"
  | "DISTRIBUTOR_PLACEMENT_OPPORTUNITY"
  | "PROVIDER_OVERLAY_PLACEMENT_OPPORTUNITY"
  | "DISTRIBUTOR_OVERLAY_PLACEMENT_OPPORTUNITY"
  | (string & {});
const __AdTriggersElement = S.String;

export type AdTriggers = __AdTriggersElement[];
export type AdsOnDeliveryRestrictions =
  | "NONE"
  | "RESTRICTED"
  | "UNRESTRICTED"
  | "BOTH"
  | (string & {});
export type PlaylistType = "NONE" | "EVENT" | "VOD" | (string & {});
export interface HlsManifestCreateOrUpdateParameters {
  AdMarkers?: AdMarkers;
  AdTriggers?: __AdTriggersElement[];
  AdsOnDeliveryRestrictions?: AdsOnDeliveryRestrictions;
  Id?: string;
  IncludeIframeOnlyStream?: boolean;
  ManifestName?: string;
  PlaylistType?: PlaylistType;
  PlaylistWindowSeconds?: number;
  ProgramDateTimeIntervalSeconds?: number;
}
export type __listOfHlsManifestCreateOrUpdateParameters = HlsManifestCreateOrUpdateParameters[];
const __listOfHlsManifestCreateOrUpdateParameters = /*@__PURE__*/ __L.at(__c25, 1);
export type StreamOrder =
  | "ORIGINAL"
  | "VIDEO_BITRATE_ASCENDING"
  | "VIDEO_BITRATE_DESCENDING"
  | (string & {});
export interface StreamSelection {
  MaxVideoBitsPerSecond?: number;
  MinVideoBitsPerSecond?: number;
  StreamOrder?: StreamOrder;
}
export interface CmafPackageCreateOrUpdateParameters {
  Encryption?: CmafEncryption;
  HlsManifests?: HlsManifestCreateOrUpdateParameters[];
  SegmentDurationSeconds?: number;
  SegmentPrefix?: string;
  StreamSelection?: StreamSelection;
}
export interface DashEncryption {
  KeyRotationIntervalSeconds?: number;
  SpekeKeyProvider?: SpekeKeyProvider;
}
export type ManifestLayout = "FULL" | "COMPACT" | "DRM_TOP_LEVEL_COMPACT" | (string & {});
export type __PeriodTriggersElement = "ADS" | (string & {});
export type __listOf__PeriodTriggersElement = __PeriodTriggersElement[];
const __listOf__PeriodTriggersElement = __S(
  388,
  __c24,
  4,
) as any as S.Schema<__listOf__PeriodTriggersElement>;
export type Profile = "NONE" | "HBBTV_1_5" | "HYBRIDCAST" | "DVB_DASH_2014" | (string & {});
export type SegmentTemplateFormat =
  | "NUMBER_WITH_TIMELINE"
  | "TIME_WITH_TIMELINE"
  | "NUMBER_WITH_DURATION"
  | (string & {});
export type UtcTiming = "NONE" | "HTTP-HEAD" | "HTTP-ISO" | "HTTP-XSDATE" | (string & {});
export interface DashPackage {
  AdTriggers?: __AdTriggersElement[];
  AdsOnDeliveryRestrictions?: AdsOnDeliveryRestrictions;
  Encryption?: DashEncryption;
  IncludeIframeOnlyStream?: boolean;
  ManifestLayout?: ManifestLayout;
  ManifestWindowSeconds?: number;
  MinBufferTimeSeconds?: number;
  MinUpdatePeriodSeconds?: number;
  PeriodTriggers?: __PeriodTriggersElement[];
  Profile?: Profile;
  SegmentDurationSeconds?: number;
  SegmentTemplateFormat?: SegmentTemplateFormat;
  StreamSelection?: StreamSelection;
  SuggestedPresentationDelaySeconds?: number;
  UtcTiming?: UtcTiming;
  UtcTimingUri?: string;
}
export type EncryptionMethod = "AES_128" | "SAMPLE_AES" | (string & {});
export interface HlsEncryption {
  ConstantInitializationVector?: string;
  EncryptionMethod?: EncryptionMethod;
  KeyRotationIntervalSeconds?: number;
  RepeatExtXKey?: boolean;
  SpekeKeyProvider?: SpekeKeyProvider;
}
export interface HlsPackage {
  AdMarkers?: AdMarkers;
  AdTriggers?: __AdTriggersElement[];
  AdsOnDeliveryRestrictions?: AdsOnDeliveryRestrictions;
  Encryption?: HlsEncryption;
  IncludeDvbSubtitles?: boolean;
  IncludeIframeOnlyStream?: boolean;
  PlaylistType?: PlaylistType;
  PlaylistWindowSeconds?: number;
  ProgramDateTimeIntervalSeconds?: number;
  SegmentDurationSeconds?: number;
  StreamSelection?: StreamSelection;
  UseAudioRenditionGroup?: boolean;
}
export interface MssEncryption {
  SpekeKeyProvider?: SpekeKeyProvider;
}
export interface MssPackage {
  Encryption?: MssEncryption;
  ManifestWindowSeconds?: number;
  SegmentDurationSeconds?: number;
  StreamSelection?: StreamSelection;
}
export type Origination = "ALLOW" | "DENY" | (string & {});
export interface CreateOriginEndpointRequest {
  Authorization?: Authorization;
  ChannelId?: string;
  CmafPackage?: CmafPackageCreateOrUpdateParameters;
  DashPackage?: DashPackage;
  Description?: string;
  HlsPackage?: HlsPackage;
  Id?: string;
  ManifestName?: string;
  MssPackage?: MssPackage;
  Origination?: Origination;
  StartoverWindowSeconds?: number;
  Tags?: { [key: string]: string | undefined };
  TimeDelaySeconds?: number;
  Whitelist?: string[];
}
export interface HlsManifest {
  AdMarkers?: AdMarkers;
  Id?: string;
  IncludeIframeOnlyStream?: boolean;
  ManifestName?: string;
  PlaylistType?: PlaylistType;
  PlaylistWindowSeconds?: number;
  ProgramDateTimeIntervalSeconds?: number;
  Url?: string;
  AdTriggers?: __AdTriggersElement[];
  AdsOnDeliveryRestrictions?: AdsOnDeliveryRestrictions;
}
export type __listOfHlsManifest = HlsManifest[];
const __listOfHlsManifest = /*@__PURE__*/ __L.at(__c24, 13);
export interface CmafPackage {
  Encryption?: CmafEncryption;
  HlsManifests?: HlsManifest[];
  SegmentDurationSeconds?: number;
  SegmentPrefix?: string;
  StreamSelection?: StreamSelection;
}
export interface CreateOriginEndpointResponse {
  Arn?: string;
  Authorization?: Authorization & { CdnIdentifierSecret: string; SecretsRoleArn: string };
  ChannelId?: string;
  CmafPackage?: CmafPackage & {
    Encryption: CmafEncryption & {
      SpekeKeyProvider: SpekeKeyProvider & {
        ResourceId: string;
        RoleArn: string;
        SystemIds: __listOf__string;
        Url: string;
        EncryptionContractConfiguration: EncryptionContractConfiguration & {
          PresetSpeke20Audio: PresetSpeke20Audio;
          PresetSpeke20Video: PresetSpeke20Video;
        };
      };
    };
    HlsManifests: (HlsManifest & { Id: string })[];
  };
  CreatedAt?: string;
  DashPackage?: DashPackage & {
    Encryption: DashEncryption & {
      SpekeKeyProvider: SpekeKeyProvider & {
        ResourceId: string;
        RoleArn: string;
        SystemIds: __listOf__string;
        Url: string;
        EncryptionContractConfiguration: EncryptionContractConfiguration & {
          PresetSpeke20Audio: PresetSpeke20Audio;
          PresetSpeke20Video: PresetSpeke20Video;
        };
      };
    };
  };
  Description?: string;
  HlsPackage?: HlsPackage & {
    Encryption: HlsEncryption & {
      SpekeKeyProvider: SpekeKeyProvider & {
        ResourceId: string;
        RoleArn: string;
        SystemIds: __listOf__string;
        Url: string;
        EncryptionContractConfiguration: EncryptionContractConfiguration & {
          PresetSpeke20Audio: PresetSpeke20Audio;
          PresetSpeke20Video: PresetSpeke20Video;
        };
      };
    };
  };
  Id?: string;
  ManifestName?: string;
  MssPackage?: MssPackage & {
    Encryption: MssEncryption & {
      SpekeKeyProvider: SpekeKeyProvider & {
        ResourceId: string;
        RoleArn: string;
        SystemIds: __listOf__string;
        Url: string;
        EncryptionContractConfiguration: EncryptionContractConfiguration & {
          PresetSpeke20Audio: PresetSpeke20Audio;
          PresetSpeke20Video: PresetSpeke20Video;
        };
      };
    };
  };
  Origination?: Origination;
  StartoverWindowSeconds?: number;
  Tags?: { [key: string]: string | undefined };
  TimeDelaySeconds?: number;
  Url?: string;
  Whitelist?: string[];
}
export interface DeleteChannelRequest {
  Id: string;
}
export interface DeleteChannelResponse {}
export interface DeleteOriginEndpointRequest {
  Id: string;
}
export interface DeleteOriginEndpointResponse {}
export interface DescribeChannelRequest {
  Id: string;
}
export interface DescribeChannelResponse {
  Arn?: string;
  CreatedAt?: string;
  Description?: string;
  EgressAccessLogs?: EgressAccessLogs;
  HlsIngest?: HlsIngest;
  Id?: string;
  IngressAccessLogs?: IngressAccessLogs;
  Tags?: { [key: string]: string | undefined };
}
export interface DescribeHarvestJobRequest {
  Id: string;
}
export interface DescribeHarvestJobResponse {
  Arn?: string;
  ChannelId?: string;
  CreatedAt?: string;
  EndTime?: string;
  Id?: string;
  OriginEndpointId?: string;
  S3Destination?: S3Destination & { BucketName: string; ManifestKey: string; RoleArn: string };
  StartTime?: string;
  Status?: Status;
}
export interface DescribeOriginEndpointRequest {
  Id: string;
}
export interface DescribeOriginEndpointResponse {
  Arn?: string;
  Authorization?: Authorization & { CdnIdentifierSecret: string; SecretsRoleArn: string };
  ChannelId?: string;
  CmafPackage?: CmafPackage & {
    Encryption: CmafEncryption & {
      SpekeKeyProvider: SpekeKeyProvider & {
        ResourceId: string;
        RoleArn: string;
        SystemIds: __listOf__string;
        Url: string;
        EncryptionContractConfiguration: EncryptionContractConfiguration & {
          PresetSpeke20Audio: PresetSpeke20Audio;
          PresetSpeke20Video: PresetSpeke20Video;
        };
      };
    };
    HlsManifests: (HlsManifest & { Id: string })[];
  };
  CreatedAt?: string;
  DashPackage?: DashPackage & {
    Encryption: DashEncryption & {
      SpekeKeyProvider: SpekeKeyProvider & {
        ResourceId: string;
        RoleArn: string;
        SystemIds: __listOf__string;
        Url: string;
        EncryptionContractConfiguration: EncryptionContractConfiguration & {
          PresetSpeke20Audio: PresetSpeke20Audio;
          PresetSpeke20Video: PresetSpeke20Video;
        };
      };
    };
  };
  Description?: string;
  HlsPackage?: HlsPackage & {
    Encryption: HlsEncryption & {
      SpekeKeyProvider: SpekeKeyProvider & {
        ResourceId: string;
        RoleArn: string;
        SystemIds: __listOf__string;
        Url: string;
        EncryptionContractConfiguration: EncryptionContractConfiguration & {
          PresetSpeke20Audio: PresetSpeke20Audio;
          PresetSpeke20Video: PresetSpeke20Video;
        };
      };
    };
  };
  Id?: string;
  ManifestName?: string;
  MssPackage?: MssPackage & {
    Encryption: MssEncryption & {
      SpekeKeyProvider: SpekeKeyProvider & {
        ResourceId: string;
        RoleArn: string;
        SystemIds: __listOf__string;
        Url: string;
        EncryptionContractConfiguration: EncryptionContractConfiguration & {
          PresetSpeke20Audio: PresetSpeke20Audio;
          PresetSpeke20Video: PresetSpeke20Video;
        };
      };
    };
  };
  Origination?: Origination;
  StartoverWindowSeconds?: number;
  Tags?: { [key: string]: string | undefined };
  TimeDelaySeconds?: number;
  Url?: string;
  Whitelist?: string[];
}
export type MaxResults = number;
export interface ListChannelsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface Channel {
  Arn?: string;
  CreatedAt?: string;
  Description?: string;
  EgressAccessLogs?: EgressAccessLogs;
  HlsIngest?: HlsIngest;
  Id?: string;
  IngressAccessLogs?: IngressAccessLogs;
  Tags?: { [key: string]: string | undefined };
}
export type __listOfChannel = Channel[];
const __listOfChannel = /*@__PURE__*/ __L.at(__c6, 1);
export interface ListChannelsResponse {
  Channels?: Channel[];
  NextToken?: string;
}
export interface ListHarvestJobsRequest {
  IncludeChannelId?: string;
  IncludeStatus?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface HarvestJob {
  Arn?: string;
  ChannelId?: string;
  CreatedAt?: string;
  EndTime?: string;
  Id?: string;
  OriginEndpointId?: string;
  S3Destination?: S3Destination;
  StartTime?: string;
  Status?: Status;
}
export type __listOfHarvestJob = HarvestJob[];
const __listOfHarvestJob = /*@__PURE__*/ __L.at(__c7, 1);
export interface ListHarvestJobsResponse {
  HarvestJobs?: (HarvestJob & {
    S3Destination: S3Destination & { BucketName: string; ManifestKey: string; RoleArn: string };
  })[];
  NextToken?: string;
}
export interface ListOriginEndpointsRequest {
  ChannelId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface OriginEndpoint {
  Arn?: string;
  Authorization?: Authorization;
  ChannelId?: string;
  CmafPackage?: CmafPackage;
  CreatedAt?: string;
  DashPackage?: DashPackage;
  Description?: string;
  HlsPackage?: HlsPackage;
  Id?: string;
  ManifestName?: string;
  MssPackage?: MssPackage;
  Origination?: Origination;
  StartoverWindowSeconds?: number;
  Tags?: { [key: string]: string | undefined };
  TimeDelaySeconds?: number;
  Url?: string;
  Whitelist?: string[];
}
export type __listOfOriginEndpoint = OriginEndpoint[];
const __listOfOriginEndpoint = /*@__PURE__*/ __L.at(__c8, 1);
export interface ListOriginEndpointsResponse {
  NextToken?: string;
  OriginEndpoints?: (OriginEndpoint & {
    Authorization: Authorization & { CdnIdentifierSecret: string; SecretsRoleArn: string };
    CmafPackage: CmafPackage & {
      Encryption: CmafEncryption & {
        SpekeKeyProvider: SpekeKeyProvider & {
          ResourceId: string;
          RoleArn: string;
          SystemIds: __listOf__string;
          Url: string;
          EncryptionContractConfiguration: EncryptionContractConfiguration & {
            PresetSpeke20Audio: PresetSpeke20Audio;
            PresetSpeke20Video: PresetSpeke20Video;
          };
        };
      };
      HlsManifests: (HlsManifest & { Id: string })[];
    };
    DashPackage: DashPackage & {
      Encryption: DashEncryption & {
        SpekeKeyProvider: SpekeKeyProvider & {
          ResourceId: string;
          RoleArn: string;
          SystemIds: __listOf__string;
          Url: string;
          EncryptionContractConfiguration: EncryptionContractConfiguration & {
            PresetSpeke20Audio: PresetSpeke20Audio;
            PresetSpeke20Video: PresetSpeke20Video;
          };
        };
      };
    };
    HlsPackage: HlsPackage & {
      Encryption: HlsEncryption & {
        SpekeKeyProvider: SpekeKeyProvider & {
          ResourceId: string;
          RoleArn: string;
          SystemIds: __listOf__string;
          Url: string;
          EncryptionContractConfiguration: EncryptionContractConfiguration & {
            PresetSpeke20Audio: PresetSpeke20Audio;
            PresetSpeke20Video: PresetSpeke20Video;
          };
        };
      };
    };
    MssPackage: MssPackage & {
      Encryption: MssEncryption & {
        SpekeKeyProvider: SpekeKeyProvider & {
          ResourceId: string;
          RoleArn: string;
          SystemIds: __listOf__string;
          Url: string;
          EncryptionContractConfiguration: EncryptionContractConfiguration & {
            PresetSpeke20Audio: PresetSpeke20Audio;
            PresetSpeke20Video: PresetSpeke20Video;
          };
        };
      };
    };
  })[];
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export type __mapOf__string = { [key: string]: string | undefined };
const __mapOf__string = __S(288, __c18, 0) as any as S.Schema<__mapOf__string>;
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface RotateChannelCredentialsRequest {
  Id: string;
}
export interface RotateChannelCredentialsResponse {
  Arn?: string;
  CreatedAt?: string;
  Description?: string;
  EgressAccessLogs?: EgressAccessLogs;
  HlsIngest?: HlsIngest;
  Id?: string;
  IngressAccessLogs?: IngressAccessLogs;
  Tags?: { [key: string]: string | undefined };
}
export interface RotateIngestEndpointCredentialsRequest {
  Id: string;
  IngestEndpointId: string;
}
export interface RotateIngestEndpointCredentialsResponse {
  Arn?: string;
  CreatedAt?: string;
  Description?: string;
  EgressAccessLogs?: EgressAccessLogs;
  HlsIngest?: HlsIngest;
  Id?: string;
  IngressAccessLogs?: IngressAccessLogs;
  Tags?: { [key: string]: string | undefined };
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags?: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export interface UntagResourceResponse {}
export interface UpdateChannelRequest {
  Description?: string;
  Id: string;
}
export interface UpdateChannelResponse {
  Arn?: string;
  CreatedAt?: string;
  Description?: string;
  EgressAccessLogs?: EgressAccessLogs;
  HlsIngest?: HlsIngest;
  Id?: string;
  IngressAccessLogs?: IngressAccessLogs;
  Tags?: { [key: string]: string | undefined };
}
export interface UpdateOriginEndpointRequest {
  Authorization?: Authorization;
  CmafPackage?: CmafPackageCreateOrUpdateParameters;
  DashPackage?: DashPackage;
  Description?: string;
  HlsPackage?: HlsPackage;
  Id: string;
  ManifestName?: string;
  MssPackage?: MssPackage;
  Origination?: Origination;
  StartoverWindowSeconds?: number;
  TimeDelaySeconds?: number;
  Whitelist?: string[];
}
export interface UpdateOriginEndpointResponse {
  Arn?: string;
  Authorization?: Authorization & { CdnIdentifierSecret: string; SecretsRoleArn: string };
  ChannelId?: string;
  CmafPackage?: CmafPackage & {
    Encryption: CmafEncryption & {
      SpekeKeyProvider: SpekeKeyProvider & {
        ResourceId: string;
        RoleArn: string;
        SystemIds: __listOf__string;
        Url: string;
        EncryptionContractConfiguration: EncryptionContractConfiguration & {
          PresetSpeke20Audio: PresetSpeke20Audio;
          PresetSpeke20Video: PresetSpeke20Video;
        };
      };
    };
    HlsManifests: (HlsManifest & { Id: string })[];
  };
  CreatedAt?: string;
  DashPackage?: DashPackage & {
    Encryption: DashEncryption & {
      SpekeKeyProvider: SpekeKeyProvider & {
        ResourceId: string;
        RoleArn: string;
        SystemIds: __listOf__string;
        Url: string;
        EncryptionContractConfiguration: EncryptionContractConfiguration & {
          PresetSpeke20Audio: PresetSpeke20Audio;
          PresetSpeke20Video: PresetSpeke20Video;
        };
      };
    };
  };
  Description?: string;
  HlsPackage?: HlsPackage & {
    Encryption: HlsEncryption & {
      SpekeKeyProvider: SpekeKeyProvider & {
        ResourceId: string;
        RoleArn: string;
        SystemIds: __listOf__string;
        Url: string;
        EncryptionContractConfiguration: EncryptionContractConfiguration & {
          PresetSpeke20Audio: PresetSpeke20Audio;
          PresetSpeke20Video: PresetSpeke20Video;
        };
      };
    };
  };
  Id?: string;
  ManifestName?: string;
  MssPackage?: MssPackage & {
    Encryption: MssEncryption & {
      SpekeKeyProvider: SpekeKeyProvider & {
        ResourceId: string;
        RoleArn: string;
        SystemIds: __listOf__string;
        Url: string;
        EncryptionContractConfiguration: EncryptionContractConfiguration & {
          PresetSpeke20Audio: PresetSpeke20Audio;
          PresetSpeke20Video: PresetSpeke20Video;
        };
      };
    };
  };
  Origination?: Origination;
  StartoverWindowSeconds?: number;
  Tags?: { [key: string]: string | undefined };
  TimeDelaySeconds?: number;
  Url?: string;
  Whitelist?: string[];
}
export type ConfigureLogsError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Changes the Channel's properities to configure log subscription
 */
export const configureLogs: API.OperationMethod<
  ConfigureLogsRequest,
  ConfigureLogsResponse,
  ConfigureLogsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<ConfigureLogsRequest>,
  output: __S(276, __c17, 4) as any as S.Schema<ConfigureLogsResponse>,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfigureLogs",
}));

export type CreateChannelError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Creates a new Channel.
 */
export const createChannel: API.OperationMethod<
  CreateChannelRequest,
  CreateChannelResponse,
  CreateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<CreateChannelRequest>,
  output: __S(276, __c17, 4) as any as S.Schema<CreateChannelResponse>,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChannel",
}));

export type CreateHarvestJobError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Creates a new HarvestJob record.
 */
export const createHarvestJob: API.OperationMethod<
  CreateHarvestJobRequest,
  CreateHarvestJobResponse,
  CreateHarvestJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<CreateHarvestJobRequest>,
  output: __S(337, __c21, 1) as any as S.Schema<CreateHarvestJobResponse>,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHarvestJob",
}));

export type CreateOriginEndpointError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Creates a new OriginEndpoint record.
 */
export const createOriginEndpoint: API.OperationMethod<
  CreateOriginEndpointRequest,
  CreateOriginEndpointResponse,
  CreateOriginEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<CreateOriginEndpointRequest>,
  output: __S(399, __c24, 15) as any as S.Schema<CreateOriginEndpointResponse>,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOriginEndpoint",
}));

export type DeleteChannelError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Deletes an existing Channel.
 */
export const deleteChannel: API.OperationMethod<
  DeleteChannelRequest,
  DeleteChannelResponse,
  DeleteChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<DeleteChannelRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteChannelResponse>,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChannel",
}));

export type DeleteOriginEndpointError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Deletes an existing OriginEndpoint.
 */
export const deleteOriginEndpoint: API.OperationMethod<
  DeleteOriginEndpointRequest,
  DeleteOriginEndpointResponse,
  DeleteOriginEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<DeleteOriginEndpointRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteOriginEndpointResponse>,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOriginEndpoint",
}));

export type DescribeChannelError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Gets details about a Channel.
 */
export const describeChannel: API.OperationMethod<
  DescribeChannelRequest,
  DescribeChannelResponse,
  DescribeChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<DescribeChannelRequest>,
  output: __S(276, __c17, 4) as any as S.Schema<DescribeChannelResponse>,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeChannel",
}));

export type DescribeHarvestJobError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Gets details about an existing HarvestJob.
 */
export const describeHarvestJob: API.OperationMethod<
  DescribeHarvestJobRequest,
  DescribeHarvestJobResponse,
  DescribeHarvestJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<DescribeHarvestJobRequest>,
  output: __S(337, __c21, 1) as any as S.Schema<DescribeHarvestJobResponse>,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHarvestJob",
}));

export type DescribeOriginEndpointError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Gets details about an existing OriginEndpoint.
 */
export const describeOriginEndpoint: API.OperationMethod<
  DescribeOriginEndpointRequest,
  DescribeOriginEndpointResponse,
  DescribeOriginEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<DescribeOriginEndpointRequest>,
  output: __S(399, __c24, 15) as any as S.Schema<DescribeOriginEndpointResponse>,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOriginEndpoint",
}));

export type ListChannelsError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Returns a collection of Channels.
 */
export const listChannels: API.PaginatedOperationMethod<
  ListChannelsRequest,
  ListChannelsResponse,
  ListChannelsError,
  Credentials | HttpClient.HttpClient,
  Channel
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<ListChannelsRequest>,
  output: __S(98, __c6, 2) as any as S.Schema<ListChannelsResponse>,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChannels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Channels",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListHarvestJobsError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Returns a collection of HarvestJob records.
 */
export const listHarvestJobs: API.PaginatedOperationMethod<
  ListHarvestJobsRequest,
  ListHarvestJobsResponse,
  ListHarvestJobsError,
  Credentials | HttpClient.HttpClient,
  HarvestJob
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<ListHarvestJobsRequest>,
  output: __S(114, __c7, 2) as any as S.Schema<ListHarvestJobsResponse>,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHarvestJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "HarvestJobs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOriginEndpointsError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Returns a collection of OriginEndpoint records.
 */
export const listOriginEndpoints: API.PaginatedOperationMethod<
  ListOriginEndpointsRequest,
  ListOriginEndpointsResponse,
  ListOriginEndpointsError,
  Credentials | HttpClient.HttpClient,
  OriginEndpoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<ListOriginEndpointsRequest>,
  output: __S(130, __c8, 2) as any as S.Schema<ListOriginEndpointsResponse>,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOriginEndpoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OriginEndpoints",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = CommonErrors;
/**
 *
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(145, __c9, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type RotateChannelCredentialsError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Changes the Channel's first IngestEndpoint's username and password. WARNING - This API is deprecated. Please use RotateIngestEndpointCredentials instead
 */
export const rotateChannelCredentials: API.OperationMethod<
  RotateChannelCredentialsRequest,
  RotateChannelCredentialsResponse,
  RotateChannelCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<RotateChannelCredentialsRequest>,
  output: __S(276, __c17, 4) as any as S.Schema<RotateChannelCredentialsResponse>,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RotateChannelCredentials",
}));

export type RotateIngestEndpointCredentialsError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Rotate the IngestEndpoint's username and password, as specified by the IngestEndpoint's id.
 */
export const rotateIngestEndpointCredentials: API.OperationMethod<
  RotateIngestEndpointCredentialsRequest,
  RotateIngestEndpointCredentialsResponse,
  RotateIngestEndpointCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<RotateIngestEndpointCredentialsRequest>,
  output: __S(276, __c17, 4) as any as S.Schema<RotateIngestEndpointCredentialsResponse>,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RotateIngestEndpointCredentials",
}));

export type TagResourceError = CommonErrors;
/**
 *
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<TagResourceResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = CommonErrors;
/**
 *
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateChannelError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Updates an existing Channel.
 */
export const updateChannel: API.OperationMethod<
  UpdateChannelRequest,
  UpdateChannelResponse,
  UpdateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<UpdateChannelRequest>,
  output: __S(276, __c17, 4) as any as S.Schema<UpdateChannelResponse>,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateChannel",
}));

export type UpdateOriginEndpointError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Updates an existing OriginEndpoint.
 */
export const updateOriginEndpoint: API.OperationMethod<
  UpdateOriginEndpointRequest,
  UpdateOriginEndpointResponse,
  UpdateOriginEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<UpdateOriginEndpointRequest>,
  output: __S(399, __c24, 15) as any as S.Schema<UpdateOriginEndpointResponse>,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
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
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/channels/{Id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteChannelRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteChannelResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/origin_endpoints/{Id}" }),
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
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/channels/{Id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeChannelRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/harvest_jobs/{Id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeHarvestJobRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/origin_endpoints/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeOriginEndpointRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/channels" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListChannelsRequest" });
    case 1:
      return S.Array(__S(276, __c17, 4));
    case 2:
      return S.suspend(() =>
        S.Struct({ Channels: S.optional(__listOfChannel), NextToken: S.optional(S.String) }).pipe(
          S.encodeKeys({ Channels: "channels", NextToken: "nextToken" }),
        ),
      ).annotate({ identifier: "ListChannelsResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IncludeChannelId: S.optional(S.String).pipe(T.HttpQuery("includeChannelId")),
          IncludeStatus: S.optional(S.String).pipe(T.HttpQuery("includeStatus")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/harvest_jobs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListHarvestJobsRequest" });
    case 1:
      return S.Array(__S(337, __c21, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          HarvestJobs: S.optional(__listOfHarvestJob),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ HarvestJobs: "harvestJobs", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListHarvestJobsResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChannelId: S.optional(S.String).pipe(T.HttpQuery("channelId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/origin_endpoints" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListOriginEndpointsRequest" });
    case 1:
      return S.Array(__S(399, __c24, 15));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          OriginEndpoints: S.optional(__listOfOriginEndpoint),
        }).pipe(S.encodeKeys({ NextToken: "nextToken", OriginEndpoints: "originEndpoints" })),
      ).annotate({ identifier: "ListOriginEndpointsResponse" });
  }
}
function __c9(j: number): any {
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
        S.Struct({ Tags: S.optional(__mapOf__string) }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/channels/{Id}/credentials" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RotateChannelCredentialsRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String.pipe(T.HttpLabel("Id")),
          IngestEndpointId: S.String.pipe(T.HttpLabel("IngestEndpointId")),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/channels/{Id}/ingest_endpoints/{IngestEndpointId}/credentials",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RotateIngestEndpointCredentialsRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: S.optional(__mapOf__string),
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
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: S.optional(__listOf__string).pipe(T.HttpQuery("tagKeys")),
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
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Description: S.optional(S.String), Id: S.String.pipe(T.HttpLabel("Id")) })
          .pipe(S.encodeKeys({ Description: "description" }))
          .pipe(
            T.all(T.Http({ method: "PUT", uri: "/channels/{Id}" }), svc, auth, proto, ver, rules),
          ),
      ).annotate({ identifier: "UpdateChannelRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Authorization: S.optional(__S(384, __c24, 0)),
          CmafPackage: S.optional(__S(402, __c25, 2)),
          DashPackage: S.optional(__S(391, __c24, 7)),
          Description: S.optional(S.String),
          HlsPackage: S.optional(__S(393, __c24, 9)),
          Id: S.String.pipe(T.HttpLabel("Id")),
          ManifestName: S.optional(S.String),
          MssPackage: S.optional(__S(395, __c24, 11)),
          Origination: S.optional(S.String),
          StartoverWindowSeconds: S.optional(S.Number),
          TimeDelaySeconds: S.optional(S.Number),
          Whitelist: S.optional(__listOf__string),
        })
          .pipe(
            S.encodeKeys({
              Authorization: "authorization",
              CmafPackage: "cmafPackage",
              DashPackage: "dashPackage",
              Description: "description",
              HlsPackage: "hlsPackage",
              ManifestName: "manifestName",
              MssPackage: "mssPackage",
              Origination: "origination",
              StartoverWindowSeconds: "startoverWindowSeconds",
              TimeDelaySeconds: "timeDelaySeconds",
              Whitelist: "whitelist",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/origin_endpoints/{Id}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdateOriginEndpointRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EgressAccessLogs: S.optional(__S(272, __c17, 0)),
          Id: S.String.pipe(T.HttpLabel("Id")),
          IngressAccessLogs: S.optional(__S(272, __c17, 0)),
        })
          .pipe(
            S.encodeKeys({
              EgressAccessLogs: "egressAccessLogs",
              IngressAccessLogs: "ingressAccessLogs",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/channels/{Id}/configure_logs" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "ConfigureLogsRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LogGroupName: S.optional(S.String) }).pipe(
          S.encodeKeys({ LogGroupName: "logGroupName" }),
        ),
      ).annotate({ identifier: "EgressAccessLogs" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Password: S.optional(SensitiveString),
          Url: S.optional(S.String),
          Username: S.optional(SensitiveString),
        }).pipe(S.encodeKeys({ Id: "id", Password: "password", Url: "url", Username: "username" })),
      ).annotate({ identifier: "IngestEndpoint" });
    case 2:
      return S.Array(__S(273, __c17, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ IngestEndpoints: S.optional(__listOfIngestEndpoint) }).pipe(
          S.encodeKeys({ IngestEndpoints: "ingestEndpoints" }),
        ),
      ).annotate({ identifier: "HlsIngest" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreatedAt: S.optional(S.String),
          Description: S.optional(S.String),
          EgressAccessLogs: S.optional(__S(272, __c17, 0)),
          HlsIngest: S.optional(__S(275, __c17, 3)),
          Id: S.optional(S.String),
          IngressAccessLogs: S.optional(__S(272, __c17, 0)),
          Tags: S.optional(__S(288, __c18, 0)),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            CreatedAt: "createdAt",
            Description: "description",
            EgressAccessLogs: "egressAccessLogs",
            HlsIngest: "hlsIngest",
            Id: "id",
            IngressAccessLogs: "ingressAccessLogs",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "ConfigureLogsResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          Id: S.optional(S.String),
          Tags: S.optional(__S(288, __c18, 0)),
        })
          .pipe(S.encodeKeys({ Description: "description", Id: "id", Tags: "tags" }))
          .pipe(T.all(T.Http({ method: "POST", uri: "/channels" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateChannelRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EndTime: S.optional(S.String),
          Id: S.optional(S.String),
          OriginEndpointId: S.optional(S.String),
          S3Destination: S.optional(__S(336, __c21, 0)),
          StartTime: S.optional(S.String),
        })
          .pipe(
            S.encodeKeys({
              EndTime: "endTime",
              Id: "id",
              OriginEndpointId: "originEndpointId",
              S3Destination: "s3Destination",
              StartTime: "startTime",
            }),
          )
          .pipe(
            T.all(T.Http({ method: "POST", uri: "/harvest_jobs" }), svc, auth, proto, ver, rules),
          ),
      ).annotate({ identifier: "CreateHarvestJobRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BucketName: S.optional(S.String),
          ManifestKey: S.optional(S.String),
          RoleArn: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            BucketName: "bucketName",
            ManifestKey: "manifestKey",
            RoleArn: "roleArn",
          }),
        ),
      ).annotate({ identifier: "S3Destination" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          ChannelId: S.optional(S.String),
          CreatedAt: S.optional(S.String),
          EndTime: S.optional(S.String),
          Id: S.optional(S.String),
          OriginEndpointId: S.optional(S.String),
          S3Destination: S.optional(__S(336, __c21, 0)),
          StartTime: S.optional(S.String),
          Status: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            ChannelId: "channelId",
            CreatedAt: "createdAt",
            EndTime: "endTime",
            Id: "id",
            OriginEndpointId: "originEndpointId",
            S3Destination: "s3Destination",
            StartTime: "startTime",
            Status: "status",
          }),
        ),
      ).annotate({ identifier: "CreateHarvestJobResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Authorization: S.optional(__S(384, __c24, 0)),
          ChannelId: S.optional(S.String),
          CmafPackage: S.optional(__S(402, __c25, 2)),
          DashPackage: S.optional(__S(391, __c24, 7)),
          Description: S.optional(S.String),
          HlsPackage: S.optional(__S(393, __c24, 9)),
          Id: S.optional(S.String),
          ManifestName: S.optional(S.String),
          MssPackage: S.optional(__S(395, __c24, 11)),
          Origination: S.optional(S.String),
          StartoverWindowSeconds: S.optional(S.Number),
          Tags: S.optional(__S(288, __c18, 0)),
          TimeDelaySeconds: S.optional(S.Number),
          Whitelist: S.optional(__listOf__string),
        })
          .pipe(
            S.encodeKeys({
              Authorization: "authorization",
              ChannelId: "channelId",
              CmafPackage: "cmafPackage",
              DashPackage: "dashPackage",
              Description: "description",
              HlsPackage: "hlsPackage",
              Id: "id",
              ManifestName: "manifestName",
              MssPackage: "mssPackage",
              Origination: "origination",
              StartoverWindowSeconds: "startoverWindowSeconds",
              Tags: "tags",
              TimeDelaySeconds: "timeDelaySeconds",
              Whitelist: "whitelist",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/origin_endpoints" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreateOriginEndpointRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CdnIdentifierSecret: S.optional(S.String),
          SecretsRoleArn: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            CdnIdentifierSecret: "cdnIdentifierSecret",
            SecretsRoleArn: "secretsRoleArn",
          }),
        ),
      ).annotate({ identifier: "Authorization" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PresetSpeke20Audio: S.optional(S.String),
          PresetSpeke20Video: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            PresetSpeke20Audio: "presetSpeke20Audio",
            PresetSpeke20Video: "presetSpeke20Video",
          }),
        ),
      ).annotate({ identifier: "EncryptionContractConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          CertificateArn: S.optional(S.String),
          EncryptionContractConfiguration: S.optional(__S(385, __c24, 1)),
          ResourceId: S.optional(S.String),
          RoleArn: S.optional(S.String),
          SystemIds: S.optional(__listOf__string),
          Url: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            CertificateArn: "certificateArn",
            EncryptionContractConfiguration: "encryptionContractConfiguration",
            ResourceId: "resourceId",
            RoleArn: "roleArn",
            SystemIds: "systemIds",
            Url: "url",
          }),
        ),
      ).annotate({ identifier: "SpekeKeyProvider" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ConstantInitializationVector: S.optional(S.String),
          EncryptionMethod: S.optional(S.String),
          KeyRotationIntervalSeconds: S.optional(S.Number),
          SpekeKeyProvider: S.optional(__S(386, __c24, 2)),
        }).pipe(
          S.encodeKeys({
            ConstantInitializationVector: "constantInitializationVector",
            EncryptionMethod: "encryptionMethod",
            KeyRotationIntervalSeconds: "keyRotationIntervalSeconds",
            SpekeKeyProvider: "spekeKeyProvider",
          }),
        ),
      ).annotate({ identifier: "CmafEncryption" });
    case 4:
      return S.Array(__AdTriggersElement);
    case 5:
      return S.suspend(() =>
        S.Struct({
          MaxVideoBitsPerSecond: S.optional(S.Number),
          MinVideoBitsPerSecond: S.optional(S.Number),
          StreamOrder: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            MaxVideoBitsPerSecond: "maxVideoBitsPerSecond",
            MinVideoBitsPerSecond: "minVideoBitsPerSecond",
            StreamOrder: "streamOrder",
          }),
        ),
      ).annotate({ identifier: "StreamSelection" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          KeyRotationIntervalSeconds: S.optional(S.Number),
          SpekeKeyProvider: S.optional(__S(386, __c24, 2)),
        }).pipe(
          S.encodeKeys({
            KeyRotationIntervalSeconds: "keyRotationIntervalSeconds",
            SpekeKeyProvider: "spekeKeyProvider",
          }),
        ),
      ).annotate({ identifier: "DashEncryption" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          AdTriggers: S.optional(__S(388, __c24, 4)),
          AdsOnDeliveryRestrictions: S.optional(S.String),
          Encryption: S.optional(__S(390, __c24, 6)),
          IncludeIframeOnlyStream: S.optional(S.Boolean),
          ManifestLayout: S.optional(S.String),
          ManifestWindowSeconds: S.optional(S.Number),
          MinBufferTimeSeconds: S.optional(S.Number),
          MinUpdatePeriodSeconds: S.optional(S.Number),
          PeriodTriggers: S.optional(__listOf__PeriodTriggersElement),
          Profile: S.optional(S.String),
          SegmentDurationSeconds: S.optional(S.Number),
          SegmentTemplateFormat: S.optional(S.String),
          StreamSelection: S.optional(__S(389, __c24, 5)),
          SuggestedPresentationDelaySeconds: S.optional(S.Number),
          UtcTiming: S.optional(S.String),
          UtcTimingUri: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AdTriggers: "adTriggers",
            AdsOnDeliveryRestrictions: "adsOnDeliveryRestrictions",
            Encryption: "encryption",
            IncludeIframeOnlyStream: "includeIframeOnlyStream",
            ManifestLayout: "manifestLayout",
            ManifestWindowSeconds: "manifestWindowSeconds",
            MinBufferTimeSeconds: "minBufferTimeSeconds",
            MinUpdatePeriodSeconds: "minUpdatePeriodSeconds",
            PeriodTriggers: "periodTriggers",
            Profile: "profile",
            SegmentDurationSeconds: "segmentDurationSeconds",
            SegmentTemplateFormat: "segmentTemplateFormat",
            StreamSelection: "streamSelection",
            SuggestedPresentationDelaySeconds: "suggestedPresentationDelaySeconds",
            UtcTiming: "utcTiming",
            UtcTimingUri: "utcTimingUri",
          }),
        ),
      ).annotate({ identifier: "DashPackage" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          ConstantInitializationVector: S.optional(S.String),
          EncryptionMethod: S.optional(S.String),
          KeyRotationIntervalSeconds: S.optional(S.Number),
          RepeatExtXKey: S.optional(S.Boolean),
          SpekeKeyProvider: S.optional(__S(386, __c24, 2)),
        }).pipe(
          S.encodeKeys({
            ConstantInitializationVector: "constantInitializationVector",
            EncryptionMethod: "encryptionMethod",
            KeyRotationIntervalSeconds: "keyRotationIntervalSeconds",
            RepeatExtXKey: "repeatExtXKey",
            SpekeKeyProvider: "spekeKeyProvider",
          }),
        ),
      ).annotate({ identifier: "HlsEncryption" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          AdMarkers: S.optional(S.String),
          AdTriggers: S.optional(__S(388, __c24, 4)),
          AdsOnDeliveryRestrictions: S.optional(S.String),
          Encryption: S.optional(__S(392, __c24, 8)),
          IncludeDvbSubtitles: S.optional(S.Boolean),
          IncludeIframeOnlyStream: S.optional(S.Boolean),
          PlaylistType: S.optional(S.String),
          PlaylistWindowSeconds: S.optional(S.Number),
          ProgramDateTimeIntervalSeconds: S.optional(S.Number),
          SegmentDurationSeconds: S.optional(S.Number),
          StreamSelection: S.optional(__S(389, __c24, 5)),
          UseAudioRenditionGroup: S.optional(S.Boolean),
        }).pipe(
          S.encodeKeys({
            AdMarkers: "adMarkers",
            AdTriggers: "adTriggers",
            AdsOnDeliveryRestrictions: "adsOnDeliveryRestrictions",
            Encryption: "encryption",
            IncludeDvbSubtitles: "includeDvbSubtitles",
            IncludeIframeOnlyStream: "includeIframeOnlyStream",
            PlaylistType: "playlistType",
            PlaylistWindowSeconds: "playlistWindowSeconds",
            ProgramDateTimeIntervalSeconds: "programDateTimeIntervalSeconds",
            SegmentDurationSeconds: "segmentDurationSeconds",
            StreamSelection: "streamSelection",
            UseAudioRenditionGroup: "useAudioRenditionGroup",
          }),
        ),
      ).annotate({ identifier: "HlsPackage" });
    case 10:
      return S.suspend(() =>
        S.Struct({ SpekeKeyProvider: S.optional(__S(386, __c24, 2)) }).pipe(
          S.encodeKeys({ SpekeKeyProvider: "spekeKeyProvider" }),
        ),
      ).annotate({ identifier: "MssEncryption" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          Encryption: S.optional(__S(394, __c24, 10)),
          ManifestWindowSeconds: S.optional(S.Number),
          SegmentDurationSeconds: S.optional(S.Number),
          StreamSelection: S.optional(__S(389, __c24, 5)),
        }).pipe(
          S.encodeKeys({
            Encryption: "encryption",
            ManifestWindowSeconds: "manifestWindowSeconds",
            SegmentDurationSeconds: "segmentDurationSeconds",
            StreamSelection: "streamSelection",
          }),
        ),
      ).annotate({ identifier: "MssPackage" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          AdMarkers: S.optional(S.String),
          Id: S.optional(S.String),
          IncludeIframeOnlyStream: S.optional(S.Boolean),
          ManifestName: S.optional(S.String),
          PlaylistType: S.optional(S.String),
          PlaylistWindowSeconds: S.optional(S.Number),
          ProgramDateTimeIntervalSeconds: S.optional(S.Number),
          Url: S.optional(S.String),
          AdTriggers: S.optional(__S(388, __c24, 4)),
          AdsOnDeliveryRestrictions: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            AdMarkers: "adMarkers",
            Id: "id",
            IncludeIframeOnlyStream: "includeIframeOnlyStream",
            ManifestName: "manifestName",
            PlaylistType: "playlistType",
            PlaylistWindowSeconds: "playlistWindowSeconds",
            ProgramDateTimeIntervalSeconds: "programDateTimeIntervalSeconds",
            Url: "url",
            AdTriggers: "adTriggers",
            AdsOnDeliveryRestrictions: "adsOnDeliveryRestrictions",
          }),
        ),
      ).annotate({ identifier: "HlsManifest" });
    case 13:
      return S.Array(__S(396, __c24, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          Encryption: S.optional(__S(387, __c24, 3)),
          HlsManifests: S.optional(__listOfHlsManifest),
          SegmentDurationSeconds: S.optional(S.Number),
          SegmentPrefix: S.optional(S.String),
          StreamSelection: S.optional(__S(389, __c24, 5)),
        }).pipe(
          S.encodeKeys({
            Encryption: "encryption",
            HlsManifests: "hlsManifests",
            SegmentDurationSeconds: "segmentDurationSeconds",
            SegmentPrefix: "segmentPrefix",
            StreamSelection: "streamSelection",
          }),
        ),
      ).annotate({ identifier: "CmafPackage" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Authorization: S.optional(__S(384, __c24, 0)),
          ChannelId: S.optional(S.String),
          CmafPackage: S.optional(__S(398, __c24, 14)),
          CreatedAt: S.optional(S.String),
          DashPackage: S.optional(__S(391, __c24, 7)),
          Description: S.optional(S.String),
          HlsPackage: S.optional(__S(393, __c24, 9)),
          Id: S.optional(S.String),
          ManifestName: S.optional(S.String),
          MssPackage: S.optional(__S(395, __c24, 11)),
          Origination: S.optional(S.String),
          StartoverWindowSeconds: S.optional(S.Number),
          Tags: S.optional(__S(288, __c18, 0)),
          TimeDelaySeconds: S.optional(S.Number),
          Url: S.optional(S.String),
          Whitelist: S.optional(__listOf__string),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            Authorization: "authorization",
            ChannelId: "channelId",
            CmafPackage: "cmafPackage",
            CreatedAt: "createdAt",
            DashPackage: "dashPackage",
            Description: "description",
            HlsPackage: "hlsPackage",
            Id: "id",
            ManifestName: "manifestName",
            MssPackage: "mssPackage",
            Origination: "origination",
            StartoverWindowSeconds: "startoverWindowSeconds",
            Tags: "tags",
            TimeDelaySeconds: "timeDelaySeconds",
            Url: "url",
            Whitelist: "whitelist",
          }),
        ),
      ).annotate({ identifier: "CreateOriginEndpointResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AdMarkers: S.optional(S.String),
          AdTriggers: S.optional(__S(388, __c24, 4)),
          AdsOnDeliveryRestrictions: S.optional(S.String),
          Id: S.optional(S.String),
          IncludeIframeOnlyStream: S.optional(S.Boolean),
          ManifestName: S.optional(S.String),
          PlaylistType: S.optional(S.String),
          PlaylistWindowSeconds: S.optional(S.Number),
          ProgramDateTimeIntervalSeconds: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            AdMarkers: "adMarkers",
            AdTriggers: "adTriggers",
            AdsOnDeliveryRestrictions: "adsOnDeliveryRestrictions",
            Id: "id",
            IncludeIframeOnlyStream: "includeIframeOnlyStream",
            ManifestName: "manifestName",
            PlaylistType: "playlistType",
            PlaylistWindowSeconds: "playlistWindowSeconds",
            ProgramDateTimeIntervalSeconds: "programDateTimeIntervalSeconds",
          }),
        ),
      ).annotate({ identifier: "HlsManifestCreateOrUpdateParameters" });
    case 1:
      return S.Array(__S(400, __c25, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Encryption: S.optional(__S(387, __c24, 3)),
          HlsManifests: S.optional(__listOfHlsManifestCreateOrUpdateParameters),
          SegmentDurationSeconds: S.optional(S.Number),
          SegmentPrefix: S.optional(S.String),
          StreamSelection: S.optional(__S(389, __c24, 5)),
        }).pipe(
          S.encodeKeys({
            Encryption: "encryption",
            HlsManifests: "hlsManifests",
            SegmentDurationSeconds: "segmentDurationSeconds",
            SegmentPrefix: "segmentPrefix",
            StreamSelection: "streamSelection",
          }),
        ),
      ).annotate({ identifier: "CmafPackageCreateOrUpdateParameters" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
