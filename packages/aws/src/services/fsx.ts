import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsServiceErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
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

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "FSx",
  service: "FSx",
  templates: false,
  propagate: TxXray.propagate,
} as const;

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
export class ClusterPeerNotFound
  extends /*@__PURE__*/ S.TaggedError<ClusterPeerNotFound>()("ClusterPeerNotFound", {
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
export class SnapmirrorPolicyNotFound
  extends /*@__PURE__*/ S.TaggedError<SnapmirrorPolicyNotFound>()("SnapmirrorPolicyNotFound", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class SnapmirrorRelationshipNotFound
  extends /*@__PURE__*/ S.TaggedError<SnapmirrorRelationshipNotFound>()(
    "SnapmirrorRelationshipNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class SnapshotNotFound
  extends /*@__PURE__*/ S.TaggedError<SnapshotNotFound>()("SnapshotNotFound", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class SnapshotPolicyNotFound
  extends /*@__PURE__*/ S.TaggedError<SnapshotPolicyNotFound>()("SnapshotPolicyNotFound", {
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
export class StorageVirtualMachinePeerNotFound
  extends /*@__PURE__*/ S.TaggedError<StorageVirtualMachinePeerNotFound>()(
    "StorageVirtualMachinePeerNotFound",
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
  ClientRequestToken?: string | undefined;
  FileSystemId?: string | undefined;
  Aliases?: string[] | undefined;
}
export type AliasLifecycle =
  | "AVAILABLE"
  | "CREATING"
  | "DELETING"
  | "CREATE_FAILED"
  | "DELETE_FAILED"
  | (string & {});
export interface Alias {
  Name?: string | undefined;
  Lifecycle?: AliasLifecycle | undefined;
}
export type Aliases = Alias[];
export interface AssociateFileSystemAliasesResponse {
  Aliases?: Alias[] | undefined;
}
export type TaskId = string;
export interface CancelDataRepositoryTaskRequest {
  TaskId?: string | undefined;
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
  Lifecycle?: DataRepositoryTaskLifecycle | undefined;
  TaskId?: string | undefined;
}
export type SourceBackupId = string;
export type Region = string;
export type KmsKeyId = string;
export type Flag = boolean;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string | undefined;
  Value?: string | undefined;
}
export type Tags = Tag[];
export interface CopyBackupRequest {
  ClientRequestToken?: string | undefined;
  SourceBackupId?: string | undefined;
  SourceRegion?: string | undefined;
  KmsKeyId?: string | undefined;
  CopyTags?: boolean | undefined;
  Tags?: Tag[] | undefined;
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
  Message?: string | undefined;
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
  Message?: string | undefined;
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
  DomainName?: string | undefined;
  OrganizationalUnitDistinguishedName?: string | undefined;
  FileSystemAdministratorsGroup?: string | undefined;
  UserName?: string | undefined;
  DnsIps?: string[] | undefined;
  DomainJoinServiceAccountSecret?: string | undefined;
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
  FileAccessAuditLogLevel?: WindowsAccessAuditLogLevel | undefined;
  FileShareAccessAuditLogLevel?: WindowsAccessAuditLogLevel | undefined;
  AuditLogDestination?: string | undefined;
}
export type DiskIopsConfigurationMode = "AUTOMATIC" | "USER_PROVISIONED" | (string & {});
export type Iops = number;
export interface DiskIopsConfiguration {
  Mode?: DiskIopsConfigurationMode | undefined;
  Iops?: number | undefined;
}
export interface WindowsFsrmConfiguration {
  FsrmServiceEnabled?: boolean | undefined;
  EventLogDestination?: string | undefined;
}
export interface WindowsFileSystemConfiguration {
  ActiveDirectoryId?: string | undefined;
  SelfManagedActiveDirectoryConfiguration?: SelfManagedActiveDirectoryAttributes | undefined;
  DeploymentType?: WindowsDeploymentType | undefined;
  RemoteAdministrationEndpoint?: string | undefined;
  PreferredSubnetId?: string | undefined;
  PreferredFileServerIp?: string | undefined;
  ThroughputCapacity?: number | undefined;
  MaintenanceOperationsInProgress?: FileSystemMaintenanceOperation[] | undefined;
  WeeklyMaintenanceStartTime?: string | undefined;
  DailyAutomaticBackupStartTime?: string | undefined;
  AutomaticBackupRetentionDays?: number | undefined;
  CopyTagsToBackups?: boolean | undefined;
  Aliases?: Alias[] | undefined;
  AuditLogConfiguration?: WindowsAuditLogConfiguration | undefined;
  DiskIopsConfiguration?: DiskIopsConfiguration | undefined;
  PreferredFileServerIpv6?: string | undefined;
  FsrmConfiguration?: WindowsFsrmConfiguration | undefined;
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
  Message?: string | undefined;
}
export interface DataRepositoryConfiguration {
  Lifecycle?: DataRepositoryLifecycle | undefined;
  ImportPath?: string | undefined;
  ExportPath?: string | undefined;
  ImportedFileChunkSize?: number | undefined;
  AutoImportPolicy?: AutoImportPolicyType | undefined;
  FailureDetails?: DataRepositoryFailureDetails | undefined;
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
  Level?: LustreAccessAuditLogLevel | undefined;
  Destination?: string | undefined;
}
export type LustreRootSquash = string;
export type LustreNoSquashNid = string;
export type LustreNoSquashNids = string[];
export interface LustreRootSquashConfiguration {
  RootSquash?: string | undefined;
  NoSquashNids?: string[] | undefined;
}
export type MetadataIops = number;
export type MetadataConfigurationMode = "AUTOMATIC" | "USER_PROVISIONED" | (string & {});
export interface FileSystemLustreMetadataConfiguration {
  Iops?: number | undefined;
  Mode?: MetadataConfigurationMode | undefined;
}
export type ThroughputCapacityMbps = number;
export type LustreReadCacheSizingMode =
  | "NO_CACHE"
  | "USER_PROVISIONED"
  | "PROPORTIONAL_TO_THROUGHPUT_CAPACITY"
  | (string & {});
export interface LustreReadCacheConfiguration {
  SizingMode?: LustreReadCacheSizingMode | undefined;
  SizeGiB?: number | undefined;
}
export interface LustreFileSystemConfiguration {
  WeeklyMaintenanceStartTime?: string | undefined;
  DataRepositoryConfiguration?: DataRepositoryConfiguration | undefined;
  DeploymentType?: LustreDeploymentType | undefined;
  PerUnitStorageThroughput?: number | undefined;
  MountName?: string | undefined;
  DailyAutomaticBackupStartTime?: string | undefined;
  AutomaticBackupRetentionDays?: number | undefined;
  CopyTagsToBackups?: boolean | undefined;
  DriveCacheType?: DriveCacheType | undefined;
  DataCompressionType?: DataCompressionType | undefined;
  LogConfiguration?: LustreLogConfiguration | undefined;
  RootSquashConfiguration?: LustreRootSquashConfiguration | undefined;
  MetadataConfiguration?: FileSystemLustreMetadataConfiguration | undefined;
  EfaEnabled?: boolean | undefined;
  ThroughputCapacity?: number | undefined;
  DataReadCacheConfiguration?: LustreReadCacheConfiguration | undefined;
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
  | "VOLUME_CLONE_SPLIT"
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
  Message?: string | undefined;
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
  CoolingPeriod?: number | undefined;
  Name?: TieringPolicyName | undefined;
}
export type UUID = string;
export type OntapVolumeType = "RW" | "DP" | "LS" | (string & {});
export type SnapshotPolicyName = string;
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
  Type?: AutocommitPeriodType | undefined;
  Value?: number | undefined;
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
  Type?: RetentionPeriodType | undefined;
  Value?: number | undefined;
}
export interface SnaplockRetentionPeriod {
  DefaultRetention?: RetentionPeriod | undefined;
  MinimumRetention?: RetentionPeriod | undefined;
  MaximumRetention?: RetentionPeriod | undefined;
}
export type SnaplockType = "COMPLIANCE" | "ENTERPRISE" | (string & {});
export interface SnaplockConfiguration {
  AuditLogVolume?: boolean | undefined;
  AutocommitPeriod?: AutocommitPeriod | undefined;
  PrivilegedDelete?: PrivilegedDelete | undefined;
  RetentionPeriod?: SnaplockRetentionPeriod | undefined;
  SnaplockType?: SnaplockType | undefined;
  VolumeAppendModeEnabled?: boolean | undefined;
}
export type VolumeStyle = "FLEXVOL" | "FLEXGROUP" | (string & {});
export type Aggregate = string;
export type Aggregates = string[];
export type TotalConstituents = number;
export interface AggregateConfiguration {
  Aggregates?: string[] | undefined;
  TotalConstituents?: number | undefined;
}
export type VolumeCapacityBytes = number;
export type VolumeId = string;
export type SnapshotId = string;
export interface CloneConfiguration {
  ParentVolumeId?: string | undefined;
  SnapshotId?: string | undefined;
}
export interface OntapVolumeConfiguration {
  FlexCacheEndpointType?: FlexCacheEndpointType | undefined;
  JunctionPath?: string | undefined;
  SecurityStyle?: SecurityStyle | undefined;
  SizeInMegabytes?: number | undefined;
  StorageEfficiencyEnabled?: boolean | undefined;
  StorageVirtualMachineId?: string | undefined;
  StorageVirtualMachineRoot?: boolean | undefined;
  TieringPolicy?: TieringPolicy | undefined;
  UUID?: string | undefined;
  OntapVolumeType?: OntapVolumeType | undefined;
  SnapshotPolicy?: string | undefined;
  CopyTagsToBackups?: boolean | undefined;
  SnaplockConfiguration?: SnaplockConfiguration | undefined;
  VolumeStyle?: VolumeStyle | undefined;
  AggregateConfiguration?: AggregateConfiguration | undefined;
  SizeInBytes?: number | undefined;
  CloneConfiguration?: CloneConfiguration | undefined;
}
export type VolumeType = "ONTAP" | "OPENZFS" | (string & {});
export type ErrorCode = string;
export interface OntapError {
  Message?: string | undefined;
  Code?: string | undefined;
}
export interface LifecycleTransitionReason {
  Message?: string | undefined;
  OntapError?: OntapError | undefined;
}
export type VolumePath = string;
export type IntegerNoMax = number;
export type IntegerRecordSizeKiB = number;
export type OpenZFSDataCompressionType = "NONE" | "ZSTD" | "LZ4" | (string & {});
export type OpenZFSCopyStrategy = "CLONE" | "FULL_COPY" | "INCREMENTAL_COPY" | (string & {});
export interface OpenZFSOriginSnapshotConfiguration {
  SnapshotARN?: string | undefined;
  CopyStrategy?: OpenZFSCopyStrategy | undefined;
}
export type ReadOnly = boolean;
export type OpenZFSClients = string;
export type OpenZFSNfsExportOption = string;
export type OpenZFSNfsExportOptions = string[];
export interface OpenZFSClientConfiguration {
  Clients?: string | undefined;
  Options?: string[] | undefined;
}
export type OpenZFSClientConfigurations = OpenZFSClientConfiguration[];
export interface OpenZFSNfsExport {
  ClientConfigurations?: OpenZFSClientConfiguration[] | undefined;
}
export type OpenZFSNfsExports = OpenZFSNfsExport[];
export type OpenZFSQuotaType = "USER" | "GROUP" | (string & {});
export interface OpenZFSUserOrGroupQuota {
  Type?: OpenZFSQuotaType | undefined;
  Id?: number | undefined;
  StorageCapacityQuotaGiB?: number | undefined;
}
export type OpenZFSUserAndGroupQuotas = OpenZFSUserOrGroupQuota[];
export interface OpenZFSVolumeConfiguration {
  ParentVolumeId?: string | undefined;
  VolumePath?: string | undefined;
  StorageCapacityReservationGiB?: number | undefined;
  StorageCapacityQuotaGiB?: number | undefined;
  RecordSizeKiB?: number | undefined;
  DataCompressionType?: OpenZFSDataCompressionType | undefined;
  CopyTagsToSnapshots?: boolean | undefined;
  OriginSnapshot?: OpenZFSOriginSnapshotConfiguration | undefined;
  ReadOnly?: boolean | undefined;
  NfsExports?: OpenZFSNfsExport[] | undefined;
  UserAndGroupQuotas?: OpenZFSUserOrGroupQuota[] | undefined;
  RestoreToSnapshot?: string | undefined;
  DeleteIntermediateSnaphots?: boolean | undefined;
  DeleteClonedVolumes?: boolean | undefined;
  DeleteIntermediateData?: boolean | undefined;
  SourceSnapshotARN?: string | undefined;
  DestinationSnapshot?: string | undefined;
  CopyStrategy?: OpenZFSCopyStrategy | undefined;
}
export interface Volume {
  CreationTime?: Date | undefined;
  FileSystemId?: string | undefined;
  Lifecycle?: VolumeLifecycle | undefined;
  Name?: string | undefined;
  OntapConfiguration?: OntapVolumeConfiguration | undefined;
  ResourceARN?: string | undefined;
  Tags?: Tag[] | undefined;
  VolumeId?: string | undefined;
  VolumeType?: VolumeType | undefined;
  LifecycleTransitionReason?: LifecycleTransitionReason | undefined;
  AdministrativeActions?: AdministrativeAction[] | undefined;
  OpenZFSConfiguration?: OpenZFSVolumeConfiguration | undefined;
}
export type SnapshotName = string;
export type SnapshotLifecycle =
  | "PENDING"
  | "CREATING"
  | "DELETING"
  | "AVAILABLE"
  | "FAILED"
  | (string & {});
export type SnapshotType = "ONTAP" | "OPENZFS" | (string & {});
export type SnapshotSizeInMegabytes = number;
export type SnapmirrorLabel = string;
export type ExpiryTime = Date;
export type SnaplockExpiryTime = Date;
export interface OntapSnapshotConfiguration {
  SizeInMegabytes?: number | undefined;
  SnapmirrorLabel?: string | undefined;
  ExpiryTime?: Date | undefined;
  SnaplockExpiryTime?: Date | undefined;
  UUID?: string | undefined;
}
export interface Snapshot {
  ResourceARN?: string | undefined;
  SnapshotId?: string | undefined;
  Name?: string | undefined;
  VolumeId?: string | undefined;
  CreationTime?: Date | undefined;
  Lifecycle?: SnapshotLifecycle | undefined;
  SnapshotType?: SnapshotType | undefined;
  LifecycleTransitionReason?: LifecycleTransitionReason | undefined;
  Tags?: Tag[] | undefined;
  AdministrativeActions?: AdministrativeAction[] | undefined;
  OntapConfiguration?: OntapSnapshotConfiguration | undefined;
}
export type TotalTransferBytes = number;
export type RemainingTransferBytes = number;
export interface AdministrativeAction {
  AdministrativeActionType?: AdministrativeActionType | undefined;
  ProgressPercent?: number | undefined;
  RequestTime?: Date | undefined;
  Status?: Status | undefined;
  TargetFileSystemValues?: FileSystem | undefined;
  FailureDetails?: AdministrativeActionFailureDetails | undefined;
  TargetVolumeValues?: Volume | undefined;
  TargetSnapshotValues?: Snapshot | undefined;
  TotalTransferBytes?: number | undefined;
  RemainingTransferBytes?: number | undefined;
  Message?: string | undefined;
}
export type AdministrativeActions = AdministrativeAction[];
export type OntapDeploymentType =
  | "MULTI_AZ_1"
  | "SINGLE_AZ_1"
  | "SINGLE_AZ_2"
  | "MULTI_AZ_2"
  | "SINGLE_AZ_3"
  | "MULTI_AZ_3"
  | (string & {});
export type IpAddressRange = string;
export type OntapEndpointIpAddresses = string[];
export interface FileSystemEndpoint {
  DNSName?: string | undefined;
  IpAddresses?: string[] | undefined;
  Ipv6Addresses?: string[] | undefined;
}
export interface FileSystemEndpoints {
  Intercluster?: FileSystemEndpoint | undefined;
  Management?: FileSystemEndpoint | undefined;
}
export type RouteTableId = string;
export type RouteTableIds = string[];
export type AdminPassword = string | redacted.Redacted<string>;
export type HAPairs = number;
export type ThroughputCapacityPerHAPair = number;
export type Ipv6AddressRange = string;
export interface OntapFileSystemConfiguration {
  AutomaticBackupRetentionDays?: number | undefined;
  DailyAutomaticBackupStartTime?: string | undefined;
  DeploymentType?: OntapDeploymentType | undefined;
  EndpointIpAddressRange?: string | undefined;
  Endpoints?: FileSystemEndpoints | undefined;
  DiskIopsConfiguration?: DiskIopsConfiguration | undefined;
  PreferredSubnetId?: string | undefined;
  RouteTableIds?: string[] | undefined;
  ThroughputCapacity?: number | undefined;
  WeeklyMaintenanceStartTime?: string | undefined;
  FsxAdminPassword?: string | redacted.Redacted<string> | undefined;
  HAPairs?: number | undefined;
  ThroughputCapacityPerHAPair?: number | undefined;
  EndpointIpv6AddressRange?: string | undefined;
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
  SizingMode?: OpenZFSReadCacheSizingMode | undefined;
  SizeGiB?: number | undefined;
}
export interface OpenZFSFileSystemConfiguration {
  AutomaticBackupRetentionDays?: number | undefined;
  CopyTagsToBackups?: boolean | undefined;
  CopyTagsToVolumes?: boolean | undefined;
  DailyAutomaticBackupStartTime?: string | undefined;
  DeploymentType?: OpenZFSDeploymentType | undefined;
  ThroughputCapacity?: number | undefined;
  WeeklyMaintenanceStartTime?: string | undefined;
  DiskIopsConfiguration?: DiskIopsConfiguration | undefined;
  RootVolumeId?: string | undefined;
  PreferredSubnetId?: string | undefined;
  EndpointIpAddressRange?: string | undefined;
  EndpointIpv6AddressRange?: string | undefined;
  RouteTableIds?: string[] | undefined;
  EndpointIpAddress?: string | undefined;
  EndpointIpv6Address?: string | undefined;
  ReadCacheConfiguration?: OpenZFSReadCacheConfiguration | undefined;
}
export type NetworkType = "IPV4" | "DUAL" | (string & {});
export interface FileSystem {
  OwnerId?: string | undefined;
  CreationTime?: Date | undefined;
  FileSystemId?: string | undefined;
  FileSystemType?: FileSystemType | undefined;
  Lifecycle?: FileSystemLifecycle | undefined;
  FailureDetails?: FileSystemFailureDetails | undefined;
  StorageCapacity?: number | undefined;
  StorageType?: StorageType | undefined;
  VpcId?: string | undefined;
  SubnetIds?: string[] | undefined;
  NetworkInterfaceIds?: string[] | undefined;
  DNSName?: string | undefined;
  KmsKeyId?: string | undefined;
  ResourceARN?: string | undefined;
  Tags?: Tag[] | undefined;
  WindowsConfiguration?: WindowsFileSystemConfiguration | undefined;
  LustreConfiguration?: LustreFileSystemConfiguration | undefined;
  AdministrativeActions?: AdministrativeAction[] | undefined;
  OntapConfiguration?: OntapFileSystemConfiguration | undefined;
  FileSystemTypeVersion?: string | undefined;
  OpenZFSConfiguration?: OpenZFSFileSystemConfiguration | undefined;
  NetworkType?: NetworkType | undefined;
}
export interface ActiveDirectoryBackupAttributes {
  DomainName?: string | undefined;
  ActiveDirectoryId?: string | undefined;
  ResourceARN?: string | undefined;
}
export type ResourceType = "FILE_SYSTEM" | "VOLUME" | (string & {});
export type SizeInBytes = number;
export interface Backup {
  BackupId?: string | undefined;
  Lifecycle?: BackupLifecycle | undefined;
  FailureDetails?: BackupFailureDetails | undefined;
  Type?: BackupType | undefined;
  ProgressPercent?: number | undefined;
  CreationTime?: Date | undefined;
  KmsKeyId?: string | undefined;
  ResourceARN?: string | undefined;
  Tags?: Tag[] | undefined;
  FileSystem?: FileSystem | undefined;
  DirectoryInformation?: ActiveDirectoryBackupAttributes | undefined;
  OwnerId?: string | undefined;
  SourceBackupId?: string | undefined;
  SourceBackupRegion?: string | undefined;
  ResourceType?: ResourceType | undefined;
  Volume?: Volume | undefined;
  SizeInBytes?: number | undefined;
}
export interface CopyBackupResponse {
  Backup?:
    | (Backup & {
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
      })
    | undefined;
}
export type UpdateOpenZFSVolumeOption =
  | "DELETE_INTERMEDIATE_SNAPSHOTS"
  | "DELETE_CLONED_VOLUMES"
  | "DELETE_INTERMEDIATE_DATA"
  | (string & {});
export type UpdateOpenZFSVolumeOptions = UpdateOpenZFSVolumeOption[];
export interface CopySnapshotAndUpdateVolumeRequest {
  ClientRequestToken?: string | undefined;
  VolumeId?: string | undefined;
  SourceSnapshotARN?: string | undefined;
  CopyStrategy?: OpenZFSCopyStrategy | undefined;
  Options?: UpdateOpenZFSVolumeOption[] | undefined;
}
export interface CopySnapshotAndUpdateVolumeResponse {
  VolumeId?: string | undefined;
  Lifecycle?: VolumeLifecycle | undefined;
  AdministrativeActions?:
    | (AdministrativeAction & {
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
      })[]
    | undefined;
}
export type S3AccessPointAttachmentName = string;
export type S3AccessPointAttachmentType = "OPENZFS" | "ONTAP" | (string & {});
export type OpenZFSFileSystemUserType = "POSIX" | (string & {});
export type FileSystemUID = number;
export type FileSystemGID = number;
export type FileSystemSecondaryGIDs = number[];
export interface OpenZFSPosixFileSystemUser {
  Uid?: number | undefined;
  Gid?: number | undefined;
  SecondaryGids?: number[] | undefined;
}
export interface OpenZFSFileSystemIdentity {
  Type?: OpenZFSFileSystemUserType | undefined;
  PosixUser?: OpenZFSPosixFileSystemUser | undefined;
}
export interface CreateAndAttachS3AccessPointOpenZFSConfiguration {
  VolumeId?: string | undefined;
  FileSystemIdentity?: OpenZFSFileSystemIdentity | undefined;
}
export type OntapFileSystemUserType = "UNIX" | "WINDOWS" | (string & {});
export type OntapFileSystemUserName = string;
export interface OntapUnixFileSystemUser {
  Name?: string | undefined;
}
export interface OntapWindowsFileSystemUser {
  Name?: string | undefined;
}
export interface OntapFileSystemIdentity {
  Type?: OntapFileSystemUserType | undefined;
  UnixUser?: OntapUnixFileSystemUser | undefined;
  WindowsUser?: OntapWindowsFileSystemUser | undefined;
}
export interface CreateAndAttachS3AccessPointOntapConfiguration {
  VolumeId?: string | undefined;
  FileSystemIdentity?: OntapFileSystemIdentity | undefined;
}
export interface S3AccessPointVpcConfiguration {
  VpcId?: string | undefined;
}
export type AccessPointPolicy = string;
export interface CreateAndAttachS3AccessPointS3Configuration {
  VpcConfiguration?: S3AccessPointVpcConfiguration | undefined;
  Policy?: string | undefined;
}
export interface CreateAndAttachS3AccessPointRequest {
  ClientRequestToken?: string | undefined;
  Name?: string | undefined;
  Type?: S3AccessPointAttachmentType | undefined;
  OpenZFSConfiguration?: CreateAndAttachS3AccessPointOpenZFSConfiguration | undefined;
  OntapConfiguration?: CreateAndAttachS3AccessPointOntapConfiguration | undefined;
  S3AccessPoint?: CreateAndAttachS3AccessPointS3Configuration | undefined;
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
  VolumeId?: string | undefined;
  FileSystemIdentity?: OpenZFSFileSystemIdentity | undefined;
}
export interface S3AccessPointOntapConfiguration {
  VolumeId?: string | undefined;
  FileSystemIdentity?: OntapFileSystemIdentity | undefined;
}
export type S3AccessPointAlias = string;
export interface S3AccessPoint {
  ResourceARN?: string | undefined;
  Alias?: string | undefined;
  VpcConfiguration?: S3AccessPointVpcConfiguration | undefined;
}
export interface S3AccessPointAttachment {
  Lifecycle?: S3AccessPointAttachmentLifecycle | undefined;
  LifecycleTransitionReason?: LifecycleTransitionReason | undefined;
  CreationTime?: Date | undefined;
  Name?: string | undefined;
  Type?: S3AccessPointAttachmentType | undefined;
  OpenZFSConfiguration?: S3AccessPointOpenZFSConfiguration | undefined;
  OntapConfiguration?: S3AccessPointOntapConfiguration | undefined;
  S3AccessPoint?: S3AccessPoint | undefined;
}
export interface CreateAndAttachS3AccessPointResponse {
  S3AccessPointAttachment?:
    | (S3AccessPointAttachment & {
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
      })
    | undefined;
}
export interface CreateBackupRequest {
  FileSystemId?: string | undefined;
  ClientRequestToken?: string | undefined;
  Tags?: Tag[] | undefined;
  VolumeId?: string | undefined;
}
export interface CreateBackupResponse {
  Backup?:
    | (Backup & {
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
      })
    | undefined;
}
export type PeerAddresses = string[];
export type PeerClusterName = string;
export type AllowedSvmMode = "ALL" | "NONE" | "SPECIFIED" | (string & {});
export type AllowedSvmIds = string[];
export interface CreateClusterPeerRequest {
  ClientRequestToken?: string | undefined;
  FileSystemId?: string | undefined;
  PeerAddresses?: string[] | undefined;
  PassphraseSecretArn?: string | undefined;
  PeerClusterName?: string | undefined;
  AllowedSvmMode?: AllowedSvmMode | undefined;
  AllowedSvmIds?: string[] | undefined;
  Tags?: Tag[] | undefined;
}
export type ClusterPeerId = string;
export type ClusterPeerLifecycle = "CREATING" | "CREATED" | "DELETING" | "FAILED" | (string & {});
export type ClusterPeerStatus = string;
export type ClusterPeerAuthenticationState = string;
export type ClusterPeerAuthenticationInUse = string;
export interface ClusterPeerAuthenticationStatus {
  State?: string | undefined;
  InUse?: string | undefined;
}
export interface ClusterPeer {
  ResourceARN?: string | undefined;
  ClusterPeerId?: string | undefined;
  FileSystemId?: string | undefined;
  Lifecycle?: ClusterPeerLifecycle | undefined;
  LifecycleTransitionReason?: LifecycleTransitionReason | undefined;
  Tags?: Tag[] | undefined;
  PeerAddresses?: string[] | undefined;
  PeerClusterName?: string | undefined;
  PassphraseSecretArn?: string | undefined;
  AllowedSvmMode?: AllowedSvmMode | undefined;
  AllowedSvmIds?: string[] | undefined;
  Status?: string | undefined;
  UUID?: string | undefined;
  AuthenticationStatus?: ClusterPeerAuthenticationStatus | undefined;
}
export interface CreateClusterPeerResponse {
  ClusterPeer?: (ClusterPeer & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] }) | undefined;
}
export type Namespace = string;
export type BatchImportMetaDataOnCreate = boolean;
export type EventType = "NEW" | "CHANGED" | "DELETED" | (string & {});
export type EventTypes = EventType[];
export interface AutoImportPolicy {
  Events?: EventType[] | undefined;
}
export interface AutoExportPolicy {
  Events?: EventType[] | undefined;
}
export interface S3DataRepositoryConfiguration {
  AutoImportPolicy?: AutoImportPolicy | undefined;
  AutoExportPolicy?: AutoExportPolicy | undefined;
}
export interface CreateDataRepositoryAssociationRequest {
  FileSystemId?: string | undefined;
  FileSystemPath?: string | undefined;
  DataRepositoryPath?: string | undefined;
  BatchImportMetaDataOnCreate?: boolean | undefined;
  ImportedFileChunkSize?: number | undefined;
  S3?: S3DataRepositoryConfiguration | undefined;
  ClientRequestToken?: string | undefined;
  Tags?: Tag[] | undefined;
}
export type DataRepositoryAssociationId = string;
export type FileCacheId = string;
export type SubDirectoriesPaths = string[];
export type NfsVersion = "NFS3" | (string & {});
export type RepositoryDnsIps = string[];
export interface NFSDataRepositoryConfiguration {
  Version?: NfsVersion | undefined;
  DnsIps?: string[] | undefined;
  AutoExportPolicy?: AutoExportPolicy | undefined;
}
export interface DataRepositoryAssociation {
  AssociationId?: string | undefined;
  ResourceARN?: string | undefined;
  FileSystemId?: string | undefined;
  Lifecycle?: DataRepositoryLifecycle | undefined;
  FailureDetails?: DataRepositoryFailureDetails | undefined;
  FileSystemPath?: string | undefined;
  DataRepositoryPath?: string | undefined;
  BatchImportMetaDataOnCreate?: boolean | undefined;
  ImportedFileChunkSize?: number | undefined;
  S3?: S3DataRepositoryConfiguration | undefined;
  Tags?: Tag[] | undefined;
  CreationTime?: Date | undefined;
  FileCacheId?: string | undefined;
  FileCachePath?: string | undefined;
  DataRepositorySubdirectories?: string[] | undefined;
  NFS?: NFSDataRepositoryConfiguration | undefined;
}
export interface CreateDataRepositoryAssociationResponse {
  Association?:
    | (DataRepositoryAssociation & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        NFS: NFSDataRepositoryConfiguration & { Version: NfsVersion };
      })
    | undefined;
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
  Enabled?: boolean | undefined;
  Path?: string | undefined;
  Format?: ReportFormat | undefined;
  Scope?: ReportScope | undefined;
}
export type CapacityToRelease = number;
export type Unit = "DAYS" | (string & {});
export type Value = number;
export interface DurationSinceLastAccess {
  Unit?: Unit | undefined;
  Value?: number | undefined;
}
export interface ReleaseConfiguration {
  DurationSinceLastAccess?: DurationSinceLastAccess | undefined;
}
export interface CreateDataRepositoryTaskRequest {
  Type?: DataRepositoryTaskType | undefined;
  Paths?: string[] | undefined;
  FileSystemId?: string | undefined;
  Report?: CompletionReport | undefined;
  ClientRequestToken?: string | undefined;
  Tags?: Tag[] | undefined;
  CapacityToRelease?: number | undefined;
  ReleaseConfiguration?: ReleaseConfiguration | undefined;
}
export type StartTime = Date;
export type EndTime = Date;
export interface DataRepositoryTaskFailureDetails {
  Message?: string | undefined;
}
export type TotalCount = number;
export type SucceededCount = number;
export type FailedCount = number;
export type LastUpdatedTime = Date;
export type ReleasedCapacity = number;
export interface DataRepositoryTaskStatus {
  TotalCount?: number | undefined;
  SucceededCount?: number | undefined;
  FailedCount?: number | undefined;
  LastUpdatedTime?: Date | undefined;
  ReleasedCapacity?: number | undefined;
}
export interface DataRepositoryTask {
  TaskId?: string | undefined;
  Lifecycle?: DataRepositoryTaskLifecycle | undefined;
  Type?: DataRepositoryTaskType | undefined;
  CreationTime?: Date | undefined;
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
  ResourceARN?: string | undefined;
  Tags?: Tag[] | undefined;
  FileSystemId?: string | undefined;
  Paths?: string[] | undefined;
  FailureDetails?: DataRepositoryTaskFailureDetails | undefined;
  Status?: DataRepositoryTaskStatus | undefined;
  Report?: CompletionReport | undefined;
  CapacityToRelease?: number | undefined;
  FileCacheId?: string | undefined;
  ReleaseConfiguration?: ReleaseConfiguration | undefined;
}
export interface CreateDataRepositoryTaskResponse {
  DataRepositoryTask?:
    | (DataRepositoryTask & {
        TaskId: TaskId;
        Lifecycle: DataRepositoryTaskLifecycle;
        Type: DataRepositoryTaskType;
        CreationTime: CreationTime;
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        Report: CompletionReport & { Enabled: Flag };
      })
    | undefined;
}
export type FileCacheType = "LUSTRE" | (string & {});
export type SecurityGroupId = string;
export type SecurityGroupIds = string[];
export type CopyTagsToDataRepositoryAssociations = boolean;
export type FileCacheLustreDeploymentType = "CACHE_1" | (string & {});
export type MetadataStorageCapacity = number;
export interface FileCacheLustreMetadataConfiguration {
  StorageCapacity?: number | undefined;
}
export interface CreateFileCacheLustreConfiguration {
  PerUnitStorageThroughput?: number | undefined;
  DeploymentType?: FileCacheLustreDeploymentType | undefined;
  WeeklyMaintenanceStartTime?: string | undefined;
  MetadataConfiguration?: FileCacheLustreMetadataConfiguration | undefined;
}
export interface FileCacheNFSConfiguration {
  Version?: NfsVersion | undefined;
  DnsIps?: string[] | undefined;
}
export interface FileCacheDataRepositoryAssociation {
  FileCachePath?: string | undefined;
  DataRepositoryPath?: string | undefined;
  DataRepositorySubdirectories?: string[] | undefined;
  NFS?: FileCacheNFSConfiguration | undefined;
}
export type CreateFileCacheDataRepositoryAssociations = FileCacheDataRepositoryAssociation[];
export interface CreateFileCacheRequest {
  ClientRequestToken?: string | undefined;
  FileCacheType?: FileCacheType | undefined;
  FileCacheTypeVersion?: string | undefined;
  StorageCapacity?: number | undefined;
  SubnetIds?: string[] | undefined;
  SecurityGroupIds?: string[] | undefined;
  Tags?: Tag[] | undefined;
  CopyTagsToDataRepositoryAssociations?: boolean | undefined;
  KmsKeyId?: string | undefined;
  LustreConfiguration?: CreateFileCacheLustreConfiguration | undefined;
  DataRepositoryAssociations?: FileCacheDataRepositoryAssociation[] | undefined;
}
export type FileCacheLifecycle =
  | "AVAILABLE"
  | "CREATING"
  | "DELETING"
  | "UPDATING"
  | "FAILED"
  | (string & {});
export interface FileCacheFailureDetails {
  Message?: string | undefined;
}
export interface FileCacheLustreConfiguration {
  PerUnitStorageThroughput?: number | undefined;
  DeploymentType?: FileCacheLustreDeploymentType | undefined;
  MountName?: string | undefined;
  WeeklyMaintenanceStartTime?: string | undefined;
  MetadataConfiguration?: FileCacheLustreMetadataConfiguration | undefined;
  LogConfiguration?: LustreLogConfiguration | undefined;
}
export type DataRepositoryAssociationIds = string[];
export interface FileCacheCreating {
  OwnerId?: string | undefined;
  CreationTime?: Date | undefined;
  FileCacheId?: string | undefined;
  FileCacheType?: FileCacheType | undefined;
  FileCacheTypeVersion?: string | undefined;
  Lifecycle?: FileCacheLifecycle | undefined;
  FailureDetails?: FileCacheFailureDetails | undefined;
  StorageCapacity?: number | undefined;
  VpcId?: string | undefined;
  SubnetIds?: string[] | undefined;
  NetworkInterfaceIds?: string[] | undefined;
  DNSName?: string | undefined;
  KmsKeyId?: string | undefined;
  ResourceARN?: string | undefined;
  Tags?: Tag[] | undefined;
  CopyTagsToDataRepositoryAssociations?: boolean | undefined;
  LustreConfiguration?: FileCacheLustreConfiguration | undefined;
  DataRepositoryAssociationIds?: string[] | undefined;
}
export interface CreateFileCacheResponse {
  FileCache?:
    | (FileCacheCreating & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        LustreConfiguration: FileCacheLustreConfiguration & {
          MetadataConfiguration: FileCacheLustreMetadataConfiguration & {
            StorageCapacity: MetadataStorageCapacity;
          };
          LogConfiguration: LustreLogConfiguration & { Level: LustreAccessAuditLogLevel };
        };
      })
    | undefined;
}
export type DirectoryPassword = string | redacted.Redacted<string>;
export interface SelfManagedActiveDirectoryConfiguration {
  DomainName?: string | undefined;
  OrganizationalUnitDistinguishedName?: string | undefined;
  FileSystemAdministratorsGroup?: string | undefined;
  UserName?: string | undefined;
  Password?: string | redacted.Redacted<string> | undefined;
  DnsIps?: string[] | undefined;
  DomainJoinServiceAccountSecret?: string | undefined;
}
export interface WindowsAuditLogCreateConfiguration {
  FileAccessAuditLogLevel?: WindowsAccessAuditLogLevel | undefined;
  FileShareAccessAuditLogLevel?: WindowsAccessAuditLogLevel | undefined;
  AuditLogDestination?: string | undefined;
}
export interface CreateFileSystemWindowsConfiguration {
  ActiveDirectoryId?: string | undefined;
  SelfManagedActiveDirectoryConfiguration?: SelfManagedActiveDirectoryConfiguration | undefined;
  DeploymentType?: WindowsDeploymentType | undefined;
  PreferredSubnetId?: string | undefined;
  ThroughputCapacity?: number | undefined;
  WeeklyMaintenanceStartTime?: string | undefined;
  DailyAutomaticBackupStartTime?: string | undefined;
  AutomaticBackupRetentionDays?: number | undefined;
  CopyTagsToBackups?: boolean | undefined;
  Aliases?: string[] | undefined;
  AuditLogConfiguration?: WindowsAuditLogCreateConfiguration | undefined;
  DiskIopsConfiguration?: DiskIopsConfiguration | undefined;
  FsrmConfiguration?: WindowsFsrmConfiguration | undefined;
}
export interface LustreLogCreateConfiguration {
  Level?: LustreAccessAuditLogLevel | undefined;
  Destination?: string | undefined;
}
export interface CreateFileSystemLustreMetadataConfiguration {
  Iops?: number | undefined;
  Mode?: MetadataConfigurationMode | undefined;
}
export interface CreateFileSystemLustreConfiguration {
  WeeklyMaintenanceStartTime?: string | undefined;
  ImportPath?: string | undefined;
  ExportPath?: string | undefined;
  ImportedFileChunkSize?: number | undefined;
  DeploymentType?: LustreDeploymentType | undefined;
  AutoImportPolicy?: AutoImportPolicyType | undefined;
  PerUnitStorageThroughput?: number | undefined;
  DailyAutomaticBackupStartTime?: string | undefined;
  AutomaticBackupRetentionDays?: number | undefined;
  CopyTagsToBackups?: boolean | undefined;
  DriveCacheType?: DriveCacheType | undefined;
  DataCompressionType?: DataCompressionType | undefined;
  EfaEnabled?: boolean | undefined;
  LogConfiguration?: LustreLogCreateConfiguration | undefined;
  RootSquashConfiguration?: LustreRootSquashConfiguration | undefined;
  MetadataConfiguration?: CreateFileSystemLustreMetadataConfiguration | undefined;
  ThroughputCapacity?: number | undefined;
  DataReadCacheConfiguration?: LustreReadCacheConfiguration | undefined;
}
export interface CreateFileSystemOntapConfiguration {
  AutomaticBackupRetentionDays?: number | undefined;
  DailyAutomaticBackupStartTime?: string | undefined;
  DeploymentType?: OntapDeploymentType | undefined;
  EndpointIpAddressRange?: string | undefined;
  FsxAdminPassword?: string | redacted.Redacted<string> | undefined;
  DiskIopsConfiguration?: DiskIopsConfiguration | undefined;
  PreferredSubnetId?: string | undefined;
  RouteTableIds?: string[] | undefined;
  ThroughputCapacity?: number | undefined;
  WeeklyMaintenanceStartTime?: string | undefined;
  HAPairs?: number | undefined;
  ThroughputCapacityPerHAPair?: number | undefined;
  EndpointIpv6AddressRange?: string | undefined;
}
export interface OpenZFSCreateRootVolumeConfiguration {
  RecordSizeKiB?: number | undefined;
  DataCompressionType?: OpenZFSDataCompressionType | undefined;
  NfsExports?: OpenZFSNfsExport[] | undefined;
  UserAndGroupQuotas?: OpenZFSUserOrGroupQuota[] | undefined;
  CopyTagsToSnapshots?: boolean | undefined;
  ReadOnly?: boolean | undefined;
}
export interface CreateFileSystemOpenZFSConfiguration {
  AutomaticBackupRetentionDays?: number | undefined;
  CopyTagsToBackups?: boolean | undefined;
  CopyTagsToVolumes?: boolean | undefined;
  DailyAutomaticBackupStartTime?: string | undefined;
  DeploymentType?: OpenZFSDeploymentType | undefined;
  ThroughputCapacity?: number | undefined;
  WeeklyMaintenanceStartTime?: string | undefined;
  DiskIopsConfiguration?: DiskIopsConfiguration | undefined;
  RootVolumeConfiguration?: OpenZFSCreateRootVolumeConfiguration | undefined;
  PreferredSubnetId?: string | undefined;
  EndpointIpAddressRange?: string | undefined;
  EndpointIpv6AddressRange?: string | undefined;
  RouteTableIds?: string[] | undefined;
  ReadCacheConfiguration?: OpenZFSReadCacheConfiguration | undefined;
}
export interface CreateFileSystemRequest {
  ClientRequestToken?: string | undefined;
  FileSystemType?: FileSystemType | undefined;
  StorageCapacity?: number | undefined;
  StorageType?: StorageType | undefined;
  SubnetIds?: string[] | undefined;
  SecurityGroupIds?: string[] | undefined;
  Tags?: Tag[] | undefined;
  KmsKeyId?: string | undefined;
  WindowsConfiguration?: CreateFileSystemWindowsConfiguration | undefined;
  LustreConfiguration?: CreateFileSystemLustreConfiguration | undefined;
  OntapConfiguration?: CreateFileSystemOntapConfiguration | undefined;
  FileSystemTypeVersion?: string | undefined;
  OpenZFSConfiguration?: CreateFileSystemOpenZFSConfiguration | undefined;
  NetworkType?: NetworkType | undefined;
}
export interface CreateFileSystemResponse {
  FileSystem?:
    | (FileSystem & {
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
      })
    | undefined;
}
export interface CreateFileSystemFromBackupRequest {
  BackupId?: string | undefined;
  ClientRequestToken?: string | undefined;
  SubnetIds?: string[] | undefined;
  SecurityGroupIds?: string[] | undefined;
  Tags?: Tag[] | undefined;
  WindowsConfiguration?: CreateFileSystemWindowsConfiguration | undefined;
  LustreConfiguration?: CreateFileSystemLustreConfiguration | undefined;
  StorageType?: StorageType | undefined;
  KmsKeyId?: string | undefined;
  FileSystemTypeVersion?: string | undefined;
  OpenZFSConfiguration?: CreateFileSystemOpenZFSConfiguration | undefined;
  StorageCapacity?: number | undefined;
  NetworkType?: NetworkType | undefined;
}
export interface CreateFileSystemFromBackupResponse {
  FileSystem?:
    | (FileSystem & {
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
      })
    | undefined;
}
export type SnapmirrorPolicyName = string;
export type SnapmirrorPolicySnapshotCopyMode =
  | "COPY_ALL_SOURCE_SNAPSHOTS"
  | "COPY_LATEST_SOURCE_SNAPSHOT"
  | "NO_CREATE_SNAPSHOT_ON_SOURCE"
  | (string & {});
export type SnapmirrorPolicyRetentionCount = number;
export type SnapmirrorPolicyCreationScheduleName = string;
export interface SnapmirrorPolicyRetentionRule {
  Label?: string | undefined;
  Count?: number | undefined;
  CreationSchedule?: string | undefined;
}
export type SnapmirrorPolicyRetentionRules = SnapmirrorPolicyRetentionRule[];
export type SnapmirrorTransferScheduleName = string;
export type ThrottleInKbps = number;
export interface CreateSnapmirrorPolicyRequest {
  ClientRequestToken?: string | undefined;
  FileSystemId?: string | undefined;
  StorageVirtualMachineId?: string | undefined;
  Name?: string | undefined;
  SnapshotCopyMode?: SnapmirrorPolicySnapshotCopyMode | undefined;
  RetentionRules?: SnapmirrorPolicyRetentionRule[] | undefined;
  TransferSchedule?: string | undefined;
  NetworkCompressionEnabled?: boolean | undefined;
  ThrottleInKbps?: number | undefined;
  Tags?: Tag[] | undefined;
}
export type SnapmirrorPolicyId = string;
export type SnapmirrorPolicyScope = "FILESYSTEM" | "SVM" | (string & {});
export type SnapmirrorPolicyLifecycle =
  | "CREATING"
  | "CREATED"
  | "DELETING"
  | "FAILED"
  | (string & {});
export interface SnapmirrorPolicy {
  ResourceARN?: string | undefined;
  SnapmirrorPolicyId?: string | undefined;
  FileSystemId?: string | undefined;
  StorageVirtualMachineId?: string | undefined;
  Name?: string | undefined;
  SnapshotCopyMode?: SnapmirrorPolicySnapshotCopyMode | undefined;
  RetentionRules?: SnapmirrorPolicyRetentionRule[] | undefined;
  TransferSchedule?: string | undefined;
  NetworkCompressionEnabled?: boolean | undefined;
  ThrottleInKbps?: number | undefined;
  Scope?: SnapmirrorPolicyScope | undefined;
  Lifecycle?: SnapmirrorPolicyLifecycle | undefined;
  UUID?: string | undefined;
  LifecycleTransitionReason?: LifecycleTransitionReason | undefined;
  Tags?: Tag[] | undefined;
}
export interface CreateSnapmirrorPolicyResponse {
  SnapmirrorPolicy?:
    | (SnapmirrorPolicy & {
        RetentionRules: (SnapmirrorPolicyRetentionRule & {
          Label: SnapmirrorLabel;
          Count: SnapmirrorPolicyRetentionCount;
        })[];
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      })
    | undefined;
}
export type SnapmirrorPath = string;
export interface CreateSnapmirrorSource {
  Path?: string | undefined;
}
export interface CreateSnapmirrorDestination {
  VolumeId?: string | undefined;
}
export interface CreateSnapmirrorRelationshipRequest {
  ClientRequestToken?: string | undefined;
  Source?: CreateSnapmirrorSource | undefined;
  Destination?: CreateSnapmirrorDestination | undefined;
  PolicyId?: string | undefined;
  TransferSchedule?: string | undefined;
  ThrottleInKbps?: number | undefined;
  Tags?: Tag[] | undefined;
}
export type SnapmirrorRelationshipId = string;
export type SnapmirrorRelationshipLifecycle =
  | "CREATING"
  | "CREATED"
  | "DELETING"
  | "FAILED"
  | (string & {});
export interface SnapmirrorSource {
  Path?: string | undefined;
}
export interface SnapmirrorDestination {
  Path?: string | undefined;
  VolumeId?: string | undefined;
}
export interface SnapmirrorRelationshipPolicy {
  PolicyId?: string | undefined;
  PolicyName?: string | undefined;
}
export type SnapmirrorRelationshipState =
  | "UNINITIALIZED"
  | "TRANSFERRING"
  | "SNAPMIRRORED"
  | "PAUSED"
  | "BROKEN_OFF"
  | (string & {});
export type SnapmirrorHealthy = boolean;
export type SnapmirrorUnhealthyReason = string;
export type LagTimeInMinutes = number;
export type SnapmirrorExportedSnapshotName = string;
export interface SnapmirrorExportedSnapshot {
  SnapshotId?: string | undefined;
  SnapshotName?: string | undefined;
}
export type SnapmirrorTransferStatus = string;
export type SnapmirrorTransferType = string;
export type SnapmirrorTransferBytes = number;
export type SnapmirrorTransferDuration = string;
export interface SnapmirrorTransferState {
  State?: string | undefined;
  Type?: string | undefined;
  BytesTransferred?: number | undefined;
  Duration?: string | undefined;
  EndTime?: Date | undefined;
}
export interface SnapmirrorRelationship {
  ResourceARN?: string | undefined;
  SnapmirrorRelationshipId?: string | undefined;
  FileSystemId?: string | undefined;
  Lifecycle?: SnapmirrorRelationshipLifecycle | undefined;
  LifecycleTransitionReason?: LifecycleTransitionReason | undefined;
  Tags?: Tag[] | undefined;
  Source?: SnapmirrorSource | undefined;
  Destination?: SnapmirrorDestination | undefined;
  SnapmirrorPolicy?: SnapmirrorRelationshipPolicy | undefined;
  TransferSchedule?: string | undefined;
  ThrottleInKbps?: number | undefined;
  State?: SnapmirrorRelationshipState | undefined;
  Healthy?: boolean | undefined;
  UnhealthyReason?: string | undefined;
  LagTimeInMinutes?: number | undefined;
  ExportedSnapshot?: SnapmirrorExportedSnapshot | undefined;
  TransferState?: SnapmirrorTransferState | undefined;
  UUID?: string | undefined;
}
export interface CreateSnapmirrorRelationshipResponse {
  SnapmirrorRelationship?:
    | (SnapmirrorRelationship & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] })
    | undefined;
}
export interface CreateOntapSnapshotConfiguration {
  SnapmirrorLabel?: string | undefined;
  ExpiryTime?: Date | undefined;
  SnaplockExpiryTime?: Date | undefined;
}
export interface CreateSnapshotRequest {
  ClientRequestToken?: string | undefined;
  Name?: string | undefined;
  VolumeId?: string | undefined;
  Tags?: Tag[] | undefined;
  OntapConfiguration?: CreateOntapSnapshotConfiguration | undefined;
}
export interface CreateSnapshotResponse {
  Snapshot?:
    | (Snapshot & {
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
      })
    | undefined;
}
export type SnapshotPolicyScheduleName = string;
export type SnapshotPolicyScheduleCount = number;
export type SnapshotPolicySchedulePrefix = string;
export type SnapshotPolicyRetentionPeriodType =
  | "SECONDS"
  | "MINUTES"
  | "HOURS"
  | "DAYS"
  | "MONTHS"
  | "YEARS"
  | "INFINITE"
  | (string & {});
