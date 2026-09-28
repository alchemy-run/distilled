import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_0Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Workspaces Instances",
  target: "EUCMIFrontendAPIService",
  version: "2022-07-26",
  sigv4: "workspaces-instances",
  protocol: awsJson1_0Protocol,
  rules: (p, _) => {
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
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message: string;
    readonly ResourceId: string;
    readonly ResourceType: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500, headers: { RetryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly RetryAfterSeconds?: number }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly ResourceId: string;
    readonly ResourceType: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly ResourceId: string;
    readonly ResourceType: string;
    readonly ServiceCode: string;
    readonly QuotaCode: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, headers: { RetryAfterSeconds: ["Retry-After", "num"] } },
  )<{
    readonly message: string;
    readonly ServiceCode?: string;
    readonly QuotaCode?: string;
    readonly RetryAfterSeconds?: number;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly Reason: ValidationExceptionReason;
    readonly FieldList?: ValidationExceptionField[];
  }> {}
export type WorkspaceInstanceId = string;
export type VolumeId = string;
export type DeviceName = string;
export interface AssociateVolumeRequest {
  WorkspaceInstanceId: string;
  VolumeId: string;
  Device: string;
}
export interface AssociateVolumeResponse {}
export type String64 = string;
export type ClientToken = string | redacted.Redacted<string>;
export type NonNegativeInteger = number;
export type KmsKeyId = string | redacted.Redacted<string>;
export type SnapshotId = string;
export type ResourceTypeEnum =
  | "instance"
  | "volume"
  | "spot-instances-request"
  | "network-interface"
  | (string & {});
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export type TagList = Tag[];
export interface TagSpecification {
  ResourceType?: ResourceTypeEnum;
  Tags?: Tag[];
}
export type TagSpecifications = TagSpecification[];
export type VolumeTypeEnum =
  | "standard"
  | "io1"
  | "io2"
  | "gp2"
  | "sc1"
  | "st1"
  | "gp3"
  | (string & {});
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
export interface CreateVolumeResponse {
  VolumeId?: string;
}
export interface EbsBlockDevice {
  VolumeType?: VolumeTypeEnum;
  Encrypted?: boolean;
  KmsKeyId?: string | redacted.Redacted<string>;
  Iops?: number;
  Throughput?: number;
  VolumeSize?: number;
}
export type VirtualName = string;
export interface BlockDeviceMappingRequest {
  DeviceName?: string;
  Ebs?: EbsBlockDevice;
  NoDevice?: string;
  VirtualName?: string;
}
export type BlockDeviceMappings = BlockDeviceMappingRequest[];
export type CapacityReservationPreferenceEnum =
  | "capacity-reservations-only"
  | "open"
  | "none"
  | (string & {});
export type String128 = string;
export type ARN = string;
export interface CapacityReservationTarget {
  CapacityReservationId?: string;
  CapacityReservationResourceGroupArn?: string;
}
export interface CapacityReservationSpecification {
  CapacityReservationPreference?: CapacityReservationPreferenceEnum;
  CapacityReservationTarget?: CapacityReservationTarget;
}
export type AmdSevSnpEnum = "enabled" | "disabled" | (string & {});
export interface CpuOptionsRequest {
  AmdSevSnp?: AmdSevSnpEnum;
  CoreCount?: number;
  ThreadsPerCore?: number;
}
export type CpuCreditsEnum = "standard" | "unlimited" | (string & {});
export interface CreditSpecificationRequest {
  CpuCredits?: CpuCreditsEnum;
}
export interface EnclaveOptionsRequest {
  Enabled?: boolean;
}
export interface HibernationOptionsRequest {
  Configured?: boolean;
}
export interface IamInstanceProfileSpecification {
  Arn?: string;
  Name?: string;
}
export type ImageId = string;
export type MarketTypeEnum = "spot" | "capacity-block" | (string & {});
export type InstanceInterruptionBehaviorEnum =
  | "hibernate"
  | "stop"
  | (string & {});
