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
  sdkId: "EFS",
  target: "MagnolioAPIService_v20150201",
  version: "2015-02-01",
  sigv4: "elasticfilesystem",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
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
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://efs.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e(
              `https://efs-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-cn" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://efs.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-cn" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e(
              `https://efs-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              `https://efs.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === true &&
            UseDualStack === true
          ) {
            return e(
              `https://efs-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://elasticfilesystem-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true && UseDualStack === false) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://elasticfilesystem-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://elasticfilesystem.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://elasticfilesystem.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessPointAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "AccessPointAlreadyExists",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{
    readonly ErrorCode: string;
    readonly message?: string;
    readonly AccessPointId: string;
  }> {}
export class AccessPointLimitExceeded
  extends /*@__PURE__*/ TE.TaggedError(
    "AccessPointLimitExceeded",
    ["AuthError", "ThrottlingError"],
    { status: 403 },
  )<{ readonly ErrorCode: string; readonly message?: string }> {}
export class AccessPointNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "AccessPointNotFound",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly ErrorCode: string; readonly message?: string }> {}
export class AvailabilityZonesMismatch
  extends /*@__PURE__*/ TE.TaggedError(
    "AvailabilityZonesMismatch",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly ErrorCode?: string; readonly message?: string }> {}
export class BadRequest
  extends /*@__PURE__*/ TE.TaggedError("BadRequest", ["BadRequestError"], {
    status: 400,
  })<{ readonly ErrorCode: string; readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly ErrorCode?: string; readonly message?: string }> {}
export class DependencyTimeout
  extends /*@__PURE__*/ TE.TaggedError("DependencyTimeout", ["TimeoutError"], {
    status: 504,
  })<{ readonly ErrorCode: string; readonly message?: string }> {}
export class FileSystemAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "FileSystemAlreadyExists",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{
    readonly ErrorCode: string;
    readonly message?: string;
    readonly FileSystemId: string;
  }> {}
export class FileSystemInUse
  extends /*@__PURE__*/ TE.TaggedError(
    "FileSystemInUse",
    ["ConflictError", "DependencyViolationError"],
    { status: 409 },
  )<{ readonly ErrorCode: string; readonly message?: string }> {}
export class FileSystemLimitExceeded
  extends /*@__PURE__*/ TE.TaggedError(
    "FileSystemLimitExceeded",
    ["AuthError", "ThrottlingError"],
    { status: 403 },
  )<{ readonly ErrorCode: string; readonly message?: string }> {}
export class FileSystemNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "FileSystemNotFound",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly ErrorCode: string; readonly message?: string }> {}
export class IncorrectFileSystemLifeCycleState
  extends /*@__PURE__*/ TE.TaggedError(
    "IncorrectFileSystemLifeCycleState",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly ErrorCode: string; readonly message?: string }> {}
export class IncorrectMountTargetState
  extends /*@__PURE__*/ TE.TaggedError(
    "IncorrectMountTargetState",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly ErrorCode: string; readonly message?: string }> {}
export class InsufficientThroughputCapacity
  extends /*@__PURE__*/ TE.TaggedError(
    "InsufficientThroughputCapacity",
    ["ServerError"],
    { status: 503 },
  )<{ readonly ErrorCode: string; readonly message?: string }> {}
export class InternalServerError
  extends /*@__PURE__*/ TE.TaggedError("InternalServerError", ["ServerError"], {
    status: 500,
  })<{ readonly ErrorCode: string; readonly message?: string }> {}
export class InvalidPolicyException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidPolicyException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly ErrorCode?: string; readonly message?: string }> {}
export class IpAddressInUse
  extends /*@__PURE__*/ TE.TaggedError(
    "IpAddressInUse",
    ["ConflictError", "DependencyViolationError"],
    { status: 409 },
  )<{ readonly ErrorCode: string; readonly message?: string }> {}
export class MountTargetConflict
  extends /*@__PURE__*/ TE.TaggedError(
    "MountTargetConflict",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly ErrorCode: string; readonly message?: string }> {}
export class MountTargetNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "MountTargetNotFound",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly ErrorCode: string; readonly message?: string }> {}
export class NetworkInterfaceLimitExceeded
  extends /*@__PURE__*/ TE.TaggedError(
    "NetworkInterfaceLimitExceeded",
    ["ConflictError", "ThrottlingError"],
    { status: 409 },
  )<{ readonly ErrorCode: string; readonly message?: string }> {}
export class NoFreeAddressesInSubnet
  extends /*@__PURE__*/ TE.TaggedError(
    "NoFreeAddressesInSubnet",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly ErrorCode: string; readonly message?: string }> {}
export class PolicyNotFound
  extends /*@__PURE__*/ TE.TaggedError("PolicyNotFound", ["BadRequestError"], {
    status: 404,
  })<{ readonly ErrorCode?: string; readonly message?: string }> {}
export class ReplicationAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "ReplicationAlreadyExists",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly ErrorCode?: string; readonly message?: string }> {}
export class ReplicationNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "ReplicationNotFound",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly ErrorCode?: string; readonly message?: string }> {}
export class SecurityGroupLimitExceeded
  extends /*@__PURE__*/ TE.TaggedError(
    "SecurityGroupLimitExceeded",
    ["BadRequestError", "ThrottlingError"],
    { status: 400 },
  )<{ readonly ErrorCode: string; readonly message?: string }> {}
export class SecurityGroupNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "SecurityGroupNotFound",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly ErrorCode: string; readonly message?: string }> {}
export class SubnetNotFound
  extends /*@__PURE__*/ TE.TaggedError("SubnetNotFound", ["BadRequestError"], {
    status: 400,
  })<{ readonly ErrorCode: string; readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly ErrorCode?: string; readonly message?: string }> {}
export class ThroughputLimitExceeded
  extends /*@__PURE__*/ TE.TaggedError(
    "ThroughputLimitExceeded",
    ["BadRequestError", "ThrottlingError"],
    { status: 400 },
  )<{ readonly ErrorCode: string; readonly message?: string }> {}
export class TooManyRequests
  extends /*@__PURE__*/ TE.TaggedError("TooManyRequests", ["ThrottlingError"], {
    status: 429,
  })<{ readonly ErrorCode: string; readonly message?: string }> {}
export class UnsupportedAvailabilityZone
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedAvailabilityZone",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly ErrorCode: string; readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly ErrorCode: string; readonly message?: string }> {}
export type ClientToken = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type Tags = Tag[];
export type FileSystemId = string;
export type Uid = number;
export type Gid = number;
export type SecondaryGids = number[];
export interface PosixUser {
  Uid: number;
  Gid: number;
  SecondaryGids?: number[];
}
export type Path = string;
export type OwnerUid = number;
export type OwnerGid = number;
export type Permissions = string;
export interface CreationInfo {
  OwnerUid: number;
  OwnerGid: number;
  Permissions: string;
}
export interface RootDirectory {
  Path?: string;
  CreationInfo?: CreationInfo;
}
export interface CreateAccessPointRequest {
  ClientToken: string;
  Tags?: Tag[];
  FileSystemId: string;
  PosixUser?: PosixUser;
  RootDirectory?: RootDirectory;
}
export type Name = string;
export type AccessPointId = string;
export type AccessPointArn = string;
export type AwsAccountId = string;
export type LifeCycleState =
  | "creating"
  | "available"
  | "updating"
  | "deleting"
  | "deleted"
  | "error"
  | (string & {});
export interface AccessPointDescription {
  ClientToken?: string;
  Name?: string;
  Tags?: Tag[];
  AccessPointId?: string;
  AccessPointArn?: string;
  FileSystemId?: string;
  PosixUser?: PosixUser;
  RootDirectory?: RootDirectory;
  OwnerId?: string;
  LifeCycleState?: LifeCycleState;
}
export type CreationToken = string;
export type PerformanceMode = "generalPurpose" | "maxIO" | (string & {});
export type Encrypted = boolean;
export type KmsKeyId = string;
export type ThroughputMode =
  | "bursting"
  | "provisioned"
  | "elastic"
  | (string & {});
export type ProvisionedThroughputInMibps = number;
export type AvailabilityZoneName = string;
export type Backup = boolean;
export interface CreateFileSystemRequest {
  CreationToken: string;
  PerformanceMode?: PerformanceMode;
  Encrypted?: boolean;
  KmsKeyId?: string;
  ThroughputMode?: ThroughputMode;
  ProvisionedThroughputInMibps?: number;
  AvailabilityZoneName?: string;
  Backup?: boolean;
  Tags?: Tag[];
}
export type FileSystemArn = string;
export type MountTargetCount = number;
export type FileSystemSizeValue = number;
export type FileSystemNullableSizeValue = number;
export interface FileSystemSize {
  Value: number;
  Timestamp?: Date;
  ValueInIA?: number;
  ValueInStandard?: number;
  ValueInArchive?: number;
}
export type AvailabilityZoneId = string;
export type ReplicationOverwriteProtection =
  | "ENABLED"
  | "DISABLED"
  | "REPLICATING"
  | (string & {});
export interface FileSystemProtectionDescription {
  ReplicationOverwriteProtection?: ReplicationOverwriteProtection;
}
export interface FileSystemDescription {
  OwnerId: string;
  CreationToken: string;
  FileSystemId: string;
  FileSystemArn?: string;
  CreationTime: Date;
  LifeCycleState: LifeCycleState;
  Name?: string;
  NumberOfMountTargets: number;
  SizeInBytes: FileSystemSize;
  PerformanceMode: PerformanceMode;
  Encrypted?: boolean;
  KmsKeyId?: string;
  ThroughputMode?: ThroughputMode;
  ProvisionedThroughputInMibps?: number;
  AvailabilityZoneName?: string;
  AvailabilityZoneId?: string;
  Tags: Tag[];
  FileSystemProtection?: FileSystemProtectionDescription;
}
export type SubnetId = string;
export type IpAddress = string;
export type Ipv6Address = string;
export type IpAddressType =
  | "IPV4_ONLY"
  | "IPV6_ONLY"
  | "DUAL_STACK"
  | (string & {});
export type SecurityGroup = string;
export type SecurityGroups = string[];
export interface CreateMountTargetRequest {
  FileSystemId: string;
  SubnetId: string;
  IpAddress?: string;
  Ipv6Address?: string;
  IpAddressType?: IpAddressType;
  SecurityGroups?: string[];
}
export type MountTargetId = string;
export type NetworkInterfaceId = string;
export type VpcId = string;
export interface MountTargetDescription {
  OwnerId?: string;
  MountTargetId: string;
  FileSystemId: string;
  SubnetId: string;
  LifeCycleState: LifeCycleState;
  IpAddress?: string;
  Ipv6Address?: string;
  NetworkInterfaceId?: string;
  AvailabilityZoneId?: string;
  AvailabilityZoneName?: string;
  VpcId?: string;
}
export type RegionName = string;
export type RoleArn = string;
export interface DestinationToCreate {
  Region?: string;
  AvailabilityZoneName?: string;
  KmsKeyId?: string;
  FileSystemId?: string;
  RoleArn?: string;
}
export type DestinationsToCreate = DestinationToCreate[];
export interface CreateReplicationConfigurationRequest {
  SourceFileSystemId: string;
  Destinations: DestinationToCreate[];
}
export type ReplicationStatus =
  | "ENABLED"
  | "ENABLING"
  | "DELETING"
  | "ERROR"
  | "PAUSED"
  | "PAUSING"
  | (string & {});
export type StatusMessage = string;
export interface Destination {
  Status: ReplicationStatus;
  FileSystemId: string;
  Region: string;
  LastReplicatedTimestamp?: Date;
  OwnerId?: string;
  StatusMessage?: string;
  RoleArn?: string;
}
export type Destinations = Destination[];
export interface ReplicationConfigurationDescription {
  SourceFileSystemId: string;
  SourceFileSystemRegion: string;
  SourceFileSystemArn: string;
  OriginalSourceFileSystemArn: string;
  CreationTime: Date;
  Destinations: Destination[];
  SourceFileSystemOwnerId?: string;
}
export interface CreateTagsRequest {
  FileSystemId: string;
  Tags: Tag[];
}
export interface CreateTagsResponse {}
export interface DeleteAccessPointRequest {
  AccessPointId: string;
}
export interface DeleteAccessPointResponse {}
export interface DeleteFileSystemRequest {
  FileSystemId: string;
}
export interface DeleteFileSystemResponse {}
export interface DeleteFileSystemPolicyRequest {
  FileSystemId: string;
}
export interface DeleteFileSystemPolicyResponse {}
export interface DeleteMountTargetRequest {
  MountTargetId: string;
}
export interface DeleteMountTargetResponse {}
export type DeletionMode =
  | "ALL_CONFIGURATIONS"
  | "LOCAL_CONFIGURATION_ONLY"
  | (string & {});
export interface DeleteReplicationConfigurationRequest {
  SourceFileSystemId: string;
  DeletionMode?: DeletionMode;
}
export interface DeleteReplicationConfigurationResponse {}
export type TagKeys = string[];
export interface DeleteTagsRequest {
  FileSystemId: string;
  TagKeys: string[];
}
export interface DeleteTagsResponse {}
export type MaxResults = number;
export type Token = string;
export interface DescribeAccessPointsRequest {
  MaxResults?: number;
  NextToken?: string;
  AccessPointId?: string;
  FileSystemId?: string;
}
export type AccessPointDescriptions = AccessPointDescription[];
export interface DescribeAccessPointsResponse {
  AccessPoints?: AccessPointDescription[];
  NextToken?: string;
}
export interface DescribeAccountPreferencesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export type ResourceIdType = "LONG_ID" | "SHORT_ID" | (string & {});
export type Resource = "FILE_SYSTEM" | "MOUNT_TARGET" | (string & {});
export type Resources = Resource[];
export interface ResourceIdPreference {
  ResourceIdType?: ResourceIdType;
  Resources?: Resource[];
}
export interface DescribeAccountPreferencesResponse {
  ResourceIdPreference?: ResourceIdPreference;
  NextToken?: string;
}
export interface DescribeBackupPolicyRequest {
  FileSystemId: string;
}
export type Status =
  | "ENABLED"
  | "ENABLING"
  | "DISABLED"
  | "DISABLING"
  | (string & {});
export interface BackupPolicy {
  Status: Status;
}
export interface BackupPolicyDescription {
  BackupPolicy?: BackupPolicy;
}
export interface DescribeFileSystemPolicyRequest {
  FileSystemId: string;
}
export type Policy = string;
export interface FileSystemPolicyDescription {
  FileSystemId?: string;
  Policy?: string;
}
export type MaxItems = number;
export type Marker = string;
export interface DescribeFileSystemsRequest {
  MaxItems?: number;
  Marker?: string;
  CreationToken?: string;
  FileSystemId?: string;
}
export type FileSystemDescriptions = FileSystemDescription[];
export interface DescribeFileSystemsResponse {
  Marker?: string;
  FileSystems?: FileSystemDescription[];
  NextMarker?: string;
}
export interface DescribeLifecycleConfigurationRequest {
  FileSystemId: string;
}
export type TransitionToIARules =
  | "AFTER_7_DAYS"
  | "AFTER_14_DAYS"
  | "AFTER_30_DAYS"
  | "AFTER_60_DAYS"
  | "AFTER_90_DAYS"
  | "AFTER_1_DAY"
  | "AFTER_180_DAYS"
  | "AFTER_270_DAYS"
  | "AFTER_365_DAYS"
  | (string & {});
export type TransitionToPrimaryStorageClassRules =
  | "AFTER_1_ACCESS"
  | (string & {});
export type TransitionToArchiveRules =
  | "AFTER_1_DAY"
  | "AFTER_7_DAYS"
  | "AFTER_14_DAYS"
  | "AFTER_30_DAYS"
  | "AFTER_60_DAYS"
  | "AFTER_90_DAYS"
  | "AFTER_180_DAYS"
  | "AFTER_270_DAYS"
  | "AFTER_365_DAYS"
  | (string & {});
export interface LifecyclePolicy {
  TransitionToIA?: TransitionToIARules;
  TransitionToPrimaryStorageClass?: TransitionToPrimaryStorageClassRules;
  TransitionToArchive?: TransitionToArchiveRules;
}
export type LifecyclePolicies = LifecyclePolicy[];
export interface LifecycleConfigurationDescription {
  LifecyclePolicies?: LifecyclePolicy[];
}
export interface DescribeMountTargetsRequest {
  MaxItems?: number;
  Marker?: string;
  FileSystemId?: string;
  MountTargetId?: string;
  AccessPointId?: string;
}
export type MountTargetDescriptions = MountTargetDescription[];
export interface DescribeMountTargetsResponse {
  Marker?: string;
  MountTargets?: MountTargetDescription[];
  NextMarker?: string;
}
export interface DescribeMountTargetSecurityGroupsRequest {
  MountTargetId: string;
}
export interface DescribeMountTargetSecurityGroupsResponse {
  SecurityGroups: string[];
}
export interface DescribeReplicationConfigurationsRequest {
  FileSystemId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type ReplicationConfigurationDescriptions =
  ReplicationConfigurationDescription[];
export interface DescribeReplicationConfigurationsResponse {
  Replications?: ReplicationConfigurationDescription[];
  NextToken?: string;
}
export interface DescribeTagsRequest {
  MaxItems?: number;
  Marker?: string;
  FileSystemId: string;
}
export interface DescribeTagsResponse {
  Marker?: string;
  Tags: Tag[];
  NextMarker?: string;
}
export type ResourceId = string;
export interface ListTagsForResourceRequest {
  ResourceId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
  NextToken?: string;
}
export interface ModifyMountTargetSecurityGroupsRequest {
  MountTargetId: string;
  SecurityGroups?: string[];
}
export interface ModifyMountTargetSecurityGroupsResponse {}
export interface PutAccountPreferencesRequest {
  ResourceIdType: ResourceIdType;
}
export interface PutAccountPreferencesResponse {
  ResourceIdPreference?: ResourceIdPreference;
}
export interface PutBackupPolicyRequest {
  FileSystemId: string;
  BackupPolicy: BackupPolicy;
}
export type BypassPolicyLockoutSafetyCheck = boolean;
export interface PutFileSystemPolicyRequest {
  FileSystemId: string;
  Policy: string;
  BypassPolicyLockoutSafetyCheck?: boolean;
}
export interface PutLifecycleConfigurationRequest {
  FileSystemId: string;
  LifecyclePolicies: LifecyclePolicy[];
}
export interface TagResourceRequest {
  ResourceId: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export interface UntagResourceRequest {
  ResourceId: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateFileSystemRequest {
  FileSystemId: string;
  ThroughputMode?: ThroughputMode;
  ProvisionedThroughputInMibps?: number;
}
export interface UpdateFileSystemProtectionRequest {
  FileSystemId: string;
  ReplicationOverwriteProtection?: ReplicationOverwriteProtection;
}
export type ErrorCode = string;
export type ErrorMessage = string;
export type CreateAccessPointError =
  | AccessPointAlreadyExists
  | AccessPointLimitExceeded
  | BadRequest
  | FileSystemNotFound
  | IncorrectFileSystemLifeCycleState
  | InternalServerError
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an EFS access point. An access point is an application-specific view
 * into an EFS file system that applies an operating system user and group, and a file
 * system path, to any file system request made through the access point. The operating system
 * user and group override any identity information provided by the NFS client. The file system
 * path is exposed as the access point's root directory. Applications using the access point can
 * only access data in the application's own directory and any subdirectories. A file system can
 * have a maximum of 10,000 access points unless you request an increase. To learn more, see
 * Mounting a file
 * system using EFS access points.
 *
 * If multiple requests to create access points on the same file system are sent in quick
 * succession, and the file system is near the limit of access points, you may experience a
 * throttling response for these requests. This is to ensure that the file system does not
 * exceed the stated access point limit.
 *
 * This operation requires permissions for the `elasticfilesystem:CreateAccessPoint` action.
 *
 * Access points can be tagged on creation. If tags are specified in the creation action, IAM
 * performs additional authorization on the `elasticfilesystem:TagResource` action to
 * verify if users have permissions to create tags. Therefore, you must grant explicit
 * permissions to use the `elasticfilesystem:TagResource` action. For more
 * information, see Granting
 * permissions to tag resources during creation.
 */
export const createAccessPoint: API.OperationMethod<
  CreateAccessPointRequest,
  AccessPointDescription,
  CreateAccessPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-02-01/access-points",
    input: {
      ClientToken: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
      FileSystemId: 0,
      PosixUser: { Uid: 0, Gid: 0, SecondaryGids: 0 },
      RootDirectory: {
        Path: 0,
        CreationInfo: { OwnerUid: 0, OwnerGid: 0, Permissions: 0 },
      },
    },
    body: true,
  },
  errors: [
    AccessPointAlreadyExists,
    AccessPointLimitExceeded,
    BadRequest,
    FileSystemNotFound,
    IncorrectFileSystemLifeCycleState,
    InternalServerError,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessPoint",
})) as any;

export type CreateFileSystemError =
  | BadRequest
  | FileSystemAlreadyExists
  | FileSystemLimitExceeded
  | InsufficientThroughputCapacity
  | InternalServerError
  | ThroughputLimitExceeded
  | UnsupportedAvailabilityZone
  | CommonErrors;
/**
 * Creates a new, empty file system. The operation requires a creation token in the
 * request that Amazon EFS uses to ensure idempotent creation (calling the operation with same
 * creation token has no effect). If a file system does not currently exist that is owned by the
 * caller's Amazon Web Services account with the specified creation token, this operation does the
 * following:
 *
 * - Creates a new, empty file system. The file system will have an Amazon EFS assigned
 * ID, and an initial lifecycle state `creating`.
 *
 * - Returns with the description of the created file system.
 *
 * Otherwise, this operation returns a `FileSystemAlreadyExists` error with the
 * ID of the existing file system.
 *
 * For basic use cases, you can use a randomly generated UUID for the creation
 * token.
 *
 * The idempotent operation allows you to retry a `CreateFileSystem` call without
 * risk of creating an extra file system. This can happen when an initial call fails in a way
 * that leaves it uncertain whether or not a file system was actually created. An example might
 * be that a transport level timeout occurred or your connection was reset. As long as you use
 * the same creation token, if the initial call had succeeded in creating a file system, the
 * client can learn of its existence from the `FileSystemAlreadyExists` error.
 *
 * For more information, see
 * Creating a file system
 * in the *Amazon EFS User Guide*.
 *
 * The `CreateFileSystem` call returns while the file system's lifecycle
 * state is still `creating`. You can check the file system creation status by
 * calling the DescribeFileSystems operation, which among other things returns the file
 * system state.
 *
 * This operation accepts an optional `PerformanceMode` parameter that you choose
 * for your file system. We recommend `generalPurpose`
 * `PerformanceMode` for all file
 * systems. The `maxIO` mode is a previous generation performance type that is designed for highly parallelized workloads that can tolerate higher latencies
 * than the `generalPurpose` mode. `MaxIO` mode is not supported for One Zone file systems or
 * file systems that use Elastic throughput.
 *
 * The `PerformanceMode` can't be changed after the file system has been
 * created. For more information, see Amazon EFS performance
 * modes.
 *
 * You can set the throughput mode for the file system using the `ThroughputMode`
 * parameter.
 *
 * After the file system is fully created, Amazon EFS sets its lifecycle state to
 * `available`, at which point you can create one or more mount targets for the file
 * system in your VPC. For more information, see CreateMountTarget. You mount
 * your Amazon EFS file system on an EC2 instances in your VPC by using the mount
 * target. For more information, see Amazon EFS: How it Works.
 *
 * This operation requires permissions for the
 * `elasticfilesystem:CreateFileSystem` action.
 *
 * File systems can be tagged on creation. If tags are specified in the creation action, IAM
 * performs additional authorization on the `elasticfilesystem:TagResource` action to
 * verify if users have permissions to create tags. Therefore, you must grant explicit
 * permissions to use the `elasticfilesystem:TagResource` action. For more
 * information, see Granting permissions to tag resources during creation.
 */
export const createFileSystem: API.OperationMethod<
  CreateFileSystemRequest,
  FileSystemDescription,
  CreateFileSystemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-02-01/file-systems",
    input: {
      CreationToken: D.m({ idempotency: true }),
      PerformanceMode: 0,
      Encrypted: 0,
      KmsKeyId: 0,
      ThroughputMode: 0,
      ProvisionedThroughputInMibps: 0,
      AvailabilityZoneName: 0,
      Backup: 0,
      Tags: D.list(i_Tag),
    },
    output: { CreationTime: D.ts, SizeInBytes: o_FileSystemSize },
    body: true,
  },
  errors: [
    BadRequest,
    FileSystemAlreadyExists,
    FileSystemLimitExceeded,
    InsufficientThroughputCapacity,
    InternalServerError,
    ThroughputLimitExceeded,
    UnsupportedAvailabilityZone,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFileSystem",
})) as any;

export type CreateMountTargetError =
  | AvailabilityZonesMismatch
  | BadRequest
  | FileSystemNotFound
  | IncorrectFileSystemLifeCycleState
  | InternalServerError
  | IpAddressInUse
  | MountTargetConflict
  | NetworkInterfaceLimitExceeded
  | NoFreeAddressesInSubnet
  | SecurityGroupLimitExceeded
  | SecurityGroupNotFound
  | SubnetNotFound
  | UnsupportedAvailabilityZone
  | CommonErrors;
/**
 * Creates a mount target for a file system. You can then mount the file system on EC2
 * instances by using the mount target.
 *
 * You can create one mount target in each Availability Zone in your VPC. All EC2 instances
 * in a VPC within a given Availability Zone share a single mount target for a given file system. If
 * you have multiple subnets in an Availability Zone, you create a mount target in one of the subnets.
 * EC2 instances do not need to be in the same subnet as the mount target in order to
 * access their file system.
 *
 * You can create only one mount target for a One Zone file system. You must
 * create that mount target in the same Availability Zone in which the file system is located. Use the
 * `AvailabilityZoneName` and `AvailabiltyZoneId` properties in the DescribeFileSystems response object to get this information. Use the
 * `subnetId` associated with the file system's Availability Zone when creating the mount
 * target.
 *
 * For more information, see Amazon EFS: How it Works.
 *
 * To create a mount target for a file system, the file system's lifecycle state must be
 * `available`. For more information, see DescribeFileSystems.
 *
 * In the request, provide the following:
 *
 * - The file system ID for which you are creating the mount
 * target.
 *
 * - A subnet ID, which determines the following:
 *
 * - The VPC in which Amazon EFS creates the mount target
 *
 * - The Availability Zone in which Amazon EFS creates the mount target
 *
 * - The IP address range from which Amazon EFS selects the IP address of the mount target
 * (if you don't specify an IP address in the request)
 *
 * After creating the mount target, Amazon EFS returns a response that includes, a
 * `MountTargetId` and an `IpAddress`. You use this IP address when
 * mounting the file system in an EC2 instance. You can also use the mount target's
 * DNS name when mounting the file system. The EC2 instance on which you mount the file
 * system by using the mount target can resolve the mount target's DNS name to its IP
 * address. For more information, see How it Works:
 * Implementation Overview.
 *
 * Note that you can create mount targets for a file system in only one VPC, and there can be
 * only one mount target per Availability Zone. That is, if the file system already has one or more
 * mount targets created for it, the subnet specified in the request to add another mount target
 * must meet the following requirements:
 *
 * - Must belong to the same VPC as the subnets of the existing mount targets
 *
 * - Must not be in the same Availability Zone as any of the subnets of the existing mount
 * targets
 *
 * If the request satisfies the requirements, Amazon EFS does the following:
 *
 * - Creates a new mount target in the specified subnet.
 *
 * - Also creates a new network interface in the subnet as follows:
 *
 * - If the request provides an `IpAddress`, Amazon EFS assigns that
 * IP address to the network interface. Otherwise, Amazon EFS assigns a free
 * address in the subnet (in the same way that the Amazon EC2
 * `CreateNetworkInterface` call does when a request does not specify a
 * primary private IP address).
 *
 * - If the request provides `SecurityGroups`, this network interface is
 * associated with those security groups. Otherwise, it belongs to the default security
 * group for the subnet's VPC.
 *
 * - Assigns the description Mount target *fsmt-id* for
 * file system *fs-id*
 * where
 * *fsmt-id*
 * is the mount target ID, and
 * *fs-id*
 * is the `FileSystemId`.
 *
 * - Sets the `requesterManaged` property of the network interface to
 * `true`, and the `requesterId` value to
 * `EFS`.
 *
 * Each Amazon EFS mount target has one corresponding requester-managed
 * EC2 network interface. After the network interface is created, Amazon EFS
 * sets the `NetworkInterfaceId` field in the mount target's description to
 * the network interface ID, and the `IpAddress` field to its address. If network
 * interface creation fails, the entire `CreateMountTarget` operation
 * fails.
 *
 * The `CreateMountTarget` call returns only after creating the network
 * interface, but while the mount target state is still `creating`, you can check
 * the mount target creation status by calling the DescribeMountTargets operation, which among other things returns the mount
 * target state.
 *
 * We recommend that you create a mount target in each of the Availability Zones. There are cost
 * considerations for using a file system in an Availability Zone through a mount target created in
 * another Availability Zone. For more information, see Amazon EFS pricing. In addition, by always using a mount target local to the
 * instance's Availability Zone, you eliminate a partial failure scenario. If the Availability Zone in
 * which your mount target is created goes down, then you can't access your file system
 * through that mount target.
 *
 * This operation requires permissions for the following action on the file
 * system:
 *
 * - `elasticfilesystem:CreateMountTarget`
 *
 * This operation also requires permissions for the following Amazon EC2
 * actions:
 *
 * - `ec2:DescribeSubnets`
 *
 * - `ec2:DescribeNetworkInterfaces`
 *
 * - `ec2:CreateNetworkInterface`
 */
export const createMountTarget: API.OperationMethod<
  CreateMountTargetRequest,
  MountTargetDescription,
  CreateMountTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-02-01/mount-targets",
    input: {
      FileSystemId: 0,
      SubnetId: 0,
      IpAddress: 0,
      Ipv6Address: 0,
      IpAddressType: 0,
      SecurityGroups: 0,
    },
    body: true,
  },
  errors: [
    AvailabilityZonesMismatch,
    BadRequest,
    FileSystemNotFound,
    IncorrectFileSystemLifeCycleState,
    InternalServerError,
    IpAddressInUse,
    MountTargetConflict,
    NetworkInterfaceLimitExceeded,
    NoFreeAddressesInSubnet,
    SecurityGroupLimitExceeded,
    SecurityGroupNotFound,
    SubnetNotFound,
    UnsupportedAvailabilityZone,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMountTarget",
})) as any;

export type CreateReplicationConfigurationError =
  | BadRequest
  | ConflictException
  | FileSystemLimitExceeded
  | FileSystemNotFound
  | IncorrectFileSystemLifeCycleState
  | InsufficientThroughputCapacity
  | InternalServerError
  | ReplicationNotFound
  | ThroughputLimitExceeded
  | UnsupportedAvailabilityZone
  | ValidationException
  | CommonErrors;
/**
 * Creates a replication conﬁguration to either a new or existing EFS file system.
 * For more information, see Amazon EFS replication in the Amazon EFS User
 * Guide. The replication configuration specifies the following:
 *
 * - **Source file system** – The EFS file
 * system that you want to replicate.
 *
 * - **Destination file system** – The destination file
 * system to which the source file system is replicated. There can only be one destination
 * file system in a replication configuration.
 *
 * A file system can be part of only one replication configuration.
 *
 * The destination parameters for the replication configuration depend on
 * whether you are replicating to a new file system or to an existing file system, and if you
 * are replicating across Amazon Web Services accounts. See DestinationToCreate for more information.
 *
 * This operation requires permissions for the `elasticfilesystem:CreateReplicationConfiguration`
 * action. Additionally, other permissions are required depending on how you are replicating file systems.
 * For more information, see Required permissions for replication
 * in the Amazon EFS User
 * Guide.
 */
export const createReplicationConfiguration: API.OperationMethod<
  CreateReplicationConfigurationRequest,
  ReplicationConfigurationDescription,
  CreateReplicationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-02-01/file-systems/{SourceFileSystemId}/replication-configuration",
    input: {
      SourceFileSystemId: 0,
      Destinations: D.list({
        Region: 0,
        AvailabilityZoneName: 0,
        KmsKeyId: 0,
        FileSystemId: 0,
        RoleArn: 0,
      }),
    },
    output: { CreationTime: D.ts, Destinations: D.list(o_Destination) },
    body: true,
  },
  errors: [
    BadRequest,
    ConflictException,
    FileSystemLimitExceeded,
    FileSystemNotFound,
    IncorrectFileSystemLifeCycleState,
    InsufficientThroughputCapacity,
    InternalServerError,
    ReplicationNotFound,
    ThroughputLimitExceeded,
    UnsupportedAvailabilityZone,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReplicationConfiguration",
})) as any;

export type CreateTagsError =
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * DEPRECATED - `CreateTags` is deprecated and not maintained. To create tags for EFS
 * resources, use the API action.
 *
 * Creates or overwrites tags associated with a file system. Each tag is a key-value pair. If
 * a tag key specified in the request already exists on the file system, this operation
 * overwrites its value with the value provided in the request. If you add the `Name`
 * tag to your file system, Amazon EFS returns it in the response to the DescribeFileSystems operation.
 *
 * This operation requires permission for the `elasticfilesystem:CreateTags`
 * action.
 */
export const createTags: API.OperationMethod<
  CreateTagsRequest,
  CreateTagsResponse,
  CreateTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-02-01/create-tags/{FileSystemId}",
    input: { FileSystemId: 0, Tags: D.list(i_Tag) },
    body: true,
  },
  errors: [BadRequest, FileSystemNotFound, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTags",
})) as any;

export type DeleteAccessPointError =
  | AccessPointNotFound
  | BadRequest
  | InternalServerError
  | CommonErrors;
/**
 * Deletes the specified access point. After deletion is complete, new clients can no
 * longer connect to the access points. Clients connected to the access point at the time of
 * deletion will continue to function until they terminate their connection.
 *
 * This operation requires permissions for the `elasticfilesystem:DeleteAccessPoint` action.
 */
export const deleteAccessPoint: API.OperationMethod<
  DeleteAccessPointRequest,
  DeleteAccessPointResponse,
  DeleteAccessPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2015-02-01/access-points/{AccessPointId}",
    input: { AccessPointId: 0 },
  },
  errors: [AccessPointNotFound, BadRequest, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessPoint",
})) as any;

export type DeleteFileSystemError =
  | BadRequest
  | FileSystemInUse
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Deletes a file system, permanently severing access to its contents. Upon return, the
 * file system no longer exists and you can't access any contents of the deleted file
 * system.
 *
 * You need to manually delete mount targets attached to a file system before you can delete
 * an EFS file system. This step is performed for you when you use the Amazon Web Services console
 * to delete a file system.
 *
 * You cannot delete a file system that is part of an EFS replication configuration.
 * You need to delete the replication configuration first.
 *
 * You can't delete a file system that is in use. That is, if the file system has
 * any mount targets, you must first delete them. For more information, see DescribeMountTargets and DeleteMountTarget.
 *
 * The `DeleteFileSystem` call returns while the file system state is still
 * `deleting`. You can check the file system deletion status by calling the DescribeFileSystems operation, which returns a list of file systems in your
 * account. If you pass file system ID or creation token for the deleted file system, the DescribeFileSystems returns a `404 FileSystemNotFound`
 * error.
 *
 * This operation requires permissions for the
 * `elasticfilesystem:DeleteFileSystem` action.
 */
export const deleteFileSystem: API.OperationMethod<
  DeleteFileSystemRequest,
  DeleteFileSystemResponse,
  DeleteFileSystemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2015-02-01/file-systems/{FileSystemId}",
    input: { FileSystemId: 0 },
  },
  errors: [
    BadRequest,
    FileSystemInUse,
    FileSystemNotFound,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFileSystem",
})) as any;

export type DeleteFileSystemPolicyError =
  | BadRequest
  | FileSystemNotFound
  | IncorrectFileSystemLifeCycleState
  | InternalServerError
  | CommonErrors;
/**
 * Deletes the `FileSystemPolicy` for the specified file system.
 * The default `FileSystemPolicy` goes into effect once the existing policy is deleted.
 * For more information about the default file system policy, see Using Resource-based Policies with EFS.
 *
 * This operation requires permissions for the `elasticfilesystem:DeleteFileSystemPolicy` action.
 */
export const deleteFileSystemPolicy: API.OperationMethod<
  DeleteFileSystemPolicyRequest,
  DeleteFileSystemPolicyResponse,
  DeleteFileSystemPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2015-02-01/file-systems/{FileSystemId}/policy",
    input: { FileSystemId: 0 },
  },
  errors: [
    BadRequest,
    FileSystemNotFound,
    IncorrectFileSystemLifeCycleState,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFileSystemPolicy",
})) as any;

export type DeleteMountTargetError =
  | BadRequest
  | DependencyTimeout
  | InternalServerError
  | MountTargetNotFound
  | CommonErrors;
/**
 * Deletes the specified mount target.
 *
 * This operation forcibly breaks any mounts of the file system by using the mount target
 * that is being deleted, which might disrupt instances or applications using those mounts. To
 * avoid applications getting cut off abruptly, you might consider unmounting any mounts of the
 * mount target, if feasible. The operation also deletes the associated network interface.
 * Uncommitted writes might be lost, but breaking a mount target using this operation does not
 * corrupt the file system itself. The file system you created remains. You can mount an
 * EC2 instance in your VPC by using another mount target.
 *
 * This operation requires permissions for the following action on the file
 * system:
 *
 * - `elasticfilesystem:DeleteMountTarget`
 *
 * The `DeleteMountTarget` call returns while the mount target state is still
 * `deleting`. You can check the mount target deletion by calling the DescribeMountTargets operation, which returns a list of mount target
 * descriptions for the given file system.
 *
 * The operation also requires permissions for the following Amazon EC2 action on the
 * mount target's network interface:
 *
 * - `ec2:DeleteNetworkInterface`
 */
export const deleteMountTarget: API.OperationMethod<
  DeleteMountTargetRequest,
  DeleteMountTargetResponse,
  DeleteMountTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2015-02-01/mount-targets/{MountTargetId}",
    input: { MountTargetId: 0 },
  },
  errors: [
    BadRequest,
    DependencyTimeout,
    InternalServerError,
    MountTargetNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMountTarget",
})) as any;

export type DeleteReplicationConfigurationError =
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | ReplicationNotFound
  | CommonErrors;
/**
 * Deletes a replication configuration. Deleting a replication configuration ends the
 * replication process. After a replication configuration is deleted, the destination file system
 * becomes `Writeable` and its replication overwrite protection is re-enabled. For
 * more information, see Delete a replication configuration.
 *
 * This operation requires permissions for the
 * `elasticfilesystem:DeleteReplicationConfiguration` action.
 */
export const deleteReplicationConfiguration: API.OperationMethod<
  DeleteReplicationConfigurationRequest,
  DeleteReplicationConfigurationResponse,
  DeleteReplicationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2015-02-01/file-systems/{SourceFileSystemId}/replication-configuration",
    input: {
      SourceFileSystemId: 0,
      DeletionMode: D.m({ query: "deletionMode" }),
    },
  },
  errors: [
    BadRequest,
    FileSystemNotFound,
    InternalServerError,
    ReplicationNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReplicationConfiguration",
})) as any;

export type DeleteTagsError =
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * DEPRECATED - `DeleteTags` is deprecated and not maintained. To remove tags from EFS
 * resources, use the API action.
 *
 * Deletes the specified tags from a file system. If the `DeleteTags` request
 * includes a tag key that doesn't exist, Amazon EFS ignores it and doesn't cause an
 * error. For more information about tags and related restrictions, see Tag restrictions in the
 * *Billing and Cost Management User Guide*.
 *
 * This operation requires permissions for the `elasticfilesystem:DeleteTags`
 * action.
 */
export const deleteTags: API.OperationMethod<
  DeleteTagsRequest,
  DeleteTagsResponse,
  DeleteTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-02-01/delete-tags/{FileSystemId}",
    input: { FileSystemId: 0, TagKeys: 0 },
    body: true,
  },
  errors: [BadRequest, FileSystemNotFound, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTags",
})) as any;

export type DescribeAccessPointsError =
  | AccessPointNotFound
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Returns the description of a specific Amazon EFS access point if the
 * `AccessPointId` is provided. If you provide an EFS
 * `FileSystemId`, it returns descriptions of all access points for that file
 * system. You can provide either an `AccessPointId` or a `FileSystemId` in
 * the request, but not both.
 *
 * This operation requires permissions for the `elasticfilesystem:DescribeAccessPoints` action.
 */
export const describeAccessPoints: API.PaginatedOperationMethod<
  DescribeAccessPointsRequest,
  DescribeAccessPointsResponse,
  DescribeAccessPointsError,
  Credentials | HttpClient.HttpClient,
  AccessPointDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-02-01/access-points",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
      AccessPointId: D.m({ query: "AccessPointId" }),
      FileSystemId: D.m({ query: "FileSystemId" }),
    },
  },
  errors: [
    AccessPointNotFound,
    BadRequest,
    FileSystemNotFound,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccessPoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AccessPoints",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeAccountPreferencesError =
  | InternalServerError
  | CommonErrors;
/**
 * Returns the account preferences settings for the Amazon Web Services account associated with the user making the request, in the current Amazon Web Services Region.
 */
export const describeAccountPreferences: API.OperationMethod<
  DescribeAccountPreferencesRequest,
  DescribeAccountPreferencesResponse,
  DescribeAccountPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-02-01/account-preferences",
    input: { NextToken: 0, MaxResults: 0 },
    body: true,
  },
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountPreferences",
})) as any;

export type DescribeBackupPolicyError =
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | PolicyNotFound
  | ValidationException
  | CommonErrors;
/**
 * Returns the backup policy for the specified EFS file system.
 */
export const describeBackupPolicy: API.OperationMethod<
  DescribeBackupPolicyRequest,
  BackupPolicyDescription,
  DescribeBackupPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-02-01/file-systems/{FileSystemId}/backup-policy",
    input: { FileSystemId: 0 },
  },
  errors: [
    BadRequest,
    FileSystemNotFound,
    InternalServerError,
    PolicyNotFound,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBackupPolicy",
})) as any;

export type DescribeFileSystemPolicyError =
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | PolicyNotFound
  | CommonErrors;
/**
 * Returns the `FileSystemPolicy` for the specified EFS file
 * system.
 *
 * This operation requires permissions for the `elasticfilesystem:DescribeFileSystemPolicy` action.
 */
export const describeFileSystemPolicy: API.OperationMethod<
  DescribeFileSystemPolicyRequest,
  FileSystemPolicyDescription,
  DescribeFileSystemPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-02-01/file-systems/{FileSystemId}/policy",
    input: { FileSystemId: 0 },
  },
  errors: [BadRequest, FileSystemNotFound, InternalServerError, PolicyNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFileSystemPolicy",
})) as any;

export type DescribeFileSystemsError =
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Returns the description of a specific Amazon EFS file system if either the file system
 * `CreationToken` or the `FileSystemId` is provided. Otherwise, it
 * returns descriptions of all file systems owned by the caller's Amazon Web Services account in the
 * Amazon Web Services Region of the endpoint that you're calling.
 *
 * When retrieving all file system descriptions, you can optionally specify the
 * `MaxItems` parameter to limit the number of descriptions in a response.
 * This number is automatically set to 100. If more file system descriptions remain,
 * Amazon EFS returns a `NextMarker`, an opaque token, in the response. In this case,
 * you should send a subsequent request with the `Marker` request parameter set to the
 * value of `NextMarker`.
 *
 * To retrieve a list of your file system descriptions, this operation is used in an
 * iterative process, where `DescribeFileSystems` is called first without the
 * `Marker` and then the operation continues to call it with the `Marker`
 * parameter set to the value of the `NextMarker` from the previous response until the
 * response has no `NextMarker`.
 *
 * The order of file systems returned in the response of one
 * `DescribeFileSystems` call and the order of file systems returned across the
 * responses of a multi-call iteration is unspecified.
 *
 * This operation requires permissions for the
 * `elasticfilesystem:DescribeFileSystems` action.
 */
export const describeFileSystems: API.PaginatedOperationMethod<
  DescribeFileSystemsRequest,
  DescribeFileSystemsResponse,
  DescribeFileSystemsError,
  Credentials | HttpClient.HttpClient,
  FileSystemDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-02-01/file-systems",
    input: {
      MaxItems: D.m({ query: "MaxItems" }),
      Marker: D.m({ query: "Marker" }),
      CreationToken: D.m({ query: "CreationToken" }),
      FileSystemId: D.m({ query: "FileSystemId" }),
    },
    output: {
      FileSystems: D.list({
        CreationTime: D.ts,
        SizeInBytes: o_FileSystemSize,
      }),
    },
  },
  errors: [BadRequest, FileSystemNotFound, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFileSystems",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "FileSystems",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type DescribeLifecycleConfigurationError =
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Returns the current `LifecycleConfiguration` object for the specified
 * EFS file system. Lifecycle management uses the `LifecycleConfiguration`
 * object to identify when to move files between storage classes. For a file system without a
 * `LifecycleConfiguration` object, the call returns an empty array in the
 * response.
 *
 * This operation requires permissions for the
 * `elasticfilesystem:DescribeLifecycleConfiguration` operation.
 */
export const describeLifecycleConfiguration: API.OperationMethod<
  DescribeLifecycleConfigurationRequest,
  LifecycleConfigurationDescription,
  DescribeLifecycleConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-02-01/file-systems/{FileSystemId}/lifecycle-configuration",
    input: { FileSystemId: 0 },
  },
  errors: [BadRequest, FileSystemNotFound, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLifecycleConfiguration",
})) as any;

export type DescribeMountTargetsError =
  | AccessPointNotFound
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | MountTargetNotFound
  | CommonErrors;
/**
 * Returns the descriptions of all the current mount targets, or a specific mount target,
 * for a file system. When requesting all of the current mount targets, the order of mount
 * targets returned in the response is unspecified.
 *
 * This operation requires permissions for the
 * `elasticfilesystem:DescribeMountTargets` action, on either the file system ID
 * that you specify in `FileSystemId`, or on the file system of the mount target that
 * you specify in `MountTargetId`.
 */
export const describeMountTargets: API.PaginatedOperationMethod<
  DescribeMountTargetsRequest,
  DescribeMountTargetsResponse,
  DescribeMountTargetsError,
  Credentials | HttpClient.HttpClient,
  MountTargetDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-02-01/mount-targets",
    input: {
      MaxItems: D.m({ query: "MaxItems" }),
      Marker: D.m({ query: "Marker" }),
      FileSystemId: D.m({ query: "FileSystemId" }),
      MountTargetId: D.m({ query: "MountTargetId" }),
      AccessPointId: D.m({ query: "AccessPointId" }),
    },
  },
  errors: [
    AccessPointNotFound,
    BadRequest,
    FileSystemNotFound,
    InternalServerError,
    MountTargetNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMountTargets",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "MountTargets",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type DescribeMountTargetSecurityGroupsError =
  | BadRequest
  | IncorrectMountTargetState
  | InternalServerError
  | MountTargetNotFound
  | CommonErrors;
/**
 * Returns the security groups currently in effect for a mount target. This operation
 * requires that the network interface of the mount target has been created and the lifecycle
 * state of the mount target is not `deleted`.
 *
 * This operation requires permissions for the following actions:
 *
 * - `elasticfilesystem:DescribeMountTargetSecurityGroups` action on the mount
 * target's file system.
 *
 * - `ec2:DescribeNetworkInterfaceAttribute` action on the mount target's
 * network interface.
 */
export const describeMountTargetSecurityGroups: API.OperationMethod<
  DescribeMountTargetSecurityGroupsRequest,
  DescribeMountTargetSecurityGroupsResponse,
  DescribeMountTargetSecurityGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-02-01/mount-targets/{MountTargetId}/security-groups",
    input: { MountTargetId: 0 },
  },
  errors: [
    BadRequest,
    IncorrectMountTargetState,
    InternalServerError,
    MountTargetNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMountTargetSecurityGroups",
})) as any;

export type DescribeReplicationConfigurationsError =
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | ReplicationNotFound
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the replication configuration for a specific file system. If a file system is
 * not specified, all of the replication configurations for the Amazon Web Services account in an
 * Amazon Web Services Region are retrieved.
 */
export const describeReplicationConfigurations: API.PaginatedOperationMethod<
  DescribeReplicationConfigurationsRequest,
  DescribeReplicationConfigurationsResponse,
  DescribeReplicationConfigurationsError,
  Credentials | HttpClient.HttpClient,
  ReplicationConfigurationDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-02-01/file-systems/replication-configurations",
    input: {
      FileSystemId: D.m({ query: "FileSystemId" }),
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: {
      Replications: D.list({
        CreationTime: D.ts,
        Destinations: D.list(o_Destination),
      }),
    },
  },
  errors: [
    BadRequest,
    FileSystemNotFound,
    InternalServerError,
    ReplicationNotFound,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReplicationConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Replications",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeTagsError =
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * DEPRECATED - The `DescribeTags` action is deprecated and not maintained. To view
 * tags associated with EFS resources, use the `ListTagsForResource` API
 * action.
 *
 * Returns the tags associated with a file system. The order of tags returned in the
 * response of one `DescribeTags` call and the order of tags returned across the
 * responses of a multiple-call iteration (when using pagination) is unspecified.
 *
 * This operation requires permissions for the
 * `elasticfilesystem:DescribeTags` action.
 */
export const describeTags: API.PaginatedOperationMethod<
  DescribeTagsRequest,
  DescribeTagsResponse,
  DescribeTagsError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-02-01/tags/{FileSystemId}",
    input: {
      MaxItems: D.m({ query: "MaxItems" }),
      Marker: D.m({ query: "Marker" }),
      FileSystemId: 0,
    },
  },
  errors: [BadRequest, FileSystemNotFound, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTags",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "Tags",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessPointNotFound
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Lists all tags for a top-level EFS resource. You must provide the ID of the
 * resource that you want to retrieve the tags for.
 *
 * This operation requires permissions for the `elasticfilesystem:DescribeAccessPoints` action.
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
    http: "GET /2015-02-01/resource-tags/{ResourceId}",
    input: {
      ResourceId: 0,
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
  },
  errors: [
    AccessPointNotFound,
    BadRequest,
    FileSystemNotFound,
    InternalServerError,
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

export type ModifyMountTargetSecurityGroupsError =
  | BadRequest
  | IncorrectMountTargetState
  | InternalServerError
  | MountTargetNotFound
  | SecurityGroupLimitExceeded
  | SecurityGroupNotFound
  | CommonErrors;
/**
 * Modifies the set of security groups in effect for a mount target.
 *
 * When you create a mount target, Amazon EFS also creates a new network interface. For
 * more information, see CreateMountTarget. This operation replaces the security groups in effect for the
 * network interface associated with a mount target, with the `SecurityGroups`
 * provided in the request. This operation requires that the network interface of the mount
 * target has been created and the lifecycle state of the mount target is not
 * `deleted`.
 *
 * The operation requires permissions for the following actions:
 *
 * - `elasticfilesystem:ModifyMountTargetSecurityGroups` action on the mount
 * target's file system.
 *
 * - `ec2:ModifyNetworkInterfaceAttribute` action on the mount target's network
 * interface.
 */
export const modifyMountTargetSecurityGroups: API.OperationMethod<
  ModifyMountTargetSecurityGroupsRequest,
  ModifyMountTargetSecurityGroupsResponse,
  ModifyMountTargetSecurityGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2015-02-01/mount-targets/{MountTargetId}/security-groups",
    input: { MountTargetId: 0, SecurityGroups: 0 },
    body: true,
  },
  errors: [
    BadRequest,
    IncorrectMountTargetState,
    InternalServerError,
    MountTargetNotFound,
    SecurityGroupLimitExceeded,
    SecurityGroupNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyMountTargetSecurityGroups",
})) as any;

export type PutAccountPreferencesError =
  | BadRequest
  | InternalServerError
  | CommonErrors;
/**
 * Use this operation to set the account preference in the current Amazon Web Services Region
 * to use long 17 character (63 bit) or short 8 character (32 bit) resource IDs for new
 * EFS file system and mount target resources. All existing resource IDs are not
 * affected by any changes you make. You can set the ID preference during the opt-in period as
 * EFS transitions to long resource IDs. For more information, see Managing Amazon EFS resource IDs.
 *
 * Starting in October, 2021, you will receive an error if you try to set the account preference
 * to use the short 8 character format resource ID. Contact Amazon Web Services support if you
 * receive an error and must use short IDs for file system and mount target resources.
 */
export const putAccountPreferences: API.OperationMethod<
  PutAccountPreferencesRequest,
  PutAccountPreferencesResponse,
  PutAccountPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2015-02-01/account-preferences",
    input: { ResourceIdType: 0 },
    body: true,
  },
  errors: [BadRequest, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountPreferences",
})) as any;

export type PutBackupPolicyError =
  | BadRequest
  | FileSystemNotFound
  | IncorrectFileSystemLifeCycleState
  | InternalServerError
  | ValidationException
  | CommonErrors;
/**
 * Updates the file system's backup policy. Use this action to start or stop automatic backups of the file system.
 */
export const putBackupPolicy: API.OperationMethod<
  PutBackupPolicyRequest,
  BackupPolicyDescription,
  PutBackupPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2015-02-01/file-systems/{FileSystemId}/backup-policy",
    input: { FileSystemId: 0, BackupPolicy: { Status: 0 } },
    body: true,
  },
  errors: [
    BadRequest,
    FileSystemNotFound,
    IncorrectFileSystemLifeCycleState,
    InternalServerError,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBackupPolicy",
})) as any;

export type PutFileSystemPolicyError =
  | BadRequest
  | FileSystemNotFound
  | IncorrectFileSystemLifeCycleState
  | InternalServerError
  | InvalidPolicyException
  | CommonErrors;
/**
 * Applies an Amazon EFS
 * `FileSystemPolicy` to an Amazon EFS file system. A file system policy is an
 * IAM resource-based policy and can contain multiple policy statements. A file system always has
 * exactly one file system policy, which can be the default policy or an explicit policy set or
 * updated using this API operation. EFS file system policies have a 20,000 character
 * limit. When an explicit policy is set, it overrides the default policy. For more information
 * about the default file system policy, see
 * Default EFS file system policy.
 *
 * EFS file system policies have a 20,000 character limit.
 *
 * This operation requires permissions for the `elasticfilesystem:PutFileSystemPolicy` action.
 */
export const putFileSystemPolicy: API.OperationMethod<
  PutFileSystemPolicyRequest,
  FileSystemPolicyDescription,
  PutFileSystemPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2015-02-01/file-systems/{FileSystemId}/policy",
    input: { FileSystemId: 0, Policy: 0, BypassPolicyLockoutSafetyCheck: 0 },
    body: true,
  },
  errors: [
    BadRequest,
    FileSystemNotFound,
    IncorrectFileSystemLifeCycleState,
    InternalServerError,
    InvalidPolicyException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFileSystemPolicy",
})) as any;

export type PutLifecycleConfigurationError =
  | BadRequest
  | FileSystemNotFound
  | IncorrectFileSystemLifeCycleState
  | InternalServerError
  | CommonErrors;
/**
 * Use this action to manage storage for your file system. A
 * `LifecycleConfiguration` consists of one or more `LifecyclePolicy`
 * objects that define the following:
 *
 * -
 * `TransitionToIA`
 * –
 * When to move files in the file system from primary storage (Standard storage class) into the Infrequent Access
 * (IA) storage.
 *
 * -
 * `TransitionToArchive`
 * –
 * When to move files in the file system from their current storage class (either IA or Standard storage) into the
 * Archive storage.
 *
 * File systems cannot transition into Archive storage before transitioning into IA storage. Therefore,
 * TransitionToArchive must either not be set or must be later than TransitionToIA.
 *
 * The Archive storage class is available only for file systems that use the Elastic throughput mode
 * and the General Purpose performance mode.
 *
 * -
 * `TransitionToPrimaryStorageClass`
 * –
 * Whether to move files in the file system back to primary storage (Standard storage class) after they are accessed in IA
 * or Archive storage.
 *
 * For more information, see Managing file system
 * storage.
 *
 * Each Amazon EFS file system supports one lifecycle configuration, which applies to
 * all files in the file system. If a `LifecycleConfiguration` object already exists
 * for the specified file system, a `PutLifecycleConfiguration` call modifies the
 * existing configuration. A `PutLifecycleConfiguration` call with an empty
 * `LifecyclePolicies` array in the request body deletes any existing
 * `LifecycleConfiguration`. In the request, specify the following:
 *
 * - The ID for the file system for which you are enabling, disabling, or modifying
 * lifecycle management.
 *
 * - A `LifecyclePolicies` array of `LifecyclePolicy` objects that
 * define when to move files to IA storage, to Archive storage,
 * and back to primary storage.
 *
 * Amazon EFS requires that each `LifecyclePolicy`
 * object have only have a single transition, so the `LifecyclePolicies` array needs to be structured with separate
 * `LifecyclePolicy` objects. See the example requests in the following section for more information.
 *
 * This operation requires permissions for the `elasticfilesystem:PutLifecycleConfiguration` operation.
 *
 * To apply a `LifecycleConfiguration` object to an encrypted file system, you
 * need the same Key Management Service permissions as when you created the encrypted file system.
 */
export const putLifecycleConfiguration: API.OperationMethod<
  PutLifecycleConfigurationRequest,
  LifecycleConfigurationDescription,
  PutLifecycleConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2015-02-01/file-systems/{FileSystemId}/lifecycle-configuration",
    input: {
      FileSystemId: 0,
      LifecyclePolicies: D.list({
        TransitionToIA: 0,
        TransitionToPrimaryStorageClass: 0,
        TransitionToArchive: 0,
      }),
    },
    body: true,
  },
  errors: [
    BadRequest,
    FileSystemNotFound,
    IncorrectFileSystemLifeCycleState,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLifecycleConfiguration",
})) as any;

export type TagResourceError =
  | AccessPointNotFound
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Creates a tag for an EFS resource. You can create tags for EFS file
 * systems and access points using this API operation.
 *
 * This operation requires permissions for the `elasticfilesystem:TagResource` action.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-02-01/resource-tags/{ResourceId}",
    input: { ResourceId: 0, Tags: D.list(i_Tag) },
    body: true,
  },
  errors: [
    AccessPointNotFound,
    BadRequest,
    FileSystemNotFound,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessPointNotFound
  | BadRequest
  | FileSystemNotFound
  | InternalServerError
  | CommonErrors;
/**
 * Removes tags from an EFS resource. You can remove tags from EFS file
 * systems and access points using this API operation.
 *
 * This operation requires permissions for the `elasticfilesystem:UntagResource` action.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2015-02-01/resource-tags/{ResourceId}",
    input: { ResourceId: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    AccessPointNotFound,
    BadRequest,
    FileSystemNotFound,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateFileSystemError =
  | BadRequest
  | FileSystemNotFound
  | IncorrectFileSystemLifeCycleState
  | InsufficientThroughputCapacity
  | InternalServerError
  | ThroughputLimitExceeded
  | TooManyRequests
  | CommonErrors;
/**
 * Updates the throughput mode or the amount of provisioned throughput of an existing file
 * system.
 */
export const updateFileSystem: API.OperationMethod<
  UpdateFileSystemRequest,
  FileSystemDescription,
  UpdateFileSystemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2015-02-01/file-systems/{FileSystemId}",
    input: {
      FileSystemId: 0,
      ThroughputMode: 0,
      ProvisionedThroughputInMibps: 0,
    },
    output: { CreationTime: D.ts, SizeInBytes: o_FileSystemSize },
    body: true,
  },
  errors: [
    BadRequest,
    FileSystemNotFound,
    IncorrectFileSystemLifeCycleState,
    InsufficientThroughputCapacity,
    InternalServerError,
    ThroughputLimitExceeded,
    TooManyRequests,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFileSystem",
})) as any;

export type UpdateFileSystemProtectionError =
  | BadRequest
  | FileSystemNotFound
  | IncorrectFileSystemLifeCycleState
  | InsufficientThroughputCapacity
  | InternalServerError
  | ReplicationAlreadyExists
  | ThroughputLimitExceeded
  | TooManyRequests
  | CommonErrors;
/**
 * Updates protection on the file system.
 *
 * This operation requires permissions for the
 * `elasticfilesystem:UpdateFileSystemProtection` action.
 */
export const updateFileSystemProtection: API.OperationMethod<
  UpdateFileSystemProtectionRequest,
  FileSystemProtectionDescription,
  UpdateFileSystemProtectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2015-02-01/file-systems/{FileSystemId}/protection",
    input: { FileSystemId: 0, ReplicationOverwriteProtection: 0 },
    body: true,
  },
  errors: [
    BadRequest,
    FileSystemNotFound,
    IncorrectFileSystemLifeCycleState,
    InsufficientThroughputCapacity,
    InternalServerError,
    ReplicationAlreadyExists,
    ThroughputLimitExceeded,
    TooManyRequests,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFileSystemProtection",
})) as any;

const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_Destination: D.LazyStruct = () => ({ LastReplicatedTimestamp: D.ts });
const o_FileSystemSize: D.LazyStruct = () => ({ Timestamp: D.ts });