export type SnapshotPolicyRetentionPeriodValue = number;
export interface SnapshotPolicyRetentionPeriod {
  Type?: SnapshotPolicyRetentionPeriodType | undefined;
  Value?: number | undefined;
}
export interface SnapshotPolicySchedule {
  Name?: string | undefined;
  Count?: number | undefined;
  Prefix?: string | undefined;
  SnapmirrorLabel?: string | undefined;
  RetentionPeriod?: SnapshotPolicyRetentionPeriod | undefined;
}
export type SnapshotPolicyScheduleList = SnapshotPolicySchedule[];
export interface CreateSnapshotPolicyRequest {
  ClientRequestToken?: string | undefined;
  FileSystemId?: string | undefined;
  StorageVirtualMachineId?: string | undefined;
  Name?: string | undefined;
  Enabled?: boolean | undefined;
  Schedules?: SnapshotPolicySchedule[] | undefined;
  Tags?: Tag[] | undefined;
}
export type SnapshotPolicyId = string;
export type SnapshotPolicyScope = "FILESYSTEM" | "SVM" | (string & {});
export type SnapshotPolicyLifecycle =
  | "CREATING"
  | "CREATED"
  | "DELETING"
  | "FAILED"
  | (string & {});
export interface SnapshotPolicy {
  ResourceARN?: string | undefined;
  SnapshotPolicyId?: string | undefined;
  FileSystemId?: string | undefined;
  StorageVirtualMachineId?: string | undefined;
  Name?: string | undefined;
  Enabled?: boolean | undefined;
  Schedules?: SnapshotPolicySchedule[] | undefined;
  Scope?: SnapshotPolicyScope | undefined;
  Lifecycle?: SnapshotPolicyLifecycle | undefined;
  UUID?: string | undefined;
  LifecycleTransitionReason?: LifecycleTransitionReason | undefined;
  Tags?: Tag[] | undefined;
}
export interface CreateSnapshotPolicyResponse {
  SnapshotPolicy?:
    | (SnapshotPolicy & {
        Schedules: (SnapshotPolicySchedule & {
          Name: SnapshotPolicyScheduleName;
          Count: SnapshotPolicyScheduleCount;
          RetentionPeriod: SnapshotPolicyRetentionPeriod & {
            Type: SnapshotPolicyRetentionPeriodType;
          };
        })[];
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      })
    | undefined;
}
export type NetBiosAlias = string;
export interface CreateSvmActiveDirectoryConfiguration {
  NetBiosName?: string | undefined;
  SelfManagedActiveDirectoryConfiguration?: SelfManagedActiveDirectoryConfiguration | undefined;
}
export type StorageVirtualMachineName = string;
export type StorageVirtualMachineRootVolumeSecurityStyle =
  | "UNIX"
  | "NTFS"
  | "MIXED"
  | (string & {});