export type SpotInstanceTypeEnum = "one-time" | "persistent" | (string & {});
export interface SpotMarketOptions {
  BlockDurationMinutes?: number;
  InstanceInterruptionBehavior?: InstanceInterruptionBehaviorEnum;
  MaxPrice?: string;
  SpotInstanceType?: SpotInstanceTypeEnum;
  ValidUntilUtc?: Date;
}
export interface InstanceMarketOptionsRequest {
  MarketType?: MarketTypeEnum;
  SpotOptions?: SpotMarketOptions;
}
export type InstanceType = string;
export type Ipv6Address = string | redacted.Redacted<string>;
export interface InstanceIpv6Address {
  Ipv6Address?: string | redacted.Redacted<string>;
  IsPrimaryIpv6?: boolean;
}
export type Ipv6Addresses = InstanceIpv6Address[];
export interface LicenseConfigurationRequest {
  LicenseConfigurationArn?: string;
}
export type LicenseSpecifications = LicenseConfigurationRequest[];
export type AutoRecoveryEnum = "disabled" | "default" | (string & {});
export interface InstanceMaintenanceOptionsRequest {
  AutoRecovery?: AutoRecoveryEnum;
}
export type HttpEndpointEnum = "enabled" | "disabled" | (string & {});
export type HttpProtocolIpv6Enum = "enabled" | "disabled" | (string & {});
export type HttpPutResponseHopLimit = number;
export type HttpTokensEnum = "optional" | "required" | (string & {});
export type InstanceMetadataTagsEnum = "enabled" | "disabled" | (string & {});
export interface InstanceMetadataOptionsRequest {
  HttpEndpoint?: HttpEndpointEnum;
  HttpProtocolIpv6?: HttpProtocolIpv6Enum;
  HttpPutResponseHopLimit?: number;
  HttpTokens?: HttpTokensEnum;
  InstanceMetadataTags?: InstanceMetadataTagsEnum;
}
export interface RunInstancesMonitoringEnabled {
  Enabled?: boolean;
}
export interface ConnectionTrackingSpecificationRequest {
  TcpEstablishedTimeout?: number;
  UdpStreamTimeout?: number;
  UdpTimeout?: number;
}
export type Description = string;
export interface EnaSrdUdpSpecificationRequest {
  EnaSrdUdpEnabled?: boolean;
}
export interface EnaSrdSpecificationRequest {
  EnaSrdEnabled?: boolean;
  EnaSrdUdpSpecification?: EnaSrdUdpSpecificationRequest;
}
export type InterfaceTypeEnum =
  | "interface"
  | "efa"
  | "efa-only"
  | (string & {});
export type Ipv4Prefix = string;
export interface Ipv4PrefixSpecificationRequest {
  Ipv4Prefix?: string;
}
export type Ipv4Prefixes = Ipv4PrefixSpecificationRequest[];
export type Ipv6Prefix = string;
export interface Ipv6PrefixSpecificationRequest {
  Ipv6Prefix?: string;
}
export type Ipv6Prefixes = Ipv6PrefixSpecificationRequest[];
export type NetworkInterfaceId = string;
export type Ipv4Address = string | redacted.Redacted<string>;
export interface PrivateIpAddressSpecification {
  Primary?: boolean;
  PrivateIpAddress?: string | redacted.Redacted<string>;
}
export type PrivateIpAddresses = PrivateIpAddressSpecification[];
export type SecurityGroupId = string;
export type SecurityGroupIds = string[];
export type SubnetId = string;
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
export type NetworkInterfaces = InstanceNetworkInterfaceSpecification[];
export type BandwidthWeightingEnum =
  | "default"
  | "vpc-1"
  | "ebs-1"
  | (string & {});
