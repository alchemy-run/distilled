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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "DataSync", serviceShapeName: "FmrsService" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "datasync" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-11-09");
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
              `https://datasync-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://datasync-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://datasync.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://datasync.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://datasync.{R}.{D}","properties":{},"headers":{}}');

export class InternalException
  extends /*@__PURE__*/ S.TaggedError<InternalException>()("InternalException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    errorCode: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()("InvalidRequestException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    errorCode: /*@__PURE__*/ S.optional(S.String),
    datasyncErrorCode: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class LocationAccessTestFailed
  extends /*@__PURE__*/ S.TaggedError<LocationAccessTestFailed>()(
    "LocationAccessTestFailed",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      errorCode: /*@__PURE__*/ S.optional(S.String),
      datasyncErrorCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidRequestException",
      message: { includes: "location access test failed" },
    }),
  ).pipe(C.withRetryableError) {}
export class LocationNotFound
  extends /*@__PURE__*/ S.TaggedError<LocationNotFound>()(
    "LocationNotFound",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      errorCode: /*@__PURE__*/ S.optional(S.String),
      datasyncErrorCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidRequestException",
      message: { matches: "^Location .* is not found" },
    }),
  ).pipe(C.withNotFoundError) {}
export class LocationRoleNotAssumable
  extends /*@__PURE__*/ S.TaggedError<LocationRoleNotAssumable>()(
    "LocationRoleNotAssumable",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      errorCode: /*@__PURE__*/ S.optional(S.String),
      datasyncErrorCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidRequestException",
      message: { includes: "Invalid IAM role" },
    }),
  ).pipe(C.withRetryableError) {}
export class TaskNotFound
  extends /*@__PURE__*/ S.TaggedError<TaskNotFound>()(
    "TaskNotFound",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      errorCode: /*@__PURE__*/ S.optional(S.String),
      datasyncErrorCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidRequestException",
      message: { matches: "^Task .* is not found" },
    }),
  ).pipe(C.withNotFoundError) {}
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
export type NfsVersion = "AUTOMATIC" | "NFS3" | "NFS4_0" | "NFS4_1" | (string & {});
export interface NfsMountOptions {
  Version?: NfsVersion;
}
export interface FsxProtocolNfs {
  MountOptions?: NfsMountOptions;
}
export type SmbDomain = string;
export type SmbVersion = "AUTOMATIC" | "SMB2" | "SMB3" | "SMB1" | "SMB2_0" | (string & {});
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
export type ReportLevel = "ERRORS_ONLY" | "SUCCESSES_AND_ERRORS" | (string & {});
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
export type EndpointType = "PUBLIC" | "PRIVATE_LINK" | "FIPS" | "FIPS_PRIVATE_LINK" | (string & {});
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
export type LocationFilterName = "LocationUri" | "LocationType" | "CreationTime" | (string & {});
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
export type CancelTaskExecutionError = InternalException | InvalidRequestException | CommonErrors;
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
  input: __S(976, __c61, 0) as any as S.Schema<CancelTaskExecutionRequest>,
  output: __S(992, __c62, 0) as any as S.Schema<CancelTaskExecutionResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelTaskExecution",
}));

export type CreateAgentError = InternalException | InvalidRequestException | CommonErrors;
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
  input: __S(1008, __c63, 0) as any as S.Schema<CreateAgentRequest>,
  output: __S(1009, __c63, 1) as any as S.Schema<CreateAgentResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAgent",
}));

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
  input: __S(1056, __c66, 0) as any as S.Schema<CreateLocationAzureBlobRequest>,
  output: __S(1104, __c69, 0) as any as S.Schema<CreateLocationAzureBlobResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationAzureBlob",
}));

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
  input: __S(1120, __c70, 0) as any as S.Schema<CreateLocationEfsRequest>,
  output: __S(1104, __c69, 0) as any as S.Schema<CreateLocationEfsResponse>,
  errors: [
    InternalException,
    InvalidRequestException,
    LocationRoleNotAssumable,
    LocationAccessTestFailed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationEfs",
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<CreateLocationFsxLustreRequest>,
  output: __S(1104, __c69, 0) as any as S.Schema<CreateLocationFsxLustreResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationFsxLustre",
}));

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
  input: __S(16, __c1, 0) as any as S.Schema<CreateLocationFsxOntapRequest>,
  output: __S(1104, __c69, 0) as any as S.Schema<CreateLocationFsxOntapResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationFsxOntap",
}));

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
  input: __S(96, __c6, 0) as any as S.Schema<CreateLocationFsxOpenZfsRequest>,
  output: __S(1104, __c69, 0) as any as S.Schema<CreateLocationFsxOpenZfsResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationFsxOpenZfs",
}));

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
  input: __S(112, __c7, 0) as any as S.Schema<CreateLocationFsxWindowsRequest>,
  output: __S(1104, __c69, 0) as any as S.Schema<CreateLocationFsxWindowsResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationFsxWindows",
}));

export type CreateLocationHdfsError = InternalException | InvalidRequestException | CommonErrors;
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
  input: __S(128, __c8, 0) as any as S.Schema<CreateLocationHdfsRequest>,
  output: __S(1104, __c69, 0) as any as S.Schema<CreateLocationHdfsResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationHdfs",
}));

export type CreateLocationNfsError = InternalException | InvalidRequestException | CommonErrors;
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
  input: __S(160, __c10, 0) as any as S.Schema<CreateLocationNfsRequest>,
  output: __S(1104, __c69, 0) as any as S.Schema<CreateLocationNfsResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationNfs",
}));

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
  input: __S(192, __c12, 0) as any as S.Schema<CreateLocationObjectStorageRequest>,
  output: __S(1104, __c69, 0) as any as S.Schema<CreateLocationObjectStorageResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationObjectStorage",
}));

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
  input: __S(208, __c13, 0) as any as S.Schema<CreateLocationS3Request>,
  output: __S(1104, __c69, 0) as any as S.Schema<CreateLocationS3Response>,
  errors: [
    InternalException,
    InvalidRequestException,
    LocationRoleNotAssumable,
    LocationAccessTestFailed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationS3",
}));

export type CreateLocationSmbError = InternalException | InvalidRequestException | CommonErrors;
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
  input: __S(240, __c15, 0) as any as S.Schema<CreateLocationSmbRequest>,
  output: __S(1104, __c69, 0) as any as S.Schema<CreateLocationSmbResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLocationSmb",
}));

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
  input: __S(256, __c16, 0) as any as S.Schema<CreateTaskRequest>,
  output: __S(257, __c16, 1) as any as S.Schema<CreateTaskResponse>,
  errors: [InternalException, InvalidRequestException, LocationAccessTestFailed],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTask",
}));

export type DeleteAgentError = InternalException | InvalidRequestException | CommonErrors;
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
  input: __S(320, __c20, 0) as any as S.Schema<DeleteAgentRequest>,
  output: __S(992, __c62, 0) as any as S.Schema<DeleteAgentResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAgent",
}));

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
  input: __S(336, __c21, 0) as any as S.Schema<DeleteLocationRequest>,
  output: __S(992, __c62, 0) as any as S.Schema<DeleteLocationResponse>,
  errors: [InternalException, InvalidRequestException, LocationNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLocation",
}));

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
  input: __S(352, __c22, 0) as any as S.Schema<DeleteTaskRequest>,
  output: __S(992, __c62, 0) as any as S.Schema<DeleteTaskResponse>,
  errors: [InternalException, InvalidRequestException, TaskNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTask",
}));

export type DescribeAgentError = InternalException | InvalidRequestException | CommonErrors;
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
  input: __S(368, __c23, 0) as any as S.Schema<DescribeAgentRequest>,
  output: __S(370, __c23, 2) as any as S.Schema<DescribeAgentResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAgent",
}));

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
  input: __S(400, __c25, 0) as any as S.Schema<DescribeLocationAzureBlobRequest>,
  output: __S(401, __c25, 1) as any as S.Schema<DescribeLocationAzureBlobResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationAzureBlob",
}));

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
  input: __S(416, __c26, 0) as any as S.Schema<DescribeLocationEfsRequest>,
  output: __S(417, __c26, 1) as any as S.Schema<DescribeLocationEfsResponse>,
  errors: [InternalException, InvalidRequestException, LocationNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationEfs",
}));

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
  input: __S(432, __c27, 0) as any as S.Schema<DescribeLocationFsxLustreRequest>,
  output: __S(433, __c27, 1) as any as S.Schema<DescribeLocationFsxLustreResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationFsxLustre",
}));

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
  input: __S(448, __c28, 0) as any as S.Schema<DescribeLocationFsxOntapRequest>,
  output: __S(449, __c28, 1) as any as S.Schema<DescribeLocationFsxOntapResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationFsxOntap",
}));

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
  input: __S(464, __c29, 0) as any as S.Schema<DescribeLocationFsxOpenZfsRequest>,
  output: __S(465, __c29, 1) as any as S.Schema<DescribeLocationFsxOpenZfsResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationFsxOpenZfs",
}));

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
  input: __S(480, __c30, 0) as any as S.Schema<DescribeLocationFsxWindowsRequest>,
  output: __S(481, __c30, 1) as any as S.Schema<DescribeLocationFsxWindowsResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationFsxWindows",
}));

export type DescribeLocationHdfsError = InternalException | InvalidRequestException | CommonErrors;
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
  input: __S(496, __c31, 0) as any as S.Schema<DescribeLocationHdfsRequest>,
  output: __S(497, __c31, 1) as any as S.Schema<DescribeLocationHdfsResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationHdfs",
}));

export type DescribeLocationNfsError = InternalException | InvalidRequestException | CommonErrors;
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
  input: __S(512, __c32, 0) as any as S.Schema<DescribeLocationNfsRequest>,
  output: __S(513, __c32, 1) as any as S.Schema<DescribeLocationNfsResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationNfs",
}));

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
  input: __S(528, __c33, 0) as any as S.Schema<DescribeLocationObjectStorageRequest>,
  output: __S(529, __c33, 1) as any as S.Schema<DescribeLocationObjectStorageResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationObjectStorage",
}));

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
  input: __S(544, __c34, 0) as any as S.Schema<DescribeLocationS3Request>,
  output: __S(545, __c34, 1) as any as S.Schema<DescribeLocationS3Response>,
  errors: [InternalException, InvalidRequestException, LocationNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationS3",
}));

export type DescribeLocationSmbError = InternalException | InvalidRequestException | CommonErrors;
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
  input: __S(560, __c35, 0) as any as S.Schema<DescribeLocationSmbRequest>,
  output: __S(561, __c35, 1) as any as S.Schema<DescribeLocationSmbResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLocationSmb",
}));

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
  input: __S(576, __c36, 0) as any as S.Schema<DescribeTaskRequest>,
  output: __S(578, __c36, 2) as any as S.Schema<DescribeTaskResponse>,
  errors: [InternalException, InvalidRequestException, TaskNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTask",
}));

export type DescribeTaskExecutionError = InternalException | InvalidRequestException | CommonErrors;
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
  input: __S(592, __c37, 0) as any as S.Schema<DescribeTaskExecutionRequest>,
  output: __S(598, __c37, 6) as any as S.Schema<DescribeTaskExecutionResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTaskExecution",
}));

export type ListAgentsError = InternalException | InvalidRequestException | CommonErrors;
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
  input: __S(608, __c38, 0) as any as S.Schema<ListAgentsRequest>,
  output: __S(611, __c38, 3) as any as S.Schema<ListAgentsResponse>,
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

export type ListLocationsError = InternalException | InvalidRequestException | CommonErrors;
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
  input: __S(624, __c39, 0) as any as S.Schema<ListLocationsRequest>,
  output: __S(627, __c39, 3) as any as S.Schema<ListLocationsResponse>,
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

export type ListTagsForResourceError = InternalException | InvalidRequestException | CommonErrors;
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
  input: __S(656, __c41, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(657, __c41, 1) as any as S.Schema<ListTagsForResourceResponse>,
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

export type ListTaskExecutionsError = InternalException | InvalidRequestException | CommonErrors;
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
  input: __S(672, __c42, 0) as any as S.Schema<ListTaskExecutionsRequest>,
  output: __S(675, __c42, 3) as any as S.Schema<ListTaskExecutionsResponse>,
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

export type ListTasksError = InternalException | InvalidRequestException | CommonErrors;
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
  input: __S(688, __c43, 0) as any as S.Schema<ListTasksRequest>,
  output: __S(691, __c43, 3) as any as S.Schema<ListTasksResponse>,
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
  input: __S(704, __c44, 0) as any as S.Schema<StartTaskExecutionRequest>,
  output: __S(705, __c44, 1) as any as S.Schema<StartTaskExecutionResponse>,
  errors: [InternalException, InvalidRequestException, LocationAccessTestFailed],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTaskExecution",
}));

export type TagResourceError = InternalException | InvalidRequestException | CommonErrors;
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
  input: __S(720, __c45, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(992, __c62, 0) as any as S.Schema<TagResourceResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = InternalException | InvalidRequestException | CommonErrors;
/**
 * Removes tags from an Amazon Web Services resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(992, __c62, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAgentError = InternalException | InvalidRequestException | CommonErrors;
/**
 * Updates the name of an DataSync agent.
 */
export const updateAgent: API.OperationMethod<
  UpdateAgentRequest,
  UpdateAgentResponse,
  UpdateAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(752, __c47, 0) as any as S.Schema<UpdateAgentRequest>,
  output: __S(992, __c62, 0) as any as S.Schema<UpdateAgentResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAgent",
}));

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
  input: __S(768, __c48, 0) as any as S.Schema<UpdateLocationAzureBlobRequest>,
  output: __S(992, __c62, 0) as any as S.Schema<UpdateLocationAzureBlobResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationAzureBlob",
}));

export type UpdateLocationEfsError = InternalException | InvalidRequestException | CommonErrors;
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
  input: __S(784, __c49, 0) as any as S.Schema<UpdateLocationEfsRequest>,
  output: __S(992, __c62, 0) as any as S.Schema<UpdateLocationEfsResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationEfs",
}));

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
  input: __S(800, __c50, 0) as any as S.Schema<UpdateLocationFsxLustreRequest>,
  output: __S(992, __c62, 0) as any as S.Schema<UpdateLocationFsxLustreResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationFsxLustre",
}));

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
  input: __S(818, __c51, 2) as any as S.Schema<UpdateLocationFsxOntapRequest>,
  output: __S(992, __c62, 0) as any as S.Schema<UpdateLocationFsxOntapResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationFsxOntap",
}));

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
  input: __S(832, __c52, 0) as any as S.Schema<UpdateLocationFsxOpenZfsRequest>,
  output: __S(992, __c62, 0) as any as S.Schema<UpdateLocationFsxOpenZfsResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationFsxOpenZfs",
}));

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
  input: __S(848, __c53, 0) as any as S.Schema<UpdateLocationFsxWindowsRequest>,
  output: __S(992, __c62, 0) as any as S.Schema<UpdateLocationFsxWindowsResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationFsxWindows",
}));

export type UpdateLocationHdfsError = InternalException | InvalidRequestException | CommonErrors;
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
  input: __S(864, __c54, 0) as any as S.Schema<UpdateLocationHdfsRequest>,
  output: __S(992, __c62, 0) as any as S.Schema<UpdateLocationHdfsResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationHdfs",
}));

export type UpdateLocationNfsError = InternalException | InvalidRequestException | CommonErrors;
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
  input: __S(880, __c55, 0) as any as S.Schema<UpdateLocationNfsRequest>,
  output: __S(992, __c62, 0) as any as S.Schema<UpdateLocationNfsResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationNfs",
}));

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
  input: __S(896, __c56, 0) as any as S.Schema<UpdateLocationObjectStorageRequest>,
  output: __S(992, __c62, 0) as any as S.Schema<UpdateLocationObjectStorageResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationObjectStorage",
}));

export type UpdateLocationS3Error = InternalException | InvalidRequestException | CommonErrors;
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
  input: __S(912, __c57, 0) as any as S.Schema<UpdateLocationS3Request>,
  output: __S(992, __c62, 0) as any as S.Schema<UpdateLocationS3Response>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationS3",
}));

export type UpdateLocationSmbError = InternalException | InvalidRequestException | CommonErrors;
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
  input: __S(928, __c58, 0) as any as S.Schema<UpdateLocationSmbRequest>,
  output: __S(992, __c62, 0) as any as S.Schema<UpdateLocationSmbResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLocationSmb",
}));

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
  input: __S(944, __c59, 0) as any as S.Schema<UpdateTaskRequest>,
  output: __S(992, __c62, 0) as any as S.Schema<UpdateTaskResponse>,
  errors: [InternalException, InvalidRequestException, TaskNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTask",
}));

export type UpdateTaskExecutionError = InternalException | InvalidRequestException | CommonErrors;
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
  input: __S(960, __c60, 0) as any as S.Schema<UpdateTaskExecutionRequest>,
  output: __S(992, __c62, 0) as any as S.Schema<UpdateTaskExecutionResponse>,
  errors: [InternalException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTaskExecution",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FsxFilesystemArn: S.String,
          SecurityGroupArns: __S(1040, __c65, 0),
          Subdirectory: S.optional(S.String),
          Tags: S.optional(__S(1025, __c64, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateLocationFsxLustreRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Protocol: __S(81, __c5, 1),
          SecurityGroupArns: __S(1040, __c65, 0),
          StorageVirtualMachineArn: S.String,
          Subdirectory: S.optional(S.String),
          Tags: S.optional(__S(1025, __c64, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateLocationFsxOntapRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Version: S.optional(S.String) })).annotate({
        identifier: "NfsMountOptions",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ SecretArn: S.optional(S.String) })).annotate({
        identifier: "ManagedSecretConfig",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ MountOptions: S.optional(__S(32, __c2, 0)) })).annotate({
        identifier: "FsxProtocolNfs",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Domain: S.optional(S.String),
          MountOptions: S.optional(__S(32, __c2, 0)),
          Password: S.optional(SensitiveString),
          User: S.String,
          ManagedSecretConfig: S.optional(__S(48, __c3, 0)),
          CmkSecretConfig: S.optional(__S(1072, __c67, 0)),
          CustomSecretConfig: S.optional(__S(1073, __c67, 1)),
        }),
      ).annotate({ identifier: "FsxProtocolSmb" });
    case 1:
      return S.suspend(() =>
        S.Struct({ NFS: S.optional(__S(64, __c4, 0)), SMB: S.optional(__S(80, __c5, 0)) }),
      ).annotate({ identifier: "FsxProtocol" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FsxFilesystemArn: S.String,
          Protocol: __S(81, __c5, 1),
          SecurityGroupArns: __S(1040, __c65, 0),
          Subdirectory: S.optional(S.String),
          Tags: S.optional(__S(1025, __c64, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateLocationFsxOpenZfsRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Subdirectory: S.optional(S.String),
          FsxFilesystemArn: S.String,
          SecurityGroupArns: __S(1040, __c65, 0),
          Tags: S.optional(__S(1025, __c64, 1)),
          User: S.String,
          Domain: S.optional(S.String),
          Password: S.optional(SensitiveString),
          CmkSecretConfig: S.optional(__S(1072, __c67, 0)),
          CustomSecretConfig: S.optional(__S(1073, __c67, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateLocationFsxWindowsRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Subdirectory: S.optional(S.String),
          NameNodes: __S(145, __c9, 1),
          BlockSize: S.optional(S.Number),
          ReplicationFactor: S.optional(S.Number),
          KmsKeyProviderUri: S.optional(S.String),
          QopConfiguration: S.optional(__S(146, __c9, 2)),
          AuthenticationType: S.String,
          SimpleUser: S.optional(S.String),
          KerberosPrincipal: S.optional(S.String),
          KerberosKeytab: S.optional(T.Blob),
          KerberosKrb5Conf: S.optional(T.Blob),
          AgentArns: __S(1040, __c65, 0),
          Tags: S.optional(__S(1025, __c64, 1)),
          CmkSecretConfig: S.optional(__S(1072, __c67, 0)),
          CustomSecretConfig: S.optional(__S(1073, __c67, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateLocationHdfsRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Hostname: S.String, Port: S.Number })).annotate({
        identifier: "HdfsNameNode",
      });
    case 1:
      return S.Array(__S(144, __c9, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          RpcProtection: S.optional(S.String),
          DataTransferProtection: S.optional(S.String),
        }),
      ).annotate({ identifier: "QopConfiguration" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Subdirectory: S.String,
          ServerHostname: S.String,
          OnPremConfig: __S(176, __c11, 0),
          MountOptions: S.optional(__S(32, __c2, 0)),
          Tags: S.optional(__S(1025, __c64, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateLocationNfsRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ AgentArns: __S(1040, __c65, 0) })).annotate({
        identifier: "OnPremConfig",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServerHostname: S.String,
          ServerPort: S.optional(S.Number),
          ServerProtocol: S.optional(S.String),
          Subdirectory: S.optional(S.String),
          BucketName: S.String,
          AccessKey: S.optional(S.String),
          SecretKey: S.optional(SensitiveString),
          AgentArns: S.optional(__S(1040, __c65, 0)),
          Tags: S.optional(__S(1025, __c64, 1)),
          ServerCertificate: S.optional(T.Blob),
          CmkSecretConfig: S.optional(__S(1072, __c67, 0)),
          CustomSecretConfig: S.optional(__S(1073, __c67, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateLocationObjectStorageRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Subdirectory: S.optional(S.String),
          S3BucketArn: S.String,
          S3StorageClass: S.optional(S.String),
          S3Config: __S(224, __c14, 0),
          AgentArns: S.optional(__S(1040, __c65, 0)),
          Tags: S.optional(__S(1025, __c64, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateLocationS3Request" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ BucketAccessRoleArn: S.String })).annotate({
        identifier: "S3Config",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Subdirectory: S.String,
          ServerHostname: S.String,
          User: S.optional(S.String),
          Domain: S.optional(S.String),
          Password: S.optional(SensitiveString),
          CmkSecretConfig: S.optional(__S(1072, __c67, 0)),
          CustomSecretConfig: S.optional(__S(1073, __c67, 1)),
          AgentArns: __S(1040, __c65, 0),
          MountOptions: S.optional(__S(32, __c2, 0)),
          Tags: S.optional(__S(1025, __c64, 1)),
          AuthenticationType: S.optional(S.String),
          DnsIpAddresses: S.optional(__S(1040, __c65, 0)),
          KerberosPrincipal: S.optional(S.String),
          KerberosKeytab: S.optional(T.Blob),
          KerberosKrb5Conf: S.optional(T.Blob),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateLocationSmbRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceLocationArn: S.String,
          DestinationLocationArn: S.String,
          CloudWatchLogGroupArn: S.optional(S.String),
          Name: S.optional(S.String),
          Options: S.optional(__S(288, __c18, 0)),
          Excludes: S.optional(__S(273, __c17, 1)),
          Schedule: S.optional(__S(304, __c19, 0)),
          Tags: S.optional(__S(1025, __c64, 1)),
          Includes: S.optional(__S(273, __c17, 1)),
          ManifestConfig: S.optional(__S(276, __c17, 4)),
          TaskReportConfig: S.optional(__S(281, __c17, 9)),
          TaskMode: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateTaskRequest" });
    case 1:
      return S.suspend(() => S.Struct({ TaskArn: S.optional(S.String) })).annotate({
        identifier: "CreateTaskResponse",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FilterType: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "FilterRule" });
    case 1:
      return S.Array(__S(272, __c17, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ManifestObjectPath: S.String,
          BucketAccessRoleArn: S.String,
          S3BucketArn: S.String,
          ManifestObjectVersionId: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3ManifestConfig" });
    case 3:
      return S.suspend(() => S.Struct({ S3: __S(274, __c17, 2) })).annotate({
        identifier: "SourceManifestConfig",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Action: S.optional(S.String),
          Format: S.optional(S.String),
          Source: S.optional(__S(275, __c17, 3)),
        }),
      ).annotate({ identifier: "ManifestConfig" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Subdirectory: S.optional(S.String),
          S3BucketArn: S.String,
          BucketAccessRoleArn: S.String,
        }),
      ).annotate({ identifier: "ReportDestinationS3" });
    case 6:
      return S.suspend(() => S.Struct({ S3: S.optional(__S(277, __c17, 5)) })).annotate({
        identifier: "ReportDestination",
      });
    case 7:
      return S.suspend(() => S.Struct({ ReportLevel: S.optional(S.String) })).annotate({
        identifier: "ReportOverride",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          Transferred: S.optional(__S(279, __c17, 7)),
          Verified: S.optional(__S(279, __c17, 7)),
          Deleted: S.optional(__S(279, __c17, 7)),
          Skipped: S.optional(__S(279, __c17, 7)),
        }),
      ).annotate({ identifier: "ReportOverrides" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          Destination: S.optional(__S(278, __c17, 6)),
          OutputType: S.optional(S.String),
          ReportLevel: S.optional(S.String),
          ObjectVersionIds: S.optional(S.String),
          Overrides: S.optional(__S(280, __c17, 8)),
        }),
      ).annotate({ identifier: "TaskReportConfig" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VerifyMode: S.optional(S.String),
          OverwriteMode: S.optional(S.String),
          Atime: S.optional(S.String),
          Mtime: S.optional(S.String),
          Uid: S.optional(S.String),
          Gid: S.optional(S.String),
          PreserveDeletedFiles: S.optional(S.String),
          PreserveDevices: S.optional(S.String),
          PosixPermissions: S.optional(S.String),
          BytesPerSecond: S.optional(S.Number),
          TaskQueueing: S.optional(S.String),
          LogLevel: S.optional(S.String),
          TransferMode: S.optional(S.String),
          SecurityDescriptorCopyFlags: S.optional(S.String),
          ObjectTags: S.optional(S.String),
        }),
      ).annotate({ identifier: "Options" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ScheduleExpression: S.String, Status: S.optional(S.String) }),
      ).annotate({ identifier: "TaskSchedule" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AgentArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAgentRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LocationArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteLocationRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TaskArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteTaskRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AgentArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAgentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VpcEndpointId: S.optional(S.String),
          PrivateLinkEndpoint: S.optional(S.String),
          SubnetArns: S.optional(__S(1040, __c65, 0)),
          SecurityGroupArns: S.optional(__S(1040, __c65, 0)),
        }),
      ).annotate({ identifier: "PrivateLinkConfig" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AgentArn: S.optional(S.String),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          LastConnectionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndpointType: S.optional(S.String),
          PrivateLinkConfig: S.optional(__S(369, __c23, 1)),
          Platform: S.optional(__S(384, __c24, 0)),
        }),
      ).annotate({ identifier: "DescribeAgentResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Version: S.optional(S.String) })).annotate({
        identifier: "Platform",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LocationArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeLocationAzureBlobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LocationArn: S.optional(S.String),
          LocationUri: S.optional(S.String),
          AuthenticationType: S.optional(S.String),
          BlobType: S.optional(S.String),
          AccessTier: S.optional(S.String),
          AgentArns: S.optional(__S(1040, __c65, 0)),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ManagedSecretConfig: S.optional(__S(48, __c3, 0)),
          CmkSecretConfig: S.optional(__S(1072, __c67, 0)),
          CustomSecretConfig: S.optional(__S(1073, __c67, 1)),
        }),
      ).annotate({ identifier: "DescribeLocationAzureBlobResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LocationArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeLocationEfsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LocationArn: S.optional(S.String),
          LocationUri: S.optional(S.String),
          Ec2Config: S.optional(__S(1136, __c71, 0)),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AccessPointArn: S.optional(S.String),
          FileSystemAccessRoleArn: S.optional(S.String),
          InTransitEncryption: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeLocationEfsResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LocationArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeLocationFsxLustreRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LocationArn: S.optional(S.String),
          LocationUri: S.optional(S.String),
          SecurityGroupArns: S.optional(__S(1040, __c65, 0)),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DescribeLocationFsxLustreResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LocationArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeLocationFsxOntapRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LocationArn: S.optional(S.String),
          LocationUri: S.optional(S.String),
          Protocol: S.optional(__S(81, __c5, 1)),
          SecurityGroupArns: S.optional(__S(1040, __c65, 0)),
          StorageVirtualMachineArn: S.optional(S.String),
          FsxFilesystemArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeLocationFsxOntapResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LocationArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeLocationFsxOpenZfsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LocationArn: S.optional(S.String),
          LocationUri: S.optional(S.String),
          SecurityGroupArns: S.optional(__S(1040, __c65, 0)),
          Protocol: S.optional(__S(81, __c5, 1)),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DescribeLocationFsxOpenZfsResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LocationArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeLocationFsxWindowsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LocationArn: S.optional(S.String),
          LocationUri: S.optional(S.String),
          SecurityGroupArns: S.optional(__S(1040, __c65, 0)),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          User: S.optional(S.String),
          Domain: S.optional(S.String),
          ManagedSecretConfig: S.optional(__S(48, __c3, 0)),
          CmkSecretConfig: S.optional(__S(1072, __c67, 0)),
          CustomSecretConfig: S.optional(__S(1073, __c67, 1)),
        }),
      ).annotate({ identifier: "DescribeLocationFsxWindowsResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LocationArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeLocationHdfsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LocationArn: S.optional(S.String),
          LocationUri: S.optional(S.String),
          NameNodes: S.optional(__S(145, __c9, 1)),
          BlockSize: S.optional(S.Number),
          ReplicationFactor: S.optional(S.Number),
          KmsKeyProviderUri: S.optional(S.String),
          QopConfiguration: S.optional(__S(146, __c9, 2)),
          AuthenticationType: S.optional(S.String),
          SimpleUser: S.optional(S.String),
          KerberosPrincipal: S.optional(S.String),
          AgentArns: S.optional(__S(1040, __c65, 0)),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ManagedSecretConfig: S.optional(__S(48, __c3, 0)),
          CmkSecretConfig: S.optional(__S(1072, __c67, 0)),
          CustomSecretConfig: S.optional(__S(1073, __c67, 1)),
        }),
      ).annotate({ identifier: "DescribeLocationHdfsResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LocationArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeLocationNfsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LocationArn: S.optional(S.String),
          LocationUri: S.optional(S.String),
          OnPremConfig: S.optional(__S(176, __c11, 0)),
          MountOptions: S.optional(__S(32, __c2, 0)),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DescribeLocationNfsResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LocationArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeLocationObjectStorageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LocationArn: S.optional(S.String),
          LocationUri: S.optional(S.String),
          AccessKey: S.optional(S.String),
          ServerPort: S.optional(S.Number),
          ServerProtocol: S.optional(S.String),
          AgentArns: S.optional(__S(1040, __c65, 0)),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ServerCertificate: S.optional(T.Blob),
          ManagedSecretConfig: S.optional(__S(48, __c3, 0)),
          CmkSecretConfig: S.optional(__S(1072, __c67, 0)),
          CustomSecretConfig: S.optional(__S(1073, __c67, 1)),
        }),
      ).annotate({ identifier: "DescribeLocationObjectStorageResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LocationArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeLocationS3Request" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LocationArn: S.optional(S.String),
          LocationUri: S.optional(S.String),
          S3StorageClass: S.optional(S.String),
          S3Config: S.optional(__S(224, __c14, 0)),
          AgentArns: S.optional(__S(1040, __c65, 0)),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DescribeLocationS3Response" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LocationArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeLocationSmbRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LocationArn: S.optional(S.String),
          LocationUri: S.optional(S.String),
          AgentArns: S.optional(__S(1040, __c65, 0)),
          User: S.optional(S.String),
          Domain: S.optional(S.String),
          MountOptions: S.optional(__S(32, __c2, 0)),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DnsIpAddresses: S.optional(__S(1040, __c65, 0)),
          KerberosPrincipal: S.optional(S.String),
          AuthenticationType: S.optional(S.String),
          ManagedSecretConfig: S.optional(__S(48, __c3, 0)),
          CmkSecretConfig: S.optional(__S(1072, __c67, 0)),
          CustomSecretConfig: S.optional(__S(1073, __c67, 1)),
        }),
      ).annotate({ identifier: "DescribeLocationSmbResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TaskArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StatusUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DisabledReason: S.optional(S.String),
          DisabledBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "TaskScheduleDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          TaskArn: S.optional(S.String),
          Status: S.optional(S.String),
          Name: S.optional(S.String),
          CurrentTaskExecutionArn: S.optional(S.String),
          SourceLocationArn: S.optional(S.String),
          DestinationLocationArn: S.optional(S.String),
          CloudWatchLogGroupArn: S.optional(S.String),
          SourceNetworkInterfaceArns: S.optional(__S(1040, __c65, 0)),
          DestinationNetworkInterfaceArns: S.optional(__S(1040, __c65, 0)),
          Options: S.optional(__S(288, __c18, 0)),
          Excludes: S.optional(__S(273, __c17, 1)),
          Schedule: S.optional(__S(304, __c19, 0)),
          ErrorCode: S.optional(S.String),
          ErrorDetail: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Includes: S.optional(__S(273, __c17, 1)),
          ManifestConfig: S.optional(__S(276, __c17, 4)),
          TaskReportConfig: S.optional(__S(281, __c17, 9)),
          ScheduleDetails: S.optional(__S(577, __c36, 1)),
          TaskMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeTaskResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TaskExecutionArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeTaskExecutionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PrepareDuration: S.optional(S.Number),
          PrepareStatus: S.optional(S.String),
          TotalDuration: S.optional(S.Number),
          TransferDuration: S.optional(S.Number),
          TransferStatus: S.optional(S.String),
          VerifyDuration: S.optional(S.Number),
          VerifyStatus: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          ErrorDetail: S.optional(S.String),
        }),
      ).annotate({ identifier: "TaskExecutionResultDetail" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          ErrorDetail: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReportResult" });
    case 3:
      return S.suspend(() =>
        S.Struct({ AtSource: S.optional(S.Number), AtDestinationForDelete: S.optional(S.Number) }),
      ).annotate({ identifier: "TaskExecutionFilesListedDetail" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Prepare: S.optional(S.Number),
          Transfer: S.optional(S.Number),
          Verify: S.optional(S.Number),
          Delete: S.optional(S.Number),
        }),
      ).annotate({ identifier: "TaskExecutionFilesFailedDetail" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          List: S.optional(S.Number),
          Prepare: S.optional(S.Number),
          Transfer: S.optional(S.Number),
          Verify: S.optional(S.Number),
          Delete: S.optional(S.Number),
        }),
      ).annotate({ identifier: "TaskExecutionFoldersFailedDetail" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          TaskExecutionArn: S.optional(S.String),
          Status: S.optional(S.String),
          Options: S.optional(__S(288, __c18, 0)),
          Excludes: S.optional(__S(273, __c17, 1)),
          Includes: S.optional(__S(273, __c17, 1)),
          ManifestConfig: S.optional(__S(276, __c17, 4)),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EstimatedFilesToTransfer: S.optional(S.Number),
          EstimatedBytesToTransfer: S.optional(S.Number),
          FilesTransferred: S.optional(S.Number),
          BytesWritten: S.optional(S.Number),
          BytesTransferred: S.optional(S.Number),
          BytesCompressed: S.optional(S.Number),
          Result: S.optional(__S(593, __c37, 1)),
          TaskReportConfig: S.optional(__S(281, __c17, 9)),
          FilesDeleted: S.optional(S.Number),
          FilesSkipped: S.optional(S.Number),
          FilesVerified: S.optional(S.Number),
          ReportResult: S.optional(__S(594, __c37, 2)),
          EstimatedFilesToDelete: S.optional(S.Number),
          TaskMode: S.optional(S.String),
          FilesPrepared: S.optional(S.Number),
          FilesListed: S.optional(__S(595, __c37, 3)),
          FilesFailed: S.optional(__S(596, __c37, 4)),
          EstimatedFoldersToDelete: S.optional(S.Number),
          EstimatedFoldersToTransfer: S.optional(S.Number),
          FoldersSkipped: S.optional(S.Number),
          FoldersPrepared: S.optional(S.Number),
          FoldersTransferred: S.optional(S.Number),
          FoldersVerified: S.optional(S.Number),
          FoldersDeleted: S.optional(S.Number),
          FoldersListed: S.optional(__S(595, __c37, 3)),
          FoldersFailed: S.optional(__S(597, __c37, 5)),
          LaunchTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DescribeTaskExecutionResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAgentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AgentArn: S.optional(S.String),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          Platform: S.optional(__S(384, __c24, 0)),
        }),
      ).annotate({ identifier: "AgentListEntry" });
    case 2:
      return S.Array(__S(609, __c38, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Agents: S.optional(__S(610, __c38, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAgentsResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(641, __c40, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListLocationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ LocationArn: S.optional(S.String), LocationUri: S.optional(S.String) }),
      ).annotate({ identifier: "LocationListEntry" });
    case 2:
      return S.Array(__S(625, __c39, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Locations: S.optional(__S(626, __c39, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListLocationsResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Values: __S(1040, __c65, 0), Operator: S.String }),
      ).annotate({ identifier: "LocationFilter" });
    case 1:
      return S.Array(__S(640, __c40, 0));
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Tags: S.optional(__S(1025, __c64, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TaskArn: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTaskExecutionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TaskExecutionArn: S.optional(S.String),
          Status: S.optional(S.String),
          TaskMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "TaskExecutionListEntry" });
    case 2:
      return S.Array(__S(673, __c42, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          TaskExecutions: S.optional(__S(674, __c42, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListTaskExecutionsResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(641, __c40, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTasksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TaskArn: S.optional(S.String),
          Status: S.optional(S.String),
          Name: S.optional(S.String),
          TaskMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "TaskListEntry" });
    case 2:
      return S.Array(__S(689, __c43, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Tasks: S.optional(__S(690, __c43, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTasksResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TaskArn: S.String,
          OverrideOptions: S.optional(__S(288, __c18, 0)),
          Includes: S.optional(__S(273, __c17, 1)),
          Excludes: S.optional(__S(273, __c17, 1)),
          ManifestConfig: S.optional(__S(276, __c17, 4)),
          TaskReportConfig: S.optional(__S(281, __c17, 9)),
          Tags: S.optional(__S(1025, __c64, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartTaskExecutionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ TaskExecutionArn: S.optional(S.String) })).annotate({
        identifier: "StartTaskExecutionResponse",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Tags: __S(1025, __c64, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Keys: __S(1040, __c65, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AgentArn: S.String, Name: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateAgentRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LocationArn: S.String,
          Subdirectory: S.optional(S.String),
          AuthenticationType: S.optional(S.String),
          SasConfiguration: S.optional(__S(1088, __c68, 0)),
          BlobType: S.optional(S.String),
          AccessTier: S.optional(S.String),
          AgentArns: S.optional(__S(1040, __c65, 0)),
          CmkSecretConfig: S.optional(__S(1072, __c67, 0)),
          CustomSecretConfig: S.optional(__S(1073, __c67, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateLocationAzureBlobRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LocationArn: S.String,
          Subdirectory: S.optional(S.String),
          AccessPointArn: S.optional(S.String),
          FileSystemAccessRoleArn: S.optional(S.String),
          InTransitEncryption: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateLocationEfsRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LocationArn: S.String, Subdirectory: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateLocationFsxLustreRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Domain: S.optional(S.String),
          MountOptions: S.optional(__S(32, __c2, 0)),
          Password: S.optional(SensitiveString),
          User: S.optional(S.String),
          CmkSecretConfig: S.optional(__S(1072, __c67, 0)),
          CustomSecretConfig: S.optional(__S(1073, __c67, 1)),
        }),
      ).annotate({ identifier: "FsxUpdateProtocolSmb" });
    case 1:
      return S.suspend(() =>
        S.Struct({ NFS: S.optional(__S(64, __c4, 0)), SMB: S.optional(__S(816, __c51, 0)) }),
      ).annotate({ identifier: "FsxUpdateProtocol" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          LocationArn: S.String,
          Protocol: S.optional(__S(817, __c51, 1)),
          Subdirectory: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateLocationFsxOntapRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LocationArn: S.String,
          Protocol: S.optional(__S(81, __c5, 1)),
          Subdirectory: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateLocationFsxOpenZfsRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LocationArn: S.String,
          Subdirectory: S.optional(S.String),
          Domain: S.optional(S.String),
          User: S.optional(S.String),
          Password: S.optional(SensitiveString),
          CmkSecretConfig: S.optional(__S(1072, __c67, 0)),
          CustomSecretConfig: S.optional(__S(1073, __c67, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateLocationFsxWindowsRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LocationArn: S.String,
          Subdirectory: S.optional(S.String),
          NameNodes: S.optional(__S(145, __c9, 1)),
          BlockSize: S.optional(S.Number),
          ReplicationFactor: S.optional(S.Number),
          KmsKeyProviderUri: S.optional(S.String),
          QopConfiguration: S.optional(__S(146, __c9, 2)),
          AuthenticationType: S.optional(S.String),
          SimpleUser: S.optional(S.String),
          KerberosPrincipal: S.optional(S.String),
          KerberosKeytab: S.optional(T.Blob),
          KerberosKrb5Conf: S.optional(T.Blob),
          AgentArns: S.optional(__S(1040, __c65, 0)),
          CmkSecretConfig: S.optional(__S(1072, __c67, 0)),
          CustomSecretConfig: S.optional(__S(1073, __c67, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateLocationHdfsRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LocationArn: S.String,
          Subdirectory: S.optional(S.String),
          ServerHostname: S.optional(S.String),
          OnPremConfig: S.optional(__S(176, __c11, 0)),
          MountOptions: S.optional(__S(32, __c2, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateLocationNfsRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LocationArn: S.String,
          ServerPort: S.optional(S.Number),
          ServerProtocol: S.optional(S.String),
          Subdirectory: S.optional(S.String),
          ServerHostname: S.optional(S.String),
          AccessKey: S.optional(S.String),
          SecretKey: S.optional(SensitiveString),
          AgentArns: S.optional(__S(1040, __c65, 0)),
          ServerCertificate: S.optional(T.Blob),
          CmkSecretConfig: S.optional(__S(1072, __c67, 0)),
          CustomSecretConfig: S.optional(__S(1073, __c67, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateLocationObjectStorageRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LocationArn: S.String,
          Subdirectory: S.optional(S.String),
          S3StorageClass: S.optional(S.String),
          S3Config: S.optional(__S(224, __c14, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateLocationS3Request" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LocationArn: S.String,
          Subdirectory: S.optional(S.String),
          ServerHostname: S.optional(S.String),
          User: S.optional(S.String),
          Domain: S.optional(S.String),
          Password: S.optional(SensitiveString),
          CmkSecretConfig: S.optional(__S(1072, __c67, 0)),
          CustomSecretConfig: S.optional(__S(1073, __c67, 1)),
          AgentArns: S.optional(__S(1040, __c65, 0)),
          MountOptions: S.optional(__S(32, __c2, 0)),
          AuthenticationType: S.optional(S.String),
          DnsIpAddresses: S.optional(__S(1040, __c65, 0)),
          KerberosPrincipal: S.optional(S.String),
          KerberosKeytab: S.optional(T.Blob),
          KerberosKrb5Conf: S.optional(T.Blob),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateLocationSmbRequest" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TaskArn: S.String,
          Options: S.optional(__S(288, __c18, 0)),
          Excludes: S.optional(__S(273, __c17, 1)),
          Schedule: S.optional(__S(304, __c19, 0)),
          Name: S.optional(S.String),
          CloudWatchLogGroupArn: S.optional(S.String),
          Includes: S.optional(__S(273, __c17, 1)),
          ManifestConfig: S.optional(__S(276, __c17, 4)),
          TaskReportConfig: S.optional(__S(281, __c17, 9)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateTaskRequest" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TaskExecutionArn: S.String, Options: __S(288, __c18, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateTaskExecutionRequest" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TaskExecutionArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelTaskExecutionRequest" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "CancelTaskExecutionResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ActivationKey: S.String,
          AgentName: S.optional(S.String),
          Tags: S.optional(__S(1025, __c64, 1)),
          VpcEndpointId: S.optional(S.String),
          SubnetArns: S.optional(__S(1040, __c65, 0)),
          SecurityGroupArns: S.optional(__S(1040, __c65, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAgentRequest" });
    case 1:
      return S.suspend(() => S.Struct({ AgentArn: S.optional(S.String) })).annotate({
        identifier: "CreateAgentResponse",
      });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.optional(S.String) })).annotate({
        identifier: "TagListEntry",
      });
    case 1:
      return S.Array(__S(1024, __c64, 0));
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContainerUrl: S.String,
          AuthenticationType: S.String,
          SasConfiguration: S.optional(__S(1088, __c68, 0)),
          BlobType: S.optional(S.String),
          AccessTier: S.optional(S.String),
          Subdirectory: S.optional(S.String),
          AgentArns: S.optional(__S(1040, __c65, 0)),
          Tags: S.optional(__S(1025, __c64, 1)),
          CmkSecretConfig: S.optional(__S(1072, __c67, 0)),
          CustomSecretConfig: S.optional(__S(1073, __c67, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateLocationAzureBlobRequest" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SecretArn: S.optional(S.String), KmsKeyArn: S.optional(S.String) }),
      ).annotate({ identifier: "CmkSecretConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({ SecretArn: S.optional(S.String), SecretAccessRoleArn: S.optional(S.String) }),
      ).annotate({ identifier: "CustomSecretConfig" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Token: SensitiveString })).annotate({
        identifier: "AzureBlobSasConfiguration",
      });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ LocationArn: S.optional(S.String) })).annotate({
        identifier: "CreateLocationAzureBlobResponse",
      });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Subdirectory: S.optional(S.String),
          EfsFilesystemArn: S.String,
          Ec2Config: __S(1136, __c71, 0),
          Tags: S.optional(__S(1025, __c64, 1)),
          AccessPointArn: S.optional(S.String),
          FileSystemAccessRoleArn: S.optional(S.String),
          InTransitEncryption: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateLocationEfsRequest" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SubnetArn: S.String, SecurityGroupArns: __S(1040, __c65, 0) }),
      ).annotate({ identifier: "Ec2Config" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