export interface CreateStorageVirtualMachineRequest {
  ActiveDirectoryConfiguration?: CreateSvmActiveDirectoryConfiguration | undefined;
  ClientRequestToken?: string | undefined;
  FileSystemId?: string | undefined;
  Name?: string | undefined;
  SvmAdminPassword?: string | redacted.Redacted<string> | undefined;
  Tags?: Tag[] | undefined;
  RootVolumeSecurityStyle?: StorageVirtualMachineRootVolumeSecurityStyle | undefined;
}
export interface SvmActiveDirectoryConfiguration {
  NetBiosName?: string | undefined;
  SelfManagedActiveDirectoryConfiguration?: SelfManagedActiveDirectoryAttributes | undefined;
}
export interface SvmEndpoint {
  DNSName?: string | undefined;
  IpAddresses?: string[] | undefined;
  Ipv6Addresses?: string[] | undefined;
}
export interface SvmEndpoints {
  Iscsi?: SvmEndpoint | undefined;
  Management?: SvmEndpoint | undefined;
  Nfs?: SvmEndpoint | undefined;
  Smb?: SvmEndpoint | undefined;
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
  ActiveDirectoryConfiguration?: SvmActiveDirectoryConfiguration | undefined;
  CreationTime?: Date | undefined;
  Endpoints?: SvmEndpoints | undefined;
  FileSystemId?: string | undefined;
  Lifecycle?: StorageVirtualMachineLifecycle | undefined;
  Name?: string | undefined;
  ResourceARN?: string | undefined;
  StorageVirtualMachineId?: string | undefined;
  Subtype?: StorageVirtualMachineSubtype | undefined;
  UUID?: string | undefined;
  Tags?: Tag[] | undefined;
  LifecycleTransitionReason?: LifecycleTransitionReason | undefined;
  RootVolumeSecurityStyle?: StorageVirtualMachineRootVolumeSecurityStyle | undefined;
}
export interface CreateStorageVirtualMachineResponse {
  StorageVirtualMachine?:
    | (StorageVirtualMachine & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] })
    | undefined;
}
export type PeerSvmName = string;
export type StorageVirtualMachinePeerApplication =
  | "SNAPMIRROR"
  | "FILE_COPY"
  | "LUN_COPY"
  | "FLEXCACHE"
  | (string & {});
export type StorageVirtualMachinePeerApplications = StorageVirtualMachinePeerApplication[];
export type PeerSvmAlias = string;
export interface CreateStorageVirtualMachinePeerRequest {
  ClientRequestToken?: string | undefined;
  StorageVirtualMachineId?: string | undefined;
  PeerSvmName?: string | undefined;
  PeerClusterName?: string | undefined;
  Applications?: StorageVirtualMachinePeerApplication[] | undefined;
  PeerSvmAlias?: string | undefined;
  Tags?: Tag[] | undefined;
}
export type StorageVirtualMachinePeerId = string;
export type StorageVirtualMachinePeerLifecycle =
  | "CREATING"
  | "CREATED"
  | "DELETING"
  | "FAILED"
  | (string & {});
export type StorageVirtualMachinePeerState =
  | "PEERED"
  | "REJECTED"
  | "SUSPENDED"
  | "INITIATED"
  | "PENDING"
  | "INITIALIZING"
  | (string & {});