export interface InstanceNetworkPerformanceOptionsRequest {
  BandwidthWeighting?: BandwidthWeightingEnum;
}
export type AvailabilityZone = string;
export type PlacementGroupId = string;
export type HostId = string;
export type TenancyEnum = "default" | "dedicated" | "host" | (string & {});
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
export type HostnameTypeEnum = "ip-name" | "resource-name" | (string & {});
export interface PrivateDnsNameOptionsRequest {
  HostnameType?: HostnameTypeEnum;
  EnableResourceNameDnsARecord?: boolean;
  EnableResourceNameDnsAAAARecord?: boolean;
}
export type SecurityGroupName = string;
export type SecurityGroupNames = string[];
export type UserData = string | redacted.Redacted<string>;
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
export type BillingMode = "MONTHLY" | "HOURLY" | (string & {});
export interface BillingConfiguration {
  BillingMode: BillingMode;
}
export interface CreateWorkspaceInstanceRequest {
  ClientToken?: string | redacted.Redacted<string>;
  Tags?: Tag[];
  ManagedInstance: ManagedInstanceRequest;
  BillingConfiguration?: BillingConfiguration;
}
export interface CreateWorkspaceInstanceResponse {
  WorkspaceInstanceId?: string;
}
export interface DeleteVolumeRequest {
  VolumeId: string;
}
export interface DeleteVolumeResponse {}
export interface DeleteWorkspaceInstanceRequest {
  WorkspaceInstanceId: string;
}
export interface DeleteWorkspaceInstanceResponse {}
export type DisassociateModeEnum = "FORCE" | "NO_FORCE" | (string & {});
export interface DisassociateVolumeRequest {
  WorkspaceInstanceId: string;
  VolumeId: string;
  Device?: string;
  DisassociateMode?: DisassociateModeEnum;
}
export interface DisassociateVolumeResponse {}
export interface GetWorkspaceInstanceRequest {
  WorkspaceInstanceId: string;
}
export interface WorkspaceInstanceError {
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type WorkspaceInstanceErrors = WorkspaceInstanceError[];
export interface EC2InstanceError {
  EC2ErrorCode?: string;
  EC2ExceptionType?: string;
  EC2ErrorMessage?: string;
}
export type EC2InstanceErrors = EC2InstanceError[];
export type ProvisionStateEnum =
  | "ALLOCATING"
  | "ALLOCATED"
  | "DEALLOCATING"
  | "DEALLOCATED"
  | "ERROR_ALLOCATING"
  | "ERROR_DEALLOCATING"
  | (string & {});
export interface EC2ManagedInstance {
  InstanceId?: string;
}
export interface GetWorkspaceInstanceResponse {
  WorkspaceInstanceErrors?: WorkspaceInstanceError[];
  EC2InstanceErrors?: EC2InstanceError[];
  ProvisionState?: ProvisionStateEnum;
  WorkspaceInstanceId?: string;
  EC2ManagedInstance?: EC2ManagedInstance;
  BillingConfiguration?: BillingConfiguration;
}
export type ListInstanceTypesMaxResults = number;
export type NextToken = string | redacted.Redacted<string>;
export type PlatformTypeEnum =
  | "Windows"
  | "Windows BYOL"
  | "Linux/UNIX"
  | "Ubuntu Pro Linux"
  | "Red Hat Enterprise Linux"
  | "Red Hat BYOL Linux"
  | "SUSE Linux"
  | (string & {});
export type InstanceConfigurationTenancyEnum =
  | "SHARED"
  | "DEDICATED"
  | (string & {});
export interface InstanceConfigurationFilter {
  BillingMode: BillingMode;
  PlatformType: PlatformTypeEnum;
  Tenancy: InstanceConfigurationTenancyEnum;
}
export interface ListInstanceTypesRequest {
  MaxResults?: number;
  NextToken?: string | redacted.Redacted<string>;
  InstanceConfigurationFilter?: InstanceConfigurationFilter;
}
export interface SupportedInstanceConfiguration {
  BillingMode?: BillingMode;
  PlatformType?: PlatformTypeEnum;
  Tenancy?: InstanceConfigurationTenancyEnum;
}
export type SupportedInstanceConfigurations = SupportedInstanceConfiguration[];
export interface InstanceTypeInfo {
  InstanceType?: string;
  SupportedInstanceConfigurations?: SupportedInstanceConfiguration[];
}
export type InstanceTypes = InstanceTypeInfo[];
export interface ListInstanceTypesResponse {
  InstanceTypes: InstanceTypeInfo[];
  NextToken?: string | redacted.Redacted<string>;
}
export type MaxResults = number;
export interface ListRegionsRequest {
  MaxResults?: number;
  NextToken?: string | redacted.Redacted<string>;
}
export type RegionName = string;
export interface Region {
  RegionName?: string;
}
export type RegionList = Region[];
export interface ListRegionsResponse {
  Regions: Region[];
  NextToken?: string | redacted.Redacted<string>;
}
export interface ListTagsForResourceRequest {
  WorkspaceInstanceId: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export type ProvisionStates = ProvisionStateEnum[];
export interface ListWorkspaceInstancesRequest {
  ProvisionStates?: ProvisionStateEnum[];
  MaxResults?: number;
  NextToken?: string | redacted.Redacted<string>;
}
export interface WorkspaceInstance {
  ProvisionState?: ProvisionStateEnum;
  WorkspaceInstanceId?: string;
  EC2ManagedInstance?: EC2ManagedInstance;
}
export type WorkspaceInstances = WorkspaceInstance[];
export interface ListWorkspaceInstancesResponse {
  WorkspaceInstances: WorkspaceInstance[];
  NextToken?: string | redacted.Redacted<string>;
}
export interface TagResourceRequest {
  WorkspaceInstanceId: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  WorkspaceInstanceId: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export type ValidationExceptionReason =
  | "UNKNOWN_OPERATION"
  | "UNSUPPORTED_OPERATION"
  | "CANNOT_PARSE"
  | "FIELD_VALIDATION_FAILED"
  | "DEPENDENCY_FAILURE"
  | "OTHER"
  | (string & {});
export interface ValidationExceptionField {
  Name: string;
  Reason: string;
  Message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { WorkspaceInstanceId: 0, VolumeId: 0, Device: 0 },
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
  operationName: "AssociateVolume",
})) as any;

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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AvailabilityZone: 0,
      ClientToken: D.m({ idempotency: true }),
      Encrypted: 0,
      Iops: 0,
      KmsKeyId: 0,
      SizeInGB: 0,
      SnapshotId: 0,
      TagSpecifications: D.list(i_TagSpecification),
      Throughput: 0,
      VolumeType: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVolume",
})) as any;

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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
      ManagedInstance: {
        BlockDeviceMappings: D.list({
          DeviceName: 0,
          Ebs: {
            VolumeType: 0,
            Encrypted: 0,
            KmsKeyId: 0,
            Iops: 0,
            Throughput: 0,
            VolumeSize: 0,
          },
          NoDevice: 0,
          VirtualName: 0,
        }),
        CapacityReservationSpecification: {
          CapacityReservationPreference: 0,
          CapacityReservationTarget: {
            CapacityReservationId: 0,
            CapacityReservationResourceGroupArn: 0,
          },
        },
        CpuOptions: { AmdSevSnp: 0, CoreCount: 0, ThreadsPerCore: 0 },
        CreditSpecification: { CpuCredits: 0 },
        DisableApiStop: 0,
        EbsOptimized: 0,
        EnablePrimaryIpv6: 0,
        EnclaveOptions: { Enabled: 0 },
        HibernationOptions: { Configured: 0 },
        IamInstanceProfile: { Arn: 0, Name: 0 },
        ImageId: 0,
        InstanceMarketOptions: {
          MarketType: 0,
          SpotOptions: {
            BlockDurationMinutes: 0,
            InstanceInterruptionBehavior: 0,
            MaxPrice: 0,
            SpotInstanceType: 0,
            ValidUntilUtc: 0,
          },
        },
        InstanceType: 0,
        Ipv6Addresses: D.list(i_InstanceIpv6Address),
        Ipv6AddressCount: 0,
        KernelId: 0,
        KeyName: 0,
        LicenseSpecifications: D.list({ LicenseConfigurationArn: 0 }),
        MaintenanceOptions: { AutoRecovery: 0 },
        MetadataOptions: {
          HttpEndpoint: 0,
          HttpProtocolIpv6: 0,
          HttpPutResponseHopLimit: 0,
          HttpTokens: 0,
          InstanceMetadataTags: 0,
        },
        Monitoring: { Enabled: 0 },
        NetworkInterfaces: D.list({
          AssociateCarrierIpAddress: 0,
          AssociatePublicIpAddress: 0,
          ConnectionTrackingSpecification: {
            TcpEstablishedTimeout: 0,
            UdpStreamTimeout: 0,
            UdpTimeout: 0,
          },
          Description: 0,
          DeviceIndex: 0,
          EnaSrdSpecification: {
            EnaSrdEnabled: 0,
            EnaSrdUdpSpecification: { EnaSrdUdpEnabled: 0 },
          },
          InterfaceType: 0,
          Ipv4Prefixes: D.list({ Ipv4Prefix: 0 }),
          Ipv4PrefixCount: 0,
          Ipv6AddressCount: 0,
          Ipv6Addresses: D.list(i_InstanceIpv6Address),
          Ipv6Prefixes: D.list({ Ipv6Prefix: 0 }),
          Ipv6PrefixCount: 0,
          NetworkCardIndex: 0,
          NetworkInterfaceId: 0,
          PrimaryIpv6: 0,
          PrivateIpAddress: 0,
          PrivateIpAddresses: D.list({ Primary: 0, PrivateIpAddress: 0 }),
          SecondaryPrivateIpAddressCount: 0,
          Groups: 0,
          SubnetId: 0,
        }),
        NetworkPerformanceOptions: { BandwidthWeighting: 0 },
        Placement: {
          Affinity: 0,
          AvailabilityZone: 0,
          GroupId: 0,
          GroupName: 0,
          HostId: 0,
          HostResourceGroupArn: 0,
          PartitionNumber: 0,
          Tenancy: 0,
        },
        PrivateDnsNameOptions: {
          HostnameType: 0,
          EnableResourceNameDnsARecord: 0,
          EnableResourceNameDnsAAAARecord: 0,
        },
        PrivateIpAddress: 0,
        RamdiskId: 0,
        SecurityGroupIds: 0,
        SecurityGroups: 0,
        SubnetId: 0,
        TagSpecifications: D.list(i_TagSpecification),
        UserData: 0,
      },
      BillingConfiguration: { BillingMode: 0 },
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkspaceInstance",
})) as any;

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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { VolumeId: 0 } },
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
  operationName: "DeleteVolume",
})) as any;

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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { WorkspaceInstanceId: 0 } },
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
  operationName: "DeleteWorkspaceInstance",
})) as any;

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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      WorkspaceInstanceId: 0,
      VolumeId: 0,
      Device: 0,
      DisassociateMode: 0,
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
  operationName: "DisassociateVolume",
})) as any;

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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { WorkspaceInstanceId: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkspaceInstance",
})) as any;

