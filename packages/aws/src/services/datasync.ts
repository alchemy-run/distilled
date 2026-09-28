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
  sdkId: "DataSync",
  target: "FmrsService",
  version: "2018-11-09",
  sigv4: "datasync",
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
                `https://datasync-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://datasync-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://datasync.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://datasync.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class InternalException
  extends /*@__PURE__*/ TE.TaggedError("InternalException")<{
    readonly message?: string;
    readonly errorCode?: string;
  }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError("InvalidRequestException")<{
    readonly message?: string;
    readonly errorCode?: string;
    readonly datasyncErrorCode?: string;
  }> {}
export class LocationAccessTestFailed
  extends /*@__PURE__*/ TE.TaggedError(
    "LocationAccessTestFailed",
    ["RetryableError"],
    {
      synthetic: {
        from: "InvalidRequestException",
        message: { includes: "location access test failed" },
      },
    },
  )<{
    readonly message?: string;
    readonly errorCode?: string;
    readonly datasyncErrorCode?: string;
  }> {}
export class LocationNotFound
  extends /*@__PURE__*/ TE.TaggedError("LocationNotFound", ["NotFoundError"], {
    synthetic: {
      from: "InvalidRequestException",
      message: { matches: "^Location .* is not found" },
    },
  })<{
    readonly message?: string;
    readonly errorCode?: string;
    readonly datasyncErrorCode?: string;
  }> {}
export class LocationRoleNotAssumable
  extends /*@__PURE__*/ TE.TaggedError(
    "LocationRoleNotAssumable",
    ["RetryableError"],
    {
      synthetic: {
        from: "InvalidRequestException",
        message: { includes: "Invalid IAM role" },
      },
    },
  )<{
    readonly message?: string;
    readonly errorCode?: string;
    readonly datasyncErrorCode?: string;
  }> {}
export class TaskNotFound
  extends /*@__PURE__*/ TE.TaggedError("TaskNotFound", ["NotFoundError"], {
    synthetic: {
      from: "InvalidRequestException",
      message: { matches: "^Task .* is not found" },
    },
  })<{
    readonly message?: string;
    readonly errorCode?: string;
    readonly datasyncErrorCode?: string;
  }> {}
export type TaskExecutionArn = string;
export interface CancelTaskExecutionRequest {
  TaskExecutionArn: string;
}
export interface CancelTaskExecutionResponse {}
export type ActivationKey = string;
export type TagValue = string;
export type TagKey = string;
export interface TagListEntry {
  Key: string;
  Value?: string;
}
export type InputTagList = TagListEntry[];
export type VpcEndpointId = string;
export type Ec2SubnetArn = string;
export type PLSubnetArnList = string[];
export type Ec2SecurityGroupArn = string;
export type PLSecurityGroupArnList = string[];
export interface CreateAgentRequest {
  ActivationKey: string;
  AgentName?: string;
  Tags?: TagListEntry[];
  VpcEndpointId?: string;
  SubnetArns?: string[];
  SecurityGroupArns?: string[];
}
export type AgentArn = string;
export interface CreateAgentResponse {
  AgentArn?: string;
}
export type AzureBlobContainerUrl = string;
export type AzureBlobAuthenticationType = "SAS" | "NONE" | (string & {});
export type AzureBlobSasToken = string | redacted.Redacted<string>;
export interface AzureBlobSasConfiguration {
  Token: string | redacted.Redacted<string>;
}
export type AzureBlobType = "BLOCK" | (string & {});
export type AzureAccessTier = "HOT" | "COOL" | "ARCHIVE" | (string & {});
export type AzureBlobSubdirectory = string;
export type AgentArnList = string[];
export type SecretArn = string;
export type KmsKeyArn = string;
export interface CmkSecretConfig {
  SecretArn?: string;
  KmsKeyArn?: string;
}
export type IamRoleArnOrEmptyString = string;
export interface CustomSecretConfig {
  SecretArn?: string;
  SecretAccessRoleArn?: string;
}
export interface CreateLocationAzureBlobRequest {
  ContainerUrl: string;
  AuthenticationType: AzureBlobAuthenticationType;
  SasConfiguration?: AzureBlobSasConfiguration;
  BlobType?: AzureBlobType;
  AccessTier?: AzureAccessTier;
  Subdirectory?: string;
  AgentArns?: string[];
  Tags?: TagListEntry[];
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export type LocationArn = string;
export interface CreateLocationAzureBlobResponse {
  LocationArn?: string;
}
export type EfsSubdirectory = string;
export type EfsFilesystemArn = string;
export type Ec2SecurityGroupArnList = string[];
export interface Ec2Config {
  SubnetArn: string;
  SecurityGroupArns: string[];
}
export type EfsAccessPointArn = string;
export type IamRoleArn = string;
export type EfsInTransitEncryption = "NONE" | "TLS1_2" | (string & {});
export interface CreateLocationEfsRequest {
  Subdirectory?: string;
  EfsFilesystemArn: string;
  Ec2Config: Ec2Config;
  Tags?: TagListEntry[];
  AccessPointArn?: string;
  FileSystemAccessRoleArn?: string;
  InTransitEncryption?: EfsInTransitEncryption;
}
export interface CreateLocationEfsResponse {
  LocationArn?: string;
}
export type FsxFilesystemArn = string;
export type FsxLustreSubdirectory = string;
export interface CreateLocationFsxLustreRequest {
  FsxFilesystemArn: string;
  SecurityGroupArns: string[];
  Subdirectory?: string;
  Tags?: TagListEntry[];
}
export interface CreateLocationFsxLustreResponse {
  LocationArn?: string;
}
export type NfsVersion =
  | "AUTOMATIC"
  | "NFS3"
  | "NFS4_0"
  | "NFS4_1"
  | (string & {});
export interface NfsMountOptions {
  Version?: NfsVersion;
}
export interface FsxProtocolNfs {
  MountOptions?: NfsMountOptions;
}
export type SmbDomain = string;
export type SmbVersion =
  | "AUTOMATIC"
  | "SMB2"
  | "SMB3"
  | "SMB1"
  | "SMB2_0"
  | (string & {});
export interface SmbMountOptions {
  Version?: SmbVersion;
}
export type SmbPassword = string | redacted.Redacted<string>;
export type SmbUser = string;
export interface ManagedSecretConfig {
  SecretArn?: string;
}
export interface FsxProtocolSmb {
  Domain?: string;
  MountOptions?: SmbMountOptions;
  Password?: string | redacted.Redacted<string>;
  User: string;
  ManagedSecretConfig?: ManagedSecretConfig;
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export interface FsxProtocol {
  NFS?: FsxProtocolNfs;
  SMB?: FsxProtocolSmb;
}
export type StorageVirtualMachineArn = string;
export type FsxOntapSubdirectory = string;
export interface CreateLocationFsxOntapRequest {
  Protocol: FsxProtocol;
  SecurityGroupArns: string[];
  StorageVirtualMachineArn: string;
  Subdirectory?: string;
  Tags?: TagListEntry[];
}
export interface CreateLocationFsxOntapResponse {
  LocationArn?: string;
}
export type FsxOpenZfsSubdirectory = string;
export interface CreateLocationFsxOpenZfsRequest {
  FsxFilesystemArn: string;
  Protocol: FsxProtocol;
  SecurityGroupArns: string[];
  Subdirectory?: string;
  Tags?: TagListEntry[];
}
export interface CreateLocationFsxOpenZfsResponse {
  LocationArn?: string;
}
export type FsxWindowsSubdirectory = string;
export interface CreateLocationFsxWindowsRequest {
  Subdirectory?: string;
  FsxFilesystemArn: string;
  SecurityGroupArns: string[];
  Tags?: TagListEntry[];
  User: string;
  Domain?: string;
  Password?: string | redacted.Redacted<string>;
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export interface CreateLocationFsxWindowsResponse {
  LocationArn?: string;
}
export type HdfsSubdirectory = string;
export type HdfsServerHostname = string;
export type HdfsServerPort = number;
export interface HdfsNameNode {
  Hostname: string;
  Port: number;
}
export type HdfsNameNodeList = HdfsNameNode[];
export type HdfsBlockSize = number;
export type HdfsReplicationFactor = number;
export type KmsKeyProviderUri = string;
export type HdfsRpcProtection =
  | "DISABLED"
  | "AUTHENTICATION"
  | "INTEGRITY"
  | "PRIVACY"
  | (string & {});
export type HdfsDataTransferProtection =
  | "DISABLED"
  | "AUTHENTICATION"
  | "INTEGRITY"
  | "PRIVACY"
  | (string & {});
export interface QopConfiguration {
  RpcProtection?: HdfsRpcProtection;
  DataTransferProtection?: HdfsDataTransferProtection;
}
export type HdfsAuthenticationType = "SIMPLE" | "KERBEROS" | (string & {});
export type HdfsUser = string;
export type KerberosPrincipal = string;
export type KerberosKeytabFile = Uint8Array;
export type KerberosKrb5ConfFile = Uint8Array;
export interface CreateLocationHdfsRequest {
  Subdirectory?: string;
  NameNodes: HdfsNameNode[];
  BlockSize?: number;
  ReplicationFactor?: number;
  KmsKeyProviderUri?: string;
  QopConfiguration?: QopConfiguration;
  AuthenticationType: HdfsAuthenticationType;
  SimpleUser?: string;
  KerberosPrincipal?: string;
  KerberosKeytab?: Uint8Array;
  KerberosKrb5Conf?: Uint8Array;
  AgentArns: string[];
  Tags?: TagListEntry[];
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export interface CreateLocationHdfsResponse {
  LocationArn?: string;
}
export type NfsSubdirectory = string;
export type ServerHostname = string;
export interface OnPremConfig {
  AgentArns: string[];
}
export interface CreateLocationNfsRequest {
  Subdirectory: string;
  ServerHostname: string;
  OnPremConfig: OnPremConfig;
  MountOptions?: NfsMountOptions;
  Tags?: TagListEntry[];
}
export interface CreateLocationNfsResponse {
  LocationArn?: string;
}
export type ObjectStorageServerPort = number;
export type ObjectStorageServerProtocol = "HTTPS" | "HTTP" | (string & {});
export type S3Subdirectory = string;
export type ObjectStorageBucketName = string;
export type ObjectStorageAccessKey = string;
export type ObjectStorageSecretKey = string | redacted.Redacted<string>;
export type ObjectStorageCertificate = Uint8Array;
export interface CreateLocationObjectStorageRequest {
  ServerHostname: string;
  ServerPort?: number;
  ServerProtocol?: ObjectStorageServerProtocol;
  Subdirectory?: string;
  BucketName: string;
  AccessKey?: string;
  SecretKey?: string | redacted.Redacted<string>;
  AgentArns?: string[];
  Tags?: TagListEntry[];
  ServerCertificate?: Uint8Array;
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export interface CreateLocationObjectStorageResponse {
  LocationArn?: string;
}
export type S3BucketArn = string;
export type S3StorageClass =
  | "STANDARD"
  | "STANDARD_IA"
  | "ONEZONE_IA"
  | "INTELLIGENT_TIERING"
  | "GLACIER"
  | "DEEP_ARCHIVE"
  | "OUTPOSTS"
  | "GLACIER_INSTANT_RETRIEVAL"
  | (string & {});
export interface S3Config {
  BucketAccessRoleArn: string;
}
export interface CreateLocationS3Request {
  Subdirectory?: string;
  S3BucketArn: string;
  S3StorageClass?: S3StorageClass;
  S3Config: S3Config;
  AgentArns?: string[];
  Tags?: TagListEntry[];
}
export interface CreateLocationS3Response {
  LocationArn?: string;
}
export type SmbSubdirectory = string;
export type SmbAuthenticationType = "NTLM" | "KERBEROS" | (string & {});
export type ServerIpAddress = string;
export type DnsIpList = string[];
export interface CreateLocationSmbRequest {
  Subdirectory: string;
  ServerHostname: string;
  User?: string;
  Domain?: string;
  Password?: string | redacted.Redacted<string>;
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
  AgentArns: string[];
  MountOptions?: SmbMountOptions;
  Tags?: TagListEntry[];
  AuthenticationType?: SmbAuthenticationType;
  DnsIpAddresses?: string[];
  KerberosPrincipal?: string;
  KerberosKeytab?: Uint8Array;
  KerberosKrb5Conf?: Uint8Array;
}
export interface CreateLocationSmbResponse {
  LocationArn?: string;
}
export type LogGroupArn = string;
export type VerifyMode =
  | "POINT_IN_TIME_CONSISTENT"
  | "ONLY_FILES_TRANSFERRED"
  | "NONE"
  | (string & {});
export type OverwriteMode = "ALWAYS" | "NEVER" | (string & {});
export type Atime = "NONE" | "BEST_EFFORT" | (string & {});
export type Mtime = "NONE" | "PRESERVE" | (string & {});
export type Uid = "NONE" | "INT_VALUE" | "NAME" | "BOTH" | (string & {});
export type Gid = "NONE" | "INT_VALUE" | "NAME" | "BOTH" | (string & {});
export type PreserveDeletedFiles = "PRESERVE" | "REMOVE" | (string & {});
export type PreserveDevices = "NONE" | "PRESERVE" | (string & {});
export type PosixPermissions = "NONE" | "PRESERVE" | (string & {});
export type BytesPerSecond = number;
export type TaskQueueing = "ENABLED" | "DISABLED" | (string & {});
export type LogLevel = "OFF" | "BASIC" | "TRANSFER" | (string & {});
export type TransferMode = "CHANGED" | "ALL" | (string & {});
export type SmbSecurityDescriptorCopyFlags =
  | "NONE"
  | "OWNER_DACL"
  | "OWNER_DACL_SACL"
  | (string & {});
export type ObjectTags = "PRESERVE" | "NONE" | (string & {});
export interface Options {
  VerifyMode?: VerifyMode;
  OverwriteMode?: OverwriteMode;
  Atime?: Atime;
  Mtime?: Mtime;
  Uid?: Uid;
  Gid?: Gid;
  PreserveDeletedFiles?: PreserveDeletedFiles;
  PreserveDevices?: PreserveDevices;
  PosixPermissions?: PosixPermissions;
  BytesPerSecond?: number;
  TaskQueueing?: TaskQueueing;
  LogLevel?: LogLevel;
  TransferMode?: TransferMode;
  SecurityDescriptorCopyFlags?: SmbSecurityDescriptorCopyFlags;
  ObjectTags?: ObjectTags;
}
export type FilterType = "SIMPLE_PATTERN" | (string & {});
export type FilterValue = string;
export interface FilterRule {
  FilterType?: FilterType;
  Value?: string;
}
export type FilterList = FilterRule[];
export type ScheduleExpressionCron = string;
export type ScheduleStatus = "ENABLED" | "DISABLED" | (string & {});
export interface TaskSchedule {
  ScheduleExpression: string;
  Status?: ScheduleStatus;
}
export type ManifestAction = "TRANSFER" | (string & {});
export type ManifestFormat = "CSV" | (string & {});
export type S3ObjectVersionId = string;
export interface S3ManifestConfig {
  ManifestObjectPath: string;
  BucketAccessRoleArn: string;
  S3BucketArn: string;
  ManifestObjectVersionId?: string;
}
export interface SourceManifestConfig {
  S3: S3ManifestConfig;
}
export interface ManifestConfig {
  Action?: ManifestAction;
  Format?: ManifestFormat;
  Source?: SourceManifestConfig;
}
export interface ReportDestinationS3 {
  Subdirectory?: string;
  S3BucketArn: string;
  BucketAccessRoleArn: string;
}
export interface ReportDestination {
  S3?: ReportDestinationS3;
}
export type ReportOutputType = "SUMMARY_ONLY" | "STANDARD" | (string & {});
export type ReportLevel =
  | "ERRORS_ONLY"
  | "SUCCESSES_AND_ERRORS"
  | (string & {});
export type ObjectVersionIds = "INCLUDE" | "NONE" | (string & {});
export interface ReportOverride {
  ReportLevel?: ReportLevel;
}
export interface ReportOverrides {
  Transferred?: ReportOverride;
  Verified?: ReportOverride;
  Deleted?: ReportOverride;
  Skipped?: ReportOverride;
}
export interface TaskReportConfig {
  Destination?: ReportDestination;
  OutputType?: ReportOutputType;
  ReportLevel?: ReportLevel;
  ObjectVersionIds?: ObjectVersionIds;
  Overrides?: ReportOverrides;
}
export type TaskMode = "BASIC" | "ENHANCED" | (string & {});
export interface CreateTaskRequest {
  SourceLocationArn: string;
  DestinationLocationArn: string;
  CloudWatchLogGroupArn?: string;
  Name?: string;
  Options?: Options;
  Excludes?: FilterRule[];
  Schedule?: TaskSchedule;
  Tags?: TagListEntry[];
  Includes?: FilterRule[];
  ManifestConfig?: ManifestConfig;
  TaskReportConfig?: TaskReportConfig;
  TaskMode?: TaskMode;
}
export type TaskArn = string;
export interface CreateTaskResponse {
  TaskArn?: string;
}
export interface DeleteAgentRequest {
  AgentArn: string;
}
export interface DeleteAgentResponse {}
export interface DeleteLocationRequest {
  LocationArn: string;
}
export interface DeleteLocationResponse {}
export interface DeleteTaskRequest {
  TaskArn: string;
}
export interface DeleteTaskResponse {}
export interface DescribeAgentRequest {
  AgentArn: string;
}
export type AgentStatus = "ONLINE" | "OFFLINE" | (string & {});
export type EndpointType =
  | "PUBLIC"
  | "PRIVATE_LINK"
  | "FIPS"
  | "FIPS_PRIVATE_LINK"
  | (string & {});
export type Endpoint = string;
export interface PrivateLinkConfig {
  VpcEndpointId?: string;
  PrivateLinkEndpoint?: string;
  SubnetArns?: string[];
  SecurityGroupArns?: string[];
}
export type AgentVersion = string;
export interface Platform {
  Version?: string;
}
export interface DescribeAgentResponse {
  AgentArn?: string;
  Name?: string;
  Status?: AgentStatus;
  LastConnectionTime?: Date;
  CreationTime?: Date;
  EndpointType?: EndpointType;
  PrivateLinkConfig?: PrivateLinkConfig;
  Platform?: Platform;
}
export interface DescribeLocationAzureBlobRequest {
  LocationArn: string;
}
export type LocationUri = string;
export interface DescribeLocationAzureBlobResponse {
  LocationArn?: string;
  LocationUri?: string;
  AuthenticationType?: AzureBlobAuthenticationType;
  BlobType?: AzureBlobType;
  AccessTier?: AzureAccessTier;
  AgentArns?: string[];
  CreationTime?: Date;
  ManagedSecretConfig?: ManagedSecretConfig;
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export interface DescribeLocationEfsRequest {
  LocationArn: string;
}
export interface DescribeLocationEfsResponse {
  LocationArn?: string;
  LocationUri?: string;
  Ec2Config?: Ec2Config;
  CreationTime?: Date;
  AccessPointArn?: string;
  FileSystemAccessRoleArn?: string;
  InTransitEncryption?: EfsInTransitEncryption;
}
export interface DescribeLocationFsxLustreRequest {
  LocationArn: string;
}
export interface DescribeLocationFsxLustreResponse {
  LocationArn?: string;
  LocationUri?: string;
  SecurityGroupArns?: string[];
  CreationTime?: Date;
}
export interface DescribeLocationFsxOntapRequest {
  LocationArn: string;
}
export interface DescribeLocationFsxOntapResponse {
  CreationTime?: Date;
  LocationArn?: string;
  LocationUri?: string;
  Protocol?: FsxProtocol;
  SecurityGroupArns?: string[];
  StorageVirtualMachineArn?: string;
  FsxFilesystemArn?: string;
}
export interface DescribeLocationFsxOpenZfsRequest {
  LocationArn: string;
}
export interface DescribeLocationFsxOpenZfsResponse {
  LocationArn?: string;
  LocationUri?: string;
  SecurityGroupArns?: string[];
  Protocol?: FsxProtocol;
  CreationTime?: Date;
}
export interface DescribeLocationFsxWindowsRequest {
  LocationArn: string;
}
export interface DescribeLocationFsxWindowsResponse {
  LocationArn?: string;
  LocationUri?: string;
  SecurityGroupArns?: string[];
  CreationTime?: Date;
  User?: string;
  Domain?: string;
  ManagedSecretConfig?: ManagedSecretConfig;
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export interface DescribeLocationHdfsRequest {
  LocationArn: string;
}
export interface DescribeLocationHdfsResponse {
  LocationArn?: string;
  LocationUri?: string;
  NameNodes?: HdfsNameNode[];
  BlockSize?: number;
  ReplicationFactor?: number;
  KmsKeyProviderUri?: string;
  QopConfiguration?: QopConfiguration;
  AuthenticationType?: HdfsAuthenticationType;
  SimpleUser?: string;
  KerberosPrincipal?: string;
  AgentArns?: string[];
  CreationTime?: Date;
  ManagedSecretConfig?: ManagedSecretConfig;
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export interface DescribeLocationNfsRequest {
  LocationArn: string;
}
export interface DescribeLocationNfsResponse {
  LocationArn?: string;
  LocationUri?: string;
  OnPremConfig?: OnPremConfig;
  MountOptions?: NfsMountOptions;
  CreationTime?: Date;
}
export interface DescribeLocationObjectStorageRequest {
  LocationArn: string;
}
export interface DescribeLocationObjectStorageResponse {
  LocationArn?: string;
  LocationUri?: string;
  AccessKey?: string;
  ServerPort?: number;
  ServerProtocol?: ObjectStorageServerProtocol;
  AgentArns?: string[];
  CreationTime?: Date;
  ServerCertificate?: Uint8Array;
  ManagedSecretConfig?: ManagedSecretConfig;
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export interface DescribeLocationS3Request {
  LocationArn: string;
}
export interface DescribeLocationS3Response {
  LocationArn?: string;
  LocationUri?: string;
  S3StorageClass?: S3StorageClass;
  S3Config?: S3Config;
  AgentArns?: string[];
  CreationTime?: Date;
}
export interface DescribeLocationSmbRequest {
  LocationArn: string;
}
export interface DescribeLocationSmbResponse {
  LocationArn?: string;
  LocationUri?: string;
  AgentArns?: string[];
  User?: string;
  Domain?: string;
  MountOptions?: SmbMountOptions;
  CreationTime?: Date;
  DnsIpAddresses?: string[];
  KerberosPrincipal?: string;
  AuthenticationType?: SmbAuthenticationType;
  ManagedSecretConfig?: ManagedSecretConfig;
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export interface DescribeTaskRequest {
  TaskArn: string;
}
export type TaskStatus =
  | "AVAILABLE"
  | "CREATING"
  | "QUEUED"
  | "RUNNING"
  | "UNAVAILABLE"
  | (string & {});
export type NetworkInterfaceArn = string;
export type SourceNetworkInterfaceArns = string[];
export type DestinationNetworkInterfaceArns = string[];
export type ScheduleDisabledReason = string;
export type ScheduleDisabledBy = "USER" | "SERVICE" | (string & {});
export interface TaskScheduleDetails {
  StatusUpdateTime?: Date;
  DisabledReason?: string;
  DisabledBy?: ScheduleDisabledBy;
}
export interface DescribeTaskResponse {
  TaskArn?: string;
  Status?: TaskStatus;
  Name?: string;
  CurrentTaskExecutionArn?: string;
  SourceLocationArn?: string;
  DestinationLocationArn?: string;
  CloudWatchLogGroupArn?: string;
  SourceNetworkInterfaceArns?: string[];
  DestinationNetworkInterfaceArns?: string[];
  Options?: Options;
  Excludes?: FilterRule[];
  Schedule?: TaskSchedule;
  ErrorCode?: string;
  ErrorDetail?: string;
  CreationTime?: Date;
  Includes?: FilterRule[];
  ManifestConfig?: ManifestConfig;
  TaskReportConfig?: TaskReportConfig;
  ScheduleDetails?: TaskScheduleDetails;
  TaskMode?: TaskMode;
}
export interface DescribeTaskExecutionRequest {
  TaskExecutionArn: string;
}
export type TaskExecutionStatus =
  | "QUEUED"
  | "CANCELLING"
  | "LAUNCHING"
  | "PREPARING"
  | "TRANSFERRING"
  | "VERIFYING"
  | "SUCCESS"
  | "ERROR"
  | (string & {});
export type Duration = number;
export type PhaseStatus = "PENDING" | "SUCCESS" | "ERROR" | (string & {});
export interface TaskExecutionResultDetail {
  PrepareDuration?: number;
  PrepareStatus?: PhaseStatus;
  TotalDuration?: number;
  TransferDuration?: number;
  TransferStatus?: PhaseStatus;
  VerifyDuration?: number;
  VerifyStatus?: PhaseStatus;
  ErrorCode?: string;
  ErrorDetail?: string;
}
export interface ReportResult {
  Status?: PhaseStatus;
  ErrorCode?: string;
  ErrorDetail?: string;
}
export interface TaskExecutionFilesListedDetail {
  AtSource?: number;
  AtDestinationForDelete?: number;
}
export interface TaskExecutionFilesFailedDetail {
  Prepare?: number;
  Transfer?: number;
  Verify?: number;
  Delete?: number;
}
export type ItemCount = number;
export interface TaskExecutionFoldersListedDetail {
  AtSource?: number;
  AtDestinationForDelete?: number;
}
export interface TaskExecutionFoldersFailedDetail {
  List?: number;
  Prepare?: number;
  Transfer?: number;
  Verify?: number;
  Delete?: number;
}
export interface DescribeTaskExecutionResponse {
  TaskExecutionArn?: string;
  Status?: TaskExecutionStatus;
  Options?: Options;
  Excludes?: FilterRule[];
  Includes?: FilterRule[];
  ManifestConfig?: ManifestConfig;
  StartTime?: Date;
  EstimatedFilesToTransfer?: number;
  EstimatedBytesToTransfer?: number;
  FilesTransferred?: number;
  BytesWritten?: number;
  BytesTransferred?: number;
  BytesCompressed?: number;
  Result?: TaskExecutionResultDetail;
  TaskReportConfig?: TaskReportConfig;
  FilesDeleted?: number;
  FilesSkipped?: number;
  FilesVerified?: number;
  ReportResult?: ReportResult;
  EstimatedFilesToDelete?: number;
  TaskMode?: TaskMode;
  FilesPrepared?: number;
  FilesListed?: TaskExecutionFilesListedDetail;
  FilesFailed?: TaskExecutionFilesFailedDetail;
  EstimatedFoldersToDelete?: number;
  EstimatedFoldersToTransfer?: number;
  FoldersSkipped?: number;
  FoldersPrepared?: number;
  FoldersTransferred?: number;
  FoldersVerified?: number;
  FoldersDeleted?: number;
  FoldersListed?: TaskExecutionFoldersListedDetail;
  FoldersFailed?: TaskExecutionFoldersFailedDetail;
  LaunchTime?: Date;
  EndTime?: Date;
}
export type MaxResults = number;
export type NextToken = string;
export interface ListAgentsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface AgentListEntry {
  AgentArn?: string;
  Name?: string;
  Status?: AgentStatus;
  Platform?: Platform;
}
export type AgentList = AgentListEntry[];
export interface ListAgentsResponse {
  Agents?: AgentListEntry[];
  NextToken?: string;
}
export type LocationFilterName =
  | "LocationUri"
  | "LocationType"
  | "CreationTime"
  | (string & {});
export type FilterAttributeValue = string;
export type FilterValues = string[];
export type Operator =
  | "Equals"
  | "NotEquals"
  | "In"
  | "LessThanOrEqual"
  | "LessThan"
  | "GreaterThanOrEqual"
  | "GreaterThan"
  | "Contains"
  | "NotContains"
  | "BeginsWith"
  | (string & {});
export interface LocationFilter {
  Name: LocationFilterName;
  Values: string[];
  Operator: Operator;
}
export type LocationFilters = LocationFilter[];
export interface ListLocationsRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: LocationFilter[];
}
export interface LocationListEntry {
  LocationArn?: string;
  LocationUri?: string;
}
export type LocationList = LocationListEntry[];
export interface ListLocationsResponse {
  Locations?: LocationListEntry[];
  NextToken?: string;
}
export type TaggableResourceArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export type OutputTagList = TagListEntry[];
export interface ListTagsForResourceResponse {
  Tags?: TagListEntry[];
  NextToken?: string;
}
export interface ListTaskExecutionsRequest {
  TaskArn?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface TaskExecutionListEntry {
  TaskExecutionArn?: string;
  Status?: TaskExecutionStatus;
  TaskMode?: TaskMode;
}
export type TaskExecutionList = TaskExecutionListEntry[];
export interface ListTaskExecutionsResponse {
  TaskExecutions?: TaskExecutionListEntry[];
  NextToken?: string;
}
export type TaskFilterName = "LocationId" | "CreationTime" | (string & {});
export interface TaskFilter {
  Name: TaskFilterName;
  Values: string[];
  Operator: Operator;
}
export type TaskFilters = TaskFilter[];
export interface ListTasksRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: TaskFilter[];
}
export interface TaskListEntry {
  TaskArn?: string;
  Status?: TaskStatus;
  Name?: string;
  TaskMode?: TaskMode;
}
export type TaskList = TaskListEntry[];
export interface ListTasksResponse {
  Tasks?: TaskListEntry[];
  NextToken?: string;
}
export interface StartTaskExecutionRequest {
  TaskArn: string;
  OverrideOptions?: Options;
  Includes?: FilterRule[];
  Excludes?: FilterRule[];
  ManifestConfig?: ManifestConfig;
  TaskReportConfig?: TaskReportConfig;
  Tags?: TagListEntry[];
}
export interface StartTaskExecutionResponse {
  TaskExecutionArn?: string;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: TagListEntry[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  Keys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAgentRequest {
  AgentArn: string;
  Name?: string;
}
export interface UpdateAgentResponse {}
export interface UpdateLocationAzureBlobRequest {
  LocationArn: string;
  Subdirectory?: string;
  AuthenticationType?: AzureBlobAuthenticationType;
  SasConfiguration?: AzureBlobSasConfiguration;
  BlobType?: AzureBlobType;
  AccessTier?: AzureAccessTier;
  AgentArns?: string[];
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export interface UpdateLocationAzureBlobResponse {}
export type UpdatedEfsAccessPointArn = string;
export type UpdatedEfsIamRoleArn = string;
export interface UpdateLocationEfsRequest {
  LocationArn: string;
  Subdirectory?: string;
  AccessPointArn?: string;
  FileSystemAccessRoleArn?: string;
  InTransitEncryption?: EfsInTransitEncryption;
}
export interface UpdateLocationEfsResponse {}
export interface UpdateLocationFsxLustreRequest {
  LocationArn: string;
  Subdirectory?: string;
}
export interface UpdateLocationFsxLustreResponse {}
export type UpdateSmbDomain = string;
export interface FsxUpdateProtocolSmb {
  Domain?: string;
  MountOptions?: SmbMountOptions;
  Password?: string | redacted.Redacted<string>;
  User?: string;
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export interface FsxUpdateProtocol {
  NFS?: FsxProtocolNfs;
  SMB?: FsxUpdateProtocolSmb;
}
export interface UpdateLocationFsxOntapRequest {
  LocationArn: string;
  Protocol?: FsxUpdateProtocol;
  Subdirectory?: string;
}
export interface UpdateLocationFsxOntapResponse {}
export interface UpdateLocationFsxOpenZfsRequest {
  LocationArn: string;
  Protocol?: FsxProtocol;
  Subdirectory?: string;
}
export interface UpdateLocationFsxOpenZfsResponse {}
export interface UpdateLocationFsxWindowsRequest {
  LocationArn: string;
  Subdirectory?: string;
  Domain?: string;
  User?: string;
  Password?: string | redacted.Redacted<string>;
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export interface UpdateLocationFsxWindowsResponse {}
export interface UpdateLocationHdfsRequest {
  LocationArn: string;
  Subdirectory?: string;
  NameNodes?: HdfsNameNode[];
  BlockSize?: number;
  ReplicationFactor?: number;
  KmsKeyProviderUri?: string;
  QopConfiguration?: QopConfiguration;
  AuthenticationType?: HdfsAuthenticationType;
  SimpleUser?: string;
  KerberosPrincipal?: string;
  KerberosKeytab?: Uint8Array;
  KerberosKrb5Conf?: Uint8Array;
  AgentArns?: string[];
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export interface UpdateLocationHdfsResponse {}
export interface UpdateLocationNfsRequest {
  LocationArn: string;
  Subdirectory?: string;
  ServerHostname?: string;
  OnPremConfig?: OnPremConfig;
  MountOptions?: NfsMountOptions;
}
export interface UpdateLocationNfsResponse {}
export interface UpdateLocationObjectStorageRequest {
  LocationArn: string;
  ServerPort?: number;
  ServerProtocol?: ObjectStorageServerProtocol;
  Subdirectory?: string;
  ServerHostname?: string;
  AccessKey?: string;
  SecretKey?: string | redacted.Redacted<string>;
  AgentArns?: string[];
  ServerCertificate?: Uint8Array;
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
}
export interface UpdateLocationObjectStorageResponse {}
export interface UpdateLocationS3Request {
  LocationArn: string;
  Subdirectory?: string;
  S3StorageClass?: S3StorageClass;
  S3Config?: S3Config;
}
export interface UpdateLocationS3Response {}
export interface UpdateLocationSmbRequest {
  LocationArn: string;
  Subdirectory?: string;
  ServerHostname?: string;
  User?: string;
  Domain?: string;
  Password?: string | redacted.Redacted<string>;
  CmkSecretConfig?: CmkSecretConfig;
  CustomSecretConfig?: CustomSecretConfig;
  AgentArns?: string[];
  MountOptions?: SmbMountOptions;
  AuthenticationType?: SmbAuthenticationType;
  DnsIpAddresses?: string[];
  KerberosPrincipal?: string;
  KerberosKeytab?: Uint8Array;
  KerberosKrb5Conf?: Uint8Array;
}
export interface UpdateLocationSmbResponse {}
export interface UpdateTaskRequest {
  TaskArn: string;
  Options?: Options;
  Excludes?: FilterRule[];
  Schedule?: TaskSchedule;
  Name?: string;
  CloudWatchLogGroupArn?: string;
  Includes?: FilterRule[];
  ManifestConfig?: ManifestConfig;
  TaskReportConfig?: TaskReportConfig;
}
export interface UpdateTaskResponse {}
export interface UpdateTaskExecutionRequest {
  TaskExecutionArn: string;
  Options: Options;
}
export interface UpdateTaskExecutionResponse {}
export type CancelTaskExecutionError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Stops an DataSync task execution that's in progress. The transfer of some
 * files are abruptly interrupted. File contents that're transferred to the destination might be
 * incomplete or inconsistent with the source files.
 *
 * However, if you start a new task execution using the same task and allow it to finish,
 * file content on the destination will be complete and consistent. This applies to other
 * unexpected failures that interrupt a task execution. In all of these cases, DataSync
 * successfully completes the transfer when you start the next task execution.
 */
export const cancelTaskExecution: API.OperationMethod<
  CancelTaskExecutionRequest,
  CancelTaskExecutionResponse,
  CancelTaskExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TaskExecutionArn: 0 } },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelTaskExecution",
})) as any;

export type CreateAgentError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Activates an DataSync agent that you deploy in your storage environment.
 * The activation process associates the agent with your Amazon Web Services account.
 *
 * If you haven't deployed an agent yet, see Do I need a DataSync
 * agent?
 */
export const createAgent: API.OperationMethod<
  CreateAgentRequest,
  CreateAgentResponse,
  CreateAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ActivationKey: 0,
      AgentName: 0,
      Tags: D.list(i_TagListEntry),
      VpcEndpointId: 0,
      SubnetArns: 0,
      SecurityGroupArns: 0,
    },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAgent",
})) as any;

export type CreateLocationAzureBlobError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates a transfer *location* for a Microsoft Azure Blob Storage
 * container. DataSync can use this location as a transfer source or destination.
 * You can make transfers with or without a DataSync agent that connects to your
 * container.
 *
 * Before you begin, make sure you know how DataSync accesses Azure Blob Storage and works with access tiers and blob types.
 */
export const createLocationAzureBlob: API.OperationMethod<
  CreateLocationAzureBlobRequest,
  CreateLocationAzureBlobResponse,
  CreateLocationAzureBlobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ContainerUrl: 0,
      AuthenticationType: 0,
      SasConfiguration: i_AzureBlobSasConfiguration,
      BlobType: 0,
      AccessTier: 0,
      Subdirectory: 0,
      AgentArns: 0,
      Tags: D.list(i_TagListEntry),
      CmkSecretConfig: i_CmkSecretConfig,
      CustomSecretConfig: i_CustomSecretConfig,
    },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationAzureBlob",
})) as any;

export type CreateLocationEfsError =
  | InternalException
  | InvalidRequestException
  | LocationRoleNotAssumable
  | LocationAccessTestFailed
  | CommonErrors;
/**
 * Creates a transfer *location* for an Amazon EFS file system.
 * DataSync can use this location as a source or destination for transferring
 * data.
 *
 * Before you begin, make sure that you understand how DataSync
 * accesses
 * Amazon EFS file systems.
 */
export const createLocationEfs: API.OperationMethod<
  CreateLocationEfsRequest,
  CreateLocationEfsResponse,
  CreateLocationEfsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Subdirectory: 0,
      EfsFilesystemArn: 0,
      Ec2Config: { SubnetArn: 0, SecurityGroupArns: 0 },
      Tags: D.list(i_TagListEntry),
      AccessPointArn: 0,
      FileSystemAccessRoleArn: 0,
      InTransitEncryption: 0,
    },
  },
  errors: [
    InternalException,
    InvalidRequestException,
    LocationRoleNotAssumable,
    LocationAccessTestFailed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationEfs",
})) as any;

export type CreateLocationFsxLustreError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates a transfer *location* for an Amazon FSx for Lustre file
 * system. DataSync can use this location as a source or destination for
 * transferring data.
 *
 * Before you begin, make sure that you understand how DataSync
 * accesses FSx for Lustre file systems.
 */
export const createLocationFsxLustre: API.OperationMethod<
  CreateLocationFsxLustreRequest,
  CreateLocationFsxLustreResponse,
  CreateLocationFsxLustreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      FsxFilesystemArn: 0,
      SecurityGroupArns: 0,
      Subdirectory: 0,
      Tags: D.list(i_TagListEntry),
    },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationFsxLustre",
})) as any;

export type CreateLocationFsxOntapError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates a transfer *location* for an Amazon FSx for NetApp ONTAP file
 * system. DataSync can use this location as a source or destination for
 * transferring data.
 *
 * Before you begin, make sure that you understand how DataSync
 * accesses FSx for ONTAP file systems.
 */
export const createLocationFsxOntap: API.OperationMethod<
  CreateLocationFsxOntapRequest,
  CreateLocationFsxOntapResponse,
  CreateLocationFsxOntapError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Protocol: i_FsxProtocol,
      SecurityGroupArns: 0,
      StorageVirtualMachineArn: 0,
      Subdirectory: 0,
      Tags: D.list(i_TagListEntry),
    },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationFsxOntap",
})) as any;

export type CreateLocationFsxOpenZfsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates a transfer *location* for an Amazon FSx for OpenZFS file
 * system. DataSync can use this location as a source or destination for
 * transferring data.
 *
 * Before you begin, make sure that you understand how DataSync
 * accesses
 * FSx for OpenZFS file systems.
 *
 * Request parameters related to `SMB` aren't supported with the
 * `CreateLocationFsxOpenZfs` operation.
 */
export const createLocationFsxOpenZfs: API.OperationMethod<
  CreateLocationFsxOpenZfsRequest,
  CreateLocationFsxOpenZfsResponse,
  CreateLocationFsxOpenZfsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      FsxFilesystemArn: 0,
      Protocol: i_FsxProtocol,
      SecurityGroupArns: 0,
      Subdirectory: 0,
      Tags: D.list(i_TagListEntry),
    },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationFsxOpenZfs",
})) as any;

export type CreateLocationFsxWindowsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates a transfer *location* for an Amazon FSx for Windows File Server file
 * system. DataSync can use this location as a source or destination for
 * transferring data.
 *
 * Before you begin, make sure that you understand how DataSync
 * accesses
 * FSx for Windows File Server file systems.
 */
export const createLocationFsxWindows: API.OperationMethod<
  CreateLocationFsxWindowsRequest,
  CreateLocationFsxWindowsResponse,
  CreateLocationFsxWindowsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Subdirectory: 0,
      FsxFilesystemArn: 0,
      SecurityGroupArns: 0,
      Tags: D.list(i_TagListEntry),
      User: 0,
      Domain: 0,
      Password: 0,
      CmkSecretConfig: i_CmkSecretConfig,
      CustomSecretConfig: i_CustomSecretConfig,
    },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationFsxWindows",
})) as any;

export type CreateLocationHdfsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates a transfer *location* for a Hadoop Distributed File System
 * (HDFS). DataSync can use this location as a source or destination for
 * transferring data.
 *
 * Before you begin, make sure that you understand how DataSync
 * accesses HDFS
 * clusters.
 */
export const createLocationHdfs: API.OperationMethod<
  CreateLocationHdfsRequest,
  CreateLocationHdfsResponse,
  CreateLocationHdfsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Subdirectory: 0,
      NameNodes: D.list(i_HdfsNameNode),
      BlockSize: 0,
      ReplicationFactor: 0,
      KmsKeyProviderUri: 0,
      QopConfiguration: i_QopConfiguration,
      AuthenticationType: 0,
      SimpleUser: 0,
      KerberosPrincipal: 0,
      KerberosKeytab: 0,
      KerberosKrb5Conf: 0,
      AgentArns: 0,
      Tags: D.list(i_TagListEntry),
      CmkSecretConfig: i_CmkSecretConfig,
      CustomSecretConfig: i_CustomSecretConfig,
    },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationHdfs",
})) as any;

export type CreateLocationNfsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates a transfer *location* for a Network File System (NFS) file
 * server. DataSync can use this location as a source or destination for
 * transferring data.
 *
 * Before you begin, make sure that you understand how DataSync
 * accesses NFS file
 * servers.
 */
export const createLocationNfs: API.OperationMethod<
  CreateLocationNfsRequest,
  CreateLocationNfsResponse,
  CreateLocationNfsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Subdirectory: 0,
      ServerHostname: 0,
      OnPremConfig: i_OnPremConfig,
      MountOptions: i_NfsMountOptions,
      Tags: D.list(i_TagListEntry),
    },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationNfs",
})) as any;

export type CreateLocationObjectStorageError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates a transfer *location* for an object storage system. DataSync can use this location as a source or destination for transferring data. You
 * can make transfers with or without a DataSync
 * agent.
 *
 * Before you begin, make sure that you understand the prerequisites for DataSync to work with object storage systems.
 */
export const createLocationObjectStorage: API.OperationMethod<
  CreateLocationObjectStorageRequest,
  CreateLocationObjectStorageResponse,
  CreateLocationObjectStorageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ServerHostname: 0,
      ServerPort: 0,
      ServerProtocol: 0,
      Subdirectory: 0,
      BucketName: 0,
      AccessKey: 0,
      SecretKey: 0,
      AgentArns: 0,
      Tags: D.list(i_TagListEntry),
      ServerCertificate: 0,
      CmkSecretConfig: i_CmkSecretConfig,
      CustomSecretConfig: i_CustomSecretConfig,
    },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationObjectStorage",
})) as any;

export type CreateLocationS3Error =
  | InternalException
  | InvalidRequestException
  | LocationRoleNotAssumable
  | LocationAccessTestFailed
  | CommonErrors;
/**
 * Creates a transfer *location* for an Amazon S3 bucket.
 * DataSync can use this location as a source or destination for transferring
 * data.
 *
 * Before you begin, make sure that you read the following topics:
 *
 * - Storage
 * class considerations with Amazon S3 locations
 *
 * - Evaluating S3 request costs when using DataSync
 *
 * For more information, see Configuring
 * transfers with Amazon S3.
 */
export const createLocationS3: API.OperationMethod<
  CreateLocationS3Request,
  CreateLocationS3Response,
  CreateLocationS3Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Subdirectory: 0,
      S3BucketArn: 0,
      S3StorageClass: 0,
      S3Config: i_S3Config,
      AgentArns: 0,
      Tags: D.list(i_TagListEntry),
    },
  },
  errors: [
    InternalException,
    InvalidRequestException,
    LocationRoleNotAssumable,
    LocationAccessTestFailed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationS3",
})) as any;

export type CreateLocationSmbError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates a transfer *location* for a Server Message Block (SMB) file
 * server. DataSync can use this location as a source or destination for
 * transferring data.
 *
 * Before you begin, make sure that you understand how DataSync accesses SMB
 * file servers. For more information, see Providing DataSync access to SMB file servers.
 */
export const createLocationSmb: API.OperationMethod<
  CreateLocationSmbRequest,
  CreateLocationSmbResponse,
  CreateLocationSmbError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Subdirectory: 0,
      ServerHostname: 0,
      User: 0,
      Domain: 0,
      Password: 0,
      CmkSecretConfig: i_CmkSecretConfig,
      CustomSecretConfig: i_CustomSecretConfig,
      AgentArns: 0,
      MountOptions: i_SmbMountOptions,
      Tags: D.list(i_TagListEntry),
      AuthenticationType: 0,
      DnsIpAddresses: 0,
      KerberosPrincipal: 0,
      KerberosKeytab: 0,
      KerberosKrb5Conf: 0,
    },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationSmb",
})) as any;

export type CreateTaskError =
  | InternalException
  | InvalidRequestException
  | LocationAccessTestFailed
  | CommonErrors;
/**
 * Configures a *task*, which defines where and how DataSync
 * transfers your data.
 *
 * A task includes a source location, destination location, and transfer options (such as
 * bandwidth limits, scheduling, and more).
 *
 * If you're planning to transfer data to or from an Amazon S3 location, review
 * how
 * DataSync can affect your S3 request charges and the DataSync pricing page before
 * you begin.
 */
export const createTask: API.OperationMethod<
  CreateTaskRequest,
  CreateTaskResponse,
  CreateTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SourceLocationArn: 0,
      DestinationLocationArn: 0,
      CloudWatchLogGroupArn: 0,
      Name: 0,
      Options: i_Options,
      Excludes: D.list(i_FilterRule),
      Schedule: i_TaskSchedule,
      Tags: D.list(i_TagListEntry),
      Includes: D.list(i_FilterRule),
      ManifestConfig: i_ManifestConfig,
      TaskReportConfig: i_TaskReportConfig,
      TaskMode: 0,
    },
  },
  errors: [
    InternalException,
    InvalidRequestException,
    LocationAccessTestFailed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTask",
})) as any;

export type DeleteAgentError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Removes an DataSync agent resource from your Amazon Web Services account.
 *
 * Keep in mind that this operation (which can't be undone) doesn't remove the agent's
 * virtual machine (VM) or Amazon EC2 instance from your storage environment. For next
 * steps, you can delete the VM or instance from your storage environment or reuse it to activate a new
 * agent.
 */
export const deleteAgent: API.OperationMethod<
  DeleteAgentRequest,
  DeleteAgentResponse,
  DeleteAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AgentArn: 0 } },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAgent",
})) as any;

export type DeleteLocationError =
  | InternalException
  | InvalidRequestException
  | LocationNotFound
  | CommonErrors;
/**
 * Deletes a transfer location resource from DataSync.
 */
export const deleteLocation: API.OperationMethod<
  DeleteLocationRequest,
  DeleteLocationResponse,
  DeleteLocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { LocationArn: 0 } },
  errors: [InternalException, InvalidRequestException, LocationNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLocation",
})) as any;

export type DeleteTaskError =
  | InternalException
  | InvalidRequestException
  | TaskNotFound
  | CommonErrors;
/**
 * Deletes a transfer task resource from DataSync.
 */
export const deleteTask: API.OperationMethod<
  DeleteTaskRequest,
  DeleteTaskResponse,
  DeleteTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TaskArn: 0 } },
  errors: [InternalException, InvalidRequestException, TaskNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTask",
})) as any;

export type DescribeAgentError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns information about an DataSync agent, such as its name, service
 * endpoint type, and status.
 */
export const describeAgent: API.OperationMethod<
  DescribeAgentRequest,
  DescribeAgentResponse,
  DescribeAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AgentArn: 0 },
    output: { LastConnectionTime: D.ts, CreationTime: D.ts },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAgent",
})) as any;

export type DescribeLocationAzureBlobError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides details about how an DataSync transfer location for Microsoft Azure
 * Blob Storage is configured.
 */
export const describeLocationAzureBlob: API.OperationMethod<
  DescribeLocationAzureBlobRequest,
  DescribeLocationAzureBlobResponse,
  DescribeLocationAzureBlobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LocationArn: 0 },
    output: { CreationTime: D.ts },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationAzureBlob",
})) as any;

export type DescribeLocationEfsError =
  | InternalException
  | InvalidRequestException
  | LocationNotFound
  | CommonErrors;
/**
 * Provides details about how an DataSync transfer location for an Amazon EFS file system is configured.
 */
export const describeLocationEfs: API.OperationMethod<
  DescribeLocationEfsRequest,
  DescribeLocationEfsResponse,
  DescribeLocationEfsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LocationArn: 0 },
    output: { CreationTime: D.ts },
  },
  errors: [InternalException, InvalidRequestException, LocationNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationEfs",
})) as any;

export type DescribeLocationFsxLustreError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides details about how an DataSync transfer location for an Amazon FSx for Lustre file system is configured.
 */
export const describeLocationFsxLustre: API.OperationMethod<
  DescribeLocationFsxLustreRequest,
  DescribeLocationFsxLustreResponse,
  DescribeLocationFsxLustreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LocationArn: 0 },
    output: { CreationTime: D.ts },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationFsxLustre",
})) as any;

export type DescribeLocationFsxOntapError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides details about how an DataSync transfer location for an Amazon FSx for NetApp ONTAP file system is configured.
 *
 * If your location uses SMB, the `DescribeLocationFsxOntap` operation doesn't
 * actually return a `Password`.
 */
export const describeLocationFsxOntap: API.OperationMethod<
  DescribeLocationFsxOntapRequest,
  DescribeLocationFsxOntapResponse,
  DescribeLocationFsxOntapError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LocationArn: 0 },
    output: { CreationTime: D.ts, Protocol: o_FsxProtocol },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationFsxOntap",
})) as any;

export type DescribeLocationFsxOpenZfsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides details about how an DataSync transfer location for an Amazon FSx for OpenZFS file system is configured.
 *
 * Response elements related to `SMB` aren't supported with the
 * `DescribeLocationFsxOpenZfs` operation.
 */
export const describeLocationFsxOpenZfs: API.OperationMethod<
  DescribeLocationFsxOpenZfsRequest,
  DescribeLocationFsxOpenZfsResponse,
  DescribeLocationFsxOpenZfsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LocationArn: 0 },
    output: { Protocol: o_FsxProtocol, CreationTime: D.ts },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationFsxOpenZfs",
})) as any;

export type DescribeLocationFsxWindowsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides details about how an DataSync transfer location for an Amazon FSx for Windows File Server file system is configured.
 */
export const describeLocationFsxWindows: API.OperationMethod<
  DescribeLocationFsxWindowsRequest,
  DescribeLocationFsxWindowsResponse,
  DescribeLocationFsxWindowsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LocationArn: 0 },
    output: { CreationTime: D.ts },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationFsxWindows",
})) as any;

export type DescribeLocationHdfsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides details about how an DataSync transfer location for a Hadoop
 * Distributed File System (HDFS) is configured.
 */
export const describeLocationHdfs: API.OperationMethod<
  DescribeLocationHdfsRequest,
  DescribeLocationHdfsResponse,
  DescribeLocationHdfsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LocationArn: 0 },
    output: { CreationTime: D.ts },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationHdfs",
})) as any;

export type DescribeLocationNfsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides details about how an DataSync transfer location for a Network
 * File System (NFS) file server is configured.
 */
export const describeLocationNfs: API.OperationMethod<
  DescribeLocationNfsRequest,
  DescribeLocationNfsResponse,
  DescribeLocationNfsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LocationArn: 0 },
    output: { CreationTime: D.ts },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationNfs",
})) as any;

export type DescribeLocationObjectStorageError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides details about how an DataSync transfer location for an object
 * storage system is configured.
 */
export const describeLocationObjectStorage: API.OperationMethod<
  DescribeLocationObjectStorageRequest,
  DescribeLocationObjectStorageResponse,
  DescribeLocationObjectStorageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LocationArn: 0 },
    output: { CreationTime: D.ts, ServerCertificate: D.blob },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationObjectStorage",
})) as any;

export type DescribeLocationS3Error =
  | InternalException
  | InvalidRequestException
  | LocationNotFound
  | CommonErrors;
/**
 * Provides details about how an DataSync transfer location for an S3 bucket
 * is configured.
 */
export const describeLocationS3: API.OperationMethod<
  DescribeLocationS3Request,
  DescribeLocationS3Response,
  DescribeLocationS3Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LocationArn: 0 },
    output: { CreationTime: D.ts },
  },
  errors: [InternalException, InvalidRequestException, LocationNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationS3",
})) as any;

export type DescribeLocationSmbError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides details about how an DataSync transfer location for a Server
 * Message Block (SMB) file server is configured.
 */
export const describeLocationSmb: API.OperationMethod<
  DescribeLocationSmbRequest,
  DescribeLocationSmbResponse,
  DescribeLocationSmbError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LocationArn: 0 },
    output: { CreationTime: D.ts },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationSmb",
})) as any;

export type DescribeTaskError =
  | InternalException
  | InvalidRequestException
  | TaskNotFound
  | CommonErrors;
/**
 * Provides information about a *task*, which defines where and how
 * DataSync transfers your data.
 */
export const describeTask: API.OperationMethod<
  DescribeTaskRequest,
  DescribeTaskResponse,
  DescribeTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TaskArn: 0 },
    output: { CreationTime: D.ts, ScheduleDetails: { StatusUpdateTime: D.ts } },
  },
  errors: [InternalException, InvalidRequestException, TaskNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTask",
})) as any;

export type DescribeTaskExecutionError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides information about an execution of your DataSync task. You can
 * use this operation to help monitor the progress of an ongoing data transfer or check the
 * results of the transfer.
 *
 * Some `DescribeTaskExecution` response elements are only relevant to a
 * specific task mode. For information, see Understanding task mode differences and Understanding data
 * transfer performance counters.
 */
export const describeTaskExecution: API.OperationMethod<
  DescribeTaskExecutionRequest,
  DescribeTaskExecutionResponse,
  DescribeTaskExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TaskExecutionArn: 0 },
    output: { StartTime: D.ts, LaunchTime: D.ts, EndTime: D.ts },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTaskExecution",
})) as any;

export type ListAgentsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns a list of DataSync agents that belong to an Amazon Web Services account in the Amazon Web Services Region specified in the request.
 *
 * With pagination, you can reduce the number of agents returned in a response. If you get
 * a truncated list of agents in a response, the response contains a marker that you can specify
 * in your next request to fetch the next page of agents.
 *
 * `ListAgents` is eventually consistent. This means the result of running the
 * operation might not reflect that you just created or deleted an agent. For example, if you
 * create an agent with CreateAgent and then
 * immediately run `ListAgents`, that agent might not show up in the list right away.
 * In situations like this, you can always confirm whether an agent has been created (or deleted)
 * by using DescribeAgent.
 */
export const listAgents: API.PaginatedOperationMethod<
  ListAgentsRequest,
  ListAgentsResponse,
  ListAgentsError,
  Credentials | HttpClient.HttpClient,
  AgentListEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0 } },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Agents",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLocationsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns a list of source and destination locations.
 *
 * If you have more locations than are returned in a response (that is, the response
 * returns only a truncated list of your agents), the response contains a token that you can
 * specify in your next request to fetch the next page of locations.
 */
export const listLocations: API.PaginatedOperationMethod<
  ListLocationsRequest,
  ListLocationsResponse,
  ListLocationsError,
  Credentials | HttpClient.HttpClient,
  LocationListEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      MaxResults: 0,
      NextToken: 0,
      Filters: D.list({ Name: 0, Values: 0, Operator: 0 }),
    },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLocations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Locations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns all the tags associated with an Amazon Web Services resource.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  TagListEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Tags",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTaskExecutionsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns a list of executions for an DataSync transfer task.
 */
export const listTaskExecutions: API.PaginatedOperationMethod<
  ListTaskExecutionsRequest,
  ListTaskExecutionsResponse,
  ListTaskExecutionsError,
  Credentials | HttpClient.HttpClient,
  TaskExecutionListEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { TaskArn: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTaskExecutions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TaskExecutions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTasksError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns a list of the DataSync tasks you created.
 */
export const listTasks: API.PaginatedOperationMethod<
  ListTasksRequest,
  ListTasksResponse,
  ListTasksError,
  Credentials | HttpClient.HttpClient,
  TaskListEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      MaxResults: 0,
      NextToken: 0,
      Filters: D.list({ Name: 0, Values: 0, Operator: 0 }),
    },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Tasks",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type StartTaskExecutionError =
  | InternalException
  | InvalidRequestException
  | LocationAccessTestFailed
  | CommonErrors;
/**
 * Starts an DataSync transfer task. For each task, you can only run one task
 * execution at a time.
 *
 * There are several steps to a task execution. For more information, see Task execution statuses.
 *
 * If you're planning to transfer data to or from an Amazon S3 location, review
 * how
 * DataSync can affect your S3 request charges and the DataSync pricing page before
 * you begin.
 */
export const startTaskExecution: API.OperationMethod<
  StartTaskExecutionRequest,
  StartTaskExecutionResponse,
  StartTaskExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TaskArn: 0,
      OverrideOptions: i_Options,
      Includes: D.list(i_FilterRule),
      Excludes: D.list(i_FilterRule),
      ManifestConfig: i_ManifestConfig,
      TaskReportConfig: i_TaskReportConfig,
      Tags: D.list(i_TagListEntry),
    },
  },
  errors: [
    InternalException,
    InvalidRequestException,
    LocationAccessTestFailed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTaskExecution",
})) as any;

export type TagResourceError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Applies a *tag* to an Amazon Web Services resource. Tags are
 * key-value pairs that can help you manage, filter, and search for your resources.
 *
 * These include DataSync resources, such as locations, tasks, and task
 * executions.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: 0, Tags: D.list(i_TagListEntry) },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Removes tags from an Amazon Web Services resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, Keys: 0 } },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAgentError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Updates the name of an DataSync agent.
 */
export const updateAgent: API.OperationMethod<
  UpdateAgentRequest,
  UpdateAgentResponse,
  UpdateAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AgentArn: 0, Name: 0 } },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAgent",
})) as any;

export type UpdateLocationAzureBlobError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Modifies the following configurations of the Microsoft Azure Blob Storage transfer
 * location that you're using with DataSync.
 *
 * For more information, see Configuring DataSync transfers with Azure Blob Storage.
 */
export const updateLocationAzureBlob: API.OperationMethod<
  UpdateLocationAzureBlobRequest,
  UpdateLocationAzureBlobResponse,
  UpdateLocationAzureBlobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LocationArn: 0,
      Subdirectory: 0,
      AuthenticationType: 0,
      SasConfiguration: i_AzureBlobSasConfiguration,
      BlobType: 0,
      AccessTier: 0,
      AgentArns: 0,
      CmkSecretConfig: i_CmkSecretConfig,
      CustomSecretConfig: i_CustomSecretConfig,
    },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationAzureBlob",
})) as any;

export type UpdateLocationEfsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Modifies the following configuration parameters of the Amazon EFS transfer
 * location that you're using with DataSync.
 *
 * For more information, see Configuring DataSync
 * transfers with Amazon EFS.
 */
export const updateLocationEfs: API.OperationMethod<
  UpdateLocationEfsRequest,
  UpdateLocationEfsResponse,
  UpdateLocationEfsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LocationArn: 0,
      Subdirectory: 0,
      AccessPointArn: 0,
      FileSystemAccessRoleArn: 0,
      InTransitEncryption: 0,
    },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationEfs",
})) as any;

export type UpdateLocationFsxLustreError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Modifies the following configuration parameters of the Amazon FSx for Lustre
 * transfer location that you're using with DataSync.
 *
 * For more information, see Configuring DataSync
 * transfers with FSx for Lustre.
 */
export const updateLocationFsxLustre: API.OperationMethod<
  UpdateLocationFsxLustreRequest,
  UpdateLocationFsxLustreResponse,
  UpdateLocationFsxLustreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { LocationArn: 0, Subdirectory: 0 } },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationFsxLustre",
})) as any;

export type UpdateLocationFsxOntapError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Modifies the following configuration parameters of the Amazon FSx for NetApp ONTAP
 * transfer location that you're using with DataSync.
 *
 * For more information, see Configuring DataSync
 * transfers with FSx for ONTAP.
 */
export const updateLocationFsxOntap: API.OperationMethod<
  UpdateLocationFsxOntapRequest,
  UpdateLocationFsxOntapResponse,
  UpdateLocationFsxOntapError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LocationArn: 0,
      Protocol: {
        NFS: i_FsxProtocolNfs,
        SMB: {
          Domain: 0,
          MountOptions: i_SmbMountOptions,
          Password: 0,
          User: 0,
          CmkSecretConfig: i_CmkSecretConfig,
          CustomSecretConfig: i_CustomSecretConfig,
        },
      },
      Subdirectory: 0,
    },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationFsxOntap",
})) as any;

export type UpdateLocationFsxOpenZfsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Modifies the following configuration parameters of the Amazon FSx for OpenZFS
 * transfer location that you're using with DataSync.
 *
 * For more information, see Configuring DataSync
 * transfers with FSx for OpenZFS.
 *
 * Request parameters related to `SMB` aren't supported with the
 * `UpdateLocationFsxOpenZfs` operation.
 */
export const updateLocationFsxOpenZfs: API.OperationMethod<
  UpdateLocationFsxOpenZfsRequest,
  UpdateLocationFsxOpenZfsResponse,
  UpdateLocationFsxOpenZfsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LocationArn: 0, Protocol: i_FsxProtocol, Subdirectory: 0 },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationFsxOpenZfs",
})) as any;

export type UpdateLocationFsxWindowsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Modifies the following configuration parameters of the Amazon FSx for Windows File Server
 * transfer location that you're using with DataSync.
 *
 * For more information, see Configuring DataSync
 * transfers with FSx for Windows File Server.
 */
export const updateLocationFsxWindows: API.OperationMethod<
  UpdateLocationFsxWindowsRequest,
  UpdateLocationFsxWindowsResponse,
  UpdateLocationFsxWindowsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LocationArn: 0,
      Subdirectory: 0,
      Domain: 0,
      User: 0,
      Password: 0,
      CmkSecretConfig: i_CmkSecretConfig,
      CustomSecretConfig: i_CustomSecretConfig,
    },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationFsxWindows",
})) as any;

export type UpdateLocationHdfsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Modifies the following configuration parameters of the Hadoop Distributed File System
 * (HDFS) transfer location that you're using with DataSync.
 *
 * For more information, see Configuring DataSync
 * transfers with an HDFS cluster.
 */
export const updateLocationHdfs: API.OperationMethod<
  UpdateLocationHdfsRequest,
  UpdateLocationHdfsResponse,
  UpdateLocationHdfsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LocationArn: 0,
      Subdirectory: 0,
      NameNodes: D.list(i_HdfsNameNode),
      BlockSize: 0,
      ReplicationFactor: 0,
      KmsKeyProviderUri: 0,
      QopConfiguration: i_QopConfiguration,
      AuthenticationType: 0,
      SimpleUser: 0,
      KerberosPrincipal: 0,
      KerberosKeytab: 0,
      KerberosKrb5Conf: 0,
      AgentArns: 0,
      CmkSecretConfig: i_CmkSecretConfig,
      CustomSecretConfig: i_CustomSecretConfig,
    },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationHdfs",
})) as any;

export type UpdateLocationNfsError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Modifies the following configuration parameters of the Network File System (NFS) transfer
 * location that you're using with DataSync.
 *
 * For more information, see Configuring transfers with an NFS
 * file server.
 */
export const updateLocationNfs: API.OperationMethod<
  UpdateLocationNfsRequest,
  UpdateLocationNfsResponse,
  UpdateLocationNfsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LocationArn: 0,
      Subdirectory: 0,
      ServerHostname: 0,
      OnPremConfig: i_OnPremConfig,
      MountOptions: i_NfsMountOptions,
    },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationNfs",
})) as any;

export type UpdateLocationObjectStorageError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Modifies the following configuration parameters of the object storage transfer location
 * that you're using with DataSync.
 *
 * For more information, see Configuring DataSync
 * transfers with an object storage system.
 */
export const updateLocationObjectStorage: API.OperationMethod<
  UpdateLocationObjectStorageRequest,
  UpdateLocationObjectStorageResponse,
  UpdateLocationObjectStorageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LocationArn: 0,
      ServerPort: 0,
      ServerProtocol: 0,
      Subdirectory: 0,
      ServerHostname: 0,
      AccessKey: 0,
      SecretKey: 0,
      AgentArns: 0,
      ServerCertificate: 0,
      CmkSecretConfig: i_CmkSecretConfig,
      CustomSecretConfig: i_CustomSecretConfig,
    },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationObjectStorage",
})) as any;

export type UpdateLocationS3Error =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Modifies the following configuration parameters of the Amazon S3 transfer location
 * that you're using with DataSync.
 *
 * Before you begin, make sure that you read the following topics:
 *
 * - Storage
 * class considerations with Amazon S3 locations
 *
 * - Evaluating S3 request costs when using DataSync
 */
export const updateLocationS3: API.OperationMethod<
  UpdateLocationS3Request,
  UpdateLocationS3Response,
  UpdateLocationS3Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LocationArn: 0,
      Subdirectory: 0,
      S3StorageClass: 0,
      S3Config: i_S3Config,
    },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationS3",
})) as any;

export type UpdateLocationSmbError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Modifies the following configuration parameters of the Server Message Block (SMB) transfer
 * location that you're using with DataSync.
 *
 * For more information, see Configuring DataSync
 * transfers with an SMB file server.
 */
export const updateLocationSmb: API.OperationMethod<
  UpdateLocationSmbRequest,
  UpdateLocationSmbResponse,
  UpdateLocationSmbError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LocationArn: 0,
      Subdirectory: 0,
      ServerHostname: 0,
      User: 0,
      Domain: 0,
      Password: 0,
      CmkSecretConfig: i_CmkSecretConfig,
      CustomSecretConfig: i_CustomSecretConfig,
      AgentArns: 0,
      MountOptions: i_SmbMountOptions,
      AuthenticationType: 0,
      DnsIpAddresses: 0,
      KerberosPrincipal: 0,
      KerberosKeytab: 0,
      KerberosKrb5Conf: 0,
    },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationSmb",
})) as any;

export type UpdateTaskError =
  | InternalException
  | InvalidRequestException
  | TaskNotFound
  | CommonErrors;
/**
 * Updates the configuration of a *task*, which defines where and how
 * DataSync transfers your data.
 */
export const updateTask: API.OperationMethod<
  UpdateTaskRequest,
  UpdateTaskResponse,
  UpdateTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TaskArn: 0,
      Options: i_Options,
      Excludes: D.list(i_FilterRule),
      Schedule: i_TaskSchedule,
      Name: 0,
      CloudWatchLogGroupArn: 0,
      Includes: D.list(i_FilterRule),
      ManifestConfig: i_ManifestConfig,
      TaskReportConfig: i_TaskReportConfig,
    },
  },
  errors: [InternalException, InvalidRequestException, TaskNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTask",
})) as any;

export type UpdateTaskExecutionError =
  | InternalException
  | InvalidRequestException
  | CommonErrors;
/**
 * Updates the configuration of a running DataSync task execution.
 *
 * Currently, the only `Option` that you can modify with
 * `UpdateTaskExecution` is
 * BytesPerSecond
 * , which throttles bandwidth for a running or queued task
 * execution.
 */
export const updateTaskExecution: API.OperationMethod<
  UpdateTaskExecutionRequest,
  UpdateTaskExecutionResponse,
  UpdateTaskExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TaskExecutionArn: 0, Options: i_Options },
  },
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTaskExecution",
})) as any;

const i_AzureBlobSasConfiguration: D.LazyStruct = () => ({ Token: 0 });
const i_CmkSecretConfig: D.LazyStruct = () => ({ SecretArn: 0, KmsKeyArn: 0 });
const i_CustomSecretConfig: D.LazyStruct = () => ({
  SecretArn: 0,
  SecretAccessRoleArn: 0,
});
const i_FilterRule: D.LazyStruct = () => ({ FilterType: 0, Value: 0 });
const i_FsxProtocol: D.LazyStruct = () => ({
  NFS: i_FsxProtocolNfs,
  SMB: {
    Domain: 0,
    MountOptions: i_SmbMountOptions,
    Password: 0,
    User: 0,
    ManagedSecretConfig: { SecretArn: 0 },
    CmkSecretConfig: i_CmkSecretConfig,
    CustomSecretConfig: i_CustomSecretConfig,
  },
});
const i_FsxProtocolNfs: D.LazyStruct = () => ({
  MountOptions: i_NfsMountOptions,
});
const i_HdfsNameNode: D.LazyStruct = () => ({ Hostname: 0, Port: 0 });
const i_ManifestConfig: D.LazyStruct = () => ({
  Action: 0,
  Format: 0,
  Source: {
    S3: {
      ManifestObjectPath: 0,
      BucketAccessRoleArn: 0,
      S3BucketArn: 0,
      ManifestObjectVersionId: 0,
    },
  },
});
const i_NfsMountOptions: D.LazyStruct = () => ({ Version: 0 });
const i_OnPremConfig: D.LazyStruct = () => ({ AgentArns: 0 });
const i_Options: D.LazyStruct = () => ({
  VerifyMode: 0,
  OverwriteMode: 0,
  Atime: 0,
  Mtime: 0,
  Uid: 0,
  Gid: 0,
  PreserveDeletedFiles: 0,
  PreserveDevices: 0,
  PosixPermissions: 0,
  BytesPerSecond: 0,
  TaskQueueing: 0,
  LogLevel: 0,
  TransferMode: 0,
  SecurityDescriptorCopyFlags: 0,
  ObjectTags: 0,
});
const i_QopConfiguration: D.LazyStruct = () => ({
  RpcProtection: 0,
  DataTransferProtection: 0,
});
const i_S3Config: D.LazyStruct = () => ({ BucketAccessRoleArn: 0 });
const i_SmbMountOptions: D.LazyStruct = () => ({ Version: 0 });
const i_TagListEntry: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_TaskReportConfig: D.LazyStruct = () => ({
  Destination: {
    S3: { Subdirectory: 0, S3BucketArn: 0, BucketAccessRoleArn: 0 },
  },
  OutputType: 0,
  ReportLevel: 0,
  ObjectVersionIds: 0,
  Overrides: {
    Transferred: i_ReportOverride,
    Verified: i_ReportOverride,
    Deleted: i_ReportOverride,
    Skipped: i_ReportOverride,
  },
});
const i_TaskSchedule: D.LazyStruct = () => ({
  ScheduleExpression: 0,
  Status: 0,
});
const o_FsxProtocol: D.LazyStruct = () => ({ SMB: { Password: D.secret } });
const i_ReportOverride: D.LazyStruct = () => ({ ReportLevel: 0 });