export interface StorageVirtualMachinePeer {
  ResourceARN?: string | undefined;
  StorageVirtualMachinePeerId?: string | undefined;
  StorageVirtualMachineId?: string | undefined;
  FileSystemId?: string | undefined;
  Lifecycle?: StorageVirtualMachinePeerLifecycle | undefined;
  LifecycleTransitionReason?: LifecycleTransitionReason | undefined;
  Tags?: Tag[] | undefined;
  PeerSvmName?: string | undefined;
  PeerSvmAlias?: string | undefined;
  PeerClusterName?: string | undefined;
  Applications?: StorageVirtualMachinePeerApplication[] | undefined;
  State?: StorageVirtualMachinePeerState | undefined;
  UUID?: string | undefined;
}
export interface CreateStorageVirtualMachinePeerResponse {
  StorageVirtualMachinePeer?:
    | (StorageVirtualMachinePeer & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] })
    | undefined;
}
export type InputOntapVolumeType = "RW" | "DP" | (string & {});
export interface CreateSnaplockConfiguration {
  AuditLogVolume?: boolean | undefined;
  AutocommitPeriod?: AutocommitPeriod | undefined;
  PrivilegedDelete?: PrivilegedDelete | undefined;
  RetentionPeriod?: SnaplockRetentionPeriod | undefined;
  SnaplockType?: SnaplockType | undefined;
  VolumeAppendModeEnabled?: boolean | undefined;
}
export type AggregateListMultiplier = number;
export interface CreateAggregateConfiguration {
  Aggregates?: string[] | undefined;
  ConstituentsPerAggregate?: number | undefined;
}
export interface CreateCloneConfiguration {
  ParentVolumeId?: string | undefined;
  SnapshotId?: string | undefined;
}
export interface CreateOntapVolumeConfiguration {
  JunctionPath?: string | undefined;
  SecurityStyle?: SecurityStyle | undefined;
  SizeInMegabytes?: number | undefined;
  StorageEfficiencyEnabled?: boolean | undefined;
  StorageVirtualMachineId?: string | undefined;
  TieringPolicy?: TieringPolicy | undefined;
  OntapVolumeType?: InputOntapVolumeType | undefined;
  SnapshotPolicy?: string | undefined;
  CopyTagsToBackups?: boolean | undefined;
  SnaplockConfiguration?: CreateSnaplockConfiguration | undefined;
  VolumeStyle?: VolumeStyle | undefined;
  AggregateConfiguration?: CreateAggregateConfiguration | undefined;
  SizeInBytes?: number | undefined;
  CloneConfiguration?: CreateCloneConfiguration | undefined;
}
export type IntegerNoMaxFromNegativeOne = number;
export interface CreateOpenZFSOriginSnapshotConfiguration {
  SnapshotARN?: string | undefined;
  CopyStrategy?: OpenZFSCopyStrategy | undefined;
}
export interface CreateOpenZFSVolumeConfiguration {
  ParentVolumeId?: string | undefined;
  StorageCapacityReservationGiB?: number | undefined;
  StorageCapacityQuotaGiB?: number | undefined;
  RecordSizeKiB?: number | undefined;
  DataCompressionType?: OpenZFSDataCompressionType | undefined;
  CopyTagsToSnapshots?: boolean | undefined;
  OriginSnapshot?: CreateOpenZFSOriginSnapshotConfiguration | undefined;
  ReadOnly?: boolean | undefined;
  NfsExports?: OpenZFSNfsExport[] | undefined;
  UserAndGroupQuotas?: OpenZFSUserOrGroupQuota[] | undefined;
}
export interface CreateVolumeRequest {
  ClientRequestToken?: string | undefined;
  VolumeType?: VolumeType | undefined;
  Name?: string | undefined;
  OntapConfiguration?: CreateOntapVolumeConfiguration | undefined;
  Tags?: Tag[] | undefined;
  OpenZFSConfiguration?: CreateOpenZFSVolumeConfiguration | undefined;
}
export interface CreateVolumeResponse {
  Volume?:
    | (Volume & {
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
      })
    | undefined;
}
export interface CreateVolumeFromBackupRequest {
  BackupId?: string | undefined;
  ClientRequestToken?: string | undefined;
  Name?: string | undefined;
  OntapConfiguration?: CreateOntapVolumeConfiguration | undefined;
  Tags?: Tag[] | undefined;
}
export interface CreateVolumeFromBackupResponse {
  Volume?:
    | (Volume & {
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
      })
    | undefined;
}
export interface DeleteBackupRequest {
  BackupId?: string | undefined;
  ClientRequestToken?: string | undefined;
}
export interface DeleteBackupResponse {
  BackupId?: string | undefined;
  Lifecycle?: BackupLifecycle | undefined;
}
export interface DeleteClusterPeerRequest {
  ClientRequestToken?: string | undefined;
  ClusterPeerId?: string | undefined;
}
export interface DeleteClusterPeerResponse {
  ClusterPeerId?: string | undefined;
  Lifecycle?: ClusterPeerLifecycle | undefined;
}
export type DeleteDataInFileSystem = boolean;
export interface DeleteDataRepositoryAssociationRequest {
  AssociationId?: string | undefined;
  ClientRequestToken?: string | undefined;
  DeleteDataInFileSystem?: boolean | undefined;
}
export interface DeleteDataRepositoryAssociationResponse {
  AssociationId?: string | undefined;
  Lifecycle?: DataRepositoryLifecycle | undefined;
  DeleteDataInFileSystem?: boolean | undefined;
}
export interface DeleteFileCacheRequest {
  FileCacheId?: string | undefined;
  ClientRequestToken?: string | undefined;
}
export interface DeleteFileCacheResponse {
  FileCacheId?: string | undefined;
  Lifecycle?: FileCacheLifecycle | undefined;
}
export interface DeleteFileSystemWindowsConfiguration {
  SkipFinalBackup?: boolean | undefined;
  FinalBackupTags?: Tag[] | undefined;
}
export interface DeleteFileSystemLustreConfiguration {
  SkipFinalBackup?: boolean | undefined;
  FinalBackupTags?: Tag[] | undefined;
}
export type DeleteFileSystemOpenZFSOption = "DELETE_CHILD_VOLUMES_AND_SNAPSHOTS" | (string & {});
export type DeleteFileSystemOpenZFSOptions = DeleteFileSystemOpenZFSOption[];
export interface DeleteFileSystemOpenZFSConfiguration {
  SkipFinalBackup?: boolean | undefined;
  FinalBackupTags?: Tag[] | undefined;
  Options?: DeleteFileSystemOpenZFSOption[] | undefined;
}
export interface DeleteFileSystemRequest {
  FileSystemId?: string | undefined;
  ClientRequestToken?: string | undefined;
  WindowsConfiguration?: DeleteFileSystemWindowsConfiguration | undefined;
  LustreConfiguration?: DeleteFileSystemLustreConfiguration | undefined;
  OpenZFSConfiguration?: DeleteFileSystemOpenZFSConfiguration | undefined;
}
export interface DeleteFileSystemWindowsResponse {
  FinalBackupId?: string | undefined;
  FinalBackupTags?: Tag[] | undefined;
}
export interface DeleteFileSystemLustreResponse {
  FinalBackupId?: string | undefined;
  FinalBackupTags?: Tag[] | undefined;
}
export interface DeleteFileSystemOpenZFSResponse {
  FinalBackupId?: string | undefined;
  FinalBackupTags?: Tag[] | undefined;
}
export interface DeleteFileSystemResponse {
  FileSystemId?: string | undefined;
  Lifecycle?: FileSystemLifecycle | undefined;
  WindowsResponse?:
    | (DeleteFileSystemWindowsResponse & {
        FinalBackupTags: (Tag & { Key: TagKey; Value: TagValue })[];
      })
    | undefined;
  LustreResponse?:
    | (DeleteFileSystemLustreResponse & {
        FinalBackupTags: (Tag & { Key: TagKey; Value: TagValue })[];
      })
    | undefined;
  OpenZFSResponse?:
    | (DeleteFileSystemOpenZFSResponse & {
        FinalBackupTags: (Tag & { Key: TagKey; Value: TagValue })[];
      })
    | undefined;
}
export interface DeleteSnapmirrorPolicyRequest {
  ClientRequestToken?: string | undefined;
  SnapmirrorPolicyId?: string | undefined;
}
export interface DeleteSnapmirrorPolicyResponse {
  SnapmirrorPolicyId?: string | undefined;
  Lifecycle?: SnapmirrorPolicyLifecycle | undefined;
}
export interface DeleteSnapmirrorRelationshipRequest {
  ClientRequestToken?: string | undefined;
  SnapmirrorRelationshipId?: string | undefined;
}
export interface DeleteSnapmirrorRelationshipResponse {
  SnapmirrorRelationshipId?: string | undefined;
  Lifecycle?: SnapmirrorRelationshipLifecycle | undefined;
}
export interface DeleteSnapshotRequest {
  ClientRequestToken?: string | undefined;
  SnapshotId?: string | undefined;
}
export interface DeleteSnapshotResponse {
  SnapshotId?: string | undefined;
  Lifecycle?: SnapshotLifecycle | undefined;
}
export interface DeleteSnapshotPolicyRequest {
  ClientRequestToken?: string | undefined;
  SnapshotPolicyId?: string | undefined;
}
export interface DeleteSnapshotPolicyResponse {
  SnapshotPolicyId?: string | undefined;
  Lifecycle?: SnapshotPolicyLifecycle | undefined;
}
export interface DeleteStorageVirtualMachineRequest {
  ClientRequestToken?: string | undefined;
  StorageVirtualMachineId?: string | undefined;
}
export interface DeleteStorageVirtualMachineResponse {
  StorageVirtualMachineId?: string | undefined;
  Lifecycle?: StorageVirtualMachineLifecycle | undefined;
}
export interface DeleteStorageVirtualMachinePeerRequest {
  ClientRequestToken?: string | undefined;
  StorageVirtualMachinePeerId?: string | undefined;
}
export interface DeleteStorageVirtualMachinePeerResponse {
  StorageVirtualMachinePeerId?: string | undefined;
  Lifecycle?: StorageVirtualMachinePeerLifecycle | undefined;
}
export interface DeleteVolumeOntapConfiguration {
  SkipFinalBackup?: boolean | undefined;
  FinalBackupTags?: Tag[] | undefined;
  BypassSnaplockEnterpriseRetention?: boolean | undefined;
}
export type DeleteOpenZFSVolumeOption = "DELETE_CHILD_VOLUMES_AND_SNAPSHOTS" | (string & {});
export type DeleteOpenZFSVolumeOptions = DeleteOpenZFSVolumeOption[];
export interface DeleteVolumeOpenZFSConfiguration {
  Options?: DeleteOpenZFSVolumeOption[] | undefined;
}
export interface DeleteVolumeRequest {
  ClientRequestToken?: string | undefined;
  VolumeId?: string | undefined;
  OntapConfiguration?: DeleteVolumeOntapConfiguration | undefined;
  OpenZFSConfiguration?: DeleteVolumeOpenZFSConfiguration | undefined;
}
export interface DeleteVolumeOntapResponse {
  FinalBackupId?: string | undefined;
  FinalBackupTags?: Tag[] | undefined;
}
export interface DeleteVolumeResponse {
  VolumeId?: string | undefined;
  Lifecycle?: VolumeLifecycle | undefined;
  OntapResponse?:
    | (DeleteVolumeOntapResponse & { FinalBackupTags: (Tag & { Key: TagKey; Value: TagValue })[] })
    | undefined;
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
  Name?: FilterName | undefined;
  Values?: string[] | undefined;
}
export type Filters = Filter[];
export type MaxResults = number;
export type NextToken = string;
export interface DescribeBackupsRequest {
  BackupIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type Backups = Backup[];
export interface DescribeBackupsResponse {
  Backups?:
    | (Backup & {
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
      })[]
    | undefined;
  NextToken?: string | undefined;
}
export type ClusterPeerIds = string[];
export type ClusterPeerFilterName = "file-system-id" | (string & {});
export type ClusterPeerFilterValue = string;
export type ClusterPeerFilterValues = string[];
export interface ClusterPeerFilter {
  Name?: ClusterPeerFilterName | undefined;
  Values?: string[] | undefined;
}
export type ClusterPeerFilters = ClusterPeerFilter[];
export interface DescribeClusterPeersRequest {
  ClusterPeerIds?: string[] | undefined;
  Filters?: ClusterPeerFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type ClusterPeers = ClusterPeer[];
export interface DescribeClusterPeersResponse {
  ClusterPeers?: (ClusterPeer & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] })[] | undefined;
  NextToken?: string | undefined;
}
export type LimitedMaxResults = number;
export interface DescribeDataRepositoryAssociationsRequest {
  AssociationIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type DataRepositoryAssociations = DataRepositoryAssociation[];
export interface DescribeDataRepositoryAssociationsResponse {
  Associations?:
    | (DataRepositoryAssociation & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        NFS: NFSDataRepositoryConfiguration & { Version: NfsVersion };
      })[]
    | undefined;
  NextToken?: string | undefined;
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
  Name?: DataRepositoryTaskFilterName | undefined;
  Values?: string[] | undefined;
}
export type DataRepositoryTaskFilters = DataRepositoryTaskFilter[];
export interface DescribeDataRepositoryTasksRequest {
  TaskIds?: string[] | undefined;
  Filters?: DataRepositoryTaskFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type DataRepositoryTasks = DataRepositoryTask[];
export interface DescribeDataRepositoryTasksResponse {
  DataRepositoryTasks?:
    | (DataRepositoryTask & {
        TaskId: TaskId;
        Lifecycle: DataRepositoryTaskLifecycle;
        Type: DataRepositoryTaskType;
        CreationTime: CreationTime;
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        Report: CompletionReport & { Enabled: Flag };
      })[]
    | undefined;
  NextToken?: string | undefined;
}
export type FileCacheIds = string[];
export interface DescribeFileCachesRequest {
  FileCacheIds?: string[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface FileCache {
  OwnerId?: string | undefined;
  CreationTime?: Date | undefined;
  FileCacheId?: string | undefined;
  FileCacheType?: FileCacheType | undefined;
  FileCacheTypeVersion?: string | undefined;
  Lifecycle?: FileCacheLifecycle | undefined;
  FailureDetails?: FileCacheFailureDetails | undefined;
  StorageCapacity?: number | undefined;
  VpcId?: string | undefined;
  SubnetIds?: string[] | undefined;
  NetworkInterfaceIds?: string[] | undefined;
  DNSName?: string | undefined;
  KmsKeyId?: string | undefined;
  ResourceARN?: string | undefined;
  LustreConfiguration?: FileCacheLustreConfiguration | undefined;
  DataRepositoryAssociationIds?: string[] | undefined;
}
export type FileCaches = FileCache[];
export interface DescribeFileCachesResponse {
  FileCaches?:
    | (FileCache & {
        LustreConfiguration: FileCacheLustreConfiguration & {
          MetadataConfiguration: FileCacheLustreMetadataConfiguration & {
            StorageCapacity: MetadataStorageCapacity;
          };
          LogConfiguration: LustreLogConfiguration & { Level: LustreAccessAuditLogLevel };
        };
      })[]
    | undefined;
  NextToken?: string | undefined;
}
export interface DescribeFileSystemAliasesRequest {
  ClientRequestToken?: string | undefined;
  FileSystemId?: string | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface DescribeFileSystemAliasesResponse {
  Aliases?: Alias[] | undefined;
  NextToken?: string | undefined;
}
export type FileSystemIds = string[];
export interface DescribeFileSystemsRequest {
  FileSystemIds?: string[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type FileSystems = FileSystem[];
export interface DescribeFileSystemsResponse {
  FileSystems?:
    | (FileSystem & {
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
      })[]
    | undefined;
  NextToken?: string | undefined;
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
  Name?: S3AccessPointAttachmentsFilterName | undefined;
  Values?: string[] | undefined;
}
export type S3AccessPointAttachmentsFilters = S3AccessPointAttachmentsFilter[];
export interface DescribeS3AccessPointAttachmentsRequest {
  Names?: string[] | undefined;
  Filters?: S3AccessPointAttachmentsFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type S3AccessPointAttachments = S3AccessPointAttachment[];
export interface DescribeS3AccessPointAttachmentsResponse {
  S3AccessPointAttachments?:
    | (S3AccessPointAttachment & {
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
      })[]
    | undefined;
  NextToken?: string | undefined;
}
export interface DescribeSharedVpcConfigurationRequest {}
export type VerboseFlag = string;
export interface DescribeSharedVpcConfigurationResponse {
  EnableFsxRouteTableUpdatesFromParticipantAccounts?: string | undefined;
}
export type SnapmirrorPolicyIds = string[];
export type SnapmirrorPolicyFilterName =
  | "file-system-id"
  | "storage-virtual-machine-id"
  | (string & {});
export type SnapmirrorPolicyFilterValue = string;
export type SnapmirrorPolicyFilterValues = string[];
export interface SnapmirrorPolicyFilter {
  Name?: SnapmirrorPolicyFilterName | undefined;
  Values?: string[] | undefined;
}
export type SnapmirrorPolicyFilters = SnapmirrorPolicyFilter[];
export interface DescribeSnapmirrorPoliciesRequest {
  SnapmirrorPolicyIds?: string[] | undefined;
  Filters?: SnapmirrorPolicyFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type SnapmirrorPolicies = SnapmirrorPolicy[];
export interface DescribeSnapmirrorPoliciesResponse {
  SnapmirrorPolicies?:
    | (SnapmirrorPolicy & {
        RetentionRules: (SnapmirrorPolicyRetentionRule & {
          Label: SnapmirrorLabel;
          Count: SnapmirrorPolicyRetentionCount;
        })[];
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      })[]
    | undefined;
  NextToken?: string | undefined;
}
export type SnapmirrorRelationshipIds = string[];
export type SnapmirrorRelationshipFilterName =
  | "file-system-id"
  | "destination-volume-id"
  | (string & {});
export type SnapmirrorRelationshipFilterValue = string;
export type SnapmirrorRelationshipFilterValues = string[];
export interface SnapmirrorRelationshipFilter {
  Name?: SnapmirrorRelationshipFilterName | undefined;
  Values?: string[] | undefined;
}
export type SnapmirrorRelationshipFilters = SnapmirrorRelationshipFilter[];
export interface DescribeSnapmirrorRelationshipsRequest {
  SnapmirrorRelationshipIds?: string[] | undefined;
  Filters?: SnapmirrorRelationshipFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type SnapmirrorRelationships = SnapmirrorRelationship[];
export interface DescribeSnapmirrorRelationshipsResponse {
  SnapmirrorRelationships?:
    | (SnapmirrorRelationship & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] })[]
    | undefined;
  NextToken?: string | undefined;
}
export type SnapshotPolicyIds = string[];
export type SnapshotPolicyFilterName =
  | "file-system-id"
  | "storage-virtual-machine-id"
  | (string & {});
export type SnapshotPolicyFilterValue = string;
export type SnapshotPolicyFilterValues = string[];
export interface SnapshotPolicyFilter {
  Name?: SnapshotPolicyFilterName | undefined;
  Values?: string[] | undefined;
}
export type SnapshotPolicyFilters = SnapshotPolicyFilter[];
export interface DescribeSnapshotPoliciesRequest {
  SnapshotPolicyIds?: string[] | undefined;
  Filters?: SnapshotPolicyFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type SnapshotPolicies = SnapshotPolicy[];
export interface DescribeSnapshotPoliciesResponse {
  SnapshotPolicies?:
    | (SnapshotPolicy & {
        Schedules: (SnapshotPolicySchedule & {
          Name: SnapshotPolicyScheduleName;
          Count: SnapshotPolicyScheduleCount;
          RetentionPeriod: SnapshotPolicyRetentionPeriod & {
            Type: SnapshotPolicyRetentionPeriodType;
          };
        })[];
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      })[]
    | undefined;
  NextToken?: string | undefined;
}
export type SnapshotIds = string[];
export type SnapshotFilterName = "file-system-id" | "volume-id" | (string & {});
export type SnapshotFilterValue = string;
export type SnapshotFilterValues = string[];
export interface SnapshotFilter {
  Name?: SnapshotFilterName | undefined;
  Values?: string[] | undefined;
}
export type SnapshotFilters = SnapshotFilter[];
export type IncludeShared = boolean;
export interface DescribeSnapshotsRequest {
  SnapshotIds?: string[] | undefined;
  Filters?: SnapshotFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  IncludeShared?: boolean | undefined;
}
export type Snapshots = Snapshot[];
export interface DescribeSnapshotsResponse {
  Snapshots?:
    | (Snapshot & {
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
      })[]
    | undefined;
  NextToken?: string | undefined;
}
export type StorageVirtualMachinePeerIds = string[];
export type StorageVirtualMachinePeerFilterName =
  | "file-system-id"
  | "storage-virtual-machine-id"
  | (string & {});
export type StorageVirtualMachinePeerFilterValue = string;
export type StorageVirtualMachinePeerFilterValues = string[];
export interface StorageVirtualMachinePeerFilter {
  Name?: StorageVirtualMachinePeerFilterName | undefined;
  Values?: string[] | undefined;
}
export type StorageVirtualMachinePeerFilters = StorageVirtualMachinePeerFilter[];
export interface DescribeStorageVirtualMachinePeersRequest {
  StorageVirtualMachinePeerIds?: string[] | undefined;
  Filters?: StorageVirtualMachinePeerFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type StorageVirtualMachinePeers = StorageVirtualMachinePeer[];
export interface DescribeStorageVirtualMachinePeersResponse {
  StorageVirtualMachinePeers?:
    | (StorageVirtualMachinePeer & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] })[]
    | undefined;
  NextToken?: string | undefined;
}
export type StorageVirtualMachineIds = string[];
export type StorageVirtualMachineFilterName = "file-system-id" | (string & {});
export type StorageVirtualMachineFilterValue = string;
export type StorageVirtualMachineFilterValues = string[];
export interface StorageVirtualMachineFilter {
  Name?: StorageVirtualMachineFilterName | undefined;
  Values?: string[] | undefined;
}
export type StorageVirtualMachineFilters = StorageVirtualMachineFilter[];
export interface DescribeStorageVirtualMachinesRequest {
  StorageVirtualMachineIds?: string[] | undefined;
  Filters?: StorageVirtualMachineFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type StorageVirtualMachines = StorageVirtualMachine[];
export interface DescribeStorageVirtualMachinesResponse {
  StorageVirtualMachines?:
    | (StorageVirtualMachine & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] })[]
    | undefined;
  NextToken?: string | undefined;
}
export type VolumeIds = string[];
export type VolumeFilterName = "file-system-id" | "storage-virtual-machine-id" | (string & {});
export type VolumeFilterValue = string;
export type VolumeFilterValues = string[];
export interface VolumeFilter {
  Name?: VolumeFilterName | undefined;
  Values?: string[] | undefined;
}
export type VolumeFilters = VolumeFilter[];
export interface DescribeVolumesRequest {
  VolumeIds?: string[] | undefined;
  Filters?: VolumeFilter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export type Volumes = Volume[];
export interface DescribeVolumesResponse {
  Volumes?:
    | (Volume & {
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
      })[]
    | undefined;
  NextToken?: string | undefined;
}
export interface DetachAndDeleteS3AccessPointRequest {
  ClientRequestToken?: string | undefined;
  Name?: string | undefined;
}
export interface DetachAndDeleteS3AccessPointResponse {
  Lifecycle?: S3AccessPointAttachmentLifecycle | undefined;
  Name?: string | undefined;
}
export interface DisassociateFileSystemAliasesRequest {
  ClientRequestToken?: string | undefined;
  FileSystemId?: string | undefined;
  Aliases?: string[] | undefined;
}
export interface DisassociateFileSystemAliasesResponse {
  Aliases?: Alias[] | undefined;
}
export interface ListTagsForResourceRequest {
  ResourceARN?: string | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface ListTagsForResourceResponse {
  Tags?: (Tag & { Key: TagKey; Value: TagValue })[] | undefined;
  NextToken?: string | undefined;
}
export interface ReleaseFileSystemNfsV3LocksRequest {
  FileSystemId?: string | undefined;
  ClientRequestToken?: string | undefined;
}
export interface ReleaseFileSystemNfsV3LocksResponse {
  FileSystem?:
    | (FileSystem & {
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
      })
    | undefined;
}
export type RestoreOpenZFSVolumeOption =
  | "DELETE_INTERMEDIATE_SNAPSHOTS"
  | "DELETE_CLONED_VOLUMES"
  | (string & {});
export type RestoreOpenZFSVolumeOptions = RestoreOpenZFSVolumeOption[];
export interface RestoreVolumeFromSnapshotRequest {
  ClientRequestToken?: string | undefined;
  VolumeId?: string | undefined;
  SnapshotId?: string | undefined;
  Options?: RestoreOpenZFSVolumeOption[] | undefined;
}
export interface RestoreVolumeFromSnapshotResponse {
  VolumeId?: string | undefined;
  Lifecycle?: VolumeLifecycle | undefined;
  AdministrativeActions?:
    | (AdministrativeAction & {
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
      })[]
    | undefined;
}
export interface StartMisconfiguredStateRecoveryRequest {
  ClientRequestToken?: string | undefined;
  FileSystemId?: string | undefined;
}
export interface StartMisconfiguredStateRecoveryResponse {
  FileSystem?:
    | (FileSystem & {
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
      })
    | undefined;
}
export interface TagResourceRequest {
  ResourceARN?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceRequest {
  ResourceARN?: string | undefined;
  TagKeys?: string[] | undefined;
}
export interface UntagResourceResponse {}
export interface UpdateClusterPeerRequest {
  ClientRequestToken?: string | undefined;
  ClusterPeerId?: string | undefined;
  PeerClusterName?: string | undefined;
  PeerAddresses?: string[] | undefined;
}
export interface UpdateClusterPeerResponse {
  ClusterPeer?: (ClusterPeer & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] }) | undefined;
}
export interface UpdateDataRepositoryAssociationRequest {
  AssociationId?: string | undefined;
  ClientRequestToken?: string | undefined;
  ImportedFileChunkSize?: number | undefined;
  S3?: S3DataRepositoryConfiguration | undefined;
}
export interface UpdateDataRepositoryAssociationResponse {
  Association?:
    | (DataRepositoryAssociation & {
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
        NFS: NFSDataRepositoryConfiguration & { Version: NfsVersion };
      })
    | undefined;
}
export interface UpdateFileCacheLustreConfiguration {
  WeeklyMaintenanceStartTime?: string | undefined;
}
export interface UpdateFileCacheRequest {
  FileCacheId?: string | undefined;
  ClientRequestToken?: string | undefined;
  LustreConfiguration?: UpdateFileCacheLustreConfiguration | undefined;
}
export interface UpdateFileCacheResponse {
  FileCache?:
    | (FileCache & {
        LustreConfiguration: FileCacheLustreConfiguration & {
          MetadataConfiguration: FileCacheLustreMetadataConfiguration & {
            StorageCapacity: MetadataStorageCapacity;
          };
          LogConfiguration: LustreLogConfiguration & { Level: LustreAccessAuditLogLevel };
        };
      })
    | undefined;
}
export interface SelfManagedActiveDirectoryConfigurationUpdates {
  UserName?: string | undefined;
  Password?: string | redacted.Redacted<string> | undefined;
  DnsIps?: string[] | undefined;
  DomainName?: string | undefined;
  OrganizationalUnitDistinguishedName?: string | undefined;
  FileSystemAdministratorsGroup?: string | undefined;
  DomainJoinServiceAccountSecret?: string | undefined;
}
export interface UpdateFileSystemWindowsConfiguration {
  WeeklyMaintenanceStartTime?: string | undefined;
  DailyAutomaticBackupStartTime?: string | undefined;
  AutomaticBackupRetentionDays?: number | undefined;
  ThroughputCapacity?: number | undefined;
  SelfManagedActiveDirectoryConfiguration?:
    | SelfManagedActiveDirectoryConfigurationUpdates
    | undefined;
  AuditLogConfiguration?: WindowsAuditLogCreateConfiguration | undefined;
  DiskIopsConfiguration?: DiskIopsConfiguration | undefined;
  FsrmConfiguration?: WindowsFsrmConfiguration | undefined;
}
export interface UpdateFileSystemLustreMetadataConfiguration {
  Iops?: number | undefined;
  Mode?: MetadataConfigurationMode | undefined;
}
export interface UpdateFileSystemLustreConfiguration {
  WeeklyMaintenanceStartTime?: string | undefined;
  DailyAutomaticBackupStartTime?: string | undefined;
  AutomaticBackupRetentionDays?: number | undefined;
  AutoImportPolicy?: AutoImportPolicyType | undefined;
  DataCompressionType?: DataCompressionType | undefined;
  LogConfiguration?: LustreLogCreateConfiguration | undefined;
  RootSquashConfiguration?: LustreRootSquashConfiguration | undefined;
  PerUnitStorageThroughput?: number | undefined;
  MetadataConfiguration?: UpdateFileSystemLustreMetadataConfiguration | undefined;
  ThroughputCapacity?: number | undefined;
  DataReadCacheConfiguration?: LustreReadCacheConfiguration | undefined;
}
export interface UpdateFileSystemOntapConfiguration {
  AutomaticBackupRetentionDays?: number | undefined;
  DailyAutomaticBackupStartTime?: string | undefined;
  FsxAdminPassword?: string | redacted.Redacted<string> | undefined;
  WeeklyMaintenanceStartTime?: string | undefined;
  DiskIopsConfiguration?: DiskIopsConfiguration | undefined;
  ThroughputCapacity?: number | undefined;
  AddRouteTableIds?: string[] | undefined;
  RemoveRouteTableIds?: string[] | undefined;
  ThroughputCapacityPerHAPair?: number | undefined;
  HAPairs?: number | undefined;
  EndpointIpv6AddressRange?: string | undefined;
}
export interface UpdateFileSystemOpenZFSConfiguration {
  AutomaticBackupRetentionDays?: number | undefined;
  CopyTagsToBackups?: boolean | undefined;
  CopyTagsToVolumes?: boolean | undefined;
  DailyAutomaticBackupStartTime?: string | undefined;
  ThroughputCapacity?: number | undefined;
  WeeklyMaintenanceStartTime?: string | undefined;
  DiskIopsConfiguration?: DiskIopsConfiguration | undefined;
  AddRouteTableIds?: string[] | undefined;
  RemoveRouteTableIds?: string[] | undefined;
  ReadCacheConfiguration?: OpenZFSReadCacheConfiguration | undefined;
  EndpointIpv6AddressRange?: string | undefined;
}
export interface UpdateFileSystemRequest {
  FileSystemId?: string | undefined;
  ClientRequestToken?: string | undefined;
  StorageCapacity?: number | undefined;
  WindowsConfiguration?: UpdateFileSystemWindowsConfiguration | undefined;
  LustreConfiguration?: UpdateFileSystemLustreConfiguration | undefined;
  OntapConfiguration?: UpdateFileSystemOntapConfiguration | undefined;
  OpenZFSConfiguration?: UpdateFileSystemOpenZFSConfiguration | undefined;
  StorageType?: StorageType | undefined;
  FileSystemTypeVersion?: string | undefined;
  NetworkType?: NetworkType | undefined;
}
export interface UpdateFileSystemResponse {
  FileSystem?:
    | (FileSystem & {
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
      })
    | undefined;
}
export interface UpdateSharedVpcConfigurationRequest {
  EnableFsxRouteTableUpdatesFromParticipantAccounts?: string | undefined;
  ClientRequestToken?: string | undefined;
}
export interface UpdateSharedVpcConfigurationResponse {
  EnableFsxRouteTableUpdatesFromParticipantAccounts?: string | undefined;
}
export interface UpdateSnapmirrorPolicyRequest {
  ClientRequestToken?: string | undefined;
  SnapmirrorPolicyId?: string | undefined;
  RetentionRules?: SnapmirrorPolicyRetentionRule[] | undefined;
  TransferSchedule?: string | undefined;
  NetworkCompressionEnabled?: boolean | undefined;
  ThrottleInKbps?: number | undefined;
}
export interface UpdateSnapmirrorPolicyResponse {
  SnapmirrorPolicy?:
    | (SnapmirrorPolicy & {
        RetentionRules: (SnapmirrorPolicyRetentionRule & {
          Label: SnapmirrorLabel;
          Count: SnapmirrorPolicyRetentionCount;
        })[];
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      })
    | undefined;
}
export type UpdatableSnapmirrorRelationshipState =
  | "SNAPMIRRORED"
  | "PAUSED"
  | "BROKEN_OFF"
  | (string & {});
export interface UpdateSnapmirrorRelationshipRequest {
  ClientRequestToken?: string | undefined;
  SnapmirrorRelationshipId?: string | undefined;
  PolicyId?: string | undefined;
  TransferSchedule?: string | undefined;
  ThrottleInKbps?: number | undefined;
  State?: UpdatableSnapmirrorRelationshipState | undefined;
}
export interface UpdateSnapmirrorRelationshipResponse {
  SnapmirrorRelationship?:
    | (SnapmirrorRelationship & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] })
    | undefined;
}
export interface UpdateOntapSnapshotConfiguration {
  SnapmirrorLabel?: string | undefined;
  ExpiryTime?: Date | undefined;
  SnaplockExpiryTime?: Date | undefined;
}
export interface UpdateSnapshotRequest {
  ClientRequestToken?: string | undefined;
  Name?: string | undefined;
  SnapshotId?: string | undefined;
  OntapConfiguration?: UpdateOntapSnapshotConfiguration | undefined;
}
export interface UpdateSnapshotResponse {
  Snapshot?:
    | (Snapshot & {
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
      })
    | undefined;
}
export interface UpdateSnapshotPolicyRequest {
  ClientRequestToken?: string | undefined;
  SnapshotPolicyId?: string | undefined;
  Enabled?: boolean | undefined;
}
export interface UpdateSnapshotPolicyResponse {
  SnapshotPolicy?:
    | (SnapshotPolicy & {
        Schedules: (SnapshotPolicySchedule & {
          Name: SnapshotPolicyScheduleName;
          Count: SnapshotPolicyScheduleCount;
          RetentionPeriod: SnapshotPolicyRetentionPeriod & {
            Type: SnapshotPolicyRetentionPeriodType;
          };
        })[];
        Tags: (Tag & { Key: TagKey; Value: TagValue })[];
      })
    | undefined;
}
export interface UpdateSvmActiveDirectoryConfiguration {
  SelfManagedActiveDirectoryConfiguration?:
    | SelfManagedActiveDirectoryConfigurationUpdates
    | undefined;
  NetBiosName?: string | undefined;
}
export interface UpdateStorageVirtualMachineRequest {
  ActiveDirectoryConfiguration?: UpdateSvmActiveDirectoryConfiguration | undefined;
  ClientRequestToken?: string | undefined;
  StorageVirtualMachineId?: string | undefined;
  SvmAdminPassword?: string | redacted.Redacted<string> | undefined;
}
export interface UpdateStorageVirtualMachineResponse {
  StorageVirtualMachine?:
    | (StorageVirtualMachine & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] })
    | undefined;
}
export type StorageVirtualMachinePeerUpdateState =
  | "PEERED"
  | "REJECTED"
  | "SUSPENDED"
  | (string & {});
export interface UpdateStorageVirtualMachinePeerRequest {
  ClientRequestToken?: string | undefined;
  StorageVirtualMachinePeerId?: string | undefined;
  Applications?: StorageVirtualMachinePeerApplication[] | undefined;
  PeerSvmAlias?: string | undefined;
  State?: StorageVirtualMachinePeerUpdateState | undefined;
}
export interface UpdateStorageVirtualMachinePeerResponse {
  StorageVirtualMachinePeer?:
    | (StorageVirtualMachinePeer & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] })
    | undefined;
}
export interface UpdateSnaplockConfiguration {
  AuditLogVolume?: boolean | undefined;
  AutocommitPeriod?: AutocommitPeriod | undefined;
  PrivilegedDelete?: PrivilegedDelete | undefined;
  RetentionPeriod?: SnaplockRetentionPeriod | undefined;
  VolumeAppendModeEnabled?: boolean | undefined;
}
export type CloneSplitAction = "START" | (string & {});
export interface UpdateCloneConfiguration {
  SplitAction?: CloneSplitAction | undefined;
}
export interface UpdateOntapVolumeConfiguration {
  JunctionPath?: string | undefined;
  SecurityStyle?: SecurityStyle | undefined;
  SizeInMegabytes?: number | undefined;
  StorageEfficiencyEnabled?: boolean | undefined;
  TieringPolicy?: TieringPolicy | undefined;
  SnapshotPolicy?: string | undefined;
  CopyTagsToBackups?: boolean | undefined;
  SnaplockConfiguration?: UpdateSnaplockConfiguration | undefined;
  SizeInBytes?: number | undefined;
  CloneConfiguration?: UpdateCloneConfiguration | undefined;
}
export interface UpdateOpenZFSVolumeConfiguration {
  StorageCapacityReservationGiB?: number | undefined;
  StorageCapacityQuotaGiB?: number | undefined;
  RecordSizeKiB?: number | undefined;
  DataCompressionType?: OpenZFSDataCompressionType | undefined;
  NfsExports?: OpenZFSNfsExport[] | undefined;
  UserAndGroupQuotas?: OpenZFSUserOrGroupQuota[] | undefined;
  ReadOnly?: boolean | undefined;
}
export interface UpdateVolumeRequest {
  ClientRequestToken?: string | undefined;
  VolumeId?: string | undefined;
  OntapConfiguration?: UpdateOntapVolumeConfiguration | undefined;
  Name?: string | undefined;
  OpenZFSConfiguration?: UpdateOpenZFSVolumeConfiguration | undefined;
}
export interface UpdateVolumeResponse {
  Volume?:
    | (Volume & {
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
      })
    | undefined;
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
  AssociateFileSystemAliasesRequest & RegionInput,
  AssociateFileSystemAliasesResponse,
  AssociateFileSystemAliasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c19, 0) as any as S.Schema<AssociateFileSystemAliasesRequest>,
  output: __S(704, __c22, 0) as any as S.Schema<AssociateFileSystemAliasesResponse>,
  errors: [BadRequest, FileSystemNotFound, InternalServerError],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateFileSystemAliases",
  telemetry: TELEMETRY,
  span: "AssociateFileSystemAliases",
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
  CancelDataRepositoryTaskRequest & RegionInput,
  CancelDataRepositoryTaskResponse,
  CancelDataRepositoryTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c23, 0) as any as S.Schema<CancelDataRepositoryTaskRequest>,
  output: __S(737, __c23, 1) as any as S.Schema<CancelDataRepositoryTaskResponse>,
  errors: [
    BadRequest,
    DataRepositoryTaskEnded,
    DataRepositoryTaskNotFound,
    InternalServerError,
    UnsupportedOperation,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelDataRepositoryTask",
  telemetry: TELEMETRY,
  span: "CancelDataRepositoryTask",
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
  CopyBackupRequest & RegionInput,
  CopyBackupResponse,
  CopyBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c24, 0) as any as S.Schema<CopyBackupRequest>,
  output: __S(1056, __c33, 0) as any as S.Schema<CopyBackupResponse>,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyBackup",
  telemetry: TELEMETRY,
  span: "CopyBackup",
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
  CopySnapshotAndUpdateVolumeRequest & RegionInput,
  CopySnapshotAndUpdateVolumeResponse,
  CopySnapshotAndUpdateVolumeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c35, 0) as any as S.Schema<CopySnapshotAndUpdateVolumeRequest>,
  output: __S(1152, __c36, 0) as any as S.Schema<CopySnapshotAndUpdateVolumeResponse>,
  errors: [
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
    SourceSnapshotNotFound,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopySnapshotAndUpdateVolume",
  telemetry: TELEMETRY,
  span: "CopySnapshotAndUpdateVolume",
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
 * see Accessing your data using Amazon S3 access points
 * in the Amazon FSx for OpenZFS User Guide. For FSx for ONTAP file systems, see
 * Accessing data using Amazon S3 access points
 * in the Amazon FSx for NetApp ONTAP User Guide.
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
  CreateAndAttachS3AccessPointRequest & RegionInput,
  CreateAndAttachS3AccessPointResponse,
  CreateAndAttachS3AccessPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1185, __c37, 1) as any as S.Schema<CreateAndAttachS3AccessPointRequest>,
  output: __S(1186, __c37, 2) as any as S.Schema<CreateAndAttachS3AccessPointResponse>,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAndAttachS3AccessPoint",
  telemetry: TELEMETRY,
  span: "CreateAndAttachS3AccessPoint",
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
  CreateBackupRequest & RegionInput,
  CreateBackupResponse,
  CreateBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c39, 0) as any as S.Schema<CreateBackupRequest>,
  output: __S(1056, __c33, 0) as any as S.Schema<CreateBackupResponse>,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBackup",
  telemetry: TELEMETRY,
  span: "CreateBackup",
}));

export type CreateClusterPeerError =
  | BadRequest
  | FileSystemNotFound
  | IncompatibleParameterError
  | InternalServerError
  | ServiceLimitExceeded
  | UnsupportedOperation
  | CommonErrors;
/**
 * Creates a cluster peer relationship between an Amazon FSx for NetApp ONTAP file system
 * and another ONTAP cluster.
 *
 * The `CreateClusterPeer` operation returns while the cluster peer's
 * lifecycle state is still `CREATING`. You can check the cluster peer creation
 * status by calling the DescribeClusterPeers operation.
 */
export const createClusterPeer: API.OperationMethod<
  CreateClusterPeerRequest & RegionInput,
  CreateClusterPeerResponse,
  CreateClusterPeerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1280, __c40, 0) as any as S.Schema<CreateClusterPeerRequest>,
  output: __S(1312, __c41, 0) as any as S.Schema<CreateClusterPeerResponse>,
  errors: [
    BadRequest,
    FileSystemNotFound,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
    UnsupportedOperation,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateClusterPeer",
  telemetry: TELEMETRY,
  span: "CreateClusterPeer",
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
  CreateDataRepositoryAssociationRequest & RegionInput,
  CreateDataRepositoryAssociationResponse,
  CreateDataRepositoryAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1376, __c43, 0) as any as S.Schema<CreateDataRepositoryAssociationRequest>,
  output: __S(1408, __c44, 0) as any as S.Schema<CreateDataRepositoryAssociationResponse>,
  errors: [
    BadRequest,
    FileSystemNotFound,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
    UnsupportedOperation,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataRepositoryAssociation",
  telemetry: TELEMETRY,
  span: "CreateDataRepositoryAssociation",
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
  CreateDataRepositoryTaskRequest & RegionInput,
  CreateDataRepositoryTaskResponse,
  CreateDataRepositoryTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1472, __c46, 0) as any as S.Schema<CreateDataRepositoryTaskRequest>,
  output: __S(1473, __c46, 1) as any as S.Schema<CreateDataRepositoryTaskResponse>,
  errors: [
    BadRequest,
    DataRepositoryTaskExecuting,
    FileSystemNotFound,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
    UnsupportedOperation,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataRepositoryTask",
  telemetry: TELEMETRY,
  span: "CreateDataRepositoryTask",
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
  CreateFileCacheRequest & RegionInput,
  CreateFileCacheResponse,
  CreateFileCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1540, __c48, 4) as any as S.Schema<CreateFileCacheRequest>,
  output: __S(1542, __c48, 6) as any as S.Schema<CreateFileCacheResponse>,
  errors: [
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    InvalidNetworkSettings,
    InvalidPerUnitStorageThroughput,
    MissingFileCacheConfiguration,
    ServiceLimitExceeded,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFileCache",
  telemetry: TELEMETRY,
  span: "CreateFileCache",
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
  CreateFileSystemRequest & RegionInput,
  CreateFileSystemResponse,
  CreateFileSystemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1601, __c50, 1) as any as S.Schema<CreateFileSystemRequest>,
  output: __S(1664, __c52, 0) as any as S.Schema<CreateFileSystemResponse>,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFileSystem",
  telemetry: TELEMETRY,
  span: "CreateFileSystem",
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
  CreateFileSystemFromBackupRequest & RegionInput,
  CreateFileSystemFromBackupResponse,
  CreateFileSystemFromBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1728, __c54, 0) as any as S.Schema<CreateFileSystemFromBackupRequest>,
  output: __S(1664, __c52, 0) as any as S.Schema<CreateFileSystemFromBackupResponse>,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFileSystemFromBackup",
  telemetry: TELEMETRY,
  span: "CreateFileSystemFromBackup",
}));

