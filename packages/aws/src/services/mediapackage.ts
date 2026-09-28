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
  sdkId: "MediaPackage",
  target: "MediaPackage",
  version: "2017-10-12",
  sigv4: "mediapackage",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://mediapackage.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://mediapackage.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ForbiddenException
  extends /*@__PURE__*/ TE.TaggedError("ForbiddenException", ["AuthError"], {
    status: 403,
    renames: { Message: "message" },
  })<{ readonly message?: string }> {}
export class InternalServerErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerErrorException",
    ["ServerError"],
    { status: 500, renames: { Message: "message" } },
  )<{ readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404, renames: { Message: "message" } },
  )<{ readonly message?: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { status: 503, renames: { Message: "message" } },
  )<{ readonly message?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    { status: 429, renames: { Message: "message" } },
  )<{ readonly message?: string }> {}
export class UnprocessableEntityException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnprocessableEntityException",
    ["BadRequestError"],
    { status: 422, renames: { Message: "message" } },
  )<{ readonly message?: string }> {}
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
  S3Destination?: S3Destination & {
    BucketName: string;
    ManifestKey: string;
    RoleArn: string;
  };
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
export type AdMarkers =
  | "NONE"
  | "SCTE35_ENHANCED"
  | "PASSTHROUGH"
  | "DATERANGE"
  | (string & {});
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
export type __listOfHlsManifestCreateOrUpdateParameters =
  HlsManifestCreateOrUpdateParameters[];
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
export type ManifestLayout =
  | "FULL"
  | "COMPACT"
  | "DRM_TOP_LEVEL_COMPACT"
  | (string & {});
export type __PeriodTriggersElement = "ADS" | (string & {});
export type __listOf__PeriodTriggersElement = __PeriodTriggersElement[];
export type Profile =
  | "NONE"
  | "HBBTV_1_5"
  | "HYBRIDCAST"
  | "DVB_DASH_2014"
  | (string & {});
export type SegmentTemplateFormat =
  | "NUMBER_WITH_TIMELINE"
  | "TIME_WITH_TIMELINE"
  | "NUMBER_WITH_DURATION"
  | (string & {});
