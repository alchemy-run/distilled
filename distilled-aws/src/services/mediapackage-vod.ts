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
  sdkId: "MediaPackage Vod",
  serviceShapeName: "MediaPackageVod",
});
const auth = T.AwsAuthSigv4({ name: "mediapackage-vod" });
const ver = T.ServiceVersion("2018-11-07");
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
});

//# Newtypes
export type MaxResults = number;

//# Schemas
export interface EgressAccessLogs {
  LogGroupName?: string;
}
export const EgressAccessLogs = S.suspend(() =>
  S.Struct({ LogGroupName: S.optional(S.String) }).pipe(
    S.encodeKeys({ LogGroupName: "logGroupName" }),
  ),
).annotate({
  identifier: "EgressAccessLogs",
}) as any as S.Schema<EgressAccessLogs>;
export interface ConfigureLogsRequest {
  EgressAccessLogs?: EgressAccessLogs;
  Id: string;
}
export const ConfigureLogsRequest = S.suspend(() =>
  S.Struct({
    EgressAccessLogs: S.optional(EgressAccessLogs),
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
).annotate({
  identifier: "ConfigureLogsRequest",
}) as any as S.Schema<ConfigureLogsRequest>;
export interface Authorization {
  CdnIdentifierSecret?: string;
  SecretsRoleArn?: string;
}
export const Authorization = S.suspend(() =>
  S.Struct({
    CdnIdentifierSecret: S.optional(S.String),
    SecretsRoleArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      CdnIdentifierSecret: "cdnIdentifierSecret",
      SecretsRoleArn: "secretsRoleArn",
    }),
  ),
).annotate({ identifier: "Authorization" }) as any as S.Schema<Authorization>;
export type Tags = { [key: string]: string | undefined };
export const Tags = S.Record(S.String, S.String.pipe(S.optional));
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
export const ConfigureLogsResponse = S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Authorization: S.optional(Authorization),
    CreatedAt: S.optional(S.String),
    DomainName: S.optional(S.String),
    EgressAccessLogs: S.optional(EgressAccessLogs),
    Id: S.optional(S.String),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "ConfigureLogsResponse",
}) as any as S.Schema<ConfigureLogsResponse>;
export interface CreateAssetRequest {
  Id?: string;
  PackagingGroupId?: string;
  ResourceId?: string;
  SourceArn?: string;
  SourceRoleArn?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateAssetRequest = S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    PackagingGroupId: S.optional(S.String),
    ResourceId: S.optional(S.String),
    SourceArn: S.optional(S.String),
    SourceRoleArn: S.optional(S.String),
    Tags: S.optional(Tags),
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
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/assets" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateAssetRequest",
}) as any as S.Schema<CreateAssetRequest>;
export interface EgressEndpoint {
  PackagingConfigurationId?: string;
  Status?: string;
  Url?: string;
}
export const EgressEndpoint = S.suspend(() =>
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
).annotate({ identifier: "EgressEndpoint" }) as any as S.Schema<EgressEndpoint>;
export type __listOfEgressEndpoint = EgressEndpoint[];
export const __listOfEgressEndpoint = S.Array(EgressEndpoint);
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
export const CreateAssetResponse = S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreatedAt: S.optional(S.String),
    EgressEndpoints: S.optional(__listOfEgressEndpoint),
    Id: S.optional(S.String),
    PackagingGroupId: S.optional(S.String),
    ResourceId: S.optional(S.String),
    SourceArn: S.optional(S.String),
    SourceRoleArn: S.optional(S.String),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "CreateAssetResponse",
}) as any as S.Schema<CreateAssetResponse>;
export type PresetSpeke20Audio =
  | "PRESET-AUDIO-1"
  | "PRESET-AUDIO-2"
  | "PRESET-AUDIO-3"
  | "SHARED"
  | "UNENCRYPTED"
  | (string & {});