export type CreateSnapmirrorPolicyError =
  | BadRequest
  | FileSystemNotFound
  | IncompatibleParameterError
  | InternalServerError
  | ServiceLimitExceeded
  | StorageVirtualMachineNotFound
  | CommonErrors;
/**
 * Creates a SnapMirror policy for an Amazon FSx for NetApp ONTAP file system or storage
 * virtual machine (SVM). A SnapMirror policy defines how the SnapMirror relationships that
 * use the policy replicate data, including which snapshots to transfer, the maximum
 * number of snapshots to retain on the destination volume, and when to transfer
 * data.
 *
 * The `CreateSnapmirrorPolicy` operation returns while the SnapMirror policy's
 * lifecycle state is still `CREATING`. You can check the SnapMirror policy
 * creation status by calling the DescribeSnapmirrorPolicies operation.
 */
export const createSnapmirrorPolicy: API.OperationMethod<
  CreateSnapmirrorPolicyRequest & RegionInput,
  CreateSnapmirrorPolicyResponse,
  CreateSnapmirrorPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1760, __c55, 0) as any as S.Schema<CreateSnapmirrorPolicyRequest>,
  output: __S(1792, __c56, 0) as any as S.Schema<CreateSnapmirrorPolicyResponse>,
  errors: [
    BadRequest,
    FileSystemNotFound,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
    StorageVirtualMachineNotFound,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSnapmirrorPolicy",
  telemetry: TELEMETRY,
  span: "CreateSnapmirrorPolicy",
}));

export type CreateSnapmirrorRelationshipError =
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | ServiceLimitExceeded
  | UnsupportedOperation
  | VolumeNotFound
  | CommonErrors;
/**
 * Creates a SnapMirror relationship that replicates data from a source volume to a
 * destination volume on an Amazon FSx for NetApp ONTAP file system.
 *
 * The `CreateSnapmirrorRelationship` operation returns while the SnapMirror
 * relationship's lifecycle state is still `CREATING`. You can check the SnapMirror
 * relationship creation status by calling the DescribeSnapmirrorRelationships
 * operation.
 */
export const createSnapmirrorRelationship: API.OperationMethod<
  CreateSnapmirrorRelationshipRequest & RegionInput,
  CreateSnapmirrorRelationshipResponse,
  CreateSnapmirrorRelationshipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1857, __c58, 1) as any as S.Schema<CreateSnapmirrorRelationshipRequest>,
  output: __S(1888, __c59, 0) as any as S.Schema<CreateSnapmirrorRelationshipResponse>,
  errors: [
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
    UnsupportedOperation,
    VolumeNotFound,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSnapmirrorRelationship",
  telemetry: TELEMETRY,
  span: "CreateSnapmirrorRelationship",
}));

export type CreateSnapshotError =
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | ServiceLimitExceeded
  | VolumeNotFound
  | SnapshotVolumeNotFound
  | CommonErrors;
/**
 * Creates a snapshot of an existing Amazon FSx for OpenZFS or
 * Amazon FSx for NetApp ONTAP volume. With snapshots, you can easily undo file changes
 * and compare file versions by restoring the volume to a previous version.
 *
 * If a snapshot with the specified client request token exists, and the parameters
 * match, this operation returns the description of the existing snapshot. If a snapshot
 * with the specified client request token exists, and the parameters don't match, this
 * operation returns `IncompatibleParameterError`. If a snapshot with the
 * specified client request token doesn't exist, `CreateSnapshot` does the
 * following:
 *
 * - Creates a new snapshot with an assigned ID, and an initial lifecycle
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
  CreateSnapshotRequest & RegionInput,
  CreateSnapshotResponse,
  CreateSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1952, __c61, 0) as any as S.Schema<CreateSnapshotRequest>,
  output: __S(1985, __c62, 1) as any as S.Schema<CreateSnapshotResponse>,
  errors: [
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
    VolumeNotFound,
    SnapshotVolumeNotFound,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSnapshot",
  telemetry: TELEMETRY,
  span: "CreateSnapshot",
}));

export type CreateSnapshotPolicyError =
  | BadRequest
  | FileSystemNotFound
  | IncompatibleParameterError
  | InternalServerError
  | ServiceLimitExceeded
  | StorageVirtualMachineNotFound
  | CommonErrors;
/**
 * Creates a snapshot policy for an Amazon FSx for NetApp ONTAP file system or storage
 * virtual machine (SVM). A snapshot policy defines the schedules on which ONTAP
 * automatically creates snapshots of the volumes that use the policy, and the maximum
 * number of snapshots to retain for each schedule.
 *
 * The `CreateSnapshotPolicy` operation returns while the snapshot policy's
 * lifecycle state is still `CREATING`. You can check the snapshot policy
 * creation status by calling the DescribeSnapshotPolicies operation.
 */
export const createSnapshotPolicy: API.OperationMethod<
  CreateSnapshotPolicyRequest & RegionInput,
  CreateSnapshotPolicyResponse,
  CreateSnapshotPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2016, __c63, 0) as any as S.Schema<CreateSnapshotPolicyRequest>,
  output: __S(2048, __c64, 0) as any as S.Schema<CreateSnapshotPolicyResponse>,
  errors: [
    BadRequest,
    FileSystemNotFound,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
    StorageVirtualMachineNotFound,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSnapshotPolicy",
  telemetry: TELEMETRY,
  span: "CreateSnapshotPolicy",
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
  CreateStorageVirtualMachineRequest & RegionInput,
  CreateStorageVirtualMachineResponse,
  CreateStorageVirtualMachineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2113, __c66, 1) as any as S.Schema<CreateStorageVirtualMachineRequest>,
  output: __S(2144, __c67, 0) as any as S.Schema<CreateStorageVirtualMachineResponse>,
  errors: [
    ActiveDirectoryError,
    BadRequest,
    FileSystemNotFound,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
    UnsupportedOperation,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStorageVirtualMachine",
  telemetry: TELEMETRY,
  span: "CreateStorageVirtualMachine",
}));

export type CreateStorageVirtualMachinePeerError =
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | ServiceLimitExceeded
  | StorageVirtualMachineNotFound
  | UnsupportedOperation
  | CommonErrors;
/**
 * Creates a storage virtual machine (SVM) peer relationship between an SVM on an
 * Amazon FSx for NetApp ONTAP file system and another SVM.
 *
 * The `CreateStorageVirtualMachinePeer` operation returns while the SVM peer's
 * lifecycle state is still `CREATING`. You can check the SVM peer creation
 * status by calling the DescribeStorageVirtualMachinePeers operation.
 */
export const createStorageVirtualMachinePeer: API.OperationMethod<
  CreateStorageVirtualMachinePeerRequest & RegionInput,
  CreateStorageVirtualMachinePeerResponse,
  CreateStorageVirtualMachinePeerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2208, __c69, 0) as any as S.Schema<CreateStorageVirtualMachinePeerRequest>,
  output: __S(2240, __c70, 0) as any as S.Schema<CreateStorageVirtualMachinePeerResponse>,
  errors: [
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
    StorageVirtualMachineNotFound,
    UnsupportedOperation,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStorageVirtualMachinePeer",
  telemetry: TELEMETRY,
  span: "CreateStorageVirtualMachinePeer",
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
  | VolumeNotFound
  | CommonErrors;
/**
 * Creates an FSx for ONTAP or Amazon FSx for OpenZFS storage volume.
 */
export const createVolume: API.OperationMethod<
  CreateVolumeRequest & RegionInput,
  CreateVolumeResponse,
  CreateVolumeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2305, __c72, 1) as any as S.Schema<CreateVolumeRequest>,
  output: __S(2368, __c74, 0) as any as S.Schema<CreateVolumeResponse>,
  errors: [
    BadRequest,
    FileSystemNotFound,
    IncompatibleParameterError,
    InternalServerError,
    MissingVolumeConfiguration,
    ServiceLimitExceeded,
    StorageVirtualMachineNotFound,
    UnsupportedOperation,
    VolumeNotFound,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVolume",
  telemetry: TELEMETRY,
  span: "CreateVolume",
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
  CreateVolumeFromBackupRequest & RegionInput,
  CreateVolumeFromBackupResponse,
  CreateVolumeFromBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2400, __c75, 0) as any as S.Schema<CreateVolumeFromBackupRequest>,
  output: __S(2368, __c74, 0) as any as S.Schema<CreateVolumeFromBackupResponse>,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVolumeFromBackup",
  telemetry: TELEMETRY,
  span: "CreateVolumeFromBackup",
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
  DeleteBackupRequest & RegionInput,
  DeleteBackupResponse,
  DeleteBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2432, __c76, 0) as any as S.Schema<DeleteBackupRequest>,
  output: __S(2433, __c76, 1) as any as S.Schema<DeleteBackupResponse>,
  errors: [
    BackupBeingCopied,
    BackupInProgress,
    BackupNotFound,
    BackupRestoring,
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackup",
  telemetry: TELEMETRY,
  span: "DeleteBackup",
}));

export type DeleteClusterPeerError =
  | BadRequest
  | ClusterPeerNotFound
  | IncompatibleParameterError
  | InternalServerError
  | CommonErrors;
/**
 * Deletes an Amazon FSx for NetApp ONTAP cluster peer relationship.
 */
export const deleteClusterPeer: API.OperationMethod<
  DeleteClusterPeerRequest & RegionInput,
  DeleteClusterPeerResponse,
  DeleteClusterPeerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2464, __c77, 0) as any as S.Schema<DeleteClusterPeerRequest>,
  output: __S(2465, __c77, 1) as any as S.Schema<DeleteClusterPeerResponse>,
  errors: [BadRequest, ClusterPeerNotFound, IncompatibleParameterError, InternalServerError],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteClusterPeer",
  telemetry: TELEMETRY,
  span: "DeleteClusterPeer",
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
  DeleteDataRepositoryAssociationRequest & RegionInput,
  DeleteDataRepositoryAssociationResponse,
  DeleteDataRepositoryAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2496, __c78, 0) as any as S.Schema<DeleteDataRepositoryAssociationRequest>,
  output: __S(2497, __c78, 1) as any as S.Schema<DeleteDataRepositoryAssociationResponse>,
  errors: [
    BadRequest,
    DataRepositoryAssociationNotFound,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataRepositoryAssociation",
  telemetry: TELEMETRY,
  span: "DeleteDataRepositoryAssociation",
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
  DeleteFileCacheRequest & RegionInput,
  DeleteFileCacheResponse,
  DeleteFileCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2528, __c79, 0) as any as S.Schema<DeleteFileCacheRequest>,
  output: __S(2529, __c79, 1) as any as S.Schema<DeleteFileCacheResponse>,
  errors: [
    BadRequest,
    FileCacheNotFound,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFileCache",
  telemetry: TELEMETRY,
  span: "DeleteFileCache",
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
  DeleteFileSystemRequest & RegionInput,
  DeleteFileSystemResponse,
  DeleteFileSystemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2562, __c80, 2) as any as S.Schema<DeleteFileSystemRequest>,
  output: __S(2563, __c80, 3) as any as S.Schema<DeleteFileSystemResponse>,
  errors: [
    BadRequest,
    FileSystemNotFound,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFileSystem",
  telemetry: TELEMETRY,
  span: "DeleteFileSystem",
}));

export type DeleteSnapmirrorPolicyError =
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | SnapmirrorPolicyNotFound
  | CommonErrors;
/**
 * Deletes an Amazon FSx for NetApp ONTAP SnapMirror policy.
 */
export const deleteSnapmirrorPolicy: API.OperationMethod<
  DeleteSnapmirrorPolicyRequest & RegionInput,
  DeleteSnapmirrorPolicyResponse,
  DeleteSnapmirrorPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2624, __c82, 0) as any as S.Schema<DeleteSnapmirrorPolicyRequest>,
  output: __S(2625, __c82, 1) as any as S.Schema<DeleteSnapmirrorPolicyResponse>,
  errors: [BadRequest, IncompatibleParameterError, InternalServerError, SnapmirrorPolicyNotFound],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSnapmirrorPolicy",
  telemetry: TELEMETRY,
  span: "DeleteSnapmirrorPolicy",
}));

export type DeleteSnapmirrorRelationshipError =
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | SnapmirrorRelationshipNotFound
  | CommonErrors;
/**
 * Deletes an Amazon FSx for NetApp ONTAP SnapMirror relationship.
 */
export const deleteSnapmirrorRelationship: API.OperationMethod<
  DeleteSnapmirrorRelationshipRequest & RegionInput,
  DeleteSnapmirrorRelationshipResponse,
  DeleteSnapmirrorRelationshipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2656, __c83, 0) as any as S.Schema<DeleteSnapmirrorRelationshipRequest>,
  output: __S(2657, __c83, 1) as any as S.Schema<DeleteSnapmirrorRelationshipResponse>,
  errors: [
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    SnapmirrorRelationshipNotFound,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSnapmirrorRelationship",
  telemetry: TELEMETRY,
  span: "DeleteSnapmirrorRelationship",
}));

export type DeleteSnapshotError =
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | SnapshotNotFound
  | CommonErrors;
/**
 * Deletes an Amazon FSx for OpenZFS or Amazon FSx for NetApp ONTAP snapshot. After
 * deletion, the snapshot no longer exists, and its data is gone. Deleting a snapshot
 * doesn't affect snapshots stored in a file system backup.
 *
 * The `DeleteSnapshot` operation returns instantly. The snapshot appears with
 * the lifecycle status of `DELETING` until the deletion is complete.
 */
export const deleteSnapshot: API.OperationMethod<
  DeleteSnapshotRequest & RegionInput,
  DeleteSnapshotResponse,
  DeleteSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2688, __c84, 0) as any as S.Schema<DeleteSnapshotRequest>,
  output: __S(2689, __c84, 1) as any as S.Schema<DeleteSnapshotResponse>,
  errors: [BadRequest, IncompatibleParameterError, InternalServerError, SnapshotNotFound],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSnapshot",
  telemetry: TELEMETRY,
  span: "DeleteSnapshot",
}));

export type DeleteSnapshotPolicyError =
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | SnapshotPolicyNotFound
  | CommonErrors;
/**
 * Deletes an Amazon FSx for NetApp ONTAP snapshot policy.
 */
export const deleteSnapshotPolicy: API.OperationMethod<
  DeleteSnapshotPolicyRequest & RegionInput,
  DeleteSnapshotPolicyResponse,
  DeleteSnapshotPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2720, __c85, 0) as any as S.Schema<DeleteSnapshotPolicyRequest>,
  output: __S(2721, __c85, 1) as any as S.Schema<DeleteSnapshotPolicyResponse>,
  errors: [BadRequest, IncompatibleParameterError, InternalServerError, SnapshotPolicyNotFound],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSnapshotPolicy",
  telemetry: TELEMETRY,
  span: "DeleteSnapshotPolicy",
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
  DeleteStorageVirtualMachineRequest & RegionInput,
  DeleteStorageVirtualMachineResponse,
  DeleteStorageVirtualMachineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2752, __c86, 0) as any as S.Schema<DeleteStorageVirtualMachineRequest>,
  output: __S(2753, __c86, 1) as any as S.Schema<DeleteStorageVirtualMachineResponse>,
  errors: [
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    StorageVirtualMachineNotFound,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStorageVirtualMachine",
  telemetry: TELEMETRY,
  span: "DeleteStorageVirtualMachine",
}));

export type DeleteStorageVirtualMachinePeerError =
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | StorageVirtualMachinePeerNotFound
  | CommonErrors;
/**
 * Deletes an Amazon FSx for NetApp ONTAP storage virtual machine (SVM) peer
 * relationship.
 */
export const deleteStorageVirtualMachinePeer: API.OperationMethod<
  DeleteStorageVirtualMachinePeerRequest & RegionInput,
  DeleteStorageVirtualMachinePeerResponse,
  DeleteStorageVirtualMachinePeerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2784, __c87, 0) as any as S.Schema<DeleteStorageVirtualMachinePeerRequest>,
  output: __S(2785, __c87, 1) as any as S.Schema<DeleteStorageVirtualMachinePeerResponse>,
  errors: [
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    StorageVirtualMachinePeerNotFound,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStorageVirtualMachinePeer",
  telemetry: TELEMETRY,
  span: "DeleteStorageVirtualMachinePeer",
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
  DeleteVolumeRequest & RegionInput,
  DeleteVolumeResponse,
  DeleteVolumeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2818, __c88, 2) as any as S.Schema<DeleteVolumeRequest>,
  output: __S(2819, __c88, 3) as any as S.Schema<DeleteVolumeResponse>,
  errors: [
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
    VolumeNotFound,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVolume",
  telemetry: TELEMETRY,
  span: "DeleteVolume",
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
  DescribeBackupsRequest & RegionInput,
  DescribeBackupsResponse,
  DescribeBackupsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2848, __c89, 0) as any as S.Schema<DescribeBackupsRequest>,
  output: __S(2850, __c89, 2) as any as S.Schema<DescribeBackupsResponse>,
  errors: [BackupNotFound, BadRequest, FileSystemNotFound, InternalServerError, VolumeNotFound],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBackups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeBackups",
})) as any;

export type DescribeClusterPeersError =
  | BadRequest
  | ClusterPeerNotFound
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Returns the description of specific Amazon FSx for NetApp ONTAP cluster peers, if a
 * `ClusterPeerIds` value is provided. Otherwise, this operation returns all
 * cluster peers owned by your Amazon Web Services account in the
 * Amazon Web Services Region of the endpoint that you're calling.
 *
 * When retrieving all cluster peers, you can optionally specify the
 * `MaxResults` parameter to limit the number of cluster peers in a response.
 * If more cluster peers remain, Amazon FSx returns a `NextToken` value
 * in the response. In this case, send a later request with the `NextToken`
 * request parameter set to the value of `NextToken` from the last
 * response.
 */
export const describeClusterPeers: API.PaginatedOperationMethod<
  DescribeClusterPeersRequest & RegionInput,
  DescribeClusterPeersResponse,
  DescribeClusterPeersError,
  Credentials | HttpClient.HttpClient,
  ClusterPeer
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2912, __c91, 0) as any as S.Schema<DescribeClusterPeersRequest>,
  output: __S(2914, __c91, 2) as any as S.Schema<DescribeClusterPeersResponse>,
  errors: [BadRequest, ClusterPeerNotFound, FileSystemNotFound, InternalServerError],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterPeers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ClusterPeers",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeClusterPeers",
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
  DescribeDataRepositoryAssociationsRequest & RegionInput,
  DescribeDataRepositoryAssociationsResponse,
  DescribeDataRepositoryAssociationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2944, __c92, 0) as any as S.Schema<DescribeDataRepositoryAssociationsRequest>,
  output: __S(2946, __c92, 2) as any as S.Schema<DescribeDataRepositoryAssociationsResponse>,
  errors: [
    BadRequest,
    DataRepositoryAssociationNotFound,
    FileSystemNotFound,
    InternalServerError,
    InvalidDataRepositoryType,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataRepositoryAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeDataRepositoryAssociations",
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
  DescribeDataRepositoryTasksRequest & RegionInput,
  DescribeDataRepositoryTasksResponse,
  DescribeDataRepositoryTasksError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2976, __c93, 0) as any as S.Schema<DescribeDataRepositoryTasksRequest>,
  output: __S(2978, __c93, 2) as any as S.Schema<DescribeDataRepositoryTasksResponse>,
  errors: [BadRequest, DataRepositoryTaskNotFound, FileSystemNotFound, InternalServerError],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataRepositoryTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeDataRepositoryTasks",
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
  DescribeFileCachesRequest & RegionInput,
  DescribeFileCachesResponse,
  DescribeFileCachesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3008, __c94, 0) as any as S.Schema<DescribeFileCachesRequest>,
  output: __S(3010, __c94, 2) as any as S.Schema<DescribeFileCachesResponse>,
  errors: [BadRequest, FileCacheNotFound, InternalServerError],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFileCaches",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeFileCaches",
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
  DescribeFileSystemAliasesRequest & RegionInput,
  DescribeFileSystemAliasesResponse,
  DescribeFileSystemAliasesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3072, __c96, 0) as any as S.Schema<DescribeFileSystemAliasesRequest>,
  output: __S(3073, __c96, 1) as any as S.Schema<DescribeFileSystemAliasesResponse>,
  errors: [BadRequest, FileSystemNotFound, InternalServerError],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFileSystemAliases",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeFileSystemAliases",
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
  DescribeFileSystemsRequest & RegionInput,
  DescribeFileSystemsResponse,
  DescribeFileSystemsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3104, __c97, 0) as any as S.Schema<DescribeFileSystemsRequest>,
  output: __S(3106, __c97, 2) as any as S.Schema<DescribeFileSystemsResponse>,
  errors: [BadRequest, FileSystemNotFound, InternalServerError],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFileSystems",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeFileSystems",
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
  DescribeS3AccessPointAttachmentsRequest & RegionInput,
  DescribeS3AccessPointAttachmentsResponse,
  DescribeS3AccessPointAttachmentsError,
  Credentials | HttpClient.HttpClient,
  S3AccessPointAttachment
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3136, __c98, 0) as any as S.Schema<DescribeS3AccessPointAttachmentsRequest>,
  output: __S(3138, __c98, 2) as any as S.Schema<DescribeS3AccessPointAttachmentsResponse>,
  errors: [BadRequest, InternalServerError, S3AccessPointAttachmentNotFound, UnsupportedOperation],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeS3AccessPointAttachments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "S3AccessPointAttachments",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeS3AccessPointAttachments",
})) as any;

export type DescribeSharedVpcConfigurationError = BadRequest | InternalServerError | CommonErrors;
/**
 * Indicates whether participant accounts in your organization can create Amazon FSx for NetApp ONTAP Multi-AZ file systems in subnets that are shared by a virtual
 * private cloud (VPC) owner. For more information, see Creating FSx for ONTAP file systems in shared subnets.
 */
export const describeSharedVpcConfiguration: API.OperationMethod<
  DescribeSharedVpcConfigurationRequest & RegionInput,
  DescribeSharedVpcConfigurationResponse,
  DescribeSharedVpcConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3168, __c99, 0) as any as S.Schema<DescribeSharedVpcConfigurationRequest>,
  output: __S(3200, __c100, 0) as any as S.Schema<DescribeSharedVpcConfigurationResponse>,
  errors: [BadRequest, InternalServerError],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSharedVpcConfiguration",
  telemetry: TELEMETRY,
  span: "DescribeSharedVpcConfiguration",
}));

export type DescribeSnapmirrorPoliciesError =
  | BadRequest
  | InternalServerError
  | SnapmirrorPolicyNotFound
  | CommonErrors;
/**
 * Returns the description of specific Amazon FSx for NetApp ONTAP SnapMirror policies,
 * if a `SnapmirrorPolicyIds` value is provided. Otherwise, this operation
 * returns all SnapMirror policies owned by your Amazon Web Services account in the
 * Amazon Web Services Region of the endpoint that you're calling.
 *
 * When retrieving all SnapMirror policies, you can optionally specify the
 * `MaxResults` parameter to limit the number of SnapMirror policies in a
 * response. If more SnapMirror policies remain, Amazon FSx returns a
 * `NextToken` value in the response. In this case, send a later request with
 * the `NextToken` request parameter set to the value of `NextToken`
 * from the last response.
 */
export const describeSnapmirrorPolicies: API.PaginatedOperationMethod<
  DescribeSnapmirrorPoliciesRequest & RegionInput,
  DescribeSnapmirrorPoliciesResponse,
  DescribeSnapmirrorPoliciesError,
  Credentials | HttpClient.HttpClient,
  SnapmirrorPolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3232, __c101, 0) as any as S.Schema<DescribeSnapmirrorPoliciesRequest>,
  output: __S(3234, __c101, 2) as any as S.Schema<DescribeSnapmirrorPoliciesResponse>,
  errors: [BadRequest, InternalServerError, SnapmirrorPolicyNotFound],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSnapmirrorPolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SnapmirrorPolicies",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeSnapmirrorPolicies",
})) as any;

export type DescribeSnapmirrorRelationshipsError =
  | BadRequest
  | InternalServerError
  | SnapmirrorRelationshipNotFound
  | VolumeNotFound
  | CommonErrors;
/**
 * Returns the description of specific Amazon FSx for NetApp ONTAP SnapMirror
 * relationships, if a `SnapmirrorRelationshipIds` value is provided. Otherwise,
 * this operation returns all SnapMirror relationships owned by your
 * Amazon Web Services account in the Amazon Web Services Region of the endpoint that you're
 * calling.
 *
 * When retrieving all SnapMirror relationships, you can optionally specify the
 * `MaxResults` parameter to limit the number of SnapMirror relationships in a
 * response. If more SnapMirror relationships remain, Amazon FSx returns a
 * `NextToken` value in the response. In this case, send a later request with the
 * `NextToken` request parameter set to the value of `NextToken` from
 * the last response.
 */