export type UtcTiming =
  | "NONE"
  | "HTTP-HEAD"
  | "HTTP-ISO"
  | "HTTP-XSDATE"
  | (string & {});
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
export interface CmafPackage {
  Encryption?: CmafEncryption;
  HlsManifests?: HlsManifest[];
  SegmentDurationSeconds?: number;
  SegmentPrefix?: string;
  StreamSelection?: StreamSelection;
}
export interface CreateOriginEndpointResponse {
  Arn?: string;
  Authorization?: Authorization & {
    CdnIdentifierSecret: string;
    SecretsRoleArn: string;
  };
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
  S3Destination?: S3Destination & {
    BucketName: string;
    ManifestKey: string;
    RoleArn: string;
  };
  StartTime?: string;
  Status?: Status;
}
export interface DescribeOriginEndpointRequest {
  Id: string;
}
export interface DescribeOriginEndpointResponse {
  Arn?: string;
  Authorization?: Authorization & {
    CdnIdentifierSecret: string;
    SecretsRoleArn: string;
  };
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
export interface ListHarvestJobsResponse {
  HarvestJobs?: (HarvestJob & {
    S3Destination: S3Destination & {
      BucketName: string;
      ManifestKey: string;
      RoleArn: string;
    };
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
export interface ListOriginEndpointsResponse {
  NextToken?: string;
  OriginEndpoints?: (OriginEndpoint & {
    Authorization: Authorization & {
      CdnIdentifierSecret: string;
      SecretsRoleArn: string;
    };
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
  Authorization?: Authorization & {
    CdnIdentifierSecret: string;
    SecretsRoleArn: string;
  };
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
  descriptor: {
    service: svc,
    http: "PUT /channels/{Id}/configure_logs",
    input: {
      EgressAccessLogs: D.m({
        wire: "egressAccessLogs",
        shape: { LogGroupName: D.m({ wire: "logGroupName" }) },
      }),
      Id: 0,
      IngressAccessLogs: D.m({
        wire: "ingressAccessLogs",
        shape: { LogGroupName: D.m({ wire: "logGroupName" }) },
      }),
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      CreatedAt: D.m({ wire: "createdAt" }),
      Description: D.m({ wire: "description" }),
      EgressAccessLogs: D.m({
        wire: "egressAccessLogs",
        shape: o_EgressAccessLogs,
      }),
      HlsIngest: D.m({ wire: "hlsIngest", shape: o_HlsIngest }),
      Id: D.m({ wire: "id" }),
      IngressAccessLogs: D.m({
        wire: "ingressAccessLogs",
        shape: o_IngressAccessLogs,
      }),
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /channels",
    input: {
      Description: D.m({ wire: "description" }),
      Id: D.m({ wire: "id" }),
      Tags: D.m({ wire: "tags" }),
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      CreatedAt: D.m({ wire: "createdAt" }),
      Description: D.m({ wire: "description" }),
      EgressAccessLogs: D.m({
        wire: "egressAccessLogs",
        shape: o_EgressAccessLogs,
      }),
      HlsIngest: D.m({ wire: "hlsIngest", shape: o_HlsIngest }),
      Id: D.m({ wire: "id" }),
      IngressAccessLogs: D.m({
        wire: "ingressAccessLogs",
        shape: o_IngressAccessLogs,
      }),
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /harvest_jobs",
    input: {
      EndTime: D.m({ wire: "endTime" }),
      Id: D.m({ wire: "id" }),
      OriginEndpointId: D.m({ wire: "originEndpointId" }),
      S3Destination: D.m({
        wire: "s3Destination",
        shape: {
          BucketName: D.m({ wire: "bucketName" }),
          ManifestKey: D.m({ wire: "manifestKey" }),
          RoleArn: D.m({ wire: "roleArn" }),
        },
      }),
      StartTime: D.m({ wire: "startTime" }),
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      ChannelId: D.m({ wire: "channelId" }),
      CreatedAt: D.m({ wire: "createdAt" }),
      EndTime: D.m({ wire: "endTime" }),
      Id: D.m({ wire: "id" }),
      OriginEndpointId: D.m({ wire: "originEndpointId" }),
      S3Destination: D.m({ wire: "s3Destination", shape: o_S3Destination }),
      StartTime: D.m({ wire: "startTime" }),
      Status: D.m({ wire: "status" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /origin_endpoints",
    input: {
      Authorization: D.m({ wire: "authorization", shape: i_Authorization }),
      ChannelId: D.m({ wire: "channelId" }),
      CmafPackage: D.m({
        wire: "cmafPackage",
        shape: i_CmafPackageCreateOrUpdateParameters,
      }),
      DashPackage: D.m({ wire: "dashPackage", shape: i_DashPackage }),
      Description: D.m({ wire: "description" }),
      HlsPackage: D.m({ wire: "hlsPackage", shape: i_HlsPackage }),
      Id: D.m({ wire: "id" }),
      ManifestName: D.m({ wire: "manifestName" }),
      MssPackage: D.m({ wire: "mssPackage", shape: i_MssPackage }),
      Origination: D.m({ wire: "origination" }),
      StartoverWindowSeconds: D.m({ wire: "startoverWindowSeconds" }),
      Tags: D.m({ wire: "tags" }),
      TimeDelaySeconds: D.m({ wire: "timeDelaySeconds" }),
      Whitelist: D.m({ wire: "whitelist" }),
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      Authorization: D.m({ wire: "authorization", shape: o_Authorization }),
      ChannelId: D.m({ wire: "channelId" }),
      CmafPackage: D.m({ wire: "cmafPackage", shape: o_CmafPackage }),
      CreatedAt: D.m({ wire: "createdAt" }),
      DashPackage: D.m({ wire: "dashPackage", shape: o_DashPackage }),
      Description: D.m({ wire: "description" }),
      HlsPackage: D.m({ wire: "hlsPackage", shape: o_HlsPackage }),
      Id: D.m({ wire: "id" }),
      ManifestName: D.m({ wire: "manifestName" }),
      MssPackage: D.m({ wire: "mssPackage", shape: o_MssPackage }),
      Origination: D.m({ wire: "origination" }),
      StartoverWindowSeconds: D.m({ wire: "startoverWindowSeconds" }),
      Tags: D.m({ wire: "tags" }),
      TimeDelaySeconds: D.m({ wire: "timeDelaySeconds" }),
      Url: D.m({ wire: "url" }),
      Whitelist: D.m({ wire: "whitelist" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: { service: svc, http: "DELETE /channels/{Id}", input: { Id: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /origin_endpoints/{Id}",
    input: { Id: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /channels/{Id}",
    input: { Id: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      CreatedAt: D.m({ wire: "createdAt" }),
      Description: D.m({ wire: "description" }),
      EgressAccessLogs: D.m({
        wire: "egressAccessLogs",
        shape: o_EgressAccessLogs,
      }),
      HlsIngest: D.m({ wire: "hlsIngest", shape: o_HlsIngest }),
      Id: D.m({ wire: "id" }),
      IngressAccessLogs: D.m({
        wire: "ingressAccessLogs",
        shape: o_IngressAccessLogs,
      }),
      Tags: D.m({ wire: "tags" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /harvest_jobs/{Id}",
    input: { Id: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      ChannelId: D.m({ wire: "channelId" }),
      CreatedAt: D.m({ wire: "createdAt" }),
      EndTime: D.m({ wire: "endTime" }),
      Id: D.m({ wire: "id" }),
      OriginEndpointId: D.m({ wire: "originEndpointId" }),
      S3Destination: D.m({ wire: "s3Destination", shape: o_S3Destination }),
      StartTime: D.m({ wire: "startTime" }),
      Status: D.m({ wire: "status" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /origin_endpoints/{Id}",
    input: { Id: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      Authorization: D.m({ wire: "authorization", shape: o_Authorization }),
      ChannelId: D.m({ wire: "channelId" }),
      CmafPackage: D.m({ wire: "cmafPackage", shape: o_CmafPackage }),
      CreatedAt: D.m({ wire: "createdAt" }),
      DashPackage: D.m({ wire: "dashPackage", shape: o_DashPackage }),
      Description: D.m({ wire: "description" }),
      HlsPackage: D.m({ wire: "hlsPackage", shape: o_HlsPackage }),
      Id: D.m({ wire: "id" }),
      ManifestName: D.m({ wire: "manifestName" }),
      MssPackage: D.m({ wire: "mssPackage", shape: o_MssPackage }),
      Origination: D.m({ wire: "origination" }),
      StartoverWindowSeconds: D.m({ wire: "startoverWindowSeconds" }),
      Tags: D.m({ wire: "tags" }),
      TimeDelaySeconds: D.m({ wire: "timeDelaySeconds" }),
      Url: D.m({ wire: "url" }),
      Whitelist: D.m({ wire: "whitelist" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /channels",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      Channels: D.m({
        wire: "channels",
        shape: D.list({
          Arn: D.m({ wire: "arn" }),
          CreatedAt: D.m({ wire: "createdAt" }),
          Description: D.m({ wire: "description" }),
          EgressAccessLogs: D.m({
            wire: "egressAccessLogs",
            shape: o_EgressAccessLogs,
          }),
          HlsIngest: D.m({ wire: "hlsIngest", shape: o_HlsIngest }),
          Id: D.m({ wire: "id" }),
          IngressAccessLogs: D.m({
            wire: "ingressAccessLogs",
            shape: o_IngressAccessLogs,
          }),
          Tags: D.m({ wire: "tags" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /harvest_jobs",
    input: {
      IncludeChannelId: D.m({ query: "includeChannelId" }),
      IncludeStatus: D.m({ query: "includeStatus" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      HarvestJobs: D.m({
        wire: "harvestJobs",
        shape: D.list({
          Arn: D.m({ wire: "arn" }),
          ChannelId: D.m({ wire: "channelId" }),
          CreatedAt: D.m({ wire: "createdAt" }),
          EndTime: D.m({ wire: "endTime" }),
          Id: D.m({ wire: "id" }),
          OriginEndpointId: D.m({ wire: "originEndpointId" }),
          S3Destination: D.m({ wire: "s3Destination", shape: o_S3Destination }),
          StartTime: D.m({ wire: "startTime" }),
          Status: D.m({ wire: "status" }),
        }),
      }),
      NextToken: D.m({ wire: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /origin_endpoints",
    input: {
      ChannelId: D.m({ query: "channelId" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      NextToken: D.m({ wire: "nextToken" }),
      OriginEndpoints: D.m({
        wire: "originEndpoints",
        shape: D.list({
          Arn: D.m({ wire: "arn" }),
          Authorization: D.m({ wire: "authorization", shape: o_Authorization }),
          ChannelId: D.m({ wire: "channelId" }),
          CmafPackage: D.m({ wire: "cmafPackage", shape: o_CmafPackage }),
          CreatedAt: D.m({ wire: "createdAt" }),
          DashPackage: D.m({ wire: "dashPackage", shape: o_DashPackage }),
          Description: D.m({ wire: "description" }),
          HlsPackage: D.m({ wire: "hlsPackage", shape: o_HlsPackage }),
          Id: D.m({ wire: "id" }),
          ManifestName: D.m({ wire: "manifestName" }),
          MssPackage: D.m({ wire: "mssPackage", shape: o_MssPackage }),
          Origination: D.m({ wire: "origination" }),
          StartoverWindowSeconds: D.m({ wire: "startoverWindowSeconds" }),
          Tags: D.m({ wire: "tags" }),
          TimeDelaySeconds: D.m({ wire: "timeDelaySeconds" }),
          Url: D.m({ wire: "url" }),
          Whitelist: D.m({ wire: "whitelist" }),
        }),
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /tags/{ResourceArn}",
    input: { ResourceArn: 0 },
    output: { Tags: D.m({ wire: "tags" }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /channels/{Id}/credentials",
    input: { Id: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      CreatedAt: D.m({ wire: "createdAt" }),
      Description: D.m({ wire: "description" }),
      EgressAccessLogs: D.m({
        wire: "egressAccessLogs",
        shape: o_EgressAccessLogs,
      }),
      HlsIngest: D.m({ wire: "hlsIngest", shape: o_HlsIngest }),
      Id: D.m({ wire: "id" }),
      IngressAccessLogs: D.m({
        wire: "ingressAccessLogs",
        shape: o_IngressAccessLogs,
      }),
      Tags: D.m({ wire: "tags" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /channels/{Id}/ingest_endpoints/{IngestEndpointId}/credentials",
    input: { Id: 0, IngestEndpointId: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      CreatedAt: D.m({ wire: "createdAt" }),
      Description: D.m({ wire: "description" }),
      EgressAccessLogs: D.m({
        wire: "egressAccessLogs",
        shape: o_EgressAccessLogs,
      }),
      HlsIngest: D.m({ wire: "hlsIngest", shape: o_HlsIngest }),
      Id: D.m({ wire: "id" }),
      IngressAccessLogs: D.m({
        wire: "ingressAccessLogs",
        shape: o_IngressAccessLogs,
      }),
      Tags: D.m({ wire: "tags" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: D.m({ wire: "tags" }) },
    body: true,
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /channels/{Id}",
    input: { Description: D.m({ wire: "description" }), Id: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      CreatedAt: D.m({ wire: "createdAt" }),
      Description: D.m({ wire: "description" }),
      EgressAccessLogs: D.m({
        wire: "egressAccessLogs",
        shape: o_EgressAccessLogs,
      }),
      HlsIngest: D.m({ wire: "hlsIngest", shape: o_HlsIngest }),
      Id: D.m({ wire: "id" }),
      IngressAccessLogs: D.m({
        wire: "ingressAccessLogs",
        shape: o_IngressAccessLogs,
      }),
      Tags: D.m({ wire: "tags" }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /origin_endpoints/{Id}",
    input: {
      Authorization: D.m({ wire: "authorization", shape: i_Authorization }),
      CmafPackage: D.m({
        wire: "cmafPackage",
        shape: i_CmafPackageCreateOrUpdateParameters,
      }),
      DashPackage: D.m({ wire: "dashPackage", shape: i_DashPackage }),
      Description: D.m({ wire: "description" }),
      HlsPackage: D.m({ wire: "hlsPackage", shape: i_HlsPackage }),
      Id: 0,
      ManifestName: D.m({ wire: "manifestName" }),
      MssPackage: D.m({ wire: "mssPackage", shape: i_MssPackage }),
      Origination: D.m({ wire: "origination" }),
      StartoverWindowSeconds: D.m({ wire: "startoverWindowSeconds" }),
      TimeDelaySeconds: D.m({ wire: "timeDelaySeconds" }),
      Whitelist: D.m({ wire: "whitelist" }),
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      Authorization: D.m({ wire: "authorization", shape: o_Authorization }),
      ChannelId: D.m({ wire: "channelId" }),
      CmafPackage: D.m({ wire: "cmafPackage", shape: o_CmafPackage }),
      CreatedAt: D.m({ wire: "createdAt" }),
      DashPackage: D.m({ wire: "dashPackage", shape: o_DashPackage }),
      Description: D.m({ wire: "description" }),
      HlsPackage: D.m({ wire: "hlsPackage", shape: o_HlsPackage }),
      Id: D.m({ wire: "id" }),
      ManifestName: D.m({ wire: "manifestName" }),
      MssPackage: D.m({ wire: "mssPackage", shape: o_MssPackage }),
      Origination: D.m({ wire: "origination" }),
      StartoverWindowSeconds: D.m({ wire: "startoverWindowSeconds" }),
      Tags: D.m({ wire: "tags" }),
      TimeDelaySeconds: D.m({ wire: "timeDelaySeconds" }),
      Url: D.m({ wire: "url" }),
      Whitelist: D.m({ wire: "whitelist" }),
    },
    body: true,
  },
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
})) as any;

const i_Authorization: D.LazyStruct = () => ({
  CdnIdentifierSecret: D.m({ wire: "cdnIdentifierSecret" }),
  SecretsRoleArn: D.m({ wire: "secretsRoleArn" }),
});
const i_CmafPackageCreateOrUpdateParameters: D.LazyStruct = () => ({
  Encryption: D.m({
    wire: "encryption",
    shape: {
      ConstantInitializationVector: D.m({
        wire: "constantInitializationVector",
      }),
      EncryptionMethod: D.m({ wire: "encryptionMethod" }),
      KeyRotationIntervalSeconds: D.m({ wire: "keyRotationIntervalSeconds" }),
      SpekeKeyProvider: D.m({
        wire: "spekeKeyProvider",
        shape: i_SpekeKeyProvider,
      }),
    },
  }),
  HlsManifests: D.m({
    wire: "hlsManifests",
    shape: D.list({
      AdMarkers: D.m({ wire: "adMarkers" }),
      AdTriggers: D.m({ wire: "adTriggers" }),
      AdsOnDeliveryRestrictions: D.m({ wire: "adsOnDeliveryRestrictions" }),
      Id: D.m({ wire: "id" }),
      IncludeIframeOnlyStream: D.m({ wire: "includeIframeOnlyStream" }),
      ManifestName: D.m({ wire: "manifestName" }),
      PlaylistType: D.m({ wire: "playlistType" }),
      PlaylistWindowSeconds: D.m({ wire: "playlistWindowSeconds" }),
      ProgramDateTimeIntervalSeconds: D.m({
        wire: "programDateTimeIntervalSeconds",
      }),
    }),
  }),
  SegmentDurationSeconds: D.m({ wire: "segmentDurationSeconds" }),
  SegmentPrefix: D.m({ wire: "segmentPrefix" }),
  StreamSelection: D.m({ wire: "streamSelection", shape: i_StreamSelection }),
});
const i_DashPackage: D.LazyStruct = () => ({
  AdTriggers: D.m({ wire: "adTriggers" }),
  AdsOnDeliveryRestrictions: D.m({ wire: "adsOnDeliveryRestrictions" }),
  Encryption: D.m({
    wire: "encryption",
    shape: {
      KeyRotationIntervalSeconds: D.m({ wire: "keyRotationIntervalSeconds" }),
      SpekeKeyProvider: D.m({
        wire: "spekeKeyProvider",
        shape: i_SpekeKeyProvider,
      }),
    },
  }),
  IncludeIframeOnlyStream: D.m({ wire: "includeIframeOnlyStream" }),
  ManifestLayout: D.m({ wire: "manifestLayout" }),
  ManifestWindowSeconds: D.m({ wire: "manifestWindowSeconds" }),
  MinBufferTimeSeconds: D.m({ wire: "minBufferTimeSeconds" }),
  MinUpdatePeriodSeconds: D.m({ wire: "minUpdatePeriodSeconds" }),
  PeriodTriggers: D.m({ wire: "periodTriggers" }),
  Profile: D.m({ wire: "profile" }),
  SegmentDurationSeconds: D.m({ wire: "segmentDurationSeconds" }),
  SegmentTemplateFormat: D.m({ wire: "segmentTemplateFormat" }),
  StreamSelection: D.m({ wire: "streamSelection", shape: i_StreamSelection }),
  SuggestedPresentationDelaySeconds: D.m({
    wire: "suggestedPresentationDelaySeconds",
  }),
  UtcTiming: D.m({ wire: "utcTiming" }),
  UtcTimingUri: D.m({ wire: "utcTimingUri" }),
});
const i_HlsPackage: D.LazyStruct = () => ({
  AdMarkers: D.m({ wire: "adMarkers" }),
  AdTriggers: D.m({ wire: "adTriggers" }),
  AdsOnDeliveryRestrictions: D.m({ wire: "adsOnDeliveryRestrictions" }),
  Encryption: D.m({
    wire: "encryption",
    shape: {
      ConstantInitializationVector: D.m({
        wire: "constantInitializationVector",
      }),
      EncryptionMethod: D.m({ wire: "encryptionMethod" }),
      KeyRotationIntervalSeconds: D.m({ wire: "keyRotationIntervalSeconds" }),
      RepeatExtXKey: D.m({ wire: "repeatExtXKey" }),
      SpekeKeyProvider: D.m({
        wire: "spekeKeyProvider",
        shape: i_SpekeKeyProvider,
      }),
    },
  }),
  IncludeDvbSubtitles: D.m({ wire: "includeDvbSubtitles" }),
  IncludeIframeOnlyStream: D.m({ wire: "includeIframeOnlyStream" }),
  PlaylistType: D.m({ wire: "playlistType" }),
  PlaylistWindowSeconds: D.m({ wire: "playlistWindowSeconds" }),
  ProgramDateTimeIntervalSeconds: D.m({
    wire: "programDateTimeIntervalSeconds",
  }),
  SegmentDurationSeconds: D.m({ wire: "segmentDurationSeconds" }),
  StreamSelection: D.m({ wire: "streamSelection", shape: i_StreamSelection }),
  UseAudioRenditionGroup: D.m({ wire: "useAudioRenditionGroup" }),
});
const i_MssPackage: D.LazyStruct = () => ({
  Encryption: D.m({
    wire: "encryption",
    shape: {
      SpekeKeyProvider: D.m({
        wire: "spekeKeyProvider",
        shape: i_SpekeKeyProvider,
      }),
    },
  }),
  ManifestWindowSeconds: D.m({ wire: "manifestWindowSeconds" }),
  SegmentDurationSeconds: D.m({ wire: "segmentDurationSeconds" }),
  StreamSelection: D.m({ wire: "streamSelection", shape: i_StreamSelection }),
});
const o_Authorization: D.LazyStruct = () => ({
  CdnIdentifierSecret: D.m({ wire: "cdnIdentifierSecret" }),
  SecretsRoleArn: D.m({ wire: "secretsRoleArn" }),
});
const o_CmafPackage: D.LazyStruct = () => ({
  Encryption: D.m({
    wire: "encryption",
    shape: {
      ConstantInitializationVector: D.m({
        wire: "constantInitializationVector",
      }),
      EncryptionMethod: D.m({ wire: "encryptionMethod" }),
      KeyRotationIntervalSeconds: D.m({ wire: "keyRotationIntervalSeconds" }),
      SpekeKeyProvider: D.m({
        wire: "spekeKeyProvider",
        shape: o_SpekeKeyProvider,
      }),
    },
  }),
  HlsManifests: D.m({
    wire: "hlsManifests",
    shape: D.list({
      AdMarkers: D.m({ wire: "adMarkers" }),
      Id: D.m({ wire: "id" }),
      IncludeIframeOnlyStream: D.m({ wire: "includeIframeOnlyStream" }),
      ManifestName: D.m({ wire: "manifestName" }),
      PlaylistType: D.m({ wire: "playlistType" }),
      PlaylistWindowSeconds: D.m({ wire: "playlistWindowSeconds" }),
      ProgramDateTimeIntervalSeconds: D.m({
        wire: "programDateTimeIntervalSeconds",
      }),
      Url: D.m({ wire: "url" }),
      AdTriggers: D.m({ wire: "adTriggers" }),
      AdsOnDeliveryRestrictions: D.m({ wire: "adsOnDeliveryRestrictions" }),
    }),
  }),
  SegmentDurationSeconds: D.m({ wire: "segmentDurationSeconds" }),
  SegmentPrefix: D.m({ wire: "segmentPrefix" }),
  StreamSelection: D.m({ wire: "streamSelection", shape: o_StreamSelection }),
});
const o_DashPackage: D.LazyStruct = () => ({
  AdTriggers: D.m({ wire: "adTriggers" }),
  AdsOnDeliveryRestrictions: D.m({ wire: "adsOnDeliveryRestrictions" }),
  Encryption: D.m({
    wire: "encryption",
    shape: {
      KeyRotationIntervalSeconds: D.m({ wire: "keyRotationIntervalSeconds" }),
      SpekeKeyProvider: D.m({
        wire: "spekeKeyProvider",
        shape: o_SpekeKeyProvider,
      }),
    },
  }),
  IncludeIframeOnlyStream: D.m({ wire: "includeIframeOnlyStream" }),
  ManifestLayout: D.m({ wire: "manifestLayout" }),
  ManifestWindowSeconds: D.m({ wire: "manifestWindowSeconds" }),
  MinBufferTimeSeconds: D.m({ wire: "minBufferTimeSeconds" }),
  MinUpdatePeriodSeconds: D.m({ wire: "minUpdatePeriodSeconds" }),
  PeriodTriggers: D.m({ wire: "periodTriggers" }),
  Profile: D.m({ wire: "profile" }),
  SegmentDurationSeconds: D.m({ wire: "segmentDurationSeconds" }),
  SegmentTemplateFormat: D.m({ wire: "segmentTemplateFormat" }),
  StreamSelection: D.m({ wire: "streamSelection", shape: o_StreamSelection }),
  SuggestedPresentationDelaySeconds: D.m({
    wire: "suggestedPresentationDelaySeconds",
  }),
  UtcTiming: D.m({ wire: "utcTiming" }),
  UtcTimingUri: D.m({ wire: "utcTimingUri" }),
});
const o_EgressAccessLogs: D.LazyStruct = () => ({
  LogGroupName: D.m({ wire: "logGroupName" }),
});
const o_HlsIngest: D.LazyStruct = () => ({
  IngestEndpoints: D.m({
    wire: "ingestEndpoints",
    shape: D.list({
      Id: D.m({ wire: "id" }),
      Password: D.m({ wire: "password", shape: D.secret }),
      Url: D.m({ wire: "url" }),
      Username: D.m({ wire: "username", shape: D.secret }),
    }),
  }),
});
const o_HlsPackage: D.LazyStruct = () => ({
  AdMarkers: D.m({ wire: "adMarkers" }),
  AdTriggers: D.m({ wire: "adTriggers" }),
  AdsOnDeliveryRestrictions: D.m({ wire: "adsOnDeliveryRestrictions" }),
  Encryption: D.m({
    wire: "encryption",
    shape: {
      ConstantInitializationVector: D.m({
        wire: "constantInitializationVector",
      }),
      EncryptionMethod: D.m({ wire: "encryptionMethod" }),
      KeyRotationIntervalSeconds: D.m({ wire: "keyRotationIntervalSeconds" }),
      RepeatExtXKey: D.m({ wire: "repeatExtXKey" }),
      SpekeKeyProvider: D.m({
        wire: "spekeKeyProvider",
        shape: o_SpekeKeyProvider,
      }),
    },
  }),
  IncludeDvbSubtitles: D.m({ wire: "includeDvbSubtitles" }),
  IncludeIframeOnlyStream: D.m({ wire: "includeIframeOnlyStream" }),
  PlaylistType: D.m({ wire: "playlistType" }),
  PlaylistWindowSeconds: D.m({ wire: "playlistWindowSeconds" }),
  ProgramDateTimeIntervalSeconds: D.m({
    wire: "programDateTimeIntervalSeconds",
  }),
  SegmentDurationSeconds: D.m({ wire: "segmentDurationSeconds" }),
  StreamSelection: D.m({ wire: "streamSelection", shape: o_StreamSelection }),
  UseAudioRenditionGroup: D.m({ wire: "useAudioRenditionGroup" }),
});
const o_IngressAccessLogs: D.LazyStruct = () => ({
  LogGroupName: D.m({ wire: "logGroupName" }),
});
const o_MssPackage: D.LazyStruct = () => ({
  Encryption: D.m({
    wire: "encryption",
    shape: {
      SpekeKeyProvider: D.m({
        wire: "spekeKeyProvider",
        shape: o_SpekeKeyProvider,
      }),
    },
  }),
  ManifestWindowSeconds: D.m({ wire: "manifestWindowSeconds" }),
  SegmentDurationSeconds: D.m({ wire: "segmentDurationSeconds" }),
  StreamSelection: D.m({ wire: "streamSelection", shape: o_StreamSelection }),
});
const o_S3Destination: D.LazyStruct = () => ({
  BucketName: D.m({ wire: "bucketName" }),
  ManifestKey: D.m({ wire: "manifestKey" }),
  RoleArn: D.m({ wire: "roleArn" }),
});
const i_SpekeKeyProvider: D.LazyStruct = () => ({
  CertificateArn: D.m({ wire: "certificateArn" }),
  EncryptionContractConfiguration: D.m({
    wire: "encryptionContractConfiguration",
    shape: {
      PresetSpeke20Audio: D.m({ wire: "presetSpeke20Audio" }),
      PresetSpeke20Video: D.m({ wire: "presetSpeke20Video" }),
    },
  }),
  ResourceId: D.m({ wire: "resourceId" }),
  RoleArn: D.m({ wire: "roleArn" }),
  SystemIds: D.m({ wire: "systemIds" }),
  Url: D.m({ wire: "url" }),
});
const i_StreamSelection: D.LazyStruct = () => ({
  MaxVideoBitsPerSecond: D.m({ wire: "maxVideoBitsPerSecond" }),
  MinVideoBitsPerSecond: D.m({ wire: "minVideoBitsPerSecond" }),
  StreamOrder: D.m({ wire: "streamOrder" }),
});
const o_SpekeKeyProvider: D.LazyStruct = () => ({
  CertificateArn: D.m({ wire: "certificateArn" }),
  EncryptionContractConfiguration: D.m({
    wire: "encryptionContractConfiguration",
    shape: {
      PresetSpeke20Audio: D.m({ wire: "presetSpeke20Audio" }),
      PresetSpeke20Video: D.m({ wire: "presetSpeke20Video" }),
    },
  }),
  ResourceId: D.m({ wire: "resourceId" }),
  RoleArn: D.m({ wire: "roleArn" }),
  SystemIds: D.m({ wire: "systemIds" }),
  Url: D.m({ wire: "url" }),
});
const o_StreamSelection: D.LazyStruct = () => ({
  MaxVideoBitsPerSecond: D.m({ wire: "maxVideoBitsPerSecond" }),
  MinVideoBitsPerSecond: D.m({ wire: "minVideoBitsPerSecond" }),
  StreamOrder: D.m({ wire: "streamOrder" }),
});