export const PresetSpeke20Audio = S.String;
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
export const PresetSpeke20Video = S.String;
export interface EncryptionContractConfiguration {
  PresetSpeke20Audio?: PresetSpeke20Audio;
  PresetSpeke20Video?: PresetSpeke20Video;
}
export const EncryptionContractConfiguration = S.suspend(() =>
  S.Struct({
    PresetSpeke20Audio: S.optional(PresetSpeke20Audio),
    PresetSpeke20Video: S.optional(PresetSpeke20Video),
  }).pipe(
    S.encodeKeys({
      PresetSpeke20Audio: "presetSpeke20Audio",
      PresetSpeke20Video: "presetSpeke20Video",
    }),
  ),
).annotate({
  identifier: "EncryptionContractConfiguration",
}) as any as S.Schema<EncryptionContractConfiguration>;
export type __listOf__string = string[];
export const __listOf__string = S.Array(S.String);
export interface SpekeKeyProvider {
  EncryptionContractConfiguration?: EncryptionContractConfiguration;
  RoleArn?: string;
  SystemIds?: string[];
  Url?: string;
}
export const SpekeKeyProvider = S.suspend(() =>
  S.Struct({
    EncryptionContractConfiguration: S.optional(
      EncryptionContractConfiguration,
    ),
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
).annotate({
  identifier: "SpekeKeyProvider",
}) as any as S.Schema<SpekeKeyProvider>;
export interface CmafEncryption {
  ConstantInitializationVector?: string;
  SpekeKeyProvider?: SpekeKeyProvider;
}
export const CmafEncryption = S.suspend(() =>
  S.Struct({
    ConstantInitializationVector: S.optional(S.String),
    SpekeKeyProvider: S.optional(SpekeKeyProvider),
  }).pipe(
    S.encodeKeys({
      ConstantInitializationVector: "constantInitializationVector",
      SpekeKeyProvider: "spekeKeyProvider",
    }),
  ),
).annotate({ identifier: "CmafEncryption" }) as any as S.Schema<CmafEncryption>;
export type AdMarkers =
  | "NONE"
  | "SCTE35_ENHANCED"
  | "PASSTHROUGH"
  | (string & {});
export const AdMarkers = S.String;
export type StreamOrder =
  | "ORIGINAL"
  | "VIDEO_BITRATE_ASCENDING"
  | "VIDEO_BITRATE_DESCENDING"
  | (string & {});
export const StreamOrder = S.String;
export interface StreamSelection {
  MaxVideoBitsPerSecond?: number;
  MinVideoBitsPerSecond?: number;
  StreamOrder?: StreamOrder;
}
export const StreamSelection = S.suspend(() =>
  S.Struct({
    MaxVideoBitsPerSecond: S.optional(S.Number),
    MinVideoBitsPerSecond: S.optional(S.Number),
    StreamOrder: S.optional(StreamOrder),
  }).pipe(
    S.encodeKeys({
      MaxVideoBitsPerSecond: "maxVideoBitsPerSecond",
      MinVideoBitsPerSecond: "minVideoBitsPerSecond",
      StreamOrder: "streamOrder",
    }),
  ),
).annotate({
  identifier: "StreamSelection",
}) as any as S.Schema<StreamSelection>;
export interface HlsManifest {
  AdMarkers?: AdMarkers;
  IncludeIframeOnlyStream?: boolean;
  ManifestName?: string;
  ProgramDateTimeIntervalSeconds?: number;
  RepeatExtXKey?: boolean;
  StreamSelection?: StreamSelection;
}
export const HlsManifest = S.suspend(() =>
  S.Struct({
    AdMarkers: S.optional(AdMarkers),
    IncludeIframeOnlyStream: S.optional(S.Boolean),
    ManifestName: S.optional(S.String),
    ProgramDateTimeIntervalSeconds: S.optional(S.Number),
    RepeatExtXKey: S.optional(S.Boolean),
    StreamSelection: S.optional(StreamSelection),
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
).annotate({ identifier: "HlsManifest" }) as any as S.Schema<HlsManifest>;
export type __listOfHlsManifest = HlsManifest[];
export const __listOfHlsManifest = S.Array(HlsManifest);
export interface CmafPackage {
  Encryption?: CmafEncryption;
  HlsManifests?: HlsManifest[];
  IncludeEncoderConfigurationInSegments?: boolean;
  SegmentDurationSeconds?: number;
}
export const CmafPackage = S.suspend(() =>
  S.Struct({
    Encryption: S.optional(CmafEncryption),
    HlsManifests: S.optional(__listOfHlsManifest),
    IncludeEncoderConfigurationInSegments: S.optional(S.Boolean),
    SegmentDurationSeconds: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Encryption: "encryption",
      HlsManifests: "hlsManifests",
      IncludeEncoderConfigurationInSegments:
        "includeEncoderConfigurationInSegments",
      SegmentDurationSeconds: "segmentDurationSeconds",
    }),
  ),
).annotate({ identifier: "CmafPackage" }) as any as S.Schema<CmafPackage>;
export type ManifestLayout = "FULL" | "COMPACT" | (string & {});
export const ManifestLayout = S.String;
export type Profile = "NONE" | "HBBTV_1_5" | (string & {});
export const Profile = S.String;
export type ScteMarkersSource = "SEGMENTS" | "MANIFEST" | (string & {});
export const ScteMarkersSource = S.String;
export interface DashManifest {
  ManifestLayout?: ManifestLayout;
  ManifestName?: string;
  MinBufferTimeSeconds?: number;
  Profile?: Profile;
  ScteMarkersSource?: ScteMarkersSource;
  StreamSelection?: StreamSelection;
}
export const DashManifest = S.suspend(() =>
  S.Struct({
    ManifestLayout: S.optional(ManifestLayout),
    ManifestName: S.optional(S.String),
    MinBufferTimeSeconds: S.optional(S.Number),
    Profile: S.optional(Profile),
    ScteMarkersSource: S.optional(ScteMarkersSource),
    StreamSelection: S.optional(StreamSelection),
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
).annotate({ identifier: "DashManifest" }) as any as S.Schema<DashManifest>;
export type __listOfDashManifest = DashManifest[];
export const __listOfDashManifest = S.Array(DashManifest);
export interface DashEncryption {
  SpekeKeyProvider?: SpekeKeyProvider;
}
export const DashEncryption = S.suspend(() =>
  S.Struct({ SpekeKeyProvider: S.optional(SpekeKeyProvider) }).pipe(
    S.encodeKeys({ SpekeKeyProvider: "spekeKeyProvider" }),
  ),
).annotate({ identifier: "DashEncryption" }) as any as S.Schema<DashEncryption>;
export type __PeriodTriggersElement = "ADS" | (string & {});
export const __PeriodTriggersElement = S.String;
export type __listOf__PeriodTriggersElement = __PeriodTriggersElement[];
export const __listOf__PeriodTriggersElement = S.Array(__PeriodTriggersElement);
export type SegmentTemplateFormat =
  | "NUMBER_WITH_TIMELINE"
  | "TIME_WITH_TIMELINE"
  | "NUMBER_WITH_DURATION"
  | (string & {});
export const SegmentTemplateFormat = S.String;
export interface DashPackage {
  DashManifests?: DashManifest[];
  Encryption?: DashEncryption;
  IncludeEncoderConfigurationInSegments?: boolean;
  IncludeIframeOnlyStream?: boolean;
  PeriodTriggers?: __PeriodTriggersElement[];
  SegmentDurationSeconds?: number;
  SegmentTemplateFormat?: SegmentTemplateFormat;
}
export const DashPackage = S.suspend(() =>
  S.Struct({
    DashManifests: S.optional(__listOfDashManifest),
    Encryption: S.optional(DashEncryption),
    IncludeEncoderConfigurationInSegments: S.optional(S.Boolean),
    IncludeIframeOnlyStream: S.optional(S.Boolean),
    PeriodTriggers: S.optional(__listOf__PeriodTriggersElement),
    SegmentDurationSeconds: S.optional(S.Number),
    SegmentTemplateFormat: S.optional(SegmentTemplateFormat),
  }).pipe(
    S.encodeKeys({
      DashManifests: "dashManifests",
      Encryption: "encryption",
      IncludeEncoderConfigurationInSegments:
        "includeEncoderConfigurationInSegments",
      IncludeIframeOnlyStream: "includeIframeOnlyStream",
      PeriodTriggers: "periodTriggers",
      SegmentDurationSeconds: "segmentDurationSeconds",
      SegmentTemplateFormat: "segmentTemplateFormat",
    }),
  ),
).annotate({ identifier: "DashPackage" }) as any as S.Schema<DashPackage>;
export type EncryptionMethod = "AES_128" | "SAMPLE_AES" | (string & {});
export const EncryptionMethod = S.String;
export interface HlsEncryption {
  ConstantInitializationVector?: string;
  EncryptionMethod?: EncryptionMethod;
  SpekeKeyProvider?: SpekeKeyProvider;
}
export const HlsEncryption = S.suspend(() =>
  S.Struct({
    ConstantInitializationVector: S.optional(S.String),
    EncryptionMethod: S.optional(EncryptionMethod),
    SpekeKeyProvider: S.optional(SpekeKeyProvider),
  }).pipe(
    S.encodeKeys({
      ConstantInitializationVector: "constantInitializationVector",
      EncryptionMethod: "encryptionMethod",
      SpekeKeyProvider: "spekeKeyProvider",
    }),
  ),
).annotate({ identifier: "HlsEncryption" }) as any as S.Schema<HlsEncryption>;
export interface HlsPackage {
  Encryption?: HlsEncryption;
  HlsManifests?: HlsManifest[];
  IncludeDvbSubtitles?: boolean;
  SegmentDurationSeconds?: number;
  UseAudioRenditionGroup?: boolean;
}
export const HlsPackage = S.suspend(() =>
  S.Struct({
    Encryption: S.optional(HlsEncryption),
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
).annotate({ identifier: "HlsPackage" }) as any as S.Schema<HlsPackage>;
export interface MssEncryption {
  SpekeKeyProvider?: SpekeKeyProvider;
}
export const MssEncryption = S.suspend(() =>
  S.Struct({ SpekeKeyProvider: S.optional(SpekeKeyProvider) }).pipe(
    S.encodeKeys({ SpekeKeyProvider: "spekeKeyProvider" }),
  ),
).annotate({ identifier: "MssEncryption" }) as any as S.Schema<MssEncryption>;
export interface MssManifest {
  ManifestName?: string;
  StreamSelection?: StreamSelection;
}
export const MssManifest = S.suspend(() =>
  S.Struct({
    ManifestName: S.optional(S.String),
    StreamSelection: S.optional(StreamSelection),
  }).pipe(
    S.encodeKeys({
      ManifestName: "manifestName",
      StreamSelection: "streamSelection",
    }),
  ),
).annotate({ identifier: "MssManifest" }) as any as S.Schema<MssManifest>;
export type __listOfMssManifest = MssManifest[];
export const __listOfMssManifest = S.Array(MssManifest);
export interface MssPackage {
  Encryption?: MssEncryption;
  MssManifests?: MssManifest[];
  SegmentDurationSeconds?: number;
}
export const MssPackage = S.suspend(() =>
  S.Struct({
    Encryption: S.optional(MssEncryption),
    MssManifests: S.optional(__listOfMssManifest),
    SegmentDurationSeconds: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Encryption: "encryption",
      MssManifests: "mssManifests",
      SegmentDurationSeconds: "segmentDurationSeconds",
    }),
  ),
).annotate({ identifier: "MssPackage" }) as any as S.Schema<MssPackage>;
export interface CreatePackagingConfigurationRequest {
  CmafPackage?: CmafPackage;
  DashPackage?: DashPackage;
  HlsPackage?: HlsPackage;
  Id?: string;
  MssPackage?: MssPackage;
  PackagingGroupId?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreatePackagingConfigurationRequest = S.suspend(() =>
  S.Struct({
    CmafPackage: S.optional(CmafPackage),
    DashPackage: S.optional(DashPackage),
    HlsPackage: S.optional(HlsPackage),
    Id: S.optional(S.String),
    MssPackage: S.optional(MssPackage),
    PackagingGroupId: S.optional(S.String),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "CreatePackagingConfigurationRequest",
}) as any as S.Schema<CreatePackagingConfigurationRequest>;
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
export const CreatePackagingConfigurationResponse = S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CmafPackage: S.optional(CmafPackage),
    CreatedAt: S.optional(S.String),
    DashPackage: S.optional(DashPackage),
    HlsPackage: S.optional(HlsPackage),
    Id: S.optional(S.String),
    MssPackage: S.optional(MssPackage),
    PackagingGroupId: S.optional(S.String),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "CreatePackagingConfigurationResponse",
}) as any as S.Schema<CreatePackagingConfigurationResponse>;
export interface CreatePackagingGroupRequest {
  Authorization?: Authorization;
  EgressAccessLogs?: EgressAccessLogs;
  Id?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreatePackagingGroupRequest = S.suspend(() =>
  S.Struct({
    Authorization: S.optional(Authorization),
    EgressAccessLogs: S.optional(EgressAccessLogs),
    Id: S.optional(S.String),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "CreatePackagingGroupRequest",
}) as any as S.Schema<CreatePackagingGroupRequest>;
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
export const CreatePackagingGroupResponse = S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Authorization: S.optional(Authorization),
    CreatedAt: S.optional(S.String),
    DomainName: S.optional(S.String),
    EgressAccessLogs: S.optional(EgressAccessLogs),
    Id: S.optional(S.String),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "CreatePackagingGroupResponse",
}) as any as S.Schema<CreatePackagingGroupResponse>;
export interface DeleteAssetRequest {
  Id: string;
}
export const DeleteAssetRequest = S.suspend(() =>
  S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/assets/{Id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAssetRequest",
}) as any as S.Schema<DeleteAssetRequest>;
export interface DeleteAssetResponse {}
export const DeleteAssetResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteAssetResponse",
}) as any as S.Schema<DeleteAssetResponse>;
export interface DeletePackagingConfigurationRequest {
  Id: string;
}
export const DeletePackagingConfigurationRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeletePackagingConfigurationRequest",
}) as any as S.Schema<DeletePackagingConfigurationRequest>;
export interface DeletePackagingConfigurationResponse {}
export const DeletePackagingConfigurationResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePackagingConfigurationResponse",
}) as any as S.Schema<DeletePackagingConfigurationResponse>;
export interface DeletePackagingGroupRequest {
  Id: string;
}
export const DeletePackagingGroupRequest = S.suspend(() =>
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
).annotate({
  identifier: "DeletePackagingGroupRequest",
}) as any as S.Schema<DeletePackagingGroupRequest>;
export interface DeletePackagingGroupResponse {}
export const DeletePackagingGroupResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePackagingGroupResponse",
}) as any as S.Schema<DeletePackagingGroupResponse>;
export interface DescribeAssetRequest {
  Id: string;
}
export const DescribeAssetRequest = S.suspend(() =>
  S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/assets/{Id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAssetRequest",
}) as any as S.Schema<DescribeAssetRequest>;
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
export const DescribeAssetResponse = S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreatedAt: S.optional(S.String),
    EgressEndpoints: S.optional(__listOfEgressEndpoint),
    Id: S.optional(S.String),
    PackagingGroupId: S.optional(S.String),
    ResourceId: S.optional(S.String),
    SourceArn: S.optional(S.String),
    SourceRoleArn: S.optional(S.String),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "DescribeAssetResponse",
}) as any as S.Schema<DescribeAssetResponse>;
export interface DescribePackagingConfigurationRequest {
  Id: string;
}
export const DescribePackagingConfigurationRequest = S.suspend(() =>
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
).annotate({
  identifier: "DescribePackagingConfigurationRequest",
}) as any as S.Schema<DescribePackagingConfigurationRequest>;
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
export const DescribePackagingConfigurationResponse = S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CmafPackage: S.optional(CmafPackage),
    CreatedAt: S.optional(S.String),
    DashPackage: S.optional(DashPackage),
    HlsPackage: S.optional(HlsPackage),
    Id: S.optional(S.String),
    MssPackage: S.optional(MssPackage),
    PackagingGroupId: S.optional(S.String),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "DescribePackagingConfigurationResponse",
}) as any as S.Schema<DescribePackagingConfigurationResponse>;
export interface DescribePackagingGroupRequest {
  Id: string;
}
export const DescribePackagingGroupRequest = S.suspend(() =>
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
).annotate({
  identifier: "DescribePackagingGroupRequest",
}) as any as S.Schema<DescribePackagingGroupRequest>;
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
export const DescribePackagingGroupResponse = S.suspend(() =>
  S.Struct({
    ApproximateAssetCount: S.optional(S.Number),
    Arn: S.optional(S.String),
    Authorization: S.optional(Authorization),
    CreatedAt: S.optional(S.String),
    DomainName: S.optional(S.String),
    EgressAccessLogs: S.optional(EgressAccessLogs),
    Id: S.optional(S.String),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "DescribePackagingGroupResponse",
}) as any as S.Schema<DescribePackagingGroupResponse>;
export interface ListAssetsRequest {
  MaxResults?: number;
  NextToken?: string;
  PackagingGroupId?: string;
}
export const ListAssetsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    PackagingGroupId: S.optional(S.String).pipe(
      T.HttpQuery("packagingGroupId"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/assets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAssetsRequest",
}) as any as S.Schema<ListAssetsRequest>;
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
export const AssetShallow = S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreatedAt: S.optional(S.String),
    Id: S.optional(S.String),
    PackagingGroupId: S.optional(S.String),
    ResourceId: S.optional(S.String),
    SourceArn: S.optional(S.String),
    SourceRoleArn: S.optional(S.String),
    Tags: S.optional(Tags),
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
).annotate({ identifier: "AssetShallow" }) as any as S.Schema<AssetShallow>;
export type __listOfAssetShallow = AssetShallow[];
export const __listOfAssetShallow = S.Array(AssetShallow);
export interface ListAssetsResponse {
  Assets?: AssetShallow[];
  NextToken?: string;
}
export const ListAssetsResponse = S.suspend(() =>
  S.Struct({
    Assets: S.optional(__listOfAssetShallow),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Assets: "assets", NextToken: "nextToken" })),
).annotate({
  identifier: "ListAssetsResponse",
}) as any as S.Schema<ListAssetsResponse>;
export interface ListPackagingConfigurationsRequest {
  MaxResults?: number;
  NextToken?: string;
  PackagingGroupId?: string;
}
export const ListPackagingConfigurationsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    PackagingGroupId: S.optional(S.String).pipe(
      T.HttpQuery("packagingGroupId"),
    ),
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
).annotate({
  identifier: "ListPackagingConfigurationsRequest",
}) as any as S.Schema<ListPackagingConfigurationsRequest>;
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
export const PackagingConfiguration = S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CmafPackage: S.optional(CmafPackage),
    CreatedAt: S.optional(S.String),
    DashPackage: S.optional(DashPackage),
    HlsPackage: S.optional(HlsPackage),
    Id: S.optional(S.String),
    MssPackage: S.optional(MssPackage),
    PackagingGroupId: S.optional(S.String),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "PackagingConfiguration",
}) as any as S.Schema<PackagingConfiguration>;
export type __listOfPackagingConfiguration = PackagingConfiguration[];
export const __listOfPackagingConfiguration = S.Array(PackagingConfiguration);
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
export const ListPackagingConfigurationsResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    PackagingConfigurations: S.optional(__listOfPackagingConfiguration),
  }).pipe(
    S.encodeKeys({
      NextToken: "nextToken",
      PackagingConfigurations: "packagingConfigurations",
    }),
  ),
).annotate({
  identifier: "ListPackagingConfigurationsResponse",
}) as any as S.Schema<ListPackagingConfigurationsResponse>;
export interface ListPackagingGroupsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListPackagingGroupsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/packaging_groups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPackagingGroupsRequest",
}) as any as S.Schema<ListPackagingGroupsRequest>;
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
export const PackagingGroup = S.suspend(() =>
  S.Struct({
    ApproximateAssetCount: S.optional(S.Number),
    Arn: S.optional(S.String),
    Authorization: S.optional(Authorization),
    CreatedAt: S.optional(S.String),
    DomainName: S.optional(S.String),
    EgressAccessLogs: S.optional(EgressAccessLogs),
    Id: S.optional(S.String),
    Tags: S.optional(Tags),
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
).annotate({ identifier: "PackagingGroup" }) as any as S.Schema<PackagingGroup>;
export type __listOfPackagingGroup = PackagingGroup[];
export const __listOfPackagingGroup = S.Array(PackagingGroup);
export interface ListPackagingGroupsResponse {
  NextToken?: string;
  PackagingGroups?: (PackagingGroup & {
    Authorization: Authorization & {
      CdnIdentifierSecret: string;
      SecretsRoleArn: string;
    };
  })[];
}
export const ListPackagingGroupsResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    PackagingGroups: S.optional(__listOfPackagingGroup),
  }).pipe(
    S.encodeKeys({
      NextToken: "nextToken",
      PackagingGroups: "packagingGroups",
    }),
  ),
).annotate({
  identifier: "ListPackagingGroupsResponse",
}) as any as S.Schema<ListPackagingGroupsResponse>;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export type __mapOf__string = { [key: string]: string | undefined };
export const __mapOf__string = S.Record(S.String, S.String.pipe(S.optional));
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ Tags: S.optional(__mapOf__string) }).pipe(
    S.encodeKeys({ Tags: "tags" }),
  ),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags?: { [key: string]: string | undefined };
}
export const TagResourceRequest = S.suspend(() =>
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
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export const UntagResourceRequest = S.suspend(() =>
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
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdatePackagingGroupRequest {
  Authorization?: Authorization;
  Id: string;
}
export const UpdatePackagingGroupRequest = S.suspend(() =>
  S.Struct({
    Authorization: S.optional(Authorization),
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
).annotate({
  identifier: "UpdatePackagingGroupRequest",
}) as any as S.Schema<UpdatePackagingGroupRequest>;
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
export const UpdatePackagingGroupResponse = S.suspend(() =>
  S.Struct({
    ApproximateAssetCount: S.optional(S.Number),
    Arn: S.optional(S.String),
    Authorization: S.optional(Authorization),
    CreatedAt: S.optional(S.String),
    DomainName: S.optional(S.String),
    EgressAccessLogs: S.optional(EgressAccessLogs),
    Id: S.optional(S.String),
    Tags: S.optional(Tags),
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
).annotate({
  identifier: "UpdatePackagingGroupResponse",
}) as any as S.Schema<UpdatePackagingGroupResponse>;

//# Errors
export class ForbiddenException extends S.TaggedErrorClass<ForbiddenException>()(
  "ForbiddenException",
  { Message: S.optional(S.String) },
).pipe(C.withAuthError) {}
export class InternalServerErrorException extends S.TaggedErrorClass<InternalServerErrorException>()(
  "InternalServerErrorException",
  { Message: S.optional(S.String) },
).pipe(C.withServerError) {}
export class NotFoundException extends S.TaggedErrorClass<NotFoundException>()(
  "NotFoundException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ServiceUnavailableException extends S.TaggedErrorClass<ServiceUnavailableException>()(
  "ServiceUnavailableException",
  { Message: S.optional(S.String) },
).pipe(C.withServerError) {}
export class TooManyRequestsException extends S.TaggedErrorClass<TooManyRequestsException>()(
  "TooManyRequestsException",
  { Message: S.optional(S.String) },
).pipe(C.withThrottlingError) {}
export class UnprocessableEntityException extends S.TaggedErrorClass<UnprocessableEntityException>()(
  "UnprocessableEntityException",
  { Message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}

//# Operations
/**
 * Changes the packaging group's properities to configure log subscription
 */
export const configureLogs: (
  input: ConfigureLogsRequest,
) => effect.Effect<
  ConfigureLogsResponse,
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ConfigureLogsRequest,
  output: ConfigureLogsResponse,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
}));
/**
 * Creates a new MediaPackage VOD Asset resource.
 */
export const createAsset: (
  input: CreateAssetRequest,
) => effect.Effect<
  CreateAssetResponse,
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateAssetRequest,
  output: CreateAssetResponse,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
}));
/**
 * Creates a new MediaPackage VOD PackagingConfiguration resource.
 */
export const createPackagingConfiguration: (
  input: CreatePackagingConfigurationRequest,
) => effect.Effect<
  CreatePackagingConfigurationResponse,
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreatePackagingConfigurationRequest,
  output: CreatePackagingConfigurationResponse,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
}));
/**
 * Creates a new MediaPackage VOD PackagingGroup resource.
 */
