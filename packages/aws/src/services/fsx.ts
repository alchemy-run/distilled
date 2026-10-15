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
  sdkId: "FSx",
  serviceShapeName: "AWSSimbaAPIService_v20180301",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "fsx" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-03-01");
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
              `https://fsx-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://fsx-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://fsx.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://fsx.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://fsx.{R}.{D}","properties":{},"headers":{}}');

export class AccessPointAlreadyOwnedByYou
  extends /*@__PURE__*/ S.TaggedError<AccessPointAlreadyOwnedByYou>()(
    "AccessPointAlreadyOwnedByYou",
    {
      ErrorCode: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ActiveDirectoryError
  extends /*@__PURE__*/ S.TaggedError<ActiveDirectoryError>()("ActiveDirectoryError", {
    ActiveDirectoryId: /*@__PURE__*/ S.optional(S.String),
    Type: /*@__PURE__*/ S.optional(
      /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ActiveDirectoryErrorType" }),
    ),
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class BackupBeingCopied
  extends /*@__PURE__*/ S.TaggedError<BackupBeingCopied>()("BackupBeingCopied", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    BackupId: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class BackupInProgress
  extends /*@__PURE__*/ S.TaggedError<BackupInProgress>()("BackupInProgress", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class BackupNotFound
  extends /*@__PURE__*/ S.TaggedError<BackupNotFound>()("BackupNotFound", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class BackupRestoring
  extends /*@__PURE__*/ S.TaggedError<BackupRestoring>()("BackupRestoring", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    FileSystemId: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class BadRequest
  extends /*@__PURE__*/ S.TaggedError<BadRequest>()("BadRequest", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class DataRepositoryAssociationNotFound
  extends /*@__PURE__*/ S.TaggedError<DataRepositoryAssociationNotFound>()(
    "DataRepositoryAssociationNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class DataRepositoryTaskEnded
  extends /*@__PURE__*/ S.TaggedError<DataRepositoryTaskEnded>()("DataRepositoryTaskEnded", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class DataRepositoryTaskExecuting
  extends /*@__PURE__*/ S.TaggedError<DataRepositoryTaskExecuting>()(
    "DataRepositoryTaskExecuting",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class DataRepositoryTaskNotFound
  extends /*@__PURE__*/ S.TaggedError<DataRepositoryTaskNotFound>()("DataRepositoryTaskNotFound", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class FileCacheNotFound
  extends /*@__PURE__*/ S.TaggedError<FileCacheNotFound>()("FileCacheNotFound", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class FileSystemNotFound
  extends /*@__PURE__*/ S.TaggedError<FileSystemNotFound>()("FileSystemNotFound", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class IncompatibleParameterError
  extends /*@__PURE__*/ S.TaggedError<IncompatibleParameterError>()("IncompatibleParameterError", {
    Parameter: /*@__PURE__*/ S.optional(S.String),
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class IncompatibleRegionForMultiAZ
  extends /*@__PURE__*/ S.TaggedError<IncompatibleRegionForMultiAZ>()(
    "IncompatibleRegionForMultiAZ",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InternalServerError
  extends /*@__PURE__*/ S.TaggedError<InternalServerError>()("InternalServerError", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidAccessPoint
  extends /*@__PURE__*/ S.TaggedError<InvalidAccessPoint>()(
    "InvalidAccessPoint",
    {
      ErrorCode: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidDataRepositoryType
  extends /*@__PURE__*/ S.TaggedError<InvalidDataRepositoryType>()("InvalidDataRepositoryType", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidDestinationKmsKey
  extends /*@__PURE__*/ S.TaggedError<InvalidDestinationKmsKey>()("InvalidDestinationKmsKey", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidExportPath
  extends /*@__PURE__*/ S.TaggedError<InvalidExportPath>()("InvalidExportPath", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidImportPath
  extends /*@__PURE__*/ S.TaggedError<InvalidImportPath>()("InvalidImportPath", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidNetworkSettings
  extends /*@__PURE__*/ S.TaggedError<InvalidNetworkSettings>()("InvalidNetworkSettings", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    InvalidSubnetId: /*@__PURE__*/ S.optional(S.String),
    InvalidSecurityGroupId: /*@__PURE__*/ S.optional(S.String),
    InvalidRouteTableId: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class InvalidPerUnitStorageThroughput
  extends /*@__PURE__*/ S.TaggedError<InvalidPerUnitStorageThroughput>()(
    "InvalidPerUnitStorageThroughput",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidRegion
  extends /*@__PURE__*/ S.TaggedError<InvalidRegion>()("InvalidRegion", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidRequest
  extends /*@__PURE__*/ S.TaggedError<InvalidRequest>()(
    "InvalidRequest",
    {
      ErrorCode: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidSourceKmsKey
  extends /*@__PURE__*/ S.TaggedError<InvalidSourceKmsKey>()("InvalidSourceKmsKey", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class MissingFileCacheConfiguration
  extends /*@__PURE__*/ S.TaggedError<MissingFileCacheConfiguration>()(
    "MissingFileCacheConfiguration",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class MissingFileSystemConfiguration
  extends /*@__PURE__*/ S.TaggedError<MissingFileSystemConfiguration>()(
    "MissingFileSystemConfiguration",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class MissingVolumeConfiguration
  extends /*@__PURE__*/ S.TaggedError<MissingVolumeConfiguration>()("MissingVolumeConfiguration", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class NotServiceResourceError
  extends /*@__PURE__*/ S.TaggedError<NotServiceResourceError>()("NotServiceResourceError", {
    ResourceARN: /*@__PURE__*/ S.optional(S.String),
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ResourceDoesNotSupportTagging
  extends /*@__PURE__*/ S.TaggedError<ResourceDoesNotSupportTagging>()(
    "ResourceDoesNotSupportTagging",
    {
      ResourceARN: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
  ) {}
export class ResourceNotFound
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFound>()("ResourceNotFound", {
    ResourceARN: /*@__PURE__*/ S.optional(S.String),
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class RestoreSnapshotNotFound
  extends /*@__PURE__*/ S.TaggedError<RestoreSnapshotNotFound>()(
    "RestoreSnapshotNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "BadRequest",
      message: { includes: "snapshot cannot be found" },
    }),
  ).pipe(C.withNotFoundError) {}
export class S3AccessPointAttachmentNotFound
  extends /*@__PURE__*/ S.TaggedError<S3AccessPointAttachmentNotFound>()(
    "S3AccessPointAttachmentNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ServiceLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<ServiceLimitExceeded>()("ServiceLimitExceeded", {
    Limit: /*@__PURE__*/ S.optional(
      /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ServiceLimit" }),
    ),
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withThrottlingError) {}
export class SnapshotNotFound
  extends /*@__PURE__*/ S.TaggedError<SnapshotNotFound>()("SnapshotNotFound", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class SnapshotVolumeNotFound
  extends /*@__PURE__*/ S.TaggedError<SnapshotVolumeNotFound>()(
    "SnapshotVolumeNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "BadRequest",
      message: { includes: "volume was not found" },
    }),
  ).pipe(C.withNotFoundError) {}
export class SourceBackupUnavailable
  extends /*@__PURE__*/ S.TaggedError<SourceBackupUnavailable>()("SourceBackupUnavailable", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    BackupId: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class SourceSnapshotNotFound
  extends /*@__PURE__*/ S.TaggedError<SourceSnapshotNotFound>()(
    "SourceSnapshotNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "BadRequest",
      message: { includes: "SourceSnapshotARN provided is not a valid ARN" },
    }),
  ).pipe(C.withNotFoundError) {}
export class StorageVirtualMachineNotFound
  extends /*@__PURE__*/ S.TaggedError<StorageVirtualMachineNotFound>()(
    "StorageVirtualMachineNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class TooManyAccessPoints
  extends /*@__PURE__*/ S.TaggedError<TooManyAccessPoints>()(
    "TooManyAccessPoints",
    {
      ErrorCode: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedOperation
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperation>()("UnsupportedOperation", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class UpdateSnapshotNotFound
  extends /*@__PURE__*/ S.TaggedError<UpdateSnapshotNotFound>()(
    "UpdateSnapshotNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "BadRequest",
      message: { includes: "the snapshot is not found" },
    }),
  ).pipe(C.withNotFoundError) {}
export class VolumeNotFound
  extends /*@__PURE__*/ S.TaggedError<VolumeNotFound>()("VolumeNotFound", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
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
export type BackupType = "AUTOMATIC" | "USER_INITIATED" | "AWS_BACKUP" | (string & {});
export type ProgressPercent = number;
export type CreationTime = Date;
export type ResourceARN = string;
export type AWSAccountId = string;
export type FileSystemType = "WINDOWS" | "LUSTRE" | "ONTAP" | "OPENZFS" | (string & {});
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
export type WindowsDeploymentType = "MULTI_AZ_1" | "SINGLE_AZ_1" | "SINGLE_AZ_2" | (string & {});
export type MegabytesPerSecond = number;
export type FileSystemMaintenanceOperation = "PATCHING" | "BACKING_UP" | (string & {});
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
export type DiskIopsConfigurationMode = "AUTOMATIC" | "USER_PROVISIONED" | (string & {});
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
export type MetadataConfigurationMode = "AUTOMATIC" | "USER_PROVISIONED" | (string & {});
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
export type TieringPolicyName = "SNAPSHOT_ONLY" | "AUTO" | "ALL" | "NONE" | (string & {});
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
export type PrivilegedDelete = "DISABLED" | "ENABLED" | "PERMANENTLY_DISABLED" | (string & {});
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
export type OpenZFSDataCompressionType = "NONE" | "ZSTD" | "LZ4" | (string & {});
export type OpenZFSCopyStrategy = "CLONE" | "FULL_COPY" | "INCREMENTAL_COPY" | (string & {});
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
export type SnapshotLifecycle = "PENDING" | "CREATING" | "DELETING" | "AVAILABLE" | (string & {});
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
        FsrmConfiguration: WindowsFsrmConfiguration & { FsrmServiceEnabled: Flag };
      };
      LustreConfiguration: LustreFileSystemConfiguration & {
        LogConfiguration: LustreLogConfiguration & { Level: LustreAccessAuditLogLevel };
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
        TargetSnapshotValues: Snapshot & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] };
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
            FsrmConfiguration: WindowsFsrmConfiguration & { FsrmServiceEnabled: Flag };
          };
          LustreConfiguration: LustreFileSystemConfiguration & {
            LogConfiguration: LustreLogConfiguration & { Level: LustreAccessAuditLogLevel };
            MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
              Mode: MetadataConfigurationMode;
            };
          };
        };
        TargetSnapshotValues: Snapshot & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] };
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
        FsrmConfiguration: WindowsFsrmConfiguration & { FsrmServiceEnabled: Flag };
      };
      LustreConfiguration: LustreFileSystemConfiguration & {
        LogConfiguration: LustreLogConfiguration & { Level: LustreAccessAuditLogLevel };
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
    TargetSnapshotValues: Snapshot & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] };
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
        PosixUser: OpenZFSPosixFileSystemUser & { Uid: FileSystemUID; Gid: FileSystemGID };
      };
    };
    OntapConfiguration: S3AccessPointOntapConfiguration & {
      FileSystemIdentity: OntapFileSystemIdentity & {
        Type: OntapFileSystemUserType;
        UnixUser: OntapUnixFileSystemUser & { Name: OntapFileSystemUserName };
        WindowsUser: OntapWindowsFileSystemUser & { Name: OntapFileSystemUserName };
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
        FsrmConfiguration: WindowsFsrmConfiguration & { FsrmServiceEnabled: Flag };
      };
      LustreConfiguration: LustreFileSystemConfiguration & {
        LogConfiguration: LustreLogConfiguration & { Level: LustreAccessAuditLogLevel };
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
        TargetSnapshotValues: Snapshot & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] };
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
            FsrmConfiguration: WindowsFsrmConfiguration & { FsrmServiceEnabled: Flag };
          };
          LustreConfiguration: LustreFileSystemConfiguration & {
            LogConfiguration: LustreLogConfiguration & { Level: LustreAccessAuditLogLevel };
            MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
              Mode: MetadataConfigurationMode;
            };
          };
        };
        TargetSnapshotValues: Snapshot & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] };
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
export type CreateFileCacheDataRepositoryAssociations = FileCacheDataRepositoryAssociation[];
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
      LogConfiguration: LustreLogConfiguration & { Level: LustreAccessAuditLogLevel };
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
      FsrmConfiguration: WindowsFsrmConfiguration & { FsrmServiceEnabled: Flag };
    };
    LustreConfiguration: LustreFileSystemConfiguration & {
      LogConfiguration: LustreLogConfiguration & { Level: LustreAccessAuditLogLevel };
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
      TargetSnapshotValues: Snapshot & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] };
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
      FsrmConfiguration: WindowsFsrmConfiguration & { FsrmServiceEnabled: Flag };
    };
    LustreConfiguration: LustreFileSystemConfiguration & {
      LogConfiguration: LustreLogConfiguration & { Level: LustreAccessAuditLogLevel };
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
      TargetSnapshotValues: Snapshot & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] };
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
          FsrmConfiguration: WindowsFsrmConfiguration & { FsrmServiceEnabled: Flag };
        };
        LustreConfiguration: LustreFileSystemConfiguration & {
          LogConfiguration: LustreLogConfiguration & { Level: LustreAccessAuditLogLevel };
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
          FsrmConfiguration: WindowsFsrmConfiguration & { FsrmServiceEnabled: Flag };
        };
        LustreConfiguration: LustreFileSystemConfiguration & {
          LogConfiguration: LustreLogConfiguration & { Level: LustreAccessAuditLogLevel };
          MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
            Mode: MetadataConfigurationMode;
          };
        };
      };
      TargetSnapshotValues: Snapshot & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] };
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
          FsrmConfiguration: WindowsFsrmConfiguration & { FsrmServiceEnabled: Flag };
        };
        LustreConfiguration: LustreFileSystemConfiguration & {
          LogConfiguration: LustreLogConfiguration & { Level: LustreAccessAuditLogLevel };
          MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
            Mode: MetadataConfigurationMode;
          };
        };
      };
      TargetSnapshotValues: Snapshot & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] };
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
export type DeleteFileSystemOpenZFSOption = "DELETE_CHILD_VOLUMES_AND_SNAPSHOTS" | (string & {});
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
export type DeleteOpenZFSVolumeOption = "DELETE_CHILD_VOLUMES_AND_SNAPSHOTS" | (string & {});
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
        FsrmConfiguration: WindowsFsrmConfiguration & { FsrmServiceEnabled: Flag };
      };
      LustreConfiguration: LustreFileSystemConfiguration & {
        LogConfiguration: LustreLogConfiguration & { Level: LustreAccessAuditLogLevel };
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
        TargetSnapshotValues: Snapshot & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] };
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
            FsrmConfiguration: WindowsFsrmConfiguration & { FsrmServiceEnabled: Flag };
          };
          LustreConfiguration: LustreFileSystemConfiguration & {
            LogConfiguration: LustreLogConfiguration & { Level: LustreAccessAuditLogLevel };
            MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
              Mode: MetadataConfigurationMode;
            };
          };
        };
        TargetSnapshotValues: Snapshot & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] };
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
      LogConfiguration: LustreLogConfiguration & { Level: LustreAccessAuditLogLevel };
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
      FsrmConfiguration: WindowsFsrmConfiguration & { FsrmServiceEnabled: Flag };
    };
    LustreConfiguration: LustreFileSystemConfiguration & {
      LogConfiguration: LustreLogConfiguration & { Level: LustreAccessAuditLogLevel };
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
      TargetSnapshotValues: Snapshot & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] };
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
        PosixUser: OpenZFSPosixFileSystemUser & { Uid: FileSystemUID; Gid: FileSystemGID };
      };
    };
    OntapConfiguration: S3AccessPointOntapConfiguration & {
      FileSystemIdentity: OntapFileSystemIdentity & {
        Type: OntapFileSystemUserType;
        UnixUser: OntapUnixFileSystemUser & { Name: OntapFileSystemUserName };
        WindowsUser: OntapWindowsFileSystemUser & { Name: OntapFileSystemUserName };
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
          FsrmConfiguration: WindowsFsrmConfiguration & { FsrmServiceEnabled: Flag };
        };
        LustreConfiguration: LustreFileSystemConfiguration & {
          LogConfiguration: LustreLogConfiguration & { Level: LustreAccessAuditLogLevel };
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
export type VolumeFilterName = "file-system-id" | "storage-virtual-machine-id" | (string & {});
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
          FsrmConfiguration: WindowsFsrmConfiguration & { FsrmServiceEnabled: Flag };
        };
        LustreConfiguration: LustreFileSystemConfiguration & {
          LogConfiguration: LustreLogConfiguration & { Level: LustreAccessAuditLogLevel };
          MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
            Mode: MetadataConfigurationMode;
          };
        };
      };
      TargetSnapshotValues: Snapshot & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] };
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
      FsrmConfiguration: WindowsFsrmConfiguration & { FsrmServiceEnabled: Flag };
    };
    LustreConfiguration: LustreFileSystemConfiguration & {
      LogConfiguration: LustreLogConfiguration & { Level: LustreAccessAuditLogLevel };
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
      TargetSnapshotValues: Snapshot & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] };
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
        FsrmConfiguration: WindowsFsrmConfiguration & { FsrmServiceEnabled: Flag };
      };
      LustreConfiguration: LustreFileSystemConfiguration & {
        LogConfiguration: LustreLogConfiguration & { Level: LustreAccessAuditLogLevel };
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
    TargetSnapshotValues: Snapshot & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] };
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
      FsrmConfiguration: WindowsFsrmConfiguration & { FsrmServiceEnabled: Flag };
    };
    LustreConfiguration: LustreFileSystemConfiguration & {
      LogConfiguration: LustreLogConfiguration & { Level: LustreAccessAuditLogLevel };
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
      TargetSnapshotValues: Snapshot & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] };
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
      LogConfiguration: LustreLogConfiguration & { Level: LustreAccessAuditLogLevel };
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
      FsrmConfiguration: WindowsFsrmConfiguration & { FsrmServiceEnabled: Flag };
    };
    LustreConfiguration: LustreFileSystemConfiguration & {
      LogConfiguration: LustreLogConfiguration & { Level: LustreAccessAuditLogLevel };
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
      TargetSnapshotValues: Snapshot & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] };
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
          FsrmConfiguration: WindowsFsrmConfiguration & { FsrmServiceEnabled: Flag };
        };
        LustreConfiguration: LustreFileSystemConfiguration & {
          LogConfiguration: LustreLogConfiguration & { Level: LustreAccessAuditLogLevel };
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
          FsrmConfiguration: WindowsFsrmConfiguration & { FsrmServiceEnabled: Flag };
        };
        LustreConfiguration: LustreFileSystemConfiguration & {
          LogConfiguration: LustreLogConfiguration & { Level: LustreAccessAuditLogLevel };
          MetadataConfiguration: FileSystemLustreMetadataConfiguration & {
            Mode: MetadataConfigurationMode;
          };
        };
      };
      TargetSnapshotValues: Snapshot & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] };
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
  input: __S(0, __c0, 0) as any as S.Schema<AssociateFileSystemAliasesRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<AssociateFileSystemAliasesResponse>,
  errors: [BadRequest, FileSystemNotFound, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateFileSystemAliases",
}));

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
  input: __S(128, __c4, 0) as any as S.Schema<CancelDataRepositoryTaskRequest>,
  output: __S(129, __c4, 1) as any as S.Schema<CancelDataRepositoryTaskResponse>,
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
}));

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
  input: __S(160, __c5, 0) as any as S.Schema<CopyBackupRequest>,
  output: __S(384, __c12, 0) as any as S.Schema<CopyBackupResponse>,
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
}));

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
  input: __S(448, __c14, 0) as any as S.Schema<CopySnapshotAndUpdateVolumeRequest>,
  output: __S(480, __c15, 0) as any as S.Schema<CopySnapshotAndUpdateVolumeResponse>,
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
}));

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
  input: __S(513, __c16, 1) as any as S.Schema<CreateAndAttachS3AccessPointRequest>,
  output: __S(514, __c16, 2) as any as S.Schema<CreateAndAttachS3AccessPointResponse>,
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
}));

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
  input: __S(576, __c18, 0) as any as S.Schema<CreateBackupRequest>,
  output: __S(384, __c12, 0) as any as S.Schema<CreateBackupResponse>,
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
}));

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
  input: __S(608, __c19, 0) as any as S.Schema<CreateDataRepositoryAssociationRequest>,
  output: __S(672, __c21, 0) as any as S.Schema<CreateDataRepositoryAssociationResponse>,
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
}));

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
  input: __S(704, __c22, 0) as any as S.Schema<CreateDataRepositoryTaskRequest>,
  output: __S(705, __c22, 1) as any as S.Schema<CreateDataRepositoryTaskResponse>,
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
}));

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
  input: __S(772, __c24, 4) as any as S.Schema<CreateFileCacheRequest>,
  output: __S(774, __c24, 6) as any as S.Schema<CreateFileCacheResponse>,
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
}));

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
  input: __S(833, __c26, 1) as any as S.Schema<CreateFileSystemRequest>,
  output: __S(928, __c29, 0) as any as S.Schema<CreateFileSystemResponse>,
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
}));

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
  input: __S(960, __c30, 0) as any as S.Schema<CreateFileSystemFromBackupRequest>,
  output: __S(928, __c29, 0) as any as S.Schema<CreateFileSystemFromBackupResponse>,
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
}));

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
  input: __S(992, __c31, 0) as any as S.Schema<CreateSnapshotRequest>,
  output: __S(1024, __c32, 0) as any as S.Schema<CreateSnapshotResponse>,
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
}));

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
  input: __S(1057, __c33, 1) as any as S.Schema<CreateStorageVirtualMachineRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<CreateStorageVirtualMachineResponse>,
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
}));

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
  input: __S(1153, __c36, 1) as any as S.Schema<CreateVolumeRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<CreateVolumeResponse>,
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
}));

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
  input: __S(1248, __c39, 0) as any as S.Schema<CreateVolumeFromBackupRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<CreateVolumeFromBackupResponse>,
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
}));

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
  input: __S(1280, __c40, 0) as any as S.Schema<DeleteBackupRequest>,
  output: __S(1281, __c40, 1) as any as S.Schema<DeleteBackupResponse>,
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
}));

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
  input: __S(1312, __c41, 0) as any as S.Schema<DeleteDataRepositoryAssociationRequest>,
  output: __S(1313, __c41, 1) as any as S.Schema<DeleteDataRepositoryAssociationResponse>,
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
}));

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
  input: __S(1344, __c42, 0) as any as S.Schema<DeleteFileCacheRequest>,
  output: __S(1345, __c42, 1) as any as S.Schema<DeleteFileCacheResponse>,
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
}));

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
  input: __S(1378, __c43, 2) as any as S.Schema<DeleteFileSystemRequest>,
  output: __S(1379, __c43, 3) as any as S.Schema<DeleteFileSystemResponse>,
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
}));

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
  input: __S(1440, __c45, 0) as any as S.Schema<DeleteSnapshotRequest>,
  output: __S(1441, __c45, 1) as any as S.Schema<DeleteSnapshotResponse>,
  errors: [BadRequest, InternalServerError, SnapshotNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSnapshot",
}));

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
  input: __S(1472, __c46, 0) as any as S.Schema<DeleteStorageVirtualMachineRequest>,
  output: __S(1473, __c46, 1) as any as S.Schema<DeleteStorageVirtualMachineResponse>,
  errors: [
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    StorageVirtualMachineNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStorageVirtualMachine",
}));

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
  input: __S(1506, __c47, 2) as any as S.Schema<DeleteVolumeRequest>,
  output: __S(1507, __c47, 3) as any as S.Schema<DeleteVolumeResponse>,
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
}));

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
  input: __S(1536, __c48, 0) as any as S.Schema<DescribeBackupsRequest>,
  output: __S(1538, __c48, 2) as any as S.Schema<DescribeBackupsResponse>,
  errors: [BackupNotFound, BadRequest, FileSystemNotFound, InternalServerError, VolumeNotFound],
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
  input: __S(1600, __c50, 0) as any as S.Schema<DescribeDataRepositoryAssociationsRequest>,
  output: __S(1602, __c50, 2) as any as S.Schema<DescribeDataRepositoryAssociationsResponse>,
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
  input: __S(1632, __c51, 0) as any as S.Schema<DescribeDataRepositoryTasksRequest>,
  output: __S(1634, __c51, 2) as any as S.Schema<DescribeDataRepositoryTasksResponse>,
  errors: [BadRequest, DataRepositoryTaskNotFound, FileSystemNotFound, InternalServerError],
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
  input: __S(1664, __c52, 0) as any as S.Schema<DescribeFileCachesRequest>,
  output: __S(1666, __c52, 2) as any as S.Schema<DescribeFileCachesResponse>,
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
  input: __S(1728, __c54, 0) as any as S.Schema<DescribeFileSystemAliasesRequest>,
  output: __S(1729, __c54, 1) as any as S.Schema<DescribeFileSystemAliasesResponse>,
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
  input: __S(1760, __c55, 0) as any as S.Schema<DescribeFileSystemsRequest>,
  output: __S(1762, __c55, 2) as any as S.Schema<DescribeFileSystemsResponse>,
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
  input: __S(1792, __c56, 0) as any as S.Schema<DescribeS3AccessPointAttachmentsRequest>,
  output: __S(1794, __c56, 2) as any as S.Schema<DescribeS3AccessPointAttachmentsResponse>,
  errors: [BadRequest, InternalServerError, S3AccessPointAttachmentNotFound, UnsupportedOperation],
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

export type DescribeSharedVpcConfigurationError = BadRequest | InternalServerError | CommonErrors;
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
  input: __S(1824, __c57, 0) as any as S.Schema<DescribeSharedVpcConfigurationRequest>,
  output: __S(1856, __c58, 0) as any as S.Schema<DescribeSharedVpcConfigurationResponse>,
  errors: [BadRequest, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSharedVpcConfiguration",
}));

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
  input: __S(1888, __c59, 0) as any as S.Schema<DescribeSnapshotsRequest>,
  output: __S(1890, __c59, 2) as any as S.Schema<DescribeSnapshotsResponse>,
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
  input: __S(1920, __c60, 0) as any as S.Schema<DescribeStorageVirtualMachinesRequest>,
  output: __S(1922, __c60, 2) as any as S.Schema<DescribeStorageVirtualMachinesResponse>,
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

export type DescribeVolumesError = BadRequest | InternalServerError | VolumeNotFound | CommonErrors;
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
  input: __S(1952, __c61, 0) as any as S.Schema<DescribeVolumesRequest>,
  output: __S(1954, __c61, 2) as any as S.Schema<DescribeVolumesResponse>,
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
  input: __S(1984, __c62, 0) as any as S.Schema<DetachAndDeleteS3AccessPointRequest>,
  output: __S(1985, __c62, 1) as any as S.Schema<DetachAndDeleteS3AccessPointResponse>,
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
}));

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
  input: __S(2016, __c63, 0) as any as S.Schema<DisassociateFileSystemAliasesRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<DisassociateFileSystemAliasesResponse>,
  errors: [BadRequest, FileSystemNotFound, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFileSystemAliases",
}));

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
  input: __S(2048, __c64, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(2049, __c64, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
  input: __S(2080, __c65, 0) as any as S.Schema<ReleaseFileSystemNfsV3LocksRequest>,
  output: __S(928, __c29, 0) as any as S.Schema<ReleaseFileSystemNfsV3LocksResponse>,
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
}));

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
  input: __S(2112, __c66, 0) as any as S.Schema<RestoreVolumeFromSnapshotRequest>,
  output: __S(480, __c15, 0) as any as S.Schema<RestoreVolumeFromSnapshotResponse>,
  errors: [BadRequest, InternalServerError, VolumeNotFound, RestoreSnapshotNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreVolumeFromSnapshot",
}));

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
  input: __S(2144, __c67, 0) as any as S.Schema<StartMisconfiguredStateRecoveryRequest>,
  output: __S(928, __c29, 0) as any as S.Schema<StartMisconfiguredStateRecoveryResponse>,
  errors: [BadRequest, FileSystemNotFound, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMisconfiguredStateRecovery",
}));

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
  input: __S(2176, __c68, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(2208, __c69, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(2240, __c70, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(2208, __c69, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(2272, __c71, 0) as any as S.Schema<UpdateDataRepositoryAssociationRequest>,
  output: __S(672, __c21, 0) as any as S.Schema<UpdateDataRepositoryAssociationResponse>,
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
}));

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
  input: __S(2305, __c72, 1) as any as S.Schema<UpdateFileCacheRequest>,
  output: __S(2306, __c72, 2) as any as S.Schema<UpdateFileCacheResponse>,
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
}));

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
  input: __S(2340, __c73, 4) as any as S.Schema<UpdateFileSystemRequest>,
  output: __S(928, __c29, 0) as any as S.Schema<UpdateFileSystemResponse>,
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
}));

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
  input: __S(2400, __c75, 0) as any as S.Schema<UpdateSharedVpcConfigurationRequest>,
  output: __S(1856, __c58, 0) as any as S.Schema<UpdateSharedVpcConfigurationResponse>,
  errors: [BadRequest, IncompatibleParameterError, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSharedVpcConfiguration",
}));

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
  input: __S(2432, __c76, 0) as any as S.Schema<UpdateSnapshotRequest>,
  output: __S(1024, __c32, 0) as any as S.Schema<UpdateSnapshotResponse>,
  errors: [BadRequest, InternalServerError, SnapshotNotFound, UpdateSnapshotNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSnapshot",
}));

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
  input: __S(2465, __c77, 1) as any as S.Schema<UpdateStorageVirtualMachineRequest>,
  output: __S(1120, __c35, 0) as any as S.Schema<UpdateStorageVirtualMachineResponse>,
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
}));

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
  input: __S(2499, __c78, 3) as any as S.Schema<UpdateVolumeRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<UpdateVolumeResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          FileSystemId: S.optional(S.String),
          Aliases: S.optional(__S(32, __c1, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AssociateFileSystemAliasesRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Lifecycle: S.optional(S.String) }),
      ).annotate({ identifier: "Alias" });
    case 1:
      return S.Array(__S(64, __c2, 0));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Aliases: S.optional(__S(65, __c2, 1)) })).annotate({
        identifier: "AssociateFileSystemAliasesResponse",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TaskId: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelDataRepositoryTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Lifecycle: S.optional(S.String), TaskId: S.optional(S.String) }),
      ).annotate({ identifier: "CancelDataRepositoryTaskResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          SourceBackupId: S.optional(S.String),
          SourceRegion: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          CopyTags: S.optional(S.Boolean),
          Tags: S.optional(__S(225, __c7, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CopyBackupRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Message: S.optional(S.String) })).annotate({
        identifier: "BackupFailureDetails",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(__S(224, __c7, 0));
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Level: S.optional(S.String), Destination: S.optional(S.String) }),
      ).annotate({ identifier: "LustreLogConfiguration" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.optional(S.String),
          OrganizationalUnitDistinguishedName: S.optional(S.String),
          FileSystemAdministratorsGroup: S.optional(S.String),
          UserName: S.optional(S.String),
          DnsIps: S.optional(__S(32, __c1, 0)),
          DomainJoinServiceAccountSecret: S.optional(S.String),
        }),
      ).annotate({ identifier: "SelfManagedActiveDirectoryAttributes" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DNSName: S.optional(S.String),
          IpAddresses: S.optional(__S(32, __c1, 0)),
          Ipv6Addresses: S.optional(__S(32, __c1, 0)),
        }),
      ).annotate({ identifier: "FileSystemEndpoint" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FileAccessAuditLogLevel: S.optional(S.String),
          FileShareAccessAuditLogLevel: S.optional(S.String),
          AuditLogDestination: S.optional(S.String),
        }),
      ).annotate({ identifier: "WindowsAuditLogConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Mode: S.optional(S.String), Iops: S.optional(S.Number) }),
      ).annotate({ identifier: "DiskIopsConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          FsrmServiceEnabled: S.optional(S.Boolean),
          EventLogDestination: S.optional(S.String),
        }),
      ).annotate({ identifier: "WindowsFsrmConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ActiveDirectoryId: S.optional(S.String),
          SelfManagedActiveDirectoryConfiguration: S.optional(__S(320, __c10, 0)),
          DeploymentType: S.optional(S.String),
          RemoteAdministrationEndpoint: S.optional(S.String),
          PreferredSubnetId: S.optional(S.String),
          PreferredFileServerIp: S.optional(S.String),
          ThroughputCapacity: S.optional(S.Number),
          MaintenanceOperationsInProgress: S.optional(__S(256, __c8, 0)),
          WeeklyMaintenanceStartTime: S.optional(S.String),
          DailyAutomaticBackupStartTime: S.optional(S.String),
          AutomaticBackupRetentionDays: S.optional(S.Number),
          CopyTagsToBackups: S.optional(S.Boolean),
          Aliases: S.optional(__S(65, __c2, 1)),
          AuditLogConfiguration: S.optional(__S(352, __c11, 0)),
          DiskIopsConfiguration: S.optional(__S(353, __c11, 1)),
          PreferredFileServerIpv6: S.optional(S.String),
          FsrmConfiguration: S.optional(__S(354, __c11, 2)),
        }),
      ).annotate({ identifier: "WindowsFileSystemConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Lifecycle: S.optional(S.String),
          ImportPath: S.optional(S.String),
          ExportPath: S.optional(S.String),
          ImportedFileChunkSize: S.optional(S.Number),
          AutoImportPolicy: S.optional(S.String),
          FailureDetails: S.optional(__S(192, __c6, 0)),
        }),
      ).annotate({ identifier: "DataRepositoryConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({ RootSquash: S.optional(S.String), NoSquashNids: S.optional(__S(32, __c1, 0)) }),
      ).annotate({ identifier: "LustreRootSquashConfiguration" });
    case 6:
      return S.suspend(() =>
        S.Struct({ Iops: S.optional(S.Number), Mode: S.optional(S.String) }),
      ).annotate({ identifier: "FileSystemLustreMetadataConfiguration" });
    case 7:
      return S.suspend(() =>
        S.Struct({ SizingMode: S.optional(S.String), SizeGiB: S.optional(S.Number) }),
      ).annotate({ identifier: "LustreReadCacheConfiguration" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          WeeklyMaintenanceStartTime: S.optional(S.String),
          DataRepositoryConfiguration: S.optional(__S(356, __c11, 4)),
          DeploymentType: S.optional(S.String),
          PerUnitStorageThroughput: S.optional(S.Number),
          MountName: S.optional(S.String),
          DailyAutomaticBackupStartTime: S.optional(S.String),
          AutomaticBackupRetentionDays: S.optional(S.Number),
          CopyTagsToBackups: S.optional(S.Boolean),
          DriveCacheType: S.optional(S.String),
          DataCompressionType: S.optional(S.String),
          LogConfiguration: S.optional(__S(288, __c9, 0)),
          RootSquashConfiguration: S.optional(__S(357, __c11, 5)),
          MetadataConfiguration: S.optional(__S(358, __c11, 6)),
          EfaEnabled: S.optional(S.Boolean),
          ThroughputCapacity: S.optional(S.Number),
          DataReadCacheConfiguration: S.optional(__S(359, __c11, 7)),
        }),
      ).annotate({ identifier: "LustreFileSystemConfiguration" });
    case 9:
      return S.suspend(() =>
        S.Struct({ CoolingPeriod: S.optional(S.Number), Name: S.optional(S.String) }),
      ).annotate({ identifier: "TieringPolicy" });
    case 10:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), Value: S.optional(S.Number) }),
      ).annotate({ identifier: "AutocommitPeriod" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          DefaultRetention: S.optional(__S(362, __c11, 10)),
          MinimumRetention: S.optional(__S(362, __c11, 10)),
          MaximumRetention: S.optional(__S(362, __c11, 10)),
        }),
      ).annotate({ identifier: "SnaplockRetentionPeriod" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          AuditLogVolume: S.optional(S.Boolean),
          AutocommitPeriod: S.optional(__S(362, __c11, 10)),
          PrivilegedDelete: S.optional(S.String),
          RetentionPeriod: S.optional(__S(363, __c11, 11)),
          SnaplockType: S.optional(S.String),
          VolumeAppendModeEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "SnaplockConfiguration" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          Aggregates: S.optional(__S(32, __c1, 0)),
          TotalConstituents: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AggregateConfiguration" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          FlexCacheEndpointType: S.optional(S.String),
          JunctionPath: S.optional(S.String),
          SecurityStyle: S.optional(S.String),
          SizeInMegabytes: S.optional(S.Number),
          StorageEfficiencyEnabled: S.optional(S.Boolean),
          StorageVirtualMachineId: S.optional(S.String),
          StorageVirtualMachineRoot: S.optional(S.Boolean),
          TieringPolicy: S.optional(__S(361, __c11, 9)),
          UUID: S.optional(S.String),
          OntapVolumeType: S.optional(S.String),
          SnapshotPolicy: S.optional(S.String),
          CopyTagsToBackups: S.optional(S.Boolean),
          SnaplockConfiguration: S.optional(__S(364, __c11, 12)),
          VolumeStyle: S.optional(S.String),
          AggregateConfiguration: S.optional(__S(365, __c11, 13)),
          SizeInBytes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "OntapVolumeConfiguration" });
    case 15:
      return S.suspend(() =>
        S.Struct({ SnapshotARN: S.optional(S.String), CopyStrategy: S.optional(S.String) }),
      ).annotate({ identifier: "OpenZFSOriginSnapshotConfiguration" });
    case 16:
      return S.suspend(() =>
        S.Struct({ Clients: S.optional(S.String), Options: S.optional(__S(32, __c1, 0)) }),
      ).annotate({ identifier: "OpenZFSClientConfiguration" });
    case 17:
      return S.Array(__S(368, __c11, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({ ClientConfigurations: S.optional(__S(369, __c11, 17)) }),
      ).annotate({ identifier: "OpenZFSNfsExport" });
    case 19:
      return S.Array(__S(370, __c11, 18));
    case 20:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          Id: S.optional(S.Number),
          StorageCapacityQuotaGiB: S.optional(S.Number),
        }),
      ).annotate({ identifier: "OpenZFSUserOrGroupQuota" });
    case 21:
      return S.Array(__S(372, __c11, 20));
    case 22:
      return S.suspend(() =>
        S.Struct({
          ParentVolumeId: S.optional(S.String),
          VolumePath: S.optional(S.String),
          StorageCapacityReservationGiB: S.optional(S.Number),
          StorageCapacityQuotaGiB: S.optional(S.Number),
          RecordSizeKiB: S.optional(S.Number),
          DataCompressionType: S.optional(S.String),
          CopyTagsToSnapshots: S.optional(S.Boolean),
          OriginSnapshot: S.optional(__S(367, __c11, 15)),
          ReadOnly: S.optional(S.Boolean),
          NfsExports: S.optional(__S(371, __c11, 19)),
          UserAndGroupQuotas: S.optional(__S(373, __c11, 21)),
          RestoreToSnapshot: S.optional(S.String),
          DeleteIntermediateSnaphots: S.optional(S.Boolean),
          DeleteClonedVolumes: S.optional(S.Boolean),
          DeleteIntermediateData: S.optional(S.Boolean),
          SourceSnapshotARN: S.optional(S.String),
          DestinationSnapshot: S.optional(S.String),
          CopyStrategy: S.optional(S.String),
        }),
      ).annotate({ identifier: "OpenZFSVolumeConfiguration" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FileSystemId: S.optional(S.String),
          Lifecycle: S.optional(S.String),
          Name: S.optional(S.String),
          OntapConfiguration: S.optional(__S(366, __c11, 14)),
          ResourceARN: S.optional(S.String),
          Tags: S.optional(__S(225, __c7, 1)),
          VolumeId: S.optional(S.String),
          VolumeType: S.optional(S.String),
          LifecycleTransitionReason: S.optional(__S(192, __c6, 0)),
          AdministrativeActions: S.optional(
            S.suspend(() => __S(378, __c11, 26)).annotate({ identifier: "AdministrativeActions" }),
          ),
          OpenZFSConfiguration: S.optional(__S(374, __c11, 22)),
        }),
      ).annotate({ identifier: "Volume" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          ResourceARN: S.optional(S.String),
          SnapshotId: S.optional(S.String),
          Name: S.optional(S.String),
          VolumeId: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Lifecycle: S.optional(S.String),
          LifecycleTransitionReason: S.optional(__S(192, __c6, 0)),
          Tags: S.optional(__S(225, __c7, 1)),
          AdministrativeActions: S.optional(
            S.suspend(() => __S(378, __c11, 26)).annotate({ identifier: "AdministrativeActions" }),
          ),
        }),
      ).annotate({ identifier: "Snapshot" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          AdministrativeActionType: S.optional(S.String),
          ProgressPercent: S.optional(S.Number),
          RequestTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          TargetFileSystemValues: S.optional(
            S.suspend((): S.Schema<FileSystem> => __S(382, __c11, 30)).annotate({
              identifier: "FileSystem",
            }),
          ),
          FailureDetails: S.optional(__S(192, __c6, 0)),
          TargetVolumeValues: S.optional(
            S.suspend((): S.Schema<Volume> => __S(375, __c11, 23)).annotate({
              identifier: "Volume",
            }),
          ),
          TargetSnapshotValues: S.optional(
            S.suspend((): S.Schema<Snapshot> => __S(376, __c11, 24)).annotate({
              identifier: "Snapshot",
            }),
          ),
          TotalTransferBytes: S.optional(S.Number),
          RemainingTransferBytes: S.optional(S.Number),
          Message: S.optional(S.String),
        }),
      ).annotate({ identifier: "AdministrativeAction" });
    case 26:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<AdministrativeAction> => __S(377, __c11, 25)).annotate(
          { identifier: "AdministrativeAction" },
        ),
      );
    case 27:
      return S.suspend(() =>
        S.Struct({
          Intercluster: S.optional(__S(321, __c10, 1)),
          Management: S.optional(__S(321, __c10, 1)),
        }),
      ).annotate({ identifier: "FileSystemEndpoints" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          AutomaticBackupRetentionDays: S.optional(S.Number),
          DailyAutomaticBackupStartTime: S.optional(S.String),
          DeploymentType: S.optional(S.String),
          EndpointIpAddressRange: S.optional(S.String),
          Endpoints: S.optional(__S(379, __c11, 27)),
          DiskIopsConfiguration: S.optional(__S(353, __c11, 1)),
          PreferredSubnetId: S.optional(S.String),
          RouteTableIds: S.optional(__S(32, __c1, 0)),
          ThroughputCapacity: S.optional(S.Number),
          WeeklyMaintenanceStartTime: S.optional(S.String),
          FsxAdminPassword: S.optional(SensitiveString),
          HAPairs: S.optional(S.Number),
          ThroughputCapacityPerHAPair: S.optional(S.Number),
          EndpointIpv6AddressRange: S.optional(S.String),
        }),
      ).annotate({ identifier: "OntapFileSystemConfiguration" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          AutomaticBackupRetentionDays: S.optional(S.Number),
          CopyTagsToBackups: S.optional(S.Boolean),
          CopyTagsToVolumes: S.optional(S.Boolean),
          DailyAutomaticBackupStartTime: S.optional(S.String),
          DeploymentType: S.optional(S.String),
          ThroughputCapacity: S.optional(S.Number),
          WeeklyMaintenanceStartTime: S.optional(S.String),
          DiskIopsConfiguration: S.optional(__S(353, __c11, 1)),
          RootVolumeId: S.optional(S.String),
          PreferredSubnetId: S.optional(S.String),
          EndpointIpAddressRange: S.optional(S.String),
          EndpointIpv6AddressRange: S.optional(S.String),
          RouteTableIds: S.optional(__S(32, __c1, 0)),
          EndpointIpAddress: S.optional(S.String),
          EndpointIpv6Address: S.optional(S.String),
          ReadCacheConfiguration: S.optional(__S(359, __c11, 7)),
        }),
      ).annotate({ identifier: "OpenZFSFileSystemConfiguration" });
    case 30:
      return S.suspend(() =>
        S.Struct({
          OwnerId: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FileSystemId: S.optional(S.String),
          FileSystemType: S.optional(S.String),
          Lifecycle: S.optional(S.String),
          FailureDetails: S.optional(__S(192, __c6, 0)),
          StorageCapacity: S.optional(S.Number),
          StorageType: S.optional(S.String),
          VpcId: S.optional(S.String),
          SubnetIds: S.optional(__S(32, __c1, 0)),
          NetworkInterfaceIds: S.optional(__S(32, __c1, 0)),
          DNSName: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          ResourceARN: S.optional(S.String),
          Tags: S.optional(__S(225, __c7, 1)),
          WindowsConfiguration: S.optional(__S(355, __c11, 3)),
          LustreConfiguration: S.optional(__S(360, __c11, 8)),
          AdministrativeActions: S.optional(
            S.suspend(() => __S(378, __c11, 26)).annotate({ identifier: "AdministrativeActions" }),
          ),
          OntapConfiguration: S.optional(__S(380, __c11, 28)),
          FileSystemTypeVersion: S.optional(S.String),
          OpenZFSConfiguration: S.optional(__S(381, __c11, 29)),
          NetworkType: S.optional(S.String),
        }),
      ).annotate({ identifier: "FileSystem" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Backup: S.optional(__S(417, __c13, 1)) })).annotate({
        identifier: "CopyBackupResponse",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.optional(S.String),
          ActiveDirectoryId: S.optional(S.String),
          ResourceARN: S.optional(S.String),
        }),
      ).annotate({ identifier: "ActiveDirectoryBackupAttributes" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BackupId: S.optional(S.String),
          Lifecycle: S.optional(S.String),
          FailureDetails: S.optional(__S(192, __c6, 0)),
          Type: S.optional(S.String),
          ProgressPercent: S.optional(S.Number),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          KmsKeyId: S.optional(S.String),
          ResourceARN: S.optional(S.String),
          Tags: S.optional(__S(225, __c7, 1)),
          FileSystem: S.optional(__S(382, __c11, 30)),
          DirectoryInformation: S.optional(__S(416, __c13, 0)),
          OwnerId: S.optional(S.String),
          SourceBackupId: S.optional(S.String),
          SourceBackupRegion: S.optional(S.String),
          ResourceType: S.optional(S.String),
          Volume: S.optional(__S(375, __c11, 23)),
          SizeInBytes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Backup" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          VolumeId: S.optional(S.String),
          SourceSnapshotARN: S.optional(S.String),
          CopyStrategy: S.optional(S.String),
          Options: S.optional(__S(256, __c8, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CopySnapshotAndUpdateVolumeRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VolumeId: S.optional(S.String),
          Lifecycle: S.optional(S.String),
          AdministrativeActions: S.optional(__S(378, __c11, 26)),
        }),
      ).annotate({ identifier: "CopySnapshotAndUpdateVolumeResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VpcConfiguration: S.optional(__S(551, __c17, 7)),
          Policy: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateAndAttachS3AccessPointS3Configuration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          OpenZFSConfiguration: S.optional(__S(547, __c17, 3)),
          OntapConfiguration: S.optional(__S(550, __c17, 6)),
          S3AccessPoint: S.optional(__S(512, __c16, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAndAttachS3AccessPointRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ S3AccessPointAttachment: S.optional(__S(553, __c17, 9)) }),
      ).annotate({ identifier: "CreateAndAttachS3AccessPointResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
    case 1:
      return S.suspend(() =>
        S.Struct({
          Uid: S.optional(S.Number),
          Gid: S.optional(S.Number),
          SecondaryGids: S.optional(__S(544, __c17, 0)),
        }),
      ).annotate({ identifier: "OpenZFSPosixFileSystemUser" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), PosixUser: S.optional(__S(545, __c17, 1)) }),
      ).annotate({ identifier: "OpenZFSFileSystemIdentity" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          VolumeId: S.optional(S.String),
          FileSystemIdentity: S.optional(__S(546, __c17, 2)),
        }),
      ).annotate({ identifier: "CreateAndAttachS3AccessPointOpenZFSConfiguration" });
    case 4:
      return S.suspend(() => S.Struct({ Name: S.optional(S.String) })).annotate({
        identifier: "OntapUnixFileSystemUser",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          UnixUser: S.optional(__S(548, __c17, 4)),
          WindowsUser: S.optional(__S(548, __c17, 4)),
        }),
      ).annotate({ identifier: "OntapFileSystemIdentity" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          VolumeId: S.optional(S.String),
          FileSystemIdentity: S.optional(__S(549, __c17, 5)),
        }),
      ).annotate({ identifier: "CreateAndAttachS3AccessPointOntapConfiguration" });
    case 7:
      return S.suspend(() => S.Struct({ VpcId: S.optional(S.String) })).annotate({
        identifier: "S3AccessPointVpcConfiguration",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          ResourceARN: S.optional(S.String),
          Alias: S.optional(S.String),
          VpcConfiguration: S.optional(__S(551, __c17, 7)),
        }),
      ).annotate({ identifier: "S3AccessPoint" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          Lifecycle: S.optional(S.String),
          LifecycleTransitionReason: S.optional(__S(192, __c6, 0)),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          OpenZFSConfiguration: S.optional(__S(547, __c17, 3)),
          OntapConfiguration: S.optional(__S(550, __c17, 6)),
          S3AccessPoint: S.optional(__S(552, __c17, 8)),
        }),
      ).annotate({ identifier: "S3AccessPointAttachment" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FileSystemId: S.optional(S.String),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(225, __c7, 1)),
          VolumeId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateBackupRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FileSystemId: S.optional(S.String),
          FileSystemPath: S.optional(S.String),
          DataRepositoryPath: S.optional(S.String),
          BatchImportMetaDataOnCreate: S.optional(S.Boolean),
          ImportedFileChunkSize: S.optional(S.Number),
          S3: S.optional(__S(641, __c20, 1)),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(225, __c7, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDataRepositoryAssociationRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Events: S.optional(__S(256, __c8, 0)) })).annotate({
        identifier: "AutoImportPolicy",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AutoImportPolicy: S.optional(__S(640, __c20, 0)),
          AutoExportPolicy: S.optional(__S(640, __c20, 0)),
        }),
      ).annotate({ identifier: "S3DataRepositoryConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Version: S.optional(S.String),
          DnsIps: S.optional(__S(32, __c1, 0)),
          AutoExportPolicy: S.optional(__S(640, __c20, 0)),
        }),
      ).annotate({ identifier: "NFSDataRepositoryConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          AssociationId: S.optional(S.String),
          ResourceARN: S.optional(S.String),
          FileSystemId: S.optional(S.String),
          Lifecycle: S.optional(S.String),
          FailureDetails: S.optional(__S(192, __c6, 0)),
          FileSystemPath: S.optional(S.String),
          DataRepositoryPath: S.optional(S.String),
          BatchImportMetaDataOnCreate: S.optional(S.Boolean),
          ImportedFileChunkSize: S.optional(S.Number),
          S3: S.optional(__S(641, __c20, 1)),
          Tags: S.optional(__S(225, __c7, 1)),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FileCacheId: S.optional(S.String),
          FileCachePath: S.optional(S.String),
          DataRepositorySubdirectories: S.optional(__S(32, __c1, 0)),
          NFS: S.optional(__S(642, __c20, 2)),
        }),
      ).annotate({ identifier: "DataRepositoryAssociation" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Association: S.optional(__S(643, __c20, 3)) })).annotate({
        identifier: "CreateDataRepositoryAssociationResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          Paths: S.optional(__S(32, __c1, 0)),
          FileSystemId: S.optional(S.String),
          Report: S.optional(__S(736, __c23, 0)),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(225, __c7, 1)),
          CapacityToRelease: S.optional(S.Number),
          ReleaseConfiguration: S.optional(__S(738, __c23, 2)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDataRepositoryTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DataRepositoryTask: S.optional(__S(740, __c23, 4)) }),
      ).annotate({ identifier: "CreateDataRepositoryTaskResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.optional(S.Boolean),
          Path: S.optional(S.String),
          Format: S.optional(S.String),
          Scope: S.optional(S.String),
        }),
      ).annotate({ identifier: "CompletionReport" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Unit: S.optional(S.String), Value: S.optional(S.Number) }),
      ).annotate({ identifier: "DurationSinceLastAccess" });
    case 2:
      return S.suspend(() =>
        S.Struct({ DurationSinceLastAccess: S.optional(__S(737, __c23, 1)) }),
      ).annotate({ identifier: "ReleaseConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          TotalCount: S.optional(S.Number),
          SucceededCount: S.optional(S.Number),
          FailedCount: S.optional(S.Number),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ReleasedCapacity: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DataRepositoryTaskStatus" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          TaskId: S.optional(S.String),
          Lifecycle: S.optional(S.String),
          Type: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ResourceARN: S.optional(S.String),
          Tags: S.optional(__S(225, __c7, 1)),
          FileSystemId: S.optional(S.String),
          Paths: S.optional(__S(32, __c1, 0)),
          FailureDetails: S.optional(__S(192, __c6, 0)),
          Status: S.optional(__S(739, __c23, 3)),
          Report: S.optional(__S(736, __c23, 0)),
          CapacityToRelease: S.optional(S.Number),
          FileCacheId: S.optional(S.String),
          ReleaseConfiguration: S.optional(__S(738, __c23, 2)),
        }),
      ).annotate({ identifier: "DataRepositoryTask" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PerUnitStorageThroughput: S.optional(S.Number),
          DeploymentType: S.optional(S.String),
          WeeklyMaintenanceStartTime: S.optional(S.String),
          MetadataConfiguration: S.optional(__S(800, __c25, 0)),
        }),
      ).annotate({ identifier: "CreateFileCacheLustreConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Version: S.optional(S.String), DnsIps: S.optional(__S(32, __c1, 0)) }),
      ).annotate({ identifier: "FileCacheNFSConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          FileCachePath: S.optional(S.String),
          DataRepositoryPath: S.optional(S.String),
          DataRepositorySubdirectories: S.optional(__S(32, __c1, 0)),
          NFS: S.optional(__S(769, __c24, 1)),
        }),
      ).annotate({ identifier: "FileCacheDataRepositoryAssociation" });
    case 3:
      return S.Array(__S(770, __c24, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          FileCacheType: S.optional(S.String),
          FileCacheTypeVersion: S.optional(S.String),
          StorageCapacity: S.optional(S.Number),
          SubnetIds: S.optional(__S(32, __c1, 0)),
          SecurityGroupIds: S.optional(__S(32, __c1, 0)),
          Tags: S.optional(__S(225, __c7, 1)),
          CopyTagsToDataRepositoryAssociations: S.optional(S.Boolean),
          KmsKeyId: S.optional(S.String),
          LustreConfiguration: S.optional(__S(768, __c24, 0)),
          DataRepositoryAssociations: S.optional(__S(771, __c24, 3)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateFileCacheRequest" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          OwnerId: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FileCacheId: S.optional(S.String),
          FileCacheType: S.optional(S.String),
          FileCacheTypeVersion: S.optional(S.String),
          Lifecycle: S.optional(S.String),
          FailureDetails: S.optional(__S(192, __c6, 0)),
          StorageCapacity: S.optional(S.Number),
          VpcId: S.optional(S.String),
          SubnetIds: S.optional(__S(32, __c1, 0)),
          NetworkInterfaceIds: S.optional(__S(32, __c1, 0)),
          DNSName: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          ResourceARN: S.optional(S.String),
          Tags: S.optional(__S(225, __c7, 1)),
          CopyTagsToDataRepositoryAssociations: S.optional(S.Boolean),
          LustreConfiguration: S.optional(__S(801, __c25, 1)),
          DataRepositoryAssociationIds: S.optional(__S(32, __c1, 0)),
        }),
      ).annotate({ identifier: "FileCacheCreating" });
    case 6:
      return S.suspend(() => S.Struct({ FileCache: S.optional(__S(773, __c24, 5)) })).annotate({
        identifier: "CreateFileCacheResponse",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ StorageCapacity: S.optional(S.Number) })).annotate({
        identifier: "FileCacheLustreMetadataConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PerUnitStorageThroughput: S.optional(S.Number),
          DeploymentType: S.optional(S.String),
          MountName: S.optional(S.String),
          WeeklyMaintenanceStartTime: S.optional(S.String),
          MetadataConfiguration: S.optional(__S(800, __c25, 0)),
          LogConfiguration: S.optional(__S(288, __c9, 0)),
        }),
      ).annotate({ identifier: "FileCacheLustreConfiguration" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutomaticBackupRetentionDays: S.optional(S.Number),
          DailyAutomaticBackupStartTime: S.optional(S.String),
          DeploymentType: S.optional(S.String),
          EndpointIpAddressRange: S.optional(S.String),
          FsxAdminPassword: S.optional(SensitiveString),
          DiskIopsConfiguration: S.optional(__S(353, __c11, 1)),
          PreferredSubnetId: S.optional(S.String),
          RouteTableIds: S.optional(__S(32, __c1, 0)),
          ThroughputCapacity: S.optional(S.Number),
          WeeklyMaintenanceStartTime: S.optional(S.String),
          HAPairs: S.optional(S.Number),
          ThroughputCapacityPerHAPair: S.optional(S.Number),
          EndpointIpv6AddressRange: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateFileSystemOntapConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          FileSystemType: S.optional(S.String),
          StorageCapacity: S.optional(S.Number),
          StorageType: S.optional(S.String),
          SubnetIds: S.optional(__S(32, __c1, 0)),
          SecurityGroupIds: S.optional(__S(32, __c1, 0)),
          Tags: S.optional(__S(225, __c7, 1)),
          KmsKeyId: S.optional(S.String),
          WindowsConfiguration: S.optional(__S(864, __c27, 0)),
          LustreConfiguration: S.optional(__S(865, __c27, 1)),
          OntapConfiguration: S.optional(__S(832, __c26, 0)),
          FileSystemTypeVersion: S.optional(S.String),
          OpenZFSConfiguration: S.optional(__S(867, __c27, 3)),
          NetworkType: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateFileSystemRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ActiveDirectoryId: S.optional(S.String),
          SelfManagedActiveDirectoryConfiguration: S.optional(__S(896, __c28, 0)),
          DeploymentType: S.optional(S.String),
          PreferredSubnetId: S.optional(S.String),
          ThroughputCapacity: S.optional(S.Number),
          WeeklyMaintenanceStartTime: S.optional(S.String),
          DailyAutomaticBackupStartTime: S.optional(S.String),
          AutomaticBackupRetentionDays: S.optional(S.Number),
          CopyTagsToBackups: S.optional(S.Boolean),
          Aliases: S.optional(__S(32, __c1, 0)),
          AuditLogConfiguration: S.optional(__S(352, __c11, 0)),
          DiskIopsConfiguration: S.optional(__S(353, __c11, 1)),
          FsrmConfiguration: S.optional(__S(354, __c11, 2)),
        }),
      ).annotate({ identifier: "CreateFileSystemWindowsConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WeeklyMaintenanceStartTime: S.optional(S.String),
          ImportPath: S.optional(S.String),
          ExportPath: S.optional(S.String),
          ImportedFileChunkSize: S.optional(S.Number),
          DeploymentType: S.optional(S.String),
          AutoImportPolicy: S.optional(S.String),
          PerUnitStorageThroughput: S.optional(S.Number),
          DailyAutomaticBackupStartTime: S.optional(S.String),
          AutomaticBackupRetentionDays: S.optional(S.Number),
          CopyTagsToBackups: S.optional(S.Boolean),
          DriveCacheType: S.optional(S.String),
          DataCompressionType: S.optional(S.String),
          EfaEnabled: S.optional(S.Boolean),
          LogConfiguration: S.optional(__S(288, __c9, 0)),
          RootSquashConfiguration: S.optional(__S(357, __c11, 5)),
          MetadataConfiguration: S.optional(__S(358, __c11, 6)),
          ThroughputCapacity: S.optional(S.Number),
          DataReadCacheConfiguration: S.optional(__S(359, __c11, 7)),
        }),
      ).annotate({ identifier: "CreateFileSystemLustreConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          RecordSizeKiB: S.optional(S.Number),
          DataCompressionType: S.optional(S.String),
          NfsExports: S.optional(__S(371, __c11, 19)),
          UserAndGroupQuotas: S.optional(__S(373, __c11, 21)),
          CopyTagsToSnapshots: S.optional(S.Boolean),
          ReadOnly: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "OpenZFSCreateRootVolumeConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          AutomaticBackupRetentionDays: S.optional(S.Number),
          CopyTagsToBackups: S.optional(S.Boolean),
          CopyTagsToVolumes: S.optional(S.Boolean),
          DailyAutomaticBackupStartTime: S.optional(S.String),
          DeploymentType: S.optional(S.String),
          ThroughputCapacity: S.optional(S.Number),
          WeeklyMaintenanceStartTime: S.optional(S.String),
          DiskIopsConfiguration: S.optional(__S(353, __c11, 1)),
          RootVolumeConfiguration: S.optional(__S(866, __c27, 2)),
          PreferredSubnetId: S.optional(S.String),
          EndpointIpAddressRange: S.optional(S.String),
          EndpointIpv6AddressRange: S.optional(S.String),
          RouteTableIds: S.optional(__S(32, __c1, 0)),
          ReadCacheConfiguration: S.optional(__S(359, __c11, 7)),
        }),
      ).annotate({ identifier: "CreateFileSystemOpenZFSConfiguration" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.optional(S.String),
          OrganizationalUnitDistinguishedName: S.optional(S.String),
          FileSystemAdministratorsGroup: S.optional(S.String),
          UserName: S.optional(S.String),
          Password: S.optional(SensitiveString),
          DnsIps: S.optional(__S(32, __c1, 0)),
          DomainJoinServiceAccountSecret: S.optional(S.String),
        }),
      ).annotate({ identifier: "SelfManagedActiveDirectoryConfiguration" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ FileSystem: S.optional(__S(382, __c11, 30)) })).annotate({
        identifier: "CreateFileSystemResponse",
      });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupId: S.optional(S.String),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          SubnetIds: S.optional(__S(32, __c1, 0)),
          SecurityGroupIds: S.optional(__S(32, __c1, 0)),
          Tags: S.optional(__S(225, __c7, 1)),
          WindowsConfiguration: S.optional(__S(864, __c27, 0)),
          LustreConfiguration: S.optional(__S(865, __c27, 1)),
          StorageType: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          FileSystemTypeVersion: S.optional(S.String),
          OpenZFSConfiguration: S.optional(__S(867, __c27, 3)),
          StorageCapacity: S.optional(S.Number),
          NetworkType: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateFileSystemFromBackupRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Name: S.optional(S.String),
          VolumeId: S.optional(S.String),
          Tags: S.optional(__S(225, __c7, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateSnapshotRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Snapshot: S.optional(__S(376, __c11, 24)) })).annotate({
        identifier: "CreateSnapshotResponse",
      });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NetBiosName: S.optional(S.String),
          SelfManagedActiveDirectoryConfiguration: S.optional(__S(896, __c28, 0)),
        }),
      ).annotate({ identifier: "CreateSvmActiveDirectoryConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ActiveDirectoryConfiguration: S.optional(__S(1056, __c33, 0)),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          FileSystemId: S.optional(S.String),
          Name: S.optional(S.String),
          SvmAdminPassword: S.optional(SensitiveString),
          Tags: S.optional(__S(225, __c7, 1)),
          RootVolumeSecurityStyle: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateStorageVirtualMachineRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NetBiosName: S.optional(S.String),
          SelfManagedActiveDirectoryConfiguration: S.optional(__S(320, __c10, 0)),
        }),
      ).annotate({ identifier: "SvmActiveDirectoryConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Iscsi: S.optional(__S(321, __c10, 1)),
          Management: S.optional(__S(321, __c10, 1)),
          Nfs: S.optional(__S(321, __c10, 1)),
          Smb: S.optional(__S(321, __c10, 1)),
        }),
      ).annotate({ identifier: "SvmEndpoints" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ActiveDirectoryConfiguration: S.optional(__S(1088, __c34, 0)),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Endpoints: S.optional(__S(1089, __c34, 1)),
          FileSystemId: S.optional(S.String),
          Lifecycle: S.optional(S.String),
          Name: S.optional(S.String),
          ResourceARN: S.optional(S.String),
          StorageVirtualMachineId: S.optional(S.String),
          Subtype: S.optional(S.String),
          UUID: S.optional(S.String),
          Tags: S.optional(__S(225, __c7, 1)),
          LifecycleTransitionReason: S.optional(__S(192, __c6, 0)),
          RootVolumeSecurityStyle: S.optional(S.String),
        }),
      ).annotate({ identifier: "StorageVirtualMachine" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StorageVirtualMachine: S.optional(__S(1090, __c34, 2)) }),
      ).annotate({ identifier: "CreateStorageVirtualMachineResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ParentVolumeId: S.optional(S.String),
          StorageCapacityReservationGiB: S.optional(S.Number),
          StorageCapacityQuotaGiB: S.optional(S.Number),
          RecordSizeKiB: S.optional(S.Number),
          DataCompressionType: S.optional(S.String),
          CopyTagsToSnapshots: S.optional(S.Boolean),
          OriginSnapshot: S.optional(__S(367, __c11, 15)),
          ReadOnly: S.optional(S.Boolean),
          NfsExports: S.optional(__S(371, __c11, 19)),
          UserAndGroupQuotas: S.optional(__S(373, __c11, 21)),
        }),
      ).annotate({ identifier: "CreateOpenZFSVolumeConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          VolumeType: S.optional(S.String),
          Name: S.optional(S.String),
          OntapConfiguration: S.optional(__S(1185, __c37, 1)),
          Tags: S.optional(__S(225, __c7, 1)),
          OpenZFSConfiguration: S.optional(__S(1152, __c36, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateVolumeRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Aggregates: S.optional(__S(32, __c1, 0)),
          ConstituentsPerAggregate: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CreateAggregateConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          JunctionPath: S.optional(S.String),
          SecurityStyle: S.optional(S.String),
          SizeInMegabytes: S.optional(S.Number),
          StorageEfficiencyEnabled: S.optional(S.Boolean),
          StorageVirtualMachineId: S.optional(S.String),
          TieringPolicy: S.optional(__S(361, __c11, 9)),
          OntapVolumeType: S.optional(S.String),
          SnapshotPolicy: S.optional(S.String),
          CopyTagsToBackups: S.optional(S.Boolean),
          SnaplockConfiguration: S.optional(__S(364, __c11, 12)),
          VolumeStyle: S.optional(S.String),
          AggregateConfiguration: S.optional(__S(1184, __c37, 0)),
          SizeInBytes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CreateOntapVolumeConfiguration" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Volume: S.optional(__S(375, __c11, 23)) })).annotate({
        identifier: "CreateVolumeResponse",
      });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupId: S.optional(S.String),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Name: S.optional(S.String),
          OntapConfiguration: S.optional(__S(1185, __c37, 1)),
          Tags: S.optional(__S(225, __c7, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateVolumeFromBackupRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupId: S.optional(S.String),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteBackupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ BackupId: S.optional(S.String), Lifecycle: S.optional(S.String) }),
      ).annotate({ identifier: "DeleteBackupResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AssociationId: S.optional(S.String),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          DeleteDataInFileSystem: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteDataRepositoryAssociationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AssociationId: S.optional(S.String),
          Lifecycle: S.optional(S.String),
          DeleteDataInFileSystem: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DeleteDataRepositoryAssociationResponse" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FileCacheId: S.optional(S.String),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteFileCacheRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ FileCacheId: S.optional(S.String), Lifecycle: S.optional(S.String) }),
      ).annotate({ identifier: "DeleteFileCacheResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SkipFinalBackup: S.optional(S.Boolean),
          FinalBackupTags: S.optional(__S(225, __c7, 1)),
        }),
      ).annotate({ identifier: "DeleteFileSystemWindowsConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SkipFinalBackup: S.optional(S.Boolean),
          FinalBackupTags: S.optional(__S(225, __c7, 1)),
          Options: S.optional(__S(256, __c8, 0)),
        }),
      ).annotate({ identifier: "DeleteFileSystemOpenZFSConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          FileSystemId: S.optional(S.String),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          WindowsConfiguration: S.optional(__S(1376, __c43, 0)),
          LustreConfiguration: S.optional(__S(1376, __c43, 0)),
          OpenZFSConfiguration: S.optional(__S(1377, __c43, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteFileSystemRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          FileSystemId: S.optional(S.String),
          Lifecycle: S.optional(S.String),
          WindowsResponse: S.optional(__S(1408, __c44, 0)),
          LustreResponse: S.optional(__S(1408, __c44, 0)),
          OpenZFSResponse: S.optional(__S(1408, __c44, 0)),
        }),
      ).annotate({ identifier: "DeleteFileSystemResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FinalBackupId: S.optional(S.String),
          FinalBackupTags: S.optional(__S(225, __c7, 1)),
        }),
      ).annotate({ identifier: "DeleteFileSystemWindowsResponse" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          SnapshotId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteSnapshotRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ SnapshotId: S.optional(S.String), Lifecycle: S.optional(S.String) }),
      ).annotate({ identifier: "DeleteSnapshotResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          StorageVirtualMachineId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteStorageVirtualMachineRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StorageVirtualMachineId: S.optional(S.String),
          Lifecycle: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteStorageVirtualMachineResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SkipFinalBackup: S.optional(S.Boolean),
          FinalBackupTags: S.optional(__S(225, __c7, 1)),
          BypassSnaplockEnterpriseRetention: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DeleteVolumeOntapConfiguration" });
    case 1:
      return S.suspend(() => S.Struct({ Options: S.optional(__S(256, __c8, 0)) })).annotate({
        identifier: "DeleteVolumeOpenZFSConfiguration",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          VolumeId: S.optional(S.String),
          OntapConfiguration: S.optional(__S(1504, __c47, 0)),
          OpenZFSConfiguration: S.optional(__S(1505, __c47, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteVolumeRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          VolumeId: S.optional(S.String),
          Lifecycle: S.optional(S.String),
          OntapResponse: S.optional(__S(1408, __c44, 0)),
        }),
      ).annotate({ identifier: "DeleteVolumeResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupIds: S.optional(__S(32, __c1, 0)),
          Filters: S.optional(__S(1569, __c49, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeBackupsRequest" });
    case 1:
      return S.Array(__S(417, __c13, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ Backups: S.optional(__S(1537, __c48, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeBackupsResponse" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Values: S.optional(__S(32, __c1, 0)) }),
      ).annotate({ identifier: "Filter" });
    case 1:
      return S.Array(__S(1568, __c49, 0));
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AssociationIds: S.optional(__S(32, __c1, 0)),
          Filters: S.optional(__S(1569, __c49, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDataRepositoryAssociationsRequest" });
    case 1:
      return S.Array(__S(643, __c20, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Associations: S.optional(__S(1601, __c50, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeDataRepositoryAssociationsResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TaskIds: S.optional(__S(32, __c1, 0)),
          Filters: S.optional(__S(1569, __c49, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDataRepositoryTasksRequest" });
    case 1:
      return S.Array(__S(740, __c23, 4));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DataRepositoryTasks: S.optional(__S(1633, __c51, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeDataRepositoryTasksResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FileCacheIds: S.optional(__S(32, __c1, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeFileCachesRequest" });
    case 1:
      return S.Array(__S(1696, __c53, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ FileCaches: S.optional(__S(1665, __c52, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeFileCachesResponse" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OwnerId: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FileCacheId: S.optional(S.String),
          FileCacheType: S.optional(S.String),
          FileCacheTypeVersion: S.optional(S.String),
          Lifecycle: S.optional(S.String),
          FailureDetails: S.optional(__S(192, __c6, 0)),
          StorageCapacity: S.optional(S.Number),
          VpcId: S.optional(S.String),
          SubnetIds: S.optional(__S(32, __c1, 0)),
          NetworkInterfaceIds: S.optional(__S(32, __c1, 0)),
          DNSName: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          ResourceARN: S.optional(S.String),
          LustreConfiguration: S.optional(__S(801, __c25, 1)),
          DataRepositoryAssociationIds: S.optional(__S(32, __c1, 0)),
        }),
      ).annotate({ identifier: "FileCache" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          FileSystemId: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeFileSystemAliasesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Aliases: S.optional(__S(65, __c2, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeFileSystemAliasesResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FileSystemIds: S.optional(__S(32, __c1, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeFileSystemsRequest" });
    case 1:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<FileSystem> => __S(382, __c11, 30)).annotate({
          identifier: "FileSystem",
        }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({ FileSystems: S.optional(__S(1761, __c55, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeFileSystemsResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Names: S.optional(__S(32, __c1, 0)),
          Filters: S.optional(__S(1569, __c49, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeS3AccessPointAttachmentsRequest" });
    case 1:
      return S.Array(__S(553, __c17, 9));
    case 2:
      return S.suspend(() =>
        S.Struct({
          S3AccessPointAttachments: S.optional(__S(1793, __c56, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeS3AccessPointAttachmentsResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeSharedVpcConfigurationRequest" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EnableFsxRouteTableUpdatesFromParticipantAccounts: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeSharedVpcConfigurationResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SnapshotIds: S.optional(__S(32, __c1, 0)),
          Filters: S.optional(__S(1569, __c49, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          IncludeShared: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeSnapshotsRequest" });
    case 1:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<Snapshot> => __S(376, __c11, 24)).annotate({
          identifier: "Snapshot",
        }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({ Snapshots: S.optional(__S(1889, __c59, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeSnapshotsResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StorageVirtualMachineIds: S.optional(__S(32, __c1, 0)),
          Filters: S.optional(__S(1569, __c49, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeStorageVirtualMachinesRequest" });
    case 1:
      return S.Array(__S(1090, __c34, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          StorageVirtualMachines: S.optional(__S(1921, __c60, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeStorageVirtualMachinesResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VolumeIds: S.optional(__S(32, __c1, 0)),
          Filters: S.optional(__S(1569, __c49, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeVolumesRequest" });
    case 1:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<Volume> => __S(375, __c11, 23)).annotate({
          identifier: "Volume",
        }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({ Volumes: S.optional(__S(1953, __c61, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeVolumesResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Name: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DetachAndDeleteS3AccessPointRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Lifecycle: S.optional(S.String), Name: S.optional(S.String) }),
      ).annotate({ identifier: "DetachAndDeleteS3AccessPointResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          FileSystemId: S.optional(S.String),
          Aliases: S.optional(__S(32, __c1, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisassociateFileSystemAliasesRequest" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceARN: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Tags: S.optional(__S(225, __c7, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FileSystemId: S.optional(S.String),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ReleaseFileSystemNfsV3LocksRequest" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          VolumeId: S.optional(S.String),
          SnapshotId: S.optional(S.String),
          Options: S.optional(__S(256, __c8, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RestoreVolumeFromSnapshotRequest" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          FileSystemId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartMisconfiguredStateRecoveryRequest" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.optional(S.String), Tags: S.optional(__S(225, __c7, 1)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.optional(S.String), TagKeys: S.optional(__S(32, __c1, 0)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AssociationId: S.optional(S.String),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          ImportedFileChunkSize: S.optional(S.Number),
          S3: S.optional(__S(641, __c20, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateDataRepositoryAssociationRequest" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ WeeklyMaintenanceStartTime: S.optional(S.String) }),
      ).annotate({ identifier: "UpdateFileCacheLustreConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FileCacheId: S.optional(S.String),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          LustreConfiguration: S.optional(__S(2304, __c72, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateFileCacheRequest" });
    case 2:
      return S.suspend(() => S.Struct({ FileCache: S.optional(__S(1696, __c53, 0)) })).annotate({
        identifier: "UpdateFileCacheResponse",
      });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WeeklyMaintenanceStartTime: S.optional(S.String),
          DailyAutomaticBackupStartTime: S.optional(S.String),
          AutomaticBackupRetentionDays: S.optional(S.Number),
          ThroughputCapacity: S.optional(S.Number),
          SelfManagedActiveDirectoryConfiguration: S.optional(__S(2368, __c74, 0)),
          AuditLogConfiguration: S.optional(__S(352, __c11, 0)),
          DiskIopsConfiguration: S.optional(__S(353, __c11, 1)),
          FsrmConfiguration: S.optional(__S(354, __c11, 2)),
        }),
      ).annotate({ identifier: "UpdateFileSystemWindowsConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WeeklyMaintenanceStartTime: S.optional(S.String),
          DailyAutomaticBackupStartTime: S.optional(S.String),
          AutomaticBackupRetentionDays: S.optional(S.Number),
          AutoImportPolicy: S.optional(S.String),
          DataCompressionType: S.optional(S.String),
          LogConfiguration: S.optional(__S(288, __c9, 0)),
          RootSquashConfiguration: S.optional(__S(357, __c11, 5)),
          PerUnitStorageThroughput: S.optional(S.Number),
          MetadataConfiguration: S.optional(__S(358, __c11, 6)),
          ThroughputCapacity: S.optional(S.Number),
          DataReadCacheConfiguration: S.optional(__S(359, __c11, 7)),
        }),
      ).annotate({ identifier: "UpdateFileSystemLustreConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AutomaticBackupRetentionDays: S.optional(S.Number),
          DailyAutomaticBackupStartTime: S.optional(S.String),
          FsxAdminPassword: S.optional(SensitiveString),
          WeeklyMaintenanceStartTime: S.optional(S.String),
          DiskIopsConfiguration: S.optional(__S(353, __c11, 1)),
          ThroughputCapacity: S.optional(S.Number),
          AddRouteTableIds: S.optional(__S(32, __c1, 0)),
          RemoveRouteTableIds: S.optional(__S(32, __c1, 0)),
          ThroughputCapacityPerHAPair: S.optional(S.Number),
          HAPairs: S.optional(S.Number),
          EndpointIpv6AddressRange: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateFileSystemOntapConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          AutomaticBackupRetentionDays: S.optional(S.Number),
          CopyTagsToBackups: S.optional(S.Boolean),
          CopyTagsToVolumes: S.optional(S.Boolean),
          DailyAutomaticBackupStartTime: S.optional(S.String),
          ThroughputCapacity: S.optional(S.Number),
          WeeklyMaintenanceStartTime: S.optional(S.String),
          DiskIopsConfiguration: S.optional(__S(353, __c11, 1)),
          AddRouteTableIds: S.optional(__S(32, __c1, 0)),
          RemoveRouteTableIds: S.optional(__S(32, __c1, 0)),
          ReadCacheConfiguration: S.optional(__S(359, __c11, 7)),
          EndpointIpv6AddressRange: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateFileSystemOpenZFSConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          FileSystemId: S.optional(S.String),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          StorageCapacity: S.optional(S.Number),
          WindowsConfiguration: S.optional(__S(2336, __c73, 0)),
          LustreConfiguration: S.optional(__S(2337, __c73, 1)),
          OntapConfiguration: S.optional(__S(2338, __c73, 2)),
          OpenZFSConfiguration: S.optional(__S(2339, __c73, 3)),
          StorageType: S.optional(S.String),
          FileSystemTypeVersion: S.optional(S.String),
          NetworkType: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateFileSystemRequest" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserName: S.optional(S.String),
          Password: S.optional(SensitiveString),
          DnsIps: S.optional(__S(32, __c1, 0)),
          DomainName: S.optional(S.String),
          OrganizationalUnitDistinguishedName: S.optional(S.String),
          FileSystemAdministratorsGroup: S.optional(S.String),
          DomainJoinServiceAccountSecret: S.optional(S.String),
        }),
      ).annotate({ identifier: "SelfManagedActiveDirectoryConfigurationUpdates" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EnableFsxRouteTableUpdatesFromParticipantAccounts: S.optional(S.String),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateSharedVpcConfigurationRequest" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Name: S.optional(S.String),
          SnapshotId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateSnapshotRequest" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SelfManagedActiveDirectoryConfiguration: S.optional(__S(2368, __c74, 0)),
          NetBiosName: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateSvmActiveDirectoryConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ActiveDirectoryConfiguration: S.optional(__S(2464, __c77, 0)),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          StorageVirtualMachineId: S.optional(S.String),
          SvmAdminPassword: S.optional(SensitiveString),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateStorageVirtualMachineRequest" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuditLogVolume: S.optional(S.Boolean),
          AutocommitPeriod: S.optional(__S(362, __c11, 10)),
          PrivilegedDelete: S.optional(S.String),
          RetentionPeriod: S.optional(__S(363, __c11, 11)),
          VolumeAppendModeEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "UpdateSnaplockConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          JunctionPath: S.optional(S.String),
          SecurityStyle: S.optional(S.String),
          SizeInMegabytes: S.optional(S.Number),
          StorageEfficiencyEnabled: S.optional(S.Boolean),
          TieringPolicy: S.optional(__S(361, __c11, 9)),
          SnapshotPolicy: S.optional(S.String),
          CopyTagsToBackups: S.optional(S.Boolean),
          SnaplockConfiguration: S.optional(__S(2496, __c78, 0)),
          SizeInBytes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "UpdateOntapVolumeConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          StorageCapacityReservationGiB: S.optional(S.Number),
          StorageCapacityQuotaGiB: S.optional(S.Number),
          RecordSizeKiB: S.optional(S.Number),
          DataCompressionType: S.optional(S.String),
          NfsExports: S.optional(__S(371, __c11, 19)),
          UserAndGroupQuotas: S.optional(__S(373, __c11, 21)),
          ReadOnly: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "UpdateOpenZFSVolumeConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          VolumeId: S.optional(S.String),
          OntapConfiguration: S.optional(__S(2497, __c78, 1)),
          Name: S.optional(S.String),
          OpenZFSConfiguration: S.optional(__S(2498, __c78, 2)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateVolumeRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