export const describeSnapmirrorRelationships: API.PaginatedOperationMethod<
  DescribeSnapmirrorRelationshipsRequest & RegionInput,
  DescribeSnapmirrorRelationshipsResponse,
  DescribeSnapmirrorRelationshipsError,
  Credentials | HttpClient.HttpClient,
  SnapmirrorRelationship
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3264, __c102, 0) as any as S.Schema<DescribeSnapmirrorRelationshipsRequest>,
  output: __S(3266, __c102, 2) as any as S.Schema<DescribeSnapmirrorRelationshipsResponse>,
  errors: [BadRequest, InternalServerError, SnapmirrorRelationshipNotFound, VolumeNotFound],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSnapmirrorRelationships",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SnapmirrorRelationships",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeSnapmirrorRelationships",
})) as any;

export type DescribeSnapshotPoliciesError =
  | BadRequest
  | InternalServerError
  | SnapshotPolicyNotFound
  | CommonErrors;
/**
 * Returns the description of specific Amazon FSx for NetApp ONTAP snapshot policies, if
 * a `SnapshotPolicyIds` value is provided. Otherwise, this operation returns
 * all snapshot policies owned by your Amazon Web Services account in the
 * Amazon Web Services Region of the endpoint that you're calling.
 *
 * When retrieving all snapshot policies, you can optionally specify the
 * `MaxResults` parameter to limit the number of snapshot policies in a
 * response. If more snapshot policies remain, Amazon FSx returns a
 * `NextToken` value in the response. In this case, send a later request with
 * the `NextToken` request parameter set to the value of `NextToken`
 * from the last response.
 */
export const describeSnapshotPolicies: API.PaginatedOperationMethod<
  DescribeSnapshotPoliciesRequest & RegionInput,
  DescribeSnapshotPoliciesResponse,
  DescribeSnapshotPoliciesError,
  Credentials | HttpClient.HttpClient,
  SnapshotPolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3296, __c103, 0) as any as S.Schema<DescribeSnapshotPoliciesRequest>,
  output: __S(3298, __c103, 2) as any as S.Schema<DescribeSnapshotPoliciesResponse>,
  errors: [BadRequest, InternalServerError, SnapshotPolicyNotFound],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSnapshotPolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SnapshotPolicies",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeSnapshotPolicies",
})) as any;

export type DescribeSnapshotsError =
  | BadRequest
  | InternalServerError
  | SnapshotNotFound
  | CommonErrors;
/**
 * Returns the description of specific Amazon FSx for OpenZFS and Amazon FSx for NetApp ONTAP
 * snapshots, if a `SnapshotIds` value is provided. Otherwise, this operation returns all
 * snapshots owned by your Amazon Web Services account in the Amazon Web Services Region of
 * the endpoint that you're calling.
 *
 * When retrieving all snapshots, you can optionally specify the `MaxResults`
 * parameter to limit the number of snapshots in a response. If more snapshots remain,
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
 * `DescribeSnapshots` call and the order of snapshots returned across
 * the responses of a multi-call iteration is unspecified.
 */
export const describeSnapshots: API.PaginatedOperationMethod<
  DescribeSnapshotsRequest & RegionInput,
  DescribeSnapshotsResponse,
  DescribeSnapshotsError,
  Credentials | HttpClient.HttpClient,
  Snapshot
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3328, __c104, 0) as any as S.Schema<DescribeSnapshotsRequest>,
  output: __S(3330, __c104, 2) as any as S.Schema<DescribeSnapshotsResponse>,
  errors: [BadRequest, InternalServerError, SnapshotNotFound],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSnapshots",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Snapshots",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeSnapshots",
})) as any;

export type DescribeStorageVirtualMachinePeersError =
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | StorageVirtualMachineNotFound
  | StorageVirtualMachinePeerNotFound
  | CommonErrors;
/**
 * Returns the description of specific Amazon FSx for NetApp ONTAP storage virtual machine
 * (SVM) peers, if a `StorageVirtualMachinePeerIds` value is provided. Otherwise,
 * this operation returns all SVM peers owned by your Amazon Web Services account in the
 * Amazon Web Services Region of the endpoint that you're calling.
 *
 * When retrieving all SVM peers, you can optionally specify the `MaxResults`
 * parameter to limit the number of SVM peers in a response. If more SVM peers remain,
 * Amazon FSx returns a `NextToken` value in the response. In this case,
 * send a later request with the `NextToken` request parameter set to the value
 * of `NextToken` from the last response.
 */
export const describeStorageVirtualMachinePeers: API.PaginatedOperationMethod<
  DescribeStorageVirtualMachinePeersRequest & RegionInput,
  DescribeStorageVirtualMachinePeersResponse,
  DescribeStorageVirtualMachinePeersError,
  Credentials | HttpClient.HttpClient,
  StorageVirtualMachinePeer
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3360, __c105, 0) as any as S.Schema<DescribeStorageVirtualMachinePeersRequest>,
  output: __S(3362, __c105, 2) as any as S.Schema<DescribeStorageVirtualMachinePeersResponse>,
  errors: [
    BadRequest,
    FileSystemNotFound,
    InternalServerError,
    StorageVirtualMachineNotFound,
    StorageVirtualMachinePeerNotFound,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStorageVirtualMachinePeers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "StorageVirtualMachinePeers",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeStorageVirtualMachinePeers",
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
  DescribeStorageVirtualMachinesRequest & RegionInput,
  DescribeStorageVirtualMachinesResponse,
  DescribeStorageVirtualMachinesError,
  Credentials | HttpClient.HttpClient,
  StorageVirtualMachine
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3392, __c106, 0) as any as S.Schema<DescribeStorageVirtualMachinesRequest>,
  output: __S(3394, __c106, 2) as any as S.Schema<DescribeStorageVirtualMachinesResponse>,
  errors: [BadRequest, InternalServerError, StorageVirtualMachineNotFound],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStorageVirtualMachines",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "StorageVirtualMachines",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeStorageVirtualMachines",
})) as any;

export type DescribeVolumesError = BadRequest | InternalServerError | VolumeNotFound | CommonErrors;
/**
 * Describes one or more Amazon FSx for NetApp ONTAP or Amazon FSx for
 * OpenZFS volumes.
 */
export const describeVolumes: API.PaginatedOperationMethod<
  DescribeVolumesRequest & RegionInput,
  DescribeVolumesResponse,
  DescribeVolumesError,
  Credentials | HttpClient.HttpClient,
  Volume
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3424, __c107, 0) as any as S.Schema<DescribeVolumesRequest>,
  output: __S(3426, __c107, 2) as any as S.Schema<DescribeVolumesResponse>,
  errors: [BadRequest, InternalServerError, VolumeNotFound],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVolumes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Volumes",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "DescribeVolumes",
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
  DetachAndDeleteS3AccessPointRequest & RegionInput,
  DetachAndDeleteS3AccessPointResponse,
  DetachAndDeleteS3AccessPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3456, __c108, 0) as any as S.Schema<DetachAndDeleteS3AccessPointRequest>,
  output: __S(3457, __c108, 1) as any as S.Schema<DetachAndDeleteS3AccessPointResponse>,
  errors: [
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    S3AccessPointAttachmentNotFound,
    UnsupportedOperation,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachAndDeleteS3AccessPoint",
  telemetry: TELEMETRY,
  span: "DetachAndDeleteS3AccessPoint",
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
  DisassociateFileSystemAliasesRequest & RegionInput,
  DisassociateFileSystemAliasesResponse,
  DisassociateFileSystemAliasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3488, __c109, 0) as any as S.Schema<DisassociateFileSystemAliasesRequest>,
  output: __S(704, __c22, 0) as any as S.Schema<DisassociateFileSystemAliasesResponse>,
  errors: [BadRequest, FileSystemNotFound, InternalServerError],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFileSystemAliases",
  telemetry: TELEMETRY,
  span: "DisassociateFileSystemAliases",
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
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3520, __c110, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(3521, __c110, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    BadRequest,
    InternalServerError,
    NotServiceResourceError,
    ResourceDoesNotSupportTagging,
    ResourceNotFound,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
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
  ReleaseFileSystemNfsV3LocksRequest & RegionInput,
  ReleaseFileSystemNfsV3LocksResponse,
  ReleaseFileSystemNfsV3LocksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<ReleaseFileSystemNfsV3LocksRequest>,
  output: __S(1664, __c52, 0) as any as S.Schema<ReleaseFileSystemNfsV3LocksResponse>,
  errors: [
    BadRequest,
    FileSystemNotFound,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReleaseFileSystemNfsV3Locks",
  telemetry: TELEMETRY,
  span: "ReleaseFileSystemNfsV3Locks",
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
  RestoreVolumeFromSnapshotRequest & RegionInput,
  RestoreVolumeFromSnapshotResponse,
  RestoreVolumeFromSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c1, 0) as any as S.Schema<RestoreVolumeFromSnapshotRequest>,
  output: __S(1152, __c36, 0) as any as S.Schema<RestoreVolumeFromSnapshotResponse>,
  errors: [BadRequest, InternalServerError, VolumeNotFound, RestoreSnapshotNotFound],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreVolumeFromSnapshot",
  telemetry: TELEMETRY,
  span: "RestoreVolumeFromSnapshot",
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
  StartMisconfiguredStateRecoveryRequest & RegionInput,
  StartMisconfiguredStateRecoveryResponse,
  StartMisconfiguredStateRecoveryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c2, 0) as any as S.Schema<StartMisconfiguredStateRecoveryRequest>,
  output: __S(1664, __c52, 0) as any as S.Schema<StartMisconfiguredStateRecoveryResponse>,
  errors: [BadRequest, FileSystemNotFound, InternalServerError],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMisconfiguredStateRecovery",
  telemetry: TELEMETRY,
  span: "StartMisconfiguredStateRecovery",
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
  TagResourceRequest & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c3, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(128, __c4, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    BadRequest,
    InternalServerError,
    NotServiceResourceError,
    ResourceDoesNotSupportTagging,
    ResourceNotFound,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  telemetry: TELEMETRY,
  span: "TagResource",
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
  UntagResourceRequest & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c5, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(128, __c4, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    BadRequest,
    InternalServerError,
    NotServiceResourceError,
    ResourceDoesNotSupportTagging,
    ResourceNotFound,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

export type UpdateClusterPeerError =
  | BadRequest
  | ClusterPeerNotFound
  | IncompatibleParameterError
  | InternalServerError
  | CommonErrors;
/**
 * Updates an Amazon FSx for NetApp ONTAP cluster peer relationship.
 */
export const updateClusterPeer: API.OperationMethod<
  UpdateClusterPeerRequest & RegionInput,
  UpdateClusterPeerResponse,
  UpdateClusterPeerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c6, 0) as any as S.Schema<UpdateClusterPeerRequest>,
  output: __S(1312, __c41, 0) as any as S.Schema<UpdateClusterPeerResponse>,
  errors: [BadRequest, ClusterPeerNotFound, IncompatibleParameterError, InternalServerError],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateClusterPeer",
  telemetry: TELEMETRY,
  span: "UpdateClusterPeer",
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
  UpdateDataRepositoryAssociationRequest & RegionInput,
  UpdateDataRepositoryAssociationResponse,
  UpdateDataRepositoryAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c7, 0) as any as S.Schema<UpdateDataRepositoryAssociationRequest>,
  output: __S(1408, __c44, 0) as any as S.Schema<UpdateDataRepositoryAssociationResponse>,
  errors: [
    BadRequest,
    DataRepositoryAssociationNotFound,
    IncompatibleParameterError,
    InternalServerError,
    ServiceLimitExceeded,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataRepositoryAssociation",
  telemetry: TELEMETRY,
  span: "UpdateDataRepositoryAssociation",
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
  UpdateFileCacheRequest & RegionInput,
  UpdateFileCacheResponse,
  UpdateFileCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(257, __c8, 1) as any as S.Schema<UpdateFileCacheRequest>,
  output: __S(258, __c8, 2) as any as S.Schema<UpdateFileCacheResponse>,
  errors: [
    BadRequest,
    FileCacheNotFound,
    IncompatibleParameterError,
    InternalServerError,
    MissingFileCacheConfiguration,
    ServiceLimitExceeded,
    UnsupportedOperation,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFileCache",
  telemetry: TELEMETRY,
  span: "UpdateFileCache",
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
  UpdateFileSystemRequest & RegionInput,
  UpdateFileSystemResponse,
  UpdateFileSystemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(292, __c9, 4) as any as S.Schema<UpdateFileSystemRequest>,
  output: __S(1664, __c52, 0) as any as S.Schema<UpdateFileSystemResponse>,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFileSystem",
  telemetry: TELEMETRY,
  span: "UpdateFileSystem",
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
  UpdateSharedVpcConfigurationRequest & RegionInput,
  UpdateSharedVpcConfigurationResponse,
  UpdateSharedVpcConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c11, 0) as any as S.Schema<UpdateSharedVpcConfigurationRequest>,
  output: __S(3200, __c100, 0) as any as S.Schema<UpdateSharedVpcConfigurationResponse>,
  errors: [BadRequest, IncompatibleParameterError, InternalServerError],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSharedVpcConfiguration",
  telemetry: TELEMETRY,
  span: "UpdateSharedVpcConfiguration",
}));

export type UpdateSnapmirrorPolicyError =
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | SnapmirrorPolicyNotFound
  | CommonErrors;
/**
 * Updates an Amazon FSx for NetApp ONTAP SnapMirror policy.
 */
export const updateSnapmirrorPolicy: API.OperationMethod<
  UpdateSnapmirrorPolicyRequest & RegionInput,
  UpdateSnapmirrorPolicyResponse,
  UpdateSnapmirrorPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c12, 0) as any as S.Schema<UpdateSnapmirrorPolicyRequest>,
  output: __S(1792, __c56, 0) as any as S.Schema<UpdateSnapmirrorPolicyResponse>,
  errors: [BadRequest, IncompatibleParameterError, InternalServerError, SnapmirrorPolicyNotFound],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSnapmirrorPolicy",
  telemetry: TELEMETRY,
  span: "UpdateSnapmirrorPolicy",
}));

export type UpdateSnapmirrorRelationshipError =
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | SnapmirrorRelationshipNotFound
  | CommonErrors;
/**
 * Updates an Amazon FSx for NetApp ONTAP SnapMirror relationship.
 */
export const updateSnapmirrorRelationship: API.OperationMethod<
  UpdateSnapmirrorRelationshipRequest & RegionInput,
  UpdateSnapmirrorRelationshipResponse,
  UpdateSnapmirrorRelationshipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c13, 0) as any as S.Schema<UpdateSnapmirrorRelationshipRequest>,
  output: __S(1888, __c59, 0) as any as S.Schema<UpdateSnapmirrorRelationshipResponse>,
  errors: [
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    SnapmirrorRelationshipNotFound,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSnapmirrorRelationship",
  telemetry: TELEMETRY,
  span: "UpdateSnapmirrorRelationship",
}));

export type UpdateSnapshotError =
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | SnapshotNotFound
  | UpdateSnapshotNotFound
  | CommonErrors;
/**
 * Updates an Amazon FSx for OpenZFS or Amazon FSx for NetApp ONTAP snapshot.
 *
 * For Amazon FSx for OpenZFS snapshots, you can update only the name. For
 * Amazon FSx for NetApp ONTAP snapshots, you can update the name and the properties in
 * `OntapConfiguration`.
 */
export const updateSnapshot: API.OperationMethod<
  UpdateSnapshotRequest & RegionInput,
  UpdateSnapshotResponse,
  UpdateSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c14, 0) as any as S.Schema<UpdateSnapshotRequest>,
  output: __S(1985, __c62, 1) as any as S.Schema<UpdateSnapshotResponse>,
  errors: [
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    SnapshotNotFound,
    UpdateSnapshotNotFound,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSnapshot",
  telemetry: TELEMETRY,
  span: "UpdateSnapshot",
}));

export type UpdateSnapshotPolicyError =
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | SnapshotPolicyNotFound
  | CommonErrors;
/**
 * Updates an Amazon FSx for NetApp ONTAP snapshot policy. You can enable or disable
 * the snapshot policy.
 */
export const updateSnapshotPolicy: API.OperationMethod<
  UpdateSnapshotPolicyRequest & RegionInput,
  UpdateSnapshotPolicyResponse,
  UpdateSnapshotPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c15, 0) as any as S.Schema<UpdateSnapshotPolicyRequest>,
  output: __S(2048, __c64, 0) as any as S.Schema<UpdateSnapshotPolicyResponse>,
  errors: [BadRequest, IncompatibleParameterError, InternalServerError, SnapshotPolicyNotFound],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSnapshotPolicy",
  telemetry: TELEMETRY,
  span: "UpdateSnapshotPolicy",
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
  UpdateStorageVirtualMachineRequest & RegionInput,
  UpdateStorageVirtualMachineResponse,
  UpdateStorageVirtualMachineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(513, __c16, 1) as any as S.Schema<UpdateStorageVirtualMachineRequest>,
  output: __S(2144, __c67, 0) as any as S.Schema<UpdateStorageVirtualMachineResponse>,
  errors: [
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    StorageVirtualMachineNotFound,
    UnsupportedOperation,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStorageVirtualMachine",
  telemetry: TELEMETRY,
  span: "UpdateStorageVirtualMachine",
}));

export type UpdateStorageVirtualMachinePeerError =
  | BadRequest
  | IncompatibleParameterError
  | InternalServerError
  | StorageVirtualMachinePeerNotFound
  | CommonErrors;
/**
 * Updates an Amazon FSx for NetApp ONTAP storage virtual machine (SVM) peer relationship.
 */