export const createPackagingGroup: (
  input: CreatePackagingGroupRequest,
) => effect.Effect<
  CreatePackagingGroupResponse,
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreatePackagingGroupRequest,
  output: CreatePackagingGroupResponse,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
}));
/**
 * Deletes an existing MediaPackage VOD Asset resource.
 */
export const deleteAsset: (
  input: DeleteAssetRequest,
) => effect.Effect<
  DeleteAssetResponse,
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteAssetRequest,
  output: DeleteAssetResponse,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
}));
/**
 * Deletes a MediaPackage VOD PackagingConfiguration resource.
 */
export const deletePackagingConfiguration: (
  input: DeletePackagingConfigurationRequest,
) => effect.Effect<
  DeletePackagingConfigurationResponse,
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeletePackagingConfigurationRequest,
  output: DeletePackagingConfigurationResponse,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
}));
/**
 * Deletes a MediaPackage VOD PackagingGroup resource.
 */
export const deletePackagingGroup: (
  input: DeletePackagingGroupRequest,
) => effect.Effect<
  DeletePackagingGroupResponse,
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeletePackagingGroupRequest,
  output: DeletePackagingGroupResponse,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
}));
/**
 * Returns a description of a MediaPackage VOD Asset resource.
 */
export const describeAsset: (
  input: DescribeAssetRequest,
) => effect.Effect<
  DescribeAssetResponse,
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeAssetRequest,
  output: DescribeAssetResponse,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
}));
/**
 * Returns a description of a MediaPackage VOD PackagingConfiguration resource.
 */
