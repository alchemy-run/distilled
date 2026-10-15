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
  sdkId: "Workspaces Instances",
  serviceShapeName: "EUCMIFrontendAPIService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "workspaces-instances" });
const ver = /*@__PURE__*/ T.ServiceVersion("2022-07-26");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
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
        return err("Invalid Configuration: FIPS and custom endpoint are not supported");
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
  '{"url":"https://workspaces-instances.{R}.api.aws","properties":{},"headers":{}}',
  [
    "cn-north-1",
    "cn-northwest-1",
    "aws-cn-global",
    "us-iso-east-1",
    "us-iso-west-1",
    "aws-iso-global",
    "us-isob-east-1",
    "aws-iso-b-global",
    "aws-iso-f-global",
    "us-isof-east-1",
    "us-isof-south-1",
    "eusc-de-east-1",
  ],
);

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      RetryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
      ServiceCode: S.String,
      QuotaCode: S.String,
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ServiceCode: /*@__PURE__*/ S.optional(S.String),
      QuotaCode: /*@__PURE__*/ S.optional(S.String),
      RetryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
      FieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(353, __c11, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type NestedVirtualizationEnum = "enabled" | "disabled" | (string & {});
export interface CpuOptionsRequest {
  AmdSevSnp?: AmdSevSnpEnum;
  CoreCount?: number;
  ThreadsPerCore?: number;
  NestedVirtualization?: NestedVirtualizationEnum;
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
export type InstanceInterruptionBehaviorEnum = "hibernate" | "stop" | (string & {});
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
export type InterfaceTypeEnum = "interface" | "efa" | "efa-only" | (string & {});
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
export type BandwidthWeightingEnum = "default" | "vpc-1" | "ebs-1" | (string & {});
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
export type InstanceConfigurationTenancyEnum = "SHARED" | "DEDICATED" | (string & {});
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
const Region = /*@__PURE__*/ __L.at(__c14, 0) as any as S.Schema<Region>;
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
  input: __S(384, __c12, 0) as any as S.Schema<AssociateVolumeRequest>,
  output: __S(416, __c13, 0) as any as S.Schema<AssociateVolumeResponse>,
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c15, 0) as any as S.Schema<CreateVolumeRequest>,
  output: __S(481, __c15, 1) as any as S.Schema<CreateVolumeResponse>,
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(609, __c19, 1) as any as S.Schema<CreateWorkspaceInstanceRequest>,
  output: __S(610, __c19, 2) as any as S.Schema<CreateWorkspaceInstanceResponse>,
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<DeleteVolumeRequest>,
  output: __S(416, __c13, 0) as any as S.Schema<DeleteVolumeResponse>,
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c1, 0) as any as S.Schema<DeleteWorkspaceInstanceRequest>,
  output: __S(416, __c13, 0) as any as S.Schema<DeleteWorkspaceInstanceResponse>,
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c2, 0) as any as S.Schema<DisassociateVolumeRequest>,
  output: __S(416, __c13, 0) as any as S.Schema<DisassociateVolumeResponse>,
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c3, 0) as any as S.Schema<GetWorkspaceInstanceRequest>,
  output: __S(101, __c3, 5) as any as S.Schema<GetWorkspaceInstanceResponse>,
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
export const listInstanceTypes: API.PaginatedOperationMethod<
  ListInstanceTypesRequest,
  ListInstanceTypesResponse,
  ListInstanceTypesError,
  Credentials | HttpClient.HttpClient,
  InstanceTypeInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(161, __c5, 1) as any as S.Schema<ListInstanceTypesRequest>,
  output: __S(166, __c5, 6) as any as S.Schema<ListInstanceTypesResponse>,
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
  input: __S(192, __c6, 0) as any as S.Schema<ListRegionsRequest>,
  output: __S(194, __c6, 2) as any as S.Schema<ListRegionsResponse>,
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
  input: __S(224, __c7, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(225, __c7, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
export const listWorkspaceInstances: API.PaginatedOperationMethod<
  ListWorkspaceInstancesRequest,
  ListWorkspaceInstancesResponse,
  ListWorkspaceInstancesError,
  Credentials | HttpClient.HttpClient,
  WorkspaceInstance
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(257, __c8, 1) as any as S.Schema<ListWorkspaceInstancesRequest>,
  output: __S(260, __c8, 4) as any as S.Schema<ListWorkspaceInstancesResponse>,
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
  input: __S(288, __c9, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(416, __c13, 0) as any as S.Schema<TagResourceResponse>,
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c10, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(416, __c13, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VolumeId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteVolumeRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WorkspaceInstanceId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteWorkspaceInstanceRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WorkspaceInstanceId: S.String,
          VolumeId: S.String,
          Device: S.optional(S.String),
          DisassociateMode: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisassociateVolumeRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WorkspaceInstanceId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetWorkspaceInstanceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ErrorCode: S.optional(S.String), ErrorMessage: S.optional(S.String) }),
      ).annotate({ identifier: "WorkspaceInstanceError" });
    case 2:
      return S.Array(__S(97, __c3, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          EC2ErrorCode: S.optional(S.String),
          EC2ExceptionType: S.optional(S.String),
          EC2ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "EC2InstanceError" });
    case 4:
      return S.Array(__S(99, __c3, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          WorkspaceInstanceErrors: S.optional(__S(98, __c3, 2)),
          EC2InstanceErrors: S.optional(__S(100, __c3, 4)),
          ProvisionState: S.optional(S.String),
          WorkspaceInstanceId: S.optional(S.String),
          EC2ManagedInstance: S.optional(__S(128, __c4, 0)),
          BillingConfiguration: S.optional(__S(640, __c20, 0)),
        }),
      ).annotate({ identifier: "GetWorkspaceInstanceResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ InstanceId: S.optional(S.String) })).annotate({
        identifier: "EC2ManagedInstance",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BillingMode: S.String, PlatformType: S.String, Tenancy: S.String }),
      ).annotate({ identifier: "InstanceConfigurationFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(SensitiveString),
          InstanceConfigurationFilter: S.optional(__S(160, __c5, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListInstanceTypesRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          BillingMode: S.optional(S.String),
          PlatformType: S.optional(S.String),
          Tenancy: S.optional(S.String),
        }),
      ).annotate({ identifier: "SupportedInstanceConfiguration" });
    case 3:
      return S.Array(__S(162, __c5, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          InstanceType: S.optional(S.String),
          SupportedInstanceConfigurations: S.optional(__S(163, __c5, 3)),
        }),
      ).annotate({ identifier: "InstanceTypeInfo" });
    case 5:
      return S.Array(__S(164, __c5, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ InstanceTypes: __S(165, __c5, 5), NextToken: S.optional(SensitiveString) }),
      ).annotate({ identifier: "ListInstanceTypesResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(SensitiveString) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListRegionsRequest" });
    case 1:
      return S.Array(Region);
    case 2:
      return S.suspend(() =>
        S.Struct({ Regions: __S(193, __c6, 1), NextToken: S.optional(SensitiveString) }),
      ).annotate({ identifier: "ListRegionsResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WorkspaceInstanceId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(545, __c17, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProvisionStates: S.optional(__S(256, __c8, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(SensitiveString),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListWorkspaceInstancesRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ProvisionState: S.optional(S.String),
          WorkspaceInstanceId: S.optional(S.String),
          EC2ManagedInstance: S.optional(__S(128, __c4, 0)),
        }),
      ).annotate({ identifier: "WorkspaceInstance" });
    case 3:
      return S.Array(__S(258, __c8, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ WorkspaceInstances: __S(259, __c8, 3), NextToken: S.optional(SensitiveString) }),
      ).annotate({ identifier: "ListWorkspaceInstancesResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WorkspaceInstanceId: S.String, Tags: __S(545, __c17, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WorkspaceInstanceId: S.String, TagKeys: __S(672, __c21, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Reason: S.String, Message: S.String }),
      ).annotate({ identifier: "ValidationExceptionField" });
    case 1:
      return S.Array(__S(352, __c11, 0));
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WorkspaceInstanceId: S.String, VolumeId: S.String, Device: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateVolumeRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "AssociateVolumeResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ RegionName: S.optional(S.String) })).annotate({
        identifier: "Region",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AvailabilityZone: S.String,
          ClientToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
          Encrypted: S.optional(S.Boolean),
          Iops: S.optional(S.Number),
          KmsKeyId: S.optional(SensitiveString),
          SizeInGB: S.optional(S.Number),
          SnapshotId: S.optional(S.String),
          TagSpecifications: S.optional(__S(513, __c16, 1)),
          Throughput: S.optional(S.Number),
          VolumeType: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateVolumeRequest" });
    case 1:
      return S.suspend(() => S.Struct({ VolumeId: S.optional(S.String) })).annotate({
        identifier: "CreateVolumeResponse",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceType: S.optional(S.String), Tags: S.optional(__S(545, __c17, 1)) }),
      ).annotate({ identifier: "TagSpecification" });
    case 1:
      return S.Array(__S(512, __c16, 0));
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(__S(544, __c17, 0));
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VolumeType: S.optional(S.String),
          Encrypted: S.optional(S.Boolean),
          KmsKeyId: S.optional(SensitiveString),
          Iops: S.optional(S.Number),
          Throughput: S.optional(S.Number),
          VolumeSize: S.optional(S.Number),
        }),
      ).annotate({ identifier: "EbsBlockDevice" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DeviceName: S.optional(S.String),
          Ebs: S.optional(__S(576, __c18, 0)),
          NoDevice: S.optional(S.String),
          VirtualName: S.optional(S.String),
        }),
      ).annotate({ identifier: "BlockDeviceMappingRequest" });
    case 2:
      return S.Array(__S(577, __c18, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          CapacityReservationId: S.optional(S.String),
          CapacityReservationResourceGroupArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CapacityReservationTarget" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          CapacityReservationPreference: S.optional(S.String),
          CapacityReservationTarget: S.optional(__S(579, __c18, 3)),
        }),
      ).annotate({ identifier: "CapacityReservationSpecification" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          AmdSevSnp: S.optional(S.String),
          CoreCount: S.optional(S.Number),
          ThreadsPerCore: S.optional(S.Number),
          NestedVirtualization: S.optional(S.String),
        }),
      ).annotate({ identifier: "CpuOptionsRequest" });
    case 6:
      return S.suspend(() => S.Struct({ CpuCredits: S.optional(S.String) })).annotate({
        identifier: "CreditSpecificationRequest",
      });
    case 7:
      return S.suspend(() => S.Struct({ Enabled: S.optional(S.Boolean) })).annotate({
        identifier: "EnclaveOptionsRequest",
      });
    case 8:
      return S.suspend(() => S.Struct({ Configured: S.optional(S.Boolean) })).annotate({
        identifier: "HibernationOptionsRequest",
      });
    case 9:
      return S.suspend(() =>
        S.Struct({ Arn: S.optional(S.String), Name: S.optional(S.String) }),
      ).annotate({ identifier: "IamInstanceProfileSpecification" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          BlockDurationMinutes: S.optional(S.Number),
          InstanceInterruptionBehavior: S.optional(S.String),
          MaxPrice: S.optional(S.String),
          SpotInstanceType: S.optional(S.String),
          ValidUntilUtc: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "SpotMarketOptions" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          MarketType: S.optional(S.String),
          SpotOptions: S.optional(__S(586, __c18, 10)),
        }),
      ).annotate({ identifier: "InstanceMarketOptionsRequest" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          Ipv6Address: S.optional(SensitiveString),
          IsPrimaryIpv6: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "InstanceIpv6Address" });
    case 13:
      return S.Array(__S(588, __c18, 12));
    case 14:
      return S.suspend(() => S.Struct({ LicenseConfigurationArn: S.optional(S.String) })).annotate({
        identifier: "LicenseConfigurationRequest",
      });
    case 15:
      return S.Array(__S(590, __c18, 14));
    case 16:
      return S.suspend(() => S.Struct({ AutoRecovery: S.optional(S.String) })).annotate({
        identifier: "InstanceMaintenanceOptionsRequest",
      });
    case 17:
      return S.suspend(() =>
        S.Struct({
          HttpEndpoint: S.optional(S.String),
          HttpProtocolIpv6: S.optional(S.String),
          HttpPutResponseHopLimit: S.optional(S.Number),
          HttpTokens: S.optional(S.String),
          InstanceMetadataTags: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstanceMetadataOptionsRequest" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          TcpEstablishedTimeout: S.optional(S.Number),
          UdpStreamTimeout: S.optional(S.Number),
          UdpTimeout: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ConnectionTrackingSpecificationRequest" });
    case 19:
      return S.suspend(() => S.Struct({ EnaSrdUdpEnabled: S.optional(S.Boolean) })).annotate({
        identifier: "EnaSrdUdpSpecificationRequest",
      });
    case 20:
      return S.suspend(() =>
        S.Struct({
          EnaSrdEnabled: S.optional(S.Boolean),
          EnaSrdUdpSpecification: S.optional(__S(595, __c18, 19)),
        }),
      ).annotate({ identifier: "EnaSrdSpecificationRequest" });
    case 21:
      return S.suspend(() => S.Struct({ Ipv4Prefix: S.optional(S.String) })).annotate({
        identifier: "Ipv4PrefixSpecificationRequest",
      });
    case 22:
      return S.Array(__S(597, __c18, 21));
    case 23:
      return S.suspend(() => S.Struct({ Ipv6Prefix: S.optional(S.String) })).annotate({
        identifier: "Ipv6PrefixSpecificationRequest",
      });
    case 24:
      return S.Array(__S(599, __c18, 23));
    case 25:
      return S.suspend(() =>
        S.Struct({ Primary: S.optional(S.Boolean), PrivateIpAddress: S.optional(SensitiveString) }),
      ).annotate({ identifier: "PrivateIpAddressSpecification" });
    case 26:
      return S.Array(__S(601, __c18, 25));
    case 27:
      return S.suspend(() =>
        S.Struct({
          AssociateCarrierIpAddress: S.optional(S.Boolean),
          AssociatePublicIpAddress: S.optional(S.Boolean),
          ConnectionTrackingSpecification: S.optional(__S(594, __c18, 18)),
          Description: S.optional(S.String),
          DeviceIndex: S.optional(S.Number),
          EnaSrdSpecification: S.optional(__S(596, __c18, 20)),
          InterfaceType: S.optional(S.String),
          Ipv4Prefixes: S.optional(__S(598, __c18, 22)),
          Ipv4PrefixCount: S.optional(S.Number),
          Ipv6AddressCount: S.optional(S.Number),
          Ipv6Addresses: S.optional(__S(589, __c18, 13)),
          Ipv6Prefixes: S.optional(__S(600, __c18, 24)),
          Ipv6PrefixCount: S.optional(S.Number),
          NetworkCardIndex: S.optional(S.Number),
          NetworkInterfaceId: S.optional(S.String),
          PrimaryIpv6: S.optional(S.Boolean),
          PrivateIpAddress: S.optional(SensitiveString),
          PrivateIpAddresses: S.optional(__S(602, __c18, 26)),
          SecondaryPrivateIpAddressCount: S.optional(S.Number),
          Groups: S.optional(__S(672, __c21, 0)),
          SubnetId: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstanceNetworkInterfaceSpecification" });
    case 28:
      return S.Array(__S(603, __c18, 27));
    case 29:
      return S.suspend(() => S.Struct({ BandwidthWeighting: S.optional(S.String) })).annotate({
        identifier: "InstanceNetworkPerformanceOptionsRequest",
      });
    case 30:
      return S.suspend(() =>
        S.Struct({
          Affinity: S.optional(S.String),
          AvailabilityZone: S.optional(S.String),
          GroupId: S.optional(S.String),
          GroupName: S.optional(S.String),
          HostId: S.optional(S.String),
          HostResourceGroupArn: S.optional(S.String),
          PartitionNumber: S.optional(S.Number),
          Tenancy: S.optional(S.String),
        }),
      ).annotate({ identifier: "Placement" });
    case 31:
      return S.suspend(() =>
        S.Struct({
          HostnameType: S.optional(S.String),
          EnableResourceNameDnsARecord: S.optional(S.Boolean),
          EnableResourceNameDnsAAAARecord: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "PrivateDnsNameOptionsRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BlockDeviceMappings: S.optional(__S(578, __c18, 2)),
          CapacityReservationSpecification: S.optional(__S(580, __c18, 4)),
          CpuOptions: S.optional(__S(581, __c18, 5)),
          CreditSpecification: S.optional(__S(582, __c18, 6)),
          DisableApiStop: S.optional(S.Boolean),
          EbsOptimized: S.optional(S.Boolean),
          EnablePrimaryIpv6: S.optional(S.Boolean),
          EnclaveOptions: S.optional(__S(583, __c18, 7)),
          HibernationOptions: S.optional(__S(584, __c18, 8)),
          IamInstanceProfile: S.optional(__S(585, __c18, 9)),
          ImageId: S.optional(S.String),
          InstanceMarketOptions: S.optional(__S(587, __c18, 11)),
          InstanceType: S.optional(S.String),
          Ipv6Addresses: S.optional(__S(589, __c18, 13)),
          Ipv6AddressCount: S.optional(S.Number),
          KernelId: S.optional(S.String),
          KeyName: S.optional(S.String),
          LicenseSpecifications: S.optional(__S(591, __c18, 15)),
          MaintenanceOptions: S.optional(__S(592, __c18, 16)),
          MetadataOptions: S.optional(__S(593, __c18, 17)),
          Monitoring: S.optional(__S(583, __c18, 7)),
          NetworkInterfaces: S.optional(__S(604, __c18, 28)),
          NetworkPerformanceOptions: S.optional(__S(605, __c18, 29)),
          Placement: S.optional(__S(606, __c18, 30)),
          PrivateDnsNameOptions: S.optional(__S(607, __c18, 31)),
          PrivateIpAddress: S.optional(SensitiveString),
          RamdiskId: S.optional(S.String),
          SecurityGroupIds: S.optional(__S(672, __c21, 0)),
          SecurityGroups: S.optional(__S(672, __c21, 0)),
          SubnetId: S.optional(S.String),
          TagSpecifications: S.optional(__S(513, __c16, 1)),
          UserData: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ManagedInstanceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ClientToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(545, __c17, 1)),
          ManagedInstance: __S(608, __c19, 0),
          BillingConfiguration: S.optional(__S(640, __c20, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateWorkspaceInstanceRequest" });
    case 2:
      return S.suspend(() => S.Struct({ WorkspaceInstanceId: S.optional(S.String) })).annotate({
        identifier: "CreateWorkspaceInstanceResponse",
      });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ BillingMode: S.String })).annotate({
        identifier: "BillingConfiguration",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