export const updateStorageVirtualMachinePeer: API.OperationMethod<
  UpdateStorageVirtualMachinePeerRequest & RegionInput,
  UpdateStorageVirtualMachinePeerResponse,
  UpdateStorageVirtualMachinePeerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c17, 0) as any as S.Schema<UpdateStorageVirtualMachinePeerRequest>,
  output: __S(2240, __c70, 0) as any as S.Schema<UpdateStorageVirtualMachinePeerResponse>,
  errors: [
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    StorageVirtualMachinePeerNotFound,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStorageVirtualMachinePeer",
  telemetry: TELEMETRY,
  span: "UpdateStorageVirtualMachinePeer",
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
  UpdateVolumeRequest & RegionInput,
  UpdateVolumeResponse,
  UpdateVolumeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(580, __c18, 4) as any as S.Schema<UpdateVolumeRequest>,
  output: __S(2368, __c74, 0) as any as S.Schema<UpdateVolumeResponse>,
  errors: [
    BadRequest,
    IncompatibleParameterError,
    InternalServerError,
    MissingVolumeConfiguration,
    VolumeNotFound,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVolume",
  telemetry: TELEMETRY,
  span: "UpdateVolume",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
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
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          VolumeId: S.optional(S.String),
          SnapshotId: S.optional(S.String),
          Options: S.optional(__S(896, __c28, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RestoreVolumeFromSnapshotRequest" });
  }
}
function __c2(j: number): any {
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
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.optional(S.String), Tags: S.optional(__S(833, __c26, 1)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceARN: S.optional(S.String),
          TagKeys: S.optional(__S(640, __c20, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          ClusterPeerId: S.optional(S.String),
          PeerClusterName: S.optional(S.String),
          PeerAddresses: S.optional(__S(640, __c20, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateClusterPeerRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AssociationId: S.optional(S.String),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          ImportedFileChunkSize: S.optional(S.Number),
          S3: S.optional(__S(1441, __c45, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateDataRepositoryAssociationRequest" });
  }
}
function __c8(j: number): any {
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
          LustreConfiguration: S.optional(__S(256, __c8, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateFileCacheRequest" });
    case 2:
      return S.suspend(() => S.Struct({ FileCache: S.optional(__S(3040, __c95, 0)) })).annotate({
        identifier: "UpdateFileCacheResponse",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WeeklyMaintenanceStartTime: S.optional(S.String),
          DailyAutomaticBackupStartTime: S.optional(S.String),
          AutomaticBackupRetentionDays: S.optional(S.Number),
          ThroughputCapacity: S.optional(S.Number),
          SelfManagedActiveDirectoryConfiguration: S.optional(__S(320, __c10, 0)),
          AuditLogConfiguration: S.optional(__S(1024, __c32, 0)),
          DiskIopsConfiguration: S.optional(__S(1025, __c32, 1)),
          FsrmConfiguration: S.optional(__S(1026, __c32, 2)),
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
          LogConfiguration: S.optional(__S(928, __c29, 0)),
          RootSquashConfiguration: S.optional(__S(1029, __c32, 5)),
          PerUnitStorageThroughput: S.optional(S.Number),
          MetadataConfiguration: S.optional(__S(1030, __c32, 6)),
          ThroughputCapacity: S.optional(S.Number),
          DataReadCacheConfiguration: S.optional(__S(1031, __c32, 7)),
        }),
      ).annotate({ identifier: "UpdateFileSystemLustreConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AutomaticBackupRetentionDays: S.optional(S.Number),
          DailyAutomaticBackupStartTime: S.optional(S.String),
          FsxAdminPassword: S.optional(SensitiveString),
          WeeklyMaintenanceStartTime: S.optional(S.String),
          DiskIopsConfiguration: S.optional(__S(1025, __c32, 1)),
          ThroughputCapacity: S.optional(S.Number),
          AddRouteTableIds: S.optional(__S(640, __c20, 0)),
          RemoveRouteTableIds: S.optional(__S(640, __c20, 0)),
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
          DiskIopsConfiguration: S.optional(__S(1025, __c32, 1)),
          AddRouteTableIds: S.optional(__S(640, __c20, 0)),
          RemoveRouteTableIds: S.optional(__S(640, __c20, 0)),
          ReadCacheConfiguration: S.optional(__S(1031, __c32, 7)),
          EndpointIpv6AddressRange: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateFileSystemOpenZFSConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          FileSystemId: S.optional(S.String),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          StorageCapacity: S.optional(S.Number),
          WindowsConfiguration: S.optional(__S(288, __c9, 0)),
          LustreConfiguration: S.optional(__S(289, __c9, 1)),
          OntapConfiguration: S.optional(__S(290, __c9, 2)),
          OpenZFSConfiguration: S.optional(__S(291, __c9, 3)),
          StorageType: S.optional(S.String),
          FileSystemTypeVersion: S.optional(S.String),
          NetworkType: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateFileSystemRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserName: S.optional(S.String),
          Password: S.optional(SensitiveString),
          DnsIps: S.optional(__S(640, __c20, 0)),
          DomainName: S.optional(S.String),
          OrganizationalUnitDistinguishedName: S.optional(S.String),
          FileSystemAdministratorsGroup: S.optional(S.String),
          DomainJoinServiceAccountSecret: S.optional(S.String),
        }),
      ).annotate({ identifier: "SelfManagedActiveDirectoryConfigurationUpdates" });
  }
}
function __c11(j: number): any {
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
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          SnapmirrorPolicyId: S.optional(S.String),
          RetentionRules: S.optional(__S(1825, __c57, 1)),
          TransferSchedule: S.optional(S.String),
          NetworkCompressionEnabled: S.optional(S.Boolean),
          ThrottleInKbps: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateSnapmirrorPolicyRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          SnapmirrorRelationshipId: S.optional(S.String),
          PolicyId: S.optional(S.String),
          TransferSchedule: S.optional(S.String),
          ThrottleInKbps: S.optional(S.Number),
          State: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateSnapmirrorRelationshipRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Name: S.optional(S.String),
          SnapshotId: S.optional(S.String),
          OntapConfiguration: S.optional(__S(1984, __c62, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateSnapshotRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          SnapshotPolicyId: S.optional(S.String),
          Enabled: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateSnapshotPolicyRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SelfManagedActiveDirectoryConfiguration: S.optional(__S(320, __c10, 0)),
          NetBiosName: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateSvmActiveDirectoryConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ActiveDirectoryConfiguration: S.optional(__S(512, __c16, 0)),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          StorageVirtualMachineId: S.optional(S.String),
          SvmAdminPassword: S.optional(SensitiveString),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateStorageVirtualMachineRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          StorageVirtualMachinePeerId: S.optional(S.String),
          Applications: S.optional(__S(896, __c28, 0)),
          PeerSvmAlias: S.optional(S.String),
          State: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateStorageVirtualMachinePeerRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuditLogVolume: S.optional(S.Boolean),
          AutocommitPeriod: S.optional(__S(960, __c30, 0)),
          PrivilegedDelete: S.optional(S.String),
          RetentionPeriod: S.optional(__S(1034, __c32, 10)),
          VolumeAppendModeEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "UpdateSnaplockConfiguration" });
    case 1:
      return S.suspend(() => S.Struct({ SplitAction: S.optional(S.String) })).annotate({
        identifier: "UpdateCloneConfiguration",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          JunctionPath: S.optional(S.String),
          SecurityStyle: S.optional(S.String),
          SizeInMegabytes: S.optional(S.Number),
          StorageEfficiencyEnabled: S.optional(S.Boolean),
          TieringPolicy: S.optional(__S(1033, __c32, 9)),
          SnapshotPolicy: S.optional(S.String),
          CopyTagsToBackups: S.optional(S.Boolean),
          SnaplockConfiguration: S.optional(__S(576, __c18, 0)),
          SizeInBytes: S.optional(S.Number),
          CloneConfiguration: S.optional(__S(577, __c18, 1)),
        }),
      ).annotate({ identifier: "UpdateOntapVolumeConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          StorageCapacityReservationGiB: S.optional(S.Number),
          StorageCapacityQuotaGiB: S.optional(S.Number),
          RecordSizeKiB: S.optional(S.Number),
          DataCompressionType: S.optional(S.String),
          NfsExports: S.optional(__S(1043, __c32, 19)),
          UserAndGroupQuotas: S.optional(__S(1045, __c32, 21)),
          ReadOnly: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "UpdateOpenZFSVolumeConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          VolumeId: S.optional(S.String),
          OntapConfiguration: S.optional(__S(578, __c18, 2)),
          Name: S.optional(S.String),
          OpenZFSConfiguration: S.optional(__S(579, __c18, 3)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateVolumeRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          FileSystemId: S.optional(S.String),
          Aliases: S.optional(__S(640, __c20, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AssociateFileSystemAliasesRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Lifecycle: S.optional(S.String) }),
      ).annotate({ identifier: "Alias" });
    case 1:
      return S.Array(__S(672, __c21, 0));
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Aliases: S.optional(__S(673, __c21, 1)) })).annotate({
        identifier: "AssociateFileSystemAliasesResponse",
      });
  }
}
function __c23(j: number): any {
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
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          SourceBackupId: S.optional(S.String),
          SourceRegion: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          CopyTags: S.optional(S.Boolean),
          Tags: S.optional(__S(833, __c26, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CopyBackupRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Message: S.optional(S.String), Code: S.optional(S.String) }),
      ).annotate({ identifier: "OntapError" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Message: S.optional(S.String), OntapError: S.optional(__S(800, __c25, 0)) }),
      ).annotate({ identifier: "LifecycleTransitionReason" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(__S(832, __c26, 0));
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Message: S.optional(S.String) })).annotate({
        identifier: "BackupFailureDetails",
      });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Level: S.optional(S.String), Destination: S.optional(S.String) }),
      ).annotate({ identifier: "LustreLogConfiguration" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), Value: S.optional(S.Number) }),
      ).annotate({ identifier: "AutocommitPeriod" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.optional(S.String),
          OrganizationalUnitDistinguishedName: S.optional(S.String),
          FileSystemAdministratorsGroup: S.optional(S.String),
          UserName: S.optional(S.String),
          DnsIps: S.optional(__S(640, __c20, 0)),
          DomainJoinServiceAccountSecret: S.optional(S.String),
        }),
      ).annotate({ identifier: "SelfManagedActiveDirectoryAttributes" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DNSName: S.optional(S.String),
          IpAddresses: S.optional(__S(640, __c20, 0)),
          Ipv6Addresses: S.optional(__S(640, __c20, 0)),
        }),
      ).annotate({ identifier: "FileSystemEndpoint" });
  }
}
function __c32(j: number): any {
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
          SelfManagedActiveDirectoryConfiguration: S.optional(__S(992, __c31, 0)),
          DeploymentType: S.optional(S.String),
          RemoteAdministrationEndpoint: S.optional(S.String),
          PreferredSubnetId: S.optional(S.String),
          PreferredFileServerIp: S.optional(S.String),
          ThroughputCapacity: S.optional(S.Number),
          MaintenanceOperationsInProgress: S.optional(__S(896, __c28, 0)),
          WeeklyMaintenanceStartTime: S.optional(S.String),
          DailyAutomaticBackupStartTime: S.optional(S.String),
          AutomaticBackupRetentionDays: S.optional(S.Number),
          CopyTagsToBackups: S.optional(S.Boolean),
          Aliases: S.optional(__S(673, __c21, 1)),
          AuditLogConfiguration: S.optional(__S(1024, __c32, 0)),
          DiskIopsConfiguration: S.optional(__S(1025, __c32, 1)),
          PreferredFileServerIpv6: S.optional(S.String),
          FsrmConfiguration: S.optional(__S(1026, __c32, 2)),
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
          FailureDetails: S.optional(__S(864, __c27, 0)),
        }),
      ).annotate({ identifier: "DataRepositoryConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          RootSquash: S.optional(S.String),
          NoSquashNids: S.optional(__S(640, __c20, 0)),
        }),
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
          DataRepositoryConfiguration: S.optional(__S(1028, __c32, 4)),
          DeploymentType: S.optional(S.String),
          PerUnitStorageThroughput: S.optional(S.Number),
          MountName: S.optional(S.String),
          DailyAutomaticBackupStartTime: S.optional(S.String),
          AutomaticBackupRetentionDays: S.optional(S.Number),
          CopyTagsToBackups: S.optional(S.Boolean),
          DriveCacheType: S.optional(S.String),
          DataCompressionType: S.optional(S.String),
          LogConfiguration: S.optional(__S(928, __c29, 0)),
          RootSquashConfiguration: S.optional(__S(1029, __c32, 5)),
          MetadataConfiguration: S.optional(__S(1030, __c32, 6)),
          EfaEnabled: S.optional(S.Boolean),
          ThroughputCapacity: S.optional(S.Number),
          DataReadCacheConfiguration: S.optional(__S(1031, __c32, 7)),
        }),
      ).annotate({ identifier: "LustreFileSystemConfiguration" });
    case 9:
      return S.suspend(() =>
        S.Struct({ CoolingPeriod: S.optional(S.Number), Name: S.optional(S.String) }),
      ).annotate({ identifier: "TieringPolicy" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          DefaultRetention: S.optional(__S(960, __c30, 0)),
          MinimumRetention: S.optional(__S(960, __c30, 0)),
          MaximumRetention: S.optional(__S(960, __c30, 0)),
        }),
      ).annotate({ identifier: "SnaplockRetentionPeriod" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          AuditLogVolume: S.optional(S.Boolean),
          AutocommitPeriod: S.optional(__S(960, __c30, 0)),
          PrivilegedDelete: S.optional(S.String),
          RetentionPeriod: S.optional(__S(1034, __c32, 10)),
          SnaplockType: S.optional(S.String),
          VolumeAppendModeEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "SnaplockConfiguration" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          Aggregates: S.optional(__S(640, __c20, 0)),
          TotalConstituents: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AggregateConfiguration" });
    case 13:
      return S.suspend(() =>
        S.Struct({ ParentVolumeId: S.optional(S.String), SnapshotId: S.optional(S.String) }),
      ).annotate({ identifier: "CloneConfiguration" });
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
          TieringPolicy: S.optional(__S(1033, __c32, 9)),
          UUID: S.optional(S.String),
          OntapVolumeType: S.optional(S.String),
          SnapshotPolicy: S.optional(S.String),
          CopyTagsToBackups: S.optional(S.Boolean),
          SnaplockConfiguration: S.optional(__S(1035, __c32, 11)),
          VolumeStyle: S.optional(S.String),
          AggregateConfiguration: S.optional(__S(1036, __c32, 12)),
          SizeInBytes: S.optional(S.Number),
          CloneConfiguration: S.optional(__S(1037, __c32, 13)),
        }),
      ).annotate({ identifier: "OntapVolumeConfiguration" });
    case 15:
      return S.suspend(() =>
        S.Struct({ SnapshotARN: S.optional(S.String), CopyStrategy: S.optional(S.String) }),
      ).annotate({ identifier: "OpenZFSOriginSnapshotConfiguration" });
    case 16:
      return S.suspend(() =>
        S.Struct({ Clients: S.optional(S.String), Options: S.optional(__S(640, __c20, 0)) }),
      ).annotate({ identifier: "OpenZFSClientConfiguration" });
    case 17:
      return S.Array(__S(1040, __c32, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({ ClientConfigurations: S.optional(__S(1041, __c32, 17)) }),
      ).annotate({ identifier: "OpenZFSNfsExport" });
    case 19:
      return S.Array(__S(1042, __c32, 18));
    case 20:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          Id: S.optional(S.Number),
          StorageCapacityQuotaGiB: S.optional(S.Number),
        }),
      ).annotate({ identifier: "OpenZFSUserOrGroupQuota" });
    case 21:
      return S.Array(__S(1044, __c32, 20));
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
          OriginSnapshot: S.optional(__S(1039, __c32, 15)),
          ReadOnly: S.optional(S.Boolean),
          NfsExports: S.optional(__S(1043, __c32, 19)),
          UserAndGroupQuotas: S.optional(__S(1045, __c32, 21)),
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
          OntapConfiguration: S.optional(__S(1038, __c32, 14)),
          ResourceARN: S.optional(S.String),
          Tags: S.optional(__S(833, __c26, 1)),
          VolumeId: S.optional(S.String),
          VolumeType: S.optional(S.String),
          LifecycleTransitionReason: S.optional(__S(801, __c25, 1)),
          AdministrativeActions: S.optional(
            S.suspend(() => __S(1051, __c32, 27)).annotate({ identifier: "AdministrativeActions" }),
          ),
          OpenZFSConfiguration: S.optional(__S(1046, __c32, 22)),
        }),
      ).annotate({ identifier: "Volume" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          SizeInMegabytes: S.optional(S.Number),
          SnapmirrorLabel: S.optional(S.String),
          ExpiryTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SnaplockExpiryTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UUID: S.optional(S.String),
        }),
      ).annotate({ identifier: "OntapSnapshotConfiguration" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          ResourceARN: S.optional(S.String),
          SnapshotId: S.optional(S.String),
          Name: S.optional(S.String),
          VolumeId: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Lifecycle: S.optional(S.String),
          SnapshotType: S.optional(S.String),
          LifecycleTransitionReason: S.optional(__S(801, __c25, 1)),
          Tags: S.optional(__S(833, __c26, 1)),
          AdministrativeActions: S.optional(
            S.suspend(() => __S(1051, __c32, 27)).annotate({ identifier: "AdministrativeActions" }),
          ),
          OntapConfiguration: S.optional(__S(1048, __c32, 24)),
        }),
      ).annotate({ identifier: "Snapshot" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          AdministrativeActionType: S.optional(S.String),
          ProgressPercent: S.optional(S.Number),
          RequestTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          TargetFileSystemValues: S.optional(
            S.suspend((): S.Schema<FileSystem> => __S(1055, __c32, 31)).annotate({
              identifier: "FileSystem",
            }),
          ),
          FailureDetails: S.optional(__S(864, __c27, 0)),
          TargetVolumeValues: S.optional(
            S.suspend((): S.Schema<Volume> => __S(1047, __c32, 23)).annotate({
              identifier: "Volume",
            }),
          ),
          TargetSnapshotValues: S.optional(
            S.suspend((): S.Schema<Snapshot> => __S(1049, __c32, 25)).annotate({
              identifier: "Snapshot",
            }),
          ),
          TotalTransferBytes: S.optional(S.Number),
          RemainingTransferBytes: S.optional(S.Number),
          Message: S.optional(S.String),
        }),
      ).annotate({ identifier: "AdministrativeAction" });
    case 27:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<AdministrativeAction> =>
          __S(1050, __c32, 26),
        ).annotate({ identifier: "AdministrativeAction" }),
      );
    case 28:
      return S.suspend(() =>
        S.Struct({
          Intercluster: S.optional(__S(993, __c31, 1)),
          Management: S.optional(__S(993, __c31, 1)),
        }),
      ).annotate({ identifier: "FileSystemEndpoints" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          AutomaticBackupRetentionDays: S.optional(S.Number),
          DailyAutomaticBackupStartTime: S.optional(S.String),
          DeploymentType: S.optional(S.String),
          EndpointIpAddressRange: S.optional(S.String),
          Endpoints: S.optional(__S(1052, __c32, 28)),
          DiskIopsConfiguration: S.optional(__S(1025, __c32, 1)),
          PreferredSubnetId: S.optional(S.String),
          RouteTableIds: S.optional(__S(640, __c20, 0)),
          ThroughputCapacity: S.optional(S.Number),
          WeeklyMaintenanceStartTime: S.optional(S.String),
          FsxAdminPassword: S.optional(SensitiveString),
          HAPairs: S.optional(S.Number),
          ThroughputCapacityPerHAPair: S.optional(S.Number),
          EndpointIpv6AddressRange: S.optional(S.String),
        }),
      ).annotate({ identifier: "OntapFileSystemConfiguration" });
    case 30:
      return S.suspend(() =>
        S.Struct({
          AutomaticBackupRetentionDays: S.optional(S.Number),
          CopyTagsToBackups: S.optional(S.Boolean),
          CopyTagsToVolumes: S.optional(S.Boolean),
          DailyAutomaticBackupStartTime: S.optional(S.String),
          DeploymentType: S.optional(S.String),
          ThroughputCapacity: S.optional(S.Number),
          WeeklyMaintenanceStartTime: S.optional(S.String),
          DiskIopsConfiguration: S.optional(__S(1025, __c32, 1)),
          RootVolumeId: S.optional(S.String),
          PreferredSubnetId: S.optional(S.String),
          EndpointIpAddressRange: S.optional(S.String),
          EndpointIpv6AddressRange: S.optional(S.String),
          RouteTableIds: S.optional(__S(640, __c20, 0)),
          EndpointIpAddress: S.optional(S.String),
          EndpointIpv6Address: S.optional(S.String),
          ReadCacheConfiguration: S.optional(__S(1031, __c32, 7)),
        }),
      ).annotate({ identifier: "OpenZFSFileSystemConfiguration" });
    case 31:
      return S.suspend(() =>
        S.Struct({
          OwnerId: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FileSystemId: S.optional(S.String),
          FileSystemType: S.optional(S.String),
          Lifecycle: S.optional(S.String),
          FailureDetails: S.optional(__S(864, __c27, 0)),
          StorageCapacity: S.optional(S.Number),
          StorageType: S.optional(S.String),
          VpcId: S.optional(S.String),
          SubnetIds: S.optional(__S(640, __c20, 0)),
          NetworkInterfaceIds: S.optional(__S(640, __c20, 0)),
          DNSName: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          ResourceARN: S.optional(S.String),
          Tags: S.optional(__S(833, __c26, 1)),
          WindowsConfiguration: S.optional(__S(1027, __c32, 3)),
          LustreConfiguration: S.optional(__S(1032, __c32, 8)),
          AdministrativeActions: S.optional(
            S.suspend(() => __S(1051, __c32, 27)).annotate({ identifier: "AdministrativeActions" }),
          ),
          OntapConfiguration: S.optional(__S(1053, __c32, 29)),
          FileSystemTypeVersion: S.optional(S.String),
          OpenZFSConfiguration: S.optional(__S(1054, __c32, 30)),
          NetworkType: S.optional(S.String),
        }),
      ).annotate({ identifier: "FileSystem" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Backup: S.optional(__S(1089, __c34, 1)) })).annotate({
        identifier: "CopyBackupResponse",
      });
  }
}
function __c34(j: number): any {
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
          FailureDetails: S.optional(__S(864, __c27, 0)),
          Type: S.optional(S.String),
          ProgressPercent: S.optional(S.Number),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          KmsKeyId: S.optional(S.String),
          ResourceARN: S.optional(S.String),
          Tags: S.optional(__S(833, __c26, 1)),
          FileSystem: S.optional(__S(1055, __c32, 31)),
          DirectoryInformation: S.optional(__S(1088, __c34, 0)),
          OwnerId: S.optional(S.String),
          SourceBackupId: S.optional(S.String),
          SourceBackupRegion: S.optional(S.String),
          ResourceType: S.optional(S.String),
          Volume: S.optional(__S(1047, __c32, 23)),
          SizeInBytes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Backup" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          VolumeId: S.optional(S.String),
          SourceSnapshotARN: S.optional(S.String),
          CopyStrategy: S.optional(S.String),
          Options: S.optional(__S(896, __c28, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CopySnapshotAndUpdateVolumeRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VolumeId: S.optional(S.String),
          Lifecycle: S.optional(S.String),
          AdministrativeActions: S.optional(__S(1051, __c32, 27)),
        }),
      ).annotate({ identifier: "CopySnapshotAndUpdateVolumeResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VpcConfiguration: S.optional(__S(1223, __c38, 7)),
          Policy: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateAndAttachS3AccessPointS3Configuration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          OpenZFSConfiguration: S.optional(__S(1219, __c38, 3)),
          OntapConfiguration: S.optional(__S(1222, __c38, 6)),
          S3AccessPoint: S.optional(__S(1184, __c37, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAndAttachS3AccessPointRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ S3AccessPointAttachment: S.optional(__S(1225, __c38, 9)) }),
      ).annotate({ identifier: "CreateAndAttachS3AccessPointResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
    case 1:
      return S.suspend(() =>
        S.Struct({
          Uid: S.optional(S.Number),
          Gid: S.optional(S.Number),
          SecondaryGids: S.optional(__S(1216, __c38, 0)),
        }),
      ).annotate({ identifier: "OpenZFSPosixFileSystemUser" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), PosixUser: S.optional(__S(1217, __c38, 1)) }),
      ).annotate({ identifier: "OpenZFSFileSystemIdentity" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          VolumeId: S.optional(S.String),
          FileSystemIdentity: S.optional(__S(1218, __c38, 2)),
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
          UnixUser: S.optional(__S(1220, __c38, 4)),
          WindowsUser: S.optional(__S(1220, __c38, 4)),
        }),
      ).annotate({ identifier: "OntapFileSystemIdentity" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          VolumeId: S.optional(S.String),
          FileSystemIdentity: S.optional(__S(1221, __c38, 5)),
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
          VpcConfiguration: S.optional(__S(1223, __c38, 7)),
        }),
      ).annotate({ identifier: "S3AccessPoint" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          Lifecycle: S.optional(S.String),
          LifecycleTransitionReason: S.optional(__S(801, __c25, 1)),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Name: S.optional(S.String),
          Type: S.optional(S.String),
          OpenZFSConfiguration: S.optional(__S(1219, __c38, 3)),
          OntapConfiguration: S.optional(__S(1222, __c38, 6)),
          S3AccessPoint: S.optional(__S(1224, __c38, 8)),
        }),
      ).annotate({ identifier: "S3AccessPointAttachment" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FileSystemId: S.optional(S.String),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(833, __c26, 1)),
          VolumeId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateBackupRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          FileSystemId: S.optional(S.String),
          PeerAddresses: S.optional(__S(640, __c20, 0)),
          PassphraseSecretArn: S.optional(S.String),
          PeerClusterName: S.optional(S.String),
          AllowedSvmMode: S.optional(S.String),
          AllowedSvmIds: S.optional(__S(640, __c20, 0)),
          Tags: S.optional(__S(833, __c26, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateClusterPeerRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ClusterPeer: S.optional(__S(1345, __c42, 1)) })).annotate({
        identifier: "CreateClusterPeerResponse",
      });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ State: S.optional(S.String), InUse: S.optional(S.String) }),
      ).annotate({ identifier: "ClusterPeerAuthenticationStatus" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceARN: S.optional(S.String),
          ClusterPeerId: S.optional(S.String),
          FileSystemId: S.optional(S.String),
          Lifecycle: S.optional(S.String),
          LifecycleTransitionReason: S.optional(__S(801, __c25, 1)),
          Tags: S.optional(__S(833, __c26, 1)),
          PeerAddresses: S.optional(__S(640, __c20, 0)),
          PeerClusterName: S.optional(S.String),
          PassphraseSecretArn: S.optional(S.String),
          AllowedSvmMode: S.optional(S.String),
          AllowedSvmIds: S.optional(__S(640, __c20, 0)),
          Status: S.optional(S.String),
          UUID: S.optional(S.String),
          AuthenticationStatus: S.optional(__S(1344, __c42, 0)),
        }),
      ).annotate({ identifier: "ClusterPeer" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FileSystemId: S.optional(S.String),
          FileSystemPath: S.optional(S.String),
          DataRepositoryPath: S.optional(S.String),
          BatchImportMetaDataOnCreate: S.optional(S.Boolean),
          ImportedFileChunkSize: S.optional(S.Number),
          S3: S.optional(__S(1441, __c45, 1)),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(833, __c26, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDataRepositoryAssociationRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Association: S.optional(__S(1443, __c45, 3)) })).annotate({
        identifier: "CreateDataRepositoryAssociationResponse",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Events: S.optional(__S(896, __c28, 0)) })).annotate({
        identifier: "AutoImportPolicy",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AutoImportPolicy: S.optional(__S(1440, __c45, 0)),
          AutoExportPolicy: S.optional(__S(1440, __c45, 0)),
        }),
      ).annotate({ identifier: "S3DataRepositoryConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Version: S.optional(S.String),
          DnsIps: S.optional(__S(640, __c20, 0)),
          AutoExportPolicy: S.optional(__S(1440, __c45, 0)),
        }),
      ).annotate({ identifier: "NFSDataRepositoryConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          AssociationId: S.optional(S.String),
          ResourceARN: S.optional(S.String),
          FileSystemId: S.optional(S.String),
          Lifecycle: S.optional(S.String),
          FailureDetails: S.optional(__S(864, __c27, 0)),
          FileSystemPath: S.optional(S.String),
          DataRepositoryPath: S.optional(S.String),
          BatchImportMetaDataOnCreate: S.optional(S.Boolean),
          ImportedFileChunkSize: S.optional(S.Number),
          S3: S.optional(__S(1441, __c45, 1)),
          Tags: S.optional(__S(833, __c26, 1)),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FileCacheId: S.optional(S.String),
          FileCachePath: S.optional(S.String),
          DataRepositorySubdirectories: S.optional(__S(640, __c20, 0)),
          NFS: S.optional(__S(1442, __c45, 2)),
        }),
      ).annotate({ identifier: "DataRepositoryAssociation" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          Paths: S.optional(__S(640, __c20, 0)),
          FileSystemId: S.optional(S.String),
          Report: S.optional(__S(1504, __c47, 0)),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(833, __c26, 1)),
          CapacityToRelease: S.optional(S.Number),
          ReleaseConfiguration: S.optional(__S(1506, __c47, 2)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDataRepositoryTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DataRepositoryTask: S.optional(__S(1508, __c47, 4)) }),
      ).annotate({ identifier: "CreateDataRepositoryTaskResponse" });
  }
}
function __c47(j: number): any {
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
        S.Struct({ DurationSinceLastAccess: S.optional(__S(1505, __c47, 1)) }),
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
          Tags: S.optional(__S(833, __c26, 1)),
          FileSystemId: S.optional(S.String),
          Paths: S.optional(__S(640, __c20, 0)),
          FailureDetails: S.optional(__S(864, __c27, 0)),
          Status: S.optional(__S(1507, __c47, 3)),
          Report: S.optional(__S(1504, __c47, 0)),
          CapacityToRelease: S.optional(S.Number),
          FileCacheId: S.optional(S.String),
          ReleaseConfiguration: S.optional(__S(1506, __c47, 2)),
        }),
      ).annotate({ identifier: "DataRepositoryTask" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PerUnitStorageThroughput: S.optional(S.Number),
          DeploymentType: S.optional(S.String),
          WeeklyMaintenanceStartTime: S.optional(S.String),
          MetadataConfiguration: S.optional(__S(1568, __c49, 0)),
        }),
      ).annotate({ identifier: "CreateFileCacheLustreConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Version: S.optional(S.String), DnsIps: S.optional(__S(640, __c20, 0)) }),
      ).annotate({ identifier: "FileCacheNFSConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          FileCachePath: S.optional(S.String),
          DataRepositoryPath: S.optional(S.String),
          DataRepositorySubdirectories: S.optional(__S(640, __c20, 0)),
          NFS: S.optional(__S(1537, __c48, 1)),
        }),
      ).annotate({ identifier: "FileCacheDataRepositoryAssociation" });
    case 3:
      return S.Array(__S(1538, __c48, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          FileCacheType: S.optional(S.String),
          FileCacheTypeVersion: S.optional(S.String),
          StorageCapacity: S.optional(S.Number),
          SubnetIds: S.optional(__S(640, __c20, 0)),
          SecurityGroupIds: S.optional(__S(640, __c20, 0)),
          Tags: S.optional(__S(833, __c26, 1)),
          CopyTagsToDataRepositoryAssociations: S.optional(S.Boolean),
          KmsKeyId: S.optional(S.String),
          LustreConfiguration: S.optional(__S(1536, __c48, 0)),
          DataRepositoryAssociations: S.optional(__S(1539, __c48, 3)),
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
          FailureDetails: S.optional(__S(864, __c27, 0)),
          StorageCapacity: S.optional(S.Number),
          VpcId: S.optional(S.String),
          SubnetIds: S.optional(__S(640, __c20, 0)),
          NetworkInterfaceIds: S.optional(__S(640, __c20, 0)),
          DNSName: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          ResourceARN: S.optional(S.String),
          Tags: S.optional(__S(833, __c26, 1)),
          CopyTagsToDataRepositoryAssociations: S.optional(S.Boolean),
          LustreConfiguration: S.optional(__S(1569, __c49, 1)),
          DataRepositoryAssociationIds: S.optional(__S(640, __c20, 0)),
        }),
      ).annotate({ identifier: "FileCacheCreating" });
    case 6:
      return S.suspend(() => S.Struct({ FileCache: S.optional(__S(1541, __c48, 5)) })).annotate({
        identifier: "CreateFileCacheResponse",
      });
  }
}
function __c49(j: number): any {
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
          MetadataConfiguration: S.optional(__S(1568, __c49, 0)),
          LogConfiguration: S.optional(__S(928, __c29, 0)),
        }),
      ).annotate({ identifier: "FileCacheLustreConfiguration" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutomaticBackupRetentionDays: S.optional(S.Number),
          DailyAutomaticBackupStartTime: S.optional(S.String),
          DeploymentType: S.optional(S.String),
          EndpointIpAddressRange: S.optional(S.String),
          FsxAdminPassword: S.optional(SensitiveString),
          DiskIopsConfiguration: S.optional(__S(1025, __c32, 1)),
          PreferredSubnetId: S.optional(S.String),
          RouteTableIds: S.optional(__S(640, __c20, 0)),
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
          SubnetIds: S.optional(__S(640, __c20, 0)),
          SecurityGroupIds: S.optional(__S(640, __c20, 0)),
          Tags: S.optional(__S(833, __c26, 1)),
          KmsKeyId: S.optional(S.String),
          WindowsConfiguration: S.optional(__S(1632, __c51, 0)),
          LustreConfiguration: S.optional(__S(1633, __c51, 1)),
          OntapConfiguration: S.optional(__S(1600, __c50, 0)),
          FileSystemTypeVersion: S.optional(S.String),
          OpenZFSConfiguration: S.optional(__S(1635, __c51, 3)),
          NetworkType: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateFileSystemRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ActiveDirectoryId: S.optional(S.String),
          SelfManagedActiveDirectoryConfiguration: S.optional(__S(1696, __c53, 0)),
          DeploymentType: S.optional(S.String),
          PreferredSubnetId: S.optional(S.String),
          ThroughputCapacity: S.optional(S.Number),
          WeeklyMaintenanceStartTime: S.optional(S.String),
          DailyAutomaticBackupStartTime: S.optional(S.String),
          AutomaticBackupRetentionDays: S.optional(S.Number),
          CopyTagsToBackups: S.optional(S.Boolean),
          Aliases: S.optional(__S(640, __c20, 0)),
          AuditLogConfiguration: S.optional(__S(1024, __c32, 0)),
          DiskIopsConfiguration: S.optional(__S(1025, __c32, 1)),
          FsrmConfiguration: S.optional(__S(1026, __c32, 2)),
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
          LogConfiguration: S.optional(__S(928, __c29, 0)),
          RootSquashConfiguration: S.optional(__S(1029, __c32, 5)),
          MetadataConfiguration: S.optional(__S(1030, __c32, 6)),
          ThroughputCapacity: S.optional(S.Number),
          DataReadCacheConfiguration: S.optional(__S(1031, __c32, 7)),
        }),
      ).annotate({ identifier: "CreateFileSystemLustreConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          RecordSizeKiB: S.optional(S.Number),
          DataCompressionType: S.optional(S.String),
          NfsExports: S.optional(__S(1043, __c32, 19)),
          UserAndGroupQuotas: S.optional(__S(1045, __c32, 21)),
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
          DiskIopsConfiguration: S.optional(__S(1025, __c32, 1)),
          RootVolumeConfiguration: S.optional(__S(1634, __c51, 2)),
          PreferredSubnetId: S.optional(S.String),
          EndpointIpAddressRange: S.optional(S.String),
          EndpointIpv6AddressRange: S.optional(S.String),
          RouteTableIds: S.optional(__S(640, __c20, 0)),
          ReadCacheConfiguration: S.optional(__S(1031, __c32, 7)),
        }),
      ).annotate({ identifier: "CreateFileSystemOpenZFSConfiguration" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ FileSystem: S.optional(__S(1055, __c32, 31)) })).annotate({
        identifier: "CreateFileSystemResponse",
      });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.optional(S.String),
          OrganizationalUnitDistinguishedName: S.optional(S.String),
          FileSystemAdministratorsGroup: S.optional(S.String),
          UserName: S.optional(S.String),
          Password: S.optional(SensitiveString),
          DnsIps: S.optional(__S(640, __c20, 0)),
          DomainJoinServiceAccountSecret: S.optional(S.String),
        }),
      ).annotate({ identifier: "SelfManagedActiveDirectoryConfiguration" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupId: S.optional(S.String),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          SubnetIds: S.optional(__S(640, __c20, 0)),
          SecurityGroupIds: S.optional(__S(640, __c20, 0)),
          Tags: S.optional(__S(833, __c26, 1)),
          WindowsConfiguration: S.optional(__S(1632, __c51, 0)),
          LustreConfiguration: S.optional(__S(1633, __c51, 1)),
          StorageType: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          FileSystemTypeVersion: S.optional(S.String),
          OpenZFSConfiguration: S.optional(__S(1635, __c51, 3)),
          StorageCapacity: S.optional(S.Number),
          NetworkType: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateFileSystemFromBackupRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          FileSystemId: S.optional(S.String),
          StorageVirtualMachineId: S.optional(S.String),
          Name: S.optional(S.String),
          SnapshotCopyMode: S.optional(S.String),
          RetentionRules: S.optional(__S(1825, __c57, 1)),
          TransferSchedule: S.optional(S.String),
          NetworkCompressionEnabled: S.optional(S.Boolean),
          ThrottleInKbps: S.optional(S.Number),
          Tags: S.optional(__S(833, __c26, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateSnapmirrorPolicyRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SnapmirrorPolicy: S.optional(__S(1826, __c57, 2)) }),
      ).annotate({ identifier: "CreateSnapmirrorPolicyResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Label: S.optional(S.String),
          Count: S.optional(S.Number),
          CreationSchedule: S.optional(S.String),
        }),
      ).annotate({ identifier: "SnapmirrorPolicyRetentionRule" });
    case 1:
      return S.Array(__S(1824, __c57, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ResourceARN: S.optional(S.String),
          SnapmirrorPolicyId: S.optional(S.String),
          FileSystemId: S.optional(S.String),
          StorageVirtualMachineId: S.optional(S.String),
          Name: S.optional(S.String),
          SnapshotCopyMode: S.optional(S.String),
          RetentionRules: S.optional(__S(1825, __c57, 1)),
          TransferSchedule: S.optional(S.String),
          NetworkCompressionEnabled: S.optional(S.Boolean),
          ThrottleInKbps: S.optional(S.Number),
          Scope: S.optional(S.String),
          Lifecycle: S.optional(S.String),
          UUID: S.optional(S.String),
          LifecycleTransitionReason: S.optional(__S(801, __c25, 1)),
          Tags: S.optional(__S(833, __c26, 1)),
        }),
      ).annotate({ identifier: "SnapmirrorPolicy" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ VolumeId: S.optional(S.String) })).annotate({
        identifier: "CreateSnapmirrorDestination",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Source: S.optional(__S(1920, __c60, 0)),
          Destination: S.optional(__S(1856, __c58, 0)),
          PolicyId: S.optional(S.String),
          TransferSchedule: S.optional(S.String),
          ThrottleInKbps: S.optional(S.Number),
          Tags: S.optional(__S(833, __c26, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateSnapmirrorRelationshipRequest" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SnapmirrorRelationship: S.optional(__S(1925, __c60, 5)) }),
      ).annotate({ identifier: "CreateSnapmirrorRelationshipResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Path: S.optional(S.String) })).annotate({
        identifier: "CreateSnapmirrorSource",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ Path: S.optional(S.String), VolumeId: S.optional(S.String) }),
      ).annotate({ identifier: "SnapmirrorDestination" });
    case 2:
      return S.suspend(() =>
        S.Struct({ PolicyId: S.optional(S.String), PolicyName: S.optional(S.String) }),
      ).annotate({ identifier: "SnapmirrorRelationshipPolicy" });
    case 3:
      return S.suspend(() =>
        S.Struct({ SnapshotId: S.optional(S.String), SnapshotName: S.optional(S.String) }),
      ).annotate({ identifier: "SnapmirrorExportedSnapshot" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          State: S.optional(S.String),
          Type: S.optional(S.String),
          BytesTransferred: S.optional(S.Number),
          Duration: S.optional(S.String),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "SnapmirrorTransferState" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          ResourceARN: S.optional(S.String),
          SnapmirrorRelationshipId: S.optional(S.String),
          FileSystemId: S.optional(S.String),
          Lifecycle: S.optional(S.String),
          LifecycleTransitionReason: S.optional(__S(801, __c25, 1)),
          Tags: S.optional(__S(833, __c26, 1)),
          Source: S.optional(__S(1920, __c60, 0)),
          Destination: S.optional(__S(1921, __c60, 1)),
          SnapmirrorPolicy: S.optional(__S(1922, __c60, 2)),
          TransferSchedule: S.optional(S.String),
          ThrottleInKbps: S.optional(S.Number),
          State: S.optional(S.String),
          Healthy: S.optional(S.Boolean),
          UnhealthyReason: S.optional(S.String),
          LagTimeInMinutes: S.optional(S.Number),
          ExportedSnapshot: S.optional(__S(1923, __c60, 3)),
          TransferState: S.optional(__S(1924, __c60, 4)),
          UUID: S.optional(S.String),
        }),
      ).annotate({ identifier: "SnapmirrorRelationship" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Name: S.optional(S.String),
          VolumeId: S.optional(S.String),
          Tags: S.optional(__S(833, __c26, 1)),
          OntapConfiguration: S.optional(__S(1984, __c62, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateSnapshotRequest" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SnapmirrorLabel: S.optional(S.String),
          ExpiryTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SnaplockExpiryTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CreateOntapSnapshotConfiguration" });
    case 1:
      return S.suspend(() => S.Struct({ Snapshot: S.optional(__S(1049, __c32, 25)) })).annotate({
        identifier: "CreateSnapshotResponse",
      });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          FileSystemId: S.optional(S.String),
          StorageVirtualMachineId: S.optional(S.String),
          Name: S.optional(S.String),
          Enabled: S.optional(S.Boolean),
          Schedules: S.optional(__S(2081, __c65, 1)),
          Tags: S.optional(__S(833, __c26, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateSnapshotPolicyRequest" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SnapshotPolicy: S.optional(__S(2082, __c65, 2)) }),
      ).annotate({ identifier: "CreateSnapshotPolicyResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Count: S.optional(S.Number),
          Prefix: S.optional(S.String),
          SnapmirrorLabel: S.optional(S.String),
          RetentionPeriod: S.optional(__S(960, __c30, 0)),
        }),
      ).annotate({ identifier: "SnapshotPolicySchedule" });
    case 1:
      return S.Array(__S(2080, __c65, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ResourceARN: S.optional(S.String),
          SnapshotPolicyId: S.optional(S.String),
          FileSystemId: S.optional(S.String),
          StorageVirtualMachineId: S.optional(S.String),
          Name: S.optional(S.String),
          Enabled: S.optional(S.Boolean),
          Schedules: S.optional(__S(2081, __c65, 1)),
          Scope: S.optional(S.String),
          Lifecycle: S.optional(S.String),
          UUID: S.optional(S.String),
          LifecycleTransitionReason: S.optional(__S(801, __c25, 1)),
          Tags: S.optional(__S(833, __c26, 1)),
        }),
      ).annotate({ identifier: "SnapshotPolicy" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NetBiosName: S.optional(S.String),
          SelfManagedActiveDirectoryConfiguration: S.optional(__S(1696, __c53, 0)),
        }),
      ).annotate({ identifier: "CreateSvmActiveDirectoryConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ActiveDirectoryConfiguration: S.optional(__S(2112, __c66, 0)),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          FileSystemId: S.optional(S.String),
          Name: S.optional(S.String),
          SvmAdminPassword: S.optional(SensitiveString),
          Tags: S.optional(__S(833, __c26, 1)),
          RootVolumeSecurityStyle: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateStorageVirtualMachineRequest" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StorageVirtualMachine: S.optional(__S(2178, __c68, 2)) }),
      ).annotate({ identifier: "CreateStorageVirtualMachineResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NetBiosName: S.optional(S.String),
          SelfManagedActiveDirectoryConfiguration: S.optional(__S(992, __c31, 0)),
        }),
      ).annotate({ identifier: "SvmActiveDirectoryConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Iscsi: S.optional(__S(993, __c31, 1)),
          Management: S.optional(__S(993, __c31, 1)),
          Nfs: S.optional(__S(993, __c31, 1)),
          Smb: S.optional(__S(993, __c31, 1)),
        }),
      ).annotate({ identifier: "SvmEndpoints" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ActiveDirectoryConfiguration: S.optional(__S(2176, __c68, 0)),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Endpoints: S.optional(__S(2177, __c68, 1)),
          FileSystemId: S.optional(S.String),
          Lifecycle: S.optional(S.String),
          Name: S.optional(S.String),
          ResourceARN: S.optional(S.String),
          StorageVirtualMachineId: S.optional(S.String),
          Subtype: S.optional(S.String),
          UUID: S.optional(S.String),
          Tags: S.optional(__S(833, __c26, 1)),
          LifecycleTransitionReason: S.optional(__S(801, __c25, 1)),
          RootVolumeSecurityStyle: S.optional(S.String),
        }),
      ).annotate({ identifier: "StorageVirtualMachine" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          StorageVirtualMachineId: S.optional(S.String),
          PeerSvmName: S.optional(S.String),
          PeerClusterName: S.optional(S.String),
          Applications: S.optional(__S(896, __c28, 0)),
          PeerSvmAlias: S.optional(S.String),
          Tags: S.optional(__S(833, __c26, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateStorageVirtualMachinePeerRequest" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StorageVirtualMachinePeer: S.optional(__S(2272, __c71, 0)) }),
      ).annotate({ identifier: "CreateStorageVirtualMachinePeerResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceARN: S.optional(S.String),
          StorageVirtualMachinePeerId: S.optional(S.String),
          StorageVirtualMachineId: S.optional(S.String),
          FileSystemId: S.optional(S.String),
          Lifecycle: S.optional(S.String),
          LifecycleTransitionReason: S.optional(__S(801, __c25, 1)),
          Tags: S.optional(__S(833, __c26, 1)),
          PeerSvmName: S.optional(S.String),
          PeerSvmAlias: S.optional(S.String),
          PeerClusterName: S.optional(S.String),
          Applications: S.optional(__S(896, __c28, 0)),
          State: S.optional(S.String),
          UUID: S.optional(S.String),
        }),
      ).annotate({ identifier: "StorageVirtualMachinePeer" });
  }
}
function __c72(j: number): any {
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
          OriginSnapshot: S.optional(__S(1039, __c32, 15)),
          ReadOnly: S.optional(S.Boolean),
          NfsExports: S.optional(__S(1043, __c32, 19)),
          UserAndGroupQuotas: S.optional(__S(1045, __c32, 21)),
        }),
      ).annotate({ identifier: "CreateOpenZFSVolumeConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          VolumeType: S.optional(S.String),
          Name: S.optional(S.String),
          OntapConfiguration: S.optional(__S(2337, __c73, 1)),
          Tags: S.optional(__S(833, __c26, 1)),
          OpenZFSConfiguration: S.optional(__S(2304, __c72, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateVolumeRequest" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Aggregates: S.optional(__S(640, __c20, 0)),
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
          TieringPolicy: S.optional(__S(1033, __c32, 9)),
          OntapVolumeType: S.optional(S.String),
          SnapshotPolicy: S.optional(S.String),
          CopyTagsToBackups: S.optional(S.Boolean),
          SnaplockConfiguration: S.optional(__S(1035, __c32, 11)),
          VolumeStyle: S.optional(S.String),
          AggregateConfiguration: S.optional(__S(2336, __c73, 0)),
          SizeInBytes: S.optional(S.Number),
          CloneConfiguration: S.optional(__S(1037, __c32, 13)),
        }),
      ).annotate({ identifier: "CreateOntapVolumeConfiguration" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Volume: S.optional(__S(1047, __c32, 23)) })).annotate({
        identifier: "CreateVolumeResponse",
      });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupId: S.optional(S.String),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Name: S.optional(S.String),
          OntapConfiguration: S.optional(__S(2337, __c73, 1)),
          Tags: S.optional(__S(833, __c26, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateVolumeFromBackupRequest" });
  }
}
function __c76(j: number): any {
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
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          ClusterPeerId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteClusterPeerRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ClusterPeerId: S.optional(S.String), Lifecycle: S.optional(S.String) }),
      ).annotate({ identifier: "DeleteClusterPeerResponse" });
  }
}
function __c78(j: number): any {
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
function __c79(j: number): any {
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
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SkipFinalBackup: S.optional(S.Boolean),
          FinalBackupTags: S.optional(__S(833, __c26, 1)),
        }),
      ).annotate({ identifier: "DeleteFileSystemWindowsConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SkipFinalBackup: S.optional(S.Boolean),
          FinalBackupTags: S.optional(__S(833, __c26, 1)),
          Options: S.optional(__S(896, __c28, 0)),
        }),
      ).annotate({ identifier: "DeleteFileSystemOpenZFSConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          FileSystemId: S.optional(S.String),
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          WindowsConfiguration: S.optional(__S(2560, __c80, 0)),
          LustreConfiguration: S.optional(__S(2560, __c80, 0)),
          OpenZFSConfiguration: S.optional(__S(2561, __c80, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteFileSystemRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          FileSystemId: S.optional(S.String),
          Lifecycle: S.optional(S.String),
          WindowsResponse: S.optional(__S(2592, __c81, 0)),
          LustreResponse: S.optional(__S(2592, __c81, 0)),
          OpenZFSResponse: S.optional(__S(2592, __c81, 0)),
        }),
      ).annotate({ identifier: "DeleteFileSystemResponse" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FinalBackupId: S.optional(S.String),
          FinalBackupTags: S.optional(__S(833, __c26, 1)),
        }),
      ).annotate({ identifier: "DeleteFileSystemWindowsResponse" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          SnapmirrorPolicyId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteSnapmirrorPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ SnapmirrorPolicyId: S.optional(S.String), Lifecycle: S.optional(S.String) }),
      ).annotate({ identifier: "DeleteSnapmirrorPolicyResponse" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          SnapmirrorRelationshipId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteSnapmirrorRelationshipRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SnapmirrorRelationshipId: S.optional(S.String),
          Lifecycle: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteSnapmirrorRelationshipResponse" });
  }
}
function __c84(j: number): any {
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
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          SnapshotPolicyId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteSnapshotPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ SnapshotPolicyId: S.optional(S.String), Lifecycle: S.optional(S.String) }),
      ).annotate({ identifier: "DeleteSnapshotPolicyResponse" });
  }
}
function __c86(j: number): any {
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
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          StorageVirtualMachinePeerId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteStorageVirtualMachinePeerRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StorageVirtualMachinePeerId: S.optional(S.String),
          Lifecycle: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteStorageVirtualMachinePeerResponse" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SkipFinalBackup: S.optional(S.Boolean),
          FinalBackupTags: S.optional(__S(833, __c26, 1)),
          BypassSnaplockEnterpriseRetention: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DeleteVolumeOntapConfiguration" });
    case 1:
      return S.suspend(() => S.Struct({ Options: S.optional(__S(896, __c28, 0)) })).annotate({
        identifier: "DeleteVolumeOpenZFSConfiguration",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          VolumeId: S.optional(S.String),
          OntapConfiguration: S.optional(__S(2816, __c88, 0)),
          OpenZFSConfiguration: S.optional(__S(2817, __c88, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteVolumeRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          VolumeId: S.optional(S.String),
          Lifecycle: S.optional(S.String),
          OntapResponse: S.optional(__S(2592, __c81, 0)),
        }),
      ).annotate({ identifier: "DeleteVolumeResponse" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackupIds: S.optional(__S(640, __c20, 0)),
          Filters: S.optional(__S(2881, __c90, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeBackupsRequest" });
    case 1:
      return S.Array(__S(1089, __c34, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ Backups: S.optional(__S(2849, __c89, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeBackupsResponse" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Values: S.optional(__S(640, __c20, 0)) }),
      ).annotate({ identifier: "Filter" });
    case 1:
      return S.Array(__S(2880, __c90, 0));
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterPeerIds: S.optional(__S(640, __c20, 0)),
          Filters: S.optional(__S(2881, __c90, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeClusterPeersRequest" });
    case 1:
      return S.Array(__S(1345, __c42, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ClusterPeers: S.optional(__S(2913, __c91, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeClusterPeersResponse" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AssociationIds: S.optional(__S(640, __c20, 0)),
          Filters: S.optional(__S(2881, __c90, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDataRepositoryAssociationsRequest" });
    case 1:
      return S.Array(__S(1443, __c45, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Associations: S.optional(__S(2945, __c92, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeDataRepositoryAssociationsResponse" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TaskIds: S.optional(__S(640, __c20, 0)),
          Filters: S.optional(__S(2881, __c90, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDataRepositoryTasksRequest" });
    case 1:
      return S.Array(__S(1508, __c47, 4));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DataRepositoryTasks: S.optional(__S(2977, __c93, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeDataRepositoryTasksResponse" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FileCacheIds: S.optional(__S(640, __c20, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeFileCachesRequest" });
    case 1:
      return S.Array(__S(3040, __c95, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ FileCaches: S.optional(__S(3009, __c94, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeFileCachesResponse" });
  }
}
function __c95(j: number): any {
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
          FailureDetails: S.optional(__S(864, __c27, 0)),
          StorageCapacity: S.optional(S.Number),
          VpcId: S.optional(S.String),
          SubnetIds: S.optional(__S(640, __c20, 0)),
          NetworkInterfaceIds: S.optional(__S(640, __c20, 0)),
          DNSName: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          ResourceARN: S.optional(S.String),
          LustreConfiguration: S.optional(__S(1569, __c49, 1)),
          DataRepositoryAssociationIds: S.optional(__S(640, __c20, 0)),
        }),
      ).annotate({ identifier: "FileCache" });
  }
}
function __c96(j: number): any {
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
        S.Struct({ Aliases: S.optional(__S(673, __c21, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeFileSystemAliasesResponse" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FileSystemIds: S.optional(__S(640, __c20, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeFileSystemsRequest" });
    case 1:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<FileSystem> => __S(1055, __c32, 31)).annotate({
          identifier: "FileSystem",
        }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({ FileSystems: S.optional(__S(3105, __c97, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeFileSystemsResponse" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Names: S.optional(__S(640, __c20, 0)),
          Filters: S.optional(__S(2881, __c90, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeS3AccessPointAttachmentsRequest" });
    case 1:
      return S.Array(__S(1225, __c38, 9));
    case 2:
      return S.suspend(() =>
        S.Struct({
          S3AccessPointAttachments: S.optional(__S(3137, __c98, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeS3AccessPointAttachmentsResponse" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeSharedVpcConfigurationRequest" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EnableFsxRouteTableUpdatesFromParticipantAccounts: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeSharedVpcConfigurationResponse" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SnapmirrorPolicyIds: S.optional(__S(640, __c20, 0)),
          Filters: S.optional(__S(2881, __c90, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeSnapmirrorPoliciesRequest" });
    case 1:
      return S.Array(__S(1826, __c57, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          SnapmirrorPolicies: S.optional(__S(3233, __c101, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeSnapmirrorPoliciesResponse" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SnapmirrorRelationshipIds: S.optional(__S(640, __c20, 0)),
          Filters: S.optional(__S(2881, __c90, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeSnapmirrorRelationshipsRequest" });
    case 1:
      return S.Array(__S(1925, __c60, 5));
    case 2:
      return S.suspend(() =>
        S.Struct({
          SnapmirrorRelationships: S.optional(__S(3265, __c102, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeSnapmirrorRelationshipsResponse" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SnapshotPolicyIds: S.optional(__S(640, __c20, 0)),
          Filters: S.optional(__S(2881, __c90, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeSnapshotPoliciesRequest" });
    case 1:
      return S.Array(__S(2082, __c65, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          SnapshotPolicies: S.optional(__S(3297, __c103, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeSnapshotPoliciesResponse" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SnapshotIds: S.optional(__S(640, __c20, 0)),
          Filters: S.optional(__S(2881, __c90, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          IncludeShared: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeSnapshotsRequest" });
    case 1:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<Snapshot> => __S(1049, __c32, 25)).annotate({
          identifier: "Snapshot",
        }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({ Snapshots: S.optional(__S(3329, __c104, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeSnapshotsResponse" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StorageVirtualMachinePeerIds: S.optional(__S(640, __c20, 0)),
          Filters: S.optional(__S(2881, __c90, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeStorageVirtualMachinePeersRequest" });
    case 1:
      return S.Array(__S(2272, __c71, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          StorageVirtualMachinePeers: S.optional(__S(3361, __c105, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeStorageVirtualMachinePeersResponse" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StorageVirtualMachineIds: S.optional(__S(640, __c20, 0)),
          Filters: S.optional(__S(2881, __c90, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeStorageVirtualMachinesRequest" });
    case 1:
      return S.Array(__S(2178, __c68, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          StorageVirtualMachines: S.optional(__S(3393, __c106, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeStorageVirtualMachinesResponse" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VolumeIds: S.optional(__S(640, __c20, 0)),
          Filters: S.optional(__S(2881, __c90, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeVolumesRequest" });
    case 1:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<Volume> => __S(1047, __c32, 23)).annotate({
          identifier: "Volume",
        }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({ Volumes: S.optional(__S(3425, __c107, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeVolumesResponse" });
  }
}
function __c108(j: number): any {
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
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          FileSystemId: S.optional(S.String),
          Aliases: S.optional(__S(640, __c20, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisassociateFileSystemAliasesRequest" });
  }
}
function __c110(j: number): any {
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
        S.Struct({ Tags: S.optional(__S(833, __c26, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