export const describePackagingConfiguration: (
  input: DescribePackagingConfigurationRequest,
) => effect.Effect<
  DescribePackagingConfigurationResponse,
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribePackagingConfigurationRequest,
  output: DescribePackagingConfigurationResponse,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
}));
/**
 * Returns a description of a MediaPackage VOD PackagingGroup resource.
 */
export const describePackagingGroup: (
  input: DescribePackagingGroupRequest,
) => effect.Effect<
  DescribePackagingGroupResponse,
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribePackagingGroupRequest,
  output: DescribePackagingGroupResponse,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
}));
/**
 * Returns a collection of MediaPackage VOD Asset resources.
 */
export const listAssets: {
  (
    input: ListAssetsRequest,
  ): effect.Effect<
    ListAssetsResponse,
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | ServiceUnavailableException
    | TooManyRequestsException
    | UnprocessableEntityException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListAssetsRequest,
  ) => stream.Stream<
    ListAssetsResponse,
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | ServiceUnavailableException
    | TooManyRequestsException
    | UnprocessableEntityException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListAssetsRequest,
  ) => stream.Stream<
    AssetShallow,
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | ServiceUnavailableException
    | TooManyRequestsException
    | UnprocessableEntityException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAssetsRequest,
  output: ListAssetsResponse,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Assets",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns a collection of MediaPackage VOD PackagingConfiguration resources.
 */
