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
  sdkId: "MediaPackage Vod",
  target: "MediaPackageVod",
  version: "2018-11-07",
  sigv4: "mediapackage-vod",
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
                `https://mediapackage-vod-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://mediapackage-vod-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://mediapackage-vod.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://mediapackage-vod.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export interface ConfigureLogsRequest {
  EgressAccessLogs?: EgressAccessLogs;
  Id: string;
}
export interface Authorization {
  CdnIdentifierSecret?: string;
  SecretsRoleArn?: string;
}
export type Tags = { [key: string]: string | undefined };
export interface ConfigureLogsResponse {
  Arn?: string;
  Authorization?: Authorization & {
    CdnIdentifierSecret: string;
    SecretsRoleArn: string;
  };
  CreatedAt?: string;
  DomainName?: string;
  EgressAccessLogs?: EgressAccessLogs;
  Id?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateAssetRequest {
  Id?: string;
  PackagingGroupId?: string;
  ResourceId?: string;
  SourceArn?: string;
  SourceRoleArn?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface EgressEndpoint {
  PackagingConfigurationId?: string;
  Status?: string;
  Url?: string;
}
export type __listOfEgressEndpoint = EgressEndpoint[];
export interface CreateAssetResponse {
  Arn?: string;
  CreatedAt?: string;
  EgressEndpoints?: EgressEndpoint[];
  Id?: string;
  PackagingGroupId?: string;
  ResourceId?: string;
  SourceArn?: string;
  SourceRoleArn?: string;
  Tags?: { [key: string]: string | undefined };
}
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
  EncryptionContractConfiguration?: EncryptionContractConfiguration;
  RoleArn?: string;
  SystemIds?: string[];
  Url?: string;
}
export interface CmafEncryption {
  ConstantInitializationVector?: string;
  SpekeKeyProvider?: SpekeKeyProvider;
}
export type AdMarkers =
  | "NONE"
  | "SCTE35_ENHANCED"
  | "PASSTHROUGH"
  | (string & {});
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
export interface HlsManifest {
  AdMarkers?: AdMarkers;
  IncludeIframeOnlyStream?: boolean;
  ManifestName?: string;
  ProgramDateTimeIntervalSeconds?: number;
  RepeatExtXKey?: boolean;
  StreamSelection?: StreamSelection;
}
export type __listOfHlsManifest = HlsManifest[];
export interface CmafPackage {
  Encryption?: CmafEncryption;
  HlsManifests?: HlsManifest[];
  IncludeEncoderConfigurationInSegments?: boolean;
  SegmentDurationSeconds?: number;
}
export type ManifestLayout = "FULL" | "COMPACT" | (string & {});
export type Profile = "NONE" | "HBBTV_1_5" | (string & {});
export type ScteMarkersSource = "SEGMENTS" | "MANIFEST" | (string & {});
export interface DashManifest {
  ManifestLayout?: ManifestLayout;
  ManifestName?: string;
  MinBufferTimeSeconds?: number;
  Profile?: Profile;
  ScteMarkersSource?: ScteMarkersSource;
  StreamSelection?: StreamSelection;
}
export type __listOfDashManifest = DashManifest[];
export interface DashEncryption {
  SpekeKeyProvider?: SpekeKeyProvider;
}
export type __PeriodTriggersElement = "ADS" | (string & {});
export type __listOf__PeriodTriggersElement = __PeriodTriggersElement[];
export type SegmentTemplateFormat =
  | "NUMBER_WITH_TIMELINE"
  | "TIME_WITH_TIMELINE"
  | "NUMBER_WITH_DURATION"
  | (string & {});
export interface DashPackage {
  DashManifests?: DashManifest[];
  Encryption?: DashEncryption;
  IncludeEncoderConfigurationInSegments?: boolean;
  IncludeIframeOnlyStream?: boolean;
  PeriodTriggers?: __PeriodTriggersElement[];
  SegmentDurationSeconds?: number;
  SegmentTemplateFormat?: SegmentTemplateFormat;
}
export type EncryptionMethod = "AES_128" | "SAMPLE_AES" | (string & {});
export interface HlsEncryption {
  ConstantInitializationVector?: string;
  EncryptionMethod?: EncryptionMethod;
  SpekeKeyProvider?: SpekeKeyProvider;
}
export interface HlsPackage {
  Encryption?: HlsEncryption;
  HlsManifests?: HlsManifest[];
  IncludeDvbSubtitles?: boolean;
  SegmentDurationSeconds?: number;
  UseAudioRenditionGroup?: boolean;
}
export interface MssEncryption {
  SpekeKeyProvider?: SpekeKeyProvider;
}
export interface MssManifest {
  ManifestName?: string;
  StreamSelection?: StreamSelection;
}
export type __listOfMssManifest = MssManifest[];
export interface MssPackage {
  Encryption?: MssEncryption;
  MssManifests?: MssManifest[];
  SegmentDurationSeconds?: number;
}
export interface CreatePackagingConfigurationRequest {
  CmafPackage?: CmafPackage;
  DashPackage?: DashPackage;
  HlsPackage?: HlsPackage;
  Id?: string;
  MssPackage?: MssPackage;
  PackagingGroupId?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreatePackagingConfigurationResponse {
  Arn?: string;
  CmafPackage?: CmafPackage & {
    HlsManifests: __listOfHlsManifest;
    Encryption: CmafEncryption & {
      SpekeKeyProvider: SpekeKeyProvider & {
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
  CreatedAt?: string;
  DashPackage?: DashPackage & {
    DashManifests: __listOfDashManifest;
    Encryption: DashEncryption & {
      SpekeKeyProvider: SpekeKeyProvider & {
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
  HlsPackage?: HlsPackage & {
    HlsManifests: __listOfHlsManifest;
    Encryption: HlsEncryption & {
      SpekeKeyProvider: SpekeKeyProvider & {
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
  MssPackage?: MssPackage & {
    MssManifests: __listOfMssManifest;
    Encryption: MssEncryption & {
      SpekeKeyProvider: SpekeKeyProvider & {
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
  PackagingGroupId?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreatePackagingGroupRequest {
  Authorization?: Authorization;
  EgressAccessLogs?: EgressAccessLogs;
  Id?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreatePackagingGroupResponse {
  Arn?: string;
  Authorization?: Authorization & {
    CdnIdentifierSecret: string;
    SecretsRoleArn: string;
  };
  CreatedAt?: string;
  DomainName?: string;
  EgressAccessLogs?: EgressAccessLogs;
  Id?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface DeleteAssetRequest {
  Id: string;
}
export interface DeleteAssetResponse {}
export interface DeletePackagingConfigurationRequest {
  Id: string;
}
export interface DeletePackagingConfigurationResponse {}
export interface DeletePackagingGroupRequest {
  Id: string;
}
export interface DeletePackagingGroupResponse {}
export interface DescribeAssetRequest {
  Id: string;
}
export interface DescribeAssetResponse {
  Arn?: string;
  CreatedAt?: string;
  EgressEndpoints?: EgressEndpoint[];
  Id?: string;
  PackagingGroupId?: string;
  ResourceId?: string;
  SourceArn?: string;
  SourceRoleArn?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface DescribePackagingConfigurationRequest {
  Id: string;
}
export interface DescribePackagingConfigurationResponse {
  Arn?: string;
  CmafPackage?: CmafPackage & {
    HlsManifests: __listOfHlsManifest;
    Encryption: CmafEncryption & {
      SpekeKeyProvider: SpekeKeyProvider & {
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
  CreatedAt?: string;
  DashPackage?: DashPackage & {
    DashManifests: __listOfDashManifest;
    Encryption: DashEncryption & {
      SpekeKeyProvider: SpekeKeyProvider & {
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
  HlsPackage?: HlsPackage & {
    HlsManifests: __listOfHlsManifest;
    Encryption: HlsEncryption & {
      SpekeKeyProvider: SpekeKeyProvider & {
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
  MssPackage?: MssPackage & {
    MssManifests: __listOfMssManifest;
    Encryption: MssEncryption & {
      SpekeKeyProvider: SpekeKeyProvider & {
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
  PackagingGroupId?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface DescribePackagingGroupRequest {
  Id: string;
}
export interface DescribePackagingGroupResponse {
  ApproximateAssetCount?: number;
  Arn?: string;
  Authorization?: Authorization & {
    CdnIdentifierSecret: string;
    SecretsRoleArn: string;
  };
  CreatedAt?: string;
  DomainName?: string;
  EgressAccessLogs?: EgressAccessLogs;
  Id?: string;
  Tags?: { [key: string]: string | undefined };
}
export type MaxResults = number;
export interface ListAssetsRequest {
  MaxResults?: number;
  NextToken?: string;
  PackagingGroupId?: string;
}
export interface AssetShallow {
  Arn?: string;
  CreatedAt?: string;
  Id?: string;
  PackagingGroupId?: string;
  ResourceId?: string;
  SourceArn?: string;
  SourceRoleArn?: string;
  Tags?: { [key: string]: string | undefined };
}
export type __listOfAssetShallow = AssetShallow[];
export interface ListAssetsResponse {
  Assets?: AssetShallow[];
  NextToken?: string;
}
export interface ListPackagingConfigurationsRequest {
  MaxResults?: number;
  NextToken?: string;
  PackagingGroupId?: string;
}
export interface PackagingConfiguration {
  Arn?: string;
  CmafPackage?: CmafPackage;
  CreatedAt?: string;
  DashPackage?: DashPackage;
  HlsPackage?: HlsPackage;
  Id?: string;
  MssPackage?: MssPackage;
  PackagingGroupId?: string;
  Tags?: { [key: string]: string | undefined };
}
export type __listOfPackagingConfiguration = PackagingConfiguration[];
export interface ListPackagingConfigurationsResponse {
  NextToken?: string;
  PackagingConfigurations?: (PackagingConfiguration & {
    CmafPackage: CmafPackage & {
      HlsManifests: __listOfHlsManifest;
      Encryption: CmafEncryption & {
        SpekeKeyProvider: SpekeKeyProvider & {
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
    DashPackage: DashPackage & {
      DashManifests: __listOfDashManifest;
      Encryption: DashEncryption & {
        SpekeKeyProvider: SpekeKeyProvider & {
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
      HlsManifests: __listOfHlsManifest;
      Encryption: HlsEncryption & {
        SpekeKeyProvider: SpekeKeyProvider & {
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
      MssManifests: __listOfMssManifest;
      Encryption: MssEncryption & {
        SpekeKeyProvider: SpekeKeyProvider & {
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
export interface ListPackagingGroupsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface PackagingGroup {
  ApproximateAssetCount?: number;
  Arn?: string;
  Authorization?: Authorization;
  CreatedAt?: string;
  DomainName?: string;
  EgressAccessLogs?: EgressAccessLogs;
  Id?: string;
  Tags?: { [key: string]: string | undefined };
}
export type __listOfPackagingGroup = PackagingGroup[];
export interface ListPackagingGroupsResponse {
  NextToken?: string;
  PackagingGroups?: (PackagingGroup & {
    Authorization: Authorization & {
      CdnIdentifierSecret: string;
      SecretsRoleArn: string;
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
export interface UpdatePackagingGroupRequest {
  Authorization?: Authorization;
  Id: string;
}
export interface UpdatePackagingGroupResponse {
  ApproximateAssetCount?: number;
  Arn?: string;
  Authorization?: Authorization & {
    CdnIdentifierSecret: string;
    SecretsRoleArn: string;
  };
  CreatedAt?: string;
  DomainName?: string;
  EgressAccessLogs?: EgressAccessLogs;
  Id?: string;
  Tags?: { [key: string]: string | undefined };
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
 * Changes the packaging group's properities to configure log subscription
 */
export const configureLogs: API.OperationMethod<
  ConfigureLogsRequest,
  ConfigureLogsResponse,
  ConfigureLogsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /packaging_groups/{Id}/configure_logs",
    input: {
      EgressAccessLogs: D.m({
        wire: "egressAccessLogs",
        shape: i_EgressAccessLogs,
      }),
      Id: 0,
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      Authorization: D.m({ wire: "authorization", shape: o_Authorization }),
      CreatedAt: D.m({ wire: "createdAt" }),
      DomainName: D.m({ wire: "domainName" }),
      EgressAccessLogs: D.m({
        wire: "egressAccessLogs",
        shape: o_EgressAccessLogs,
      }),
      Id: D.m({ wire: "id" }),
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

export type CreateAssetError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Creates a new MediaPackage VOD Asset resource.
 */
export const createAsset: API.OperationMethod<
  CreateAssetRequest,
  CreateAssetResponse,
  CreateAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /assets",
    input: {
      Id: D.m({ wire: "id" }),
      PackagingGroupId: D.m({ wire: "packagingGroupId" }),
      ResourceId: D.m({ wire: "resourceId" }),
      SourceArn: D.m({ wire: "sourceArn" }),
      SourceRoleArn: D.m({ wire: "sourceRoleArn" }),
      Tags: D.m({ wire: "tags" }),
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      CreatedAt: D.m({ wire: "createdAt" }),
      EgressEndpoints: D.m({
        wire: "egressEndpoints",
        shape: D.list(o_EgressEndpoint),
      }),
      Id: D.m({ wire: "id" }),
      PackagingGroupId: D.m({ wire: "packagingGroupId" }),
      ResourceId: D.m({ wire: "resourceId" }),
      SourceArn: D.m({ wire: "sourceArn" }),
      SourceRoleArn: D.m({ wire: "sourceRoleArn" }),
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
  operationName: "CreateAsset",
})) as any;

export type CreatePackagingConfigurationError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Creates a new MediaPackage VOD PackagingConfiguration resource.
 */
export const createPackagingConfiguration: API.OperationMethod<
  CreatePackagingConfigurationRequest,
  CreatePackagingConfigurationResponse,
  CreatePackagingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /packaging_configurations",
    input: {
      CmafPackage: D.m({
        wire: "cmafPackage",
        shape: {
          Encryption: D.m({
            wire: "encryption",
            shape: {
              ConstantInitializationVector: D.m({
                wire: "constantInitializationVector",
              }),
              SpekeKeyProvider: D.m({
                wire: "spekeKeyProvider",
                shape: i_SpekeKeyProvider,
              }),
            },
          }),
          HlsManifests: D.m({
            wire: "hlsManifests",
            shape: D.list(i_HlsManifest),
          }),
          IncludeEncoderConfigurationInSegments: D.m({
            wire: "includeEncoderConfigurationInSegments",
          }),
          SegmentDurationSeconds: D.m({ wire: "segmentDurationSeconds" }),
        },
      }),
      DashPackage: D.m({
        wire: "dashPackage",
        shape: {
          DashManifests: D.m({
            wire: "dashManifests",
            shape: D.list({
              ManifestLayout: D.m({ wire: "manifestLayout" }),
              ManifestName: D.m({ wire: "manifestName" }),
              MinBufferTimeSeconds: D.m({ wire: "minBufferTimeSeconds" }),
              Profile: D.m({ wire: "profile" }),
              ScteMarkersSource: D.m({ wire: "scteMarkersSource" }),
              StreamSelection: D.m({
                wire: "streamSelection",
                shape: i_StreamSelection,
              }),
            }),
          }),
          Encryption: D.m({
            wire: "encryption",
            shape: {
              SpekeKeyProvider: D.m({
                wire: "spekeKeyProvider",
                shape: i_SpekeKeyProvider,
              }),
            },
          }),
          IncludeEncoderConfigurationInSegments: D.m({
            wire: "includeEncoderConfigurationInSegments",
          }),
          IncludeIframeOnlyStream: D.m({ wire: "includeIframeOnlyStream" }),
          PeriodTriggers: D.m({ wire: "periodTriggers" }),
          SegmentDurationSeconds: D.m({ wire: "segmentDurationSeconds" }),
          SegmentTemplateFormat: D.m({ wire: "segmentTemplateFormat" }),
        },
      }),
      HlsPackage: D.m({
        wire: "hlsPackage",
        shape: {
          Encryption: D.m({
            wire: "encryption",
            shape: {
              ConstantInitializationVector: D.m({
                wire: "constantInitializationVector",
              }),
              EncryptionMethod: D.m({ wire: "encryptionMethod" }),
              SpekeKeyProvider: D.m({
                wire: "spekeKeyProvider",
                shape: i_SpekeKeyProvider,
              }),
            },
          }),
          HlsManifests: D.m({
            wire: "hlsManifests",
            shape: D.list(i_HlsManifest),
          }),
          IncludeDvbSubtitles: D.m({ wire: "includeDvbSubtitles" }),
          SegmentDurationSeconds: D.m({ wire: "segmentDurationSeconds" }),
          UseAudioRenditionGroup: D.m({ wire: "useAudioRenditionGroup" }),
        },
      }),
      Id: D.m({ wire: "id" }),
      MssPackage: D.m({
        wire: "mssPackage",
        shape: {
          Encryption: D.m({
            wire: "encryption",
            shape: {
              SpekeKeyProvider: D.m({
                wire: "spekeKeyProvider",
                shape: i_SpekeKeyProvider,
              }),
            },
          }),
          MssManifests: D.m({
            wire: "mssManifests",
            shape: D.list({
              ManifestName: D.m({ wire: "manifestName" }),
              StreamSelection: D.m({
                wire: "streamSelection",
                shape: i_StreamSelection,
              }),
            }),
          }),
          SegmentDurationSeconds: D.m({ wire: "segmentDurationSeconds" }),
        },
      }),
      PackagingGroupId: D.m({ wire: "packagingGroupId" }),
      Tags: D.m({ wire: "tags" }),
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      CmafPackage: D.m({ wire: "cmafPackage", shape: o_CmafPackage }),
      CreatedAt: D.m({ wire: "createdAt" }),
      DashPackage: D.m({ wire: "dashPackage", shape: o_DashPackage }),
      HlsPackage: D.m({ wire: "hlsPackage", shape: o_HlsPackage }),
      Id: D.m({ wire: "id" }),
      MssPackage: D.m({ wire: "mssPackage", shape: o_MssPackage }),
      PackagingGroupId: D.m({ wire: "packagingGroupId" }),
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
  operationName: "CreatePackagingConfiguration",
})) as any;

export type CreatePackagingGroupError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Creates a new MediaPackage VOD PackagingGroup resource.
 */
export const createPackagingGroup: API.OperationMethod<
  CreatePackagingGroupRequest,
  CreatePackagingGroupResponse,
  CreatePackagingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /packaging_groups",
    input: {
      Authorization: D.m({ wire: "authorization", shape: i_Authorization }),
      EgressAccessLogs: D.m({
        wire: "egressAccessLogs",
        shape: i_EgressAccessLogs,
      }),
      Id: D.m({ wire: "id" }),
      Tags: D.m({ wire: "tags" }),
    },
    output: {
      Arn: D.m({ wire: "arn" }),
      Authorization: D.m({ wire: "authorization", shape: o_Authorization }),
      CreatedAt: D.m({ wire: "createdAt" }),
      DomainName: D.m({ wire: "domainName" }),
      EgressAccessLogs: D.m({
        wire: "egressAccessLogs",
        shape: o_EgressAccessLogs,
      }),
      Id: D.m({ wire: "id" }),
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
  operationName: "CreatePackagingGroup",
})) as any;

export type DeleteAssetError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Deletes an existing MediaPackage VOD Asset resource.
 */
export const deleteAsset: API.OperationMethod<
  DeleteAssetRequest,
  DeleteAssetResponse,
  DeleteAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "DELETE /assets/{Id}", input: { Id: 0 } },
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
  operationName: "DeleteAsset",
})) as any;

export type DeletePackagingConfigurationError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Deletes a MediaPackage VOD PackagingConfiguration resource.
 */
export const deletePackagingConfiguration: API.OperationMethod<
  DeletePackagingConfigurationRequest,
  DeletePackagingConfigurationResponse,
  DeletePackagingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /packaging_configurations/{Id}",
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
  operationName: "DeletePackagingConfiguration",
})) as any;

export type DeletePackagingGroupError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Deletes a MediaPackage VOD PackagingGroup resource.
 */
export const deletePackagingGroup: API.OperationMethod<
  DeletePackagingGroupRequest,
  DeletePackagingGroupResponse,
  DeletePackagingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /packaging_groups/{Id}",
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
  operationName: "DeletePackagingGroup",
})) as any;

export type DescribeAssetError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Returns a description of a MediaPackage VOD Asset resource.
 */
export const describeAsset: API.OperationMethod<
  DescribeAssetRequest,
  DescribeAssetResponse,
  DescribeAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /assets/{Id}",
    input: { Id: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      CreatedAt: D.m({ wire: "createdAt" }),
      EgressEndpoints: D.m({
        wire: "egressEndpoints",
        shape: D.list(o_EgressEndpoint),
      }),
      Id: D.m({ wire: "id" }),
      PackagingGroupId: D.m({ wire: "packagingGroupId" }),
      ResourceId: D.m({ wire: "resourceId" }),
      SourceArn: D.m({ wire: "sourceArn" }),
      SourceRoleArn: D.m({ wire: "sourceRoleArn" }),
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
  operationName: "DescribeAsset",
})) as any;

export type DescribePackagingConfigurationError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Returns a description of a MediaPackage VOD PackagingConfiguration resource.
 */
export const describePackagingConfiguration: API.OperationMethod<
  DescribePackagingConfigurationRequest,
  DescribePackagingConfigurationResponse,
  DescribePackagingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /packaging_configurations/{Id}",
    input: { Id: 0 },
    output: {
      Arn: D.m({ wire: "arn" }),
      CmafPackage: D.m({ wire: "cmafPackage", shape: o_CmafPackage }),
      CreatedAt: D.m({ wire: "createdAt" }),
      DashPackage: D.m({ wire: "dashPackage", shape: o_DashPackage }),
      HlsPackage: D.m({ wire: "hlsPackage", shape: o_HlsPackage }),
      Id: D.m({ wire: "id" }),
      MssPackage: D.m({ wire: "mssPackage", shape: o_MssPackage }),
      PackagingGroupId: D.m({ wire: "packagingGroupId" }),
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
  operationName: "DescribePackagingConfiguration",
})) as any;

export type DescribePackagingGroupError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Returns a description of a MediaPackage VOD PackagingGroup resource.
 */
export const describePackagingGroup: API.OperationMethod<
  DescribePackagingGroupRequest,
  DescribePackagingGroupResponse,
  DescribePackagingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /packaging_groups/{Id}",
    input: { Id: 0 },
    output: {
      ApproximateAssetCount: D.m({ wire: "approximateAssetCount" }),
      Arn: D.m({ wire: "arn" }),
      Authorization: D.m({ wire: "authorization", shape: o_Authorization }),
      CreatedAt: D.m({ wire: "createdAt" }),
      DomainName: D.m({ wire: "domainName" }),
      EgressAccessLogs: D.m({
        wire: "egressAccessLogs",
        shape: o_EgressAccessLogs,
      }),
      Id: D.m({ wire: "id" }),
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
  operationName: "DescribePackagingGroup",
})) as any;

export type ListAssetsError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Returns a collection of MediaPackage VOD Asset resources.
 */
export const listAssets: API.PaginatedOperationMethod<
  ListAssetsRequest,
  ListAssetsResponse,
  ListAssetsError,
  Credentials | HttpClient.HttpClient,
  AssetShallow
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /assets",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      PackagingGroupId: D.m({ query: "packagingGroupId" }),
    },
    output: {
      Assets: D.m({
        wire: "assets",
        shape: D.list({
          Arn: D.m({ wire: "arn" }),
          CreatedAt: D.m({ wire: "createdAt" }),
          Id: D.m({ wire: "id" }),
          PackagingGroupId: D.m({ wire: "packagingGroupId" }),
          ResourceId: D.m({ wire: "resourceId" }),
          SourceArn: D.m({ wire: "sourceArn" }),
          SourceRoleArn: D.m({ wire: "sourceRoleArn" }),
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
  operationName: "ListAssets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Assets",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPackagingConfigurationsError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Returns a collection of MediaPackage VOD PackagingConfiguration resources.
 */
export const listPackagingConfigurations: API.PaginatedOperationMethod<
  ListPackagingConfigurationsRequest,
  ListPackagingConfigurationsResponse,
  ListPackagingConfigurationsError,
  Credentials | HttpClient.HttpClient,
  PackagingConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /packaging_configurations",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      PackagingGroupId: D.m({ query: "packagingGroupId" }),
    },
    output: {
      NextToken: D.m({ wire: "nextToken" }),
      PackagingConfigurations: D.m({
        wire: "packagingConfigurations",
        shape: D.list({
          Arn: D.m({ wire: "arn" }),
          CmafPackage: D.m({ wire: "cmafPackage", shape: o_CmafPackage }),
          CreatedAt: D.m({ wire: "createdAt" }),
          DashPackage: D.m({ wire: "dashPackage", shape: o_DashPackage }),
          HlsPackage: D.m({ wire: "hlsPackage", shape: o_HlsPackage }),
          Id: D.m({ wire: "id" }),
          MssPackage: D.m({ wire: "mssPackage", shape: o_MssPackage }),
          PackagingGroupId: D.m({ wire: "packagingGroupId" }),
          Tags: D.m({ wire: "tags" }),
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
  operationName: "ListPackagingConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PackagingConfigurations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPackagingGroupsError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Returns a collection of MediaPackage VOD PackagingGroup resources.
 */
export const listPackagingGroups: API.PaginatedOperationMethod<
  ListPackagingGroupsRequest,
  ListPackagingGroupsResponse,
  ListPackagingGroupsError,
  Credentials | HttpClient.HttpClient,
  PackagingGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /packaging_groups",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      NextToken: D.m({ wire: "nextToken" }),
      PackagingGroups: D.m({
        wire: "packagingGroups",
        shape: D.list({
          ApproximateAssetCount: D.m({ wire: "approximateAssetCount" }),
          Arn: D.m({ wire: "arn" }),
          Authorization: D.m({ wire: "authorization", shape: o_Authorization }),
          CreatedAt: D.m({ wire: "createdAt" }),
          DomainName: D.m({ wire: "domainName" }),
          EgressAccessLogs: D.m({
            wire: "egressAccessLogs",
            shape: o_EgressAccessLogs,
          }),
          Id: D.m({ wire: "id" }),
          Tags: D.m({ wire: "tags" }),
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
  operationName: "ListPackagingGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PackagingGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = CommonErrors;
/**
 * Returns a list of the tags assigned to the specified resource.
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

export type TagResourceError = CommonErrors;
/**
 * Adds tags to the specified resource. You can specify one or more tags to add.
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
 * Removes tags from the specified resource. You can specify one or more tags to remove.
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

export type UpdatePackagingGroupError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Updates a specific packaging group. You can't change the id attribute or any other system-generated attributes.
 */
export const updatePackagingGroup: API.OperationMethod<
  UpdatePackagingGroupRequest,
  UpdatePackagingGroupResponse,
  UpdatePackagingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /packaging_groups/{Id}",
    input: {
      Authorization: D.m({ wire: "authorization", shape: i_Authorization }),
      Id: 0,
    },
    output: {
      ApproximateAssetCount: D.m({ wire: "approximateAssetCount" }),
      Arn: D.m({ wire: "arn" }),
      Authorization: D.m({ wire: "authorization", shape: o_Authorization }),
      CreatedAt: D.m({ wire: "createdAt" }),
      DomainName: D.m({ wire: "domainName" }),
      EgressAccessLogs: D.m({
        wire: "egressAccessLogs",
        shape: o_EgressAccessLogs,
      }),
      Id: D.m({ wire: "id" }),
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
  operationName: "UpdatePackagingGroup",
})) as any;

const i_Authorization: D.LazyStruct = () => ({
  CdnIdentifierSecret: D.m({ wire: "cdnIdentifierSecret" }),
  SecretsRoleArn: D.m({ wire: "secretsRoleArn" }),
});
const i_EgressAccessLogs: D.LazyStruct = () => ({
  LogGroupName: D.m({ wire: "logGroupName" }),
});
const i_HlsManifest: D.LazyStruct = () => ({
  AdMarkers: D.m({ wire: "adMarkers" }),
  IncludeIframeOnlyStream: D.m({ wire: "includeIframeOnlyStream" }),
  ManifestName: D.m({ wire: "manifestName" }),
  ProgramDateTimeIntervalSeconds: D.m({
    wire: "programDateTimeIntervalSeconds",
  }),
  RepeatExtXKey: D.m({ wire: "repeatExtXKey" }),
  StreamSelection: D.m({ wire: "streamSelection", shape: i_StreamSelection }),
});
const i_SpekeKeyProvider: D.LazyStruct = () => ({
  EncryptionContractConfiguration: D.m({
    wire: "encryptionContractConfiguration",
    shape: {
      PresetSpeke20Audio: D.m({ wire: "presetSpeke20Audio" }),
      PresetSpeke20Video: D.m({ wire: "presetSpeke20Video" }),
    },
  }),
  RoleArn: D.m({ wire: "roleArn" }),
  SystemIds: D.m({ wire: "systemIds" }),
  Url: D.m({ wire: "url" }),
});
const i_StreamSelection: D.LazyStruct = () => ({
  MaxVideoBitsPerSecond: D.m({ wire: "maxVideoBitsPerSecond" }),
  MinVideoBitsPerSecond: D.m({ wire: "minVideoBitsPerSecond" }),
  StreamOrder: D.m({ wire: "streamOrder" }),
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
      SpekeKeyProvider: D.m({
        wire: "spekeKeyProvider",
        shape: o_SpekeKeyProvider,
      }),
    },
  }),
  HlsManifests: D.m({ wire: "hlsManifests", shape: D.list(o_HlsManifest) }),
  IncludeEncoderConfigurationInSegments: D.m({
    wire: "includeEncoderConfigurationInSegments",
  }),
  SegmentDurationSeconds: D.m({ wire: "segmentDurationSeconds" }),
});
const o_DashPackage: D.LazyStruct = () => ({
  DashManifests: D.m({
    wire: "dashManifests",
    shape: D.list({
      ManifestLayout: D.m({ wire: "manifestLayout" }),
      ManifestName: D.m({ wire: "manifestName" }),
      MinBufferTimeSeconds: D.m({ wire: "minBufferTimeSeconds" }),
      Profile: D.m({ wire: "profile" }),
      ScteMarkersSource: D.m({ wire: "scteMarkersSource" }),
      StreamSelection: D.m({
        wire: "streamSelection",
        shape: o_StreamSelection,
      }),
    }),
  }),
  Encryption: D.m({
    wire: "encryption",
    shape: {
      SpekeKeyProvider: D.m({
        wire: "spekeKeyProvider",
        shape: o_SpekeKeyProvider,
      }),
    },
  }),
  IncludeEncoderConfigurationInSegments: D.m({
    wire: "includeEncoderConfigurationInSegments",
  }),
  IncludeIframeOnlyStream: D.m({ wire: "includeIframeOnlyStream" }),
  PeriodTriggers: D.m({ wire: "periodTriggers" }),
  SegmentDurationSeconds: D.m({ wire: "segmentDurationSeconds" }),
  SegmentTemplateFormat: D.m({ wire: "segmentTemplateFormat" }),
});
const o_EgressAccessLogs: D.LazyStruct = () => ({
  LogGroupName: D.m({ wire: "logGroupName" }),
});
const o_EgressEndpoint: D.LazyStruct = () => ({
  PackagingConfigurationId: D.m({ wire: "packagingConfigurationId" }),
  Status: D.m({ wire: "status" }),
  Url: D.m({ wire: "url" }),
});
const o_HlsPackage: D.LazyStruct = () => ({
  Encryption: D.m({
    wire: "encryption",
    shape: {
      ConstantInitializationVector: D.m({
        wire: "constantInitializationVector",
      }),
      EncryptionMethod: D.m({ wire: "encryptionMethod" }),
      SpekeKeyProvider: D.m({
        wire: "spekeKeyProvider",
        shape: o_SpekeKeyProvider,
      }),
    },
  }),
  HlsManifests: D.m({ wire: "hlsManifests", shape: D.list(o_HlsManifest) }),
  IncludeDvbSubtitles: D.m({ wire: "includeDvbSubtitles" }),
  SegmentDurationSeconds: D.m({ wire: "segmentDurationSeconds" }),
  UseAudioRenditionGroup: D.m({ wire: "useAudioRenditionGroup" }),
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
  MssManifests: D.m({
    wire: "mssManifests",
    shape: D.list({
      ManifestName: D.m({ wire: "manifestName" }),
      StreamSelection: D.m({
        wire: "streamSelection",
        shape: o_StreamSelection,
      }),
    }),
  }),
  SegmentDurationSeconds: D.m({ wire: "segmentDurationSeconds" }),
});
const o_HlsManifest: D.LazyStruct = () => ({
  AdMarkers: D.m({ wire: "adMarkers" }),
  IncludeIframeOnlyStream: D.m({ wire: "includeIframeOnlyStream" }),
  ManifestName: D.m({ wire: "manifestName" }),
  ProgramDateTimeIntervalSeconds: D.m({
    wire: "programDateTimeIntervalSeconds",
  }),
  RepeatExtXKey: D.m({ wire: "repeatExtXKey" }),
  StreamSelection: D.m({ wire: "streamSelection", shape: o_StreamSelection }),
});
const o_SpekeKeyProvider: D.LazyStruct = () => ({
  EncryptionContractConfiguration: D.m({
    wire: "encryptionContractConfiguration",
    shape: {
      PresetSpeke20Audio: D.m({ wire: "presetSpeke20Audio" }),
      PresetSpeke20Video: D.m({ wire: "presetSpeke20Video" }),
    },
  }),
  RoleArn: D.m({ wire: "roleArn" }),
  SystemIds: D.m({ wire: "systemIds" }),
  Url: D.m({ wire: "url" }),
});
const o_StreamSelection: D.LazyStruct = () => ({
  MaxVideoBitsPerSecond: D.m({ wire: "maxVideoBitsPerSecond" }),
  MinVideoBitsPerSecond: D.m({ wire: "minVideoBitsPerSecond" }),
  StreamOrder: D.m({ wire: "streamOrder" }),
});
