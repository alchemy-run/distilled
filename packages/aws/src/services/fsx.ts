import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "FSx",
  target: "AWSSimbaAPIService_v20180301",
  version: "2018-03-01",
  sigv4: "fsx",
  protocol: awsJson1_1Protocol,
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
                `https://fsx-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://fsx-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://fsx.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://fsx.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessPointAlreadyOwnedByYou
  extends /*@__PURE__*/ TE.TaggedError(
    "AccessPointAlreadyOwnedByYou",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly ErrorCode?: string; readonly message?: string }> {}
export class ActiveDirectoryError
  extends /*@__PURE__*/ TE.TaggedError("ActiveDirectoryError")<{
    readonly ActiveDirectoryId?: string;
    readonly Type?: ActiveDirectoryErrorType;
    readonly message?: string;
  }> {}
export class BackupBeingCopied
  extends /*@__PURE__*/ TE.TaggedError("BackupBeingCopied")<{
    readonly message?: string;
    readonly BackupId?: string;
  }> {}
export class BackupInProgress
  extends /*@__PURE__*/ TE.TaggedError("BackupInProgress")<{
    readonly message?: string;
  }> {}
export class BackupNotFound
  extends /*@__PURE__*/ TE.TaggedError("BackupNotFound")<{
    readonly message?: string;
  }> {}
export class BackupRestoring
  extends /*@__PURE__*/ TE.TaggedError("BackupRestoring")<{
    readonly message?: string;
    readonly FileSystemId?: string;
  }> {}
export class BadRequest
  extends /*@__PURE__*/ TE.TaggedError("BadRequest")<{
    readonly message?: string;
  }> {}
export class DataRepositoryAssociationNotFound
  extends /*@__PURE__*/ TE.TaggedError("DataRepositoryAssociationNotFound")<{
    readonly message?: string;
  }> {}
export class DataRepositoryTaskEnded
  extends /*@__PURE__*/ TE.TaggedError("DataRepositoryTaskEnded")<{
    readonly message?: string;
  }> {}
export class DataRepositoryTaskExecuting
  extends /*@__PURE__*/ TE.TaggedError("DataRepositoryTaskExecuting")<{
    readonly message?: string;
  }> {}
export class DataRepositoryTaskNotFound
  extends /*@__PURE__*/ TE.TaggedError("DataRepositoryTaskNotFound")<{
    readonly message?: string;
  }> {}
export class FileCacheNotFound
  extends /*@__PURE__*/ TE.TaggedError("FileCacheNotFound")<{
    readonly message?: string;
  }> {}
export class FileSystemNotFound
  extends /*@__PURE__*/ TE.TaggedError("FileSystemNotFound")<{
    readonly message?: string;
  }> {}
export class IncompatibleParameterError
  extends /*@__PURE__*/ TE.TaggedError("IncompatibleParameterError")<{
    readonly Parameter?: string;
    readonly message?: string;
  }> {}
export class IncompatibleRegionForMultiAZ
  extends /*@__PURE__*/ TE.TaggedError("IncompatibleRegionForMultiAZ")<{
    readonly message?: string;
  }> {}
export class InternalServerError
  extends /*@__PURE__*/ TE.TaggedError("InternalServerError")<{
    readonly message?: string;
  }> {}
export class InvalidAccessPoint
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidAccessPoint",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly ErrorCode?: string; readonly message?: string }> {}
export class InvalidDataRepositoryType
  extends /*@__PURE__*/ TE.TaggedError("InvalidDataRepositoryType")<{
    readonly message?: string;
  }> {}
export class InvalidDestinationKmsKey
  extends /*@__PURE__*/ TE.TaggedError("InvalidDestinationKmsKey")<{
    readonly message?: string;
  }> {}
export class InvalidExportPath
  extends /*@__PURE__*/ TE.TaggedError("InvalidExportPath")<{
    readonly message?: string;
  }> {}
export class InvalidImportPath
  extends /*@__PURE__*/ TE.TaggedError("InvalidImportPath")<{
    readonly message?: string;
  }> {}
export class InvalidNetworkSettings
  extends /*@__PURE__*/ TE.TaggedError("InvalidNetworkSettings")<{
    readonly message?: string;
    readonly InvalidSubnetId?: string;
    readonly InvalidSecurityGroupId?: string;
    readonly InvalidRouteTableId?: string;
  }> {}
export class InvalidPerUnitStorageThroughput
  extends /*@__PURE__*/ TE.TaggedError("InvalidPerUnitStorageThroughput")<{
    readonly message?: string;
  }> {}
export class InvalidRegion
  extends /*@__PURE__*/ TE.TaggedError("InvalidRegion")<{
    readonly message?: string;
  }> {}
export class InvalidRequest
  extends /*@__PURE__*/ TE.TaggedError("InvalidRequest", ["BadRequestError"], {
    status: 400,
  })<{ readonly ErrorCode?: string; readonly message?: string }> {}
export class InvalidSourceKmsKey
  extends /*@__PURE__*/ TE.TaggedError("InvalidSourceKmsKey")<{
    readonly message?: string;
  }> {}
export class MissingFileCacheConfiguration
  extends /*@__PURE__*/ TE.TaggedError("MissingFileCacheConfiguration")<{
    readonly message?: string;
  }> {}
export class MissingFileSystemConfiguration
  extends /*@__PURE__*/ TE.TaggedError("MissingFileSystemConfiguration")<{
    readonly message?: string;
  }> {}
export class MissingVolumeConfiguration
  extends /*@__PURE__*/ TE.TaggedError("MissingVolumeConfiguration")<{
    readonly message?: string;
  }> {}
export class NotServiceResourceError
  extends /*@__PURE__*/ TE.TaggedError("NotServiceResourceError")<{
    readonly ResourceARN?: string;
    readonly message?: string;
  }> {}
export class ResourceDoesNotSupportTagging
  extends /*@__PURE__*/ TE.TaggedError("ResourceDoesNotSupportTagging")<{
    readonly ResourceARN?: string;
    readonly message?: string;
  }> {}
export class ResourceNotFound
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFound")<{
    readonly ResourceARN?: string;
    readonly message?: string;
  }> {}
export class RestoreSnapshotNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "RestoreSnapshotNotFound",
    ["NotFoundError"],
    {
      synthetic: {
        from: "BadRequest",
        message: { includes: "snapshot cannot be found" },
      },
    },
  )<{ readonly message?: string }> {}
export class S3AccessPointAttachmentNotFound
  extends /*@__PURE__*/ TE.TaggedError("S3AccessPointAttachmentNotFound")<{
    readonly message?: string;
  }> {}
export class ServiceLimitExceeded
  extends /*@__PURE__*/ TE.TaggedError("ServiceLimitExceeded", [
    "ThrottlingError",
  ])<{ readonly Limit?: ServiceLimit; readonly message?: string }> {}
export class SnapshotNotFound
  extends /*@__PURE__*/ TE.TaggedError("SnapshotNotFound")<{
    readonly message?: string;
  }> {}
export class SnapshotVolumeNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "SnapshotVolumeNotFound",
    ["NotFoundError"],
    {
      synthetic: {
        from: "BadRequest",
        message: { includes: "volume was not found" },
      },
    },
  )<{ readonly message?: string }> {}
export class SourceBackupUnavailable
  extends /*@__PURE__*/ TE.TaggedError("SourceBackupUnavailable")<{
    readonly message?: string;
    readonly BackupId?: string;
  }> {}
export class SourceSnapshotNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "SourceSnapshotNotFound",
    ["NotFoundError"],
    {
      synthetic: {
        from: "BadRequest",
        message: { includes: "SourceSnapshotARN provided is not a valid ARN" },
      },
    },
  )<{ readonly message?: string }> {}
export class StorageVirtualMachineNotFound
  extends /*@__PURE__*/ TE.TaggedError("StorageVirtualMachineNotFound")<{
    readonly message?: string;
  }> {}
export class TooManyAccessPoints
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyAccessPoints",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly ErrorCode?: string; readonly message?: string }> {}
export class UnsupportedOperation
  extends /*@__PURE__*/ TE.TaggedError("UnsupportedOperation")<{
    readonly message?: string;
  }> {}
export class UpdateSnapshotNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "UpdateSnapshotNotFound",
    ["NotFoundError"],
    {
      synthetic: {
        from: "BadRequest",
        message: { includes: "the snapshot is not found" },
      },
    },
  )<{ readonly message?: string }> {}
export class VolumeNotFound
  extends /*@__PURE__*/ TE.TaggedError("VolumeNotFound")<{
    readonly message?: string;
  }> {}
export type ClientRequestToken = string;
export type FileSystemId = string;
export type AlternateDNSName = string;
export type AlternateDNSNames = string[];
export interface AssociateFileSystemAliasesRequest {
  ClientRequestToken?: string;
  FileSystemId?: string;
  Aliases?: string[];
}
export type AliasLifecycle =
  | "AVAILABLE"
  | "CREATING"
  | "DELETING"
  | "CREATE_FAILED"
  | "DELETE_FAILED"
  | (string & {});
export interface Alias {
  Name?: string;
  Lifecycle?: AliasLifecycle;
}
export type Aliases = Alias[];
export interface AssociateFileSystemAliasesResponse {
  Aliases?: Alias[];
}
export type TaskId = string;
export interface CancelDataRepositoryTaskRequest {
  TaskId?: string;
}
export type DataRepositoryTaskLifecycle =
  | "PENDING"
  | "EXECUTING"
  | "FAILED"
  | "SUCCEEDED"
  | "CANCELED"
  | "CANCELING"
  | (string & {});
export interface CancelDataRepositoryTaskResponse {
  Lifecycle?: DataRepositoryTaskLifecycle;
  TaskId?: string;
}
export type SourceBackupId = string;
export type Region = string;
export type KmsKeyId = string;
export type Flag = boolean;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export type Tags = Tag[];
export interface CopyBackupRequest {
  ClientRequestToken?: string;
  SourceBackupId?: string;
  SourceRegion?: string;
  KmsKeyId?: string;
  CopyTags?: boolean;
  Tags?: Tag[];
}
export type BackupId = string;
export type BackupLifecycle =
  | "AVAILABLE"
  | "CREATING"
  | "TRANSFERRING"
  | "DELETED"
  | "FAILED"
  | "PENDING"
  | "COPYING"
  | (string & {});
export type ErrorMessage = string;
export interface BackupFailureDetails {
  Message?: string;
}
export type BackupType =
  | "AUTOMATIC"
  | "USER_INITIATED"
  | "AWS_BACKUP"
  | (string & {});
export type ProgressPercent = number;
export type CreationTime = Date;
export type ResourceARN = string;
export type AWSAccountId = string;
export type FileSystemType =
  | "WINDOWS"
  | "LUSTRE"
  | "ONTAP"
  | "OPENZFS"
  | (string & {});
export type FileSystemLifecycle =
  | "AVAILABLE"
  | "CREATING"
  | "FAILED"
  | "DELETING"
  | "MISCONFIGURED"
  | "UPDATING"
  | "MISCONFIGURED_UNAVAILABLE"
  | (string & {});
export interface FileSystemFailureDetails {
  Message?: string;
}
export type StorageCapacity = number;
export type StorageType = "SSD" | "HDD" | "INTELLIGENT_TIERING" | (string & {});
export type VpcId = string;
export type SubnetId = string;
export type SubnetIds = string[];
export type NetworkInterfaceId = string;
export type NetworkInterfaceIds = string[];
export type DNSName = string;
export type DirectoryId = string;
export type ActiveDirectoryFullyQualifiedName = string;
export type OrganizationalUnitDistinguishedName = string;
export type FileSystemAdministratorsGroupName = string;
export type DirectoryUserName = string;
export type IpAddress = string;
export type DnsIps = string[];
export type CustomerSecretsManagerARN = string;
export interface SelfManagedActiveDirectoryAttributes {
  DomainName?: string;
  OrganizationalUnitDistinguishedName?: string;
  FileSystemAdministratorsGroup?: string;
  UserName?: string;
  DnsIps?: string[];
  DomainJoinServiceAccountSecret?: string;
}
export type WindowsDeploymentType =
  | "MULTI_AZ_1"
  | "SINGLE_AZ_1"
  | "SINGLE_AZ_2"
  | (string & {});
export type MegabytesPerSecond = number;
export type FileSystemMaintenanceOperation =
  | "PATCHING"
  | "BACKING_UP"
  | (string & {});
export type FileSystemMaintenanceOperations = FileSystemMaintenanceOperation[];
export type WeeklyTime = string;
export type DailyTime = string;
export type AutomaticBackupRetentionDays = number;
export type WindowsAccessAuditLogLevel =
  | "DISABLED"
  | "SUCCESS_ONLY"
  | "FAILURE_ONLY"
  | "SUCCESS_AND_FAILURE"
  | (string & {});
export type GeneralARN = string;
export interface WindowsAuditLogConfiguration {
  FileAccessAuditLogLevel?: WindowsAccessAuditLogLevel;
  FileShareAccessAuditLogLevel?: WindowsAccessAuditLogLevel;
  AuditLogDestination?: string;
}
export type DiskIopsConfigurationMode =
  | "AUTOMATIC"
  | "USER_PROVISIONED"
  | (string & {});
export type Iops = number;
export interface DiskIopsConfiguration {
  Mode?: DiskIopsConfigurationMode;
  Iops?: number;
}
export interface WindowsFsrmConfiguration {
  FsrmServiceEnabled?: boolean;
  EventLogDestination?: string;
}
export interface WindowsFileSystemConfiguration {
  ActiveDirectoryId?: string;
  SelfManagedActiveDirectoryConfiguration?: SelfManagedActiveDirectoryAttributes;
  DeploymentType?: WindowsDeploymentType;
  RemoteAdministrationEndpoint?: string;
  PreferredSubnetId?: string;
  PreferredFileServerIp?: string;
  ThroughputCapacity?: number;
  MaintenanceOperationsInProgress?: FileSystemMaintenanceOperation[];
  WeeklyMaintenanceStartTime?: string;
  DailyAutomaticBackupStartTime?: string;
  AutomaticBackupRetentionDays?: number;
  CopyTagsToBackups?: boolean;
  Aliases?: Alias[];
  AuditLogConfiguration?: WindowsAuditLogConfiguration;
  DiskIopsConfiguration?: DiskIopsConfiguration;
  PreferredFileServerIpv6?: string;
  FsrmConfiguration?: WindowsFsrmConfiguration;
}
export type DataRepositoryLifecycle =
  | "CREATING"
  | "AVAILABLE"
  | "MISCONFIGURED"
  | "UPDATING"
  | "DELETING"
  | "FAILED"
  | (string & {});
export type ArchivePath = string;
export type Megabytes = number;
export type AutoImportPolicyType =
  | "NONE"
  | "NEW"
  | "NEW_CHANGED"
  | "NEW_CHANGED_DELETED"
  | (string & {});
export interface DataRepositoryFailureDetails {
  Message?: string;
}
export interface DataRepositoryConfiguration {
  Lifecycle?: DataRepositoryLifecycle;
  ImportPath?: string;
  ExportPath?: string;
  ImportedFileChunkSize?: number;
  AutoImportPolicy?: AutoImportPolicyType;
  FailureDetails?: DataRepositoryFailureDetails;
}
export type LustreDeploymentType =
  | "SCRATCH_1"
  | "SCRATCH_2"
  | "PERSISTENT_1"
  | "PERSISTENT_2"
  | (string & {});
export type PerUnitStorageThroughput = number;
export type LustreFileSystemMountName = string;
export type DriveCacheType = "NONE" | "READ" | (string & {});
export type DataCompressionType = "NONE" | "LZ4" | (string & {});
export type LustreAccessAuditLogLevel =
  | "DISABLED"
  | "WARN_ONLY"
  | "ERROR_ONLY"
  | "WARN_ERROR"
  | (string & {});
export interface LustreLogConfiguration {
  Level?: LustreAccessAuditLogLevel;
  Destination?: string;
}
export type LustreRootSquash = string;
export type LustreNoSquashNid = string;
export type LustreNoSquashNids = string[];
export interface LustreRootSquashConfiguration {
  RootSquash?: string;
  NoSquashNids?: string[];
}
export type MetadataIops = number;
export type MetadataConfigurationMode =
  | "AUTOMATIC"
  | "USER_PROVISIONED"
  | (string & {});
export interface FileSystemLustreMetadataConfiguration {
  Iops?: number;
  Mode?: MetadataConfigurationMode;
}
export type ThroughputCapacityMbps = number;
export type LustreReadCacheSizingMode =
  | "NO_CACHE"
  | "USER_PROVISIONED"
  | "PROPORTIONAL_TO_THROUGHPUT_CAPACITY"
  | (string & {});
export interface LustreReadCacheConfiguration {
  SizingMode?: LustreReadCacheSizingMode;
  SizeGiB?: number;
}
export interface LustreFileSystemConfiguration {
  WeeklyMaintenanceStartTime?: string;
  DataRepositoryConfiguration?: DataRepositoryConfiguration;
  DeploymentType?: LustreDeploymentType;
  PerUnitStorageThroughput?: number;
  MountName?: string;
  DailyAutomaticBackupStartTime?: string;
  AutomaticBackupRetentionDays?: number;
  CopyTagsToBackups?: boolean;
  DriveCacheType?: DriveCacheType;
  DataCompressionType?: DataCompressionType;
  LogConfiguration?: LustreLogConfiguration;
  RootSquashConfiguration?: LustreRootSquashConfiguration;
  MetadataConfiguration?: FileSystemLustreMetadataConfiguration;
  EfaEnabled?: boolean;
  ThroughputCapacity?: number;
  DataReadCacheConfiguration?: LustreReadCacheConfiguration;
}
export type AdministrativeActionType =
  | "FILE_SYSTEM_UPDATE"
  | "STORAGE_OPTIMIZATION"
  | "FILE_SYSTEM_ALIAS_ASSOCIATION"
  | "FILE_SYSTEM_ALIAS_DISASSOCIATION"
  | "VOLUME_UPDATE"
  | "SNAPSHOT_UPDATE"
  | "RELEASE_NFS_V3_LOCKS"
  | "VOLUME_RESTORE"
  | "THROUGHPUT_OPTIMIZATION"
  | "IOPS_OPTIMIZATION"
  | "STORAGE_TYPE_OPTIMIZATION"
  | "MISCONFIGURED_STATE_RECOVERY"
  | "VOLUME_UPDATE_WITH_SNAPSHOT"
  | "VOLUME_INITIALIZE_WITH_SNAPSHOT"
  | "DOWNLOAD_DATA_FROM_BACKUP"
  | (string & {});
export type RequestTime = Date;
export type Status =
  | "FAILED"
  | "IN_PROGRESS"
  | "PENDING"
  | "COMPLETED"
  | "UPDATED_OPTIMIZING"
  | "OPTIMIZING"
  | "PAUSED"
  | "CANCELLED"
  | (string & {});
export interface AdministrativeActionFailureDetails {
  Message?: string;
}
export type VolumeLifecycle =
  | "CREATING"
  | "CREATED"
  | "DELETING"
  | "FAILED"
  | "MISCONFIGURED"
  | "PENDING"
  | "AVAILABLE"
  | (string & {});
export type VolumeName = string;
export type FlexCacheEndpointType = "NONE" | "ORIGIN" | "CACHE" | (string & {});
export type JunctionPath = string;
export type SecurityStyle = "UNIX" | "NTFS" | "MIXED" | (string & {});
export type VolumeCapacity = number;
export type StorageVirtualMachineId = string;
export type CoolingPeriod = number;
export type TieringPolicyName =
  | "SNAPSHOT_ONLY"
  | "AUTO"
  | "ALL"
  | "NONE"
  | (string & {});
export interface TieringPolicy {
  CoolingPeriod?: number;
  Name?: TieringPolicyName;
}
export type UUID = string;
export type OntapVolumeType = "RW" | "DP" | "LS" | (string & {});
export type SnapshotPolicy = string;
export type AutocommitPeriodType =
  | "MINUTES"
  | "HOURS"
  | "DAYS"
  | "MONTHS"
  | "YEARS"
  | "NONE"
  | (string & {});
export type AutocommitPeriodValue = number;
export interface AutocommitPeriod {
  Type?: AutocommitPeriodType;
  Value?: number;
}
export type PrivilegedDelete =
  | "DISABLED"
  | "ENABLED"
  | "PERMANENTLY_DISABLED"
  | (string & {});
export type RetentionPeriodType =
  | "SECONDS"
  | "MINUTES"
  | "HOURS"
  | "DAYS"
  | "MONTHS"
  | "YEARS"
  | "INFINITE"
  | "UNSPECIFIED"
  | (string & {});
export type RetentionPeriodValue = number;
export interface RetentionPeriod {
  Type?: RetentionPeriodType;
  Value?: number;
}
export interface SnaplockRetentionPeriod {
  DefaultRetention?: RetentionPeriod;
  MinimumRetention?: RetentionPeriod;
  MaximumRetention?: RetentionPeriod;
}
export type SnaplockType = "COMPLIANCE" | "ENTERPRISE" | (string & {});
export interface SnaplockConfiguration {
  AuditLogVolume?: boolean;
  AutocommitPeriod?: AutocommitPeriod;
  PrivilegedDelete?: PrivilegedDelete;
  RetentionPeriod?: SnaplockRetentionPeriod;
  SnaplockType?: SnaplockType;
  VolumeAppendModeEnabled?: boolean;
}
export type VolumeStyle = "FLEXVOL" | "FLEXGROUP" | (string & {});
export type Aggregate = string;
export type Aggregates = string[];
export type TotalConstituents = number;
export interface AggregateConfiguration {
  Aggregates?: string[];
  TotalConstituents?: number;
}
export type VolumeCapacityBytes = number;
export interface OntapVolumeConfiguration {
  FlexCacheEndpointType?: FlexCacheEndpointType;
  JunctionPath?: string;
  SecurityStyle?: SecurityStyle;
  SizeInMegabytes?: number;
  StorageEfficiencyEnabled?: boolean;
  StorageVirtualMachineId?: string;
  StorageVirtualMachineRoot?: boolean;
  TieringPolicy?: TieringPolicy;
  UUID?: string;
  OntapVolumeType?: OntapVolumeType;
  SnapshotPolicy?: string;
  CopyTagsToBackups?: boolean;
  SnaplockConfiguration?: SnaplockConfiguration;
  VolumeStyle?: VolumeStyle;
  AggregateConfiguration?: AggregateConfiguration;
  SizeInBytes?: number;
}
export type VolumeId = string;
export type VolumeType = "ONTAP" | "OPENZFS" | (string & {});
export interface LifecycleTransitionReason {
  Message?: string;
}
export type VolumePath = string;
export type IntegerNoMax = number;
export type IntegerRecordSizeKiB = number;
export type OpenZFSDataCompressionType =
  | "NONE"
  | "ZSTD"
  | "LZ4"
  | (string & {});
export type OpenZFSCopyStrategy =
  | "CLONE"
  | "FULL_COPY"
  | "INCREMENTAL_COPY"
  | (string & {});
export interface OpenZFSOriginSnapshotConfiguration {
  SnapshotARN?: string;
  CopyStrategy?: OpenZFSCopyStrategy;
}
export type ReadOnly = boolean;
export type OpenZFSClients = string;
export type OpenZFSNfsExportOption = string;
export type OpenZFSNfsExportOptions = string[];
export interface OpenZFSClientConfiguration {
  Clients?: string;
  Options?: string[];
}
export type OpenZFSClientConfigurations = OpenZFSClientConfiguration[];
export interface OpenZFSNfsExport {
  ClientConfigurations?: OpenZFSClientConfiguration[];
}
export type OpenZFSNfsExports = OpenZFSNfsExport[];
export type OpenZFSQuotaType = "USER" | "GROUP" | (string & {});
export interface OpenZFSUserOrGroupQuota {
  Type?: OpenZFSQuotaType;
  Id?: number;
  StorageCapacityQuotaGiB?: number;
}
export type OpenZFSUserAndGroupQuotas = OpenZFSUserOrGroupQuota[];
export type SnapshotId = string;
export interface OpenZFSVolumeConfiguration {
  ParentVolumeId?: string;
  VolumePath?: string;
  StorageCapacityReservationGiB?: number;
  StorageCapacityQuotaGiB?: number;
  RecordSizeKiB?: number;
  DataCompressionType?: OpenZFSDataCompressionType;
  CopyTagsToSnapshots?: boolean;
  OriginSnapshot?: OpenZFSOriginSnapshotConfiguration;
  ReadOnly?: boolean;
  NfsExports?: OpenZFSNfsExport[];
  UserAndGroupQuotas?: OpenZFSUserOrGroupQuota[];
  RestoreToSnapshot?: string;
  DeleteIntermediateSnaphots?: boolean;
  DeleteClonedVolumes?: boolean;
  DeleteIntermediateData?: boolean;
  SourceSnapshotARN?: string;
  DestinationSnapshot?: string;
  CopyStrategy?: OpenZFSCopyStrategy;
}
export interface Volume {
  CreationTime?: Date;
  FileSystemId?: string;
  Lifecycle?: VolumeLifecycle;
  Name?: string;
  OntapConfiguration?: OntapVolumeConfiguration;
  ResourceARN?: string;
  Tags?: Tag[];
  VolumeId?: string;
  VolumeType?: VolumeType;
  LifecycleTransitionReason?: LifecycleTransitionReason;
  AdministrativeActions?: AdministrativeAction[];
  OpenZFSConfiguration?: OpenZFSVolumeConfiguration;
}
export type SnapshotName = string;
export type SnapshotLifecycle =
  | "PENDING"
  | "CREATING"
  | "DELETING"
  | "AVAILABLE"
  | (string & {});
export interface Snapshot {
  ResourceARN?: string;
  SnapshotId?: string;
  Name?: string;
  VolumeId?: string;
  CreationTime?: Date;
  Lifecycle?: SnapshotLifecycle;
  LifecycleTransitionReason?: LifecycleTransitionReason;
  Tags?: Tag[];
  AdministrativeActions?: AdministrativeAction[];
}
export type TotalTransferBytes = number;
export type RemainingTransferBytes = number;
export interface AdministrativeAction {
  AdministrativeActionType?: AdministrativeActionType;
  ProgressPercent?: number;
  RequestTime?: Date;
  Status?: Status;
  TargetFileSystemValues?: FileSystem;
  FailureDetails?: AdministrativeActionFailureDetails;
  TargetVolumeValues?: Volume;
  TargetSnapshotValues?: Snapshot;
  TotalTransferBytes?: number;
  RemainingTransferBytes?: number;
  Message?: string;
}
export type AdministrativeActions = AdministrativeAction[];
export type OntapDeploymentType =
  | "MULTI_AZ_1"
  | "SINGLE_AZ_1"
  | "SINGLE_AZ_2"
  | "MULTI_AZ_2"
  | (string & {});
export type IpAddressRange = string;
export type OntapEndpointIpAddresses = string[];
export interface FileSystemEndpoint {
  DNSName?: string;
  IpAddresses?: string[];
  Ipv6Addresses?: string[];
}
export interface FileSystemEndpoints {
  Intercluster?: FileSystemEndpoint;
  Management?: FileSystemEndpoint;
}
export type RouteTableId = string;
export type RouteTableIds = string[];
export type AdminPassword = string | redacted.Redacted<string>;
export type HAPairs = number;
export type ThroughputCapacityPerHAPair = number;
export type Ipv6AddressRange = string;
export interface OntapFileSystemConfiguration {
  AutomaticBackupRetentionDays?: number;
  DailyAutomaticBackupStartTime?: string;
  DeploymentType?: OntapDeploymentType;
  EndpointIpAddressRange?: string;
  Endpoints?: FileSystemEndpoints;
  DiskIopsConfiguration?: DiskIopsConfiguration;
  PreferredSubnetId?: string;
  RouteTableIds?: string[];
  ThroughputCapacity?: number;
  WeeklyMaintenanceStartTime?: string;
  FsxAdminPassword?: string | redacted.Redacted<string>;
  HAPairs?: number;
  ThroughputCapacityPerHAPair?: number;
  EndpointIpv6AddressRange?: string;
}
export type FileSystemTypeVersion = string;
export type OpenZFSDeploymentType =
  | "SINGLE_AZ_1"
  | "SINGLE_AZ_2"
  | "SINGLE_AZ_HA_1"
  | "SINGLE_AZ_HA_2"
  | "MULTI_AZ_1"
  | (string & {});
export type OpenZFSReadCacheSizingMode =
  | "NO_CACHE"
  | "USER_PROVISIONED"
  | "PROPORTIONAL_TO_THROUGHPUT_CAPACITY"
  | (string & {});
export interface OpenZFSReadCacheConfiguration {
  SizingMode?: OpenZFSReadCacheSizingMode;
  SizeGiB?: number;
}
export interface OpenZFSFileSystemConfiguration {
  AutomaticBackupRetentionDays?: number;
  CopyTagsToBackups?: boolean;
  CopyTagsToVolumes?: boolean;
  DailyAutomaticBackupStartTime?: string;
  DeploymentType?: OpenZFSDeploymentType;
  ThroughputCapacity?: number;
  WeeklyMaintenanceStartTime?: string;
  DiskIopsConfiguration?: DiskIopsConfiguration;
  RootVolumeId?: string;
  PreferredSubnetId?: string;
  EndpointIpAddressRange?: string;
  EndpointIpv6AddressRange?: string;
  RouteTableIds?: string[];
  EndpointIpAddress?: string;
  EndpointIpv6Address?: string;
  ReadCacheConfiguration?: OpenZFSReadCacheConfiguration;
}
export type NetworkType = "IPV4" | "DUAL" | (string & {});
export interface FileSystem {
  OwnerId?: string;
  CreationTime?: Date;
  FileSystemId?: string;
  FileSystemType?: FileSystemType;
  Lifecycle?: FileSystemLifecycle;
  FailureDetails?: FileSystemFailureDetails;
  StorageCapacity?: number;
  StorageType?: StorageType;
  VpcId?: string;
  SubnetIds?: string[];
  NetworkInterfaceIds?: string[];
  DNSName?: string;
  KmsKeyId?: string;
  ResourceARN?: string;
  Tags?: Tag[];
  WindowsConfiguration?: WindowsFileSystemConfiguration;
  LustreConfiguration?: LustreFileSystemConfiguration;
  AdministrativeActions?: AdministrativeAction[];
  OntapConfiguration?: OntapFileSystemConfiguration;
  FileSystemTypeVersion?: string;
  OpenZFSConfiguration?: OpenZFSFileSystemConfiguration;
  NetworkType?: NetworkType;
}
export interface ActiveDirectoryBackupAttributes {
  DomainName?: string;
  ActiveDirectoryId?: string;
  ResourceARN?: string;
}
export type ResourceType = "FILE_SYSTEM" | "VOLUME" | (string & {});
export type SizeInBytes = number;
export interface Backup {
  BackupId?: string;
  Lifecycle?: BackupLifecycle;
  FailureDetails?: BackupFailureDetails;
  Type?: BackupType;
  ProgressPercent?: number;
  CreationTime?: Date;
  KmsKeyId?: string;
  ResourceARN?: string;
  Tags?: Tag[];
  FileSystem?: FileSystem;
  DirectoryInformation?: ActiveDirectoryBackupAttributes;
  OwnerId?: string;
  SourceBackupId?: string;
  SourceBackupRegion?: string;
  ResourceType?: ResourceType;
  Volume?: Volume;
  SizeInBytes?: number;
}
export interface CopyBackupResponse {
  Backup?: Backup & {
    BackupId: BackupId;
    Lifecycle: BackupLifecycle;
    Type: BackupType;
    CreationTime: CreationTime;
    FileSystem: FileSystem & {
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      WindowsConfiguration: WindowsFileSystemConfiguration & {
        AuditLogConfiguration: WindowsAuditLogConfiguration & {
          FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
          FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
        };
        FsrmConfiguration: WindowsFsrmConfiguration & {
          FsrmServiceEnabled: Flag;
        };
      };
      LustreConfiguration: LustreFileSystemConfiguration & {
        LogConfiguration: LustreLogConfiguration & {
          Level: LustreAccessAuditLogLevel;
        };
        MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
          Mode: MetadataConfigurationMode;
        };
      };
      AdministrativeActions: (AdministrativeAction & {
        TargetVolumeValues: Volume & {
          OntapConfiguration: OntapVolumeConfiguration & {
            SnaplockConfiguration: SnaplockConfiguration & {
              AutocommitPeriod: AutocommitPeriod & {
                Type: AutocommitPeriodType;
              };
              RetentionPeriod: SnaplockRetentionPeriod & {
                DefaultRetention: RetentionPeriod & {
                  Type: RetentionPeriodType;
                };
                MinimumRetention: RetentionPeriod & {
                  Type: RetentionPeriodType;
                };
                MaximumRetention: RetentionPeriod & {
                  Type: RetentionPeriodType;
                };
              };
            };
          };
          Tags: (Tag & { Key: TagKey; Value: TagValue })[];
          OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
            NfsExports: (OpenZFSNfsExport & {
              ClientConfigurations: (OpenZFSClientConfiguration & {
                Clients: OpenZFSClients;
                Options: OpenZFSNfsExportOptions;
              })[];
            })[];
            UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
              Type: OpenZFSQuotaType;
              Id: IntegerNoMax;
              StorageCapacityQuotaGiB: IntegerNoMax;
            })[];
          };
        };
        TargetSnapshotValues: Snapshot & {
          Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        };
      })[];
    };
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    Volume: Volume & {
      OntapConfiguration: OntapVolumeConfiguration & {
        SnaplockConfiguration: SnaplockConfiguration & {
          AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
          RetentionPeriod: SnaplockRetentionPeriod & {
            DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
            MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
            MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
          };
        };
      };
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      AdministrativeActions: (AdministrativeAction & {
        TargetFileSystemValues: FileSystem & {
          Tags: (Tag & { Key: TagKey; Value: TagValue })[];
          WindowsConfiguration: WindowsFileSystemConfiguration & {
            AuditLogConfiguration: WindowsAuditLogConfiguration & {
              FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
              FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
            };
            FsrmConfiguration: WindowsFsrmConfiguration & {
              FsrmServiceEnabled: Flag;
            };
          };
          LustreConfiguration: LustreFileSystemConfiguration & {
            LogConfiguration: LustreLogConfiguration & {
              Level: LustreAccessAuditLogLevel;
            };
            MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
              Mode: MetadataConfigurationMode;
            };
          };
        };
        TargetSnapshotValues: Snapshot & {
          Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        };
      })[];
      OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
        NfsExports: (OpenZFSNfsExport & {
          ClientConfigurations: (OpenZFSClientConfiguration & {
            Clients: OpenZFSClients;
            Options: OpenZFSNfsExportOptions;
          })[];
        })[];
        UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
          Type: OpenZFSQuotaType;
          Id: IntegerNoMax;
          StorageCapacityQuotaGiB: IntegerNoMax;
        })[];
      };
    };
  };
}
export type UpdateOpenZFSVolumeOption =
  | "DELETE_INTERMEDIATE_SNAPSHOTS"
  | "DELETE_CLONED_VOLUMES"
  | "DELETE_INTERMEDIATE_DATA"
  | (string & {});
export type UpdateOpenZFSVolumeOptions = UpdateOpenZFSVolumeOption[];
export interface CopySnapshotAndUpdateVolumeRequest {
  ClientRequestToken?: string;
  VolumeId?: string;
  SourceSnapshotARN?: string;
  CopyStrategy?: OpenZFSCopyStrategy;
  Options?: UpdateOpenZFSVolumeOption[];
}
export interface CopySnapshotAndUpdateVolumeResponse {
  VolumeId?: string;
  Lifecycle?: VolumeLifecycle;
  AdministrativeActions?: (AdministrativeAction & {
    TargetFileSystemValues: FileSystem & {
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      WindowsConfiguration: WindowsFileSystemConfiguration & {
        AuditLogConfiguration: WindowsAuditLogConfiguration & {
          FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
          FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
        };
        FsrmConfiguration: WindowsFsrmConfiguration & {
          FsrmServiceEnabled: Flag;
        };
      };
      LustreConfiguration: LustreFileSystemConfiguration & {
        LogConfiguration: LustreLogConfiguration & {
          Level: LustreAccessAuditLogLevel;
        };
        MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
          Mode: MetadataConfigurationMode;
        };
      };
    };
    TargetVolumeValues: Volume & {
      OntapConfiguration: OntapVolumeConfiguration & {
        SnaplockConfiguration: SnaplockConfiguration & {
          AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
          RetentionPeriod: SnaplockRetentionPeriod & {
            DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
            MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
            MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
          };
        };
      };
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
        NfsExports: (OpenZFSNfsExport & {
          ClientConfigurations: (OpenZFSClientConfiguration & {
            Clients: OpenZFSClients;
            Options: OpenZFSNfsExportOptions;
          })[];
        })[];
        UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
          Type: OpenZFSQuotaType;
          Id: IntegerNoMax;
          StorageCapacityQuotaGiB: IntegerNoMax;
        })[];
      };
    };
    TargetSnapshotValues: Snapshot & {
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    };
  })[];
}
export type S3AccessPointAttachmentName = string;
export type S3AccessPointAttachmentType = "OPENZFS" | "ONTAP" | (string & {});
export type OpenZFSFileSystemUserType = "POSIX" | (string & {});
export type FileSystemUID = number;
export type FileSystemGID = number;
export type FileSystemSecondaryGIDs = number[];
export interface OpenZFSPosixFileSystemUser {
  Uid?: number;
  Gid?: number;
  SecondaryGids?: number[];
}
export interface OpenZFSFileSystemIdentity {
  Type?: OpenZFSFileSystemUserType;
  PosixUser?: OpenZFSPosixFileSystemUser;
}
export interface CreateAndAttachS3AccessPointOpenZFSConfiguration {
  VolumeId?: string;
  FileSystemIdentity?: OpenZFSFileSystemIdentity;
}
export type OntapFileSystemUserType = "UNIX" | "WINDOWS" | (string & {});
export type OntapFileSystemUserName = string;
export interface OntapUnixFileSystemUser {
  Name?: string;
}
export interface OntapWindowsFileSystemUser {
  Name?: string;
}
export interface OntapFileSystemIdentity {
  Type?: OntapFileSystemUserType;
  UnixUser?: OntapUnixFileSystemUser;
  WindowsUser?: OntapWindowsFileSystemUser;
}
export interface CreateAndAttachS3AccessPointOntapConfiguration {
  VolumeId?: string;
  FileSystemIdentity?: OntapFileSystemIdentity;
}
export interface S3AccessPointVpcConfiguration {
  VpcId?: string;
}
export type AccessPointPolicy = string;
export interface CreateAndAttachS3AccessPointS3Configuration {
  VpcConfiguration?: S3AccessPointVpcConfiguration;
  Policy?: string;
}
export interface CreateAndAttachS3AccessPointRequest {
  ClientRequestToken?: string;
  Name?: string;
  Type?: S3AccessPointAttachmentType;
  OpenZFSConfiguration?: CreateAndAttachS3AccessPointOpenZFSConfiguration;
  OntapConfiguration?: CreateAndAttachS3AccessPointOntapConfiguration;
  S3AccessPoint?: CreateAndAttachS3AccessPointS3Configuration;
}
export type S3AccessPointAttachmentLifecycle =
  | "AVAILABLE"
  | "CREATING"
  | "DELETING"
  | "UPDATING"
  | "FAILED"
  | "MISCONFIGURED"
  | (string & {});
export interface S3AccessPointOpenZFSConfiguration {
  VolumeId?: string;
  FileSystemIdentity?: OpenZFSFileSystemIdentity;
}
export interface S3AccessPointOntapConfiguration {
  VolumeId?: string;
  FileSystemIdentity?: OntapFileSystemIdentity;
}
export type S3AccessPointAlias = string;
export interface S3AccessPoint {
  ResourceARN?: string;
  Alias?: string;
  VpcConfiguration?: S3AccessPointVpcConfiguration;
}
export interface S3AccessPointAttachment {
  Lifecycle?: S3AccessPointAttachmentLifecycle;
  LifecycleTransitionReason?: LifecycleTransitionReason;
  CreationTime?: Date;
  Name?: string;
  Type?: S3AccessPointAttachmentType;
  OpenZFSConfiguration?: S3AccessPointOpenZFSConfiguration;
  OntapConfiguration?: S3AccessPointOntapConfiguration;
  S3AccessPoint?: S3AccessPoint;
}
export interface CreateAndAttachS3AccessPointResponse {
  S3AccessPointAttachment?: S3AccessPointAttachment & {
    OpenZFSConfiguration: S3AccessPointOpenZFSConfiguration & {
      FileSystemIdentity: OpenZFSFileSystemIdentity & {
        Type: OpenZFSFileSystemUserType;
        PosixUser: OpenZFSPosixFileSystemUser & {
          Uid: FileSystemUID;
          Gid: FileSystemGID;
        };
      };
    };
    OntapConfiguration: S3AccessPointOntapConfiguration & {
      FileSystemIdentity: OntapFileSystemIdentity & {
        Type: OntapFileSystemUserType;
        UnixUser: OntapUnixFileSystemUser & { Name: OntapFileSystemUserName };
        WindowsUser: OntapWindowsFileSystemUser & {
          Name: OntapFileSystemUserName;
        };
      };
    };
  };
}
export interface CreateBackupRequest {
  FileSystemId?: string;
  ClientRequestToken?: string;
  Tags?: Tag[];
  VolumeId?: string;
}
export interface CreateBackupResponse {
  Backup?: Backup & {
    BackupId: BackupId;
    Lifecycle: BackupLifecycle;
    Type: BackupType;
    CreationTime: CreationTime;
    FileSystem: FileSystem & {
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      WindowsConfiguration: WindowsFileSystemConfiguration & {
        AuditLogConfiguration: WindowsAuditLogConfiguration & {
          FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
          FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
        };
        FsrmConfiguration: WindowsFsrmConfiguration & {
          FsrmServiceEnabled: Flag;
        };
      };
      LustreConfiguration: LustreFileSystemConfiguration & {
        LogConfiguration: LustreLogConfiguration & {
          Level: LustreAccessAuditLogLevel;
        };
        MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
          Mode: MetadataConfigurationMode;
        };
      };
      AdministrativeActions: (AdministrativeAction & {
        TargetVolumeValues: Volume & {
          OntapConfiguration: OntapVolumeConfiguration & {
            SnaplockConfiguration: SnaplockConfiguration & {
              AutocommitPeriod: AutocommitPeriod & {
                Type: AutocommitPeriodType;
              };
              RetentionPeriod: SnaplockRetentionPeriod & {
                DefaultRetention: RetentionPeriod & {
                  Type: RetentionPeriodType;
                };
                MinimumRetention: RetentionPeriod & {
                  Type: RetentionPeriodType;
                };
                MaximumRetention: RetentionPeriod & {
                  Type: RetentionPeriodType;
                };
              };
            };
          };
          Tags: (Tag & { Key: TagKey; Value: TagValue })[];
          OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
            NfsExports: (OpenZFSNfsExport & {
              ClientConfigurations: (OpenZFSClientConfiguration & {
                Clients: OpenZFSClients;
                Options: OpenZFSNfsExportOptions;
              })[];
            })[];
            UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
              Type: OpenZFSQuotaType;
              Id: IntegerNoMax;
              StorageCapacityQuotaGiB: IntegerNoMax;
            })[];
          };
        };
        TargetSnapshotValues: Snapshot & {
          Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        };
      })[];
    };
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    Volume: Volume & {
      OntapConfiguration: OntapVolumeConfiguration & {
        SnaplockConfiguration: SnaplockConfiguration & {
          AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
          RetentionPeriod: SnaplockRetentionPeriod & {
            DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
            MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
            MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
          };
        };
      };
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      AdministrativeActions: (AdministrativeAction & {
        TargetFileSystemValues: FileSystem & {
          Tags: (Tag & { Key: TagKey; Value: TagValue })[];
          WindowsConfiguration: WindowsFileSystemConfiguration & {
            AuditLogConfiguration: WindowsAuditLogConfiguration & {
              FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
              FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
            };
            FsrmConfiguration: WindowsFsrmConfiguration & {
              FsrmServiceEnabled: Flag;
            };
          };
          LustreConfiguration: LustreFileSystemConfiguration & {
            LogConfiguration: LustreLogConfiguration & {
              Level: LustreAccessAuditLogLevel;
            };
            MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
              Mode: MetadataConfigurationMode;
            };
          };
        };
        TargetSnapshotValues: Snapshot & {
          Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        };
      })[];
      OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
        NfsExports: (OpenZFSNfsExport & {
          ClientConfigurations: (OpenZFSClientConfiguration & {
            Clients: OpenZFSClients;
            Options: OpenZFSNfsExportOptions;
          })[];
        })[];
        UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
          Type: OpenZFSQuotaType;
          Id: IntegerNoMax;
          StorageCapacityQuotaGiB: IntegerNoMax;
        })[];
      };
    };
  };
}
export type Namespace = string;
export type BatchImportMetaDataOnCreate = boolean;
export type EventType = "NEW" | "CHANGED" | "DELETED" | (string & {});
export type EventTypes = EventType[];
export interface AutoImportPolicy {
  Events?: EventType[];
}
export interface AutoExportPolicy {
  Events?: EventType[];
}
export interface S3DataRepositoryConfiguration {
  AutoImportPolicy?: AutoImportPolicy;
  AutoExportPolicy?: AutoExportPolicy;
}
export interface CreateDataRepositoryAssociationRequest {
  FileSystemId?: string;
  FileSystemPath?: string;
  DataRepositoryPath?: string;
  BatchImportMetaDataOnCreate?: boolean;
  ImportedFileChunkSize?: number;
  S3?: S3DataRepositoryConfiguration;
  ClientRequestToken?: string;
  Tags?: Tag[];
}
export type DataRepositoryAssociationId = string;
export type FileCacheId = string;
export type SubDirectoriesPaths = string[];
export type NfsVersion = "NFS3" | (string & {});
export type RepositoryDnsIps = string[];
export interface NFSDataRepositoryConfiguration {
  Version?: NfsVersion;
  DnsIps?: string[];
  AutoExportPolicy?: AutoExportPolicy;
}
export interface DataRepositoryAssociation {
  AssociationId?: string;
  ResourceARN?: string;
  FileSystemId?: string;
  Lifecycle?: DataRepositoryLifecycle;
  FailureDetails?: DataRepositoryFailureDetails;
  FileSystemPath?: string;
  DataRepositoryPath?: string;
  BatchImportMetaDataOnCreate?: boolean;
  ImportedFileChunkSize?: number;
  S3?: S3DataRepositoryConfiguration;
  Tags?: Tag[];
  CreationTime?: Date;
  FileCacheId?: string;
  FileCachePath?: string;
  DataRepositorySubdirectories?: string[];
  NFS?: NFSDataRepositoryConfiguration;
}
export interface CreateDataRepositoryAssociationResponse {
  Association?: DataRepositoryAssociation & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    NFS: NFSDataRepositoryConfiguration & { Version: NfsVersion };
  };
}
export type DataRepositoryTaskType =
  | "EXPORT_TO_REPOSITORY"
  | "IMPORT_METADATA_FROM_REPOSITORY"
  | "RELEASE_DATA_FROM_FILESYSTEM"
  | "AUTO_RELEASE_DATA"
  | (string & {});
export type DataRepositoryTaskPath = string;
export type DataRepositoryTaskPaths = string[];
export type ReportFormat = "REPORT_CSV_20191124" | (string & {});
export type ReportScope = "FAILED_FILES_ONLY" | (string & {});
export interface CompletionReport {
  Enabled?: boolean;
  Path?: string;
  Format?: ReportFormat;
  Scope?: ReportScope;
}
export type CapacityToRelease = number;
export type Unit = "DAYS" | (string & {});
export type Value = number;
export interface DurationSinceLastAccess {
  Unit?: Unit;
  Value?: number;
}
export interface ReleaseConfiguration {
  DurationSinceLastAccess?: DurationSinceLastAccess;
}
export interface CreateDataRepositoryTaskRequest {
  Type?: DataRepositoryTaskType;
  Paths?: string[];
  FileSystemId?: string;
  Report?: CompletionReport;
  ClientRequestToken?: string;
  Tags?: Tag[];
  CapacityToRelease?: number;
  ReleaseConfiguration?: ReleaseConfiguration;
}
export type StartTime = Date;
export type EndTime = Date;
export interface DataRepositoryTaskFailureDetails {
  Message?: string;
}
export type TotalCount = number;
export type SucceededCount = number;
export type FailedCount = number;
export type LastUpdatedTime = Date;
export type ReleasedCapacity = number;
export interface DataRepositoryTaskStatus {
  TotalCount?: number;
  SucceededCount?: number;
  FailedCount?: number;
  LastUpdatedTime?: Date;
  ReleasedCapacity?: number;
}
export interface DataRepositoryTask {
  TaskId?: string;
  Lifecycle?: DataRepositoryTaskLifecycle;
  Type?: DataRepositoryTaskType;
  CreationTime?: Date;
  StartTime?: Date;
  EndTime?: Date;
  ResourceARN?: string;
  Tags?: Tag[];
  FileSystemId?: string;
  Paths?: string[];
  FailureDetails?: DataRepositoryTaskFailureDetails;
  Status?: DataRepositoryTaskStatus;
  Report?: CompletionReport;
  CapacityToRelease?: number;
  FileCacheId?: string;
  ReleaseConfiguration?: ReleaseConfiguration;
}
export interface CreateDataRepositoryTaskResponse {
  DataRepositoryTask?: DataRepositoryTask & {
    TaskId: TaskId;
    Lifecycle: DataRepositoryTaskLifecycle;
    Type: DataRepositoryTaskType;
    CreationTime: CreationTime;
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    Report: CompletionReport & { Enabled: Flag };
  };
}
export type FileCacheType = "LUSTRE" | (string & {});
export type SecurityGroupId = string;
export type SecurityGroupIds = string[];
export type CopyTagsToDataRepositoryAssociations = boolean;
export type FileCacheLustreDeploymentType = "CACHE_1" | (string & {});
export type MetadataStorageCapacity = number;
export interface FileCacheLustreMetadataConfiguration {
  StorageCapacity?: number;
}
export interface CreateFileCacheLustreConfiguration {
  PerUnitStorageThroughput?: number;
  DeploymentType?: FileCacheLustreDeploymentType;
  WeeklyMaintenanceStartTime?: string;
  MetadataConfiguration?: FileCacheLustreMetadataConfiguration;
}
export interface FileCacheNFSConfiguration {
  Version?: NfsVersion;
  DnsIps?: string[];
}
export interface FileCacheDataRepositoryAssociation {
  FileCachePath?: string;
  DataRepositoryPath?: string;
  DataRepositorySubdirectories?: string[];
  NFS?: FileCacheNFSConfiguration;
}
export type CreateFileCacheDataRepositoryAssociations =
  FileCacheDataRepositoryAssociation[];
export interface CreateFileCacheRequest {
  ClientRequestToken?: string;
  FileCacheType?: FileCacheType;
  FileCacheTypeVersion?: string;
  StorageCapacity?: number;
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
  Tags?: Tag[];
  CopyTagsToDataRepositoryAssociations?: boolean;
  KmsKeyId?: string;
  LustreConfiguration?: CreateFileCacheLustreConfiguration;
  DataRepositoryAssociations?: FileCacheDataRepositoryAssociation[];
}
export type FileCacheLifecycle =
  | "AVAILABLE"
  | "CREATING"
  | "DELETING"
  | "UPDATING"
  | "FAILED"
  | (string & {});
export interface FileCacheFailureDetails {
  Message?: string;
}
export interface FileCacheLustreConfiguration {
  PerUnitStorageThroughput?: number;
  DeploymentType?: FileCacheLustreDeploymentType;
  MountName?: string;
  WeeklyMaintenanceStartTime?: string;
  MetadataConfiguration?: FileCacheLustreMetadataConfiguration;
  LogConfiguration?: LustreLogConfiguration;
}
export type DataRepositoryAssociationIds = string[];
export interface FileCacheCreating {
  OwnerId?: string;
  CreationTime?: Date;
  FileCacheId?: string;
  FileCacheType?: FileCacheType;
  FileCacheTypeVersion?: string;
  Lifecycle?: FileCacheLifecycle;
  FailureDetails?: FileCacheFailureDetails;
  StorageCapacity?: number;
  VpcId?: string;
  SubnetIds?: string[];
  NetworkInterfaceIds?: string[];
  DNSName?: string;
  KmsKeyId?: string;
  ResourceARN?: string;
  Tags?: Tag[];
  CopyTagsToDataRepositoryAssociations?: boolean;
  LustreConfiguration?: FileCacheLustreConfiguration;
  DataRepositoryAssociationIds?: string[];
}
export interface CreateFileCacheResponse {
  FileCache?: FileCacheCreating & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    LustreConfiguration: FileCacheLustreConfiguration & {
      MetadataConfiguration: FileCacheLustreMetadataConfiguration & {
        StorageCapacity: MetadataStorageCapacity;
      };
      LogConfiguration: LustreLogConfiguration & {
        Level: LustreAccessAuditLogLevel;
      };
    };
  };
}
export type DirectoryPassword = string | redacted.Redacted<string>;
export interface SelfManagedActiveDirectoryConfiguration {
  DomainName?: string;
  OrganizationalUnitDistinguishedName?: string;
  FileSystemAdministratorsGroup?: string;
  UserName?: string;
  Password?: string | redacted.Redacted<string>;
  DnsIps?: string[];
  DomainJoinServiceAccountSecret?: string;
}
export interface WindowsAuditLogCreateConfiguration {
  FileAccessAuditLogLevel?: WindowsAccessAuditLogLevel;
  FileShareAccessAuditLogLevel?: WindowsAccessAuditLogLevel;
  AuditLogDestination?: string;
}
export interface CreateFileSystemWindowsConfiguration {
  ActiveDirectoryId?: string;
  SelfManagedActiveDirectoryConfiguration?: SelfManagedActiveDirectoryConfiguration;
  DeploymentType?: WindowsDeploymentType;
  PreferredSubnetId?: string;
  ThroughputCapacity?: number;
  WeeklyMaintenanceStartTime?: string;
  DailyAutomaticBackupStartTime?: string;
  AutomaticBackupRetentionDays?: number;
  CopyTagsToBackups?: boolean;
  Aliases?: string[];
  AuditLogConfiguration?: WindowsAuditLogCreateConfiguration;
  DiskIopsConfiguration?: DiskIopsConfiguration;
  FsrmConfiguration?: WindowsFsrmConfiguration;
}
export interface LustreLogCreateConfiguration {
  Level?: LustreAccessAuditLogLevel;
  Destination?: string;
}
export interface CreateFileSystemLustreMetadataConfiguration {
  Iops?: number;
  Mode?: MetadataConfigurationMode;
}
export interface CreateFileSystemLustreConfiguration {
  WeeklyMaintenanceStartTime?: string;
  ImportPath?: string;
  ExportPath?: string;
  ImportedFileChunkSize?: number;
  DeploymentType?: LustreDeploymentType;
  AutoImportPolicy?: AutoImportPolicyType;
  PerUnitStorageThroughput?: number;
  DailyAutomaticBackupStartTime?: string;
  AutomaticBackupRetentionDays?: number;
  CopyTagsToBackups?: boolean;
  DriveCacheType?: DriveCacheType;
  DataCompressionType?: DataCompressionType;
  EfaEnabled?: boolean;
  LogConfiguration?: LustreLogCreateConfiguration;
  RootSquashConfiguration?: LustreRootSquashConfiguration;
  MetadataConfiguration?: CreateFileSystemLustreMetadataConfiguration;
  ThroughputCapacity?: number;
  DataReadCacheConfiguration?: LustreReadCacheConfiguration;
}
export interface CreateFileSystemOntapConfiguration {
  AutomaticBackupRetentionDays?: number;
  DailyAutomaticBackupStartTime?: string;
  DeploymentType?: OntapDeploymentType;
  EndpointIpAddressRange?: string;
  FsxAdminPassword?: string | redacted.Redacted<string>;
  DiskIopsConfiguration?: DiskIopsConfiguration;
  PreferredSubnetId?: string;
  RouteTableIds?: string[];
  ThroughputCapacity?: number;
  WeeklyMaintenanceStartTime?: string;
  HAPairs?: number;
  ThroughputCapacityPerHAPair?: number;
  EndpointIpv6AddressRange?: string;
}
export interface OpenZFSCreateRootVolumeConfiguration {
  RecordSizeKiB?: number;
  DataCompressionType?: OpenZFSDataCompressionType;
  NfsExports?: OpenZFSNfsExport[];
  UserAndGroupQuotas?: OpenZFSUserOrGroupQuota[];
  CopyTagsToSnapshots?: boolean;
  ReadOnly?: boolean;
}
export interface CreateFileSystemOpenZFSConfiguration {
  AutomaticBackupRetentionDays?: number;
  CopyTagsToBackups?: boolean;
  CopyTagsToVolumes?: boolean;
  DailyAutomaticBackupStartTime?: string;
  DeploymentType?: OpenZFSDeploymentType;
  ThroughputCapacity?: number;
  WeeklyMaintenanceStartTime?: string;
  DiskIopsConfiguration?: DiskIopsConfiguration;
  RootVolumeConfiguration?: OpenZFSCreateRootVolumeConfiguration;
  PreferredSubnetId?: string;
  EndpointIpAddressRange?: string;
  EndpointIpv6AddressRange?: string;
  RouteTableIds?: string[];
  ReadCacheConfiguration?: OpenZFSReadCacheConfiguration;
}
export interface CreateFileSystemRequest {
  ClientRequestToken?: string;
  FileSystemType?: FileSystemType;
  StorageCapacity?: number;
  StorageType?: StorageType;
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
  Tags?: Tag[];
  KmsKeyId?: string;
  WindowsConfiguration?: CreateFileSystemWindowsConfiguration;
  LustreConfiguration?: CreateFileSystemLustreConfiguration;
  OntapConfiguration?: CreateFileSystemOntapConfiguration;
  FileSystemTypeVersion?: string;
  OpenZFSConfiguration?: CreateFileSystemOpenZFSConfiguration;
  NetworkType?: NetworkType;
}
export interface CreateFileSystemResponse {
  FileSystem?: FileSystem & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    WindowsConfiguration: WindowsFileSystemConfiguration & {
      AuditLogConfiguration: WindowsAuditLogConfiguration & {
        FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
        FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
      };
      FsrmConfiguration: WindowsFsrmConfiguration & {
        FsrmServiceEnabled: Flag;
      };
    };
    LustreConfiguration: LustreFileSystemConfiguration & {
      LogConfiguration: LustreLogConfiguration & {
        Level: LustreAccessAuditLogLevel;
      };
      MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
        Mode: MetadataConfigurationMode;
      };
    };
    AdministrativeActions: (AdministrativeAction & {
      TargetVolumeValues: Volume & {
        OntapConfiguration: OntapVolumeConfiguration & {
          SnaplockConfiguration: SnaplockConfiguration & {
            AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
            RetentionPeriod: SnaplockRetentionPeriod & {
              DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
            };
          };
        };
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
          NfsExports: (OpenZFSNfsExport & {
            ClientConfigurations: (OpenZFSClientConfiguration & {
              Clients: OpenZFSClients;
              Options: OpenZFSNfsExportOptions;
            })[];
          })[];
          UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
            Type: OpenZFSQuotaType;
            Id: IntegerNoMax;
            StorageCapacityQuotaGiB: IntegerNoMax;
          })[];
        };
      };
      TargetSnapshotValues: Snapshot & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      };
    })[];
  };
}
export interface CreateFileSystemFromBackupRequest {
  BackupId?: string;
  ClientRequestToken?: string;
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
  Tags?: Tag[];
  WindowsConfiguration?: CreateFileSystemWindowsConfiguration;
  LustreConfiguration?: CreateFileSystemLustreConfiguration;
  StorageType?: StorageType;
  KmsKeyId?: string;
  FileSystemTypeVersion?: string;
  OpenZFSConfiguration?: CreateFileSystemOpenZFSConfiguration;
  StorageCapacity?: number;
  NetworkType?: NetworkType;
}
export interface CreateFileSystemFromBackupResponse {
  FileSystem?: FileSystem & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    WindowsConfiguration: WindowsFileSystemConfiguration & {
      AuditLogConfiguration: WindowsAuditLogConfiguration & {
        FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
        FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
      };
      FsrmConfiguration: WindowsFsrmConfiguration & {
        FsrmServiceEnabled: Flag;
      };
    };
    LustreConfiguration: LustreFileSystemConfiguration & {
      LogConfiguration: LustreLogConfiguration & {
        Level: LustreAccessAuditLogLevel;
      };
      MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
        Mode: MetadataConfigurationMode;
      };
    };
    AdministrativeActions: (AdministrativeAction & {
      TargetVolumeValues: Volume & {
        OntapConfiguration: OntapVolumeConfiguration & {
          SnaplockConfiguration: SnaplockConfiguration & {
            AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
            RetentionPeriod: SnaplockRetentionPeriod & {
              DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
            };
          };
        };
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
          NfsExports: (OpenZFSNfsExport & {
            ClientConfigurations: (OpenZFSClientConfiguration & {
              Clients: OpenZFSClients;
              Options: OpenZFSNfsExportOptions;
            })[];
          })[];
          UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
            Type: OpenZFSQuotaType;
            Id: IntegerNoMax;
            StorageCapacityQuotaGiB: IntegerNoMax;
          })[];
        };
      };
      TargetSnapshotValues: Snapshot & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      };
    })[];
  };
}
export interface CreateSnapshotRequest {
  ClientRequestToken?: string;
  Name?: string;
  VolumeId?: string;
  Tags?: Tag[];
}
export interface CreateSnapshotResponse {
  Snapshot?: Snapshot & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    AdministrativeActions: (AdministrativeAction & {
      TargetFileSystemValues: FileSystem & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        WindowsConfiguration: WindowsFileSystemConfiguration & {
          AuditLogConfiguration: WindowsAuditLogConfiguration & {
            FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
            FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
          };
          FsrmConfiguration: WindowsFsrmConfiguration & {
            FsrmServiceEnabled: Flag;
          };
        };
        LustreConfiguration: LustreFileSystemConfiguration & {
          LogConfiguration: LustreLogConfiguration & {
            Level: LustreAccessAuditLogLevel;
          };
          MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
            Mode: MetadataConfigurationMode;
          };
        };
      };
      TargetVolumeValues: Volume & {
        OntapConfiguration: OntapVolumeConfiguration & {
          SnaplockConfiguration: SnaplockConfiguration & {
            AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
            RetentionPeriod: SnaplockRetentionPeriod & {
              DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
            };
          };
        };
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
          NfsExports: (OpenZFSNfsExport & {
            ClientConfigurations: (OpenZFSClientConfiguration & {
              Clients: OpenZFSClients;
              Options: OpenZFSNfsExportOptions;
            })[];
          })[];
          UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
            Type: OpenZFSQuotaType;
            Id: IntegerNoMax;
            StorageCapacityQuotaGiB: IntegerNoMax;
          })[];
        };
      };
    })[];
  };
}
export type NetBiosAlias = string;
export interface CreateSvmActiveDirectoryConfiguration {
  NetBiosName?: string;
  SelfManagedActiveDirectoryConfiguration?: SelfManagedActiveDirectoryConfiguration;
}
export type StorageVirtualMachineName = string;
export type StorageVirtualMachineRootVolumeSecurityStyle =
  | "UNIX"
  | "NTFS"
  | "MIXED"
  | (string & {});
export interface CreateStorageVirtualMachineRequest {
  ActiveDirectoryConfiguration?: CreateSvmActiveDirectoryConfiguration;
  ClientRequestToken?: string;
  FileSystemId?: string;
  Name?: string;
  SvmAdminPassword?: string | redacted.Redacted<string>;
  Tags?: Tag[];
  RootVolumeSecurityStyle?: StorageVirtualMachineRootVolumeSecurityStyle;
}
export interface SvmActiveDirectoryConfiguration {
  NetBiosName?: string;
  SelfManagedActiveDirectoryConfiguration?: SelfManagedActiveDirectoryAttributes;
}
export interface SvmEndpoint {
  DNSName?: string;
  IpAddresses?: string[];
  Ipv6Addresses?: string[];
}
export interface SvmEndpoints {
  Iscsi?: SvmEndpoint;
  Management?: SvmEndpoint;
  Nfs?: SvmEndpoint;
  Smb?: SvmEndpoint;
}
export type StorageVirtualMachineLifecycle =
  | "CREATED"
  | "CREATING"
  | "DELETING"
  | "FAILED"
  | "MISCONFIGURED"
  | "PENDING"
  | (string & {});
export type StorageVirtualMachineSubtype =
  | "DEFAULT"
  | "DP_DESTINATION"
  | "SYNC_DESTINATION"
  | "SYNC_SOURCE"
  | (string & {});
export interface StorageVirtualMachine {
  ActiveDirectoryConfiguration?: SvmActiveDirectoryConfiguration;
  CreationTime?: Date;
  Endpoints?: SvmEndpoints;
  FileSystemId?: string;
  Lifecycle?: StorageVirtualMachineLifecycle;
  Name?: string;
  ResourceARN?: string;
  StorageVirtualMachineId?: string;
  Subtype?: StorageVirtualMachineSubtype;
  UUID?: string;
  Tags?: Tag[];
  LifecycleTransitionReason?: LifecycleTransitionReason;
  RootVolumeSecurityStyle?: StorageVirtualMachineRootVolumeSecurityStyle;
}
export interface CreateStorageVirtualMachineResponse {
  StorageVirtualMachine?: StorageVirtualMachine & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
  };
}
export type InputOntapVolumeType = "RW" | "DP" | (string & {});
export interface CreateSnaplockConfiguration {
  AuditLogVolume?: boolean;
  AutocommitPeriod?: AutocommitPeriod;
  PrivilegedDelete?: PrivilegedDelete;
  RetentionPeriod?: SnaplockRetentionPeriod;
  SnaplockType?: SnaplockType;
  VolumeAppendModeEnabled?: boolean;
}
export type AggregateListMultiplier = number;
export interface CreateAggregateConfiguration {
  Aggregates?: string[];
  ConstituentsPerAggregate?: number;
}
export interface CreateOntapVolumeConfiguration {
  JunctionPath?: string;
  SecurityStyle?: SecurityStyle;
  SizeInMegabytes?: number;
  StorageEfficiencyEnabled?: boolean;
  StorageVirtualMachineId?: string;
  TieringPolicy?: TieringPolicy;
  OntapVolumeType?: InputOntapVolumeType;
  SnapshotPolicy?: string;
  CopyTagsToBackups?: boolean;
  SnaplockConfiguration?: CreateSnaplockConfiguration;
  VolumeStyle?: VolumeStyle;
  AggregateConfiguration?: CreateAggregateConfiguration;
  SizeInBytes?: number;
}
export type IntegerNoMaxFromNegativeOne = number;
export interface CreateOpenZFSOriginSnapshotConfiguration {
  SnapshotARN?: string;
  CopyStrategy?: OpenZFSCopyStrategy;
}
export interface CreateOpenZFSVolumeConfiguration {
  ParentVolumeId?: string;
  StorageCapacityReservationGiB?: number;
  StorageCapacityQuotaGiB?: number;
  RecordSizeKiB?: number;
  DataCompressionType?: OpenZFSDataCompressionType;
  CopyTagsToSnapshots?: boolean;
  OriginSnapshot?: CreateOpenZFSOriginSnapshotConfiguration;
  ReadOnly?: boolean;
  NfsExports?: OpenZFSNfsExport[];
  UserAndGroupQuotas?: OpenZFSUserOrGroupQuota[];
}
export interface CreateVolumeRequest {
  ClientRequestToken?: string;
  VolumeType?: VolumeType;
  Name?: string;
  OntapConfiguration?: CreateOntapVolumeConfiguration;
  Tags?: Tag[];
  OpenZFSConfiguration?: CreateOpenZFSVolumeConfiguration;
}
export interface CreateVolumeResponse {
  Volume?: Volume & {
    OntapConfiguration: OntapVolumeConfiguration & {
      SnaplockConfiguration: SnaplockConfiguration & {
        AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
        RetentionPeriod: SnaplockRetentionPeriod & {
          DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
          MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
          MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
        };
      };
    };
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    AdministrativeActions: (AdministrativeAction & {
      TargetFileSystemValues: FileSystem & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        WindowsConfiguration: WindowsFileSystemConfiguration & {
          AuditLogConfiguration: WindowsAuditLogConfiguration & {
            FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
            FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
          };
          FsrmConfiguration: WindowsFsrmConfiguration & {
            FsrmServiceEnabled: Flag;
          };
        };
        LustreConfiguration: LustreFileSystemConfiguration & {
          LogConfiguration: LustreLogConfiguration & {
            Level: LustreAccessAuditLogLevel;
          };
          MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
            Mode: MetadataConfigurationMode;
          };
        };
      };
      TargetSnapshotValues: Snapshot & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      };
    })[];
    OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
      NfsExports: (OpenZFSNfsExport & {
        ClientConfigurations: (OpenZFSClientConfiguration & {
          Clients: OpenZFSClients;
          Options: OpenZFSNfsExportOptions;
        })[];
      })[];
      UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
        Type: OpenZFSQuotaType;
        Id: IntegerNoMax;
        StorageCapacityQuotaGiB: IntegerNoMax;
      })[];
    };
  };
}
export interface CreateVolumeFromBackupRequest {
  BackupId?: string;
  ClientRequestToken?: string;
  Name?: string;
  OntapConfiguration?: CreateOntapVolumeConfiguration;
  Tags?: Tag[];
}
export interface CreateVolumeFromBackupResponse {
  Volume?: Volume & {
    OntapConfiguration: OntapVolumeConfiguration & {
      SnaplockConfiguration: SnaplockConfiguration & {
        AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
        RetentionPeriod: SnaplockRetentionPeriod & {
          DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
          MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
          MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
        };
      };
    };
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    AdministrativeActions: (AdministrativeAction & {
      TargetFileSystemValues: FileSystem & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        WindowsConfiguration: WindowsFileSystemConfiguration & {
          AuditLogConfiguration: WindowsAuditLogConfiguration & {
            FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
            FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
          };
          FsrmConfiguration: WindowsFsrmConfiguration & {
            FsrmServiceEnabled: Flag;
          };
        };
        LustreConfiguration: LustreFileSystemConfiguration & {
          LogConfiguration: LustreLogConfiguration & {
            Level: LustreAccessAuditLogLevel;
          };
          MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
            Mode: MetadataConfigurationMode;
          };
        };
      };
      TargetSnapshotValues: Snapshot & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      };
    })[];
    OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
      NfsExports: (OpenZFSNfsExport & {
        ClientConfigurations: (OpenZFSClientConfiguration & {
          Clients: OpenZFSClients;
          Options: OpenZFSNfsExportOptions;
        })[];
      })[];
      UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
        Type: OpenZFSQuotaType;
        Id: IntegerNoMax;
        StorageCapacityQuotaGiB: IntegerNoMax;
      })[];
    };
  };
}
export interface DeleteBackupRequest {
  BackupId?: string;
  ClientRequestToken?: string;
}
export interface DeleteBackupResponse {
  BackupId?: string;
  Lifecycle?: BackupLifecycle;
}
export type DeleteDataInFileSystem = boolean;
export interface DeleteDataRepositoryAssociationRequest {
  AssociationId?: string;
  ClientRequestToken?: string;
  DeleteDataInFileSystem?: boolean;
}
export interface DeleteDataRepositoryAssociationResponse {
  AssociationId?: string;
  Lifecycle?: DataRepositoryLifecycle;
  DeleteDataInFileSystem?: boolean;
}
export interface DeleteFileCacheRequest {
  FileCacheId?: string;
  ClientRequestToken?: string;
}
export interface DeleteFileCacheResponse {
  FileCacheId?: string;
  Lifecycle?: FileCacheLifecycle;
}
export interface DeleteFileSystemWindowsConfiguration {
  SkipFinalBackup?: boolean;
  FinalBackupTags?: Tag[];
}
export interface DeleteFileSystemLustreConfiguration {
  SkipFinalBackup?: boolean;
  FinalBackupTags?: Tag[];
}
export type DeleteFileSystemOpenZFSOption =
  | "DELETE_CHILD_VOLUMES_AND_SNAPSHOTS"
  | (string & {});
export type DeleteFileSystemOpenZFSOptions = DeleteFileSystemOpenZFSOption[];
export interface DeleteFileSystemOpenZFSConfiguration {
  SkipFinalBackup?: boolean;
  FinalBackupTags?: Tag[];
  Options?: DeleteFileSystemOpenZFSOption[];
}
export interface DeleteFileSystemRequest {
  FileSystemId?: string;
  ClientRequestToken?: string;
  WindowsConfiguration?: DeleteFileSystemWindowsConfiguration;
  LustreConfiguration?: DeleteFileSystemLustreConfiguration;
  OpenZFSConfiguration?: DeleteFileSystemOpenZFSConfiguration;
}
export interface DeleteFileSystemWindowsResponse {
  FinalBackupId?: string;
  FinalBackupTags?: Tag[];
}
export interface DeleteFileSystemLustreResponse {
  FinalBackupId?: string;
  FinalBackupTags?: Tag[];
}
export interface DeleteFileSystemOpenZFSResponse {
  FinalBackupId?: string;
  FinalBackupTags?: Tag[];
}
export interface DeleteFileSystemResponse {
  FileSystemId?: string;
  Lifecycle?: FileSystemLifecycle;
  WindowsResponse?: DeleteFileSystemWindowsResponse & {
    FinalBackupTags: (Tag & { Key: TagKey; Value: TagValue })[];
  };
  LustreResponse?: DeleteFileSystemLustreResponse & {
    FinalBackupTags: (Tag & { Key: TagKey; Value: TagValue })[];
  };
  OpenZFSResponse?: DeleteFileSystemOpenZFSResponse & {
    FinalBackupTags: (Tag & { Key: TagKey; Value: TagValue })[];
  };
}
export interface DeleteSnapshotRequest {
  ClientRequestToken?: string;
  SnapshotId?: string;
}
export interface DeleteSnapshotResponse {
  SnapshotId?: string;
  Lifecycle?: SnapshotLifecycle;
}
export interface DeleteStorageVirtualMachineRequest {
  ClientRequestToken?: string;
  StorageVirtualMachineId?: string;
}
export interface DeleteStorageVirtualMachineResponse {
  StorageVirtualMachineId?: string;
  Lifecycle?: StorageVirtualMachineLifecycle;
}
export interface DeleteVolumeOntapConfiguration {
  SkipFinalBackup?: boolean;
  FinalBackupTags?: Tag[];
  BypassSnaplockEnterpriseRetention?: boolean;
}
export type DeleteOpenZFSVolumeOption =
  | "DELETE_CHILD_VOLUMES_AND_SNAPSHOTS"
  | (string & {});
export type DeleteOpenZFSVolumeOptions = DeleteOpenZFSVolumeOption[];
export interface DeleteVolumeOpenZFSConfiguration {
  Options?: DeleteOpenZFSVolumeOption[];
}
export interface DeleteVolumeRequest {
  ClientRequestToken?: string;
  VolumeId?: string;
  OntapConfiguration?: DeleteVolumeOntapConfiguration;
  OpenZFSConfiguration?: DeleteVolumeOpenZFSConfiguration;
}
export interface DeleteVolumeOntapResponse {
  FinalBackupId?: string;
  FinalBackupTags?: Tag[];
}
export interface DeleteVolumeResponse {
  VolumeId?: string;
  Lifecycle?: VolumeLifecycle;
  OntapResponse?: DeleteVolumeOntapResponse & {
    FinalBackupTags: (Tag & { Key: TagKey; Value: TagValue })[];
  };
}
export type BackupIds = string[];
export type FilterName =
  | "file-system-id"
  | "backup-type"
  | "file-system-type"
  | "volume-id"
  | "data-repository-type"
  | "file-cache-id"
  | "file-cache-type"
  | (string & {});
export type FilterValue = string;
export type FilterValues = string[];
export interface Filter {
  Name?: FilterName;
  Values?: string[];
}
export type Filters = Filter[];
export type MaxResults = number;
export type NextToken = string;
export interface DescribeBackupsRequest {
  BackupIds?: string[];
  Filters?: Filter[];
  MaxResults?: number;
  NextToken?: string;
}
export type Backups = Backup[];
export interface DescribeBackupsResponse {
  Backups?: (Backup & {
    BackupId: BackupId;
    Lifecycle: BackupLifecycle;
    Type: BackupType;
    CreationTime: CreationTime;
    FileSystem: FileSystem & {
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      WindowsConfiguration: WindowsFileSystemConfiguration & {
        AuditLogConfiguration: WindowsAuditLogConfiguration & {
          FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
          FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
        };
        FsrmConfiguration: WindowsFsrmConfiguration & {
          FsrmServiceEnabled: Flag;
        };
      };
      LustreConfiguration: LustreFileSystemConfiguration & {
        LogConfiguration: LustreLogConfiguration & {
          Level: LustreAccessAuditLogLevel;
        };
        MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
          Mode: MetadataConfigurationMode;
        };
      };
      AdministrativeActions: (AdministrativeAction & {
        TargetVolumeValues: Volume & {
          OntapConfiguration: OntapVolumeConfiguration & {
            SnaplockConfiguration: SnaplockConfiguration & {
              AutocommitPeriod: AutocommitPeriod & {
                Type: AutocommitPeriodType;
              };
              RetentionPeriod: SnaplockRetentionPeriod & {
                DefaultRetention: RetentionPeriod & {
                  Type: RetentionPeriodType;
                };
                MinimumRetention: RetentionPeriod & {
                  Type: RetentionPeriodType;
                };
                MaximumRetention: RetentionPeriod & {
                  Type: RetentionPeriodType;
                };
              };
            };
          };
          Tags: (Tag & { Key: TagKey; Value: TagValue })[];
          OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
            NfsExports: (OpenZFSNfsExport & {
              ClientConfigurations: (OpenZFSClientConfiguration & {
                Clients: OpenZFSClients;
                Options: OpenZFSNfsExportOptions;
              })[];
            })[];
            UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
              Type: OpenZFSQuotaType;
              Id: IntegerNoMax;
              StorageCapacityQuotaGiB: IntegerNoMax;
            })[];
          };
        };
        TargetSnapshotValues: Snapshot & {
          Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        };
      })[];
    };
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    Volume: Volume & {
      OntapConfiguration: OntapVolumeConfiguration & {
        SnaplockConfiguration: SnaplockConfiguration & {
          AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
          RetentionPeriod: SnaplockRetentionPeriod & {
            DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
            MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
            MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
          };
        };
      };
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      AdministrativeActions: (AdministrativeAction & {
        TargetFileSystemValues: FileSystem & {
          Tags: (Tag & { Key: TagKey; Value: TagValue })[];
          WindowsConfiguration: WindowsFileSystemConfiguration & {
            AuditLogConfiguration: WindowsAuditLogConfiguration & {
              FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
              FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
            };
            FsrmConfiguration: WindowsFsrmConfiguration & {
              FsrmServiceEnabled: Flag;
            };
          };
          LustreConfiguration: LustreFileSystemConfiguration & {
            LogConfiguration: LustreLogConfiguration & {
              Level: LustreAccessAuditLogLevel;
            };
            MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
              Mode: MetadataConfigurationMode;
            };
          };
        };
        TargetSnapshotValues: Snapshot & {
          Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        };
      })[];
      OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
        NfsExports: (OpenZFSNfsExport & {
          ClientConfigurations: (OpenZFSClientConfiguration & {
            Clients: OpenZFSClients;
            Options: OpenZFSNfsExportOptions;
          })[];
        })[];
        UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
          Type: OpenZFSQuotaType;
          Id: IntegerNoMax;
          StorageCapacityQuotaGiB: IntegerNoMax;
        })[];
      };
    };
  })[];
  NextToken?: string;
}
export type LimitedMaxResults = number;
export interface DescribeDataRepositoryAssociationsRequest {
  AssociationIds?: string[];
  Filters?: Filter[];
  MaxResults?: number;
  NextToken?: string;
}
export type DataRepositoryAssociations = DataRepositoryAssociation[];
export interface DescribeDataRepositoryAssociationsResponse {
  Associations?: (DataRepositoryAssociation & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    NFS: NFSDataRepositoryConfiguration & { Version: NfsVersion };
  })[];
  NextToken?: string;
}
export type TaskIds = string[];
export type DataRepositoryTaskFilterName =
  | "file-system-id"
  | "task-lifecycle"
  | "data-repository-association-id"
  | "file-cache-id"
  | (string & {});
export type DataRepositoryTaskFilterValue = string;
export type DataRepositoryTaskFilterValues = string[];
export interface DataRepositoryTaskFilter {
  Name?: DataRepositoryTaskFilterName;
  Values?: string[];
}
export type DataRepositoryTaskFilters = DataRepositoryTaskFilter[];
export interface DescribeDataRepositoryTasksRequest {
  TaskIds?: string[];
  Filters?: DataRepositoryTaskFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export type DataRepositoryTasks = DataRepositoryTask[];
export interface DescribeDataRepositoryTasksResponse {
  DataRepositoryTasks?: (DataRepositoryTask & {
    TaskId: TaskId;
    Lifecycle: DataRepositoryTaskLifecycle;
    Type: DataRepositoryTaskType;
    CreationTime: CreationTime;
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    Report: CompletionReport & { Enabled: Flag };
  })[];
  NextToken?: string;
}
export type FileCacheIds = string[];
export interface DescribeFileCachesRequest {
  FileCacheIds?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export interface FileCache {
  OwnerId?: string;
  CreationTime?: Date;
  FileCacheId?: string;
  FileCacheType?: FileCacheType;
  FileCacheTypeVersion?: string;
  Lifecycle?: FileCacheLifecycle;
  FailureDetails?: FileCacheFailureDetails;
  StorageCapacity?: number;
  VpcId?: string;
  SubnetIds?: string[];
  NetworkInterfaceIds?: string[];
  DNSName?: string;
  KmsKeyId?: string;
  ResourceARN?: string;
  LustreConfiguration?: FileCacheLustreConfiguration;
  DataRepositoryAssociationIds?: string[];
}
export type FileCaches = FileCache[];
export interface DescribeFileCachesResponse {
  FileCaches?: (FileCache & {
    LustreConfiguration: FileCacheLustreConfiguration & {
      MetadataConfiguration: FileCacheLustreMetadataConfiguration & {
        StorageCapacity: MetadataStorageCapacity;
      };
      LogConfiguration: LustreLogConfiguration & {
        Level: LustreAccessAuditLogLevel;
      };
    };
  })[];
  NextToken?: string;
}
export interface DescribeFileSystemAliasesRequest {
  ClientRequestToken?: string;
  FileSystemId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface DescribeFileSystemAliasesResponse {
  Aliases?: Alias[];
  NextToken?: string;
}
export type FileSystemIds = string[];
export interface DescribeFileSystemsRequest {
  FileSystemIds?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export type FileSystems = FileSystem[];
export interface DescribeFileSystemsResponse {
  FileSystems?: (FileSystem & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    WindowsConfiguration: WindowsFileSystemConfiguration & {
      AuditLogConfiguration: WindowsAuditLogConfiguration & {
        FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
        FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
      };
      FsrmConfiguration: WindowsFsrmConfiguration & {
        FsrmServiceEnabled: Flag;
      };
    };
    LustreConfiguration: LustreFileSystemConfiguration & {
      LogConfiguration: LustreLogConfiguration & {
        Level: LustreAccessAuditLogLevel;
      };
      MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
        Mode: MetadataConfigurationMode;
      };
    };
    AdministrativeActions: (AdministrativeAction & {
      TargetVolumeValues: Volume & {
        OntapConfiguration: OntapVolumeConfiguration & {
          SnaplockConfiguration: SnaplockConfiguration & {
            AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
            RetentionPeriod: SnaplockRetentionPeriod & {
              DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
            };
          };
        };
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
          NfsExports: (OpenZFSNfsExport & {
            ClientConfigurations: (OpenZFSClientConfiguration & {
              Clients: OpenZFSClients;
              Options: OpenZFSNfsExportOptions;
            })[];
          })[];
          UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
            Type: OpenZFSQuotaType;
            Id: IntegerNoMax;
            StorageCapacityQuotaGiB: IntegerNoMax;
          })[];
        };
      };
      TargetSnapshotValues: Snapshot & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      };
    })[];
  })[];
  NextToken?: string;
}
export type S3AccessPointAttachmentNames = string[];
export type S3AccessPointAttachmentsFilterName =
  | "file-system-id"
  | "volume-id"
  | "type"
  | (string & {});
export type S3AccessPointAttachmentsFilterValue = string;
export type S3AccessPointAttachmentsFilterValues = string[];
export interface S3AccessPointAttachmentsFilter {
  Name?: S3AccessPointAttachmentsFilterName;
  Values?: string[];
}
export type S3AccessPointAttachmentsFilters = S3AccessPointAttachmentsFilter[];
export interface DescribeS3AccessPointAttachmentsRequest {
  Names?: string[];
  Filters?: S3AccessPointAttachmentsFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export type S3AccessPointAttachments = S3AccessPointAttachment[];
export interface DescribeS3AccessPointAttachmentsResponse {
  S3AccessPointAttachments?: (S3AccessPointAttachment & {
    OpenZFSConfiguration: S3AccessPointOpenZFSConfiguration & {
      FileSystemIdentity: OpenZFSFileSystemIdentity & {
        Type: OpenZFSFileSystemUserType;
        PosixUser: OpenZFSPosixFileSystemUser & {
          Uid: FileSystemUID;
          Gid: FileSystemGID;
        };
      };
    };
    OntapConfiguration: S3AccessPointOntapConfiguration & {
      FileSystemIdentity: OntapFileSystemIdentity & {
        Type: OntapFileSystemUserType;
        UnixUser: OntapUnixFileSystemUser & { Name: OntapFileSystemUserName };
        WindowsUser: OntapWindowsFileSystemUser & {
          Name: OntapFileSystemUserName;
        };
      };
    };
  })[];
  NextToken?: string;
}
export interface DescribeSharedVpcConfigurationRequest {}
export type VerboseFlag = string;
export interface DescribeSharedVpcConfigurationResponse {
  EnableFsxRouteTableUpdatesFromParticipantAccounts?: string;
}
export type SnapshotIds = string[];
export type SnapshotFilterName = "file-system-id" | "volume-id" | (string & {});
export type SnapshotFilterValue = string;
export type SnapshotFilterValues = string[];
export interface SnapshotFilter {
  Name?: SnapshotFilterName;
  Values?: string[];
}
export type SnapshotFilters = SnapshotFilter[];
export type IncludeShared = boolean;
export interface DescribeSnapshotsRequest {
  SnapshotIds?: string[];
  Filters?: SnapshotFilter[];
  MaxResults?: number;
  NextToken?: string;
  IncludeShared?: boolean;
}
export type Snapshots = Snapshot[];
export interface DescribeSnapshotsResponse {
  Snapshots?: (Snapshot & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    AdministrativeActions: (AdministrativeAction & {
      TargetFileSystemValues: FileSystem & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        WindowsConfiguration: WindowsFileSystemConfiguration & {
          AuditLogConfiguration: WindowsAuditLogConfiguration & {
            FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
            FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
          };
          FsrmConfiguration: WindowsFsrmConfiguration & {
            FsrmServiceEnabled: Flag;
          };
        };
        LustreConfiguration: LustreFileSystemConfiguration & {
          LogConfiguration: LustreLogConfiguration & {
            Level: LustreAccessAuditLogLevel;
          };
          MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
            Mode: MetadataConfigurationMode;
          };
        };
      };
      TargetVolumeValues: Volume & {
        OntapConfiguration: OntapVolumeConfiguration & {
          SnaplockConfiguration: SnaplockConfiguration & {
            AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
            RetentionPeriod: SnaplockRetentionPeriod & {
              DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
            };
          };
        };
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
          NfsExports: (OpenZFSNfsExport & {
            ClientConfigurations: (OpenZFSClientConfiguration & {
              Clients: OpenZFSClients;
              Options: OpenZFSNfsExportOptions;
            })[];
          })[];
          UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
            Type: OpenZFSQuotaType;
            Id: IntegerNoMax;
            StorageCapacityQuotaGiB: IntegerNoMax;
          })[];
        };
      };
    })[];
  })[];
  NextToken?: string;
}
export type StorageVirtualMachineIds = string[];
export type StorageVirtualMachineFilterName = "file-system-id" | (string & {});
export type StorageVirtualMachineFilterValue = string;
export type StorageVirtualMachineFilterValues = string[];
export interface StorageVirtualMachineFilter {
  Name?: StorageVirtualMachineFilterName;
  Values?: string[];
}
export type StorageVirtualMachineFilters = StorageVirtualMachineFilter[];
export interface DescribeStorageVirtualMachinesRequest {
  StorageVirtualMachineIds?: string[];
  Filters?: StorageVirtualMachineFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export type StorageVirtualMachines = StorageVirtualMachine[];
export interface DescribeStorageVirtualMachinesResponse {
  StorageVirtualMachines?: (StorageVirtualMachine & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
  })[];
  NextToken?: string;
}
export type VolumeIds = string[];
export type VolumeFilterName =
  | "file-system-id"
  | "storage-virtual-machine-id"
  | (string & {});
export type VolumeFilterValue = string;
export type VolumeFilterValues = string[];
export interface VolumeFilter {
  Name?: VolumeFilterName;
  Values?: string[];
}
export type VolumeFilters = VolumeFilter[];
export interface DescribeVolumesRequest {
  VolumeIds?: string[];
  Filters?: VolumeFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export type Volumes = Volume[];
export interface DescribeVolumesResponse {
  Volumes?: (Volume & {
    OntapConfiguration: OntapVolumeConfiguration & {
      SnaplockConfiguration: SnaplockConfiguration & {
        AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
        RetentionPeriod: SnaplockRetentionPeriod & {
          DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
          MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
          MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
        };
      };
    };
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    AdministrativeActions: (AdministrativeAction & {
      TargetFileSystemValues: FileSystem & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        WindowsConfiguration: WindowsFileSystemConfiguration & {
          AuditLogConfiguration: WindowsAuditLogConfiguration & {
            FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
            FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
          };
          FsrmConfiguration: WindowsFsrmConfiguration & {
            FsrmServiceEnabled: Flag;
          };
        };
        LustreConfiguration: LustreFileSystemConfiguration & {
          LogConfiguration: LustreLogConfiguration & {
            Level: LustreAccessAuditLogLevel;
          };
          MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
            Mode: MetadataConfigurationMode;
          };
        };
      };
      TargetSnapshotValues: Snapshot & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      };
    })[];
    OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
      NfsExports: (OpenZFSNfsExport & {
        ClientConfigurations: (OpenZFSClientConfiguration & {
          Clients: OpenZFSClients;
          Options: OpenZFSNfsExportOptions;
        })[];
      })[];
      UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
        Type: OpenZFSQuotaType;
        Id: IntegerNoMax;
        StorageCapacityQuotaGiB: IntegerNoMax;
      })[];
    };
  })[];
  NextToken?: string;
}
export interface DetachAndDeleteS3AccessPointRequest {
  ClientRequestToken?: string;
  Name?: string;
}
export interface DetachAndDeleteS3AccessPointResponse {
  Lifecycle?: S3AccessPointAttachmentLifecycle;
  Name?: string;
}
export interface DisassociateFileSystemAliasesRequest {
  ClientRequestToken?: string;
  FileSystemId?: string;
  Aliases?: string[];
}
export interface DisassociateFileSystemAliasesResponse {
  Aliases?: Alias[];
}
export interface ListTagsForResourceRequest {
  ResourceARN?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListTagsForResourceResponse {
  Tags?: (Tag & { Key: TagKey; Value: TagValue })[];
  NextToken?: string;
}
export interface ReleaseFileSystemNfsV3LocksRequest {
  FileSystemId?: string;
  ClientRequestToken?: string;
}
export interface ReleaseFileSystemNfsV3LocksResponse {
  FileSystem?: FileSystem & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    WindowsConfiguration: WindowsFileSystemConfiguration & {
      AuditLogConfiguration: WindowsAuditLogConfiguration & {
        FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
        FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
      };
      FsrmConfiguration: WindowsFsrmConfiguration & {
        FsrmServiceEnabled: Flag;
      };
    };
    LustreConfiguration: LustreFileSystemConfiguration & {
      LogConfiguration: LustreLogConfiguration & {
        Level: LustreAccessAuditLogLevel;
      };
      MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
        Mode: MetadataConfigurationMode;
      };
    };
    AdministrativeActions: (AdministrativeAction & {
      TargetVolumeValues: Volume & {
        OntapConfiguration: OntapVolumeConfiguration & {
          SnaplockConfiguration: SnaplockConfiguration & {
            AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
            RetentionPeriod: SnaplockRetentionPeriod & {
              DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
            };
          };
        };
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
          NfsExports: (OpenZFSNfsExport & {
            ClientConfigurations: (OpenZFSClientConfiguration & {
              Clients: OpenZFSClients;
              Options: OpenZFSNfsExportOptions;
            })[];
          })[];
          UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
            Type: OpenZFSQuotaType;
            Id: IntegerNoMax;
            StorageCapacityQuotaGiB: IntegerNoMax;
          })[];
        };
      };
      TargetSnapshotValues: Snapshot & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      };
    })[];
  };
}
export type RestoreOpenZFSVolumeOption =
  | "DELETE_INTERMEDIATE_SNAPSHOTS"
  | "DELETE_CLONED_VOLUMES"
  | (string & {});
export type RestoreOpenZFSVolumeOptions = RestoreOpenZFSVolumeOption[];
export interface RestoreVolumeFromSnapshotRequest {
  ClientRequestToken?: string;
  VolumeId?: string;
  SnapshotId?: string;
  Options?: RestoreOpenZFSVolumeOption[];
}
export interface RestoreVolumeFromSnapshotResponse {
  VolumeId?: string;
  Lifecycle?: VolumeLifecycle;
  AdministrativeActions?: (AdministrativeAction & {
    TargetFileSystemValues: FileSystem & {
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      WindowsConfiguration: WindowsFileSystemConfiguration & {
        AuditLogConfiguration: WindowsAuditLogConfiguration & {
          FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
          FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
        };
        FsrmConfiguration: WindowsFsrmConfiguration & {
          FsrmServiceEnabled: Flag;
        };
      };
      LustreConfiguration: LustreFileSystemConfiguration & {
        LogConfiguration: LustreLogConfiguration & {
          Level: LustreAccessAuditLogLevel;
        };
        MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
          Mode: MetadataConfigurationMode;
        };
      };
    };
    TargetVolumeValues: Volume & {
      OntapConfiguration: OntapVolumeConfiguration & {
        SnaplockConfiguration: SnaplockConfiguration & {
          AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
          RetentionPeriod: SnaplockRetentionPeriod & {
            DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
            MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
            MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
          };
        };
      };
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
        NfsExports: (OpenZFSNfsExport & {
          ClientConfigurations: (OpenZFSClientConfiguration & {
            Clients: OpenZFSClients;
            Options: OpenZFSNfsExportOptions;
          })[];
        })[];
        UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
          Type: OpenZFSQuotaType;
          Id: IntegerNoMax;
          StorageCapacityQuotaGiB: IntegerNoMax;
        })[];
      };
    };
    TargetSnapshotValues: Snapshot & {
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    };
  })[];
}
export interface StartMisconfiguredStateRecoveryRequest {
  ClientRequestToken?: string;
  FileSystemId?: string;
}
export interface StartMisconfiguredStateRecoveryResponse {
  FileSystem?: FileSystem & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    WindowsConfiguration: WindowsFileSystemConfiguration & {
      AuditLogConfiguration: WindowsAuditLogConfiguration & {
        FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
        FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
      };
      FsrmConfiguration: WindowsFsrmConfiguration & {
        FsrmServiceEnabled: Flag;
      };
    };
    LustreConfiguration: LustreFileSystemConfiguration & {
      LogConfiguration: LustreLogConfiguration & {
        Level: LustreAccessAuditLogLevel;
      };
      MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
        Mode: MetadataConfigurationMode;
      };
    };
    AdministrativeActions: (AdministrativeAction & {
      TargetVolumeValues: Volume & {
        OntapConfiguration: OntapVolumeConfiguration & {
          SnaplockConfiguration: SnaplockConfiguration & {
            AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
            RetentionPeriod: SnaplockRetentionPeriod & {
              DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
            };
          };
        };
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
          NfsExports: (OpenZFSNfsExport & {
            ClientConfigurations: (OpenZFSClientConfiguration & {
              Clients: OpenZFSClients;
              Options: OpenZFSNfsExportOptions;
            })[];
          })[];
          UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
            Type: OpenZFSQuotaType;
            Id: IntegerNoMax;
            StorageCapacityQuotaGiB: IntegerNoMax;
          })[];
        };
      };
      TargetSnapshotValues: Snapshot & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      };
    })[];
  };
}
export interface TagResourceRequest {
  ResourceARN?: string;
  Tags?: Tag[];
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceRequest {
  ResourceARN?: string;
  TagKeys?: string[];
}
export interface UntagResourceResponse {}
export interface UpdateDataRepositoryAssociationRequest {
  AssociationId?: string;
  ClientRequestToken?: string;
  ImportedFileChunkSize?: number;
  S3?: S3DataRepositoryConfiguration;
}
export interface UpdateDataRepositoryAssociationResponse {
  Association?: DataRepositoryAssociation & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    NFS: NFSDataRepositoryConfiguration & { Version: NfsVersion };
  };
}
export interface UpdateFileCacheLustreConfiguration {
  WeeklyMaintenanceStartTime?: string;
}
export interface UpdateFileCacheRequest {
  FileCacheId?: string;
  ClientRequestToken?: string;
  LustreConfiguration?: UpdateFileCacheLustreConfiguration;
}
export interface UpdateFileCacheResponse {
  FileCache?: FileCache & {
    LustreConfiguration: FileCacheLustreConfiguration & {
      MetadataConfiguration: FileCacheLustreMetadataConfiguration & {
        StorageCapacity: MetadataStorageCapacity;
      };
      LogConfiguration: LustreLogConfiguration & {
        Level: LustreAccessAuditLogLevel;
      };
    };
  };
}
export interface SelfManagedActiveDirectoryConfigurationUpdates {
  UserName?: string;
  Password?: string | redacted.Redacted<string>;
  DnsIps?: string[];
  DomainName?: string;
  OrganizationalUnitDistinguishedName?: string;
  FileSystemAdministratorsGroup?: string;
  DomainJoinServiceAccountSecret?: string;
}
export interface UpdateFileSystemWindowsConfiguration {
  WeeklyMaintenanceStartTime?: string;
  DailyAutomaticBackupStartTime?: string;
  AutomaticBackupRetentionDays?: number;
  ThroughputCapacity?: number;
  SelfManagedActiveDirectoryConfiguration?: SelfManagedActiveDirectoryConfigurationUpdates;
  AuditLogConfiguration?: WindowsAuditLogCreateConfiguration;
  DiskIopsConfiguration?: DiskIopsConfiguration;
  FsrmConfiguration?: WindowsFsrmConfiguration;
}
export interface UpdateFileSystemLustreMetadataConfiguration {
  Iops?: number;
  Mode?: MetadataConfigurationMode;
}
export interface UpdateFileSystemLustreConfiguration {
  WeeklyMaintenanceStartTime?: string;
  DailyAutomaticBackupStartTime?: string;
  AutomaticBackupRetentionDays?: number;
  AutoImportPolicy?: AutoImportPolicyType;
  DataCompressionType?: DataCompressionType;
  LogConfiguration?: LustreLogCreateConfiguration;
  RootSquashConfiguration?: LustreRootSquashConfiguration;
  PerUnitStorageThroughput?: number;
  MetadataConfiguration?: UpdateFileSystemLustreMetadataConfiguration;
  ThroughputCapacity?: number;
  DataReadCacheConfiguration?: LustreReadCacheConfiguration;
}
export interface UpdateFileSystemOntapConfiguration {
  AutomaticBackupRetentionDays?: number;
  DailyAutomaticBackupStartTime?: string;
  FsxAdminPassword?: string | redacted.Redacted<string>;
  WeeklyMaintenanceStartTime?: string;
  DiskIopsConfiguration?: DiskIopsConfiguration;
  ThroughputCapacity?: number;
  AddRouteTableIds?: string[];
  RemoveRouteTableIds?: string[];
  ThroughputCapacityPerHAPair?: number;
  HAPairs?: number;
  EndpointIpv6AddressRange?: string;
}
export interface UpdateFileSystemOpenZFSConfiguration {
  AutomaticBackupRetentionDays?: number;
  CopyTagsToBackups?: boolean;
  CopyTagsToVolumes?: boolean;
  DailyAutomaticBackupStartTime?: string;
  ThroughputCapacity?: number;
  WeeklyMaintenanceStartTime?: string;
  DiskIopsConfiguration?: DiskIopsConfiguration;
  AddRouteTableIds?: string[];
  RemoveRouteTableIds?: string[];
  ReadCacheConfiguration?: OpenZFSReadCacheConfiguration;
  EndpointIpv6AddressRange?: string;
}
export interface UpdateFileSystemRequest {
  FileSystemId?: string;
  ClientRequestToken?: string;
  StorageCapacity?: number;
  WindowsConfiguration?: UpdateFileSystemWindowsConfiguration;
  LustreConfiguration?: UpdateFileSystemLustreConfiguration;
  OntapConfiguration?: UpdateFileSystemOntapConfiguration;
  OpenZFSConfiguration?: UpdateFileSystemOpenZFSConfiguration;
  StorageType?: StorageType;
  FileSystemTypeVersion?: string;
  NetworkType?: NetworkType;
}
export interface UpdateFileSystemResponse {
  FileSystem?: FileSystem & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    WindowsConfiguration: WindowsFileSystemConfiguration & {
      AuditLogConfiguration: WindowsAuditLogConfiguration & {
        FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
        FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
      };
      FsrmConfiguration: WindowsFsrmConfiguration & {
        FsrmServiceEnabled: Flag;
      };
    };
    LustreConfiguration: LustreFileSystemConfiguration & {
      LogConfiguration: LustreLogConfiguration & {
        Level: LustreAccessAuditLogLevel;
      };
      MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
        Mode: MetadataConfigurationMode;
      };
    };
    AdministrativeActions: (AdministrativeAction & {
      TargetVolumeValues: Volume & {
        OntapConfiguration: OntapVolumeConfiguration & {
          SnaplockConfiguration: SnaplockConfiguration & {
            AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
            RetentionPeriod: SnaplockRetentionPeriod & {
              DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
            };
          };
        };
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
          NfsExports: (OpenZFSNfsExport & {
            ClientConfigurations: (OpenZFSClientConfiguration & {
              Clients: OpenZFSClients;
              Options: OpenZFSNfsExportOptions;
            })[];
          })[];
          UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
            Type: OpenZFSQuotaType;
            Id: IntegerNoMax;
            StorageCapacityQuotaGiB: IntegerNoMax;
          })[];
        };
      };
      TargetSnapshotValues: Snapshot & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      };
    })[];
  };
}
export interface UpdateSharedVpcConfigurationRequest {
  EnableFsxRouteTableUpdatesFromParticipantAccounts?: string;
  ClientRequestToken?: string;
}
export interface UpdateSharedVpcConfigurationResponse {
  EnableFsxRouteTableUpdatesFromParticipantAccounts?: string;
}
export interface UpdateSnapshotRequest {
  ClientRequestToken?: string;
  Name?: string;
  SnapshotId?: string;
}
export interface UpdateSnapshotResponse {
  Snapshot?: Snapshot & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    AdministrativeActions: (AdministrativeAction & {
      TargetFileSystemValues: FileSystem & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        WindowsConfiguration: WindowsFileSystemConfiguration & {
          AuditLogConfiguration: WindowsAuditLogConfiguration & {
            FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
            FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
          };
          FsrmConfiguration: WindowsFsrmConfiguration & {
            FsrmServiceEnabled: Flag;
          };
        };
        LustreConfiguration: LustreFileSystemConfiguration & {
          LogConfiguration: LustreLogConfiguration & {
            Level: LustreAccessAuditLogLevel;
          };
          MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
            Mode: MetadataConfigurationMode;
          };
        };
      };
      TargetVolumeValues: Volume & {
        OntapConfiguration: OntapVolumeConfiguration & {
          SnaplockConfiguration: SnaplockConfiguration & {
            AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
            RetentionPeriod: SnaplockRetentionPeriod & {
              DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
              MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
            };
          };
        };
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
          NfsExports: (OpenZFSNfsExport & {
            ClientConfigurations: (OpenZFSClientConfiguration & {
              Clients: OpenZFSClients;
              Options: OpenZFSNfsExportOptions;
            })[];
          })[];
          UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
            Type: OpenZFSQuotaType;
            Id: IntegerNoMax;
            StorageCapacityQuotaGiB: IntegerNoMax;
          })[];
        };
      };
    })[];
  };
}
export interface UpdateSvmActiveDirectoryConfiguration {
  SelfManagedActiveDirectoryConfiguration?: SelfManagedActiveDirectoryConfigurationUpdates;
  NetBiosName?: string;
}
export interface UpdateStorageVirtualMachineRequest {
  ActiveDirectoryConfiguration?: UpdateSvmActiveDirectoryConfiguration;
  ClientRequestToken?: string;
  StorageVirtualMachineId?: string;
  SvmAdminPassword?: string | redacted.Redacted<string>;
}
export interface UpdateStorageVirtualMachineResponse {
  StorageVirtualMachine?: StorageVirtualMachine & {
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
  };
}
export interface UpdateSnaplockConfiguration {
  AuditLogVolume?: boolean;
  AutocommitPeriod?: AutocommitPeriod;
  PrivilegedDelete?: PrivilegedDelete;
  RetentionPeriod?: SnaplockRetentionPeriod;
  VolumeAppendModeEnabled?: boolean;
}
export interface UpdateOntapVolumeConfiguration {
  JunctionPath?: string;
  SecurityStyle?: SecurityStyle;
  SizeInMegabytes?: number;
  StorageEfficiencyEnabled?: boolean;
  TieringPolicy?: TieringPolicy;
  SnapshotPolicy?: string;
  CopyTagsToBackups?: boolean;
  SnaplockConfiguration?: UpdateSnaplockConfiguration;
  SizeInBytes?: number;
}
export interface UpdateOpenZFSVolumeConfiguration {
  StorageCapacityReservationGiB?: number;
  StorageCapacityQuotaGiB?: number;
  RecordSizeKiB?: number;
  DataCompressionType?: OpenZFSDataCompressionType;
  NfsExports?: OpenZFSNfsExport[];
  UserAndGroupQuotas?: OpenZFSUserOrGroupQuota[];
  ReadOnly?: boolean;
}
export interface UpdateVolumeRequest {
  ClientRequestToken?: string;
  VolumeId?: string;
  OntapConfiguration?: UpdateOntapVolumeConfiguration;
  Name?: string;
  OpenZFSConfiguration?: UpdateOpenZFSVolumeConfiguration;
}
export interface UpdateVolumeResponse {
  Volume?: Volume & {
    OntapConfiguration: OntapVolumeConfiguration & {
      SnaplockConfiguration: SnaplockConfiguration & {
        AutocommitPeriod: AutocommitPeriod & { Type: AutocommitPeriodType };
        RetentionPeriod: SnaplockRetentionPeriod & {
          DefaultRetention: RetentionPeriod & { Type: RetentionPeriodType };
          MinimumRetention: RetentionPeriod & { Type: RetentionPeriodType };
          MaximumRetention: RetentionPeriod & { Type: RetentionPeriodType };
        };
      };
    };
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    AdministrativeActions: (AdministrativeAction & {
      TargetFileSystemValues: FileSystem & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        WindowsConfiguration: WindowsFileSystemConfiguration & {
          AuditLogConfiguration: WindowsAuditLogConfiguration & {
            FileAccessAuditLogLevel: WindowsAccessAuditLogLevel;
            FileShareAccessAuditLogLevel: WindowsAccessAuditLogLevel;
          };
          FsrmConfiguration: WindowsFsrmConfiguration & {
            FsrmServiceEnabled: Flag;
          };
        };
        LustreConfiguration: LustreFileSystemConfiguration & {
          LogConfiguration: LustreLogConfiguration & {
            Level: LustreAccessAuditLogLevel;
          };
          MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
            Mode: MetadataConfigurationMode;
          };
        };
      };
      TargetSnapshotValues: Snapshot & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      };
    })[];
    OpenZFSConfiguration: OpenZFSVolumeConfiguration & {
      NfsExports: (OpenZFSNfsExport & {
        ClientConfigurations: (OpenZFSClientConfiguration & {
          Clients: OpenZFSClients;
          Options: OpenZFSNfsExportOptions;
        })[];
      })[];
      UserAndGroupQuotas: (OpenZFSUserOrGroupQuota & {
        Type: OpenZFSQuotaType;
        Id: IntegerNoMax;
        StorageCapacityQuotaGiB: IntegerNoMax;
      })[];
    };
  };
}
export type Parameter = string;
export type ServiceLimit =
  | "FILE_SYSTEM_COUNT"
  | "TOTAL_THROUGHPUT_CAPACITY"
  | "TOTAL_STORAGE"
  | "TOTAL_USER_INITIATED_BACKUPS"
  | "TOTAL_USER_TAGS"
  | "TOTAL_IN_PROGRESS_COPY_BACKUPS"
  | "STORAGE_VIRTUAL_MACHINES_PER_FILE_SYSTEM"
  | "VOLUMES_PER_FILE_SYSTEM"
  | "TOTAL_SSD_IOPS"
  | "FILE_CACHE_COUNT"
  | (string & {});
export type ErrorCode = string;
export type ActiveDirectoryErrorType =
  | "DOMAIN_NOT_FOUND"
  | "INCOMPATIBLE_DOMAIN_MODE"
  | "WRONG_VPC"
  | "INVALID_NETWORK_TYPE"
  | "INVALID_DOMAIN_STAGE"
  | (string & {});
export type AssociateFileSystemAliasesError =
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Use this action to associate one or more Domain Name Server (DNS) aliases with an existing Amazon FSx for Windows File Server file system.
 * A file system can have a maximum of 50 DNS aliases associated with it at any one time. If you try to
 * associate a DNS alias that is already associated with the file system, FSx takes no action on that alias in the request.
 * For more information, see Working with DNS Aliases and
 * Walkthrough 5: Using DNS aliases to access your file system, including
 * additional steps you must take to be able to access your file system using a DNS alias.
 *
 * The system response shows the DNS aliases that
 * Amazon FSx is attempting to associate with the file system.
 * Use the API
 * operation to monitor the status of the aliases Amazon FSx is
 * associating with the file system.
 */
export const associateFileSystemAliases: API.OperationMethod<
  AssociateFileSystemAliasesRequest,
  AssociateFileSystemAliasesResponse,
  AssociateFileSystemAliasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientRequestToken: D.m({ idempotency: true }),
      FileSystemId: 0,
      Aliases: 0,
    },
  },
  errors: [BadRequest, FileSystemNotFound, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateFileSystemAliases",
})) as any;

export type CancelDataRepositoryTaskError =
  | BadRequest
  | DataRepositoryTaskEnded
  | DataRepositoryTaskNotFound
  | InternalServerError
  | UnsupportedOperation
  | CommonErrors;
/**
 * Cancels an existing Amazon FSx for Lustre data repository task if that task is in either the
 * `PENDING` or `EXECUTING` state. When you cancel an export task, Amazon FSx
 * does the following.
 *
 * - Any files that FSx has already exported are not reverted.
 *
 * - FSx continues to export any files that are in-flight when the cancel operation is received.
 *
 * - FSx does not export any files that have not yet been exported.
 *
 * For a release task, Amazon FSx will stop releasing files upon cancellation. Any files that
 * have already been released will remain in the released state.
 */
export const cancelDataRepositoryTask: API.OperationMethod<
  CancelDataRepositoryTaskRequest,
  CancelDataRepositoryTaskResponse,
  CancelDataRepositoryTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TaskId: 0 } },
  errors: [
    BadRequest,
    DataRepositoryTaskEnded,
    DataRepositoryTaskNotFound,
    InternalServerError,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelDataRepositoryTask",
})) as any;

export type CopyBackupError =
  | BackupNotFound
  | BadRequest
  | IncompatibleParameterError
  | IncompatibleRegionForMultiAZ
  | InternalServerError
  | InvalidDestinationKmsKey
  | InvalidRegion
  | InvalidSourceKmsKey
  | ServiceLimitExceeded
  | SourceBackupUnavailable
  | UnsupportedOperation
  | CommonErrors;
/**
 * Copies an existing backup within the same Amazon Web Services account to another Amazon Web Services Region
 * (cross-Region copy) or within the same Amazon Web Services Region (in-Region copy). You can have up to five
 * backup copy requests in progress to a single destination Region per account.
 *
 * You can use cross-Region backup copies for cross-Region disaster recovery. You can
 * periodically take backups and copy them to another Region so that in the event of a
 * disaster in the primary Region, you can restore from backup and recover availability
 * quickly in the other Region. You can make cross-Region copies only within your Amazon Web Services partition. A partition is a grouping of Regions. Amazon Web Services currently
 * has three partitions: `aws` (Standard Regions), `aws-cn` (China
 * Regions), and `aws-us-gov` (Amazon Web Services GovCloud [US] Regions).
 *
 * You can also use backup copies to clone your file dataset to another Region or within
 * the same Region.
 *
 * You can use the `SourceRegion` parameter to specify the Amazon Web Services Region
 * from which the backup will be copied. For example, if you make the call from the
 * `us-west-1` Region and want to copy a backup from the `us-east-2`
 * Region, you specify `us-east-2` in the `SourceRegion` parameter
 * to make a cross-Region copy. If you don't specify a Region, the backup copy is
 * created in the same Region where the request is sent from (in-Region copy).
 *
 * For more information about creating backup copies, see Copying backups
 * in the *Amazon FSx for Windows User Guide*, Copying backups in the Amazon FSx for Lustre User
 * Guide, and Copying backups in the Amazon FSx for OpenZFS User
 * Guide.
 */
export const copyBackup: API.OperationMethod<
  CopyBackupRequest,
  CopyBackupResponse,
  CopyBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientRequestToken: D.m({ idempotency: true }),
      SourceBackupId: 0,
      SourceRegion: 0,
      KmsKeyId: 0,
      CopyTags: 0,
      Tags: D.list(i_Tag),
    },
    output: { Backup: o_Backup },
  },
  errors: [
    BackupNotFound,
    BadRequest,
    IncompatibleParameterError,
    IncompatibleRegionForMultiAZ,
    InternalServerError,
    InvalidDestinationKmsKey,
    InvalidRegion,
    InvalidSourceKmsKey,
    ServiceLimitExceeded,
    SourceBackupUnavailable,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyBackup",
})) as any;

export type CopySnapshotAndUpdateVolumeError =
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | ServiceLimitExceeded
  | SourceSnapshotNotFound
  | CommonErrors;
/**
 * Updates an existing volume by using a snapshot from another Amazon FSx for OpenZFS file system. For more information, see on-demand data replication in the Amazon FSx for OpenZFS User
 * Guide.
 */
export const copySnapshotAndUpdateVolume: API.OperationMethod<
  CopySnapshotAndUpdateVolumeRequest,
  CopySnapshotAndUpdateVolumeResponse,
  CopySnapshotAndUpdateVolumeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientRequestToken: D.m({ idempotency: true }),
      VolumeId: 0,
      SourceSnapshotARN: 0,
      CopyStrategy: 0,
      Options: 0,
    },
    output: { AdministrativeActions: D.list(o_AdministrativeAction) },
  },
  errors: [
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
    SourceSnapshotNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopySnapshotAndUpdateVolume",
})) as any;

export type CreateAndAttachS3AccessPointError =
  | AccessPointAlreadyOwnedByYou
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | InvalidAccessPoint
  | InvalidRequest
  | TooManyAccessPoints
  | UnsupportedOperation
  | VolumeNotFound
  | CommonErrors;
/**
 * Creates an S3 access point and attaches it to an Amazon FSx volume. For FSx for OpenZFS file systems, the
 * volume must be hosted on a high-availability file system, either Single-AZ or Multi-AZ. For more information,
 * see Accessing your data using Amazon S3 access points.
 * in the Amazon FSx for OpenZFS User Guide.
 *
 * The requester requires the following permissions to perform these actions:
 *
 * - `fsx:CreateAndAttachS3AccessPoint`
 *
 * - `s3:CreateAccessPoint`
 *
 * - `s3:GetAccessPoint`
 *
 * - `s3:PutAccessPointPolicy`
 *
 * - `s3:DeleteAccessPoint`
 *
 * The following actions are related to `CreateAndAttachS3AccessPoint`:
 *
 * - DescribeS3AccessPointAttachments
 *
 * - DetachAndDeleteS3AccessPoint
 */
export const createAndAttachS3AccessPoint: API.OperationMethod<
  CreateAndAttachS3AccessPointRequest,
  CreateAndAttachS3AccessPointResponse,
  CreateAndAttachS3AccessPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientRequestToken: D.m({ idempotency: true }),
      Name: 0,
      Type: 0,
      OpenZFSConfiguration: {
        VolumeId: 0,
        FileSystemIdentity: {
          Type: 0,
          PosixUser: { Uid: 0, Gid: 0, SecondaryGids: 0 },
        },
      },
      OntapConfiguration: {
        VolumeId: 0,
        FileSystemIdentity: {
          Type: 0,
          UnixUser: { Name: 0 },
          WindowsUser: { Name: 0 },
        },
      },
      S3AccessPoint: { VpcConfiguration: { VpcId: 0 }, Policy: 0 },
    },
    output: { S3AccessPointAttachment: o_S3AccessPointAttachment },
  },
  errors: [
    AccessPointAlreadyOwnedByYou,
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    InvalidAccessPoint,
    InvalidRequest,
    TooManyAccessPoints,
    UnsupportedOperation,
    VolumeNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAndAttachS3AccessPoint",
})) as any;

export type CreateBackupError =
  | BackupInProgress
  | BadRequest
  | FileSystemNotFound
  | IncompatibleParameterError
  | InternalServerError
  | ServiceLimitExceeded
  | UnsupportedOperation
  | VolumeNotFound
  | CommonErrors;
/**
 * Creates a backup of an existing Amazon FSx for Windows File Server file
 * system, Amazon FSx for Lustre file system, Amazon FSx for NetApp ONTAP
 * volume, or Amazon FSx for OpenZFS file system. We recommend creating regular
 * backups so that you can restore a file system or volume from a backup if an issue arises
 * with the original file system or volume.
 *
 * For Amazon FSx for Lustre file systems, you can create a backup only for file
 * systems that have the following configuration:
 *
 * - A Persistent deployment type
 *
 * - Are *not* linked to a data repository
 *
 * For more information about backups, see the following:
 *
 * - For Amazon FSx for Lustre, see Working with FSx for
 * Lustre backups.
 *
 * - For Amazon FSx for Windows, see Working with FSx for
 * Windows backups.
 *
 * - For Amazon FSx for NetApp ONTAP, see Working with FSx for NetApp
 * ONTAP backups.
 *
 * - For Amazon FSx for OpenZFS, see Working with FSx for OpenZFS backups.
 *
 * If a backup with the specified client request token exists and the parameters match,
 * this operation returns the description of the existing backup. If a backup with the
 * specified client request token exists and the parameters don't match, this operation
 * returns `IncompatibleParameterError`. If a backup with the specified client
 * request token doesn't exist, `CreateBackup` does the following:
 *
 * - Creates a new Amazon FSx backup with an assigned ID, and an initial
 * lifecycle state of `CREATING`.
 *
 * - Returns the description of the backup.
 *
 * By using the idempotent operation, you can retry a `CreateBackup`
 * operation without the risk of creating an extra backup. This approach can be useful when
 * an initial call fails in a way that makes it unclear whether a backup was created. If
 * you use the same client request token and the initial call created a backup, the
 * operation returns a successful result because all the parameters are the same.
 *
 * The `CreateBackup` operation returns while the backup's lifecycle state is
 * still `CREATING`. You can check the backup creation status by calling the
 * DescribeBackups operation, which returns the backup state along with other
 * information.
 */
export const createBackup: API.OperationMethod<
  CreateBackupRequest,
  CreateBackupResponse,
  CreateBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      FileSystemId: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
      VolumeId: 0,
    },
    output: { Backup: o_Backup },
  },
  errors: [
    BackupInProgress,
    BadRequest,
    FileSystemNotFound,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
    UnsupportedOperation,
    VolumeNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBackup",
})) as any;

export type CreateDataRepositoryAssociationError =
  | BadRequest
  | FileSystemNotFound
  | IncompatibleParameterError
  | InternalServerError
  | ServiceLimitExceeded
  | UnsupportedOperation
  | CommonErrors;
/**
 * Creates an Amazon FSx for Lustre data repository association (DRA). A data
 * repository association is a link between a directory on the file system and
 * an Amazon S3 bucket or prefix. You can have a maximum of 8 data repository
 * associations on a file system. Data repository associations are supported
 * on all FSx for Lustre 2.12 and 2.15 file systems, excluding
 * `scratch_1` deployment type.
 *
 * Each data repository association must have a unique Amazon FSx file
 * system directory and a unique S3 bucket or prefix associated with it. You
 * can configure a data repository association for automatic import only,
 * for automatic export only, or for both. To learn more about linking a
 * data repository to your file system, see
 * Linking your file system to an S3 bucket.
 *
 * `CreateDataRepositoryAssociation` isn't supported
 * on Amazon File Cache resources. To create a DRA on Amazon File Cache,
 * use the `CreateFileCache` operation.
 */
export const createDataRepositoryAssociation: API.OperationMethod<
  CreateDataRepositoryAssociationRequest,
  CreateDataRepositoryAssociationResponse,
  CreateDataRepositoryAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      FileSystemId: 0,
      FileSystemPath: 0,
      DataRepositoryPath: 0,
      BatchImportMetaDataOnCreate: 0,
      ImportedFileChunkSize: 0,
      S3: i_S3DataRepositoryConfiguration,
      ClientRequestToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
    },
    output: { Association: o_DataRepositoryAssociation },
  },
  errors: [
    BadRequest,
    FileSystemNotFound,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataRepositoryAssociation",
})) as any;

export type CreateDataRepositoryTaskError =
  | BadRequest
  | DataRepositoryTaskExecuting
  | FileSystemNotFound
  | IncompatibleParameterError
  | InternalServerError
  | ServiceLimitExceeded
  | UnsupportedOperation
  | CommonErrors;
/**
 * Creates an Amazon FSx for Lustre data repository task.
 * A `CreateDataRepositoryTask` operation will fail if a data
 * repository is not linked to the FSx file system.
 *
 * You use import and export data repository tasks to perform bulk operations between your
 * FSx for Lustre file system and its linked data repositories. An example of a data repository
 * task is exporting any data and metadata changes, including POSIX metadata, to files, directories,
 * and symbolic links (symlinks) from your FSx file system to a linked data repository.
 *
 * You use release data repository tasks to release data from your file system for files that
 * are exported to S3. The metadata of released files remains on the file system so users or applications
 * can still access released files by reading the files again, which will restore data from
 * Amazon S3 to the FSx for Lustre file system.
 *
 * To learn more about data repository tasks, see
 * Data Repository Tasks.
 * To learn more about linking a data repository to your file system, see
 * Linking your file system to an S3 bucket.
 */
export const createDataRepositoryTask: API.OperationMethod<
  CreateDataRepositoryTaskRequest,
  CreateDataRepositoryTaskResponse,
  CreateDataRepositoryTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Type: 0,
      Paths: 0,
      FileSystemId: 0,
      Report: { Enabled: 0, Path: 0, Format: 0, Scope: 0 },
      ClientRequestToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
      CapacityToRelease: 0,
      ReleaseConfiguration: { DurationSinceLastAccess: { Unit: 0, Value: 0 } },
    },
    output: { DataRepositoryTask: o_DataRepositoryTask },
  },
  errors: [
    BadRequest,
    DataRepositoryTaskExecuting,
    FileSystemNotFound,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataRepositoryTask",
})) as any;

export type CreateFileCacheError =
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | InvalidNetworkSettings
  | InvalidPerUnitStorageThroughput
  | MissingFileCacheConfiguration
  | ServiceLimitExceeded
  | CommonErrors;
/**
 * Creates a new Amazon File Cache resource.
 *
 * You can use this operation with a client request token in the request that
 * Amazon File Cache uses to ensure idempotent creation.
 * If a cache with the specified client request token exists and the parameters
 * match, `CreateFileCache` returns the description of the existing
 * cache. If a cache with the specified client request token exists and the
 * parameters don't match, this call returns `IncompatibleParameterError`.
 * If a file cache with the specified client request token doesn't exist,
 * `CreateFileCache` does the following:
 *
 * - Creates a new, empty Amazon File Cache resource with an assigned ID, and
 * an initial lifecycle state of `CREATING`.
 *
 * - Returns the description of the cache in JSON format.
 *
 * The `CreateFileCache` call returns while the cache's lifecycle
 * state is still `CREATING`. You can check the cache creation status
 * by calling the DescribeFileCaches operation, which returns the cache state
 * along with other information.
 */
export const createFileCache: API.OperationMethod<
  CreateFileCacheRequest,
  CreateFileCacheResponse,
  CreateFileCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientRequestToken: D.m({ idempotency: true }),
      FileCacheType: 0,
      FileCacheTypeVersion: 0,
      StorageCapacity: 0,
      SubnetIds: 0,
      SecurityGroupIds: 0,
      Tags: D.list(i_Tag),
      CopyTagsToDataRepositoryAssociations: 0,
      KmsKeyId: 0,
      LustreConfiguration: {
        PerUnitStorageThroughput: 0,
        DeploymentType: 0,
        WeeklyMaintenanceStartTime: 0,
        MetadataConfiguration: { StorageCapacity: 0 },
      },
      DataRepositoryAssociations: D.list({
        FileCachePath: 0,
        DataRepositoryPath: 0,
        DataRepositorySubdirectories: 0,
        NFS: { Version: 0, DnsIps: 0 },
      }),
    },
    output: { FileCache: { CreationTime: D.ts } },
  },
  errors: [
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    InvalidNetworkSettings,
    InvalidPerUnitStorageThroughput,
    MissingFileCacheConfiguration,
    ServiceLimitExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFileCache",
})) as any;

export type CreateFileSystemError =
  | ActiveDirectoryError
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | InvalidExportPath
  | InvalidImportPath
  | InvalidNetworkSettings
  | InvalidPerUnitStorageThroughput
  | MissingFileSystemConfiguration
  | ServiceLimitExceeded
  | CommonErrors;
/**
 * Creates a new, empty Amazon FSx file system. You can create the following supported
 * Amazon FSx file systems using the `CreateFileSystem` API operation:
 *
 * - Amazon FSx for Lustre
 *
 * - Amazon FSx for NetApp ONTAP
 *
 * - Amazon FSx for OpenZFS
 *
 * - Amazon FSx for Windows File Server
 *
 * This operation requires a client request token in the request that Amazon FSx uses
 * to ensure idempotent creation. This means that calling the operation multiple times with
 * the same client request token has no effect. By using the idempotent operation, you can
 * retry a `CreateFileSystem` operation without the risk of creating an extra
 * file system. This approach can be useful when an initial call fails in a way that makes
 * it unclear whether a file system was created. Examples are if a transport level timeout
 * occurred, or your connection was reset. If you use the same client request token and the
 * initial call created a file system, the client receives success as long as the
 * parameters are the same.
 *
 * If a file system with the specified client request token exists and the parameters
 * match, `CreateFileSystem` returns the description of the existing file
 * system. If a file system with the specified client request token exists and the
 * parameters don't match, this call returns `IncompatibleParameterError`. If a
 * file system with the specified client request token doesn't exist,
 * `CreateFileSystem` does the following:
 *
 * - Creates a new, empty Amazon FSx file system with an assigned ID, and
 * an initial lifecycle state of `CREATING`.
 *
 * - Returns the description of the file system in JSON format.
 *
 * The `CreateFileSystem` call returns while the file system's lifecycle
 * state is still `CREATING`. You can check the file-system creation status
 * by calling the DescribeFileSystems operation, which returns the file system state
 * along with other information.
 */
export const createFileSystem: API.OperationMethod<
  CreateFileSystemRequest,
  CreateFileSystemResponse,
  CreateFileSystemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientRequestToken: D.m({ idempotency: true }),
      FileSystemType: 0,
      StorageCapacity: 0,
      StorageType: 0,
      SubnetIds: 0,
      SecurityGroupIds: 0,
      Tags: D.list(i_Tag),
      KmsKeyId: 0,
      WindowsConfiguration: i_CreateFileSystemWindowsConfiguration,
      LustreConfiguration: i_CreateFileSystemLustreConfiguration,
      OntapConfiguration: {
        AutomaticBackupRetentionDays: 0,
        DailyAutomaticBackupStartTime: 0,
        DeploymentType: 0,
        EndpointIpAddressRange: 0,
        FsxAdminPassword: 0,
        DiskIopsConfiguration: i_DiskIopsConfiguration,
        PreferredSubnetId: 0,
        RouteTableIds: 0,
        ThroughputCapacity: 0,
        WeeklyMaintenanceStartTime: 0,
        HAPairs: 0,
        ThroughputCapacityPerHAPair: 0,
        EndpointIpv6AddressRange: 0,
      },
      FileSystemTypeVersion: 0,
      OpenZFSConfiguration: i_CreateFileSystemOpenZFSConfiguration,
      NetworkType: 0,
    },
    output: { FileSystem: o_FileSystem },
  },
  errors: [
    ActiveDirectoryError,
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    InvalidExportPath,
    InvalidImportPath,
    InvalidNetworkSettings,
    InvalidPerUnitStorageThroughput,
    MissingFileSystemConfiguration,
    ServiceLimitExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFileSystem",
})) as any;

export type CreateFileSystemFromBackupError =
  | ActiveDirectoryError
  | BackupNotFound
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | InvalidNetworkSettings
  | InvalidPerUnitStorageThroughput
  | MissingFileSystemConfiguration
  | ServiceLimitExceeded
  | CommonErrors;
/**
 * Creates a new Amazon FSx for Lustre, Amazon FSx for Windows File
 * Server, or Amazon FSx for OpenZFS file system from an existing Amazon FSx backup.
 *
 * If a file system with the specified client request token exists and the parameters
 * match, this operation returns the description of the file system. If a file system
 * with the specified client request token exists but the parameters don't match, this
 * call returns `IncompatibleParameterError`. If a file system with the
 * specified client request token doesn't exist, this operation does the following:
 *
 * - Creates a new Amazon FSx file system from backup with an assigned ID,
 * and an initial lifecycle state of `CREATING`.
 *
 * - Returns the description of the file system.
 *
 * Parameters like the Active Directory, default share name, automatic backup, and backup
 * settings default to the parameters of the file system that was backed up, unless
 * overridden. You can explicitly supply other settings.
 *
 * By using the idempotent operation, you can retry a
 * `CreateFileSystemFromBackup` call without the risk of creating an extra
 * file system. This approach can be useful when an initial call fails in a way that makes
 * it unclear whether a file system was created. Examples are if a transport level timeout
 * occurred, or your connection was reset. If you use the same client request token and the
 * initial call created a file system, the client receives a success message as long as the
 * parameters are the same.
 *
 * The `CreateFileSystemFromBackup` call returns while the file system's
 * lifecycle state is still `CREATING`. You can check the file-system
 * creation status by calling the
 * DescribeFileSystems operation, which returns the file system state along
 * with other information.
 */
export const createFileSystemFromBackup: API.OperationMethod<
  CreateFileSystemFromBackupRequest,
  CreateFileSystemFromBackupResponse,
  CreateFileSystemFromBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      BackupId: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      SubnetIds: 0,
      SecurityGroupIds: 0,
      Tags: D.list(i_Tag),
      WindowsConfiguration: i_CreateFileSystemWindowsConfiguration,
      LustreConfiguration: i_CreateFileSystemLustreConfiguration,
      StorageType: 0,
      KmsKeyId: 0,
      FileSystemTypeVersion: 0,
      OpenZFSConfiguration: i_CreateFileSystemOpenZFSConfiguration,
      StorageCapacity: 0,
      NetworkType: 0,
    },
    output: { FileSystem: o_FileSystem },
  },
  errors: [
    ActiveDirectoryError,
    BackupNotFound,
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    InvalidNetworkSettings,
    InvalidPerUnitStorageThroughput,
    MissingFileSystemConfiguration,
    ServiceLimitExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFileSystemFromBackup",
})) as any;

export type CreateSnapshotError =
  | BadRequest
  | InternalServerError
  | ServiceLimitExceeded
  | VolumeNotFound
  | SnapshotVolumeNotFound
  | CommonErrors;
/**
 * Creates a snapshot of an existing Amazon FSx for OpenZFS volume. With
 * snapshots, you can easily undo file changes and compare file versions by restoring the
 * volume to a previous version.
 *
 * If a snapshot with the specified client request token exists, and the parameters
 * match, this operation returns the description of the existing snapshot. If a snapshot
 * with the specified client request token exists, and the parameters don't match, this
 * operation returns `IncompatibleParameterError`. If a snapshot with the
 * specified client request token doesn't exist, `CreateSnapshot` does the
 * following:
 *
 * - Creates a new OpenZFS snapshot with an assigned ID, and an initial lifecycle
 * state of `CREATING`.
 *
 * - Returns the description of the snapshot.
 *
 * By using the idempotent operation, you can retry a `CreateSnapshot`
 * operation without the risk of creating an extra snapshot. This approach can be useful
 * when an initial call fails in a way that makes it unclear whether a snapshot was
 * created. If you use the same client request token and the initial call created a
 * snapshot, the operation returns a successful result because all the parameters are the
 * same.
 *
 * The `CreateSnapshot` operation returns while the snapshot's lifecycle state
 * is still `CREATING`. You can check the snapshot creation status by calling
 * the DescribeSnapshots operation, which returns the snapshot state along with
 * other information.
 */
export const createSnapshot: API.OperationMethod<
  CreateSnapshotRequest,
  CreateSnapshotResponse,
  CreateSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientRequestToken: D.m({ idempotency: true }),
      Name: 0,
      VolumeId: 0,
      Tags: D.list(i_Tag),
    },
    output: { Snapshot: o_Snapshot },
  },
  errors: [
    BadRequest,
    InternalServerError,
    ServiceLimitExceeded,
    VolumeNotFound,
    SnapshotVolumeNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSnapshot",
})) as any;

export type CreateStorageVirtualMachineError =
  | ActiveDirectoryError
  | BadRequest
  | FileSystemNotFound
  | IncompatibleParameterError
  | InternalServerError
  | ServiceLimitExceeded
  | UnsupportedOperation
  | CommonErrors;
/**
 * Creates a storage virtual machine (SVM) for an Amazon FSx for ONTAP file system.
 */
export const createStorageVirtualMachine: API.OperationMethod<
  CreateStorageVirtualMachineRequest,
  CreateStorageVirtualMachineResponse,
  CreateStorageVirtualMachineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ActiveDirectoryConfiguration: {
        NetBiosName: 0,
        SelfManagedActiveDirectoryConfiguration:
          i_SelfManagedActiveDirectoryConfiguration,
      },
      ClientRequestToken: D.m({ idempotency: true }),
      FileSystemId: 0,
      Name: 0,
      SvmAdminPassword: 0,
      Tags: D.list(i_Tag),
      RootVolumeSecurityStyle: 0,
    },
    output: { StorageVirtualMachine: o_StorageVirtualMachine },
  },
  errors: [
    ActiveDirectoryError,
    BadRequest,
    FileSystemNotFound,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStorageVirtualMachine",
})) as any;

export type CreateVolumeError =
  | BadRequest
  | FileSystemNotFound
  | IncompatibleParameterError
  | InternalServerError
  | MissingVolumeConfiguration
  | ServiceLimitExceeded
  | StorageVirtualMachineNotFound
  | UnsupportedOperation
  | CommonErrors;
/**
 * Creates an FSx for ONTAP or Amazon FSx for OpenZFS storage volume.
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
      ClientRequestToken: D.m({ idempotency: true }),
      VolumeType: 0,
      Name: 0,
      OntapConfiguration: i_CreateOntapVolumeConfiguration,
      Tags: D.list(i_Tag),
      OpenZFSConfiguration: {
        ParentVolumeId: 0,
        StorageCapacityReservationGiB: 0,
        StorageCapacityQuotaGiB: 0,
        RecordSizeKiB: 0,
        DataCompressionType: 0,
        CopyTagsToSnapshots: 0,
        OriginSnapshot: { SnapshotARN: 0, CopyStrategy: 0 },
        ReadOnly: 0,
        NfsExports: D.list(i_OpenZFSNfsExport),
        UserAndGroupQuotas: D.list(i_OpenZFSUserOrGroupQuota),
      },
    },
    output: { Volume: o_Volume },
  },
  errors: [
    BadRequest,
    FileSystemNotFound,
    IncompatibleParameterError,
    InternalServerError,
    MissingVolumeConfiguration,
    ServiceLimitExceeded,
    StorageVirtualMachineNotFound,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVolume",
})) as any;

export type CreateVolumeFromBackupError =
  | BackupNotFound
  | BadRequest
  | FileSystemNotFound
  | IncompatibleParameterError
  | InternalServerError
  | MissingVolumeConfiguration
  | ServiceLimitExceeded
  | StorageVirtualMachineNotFound
  | CommonErrors;
/**
 * Creates a new Amazon FSx for NetApp ONTAP volume from an
 * existing Amazon FSx volume backup.
 */
export const createVolumeFromBackup: API.OperationMethod<
  CreateVolumeFromBackupRequest,
  CreateVolumeFromBackupResponse,
  CreateVolumeFromBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      BackupId: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      Name: 0,
      OntapConfiguration: i_CreateOntapVolumeConfiguration,
      Tags: D.list(i_Tag),
    },
    output: { Volume: o_Volume },
  },
  errors: [
    BackupNotFound,
    BadRequest,
    FileSystemNotFound,
    IncompatibleParameterError,
    InternalServerError,
    MissingVolumeConfiguration,
    ServiceLimitExceeded,
    StorageVirtualMachineNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVolumeFromBackup",
})) as any;

export type DeleteBackupError =
  | BackupBeingCopied
  | BackupInProgress
  | BackupNotFound
  | BackupRestoring
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | CommonErrors;
/**
 * Deletes an Amazon FSx backup. After deletion, the backup no longer exists, and
 * its data is gone.
 *
 * The `DeleteBackup` call returns instantly. The backup won't show up in
 * later `DescribeBackups` calls.
 *
 * The data in a deleted backup is also deleted and can't be recovered by any
 * means.
 */
export const deleteBackup: API.OperationMethod<
  DeleteBackupRequest,
  DeleteBackupResponse,
  DeleteBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { BackupId: 0, ClientRequestToken: D.m({ idempotency: true }) },
  },
  errors: [
    BackupBeingCopied,
    BackupInProgress,
    BackupNotFound,
    BackupRestoring,
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackup",
})) as any;

export type DeleteDataRepositoryAssociationError =
  | BadRequest
  | DataRepositoryAssociationNotFound
  | IncompatibleParameterError
  | InternalServerError
  | ServiceLimitExceeded
  | CommonErrors;
/**
 * Deletes a data repository association on an Amazon FSx for Lustre
 * file system. Deleting the data repository association unlinks the
 * file system from the Amazon S3 bucket. When deleting a data repository
 * association, you have the option of deleting the data in the file system
 * that corresponds to the data repository association. Data repository
 * associations are supported on all FSx for Lustre 2.12 and 2.15 file
 * systems, excluding `scratch_1` deployment type.
 */
export const deleteDataRepositoryAssociation: API.OperationMethod<
  DeleteDataRepositoryAssociationRequest,
  DeleteDataRepositoryAssociationResponse,
  DeleteDataRepositoryAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AssociationId: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      DeleteDataInFileSystem: 0,
    },
  },
  errors: [
    BadRequest,
    DataRepositoryAssociationNotFound,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataRepositoryAssociation",
})) as any;

export type DeleteFileCacheError =
  | BadRequest
  | FileCacheNotFound
  | IncompatibleParameterError
  | InternalServerError
  | ServiceLimitExceeded
  | CommonErrors;
/**
 * Deletes an Amazon File Cache resource. After deletion, the cache no longer exists, and its data
 * is gone.
 *
 * The `DeleteFileCache` operation returns while the cache has the
 * `DELETING` status. You can check the cache deletion status by
 * calling the DescribeFileCaches operation, which returns a list of caches in your
 * account. If you pass the cache ID for a deleted cache, the
 * `DescribeFileCaches` operation returns a `FileCacheNotFound`
 * error.
 *
 * The data in a deleted cache is also deleted and can't be recovered by
 * any means.
 */
export const deleteFileCache: API.OperationMethod<
  DeleteFileCacheRequest,
  DeleteFileCacheResponse,
  DeleteFileCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { FileCacheId: 0, ClientRequestToken: D.m({ idempotency: true }) },
  },
  errors: [
    BadRequest,
    FileCacheNotFound,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFileCache",
})) as any;

export type DeleteFileSystemError =
  | BadRequest
  | FileSystemNotFound
  | IncompatibleParameterError
  | InternalServerError
  | ServiceLimitExceeded
  | CommonErrors;
/**
 * Deletes a file system. After deletion, the file system no longer exists, and its data
 * is gone. Any existing automatic backups and snapshots are also deleted.
 *
 * To delete an Amazon FSx for NetApp ONTAP file system, first delete all the
 * volumes and storage virtual machines (SVMs) on the file system. Then provide a
 * `FileSystemId` value to the `DeleteFileSystem` operation.
 *
 * Before deleting an Amazon FSx for OpenZFS file system, make sure that there aren't
 * any Amazon S3 access points attached to any volume. For more information on how to list S3
 * access points that are attached to volumes, see
 * Listing S3 access point attachments.
 * For more information on how to delete S3 access points, see
 * Deleting an S3 access point attachment.
 *
 * By default, when you delete an Amazon FSx for Windows File Server file system,
 * a final backup is created upon deletion. This final backup isn't subject to the file
 * system's retention policy, and must be manually deleted.
 *
 * To delete an Amazon FSx for Lustre file system, first
 * unmount
 * it from every connected Amazon EC2 instance, then provide a `FileSystemId`
 * value to the `DeleteFileSystem` operation. By default, Amazon FSx will not
 * take a final backup when the `DeleteFileSystem` operation is invoked. On file systems
 * not linked to an Amazon S3 bucket, set `SkipFinalBackup` to `false`
 * to take a final backup of the file system you are deleting. Backups cannot be enabled on S3-linked
 * file systems. To ensure all of your data is written back to S3 before deleting your file system,
 * you can either monitor for the
 * AgeOfOldestQueuedMessage
 * metric to be zero (if using automatic export) or you can run an
 * export data repository task.
 * If you have automatic export enabled and want to use an export data repository task, you have
 * to disable automatic export before executing the export data repository task.
 *
 * The `DeleteFileSystem` operation returns while the file system has the
 * `DELETING` status. You can check the file system deletion status by
 * calling the DescribeFileSystems operation, which returns a list of file systems in your
 * account. If you pass the file system ID for a deleted file system, the
 * `DescribeFileSystems` operation returns a `FileSystemNotFound`
 * error.
 *
 * If a data repository task is in a `PENDING` or `EXECUTING` state,
 * deleting an Amazon FSx for Lustre file system will fail with an HTTP status
 * code 400 (Bad Request).
 *
 * The data in a deleted file system is also deleted and can't be recovered by
 * any means.
 */
export const deleteFileSystem: API.OperationMethod<
  DeleteFileSystemRequest,
  DeleteFileSystemResponse,
  DeleteFileSystemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      FileSystemId: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      WindowsConfiguration: {
        SkipFinalBackup: 0,
        FinalBackupTags: D.list(i_Tag),
      },
      LustreConfiguration: {
        SkipFinalBackup: 0,
        FinalBackupTags: D.list(i_Tag),
      },
      OpenZFSConfiguration: {
        SkipFinalBackup: 0,
        FinalBackupTags: D.list(i_Tag),
        Options: 0,
      },
    },
  },
  errors: [
    BadRequest,
    FileSystemNotFound,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFileSystem",
})) as any;

export type DeleteSnapshotError =
  | BadRequest
  | InternalServerError
  | SnapshotNotFound
  | CommonErrors;
/**
 * Deletes an Amazon FSx for OpenZFS snapshot. After deletion, the snapshot no longer
 * exists, and its data is gone. Deleting a snapshot doesn't affect snapshots stored in a
 * file system backup.
 *
 * The `DeleteSnapshot` operation returns instantly. The snapshot appears with
 * the lifecycle status of `DELETING` until the deletion is complete.
 */
export const deleteSnapshot: API.OperationMethod<
  DeleteSnapshotRequest,
  DeleteSnapshotResponse,
  DeleteSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClientRequestToken: D.m({ idempotency: true }), SnapshotId: 0 },
  },
  errors: [BadRequest, InternalServerError, SnapshotNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSnapshot",
})) as any;

export type DeleteStorageVirtualMachineError =
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | StorageVirtualMachineNotFound
  | CommonErrors;
/**
 * Deletes an existing Amazon FSx for ONTAP storage virtual machine (SVM). Prior
 * to deleting an SVM, you must delete all non-root volumes in the SVM, otherwise the operation will fail.
 */
export const deleteStorageVirtualMachine: API.OperationMethod<
  DeleteStorageVirtualMachineRequest,
  DeleteStorageVirtualMachineResponse,
  DeleteStorageVirtualMachineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientRequestToken: D.m({ idempotency: true }),
      StorageVirtualMachineId: 0,
    },
  },
  errors: [
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    StorageVirtualMachineNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStorageVirtualMachine",
})) as any;

export type DeleteVolumeError =
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | ServiceLimitExceeded
  | VolumeNotFound
  | CommonErrors;
/**
 * Deletes an Amazon FSx for NetApp ONTAP or Amazon FSx for OpenZFS
 * volume.
 */
export const deleteVolume: API.OperationMethod<
  DeleteVolumeRequest,
  DeleteVolumeResponse,
  DeleteVolumeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientRequestToken: D.m({ idempotency: true }),
      VolumeId: 0,
      OntapConfiguration: {
        SkipFinalBackup: 0,
        FinalBackupTags: D.list(i_Tag),
        BypassSnaplockEnterpriseRetention: 0,
      },
      OpenZFSConfiguration: { Options: 0 },
    },
  },
  errors: [
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
    VolumeNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVolume",
})) as any;

export type DescribeBackupsError =
  | BackupNotFound
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | VolumeNotFound
  | CommonErrors;
/**
 * Returns the description of a specific Amazon FSx backup, if a
 * `BackupIds` value is provided for that backup. Otherwise, it returns all
 * backups owned by your Amazon Web Services account in the Amazon Web Services Region of the
 * endpoint that you're calling.
 *
 * When retrieving all backups, you can optionally specify the `MaxResults`
 * parameter to limit the number of backups in a response. If more backups remain, Amazon FSx returns a `NextToken` value in the response. In this case,
 * send a later request with the `NextToken` request parameter set to the value
 * of the `NextToken` value from the last response.
 *
 * This operation is used in an iterative process to retrieve a list of your backups.
 * `DescribeBackups` is called first without a `NextToken` value.
 * Then the operation continues to be called with the `NextToken` parameter set
 * to the value of the last `NextToken` value until a response has no
 * `NextToken` value.
 *
 * When using this operation, keep the following in mind:
 *
 * - The operation might return fewer than the `MaxResults` value of
 * backup descriptions while still including a `NextToken`
 * value.
 *
 * - The order of the backups returned in the response of one
 * `DescribeBackups` call and the order of the backups returned
 * across the responses of a multi-call iteration is unspecified.
 */
export const describeBackups: API.PaginatedOperationMethod<
  DescribeBackupsRequest,
  DescribeBackupsResponse,
  DescribeBackupsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      BackupIds: 0,
      Filters: D.list(i_Filter),
      MaxResults: 0,
      NextToken: 0,
    },
    output: { Backups: D.list(o_Backup) },
  },
  errors: [
    BackupNotFound,
    BadRequest,
    FileSystemNotFound,
    InternalServerError,
    VolumeNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBackups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeDataRepositoryAssociationsError =
  | BadRequest
  | DataRepositoryAssociationNotFound
  | FileSystemNotFound
  | InternalServerError
  | InvalidDataRepositoryType
  | CommonErrors;
/**
 * Returns the description of specific Amazon FSx for Lustre or Amazon File Cache
 * data repository associations, if one or more `AssociationIds` values
 * are provided in the request, or if filters are used in the request. Data repository
 * associations are supported on Amazon File Cache resources and all FSx for Lustre
 * 2.12 and 2,15 file systems, excluding `scratch_1` deployment type.
 *
 * You can use filters to narrow the response to include just data repository
 * associations for specific file systems (use the `file-system-id` filter with
 * the ID of the file system) or caches (use the `file-cache-id` filter with
 * the ID of the cache), or data repository associations for a specific repository type
 * (use the `data-repository-type` filter with a value of `S3`
 * or `NFS`). If you don't use filters, the response returns all data
 * repository associations owned by your Amazon Web Services account in the Amazon Web Services Region
 * of the endpoint that you're calling.
 *
 * When retrieving all data repository associations, you can paginate the response by using
 * the optional `MaxResults` parameter to limit the number of data repository associations
 * returned in a response. If more data repository associations remain, a
 * `NextToken` value is returned in the response. In this case, send a later
 * request with the `NextToken` request parameter set to the value of
 * `NextToken` from the last response.
 */
export const describeDataRepositoryAssociations: API.PaginatedOperationMethod<
  DescribeDataRepositoryAssociationsRequest,
  DescribeDataRepositoryAssociationsResponse,
  DescribeDataRepositoryAssociationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      AssociationIds: 0,
      Filters: D.list(i_Filter),
      MaxResults: 0,
      NextToken: 0,
    },
    output: { Associations: D.list(o_DataRepositoryAssociation) },
  },
  errors: [
    BadRequest,
    DataRepositoryAssociationNotFound,
    FileSystemNotFound,
    InternalServerError,
    InvalidDataRepositoryType,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataRepositoryAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeDataRepositoryTasksError =
  | BadRequest
  | DataRepositoryTaskNotFound
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Returns the description of specific Amazon FSx for Lustre or Amazon File Cache data repository tasks, if
 * one or more `TaskIds` values are provided in the request, or if filters are used in the request.
 * You can use filters to narrow the response to include just tasks for specific file systems or caches,
 * or tasks in a specific lifecycle state. Otherwise, it returns all data repository tasks owned
 * by your Amazon Web Services account in the Amazon Web Services Region of the endpoint that you're calling.
 *
 * When retrieving all tasks, you can paginate the response by using the optional `MaxResults`
 * parameter to limit the number of tasks returned in a response. If more tasks remain,
 * a `NextToken` value is returned in the response. In this case, send a later
 * request with the `NextToken` request parameter set to the value of
 * `NextToken` from the last response.
 */
export const describeDataRepositoryTasks: API.PaginatedOperationMethod<
  DescribeDataRepositoryTasksRequest,
  DescribeDataRepositoryTasksResponse,
  DescribeDataRepositoryTasksError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      TaskIds: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
      MaxResults: 0,
      NextToken: 0,
    },
    output: { DataRepositoryTasks: D.list(o_DataRepositoryTask) },
  },
  errors: [
    BadRequest,
    DataRepositoryTaskNotFound,
    FileSystemNotFound,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataRepositoryTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeFileCachesError =
  | BadRequest
  | FileCacheNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Returns the description of a specific Amazon File Cache resource, if a
 * `FileCacheIds` value is provided for that cache. Otherwise, it
 * returns descriptions of all caches owned by your Amazon Web Services account in the
 * Amazon Web Services Region of the endpoint that you're calling.
 *
 * When retrieving all cache descriptions, you can optionally specify the
 * `MaxResults` parameter to limit the number of descriptions in a response.
 * If more cache descriptions remain, the operation returns a
 * `NextToken` value in the response. In this case, send a later request
 * with the `NextToken` request parameter set to the value of
 * `NextToken` from the last response.
 *
 * This operation is used in an iterative process to retrieve a list of your cache
 * descriptions. `DescribeFileCaches` is called first without a
 * `NextToken`value. Then the operation continues to be called with the
 * `NextToken` parameter set to the value of the last `NextToken`
 * value until a response has no `NextToken`.
 *
 * When using this operation, keep the following in mind:
 *
 * - The implementation might return fewer than `MaxResults`
 * cache descriptions while still including a `NextToken`
 * value.
 *
 * - The order of caches returned in the response of one
 * `DescribeFileCaches` call and the order of caches returned
 * across the responses of a multicall iteration is unspecified.
 */
export const describeFileCaches: API.PaginatedOperationMethod<
  DescribeFileCachesRequest,
  DescribeFileCachesResponse,
  DescribeFileCachesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { FileCacheIds: 0, MaxResults: 0, NextToken: 0 },
    output: { FileCaches: D.list(o_FileCache) },
  },
  errors: [BadRequest, FileCacheNotFound, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFileCaches",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeFileSystemAliasesError =
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Returns the DNS aliases that are associated with the specified Amazon FSx for Windows File Server file system. A history of
 * all DNS aliases that have been associated with and disassociated from the file system is available in the list of AdministrativeAction
 * provided in the DescribeFileSystems operation response.
 */
export const describeFileSystemAliases: API.PaginatedOperationMethod<
  DescribeFileSystemAliasesRequest,
  DescribeFileSystemAliasesResponse,
  DescribeFileSystemAliasesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientRequestToken: D.m({ idempotency: true }),
      FileSystemId: 0,
      MaxResults: 0,
      NextToken: 0,
    },
  },
  errors: [BadRequest, FileSystemNotFound, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFileSystemAliases",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeFileSystemsError =
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Returns the description of specific Amazon FSx file systems, if a
 * `FileSystemIds` value is provided for that file system. Otherwise, it
 * returns descriptions of all file systems owned by your Amazon Web Services account in the
 * Amazon Web Services Region of the endpoint that you're calling.
 *
 * When retrieving all file system descriptions, you can optionally specify the
 * `MaxResults` parameter to limit the number of descriptions in a response.
 * If more file system descriptions remain, Amazon FSx returns a
 * `NextToken` value in the response. In this case, send a later request
 * with the `NextToken` request parameter set to the value of
 * `NextToken` from the last response.
 *
 * This operation is used in an iterative process to retrieve a list of your file system
 * descriptions. `DescribeFileSystems` is called first without a
 * `NextToken`value. Then the operation continues to be called with the
 * `NextToken` parameter set to the value of the last `NextToken`
 * value until a response has no `NextToken`.
 *
 * When using this operation, keep the following in mind:
 *
 * - The implementation might return fewer than `MaxResults` file
 * system descriptions while still including a `NextToken`
 * value.
 *
 * - The order of file systems returned in the response of one
 * `DescribeFileSystems` call and the order of file systems returned
 * across the responses of a multicall iteration is unspecified.
 */
export const describeFileSystems: API.PaginatedOperationMethod<
  DescribeFileSystemsRequest,
  DescribeFileSystemsResponse,
  DescribeFileSystemsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { FileSystemIds: 0, MaxResults: 0, NextToken: 0 },
    output: { FileSystems: D.list(o_FileSystem) },
  },
  errors: [BadRequest, FileSystemNotFound, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFileSystems",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeS3AccessPointAttachmentsError =
  | BadRequest
  | InternalServerError
  | S3AccessPointAttachmentNotFound
  | UnsupportedOperation
  | CommonErrors;
/**
 * Describes one or more S3 access points attached to Amazon FSx volumes.
 *
 * The requester requires the following permission to perform this action:
 *
 * - `fsx:DescribeS3AccessPointAttachments`
 */
export const describeS3AccessPointAttachments: API.PaginatedOperationMethod<
  DescribeS3AccessPointAttachmentsRequest,
  DescribeS3AccessPointAttachmentsResponse,
  DescribeS3AccessPointAttachmentsError,
  Credentials | HttpClient.HttpClient,
  S3AccessPointAttachment
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Names: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
      MaxResults: 0,
      NextToken: 0,
    },
    output: { S3AccessPointAttachments: D.list(o_S3AccessPointAttachment) },
  },
  errors: [
    BadRequest,
    InternalServerError,
    S3AccessPointAttachmentNotFound,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeS3AccessPointAttachments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "S3AccessPointAttachments",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeSharedVpcConfigurationError =
  | BadRequest
  | InternalServerError
  | CommonErrors;
/**
 * Indicates whether participant accounts in your organization can create Amazon FSx for NetApp ONTAP Multi-AZ file systems in subnets that are shared by a virtual
 * private cloud (VPC) owner. For more information, see Creating FSx for ONTAP file systems in shared subnets.
 */
export const describeSharedVpcConfiguration: API.OperationMethod<
  DescribeSharedVpcConfigurationRequest,
  DescribeSharedVpcConfigurationResponse,
  DescribeSharedVpcConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [BadRequest, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSharedVpcConfiguration",
})) as any;

export type DescribeSnapshotsError =
  | BadRequest
  | InternalServerError
  | SnapshotNotFound
  | CommonErrors;
/**
 * Returns the description of specific Amazon FSx for OpenZFS snapshots, if a
 * `SnapshotIds` value is provided. Otherwise, this operation returns all
 * snapshots owned by your Amazon Web Services account in the Amazon Web Services Region of
 * the endpoint that you're calling.
 *
 * When retrieving all snapshots, you can optionally specify the `MaxResults`
 * parameter to limit the number of snapshots in a response. If more backups remain,
 * Amazon FSx returns a `NextToken` value in the response. In this
 * case, send a later request with the `NextToken` request parameter set to the
 * value of `NextToken` from the last response.
 *
 * Use this operation in an iterative process to retrieve a list of your snapshots.
 * `DescribeSnapshots` is called first without a `NextToken`
 * value. Then the operation continues to be called with the `NextToken`
 * parameter set to the value of the last `NextToken` value until a response has
 * no `NextToken` value.
 *
 * When using this operation, keep the following in mind:
 *
 * - The operation might return fewer than the `MaxResults` value of
 * snapshot descriptions while still including a `NextToken`
 * value.
 *
 * - The order of snapshots returned in the response of one
 * `DescribeSnapshots` call and the order of backups returned across
 * the responses of a multi-call iteration is unspecified.
 */
export const describeSnapshots: API.PaginatedOperationMethod<
  DescribeSnapshotsRequest,
  DescribeSnapshotsResponse,
  DescribeSnapshotsError,
  Credentials | HttpClient.HttpClient,
  Snapshot
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      SnapshotIds: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
      MaxResults: 0,
      NextToken: 0,
      IncludeShared: 0,
    },
    output: { Snapshots: D.list(o_Snapshot) },
  },
  errors: [BadRequest, InternalServerError, SnapshotNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSnapshots",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Snapshots",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeStorageVirtualMachinesError =
  | BadRequest
  | InternalServerError
  | StorageVirtualMachineNotFound
  | CommonErrors;
/**
 * Describes one or more Amazon FSx for NetApp ONTAP storage virtual machines (SVMs).
 */
export const describeStorageVirtualMachines: API.PaginatedOperationMethod<
  DescribeStorageVirtualMachinesRequest,
  DescribeStorageVirtualMachinesResponse,
  DescribeStorageVirtualMachinesError,
  Credentials | HttpClient.HttpClient,
  StorageVirtualMachine
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      StorageVirtualMachineIds: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
      MaxResults: 0,
      NextToken: 0,
    },
    output: { StorageVirtualMachines: D.list(o_StorageVirtualMachine) },
  },
  errors: [BadRequest, InternalServerError, StorageVirtualMachineNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStorageVirtualMachines",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "StorageVirtualMachines",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeVolumesError =
  | BadRequest
  | InternalServerError
  | VolumeNotFound
  | CommonErrors;
/**
 * Describes one or more Amazon FSx for NetApp ONTAP or Amazon FSx for
 * OpenZFS volumes.
 */
export const describeVolumes: API.PaginatedOperationMethod<
  DescribeVolumesRequest,
  DescribeVolumesResponse,
  DescribeVolumesError,
  Credentials | HttpClient.HttpClient,
  Volume
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      VolumeIds: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
      MaxResults: 0,
      NextToken: 0,
    },
    output: { Volumes: D.list(o_Volume) },
  },
  errors: [BadRequest, InternalServerError, VolumeNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVolumes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Volumes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DetachAndDeleteS3AccessPointError =
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | S3AccessPointAttachmentNotFound
  | UnsupportedOperation
  | CommonErrors;
/**
 * Detaches an S3 access point from an Amazon FSx volume and deletes the S3 access point.
 *
 * The requester requires the following permission to perform this action:
 *
 * - `fsx:DetachAndDeleteS3AccessPoint`
 *
 * - `s3:DeleteAccessPoint`
 */
export const detachAndDeleteS3AccessPoint: API.OperationMethod<
  DetachAndDeleteS3AccessPointRequest,
  DetachAndDeleteS3AccessPointResponse,
  DetachAndDeleteS3AccessPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClientRequestToken: D.m({ idempotency: true }), Name: 0 },
  },
  errors: [
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    S3AccessPointAttachmentNotFound,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachAndDeleteS3AccessPoint",
})) as any;

export type DisassociateFileSystemAliasesError =
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Use this action to disassociate, or remove, one or more Domain Name Service (DNS) aliases
 * from an Amazon FSx for Windows File Server file system. If you attempt to disassociate a DNS alias that is not
 * associated with the file system, Amazon FSx responds with an HTTP status code 400 (Bad Request). For more information, see
 * Working with DNS Aliases.
 *
 * The system generated response showing the DNS aliases that
 * Amazon FSx is attempting to disassociate from the file system.
 * Use the API
 * operation to monitor the status of the aliases Amazon FSx is
 * disassociating with the file system.
 */
export const disassociateFileSystemAliases: API.OperationMethod<
  DisassociateFileSystemAliasesRequest,
  DisassociateFileSystemAliasesResponse,
  DisassociateFileSystemAliasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientRequestToken: D.m({ idempotency: true }),
      FileSystemId: 0,
      Aliases: 0,
    },
  },
  errors: [BadRequest, FileSystemNotFound, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFileSystemAliases",
})) as any;

export type ListTagsForResourceError =
  | BadRequest
  | InternalServerError
  | NotServiceResourceError
  | ResourceDoesNotSupportTagging
  | ResourceNotFound
  | CommonErrors;
/**
 * Lists tags for Amazon FSx resources.
 *
 * When retrieving all tags, you can optionally specify the `MaxResults`
 * parameter to limit the number of tags in a response. If more tags remain, Amazon FSx
 * returns a `NextToken` value in the response. In this case, send a later
 * request with the `NextToken` request parameter set to the value of
 * `NextToken` from the last response.
 *
 * This action is used in an iterative process to retrieve a list of your tags.
 * `ListTagsForResource` is called first without a
 * `NextToken`value. Then the action continues to be called with the
 * `NextToken` parameter set to the value of the last `NextToken`
 * value until a response has no `NextToken`.
 *
 * When using this action, keep the following in mind:
 *
 * - The implementation might return fewer than `MaxResults` file
 * system descriptions while still including a `NextToken`
 * value.
 *
 * - The order of tags returned in the response of one
 * `ListTagsForResource` call and the order of tags returned across
 * the responses of a multi-call iteration is unspecified.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ResourceARN: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    BadRequest,
    InternalServerError,
    NotServiceResourceError,
    ResourceDoesNotSupportTagging,
    ResourceNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ReleaseFileSystemNfsV3LocksError =
  | BadRequest
  | FileSystemNotFound
  | IncompatibleParameterError
  | InternalServerError
  | ServiceLimitExceeded
  | CommonErrors;
/**
 * Releases the file system lock from an Amazon FSx for OpenZFS file
 * system.
 */
export const releaseFileSystemNfsV3Locks: API.OperationMethod<
  ReleaseFileSystemNfsV3LocksRequest,
  ReleaseFileSystemNfsV3LocksResponse,
  ReleaseFileSystemNfsV3LocksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { FileSystemId: 0, ClientRequestToken: D.m({ idempotency: true }) },
    output: { FileSystem: o_FileSystem },
  },
  errors: [
    BadRequest,
    FileSystemNotFound,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReleaseFileSystemNfsV3Locks",
})) as any;

export type RestoreVolumeFromSnapshotError =
  | BadRequest
  | InternalServerError
  | VolumeNotFound
  | RestoreSnapshotNotFound
  | CommonErrors;
/**
 * Returns an Amazon FSx for OpenZFS volume to the state saved by the specified
 * snapshot.
 */
export const restoreVolumeFromSnapshot: API.OperationMethod<
  RestoreVolumeFromSnapshotRequest,
  RestoreVolumeFromSnapshotResponse,
  RestoreVolumeFromSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientRequestToken: D.m({ idempotency: true }),
      VolumeId: 0,
      SnapshotId: 0,
      Options: 0,
    },
    output: { AdministrativeActions: D.list(o_AdministrativeAction) },
  },
  errors: [
    BadRequest,
    InternalServerError,
    VolumeNotFound,
    RestoreSnapshotNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreVolumeFromSnapshot",
})) as any;

export type StartMisconfiguredStateRecoveryError =
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * After performing steps to repair the Active Directory configuration of an FSx for Windows File Server file system, use this action to
 * initiate the process of Amazon FSx attempting to reconnect to the file system.
 */
export const startMisconfiguredStateRecovery: API.OperationMethod<
  StartMisconfiguredStateRecoveryRequest,
  StartMisconfiguredStateRecoveryResponse,
  StartMisconfiguredStateRecoveryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClientRequestToken: D.m({ idempotency: true }), FileSystemId: 0 },
    output: { FileSystem: o_FileSystem },
  },
  errors: [BadRequest, FileSystemNotFound, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMisconfiguredStateRecovery",
})) as any;

export type TagResourceError =
  | BadRequest
  | InternalServerError
  | NotServiceResourceError
  | ResourceDoesNotSupportTagging
  | ResourceNotFound
  | CommonErrors;
/**
 * Tags an Amazon FSx resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, Tags: D.list(i_Tag) } },
  errors: [
    BadRequest,
    InternalServerError,
    NotServiceResourceError,
    ResourceDoesNotSupportTagging,
    ResourceNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | BadRequest
  | InternalServerError
  | NotServiceResourceError
  | ResourceDoesNotSupportTagging
  | ResourceNotFound
  | CommonErrors;
/**
 * This action removes a tag from an Amazon FSx resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, TagKeys: 0 } },
  errors: [
    BadRequest,
    InternalServerError,
    NotServiceResourceError,
    ResourceDoesNotSupportTagging,
    ResourceNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateDataRepositoryAssociationError =
  | BadRequest
  | DataRepositoryAssociationNotFound
  | IncompatibleParameterError
  | InternalServerError
  | ServiceLimitExceeded
  | CommonErrors;
/**
 * Updates the configuration of an existing data repository association
 * on an Amazon FSx for Lustre file system. Data repository associations
 * are supported on all FSx for Lustre 2.12 and 2.15 file systems,
 * excluding `scratch_1` deployment type.
 */
export const updateDataRepositoryAssociation: API.OperationMethod<
  UpdateDataRepositoryAssociationRequest,
  UpdateDataRepositoryAssociationResponse,
  UpdateDataRepositoryAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AssociationId: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      ImportedFileChunkSize: 0,
      S3: i_S3DataRepositoryConfiguration,
    },
    output: { Association: o_DataRepositoryAssociation },
  },
  errors: [
    BadRequest,
    DataRepositoryAssociationNotFound,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataRepositoryAssociation",
})) as any;

export type UpdateFileCacheError =
  | BadRequest
  | FileCacheNotFound
  | IncompatibleParameterError
  | InternalServerError
  | MissingFileCacheConfiguration
  | ServiceLimitExceeded
  | UnsupportedOperation
  | CommonErrors;
/**
 * Updates the configuration of an existing Amazon File Cache resource.
 * You can update multiple properties in a single request.
 */
export const updateFileCache: API.OperationMethod<
  UpdateFileCacheRequest,
  UpdateFileCacheResponse,
  UpdateFileCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      FileCacheId: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      LustreConfiguration: { WeeklyMaintenanceStartTime: 0 },
    },
    output: { FileCache: o_FileCache },
  },
  errors: [
    BadRequest,
    FileCacheNotFound,
    IncompatibleParameterError,
    InternalServerError,
    MissingFileCacheConfiguration,
    ServiceLimitExceeded,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFileCache",
})) as any;

export type UpdateFileSystemError =
  | BadRequest
  | FileSystemNotFound
  | IncompatibleParameterError
  | InternalServerError
  | InvalidNetworkSettings
  | MissingFileSystemConfiguration
  | ServiceLimitExceeded
  | UnsupportedOperation
  | CommonErrors;
/**
 * Use this operation to update the configuration of an existing Amazon FSx file
 * system. You can update multiple properties in a single request.
 *
 * For FSx for Windows File Server file systems, you can update the following
 * properties:
 *
 * - `AuditLogConfiguration`
 *
 * - `AutomaticBackupRetentionDays`
 *
 * - `DailyAutomaticBackupStartTime`
 *
 * - `DiskIopsConfiguration`
 *
 * - `SelfManagedActiveDirectoryConfiguration`
 *
 * - `StorageCapacity`
 *
 * - `StorageType`
 *
 * - `ThroughputCapacity`
 *
 * - `WeeklyMaintenanceStartTime`
 *
 * For FSx for Lustre file systems, you can update the following
 * properties:
 *
 * - `AutoImportPolicy`
 *
 * - `AutomaticBackupRetentionDays`
 *
 * - `DailyAutomaticBackupStartTime`
 *
 * - `DataCompressionType`
 *
 * - `FileSystemTypeVersion`
 *
 * - `LogConfiguration`
 *
 * - `LustreReadCacheConfiguration`
 *
 * - `LustreRootSquashConfiguration`
 *
 * - `MetadataConfiguration`
 *
 * - `PerUnitStorageThroughput`
 *
 * - `StorageCapacity`
 *
 * - `ThroughputCapacity`
 *
 * - `WeeklyMaintenanceStartTime`
 *
 * For FSx for ONTAP file systems, you can update the following
 * properties:
 *
 * - `AddRouteTableIds`
 *
 * - `AutomaticBackupRetentionDays`
 *
 * - `DailyAutomaticBackupStartTime`
 *
 * - `DiskIopsConfiguration`
 *
 * - `EndpointIpv6AddressRange`
 *
 * - `FsxAdminPassword`
 *
 * - `HAPairs`
 *
 * - `RemoveRouteTableIds`
 *
 * - `StorageCapacity`
 *
 * - `ThroughputCapacity`
 *
 * - `ThroughputCapacityPerHAPair`
 *
 * - `WeeklyMaintenanceStartTime`
 *
 * For FSx for OpenZFS file systems, you can update the following
 * properties:
 *
 * - `AddRouteTableIds`
 *
 * - `AutomaticBackupRetentionDays`
 *
 * - `CopyTagsToBackups`
 *
 * - `CopyTagsToVolumes`
 *
 * - `DailyAutomaticBackupStartTime`
 *
 * - `DiskIopsConfiguration`
 *
 * - `EndpointIpv6AddressRange`
 *
 * - `ReadCacheConfiguration`
 *
 * - `RemoveRouteTableIds`
 *
 * - `StorageCapacity`
 *
 * - `ThroughputCapacity`
 *
 * - `WeeklyMaintenanceStartTime`
 */
export const updateFileSystem: API.OperationMethod<
  UpdateFileSystemRequest,
  UpdateFileSystemResponse,
  UpdateFileSystemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      FileSystemId: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      StorageCapacity: 0,
      WindowsConfiguration: {
        WeeklyMaintenanceStartTime: 0,
        DailyAutomaticBackupStartTime: 0,
        AutomaticBackupRetentionDays: 0,
        ThroughputCapacity: 0,
        SelfManagedActiveDirectoryConfiguration:
          i_SelfManagedActiveDirectoryConfigurationUpdates,
        AuditLogConfiguration: i_WindowsAuditLogCreateConfiguration,
        DiskIopsConfiguration: i_DiskIopsConfiguration,
        FsrmConfiguration: i_WindowsFsrmConfiguration,
      },
      LustreConfiguration: {
        WeeklyMaintenanceStartTime: 0,
        DailyAutomaticBackupStartTime: 0,
        AutomaticBackupRetentionDays: 0,
        AutoImportPolicy: 0,
        DataCompressionType: 0,
        LogConfiguration: i_LustreLogCreateConfiguration,
        RootSquashConfiguration: i_LustreRootSquashConfiguration,
        PerUnitStorageThroughput: 0,
        MetadataConfiguration: { Iops: 0, Mode: 0 },
        ThroughputCapacity: 0,
        DataReadCacheConfiguration: i_LustreReadCacheConfiguration,
      },
      OntapConfiguration: {
        AutomaticBackupRetentionDays: 0,
        DailyAutomaticBackupStartTime: 0,
        FsxAdminPassword: 0,
        WeeklyMaintenanceStartTime: 0,
        DiskIopsConfiguration: i_DiskIopsConfiguration,
        ThroughputCapacity: 0,
        AddRouteTableIds: 0,
        RemoveRouteTableIds: 0,
        ThroughputCapacityPerHAPair: 0,
        HAPairs: 0,
        EndpointIpv6AddressRange: 0,
      },
      OpenZFSConfiguration: {
        AutomaticBackupRetentionDays: 0,
        CopyTagsToBackups: 0,
        CopyTagsToVolumes: 0,
        DailyAutomaticBackupStartTime: 0,
        ThroughputCapacity: 0,
        WeeklyMaintenanceStartTime: 0,
        DiskIopsConfiguration: i_DiskIopsConfiguration,
        AddRouteTableIds: 0,
        RemoveRouteTableIds: 0,
        ReadCacheConfiguration: i_OpenZFSReadCacheConfiguration,
        EndpointIpv6AddressRange: 0,
      },
      StorageType: 0,
      FileSystemTypeVersion: 0,
      NetworkType: 0,
    },
    output: { FileSystem: o_FileSystem },
  },
  errors: [
    BadRequest,
    FileSystemNotFound,
    IncompatibleParameterError,
    InternalServerError,
    InvalidNetworkSettings,
    MissingFileSystemConfiguration,
    ServiceLimitExceeded,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFileSystem",
})) as any;

export type UpdateSharedVpcConfigurationError =
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | CommonErrors;
/**
 * Configures whether participant accounts in your organization can create Amazon FSx for NetApp ONTAP Multi-AZ file systems in subnets that are shared by a virtual
 * private cloud (VPC) owner. For more information, see the Amazon FSx for NetApp ONTAP User
 * Guide.
 *
 * We strongly recommend that participant-created Multi-AZ file systems in the shared
 * VPC are deleted before you disable this feature. Once the feature is disabled, these
 * file systems will enter a `MISCONFIGURED` state and behave like Single-AZ
 * file systems. For more information, see Important considerations before disabling shared VPC support for Multi-AZ file
 * systems.
 */
export const updateSharedVpcConfiguration: API.OperationMethod<
  UpdateSharedVpcConfigurationRequest,
  UpdateSharedVpcConfigurationResponse,
  UpdateSharedVpcConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      EnableFsxRouteTableUpdatesFromParticipantAccounts: 0,
      ClientRequestToken: D.m({ idempotency: true }),
    },
  },
  errors: [BadRequest, IncompatibleParameterError, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSharedVpcConfiguration",
})) as any;

export type UpdateSnapshotError =
  | BadRequest
  | InternalServerError
  | SnapshotNotFound
  | UpdateSnapshotNotFound
  | CommonErrors;
/**
 * Updates the name of an Amazon FSx for OpenZFS snapshot.
 */
export const updateSnapshot: API.OperationMethod<
  UpdateSnapshotRequest,
  UpdateSnapshotResponse,
  UpdateSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientRequestToken: D.m({ idempotency: true }),
      Name: 0,
      SnapshotId: 0,
    },
    output: { Snapshot: o_Snapshot },
  },
  errors: [
    BadRequest,
    InternalServerError,
    SnapshotNotFound,
    UpdateSnapshotNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSnapshot",
})) as any;

export type UpdateStorageVirtualMachineError =
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | StorageVirtualMachineNotFound
  | UnsupportedOperation
  | CommonErrors;
/**
 * Updates an FSx for ONTAP storage virtual machine (SVM).
 */
export const updateStorageVirtualMachine: API.OperationMethod<
  UpdateStorageVirtualMachineRequest,
  UpdateStorageVirtualMachineResponse,
  UpdateStorageVirtualMachineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ActiveDirectoryConfiguration: {
        SelfManagedActiveDirectoryConfiguration:
          i_SelfManagedActiveDirectoryConfigurationUpdates,
        NetBiosName: 0,
      },
      ClientRequestToken: D.m({ idempotency: true }),
      StorageVirtualMachineId: 0,
      SvmAdminPassword: 0,
    },
    output: { StorageVirtualMachine: o_StorageVirtualMachine },
  },
  errors: [
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    StorageVirtualMachineNotFound,
    UnsupportedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStorageVirtualMachine",
})) as any;

export type UpdateVolumeError =
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | MissingVolumeConfiguration
  | VolumeNotFound
  | CommonErrors;
/**
 * Updates the configuration of an Amazon FSx for NetApp ONTAP or Amazon FSx for OpenZFS volume.
 */
export const updateVolume: API.OperationMethod<
  UpdateVolumeRequest,
  UpdateVolumeResponse,
  UpdateVolumeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientRequestToken: D.m({ idempotency: true }),
      VolumeId: 0,
      OntapConfiguration: {
        JunctionPath: 0,
        SecurityStyle: 0,
        SizeInMegabytes: 0,
        StorageEfficiencyEnabled: 0,
        TieringPolicy: i_TieringPolicy,
        SnapshotPolicy: 0,
        CopyTagsToBackups: 0,
        SnaplockConfiguration: {
          AuditLogVolume: 0,
          AutocommitPeriod: i_AutocommitPeriod,
          PrivilegedDelete: 0,
          RetentionPeriod: i_SnaplockRetentionPeriod,
          VolumeAppendModeEnabled: 0,
        },
        SizeInBytes: 0,
      },
      Name: 0,
      OpenZFSConfiguration: {
        StorageCapacityReservationGiB: 0,
        StorageCapacityQuotaGiB: 0,
        RecordSizeKiB: 0,
        DataCompressionType: 0,
        NfsExports: D.list(i_OpenZFSNfsExport),
        UserAndGroupQuotas: D.list(i_OpenZFSUserOrGroupQuota),
        ReadOnly: 0,
      },
    },
    output: { Volume: o_Volume },
  },
  errors: [
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    MissingVolumeConfiguration,
    VolumeNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVolume",
})) as any;

const i_AutocommitPeriod: D.LazyStruct = () => ({ Type: 0, Value: 0 });
const i_CreateFileSystemLustreConfiguration: D.LazyStruct = () => ({
  WeeklyMaintenanceStartTime: 0,
  ImportPath: 0,
  ExportPath: 0,
  ImportedFileChunkSize: 0,
  DeploymentType: 0,
  AutoImportPolicy: 0,
  PerUnitStorageThroughput: 0,
  DailyAutomaticBackupStartTime: 0,
  AutomaticBackupRetentionDays: 0,
  CopyTagsToBackups: 0,
  DriveCacheType: 0,
  DataCompressionType: 0,
  EfaEnabled: 0,
  LogConfiguration: i_LustreLogCreateConfiguration,
  RootSquashConfiguration: i_LustreRootSquashConfiguration,
  MetadataConfiguration: { Iops: 0, Mode: 0 },
  ThroughputCapacity: 0,
  DataReadCacheConfiguration: i_LustreReadCacheConfiguration,
});
const i_CreateFileSystemOpenZFSConfiguration: D.LazyStruct = () => ({
  AutomaticBackupRetentionDays: 0,
  CopyTagsToBackups: 0,
  CopyTagsToVolumes: 0,
  DailyAutomaticBackupStartTime: 0,
  DeploymentType: 0,
  ThroughputCapacity: 0,
  WeeklyMaintenanceStartTime: 0,
  DiskIopsConfiguration: i_DiskIopsConfiguration,
  RootVolumeConfiguration: {
    RecordSizeKiB: 0,
    DataCompressionType: 0,
    NfsExports: D.list(i_OpenZFSNfsExport),
    UserAndGroupQuotas: D.list(i_OpenZFSUserOrGroupQuota),
    CopyTagsToSnapshots: 0,
    ReadOnly: 0,
  },
  PreferredSubnetId: 0,
  EndpointIpAddressRange: 0,
  EndpointIpv6AddressRange: 0,
  RouteTableIds: 0,
  ReadCacheConfiguration: i_OpenZFSReadCacheConfiguration,
});
const i_CreateFileSystemWindowsConfiguration: D.LazyStruct = () => ({
  ActiveDirectoryId: 0,
  SelfManagedActiveDirectoryConfiguration:
    i_SelfManagedActiveDirectoryConfiguration,
  DeploymentType: 0,
  PreferredSubnetId: 0,
  ThroughputCapacity: 0,
  WeeklyMaintenanceStartTime: 0,
  DailyAutomaticBackupStartTime: 0,
  AutomaticBackupRetentionDays: 0,
  CopyTagsToBackups: 0,
  Aliases: 0,
  AuditLogConfiguration: i_WindowsAuditLogCreateConfiguration,
  DiskIopsConfiguration: i_DiskIopsConfiguration,
  FsrmConfiguration: i_WindowsFsrmConfiguration,
});
const i_CreateOntapVolumeConfiguration: D.LazyStruct = () => ({
  JunctionPath: 0,
  SecurityStyle: 0,
  SizeInMegabytes: 0,
  StorageEfficiencyEnabled: 0,
  StorageVirtualMachineId: 0,
  TieringPolicy: i_TieringPolicy,
  OntapVolumeType: 0,
  SnapshotPolicy: 0,
  CopyTagsToBackups: 0,
  SnaplockConfiguration: {
    AuditLogVolume: 0,
    AutocommitPeriod: i_AutocommitPeriod,
    PrivilegedDelete: 0,
    RetentionPeriod: i_SnaplockRetentionPeriod,
    SnaplockType: 0,
    VolumeAppendModeEnabled: 0,
  },
  VolumeStyle: 0,
  AggregateConfiguration: { Aggregates: 0, ConstituentsPerAggregate: 0 },
  SizeInBytes: 0,
});
const i_DiskIopsConfiguration: D.LazyStruct = () => ({ Mode: 0, Iops: 0 });
const i_Filter: D.LazyStruct = () => ({ Name: 0, Values: 0 });
const i_LustreLogCreateConfiguration: D.LazyStruct = () => ({
  Level: 0,
  Destination: 0,
});
const i_LustreReadCacheConfiguration: D.LazyStruct = () => ({
  SizingMode: 0,
  SizeGiB: 0,
});
const i_LustreRootSquashConfiguration: D.LazyStruct = () => ({
  RootSquash: 0,
  NoSquashNids: 0,
});
const i_OpenZFSNfsExport: D.LazyStruct = () => ({
  ClientConfigurations: D.list({ Clients: 0, Options: 0 }),
});
const i_OpenZFSReadCacheConfiguration: D.LazyStruct = () => ({
  SizingMode: 0,
  SizeGiB: 0,
});
const i_OpenZFSUserOrGroupQuota: D.LazyStruct = () => ({
  Type: 0,
  Id: 0,
  StorageCapacityQuotaGiB: 0,
});
const i_S3DataRepositoryConfiguration: D.LazyStruct = () => ({
  AutoImportPolicy: { Events: 0 },
  AutoExportPolicy: { Events: 0 },
});
const i_SelfManagedActiveDirectoryConfiguration: D.LazyStruct = () => ({
  DomainName: 0,
  OrganizationalUnitDistinguishedName: 0,
  FileSystemAdministratorsGroup: 0,
  UserName: 0,
  Password: 0,
  DnsIps: 0,
  DomainJoinServiceAccountSecret: 0,
});
const i_SelfManagedActiveDirectoryConfigurationUpdates: D.LazyStruct = () => ({
  UserName: 0,
  Password: 0,
  DnsIps: 0,
  DomainName: 0,
  OrganizationalUnitDistinguishedName: 0,
  FileSystemAdministratorsGroup: 0,
  DomainJoinServiceAccountSecret: 0,
});
const i_SnaplockRetentionPeriod: D.LazyStruct = () => ({
  DefaultRetention: i_RetentionPeriod,
  MinimumRetention: i_RetentionPeriod,
  MaximumRetention: i_RetentionPeriod,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_TieringPolicy: D.LazyStruct = () => ({ CoolingPeriod: 0, Name: 0 });
const i_WindowsAuditLogCreateConfiguration: D.LazyStruct = () => ({
  FileAccessAuditLogLevel: 0,
  FileShareAccessAuditLogLevel: 0,
  AuditLogDestination: 0,
});
const i_WindowsFsrmConfiguration: D.LazyStruct = () => ({
  FsrmServiceEnabled: 0,
  EventLogDestination: 0,
});
const o_AdministrativeAction: D.LazyStruct = () => ({
  RequestTime: D.ts,
  TargetFileSystemValues: o_FileSystem,
  TargetVolumeValues: o_Volume,
  TargetSnapshotValues: o_Snapshot,
});
const o_Backup: D.LazyStruct = () => ({
  CreationTime: D.ts,
  FileSystem: o_FileSystem,
  Volume: o_Volume,
});
const o_DataRepositoryAssociation: D.LazyStruct = () => ({
  CreationTime: D.ts,
});
const o_DataRepositoryTask: D.LazyStruct = () => ({
  CreationTime: D.ts,
  StartTime: D.ts,
  EndTime: D.ts,
  Status: { LastUpdatedTime: D.ts },
});
const o_FileCache: D.LazyStruct = () => ({ CreationTime: D.ts });
const o_FileSystem: D.LazyStruct = () => ({
  CreationTime: D.ts,
  AdministrativeActions: D.list(o_AdministrativeAction),
  OntapConfiguration: { FsxAdminPassword: D.secret },
});
const o_S3AccessPointAttachment: D.LazyStruct = () => ({ CreationTime: D.ts });
const o_Snapshot: D.LazyStruct = () => ({
  CreationTime: D.ts,
  AdministrativeActions: D.list(o_AdministrativeAction),
});
const o_StorageVirtualMachine: D.LazyStruct = () => ({ CreationTime: D.ts });
const o_Volume: D.LazyStruct = () => ({
  CreationTime: D.ts,
  AdministrativeActions: D.list(o_AdministrativeAction),
});
const i_RetentionPeriod: D.LazyStruct = () => ({ Type: 0, Value: 0 });