export const listPackagingConfigurations: {
  (
    input: ListPackagingConfigurationsRequest,
  ): effect.Effect<
    ListPackagingConfigurationsResponse,
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | ServiceUnavailableException
    | TooManyRequestsException
    | UnprocessableEntityException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListPackagingConfigurationsRequest,
  ) => stream.Stream<
    ListPackagingConfigurationsResponse,
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | ServiceUnavailableException
    | TooManyRequestsException
    | UnprocessableEntityException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListPackagingConfigurationsRequest,
  ) => stream.Stream<
    PackagingConfiguration,
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | ServiceUnavailableException
    | TooManyRequestsException
    | UnprocessableEntityException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPackagingConfigurationsRequest,
  output: ListPackagingConfigurationsResponse,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PackagingConfigurations",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns a collection of MediaPackage VOD PackagingGroup resources.
 */
export const listPackagingGroups: {
  (
    input: ListPackagingGroupsRequest,
  ): effect.Effect<
    ListPackagingGroupsResponse,
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | ServiceUnavailableException
    | TooManyRequestsException
    | UnprocessableEntityException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  pages: (
    input: ListPackagingGroupsRequest,
  ) => stream.Stream<
    ListPackagingGroupsResponse,
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | ServiceUnavailableException
    | TooManyRequestsException
    | UnprocessableEntityException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListPackagingGroupsRequest,
  ) => stream.Stream<
    PackagingGroup,
    | ForbiddenException
    | InternalServerErrorException
    | NotFoundException
    | ServiceUnavailableException
    | TooManyRequestsException
    | UnprocessableEntityException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPackagingGroupsRequest,
  output: ListPackagingGroupsResponse,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PackagingGroups",
    pageSize: "MaxResults",
  } as const,
}));
/**
 * Returns a list of the tags assigned to the specified resource.
 */
export const listTagsForResource: (
  input: ListTagsForResourceRequest,
) => effect.Effect<
  ListTagsForResourceResponse,
  CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [],
}));
/**
 * Adds tags to the specified resource. You can specify one or more tags to add.
 */
export const tagResource: (
  input: TagResourceRequest,
) => effect.Effect<
  TagResourceResponse,
  CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [],
}));
/**
 * Removes tags from the specified resource. You can specify one or more tags to remove.
 */
export const untagResource: (
  input: UntagResourceRequest,
) => effect.Effect<
  UntagResourceResponse,
  CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [],
}));
/**
 * Updates a specific packaging group. You can't change the id attribute or any other system-generated attributes.
 */
export const updatePackagingGroup: (
  input: UpdatePackagingGroupRequest,
) => effect.Effect<
  UpdatePackagingGroupResponse,
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdatePackagingGroupRequest,
  output: UpdatePackagingGroupResponse,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
}));
