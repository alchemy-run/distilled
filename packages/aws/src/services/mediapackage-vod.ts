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
  sdkId: "MediaPackage Vod",
  serviceShapeName: "MediaPackageVod",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "mediapackage-vod" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-11-07");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://mediapackage-vod.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://mediapackage-vod.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://mediapackage-vod.{R}.{D}","properties":{},"headers":{}}');

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
  Authorization?: Authorization & { CdnIdentifierSecret: string; SecretsRoleArn: string };
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
const __listOfEgressEndpoint = /*@__PURE__*/ __L.at(__c20, 1);
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
const __listOf__string = /*@__PURE__*/ __L.at(__c23, 0);
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
export type AdMarkers = "NONE" | "SCTE35_ENHANCED" | "PASSTHROUGH" | (string & {});
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
const __listOfHlsManifest = /*@__PURE__*/ __L.at(__c22, 5);
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
const __listOfDashManifest = /*@__PURE__*/ __L.at(__c22, 8);
export interface DashEncryption {
  SpekeKeyProvider?: SpekeKeyProvider;
}
export type __PeriodTriggersElement = "ADS" | (string & {});
const __PeriodTriggersElement = S.String;

export type __listOf__PeriodTriggersElement = __PeriodTriggersElement[];
const __listOf__PeriodTriggersElement = /*@__PURE__*/ __L.at(__c22, 10);
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
const __listOfMssManifest = /*@__PURE__*/ __L.at(__c22, 15);
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
  Authorization?: Authorization & { CdnIdentifierSecret: string; SecretsRoleArn: string };
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
  Authorization?: Authorization & { CdnIdentifierSecret: string; SecretsRoleArn: string };
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
const __listOfAssetShallow = /*@__PURE__*/ __L.at(__c8, 2);
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
const __listOfPackagingConfiguration = /*@__PURE__*/ __L.at(__c9, 1);
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
const __listOfPackagingGroup = /*@__PURE__*/ __L.at(__c10, 1);
export interface ListPackagingGroupsResponse {
  NextToken?: string;
  PackagingGroups?: (PackagingGroup & {
    Authorization: Authorization & { CdnIdentifierSecret: string; SecretsRoleArn: string };
  })[];
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export type __mapOf__string = { [key: string]: string | undefined };
const __mapOf__string = __S(512, __c16, 0) as any as S.Schema<__mapOf__string>;
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
  Authorization?: Authorization & { CdnIdentifierSecret: string; SecretsRoleArn: string };
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
  input: __S(480, __c15, 0) as any as S.Schema<ConfigureLogsRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<ConfigureLogsResponse>,
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
  input: __S(608, __c19, 0) as any as S.Schema<CreateAssetRequest>,
  output: __S(642, __c20, 2) as any as S.Schema<CreateAssetResponse>,
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
}));

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
  input: __S(672, __c21, 0) as any as S.Schema<CreatePackagingConfigurationRequest>,
  output: __S(721, __c22, 17) as any as S.Schema<CreatePackagingConfigurationResponse>,
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
}));

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
  input: __S(768, __c24, 0) as any as S.Schema<CreatePackagingGroupRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<CreatePackagingGroupResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<DeleteAssetRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<DeleteAssetResponse>,
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
}));

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
  input: __S(64, __c2, 0) as any as S.Schema<DeletePackagingConfigurationRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<DeletePackagingConfigurationResponse>,
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
}));

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
  input: __S(96, __c3, 0) as any as S.Schema<DeletePackagingGroupRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<DeletePackagingGroupResponse>,
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
}));

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
  input: __S(128, __c4, 0) as any as S.Schema<DescribeAssetRequest>,
  output: __S(642, __c20, 2) as any as S.Schema<DescribeAssetResponse>,
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
}));

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
  input: __S(160, __c5, 0) as any as S.Schema<DescribePackagingConfigurationRequest>,
  output: __S(721, __c22, 17) as any as S.Schema<DescribePackagingConfigurationResponse>,
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
}));

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
  input: __S(192, __c6, 0) as any as S.Schema<DescribePackagingGroupRequest>,
  output: __S(224, __c7, 0) as any as S.Schema<DescribePackagingGroupResponse>,
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
}));

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
  input: __S(256, __c8, 0) as any as S.Schema<ListAssetsRequest>,
  output: __S(259, __c8, 3) as any as S.Schema<ListAssetsResponse>,
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
  input: __S(288, __c9, 0) as any as S.Schema<ListPackagingConfigurationsRequest>,
  output: __S(290, __c9, 2) as any as S.Schema<ListPackagingConfigurationsResponse>,
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
  input: __S(320, __c10, 0) as any as S.Schema<ListPackagingGroupsRequest>,
  output: __S(322, __c10, 2) as any as S.Schema<ListPackagingGroupsResponse>,
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
  input: __S(352, __c11, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(353, __c11, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(384, __c12, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<TagResourceResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(416, __c13, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(32, __c1, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(448, __c14, 0) as any as S.Schema<UpdatePackagingGroupRequest>,
  output: __S(224, __c7, 0) as any as S.Schema<UpdatePackagingGroupResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/assets/{Id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAssetRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteAssetResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/packaging_configurations/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePackagingConfigurationRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/packaging_groups/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePackagingGroupRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/assets/{Id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAssetRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/packaging_configurations/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribePackagingConfigurationRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/packaging_groups/{Id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribePackagingGroupRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ApproximateAssetCount: S.optional(S.Number),
          Arn: S.optional(S.String),
          Authorization: S.optional(__S(577, __c18, 1)),
          CreatedAt: S.optional(S.String),
          DomainName: S.optional(S.String),
          EgressAccessLogs: S.optional(__S(576, __c18, 0)),
          Id: S.optional(S.String),
          Tags: S.optional(__S(512, __c16, 0)),
        }).pipe(
          S.encodeKeys({
            ApproximateAssetCount: "approximateAssetCount",
            Arn: "arn",
            Authorization: "authorization",
            CreatedAt: "createdAt",
            DomainName: "domainName",
            EgressAccessLogs: "egressAccessLogs",
            Id: "id",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "DescribePackagingGroupResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          PackagingGroupId: S.optional(S.String).pipe(T.HttpQuery("packagingGroupId")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/assets" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAssetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreatedAt: S.optional(S.String),
          Id: S.optional(S.String),
          PackagingGroupId: S.optional(S.String),
          ResourceId: S.optional(S.String),
          SourceArn: S.optional(S.String),
          SourceRoleArn: S.optional(S.String),
          Tags: S.optional(__S(512, __c16, 0)),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            CreatedAt: "createdAt",
            Id: "id",
            PackagingGroupId: "packagingGroupId",
            ResourceId: "resourceId",
            SourceArn: "sourceArn",
            SourceRoleArn: "sourceRoleArn",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "AssetShallow" });
    case 2:
      return S.Array(__S(257, __c8, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Assets: S.optional(__listOfAssetShallow),
          NextToken: S.optional(S.String),
        }).pipe(S.encodeKeys({ Assets: "assets", NextToken: "nextToken" })),
      ).annotate({ identifier: "ListAssetsResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          PackagingGroupId: S.optional(S.String).pipe(T.HttpQuery("packagingGroupId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/packaging_configurations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPackagingConfigurationsRequest" });
    case 1:
      return S.Array(__S(721, __c22, 17));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          PackagingConfigurations: S.optional(__listOfPackagingConfiguration),
        }).pipe(
          S.encodeKeys({
            NextToken: "nextToken",
            PackagingConfigurations: "packagingConfigurations",
          }),
        ),
      ).annotate({ identifier: "ListPackagingConfigurationsResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/packaging_groups" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListPackagingGroupsRequest" });
    case 1:
      return S.Array(__S(224, __c7, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          PackagingGroups: S.optional(__listOfPackagingGroup),
        }).pipe(S.encodeKeys({ NextToken: "nextToken", PackagingGroups: "packagingGroups" })),
      ).annotate({ identifier: "ListPackagingGroupsResponse" });
  }
}
function __c11(j: number): any {
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
        S.Struct({
          Authorization: S.optional(__S(577, __c18, 1)),
          Id: S.String.pipe(T.HttpLabel("Id")),
        })
          .pipe(S.encodeKeys({ Authorization: "authorization" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/packaging_groups/{Id}" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "UpdatePackagingGroupRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EgressAccessLogs: S.optional(__S(576, __c18, 0)),
          Id: S.String.pipe(T.HttpLabel("Id")),
        })
          .pipe(S.encodeKeys({ EgressAccessLogs: "egressAccessLogs" }))
          .pipe(
            T.all(
              T.Http({ method: "PUT", uri: "/packaging_groups/{Id}/configure_logs" }),
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
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Authorization: S.optional(__S(577, __c18, 1)),
          CreatedAt: S.optional(S.String),
          DomainName: S.optional(S.String),
          EgressAccessLogs: S.optional(__S(576, __c18, 0)),
          Id: S.optional(S.String),
          Tags: S.optional(__S(512, __c16, 0)),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            Authorization: "authorization",
            CreatedAt: "createdAt",
            DomainName: "domainName",
            EgressAccessLogs: "egressAccessLogs",
            Id: "id",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "ConfigureLogsResponse" });
  }
}
function __c18(j: number): any {
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
          CdnIdentifierSecret: S.optional(S.String),
          SecretsRoleArn: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            CdnIdentifierSecret: "cdnIdentifierSecret",
            SecretsRoleArn: "secretsRoleArn",
          }),
        ),
      ).annotate({ identifier: "Authorization" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          PackagingGroupId: S.optional(S.String),
          ResourceId: S.optional(S.String),
          SourceArn: S.optional(S.String),
          SourceRoleArn: S.optional(S.String),
          Tags: S.optional(__S(512, __c16, 0)),
        })
          .pipe(
            S.encodeKeys({
              Id: "id",
              PackagingGroupId: "packagingGroupId",
              ResourceId: "resourceId",
              SourceArn: "sourceArn",
              SourceRoleArn: "sourceRoleArn",
              Tags: "tags",
            }),
          )
          .pipe(T.all(T.Http({ method: "POST", uri: "/assets" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAssetRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PackagingConfigurationId: S.optional(S.String),
          Status: S.optional(S.String),
          Url: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            PackagingConfigurationId: "packagingConfigurationId",
            Status: "status",
            Url: "url",
          }),
        ),
      ).annotate({ identifier: "EgressEndpoint" });
    case 1:
      return S.Array(__S(640, __c20, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreatedAt: S.optional(S.String),
          EgressEndpoints: S.optional(__listOfEgressEndpoint),
          Id: S.optional(S.String),
          PackagingGroupId: S.optional(S.String),
          ResourceId: S.optional(S.String),
          SourceArn: S.optional(S.String),
          SourceRoleArn: S.optional(S.String),
          Tags: S.optional(__S(512, __c16, 0)),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            CreatedAt: "createdAt",
            EgressEndpoints: "egressEndpoints",
            Id: "id",
            PackagingGroupId: "packagingGroupId",
            ResourceId: "resourceId",
            SourceArn: "sourceArn",
            SourceRoleArn: "sourceRoleArn",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "CreateAssetResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CmafPackage: S.optional(__S(710, __c22, 6)),
          DashPackage: S.optional(__S(715, __c22, 11)),
          HlsPackage: S.optional(__S(717, __c22, 13)),
          Id: S.optional(S.String),
          MssPackage: S.optional(__S(720, __c22, 16)),
          PackagingGroupId: S.optional(S.String),
          Tags: S.optional(__S(512, __c16, 0)),
        })
          .pipe(
            S.encodeKeys({
              CmafPackage: "cmafPackage",
              DashPackage: "dashPackage",
              HlsPackage: "hlsPackage",
              Id: "id",
              MssPackage: "mssPackage",
              PackagingGroupId: "packagingGroupId",
              Tags: "tags",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/packaging_configurations" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreatePackagingConfigurationRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
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
    case 1:
      return S.suspend(() =>
        S.Struct({
          EncryptionContractConfiguration: S.optional(__S(704, __c22, 0)),
          RoleArn: S.optional(S.String),
          SystemIds: S.optional(__listOf__string),
          Url: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            EncryptionContractConfiguration: "encryptionContractConfiguration",
            RoleArn: "roleArn",
            SystemIds: "systemIds",
            Url: "url",
          }),
        ),
      ).annotate({ identifier: "SpekeKeyProvider" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ConstantInitializationVector: S.optional(S.String),
          SpekeKeyProvider: S.optional(__S(705, __c22, 1)),
        }).pipe(
          S.encodeKeys({
            ConstantInitializationVector: "constantInitializationVector",
            SpekeKeyProvider: "spekeKeyProvider",
          }),
        ),
      ).annotate({ identifier: "CmafEncryption" });
    case 3:
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
    case 4:
      return S.suspend(() =>
        S.Struct({
          AdMarkers: S.optional(S.String),
          IncludeIframeOnlyStream: S.optional(S.Boolean),
          ManifestName: S.optional(S.String),
          ProgramDateTimeIntervalSeconds: S.optional(S.Number),
          RepeatExtXKey: S.optional(S.Boolean),
          StreamSelection: S.optional(__S(707, __c22, 3)),
        }).pipe(
          S.encodeKeys({
            AdMarkers: "adMarkers",
            IncludeIframeOnlyStream: "includeIframeOnlyStream",
            ManifestName: "manifestName",
            ProgramDateTimeIntervalSeconds: "programDateTimeIntervalSeconds",
            RepeatExtXKey: "repeatExtXKey",
            StreamSelection: "streamSelection",
          }),
        ),
      ).annotate({ identifier: "HlsManifest" });
    case 5:
      return S.Array(__S(708, __c22, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          Encryption: S.optional(__S(706, __c22, 2)),
          HlsManifests: S.optional(__listOfHlsManifest),
          IncludeEncoderConfigurationInSegments: S.optional(S.Boolean),
          SegmentDurationSeconds: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            Encryption: "encryption",
            HlsManifests: "hlsManifests",
            IncludeEncoderConfigurationInSegments: "includeEncoderConfigurationInSegments",
            SegmentDurationSeconds: "segmentDurationSeconds",
          }),
        ),
      ).annotate({ identifier: "CmafPackage" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          ManifestLayout: S.optional(S.String),
          ManifestName: S.optional(S.String),
          MinBufferTimeSeconds: S.optional(S.Number),
          Profile: S.optional(S.String),
          ScteMarkersSource: S.optional(S.String),
          StreamSelection: S.optional(__S(707, __c22, 3)),
        }).pipe(
          S.encodeKeys({
            ManifestLayout: "manifestLayout",
            ManifestName: "manifestName",
            MinBufferTimeSeconds: "minBufferTimeSeconds",
            Profile: "profile",
            ScteMarkersSource: "scteMarkersSource",
            StreamSelection: "streamSelection",
          }),
        ),
      ).annotate({ identifier: "DashManifest" });
    case 8:
      return S.Array(__S(711, __c22, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({ SpekeKeyProvider: S.optional(__S(705, __c22, 1)) }).pipe(
          S.encodeKeys({ SpekeKeyProvider: "spekeKeyProvider" }),
        ),
      ).annotate({ identifier: "DashEncryption" });
    case 10:
      return S.Array(__PeriodTriggersElement);
    case 11:
      return S.suspend(() =>
        S.Struct({
          DashManifests: S.optional(__listOfDashManifest),
          Encryption: S.optional(__S(713, __c22, 9)),
          IncludeEncoderConfigurationInSegments: S.optional(S.Boolean),
          IncludeIframeOnlyStream: S.optional(S.Boolean),
          PeriodTriggers: S.optional(__listOf__PeriodTriggersElement),
          SegmentDurationSeconds: S.optional(S.Number),
          SegmentTemplateFormat: S.optional(S.String),
        }).pipe(
          S.encodeKeys({
            DashManifests: "dashManifests",
            Encryption: "encryption",
            IncludeEncoderConfigurationInSegments: "includeEncoderConfigurationInSegments",
            IncludeIframeOnlyStream: "includeIframeOnlyStream",
            PeriodTriggers: "periodTriggers",
            SegmentDurationSeconds: "segmentDurationSeconds",
            SegmentTemplateFormat: "segmentTemplateFormat",
          }),
        ),
      ).annotate({ identifier: "DashPackage" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          ConstantInitializationVector: S.optional(S.String),
          EncryptionMethod: S.optional(S.String),
          SpekeKeyProvider: S.optional(__S(705, __c22, 1)),
        }).pipe(
          S.encodeKeys({
            ConstantInitializationVector: "constantInitializationVector",
            EncryptionMethod: "encryptionMethod",
            SpekeKeyProvider: "spekeKeyProvider",
          }),
        ),
      ).annotate({ identifier: "HlsEncryption" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          Encryption: S.optional(__S(716, __c22, 12)),
          HlsManifests: S.optional(__listOfHlsManifest),
          IncludeDvbSubtitles: S.optional(S.Boolean),
          SegmentDurationSeconds: S.optional(S.Number),
          UseAudioRenditionGroup: S.optional(S.Boolean),
        }).pipe(
          S.encodeKeys({
            Encryption: "encryption",
            HlsManifests: "hlsManifests",
            IncludeDvbSubtitles: "includeDvbSubtitles",
            SegmentDurationSeconds: "segmentDurationSeconds",
            UseAudioRenditionGroup: "useAudioRenditionGroup",
          }),
        ),
      ).annotate({ identifier: "HlsPackage" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          ManifestName: S.optional(S.String),
          StreamSelection: S.optional(__S(707, __c22, 3)),
        }).pipe(S.encodeKeys({ ManifestName: "manifestName", StreamSelection: "streamSelection" })),
      ).annotate({ identifier: "MssManifest" });
    case 15:
      return S.Array(__S(718, __c22, 14));
    case 16:
      return S.suspend(() =>
        S.Struct({
          Encryption: S.optional(__S(713, __c22, 9)),
          MssManifests: S.optional(__listOfMssManifest),
          SegmentDurationSeconds: S.optional(S.Number),
        }).pipe(
          S.encodeKeys({
            Encryption: "encryption",
            MssManifests: "mssManifests",
            SegmentDurationSeconds: "segmentDurationSeconds",
          }),
        ),
      ).annotate({ identifier: "MssPackage" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CmafPackage: S.optional(__S(710, __c22, 6)),
          CreatedAt: S.optional(S.String),
          DashPackage: S.optional(__S(715, __c22, 11)),
          HlsPackage: S.optional(__S(717, __c22, 13)),
          Id: S.optional(S.String),
          MssPackage: S.optional(__S(720, __c22, 16)),
          PackagingGroupId: S.optional(S.String),
          Tags: S.optional(__S(512, __c16, 0)),
        }).pipe(
          S.encodeKeys({
            Arn: "arn",
            CmafPackage: "cmafPackage",
            CreatedAt: "createdAt",
            DashPackage: "dashPackage",
            HlsPackage: "hlsPackage",
            Id: "id",
            MssPackage: "mssPackage",
            PackagingGroupId: "packagingGroupId",
            Tags: "tags",
          }),
        ),
      ).annotate({ identifier: "CreatePackagingConfigurationResponse" });
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
          Authorization: S.optional(__S(577, __c18, 1)),
          EgressAccessLogs: S.optional(__S(576, __c18, 0)),
          Id: S.optional(S.String),
          Tags: S.optional(__S(512, __c16, 0)),
        })
          .pipe(
            S.encodeKeys({
              Authorization: "authorization",
              EgressAccessLogs: "egressAccessLogs",
              Id: "id",
              Tags: "tags",
            }),
          )
          .pipe(
            T.all(
              T.Http({ method: "POST", uri: "/packaging_groups" }),
              svc,
              auth,
              proto,
              ver,
              rules,
            ),
          ),
      ).annotate({ identifier: "CreatePackagingGroupRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