export type ListInstanceTypesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of instance types supported by Amazon WorkSpaces Instances, enabling precise workspace infrastructure configuration.
 */
export const listInstanceTypes: API.PaginatedOperationMethod<
  ListInstanceTypesRequest,
  ListInstanceTypesResponse,
  ListInstanceTypesError,
  Credentials | HttpClient.HttpClient,
  InstanceTypeInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      MaxResults: 0,
      NextToken: 0,
      InstanceConfigurationFilter: {
        BillingMode: 0,
        PlatformType: 0,
        Tenancy: 0,
      },
    },
    output: { NextToken: D.secret },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInstanceTypes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InstanceTypes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRegionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of AWS regions supported by Amazon WorkSpaces Instances, enabling region discovery for workspace deployments.
 */
export const listRegions: API.PaginatedOperationMethod<
  ListRegionsRequest,
  ListRegionsResponse,
  ListRegionsError,
  Credentials | HttpClient.HttpClient,
  Region
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0 },
    output: { NextToken: D.secret },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRegions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Regions",
    pageSize: "MaxResults",
  } as const,
})) as any;

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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { WorkspaceInstanceId: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListWorkspaceInstancesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a collection of WorkSpaces Instances based on specified filters.
 */
export const listWorkspaceInstances: API.PaginatedOperationMethod<
  ListWorkspaceInstancesRequest,
  ListWorkspaceInstancesResponse,
  ListWorkspaceInstancesError,
  Credentials | HttpClient.HttpClient,
  WorkspaceInstance
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ProvisionStates: 0, MaxResults: 0, NextToken: 0 },
    output: { NextToken: D.secret },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkspaceInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WorkspaceInstances",
    pageSize: "MaxResults",
  } as const,
})) as any;

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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { WorkspaceInstanceId: 0, Tags: D.list(i_Tag) },
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
  operationName: "TagResource",
})) as any;

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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { WorkspaceInstanceId: 0, TagKeys: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

const i_InstanceIpv6Address: D.LazyStruct = () => ({
  Ipv6Address: 0,
  IsPrimaryIpv6: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_TagSpecification: D.LazyStruct = () => ({
  ResourceType: 0,
  Tags: D.list(i_Tag),
});
