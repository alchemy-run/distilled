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
import type { Region as Rgn } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "Workspaces Instances",
  serviceShapeName: "EUCMIFrontendAPIService",
});
const auth = T.AwsAuthSigv4({ name: "workspaces-instances" });
const ver = T.ServiceVersion("2022-07-26");
const proto = T.AwsProtocolsAwsJson1_0();
const rules = T.EndpointResolver((p, _) => {
  const { UseFIPS = false, Endpoint, Region } = p;
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
    return e(Endpoint);
  }
  if (Region != null) {
    {
      const PartitionResult = _.partition(Region);
      if (PartitionResult != null && PartitionResult !== false) {
        if (UseFIPS === true) {
          return e(
            `https://workspaces-instances-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(
          `https://workspaces-instances.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

//# Newtypes
export type WorkspaceInstanceId = string;
export type VolumeId = string;
export type DeviceName = string;
export type String64 = string;
export type ClientToken = string | redacted.Redacted<string>;
export type NonNegativeInteger = number;
export type KmsKeyId = string | redacted.Redacted<string>;
export type SnapshotId = string;
export type TagKey = string;
export type TagValue = string;
export type VirtualName = string;
export type String128 = string;
export type ARN = string;
export type ImageId = string;
export type InstanceType = string;
export type Ipv6Address = string | redacted.Redacted<string>;
export type HttpPutResponseHopLimit = number;
export type Description = string;
export type Ipv4Prefix = string;
export type Ipv6Prefix = string;
export type NetworkInterfaceId = string;
export type Ipv4Address = string | redacted.Redacted<string>;
export type SecurityGroupId = string;
export type SubnetId = string;
export type AvailabilityZone = string;
export type PlacementGroupId = string;
export type HostId = string;
export type SecurityGroupName = string;
export type UserData = string | redacted.Redacted<string>;
export type ListInstanceTypesMaxResults = number;
export type NextToken = string | redacted.Redacted<string>;
export type MaxResults = number;
export type RegionName = string;

//# Schemas
export interface AssociateVolumeRequest {
  WorkspaceInstanceId: string;
  VolumeId: string;
  Device: string;
}
export const AssociateVolumeRequest = S.suspend(() =>
  S.Struct({
    WorkspaceInstanceId: S.String,
    VolumeId: S.String,
    Device: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateVolumeRequest",
}) as any as S.Schema<AssociateVolumeRequest>;
export interface AssociateVolumeResponse {}
export const AssociateVolumeResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "AssociateVolumeResponse",
}) as any as S.Schema<AssociateVolumeResponse>;
export type ValidationExceptionReason =
  | "UNKNOWN_OPERATION"
  | "UNSUPPORTED_OPERATION"
  | "CANNOT_PARSE"
  | "FIELD_VALIDATION_FAILED"
  | "DEPENDENCY_FAILURE"
  | "OTHER"
  | (string & {});
export const ValidationExceptionReason = S.String;
export interface ValidationExceptionField {
  Name: string;
  Reason: string;
  Message: string;
}
export const ValidationExceptionField = S.suspend(() =>
  S.Struct({ Name: S.String, Reason: S.String, Message: S.String }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = S.Array(ValidationExceptionField);
export type ResourceTypeEnum =
  | "instance"
  | "volume"
  | "spot-instances-request"
  | "network-interface"
  | (string & {});
export const ResourceTypeEnum = S.String;
export interface Tag {
  Key?: string;
  Value?: string;
}
export const Tag = S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = S.Array(Tag);
export interface TagSpecification {
  ResourceType?: ResourceTypeEnum;
  Tags?: Tag[];
}
export const TagSpecification = S.suspend(() =>
  S.Struct({
    ResourceType: S.optional(ResourceTypeEnum),
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "TagSpecification",
}) as any as S.Schema<TagSpecification>;
export type TagSpecifications = TagSpecification[];
export const TagSpecifications = S.Array(TagSpecification);
export type VolumeTypeEnum =
  | "standard"
  | "io1"
  | "io2"
  | "gp2"
  | "sc1"
  | "st1"
  | "gp3"
  | (string & {});
export const VolumeTypeEnum = S.String;
export interface CreateVolumeRequest {
  AvailabilityZone: string;
  ClientToken?: string | redacted.Redacted<string>;
  Encrypted?: boolean;
  Iops?: number;
  KmsKeyId?: string | redacted.Redacted<string>;
  SizeInGB?: number;
  SnapshotId?: string;
  TagSpecifications?: TagSpecification[];
  Throughput?: number;
  VolumeType?: VolumeTypeEnum;
}
export const CreateVolumeRequest = S.suspend(() =>
  S.Struct({
    AvailabilityZone: S.String,
    ClientToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
    Encrypted: S.optional(S.Boolean),
    Iops: S.optional(S.Number),
    KmsKeyId: S.optional(SensitiveString),
    SizeInGB: S.optional(S.Number),
    SnapshotId: S.optional(S.String),
    TagSpecifications: S.optional(TagSpecifications),
    Throughput: S.optional(S.Number),
    VolumeType: S.optional(VolumeTypeEnum),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateVolumeRequest",
}) as any as S.Schema<CreateVolumeRequest>;
export interface CreateVolumeResponse {
  VolumeId?: string;
}
export const CreateVolumeResponse = S.suspend(() =>
  S.Struct({ VolumeId: S.optional(S.String) }),
).annotate({
  identifier: "CreateVolumeResponse",
}) as any as S.Schema<CreateVolumeResponse>;
export interface EbsBlockDevice {
  VolumeType?: VolumeTypeEnum;
  Encrypted?: boolean;
  KmsKeyId?: string | redacted.Redacted<string>;
  Iops?: number;
  Throughput?: number;
  VolumeSize?: number;
}
export const EbsBlockDevice = S.suspend(() =>
  S.Struct({
    VolumeType: S.optional(VolumeTypeEnum),
    Encrypted: S.optional(S.Boolean),
    KmsKeyId: S.optional(SensitiveString),
    Iops: S.optional(S.Number),
    Throughput: S.optional(S.Number),
    VolumeSize: S.optional(S.Number),
  }),
).annotate({ identifier: "EbsBlockDevice" }) as any as S.Schema<EbsBlockDevice>;
export interface BlockDeviceMappingRequest {
  DeviceName?: string;
  Ebs?: EbsBlockDevice;
  NoDevice?: string;
  VirtualName?: string;
}
export const BlockDeviceMappingRequest = S.suspend(() =>
  S.Struct({
    DeviceName: S.optional(S.String),
    Ebs: S.optional(EbsBlockDevice),
    NoDevice: S.optional(S.String),
    VirtualName: S.optional(S.String),
  }),
).annotate({
  identifier: "BlockDeviceMappingRequest",
}) as any as S.Schema<BlockDeviceMappingRequest>;
export type BlockDeviceMappings = BlockDeviceMappingRequest[];
export const BlockDeviceMappings = S.Array(BlockDeviceMappingRequest);
export type CapacityReservationPreferenceEnum =
  | "capacity-reservations-only"
  | "open"
  | "none"
  | (string & {});
export const CapacityReservationPreferenceEnum = S.String;
export interface CapacityReservationTarget {
  CapacityReservationId?: string;
  CapacityReservationResourceGroupArn?: string;
}
export const CapacityReservationTarget = S.suspend(() =>
  S.Struct({
    CapacityReservationId: S.optional(S.String),
    CapacityReservationResourceGroupArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CapacityReservationTarget",
}) as any as S.Schema<CapacityReservationTarget>;
export interface CapacityReservationSpecification {
  CapacityReservationPreference?: CapacityReservationPreferenceEnum;
  CapacityReservationTarget?: CapacityReservationTarget;
}
export const CapacityReservationSpecification = S.suspend(() =>
  S.Struct({
    CapacityReservationPreference: S.optional(
      CapacityReservationPreferenceEnum,
    ),
    CapacityReservationTarget: S.optional(CapacityReservationTarget),
  }),
).annotate({
  identifier: "CapacityReservationSpecification",
}) as any as S.Schema<CapacityReservationSpecification>;
export type AmdSevSnpEnum = "enabled" | "disabled" | (string & {});
export const AmdSevSnpEnum = S.String;
export interface CpuOptionsRequest {
  AmdSevSnp?: AmdSevSnpEnum;
  CoreCount?: number;
  ThreadsPerCore?: number;
}
export const CpuOptionsRequest = S.suspend(() =>
  S.Struct({
    AmdSevSnp: S.optional(AmdSevSnpEnum),
    CoreCount: S.optional(S.Number),
    ThreadsPerCore: S.optional(S.Number),
  }),
).annotate({
  identifier: "CpuOptionsRequest",
}) as any as S.Schema<CpuOptionsRequest>;
export type CpuCreditsEnum = "standard" | "unlimited" | (string & {});
export const CpuCreditsEnum = S.String;
export interface CreditSpecificationRequest {
  CpuCredits?: CpuCreditsEnum;
}
export const CreditSpecificationRequest = S.suspend(() =>
  S.Struct({ CpuCredits: S.optional(CpuCreditsEnum) }),
).annotate({
  identifier: "CreditSpecificationRequest",
}) as any as S.Schema<CreditSpecificationRequest>;
export interface EnclaveOptionsRequest {
  Enabled?: boolean;
}
export const EnclaveOptionsRequest = S.suspend(() =>
  S.Struct({ Enabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "EnclaveOptionsRequest",
}) as any as S.Schema<EnclaveOptionsRequest>;
export interface HibernationOptionsRequest {
  Configured?: boolean;
}
export const HibernationOptionsRequest = S.suspend(() =>
  S.Struct({ Configured: S.optional(S.Boolean) }),
).annotate({
  identifier: "HibernationOptionsRequest",
}) as any as S.Schema<HibernationOptionsRequest>;
export interface IamInstanceProfileSpecification {
  Arn?: string;
  Name?: string;
}
export const IamInstanceProfileSpecification = S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String), Name: S.optional(S.String) }),
).annotate({
  identifier: "IamInstanceProfileSpecification",
}) as any as S.Schema<IamInstanceProfileSpecification>;
export type MarketTypeEnum = "spot" | "capacity-block" | (string & {});
export const MarketTypeEnum = S.String;
export type InstanceInterruptionBehaviorEnum =
  | "hibernate"
  | "stop"
  | (string & {});
export const InstanceInterruptionBehaviorEnum = S.String;
export type SpotInstanceTypeEnum = "one-time" | "persistent" | (string & {});
export const SpotInstanceTypeEnum = S.String;
export interface SpotMarketOptions {
  BlockDurationMinutes?: number;
  InstanceInterruptionBehavior?: InstanceInterruptionBehaviorEnum;
  MaxPrice?: string;
  SpotInstanceType?: SpotInstanceTypeEnum;
  ValidUntilUtc?: Date;
}
export const SpotMarketOptions = S.suspend(() =>
  S.Struct({
    BlockDurationMinutes: S.optional(S.Number),
    InstanceInterruptionBehavior: S.optional(InstanceInterruptionBehaviorEnum),
    MaxPrice: S.optional(S.String),
    SpotInstanceType: S.optional(SpotInstanceTypeEnum),
    ValidUntilUtc: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "SpotMarketOptions",
}) as any as S.Schema<SpotMarketOptions>;
export interface InstanceMarketOptionsRequest {
  MarketType?: MarketTypeEnum;
  SpotOptions?: SpotMarketOptions;
}
export const InstanceMarketOptionsRequest = S.suspend(() =>
  S.Struct({
    MarketType: S.optional(MarketTypeEnum),
    SpotOptions: S.optional(SpotMarketOptions),
  }),
).annotate({
  identifier: "InstanceMarketOptionsRequest",
}) as any as S.Schema<InstanceMarketOptionsRequest>;
export interface InstanceIpv6Address {
  Ipv6Address?: string | redacted.Redacted<string>;
  IsPrimaryIpv6?: boolean;
}
export const InstanceIpv6Address = S.suspend(() =>
  S.Struct({
    Ipv6Address: S.optional(SensitiveString),
    IsPrimaryIpv6: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "InstanceIpv6Address",
}) as any as S.Schema<InstanceIpv6Address>;
export type Ipv6Addresses = InstanceIpv6Address[];
export const Ipv6Addresses = S.Array(InstanceIpv6Address);
export interface LicenseConfigurationRequest {
  LicenseConfigurationArn?: string;
}
export const LicenseConfigurationRequest = S.suspend(() =>
  S.Struct({ LicenseConfigurationArn: S.optional(S.String) }),
).annotate({
  identifier: "LicenseConfigurationRequest",
}) as any as S.Schema<LicenseConfigurationRequest>;
export type LicenseSpecifications = LicenseConfigurationRequest[];
export const LicenseSpecifications = S.Array(LicenseConfigurationRequest);
export type AutoRecoveryEnum = "disabled" | "default" | (string & {});
export const AutoRecoveryEnum = S.String;
export interface InstanceMaintenanceOptionsRequest {
  AutoRecovery?: AutoRecoveryEnum;
}
export const InstanceMaintenanceOptionsRequest = S.suspend(() =>
  S.Struct({ AutoRecovery: S.optional(AutoRecoveryEnum) }),
).annotate({
  identifier: "InstanceMaintenanceOptionsRequest",
}) as any as S.Schema<InstanceMaintenanceOptionsRequest>;
export type HttpEndpointEnum = "enabled" | "disabled" | (string & {});
export const HttpEndpointEnum = S.String;
export type HttpProtocolIpv6Enum = "enabled" | "disabled" | (string & {});
export const HttpProtocolIpv6Enum = S.String;
export type HttpTokensEnum = "optional" | "required" | (string & {});
export const HttpTokensEnum = S.String;
export type InstanceMetadataTagsEnum = "enabled" | "disabled" | (string & {});
export const InstanceMetadataTagsEnum = S.String;
export interface InstanceMetadataOptionsRequest {
  HttpEndpoint?: HttpEndpointEnum;
  HttpProtocolIpv6?: HttpProtocolIpv6Enum;
  HttpPutResponseHopLimit?: number;
  HttpTokens?: HttpTokensEnum;
  InstanceMetadataTags?: InstanceMetadataTagsEnum;
}
export const InstanceMetadataOptionsRequest = S.suspend(() =>
  S.Struct({
    HttpEndpoint: S.optional(HttpEndpointEnum),
    HttpProtocolIpv6: S.optional(HttpProtocolIpv6Enum),
    HttpPutResponseHopLimit: S.optional(S.Number),
    HttpTokens: S.optional(HttpTokensEnum),
    InstanceMetadataTags: S.optional(InstanceMetadataTagsEnum),
  }),
).annotate({
  identifier: "InstanceMetadataOptionsRequest",
}) as any as S.Schema<InstanceMetadataOptionsRequest>;
export interface RunInstancesMonitoringEnabled {
  Enabled?: boolean;
}
export const RunInstancesMonitoringEnabled = S.suspend(() =>
  S.Struct({ Enabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "RunInstancesMonitoringEnabled",
}) as any as S.Schema<RunInstancesMonitoringEnabled>;
export interface ConnectionTrackingSpecificationRequest {
  TcpEstablishedTimeout?: number;
  UdpStreamTimeout?: number;
  UdpTimeout?: number;
}
export const ConnectionTrackingSpecificationRequest = S.suspend(() =>
  S.Struct({
    TcpEstablishedTimeout: S.optional(S.Number),
    UdpStreamTimeout: S.optional(S.Number),
    UdpTimeout: S.optional(S.Number),
  }),
).annotate({
  identifier: "ConnectionTrackingSpecificationRequest",
}) as any as S.Schema<ConnectionTrackingSpecificationRequest>;
export interface EnaSrdUdpSpecificationRequest {
  EnaSrdUdpEnabled?: boolean;
}
export const EnaSrdUdpSpecificationRequest = S.suspend(() =>
  S.Struct({ EnaSrdUdpEnabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "EnaSrdUdpSpecificationRequest",
}) as any as S.Schema<EnaSrdUdpSpecificationRequest>;
export interface EnaSrdSpecificationRequest {
  EnaSrdEnabled?: boolean;
  EnaSrdUdpSpecification?: EnaSrdUdpSpecificationRequest;
}
export const EnaSrdSpecificationRequest = S.suspend(() =>
  S.Struct({
    EnaSrdEnabled: S.optional(S.Boolean),
    EnaSrdUdpSpecification: S.optional(EnaSrdUdpSpecificationRequest),
  }),
).annotate({
  identifier: "EnaSrdSpecificationRequest",
}) as any as S.Schema<EnaSrdSpecificationRequest>;
export type InterfaceTypeEnum =
  | "interface"
  | "efa"
  | "efa-only"
  | (string & {});
export const InterfaceTypeEnum = S.String;
export interface Ipv4PrefixSpecificationRequest {
  Ipv4Prefix?: string;
}
export const Ipv4PrefixSpecificationRequest = S.suspend(() =>
  S.Struct({ Ipv4Prefix: S.optional(S.String) }),
).annotate({
  identifier: "Ipv4PrefixSpecificationRequest",
}) as any as S.Schema<Ipv4PrefixSpecificationRequest>;
export type Ipv4Prefixes = Ipv4PrefixSpecificationRequest[];
export const Ipv4Prefixes = S.Array(Ipv4PrefixSpecificationRequest);
export interface Ipv6PrefixSpecificationRequest {
  Ipv6Prefix?: string;
}
export const Ipv6PrefixSpecificationRequest = S.suspend(() =>
  S.Struct({ Ipv6Prefix: S.optional(S.String) }),
).annotate({
  identifier: "Ipv6PrefixSpecificationRequest",
}) as any as S.Schema<Ipv6PrefixSpecificationRequest>;
export type Ipv6Prefixes = Ipv6PrefixSpecificationRequest[];
export const Ipv6Prefixes = S.Array(Ipv6PrefixSpecificationRequest);
export interface PrivateIpAddressSpecification {
  Primary?: boolean;
  PrivateIpAddress?: string | redacted.Redacted<string>;
}
export const PrivateIpAddressSpecification = S.suspend(() =>
  S.Struct({
    Primary: S.optional(S.Boolean),
    PrivateIpAddress: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "PrivateIpAddressSpecification",
}) as any as S.Schema<PrivateIpAddressSpecification>;
export type PrivateIpAddresses = PrivateIpAddressSpecification[];
export const PrivateIpAddresses = S.Array(PrivateIpAddressSpecification);
export type SecurityGroupIds = string[];
export const SecurityGroupIds = S.Array(S.String);
export interface InstanceNetworkInterfaceSpecification {
  AssociateCarrierIpAddress?: boolean;
  AssociatePublicIpAddress?: boolean;
  ConnectionTrackingSpecification?: ConnectionTrackingSpecificationRequest;
  Description?: string;
  DeviceIndex?: number;
  EnaSrdSpecification?: EnaSrdSpecificationRequest;
  InterfaceType?: InterfaceTypeEnum;
  Ipv4Prefixes?: Ipv4PrefixSpecificationRequest[];
  Ipv4PrefixCount?: number;
  Ipv6AddressCount?: number;
  Ipv6Addresses?: InstanceIpv6Address[];
  Ipv6Prefixes?: Ipv6PrefixSpecificationRequest[];
  Ipv6PrefixCount?: number;
  NetworkCardIndex?: number;
  NetworkInterfaceId?: string;
  PrimaryIpv6?: boolean;
  PrivateIpAddress?: string | redacted.Redacted<string>;
  PrivateIpAddresses?: PrivateIpAddressSpecification[];
  SecondaryPrivateIpAddressCount?: number;
  Groups?: string[];
  SubnetId?: string;
}
export const InstanceNetworkInterfaceSpecification = S.suspend(() =>
  S.Struct({
    AssociateCarrierIpAddress: S.optional(S.Boolean),
    AssociatePublicIpAddress: S.optional(S.Boolean),
    ConnectionTrackingSpecification: S.optional(
      ConnectionTrackingSpecificationRequest,
    ),
    Description: S.optional(S.String),
    DeviceIndex: S.optional(S.Number),
    EnaSrdSpecification: S.optional(EnaSrdSpecificationRequest),
    InterfaceType: S.optional(InterfaceTypeEnum),
    Ipv4Prefixes: S.optional(Ipv4Prefixes),
    Ipv4PrefixCount: S.optional(S.Number),
    Ipv6AddressCount: S.optional(S.Number),
    Ipv6Addresses: S.optional(Ipv6Addresses),
    Ipv6Prefixes: S.optional(Ipv6Prefixes),
    Ipv6PrefixCount: S.optional(S.Number),
    NetworkCardIndex: S.optional(S.Number),
    NetworkInterfaceId: S.optional(S.String),
    PrimaryIpv6: S.optional(S.Boolean),
    PrivateIpAddress: S.optional(SensitiveString),
    PrivateIpAddresses: S.optional(PrivateIpAddresses),
    SecondaryPrivateIpAddressCount: S.optional(S.Number),
    Groups: S.optional(SecurityGroupIds),
    SubnetId: S.optional(S.String),
  }),
).annotate({
  identifier: "InstanceNetworkInterfaceSpecification",
}) as any as S.Schema<InstanceNetworkInterfaceSpecification>;
export type NetworkInterfaces = InstanceNetworkInterfaceSpecification[];
export const NetworkInterfaces = S.Array(InstanceNetworkInterfaceSpecification);
export type BandwidthWeightingEnum =
  | "default"
  | "vpc-1"
  | "ebs-1"
  | (string & {});
export const BandwidthWeightingEnum = S.String;
export interface InstanceNetworkPerformanceOptionsRequest {
  BandwidthWeighting?: BandwidthWeightingEnum;
}
export const InstanceNetworkPerformanceOptionsRequest = S.suspend(() =>
  S.Struct({ BandwidthWeighting: S.optional(BandwidthWeightingEnum) }),
).annotate({
  identifier: "InstanceNetworkPerformanceOptionsRequest",
}) as any as S.Schema<InstanceNetworkPerformanceOptionsRequest>;
export type TenancyEnum = "default" | "dedicated" | "host" | (string & {});
export const TenancyEnum = S.String;
export interface Placement {
  Affinity?: string;
  AvailabilityZone?: string;
  GroupId?: string;
  GroupName?: string;
  HostId?: string;
  HostResourceGroupArn?: string;
  PartitionNumber?: number;
  Tenancy?: TenancyEnum;
}
export const Placement = S.suspend(() =>
  S.Struct({
    Affinity: S.optional(S.String),
    AvailabilityZone: S.optional(S.String),
    GroupId: S.optional(S.String),
    GroupName: S.optional(S.String),
    HostId: S.optional(S.String),
    HostResourceGroupArn: S.optional(S.String),
    PartitionNumber: S.optional(S.Number),
    Tenancy: S.optional(TenancyEnum),
  }),
).annotate({ identifier: "Placement" }) as any as S.Schema<Placement>;
export type HostnameTypeEnum = "ip-name" | "resource-name" | (string & {});
export const HostnameTypeEnum = S.String;
export interface PrivateDnsNameOptionsRequest {
  HostnameType?: HostnameTypeEnum;
  EnableResourceNameDnsARecord?: boolean;
  EnableResourceNameDnsAAAARecord?: boolean;
}
export const PrivateDnsNameOptionsRequest = S.suspend(() =>
  S.Struct({
    HostnameType: S.optional(HostnameTypeEnum),
    EnableResourceNameDnsARecord: S.optional(S.Boolean),
    EnableResourceNameDnsAAAARecord: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "PrivateDnsNameOptionsRequest",
}) as any as S.Schema<PrivateDnsNameOptionsRequest>;
export type SecurityGroupNames = string[];
export const SecurityGroupNames = S.Array(S.String);
export interface ManagedInstanceRequest {
  BlockDeviceMappings?: BlockDeviceMappingRequest[];
  CapacityReservationSpecification?: CapacityReservationSpecification;
  CpuOptions?: CpuOptionsRequest;
  CreditSpecification?: CreditSpecificationRequest;
  DisableApiStop?: boolean;
  EbsOptimized?: boolean;
  EnablePrimaryIpv6?: boolean;
  EnclaveOptions?: EnclaveOptionsRequest;
  HibernationOptions?: HibernationOptionsRequest;
  IamInstanceProfile?: IamInstanceProfileSpecification;
  ImageId?: string;
  InstanceMarketOptions?: InstanceMarketOptionsRequest;
  InstanceType?: string;
  Ipv6Addresses?: InstanceIpv6Address[];
  Ipv6AddressCount?: number;
  KernelId?: string;
  KeyName?: string;
  LicenseSpecifications?: LicenseConfigurationRequest[];
  MaintenanceOptions?: InstanceMaintenanceOptionsRequest;
  MetadataOptions?: InstanceMetadataOptionsRequest;
  Monitoring?: RunInstancesMonitoringEnabled;
  NetworkInterfaces?: InstanceNetworkInterfaceSpecification[];
  NetworkPerformanceOptions?: InstanceNetworkPerformanceOptionsRequest;
  Placement?: Placement;
  PrivateDnsNameOptions?: PrivateDnsNameOptionsRequest;
  PrivateIpAddress?: string | redacted.Redacted<string>;
  RamdiskId?: string;
  SecurityGroupIds?: string[];
  SecurityGroups?: string[];
  SubnetId?: string;
  TagSpecifications?: TagSpecification[];
  UserData?: string | redacted.Redacted<string>;
}
export const ManagedInstanceRequest = S.suspend(() =>
  S.Struct({
    BlockDeviceMappings: S.optional(BlockDeviceMappings),
    CapacityReservationSpecification: S.optional(
      CapacityReservationSpecification,
    ),
    CpuOptions: S.optional(CpuOptionsRequest),
    CreditSpecification: S.optional(CreditSpecificationRequest),
    DisableApiStop: S.optional(S.Boolean),
    EbsOptimized: S.optional(S.Boolean),
    EnablePrimaryIpv6: S.optional(S.Boolean),
    EnclaveOptions: S.optional(EnclaveOptionsRequest),
    HibernationOptions: S.optional(HibernationOptionsRequest),
    IamInstanceProfile: S.optional(IamInstanceProfileSpecification),
    ImageId: S.optional(S.String),
    InstanceMarketOptions: S.optional(InstanceMarketOptionsRequest),
    InstanceType: S.optional(S.String),
    Ipv6Addresses: S.optional(Ipv6Addresses),
    Ipv6AddressCount: S.optional(S.Number),
    KernelId: S.optional(S.String),
    KeyName: S.optional(S.String),
    LicenseSpecifications: S.optional(LicenseSpecifications),
    MaintenanceOptions: S.optional(InstanceMaintenanceOptionsRequest),
    MetadataOptions: S.optional(InstanceMetadataOptionsRequest),
    Monitoring: S.optional(RunInstancesMonitoringEnabled),
    NetworkInterfaces: S.optional(NetworkInterfaces),
    NetworkPerformanceOptions: S.optional(
      InstanceNetworkPerformanceOptionsRequest,
    ),
    Placement: S.optional(Placement),
    PrivateDnsNameOptions: S.optional(PrivateDnsNameOptionsRequest),
    PrivateIpAddress: S.optional(SensitiveString),
    RamdiskId: S.optional(S.String),
    SecurityGroupIds: S.optional(SecurityGroupIds),
    SecurityGroups: S.optional(SecurityGroupNames),
    SubnetId: S.optional(S.String),
    TagSpecifications: S.optional(TagSpecifications),
    UserData: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "ManagedInstanceRequest",
}) as any as S.Schema<ManagedInstanceRequest>;
export type BillingMode = "MONTHLY" | "HOURLY" | (string & {});
export const BillingMode = S.String;
export interface BillingConfiguration {
  BillingMode: BillingMode;
}
export const BillingConfiguration = S.suspend(() =>
  S.Struct({ BillingMode: BillingMode }),
).annotate({
  identifier: "BillingConfiguration",
}) as any as S.Schema<BillingConfiguration>;
export interface CreateWorkspaceInstanceRequest {
  ClientToken?: string | redacted.Redacted<string>;
  Tags?: Tag[];
  ManagedInstance: ManagedInstanceRequest;
  BillingConfiguration?: BillingConfiguration;
}
export const CreateWorkspaceInstanceRequest = S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagList),
    ManagedInstance: ManagedInstanceRequest,
    BillingConfiguration: S.optional(BillingConfiguration),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateWorkspaceInstanceRequest",
}) as any as S.Schema<CreateWorkspaceInstanceRequest>;
export interface CreateWorkspaceInstanceResponse {
  WorkspaceInstanceId?: string;
}
export const CreateWorkspaceInstanceResponse = S.suspend(() =>
  S.Struct({ WorkspaceInstanceId: S.optional(S.String) }),
).annotate({
  identifier: "CreateWorkspaceInstanceResponse",
}) as any as S.Schema<CreateWorkspaceInstanceResponse>;
export interface DeleteVolumeRequest {
  VolumeId: string;
}
export const DeleteVolumeRequest = S.suspend(() =>
  S.Struct({ VolumeId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteVolumeRequest",
}) as any as S.Schema<DeleteVolumeRequest>;
export interface DeleteVolumeResponse {}
export const DeleteVolumeResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteVolumeResponse",
}) as any as S.Schema<DeleteVolumeResponse>;
export interface DeleteWorkspaceInstanceRequest {
  WorkspaceInstanceId: string;
}
export const DeleteWorkspaceInstanceRequest = S.suspend(() =>
  S.Struct({ WorkspaceInstanceId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteWorkspaceInstanceRequest",
}) as any as S.Schema<DeleteWorkspaceInstanceRequest>;
export interface DeleteWorkspaceInstanceResponse {}
export const DeleteWorkspaceInstanceResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteWorkspaceInstanceResponse",
}) as any as S.Schema<DeleteWorkspaceInstanceResponse>;
export type DisassociateModeEnum = "FORCE" | "NO_FORCE" | (string & {});
export const DisassociateModeEnum = S.String;
export interface DisassociateVolumeRequest {
  WorkspaceInstanceId: string;
  VolumeId: string;
  Device?: string;
  DisassociateMode?: DisassociateModeEnum;
}
export const DisassociateVolumeRequest = S.suspend(() =>
  S.Struct({
    WorkspaceInstanceId: S.String,
    VolumeId: S.String,
    Device: S.optional(S.String),
    DisassociateMode: S.optional(DisassociateModeEnum),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DisassociateVolumeRequest",
}) as any as S.Schema<DisassociateVolumeRequest>;
export interface DisassociateVolumeResponse {}
export const DisassociateVolumeResponse = S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateVolumeResponse",
}) as any as S.Schema<DisassociateVolumeResponse>;
export interface GetWorkspaceInstanceRequest {
  WorkspaceInstanceId: string;
}
export const GetWorkspaceInstanceRequest = S.suspend(() =>
  S.Struct({ WorkspaceInstanceId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetWorkspaceInstanceRequest",
}) as any as S.Schema<GetWorkspaceInstanceRequest>;
export interface WorkspaceInstanceError {
  ErrorCode?: string;
  ErrorMessage?: string;
}
export const WorkspaceInstanceError = S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkspaceInstanceError",
}) as any as S.Schema<WorkspaceInstanceError>;
export type WorkspaceInstanceErrors = WorkspaceInstanceError[];
export const WorkspaceInstanceErrors = S.Array(WorkspaceInstanceError);
export interface EC2InstanceError {
  EC2ErrorCode?: string;
  EC2ExceptionType?: string;
  EC2ErrorMessage?: string;
}
export const EC2InstanceError = S.suspend(() =>
  S.Struct({
    EC2ErrorCode: S.optional(S.String),
    EC2ExceptionType: S.optional(S.String),
    EC2ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "EC2InstanceError",
}) as any as S.Schema<EC2InstanceError>;
export type EC2InstanceErrors = EC2InstanceError[];
export const EC2InstanceErrors = S.Array(EC2InstanceError);
export type ProvisionStateEnum =
  | "ALLOCATING"
  | "ALLOCATED"
  | "DEALLOCATING"
  | "DEALLOCATED"
  | "ERROR_ALLOCATING"
  | "ERROR_DEALLOCATING"
  | (string & {});
export const ProvisionStateEnum = S.String;
export interface EC2ManagedInstance {
  InstanceId?: string;
}
export const EC2ManagedInstance = S.suspend(() =>
  S.Struct({ InstanceId: S.optional(S.String) }),
).annotate({
  identifier: "EC2ManagedInstance",
}) as any as S.Schema<EC2ManagedInstance>;
export interface GetWorkspaceInstanceResponse {
  WorkspaceInstanceErrors?: WorkspaceInstanceError[];
  EC2InstanceErrors?: EC2InstanceError[];
  ProvisionState?: ProvisionStateEnum;
  WorkspaceInstanceId?: string;
  EC2ManagedInstance?: EC2ManagedInstance;
  BillingConfiguration?: BillingConfiguration;
}
export const GetWorkspaceInstanceResponse = S.suspend(() =>
  S.Struct({
    WorkspaceInstanceErrors: S.optional(WorkspaceInstanceErrors),
    EC2InstanceErrors: S.optional(EC2InstanceErrors),
    ProvisionState: S.optional(ProvisionStateEnum),
    WorkspaceInstanceId: S.optional(S.String),
    EC2ManagedInstance: S.optional(EC2ManagedInstance),
    BillingConfiguration: S.optional(BillingConfiguration),
  }),
).annotate({
  identifier: "GetWorkspaceInstanceResponse",
}) as any as S.Schema<GetWorkspaceInstanceResponse>;
export type PlatformTypeEnum =
  | "Windows"
  | "Windows BYOL"
  | "Linux/UNIX"
  | "Ubuntu Pro Linux"
  | "Red Hat Enterprise Linux"
  | "Red Hat BYOL Linux"
  | "SUSE Linux"
  | (string & {});
export const PlatformTypeEnum = S.String;
export type InstanceConfigurationTenancyEnum =
  | "SHARED"
  | "DEDICATED"
  | (string & {});
export const InstanceConfigurationTenancyEnum = S.String;
export interface InstanceConfigurationFilter {
  BillingMode: BillingMode;
  PlatformType: PlatformTypeEnum;
  Tenancy: InstanceConfigurationTenancyEnum;
}
export const InstanceConfigurationFilter = S.suspend(() =>
  S.Struct({
    BillingMode: BillingMode,
    PlatformType: PlatformTypeEnum,
    Tenancy: InstanceConfigurationTenancyEnum,
  }),
).annotate({
  identifier: "InstanceConfigurationFilter",
}) as any as S.Schema<InstanceConfigurationFilter>;
export interface ListInstanceTypesRequest {
  MaxResults?: number;
  NextToken?: string | redacted.Redacted<string>;
  InstanceConfigurationFilter?: InstanceConfigurationFilter;
}
export const ListInstanceTypesRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(SensitiveString),
    InstanceConfigurationFilter: S.optional(InstanceConfigurationFilter),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListInstanceTypesRequest",
}) as any as S.Schema<ListInstanceTypesRequest>;
export interface SupportedInstanceConfiguration {
  BillingMode?: BillingMode;
  PlatformType?: PlatformTypeEnum;
  Tenancy?: InstanceConfigurationTenancyEnum;
}
export const SupportedInstanceConfiguration = S.suspend(() =>
  S.Struct({
    BillingMode: S.optional(BillingMode),
    PlatformType: S.optional(PlatformTypeEnum),
    Tenancy: S.optional(InstanceConfigurationTenancyEnum),
  }),
).annotate({
  identifier: "SupportedInstanceConfiguration",
}) as any as S.Schema<SupportedInstanceConfiguration>;
export type SupportedInstanceConfigurations = SupportedInstanceConfiguration[];
export const SupportedInstanceConfigurations = S.Array(
  SupportedInstanceConfiguration,
);
export interface InstanceTypeInfo {
  InstanceType?: string;
  SupportedInstanceConfigurations?: SupportedInstanceConfiguration[];
}
export const InstanceTypeInfo = S.suspend(() =>
  S.Struct({
    InstanceType: S.optional(S.String),
    SupportedInstanceConfigurations: S.optional(
      SupportedInstanceConfigurations,
    ),
  }),
).annotate({
  identifier: "InstanceTypeInfo",
}) as any as S.Schema<InstanceTypeInfo>;
export type InstanceTypes = InstanceTypeInfo[];
export const InstanceTypes = S.Array(InstanceTypeInfo);
export interface ListInstanceTypesResponse {
  InstanceTypes: InstanceTypeInfo[];
  NextToken?: string | redacted.Redacted<string>;
}
export const ListInstanceTypesResponse = S.suspend(() =>
  S.Struct({
    InstanceTypes: InstanceTypes,
    NextToken: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "ListInstanceTypesResponse",
}) as any as S.Schema<ListInstanceTypesResponse>;
export interface ListRegionsRequest {
  MaxResults?: number;
  NextToken?: string | redacted.Redacted<string>;
}
export const ListRegionsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(SensitiveString),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListRegionsRequest",
}) as any as S.Schema<ListRegionsRequest>;
export interface Region {
  RegionName?: string;
}
export const Region = S.suspend(() =>
  S.Struct({ RegionName: S.optional(S.String) }),
).annotate({ identifier: "Region" }) as any as S.Schema<Region>;
export type RegionList = Region[];
export const RegionList = S.Array(Region);
export interface ListRegionsResponse {
  Regions: Region[];
  NextToken?: string | redacted.Redacted<string>;
}
export const ListRegionsResponse = S.suspend(() =>
  S.Struct({ Regions: RegionList, NextToken: S.optional(SensitiveString) }),
).annotate({
  identifier: "ListRegionsResponse",
}) as any as S.Schema<ListRegionsResponse>;
export interface ListTagsForResourceRequest {
  WorkspaceInstanceId: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
  S.Struct({ WorkspaceInstanceId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export type ProvisionStates = ProvisionStateEnum[];
export const ProvisionStates = S.Array(ProvisionStateEnum);
export interface ListWorkspaceInstancesRequest {
  ProvisionStates?: ProvisionStateEnum[];
  MaxResults?: number;
  NextToken?: string | redacted.Redacted<string>;
}
export const ListWorkspaceInstancesRequest = S.suspend(() =>
  S.Struct({
    ProvisionStates: S.optional(ProvisionStates),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(SensitiveString),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListWorkspaceInstancesRequest",
}) as any as S.Schema<ListWorkspaceInstancesRequest>;
export interface WorkspaceInstance {
  ProvisionState?: ProvisionStateEnum;
  WorkspaceInstanceId?: string;
  EC2ManagedInstance?: EC2ManagedInstance;
}
export const WorkspaceInstance = S.suspend(() =>
  S.Struct({
    ProvisionState: S.optional(ProvisionStateEnum),
    WorkspaceInstanceId: S.optional(S.String),
    EC2ManagedInstance: S.optional(EC2ManagedInstance),
  }),
).annotate({
  identifier: "WorkspaceInstance",
}) as any as S.Schema<WorkspaceInstance>;
export type WorkspaceInstances = WorkspaceInstance[];
export const WorkspaceInstances = S.Array(WorkspaceInstance);
export interface ListWorkspaceInstancesResponse {
  WorkspaceInstances: WorkspaceInstance[];
  NextToken?: string | redacted.Redacted<string>;
}
export const ListWorkspaceInstancesResponse = S.suspend(() =>
  S.Struct({
    WorkspaceInstances: WorkspaceInstances,
    NextToken: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "ListWorkspaceInstancesResponse",
}) as any as S.Schema<ListWorkspaceInstancesResponse>;
export interface TagResourceRequest {
  WorkspaceInstanceId: string;
  Tags: Tag[];
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({ WorkspaceInstanceId: S.String, Tags: TagList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
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
  WorkspaceInstanceId: string;
  TagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({ WorkspaceInstanceId: S.String, TagKeys: TagKeyList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;

//# Errors
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { Message: S.String },
).pipe(C.withAuthError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { Message: S.String, ResourceId: S.String, ResourceType: S.String },
).pipe(C.withConflictError) {}
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  {
    Message: S.String,
    RetryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
  },
  T.Retryable(),
).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { Message: S.String, ResourceId: S.String, ResourceType: S.String },
).pipe(C.withBadRequestError) {}
export class ThrottlingException extends S.TaggedErrorClass<ThrottlingException>()(
  "ThrottlingException",
  {
    Message: S.String,
    ServiceCode: S.optional(S.String),
    QuotaCode: S.optional(S.String),
    RetryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
  },
  T.Retryable({ throttling: true }),
).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  {
    Message: S.String,
    Reason: ValidationExceptionReason,
    FieldList: S.optional(ValidationExceptionFieldList),
  },
).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException extends S.TaggedErrorClass<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  {
    Message: S.String,
    ResourceId: S.String,
    ResourceType: S.String,
    ServiceCode: S.String,
    QuotaCode: S.String,
  },
).pipe(C.withQuotaError) {}

//# Operations
export type AssociateVolumeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Attaches a volume to a WorkSpace Instance.
 */
export const associateVolume: API.OperationMethod<
  AssociateVolumeRequest,
  AssociateVolumeResponse,
  AssociateVolumeError,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AssociateVolumeRequest,
  output: AssociateVolumeResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type CreateVolumeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new volume for WorkSpace Instances.
 */
export const createVolume: API.OperationMethod<
  CreateVolumeRequest,
  CreateVolumeResponse,
  CreateVolumeError,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateVolumeRequest,
  output: CreateVolumeResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type CreateWorkspaceInstanceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Launches a new WorkSpace Instance with specified configuration parameters, enabling programmatic workspace deployment.
 */
export const createWorkspaceInstance: API.OperationMethod<
  CreateWorkspaceInstanceRequest,
  CreateWorkspaceInstanceResponse,
  CreateWorkspaceInstanceError,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateWorkspaceInstanceRequest,
  output: CreateWorkspaceInstanceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeleteVolumeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specified volume.
 */
export const deleteVolume: API.OperationMethod<
  DeleteVolumeRequest,
  DeleteVolumeResponse,
  DeleteVolumeError,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteVolumeRequest,
  output: DeleteVolumeResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DeleteWorkspaceInstanceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified WorkSpace
 *
 * Usage of this API will result in deletion of the resource in question.
 */
export const deleteWorkspaceInstance: API.OperationMethod<
  DeleteWorkspaceInstanceRequest,
  DeleteWorkspaceInstanceResponse,
  DeleteWorkspaceInstanceError,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteWorkspaceInstanceRequest,
  output: DeleteWorkspaceInstanceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type DisassociateVolumeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Detaches a volume from a WorkSpace Instance.
 */
export const disassociateVolume: API.OperationMethod<
  DisassociateVolumeRequest,
  DisassociateVolumeResponse,
  DisassociateVolumeError,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociateVolumeRequest,
  output: DisassociateVolumeResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type GetWorkspaceInstanceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific WorkSpace Instance.
 */
export const getWorkspaceInstance: API.OperationMethod<
  GetWorkspaceInstanceRequest,
  GetWorkspaceInstanceResponse,
  GetWorkspaceInstanceError,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetWorkspaceInstanceRequest,
  output: GetWorkspaceInstanceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type ListInstanceTypesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of instance types supported by Amazon WorkSpaces Instances, enabling precise workspace infrastructure configuration.
 */
export const listInstanceTypes: API.OperationMethod<
  ListInstanceTypesRequest,
  ListInstanceTypesResponse,
  ListInstanceTypesError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListInstanceTypesRequest,
  ) => stream.Stream<
    ListInstanceTypesResponse,
    ListInstanceTypesError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListInstanceTypesRequest,
  ) => stream.Stream<
    InstanceTypeInfo,
    ListInstanceTypesError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListInstanceTypesRequest,
  output: ListInstanceTypesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InstanceTypes",
    pageSize: "MaxResults",
  } as const,
}));
export type ListRegionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of AWS regions supported by Amazon WorkSpaces Instances, enabling region discovery for workspace deployments.
 */
export const listRegions: API.OperationMethod<
  ListRegionsRequest,
  ListRegionsResponse,
  ListRegionsError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListRegionsRequest,
  ) => stream.Stream<
    ListRegionsResponse,
    ListRegionsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListRegionsRequest,
  ) => stream.Stream<
    Region,
    ListRegionsError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListRegionsRequest,
  output: ListRegionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Regions",
    pageSize: "MaxResults",
  } as const,
}));
export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves tags for a WorkSpace Instance.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type ListWorkspaceInstancesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a collection of WorkSpaces Instances based on specified filters.
 */
export const listWorkspaceInstances: API.OperationMethod<
  ListWorkspaceInstancesRequest,
  ListWorkspaceInstancesResponse,
  ListWorkspaceInstancesError,
  Credentials | Rgn | HttpClient.HttpClient
> & {
  pages: (
    input: ListWorkspaceInstancesRequest,
  ) => stream.Stream<
    ListWorkspaceInstancesResponse,
    ListWorkspaceInstancesError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
  items: (
    input: ListWorkspaceInstancesRequest,
  ) => stream.Stream<
    WorkspaceInstance,
    ListWorkspaceInstancesError,
    Credentials | Rgn | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListWorkspaceInstancesRequest,
  output: ListWorkspaceInstancesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WorkspaceInstances",
    pageSize: "MaxResults",
  } as const,
}));
export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds tags to a WorkSpace Instance.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from a WorkSpace Instance.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | Rgn | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
