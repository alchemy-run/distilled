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
const ns = /*@__PURE__*/ T.XmlNamespace("http://storagegateway.amazonaws.com/doc/2013-06-30");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Storage Gateway",
  serviceShapeName: "StorageGateway_20130630",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "storagegateway" });
const ver = /*@__PURE__*/ T.ServiceVersion("2013-06-30");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
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
              `https://storagegateway-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://storagegateway-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://storagegateway.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://storagegateway.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://storagegateway.{R}.{D}","properties":{},"headers":{}}');

export class InternalServerError
  extends /*@__PURE__*/ S.TaggedError<InternalServerError>()(
    "InternalServerError",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      error: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(1, __c0, 1)).annotate({
          identifier: "StorageGatewayError",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidGatewayRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidGatewayRequestException>()(
    "InvalidGatewayRequestException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      error: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(1, __c0, 1)).annotate({
          identifier: "StorageGatewayError",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ServiceUnavailableError
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableError>()(
    "ServiceUnavailableError",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      error: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(1, __c0, 1)).annotate({
          identifier: "StorageGatewayError",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export type ActivationKey = string;
export type GatewayName = string;
export type GatewayTimezone = string;
export type RegionId = string;
export type GatewayType = string;
export type TapeDriveType = string;
export type MediumChangerType = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type Tags = Tag[];
export interface ActivateGatewayInput {
  ActivationKey: string;
  GatewayName: string;
  GatewayTimezone: string;
  GatewayRegion: string;
  GatewayType?: string;
  TapeDriveType?: string;
  MediumChangerType?: string;
  Tags?: Tag[];
}
export type GatewayARN = string;
export interface ActivateGatewayOutput {
  GatewayARN?: string;
}
export type DiskId = string;
export type DiskIds = string[];
export interface AddCacheInput {
  GatewayARN: string;
  DiskIds: string[];
}
export interface AddCacheOutput {
  GatewayARN?: string;
}
export type ResourceARN = string;
export interface AddTagsToResourceInput {
  ResourceARN: string;
  Tags: Tag[];
}
export interface AddTagsToResourceOutput {
  ResourceARN?: string;
}
export interface AddUploadBufferInput {
  GatewayARN: string;
  DiskIds: string[];
}
export interface AddUploadBufferOutput {
  GatewayARN?: string;
}
export interface AddWorkingStorageInput {
  GatewayARN: string;
  DiskIds: string[];
}
export interface AddWorkingStorageOutput {
  GatewayARN?: string;
}
export type TapeARN = string;
export type PoolId = string;
export interface AssignTapePoolInput {
  TapeARN: string;
  PoolId: string;
  BypassGovernanceRetention?: boolean;
}
export interface AssignTapePoolOutput {
  TapeARN?: string;
}
export type DomainUserName = string;
export type DomainUserPassword = string | redacted.Redacted<string>;
export type ClientToken = string;
export type FileSystemLocationARN = string;
export type AuditDestinationARN = string;
export type CacheStaleTimeoutInSeconds = number;
export interface CacheAttributes {
  CacheStaleTimeoutInSeconds?: number;
}
export type IPV4Address = string;
export type IpAddressList = string[];
export interface EndpointNetworkConfiguration {
  IpAddresses?: string[];
}
export interface AssociateFileSystemInput {
  UserName: string;
  Password: string | redacted.Redacted<string>;
  ClientToken: string;
  GatewayARN: string;
  LocationARN: string;
  Tags?: Tag[];
  AuditDestinationARN?: string;
  CacheAttributes?: CacheAttributes;
  EndpointNetworkConfiguration?: EndpointNetworkConfiguration;
}
export type FileSystemAssociationARN = string;
export interface AssociateFileSystemOutput {
  FileSystemAssociationARN?: string;
}
export type TargetName = string;
export type VolumeARN = string;
export type NetworkInterfaceId = string;
export interface AttachVolumeInput {
  GatewayARN: string;
  TargetName?: string;
  VolumeARN: string;
  NetworkInterfaceId: string;
  DiskId?: string;
}
export type TargetARN = string;
export interface AttachVolumeOutput {
  VolumeARN?: string;
  TargetARN?: string;
}
export interface CancelArchivalInput {
  GatewayARN: string;
  TapeARN: string;
}
export interface CancelArchivalOutput {
  TapeARN?: string;
}
export type CacheReportARN = string;
export interface CancelCacheReportInput {
  CacheReportARN: string;
}
export interface CancelCacheReportOutput {
  CacheReportARN?: string;
}
export interface CancelRetrievalInput {
  GatewayARN: string;
  TapeARN: string;
}
export interface CancelRetrievalOutput {
  TapeARN?: string;
}
export type SnapshotId = string;
export type KMSKey = string;
export interface CreateCachediSCSIVolumeInput {
  GatewayARN: string;
  VolumeSizeInBytes: number;
  SnapshotId?: string;
  TargetName: string;
  SourceVolumeARN?: string;
  NetworkInterfaceId: string;
  ClientToken: string;
  KMSEncrypted?: boolean;
  KMSKey?: string;
  Tags?: Tag[];
}
export interface CreateCachediSCSIVolumeOutput {
  VolumeARN?: string;
  TargetARN?: string;
}
export type PermissionMode = string;
export type PermissionId = number;
export interface NFSFileShareDefaults {
  FileMode?: string;
  DirectoryMode?: string;
  GroupId?: number;
  OwnerId?: number;
}
export type EncryptionType = "SseS3" | "SseKms" | "DsseKms" | (string & {});
export type Role = string;
export type LocationARN = string;
export type StorageClass = string;
export type ObjectACL =
  | "private"
  | "public-read"
  | "public-read-write"
  | "authenticated-read"
  | "bucket-owner-read"
  | "bucket-owner-full-control"
  | "aws-exec-read"
  | (string & {});
export type Ipv4OrIpv6AddressCIDR = string;
export type FileShareClientList = string[];
export type Squash = string;
export type FileShareName = string;
export type NotificationPolicy = string;
export type DNSHostName = string;
export interface CreateNFSFileShareInput {
  ClientToken: string;
  NFSFileShareDefaults?: NFSFileShareDefaults;
  GatewayARN: string;
  EncryptionType?: EncryptionType;
  KMSEncrypted?: boolean;
  KMSKey?: string;
  Role: string;
  LocationARN: string;
  DefaultStorageClass?: string;
  ObjectACL?: ObjectACL;
  ClientList?: string[];
  Squash?: string;
  ReadOnly?: boolean;
  GuessMIMETypeEnabled?: boolean;
  RequesterPays?: boolean;
  Tags?: Tag[];
  FileShareName?: string;
  CacheAttributes?: CacheAttributes;
  NotificationPolicy?: string;
  VPCEndpointDNSName?: string;
  BucketRegion?: string;
  AuditDestinationARN?: string;
}
export type FileShareARN = string;
export interface CreateNFSFileShareOutput {
  FileShareARN?: string;
}
export type UserListUser = string;
export type UserList = string[];
export type Authentication = string;
export type CaseSensitivity = "ClientSpecified" | "CaseSensitive" | (string & {});
export interface CreateSMBFileShareInput {
  ClientToken: string;
  GatewayARN: string;
  EncryptionType?: EncryptionType;
  KMSEncrypted?: boolean;
  KMSKey?: string;
  Role: string;
  LocationARN: string;
  DefaultStorageClass?: string;
  ObjectACL?: ObjectACL;
  ReadOnly?: boolean;
  GuessMIMETypeEnabled?: boolean;
  RequesterPays?: boolean;
  SMBACLEnabled?: boolean;
  AccessBasedEnumeration?: boolean;
  AdminUserList?: string[];
  ValidUserList?: string[];
  InvalidUserList?: string[];
  AuditDestinationARN?: string;
  Authentication?: string;
  CaseSensitivity?: CaseSensitivity;
  Tags?: Tag[];
  FileShareName?: string;
  CacheAttributes?: CacheAttributes;
  NotificationPolicy?: string;
  VPCEndpointDNSName?: string;
  BucketRegion?: string;
  OplocksEnabled?: boolean;
}
export interface CreateSMBFileShareOutput {
  FileShareARN?: string;
}
export type SnapshotDescription = string;
export interface CreateSnapshotInput {
  VolumeARN: string;
  SnapshotDescription: string;
  Tags?: Tag[];
}
export interface CreateSnapshotOutput {
  VolumeARN?: string;
  SnapshotId?: string;
}
export interface CreateSnapshotFromVolumeRecoveryPointInput {
  VolumeARN: string;
  SnapshotDescription: string;
  Tags?: Tag[];
}
export interface CreateSnapshotFromVolumeRecoveryPointOutput {
  SnapshotId?: string;
  VolumeARN?: string;
  VolumeRecoveryPointTime?: string;
}
export interface CreateStorediSCSIVolumeInput {
  GatewayARN: string;
  DiskId: string;
  SnapshotId?: string;
  PreserveExistingData: boolean;
  TargetName: string;
  NetworkInterfaceId: string;
  KMSEncrypted?: boolean;
  KMSKey?: string;
  Tags?: Tag[];
}
export interface CreateStorediSCSIVolumeOutput {
  VolumeARN?: string;
  VolumeSizeInBytes?: number;
  TargetARN?: string;
}
export type PoolName = string;
export type TapeStorageClass = "DEEP_ARCHIVE" | "GLACIER" | (string & {});
export type RetentionLockType = "COMPLIANCE" | "GOVERNANCE" | "NONE" | (string & {});
export type RetentionLockTimeInDays = number;
export interface CreateTapePoolInput {
  PoolName: string;
  StorageClass: TapeStorageClass;
  RetentionLockType?: RetentionLockType;
  RetentionLockTimeInDays?: number;
  Tags?: Tag[];
}
export type PoolARN = string;
export interface CreateTapePoolOutput {
  PoolARN?: string;
}
export type TapeSize = number;
export type NumTapesToCreate = number;
export type TapeBarcodePrefix = string;
export interface CreateTapesInput {
  GatewayARN: string;
  TapeSizeInBytes: number;
  ClientToken: string;
  NumTapesToCreate: number;
  TapeBarcodePrefix: string;
  KMSEncrypted?: boolean;
  KMSKey?: string;
  PoolId?: string;
  Worm?: boolean;
  Tags?: Tag[];
}
export type TapeARNs = string[];
export interface CreateTapesOutput {
  TapeARNs?: string[];
}
export type TapeBarcode = string;
export interface CreateTapeWithBarcodeInput {
  GatewayARN: string;
  TapeSizeInBytes: number;
  TapeBarcode: string;
  KMSEncrypted?: boolean;
  KMSKey?: string;
  PoolId?: string;
  Worm?: boolean;
  Tags?: Tag[];
}
export interface CreateTapeWithBarcodeOutput {
  TapeARN?: string;
}
export interface DeleteAutomaticTapeCreationPolicyInput {
  GatewayARN: string;
}
export interface DeleteAutomaticTapeCreationPolicyOutput {
  GatewayARN?: string;
}
export type BandwidthType = string;
export interface DeleteBandwidthRateLimitInput {
  GatewayARN: string;
  BandwidthType: string;
}
export interface DeleteBandwidthRateLimitOutput {
  GatewayARN?: string;
}
export interface DeleteCacheReportInput {
  CacheReportARN: string;
}
export interface DeleteCacheReportOutput {
  CacheReportARN?: string;
}
export type IqnName = string;
export interface DeleteChapCredentialsInput {
  TargetARN: string;
  InitiatorName: string;
}
export interface DeleteChapCredentialsOutput {
  TargetARN?: string;
  InitiatorName?: string;
}
export interface DeleteFileShareInput {
  FileShareARN: string;
  ForceDelete?: boolean;
}
export interface DeleteFileShareOutput {
  FileShareARN?: string;
}
export interface DeleteGatewayInput {
  GatewayARN: string;
}
export interface DeleteGatewayOutput {
  GatewayARN?: string;
}
export interface DeleteSnapshotScheduleInput {
  VolumeARN: string;
}
export interface DeleteSnapshotScheduleOutput {
  VolumeARN?: string;
}
export interface DeleteTapeInput {
  GatewayARN: string;
  TapeARN: string;
  BypassGovernanceRetention?: boolean;
}
export interface DeleteTapeOutput {
  TapeARN?: string;
}
export interface DeleteTapeArchiveInput {
  TapeARN: string;
  BypassGovernanceRetention?: boolean;
}
export interface DeleteTapeArchiveOutput {
  TapeARN?: string;
}
export interface DeleteTapePoolInput {
  PoolARN: string;
}
export interface DeleteTapePoolOutput {
  PoolARN?: string;
}
export interface DeleteVolumeInput {
  VolumeARN: string;
}
export interface DeleteVolumeOutput {
  VolumeARN?: string;
}
export interface DescribeAvailabilityMonitorTestInput {
  GatewayARN: string;
}
export type AvailabilityMonitorTestStatus = "COMPLETE" | "FAILED" | "PENDING" | (string & {});
export interface DescribeAvailabilityMonitorTestOutput {
  GatewayARN?: string;
  Status?: AvailabilityMonitorTestStatus;
  StartTime?: Date;
}
export interface DescribeBandwidthRateLimitInput {
  GatewayARN: string;
}
export type BandwidthUploadRateLimit = number;
export type BandwidthDownloadRateLimit = number;
export interface DescribeBandwidthRateLimitOutput {
  GatewayARN?: string;
  AverageUploadRateLimitInBitsPerSec?: number;
  AverageDownloadRateLimitInBitsPerSec?: number;
}
export interface DescribeBandwidthRateLimitScheduleInput {
  GatewayARN: string;
}
export type HourOfDay = number;
export type MinuteOfHour = number;
export type DayOfWeek = number;
export type DaysOfWeek = number[];
export interface BandwidthRateLimitInterval {
  StartHourOfDay: number;
  StartMinuteOfHour: number;
  EndHourOfDay: number;
  EndMinuteOfHour: number;
  DaysOfWeek: number[];
  AverageUploadRateLimitInBitsPerSec?: number;
  AverageDownloadRateLimitInBitsPerSec?: number;
}
export type BandwidthRateLimitIntervals = BandwidthRateLimitInterval[];
export interface DescribeBandwidthRateLimitScheduleOutput {
  GatewayARN?: string;
  BandwidthRateLimitIntervals?: BandwidthRateLimitInterval[];
}
export interface DescribeCacheInput {
  GatewayARN: string;
}
export interface DescribeCacheOutput {
  GatewayARN?: string;
  DiskIds?: string[];
  CacheAllocatedInBytes?: number;
  CacheUsedPercentage?: number;
  CacheDirtyPercentage?: number;
  CacheHitPercentage?: number;
  CacheMissPercentage?: number;
}
export type VolumeARNs = string[];
export interface DescribeCachediSCSIVolumesInput {
  VolumeARNs: string[];
}
export type VolumeId = string;
export type VolumeType = string;
export type VolumeStatus = string;
export type VolumeAttachmentStatus = string;
export type DoubleObject = number;
export type PositiveIntObject = number;
export interface VolumeiSCSIAttributes {
  TargetARN?: string;
  NetworkInterfaceId?: string;
  NetworkInterfacePort?: number;
  LunNumber?: number;
  ChapEnabled?: boolean;
}
export type CreatedDate = Date;
export type VolumeUsedInBytes = number;
export interface CachediSCSIVolume {
  VolumeARN?: string;
  VolumeId?: string;
  VolumeType?: string;
  VolumeStatus?: string;
  VolumeAttachmentStatus?: string;
  VolumeSizeInBytes?: number;
  VolumeProgress?: number;
  SourceSnapshotId?: string;
  VolumeiSCSIAttributes?: VolumeiSCSIAttributes;
  CreatedDate?: Date;
  VolumeUsedInBytes?: number;
  KMSKey?: string;
  TargetName?: string;
}
export type CachediSCSIVolumes = CachediSCSIVolume[];
export interface DescribeCachediSCSIVolumesOutput {
  CachediSCSIVolumes?: CachediSCSIVolume[];
}
export interface DescribeCacheReportInput {
  CacheReportARN: string;
}
export type CacheReportStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELED"
  | "FAILED"
  | "ERROR"
  | (string & {});
export type ReportCompletionPercent = number;
export type CacheReportFilterName = "UploadState" | "UploadFailureReason" | (string & {});
export type CacheReportFilterValue = string;
export type CacheReportFilterValues = string[];
export interface CacheReportFilter {
  Name: CacheReportFilterName;
  Values: string[];
}
export type CacheReportFilterList = CacheReportFilter[];
export type CacheReportName = string;
export interface CacheReportInfo {
  CacheReportARN?: string;
  CacheReportStatus?: CacheReportStatus;
  ReportCompletionPercent?: number;
  EndTime?: Date;
  Role?: string;
  FileShareARN?: string;
  LocationARN?: string;
  StartTime?: Date;
  InclusionFilters?: CacheReportFilter[];
  ExclusionFilters?: CacheReportFilter[];
  ReportName?: string;
  Tags?: Tag[];
}
export interface DescribeCacheReportOutput {
  CacheReportInfo?: CacheReportInfo;
}
export interface DescribeChapCredentialsInput {
  TargetARN: string;
}
export type ChapSecret = string | redacted.Redacted<string>;
export interface ChapInfo {
  TargetARN?: string;
  SecretToAuthenticateInitiator?: string | redacted.Redacted<string>;
  InitiatorName?: string;
  SecretToAuthenticateTarget?: string | redacted.Redacted<string>;
}
export type ChapCredentials = ChapInfo[];
export interface DescribeChapCredentialsOutput {
  ChapCredentials?: ChapInfo[];
}
export type FileSystemAssociationARNList = string[];
export interface DescribeFileSystemAssociationsInput {
  FileSystemAssociationARNList: string[];
}
export type FileSystemAssociationStatus = string;
export type FileSystemAssociationSyncErrorCode = string;
export interface FileSystemAssociationStatusDetail {
  ErrorCode?: string;
}
export type FileSystemAssociationStatusDetails = FileSystemAssociationStatusDetail[];
export interface FileSystemAssociationInfo {
  FileSystemAssociationARN?: string;
  LocationARN?: string;
  FileSystemAssociationStatus?: string;
  AuditDestinationARN?: string;
  GatewayARN?: string;
  Tags?: Tag[];
  CacheAttributes?: CacheAttributes;
  EndpointNetworkConfiguration?: EndpointNetworkConfiguration;
  FileSystemAssociationStatusDetails?: FileSystemAssociationStatusDetail[];
}
export type FileSystemAssociationInfoList = FileSystemAssociationInfo[];
export interface DescribeFileSystemAssociationsOutput {
  FileSystemAssociationInfoList?: FileSystemAssociationInfo[];
}
export interface DescribeGatewayInformationInput {
  GatewayARN: string;
}
export type GatewayId = string;
export type GatewayState = string;
export interface NetworkInterface {
  Ipv4Address?: string;
  MacAddress?: string;
  Ipv6Address?: string;
}
export type GatewayNetworkInterfaces = NetworkInterface[];
export type NextUpdateAvailabilityDate = string;
export type LastSoftwareUpdate = string;
export type Ec2InstanceId = string;
export type Ec2InstanceRegion = string;
export type CloudWatchLogGroupARN = string;
export type HostEnvironment =
  | "VMWARE"
  | "HYPER-V"
  | "EC2"
  | "KVM"
  | "OTHER"
  | "SNOWBALL"
  | (string & {});
export type EndpointType = string;
export type SoftwareUpdatesEndDate = string;
export type DeprecationDate = string;
export type GatewayCapacity = "Small" | "Medium" | "Large" | (string & {});
export type SupportedGatewayCapacities = GatewayCapacity[];
export type HostEnvironmentId = string;
export type SoftwareVersion = string;
export interface DescribeGatewayInformationOutput {
  GatewayARN?: string;
  GatewayId?: string;
  GatewayName?: string;
  GatewayTimezone?: string;
  GatewayState?: string;
  GatewayNetworkInterfaces?: NetworkInterface[];
  GatewayType?: string;
  NextUpdateAvailabilityDate?: string;
  LastSoftwareUpdate?: string;
  Ec2InstanceId?: string;
  Ec2InstanceRegion?: string;
  Tags?: Tag[];
  VPCEndpoint?: string;
  CloudWatchLogGroupARN?: string;
  HostEnvironment?: HostEnvironment;
  EndpointType?: string;
  SoftwareUpdatesEndDate?: string;
  DeprecationDate?: string;
  GatewayCapacity?: GatewayCapacity;
  SupportedGatewayCapacities?: GatewayCapacity[];
  HostEnvironmentId?: string;
  SoftwareVersion?: string;
}
export interface DescribeMaintenanceStartTimeInput {
  GatewayARN: string;
}
export type DayOfMonth = number;
export type AutomaticUpdatePolicy = "ALL_VERSIONS" | "EMERGENCY_VERSIONS_ONLY" | (string & {});
export interface SoftwareUpdatePreferences {
  AutomaticUpdatePolicy?: AutomaticUpdatePolicy;
}
export interface DescribeMaintenanceStartTimeOutput {
  GatewayARN?: string;
  HourOfDay?: number;
  MinuteOfHour?: number;
  DayOfWeek?: number;
  DayOfMonth?: number;
  Timezone?: string;
  SoftwareUpdatePreferences?: SoftwareUpdatePreferences;
}
export type FileShareARNList = string[];
export interface DescribeNFSFileSharesInput {
  FileShareARNList: string[];
}
export type FileShareId = string;
export type FileShareStatus = string;
export type Path = string;
export interface NFSFileShareInfo {
  NFSFileShareDefaults?: NFSFileShareDefaults;
  FileShareARN?: string;
  FileShareId?: string;
  FileShareStatus?: string;
  GatewayARN?: string;
  EncryptionType?: EncryptionType;
  KMSEncrypted?: boolean;
  KMSKey?: string;
  Path?: string;
  Role?: string;
  LocationARN?: string;
  DefaultStorageClass?: string;
  ObjectACL?: ObjectACL;
  ClientList?: string[];
  Squash?: string;
  ReadOnly?: boolean;
  GuessMIMETypeEnabled?: boolean;
  RequesterPays?: boolean;
  Tags?: Tag[];
  FileShareName?: string;
  CacheAttributes?: CacheAttributes;
  NotificationPolicy?: string;
  VPCEndpointDNSName?: string;
  BucketRegion?: string;
  AuditDestinationARN?: string;
}
export type NFSFileShareInfoList = NFSFileShareInfo[];
export interface DescribeNFSFileSharesOutput {
  NFSFileShareInfoList?: NFSFileShareInfo[];
}
export interface DescribeSMBFileSharesInput {
  FileShareARNList: string[];
}
export interface SMBFileShareInfo {
  FileShareARN?: string;
  FileShareId?: string;
  FileShareStatus?: string;
  GatewayARN?: string;
  EncryptionType?: EncryptionType;
  KMSEncrypted?: boolean;
  KMSKey?: string;
  Path?: string;
  Role?: string;
  LocationARN?: string;
  DefaultStorageClass?: string;
  ObjectACL?: ObjectACL;
  ReadOnly?: boolean;
  GuessMIMETypeEnabled?: boolean;
  RequesterPays?: boolean;
  SMBACLEnabled?: boolean;
  AccessBasedEnumeration?: boolean;
  AdminUserList?: string[];
  ValidUserList?: string[];
  InvalidUserList?: string[];
  AuditDestinationARN?: string;
  Authentication?: string;
  CaseSensitivity?: CaseSensitivity;
  Tags?: Tag[];
  FileShareName?: string;
  CacheAttributes?: CacheAttributes;
  NotificationPolicy?: string;
  VPCEndpointDNSName?: string;
  BucketRegion?: string;
  OplocksEnabled?: boolean;
}
export type SMBFileShareInfoList = SMBFileShareInfo[];
export interface DescribeSMBFileSharesOutput {
  SMBFileShareInfoList?: SMBFileShareInfo[];
}
export interface DescribeSMBSettingsInput {
  GatewayARN: string;
}
export type DomainName = string;
export type ActiveDirectoryStatus =
  | "ACCESS_DENIED"
  | "DETACHED"
  | "JOINED"
  | "JOINING"
  | "NETWORK_ERROR"
  | "TIMEOUT"
  | "UNKNOWN_ERROR"
  | "INSUFFICIENT_PERMISSIONS"
  | (string & {});
export type SMBSecurityStrategy =
  | "ClientSpecified"
  | "MandatorySigning"
  | "MandatoryEncryption"
  | "MandatoryEncryptionNoAes128"
  | (string & {});
export interface SMBLocalGroups {
  GatewayAdmins?: string[];
}
export interface DescribeSMBSettingsOutput {
  GatewayARN?: string;
  DomainName?: string;
  ActiveDirectoryStatus?: ActiveDirectoryStatus;
  SMBGuestPasswordSet?: boolean;
  SMBSecurityStrategy?: SMBSecurityStrategy;
  FileSharesVisible?: boolean;
  SMBLocalGroups?: SMBLocalGroups;
}
export interface DescribeSnapshotScheduleInput {
  VolumeARN: string;
}
export type RecurrenceInHours = number;
export type Description = string;
export interface DescribeSnapshotScheduleOutput {
  VolumeARN?: string;
  StartAt?: number;
  RecurrenceInHours?: number;
  Description?: string;
  Timezone?: string;
  Tags?: Tag[];
}
export interface DescribeStorediSCSIVolumesInput {
  VolumeARNs: string[];
}
export interface StorediSCSIVolume {
  VolumeARN?: string;
  VolumeId?: string;
  VolumeType?: string;
  VolumeStatus?: string;
  VolumeAttachmentStatus?: string;
  VolumeSizeInBytes?: number;
  VolumeProgress?: number;
  VolumeDiskId?: string;
  SourceSnapshotId?: string;
  PreservedExistingData?: boolean;
  VolumeiSCSIAttributes?: VolumeiSCSIAttributes;
  CreatedDate?: Date;
  VolumeUsedInBytes?: number;
  KMSKey?: string;
  TargetName?: string;
}
export type StorediSCSIVolumes = StorediSCSIVolume[];
export interface DescribeStorediSCSIVolumesOutput {
  StorediSCSIVolumes?: StorediSCSIVolume[];
}
export type Marker = string;
export interface DescribeTapeArchivesInput {
  TapeARNs?: string[];
  Marker?: string;
  Limit?: number;
}
export type TapeArchiveStatus = string;
export type TapeUsage = number;
export interface TapeArchive {
  TapeARN?: string;
  TapeBarcode?: string;
  TapeCreatedDate?: Date;
  TapeSizeInBytes?: number;
  CompletionTime?: Date;
  RetrievedTo?: string;
  TapeStatus?: string;
  TapeUsedInBytes?: number;
  KMSKey?: string;
  PoolId?: string;
  Worm?: boolean;
  RetentionStartDate?: Date;
  PoolEntryDate?: Date;
}
export type TapeArchives = TapeArchive[];
export interface DescribeTapeArchivesOutput {
  TapeArchives?: TapeArchive[];
  Marker?: string;
}
export interface DescribeTapeRecoveryPointsInput {
  GatewayARN: string;
  Marker?: string;
  Limit?: number;
}
export type TapeRecoveryPointStatus = string;
export interface TapeRecoveryPointInfo {
  TapeARN?: string;
  TapeRecoveryPointTime?: Date;
  TapeSizeInBytes?: number;
  TapeStatus?: string;
}
export type TapeRecoveryPointInfos = TapeRecoveryPointInfo[];
export interface DescribeTapeRecoveryPointsOutput {
  GatewayARN?: string;
  TapeRecoveryPointInfos?: TapeRecoveryPointInfo[];
  Marker?: string;
}
export interface DescribeTapesInput {
  GatewayARN: string;
  TapeARNs?: string[];
  Marker?: string;
  Limit?: number;
}
export type TapeStatus = string;
export type VTLDeviceARN = string;
export interface Tape {
  TapeARN?: string;
  TapeBarcode?: string;
  TapeCreatedDate?: Date;
  TapeSizeInBytes?: number;
  TapeStatus?: string;
  VTLDevice?: string;
  Progress?: number;
  TapeUsedInBytes?: number;
  KMSKey?: string;
  PoolId?: string;
  Worm?: boolean;
  RetentionStartDate?: Date;
  PoolEntryDate?: Date;
}
export type Tapes = Tape[];
export interface DescribeTapesOutput {
  Tapes?: Tape[];
  Marker?: string;
}
export interface DescribeUploadBufferInput {
  GatewayARN: string;
}
export interface DescribeUploadBufferOutput {
  GatewayARN?: string;
  DiskIds?: string[];
  UploadBufferUsedInBytes?: number;
  UploadBufferAllocatedInBytes?: number;
}
export type VTLDeviceARNs = string[];
export interface DescribeVTLDevicesInput {
  GatewayARN: string;
  VTLDeviceARNs?: string[];
  Marker?: string;
  Limit?: number;
}
export type VTLDeviceType = string;
export type VTLDeviceVendor = string;
export type VTLDeviceProductIdentifier = string;
export interface DeviceiSCSIAttributes {
  TargetARN?: string;
  NetworkInterfaceId?: string;
  NetworkInterfacePort?: number;
  ChapEnabled?: boolean;
}
export interface VTLDevice {
  VTLDeviceARN?: string;
  VTLDeviceType?: string;
  VTLDeviceVendor?: string;
  VTLDeviceProductIdentifier?: string;
  DeviceiSCSIAttributes?: DeviceiSCSIAttributes;
}
export type VTLDevices = VTLDevice[];
export interface DescribeVTLDevicesOutput {
  GatewayARN?: string;
  VTLDevices?: VTLDevice[];
  Marker?: string;
}
export interface DescribeWorkingStorageInput {
  GatewayARN: string;
}
export interface DescribeWorkingStorageOutput {
  GatewayARN?: string;
  DiskIds?: string[];
  WorkingStorageUsedInBytes?: number;
  WorkingStorageAllocatedInBytes?: number;
}
export interface DetachVolumeInput {
  VolumeARN: string;
  ForceDetach?: boolean;
}
export interface DetachVolumeOutput {
  VolumeARN?: string;
}
export interface DisableGatewayInput {
  GatewayARN: string;
}
export interface DisableGatewayOutput {
  GatewayARN?: string;
}
export interface DisassociateFileSystemInput {
  FileSystemAssociationARN: string;
  ForceDelete?: boolean;
}
export interface DisassociateFileSystemOutput {
  FileSystemAssociationARN?: string;
}
export interface EvictFilesFailingUploadInput {
  FileShareARN: string;
  ForceRemove?: boolean;
}
export interface EvictFilesFailingUploadOutput {
  NotificationId?: string;
}
export type OrganizationalUnit = string;
export type Host = string;
export type Hosts = string[];
export type TimeoutInSeconds = number;
export interface JoinDomainInput {
  GatewayARN: string;
  DomainName: string;
  OrganizationalUnit?: string;
  DomainControllers?: string[];
  TimeoutInSeconds?: number;
  UserName: string;
  Password: string | redacted.Redacted<string>;
}
export interface JoinDomainOutput {
  GatewayARN?: string;
  ActiveDirectoryStatus?: ActiveDirectoryStatus;
}
export interface ListAutomaticTapeCreationPoliciesInput {
  GatewayARN?: string;
}
export type MinimumNumTapes = number;
export interface AutomaticTapeCreationRule {
  TapeBarcodePrefix: string;
  PoolId: string;
  TapeSizeInBytes: number;
  MinimumNumTapes: number;
  Worm?: boolean;
}
export type AutomaticTapeCreationRules = AutomaticTapeCreationRule[];
export interface AutomaticTapeCreationPolicyInfo {
  AutomaticTapeCreationRules?: AutomaticTapeCreationRule[];
  GatewayARN?: string;
}
export type AutomaticTapeCreationPolicyInfos = AutomaticTapeCreationPolicyInfo[];
export interface ListAutomaticTapeCreationPoliciesOutput {
  AutomaticTapeCreationPolicyInfos?: AutomaticTapeCreationPolicyInfo[];
}
export interface ListCacheReportsInput {
  Marker?: string;
}
export type CacheReportList = CacheReportInfo[];
export interface ListCacheReportsOutput {
  CacheReportList?: CacheReportInfo[];
  Marker?: string;
}
export interface ListFileSharesInput {
  GatewayARN?: string;
  Limit?: number;
  Marker?: string;
}
export type FileShareType = "NFS" | "SMB" | (string & {});
export interface FileShareInfo {
  FileShareType?: FileShareType;
  FileShareARN?: string;
  FileShareId?: string;
  FileShareStatus?: string;
  GatewayARN?: string;
}
export type FileShareInfoList = FileShareInfo[];
export interface ListFileSharesOutput {
  Marker?: string;
  NextMarker?: string;
  FileShareInfoList?: FileShareInfo[];
}
export interface ListFileSystemAssociationsInput {
  GatewayARN?: string;
  Limit?: number;
  Marker?: string;
}
export type FileSystemAssociationId = string;
export interface FileSystemAssociationSummary {
  FileSystemAssociationId?: string;
  FileSystemAssociationARN?: string;
  FileSystemAssociationStatus?: string;
  GatewayARN?: string;
}
export type FileSystemAssociationSummaryList = FileSystemAssociationSummary[];
export interface ListFileSystemAssociationsOutput {
  Marker?: string;
  NextMarker?: string;
  FileSystemAssociationSummaryList?: FileSystemAssociationSummary[];
}
export interface ListGatewaysInput {
  Marker?: string;
  Limit?: number;
}
export type GatewayOperationalState = string;
export interface GatewayInfo {
  GatewayId?: string;
  GatewayARN?: string;
  GatewayType?: string;
  GatewayOperationalState?: string;
  GatewayName?: string;
  Ec2InstanceId?: string;
  Ec2InstanceRegion?: string;
  HostEnvironment?: HostEnvironment;
  HostEnvironmentId?: string;
  DeprecationDate?: string;
  SoftwareVersion?: string;
}
export type Gateways = GatewayInfo[];
export interface ListGatewaysOutput {
  Gateways?: GatewayInfo[];
  Marker?: string;
}
export interface ListLocalDisksInput {
  GatewayARN: string;
}
export type DiskAllocationType = string;
export type DiskAttribute = string;
export type DiskAttributeList = string[];
export interface Disk {
  DiskId?: string;
  DiskPath?: string;
  DiskNode?: string;
  DiskStatus?: string;
  DiskSizeInBytes?: number;
  DiskAllocationType?: string;
  DiskAllocationResource?: string;
  DiskAttributeList?: string[];
}
export type Disks = Disk[];
export interface ListLocalDisksOutput {
  GatewayARN?: string;
  Disks?: Disk[];
}
export interface ListTagsForResourceInput {
  ResourceARN: string;
  Marker?: string;
  Limit?: number;
}
export interface ListTagsForResourceOutput {
  ResourceARN?: string;
  Marker?: string;
  Tags?: Tag[];
}
export type PoolARNs = string[];
export interface ListTapePoolsInput {
  PoolARNs?: string[];
  Marker?: string;
  Limit?: number;
}
export type PoolStatus = "ACTIVE" | "DELETED" | (string & {});
export interface PoolInfo {
  PoolARN?: string;
  PoolName?: string;
  StorageClass?: TapeStorageClass;
  RetentionLockType?: RetentionLockType;
  RetentionLockTimeInDays?: number;
  PoolStatus?: PoolStatus;
}
export type PoolInfos = PoolInfo[];
export interface ListTapePoolsOutput {
  PoolInfos?: PoolInfo[];
  Marker?: string;
}
export interface ListTapesInput {
  TapeARNs?: string[];
  Marker?: string;
  Limit?: number;
}
export interface TapeInfo {
  TapeARN?: string;
  TapeBarcode?: string;
  TapeSizeInBytes?: number;
  TapeStatus?: string;
  GatewayARN?: string;
  PoolId?: string;
  RetentionStartDate?: Date;
  PoolEntryDate?: Date;
}
export type TapeInfos = TapeInfo[];
export interface ListTapesOutput {
  TapeInfos?: TapeInfo[];
  Marker?: string;
}
export interface ListVolumeInitiatorsInput {
  VolumeARN: string;
}
export type Initiator = string;
export type Initiators = string[];
export interface ListVolumeInitiatorsOutput {
  Initiators?: string[];
}
export interface ListVolumeRecoveryPointsInput {
  GatewayARN: string;
}
export interface VolumeRecoveryPointInfo {
  VolumeARN?: string;
  VolumeSizeInBytes?: number;
  VolumeUsageInBytes?: number;
  VolumeRecoveryPointTime?: string;
}
export type VolumeRecoveryPointInfos = VolumeRecoveryPointInfo[];
export interface ListVolumeRecoveryPointsOutput {
  GatewayARN?: string;
  VolumeRecoveryPointInfos?: VolumeRecoveryPointInfo[];
}
export interface ListVolumesInput {
  GatewayARN?: string;
  Marker?: string;
  Limit?: number;
}
export interface VolumeInfo {
  VolumeARN?: string;
  VolumeId?: string;
  GatewayARN?: string;
  GatewayId?: string;
  VolumeType?: string;
  VolumeSizeInBytes?: number;
  VolumeAttachmentStatus?: string;
}
export type VolumeInfos = VolumeInfo[];
export interface ListVolumesOutput {
  GatewayARN?: string;
  Marker?: string;
  VolumeInfos?: VolumeInfo[];
}
export interface NotifyWhenUploadedInput {
  FileShareARN: string;
}
export type NotificationId = string;
export interface NotifyWhenUploadedOutput {
  FileShareARN?: string;
  NotificationId?: string;
}
export type Folder = string;
export type FolderList = string[];
export interface RefreshCacheInput {
  FileShareARN: string;
  FolderList?: string[];
  Recursive?: boolean;
}
export interface RefreshCacheOutput {
  FileShareARN?: string;
  NotificationId?: string;
}
export type TagKeys = string[];
export interface RemoveTagsFromResourceInput {
  ResourceARN: string;
  TagKeys: string[];
}
export interface RemoveTagsFromResourceOutput {
  ResourceARN?: string;
}
export interface ResetCacheInput {
  GatewayARN: string;
}
export interface ResetCacheOutput {
  GatewayARN?: string;
}
export interface RetrieveTapeArchiveInput {
  TapeARN: string;
  GatewayARN: string;
}
export interface RetrieveTapeArchiveOutput {
  TapeARN?: string;
}
export interface RetrieveTapeRecoveryPointInput {
  TapeARN: string;
  GatewayARN: string;
}
export interface RetrieveTapeRecoveryPointOutput {
  TapeARN?: string;
}
export type LocalConsolePassword = string | redacted.Redacted<string>;
export interface SetLocalConsolePasswordInput {
  GatewayARN: string;
  LocalConsolePassword: string | redacted.Redacted<string>;
}
export interface SetLocalConsolePasswordOutput {
  GatewayARN?: string;
}
export type SMBGuestPassword = string | redacted.Redacted<string>;
export interface SetSMBGuestPasswordInput {
  GatewayARN: string;
  Password: string | redacted.Redacted<string>;
}
export interface SetSMBGuestPasswordOutput {
  GatewayARN?: string;
}
export interface ShutdownGatewayInput {
  GatewayARN: string;
}
export interface ShutdownGatewayOutput {
  GatewayARN?: string;
}
export interface StartAvailabilityMonitorTestInput {
  GatewayARN: string;
}
export interface StartAvailabilityMonitorTestOutput {
  GatewayARN?: string;
}
export interface StartCacheReportInput {
  FileShareARN: string;
  Role: string;
  LocationARN: string;
  BucketRegion: string;
  VPCEndpointDNSName?: string;
  InclusionFilters?: CacheReportFilter[];
  ExclusionFilters?: CacheReportFilter[];
  ClientToken: string;
  Tags?: Tag[];
}
export interface StartCacheReportOutput {
  CacheReportARN?: string;
}
export interface StartGatewayInput {
  GatewayARN: string;
}
export interface StartGatewayOutput {
  GatewayARN?: string;
}
export interface UpdateAutomaticTapeCreationPolicyInput {
  AutomaticTapeCreationRules: AutomaticTapeCreationRule[];
  GatewayARN: string;
}
export interface UpdateAutomaticTapeCreationPolicyOutput {
  GatewayARN?: string;
}
export interface UpdateBandwidthRateLimitInput {
  GatewayARN: string;
  AverageUploadRateLimitInBitsPerSec?: number;
  AverageDownloadRateLimitInBitsPerSec?: number;
}
export interface UpdateBandwidthRateLimitOutput {
  GatewayARN?: string;
}
export interface UpdateBandwidthRateLimitScheduleInput {
  GatewayARN: string;
  BandwidthRateLimitIntervals: BandwidthRateLimitInterval[];
}
export interface UpdateBandwidthRateLimitScheduleOutput {
  GatewayARN?: string;
}
export interface UpdateChapCredentialsInput {
  TargetARN: string;
  SecretToAuthenticateInitiator: string | redacted.Redacted<string>;
  InitiatorName: string;
  SecretToAuthenticateTarget?: string | redacted.Redacted<string>;
}
export interface UpdateChapCredentialsOutput {
  TargetARN?: string;
  InitiatorName?: string;
}
export interface UpdateFileSystemAssociationInput {
  FileSystemAssociationARN: string;
  UserName?: string;
  Password?: string | redacted.Redacted<string>;
  AuditDestinationARN?: string;
  CacheAttributes?: CacheAttributes;
}
export interface UpdateFileSystemAssociationOutput {
  FileSystemAssociationARN?: string;
}
export interface UpdateGatewayInformationInput {
  GatewayARN: string;
  GatewayName?: string;
  GatewayTimezone?: string;
  CloudWatchLogGroupARN?: string;
  GatewayCapacity?: GatewayCapacity;
}
export interface UpdateGatewayInformationOutput {
  GatewayARN?: string;
  GatewayName?: string;
}
export interface UpdateGatewaySoftwareNowInput {
  GatewayARN: string;
}
export interface UpdateGatewaySoftwareNowOutput {
  GatewayARN?: string;
}
export interface UpdateMaintenanceStartTimeInput {
  GatewayARN: string;
  HourOfDay?: number;
  MinuteOfHour?: number;
  DayOfWeek?: number;
  DayOfMonth?: number;
  SoftwareUpdatePreferences?: SoftwareUpdatePreferences;
}
export interface UpdateMaintenanceStartTimeOutput {
  GatewayARN?: string;
}
export interface UpdateNFSFileShareInput {
  FileShareARN: string;
  EncryptionType?: EncryptionType;
  KMSEncrypted?: boolean;
  KMSKey?: string;
  NFSFileShareDefaults?: NFSFileShareDefaults;
  DefaultStorageClass?: string;
  ObjectACL?: ObjectACL;
  ClientList?: string[];
  Squash?: string;
  ReadOnly?: boolean;
  GuessMIMETypeEnabled?: boolean;
  RequesterPays?: boolean;
  FileShareName?: string;
  CacheAttributes?: CacheAttributes;
  NotificationPolicy?: string;
  AuditDestinationARN?: string;
}
export interface UpdateNFSFileShareOutput {
  FileShareARN?: string;
}
export interface UpdateSMBFileShareInput {
  FileShareARN: string;
  EncryptionType?: EncryptionType;
  KMSEncrypted?: boolean;
  KMSKey?: string;
  DefaultStorageClass?: string;
  ObjectACL?: ObjectACL;
  ReadOnly?: boolean;
  GuessMIMETypeEnabled?: boolean;
  RequesterPays?: boolean;
  SMBACLEnabled?: boolean;
  AccessBasedEnumeration?: boolean;
  AdminUserList?: string[];
  ValidUserList?: string[];
  InvalidUserList?: string[];
  AuditDestinationARN?: string;
  CaseSensitivity?: CaseSensitivity;
  FileShareName?: string;
  CacheAttributes?: CacheAttributes;
  NotificationPolicy?: string;
  OplocksEnabled?: boolean;
}
export interface UpdateSMBFileShareOutput {
  FileShareARN?: string;
}
export interface UpdateSMBFileShareVisibilityInput {
  GatewayARN: string;
  FileSharesVisible: boolean;
}
export interface UpdateSMBFileShareVisibilityOutput {
  GatewayARN?: string;
}
export interface UpdateSMBLocalGroupsInput {
  GatewayARN: string;
  SMBLocalGroups: SMBLocalGroups;
}
export interface UpdateSMBLocalGroupsOutput {
  GatewayARN?: string;
}
export interface UpdateSMBSecurityStrategyInput {
  GatewayARN: string;
  SMBSecurityStrategy: SMBSecurityStrategy;
}
export interface UpdateSMBSecurityStrategyOutput {
  GatewayARN?: string;
}
export interface UpdateSnapshotScheduleInput {
  VolumeARN: string;
  StartAt: number;
  RecurrenceInHours: number;
  Description?: string;
  Tags?: Tag[];
}
export interface UpdateSnapshotScheduleOutput {
  VolumeARN?: string;
}
export type DeviceType = string;
export interface UpdateVTLDeviceTypeInput {
  VTLDeviceARN: string;
  DeviceType: string;
}
export interface UpdateVTLDeviceTypeOutput {
  VTLDeviceARN?: string;
}
export type ErrorCode =
  | "ActivationKeyExpired"
  | "ActivationKeyInvalid"
  | "ActivationKeyNotFound"
  | "GatewayInternalError"
  | "GatewayNotConnected"
  | "GatewayNotFound"
  | "GatewayProxyNetworkConnectionBusy"
  | "AuthenticationFailure"
  | "BandwidthThrottleScheduleNotFound"
  | "Blocked"
  | "CannotExportSnapshot"
  | "ChapCredentialNotFound"
  | "DiskAlreadyAllocated"
  | "DiskDoesNotExist"
  | "DiskSizeGreaterThanVolumeMaxSize"
  | "DiskSizeLessThanVolumeSize"
  | "DiskSizeNotGigAligned"
  | "DuplicateCertificateInfo"
  | "DuplicateSchedule"
  | "EndpointNotFound"
  | "IAMNotSupported"
  | "InitiatorInvalid"
  | "InitiatorNotFound"
  | "InternalError"
  | "InvalidGateway"
  | "InvalidEndpoint"
  | "InvalidParameters"
  | "InvalidSchedule"
  | "LocalStorageLimitExceeded"
  | "LunAlreadyAllocated "
  | "LunInvalid"
  | "JoinDomainInProgress"
  | "MaximumContentLengthExceeded"
  | "MaximumTapeCartridgeCountExceeded"
  | "MaximumVolumeCountExceeded"
  | "NetworkConfigurationChanged"
  | "NoDisksAvailable"
  | "NotImplemented"
  | "NotSupported"
  | "OperationAborted"
  | "OutdatedGateway"
  | "ParametersNotImplemented"
  | "RegionInvalid"
  | "RequestTimeout"
  | "ServiceUnavailable"
  | "SnapshotDeleted"
  | "SnapshotIdInvalid"
  | "SnapshotInProgress"
  | "SnapshotNotFound"
  | "SnapshotScheduleNotFound"
  | "StagingAreaFull"
  | "StorageFailure"
  | "TapeCartridgeNotFound"
  | "TargetAlreadyExists"
  | "TargetInvalid"
  | "TargetNotFound"
  | "UnauthorizedOperation"
  | "VolumeAlreadyExists"
  | "VolumeIdInvalid"
  | "VolumeInUse"
  | "VolumeNotFound"
  | "VolumeNotReady"
  | (string & {});
export type ErrorDetails = { [key: string]: string | undefined };
export interface StorageGatewayError {
  errorCode?: ErrorCode;
  errorDetails?: { [key: string]: string | undefined };
}
export type ActivateGatewayError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Activates the gateway you previously deployed on your host. In the activation process,
 * you specify information such as the Amazon Web Services Region that you want to use for
 * storing snapshots or tapes, the time zone for scheduled snapshots the gateway snapshot
 * schedule window, an activation key, and a name for your gateway. The activation process
 * also associates your gateway with your account. For more information, see UpdateGatewayInformation.
 *
 * You must turn on the gateway VM before you can activate your gateway.
 */
export const activateGateway: API.OperationMethod<
  ActivateGatewayInput,
  ActivateGatewayOutput,
  ActivateGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c28, 0) as any as S.Schema<ActivateGatewayInput>,
  output: __S(232, __c29, 0) as any as S.Schema<ActivateGatewayOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ActivateGateway",
}));

export type AddCacheError = InternalServerError | InvalidGatewayRequestException | CommonErrors;
/**
 * Configures one or more gateway local disks as cache for a gateway. This operation is
 * only supported in the cached volume, tape, and file gateway type (see How Storage Gateway works (architecture).
 *
 * In the request, you specify the gateway Amazon Resource Name (ARN) to which you want to
 * add cache, and one or more disk IDs that you want to configure as cache.
 */
export const addCache: API.OperationMethod<
  AddCacheInput,
  AddCacheOutput,
  AddCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(360, __c45, 0) as any as S.Schema<AddCacheInput>,
  output: __S(232, __c29, 0) as any as S.Schema<AddCacheOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddCache",
}));

export type AddTagsToResourceError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Adds one or more tags to the specified resource. You use tags to add metadata to
 * resources, which you can use to categorize these resources. For example, you can categorize
 * resources by purpose, owner, environment, or team. Each tag consists of a key and a value,
 * which you define. You can add tags to the following Storage Gateway resources:
 *
 * - Storage gateways of all types
 *
 * - Storage volumes
 *
 * - Virtual tapes
 *
 * - NFS and SMB file shares
 *
 * - File System associations
 *
 * You can create a maximum of 50 tags for each resource. Virtual tapes and storage volumes
 * that are recovered to a new gateway maintain their tags.
 */
export const addTagsToResource: API.OperationMethod<
  AddTagsToResourceInput,
  AddTagsToResourceOutput,
  AddTagsToResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(472, __c59, 0) as any as S.Schema<AddTagsToResourceInput>,
  output: __S(480, __c60, 0) as any as S.Schema<AddTagsToResourceOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTagsToResource",
}));

export type AddUploadBufferError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Configures one or more gateway local disks as upload buffer for a specified gateway.
 * This operation is supported for the stored volume, cached volume, and tape gateway
 * types.
 *
 * In the request, you specify the gateway Amazon Resource Name (ARN) to which you want to
 * add upload buffer, and one or more disk IDs that you want to configure as upload
 * buffer.
 */
export const addUploadBuffer: API.OperationMethod<
  AddUploadBufferInput,
  AddUploadBufferOutput,
  AddUploadBufferError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(568, __c71, 0) as any as S.Schema<AddUploadBufferInput>,
  output: __S(232, __c29, 0) as any as S.Schema<AddUploadBufferOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddUploadBuffer",
}));

export type AddWorkingStorageError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Configures one or more gateway local disks as working storage for a gateway. This
 * operation is only supported in the stored volume gateway type. This operation is deprecated
 * in cached volume API version 20120630. Use AddUploadBuffer
 * instead.
 *
 * Working storage is also referred to as upload buffer. You can also use the AddUploadBuffer operation to add upload buffer to a stored volume
 * gateway.
 *
 * In the request, you specify the gateway Amazon Resource Name (ARN) to which you want to
 * add working storage, and one or more disk IDs that you want to configure as working
 * storage.
 */
export const addWorkingStorage: API.OperationMethod<
  AddWorkingStorageInput,
  AddWorkingStorageOutput,
  AddWorkingStorageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(664, __c83, 0) as any as S.Schema<AddWorkingStorageInput>,
  output: __S(232, __c29, 0) as any as S.Schema<AddWorkingStorageOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddWorkingStorage",
}));

export type AssignTapePoolError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Assigns a tape to a tape pool for archiving. The tape assigned to a pool is archived in
 * the S3 storage class that is associated with the pool. When you use your backup application
 * to eject the tape, the tape is archived directly into the S3 storage class (S3 Glacier or
 * S3 Glacier Deep Archive) that corresponds to the pool.
 */
export const assignTapePool: API.OperationMethod<
  AssignTapePoolInput,
  AssignTapePoolOutput,
  AssignTapePoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(760, __c95, 0) as any as S.Schema<AssignTapePoolInput>,
  output: __S(768, __c96, 0) as any as S.Schema<AssignTapePoolOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssignTapePool",
}));

export type AssociateFileSystemError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Associate an Amazon FSx file system with the FSx File Gateway. After the
 * association process is complete, the file shares on the Amazon FSx file system are
 * available for access through the gateway. This operation only supports the FSx File Gateway
 * type.
 */
export const associateFileSystem: API.OperationMethod<
  AssociateFileSystemInput,
  AssociateFileSystemOutput,
  AssociateFileSystemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(856, __c107, 0) as any as S.Schema<AssociateFileSystemInput>,
  output: __S(880, __c110, 0) as any as S.Schema<AssociateFileSystemOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateFileSystem",
}));

export type AttachVolumeError = InternalServerError | InvalidGatewayRequestException | CommonErrors;
/**
 * Connects a volume to an iSCSI connection and then attaches the volume to the specified
 * gateway. Detaching and attaching a volume enables you to recover your data from one gateway
 * to a different gateway without creating a snapshot. It also makes it easier to move your
 * volumes from an on-premises gateway to a gateway hosted on an Amazon EC2 instance.
 */
export const attachVolume: API.OperationMethod<
  AttachVolumeInput,
  AttachVolumeOutput,
  AttachVolumeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8, __c1, 0) as any as S.Schema<AttachVolumeInput>,
  output: __S(16, __c2, 0) as any as S.Schema<AttachVolumeOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachVolume",
}));

export type CancelArchivalError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Cancels archiving of a virtual tape to the virtual tape shelf (VTS) after the archiving
 * process is initiated. This operation is only supported in the tape gateway type.
 */
export const cancelArchival: API.OperationMethod<
  CancelArchivalInput,
  CancelArchivalOutput,
  CancelArchivalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<CancelArchivalInput>,
  output: __S(768, __c96, 0) as any as S.Schema<CancelArchivalOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelArchival",
}));

export type CancelCacheReportError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Cancels generation of a specified cache report. You can use this operation to manually
 * cancel an IN-PROGRESS report for any reason. This action changes the report status from
 * IN-PROGRESS to CANCELLED. You can only cancel in-progress reports. If the the report you
 * attempt to cancel is in FAILED, ERROR, or COMPLETED state, the cancel operation returns an
 * error.
 */
export const cancelCacheReport: API.OperationMethod<
  CancelCacheReportInput,
  CancelCacheReportOutput,
  CancelCacheReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<CancelCacheReportInput>,
  output: __S(40, __c5, 0) as any as S.Schema<CancelCacheReportOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelCacheReport",
}));

export type CancelRetrievalError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Cancels retrieval of a virtual tape from the virtual tape shelf (VTS) to a gateway after
 * the retrieval process is initiated. The virtual tape is returned to the VTS. This operation
 * is only supported in the tape gateway type.
 */
export const cancelRetrieval: API.OperationMethod<
  CancelRetrievalInput,
  CancelRetrievalOutput,
  CancelRetrievalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<CancelRetrievalInput>,
  output: __S(768, __c96, 0) as any as S.Schema<CancelRetrievalOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelRetrieval",
}));

export type CreateCachediSCSIVolumeError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Creates a cached volume on a specified cached volume gateway. This operation is only
 * supported in the cached volume gateway type.
 *
 * Cache storage must be allocated to the gateway before you can create a cached volume.
 * Use the AddCache operation to add cache storage to a gateway.
 *
 * In the request, you must specify the gateway, size of the volume in bytes, the iSCSI
 * target name, an IP address on which to expose the target, and a unique client token. In
 * response, the gateway creates the volume and returns information about it. This information
 * includes the volume Amazon Resource Name (ARN), its size, and the iSCSI target ARN that
 * initiators can use to connect to the volume target.
 *
 * Optionally, you can provide the ARN for an existing volume as the
 * `SourceVolumeARN` for this cached volume, which creates an exact copy of the
 * existing volume's latest recovery point. The `VolumeSizeInBytes` value must be
 * equal to or larger than the size of the copied volume, in bytes.
 */
export const createCachediSCSIVolume: API.OperationMethod<
  CreateCachediSCSIVolumeInput,
  CreateCachediSCSIVolumeOutput,
  CreateCachediSCSIVolumeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<CreateCachediSCSIVolumeInput>,
  output: __S(16, __c2, 0) as any as S.Schema<CreateCachediSCSIVolumeOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCachediSCSIVolume",
}));

export type CreateNFSFileShareError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Creates a Network File System (NFS) file share on an existing S3 File Gateway. In
 * Storage Gateway, a file share is a file system mount point backed by Amazon S3
 * cloud storage. Storage Gateway exposes file shares using an NFS interface. This operation
 * is only supported for S3 File Gateways.
 *
 * S3 File gateway requires Security Token Service (Amazon Web Services STS) to be
 * activated to enable you to create a file share. Make sure Amazon Web Services STS is
 * activated in the Amazon Web Services Region you are creating your S3 File Gateway in. If
 * Amazon Web Services STS is not activated in the Amazon Web Services Region, activate
 * it. For information about how to activate Amazon Web Services STS, see Activating and
 * deactivating Amazon Web Services STS in an Amazon Web Services Region in the
 * *Identity and Access Management User Guide*.
 *
 * S3 File Gateways do not support creating hard or symbolic links on a file
 * share.
 */
export const createNFSFileShare: API.OperationMethod<
  CreateNFSFileShareInput,
  CreateNFSFileShareOutput,
  CreateNFSFileShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<CreateNFSFileShareInput>,
  output: __S(72, __c9, 0) as any as S.Schema<CreateNFSFileShareOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNFSFileShare",
}));

export type CreateSMBFileShareError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Creates a Server Message Block (SMB) file share on an existing S3 File Gateway. In
 * Storage Gateway, a file share is a file system mount point backed by Amazon S3
 * cloud storage. Storage Gateway exposes file shares using an SMB interface. This operation
 * is only supported for S3 File Gateways.
 *
 * S3 File Gateways require Security Token Service (Amazon Web Services STS) to be
 * activated to enable you to create a file share. Make sure that Amazon Web Services STS
 * is activated in the Amazon Web Services Region you are creating your S3 File Gateway in.
 * If Amazon Web Services STS is not activated in this Amazon Web Services Region, activate
 * it. For information about how to activate Amazon Web Services STS, see Activating and
 * deactivating Amazon Web Services STS in an Amazon Web Services Region in the
 * *Identity and Access Management User Guide*.
 *
 * File gateways don't support creating hard or symbolic links on a file
 * share.
 */
export const createSMBFileShare: API.OperationMethod<
  CreateSMBFileShareInput,
  CreateSMBFileShareOutput,
  CreateSMBFileShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<CreateSMBFileShareInput>,
  output: __S(72, __c9, 0) as any as S.Schema<CreateSMBFileShareOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSMBFileShare",
}));

export type CreateSnapshotError =
  | InternalServerError
  | InvalidGatewayRequestException
  | ServiceUnavailableError
  | CommonErrors;
/**
 * Initiates a snapshot of a volume.
 *
 * Storage Gateway provides the ability to back up point-in-time snapshots of your
 * data to Amazon Simple Storage (Amazon S3) for durable off-site recovery, and also
 * import the data to an Amazon Elastic Block Store (EBS) volume in Amazon Elastic Compute
 * Cloud (EC2). You can take snapshots of your gateway volume on a scheduled or ad hoc basis.
 * This API enables you to take an ad hoc snapshot. For more information, see Editing a
 * snapshot schedule.
 *
 * In the `CreateSnapshot` request, you identify the volume by providing its
 * Amazon Resource Name (ARN). You must also provide description for the snapshot. When
 * Storage Gateway takes the snapshot of specified volume, the snapshot and
 * description appears in the Storage Gateway console. In response, Storage Gateway
 * returns you a snapshot ID. You can use this snapshot ID to check the snapshot progress or
 * later use it when you want to create a volume from a snapshot. This operation is only
 * supported in stored and cached volume gateway type.
 *
 * To list or delete a snapshot, you must use the Amazon EC2 API. For more information,
 * see DescribeSnapshots
 * or DeleteSnapshot in the Amazon Elastic Compute Cloud API
 * Reference.
 *
 * Volume and snapshot IDs are changing to a longer length ID format. For more
 * information, see the important note on the Welcome page.
 */
export const createSnapshot: API.OperationMethod<
  CreateSnapshotInput,
  CreateSnapshotOutput,
  CreateSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<CreateSnapshotInput>,
  output: __S(97, __c12, 1) as any as S.Schema<CreateSnapshotOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException, ServiceUnavailableError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSnapshot",
}));

export type CreateSnapshotFromVolumeRecoveryPointError =
  | InternalServerError
  | InvalidGatewayRequestException
  | ServiceUnavailableError
  | CommonErrors;
/**
 * Initiates a snapshot of a gateway from a volume recovery point. This operation is only
 * supported in the cached volume gateway type.
 *
 * A volume recovery point is a point in time at which all data of the volume is consistent
 * and from which you can create a snapshot. To get a list of volume recovery point for cached
 * volume gateway, use ListVolumeRecoveryPoints.
 *
 * In the `CreateSnapshotFromVolumeRecoveryPoint` request, you identify the
 * volume by providing its Amazon Resource Name (ARN). You must also provide a description for
 * the snapshot. When the gateway takes a snapshot of the specified volume, the snapshot and
 * its description appear in the Storage Gateway console.
 * In response, the gateway returns
 * you a snapshot ID. You can use this snapshot ID to check the snapshot progress or later use
 * it when you want to create a volume from a snapshot.
 *
 * To list or delete a snapshot, you must use the Amazon EC2 API. For more information,
 * see DescribeSnapshots
 * or DeleteSnapshot in the Amazon Elastic Compute Cloud API
 * Reference.
 */
export const createSnapshotFromVolumeRecoveryPoint: API.OperationMethod<
  CreateSnapshotFromVolumeRecoveryPointInput,
  CreateSnapshotFromVolumeRecoveryPointOutput,
  CreateSnapshotFromVolumeRecoveryPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<CreateSnapshotFromVolumeRecoveryPointInput>,
  output: __S(105, __c13, 1) as any as S.Schema<CreateSnapshotFromVolumeRecoveryPointOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException, ServiceUnavailableError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSnapshotFromVolumeRecoveryPoint",
}));

export type CreateStorediSCSIVolumeError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Creates a volume on a specified gateway. This operation is only supported in the stored
 * volume gateway type.
 *
 * The size of the volume to create is inferred from the disk size. You can choose to
 * preserve existing data on the disk, create volume from an existing snapshot, or create an
 * empty volume. If you choose to create an empty gateway volume, then any existing data on
 * the disk is erased.
 *
 * In the request, you must specify the gateway and the disk information on which you are
 * creating the volume. In response, the gateway creates the volume and returns volume
 * information such as the volume Amazon Resource Name (ARN), its size, and the iSCSI target
 * ARN that initiators can use to connect to the volume target.
 */
export const createStorediSCSIVolume: API.OperationMethod<
  CreateStorediSCSIVolumeInput,
  CreateStorediSCSIVolumeOutput,
  CreateStorediSCSIVolumeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<CreateStorediSCSIVolumeInput>,
  output: __S(113, __c14, 1) as any as S.Schema<CreateStorediSCSIVolumeOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStorediSCSIVolume",
}));

export type CreateTapePoolError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Creates a new custom tape pool. You can use custom tape pool to enable tape retention
 * lock on tapes that are archived in the custom pool.
 */
export const createTapePool: API.OperationMethod<
  CreateTapePoolInput,
  CreateTapePoolOutput,
  CreateTapePoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<CreateTapePoolInput>,
  output: __S(128, __c16, 0) as any as S.Schema<CreateTapePoolOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTapePool",
}));

export type CreateTapesError = InternalServerError | InvalidGatewayRequestException | CommonErrors;
/**
 * Creates one or more virtual tapes. You write data to the virtual tapes and then archive
 * the tapes. This operation is only supported in the tape gateway type.
 *
 * Cache storage must be allocated to the gateway before you can create virtual tapes.
 * Use the AddCache operation to add cache storage to a gateway.
 */
export const createTapes: API.OperationMethod<
  CreateTapesInput,
  CreateTapesOutput,
  CreateTapesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<CreateTapesInput>,
  output: __S(137, __c17, 1) as any as S.Schema<CreateTapesOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTapes",
}));

export type CreateTapeWithBarcodeError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Creates a virtual tape by using your own barcode. You write data to the virtual tape and
 * then archive the tape. A barcode is unique and cannot be reused if it has already been used
 * on a tape. This applies to barcodes used on deleted tapes. This operation is only supported
 * in the tape gateway type.
 *
 * Cache storage must be allocated to the gateway before you can create a virtual tape.
 * Use the AddCache operation to add cache storage to a gateway.
 */
export const createTapeWithBarcode: API.OperationMethod<
  CreateTapeWithBarcodeInput,
  CreateTapeWithBarcodeOutput,
  CreateTapeWithBarcodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<CreateTapeWithBarcodeInput>,
  output: __S(768, __c96, 0) as any as S.Schema<CreateTapeWithBarcodeOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTapeWithBarcode",
}));

export type DeleteAutomaticTapeCreationPolicyError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Deletes the automatic tape creation policy of a gateway. If you delete this policy, new
 * virtual tapes must be created manually. Use the Amazon Resource Name (ARN) of the gateway
 * in your request to remove the policy.
 */
export const deleteAutomaticTapeCreationPolicy: API.OperationMethod<
  DeleteAutomaticTapeCreationPolicyInput,
  DeleteAutomaticTapeCreationPolicyOutput,
  DeleteAutomaticTapeCreationPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<DeleteAutomaticTapeCreationPolicyInput>,
  output: __S(232, __c29, 0) as any as S.Schema<DeleteAutomaticTapeCreationPolicyOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAutomaticTapeCreationPolicy",
}));

export type DeleteBandwidthRateLimitError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Deletes the bandwidth rate limits of a gateway. You can delete either the upload and
 * download bandwidth rate limit, or you can delete both. If you delete only one of the
 * limits, the other limit remains unchanged. To specify which gateway to work with, use the
 * Amazon Resource Name (ARN) of the gateway in your request. This operation is supported only
 * for the stored volume, cached volume, and tape gateway types.
 */
export const deleteBandwidthRateLimit: API.OperationMethod<
  DeleteBandwidthRateLimitInput,
  DeleteBandwidthRateLimitOutput,
  DeleteBandwidthRateLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<DeleteBandwidthRateLimitInput>,
  output: __S(232, __c29, 0) as any as S.Schema<DeleteBandwidthRateLimitOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBandwidthRateLimit",
}));

export type DeleteCacheReportError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Deletes the specified cache report and any associated tags from the Storage Gateway database. You can only delete completed reports. If the status of the
 * report you attempt to delete still IN-PROGRESS, the delete operation returns an error. You
 * can use `CancelCacheReport` to cancel an IN-PROGRESS report.
 *
 * `DeleteCacheReport` does not delete the report object from your Amazon S3 bucket.
 */
export const deleteCacheReport: API.OperationMethod<
  DeleteCacheReportInput,
  DeleteCacheReportOutput,
  DeleteCacheReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<DeleteCacheReportInput>,
  output: __S(40, __c5, 0) as any as S.Schema<DeleteCacheReportOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCacheReport",
}));

export type DeleteChapCredentialsError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Deletes Challenge-Handshake Authentication Protocol (CHAP) credentials for a specified
 * iSCSI target and initiator pair. This operation is supported in volume and tape gateway
 * types.
 */
export const deleteChapCredentials: API.OperationMethod<
  DeleteChapCredentialsInput,
  DeleteChapCredentialsOutput,
  DeleteChapCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<DeleteChapCredentialsInput>,
  output: __S(184, __c23, 0) as any as S.Schema<DeleteChapCredentialsOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChapCredentials",
}));

export type DeleteFileShareError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Deletes a file share from an S3 File Gateway. This operation is only supported for S3
 * File Gateways.
 */
export const deleteFileShare: API.OperationMethod<
  DeleteFileShareInput,
  DeleteFileShareOutput,
  DeleteFileShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<DeleteFileShareInput>,
  output: __S(72, __c9, 0) as any as S.Schema<DeleteFileShareOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFileShare",
}));

export type DeleteGatewayError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Deletes a gateway. To specify which gateway to delete, use the Amazon Resource Name
 * (ARN) of the gateway in your request. The operation deletes the gateway; however, it does
 * not delete the gateway virtual machine (VM) from your host computer.
 *
 * After you delete a gateway, you cannot reactivate it. Completed snapshots of the gateway
 * volumes are not deleted upon deleting the gateway, however, pending snapshots will not
 * complete. After you delete a gateway, your next step is to remove it from your
 * environment.
 *
 * You no longer pay software charges after the gateway is deleted; however, your
 * existing Amazon EBS snapshots persist and you will continue to be billed for these
 * snapshots. You can choose to remove all remaining Amazon EBS snapshots by canceling your
 * Amazon EC2 subscription.  If you prefer not to cancel your Amazon EC2 subscription, you
 * can delete your snapshots using the Amazon EC2 console. For more information, see the
 * Storage Gateway detail
 * page.
 */
export const deleteGateway: API.OperationMethod<
  DeleteGatewayInput,
  DeleteGatewayOutput,
  DeleteGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<DeleteGatewayInput>,
  output: __S(232, __c29, 0) as any as S.Schema<DeleteGatewayOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGateway",
}));

export type DeleteSnapshotScheduleError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Deletes a snapshot of a volume.
 *
 * You can take snapshots of your gateway volumes on a scheduled or ad hoc basis. This API
 * action enables you to delete a snapshot schedule for a volume. For more information, see
 * Backing up your
 * volumes. In the `DeleteSnapshotSchedule` request, you identify the
 * volume by providing its Amazon Resource Name (ARN). This operation is only supported for
 * cached volume gateway types.
 *
 * To list or delete a snapshot, you must use the Amazon EC2 API. For more information,
 * go to DescribeSnapshots
 * in the *Amazon Elastic Compute Cloud API Reference*.
 */
export const deleteSnapshotSchedule: API.OperationMethod<
  DeleteSnapshotScheduleInput,
  DeleteSnapshotScheduleOutput,
  DeleteSnapshotScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<DeleteSnapshotScheduleInput>,
  output: __S(216, __c27, 0) as any as S.Schema<DeleteSnapshotScheduleOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSnapshotSchedule",
}));

export type DeleteTapeError = InternalServerError | InvalidGatewayRequestException | CommonErrors;
/**
 * Deletes the specified virtual tape. This operation is only supported in the tape gateway
 * type.
 */
export const deleteTape: API.OperationMethod<
  DeleteTapeInput,
  DeleteTapeOutput,
  DeleteTapeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(248, __c31, 0) as any as S.Schema<DeleteTapeInput>,
  output: __S(768, __c96, 0) as any as S.Schema<DeleteTapeOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTape",
}));

export type DeleteTapeArchiveError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Deletes the specified virtual tape from the virtual tape shelf (VTS). This operation is
 * only supported in the tape gateway type.
 */
export const deleteTapeArchive: API.OperationMethod<
  DeleteTapeArchiveInput,
  DeleteTapeArchiveOutput,
  DeleteTapeArchiveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c32, 0) as any as S.Schema<DeleteTapeArchiveInput>,
  output: __S(768, __c96, 0) as any as S.Schema<DeleteTapeArchiveOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTapeArchive",
}));

export type DeleteTapePoolError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Delete a custom tape pool. A custom tape pool can only be deleted if there are no tapes
 * in the pool and if there are no automatic tape creation policies that reference the custom
 * tape pool.
 */
export const deleteTapePool: API.OperationMethod<
  DeleteTapePoolInput,
  DeleteTapePoolOutput,
  DeleteTapePoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(264, __c33, 0) as any as S.Schema<DeleteTapePoolInput>,
  output: __S(128, __c16, 0) as any as S.Schema<DeleteTapePoolOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTapePool",
}));

export type DeleteVolumeError = InternalServerError | InvalidGatewayRequestException | CommonErrors;
/**
 * Deletes the specified storage volume that you previously created using the CreateCachediSCSIVolume or CreateStorediSCSIVolume API.
 * This operation is only supported in the cached volume and stored volume types. For stored
 * volume gateways, the local disk that was configured as the storage volume is not deleted.
 * You can reuse the local disk to create another storage volume.
 *
 * Before you delete a volume, make sure there are no iSCSI connections to the volume you
 * are deleting. You should also make sure there is no snapshot in progress. You can use the
 * Amazon Elastic Compute Cloud (Amazon EC2) API to query snapshots on the volume you are
 * deleting and check the snapshot status. For more information, go to DescribeSnapshots in the Amazon Elastic Compute Cloud API
 * Reference.
 *
 * In the request, you must provide the Amazon Resource Name (ARN) of the storage volume
 * you want to delete.
 */
export const deleteVolume: API.OperationMethod<
  DeleteVolumeInput,
  DeleteVolumeOutput,
  DeleteVolumeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c34, 0) as any as S.Schema<DeleteVolumeInput>,
  output: __S(216, __c27, 0) as any as S.Schema<DeleteVolumeOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVolume",
}));

export type DescribeAvailabilityMonitorTestError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Returns information about the most recent high availability monitoring test that was
 * performed on the host in a cluster. If a test isn't performed, the status and start
 * time in the response would be null.
 */
export const describeAvailabilityMonitorTest: API.OperationMethod<
  DescribeAvailabilityMonitorTestInput,
  DescribeAvailabilityMonitorTestOutput,
  DescribeAvailabilityMonitorTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(280, __c35, 0) as any as S.Schema<DescribeAvailabilityMonitorTestInput>,
  output: __S(281, __c35, 1) as any as S.Schema<DescribeAvailabilityMonitorTestOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAvailabilityMonitorTest",
}));

export type DescribeBandwidthRateLimitError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Returns the bandwidth rate limits of a gateway. By default, these limits are not set,
 * which means no bandwidth rate limiting is in effect. This operation is supported only for
 * the stored volume, cached volume, and tape gateway types. To describe bandwidth rate limits
 * for S3 file gateways, use DescribeBandwidthRateLimitSchedule.
 *
 * This operation returns a value for a bandwidth rate limit only if the limit is set. If
 * no limits are set for the gateway, then this operation returns only the gateway ARN in the
 * response body. To specify which gateway to describe, use the Amazon Resource Name (ARN) of
 * the gateway in your request.
 */
export const describeBandwidthRateLimit: API.OperationMethod<
  DescribeBandwidthRateLimitInput,
  DescribeBandwidthRateLimitOutput,
  DescribeBandwidthRateLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c36, 0) as any as S.Schema<DescribeBandwidthRateLimitInput>,
  output: __S(289, __c36, 1) as any as S.Schema<DescribeBandwidthRateLimitOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBandwidthRateLimit",
}));

export type DescribeBandwidthRateLimitScheduleError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Returns information about the bandwidth rate limit schedule of a gateway. By default,
 * gateways do not have bandwidth rate limit schedules, which means no bandwidth rate limiting
 * is in effect. This operation is supported only for volume, tape and S3 file gateways. FSx
 * file gateways do not support bandwidth rate limits.
 *
 * This operation returns information about a gateway's bandwidth rate limit schedule. A
 * bandwidth rate limit schedule consists of one or more bandwidth rate limit intervals. A
 * bandwidth rate limit interval defines a period of time on one or more days of the week,
 * during which bandwidth rate limits are specified for uploading, downloading, or both.
 *
 * A bandwidth rate limit interval consists of one or more days of the week, a start hour
 * and minute, an ending hour and minute, and bandwidth rate limits for uploading and
 * downloading
 *
 * If no bandwidth rate limit schedule intervals are set for the gateway, this operation
 * returns an empty response. To specify which gateway to describe, use the Amazon Resource
 * Name (ARN) of the gateway in your request.
 */
export const describeBandwidthRateLimitSchedule: API.OperationMethod<
  DescribeBandwidthRateLimitScheduleInput,
  DescribeBandwidthRateLimitScheduleOutput,
  DescribeBandwidthRateLimitScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(296, __c37, 0) as any as S.Schema<DescribeBandwidthRateLimitScheduleInput>,
  output: __S(297, __c37, 1) as any as S.Schema<DescribeBandwidthRateLimitScheduleOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBandwidthRateLimitSchedule",
}));

export type DescribeCacheError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Returns information about the cache of a gateway. This operation is only supported in
 * the cached volume, tape, and file gateway types.
 *
 * The response includes disk IDs that are configured as cache, and it includes the amount
 * of cache allocated and used.
 */
export const describeCache: API.OperationMethod<
  DescribeCacheInput,
  DescribeCacheOutput,
  DescribeCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(312, __c39, 0) as any as S.Schema<DescribeCacheInput>,
  output: __S(313, __c39, 1) as any as S.Schema<DescribeCacheOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCache",
}));

export type DescribeCachediSCSIVolumesError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Returns a description of the gateway volumes specified in the request. This operation is
 * only supported in the cached volume gateway types.
 *
 * The list of gateway volumes in the request must be from one gateway. In the response,
 * Storage Gateway returns volume information sorted by volume Amazon Resource Name
 * (ARN).
 */
export const describeCachediSCSIVolumes: API.OperationMethod<
  DescribeCachediSCSIVolumesInput,
  DescribeCachediSCSIVolumesOutput,
  DescribeCachediSCSIVolumesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c40, 0) as any as S.Schema<DescribeCachediSCSIVolumesInput>,
  output: __S(323, __c40, 3) as any as S.Schema<DescribeCachediSCSIVolumesOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCachediSCSIVolumes",
}));

export type DescribeCacheReportError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Returns information about the specified cache report, including completion status and
 * generation progress.
 */
export const describeCacheReport: API.OperationMethod<
  DescribeCacheReportInput,
  DescribeCacheReportOutput,
  DescribeCacheReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c42, 0) as any as S.Schema<DescribeCacheReportInput>,
  output: __S(337, __c42, 1) as any as S.Schema<DescribeCacheReportOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCacheReport",
}));

export type DescribeChapCredentialsError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Returns an array of Challenge-Handshake Authentication Protocol (CHAP) credentials
 * information for a specified iSCSI target, one for each target-initiator pair. This
 * operation is supported in the volume and tape gateway types.
 */
export const describeChapCredentials: API.OperationMethod<
  DescribeChapCredentialsInput,
  DescribeChapCredentialsOutput,
  DescribeChapCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(376, __c47, 0) as any as S.Schema<DescribeChapCredentialsInput>,
  output: __S(379, __c47, 3) as any as S.Schema<DescribeChapCredentialsOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeChapCredentials",
}));

export type DescribeFileSystemAssociationsError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Gets the file system association information. This operation is only supported for FSx
 * File Gateways.
 */
export const describeFileSystemAssociations: API.OperationMethod<
  DescribeFileSystemAssociationsInput,
  DescribeFileSystemAssociationsOutput,
  DescribeFileSystemAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c48, 0) as any as S.Schema<DescribeFileSystemAssociationsInput>,
  output: __S(389, __c48, 5) as any as S.Schema<DescribeFileSystemAssociationsOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFileSystemAssociations",
}));

export type DescribeGatewayInformationError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Returns metadata about a gateway such as its name, network interfaces, time zone,
 * status, and software version. To specify which gateway to describe, use the Amazon Resource
 * Name (ARN) of the gateway in your request.
 */
export const describeGatewayInformation: API.OperationMethod<
  DescribeGatewayInformationInput,
  DescribeGatewayInformationOutput,
  DescribeGatewayInformationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(392, __c49, 0) as any as S.Schema<DescribeGatewayInformationInput>,
  output: __S(396, __c49, 4) as any as S.Schema<DescribeGatewayInformationOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGatewayInformation",
}));

export type DescribeMaintenanceStartTimeError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Returns your gateway's maintenance window schedule information, with values for
 * monthly or weekly cadence, specific day and time to begin maintenance, and which types of
 * updates to apply. Time values returned are for the gateway's time zone.
 */
export const describeMaintenanceStartTime: API.OperationMethod<
  DescribeMaintenanceStartTimeInput,
  DescribeMaintenanceStartTimeOutput,
  DescribeMaintenanceStartTimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c50, 0) as any as S.Schema<DescribeMaintenanceStartTimeInput>,
  output: __S(401, __c50, 1) as any as S.Schema<DescribeMaintenanceStartTimeOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMaintenanceStartTime",
}));

export type DescribeNFSFileSharesError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Gets a description for one or more Network File System (NFS) file shares from an S3 File
 * Gateway. This operation is only supported for S3 File Gateways.
 */
export const describeNFSFileShares: API.OperationMethod<
  DescribeNFSFileSharesInput,
  DescribeNFSFileSharesOutput,
  DescribeNFSFileSharesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c52, 0) as any as S.Schema<DescribeNFSFileSharesInput>,
  output: __S(419, __c52, 3) as any as S.Schema<DescribeNFSFileSharesOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNFSFileShares",
}));

export type DescribeSMBFileSharesError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Gets a description for one or more Server Message Block (SMB) file shares from a S3 File
 * Gateway. This operation is only supported for S3 File Gateways.
 */
export const describeSMBFileShares: API.OperationMethod<
  DescribeSMBFileSharesInput,
  DescribeSMBFileSharesOutput,
  DescribeSMBFileSharesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(424, __c53, 0) as any as S.Schema<DescribeSMBFileSharesInput>,
  output: __S(427, __c53, 3) as any as S.Schema<DescribeSMBFileSharesOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSMBFileShares",
}));

export type DescribeSMBSettingsError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Gets a description of a Server Message Block (SMB) file share settings from a file
 * gateway. This operation is only supported for file gateways.
 */
export const describeSMBSettings: API.OperationMethod<
  DescribeSMBSettingsInput,
  DescribeSMBSettingsOutput,
  DescribeSMBSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c54, 0) as any as S.Schema<DescribeSMBSettingsInput>,
  output: __S(433, __c54, 1) as any as S.Schema<DescribeSMBSettingsOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSMBSettings",
}));

export type DescribeSnapshotScheduleError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Describes the snapshot schedule for the specified gateway volume. The snapshot schedule
 * information includes intervals at which snapshots are automatically initiated on the
 * volume. This operation is only supported in the cached volume and stored volume
 * types.
 */
export const describeSnapshotSchedule: API.OperationMethod<
  DescribeSnapshotScheduleInput,
  DescribeSnapshotScheduleOutput,
  DescribeSnapshotScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c56, 0) as any as S.Schema<DescribeSnapshotScheduleInput>,
  output: __S(449, __c56, 1) as any as S.Schema<DescribeSnapshotScheduleOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSnapshotSchedule",
}));

export type DescribeStorediSCSIVolumesError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Returns the description of the gateway volumes specified in the request. The list of
 * gateway volumes in the request must be from one gateway. In the response, Storage Gateway returns volume information sorted by volume ARNs. This operation is only
 * supported in stored volume gateway type.
 */
export const describeStorediSCSIVolumes: API.OperationMethod<
  DescribeStorediSCSIVolumesInput,
  DescribeStorediSCSIVolumesOutput,
  DescribeStorediSCSIVolumesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(456, __c57, 0) as any as S.Schema<DescribeStorediSCSIVolumesInput>,
  output: __S(459, __c57, 3) as any as S.Schema<DescribeStorediSCSIVolumesOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStorediSCSIVolumes",
}));

export type DescribeTapeArchivesError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Returns a description of specified virtual tapes in the virtual tape shelf (VTS). This
 * operation is only supported in the tape gateway type.
 *
 * If a specific `TapeARN` is not specified, Storage Gateway returns a
 * description of all virtual tapes found in the VTS associated with your account.
 */
export const describeTapeArchives: API.PaginatedOperationMethod<
  DescribeTapeArchivesInput,
  DescribeTapeArchivesOutput,
  DescribeTapeArchivesError,
  Credentials | HttpClient.HttpClient,
  TapeArchive
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(464, __c58, 0) as any as S.Schema<DescribeTapeArchivesInput>,
  output: __S(467, __c58, 3) as any as S.Schema<DescribeTapeArchivesOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTapeArchives",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "TapeArchives",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeTapeRecoveryPointsError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Returns a list of virtual tape recovery points that are available for the specified tape
 * gateway.
 *
 * A recovery point is a point-in-time view of a virtual tape at which all the data on the
 * virtual tape is consistent. If your gateway crashes, virtual tapes that have recovery
 * points can be recovered to a new gateway. This operation is only supported in the tape
 * gateway type.
 */
export const describeTapeRecoveryPoints: API.PaginatedOperationMethod<
  DescribeTapeRecoveryPointsInput,
  DescribeTapeRecoveryPointsOutput,
  DescribeTapeRecoveryPointsError,
  Credentials | HttpClient.HttpClient,
  TapeRecoveryPointInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(488, __c61, 0) as any as S.Schema<DescribeTapeRecoveryPointsInput>,
  output: __S(491, __c61, 3) as any as S.Schema<DescribeTapeRecoveryPointsOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTapeRecoveryPoints",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "TapeRecoveryPointInfos",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeTapesError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Returns a description of virtual tapes that correspond to the specified Amazon Resource
 * Names (ARNs). If `TapeARN` is not specified, returns a description of the
 * virtual tapes associated with the specified gateway. This operation is only supported for
 * the tape gateway type.
 *
 * The operation supports pagination. By default, the operation returns a maximum of up to
 * 100 tapes. You can optionally specify the `Limit` field in the body to limit the
 * number of tapes in the response. If the number of tapes returned in the response is
 * truncated, the response includes a `Marker` field. You can use this
 * `Marker` value in your subsequent request to retrieve the next set of
 * tapes.
 */
export const describeTapes: API.PaginatedOperationMethod<
  DescribeTapesInput,
  DescribeTapesOutput,
  DescribeTapesError,
  Credentials | HttpClient.HttpClient,
  Tape
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(496, __c62, 0) as any as S.Schema<DescribeTapesInput>,
  output: __S(499, __c62, 3) as any as S.Schema<DescribeTapesOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTapes",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Tapes",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeUploadBufferError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Returns information about the upload buffer of a gateway. This operation is supported
 * for the stored volume, cached volume, and tape gateway types.
 *
 * The response includes disk IDs that are configured as upload buffer space, and it
 * includes the amount of upload buffer space allocated and used.
 */
export const describeUploadBuffer: API.OperationMethod<
  DescribeUploadBufferInput,
  DescribeUploadBufferOutput,
  DescribeUploadBufferError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(504, __c63, 0) as any as S.Schema<DescribeUploadBufferInput>,
  output: __S(505, __c63, 1) as any as S.Schema<DescribeUploadBufferOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUploadBuffer",
}));

export type DescribeVTLDevicesError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Returns a description of virtual tape library (VTL) devices for the specified tape
 * gateway. In the response, Storage Gateway returns VTL device information.
 *
 * This operation is only supported in the tape gateway type.
 */
export const describeVTLDevices: API.PaginatedOperationMethod<
  DescribeVTLDevicesInput,
  DescribeVTLDevicesOutput,
  DescribeVTLDevicesError,
  Credentials | HttpClient.HttpClient,
  VTLDevice
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(512, __c64, 0) as any as S.Schema<DescribeVTLDevicesInput>,
  output: __S(516, __c64, 4) as any as S.Schema<DescribeVTLDevicesOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVTLDevices",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "VTLDevices",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeWorkingStorageError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Returns information about the working storage of a gateway. This operation is only
 * supported in the stored volumes gateway type. This operation is deprecated in cached
 * volumes API version (20120630). Use DescribeUploadBuffer instead.
 *
 * Working storage is also referred to as upload buffer. You can also use the
 * DescribeUploadBuffer operation to add upload buffer to a stored volume gateway.
 *
 * The response includes disk IDs that are configured as working storage, and it includes
 * the amount of working storage allocated and used.
 */
export const describeWorkingStorage: API.OperationMethod<
  DescribeWorkingStorageInput,
  DescribeWorkingStorageOutput,
  DescribeWorkingStorageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(520, __c65, 0) as any as S.Schema<DescribeWorkingStorageInput>,
  output: __S(521, __c65, 1) as any as S.Schema<DescribeWorkingStorageOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkingStorage",
}));

export type DetachVolumeError = InternalServerError | InvalidGatewayRequestException | CommonErrors;
/**
 * Disconnects a volume from an iSCSI connection and then detaches the volume from the
 * specified gateway. Detaching and attaching a volume enables you to recover your data from
 * one gateway to a different gateway without creating a snapshot. It also makes it easier to
 * move your volumes from an on-premises gateway to a gateway hosted on an Amazon EC2
 * instance. This operation is only supported in the volume gateway type.
 */
export const detachVolume: API.OperationMethod<
  DetachVolumeInput,
  DetachVolumeOutput,
  DetachVolumeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(528, __c66, 0) as any as S.Schema<DetachVolumeInput>,
  output: __S(216, __c27, 0) as any as S.Schema<DetachVolumeOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachVolume",
}));

export type DisableGatewayError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Disables a tape gateway when the gateway is no longer functioning. For example, if your
 * gateway VM is damaged, you can disable the gateway so you can recover virtual tapes.
 *
 * Use this operation for a tape gateway that is not reachable or not functioning. This
 * operation is only supported in the tape gateway type.
 *
 * After a gateway is disabled, it cannot be enabled.
 */
export const disableGateway: API.OperationMethod<
  DisableGatewayInput,
  DisableGatewayOutput,
  DisableGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(536, __c67, 0) as any as S.Schema<DisableGatewayInput>,
  output: __S(232, __c29, 0) as any as S.Schema<DisableGatewayOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableGateway",
}));

export type DisassociateFileSystemError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Disassociates an Amazon FSx file system from the specified gateway. After the
 * disassociation process finishes, the gateway can no longer access the Amazon FSx
 * file system. This operation is only supported in the FSx File Gateway type.
 */
export const disassociateFileSystem: API.OperationMethod<
  DisassociateFileSystemInput,
  DisassociateFileSystemOutput,
  DisassociateFileSystemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c68, 0) as any as S.Schema<DisassociateFileSystemInput>,
  output: __S(880, __c110, 0) as any as S.Schema<DisassociateFileSystemOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFileSystem",
}));

export type EvictFilesFailingUploadError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Starts a process that cleans the specified file share's cache of file entries that are
 * failing upload to Amazon S3. This API operation reports success if the request is
 * received with valid arguments, and there are no other cache clean operations currently
 * in-progress for the specified file share. After a successful request, the cache clean
 * operation occurs asynchronously and reports progress using CloudWatch logs and
 * notifications.
 *
 * If `ForceRemove` is set to `True`, the cache clean operation
 * will delete file data from the gateway which might otherwise be recoverable. We
 * recommend using this operation only after all other methods to clear files failing
 * upload have been exhausted, and if your business need outweighs the potential data
 * loss.
 */
export const evictFilesFailingUpload: API.OperationMethod<
  EvictFilesFailingUploadInput,
  EvictFilesFailingUploadOutput,
  EvictFilesFailingUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(552, __c69, 0) as any as S.Schema<EvictFilesFailingUploadInput>,
  output: __S(553, __c69, 1) as any as S.Schema<EvictFilesFailingUploadOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EvictFilesFailingUpload",
}));

export type JoinDomainError = InternalServerError | InvalidGatewayRequestException | CommonErrors;
/**
 * Adds a file gateway to an Active Directory domain. This operation is only supported for
 * file gateways that support the SMB file protocol.
 *
 * Joining a domain creates an Active Directory computer account in the default
 * organizational unit, using the gateway's **Gateway ID** as
 * the account name (for example, SGW-1234ADE). If your Active Directory environment
 * requires that you pre-stage accounts to facilitate the join domain process, you will
 * need to create this account ahead of time.
 *
 * To create the gateway's computer account in an organizational unit other than the
 * default, you must specify the organizational unit when joining the domain.
 */
export const joinDomain: API.OperationMethod<
  JoinDomainInput,
  JoinDomainOutput,
  JoinDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c70, 0) as any as S.Schema<JoinDomainInput>,
  output: __S(561, __c70, 1) as any as S.Schema<JoinDomainOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "JoinDomain",
}));

export type ListAutomaticTapeCreationPoliciesError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Lists the automatic tape creation policies for a gateway. If there are no automatic tape
 * creation policies for the gateway, it returns an empty list.
 *
 * This operation is only supported for tape gateways.
 */
export const listAutomaticTapeCreationPolicies: API.OperationMethod<
  ListAutomaticTapeCreationPoliciesInput,
  ListAutomaticTapeCreationPoliciesOutput,
  ListAutomaticTapeCreationPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c72, 0) as any as S.Schema<ListAutomaticTapeCreationPoliciesInput>,
  output: __S(579, __c72, 3) as any as S.Schema<ListAutomaticTapeCreationPoliciesOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutomaticTapeCreationPolicies",
}));

export type ListCacheReportsError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Returns a list of existing cache reports for all file shares associated with your
 * Amazon Web Services account. This list includes all information provided by the
 * `DescribeCacheReport` action, such as report name, status, completion
 * progress, start time, end time, filters, and tags.
 */
export const listCacheReports: API.PaginatedOperationMethod<
  ListCacheReportsInput,
  ListCacheReportsOutput,
  ListCacheReportsError,
  Credentials | HttpClient.HttpClient,
  CacheReportInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(592, __c74, 0) as any as S.Schema<ListCacheReportsInput>,
  output: __S(594, __c74, 2) as any as S.Schema<ListCacheReportsOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCacheReports",
  pagination: { inputToken: "Marker", outputToken: "Marker", items: "CacheReportList" } as const,
})) as any;

export type ListFileSharesError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Gets a list of the file shares for a specific S3 File Gateway, or the list of file
 * shares that belong to the calling Amazon Web Services account. This operation is only
 * supported for S3 File Gateways.
 */
export const listFileShares: API.PaginatedOperationMethod<
  ListFileSharesInput,
  ListFileSharesOutput,
  ListFileSharesError,
  Credentials | HttpClient.HttpClient,
  FileShareInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(600, __c75, 0) as any as S.Schema<ListFileSharesInput>,
  output: __S(603, __c75, 3) as any as S.Schema<ListFileSharesOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFileShares",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "FileShareInfoList",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListFileSystemAssociationsError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Gets a list of `FileSystemAssociationSummary` objects. Each object contains a
 * summary of a file system association. This operation is only supported for FSx File
 * Gateways.
 */
export const listFileSystemAssociations: API.PaginatedOperationMethod<
  ListFileSystemAssociationsInput,
  ListFileSystemAssociationsOutput,
  ListFileSystemAssociationsError,
  Credentials | HttpClient.HttpClient,
  FileSystemAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(608, __c76, 0) as any as S.Schema<ListFileSystemAssociationsInput>,
  output: __S(611, __c76, 3) as any as S.Schema<ListFileSystemAssociationsOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFileSystemAssociations",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "FileSystemAssociationSummaryList",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListGatewaysError = InternalServerError | InvalidGatewayRequestException | CommonErrors;
/**
 * Lists gateways owned by an Amazon Web Services account in an Amazon Web Services Region
 * specified in the request. The returned list is ordered by gateway Amazon Resource Name
 * (ARN).
 *
 * By default, the operation returns a maximum of 100 gateways. This operation supports
 * pagination that allows you to optionally reduce the number of gateways returned in a
 * response.
 *
 * If you have more gateways than are returned in a response (that is, the response returns
 * only a truncated list of your gateways), the response contains a marker that you can
 * specify in your next request to fetch the next page of gateways.
 */
export const listGateways: API.PaginatedOperationMethod<
  ListGatewaysInput,
  ListGatewaysOutput,
  ListGatewaysError,
  Credentials | HttpClient.HttpClient,
  GatewayInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(616, __c77, 0) as any as S.Schema<ListGatewaysInput>,
  output: __S(619, __c77, 3) as any as S.Schema<ListGatewaysOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGateways",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Gateways",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListLocalDisksError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Returns a list of the gateway's local disks. To specify which gateway to describe,
 * you use the Amazon Resource Name (ARN) of the gateway in the body of the request.
 *
 * The request returns a list of all disks, specifying which are configured as working
 * storage, cache storage, or stored volume or not configured at all. The response includes a
 * `DiskStatus` field. This field can have a value of present (the disk is
 * available to use), missing (the disk is no longer connected to the gateway), or mismatch
 * (the disk node is occupied by a disk that has incorrect metadata or the disk content is
 * corrupted).
 */
export const listLocalDisks: API.OperationMethod<
  ListLocalDisksInput,
  ListLocalDisksOutput,
  ListLocalDisksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c78, 0) as any as S.Schema<ListLocalDisksInput>,
  output: __S(627, __c78, 3) as any as S.Schema<ListLocalDisksOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLocalDisks",
}));

export type ListTagsForResourceError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Lists the tags that have been added to the specified resource. This operation is
 * supported in storage gateways of all types.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(632, __c79, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(633, __c79, 1) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Tags",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListTapePoolsError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Lists custom tape pools. You specify custom tape pools to list by specifying one or more
 * custom tape pool Amazon Resource Names (ARNs). If you don't specify a custom tape pool ARN,
 * the operation lists all custom tape pools.
 *
 * This operation supports pagination. You can optionally specify the `Limit`
 * parameter in the body to limit the number of tape pools in the response. If the number of
 * tape pools returned in the response is truncated, the response includes a
 * `Marker` element that you can use in your subsequent request to retrieve the
 * next set of tape pools.
 */
export const listTapePools: API.PaginatedOperationMethod<
  ListTapePoolsInput,
  ListTapePoolsOutput,
  ListTapePoolsError,
  Credentials | HttpClient.HttpClient,
  PoolInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(640, __c80, 0) as any as S.Schema<ListTapePoolsInput>,
  output: __S(643, __c80, 3) as any as S.Schema<ListTapePoolsOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTapePools",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "PoolInfos",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListTapesError = InternalServerError | InvalidGatewayRequestException | CommonErrors;
/**
 * Lists virtual tapes in your virtual tape library (VTL) and your virtual tape shelf
 * (VTS). You specify the tapes to list by specifying one or more tape Amazon Resource Names
 * (ARNs). If you don't specify a tape ARN, the operation lists all virtual tapes in both
 * your VTL and VTS.
 *
 * This operation supports pagination. By default, the operation returns a maximum of up to
 * 100 tapes. You can optionally specify the `Limit` parameter in the body to limit
 * the number of tapes in the response. If the number of tapes returned in the response is
 * truncated, the response includes a `Marker` element that you can use in your
 * subsequent request to retrieve the next set of tapes. This operation is only supported in
 * the tape gateway type.
 */
export const listTapes: API.PaginatedOperationMethod<
  ListTapesInput,
  ListTapesOutput,
  ListTapesError,
  Credentials | HttpClient.HttpClient,
  TapeInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(648, __c81, 0) as any as S.Schema<ListTapesInput>,
  output: __S(651, __c81, 3) as any as S.Schema<ListTapesOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTapes",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "TapeInfos",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListVolumeInitiatorsError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Lists iSCSI initiators that are connected to a volume. You can use this operation to
 * determine whether a volume is being used or not. This operation is only supported in the
 * cached volume and stored volume gateway types.
 */
export const listVolumeInitiators: API.OperationMethod<
  ListVolumeInitiatorsInput,
  ListVolumeInitiatorsOutput,
  ListVolumeInitiatorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c82, 0) as any as S.Schema<ListVolumeInitiatorsInput>,
  output: __S(657, __c82, 1) as any as S.Schema<ListVolumeInitiatorsOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVolumeInitiators",
}));

export type ListVolumeRecoveryPointsError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Lists the recovery points for a specified gateway. This operation is only supported in
 * the cached volume gateway type.
 *
 * Each cache volume has one recovery point. A volume recovery point is a point in time at
 * which all data of the volume is consistent and from which you can create a snapshot or
 * clone a new cached volume from a source volume. To create a snapshot from a volume recovery
 * point use the CreateSnapshotFromVolumeRecoveryPoint operation.
 */
export const listVolumeRecoveryPoints: API.OperationMethod<
  ListVolumeRecoveryPointsInput,
  ListVolumeRecoveryPointsOutput,
  ListVolumeRecoveryPointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c84, 0) as any as S.Schema<ListVolumeRecoveryPointsInput>,
  output: __S(675, __c84, 3) as any as S.Schema<ListVolumeRecoveryPointsOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVolumeRecoveryPoints",
}));

export type ListVolumesError = InternalServerError | InvalidGatewayRequestException | CommonErrors;
/**
 * Lists the iSCSI stored volumes of a gateway. Results are sorted by volume ARN. The
 * response includes only the volume ARNs. If you want additional volume information, use the
 * DescribeStorediSCSIVolumes or the DescribeCachediSCSIVolumes API.
 *
 * The operation supports pagination. By default, the operation returns a maximum of up to
 * 100 volumes. You can optionally specify the `Limit` field in the body to limit
 * the number of volumes in the response. If the number of volumes returned in the response is
 * truncated, the response includes a Marker field. You can use this Marker value in your
 * subsequent request to retrieve the next set of volumes. This operation is only supported in
 * the cached volume and stored volume gateway types.
 */
export const listVolumes: API.PaginatedOperationMethod<
  ListVolumesInput,
  ListVolumesOutput,
  ListVolumesError,
  Credentials | HttpClient.HttpClient,
  VolumeInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(680, __c85, 0) as any as S.Schema<ListVolumesInput>,
  output: __S(683, __c85, 3) as any as S.Schema<ListVolumesOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVolumes",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "VolumeInfos",
    pageSize: "Limit",
  } as const,
})) as any;

export type NotifyWhenUploadedError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Sends you notification through Amazon EventBridge when all files written to your file
 * share have been uploaded to Amazon S3.
 *
 * Storage Gateway can send a notification through Amazon EventBridge when all
 * files written to your file share up to that point in time have been uploaded to Amazon S3. These files include files written to the file share up to the time that you
 * make a request for notification. When the upload is done, Storage Gateway sends you
 * notification through EventBridge. You can configure EventBridge to send the
 * notification through event targets such as Amazon SNS or Lambda
 * function. This operation is only supported for S3 File Gateways.
 *
 * For more information, see Getting
 * file upload notification in the Amazon S3 File Gateway User
 * Guide.
 */
export const notifyWhenUploaded: API.OperationMethod<
  NotifyWhenUploadedInput,
  NotifyWhenUploadedOutput,
  NotifyWhenUploadedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c86, 0) as any as S.Schema<NotifyWhenUploadedInput>,
  output: __S(696, __c87, 0) as any as S.Schema<NotifyWhenUploadedOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "NotifyWhenUploaded",
}));

export type RefreshCacheError = InternalServerError | InvalidGatewayRequestException | CommonErrors;
/**
 * Refreshes the cached inventory of objects for the specified file share. This operation
 * finds objects in the Amazon S3 bucket that were added, removed, or replaced since
 * the gateway last listed the bucket's contents and cached the results. This operation
 * does not import files into the S3 File Gateway cache storage. It only updates the cached
 * inventory to reflect changes in the inventory of the objects in the S3 bucket. This
 * operation is only supported in the S3 File Gateway types.
 *
 * You can subscribe to be notified through an Amazon CloudWatch event when your
 * `RefreshCache` operation completes. For more information, see Getting
 * notified about file operations in the Amazon S3 File Gateway User
 * Guide. This operation is Only supported for S3 File Gateways.
 *
 * When this API is called, it only initiates the refresh operation. When the API call
 * completes and returns a success code, it doesn't necessarily mean that the file
 * refresh has completed. You should use the refresh-complete notification to determine that
 * the operation has completed before you check for new files on the gateway file share. You
 * can subscribe to be notified through a CloudWatch event when your `RefreshCache`
 * operation completes.
 *
 * Throttle limit: This API is asynchronous, so the gateway will accept no more than two
 * refreshes at any time. We recommend using the refresh-complete CloudWatch event
 * notification before issuing additional requests. For more information, see Getting
 * notified about file operations in the Amazon S3 File Gateway User
 * Guide.
 *
 * - Wait at least 60 seconds between consecutive RefreshCache API requests.
 *
 * - If you invoke the RefreshCache API when two requests are already being
 * processed, any new request will cause an
 * `InvalidGatewayRequestException` error because too many requests
 * were sent to the server.
 *
 * The S3 bucket name does not need to be included when entering the list of folders in
 * the FolderList parameter.
 *
 * For more information, see Getting
 * notified about file operations in the Amazon S3 File Gateway User
 * Guide.
 */
export const refreshCache: API.OperationMethod<
  RefreshCacheInput,
  RefreshCacheOutput,
  RefreshCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c88, 0) as any as S.Schema<RefreshCacheInput>,
  output: __S(696, __c87, 0) as any as S.Schema<RefreshCacheOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RefreshCache",
}));

export type RemoveTagsFromResourceError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Removes one or more tags from the specified resource. This operation is supported in
 * storage gateways of all types.
 */
export const removeTagsFromResource: API.OperationMethod<
  RemoveTagsFromResourceInput,
  RemoveTagsFromResourceOutput,
  RemoveTagsFromResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(712, __c89, 0) as any as S.Schema<RemoveTagsFromResourceInput>,
  output: __S(480, __c60, 0) as any as S.Schema<RemoveTagsFromResourceOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTagsFromResource",
}));

export type ResetCacheError = InternalServerError | InvalidGatewayRequestException | CommonErrors;
/**
 * Resets all cache disks that have encountered an error and makes the disks available for
 * reconfiguration as cache storage. If your cache disk encounters an error, the gateway
 * prevents read and write operations on virtual tapes in the gateway. For example, an error
 * can occur when a disk is corrupted or removed from the gateway. When a cache is reset, the
 * gateway loses its cache storage. At this point, you can reconfigure the disks as cache
 * disks. This operation is only supported in the cached volume and tape types.
 *
 * If the cache disk you are resetting contains data that has not been uploaded to
 * Amazon S3 yet, that data can be lost. After you reset cache disks, there will
 * be no configured cache disks left in the gateway, so you must configure at least one new
 * cache disk for your gateway to function properly.
 */
export const resetCache: API.OperationMethod<
  ResetCacheInput,
  ResetCacheOutput,
  ResetCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c90, 0) as any as S.Schema<ResetCacheInput>,
  output: __S(232, __c29, 0) as any as S.Schema<ResetCacheOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetCache",
}));

export type RetrieveTapeArchiveError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Retrieves an archived virtual tape from the virtual tape shelf (VTS) to a tape gateway.
 * Virtual tapes archived in the VTS are not associated with any gateway. However after a tape
 * is retrieved, it is associated with a gateway, even though it is also listed in the VTS,
 * that is, archive. This operation is only supported in the tape gateway type.
 *
 * Once a tape is successfully retrieved to a gateway, it cannot be retrieved again to
 * another gateway. You must archive the tape again before you can retrieve it to another
 * gateway. This operation is only supported in the tape gateway type.
 */
export const retrieveTapeArchive: API.OperationMethod<
  RetrieveTapeArchiveInput,
  RetrieveTapeArchiveOutput,
  RetrieveTapeArchiveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(728, __c91, 0) as any as S.Schema<RetrieveTapeArchiveInput>,
  output: __S(768, __c96, 0) as any as S.Schema<RetrieveTapeArchiveOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RetrieveTapeArchive",
}));

export type RetrieveTapeRecoveryPointError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Retrieves the recovery point for the specified virtual tape. This operation is only
 * supported in the tape gateway type.
 *
 * A recovery point is a point in time view of a virtual tape at which all the data on the
 * tape is consistent. If your gateway crashes, virtual tapes that have recovery points can be
 * recovered to a new gateway.
 *
 * The virtual tape can be retrieved to only one gateway. The retrieved tape is
 * read-only. The virtual tape can be retrieved to only a tape gateway. There is no charge
 * for retrieving recovery points.
 */
export const retrieveTapeRecoveryPoint: API.OperationMethod<
  RetrieveTapeRecoveryPointInput,
  RetrieveTapeRecoveryPointOutput,
  RetrieveTapeRecoveryPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c92, 0) as any as S.Schema<RetrieveTapeRecoveryPointInput>,
  output: __S(768, __c96, 0) as any as S.Schema<RetrieveTapeRecoveryPointOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RetrieveTapeRecoveryPoint",
}));

export type SetLocalConsolePasswordError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Sets the password for your VM local console. When you log in to the local console for
 * the first time, you log in to the VM with the default credentials. We recommend that you
 * set a new password. You don't need to know the default password to set a new
 * password.
 */
export const setLocalConsolePassword: API.OperationMethod<
  SetLocalConsolePasswordInput,
  SetLocalConsolePasswordOutput,
  SetLocalConsolePasswordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(744, __c93, 0) as any as S.Schema<SetLocalConsolePasswordInput>,
  output: __S(232, __c29, 0) as any as S.Schema<SetLocalConsolePasswordOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetLocalConsolePassword",
}));

export type SetSMBGuestPasswordError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Sets the password for the guest user `smbguest`. The `smbguest`
 * user is the user when the authentication method for the file share is set to
 * `GuestAccess`. This operation only supported for S3 File Gateways
 */
export const setSMBGuestPassword: API.OperationMethod<
  SetSMBGuestPasswordInput,
  SetSMBGuestPasswordOutput,
  SetSMBGuestPasswordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(752, __c94, 0) as any as S.Schema<SetSMBGuestPasswordInput>,
  output: __S(232, __c29, 0) as any as S.Schema<SetSMBGuestPasswordOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetSMBGuestPassword",
}));

export type ShutdownGatewayError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Shuts down a Tape Gateway or Volume Gateway. To specify which gateway to shut down, use
 * the Amazon Resource Name (ARN) of the gateway in the body of your request.
 *
 * This API action cannot be used to shut down S3 File Gateway or FSx File
 * Gateway.
 *
 * The operation shuts down the gateway service component running in the gateway's
 * virtual machine (VM) and not the host VM.
 *
 * If you want to shut down the VM, it is recommended that you first shut down the
 * gateway component in the VM to avoid unpredictable conditions.
 *
 * After the gateway is shutdown, you cannot call any other API except StartGateway, DescribeGatewayInformation, and ListGateways. For more information, see ActivateGateway.
 * Your applications cannot read from or write to the gateway's storage volumes, and
 * there are no snapshots taken.
 *
 * When you make a shutdown request, you will get a `200 OK` success response
 * immediately. However, it might take some time for the gateway to shut down. You can call
 * the DescribeGatewayInformation API to check the status. For more
 * information, see ActivateGateway.
 *
 * If do not intend to use the gateway again, you must delete the gateway (using DeleteGateway) to no longer pay software charges associated with the
 * gateway.
 */
export const shutdownGateway: API.OperationMethod<
  ShutdownGatewayInput,
  ShutdownGatewayOutput,
  ShutdownGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(776, __c97, 0) as any as S.Schema<ShutdownGatewayInput>,
  output: __S(232, __c29, 0) as any as S.Schema<ShutdownGatewayOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ShutdownGateway",
}));

export type StartAvailabilityMonitorTestError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Start a test that verifies that the specified gateway is configured for High
 * Availability monitoring in your host environment. This request only initiates the test and
 * that a successful response only indicates that the test was started. It doesn't
 * indicate that the test passed. For the status of the test, invoke the
 * `DescribeAvailabilityMonitorTest` API.
 *
 * Starting this test will cause your gateway to go offline for a brief period.
 */
export const startAvailabilityMonitorTest: API.OperationMethod<
  StartAvailabilityMonitorTestInput,
  StartAvailabilityMonitorTestOutput,
  StartAvailabilityMonitorTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(784, __c98, 0) as any as S.Schema<StartAvailabilityMonitorTestInput>,
  output: __S(232, __c29, 0) as any as S.Schema<StartAvailabilityMonitorTestOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAvailabilityMonitorTest",
}));

export type StartCacheReportError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Starts generating a report of the file metadata currently cached by an S3 File Gateway for a specific file share. You can use this report to identify and resolve
 * issues if you have files failing upload from your gateway to Amazon S3. The report
 * is a CSV file containing a list of files which match the set of filter parameters you
 * specify in the request.
 *
 * The **Files Failing Upload** flag is reset every 24
 * hours and during gateway reboot. If this report captures the files after the reset, but
 * before they become flagged again, they will not be reported as **Files Failing Upload**.
 *
 * The following requirements must be met to successfully generate a cache report:
 *
 * - You must have `s3:PutObject` and `s3:AbortMultipartUpload`
 * permissions for the Amazon S3 bucket where you want to store the cache
 * report.
 *
 * - No other cache reports can currently be in-progress for the specified file
 * share.
 *
 * - There must be fewer than 10 existing cache reports for the specified file
 * share.
 *
 * - The gateway must be online and connected to Amazon Web Services.
 *
 * - The root disk must have at least 20GB of free space when report generation
 * starts.
 *
 * - You must specify at least one value for `InclusionFilters` or
 * `ExclusionFilters` in the request.
 */
export const startCacheReport: API.OperationMethod<
  StartCacheReportInput,
  StartCacheReportOutput,
  StartCacheReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(792, __c99, 0) as any as S.Schema<StartCacheReportInput>,
  output: __S(40, __c5, 0) as any as S.Schema<StartCacheReportOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCacheReport",
}));

export type StartGatewayError = InternalServerError | InvalidGatewayRequestException | CommonErrors;
/**
 * Starts a gateway that you previously shut down (see ShutdownGateway).
 * After the gateway starts, you can then make other API calls, your applications can read
 * from or write to the gateway's storage volumes and you will be able to take snapshot
 * backups.
 *
 * When you make a request, you will get a 200 OK success response immediately. However,
 * it might take some time for the gateway to be ready. You should call DescribeGatewayInformation and check the status before making any
 * additional API calls. For more information, see ActivateGateway.
 *
 * To specify which gateway to start, use the Amazon Resource Name (ARN) of the gateway in
 * your request.
 */
export const startGateway: API.OperationMethod<
  StartGatewayInput,
  StartGatewayOutput,
  StartGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c100, 0) as any as S.Schema<StartGatewayInput>,
  output: __S(232, __c29, 0) as any as S.Schema<StartGatewayOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartGateway",
}));

export type UpdateAutomaticTapeCreationPolicyError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Updates the automatic tape creation policy of a gateway. Use this to update the policy
 * with a new set of automatic tape creation rules. This is only supported for tape
 * gateways.
 *
 * By default, there is no automatic tape creation policy.
 *
 * A gateway can have only one automatic tape creation policy.
 */
export const updateAutomaticTapeCreationPolicy: API.OperationMethod<
  UpdateAutomaticTapeCreationPolicyInput,
  UpdateAutomaticTapeCreationPolicyOutput,
  UpdateAutomaticTapeCreationPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(808, __c101, 0) as any as S.Schema<UpdateAutomaticTapeCreationPolicyInput>,
  output: __S(232, __c29, 0) as any as S.Schema<UpdateAutomaticTapeCreationPolicyOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAutomaticTapeCreationPolicy",
}));

export type UpdateBandwidthRateLimitError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Updates the bandwidth rate limits of a gateway. You can update both the upload and
 * download bandwidth rate limit or specify only one of the two. If you don't set a
 * bandwidth rate limit, the existing rate limit remains. This operation is supported only for
 * the stored volume, cached volume, and tape gateway types. To update bandwidth rate limits
 * for S3 file gateways, use UpdateBandwidthRateLimitSchedule.
 *
 * By default, a gateway's bandwidth rate limits are not set. If you don't set
 * any limit, the gateway does not have any limitations on its bandwidth usage and could
 * potentially use the maximum available bandwidth.
 *
 * To specify which gateway to update, use the Amazon Resource Name (ARN) of the gateway in
 * your request.
 */
export const updateBandwidthRateLimit: API.OperationMethod<
  UpdateBandwidthRateLimitInput,
  UpdateBandwidthRateLimitOutput,
  UpdateBandwidthRateLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(816, __c102, 0) as any as S.Schema<UpdateBandwidthRateLimitInput>,
  output: __S(232, __c29, 0) as any as S.Schema<UpdateBandwidthRateLimitOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBandwidthRateLimit",
}));

export type UpdateBandwidthRateLimitScheduleError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Updates the bandwidth rate limit schedule for a specified gateway. By default, gateways
 * do not have bandwidth rate limit schedules, which means no bandwidth rate limiting is in
 * effect. Use this to initiate or update a gateway's bandwidth rate limit schedule. This
 * operation is supported for volume, tape, and S3 file gateways. S3 file gateways support
 * bandwidth rate limits for upload only. FSx file gateways do not support bandwidth rate
 * limits.
 */
export const updateBandwidthRateLimitSchedule: API.OperationMethod<
  UpdateBandwidthRateLimitScheduleInput,
  UpdateBandwidthRateLimitScheduleOutput,
  UpdateBandwidthRateLimitScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(824, __c103, 0) as any as S.Schema<UpdateBandwidthRateLimitScheduleInput>,
  output: __S(232, __c29, 0) as any as S.Schema<UpdateBandwidthRateLimitScheduleOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBandwidthRateLimitSchedule",
}));

export type UpdateChapCredentialsError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Updates the Challenge-Handshake Authentication Protocol (CHAP) credentials for a
 * specified iSCSI target. By default, a gateway does not have CHAP enabled; however, for
 * added security, you might use it. This operation is supported in the volume and tape
 * gateway types.
 *
 * When you update CHAP credentials, all existing connections on the target are closed
 * and initiators must reconnect with the new credentials.
 */
export const updateChapCredentials: API.OperationMethod<
  UpdateChapCredentialsInput,
  UpdateChapCredentialsOutput,
  UpdateChapCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c104, 0) as any as S.Schema<UpdateChapCredentialsInput>,
  output: __S(184, __c23, 0) as any as S.Schema<UpdateChapCredentialsOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateChapCredentials",
}));

export type UpdateFileSystemAssociationError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Updates a file system association. This operation is only supported in the FSx File
 * Gateways.
 */
export const updateFileSystemAssociation: API.OperationMethod<
  UpdateFileSystemAssociationInput,
  UpdateFileSystemAssociationOutput,
  UpdateFileSystemAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(840, __c105, 0) as any as S.Schema<UpdateFileSystemAssociationInput>,
  output: __S(880, __c110, 0) as any as S.Schema<UpdateFileSystemAssociationOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFileSystemAssociation",
}));

export type UpdateGatewayInformationError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Updates a gateway's metadata, which includes the gateway's name, time zone,
 * and metadata cache size. To specify which gateway to update, use the Amazon Resource Name
 * (ARN) of the gateway in your request.
 *
 * For gateways activated after September 2, 2015, the gateway's ARN contains the
 * gateway ID rather than the gateway name. However, changing the name of the gateway has
 * no effect on the gateway's ARN.
 */
export const updateGatewayInformation: API.OperationMethod<
  UpdateGatewayInformationInput,
  UpdateGatewayInformationOutput,
  UpdateGatewayInformationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(848, __c106, 0) as any as S.Schema<UpdateGatewayInformationInput>,
  output: __S(849, __c106, 1) as any as S.Schema<UpdateGatewayInformationOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGatewayInformation",
}));

export type UpdateGatewaySoftwareNowError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Updates the gateway virtual machine (VM) software. The request immediately triggers the
 * software update.
 *
 * When you make this request, you get a `200 OK` success response
 * immediately. However, it might take some time for the update to complete. You can call
 * DescribeGatewayInformation to verify the gateway is in the
 * `STATE_RUNNING` state.
 *
 * A software update forces a system restart of your gateway. You can minimize the
 * chance of any disruption to your applications by increasing your iSCSI Initiators'
 * timeouts. For more information about increasing iSCSI Initiator timeouts for Windows and
 * Linux, see Customizing your Windows iSCSI settings and Customizing your Linux iSCSI settings, respectively.
 */
export const updateGatewaySoftwareNow: API.OperationMethod<
  UpdateGatewaySoftwareNowInput,
  UpdateGatewaySoftwareNowOutput,
  UpdateGatewaySoftwareNowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(888, __c111, 0) as any as S.Schema<UpdateGatewaySoftwareNowInput>,
  output: __S(232, __c29, 0) as any as S.Schema<UpdateGatewaySoftwareNowOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGatewaySoftwareNow",
}));

export type UpdateMaintenanceStartTimeError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Updates a gateway's maintenance window schedule, with settings for monthly or
 * weekly cadence, specific day and time to begin maintenance, and which types of updates to
 * apply. Time configuration uses the gateway's time zone. You can pass values for a complete
 * maintenance schedule, or update policy, or both. Previous values will persist for whichever
 * setting you choose not to modify. If an incomplete or invalid maintenance schedule is
 * passed, the entire request will be rejected with an error and no changes will occur.
 *
 * A complete maintenance schedule must include values for *both*
 * `MinuteOfHour` and `HourOfDay`, and *either*
 * `DayOfMonth`
 * *or*
 * `DayOfWeek`.
 *
 * We recommend keeping maintenance updates turned on, except in specific use cases
 * where the brief disruptions caused by updating the gateway could critically impact your
 * deployment.
 */
export const updateMaintenanceStartTime: API.OperationMethod<
  UpdateMaintenanceStartTimeInput,
  UpdateMaintenanceStartTimeOutput,
  UpdateMaintenanceStartTimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c112, 0) as any as S.Schema<UpdateMaintenanceStartTimeInput>,
  output: __S(232, __c29, 0) as any as S.Schema<UpdateMaintenanceStartTimeOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMaintenanceStartTime",
}));

export type UpdateNFSFileShareError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Updates a Network File System (NFS) file share. This operation is only supported in S3
 * File Gateways.
 *
 * To leave a file share field unchanged, set the corresponding input field to
 * null.
 *
 * Updates the following file share settings:
 *
 * - Default storage class for your S3 bucket
 *
 * - Metadata defaults for your S3 bucket
 *
 * - Allowed NFS clients for your file share
 *
 * - Squash settings
 *
 * - Write status of your file share
 */
export const updateNFSFileShare: API.OperationMethod<
  UpdateNFSFileShareInput,
  UpdateNFSFileShareOutput,
  UpdateNFSFileShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(904, __c113, 0) as any as S.Schema<UpdateNFSFileShareInput>,
  output: __S(72, __c9, 0) as any as S.Schema<UpdateNFSFileShareOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNFSFileShare",
}));

export type UpdateSMBFileShareError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Updates a Server Message Block (SMB) file share. This operation is only supported for S3
 * File Gateways.
 *
 * To leave a file share field unchanged, set the corresponding input field to
 * null.
 *
 * File gateways require Security Token Service (Amazon Web Services STS) to be
 * activated to enable you to create a file share. Make sure that Amazon Web Services STS
 * is activated in the Amazon Web Services Region you are creating your file gateway in. If
 * Amazon Web Services STS is not activated in this Amazon Web Services Region, activate
 * it. For information about how to activate Amazon Web Services STS, see Activating and
 * deactivating Amazon Web Services STS in an Amazon Web Services Region in the
 * *Identity and Access Management User Guide*.
 *
 * File gateways don't support creating hard or symbolic links on a file
 * share.
 */
export const updateSMBFileShare: API.OperationMethod<
  UpdateSMBFileShareInput,
  UpdateSMBFileShareOutput,
  UpdateSMBFileShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(912, __c114, 0) as any as S.Schema<UpdateSMBFileShareInput>,
  output: __S(72, __c9, 0) as any as S.Schema<UpdateSMBFileShareOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSMBFileShare",
}));

export type UpdateSMBFileShareVisibilityError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Controls whether the shares on an S3 File Gateway are visible in a net view or browse
 * list. The operation is only supported for S3 File Gateways.
 */
export const updateSMBFileShareVisibility: API.OperationMethod<
  UpdateSMBFileShareVisibilityInput,
  UpdateSMBFileShareVisibilityOutput,
  UpdateSMBFileShareVisibilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(920, __c115, 0) as any as S.Schema<UpdateSMBFileShareVisibilityInput>,
  output: __S(232, __c29, 0) as any as S.Schema<UpdateSMBFileShareVisibilityOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSMBFileShareVisibility",
}));

export type UpdateSMBLocalGroupsError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Updates the list of Active Directory users and groups that have special permissions for
 * SMB file shares on the gateway.
 */
export const updateSMBLocalGroups: API.OperationMethod<
  UpdateSMBLocalGroupsInput,
  UpdateSMBLocalGroupsOutput,
  UpdateSMBLocalGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c116, 0) as any as S.Schema<UpdateSMBLocalGroupsInput>,
  output: __S(232, __c29, 0) as any as S.Schema<UpdateSMBLocalGroupsOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSMBLocalGroups",
}));

export type UpdateSMBSecurityStrategyError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Updates the SMB security strategy level for an Amazon S3 file gateway. This
 * action is only supported for Amazon S3 file gateways.
 *
 * For information about configuring this setting using the Amazon Web Services console,
 * see Setting a security level for your gateway in the Amazon S3
 * File Gateway User Guide.
 *
 * A higher security strategy level can affect performance of the gateway.
 */
export const updateSMBSecurityStrategy: API.OperationMethod<
  UpdateSMBSecurityStrategyInput,
  UpdateSMBSecurityStrategyOutput,
  UpdateSMBSecurityStrategyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(936, __c117, 0) as any as S.Schema<UpdateSMBSecurityStrategyInput>,
  output: __S(232, __c29, 0) as any as S.Schema<UpdateSMBSecurityStrategyOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSMBSecurityStrategy",
}));

export type UpdateSnapshotScheduleError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Updates a snapshot schedule configured for a gateway volume. This operation is only
 * supported in the cached volume and stored volume gateway types.
 *
 * The default snapshot schedule for volume is once every 24 hours, starting at the
 * creation time of the volume. You can use this API to change the snapshot schedule
 * configured for the volume.
 *
 * In the request you must identify the gateway volume whose snapshot schedule you want to
 * update, and the schedule information, including when you want the snapshot to begin on a
 * day and the frequency (in hours) of snapshots.
 */
export const updateSnapshotSchedule: API.OperationMethod<
  UpdateSnapshotScheduleInput,
  UpdateSnapshotScheduleOutput,
  UpdateSnapshotScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(944, __c118, 0) as any as S.Schema<UpdateSnapshotScheduleInput>,
  output: __S(216, __c27, 0) as any as S.Schema<UpdateSnapshotScheduleOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSnapshotSchedule",
}));

export type UpdateVTLDeviceTypeError =
  | InternalServerError
  | InvalidGatewayRequestException
  | CommonErrors;
/**
 * Updates the type of medium changer in a tape gateway. When you activate a tape gateway,
 * you select a medium changer type for the tape gateway. This operation enables you to select
 * a different type of medium changer after a tape gateway is activated. This operation is
 * only supported in the tape gateway type.
 */
export const updateVTLDeviceType: API.OperationMethod<
  UpdateVTLDeviceTypeInput,
  UpdateVTLDeviceTypeOutput,
  UpdateVTLDeviceTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(952, __c119, 0) as any as S.Schema<UpdateVTLDeviceTypeInput>,
  output: __S(953, __c119, 1) as any as S.Schema<UpdateVTLDeviceTypeOutput>,
  errors: [InternalServerError, InvalidGatewayRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVTLDeviceType",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({ errorCode: S.optional(S.String), errorDetails: S.optional(__S(0, __c0, 0)) }),
      ).annotate({ identifier: "StorageGatewayError" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.String,
          TargetName: S.optional(S.String),
          VolumeARN: S.String,
          NetworkInterfaceId: S.String,
          DiskId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AttachVolumeInput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VolumeARN: S.optional(S.String), TargetARN: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "AttachVolumeOutput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String, TapeARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelArchivalInput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CacheReportARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelCacheReportInput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ CacheReportARN: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "CancelCacheReportOutput",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String, TapeARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelRetrievalInput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.String,
          VolumeSizeInBytes: S.Number,
          SnapshotId: S.optional(S.String),
          TargetName: S.String,
          SourceVolumeARN: S.optional(S.String),
          NetworkInterfaceId: S.String,
          ClientToken: S.String,
          KMSEncrypted: S.optional(S.Boolean),
          KMSKey: S.optional(S.String),
          Tags: S.optional(__S(241, __c30, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateCachediSCSIVolumeInput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientToken: S.String,
          NFSFileShareDefaults: S.optional(__S(80, __c10, 0)),
          GatewayARN: S.String,
          EncryptionType: S.optional(S.String),
          KMSEncrypted: S.optional(S.Boolean),
          KMSKey: S.optional(S.String),
          Role: S.String,
          LocationARN: S.String,
          DefaultStorageClass: S.optional(S.String),
          ObjectACL: S.optional(S.String),
          ClientList: S.optional(__S(368, __c46, 0)),
          Squash: S.optional(S.String),
          ReadOnly: S.optional(S.Boolean),
          GuessMIMETypeEnabled: S.optional(S.Boolean),
          RequesterPays: S.optional(S.Boolean),
          Tags: S.optional(__S(241, __c30, 1)),
          FileShareName: S.optional(S.String),
          CacheAttributes: S.optional(__S(864, __c108, 0)),
          NotificationPolicy: S.optional(S.String),
          VPCEndpointDNSName: S.optional(S.String),
          BucketRegion: S.optional(S.String),
          AuditDestinationARN: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateNFSFileShareInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ FileShareARN: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "CreateNFSFileShareOutput",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FileMode: S.optional(S.String),
          DirectoryMode: S.optional(S.String),
          GroupId: S.optional(S.Number),
          OwnerId: S.optional(S.Number),
        }),
      ).annotate({ identifier: "NFSFileShareDefaults" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientToken: S.String,
          GatewayARN: S.String,
          EncryptionType: S.optional(S.String),
          KMSEncrypted: S.optional(S.Boolean),
          KMSKey: S.optional(S.String),
          Role: S.String,
          LocationARN: S.String,
          DefaultStorageClass: S.optional(S.String),
          ObjectACL: S.optional(S.String),
          ReadOnly: S.optional(S.Boolean),
          GuessMIMETypeEnabled: S.optional(S.Boolean),
          RequesterPays: S.optional(S.Boolean),
          SMBACLEnabled: S.optional(S.Boolean),
          AccessBasedEnumeration: S.optional(S.Boolean),
          AdminUserList: S.optional(__S(368, __c46, 0)),
          ValidUserList: S.optional(__S(368, __c46, 0)),
          InvalidUserList: S.optional(__S(368, __c46, 0)),
          AuditDestinationARN: S.optional(S.String),
          Authentication: S.optional(S.String),
          CaseSensitivity: S.optional(S.String),
          Tags: S.optional(__S(241, __c30, 1)),
          FileShareName: S.optional(S.String),
          CacheAttributes: S.optional(__S(864, __c108, 0)),
          NotificationPolicy: S.optional(S.String),
          VPCEndpointDNSName: S.optional(S.String),
          BucketRegion: S.optional(S.String),
          OplocksEnabled: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateSMBFileShareInput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VolumeARN: S.String,
          SnapshotDescription: S.String,
          Tags: S.optional(__S(241, __c30, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateSnapshotInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ VolumeARN: S.optional(S.String), SnapshotId: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "CreateSnapshotOutput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VolumeARN: S.String,
          SnapshotDescription: S.String,
          Tags: S.optional(__S(241, __c30, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateSnapshotFromVolumeRecoveryPointInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SnapshotId: S.optional(S.String),
          VolumeARN: S.optional(S.String),
          VolumeRecoveryPointTime: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateSnapshotFromVolumeRecoveryPointOutput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.String,
          DiskId: S.String,
          SnapshotId: S.optional(S.String),
          PreserveExistingData: S.Boolean,
          TargetName: S.String,
          NetworkInterfaceId: S.String,
          KMSEncrypted: S.optional(S.Boolean),
          KMSKey: S.optional(S.String),
          Tags: S.optional(__S(241, __c30, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateStorediSCSIVolumeInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VolumeARN: S.optional(S.String),
          VolumeSizeInBytes: S.optional(S.Number),
          TargetARN: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateStorediSCSIVolumeOutput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PoolName: S.String,
          StorageClass: S.String,
          RetentionLockType: S.optional(S.String),
          RetentionLockTimeInDays: S.optional(S.Number),
          Tags: S.optional(__S(241, __c30, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateTapePoolInput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ PoolARN: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "CreateTapePoolOutput",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.String,
          TapeSizeInBytes: S.Number,
          ClientToken: S.String,
          NumTapesToCreate: S.Number,
          TapeBarcodePrefix: S.String,
          KMSEncrypted: S.optional(S.Boolean),
          KMSKey: S.optional(S.String),
          PoolId: S.optional(S.String),
          Worm: S.optional(S.Boolean),
          Tags: S.optional(__S(241, __c30, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateTapesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ TapeARNs: S.optional(__S(368, __c46, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreateTapesOutput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.String,
          TapeSizeInBytes: S.Number,
          TapeBarcode: S.String,
          KMSEncrypted: S.optional(S.Boolean),
          KMSKey: S.optional(S.String),
          PoolId: S.optional(S.String),
          Worm: S.optional(S.Boolean),
          Tags: S.optional(__S(241, __c30, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateTapeWithBarcodeInput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAutomaticTapeCreationPolicyInput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String, BandwidthType: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteBandwidthRateLimitInput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CacheReportARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteCacheReportInput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TargetARN: S.String, InitiatorName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteChapCredentialsInput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TargetARN: S.optional(S.String), InitiatorName: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "DeleteChapCredentialsOutput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FileShareARN: S.String, ForceDelete: S.optional(S.Boolean) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteFileShareInput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteGatewayInput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VolumeARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteSnapshotScheduleInput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ VolumeARN: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "DeleteSnapshotScheduleOutput",
      });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ActivationKey: S.String,
          GatewayName: S.String,
          GatewayTimezone: S.String,
          GatewayRegion: S.String,
          GatewayType: S.optional(S.String),
          TapeDriveType: S.optional(S.String),
          MediumChangerType: S.optional(S.String),
          Tags: S.optional(__S(241, __c30, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ActivateGatewayInput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ GatewayARN: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "ActivateGatewayOutput",
      });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(240, __c30, 0));
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.String,
          TapeARN: S.String,
          BypassGovernanceRetention: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteTapeInput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TapeARN: S.String, BypassGovernanceRetention: S.optional(S.Boolean) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteTapeArchiveInput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PoolARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteTapePoolInput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VolumeARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteVolumeInput" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAvailabilityMonitorTestInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.optional(S.String),
          Status: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeAvailabilityMonitorTestOutput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeBandwidthRateLimitInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.optional(S.String),
          AverageUploadRateLimitInBitsPerSec: S.optional(S.Number),
          AverageDownloadRateLimitInBitsPerSec: S.optional(S.Number),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeBandwidthRateLimitOutput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeBandwidthRateLimitScheduleInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.optional(S.String),
          BandwidthRateLimitIntervals: S.optional(__S(306, __c38, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeBandwidthRateLimitScheduleOutput" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
    case 1:
      return S.suspend(() =>
        S.Struct({
          StartHourOfDay: S.Number,
          StartMinuteOfHour: S.Number,
          EndHourOfDay: S.Number,
          EndMinuteOfHour: S.Number,
          DaysOfWeek: __S(304, __c38, 0),
          AverageUploadRateLimitInBitsPerSec: S.optional(S.Number),
          AverageDownloadRateLimitInBitsPerSec: S.optional(S.Number),
        }),
      ).annotate({ identifier: "BandwidthRateLimitInterval" });
    case 2:
      return S.Array(__S(305, __c38, 1));
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeCacheInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.optional(S.String),
          DiskIds: S.optional(__S(368, __c46, 0)),
          CacheAllocatedInBytes: S.optional(S.Number),
          CacheUsedPercentage: S.optional(S.Number),
          CacheDirtyPercentage: S.optional(S.Number),
          CacheHitPercentage: S.optional(S.Number),
          CacheMissPercentage: S.optional(S.Number),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeCacheOutput" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VolumeARNs: __S(368, __c46, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeCachediSCSIVolumesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VolumeARN: S.optional(S.String),
          VolumeId: S.optional(S.String),
          VolumeType: S.optional(S.String),
          VolumeStatus: S.optional(S.String),
          VolumeAttachmentStatus: S.optional(S.String),
          VolumeSizeInBytes: S.optional(S.Number),
          VolumeProgress: S.optional(S.Number),
          SourceSnapshotId: S.optional(S.String),
          VolumeiSCSIAttributes: S.optional(__S(328, __c41, 0)),
          CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          VolumeUsedInBytes: S.optional(S.Number),
          KMSKey: S.optional(S.String),
          TargetName: S.optional(S.String),
        }),
      ).annotate({ identifier: "CachediSCSIVolume" });
    case 2:
      return S.Array(__S(321, __c40, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ CachediSCSIVolumes: S.optional(__S(322, __c40, 2)) }).pipe(ns),
      ).annotate({ identifier: "DescribeCachediSCSIVolumesOutput" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TargetARN: S.optional(S.String),
          NetworkInterfaceId: S.optional(S.String),
          NetworkInterfacePort: S.optional(S.Number),
          LunNumber: S.optional(S.Number),
          ChapEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "VolumeiSCSIAttributes" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CacheReportARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeCacheReportInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CacheReportInfo: S.optional(__S(344, __c43, 0)) }).pipe(ns),
      ).annotate({ identifier: "DescribeCacheReportOutput" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CacheReportARN: S.optional(S.String),
          CacheReportStatus: S.optional(S.String),
          ReportCompletionPercent: S.optional(S.Number),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Role: S.optional(S.String),
          FileShareARN: S.optional(S.String),
          LocationARN: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          InclusionFilters: S.optional(__S(353, __c44, 1)),
          ExclusionFilters: S.optional(__S(353, __c44, 1)),
          ReportName: S.optional(S.String),
          Tags: S.optional(__S(241, __c30, 1)),
        }),
      ).annotate({ identifier: "CacheReportInfo" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String, Values: __S(368, __c46, 0) })).annotate({
        identifier: "CacheReportFilter",
      });
    case 1:
      return S.Array(__S(352, __c44, 0));
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String, DiskIds: __S(368, __c46, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AddCacheInput" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TargetARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeChapCredentialsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TargetARN: S.optional(S.String),
          SecretToAuthenticateInitiator: S.optional(SensitiveString),
          InitiatorName: S.optional(S.String),
          SecretToAuthenticateTarget: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ChapInfo" });
    case 2:
      return S.Array(__S(377, __c47, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ ChapCredentials: S.optional(__S(378, __c47, 2)) }).pipe(ns),
      ).annotate({ identifier: "DescribeChapCredentialsOutput" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FileSystemAssociationARNList: __S(368, __c46, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeFileSystemAssociationsInput" });
    case 1:
      return S.suspend(() => S.Struct({ ErrorCode: S.optional(S.String) })).annotate({
        identifier: "FileSystemAssociationStatusDetail",
      });
    case 2:
      return S.Array(__S(385, __c48, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          FileSystemAssociationARN: S.optional(S.String),
          LocationARN: S.optional(S.String),
          FileSystemAssociationStatus: S.optional(S.String),
          AuditDestinationARN: S.optional(S.String),
          GatewayARN: S.optional(S.String),
          Tags: S.optional(__S(241, __c30, 1)),
          CacheAttributes: S.optional(__S(864, __c108, 0)),
          EndpointNetworkConfiguration: S.optional(__S(872, __c109, 0)),
          FileSystemAssociationStatusDetails: S.optional(__S(386, __c48, 2)),
        }),
      ).annotate({ identifier: "FileSystemAssociationInfo" });
    case 4:
      return S.Array(__S(387, __c48, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ FileSystemAssociationInfoList: S.optional(__S(388, __c48, 4)) }).pipe(ns),
      ).annotate({ identifier: "DescribeFileSystemAssociationsOutput" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeGatewayInformationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Ipv4Address: S.optional(S.String),
          MacAddress: S.optional(S.String),
          Ipv6Address: S.optional(S.String),
        }),
      ).annotate({ identifier: "NetworkInterface" });
    case 2:
      return S.Array(__S(393, __c49, 1));
    case 3:
      return S.Array(S.String);
    case 4:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.optional(S.String),
          GatewayId: S.optional(S.String),
          GatewayName: S.optional(S.String),
          GatewayTimezone: S.optional(S.String),
          GatewayState: S.optional(S.String),
          GatewayNetworkInterfaces: S.optional(__S(394, __c49, 2)),
          GatewayType: S.optional(S.String),
          NextUpdateAvailabilityDate: S.optional(S.String),
          LastSoftwareUpdate: S.optional(S.String),
          Ec2InstanceId: S.optional(S.String),
          Ec2InstanceRegion: S.optional(S.String),
          Tags: S.optional(__S(241, __c30, 1)),
          VPCEndpoint: S.optional(S.String),
          CloudWatchLogGroupARN: S.optional(S.String),
          HostEnvironment: S.optional(S.String),
          EndpointType: S.optional(S.String),
          SoftwareUpdatesEndDate: S.optional(S.String),
          DeprecationDate: S.optional(S.String),
          GatewayCapacity: S.optional(S.String),
          SupportedGatewayCapacities: S.optional(__S(395, __c49, 3)),
          HostEnvironmentId: S.optional(S.String),
          SoftwareVersion: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeGatewayInformationOutput" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeMaintenanceStartTimeInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.optional(S.String),
          HourOfDay: S.optional(S.Number),
          MinuteOfHour: S.optional(S.Number),
          DayOfWeek: S.optional(S.Number),
          DayOfMonth: S.optional(S.Number),
          Timezone: S.optional(S.String),
          SoftwareUpdatePreferences: S.optional(__S(408, __c51, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeMaintenanceStartTimeOutput" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ AutomaticUpdatePolicy: S.optional(S.String) })).annotate({
        identifier: "SoftwareUpdatePreferences",
      });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FileShareARNList: __S(368, __c46, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeNFSFileSharesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NFSFileShareDefaults: S.optional(__S(80, __c10, 0)),
          FileShareARN: S.optional(S.String),
          FileShareId: S.optional(S.String),
          FileShareStatus: S.optional(S.String),
          GatewayARN: S.optional(S.String),
          EncryptionType: S.optional(S.String),
          KMSEncrypted: S.optional(S.Boolean),
          KMSKey: S.optional(S.String),
          Path: S.optional(S.String),
          Role: S.optional(S.String),
          LocationARN: S.optional(S.String),
          DefaultStorageClass: S.optional(S.String),
          ObjectACL: S.optional(S.String),
          ClientList: S.optional(__S(368, __c46, 0)),
          Squash: S.optional(S.String),
          ReadOnly: S.optional(S.Boolean),
          GuessMIMETypeEnabled: S.optional(S.Boolean),
          RequesterPays: S.optional(S.Boolean),
          Tags: S.optional(__S(241, __c30, 1)),
          FileShareName: S.optional(S.String),
          CacheAttributes: S.optional(__S(864, __c108, 0)),
          NotificationPolicy: S.optional(S.String),
          VPCEndpointDNSName: S.optional(S.String),
          BucketRegion: S.optional(S.String),
          AuditDestinationARN: S.optional(S.String),
        }),
      ).annotate({ identifier: "NFSFileShareInfo" });
    case 2:
      return S.Array(__S(417, __c52, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NFSFileShareInfoList: S.optional(__S(418, __c52, 2)) }).pipe(ns),
      ).annotate({ identifier: "DescribeNFSFileSharesOutput" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FileShareARNList: __S(368, __c46, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeSMBFileSharesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FileShareARN: S.optional(S.String),
          FileShareId: S.optional(S.String),
          FileShareStatus: S.optional(S.String),
          GatewayARN: S.optional(S.String),
          EncryptionType: S.optional(S.String),
          KMSEncrypted: S.optional(S.Boolean),
          KMSKey: S.optional(S.String),
          Path: S.optional(S.String),
          Role: S.optional(S.String),
          LocationARN: S.optional(S.String),
          DefaultStorageClass: S.optional(S.String),
          ObjectACL: S.optional(S.String),
          ReadOnly: S.optional(S.Boolean),
          GuessMIMETypeEnabled: S.optional(S.Boolean),
          RequesterPays: S.optional(S.Boolean),
          SMBACLEnabled: S.optional(S.Boolean),
          AccessBasedEnumeration: S.optional(S.Boolean),
          AdminUserList: S.optional(__S(368, __c46, 0)),
          ValidUserList: S.optional(__S(368, __c46, 0)),
          InvalidUserList: S.optional(__S(368, __c46, 0)),
          AuditDestinationARN: S.optional(S.String),
          Authentication: S.optional(S.String),
          CaseSensitivity: S.optional(S.String),
          Tags: S.optional(__S(241, __c30, 1)),
          FileShareName: S.optional(S.String),
          CacheAttributes: S.optional(__S(864, __c108, 0)),
          NotificationPolicy: S.optional(S.String),
          VPCEndpointDNSName: S.optional(S.String),
          BucketRegion: S.optional(S.String),
          OplocksEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "SMBFileShareInfo" });
    case 2:
      return S.Array(__S(425, __c53, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ SMBFileShareInfoList: S.optional(__S(426, __c53, 2)) }).pipe(ns),
      ).annotate({ identifier: "DescribeSMBFileSharesOutput" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeSMBSettingsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.optional(S.String),
          DomainName: S.optional(S.String),
          ActiveDirectoryStatus: S.optional(S.String),
          SMBGuestPasswordSet: S.optional(S.Boolean),
          SMBSecurityStrategy: S.optional(S.String),
          FileSharesVisible: S.optional(S.Boolean),
          SMBLocalGroups: S.optional(__S(440, __c55, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeSMBSettingsOutput" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ GatewayAdmins: S.optional(__S(368, __c46, 0)) })).annotate({
        identifier: "SMBLocalGroups",
      });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VolumeARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeSnapshotScheduleInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VolumeARN: S.optional(S.String),
          StartAt: S.optional(S.Number),
          RecurrenceInHours: S.optional(S.Number),
          Description: S.optional(S.String),
          Timezone: S.optional(S.String),
          Tags: S.optional(__S(241, __c30, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeSnapshotScheduleOutput" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VolumeARNs: __S(368, __c46, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeStorediSCSIVolumesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VolumeARN: S.optional(S.String),
          VolumeId: S.optional(S.String),
          VolumeType: S.optional(S.String),
          VolumeStatus: S.optional(S.String),
          VolumeAttachmentStatus: S.optional(S.String),
          VolumeSizeInBytes: S.optional(S.Number),
          VolumeProgress: S.optional(S.Number),
          VolumeDiskId: S.optional(S.String),
          SourceSnapshotId: S.optional(S.String),
          PreservedExistingData: S.optional(S.Boolean),
          VolumeiSCSIAttributes: S.optional(__S(328, __c41, 0)),
          CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          VolumeUsedInBytes: S.optional(S.Number),
          KMSKey: S.optional(S.String),
          TargetName: S.optional(S.String),
        }),
      ).annotate({ identifier: "StorediSCSIVolume" });
    case 2:
      return S.Array(__S(457, __c57, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ StorediSCSIVolumes: S.optional(__S(458, __c57, 2)) }).pipe(ns),
      ).annotate({ identifier: "DescribeStorediSCSIVolumesOutput" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TapeARNs: S.optional(__S(368, __c46, 0)),
          Marker: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeTapeArchivesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TapeARN: S.optional(S.String),
          TapeBarcode: S.optional(S.String),
          TapeCreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TapeSizeInBytes: S.optional(S.Number),
          CompletionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RetrievedTo: S.optional(S.String),
          TapeStatus: S.optional(S.String),
          TapeUsedInBytes: S.optional(S.Number),
          KMSKey: S.optional(S.String),
          PoolId: S.optional(S.String),
          Worm: S.optional(S.Boolean),
          RetentionStartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          PoolEntryDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "TapeArchive" });
    case 2:
      return S.Array(__S(465, __c58, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          TapeArchives: S.optional(__S(466, __c58, 2)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeTapeArchivesOutput" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, Tags: __S(241, __c30, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AddTagsToResourceInput" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ResourceARN: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "AddTagsToResourceOutput",
      });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.String,
          Marker: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeTapeRecoveryPointsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TapeARN: S.optional(S.String),
          TapeRecoveryPointTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TapeSizeInBytes: S.optional(S.Number),
          TapeStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "TapeRecoveryPointInfo" });
    case 2:
      return S.Array(__S(489, __c61, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.optional(S.String),
          TapeRecoveryPointInfos: S.optional(__S(490, __c61, 2)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeTapeRecoveryPointsOutput" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.String,
          TapeARNs: S.optional(__S(368, __c46, 0)),
          Marker: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeTapesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TapeARN: S.optional(S.String),
          TapeBarcode: S.optional(S.String),
          TapeCreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TapeSizeInBytes: S.optional(S.Number),
          TapeStatus: S.optional(S.String),
          VTLDevice: S.optional(S.String),
          Progress: S.optional(S.Number),
          TapeUsedInBytes: S.optional(S.Number),
          KMSKey: S.optional(S.String),
          PoolId: S.optional(S.String),
          Worm: S.optional(S.Boolean),
          RetentionStartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          PoolEntryDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Tape" });
    case 2:
      return S.Array(__S(497, __c62, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Tapes: S.optional(__S(498, __c62, 2)), Marker: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "DescribeTapesOutput" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeUploadBufferInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.optional(S.String),
          DiskIds: S.optional(__S(368, __c46, 0)),
          UploadBufferUsedInBytes: S.optional(S.Number),
          UploadBufferAllocatedInBytes: S.optional(S.Number),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeUploadBufferOutput" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.String,
          VTLDeviceARNs: S.optional(__S(368, __c46, 0)),
          Marker: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeVTLDevicesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TargetARN: S.optional(S.String),
          NetworkInterfaceId: S.optional(S.String),
          NetworkInterfacePort: S.optional(S.Number),
          ChapEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DeviceiSCSIAttributes" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          VTLDeviceARN: S.optional(S.String),
          VTLDeviceType: S.optional(S.String),
          VTLDeviceVendor: S.optional(S.String),
          VTLDeviceProductIdentifier: S.optional(S.String),
          DeviceiSCSIAttributes: S.optional(__S(513, __c64, 1)),
        }),
      ).annotate({ identifier: "VTLDevice" });
    case 3:
      return S.Array(__S(514, __c64, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.optional(S.String),
          VTLDevices: S.optional(__S(515, __c64, 3)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeVTLDevicesOutput" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeWorkingStorageInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.optional(S.String),
          DiskIds: S.optional(__S(368, __c46, 0)),
          WorkingStorageUsedInBytes: S.optional(S.Number),
          WorkingStorageAllocatedInBytes: S.optional(S.Number),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeWorkingStorageOutput" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VolumeARN: S.String, ForceDetach: S.optional(S.Boolean) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DetachVolumeInput" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisableGatewayInput" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FileSystemAssociationARN: S.String, ForceDelete: S.optional(S.Boolean) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateFileSystemInput" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FileShareARN: S.String, ForceRemove: S.optional(S.Boolean) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "EvictFilesFailingUploadInput" });
    case 1:
      return S.suspend(() => S.Struct({ NotificationId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "EvictFilesFailingUploadOutput",
      });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.String,
          DomainName: S.String,
          OrganizationalUnit: S.optional(S.String),
          DomainControllers: S.optional(__S(368, __c46, 0)),
          TimeoutInSeconds: S.optional(S.Number),
          UserName: S.String,
          Password: SensitiveString,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "JoinDomainInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.optional(S.String),
          ActiveDirectoryStatus: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "JoinDomainOutput" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String, DiskIds: __S(368, __c46, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AddUploadBufferInput" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAutomaticTapeCreationPoliciesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AutomaticTapeCreationRules: S.optional(__S(585, __c73, 1)),
          GatewayARN: S.optional(S.String),
        }),
      ).annotate({ identifier: "AutomaticTapeCreationPolicyInfo" });
    case 2:
      return S.Array(__S(577, __c72, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ AutomaticTapeCreationPolicyInfos: S.optional(__S(578, __c72, 2)) }).pipe(ns),
      ).annotate({ identifier: "ListAutomaticTapeCreationPoliciesOutput" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TapeBarcodePrefix: S.String,
          PoolId: S.String,
          TapeSizeInBytes: S.Number,
          MinimumNumTapes: S.Number,
          Worm: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AutomaticTapeCreationRule" });
    case 1:
      return S.Array(__S(584, __c73, 0));
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Marker: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListCacheReportsInput" });
    case 1:
      return S.Array(__S(344, __c43, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          CacheReportList: S.optional(__S(593, __c74, 1)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListCacheReportsOutput" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.optional(S.String),
          Limit: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFileSharesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FileShareType: S.optional(S.String),
          FileShareARN: S.optional(S.String),
          FileShareId: S.optional(S.String),
          FileShareStatus: S.optional(S.String),
          GatewayARN: S.optional(S.String),
        }),
      ).annotate({ identifier: "FileShareInfo" });
    case 2:
      return S.Array(__S(601, __c75, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          NextMarker: S.optional(S.String),
          FileShareInfoList: S.optional(__S(602, __c75, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ListFileSharesOutput" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.optional(S.String),
          Limit: S.optional(S.Number),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFileSystemAssociationsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FileSystemAssociationId: S.optional(S.String),
          FileSystemAssociationARN: S.optional(S.String),
          FileSystemAssociationStatus: S.optional(S.String),
          GatewayARN: S.optional(S.String),
        }),
      ).annotate({ identifier: "FileSystemAssociationSummary" });
    case 2:
      return S.Array(__S(609, __c76, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Marker: S.optional(S.String),
          NextMarker: S.optional(S.String),
          FileSystemAssociationSummaryList: S.optional(__S(610, __c76, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ListFileSystemAssociationsOutput" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Marker: S.optional(S.String), Limit: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListGatewaysInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GatewayId: S.optional(S.String),
          GatewayARN: S.optional(S.String),
          GatewayType: S.optional(S.String),
          GatewayOperationalState: S.optional(S.String),
          GatewayName: S.optional(S.String),
          Ec2InstanceId: S.optional(S.String),
          Ec2InstanceRegion: S.optional(S.String),
          HostEnvironment: S.optional(S.String),
          HostEnvironmentId: S.optional(S.String),
          DeprecationDate: S.optional(S.String),
          SoftwareVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "GatewayInfo" });
    case 2:
      return S.Array(__S(617, __c77, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Gateways: S.optional(__S(618, __c77, 2)), Marker: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListGatewaysOutput" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListLocalDisksInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DiskId: S.optional(S.String),
          DiskPath: S.optional(S.String),
          DiskNode: S.optional(S.String),
          DiskStatus: S.optional(S.String),
          DiskSizeInBytes: S.optional(S.Number),
          DiskAllocationType: S.optional(S.String),
          DiskAllocationResource: S.optional(S.String),
          DiskAttributeList: S.optional(__S(368, __c46, 0)),
        }),
      ).annotate({ identifier: "Disk" });
    case 2:
      return S.Array(__S(625, __c78, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.optional(S.String), Disks: S.optional(__S(626, __c78, 2)) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListLocalDisksOutput" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceARN: S.String,
          Marker: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceARN: S.optional(S.String),
          Marker: S.optional(S.String),
          Tags: S.optional(__S(241, __c30, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "ListTagsForResourceOutput" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PoolARNs: S.optional(__S(368, __c46, 0)),
          Marker: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTapePoolsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PoolARN: S.optional(S.String),
          PoolName: S.optional(S.String),
          StorageClass: S.optional(S.String),
          RetentionLockType: S.optional(S.String),
          RetentionLockTimeInDays: S.optional(S.Number),
          PoolStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "PoolInfo" });
    case 2:
      return S.Array(__S(641, __c80, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ PoolInfos: S.optional(__S(642, __c80, 2)), Marker: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListTapePoolsOutput" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TapeARNs: S.optional(__S(368, __c46, 0)),
          Marker: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTapesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TapeARN: S.optional(S.String),
          TapeBarcode: S.optional(S.String),
          TapeSizeInBytes: S.optional(S.Number),
          TapeStatus: S.optional(S.String),
          GatewayARN: S.optional(S.String),
          PoolId: S.optional(S.String),
          RetentionStartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          PoolEntryDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "TapeInfo" });
    case 2:
      return S.Array(__S(649, __c81, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ TapeInfos: S.optional(__S(650, __c81, 2)), Marker: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListTapesOutput" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VolumeARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListVolumeInitiatorsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Initiators: S.optional(__S(368, __c46, 0)) }).pipe(ns),
      ).annotate({ identifier: "ListVolumeInitiatorsOutput" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String, DiskIds: __S(368, __c46, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AddWorkingStorageInput" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListVolumeRecoveryPointsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VolumeARN: S.optional(S.String),
          VolumeSizeInBytes: S.optional(S.Number),
          VolumeUsageInBytes: S.optional(S.Number),
          VolumeRecoveryPointTime: S.optional(S.String),
        }),
      ).annotate({ identifier: "VolumeRecoveryPointInfo" });
    case 2:
      return S.Array(__S(673, __c84, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.optional(S.String),
          VolumeRecoveryPointInfos: S.optional(__S(674, __c84, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ListVolumeRecoveryPointsOutput" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.optional(S.String),
          Marker: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListVolumesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VolumeARN: S.optional(S.String),
          VolumeId: S.optional(S.String),
          GatewayARN: S.optional(S.String),
          GatewayId: S.optional(S.String),
          VolumeType: S.optional(S.String),
          VolumeSizeInBytes: S.optional(S.Number),
          VolumeAttachmentStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "VolumeInfo" });
    case 2:
      return S.Array(__S(681, __c85, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.optional(S.String),
          Marker: S.optional(S.String),
          VolumeInfos: S.optional(__S(682, __c85, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ListVolumesOutput" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FileShareARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "NotifyWhenUploadedInput" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FileShareARN: S.optional(S.String), NotificationId: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "NotifyWhenUploadedOutput" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FileShareARN: S.String,
          FolderList: S.optional(__S(368, __c46, 0)),
          Recursive: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RefreshCacheInput" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, TagKeys: __S(368, __c46, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RemoveTagsFromResourceInput" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ResetCacheInput" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TapeARN: S.String, GatewayARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RetrieveTapeArchiveInput" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TapeARN: S.String, GatewayARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RetrieveTapeRecoveryPointInput" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String, LocalConsolePassword: SensitiveString }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SetLocalConsolePasswordInput" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String, Password: SensitiveString }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SetSMBGuestPasswordInput" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TapeARN: S.String,
          PoolId: S.String,
          BypassGovernanceRetention: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AssignTapePoolInput" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ TapeARN: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "AssignTapePoolOutput",
      });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ShutdownGatewayInput" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartAvailabilityMonitorTestInput" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FileShareARN: S.String,
          Role: S.String,
          LocationARN: S.String,
          BucketRegion: S.String,
          VPCEndpointDNSName: S.optional(S.String),
          InclusionFilters: S.optional(__S(353, __c44, 1)),
          ExclusionFilters: S.optional(__S(353, __c44, 1)),
          ClientToken: S.String,
          Tags: S.optional(__S(241, __c30, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartCacheReportInput" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartGatewayInput" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AutomaticTapeCreationRules: __S(585, __c73, 1), GatewayARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateAutomaticTapeCreationPolicyInput" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.String,
          AverageUploadRateLimitInBitsPerSec: S.optional(S.Number),
          AverageDownloadRateLimitInBitsPerSec: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateBandwidthRateLimitInput" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String, BandwidthRateLimitIntervals: __S(306, __c38, 2) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateBandwidthRateLimitScheduleInput" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TargetARN: S.String,
          SecretToAuthenticateInitiator: SensitiveString,
          InitiatorName: S.String,
          SecretToAuthenticateTarget: S.optional(SensitiveString),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateChapCredentialsInput" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FileSystemAssociationARN: S.String,
          UserName: S.optional(S.String),
          Password: S.optional(SensitiveString),
          AuditDestinationARN: S.optional(S.String),
          CacheAttributes: S.optional(__S(864, __c108, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateFileSystemAssociationInput" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.String,
          GatewayName: S.optional(S.String),
          GatewayTimezone: S.optional(S.String),
          CloudWatchLogGroupARN: S.optional(S.String),
          GatewayCapacity: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateGatewayInformationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.optional(S.String), GatewayName: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "UpdateGatewayInformationOutput" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserName: S.String,
          Password: SensitiveString,
          ClientToken: S.String,
          GatewayARN: S.String,
          LocationARN: S.String,
          Tags: S.optional(__S(241, __c30, 1)),
          AuditDestinationARN: S.optional(S.String),
          CacheAttributes: S.optional(__S(864, __c108, 0)),
          EndpointNetworkConfiguration: S.optional(__S(872, __c109, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AssociateFileSystemInput" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CacheStaleTimeoutInSeconds: S.optional(S.Number) }),
      ).annotate({ identifier: "CacheAttributes" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ IpAddresses: S.optional(__S(368, __c46, 0)) })).annotate({
        identifier: "EndpointNetworkConfiguration",
      });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FileSystemAssociationARN: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "AssociateFileSystemOutput" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateGatewaySoftwareNowInput" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GatewayARN: S.String,
          HourOfDay: S.optional(S.Number),
          MinuteOfHour: S.optional(S.Number),
          DayOfWeek: S.optional(S.Number),
          DayOfMonth: S.optional(S.Number),
          SoftwareUpdatePreferences: S.optional(__S(408, __c51, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateMaintenanceStartTimeInput" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FileShareARN: S.String,
          EncryptionType: S.optional(S.String),
          KMSEncrypted: S.optional(S.Boolean),
          KMSKey: S.optional(S.String),
          NFSFileShareDefaults: S.optional(__S(80, __c10, 0)),
          DefaultStorageClass: S.optional(S.String),
          ObjectACL: S.optional(S.String),
          ClientList: S.optional(__S(368, __c46, 0)),
          Squash: S.optional(S.String),
          ReadOnly: S.optional(S.Boolean),
          GuessMIMETypeEnabled: S.optional(S.Boolean),
          RequesterPays: S.optional(S.Boolean),
          FileShareName: S.optional(S.String),
          CacheAttributes: S.optional(__S(864, __c108, 0)),
          NotificationPolicy: S.optional(S.String),
          AuditDestinationARN: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateNFSFileShareInput" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FileShareARN: S.String,
          EncryptionType: S.optional(S.String),
          KMSEncrypted: S.optional(S.Boolean),
          KMSKey: S.optional(S.String),
          DefaultStorageClass: S.optional(S.String),
          ObjectACL: S.optional(S.String),
          ReadOnly: S.optional(S.Boolean),
          GuessMIMETypeEnabled: S.optional(S.Boolean),
          RequesterPays: S.optional(S.Boolean),
          SMBACLEnabled: S.optional(S.Boolean),
          AccessBasedEnumeration: S.optional(S.Boolean),
          AdminUserList: S.optional(__S(368, __c46, 0)),
          ValidUserList: S.optional(__S(368, __c46, 0)),
          InvalidUserList: S.optional(__S(368, __c46, 0)),
          AuditDestinationARN: S.optional(S.String),
          CaseSensitivity: S.optional(S.String),
          FileShareName: S.optional(S.String),
          CacheAttributes: S.optional(__S(864, __c108, 0)),
          NotificationPolicy: S.optional(S.String),
          OplocksEnabled: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateSMBFileShareInput" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String, FileSharesVisible: S.Boolean }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateSMBFileShareVisibilityInput" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String, SMBLocalGroups: __S(440, __c55, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateSMBLocalGroupsInput" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GatewayARN: S.String, SMBSecurityStrategy: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateSMBSecurityStrategyInput" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VolumeARN: S.String,
          StartAt: S.Number,
          RecurrenceInHours: S.Number,
          Description: S.optional(S.String),
          Tags: S.optional(__S(241, __c30, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateSnapshotScheduleInput" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VTLDeviceARN: S.String, DeviceType: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateVTLDeviceTypeInput" });
    case 1:
      return S.suspend(() => S.Struct({ VTLDeviceARN: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "UpdateVTLDeviceTypeOutput",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
